/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ajax = __webpack_require__(1);

var ajax_params = {

    //data12
    dataType: "json", // Get it! // "script" not check
    url: "http://httpbin.org/post", // Get it!
    data: { name: 1, str: "str" }, // Get it!
    method: "POST", // Get it!
    header: { "eererererer": "r" }, // Get it!
    username: "max", // Not Check
    password: "ten", // Not Check

    //events
    beforeSend: function beforeSend() {
        console.log("beforeSend");
    }, // Get it!
    success: function success(a, b) {
        console.log("Success: ", a, b);
    }, // Get it!
    error: function error(a, b) {
        console.log("Error: ", a, b);
    }, // Get it!
    complete: function complete(a, b) {
        console.log("Complete: ", a, b);
    }, // Get it!

    //flags
    async: true, // Get it!
    global: true // Get it!
};

document.addEventListener('startAjax', function (event) {
    console.log("Start Ajax event:", event);
});
document.addEventListener('endAjax', function (event) {
    console.log("End Ajax event:", event);
});

var one_ajax = new _ajax.ajax(ajax_params);
var seconde_ajax = new _ajax.ajax({ data: { pop: "222" }, method: "POST", url: "http://httpbin.org/post", dataType: "json" });
var data = {
    one: "two"
};
var s = new _ajax.ajax({ data: data, header: { one: "two" }, url: "http://httpbin.org/post", method: "POST", dataType: "json" });
console.log(s);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ajax = function ajax(params) {
    var _this = this;

    this.url = params.url;
    this.data = params.data || {};
    this.method = params.method || "GET";
    this.header = params.header || {};
    this.dataType = params.dataType || "text";
    this.username = params.username || "";
    this.password = params.password || "";

    this.beforeSend = params.beforeSend || function () {};
    this.onComplete = params.complete || function () {};
    this.onSuccess = params.success || function () {};
    this.onError = params.error || function () {};

    this.async = !(params.async === false);
    this.global = !!params.global;

    var processingResponseByDataType = _defineProperty({
        "text": function text(data) {
            return data;
        },
        "html": function html(data) {
            return data;
        },
        "xml": function xml(data) {
            var parser = new DOMParser();
            return parser.parseFromString(data, "text/xml");
        },
        "json": function json(data) {
            return JSON.parse(data);
        },
        "script": function script(data) {
            return new Function(data)();
        } }, "text", function text(data) {
        return data;
    });

    var getXmlHttp = function getXmlHttp() {
        var xmlhttp = void 0;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    };

    var responseProcessing = function responseProcessing(response) {
        return (processingResponseByDataType[_this.dataType] || function (data) {
            return data;
        })(response);
    };
    var paramsProcessing = function paramsProcessing() {
        var params = "";
        var params_get = "";
        var params_post = "";
        for (var key in _this.data) {
            if (params != "") {
                params += "&";
            }
            params += encodeURIComponent(key) + "=" + encodeURIComponent(_this.data[key]);
        }

        if (_this.method != "GET") {
            params_post = params;
        } else {
            if (params != "") {
                if (_this.url.indexOf("?") >= 0) {
                    if (_this.url[-1] != "?") {
                        params = "&" + params;
                    }
                } else {
                    params = "?" + params;
                }
            }
            params_get = params;
        }

        return { params_get: params_get, params_post: params_post };
    };
    var headerProcessing = function headerProcessing() {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        for (var key in _this.header) {
            xhr.setRequestHeader(key, _this.header[key]);
        }
    };
    var generateEvent = function generateEvent(name) {
        if (_this.global) document.dispatchEvent(new Event(name));
    };

    generateEvent("startAjax");
    this.beforeSend();
    var xhr = getXmlHttp();

    var _paramsProcessing = paramsProcessing(),
        params_get = _paramsProcessing.params_get,
        params_post = _paramsProcessing.params_post;

    xhr.open(this.method, this.url + params_get, this.async, this.username, this.password);
    headerProcessing();
    xhr.send(params_post);

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        _this.status = xhr.status;
        if (_this.status >= 200 && _this.status < 300) {
            _this.response = responseProcessing(xhr.responseText);
            _this.onSuccess(_this.status, _this.response);
        } else {
            _this.onError(_this.status, _this.response);
        }
        _this.onComplete(_this.status, _this.response);

        generateEvent("endAjax");
    };
};
exports.ajax = ajax;

/***/ })
/******/ ]);