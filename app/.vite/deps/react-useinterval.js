import {
  require_react
} from "./chunk-E55NSNTN.js";
import {
  __commonJS
} from "./chunk-4MBMRILA.js";

// node_modules/react-useinterval/dist/index.js
var require_dist = __commonJS({
  "node_modules/react-useinterval/dist/index.js"(exports, module) {
    var r = require_react();
    module.exports = function(e, t) {
      for (var n = [], u = 2; u < arguments.length; u++) n[u - 2] = arguments[u];
      var c = r.useRef();
      r.useEffect(function() {
        c.current = e;
      }, [e]), r.useEffect(function() {
        if (null != t) {
          var r2 = setInterval(function() {
            c.current && c.current.apply(c, n);
          }, t);
          return function() {
            return clearInterval(r2);
          };
        }
      }, [t]);
    };
  }
});
export default require_dist();
//# sourceMappingURL=react-useinterval.js.map
