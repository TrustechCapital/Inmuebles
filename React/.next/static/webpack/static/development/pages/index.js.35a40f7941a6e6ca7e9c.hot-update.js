webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./components/Bienes/BienesApi.jsx":
/*!*****************************************!*\
  !*** ./components/Bienes/BienesApi.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primereact/datatable */ "./node_modules/primereact/datatable.js");
/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primereact_datatable__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Funciones__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Funciones */ "./components/Funciones.jsx");






var _jsxFileName = "D:\\GIT\\Eominguer\\Banregio\\Fiducia-Banregio\\React\\components\\Bienes\\BienesApi.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement;

function _createSuper(Derived) { return function () { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var BienesApi = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(BienesApi, _React$Component);

  var _super = _createSuper(BienesApi);

  function BienesApi(props) {
    var _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, BienesApi);

    _this = _super.call(this, props);
    _this.state = {
      fiduca: {
        data: []
      }
    };
    return _this;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(BienesApi, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var llamados, data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function componentDidMount$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              llamados = new _Funciones__WEBPACK_IMPORTED_MODULE_9__["default"]();
              _context.next = 3;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(llamados.datosTabla('json={"id":"funRegistroGarantias"}'));

            case 3:
              console.log(llamados.filas);
              data = llamados.filas;
              this.setState({
                fiduca: data
              });
              /*this.llamada().then(data => {
                  this.setState({fiduca: data});
              });*/

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, null, Promise);
    }
  }, {
    key: "setFiso",
    value: function setFiso(datos) {}
  }, {
    key: "displaySelection",
    value: function displaySelection(data) {
      var _this2 = this;

      console.log(data);

      if (!data || data.length === 0) {
        return __jsx("div", {
          style: {
            textAlign: 'left'
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 40,
            columnNumber: 20
          }
        }, "Sin Selecci\xF3n");
      } else {
        if (data instanceof Array) return __jsx("ul", {
          style: {
            textAlign: 'left',
            margin: 0
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 45,
            columnNumber: 24
          }
        }, data.map(function (bien, i) {
          return __jsx("li", {
            key: bien.fgarIdFideicomiso,
            __self: _this2,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 45,
              columnNumber: 89
            }
          }, bien.fgarIdFideicomiso + ' - ' + bien.fgarCveGarantia2);
        }));else return __jsx("div", {
          style: {
            textAlign: 'left'
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 47,
            columnNumber: 24
          }
        }, "Datos elegidos: ", data.fgarIdFideicomiso + ' - ' + data.fgarCveGarantia2);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return __jsx("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 13
        }
      }, __jsx(primereact_datatable__WEBPACK_IMPORTED_MODULE_8__["DataTable"], {
        value: this.state.fiduca.data,
        paginator: true,
        rows: 10,
        selectionMode: "single",
        footer: this.displaySelection(this.state.electo),
        selection: this.state.electo,
        onSelectionChange: function onSelectionChange(e) {
          return _this3.setState({
            electo: e.value
          });
        },
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 17
        }
      }, __jsx(primereact_datatable__WEBPACK_IMPORTED_MODULE_8__["Column"], {
        field: "fgarIdFideicomiso",
        header: "Fideicomiso",
        sortable: true,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 21
        }
      }), __jsx(primereact_datatable__WEBPACK_IMPORTED_MODULE_8__["Column"], {
        field: "fgarCveGarantia2",
        header: "Tipo de Bien",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60,
          columnNumber: 21
        }
      }), __jsx(primereact_datatable__WEBPACK_IMPORTED_MODULE_8__["Column"], {
        field: "fgarImpGarantiaFormatted",
        header: "Importe",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61,
          columnNumber: 21
        }
      }), __jsx(primereact_datatable__WEBPACK_IMPORTED_MODULE_8__["Column"], {
        field: "fgarImpGarantizadFormatted",
        header: "Importe Garantizado",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62,
          columnNumber: 21
        }
      }), __jsx(primereact_datatable__WEBPACK_IMPORTED_MODULE_8__["Column"], {
        field: "fgarCveStatus",
        header: "Status",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 21
        }
      })));
    }
  }]);

  return BienesApi;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (BienesApi);

/***/ })

})
//# sourceMappingURL=index.js.35a40f7941a6e6ca7e9c.hot-update.js.map