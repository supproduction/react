'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/bigdrop/Projects/skill-up/react/next_js/pages/index.js?entry';


var IndexPage = function (_Component) {
    (0, _inherits3.default)(IndexPage, _Component);

    function IndexPage() {
        (0, _classCallCheck3.default)(this, IndexPage);

        return (0, _possibleConstructorReturn3.default)(this, (IndexPage.__proto__ || (0, _getPrototypeOf2.default)(IndexPage)).apply(this, arguments));
    }

    (0, _createClass3.default)(IndexPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                }
            }, _react2.default.createElement('h1', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 18
                }
            }, 'The Main Page of ', this.props.appName), _react2.default.createElement('p', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                }
            }, 'Go ti ', _react2.default.createElement(_link2.default, { href: '/auth', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                }
            }, _react2.default.createElement('a', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                }
            }, 'Auth'))));
        }
    }], [{
        key: 'getInitialProps',
        value: function getInitialProps(context) {
            var promise = new _promise2.default(function (resolve, reject) {
                setTimeout(function () {
                    resolve({ appName: 'Super App' });
                }, 1000);
            });
            return promise;
        }
    }]);

    return IndexPage;
}(_react.Component);

exports.default = IndexPage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGluayIsIkluZGV4UGFnZSIsInByb3BzIiwiYXBwTmFtZSIsImNvbnRleHQiLCJwcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPOzs7Ozs7Ozs7SSxBQUdEOzs7Ozs7Ozs7OztpQ0FVTyxBQUNMO21DQUNJLGNBQUE7OzhCQUFBO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ksY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBQXNCLDBCQUFBLEFBQUssTUFEL0IsQUFDSSxBQUFpQyxBQUNqQywwQkFBQSxjQUFBOzs4QkFBQTtnQ0FBQTtBQUFBO0FBQUEsZUFBUywwQkFBQSxBQUFDLGdDQUFLLE1BQU4sQUFBVzs4QkFBWDtnQ0FBQSxBQUFtQjtBQUFuQjsrQkFBbUIsY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBSHBDLEFBQ0ksQUFFSSxBQUFTLEFBQW1CLEFBR3ZDOzs7O3dDQWhCc0IsQSxTQUFTLEFBQzVCO2dCQUFNLGdDQUFzQixVQUFBLEFBQUMsU0FBRCxBQUFVLFFBQVcsQUFDN0M7MkJBQVcsWUFBTSxBQUNiOzRCQUFRLEVBQUMsU0FBVCxBQUFRLEFBQVUsQUFDckI7QUFGRCxtQkFBQSxBQUVHLEFBQ047QUFKRCxBQUFnQixBQUtoQixhQUxnQjttQkFLaEIsQUFBTyxBQUNWOzs7OztBQVJtQixBLEFBb0J4Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvaG9tZS9iaWdkcm9wL1Byb2plY3RzL3NraWxsLXVwL3JlYWN0L25leHRfanMifQ==