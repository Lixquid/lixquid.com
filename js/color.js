"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color;

Color = function () {
  var addLeadingZero, clamp, hexRegex, round;

  var Color = function () {
    function Color(r1, g1, b1, a1) {
      _classCallCheck(this, Color);

      var a, b, g, r;
      this.r = r1;
      this.g = g1;
      this.b = b1;
      this.a = a1;
      if (this.r instanceof Array) {
        var _r = _slicedToArray(this.r, 4);

        this.r = _r[0];
        this.g = _r[1];
        this.b = _r[2];
        this.a = _r[3];
      } else if (this.r instanceof Object) {
        var _r2 = this.r;
        this.r = _r2.r;
        this.g = _r2.g;
        this.b = _r2.b;
        this.a = _r2.a;
      }
      if (this.a == null) {
        this.a = 255;
      }
      r = clamp(r, 0, 255);
      g = clamp(g, 0, 255);
      b = clamp(b, 0, 255);
      a = clamp(a, 0, 255);
    }

    _createClass(Color, [{
      key: "toRGB",
      value: function toRGB() {
        var out;
        out = [this.r, this.g, this.b, this.a];
        out.r = this.r;
        out.g = this.g;
        out.b = this.b;
        out.a = this.a;
        return out;
      }
    }, {
      key: "toHex",
      value: function toHex() {
        var output;
        output = addLeadingZero(this.r.toString(16)) + addLeadingZero(this.g.toString(16)) + addLeadingZero(this.b.toString(16));
        if (this.a !== 255) {
          output += addLeadingZero(this.a.toString(16));
        }
        return output.toUpperCase();
      }
    }, {
      key: "toCMYK",
      value: function toCMYK() {
        var precision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

        var k, out;
        k = Math.min(1 - this.r / 255, 1 - this.g / 255, 1 - this.b / 255);
        out = [round((1 - this.r / 255 - k) / (1 - k), precision), round((1 - this.g / 255 - k) / (1 - k), precision), round((1 - this.b / 255 - k) / (1 - k), precision), round(k, precision)];
        out.c = out[0];
        out.m = out[1];
        out.y = out[2];
        out.k = out[3];
        return out;
      }
    }, {
      key: "toString",
      value: function toString(format) {
        var _this = this;

        var cmyk, hex, rgb;
        if (format) {
          rgb = null;
          cmyk = null;
          hex = null;
          return format.replace(/\$(.)/g, function (_, c) {
            switch (c) {
              case "$":
                return "$";
              case "r":
              case "g":
              case "b":
                if (!rgb) {
                  rgb = _this.toRGB();
                }
                return rgb[c];
              case "c":
              case "m":
              case "y":
              case "k":
                if (!cmyk) {
                  cmyk = _this.toCMYK();
                }
                return cmyk[c];
              case "x":
              case "X":
                if (!hex) {
                  hex = _this.toHex();
                }
                if (c === "x") {
                  return hex.toLowerCase();
                } else if (c === "X") {
                  return hex;
                }
                break;
              default:
                throw "Character " + c + " is not a format character!";
            }
          });
        } else {
          rgb = this.toRGB();
          return "Color( " + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + rgb.a + " )";
        }
      }
    }], [{
      key: "fromRGB",
      value: function fromRGB(r, g, b, a) {
        if (r instanceof Array) {
          var _r3 = r;

          var _r4 = _slicedToArray(_r3, 4);

          r = _r4[0];
          g = _r4[1];
          b = _r4[2];
          a = _r4[3];
        } else if (r instanceof Object) {
          var _r5 = r;
          r = _r5.r;
          g = _r5.g;
          b = _r5.b;
          a = _r5.a;
        }
        return new Color(r, g, b, a);
      }
    }, {
      key: "fromHex",
      value: function fromHex(s) {
        var m, output;
        if (!s) {
          return;
        }
        m = s.match(hexRegex);
        if (!m) {
          return;
        }
        if (m[1]) {
          output = new Color(parseInt(m[1] + m[1], 16), parseInt(m[2] + m[2], 16), parseInt(m[3] + m[3], 16));
          if (m[4]) {
            output.a = parseInt(m[4] + m[4], 16);
          }
          return output;
        } else {
          output = new Color(parseInt(match[5], 16), parseInt(match[6], 16), parseInt(match[7], 16));
          if (m[8]) {
            output.a = parseInt(match[8], 16);
          }
          return output;
        }
      }
    }, {
      key: "fromCMYK",
      value: function fromCMYK(c, m, y, k) {
        if (c instanceof Array) {
          var _c = c;

          var _c2 = _slicedToArray(_c, 4);

          c = _c2[0];
          m = _c2[1];
          y = _c2[2];
          k = _c2[3];
        } else if (c instanceof Object) {
          var _c3 = c;
          c = _c3.c;
          m = _c3.m;
          y = _c3.y;
          k = _c3.k;
        }
        c = clamp(c, 0, 1);
        m = clamp(m, 0, 1);
        y = clamp(y, 0, 1);
        k = clamp(k, 0, 1);
        return new Color(Math.round(255 * (1 - Math.min(1, c * (1 - k) + k))), Math.round(255 * (1 - Math.min(1, m * (1 - k) + k))), Math.round(255 * (1 - Math.min(1, y * (1 - k) + k))));
      }
    }]);

    return Color;
  }();

  ;

  //# Util
  addLeadingZero = function addLeadingZero(s) {
    if (s.length < 2) {
      return "0" + s;
    } else {
      return s;
    }
  };

  clamp = function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  };

  round = function round(v, precision) {
    return Math.round(v * Math.pow(10, precision)) / Math.pow(10, precision);
  };

  hexRegex = /^\s*\#?(?:([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?|([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?)\s*$/i;

  return Color;
}.call(undefined);