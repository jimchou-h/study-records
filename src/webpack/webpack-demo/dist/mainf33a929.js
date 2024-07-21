/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/testpng-static.png":
/*!***************************************!*\
  !*** ./src/assets/testpng-static.png ***!
  \***************************************/
/***/ (() => {

throw new Error("Module build failed (from ./loader/test-file-loader.js):\nTypeError: _loaderUtils.getOptions is not a function\n    at Object.module.exports (D:\\学习\\Github\\study-records\\src\\webpack\\webpack-demo\\loader\\test-file-loader.js:4:30)");

/***/ }),

/***/ "./src/age.js":
/*!********************!*\
  !*** ./src/age.js ***!
  \********************/
/***/ ((module) => {

var age = 20

module.exports = age

/***/ }),

/***/ "./src/name.js":
/*!*********************!*\
  !*** ./src/name.js ***!
  \*********************/
/***/ ((module) => {

var name = '李四'

module.exports = name

/***/ }),

/***/ "./src/unused.js":
/*!***********************!*\
  !*** ./src/unused.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unused: () => (/* binding */ unused)
/* harmony export */ });
// 使用tree-shaking的前提是必须使用ESMODULE
var unused = 1

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _unused_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unused.js */ "./src/unused.js");
/* harmony import */ var _assets_testpng_static_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/testpng-static.png */ "./src/assets/testpng-static.png");
/* harmony import */ var _assets_testpng_static_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_testpng_static_png__WEBPACK_IMPORTED_MODULE_1__);
var name = __webpack_require__(/*! ./name.js */ "./src/name.js");
var age = __webpack_require__(/*! ./age.js */ "./src/age.js");


console.log("entry文件打印作者信息", name, age);
console.log(_unused_js__WEBPACK_IMPORTED_MODULE_0__.unused)
console.log((_assets_testpng_static_png__WEBPACK_IMPORTED_MODULE_1___default()))
console.log("测试")
var a = 1
})();

/******/ })()
;
//# sourceMappingURL=mainf33a929.js.map