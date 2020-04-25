webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./components/Funciones.jsx":
/*!**********************************!*\
  !*** ./components/Funciones.jsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Funciones; });
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _AxiosCalls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AxiosCalls */ "./components/AxiosCalls.jsx");




var Funciones = /*#__PURE__*/function () {
  function Funciones() {
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Funciones);

    this.data = null;
    this.filas = null;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Funciones, [{
    key: "datosTabla",
    value: function datosTabla(params) {
      return _AxiosCalls__WEBPACK_IMPORTED_MODULE_2__["default"].get('getRef.do?' + params).then(function (response) {
        return response.data;
      }).then(function (data) {
        this.data = data;
      }.bind(this));
    }
  }]);

  return Funciones;
}();



/***/ })

})
//# sourceMappingURL=index.js.19485affdf96f41b5508.hot-update.js.map