/* eslint react/no-did-update-set-state: 0 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const classNames = require('classnames');
const lodashDebounce = require('lodash.debounce');
const styles = require('./styles/Tooltip.css');

const oppositeDirections = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
};

function getWindowBounds() {
    return {
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight
    };
}

function getHalfDimensions(element) {
    return function (type) {
        if (element.width && type === 'width') {
            return element.width / 2;
        }
        if (element.height && type === 'height') {
            return element.height / 2;
        }
        return 0;
    };
}

class Tooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            top: 0,
            left: 0,
            moved: false,
            flippedFrom: null,
            tooltipDirection: props.tooltipDirection,
            isVisible: props.isVisible
        };

        this._checkOutsideClick = this._checkOutsideClick.bind(this);
    }

    componentDidMount() {
        if (this.state.isVisible) {
            this._adjustPosition();
        }

        if (this.props.closeOnOutsideClick) {
            document.addEventListener('click', this._checkOutsideClick, true);
            this.removeOutsideClickListener = () => {
                document.removeEventListener('click', this._checkOutsideClick);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isVisible && nextProps.isVisible) {
            this.setState({
                tooltipDirection: nextProps.tooltipDirection || this.state.tooltipDirection
            });
        }

        this.setState({
            isVisible: nextProps.isVisible
        });
    }

    componentDidUpdate() {
        const { isVisible, moved } = this.state;
        const { debounce } = this.props;
        const adjustPositionDebounced = lodashDebounce(this._adjustPosition, debounce).bind(this);
        const shouldAdjust = isVisible && !moved;

        if (shouldAdjust && debounce) {
            adjustPositionDebounced();
        } else if (shouldAdjust) {
            this._adjustPosition();
        } else if (!isVisible && moved) {
            // make sure the position gets adjusted next time the tooltip is opened
            this.setState({
                moved: false,
                flippedFrom: null
            });
        }
    }

    componentWillUnmount() {
        if (this.removeOutsideClickListener) {
            this.removeOutsideClickListener();
        }
    }

    _checkOutsideClick(e) {
        if (this.state.isVisible && !this._tooltip.contains(e.target)) {
            this.props.onCloseClick();
        }
    }

    _getInitialTooltipPosition(elementRect, tooltipDirection, rootRect) {
        const { hasTriangle, triangleSize } = this.props;
        const triangleSpacing = hasTriangle ? triangleSize : (triangleSize / 2);

        const elementDimensions = getHalfDimensions(elementRect);
        const rootDimensions = getHalfDimensions(rootRect);

        const elementHalfWidth = elementDimensions('width');
        const elementHalfHeight = elementDimensions('height');
        const rootHalfWidth = rootDimensions('width');
        const rootHalfHeight = rootDimensions('height');

        const left = -1 * elementHalfWidth + rootHalfWidth;
        const top = -1 * elementHalfHeight + rootHalfHeight;
        const triangleLeft = elementHalfWidth - triangleSpacing;
        const triangleTop = elementHalfHeight - (triangleSize / 2);
        const spacing = triangleSpacing + 3;

        const positions = {
            top: {
                top: -1 * (elementRect.height + spacing),
                left,
                triangleLeft
            },
            bottom: {
                top: rootRect.height + spacing,
                left,
                triangleLeft
            },
            left: {
                top,
                left: -1 * (elementRect.width + spacing),
                triangleTop
            },
            right: {
                top,
                left: rootRect.width + spacing,
                triangleTop
            }
        };

        return positions[tooltipDirection];
    }

    _getElementsPositions() {
        return {
            elementRect: this._tooltip.childNodes[0].getBoundingClientRect(),
            rootRect: this._tooltip.parentNode.getBoundingClientRect()
        };
    }

    /**
     * Adjusts the position of the tooltip element so that it's centered if possible. If it can't be centered because
     * it would go offscreen, then offset the position so the whole tooltip is still displayed onscreen.
     * @param  {Object} elementRect A rectangle indicating the dimensions of the tooltip element
     */
    _adjustPosition() {
        if (!this.state.isVisible) {
            return;
        }

        const { elementRect, rootRect } = this._getElementsPositions();
        const { tooltipDirection } = this.state;
        const { positionThresholds: thresholds, triangleSize } = this.props;
        const position = this._getInitialTooltipPosition(elementRect, tooltipDirection, rootRect);

        // determine the area against which we are going to check the thresholds
        const bounds = this.props.getBounds();
        const overflowTop = rootRect.top - Math.abs(position.top) - bounds.top;
        const overflowBottom = bounds.bottom - (rootRect.top + Math.abs(position.top) + elementRect.height);
        const overflowLeft = (rootRect.left + position.left) - bounds.left;
        const overflowRight = bounds.right - (rootRect.left + (position.left + elementRect.width));

        const determineThresholds = {
            top: () => overflowTop,
            bottom: () => overflowBottom,
            left: () => overflowLeft,
            right: () => overflowRight
        };

        const adjustHorizontal = () => {
            const thresholdsLeft = overflowLeft - thresholds.left;
            const thresholdsRight = overflowRight - thresholds.right;

            if (overflowLeft < thresholds.left) {
                position.left -= thresholdsLeft;
                position.triangleLeft += thresholdsLeft;
                this.props.onThresholdPassed();
            }

            if (overflowRight < thresholds.right) {
                position.left += thresholdsRight;
                position.triangleLeft -= thresholdsRight;
                this.props.onThresholdPassed();
            }
        };

        const adjustVertical = () => {
            const thresholdsTop = overflowTop - thresholds.top;
            const thresholdsBottom = overflowBottom + elementRect.height / 2;
            const triangleHalfSize = triangleSize / 2;
            const overflowTriangleTop = elementRect.height - triangleHalfSize - triangleSize;

            if (overflowTop < thresholds.top) {
                position.top -= thresholdsTop;
                position.triangleTop += thresholdsTop;
                this.props.onThresholdPassed();
            }

            if (thresholdsBottom < thresholds.bottom) {
                position.top += thresholdsBottom + thresholds.bottom;
                position.triangleTop -= thresholdsBottom + thresholds.bottom;
                this.props.onThresholdPassed();
            }

            if (position.triangleTop <= 0) {
                position.triangleTop = triangleHalfSize;
            } else if (position.triangleTop > overflowTriangleTop) {
                position.triangleTop = overflowTriangleTop;
            }
        };

        const changeDirection = direction => {
            const oldState = tooltipDirection;
            this.setState({
                tooltipDirection: direction,
                moved: false,
                flippedFrom: oldState
            });
            this.props.onThresholdPassed();
        };

        /*
            This has the effect that if the tooltip doesn't fit on both the top and the bottom, we default to
            displaying it on the top as per the spec
         */
        const canFlip = () => {
            // if the previous tooltip direction was 'top' (i.e. it's on the bottom now), we can still flip back to the top
            return !this.props.lockDirection && (!this.state.flippedFrom || this.state.flippedFrom === 'top');
        };

        const changeDirectionIfNecessary = (changed, direction) => {
            if (!changed && canFlip() && (tooltipDirection === direction)) {
                const overflow = determineThresholds[direction]();
                if (overflow < thresholds[direction]) {
                    changeDirection(oppositeDirections[direction]);
                    changed = true;
                }
            }
            return changed;
        };

        const verticalOrientations = ['top', 'bottom'];
        const horizontalOrientations = ['left', 'right'];

        /*
            If the tooltip is displayed on the top or bottom, adjust the horizontal position so it's all displayed inside
            the window and flip it from top->bottom or vice-versa if necessary
         */
        if (verticalOrientations.indexOf(tooltipDirection) >= 0) {
            adjustHorizontal();
            if (verticalOrientations.reduce(changeDirectionIfNecessary, false)) {
                return;
            }
        }

        /*
            If the tooltip is displayed on the left or right flip it from left->right or vice-versa if necessary
         */
        if (horizontalOrientations.indexOf(tooltipDirection) >= 0) {
            adjustVertical();
            if (horizontalOrientations.reduce(changeDirectionIfNecessary, false)) {
                return;
            }
        }

        this.setState(Object.assign({
            moved: true
        }, position));
    }

    /**
     * Renders the tooltip contents if this.state.isVisible is true
     * @param  {Object} style         The style of the tooltip container
     */
    _renderContents(containerStyle) {
        const { className, children, hasTriangle, hasClose, containerClass, onClick } = this.props;
        const { tooltipDirection } = this.state;
        const tooltipInnerClass = classNames(styles.inner, containerClass);
        const tooltipClass = classNames(styles[tooltipDirection], styles.container, className, {
            [styles.shadow]: this.props.hasShadow
        });

        return (
            <div className={tooltipClass} style={containerStyle} onClick={onClick}>
                <div className={tooltipInnerClass}>
                    {children}
                </div>
                {hasTriangle ? this._renderTriangle(tooltipDirection) : null}
                {hasClose ? this._renderClose() : null}
            </div>
        );
    }

    /**
     * Renders the tooltip triangle if this.props.hasTriangle is true
     */
    _renderTriangle(tooltipDirection) {
        const { triangleSize, triangleClass } = this.props;
        const { triangleLeft: left, triangleTop: top } = this.state;
        const triangleDirectionPosition = -1 * triangleSize;
        const addShadow = this.props.hasShadow && tooltipDirection == 'top';
        const triangleClassName = classNames(styles.triangle, triangleClass, {
            [styles.triangleShadow]: addShadow
        });

        const triangleStyle = {
            top: {
                left,
                bottom: triangleDirectionPosition + 1
            },
            bottom: {
                left,
                top: triangleDirectionPosition + 1
            },
            left: {
                top,
                right: triangleDirectionPosition - 4
            },
            right: {
                top,
                left: triangleDirectionPosition - 4
            }
        };

        return (
            <svg className={triangleClassName} style={triangleStyle[tooltipDirection]} width={triangleSize * 2} height={triangleSize} viewBox="0 0 20 10">
                <polygon points="9.65217424 0 19.3043485 9.25000032 0 9.25000032"></polygon>
                <polygon className={styles.triangleStroke} strokeLinecap="square" points="9.65723177 0.421508695 9.66228432 0.416666667 9.6572594 0.421535177 18.4448983 8.84302248 18.3478314 8.84165446 9.65723177 0.42156195 0.966632149 8.84165446 0.869565217 8.84302248 9.65720414 0.421535177 9.65217922 0.416666667"></polygon>
            </svg>
        );
    }

    /**
     * Renders the tooltip close if this.props.hasClose is true
     */
    _renderClose() {
        const { closeClass, onCloseClick } = this.props;
        const closeClassName = classNames(styles.close, closeClass);

        return (
            <a href="#0" onClick={onCloseClick}>
                <svg className={closeClassName} viewBox="0 0 25 25">
                    <path d="M13.7001992,12.5 L24.7011952,23.500996 C25.0348606,23.8346614 25.0348606,24.37251 24.7011952,24.7011952 C24.3675299,25.0298805 23.8296813,25.0348606 23.500996,24.7011952 L12.5,13.7001992 L1.49900398,24.7011952 C1.16533865,25.0348606 0.62749004,25.0348606 0.298804781,24.7011952 C-0.0298804781,24.3675299 -0.0348605578,23.8296813 0.298804781,23.500996 L11.2998008,12.5 L0.298804781,1.49900398 C-0.0348605578,1.16533865 -0.0348605578,0.62749004 0.298804781,0.298804781 C0.63247012,-0.0298804781 1.17031873,-0.0348605578 1.49900398,0.298804781 L12.5,11.2998008 L23.500996,0.298804781 C23.8346614,-0.0348605578 24.37251,-0.0348605578 24.7011952,0.298804781 C25.0298805,0.63247012 25.0348606,1.17031873 24.7011952,1.49900398 L13.7001992,12.5 L13.7001992,12.5 Z"></path>
                </svg>
            </a>
        );
    }

    render() {
        const { top, left } = this.state;
        const containerStyle = { top, left };

        return (
            <div ref={tooltip => { this._tooltip = tooltip; }}>
                {this.state.isVisible ? this._renderContents(containerStyle) : null}
            </div>
        );
    }
}

Tooltip.propTypes = {
    children: PropTypes.node,
    tooltipDirection: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    lockDirection: PropTypes.bool,

    isVisible: PropTypes.bool,
    hasTriangle: PropTypes.bool,
    hasClose: PropTypes.bool,
    hasShadow: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,

    className: PropTypes.string,
    containerClass: PropTypes.string,
    triangleClass: PropTypes.string,
    closeClass: PropTypes.string,

    debounce: PropTypes.number,
    triangleSize: PropTypes.number,
    positionThresholds: PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
    }),

    onClick: PropTypes.func,
    onCloseClick: PropTypes.func,
    onThresholdPassed: PropTypes.func,
    getBounds: PropTypes.func
};

Tooltip.defaultProps = {
    className: '',
    containerClass: styles.defaultStyle,
    triangleClass: styles.defaultTriangle,
    debounce: 0,
    triangleSize: 10,
    tooltipDirection: 'top',
    lockDirection: false,
    positionThresholds: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    },
    onClick: () => {},
    onCloseClick: () => {},
    onThresholdPassed: () => {},
    getBounds: getWindowBounds,
    hasTriangle: true,
    hasClose: false,
    hasShadow: false,
    closeOnOutsideClick: false,
};

module.exports = Tooltip;
