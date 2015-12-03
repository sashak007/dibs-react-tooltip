(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "classnames"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("classnames")) : factory(root["react"], root["classnames"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_6__) {
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(1);
	var styles = __webpack_require__(2);
	var classNames = __webpack_require__(6);
	
	var trianglePaths = {
	    top: 'm0,0 h10 l-5,10z',
	    left: '',
	    bottom: 'm0,10 h10 l-5,-10z',
	    right: ''
	};
	
	var oppositeDirections = {
	    top: 'bottom',
	    bottom: 'top',
	    left: 'right',
	    right: 'left'
	};
	
	function getInitialTooltipPosition(elementRect, triangleSize, tooltipDirection) {
	    var topPadding = 10;
	    var positions = {
	        top: {
	            top: -1 * elementRect.height - triangleSize,
	            left: -1 * (elementRect.width / 2),
	            triangleTop: elementRect.height
	        },
	        bottom: {
	            top: topPadding + triangleSize * 2,
	            left: -1 * (elementRect.width / 2),
	            triangleTop: -1 * triangleSize
	        },
	        left: {},
	        right: {}
	    };
	    return positions[tooltipDirection];
	}
	
	var Tooltip = (function (_React$Component) {
	    _inherits(Tooltip, _React$Component);
	
	    function Tooltip(props) {
	        _classCallCheck(this, Tooltip);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).call(this, props));
	
	        _this.state = {
	            top: 0,
	            left: 0,
	            moved: false,
	            tooltipDirection: props.tooltipDirection,
	            flippedFrom: null
	        };
	
	        _this._el = null;
	        return _this;
	    }
	
	    _createClass(Tooltip, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this._el = this.refs.tooltip;
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                tooltipDirection: nextProps.tooltipDirection || this.state.tooltipDirection
	            });
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            if (this.props.isVisible && !this.state.moved) {
	                if (this._el && this._el.childNodes.length) {
	                    // childNodes[0] is the contents of the tooltip, it's not present until the first time the component is shown so we can't do in componentDidMount
	                    var rect = this._el.childNodes[0].getBoundingClientRect();
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
	
	    }, {
	        key: '_adjustPosition',
	        value: function _adjustPosition(elementRect) {
	            var _this2 = this;
	
	            var tooltipDirection = this.state.tooltipDirection;
	            var _props = this.props;
	            var thresholds = _props.positionThresholds;
	            var triangleSize = _props.triangleSize;
	            var rootPosition = _props.rootPosition;
	
	            var position = getInitialTooltipPosition(elementRect, triangleSize, tooltipDirection);
	
	            // determine the area against which we are going to check the thresholds
	            var bounds = this.props.getBounds();
	            var determineThresholds = {
	                top: function top() {
	                    return rootPosition.y - Math.abs(position.top) - bounds.top;
	                },
	                bottom: function bottom() {
	                    return bounds.bottom - (rootPosition.y + Math.abs(position.top) + elementRect.height);
	                }
	            };
	
	            var adjustHorizontal = function adjustHorizontal() {
	                var overflowLeft = rootPosition.x + position.left - bounds.left;
	                var overflowRight = bounds.right - (rootPosition.x + (position.left + elementRect.width));
	
	                if (overflowLeft < thresholds.left) {
	                    position.left -= overflowLeft - thresholds.left;
	                    _this2.props.onThresholdPassed();
	                }
	
	                if (overflowRight < thresholds.right) {
	                    position.left += overflowRight - thresholds.right;
	                    _this2.props.onThresholdPassed();
	                }
	            };
	            var changeDirection = function changeDirection(direction) {
	                var oldState = _this2.state.tooltipDirection;
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
	
	    }, {
	        key: '_renderContents',
	        value: function _renderContents(style, triangleStyle) {
	            var tooltipDirection = this.state.tooltipDirection;
	
	            var tooltipClass = styles[tooltipDirection];
	            var path = trianglePaths[tooltipDirection];
	            var tooltipInnerClass = classNames(styles.inner, this.props.containerClass);
	            var triangleClass = classNames(styles.triangle, this.props.triangleClass);
	
	            return React.createElement(
	                'div',
	                { className: tooltipClass, style: style, onClick: this.props.onClick },
	                React.createElement(
	                    'div',
	                    { className: tooltipInnerClass },
	                    this.props.children
	                ),
	                React.createElement(
	                    'svg',
	                    { className: triangleClass, style: triangleStyle, width: '10', height: '10' },
	                    React.createElement('path', { d: path })
	                )
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var style = {
	                top: this.state.top,
	                left: this.state.left
	            };
	            var triangleStyle = {
	                top: this.state.triangleTop,
	                left: Math.abs(style.left)
	            };
	
	            return React.createElement(
	                'div',
	                { ref: 'tooltip' },
	                this.props.isVisible ? this._renderContents(style, triangleStyle) : null
	            );
	        }
	    }]);
	
	    return Tooltip;
	})(React.Component);
	
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
	    tooltipDirection: React.PropTypes.oneOf(['top', 'bottom']), // TODO: add left and right if necessary
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
	    onClick: function onClick() {},
	    onThresholdPassed: function onThresholdPassed() {},
	    getBounds: getWindowBounds
	};
	
	module.exports = Tooltip;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "/* styles for tooltip*/\n\n.Tooltip__hasShadow___3RLRe {\n    -webkit-filter: drop-shadow(3px 3px 4px #999);\n            filter: drop-shadow(3px 3px 4px #999);\n}\n.Tooltip__defaultStyle___2PHGC {\n    background-color: #D8E5F2;\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 13px;\n    padding: 15px;\n    line-height: 1.4;\n    width: 250px;\n    span ~ ul {\n        margin-top: 15px;\n    }\n    ul {\n        margin-bottom: 0;\n        /*\n        make sure the bullet points of lists are more or less aligned with the left margin of the container minus 15px padding\n        */\n        padding-left: 1.2em;\n        li {\n            margin-bottom: 10px;\n        }\n        li:last-child {\n            margin-bottom: 0;\n        }\n    }\n}\n.Tooltip__defaultTriangle___2yE9C {\n    fill: #D8E5F2;\n}\n.Tooltip__triangle___XBkZH {\n    position: absolute;\n}\n.Tooltip__container___1iGSw {\n    display: block;\n    cursor: default;\n    position: absolute;\n    z-index: 1000;\n}\n.Tooltip__inner___34nOg {\n    position: relative;\n}\n.Tooltip__top___3PYiq {\n}\n.Tooltip__bottom___3OFAJ {\n}\n\n", ""]);
	
	// exports
	exports.locals = {
		"hasShadow": "Tooltip__hasShadow___3RLRe",
		"defaultStyle": "Tooltip__defaultStyle___2PHGC",
		"defaultTriangle": "Tooltip__defaultTriangle___2yE9C",
		"triangle": "Tooltip__triangle___XBkZH",
		"container": "Tooltip__container___1iGSw Tooltip__hasShadow___3RLRe",
		"inner": "Tooltip__inner___34nOg",
		"top": "Tooltip__top___3PYiq Tooltip__container___1iGSw Tooltip__hasShadow___3RLRe",
		"bottom": "Tooltip__bottom___3OFAJ Tooltip__container___1iGSw Tooltip__hasShadow___3RLRe"
	};

/***/ },
/* 4 */
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
/* 5 */
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
		var sourceMap = obj.sourceMap;
	
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
		var media = obj.media;
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


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=Tooltip.js.map