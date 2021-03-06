// Generated by CoffeeScript 1.9.2
(function() {
  (function(factory) {
    var define;
    define = window.define;
    if (define && windowdefine.cmd) {
      define(function(require, exports, module) {
        return module.exports = factory();
      });
    } else if (window.jQuery) {
      return window.jQuery.fuse = factory();
    } else {
      return window.fuse = factory();
    }
  })(function() {

    /* midware function */
    var ruleMap, totFunc;
    totFunc = function(value, param, first, callback) {
      var rs;
      return rs = [].reduce.call(param, function(memo, crs) {
        var func;
        if (typeof crs === 'string') {
          func = fuleMap[crs];
          if (func) {
            callback(func(value), memo);
          }
        } else if (typeof crs === 'object') {
          func = ruleMap[crs.rule];
          if (func) {
            callback(func(value, crs.param), memo);
          }
        } else if (typeof crs === 'function') {
          callback(crs(), memo);
        }
        return false;
      }, first);
    };

    /* rules */
    ruleMap = {
      "require": function(value) {
        if (value === void 0) {
          return false;
        }
        return ("" + value).length !== 0;
      },
      "AND": function(value, param) {
        return totFunc(value, param, true, function(a, b) {
          return a && b;
        });
      },
      "OR": function(value, param) {
        return totFunc(value, param, false, function(a, b) {
          return a || b;
        });
      },
      "NOT": function(value, param) {
        return totFunc(value, param, false, function(a, b) {
          return !a;
        });
      },
      "NO": function() {
        return true;
      }
    };
    return {
      check: function(text, rules) {
        var handler, i, j, r, ref, reg, rs, rule;
        try {
          for (i = j = 0, ref = rules.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
            rule = rules[i];
            handler = ruleMap[rule.rule];
            rs = false;
            if (handler) {
              rs = handler(text, rule.param);
            } else {
              reg = rule.regexp;
              if (reg) {
                r = new RegExp(reg);
                rs = r.test(text);
              }
            }
            if (!rs) {
              return {
                result: false,
                message: rule.message
              };
            }
          }
        } catch (_error) {
          return {
            result: false,
            message: 'unknown error'
          };
        }
        return {
          result: true
        };
      }
    };
  });

}).call(this);
