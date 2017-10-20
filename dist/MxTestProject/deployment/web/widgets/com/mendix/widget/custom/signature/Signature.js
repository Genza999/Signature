(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react-dom"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react-dom", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react-dom"), require("react")) : factory(root["react-dom"], root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, react_1, Signature_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignatureContainer = (function (_super) {
        __extends(SignatureContainer, _super);
        function SignatureContainer(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                url: _this.getValue(_this.props.dataUrl, _this.props.mxObject)
            };
            _this.subscriptionHandles = [];
            _this.handleSubscriptions = _this.handleSubscriptions.bind(_this);
            return _this;
        }
        SignatureContainer.prototype.render = function () {
            return react_1.createElement(Signature_1.SignatureCanvas, {
                dataUrl: this.props.dataUrl,
                gridBorder: this.props.gridBorder,
                gridColor: this.props.gridColor,
                gridx: this.props.gridx,
                gridy: this.props.gridy,
                height: this.props.height,
                maxWidth: this.props.maxWidth,
                minWidth: this.props.minWidth,
                mxObject: this.props.mxObject,
                penColor: this.props.penColor,
                penSize: this.props.penSize,
                resetCaption: this.props.resetCaption,
                responsive: this.props.responsive,
                responsiveRatio: this.props.responsiveRatio,
                showgrid: this.props.showgrid,
                timeOut: this.props.timeOut,
                velocityFilterWeight: this.props.velocityFilterWeight,
                width: this.props.width
            });
        };
        SignatureContainer.prototype.componentWillReceiveProps = function (newProps) {
            this.resetSubscriptions(newProps.mxObject);
            this.setState({
                url: this.getValue(this.props.dataUrl, newProps.mxObject)
            });
        };
        SignatureContainer.prototype.resetSubscriptions = function (mxObject) {
            this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
            if (mxObject) {
                this.subscriptionHandles.push(window.mx.data.subscribe({
                    callback: this.handleSubscriptions,
                    guid: mxObject.getGuid()
                }));
                this.subscriptionHandles.push(window.mx.data.subscribe({
                    attr: this.props.dataUrl,
                    callback: this.handleSubscriptions,
                    guid: mxObject.getGuid()
                }));
            }
        };
        SignatureContainer.prototype.handleSubscriptions = function () {
            this.setState({
                url: this.getValue(this.props.dataUrl, this.props.mxObject)
            });
        };
        SignatureContainer.prototype.getValue = function (attributeName, mxObject) {
            if (mxObject && attributeName) {
                return mxObject.get(attributeName);
            }
            return "";
        };
        return SignatureContainer;
    }(react_1.Component));
    exports.default = SignatureContainer;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, react_1, classNames, react_dom_1, bezier_1, point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SignatureCanvas = (function (_super) {
        __extends(SignatureCanvas, _super);
        function SignatureCanvas(props) {
            var _this = _super.call(this, props) || this;
            _this.points = [];
            _this.state = {
                signature_set: false,
                signature_unset: true
            };
            _this.getCanvasRef = _this.getCanvasRef.bind(_this);
            _this.getImageRef = _this.getImageRef.bind(_this);
            _this.getButtonRef = _this.getButtonRef.bind(_this);
            _this.finalizeSignature = _this.finalizeSignature.bind(_this);
            _this.showImage = _this.showImage.bind(_this);
            _this.eventResetClicked = _this.eventResetClicked.bind(_this);
            _this.beginCurve = _this.beginCurve.bind(_this);
            _this.updateCurve = _this.updateCurve.bind(_this);
            _this.endCurve = _this.endCurve.bind(_this);
            return _this;
        }
        SignatureCanvas.prototype.render = function () {
            var _this = this;
            if (this.state.signature_unset) {
                return react_1.createElement("div", {
                    className: classNames("wgt_Signature signature_unset", this.props.className),
                    ref: function (node) { return _this.divNode = node; }
                }, react_1.createElement("canvas", {
                    gridx: this.props.gridx,
                    gridy: this.props.gridy,
                    height: this.props.height,
                    ref: this.getCanvasRef,
                    style: { border: this.props.gridBorder + "px solid", display: "block" },
                    width: this.props.width
                }), react_1.createElement("img", {
                    height: this.props.height,
                    ref: this.getImageRef,
                    style: { display: "none", opacity: 0.5, border: this.props.gridBorder + "px solid" },
                    width: this.props.width
                }));
            }
            else if (this.state.signature_set) {
                return react_1.createElement("div", {
                    className: classNames("wgt_Signature signature_set", this.props.className),
                    ref: function (node) { return _this.divNode = node; }
                }, react_1.createElement("canvas", {
                    gridx: this.props.gridx,
                    gridy: this.props.gridy,
                    height: this.props.height,
                    ref: this.getCanvasRef,
                    style: { border: this.props.gridBorder + "px solid", display: "none" },
                    width: this.props.width
                }), react_1.createElement("img", {
                    height: this.props.height,
                    ref: this.getImageRef,
                    src: this.image.src,
                    style: { display: "block", opacity: 0.5, border: this.props.gridBorder + "px solid" },
                    width: this.props.width
                }), react_1.createElement("button", {
                    className: classNames(" btn", this.props.className),
                    onClick: this.eventResetClicked,
                    ref: this.getButtonRef,
                    resetCaption: this.props.resetCaption,
                    style: { width: this.props.width }
                }, "Reset Signature"));
            }
            return null;
        };
        SignatureCanvas.prototype.getCanvasRef = function (node2) {
            this.canvas = node2;
        };
        SignatureCanvas.prototype.getImageRef = function (node3) {
            this.image = node3;
        };
        SignatureCanvas.prototype.getButtonRef = function (node4) {
            this.button = node4;
        };
        SignatureCanvas.prototype.componentDidMount = function () {
            this.context = this.canvas.getContext("2d");
            this.resizeCanvas();
            this.setupEvents();
        };
        SignatureCanvas.prototype.resizeCanvas = function () {
            if (this.props.responsive) {
                var position = react_dom_1.findDOMNode(this.divNode).getBoundingClientRect();
                var node_height = this.divNode.offsetHeight;
                var node_width = this.divNode.offsetWidth;
                var ratio = parseFloat(this.props.responsiveRatio);
                if (isNaN(ratio)) {
                    ratio = 1.5;
                }
                node_width = (position.width > 0 && this.props.responsive)
                    ? position.width
                    : (position.width < 0 && this.props.responsive)
                        ? this.props.width
                        : this.props.width;
                if (position.height > 0 && this.props.responsive) {
                    var node_width2 = this.divNode.offsetWidth;
                    var height = Math.floor(node_width2 / ratio);
                    node_height = (position.height < height)
                        ? position.height
                        : (position.height > height)
                            ? height
                            : height;
                }
                else {
                    node_height = this.props.height;
                }
                this.canvas.height = this.props.height;
                this.canvas.width = this.props.width - 4;
                this.image.height = this.props.height;
                this.image.width = this.props.width;
                this.resetCanvas();
            }
        };
        SignatureCanvas.prototype.eventResetClicked = function () {
            this.resetMxObject();
            this.resetCanvas();
            this.hideImage();
        };
        SignatureCanvas.prototype.resetMxObject = function () {
            this.props.mxObject.set(this.props.dataUrl, "");
        };
        SignatureCanvas.prototype.hideImage = function () {
            this.image.src = "";
            this.setState({ signature_set: false, signature_unset: true });
        };
        SignatureCanvas.prototype.showImage = function () {
            var obj = this.props.mxObject;
            this.image.src = obj.get(this.props.dataUrl);
            this.setState({ signature_set: !this.state.signature_set, signature_unset: !this.state.signature_unset });
        };
        SignatureCanvas.prototype.resetCanvas = function () {
            var context = this.canvas.getContext("2d");
            context.clearRect(0, 0, this.props.width, this.props.height);
            this.drawGrid();
        };
        SignatureCanvas.prototype.drawGrid = function () {
            if (!this.props.showgrid)
                return;
            var x = this.props.gridx;
            var y = this.props.gridy;
            var context = this.canvas.getContext("2d");
            var width = this.props.width;
            var height = this.props.height;
            context.beginPath();
            for (; x < width; x += this.props.gridx) {
                context.moveTo(x, 0);
                context.lineTo(x, this.props.height);
            }
            for (; y < height; y += this.props.gridy) {
                context.moveTo(0, y);
                context.lineTo(this.props.width, y);
            }
            context.lineWidth = 1;
            context.strokeStyle = this.props.gridColor;
            context.stroke();
        };
        SignatureCanvas.prototype.setupEvents = function () {
            this.canvas.addEventListener("pointerdown", this.beginCurve.bind(this));
            if (this.props.responsive) {
                window.addEventListener("resize", this.resizeCanvas.bind(this));
            }
        };
        SignatureCanvas.prototype.stopTimeout = function () {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        };
        SignatureCanvas.prototype.finalizeSignature = function () {
            if (this.props.mxObject) {
                if (this.props.dataUrl) {
                    this.props.mxObject.set(this.props.dataUrl, this.canvas.toDataURL());
                }
                else {
                    mx.ui.error("finalizeSignature: no dataUrl attribute found.");
                }
            }
            this.showImage();
        };
        SignatureCanvas.prototype.beginCurve = function (e) {
            e.preventDefault();
            var context = this.canvas.getContext("2d");
            this.stopTimeout();
            this.points = [];
            this.lastVelocity = 0;
            this.lastWidth = (parseFloat(this.props.minWidth) + parseFloat(this.props.maxWidth) / 2);
            context.lineWidth = this.props.penSize;
            context.strokeStyle = this.props.penColor;
            this.canvas.addEventListener("pointermove", this.updateCurve);
            this.canvas.addEventListener("pointerup", this.endCurve);
        };
        SignatureCanvas.prototype.createPoint = function (event) {
            var rect = this.canvas.getBoundingClientRect();
            return new point_1.default(event.pageX - rect.left, event.pageY - rect.top);
        };
        SignatureCanvas.prototype.updateCurve = function (e) {
            e.preventDefault();
            var point = this.createPoint(e);
            this.addPoint(point);
        };
        SignatureCanvas.prototype.addPoint = function (point) {
            var points = this.points;
            var c2;
            var c3;
            var curve;
            var tmp;
            points.push(point);
            if (points.length > 2) {
                if (points.length === 3)
                    points.unshift(points[0]);
                tmp = this.calculateCurveControlPoints(points[0], points[1], points[2]);
                c2 = tmp.c2;
                tmp = this.calculateCurveControlPoints(points[1], points[2], points[3]);
                c3 = tmp.c1;
                curve = new bezier_1.default(points[1], c2, c3, points[2]);
                this.addCurve(curve);
                points.shift();
            }
        };
        SignatureCanvas.prototype.addCurve = function (curve) {
            var startPoint = curve.startPoint;
            var endPoint = curve.endPoint;
            this.lastVelocity = 0;
            var velocityFilterWeight = parseFloat(this.props.velocityFilterWeight);
            var velocity;
            var newWidth;
            velocity = endPoint.velocityFrom(startPoint);
            velocity = (velocityFilterWeight) * velocity
                + (1 - (velocityFilterWeight)) * this.lastVelocity;
            newWidth = this.strokeWidth(velocity);
            this.drawCurve(curve, this.lastWidth, newWidth);
            this.lastVelocity = velocity;
            this.lastWidth = newWidth;
        };
        SignatureCanvas.prototype.drawCurve = function (curve, startWidth, endWidth) {
            var context = this.canvas.getContext("2d");
            var widthDelta = endWidth - startWidth;
            var drawSteps;
            var width;
            var i;
            var t;
            var tt;
            var ttt;
            var u;
            var uu;
            var uuu;
            var x;
            var y;
            drawSteps = Math.floor(curve.length());
            context.beginPath();
            for (i = 0; i < drawSteps; i++) {
                t = i / drawSteps;
                tt = t * t;
                ttt = tt * t;
                u = 1 - t;
                uu = u * u;
                uuu = uu * u;
                x = uuu * curve.startPoint.x;
                x += 3 * uu * t * curve.control1.x;
                x += 3 * u * tt * curve.control2.x;
                x += ttt * curve.endPoint.x;
                y = uuu * curve.startPoint.y;
                y += 3 * uu * t * curve.control1.y;
                y += 3 * u * tt * curve.control2.y;
                y += ttt * curve.endPoint.y;
                width = startWidth + ttt * widthDelta;
                this.drawPoint(x, y, width);
            }
            context.fill();
        };
        SignatureCanvas.prototype.drawPoint = function (x, y, size) {
            var context = this.canvas.getContext("2d");
            context.arc(x, y, size, 0, 2 * Math.PI, false);
        };
        SignatureCanvas.prototype.strokeWidth = function (velocity) {
            var minWidth = parseFloat(this.props.minWidth);
            var maxWidth = parseFloat(this.props.maxWidth);
            return Math.max(maxWidth / (velocity + 1), minWidth);
        };
        SignatureCanvas.prototype.calculateCurveControlPoints = function (s1, s2, s3) {
            var dx1 = s1.x - s2.x;
            var dy1 = s1.y - s2.y;
            var dx2 = s2.x - s3.x;
            var dy2 = s2.y - s3.y;
            var m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
            var m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };
            var l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
            var l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            var dxm = (m1.x - m2.x);
            var dym = (m1.y - m2.y);
            var k = l2 / (l1 + l2);
            var cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
            var tx = s2.x - cm.x;
            var ty = s2.y - cm.y;
            return {
                c1: new point_1.default(m1.x + tx, m1.y + ty),
                c2: new point_1.default(m2.x + tx, m2.y + ty)
            };
        };
        SignatureCanvas.prototype.endCurve = function (e) {
            e.preventDefault();
            this.stopTimeout();
            this.canvas.removeEventListener("pointermove", this.updateCurve);
            this.canvas.removeEventListener("pointerup", this.endCurve);
            this.timer = setTimeout(this.finalizeSignature, this.props.timeOut);
        };
        return SignatureCanvas;
    }(react_1.Component));
    exports.SignatureCanvas = SignatureCanvas;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Bezier = (function (_super) {
        __extends(Bezier, _super);
        function Bezier(startPoint, control1, control2, endPoint) {
            var _this = _super.call(this) || this;
            _this.startPoint = startPoint;
            _this.control1 = control1;
            _this.control2 = control2;
            _this.endPoint = endPoint;
            return _this;
        }
        Bezier.prototype.length = function () {
            var steps = 10;
            var length = 0;
            var i;
            var t;
            var cx;
            var cy;
            var px;
            var py;
            var xdiff;
            var ydiff;
            for (i = 0; i <= steps; i++) {
                t = i / steps;
                cx = this.point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
                cy = this.point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
                if (i > 0) {
                    xdiff = cx - px;
                    ydiff = cy - py;
                    length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
                }
                px = cx;
                py = cy;
            }
            return length;
        };
        Bezier.prototype.point = function (t, start, c1, c2, end) {
            return start * t * t * t
                + 3.0 * c1 * (1.0 - t) * t * t
                + 3.0 * c2 * (1.0 - t) * (1.0 - t) * t
                + end * (1.0 - t) * (1.0 - t) * (1.0 - t);
        };
        return Bezier;
    }(react_1.Component));
    exports.default = Bezier;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point(x, y, time) {
            var _this = _super.call(this) || this;
            _this.x = x;
            _this.y = y;
            _this.time = time || new Date().getTime();
            return _this;
        }
        Point.prototype.velocityFrom = function (start) {
            return (this.time !== start.time) ? this.distanceTo(start) / (this.time - start.time) : 1;
        };
        Point.prototype.distanceTo = function (start) {
            return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
        };
        return Point;
    }(react_1.Component));
    exports.default = Point;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});
//# sourceMappingURL=Signature.js.map