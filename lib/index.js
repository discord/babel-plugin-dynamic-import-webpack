Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelTemplate = require('babel-template');

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelPluginSyntaxDynamicImport = require('babel-plugin-syntax-dynamic-import');

var _babelPluginSyntaxDynamicImport2 = _interopRequireDefault(_babelPluginSyntaxDynamicImport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var buildImport = (0, _babelTemplate2['default'])('\n  (new Promise((resolve, reject) => {\n    require.ensure([], (require) => {\n      try {\n        resolve(require(SOURCE));\n      } catch (err) {\n        reject(err);\n      }\n    });\n  }))\n');

exports['default'] = function () {
  return {
    inherits: _babelPluginSyntaxDynamicImport2['default'],

    visitor: {
      Import: function () {
        function Import(path) {
          var newImport = buildImport({
            SOURCE: path.parentPath.node.arguments
          });
          path.parentPath.replaceWith(newImport);
        }

        return Import;
      }()
    }
  };
};