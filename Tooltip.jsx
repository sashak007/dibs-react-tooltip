/* eslint react/no-did-update-set-state: 0 */

'use strict';

const React = require('react');
const styles = require('./styles/Tooltip.css');
const classNames = require('classnames');

const trianglePaths = {
    top: 'm0,0 h10 l-5,10z',
    left: '',
    bottom: 'm0,10 h10 l-5,-10z',
    right: ''
};

const oppositeDirections = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
};

function getInitialTooltipPosition(elementRect, triangleSize, tooltipDirection) {
    const topPadding = 10;
    const positions = {
        top: {
            top: (-1 * elementRect.height) - triangleSize,
            left: -1 * (elementRect.width / 2),
            triangleTop: elementRect.height
        },
        bottom: {
            top: topPadding + (triangleSize * 2),
            left: -1 * (elementRect.width / 2),
            triangleTop: -1 * triangleSize
        },
        left: {},
        right: {}
    };
    return positions[tooltipDirection];
}


class Tooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            top: 0,
            left: 0,
            moved: false,
            tooltipDirection: props.tooltipDirection,
            flippedFrom: null
        };

        this._el = null;
    }

    componentDidMount() {
        this._el = this.refs.tooltip;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tooltipDirection: nextProps.tooltipDirection || this.state.tooltipDirection
        });
    }

    componentDidUpdate() {
        if (this.props.isVisible && !this.state.moved) {
            if (this._el && this._el.childNodes.length) {
                // childNodes[0] is the contents of the tooltip, it's not present until the first time the component is shown so we can't do in componentDidMount
                const rect = this._el.childNodes[0].getBoundingClientRect();
                this._adjustPosition(rect);
            }
        } else if (!this.props.isVisible && this.state.moved) {
            // make sure the position gets adjusted next time the tooltip is opened
            this.setState({
                moved: false,
                flippedFrom: null
            });
        }
    }

    /**
     * Adjusts the position of the tooltip element so that it's centered if possible. If it can't be centered because
     * it would go offscreen, then offset the position so the whole tooltip is still displayed onscreen.
     * @param  {Object} elementRect A rectangle indicating the dimensions of the tooltip element
     */
    _adjustPosition(elementRect) {
        const {tooltipDirection} = this.state;
        const {
            positionThresholds: thresholds,
            triangleSize,
            rootPosition
        } = this.props;
        const position = getInitialTooltipPosition(elementRect, triangleSize, tooltipDirection);

        // determine the area against which we are going to check the thresholds
        const bounds = this.props.getBounds();
        const determineThresholds = {
            top: () => rootPosition.y - Math.abs(position.top) - bounds.top,
            bottom: () => bounds.bottom - (rootPosition.y + Math.abs(position.top) + elementRect.height)
        };

        const adjustHorizontal = () => {
            const overflowLeft = (rootPosition.x + position.left) - bounds.left;
            const overflowRight = bounds.right - (rootPosition.x + (position.left + elementRect.width));

            if (overflowLeft < thresholds.left) {
                position.left -= (overflowLeft - thresholds.left);
                this.props.onThresholdPassed();
            }

            if (overflowRight < thresholds.right) {
                position.left += (overflowRight - thresholds.right);
                this.props.onThresholdPassed();
            }
        };
        const changeDirection = direction => {
            const oldState = this.state.tooltipDirection;
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
            return !this.state.flippedFrom || this.state.flippedFrom === 'top';
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

        this.setState(Object.assign({
            moved: true
        }, position));
    }

    /**
     * Renders the tooltip contents if this.props.isVisible is true
     * @param  {Object} style         The style of the tooltip container
     * @param  {Object} triangleStyle The style of the svg triangle
     */
    _renderContents(style, triangleStyle) {
        const {tooltipDirection} = this.state;
        const tooltipClass = styles[tooltipDirection];
        const path = trianglePaths[tooltipDirection];
        const tooltipInnerClass = classNames(styles.inner, this.props.containerClass);
        const triangleClass = classNames(styles.triangle, this.props.triangleClass);

        return (
            <div className={tooltipClass} style={style} onClick={this.props.onClick}>
                <div className={tooltipInnerClass}>
                    {this.props.children}
                </div>
                <svg className={triangleClass} style={triangleStyle} width="10" height="10">
                    <path d={path} />
                </svg>
            </div>
        );
    }

    render() {
        const style = {
            top: this.state.top,
            left: this.state.left
        };
        const triangleStyle = {
            top: this.state.triangleTop,
            left: Math.abs(style.left)
        };

        return (
            <div ref='tooltip'>
                {this.props.isVisible ? this._renderContents(style, triangleStyle) : null}
            </div>
        );
    }
}

function getWindowBounds() {
    return {
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight
    };
}

Tooltip.propTypes = {
    children: React.PropTypes.node,
    tooltipDirection: React.PropTypes.oneOf(['top', 'bottom']),     // TODO: add left and right if necessary
    isVisible: React.PropTypes.bool,
    containerClass: React.PropTypes.string,
    triangleClass: React.PropTypes.string,
    triangleSize: React.PropTypes.number,
    positionThresholds: React.PropTypes.shape({
        top: React.PropTypes.number,
        bottom: React.PropTypes.number,
        left: React.PropTypes.number,
        right: React.PropTypes.number
    }),
    rootPosition: React.PropTypes.shape({
        x: React.PropTypes.number,
        y: React.PropTypes.number
    }).isRequired,
    onClick: React.PropTypes.func,
    onThresholdPassed: React.PropTypes.func,
    getBounds: React.PropTypes.func
};

Tooltip.defaultProps = {
    containerClass: styles.defaultStyle,
    triangleClass: styles.defaultTriangle,
    triangleSize: 10,
    tooltipDirection: 'top',
    positionThresholds: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    },
    onClick: () => {},
    onThresholdPassed: () => {},
    getBounds: getWindowBounds
};

module.exports = Tooltip;
