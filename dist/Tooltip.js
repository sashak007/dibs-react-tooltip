(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "classnames"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("classnames")) : factory(root["react"], root["classnames"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint react/no-did-update-set-state: 0 */
	
	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(1);
	var classNames = __webpack_require__(2);
	var lodashDebounce = __webpack_require__(3);
	var styles = __webpack_require__(5);
	
	var oppositeDirections = {
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
	
	var Tooltip = function (_React$Component) {
	    _inherits(Tooltip, _React$Component);
	
	    function Tooltip(props) {
	        _classCallCheck(this, Tooltip);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).call(this, props));
	
	        _this.state = {
	            top: 0,
	            left: 0,
	            moved: false,
	            flippedFrom: null,
	            tooltipDirection: props.tooltipDirection,
	            isVisible: props.isVisible
	        };
	        return _this;
	    }
	
	    _createClass(Tooltip, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            if (this.state.isVisible) {
	                this._adjustPosition();
	            }
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if (!this.props.isVisible && nextProps.isVisible) {
	                this.setState({
	                    tooltipDirection: nextProps.tooltipDirection || this.state.tooltipDirection
	                });
	            }
	
	            this.setState({
	                isVisible: nextProps.isVisible
	            });
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            var _state = this.state;
	            var isVisible = _state.isVisible;
	            var moved = _state.moved;
	            var debounce = this.props.debounce;
	
	            var adjustPositionDebounced = lodashDebounce(this._adjustPosition, debounce).bind(this);
	            var shouldAdjust = isVisible && !moved;
	
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
	    }, {
	        key: '_getInitialTooltipPosition',
	        value: function _getInitialTooltipPosition(elementRect, tooltipDirection, rootRect) {
	            var _props = this.props;
	            var hasTriangle = _props.hasTriangle;
	            var triangleSize = _props.triangleSize;
	
	            var triangleSpacing = hasTriangle ? triangleSize : triangleSize / 2;
	
	            var elementDimensions = getHalfDimensions(elementRect);
	            var rootDimensions = getHalfDimensions(rootRect);
	
	            var elementHalfWidth = elementDimensions('width');
	            var elementHalfHeight = elementDimensions('height');
	            var rootHalfWidth = rootDimensions('width');
	            var rootHalfHeight = rootDimensions('height');
	
	            var left = -1 * elementHalfWidth + rootHalfWidth;
	            var top = -1 * elementHalfHeight + rootHalfHeight;
	            var triangleLeft = elementHalfWidth - triangleSpacing;
	            var triangleTop = elementHalfHeight - triangleSize / 2;
	            var spacing = triangleSpacing + 3;
	
	            var positions = {
	                top: {
	                    top: -1 * (elementRect.height + spacing),
	                    left: left,
	                    triangleLeft: triangleLeft
	                },
	                bottom: {
	                    top: rootRect.height + spacing,
	                    left: left,
	                    triangleLeft: triangleLeft
	                },
	                left: {
	                    top: top,
	                    left: -1 * (elementRect.width + spacing),
	                    triangleTop: triangleTop
	                },
	                right: {
	                    top: top,
	                    left: rootRect.width + spacing,
	                    triangleTop: triangleTop
	                }
	            };
	
	            return positions[tooltipDirection];
	        }
	    }, {
	        key: '_getElementsPositions',
	        value: function _getElementsPositions() {
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
	
	    }, {
	        key: '_adjustPosition',
	        value: function _adjustPosition() {
	            var _this2 = this;
	
	            if (!this.state.isVisible) {
	                return;
	            }
	
	            var _getElementsPositions2 = this._getElementsPositions();
	
	            var elementRect = _getElementsPositions2.elementRect;
	            var rootRect = _getElementsPositions2.rootRect;
	            var tooltipDirection = this.state.tooltipDirection;
	            var _props2 = this.props;
	            var thresholds = _props2.positionThresholds;
	            var triangleSize = _props2.triangleSize;
	
	            var position = this._getInitialTooltipPosition(elementRect, tooltipDirection, rootRect);
	
	            // determine the area against which we are going to check the thresholds
	            var bounds = this.props.getBounds();
	            var overflowTop = rootRect.top - Math.abs(position.top) - bounds.top;
	            var overflowBottom = bounds.bottom - (rootRect.top + Math.abs(position.top) + elementRect.height);
	            var overflowLeft = rootRect.left + position.left - bounds.left;
	            var overflowRight = bounds.right - (rootRect.left + (position.left + elementRect.width));
	
	            var determineThresholds = {
	                top: function top() {
	                    return overflowTop;
	                },
	                bottom: function bottom() {
	                    return overflowBottom;
	                },
	                left: function left() {
	                    return overflowLeft;
	                },
	                right: function right() {
	                    return overflowRight;
	                }
	            };
	
	            var adjustHorizontal = function adjustHorizontal() {
	                var thresholdsLeft = overflowLeft - thresholds.left;
	                var thresholdsRight = overflowRight - thresholds.right;
	
	                if (overflowLeft < thresholds.left) {
	                    position.left -= thresholdsLeft;
	                    position.triangleLeft += thresholdsLeft;
	                    _this2.props.onThresholdPassed();
	                }
	
	                if (overflowRight < thresholds.right) {
	                    position.left += thresholdsRight;
	                    position.triangleLeft -= thresholdsRight;
	                    _this2.props.onThresholdPassed();
	                }
	            };
	
	            var adjustVertical = function adjustVertical() {
	                var thresholdsTop = overflowTop - thresholds.top;
	                var thresholdsBottom = overflowBottom + elementRect.height / 2;
	                var triangleHalfSize = triangleSize / 2;
	                var overflowTriangleTop = elementRect.height - triangleHalfSize - triangleSize;
	
	                if (overflowTop < thresholds.top) {
	                    position.top -= thresholdsTop;
	                    position.triangleTop += thresholdsTop;
	                    _this2.props.onThresholdPassed();
	                }
	
	                if (thresholdsBottom < thresholds.bottom) {
	                    position.top += thresholdsBottom + thresholds.bottom;
	                    position.triangleTop -= thresholdsBottom + thresholds.bottom;
	                    _this2.props.onThresholdPassed();
	                }
	
	                if (position.triangleTop <= 0) {
	                    position.triangleTop = triangleHalfSize;
	                } else if (position.triangleTop > overflowTriangleTop) {
	                    position.triangleTop = overflowTriangleTop;
	                }
	            };
	
	            var changeDirection = function changeDirection(direction) {
	                var oldState = tooltipDirection;
	                _this2.setState({
	                    tooltipDirection: direction,
	                    moved: false,
	                    flippedFrom: oldState
	                });
	                _this2.props.onThresholdPassed();
	            };
	
	            /*
	                This has the effect that if the tooltip doesn't fit on both the top and the bottom, we default to
	                displaying it on the top as per the spec
	             */
	            var canFlip = function canFlip() {
	                // if the previous tooltip direction was 'top' (i.e. it's on the bottom now), we can still flip back to the top
	                return !_this2.state.flippedFrom || _this2.state.flippedFrom === 'top';
	            };
	
	            var changeDirectionIfNecessary = function changeDirectionIfNecessary(changed, direction) {
	                if (!changed && canFlip() && tooltipDirection === direction) {
	                    var overflow = determineThresholds[direction]();
	                    if (overflow < thresholds[direction]) {
	                        changeDirection(oppositeDirections[direction]);
	                        changed = true;
	                    }
	                }
	                return changed;
	            };
	
	            var verticalOrientations = ['top', 'bottom'];
	            var horizontalOrientations = ['left', 'right'];
	
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
	
	            this.setState(_extends({
	                moved: true
	            }, position));
	        }
	
	        /**
	         * Renders the tooltip contents if this.state.isVisible is true
	         * @param  {Object} style         The style of the tooltip container
	         */
	
	    }, {
	        key: '_renderContents',
	        value: function _renderContents(containerStyle) {
	            var _props3 = this.props;
	            var className = _props3.className;
	            var children = _props3.children;
	            var hasTriangle = _props3.hasTriangle;
	            var hasClose = _props3.hasClose;
	            var containerClass = _props3.containerClass;
	            var onClick = _props3.onClick;
	            var tooltipDirection = this.state.tooltipDirection;
	
	            var tooltipClass = classNames(styles[tooltipDirection], styles.container, className);
	            var tooltipInnerClass = classNames(styles.inner, containerClass);
	
	            return React.createElement(
	                'div',
	                { className: tooltipClass, style: containerStyle, onClick: onClick },
	                React.createElement(
	                    'div',
	                    { className: tooltipInnerClass },
	                    children
	                ),
	                hasTriangle ? this._renderTriangle(tooltipDirection) : null,
	                hasClose ? this._renderClose() : null
	            );
	        }
	
	        /**
	         * Renders the tooltip triangle if this.props.hasTriangle is true
	         */
	
	    }, {
	        key: '_renderTriangle',
	        value: function _renderTriangle(direction) {
	            var _props4 = this.props;
	            var triangleSize = _props4.triangleSize;
	            var triangleClass = _props4.triangleClass;
	            var _state2 = this.state;
	            var left = _state2.triangleLeft;
	            var top = _state2.triangleTop;
	
	            var triangleClassName = classNames(styles.triangle, triangleClass);
	            var triangleDirectionPosition = -1 * triangleSize;
	
	            var triangleStyle = {
	                top: {
	                    left: left,
	                    bottom: triangleDirectionPosition + 1
	                },
	                bottom: {
	                    left: left,
	                    top: triangleDirectionPosition + 1
	                },
	                left: {
	                    top: top,
	                    right: triangleDirectionPosition - 4
	                },
	                right: {
	                    top: top,
	                    left: triangleDirectionPosition - 4
	                }
	            };
	
	            return React.createElement(
	                'svg',
	                { className: triangleClassName, style: triangleStyle[direction], width: triangleSize * 2, height: triangleSize, viewBox: '0 0 20 10' },
	                React.createElement('polygon', { points: '9.65217424 0 19.3043485 9.25000032 0 9.25000032' }),
	                React.createElement('polygon', { className: styles.triangleStroke, strokeLinecap: 'square', points: '9.65723177 0.421508695 9.66228432 0.416666667 9.6572594 0.421535177 18.4448983 8.84302248 18.3478314 8.84165446 9.65723177 0.42156195 0.966632149 8.84165446 0.869565217 8.84302248 9.65720414 0.421535177 9.65217922 0.416666667' })
	            );
	        }
	
	        /**
	         * Renders the tooltip close if this.props.hasClose is true
	         */
	
	    }, {
	        key: '_renderClose',
	        value: function _renderClose() {
	            var _props5 = this.props;
	            var closeClass = _props5.closeClass;
	            var onCloseClick = _props5.onCloseClick;
	
	            var closeClassName = classNames(styles.close, closeClass);
	
	            return React.createElement(
	                'a',
	                { href: '#0', onClick: onCloseClick },
	                React.createElement(
	                    'svg',
	                    { className: closeClassName, viewBox: '0 0 25 25' },
	                    React.createElement('path', { d: 'M13.7001992,12.5 L24.7011952,23.500996 C25.0348606,23.8346614 25.0348606,24.37251 24.7011952,24.7011952 C24.3675299,25.0298805 23.8296813,25.0348606 23.500996,24.7011952 L12.5,13.7001992 L1.49900398,24.7011952 C1.16533865,25.0348606 0.62749004,25.0348606 0.298804781,24.7011952 C-0.0298804781,24.3675299 -0.0348605578,23.8296813 0.298804781,23.500996 L11.2998008,12.5 L0.298804781,1.49900398 C-0.0348605578,1.16533865 -0.0348605578,0.62749004 0.298804781,0.298804781 C0.63247012,-0.0298804781 1.17031873,-0.0348605578 1.49900398,0.298804781 L12.5,11.2998008 L23.500996,0.298804781 C23.8346614,-0.0348605578 24.37251,-0.0348605578 24.7011952,0.298804781 C25.0298805,0.63247012 25.0348606,1.17031873 24.7011952,1.49900398 L13.7001992,12.5 L13.7001992,12.5 Z' })
	                )
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;
	
	            var _state3 = this.state;
	            var top = _state3.top;
	            var left = _state3.left;
	
	            var containerStyle = { top: top, left: left };
	
	            return React.createElement(
	                'div',
	                { ref: function ref(tooltip) {
	                        _this3._tooltip = tooltip;
	                    } },
	                this.state.isVisible ? this._renderContents(containerStyle) : null
	            );
	        }
	    }]);
	
	    return Tooltip;
	}(React.Component);
	
	Tooltip.propTypes = {
	    children: React.PropTypes.node,
	    tooltipDirection: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
	
	    isVisible: React.PropTypes.bool,
	    hasTriangle: React.PropTypes.bool,
	    hasClose: React.PropTypes.bool,
	
	    className: React.PropTypes.string,
	    containerClass: React.PropTypes.string,
	    triangleClass: React.PropTypes.string,
	    closeClass: React.PropTypes.string,
	
	    debounce: React.PropTypes.number,
	    triangleSize: React.PropTypes.number,
	    positionThresholds: React.PropTypes.shape({
	        top: React.PropTypes.number,
	        bottom: React.PropTypes.number,
	        left: React.PropTypes.number,
	        right: React.PropTypes.number
	    }),
	
	    onClick: React.PropTypes.func,
	    onCloseClick: React.PropTypes.func,
	    onThresholdPassed: React.PropTypes.func,
	    getBounds: React.PropTypes.func
	};
	
	Tooltip.defaultProps = {
	    className: '',
	    containerClass: styles.defaultStyle,
	    triangleClass: styles.defaultTriangle,
	    debounce: 0,
	    triangleSize: 10,
	    tooltipDirection: 'top',
	    positionThresholds: {
	        top: 10,
	        bottom: 10,
	        left: 10,
	        right: 10
	    },
	    onClick: function onClick() {},
	    onCloseClick: function onCloseClick() {},
	    onThresholdPassed: function onThresholdPassed() {},
	    getBounds: getWindowBounds,
	    hasTriangle: true,
	    hasClose: false
	};
	
	module.exports = Tooltip;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(4);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeNow = getNative(Date, 'now');
	
	/**
	 * Gets the number of milliseconds that have elapsed since the Unix epoch
	 * (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @category Date
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
	 */
	var now = nativeNow || function() {
	  return new Date().getTime();
	};
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed invocations. Provide an options object to indicate that `func`
	 * should be invoked on the leading and/or trailing edge of the `wait` timeout.
	 * Subsequent calls to the debounced function return the result of the last
	 * `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=false] Specify invoking on the leading
	 *  edge of the timeout.
	 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	 *  delayed before it is invoked.
	 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	 *  edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // avoid costly calculations while the window size is in flux
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
	 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // ensure `batchLog` is invoked once after 1 second of debounced calls
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', _.debounce(batchLog, 250, {
	 *   'maxWait': 1000
	 * }));
	 *
	 * // cancel a debounced call
	 * var todoChanges = _.debounce(batchLog, 1000);
	 * Object.observe(models.todo, todoChanges);
	 *
	 * Object.observe(models, function(changes) {
	 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
	 *     todoChanges.cancel();
	 *   }
	 * }, ['delete']);
	 *
	 * // ...at some point `models.todo` is changed
	 * models.todo.completed = true;
	 *
	 * // ...before 1 second has passed `models.todo` is deleted
	 * // which cancels the debounced `todoChanges` call
	 * delete models.todo;
	 */
	function debounce(func, wait, options) {
	  var args,
	      maxTimeoutId,
	      result,
	      stamp,
	      thisArg,
	      timeoutId,
	      trailingCall,
	      lastCalled = 0,
	      maxWait = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = wait < 0 ? 0 : (+wait || 0);
	  if (options === true) {
	    var leading = true;
	    trailing = false;
	  } else if (isObject(options)) {
	    leading = !!options.leading;
	    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function cancel() {
	    if (timeoutId) {
	      clearTimeout(timeoutId);
	    }
	    if (maxTimeoutId) {
	      clearTimeout(maxTimeoutId);
	    }
	    lastCalled = 0;
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	  }
	
	  function complete(isCalled, id) {
	    if (id) {
	      clearTimeout(id);
	    }
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	    if (isCalled) {
	      lastCalled = now();
	      result = func.apply(thisArg, args);
	      if (!timeoutId && !maxTimeoutId) {
	        args = thisArg = undefined;
	      }
	    }
	  }
	
	  function delayed() {
	    var remaining = wait - (now() - stamp);
	    if (remaining <= 0 || remaining > wait) {
	      complete(trailingCall, maxTimeoutId);
	    } else {
	      timeoutId = setTimeout(delayed, remaining);
	    }
	  }
	
	  function maxDelayed() {
	    complete(trailing, timeoutId);
	  }
	
	  function debounced() {
	    args = arguments;
	    stamp = now();
	    thisArg = this;
	    trailingCall = trailing && (timeoutId || !leading);
	
	    if (maxWait === false) {
	      var leadingCall = leading && !timeoutId;
	    } else {
	      if (!maxTimeoutId && !leading) {
	        lastCalled = stamp;
	      }
	      var remaining = maxWait - (stamp - lastCalled),
	          isCalled = remaining <= 0 || remaining > maxWait;
	
	      if (isCalled) {
	        if (maxTimeoutId) {
	          maxTimeoutId = clearTimeout(maxTimeoutId);
	        }
	        lastCalled = stamp;
	        result = func.apply(thisArg, args);
	      }
	      else if (!maxTimeoutId) {
	        maxTimeoutId = setTimeout(maxDelayed, remaining);
	      }
	    }
	    if (isCalled && timeoutId) {
	      timeoutId = clearTimeout(timeoutId);
	    }
	    else if (!timeoutId && wait !== maxWait) {
	      timeoutId = setTimeout(delayed, wait);
	    }
	    if (leadingCall) {
	      isCalled = true;
	      result = func.apply(thisArg, args);
	    }
	    if (isCalled && !timeoutId && !maxTimeoutId) {
	      args = thisArg = undefined;
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  return debounced;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = debounce;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = getNative;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?localIdentName=[name]__[local]___[hash:base64:5]!./../node_modules/postcss-loader/index.js!./Tooltip.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?localIdentName=[name]__[local]___[hash:base64:5]!./../node_modules/postcss-loader/index.js!./Tooltip.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "/* styles for tooltip*/\n\n.Tooltip__defaultStyle___2PHGC {\n    width: 250px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 1.4;\n    text-align: left;\n    background: #fff;\n}\n\n.Tooltip__defaultClose___3C4eQ {\n    fill: #000;\n}\n\n.Tooltip__defaultTriangle___2yE9C {\n    fill: #fff;\n}\n\n.Tooltip__container___1iGSw {\n    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);\n    display: block;\n    position: absolute;\n    z-index: 1000;\n    cursor: default;\n}\n\n.Tooltip__inner___34nOg {\n    position: relative;\n}\n\n.Tooltip__svg___1D5qj {\n    max-height: 100%;\n    max-width: 100%;\n}\n\n.Tooltip__close___39mNB {\n    position: absolute;\n    right: 8px;\n    top: 8px;\n    width: 10px;\n    height: 10px;\n    cursor: pointer;\n}\n\n.Tooltip__close___39mNB:hover {\n    opacity: 0.9;\n}\n\n.Tooltip__triangle___XBkZH {\n    position: absolute;\n}\n\n.Tooltip__triangleStroke___1qO6p {\n    stroke: rgba(0, 0, 0, 0.1);\n}\n\n.Tooltip__top___3PYiq .Tooltip__triangle___XBkZH {\n    -webkit-transform: rotate(180deg) translateZ(0);\n            transform: rotate(180deg) translateZ(0);\n}\n\n.Tooltip__left___2ocL0 .Tooltip__triangle___XBkZH {\n    -webkit-transform: rotate(90deg) translateZ(0);\n            transform: rotate(90deg) translateZ(0);\n}\n\n.Tooltip__right___1Jius .Tooltip__triangle___XBkZH {\n    -webkit-transform: rotate(-90deg) translateZ(0);\n            transform: rotate(-90deg) translateZ(0);\n}\n", ""]);
	
	// exports
	exports.locals = {
		"defaultStyle": "Tooltip__defaultStyle___2PHGC",
		"defaultClose": "Tooltip__defaultClose___3C4eQ",
		"defaultTriangle": "Tooltip__defaultTriangle___2yE9C",
		"container": "Tooltip__container___1iGSw",
		"inner": "Tooltip__inner___34nOg",
		"svg": "Tooltip__svg___1D5qj",
		"close": "Tooltip__close___39mNB Tooltip__svg___1D5qj",
		"triangle": "Tooltip__triangle___XBkZH Tooltip__svg___1D5qj",
		"triangleStroke": "Tooltip__triangleStroke___1qO6p",
		"top": "Tooltip__top___3PYiq",
		"left": "Tooltip__left___2ocL0",
		"right": "Tooltip__right___1Jius"
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=Tooltip.js.map