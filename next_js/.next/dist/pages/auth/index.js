'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

var _User = require('../../components/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/bigdrop/Projects/skill-up/react/next_js/pages/auth/index.js?entry';


var authIndexPage = function authIndexPage(props) {
    return _react2.default.createElement('div', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 6
        }
    }, _react2.default.createElement('h1', {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 7
        }
    }, 'The Auth Page - ', props.appName), _react2.default.createElement('button', { onClick: function onClick() {
            return _index2.default.push('/');
        }, __source: {
            fileName: _jsxFileName,
            lineNumber: 8
        }
    }, 'Go to back'), _react2.default.createElement(_User2.default, { name: 'max', age: '28', __source: {
            fileName: _jsxFileName,
            lineNumber: 9
        }
    }));
};

authIndexPage.getInitialProps = function (context) {
    var promise = new _promise2.default(function (resolve, reject) {
        setTimeout(function () {
            resolve({ appName: 'Super App (Auth)' });
        }, 1000);
    });
    return promise;
};

exports.default = authIndexPage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2F1dGgvaW5kZXguanMiXSwibmFtZXMiOlsiUmVhY3QiLCJSb3V0ZXIiLCJVc2VyIiwiYXV0aEluZGV4UGFnZSIsInByb3BzIiwiYXBwTmFtZSIsInB1c2giLCJnZXRJbml0aWFsUHJvcHMiLCJjb250ZXh0IiwicHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPLEFBQVU7Ozs7Ozs7OztBQUVqQixJQUFNLGdCQUFnQixTQUFoQixBQUFnQixjQUFBLEFBQUMsT0FBRDsyQkFDbEIsY0FBQTs7c0JBQUE7d0JBQUEsQUFDSTtBQURKO0FBQUEsS0FBQSxrQkFDSSxjQUFBOztzQkFBQTt3QkFBQTtBQUFBO0FBQUEsT0FBcUIsMEJBRHpCLEFBQ0ksQUFBMkIsQUFDM0IsMEJBQUEsY0FBQSxZQUFRLFNBQVMsbUJBQUE7bUJBQU0sZ0JBQUEsQUFBTyxLQUFiLEFBQU0sQUFBWTtBQUFuQztzQkFBQTt3QkFBQTtBQUFBO09BRkosQUFFSSxBQUNBLCtCQUFBLEFBQUMsZ0NBQUssTUFBTixBQUFXLE9BQU0sS0FBakIsQUFBcUI7c0JBQXJCO3dCQUpjLEFBQ2xCLEFBR0k7QUFBQTs7QUFKUjs7QUFRQSxjQUFBLEFBQWMsa0JBQWtCLFVBQUEsQUFBQyxTQUFZLEFBQ3pDO1FBQU0sZ0NBQXNCLFVBQUEsQUFBQyxTQUFELEFBQVUsUUFBVyxBQUM3QzttQkFBVyxZQUFNLEFBQ2I7b0JBQVEsRUFBQyxTQUFULEFBQVEsQUFBVSxBQUNyQjtBQUZELFdBQUEsQUFFRyxBQUNOO0FBSkQsQUFBZ0IsQUFLaEIsS0FMZ0I7V0FLaEIsQUFBTyxBQUNWO0FBUEQsQUFTQTs7a0JBQUEsQUFBZSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvaG9tZS9iaWdkcm9wL1Byb2plY3RzL3NraWxsLXVwL3JlYWN0L25leHRfanMifQ==