var Wu = Object.create;
var Xi = Object.defineProperty;
var zu = Object.getOwnPropertyDescriptor;
var ju = Object.getOwnPropertyNames;
var $u = Object.getPrototypeOf, Ku = Object.prototype.hasOwnProperty;
var Yu = (r3, t, e) => t in r3 ? Xi(r3, t, { enumerable: true, configurable: true, writable: true, value: e }) : r3[t] = e;
var t0 = ((r3) => typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(r3, { get: (t, e) => (typeof require != "undefined" ? require : t)[e] }) : r3)(function(r3) {
  if (typeof require != "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + r3 + '" is not supported');
});
var ri = (r3, t) => () => (r3 && (t = r3(r3 = 0)), t);
var ae = (r3, t) => () => (t || r3((t = { exports: {} }).exports, t), t.exports), e0 = (r3, t) => {
  for (var e in t)
    Xi(r3, e, { get: t[e], enumerable: true });
}, r0 = (r3, t, e, f) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of ju(t))
      !Ku.call(r3, n) && n !== e && Xi(r3, n, { get: () => t[n], enumerable: !(f = zu(t, n)) || f.enumerable });
  return r3;
};
var Ue = (r3, t, e) => (e = r3 != null ? Wu($u(r3)) : {}, r0(t || !r3 || !r3.__esModule ? Xi(e, "default", { value: r3, enumerable: true }) : e, r3)), Hu = (r3) => r0(Xi({}, "__esModule", { value: true }), r3);
var pe = (r3, t, e) => (Yu(r3, typeof t != "symbol" ? t + "" : t, e), e);
var n0 = ae((Tg, Zo) => {
  var Zu = Object.prototype.hasOwnProperty, rr = "~";
  function Qi() {
  }
  Object.create && (Qi.prototype = /* @__PURE__ */ Object.create(null), new Qi().__proto__ || (rr = false));
  function Vu(r3, t, e) {
    this.fn = r3, this.context = t, this.once = e || false;
  }
  function i0(r3, t, e, f, n) {
    if (typeof e != "function")
      throw new TypeError("The listener must be a function");
    var g = new Vu(e, f || r3, n), y = rr ? rr + t : t;
    return r3._events[y] ? r3._events[y].fn ? r3._events[y] = [r3._events[y], g] : r3._events[y].push(g) : (r3._events[y] = g, r3._eventsCount++), r3;
  }
  function Un(r3, t) {
    --r3._eventsCount === 0 ? r3._events = new Qi() : delete r3._events[t];
  }
  function Qe() {
    this._events = new Qi(), this._eventsCount = 0;
  }
  Qe.prototype.eventNames = function() {
    var t = [], e, f;
    if (this._eventsCount === 0)
      return t;
    for (f in e = this._events)
      Zu.call(e, f) && t.push(rr ? f.slice(1) : f);
    return Object.getOwnPropertySymbols ? t.concat(Object.getOwnPropertySymbols(e)) : t;
  };
  Qe.prototype.listeners = function(t) {
    var e = rr ? rr + t : t, f = this._events[e];
    if (!f)
      return [];
    if (f.fn)
      return [f.fn];
    for (var n = 0, g = f.length, y = new Array(g); n < g; n++)
      y[n] = f[n].fn;
    return y;
  };
  Qe.prototype.listenerCount = function(t) {
    var e = rr ? rr + t : t, f = this._events[e];
    return f ? f.fn ? 1 : f.length : 0;
  };
  Qe.prototype.emit = function(t, e, f, n, g, y) {
    var _ = rr ? rr + t : t;
    if (!this._events[_])
      return false;
    var E = this._events[_], S = arguments.length, I, F;
    if (E.fn) {
      switch (E.once && this.removeListener(t, E.fn, void 0, true), S) {
        case 1:
          return E.fn.call(E.context), true;
        case 2:
          return E.fn.call(E.context, e), true;
        case 3:
          return E.fn.call(E.context, e, f), true;
        case 4:
          return E.fn.call(E.context, e, f, n), true;
        case 5:
          return E.fn.call(E.context, e, f, n, g), true;
        case 6:
          return E.fn.call(E.context, e, f, n, g, y), true;
      }
      for (F = 1, I = new Array(S - 1); F < S; F++)
        I[F - 1] = arguments[F];
      E.fn.apply(E.context, I);
    } else {
      var P = E.length, Y;
      for (F = 0; F < P; F++)
        switch (E[F].once && this.removeListener(t, E[F].fn, void 0, true), S) {
          case 1:
            E[F].fn.call(E[F].context);
            break;
          case 2:
            E[F].fn.call(E[F].context, e);
            break;
          case 3:
            E[F].fn.call(E[F].context, e, f);
            break;
          case 4:
            E[F].fn.call(E[F].context, e, f, n);
            break;
          default:
            if (!I)
              for (Y = 1, I = new Array(S - 1); Y < S; Y++)
                I[Y - 1] = arguments[Y];
            E[F].fn.apply(E[F].context, I);
        }
    }
    return true;
  };
  Qe.prototype.on = function(t, e, f) {
    return i0(this, t, e, f, false);
  };
  Qe.prototype.once = function(t, e, f) {
    return i0(this, t, e, f, true);
  };
  Qe.prototype.removeListener = function(t, e, f, n) {
    var g = rr ? rr + t : t;
    if (!this._events[g])
      return this;
    if (!e)
      return Un(this, g), this;
    var y = this._events[g];
    if (y.fn)
      y.fn === e && (!n || y.once) && (!f || y.context === f) && Un(this, g);
    else {
      for (var _ = 0, E = [], S = y.length; _ < S; _++)
        (y[_].fn !== e || n && !y[_].once || f && y[_].context !== f) && E.push(y[_]);
      E.length ? this._events[g] = E.length === 1 ? E[0] : E : Un(this, g);
    }
    return this;
  };
  Qe.prototype.removeAllListeners = function(t) {
    var e;
    return t ? (e = rr ? rr + t : t, this._events[e] && Un(this, e)) : (this._events = new Qi(), this._eventsCount = 0), this;
  };
  Qe.prototype.off = Qe.prototype.removeListener;
  Qe.prototype.addListener = Qe.prototype.on;
  Qe.prefixed = rr;
  Qe.EventEmitter = Qe;
  typeof Zo != "undefined" && (Zo.exports = Qe);
});
var f0 = ae((Ig, a0) => {
  a0.exports = Error;
});
var l0 = ae((Ng, h0) => {
  h0.exports = EvalError;
});
var c0 = ae((Ug, u0) => {
  u0.exports = RangeError;
});
var p0 = ae((Rg, d0) => {
  d0.exports = ReferenceError;
});
var Vo = ae((Pg, m0) => {
  m0.exports = SyntaxError;
});
var mi = ae((Dg, g0) => {
  g0.exports = TypeError;
});
var y0 = ae((Og, v0) => {
  v0.exports = URIError;
});
var x0 = ae((kg, w0) => {
  w0.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return false;
    if (typeof Symbol.iterator == "symbol")
      return true;
    var t = {}, e = Symbol("test"), f = Object(e);
    if (typeof e == "string" || Object.prototype.toString.call(e) !== "[object Symbol]" || Object.prototype.toString.call(f) !== "[object Symbol]")
      return false;
    var n = 42;
    t[e] = n;
    for (e in t)
      return false;
    if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
      return false;
    var g = Object.getOwnPropertySymbols(t);
    if (g.length !== 1 || g[0] !== e || !Object.prototype.propertyIsEnumerable.call(t, e))
      return false;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var y = Object.getOwnPropertyDescriptor(t, e);
      if (y.value !== n || y.enumerable !== true)
        return false;
    }
    return true;
  };
});
var A0 = ae((Lg, b0) => {
  var M0 = typeof Symbol != "undefined" && Symbol, Gu = x0();
  b0.exports = function() {
    return typeof M0 != "function" || typeof Symbol != "function" || typeof M0("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? false : Gu();
  };
});
var E0 = ae((qg, _0) => {
  var Go = { __proto__: null, foo: {} }, Ju = Object;
  _0.exports = function() {
    return { __proto__: Go }.foo === Go.foo && !(Go instanceof Ju);
  };
});
var S0 = ae((Wg, B0) => {
  var Xu = "Function.prototype.bind called on incompatible ", Qu = Object.prototype.toString, tc = Math.max, ec = "[object Function]", C0 = function(t, e) {
    for (var f = [], n = 0; n < t.length; n += 1)
      f[n] = t[n];
    for (var g = 0; g < e.length; g += 1)
      f[g + t.length] = e[g];
    return f;
  }, rc = function(t, e) {
    for (var f = [], n = e || 0, g = 0; n < t.length; n += 1, g += 1)
      f[g] = t[n];
    return f;
  }, ic = function(r3, t) {
    for (var e = "", f = 0; f < r3.length; f += 1)
      e += r3[f], f + 1 < r3.length && (e += t);
    return e;
  };
  B0.exports = function(t) {
    var e = this;
    if (typeof e != "function" || Qu.apply(e) !== ec)
      throw new TypeError(Xu + e);
    for (var f = rc(arguments, 1), n, g = function() {
      if (this instanceof n) {
        var I = e.apply(this, C0(f, arguments));
        return Object(I) === I ? I : this;
      }
      return e.apply(t, C0(f, arguments));
    }, y = tc(0, e.length - f.length), _ = [], E = 0; E < y; E++)
      _[E] = "$" + E;
    if (n = Function("binder", "return function (" + ic(_, ",") + "){ return binder.apply(this,arguments); }")(g), e.prototype) {
      var S = function() {
      };
      S.prototype = e.prototype, n.prototype = new S(), S.prototype = null;
    }
    return n;
  };
});
var Pn = ae((zg, T0) => {
  var nc = S0();
  T0.exports = Function.prototype.bind || nc;
});
var I0 = ae((jg, F0) => {
  var oc = Function.prototype.call, sc = Object.prototype.hasOwnProperty, ac = Pn();
  F0.exports = ac.call(oc, sc);
});
var oi = ae(($g, D0) => {
  var Ce, fc = f0(), hc = l0(), lc = c0(), uc = p0(), wi = Vo(), yi = mi(), cc = y0(), P0 = Function, Jo = function(r3) {
    try {
      return P0('"use strict"; return (' + r3 + ").constructor;")();
    } catch (t) {
    }
  }, ii = Object.getOwnPropertyDescriptor;
  if (ii)
    try {
      ii({}, "");
    } catch (r3) {
      ii = null;
    }
  var Xo = function() {
    throw new yi();
  }, dc = ii ? function() {
    try {
      return arguments.callee, Xo;
    } catch (r3) {
      try {
        return ii(arguments, "callee").get;
      } catch (t) {
        return Xo;
      }
    }
  }() : Xo, gi = A0()(), pc = E0()(), Ye = Object.getPrototypeOf || (pc ? function(r3) {
    return r3.__proto__;
  } : null), vi = {}, mc = typeof Uint8Array == "undefined" || !Ye ? Ce : Ye(Uint8Array), ni = { __proto__: null, "%AggregateError%": typeof AggregateError == "undefined" ? Ce : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer == "undefined" ? Ce : ArrayBuffer, "%ArrayIteratorPrototype%": gi && Ye ? Ye([][Symbol.iterator]()) : Ce, "%AsyncFromSyncIteratorPrototype%": Ce, "%AsyncFunction%": vi, "%AsyncGenerator%": vi, "%AsyncGeneratorFunction%": vi, "%AsyncIteratorPrototype%": vi, "%Atomics%": typeof Atomics == "undefined" ? Ce : Atomics, "%BigInt%": typeof BigInt == "undefined" ? Ce : BigInt, "%BigInt64Array%": typeof BigInt64Array == "undefined" ? Ce : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array == "undefined" ? Ce : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView == "undefined" ? Ce : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": fc, "%eval%": eval, "%EvalError%": hc, "%Float32Array%": typeof Float32Array == "undefined" ? Ce : Float32Array, "%Float64Array%": typeof Float64Array == "undefined" ? Ce : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry == "undefined" ? Ce : FinalizationRegistry, "%Function%": P0, "%GeneratorFunction%": vi, "%Int8Array%": typeof Int8Array == "undefined" ? Ce : Int8Array, "%Int16Array%": typeof Int16Array == "undefined" ? Ce : Int16Array, "%Int32Array%": typeof Int32Array == "undefined" ? Ce : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": gi && Ye ? Ye(Ye([][Symbol.iterator]())) : Ce, "%JSON%": typeof JSON == "object" ? JSON : Ce, "%Map%": typeof Map == "undefined" ? Ce : Map, "%MapIteratorPrototype%": typeof Map == "undefined" || !gi || !Ye ? Ce : Ye((/* @__PURE__ */ new Map())[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise == "undefined" ? Ce : Promise, "%Proxy%": typeof Proxy == "undefined" ? Ce : Proxy, "%RangeError%": lc, "%ReferenceError%": uc, "%Reflect%": typeof Reflect == "undefined" ? Ce : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set == "undefined" ? Ce : Set, "%SetIteratorPrototype%": typeof Set == "undefined" || !gi || !Ye ? Ce : Ye((/* @__PURE__ */ new Set())[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer == "undefined" ? Ce : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": gi && Ye ? Ye(""[Symbol.iterator]()) : Ce, "%Symbol%": gi ? Symbol : Ce, "%SyntaxError%": wi, "%ThrowTypeError%": dc, "%TypedArray%": mc, "%TypeError%": yi, "%Uint8Array%": typeof Uint8Array == "undefined" ? Ce : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray == "undefined" ? Ce : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array == "undefined" ? Ce : Uint16Array, "%Uint32Array%": typeof Uint32Array == "undefined" ? Ce : Uint32Array, "%URIError%": cc, "%WeakMap%": typeof WeakMap == "undefined" ? Ce : WeakMap, "%WeakRef%": typeof WeakRef == "undefined" ? Ce : WeakRef, "%WeakSet%": typeof WeakSet == "undefined" ? Ce : WeakSet };
  if (Ye)
    try {
      null.error;
    } catch (r3) {
      N0 = Ye(Ye(r3)), ni["%Error.prototype%"] = N0;
    }
  var N0, gc = function r3(t) {
    var e;
    if (t === "%AsyncFunction%")
      e = Jo("async function () {}");
    else if (t === "%GeneratorFunction%")
      e = Jo("function* () {}");
    else if (t === "%AsyncGeneratorFunction%")
      e = Jo("async function* () {}");
    else if (t === "%AsyncGenerator%") {
      var f = r3("%AsyncGeneratorFunction%");
      f && (e = f.prototype);
    } else if (t === "%AsyncIteratorPrototype%") {
      var n = r3("%AsyncGenerator%");
      n && Ye && (e = Ye(n.prototype));
    }
    return ni[t] = e, e;
  }, U0 = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, tn = Pn(), Dn = I0(), vc = tn.call(Function.call, Array.prototype.concat), yc = tn.call(Function.apply, Array.prototype.splice), R0 = tn.call(Function.call, String.prototype.replace), On = tn.call(Function.call, String.prototype.slice), wc = tn.call(Function.call, RegExp.prototype.exec), xc = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Mc = /\\(\\)?/g, bc = function(t) {
    var e = On(t, 0, 1), f = On(t, -1);
    if (e === "%" && f !== "%")
      throw new wi("invalid intrinsic syntax, expected closing `%`");
    if (f === "%" && e !== "%")
      throw new wi("invalid intrinsic syntax, expected opening `%`");
    var n = [];
    return R0(t, xc, function(g, y, _, E) {
      n[n.length] = _ ? R0(E, Mc, "$1") : y || g;
    }), n;
  }, Ac = function(t, e) {
    var f = t, n;
    if (Dn(U0, f) && (n = U0[f], f = "%" + n[0] + "%"), Dn(ni, f)) {
      var g = ni[f];
      if (g === vi && (g = gc(f)), typeof g == "undefined" && !e)
        throw new yi("intrinsic " + t + " exists, but is not available. Please file an issue!");
      return { alias: n, name: f, value: g };
    }
    throw new wi("intrinsic " + t + " does not exist!");
  };
  D0.exports = function(t, e) {
    if (typeof t != "string" || t.length === 0)
      throw new yi("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof e != "boolean")
      throw new yi('"allowMissing" argument must be a boolean');
    if (wc(/^%?[^%]*%?$/, t) === null)
      throw new wi("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var f = bc(t), n = f.length > 0 ? f[0] : "", g = Ac("%" + n + "%", e), y = g.name, _ = g.value, E = false, S = g.alias;
    S && (n = S[0], yc(f, vc([0, 1], S)));
    for (var I = 1, F = true; I < f.length; I += 1) {
      var P = f[I], Y = On(P, 0, 1), K = On(P, -1);
      if ((Y === '"' || Y === "'" || Y === "`" || K === '"' || K === "'" || K === "`") && Y !== K)
        throw new wi("property names with quotes must have matching quotes");
      if ((P === "constructor" || !F) && (E = true), n += "." + P, y = "%" + n + "%", Dn(ni, y))
        _ = ni[y];
      else if (_ != null) {
        if (!(P in _)) {
          if (!e)
            throw new yi("base intrinsic for " + t + " exists, but the property is not available.");
          return;
        }
        if (ii && I + 1 >= f.length) {
          var Z = ii(_, P);
          F = !!Z, F && "get" in Z && !("originalValue" in Z.get) ? _ = Z.get : _ = _[P];
        } else
          F = Dn(_, P), _ = _[P];
        F && !E && (ni[y] = _);
      }
    }
    return _;
  };
});
var Ln = ae((Kg, O0) => {
  var _c = oi(), kn = _c("%Object.defineProperty%", true) || false;
  if (kn)
    try {
      kn({}, "a", { value: 1 });
    } catch (r3) {
      kn = false;
    }
  O0.exports = kn;
});
var Qo = ae((Yg, k0) => {
  var Ec = oi(), qn = Ec("%Object.getOwnPropertyDescriptor%", true);
  if (qn)
    try {
      qn([], "length");
    } catch (r3) {
      qn = null;
    }
  k0.exports = qn;
});
var z0 = ae((Hg, W0) => {
  var L0 = Ln(), Cc = Vo(), xi = mi(), q0 = Qo();
  W0.exports = function(t, e, f) {
    if (!t || typeof t != "object" && typeof t != "function")
      throw new xi("`obj` must be an object or a function`");
    if (typeof e != "string" && typeof e != "symbol")
      throw new xi("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new xi("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new xi("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new xi("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new xi("`loose`, if provided, must be a boolean");
    var n = arguments.length > 3 ? arguments[3] : null, g = arguments.length > 4 ? arguments[4] : null, y = arguments.length > 5 ? arguments[5] : null, _ = arguments.length > 6 ? arguments[6] : false, E = !!q0 && q0(t, e);
    if (L0)
      L0(t, e, { configurable: y === null && E ? E.configurable : !y, enumerable: n === null && E ? E.enumerable : !n, value: f, writable: g === null && E ? E.writable : !g });
    else if (_ || !n && !g && !y)
      t[e] = f;
    else
      throw new Cc("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var K0 = ae((Zg, $0) => {
  var ts = Ln(), j0 = function() {
    return !!ts;
  };
  j0.hasArrayLengthDefineBug = function() {
    if (!ts)
      return null;
    try {
      return ts([], "length", { value: 1 }).length !== 1;
    } catch (t) {
      return true;
    }
  };
  $0.exports = j0;
});
var G0 = ae((Vg, V0) => {
  var Bc = oi(), Y0 = z0(), Sc = K0()(), H0 = Qo(), Z0 = mi(), Tc = Bc("%Math.floor%");
  V0.exports = function(t, e) {
    if (typeof t != "function")
      throw new Z0("`fn` is not a function");
    if (typeof e != "number" || e < 0 || e > 4294967295 || Tc(e) !== e)
      throw new Z0("`length` must be a positive 32-bit integer");
    var f = arguments.length > 2 && !!arguments[2], n = true, g = true;
    if ("length" in t && H0) {
      var y = H0(t, "length");
      y && !y.configurable && (n = false), y && !y.writable && (g = false);
    }
    return (n || g || !f) && (Sc ? Y0(t, "length", e, true, true) : Y0(t, "length", e)), t;
  };
});
var rf = ae((Gg, Wn) => {
  var es = Pn(), zn = oi(), Fc = G0(), Ic = mi(), Q0 = zn("%Function.prototype.apply%"), tf = zn("%Function.prototype.call%"), ef = zn("%Reflect.apply%", true) || es.call(tf, Q0), J0 = Ln(), Nc = zn("%Math.max%");
  Wn.exports = function(t) {
    if (typeof t != "function")
      throw new Ic("a function is required");
    var e = ef(es, tf, arguments);
    return Fc(e, 1 + Nc(0, t.length - (arguments.length - 1)), true);
  };
  var X0 = function() {
    return ef(es, Q0, arguments);
  };
  J0 ? J0(Wn.exports, "apply", { value: X0 }) : Wn.exports.apply = X0;
});
var af = ae((Jg, sf) => {
  var nf = oi(), of = rf(), Uc = of(nf("String.prototype.indexOf"));
  sf.exports = function(t, e) {
    var f = nf(t, !!e);
    return typeof f == "function" && Uc(t, ".prototype.") > -1 ? of(f) : f;
  };
});
var ff = ae(() => {
});
var Sf = ae((tv, Bf) => {
  var us = typeof Map == "function" && Map.prototype, rs = Object.getOwnPropertyDescriptor && us ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, $n = us && rs && typeof rs.get == "function" ? rs.get : null, hf = us && Map.prototype.forEach, cs = typeof Set == "function" && Set.prototype, is = Object.getOwnPropertyDescriptor && cs ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Kn = cs && is && typeof is.get == "function" ? is.get : null, lf = cs && Set.prototype.forEach, Rc = typeof WeakMap == "function" && WeakMap.prototype, rn = Rc ? WeakMap.prototype.has : null, Pc = typeof WeakSet == "function" && WeakSet.prototype, nn = Pc ? WeakSet.prototype.has : null, Dc = typeof WeakRef == "function" && WeakRef.prototype, uf = Dc ? WeakRef.prototype.deref : null, Oc = Boolean.prototype.valueOf, kc = Object.prototype.toString, Lc = Function.prototype.toString, qc = String.prototype.match, ds = String.prototype.slice, jr = String.prototype.replace, Wc = String.prototype.toUpperCase, cf = String.prototype.toLowerCase, Mf = RegExp.prototype.test, df = Array.prototype.concat, gr = Array.prototype.join, zc = Array.prototype.slice, pf = Math.floor, ss = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, ns = Object.getOwnPropertySymbols, as = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Mi = typeof Symbol == "function" && typeof Symbol.iterator == "object", tr = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Mi || "symbol") ? Symbol.toStringTag : null, bf = Object.prototype.propertyIsEnumerable, mf = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(r3) {
    return r3.__proto__;
  } : null);
  function gf(r3, t) {
    if (r3 === 1 / 0 || r3 === -1 / 0 || r3 !== r3 || r3 && r3 > -1e3 && r3 < 1e3 || Mf.call(/e/, t))
      return t;
    var e = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof r3 == "number") {
      var f = r3 < 0 ? -pf(-r3) : pf(r3);
      if (f !== r3) {
        var n = String(f), g = ds.call(t, n.length + 1);
        return jr.call(n, e, "$&_") + "." + jr.call(jr.call(g, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return jr.call(t, e, "$&_");
  }
  var fs = ff(), vf = fs.custom, yf = _f(vf) ? vf : null;
  Bf.exports = function r3(t, e, f, n) {
    var g = e || {};
    if (zr(g, "quoteStyle") && g.quoteStyle !== "single" && g.quoteStyle !== "double")
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (zr(g, "maxStringLength") && (typeof g.maxStringLength == "number" ? g.maxStringLength < 0 && g.maxStringLength !== 1 / 0 : g.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var y = zr(g, "customInspect") ? g.customInspect : true;
    if (typeof y != "boolean" && y !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (zr(g, "indent") && g.indent !== null && g.indent !== "	" && !(parseInt(g.indent, 10) === g.indent && g.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (zr(g, "numericSeparator") && typeof g.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var _ = g.numericSeparator;
    if (typeof t == "undefined")
      return "undefined";
    if (t === null)
      return "null";
    if (typeof t == "boolean")
      return t ? "true" : "false";
    if (typeof t == "string")
      return Cf(t, g);
    if (typeof t == "number") {
      if (t === 0)
        return 1 / 0 / t > 0 ? "0" : "-0";
      var E = String(t);
      return _ ? gf(t, E) : E;
    }
    if (typeof t == "bigint") {
      var S = String(t) + "n";
      return _ ? gf(t, S) : S;
    }
    var I = typeof g.depth == "undefined" ? 5 : g.depth;
    if (typeof f == "undefined" && (f = 0), f >= I && I > 0 && typeof t == "object")
      return hs(t) ? "[Array]" : "[Object]";
    var F = sd(g, f);
    if (typeof n == "undefined")
      n = [];
    else if (Ef(n, t) >= 0)
      return "[Circular]";
    function P(a, s, h) {
      if (s && (n = zc.call(n), n.push(s)), h) {
        var p = { depth: g.depth };
        return zr(g, "quoteStyle") && (p.quoteStyle = g.quoteStyle), r3(a, p, f + 1, n);
      }
      return r3(a, g, f + 1, n);
    }
    if (typeof t == "function" && !wf(t)) {
      var Y = Jc(t), K = jn(t, P);
      return "[Function" + (Y ? ": " + Y : " (anonymous)") + "]" + (K.length > 0 ? " { " + gr.call(K, ", ") + " }" : "");
    }
    if (_f(t)) {
      var Z = Mi ? jr.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : as.call(t);
      return typeof t == "object" && !Mi ? en(Z) : Z;
    }
    if (id(t)) {
      for (var k = "<" + cf.call(String(t.nodeName)), Tt = t.attributes || [], it = 0; it < Tt.length; it++)
        k += " " + Tt[it].name + "=" + Af(jc(Tt[it].value), "double", g);
      return k += ">", t.childNodes && t.childNodes.length && (k += "..."), k += "</" + cf.call(String(t.nodeName)) + ">", k;
    }
    if (hs(t)) {
      if (t.length === 0)
        return "[]";
      var q = jn(t, P);
      return F && !od(q) ? "[" + ls(q, F) + "]" : "[ " + gr.call(q, ", ") + " ]";
    }
    if (Kc(t)) {
      var j = jn(t, P);
      return !("cause" in Error.prototype) && "cause" in t && !bf.call(t, "cause") ? "{ [" + String(t) + "] " + gr.call(df.call("[cause]: " + P(t.cause), j), ", ") + " }" : j.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + gr.call(j, ", ") + " }";
    }
    if (typeof t == "object" && y) {
      if (yf && typeof t[yf] == "function" && fs)
        return fs(t, { depth: I - f });
      if (y !== "symbol" && typeof t.inspect == "function")
        return t.inspect();
    }
    if (Xc(t)) {
      var nt = [];
      return hf && hf.call(t, function(a, s) {
        nt.push(P(s, t, true) + " => " + P(a, t));
      }), xf("Map", $n.call(t), nt, F);
    }
    if (ed(t)) {
      var ft = [];
      return lf && lf.call(t, function(a) {
        ft.push(P(a, t));
      }), xf("Set", Kn.call(t), ft, F);
    }
    if (Qc(t))
      return os("WeakMap");
    if (rd(t))
      return os("WeakSet");
    if (td(t))
      return os("WeakRef");
    if (Hc(t))
      return en(P(Number(t)));
    if (Vc(t))
      return en(P(ss.call(t)));
    if (Zc(t))
      return en(Oc.call(t));
    if (Yc(t))
      return en(P(String(t)));
    if (typeof window != "undefined" && t === window)
      return "{ [object Window] }";
    if (typeof globalThis != "undefined" && t === globalThis || typeof global != "undefined" && t === global)
      return "{ [object globalThis] }";
    if (!$c(t) && !wf(t)) {
      var Q = jn(t, P), $t = mf ? mf(t) === Object.prototype : t instanceof Object || t.constructor === Object, x = t instanceof Object ? "" : "null prototype", o = !$t && tr && Object(t) === t && tr in t ? ds.call($r(t), 8, -1) : x ? "Object" : "", u = $t || typeof t.constructor != "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", c = u + (o || x ? "[" + gr.call(df.call([], o || [], x || []), ": ") + "] " : "");
      return Q.length === 0 ? c + "{}" : F ? c + "{" + ls(Q, F) + "}" : c + "{ " + gr.call(Q, ", ") + " }";
    }
    return String(t);
  };
  function Af(r3, t, e) {
    var f = (e.quoteStyle || t) === "double" ? '"' : "'";
    return f + r3 + f;
  }
  function jc(r3) {
    return jr.call(String(r3), /"/g, "&quot;");
  }
  function hs(r3) {
    return $r(r3) === "[object Array]" && (!tr || !(typeof r3 == "object" && tr in r3));
  }
  function $c(r3) {
    return $r(r3) === "[object Date]" && (!tr || !(typeof r3 == "object" && tr in r3));
  }
  function wf(r3) {
    return $r(r3) === "[object RegExp]" && (!tr || !(typeof r3 == "object" && tr in r3));
  }
  function Kc(r3) {
    return $r(r3) === "[object Error]" && (!tr || !(typeof r3 == "object" && tr in r3));
  }
  function Yc(r3) {
    return $r(r3) === "[object String]" && (!tr || !(typeof r3 == "object" && tr in r3));
  }
  function Hc(r3) {
    return $r(r3) === "[object Number]" && (!tr || !(typeof r3 == "object" && tr in r3));
  }
  function Zc(r3) {
    return $r(r3) === "[object Boolean]" && (!tr || !(typeof r3 == "object" && tr in r3));
  }
  function _f(r3) {
    if (Mi)
      return r3 && typeof r3 == "object" && r3 instanceof Symbol;
    if (typeof r3 == "symbol")
      return true;
    if (!r3 || typeof r3 != "object" || !as)
      return false;
    try {
      return as.call(r3), true;
    } catch (t) {
    }
    return false;
  }
  function Vc(r3) {
    if (!r3 || typeof r3 != "object" || !ss)
      return false;
    try {
      return ss.call(r3), true;
    } catch (t) {
    }
    return false;
  }
  var Gc = Object.prototype.hasOwnProperty || function(r3) {
    return r3 in this;
  };
  function zr(r3, t) {
    return Gc.call(r3, t);
  }
  function $r(r3) {
    return kc.call(r3);
  }
  function Jc(r3) {
    if (r3.name)
      return r3.name;
    var t = qc.call(Lc.call(r3), /^function\s*([\w$]+)/);
    return t ? t[1] : null;
  }
  function Ef(r3, t) {
    if (r3.indexOf)
      return r3.indexOf(t);
    for (var e = 0, f = r3.length; e < f; e++)
      if (r3[e] === t)
        return e;
    return -1;
  }
  function Xc(r3) {
    if (!$n || !r3 || typeof r3 != "object")
      return false;
    try {
      $n.call(r3);
      try {
        Kn.call(r3);
      } catch (t) {
        return true;
      }
      return r3 instanceof Map;
    } catch (t) {
    }
    return false;
  }
  function Qc(r3) {
    if (!rn || !r3 || typeof r3 != "object")
      return false;
    try {
      rn.call(r3, rn);
      try {
        nn.call(r3, nn);
      } catch (t) {
        return true;
      }
      return r3 instanceof WeakMap;
    } catch (t) {
    }
    return false;
  }
  function td(r3) {
    if (!uf || !r3 || typeof r3 != "object")
      return false;
    try {
      return uf.call(r3), true;
    } catch (t) {
    }
    return false;
  }
  function ed(r3) {
    if (!Kn || !r3 || typeof r3 != "object")
      return false;
    try {
      Kn.call(r3);
      try {
        $n.call(r3);
      } catch (t) {
        return true;
      }
      return r3 instanceof Set;
    } catch (t) {
    }
    return false;
  }
  function rd(r3) {
    if (!nn || !r3 || typeof r3 != "object")
      return false;
    try {
      nn.call(r3, nn);
      try {
        rn.call(r3, rn);
      } catch (t) {
        return true;
      }
      return r3 instanceof WeakSet;
    } catch (t) {
    }
    return false;
  }
  function id(r3) {
    return !r3 || typeof r3 != "object" ? false : typeof HTMLElement != "undefined" && r3 instanceof HTMLElement ? true : typeof r3.nodeName == "string" && typeof r3.getAttribute == "function";
  }
  function Cf(r3, t) {
    if (r3.length > t.maxStringLength) {
      var e = r3.length - t.maxStringLength, f = "... " + e + " more character" + (e > 1 ? "s" : "");
      return Cf(ds.call(r3, 0, t.maxStringLength), t) + f;
    }
    var n = jr.call(jr.call(r3, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, nd);
    return Af(n, "single", t);
  }
  function nd(r3) {
    var t = r3.charCodeAt(0), e = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[t];
    return e ? "\\" + e : "\\x" + (t < 16 ? "0" : "") + Wc.call(t.toString(16));
  }
  function en(r3) {
    return "Object(" + r3 + ")";
  }
  function os(r3) {
    return r3 + " { ? }";
  }
  function xf(r3, t, e, f) {
    var n = f ? ls(e, f) : gr.call(e, ", ");
    return r3 + " (" + t + ") {" + n + "}";
  }
  function od(r3) {
    for (var t = 0; t < r3.length; t++)
      if (Ef(r3[t], `
`) >= 0)
        return false;
    return true;
  }
  function sd(r3, t) {
    var e;
    if (r3.indent === "	")
      e = "	";
    else if (typeof r3.indent == "number" && r3.indent > 0)
      e = gr.call(Array(r3.indent + 1), " ");
    else
      return null;
    return { base: e, prev: gr.call(Array(t + 1), e) };
  }
  function ls(r3, t) {
    if (r3.length === 0)
      return "";
    var e = `
` + t.prev + t.base;
    return e + gr.call(r3, "," + e) + `
` + t.prev;
  }
  function jn(r3, t) {
    var e = hs(r3), f = [];
    if (e) {
      f.length = r3.length;
      for (var n = 0; n < r3.length; n++)
        f[n] = zr(r3, n) ? t(r3[n], r3) : "";
    }
    var g = typeof ns == "function" ? ns(r3) : [], y;
    if (Mi) {
      y = {};
      for (var _ = 0; _ < g.length; _++)
        y["$" + g[_]] = g[_];
    }
    for (var E in r3)
      zr(r3, E) && (e && String(Number(E)) === E && E < r3.length || Mi && y["$" + E] instanceof Symbol || (Mf.call(/[^\w$]/, E) ? f.push(t(E, r3) + ": " + t(r3[E], r3)) : f.push(E + ": " + t(r3[E], r3))));
    if (typeof ns == "function")
      for (var S = 0; S < g.length; S++)
        bf.call(r3, g[S]) && f.push("[" + t(g[S]) + "]: " + t(r3[g[S]], r3));
    return f;
  }
});
var If = ae((ev, Ff) => {
  var Tf = oi(), bi = af(), ad = Sf(), fd = mi(), Yn = Tf("%WeakMap%", true), Hn = Tf("%Map%", true), hd = bi("WeakMap.prototype.get", true), ld = bi("WeakMap.prototype.set", true), ud = bi("WeakMap.prototype.has", true), cd = bi("Map.prototype.get", true), dd = bi("Map.prototype.set", true), pd = bi("Map.prototype.has", true), ps = function(r3, t) {
    for (var e = r3, f; (f = e.next) !== null; e = f)
      if (f.key === t)
        return e.next = f.next, f.next = r3.next, r3.next = f, f;
  }, md = function(r3, t) {
    var e = ps(r3, t);
    return e && e.value;
  }, gd = function(r3, t, e) {
    var f = ps(r3, t);
    f ? f.value = e : r3.next = { key: t, next: r3.next, value: e };
  }, vd = function(r3, t) {
    return !!ps(r3, t);
  };
  Ff.exports = function() {
    var t, e, f, n = { assert: function(g) {
      if (!n.has(g))
        throw new fd("Side channel does not contain " + ad(g));
    }, get: function(g) {
      if (Yn && g && (typeof g == "object" || typeof g == "function")) {
        if (t)
          return hd(t, g);
      } else if (Hn) {
        if (e)
          return cd(e, g);
      } else if (f)
        return md(f, g);
    }, has: function(g) {
      if (Yn && g && (typeof g == "object" || typeof g == "function")) {
        if (t)
          return ud(t, g);
      } else if (Hn) {
        if (e)
          return pd(e, g);
      } else if (f)
        return vd(f, g);
      return false;
    }, set: function(g, y) {
      Yn && g && (typeof g == "object" || typeof g == "function") ? (t || (t = new Yn()), ld(t, g, y)) : Hn ? (e || (e = new Hn()), dd(e, g, y)) : (f || (f = { key: {}, next: null }), gd(f, g, y));
    } };
    return n;
  };
});
var Zn = ae((rv, Nf) => {
  var yd = String.prototype.replace, wd = /%20/g, ms = { RFC1738: "RFC1738", RFC3986: "RFC3986" };
  Nf.exports = { default: ms.RFC3986, formatters: { RFC1738: function(r3) {
    return yd.call(r3, wd, "+");
  }, RFC3986: function(r3) {
    return String(r3);
  } }, RFC1738: ms.RFC1738, RFC3986: ms.RFC3986 };
});
var ys = ae((iv, Rf) => {
  var xd = Zn(), gs = Object.prototype.hasOwnProperty, si = Array.isArray, vr = function() {
    for (var r3 = [], t = 0; t < 256; ++t)
      r3.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
    return r3;
  }(), Md = function(t) {
    for (; t.length > 1; ) {
      var e = t.pop(), f = e.obj[e.prop];
      if (si(f)) {
        for (var n = [], g = 0; g < f.length; ++g)
          typeof f[g] != "undefined" && n.push(f[g]);
        e.obj[e.prop] = n;
      }
    }
  }, Uf = function(t, e) {
    for (var f = e && e.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n = 0; n < t.length; ++n)
      typeof t[n] != "undefined" && (f[n] = t[n]);
    return f;
  }, bd = function r3(t, e, f) {
    if (!e)
      return t;
    if (typeof e != "object") {
      if (si(t))
        t.push(e);
      else if (t && typeof t == "object")
        (f && (f.plainObjects || f.allowPrototypes) || !gs.call(Object.prototype, e)) && (t[e] = true);
      else
        return [t, e];
      return t;
    }
    if (!t || typeof t != "object")
      return [t].concat(e);
    var n = t;
    return si(t) && !si(e) && (n = Uf(t, f)), si(t) && si(e) ? (e.forEach(function(g, y) {
      if (gs.call(t, y)) {
        var _ = t[y];
        _ && typeof _ == "object" && g && typeof g == "object" ? t[y] = r3(_, g, f) : t.push(g);
      } else
        t[y] = g;
    }), t) : Object.keys(e).reduce(function(g, y) {
      var _ = e[y];
      return gs.call(g, y) ? g[y] = r3(g[y], _, f) : g[y] = _, g;
    }, n);
  }, Ad = function(t, e) {
    return Object.keys(e).reduce(function(f, n) {
      return f[n] = e[n], f;
    }, t);
  }, _d = function(r3, t, e) {
    var f = r3.replace(/\+/g, " ");
    if (e === "iso-8859-1")
      return f.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(f);
    } catch (n) {
      return f;
    }
  }, vs = 1024, Ed = function(t, e, f, n, g) {
    if (t.length === 0)
      return t;
    var y = t;
    if (typeof t == "symbol" ? y = Symbol.prototype.toString.call(t) : typeof t != "string" && (y = String(t)), f === "iso-8859-1")
      return escape(y).replace(/%u[0-9a-f]{4}/gi, function(Y) {
        return "%26%23" + parseInt(Y.slice(2), 16) + "%3B";
      });
    for (var _ = "", E = 0; E < y.length; E += vs) {
      for (var S = y.length >= vs ? y.slice(E, E + vs) : y, I = [], F = 0; F < S.length; ++F) {
        var P = S.charCodeAt(F);
        if (P === 45 || P === 46 || P === 95 || P === 126 || P >= 48 && P <= 57 || P >= 65 && P <= 90 || P >= 97 && P <= 122 || g === xd.RFC1738 && (P === 40 || P === 41)) {
          I[I.length] = S.charAt(F);
          continue;
        }
        if (P < 128) {
          I[I.length] = vr[P];
          continue;
        }
        if (P < 2048) {
          I[I.length] = vr[192 | P >> 6] + vr[128 | P & 63];
          continue;
        }
        if (P < 55296 || P >= 57344) {
          I[I.length] = vr[224 | P >> 12] + vr[128 | P >> 6 & 63] + vr[128 | P & 63];
          continue;
        }
        F += 1, P = 65536 + ((P & 1023) << 10 | S.charCodeAt(F) & 1023), I[I.length] = vr[240 | P >> 18] + vr[128 | P >> 12 & 63] + vr[128 | P >> 6 & 63] + vr[128 | P & 63];
      }
      _ += I.join("");
    }
    return _;
  }, Cd = function(t) {
    for (var e = [{ obj: { o: t }, prop: "o" }], f = [], n = 0; n < e.length; ++n)
      for (var g = e[n], y = g.obj[g.prop], _ = Object.keys(y), E = 0; E < _.length; ++E) {
        var S = _[E], I = y[S];
        typeof I == "object" && I !== null && f.indexOf(I) === -1 && (e.push({ obj: y, prop: S }), f.push(I));
      }
    return Md(e), t;
  }, Bd = function(t) {
    return Object.prototype.toString.call(t) === "[object RegExp]";
  }, Sd = function(t) {
    return !t || typeof t != "object" ? false : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
  }, Td = function(t, e) {
    return [].concat(t, e);
  }, Fd = function(t, e) {
    if (si(t)) {
      for (var f = [], n = 0; n < t.length; n += 1)
        f.push(e(t[n]));
      return f;
    }
    return e(t);
  };
  Rf.exports = { arrayToObject: Uf, assign: Ad, combine: Td, compact: Cd, decode: _d, encode: Ed, isBuffer: Sd, isRegExp: Bd, maybeMap: Fd, merge: bd };
});
var qf = ae((nv, Lf) => {
  var Df = If(), Vn = ys(), on = Zn(), Id = Object.prototype.hasOwnProperty, Of = { brackets: function(t) {
    return t + "[]";
  }, comma: "comma", indices: function(t, e) {
    return t + "[" + e + "]";
  }, repeat: function(t) {
    return t;
  } }, yr = Array.isArray, Nd = Array.prototype.push, kf = function(r3, t) {
    Nd.apply(r3, yr(t) ? t : [t]);
  }, Ud = Date.prototype.toISOString, Pf = on.default, je = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: Vn.encode, encodeValuesOnly: false, format: Pf, formatter: on.formatters[Pf], indices: false, serializeDate: function(t) {
    return Ud.call(t);
  }, skipNulls: false, strictNullHandling: false }, Rd = function(t) {
    return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
  }, ws = {}, Pd = function r3(t, e, f, n, g, y, _, E, S, I, F, P, Y, K, Z, k, Tt, it) {
    for (var q = t, j = it, nt = 0, ft = false; (j = j.get(ws)) !== void 0 && !ft; ) {
      var Q = j.get(t);
      if (nt += 1, typeof Q != "undefined") {
        if (Q === nt)
          throw new RangeError("Cyclic object value");
        ft = true;
      }
      typeof j.get(ws) == "undefined" && (nt = 0);
    }
    if (typeof I == "function" ? q = I(e, q) : q instanceof Date ? q = Y(q) : f === "comma" && yr(q) && (q = Vn.maybeMap(q, function(M) {
      return M instanceof Date ? Y(M) : M;
    })), q === null) {
      if (y)
        return S && !k ? S(e, je.encoder, Tt, "key", K) : e;
      q = "";
    }
    if (Rd(q) || Vn.isBuffer(q)) {
      if (S) {
        var $t = k ? e : S(e, je.encoder, Tt, "key", K);
        return [Z($t) + "=" + Z(S(q, je.encoder, Tt, "value", K))];
      }
      return [Z(e) + "=" + Z(String(q))];
    }
    var x = [];
    if (typeof q == "undefined")
      return x;
    var o;
    if (f === "comma" && yr(q))
      k && S && (q = Vn.maybeMap(q, S)), o = [{ value: q.length > 0 ? q.join(",") || null : void 0 }];
    else if (yr(I))
      o = I;
    else {
      var u = Object.keys(q);
      o = F ? u.sort(F) : u;
    }
    var c = E ? e.replace(/\./g, "%2E") : e, a = n && yr(q) && q.length === 1 ? c + "[]" : c;
    if (g && yr(q) && q.length === 0)
      return a + "[]";
    for (var s = 0; s < o.length; ++s) {
      var h = o[s], p = typeof h == "object" && typeof h.value != "undefined" ? h.value : q[h];
      if (!(_ && p === null)) {
        var l = P && E ? h.replace(/\./g, "%2E") : h, i = yr(q) ? typeof f == "function" ? f(a, l) : a : a + (P ? "." + l : "[" + l + "]");
        it.set(t, nt);
        var d = Df();
        d.set(ws, it), kf(x, r3(p, i, f, n, g, y, _, E, f === "comma" && k && yr(q) ? null : S, I, F, P, Y, K, Z, k, Tt, d));
      }
    }
    return x;
  }, Dd = function(t) {
    if (!t)
      return je;
    if (typeof t.allowEmptyArrays != "undefined" && typeof t.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof t.encodeDotInKeys != "undefined" && typeof t.encodeDotInKeys != "boolean")
      throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
    if (t.encoder !== null && typeof t.encoder != "undefined" && typeof t.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var e = t.charset || je.charset;
    if (typeof t.charset != "undefined" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var f = on.default;
    if (typeof t.format != "undefined") {
      if (!Id.call(on.formatters, t.format))
        throw new TypeError("Unknown format option provided.");
      f = t.format;
    }
    var n = on.formatters[f], g = je.filter;
    (typeof t.filter == "function" || yr(t.filter)) && (g = t.filter);
    var y;
    if (t.arrayFormat in Of ? y = t.arrayFormat : "indices" in t ? y = t.indices ? "indices" : "repeat" : y = je.arrayFormat, "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var _ = typeof t.allowDots == "undefined" ? t.encodeDotInKeys === true ? true : je.allowDots : !!t.allowDots;
    return { addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : je.addQueryPrefix, allowDots: _, allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : je.allowEmptyArrays, arrayFormat: y, charset: e, charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : je.charsetSentinel, commaRoundTrip: t.commaRoundTrip, delimiter: typeof t.delimiter == "undefined" ? je.delimiter : t.delimiter, encode: typeof t.encode == "boolean" ? t.encode : je.encode, encodeDotInKeys: typeof t.encodeDotInKeys == "boolean" ? t.encodeDotInKeys : je.encodeDotInKeys, encoder: typeof t.encoder == "function" ? t.encoder : je.encoder, encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : je.encodeValuesOnly, filter: g, format: f, formatter: n, serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : je.serializeDate, skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : je.skipNulls, sort: typeof t.sort == "function" ? t.sort : null, strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : je.strictNullHandling };
  };
  Lf.exports = function(r3, t) {
    var e = r3, f = Dd(t), n, g;
    typeof f.filter == "function" ? (g = f.filter, e = g("", e)) : yr(f.filter) && (g = f.filter, n = g);
    var y = [];
    if (typeof e != "object" || e === null)
      return "";
    var _ = Of[f.arrayFormat], E = _ === "comma" && f.commaRoundTrip;
    n || (n = Object.keys(e)), f.sort && n.sort(f.sort);
    for (var S = Df(), I = 0; I < n.length; ++I) {
      var F = n[I];
      f.skipNulls && e[F] === null || kf(y, Pd(e[F], F, _, E, f.allowEmptyArrays, f.strictNullHandling, f.skipNulls, f.encodeDotInKeys, f.encode ? f.encoder : null, f.filter, f.sort, f.allowDots, f.serializeDate, f.format, f.formatter, f.encodeValuesOnly, f.charset, S));
    }
    var P = y.join(f.delimiter), Y = f.addQueryPrefix === true ? "?" : "";
    return f.charsetSentinel && (f.charset === "iso-8859-1" ? Y += "utf8=%26%2310003%3B&" : Y += "utf8=%E2%9C%93&"), P.length > 0 ? Y + P : "";
  };
});
var jf = ae((ov, zf) => {
  var Ai = ys(), xs = Object.prototype.hasOwnProperty, Od = Array.isArray, Oe = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: Ai.decode, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictDepth: false, strictNullHandling: false }, kd = function(r3) {
    return r3.replace(/&#(\d+);/g, function(t, e) {
      return String.fromCharCode(parseInt(e, 10));
    });
  }, Wf = function(r3, t) {
    return r3 && typeof r3 == "string" && t.comma && r3.indexOf(",") > -1 ? r3.split(",") : r3;
  }, Ld = "utf8=%26%2310003%3B", qd = "utf8=%E2%9C%93", Wd = function(t, e) {
    var f = { __proto__: null }, n = e.ignoreQueryPrefix ? t.replace(/^\?/, "") : t;
    n = n.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    var g = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit, y = n.split(e.delimiter, g), _ = -1, E, S = e.charset;
    if (e.charsetSentinel)
      for (E = 0; E < y.length; ++E)
        y[E].indexOf("utf8=") === 0 && (y[E] === qd ? S = "utf-8" : y[E] === Ld && (S = "iso-8859-1"), _ = E, E = y.length);
    for (E = 0; E < y.length; ++E)
      if (E !== _) {
        var I = y[E], F = I.indexOf("]="), P = F === -1 ? I.indexOf("=") : F + 1, Y, K;
        P === -1 ? (Y = e.decoder(I, Oe.decoder, S, "key"), K = e.strictNullHandling ? null : "") : (Y = e.decoder(I.slice(0, P), Oe.decoder, S, "key"), K = Ai.maybeMap(Wf(I.slice(P + 1), e), function(k) {
          return e.decoder(k, Oe.decoder, S, "value");
        })), K && e.interpretNumericEntities && S === "iso-8859-1" && (K = kd(K)), I.indexOf("[]=") > -1 && (K = Od(K) ? [K] : K);
        var Z = xs.call(f, Y);
        Z && e.duplicates === "combine" ? f[Y] = Ai.combine(f[Y], K) : (!Z || e.duplicates === "last") && (f[Y] = K);
      }
    return f;
  }, zd = function(r3, t, e, f) {
    for (var n = f ? t : Wf(t, e), g = r3.length - 1; g >= 0; --g) {
      var y, _ = r3[g];
      if (_ === "[]" && e.parseArrays)
        y = e.allowEmptyArrays && (n === "" || e.strictNullHandling && n === null) ? [] : [].concat(n);
      else {
        y = e.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var E = _.charAt(0) === "[" && _.charAt(_.length - 1) === "]" ? _.slice(1, -1) : _, S = e.decodeDotInKeys ? E.replace(/%2E/g, ".") : E, I = parseInt(S, 10);
        !e.parseArrays && S === "" ? y = { 0: n } : !isNaN(I) && _ !== S && String(I) === S && I >= 0 && e.parseArrays && I <= e.arrayLimit ? (y = [], y[I] = n) : S !== "__proto__" && (y[S] = n);
      }
      n = y;
    }
    return n;
  }, jd = function(t, e, f, n) {
    if (t) {
      var g = f.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, y = /(\[[^[\]]*])/, _ = /(\[[^[\]]*])/g, E = f.depth > 0 && y.exec(g), S = E ? g.slice(0, E.index) : g, I = [];
      if (S) {
        if (!f.plainObjects && xs.call(Object.prototype, S) && !f.allowPrototypes)
          return;
        I.push(S);
      }
      for (var F = 0; f.depth > 0 && (E = _.exec(g)) !== null && F < f.depth; ) {
        if (F += 1, !f.plainObjects && xs.call(Object.prototype, E[1].slice(1, -1)) && !f.allowPrototypes)
          return;
        I.push(E[1]);
      }
      if (E) {
        if (f.strictDepth === true)
          throw new RangeError("Input depth exceeded depth option of " + f.depth + " and strictDepth is true");
        I.push("[" + g.slice(E.index) + "]");
      }
      return zd(I, e, f, n);
    }
  }, $d = function(t) {
    if (!t)
      return Oe;
    if (typeof t.allowEmptyArrays != "undefined" && typeof t.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof t.decodeDotInKeys != "undefined" && typeof t.decodeDotInKeys != "boolean")
      throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
    if (t.decoder !== null && typeof t.decoder != "undefined" && typeof t.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof t.charset != "undefined" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var e = typeof t.charset == "undefined" ? Oe.charset : t.charset, f = typeof t.duplicates == "undefined" ? Oe.duplicates : t.duplicates;
    if (f !== "combine" && f !== "first" && f !== "last")
      throw new TypeError("The duplicates option must be either combine, first, or last");
    var n = typeof t.allowDots == "undefined" ? t.decodeDotInKeys === true ? true : Oe.allowDots : !!t.allowDots;
    return { allowDots: n, allowEmptyArrays: typeof t.allowEmptyArrays == "boolean" ? !!t.allowEmptyArrays : Oe.allowEmptyArrays, allowPrototypes: typeof t.allowPrototypes == "boolean" ? t.allowPrototypes : Oe.allowPrototypes, allowSparse: typeof t.allowSparse == "boolean" ? t.allowSparse : Oe.allowSparse, arrayLimit: typeof t.arrayLimit == "number" ? t.arrayLimit : Oe.arrayLimit, charset: e, charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : Oe.charsetSentinel, comma: typeof t.comma == "boolean" ? t.comma : Oe.comma, decodeDotInKeys: typeof t.decodeDotInKeys == "boolean" ? t.decodeDotInKeys : Oe.decodeDotInKeys, decoder: typeof t.decoder == "function" ? t.decoder : Oe.decoder, delimiter: typeof t.delimiter == "string" || Ai.isRegExp(t.delimiter) ? t.delimiter : Oe.delimiter, depth: typeof t.depth == "number" || t.depth === false ? +t.depth : Oe.depth, duplicates: f, ignoreQueryPrefix: t.ignoreQueryPrefix === true, interpretNumericEntities: typeof t.interpretNumericEntities == "boolean" ? t.interpretNumericEntities : Oe.interpretNumericEntities, parameterLimit: typeof t.parameterLimit == "number" ? t.parameterLimit : Oe.parameterLimit, parseArrays: t.parseArrays !== false, plainObjects: typeof t.plainObjects == "boolean" ? t.plainObjects : Oe.plainObjects, strictDepth: typeof t.strictDepth == "boolean" ? !!t.strictDepth : Oe.strictDepth, strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : Oe.strictNullHandling };
  };
  zf.exports = function(r3, t) {
    var e = $d(t);
    if (r3 === "" || r3 === null || typeof r3 == "undefined")
      return e.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (var f = typeof r3 == "string" ? Wd(r3, e) : r3, n = e.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, g = Object.keys(f), y = 0; y < g.length; ++y) {
      var _ = g[y], E = jd(_, f[_], e, typeof r3 == "string");
      n = Ai.merge(n, E, e);
    }
    return e.allowSparse === true ? n : Ai.compact(n);
  };
});
var Kf = ae((sv, $f) => {
  var Kd = qf(), Yd = jf(), Hd = Zn();
  $f.exports = { formats: Hd, parse: Yd, stringify: Kd };
});
var Hf = ae((av, Yf) => {
  var _i = 1e3, Ei = _i * 60, Ci = Ei * 60, ai = Ci * 24, Zd = ai * 7, Vd = ai * 365.25;
  Yf.exports = function(r3, t) {
    t = t || {};
    var e = typeof r3;
    if (e === "string" && r3.length > 0)
      return Gd(r3);
    if (e === "number" && isFinite(r3))
      return t.long ? Xd(r3) : Jd(r3);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(r3));
  };
  function Gd(r3) {
    if (r3 = String(r3), !(r3.length > 100)) {
      var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(r3);
      if (t) {
        var e = parseFloat(t[1]), f = (t[2] || "ms").toLowerCase();
        switch (f) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return e * Vd;
          case "weeks":
          case "week":
          case "w":
            return e * Zd;
          case "days":
          case "day":
          case "d":
            return e * ai;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return e * Ci;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return e * Ei;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return e * _i;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return e;
          default:
            return;
        }
      }
    }
  }
  function Jd(r3) {
    var t = Math.abs(r3);
    return t >= ai ? Math.round(r3 / ai) + "d" : t >= Ci ? Math.round(r3 / Ci) + "h" : t >= Ei ? Math.round(r3 / Ei) + "m" : t >= _i ? Math.round(r3 / _i) + "s" : r3 + "ms";
  }
  function Xd(r3) {
    var t = Math.abs(r3);
    return t >= ai ? Gn(r3, t, ai, "day") : t >= Ci ? Gn(r3, t, Ci, "hour") : t >= Ei ? Gn(r3, t, Ei, "minute") : t >= _i ? Gn(r3, t, _i, "second") : r3 + " ms";
  }
  function Gn(r3, t, e, f) {
    var n = t >= e * 1.5;
    return Math.round(r3 / e) + " " + f + (n ? "s" : "");
  }
});
var Vf = ae((fv, Zf) => {
  function Qd(r3) {
    e.debug = e, e.default = e, e.coerce = E, e.disable = g, e.enable = n, e.enabled = y, e.humanize = Hf(), e.destroy = S, Object.keys(r3).forEach((I) => {
      e[I] = r3[I];
    }), e.names = [], e.skips = [], e.formatters = {};
    function t(I) {
      let F = 0;
      for (let P = 0; P < I.length; P++)
        F = (F << 5) - F + I.charCodeAt(P), F |= 0;
      return e.colors[Math.abs(F) % e.colors.length];
    }
    e.selectColor = t;
    function e(I) {
      let F, P = null, Y, K;
      function Z(...k) {
        if (!Z.enabled)
          return;
        let Tt = Z, it = Number(/* @__PURE__ */ new Date()), q = it - (F || it);
        Tt.diff = q, Tt.prev = F, Tt.curr = it, F = it, k[0] = e.coerce(k[0]), typeof k[0] != "string" && k.unshift("%O");
        let j = 0;
        k[0] = k[0].replace(/%([a-zA-Z%])/g, (ft, Q) => {
          if (ft === "%%")
            return "%";
          j++;
          let $t = e.formatters[Q];
          if (typeof $t == "function") {
            let x = k[j];
            ft = $t.call(Tt, x), k.splice(j, 1), j--;
          }
          return ft;
        }), e.formatArgs.call(Tt, k), (Tt.log || e.log).apply(Tt, k);
      }
      return Z.namespace = I, Z.useColors = e.useColors(), Z.color = e.selectColor(I), Z.extend = f, Z.destroy = e.destroy, Object.defineProperty(Z, "enabled", { enumerable: true, configurable: false, get: () => P !== null ? P : (Y !== e.namespaces && (Y = e.namespaces, K = e.enabled(I)), K), set: (k) => {
        P = k;
      } }), typeof e.init == "function" && e.init(Z), Z;
    }
    function f(I, F) {
      let P = e(this.namespace + (typeof F == "undefined" ? ":" : F) + I);
      return P.log = this.log, P;
    }
    function n(I) {
      e.save(I), e.namespaces = I, e.names = [], e.skips = [];
      let F, P = (typeof I == "string" ? I : "").split(/[\s,]+/), Y = P.length;
      for (F = 0; F < Y; F++)
        P[F] && (I = P[F].replace(/\*/g, ".*?"), I[0] === "-" ? e.skips.push(new RegExp("^" + I.slice(1) + "$")) : e.names.push(new RegExp("^" + I + "$")));
    }
    function g() {
      let I = [...e.names.map(_), ...e.skips.map(_).map((F) => "-" + F)].join(",");
      return e.enable(""), I;
    }
    function y(I) {
      if (I[I.length - 1] === "*")
        return true;
      let F, P;
      for (F = 0, P = e.skips.length; F < P; F++)
        if (e.skips[F].test(I))
          return false;
      for (F = 0, P = e.names.length; F < P; F++)
        if (e.names[F].test(I))
          return true;
      return false;
    }
    function _(I) {
      return I.toString().substring(2, I.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function E(I) {
      return I instanceof Error ? I.stack || I.message : I;
    }
    function S() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return e.enable(e.load()), e;
  }
  Zf.exports = Qd;
});
var Xn = ae((sr, Jn) => {
  sr.formatArgs = ep;
  sr.save = rp;
  sr.load = ip;
  sr.useColors = tp;
  sr.storage = np();
  sr.destroy = (() => {
    let r3 = false;
    return () => {
      r3 || (r3 = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })();
  sr.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];
  function tp() {
    if (typeof window != "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
      return true;
    if (typeof navigator != "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
      return false;
    let r3;
    return typeof document != "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window != "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator != "undefined" && navigator.userAgent && (r3 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(r3[1], 10) >= 31 || typeof navigator != "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function ep(r3) {
    if (r3[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + r3[0] + (this.useColors ? "%c " : " ") + "+" + Jn.exports.humanize(this.diff), !this.useColors)
      return;
    let t = "color: " + this.color;
    r3.splice(1, 0, t, "color: inherit");
    let e = 0, f = 0;
    r3[0].replace(/%[a-zA-Z%]/g, (n) => {
      n !== "%%" && (e++, n === "%c" && (f = e));
    }), r3.splice(f, 0, t);
  }
  sr.log = console.debug || console.log || (() => {
  });
  function rp(r3) {
    try {
      r3 ? sr.storage.setItem("debug", r3) : sr.storage.removeItem("debug");
    } catch (t) {
    }
  }
  function ip() {
    let r3;
    try {
      r3 = sr.storage.getItem("debug");
    } catch (t) {
    }
    return !r3 && typeof process != "undefined" && "env" in process && (r3 = {}.DEBUG), r3;
  }
  function np() {
    try {
      return localStorage;
    } catch (r3) {
    }
  }
  Jn.exports = Vf()(sr);
  var { formatters: op } = Jn.exports;
  op.j = function(r3) {
    try {
      return JSON.stringify(r3);
    } catch (t) {
      return "[UnexpectedJSONParseError]: " + t.message;
    }
  };
});
var rl = ae((Eo) => {
  Eo.byteLength = Nm;
  Eo.toByteArray = Rm;
  Eo.fromByteArray = Om;
  var _r = [], lr = [], Im = typeof Uint8Array != "undefined" ? Uint8Array : Array, ta = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (hi = 0, tl = ta.length; hi < tl; ++hi)
    _r[hi] = ta[hi], lr[ta.charCodeAt(hi)] = hi;
  var hi, tl;
  lr["-".charCodeAt(0)] = 62;
  lr["_".charCodeAt(0)] = 63;
  function el(r3) {
    var t = r3.length;
    if (t % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var e = r3.indexOf("=");
    e === -1 && (e = t);
    var f = e === t ? 0 : 4 - e % 4;
    return [e, f];
  }
  function Nm(r3) {
    var t = el(r3), e = t[0], f = t[1];
    return (e + f) * 3 / 4 - f;
  }
  function Um(r3, t, e) {
    return (t + e) * 3 / 4 - e;
  }
  function Rm(r3) {
    var t, e = el(r3), f = e[0], n = e[1], g = new Im(Um(r3, f, n)), y = 0, _ = n > 0 ? f - 4 : f, E;
    for (E = 0; E < _; E += 4)
      t = lr[r3.charCodeAt(E)] << 18 | lr[r3.charCodeAt(E + 1)] << 12 | lr[r3.charCodeAt(E + 2)] << 6 | lr[r3.charCodeAt(E + 3)], g[y++] = t >> 16 & 255, g[y++] = t >> 8 & 255, g[y++] = t & 255;
    return n === 2 && (t = lr[r3.charCodeAt(E)] << 2 | lr[r3.charCodeAt(E + 1)] >> 4, g[y++] = t & 255), n === 1 && (t = lr[r3.charCodeAt(E)] << 10 | lr[r3.charCodeAt(E + 1)] << 4 | lr[r3.charCodeAt(E + 2)] >> 2, g[y++] = t >> 8 & 255, g[y++] = t & 255), g;
  }
  function Pm(r3) {
    return _r[r3 >> 18 & 63] + _r[r3 >> 12 & 63] + _r[r3 >> 6 & 63] + _r[r3 & 63];
  }
  function Dm(r3, t, e) {
    for (var f, n = [], g = t; g < e; g += 3)
      f = (r3[g] << 16 & 16711680) + (r3[g + 1] << 8 & 65280) + (r3[g + 2] & 255), n.push(Pm(f));
    return n.join("");
  }
  function Om(r3) {
    for (var t, e = r3.length, f = e % 3, n = [], g = 16383, y = 0, _ = e - f; y < _; y += g)
      n.push(Dm(r3, y, y + g > _ ? _ : y + g));
    return f === 1 ? (t = r3[e - 1], n.push(_r[t >> 2] + _r[t << 4 & 63] + "==")) : f === 2 && (t = (r3[e - 2] << 8) + r3[e - 1], n.push(_r[t >> 10] + _r[t >> 4 & 63] + _r[t << 2 & 63] + "=")), n.join("");
  }
});
var il = ae((ea) => {
  ea.read = function(r3, t, e, f, n) {
    var g, y, _ = n * 8 - f - 1, E = (1 << _) - 1, S = E >> 1, I = -7, F = e ? n - 1 : 0, P = e ? -1 : 1, Y = r3[t + F];
    for (F += P, g = Y & (1 << -I) - 1, Y >>= -I, I += _; I > 0; g = g * 256 + r3[t + F], F += P, I -= 8)
      ;
    for (y = g & (1 << -I) - 1, g >>= -I, I += f; I > 0; y = y * 256 + r3[t + F], F += P, I -= 8)
      ;
    if (g === 0)
      g = 1 - S;
    else {
      if (g === E)
        return y ? NaN : (Y ? -1 : 1) * (1 / 0);
      y = y + Math.pow(2, f), g = g - S;
    }
    return (Y ? -1 : 1) * y * Math.pow(2, g - f);
  };
  ea.write = function(r3, t, e, f, n, g) {
    var y, _, E, S = g * 8 - n - 1, I = (1 << S) - 1, F = I >> 1, P = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, Y = f ? 0 : g - 1, K = f ? 1 : -1, Z = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (_ = isNaN(t) ? 1 : 0, y = I) : (y = Math.floor(Math.log(t) / Math.LN2), t * (E = Math.pow(2, -y)) < 1 && (y--, E *= 2), y + F >= 1 ? t += P / E : t += P * Math.pow(2, 1 - F), t * E >= 2 && (y++, E /= 2), y + F >= I ? (_ = 0, y = I) : y + F >= 1 ? (_ = (t * E - 1) * Math.pow(2, n), y = y + F) : (_ = t * Math.pow(2, F - 1) * Math.pow(2, n), y = 0)); n >= 8; r3[e + Y] = _ & 255, Y += K, _ /= 256, n -= 8)
      ;
    for (y = y << n | _, S += n; S > 0; r3[e + Y] = y & 255, Y += K, y /= 256, S -= 8)
      ;
    r3[e + Y - K] |= Z * 128;
  };
});
var qi = ae((Li) => {
  var ra = rl(), Oi = il(), nl = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  Li.Buffer = ct;
  Li.SlowBuffer = jm;
  Li.INSPECT_MAX_BYTES = 50;
  var Co = 2147483647;
  Li.kMaxLength = Co;
  ct.TYPED_ARRAY_SUPPORT = km();
  !ct.TYPED_ARRAY_SUPPORT && typeof console != "undefined" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function km() {
    try {
      let r3 = new Uint8Array(1), t = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(r3, t), r3.foo() === 42;
    } catch (r3) {
      return false;
    }
  }
  Object.defineProperty(ct.prototype, "parent", { enumerable: true, get: function() {
    if (ct.isBuffer(this))
      return this.buffer;
  } });
  Object.defineProperty(ct.prototype, "offset", { enumerable: true, get: function() {
    if (ct.isBuffer(this))
      return this.byteOffset;
  } });
  function Pr(r3) {
    if (r3 > Co)
      throw new RangeError('The value "' + r3 + '" is invalid for option "size"');
    let t = new Uint8Array(r3);
    return Object.setPrototypeOf(t, ct.prototype), t;
  }
  function ct(r3, t, e) {
    if (typeof r3 == "number") {
      if (typeof t == "string")
        throw new TypeError('The "string" argument must be of type string. Received type number');
      return sa(r3);
    }
    return fl(r3, t, e);
  }
  ct.poolSize = 8192;
  function fl(r3, t, e) {
    if (typeof r3 == "string")
      return qm(r3, t);
    if (ArrayBuffer.isView(r3))
      return Wm(r3);
    if (r3 == null)
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r3);
    if (Er(r3, ArrayBuffer) || r3 && Er(r3.buffer, ArrayBuffer) || typeof SharedArrayBuffer != "undefined" && (Er(r3, SharedArrayBuffer) || r3 && Er(r3.buffer, SharedArrayBuffer)))
      return na(r3, t, e);
    if (typeof r3 == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    let f = r3.valueOf && r3.valueOf();
    if (f != null && f !== r3)
      return ct.from(f, t, e);
    let n = zm(r3);
    if (n)
      return n;
    if (typeof Symbol != "undefined" && Symbol.toPrimitive != null && typeof r3[Symbol.toPrimitive] == "function")
      return ct.from(r3[Symbol.toPrimitive]("string"), t, e);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r3);
  }
  ct.from = function(r3, t, e) {
    return fl(r3, t, e);
  };
  Object.setPrototypeOf(ct.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(ct, Uint8Array);
  function hl(r3) {
    if (typeof r3 != "number")
      throw new TypeError('"size" argument must be of type number');
    if (r3 < 0)
      throw new RangeError('The value "' + r3 + '" is invalid for option "size"');
  }
  function Lm(r3, t, e) {
    return hl(r3), r3 <= 0 ? Pr(r3) : t !== void 0 ? typeof e == "string" ? Pr(r3).fill(t, e) : Pr(r3).fill(t) : Pr(r3);
  }
  ct.alloc = function(r3, t, e) {
    return Lm(r3, t, e);
  };
  function sa(r3) {
    return hl(r3), Pr(r3 < 0 ? 0 : aa(r3) | 0);
  }
  ct.allocUnsafe = function(r3) {
    return sa(r3);
  };
  ct.allocUnsafeSlow = function(r3) {
    return sa(r3);
  };
  function qm(r3, t) {
    if ((typeof t != "string" || t === "") && (t = "utf8"), !ct.isEncoding(t))
      throw new TypeError("Unknown encoding: " + t);
    let e = ll(r3, t) | 0, f = Pr(e), n = f.write(r3, t);
    return n !== e && (f = f.slice(0, n)), f;
  }
  function ia(r3) {
    let t = r3.length < 0 ? 0 : aa(r3.length) | 0, e = Pr(t);
    for (let f = 0; f < t; f += 1)
      e[f] = r3[f] & 255;
    return e;
  }
  function Wm(r3) {
    if (Er(r3, Uint8Array)) {
      let t = new Uint8Array(r3);
      return na(t.buffer, t.byteOffset, t.byteLength);
    }
    return ia(r3);
  }
  function na(r3, t, e) {
    if (t < 0 || r3.byteLength < t)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (r3.byteLength < t + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let f;
    return t === void 0 && e === void 0 ? f = new Uint8Array(r3) : e === void 0 ? f = new Uint8Array(r3, t) : f = new Uint8Array(r3, t, e), Object.setPrototypeOf(f, ct.prototype), f;
  }
  function zm(r3) {
    if (ct.isBuffer(r3)) {
      let t = aa(r3.length) | 0, e = Pr(t);
      return e.length === 0 || r3.copy(e, 0, 0, t), e;
    }
    if (r3.length !== void 0)
      return typeof r3.length != "number" || ha(r3.length) ? Pr(0) : ia(r3);
    if (r3.type === "Buffer" && Array.isArray(r3.data))
      return ia(r3.data);
  }
  function aa(r3) {
    if (r3 >= Co)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + Co.toString(16) + " bytes");
    return r3 | 0;
  }
  function jm(r3) {
    return +r3 != r3 && (r3 = 0), ct.alloc(+r3);
  }
  ct.isBuffer = function(t) {
    return t != null && t._isBuffer === true && t !== ct.prototype;
  };
  ct.compare = function(t, e) {
    if (Er(t, Uint8Array) && (t = ct.from(t, t.offset, t.byteLength)), Er(e, Uint8Array) && (e = ct.from(e, e.offset, e.byteLength)), !ct.isBuffer(t) || !ct.isBuffer(e))
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (t === e)
      return 0;
    let f = t.length, n = e.length;
    for (let g = 0, y = Math.min(f, n); g < y; ++g)
      if (t[g] !== e[g]) {
        f = t[g], n = e[g];
        break;
      }
    return f < n ? -1 : n < f ? 1 : 0;
  };
  ct.isEncoding = function(t) {
    switch (String(t).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  ct.concat = function(t, e) {
    if (!Array.isArray(t))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (t.length === 0)
      return ct.alloc(0);
    let f;
    if (e === void 0)
      for (e = 0, f = 0; f < t.length; ++f)
        e += t[f].length;
    let n = ct.allocUnsafe(e), g = 0;
    for (f = 0; f < t.length; ++f) {
      let y = t[f];
      if (Er(y, Uint8Array))
        g + y.length > n.length ? (ct.isBuffer(y) || (y = ct.from(y)), y.copy(n, g)) : Uint8Array.prototype.set.call(n, y, g);
      else if (ct.isBuffer(y))
        y.copy(n, g);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      g += y.length;
    }
    return n;
  };
  function ll(r3, t) {
    if (ct.isBuffer(r3))
      return r3.length;
    if (ArrayBuffer.isView(r3) || Er(r3, ArrayBuffer))
      return r3.byteLength;
    if (typeof r3 != "string")
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r3);
    let e = r3.length, f = arguments.length > 2 && arguments[2] === true;
    if (!f && e === 0)
      return 0;
    let n = false;
    for (; ; )
      switch (t) {
        case "ascii":
        case "latin1":
        case "binary":
          return e;
        case "utf8":
        case "utf-8":
          return oa(r3).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return e * 2;
        case "hex":
          return e >>> 1;
        case "base64":
          return wl(r3).length;
        default:
          if (n)
            return f ? -1 : oa(r3).length;
          t = ("" + t).toLowerCase(), n = true;
      }
  }
  ct.byteLength = ll;
  function $m(r3, t, e) {
    let f = false;
    if ((t === void 0 || t < 0) && (t = 0), t > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, t >>>= 0, e <= t))
      return "";
    for (r3 || (r3 = "utf8"); ; )
      switch (r3) {
        case "hex":
          return t1(this, t, e);
        case "utf8":
        case "utf-8":
          return cl(this, t, e);
        case "ascii":
          return Xm(this, t, e);
        case "latin1":
        case "binary":
          return Qm(this, t, e);
        case "base64":
          return Gm(this, t, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return e1(this, t, e);
        default:
          if (f)
            throw new TypeError("Unknown encoding: " + r3);
          r3 = (r3 + "").toLowerCase(), f = true;
      }
  }
  ct.prototype._isBuffer = true;
  function li(r3, t, e) {
    let f = r3[t];
    r3[t] = r3[e], r3[e] = f;
  }
  ct.prototype.swap16 = function() {
    let t = this.length;
    if (t % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let e = 0; e < t; e += 2)
      li(this, e, e + 1);
    return this;
  };
  ct.prototype.swap32 = function() {
    let t = this.length;
    if (t % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let e = 0; e < t; e += 4)
      li(this, e, e + 3), li(this, e + 1, e + 2);
    return this;
  };
  ct.prototype.swap64 = function() {
    let t = this.length;
    if (t % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let e = 0; e < t; e += 8)
      li(this, e, e + 7), li(this, e + 1, e + 6), li(this, e + 2, e + 5), li(this, e + 3, e + 4);
    return this;
  };
  ct.prototype.toString = function() {
    let t = this.length;
    return t === 0 ? "" : arguments.length === 0 ? cl(this, 0, t) : $m.apply(this, arguments);
  };
  ct.prototype.toLocaleString = ct.prototype.toString;
  ct.prototype.equals = function(t) {
    if (!ct.isBuffer(t))
      throw new TypeError("Argument must be a Buffer");
    return this === t ? true : ct.compare(this, t) === 0;
  };
  ct.prototype.inspect = function() {
    let t = "", e = Li.INSPECT_MAX_BYTES;
    return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (t += " ... "), "<Buffer " + t + ">";
  };
  nl && (ct.prototype[nl] = ct.prototype.inspect);
  ct.prototype.compare = function(t, e, f, n, g) {
    if (Er(t, Uint8Array) && (t = ct.from(t, t.offset, t.byteLength)), !ct.isBuffer(t))
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
    if (e === void 0 && (e = 0), f === void 0 && (f = t ? t.length : 0), n === void 0 && (n = 0), g === void 0 && (g = this.length), e < 0 || f > t.length || n < 0 || g > this.length)
      throw new RangeError("out of range index");
    if (n >= g && e >= f)
      return 0;
    if (n >= g)
      return -1;
    if (e >= f)
      return 1;
    if (e >>>= 0, f >>>= 0, n >>>= 0, g >>>= 0, this === t)
      return 0;
    let y = g - n, _ = f - e, E = Math.min(y, _), S = this.slice(n, g), I = t.slice(e, f);
    for (let F = 0; F < E; ++F)
      if (S[F] !== I[F]) {
        y = S[F], _ = I[F];
        break;
      }
    return y < _ ? -1 : _ < y ? 1 : 0;
  };
  function ul(r3, t, e, f, n) {
    if (r3.length === 0)
      return -1;
    if (typeof e == "string" ? (f = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, ha(e) && (e = n ? 0 : r3.length - 1), e < 0 && (e = r3.length + e), e >= r3.length) {
      if (n)
        return -1;
      e = r3.length - 1;
    } else if (e < 0)
      if (n)
        e = 0;
      else
        return -1;
    if (typeof t == "string" && (t = ct.from(t, f)), ct.isBuffer(t))
      return t.length === 0 ? -1 : ol(r3, t, e, f, n);
    if (typeof t == "number")
      return t = t & 255, typeof Uint8Array.prototype.indexOf == "function" ? n ? Uint8Array.prototype.indexOf.call(r3, t, e) : Uint8Array.prototype.lastIndexOf.call(r3, t, e) : ol(r3, [t], e, f, n);
    throw new TypeError("val must be string, number or Buffer");
  }
  function ol(r3, t, e, f, n) {
    let g = 1, y = r3.length, _ = t.length;
    if (f !== void 0 && (f = String(f).toLowerCase(), f === "ucs2" || f === "ucs-2" || f === "utf16le" || f === "utf-16le")) {
      if (r3.length < 2 || t.length < 2)
        return -1;
      g = 2, y /= 2, _ /= 2, e /= 2;
    }
    function E(I, F) {
      return g === 1 ? I[F] : I.readUInt16BE(F * g);
    }
    let S;
    if (n) {
      let I = -1;
      for (S = e; S < y; S++)
        if (E(r3, S) === E(t, I === -1 ? 0 : S - I)) {
          if (I === -1 && (I = S), S - I + 1 === _)
            return I * g;
        } else
          I !== -1 && (S -= S - I), I = -1;
    } else
      for (e + _ > y && (e = y - _), S = e; S >= 0; S--) {
        let I = true;
        for (let F = 0; F < _; F++)
          if (E(r3, S + F) !== E(t, F)) {
            I = false;
            break;
          }
        if (I)
          return S;
      }
    return -1;
  }
  ct.prototype.includes = function(t, e, f) {
    return this.indexOf(t, e, f) !== -1;
  };
  ct.prototype.indexOf = function(t, e, f) {
    return ul(this, t, e, f, true);
  };
  ct.prototype.lastIndexOf = function(t, e, f) {
    return ul(this, t, e, f, false);
  };
  function Km(r3, t, e, f) {
    e = Number(e) || 0;
    let n = r3.length - e;
    f ? (f = Number(f), f > n && (f = n)) : f = n;
    let g = t.length;
    f > g / 2 && (f = g / 2);
    let y;
    for (y = 0; y < f; ++y) {
      let _ = parseInt(t.substr(y * 2, 2), 16);
      if (ha(_))
        return y;
      r3[e + y] = _;
    }
    return y;
  }
  function Ym(r3, t, e, f) {
    return Bo(oa(t, r3.length - e), r3, e, f);
  }
  function Hm(r3, t, e, f) {
    return Bo(o1(t), r3, e, f);
  }
  function Zm(r3, t, e, f) {
    return Bo(wl(t), r3, e, f);
  }
  function Vm(r3, t, e, f) {
    return Bo(s1(t, r3.length - e), r3, e, f);
  }
  ct.prototype.write = function(t, e, f, n) {
    if (e === void 0)
      n = "utf8", f = this.length, e = 0;
    else if (f === void 0 && typeof e == "string")
      n = e, f = this.length, e = 0;
    else if (isFinite(e))
      e = e >>> 0, isFinite(f) ? (f = f >>> 0, n === void 0 && (n = "utf8")) : (n = f, f = void 0);
    else
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let g = this.length - e;
    if ((f === void 0 || f > g) && (f = g), t.length > 0 && (f < 0 || e < 0) || e > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    n || (n = "utf8");
    let y = false;
    for (; ; )
      switch (n) {
        case "hex":
          return Km(this, t, e, f);
        case "utf8":
        case "utf-8":
          return Ym(this, t, e, f);
        case "ascii":
        case "latin1":
        case "binary":
          return Hm(this, t, e, f);
        case "base64":
          return Zm(this, t, e, f);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Vm(this, t, e, f);
        default:
          if (y)
            throw new TypeError("Unknown encoding: " + n);
          n = ("" + n).toLowerCase(), y = true;
      }
  };
  ct.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function Gm(r3, t, e) {
    return t === 0 && e === r3.length ? ra.fromByteArray(r3) : ra.fromByteArray(r3.slice(t, e));
  }
  function cl(r3, t, e) {
    e = Math.min(r3.length, e);
    let f = [], n = t;
    for (; n < e; ) {
      let g = r3[n], y = null, _ = g > 239 ? 4 : g > 223 ? 3 : g > 191 ? 2 : 1;
      if (n + _ <= e) {
        let E, S, I, F;
        switch (_) {
          case 1:
            g < 128 && (y = g);
            break;
          case 2:
            E = r3[n + 1], (E & 192) === 128 && (F = (g & 31) << 6 | E & 63, F > 127 && (y = F));
            break;
          case 3:
            E = r3[n + 1], S = r3[n + 2], (E & 192) === 128 && (S & 192) === 128 && (F = (g & 15) << 12 | (E & 63) << 6 | S & 63, F > 2047 && (F < 55296 || F > 57343) && (y = F));
            break;
          case 4:
            E = r3[n + 1], S = r3[n + 2], I = r3[n + 3], (E & 192) === 128 && (S & 192) === 128 && (I & 192) === 128 && (F = (g & 15) << 18 | (E & 63) << 12 | (S & 63) << 6 | I & 63, F > 65535 && F < 1114112 && (y = F));
        }
      }
      y === null ? (y = 65533, _ = 1) : y > 65535 && (y -= 65536, f.push(y >>> 10 & 1023 | 55296), y = 56320 | y & 1023), f.push(y), n += _;
    }
    return Jm(f);
  }
  var sl = 4096;
  function Jm(r3) {
    let t = r3.length;
    if (t <= sl)
      return String.fromCharCode.apply(String, r3);
    let e = "", f = 0;
    for (; f < t; )
      e += String.fromCharCode.apply(String, r3.slice(f, f += sl));
    return e;
  }
  function Xm(r3, t, e) {
    let f = "";
    e = Math.min(r3.length, e);
    for (let n = t; n < e; ++n)
      f += String.fromCharCode(r3[n] & 127);
    return f;
  }
  function Qm(r3, t, e) {
    let f = "";
    e = Math.min(r3.length, e);
    for (let n = t; n < e; ++n)
      f += String.fromCharCode(r3[n]);
    return f;
  }
  function t1(r3, t, e) {
    let f = r3.length;
    (!t || t < 0) && (t = 0), (!e || e < 0 || e > f) && (e = f);
    let n = "";
    for (let g = t; g < e; ++g)
      n += a1[r3[g]];
    return n;
  }
  function e1(r3, t, e) {
    let f = r3.slice(t, e), n = "";
    for (let g = 0; g < f.length - 1; g += 2)
      n += String.fromCharCode(f[g] + f[g + 1] * 256);
    return n;
  }
  ct.prototype.slice = function(t, e) {
    let f = this.length;
    t = ~~t, e = e === void 0 ? f : ~~e, t < 0 ? (t += f, t < 0 && (t = 0)) : t > f && (t = f), e < 0 ? (e += f, e < 0 && (e = 0)) : e > f && (e = f), e < t && (e = t);
    let n = this.subarray(t, e);
    return Object.setPrototypeOf(n, ct.prototype), n;
  };
  function Ze(r3, t, e) {
    if (r3 % 1 !== 0 || r3 < 0)
      throw new RangeError("offset is not uint");
    if (r3 + t > e)
      throw new RangeError("Trying to access beyond buffer length");
  }
  ct.prototype.readUintLE = ct.prototype.readUIntLE = function(t, e, f) {
    t = t >>> 0, e = e >>> 0, f || Ze(t, e, this.length);
    let n = this[t], g = 1, y = 0;
    for (; ++y < e && (g *= 256); )
      n += this[t + y] * g;
    return n;
  };
  ct.prototype.readUintBE = ct.prototype.readUIntBE = function(t, e, f) {
    t = t >>> 0, e = e >>> 0, f || Ze(t, e, this.length);
    let n = this[t + --e], g = 1;
    for (; e > 0 && (g *= 256); )
      n += this[t + --e] * g;
    return n;
  };
  ct.prototype.readUint8 = ct.prototype.readUInt8 = function(t, e) {
    return t = t >>> 0, e || Ze(t, 1, this.length), this[t];
  };
  ct.prototype.readUint16LE = ct.prototype.readUInt16LE = function(t, e) {
    return t = t >>> 0, e || Ze(t, 2, this.length), this[t] | this[t + 1] << 8;
  };
  ct.prototype.readUint16BE = ct.prototype.readUInt16BE = function(t, e) {
    return t = t >>> 0, e || Ze(t, 2, this.length), this[t] << 8 | this[t + 1];
  };
  ct.prototype.readUint32LE = ct.prototype.readUInt32LE = function(t, e) {
    return t = t >>> 0, e || Ze(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
  };
  ct.prototype.readUint32BE = ct.prototype.readUInt32BE = function(t, e) {
    return t = t >>> 0, e || Ze(t, 4, this.length), this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
  };
  ct.prototype.readBigUInt64LE = Vr(function(t) {
    t = t >>> 0, ki(t, "offset");
    let e = this[t], f = this[t + 7];
    (e === void 0 || f === void 0) && wn(t, this.length - 8);
    let n = e + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24, g = this[++t] + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + f * 2 ** 24;
    return BigInt(n) + (BigInt(g) << BigInt(32));
  });
  ct.prototype.readBigUInt64BE = Vr(function(t) {
    t = t >>> 0, ki(t, "offset");
    let e = this[t], f = this[t + 7];
    (e === void 0 || f === void 0) && wn(t, this.length - 8);
    let n = e * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t], g = this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + f;
    return (BigInt(n) << BigInt(32)) + BigInt(g);
  });
  ct.prototype.readIntLE = function(t, e, f) {
    t = t >>> 0, e = e >>> 0, f || Ze(t, e, this.length);
    let n = this[t], g = 1, y = 0;
    for (; ++y < e && (g *= 256); )
      n += this[t + y] * g;
    return g *= 128, n >= g && (n -= Math.pow(2, 8 * e)), n;
  };
  ct.prototype.readIntBE = function(t, e, f) {
    t = t >>> 0, e = e >>> 0, f || Ze(t, e, this.length);
    let n = e, g = 1, y = this[t + --n];
    for (; n > 0 && (g *= 256); )
      y += this[t + --n] * g;
    return g *= 128, y >= g && (y -= Math.pow(2, 8 * e)), y;
  };
  ct.prototype.readInt8 = function(t, e) {
    return t = t >>> 0, e || Ze(t, 1, this.length), this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t];
  };
  ct.prototype.readInt16LE = function(t, e) {
    t = t >>> 0, e || Ze(t, 2, this.length);
    let f = this[t] | this[t + 1] << 8;
    return f & 32768 ? f | 4294901760 : f;
  };
  ct.prototype.readInt16BE = function(t, e) {
    t = t >>> 0, e || Ze(t, 2, this.length);
    let f = this[t + 1] | this[t] << 8;
    return f & 32768 ? f | 4294901760 : f;
  };
  ct.prototype.readInt32LE = function(t, e) {
    return t = t >>> 0, e || Ze(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
  };
  ct.prototype.readInt32BE = function(t, e) {
    return t = t >>> 0, e || Ze(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
  };
  ct.prototype.readBigInt64LE = Vr(function(t) {
    t = t >>> 0, ki(t, "offset");
    let e = this[t], f = this[t + 7];
    (e === void 0 || f === void 0) && wn(t, this.length - 8);
    let n = this[t + 4] + this[t + 5] * 2 ** 8 + this[t + 6] * 2 ** 16 + (f << 24);
    return (BigInt(n) << BigInt(32)) + BigInt(e + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24);
  });
  ct.prototype.readBigInt64BE = Vr(function(t) {
    t = t >>> 0, ki(t, "offset");
    let e = this[t], f = this[t + 7];
    (e === void 0 || f === void 0) && wn(t, this.length - 8);
    let n = (e << 24) + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t];
    return (BigInt(n) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + f);
  });
  ct.prototype.readFloatLE = function(t, e) {
    return t = t >>> 0, e || Ze(t, 4, this.length), Oi.read(this, t, true, 23, 4);
  };
  ct.prototype.readFloatBE = function(t, e) {
    return t = t >>> 0, e || Ze(t, 4, this.length), Oi.read(this, t, false, 23, 4);
  };
  ct.prototype.readDoubleLE = function(t, e) {
    return t = t >>> 0, e || Ze(t, 8, this.length), Oi.read(this, t, true, 52, 8);
  };
  ct.prototype.readDoubleBE = function(t, e) {
    return t = t >>> 0, e || Ze(t, 8, this.length), Oi.read(this, t, false, 52, 8);
  };
  function or(r3, t, e, f, n, g) {
    if (!ct.isBuffer(r3))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (t > n || t < g)
      throw new RangeError('"value" argument is out of bounds');
    if (e + f > r3.length)
      throw new RangeError("Index out of range");
  }
  ct.prototype.writeUintLE = ct.prototype.writeUIntLE = function(t, e, f, n) {
    if (t = +t, e = e >>> 0, f = f >>> 0, !n) {
      let _ = Math.pow(2, 8 * f) - 1;
      or(this, t, e, f, _, 0);
    }
    let g = 1, y = 0;
    for (this[e] = t & 255; ++y < f && (g *= 256); )
      this[e + y] = t / g & 255;
    return e + f;
  };
  ct.prototype.writeUintBE = ct.prototype.writeUIntBE = function(t, e, f, n) {
    if (t = +t, e = e >>> 0, f = f >>> 0, !n) {
      let _ = Math.pow(2, 8 * f) - 1;
      or(this, t, e, f, _, 0);
    }
    let g = f - 1, y = 1;
    for (this[e + g] = t & 255; --g >= 0 && (y *= 256); )
      this[e + g] = t / y & 255;
    return e + f;
  };
  ct.prototype.writeUint8 = ct.prototype.writeUInt8 = function(t, e, f) {
    return t = +t, e = e >>> 0, f || or(this, t, e, 1, 255, 0), this[e] = t & 255, e + 1;
  };
  ct.prototype.writeUint16LE = ct.prototype.writeUInt16LE = function(t, e, f) {
    return t = +t, e = e >>> 0, f || or(this, t, e, 2, 65535, 0), this[e] = t & 255, this[e + 1] = t >>> 8, e + 2;
  };
  ct.prototype.writeUint16BE = ct.prototype.writeUInt16BE = function(t, e, f) {
    return t = +t, e = e >>> 0, f || or(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = t & 255, e + 2;
  };
  ct.prototype.writeUint32LE = ct.prototype.writeUInt32LE = function(t, e, f) {
    return t = +t, e = e >>> 0, f || or(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = t & 255, e + 4;
  };
  ct.prototype.writeUint32BE = ct.prototype.writeUInt32BE = function(t, e, f) {
    return t = +t, e = e >>> 0, f || or(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = t & 255, e + 4;
  };
  function dl(r3, t, e, f, n) {
    yl(t, f, n, r3, e, 7);
    let g = Number(t & BigInt(4294967295));
    r3[e++] = g, g = g >> 8, r3[e++] = g, g = g >> 8, r3[e++] = g, g = g >> 8, r3[e++] = g;
    let y = Number(t >> BigInt(32) & BigInt(4294967295));
    return r3[e++] = y, y = y >> 8, r3[e++] = y, y = y >> 8, r3[e++] = y, y = y >> 8, r3[e++] = y, e;
  }
  function pl(r3, t, e, f, n) {
    yl(t, f, n, r3, e, 7);
    let g = Number(t & BigInt(4294967295));
    r3[e + 7] = g, g = g >> 8, r3[e + 6] = g, g = g >> 8, r3[e + 5] = g, g = g >> 8, r3[e + 4] = g;
    let y = Number(t >> BigInt(32) & BigInt(4294967295));
    return r3[e + 3] = y, y = y >> 8, r3[e + 2] = y, y = y >> 8, r3[e + 1] = y, y = y >> 8, r3[e] = y, e + 8;
  }
  ct.prototype.writeBigUInt64LE = Vr(function(t, e = 0) {
    return dl(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  ct.prototype.writeBigUInt64BE = Vr(function(t, e = 0) {
    return pl(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  ct.prototype.writeIntLE = function(t, e, f, n) {
    if (t = +t, e = e >>> 0, !n) {
      let E = Math.pow(2, 8 * f - 1);
      or(this, t, e, f, E - 1, -E);
    }
    let g = 0, y = 1, _ = 0;
    for (this[e] = t & 255; ++g < f && (y *= 256); )
      t < 0 && _ === 0 && this[e + g - 1] !== 0 && (_ = 1), this[e + g] = (t / y >> 0) - _ & 255;
    return e + f;
  };
  ct.prototype.writeIntBE = function(t, e, f, n) {
    if (t = +t, e = e >>> 0, !n) {
      let E = Math.pow(2, 8 * f - 1);
      or(this, t, e, f, E - 1, -E);
    }
    let g = f - 1, y = 1, _ = 0;
    for (this[e + g] = t & 255; --g >= 0 && (y *= 256); )
      t < 0 && _ === 0 && this[e + g + 1] !== 0 && (_ = 1), this[e + g] = (t / y >> 0) - _ & 255;
    return e + f;
  };
  ct.prototype.writeInt8 = function(t, e, f) {
    return t = +t, e = e >>> 0, f || or(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = t & 255, e + 1;
  };
  ct.prototype.writeInt16LE = function(t, e, f) {
    return t = +t, e = e >>> 0, f || or(this, t, e, 2, 32767, -32768), this[e] = t & 255, this[e + 1] = t >>> 8, e + 2;
  };
  ct.prototype.writeInt16BE = function(t, e, f) {
    return t = +t, e = e >>> 0, f || or(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = t & 255, e + 2;
  };
  ct.prototype.writeInt32LE = function(t, e, f) {
    return t = +t, e = e >>> 0, f || or(this, t, e, 4, 2147483647, -2147483648), this[e] = t & 255, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4;
  };
  ct.prototype.writeInt32BE = function(t, e, f) {
    return t = +t, e = e >>> 0, f || or(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = t & 255, e + 4;
  };
  ct.prototype.writeBigInt64LE = Vr(function(t, e = 0) {
    return dl(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  ct.prototype.writeBigInt64BE = Vr(function(t, e = 0) {
    return pl(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function ml(r3, t, e, f, n, g) {
    if (e + f > r3.length)
      throw new RangeError("Index out of range");
    if (e < 0)
      throw new RangeError("Index out of range");
  }
  function gl(r3, t, e, f, n) {
    return t = +t, e = e >>> 0, n || ml(r3, t, e, 4), Oi.write(r3, t, e, f, 23, 4), e + 4;
  }
  ct.prototype.writeFloatLE = function(t, e, f) {
    return gl(this, t, e, true, f);
  };
  ct.prototype.writeFloatBE = function(t, e, f) {
    return gl(this, t, e, false, f);
  };
  function vl(r3, t, e, f, n) {
    return t = +t, e = e >>> 0, n || ml(r3, t, e, 8), Oi.write(r3, t, e, f, 52, 8), e + 8;
  }
  ct.prototype.writeDoubleLE = function(t, e, f) {
    return vl(this, t, e, true, f);
  };
  ct.prototype.writeDoubleBE = function(t, e, f) {
    return vl(this, t, e, false, f);
  };
  ct.prototype.copy = function(t, e, f, n) {
    if (!ct.isBuffer(t))
      throw new TypeError("argument should be a Buffer");
    if (f || (f = 0), !n && n !== 0 && (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < f && (n = f), n === f || t.length === 0 || this.length === 0)
      return 0;
    if (e < 0)
      throw new RangeError("targetStart out of bounds");
    if (f < 0 || f >= this.length)
      throw new RangeError("Index out of range");
    if (n < 0)
      throw new RangeError("sourceEnd out of bounds");
    n > this.length && (n = this.length), t.length - e < n - f && (n = t.length - e + f);
    let g = n - f;
    return this === t && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(e, f, n) : Uint8Array.prototype.set.call(t, this.subarray(f, n), e), g;
  };
  ct.prototype.fill = function(t, e, f, n) {
    if (typeof t == "string") {
      if (typeof e == "string" ? (n = e, e = 0, f = this.length) : typeof f == "string" && (n = f, f = this.length), n !== void 0 && typeof n != "string")
        throw new TypeError("encoding must be a string");
      if (typeof n == "string" && !ct.isEncoding(n))
        throw new TypeError("Unknown encoding: " + n);
      if (t.length === 1) {
        let y = t.charCodeAt(0);
        (n === "utf8" && y < 128 || n === "latin1") && (t = y);
      }
    } else
      typeof t == "number" ? t = t & 255 : typeof t == "boolean" && (t = Number(t));
    if (e < 0 || this.length < e || this.length < f)
      throw new RangeError("Out of range index");
    if (f <= e)
      return this;
    e = e >>> 0, f = f === void 0 ? this.length : f >>> 0, t || (t = 0);
    let g;
    if (typeof t == "number")
      for (g = e; g < f; ++g)
        this[g] = t;
    else {
      let y = ct.isBuffer(t) ? t : ct.from(t, n), _ = y.length;
      if (_ === 0)
        throw new TypeError('The value "' + t + '" is invalid for argument "value"');
      for (g = 0; g < f - e; ++g)
        this[g + e] = y[g % _];
    }
    return this;
  };
  var Di = {};
  function fa(r3, t, e) {
    Di[r3] = class extends e {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: t.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${r3}]`, this.stack, delete this.name;
      }
      get code() {
        return r3;
      }
      set code(n) {
        Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: n, writable: true });
      }
      toString() {
        return `${this.name} [${r3}]: ${this.message}`;
      }
    };
  }
  fa("ERR_BUFFER_OUT_OF_BOUNDS", function(r3) {
    return r3 ? `${r3} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  fa("ERR_INVALID_ARG_TYPE", function(r3, t) {
    return `The "${r3}" argument must be of type number. Received type ${typeof t}`;
  }, TypeError);
  fa("ERR_OUT_OF_RANGE", function(r3, t, e) {
    let f = `The value of "${r3}" is out of range.`, n = e;
    return Number.isInteger(e) && Math.abs(e) > 2 ** 32 ? n = al(String(e)) : typeof e == "bigint" && (n = String(e), (e > BigInt(2) ** BigInt(32) || e < -(BigInt(2) ** BigInt(32))) && (n = al(n)), n += "n"), f += ` It must be ${t}. Received ${n}`, f;
  }, RangeError);
  function al(r3) {
    let t = "", e = r3.length, f = r3[0] === "-" ? 1 : 0;
    for (; e >= f + 4; e -= 3)
      t = `_${r3.slice(e - 3, e)}${t}`;
    return `${r3.slice(0, e)}${t}`;
  }
  function r1(r3, t, e) {
    ki(t, "offset"), (r3[t] === void 0 || r3[t + e] === void 0) && wn(t, r3.length - (e + 1));
  }
  function yl(r3, t, e, f, n, g) {
    if (r3 > e || r3 < t) {
      let y = typeof t == "bigint" ? "n" : "", _;
      throw g > 3 ? t === 0 || t === BigInt(0) ? _ = `>= 0${y} and < 2${y} ** ${(g + 1) * 8}${y}` : _ = `>= -(2${y} ** ${(g + 1) * 8 - 1}${y}) and < 2 ** ${(g + 1) * 8 - 1}${y}` : _ = `>= ${t}${y} and <= ${e}${y}`, new Di.ERR_OUT_OF_RANGE("value", _, r3);
    }
    r1(f, n, g);
  }
  function ki(r3, t) {
    if (typeof r3 != "number")
      throw new Di.ERR_INVALID_ARG_TYPE(t, "number", r3);
  }
  function wn(r3, t, e) {
    throw Math.floor(r3) !== r3 ? (ki(r3, e), new Di.ERR_OUT_OF_RANGE(e || "offset", "an integer", r3)) : t < 0 ? new Di.ERR_BUFFER_OUT_OF_BOUNDS() : new Di.ERR_OUT_OF_RANGE(e || "offset", `>= ${e ? 1 : 0} and <= ${t}`, r3);
  }
  var i1 = /[^+/0-9A-Za-z-_]/g;
  function n1(r3) {
    if (r3 = r3.split("=")[0], r3 = r3.trim().replace(i1, ""), r3.length < 2)
      return "";
    for (; r3.length % 4 !== 0; )
      r3 = r3 + "=";
    return r3;
  }
  function oa(r3, t) {
    t = t || 1 / 0;
    let e, f = r3.length, n = null, g = [];
    for (let y = 0; y < f; ++y) {
      if (e = r3.charCodeAt(y), e > 55295 && e < 57344) {
        if (!n) {
          if (e > 56319) {
            (t -= 3) > -1 && g.push(239, 191, 189);
            continue;
          } else if (y + 1 === f) {
            (t -= 3) > -1 && g.push(239, 191, 189);
            continue;
          }
          n = e;
          continue;
        }
        if (e < 56320) {
          (t -= 3) > -1 && g.push(239, 191, 189), n = e;
          continue;
        }
        e = (n - 55296 << 10 | e - 56320) + 65536;
      } else
        n && (t -= 3) > -1 && g.push(239, 191, 189);
      if (n = null, e < 128) {
        if ((t -= 1) < 0)
          break;
        g.push(e);
      } else if (e < 2048) {
        if ((t -= 2) < 0)
          break;
        g.push(e >> 6 | 192, e & 63 | 128);
      } else if (e < 65536) {
        if ((t -= 3) < 0)
          break;
        g.push(e >> 12 | 224, e >> 6 & 63 | 128, e & 63 | 128);
      } else if (e < 1114112) {
        if ((t -= 4) < 0)
          break;
        g.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, e & 63 | 128);
      } else
        throw new Error("Invalid code point");
    }
    return g;
  }
  function o1(r3) {
    let t = [];
    for (let e = 0; e < r3.length; ++e)
      t.push(r3.charCodeAt(e) & 255);
    return t;
  }
  function s1(r3, t) {
    let e, f, n, g = [];
    for (let y = 0; y < r3.length && !((t -= 2) < 0); ++y)
      e = r3.charCodeAt(y), f = e >> 8, n = e % 256, g.push(n), g.push(f);
    return g;
  }
  function wl(r3) {
    return ra.toByteArray(n1(r3));
  }
  function Bo(r3, t, e, f) {
    let n;
    for (n = 0; n < f && !(n + e >= t.length || n >= r3.length); ++n)
      t[n + e] = r3[n];
    return n;
  }
  function Er(r3, t) {
    return r3 instanceof t || r3 != null && r3.constructor != null && r3.constructor.name != null && r3.constructor.name === t.name;
  }
  function ha(r3) {
    return r3 !== r3;
  }
  var a1 = function() {
    let r3 = "0123456789abcdef", t = new Array(256);
    for (let e = 0; e < 16; ++e) {
      let f = e * 16;
      for (let n = 0; n < 16; ++n)
        t[f + n] = r3[e] + r3[n];
    }
    return t;
  }();
  function Vr(r3) {
    return typeof BigInt == "undefined" ? f1 : r3;
  }
  function f1() {
    throw new Error("BigInt not supported");
  }
});
var ir = ae((xl, la) => {
  (function(r3, t) {
    function e(x, o) {
      if (!x)
        throw new Error(o || "Assertion failed");
    }
    function f(x, o) {
      x.super_ = o;
      var u = function() {
      };
      u.prototype = o.prototype, x.prototype = new u(), x.prototype.constructor = x;
    }
    function n(x, o, u) {
      if (n.isBN(x))
        return x;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, x !== null && ((o === "le" || o === "be") && (u = o, o = 10), this._init(x || 0, o || 10, u || "be"));
    }
    typeof r3 == "object" ? r3.exports = n : t.BN = n, n.BN = n, n.wordSize = 26;
    var g;
    try {
      g = qi().Buffer;
    } catch (x) {
    }
    n.isBN = function(o) {
      return o instanceof n ? true : o !== null && typeof o == "object" && o.constructor.wordSize === n.wordSize && Array.isArray(o.words);
    }, n.max = function(o, u) {
      return o.cmp(u) > 0 ? o : u;
    }, n.min = function(o, u) {
      return o.cmp(u) < 0 ? o : u;
    }, n.prototype._init = function(o, u, c) {
      if (typeof o == "number")
        return this._initNumber(o, u, c);
      if (typeof o == "object")
        return this._initArray(o, u, c);
      u === "hex" && (u = 16), e(u === (u | 0) && u >= 2 && u <= 36), o = o.toString().replace(/\s+/g, "");
      var a = 0;
      o[0] === "-" && a++, u === 16 ? this._parseHex(o, a) : this._parseBase(o, u, a), o[0] === "-" && (this.negative = 1), this.strip(), c === "le" && this._initArray(this.toArray(), u, c);
    }, n.prototype._initNumber = function(o, u, c) {
      o < 0 && (this.negative = 1, o = -o), o < 67108864 ? (this.words = [o & 67108863], this.length = 1) : o < 4503599627370496 ? (this.words = [o & 67108863, o / 67108864 & 67108863], this.length = 2) : (e(o < 9007199254740992), this.words = [o & 67108863, o / 67108864 & 67108863, 1], this.length = 3), c === "le" && this._initArray(this.toArray(), u, c);
    }, n.prototype._initArray = function(o, u, c) {
      if (e(typeof o.length == "number"), o.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(o.length / 3), this.words = new Array(this.length);
      for (var a = 0; a < this.length; a++)
        this.words[a] = 0;
      var s, h, p = 0;
      if (c === "be")
        for (a = o.length - 1, s = 0; a >= 0; a -= 3)
          h = o[a] | o[a - 1] << 8 | o[a - 2] << 16, this.words[s] |= h << p & 67108863, this.words[s + 1] = h >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, s++);
      else if (c === "le")
        for (a = 0, s = 0; a < o.length; a += 3)
          h = o[a] | o[a + 1] << 8 | o[a + 2] << 16, this.words[s] |= h << p & 67108863, this.words[s + 1] = h >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, s++);
      return this.strip();
    };
    function y(x, o, u) {
      for (var c = 0, a = Math.min(x.length, u), s = o; s < a; s++) {
        var h = x.charCodeAt(s) - 48;
        c <<= 4, h >= 49 && h <= 54 ? c |= h - 49 + 10 : h >= 17 && h <= 22 ? c |= h - 17 + 10 : c |= h & 15;
      }
      return c;
    }
    n.prototype._parseHex = function(o, u) {
      this.length = Math.ceil((o.length - u) / 6), this.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        this.words[c] = 0;
      var a, s, h = 0;
      for (c = o.length - 6, a = 0; c >= u; c -= 6)
        s = y(o, c, c + 6), this.words[a] |= s << h & 67108863, this.words[a + 1] |= s >>> 26 - h & 4194303, h += 24, h >= 26 && (h -= 26, a++);
      c + 6 !== u && (s = y(o, u, c + 6), this.words[a] |= s << h & 67108863, this.words[a + 1] |= s >>> 26 - h & 4194303), this.strip();
    };
    function _(x, o, u, c) {
      for (var a = 0, s = Math.min(x.length, u), h = o; h < s; h++) {
        var p = x.charCodeAt(h) - 48;
        a *= c, p >= 49 ? a += p - 49 + 10 : p >= 17 ? a += p - 17 + 10 : a += p;
      }
      return a;
    }
    n.prototype._parseBase = function(o, u, c) {
      this.words = [0], this.length = 1;
      for (var a = 0, s = 1; s <= 67108863; s *= u)
        a++;
      a--, s = s / u | 0;
      for (var h = o.length - c, p = h % a, l = Math.min(h, h - p) + c, i = 0, d = c; d < l; d += a)
        i = _(o, d, d + a, u), this.imuln(s), this.words[0] + i < 67108864 ? this.words[0] += i : this._iaddn(i);
      if (p !== 0) {
        var M = 1;
        for (i = _(o, d, o.length, u), d = 0; d < p; d++)
          M *= u;
        this.imuln(M), this.words[0] + i < 67108864 ? this.words[0] += i : this._iaddn(i);
      }
    }, n.prototype.copy = function(o) {
      o.words = new Array(this.length);
      for (var u = 0; u < this.length; u++)
        o.words[u] = this.words[u];
      o.length = this.length, o.negative = this.negative, o.red = this.red;
    }, n.prototype.clone = function() {
      var o = new n(null);
      return this.copy(o), o;
    }, n.prototype._expand = function(o) {
      for (; this.length < o; )
        this.words[this.length++] = 0;
      return this;
    }, n.prototype.strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, n.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, n.prototype.inspect = function() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    };
    var E = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], S = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], I = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    n.prototype.toString = function(o, u) {
      o = o || 10, u = u | 0 || 1;
      var c;
      if (o === 16 || o === "hex") {
        c = "";
        for (var a = 0, s = 0, h = 0; h < this.length; h++) {
          var p = this.words[h], l = ((p << a | s) & 16777215).toString(16);
          s = p >>> 24 - a & 16777215, s !== 0 || h !== this.length - 1 ? c = E[6 - l.length] + l + c : c = l + c, a += 2, a >= 26 && (a -= 26, h--);
        }
        for (s !== 0 && (c = s.toString(16) + c); c.length % u !== 0; )
          c = "0" + c;
        return this.negative !== 0 && (c = "-" + c), c;
      }
      if (o === (o | 0) && o >= 2 && o <= 36) {
        var i = S[o], d = I[o];
        c = "";
        var M = this.clone();
        for (M.negative = 0; !M.isZero(); ) {
          var m = M.modn(d).toString(o);
          M = M.idivn(d), M.isZero() ? c = m + c : c = E[i - m.length] + m + c;
        }
        for (this.isZero() && (c = "0" + c); c.length % u !== 0; )
          c = "0" + c;
        return this.negative !== 0 && (c = "-" + c), c;
      }
      e(false, "Base should be between 2 and 36");
    }, n.prototype.toNumber = function() {
      var o = this.words[0];
      return this.length === 2 ? o += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? o += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && e(false, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -o : o;
    }, n.prototype.toJSON = function() {
      return this.toString(16);
    }, n.prototype.toBuffer = function(o, u) {
      return e(typeof g != "undefined"), this.toArrayLike(g, o, u);
    }, n.prototype.toArray = function(o, u) {
      return this.toArrayLike(Array, o, u);
    }, n.prototype.toArrayLike = function(o, u, c) {
      var a = this.byteLength(), s = c || Math.max(1, a);
      e(a <= s, "byte array longer than desired length"), e(s > 0, "Requested array length <= 0"), this.strip();
      var h = u === "le", p = new o(s), l, i, d = this.clone();
      if (h) {
        for (i = 0; !d.isZero(); i++)
          l = d.andln(255), d.iushrn(8), p[i] = l;
        for (; i < s; i++)
          p[i] = 0;
      } else {
        for (i = 0; i < s - a; i++)
          p[i] = 0;
        for (i = 0; !d.isZero(); i++)
          l = d.andln(255), d.iushrn(8), p[s - i - 1] = l;
      }
      return p;
    }, Math.clz32 ? n.prototype._countBits = function(o) {
      return 32 - Math.clz32(o);
    } : n.prototype._countBits = function(o) {
      var u = o, c = 0;
      return u >= 4096 && (c += 13, u >>>= 13), u >= 64 && (c += 7, u >>>= 7), u >= 8 && (c += 4, u >>>= 4), u >= 2 && (c += 2, u >>>= 2), c + u;
    }, n.prototype._zeroBits = function(o) {
      if (o === 0)
        return 26;
      var u = o, c = 0;
      return u & 8191 || (c += 13, u >>>= 13), u & 127 || (c += 7, u >>>= 7), u & 15 || (c += 4, u >>>= 4), u & 3 || (c += 2, u >>>= 2), u & 1 || c++, c;
    }, n.prototype.bitLength = function() {
      var o = this.words[this.length - 1], u = this._countBits(o);
      return (this.length - 1) * 26 + u;
    };
    function F(x) {
      for (var o = new Array(x.bitLength()), u = 0; u < o.length; u++) {
        var c = u / 26 | 0, a = u % 26;
        o[u] = (x.words[c] & 1 << a) >>> a;
      }
      return o;
    }
    n.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var o = 0, u = 0; u < this.length; u++) {
        var c = this._zeroBits(this.words[u]);
        if (o += c, c !== 26)
          break;
      }
      return o;
    }, n.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, n.prototype.toTwos = function(o) {
      return this.negative !== 0 ? this.abs().inotn(o).iaddn(1) : this.clone();
    }, n.prototype.fromTwos = function(o) {
      return this.testn(o - 1) ? this.notn(o).iaddn(1).ineg() : this.clone();
    }, n.prototype.isNeg = function() {
      return this.negative !== 0;
    }, n.prototype.neg = function() {
      return this.clone().ineg();
    }, n.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, n.prototype.iuor = function(o) {
      for (; this.length < o.length; )
        this.words[this.length++] = 0;
      for (var u = 0; u < o.length; u++)
        this.words[u] = this.words[u] | o.words[u];
      return this.strip();
    }, n.prototype.ior = function(o) {
      return e((this.negative | o.negative) === 0), this.iuor(o);
    }, n.prototype.or = function(o) {
      return this.length > o.length ? this.clone().ior(o) : o.clone().ior(this);
    }, n.prototype.uor = function(o) {
      return this.length > o.length ? this.clone().iuor(o) : o.clone().iuor(this);
    }, n.prototype.iuand = function(o) {
      var u;
      this.length > o.length ? u = o : u = this;
      for (var c = 0; c < u.length; c++)
        this.words[c] = this.words[c] & o.words[c];
      return this.length = u.length, this.strip();
    }, n.prototype.iand = function(o) {
      return e((this.negative | o.negative) === 0), this.iuand(o);
    }, n.prototype.and = function(o) {
      return this.length > o.length ? this.clone().iand(o) : o.clone().iand(this);
    }, n.prototype.uand = function(o) {
      return this.length > o.length ? this.clone().iuand(o) : o.clone().iuand(this);
    }, n.prototype.iuxor = function(o) {
      var u, c;
      this.length > o.length ? (u = this, c = o) : (u = o, c = this);
      for (var a = 0; a < c.length; a++)
        this.words[a] = u.words[a] ^ c.words[a];
      if (this !== u)
        for (; a < u.length; a++)
          this.words[a] = u.words[a];
      return this.length = u.length, this.strip();
    }, n.prototype.ixor = function(o) {
      return e((this.negative | o.negative) === 0), this.iuxor(o);
    }, n.prototype.xor = function(o) {
      return this.length > o.length ? this.clone().ixor(o) : o.clone().ixor(this);
    }, n.prototype.uxor = function(o) {
      return this.length > o.length ? this.clone().iuxor(o) : o.clone().iuxor(this);
    }, n.prototype.inotn = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = Math.ceil(o / 26) | 0, c = o % 26;
      this._expand(u), c > 0 && u--;
      for (var a = 0; a < u; a++)
        this.words[a] = ~this.words[a] & 67108863;
      return c > 0 && (this.words[a] = ~this.words[a] & 67108863 >> 26 - c), this.strip();
    }, n.prototype.notn = function(o) {
      return this.clone().inotn(o);
    }, n.prototype.setn = function(o, u) {
      e(typeof o == "number" && o >= 0);
      var c = o / 26 | 0, a = o % 26;
      return this._expand(c + 1), u ? this.words[c] = this.words[c] | 1 << a : this.words[c] = this.words[c] & ~(1 << a), this.strip();
    }, n.prototype.iadd = function(o) {
      var u;
      if (this.negative !== 0 && o.negative === 0)
        return this.negative = 0, u = this.isub(o), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && o.negative !== 0)
        return o.negative = 0, u = this.isub(o), o.negative = 1, u._normSign();
      var c, a;
      this.length > o.length ? (c = this, a = o) : (c = o, a = this);
      for (var s = 0, h = 0; h < a.length; h++)
        u = (c.words[h] | 0) + (a.words[h] | 0) + s, this.words[h] = u & 67108863, s = u >>> 26;
      for (; s !== 0 && h < c.length; h++)
        u = (c.words[h] | 0) + s, this.words[h] = u & 67108863, s = u >>> 26;
      if (this.length = c.length, s !== 0)
        this.words[this.length] = s, this.length++;
      else if (c !== this)
        for (; h < c.length; h++)
          this.words[h] = c.words[h];
      return this;
    }, n.prototype.add = function(o) {
      var u;
      return o.negative !== 0 && this.negative === 0 ? (o.negative = 0, u = this.sub(o), o.negative ^= 1, u) : o.negative === 0 && this.negative !== 0 ? (this.negative = 0, u = o.sub(this), this.negative = 1, u) : this.length > o.length ? this.clone().iadd(o) : o.clone().iadd(this);
    }, n.prototype.isub = function(o) {
      if (o.negative !== 0) {
        o.negative = 0;
        var u = this.iadd(o);
        return o.negative = 1, u._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(o), this.negative = 1, this._normSign();
      var c = this.cmp(o);
      if (c === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var a, s;
      c > 0 ? (a = this, s = o) : (a = o, s = this);
      for (var h = 0, p = 0; p < s.length; p++)
        u = (a.words[p] | 0) - (s.words[p] | 0) + h, h = u >> 26, this.words[p] = u & 67108863;
      for (; h !== 0 && p < a.length; p++)
        u = (a.words[p] | 0) + h, h = u >> 26, this.words[p] = u & 67108863;
      if (h === 0 && p < a.length && a !== this)
        for (; p < a.length; p++)
          this.words[p] = a.words[p];
      return this.length = Math.max(this.length, p), a !== this && (this.negative = 1), this.strip();
    }, n.prototype.sub = function(o) {
      return this.clone().isub(o);
    };
    function P(x, o, u) {
      u.negative = o.negative ^ x.negative;
      var c = x.length + o.length | 0;
      u.length = c, c = c - 1 | 0;
      var a = x.words[0] | 0, s = o.words[0] | 0, h = a * s, p = h & 67108863, l = h / 67108864 | 0;
      u.words[0] = p;
      for (var i = 1; i < c; i++) {
        for (var d = l >>> 26, M = l & 67108863, m = Math.min(i, o.length - 1), v = Math.max(0, i - x.length + 1); v <= m; v++) {
          var B = i - v | 0;
          a = x.words[B] | 0, s = o.words[v] | 0, h = a * s + M, d += h / 67108864 | 0, M = h & 67108863;
        }
        u.words[i] = M | 0, l = d | 0;
      }
      return l !== 0 ? u.words[i] = l | 0 : u.length--, u.strip();
    }
    var Y = function(o, u, c) {
      var a = o.words, s = u.words, h = c.words, p = 0, l, i, d, M = a[0] | 0, m = M & 8191, v = M >>> 13, B = a[1] | 0, O = B & 8191, $ = B >>> 13, ut = a[2] | 0, V = ut & 8191, ot = ut >>> 13, le = a[3] | 0, St = le & 8191, pt = le >>> 13, de = a[4] | 0, zt = de & 8191, Et = de >>> 13, ne = a[5] | 0, qt = ne & 8191, _t = ne >>> 13, fe = a[6] | 0, Pt = fe & 8191, bt = fe >>> 13, be = a[7] | 0, kt = be & 8191, Mt = be >>> 13, me = a[8] | 0, Lt = me & 8191, wt = me >>> 13, _e = a[9] | 0, It = _e & 8191, Bt = _e >>> 13, Ee = s[0] | 0, Wt = Ee & 8191, yt = Ee >>> 13, xe = s[1] | 0, Ut = xe & 8191, gt = xe >>> 13, Ae = s[2] | 0, Dt = Ae & 8191, xt = Ae >>> 13, D = s[3] | 0, N = D & 8191, U = D >>> 13, st = s[4] | 0, H = st & 8191, J = st >>> 13, Ft = s[5] | 0, ht = Ft & 8191, tt = Ft >>> 13, Zt = s[6] | 0, Ct = Zt & 8191, at = Zt >>> 13, ce = s[7] | 0, b = ce & 8191, C = ce >>> 13, T = s[8] | 0, w = T & 8191, A = T >>> 13, W = s[9] | 0, R = W & 8191, L = W >>> 13;
      c.negative = o.negative ^ u.negative, c.length = 19, l = Math.imul(m, Wt), i = Math.imul(m, yt), i = i + Math.imul(v, Wt) | 0, d = Math.imul(v, yt);
      var lt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (lt >>> 26) | 0, lt &= 67108863, l = Math.imul(O, Wt), i = Math.imul(O, yt), i = i + Math.imul($, Wt) | 0, d = Math.imul($, yt), l = l + Math.imul(m, Ut) | 0, i = i + Math.imul(m, gt) | 0, i = i + Math.imul(v, Ut) | 0, d = d + Math.imul(v, gt) | 0;
      var Nt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, l = Math.imul(V, Wt), i = Math.imul(V, yt), i = i + Math.imul(ot, Wt) | 0, d = Math.imul(ot, yt), l = l + Math.imul(O, Ut) | 0, i = i + Math.imul(O, gt) | 0, i = i + Math.imul($, Ut) | 0, d = d + Math.imul($, gt) | 0, l = l + Math.imul(m, Dt) | 0, i = i + Math.imul(m, xt) | 0, i = i + Math.imul(v, Dt) | 0, d = d + Math.imul(v, xt) | 0;
      var dt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (dt >>> 26) | 0, dt &= 67108863, l = Math.imul(St, Wt), i = Math.imul(St, yt), i = i + Math.imul(pt, Wt) | 0, d = Math.imul(pt, yt), l = l + Math.imul(V, Ut) | 0, i = i + Math.imul(V, gt) | 0, i = i + Math.imul(ot, Ut) | 0, d = d + Math.imul(ot, gt) | 0, l = l + Math.imul(O, Dt) | 0, i = i + Math.imul(O, xt) | 0, i = i + Math.imul($, Dt) | 0, d = d + Math.imul($, xt) | 0, l = l + Math.imul(m, N) | 0, i = i + Math.imul(m, U) | 0, i = i + Math.imul(v, N) | 0, d = d + Math.imul(v, U) | 0;
      var Jt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Jt >>> 26) | 0, Jt &= 67108863, l = Math.imul(zt, Wt), i = Math.imul(zt, yt), i = i + Math.imul(Et, Wt) | 0, d = Math.imul(Et, yt), l = l + Math.imul(St, Ut) | 0, i = i + Math.imul(St, gt) | 0, i = i + Math.imul(pt, Ut) | 0, d = d + Math.imul(pt, gt) | 0, l = l + Math.imul(V, Dt) | 0, i = i + Math.imul(V, xt) | 0, i = i + Math.imul(ot, Dt) | 0, d = d + Math.imul(ot, xt) | 0, l = l + Math.imul(O, N) | 0, i = i + Math.imul(O, U) | 0, i = i + Math.imul($, N) | 0, d = d + Math.imul($, U) | 0, l = l + Math.imul(m, H) | 0, i = i + Math.imul(m, J) | 0, i = i + Math.imul(v, H) | 0, d = d + Math.imul(v, J) | 0;
      var Kt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Kt >>> 26) | 0, Kt &= 67108863, l = Math.imul(qt, Wt), i = Math.imul(qt, yt), i = i + Math.imul(_t, Wt) | 0, d = Math.imul(_t, yt), l = l + Math.imul(zt, Ut) | 0, i = i + Math.imul(zt, gt) | 0, i = i + Math.imul(Et, Ut) | 0, d = d + Math.imul(Et, gt) | 0, l = l + Math.imul(St, Dt) | 0, i = i + Math.imul(St, xt) | 0, i = i + Math.imul(pt, Dt) | 0, d = d + Math.imul(pt, xt) | 0, l = l + Math.imul(V, N) | 0, i = i + Math.imul(V, U) | 0, i = i + Math.imul(ot, N) | 0, d = d + Math.imul(ot, U) | 0, l = l + Math.imul(O, H) | 0, i = i + Math.imul(O, J) | 0, i = i + Math.imul($, H) | 0, d = d + Math.imul($, J) | 0, l = l + Math.imul(m, ht) | 0, i = i + Math.imul(m, tt) | 0, i = i + Math.imul(v, ht) | 0, d = d + Math.imul(v, tt) | 0;
      var Xt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Xt >>> 26) | 0, Xt &= 67108863, l = Math.imul(Pt, Wt), i = Math.imul(Pt, yt), i = i + Math.imul(bt, Wt) | 0, d = Math.imul(bt, yt), l = l + Math.imul(qt, Ut) | 0, i = i + Math.imul(qt, gt) | 0, i = i + Math.imul(_t, Ut) | 0, d = d + Math.imul(_t, gt) | 0, l = l + Math.imul(zt, Dt) | 0, i = i + Math.imul(zt, xt) | 0, i = i + Math.imul(Et, Dt) | 0, d = d + Math.imul(Et, xt) | 0, l = l + Math.imul(St, N) | 0, i = i + Math.imul(St, U) | 0, i = i + Math.imul(pt, N) | 0, d = d + Math.imul(pt, U) | 0, l = l + Math.imul(V, H) | 0, i = i + Math.imul(V, J) | 0, i = i + Math.imul(ot, H) | 0, d = d + Math.imul(ot, J) | 0, l = l + Math.imul(O, ht) | 0, i = i + Math.imul(O, tt) | 0, i = i + Math.imul($, ht) | 0, d = d + Math.imul($, tt) | 0, l = l + Math.imul(m, Ct) | 0, i = i + Math.imul(m, at) | 0, i = i + Math.imul(v, Ct) | 0, d = d + Math.imul(v, at) | 0;
      var Qt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Qt >>> 26) | 0, Qt &= 67108863, l = Math.imul(kt, Wt), i = Math.imul(kt, yt), i = i + Math.imul(Mt, Wt) | 0, d = Math.imul(Mt, yt), l = l + Math.imul(Pt, Ut) | 0, i = i + Math.imul(Pt, gt) | 0, i = i + Math.imul(bt, Ut) | 0, d = d + Math.imul(bt, gt) | 0, l = l + Math.imul(qt, Dt) | 0, i = i + Math.imul(qt, xt) | 0, i = i + Math.imul(_t, Dt) | 0, d = d + Math.imul(_t, xt) | 0, l = l + Math.imul(zt, N) | 0, i = i + Math.imul(zt, U) | 0, i = i + Math.imul(Et, N) | 0, d = d + Math.imul(Et, U) | 0, l = l + Math.imul(St, H) | 0, i = i + Math.imul(St, J) | 0, i = i + Math.imul(pt, H) | 0, d = d + Math.imul(pt, J) | 0, l = l + Math.imul(V, ht) | 0, i = i + Math.imul(V, tt) | 0, i = i + Math.imul(ot, ht) | 0, d = d + Math.imul(ot, tt) | 0, l = l + Math.imul(O, Ct) | 0, i = i + Math.imul(O, at) | 0, i = i + Math.imul($, Ct) | 0, d = d + Math.imul($, at) | 0, l = l + Math.imul(m, b) | 0, i = i + Math.imul(m, C) | 0, i = i + Math.imul(v, b) | 0, d = d + Math.imul(v, C) | 0;
      var se = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (se >>> 26) | 0, se &= 67108863, l = Math.imul(Lt, Wt), i = Math.imul(Lt, yt), i = i + Math.imul(wt, Wt) | 0, d = Math.imul(wt, yt), l = l + Math.imul(kt, Ut) | 0, i = i + Math.imul(kt, gt) | 0, i = i + Math.imul(Mt, Ut) | 0, d = d + Math.imul(Mt, gt) | 0, l = l + Math.imul(Pt, Dt) | 0, i = i + Math.imul(Pt, xt) | 0, i = i + Math.imul(bt, Dt) | 0, d = d + Math.imul(bt, xt) | 0, l = l + Math.imul(qt, N) | 0, i = i + Math.imul(qt, U) | 0, i = i + Math.imul(_t, N) | 0, d = d + Math.imul(_t, U) | 0, l = l + Math.imul(zt, H) | 0, i = i + Math.imul(zt, J) | 0, i = i + Math.imul(Et, H) | 0, d = d + Math.imul(Et, J) | 0, l = l + Math.imul(St, ht) | 0, i = i + Math.imul(St, tt) | 0, i = i + Math.imul(pt, ht) | 0, d = d + Math.imul(pt, tt) | 0, l = l + Math.imul(V, Ct) | 0, i = i + Math.imul(V, at) | 0, i = i + Math.imul(ot, Ct) | 0, d = d + Math.imul(ot, at) | 0, l = l + Math.imul(O, b) | 0, i = i + Math.imul(O, C) | 0, i = i + Math.imul($, b) | 0, d = d + Math.imul($, C) | 0, l = l + Math.imul(m, w) | 0, i = i + Math.imul(m, A) | 0, i = i + Math.imul(v, w) | 0, d = d + Math.imul(v, A) | 0;
      var oe = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (oe >>> 26) | 0, oe &= 67108863, l = Math.imul(It, Wt), i = Math.imul(It, yt), i = i + Math.imul(Bt, Wt) | 0, d = Math.imul(Bt, yt), l = l + Math.imul(Lt, Ut) | 0, i = i + Math.imul(Lt, gt) | 0, i = i + Math.imul(wt, Ut) | 0, d = d + Math.imul(wt, gt) | 0, l = l + Math.imul(kt, Dt) | 0, i = i + Math.imul(kt, xt) | 0, i = i + Math.imul(Mt, Dt) | 0, d = d + Math.imul(Mt, xt) | 0, l = l + Math.imul(Pt, N) | 0, i = i + Math.imul(Pt, U) | 0, i = i + Math.imul(bt, N) | 0, d = d + Math.imul(bt, U) | 0, l = l + Math.imul(qt, H) | 0, i = i + Math.imul(qt, J) | 0, i = i + Math.imul(_t, H) | 0, d = d + Math.imul(_t, J) | 0, l = l + Math.imul(zt, ht) | 0, i = i + Math.imul(zt, tt) | 0, i = i + Math.imul(Et, ht) | 0, d = d + Math.imul(Et, tt) | 0, l = l + Math.imul(St, Ct) | 0, i = i + Math.imul(St, at) | 0, i = i + Math.imul(pt, Ct) | 0, d = d + Math.imul(pt, at) | 0, l = l + Math.imul(V, b) | 0, i = i + Math.imul(V, C) | 0, i = i + Math.imul(ot, b) | 0, d = d + Math.imul(ot, C) | 0, l = l + Math.imul(O, w) | 0, i = i + Math.imul(O, A) | 0, i = i + Math.imul($, w) | 0, d = d + Math.imul($, A) | 0, l = l + Math.imul(m, R) | 0, i = i + Math.imul(m, L) | 0, i = i + Math.imul(v, R) | 0, d = d + Math.imul(v, L) | 0;
      var te = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (te >>> 26) | 0, te &= 67108863, l = Math.imul(It, Ut), i = Math.imul(It, gt), i = i + Math.imul(Bt, Ut) | 0, d = Math.imul(Bt, gt), l = l + Math.imul(Lt, Dt) | 0, i = i + Math.imul(Lt, xt) | 0, i = i + Math.imul(wt, Dt) | 0, d = d + Math.imul(wt, xt) | 0, l = l + Math.imul(kt, N) | 0, i = i + Math.imul(kt, U) | 0, i = i + Math.imul(Mt, N) | 0, d = d + Math.imul(Mt, U) | 0, l = l + Math.imul(Pt, H) | 0, i = i + Math.imul(Pt, J) | 0, i = i + Math.imul(bt, H) | 0, d = d + Math.imul(bt, J) | 0, l = l + Math.imul(qt, ht) | 0, i = i + Math.imul(qt, tt) | 0, i = i + Math.imul(_t, ht) | 0, d = d + Math.imul(_t, tt) | 0, l = l + Math.imul(zt, Ct) | 0, i = i + Math.imul(zt, at) | 0, i = i + Math.imul(Et, Ct) | 0, d = d + Math.imul(Et, at) | 0, l = l + Math.imul(St, b) | 0, i = i + Math.imul(St, C) | 0, i = i + Math.imul(pt, b) | 0, d = d + Math.imul(pt, C) | 0, l = l + Math.imul(V, w) | 0, i = i + Math.imul(V, A) | 0, i = i + Math.imul(ot, w) | 0, d = d + Math.imul(ot, A) | 0, l = l + Math.imul(O, R) | 0, i = i + Math.imul(O, L) | 0, i = i + Math.imul($, R) | 0, d = d + Math.imul($, L) | 0;
      var re = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (re >>> 26) | 0, re &= 67108863, l = Math.imul(It, Dt), i = Math.imul(It, xt), i = i + Math.imul(Bt, Dt) | 0, d = Math.imul(Bt, xt), l = l + Math.imul(Lt, N) | 0, i = i + Math.imul(Lt, U) | 0, i = i + Math.imul(wt, N) | 0, d = d + Math.imul(wt, U) | 0, l = l + Math.imul(kt, H) | 0, i = i + Math.imul(kt, J) | 0, i = i + Math.imul(Mt, H) | 0, d = d + Math.imul(Mt, J) | 0, l = l + Math.imul(Pt, ht) | 0, i = i + Math.imul(Pt, tt) | 0, i = i + Math.imul(bt, ht) | 0, d = d + Math.imul(bt, tt) | 0, l = l + Math.imul(qt, Ct) | 0, i = i + Math.imul(qt, at) | 0, i = i + Math.imul(_t, Ct) | 0, d = d + Math.imul(_t, at) | 0, l = l + Math.imul(zt, b) | 0, i = i + Math.imul(zt, C) | 0, i = i + Math.imul(Et, b) | 0, d = d + Math.imul(Et, C) | 0, l = l + Math.imul(St, w) | 0, i = i + Math.imul(St, A) | 0, i = i + Math.imul(pt, w) | 0, d = d + Math.imul(pt, A) | 0, l = l + Math.imul(V, R) | 0, i = i + Math.imul(V, L) | 0, i = i + Math.imul(ot, R) | 0, d = d + Math.imul(ot, L) | 0;
      var ee = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (ee >>> 26) | 0, ee &= 67108863, l = Math.imul(It, N), i = Math.imul(It, U), i = i + Math.imul(Bt, N) | 0, d = Math.imul(Bt, U), l = l + Math.imul(Lt, H) | 0, i = i + Math.imul(Lt, J) | 0, i = i + Math.imul(wt, H) | 0, d = d + Math.imul(wt, J) | 0, l = l + Math.imul(kt, ht) | 0, i = i + Math.imul(kt, tt) | 0, i = i + Math.imul(Mt, ht) | 0, d = d + Math.imul(Mt, tt) | 0, l = l + Math.imul(Pt, Ct) | 0, i = i + Math.imul(Pt, at) | 0, i = i + Math.imul(bt, Ct) | 0, d = d + Math.imul(bt, at) | 0, l = l + Math.imul(qt, b) | 0, i = i + Math.imul(qt, C) | 0, i = i + Math.imul(_t, b) | 0, d = d + Math.imul(_t, C) | 0, l = l + Math.imul(zt, w) | 0, i = i + Math.imul(zt, A) | 0, i = i + Math.imul(Et, w) | 0, d = d + Math.imul(Et, A) | 0, l = l + Math.imul(St, R) | 0, i = i + Math.imul(St, L) | 0, i = i + Math.imul(pt, R) | 0, d = d + Math.imul(pt, L) | 0;
      var Yt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Yt >>> 26) | 0, Yt &= 67108863, l = Math.imul(It, H), i = Math.imul(It, J), i = i + Math.imul(Bt, H) | 0, d = Math.imul(Bt, J), l = l + Math.imul(Lt, ht) | 0, i = i + Math.imul(Lt, tt) | 0, i = i + Math.imul(wt, ht) | 0, d = d + Math.imul(wt, tt) | 0, l = l + Math.imul(kt, Ct) | 0, i = i + Math.imul(kt, at) | 0, i = i + Math.imul(Mt, Ct) | 0, d = d + Math.imul(Mt, at) | 0, l = l + Math.imul(Pt, b) | 0, i = i + Math.imul(Pt, C) | 0, i = i + Math.imul(bt, b) | 0, d = d + Math.imul(bt, C) | 0, l = l + Math.imul(qt, w) | 0, i = i + Math.imul(qt, A) | 0, i = i + Math.imul(_t, w) | 0, d = d + Math.imul(_t, A) | 0, l = l + Math.imul(zt, R) | 0, i = i + Math.imul(zt, L) | 0, i = i + Math.imul(Et, R) | 0, d = d + Math.imul(Et, L) | 0;
      var Gt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Gt >>> 26) | 0, Gt &= 67108863, l = Math.imul(It, ht), i = Math.imul(It, tt), i = i + Math.imul(Bt, ht) | 0, d = Math.imul(Bt, tt), l = l + Math.imul(Lt, Ct) | 0, i = i + Math.imul(Lt, at) | 0, i = i + Math.imul(wt, Ct) | 0, d = d + Math.imul(wt, at) | 0, l = l + Math.imul(kt, b) | 0, i = i + Math.imul(kt, C) | 0, i = i + Math.imul(Mt, b) | 0, d = d + Math.imul(Mt, C) | 0, l = l + Math.imul(Pt, w) | 0, i = i + Math.imul(Pt, A) | 0, i = i + Math.imul(bt, w) | 0, d = d + Math.imul(bt, A) | 0, l = l + Math.imul(qt, R) | 0, i = i + Math.imul(qt, L) | 0, i = i + Math.imul(_t, R) | 0, d = d + Math.imul(_t, L) | 0;
      var jt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863, l = Math.imul(It, Ct), i = Math.imul(It, at), i = i + Math.imul(Bt, Ct) | 0, d = Math.imul(Bt, at), l = l + Math.imul(Lt, b) | 0, i = i + Math.imul(Lt, C) | 0, i = i + Math.imul(wt, b) | 0, d = d + Math.imul(wt, C) | 0, l = l + Math.imul(kt, w) | 0, i = i + Math.imul(kt, A) | 0, i = i + Math.imul(Mt, w) | 0, d = d + Math.imul(Mt, A) | 0, l = l + Math.imul(Pt, R) | 0, i = i + Math.imul(Pt, L) | 0, i = i + Math.imul(bt, R) | 0, d = d + Math.imul(bt, L) | 0;
      var Ht = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Ht >>> 26) | 0, Ht &= 67108863, l = Math.imul(It, b), i = Math.imul(It, C), i = i + Math.imul(Bt, b) | 0, d = Math.imul(Bt, C), l = l + Math.imul(Lt, w) | 0, i = i + Math.imul(Lt, A) | 0, i = i + Math.imul(wt, w) | 0, d = d + Math.imul(wt, A) | 0, l = l + Math.imul(kt, R) | 0, i = i + Math.imul(kt, L) | 0, i = i + Math.imul(Mt, R) | 0, d = d + Math.imul(Mt, L) | 0;
      var Vt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Vt >>> 26) | 0, Vt &= 67108863, l = Math.imul(It, w), i = Math.imul(It, A), i = i + Math.imul(Bt, w) | 0, d = Math.imul(Bt, A), l = l + Math.imul(Lt, R) | 0, i = i + Math.imul(Lt, L) | 0, i = i + Math.imul(wt, R) | 0, d = d + Math.imul(wt, L) | 0;
      var Ot = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, l = Math.imul(It, R), i = Math.imul(It, L), i = i + Math.imul(Bt, R) | 0, d = Math.imul(Bt, L);
      var G = (p + l | 0) + ((i & 8191) << 13) | 0;
      return p = (d + (i >>> 13) | 0) + (G >>> 26) | 0, G &= 67108863, h[0] = lt, h[1] = Nt, h[2] = dt, h[3] = Jt, h[4] = Kt, h[5] = Xt, h[6] = Qt, h[7] = se, h[8] = oe, h[9] = te, h[10] = re, h[11] = ee, h[12] = Yt, h[13] = Gt, h[14] = jt, h[15] = Ht, h[16] = Vt, h[17] = Ot, h[18] = G, p !== 0 && (h[19] = p, c.length++), c;
    };
    Math.imul || (Y = P);
    function K(x, o, u) {
      u.negative = o.negative ^ x.negative, u.length = x.length + o.length;
      for (var c = 0, a = 0, s = 0; s < u.length - 1; s++) {
        var h = a;
        a = 0;
        for (var p = c & 67108863, l = Math.min(s, o.length - 1), i = Math.max(0, s - x.length + 1); i <= l; i++) {
          var d = s - i, M = x.words[d] | 0, m = o.words[i] | 0, v = M * m, B = v & 67108863;
          h = h + (v / 67108864 | 0) | 0, B = B + p | 0, p = B & 67108863, h = h + (B >>> 26) | 0, a += h >>> 26, h &= 67108863;
        }
        u.words[s] = p, c = h, h = a;
      }
      return c !== 0 ? u.words[s] = c : u.length--, u.strip();
    }
    function Z(x, o, u) {
      var c = new k();
      return c.mulp(x, o, u);
    }
    n.prototype.mulTo = function(o, u) {
      var c, a = this.length + o.length;
      return this.length === 10 && o.length === 10 ? c = Y(this, o, u) : a < 63 ? c = P(this, o, u) : a < 1024 ? c = K(this, o, u) : c = Z(this, o, u), c;
    };
    function k(x, o) {
      this.x = x, this.y = o;
    }
    k.prototype.makeRBT = function(o) {
      for (var u = new Array(o), c = n.prototype._countBits(o) - 1, a = 0; a < o; a++)
        u[a] = this.revBin(a, c, o);
      return u;
    }, k.prototype.revBin = function(o, u, c) {
      if (o === 0 || o === c - 1)
        return o;
      for (var a = 0, s = 0; s < u; s++)
        a |= (o & 1) << u - s - 1, o >>= 1;
      return a;
    }, k.prototype.permute = function(o, u, c, a, s, h) {
      for (var p = 0; p < h; p++)
        a[p] = u[o[p]], s[p] = c[o[p]];
    }, k.prototype.transform = function(o, u, c, a, s, h) {
      this.permute(h, o, u, c, a, s);
      for (var p = 1; p < s; p <<= 1)
        for (var l = p << 1, i = Math.cos(2 * Math.PI / l), d = Math.sin(2 * Math.PI / l), M = 0; M < s; M += l)
          for (var m = i, v = d, B = 0; B < p; B++) {
            var O = c[M + B], $ = a[M + B], ut = c[M + B + p], V = a[M + B + p], ot = m * ut - v * V;
            V = m * V + v * ut, ut = ot, c[M + B] = O + ut, a[M + B] = $ + V, c[M + B + p] = O - ut, a[M + B + p] = $ - V, B !== l && (ot = i * m - d * v, v = i * v + d * m, m = ot);
          }
    }, k.prototype.guessLen13b = function(o, u) {
      var c = Math.max(u, o) | 1, a = c & 1, s = 0;
      for (c = c / 2 | 0; c; c = c >>> 1)
        s++;
      return 1 << s + 1 + a;
    }, k.prototype.conjugate = function(o, u, c) {
      if (!(c <= 1))
        for (var a = 0; a < c / 2; a++) {
          var s = o[a];
          o[a] = o[c - a - 1], o[c - a - 1] = s, s = u[a], u[a] = -u[c - a - 1], u[c - a - 1] = -s;
        }
    }, k.prototype.normalize13b = function(o, u) {
      for (var c = 0, a = 0; a < u / 2; a++) {
        var s = Math.round(o[2 * a + 1] / u) * 8192 + Math.round(o[2 * a] / u) + c;
        o[a] = s & 67108863, s < 67108864 ? c = 0 : c = s / 67108864 | 0;
      }
      return o;
    }, k.prototype.convert13b = function(o, u, c, a) {
      for (var s = 0, h = 0; h < u; h++)
        s = s + (o[h] | 0), c[2 * h] = s & 8191, s = s >>> 13, c[2 * h + 1] = s & 8191, s = s >>> 13;
      for (h = 2 * u; h < a; ++h)
        c[h] = 0;
      e(s === 0), e((s & -8192) === 0);
    }, k.prototype.stub = function(o) {
      for (var u = new Array(o), c = 0; c < o; c++)
        u[c] = 0;
      return u;
    }, k.prototype.mulp = function(o, u, c) {
      var a = 2 * this.guessLen13b(o.length, u.length), s = this.makeRBT(a), h = this.stub(a), p = new Array(a), l = new Array(a), i = new Array(a), d = new Array(a), M = new Array(a), m = new Array(a), v = c.words;
      v.length = a, this.convert13b(o.words, o.length, p, a), this.convert13b(u.words, u.length, d, a), this.transform(p, h, l, i, a, s), this.transform(d, h, M, m, a, s);
      for (var B = 0; B < a; B++) {
        var O = l[B] * M[B] - i[B] * m[B];
        i[B] = l[B] * m[B] + i[B] * M[B], l[B] = O;
      }
      return this.conjugate(l, i, a), this.transform(l, i, v, h, a, s), this.conjugate(v, h, a), this.normalize13b(v, a), c.negative = o.negative ^ u.negative, c.length = o.length + u.length, c.strip();
    }, n.prototype.mul = function(o) {
      var u = new n(null);
      return u.words = new Array(this.length + o.length), this.mulTo(o, u);
    }, n.prototype.mulf = function(o) {
      var u = new n(null);
      return u.words = new Array(this.length + o.length), Z(this, o, u);
    }, n.prototype.imul = function(o) {
      return this.clone().mulTo(o, this);
    }, n.prototype.imuln = function(o) {
      e(typeof o == "number"), e(o < 67108864);
      for (var u = 0, c = 0; c < this.length; c++) {
        var a = (this.words[c] | 0) * o, s = (a & 67108863) + (u & 67108863);
        u >>= 26, u += a / 67108864 | 0, u += s >>> 26, this.words[c] = s & 67108863;
      }
      return u !== 0 && (this.words[c] = u, this.length++), this;
    }, n.prototype.muln = function(o) {
      return this.clone().imuln(o);
    }, n.prototype.sqr = function() {
      return this.mul(this);
    }, n.prototype.isqr = function() {
      return this.imul(this.clone());
    }, n.prototype.pow = function(o) {
      var u = F(o);
      if (u.length === 0)
        return new n(1);
      for (var c = this, a = 0; a < u.length && u[a] === 0; a++, c = c.sqr())
        ;
      if (++a < u.length)
        for (var s = c.sqr(); a < u.length; a++, s = s.sqr())
          u[a] !== 0 && (c = c.mul(s));
      return c;
    }, n.prototype.iushln = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = o % 26, c = (o - u) / 26, a = 67108863 >>> 26 - u << 26 - u, s;
      if (u !== 0) {
        var h = 0;
        for (s = 0; s < this.length; s++) {
          var p = this.words[s] & a, l = (this.words[s] | 0) - p << u;
          this.words[s] = l | h, h = p >>> 26 - u;
        }
        h && (this.words[s] = h, this.length++);
      }
      if (c !== 0) {
        for (s = this.length - 1; s >= 0; s--)
          this.words[s + c] = this.words[s];
        for (s = 0; s < c; s++)
          this.words[s] = 0;
        this.length += c;
      }
      return this.strip();
    }, n.prototype.ishln = function(o) {
      return e(this.negative === 0), this.iushln(o);
    }, n.prototype.iushrn = function(o, u, c) {
      e(typeof o == "number" && o >= 0);
      var a;
      u ? a = (u - u % 26) / 26 : a = 0;
      var s = o % 26, h = Math.min((o - s) / 26, this.length), p = 67108863 ^ 67108863 >>> s << s, l = c;
      if (a -= h, a = Math.max(0, a), l) {
        for (var i = 0; i < h; i++)
          l.words[i] = this.words[i];
        l.length = h;
      }
      if (h !== 0)
        if (this.length > h)
          for (this.length -= h, i = 0; i < this.length; i++)
            this.words[i] = this.words[i + h];
        else
          this.words[0] = 0, this.length = 1;
      var d = 0;
      for (i = this.length - 1; i >= 0 && (d !== 0 || i >= a); i--) {
        var M = this.words[i] | 0;
        this.words[i] = d << 26 - s | M >>> s, d = M & p;
      }
      return l && d !== 0 && (l.words[l.length++] = d), this.length === 0 && (this.words[0] = 0, this.length = 1), this.strip();
    }, n.prototype.ishrn = function(o, u, c) {
      return e(this.negative === 0), this.iushrn(o, u, c);
    }, n.prototype.shln = function(o) {
      return this.clone().ishln(o);
    }, n.prototype.ushln = function(o) {
      return this.clone().iushln(o);
    }, n.prototype.shrn = function(o) {
      return this.clone().ishrn(o);
    }, n.prototype.ushrn = function(o) {
      return this.clone().iushrn(o);
    }, n.prototype.testn = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = o % 26, c = (o - u) / 26, a = 1 << u;
      if (this.length <= c)
        return false;
      var s = this.words[c];
      return !!(s & a);
    }, n.prototype.imaskn = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = o % 26, c = (o - u) / 26;
      if (e(this.negative === 0, "imaskn works only with positive numbers"), this.length <= c)
        return this;
      if (u !== 0 && c++, this.length = Math.min(c, this.length), u !== 0) {
        var a = 67108863 ^ 67108863 >>> u << u;
        this.words[this.length - 1] &= a;
      }
      return this.strip();
    }, n.prototype.maskn = function(o) {
      return this.clone().imaskn(o);
    }, n.prototype.iaddn = function(o) {
      return e(typeof o == "number"), e(o < 67108864), o < 0 ? this.isubn(-o) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) < o ? (this.words[0] = o - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(o), this.negative = 1, this) : this._iaddn(o);
    }, n.prototype._iaddn = function(o) {
      this.words[0] += o;
      for (var u = 0; u < this.length && this.words[u] >= 67108864; u++)
        this.words[u] -= 67108864, u === this.length - 1 ? this.words[u + 1] = 1 : this.words[u + 1]++;
      return this.length = Math.max(this.length, u + 1), this;
    }, n.prototype.isubn = function(o) {
      if (e(typeof o == "number"), e(o < 67108864), o < 0)
        return this.iaddn(-o);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(o), this.negative = 1, this;
      if (this.words[0] -= o, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var u = 0; u < this.length && this.words[u] < 0; u++)
          this.words[u] += 67108864, this.words[u + 1] -= 1;
      return this.strip();
    }, n.prototype.addn = function(o) {
      return this.clone().iaddn(o);
    }, n.prototype.subn = function(o) {
      return this.clone().isubn(o);
    }, n.prototype.iabs = function() {
      return this.negative = 0, this;
    }, n.prototype.abs = function() {
      return this.clone().iabs();
    }, n.prototype._ishlnsubmul = function(o, u, c) {
      var a = o.length + c, s;
      this._expand(a);
      var h, p = 0;
      for (s = 0; s < o.length; s++) {
        h = (this.words[s + c] | 0) + p;
        var l = (o.words[s] | 0) * u;
        h -= l & 67108863, p = (h >> 26) - (l / 67108864 | 0), this.words[s + c] = h & 67108863;
      }
      for (; s < this.length - c; s++)
        h = (this.words[s + c] | 0) + p, p = h >> 26, this.words[s + c] = h & 67108863;
      if (p === 0)
        return this.strip();
      for (e(p === -1), p = 0, s = 0; s < this.length; s++)
        h = -(this.words[s] | 0) + p, p = h >> 26, this.words[s] = h & 67108863;
      return this.negative = 1, this.strip();
    }, n.prototype._wordDiv = function(o, u) {
      var c = this.length - o.length, a = this.clone(), s = o, h = s.words[s.length - 1] | 0, p = this._countBits(h);
      c = 26 - p, c !== 0 && (s = s.ushln(c), a.iushln(c), h = s.words[s.length - 1] | 0);
      var l = a.length - s.length, i;
      if (u !== "mod") {
        i = new n(null), i.length = l + 1, i.words = new Array(i.length);
        for (var d = 0; d < i.length; d++)
          i.words[d] = 0;
      }
      var M = a.clone()._ishlnsubmul(s, 1, l);
      M.negative === 0 && (a = M, i && (i.words[l] = 1));
      for (var m = l - 1; m >= 0; m--) {
        var v = (a.words[s.length + m] | 0) * 67108864 + (a.words[s.length + m - 1] | 0);
        for (v = Math.min(v / h | 0, 67108863), a._ishlnsubmul(s, v, m); a.negative !== 0; )
          v--, a.negative = 0, a._ishlnsubmul(s, 1, m), a.isZero() || (a.negative ^= 1);
        i && (i.words[m] = v);
      }
      return i && i.strip(), a.strip(), u !== "div" && c !== 0 && a.iushrn(c), { div: i || null, mod: a };
    }, n.prototype.divmod = function(o, u, c) {
      if (e(!o.isZero()), this.isZero())
        return { div: new n(0), mod: new n(0) };
      var a, s, h;
      return this.negative !== 0 && o.negative === 0 ? (h = this.neg().divmod(o, u), u !== "mod" && (a = h.div.neg()), u !== "div" && (s = h.mod.neg(), c && s.negative !== 0 && s.iadd(o)), { div: a, mod: s }) : this.negative === 0 && o.negative !== 0 ? (h = this.divmod(o.neg(), u), u !== "mod" && (a = h.div.neg()), { div: a, mod: h.mod }) : this.negative & o.negative ? (h = this.neg().divmod(o.neg(), u), u !== "div" && (s = h.mod.neg(), c && s.negative !== 0 && s.isub(o)), { div: h.div, mod: s }) : o.length > this.length || this.cmp(o) < 0 ? { div: new n(0), mod: this } : o.length === 1 ? u === "div" ? { div: this.divn(o.words[0]), mod: null } : u === "mod" ? { div: null, mod: new n(this.modn(o.words[0])) } : { div: this.divn(o.words[0]), mod: new n(this.modn(o.words[0])) } : this._wordDiv(o, u);
    }, n.prototype.div = function(o) {
      return this.divmod(o, "div", false).div;
    }, n.prototype.mod = function(o) {
      return this.divmod(o, "mod", false).mod;
    }, n.prototype.umod = function(o) {
      return this.divmod(o, "mod", true).mod;
    }, n.prototype.divRound = function(o) {
      var u = this.divmod(o);
      if (u.mod.isZero())
        return u.div;
      var c = u.div.negative !== 0 ? u.mod.isub(o) : u.mod, a = o.ushrn(1), s = o.andln(1), h = c.cmp(a);
      return h < 0 || s === 1 && h === 0 ? u.div : u.div.negative !== 0 ? u.div.isubn(1) : u.div.iaddn(1);
    }, n.prototype.modn = function(o) {
      e(o <= 67108863);
      for (var u = (1 << 26) % o, c = 0, a = this.length - 1; a >= 0; a--)
        c = (u * c + (this.words[a] | 0)) % o;
      return c;
    }, n.prototype.idivn = function(o) {
      e(o <= 67108863);
      for (var u = 0, c = this.length - 1; c >= 0; c--) {
        var a = (this.words[c] | 0) + u * 67108864;
        this.words[c] = a / o | 0, u = a % o;
      }
      return this.strip();
    }, n.prototype.divn = function(o) {
      return this.clone().idivn(o);
    }, n.prototype.egcd = function(o) {
      e(o.negative === 0), e(!o.isZero());
      var u = this, c = o.clone();
      u.negative !== 0 ? u = u.umod(o) : u = u.clone();
      for (var a = new n(1), s = new n(0), h = new n(0), p = new n(1), l = 0; u.isEven() && c.isEven(); )
        u.iushrn(1), c.iushrn(1), ++l;
      for (var i = c.clone(), d = u.clone(); !u.isZero(); ) {
        for (var M = 0, m = 1; !(u.words[0] & m) && M < 26; ++M, m <<= 1)
          ;
        if (M > 0)
          for (u.iushrn(M); M-- > 0; )
            (a.isOdd() || s.isOdd()) && (a.iadd(i), s.isub(d)), a.iushrn(1), s.iushrn(1);
        for (var v = 0, B = 1; !(c.words[0] & B) && v < 26; ++v, B <<= 1)
          ;
        if (v > 0)
          for (c.iushrn(v); v-- > 0; )
            (h.isOdd() || p.isOdd()) && (h.iadd(i), p.isub(d)), h.iushrn(1), p.iushrn(1);
        u.cmp(c) >= 0 ? (u.isub(c), a.isub(h), s.isub(p)) : (c.isub(u), h.isub(a), p.isub(s));
      }
      return { a: h, b: p, gcd: c.iushln(l) };
    }, n.prototype._invmp = function(o) {
      e(o.negative === 0), e(!o.isZero());
      var u = this, c = o.clone();
      u.negative !== 0 ? u = u.umod(o) : u = u.clone();
      for (var a = new n(1), s = new n(0), h = c.clone(); u.cmpn(1) > 0 && c.cmpn(1) > 0; ) {
        for (var p = 0, l = 1; !(u.words[0] & l) && p < 26; ++p, l <<= 1)
          ;
        if (p > 0)
          for (u.iushrn(p); p-- > 0; )
            a.isOdd() && a.iadd(h), a.iushrn(1);
        for (var i = 0, d = 1; !(c.words[0] & d) && i < 26; ++i, d <<= 1)
          ;
        if (i > 0)
          for (c.iushrn(i); i-- > 0; )
            s.isOdd() && s.iadd(h), s.iushrn(1);
        u.cmp(c) >= 0 ? (u.isub(c), a.isub(s)) : (c.isub(u), s.isub(a));
      }
      var M;
      return u.cmpn(1) === 0 ? M = a : M = s, M.cmpn(0) < 0 && M.iadd(o), M;
    }, n.prototype.gcd = function(o) {
      if (this.isZero())
        return o.abs();
      if (o.isZero())
        return this.abs();
      var u = this.clone(), c = o.clone();
      u.negative = 0, c.negative = 0;
      for (var a = 0; u.isEven() && c.isEven(); a++)
        u.iushrn(1), c.iushrn(1);
      do {
        for (; u.isEven(); )
          u.iushrn(1);
        for (; c.isEven(); )
          c.iushrn(1);
        var s = u.cmp(c);
        if (s < 0) {
          var h = u;
          u = c, c = h;
        } else if (s === 0 || c.cmpn(1) === 0)
          break;
        u.isub(c);
      } while (true);
      return c.iushln(a);
    }, n.prototype.invm = function(o) {
      return this.egcd(o).a.umod(o);
    }, n.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, n.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, n.prototype.andln = function(o) {
      return this.words[0] & o;
    }, n.prototype.bincn = function(o) {
      e(typeof o == "number");
      var u = o % 26, c = (o - u) / 26, a = 1 << u;
      if (this.length <= c)
        return this._expand(c + 1), this.words[c] |= a, this;
      for (var s = a, h = c; s !== 0 && h < this.length; h++) {
        var p = this.words[h] | 0;
        p += s, s = p >>> 26, p &= 67108863, this.words[h] = p;
      }
      return s !== 0 && (this.words[h] = s, this.length++), this;
    }, n.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, n.prototype.cmpn = function(o) {
      var u = o < 0;
      if (this.negative !== 0 && !u)
        return -1;
      if (this.negative === 0 && u)
        return 1;
      this.strip();
      var c;
      if (this.length > 1)
        c = 1;
      else {
        u && (o = -o), e(o <= 67108863, "Number is too big");
        var a = this.words[0] | 0;
        c = a === o ? 0 : a < o ? -1 : 1;
      }
      return this.negative !== 0 ? -c | 0 : c;
    }, n.prototype.cmp = function(o) {
      if (this.negative !== 0 && o.negative === 0)
        return -1;
      if (this.negative === 0 && o.negative !== 0)
        return 1;
      var u = this.ucmp(o);
      return this.negative !== 0 ? -u | 0 : u;
    }, n.prototype.ucmp = function(o) {
      if (this.length > o.length)
        return 1;
      if (this.length < o.length)
        return -1;
      for (var u = 0, c = this.length - 1; c >= 0; c--) {
        var a = this.words[c] | 0, s = o.words[c] | 0;
        if (a !== s) {
          a < s ? u = -1 : a > s && (u = 1);
          break;
        }
      }
      return u;
    }, n.prototype.gtn = function(o) {
      return this.cmpn(o) === 1;
    }, n.prototype.gt = function(o) {
      return this.cmp(o) === 1;
    }, n.prototype.gten = function(o) {
      return this.cmpn(o) >= 0;
    }, n.prototype.gte = function(o) {
      return this.cmp(o) >= 0;
    }, n.prototype.ltn = function(o) {
      return this.cmpn(o) === -1;
    }, n.prototype.lt = function(o) {
      return this.cmp(o) === -1;
    }, n.prototype.lten = function(o) {
      return this.cmpn(o) <= 0;
    }, n.prototype.lte = function(o) {
      return this.cmp(o) <= 0;
    }, n.prototype.eqn = function(o) {
      return this.cmpn(o) === 0;
    }, n.prototype.eq = function(o) {
      return this.cmp(o) === 0;
    }, n.red = function(o) {
      return new Q(o);
    }, n.prototype.toRed = function(o) {
      return e(!this.red, "Already a number in reduction context"), e(this.negative === 0, "red works only with positives"), o.convertTo(this)._forceRed(o);
    }, n.prototype.fromRed = function() {
      return e(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, n.prototype._forceRed = function(o) {
      return this.red = o, this;
    }, n.prototype.forceRed = function(o) {
      return e(!this.red, "Already a number in reduction context"), this._forceRed(o);
    }, n.prototype.redAdd = function(o) {
      return e(this.red, "redAdd works only with red numbers"), this.red.add(this, o);
    }, n.prototype.redIAdd = function(o) {
      return e(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, o);
    }, n.prototype.redSub = function(o) {
      return e(this.red, "redSub works only with red numbers"), this.red.sub(this, o);
    }, n.prototype.redISub = function(o) {
      return e(this.red, "redISub works only with red numbers"), this.red.isub(this, o);
    }, n.prototype.redShl = function(o) {
      return e(this.red, "redShl works only with red numbers"), this.red.shl(this, o);
    }, n.prototype.redMul = function(o) {
      return e(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.mul(this, o);
    }, n.prototype.redIMul = function(o) {
      return e(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.imul(this, o);
    }, n.prototype.redSqr = function() {
      return e(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, n.prototype.redISqr = function() {
      return e(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, n.prototype.redSqrt = function() {
      return e(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, n.prototype.redInvm = function() {
      return e(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, n.prototype.redNeg = function() {
      return e(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, n.prototype.redPow = function(o) {
      return e(this.red && !o.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, o);
    };
    var Tt = { k256: null, p224: null, p192: null, p25519: null };
    function it(x, o) {
      this.name = x, this.p = new n(o, 16), this.n = this.p.bitLength(), this.k = new n(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    it.prototype._tmp = function() {
      var o = new n(null);
      return o.words = new Array(Math.ceil(this.n / 13)), o;
    }, it.prototype.ireduce = function(o) {
      var u = o, c;
      do
        this.split(u, this.tmp), u = this.imulK(u), u = u.iadd(this.tmp), c = u.bitLength();
      while (c > this.n);
      var a = c < this.n ? -1 : u.ucmp(this.p);
      return a === 0 ? (u.words[0] = 0, u.length = 1) : a > 0 ? u.isub(this.p) : u.strip(), u;
    }, it.prototype.split = function(o, u) {
      o.iushrn(this.n, 0, u);
    }, it.prototype.imulK = function(o) {
      return o.imul(this.k);
    };
    function q() {
      it.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    f(q, it), q.prototype.split = function(o, u) {
      for (var c = 4194303, a = Math.min(o.length, 9), s = 0; s < a; s++)
        u.words[s] = o.words[s];
      if (u.length = a, o.length <= 9) {
        o.words[0] = 0, o.length = 1;
        return;
      }
      var h = o.words[9];
      for (u.words[u.length++] = h & c, s = 10; s < o.length; s++) {
        var p = o.words[s] | 0;
        o.words[s - 10] = (p & c) << 4 | h >>> 22, h = p;
      }
      h >>>= 22, o.words[s - 10] = h, h === 0 && o.length > 10 ? o.length -= 10 : o.length -= 9;
    }, q.prototype.imulK = function(o) {
      o.words[o.length] = 0, o.words[o.length + 1] = 0, o.length += 2;
      for (var u = 0, c = 0; c < o.length; c++) {
        var a = o.words[c] | 0;
        u += a * 977, o.words[c] = u & 67108863, u = a * 64 + (u / 67108864 | 0);
      }
      return o.words[o.length - 1] === 0 && (o.length--, o.words[o.length - 1] === 0 && o.length--), o;
    };
    function j() {
      it.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    f(j, it);
    function nt() {
      it.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    f(nt, it);
    function ft() {
      it.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    f(ft, it), ft.prototype.imulK = function(o) {
      for (var u = 0, c = 0; c < o.length; c++) {
        var a = (o.words[c] | 0) * 19 + u, s = a & 67108863;
        a >>>= 26, o.words[c] = s, u = a;
      }
      return u !== 0 && (o.words[o.length++] = u), o;
    }, n._prime = function(o) {
      if (Tt[o])
        return Tt[o];
      var u;
      if (o === "k256")
        u = new q();
      else if (o === "p224")
        u = new j();
      else if (o === "p192")
        u = new nt();
      else if (o === "p25519")
        u = new ft();
      else
        throw new Error("Unknown prime " + o);
      return Tt[o] = u, u;
    };
    function Q(x) {
      if (typeof x == "string") {
        var o = n._prime(x);
        this.m = o.p, this.prime = o;
      } else
        e(x.gtn(1), "modulus must be greater than 1"), this.m = x, this.prime = null;
    }
    Q.prototype._verify1 = function(o) {
      e(o.negative === 0, "red works only with positives"), e(o.red, "red works only with red numbers");
    }, Q.prototype._verify2 = function(o, u) {
      e((o.negative | u.negative) === 0, "red works only with positives"), e(o.red && o.red === u.red, "red works only with red numbers");
    }, Q.prototype.imod = function(o) {
      return this.prime ? this.prime.ireduce(o)._forceRed(this) : o.umod(this.m)._forceRed(this);
    }, Q.prototype.neg = function(o) {
      return o.isZero() ? o.clone() : this.m.sub(o)._forceRed(this);
    }, Q.prototype.add = function(o, u) {
      this._verify2(o, u);
      var c = o.add(u);
      return c.cmp(this.m) >= 0 && c.isub(this.m), c._forceRed(this);
    }, Q.prototype.iadd = function(o, u) {
      this._verify2(o, u);
      var c = o.iadd(u);
      return c.cmp(this.m) >= 0 && c.isub(this.m), c;
    }, Q.prototype.sub = function(o, u) {
      this._verify2(o, u);
      var c = o.sub(u);
      return c.cmpn(0) < 0 && c.iadd(this.m), c._forceRed(this);
    }, Q.prototype.isub = function(o, u) {
      this._verify2(o, u);
      var c = o.isub(u);
      return c.cmpn(0) < 0 && c.iadd(this.m), c;
    }, Q.prototype.shl = function(o, u) {
      return this._verify1(o), this.imod(o.ushln(u));
    }, Q.prototype.imul = function(o, u) {
      return this._verify2(o, u), this.imod(o.imul(u));
    }, Q.prototype.mul = function(o, u) {
      return this._verify2(o, u), this.imod(o.mul(u));
    }, Q.prototype.isqr = function(o) {
      return this.imul(o, o.clone());
    }, Q.prototype.sqr = function(o) {
      return this.mul(o, o);
    }, Q.prototype.sqrt = function(o) {
      if (o.isZero())
        return o.clone();
      var u = this.m.andln(3);
      if (e(u % 2 === 1), u === 3) {
        var c = this.m.add(new n(1)).iushrn(2);
        return this.pow(o, c);
      }
      for (var a = this.m.subn(1), s = 0; !a.isZero() && a.andln(1) === 0; )
        s++, a.iushrn(1);
      e(!a.isZero());
      var h = new n(1).toRed(this), p = h.redNeg(), l = this.m.subn(1).iushrn(1), i = this.m.bitLength();
      for (i = new n(2 * i * i).toRed(this); this.pow(i, l).cmp(p) !== 0; )
        i.redIAdd(p);
      for (var d = this.pow(i, a), M = this.pow(o, a.addn(1).iushrn(1)), m = this.pow(o, a), v = s; m.cmp(h) !== 0; ) {
        for (var B = m, O = 0; B.cmp(h) !== 0; O++)
          B = B.redSqr();
        e(O < v);
        var $ = this.pow(d, new n(1).iushln(v - O - 1));
        M = M.redMul($), d = $.redSqr(), m = m.redMul(d), v = O;
      }
      return M;
    }, Q.prototype.invm = function(o) {
      var u = o._invmp(this.m);
      return u.negative !== 0 ? (u.negative = 0, this.imod(u).redNeg()) : this.imod(u);
    }, Q.prototype.pow = function(o, u) {
      if (u.isZero())
        return new n(1);
      if (u.cmpn(1) === 0)
        return o.clone();
      var c = 4, a = new Array(1 << c);
      a[0] = new n(1).toRed(this), a[1] = o;
      for (var s = 2; s < a.length; s++)
        a[s] = this.mul(a[s - 1], o);
      var h = a[0], p = 0, l = 0, i = u.bitLength() % 26;
      for (i === 0 && (i = 26), s = u.length - 1; s >= 0; s--) {
        for (var d = u.words[s], M = i - 1; M >= 0; M--) {
          var m = d >> M & 1;
          if (h !== a[0] && (h = this.sqr(h)), m === 0 && p === 0) {
            l = 0;
            continue;
          }
          p <<= 1, p |= m, l++, !(l !== c && (s !== 0 || M !== 0)) && (h = this.mul(h, a[p]), l = 0, p = 0);
        }
        i = 26;
      }
      return h;
    }, Q.prototype.convertTo = function(o) {
      var u = o.umod(this.m);
      return u === o ? u.clone() : u;
    }, Q.prototype.convertFrom = function(o) {
      var u = o.clone();
      return u.red = null, u;
    }, n.mont = function(o) {
      return new $t(o);
    };
    function $t(x) {
      Q.call(this, x), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new n(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    f($t, Q), $t.prototype.convertTo = function(o) {
      return this.imod(o.ushln(this.shift));
    }, $t.prototype.convertFrom = function(o) {
      var u = this.imod(o.mul(this.rinv));
      return u.red = null, u;
    }, $t.prototype.imul = function(o, u) {
      if (o.isZero() || u.isZero())
        return o.words[0] = 0, o.length = 1, o;
      var c = o.imul(u), a = c.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), s = c.isub(a).iushrn(this.shift), h = s;
      return s.cmp(this.m) >= 0 ? h = s.isub(this.m) : s.cmpn(0) < 0 && (h = s.iadd(this.m)), h._forceRed(this);
    }, $t.prototype.mul = function(o, u) {
      if (o.isZero() || u.isZero())
        return new n(0)._forceRed(this);
      var c = o.mul(u), a = c.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), s = c.isub(a).iushrn(this.shift), h = s;
      return s.cmp(this.m) >= 0 ? h = s.isub(this.m) : s.cmpn(0) < 0 && (h = s.iadd(this.m)), h._forceRed(this);
    }, $t.prototype.invm = function(o) {
      var u = this.imod(o._invmp(this.m).mul(this.r2));
      return u._forceRed(this);
    };
  })(typeof la == "undefined" || la, xl);
});
function Ml(r3, t, e, f) {
  let n, g, y, _ = t || [0], E = (e = e || 0) >>> 3, S = f === -1 ? 3 : 0;
  for (n = 0; n < r3.length; n += 1)
    y = n + E, g = y >>> 2, _.length <= g && _.push(0), _[g] |= r3[n] << 8 * (S + f * (y % 4));
  return { value: _, binLen: 8 * r3.length + e };
}
function ji(r3, t, e) {
  switch (t) {
    case "UTF8":
    case "UTF16BE":
    case "UTF16LE":
      break;
    default:
      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
  }
  switch (r3) {
    case "HEX":
      return function(f, n, g) {
        return function(y, _, E, S) {
          let I, F, P, Y;
          if (y.length % 2 != 0)
            throw new Error("String of HEX type must be in byte increments");
          let K = _ || [0], Z = (E = E || 0) >>> 3, k = S === -1 ? 3 : 0;
          for (I = 0; I < y.length; I += 2) {
            if (F = parseInt(y.substr(I, 2), 16), isNaN(F))
              throw new Error("String of HEX type contains invalid characters");
            for (Y = (I >>> 1) + Z, P = Y >>> 2; K.length <= P; )
              K.push(0);
            K[P] |= F << 8 * (k + S * (Y % 4));
          }
          return { value: K, binLen: 4 * y.length + E };
        }(f, n, g, e);
      };
    case "TEXT":
      return function(f, n, g) {
        return function(y, _, E, S, I) {
          let F, P, Y, K, Z, k, Tt, it, q = 0, j = E || [0], nt = (S = S || 0) >>> 3;
          if (_ === "UTF8")
            for (Tt = I === -1 ? 3 : 0, Y = 0; Y < y.length; Y += 1)
              for (F = y.charCodeAt(Y), P = [], 128 > F ? P.push(F) : 2048 > F ? (P.push(192 | F >>> 6), P.push(128 | 63 & F)) : 55296 > F || 57344 <= F ? P.push(224 | F >>> 12, 128 | F >>> 6 & 63, 128 | 63 & F) : (Y += 1, F = 65536 + ((1023 & F) << 10 | 1023 & y.charCodeAt(Y)), P.push(240 | F >>> 18, 128 | F >>> 12 & 63, 128 | F >>> 6 & 63, 128 | 63 & F)), K = 0; K < P.length; K += 1) {
                for (k = q + nt, Z = k >>> 2; j.length <= Z; )
                  j.push(0);
                j[Z] |= P[K] << 8 * (Tt + I * (k % 4)), q += 1;
              }
          else
            for (Tt = I === -1 ? 2 : 0, it = _ === "UTF16LE" && I !== 1 || _ !== "UTF16LE" && I === 1, Y = 0; Y < y.length; Y += 1) {
              for (F = y.charCodeAt(Y), it === true && (K = 255 & F, F = K << 8 | F >>> 8), k = q + nt, Z = k >>> 2; j.length <= Z; )
                j.push(0);
              j[Z] |= F << 8 * (Tt + I * (k % 4)), q += 2;
            }
          return { value: j, binLen: 8 * q + S };
        }(f, t, n, g, e);
      };
    case "B64":
      return function(f, n, g) {
        return function(y, _, E, S) {
          let I, F, P, Y, K, Z, k, Tt = 0, it = _ || [0], q = (E = E || 0) >>> 3, j = S === -1 ? 3 : 0, nt = y.indexOf("=");
          if (y.search(/^[a-zA-Z0-9=+/]+$/) === -1)
            throw new Error("Invalid character in base-64 string");
          if (y = y.replace(/=/g, ""), nt !== -1 && nt < y.length)
            throw new Error("Invalid '=' found in base-64 string");
          for (F = 0; F < y.length; F += 4) {
            for (K = y.substr(F, 4), Y = 0, P = 0; P < K.length; P += 1)
              I = Il.indexOf(K.charAt(P)), Y |= I << 18 - 6 * P;
            for (P = 0; P < K.length - 1; P += 1) {
              for (k = Tt + q, Z = k >>> 2; it.length <= Z; )
                it.push(0);
              it[Z] |= (Y >>> 16 - 8 * P & 255) << 8 * (j + S * (k % 4)), Tt += 1;
            }
          }
          return { value: it, binLen: 8 * Tt + E };
        }(f, n, g, e);
      };
    case "BYTES":
      return function(f, n, g) {
        return function(y, _, E, S) {
          let I, F, P, Y, K = _ || [0], Z = (E = E || 0) >>> 3, k = S === -1 ? 3 : 0;
          for (F = 0; F < y.length; F += 1)
            I = y.charCodeAt(F), Y = F + Z, P = Y >>> 2, K.length <= P && K.push(0), K[P] |= I << 8 * (k + S * (Y % 4));
          return { value: K, binLen: 8 * y.length + E };
        }(f, n, g, e);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (f) {
        throw new Error(Nl);
      }
      return function(f, n, g) {
        return function(y, _, E, S) {
          return Ml(new Uint8Array(y), _, E, S);
        }(f, n, g, e);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (f) {
        throw new Error(Ul);
      }
      return function(f, n, g) {
        return Ml(f, n, g, e);
      };
    default:
      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
}
function bl(r3, t, e, f) {
  switch (r3) {
    case "HEX":
      return function(n) {
        return function(g, y, _, E) {
          let S = "0123456789abcdef", I, F, P = "", Y = y / 8, K = _ === -1 ? 3 : 0;
          for (I = 0; I < Y; I += 1)
            F = g[I >>> 2] >>> 8 * (K + _ * (I % 4)), P += S.charAt(F >>> 4 & 15) + S.charAt(15 & F);
          return E.outputUpper ? P.toUpperCase() : P;
        }(n, t, e, f);
      };
    case "B64":
      return function(n) {
        return function(g, y, _, E) {
          let S, I, F, P, Y, K = "", Z = y / 8, k = _ === -1 ? 3 : 0;
          for (S = 0; S < Z; S += 3)
            for (P = S + 1 < Z ? g[S + 1 >>> 2] : 0, Y = S + 2 < Z ? g[S + 2 >>> 2] : 0, F = (g[S >>> 2] >>> 8 * (k + _ * (S % 4)) & 255) << 16 | (P >>> 8 * (k + _ * ((S + 1) % 4)) & 255) << 8 | Y >>> 8 * (k + _ * ((S + 2) % 4)) & 255, I = 0; I < 4; I += 1)
              K += 8 * S + 6 * I <= y ? Il.charAt(F >>> 6 * (3 - I) & 63) : E.b64Pad;
          return K;
        }(n, t, e, f);
      };
    case "BYTES":
      return function(n) {
        return function(g, y, _) {
          let E, S, I = "", F = y / 8, P = _ === -1 ? 3 : 0;
          for (E = 0; E < F; E += 1)
            S = g[E >>> 2] >>> 8 * (P + _ * (E % 4)) & 255, I += String.fromCharCode(S);
          return I;
        }(n, t, e);
      };
    case "ARRAYBUFFER":
      try {
        new ArrayBuffer(0);
      } catch (n) {
        throw new Error(Nl);
      }
      return function(n) {
        return function(g, y, _) {
          let E, S = y / 8, I = new ArrayBuffer(S), F = new Uint8Array(I), P = _ === -1 ? 3 : 0;
          for (E = 0; E < S; E += 1)
            F[E] = g[E >>> 2] >>> 8 * (P + _ * (E % 4)) & 255;
          return I;
        }(n, t, e);
      };
    case "UINT8ARRAY":
      try {
        new Uint8Array(0);
      } catch (n) {
        throw new Error(Ul);
      }
      return function(n) {
        return function(g, y, _) {
          let E, S = y / 8, I = _ === -1 ? 3 : 0, F = new Uint8Array(S);
          for (E = 0; E < S; E += 1)
            F[E] = g[E >>> 2] >>> 8 * (I + _ * (E % 4)) & 255;
          return F;
        }(n, t, e);
      };
    default:
      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
  }
}
function To(r3, t) {
  let e, f, n = r3.binLen >>> 3, g = t.binLen >>> 3, y = n << 3, _ = 4 - n << 3;
  if (n % 4 != 0) {
    for (e = 0; e < g; e += 4)
      f = n + e >>> 2, r3.value[f] |= t.value[e >>> 2] << y, r3.value.push(0), r3.value[f + 1] |= t.value[e >>> 2] >>> _;
    return (r3.value.length << 2) - 4 >= g + n && r3.value.pop(), { value: r3.value, binLen: r3.binLen + t.binLen };
  }
  return { value: r3.value.concat(t.value), binLen: r3.binLen + t.binLen };
}
function Al(r3) {
  let t = { outputUpper: false, b64Pad: "=", outputLen: -1 }, e = r3 || {}, f = "Output length must be a multiple of 8";
  if (t.outputUpper = e.outputUpper || false, e.b64Pad && (t.b64Pad = e.b64Pad), e.outputLen) {
    if (e.outputLen % 8 != 0)
      throw new Error(f);
    t.outputLen = e.outputLen;
  } else if (e.shakeLen) {
    if (e.shakeLen % 8 != 0)
      throw new Error(f);
    t.outputLen = e.shakeLen;
  }
  if (typeof t.outputUpper != "boolean")
    throw new Error("Invalid outputUpper formatting option");
  if (typeof t.b64Pad != "string")
    throw new Error("Invalid b64Pad formatting option");
  return t;
}
function Gr(r3, t, e, f) {
  let n = r3 + " must include a value and format";
  if (!t) {
    if (!f)
      throw new Error(n);
    return f;
  }
  if (t.value === void 0 || !t.format)
    throw new Error(n);
  return ji(t.format, t.encoding || "UTF8", e)(t.value);
}
function Wi(r3, t) {
  return r3 << t | r3 >>> 32 - t;
}
function Cr(r3, t) {
  return r3 >>> t | r3 << 32 - t;
}
function Pl(r3, t) {
  return r3 >>> t;
}
function _l(r3, t, e) {
  return r3 ^ t ^ e;
}
function Dl(r3, t, e) {
  return r3 & t ^ ~r3 & e;
}
function Ol(r3, t, e) {
  return r3 & t ^ r3 & e ^ t & e;
}
function h1(r3) {
  return Cr(r3, 2) ^ Cr(r3, 13) ^ Cr(r3, 22);
}
function er(r3, t) {
  let e = (65535 & r3) + (65535 & t);
  return (65535 & (r3 >>> 16) + (t >>> 16) + (e >>> 16)) << 16 | 65535 & e;
}
function l1(r3, t, e, f) {
  let n = (65535 & r3) + (65535 & t) + (65535 & e) + (65535 & f);
  return (65535 & (r3 >>> 16) + (t >>> 16) + (e >>> 16) + (f >>> 16) + (n >>> 16)) << 16 | 65535 & n;
}
function Mn(r3, t, e, f, n) {
  let g = (65535 & r3) + (65535 & t) + (65535 & e) + (65535 & f) + (65535 & n);
  return (65535 & (r3 >>> 16) + (t >>> 16) + (e >>> 16) + (f >>> 16) + (n >>> 16) + (g >>> 16)) << 16 | 65535 & g;
}
function u1(r3) {
  return Cr(r3, 7) ^ Cr(r3, 18) ^ Pl(r3, 3);
}
function c1(r3) {
  return Cr(r3, 6) ^ Cr(r3, 11) ^ Cr(r3, 25);
}
function d1(r3) {
  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
}
function kl(r3, t) {
  let e, f, n, g, y, _, E, S = [];
  for (e = t[0], f = t[1], n = t[2], g = t[3], y = t[4], E = 0; E < 80; E += 1)
    S[E] = E < 16 ? r3[E] : Wi(S[E - 3] ^ S[E - 8] ^ S[E - 14] ^ S[E - 16], 1), _ = E < 20 ? Mn(Wi(e, 5), Dl(f, n, g), y, 1518500249, S[E]) : E < 40 ? Mn(Wi(e, 5), _l(f, n, g), y, 1859775393, S[E]) : E < 60 ? Mn(Wi(e, 5), Ol(f, n, g), y, 2400959708, S[E]) : Mn(Wi(e, 5), _l(f, n, g), y, 3395469782, S[E]), y = g, g = n, n = Wi(f, 30), f = e, e = _;
  return t[0] = er(e, t[0]), t[1] = er(f, t[1]), t[2] = er(n, t[2]), t[3] = er(g, t[3]), t[4] = er(y, t[4]), t;
}
function p1(r3, t, e, f) {
  let n, g = 15 + (t + 65 >>> 9 << 4), y = t + e;
  for (; r3.length <= g; )
    r3.push(0);
  for (r3[t >>> 5] |= 128 << 24 - t % 32, r3[g] = 4294967295 & y, r3[g - 1] = y / bn | 0, n = 0; n < r3.length; n += 16)
    f = kl(r3.slice(n, n + 16), f);
  return f;
}
function El(r3) {
  let t;
  return t = r3 == "SHA-224" ? Dr.slice() : Or.slice(), t;
}
function Cl(r3, t) {
  let e, f, n, g, y, _, E, S, I, F, P, Y = [];
  for (e = t[0], f = t[1], n = t[2], g = t[3], y = t[4], _ = t[5], E = t[6], S = t[7], P = 0; P < 64; P += 1)
    Y[P] = P < 16 ? r3[P] : l1(Cr(K = Y[P - 2], 17) ^ Cr(K, 19) ^ Pl(K, 10), Y[P - 7], u1(Y[P - 15]), Y[P - 16]), I = Mn(S, c1(y), Dl(y, _, E), ie[P], Y[P]), F = er(h1(e), Ol(e, f, n)), S = E, E = _, _ = y, y = er(g, I), g = n, n = f, f = e, e = er(I, F);
  var K;
  return t[0] = er(e, t[0]), t[1] = er(f, t[1]), t[2] = er(n, t[2]), t[3] = er(g, t[3]), t[4] = er(y, t[4]), t[5] = er(_, t[5]), t[6] = er(E, t[6]), t[7] = er(S, t[7]), t;
}
function Bl(r3, t) {
  let e;
  return t > 32 ? (e = 64 - t, new rt(r3.I << t | r3.N >>> e, r3.N << t | r3.I >>> e)) : t !== 0 ? (e = 32 - t, new rt(r3.N << t | r3.I >>> e, r3.I << t | r3.N >>> e)) : r3;
}
function Br(r3, t) {
  let e;
  return t < 32 ? (e = 32 - t, new rt(r3.N >>> t | r3.I << e, r3.I >>> t | r3.N << e)) : (e = 64 - t, new rt(r3.I >>> t | r3.N << e, r3.N >>> t | r3.I << e));
}
function Ll(r3, t) {
  return new rt(r3.N >>> t, r3.I >>> t | r3.N << 32 - t);
}
function v1(r3, t, e) {
  return new rt(r3.N & t.N ^ r3.N & e.N ^ t.N & e.N, r3.I & t.I ^ r3.I & e.I ^ t.I & e.I);
}
function y1(r3) {
  let t = Br(r3, 28), e = Br(r3, 34), f = Br(r3, 39);
  return new rt(t.N ^ e.N ^ f.N, t.I ^ e.I ^ f.I);
}
function mr(r3, t) {
  let e, f;
  e = (65535 & r3.I) + (65535 & t.I), f = (r3.I >>> 16) + (t.I >>> 16) + (e >>> 16);
  let n = (65535 & f) << 16 | 65535 & e;
  return e = (65535 & r3.N) + (65535 & t.N) + (f >>> 16), f = (r3.N >>> 16) + (t.N >>> 16) + (e >>> 16), new rt((65535 & f) << 16 | 65535 & e, n);
}
function w1(r3, t, e, f) {
  let n, g;
  n = (65535 & r3.I) + (65535 & t.I) + (65535 & e.I) + (65535 & f.I), g = (r3.I >>> 16) + (t.I >>> 16) + (e.I >>> 16) + (f.I >>> 16) + (n >>> 16);
  let y = (65535 & g) << 16 | 65535 & n;
  return n = (65535 & r3.N) + (65535 & t.N) + (65535 & e.N) + (65535 & f.N) + (g >>> 16), g = (r3.N >>> 16) + (t.N >>> 16) + (e.N >>> 16) + (f.N >>> 16) + (n >>> 16), new rt((65535 & g) << 16 | 65535 & n, y);
}
function x1(r3, t, e, f, n) {
  let g, y;
  g = (65535 & r3.I) + (65535 & t.I) + (65535 & e.I) + (65535 & f.I) + (65535 & n.I), y = (r3.I >>> 16) + (t.I >>> 16) + (e.I >>> 16) + (f.I >>> 16) + (n.I >>> 16) + (g >>> 16);
  let _ = (65535 & y) << 16 | 65535 & g;
  return g = (65535 & r3.N) + (65535 & t.N) + (65535 & e.N) + (65535 & f.N) + (65535 & n.N) + (y >>> 16), y = (r3.N >>> 16) + (t.N >>> 16) + (e.N >>> 16) + (f.N >>> 16) + (n.N >>> 16) + (g >>> 16), new rt((65535 & y) << 16 | 65535 & g, _);
}
function xn(r3, t) {
  return new rt(r3.N ^ t.N, r3.I ^ t.I);
}
function M1(r3) {
  let t = Br(r3, 19), e = Br(r3, 61), f = Ll(r3, 6);
  return new rt(t.N ^ e.N ^ f.N, t.I ^ e.I ^ f.I);
}
function b1(r3) {
  let t = Br(r3, 1), e = Br(r3, 8), f = Ll(r3, 7);
  return new rt(t.N ^ e.N ^ f.N, t.I ^ e.I ^ f.I);
}
function A1(r3) {
  let t = Br(r3, 14), e = Br(r3, 18), f = Br(r3, 41);
  return new rt(t.N ^ e.N ^ f.N, t.I ^ e.I ^ f.I);
}
function Sl(r3) {
  return r3 === "SHA-384" ? [new rt(3418070365, Dr[0]), new rt(1654270250, Dr[1]), new rt(2438529370, Dr[2]), new rt(355462360, Dr[3]), new rt(1731405415, Dr[4]), new rt(41048885895, Dr[5]), new rt(3675008525, Dr[6]), new rt(1203062813, Dr[7])] : [new rt(Or[0], 4089235720), new rt(Or[1], 2227873595), new rt(Or[2], 4271175723), new rt(Or[3], 1595750129), new rt(Or[4], 2917565137), new rt(Or[5], 725511199), new rt(Or[6], 4215389547), new rt(Or[7], 327033209)];
}
function Tl(r3, t) {
  let e, f, n, g, y, _, E, S, I, F, P, Y, K = [];
  for (e = t[0], f = t[1], n = t[2], g = t[3], y = t[4], _ = t[5], E = t[6], S = t[7], P = 0; P < 80; P += 1)
    P < 16 ? (Y = 2 * P, K[P] = new rt(r3[Y], r3[Y + 1])) : K[P] = w1(M1(K[P - 2]), K[P - 7], b1(K[P - 15]), K[P - 16]), I = x1(S, A1(y), (k = _, Tt = E, new rt((Z = y).N & k.N ^ ~Z.N & Tt.N, Z.I & k.I ^ ~Z.I & Tt.I)), _1[P], K[P]), F = mr(y1(e), v1(e, f, n)), S = E, E = _, _ = y, y = mr(g, I), g = n, n = f, f = e, e = mr(I, F);
  var Z, k, Tt;
  return t[0] = mr(e, t[0]), t[1] = mr(f, t[1]), t[2] = mr(n, t[2]), t[3] = mr(g, t[3]), t[4] = mr(y, t[4]), t[5] = mr(_, t[5]), t[6] = mr(E, t[6]), t[7] = mr(S, t[7]), t;
}
function ca(r3) {
  let t, e = [];
  for (t = 0; t < 5; t += 1)
    e[t] = [new rt(0, 0), new rt(0, 0), new rt(0, 0), new rt(0, 0), new rt(0, 0)];
  return e;
}
function S1(r3) {
  let t, e = [];
  for (t = 0; t < 5; t += 1)
    e[t] = r3[t].slice();
  return e;
}
function So(r3, t) {
  let e, f, n, g, y = [], _ = [];
  if (r3 !== null)
    for (f = 0; f < r3.length; f += 2)
      t[(f >>> 1) % 5][(f >>> 1) / 5 | 0] = xn(t[(f >>> 1) % 5][(f >>> 1) / 5 | 0], new rt(r3[f + 1], r3[f]));
  for (e = 0; e < 24; e += 1) {
    for (g = ca(), f = 0; f < 5; f += 1)
      y[f] = (E = t[f][0], S = t[f][1], I = t[f][2], F = t[f][3], P = t[f][4], new rt(E.N ^ S.N ^ I.N ^ F.N ^ P.N, E.I ^ S.I ^ I.I ^ F.I ^ P.I));
    for (f = 0; f < 5; f += 1)
      _[f] = xn(y[(f + 4) % 5], Bl(y[(f + 1) % 5], 1));
    for (f = 0; f < 5; f += 1)
      for (n = 0; n < 5; n += 1)
        t[f][n] = xn(t[f][n], _[f]);
    for (f = 0; f < 5; f += 1)
      for (n = 0; n < 5; n += 1)
        g[n][(2 * f + 3 * n) % 5] = Bl(t[f][n], B1[f][n]);
    for (f = 0; f < 5; f += 1)
      for (n = 0; n < 5; n += 1)
        t[f][n] = xn(g[f][n], new rt(~g[(f + 1) % 5][n].N & g[(f + 2) % 5][n].N, ~g[(f + 1) % 5][n].I & g[(f + 2) % 5][n].I));
    t[0][0] = xn(t[0][0], C1[e]);
  }
  var E, S, I, F, P;
  return t;
}
function ql(r3) {
  let t, e, f = 0, n = [0, 0], g = [4294967295 & r3, r3 / bn & 2097151];
  for (t = 6; t >= 0; t--)
    e = g[t >> 2] >>> 8 * t & 255, e === 0 && f === 0 || (n[f + 1 >> 2] |= e << 8 * (f + 1), f += 1);
  return f = f !== 0 ? f : 1, n[0] |= f, { value: f + 1 > 4 ? n : [n[0]], binLen: 8 + 8 * f };
}
function ua(r3) {
  return To(ql(r3.binLen), r3);
}
function Fl(r3, t) {
  let e, f = ql(t);
  f = To(f, r3);
  let n = t >>> 2, g = (n - f.value.length % n) % n;
  for (e = 0; e < g; e++)
    f.value.push(0);
  return f.value;
}
var Il, Nl, Ul, bn, ie, Dr, Or, An, Rl, zi, m1, g1, rt, _1, E1, C1, B1, T1, Fo, Wl = ri(() => {
  Il = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Nl = "ARRAYBUFFER not supported by this environment", Ul = "UINT8ARRAY not supported by this environment";
  bn = 4294967296, ie = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], Dr = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428], Or = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], An = "Chosen SHA variant is not supported", Rl = "Cannot set numRounds with MAC";
  zi = class {
    constructor(t, e, f) {
      let n = f || {};
      if (this.t = e, this.i = n.encoding || "UTF8", this.numRounds = n.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds)
        throw new Error("numRounds must a integer >= 1");
      this.o = t, this.h = [], this.u = 0, this.l = false, this.A = 0, this.H = false, this.S = [], this.p = [];
    }
    update(t) {
      let e, f = 0, n = this.m >>> 5, g = this.C(t, this.h, this.u), y = g.binLen, _ = g.value, E = y >>> 5;
      for (e = 0; e < E; e += n)
        f + this.m <= y && (this.U = this.v(_.slice(e, e + n), this.U), f += this.m);
      return this.A += f, this.h = _.slice(f >>> 5), this.u = y % this.m, this.l = true, this;
    }
    getHash(t, e) {
      let f, n, g = this.R, y = Al(e);
      if (this.K) {
        if (y.outputLen === -1)
          throw new Error("Output length must be specified in options");
        g = y.outputLen;
      }
      let _ = bl(t, g, this.T, y);
      if (this.H && this.g)
        return _(this.g(y));
      for (n = this.F(this.h.slice(), this.u, this.A, this.L(this.U), g), f = 1; f < this.numRounds; f += 1)
        this.K && g % 32 != 0 && (n[n.length - 1] &= 16777215 >>> 24 - g % 32), n = this.F(n, g, 0, this.B(this.o), g);
      return _(n);
    }
    setHMACKey(t, e, f) {
      if (!this.M)
        throw new Error("Variant does not support HMAC");
      if (this.l)
        throw new Error("Cannot set MAC key after calling update");
      let n = ji(e, (f || {}).encoding || "UTF8", this.T);
      this.k(n(t));
    }
    k(t) {
      let e = this.m >>> 3, f = e / 4 - 1, n;
      if (this.numRounds !== 1)
        throw new Error(Rl);
      if (this.H)
        throw new Error("MAC key already set");
      for (e < t.binLen / 8 && (t.value = this.F(t.value, t.binLen, 0, this.B(this.o), this.R)); t.value.length <= f; )
        t.value.push(0);
      for (n = 0; n <= f; n += 1)
        this.S[n] = 909522486 ^ t.value[n], this.p[n] = 1549556828 ^ t.value[n];
      this.U = this.v(this.S, this.U), this.A = this.m, this.H = true;
    }
    getHMAC(t, e) {
      let f = Al(e);
      return bl(t, this.R, this.T, f)(this.Y());
    }
    Y() {
      let t;
      if (!this.H)
        throw new Error("Cannot call getHMAC without first setting MAC key");
      let e = this.F(this.h.slice(), this.u, this.A, this.L(this.U), this.R);
      return t = this.v(this.p, this.B(this.o)), t = this.F(e, this.R, this.m, t, this.R), t;
    }
  };
  m1 = class extends zi {
    constructor(r3, t, e) {
      if (r3 !== "SHA-1")
        throw new Error(An);
      super(r3, t, e);
      let f = e || {};
      this.M = true, this.g = this.Y, this.T = -1, this.C = ji(this.t, this.i, this.T), this.v = kl, this.L = function(n) {
        return n.slice();
      }, this.B = d1, this.F = p1, this.U = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.R = 160, this.K = false, f.hmacKey && this.k(Gr("hmacKey", f.hmacKey, this.T));
    }
  };
  g1 = class extends zi {
    constructor(r3, t, e) {
      if (r3 !== "SHA-224" && r3 !== "SHA-256")
        throw new Error(An);
      super(r3, t, e);
      let f = e || {};
      this.g = this.Y, this.M = true, this.T = -1, this.C = ji(this.t, this.i, this.T), this.v = Cl, this.L = function(n) {
        return n.slice();
      }, this.B = El, this.F = function(n, g, y, _) {
        return function(E, S, I, F, P) {
          let Y, K, Z = 15 + (S + 65 >>> 9 << 4), k = S + I;
          for (; E.length <= Z; )
            E.push(0);
          for (E[S >>> 5] |= 128 << 24 - S % 32, E[Z] = 4294967295 & k, E[Z - 1] = k / bn | 0, Y = 0; Y < E.length; Y += 16)
            F = Cl(E.slice(Y, Y + 16), F);
          return K = P === "SHA-224" ? [F[0], F[1], F[2], F[3], F[4], F[5], F[6]] : F, K;
        }(n, g, y, _, r3);
      }, this.U = El(r3), this.m = 512, this.R = r3 === "SHA-224" ? 224 : 256, this.K = false, f.hmacKey && this.k(Gr("hmacKey", f.hmacKey, this.T));
    }
  }, rt = class {
    constructor(t, e) {
      this.N = t, this.I = e;
    }
  };
  _1 = [new rt(ie[0], 3609767458), new rt(ie[1], 602891725), new rt(ie[2], 3964484399), new rt(ie[3], 2173295548), new rt(ie[4], 4081628472), new rt(ie[5], 3053834265), new rt(ie[6], 2937671579), new rt(ie[7], 3664609560), new rt(ie[8], 2734883394), new rt(ie[9], 1164996542), new rt(ie[10], 1323610764), new rt(ie[11], 3590304994), new rt(ie[12], 4068182383), new rt(ie[13], 991336113), new rt(ie[14], 633803317), new rt(ie[15], 3479774868), new rt(ie[16], 2666613458), new rt(ie[17], 944711139), new rt(ie[18], 2341262773), new rt(ie[19], 2007800933), new rt(ie[20], 1495990901), new rt(ie[21], 1856431235), new rt(ie[22], 3175218132), new rt(ie[23], 2198950837), new rt(ie[24], 3999719339), new rt(ie[25], 766784016), new rt(ie[26], 2566594879), new rt(ie[27], 3203337956), new rt(ie[28], 1034457026), new rt(ie[29], 2466948901), new rt(ie[30], 3758326383), new rt(ie[31], 168717936), new rt(ie[32], 1188179964), new rt(ie[33], 1546045734), new rt(ie[34], 1522805485), new rt(ie[35], 2643833823), new rt(ie[36], 2343527390), new rt(ie[37], 1014477480), new rt(ie[38], 1206759142), new rt(ie[39], 344077627), new rt(ie[40], 1290863460), new rt(ie[41], 3158454273), new rt(ie[42], 3505952657), new rt(ie[43], 106217008), new rt(ie[44], 3606008344), new rt(ie[45], 1432725776), new rt(ie[46], 1467031594), new rt(ie[47], 851169720), new rt(ie[48], 3100823752), new rt(ie[49], 1363258195), new rt(ie[50], 3750685593), new rt(ie[51], 3785050280), new rt(ie[52], 3318307427), new rt(ie[53], 3812723403), new rt(ie[54], 2003034995), new rt(ie[55], 3602036899), new rt(ie[56], 1575990012), new rt(ie[57], 1125592928), new rt(ie[58], 2716904306), new rt(ie[59], 442776044), new rt(ie[60], 593698344), new rt(ie[61], 3733110249), new rt(ie[62], 2999351573), new rt(ie[63], 3815920427), new rt(3391569614, 3928383900), new rt(3515267271, 566280711), new rt(3940187606, 3454069534), new rt(4118630271, 4000239992), new rt(116418474, 1914138554), new rt(174292421, 2731055270), new rt(289380356, 3203993006), new rt(460393269, 320620315), new rt(685471733, 587496836), new rt(852142971, 1086792851), new rt(1017036298, 365543100), new rt(1126000580, 2618297676), new rt(1288033470, 3409855158), new rt(1501505948, 4234509866), new rt(1607167915, 987167468), new rt(1816402316, 1246189591)];
  E1 = class extends zi {
    constructor(r3, t, e) {
      if (r3 !== "SHA-384" && r3 !== "SHA-512")
        throw new Error(An);
      super(r3, t, e);
      let f = e || {};
      this.g = this.Y, this.M = true, this.T = -1, this.C = ji(this.t, this.i, this.T), this.v = Tl, this.L = function(n) {
        return n.slice();
      }, this.B = Sl, this.F = function(n, g, y, _) {
        return function(E, S, I, F, P) {
          let Y, K, Z = 31 + (S + 129 >>> 10 << 5), k = S + I;
          for (; E.length <= Z; )
            E.push(0);
          for (E[S >>> 5] |= 128 << 24 - S % 32, E[Z] = 4294967295 & k, E[Z - 1] = k / bn | 0, Y = 0; Y < E.length; Y += 32)
            F = Tl(E.slice(Y, Y + 32), F);
          return K = P === "SHA-384" ? [F[0].N, F[0].I, F[1].N, F[1].I, F[2].N, F[2].I, F[3].N, F[3].I, F[4].N, F[4].I, F[5].N, F[5].I] : [F[0].N, F[0].I, F[1].N, F[1].I, F[2].N, F[2].I, F[3].N, F[3].I, F[4].N, F[4].I, F[5].N, F[5].I, F[6].N, F[6].I, F[7].N, F[7].I], K;
        }(n, g, y, _, r3);
      }, this.U = Sl(r3), this.m = 1024, this.R = r3 === "SHA-384" ? 384 : 512, this.K = false, f.hmacKey && this.k(Gr("hmacKey", f.hmacKey, this.T));
    }
  }, C1 = [new rt(0, 1), new rt(0, 32898), new rt(2147483648, 32906), new rt(2147483648, 2147516416), new rt(0, 32907), new rt(0, 2147483649), new rt(2147483648, 2147516545), new rt(2147483648, 32777), new rt(0, 138), new rt(0, 136), new rt(0, 2147516425), new rt(0, 2147483658), new rt(0, 2147516555), new rt(2147483648, 139), new rt(2147483648, 32905), new rt(2147483648, 32771), new rt(2147483648, 32770), new rt(2147483648, 128), new rt(0, 32778), new rt(2147483648, 2147483658), new rt(2147483648, 2147516545), new rt(2147483648, 32896), new rt(0, 2147483649), new rt(2147483648, 2147516424)], B1 = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
  T1 = class extends zi {
    constructor(r3, t, e) {
      let f = 6, n = 0;
      super(r3, t, e);
      let g = e || {};
      if (this.numRounds !== 1) {
        if (g.kmacKey || g.hmacKey)
          throw new Error(Rl);
        if (this.o === "CSHAKE128" || this.o === "CSHAKE256")
          throw new Error("Cannot set numRounds for CSHAKE variants");
      }
      switch (this.T = 1, this.C = ji(this.t, this.i, this.T), this.v = So, this.L = S1, this.B = ca, this.U = ca(), this.K = false, r3) {
        case "SHA3-224":
          this.m = n = 1152, this.R = 224, this.M = true, this.g = this.Y;
          break;
        case "SHA3-256":
          this.m = n = 1088, this.R = 256, this.M = true, this.g = this.Y;
          break;
        case "SHA3-384":
          this.m = n = 832, this.R = 384, this.M = true, this.g = this.Y;
          break;
        case "SHA3-512":
          this.m = n = 576, this.R = 512, this.M = true, this.g = this.Y;
          break;
        case "SHAKE128":
          f = 31, this.m = n = 1344, this.R = -1, this.K = true, this.M = false, this.g = null;
          break;
        case "SHAKE256":
          f = 31, this.m = n = 1088, this.R = -1, this.K = true, this.M = false, this.g = null;
          break;
        case "KMAC128":
          f = 4, this.m = n = 1344, this.X(e), this.R = -1, this.K = true, this.M = false, this.g = this._;
          break;
        case "KMAC256":
          f = 4, this.m = n = 1088, this.X(e), this.R = -1, this.K = true, this.M = false, this.g = this._;
          break;
        case "CSHAKE128":
          this.m = n = 1344, f = this.O(e), this.R = -1, this.K = true, this.M = false, this.g = null;
          break;
        case "CSHAKE256":
          this.m = n = 1088, f = this.O(e), this.R = -1, this.K = true, this.M = false, this.g = null;
          break;
        default:
          throw new Error(An);
      }
      this.F = function(y, _, E, S, I) {
        return function(F, P, Y, K, Z, k, Tt) {
          let it, q, j = 0, nt = [], ft = Z >>> 5, Q = P >>> 5;
          for (it = 0; it < Q && P >= Z; it += ft)
            K = So(F.slice(it, it + ft), K), P -= Z;
          for (F = F.slice(it), P %= Z; F.length < ft; )
            F.push(0);
          for (it = P >>> 3, F[it >> 2] ^= k << it % 4 * 8, F[ft - 1] ^= 2147483648, K = So(F, K); 32 * nt.length < Tt && (q = K[j % 5][j / 5 | 0], nt.push(q.I), !(32 * nt.length >= Tt)); )
            nt.push(q.N), j += 1, 64 * j % Z == 0 && (So(null, K), j = 0);
          return nt;
        }(y, _, 0, S, n, f, I);
      }, g.hmacKey && this.k(Gr("hmacKey", g.hmacKey, this.T));
    }
    O(r3, t) {
      let e = function(n) {
        let g = n || {};
        return { funcName: Gr("funcName", g.funcName, 1, { value: [], binLen: 0 }), customization: Gr("Customization", g.customization, 1, { value: [], binLen: 0 }) };
      }(r3 || {});
      t && (e.funcName = t);
      let f = To(ua(e.funcName), ua(e.customization));
      if (e.customization.binLen !== 0 || e.funcName.binLen !== 0) {
        let n = Fl(f, this.m >>> 3);
        for (let g = 0; g < n.length; g += this.m >>> 5)
          this.U = this.v(n.slice(g, g + (this.m >>> 5)), this.U), this.A += this.m;
        return 4;
      }
      return 31;
    }
    X(r3) {
      let t = function(f) {
        let n = f || {};
        return { kmacKey: Gr("kmacKey", n.kmacKey, 1), funcName: { value: [1128353099], binLen: 32 }, customization: Gr("Customization", n.customization, 1, { value: [], binLen: 0 }) };
      }(r3 || {});
      this.O(r3, t.funcName);
      let e = Fl(ua(t.kmacKey), this.m >>> 3);
      for (let f = 0; f < e.length; f += this.m >>> 5)
        this.U = this.v(e.slice(f, f + (this.m >>> 5)), this.U), this.A += this.m;
      this.H = true;
    }
    _(r3) {
      let t = To({ value: this.h.slice(), binLen: this.u }, function(e) {
        let f, n, g = 0, y = [0, 0], _ = [4294967295 & e, e / bn & 2097151];
        for (f = 6; f >= 0; f--)
          n = _[f >> 2] >>> 8 * f & 255, n === 0 && g === 0 || (y[g >> 2] |= n << 8 * g, g += 1);
        return g = g !== 0 ? g : 1, y[g >> 2] |= g << 8 * g, { value: g + 1 > 4 ? y : [y[0]], binLen: 8 + 8 * g };
      }(r3.outputLen));
      return this.F(t.value, t.binLen, this.A, this.L(this.U), r3.outputLen);
    }
  }, Fo = class {
    constructor(t, e, f) {
      if (t == "SHA-1")
        this.P = new m1(t, e, f);
      else if (t == "SHA-224" || t == "SHA-256")
        this.P = new g1(t, e, f);
      else if (t == "SHA-384" || t == "SHA-512")
        this.P = new E1(t, e, f);
      else {
        if (t != "SHA3-224" && t != "SHA3-256" && t != "SHA3-384" && t != "SHA3-512" && t != "SHAKE128" && t != "SHAKE256" && t != "CSHAKE128" && t != "CSHAKE256" && t != "KMAC128" && t != "KMAC256")
          throw new Error(An);
        this.P = new T1(t, e, f);
      }
    }
    update(t) {
      return this.P.update(t), this;
    }
    getHash(t, e) {
      return this.P.getHash(t, e);
    }
    setHMACKey(t, e, f) {
      this.P.setHMACKey(t, e, f);
    }
    getHMAC(t, e) {
      return this.P.getHMAC(t, e);
    }
  };
});
var zl = ae(() => {
});
var da = ae((Bx, Io) => {
  (function(r3) {
    var t = function(b) {
      var C, T = new Float64Array(16);
      if (b)
        for (C = 0; C < b.length; C++)
          T[C] = b[C];
      return T;
    }, e = function() {
      throw new Error("no PRNG");
    }, f = new Uint8Array(16), n = new Uint8Array(32);
    n[0] = 9;
    var g = t(), y = t([1]), _ = t([56129, 1]), E = t([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), S = t([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), I = t([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), F = t([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), P = t([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
    function Y(b, C, T, w) {
      b[C] = T >> 24 & 255, b[C + 1] = T >> 16 & 255, b[C + 2] = T >> 8 & 255, b[C + 3] = T & 255, b[C + 4] = w >> 24 & 255, b[C + 5] = w >> 16 & 255, b[C + 6] = w >> 8 & 255, b[C + 7] = w & 255;
    }
    function K(b, C, T, w, A) {
      var W, R = 0;
      for (W = 0; W < A; W++)
        R |= b[C + W] ^ T[w + W];
      return (1 & R - 1 >>> 8) - 1;
    }
    function Z(b, C, T, w) {
      return K(b, C, T, w, 16);
    }
    function k(b, C, T, w) {
      return K(b, C, T, w, 32);
    }
    function Tt(b, C, T, w) {
      for (var A = w[0] & 255 | (w[1] & 255) << 8 | (w[2] & 255) << 16 | (w[3] & 255) << 24, W = T[0] & 255 | (T[1] & 255) << 8 | (T[2] & 255) << 16 | (T[3] & 255) << 24, R = T[4] & 255 | (T[5] & 255) << 8 | (T[6] & 255) << 16 | (T[7] & 255) << 24, L = T[8] & 255 | (T[9] & 255) << 8 | (T[10] & 255) << 16 | (T[11] & 255) << 24, lt = T[12] & 255 | (T[13] & 255) << 8 | (T[14] & 255) << 16 | (T[15] & 255) << 24, Nt = w[4] & 255 | (w[5] & 255) << 8 | (w[6] & 255) << 16 | (w[7] & 255) << 24, dt = C[0] & 255 | (C[1] & 255) << 8 | (C[2] & 255) << 16 | (C[3] & 255) << 24, Jt = C[4] & 255 | (C[5] & 255) << 8 | (C[6] & 255) << 16 | (C[7] & 255) << 24, Kt = C[8] & 255 | (C[9] & 255) << 8 | (C[10] & 255) << 16 | (C[11] & 255) << 24, Xt = C[12] & 255 | (C[13] & 255) << 8 | (C[14] & 255) << 16 | (C[15] & 255) << 24, Qt = w[8] & 255 | (w[9] & 255) << 8 | (w[10] & 255) << 16 | (w[11] & 255) << 24, se = T[16] & 255 | (T[17] & 255) << 8 | (T[18] & 255) << 16 | (T[19] & 255) << 24, oe = T[20] & 255 | (T[21] & 255) << 8 | (T[22] & 255) << 16 | (T[23] & 255) << 24, te = T[24] & 255 | (T[25] & 255) << 8 | (T[26] & 255) << 16 | (T[27] & 255) << 24, re = T[28] & 255 | (T[29] & 255) << 8 | (T[30] & 255) << 16 | (T[31] & 255) << 24, ee = w[12] & 255 | (w[13] & 255) << 8 | (w[14] & 255) << 16 | (w[15] & 255) << 24, Yt = A, Gt = W, jt = R, Ht = L, Vt = lt, Ot = Nt, G = dt, et = Jt, At = Kt, mt = Xt, vt = Qt, Rt = se, he = oe, ge = te, ye = re, ve = ee, z, Me = 0; Me < 20; Me += 2)
        z = Yt + he | 0, Vt ^= z << 7 | z >>> 32 - 7, z = Vt + Yt | 0, At ^= z << 9 | z >>> 32 - 9, z = At + Vt | 0, he ^= z << 13 | z >>> 32 - 13, z = he + At | 0, Yt ^= z << 18 | z >>> 32 - 18, z = Ot + Gt | 0, mt ^= z << 7 | z >>> 32 - 7, z = mt + Ot | 0, ge ^= z << 9 | z >>> 32 - 9, z = ge + mt | 0, Gt ^= z << 13 | z >>> 32 - 13, z = Gt + ge | 0, Ot ^= z << 18 | z >>> 32 - 18, z = vt + G | 0, ye ^= z << 7 | z >>> 32 - 7, z = ye + vt | 0, jt ^= z << 9 | z >>> 32 - 9, z = jt + ye | 0, G ^= z << 13 | z >>> 32 - 13, z = G + jt | 0, vt ^= z << 18 | z >>> 32 - 18, z = ve + Rt | 0, Ht ^= z << 7 | z >>> 32 - 7, z = Ht + ve | 0, et ^= z << 9 | z >>> 32 - 9, z = et + Ht | 0, Rt ^= z << 13 | z >>> 32 - 13, z = Rt + et | 0, ve ^= z << 18 | z >>> 32 - 18, z = Yt + Ht | 0, Gt ^= z << 7 | z >>> 32 - 7, z = Gt + Yt | 0, jt ^= z << 9 | z >>> 32 - 9, z = jt + Gt | 0, Ht ^= z << 13 | z >>> 32 - 13, z = Ht + jt | 0, Yt ^= z << 18 | z >>> 32 - 18, z = Ot + Vt | 0, G ^= z << 7 | z >>> 32 - 7, z = G + Ot | 0, et ^= z << 9 | z >>> 32 - 9, z = et + G | 0, Vt ^= z << 13 | z >>> 32 - 13, z = Vt + et | 0, Ot ^= z << 18 | z >>> 32 - 18, z = vt + mt | 0, Rt ^= z << 7 | z >>> 32 - 7, z = Rt + vt | 0, At ^= z << 9 | z >>> 32 - 9, z = At + Rt | 0, mt ^= z << 13 | z >>> 32 - 13, z = mt + At | 0, vt ^= z << 18 | z >>> 32 - 18, z = ve + ye | 0, he ^= z << 7 | z >>> 32 - 7, z = he + ve | 0, ge ^= z << 9 | z >>> 32 - 9, z = ge + he | 0, ye ^= z << 13 | z >>> 32 - 13, z = ye + ge | 0, ve ^= z << 18 | z >>> 32 - 18;
      Yt = Yt + A | 0, Gt = Gt + W | 0, jt = jt + R | 0, Ht = Ht + L | 0, Vt = Vt + lt | 0, Ot = Ot + Nt | 0, G = G + dt | 0, et = et + Jt | 0, At = At + Kt | 0, mt = mt + Xt | 0, vt = vt + Qt | 0, Rt = Rt + se | 0, he = he + oe | 0, ge = ge + te | 0, ye = ye + re | 0, ve = ve + ee | 0, b[0] = Yt >>> 0 & 255, b[1] = Yt >>> 8 & 255, b[2] = Yt >>> 16 & 255, b[3] = Yt >>> 24 & 255, b[4] = Gt >>> 0 & 255, b[5] = Gt >>> 8 & 255, b[6] = Gt >>> 16 & 255, b[7] = Gt >>> 24 & 255, b[8] = jt >>> 0 & 255, b[9] = jt >>> 8 & 255, b[10] = jt >>> 16 & 255, b[11] = jt >>> 24 & 255, b[12] = Ht >>> 0 & 255, b[13] = Ht >>> 8 & 255, b[14] = Ht >>> 16 & 255, b[15] = Ht >>> 24 & 255, b[16] = Vt >>> 0 & 255, b[17] = Vt >>> 8 & 255, b[18] = Vt >>> 16 & 255, b[19] = Vt >>> 24 & 255, b[20] = Ot >>> 0 & 255, b[21] = Ot >>> 8 & 255, b[22] = Ot >>> 16 & 255, b[23] = Ot >>> 24 & 255, b[24] = G >>> 0 & 255, b[25] = G >>> 8 & 255, b[26] = G >>> 16 & 255, b[27] = G >>> 24 & 255, b[28] = et >>> 0 & 255, b[29] = et >>> 8 & 255, b[30] = et >>> 16 & 255, b[31] = et >>> 24 & 255, b[32] = At >>> 0 & 255, b[33] = At >>> 8 & 255, b[34] = At >>> 16 & 255, b[35] = At >>> 24 & 255, b[36] = mt >>> 0 & 255, b[37] = mt >>> 8 & 255, b[38] = mt >>> 16 & 255, b[39] = mt >>> 24 & 255, b[40] = vt >>> 0 & 255, b[41] = vt >>> 8 & 255, b[42] = vt >>> 16 & 255, b[43] = vt >>> 24 & 255, b[44] = Rt >>> 0 & 255, b[45] = Rt >>> 8 & 255, b[46] = Rt >>> 16 & 255, b[47] = Rt >>> 24 & 255, b[48] = he >>> 0 & 255, b[49] = he >>> 8 & 255, b[50] = he >>> 16 & 255, b[51] = he >>> 24 & 255, b[52] = ge >>> 0 & 255, b[53] = ge >>> 8 & 255, b[54] = ge >>> 16 & 255, b[55] = ge >>> 24 & 255, b[56] = ye >>> 0 & 255, b[57] = ye >>> 8 & 255, b[58] = ye >>> 16 & 255, b[59] = ye >>> 24 & 255, b[60] = ve >>> 0 & 255, b[61] = ve >>> 8 & 255, b[62] = ve >>> 16 & 255, b[63] = ve >>> 24 & 255;
    }
    function it(b, C, T, w) {
      for (var A = w[0] & 255 | (w[1] & 255) << 8 | (w[2] & 255) << 16 | (w[3] & 255) << 24, W = T[0] & 255 | (T[1] & 255) << 8 | (T[2] & 255) << 16 | (T[3] & 255) << 24, R = T[4] & 255 | (T[5] & 255) << 8 | (T[6] & 255) << 16 | (T[7] & 255) << 24, L = T[8] & 255 | (T[9] & 255) << 8 | (T[10] & 255) << 16 | (T[11] & 255) << 24, lt = T[12] & 255 | (T[13] & 255) << 8 | (T[14] & 255) << 16 | (T[15] & 255) << 24, Nt = w[4] & 255 | (w[5] & 255) << 8 | (w[6] & 255) << 16 | (w[7] & 255) << 24, dt = C[0] & 255 | (C[1] & 255) << 8 | (C[2] & 255) << 16 | (C[3] & 255) << 24, Jt = C[4] & 255 | (C[5] & 255) << 8 | (C[6] & 255) << 16 | (C[7] & 255) << 24, Kt = C[8] & 255 | (C[9] & 255) << 8 | (C[10] & 255) << 16 | (C[11] & 255) << 24, Xt = C[12] & 255 | (C[13] & 255) << 8 | (C[14] & 255) << 16 | (C[15] & 255) << 24, Qt = w[8] & 255 | (w[9] & 255) << 8 | (w[10] & 255) << 16 | (w[11] & 255) << 24, se = T[16] & 255 | (T[17] & 255) << 8 | (T[18] & 255) << 16 | (T[19] & 255) << 24, oe = T[20] & 255 | (T[21] & 255) << 8 | (T[22] & 255) << 16 | (T[23] & 255) << 24, te = T[24] & 255 | (T[25] & 255) << 8 | (T[26] & 255) << 16 | (T[27] & 255) << 24, re = T[28] & 255 | (T[29] & 255) << 8 | (T[30] & 255) << 16 | (T[31] & 255) << 24, ee = w[12] & 255 | (w[13] & 255) << 8 | (w[14] & 255) << 16 | (w[15] & 255) << 24, Yt = A, Gt = W, jt = R, Ht = L, Vt = lt, Ot = Nt, G = dt, et = Jt, At = Kt, mt = Xt, vt = Qt, Rt = se, he = oe, ge = te, ye = re, ve = ee, z, Me = 0; Me < 20; Me += 2)
        z = Yt + he | 0, Vt ^= z << 7 | z >>> 32 - 7, z = Vt + Yt | 0, At ^= z << 9 | z >>> 32 - 9, z = At + Vt | 0, he ^= z << 13 | z >>> 32 - 13, z = he + At | 0, Yt ^= z << 18 | z >>> 32 - 18, z = Ot + Gt | 0, mt ^= z << 7 | z >>> 32 - 7, z = mt + Ot | 0, ge ^= z << 9 | z >>> 32 - 9, z = ge + mt | 0, Gt ^= z << 13 | z >>> 32 - 13, z = Gt + ge | 0, Ot ^= z << 18 | z >>> 32 - 18, z = vt + G | 0, ye ^= z << 7 | z >>> 32 - 7, z = ye + vt | 0, jt ^= z << 9 | z >>> 32 - 9, z = jt + ye | 0, G ^= z << 13 | z >>> 32 - 13, z = G + jt | 0, vt ^= z << 18 | z >>> 32 - 18, z = ve + Rt | 0, Ht ^= z << 7 | z >>> 32 - 7, z = Ht + ve | 0, et ^= z << 9 | z >>> 32 - 9, z = et + Ht | 0, Rt ^= z << 13 | z >>> 32 - 13, z = Rt + et | 0, ve ^= z << 18 | z >>> 32 - 18, z = Yt + Ht | 0, Gt ^= z << 7 | z >>> 32 - 7, z = Gt + Yt | 0, jt ^= z << 9 | z >>> 32 - 9, z = jt + Gt | 0, Ht ^= z << 13 | z >>> 32 - 13, z = Ht + jt | 0, Yt ^= z << 18 | z >>> 32 - 18, z = Ot + Vt | 0, G ^= z << 7 | z >>> 32 - 7, z = G + Ot | 0, et ^= z << 9 | z >>> 32 - 9, z = et + G | 0, Vt ^= z << 13 | z >>> 32 - 13, z = Vt + et | 0, Ot ^= z << 18 | z >>> 32 - 18, z = vt + mt | 0, Rt ^= z << 7 | z >>> 32 - 7, z = Rt + vt | 0, At ^= z << 9 | z >>> 32 - 9, z = At + Rt | 0, mt ^= z << 13 | z >>> 32 - 13, z = mt + At | 0, vt ^= z << 18 | z >>> 32 - 18, z = ve + ye | 0, he ^= z << 7 | z >>> 32 - 7, z = he + ve | 0, ge ^= z << 9 | z >>> 32 - 9, z = ge + he | 0, ye ^= z << 13 | z >>> 32 - 13, z = ye + ge | 0, ve ^= z << 18 | z >>> 32 - 18;
      b[0] = Yt >>> 0 & 255, b[1] = Yt >>> 8 & 255, b[2] = Yt >>> 16 & 255, b[3] = Yt >>> 24 & 255, b[4] = Ot >>> 0 & 255, b[5] = Ot >>> 8 & 255, b[6] = Ot >>> 16 & 255, b[7] = Ot >>> 24 & 255, b[8] = vt >>> 0 & 255, b[9] = vt >>> 8 & 255, b[10] = vt >>> 16 & 255, b[11] = vt >>> 24 & 255, b[12] = ve >>> 0 & 255, b[13] = ve >>> 8 & 255, b[14] = ve >>> 16 & 255, b[15] = ve >>> 24 & 255, b[16] = G >>> 0 & 255, b[17] = G >>> 8 & 255, b[18] = G >>> 16 & 255, b[19] = G >>> 24 & 255, b[20] = et >>> 0 & 255, b[21] = et >>> 8 & 255, b[22] = et >>> 16 & 255, b[23] = et >>> 24 & 255, b[24] = At >>> 0 & 255, b[25] = At >>> 8 & 255, b[26] = At >>> 16 & 255, b[27] = At >>> 24 & 255, b[28] = mt >>> 0 & 255, b[29] = mt >>> 8 & 255, b[30] = mt >>> 16 & 255, b[31] = mt >>> 24 & 255;
    }
    function q(b, C, T, w) {
      Tt(b, C, T, w);
    }
    function j(b, C, T, w) {
      it(b, C, T, w);
    }
    var nt = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
    function ft(b, C, T, w, A, W, R) {
      var L = new Uint8Array(16), lt = new Uint8Array(64), Nt, dt;
      for (dt = 0; dt < 16; dt++)
        L[dt] = 0;
      for (dt = 0; dt < 8; dt++)
        L[dt] = W[dt];
      for (; A >= 64; ) {
        for (q(lt, L, R, nt), dt = 0; dt < 64; dt++)
          b[C + dt] = T[w + dt] ^ lt[dt];
        for (Nt = 1, dt = 8; dt < 16; dt++)
          Nt = Nt + (L[dt] & 255) | 0, L[dt] = Nt & 255, Nt >>>= 8;
        A -= 64, C += 64, w += 64;
      }
      if (A > 0)
        for (q(lt, L, R, nt), dt = 0; dt < A; dt++)
          b[C + dt] = T[w + dt] ^ lt[dt];
      return 0;
    }
    function Q(b, C, T, w, A) {
      var W = new Uint8Array(16), R = new Uint8Array(64), L, lt;
      for (lt = 0; lt < 16; lt++)
        W[lt] = 0;
      for (lt = 0; lt < 8; lt++)
        W[lt] = w[lt];
      for (; T >= 64; ) {
        for (q(R, W, A, nt), lt = 0; lt < 64; lt++)
          b[C + lt] = R[lt];
        for (L = 1, lt = 8; lt < 16; lt++)
          L = L + (W[lt] & 255) | 0, W[lt] = L & 255, L >>>= 8;
        T -= 64, C += 64;
      }
      if (T > 0)
        for (q(R, W, A, nt), lt = 0; lt < T; lt++)
          b[C + lt] = R[lt];
      return 0;
    }
    function $t(b, C, T, w, A) {
      var W = new Uint8Array(32);
      j(W, w, A, nt);
      for (var R = new Uint8Array(8), L = 0; L < 8; L++)
        R[L] = w[L + 16];
      return Q(b, C, T, R, W);
    }
    function x(b, C, T, w, A, W, R) {
      var L = new Uint8Array(32);
      j(L, W, R, nt);
      for (var lt = new Uint8Array(8), Nt = 0; Nt < 8; Nt++)
        lt[Nt] = W[Nt + 16];
      return ft(b, C, T, w, A, lt, L);
    }
    var o = function(b) {
      this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0;
      var C, T, w, A, W, R, L, lt;
      C = b[0] & 255 | (b[1] & 255) << 8, this.r[0] = C & 8191, T = b[2] & 255 | (b[3] & 255) << 8, this.r[1] = (C >>> 13 | T << 3) & 8191, w = b[4] & 255 | (b[5] & 255) << 8, this.r[2] = (T >>> 10 | w << 6) & 7939, A = b[6] & 255 | (b[7] & 255) << 8, this.r[3] = (w >>> 7 | A << 9) & 8191, W = b[8] & 255 | (b[9] & 255) << 8, this.r[4] = (A >>> 4 | W << 12) & 255, this.r[5] = W >>> 1 & 8190, R = b[10] & 255 | (b[11] & 255) << 8, this.r[6] = (W >>> 14 | R << 2) & 8191, L = b[12] & 255 | (b[13] & 255) << 8, this.r[7] = (R >>> 11 | L << 5) & 8065, lt = b[14] & 255 | (b[15] & 255) << 8, this.r[8] = (L >>> 8 | lt << 8) & 8191, this.r[9] = lt >>> 5 & 127, this.pad[0] = b[16] & 255 | (b[17] & 255) << 8, this.pad[1] = b[18] & 255 | (b[19] & 255) << 8, this.pad[2] = b[20] & 255 | (b[21] & 255) << 8, this.pad[3] = b[22] & 255 | (b[23] & 255) << 8, this.pad[4] = b[24] & 255 | (b[25] & 255) << 8, this.pad[5] = b[26] & 255 | (b[27] & 255) << 8, this.pad[6] = b[28] & 255 | (b[29] & 255) << 8, this.pad[7] = b[30] & 255 | (b[31] & 255) << 8;
    };
    o.prototype.blocks = function(b, C, T) {
      for (var w = this.fin ? 0 : 2048, A, W, R, L, lt, Nt, dt, Jt, Kt, Xt, Qt, se, oe, te, re, ee, Yt, Gt, jt, Ht = this.h[0], Vt = this.h[1], Ot = this.h[2], G = this.h[3], et = this.h[4], At = this.h[5], mt = this.h[6], vt = this.h[7], Rt = this.h[8], he = this.h[9], ge = this.r[0], ye = this.r[1], ve = this.r[2], z = this.r[3], Me = this.r[4], Te = this.r[5], Fe = this.r[6], we = this.r[7], Be = this.r[8], Se = this.r[9]; T >= 16; )
        A = b[C + 0] & 255 | (b[C + 1] & 255) << 8, Ht += A & 8191, W = b[C + 2] & 255 | (b[C + 3] & 255) << 8, Vt += (A >>> 13 | W << 3) & 8191, R = b[C + 4] & 255 | (b[C + 5] & 255) << 8, Ot += (W >>> 10 | R << 6) & 8191, L = b[C + 6] & 255 | (b[C + 7] & 255) << 8, G += (R >>> 7 | L << 9) & 8191, lt = b[C + 8] & 255 | (b[C + 9] & 255) << 8, et += (L >>> 4 | lt << 12) & 8191, At += lt >>> 1 & 8191, Nt = b[C + 10] & 255 | (b[C + 11] & 255) << 8, mt += (lt >>> 14 | Nt << 2) & 8191, dt = b[C + 12] & 255 | (b[C + 13] & 255) << 8, vt += (Nt >>> 11 | dt << 5) & 8191, Jt = b[C + 14] & 255 | (b[C + 15] & 255) << 8, Rt += (dt >>> 8 | Jt << 8) & 8191, he += Jt >>> 5 | w, Kt = 0, Xt = Kt, Xt += Ht * ge, Xt += Vt * (5 * Se), Xt += Ot * (5 * Be), Xt += G * (5 * we), Xt += et * (5 * Fe), Kt = Xt >>> 13, Xt &= 8191, Xt += At * (5 * Te), Xt += mt * (5 * Me), Xt += vt * (5 * z), Xt += Rt * (5 * ve), Xt += he * (5 * ye), Kt += Xt >>> 13, Xt &= 8191, Qt = Kt, Qt += Ht * ye, Qt += Vt * ge, Qt += Ot * (5 * Se), Qt += G * (5 * Be), Qt += et * (5 * we), Kt = Qt >>> 13, Qt &= 8191, Qt += At * (5 * Fe), Qt += mt * (5 * Te), Qt += vt * (5 * Me), Qt += Rt * (5 * z), Qt += he * (5 * ve), Kt += Qt >>> 13, Qt &= 8191, se = Kt, se += Ht * ve, se += Vt * ye, se += Ot * ge, se += G * (5 * Se), se += et * (5 * Be), Kt = se >>> 13, se &= 8191, se += At * (5 * we), se += mt * (5 * Fe), se += vt * (5 * Te), se += Rt * (5 * Me), se += he * (5 * z), Kt += se >>> 13, se &= 8191, oe = Kt, oe += Ht * z, oe += Vt * ve, oe += Ot * ye, oe += G * ge, oe += et * (5 * Se), Kt = oe >>> 13, oe &= 8191, oe += At * (5 * Be), oe += mt * (5 * we), oe += vt * (5 * Fe), oe += Rt * (5 * Te), oe += he * (5 * Me), Kt += oe >>> 13, oe &= 8191, te = Kt, te += Ht * Me, te += Vt * z, te += Ot * ve, te += G * ye, te += et * ge, Kt = te >>> 13, te &= 8191, te += At * (5 * Se), te += mt * (5 * Be), te += vt * (5 * we), te += Rt * (5 * Fe), te += he * (5 * Te), Kt += te >>> 13, te &= 8191, re = Kt, re += Ht * Te, re += Vt * Me, re += Ot * z, re += G * ve, re += et * ye, Kt = re >>> 13, re &= 8191, re += At * ge, re += mt * (5 * Se), re += vt * (5 * Be), re += Rt * (5 * we), re += he * (5 * Fe), Kt += re >>> 13, re &= 8191, ee = Kt, ee += Ht * Fe, ee += Vt * Te, ee += Ot * Me, ee += G * z, ee += et * ve, Kt = ee >>> 13, ee &= 8191, ee += At * ye, ee += mt * ge, ee += vt * (5 * Se), ee += Rt * (5 * Be), ee += he * (5 * we), Kt += ee >>> 13, ee &= 8191, Yt = Kt, Yt += Ht * we, Yt += Vt * Fe, Yt += Ot * Te, Yt += G * Me, Yt += et * z, Kt = Yt >>> 13, Yt &= 8191, Yt += At * ve, Yt += mt * ye, Yt += vt * ge, Yt += Rt * (5 * Se), Yt += he * (5 * Be), Kt += Yt >>> 13, Yt &= 8191, Gt = Kt, Gt += Ht * Be, Gt += Vt * we, Gt += Ot * Fe, Gt += G * Te, Gt += et * Me, Kt = Gt >>> 13, Gt &= 8191, Gt += At * z, Gt += mt * ve, Gt += vt * ye, Gt += Rt * ge, Gt += he * (5 * Se), Kt += Gt >>> 13, Gt &= 8191, jt = Kt, jt += Ht * Se, jt += Vt * Be, jt += Ot * we, jt += G * Fe, jt += et * Te, Kt = jt >>> 13, jt &= 8191, jt += At * Me, jt += mt * z, jt += vt * ve, jt += Rt * ye, jt += he * ge, Kt += jt >>> 13, jt &= 8191, Kt = (Kt << 2) + Kt | 0, Kt = Kt + Xt | 0, Xt = Kt & 8191, Kt = Kt >>> 13, Qt += Kt, Ht = Xt, Vt = Qt, Ot = se, G = oe, et = te, At = re, mt = ee, vt = Yt, Rt = Gt, he = jt, C += 16, T -= 16;
      this.h[0] = Ht, this.h[1] = Vt, this.h[2] = Ot, this.h[3] = G, this.h[4] = et, this.h[5] = At, this.h[6] = mt, this.h[7] = vt, this.h[8] = Rt, this.h[9] = he;
    }, o.prototype.finish = function(b, C) {
      var T = new Uint16Array(10), w, A, W, R;
      if (this.leftover) {
        for (R = this.leftover, this.buffer[R++] = 1; R < 16; R++)
          this.buffer[R] = 0;
        this.fin = 1, this.blocks(this.buffer, 0, 16);
      }
      for (w = this.h[1] >>> 13, this.h[1] &= 8191, R = 2; R < 10; R++)
        this.h[R] += w, w = this.h[R] >>> 13, this.h[R] &= 8191;
      for (this.h[0] += w * 5, w = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += w, w = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += w, T[0] = this.h[0] + 5, w = T[0] >>> 13, T[0] &= 8191, R = 1; R < 10; R++)
        T[R] = this.h[R] + w, w = T[R] >>> 13, T[R] &= 8191;
      for (T[9] -= 8192, A = (w ^ 1) - 1, R = 0; R < 10; R++)
        T[R] &= A;
      for (A = ~A, R = 0; R < 10; R++)
        this.h[R] = this.h[R] & A | T[R];
      for (this.h[0] = (this.h[0] | this.h[1] << 13) & 65535, this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535, this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535, this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535, this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535, this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535, this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535, this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535, W = this.h[0] + this.pad[0], this.h[0] = W & 65535, R = 1; R < 8; R++)
        W = (this.h[R] + this.pad[R] | 0) + (W >>> 16) | 0, this.h[R] = W & 65535;
      b[C + 0] = this.h[0] >>> 0 & 255, b[C + 1] = this.h[0] >>> 8 & 255, b[C + 2] = this.h[1] >>> 0 & 255, b[C + 3] = this.h[1] >>> 8 & 255, b[C + 4] = this.h[2] >>> 0 & 255, b[C + 5] = this.h[2] >>> 8 & 255, b[C + 6] = this.h[3] >>> 0 & 255, b[C + 7] = this.h[3] >>> 8 & 255, b[C + 8] = this.h[4] >>> 0 & 255, b[C + 9] = this.h[4] >>> 8 & 255, b[C + 10] = this.h[5] >>> 0 & 255, b[C + 11] = this.h[5] >>> 8 & 255, b[C + 12] = this.h[6] >>> 0 & 255, b[C + 13] = this.h[6] >>> 8 & 255, b[C + 14] = this.h[7] >>> 0 & 255, b[C + 15] = this.h[7] >>> 8 & 255;
    }, o.prototype.update = function(b, C, T) {
      var w, A;
      if (this.leftover) {
        for (A = 16 - this.leftover, A > T && (A = T), w = 0; w < A; w++)
          this.buffer[this.leftover + w] = b[C + w];
        if (T -= A, C += A, this.leftover += A, this.leftover < 16)
          return;
        this.blocks(this.buffer, 0, 16), this.leftover = 0;
      }
      if (T >= 16 && (A = T - T % 16, this.blocks(b, C, A), C += A, T -= A), T) {
        for (w = 0; w < T; w++)
          this.buffer[this.leftover + w] = b[C + w];
        this.leftover += T;
      }
    };
    function u(b, C, T, w, A, W) {
      var R = new o(W);
      return R.update(T, w, A), R.finish(b, C), 0;
    }
    function c(b, C, T, w, A, W) {
      var R = new Uint8Array(16);
      return u(R, 0, T, w, A, W), Z(b, C, R, 0);
    }
    function a(b, C, T, w, A) {
      var W;
      if (T < 32)
        return -1;
      for (x(b, 0, C, 0, T, w, A), u(b, 16, b, 32, T - 32, b), W = 0; W < 16; W++)
        b[W] = 0;
      return 0;
    }
    function s(b, C, T, w, A) {
      var W, R = new Uint8Array(32);
      if (T < 32 || ($t(R, 0, 32, w, A), c(C, 16, C, 32, T - 32, R) !== 0))
        return -1;
      for (x(b, 0, C, 0, T, w, A), W = 0; W < 32; W++)
        b[W] = 0;
      return 0;
    }
    function h(b, C) {
      var T;
      for (T = 0; T < 16; T++)
        b[T] = C[T] | 0;
    }
    function p(b) {
      var C, T, w = 1;
      for (C = 0; C < 16; C++)
        T = b[C] + w + 65535, w = Math.floor(T / 65536), b[C] = T - w * 65536;
      b[0] += w - 1 + 37 * (w - 1);
    }
    function l(b, C, T) {
      for (var w, A = ~(T - 1), W = 0; W < 16; W++)
        w = A & (b[W] ^ C[W]), b[W] ^= w, C[W] ^= w;
    }
    function i(b, C) {
      var T, w, A, W = t(), R = t();
      for (T = 0; T < 16; T++)
        R[T] = C[T];
      for (p(R), p(R), p(R), w = 0; w < 2; w++) {
        for (W[0] = R[0] - 65517, T = 1; T < 15; T++)
          W[T] = R[T] - 65535 - (W[T - 1] >> 16 & 1), W[T - 1] &= 65535;
        W[15] = R[15] - 32767 - (W[14] >> 16 & 1), A = W[15] >> 16 & 1, W[14] &= 65535, l(R, W, 1 - A);
      }
      for (T = 0; T < 16; T++)
        b[2 * T] = R[T] & 255, b[2 * T + 1] = R[T] >> 8;
    }
    function d(b, C) {
      var T = new Uint8Array(32), w = new Uint8Array(32);
      return i(T, b), i(w, C), k(T, 0, w, 0);
    }
    function M(b) {
      var C = new Uint8Array(32);
      return i(C, b), C[0] & 1;
    }
    function m(b, C) {
      var T;
      for (T = 0; T < 16; T++)
        b[T] = C[2 * T] + (C[2 * T + 1] << 8);
      b[15] &= 32767;
    }
    function v(b, C, T) {
      for (var w = 0; w < 16; w++)
        b[w] = C[w] + T[w];
    }
    function B(b, C, T) {
      for (var w = 0; w < 16; w++)
        b[w] = C[w] - T[w];
    }
    function O(b, C, T) {
      var w, A, W = 0, R = 0, L = 0, lt = 0, Nt = 0, dt = 0, Jt = 0, Kt = 0, Xt = 0, Qt = 0, se = 0, oe = 0, te = 0, re = 0, ee = 0, Yt = 0, Gt = 0, jt = 0, Ht = 0, Vt = 0, Ot = 0, G = 0, et = 0, At = 0, mt = 0, vt = 0, Rt = 0, he = 0, ge = 0, ye = 0, ve = 0, z = T[0], Me = T[1], Te = T[2], Fe = T[3], we = T[4], Be = T[5], Se = T[6], Le = T[7], Ie = T[8], Re = T[9], Pe = T[10], De = T[11], ze = T[12], Ge = T[13], Je = T[14], Xe = T[15];
      w = C[0], W += w * z, R += w * Me, L += w * Te, lt += w * Fe, Nt += w * we, dt += w * Be, Jt += w * Se, Kt += w * Le, Xt += w * Ie, Qt += w * Re, se += w * Pe, oe += w * De, te += w * ze, re += w * Ge, ee += w * Je, Yt += w * Xe, w = C[1], R += w * z, L += w * Me, lt += w * Te, Nt += w * Fe, dt += w * we, Jt += w * Be, Kt += w * Se, Xt += w * Le, Qt += w * Ie, se += w * Re, oe += w * Pe, te += w * De, re += w * ze, ee += w * Ge, Yt += w * Je, Gt += w * Xe, w = C[2], L += w * z, lt += w * Me, Nt += w * Te, dt += w * Fe, Jt += w * we, Kt += w * Be, Xt += w * Se, Qt += w * Le, se += w * Ie, oe += w * Re, te += w * Pe, re += w * De, ee += w * ze, Yt += w * Ge, Gt += w * Je, jt += w * Xe, w = C[3], lt += w * z, Nt += w * Me, dt += w * Te, Jt += w * Fe, Kt += w * we, Xt += w * Be, Qt += w * Se, se += w * Le, oe += w * Ie, te += w * Re, re += w * Pe, ee += w * De, Yt += w * ze, Gt += w * Ge, jt += w * Je, Ht += w * Xe, w = C[4], Nt += w * z, dt += w * Me, Jt += w * Te, Kt += w * Fe, Xt += w * we, Qt += w * Be, se += w * Se, oe += w * Le, te += w * Ie, re += w * Re, ee += w * Pe, Yt += w * De, Gt += w * ze, jt += w * Ge, Ht += w * Je, Vt += w * Xe, w = C[5], dt += w * z, Jt += w * Me, Kt += w * Te, Xt += w * Fe, Qt += w * we, se += w * Be, oe += w * Se, te += w * Le, re += w * Ie, ee += w * Re, Yt += w * Pe, Gt += w * De, jt += w * ze, Ht += w * Ge, Vt += w * Je, Ot += w * Xe, w = C[6], Jt += w * z, Kt += w * Me, Xt += w * Te, Qt += w * Fe, se += w * we, oe += w * Be, te += w * Se, re += w * Le, ee += w * Ie, Yt += w * Re, Gt += w * Pe, jt += w * De, Ht += w * ze, Vt += w * Ge, Ot += w * Je, G += w * Xe, w = C[7], Kt += w * z, Xt += w * Me, Qt += w * Te, se += w * Fe, oe += w * we, te += w * Be, re += w * Se, ee += w * Le, Yt += w * Ie, Gt += w * Re, jt += w * Pe, Ht += w * De, Vt += w * ze, Ot += w * Ge, G += w * Je, et += w * Xe, w = C[8], Xt += w * z, Qt += w * Me, se += w * Te, oe += w * Fe, te += w * we, re += w * Be, ee += w * Se, Yt += w * Le, Gt += w * Ie, jt += w * Re, Ht += w * Pe, Vt += w * De, Ot += w * ze, G += w * Ge, et += w * Je, At += w * Xe, w = C[9], Qt += w * z, se += w * Me, oe += w * Te, te += w * Fe, re += w * we, ee += w * Be, Yt += w * Se, Gt += w * Le, jt += w * Ie, Ht += w * Re, Vt += w * Pe, Ot += w * De, G += w * ze, et += w * Ge, At += w * Je, mt += w * Xe, w = C[10], se += w * z, oe += w * Me, te += w * Te, re += w * Fe, ee += w * we, Yt += w * Be, Gt += w * Se, jt += w * Le, Ht += w * Ie, Vt += w * Re, Ot += w * Pe, G += w * De, et += w * ze, At += w * Ge, mt += w * Je, vt += w * Xe, w = C[11], oe += w * z, te += w * Me, re += w * Te, ee += w * Fe, Yt += w * we, Gt += w * Be, jt += w * Se, Ht += w * Le, Vt += w * Ie, Ot += w * Re, G += w * Pe, et += w * De, At += w * ze, mt += w * Ge, vt += w * Je, Rt += w * Xe, w = C[12], te += w * z, re += w * Me, ee += w * Te, Yt += w * Fe, Gt += w * we, jt += w * Be, Ht += w * Se, Vt += w * Le, Ot += w * Ie, G += w * Re, et += w * Pe, At += w * De, mt += w * ze, vt += w * Ge, Rt += w * Je, he += w * Xe, w = C[13], re += w * z, ee += w * Me, Yt += w * Te, Gt += w * Fe, jt += w * we, Ht += w * Be, Vt += w * Se, Ot += w * Le, G += w * Ie, et += w * Re, At += w * Pe, mt += w * De, vt += w * ze, Rt += w * Ge, he += w * Je, ge += w * Xe, w = C[14], ee += w * z, Yt += w * Me, Gt += w * Te, jt += w * Fe, Ht += w * we, Vt += w * Be, Ot += w * Se, G += w * Le, et += w * Ie, At += w * Re, mt += w * Pe, vt += w * De, Rt += w * ze, he += w * Ge, ge += w * Je, ye += w * Xe, w = C[15], Yt += w * z, Gt += w * Me, jt += w * Te, Ht += w * Fe, Vt += w * we, Ot += w * Be, G += w * Se, et += w * Le, At += w * Ie, mt += w * Re, vt += w * Pe, Rt += w * De, he += w * ze, ge += w * Ge, ye += w * Je, ve += w * Xe, W += 38 * Gt, R += 38 * jt, L += 38 * Ht, lt += 38 * Vt, Nt += 38 * Ot, dt += 38 * G, Jt += 38 * et, Kt += 38 * At, Xt += 38 * mt, Qt += 38 * vt, se += 38 * Rt, oe += 38 * he, te += 38 * ge, re += 38 * ye, ee += 38 * ve, A = 1, w = W + A + 65535, A = Math.floor(w / 65536), W = w - A * 65536, w = R + A + 65535, A = Math.floor(w / 65536), R = w - A * 65536, w = L + A + 65535, A = Math.floor(w / 65536), L = w - A * 65536, w = lt + A + 65535, A = Math.floor(w / 65536), lt = w - A * 65536, w = Nt + A + 65535, A = Math.floor(w / 65536), Nt = w - A * 65536, w = dt + A + 65535, A = Math.floor(w / 65536), dt = w - A * 65536, w = Jt + A + 65535, A = Math.floor(w / 65536), Jt = w - A * 65536, w = Kt + A + 65535, A = Math.floor(w / 65536), Kt = w - A * 65536, w = Xt + A + 65535, A = Math.floor(w / 65536), Xt = w - A * 65536, w = Qt + A + 65535, A = Math.floor(w / 65536), Qt = w - A * 65536, w = se + A + 65535, A = Math.floor(w / 65536), se = w - A * 65536, w = oe + A + 65535, A = Math.floor(w / 65536), oe = w - A * 65536, w = te + A + 65535, A = Math.floor(w / 65536), te = w - A * 65536, w = re + A + 65535, A = Math.floor(w / 65536), re = w - A * 65536, w = ee + A + 65535, A = Math.floor(w / 65536), ee = w - A * 65536, w = Yt + A + 65535, A = Math.floor(w / 65536), Yt = w - A * 65536, W += A - 1 + 37 * (A - 1), A = 1, w = W + A + 65535, A = Math.floor(w / 65536), W = w - A * 65536, w = R + A + 65535, A = Math.floor(w / 65536), R = w - A * 65536, w = L + A + 65535, A = Math.floor(w / 65536), L = w - A * 65536, w = lt + A + 65535, A = Math.floor(w / 65536), lt = w - A * 65536, w = Nt + A + 65535, A = Math.floor(w / 65536), Nt = w - A * 65536, w = dt + A + 65535, A = Math.floor(w / 65536), dt = w - A * 65536, w = Jt + A + 65535, A = Math.floor(w / 65536), Jt = w - A * 65536, w = Kt + A + 65535, A = Math.floor(w / 65536), Kt = w - A * 65536, w = Xt + A + 65535, A = Math.floor(w / 65536), Xt = w - A * 65536, w = Qt + A + 65535, A = Math.floor(w / 65536), Qt = w - A * 65536, w = se + A + 65535, A = Math.floor(w / 65536), se = w - A * 65536, w = oe + A + 65535, A = Math.floor(w / 65536), oe = w - A * 65536, w = te + A + 65535, A = Math.floor(w / 65536), te = w - A * 65536, w = re + A + 65535, A = Math.floor(w / 65536), re = w - A * 65536, w = ee + A + 65535, A = Math.floor(w / 65536), ee = w - A * 65536, w = Yt + A + 65535, A = Math.floor(w / 65536), Yt = w - A * 65536, W += A - 1 + 37 * (A - 1), b[0] = W, b[1] = R, b[2] = L, b[3] = lt, b[4] = Nt, b[5] = dt, b[6] = Jt, b[7] = Kt, b[8] = Xt, b[9] = Qt, b[10] = se, b[11] = oe, b[12] = te, b[13] = re, b[14] = ee, b[15] = Yt;
    }
    function $(b, C) {
      O(b, C, C);
    }
    function ut(b, C) {
      var T = t(), w;
      for (w = 0; w < 16; w++)
        T[w] = C[w];
      for (w = 253; w >= 0; w--)
        $(T, T), w !== 2 && w !== 4 && O(T, T, C);
      for (w = 0; w < 16; w++)
        b[w] = T[w];
    }
    function V(b, C) {
      var T = t(), w;
      for (w = 0; w < 16; w++)
        T[w] = C[w];
      for (w = 250; w >= 0; w--)
        $(T, T), w !== 1 && O(T, T, C);
      for (w = 0; w < 16; w++)
        b[w] = T[w];
    }
    function ot(b, C, T) {
      var w = new Uint8Array(32), A = new Float64Array(80), W, R, L = t(), lt = t(), Nt = t(), dt = t(), Jt = t(), Kt = t();
      for (R = 0; R < 31; R++)
        w[R] = C[R];
      for (w[31] = C[31] & 127 | 64, w[0] &= 248, m(A, T), R = 0; R < 16; R++)
        lt[R] = A[R], dt[R] = L[R] = Nt[R] = 0;
      for (L[0] = dt[0] = 1, R = 254; R >= 0; --R)
        W = w[R >>> 3] >>> (R & 7) & 1, l(L, lt, W), l(Nt, dt, W), v(Jt, L, Nt), B(L, L, Nt), v(Nt, lt, dt), B(lt, lt, dt), $(dt, Jt), $(Kt, L), O(L, Nt, L), O(Nt, lt, Jt), v(Jt, L, Nt), B(L, L, Nt), $(lt, L), B(Nt, dt, Kt), O(L, Nt, _), v(L, L, dt), O(Nt, Nt, L), O(L, dt, Kt), O(dt, lt, A), $(lt, Jt), l(L, lt, W), l(Nt, dt, W);
      for (R = 0; R < 16; R++)
        A[R + 16] = L[R], A[R + 32] = Nt[R], A[R + 48] = lt[R], A[R + 64] = dt[R];
      var Xt = A.subarray(32), Qt = A.subarray(16);
      return ut(Xt, Xt), O(Qt, Qt, Xt), i(b, Qt), 0;
    }
    function le(b, C) {
      return ot(b, C, n);
    }
    function St(b, C) {
      return e(C, 32), le(b, C);
    }
    function pt(b, C, T) {
      var w = new Uint8Array(32);
      return ot(w, T, C), j(b, f, w, nt);
    }
    var de = a, zt = s;
    function Et(b, C, T, w, A, W) {
      var R = new Uint8Array(32);
      return pt(R, A, W), de(b, C, T, w, R);
    }
    function ne(b, C, T, w, A, W) {
      var R = new Uint8Array(32);
      return pt(R, A, W), zt(b, C, T, w, R);
    }
    var qt = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
    function _t(b, C, T, w) {
      for (var A = new Int32Array(16), W = new Int32Array(16), R, L, lt, Nt, dt, Jt, Kt, Xt, Qt, se, oe, te, re, ee, Yt, Gt, jt, Ht, Vt, Ot, G, et, At, mt, vt, Rt, he = b[0], ge = b[1], ye = b[2], ve = b[3], z = b[4], Me = b[5], Te = b[6], Fe = b[7], we = C[0], Be = C[1], Se = C[2], Le = C[3], Ie = C[4], Re = C[5], Pe = C[6], De = C[7], ze = 0; w >= 128; ) {
        for (Vt = 0; Vt < 16; Vt++)
          Ot = 8 * Vt + ze, A[Vt] = T[Ot + 0] << 24 | T[Ot + 1] << 16 | T[Ot + 2] << 8 | T[Ot + 3], W[Vt] = T[Ot + 4] << 24 | T[Ot + 5] << 16 | T[Ot + 6] << 8 | T[Ot + 7];
        for (Vt = 0; Vt < 80; Vt++)
          if (R = he, L = ge, lt = ye, Nt = ve, dt = z, Jt = Me, Kt = Te, Xt = Fe, Qt = we, se = Be, oe = Se, te = Le, re = Ie, ee = Re, Yt = Pe, Gt = De, G = Fe, et = De, At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = (z >>> 14 | Ie << 32 - 14) ^ (z >>> 18 | Ie << 32 - 18) ^ (Ie >>> 41 - 32 | z << 32 - (41 - 32)), et = (Ie >>> 14 | z << 32 - 14) ^ (Ie >>> 18 | z << 32 - 18) ^ (z >>> 41 - 32 | Ie << 32 - (41 - 32)), At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, G = z & Me ^ ~z & Te, et = Ie & Re ^ ~Ie & Pe, At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, G = qt[Vt * 2], et = qt[Vt * 2 + 1], At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, G = A[Vt % 16], et = W[Vt % 16], At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, jt = vt & 65535 | Rt << 16, Ht = At & 65535 | mt << 16, G = jt, et = Ht, At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = (he >>> 28 | we << 32 - 28) ^ (we >>> 34 - 32 | he << 32 - (34 - 32)) ^ (we >>> 39 - 32 | he << 32 - (39 - 32)), et = (we >>> 28 | he << 32 - 28) ^ (he >>> 34 - 32 | we << 32 - (34 - 32)) ^ (he >>> 39 - 32 | we << 32 - (39 - 32)), At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, G = he & ge ^ he & ye ^ ge & ye, et = we & Be ^ we & Se ^ Be & Se, At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, Xt = vt & 65535 | Rt << 16, Gt = At & 65535 | mt << 16, G = Nt, et = te, At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = jt, et = Ht, At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, Nt = vt & 65535 | Rt << 16, te = At & 65535 | mt << 16, ge = R, ye = L, ve = lt, z = Nt, Me = dt, Te = Jt, Fe = Kt, he = Xt, Be = Qt, Se = se, Le = oe, Ie = te, Re = re, Pe = ee, De = Yt, we = Gt, Vt % 16 === 15)
            for (Ot = 0; Ot < 16; Ot++)
              G = A[Ot], et = W[Ot], At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = A[(Ot + 9) % 16], et = W[(Ot + 9) % 16], At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, jt = A[(Ot + 1) % 16], Ht = W[(Ot + 1) % 16], G = (jt >>> 1 | Ht << 32 - 1) ^ (jt >>> 8 | Ht << 32 - 8) ^ jt >>> 7, et = (Ht >>> 1 | jt << 32 - 1) ^ (Ht >>> 8 | jt << 32 - 8) ^ (Ht >>> 7 | jt << 32 - 7), At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, jt = A[(Ot + 14) % 16], Ht = W[(Ot + 14) % 16], G = (jt >>> 19 | Ht << 32 - 19) ^ (Ht >>> 61 - 32 | jt << 32 - (61 - 32)) ^ jt >>> 6, et = (Ht >>> 19 | jt << 32 - 19) ^ (jt >>> 61 - 32 | Ht << 32 - (61 - 32)) ^ (Ht >>> 6 | jt << 32 - 6), At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, A[Ot] = vt & 65535 | Rt << 16, W[Ot] = At & 65535 | mt << 16;
        G = he, et = we, At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = b[0], et = C[0], At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, b[0] = he = vt & 65535 | Rt << 16, C[0] = we = At & 65535 | mt << 16, G = ge, et = Be, At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = b[1], et = C[1], At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, b[1] = ge = vt & 65535 | Rt << 16, C[1] = Be = At & 65535 | mt << 16, G = ye, et = Se, At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = b[2], et = C[2], At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, b[2] = ye = vt & 65535 | Rt << 16, C[2] = Se = At & 65535 | mt << 16, G = ve, et = Le, At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = b[3], et = C[3], At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, b[3] = ve = vt & 65535 | Rt << 16, C[3] = Le = At & 65535 | mt << 16, G = z, et = Ie, At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = b[4], et = C[4], At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, b[4] = z = vt & 65535 | Rt << 16, C[4] = Ie = At & 65535 | mt << 16, G = Me, et = Re, At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = b[5], et = C[5], At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, b[5] = Me = vt & 65535 | Rt << 16, C[5] = Re = At & 65535 | mt << 16, G = Te, et = Pe, At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = b[6], et = C[6], At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, b[6] = Te = vt & 65535 | Rt << 16, C[6] = Pe = At & 65535 | mt << 16, G = Fe, et = De, At = et & 65535, mt = et >>> 16, vt = G & 65535, Rt = G >>> 16, G = b[7], et = C[7], At += et & 65535, mt += et >>> 16, vt += G & 65535, Rt += G >>> 16, mt += At >>> 16, vt += mt >>> 16, Rt += vt >>> 16, b[7] = Fe = vt & 65535 | Rt << 16, C[7] = De = At & 65535 | mt << 16, ze += 128, w -= 128;
      }
      return w;
    }
    function fe(b, C, T) {
      var w = new Int32Array(8), A = new Int32Array(8), W = new Uint8Array(256), R, L = T;
      for (w[0] = 1779033703, w[1] = 3144134277, w[2] = 1013904242, w[3] = 2773480762, w[4] = 1359893119, w[5] = 2600822924, w[6] = 528734635, w[7] = 1541459225, A[0] = 4089235720, A[1] = 2227873595, A[2] = 4271175723, A[3] = 1595750129, A[4] = 2917565137, A[5] = 725511199, A[6] = 4215389547, A[7] = 327033209, _t(w, A, C, T), T %= 128, R = 0; R < T; R++)
        W[R] = C[L - T + R];
      for (W[T] = 128, T = 256 - 128 * (T < 112 ? 1 : 0), W[T - 9] = 0, Y(W, T - 8, L / 536870912 | 0, L << 3), _t(w, A, W, T), R = 0; R < 8; R++)
        Y(b, 8 * R, w[R], A[R]);
      return 0;
    }
    function Pt(b, C) {
      var T = t(), w = t(), A = t(), W = t(), R = t(), L = t(), lt = t(), Nt = t(), dt = t();
      B(T, b[1], b[0]), B(dt, C[1], C[0]), O(T, T, dt), v(w, b[0], b[1]), v(dt, C[0], C[1]), O(w, w, dt), O(A, b[3], C[3]), O(A, A, S), O(W, b[2], C[2]), v(W, W, W), B(R, w, T), B(L, W, A), v(lt, W, A), v(Nt, w, T), O(b[0], R, L), O(b[1], Nt, lt), O(b[2], lt, L), O(b[3], R, Nt);
    }
    function bt(b, C, T) {
      var w;
      for (w = 0; w < 4; w++)
        l(b[w], C[w], T);
    }
    function be(b, C) {
      var T = t(), w = t(), A = t();
      ut(A, C[2]), O(T, C[0], A), O(w, C[1], A), i(b, w), b[31] ^= M(T) << 7;
    }
    function kt(b, C, T) {
      var w, A;
      for (h(b[0], g), h(b[1], y), h(b[2], y), h(b[3], g), A = 255; A >= 0; --A)
        w = T[A / 8 | 0] >> (A & 7) & 1, bt(b, C, w), Pt(C, b), Pt(b, b), bt(b, C, w);
    }
    function Mt(b, C) {
      var T = [t(), t(), t(), t()];
      h(T[0], I), h(T[1], F), h(T[2], y), O(T[3], I, F), kt(b, T, C);
    }
    function me(b, C, T) {
      var w = new Uint8Array(64), A = [t(), t(), t(), t()], W;
      for (T || e(C, 32), fe(w, C, 32), w[0] &= 248, w[31] &= 127, w[31] |= 64, Mt(A, w), be(b, A), W = 0; W < 32; W++)
        C[W + 32] = b[W];
      return 0;
    }
    var Lt = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
    function wt(b, C) {
      var T, w, A, W;
      for (w = 63; w >= 32; --w) {
        for (T = 0, A = w - 32, W = w - 12; A < W; ++A)
          C[A] += T - 16 * C[w] * Lt[A - (w - 32)], T = Math.floor((C[A] + 128) / 256), C[A] -= T * 256;
        C[A] += T, C[w] = 0;
      }
      for (T = 0, A = 0; A < 32; A++)
        C[A] += T - (C[31] >> 4) * Lt[A], T = C[A] >> 8, C[A] &= 255;
      for (A = 0; A < 32; A++)
        C[A] -= T * Lt[A];
      for (w = 0; w < 32; w++)
        C[w + 1] += C[w] >> 8, b[w] = C[w] & 255;
    }
    function _e(b) {
      var C = new Float64Array(64), T;
      for (T = 0; T < 64; T++)
        C[T] = b[T];
      for (T = 0; T < 64; T++)
        b[T] = 0;
      wt(b, C);
    }
    function It(b, C, T, w) {
      var A = new Uint8Array(64), W = new Uint8Array(64), R = new Uint8Array(64), L, lt, Nt = new Float64Array(64), dt = [t(), t(), t(), t()];
      fe(A, w, 32), A[0] &= 248, A[31] &= 127, A[31] |= 64;
      var Jt = T + 64;
      for (L = 0; L < T; L++)
        b[64 + L] = C[L];
      for (L = 0; L < 32; L++)
        b[32 + L] = A[32 + L];
      for (fe(R, b.subarray(32), T + 32), _e(R), Mt(dt, R), be(b, dt), L = 32; L < 64; L++)
        b[L] = w[L];
      for (fe(W, b, T + 64), _e(W), L = 0; L < 64; L++)
        Nt[L] = 0;
      for (L = 0; L < 32; L++)
        Nt[L] = R[L];
      for (L = 0; L < 32; L++)
        for (lt = 0; lt < 32; lt++)
          Nt[L + lt] += W[L] * A[lt];
      return wt(b.subarray(32), Nt), Jt;
    }
    function Bt(b, C) {
      var T = t(), w = t(), A = t(), W = t(), R = t(), L = t(), lt = t();
      return h(b[2], y), m(b[1], C), $(A, b[1]), O(W, A, E), B(A, A, b[2]), v(W, b[2], W), $(R, W), $(L, R), O(lt, L, R), O(T, lt, A), O(T, T, W), V(T, T), O(T, T, A), O(T, T, W), O(T, T, W), O(b[0], T, W), $(w, b[0]), O(w, w, W), d(w, A) && O(b[0], b[0], P), $(w, b[0]), O(w, w, W), d(w, A) ? -1 : (M(b[0]) === C[31] >> 7 && B(b[0], g, b[0]), O(b[3], b[0], b[1]), 0);
    }
    function Ee(b, C, T, w) {
      var A, W = new Uint8Array(32), R = new Uint8Array(64), L = [t(), t(), t(), t()], lt = [t(), t(), t(), t()];
      if (T < 64 || Bt(lt, w))
        return -1;
      for (A = 0; A < T; A++)
        b[A] = C[A];
      for (A = 0; A < 32; A++)
        b[A + 32] = w[A];
      if (fe(R, b, T), _e(R), kt(L, lt, R), Mt(lt, C.subarray(32)), Pt(L, lt), be(W, L), T -= 64, k(C, 0, W, 0)) {
        for (A = 0; A < T; A++)
          b[A] = 0;
        return -1;
      }
      for (A = 0; A < T; A++)
        b[A] = C[A + 64];
      return T;
    }
    var Wt = 32, yt = 24, xe = 32, Ut = 16, gt = 32, Ae = 32, Dt = 32, xt = 32, D = 32, N = yt, U = xe, st = Ut, H = 64, J = 32, Ft = 64, ht = 32, tt = 64;
    r3.lowlevel = { crypto_core_hsalsa20: j, crypto_stream_xor: x, crypto_stream: $t, crypto_stream_salsa20_xor: ft, crypto_stream_salsa20: Q, crypto_onetimeauth: u, crypto_onetimeauth_verify: c, crypto_verify_16: Z, crypto_verify_32: k, crypto_secretbox: a, crypto_secretbox_open: s, crypto_scalarmult: ot, crypto_scalarmult_base: le, crypto_box_beforenm: pt, crypto_box_afternm: de, crypto_box: Et, crypto_box_open: ne, crypto_box_keypair: St, crypto_hash: fe, crypto_sign: It, crypto_sign_keypair: me, crypto_sign_open: Ee, crypto_secretbox_KEYBYTES: Wt, crypto_secretbox_NONCEBYTES: yt, crypto_secretbox_ZEROBYTES: xe, crypto_secretbox_BOXZEROBYTES: Ut, crypto_scalarmult_BYTES: gt, crypto_scalarmult_SCALARBYTES: Ae, crypto_box_PUBLICKEYBYTES: Dt, crypto_box_SECRETKEYBYTES: xt, crypto_box_BEFORENMBYTES: D, crypto_box_NONCEBYTES: N, crypto_box_ZEROBYTES: U, crypto_box_BOXZEROBYTES: st, crypto_sign_BYTES: H, crypto_sign_PUBLICKEYBYTES: J, crypto_sign_SECRETKEYBYTES: Ft, crypto_sign_SEEDBYTES: ht, crypto_hash_BYTES: tt, gf: t, D: E, L: Lt, pack25519: i, unpack25519: m, M: O, A: v, S: $, Z: B, pow2523: V, add: Pt, set25519: h, modL: wt, scalarmult: kt, scalarbase: Mt };
    function Zt(b, C) {
      if (b.length !== Wt)
        throw new Error("bad key size");
      if (C.length !== yt)
        throw new Error("bad nonce size");
    }
    function Ct(b, C) {
      if (b.length !== Dt)
        throw new Error("bad public key size");
      if (C.length !== xt)
        throw new Error("bad secret key size");
    }
    function at() {
      for (var b = 0; b < arguments.length; b++)
        if (!(arguments[b] instanceof Uint8Array))
          throw new TypeError("unexpected type, use Uint8Array");
    }
    function ce(b) {
      for (var C = 0; C < b.length; C++)
        b[C] = 0;
    }
    r3.randomBytes = function(b) {
      var C = new Uint8Array(b);
      return e(C, b), C;
    }, r3.secretbox = function(b, C, T) {
      at(b, C, T), Zt(T, C);
      for (var w = new Uint8Array(xe + b.length), A = new Uint8Array(w.length), W = 0; W < b.length; W++)
        w[W + xe] = b[W];
      return a(A, w, w.length, C, T), A.subarray(Ut);
    }, r3.secretbox.open = function(b, C, T) {
      at(b, C, T), Zt(T, C);
      for (var w = new Uint8Array(Ut + b.length), A = new Uint8Array(w.length), W = 0; W < b.length; W++)
        w[W + Ut] = b[W];
      return w.length < 32 || s(A, w, w.length, C, T) !== 0 ? null : A.subarray(xe);
    }, r3.secretbox.keyLength = Wt, r3.secretbox.nonceLength = yt, r3.secretbox.overheadLength = Ut, r3.scalarMult = function(b, C) {
      if (at(b, C), b.length !== Ae)
        throw new Error("bad n size");
      if (C.length !== gt)
        throw new Error("bad p size");
      var T = new Uint8Array(gt);
      return ot(T, b, C), T;
    }, r3.scalarMult.base = function(b) {
      if (at(b), b.length !== Ae)
        throw new Error("bad n size");
      var C = new Uint8Array(gt);
      return le(C, b), C;
    }, r3.scalarMult.scalarLength = Ae, r3.scalarMult.groupElementLength = gt, r3.box = function(b, C, T, w) {
      var A = r3.box.before(T, w);
      return r3.secretbox(b, C, A);
    }, r3.box.before = function(b, C) {
      at(b, C), Ct(b, C);
      var T = new Uint8Array(D);
      return pt(T, b, C), T;
    }, r3.box.after = r3.secretbox, r3.box.open = function(b, C, T, w) {
      var A = r3.box.before(T, w);
      return r3.secretbox.open(b, C, A);
    }, r3.box.open.after = r3.secretbox.open, r3.box.keyPair = function() {
      var b = new Uint8Array(Dt), C = new Uint8Array(xt);
      return St(b, C), { publicKey: b, secretKey: C };
    }, r3.box.keyPair.fromSecretKey = function(b) {
      if (at(b), b.length !== xt)
        throw new Error("bad secret key size");
      var C = new Uint8Array(Dt);
      return le(C, b), { publicKey: C, secretKey: new Uint8Array(b) };
    }, r3.box.publicKeyLength = Dt, r3.box.secretKeyLength = xt, r3.box.sharedKeyLength = D, r3.box.nonceLength = N, r3.box.overheadLength = r3.secretbox.overheadLength, r3.sign = function(b, C) {
      if (at(b, C), C.length !== Ft)
        throw new Error("bad secret key size");
      var T = new Uint8Array(H + b.length);
      return It(T, b, b.length, C), T;
    }, r3.sign.open = function(b, C) {
      if (at(b, C), C.length !== J)
        throw new Error("bad public key size");
      var T = new Uint8Array(b.length), w = Ee(T, b, b.length, C);
      if (w < 0)
        return null;
      for (var A = new Uint8Array(w), W = 0; W < A.length; W++)
        A[W] = T[W];
      return A;
    }, r3.sign.detached = function(b, C) {
      for (var T = r3.sign(b, C), w = new Uint8Array(H), A = 0; A < w.length; A++)
        w[A] = T[A];
      return w;
    }, r3.sign.detached.verify = function(b, C, T) {
      if (at(b, C, T), C.length !== H)
        throw new Error("bad signature size");
      if (T.length !== J)
        throw new Error("bad public key size");
      var w = new Uint8Array(H + b.length), A = new Uint8Array(H + b.length), W;
      for (W = 0; W < H; W++)
        w[W] = C[W];
      for (W = 0; W < b.length; W++)
        w[W + H] = b[W];
      return Ee(A, w, w.length, T) >= 0;
    }, r3.sign.keyPair = function() {
      var b = new Uint8Array(J), C = new Uint8Array(Ft);
      return me(b, C), { publicKey: b, secretKey: C };
    }, r3.sign.keyPair.fromSecretKey = function(b) {
      if (at(b), b.length !== Ft)
        throw new Error("bad secret key size");
      for (var C = new Uint8Array(J), T = 0; T < C.length; T++)
        C[T] = b[32 + T];
      return { publicKey: C, secretKey: new Uint8Array(b) };
    }, r3.sign.keyPair.fromSeed = function(b) {
      if (at(b), b.length !== ht)
        throw new Error("bad seed size");
      for (var C = new Uint8Array(J), T = new Uint8Array(Ft), w = 0; w < 32; w++)
        T[w] = b[w];
      return me(C, T, true), { publicKey: C, secretKey: T };
    }, r3.sign.publicKeyLength = J, r3.sign.secretKeyLength = Ft, r3.sign.seedLength = ht, r3.sign.signatureLength = H, r3.hash = function(b) {
      at(b);
      var C = new Uint8Array(tt);
      return fe(C, b, b.length), C;
    }, r3.hash.hashLength = tt, r3.verify = function(b, C) {
      return at(b, C), b.length === 0 || C.length === 0 || b.length !== C.length ? false : K(b, 0, C, 0, b.length) === 0;
    }, r3.setPRNG = function(b) {
      e = b;
    }, function() {
      var b = typeof self != "undefined" ? self.crypto || self.msCrypto : null;
      if (b && b.getRandomValues) {
        var C = 65536;
        r3.setPRNG(function(T, w) {
          var A, W = new Uint8Array(w);
          for (A = 0; A < w; A += C)
            b.getRandomValues(W.subarray(A, A + Math.min(w - A, C)));
          for (A = 0; A < w; A++)
            T[A] = W[A];
          ce(W);
        });
      } else
        typeof t0 != "undefined" && (b = zl(), b && b.randomBytes && r3.setPRNG(function(T, w) {
          var A, W = b.randomBytes(w);
          for (A = 0; A < w; A++)
            T[A] = W[A];
          ce(W);
        }));
    }();
  })(typeof Io != "undefined" && Io.exports ? Io.exports : self.nacl = self.nacl || {});
});
var $l = ae((jl, pa) => {
  (function(r3, t) {
    function e(x, o) {
      if (!x)
        throw new Error(o || "Assertion failed");
    }
    function f(x, o) {
      x.super_ = o;
      var u = function() {
      };
      u.prototype = o.prototype, x.prototype = new u(), x.prototype.constructor = x;
    }
    function n(x, o, u) {
      if (n.isBN(x))
        return x;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, x !== null && ((o === "le" || o === "be") && (u = o, o = 10), this._init(x || 0, o || 10, u || "be"));
    }
    typeof r3 == "object" ? r3.exports = n : t.BN = n, n.BN = n, n.wordSize = 26;
    var g;
    try {
      g = qi().Buffer;
    } catch (x) {
    }
    n.isBN = function(o) {
      return o instanceof n ? true : o !== null && typeof o == "object" && o.constructor.wordSize === n.wordSize && Array.isArray(o.words);
    }, n.max = function(o, u) {
      return o.cmp(u) > 0 ? o : u;
    }, n.min = function(o, u) {
      return o.cmp(u) < 0 ? o : u;
    }, n.prototype._init = function(o, u, c) {
      if (typeof o == "number")
        return this._initNumber(o, u, c);
      if (typeof o == "object")
        return this._initArray(o, u, c);
      u === "hex" && (u = 16), e(u === (u | 0) && u >= 2 && u <= 36), o = o.toString().replace(/\s+/g, "");
      var a = 0;
      o[0] === "-" && a++, u === 16 ? this._parseHex(o, a) : this._parseBase(o, u, a), o[0] === "-" && (this.negative = 1), this.strip(), c === "le" && this._initArray(this.toArray(), u, c);
    }, n.prototype._initNumber = function(o, u, c) {
      o < 0 && (this.negative = 1, o = -o), o < 67108864 ? (this.words = [o & 67108863], this.length = 1) : o < 4503599627370496 ? (this.words = [o & 67108863, o / 67108864 & 67108863], this.length = 2) : (e(o < 9007199254740992), this.words = [o & 67108863, o / 67108864 & 67108863, 1], this.length = 3), c === "le" && this._initArray(this.toArray(), u, c);
    }, n.prototype._initArray = function(o, u, c) {
      if (e(typeof o.length == "number"), o.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(o.length / 3), this.words = new Array(this.length);
      for (var a = 0; a < this.length; a++)
        this.words[a] = 0;
      var s, h, p = 0;
      if (c === "be")
        for (a = o.length - 1, s = 0; a >= 0; a -= 3)
          h = o[a] | o[a - 1] << 8 | o[a - 2] << 16, this.words[s] |= h << p & 67108863, this.words[s + 1] = h >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, s++);
      else if (c === "le")
        for (a = 0, s = 0; a < o.length; a += 3)
          h = o[a] | o[a + 1] << 8 | o[a + 2] << 16, this.words[s] |= h << p & 67108863, this.words[s + 1] = h >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, s++);
      return this.strip();
    };
    function y(x, o, u) {
      for (var c = 0, a = Math.min(x.length, u), s = o; s < a; s++) {
        var h = x.charCodeAt(s) - 48;
        c <<= 4, h >= 49 && h <= 54 ? c |= h - 49 + 10 : h >= 17 && h <= 22 ? c |= h - 17 + 10 : c |= h & 15;
      }
      return c;
    }
    n.prototype._parseHex = function(o, u) {
      this.length = Math.ceil((o.length - u) / 6), this.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        this.words[c] = 0;
      var a, s, h = 0;
      for (c = o.length - 6, a = 0; c >= u; c -= 6)
        s = y(o, c, c + 6), this.words[a] |= s << h & 67108863, this.words[a + 1] |= s >>> 26 - h & 4194303, h += 24, h >= 26 && (h -= 26, a++);
      c + 6 !== u && (s = y(o, u, c + 6), this.words[a] |= s << h & 67108863, this.words[a + 1] |= s >>> 26 - h & 4194303), this.strip();
    };
    function _(x, o, u, c) {
      for (var a = 0, s = Math.min(x.length, u), h = o; h < s; h++) {
        var p = x.charCodeAt(h) - 48;
        a *= c, p >= 49 ? a += p - 49 + 10 : p >= 17 ? a += p - 17 + 10 : a += p;
      }
      return a;
    }
    n.prototype._parseBase = function(o, u, c) {
      this.words = [0], this.length = 1;
      for (var a = 0, s = 1; s <= 67108863; s *= u)
        a++;
      a--, s = s / u | 0;
      for (var h = o.length - c, p = h % a, l = Math.min(h, h - p) + c, i = 0, d = c; d < l; d += a)
        i = _(o, d, d + a, u), this.imuln(s), this.words[0] + i < 67108864 ? this.words[0] += i : this._iaddn(i);
      if (p !== 0) {
        var M = 1;
        for (i = _(o, d, o.length, u), d = 0; d < p; d++)
          M *= u;
        this.imuln(M), this.words[0] + i < 67108864 ? this.words[0] += i : this._iaddn(i);
      }
    }, n.prototype.copy = function(o) {
      o.words = new Array(this.length);
      for (var u = 0; u < this.length; u++)
        o.words[u] = this.words[u];
      o.length = this.length, o.negative = this.negative, o.red = this.red;
    }, n.prototype.clone = function() {
      var o = new n(null);
      return this.copy(o), o;
    }, n.prototype._expand = function(o) {
      for (; this.length < o; )
        this.words[this.length++] = 0;
      return this;
    }, n.prototype.strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, n.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, n.prototype.inspect = function() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    };
    var E = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], S = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], I = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    n.prototype.toString = function(o, u) {
      o = o || 10, u = u | 0 || 1;
      var c;
      if (o === 16 || o === "hex") {
        c = "";
        for (var a = 0, s = 0, h = 0; h < this.length; h++) {
          var p = this.words[h], l = ((p << a | s) & 16777215).toString(16);
          s = p >>> 24 - a & 16777215, s !== 0 || h !== this.length - 1 ? c = E[6 - l.length] + l + c : c = l + c, a += 2, a >= 26 && (a -= 26, h--);
        }
        for (s !== 0 && (c = s.toString(16) + c); c.length % u !== 0; )
          c = "0" + c;
        return this.negative !== 0 && (c = "-" + c), c;
      }
      if (o === (o | 0) && o >= 2 && o <= 36) {
        var i = S[o], d = I[o];
        c = "";
        var M = this.clone();
        for (M.negative = 0; !M.isZero(); ) {
          var m = M.modn(d).toString(o);
          M = M.idivn(d), M.isZero() ? c = m + c : c = E[i - m.length] + m + c;
        }
        for (this.isZero() && (c = "0" + c); c.length % u !== 0; )
          c = "0" + c;
        return this.negative !== 0 && (c = "-" + c), c;
      }
      e(false, "Base should be between 2 and 36");
    }, n.prototype.toNumber = function() {
      var o = this.words[0];
      return this.length === 2 ? o += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? o += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && e(false, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -o : o;
    }, n.prototype.toJSON = function() {
      return this.toString(16);
    }, n.prototype.toBuffer = function(o, u) {
      return e(typeof g != "undefined"), this.toArrayLike(g, o, u);
    }, n.prototype.toArray = function(o, u) {
      return this.toArrayLike(Array, o, u);
    }, n.prototype.toArrayLike = function(o, u, c) {
      var a = this.byteLength(), s = c || Math.max(1, a);
      e(a <= s, "byte array longer than desired length"), e(s > 0, "Requested array length <= 0"), this.strip();
      var h = u === "le", p = new o(s), l, i, d = this.clone();
      if (h) {
        for (i = 0; !d.isZero(); i++)
          l = d.andln(255), d.iushrn(8), p[i] = l;
        for (; i < s; i++)
          p[i] = 0;
      } else {
        for (i = 0; i < s - a; i++)
          p[i] = 0;
        for (i = 0; !d.isZero(); i++)
          l = d.andln(255), d.iushrn(8), p[s - i - 1] = l;
      }
      return p;
    }, Math.clz32 ? n.prototype._countBits = function(o) {
      return 32 - Math.clz32(o);
    } : n.prototype._countBits = function(o) {
      var u = o, c = 0;
      return u >= 4096 && (c += 13, u >>>= 13), u >= 64 && (c += 7, u >>>= 7), u >= 8 && (c += 4, u >>>= 4), u >= 2 && (c += 2, u >>>= 2), c + u;
    }, n.prototype._zeroBits = function(o) {
      if (o === 0)
        return 26;
      var u = o, c = 0;
      return u & 8191 || (c += 13, u >>>= 13), u & 127 || (c += 7, u >>>= 7), u & 15 || (c += 4, u >>>= 4), u & 3 || (c += 2, u >>>= 2), u & 1 || c++, c;
    }, n.prototype.bitLength = function() {
      var o = this.words[this.length - 1], u = this._countBits(o);
      return (this.length - 1) * 26 + u;
    };
    function F(x) {
      for (var o = new Array(x.bitLength()), u = 0; u < o.length; u++) {
        var c = u / 26 | 0, a = u % 26;
        o[u] = (x.words[c] & 1 << a) >>> a;
      }
      return o;
    }
    n.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var o = 0, u = 0; u < this.length; u++) {
        var c = this._zeroBits(this.words[u]);
        if (o += c, c !== 26)
          break;
      }
      return o;
    }, n.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, n.prototype.toTwos = function(o) {
      return this.negative !== 0 ? this.abs().inotn(o).iaddn(1) : this.clone();
    }, n.prototype.fromTwos = function(o) {
      return this.testn(o - 1) ? this.notn(o).iaddn(1).ineg() : this.clone();
    }, n.prototype.isNeg = function() {
      return this.negative !== 0;
    }, n.prototype.neg = function() {
      return this.clone().ineg();
    }, n.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, n.prototype.iuor = function(o) {
      for (; this.length < o.length; )
        this.words[this.length++] = 0;
      for (var u = 0; u < o.length; u++)
        this.words[u] = this.words[u] | o.words[u];
      return this.strip();
    }, n.prototype.ior = function(o) {
      return e((this.negative | o.negative) === 0), this.iuor(o);
    }, n.prototype.or = function(o) {
      return this.length > o.length ? this.clone().ior(o) : o.clone().ior(this);
    }, n.prototype.uor = function(o) {
      return this.length > o.length ? this.clone().iuor(o) : o.clone().iuor(this);
    }, n.prototype.iuand = function(o) {
      var u;
      this.length > o.length ? u = o : u = this;
      for (var c = 0; c < u.length; c++)
        this.words[c] = this.words[c] & o.words[c];
      return this.length = u.length, this.strip();
    }, n.prototype.iand = function(o) {
      return e((this.negative | o.negative) === 0), this.iuand(o);
    }, n.prototype.and = function(o) {
      return this.length > o.length ? this.clone().iand(o) : o.clone().iand(this);
    }, n.prototype.uand = function(o) {
      return this.length > o.length ? this.clone().iuand(o) : o.clone().iuand(this);
    }, n.prototype.iuxor = function(o) {
      var u, c;
      this.length > o.length ? (u = this, c = o) : (u = o, c = this);
      for (var a = 0; a < c.length; a++)
        this.words[a] = u.words[a] ^ c.words[a];
      if (this !== u)
        for (; a < u.length; a++)
          this.words[a] = u.words[a];
      return this.length = u.length, this.strip();
    }, n.prototype.ixor = function(o) {
      return e((this.negative | o.negative) === 0), this.iuxor(o);
    }, n.prototype.xor = function(o) {
      return this.length > o.length ? this.clone().ixor(o) : o.clone().ixor(this);
    }, n.prototype.uxor = function(o) {
      return this.length > o.length ? this.clone().iuxor(o) : o.clone().iuxor(this);
    }, n.prototype.inotn = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = Math.ceil(o / 26) | 0, c = o % 26;
      this._expand(u), c > 0 && u--;
      for (var a = 0; a < u; a++)
        this.words[a] = ~this.words[a] & 67108863;
      return c > 0 && (this.words[a] = ~this.words[a] & 67108863 >> 26 - c), this.strip();
    }, n.prototype.notn = function(o) {
      return this.clone().inotn(o);
    }, n.prototype.setn = function(o, u) {
      e(typeof o == "number" && o >= 0);
      var c = o / 26 | 0, a = o % 26;
      return this._expand(c + 1), u ? this.words[c] = this.words[c] | 1 << a : this.words[c] = this.words[c] & ~(1 << a), this.strip();
    }, n.prototype.iadd = function(o) {
      var u;
      if (this.negative !== 0 && o.negative === 0)
        return this.negative = 0, u = this.isub(o), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && o.negative !== 0)
        return o.negative = 0, u = this.isub(o), o.negative = 1, u._normSign();
      var c, a;
      this.length > o.length ? (c = this, a = o) : (c = o, a = this);
      for (var s = 0, h = 0; h < a.length; h++)
        u = (c.words[h] | 0) + (a.words[h] | 0) + s, this.words[h] = u & 67108863, s = u >>> 26;
      for (; s !== 0 && h < c.length; h++)
        u = (c.words[h] | 0) + s, this.words[h] = u & 67108863, s = u >>> 26;
      if (this.length = c.length, s !== 0)
        this.words[this.length] = s, this.length++;
      else if (c !== this)
        for (; h < c.length; h++)
          this.words[h] = c.words[h];
      return this;
    }, n.prototype.add = function(o) {
      var u;
      return o.negative !== 0 && this.negative === 0 ? (o.negative = 0, u = this.sub(o), o.negative ^= 1, u) : o.negative === 0 && this.negative !== 0 ? (this.negative = 0, u = o.sub(this), this.negative = 1, u) : this.length > o.length ? this.clone().iadd(o) : o.clone().iadd(this);
    }, n.prototype.isub = function(o) {
      if (o.negative !== 0) {
        o.negative = 0;
        var u = this.iadd(o);
        return o.negative = 1, u._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(o), this.negative = 1, this._normSign();
      var c = this.cmp(o);
      if (c === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var a, s;
      c > 0 ? (a = this, s = o) : (a = o, s = this);
      for (var h = 0, p = 0; p < s.length; p++)
        u = (a.words[p] | 0) - (s.words[p] | 0) + h, h = u >> 26, this.words[p] = u & 67108863;
      for (; h !== 0 && p < a.length; p++)
        u = (a.words[p] | 0) + h, h = u >> 26, this.words[p] = u & 67108863;
      if (h === 0 && p < a.length && a !== this)
        for (; p < a.length; p++)
          this.words[p] = a.words[p];
      return this.length = Math.max(this.length, p), a !== this && (this.negative = 1), this.strip();
    }, n.prototype.sub = function(o) {
      return this.clone().isub(o);
    };
    function P(x, o, u) {
      u.negative = o.negative ^ x.negative;
      var c = x.length + o.length | 0;
      u.length = c, c = c - 1 | 0;
      var a = x.words[0] | 0, s = o.words[0] | 0, h = a * s, p = h & 67108863, l = h / 67108864 | 0;
      u.words[0] = p;
      for (var i = 1; i < c; i++) {
        for (var d = l >>> 26, M = l & 67108863, m = Math.min(i, o.length - 1), v = Math.max(0, i - x.length + 1); v <= m; v++) {
          var B = i - v | 0;
          a = x.words[B] | 0, s = o.words[v] | 0, h = a * s + M, d += h / 67108864 | 0, M = h & 67108863;
        }
        u.words[i] = M | 0, l = d | 0;
      }
      return l !== 0 ? u.words[i] = l | 0 : u.length--, u.strip();
    }
    var Y = function(o, u, c) {
      var a = o.words, s = u.words, h = c.words, p = 0, l, i, d, M = a[0] | 0, m = M & 8191, v = M >>> 13, B = a[1] | 0, O = B & 8191, $ = B >>> 13, ut = a[2] | 0, V = ut & 8191, ot = ut >>> 13, le = a[3] | 0, St = le & 8191, pt = le >>> 13, de = a[4] | 0, zt = de & 8191, Et = de >>> 13, ne = a[5] | 0, qt = ne & 8191, _t = ne >>> 13, fe = a[6] | 0, Pt = fe & 8191, bt = fe >>> 13, be = a[7] | 0, kt = be & 8191, Mt = be >>> 13, me = a[8] | 0, Lt = me & 8191, wt = me >>> 13, _e = a[9] | 0, It = _e & 8191, Bt = _e >>> 13, Ee = s[0] | 0, Wt = Ee & 8191, yt = Ee >>> 13, xe = s[1] | 0, Ut = xe & 8191, gt = xe >>> 13, Ae = s[2] | 0, Dt = Ae & 8191, xt = Ae >>> 13, D = s[3] | 0, N = D & 8191, U = D >>> 13, st = s[4] | 0, H = st & 8191, J = st >>> 13, Ft = s[5] | 0, ht = Ft & 8191, tt = Ft >>> 13, Zt = s[6] | 0, Ct = Zt & 8191, at = Zt >>> 13, ce = s[7] | 0, b = ce & 8191, C = ce >>> 13, T = s[8] | 0, w = T & 8191, A = T >>> 13, W = s[9] | 0, R = W & 8191, L = W >>> 13;
      c.negative = o.negative ^ u.negative, c.length = 19, l = Math.imul(m, Wt), i = Math.imul(m, yt), i = i + Math.imul(v, Wt) | 0, d = Math.imul(v, yt);
      var lt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (lt >>> 26) | 0, lt &= 67108863, l = Math.imul(O, Wt), i = Math.imul(O, yt), i = i + Math.imul($, Wt) | 0, d = Math.imul($, yt), l = l + Math.imul(m, Ut) | 0, i = i + Math.imul(m, gt) | 0, i = i + Math.imul(v, Ut) | 0, d = d + Math.imul(v, gt) | 0;
      var Nt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, l = Math.imul(V, Wt), i = Math.imul(V, yt), i = i + Math.imul(ot, Wt) | 0, d = Math.imul(ot, yt), l = l + Math.imul(O, Ut) | 0, i = i + Math.imul(O, gt) | 0, i = i + Math.imul($, Ut) | 0, d = d + Math.imul($, gt) | 0, l = l + Math.imul(m, Dt) | 0, i = i + Math.imul(m, xt) | 0, i = i + Math.imul(v, Dt) | 0, d = d + Math.imul(v, xt) | 0;
      var dt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (dt >>> 26) | 0, dt &= 67108863, l = Math.imul(St, Wt), i = Math.imul(St, yt), i = i + Math.imul(pt, Wt) | 0, d = Math.imul(pt, yt), l = l + Math.imul(V, Ut) | 0, i = i + Math.imul(V, gt) | 0, i = i + Math.imul(ot, Ut) | 0, d = d + Math.imul(ot, gt) | 0, l = l + Math.imul(O, Dt) | 0, i = i + Math.imul(O, xt) | 0, i = i + Math.imul($, Dt) | 0, d = d + Math.imul($, xt) | 0, l = l + Math.imul(m, N) | 0, i = i + Math.imul(m, U) | 0, i = i + Math.imul(v, N) | 0, d = d + Math.imul(v, U) | 0;
      var Jt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Jt >>> 26) | 0, Jt &= 67108863, l = Math.imul(zt, Wt), i = Math.imul(zt, yt), i = i + Math.imul(Et, Wt) | 0, d = Math.imul(Et, yt), l = l + Math.imul(St, Ut) | 0, i = i + Math.imul(St, gt) | 0, i = i + Math.imul(pt, Ut) | 0, d = d + Math.imul(pt, gt) | 0, l = l + Math.imul(V, Dt) | 0, i = i + Math.imul(V, xt) | 0, i = i + Math.imul(ot, Dt) | 0, d = d + Math.imul(ot, xt) | 0, l = l + Math.imul(O, N) | 0, i = i + Math.imul(O, U) | 0, i = i + Math.imul($, N) | 0, d = d + Math.imul($, U) | 0, l = l + Math.imul(m, H) | 0, i = i + Math.imul(m, J) | 0, i = i + Math.imul(v, H) | 0, d = d + Math.imul(v, J) | 0;
      var Kt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Kt >>> 26) | 0, Kt &= 67108863, l = Math.imul(qt, Wt), i = Math.imul(qt, yt), i = i + Math.imul(_t, Wt) | 0, d = Math.imul(_t, yt), l = l + Math.imul(zt, Ut) | 0, i = i + Math.imul(zt, gt) | 0, i = i + Math.imul(Et, Ut) | 0, d = d + Math.imul(Et, gt) | 0, l = l + Math.imul(St, Dt) | 0, i = i + Math.imul(St, xt) | 0, i = i + Math.imul(pt, Dt) | 0, d = d + Math.imul(pt, xt) | 0, l = l + Math.imul(V, N) | 0, i = i + Math.imul(V, U) | 0, i = i + Math.imul(ot, N) | 0, d = d + Math.imul(ot, U) | 0, l = l + Math.imul(O, H) | 0, i = i + Math.imul(O, J) | 0, i = i + Math.imul($, H) | 0, d = d + Math.imul($, J) | 0, l = l + Math.imul(m, ht) | 0, i = i + Math.imul(m, tt) | 0, i = i + Math.imul(v, ht) | 0, d = d + Math.imul(v, tt) | 0;
      var Xt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Xt >>> 26) | 0, Xt &= 67108863, l = Math.imul(Pt, Wt), i = Math.imul(Pt, yt), i = i + Math.imul(bt, Wt) | 0, d = Math.imul(bt, yt), l = l + Math.imul(qt, Ut) | 0, i = i + Math.imul(qt, gt) | 0, i = i + Math.imul(_t, Ut) | 0, d = d + Math.imul(_t, gt) | 0, l = l + Math.imul(zt, Dt) | 0, i = i + Math.imul(zt, xt) | 0, i = i + Math.imul(Et, Dt) | 0, d = d + Math.imul(Et, xt) | 0, l = l + Math.imul(St, N) | 0, i = i + Math.imul(St, U) | 0, i = i + Math.imul(pt, N) | 0, d = d + Math.imul(pt, U) | 0, l = l + Math.imul(V, H) | 0, i = i + Math.imul(V, J) | 0, i = i + Math.imul(ot, H) | 0, d = d + Math.imul(ot, J) | 0, l = l + Math.imul(O, ht) | 0, i = i + Math.imul(O, tt) | 0, i = i + Math.imul($, ht) | 0, d = d + Math.imul($, tt) | 0, l = l + Math.imul(m, Ct) | 0, i = i + Math.imul(m, at) | 0, i = i + Math.imul(v, Ct) | 0, d = d + Math.imul(v, at) | 0;
      var Qt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Qt >>> 26) | 0, Qt &= 67108863, l = Math.imul(kt, Wt), i = Math.imul(kt, yt), i = i + Math.imul(Mt, Wt) | 0, d = Math.imul(Mt, yt), l = l + Math.imul(Pt, Ut) | 0, i = i + Math.imul(Pt, gt) | 0, i = i + Math.imul(bt, Ut) | 0, d = d + Math.imul(bt, gt) | 0, l = l + Math.imul(qt, Dt) | 0, i = i + Math.imul(qt, xt) | 0, i = i + Math.imul(_t, Dt) | 0, d = d + Math.imul(_t, xt) | 0, l = l + Math.imul(zt, N) | 0, i = i + Math.imul(zt, U) | 0, i = i + Math.imul(Et, N) | 0, d = d + Math.imul(Et, U) | 0, l = l + Math.imul(St, H) | 0, i = i + Math.imul(St, J) | 0, i = i + Math.imul(pt, H) | 0, d = d + Math.imul(pt, J) | 0, l = l + Math.imul(V, ht) | 0, i = i + Math.imul(V, tt) | 0, i = i + Math.imul(ot, ht) | 0, d = d + Math.imul(ot, tt) | 0, l = l + Math.imul(O, Ct) | 0, i = i + Math.imul(O, at) | 0, i = i + Math.imul($, Ct) | 0, d = d + Math.imul($, at) | 0, l = l + Math.imul(m, b) | 0, i = i + Math.imul(m, C) | 0, i = i + Math.imul(v, b) | 0, d = d + Math.imul(v, C) | 0;
      var se = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (se >>> 26) | 0, se &= 67108863, l = Math.imul(Lt, Wt), i = Math.imul(Lt, yt), i = i + Math.imul(wt, Wt) | 0, d = Math.imul(wt, yt), l = l + Math.imul(kt, Ut) | 0, i = i + Math.imul(kt, gt) | 0, i = i + Math.imul(Mt, Ut) | 0, d = d + Math.imul(Mt, gt) | 0, l = l + Math.imul(Pt, Dt) | 0, i = i + Math.imul(Pt, xt) | 0, i = i + Math.imul(bt, Dt) | 0, d = d + Math.imul(bt, xt) | 0, l = l + Math.imul(qt, N) | 0, i = i + Math.imul(qt, U) | 0, i = i + Math.imul(_t, N) | 0, d = d + Math.imul(_t, U) | 0, l = l + Math.imul(zt, H) | 0, i = i + Math.imul(zt, J) | 0, i = i + Math.imul(Et, H) | 0, d = d + Math.imul(Et, J) | 0, l = l + Math.imul(St, ht) | 0, i = i + Math.imul(St, tt) | 0, i = i + Math.imul(pt, ht) | 0, d = d + Math.imul(pt, tt) | 0, l = l + Math.imul(V, Ct) | 0, i = i + Math.imul(V, at) | 0, i = i + Math.imul(ot, Ct) | 0, d = d + Math.imul(ot, at) | 0, l = l + Math.imul(O, b) | 0, i = i + Math.imul(O, C) | 0, i = i + Math.imul($, b) | 0, d = d + Math.imul($, C) | 0, l = l + Math.imul(m, w) | 0, i = i + Math.imul(m, A) | 0, i = i + Math.imul(v, w) | 0, d = d + Math.imul(v, A) | 0;
      var oe = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (oe >>> 26) | 0, oe &= 67108863, l = Math.imul(It, Wt), i = Math.imul(It, yt), i = i + Math.imul(Bt, Wt) | 0, d = Math.imul(Bt, yt), l = l + Math.imul(Lt, Ut) | 0, i = i + Math.imul(Lt, gt) | 0, i = i + Math.imul(wt, Ut) | 0, d = d + Math.imul(wt, gt) | 0, l = l + Math.imul(kt, Dt) | 0, i = i + Math.imul(kt, xt) | 0, i = i + Math.imul(Mt, Dt) | 0, d = d + Math.imul(Mt, xt) | 0, l = l + Math.imul(Pt, N) | 0, i = i + Math.imul(Pt, U) | 0, i = i + Math.imul(bt, N) | 0, d = d + Math.imul(bt, U) | 0, l = l + Math.imul(qt, H) | 0, i = i + Math.imul(qt, J) | 0, i = i + Math.imul(_t, H) | 0, d = d + Math.imul(_t, J) | 0, l = l + Math.imul(zt, ht) | 0, i = i + Math.imul(zt, tt) | 0, i = i + Math.imul(Et, ht) | 0, d = d + Math.imul(Et, tt) | 0, l = l + Math.imul(St, Ct) | 0, i = i + Math.imul(St, at) | 0, i = i + Math.imul(pt, Ct) | 0, d = d + Math.imul(pt, at) | 0, l = l + Math.imul(V, b) | 0, i = i + Math.imul(V, C) | 0, i = i + Math.imul(ot, b) | 0, d = d + Math.imul(ot, C) | 0, l = l + Math.imul(O, w) | 0, i = i + Math.imul(O, A) | 0, i = i + Math.imul($, w) | 0, d = d + Math.imul($, A) | 0, l = l + Math.imul(m, R) | 0, i = i + Math.imul(m, L) | 0, i = i + Math.imul(v, R) | 0, d = d + Math.imul(v, L) | 0;
      var te = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (te >>> 26) | 0, te &= 67108863, l = Math.imul(It, Ut), i = Math.imul(It, gt), i = i + Math.imul(Bt, Ut) | 0, d = Math.imul(Bt, gt), l = l + Math.imul(Lt, Dt) | 0, i = i + Math.imul(Lt, xt) | 0, i = i + Math.imul(wt, Dt) | 0, d = d + Math.imul(wt, xt) | 0, l = l + Math.imul(kt, N) | 0, i = i + Math.imul(kt, U) | 0, i = i + Math.imul(Mt, N) | 0, d = d + Math.imul(Mt, U) | 0, l = l + Math.imul(Pt, H) | 0, i = i + Math.imul(Pt, J) | 0, i = i + Math.imul(bt, H) | 0, d = d + Math.imul(bt, J) | 0, l = l + Math.imul(qt, ht) | 0, i = i + Math.imul(qt, tt) | 0, i = i + Math.imul(_t, ht) | 0, d = d + Math.imul(_t, tt) | 0, l = l + Math.imul(zt, Ct) | 0, i = i + Math.imul(zt, at) | 0, i = i + Math.imul(Et, Ct) | 0, d = d + Math.imul(Et, at) | 0, l = l + Math.imul(St, b) | 0, i = i + Math.imul(St, C) | 0, i = i + Math.imul(pt, b) | 0, d = d + Math.imul(pt, C) | 0, l = l + Math.imul(V, w) | 0, i = i + Math.imul(V, A) | 0, i = i + Math.imul(ot, w) | 0, d = d + Math.imul(ot, A) | 0, l = l + Math.imul(O, R) | 0, i = i + Math.imul(O, L) | 0, i = i + Math.imul($, R) | 0, d = d + Math.imul($, L) | 0;
      var re = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (re >>> 26) | 0, re &= 67108863, l = Math.imul(It, Dt), i = Math.imul(It, xt), i = i + Math.imul(Bt, Dt) | 0, d = Math.imul(Bt, xt), l = l + Math.imul(Lt, N) | 0, i = i + Math.imul(Lt, U) | 0, i = i + Math.imul(wt, N) | 0, d = d + Math.imul(wt, U) | 0, l = l + Math.imul(kt, H) | 0, i = i + Math.imul(kt, J) | 0, i = i + Math.imul(Mt, H) | 0, d = d + Math.imul(Mt, J) | 0, l = l + Math.imul(Pt, ht) | 0, i = i + Math.imul(Pt, tt) | 0, i = i + Math.imul(bt, ht) | 0, d = d + Math.imul(bt, tt) | 0, l = l + Math.imul(qt, Ct) | 0, i = i + Math.imul(qt, at) | 0, i = i + Math.imul(_t, Ct) | 0, d = d + Math.imul(_t, at) | 0, l = l + Math.imul(zt, b) | 0, i = i + Math.imul(zt, C) | 0, i = i + Math.imul(Et, b) | 0, d = d + Math.imul(Et, C) | 0, l = l + Math.imul(St, w) | 0, i = i + Math.imul(St, A) | 0, i = i + Math.imul(pt, w) | 0, d = d + Math.imul(pt, A) | 0, l = l + Math.imul(V, R) | 0, i = i + Math.imul(V, L) | 0, i = i + Math.imul(ot, R) | 0, d = d + Math.imul(ot, L) | 0;
      var ee = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (ee >>> 26) | 0, ee &= 67108863, l = Math.imul(It, N), i = Math.imul(It, U), i = i + Math.imul(Bt, N) | 0, d = Math.imul(Bt, U), l = l + Math.imul(Lt, H) | 0, i = i + Math.imul(Lt, J) | 0, i = i + Math.imul(wt, H) | 0, d = d + Math.imul(wt, J) | 0, l = l + Math.imul(kt, ht) | 0, i = i + Math.imul(kt, tt) | 0, i = i + Math.imul(Mt, ht) | 0, d = d + Math.imul(Mt, tt) | 0, l = l + Math.imul(Pt, Ct) | 0, i = i + Math.imul(Pt, at) | 0, i = i + Math.imul(bt, Ct) | 0, d = d + Math.imul(bt, at) | 0, l = l + Math.imul(qt, b) | 0, i = i + Math.imul(qt, C) | 0, i = i + Math.imul(_t, b) | 0, d = d + Math.imul(_t, C) | 0, l = l + Math.imul(zt, w) | 0, i = i + Math.imul(zt, A) | 0, i = i + Math.imul(Et, w) | 0, d = d + Math.imul(Et, A) | 0, l = l + Math.imul(St, R) | 0, i = i + Math.imul(St, L) | 0, i = i + Math.imul(pt, R) | 0, d = d + Math.imul(pt, L) | 0;
      var Yt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Yt >>> 26) | 0, Yt &= 67108863, l = Math.imul(It, H), i = Math.imul(It, J), i = i + Math.imul(Bt, H) | 0, d = Math.imul(Bt, J), l = l + Math.imul(Lt, ht) | 0, i = i + Math.imul(Lt, tt) | 0, i = i + Math.imul(wt, ht) | 0, d = d + Math.imul(wt, tt) | 0, l = l + Math.imul(kt, Ct) | 0, i = i + Math.imul(kt, at) | 0, i = i + Math.imul(Mt, Ct) | 0, d = d + Math.imul(Mt, at) | 0, l = l + Math.imul(Pt, b) | 0, i = i + Math.imul(Pt, C) | 0, i = i + Math.imul(bt, b) | 0, d = d + Math.imul(bt, C) | 0, l = l + Math.imul(qt, w) | 0, i = i + Math.imul(qt, A) | 0, i = i + Math.imul(_t, w) | 0, d = d + Math.imul(_t, A) | 0, l = l + Math.imul(zt, R) | 0, i = i + Math.imul(zt, L) | 0, i = i + Math.imul(Et, R) | 0, d = d + Math.imul(Et, L) | 0;
      var Gt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Gt >>> 26) | 0, Gt &= 67108863, l = Math.imul(It, ht), i = Math.imul(It, tt), i = i + Math.imul(Bt, ht) | 0, d = Math.imul(Bt, tt), l = l + Math.imul(Lt, Ct) | 0, i = i + Math.imul(Lt, at) | 0, i = i + Math.imul(wt, Ct) | 0, d = d + Math.imul(wt, at) | 0, l = l + Math.imul(kt, b) | 0, i = i + Math.imul(kt, C) | 0, i = i + Math.imul(Mt, b) | 0, d = d + Math.imul(Mt, C) | 0, l = l + Math.imul(Pt, w) | 0, i = i + Math.imul(Pt, A) | 0, i = i + Math.imul(bt, w) | 0, d = d + Math.imul(bt, A) | 0, l = l + Math.imul(qt, R) | 0, i = i + Math.imul(qt, L) | 0, i = i + Math.imul(_t, R) | 0, d = d + Math.imul(_t, L) | 0;
      var jt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863, l = Math.imul(It, Ct), i = Math.imul(It, at), i = i + Math.imul(Bt, Ct) | 0, d = Math.imul(Bt, at), l = l + Math.imul(Lt, b) | 0, i = i + Math.imul(Lt, C) | 0, i = i + Math.imul(wt, b) | 0, d = d + Math.imul(wt, C) | 0, l = l + Math.imul(kt, w) | 0, i = i + Math.imul(kt, A) | 0, i = i + Math.imul(Mt, w) | 0, d = d + Math.imul(Mt, A) | 0, l = l + Math.imul(Pt, R) | 0, i = i + Math.imul(Pt, L) | 0, i = i + Math.imul(bt, R) | 0, d = d + Math.imul(bt, L) | 0;
      var Ht = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Ht >>> 26) | 0, Ht &= 67108863, l = Math.imul(It, b), i = Math.imul(It, C), i = i + Math.imul(Bt, b) | 0, d = Math.imul(Bt, C), l = l + Math.imul(Lt, w) | 0, i = i + Math.imul(Lt, A) | 0, i = i + Math.imul(wt, w) | 0, d = d + Math.imul(wt, A) | 0, l = l + Math.imul(kt, R) | 0, i = i + Math.imul(kt, L) | 0, i = i + Math.imul(Mt, R) | 0, d = d + Math.imul(Mt, L) | 0;
      var Vt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Vt >>> 26) | 0, Vt &= 67108863, l = Math.imul(It, w), i = Math.imul(It, A), i = i + Math.imul(Bt, w) | 0, d = Math.imul(Bt, A), l = l + Math.imul(Lt, R) | 0, i = i + Math.imul(Lt, L) | 0, i = i + Math.imul(wt, R) | 0, d = d + Math.imul(wt, L) | 0;
      var Ot = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, l = Math.imul(It, R), i = Math.imul(It, L), i = i + Math.imul(Bt, R) | 0, d = Math.imul(Bt, L);
      var G = (p + l | 0) + ((i & 8191) << 13) | 0;
      return p = (d + (i >>> 13) | 0) + (G >>> 26) | 0, G &= 67108863, h[0] = lt, h[1] = Nt, h[2] = dt, h[3] = Jt, h[4] = Kt, h[5] = Xt, h[6] = Qt, h[7] = se, h[8] = oe, h[9] = te, h[10] = re, h[11] = ee, h[12] = Yt, h[13] = Gt, h[14] = jt, h[15] = Ht, h[16] = Vt, h[17] = Ot, h[18] = G, p !== 0 && (h[19] = p, c.length++), c;
    };
    Math.imul || (Y = P);
    function K(x, o, u) {
      u.negative = o.negative ^ x.negative, u.length = x.length + o.length;
      for (var c = 0, a = 0, s = 0; s < u.length - 1; s++) {
        var h = a;
        a = 0;
        for (var p = c & 67108863, l = Math.min(s, o.length - 1), i = Math.max(0, s - x.length + 1); i <= l; i++) {
          var d = s - i, M = x.words[d] | 0, m = o.words[i] | 0, v = M * m, B = v & 67108863;
          h = h + (v / 67108864 | 0) | 0, B = B + p | 0, p = B & 67108863, h = h + (B >>> 26) | 0, a += h >>> 26, h &= 67108863;
        }
        u.words[s] = p, c = h, h = a;
      }
      return c !== 0 ? u.words[s] = c : u.length--, u.strip();
    }
    function Z(x, o, u) {
      var c = new k();
      return c.mulp(x, o, u);
    }
    n.prototype.mulTo = function(o, u) {
      var c, a = this.length + o.length;
      return this.length === 10 && o.length === 10 ? c = Y(this, o, u) : a < 63 ? c = P(this, o, u) : a < 1024 ? c = K(this, o, u) : c = Z(this, o, u), c;
    };
    function k(x, o) {
      this.x = x, this.y = o;
    }
    k.prototype.makeRBT = function(o) {
      for (var u = new Array(o), c = n.prototype._countBits(o) - 1, a = 0; a < o; a++)
        u[a] = this.revBin(a, c, o);
      return u;
    }, k.prototype.revBin = function(o, u, c) {
      if (o === 0 || o === c - 1)
        return o;
      for (var a = 0, s = 0; s < u; s++)
        a |= (o & 1) << u - s - 1, o >>= 1;
      return a;
    }, k.prototype.permute = function(o, u, c, a, s, h) {
      for (var p = 0; p < h; p++)
        a[p] = u[o[p]], s[p] = c[o[p]];
    }, k.prototype.transform = function(o, u, c, a, s, h) {
      this.permute(h, o, u, c, a, s);
      for (var p = 1; p < s; p <<= 1)
        for (var l = p << 1, i = Math.cos(2 * Math.PI / l), d = Math.sin(2 * Math.PI / l), M = 0; M < s; M += l)
          for (var m = i, v = d, B = 0; B < p; B++) {
            var O = c[M + B], $ = a[M + B], ut = c[M + B + p], V = a[M + B + p], ot = m * ut - v * V;
            V = m * V + v * ut, ut = ot, c[M + B] = O + ut, a[M + B] = $ + V, c[M + B + p] = O - ut, a[M + B + p] = $ - V, B !== l && (ot = i * m - d * v, v = i * v + d * m, m = ot);
          }
    }, k.prototype.guessLen13b = function(o, u) {
      var c = Math.max(u, o) | 1, a = c & 1, s = 0;
      for (c = c / 2 | 0; c; c = c >>> 1)
        s++;
      return 1 << s + 1 + a;
    }, k.prototype.conjugate = function(o, u, c) {
      if (!(c <= 1))
        for (var a = 0; a < c / 2; a++) {
          var s = o[a];
          o[a] = o[c - a - 1], o[c - a - 1] = s, s = u[a], u[a] = -u[c - a - 1], u[c - a - 1] = -s;
        }
    }, k.prototype.normalize13b = function(o, u) {
      for (var c = 0, a = 0; a < u / 2; a++) {
        var s = Math.round(o[2 * a + 1] / u) * 8192 + Math.round(o[2 * a] / u) + c;
        o[a] = s & 67108863, s < 67108864 ? c = 0 : c = s / 67108864 | 0;
      }
      return o;
    }, k.prototype.convert13b = function(o, u, c, a) {
      for (var s = 0, h = 0; h < u; h++)
        s = s + (o[h] | 0), c[2 * h] = s & 8191, s = s >>> 13, c[2 * h + 1] = s & 8191, s = s >>> 13;
      for (h = 2 * u; h < a; ++h)
        c[h] = 0;
      e(s === 0), e((s & -8192) === 0);
    }, k.prototype.stub = function(o) {
      for (var u = new Array(o), c = 0; c < o; c++)
        u[c] = 0;
      return u;
    }, k.prototype.mulp = function(o, u, c) {
      var a = 2 * this.guessLen13b(o.length, u.length), s = this.makeRBT(a), h = this.stub(a), p = new Array(a), l = new Array(a), i = new Array(a), d = new Array(a), M = new Array(a), m = new Array(a), v = c.words;
      v.length = a, this.convert13b(o.words, o.length, p, a), this.convert13b(u.words, u.length, d, a), this.transform(p, h, l, i, a, s), this.transform(d, h, M, m, a, s);
      for (var B = 0; B < a; B++) {
        var O = l[B] * M[B] - i[B] * m[B];
        i[B] = l[B] * m[B] + i[B] * M[B], l[B] = O;
      }
      return this.conjugate(l, i, a), this.transform(l, i, v, h, a, s), this.conjugate(v, h, a), this.normalize13b(v, a), c.negative = o.negative ^ u.negative, c.length = o.length + u.length, c.strip();
    }, n.prototype.mul = function(o) {
      var u = new n(null);
      return u.words = new Array(this.length + o.length), this.mulTo(o, u);
    }, n.prototype.mulf = function(o) {
      var u = new n(null);
      return u.words = new Array(this.length + o.length), Z(this, o, u);
    }, n.prototype.imul = function(o) {
      return this.clone().mulTo(o, this);
    }, n.prototype.imuln = function(o) {
      e(typeof o == "number"), e(o < 67108864);
      for (var u = 0, c = 0; c < this.length; c++) {
        var a = (this.words[c] | 0) * o, s = (a & 67108863) + (u & 67108863);
        u >>= 26, u += a / 67108864 | 0, u += s >>> 26, this.words[c] = s & 67108863;
      }
      return u !== 0 && (this.words[c] = u, this.length++), this;
    }, n.prototype.muln = function(o) {
      return this.clone().imuln(o);
    }, n.prototype.sqr = function() {
      return this.mul(this);
    }, n.prototype.isqr = function() {
      return this.imul(this.clone());
    }, n.prototype.pow = function(o) {
      var u = F(o);
      if (u.length === 0)
        return new n(1);
      for (var c = this, a = 0; a < u.length && u[a] === 0; a++, c = c.sqr())
        ;
      if (++a < u.length)
        for (var s = c.sqr(); a < u.length; a++, s = s.sqr())
          u[a] !== 0 && (c = c.mul(s));
      return c;
    }, n.prototype.iushln = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = o % 26, c = (o - u) / 26, a = 67108863 >>> 26 - u << 26 - u, s;
      if (u !== 0) {
        var h = 0;
        for (s = 0; s < this.length; s++) {
          var p = this.words[s] & a, l = (this.words[s] | 0) - p << u;
          this.words[s] = l | h, h = p >>> 26 - u;
        }
        h && (this.words[s] = h, this.length++);
      }
      if (c !== 0) {
        for (s = this.length - 1; s >= 0; s--)
          this.words[s + c] = this.words[s];
        for (s = 0; s < c; s++)
          this.words[s] = 0;
        this.length += c;
      }
      return this.strip();
    }, n.prototype.ishln = function(o) {
      return e(this.negative === 0), this.iushln(o);
    }, n.prototype.iushrn = function(o, u, c) {
      e(typeof o == "number" && o >= 0);
      var a;
      u ? a = (u - u % 26) / 26 : a = 0;
      var s = o % 26, h = Math.min((o - s) / 26, this.length), p = 67108863 ^ 67108863 >>> s << s, l = c;
      if (a -= h, a = Math.max(0, a), l) {
        for (var i = 0; i < h; i++)
          l.words[i] = this.words[i];
        l.length = h;
      }
      if (h !== 0)
        if (this.length > h)
          for (this.length -= h, i = 0; i < this.length; i++)
            this.words[i] = this.words[i + h];
        else
          this.words[0] = 0, this.length = 1;
      var d = 0;
      for (i = this.length - 1; i >= 0 && (d !== 0 || i >= a); i--) {
        var M = this.words[i] | 0;
        this.words[i] = d << 26 - s | M >>> s, d = M & p;
      }
      return l && d !== 0 && (l.words[l.length++] = d), this.length === 0 && (this.words[0] = 0, this.length = 1), this.strip();
    }, n.prototype.ishrn = function(o, u, c) {
      return e(this.negative === 0), this.iushrn(o, u, c);
    }, n.prototype.shln = function(o) {
      return this.clone().ishln(o);
    }, n.prototype.ushln = function(o) {
      return this.clone().iushln(o);
    }, n.prototype.shrn = function(o) {
      return this.clone().ishrn(o);
    }, n.prototype.ushrn = function(o) {
      return this.clone().iushrn(o);
    }, n.prototype.testn = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = o % 26, c = (o - u) / 26, a = 1 << u;
      if (this.length <= c)
        return false;
      var s = this.words[c];
      return !!(s & a);
    }, n.prototype.imaskn = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = o % 26, c = (o - u) / 26;
      if (e(this.negative === 0, "imaskn works only with positive numbers"), this.length <= c)
        return this;
      if (u !== 0 && c++, this.length = Math.min(c, this.length), u !== 0) {
        var a = 67108863 ^ 67108863 >>> u << u;
        this.words[this.length - 1] &= a;
      }
      return this.strip();
    }, n.prototype.maskn = function(o) {
      return this.clone().imaskn(o);
    }, n.prototype.iaddn = function(o) {
      return e(typeof o == "number"), e(o < 67108864), o < 0 ? this.isubn(-o) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) < o ? (this.words[0] = o - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(o), this.negative = 1, this) : this._iaddn(o);
    }, n.prototype._iaddn = function(o) {
      this.words[0] += o;
      for (var u = 0; u < this.length && this.words[u] >= 67108864; u++)
        this.words[u] -= 67108864, u === this.length - 1 ? this.words[u + 1] = 1 : this.words[u + 1]++;
      return this.length = Math.max(this.length, u + 1), this;
    }, n.prototype.isubn = function(o) {
      if (e(typeof o == "number"), e(o < 67108864), o < 0)
        return this.iaddn(-o);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(o), this.negative = 1, this;
      if (this.words[0] -= o, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var u = 0; u < this.length && this.words[u] < 0; u++)
          this.words[u] += 67108864, this.words[u + 1] -= 1;
      return this.strip();
    }, n.prototype.addn = function(o) {
      return this.clone().iaddn(o);
    }, n.prototype.subn = function(o) {
      return this.clone().isubn(o);
    }, n.prototype.iabs = function() {
      return this.negative = 0, this;
    }, n.prototype.abs = function() {
      return this.clone().iabs();
    }, n.prototype._ishlnsubmul = function(o, u, c) {
      var a = o.length + c, s;
      this._expand(a);
      var h, p = 0;
      for (s = 0; s < o.length; s++) {
        h = (this.words[s + c] | 0) + p;
        var l = (o.words[s] | 0) * u;
        h -= l & 67108863, p = (h >> 26) - (l / 67108864 | 0), this.words[s + c] = h & 67108863;
      }
      for (; s < this.length - c; s++)
        h = (this.words[s + c] | 0) + p, p = h >> 26, this.words[s + c] = h & 67108863;
      if (p === 0)
        return this.strip();
      for (e(p === -1), p = 0, s = 0; s < this.length; s++)
        h = -(this.words[s] | 0) + p, p = h >> 26, this.words[s] = h & 67108863;
      return this.negative = 1, this.strip();
    }, n.prototype._wordDiv = function(o, u) {
      var c = this.length - o.length, a = this.clone(), s = o, h = s.words[s.length - 1] | 0, p = this._countBits(h);
      c = 26 - p, c !== 0 && (s = s.ushln(c), a.iushln(c), h = s.words[s.length - 1] | 0);
      var l = a.length - s.length, i;
      if (u !== "mod") {
        i = new n(null), i.length = l + 1, i.words = new Array(i.length);
        for (var d = 0; d < i.length; d++)
          i.words[d] = 0;
      }
      var M = a.clone()._ishlnsubmul(s, 1, l);
      M.negative === 0 && (a = M, i && (i.words[l] = 1));
      for (var m = l - 1; m >= 0; m--) {
        var v = (a.words[s.length + m] | 0) * 67108864 + (a.words[s.length + m - 1] | 0);
        for (v = Math.min(v / h | 0, 67108863), a._ishlnsubmul(s, v, m); a.negative !== 0; )
          v--, a.negative = 0, a._ishlnsubmul(s, 1, m), a.isZero() || (a.negative ^= 1);
        i && (i.words[m] = v);
      }
      return i && i.strip(), a.strip(), u !== "div" && c !== 0 && a.iushrn(c), { div: i || null, mod: a };
    }, n.prototype.divmod = function(o, u, c) {
      if (e(!o.isZero()), this.isZero())
        return { div: new n(0), mod: new n(0) };
      var a, s, h;
      return this.negative !== 0 && o.negative === 0 ? (h = this.neg().divmod(o, u), u !== "mod" && (a = h.div.neg()), u !== "div" && (s = h.mod.neg(), c && s.negative !== 0 && s.iadd(o)), { div: a, mod: s }) : this.negative === 0 && o.negative !== 0 ? (h = this.divmod(o.neg(), u), u !== "mod" && (a = h.div.neg()), { div: a, mod: h.mod }) : this.negative & o.negative ? (h = this.neg().divmod(o.neg(), u), u !== "div" && (s = h.mod.neg(), c && s.negative !== 0 && s.isub(o)), { div: h.div, mod: s }) : o.length > this.length || this.cmp(o) < 0 ? { div: new n(0), mod: this } : o.length === 1 ? u === "div" ? { div: this.divn(o.words[0]), mod: null } : u === "mod" ? { div: null, mod: new n(this.modn(o.words[0])) } : { div: this.divn(o.words[0]), mod: new n(this.modn(o.words[0])) } : this._wordDiv(o, u);
    }, n.prototype.div = function(o) {
      return this.divmod(o, "div", false).div;
    }, n.prototype.mod = function(o) {
      return this.divmod(o, "mod", false).mod;
    }, n.prototype.umod = function(o) {
      return this.divmod(o, "mod", true).mod;
    }, n.prototype.divRound = function(o) {
      var u = this.divmod(o);
      if (u.mod.isZero())
        return u.div;
      var c = u.div.negative !== 0 ? u.mod.isub(o) : u.mod, a = o.ushrn(1), s = o.andln(1), h = c.cmp(a);
      return h < 0 || s === 1 && h === 0 ? u.div : u.div.negative !== 0 ? u.div.isubn(1) : u.div.iaddn(1);
    }, n.prototype.modn = function(o) {
      e(o <= 67108863);
      for (var u = (1 << 26) % o, c = 0, a = this.length - 1; a >= 0; a--)
        c = (u * c + (this.words[a] | 0)) % o;
      return c;
    }, n.prototype.idivn = function(o) {
      e(o <= 67108863);
      for (var u = 0, c = this.length - 1; c >= 0; c--) {
        var a = (this.words[c] | 0) + u * 67108864;
        this.words[c] = a / o | 0, u = a % o;
      }
      return this.strip();
    }, n.prototype.divn = function(o) {
      return this.clone().idivn(o);
    }, n.prototype.egcd = function(o) {
      e(o.negative === 0), e(!o.isZero());
      var u = this, c = o.clone();
      u.negative !== 0 ? u = u.umod(o) : u = u.clone();
      for (var a = new n(1), s = new n(0), h = new n(0), p = new n(1), l = 0; u.isEven() && c.isEven(); )
        u.iushrn(1), c.iushrn(1), ++l;
      for (var i = c.clone(), d = u.clone(); !u.isZero(); ) {
        for (var M = 0, m = 1; !(u.words[0] & m) && M < 26; ++M, m <<= 1)
          ;
        if (M > 0)
          for (u.iushrn(M); M-- > 0; )
            (a.isOdd() || s.isOdd()) && (a.iadd(i), s.isub(d)), a.iushrn(1), s.iushrn(1);
        for (var v = 0, B = 1; !(c.words[0] & B) && v < 26; ++v, B <<= 1)
          ;
        if (v > 0)
          for (c.iushrn(v); v-- > 0; )
            (h.isOdd() || p.isOdd()) && (h.iadd(i), p.isub(d)), h.iushrn(1), p.iushrn(1);
        u.cmp(c) >= 0 ? (u.isub(c), a.isub(h), s.isub(p)) : (c.isub(u), h.isub(a), p.isub(s));
      }
      return { a: h, b: p, gcd: c.iushln(l) };
    }, n.prototype._invmp = function(o) {
      e(o.negative === 0), e(!o.isZero());
      var u = this, c = o.clone();
      u.negative !== 0 ? u = u.umod(o) : u = u.clone();
      for (var a = new n(1), s = new n(0), h = c.clone(); u.cmpn(1) > 0 && c.cmpn(1) > 0; ) {
        for (var p = 0, l = 1; !(u.words[0] & l) && p < 26; ++p, l <<= 1)
          ;
        if (p > 0)
          for (u.iushrn(p); p-- > 0; )
            a.isOdd() && a.iadd(h), a.iushrn(1);
        for (var i = 0, d = 1; !(c.words[0] & d) && i < 26; ++i, d <<= 1)
          ;
        if (i > 0)
          for (c.iushrn(i); i-- > 0; )
            s.isOdd() && s.iadd(h), s.iushrn(1);
        u.cmp(c) >= 0 ? (u.isub(c), a.isub(s)) : (c.isub(u), s.isub(a));
      }
      var M;
      return u.cmpn(1) === 0 ? M = a : M = s, M.cmpn(0) < 0 && M.iadd(o), M;
    }, n.prototype.gcd = function(o) {
      if (this.isZero())
        return o.abs();
      if (o.isZero())
        return this.abs();
      var u = this.clone(), c = o.clone();
      u.negative = 0, c.negative = 0;
      for (var a = 0; u.isEven() && c.isEven(); a++)
        u.iushrn(1), c.iushrn(1);
      do {
        for (; u.isEven(); )
          u.iushrn(1);
        for (; c.isEven(); )
          c.iushrn(1);
        var s = u.cmp(c);
        if (s < 0) {
          var h = u;
          u = c, c = h;
        } else if (s === 0 || c.cmpn(1) === 0)
          break;
        u.isub(c);
      } while (true);
      return c.iushln(a);
    }, n.prototype.invm = function(o) {
      return this.egcd(o).a.umod(o);
    }, n.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, n.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, n.prototype.andln = function(o) {
      return this.words[0] & o;
    }, n.prototype.bincn = function(o) {
      e(typeof o == "number");
      var u = o % 26, c = (o - u) / 26, a = 1 << u;
      if (this.length <= c)
        return this._expand(c + 1), this.words[c] |= a, this;
      for (var s = a, h = c; s !== 0 && h < this.length; h++) {
        var p = this.words[h] | 0;
        p += s, s = p >>> 26, p &= 67108863, this.words[h] = p;
      }
      return s !== 0 && (this.words[h] = s, this.length++), this;
    }, n.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, n.prototype.cmpn = function(o) {
      var u = o < 0;
      if (this.negative !== 0 && !u)
        return -1;
      if (this.negative === 0 && u)
        return 1;
      this.strip();
      var c;
      if (this.length > 1)
        c = 1;
      else {
        u && (o = -o), e(o <= 67108863, "Number is too big");
        var a = this.words[0] | 0;
        c = a === o ? 0 : a < o ? -1 : 1;
      }
      return this.negative !== 0 ? -c | 0 : c;
    }, n.prototype.cmp = function(o) {
      if (this.negative !== 0 && o.negative === 0)
        return -1;
      if (this.negative === 0 && o.negative !== 0)
        return 1;
      var u = this.ucmp(o);
      return this.negative !== 0 ? -u | 0 : u;
    }, n.prototype.ucmp = function(o) {
      if (this.length > o.length)
        return 1;
      if (this.length < o.length)
        return -1;
      for (var u = 0, c = this.length - 1; c >= 0; c--) {
        var a = this.words[c] | 0, s = o.words[c] | 0;
        if (a !== s) {
          a < s ? u = -1 : a > s && (u = 1);
          break;
        }
      }
      return u;
    }, n.prototype.gtn = function(o) {
      return this.cmpn(o) === 1;
    }, n.prototype.gt = function(o) {
      return this.cmp(o) === 1;
    }, n.prototype.gten = function(o) {
      return this.cmpn(o) >= 0;
    }, n.prototype.gte = function(o) {
      return this.cmp(o) >= 0;
    }, n.prototype.ltn = function(o) {
      return this.cmpn(o) === -1;
    }, n.prototype.lt = function(o) {
      return this.cmp(o) === -1;
    }, n.prototype.lten = function(o) {
      return this.cmpn(o) <= 0;
    }, n.prototype.lte = function(o) {
      return this.cmp(o) <= 0;
    }, n.prototype.eqn = function(o) {
      return this.cmpn(o) === 0;
    }, n.prototype.eq = function(o) {
      return this.cmp(o) === 0;
    }, n.red = function(o) {
      return new Q(o);
    }, n.prototype.toRed = function(o) {
      return e(!this.red, "Already a number in reduction context"), e(this.negative === 0, "red works only with positives"), o.convertTo(this)._forceRed(o);
    }, n.prototype.fromRed = function() {
      return e(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, n.prototype._forceRed = function(o) {
      return this.red = o, this;
    }, n.prototype.forceRed = function(o) {
      return e(!this.red, "Already a number in reduction context"), this._forceRed(o);
    }, n.prototype.redAdd = function(o) {
      return e(this.red, "redAdd works only with red numbers"), this.red.add(this, o);
    }, n.prototype.redIAdd = function(o) {
      return e(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, o);
    }, n.prototype.redSub = function(o) {
      return e(this.red, "redSub works only with red numbers"), this.red.sub(this, o);
    }, n.prototype.redISub = function(o) {
      return e(this.red, "redISub works only with red numbers"), this.red.isub(this, o);
    }, n.prototype.redShl = function(o) {
      return e(this.red, "redShl works only with red numbers"), this.red.shl(this, o);
    }, n.prototype.redMul = function(o) {
      return e(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.mul(this, o);
    }, n.prototype.redIMul = function(o) {
      return e(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.imul(this, o);
    }, n.prototype.redSqr = function() {
      return e(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, n.prototype.redISqr = function() {
      return e(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, n.prototype.redSqrt = function() {
      return e(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, n.prototype.redInvm = function() {
      return e(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, n.prototype.redNeg = function() {
      return e(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, n.prototype.redPow = function(o) {
      return e(this.red && !o.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, o);
    };
    var Tt = { k256: null, p224: null, p192: null, p25519: null };
    function it(x, o) {
      this.name = x, this.p = new n(o, 16), this.n = this.p.bitLength(), this.k = new n(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    it.prototype._tmp = function() {
      var o = new n(null);
      return o.words = new Array(Math.ceil(this.n / 13)), o;
    }, it.prototype.ireduce = function(o) {
      var u = o, c;
      do
        this.split(u, this.tmp), u = this.imulK(u), u = u.iadd(this.tmp), c = u.bitLength();
      while (c > this.n);
      var a = c < this.n ? -1 : u.ucmp(this.p);
      return a === 0 ? (u.words[0] = 0, u.length = 1) : a > 0 ? u.isub(this.p) : u.strip(), u;
    }, it.prototype.split = function(o, u) {
      o.iushrn(this.n, 0, u);
    }, it.prototype.imulK = function(o) {
      return o.imul(this.k);
    };
    function q() {
      it.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    f(q, it), q.prototype.split = function(o, u) {
      for (var c = 4194303, a = Math.min(o.length, 9), s = 0; s < a; s++)
        u.words[s] = o.words[s];
      if (u.length = a, o.length <= 9) {
        o.words[0] = 0, o.length = 1;
        return;
      }
      var h = o.words[9];
      for (u.words[u.length++] = h & c, s = 10; s < o.length; s++) {
        var p = o.words[s] | 0;
        o.words[s - 10] = (p & c) << 4 | h >>> 22, h = p;
      }
      h >>>= 22, o.words[s - 10] = h, h === 0 && o.length > 10 ? o.length -= 10 : o.length -= 9;
    }, q.prototype.imulK = function(o) {
      o.words[o.length] = 0, o.words[o.length + 1] = 0, o.length += 2;
      for (var u = 0, c = 0; c < o.length; c++) {
        var a = o.words[c] | 0;
        u += a * 977, o.words[c] = u & 67108863, u = a * 64 + (u / 67108864 | 0);
      }
      return o.words[o.length - 1] === 0 && (o.length--, o.words[o.length - 1] === 0 && o.length--), o;
    };
    function j() {
      it.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    f(j, it);
    function nt() {
      it.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    f(nt, it);
    function ft() {
      it.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    f(ft, it), ft.prototype.imulK = function(o) {
      for (var u = 0, c = 0; c < o.length; c++) {
        var a = (o.words[c] | 0) * 19 + u, s = a & 67108863;
        a >>>= 26, o.words[c] = s, u = a;
      }
      return u !== 0 && (o.words[o.length++] = u), o;
    }, n._prime = function(o) {
      if (Tt[o])
        return Tt[o];
      var u;
      if (o === "k256")
        u = new q();
      else if (o === "p224")
        u = new j();
      else if (o === "p192")
        u = new nt();
      else if (o === "p25519")
        u = new ft();
      else
        throw new Error("Unknown prime " + o);
      return Tt[o] = u, u;
    };
    function Q(x) {
      if (typeof x == "string") {
        var o = n._prime(x);
        this.m = o.p, this.prime = o;
      } else
        e(x.gtn(1), "modulus must be greater than 1"), this.m = x, this.prime = null;
    }
    Q.prototype._verify1 = function(o) {
      e(o.negative === 0, "red works only with positives"), e(o.red, "red works only with red numbers");
    }, Q.prototype._verify2 = function(o, u) {
      e((o.negative | u.negative) === 0, "red works only with positives"), e(o.red && o.red === u.red, "red works only with red numbers");
    }, Q.prototype.imod = function(o) {
      return this.prime ? this.prime.ireduce(o)._forceRed(this) : o.umod(this.m)._forceRed(this);
    }, Q.prototype.neg = function(o) {
      return o.isZero() ? o.clone() : this.m.sub(o)._forceRed(this);
    }, Q.prototype.add = function(o, u) {
      this._verify2(o, u);
      var c = o.add(u);
      return c.cmp(this.m) >= 0 && c.isub(this.m), c._forceRed(this);
    }, Q.prototype.iadd = function(o, u) {
      this._verify2(o, u);
      var c = o.iadd(u);
      return c.cmp(this.m) >= 0 && c.isub(this.m), c;
    }, Q.prototype.sub = function(o, u) {
      this._verify2(o, u);
      var c = o.sub(u);
      return c.cmpn(0) < 0 && c.iadd(this.m), c._forceRed(this);
    }, Q.prototype.isub = function(o, u) {
      this._verify2(o, u);
      var c = o.isub(u);
      return c.cmpn(0) < 0 && c.iadd(this.m), c;
    }, Q.prototype.shl = function(o, u) {
      return this._verify1(o), this.imod(o.ushln(u));
    }, Q.prototype.imul = function(o, u) {
      return this._verify2(o, u), this.imod(o.imul(u));
    }, Q.prototype.mul = function(o, u) {
      return this._verify2(o, u), this.imod(o.mul(u));
    }, Q.prototype.isqr = function(o) {
      return this.imul(o, o.clone());
    }, Q.prototype.sqr = function(o) {
      return this.mul(o, o);
    }, Q.prototype.sqrt = function(o) {
      if (o.isZero())
        return o.clone();
      var u = this.m.andln(3);
      if (e(u % 2 === 1), u === 3) {
        var c = this.m.add(new n(1)).iushrn(2);
        return this.pow(o, c);
      }
      for (var a = this.m.subn(1), s = 0; !a.isZero() && a.andln(1) === 0; )
        s++, a.iushrn(1);
      e(!a.isZero());
      var h = new n(1).toRed(this), p = h.redNeg(), l = this.m.subn(1).iushrn(1), i = this.m.bitLength();
      for (i = new n(2 * i * i).toRed(this); this.pow(i, l).cmp(p) !== 0; )
        i.redIAdd(p);
      for (var d = this.pow(i, a), M = this.pow(o, a.addn(1).iushrn(1)), m = this.pow(o, a), v = s; m.cmp(h) !== 0; ) {
        for (var B = m, O = 0; B.cmp(h) !== 0; O++)
          B = B.redSqr();
        e(O < v);
        var $ = this.pow(d, new n(1).iushln(v - O - 1));
        M = M.redMul($), d = $.redSqr(), m = m.redMul(d), v = O;
      }
      return M;
    }, Q.prototype.invm = function(o) {
      var u = o._invmp(this.m);
      return u.negative !== 0 ? (u.negative = 0, this.imod(u).redNeg()) : this.imod(u);
    }, Q.prototype.pow = function(o, u) {
      if (u.isZero())
        return new n(1);
      if (u.cmpn(1) === 0)
        return o.clone();
      var c = 4, a = new Array(1 << c);
      a[0] = new n(1).toRed(this), a[1] = o;
      for (var s = 2; s < a.length; s++)
        a[s] = this.mul(a[s - 1], o);
      var h = a[0], p = 0, l = 0, i = u.bitLength() % 26;
      for (i === 0 && (i = 26), s = u.length - 1; s >= 0; s--) {
        for (var d = u.words[s], M = i - 1; M >= 0; M--) {
          var m = d >> M & 1;
          if (h !== a[0] && (h = this.sqr(h)), m === 0 && p === 0) {
            l = 0;
            continue;
          }
          p <<= 1, p |= m, l++, !(l !== c && (s !== 0 || M !== 0)) && (h = this.mul(h, a[p]), l = 0, p = 0);
        }
        i = 26;
      }
      return h;
    }, Q.prototype.convertTo = function(o) {
      var u = o.umod(this.m);
      return u === o ? u.clone() : u;
    }, Q.prototype.convertFrom = function(o) {
      var u = o.clone();
      return u.red = null, u;
    }, n.mont = function(o) {
      return new $t(o);
    };
    function $t(x) {
      Q.call(this, x), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new n(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    f($t, Q), $t.prototype.convertTo = function(o) {
      return this.imod(o.ushln(this.shift));
    }, $t.prototype.convertFrom = function(o) {
      var u = this.imod(o.mul(this.rinv));
      return u.red = null, u;
    }, $t.prototype.imul = function(o, u) {
      if (o.isZero() || u.isZero())
        return o.words[0] = 0, o.length = 1, o;
      var c = o.imul(u), a = c.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), s = c.isub(a).iushrn(this.shift), h = s;
      return s.cmp(this.m) >= 0 ? h = s.isub(this.m) : s.cmpn(0) < 0 && (h = s.iadd(this.m)), h._forceRed(this);
    }, $t.prototype.mul = function(o, u) {
      if (o.isZero() || u.isZero())
        return new n(0)._forceRed(this);
      var c = o.mul(u), a = c.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), s = c.isub(a).iushrn(this.shift), h = s;
      return s.cmp(this.m) >= 0 ? h = s.isub(this.m) : s.cmpn(0) < 0 && (h = s.iadd(this.m)), h._forceRed(this);
    }, $t.prototype.invm = function(o) {
      var u = this.imod(o._invmp(this.m).mul(this.r2));
      return u._forceRed(this);
    };
  })(typeof pa == "undefined" || pa, jl);
});
var Yl = ae((Kl, ma) => {
  (function(r3, t) {
    function e(x, o) {
      if (!x)
        throw new Error(o || "Assertion failed");
    }
    function f(x, o) {
      x.super_ = o;
      var u = function() {
      };
      u.prototype = o.prototype, x.prototype = new u(), x.prototype.constructor = x;
    }
    function n(x, o, u) {
      if (n.isBN(x))
        return x;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, x !== null && ((o === "le" || o === "be") && (u = o, o = 10), this._init(x || 0, o || 10, u || "be"));
    }
    typeof r3 == "object" ? r3.exports = n : t.BN = n, n.BN = n, n.wordSize = 26;
    var g;
    try {
      g = qi().Buffer;
    } catch (x) {
    }
    n.isBN = function(o) {
      return o instanceof n ? true : o !== null && typeof o == "object" && o.constructor.wordSize === n.wordSize && Array.isArray(o.words);
    }, n.max = function(o, u) {
      return o.cmp(u) > 0 ? o : u;
    }, n.min = function(o, u) {
      return o.cmp(u) < 0 ? o : u;
    }, n.prototype._init = function(o, u, c) {
      if (typeof o == "number")
        return this._initNumber(o, u, c);
      if (typeof o == "object")
        return this._initArray(o, u, c);
      u === "hex" && (u = 16), e(u === (u | 0) && u >= 2 && u <= 36), o = o.toString().replace(/\s+/g, "");
      var a = 0;
      o[0] === "-" && a++, u === 16 ? this._parseHex(o, a) : this._parseBase(o, u, a), o[0] === "-" && (this.negative = 1), this.strip(), c === "le" && this._initArray(this.toArray(), u, c);
    }, n.prototype._initNumber = function(o, u, c) {
      o < 0 && (this.negative = 1, o = -o), o < 67108864 ? (this.words = [o & 67108863], this.length = 1) : o < 4503599627370496 ? (this.words = [o & 67108863, o / 67108864 & 67108863], this.length = 2) : (e(o < 9007199254740992), this.words = [o & 67108863, o / 67108864 & 67108863, 1], this.length = 3), c === "le" && this._initArray(this.toArray(), u, c);
    }, n.prototype._initArray = function(o, u, c) {
      if (e(typeof o.length == "number"), o.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(o.length / 3), this.words = new Array(this.length);
      for (var a = 0; a < this.length; a++)
        this.words[a] = 0;
      var s, h, p = 0;
      if (c === "be")
        for (a = o.length - 1, s = 0; a >= 0; a -= 3)
          h = o[a] | o[a - 1] << 8 | o[a - 2] << 16, this.words[s] |= h << p & 67108863, this.words[s + 1] = h >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, s++);
      else if (c === "le")
        for (a = 0, s = 0; a < o.length; a += 3)
          h = o[a] | o[a + 1] << 8 | o[a + 2] << 16, this.words[s] |= h << p & 67108863, this.words[s + 1] = h >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, s++);
      return this.strip();
    };
    function y(x, o, u) {
      for (var c = 0, a = Math.min(x.length, u), s = o; s < a; s++) {
        var h = x.charCodeAt(s) - 48;
        c <<= 4, h >= 49 && h <= 54 ? c |= h - 49 + 10 : h >= 17 && h <= 22 ? c |= h - 17 + 10 : c |= h & 15;
      }
      return c;
    }
    n.prototype._parseHex = function(o, u) {
      this.length = Math.ceil((o.length - u) / 6), this.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        this.words[c] = 0;
      var a, s, h = 0;
      for (c = o.length - 6, a = 0; c >= u; c -= 6)
        s = y(o, c, c + 6), this.words[a] |= s << h & 67108863, this.words[a + 1] |= s >>> 26 - h & 4194303, h += 24, h >= 26 && (h -= 26, a++);
      c + 6 !== u && (s = y(o, u, c + 6), this.words[a] |= s << h & 67108863, this.words[a + 1] |= s >>> 26 - h & 4194303), this.strip();
    };
    function _(x, o, u, c) {
      for (var a = 0, s = Math.min(x.length, u), h = o; h < s; h++) {
        var p = x.charCodeAt(h) - 48;
        a *= c, p >= 49 ? a += p - 49 + 10 : p >= 17 ? a += p - 17 + 10 : a += p;
      }
      return a;
    }
    n.prototype._parseBase = function(o, u, c) {
      this.words = [0], this.length = 1;
      for (var a = 0, s = 1; s <= 67108863; s *= u)
        a++;
      a--, s = s / u | 0;
      for (var h = o.length - c, p = h % a, l = Math.min(h, h - p) + c, i = 0, d = c; d < l; d += a)
        i = _(o, d, d + a, u), this.imuln(s), this.words[0] + i < 67108864 ? this.words[0] += i : this._iaddn(i);
      if (p !== 0) {
        var M = 1;
        for (i = _(o, d, o.length, u), d = 0; d < p; d++)
          M *= u;
        this.imuln(M), this.words[0] + i < 67108864 ? this.words[0] += i : this._iaddn(i);
      }
    }, n.prototype.copy = function(o) {
      o.words = new Array(this.length);
      for (var u = 0; u < this.length; u++)
        o.words[u] = this.words[u];
      o.length = this.length, o.negative = this.negative, o.red = this.red;
    }, n.prototype.clone = function() {
      var o = new n(null);
      return this.copy(o), o;
    }, n.prototype._expand = function(o) {
      for (; this.length < o; )
        this.words[this.length++] = 0;
      return this;
    }, n.prototype.strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, n.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, n.prototype.inspect = function() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    };
    var E = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], S = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], I = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    n.prototype.toString = function(o, u) {
      o = o || 10, u = u | 0 || 1;
      var c;
      if (o === 16 || o === "hex") {
        c = "";
        for (var a = 0, s = 0, h = 0; h < this.length; h++) {
          var p = this.words[h], l = ((p << a | s) & 16777215).toString(16);
          s = p >>> 24 - a & 16777215, s !== 0 || h !== this.length - 1 ? c = E[6 - l.length] + l + c : c = l + c, a += 2, a >= 26 && (a -= 26, h--);
        }
        for (s !== 0 && (c = s.toString(16) + c); c.length % u !== 0; )
          c = "0" + c;
        return this.negative !== 0 && (c = "-" + c), c;
      }
      if (o === (o | 0) && o >= 2 && o <= 36) {
        var i = S[o], d = I[o];
        c = "";
        var M = this.clone();
        for (M.negative = 0; !M.isZero(); ) {
          var m = M.modn(d).toString(o);
          M = M.idivn(d), M.isZero() ? c = m + c : c = E[i - m.length] + m + c;
        }
        for (this.isZero() && (c = "0" + c); c.length % u !== 0; )
          c = "0" + c;
        return this.negative !== 0 && (c = "-" + c), c;
      }
      e(false, "Base should be between 2 and 36");
    }, n.prototype.toNumber = function() {
      var o = this.words[0];
      return this.length === 2 ? o += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? o += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && e(false, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -o : o;
    }, n.prototype.toJSON = function() {
      return this.toString(16);
    }, n.prototype.toBuffer = function(o, u) {
      return e(typeof g != "undefined"), this.toArrayLike(g, o, u);
    }, n.prototype.toArray = function(o, u) {
      return this.toArrayLike(Array, o, u);
    }, n.prototype.toArrayLike = function(o, u, c) {
      var a = this.byteLength(), s = c || Math.max(1, a);
      e(a <= s, "byte array longer than desired length"), e(s > 0, "Requested array length <= 0"), this.strip();
      var h = u === "le", p = new o(s), l, i, d = this.clone();
      if (h) {
        for (i = 0; !d.isZero(); i++)
          l = d.andln(255), d.iushrn(8), p[i] = l;
        for (; i < s; i++)
          p[i] = 0;
      } else {
        for (i = 0; i < s - a; i++)
          p[i] = 0;
        for (i = 0; !d.isZero(); i++)
          l = d.andln(255), d.iushrn(8), p[s - i - 1] = l;
      }
      return p;
    }, Math.clz32 ? n.prototype._countBits = function(o) {
      return 32 - Math.clz32(o);
    } : n.prototype._countBits = function(o) {
      var u = o, c = 0;
      return u >= 4096 && (c += 13, u >>>= 13), u >= 64 && (c += 7, u >>>= 7), u >= 8 && (c += 4, u >>>= 4), u >= 2 && (c += 2, u >>>= 2), c + u;
    }, n.prototype._zeroBits = function(o) {
      if (o === 0)
        return 26;
      var u = o, c = 0;
      return u & 8191 || (c += 13, u >>>= 13), u & 127 || (c += 7, u >>>= 7), u & 15 || (c += 4, u >>>= 4), u & 3 || (c += 2, u >>>= 2), u & 1 || c++, c;
    }, n.prototype.bitLength = function() {
      var o = this.words[this.length - 1], u = this._countBits(o);
      return (this.length - 1) * 26 + u;
    };
    function F(x) {
      for (var o = new Array(x.bitLength()), u = 0; u < o.length; u++) {
        var c = u / 26 | 0, a = u % 26;
        o[u] = (x.words[c] & 1 << a) >>> a;
      }
      return o;
    }
    n.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var o = 0, u = 0; u < this.length; u++) {
        var c = this._zeroBits(this.words[u]);
        if (o += c, c !== 26)
          break;
      }
      return o;
    }, n.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, n.prototype.toTwos = function(o) {
      return this.negative !== 0 ? this.abs().inotn(o).iaddn(1) : this.clone();
    }, n.prototype.fromTwos = function(o) {
      return this.testn(o - 1) ? this.notn(o).iaddn(1).ineg() : this.clone();
    }, n.prototype.isNeg = function() {
      return this.negative !== 0;
    }, n.prototype.neg = function() {
      return this.clone().ineg();
    }, n.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, n.prototype.iuor = function(o) {
      for (; this.length < o.length; )
        this.words[this.length++] = 0;
      for (var u = 0; u < o.length; u++)
        this.words[u] = this.words[u] | o.words[u];
      return this.strip();
    }, n.prototype.ior = function(o) {
      return e((this.negative | o.negative) === 0), this.iuor(o);
    }, n.prototype.or = function(o) {
      return this.length > o.length ? this.clone().ior(o) : o.clone().ior(this);
    }, n.prototype.uor = function(o) {
      return this.length > o.length ? this.clone().iuor(o) : o.clone().iuor(this);
    }, n.prototype.iuand = function(o) {
      var u;
      this.length > o.length ? u = o : u = this;
      for (var c = 0; c < u.length; c++)
        this.words[c] = this.words[c] & o.words[c];
      return this.length = u.length, this.strip();
    }, n.prototype.iand = function(o) {
      return e((this.negative | o.negative) === 0), this.iuand(o);
    }, n.prototype.and = function(o) {
      return this.length > o.length ? this.clone().iand(o) : o.clone().iand(this);
    }, n.prototype.uand = function(o) {
      return this.length > o.length ? this.clone().iuand(o) : o.clone().iuand(this);
    }, n.prototype.iuxor = function(o) {
      var u, c;
      this.length > o.length ? (u = this, c = o) : (u = o, c = this);
      for (var a = 0; a < c.length; a++)
        this.words[a] = u.words[a] ^ c.words[a];
      if (this !== u)
        for (; a < u.length; a++)
          this.words[a] = u.words[a];
      return this.length = u.length, this.strip();
    }, n.prototype.ixor = function(o) {
      return e((this.negative | o.negative) === 0), this.iuxor(o);
    }, n.prototype.xor = function(o) {
      return this.length > o.length ? this.clone().ixor(o) : o.clone().ixor(this);
    }, n.prototype.uxor = function(o) {
      return this.length > o.length ? this.clone().iuxor(o) : o.clone().iuxor(this);
    }, n.prototype.inotn = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = Math.ceil(o / 26) | 0, c = o % 26;
      this._expand(u), c > 0 && u--;
      for (var a = 0; a < u; a++)
        this.words[a] = ~this.words[a] & 67108863;
      return c > 0 && (this.words[a] = ~this.words[a] & 67108863 >> 26 - c), this.strip();
    }, n.prototype.notn = function(o) {
      return this.clone().inotn(o);
    }, n.prototype.setn = function(o, u) {
      e(typeof o == "number" && o >= 0);
      var c = o / 26 | 0, a = o % 26;
      return this._expand(c + 1), u ? this.words[c] = this.words[c] | 1 << a : this.words[c] = this.words[c] & ~(1 << a), this.strip();
    }, n.prototype.iadd = function(o) {
      var u;
      if (this.negative !== 0 && o.negative === 0)
        return this.negative = 0, u = this.isub(o), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && o.negative !== 0)
        return o.negative = 0, u = this.isub(o), o.negative = 1, u._normSign();
      var c, a;
      this.length > o.length ? (c = this, a = o) : (c = o, a = this);
      for (var s = 0, h = 0; h < a.length; h++)
        u = (c.words[h] | 0) + (a.words[h] | 0) + s, this.words[h] = u & 67108863, s = u >>> 26;
      for (; s !== 0 && h < c.length; h++)
        u = (c.words[h] | 0) + s, this.words[h] = u & 67108863, s = u >>> 26;
      if (this.length = c.length, s !== 0)
        this.words[this.length] = s, this.length++;
      else if (c !== this)
        for (; h < c.length; h++)
          this.words[h] = c.words[h];
      return this;
    }, n.prototype.add = function(o) {
      var u;
      return o.negative !== 0 && this.negative === 0 ? (o.negative = 0, u = this.sub(o), o.negative ^= 1, u) : o.negative === 0 && this.negative !== 0 ? (this.negative = 0, u = o.sub(this), this.negative = 1, u) : this.length > o.length ? this.clone().iadd(o) : o.clone().iadd(this);
    }, n.prototype.isub = function(o) {
      if (o.negative !== 0) {
        o.negative = 0;
        var u = this.iadd(o);
        return o.negative = 1, u._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(o), this.negative = 1, this._normSign();
      var c = this.cmp(o);
      if (c === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var a, s;
      c > 0 ? (a = this, s = o) : (a = o, s = this);
      for (var h = 0, p = 0; p < s.length; p++)
        u = (a.words[p] | 0) - (s.words[p] | 0) + h, h = u >> 26, this.words[p] = u & 67108863;
      for (; h !== 0 && p < a.length; p++)
        u = (a.words[p] | 0) + h, h = u >> 26, this.words[p] = u & 67108863;
      if (h === 0 && p < a.length && a !== this)
        for (; p < a.length; p++)
          this.words[p] = a.words[p];
      return this.length = Math.max(this.length, p), a !== this && (this.negative = 1), this.strip();
    }, n.prototype.sub = function(o) {
      return this.clone().isub(o);
    };
    function P(x, o, u) {
      u.negative = o.negative ^ x.negative;
      var c = x.length + o.length | 0;
      u.length = c, c = c - 1 | 0;
      var a = x.words[0] | 0, s = o.words[0] | 0, h = a * s, p = h & 67108863, l = h / 67108864 | 0;
      u.words[0] = p;
      for (var i = 1; i < c; i++) {
        for (var d = l >>> 26, M = l & 67108863, m = Math.min(i, o.length - 1), v = Math.max(0, i - x.length + 1); v <= m; v++) {
          var B = i - v | 0;
          a = x.words[B] | 0, s = o.words[v] | 0, h = a * s + M, d += h / 67108864 | 0, M = h & 67108863;
        }
        u.words[i] = M | 0, l = d | 0;
      }
      return l !== 0 ? u.words[i] = l | 0 : u.length--, u.strip();
    }
    var Y = function(o, u, c) {
      var a = o.words, s = u.words, h = c.words, p = 0, l, i, d, M = a[0] | 0, m = M & 8191, v = M >>> 13, B = a[1] | 0, O = B & 8191, $ = B >>> 13, ut = a[2] | 0, V = ut & 8191, ot = ut >>> 13, le = a[3] | 0, St = le & 8191, pt = le >>> 13, de = a[4] | 0, zt = de & 8191, Et = de >>> 13, ne = a[5] | 0, qt = ne & 8191, _t = ne >>> 13, fe = a[6] | 0, Pt = fe & 8191, bt = fe >>> 13, be = a[7] | 0, kt = be & 8191, Mt = be >>> 13, me = a[8] | 0, Lt = me & 8191, wt = me >>> 13, _e = a[9] | 0, It = _e & 8191, Bt = _e >>> 13, Ee = s[0] | 0, Wt = Ee & 8191, yt = Ee >>> 13, xe = s[1] | 0, Ut = xe & 8191, gt = xe >>> 13, Ae = s[2] | 0, Dt = Ae & 8191, xt = Ae >>> 13, D = s[3] | 0, N = D & 8191, U = D >>> 13, st = s[4] | 0, H = st & 8191, J = st >>> 13, Ft = s[5] | 0, ht = Ft & 8191, tt = Ft >>> 13, Zt = s[6] | 0, Ct = Zt & 8191, at = Zt >>> 13, ce = s[7] | 0, b = ce & 8191, C = ce >>> 13, T = s[8] | 0, w = T & 8191, A = T >>> 13, W = s[9] | 0, R = W & 8191, L = W >>> 13;
      c.negative = o.negative ^ u.negative, c.length = 19, l = Math.imul(m, Wt), i = Math.imul(m, yt), i = i + Math.imul(v, Wt) | 0, d = Math.imul(v, yt);
      var lt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (lt >>> 26) | 0, lt &= 67108863, l = Math.imul(O, Wt), i = Math.imul(O, yt), i = i + Math.imul($, Wt) | 0, d = Math.imul($, yt), l = l + Math.imul(m, Ut) | 0, i = i + Math.imul(m, gt) | 0, i = i + Math.imul(v, Ut) | 0, d = d + Math.imul(v, gt) | 0;
      var Nt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, l = Math.imul(V, Wt), i = Math.imul(V, yt), i = i + Math.imul(ot, Wt) | 0, d = Math.imul(ot, yt), l = l + Math.imul(O, Ut) | 0, i = i + Math.imul(O, gt) | 0, i = i + Math.imul($, Ut) | 0, d = d + Math.imul($, gt) | 0, l = l + Math.imul(m, Dt) | 0, i = i + Math.imul(m, xt) | 0, i = i + Math.imul(v, Dt) | 0, d = d + Math.imul(v, xt) | 0;
      var dt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (dt >>> 26) | 0, dt &= 67108863, l = Math.imul(St, Wt), i = Math.imul(St, yt), i = i + Math.imul(pt, Wt) | 0, d = Math.imul(pt, yt), l = l + Math.imul(V, Ut) | 0, i = i + Math.imul(V, gt) | 0, i = i + Math.imul(ot, Ut) | 0, d = d + Math.imul(ot, gt) | 0, l = l + Math.imul(O, Dt) | 0, i = i + Math.imul(O, xt) | 0, i = i + Math.imul($, Dt) | 0, d = d + Math.imul($, xt) | 0, l = l + Math.imul(m, N) | 0, i = i + Math.imul(m, U) | 0, i = i + Math.imul(v, N) | 0, d = d + Math.imul(v, U) | 0;
      var Jt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Jt >>> 26) | 0, Jt &= 67108863, l = Math.imul(zt, Wt), i = Math.imul(zt, yt), i = i + Math.imul(Et, Wt) | 0, d = Math.imul(Et, yt), l = l + Math.imul(St, Ut) | 0, i = i + Math.imul(St, gt) | 0, i = i + Math.imul(pt, Ut) | 0, d = d + Math.imul(pt, gt) | 0, l = l + Math.imul(V, Dt) | 0, i = i + Math.imul(V, xt) | 0, i = i + Math.imul(ot, Dt) | 0, d = d + Math.imul(ot, xt) | 0, l = l + Math.imul(O, N) | 0, i = i + Math.imul(O, U) | 0, i = i + Math.imul($, N) | 0, d = d + Math.imul($, U) | 0, l = l + Math.imul(m, H) | 0, i = i + Math.imul(m, J) | 0, i = i + Math.imul(v, H) | 0, d = d + Math.imul(v, J) | 0;
      var Kt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Kt >>> 26) | 0, Kt &= 67108863, l = Math.imul(qt, Wt), i = Math.imul(qt, yt), i = i + Math.imul(_t, Wt) | 0, d = Math.imul(_t, yt), l = l + Math.imul(zt, Ut) | 0, i = i + Math.imul(zt, gt) | 0, i = i + Math.imul(Et, Ut) | 0, d = d + Math.imul(Et, gt) | 0, l = l + Math.imul(St, Dt) | 0, i = i + Math.imul(St, xt) | 0, i = i + Math.imul(pt, Dt) | 0, d = d + Math.imul(pt, xt) | 0, l = l + Math.imul(V, N) | 0, i = i + Math.imul(V, U) | 0, i = i + Math.imul(ot, N) | 0, d = d + Math.imul(ot, U) | 0, l = l + Math.imul(O, H) | 0, i = i + Math.imul(O, J) | 0, i = i + Math.imul($, H) | 0, d = d + Math.imul($, J) | 0, l = l + Math.imul(m, ht) | 0, i = i + Math.imul(m, tt) | 0, i = i + Math.imul(v, ht) | 0, d = d + Math.imul(v, tt) | 0;
      var Xt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Xt >>> 26) | 0, Xt &= 67108863, l = Math.imul(Pt, Wt), i = Math.imul(Pt, yt), i = i + Math.imul(bt, Wt) | 0, d = Math.imul(bt, yt), l = l + Math.imul(qt, Ut) | 0, i = i + Math.imul(qt, gt) | 0, i = i + Math.imul(_t, Ut) | 0, d = d + Math.imul(_t, gt) | 0, l = l + Math.imul(zt, Dt) | 0, i = i + Math.imul(zt, xt) | 0, i = i + Math.imul(Et, Dt) | 0, d = d + Math.imul(Et, xt) | 0, l = l + Math.imul(St, N) | 0, i = i + Math.imul(St, U) | 0, i = i + Math.imul(pt, N) | 0, d = d + Math.imul(pt, U) | 0, l = l + Math.imul(V, H) | 0, i = i + Math.imul(V, J) | 0, i = i + Math.imul(ot, H) | 0, d = d + Math.imul(ot, J) | 0, l = l + Math.imul(O, ht) | 0, i = i + Math.imul(O, tt) | 0, i = i + Math.imul($, ht) | 0, d = d + Math.imul($, tt) | 0, l = l + Math.imul(m, Ct) | 0, i = i + Math.imul(m, at) | 0, i = i + Math.imul(v, Ct) | 0, d = d + Math.imul(v, at) | 0;
      var Qt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Qt >>> 26) | 0, Qt &= 67108863, l = Math.imul(kt, Wt), i = Math.imul(kt, yt), i = i + Math.imul(Mt, Wt) | 0, d = Math.imul(Mt, yt), l = l + Math.imul(Pt, Ut) | 0, i = i + Math.imul(Pt, gt) | 0, i = i + Math.imul(bt, Ut) | 0, d = d + Math.imul(bt, gt) | 0, l = l + Math.imul(qt, Dt) | 0, i = i + Math.imul(qt, xt) | 0, i = i + Math.imul(_t, Dt) | 0, d = d + Math.imul(_t, xt) | 0, l = l + Math.imul(zt, N) | 0, i = i + Math.imul(zt, U) | 0, i = i + Math.imul(Et, N) | 0, d = d + Math.imul(Et, U) | 0, l = l + Math.imul(St, H) | 0, i = i + Math.imul(St, J) | 0, i = i + Math.imul(pt, H) | 0, d = d + Math.imul(pt, J) | 0, l = l + Math.imul(V, ht) | 0, i = i + Math.imul(V, tt) | 0, i = i + Math.imul(ot, ht) | 0, d = d + Math.imul(ot, tt) | 0, l = l + Math.imul(O, Ct) | 0, i = i + Math.imul(O, at) | 0, i = i + Math.imul($, Ct) | 0, d = d + Math.imul($, at) | 0, l = l + Math.imul(m, b) | 0, i = i + Math.imul(m, C) | 0, i = i + Math.imul(v, b) | 0, d = d + Math.imul(v, C) | 0;
      var se = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (se >>> 26) | 0, se &= 67108863, l = Math.imul(Lt, Wt), i = Math.imul(Lt, yt), i = i + Math.imul(wt, Wt) | 0, d = Math.imul(wt, yt), l = l + Math.imul(kt, Ut) | 0, i = i + Math.imul(kt, gt) | 0, i = i + Math.imul(Mt, Ut) | 0, d = d + Math.imul(Mt, gt) | 0, l = l + Math.imul(Pt, Dt) | 0, i = i + Math.imul(Pt, xt) | 0, i = i + Math.imul(bt, Dt) | 0, d = d + Math.imul(bt, xt) | 0, l = l + Math.imul(qt, N) | 0, i = i + Math.imul(qt, U) | 0, i = i + Math.imul(_t, N) | 0, d = d + Math.imul(_t, U) | 0, l = l + Math.imul(zt, H) | 0, i = i + Math.imul(zt, J) | 0, i = i + Math.imul(Et, H) | 0, d = d + Math.imul(Et, J) | 0, l = l + Math.imul(St, ht) | 0, i = i + Math.imul(St, tt) | 0, i = i + Math.imul(pt, ht) | 0, d = d + Math.imul(pt, tt) | 0, l = l + Math.imul(V, Ct) | 0, i = i + Math.imul(V, at) | 0, i = i + Math.imul(ot, Ct) | 0, d = d + Math.imul(ot, at) | 0, l = l + Math.imul(O, b) | 0, i = i + Math.imul(O, C) | 0, i = i + Math.imul($, b) | 0, d = d + Math.imul($, C) | 0, l = l + Math.imul(m, w) | 0, i = i + Math.imul(m, A) | 0, i = i + Math.imul(v, w) | 0, d = d + Math.imul(v, A) | 0;
      var oe = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (oe >>> 26) | 0, oe &= 67108863, l = Math.imul(It, Wt), i = Math.imul(It, yt), i = i + Math.imul(Bt, Wt) | 0, d = Math.imul(Bt, yt), l = l + Math.imul(Lt, Ut) | 0, i = i + Math.imul(Lt, gt) | 0, i = i + Math.imul(wt, Ut) | 0, d = d + Math.imul(wt, gt) | 0, l = l + Math.imul(kt, Dt) | 0, i = i + Math.imul(kt, xt) | 0, i = i + Math.imul(Mt, Dt) | 0, d = d + Math.imul(Mt, xt) | 0, l = l + Math.imul(Pt, N) | 0, i = i + Math.imul(Pt, U) | 0, i = i + Math.imul(bt, N) | 0, d = d + Math.imul(bt, U) | 0, l = l + Math.imul(qt, H) | 0, i = i + Math.imul(qt, J) | 0, i = i + Math.imul(_t, H) | 0, d = d + Math.imul(_t, J) | 0, l = l + Math.imul(zt, ht) | 0, i = i + Math.imul(zt, tt) | 0, i = i + Math.imul(Et, ht) | 0, d = d + Math.imul(Et, tt) | 0, l = l + Math.imul(St, Ct) | 0, i = i + Math.imul(St, at) | 0, i = i + Math.imul(pt, Ct) | 0, d = d + Math.imul(pt, at) | 0, l = l + Math.imul(V, b) | 0, i = i + Math.imul(V, C) | 0, i = i + Math.imul(ot, b) | 0, d = d + Math.imul(ot, C) | 0, l = l + Math.imul(O, w) | 0, i = i + Math.imul(O, A) | 0, i = i + Math.imul($, w) | 0, d = d + Math.imul($, A) | 0, l = l + Math.imul(m, R) | 0, i = i + Math.imul(m, L) | 0, i = i + Math.imul(v, R) | 0, d = d + Math.imul(v, L) | 0;
      var te = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (te >>> 26) | 0, te &= 67108863, l = Math.imul(It, Ut), i = Math.imul(It, gt), i = i + Math.imul(Bt, Ut) | 0, d = Math.imul(Bt, gt), l = l + Math.imul(Lt, Dt) | 0, i = i + Math.imul(Lt, xt) | 0, i = i + Math.imul(wt, Dt) | 0, d = d + Math.imul(wt, xt) | 0, l = l + Math.imul(kt, N) | 0, i = i + Math.imul(kt, U) | 0, i = i + Math.imul(Mt, N) | 0, d = d + Math.imul(Mt, U) | 0, l = l + Math.imul(Pt, H) | 0, i = i + Math.imul(Pt, J) | 0, i = i + Math.imul(bt, H) | 0, d = d + Math.imul(bt, J) | 0, l = l + Math.imul(qt, ht) | 0, i = i + Math.imul(qt, tt) | 0, i = i + Math.imul(_t, ht) | 0, d = d + Math.imul(_t, tt) | 0, l = l + Math.imul(zt, Ct) | 0, i = i + Math.imul(zt, at) | 0, i = i + Math.imul(Et, Ct) | 0, d = d + Math.imul(Et, at) | 0, l = l + Math.imul(St, b) | 0, i = i + Math.imul(St, C) | 0, i = i + Math.imul(pt, b) | 0, d = d + Math.imul(pt, C) | 0, l = l + Math.imul(V, w) | 0, i = i + Math.imul(V, A) | 0, i = i + Math.imul(ot, w) | 0, d = d + Math.imul(ot, A) | 0, l = l + Math.imul(O, R) | 0, i = i + Math.imul(O, L) | 0, i = i + Math.imul($, R) | 0, d = d + Math.imul($, L) | 0;
      var re = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (re >>> 26) | 0, re &= 67108863, l = Math.imul(It, Dt), i = Math.imul(It, xt), i = i + Math.imul(Bt, Dt) | 0, d = Math.imul(Bt, xt), l = l + Math.imul(Lt, N) | 0, i = i + Math.imul(Lt, U) | 0, i = i + Math.imul(wt, N) | 0, d = d + Math.imul(wt, U) | 0, l = l + Math.imul(kt, H) | 0, i = i + Math.imul(kt, J) | 0, i = i + Math.imul(Mt, H) | 0, d = d + Math.imul(Mt, J) | 0, l = l + Math.imul(Pt, ht) | 0, i = i + Math.imul(Pt, tt) | 0, i = i + Math.imul(bt, ht) | 0, d = d + Math.imul(bt, tt) | 0, l = l + Math.imul(qt, Ct) | 0, i = i + Math.imul(qt, at) | 0, i = i + Math.imul(_t, Ct) | 0, d = d + Math.imul(_t, at) | 0, l = l + Math.imul(zt, b) | 0, i = i + Math.imul(zt, C) | 0, i = i + Math.imul(Et, b) | 0, d = d + Math.imul(Et, C) | 0, l = l + Math.imul(St, w) | 0, i = i + Math.imul(St, A) | 0, i = i + Math.imul(pt, w) | 0, d = d + Math.imul(pt, A) | 0, l = l + Math.imul(V, R) | 0, i = i + Math.imul(V, L) | 0, i = i + Math.imul(ot, R) | 0, d = d + Math.imul(ot, L) | 0;
      var ee = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (ee >>> 26) | 0, ee &= 67108863, l = Math.imul(It, N), i = Math.imul(It, U), i = i + Math.imul(Bt, N) | 0, d = Math.imul(Bt, U), l = l + Math.imul(Lt, H) | 0, i = i + Math.imul(Lt, J) | 0, i = i + Math.imul(wt, H) | 0, d = d + Math.imul(wt, J) | 0, l = l + Math.imul(kt, ht) | 0, i = i + Math.imul(kt, tt) | 0, i = i + Math.imul(Mt, ht) | 0, d = d + Math.imul(Mt, tt) | 0, l = l + Math.imul(Pt, Ct) | 0, i = i + Math.imul(Pt, at) | 0, i = i + Math.imul(bt, Ct) | 0, d = d + Math.imul(bt, at) | 0, l = l + Math.imul(qt, b) | 0, i = i + Math.imul(qt, C) | 0, i = i + Math.imul(_t, b) | 0, d = d + Math.imul(_t, C) | 0, l = l + Math.imul(zt, w) | 0, i = i + Math.imul(zt, A) | 0, i = i + Math.imul(Et, w) | 0, d = d + Math.imul(Et, A) | 0, l = l + Math.imul(St, R) | 0, i = i + Math.imul(St, L) | 0, i = i + Math.imul(pt, R) | 0, d = d + Math.imul(pt, L) | 0;
      var Yt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Yt >>> 26) | 0, Yt &= 67108863, l = Math.imul(It, H), i = Math.imul(It, J), i = i + Math.imul(Bt, H) | 0, d = Math.imul(Bt, J), l = l + Math.imul(Lt, ht) | 0, i = i + Math.imul(Lt, tt) | 0, i = i + Math.imul(wt, ht) | 0, d = d + Math.imul(wt, tt) | 0, l = l + Math.imul(kt, Ct) | 0, i = i + Math.imul(kt, at) | 0, i = i + Math.imul(Mt, Ct) | 0, d = d + Math.imul(Mt, at) | 0, l = l + Math.imul(Pt, b) | 0, i = i + Math.imul(Pt, C) | 0, i = i + Math.imul(bt, b) | 0, d = d + Math.imul(bt, C) | 0, l = l + Math.imul(qt, w) | 0, i = i + Math.imul(qt, A) | 0, i = i + Math.imul(_t, w) | 0, d = d + Math.imul(_t, A) | 0, l = l + Math.imul(zt, R) | 0, i = i + Math.imul(zt, L) | 0, i = i + Math.imul(Et, R) | 0, d = d + Math.imul(Et, L) | 0;
      var Gt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Gt >>> 26) | 0, Gt &= 67108863, l = Math.imul(It, ht), i = Math.imul(It, tt), i = i + Math.imul(Bt, ht) | 0, d = Math.imul(Bt, tt), l = l + Math.imul(Lt, Ct) | 0, i = i + Math.imul(Lt, at) | 0, i = i + Math.imul(wt, Ct) | 0, d = d + Math.imul(wt, at) | 0, l = l + Math.imul(kt, b) | 0, i = i + Math.imul(kt, C) | 0, i = i + Math.imul(Mt, b) | 0, d = d + Math.imul(Mt, C) | 0, l = l + Math.imul(Pt, w) | 0, i = i + Math.imul(Pt, A) | 0, i = i + Math.imul(bt, w) | 0, d = d + Math.imul(bt, A) | 0, l = l + Math.imul(qt, R) | 0, i = i + Math.imul(qt, L) | 0, i = i + Math.imul(_t, R) | 0, d = d + Math.imul(_t, L) | 0;
      var jt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863, l = Math.imul(It, Ct), i = Math.imul(It, at), i = i + Math.imul(Bt, Ct) | 0, d = Math.imul(Bt, at), l = l + Math.imul(Lt, b) | 0, i = i + Math.imul(Lt, C) | 0, i = i + Math.imul(wt, b) | 0, d = d + Math.imul(wt, C) | 0, l = l + Math.imul(kt, w) | 0, i = i + Math.imul(kt, A) | 0, i = i + Math.imul(Mt, w) | 0, d = d + Math.imul(Mt, A) | 0, l = l + Math.imul(Pt, R) | 0, i = i + Math.imul(Pt, L) | 0, i = i + Math.imul(bt, R) | 0, d = d + Math.imul(bt, L) | 0;
      var Ht = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Ht >>> 26) | 0, Ht &= 67108863, l = Math.imul(It, b), i = Math.imul(It, C), i = i + Math.imul(Bt, b) | 0, d = Math.imul(Bt, C), l = l + Math.imul(Lt, w) | 0, i = i + Math.imul(Lt, A) | 0, i = i + Math.imul(wt, w) | 0, d = d + Math.imul(wt, A) | 0, l = l + Math.imul(kt, R) | 0, i = i + Math.imul(kt, L) | 0, i = i + Math.imul(Mt, R) | 0, d = d + Math.imul(Mt, L) | 0;
      var Vt = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Vt >>> 26) | 0, Vt &= 67108863, l = Math.imul(It, w), i = Math.imul(It, A), i = i + Math.imul(Bt, w) | 0, d = Math.imul(Bt, A), l = l + Math.imul(Lt, R) | 0, i = i + Math.imul(Lt, L) | 0, i = i + Math.imul(wt, R) | 0, d = d + Math.imul(wt, L) | 0;
      var Ot = (p + l | 0) + ((i & 8191) << 13) | 0;
      p = (d + (i >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, l = Math.imul(It, R), i = Math.imul(It, L), i = i + Math.imul(Bt, R) | 0, d = Math.imul(Bt, L);
      var G = (p + l | 0) + ((i & 8191) << 13) | 0;
      return p = (d + (i >>> 13) | 0) + (G >>> 26) | 0, G &= 67108863, h[0] = lt, h[1] = Nt, h[2] = dt, h[3] = Jt, h[4] = Kt, h[5] = Xt, h[6] = Qt, h[7] = se, h[8] = oe, h[9] = te, h[10] = re, h[11] = ee, h[12] = Yt, h[13] = Gt, h[14] = jt, h[15] = Ht, h[16] = Vt, h[17] = Ot, h[18] = G, p !== 0 && (h[19] = p, c.length++), c;
    };
    Math.imul || (Y = P);
    function K(x, o, u) {
      u.negative = o.negative ^ x.negative, u.length = x.length + o.length;
      for (var c = 0, a = 0, s = 0; s < u.length - 1; s++) {
        var h = a;
        a = 0;
        for (var p = c & 67108863, l = Math.min(s, o.length - 1), i = Math.max(0, s - x.length + 1); i <= l; i++) {
          var d = s - i, M = x.words[d] | 0, m = o.words[i] | 0, v = M * m, B = v & 67108863;
          h = h + (v / 67108864 | 0) | 0, B = B + p | 0, p = B & 67108863, h = h + (B >>> 26) | 0, a += h >>> 26, h &= 67108863;
        }
        u.words[s] = p, c = h, h = a;
      }
      return c !== 0 ? u.words[s] = c : u.length--, u.strip();
    }
    function Z(x, o, u) {
      var c = new k();
      return c.mulp(x, o, u);
    }
    n.prototype.mulTo = function(o, u) {
      var c, a = this.length + o.length;
      return this.length === 10 && o.length === 10 ? c = Y(this, o, u) : a < 63 ? c = P(this, o, u) : a < 1024 ? c = K(this, o, u) : c = Z(this, o, u), c;
    };
    function k(x, o) {
      this.x = x, this.y = o;
    }
    k.prototype.makeRBT = function(o) {
      for (var u = new Array(o), c = n.prototype._countBits(o) - 1, a = 0; a < o; a++)
        u[a] = this.revBin(a, c, o);
      return u;
    }, k.prototype.revBin = function(o, u, c) {
      if (o === 0 || o === c - 1)
        return o;
      for (var a = 0, s = 0; s < u; s++)
        a |= (o & 1) << u - s - 1, o >>= 1;
      return a;
    }, k.prototype.permute = function(o, u, c, a, s, h) {
      for (var p = 0; p < h; p++)
        a[p] = u[o[p]], s[p] = c[o[p]];
    }, k.prototype.transform = function(o, u, c, a, s, h) {
      this.permute(h, o, u, c, a, s);
      for (var p = 1; p < s; p <<= 1)
        for (var l = p << 1, i = Math.cos(2 * Math.PI / l), d = Math.sin(2 * Math.PI / l), M = 0; M < s; M += l)
          for (var m = i, v = d, B = 0; B < p; B++) {
            var O = c[M + B], $ = a[M + B], ut = c[M + B + p], V = a[M + B + p], ot = m * ut - v * V;
            V = m * V + v * ut, ut = ot, c[M + B] = O + ut, a[M + B] = $ + V, c[M + B + p] = O - ut, a[M + B + p] = $ - V, B !== l && (ot = i * m - d * v, v = i * v + d * m, m = ot);
          }
    }, k.prototype.guessLen13b = function(o, u) {
      var c = Math.max(u, o) | 1, a = c & 1, s = 0;
      for (c = c / 2 | 0; c; c = c >>> 1)
        s++;
      return 1 << s + 1 + a;
    }, k.prototype.conjugate = function(o, u, c) {
      if (!(c <= 1))
        for (var a = 0; a < c / 2; a++) {
          var s = o[a];
          o[a] = o[c - a - 1], o[c - a - 1] = s, s = u[a], u[a] = -u[c - a - 1], u[c - a - 1] = -s;
        }
    }, k.prototype.normalize13b = function(o, u) {
      for (var c = 0, a = 0; a < u / 2; a++) {
        var s = Math.round(o[2 * a + 1] / u) * 8192 + Math.round(o[2 * a] / u) + c;
        o[a] = s & 67108863, s < 67108864 ? c = 0 : c = s / 67108864 | 0;
      }
      return o;
    }, k.prototype.convert13b = function(o, u, c, a) {
      for (var s = 0, h = 0; h < u; h++)
        s = s + (o[h] | 0), c[2 * h] = s & 8191, s = s >>> 13, c[2 * h + 1] = s & 8191, s = s >>> 13;
      for (h = 2 * u; h < a; ++h)
        c[h] = 0;
      e(s === 0), e((s & -8192) === 0);
    }, k.prototype.stub = function(o) {
      for (var u = new Array(o), c = 0; c < o; c++)
        u[c] = 0;
      return u;
    }, k.prototype.mulp = function(o, u, c) {
      var a = 2 * this.guessLen13b(o.length, u.length), s = this.makeRBT(a), h = this.stub(a), p = new Array(a), l = new Array(a), i = new Array(a), d = new Array(a), M = new Array(a), m = new Array(a), v = c.words;
      v.length = a, this.convert13b(o.words, o.length, p, a), this.convert13b(u.words, u.length, d, a), this.transform(p, h, l, i, a, s), this.transform(d, h, M, m, a, s);
      for (var B = 0; B < a; B++) {
        var O = l[B] * M[B] - i[B] * m[B];
        i[B] = l[B] * m[B] + i[B] * M[B], l[B] = O;
      }
      return this.conjugate(l, i, a), this.transform(l, i, v, h, a, s), this.conjugate(v, h, a), this.normalize13b(v, a), c.negative = o.negative ^ u.negative, c.length = o.length + u.length, c.strip();
    }, n.prototype.mul = function(o) {
      var u = new n(null);
      return u.words = new Array(this.length + o.length), this.mulTo(o, u);
    }, n.prototype.mulf = function(o) {
      var u = new n(null);
      return u.words = new Array(this.length + o.length), Z(this, o, u);
    }, n.prototype.imul = function(o) {
      return this.clone().mulTo(o, this);
    }, n.prototype.imuln = function(o) {
      e(typeof o == "number"), e(o < 67108864);
      for (var u = 0, c = 0; c < this.length; c++) {
        var a = (this.words[c] | 0) * o, s = (a & 67108863) + (u & 67108863);
        u >>= 26, u += a / 67108864 | 0, u += s >>> 26, this.words[c] = s & 67108863;
      }
      return u !== 0 && (this.words[c] = u, this.length++), this;
    }, n.prototype.muln = function(o) {
      return this.clone().imuln(o);
    }, n.prototype.sqr = function() {
      return this.mul(this);
    }, n.prototype.isqr = function() {
      return this.imul(this.clone());
    }, n.prototype.pow = function(o) {
      var u = F(o);
      if (u.length === 0)
        return new n(1);
      for (var c = this, a = 0; a < u.length && u[a] === 0; a++, c = c.sqr())
        ;
      if (++a < u.length)
        for (var s = c.sqr(); a < u.length; a++, s = s.sqr())
          u[a] !== 0 && (c = c.mul(s));
      return c;
    }, n.prototype.iushln = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = o % 26, c = (o - u) / 26, a = 67108863 >>> 26 - u << 26 - u, s;
      if (u !== 0) {
        var h = 0;
        for (s = 0; s < this.length; s++) {
          var p = this.words[s] & a, l = (this.words[s] | 0) - p << u;
          this.words[s] = l | h, h = p >>> 26 - u;
        }
        h && (this.words[s] = h, this.length++);
      }
      if (c !== 0) {
        for (s = this.length - 1; s >= 0; s--)
          this.words[s + c] = this.words[s];
        for (s = 0; s < c; s++)
          this.words[s] = 0;
        this.length += c;
      }
      return this.strip();
    }, n.prototype.ishln = function(o) {
      return e(this.negative === 0), this.iushln(o);
    }, n.prototype.iushrn = function(o, u, c) {
      e(typeof o == "number" && o >= 0);
      var a;
      u ? a = (u - u % 26) / 26 : a = 0;
      var s = o % 26, h = Math.min((o - s) / 26, this.length), p = 67108863 ^ 67108863 >>> s << s, l = c;
      if (a -= h, a = Math.max(0, a), l) {
        for (var i = 0; i < h; i++)
          l.words[i] = this.words[i];
        l.length = h;
      }
      if (h !== 0)
        if (this.length > h)
          for (this.length -= h, i = 0; i < this.length; i++)
            this.words[i] = this.words[i + h];
        else
          this.words[0] = 0, this.length = 1;
      var d = 0;
      for (i = this.length - 1; i >= 0 && (d !== 0 || i >= a); i--) {
        var M = this.words[i] | 0;
        this.words[i] = d << 26 - s | M >>> s, d = M & p;
      }
      return l && d !== 0 && (l.words[l.length++] = d), this.length === 0 && (this.words[0] = 0, this.length = 1), this.strip();
    }, n.prototype.ishrn = function(o, u, c) {
      return e(this.negative === 0), this.iushrn(o, u, c);
    }, n.prototype.shln = function(o) {
      return this.clone().ishln(o);
    }, n.prototype.ushln = function(o) {
      return this.clone().iushln(o);
    }, n.prototype.shrn = function(o) {
      return this.clone().ishrn(o);
    }, n.prototype.ushrn = function(o) {
      return this.clone().iushrn(o);
    }, n.prototype.testn = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = o % 26, c = (o - u) / 26, a = 1 << u;
      if (this.length <= c)
        return false;
      var s = this.words[c];
      return !!(s & a);
    }, n.prototype.imaskn = function(o) {
      e(typeof o == "number" && o >= 0);
      var u = o % 26, c = (o - u) / 26;
      if (e(this.negative === 0, "imaskn works only with positive numbers"), this.length <= c)
        return this;
      if (u !== 0 && c++, this.length = Math.min(c, this.length), u !== 0) {
        var a = 67108863 ^ 67108863 >>> u << u;
        this.words[this.length - 1] &= a;
      }
      return this.strip();
    }, n.prototype.maskn = function(o) {
      return this.clone().imaskn(o);
    }, n.prototype.iaddn = function(o) {
      return e(typeof o == "number"), e(o < 67108864), o < 0 ? this.isubn(-o) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) < o ? (this.words[0] = o - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(o), this.negative = 1, this) : this._iaddn(o);
    }, n.prototype._iaddn = function(o) {
      this.words[0] += o;
      for (var u = 0; u < this.length && this.words[u] >= 67108864; u++)
        this.words[u] -= 67108864, u === this.length - 1 ? this.words[u + 1] = 1 : this.words[u + 1]++;
      return this.length = Math.max(this.length, u + 1), this;
    }, n.prototype.isubn = function(o) {
      if (e(typeof o == "number"), e(o < 67108864), o < 0)
        return this.iaddn(-o);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(o), this.negative = 1, this;
      if (this.words[0] -= o, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var u = 0; u < this.length && this.words[u] < 0; u++)
          this.words[u] += 67108864, this.words[u + 1] -= 1;
      return this.strip();
    }, n.prototype.addn = function(o) {
      return this.clone().iaddn(o);
    }, n.prototype.subn = function(o) {
      return this.clone().isubn(o);
    }, n.prototype.iabs = function() {
      return this.negative = 0, this;
    }, n.prototype.abs = function() {
      return this.clone().iabs();
    }, n.prototype._ishlnsubmul = function(o, u, c) {
      var a = o.length + c, s;
      this._expand(a);
      var h, p = 0;
      for (s = 0; s < o.length; s++) {
        h = (this.words[s + c] | 0) + p;
        var l = (o.words[s] | 0) * u;
        h -= l & 67108863, p = (h >> 26) - (l / 67108864 | 0), this.words[s + c] = h & 67108863;
      }
      for (; s < this.length - c; s++)
        h = (this.words[s + c] | 0) + p, p = h >> 26, this.words[s + c] = h & 67108863;
      if (p === 0)
        return this.strip();
      for (e(p === -1), p = 0, s = 0; s < this.length; s++)
        h = -(this.words[s] | 0) + p, p = h >> 26, this.words[s] = h & 67108863;
      return this.negative = 1, this.strip();
    }, n.prototype._wordDiv = function(o, u) {
      var c = this.length - o.length, a = this.clone(), s = o, h = s.words[s.length - 1] | 0, p = this._countBits(h);
      c = 26 - p, c !== 0 && (s = s.ushln(c), a.iushln(c), h = s.words[s.length - 1] | 0);
      var l = a.length - s.length, i;
      if (u !== "mod") {
        i = new n(null), i.length = l + 1, i.words = new Array(i.length);
        for (var d = 0; d < i.length; d++)
          i.words[d] = 0;
      }
      var M = a.clone()._ishlnsubmul(s, 1, l);
      M.negative === 0 && (a = M, i && (i.words[l] = 1));
      for (var m = l - 1; m >= 0; m--) {
        var v = (a.words[s.length + m] | 0) * 67108864 + (a.words[s.length + m - 1] | 0);
        for (v = Math.min(v / h | 0, 67108863), a._ishlnsubmul(s, v, m); a.negative !== 0; )
          v--, a.negative = 0, a._ishlnsubmul(s, 1, m), a.isZero() || (a.negative ^= 1);
        i && (i.words[m] = v);
      }
      return i && i.strip(), a.strip(), u !== "div" && c !== 0 && a.iushrn(c), { div: i || null, mod: a };
    }, n.prototype.divmod = function(o, u, c) {
      if (e(!o.isZero()), this.isZero())
        return { div: new n(0), mod: new n(0) };
      var a, s, h;
      return this.negative !== 0 && o.negative === 0 ? (h = this.neg().divmod(o, u), u !== "mod" && (a = h.div.neg()), u !== "div" && (s = h.mod.neg(), c && s.negative !== 0 && s.iadd(o)), { div: a, mod: s }) : this.negative === 0 && o.negative !== 0 ? (h = this.divmod(o.neg(), u), u !== "mod" && (a = h.div.neg()), { div: a, mod: h.mod }) : this.negative & o.negative ? (h = this.neg().divmod(o.neg(), u), u !== "div" && (s = h.mod.neg(), c && s.negative !== 0 && s.isub(o)), { div: h.div, mod: s }) : o.length > this.length || this.cmp(o) < 0 ? { div: new n(0), mod: this } : o.length === 1 ? u === "div" ? { div: this.divn(o.words[0]), mod: null } : u === "mod" ? { div: null, mod: new n(this.modn(o.words[0])) } : { div: this.divn(o.words[0]), mod: new n(this.modn(o.words[0])) } : this._wordDiv(o, u);
    }, n.prototype.div = function(o) {
      return this.divmod(o, "div", false).div;
    }, n.prototype.mod = function(o) {
      return this.divmod(o, "mod", false).mod;
    }, n.prototype.umod = function(o) {
      return this.divmod(o, "mod", true).mod;
    }, n.prototype.divRound = function(o) {
      var u = this.divmod(o);
      if (u.mod.isZero())
        return u.div;
      var c = u.div.negative !== 0 ? u.mod.isub(o) : u.mod, a = o.ushrn(1), s = o.andln(1), h = c.cmp(a);
      return h < 0 || s === 1 && h === 0 ? u.div : u.div.negative !== 0 ? u.div.isubn(1) : u.div.iaddn(1);
    }, n.prototype.modn = function(o) {
      e(o <= 67108863);
      for (var u = (1 << 26) % o, c = 0, a = this.length - 1; a >= 0; a--)
        c = (u * c + (this.words[a] | 0)) % o;
      return c;
    }, n.prototype.idivn = function(o) {
      e(o <= 67108863);
      for (var u = 0, c = this.length - 1; c >= 0; c--) {
        var a = (this.words[c] | 0) + u * 67108864;
        this.words[c] = a / o | 0, u = a % o;
      }
      return this.strip();
    }, n.prototype.divn = function(o) {
      return this.clone().idivn(o);
    }, n.prototype.egcd = function(o) {
      e(o.negative === 0), e(!o.isZero());
      var u = this, c = o.clone();
      u.negative !== 0 ? u = u.umod(o) : u = u.clone();
      for (var a = new n(1), s = new n(0), h = new n(0), p = new n(1), l = 0; u.isEven() && c.isEven(); )
        u.iushrn(1), c.iushrn(1), ++l;
      for (var i = c.clone(), d = u.clone(); !u.isZero(); ) {
        for (var M = 0, m = 1; !(u.words[0] & m) && M < 26; ++M, m <<= 1)
          ;
        if (M > 0)
          for (u.iushrn(M); M-- > 0; )
            (a.isOdd() || s.isOdd()) && (a.iadd(i), s.isub(d)), a.iushrn(1), s.iushrn(1);
        for (var v = 0, B = 1; !(c.words[0] & B) && v < 26; ++v, B <<= 1)
          ;
        if (v > 0)
          for (c.iushrn(v); v-- > 0; )
            (h.isOdd() || p.isOdd()) && (h.iadd(i), p.isub(d)), h.iushrn(1), p.iushrn(1);
        u.cmp(c) >= 0 ? (u.isub(c), a.isub(h), s.isub(p)) : (c.isub(u), h.isub(a), p.isub(s));
      }
      return { a: h, b: p, gcd: c.iushln(l) };
    }, n.prototype._invmp = function(o) {
      e(o.negative === 0), e(!o.isZero());
      var u = this, c = o.clone();
      u.negative !== 0 ? u = u.umod(o) : u = u.clone();
      for (var a = new n(1), s = new n(0), h = c.clone(); u.cmpn(1) > 0 && c.cmpn(1) > 0; ) {
        for (var p = 0, l = 1; !(u.words[0] & l) && p < 26; ++p, l <<= 1)
          ;
        if (p > 0)
          for (u.iushrn(p); p-- > 0; )
            a.isOdd() && a.iadd(h), a.iushrn(1);
        for (var i = 0, d = 1; !(c.words[0] & d) && i < 26; ++i, d <<= 1)
          ;
        if (i > 0)
          for (c.iushrn(i); i-- > 0; )
            s.isOdd() && s.iadd(h), s.iushrn(1);
        u.cmp(c) >= 0 ? (u.isub(c), a.isub(s)) : (c.isub(u), s.isub(a));
      }
      var M;
      return u.cmpn(1) === 0 ? M = a : M = s, M.cmpn(0) < 0 && M.iadd(o), M;
    }, n.prototype.gcd = function(o) {
      if (this.isZero())
        return o.abs();
      if (o.isZero())
        return this.abs();
      var u = this.clone(), c = o.clone();
      u.negative = 0, c.negative = 0;
      for (var a = 0; u.isEven() && c.isEven(); a++)
        u.iushrn(1), c.iushrn(1);
      do {
        for (; u.isEven(); )
          u.iushrn(1);
        for (; c.isEven(); )
          c.iushrn(1);
        var s = u.cmp(c);
        if (s < 0) {
          var h = u;
          u = c, c = h;
        } else if (s === 0 || c.cmpn(1) === 0)
          break;
        u.isub(c);
      } while (true);
      return c.iushln(a);
    }, n.prototype.invm = function(o) {
      return this.egcd(o).a.umod(o);
    }, n.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, n.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, n.prototype.andln = function(o) {
      return this.words[0] & o;
    }, n.prototype.bincn = function(o) {
      e(typeof o == "number");
      var u = o % 26, c = (o - u) / 26, a = 1 << u;
      if (this.length <= c)
        return this._expand(c + 1), this.words[c] |= a, this;
      for (var s = a, h = c; s !== 0 && h < this.length; h++) {
        var p = this.words[h] | 0;
        p += s, s = p >>> 26, p &= 67108863, this.words[h] = p;
      }
      return s !== 0 && (this.words[h] = s, this.length++), this;
    }, n.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, n.prototype.cmpn = function(o) {
      var u = o < 0;
      if (this.negative !== 0 && !u)
        return -1;
      if (this.negative === 0 && u)
        return 1;
      this.strip();
      var c;
      if (this.length > 1)
        c = 1;
      else {
        u && (o = -o), e(o <= 67108863, "Number is too big");
        var a = this.words[0] | 0;
        c = a === o ? 0 : a < o ? -1 : 1;
      }
      return this.negative !== 0 ? -c | 0 : c;
    }, n.prototype.cmp = function(o) {
      if (this.negative !== 0 && o.negative === 0)
        return -1;
      if (this.negative === 0 && o.negative !== 0)
        return 1;
      var u = this.ucmp(o);
      return this.negative !== 0 ? -u | 0 : u;
    }, n.prototype.ucmp = function(o) {
      if (this.length > o.length)
        return 1;
      if (this.length < o.length)
        return -1;
      for (var u = 0, c = this.length - 1; c >= 0; c--) {
        var a = this.words[c] | 0, s = o.words[c] | 0;
        if (a !== s) {
          a < s ? u = -1 : a > s && (u = 1);
          break;
        }
      }
      return u;
    }, n.prototype.gtn = function(o) {
      return this.cmpn(o) === 1;
    }, n.prototype.gt = function(o) {
      return this.cmp(o) === 1;
    }, n.prototype.gten = function(o) {
      return this.cmpn(o) >= 0;
    }, n.prototype.gte = function(o) {
      return this.cmp(o) >= 0;
    }, n.prototype.ltn = function(o) {
      return this.cmpn(o) === -1;
    }, n.prototype.lt = function(o) {
      return this.cmp(o) === -1;
    }, n.prototype.lten = function(o) {
      return this.cmpn(o) <= 0;
    }, n.prototype.lte = function(o) {
      return this.cmp(o) <= 0;
    }, n.prototype.eqn = function(o) {
      return this.cmpn(o) === 0;
    }, n.prototype.eq = function(o) {
      return this.cmp(o) === 0;
    }, n.red = function(o) {
      return new Q(o);
    }, n.prototype.toRed = function(o) {
      return e(!this.red, "Already a number in reduction context"), e(this.negative === 0, "red works only with positives"), o.convertTo(this)._forceRed(o);
    }, n.prototype.fromRed = function() {
      return e(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, n.prototype._forceRed = function(o) {
      return this.red = o, this;
    }, n.prototype.forceRed = function(o) {
      return e(!this.red, "Already a number in reduction context"), this._forceRed(o);
    }, n.prototype.redAdd = function(o) {
      return e(this.red, "redAdd works only with red numbers"), this.red.add(this, o);
    }, n.prototype.redIAdd = function(o) {
      return e(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, o);
    }, n.prototype.redSub = function(o) {
      return e(this.red, "redSub works only with red numbers"), this.red.sub(this, o);
    }, n.prototype.redISub = function(o) {
      return e(this.red, "redISub works only with red numbers"), this.red.isub(this, o);
    }, n.prototype.redShl = function(o) {
      return e(this.red, "redShl works only with red numbers"), this.red.shl(this, o);
    }, n.prototype.redMul = function(o) {
      return e(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.mul(this, o);
    }, n.prototype.redIMul = function(o) {
      return e(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.imul(this, o);
    }, n.prototype.redSqr = function() {
      return e(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, n.prototype.redISqr = function() {
      return e(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, n.prototype.redSqrt = function() {
      return e(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, n.prototype.redInvm = function() {
      return e(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, n.prototype.redNeg = function() {
      return e(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, n.prototype.redPow = function(o) {
      return e(this.red && !o.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, o);
    };
    var Tt = { k256: null, p224: null, p192: null, p25519: null };
    function it(x, o) {
      this.name = x, this.p = new n(o, 16), this.n = this.p.bitLength(), this.k = new n(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    it.prototype._tmp = function() {
      var o = new n(null);
      return o.words = new Array(Math.ceil(this.n / 13)), o;
    }, it.prototype.ireduce = function(o) {
      var u = o, c;
      do
        this.split(u, this.tmp), u = this.imulK(u), u = u.iadd(this.tmp), c = u.bitLength();
      while (c > this.n);
      var a = c < this.n ? -1 : u.ucmp(this.p);
      return a === 0 ? (u.words[0] = 0, u.length = 1) : a > 0 ? u.isub(this.p) : u.strip(), u;
    }, it.prototype.split = function(o, u) {
      o.iushrn(this.n, 0, u);
    }, it.prototype.imulK = function(o) {
      return o.imul(this.k);
    };
    function q() {
      it.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    f(q, it), q.prototype.split = function(o, u) {
      for (var c = 4194303, a = Math.min(o.length, 9), s = 0; s < a; s++)
        u.words[s] = o.words[s];
      if (u.length = a, o.length <= 9) {
        o.words[0] = 0, o.length = 1;
        return;
      }
      var h = o.words[9];
      for (u.words[u.length++] = h & c, s = 10; s < o.length; s++) {
        var p = o.words[s] | 0;
        o.words[s - 10] = (p & c) << 4 | h >>> 22, h = p;
      }
      h >>>= 22, o.words[s - 10] = h, h === 0 && o.length > 10 ? o.length -= 10 : o.length -= 9;
    }, q.prototype.imulK = function(o) {
      o.words[o.length] = 0, o.words[o.length + 1] = 0, o.length += 2;
      for (var u = 0, c = 0; c < o.length; c++) {
        var a = o.words[c] | 0;
        u += a * 977, o.words[c] = u & 67108863, u = a * 64 + (u / 67108864 | 0);
      }
      return o.words[o.length - 1] === 0 && (o.length--, o.words[o.length - 1] === 0 && o.length--), o;
    };
    function j() {
      it.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    f(j, it);
    function nt() {
      it.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    f(nt, it);
    function ft() {
      it.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    f(ft, it), ft.prototype.imulK = function(o) {
      for (var u = 0, c = 0; c < o.length; c++) {
        var a = (o.words[c] | 0) * 19 + u, s = a & 67108863;
        a >>>= 26, o.words[c] = s, u = a;
      }
      return u !== 0 && (o.words[o.length++] = u), o;
    }, n._prime = function(o) {
      if (Tt[o])
        return Tt[o];
      var u;
      if (o === "k256")
        u = new q();
      else if (o === "p224")
        u = new j();
      else if (o === "p192")
        u = new nt();
      else if (o === "p25519")
        u = new ft();
      else
        throw new Error("Unknown prime " + o);
      return Tt[o] = u, u;
    };
    function Q(x) {
      if (typeof x == "string") {
        var o = n._prime(x);
        this.m = o.p, this.prime = o;
      } else
        e(x.gtn(1), "modulus must be greater than 1"), this.m = x, this.prime = null;
    }
    Q.prototype._verify1 = function(o) {
      e(o.negative === 0, "red works only with positives"), e(o.red, "red works only with red numbers");
    }, Q.prototype._verify2 = function(o, u) {
      e((o.negative | u.negative) === 0, "red works only with positives"), e(o.red && o.red === u.red, "red works only with red numbers");
    }, Q.prototype.imod = function(o) {
      return this.prime ? this.prime.ireduce(o)._forceRed(this) : o.umod(this.m)._forceRed(this);
    }, Q.prototype.neg = function(o) {
      return o.isZero() ? o.clone() : this.m.sub(o)._forceRed(this);
    }, Q.prototype.add = function(o, u) {
      this._verify2(o, u);
      var c = o.add(u);
      return c.cmp(this.m) >= 0 && c.isub(this.m), c._forceRed(this);
    }, Q.prototype.iadd = function(o, u) {
      this._verify2(o, u);
      var c = o.iadd(u);
      return c.cmp(this.m) >= 0 && c.isub(this.m), c;
    }, Q.prototype.sub = function(o, u) {
      this._verify2(o, u);
      var c = o.sub(u);
      return c.cmpn(0) < 0 && c.iadd(this.m), c._forceRed(this);
    }, Q.prototype.isub = function(o, u) {
      this._verify2(o, u);
      var c = o.isub(u);
      return c.cmpn(0) < 0 && c.iadd(this.m), c;
    }, Q.prototype.shl = function(o, u) {
      return this._verify1(o), this.imod(o.ushln(u));
    }, Q.prototype.imul = function(o, u) {
      return this._verify2(o, u), this.imod(o.imul(u));
    }, Q.prototype.mul = function(o, u) {
      return this._verify2(o, u), this.imod(o.mul(u));
    }, Q.prototype.isqr = function(o) {
      return this.imul(o, o.clone());
    }, Q.prototype.sqr = function(o) {
      return this.mul(o, o);
    }, Q.prototype.sqrt = function(o) {
      if (o.isZero())
        return o.clone();
      var u = this.m.andln(3);
      if (e(u % 2 === 1), u === 3) {
        var c = this.m.add(new n(1)).iushrn(2);
        return this.pow(o, c);
      }
      for (var a = this.m.subn(1), s = 0; !a.isZero() && a.andln(1) === 0; )
        s++, a.iushrn(1);
      e(!a.isZero());
      var h = new n(1).toRed(this), p = h.redNeg(), l = this.m.subn(1).iushrn(1), i = this.m.bitLength();
      for (i = new n(2 * i * i).toRed(this); this.pow(i, l).cmp(p) !== 0; )
        i.redIAdd(p);
      for (var d = this.pow(i, a), M = this.pow(o, a.addn(1).iushrn(1)), m = this.pow(o, a), v = s; m.cmp(h) !== 0; ) {
        for (var B = m, O = 0; B.cmp(h) !== 0; O++)
          B = B.redSqr();
        e(O < v);
        var $ = this.pow(d, new n(1).iushln(v - O - 1));
        M = M.redMul($), d = $.redSqr(), m = m.redMul(d), v = O;
      }
      return M;
    }, Q.prototype.invm = function(o) {
      var u = o._invmp(this.m);
      return u.negative !== 0 ? (u.negative = 0, this.imod(u).redNeg()) : this.imod(u);
    }, Q.prototype.pow = function(o, u) {
      if (u.isZero())
        return new n(1);
      if (u.cmpn(1) === 0)
        return o.clone();
      var c = 4, a = new Array(1 << c);
      a[0] = new n(1).toRed(this), a[1] = o;
      for (var s = 2; s < a.length; s++)
        a[s] = this.mul(a[s - 1], o);
      var h = a[0], p = 0, l = 0, i = u.bitLength() % 26;
      for (i === 0 && (i = 26), s = u.length - 1; s >= 0; s--) {
        for (var d = u.words[s], M = i - 1; M >= 0; M--) {
          var m = d >> M & 1;
          if (h !== a[0] && (h = this.sqr(h)), m === 0 && p === 0) {
            l = 0;
            continue;
          }
          p <<= 1, p |= m, l++, !(l !== c && (s !== 0 || M !== 0)) && (h = this.mul(h, a[p]), l = 0, p = 0);
        }
        i = 26;
      }
      return h;
    }, Q.prototype.convertTo = function(o) {
      var u = o.umod(this.m);
      return u === o ? u.clone() : u;
    }, Q.prototype.convertFrom = function(o) {
      var u = o.clone();
      return u.red = null, u;
    }, n.mont = function(o) {
      return new $t(o);
    };
    function $t(x) {
      Q.call(this, x), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new n(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    f($t, Q), $t.prototype.convertTo = function(o) {
      return this.imod(o.ushln(this.shift));
    }, $t.prototype.convertFrom = function(o) {
      var u = this.imod(o.mul(this.rinv));
      return u.red = null, u;
    }, $t.prototype.imul = function(o, u) {
      if (o.isZero() || u.isZero())
        return o.words[0] = 0, o.length = 1, o;
      var c = o.imul(u), a = c.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), s = c.isub(a).iushrn(this.shift), h = s;
      return s.cmp(this.m) >= 0 ? h = s.isub(this.m) : s.cmpn(0) < 0 && (h = s.iadd(this.m)), h._forceRed(this);
    }, $t.prototype.mul = function(o, u) {
      if (o.isZero() || u.isZero())
        return new n(0)._forceRed(this);
      var c = o.mul(u), a = c.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), s = c.isub(a).iushrn(this.shift), h = s;
      return s.cmp(this.m) >= 0 ? h = s.isub(this.m) : s.cmpn(0) < 0 && (h = s.iadd(this.m)), h._forceRed(this);
    }, $t.prototype.invm = function(o) {
      var u = this.imod(o._invmp(this.m).mul(this.r2));
      return u._forceRed(this);
    };
  })(typeof ma == "undefined" || ma, Kl);
});
var Zl = ae((Tx, Hl) => {
  Hl.exports = function(t) {
    if (typeof t != "string")
      throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + typeof t + ", while checking isHexPrefixed.");
    return t.slice(0, 2) === "0x";
  };
});
var Gl = ae((Fx, Vl) => {
  var F1 = Zl();
  Vl.exports = function(t) {
    return typeof t != "string" ? t : F1(t) ? t.slice(2) : t;
  };
});
var Ql = ae((Ix, Xl) => {
  var _n = Yl(), Jl = Gl();
  Xl.exports = function(t) {
    if (typeof t == "string" || typeof t == "number") {
      var e = new _n(1), f = String(t).toLowerCase().trim(), n = f.substr(0, 2) === "0x" || f.substr(0, 3) === "-0x", g = Jl(f);
      if (g.substr(0, 1) === "-" && (g = Jl(g.slice(1)), e = new _n(-1, 10)), g = g === "" ? "0" : g, !g.match(/^-?[0-9]+$/) && g.match(/^[0-9A-Fa-f]+$/) || g.match(/^[a-fA-F]+$/) || n === true && g.match(/^[0-9A-Fa-f]+$/))
        return new _n(g, 16).mul(e);
      if ((g.match(/^-?[0-9]+$/) || g === "") && n === false)
        return new _n(g, 10).mul(e);
    } else if (typeof t == "object" && t.toString && !t.pop && !t.push && t.toString(10).match(/^-?[0-9]+$/) && (t.mul || t.dividedToIntegerBy))
      return new _n(t.toString(10), 10);
    throw new Error("[number-to-bn] while converting number " + JSON.stringify(t) + " to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.");
  };
});
var iu = ae((Nx, ru) => {
  var $i = $l(), I1 = Ql(), N1 = new $i(0), tu = new $i(-1), En = { noether: "0", wei: "1", kwei: "1000", Kwei: "1000", babbage: "1000", femtoether: "1000", mwei: "1000000", Mwei: "1000000", lovelace: "1000000", picoether: "1000000", gwei: "1000000000", Gwei: "1000000000", shannon: "1000000000", nanoether: "1000000000", nano: "1000000000", szabo: "1000000000000", microether: "1000000000000", micro: "1000000000000", finney: "1000000000000000", milliether: "1000000000000000", milli: "1000000000000000", ether: "1000000000000000000", kether: "1000000000000000000000", grand: "1000000000000000000000", mether: "1000000000000000000000000", gether: "1000000000000000000000000000", tether: "1000000000000000000000000000000" };
  function ga(r3) {
    var t = r3 ? r3.toLowerCase() : "ether", e = En[t];
    if (typeof e != "string")
      throw new Error("[ethjs-unit] the unit provided " + r3 + " doesn't exists, please use the one of the following units " + JSON.stringify(En, null, 2));
    return new $i(e, 10);
  }
  function eu(r3) {
    if (typeof r3 == "string") {
      if (!r3.match(/^-?[0-9.]+$/))
        throw new Error("while converting number to string, invalid number value '" + r3 + "', should be a number matching (^-?[0-9.]+).");
      return r3;
    } else {
      if (typeof r3 == "number")
        return String(r3);
      if (typeof r3 == "object" && r3.toString && (r3.toTwos || r3.dividedToIntegerBy))
        return r3.toPrecision ? String(r3.toPrecision()) : r3.toString(10);
    }
    throw new Error("while converting number to string, invalid number value '" + r3 + "' type " + typeof r3 + ".");
  }
  function U1(r3, t, e) {
    var f = I1(r3), n = f.lt(N1), g = ga(t), y = En[t].length - 1 || 1, _ = e || {};
    n && (f = f.mul(tu));
    for (var E = f.mod(g).toString(10); E.length < y; )
      E = "0" + E;
    _.pad || (E = E.match(/^([0-9]*[1-9]|0)(0*)/)[1]);
    var S = f.div(g).toString(10);
    _.commify && (S = S.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    var I = "" + S + (E == "0" ? "" : "." + E);
    return n && (I = "-" + I), I;
  }
  function R1(r3, t) {
    var e = eu(r3), f = ga(t), n = En[t].length - 1 || 1, g = e.substring(0, 1) === "-";
    if (g && (e = e.substring(1)), e === ".")
      throw new Error("[ethjs-unit] while converting number " + r3 + " to wei, invalid value");
    var y = e.split(".");
    if (y.length > 2)
      throw new Error("[ethjs-unit] while converting number " + r3 + " to wei,  too many decimal points");
    var _ = y[0], E = y[1];
    if (_ || (_ = "0"), E || (E = "0"), E.length > n)
      throw new Error("[ethjs-unit] while converting number " + r3 + " to wei, too many decimal places");
    for (; E.length < n; )
      E += "0";
    _ = new $i(_), E = new $i(E);
    var S = _.mul(f).add(E);
    return g && (S = S.mul(tu)), new $i(S.toString(10), 10);
  }
  ru.exports = { unitMap: En, numberToString: eu, getValueOfUnit: ga, fromWei: U1, toWei: R1 };
});
function ya(r3) {
  let t = new Fo("SHA-256", "UINT8ARRAY");
  return t.update(r3), t.getHash("ARRAYBUFFER");
}
function ur(r3) {
  let t = [];
  for (let e = 0; e < r3.byteLength; e++)
    t.push(nu[r3[e]]);
  return t.join("");
}
function Jr(r3) {
  r3 = r3.toLowerCase();
  let t = r3.length;
  if (t % 2 !== 0)
    throw "hex string must have length a multiple of 2";
  let e = t / 2, f = new Uint8Array(e);
  for (let n = 0; n < e; n++) {
    let g = n * 2, y = r3.substring(g, g + 2);
    if (!va.hasOwnProperty(y))
      throw new Error("invalid hex character " + y);
    f[n] = va[y];
  }
  return f;
}
function ou(r3, t = 1) {
  let e, f;
  if (t === 1)
    e = new ArrayBuffer(r3.length), f = new Uint8Array(e);
  else if (t === 2)
    e = new ArrayBuffer(r3.length * 2), f = new Uint16Array(e);
  else if (t === 4)
    e = new ArrayBuffer(r3.length * 4), f = new Uint32Array(e);
  else
    throw new Error("Unexpected size");
  for (let n = 0, g = r3.length; n < g; n++)
    f[n] = r3.charCodeAt(n);
  return new Uint8Array(f.buffer);
}
function O1(r3, t) {
  r3 ^= 4294967295;
  for (let f = 0; f < t.length; f++)
    r3 ^= t[f], r3 = r3 & 1 ? r3 >>> 1 ^ 2197175160 : r3 >>> 1, r3 = r3 & 1 ? r3 >>> 1 ^ 2197175160 : r3 >>> 1, r3 = r3 & 1 ? r3 >>> 1 ^ 2197175160 : r3 >>> 1, r3 = r3 & 1 ? r3 >>> 1 ^ 2197175160 : r3 >>> 1, r3 = r3 & 1 ? r3 >>> 1 ^ 2197175160 : r3 >>> 1, r3 = r3 & 1 ? r3 >>> 1 ^ 2197175160 : r3 >>> 1, r3 = r3 & 1 ? r3 >>> 1 ^ 2197175160 : r3 >>> 1, r3 = r3 & 1 ? r3 >>> 1 ^ 2197175160 : r3 >>> 1;
  return r3 ^ 4294967295;
}
function wa(r3) {
  let t = O1(0, r3), e = new ArrayBuffer(4);
  return new DataView(e).setUint32(0, t, false), new Uint8Array(e).reverse();
}
function xa(r3) {
  let e = 0, f = new Uint8Array(r3.length + 2);
  f.set(r3);
  for (let n of f) {
    let g = 128;
    for (; g > 0; )
      e <<= 1, n & g && (e += 1), g >>= 1, e > 65535 && (e &= 65535, e ^= 4129);
  }
  return new Uint8Array([Math.floor(e / 256), e % 256]);
}
function Ki(r3, t) {
  let e = new Uint8Array(r3.length + t.length);
  return e.set(r3), e.set(t, r3.length), e;
}
function Cn(r3, t) {
  return r3.toString() === t.toString();
}
function Yi(r3) {
  let t = "", e, f = r3.length;
  for (e = 2; e < f; e += 3)
    t += kr[r3[e - 2] >> 2], t += kr[(r3[e - 2] & 3) << 4 | r3[e - 1] >> 4], t += kr[(r3[e - 1] & 15) << 2 | r3[e] >> 6], t += kr[r3[e] & 63];
  return e === f + 1 && (t += kr[r3[e - 2] >> 2], t += kr[(r3[e - 2] & 3) << 4], t += "=="), e === f && (t += kr[r3[e - 2] >> 2], t += kr[(r3[e - 2] & 3) << 4 | r3[e - 1] >> 4], t += kr[(r3[e - 1] & 15) << 2], t += "="), t;
}
function Ma(r3) {
  return typeof self == "undefined" ? Buffer.from(r3, "base64").toString("binary") : atob(r3);
}
function su(r3) {
  return typeof self == "undefined" ? Buffer.from(r3, "binary").toString("base64") : btoa(r3);
}
function ba(r3) {
  let t = Ma(r3), e = t.length, f = new Uint8Array(e);
  for (let n = 0; n < e; n++)
    f[n] = t.charCodeAt(n);
  return f;
}
function Xr(r3, t) {
  let e = 0;
  for (let f = 0; f < r3; f++)
    e *= 256, e += t[f];
  return e;
}
var nu, va, kr, hr = ri(() => {
  Ue(ir());
  Wl();
  Ue(da()), iu();
  nu = [], va = {};
  for (let r3 = 0; r3 <= 255; r3++) {
    let t = r3.toString(16);
    t.length < 2 && (t = "0" + t), nu.push(t), va[t] = r3;
  }
  kr = (() => {
    let r3 = [], t = "A".charCodeAt(0), e = "a".charCodeAt(0), f = "0".charCodeAt(0);
    for (let n = 0; n < 26; ++n)
      r3.push(String.fromCharCode(t + n));
    for (let n = 0; n < 26; ++n)
      r3.push(String.fromCharCode(e + n));
    for (let n = 0; n < 10; ++n)
      r3.push(String.fromCharCode(f + n));
    return r3.push("+"), r3.push("/"), r3;
  })();
});
var Qr, Lr, Bn = ri(() => {
  Qr = Ue(ir());
  hr();
  Lr = class r3 {
    constructor(t) {
      pe(this, "array");
      pe(this, "cursor");
      pe(this, "length");
      pe(this, "writeBuffer", (t2) => {
        for (let e = 0; e < t2.length; e++)
          this.writeUint8(t2[e]);
      });
      this.array = Uint8Array.from({ length: Math.ceil(t / 8) }, () => 0), this.cursor = 0, this.length = t;
    }
    static alloc(t) {
      return new r3(t);
    }
    getFreeBits() {
      return this.length - this.cursor;
    }
    getUsedBits() {
      return this.cursor;
    }
    getUsedBytes() {
      return Math.ceil(this.cursor / 8);
    }
    get(t) {
      return (this.array[t / 8 | 0] & 1 << 7 - t % 8) > 0;
    }
    checkRange(t) {
      if (t > this.length)
        throw Error("BitString overflow");
    }
    on(t) {
      this.checkRange(t), this.array[t / 8 | 0] |= 1 << 7 - t % 8;
    }
    off(t) {
      this.checkRange(t), this.array[t / 8 | 0] &= ~(1 << 7 - t % 8);
    }
    toggle(t) {
      this.checkRange(t), this.array[t / 8 | 0] ^= 1 << 7 - t % 8;
    }
    forEach(t) {
      let e = this.cursor;
      for (let f = 0; f < e; f++)
        t(this.get(f));
    }
    writeBit(t) {
      t && t > 0 ? this.on(this.cursor) : this.off(this.cursor), this.cursor = this.cursor + 1;
    }
    writeBitArray(t) {
      for (let e = 0; e < t.length; e++)
        this.writeBit(t[e]);
    }
    writeUint(t, e) {
      if (t = new Qr.default(t), e == 0 || t.toString(2).length > e) {
        if (t.toNumber() == 0)
          return;
        throw Error("bitLength is too small for number, got number=" + t + ",bitLength=" + e);
      }
      let f = t.toString(2, e);
      for (let n = 0; n < e; n++)
        this.writeBit(f[n] == "1");
    }
    writeInt(t, e) {
      if (t = new Qr.default(t), e == 1) {
        if (t.toNumber() == -1) {
          this.writeBit(true);
          return;
        }
        if (t.toNumber() == 0) {
          this.writeBit(false);
          return;
        }
        throw Error("Bitlength is too small for number");
      } else if (t.isNeg()) {
        this.writeBit(true);
        let n = new Qr.default(2).pow(new Qr.default(e - 1));
        this.writeUint(n.add(t), e - 1);
      } else
        this.writeBit(false), this.writeUint(t, e - 1);
    }
    writeUint8(t) {
      this.writeUint(t, 8);
    }
    writeBytes(t) {
      for (let e = 0; e < t.length; e++)
        this.writeUint8(t[e]);
    }
    writeString(t) {
      this.writeBytes(new TextEncoder().encode(t));
    }
    writeGrams(t) {
      if (t == 0)
        this.writeUint(0, 4);
      else {
        t = new Qr.default(t);
        let e = Math.ceil(t.toString(16).length / 2);
        this.writeUint(e, 4), this.writeUint(t, e * 8);
      }
    }
    writeCoins(t) {
      this.writeGrams(t);
    }
    writeAddress(t) {
      t == null ? this.writeUint(0, 2) : (this.writeUint(2, 2), this.writeUint(0, 1), this.writeInt(t.wc, 8), this.writeBytes(t.hashPart));
    }
    writeBitString(t) {
      t.forEach((e) => {
        this.writeBit(e);
      });
    }
    writeVarUInt(t, e) {
      let f = new Qr.default(t);
      if (f.eq(new Qr.default(0)))
        this.writeUint(0, e);
      else {
        let n = f.toString("hex");
        for (; n.length % 2 !== 0; )
          n = "0" + n;
        let g = Math.ceil(n.length / 2);
        this.writeUint(g, e), this.writeBuffer(Buffer.from(n, "hex"));
      }
    }
    clone() {
      let t = new r3(0);
      return t.array = this.array.slice(0), t.length = this.length, t.cursor = this.cursor, t;
    }
    toString() {
      return this.toHex();
    }
    getTopUppedArray() {
      let t = this.clone(), e = Math.ceil(t.cursor / 8) * 8 - t.cursor;
      if (e > 0)
        for (e = e - 1, t.writeBit(true); e > 0; )
          e = e - 1, t.writeBit(false);
      return t.array = t.array.slice(0, Math.ceil(t.cursor / 8)), t.array;
    }
    toHex() {
      if (this.cursor % 4 === 0) {
        let t = ur(this.array.slice(0, Math.ceil(this.cursor / 8))).toUpperCase();
        return this.cursor % 8 === 0 ? t : t.substr(0, t.length - 1);
      } else {
        let t = this.clone();
        for (t.writeBit(1); t.cursor % 4 !== 0; )
          t.writeBit(0);
        return t.toHex().toUpperCase() + "_";
      }
    }
    setTopUppedArray(t, e = true) {
      if (this.length = t.length * 8, this.array = t, this.cursor = this.length, !(e || !this.length)) {
        let f = false;
        for (let n = 0; n < 7; n++)
          if (this.cursor -= 1, this.get(this.cursor)) {
            f = true, this.off(this.cursor);
            break;
          }
        if (!f)
          throw console.log(t, e), new Error("Incorrect TopUppedArray");
      }
    }
  };
});
function k1(r3) {
  if (r3.length !== 48)
    throw new Error("User-friendly address should contain strictly 48 characters");
  let t = ou(Ma(r3));
  if (t.length !== 36)
    throw "Unknown address type: byte length is not equal to 36";
  let e = t.slice(0, 34), f = t.slice(34, 36), n = xa(e);
  if (!(n[0] === f[0] && n[1] === f[1]))
    throw "Wrong crc16 hashsum";
  let g = e[0], y = false, _ = false;
  if (g & _a && (y = true, g = g ^ _a), g !== Aa && g !== au)
    throw "Unknown address tag";
  _ = g === Aa;
  let E = null;
  if (e[1] === 255 ? E = -1 : E = e[1], E !== 0 && E !== -1)
    throw new Error("Invalid address wc " + E);
  let S = e.slice(2, 34);
  return { isTestOnly: y, isBounceable: _, workchain: E, hashPart: S };
}
var Aa, au, _a, Ea, qr, Sr = ri(() => {
  hr();
  Aa = 17, au = 81, _a = 128;
  Ea = class r3 {
    constructor(t) {
      pe(this, "wc");
      pe(this, "hashPart");
      pe(this, "isTestOnly");
      pe(this, "isUserFriendly");
      pe(this, "isBounceable");
      pe(this, "isUrlSafe");
      if (t == null)
        throw "Invalid address";
      if (t instanceof r3) {
        this.wc = t.wc, this.hashPart = t.hashPart, this.isTestOnly = t.isTestOnly, this.isUserFriendly = t.isUserFriendly, this.isBounceable = t.isBounceable, this.isUrlSafe = t.isUrlSafe;
        return;
      }
      if (typeof t != "string") {
        this.wc = t.wc, this.hashPart = t.hashPart, this.isTestOnly = false, this.isUserFriendly = false, this.isBounceable = false, this.isUrlSafe = false;
        return;
      }
      if (t.search(/\-/) > 0 || t.search(/_/) > 0 ? (this.isUrlSafe = true, t = t.replace(/\-/g, "+").replace(/_/g, "/")) : this.isUrlSafe = false, t.indexOf(":") > -1) {
        let e = t.split(":");
        if (e.length !== 2)
          throw new Error("Invalid address " + t);
        let f = parseInt(e[0]);
        if (f !== 0 && f !== -1)
          throw new Error("Invalid address wc " + t);
        let n = e[1];
        if (n.length !== 64)
          throw new Error("Invalid address hex " + t);
        this.isUserFriendly = false, this.wc = f, this.hashPart = Jr(n), this.isTestOnly = false, this.isBounceable = false;
      } else {
        this.isUserFriendly = true;
        let e = k1(t);
        this.wc = e.workchain, this.hashPart = e.hashPart, this.isTestOnly = e.isTestOnly, this.isBounceable = e.isBounceable;
      }
    }
    static isValid(t) {
      try {
        return new r3(t), true;
      } catch (e) {
        return false;
      }
    }
    toString(t, e, f, n) {
      if (t === void 0 && (t = this.isUserFriendly), e === void 0 && (e = this.isUrlSafe), f === void 0 && (f = this.isBounceable), n === void 0 && (n = this.isTestOnly), t) {
        let g = f ? Aa : au;
        n && (g |= _a);
        let y = new Int8Array(34);
        y[0] = g, y[1] = this.wc, y.set(this.hashPart, 2);
        let _ = new Uint8Array(36);
        _.set(y), _.set(xa(y), 34);
        let E = new Uint8Array(_), S = su(String.fromCharCode.apply(null, E));
        return e && (S = S.replace(/\+/g, "-").replace(/\//g, "_")), S;
      } else
        return this.wc + ":" + ur(this.hashPart);
    }
  }, qr = Ea;
});
function Ca(r3, t, e, f, n) {
  let g = t.loadBit() ? 1 : 0, y = 0, _ = r3;
  if (g === 0) {
    y = t.readUnaryLength();
    for (let E = 0; E < y; E++)
      _ += t.loadBit() ? "1" : "0";
  } else if ((t.loadBit() ? 1 : 0) === 0) {
    y = t.loadUint(Math.ceil(Math.log2(e + 1))).toNumber();
    for (let S = 0; S < y; S++)
      _ += t.loadBit() ? "1" : "0";
  } else {
    let S = t.loadBit() ? "1" : "0";
    y = t.loadUint(Math.ceil(Math.log2(e + 1))).toNumber();
    for (let I = 0; I < y; I++)
      _ += S;
  }
  if (e - y === 0)
    f.set(new fu.BN(_, 2).toString(10), n(t));
  else {
    let E = t.readCell(), S = t.readCell();
    E.isExotic || Ca(_ + "0", E.beginParse(), e - y - 1, f, n), S.isExotic || Ca(_ + "1", S.beginParse(), e - y - 1, f, n);
  }
}
function hu(r3, t, e) {
  let f = /* @__PURE__ */ new Map();
  return Ca("", r3, t, f, e), f;
}
var fu, Ba = ri(() => {
  fu = Ue(ir());
});
var ti, No, Sa = ri(() => {
  ti = Ue(ir());
  Sr();
  hr();
  Bn();
  Ke();
  Ba();
  No = class {
    constructor(t, e, f) {
      pe(this, "array");
      pe(this, "length");
      pe(this, "readCursor");
      pe(this, "refs");
      pe(this, "refCursor");
      pe(this, "readCell", () => {
        let t2 = this.loadRef();
        if (t2)
          return t2.toCell();
        throw Error("No ref");
      });
      pe(this, "readOptDict", (t2, e2) => this.loadBit() ? this.readDict(t2, e2) : null);
      pe(this, "readDict", (t2, e2) => {
        let f2 = this.loadRef();
        if (f2)
          return hu(f2, t2, e2);
        throw Error("No ref");
      });
      this.array = t, this.length = e, this.readCursor = 0, this.refs = f, this.refCursor = 0;
    }
    getFreeBits() {
      return this.length - this.readCursor;
    }
    getFreeRefs() {
      return this.refs.length - this.refCursor;
    }
    checkRange(t) {
      if (t > this.length)
        throw Error("BitString overflow");
    }
    get(t) {
      return this.checkRange(t), (this.array[t / 8 | 0] & 1 << 7 - t % 8) > 0;
    }
    readUnaryLength() {
      let t = 0;
      for (; this.loadBit(); )
        t++;
      return t;
    }
    readRemaining() {
      let t = Lr.alloc(1023);
      for (; this.readCursor < this.length; )
        t.writeBit(this.loadBit());
      return t;
    }
    loadBit() {
      let t = this.get(this.readCursor);
      return this.readCursor++, t;
    }
    loadBits(t) {
      let e = new Lr(t);
      for (let f = 0; f < t; f++)
        e.writeBit(this.loadBit());
      return e.array;
    }
    loadUint(t) {
      if (t < 1)
        throw "Incorrect bitLength";
      let e = "";
      for (let f = 0; f < t; f++)
        e += this.loadBit() ? "1" : "0";
      return new ti.default(e, 2);
    }
    loadInt(t) {
      if (t < 1)
        throw "Incorrect bitLength";
      let e = this.loadBit();
      if (t === 1)
        return e ? new ti.default(-1) : new ti.default(0);
      let f = this.loadUint(t - 1);
      if (e) {
        let g = new ti.default(2).pow(new ti.default(t - 1));
        f = f.sub(g);
      }
      return f;
    }
    loadVarUint(t) {
      let e = this.loadUint(new ti.default(t).toString(2).length - 1);
      return e.toNumber() === 0 ? new ti.default(0) : this.loadUint(e.toNumber() * 8);
    }
    loadCoins() {
      return this.loadVarUint(16);
    }
    loadAddress() {
      let t = this.loadUint(2);
      if (t.toNumber() === 0)
        return null;
      if (t.toNumber() !== 2)
        throw new Error("unsupported address type");
      if (this.loadBit())
        throw new Error("unsupported address type");
      let e = this.loadInt(8).toNumber(), f = this.loadBits(256);
      return new qr(e + ":" + ur(f));
    }
    loadRef() {
      if (this.refCursor >= 4)
        throw new Error("refs overflow");
      let t = this.refs[this.refCursor];
      return this.refCursor++, t;
    }
    toCell() {
      let t = this.getFreeBits(), e = this.loadBits(t), f = this.getFreeRefs(), n = new qe();
      n.bits.writeBytes(e);
      for (let g = 0; g < f; g++) {
        let y = this.loadRef();
        n.refs.push(y.toCell());
      }
      return n;
    }
  };
});
var du = {};
e0(du, { Cell: () => qe, deserializeBoc: () => Ta, deserializeCellData: () => cu, moveToTheEnd: () => Fa, parseBocHeader: () => uu, treeWalk: () => Ia });
function Fa(r3, t, e) {
  let f = r3[e];
  for (let g in r3)
    r3[g] > f && (r3[g] = r3[g] - 1);
  r3[e] = t.length - 1;
  let n = t.splice(f, 1)[0];
  t.push(n);
  for (let g of n[1].refs)
    Fa(r3, t, g.hash());
}
function Ia(r3, t, e, f = null) {
  let n = r3.hash();
  if (n in e)
    return f && e[f] > e[n] && Fa(e, t, n), [t, e];
  e[n] = t.length, t.push([n, r3]);
  for (let g of r3.refs) {
    let y = Ia(g, t, e, n);
    t = y[0], e = y[1];
  }
  return [t, e];
}
function uu(r3) {
  if (r3.length < 4 + 1)
    throw "Not enough bytes for magic prefix";
  let t = r3, e = r3.slice(0, 4);
  r3 = r3.slice(4);
  let f, n, g, y, _;
  if (Cn(e, lu)) {
    let k = r3[0];
    f = k & 128, n = k & 64, g = k & 32, y = (k & 16) * 2 + (k & 8), _ = k % 8;
  }
  if (Cn(e, L1) && (f = 1, n = 0, g = 0, y = 0, _ = r3[0]), Cn(e, q1) && (f = 1, n = 1, g = 0, y = 0, _ = r3[0]), r3 = r3.slice(1), r3.length < 1 + 5 * _)
    throw "Not enough bytes for encoding cells counters";
  let E = r3[0];
  r3 = r3.slice(1);
  let S = Xr(_, r3);
  r3 = r3.slice(_);
  let I = Xr(_, r3);
  r3 = r3.slice(_);
  let F = Xr(_, r3);
  r3 = r3.slice(_);
  let P = Xr(E, r3);
  if (r3 = r3.slice(E), r3.length < I * _)
    throw "Not enough bytes for encoding root cells hashes";
  let Y = [];
  for (let k = 0; k < I; k++)
    Y.push(Xr(_, r3)), r3 = r3.slice(_);
  let K = false;
  if (f) {
    if (K = [], r3.length < E * S)
      throw "Not enough bytes for index encoding";
    for (let k = 0; k < S; k++)
      K.push(Xr(E, r3)), r3 = r3.slice(E);
  }
  if (r3.length < P)
    throw "Not enough bytes for cells data";
  let Z = r3.slice(0, P);
  if (r3 = r3.slice(P), n) {
    if (r3.length < 4)
      throw "Not enough bytes for crc32c hashsum";
    let k = t.length;
    if (!Cn(wa(t.slice(0, k - 4)), r3.slice(0, 4)))
      throw "Crc32c hashsum mismatch";
    r3 = r3.slice(4);
  }
  if (r3.length)
    throw "Too much bytes in BoC serialization";
  return { has_idx: f, hash_crc32: n, has_cache_bits: g, flags: y, size_bytes: _, off_bytes: E, cells_num: S, roots_num: I, absent_num: F, tot_cells_size: P, root_list: Y, index: K, cells_data: Z };
}
function cu(r3, t) {
  if (r3.length < 2)
    throw "Not enough bytes to encode cell descriptors";
  let e = r3[0], f = r3[1];
  r3 = r3.slice(2);
  let g = e & 8, y = e % 8, _ = Math.ceil(f / 2), E = !(f % 2), S = new qe();
  if (S.isExotic = g, r3.length < _ + t * y)
    throw "Not enough bytes to encode cell data";
  S.bits.setTopUppedArray(r3.slice(0, _), E), r3 = r3.slice(_);
  for (let I = 0; I < y; I++)
    S.refs.push(Xr(t, r3)), r3 = r3.slice(t);
  return { cell: S, residue: r3 };
}
function Ta(r3) {
  typeof r3 == "string" && (r3 = Jr(r3));
  let t = uu(r3), e = t.cells_data, f = [];
  for (let g = 0; g < t.cells_num; g++) {
    let y = cu(e, t.size_bytes);
    e = y.residue, f.push(y.cell);
  }
  for (let g = t.cells_num - 1; g >= 0; g--) {
    let y = f[g];
    for (let _ = 0; _ < y.refs.length; _++) {
      let E = y.refs[_];
      if (E < g)
        throw "Topological order is broken";
      y.refs[_] = f[E];
    }
  }
  let n = [];
  for (let g of t.root_list)
    n.push(f[g]);
  return n;
}
var lu, L1, q1, qe, Ke = ri(() => {
  hr();
  Bn();
  Sa();
  lu = Jr("B5EE9C72"), L1 = Jr("68ff65f3"), q1 = Jr("acc3a728"), qe = class {
    constructor() {
      this.bits = new Lr(1023), this.refs = [], this.isExotic = false;
    }
    static fromBoc(t) {
      return Ta(t);
    }
    static oneFromBoc(t) {
      let e = Ta(t);
      if (e.length !== 1)
        throw new Error("expected 1 root cell but have " + e.length);
      return e[0];
    }
    writeCell(t) {
      this.bits.writeBitString(t.bits), this.refs = this.refs.concat(t.refs);
    }
    getMaxLevel() {
      let t = 0;
      for (let e in this.refs) {
        let f = this.refs[e];
        f.getMaxLevel() > t && (t = f.getMaxLevel());
      }
      return t;
    }
    isExplicitlyStoredHashes() {
      return 0;
    }
    getMaxDepth() {
      let t = 0;
      if (this.refs.length > 0) {
        for (let e in this.refs) {
          let f = this.refs[e];
          f.getMaxDepth() > t && (t = f.getMaxDepth());
        }
        t = t + 1;
      }
      return t;
    }
    getMaxDepthAsArray() {
      let t = this.getMaxDepth(), e = Uint8Array.from({ length: 2 }, () => 0);
      return e[1] = t % 256, e[0] = Math.floor(t / 256), e;
    }
    getRefsDescriptor() {
      let t = Uint8Array.from({ length: 1 }, () => 0);
      return t[0] = this.refs.length + this.isExotic * 8 + this.getMaxLevel() * 32, t;
    }
    getBitsDescriptor() {
      let t = Uint8Array.from({ length: 1 }, () => 0);
      return t[0] = Math.ceil(this.bits.cursor / 8) + Math.floor(this.bits.cursor / 8), t;
    }
    getDataWithDescriptors() {
      let t = this.getRefsDescriptor(), e = this.getBitsDescriptor(), f = this.bits.getTopUppedArray();
      return Ki(Ki(t, e), f);
    }
    getRepr() {
      let t = [];
      t.push(this.getDataWithDescriptors());
      for (let f in this.refs) {
        let n = this.refs[f];
        t.push(n.getMaxDepthAsArray());
      }
      for (let f in this.refs) {
        let n = this.refs[f];
        t.push(n.hash());
      }
      let e = new Uint8Array();
      for (let f in t) {
        let n = t[f];
        e = Ki(e, n);
      }
      return e;
    }
    hash() {
      return new Uint8Array(ya(this.getRepr()));
    }
    print(t) {
      t = t || "";
      let e = t + "x{" + this.bits.toHex() + `}
`;
      for (let f in this.refs) {
        let n = this.refs[f];
        e += n.print(t + " ");
      }
      return e;
    }
    toBoc(t = true, e = true, f = false, n = 0) {
      let y = this.treeWalk(), _ = y[0], E = y[1], S = _.length, I = S.toString(2).length, F = Math.min(Math.ceil(I / 8), 1), P = 0, Y = [];
      for (let it of _)
        Y.push(P), P = P + it[1].bocSerializationSize(E, F);
      let K = P.toString(2).length, Z = Math.max(Math.ceil(K / 8), 1), k = new Lr((1023 + 32 * 4 + 32 * 3) * _.length);
      k.writeBytes(lu), k.writeBitArray([t, e, f]), k.writeUint(n, 2), k.writeUint(F, 3), k.writeUint8(Z), k.writeUint(S, F * 8), k.writeUint(1, F * 8), k.writeUint(0, F * 8), k.writeUint(P, Z * 8), k.writeUint(0, F * 8), t && _.forEach((it, q) => k.writeUint(Y[q], Z * 8));
      for (let it of _) {
        let q = it[1].serializeForBoc(E, F);
        k.writeBytes(q);
      }
      let Tt = k.getTopUppedArray();
      return e && (Tt = Ki(Tt, wa(Tt))), Tt;
    }
    toHex(t = true, e = true, f = false, n = 0) {
      let g = this.toBoc(t, e, f, n);
      return ur(g);
    }
    toBase64(t = true, e = true, f = false, n = 0) {
      let g = this.toBoc(t, e, f, n);
      return Yi(g);
    }
    serializeForBoc(t, e) {
      let f = [];
      if (f.push(this.getDataWithDescriptors()), this.isExplicitlyStoredHashes())
        throw new Error("Cell hashes explicit storing is not implemented");
      for (let g in this.refs) {
        let _ = this.refs[g].hash(), S = t[_].toString(16);
        S.length % 2 && (S = "0" + S);
        let I = Jr(S);
        f.push(I);
      }
      let n = new Uint8Array();
      for (let g in f) {
        let y = f[g];
        n = Ki(n, y);
      }
      return n;
    }
    bocSerializationSize(t, e) {
      return this.serializeForBoc(t, e).length;
    }
    treeWalk() {
      return Ia(this, [], {});
    }
    beginParse() {
      let t = this.refs.map((e) => e.beginParse());
      return new No(this.bits.array.slice(), this.bits.length, t);
    }
  };
});
var La = ae(() => {
});
var xu = ae((wu, qa) => {
  (function(r3, t) {
    function e(c, a) {
      if (!c)
        throw new Error(a || "Assertion failed");
    }
    function f(c, a) {
      c.super_ = a;
      var s = function() {
      };
      s.prototype = a.prototype, c.prototype = new s(), c.prototype.constructor = c;
    }
    function n(c, a, s) {
      if (n.isBN(c))
        return c;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, c !== null && ((a === "le" || a === "be") && (s = a, a = 10), this._init(c || 0, a || 10, s || "be"));
    }
    typeof r3 == "object" ? r3.exports = n : t.BN = n, n.BN = n, n.wordSize = 26;
    var g;
    try {
      g = La().Buffer;
    } catch (c) {
    }
    n.isBN = function(a) {
      return a instanceof n ? true : a !== null && typeof a == "object" && a.constructor.wordSize === n.wordSize && Array.isArray(a.words);
    }, n.max = function(a, s) {
      return a.cmp(s) > 0 ? a : s;
    }, n.min = function(a, s) {
      return a.cmp(s) < 0 ? a : s;
    }, n.prototype._init = function(a, s, h) {
      if (typeof a == "number")
        return this._initNumber(a, s, h);
      if (typeof a == "object")
        return this._initArray(a, s, h);
      s === "hex" && (s = 16), e(s === (s | 0) && s >= 2 && s <= 36), a = a.toString().replace(/\s+/g, "");
      var p = 0;
      a[0] === "-" && p++, s === 16 ? this._parseHex(a, p) : this._parseBase(a, s, p), a[0] === "-" && (this.negative = 1), this._strip(), h === "le" && this._initArray(this.toArray(), s, h);
    }, n.prototype._initNumber = function(a, s, h) {
      a < 0 && (this.negative = 1, a = -a), a < 67108864 ? (this.words = [a & 67108863], this.length = 1) : a < 4503599627370496 ? (this.words = [a & 67108863, a / 67108864 & 67108863], this.length = 2) : (e(a < 9007199254740992), this.words = [a & 67108863, a / 67108864 & 67108863, 1], this.length = 3), h === "le" && this._initArray(this.toArray(), s, h);
    }, n.prototype._initArray = function(a, s, h) {
      if (e(typeof a.length == "number"), a.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(a.length / 3), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var l, i, d = 0;
      if (h === "be")
        for (p = a.length - 1, l = 0; p >= 0; p -= 3)
          i = a[p] | a[p - 1] << 8 | a[p - 2] << 16, this.words[l] |= i << d & 67108863, this.words[l + 1] = i >>> 26 - d & 67108863, d += 24, d >= 26 && (d -= 26, l++);
      else if (h === "le")
        for (p = 0, l = 0; p < a.length; p += 3)
          i = a[p] | a[p + 1] << 8 | a[p + 2] << 16, this.words[l] |= i << d & 67108863, this.words[l + 1] = i >>> 26 - d & 67108863, d += 24, d >= 26 && (d -= 26, l++);
      return this._strip();
    };
    function y(c, a, s) {
      for (var h = 0, p = Math.min(c.length, s), l = 0, i = a; i < p; i++) {
        var d = c.charCodeAt(i) - 48;
        h <<= 4;
        var M;
        d >= 49 && d <= 54 ? M = d - 49 + 10 : d >= 17 && d <= 22 ? M = d - 17 + 10 : M = d, h |= M, l |= M;
      }
      return e(!(l & 240), "Invalid character in " + c), h;
    }
    n.prototype._parseHex = function(a, s) {
      this.length = Math.ceil((a.length - s) / 6), this.words = new Array(this.length);
      for (var h = 0; h < this.length; h++)
        this.words[h] = 0;
      var p, l, i = 0;
      for (h = a.length - 6, p = 0; h >= s; h -= 6)
        l = y(a, h, h + 6), this.words[p] |= l << i & 67108863, this.words[p + 1] |= l >>> 26 - i & 4194303, i += 24, i >= 26 && (i -= 26, p++);
      h + 6 !== s && (l = y(a, s, h + 6), this.words[p] |= l << i & 67108863, this.words[p + 1] |= l >>> 26 - i & 4194303), this._strip();
    };
    function _(c, a, s, h) {
      for (var p = 0, l = 0, i = Math.min(c.length, s), d = a; d < i; d++) {
        var M = c.charCodeAt(d) - 48;
        p *= h, M >= 49 ? l = M - 49 + 10 : M >= 17 ? l = M - 17 + 10 : l = M, e(M >= 0 && l < h, "Invalid character"), p += l;
      }
      return p;
    }
    n.prototype._parseBase = function(a, s, h) {
      this.words = [0], this.length = 1;
      for (var p = 0, l = 1; l <= 67108863; l *= s)
        p++;
      p--, l = l / s | 0;
      for (var i = a.length - h, d = i % p, M = Math.min(i, i - d) + h, m = 0, v = h; v < M; v += p)
        m = _(a, v, v + p, s), this.imuln(l), this.words[0] + m < 67108864 ? this.words[0] += m : this._iaddn(m);
      if (d !== 0) {
        var B = 1;
        for (m = _(a, v, a.length, s), v = 0; v < d; v++)
          B *= s;
        this.imuln(B), this.words[0] + m < 67108864 ? this.words[0] += m : this._iaddn(m);
      }
    }, n.prototype.copy = function(a) {
      a.words = new Array(this.length);
      for (var s = 0; s < this.length; s++)
        a.words[s] = this.words[s];
      a.length = this.length, a.negative = this.negative, a.red = this.red;
    };
    function E(c, a) {
      c.words = a.words, c.length = a.length, c.negative = a.negative, c.red = a.red;
    }
    n.prototype._move = function(a) {
      E(a, this);
    }, n.prototype.clone = function() {
      var a = new n(null);
      return this.copy(a), a;
    }, n.prototype._expand = function(a) {
      for (; this.length < a; )
        this.words[this.length++] = 0;
      return this;
    }, n.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, n.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol != "undefined" && typeof Symbol.for == "function" ? n.prototype[Symbol.for("nodejs.util.inspect.custom")] = S : n.prototype.inspect = S;
    function S() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var I = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], F = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], P = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    n.prototype.toString = function(a, s) {
      a = a || 10, s = s | 0 || 1;
      var h;
      if (a === 16 || a === "hex") {
        h = "";
        for (var p = 0, l = 0, i = 0; i < this.length; i++) {
          var d = this.words[i], M = ((d << p | l) & 16777215).toString(16);
          l = d >>> 24 - p & 16777215, l !== 0 || i !== this.length - 1 ? h = I[6 - M.length] + M + h : h = M + h, p += 2, p >= 26 && (p -= 26, i--);
        }
        for (l !== 0 && (h = l.toString(16) + h); h.length % s !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var m = F[a], v = P[a];
        h = "";
        var B = this.clone();
        for (B.negative = 0; !B.isZero(); ) {
          var O = B.modrn(v).toString(a);
          B = B.idivn(v), B.isZero() ? h = O + h : h = I[m - O.length] + O + h;
        }
        for (this.isZero() && (h = "0" + h); h.length % s !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
      }
      e(false, "Base should be between 2 and 36");
    }, n.prototype.toNumber = function() {
      var a = this.words[0];
      return this.length === 2 ? a += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? a += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && e(false, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -a : a;
    }, n.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, g && (n.prototype.toBuffer = function(a, s) {
      return this.toArrayLike(g, a, s);
    }), n.prototype.toArray = function(a, s) {
      return this.toArrayLike(Array, a, s);
    };
    var Y = function(a, s) {
      return a.allocUnsafe ? a.allocUnsafe(s) : new a(s);
    };
    n.prototype.toArrayLike = function(a, s, h) {
      this._strip();
      var p = this.byteLength(), l = h || Math.max(1, p);
      e(p <= l, "byte array longer than desired length"), e(l > 0, "Requested array length <= 0");
      var i = Y(a, l), d = s === "le" ? "LE" : "BE";
      return this["_toArrayLike" + d](i, p), i;
    }, n.prototype._toArrayLikeLE = function(a, s) {
      for (var h = 0, p = 0, l = 0, i = 0; l < this.length; l++) {
        var d = this.words[l] << i | p;
        a[h++] = d & 255, h < a.length && (a[h++] = d >> 8 & 255), h < a.length && (a[h++] = d >> 16 & 255), i === 6 ? (h < a.length && (a[h++] = d >> 24 & 255), p = 0, i = 0) : (p = d >>> 24, i += 2);
      }
      if (h < a.length)
        for (a[h++] = p; h < a.length; )
          a[h++] = 0;
    }, n.prototype._toArrayLikeBE = function(a, s) {
      for (var h = a.length - 1, p = 0, l = 0, i = 0; l < this.length; l++) {
        var d = this.words[l] << i | p;
        a[h--] = d & 255, h >= 0 && (a[h--] = d >> 8 & 255), h >= 0 && (a[h--] = d >> 16 & 255), i === 6 ? (h >= 0 && (a[h--] = d >> 24 & 255), p = 0, i = 0) : (p = d >>> 24, i += 2);
      }
      if (h >= 0)
        for (a[h--] = p; h >= 0; )
          a[h--] = 0;
    }, Math.clz32 ? n.prototype._countBits = function(a) {
      return 32 - Math.clz32(a);
    } : n.prototype._countBits = function(a) {
      var s = a, h = 0;
      return s >= 4096 && (h += 13, s >>>= 13), s >= 64 && (h += 7, s >>>= 7), s >= 8 && (h += 4, s >>>= 4), s >= 2 && (h += 2, s >>>= 2), h + s;
    }, n.prototype._zeroBits = function(a) {
      if (a === 0)
        return 26;
      var s = a, h = 0;
      return s & 8191 || (h += 13, s >>>= 13), s & 127 || (h += 7, s >>>= 7), s & 15 || (h += 4, s >>>= 4), s & 3 || (h += 2, s >>>= 2), s & 1 || h++, h;
    }, n.prototype.bitLength = function() {
      var a = this.words[this.length - 1], s = this._countBits(a);
      return (this.length - 1) * 26 + s;
    };
    function K(c) {
      for (var a = new Array(c.bitLength()), s = 0; s < a.length; s++) {
        var h = s / 26 | 0, p = s % 26;
        a[s] = c.words[h] >>> p & 1;
      }
      return a;
    }
    n.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var a = 0, s = 0; s < this.length; s++) {
        var h = this._zeroBits(this.words[s]);
        if (a += h, h !== 26)
          break;
      }
      return a;
    }, n.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, n.prototype.toTwos = function(a) {
      return this.negative !== 0 ? this.abs().inotn(a).iaddn(1) : this.clone();
    }, n.prototype.fromTwos = function(a) {
      return this.testn(a - 1) ? this.notn(a).iaddn(1).ineg() : this.clone();
    }, n.prototype.isNeg = function() {
      return this.negative !== 0;
    }, n.prototype.neg = function() {
      return this.clone().ineg();
    }, n.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, n.prototype.iuor = function(a) {
      for (; this.length < a.length; )
        this.words[this.length++] = 0;
      for (var s = 0; s < a.length; s++)
        this.words[s] = this.words[s] | a.words[s];
      return this._strip();
    }, n.prototype.ior = function(a) {
      return e((this.negative | a.negative) === 0), this.iuor(a);
    }, n.prototype.or = function(a) {
      return this.length > a.length ? this.clone().ior(a) : a.clone().ior(this);
    }, n.prototype.uor = function(a) {
      return this.length > a.length ? this.clone().iuor(a) : a.clone().iuor(this);
    }, n.prototype.iuand = function(a) {
      var s;
      this.length > a.length ? s = a : s = this;
      for (var h = 0; h < s.length; h++)
        this.words[h] = this.words[h] & a.words[h];
      return this.length = s.length, this._strip();
    }, n.prototype.iand = function(a) {
      return e((this.negative | a.negative) === 0), this.iuand(a);
    }, n.prototype.and = function(a) {
      return this.length > a.length ? this.clone().iand(a) : a.clone().iand(this);
    }, n.prototype.uand = function(a) {
      return this.length > a.length ? this.clone().iuand(a) : a.clone().iuand(this);
    }, n.prototype.iuxor = function(a) {
      var s, h;
      this.length > a.length ? (s = this, h = a) : (s = a, h = this);
      for (var p = 0; p < h.length; p++)
        this.words[p] = s.words[p] ^ h.words[p];
      if (this !== s)
        for (; p < s.length; p++)
          this.words[p] = s.words[p];
      return this.length = s.length, this._strip();
    }, n.prototype.ixor = function(a) {
      return e((this.negative | a.negative) === 0), this.iuxor(a);
    }, n.prototype.xor = function(a) {
      return this.length > a.length ? this.clone().ixor(a) : a.clone().ixor(this);
    }, n.prototype.uxor = function(a) {
      return this.length > a.length ? this.clone().iuxor(a) : a.clone().iuxor(this);
    }, n.prototype.inotn = function(a) {
      e(typeof a == "number" && a >= 0);
      var s = Math.ceil(a / 26) | 0, h = a % 26;
      this._expand(s), h > 0 && s--;
      for (var p = 0; p < s; p++)
        this.words[p] = ~this.words[p] & 67108863;
      return h > 0 && (this.words[p] = ~this.words[p] & 67108863 >> 26 - h), this._strip();
    }, n.prototype.notn = function(a) {
      return this.clone().inotn(a);
    }, n.prototype.setn = function(a, s) {
      e(typeof a == "number" && a >= 0);
      var h = a / 26 | 0, p = a % 26;
      return this._expand(h + 1), s ? this.words[h] = this.words[h] | 1 << p : this.words[h] = this.words[h] & ~(1 << p), this._strip();
    }, n.prototype.iadd = function(a) {
      var s;
      if (this.negative !== 0 && a.negative === 0)
        return this.negative = 0, s = this.isub(a), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && a.negative !== 0)
        return a.negative = 0, s = this.isub(a), a.negative = 1, s._normSign();
      var h, p;
      this.length > a.length ? (h = this, p = a) : (h = a, p = this);
      for (var l = 0, i = 0; i < p.length; i++)
        s = (h.words[i] | 0) + (p.words[i] | 0) + l, this.words[i] = s & 67108863, l = s >>> 26;
      for (; l !== 0 && i < h.length; i++)
        s = (h.words[i] | 0) + l, this.words[i] = s & 67108863, l = s >>> 26;
      if (this.length = h.length, l !== 0)
        this.words[this.length] = l, this.length++;
      else if (h !== this)
        for (; i < h.length; i++)
          this.words[i] = h.words[i];
      return this;
    }, n.prototype.add = function(a) {
      var s;
      return a.negative !== 0 && this.negative === 0 ? (a.negative = 0, s = this.sub(a), a.negative ^= 1, s) : a.negative === 0 && this.negative !== 0 ? (this.negative = 0, s = a.sub(this), this.negative = 1, s) : this.length > a.length ? this.clone().iadd(a) : a.clone().iadd(this);
    }, n.prototype.isub = function(a) {
      if (a.negative !== 0) {
        a.negative = 0;
        var s = this.iadd(a);
        return a.negative = 1, s._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(a), this.negative = 1, this._normSign();
      var h = this.cmp(a);
      if (h === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var p, l;
      h > 0 ? (p = this, l = a) : (p = a, l = this);
      for (var i = 0, d = 0; d < l.length; d++)
        s = (p.words[d] | 0) - (l.words[d] | 0) + i, i = s >> 26, this.words[d] = s & 67108863;
      for (; i !== 0 && d < p.length; d++)
        s = (p.words[d] | 0) + i, i = s >> 26, this.words[d] = s & 67108863;
      if (i === 0 && d < p.length && p !== this)
        for (; d < p.length; d++)
          this.words[d] = p.words[d];
      return this.length = Math.max(this.length, d), p !== this && (this.negative = 1), this._strip();
    }, n.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function Z(c, a, s) {
      s.negative = a.negative ^ c.negative;
      var h = c.length + a.length | 0;
      s.length = h, h = h - 1 | 0;
      var p = c.words[0] | 0, l = a.words[0] | 0, i = p * l, d = i & 67108863, M = i / 67108864 | 0;
      s.words[0] = d;
      for (var m = 1; m < h; m++) {
        for (var v = M >>> 26, B = M & 67108863, O = Math.min(m, a.length - 1), $ = Math.max(0, m - c.length + 1); $ <= O; $++) {
          var ut = m - $ | 0;
          p = c.words[ut] | 0, l = a.words[$] | 0, i = p * l + B, v += i / 67108864 | 0, B = i & 67108863;
        }
        s.words[m] = B | 0, M = v | 0;
      }
      return M !== 0 ? s.words[m] = M | 0 : s.length--, s._strip();
    }
    var k = function(a, s, h) {
      var p = a.words, l = s.words, i = h.words, d = 0, M, m, v, B = p[0] | 0, O = B & 8191, $ = B >>> 13, ut = p[1] | 0, V = ut & 8191, ot = ut >>> 13, le = p[2] | 0, St = le & 8191, pt = le >>> 13, de = p[3] | 0, zt = de & 8191, Et = de >>> 13, ne = p[4] | 0, qt = ne & 8191, _t = ne >>> 13, fe = p[5] | 0, Pt = fe & 8191, bt = fe >>> 13, be = p[6] | 0, kt = be & 8191, Mt = be >>> 13, me = p[7] | 0, Lt = me & 8191, wt = me >>> 13, _e = p[8] | 0, It = _e & 8191, Bt = _e >>> 13, Ee = p[9] | 0, Wt = Ee & 8191, yt = Ee >>> 13, xe = l[0] | 0, Ut = xe & 8191, gt = xe >>> 13, Ae = l[1] | 0, Dt = Ae & 8191, xt = Ae >>> 13, D = l[2] | 0, N = D & 8191, U = D >>> 13, st = l[3] | 0, H = st & 8191, J = st >>> 13, Ft = l[4] | 0, ht = Ft & 8191, tt = Ft >>> 13, Zt = l[5] | 0, Ct = Zt & 8191, at = Zt >>> 13, ce = l[6] | 0, b = ce & 8191, C = ce >>> 13, T = l[7] | 0, w = T & 8191, A = T >>> 13, W = l[8] | 0, R = W & 8191, L = W >>> 13, lt = l[9] | 0, Nt = lt & 8191, dt = lt >>> 13;
      h.negative = a.negative ^ s.negative, h.length = 19, M = Math.imul(O, Ut), m = Math.imul(O, gt), m = m + Math.imul($, Ut) | 0, v = Math.imul($, gt);
      var Jt = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (Jt >>> 26) | 0, Jt &= 67108863, M = Math.imul(V, Ut), m = Math.imul(V, gt), m = m + Math.imul(ot, Ut) | 0, v = Math.imul(ot, gt), M = M + Math.imul(O, Dt) | 0, m = m + Math.imul(O, xt) | 0, m = m + Math.imul($, Dt) | 0, v = v + Math.imul($, xt) | 0;
      var Kt = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (Kt >>> 26) | 0, Kt &= 67108863, M = Math.imul(St, Ut), m = Math.imul(St, gt), m = m + Math.imul(pt, Ut) | 0, v = Math.imul(pt, gt), M = M + Math.imul(V, Dt) | 0, m = m + Math.imul(V, xt) | 0, m = m + Math.imul(ot, Dt) | 0, v = v + Math.imul(ot, xt) | 0, M = M + Math.imul(O, N) | 0, m = m + Math.imul(O, U) | 0, m = m + Math.imul($, N) | 0, v = v + Math.imul($, U) | 0;
      var Xt = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (Xt >>> 26) | 0, Xt &= 67108863, M = Math.imul(zt, Ut), m = Math.imul(zt, gt), m = m + Math.imul(Et, Ut) | 0, v = Math.imul(Et, gt), M = M + Math.imul(St, Dt) | 0, m = m + Math.imul(St, xt) | 0, m = m + Math.imul(pt, Dt) | 0, v = v + Math.imul(pt, xt) | 0, M = M + Math.imul(V, N) | 0, m = m + Math.imul(V, U) | 0, m = m + Math.imul(ot, N) | 0, v = v + Math.imul(ot, U) | 0, M = M + Math.imul(O, H) | 0, m = m + Math.imul(O, J) | 0, m = m + Math.imul($, H) | 0, v = v + Math.imul($, J) | 0;
      var Qt = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (Qt >>> 26) | 0, Qt &= 67108863, M = Math.imul(qt, Ut), m = Math.imul(qt, gt), m = m + Math.imul(_t, Ut) | 0, v = Math.imul(_t, gt), M = M + Math.imul(zt, Dt) | 0, m = m + Math.imul(zt, xt) | 0, m = m + Math.imul(Et, Dt) | 0, v = v + Math.imul(Et, xt) | 0, M = M + Math.imul(St, N) | 0, m = m + Math.imul(St, U) | 0, m = m + Math.imul(pt, N) | 0, v = v + Math.imul(pt, U) | 0, M = M + Math.imul(V, H) | 0, m = m + Math.imul(V, J) | 0, m = m + Math.imul(ot, H) | 0, v = v + Math.imul(ot, J) | 0, M = M + Math.imul(O, ht) | 0, m = m + Math.imul(O, tt) | 0, m = m + Math.imul($, ht) | 0, v = v + Math.imul($, tt) | 0;
      var se = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (se >>> 26) | 0, se &= 67108863, M = Math.imul(Pt, Ut), m = Math.imul(Pt, gt), m = m + Math.imul(bt, Ut) | 0, v = Math.imul(bt, gt), M = M + Math.imul(qt, Dt) | 0, m = m + Math.imul(qt, xt) | 0, m = m + Math.imul(_t, Dt) | 0, v = v + Math.imul(_t, xt) | 0, M = M + Math.imul(zt, N) | 0, m = m + Math.imul(zt, U) | 0, m = m + Math.imul(Et, N) | 0, v = v + Math.imul(Et, U) | 0, M = M + Math.imul(St, H) | 0, m = m + Math.imul(St, J) | 0, m = m + Math.imul(pt, H) | 0, v = v + Math.imul(pt, J) | 0, M = M + Math.imul(V, ht) | 0, m = m + Math.imul(V, tt) | 0, m = m + Math.imul(ot, ht) | 0, v = v + Math.imul(ot, tt) | 0, M = M + Math.imul(O, Ct) | 0, m = m + Math.imul(O, at) | 0, m = m + Math.imul($, Ct) | 0, v = v + Math.imul($, at) | 0;
      var oe = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (oe >>> 26) | 0, oe &= 67108863, M = Math.imul(kt, Ut), m = Math.imul(kt, gt), m = m + Math.imul(Mt, Ut) | 0, v = Math.imul(Mt, gt), M = M + Math.imul(Pt, Dt) | 0, m = m + Math.imul(Pt, xt) | 0, m = m + Math.imul(bt, Dt) | 0, v = v + Math.imul(bt, xt) | 0, M = M + Math.imul(qt, N) | 0, m = m + Math.imul(qt, U) | 0, m = m + Math.imul(_t, N) | 0, v = v + Math.imul(_t, U) | 0, M = M + Math.imul(zt, H) | 0, m = m + Math.imul(zt, J) | 0, m = m + Math.imul(Et, H) | 0, v = v + Math.imul(Et, J) | 0, M = M + Math.imul(St, ht) | 0, m = m + Math.imul(St, tt) | 0, m = m + Math.imul(pt, ht) | 0, v = v + Math.imul(pt, tt) | 0, M = M + Math.imul(V, Ct) | 0, m = m + Math.imul(V, at) | 0, m = m + Math.imul(ot, Ct) | 0, v = v + Math.imul(ot, at) | 0, M = M + Math.imul(O, b) | 0, m = m + Math.imul(O, C) | 0, m = m + Math.imul($, b) | 0, v = v + Math.imul($, C) | 0;
      var te = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (te >>> 26) | 0, te &= 67108863, M = Math.imul(Lt, Ut), m = Math.imul(Lt, gt), m = m + Math.imul(wt, Ut) | 0, v = Math.imul(wt, gt), M = M + Math.imul(kt, Dt) | 0, m = m + Math.imul(kt, xt) | 0, m = m + Math.imul(Mt, Dt) | 0, v = v + Math.imul(Mt, xt) | 0, M = M + Math.imul(Pt, N) | 0, m = m + Math.imul(Pt, U) | 0, m = m + Math.imul(bt, N) | 0, v = v + Math.imul(bt, U) | 0, M = M + Math.imul(qt, H) | 0, m = m + Math.imul(qt, J) | 0, m = m + Math.imul(_t, H) | 0, v = v + Math.imul(_t, J) | 0, M = M + Math.imul(zt, ht) | 0, m = m + Math.imul(zt, tt) | 0, m = m + Math.imul(Et, ht) | 0, v = v + Math.imul(Et, tt) | 0, M = M + Math.imul(St, Ct) | 0, m = m + Math.imul(St, at) | 0, m = m + Math.imul(pt, Ct) | 0, v = v + Math.imul(pt, at) | 0, M = M + Math.imul(V, b) | 0, m = m + Math.imul(V, C) | 0, m = m + Math.imul(ot, b) | 0, v = v + Math.imul(ot, C) | 0, M = M + Math.imul(O, w) | 0, m = m + Math.imul(O, A) | 0, m = m + Math.imul($, w) | 0, v = v + Math.imul($, A) | 0;
      var re = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (re >>> 26) | 0, re &= 67108863, M = Math.imul(It, Ut), m = Math.imul(It, gt), m = m + Math.imul(Bt, Ut) | 0, v = Math.imul(Bt, gt), M = M + Math.imul(Lt, Dt) | 0, m = m + Math.imul(Lt, xt) | 0, m = m + Math.imul(wt, Dt) | 0, v = v + Math.imul(wt, xt) | 0, M = M + Math.imul(kt, N) | 0, m = m + Math.imul(kt, U) | 0, m = m + Math.imul(Mt, N) | 0, v = v + Math.imul(Mt, U) | 0, M = M + Math.imul(Pt, H) | 0, m = m + Math.imul(Pt, J) | 0, m = m + Math.imul(bt, H) | 0, v = v + Math.imul(bt, J) | 0, M = M + Math.imul(qt, ht) | 0, m = m + Math.imul(qt, tt) | 0, m = m + Math.imul(_t, ht) | 0, v = v + Math.imul(_t, tt) | 0, M = M + Math.imul(zt, Ct) | 0, m = m + Math.imul(zt, at) | 0, m = m + Math.imul(Et, Ct) | 0, v = v + Math.imul(Et, at) | 0, M = M + Math.imul(St, b) | 0, m = m + Math.imul(St, C) | 0, m = m + Math.imul(pt, b) | 0, v = v + Math.imul(pt, C) | 0, M = M + Math.imul(V, w) | 0, m = m + Math.imul(V, A) | 0, m = m + Math.imul(ot, w) | 0, v = v + Math.imul(ot, A) | 0, M = M + Math.imul(O, R) | 0, m = m + Math.imul(O, L) | 0, m = m + Math.imul($, R) | 0, v = v + Math.imul($, L) | 0;
      var ee = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (ee >>> 26) | 0, ee &= 67108863, M = Math.imul(Wt, Ut), m = Math.imul(Wt, gt), m = m + Math.imul(yt, Ut) | 0, v = Math.imul(yt, gt), M = M + Math.imul(It, Dt) | 0, m = m + Math.imul(It, xt) | 0, m = m + Math.imul(Bt, Dt) | 0, v = v + Math.imul(Bt, xt) | 0, M = M + Math.imul(Lt, N) | 0, m = m + Math.imul(Lt, U) | 0, m = m + Math.imul(wt, N) | 0, v = v + Math.imul(wt, U) | 0, M = M + Math.imul(kt, H) | 0, m = m + Math.imul(kt, J) | 0, m = m + Math.imul(Mt, H) | 0, v = v + Math.imul(Mt, J) | 0, M = M + Math.imul(Pt, ht) | 0, m = m + Math.imul(Pt, tt) | 0, m = m + Math.imul(bt, ht) | 0, v = v + Math.imul(bt, tt) | 0, M = M + Math.imul(qt, Ct) | 0, m = m + Math.imul(qt, at) | 0, m = m + Math.imul(_t, Ct) | 0, v = v + Math.imul(_t, at) | 0, M = M + Math.imul(zt, b) | 0, m = m + Math.imul(zt, C) | 0, m = m + Math.imul(Et, b) | 0, v = v + Math.imul(Et, C) | 0, M = M + Math.imul(St, w) | 0, m = m + Math.imul(St, A) | 0, m = m + Math.imul(pt, w) | 0, v = v + Math.imul(pt, A) | 0, M = M + Math.imul(V, R) | 0, m = m + Math.imul(V, L) | 0, m = m + Math.imul(ot, R) | 0, v = v + Math.imul(ot, L) | 0, M = M + Math.imul(O, Nt) | 0, m = m + Math.imul(O, dt) | 0, m = m + Math.imul($, Nt) | 0, v = v + Math.imul($, dt) | 0;
      var Yt = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (Yt >>> 26) | 0, Yt &= 67108863, M = Math.imul(Wt, Dt), m = Math.imul(Wt, xt), m = m + Math.imul(yt, Dt) | 0, v = Math.imul(yt, xt), M = M + Math.imul(It, N) | 0, m = m + Math.imul(It, U) | 0, m = m + Math.imul(Bt, N) | 0, v = v + Math.imul(Bt, U) | 0, M = M + Math.imul(Lt, H) | 0, m = m + Math.imul(Lt, J) | 0, m = m + Math.imul(wt, H) | 0, v = v + Math.imul(wt, J) | 0, M = M + Math.imul(kt, ht) | 0, m = m + Math.imul(kt, tt) | 0, m = m + Math.imul(Mt, ht) | 0, v = v + Math.imul(Mt, tt) | 0, M = M + Math.imul(Pt, Ct) | 0, m = m + Math.imul(Pt, at) | 0, m = m + Math.imul(bt, Ct) | 0, v = v + Math.imul(bt, at) | 0, M = M + Math.imul(qt, b) | 0, m = m + Math.imul(qt, C) | 0, m = m + Math.imul(_t, b) | 0, v = v + Math.imul(_t, C) | 0, M = M + Math.imul(zt, w) | 0, m = m + Math.imul(zt, A) | 0, m = m + Math.imul(Et, w) | 0, v = v + Math.imul(Et, A) | 0, M = M + Math.imul(St, R) | 0, m = m + Math.imul(St, L) | 0, m = m + Math.imul(pt, R) | 0, v = v + Math.imul(pt, L) | 0, M = M + Math.imul(V, Nt) | 0, m = m + Math.imul(V, dt) | 0, m = m + Math.imul(ot, Nt) | 0, v = v + Math.imul(ot, dt) | 0;
      var Gt = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (Gt >>> 26) | 0, Gt &= 67108863, M = Math.imul(Wt, N), m = Math.imul(Wt, U), m = m + Math.imul(yt, N) | 0, v = Math.imul(yt, U), M = M + Math.imul(It, H) | 0, m = m + Math.imul(It, J) | 0, m = m + Math.imul(Bt, H) | 0, v = v + Math.imul(Bt, J) | 0, M = M + Math.imul(Lt, ht) | 0, m = m + Math.imul(Lt, tt) | 0, m = m + Math.imul(wt, ht) | 0, v = v + Math.imul(wt, tt) | 0, M = M + Math.imul(kt, Ct) | 0, m = m + Math.imul(kt, at) | 0, m = m + Math.imul(Mt, Ct) | 0, v = v + Math.imul(Mt, at) | 0, M = M + Math.imul(Pt, b) | 0, m = m + Math.imul(Pt, C) | 0, m = m + Math.imul(bt, b) | 0, v = v + Math.imul(bt, C) | 0, M = M + Math.imul(qt, w) | 0, m = m + Math.imul(qt, A) | 0, m = m + Math.imul(_t, w) | 0, v = v + Math.imul(_t, A) | 0, M = M + Math.imul(zt, R) | 0, m = m + Math.imul(zt, L) | 0, m = m + Math.imul(Et, R) | 0, v = v + Math.imul(Et, L) | 0, M = M + Math.imul(St, Nt) | 0, m = m + Math.imul(St, dt) | 0, m = m + Math.imul(pt, Nt) | 0, v = v + Math.imul(pt, dt) | 0;
      var jt = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863, M = Math.imul(Wt, H), m = Math.imul(Wt, J), m = m + Math.imul(yt, H) | 0, v = Math.imul(yt, J), M = M + Math.imul(It, ht) | 0, m = m + Math.imul(It, tt) | 0, m = m + Math.imul(Bt, ht) | 0, v = v + Math.imul(Bt, tt) | 0, M = M + Math.imul(Lt, Ct) | 0, m = m + Math.imul(Lt, at) | 0, m = m + Math.imul(wt, Ct) | 0, v = v + Math.imul(wt, at) | 0, M = M + Math.imul(kt, b) | 0, m = m + Math.imul(kt, C) | 0, m = m + Math.imul(Mt, b) | 0, v = v + Math.imul(Mt, C) | 0, M = M + Math.imul(Pt, w) | 0, m = m + Math.imul(Pt, A) | 0, m = m + Math.imul(bt, w) | 0, v = v + Math.imul(bt, A) | 0, M = M + Math.imul(qt, R) | 0, m = m + Math.imul(qt, L) | 0, m = m + Math.imul(_t, R) | 0, v = v + Math.imul(_t, L) | 0, M = M + Math.imul(zt, Nt) | 0, m = m + Math.imul(zt, dt) | 0, m = m + Math.imul(Et, Nt) | 0, v = v + Math.imul(Et, dt) | 0;
      var Ht = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (Ht >>> 26) | 0, Ht &= 67108863, M = Math.imul(Wt, ht), m = Math.imul(Wt, tt), m = m + Math.imul(yt, ht) | 0, v = Math.imul(yt, tt), M = M + Math.imul(It, Ct) | 0, m = m + Math.imul(It, at) | 0, m = m + Math.imul(Bt, Ct) | 0, v = v + Math.imul(Bt, at) | 0, M = M + Math.imul(Lt, b) | 0, m = m + Math.imul(Lt, C) | 0, m = m + Math.imul(wt, b) | 0, v = v + Math.imul(wt, C) | 0, M = M + Math.imul(kt, w) | 0, m = m + Math.imul(kt, A) | 0, m = m + Math.imul(Mt, w) | 0, v = v + Math.imul(Mt, A) | 0, M = M + Math.imul(Pt, R) | 0, m = m + Math.imul(Pt, L) | 0, m = m + Math.imul(bt, R) | 0, v = v + Math.imul(bt, L) | 0, M = M + Math.imul(qt, Nt) | 0, m = m + Math.imul(qt, dt) | 0, m = m + Math.imul(_t, Nt) | 0, v = v + Math.imul(_t, dt) | 0;
      var Vt = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (Vt >>> 26) | 0, Vt &= 67108863, M = Math.imul(Wt, Ct), m = Math.imul(Wt, at), m = m + Math.imul(yt, Ct) | 0, v = Math.imul(yt, at), M = M + Math.imul(It, b) | 0, m = m + Math.imul(It, C) | 0, m = m + Math.imul(Bt, b) | 0, v = v + Math.imul(Bt, C) | 0, M = M + Math.imul(Lt, w) | 0, m = m + Math.imul(Lt, A) | 0, m = m + Math.imul(wt, w) | 0, v = v + Math.imul(wt, A) | 0, M = M + Math.imul(kt, R) | 0, m = m + Math.imul(kt, L) | 0, m = m + Math.imul(Mt, R) | 0, v = v + Math.imul(Mt, L) | 0, M = M + Math.imul(Pt, Nt) | 0, m = m + Math.imul(Pt, dt) | 0, m = m + Math.imul(bt, Nt) | 0, v = v + Math.imul(bt, dt) | 0;
      var Ot = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, M = Math.imul(Wt, b), m = Math.imul(Wt, C), m = m + Math.imul(yt, b) | 0, v = Math.imul(yt, C), M = M + Math.imul(It, w) | 0, m = m + Math.imul(It, A) | 0, m = m + Math.imul(Bt, w) | 0, v = v + Math.imul(Bt, A) | 0, M = M + Math.imul(Lt, R) | 0, m = m + Math.imul(Lt, L) | 0, m = m + Math.imul(wt, R) | 0, v = v + Math.imul(wt, L) | 0, M = M + Math.imul(kt, Nt) | 0, m = m + Math.imul(kt, dt) | 0, m = m + Math.imul(Mt, Nt) | 0, v = v + Math.imul(Mt, dt) | 0;
      var G = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (G >>> 26) | 0, G &= 67108863, M = Math.imul(Wt, w), m = Math.imul(Wt, A), m = m + Math.imul(yt, w) | 0, v = Math.imul(yt, A), M = M + Math.imul(It, R) | 0, m = m + Math.imul(It, L) | 0, m = m + Math.imul(Bt, R) | 0, v = v + Math.imul(Bt, L) | 0, M = M + Math.imul(Lt, Nt) | 0, m = m + Math.imul(Lt, dt) | 0, m = m + Math.imul(wt, Nt) | 0, v = v + Math.imul(wt, dt) | 0;
      var et = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (et >>> 26) | 0, et &= 67108863, M = Math.imul(Wt, R), m = Math.imul(Wt, L), m = m + Math.imul(yt, R) | 0, v = Math.imul(yt, L), M = M + Math.imul(It, Nt) | 0, m = m + Math.imul(It, dt) | 0, m = m + Math.imul(Bt, Nt) | 0, v = v + Math.imul(Bt, dt) | 0;
      var At = (d + M | 0) + ((m & 8191) << 13) | 0;
      d = (v + (m >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, M = Math.imul(Wt, Nt), m = Math.imul(Wt, dt), m = m + Math.imul(yt, Nt) | 0, v = Math.imul(yt, dt);
      var mt = (d + M | 0) + ((m & 8191) << 13) | 0;
      return d = (v + (m >>> 13) | 0) + (mt >>> 26) | 0, mt &= 67108863, i[0] = Jt, i[1] = Kt, i[2] = Xt, i[3] = Qt, i[4] = se, i[5] = oe, i[6] = te, i[7] = re, i[8] = ee, i[9] = Yt, i[10] = Gt, i[11] = jt, i[12] = Ht, i[13] = Vt, i[14] = Ot, i[15] = G, i[16] = et, i[17] = At, i[18] = mt, d !== 0 && (i[19] = d, h.length++), h;
    };
    Math.imul || (k = Z);
    function Tt(c, a, s) {
      s.negative = a.negative ^ c.negative, s.length = c.length + a.length;
      for (var h = 0, p = 0, l = 0; l < s.length - 1; l++) {
        var i = p;
        p = 0;
        for (var d = h & 67108863, M = Math.min(l, a.length - 1), m = Math.max(0, l - c.length + 1); m <= M; m++) {
          var v = l - m, B = c.words[v] | 0, O = a.words[m] | 0, $ = B * O, ut = $ & 67108863;
          i = i + ($ / 67108864 | 0) | 0, ut = ut + d | 0, d = ut & 67108863, i = i + (ut >>> 26) | 0, p += i >>> 26, i &= 67108863;
        }
        s.words[l] = d, h = i, i = p;
      }
      return h !== 0 ? s.words[l] = h : s.length--, s._strip();
    }
    function it(c, a, s) {
      return Tt(c, a, s);
    }
    n.prototype.mulTo = function(a, s) {
      var h, p = this.length + a.length;
      return this.length === 10 && a.length === 10 ? h = k(this, a, s) : p < 63 ? h = Z(this, a, s) : p < 1024 ? h = Tt(this, a, s) : h = it(this, a, s), h;
    };
    n.prototype.mul = function(a) {
      var s = new n(null);
      return s.words = new Array(this.length + a.length), this.mulTo(a, s);
    }, n.prototype.mulf = function(a) {
      var s = new n(null);
      return s.words = new Array(this.length + a.length), it(this, a, s);
    }, n.prototype.imul = function(a) {
      return this.clone().mulTo(a, this);
    }, n.prototype.imuln = function(a) {
      var s = a < 0;
      s && (a = -a), e(typeof a == "number"), e(a < 67108864);
      for (var h = 0, p = 0; p < this.length; p++) {
        var l = (this.words[p] | 0) * a, i = (l & 67108863) + (h & 67108863);
        h >>= 26, h += l / 67108864 | 0, h += i >>> 26, this.words[p] = i & 67108863;
      }
      return h !== 0 && (this.words[p] = h, this.length++), s ? this.ineg() : this;
    }, n.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, n.prototype.sqr = function() {
      return this.mul(this);
    }, n.prototype.isqr = function() {
      return this.imul(this.clone());
    }, n.prototype.pow = function(a) {
      var s = K(a);
      if (s.length === 0)
        return new n(1);
      for (var h = this, p = 0; p < s.length && s[p] === 0; p++, h = h.sqr())
        ;
      if (++p < s.length)
        for (var l = h.sqr(); p < s.length; p++, l = l.sqr())
          s[p] !== 0 && (h = h.mul(l));
      return h;
    }, n.prototype.iushln = function(a) {
      e(typeof a == "number" && a >= 0);
      var s = a % 26, h = (a - s) / 26, p = 67108863 >>> 26 - s << 26 - s, l;
      if (s !== 0) {
        var i = 0;
        for (l = 0; l < this.length; l++) {
          var d = this.words[l] & p, M = (this.words[l] | 0) - d << s;
          this.words[l] = M | i, i = d >>> 26 - s;
        }
        i && (this.words[l] = i, this.length++);
      }
      if (h !== 0) {
        for (l = this.length - 1; l >= 0; l--)
          this.words[l + h] = this.words[l];
        for (l = 0; l < h; l++)
          this.words[l] = 0;
        this.length += h;
      }
      return this._strip();
    }, n.prototype.ishln = function(a) {
      return e(this.negative === 0), this.iushln(a);
    }, n.prototype.iushrn = function(a, s, h) {
      e(typeof a == "number" && a >= 0);
      var p;
      s ? p = (s - s % 26) / 26 : p = 0;
      var l = a % 26, i = Math.min((a - l) / 26, this.length), d = 67108863 ^ 67108863 >>> l << l, M = h;
      if (p -= i, p = Math.max(0, p), M) {
        for (var m = 0; m < i; m++)
          M.words[m] = this.words[m];
        M.length = i;
      }
      if (i !== 0)
        if (this.length > i)
          for (this.length -= i, m = 0; m < this.length; m++)
            this.words[m] = this.words[m + i];
        else
          this.words[0] = 0, this.length = 1;
      var v = 0;
      for (m = this.length - 1; m >= 0 && (v !== 0 || m >= p); m--) {
        var B = this.words[m] | 0;
        this.words[m] = v << 26 - l | B >>> l, v = B & d;
      }
      return M && v !== 0 && (M.words[M.length++] = v), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, n.prototype.ishrn = function(a, s, h) {
      return e(this.negative === 0), this.iushrn(a, s, h);
    }, n.prototype.shln = function(a) {
      return this.clone().ishln(a);
    }, n.prototype.ushln = function(a) {
      return this.clone().iushln(a);
    }, n.prototype.shrn = function(a) {
      return this.clone().ishrn(a);
    }, n.prototype.ushrn = function(a) {
      return this.clone().iushrn(a);
    }, n.prototype.testn = function(a) {
      e(typeof a == "number" && a >= 0);
      var s = a % 26, h = (a - s) / 26, p = 1 << s;
      if (this.length <= h)
        return false;
      var l = this.words[h];
      return !!(l & p);
    }, n.prototype.imaskn = function(a) {
      e(typeof a == "number" && a >= 0);
      var s = a % 26, h = (a - s) / 26;
      if (e(this.negative === 0, "imaskn works only with positive numbers"), this.length <= h)
        return this;
      if (s !== 0 && h++, this.length = Math.min(h, this.length), s !== 0) {
        var p = 67108863 ^ 67108863 >>> s << s;
        this.words[this.length - 1] &= p;
      }
      return this._strip();
    }, n.prototype.maskn = function(a) {
      return this.clone().imaskn(a);
    }, n.prototype.iaddn = function(a) {
      return e(typeof a == "number"), e(a < 67108864), a < 0 ? this.isubn(-a) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= a ? (this.words[0] = a - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(a), this.negative = 1, this) : this._iaddn(a);
    }, n.prototype._iaddn = function(a) {
      this.words[0] += a;
      for (var s = 0; s < this.length && this.words[s] >= 67108864; s++)
        this.words[s] -= 67108864, s === this.length - 1 ? this.words[s + 1] = 1 : this.words[s + 1]++;
      return this.length = Math.max(this.length, s + 1), this;
    }, n.prototype.isubn = function(a) {
      if (e(typeof a == "number"), e(a < 67108864), a < 0)
        return this.iaddn(-a);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(a), this.negative = 1, this;
      if (this.words[0] -= a, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var s = 0; s < this.length && this.words[s] < 0; s++)
          this.words[s] += 67108864, this.words[s + 1] -= 1;
      return this._strip();
    }, n.prototype.addn = function(a) {
      return this.clone().iaddn(a);
    }, n.prototype.subn = function(a) {
      return this.clone().isubn(a);
    }, n.prototype.iabs = function() {
      return this.negative = 0, this;
    }, n.prototype.abs = function() {
      return this.clone().iabs();
    }, n.prototype._ishlnsubmul = function(a, s, h) {
      var p = a.length + h, l;
      this._expand(p);
      var i, d = 0;
      for (l = 0; l < a.length; l++) {
        i = (this.words[l + h] | 0) + d;
        var M = (a.words[l] | 0) * s;
        i -= M & 67108863, d = (i >> 26) - (M / 67108864 | 0), this.words[l + h] = i & 67108863;
      }
      for (; l < this.length - h; l++)
        i = (this.words[l + h] | 0) + d, d = i >> 26, this.words[l + h] = i & 67108863;
      if (d === 0)
        return this._strip();
      for (e(d === -1), d = 0, l = 0; l < this.length; l++)
        i = -(this.words[l] | 0) + d, d = i >> 26, this.words[l] = i & 67108863;
      return this.negative = 1, this._strip();
    }, n.prototype._wordDiv = function(a, s) {
      var h = this.length - a.length, p = this.clone(), l = a, i = l.words[l.length - 1] | 0, d = this._countBits(i);
      h = 26 - d, h !== 0 && (l = l.ushln(h), p.iushln(h), i = l.words[l.length - 1] | 0);
      var M = p.length - l.length, m;
      if (s !== "mod") {
        m = new n(null), m.length = M + 1, m.words = new Array(m.length);
        for (var v = 0; v < m.length; v++)
          m.words[v] = 0;
      }
      var B = p.clone()._ishlnsubmul(l, 1, M);
      B.negative === 0 && (p = B, m && (m.words[M] = 1));
      for (var O = M - 1; O >= 0; O--) {
        var $ = (p.words[l.length + O] | 0) * 67108864 + (p.words[l.length + O - 1] | 0);
        for ($ = Math.min($ / i | 0, 67108863), p._ishlnsubmul(l, $, O); p.negative !== 0; )
          $--, p.negative = 0, p._ishlnsubmul(l, 1, O), p.isZero() || (p.negative ^= 1);
        m && (m.words[O] = $);
      }
      return m && m._strip(), p._strip(), s !== "div" && h !== 0 && p.iushrn(h), { div: m || null, mod: p };
    }, n.prototype.divmod = function(a, s, h) {
      if (e(!a.isZero()), this.isZero())
        return { div: new n(0), mod: new n(0) };
      var p, l, i;
      return this.negative !== 0 && a.negative === 0 ? (i = this.neg().divmod(a, s), s !== "mod" && (p = i.div.neg()), s !== "div" && (l = i.mod.neg(), h && l.negative !== 0 && l.iadd(a)), { div: p, mod: l }) : this.negative === 0 && a.negative !== 0 ? (i = this.divmod(a.neg(), s), s !== "mod" && (p = i.div.neg()), { div: p, mod: i.mod }) : this.negative & a.negative ? (i = this.neg().divmod(a.neg(), s), s !== "div" && (l = i.mod.neg(), h && l.negative !== 0 && l.isub(a)), { div: i.div, mod: l }) : a.length > this.length || this.cmp(a) < 0 ? { div: new n(0), mod: this } : a.length === 1 ? s === "div" ? { div: this.divn(a.words[0]), mod: null } : s === "mod" ? { div: null, mod: new n(this.modrn(a.words[0])) } : { div: this.divn(a.words[0]), mod: new n(this.modrn(a.words[0])) } : this._wordDiv(a, s);
    }, n.prototype.div = function(a) {
      return this.divmod(a, "div", false).div;
    }, n.prototype.mod = function(a) {
      return this.divmod(a, "mod", false).mod;
    }, n.prototype.umod = function(a) {
      return this.divmod(a, "mod", true).mod;
    }, n.prototype.divRound = function(a) {
      var s = this.divmod(a);
      if (s.mod.isZero())
        return s.div;
      var h = s.div.negative !== 0 ? s.mod.isub(a) : s.mod, p = a.ushrn(1), l = a.andln(1), i = h.cmp(p);
      return i < 0 || l === 1 && i === 0 ? s.div : s.div.negative !== 0 ? s.div.isubn(1) : s.div.iaddn(1);
    }, n.prototype.modrn = function(a) {
      var s = a < 0;
      s && (a = -a), e(a <= 67108863);
      for (var h = (1 << 26) % a, p = 0, l = this.length - 1; l >= 0; l--)
        p = (h * p + (this.words[l] | 0)) % a;
      return s ? -p : p;
    }, n.prototype.modn = function(a) {
      return this.modrn(a);
    }, n.prototype.idivn = function(a) {
      var s = a < 0;
      s && (a = -a), e(a <= 67108863);
      for (var h = 0, p = this.length - 1; p >= 0; p--) {
        var l = (this.words[p] | 0) + h * 67108864;
        this.words[p] = l / a | 0, h = l % a;
      }
      return this._strip(), s ? this.ineg() : this;
    }, n.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, n.prototype.egcd = function(a) {
      e(a.negative === 0), e(!a.isZero());
      var s = this, h = a.clone();
      s.negative !== 0 ? s = s.umod(a) : s = s.clone();
      for (var p = new n(1), l = new n(0), i = new n(0), d = new n(1), M = 0; s.isEven() && h.isEven(); )
        s.iushrn(1), h.iushrn(1), ++M;
      for (var m = h.clone(), v = s.clone(); !s.isZero(); ) {
        for (var B = 0, O = 1; !(s.words[0] & O) && B < 26; ++B, O <<= 1)
          ;
        if (B > 0)
          for (s.iushrn(B); B-- > 0; )
            (p.isOdd() || l.isOdd()) && (p.iadd(m), l.isub(v)), p.iushrn(1), l.iushrn(1);
        for (var $ = 0, ut = 1; !(h.words[0] & ut) && $ < 26; ++$, ut <<= 1)
          ;
        if ($ > 0)
          for (h.iushrn($); $-- > 0; )
            (i.isOdd() || d.isOdd()) && (i.iadd(m), d.isub(v)), i.iushrn(1), d.iushrn(1);
        s.cmp(h) >= 0 ? (s.isub(h), p.isub(i), l.isub(d)) : (h.isub(s), i.isub(p), d.isub(l));
      }
      return { a: i, b: d, gcd: h.iushln(M) };
    }, n.prototype._invmp = function(a) {
      e(a.negative === 0), e(!a.isZero());
      var s = this, h = a.clone();
      s.negative !== 0 ? s = s.umod(a) : s = s.clone();
      for (var p = new n(1), l = new n(0), i = h.clone(); s.cmpn(1) > 0 && h.cmpn(1) > 0; ) {
        for (var d = 0, M = 1; !(s.words[0] & M) && d < 26; ++d, M <<= 1)
          ;
        if (d > 0)
          for (s.iushrn(d); d-- > 0; )
            p.isOdd() && p.iadd(i), p.iushrn(1);
        for (var m = 0, v = 1; !(h.words[0] & v) && m < 26; ++m, v <<= 1)
          ;
        if (m > 0)
          for (h.iushrn(m); m-- > 0; )
            l.isOdd() && l.iadd(i), l.iushrn(1);
        s.cmp(h) >= 0 ? (s.isub(h), p.isub(l)) : (h.isub(s), l.isub(p));
      }
      var B;
      return s.cmpn(1) === 0 ? B = p : B = l, B.cmpn(0) < 0 && B.iadd(a), B;
    }, n.prototype.gcd = function(a) {
      if (this.isZero())
        return a.abs();
      if (a.isZero())
        return this.abs();
      var s = this.clone(), h = a.clone();
      s.negative = 0, h.negative = 0;
      for (var p = 0; s.isEven() && h.isEven(); p++)
        s.iushrn(1), h.iushrn(1);
      do {
        for (; s.isEven(); )
          s.iushrn(1);
        for (; h.isEven(); )
          h.iushrn(1);
        var l = s.cmp(h);
        if (l < 0) {
          var i = s;
          s = h, h = i;
        } else if (l === 0 || h.cmpn(1) === 0)
          break;
        s.isub(h);
      } while (true);
      return h.iushln(p);
    }, n.prototype.invm = function(a) {
      return this.egcd(a).a.umod(a);
    }, n.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, n.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, n.prototype.andln = function(a) {
      return this.words[0] & a;
    }, n.prototype.bincn = function(a) {
      e(typeof a == "number");
      var s = a % 26, h = (a - s) / 26, p = 1 << s;
      if (this.length <= h)
        return this._expand(h + 1), this.words[h] |= p, this;
      for (var l = p, i = h; l !== 0 && i < this.length; i++) {
        var d = this.words[i] | 0;
        d += l, l = d >>> 26, d &= 67108863, this.words[i] = d;
      }
      return l !== 0 && (this.words[i] = l, this.length++), this;
    }, n.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, n.prototype.cmpn = function(a) {
      var s = a < 0;
      if (this.negative !== 0 && !s)
        return -1;
      if (this.negative === 0 && s)
        return 1;
      this._strip();
      var h;
      if (this.length > 1)
        h = 1;
      else {
        s && (a = -a), e(a <= 67108863, "Number is too big");
        var p = this.words[0] | 0;
        h = p === a ? 0 : p < a ? -1 : 1;
      }
      return this.negative !== 0 ? -h | 0 : h;
    }, n.prototype.cmp = function(a) {
      if (this.negative !== 0 && a.negative === 0)
        return -1;
      if (this.negative === 0 && a.negative !== 0)
        return 1;
      var s = this.ucmp(a);
      return this.negative !== 0 ? -s | 0 : s;
    }, n.prototype.ucmp = function(a) {
      if (this.length > a.length)
        return 1;
      if (this.length < a.length)
        return -1;
      for (var s = 0, h = this.length - 1; h >= 0; h--) {
        var p = this.words[h] | 0, l = a.words[h] | 0;
        if (p !== l) {
          p < l ? s = -1 : p > l && (s = 1);
          break;
        }
      }
      return s;
    }, n.prototype.gtn = function(a) {
      return this.cmpn(a) === 1;
    }, n.prototype.gt = function(a) {
      return this.cmp(a) === 1;
    }, n.prototype.gten = function(a) {
      return this.cmpn(a) >= 0;
    }, n.prototype.gte = function(a) {
      return this.cmp(a) >= 0;
    }, n.prototype.ltn = function(a) {
      return this.cmpn(a) === -1;
    }, n.prototype.lt = function(a) {
      return this.cmp(a) === -1;
    }, n.prototype.lten = function(a) {
      return this.cmpn(a) <= 0;
    }, n.prototype.lte = function(a) {
      return this.cmp(a) <= 0;
    }, n.prototype.eqn = function(a) {
      return this.cmpn(a) === 0;
    }, n.prototype.eq = function(a) {
      return this.cmp(a) === 0;
    }, n.red = function(a) {
      return new o(a);
    }, n.prototype.toRed = function(a) {
      return e(!this.red, "Already a number in reduction context"), e(this.negative === 0, "red works only with positives"), a.convertTo(this)._forceRed(a);
    }, n.prototype.fromRed = function() {
      return e(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, n.prototype._forceRed = function(a) {
      return this.red = a, this;
    }, n.prototype.forceRed = function(a) {
      return e(!this.red, "Already a number in reduction context"), this._forceRed(a);
    }, n.prototype.redAdd = function(a) {
      return e(this.red, "redAdd works only with red numbers"), this.red.add(this, a);
    }, n.prototype.redIAdd = function(a) {
      return e(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, a);
    }, n.prototype.redSub = function(a) {
      return e(this.red, "redSub works only with red numbers"), this.red.sub(this, a);
    }, n.prototype.redISub = function(a) {
      return e(this.red, "redISub works only with red numbers"), this.red.isub(this, a);
    }, n.prototype.redShl = function(a) {
      return e(this.red, "redShl works only with red numbers"), this.red.shl(this, a);
    }, n.prototype.redMul = function(a) {
      return e(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.mul(this, a);
    }, n.prototype.redIMul = function(a) {
      return e(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.imul(this, a);
    }, n.prototype.redSqr = function() {
      return e(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, n.prototype.redISqr = function() {
      return e(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, n.prototype.redSqrt = function() {
      return e(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, n.prototype.redInvm = function() {
      return e(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, n.prototype.redNeg = function() {
      return e(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, n.prototype.redPow = function(a) {
      return e(this.red && !a.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, a);
    };
    var j = { k256: null, p224: null, p192: null, p25519: null };
    function nt(c, a) {
      this.name = c, this.p = new n(a, 16), this.n = this.p.bitLength(), this.k = new n(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    nt.prototype._tmp = function() {
      var a = new n(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, nt.prototype.ireduce = function(a) {
      var s = a, h;
      do
        this.split(s, this.tmp), s = this.imulK(s), s = s.iadd(this.tmp), h = s.bitLength();
      while (h > this.n);
      var p = h < this.n ? -1 : s.ucmp(this.p);
      return p === 0 ? (s.words[0] = 0, s.length = 1) : p > 0 ? s.isub(this.p) : s._strip(), s;
    }, nt.prototype.split = function(a, s) {
      a.iushrn(this.n, 0, s);
    }, nt.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function ft() {
      nt.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    f(ft, nt), ft.prototype.split = function(a, s) {
      for (var h = 4194303, p = Math.min(a.length, 9), l = 0; l < p; l++)
        s.words[l] = a.words[l];
      if (s.length = p, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var i = a.words[9];
      for (s.words[s.length++] = i & h, l = 10; l < a.length; l++) {
        var d = a.words[l] | 0;
        a.words[l - 10] = (d & h) << 4 | i >>> 22, i = d;
      }
      i >>>= 22, a.words[l - 10] = i, i === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, ft.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var s = 0, h = 0; h < a.length; h++) {
        var p = a.words[h] | 0;
        s += p * 977, a.words[h] = s & 67108863, s = p * 64 + (s / 67108864 | 0);
      }
      return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
    };
    function Q() {
      nt.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    f(Q, nt);
    function $t() {
      nt.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    f($t, nt);
    function x() {
      nt.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    f(x, nt), x.prototype.imulK = function(a) {
      for (var s = 0, h = 0; h < a.length; h++) {
        var p = (a.words[h] | 0) * 19 + s, l = p & 67108863;
        p >>>= 26, a.words[h] = l, s = p;
      }
      return s !== 0 && (a.words[a.length++] = s), a;
    }, n._prime = function(a) {
      if (j[a])
        return j[a];
      var s;
      if (a === "k256")
        s = new ft();
      else if (a === "p224")
        s = new Q();
      else if (a === "p192")
        s = new $t();
      else if (a === "p25519")
        s = new x();
      else
        throw new Error("Unknown prime " + a);
      return j[a] = s, s;
    };
    function o(c) {
      if (typeof c == "string") {
        var a = n._prime(c);
        this.m = a.p, this.prime = a;
      } else
        e(c.gtn(1), "modulus must be greater than 1"), this.m = c, this.prime = null;
    }
    o.prototype._verify1 = function(a) {
      e(a.negative === 0, "red works only with positives"), e(a.red, "red works only with red numbers");
    }, o.prototype._verify2 = function(a, s) {
      e((a.negative | s.negative) === 0, "red works only with positives"), e(a.red && a.red === s.red, "red works only with red numbers");
    }, o.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (E(a, a.umod(this.m)._forceRed(this)), a);
    }, o.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, o.prototype.add = function(a, s) {
      this._verify2(a, s);
      var h = a.add(s);
      return h.cmp(this.m) >= 0 && h.isub(this.m), h._forceRed(this);
    }, o.prototype.iadd = function(a, s) {
      this._verify2(a, s);
      var h = a.iadd(s);
      return h.cmp(this.m) >= 0 && h.isub(this.m), h;
    }, o.prototype.sub = function(a, s) {
      this._verify2(a, s);
      var h = a.sub(s);
      return h.cmpn(0) < 0 && h.iadd(this.m), h._forceRed(this);
    }, o.prototype.isub = function(a, s) {
      this._verify2(a, s);
      var h = a.isub(s);
      return h.cmpn(0) < 0 && h.iadd(this.m), h;
    }, o.prototype.shl = function(a, s) {
      return this._verify1(a), this.imod(a.ushln(s));
    }, o.prototype.imul = function(a, s) {
      return this._verify2(a, s), this.imod(a.imul(s));
    }, o.prototype.mul = function(a, s) {
      return this._verify2(a, s), this.imod(a.mul(s));
    }, o.prototype.isqr = function(a) {
      return this.imul(a, a.clone());
    }, o.prototype.sqr = function(a) {
      return this.mul(a, a);
    }, o.prototype.sqrt = function(a) {
      if (a.isZero())
        return a.clone();
      var s = this.m.andln(3);
      if (e(s % 2 === 1), s === 3) {
        var h = this.m.add(new n(1)).iushrn(2);
        return this.pow(a, h);
      }
      for (var p = this.m.subn(1), l = 0; !p.isZero() && p.andln(1) === 0; )
        l++, p.iushrn(1);
      e(!p.isZero());
      var i = new n(1).toRed(this), d = i.redNeg(), M = this.m.subn(1).iushrn(1), m = this.m.bitLength();
      for (m = new n(2 * m * m).toRed(this); this.pow(m, M).cmp(d) !== 0; )
        m.redIAdd(d);
      for (var v = this.pow(m, p), B = this.pow(a, p.addn(1).iushrn(1)), O = this.pow(a, p), $ = l; O.cmp(i) !== 0; ) {
        for (var ut = O, V = 0; ut.cmp(i) !== 0; V++)
          ut = ut.redSqr();
        e(V < $);
        var ot = this.pow(v, new n(1).iushln($ - V - 1));
        B = B.redMul(ot), v = ot.redSqr(), O = O.redMul(v), $ = V;
      }
      return B;
    }, o.prototype.invm = function(a) {
      var s = a._invmp(this.m);
      return s.negative !== 0 ? (s.negative = 0, this.imod(s).redNeg()) : this.imod(s);
    }, o.prototype.pow = function(a, s) {
      if (s.isZero())
        return new n(1).toRed(this);
      if (s.cmpn(1) === 0)
        return a.clone();
      var h = 4, p = new Array(1 << h);
      p[0] = new n(1).toRed(this), p[1] = a;
      for (var l = 2; l < p.length; l++)
        p[l] = this.mul(p[l - 1], a);
      var i = p[0], d = 0, M = 0, m = s.bitLength() % 26;
      for (m === 0 && (m = 26), l = s.length - 1; l >= 0; l--) {
        for (var v = s.words[l], B = m - 1; B >= 0; B--) {
          var O = v >> B & 1;
          if (i !== p[0] && (i = this.sqr(i)), O === 0 && d === 0) {
            M = 0;
            continue;
          }
          d <<= 1, d |= O, M++, !(M !== h && (l !== 0 || B !== 0)) && (i = this.mul(i, p[d]), M = 0, d = 0);
        }
        m = 26;
      }
      return i;
    }, o.prototype.convertTo = function(a) {
      var s = a.umod(this.m);
      return s === a ? s.clone() : s;
    }, o.prototype.convertFrom = function(a) {
      var s = a.clone();
      return s.red = null, s;
    }, n.mont = function(a) {
      return new u(a);
    };
    function u(c) {
      o.call(this, c), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new n(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    f(u, o), u.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, u.prototype.convertFrom = function(a) {
      var s = this.imod(a.mul(this.rinv));
      return s.red = null, s;
    }, u.prototype.imul = function(a, s) {
      if (a.isZero() || s.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var h = a.imul(s), p = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), l = h.isub(p).iushrn(this.shift), i = l;
      return l.cmp(this.m) >= 0 ? i = l.isub(this.m) : l.cmpn(0) < 0 && (i = l.iadd(this.m)), i._forceRed(this);
    }, u.prototype.mul = function(a, s) {
      if (a.isZero() || s.isZero())
        return new n(0)._forceRed(this);
      var h = a.mul(s), p = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), l = h.isub(p).iushrn(this.shift), i = l;
      return l.cmp(this.m) >= 0 ? i = l.isub(this.m) : l.cmpn(0) < 0 && (i = l.iadd(this.m)), i._forceRed(this);
    }, u.prototype.invm = function(a) {
      var s = this.imod(a._invmp(this.m).mul(this.r2));
      return s._forceRed(this);
    };
  })(typeof qa == "undefined" || qa, wu);
});
var Au = ae((bu, za) => {
  (function(r3, t) {
    function e(a, s) {
      if (!a)
        throw new Error(s || "Assertion failed");
    }
    function f(a, s) {
      a.super_ = s;
      var h = function() {
      };
      h.prototype = s.prototype, a.prototype = new h(), a.prototype.constructor = a;
    }
    function n(a, s, h) {
      if (n.isBN(a))
        return a;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, a !== null && ((s === "le" || s === "be") && (h = s, s = 10), this._init(a || 0, s || 10, h || "be"));
    }
    typeof r3 == "object" ? r3.exports = n : t.BN = n, n.BN = n, n.wordSize = 26;
    var g;
    try {
      typeof window != "undefined" && typeof window.Buffer != "undefined" ? g = window.Buffer : g = La().Buffer;
    } catch (a) {
    }
    n.isBN = function(s) {
      return s instanceof n ? true : s !== null && typeof s == "object" && s.constructor.wordSize === n.wordSize && Array.isArray(s.words);
    }, n.max = function(s, h) {
      return s.cmp(h) > 0 ? s : h;
    }, n.min = function(s, h) {
      return s.cmp(h) < 0 ? s : h;
    }, n.prototype._init = function(s, h, p) {
      if (typeof s == "number")
        return this._initNumber(s, h, p);
      if (typeof s == "object")
        return this._initArray(s, h, p);
      h === "hex" && (h = 16), e(h === (h | 0) && h >= 2 && h <= 36), s = s.toString().replace(/\s+/g, "");
      var l = 0;
      s[0] === "-" && (l++, this.negative = 1), l < s.length && (h === 16 ? this._parseHex(s, l, p) : (this._parseBase(s, h, l), p === "le" && this._initArray(this.toArray(), h, p)));
    }, n.prototype._initNumber = function(s, h, p) {
      s < 0 && (this.negative = 1, s = -s), s < 67108864 ? (this.words = [s & 67108863], this.length = 1) : s < 4503599627370496 ? (this.words = [s & 67108863, s / 67108864 & 67108863], this.length = 2) : (e(s < 9007199254740992), this.words = [s & 67108863, s / 67108864 & 67108863, 1], this.length = 3), p === "le" && this._initArray(this.toArray(), h, p);
    }, n.prototype._initArray = function(s, h, p) {
      if (e(typeof s.length == "number"), s.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(s.length / 3), this.words = new Array(this.length);
      for (var l = 0; l < this.length; l++)
        this.words[l] = 0;
      var i, d, M = 0;
      if (p === "be")
        for (l = s.length - 1, i = 0; l >= 0; l -= 3)
          d = s[l] | s[l - 1] << 8 | s[l - 2] << 16, this.words[i] |= d << M & 67108863, this.words[i + 1] = d >>> 26 - M & 67108863, M += 24, M >= 26 && (M -= 26, i++);
      else if (p === "le")
        for (l = 0, i = 0; l < s.length; l += 3)
          d = s[l] | s[l + 1] << 8 | s[l + 2] << 16, this.words[i] |= d << M & 67108863, this.words[i + 1] = d >>> 26 - M & 67108863, M += 24, M >= 26 && (M -= 26, i++);
      return this._strip();
    };
    function y(a, s) {
      var h = a.charCodeAt(s);
      if (h >= 48 && h <= 57)
        return h - 48;
      if (h >= 65 && h <= 70)
        return h - 55;
      if (h >= 97 && h <= 102)
        return h - 87;
      e(false, "Invalid character in " + a);
    }
    function _(a, s, h) {
      var p = y(a, h);
      return h - 1 >= s && (p |= y(a, h - 1) << 4), p;
    }
    n.prototype._parseHex = function(s, h, p) {
      this.length = Math.ceil((s.length - h) / 6), this.words = new Array(this.length);
      for (var l = 0; l < this.length; l++)
        this.words[l] = 0;
      var i = 0, d = 0, M;
      if (p === "be")
        for (l = s.length - 1; l >= h; l -= 2)
          M = _(s, h, l) << i, this.words[d] |= M & 67108863, i >= 18 ? (i -= 18, d += 1, this.words[d] |= M >>> 26) : i += 8;
      else {
        var m = s.length - h;
        for (l = m % 2 === 0 ? h + 1 : h; l < s.length; l += 2)
          M = _(s, h, l) << i, this.words[d] |= M & 67108863, i >= 18 ? (i -= 18, d += 1, this.words[d] |= M >>> 26) : i += 8;
      }
      this._strip();
    };
    function E(a, s, h, p) {
      for (var l = 0, i = 0, d = Math.min(a.length, h), M = s; M < d; M++) {
        var m = a.charCodeAt(M) - 48;
        l *= p, m >= 49 ? i = m - 49 + 10 : m >= 17 ? i = m - 17 + 10 : i = m, e(m >= 0 && i < p, "Invalid character"), l += i;
      }
      return l;
    }
    n.prototype._parseBase = function(s, h, p) {
      this.words = [0], this.length = 1;
      for (var l = 0, i = 1; i <= 67108863; i *= h)
        l++;
      l--, i = i / h | 0;
      for (var d = s.length - p, M = d % l, m = Math.min(d, d - M) + p, v = 0, B = p; B < m; B += l)
        v = E(s, B, B + l, h), this.imuln(i), this.words[0] + v < 67108864 ? this.words[0] += v : this._iaddn(v);
      if (M !== 0) {
        var O = 1;
        for (v = E(s, B, s.length, h), B = 0; B < M; B++)
          O *= h;
        this.imuln(O), this.words[0] + v < 67108864 ? this.words[0] += v : this._iaddn(v);
      }
      this._strip();
    }, n.prototype.copy = function(s) {
      s.words = new Array(this.length);
      for (var h = 0; h < this.length; h++)
        s.words[h] = this.words[h];
      s.length = this.length, s.negative = this.negative, s.red = this.red;
    };
    function S(a, s) {
      a.words = s.words, a.length = s.length, a.negative = s.negative, a.red = s.red;
    }
    if (n.prototype._move = function(s) {
      S(s, this);
    }, n.prototype.clone = function() {
      var s = new n(null);
      return this.copy(s), s;
    }, n.prototype._expand = function(s) {
      for (; this.length < s; )
        this.words[this.length++] = 0;
      return this;
    }, n.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, n.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol != "undefined" && typeof Symbol.for == "function")
      try {
        n.prototype[Symbol.for("nodejs.util.inspect.custom")] = I;
      } catch (a) {
        n.prototype.inspect = I;
      }
    else
      n.prototype.inspect = I;
    function I() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var F = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], P = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], Y = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    n.prototype.toString = function(s, h) {
      s = s || 10, h = h | 0 || 1;
      var p;
      if (s === 16 || s === "hex") {
        p = "";
        for (var l = 0, i = 0, d = 0; d < this.length; d++) {
          var M = this.words[d], m = ((M << l | i) & 16777215).toString(16);
          i = M >>> 24 - l & 16777215, l += 2, l >= 26 && (l -= 26, d--), i !== 0 || d !== this.length - 1 ? p = F[6 - m.length] + m + p : p = m + p;
        }
        for (i !== 0 && (p = i.toString(16) + p); p.length % h !== 0; )
          p = "0" + p;
        return this.negative !== 0 && (p = "-" + p), p;
      }
      if (s === (s | 0) && s >= 2 && s <= 36) {
        var v = P[s], B = Y[s];
        p = "";
        var O = this.clone();
        for (O.negative = 0; !O.isZero(); ) {
          var $ = O.modrn(B).toString(s);
          O = O.idivn(B), O.isZero() ? p = $ + p : p = F[v - $.length] + $ + p;
        }
        for (this.isZero() && (p = "0" + p); p.length % h !== 0; )
          p = "0" + p;
        return this.negative !== 0 && (p = "-" + p), p;
      }
      e(false, "Base should be between 2 and 36");
    }, n.prototype.toNumber = function() {
      var s = this.words[0];
      return this.length === 2 ? s += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? s += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && e(false, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -s : s;
    }, n.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, g && (n.prototype.toBuffer = function(s, h) {
      return this.toArrayLike(g, s, h);
    }), n.prototype.toArray = function(s, h) {
      return this.toArrayLike(Array, s, h);
    };
    var K = function(s, h) {
      return s.allocUnsafe ? s.allocUnsafe(h) : new s(h);
    };
    n.prototype.toArrayLike = function(s, h, p) {
      this._strip();
      var l = this.byteLength(), i = p || Math.max(1, l);
      e(l <= i, "byte array longer than desired length"), e(i > 0, "Requested array length <= 0");
      var d = K(s, i), M = h === "le" ? "LE" : "BE";
      return this["_toArrayLike" + M](d, l), d;
    }, n.prototype._toArrayLikeLE = function(s, h) {
      for (var p = 0, l = 0, i = 0, d = 0; i < this.length; i++) {
        var M = this.words[i] << d | l;
        s[p++] = M & 255, p < s.length && (s[p++] = M >> 8 & 255), p < s.length && (s[p++] = M >> 16 & 255), d === 6 ? (p < s.length && (s[p++] = M >> 24 & 255), l = 0, d = 0) : (l = M >>> 24, d += 2);
      }
      if (p < s.length)
        for (s[p++] = l; p < s.length; )
          s[p++] = 0;
    }, n.prototype._toArrayLikeBE = function(s, h) {
      for (var p = s.length - 1, l = 0, i = 0, d = 0; i < this.length; i++) {
        var M = this.words[i] << d | l;
        s[p--] = M & 255, p >= 0 && (s[p--] = M >> 8 & 255), p >= 0 && (s[p--] = M >> 16 & 255), d === 6 ? (p >= 0 && (s[p--] = M >> 24 & 255), l = 0, d = 0) : (l = M >>> 24, d += 2);
      }
      if (p >= 0)
        for (s[p--] = l; p >= 0; )
          s[p--] = 0;
    }, Math.clz32 ? n.prototype._countBits = function(s) {
      return 32 - Math.clz32(s);
    } : n.prototype._countBits = function(s) {
      var h = s, p = 0;
      return h >= 4096 && (p += 13, h >>>= 13), h >= 64 && (p += 7, h >>>= 7), h >= 8 && (p += 4, h >>>= 4), h >= 2 && (p += 2, h >>>= 2), p + h;
    }, n.prototype._zeroBits = function(s) {
      if (s === 0)
        return 26;
      var h = s, p = 0;
      return h & 8191 || (p += 13, h >>>= 13), h & 127 || (p += 7, h >>>= 7), h & 15 || (p += 4, h >>>= 4), h & 3 || (p += 2, h >>>= 2), h & 1 || p++, p;
    }, n.prototype.bitLength = function() {
      var s = this.words[this.length - 1], h = this._countBits(s);
      return (this.length - 1) * 26 + h;
    };
    function Z(a) {
      for (var s = new Array(a.bitLength()), h = 0; h < s.length; h++) {
        var p = h / 26 | 0, l = h % 26;
        s[h] = a.words[p] >>> l & 1;
      }
      return s;
    }
    n.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var s = 0, h = 0; h < this.length; h++) {
        var p = this._zeroBits(this.words[h]);
        if (s += p, p !== 26)
          break;
      }
      return s;
    }, n.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, n.prototype.toTwos = function(s) {
      return this.negative !== 0 ? this.abs().inotn(s).iaddn(1) : this.clone();
    }, n.prototype.fromTwos = function(s) {
      return this.testn(s - 1) ? this.notn(s).iaddn(1).ineg() : this.clone();
    }, n.prototype.isNeg = function() {
      return this.negative !== 0;
    }, n.prototype.neg = function() {
      return this.clone().ineg();
    }, n.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, n.prototype.iuor = function(s) {
      for (; this.length < s.length; )
        this.words[this.length++] = 0;
      for (var h = 0; h < s.length; h++)
        this.words[h] = this.words[h] | s.words[h];
      return this._strip();
    }, n.prototype.ior = function(s) {
      return e((this.negative | s.negative) === 0), this.iuor(s);
    }, n.prototype.or = function(s) {
      return this.length > s.length ? this.clone().ior(s) : s.clone().ior(this);
    }, n.prototype.uor = function(s) {
      return this.length > s.length ? this.clone().iuor(s) : s.clone().iuor(this);
    }, n.prototype.iuand = function(s) {
      var h;
      this.length > s.length ? h = s : h = this;
      for (var p = 0; p < h.length; p++)
        this.words[p] = this.words[p] & s.words[p];
      return this.length = h.length, this._strip();
    }, n.prototype.iand = function(s) {
      return e((this.negative | s.negative) === 0), this.iuand(s);
    }, n.prototype.and = function(s) {
      return this.length > s.length ? this.clone().iand(s) : s.clone().iand(this);
    }, n.prototype.uand = function(s) {
      return this.length > s.length ? this.clone().iuand(s) : s.clone().iuand(this);
    }, n.prototype.iuxor = function(s) {
      var h, p;
      this.length > s.length ? (h = this, p = s) : (h = s, p = this);
      for (var l = 0; l < p.length; l++)
        this.words[l] = h.words[l] ^ p.words[l];
      if (this !== h)
        for (; l < h.length; l++)
          this.words[l] = h.words[l];
      return this.length = h.length, this._strip();
    }, n.prototype.ixor = function(s) {
      return e((this.negative | s.negative) === 0), this.iuxor(s);
    }, n.prototype.xor = function(s) {
      return this.length > s.length ? this.clone().ixor(s) : s.clone().ixor(this);
    }, n.prototype.uxor = function(s) {
      return this.length > s.length ? this.clone().iuxor(s) : s.clone().iuxor(this);
    }, n.prototype.inotn = function(s) {
      e(typeof s == "number" && s >= 0);
      var h = Math.ceil(s / 26) | 0, p = s % 26;
      this._expand(h), p > 0 && h--;
      for (var l = 0; l < h; l++)
        this.words[l] = ~this.words[l] & 67108863;
      return p > 0 && (this.words[l] = ~this.words[l] & 67108863 >> 26 - p), this._strip();
    }, n.prototype.notn = function(s) {
      return this.clone().inotn(s);
    }, n.prototype.setn = function(s, h) {
      e(typeof s == "number" && s >= 0);
      var p = s / 26 | 0, l = s % 26;
      return this._expand(p + 1), h ? this.words[p] = this.words[p] | 1 << l : this.words[p] = this.words[p] & ~(1 << l), this._strip();
    }, n.prototype.iadd = function(s) {
      var h;
      if (this.negative !== 0 && s.negative === 0)
        return this.negative = 0, h = this.isub(s), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && s.negative !== 0)
        return s.negative = 0, h = this.isub(s), s.negative = 1, h._normSign();
      var p, l;
      this.length > s.length ? (p = this, l = s) : (p = s, l = this);
      for (var i = 0, d = 0; d < l.length; d++)
        h = (p.words[d] | 0) + (l.words[d] | 0) + i, this.words[d] = h & 67108863, i = h >>> 26;
      for (; i !== 0 && d < p.length; d++)
        h = (p.words[d] | 0) + i, this.words[d] = h & 67108863, i = h >>> 26;
      if (this.length = p.length, i !== 0)
        this.words[this.length] = i, this.length++;
      else if (p !== this)
        for (; d < p.length; d++)
          this.words[d] = p.words[d];
      return this;
    }, n.prototype.add = function(s) {
      var h;
      return s.negative !== 0 && this.negative === 0 ? (s.negative = 0, h = this.sub(s), s.negative ^= 1, h) : s.negative === 0 && this.negative !== 0 ? (this.negative = 0, h = s.sub(this), this.negative = 1, h) : this.length > s.length ? this.clone().iadd(s) : s.clone().iadd(this);
    }, n.prototype.isub = function(s) {
      if (s.negative !== 0) {
        s.negative = 0;
        var h = this.iadd(s);
        return s.negative = 1, h._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(s), this.negative = 1, this._normSign();
      var p = this.cmp(s);
      if (p === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var l, i;
      p > 0 ? (l = this, i = s) : (l = s, i = this);
      for (var d = 0, M = 0; M < i.length; M++)
        h = (l.words[M] | 0) - (i.words[M] | 0) + d, d = h >> 26, this.words[M] = h & 67108863;
      for (; d !== 0 && M < l.length; M++)
        h = (l.words[M] | 0) + d, d = h >> 26, this.words[M] = h & 67108863;
      if (d === 0 && M < l.length && l !== this)
        for (; M < l.length; M++)
          this.words[M] = l.words[M];
      return this.length = Math.max(this.length, M), l !== this && (this.negative = 1), this._strip();
    }, n.prototype.sub = function(s) {
      return this.clone().isub(s);
    };
    function k(a, s, h) {
      h.negative = s.negative ^ a.negative;
      var p = a.length + s.length | 0;
      h.length = p, p = p - 1 | 0;
      var l = a.words[0] | 0, i = s.words[0] | 0, d = l * i, M = d & 67108863, m = d / 67108864 | 0;
      h.words[0] = M;
      for (var v = 1; v < p; v++) {
        for (var B = m >>> 26, O = m & 67108863, $ = Math.min(v, s.length - 1), ut = Math.max(0, v - a.length + 1); ut <= $; ut++) {
          var V = v - ut | 0;
          l = a.words[V] | 0, i = s.words[ut] | 0, d = l * i + O, B += d / 67108864 | 0, O = d & 67108863;
        }
        h.words[v] = O | 0, m = B | 0;
      }
      return m !== 0 ? h.words[v] = m | 0 : h.length--, h._strip();
    }
    var Tt = function(s, h, p) {
      var l = s.words, i = h.words, d = p.words, M = 0, m, v, B, O = l[0] | 0, $ = O & 8191, ut = O >>> 13, V = l[1] | 0, ot = V & 8191, le = V >>> 13, St = l[2] | 0, pt = St & 8191, de = St >>> 13, zt = l[3] | 0, Et = zt & 8191, ne = zt >>> 13, qt = l[4] | 0, _t = qt & 8191, fe = qt >>> 13, Pt = l[5] | 0, bt = Pt & 8191, be = Pt >>> 13, kt = l[6] | 0, Mt = kt & 8191, me = kt >>> 13, Lt = l[7] | 0, wt = Lt & 8191, _e = Lt >>> 13, It = l[8] | 0, Bt = It & 8191, Ee = It >>> 13, Wt = l[9] | 0, yt = Wt & 8191, xe = Wt >>> 13, Ut = i[0] | 0, gt = Ut & 8191, Ae = Ut >>> 13, Dt = i[1] | 0, xt = Dt & 8191, D = Dt >>> 13, N = i[2] | 0, U = N & 8191, st = N >>> 13, H = i[3] | 0, J = H & 8191, Ft = H >>> 13, ht = i[4] | 0, tt = ht & 8191, Zt = ht >>> 13, Ct = i[5] | 0, at = Ct & 8191, ce = Ct >>> 13, b = i[6] | 0, C = b & 8191, T = b >>> 13, w = i[7] | 0, A = w & 8191, W = w >>> 13, R = i[8] | 0, L = R & 8191, lt = R >>> 13, Nt = i[9] | 0, dt = Nt & 8191, Jt = Nt >>> 13;
      p.negative = s.negative ^ h.negative, p.length = 19, m = Math.imul($, gt), v = Math.imul($, Ae), v = v + Math.imul(ut, gt) | 0, B = Math.imul(ut, Ae);
      var Kt = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (Kt >>> 26) | 0, Kt &= 67108863, m = Math.imul(ot, gt), v = Math.imul(ot, Ae), v = v + Math.imul(le, gt) | 0, B = Math.imul(le, Ae), m = m + Math.imul($, xt) | 0, v = v + Math.imul($, D) | 0, v = v + Math.imul(ut, xt) | 0, B = B + Math.imul(ut, D) | 0;
      var Xt = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (Xt >>> 26) | 0, Xt &= 67108863, m = Math.imul(pt, gt), v = Math.imul(pt, Ae), v = v + Math.imul(de, gt) | 0, B = Math.imul(de, Ae), m = m + Math.imul(ot, xt) | 0, v = v + Math.imul(ot, D) | 0, v = v + Math.imul(le, xt) | 0, B = B + Math.imul(le, D) | 0, m = m + Math.imul($, U) | 0, v = v + Math.imul($, st) | 0, v = v + Math.imul(ut, U) | 0, B = B + Math.imul(ut, st) | 0;
      var Qt = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (Qt >>> 26) | 0, Qt &= 67108863, m = Math.imul(Et, gt), v = Math.imul(Et, Ae), v = v + Math.imul(ne, gt) | 0, B = Math.imul(ne, Ae), m = m + Math.imul(pt, xt) | 0, v = v + Math.imul(pt, D) | 0, v = v + Math.imul(de, xt) | 0, B = B + Math.imul(de, D) | 0, m = m + Math.imul(ot, U) | 0, v = v + Math.imul(ot, st) | 0, v = v + Math.imul(le, U) | 0, B = B + Math.imul(le, st) | 0, m = m + Math.imul($, J) | 0, v = v + Math.imul($, Ft) | 0, v = v + Math.imul(ut, J) | 0, B = B + Math.imul(ut, Ft) | 0;
      var se = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (se >>> 26) | 0, se &= 67108863, m = Math.imul(_t, gt), v = Math.imul(_t, Ae), v = v + Math.imul(fe, gt) | 0, B = Math.imul(fe, Ae), m = m + Math.imul(Et, xt) | 0, v = v + Math.imul(Et, D) | 0, v = v + Math.imul(ne, xt) | 0, B = B + Math.imul(ne, D) | 0, m = m + Math.imul(pt, U) | 0, v = v + Math.imul(pt, st) | 0, v = v + Math.imul(de, U) | 0, B = B + Math.imul(de, st) | 0, m = m + Math.imul(ot, J) | 0, v = v + Math.imul(ot, Ft) | 0, v = v + Math.imul(le, J) | 0, B = B + Math.imul(le, Ft) | 0, m = m + Math.imul($, tt) | 0, v = v + Math.imul($, Zt) | 0, v = v + Math.imul(ut, tt) | 0, B = B + Math.imul(ut, Zt) | 0;
      var oe = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (oe >>> 26) | 0, oe &= 67108863, m = Math.imul(bt, gt), v = Math.imul(bt, Ae), v = v + Math.imul(be, gt) | 0, B = Math.imul(be, Ae), m = m + Math.imul(_t, xt) | 0, v = v + Math.imul(_t, D) | 0, v = v + Math.imul(fe, xt) | 0, B = B + Math.imul(fe, D) | 0, m = m + Math.imul(Et, U) | 0, v = v + Math.imul(Et, st) | 0, v = v + Math.imul(ne, U) | 0, B = B + Math.imul(ne, st) | 0, m = m + Math.imul(pt, J) | 0, v = v + Math.imul(pt, Ft) | 0, v = v + Math.imul(de, J) | 0, B = B + Math.imul(de, Ft) | 0, m = m + Math.imul(ot, tt) | 0, v = v + Math.imul(ot, Zt) | 0, v = v + Math.imul(le, tt) | 0, B = B + Math.imul(le, Zt) | 0, m = m + Math.imul($, at) | 0, v = v + Math.imul($, ce) | 0, v = v + Math.imul(ut, at) | 0, B = B + Math.imul(ut, ce) | 0;
      var te = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (te >>> 26) | 0, te &= 67108863, m = Math.imul(Mt, gt), v = Math.imul(Mt, Ae), v = v + Math.imul(me, gt) | 0, B = Math.imul(me, Ae), m = m + Math.imul(bt, xt) | 0, v = v + Math.imul(bt, D) | 0, v = v + Math.imul(be, xt) | 0, B = B + Math.imul(be, D) | 0, m = m + Math.imul(_t, U) | 0, v = v + Math.imul(_t, st) | 0, v = v + Math.imul(fe, U) | 0, B = B + Math.imul(fe, st) | 0, m = m + Math.imul(Et, J) | 0, v = v + Math.imul(Et, Ft) | 0, v = v + Math.imul(ne, J) | 0, B = B + Math.imul(ne, Ft) | 0, m = m + Math.imul(pt, tt) | 0, v = v + Math.imul(pt, Zt) | 0, v = v + Math.imul(de, tt) | 0, B = B + Math.imul(de, Zt) | 0, m = m + Math.imul(ot, at) | 0, v = v + Math.imul(ot, ce) | 0, v = v + Math.imul(le, at) | 0, B = B + Math.imul(le, ce) | 0, m = m + Math.imul($, C) | 0, v = v + Math.imul($, T) | 0, v = v + Math.imul(ut, C) | 0, B = B + Math.imul(ut, T) | 0;
      var re = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (re >>> 26) | 0, re &= 67108863, m = Math.imul(wt, gt), v = Math.imul(wt, Ae), v = v + Math.imul(_e, gt) | 0, B = Math.imul(_e, Ae), m = m + Math.imul(Mt, xt) | 0, v = v + Math.imul(Mt, D) | 0, v = v + Math.imul(me, xt) | 0, B = B + Math.imul(me, D) | 0, m = m + Math.imul(bt, U) | 0, v = v + Math.imul(bt, st) | 0, v = v + Math.imul(be, U) | 0, B = B + Math.imul(be, st) | 0, m = m + Math.imul(_t, J) | 0, v = v + Math.imul(_t, Ft) | 0, v = v + Math.imul(fe, J) | 0, B = B + Math.imul(fe, Ft) | 0, m = m + Math.imul(Et, tt) | 0, v = v + Math.imul(Et, Zt) | 0, v = v + Math.imul(ne, tt) | 0, B = B + Math.imul(ne, Zt) | 0, m = m + Math.imul(pt, at) | 0, v = v + Math.imul(pt, ce) | 0, v = v + Math.imul(de, at) | 0, B = B + Math.imul(de, ce) | 0, m = m + Math.imul(ot, C) | 0, v = v + Math.imul(ot, T) | 0, v = v + Math.imul(le, C) | 0, B = B + Math.imul(le, T) | 0, m = m + Math.imul($, A) | 0, v = v + Math.imul($, W) | 0, v = v + Math.imul(ut, A) | 0, B = B + Math.imul(ut, W) | 0;
      var ee = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (ee >>> 26) | 0, ee &= 67108863, m = Math.imul(Bt, gt), v = Math.imul(Bt, Ae), v = v + Math.imul(Ee, gt) | 0, B = Math.imul(Ee, Ae), m = m + Math.imul(wt, xt) | 0, v = v + Math.imul(wt, D) | 0, v = v + Math.imul(_e, xt) | 0, B = B + Math.imul(_e, D) | 0, m = m + Math.imul(Mt, U) | 0, v = v + Math.imul(Mt, st) | 0, v = v + Math.imul(me, U) | 0, B = B + Math.imul(me, st) | 0, m = m + Math.imul(bt, J) | 0, v = v + Math.imul(bt, Ft) | 0, v = v + Math.imul(be, J) | 0, B = B + Math.imul(be, Ft) | 0, m = m + Math.imul(_t, tt) | 0, v = v + Math.imul(_t, Zt) | 0, v = v + Math.imul(fe, tt) | 0, B = B + Math.imul(fe, Zt) | 0, m = m + Math.imul(Et, at) | 0, v = v + Math.imul(Et, ce) | 0, v = v + Math.imul(ne, at) | 0, B = B + Math.imul(ne, ce) | 0, m = m + Math.imul(pt, C) | 0, v = v + Math.imul(pt, T) | 0, v = v + Math.imul(de, C) | 0, B = B + Math.imul(de, T) | 0, m = m + Math.imul(ot, A) | 0, v = v + Math.imul(ot, W) | 0, v = v + Math.imul(le, A) | 0, B = B + Math.imul(le, W) | 0, m = m + Math.imul($, L) | 0, v = v + Math.imul($, lt) | 0, v = v + Math.imul(ut, L) | 0, B = B + Math.imul(ut, lt) | 0;
      var Yt = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (Yt >>> 26) | 0, Yt &= 67108863, m = Math.imul(yt, gt), v = Math.imul(yt, Ae), v = v + Math.imul(xe, gt) | 0, B = Math.imul(xe, Ae), m = m + Math.imul(Bt, xt) | 0, v = v + Math.imul(Bt, D) | 0, v = v + Math.imul(Ee, xt) | 0, B = B + Math.imul(Ee, D) | 0, m = m + Math.imul(wt, U) | 0, v = v + Math.imul(wt, st) | 0, v = v + Math.imul(_e, U) | 0, B = B + Math.imul(_e, st) | 0, m = m + Math.imul(Mt, J) | 0, v = v + Math.imul(Mt, Ft) | 0, v = v + Math.imul(me, J) | 0, B = B + Math.imul(me, Ft) | 0, m = m + Math.imul(bt, tt) | 0, v = v + Math.imul(bt, Zt) | 0, v = v + Math.imul(be, tt) | 0, B = B + Math.imul(be, Zt) | 0, m = m + Math.imul(_t, at) | 0, v = v + Math.imul(_t, ce) | 0, v = v + Math.imul(fe, at) | 0, B = B + Math.imul(fe, ce) | 0, m = m + Math.imul(Et, C) | 0, v = v + Math.imul(Et, T) | 0, v = v + Math.imul(ne, C) | 0, B = B + Math.imul(ne, T) | 0, m = m + Math.imul(pt, A) | 0, v = v + Math.imul(pt, W) | 0, v = v + Math.imul(de, A) | 0, B = B + Math.imul(de, W) | 0, m = m + Math.imul(ot, L) | 0, v = v + Math.imul(ot, lt) | 0, v = v + Math.imul(le, L) | 0, B = B + Math.imul(le, lt) | 0, m = m + Math.imul($, dt) | 0, v = v + Math.imul($, Jt) | 0, v = v + Math.imul(ut, dt) | 0, B = B + Math.imul(ut, Jt) | 0;
      var Gt = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (Gt >>> 26) | 0, Gt &= 67108863, m = Math.imul(yt, xt), v = Math.imul(yt, D), v = v + Math.imul(xe, xt) | 0, B = Math.imul(xe, D), m = m + Math.imul(Bt, U) | 0, v = v + Math.imul(Bt, st) | 0, v = v + Math.imul(Ee, U) | 0, B = B + Math.imul(Ee, st) | 0, m = m + Math.imul(wt, J) | 0, v = v + Math.imul(wt, Ft) | 0, v = v + Math.imul(_e, J) | 0, B = B + Math.imul(_e, Ft) | 0, m = m + Math.imul(Mt, tt) | 0, v = v + Math.imul(Mt, Zt) | 0, v = v + Math.imul(me, tt) | 0, B = B + Math.imul(me, Zt) | 0, m = m + Math.imul(bt, at) | 0, v = v + Math.imul(bt, ce) | 0, v = v + Math.imul(be, at) | 0, B = B + Math.imul(be, ce) | 0, m = m + Math.imul(_t, C) | 0, v = v + Math.imul(_t, T) | 0, v = v + Math.imul(fe, C) | 0, B = B + Math.imul(fe, T) | 0, m = m + Math.imul(Et, A) | 0, v = v + Math.imul(Et, W) | 0, v = v + Math.imul(ne, A) | 0, B = B + Math.imul(ne, W) | 0, m = m + Math.imul(pt, L) | 0, v = v + Math.imul(pt, lt) | 0, v = v + Math.imul(de, L) | 0, B = B + Math.imul(de, lt) | 0, m = m + Math.imul(ot, dt) | 0, v = v + Math.imul(ot, Jt) | 0, v = v + Math.imul(le, dt) | 0, B = B + Math.imul(le, Jt) | 0;
      var jt = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863, m = Math.imul(yt, U), v = Math.imul(yt, st), v = v + Math.imul(xe, U) | 0, B = Math.imul(xe, st), m = m + Math.imul(Bt, J) | 0, v = v + Math.imul(Bt, Ft) | 0, v = v + Math.imul(Ee, J) | 0, B = B + Math.imul(Ee, Ft) | 0, m = m + Math.imul(wt, tt) | 0, v = v + Math.imul(wt, Zt) | 0, v = v + Math.imul(_e, tt) | 0, B = B + Math.imul(_e, Zt) | 0, m = m + Math.imul(Mt, at) | 0, v = v + Math.imul(Mt, ce) | 0, v = v + Math.imul(me, at) | 0, B = B + Math.imul(me, ce) | 0, m = m + Math.imul(bt, C) | 0, v = v + Math.imul(bt, T) | 0, v = v + Math.imul(be, C) | 0, B = B + Math.imul(be, T) | 0, m = m + Math.imul(_t, A) | 0, v = v + Math.imul(_t, W) | 0, v = v + Math.imul(fe, A) | 0, B = B + Math.imul(fe, W) | 0, m = m + Math.imul(Et, L) | 0, v = v + Math.imul(Et, lt) | 0, v = v + Math.imul(ne, L) | 0, B = B + Math.imul(ne, lt) | 0, m = m + Math.imul(pt, dt) | 0, v = v + Math.imul(pt, Jt) | 0, v = v + Math.imul(de, dt) | 0, B = B + Math.imul(de, Jt) | 0;
      var Ht = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (Ht >>> 26) | 0, Ht &= 67108863, m = Math.imul(yt, J), v = Math.imul(yt, Ft), v = v + Math.imul(xe, J) | 0, B = Math.imul(xe, Ft), m = m + Math.imul(Bt, tt) | 0, v = v + Math.imul(Bt, Zt) | 0, v = v + Math.imul(Ee, tt) | 0, B = B + Math.imul(Ee, Zt) | 0, m = m + Math.imul(wt, at) | 0, v = v + Math.imul(wt, ce) | 0, v = v + Math.imul(_e, at) | 0, B = B + Math.imul(_e, ce) | 0, m = m + Math.imul(Mt, C) | 0, v = v + Math.imul(Mt, T) | 0, v = v + Math.imul(me, C) | 0, B = B + Math.imul(me, T) | 0, m = m + Math.imul(bt, A) | 0, v = v + Math.imul(bt, W) | 0, v = v + Math.imul(be, A) | 0, B = B + Math.imul(be, W) | 0, m = m + Math.imul(_t, L) | 0, v = v + Math.imul(_t, lt) | 0, v = v + Math.imul(fe, L) | 0, B = B + Math.imul(fe, lt) | 0, m = m + Math.imul(Et, dt) | 0, v = v + Math.imul(Et, Jt) | 0, v = v + Math.imul(ne, dt) | 0, B = B + Math.imul(ne, Jt) | 0;
      var Vt = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (Vt >>> 26) | 0, Vt &= 67108863, m = Math.imul(yt, tt), v = Math.imul(yt, Zt), v = v + Math.imul(xe, tt) | 0, B = Math.imul(xe, Zt), m = m + Math.imul(Bt, at) | 0, v = v + Math.imul(Bt, ce) | 0, v = v + Math.imul(Ee, at) | 0, B = B + Math.imul(Ee, ce) | 0, m = m + Math.imul(wt, C) | 0, v = v + Math.imul(wt, T) | 0, v = v + Math.imul(_e, C) | 0, B = B + Math.imul(_e, T) | 0, m = m + Math.imul(Mt, A) | 0, v = v + Math.imul(Mt, W) | 0, v = v + Math.imul(me, A) | 0, B = B + Math.imul(me, W) | 0, m = m + Math.imul(bt, L) | 0, v = v + Math.imul(bt, lt) | 0, v = v + Math.imul(be, L) | 0, B = B + Math.imul(be, lt) | 0, m = m + Math.imul(_t, dt) | 0, v = v + Math.imul(_t, Jt) | 0, v = v + Math.imul(fe, dt) | 0, B = B + Math.imul(fe, Jt) | 0;
      var Ot = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, m = Math.imul(yt, at), v = Math.imul(yt, ce), v = v + Math.imul(xe, at) | 0, B = Math.imul(xe, ce), m = m + Math.imul(Bt, C) | 0, v = v + Math.imul(Bt, T) | 0, v = v + Math.imul(Ee, C) | 0, B = B + Math.imul(Ee, T) | 0, m = m + Math.imul(wt, A) | 0, v = v + Math.imul(wt, W) | 0, v = v + Math.imul(_e, A) | 0, B = B + Math.imul(_e, W) | 0, m = m + Math.imul(Mt, L) | 0, v = v + Math.imul(Mt, lt) | 0, v = v + Math.imul(me, L) | 0, B = B + Math.imul(me, lt) | 0, m = m + Math.imul(bt, dt) | 0, v = v + Math.imul(bt, Jt) | 0, v = v + Math.imul(be, dt) | 0, B = B + Math.imul(be, Jt) | 0;
      var G = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (G >>> 26) | 0, G &= 67108863, m = Math.imul(yt, C), v = Math.imul(yt, T), v = v + Math.imul(xe, C) | 0, B = Math.imul(xe, T), m = m + Math.imul(Bt, A) | 0, v = v + Math.imul(Bt, W) | 0, v = v + Math.imul(Ee, A) | 0, B = B + Math.imul(Ee, W) | 0, m = m + Math.imul(wt, L) | 0, v = v + Math.imul(wt, lt) | 0, v = v + Math.imul(_e, L) | 0, B = B + Math.imul(_e, lt) | 0, m = m + Math.imul(Mt, dt) | 0, v = v + Math.imul(Mt, Jt) | 0, v = v + Math.imul(me, dt) | 0, B = B + Math.imul(me, Jt) | 0;
      var et = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (et >>> 26) | 0, et &= 67108863, m = Math.imul(yt, A), v = Math.imul(yt, W), v = v + Math.imul(xe, A) | 0, B = Math.imul(xe, W), m = m + Math.imul(Bt, L) | 0, v = v + Math.imul(Bt, lt) | 0, v = v + Math.imul(Ee, L) | 0, B = B + Math.imul(Ee, lt) | 0, m = m + Math.imul(wt, dt) | 0, v = v + Math.imul(wt, Jt) | 0, v = v + Math.imul(_e, dt) | 0, B = B + Math.imul(_e, Jt) | 0;
      var At = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, m = Math.imul(yt, L), v = Math.imul(yt, lt), v = v + Math.imul(xe, L) | 0, B = Math.imul(xe, lt), m = m + Math.imul(Bt, dt) | 0, v = v + Math.imul(Bt, Jt) | 0, v = v + Math.imul(Ee, dt) | 0, B = B + Math.imul(Ee, Jt) | 0;
      var mt = (M + m | 0) + ((v & 8191) << 13) | 0;
      M = (B + (v >>> 13) | 0) + (mt >>> 26) | 0, mt &= 67108863, m = Math.imul(yt, dt), v = Math.imul(yt, Jt), v = v + Math.imul(xe, dt) | 0, B = Math.imul(xe, Jt);
      var vt = (M + m | 0) + ((v & 8191) << 13) | 0;
      return M = (B + (v >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, d[0] = Kt, d[1] = Xt, d[2] = Qt, d[3] = se, d[4] = oe, d[5] = te, d[6] = re, d[7] = ee, d[8] = Yt, d[9] = Gt, d[10] = jt, d[11] = Ht, d[12] = Vt, d[13] = Ot, d[14] = G, d[15] = et, d[16] = At, d[17] = mt, d[18] = vt, M !== 0 && (d[19] = M, p.length++), p;
    };
    Math.imul || (Tt = k);
    function it(a, s, h) {
      h.negative = s.negative ^ a.negative, h.length = a.length + s.length;
      for (var p = 0, l = 0, i = 0; i < h.length - 1; i++) {
        var d = l;
        l = 0;
        for (var M = p & 67108863, m = Math.min(i, s.length - 1), v = Math.max(0, i - a.length + 1); v <= m; v++) {
          var B = i - v, O = a.words[B] | 0, $ = s.words[v] | 0, ut = O * $, V = ut & 67108863;
          d = d + (ut / 67108864 | 0) | 0, V = V + M | 0, M = V & 67108863, d = d + (V >>> 26) | 0, l += d >>> 26, d &= 67108863;
        }
        h.words[i] = M, p = d, d = l;
      }
      return p !== 0 ? h.words[i] = p : h.length--, h._strip();
    }
    function q(a, s, h) {
      return it(a, s, h);
    }
    n.prototype.mulTo = function(s, h) {
      var p, l = this.length + s.length;
      return this.length === 10 && s.length === 10 ? p = Tt(this, s, h) : l < 63 ? p = k(this, s, h) : l < 1024 ? p = it(this, s, h) : p = q(this, s, h), p;
    };
    n.prototype.mul = function(s) {
      var h = new n(null);
      return h.words = new Array(this.length + s.length), this.mulTo(s, h);
    }, n.prototype.mulf = function(s) {
      var h = new n(null);
      return h.words = new Array(this.length + s.length), q(this, s, h);
    }, n.prototype.imul = function(s) {
      return this.clone().mulTo(s, this);
    }, n.prototype.imuln = function(s) {
      var h = s < 0;
      h && (s = -s), e(typeof s == "number"), e(s < 67108864);
      for (var p = 0, l = 0; l < this.length; l++) {
        var i = (this.words[l] | 0) * s, d = (i & 67108863) + (p & 67108863);
        p >>= 26, p += i / 67108864 | 0, p += d >>> 26, this.words[l] = d & 67108863;
      }
      return p !== 0 && (this.words[l] = p, this.length++), h ? this.ineg() : this;
    }, n.prototype.muln = function(s) {
      return this.clone().imuln(s);
    }, n.prototype.sqr = function() {
      return this.mul(this);
    }, n.prototype.isqr = function() {
      return this.imul(this.clone());
    }, n.prototype.pow = function(s) {
      var h = Z(s);
      if (h.length === 0)
        return new n(1);
      for (var p = this, l = 0; l < h.length && h[l] === 0; l++, p = p.sqr())
        ;
      if (++l < h.length)
        for (var i = p.sqr(); l < h.length; l++, i = i.sqr())
          h[l] !== 0 && (p = p.mul(i));
      return p;
    }, n.prototype.iushln = function(s) {
      e(typeof s == "number" && s >= 0);
      var h = s % 26, p = (s - h) / 26, l = 67108863 >>> 26 - h << 26 - h, i;
      if (h !== 0) {
        var d = 0;
        for (i = 0; i < this.length; i++) {
          var M = this.words[i] & l, m = (this.words[i] | 0) - M << h;
          this.words[i] = m | d, d = M >>> 26 - h;
        }
        d && (this.words[i] = d, this.length++);
      }
      if (p !== 0) {
        for (i = this.length - 1; i >= 0; i--)
          this.words[i + p] = this.words[i];
        for (i = 0; i < p; i++)
          this.words[i] = 0;
        this.length += p;
      }
      return this._strip();
    }, n.prototype.ishln = function(s) {
      return e(this.negative === 0), this.iushln(s);
    }, n.prototype.iushrn = function(s, h, p) {
      e(typeof s == "number" && s >= 0);
      var l;
      h ? l = (h - h % 26) / 26 : l = 0;
      var i = s % 26, d = Math.min((s - i) / 26, this.length), M = 67108863 ^ 67108863 >>> i << i, m = p;
      if (l -= d, l = Math.max(0, l), m) {
        for (var v = 0; v < d; v++)
          m.words[v] = this.words[v];
        m.length = d;
      }
      if (d !== 0)
        if (this.length > d)
          for (this.length -= d, v = 0; v < this.length; v++)
            this.words[v] = this.words[v + d];
        else
          this.words[0] = 0, this.length = 1;
      var B = 0;
      for (v = this.length - 1; v >= 0 && (B !== 0 || v >= l); v--) {
        var O = this.words[v] | 0;
        this.words[v] = B << 26 - i | O >>> i, B = O & M;
      }
      return m && B !== 0 && (m.words[m.length++] = B), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, n.prototype.ishrn = function(s, h, p) {
      return e(this.negative === 0), this.iushrn(s, h, p);
    }, n.prototype.shln = function(s) {
      return this.clone().ishln(s);
    }, n.prototype.ushln = function(s) {
      return this.clone().iushln(s);
    }, n.prototype.shrn = function(s) {
      return this.clone().ishrn(s);
    }, n.prototype.ushrn = function(s) {
      return this.clone().iushrn(s);
    }, n.prototype.testn = function(s) {
      e(typeof s == "number" && s >= 0);
      var h = s % 26, p = (s - h) / 26, l = 1 << h;
      if (this.length <= p)
        return false;
      var i = this.words[p];
      return !!(i & l);
    }, n.prototype.imaskn = function(s) {
      e(typeof s == "number" && s >= 0);
      var h = s % 26, p = (s - h) / 26;
      if (e(this.negative === 0, "imaskn works only with positive numbers"), this.length <= p)
        return this;
      if (h !== 0 && p++, this.length = Math.min(p, this.length), h !== 0) {
        var l = 67108863 ^ 67108863 >>> h << h;
        this.words[this.length - 1] &= l;
      }
      return this._strip();
    }, n.prototype.maskn = function(s) {
      return this.clone().imaskn(s);
    }, n.prototype.iaddn = function(s) {
      return e(typeof s == "number"), e(s < 67108864), s < 0 ? this.isubn(-s) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= s ? (this.words[0] = s - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(s), this.negative = 1, this) : this._iaddn(s);
    }, n.prototype._iaddn = function(s) {
      this.words[0] += s;
      for (var h = 0; h < this.length && this.words[h] >= 67108864; h++)
        this.words[h] -= 67108864, h === this.length - 1 ? this.words[h + 1] = 1 : this.words[h + 1]++;
      return this.length = Math.max(this.length, h + 1), this;
    }, n.prototype.isubn = function(s) {
      if (e(typeof s == "number"), e(s < 67108864), s < 0)
        return this.iaddn(-s);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(s), this.negative = 1, this;
      if (this.words[0] -= s, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var h = 0; h < this.length && this.words[h] < 0; h++)
          this.words[h] += 67108864, this.words[h + 1] -= 1;
      return this._strip();
    }, n.prototype.addn = function(s) {
      return this.clone().iaddn(s);
    }, n.prototype.subn = function(s) {
      return this.clone().isubn(s);
    }, n.prototype.iabs = function() {
      return this.negative = 0, this;
    }, n.prototype.abs = function() {
      return this.clone().iabs();
    }, n.prototype._ishlnsubmul = function(s, h, p) {
      var l = s.length + p, i;
      this._expand(l);
      var d, M = 0;
      for (i = 0; i < s.length; i++) {
        d = (this.words[i + p] | 0) + M;
        var m = (s.words[i] | 0) * h;
        d -= m & 67108863, M = (d >> 26) - (m / 67108864 | 0), this.words[i + p] = d & 67108863;
      }
      for (; i < this.length - p; i++)
        d = (this.words[i + p] | 0) + M, M = d >> 26, this.words[i + p] = d & 67108863;
      if (M === 0)
        return this._strip();
      for (e(M === -1), M = 0, i = 0; i < this.length; i++)
        d = -(this.words[i] | 0) + M, M = d >> 26, this.words[i] = d & 67108863;
      return this.negative = 1, this._strip();
    }, n.prototype._wordDiv = function(s, h) {
      var p = this.length - s.length, l = this.clone(), i = s, d = i.words[i.length - 1] | 0, M = this._countBits(d);
      p = 26 - M, p !== 0 && (i = i.ushln(p), l.iushln(p), d = i.words[i.length - 1] | 0);
      var m = l.length - i.length, v;
      if (h !== "mod") {
        v = new n(null), v.length = m + 1, v.words = new Array(v.length);
        for (var B = 0; B < v.length; B++)
          v.words[B] = 0;
      }
      var O = l.clone()._ishlnsubmul(i, 1, m);
      O.negative === 0 && (l = O, v && (v.words[m] = 1));
      for (var $ = m - 1; $ >= 0; $--) {
        var ut = (l.words[i.length + $] | 0) * 67108864 + (l.words[i.length + $ - 1] | 0);
        for (ut = Math.min(ut / d | 0, 67108863), l._ishlnsubmul(i, ut, $); l.negative !== 0; )
          ut--, l.negative = 0, l._ishlnsubmul(i, 1, $), l.isZero() || (l.negative ^= 1);
        v && (v.words[$] = ut);
      }
      return v && v._strip(), l._strip(), h !== "div" && p !== 0 && l.iushrn(p), { div: v || null, mod: l };
    }, n.prototype.divmod = function(s, h, p) {
      if (e(!s.isZero()), this.isZero())
        return { div: new n(0), mod: new n(0) };
      var l, i, d;
      return this.negative !== 0 && s.negative === 0 ? (d = this.neg().divmod(s, h), h !== "mod" && (l = d.div.neg()), h !== "div" && (i = d.mod.neg(), p && i.negative !== 0 && i.iadd(s)), { div: l, mod: i }) : this.negative === 0 && s.negative !== 0 ? (d = this.divmod(s.neg(), h), h !== "mod" && (l = d.div.neg()), { div: l, mod: d.mod }) : this.negative & s.negative ? (d = this.neg().divmod(s.neg(), h), h !== "div" && (i = d.mod.neg(), p && i.negative !== 0 && i.isub(s)), { div: d.div, mod: i }) : s.length > this.length || this.cmp(s) < 0 ? { div: new n(0), mod: this } : s.length === 1 ? h === "div" ? { div: this.divn(s.words[0]), mod: null } : h === "mod" ? { div: null, mod: new n(this.modrn(s.words[0])) } : { div: this.divn(s.words[0]), mod: new n(this.modrn(s.words[0])) } : this._wordDiv(s, h);
    }, n.prototype.div = function(s) {
      return this.divmod(s, "div", false).div;
    }, n.prototype.mod = function(s) {
      return this.divmod(s, "mod", false).mod;
    }, n.prototype.umod = function(s) {
      return this.divmod(s, "mod", true).mod;
    }, n.prototype.divRound = function(s) {
      var h = this.divmod(s);
      if (h.mod.isZero())
        return h.div;
      var p = h.div.negative !== 0 ? h.mod.isub(s) : h.mod, l = s.ushrn(1), i = s.andln(1), d = p.cmp(l);
      return d < 0 || i === 1 && d === 0 ? h.div : h.div.negative !== 0 ? h.div.isubn(1) : h.div.iaddn(1);
    }, n.prototype.modrn = function(s) {
      var h = s < 0;
      h && (s = -s), e(s <= 67108863);
      for (var p = (1 << 26) % s, l = 0, i = this.length - 1; i >= 0; i--)
        l = (p * l + (this.words[i] | 0)) % s;
      return h ? -l : l;
    }, n.prototype.modn = function(s) {
      return this.modrn(s);
    }, n.prototype.idivn = function(s) {
      var h = s < 0;
      h && (s = -s), e(s <= 67108863);
      for (var p = 0, l = this.length - 1; l >= 0; l--) {
        var i = (this.words[l] | 0) + p * 67108864;
        this.words[l] = i / s | 0, p = i % s;
      }
      return this._strip(), h ? this.ineg() : this;
    }, n.prototype.divn = function(s) {
      return this.clone().idivn(s);
    }, n.prototype.egcd = function(s) {
      e(s.negative === 0), e(!s.isZero());
      var h = this, p = s.clone();
      h.negative !== 0 ? h = h.umod(s) : h = h.clone();
      for (var l = new n(1), i = new n(0), d = new n(0), M = new n(1), m = 0; h.isEven() && p.isEven(); )
        h.iushrn(1), p.iushrn(1), ++m;
      for (var v = p.clone(), B = h.clone(); !h.isZero(); ) {
        for (var O = 0, $ = 1; !(h.words[0] & $) && O < 26; ++O, $ <<= 1)
          ;
        if (O > 0)
          for (h.iushrn(O); O-- > 0; )
            (l.isOdd() || i.isOdd()) && (l.iadd(v), i.isub(B)), l.iushrn(1), i.iushrn(1);
        for (var ut = 0, V = 1; !(p.words[0] & V) && ut < 26; ++ut, V <<= 1)
          ;
        if (ut > 0)
          for (p.iushrn(ut); ut-- > 0; )
            (d.isOdd() || M.isOdd()) && (d.iadd(v), M.isub(B)), d.iushrn(1), M.iushrn(1);
        h.cmp(p) >= 0 ? (h.isub(p), l.isub(d), i.isub(M)) : (p.isub(h), d.isub(l), M.isub(i));
      }
      return { a: d, b: M, gcd: p.iushln(m) };
    }, n.prototype._invmp = function(s) {
      e(s.negative === 0), e(!s.isZero());
      var h = this, p = s.clone();
      h.negative !== 0 ? h = h.umod(s) : h = h.clone();
      for (var l = new n(1), i = new n(0), d = p.clone(); h.cmpn(1) > 0 && p.cmpn(1) > 0; ) {
        for (var M = 0, m = 1; !(h.words[0] & m) && M < 26; ++M, m <<= 1)
          ;
        if (M > 0)
          for (h.iushrn(M); M-- > 0; )
            l.isOdd() && l.iadd(d), l.iushrn(1);
        for (var v = 0, B = 1; !(p.words[0] & B) && v < 26; ++v, B <<= 1)
          ;
        if (v > 0)
          for (p.iushrn(v); v-- > 0; )
            i.isOdd() && i.iadd(d), i.iushrn(1);
        h.cmp(p) >= 0 ? (h.isub(p), l.isub(i)) : (p.isub(h), i.isub(l));
      }
      var O;
      return h.cmpn(1) === 0 ? O = l : O = i, O.cmpn(0) < 0 && O.iadd(s), O;
    }, n.prototype.gcd = function(s) {
      if (this.isZero())
        return s.abs();
      if (s.isZero())
        return this.abs();
      var h = this.clone(), p = s.clone();
      h.negative = 0, p.negative = 0;
      for (var l = 0; h.isEven() && p.isEven(); l++)
        h.iushrn(1), p.iushrn(1);
      do {
        for (; h.isEven(); )
          h.iushrn(1);
        for (; p.isEven(); )
          p.iushrn(1);
        var i = h.cmp(p);
        if (i < 0) {
          var d = h;
          h = p, p = d;
        } else if (i === 0 || p.cmpn(1) === 0)
          break;
        h.isub(p);
      } while (true);
      return p.iushln(l);
    }, n.prototype.invm = function(s) {
      return this.egcd(s).a.umod(s);
    }, n.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, n.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, n.prototype.andln = function(s) {
      return this.words[0] & s;
    }, n.prototype.bincn = function(s) {
      e(typeof s == "number");
      var h = s % 26, p = (s - h) / 26, l = 1 << h;
      if (this.length <= p)
        return this._expand(p + 1), this.words[p] |= l, this;
      for (var i = l, d = p; i !== 0 && d < this.length; d++) {
        var M = this.words[d] | 0;
        M += i, i = M >>> 26, M &= 67108863, this.words[d] = M;
      }
      return i !== 0 && (this.words[d] = i, this.length++), this;
    }, n.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, n.prototype.cmpn = function(s) {
      var h = s < 0;
      if (this.negative !== 0 && !h)
        return -1;
      if (this.negative === 0 && h)
        return 1;
      this._strip();
      var p;
      if (this.length > 1)
        p = 1;
      else {
        h && (s = -s), e(s <= 67108863, "Number is too big");
        var l = this.words[0] | 0;
        p = l === s ? 0 : l < s ? -1 : 1;
      }
      return this.negative !== 0 ? -p | 0 : p;
    }, n.prototype.cmp = function(s) {
      if (this.negative !== 0 && s.negative === 0)
        return -1;
      if (this.negative === 0 && s.negative !== 0)
        return 1;
      var h = this.ucmp(s);
      return this.negative !== 0 ? -h | 0 : h;
    }, n.prototype.ucmp = function(s) {
      if (this.length > s.length)
        return 1;
      if (this.length < s.length)
        return -1;
      for (var h = 0, p = this.length - 1; p >= 0; p--) {
        var l = this.words[p] | 0, i = s.words[p] | 0;
        if (l !== i) {
          l < i ? h = -1 : l > i && (h = 1);
          break;
        }
      }
      return h;
    }, n.prototype.gtn = function(s) {
      return this.cmpn(s) === 1;
    }, n.prototype.gt = function(s) {
      return this.cmp(s) === 1;
    }, n.prototype.gten = function(s) {
      return this.cmpn(s) >= 0;
    }, n.prototype.gte = function(s) {
      return this.cmp(s) >= 0;
    }, n.prototype.ltn = function(s) {
      return this.cmpn(s) === -1;
    }, n.prototype.lt = function(s) {
      return this.cmp(s) === -1;
    }, n.prototype.lten = function(s) {
      return this.cmpn(s) <= 0;
    }, n.prototype.lte = function(s) {
      return this.cmp(s) <= 0;
    }, n.prototype.eqn = function(s) {
      return this.cmpn(s) === 0;
    }, n.prototype.eq = function(s) {
      return this.cmp(s) === 0;
    }, n.red = function(s) {
      return new u(s);
    }, n.prototype.toRed = function(s) {
      return e(!this.red, "Already a number in reduction context"), e(this.negative === 0, "red works only with positives"), s.convertTo(this)._forceRed(s);
    }, n.prototype.fromRed = function() {
      return e(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, n.prototype._forceRed = function(s) {
      return this.red = s, this;
    }, n.prototype.forceRed = function(s) {
      return e(!this.red, "Already a number in reduction context"), this._forceRed(s);
    }, n.prototype.redAdd = function(s) {
      return e(this.red, "redAdd works only with red numbers"), this.red.add(this, s);
    }, n.prototype.redIAdd = function(s) {
      return e(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, s);
    }, n.prototype.redSub = function(s) {
      return e(this.red, "redSub works only with red numbers"), this.red.sub(this, s);
    }, n.prototype.redISub = function(s) {
      return e(this.red, "redISub works only with red numbers"), this.red.isub(this, s);
    }, n.prototype.redShl = function(s) {
      return e(this.red, "redShl works only with red numbers"), this.red.shl(this, s);
    }, n.prototype.redMul = function(s) {
      return e(this.red, "redMul works only with red numbers"), this.red._verify2(this, s), this.red.mul(this, s);
    }, n.prototype.redIMul = function(s) {
      return e(this.red, "redMul works only with red numbers"), this.red._verify2(this, s), this.red.imul(this, s);
    }, n.prototype.redSqr = function() {
      return e(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, n.prototype.redISqr = function() {
      return e(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, n.prototype.redSqrt = function() {
      return e(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, n.prototype.redInvm = function() {
      return e(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, n.prototype.redNeg = function() {
      return e(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, n.prototype.redPow = function(s) {
      return e(this.red && !s.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, s);
    };
    var nt = { k256: null, p224: null, p192: null, p25519: null };
    function ft(a, s) {
      this.name = a, this.p = new n(s, 16), this.n = this.p.bitLength(), this.k = new n(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    ft.prototype._tmp = function() {
      var s = new n(null);
      return s.words = new Array(Math.ceil(this.n / 13)), s;
    }, ft.prototype.ireduce = function(s) {
      var h = s, p;
      do
        this.split(h, this.tmp), h = this.imulK(h), h = h.iadd(this.tmp), p = h.bitLength();
      while (p > this.n);
      var l = p < this.n ? -1 : h.ucmp(this.p);
      return l === 0 ? (h.words[0] = 0, h.length = 1) : l > 0 ? h.isub(this.p) : h.strip !== void 0 ? h.strip() : h._strip(), h;
    }, ft.prototype.split = function(s, h) {
      s.iushrn(this.n, 0, h);
    }, ft.prototype.imulK = function(s) {
      return s.imul(this.k);
    };
    function Q() {
      ft.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    f(Q, ft), Q.prototype.split = function(s, h) {
      for (var p = 4194303, l = Math.min(s.length, 9), i = 0; i < l; i++)
        h.words[i] = s.words[i];
      if (h.length = l, s.length <= 9) {
        s.words[0] = 0, s.length = 1;
        return;
      }
      var d = s.words[9];
      for (h.words[h.length++] = d & p, i = 10; i < s.length; i++) {
        var M = s.words[i] | 0;
        s.words[i - 10] = (M & p) << 4 | d >>> 22, d = M;
      }
      d >>>= 22, s.words[i - 10] = d, d === 0 && s.length > 10 ? s.length -= 10 : s.length -= 9;
    }, Q.prototype.imulK = function(s) {
      s.words[s.length] = 0, s.words[s.length + 1] = 0, s.length += 2;
      for (var h = 0, p = 0; p < s.length; p++) {
        var l = s.words[p] | 0;
        h += l * 977, s.words[p] = h & 67108863, h = l * 64 + (h / 67108864 | 0);
      }
      return s.words[s.length - 1] === 0 && (s.length--, s.words[s.length - 1] === 0 && s.length--), s;
    };
    function $t() {
      ft.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    f($t, ft);
    function x() {
      ft.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    f(x, ft);
    function o() {
      ft.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    f(o, ft), o.prototype.imulK = function(s) {
      for (var h = 0, p = 0; p < s.length; p++) {
        var l = (s.words[p] | 0) * 19 + h, i = l & 67108863;
        l >>>= 26, s.words[p] = i, h = l;
      }
      return h !== 0 && (s.words[s.length++] = h), s;
    }, n._prime = function(s) {
      if (nt[s])
        return nt[s];
      var h;
      if (s === "k256")
        h = new Q();
      else if (s === "p224")
        h = new $t();
      else if (s === "p192")
        h = new x();
      else if (s === "p25519")
        h = new o();
      else
        throw new Error("Unknown prime " + s);
      return nt[s] = h, h;
    };
    function u(a) {
      if (typeof a == "string") {
        var s = n._prime(a);
        this.m = s.p, this.prime = s;
      } else
        e(a.gtn(1), "modulus must be greater than 1"), this.m = a, this.prime = null;
    }
    u.prototype._verify1 = function(s) {
      e(s.negative === 0, "red works only with positives"), e(s.red, "red works only with red numbers");
    }, u.prototype._verify2 = function(s, h) {
      e((s.negative | h.negative) === 0, "red works only with positives"), e(s.red && s.red === h.red, "red works only with red numbers");
    }, u.prototype.imod = function(s) {
      return this.prime ? this.prime.ireduce(s)._forceRed(this) : (S(s, s.umod(this.m)._forceRed(this)), s);
    }, u.prototype.neg = function(s) {
      return s.isZero() ? s.clone() : this.m.sub(s)._forceRed(this);
    }, u.prototype.add = function(s, h) {
      this._verify2(s, h);
      var p = s.add(h);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p._forceRed(this);
    }, u.prototype.iadd = function(s, h) {
      this._verify2(s, h);
      var p = s.iadd(h);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p;
    }, u.prototype.sub = function(s, h) {
      this._verify2(s, h);
      var p = s.sub(h);
      return p.cmpn(0) < 0 && p.iadd(this.m), p._forceRed(this);
    }, u.prototype.isub = function(s, h) {
      this._verify2(s, h);
      var p = s.isub(h);
      return p.cmpn(0) < 0 && p.iadd(this.m), p;
    }, u.prototype.shl = function(s, h) {
      return this._verify1(s), this.imod(s.ushln(h));
    }, u.prototype.imul = function(s, h) {
      return this._verify2(s, h), this.imod(s.imul(h));
    }, u.prototype.mul = function(s, h) {
      return this._verify2(s, h), this.imod(s.mul(h));
    }, u.prototype.isqr = function(s) {
      return this.imul(s, s.clone());
    }, u.prototype.sqr = function(s) {
      return this.mul(s, s);
    }, u.prototype.sqrt = function(s) {
      if (s.isZero())
        return s.clone();
      var h = this.m.andln(3);
      if (e(h % 2 === 1), h === 3) {
        var p = this.m.add(new n(1)).iushrn(2);
        return this.pow(s, p);
      }
      for (var l = this.m.subn(1), i = 0; !l.isZero() && l.andln(1) === 0; )
        i++, l.iushrn(1);
      e(!l.isZero());
      var d = new n(1).toRed(this), M = d.redNeg(), m = this.m.subn(1).iushrn(1), v = this.m.bitLength();
      for (v = new n(2 * v * v).toRed(this); this.pow(v, m).cmp(M) !== 0; )
        v.redIAdd(M);
      for (var B = this.pow(v, l), O = this.pow(s, l.addn(1).iushrn(1)), $ = this.pow(s, l), ut = i; $.cmp(d) !== 0; ) {
        for (var V = $, ot = 0; V.cmp(d) !== 0; ot++)
          V = V.redSqr();
        e(ot < ut);
        var le = this.pow(B, new n(1).iushln(ut - ot - 1));
        O = O.redMul(le), B = le.redSqr(), $ = $.redMul(B), ut = ot;
      }
      return O;
    }, u.prototype.invm = function(s) {
      var h = s._invmp(this.m);
      return h.negative !== 0 ? (h.negative = 0, this.imod(h).redNeg()) : this.imod(h);
    }, u.prototype.pow = function(s, h) {
      if (h.isZero())
        return new n(1).toRed(this);
      if (h.cmpn(1) === 0)
        return s.clone();
      var p = 4, l = new Array(1 << p);
      l[0] = new n(1).toRed(this), l[1] = s;
      for (var i = 2; i < l.length; i++)
        l[i] = this.mul(l[i - 1], s);
      var d = l[0], M = 0, m = 0, v = h.bitLength() % 26;
      for (v === 0 && (v = 26), i = h.length - 1; i >= 0; i--) {
        for (var B = h.words[i], O = v - 1; O >= 0; O--) {
          var $ = B >> O & 1;
          if (d !== l[0] && (d = this.sqr(d)), $ === 0 && M === 0) {
            m = 0;
            continue;
          }
          M <<= 1, M |= $, m++, !(m !== p && (i !== 0 || O !== 0)) && (d = this.mul(d, l[M]), m = 0, M = 0);
        }
        v = 26;
      }
      return d;
    }, u.prototype.convertTo = function(s) {
      var h = s.umod(this.m);
      return h === s ? h.clone() : h;
    }, u.prototype.convertFrom = function(s) {
      var h = s.clone();
      return h.red = null, h;
    }, n.mont = function(s) {
      return new c(s);
    };
    function c(a) {
      u.call(this, a), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new n(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    f(c, u), c.prototype.convertTo = function(s) {
      return this.imod(s.ushln(this.shift));
    }, c.prototype.convertFrom = function(s) {
      var h = this.imod(s.mul(this.rinv));
      return h.red = null, h;
    }, c.prototype.imul = function(s, h) {
      if (s.isZero() || h.isZero())
        return s.words[0] = 0, s.length = 1, s;
      var p = s.imul(h), l = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), i = p.isub(l).iushrn(this.shift), d = i;
      return i.cmp(this.m) >= 0 ? d = i.isub(this.m) : i.cmpn(0) < 0 && (d = i.iadd(this.m)), d._forceRed(this);
    }, c.prototype.mul = function(s, h) {
      if (s.isZero() || h.isZero())
        return new n(0)._forceRed(this);
      var p = s.mul(h), l = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), i = p.isub(l).iushrn(this.shift), d = i;
      return i.cmp(this.m) >= 0 ? d = i.isub(this.m) : i.cmpn(0) < 0 && (d = i.iadd(this.m)), d._forceRed(this);
    }, c.prototype.invm = function(s) {
      var h = this.imod(s._invmp(this.m).mul(this.r2));
      return h._forceRed(this);
    };
  })(typeof za == "undefined" || za, bu);
});
var Cu = ae((ja, Eu) => {
  var Oo = qi(), Tr = Oo.Buffer;
  function _u(r3, t) {
    for (var e in r3)
      t[e] = r3[e];
  }
  Tr.from && Tr.alloc && Tr.allocUnsafe && Tr.allocUnsafeSlow ? Eu.exports = Oo : (_u(Oo, ja), ja.Buffer = ui);
  function ui(r3, t, e) {
    return Tr(r3, t, e);
  }
  ui.prototype = Object.create(Tr.prototype);
  _u(Tr, ui);
  ui.from = function(r3, t, e) {
    if (typeof r3 == "number")
      throw new TypeError("Argument must not be a number");
    return Tr(r3, t, e);
  };
  ui.alloc = function(r3, t, e) {
    if (typeof r3 != "number")
      throw new TypeError("Argument must be a number");
    var f = Tr(r3);
    return t !== void 0 ? typeof e == "string" ? f.fill(t, e) : f.fill(t) : f.fill(0), f;
  };
  ui.allocUnsafe = function(r3) {
    if (typeof r3 != "number")
      throw new TypeError("Argument must be a number");
    return Tr(r3);
  };
  ui.allocUnsafeSlow = function(r3) {
    if (typeof r3 != "number")
      throw new TypeError("Argument must be a number");
    return Oo.SlowBuffer(r3);
  };
});
var Su = ae((U6, Bu) => {
  var ko = Cu().Buffer;
  function og(r3) {
    if (r3.length >= 255)
      throw new TypeError("Alphabet too long");
    for (var t = new Uint8Array(256), e = 0; e < t.length; e++)
      t[e] = 255;
    for (var f = 0; f < r3.length; f++) {
      var n = r3.charAt(f), g = n.charCodeAt(0);
      if (t[g] !== 255)
        throw new TypeError(n + " is ambiguous");
      t[g] = f;
    }
    var y = r3.length, _ = r3.charAt(0), E = Math.log(y) / Math.log(256), S = Math.log(256) / Math.log(y);
    function I(Y) {
      if ((Array.isArray(Y) || Y instanceof Uint8Array) && (Y = ko.from(Y)), !ko.isBuffer(Y))
        throw new TypeError("Expected Buffer");
      if (Y.length === 0)
        return "";
      for (var K = 0, Z = 0, k = 0, Tt = Y.length; k !== Tt && Y[k] === 0; )
        k++, K++;
      for (var it = (Tt - k) * S + 1 >>> 0, q = new Uint8Array(it); k !== Tt; ) {
        for (var j = Y[k], nt = 0, ft = it - 1; (j !== 0 || nt < Z) && ft !== -1; ft--, nt++)
          j += 256 * q[ft] >>> 0, q[ft] = j % y >>> 0, j = j / y >>> 0;
        if (j !== 0)
          throw new Error("Non-zero carry");
        Z = nt, k++;
      }
      for (var Q = it - Z; Q !== it && q[Q] === 0; )
        Q++;
      for (var $t = _.repeat(K); Q < it; ++Q)
        $t += r3.charAt(q[Q]);
      return $t;
    }
    function F(Y) {
      if (typeof Y != "string")
        throw new TypeError("Expected String");
      if (Y.length === 0)
        return ko.alloc(0);
      for (var K = 0, Z = 0, k = 0; Y[K] === _; )
        Z++, K++;
      for (var Tt = (Y.length - K) * E + 1 >>> 0, it = new Uint8Array(Tt); K < Y.length; ) {
        var q = t[Y.charCodeAt(K)];
        if (q === 255)
          return;
        for (var j = 0, nt = Tt - 1; (q !== 0 || j < k) && nt !== -1; nt--, j++)
          q += y * it[nt] >>> 0, it[nt] = q % 256 >>> 0, q = q / 256 >>> 0;
        if (q !== 0)
          throw new Error("Non-zero carry");
        k = j, K++;
      }
      for (var ft = Tt - k; ft !== Tt && it[ft] === 0; )
        ft++;
      var Q = ko.allocUnsafe(Z + (Tt - ft));
      Q.fill(0, 0, Z);
      for (var $t = Z; ft !== Tt; )
        Q[$t++] = it[ft++];
      return Q;
    }
    function P(Y) {
      var K = F(Y);
      if (K)
        return K;
      throw new Error("Non-base" + y + " character");
    }
    return { encode: I, decodeUnsafe: F, decode: P };
  }
  Bu.exports = og;
});
var Fu = ae((R6, Tu) => {
  var sg = Su(), ag = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  Tu.exports = sg(ag);
});
var Iu = ae((Ya) => {
  function Wr(r3, t, e) {
    return t <= r3 && r3 <= e;
  }
  function jo(r3) {
    if (r3 === void 0)
      return {};
    if (r3 === Object(r3))
      return r3;
    throw TypeError("Could not convert argument to dictionary");
  }
  function fg(r3) {
    for (var t = String(r3), e = t.length, f = 0, n = []; f < e; ) {
      var g = t.charCodeAt(f);
      if (g < 55296 || g > 57343)
        n.push(g);
      else if (56320 <= g && g <= 57343)
        n.push(65533);
      else if (55296 <= g && g <= 56319)
        if (f === e - 1)
          n.push(65533);
        else {
          var y = r3.charCodeAt(f + 1);
          if (56320 <= y && y <= 57343) {
            var _ = g & 1023, E = y & 1023;
            n.push(65536 + (_ << 10) + E), f += 1;
          } else
            n.push(65533);
        }
      f += 1;
    }
    return n;
  }
  function hg(r3) {
    for (var t = "", e = 0; e < r3.length; ++e) {
      var f = r3[e];
      f <= 65535 ? t += String.fromCharCode(f) : (f -= 65536, t += String.fromCharCode((f >> 10) + 55296, (f & 1023) + 56320));
    }
    return t;
  }
  var Lo = -1;
  function Ka(r3) {
    this.tokens = [].slice.call(r3);
  }
  Ka.prototype = { endOfStream: function() {
    return !this.tokens.length;
  }, read: function() {
    return this.tokens.length ? this.tokens.shift() : Lo;
  }, prepend: function(r3) {
    if (Array.isArray(r3))
      for (var t = r3; t.length; )
        this.tokens.unshift(t.pop());
    else
      this.tokens.unshift(r3);
  }, push: function(r3) {
    if (Array.isArray(r3))
      for (var t = r3; t.length; )
        this.tokens.push(t.shift());
    else
      this.tokens.push(r3);
  } };
  var Zi = -1;
  function $a(r3, t) {
    if (r3)
      throw TypeError("Decoder error");
    return t || 65533;
  }
  var qo = "utf-8";
  function Wo(r3, t) {
    if (!(this instanceof Wo))
      return new Wo(r3, t);
    if (r3 = r3 !== void 0 ? String(r3).toLowerCase() : qo, r3 !== qo)
      throw new Error("Encoding not supported. Only utf-8 is supported");
    t = jo(t), this._streaming = false, this._BOMseen = false, this._decoder = null, this._fatal = !!t.fatal, this._ignoreBOM = !!t.ignoreBOM, Object.defineProperty(this, "encoding", { value: "utf-8" }), Object.defineProperty(this, "fatal", { value: this._fatal }), Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
  }
  Wo.prototype = { decode: function(t, e) {
    var f;
    typeof t == "object" && t instanceof ArrayBuffer ? f = new Uint8Array(t) : typeof t == "object" && "buffer" in t && t.buffer instanceof ArrayBuffer ? f = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : f = new Uint8Array(0), e = jo(e), this._streaming || (this._decoder = new lg({ fatal: this._fatal }), this._BOMseen = false), this._streaming = !!e.stream;
    for (var n = new Ka(f), g = [], y; !n.endOfStream() && (y = this._decoder.handler(n, n.read()), y !== Zi); )
      y !== null && (Array.isArray(y) ? g.push.apply(g, y) : g.push(y));
    if (!this._streaming) {
      do {
        if (y = this._decoder.handler(n, n.read()), y === Zi)
          break;
        y !== null && (Array.isArray(y) ? g.push.apply(g, y) : g.push(y));
      } while (!n.endOfStream());
      this._decoder = null;
    }
    return g.length && ["utf-8"].indexOf(this.encoding) !== -1 && !this._ignoreBOM && !this._BOMseen && (g[0] === 65279 ? (this._BOMseen = true, g.shift()) : this._BOMseen = true), hg(g);
  } };
  function zo(r3, t) {
    if (!(this instanceof zo))
      return new zo(r3, t);
    if (r3 = r3 !== void 0 ? String(r3).toLowerCase() : qo, r3 !== qo)
      throw new Error("Encoding not supported. Only utf-8 is supported");
    t = jo(t), this._streaming = false, this._encoder = null, this._options = { fatal: !!t.fatal }, Object.defineProperty(this, "encoding", { value: "utf-8" });
  }
  zo.prototype = { encode: function(t, e) {
    t = t ? String(t) : "", e = jo(e), this._streaming || (this._encoder = new ug(this._options)), this._streaming = !!e.stream;
    for (var f = [], n = new Ka(fg(t)), g; !n.endOfStream() && (g = this._encoder.handler(n, n.read()), g !== Zi); )
      Array.isArray(g) ? f.push.apply(f, g) : f.push(g);
    if (!this._streaming) {
      for (; g = this._encoder.handler(n, n.read()), g !== Zi; )
        Array.isArray(g) ? f.push.apply(f, g) : f.push(g);
      this._encoder = null;
    }
    return new Uint8Array(f);
  } };
  function lg(r3) {
    var t = r3.fatal, e = 0, f = 0, n = 0, g = 128, y = 191;
    this.handler = function(_, E) {
      if (E === Lo && n !== 0)
        return n = 0, $a(t);
      if (E === Lo)
        return Zi;
      if (n === 0) {
        if (Wr(E, 0, 127))
          return E;
        if (Wr(E, 194, 223))
          n = 1, e = E - 192;
        else if (Wr(E, 224, 239))
          E === 224 && (g = 160), E === 237 && (y = 159), n = 2, e = E - 224;
        else if (Wr(E, 240, 244))
          E === 240 && (g = 144), E === 244 && (y = 143), n = 3, e = E - 240;
        else
          return $a(t);
        return e = e << 6 * n, null;
      }
      if (!Wr(E, g, y))
        return e = n = f = 0, g = 128, y = 191, _.prepend(E), $a(t);
      if (g = 128, y = 191, f += 1, e += E - 128 << 6 * (n - f), f !== n)
        return null;
      var S = e;
      return e = n = f = 0, S;
    };
  }
  function ug(r3) {
    r3.fatal;
    this.handler = function(e, f) {
      if (f === Lo)
        return Zi;
      if (Wr(f, 0, 127))
        return f;
      var n, g;
      Wr(f, 128, 2047) ? (n = 1, g = 192) : Wr(f, 2048, 65535) ? (n = 2, g = 224) : Wr(f, 65536, 1114111) && (n = 3, g = 240);
      for (var y = [(f >> 6 * n) + g]; n > 0; ) {
        var _ = f >> 6 * (n - 1);
        y.push(128 | _ & 63), n -= 1;
      }
      return y;
    };
  }
  Ya.TextEncoder = zo;
  Ya.TextDecoder = Wo;
});
var Du = ae((Ne) => {
  var cg = Ne && Ne.__createBinding || (Object.create ? function(r3, t, e, f) {
    f === void 0 && (f = e), Object.defineProperty(r3, f, { enumerable: true, get: function() {
      return t[e];
    } });
  } : function(r3, t, e, f) {
    f === void 0 && (f = e), r3[f] = t[e];
  }), dg = Ne && Ne.__setModuleDefault || (Object.create ? function(r3, t) {
    Object.defineProperty(r3, "default", { enumerable: true, value: t });
  } : function(r3, t) {
    r3.default = t;
  }), Fr = Ne && Ne.__decorate || function(r3, t, e, f) {
    var n = arguments.length, g = n < 3 ? t : f === null ? f = Object.getOwnPropertyDescriptor(t, e) : f, y;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      g = Reflect.decorate(r3, t, e, f);
    else
      for (var _ = r3.length - 1; _ >= 0; _--)
        (y = r3[_]) && (g = (n < 3 ? y(g) : n > 3 ? y(t, e, g) : y(t, e)) || g);
    return n > 3 && g && Object.defineProperty(t, e, g), g;
  }, pg = Ne && Ne.__importStar || function(r3) {
    if (r3 && r3.__esModule)
      return r3;
    var t = {};
    if (r3 != null)
      for (var e in r3)
        e !== "default" && Object.hasOwnProperty.call(r3, e) && cg(t, r3, e);
    return dg(t, r3), t;
  }, Nu = Ne && Ne.__importDefault || function(r3) {
    return r3 && r3.__esModule ? r3 : { default: r3 };
  };
  Object.defineProperty(Ne, "__esModule", { value: true });
  Ne.deserializeUnchecked = Ne.deserialize = Ne.serialize = Ne.BinaryReader = Ne.BinaryWriter = Ne.BorshError = Ne.baseDecode = Ne.baseEncode = void 0;
  var ei = Nu(Au()), Uu = Nu(Fu()), mg = pg(Iu()), gg = typeof TextDecoder != "function" ? mg.TextDecoder : TextDecoder, vg = new gg("utf-8", { fatal: true });
  function yg(r3) {
    return typeof r3 == "string" && (r3 = Buffer.from(r3, "utf8")), Uu.default.encode(Buffer.from(r3));
  }
  Ne.baseEncode = yg;
  function wg(r3) {
    return Buffer.from(Uu.default.decode(r3));
  }
  Ne.baseDecode = wg;
  var Ha = 1024, Ve = class extends Error {
    constructor(t) {
      super(t), this.fieldPath = [], this.originalMessage = t;
    }
    addToFieldPath(t) {
      this.fieldPath.splice(0, 0, t), this.message = this.originalMessage + ": " + this.fieldPath.join(".");
    }
  };
  Ne.BorshError = Ve;
  var $o = class {
    constructor() {
      this.buf = Buffer.alloc(Ha), this.length = 0;
    }
    maybeResize() {
      this.buf.length < 16 + this.length && (this.buf = Buffer.concat([this.buf, Buffer.alloc(Ha)]));
    }
    writeU8(t) {
      this.maybeResize(), this.buf.writeUInt8(t, this.length), this.length += 1;
    }
    writeU16(t) {
      this.maybeResize(), this.buf.writeUInt16LE(t, this.length), this.length += 2;
    }
    writeU32(t) {
      this.maybeResize(), this.buf.writeUInt32LE(t, this.length), this.length += 4;
    }
    writeU64(t) {
      this.maybeResize(), this.writeBuffer(Buffer.from(new ei.default(t).toArray("le", 8)));
    }
    writeU128(t) {
      this.maybeResize(), this.writeBuffer(Buffer.from(new ei.default(t).toArray("le", 16)));
    }
    writeU256(t) {
      this.maybeResize(), this.writeBuffer(Buffer.from(new ei.default(t).toArray("le", 32)));
    }
    writeU512(t) {
      this.maybeResize(), this.writeBuffer(Buffer.from(new ei.default(t).toArray("le", 64)));
    }
    writeBuffer(t) {
      this.buf = Buffer.concat([Buffer.from(this.buf.subarray(0, this.length)), t, Buffer.alloc(Ha)]), this.length += t.length;
    }
    writeString(t) {
      this.maybeResize();
      let e = Buffer.from(t, "utf8");
      this.writeU32(e.length), this.writeBuffer(e);
    }
    writeFixedArray(t) {
      this.writeBuffer(Buffer.from(t));
    }
    writeArray(t, e) {
      this.maybeResize(), this.writeU32(t.length);
      for (let f of t)
        this.maybeResize(), e(f);
    }
    toArray() {
      return this.buf.subarray(0, this.length);
    }
  };
  Ne.BinaryWriter = $o;
  function Ir(r3, t, e) {
    let f = e.value;
    e.value = function(...n) {
      try {
        return f.apply(this, n);
      } catch (g) {
        if (g instanceof RangeError) {
          let y = g.code;
          if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(y) >= 0)
            throw new Ve("Reached the end of buffer when deserializing");
        }
        throw g;
      }
    };
  }
  var nr = class {
    constructor(t) {
      this.buf = t, this.offset = 0;
    }
    readU8() {
      let t = this.buf.readUInt8(this.offset);
      return this.offset += 1, t;
    }
    readU16() {
      let t = this.buf.readUInt16LE(this.offset);
      return this.offset += 2, t;
    }
    readU32() {
      let t = this.buf.readUInt32LE(this.offset);
      return this.offset += 4, t;
    }
    readU64() {
      let t = this.readBuffer(8);
      return new ei.default(t, "le");
    }
    readU128() {
      let t = this.readBuffer(16);
      return new ei.default(t, "le");
    }
    readU256() {
      let t = this.readBuffer(32);
      return new ei.default(t, "le");
    }
    readU512() {
      let t = this.readBuffer(64);
      return new ei.default(t, "le");
    }
    readBuffer(t) {
      if (this.offset + t > this.buf.length)
        throw new Ve(`Expected buffer length ${t} isn't within bounds`);
      let e = this.buf.slice(this.offset, this.offset + t);
      return this.offset += t, e;
    }
    readString() {
      let t = this.readU32(), e = this.readBuffer(t);
      try {
        return vg.decode(e);
      } catch (f) {
        throw new Ve(`Error decoding UTF-8 string: ${f}`);
      }
    }
    readFixedArray(t) {
      return new Uint8Array(this.readBuffer(t));
    }
    readArray(t) {
      let e = this.readU32(), f = Array();
      for (let n = 0; n < e; ++n)
        f.push(t());
      return f;
    }
  };
  Fr([Ir], nr.prototype, "readU8", null);
  Fr([Ir], nr.prototype, "readU16", null);
  Fr([Ir], nr.prototype, "readU32", null);
  Fr([Ir], nr.prototype, "readU64", null);
  Fr([Ir], nr.prototype, "readU128", null);
  Fr([Ir], nr.prototype, "readU256", null);
  Fr([Ir], nr.prototype, "readU512", null);
  Fr([Ir], nr.prototype, "readString", null);
  Fr([Ir], nr.prototype, "readFixedArray", null);
  Fr([Ir], nr.prototype, "readArray", null);
  Ne.BinaryReader = nr;
  function Ru(r3) {
    return r3.charAt(0).toUpperCase() + r3.slice(1);
  }
  function ci(r3, t, e, f, n) {
    try {
      if (typeof f == "string")
        n[`write${Ru(f)}`](e);
      else if (f instanceof Array)
        if (typeof f[0] == "number") {
          if (e.length !== f[0])
            throw new Ve(`Expecting byte array of length ${f[0]}, but got ${e.length} bytes`);
          n.writeFixedArray(e);
        } else if (f.length === 2 && typeof f[1] == "number") {
          if (e.length !== f[1])
            throw new Ve(`Expecting byte array of length ${f[1]}, but got ${e.length} bytes`);
          for (let g = 0; g < f[1]; g++)
            ci(r3, null, e[g], f[0], n);
        } else
          n.writeArray(e, (g) => {
            ci(r3, t, g, f[0], n);
          });
      else if (f.kind !== void 0)
        switch (f.kind) {
          case "option": {
            e == null ? n.writeU8(0) : (n.writeU8(1), ci(r3, t, e, f.type, n));
            break;
          }
          case "map": {
            n.writeU32(e.size), e.forEach((g, y) => {
              ci(r3, t, y, f.key, n), ci(r3, t, g, f.value, n);
            });
            break;
          }
          default:
            throw new Ve(`FieldType ${f} unrecognized`);
        }
      else
        Pu(r3, e, n);
    } catch (g) {
      throw g instanceof Ve && g.addToFieldPath(t), g;
    }
  }
  function Pu(r3, t, e) {
    if (typeof t.borshSerialize == "function") {
      t.borshSerialize(e);
      return;
    }
    let f = r3.get(t.constructor);
    if (!f)
      throw new Ve(`Class ${t.constructor.name} is missing in schema`);
    if (f.kind === "struct")
      f.fields.map(([n, g]) => {
        ci(r3, n, t[n], g, e);
      });
    else if (f.kind === "enum") {
      let n = t[f.field];
      for (let g = 0; g < f.values.length; ++g) {
        let [y, _] = f.values[g];
        if (y === n) {
          e.writeU8(g), ci(r3, y, t[y], _, e);
          break;
        }
      }
    } else
      throw new Ve(`Unexpected schema kind: ${f.kind} for ${t.constructor.name}`);
  }
  function xg(r3, t, e = $o) {
    let f = new e();
    return Pu(r3, t, f), f.toArray();
  }
  Ne.serialize = xg;
  function di(r3, t, e, f) {
    try {
      if (typeof e == "string")
        return f[`read${Ru(e)}`]();
      if (e instanceof Array) {
        if (typeof e[0] == "number")
          return f.readFixedArray(e[0]);
        if (typeof e[1] == "number") {
          let n = [];
          for (let g = 0; g < e[1]; g++)
            n.push(di(r3, null, e[0], f));
          return n;
        } else
          return f.readArray(() => di(r3, t, e[0], f));
      }
      if (e.kind === "option")
        return f.readU8() ? di(r3, t, e.type, f) : void 0;
      if (e.kind === "map") {
        let n = /* @__PURE__ */ new Map(), g = f.readU32();
        for (let y = 0; y < g; y++) {
          let _ = di(r3, t, e.key, f), E = di(r3, t, e.value, f);
          n.set(_, E);
        }
        return n;
      }
      return Za(r3, e, f);
    } catch (n) {
      throw n instanceof Ve && n.addToFieldPath(t), n;
    }
  }
  function Za(r3, t, e) {
    if (typeof t.borshDeserialize == "function")
      return t.borshDeserialize(e);
    let f = r3.get(t);
    if (!f)
      throw new Ve(`Class ${t.name} is missing in schema`);
    if (f.kind === "struct") {
      let n = {};
      for (let [g, y] of r3.get(t).fields)
        n[g] = di(r3, g, y, e);
      return new t(n);
    }
    if (f.kind === "enum") {
      let n = e.readU8();
      if (n >= f.values.length)
        throw new Ve(`Enum index: ${n} is out of range`);
      let [g, y] = f.values[n], _ = di(r3, g, y, e);
      return new t({ [g]: _ });
    }
    throw new Ve(`Unexpected schema kind: ${f.kind} for ${t.constructor.name}`);
  }
  function Mg(r3, t, e, f = nr) {
    let n = new f(e), g = Za(r3, t, n);
    if (n.offset < e.length)
      throw new Ve(`Unexpected ${e.length - n.offset} bytes after deserialized data`);
    return g;
  }
  Ne.deserialize = Mg;
  function bg(r3, t, e, f = nr) {
    let n = new f(e);
    return Za(r3, t, n);
  }
  Ne.deserializeUnchecked = bg;
});
var o0 = Ue(n0(), 1);
var Rn = o0.default;
var s0 = typeof window != "undefined";
(function() {
  if (!s0 || typeof window.Telegram != "undefined" && typeof window.Telegram.WebApp != "undefined")
    return;
  var r3 = {}, t = "";
  try {
    t = location.hash.toString();
  } catch (q) {
  }
  var e = E(t), f = it("initParams");
  if (f)
    for (var n in f)
      typeof e[n] == "undefined" && (e[n] = f[n]);
  Tt("initParams", e);
  var g = false, y;
  try {
    if (g = window.parent != null && window != window.parent, g) {
      window.addEventListener("message", function(q) {
        if (q.source === window.parent) {
          try {
            var j = JSON.parse(q.data);
          } catch (nt) {
            return;
          }
          if (!(!j || !j.eventType))
            if (j.eventType == "set_custom_style")
              q.origin === "https://web.telegram.org" && (y.innerHTML = j.eventData);
            else if (j.eventType == "reload_iframe") {
              try {
                window.parent.postMessage(JSON.stringify({ eventType: "iframe_will_reload" }), "*");
              } catch (nt) {
              }
              location.reload();
            } else
              P(j.eventType, j.eventData);
        }
      }), y = document.createElement("style"), document.head.appendChild(y);
      try {
        window.parent.postMessage(JSON.stringify({ eventType: "iframe_ready", eventData: { reload_supported: true } }), "*");
      } catch (q) {
      }
    }
  } catch (q) {
  }
  function _(q) {
    try {
      return q = q.replace(/\+/g, "%20"), decodeURIComponent(q);
    } catch (j) {
      return q;
    }
  }
  function E(q) {
    q = q.replace(/^#/, "");
    var j = {};
    if (!q.length)
      return j;
    if (q.indexOf("=") < 0 && q.indexOf("?") < 0)
      return j._path = _(q), j;
    var nt = q.indexOf("?");
    if (nt >= 0) {
      var ft = q.substr(0, nt);
      j._path = _(ft), q = q.substr(nt + 1);
    }
    var Q = S(q);
    for (var $t in Q)
      j[$t] = Q[$t];
    return j;
  }
  function S(q) {
    var j = {};
    if (!q.length)
      return j;
    var nt = q.split("&"), ft, Q, $t, x;
    for (ft = 0; ft < nt.length; ft++)
      Q = nt[ft].split("="), $t = _(Q[0]), x = Q[1] == null ? null : _(Q[1]), j[$t] = x;
    return j;
  }
  function I(q, j) {
    var nt = q.indexOf("#");
    if (nt < 0)
      return q + "#" + j;
    var ft = q.substr(nt + 1);
    return ft.indexOf("=") >= 0 || ft.indexOf("?") >= 0 ? q + "&" + j : ft.length > 0 ? q + "?" + j : q + j;
  }
  function F(q, j, nt) {
    if (j || (j = function() {
    }), nt === void 0 && (nt = ""), console.log("[Telegram.WebView] > postEvent", q, nt), window.TelegramWebviewProxy !== void 0)
      TelegramWebviewProxy.postEvent(q, JSON.stringify(nt)), j();
    else if (window.external && "notify" in window.external)
      window.external.notify(JSON.stringify({ eventType: q, eventData: nt })), j();
    else if (g)
      try {
        var ft = "https://web.telegram.org";
        ft = "*", console.log("[Telegram.WebView] > postEvent isIframe postMessage", q, nt), window.parent.postMessage(JSON.stringify({ eventType: q, eventData: nt }), ft), j();
      } catch (Q) {
        console.error("[Telegram.WebView] > postEvent isIframe postMessage failed", Q), j(Q);
      }
    else
      console.log("[Telegram.WebView] > postEvent default fallback", q, nt), j({ notAvailable: true });
  }
  function P(q, j) {
    console.log("[Telegram.WebView] < receiveEvent", q, j), Y(q, function(nt) {
      nt(q, j);
    });
  }
  function Y(q, j) {
    var nt = r3[q];
    if (!(nt === void 0 || !nt.length))
      for (var ft = 0; ft < nt.length; ft++)
        try {
          j(nt[ft]);
        } catch (Q) {
        }
  }
  function K(q, j) {
    r3[q] === void 0 && (r3[q] = []);
    var nt = r3[q].indexOf(j);
    nt === -1 && r3[q].push(j);
  }
  function Z(q, j) {
    if (r3[q] !== void 0) {
      var nt = r3[q].indexOf(j);
      nt !== -1 && r3[q].splice(nt, 1);
    }
  }
  function Tt(q, j) {
    try {
      return window.sessionStorage.setItem("__telegram__" + q, JSON.stringify(j)), true;
    } catch (nt) {
    }
    return false;
  }
  function it(q) {
    try {
      return JSON.parse(window.sessionStorage.getItem("__telegram__" + q));
    } catch (j) {
    }
    return null;
  }
  window.Telegram || (window.Telegram = {}), window.Telegram.WebView = { initParams: e, isIframe: g, onEvent: K, offEvent: Z, postEvent: F, receiveEvent: P, callEventCallbacks: Y }, window.Telegram.Utils = { urlSafeDecode: _, urlParseQueryString: S, urlParseHashParams: E, urlAppendHashParams: I, sessionStorageSet: Tt, sessionStorageGet: it }, window.TelegramGameProxy_receiveEvent = P, window.TelegramGameProxy = { receiveEvent: P };
})();
(function() {
  if (!s0 || typeof Telegram != "undefined" && typeof Telegram.WebApp != "undefined" && typeof Telegram.WebApp.MainButton != "undefined")
    return;
  var r3 = window.Telegram.Utils, t = window.Telegram.WebView, e = t.initParams, f = t.isIframe, n = {}, g = "", y = {}, _ = {}, E = "light", S = "6.2", I = "unknown";
  if (e.tgWebAppData && e.tgWebAppData.length) {
    g = e.tgWebAppData, y = r3.urlParseQueryString(g);
    for (var F in y) {
      var P = y[F];
      try {
        (P.substr(0, 1) == "{" && P.substr(-1) == "}" || P.substr(0, 1) == "[" && P.substr(-1) == "]") && (y[F] = JSON.parse(P));
      } catch (D) {
      }
    }
  }
  if (e.tgWebAppThemeParams && e.tgWebAppThemeParams.length) {
    var Y = e.tgWebAppThemeParams;
    try {
      var K = JSON.parse(Y);
      K && x(K);
    } catch (D) {
    }
  }
  var K = r3.sessionStorageGet("themeParams");
  K && x(K), e.tgWebAppVersion && (S = e.tgWebAppVersion), e.tgWebAppPlatform && (I = e.tgWebAppPlatform);
  var k = window.innerHeight;
  function it(D) {
    k != window.innerHeight && (k = window.innerHeight, nt("viewportChanged", { isStateStable: true }));
  }
  function q(D) {
    if (!(D.metaKey || D.ctrlKey)) {
      for (var N = D.target; N.tagName != "A" && N.parentNode; )
        N = N.parentNode;
      N.tagName == "A" && N.target != "_blank" && (N.protocol == "http:" || N.protocol == "https:") && N.hostname == "t.me" && (n.openTgLink(N.href), D.preventDefault());
    }
  }
  function j(D) {
    return D.toString().replace(/^\s+|\s+$/g, "");
  }
  function nt(D) {
    var N = Array.prototype.slice.call(arguments);
    D = N.shift(), t.callEventCallbacks("webview:" + D, function(U) {
      U.apply(n, N);
    });
  }
  function ft(D, N) {
    t.onEvent("webview:" + D, N);
  }
  function Q(D, N) {
    t.offEvent("webview:" + D, N);
  }
  function $t(D, N) {
    var U = document.documentElement;
    U && U.style && U.style.setProperty && U.style.setProperty("--tg-" + D, N);
  }
  function x(D) {
    D.bg_color == "#1c1c1d" && D.bg_color == D.secondary_bg_color && (D.secondary_bg_color = "#2c2c2e");
    var N;
    for (var U in D)
      (N = de(D[U])) && (_[U] = N, U == "bg_color" && (E = zt(N) ? "dark" : "light", $t("color-scheme", E)), U = "theme-" + U.split("_").join("-"), $t(U, N));
    r3.sessionStorageSet("themeParams", _);
  }
  var o = {};
  function u(D) {
    for (var N = 100; --N; ) {
      for (var U = "", st = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", H = st.length, J = 0; J < D; J++)
        U += st[Math.floor(Math.random() * H)];
      if (!o[U])
        return o[U] = {}, U;
    }
    throw Error("WebAppCallbackIdGenerateFailed");
  }
  var c = false, a = false, s = true;
  function h(D) {
    typeof D != "undefined" && (s = !!D.is_expanded, c = D.height, D.is_state_stable && (a = D.height), nt("viewportChanged", { isStateStable: !!D.is_state_stable }));
    var N, U;
    c !== false ? N = c - fe + "px" : N = fe ? "calc(100vh - " + fe + "px)" : "100vh", a !== false ? U = a - fe + "px" : U = fe ? "calc(100vh - " + fe + "px)" : "100vh", $t("viewport-height", N), $t("viewport-stable-height", U);
  }
  var p = false;
  function l(D) {
    if (!ne("6.2")) {
      console.warn("[Telegram.WebApp] Closing confirmation is not supported in version " + S);
      return;
    }
    p = !!D, t.postEvent("web_app_setup_closing_behavior", false, { need_confirmation: p });
  }
  var i = true;
  function d(D) {
    if (!ne("7.7")) {
      console.warn("[Telegram.WebApp] Changing swipes behavior is not supported in version " + S);
      return;
    }
    i = !!D, t.postEvent("web_app_setup_swipe_behavior", false, { allow_vertical_swipe: i });
  }
  var M = "bg_color", m = null;
  function v() {
    return M == "secondary_bg_color" ? _.secondary_bg_color : M == "bg_color" ? _.bg_color : m;
  }
  function B(D) {
    if (!ne("6.1")) {
      console.warn("[Telegram.WebApp] Header color is not supported in version " + S);
      return;
    }
    ne("6.9") || (_.bg_color && _.bg_color == D ? D = "bg_color" : _.secondary_bg_color && _.secondary_bg_color == D && (D = "secondary_bg_color"));
    var N = null, U = null;
    if (D == "bg_color" || D == "secondary_bg_color")
      U = D;
    else if (ne("6.9") && (N = de(D), !N))
      throw console.error("[Telegram.WebApp] Header color format is invalid", D), Error("WebAppHeaderColorInvalid");
    if (!ne("6.9") && U != "bg_color" && U != "secondary_bg_color")
      throw console.error("[Telegram.WebApp] Header color key should be one of Telegram.WebApp.themeParams.bg_color, Telegram.WebApp.themeParams.secondary_bg_color, 'bg_color', 'secondary_bg_color'", D), Error("WebAppHeaderColorKeyInvalid");
    M = U, m = N, ut();
  }
  var O = null, $ = null;
  function ut() {
    (O != M || $ != m) && (O = M, $ = m, $ ? t.postEvent("web_app_set_header_color", false, { color: m }) : t.postEvent("web_app_set_header_color", false, { color_key: M }));
  }
  var V = "bg_color";
  function ot() {
    return V == "secondary_bg_color" ? _.secondary_bg_color : V == "bg_color" ? _.bg_color : V;
  }
  function le(D) {
    if (!ne("6.1")) {
      console.warn("[Telegram.WebApp] Background color is not supported in version " + S);
      return;
    }
    var N;
    if (D == "bg_color" || D == "secondary_bg_color")
      N = D;
    else if (N = de(D), !N)
      throw console.error("[Telegram.WebApp] Background color format is invalid", D), Error("WebAppBackgroundColorInvalid");
    V = N, pt();
  }
  var St = null;
  function pt() {
    var D = ot();
    St != D && (St = D, t.postEvent("web_app_set_background_color", false, { color: D }));
  }
  function de(D) {
    D += "";
    var N;
    if (N = /^\s*#([0-9a-f]{6})\s*$/i.exec(D))
      return "#" + N[1].toLowerCase();
    if (N = /^\s*#([0-9a-f])([0-9a-f])([0-9a-f])\s*$/i.exec(D))
      return ("#" + N[1] + N[1] + N[2] + N[2] + N[3] + N[3]).toLowerCase();
    if (N = /^\s*rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)\s*$/.exec(D)) {
      var U = parseInt(N[1]), st = parseInt(N[2]), H = parseInt(N[3]);
      return U = (U < 16 ? "0" : "") + U.toString(16), st = (st < 16 ? "0" : "") + st.toString(16), H = (H < 16 ? "0" : "") + H.toString(16), "#" + U + st + H;
    }
    return false;
  }
  function zt(D) {
    D = D.replace(/[\s#]/g, ""), D.length == 3 && (D = D[0] + D[0] + D[1] + D[1] + D[2] + D[2]);
    var N = parseInt(D.substr(0, 2), 16), U = parseInt(D.substr(2, 2), 16), st = parseInt(D.substr(4, 2), 16), H = Math.sqrt(0.299 * (N * N) + 0.587 * (U * U) + 0.114 * (st * st));
    return H < 120;
  }
  function Et(D, N) {
    typeof D != "string" && (D = ""), typeof N != "string" && (N = ""), D = D.replace(/^\s+|\s+$/g, "").split("."), N = N.replace(/^\s+|\s+$/g, "").split(".");
    var U = Math.max(D.length, N.length), st, H, J;
    for (st = 0; st < U; st++)
      if (H = parseInt(D[st]) || 0, J = parseInt(N[st]) || 0, H != J)
        return H > J ? 1 : -1;
    return 0;
  }
  function ne(D) {
    return Et(S, D) >= 0;
  }
  function qt(D) {
    if (window.Blob)
      try {
        return new Blob([D]).size;
      } catch (H) {
      }
    for (var N = D.length, U = D.length - 1; U >= 0; U--) {
      var st = D.charCodeAt(U);
      st > 127 && st <= 2047 ? N++ : st > 2047 && st <= 65535 && (N += 2), st >= 56320 && st <= 57343 && U--;
    }
    return N;
  }
  var _t = function() {
    var D = false, N = {};
    Object.defineProperty(N, "isVisible", { set: function(Zt) {
      tt({ is_visible: Zt });
    }, get: function() {
      return D;
    }, enumerable: true });
    var U = null;
    t.onEvent("back_button_pressed", st);
    function st() {
      nt("backButtonClicked");
    }
    function H() {
      return { is_visible: D };
    }
    function J(Zt) {
      return typeof Zt == "undefined" && (Zt = H()), JSON.stringify(Zt);
    }
    function Ft() {
      return ne("6.1") ? true : (console.warn("[Telegram.WebApp] BackButton is not supported in version " + S), false);
    }
    function ht() {
      var Zt = H(), Ct = J(Zt);
      U !== Ct && (U = Ct, t.postEvent("web_app_setup_back_button", false, Zt));
    }
    function tt(Zt) {
      return Ft() && (typeof Zt.is_visible != "undefined" && (D = !!Zt.is_visible), ht()), N;
    }
    return N.onClick = function(Zt) {
      return Ft() && ft("backButtonClicked", Zt), N;
    }, N.offClick = function(Zt) {
      return Ft() && Q("backButtonClicked", Zt), N;
    }, N.show = function() {
      return tt({ is_visible: true });
    }, N.hide = function() {
      return tt({ is_visible: false });
    }, N;
  }(), fe = 0, Pt = function() {
    var D = false, N = true, U = false, st = "CONTINUE", H = false, J = false, Ft = {};
    Object.defineProperty(Ft, "text", { set: function(A) {
      Ft.setParams({ text: A });
    }, get: function() {
      return st;
    }, enumerable: true }), Object.defineProperty(Ft, "color", { set: function(A) {
      Ft.setParams({ color: A });
    }, get: function() {
      return H || _.button_color || "#2481cc";
    }, enumerable: true }), Object.defineProperty(Ft, "textColor", { set: function(A) {
      Ft.setParams({ text_color: A });
    }, get: function() {
      return J || _.button_text_color || "#ffffff";
    }, enumerable: true }), Object.defineProperty(Ft, "isVisible", { set: function(A) {
      Ft.setParams({ is_visible: A });
    }, get: function() {
      return D;
    }, enumerable: true }), Object.defineProperty(Ft, "isProgressVisible", { get: function() {
      return U;
    }, enumerable: true }), Object.defineProperty(Ft, "isActive", { set: function(A) {
      Ft.setParams({ is_active: A });
    }, get: function() {
      return N;
    }, enumerable: true });
    var ht = null;
    t.onEvent("main_button_pressed", at);
    var tt = null, Zt = {};
    if (e.tgWebAppDebug) {
      tt = document.createElement("tg-main-button"), Zt = { font: "600 14px/18px sans-serif", display: "none", width: "100%", height: "48px", borderRadius: "0", background: "no-repeat right center", position: "fixed", left: "0", right: "0", bottom: "0", margin: "0", padding: "15px 20px", textAlign: "center", boxSizing: "border-box", zIndex: "10000" };
      for (var Ct in Zt)
        tt.style[Ct] = Zt[Ct];
      document.addEventListener("DOMContentLoaded", function A(W) {
        document.removeEventListener("DOMContentLoaded", A), document.body.appendChild(tt), tt.addEventListener("click", at, false);
      });
    }
    function at() {
      N && nt("mainButtonClicked");
    }
    function ce() {
      var A = Ft.color, W = Ft.textColor;
      return D ? { is_visible: true, is_active: N, is_progress_visible: U, text: st, color: A, text_color: W } : { is_visible: false };
    }
    function b(A) {
      return typeof A == "undefined" && (A = ce()), JSON.stringify(A);
    }
    function C() {
      var A = ce(), W = b(A);
      ht !== W && (ht = W, t.postEvent("web_app_setup_main_button", false, A), e.tgWebAppDebug && T(A));
    }
    function T(A) {
      A.is_visible ? (tt.style.display = "block", fe = 48, tt.style.opacity = A.is_active ? "1" : "0.8", tt.style.cursor = A.is_active ? "pointer" : "auto", tt.disabled = !A.is_active, tt.innerText = A.text, tt.style.backgroundImage = A.is_progress_visible ? "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewport%3D%220%200%2048%2048%22%20width%3D%2248px%22%20height%3D%2248px%22%3E%3Ccircle%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222.25%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%20stroke-dashoffset%3D%22106%22%20r%3D%229%22%20stroke-dasharray%3D%2256.52%22%20rotate%3D%22-90%22%3E%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20attributeType%3D%22XML%22%20dur%3D%22360s%22%20from%3D%220%22%20to%3D%2212500%22%20repeatCount%3D%22indefinite%22%3E%3C%2Fanimate%3E%3CanimateTransform%20attributeName%3D%22transform%22%20attributeType%3D%22XML%22%20type%3D%22rotate%22%20dur%3D%221s%22%20from%3D%22-90%2024%2024%22%20to%3D%22630%2024%2024%22%20repeatCount%3D%22indefinite%22%3E%3C%2FanimateTransform%3E%3C%2Fcircle%3E%3C%2Fsvg%3E')" : "none", tt.style.backgroundColor = A.color, tt.style.color = A.text_color) : (tt.style.display = "none", fe = 0), document.documentElement && (document.documentElement.style.boxSizing = "border-box", document.documentElement.style.paddingBottom = fe + "px"), h();
    }
    function w(A) {
      if (typeof A.text != "undefined") {
        var W = j(A.text);
        if (!W.length)
          throw console.error("[Telegram.WebApp] Main button text is required", A.text), Error("WebAppMainButtonParamInvalid");
        if (W.length > 64)
          throw console.error("[Telegram.WebApp] Main button text is too long", W), Error("WebAppMainButtonParamInvalid");
        st = W;
      }
      if (typeof A.color != "undefined")
        if (A.color === false || A.color === null)
          H = false;
        else {
          var R = de(A.color);
          if (!R)
            throw console.error("[Telegram.WebApp] Main button color format is invalid", A.color), Error("WebAppMainButtonParamInvalid");
          H = R;
        }
      if (typeof A.text_color != "undefined")
        if (A.text_color === false || A.text_color === null)
          J = false;
        else {
          var L = de(A.text_color);
          if (!L)
            throw console.error("[Telegram.WebApp] Main button text color format is invalid", A.text_color), Error("WebAppMainButtonParamInvalid");
          J = L;
        }
      if (typeof A.is_visible != "undefined") {
        if (A.is_visible && !Ft.text.length)
          throw console.error("[Telegram.WebApp] Main button text is required"), Error("WebAppMainButtonParamInvalid");
        D = !!A.is_visible;
      }
      return typeof A.is_active != "undefined" && (N = !!A.is_active), C(), Ft;
    }
    return Ft.setText = function(A) {
      return Ft.setParams({ text: A });
    }, Ft.onClick = function(A) {
      return ft("mainButtonClicked", A), Ft;
    }, Ft.offClick = function(A) {
      return Q("mainButtonClicked", A), Ft;
    }, Ft.show = function() {
      return Ft.setParams({ is_visible: true });
    }, Ft.hide = function() {
      return Ft.setParams({ is_visible: false });
    }, Ft.enable = function() {
      return Ft.setParams({ is_active: true });
    }, Ft.disable = function() {
      return Ft.setParams({ is_active: false });
    }, Ft.showProgress = function(A) {
      return N = !!A, U = true, C(), Ft;
    }, Ft.hideProgress = function() {
      return Ft.isActive || (N = true), U = false, C(), Ft;
    }, Ft.setParams = w, Ft;
  }(), bt = function() {
    var D = false, N = {};
    Object.defineProperty(N, "isVisible", { set: function(Zt) {
      tt({ is_visible: Zt });
    }, get: function() {
      return D;
    }, enumerable: true });
    var U = null;
    t.onEvent("settings_button_pressed", st);
    function st() {
      nt("settingsButtonClicked");
    }
    function H() {
      return { is_visible: D };
    }
    function J(Zt) {
      return typeof Zt == "undefined" && (Zt = H()), JSON.stringify(Zt);
    }
    function Ft() {
      return ne("6.10") ? true : (console.warn("[Telegram.WebApp] SettingsButton is not supported in version " + S), false);
    }
    function ht() {
      var Zt = H(), Ct = J(Zt);
      U !== Ct && (U = Ct, t.postEvent("web_app_setup_settings_button", false, Zt));
    }
    function tt(Zt) {
      return Ft() && (typeof Zt.is_visible != "undefined" && (D = !!Zt.is_visible), ht()), N;
    }
    return N.onClick = function(Zt) {
      return Ft() && ft("settingsButtonClicked", Zt), N;
    }, N.offClick = function(Zt) {
      return Ft() && Q("settingsButtonClicked", Zt), N;
    }, N.show = function() {
      return tt({ is_visible: true });
    }, N.hide = function() {
      return tt({ is_visible: false });
    }, N;
  }(), be = function() {
    var D = {};
    function N(U) {
      if (!ne("6.1"))
        return console.warn("[Telegram.WebApp] HapticFeedback is not supported in version " + S), D;
      if (U.type == "impact") {
        if (U.impact_style != "light" && U.impact_style != "medium" && U.impact_style != "heavy" && U.impact_style != "rigid" && U.impact_style != "soft")
          throw console.error("[Telegram.WebApp] Haptic impact style is invalid", U.impact_style), Error("WebAppHapticImpactStyleInvalid");
      } else if (U.type == "notification") {
        if (U.notification_type != "error" && U.notification_type != "success" && U.notification_type != "warning")
          throw console.error("[Telegram.WebApp] Haptic notification type is invalid", U.notification_type), Error("WebAppHapticNotificationTypeInvalid");
      } else if (U.type != "selection_change")
        throw console.error("[Telegram.WebApp] Haptic feedback type is invalid", U.type), Error("WebAppHapticFeedbackTypeInvalid");
      return t.postEvent("web_app_trigger_haptic_feedback", false, U), D;
    }
    return D.impactOccurred = function(U) {
      return N({ type: "impact", impact_style: U });
    }, D.notificationOccurred = function(U) {
      return N({ type: "notification", notification_type: U });
    }, D.selectionChanged = function() {
      return N({ type: "selection_change" });
    }, D;
  }(), kt = function() {
    var D = {};
    function N(U, st, H) {
      if (!ne("6.9"))
        throw console.error("[Telegram.WebApp] CloudStorage is not supported in version " + S), Error("WebAppMethodUnsupported");
      return xt(U, st, H), D;
    }
    return D.setItem = function(U, st, H) {
      return N("saveStorageValue", { key: U, value: st }, H);
    }, D.getItem = function(U, st) {
      return D.getItems([U], st ? function(H, J) {
        H ? st(H) : st(null, J[U]);
      } : null);
    }, D.getItems = function(U, st) {
      return N("getStorageValues", { keys: U }, st);
    }, D.removeItem = function(U, st) {
      return D.removeItems([U], st);
    }, D.removeItems = function(U, st) {
      return N("deleteStorageValues", { keys: U }, st);
    }, D.getKeys = function(U) {
      return N("getStorageKeys", {}, U);
    }, D;
  }(), Mt = function() {
    var D = false, N = false, U = "unknown", st = false, H = false, J = false, Ft = "", ht = {};
    Object.defineProperty(ht, "isInited", { get: function() {
      return D;
    }, enumerable: true }), Object.defineProperty(ht, "isBiometricAvailable", { get: function() {
      return D && N;
    }, enumerable: true }), Object.defineProperty(ht, "biometricType", { get: function() {
      return U || "unknown";
    }, enumerable: true }), Object.defineProperty(ht, "isAccessRequested", { get: function() {
      return st;
    }, enumerable: true }), Object.defineProperty(ht, "isAccessGranted", { get: function() {
      return st && H;
    }, enumerable: true }), Object.defineProperty(ht, "isBiometricTokenSaved", { get: function() {
      return J;
    }, enumerable: true }), Object.defineProperty(ht, "deviceId", { get: function() {
      return Ft || "";
    }, enumerable: true });
    var tt = { callbacks: [] }, Zt = false, Ct = false, at = false;
    t.onEvent("biometry_info_received", ce), t.onEvent("biometry_auth_requested", b), t.onEvent("biometry_token_updated", C);
    function ce(A, W) {
      if (D = true, W.available ? (N = true, U = W.type || "unknown", W.access_requested ? (st = true, H = !!W.access_granted, J = !!W.token_saved) : (st = false, H = false, J = false)) : (N = false, U = "unknown", st = false, H = false, J = false), Ft = W.device_id || "", tt.callbacks.length > 0)
        for (var R = 0; R < tt.callbacks.length; R++) {
          var L = tt.callbacks[R];
          L();
        }
      if (Zt) {
        var lt = Zt;
        Zt = false, lt.callback && lt.callback(H);
      }
      nt("biometricManagerUpdated");
    }
    function b(A, W) {
      var R = W.status == "authorized", L = W.token || "";
      if (Ct) {
        var lt = Ct;
        Ct = false, lt.callback && lt.callback(R, R ? L : null);
      }
      nt("biometricAuthRequested", R ? { isAuthenticated: true, biometricToken: L } : { isAuthenticated: false });
    }
    function C(A, W) {
      var R = false;
      if (N && st && (W.status == "updated" ? (J = true, R = true) : W.status == "removed" && (J = false, R = true)), at) {
        var L = at;
        at = false, L.callback && L.callback(R);
      }
      nt("biometricTokenUpdated", { isUpdated: R });
    }
    function T() {
      return ne("7.2") ? true : (console.warn("[Telegram.WebApp] BiometricManager is not supported in version " + S), false);
    }
    function w() {
      if (!D)
        throw console.error("[Telegram.WebApp] BiometricManager should be inited before using."), Error("WebAppBiometricManagerNotInited");
      return true;
    }
    return ht.init = function(A) {
      return !T() || D || (A && tt.callbacks.push(A), t.postEvent("web_app_biometry_get_info", false)), ht;
    }, ht.requestAccess = function(A, W) {
      if (!T())
        return ht;
      if (w(), !N)
        throw console.error("[Telegram.WebApp] Biometrics is not available on this device."), Error("WebAppBiometricManagerBiometricsNotAvailable");
      if (Zt)
        throw console.error("[Telegram.WebApp] Access is already requested"), Error("WebAppBiometricManagerAccessRequested");
      var R = {};
      if (typeof A.reason != "undefined") {
        var L = j(A.reason);
        if (L.length > 128)
          throw console.error("[Telegram.WebApp] Biometric reason is too long", L), Error("WebAppBiometricRequestAccessParamInvalid");
        L.length > 0 && (R.reason = L);
      }
      return Zt = { callback: W }, t.postEvent("web_app_biometry_request_access", false, R), ht;
    }, ht.authenticate = function(A, W) {
      if (!T())
        return ht;
      if (w(), !N)
        throw console.error("[Telegram.WebApp] Biometrics is not available on this device."), Error("WebAppBiometricManagerBiometricsNotAvailable");
      if (!H)
        throw console.error("[Telegram.WebApp] Biometric access was not granted by the user."), Error("WebAppBiometricManagerBiometricAccessNotGranted");
      if (Ct)
        throw console.error("[Telegram.WebApp] Authentication request is already in progress."), Error("WebAppBiometricManagerAuthenticationRequested");
      var R = {};
      if (typeof A.reason != "undefined") {
        var L = j(A.reason);
        if (L.length > 128)
          throw console.error("[Telegram.WebApp] Biometric reason is too long", L), Error("WebAppBiometricRequestAccessParamInvalid");
        L.length > 0 && (R.reason = L);
      }
      return Ct = { callback: W }, t.postEvent("web_app_biometry_request_auth", false, R), ht;
    }, ht.updateBiometricToken = function(A, W) {
      if (!T())
        return ht;
      if (A = A || "", A.length > 1024)
        throw console.error("[Telegram.WebApp] Token is too long", A), Error("WebAppBiometricManagerTokenInvalid");
      if (w(), !N)
        throw console.error("[Telegram.WebApp] Biometrics is not available on this device."), Error("WebAppBiometricManagerBiometricsNotAvailable");
      if (!H)
        throw console.error("[Telegram.WebApp] Biometric access was not granted by the user."), Error("WebAppBiometricManagerBiometricAccessNotGranted");
      if (at)
        throw console.error("[Telegram.WebApp] Token request is already in progress."), Error("WebAppBiometricManagerTokenUpdateRequested");
      return at = { callback: W }, t.postEvent("web_app_biometry_update_token", false, { token: A }), ht;
    }, ht.openSettings = function() {
      if (!T())
        return ht;
      if (w(), !N)
        throw console.error("[Telegram.WebApp] Biometrics is not available on this device."), Error("WebAppBiometricManagerBiometricsNotAvailable");
      if (!st)
        throw console.error("[Telegram.WebApp] Biometric access was not requested yet."), Error("WebAppBiometricManagerBiometricsAccessNotRequested");
      return H ? (console.warn("[Telegram.WebApp] Biometric access was granted by the user, no need to go to settings."), ht) : (t.postEvent("web_app_biometry_open_settings", false), ht);
    }, ht;
  }(), me = {};
  var wt = false;
  var It = false;
  var yt = false;
  var gt = false;
  function xt(D, N, U) {
    if (!ne("6.9"))
      throw console.error("[Telegram.WebApp] Method invokeCustomMethod is not supported in version " + S), Error("WebAppMethodUnsupported");
    var st = u(16), H = { req_id: st, method: D, params: N || {} };
    o[st] = { callback: U }, t.postEvent("web_app_invoke_custom_method", false, H);
  }
  window.Telegram || (window.Telegram = {}), Object.defineProperty(n, "initData", { get: function() {
    return g;
  }, enumerable: true }), Object.defineProperty(n, "initDataUnsafe", { get: function() {
    return y;
  }, enumerable: true }), Object.defineProperty(n, "version", { get: function() {
    return S;
  }, enumerable: true }), Object.defineProperty(n, "platform", { get: function() {
    return I;
  }, enumerable: true }), Object.defineProperty(n, "colorScheme", { get: function() {
    return E;
  }, enumerable: true }), Object.defineProperty(n, "themeParams", { get: function() {
    return _;
  }, enumerable: true }), Object.defineProperty(n, "isExpanded", { get: function() {
    return s;
  }, enumerable: true }), Object.defineProperty(n, "viewportHeight", { get: function() {
    return (c === false ? window.innerHeight : c) - fe;
  }, enumerable: true }), Object.defineProperty(n, "viewportStableHeight", { get: function() {
    return (a === false ? window.innerHeight : a) - fe;
  }, enumerable: true }), Object.defineProperty(n, "isClosingConfirmationEnabled", { set: function(D) {
    l(D);
  }, get: function() {
    return p;
  }, enumerable: true }), Object.defineProperty(n, "isVerticalSwipesEnabled", { set: function(D) {
    d(D);
  }, get: function() {
    return i;
  }, enumerable: true }), Object.defineProperty(n, "headerColor", { set: function(D) {
    B(D);
  }, get: function() {
    return v();
  }, enumerable: true }), Object.defineProperty(n, "backgroundColor", { set: function(D) {
    le(D);
  }, get: function() {
    return ot();
  }, enumerable: true }), Object.defineProperty(n, "BackButton", { value: _t, enumerable: true }), Object.defineProperty(n, "MainButton", { value: Pt, enumerable: true }), Object.defineProperty(n, "SettingsButton", { value: bt, enumerable: true }), Object.defineProperty(n, "HapticFeedback", { value: be, enumerable: true }), Object.defineProperty(n, "CloudStorage", { value: kt, enumerable: true }), Object.defineProperty(n, "BiometricManager", { value: Mt, enumerable: true }), n.setHeaderColor = function(D) {
    n.headerColor = D;
  }, n.setBackgroundColor = function(D) {
    n.backgroundColor = D;
  }, n.enableClosingConfirmation = function() {
    n.isClosingConfirmationEnabled = true;
  }, n.disableClosingConfirmation = function() {
    n.isClosingConfirmationEnabled = false;
  }, n.enableVerticalSwipes = function() {
    n.isVerticalSwipesEnabled = true;
  }, n.disableVerticalSwipes = function() {
    n.isVerticalSwipesEnabled = false;
  }, n.isVersionAtLeast = function(D) {
    return ne(D);
  }, n.onEvent = function(D, N) {
    ft(D, N);
  }, n.offEvent = function(D, N) {
    Q(D, N);
  }, n.sendData = function(D) {
    if (!D || !D.length)
      throw console.error("[Telegram.WebApp] Data is required", D), Error("WebAppDataInvalid");
    if (qt(D) > 4096)
      throw console.error("[Telegram.WebApp] Data is too long", D), Error("WebAppDataInvalid");
    t.postEvent("web_app_data_send", false, { data: D });
  }, n.switchInlineQuery = function(D, N) {
    if (!ne("6.6"))
      throw console.error("[Telegram.WebApp] Method switchInlineQuery is not supported in version " + S), Error("WebAppMethodUnsupported");
    if (!e.tgWebAppBotInline)
      throw console.error("[Telegram.WebApp] Inline mode is disabled for this bot. Read more about inline mode: https://core.telegram.org/bots/inline"), Error("WebAppInlineModeDisabled");
    if (D = D || "", D.length > 256)
      throw console.error("[Telegram.WebApp] Inline query is too long", D), Error("WebAppInlineQueryInvalid");
    var U = [];
    if (N) {
      if (!Array.isArray(N))
        throw console.error("[Telegram.WebApp] Choose chat types should be an array", N), Error("WebAppInlineChooseChatTypesInvalid");
      for (var st = { users: 1, bots: 1, groups: 1, channels: 1 }, H = 0; H < N.length; H++) {
        var J = N[H];
        if (!st[J])
          throw console.error("[Telegram.WebApp] Choose chat type is invalid", J), Error("WebAppInlineChooseChatTypeInvalid");
        st[J] != 2 && (st[J] = 2, U.push(J));
      }
    }
    t.postEvent("web_app_switch_inline_query", false, { query: D, chat_types: U });
  }, n.openLink = function(st, N) {
    var U = document.createElement("A");
    if (U.href = st, U.protocol != "http:" && U.protocol != "https:")
      throw console.error("[Telegram.WebApp] Url protocol is not supported", st), Error("WebAppTgUrlInvalid");
    var st = U.href;
    if (N = N || {}, ne("6.1")) {
      var H = { url: st };
      ne("6.4") && N.try_instant_view && (H.try_instant_view = true), ne("7.6") && N.try_browser && (H.try_browser = N.try_browser), t.postEvent("web_app_open_link", false, H);
    } else
      window.open(st, "_blank");
  }, n.openTelegramLink = function(D) {
    var N = document.createElement("A");
    if (N.href = D, N.protocol != "http:" && N.protocol != "https:")
      throw console.error("[Telegram.WebApp] Url protocol is not supported", D), Error("WebAppTgUrlInvalid");
    if (N.hostname != "t.me")
      throw console.error("[Telegram.WebApp] Url host is not supported", D), Error("WebAppTgUrlInvalid");
    var U = N.pathname + N.search;
    f || ne("6.1") ? t.postEvent("web_app_open_tg_link", false, { path_full: U }) : location.href = "https://t.me" + U;
  }, n.openInvoice = function(D, N) {
    var U = document.createElement("A"), st, H;
    if (U.href = D, U.protocol != "http:" && U.protocol != "https:" || U.hostname != "t.me" || !(st = U.pathname.match(/^\/(\$|invoice\/)([A-Za-z0-9\-_=]+)$/)) || !(H = st[2]))
      throw console.error("[Telegram.WebApp] Invoice url is invalid", D), Error("WebAppInvoiceUrlInvalid");
    if (!ne("6.1"))
      throw console.error("[Telegram.WebApp] Method openInvoice is not supported in version " + S), Error("WebAppMethodUnsupported");
    if (me[H])
      throw console.error("[Telegram.WebApp] Invoice is already opened"), Error("WebAppInvoiceOpened");
    me[H] = { url: D, callback: N }, t.postEvent("web_app_open_invoice", false, { slug: H });
  }, n.showPopup = function(D, N) {
    if (!ne("6.2"))
      throw console.error("[Telegram.WebApp] Method showPopup is not supported in version " + S), Error("WebAppMethodUnsupported");
    if (wt)
      throw console.error("[Telegram.WebApp] Popup is already opened"), Error("WebAppPopupOpened");
    var U = "", st = "", H = [], Ft = {};
    if (typeof D.title != "undefined") {
      if (U = j(D.title), U.length > 64)
        throw console.error("[Telegram.WebApp] Popup title is too long", U), Error("WebAppPopupParamInvalid");
      U.length > 0 && (Ft.title = U);
    }
    if (typeof D.message != "undefined" && (st = j(D.message)), !st.length)
      throw console.error("[Telegram.WebApp] Popup message is required", D.message), Error("WebAppPopupParamInvalid");
    if (st.length > 256)
      throw console.error("[Telegram.WebApp] Popup message is too long", st), Error("WebAppPopupParamInvalid");
    if (Ft.message = st, typeof D.buttons != "undefined") {
      if (!Array.isArray(D.buttons))
        throw console.error("[Telegram.WebApp] Popup buttons should be an array", D.buttons), Error("WebAppPopupParamInvalid");
      for (var ht = 0; ht < D.buttons.length; ht++) {
        var tt = D.buttons[ht], Zt = {}, Ct = "";
        if (typeof tt.id != "undefined" && (Ct = tt.id.toString(), Ct.length > 64))
          throw console.error("[Telegram.WebApp] Popup button id is too long", Ct), Error("WebAppPopupParamInvalid");
        Zt.id = Ct;
        var at = tt.type;
        if (typeof at == "undefined" && (at = "default"), Zt.type = at, !(at == "ok" || at == "close" || at == "cancel"))
          if (at == "default" || at == "destructive") {
            var ce = "";
            if (typeof tt.text != "undefined" && (ce = j(tt.text)), !ce.length)
              throw console.error("[Telegram.WebApp] Popup button text is required for type " + at, tt.text), Error("WebAppPopupParamInvalid");
            if (ce.length > 64)
              throw console.error("[Telegram.WebApp] Popup button text is too long", ce), Error("WebAppPopupParamInvalid");
            Zt.text = ce;
          } else
            throw console.error("[Telegram.WebApp] Popup button type is invalid", at), Error("WebAppPopupParamInvalid");
        H.push(Zt);
      }
    } else
      H.push({ id: "", type: "close" });
    if (H.length < 1)
      throw console.error("[Telegram.WebApp] Popup should have at least one button"), Error("WebAppPopupParamInvalid");
    if (H.length > 3)
      throw console.error("[Telegram.WebApp] Popup should not have more than 3 buttons"), Error("WebAppPopupParamInvalid");
    Ft.buttons = H, wt = { callback: N }, t.postEvent("web_app_open_popup", false, Ft);
  }, n.showAlert = function(D, N) {
    n.showPopup({ message: D }, N ? function() {
      N();
    } : null);
  }, n.showConfirm = function(D, N) {
    n.showPopup({ message: D, buttons: [{ type: "ok", id: "ok" }, { type: "cancel" }] }, N ? function(U) {
      N(U == "ok");
    } : null);
  }, n.showScanQrPopup = function(D, N) {
    if (!ne("6.4"))
      throw console.error("[Telegram.WebApp] Method showScanQrPopup is not supported in version " + S), Error("WebAppMethodUnsupported");
    if (It)
      throw console.error("[Telegram.WebApp] Popup is already opened"), Error("WebAppScanQrPopupOpened");
    var U = "", st = {};
    if (typeof D.text != "undefined") {
      if (U = j(D.text), U.length > 64)
        throw console.error("[Telegram.WebApp] Scan QR popup text is too long", U), Error("WebAppScanQrPopupParamInvalid");
      U.length > 0 && (st.text = U);
    }
    It = { callback: N }, t.postEvent("web_app_open_scan_qr_popup", false, st);
  }, n.closeScanQrPopup = function() {
    if (!ne("6.4"))
      throw console.error("[Telegram.WebApp] Method closeScanQrPopup is not supported in version " + S), Error("WebAppMethodUnsupported");
    It = false, t.postEvent("web_app_close_scan_qr_popup", false);
  }, n.readTextFromClipboard = function(D) {
    if (!ne("6.4"))
      throw console.error("[Telegram.WebApp] Method readTextFromClipboard is not supported in version " + S), Error("WebAppMethodUnsupported");
    var N = u(16), U = { req_id: N };
    o[N] = { callback: D }, t.postEvent("web_app_read_text_from_clipboard", false, U);
  }, n.requestWriteAccess = function(D) {
    if (!ne("6.9"))
      throw console.error("[Telegram.WebApp] Method requestWriteAccess is not supported in version " + S), Error("WebAppMethodUnsupported");
    if (yt)
      throw console.error("[Telegram.WebApp] Write access is already requested"), Error("WebAppWriteAccessRequested");
    yt = { callback: D }, t.postEvent("web_app_request_write_access");
  }, n.requestContact = function(D) {
    if (!ne("6.9"))
      throw console.error("[Telegram.WebApp] Method requestContact is not supported in version " + S), Error("WebAppMethodUnsupported");
    if (gt)
      throw console.error("[Telegram.WebApp] Contact is already requested"), Error("WebAppContactRequested");
    gt = { callback: D }, t.postEvent("web_app_request_phone");
  }, n.shareToStory = function(D, N) {
    if (N = N || {}, !ne("7.8"))
      throw console.error("[Telegram.WebApp] Method shareToStory is not supported in version " + S), Error("WebAppMethodUnsupported");
    var U = document.createElement("A");
    if (U.href = D, U.protocol != "http:" && U.protocol != "https:")
      throw console.error("[Telegram.WebApp] Media url protocol is not supported", url), Error("WebAppMediaUrlInvalid");
    var st = {};
    if (st.media_url = U.href, typeof N.text != "undefined") {
      var H = j(N.text);
      if (H.length > 2048)
        throw console.error("[Telegram.WebApp] Text is too long", H), Error("WebAppShareToStoryParamInvalid");
      H.length > 0 && (st.text = H);
    }
    if (typeof N.widget_link != "undefined") {
      if (N.widget_link = N.widget_link || {}, U.href = N.widget_link.url, U.protocol != "http:" && U.protocol != "https:")
        throw console.error("[Telegram.WebApp] Link protocol is not supported", url), Error("WebAppShareToStoryParamInvalid");
      var J = { url: U.href };
      if (typeof N.widget_link.name != "undefined") {
        var Ft = j(N.widget_link.name);
        if (Ft.length > 48)
          throw console.error("[Telegram.WebApp] Link name is too long", Ft), Error("WebAppShareToStoryParamInvalid");
        Ft.length > 0 && (J.name = Ft);
      }
      st.widget_link = J;
    }
    t.postEvent("web_app_share_to_story", false, st);
  }, n.invokeCustomMethod = function(D, N, U) {
    xt(D, N, U);
  }, n.ready = function() {
    t.postEvent("web_app_ready");
  }, n.expand = function() {
    t.postEvent("web_app_expand");
  }, n.close = function(D) {
    D = D || {};
    var N = {};
    ne("7.6") && D.return_back && (N.return_back = true), t.postEvent("web_app_close", false, N);
  }, window.Telegram.WebApp = n, ut(), pt(), h(), e.tgWebAppShowSettings && bt.show(), window.addEventListener("resize", it), f && document.addEventListener("click", q);
})();
var oh = Ue(Kf());
var bs = Ue(Xn());
(0, bs.debug)("uxuy:tmapi:debug");
(0, bs.debug)("uxuy:tmapi:error");
function eo() {
  if (typeof window != "undefined")
    return window;
}
var Nr = {};
try {
  let r3 = location.hash.toString();
  Nr = sp(r3);
} catch (r3) {
}
var Qn = "unknown", Gf;
Nr != null && Nr.tgWebAppPlatform && (Qn = (Gf = Nr.tgWebAppPlatform) != null ? Gf : "unknown");
var Jf, Xf, Qf;
if (Qn === "unknown") {
  let r3 = eo();
  Qn = (Qf = (Xf = (Jf = r3 == null ? void 0 : r3.Telegram) == null ? void 0 : Jf.WebApp) == null ? void 0 : Xf.platform) != null ? Qf : "unknown";
}
var Ms = "6.0";
Nr != null && Nr.tgWebAppVersion && (Ms = Nr.tgWebAppVersion);
var th, eh, rh;
if (!Ms) {
  let r3 = eo();
  Ms = (rh = (eh = (th = r3 == null ? void 0 : r3.Telegram) == null ? void 0 : th.WebApp) == null ? void 0 : eh.version) != null ? rh : "6.0";
}
function ih() {
  var r3;
  return Qn !== "unknown" || !!((r3 = eo()) != null && r3.TelegramWebviewProxy);
}
function sp(r3) {
  r3 = r3.replace(/^#/, "");
  let t = {};
  if (!r3.length)
    return t;
  if (r3.indexOf("=") < 0 && r3.indexOf("?") < 0)
    return t._path = to(r3), t;
  let e = r3.indexOf("?");
  if (e >= 0) {
    let n = r3.substr(0, e);
    t._path = to(n), r3 = r3.substr(e + 1);
  }
  let f = ap(r3);
  for (let n in f)
    t[n] = f[n];
  return t;
}
function to(r3) {
  try {
    return r3 = r3.replace(/\+/g, "%20"), decodeURIComponent(r3);
  } catch (t) {
    return r3;
  }
}
function ap(r3) {
  let t = {};
  if (!r3.length)
    return t;
  let e = r3.split("&"), f, n, g, y;
  for (f = 0; f < e.length; f++)
    n = e[f].split("="), g = to(n[0]), y = n[1] == null ? null : to(n[1]), t[g] = y;
  return t;
}
function nh() {
  let r3 = eo();
  if (!r3)
    return false;
  let t = r3.navigator.userAgent;
  return /Android/i.test(t) && /Mobile/i.test(t);
}
var ke = { isTelegram: function() {
  var t, e;
  return !!window.TelegramWebviewProxy || !!((e = (t = window.Telegram) == null ? void 0 : t.WebApp) != null && e.initData);
}, decodeTelegramUrlParameters: function(t, e = true) {
  let f = t.replaceAll("--", "%").replaceAll("__", "=").replaceAll("-", "&").replaceAll("%5F", "_").replaceAll("%2D", "-").replaceAll("%2E", ".");
  return e ? oh.default.parse(f) : f;
}, stringify: function(t) {
  let e = new URLSearchParams();
  function f(n, g) {
    if (Array.isArray(g))
      g.forEach((y, _) => {
        /\[\]$/.test(n) ? e.append(n, y) : f(`${n}[${typeof y == "object" ? _ : ""}]`, y);
      });
    else if (typeof g == "object")
      for (let y in g)
        f(`${n}[${y}]`, g[y]);
    else
      e.append(n, g);
  }
  for (let n in t)
    f(n, t[n]);
  return e.toString();
}, encodeTelegramUrlParameters: function(t, e = true) {
  return e && (t = ke.stringify(t)), t.replaceAll(".", "%2E").replaceAll("-", "%2D").replaceAll("_", "%5F").replaceAll("&", "-").replaceAll("=", "__").replaceAll("%", "--");
}, openAndroidLink: (() => {
  (/* @__PURE__ */ new Date()).getTime();
  return document.addEventListener("click", function() {
    (/* @__PURE__ */ new Date()).getTime();
  }, false), function(f) {
    location.href = f;
  };
})(), opendeepLink: function(t, { domain: e = "UXUYbot", appname: f = "app" }) {
  var n = `tg://resolve?domain=${e}&appname=${f}&startapp=${t}`, g = document.body, y = document.createElement("iframe");
  y.id = "uxuy_tg_iframe", y.style.visibility = "hidden", y.style.position = "fixed", y.style.bottom = "0", y.style.left = "0", y.style.width = "0px", y.style.height = "0px", y.style.border = "none", g.appendChild(y);
  var _ = false;
  window.addEventListener("visibilitychange", function() {
    _ = document.hidden || document.webkitHidden || document.mozHidden || document.msHidden;
  }, false), window.addEventListener("pagehide", function() {
    _ = true;
  }, false), window.addEventListener("blur", function() {
    _ = true;
  }, false), y !== null && (y.src = n), setTimeout(function() {
    var E;
    _ || (window.location = n), (E = g == null ? void 0 : g.removeChild) == null || E.call(g, y);
  }, 2e3);
} };
var fp = (r3) => new Promise((t) => setTimeout(t, r3)), hp = { retries: 3, delay: 60 };
async function sh(r3, t = hp) {
  let e, f = t.retries;
  for (let n = 0; n <= f; n++) {
    try {
      return await r3();
    } catch (g) {
      e = g;
    }
    await fp(Math.pow(n + 1, t.delay));
  }
  throw new Error(`All retries failed. Last error: ${e}`, e);
}
function ro(r3 = 0) {
  return r3 = isNaN(Number(r3)) ? 1 : Number(r3), "0x" + r3.toString(16);
}
var wr = function() {
  var r3 = "__is_uxuy_app__", t = window == null ? void 0 : window.sessionStorage;
  try {
    if (!t)
      return false;
    if (t.getItem(r3))
      return true;
    var e = window.location.hash.toString(), f = new URLSearchParams(e);
    return !!f.get("isUxuy");
  } catch (n) {
    return false;
  }
};
function ah(r3) {
  return r3 ? Array.prototype.map.call(r3, (t) => ("00" + t.toString(16)).slice(-2)).join("") : "";
}
var fh = (r3) => new Uint8Array(r3.match(/.{1,2}/g).map((t) => parseInt(t, 16)));
function io() {
  var r3, t;
  return ih() || ((t = (r3 = window == null ? void 0 : window.Telegram) == null ? void 0 : r3.WebApp) == null ? void 0 : t.initData) || (window == null ? void 0 : window.TelegramWebviewProxy);
}
var hh = "0.1.5";
var up = (r3 = "square") => "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkY3NDAwIi8+CjxwYXRoIGQ9Ik0zMDAuMDcgMzY2LjI0SDcyNC4zNjJDNzYzLjE5IDM2Ni4yNCA3OTQuNjY3IDM5Ny43MTcgNzk0LjY2NyA0MzYuNTQ1VjcxMS43NjhDNzk0LjY2NyA3NTAuNTk3IDc2My4xOSA3ODIuMDczIDcyNC4zNjIgNzgyLjA3M0gzMDAuMDcxQzI2MS4yNDMgNzgyLjA3MyAyMjkuNzY2IDc1MC41OTcgMjI5Ljc2NiA3MTEuNzY4VjQzNi41NDNDMjI5Ljc2NiAzOTcuNzE2IDI2MS4yNDIgMzY2LjI0IDMwMC4wNyAzNjYuMjRaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI5LjUzMjg4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjQyLjk3MSAyNzcuNjA5TDMwOS41MDkgMzE3LjE3MUMyODIuMjc0IDMyMC40MDIgMjYxLjA1NiAzNDIuMzIyIDI1OC43MTMgMzY5LjY0OEwyNTguMzI3IDM3NC4xNTVWMzkwLjkzNkg2OTYuMDI5TDY3NC4zNzYgMjk5LjU2QzY3MS4wMDQgMjg1LjMyNyA2NTcuNDk1IDI3NS44ODYgNjQyLjk3MSAyNzcuNjA5Wk03MDYuNjU3IDI5MS45MUM2OTkuMzk4IDI2MS4yNzggNjcwLjMyNCAyNDAuOTU2IDYzOS4wNjMgMjQ0LjY2NUwzMDUuNjAxIDI4NC4yMjdDMjYyLjczOCAyODkuMzEyIDIyOS4zNDYgMzIzLjgxIDIyNS42NiAzNjYuODE1TDIyNS4xNTIgMzcyLjczNlY0NDYuMzY1TDI3MC4yNjYgNDIyLjU5SDczNy42MjNMNzA2LjY1NyAyOTEuOTFaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNTIzLjA5MiA3MjEuMzU0SDU4My4yNjNDNTk2LjA2NyA3MjEuMzU0IDYwMi45NzkgNzA2LjMzOSA1OTQuNjUyIDY5Ni42MTJMNTAyLjI3NCA1ODguNjk2QzUwMS41IDU4Ny43OTIgNTAxLjUwMyA1ODYuNDU3IDUwMi4yODIgNTg1LjU1N0w2MjUuNzI3IDQ0Mi43NEM2MzQuMTIzIDQzMy4wMjggNjI3LjIyMyA0MTcuOTQ0IDYxNC4zODUgNDE3Ljk0NEg1NTQuMzE0QzU0OS45NTUgNDE3Ljk0NCA1NDUuODEyIDQxOS44NDEgNTQyLjk2NCA0MjMuMTRMNDA5Ljc2OSA1NzcuNDYzQzQwNC45MjcgNTgzLjA3MyA0MDQuOTExIDU5MS4zOCA0MDkuNzMgNTk3LjAwOUw1MTEuNzA0IDcxNi4xMTJDNTE0LjU1MiA3MTkuNDM5IDUxOC43MTMgNzIxLjM1NCA1MjMuMDkyIDcyMS4zNTRaIiBmaWxsPSIjRkY3NDAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEyLjU4NSIvPgo8cGF0aCBkPSJNMzIyLjMzOSA3MjEuMzU2SDM4Mi40NjNDMzg2LjgzIDcyMS4zNTYgMzkwLjk4MSA3MTkuNDUxIDM5My44MjkgNzE2LjE0TDQ5Ni4zOTggNTk2Ljg5NUM1MDEuMjMzIDU5MS4yNzQgNTAxLjIzMyA1ODIuOTYzIDQ5Ni4zOTkgNTc3LjM0MkwzOTMuODI5IDQ1OC4wODRDMzkwLjk4MSA0NTQuNzcyIDM4Ni44MyA0NTIuODY4IDM4Mi40NjIgNDUyLjg2OEgzMjIuMzM4QzMwOS41MTggNDUyLjg2OCAzMDIuNjEyIDQ2Ny45MTYgMzEwLjk3MiA0NzcuNjM2TDQwMy43ODMgNTg1LjU0OEM0MDQuNTU5IDU4Ni40NTEgNDA0LjU1OSA1ODcuNzg1IDQwMy43ODMgNTg4LjY4OEwzMTAuOTczIDY5Ni41ODdDMzAyLjYxMyA3MDYuMzA3IDMwOS41MTggNzIxLjM1NiAzMjIuMzM5IDcyMS4zNTZaIiBmaWxsPSIjRkY3NDAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEyLjU4NSIvPgo8cGF0aCBkPSJNNzMxLjYyNyA0ODdDNjg2LjgzNSA0ODcgNjUwLjUyMyA1MjMuMzExIDY1MC41MjMgNTY4LjEwM0M2NTAuNTIzIDYxMi44OTUgNjg2LjgzNSA2NDkuMjA3IDczMS42MjcgNjQ5LjIwN0g4MDguMDAyQzgzNS4yMTcgNjQ5LjIwNyA4NTcuMjc5IDYyNy4xNDUgODU3LjI3OSA1OTkuOTNWNTM2LjI3N0M4NTcuMjc5IDUwOS4wNjIgODM1LjIxNyA0ODcgODA4LjAwMiA0ODdINzMxLjYyN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNODA4LjAwMiA1MTguMjc5SDczMS42MjdDNzA0LjExIDUxOC4yNzkgNjgxLjgwMiA1NDAuNTg2IDY4MS44MDIgNTY4LjEwM0M2ODEuODAyIDU5NS42MiA3MDQuMTEgNjE3LjkyOCA3MzEuNjI3IDYxNy45MjhIODA4LjAwMkM4MTcuOTQyIDYxNy45MjggODI2IDYwOS44NyA4MjYgNTk5LjkzVjUzNi4yNzdDODI2IDUyNi4zMzcgODE3Ljk0MiA1MTguMjc5IDgwOC4wMDIgNTE4LjI3OVpNNzMxLjYyNyA0ODdDNjg2LjgzNSA0ODcgNjUwLjUyMyA1MjMuMzExIDY1MC41MjMgNTY4LjEwM0M2NTAuNTIzIDYxMi44OTUgNjg2LjgzNSA2NDkuMjA3IDczMS42MjcgNjQ5LjIwN0g4MDguMDAyQzgzNS4yMTcgNjQ5LjIwNyA4NTcuMjc5IDYyNy4xNDUgODU3LjI3OSA1OTkuOTNWNTM2LjI3N0M4NTcuMjc5IDUwOS4wNjIgODM1LjIxNyA0ODcgODA4LjAwMiA0ODdINzMxLjYyN1oiIGZpbGw9IiNGRjc0MDAiLz4KPGNpcmNsZSBjeD0iNzM1LjEyNSIgY3k9IjU2OC45MDUiIHI9IjI1LjkwNDciIGZpbGw9IiNGRjc0MDAiLz4KPC9zdmc+Cg==", ar = { id: "uxuy", version: hh, name: "UXUY Wallet", homepage: "https://uxuy.com", logo: up(), description: "The first Self-Custody Multi-Chain Wallet based on Telegram, crafted by the @uxuycom team 🧑‍🤝‍🧑", downloadLinks: { android: "https://download.uxuy.com/v0.1/uxuy-release.apk", googlePlay: "https://play.google.com/store/apps/details?id=com.uxuySdk.wallet", ios: "https://uxuy.com/download", appleStore: "https://uxuy.com/download", testflight: "https://uxuy.com/download", telegram: "https://t.me/UXUYbot/app", browserExtension: { chrome: "", edge: "" } }, deepLinks: { scheme: "uxuy://", universallink: "https://", direct_link: "https://t.me/UXUYbot/app" } }, Kr = { bridge: "https://bridge.uxrelay.com", connect: "https://connector.uxrelay.com", connect_direct_link: "https://t.me/UXUYbot/app" };
var Bi = ((_) => (_.LIGHTNING = "lightning", _.TRON = "tron", _.EVM = "evm", _.TON = "ton", _.SOL = "sol", _.COSMOS = "cosmos", _.SUI = "sui", _))(Bi || {}), sn = ((ft) => (ft.ALL = "all", ft.ETH = "eth", ft.Ethereum = "ethereum", ft.BNBCHAIN = "bnbchain", ft.BASE = "base", ft.ZKLINK = "zklink", ft.POLYGON = "polygon", ft.ZKSYNC = "zksync", ft.FANTOM = "fantom", ft.AVALANCHEC = "avalanchec", ft.ARBITRUM = "arbitrumone", ft.OPTIMISM = "optimism", ft.LINEA = "linea", ft.CORE = "core", ft.OPBNB = "opbnb", ft.PLATON = "platon", ft.BITLAYER = "bitlayer", ft.LIGHTNING = "lightning", ft.TRON = "tron", ft.TON = "ton", ft.SOLANA = "solana", ft.SUI = "sui", ft))(sn || {}), lh = ((e) => (e.DEFAULT = "default_", e.CUSTOM_EVM = "evm_", e))(lh || {}), As = ((j) => (j[j.ALL = -1] = "ALL", j[j.BNBCHAIN = 56] = "BNBCHAIN", j[j.LIGHTNING = 2652501241] = "LIGHTNING", j[j.BASE = 8453] = "BASE", j[j.ZKLINK = 810180] = "ZKLINK", j[j.POLYGON = 137] = "POLYGON", j[j.ARB = 42161] = "ARB", j[j.AVALANCHEC = 43114] = "AVALANCHEC", j[j.ETH = 1] = "ETH", j[j.FANTOM = 250] = "FANTOM", j[j.OPTIMISM = 10] = "OPTIMISM", j[j.LINEA = 59144] = "LINEA", j[j.ZKSYNC = 324] = "ZKSYNC", j[j.CORE = 1116] = "CORE", j[j.BITLAYER = 200901] = "BITLAYER", j[j.MOONCHAIN = 1868] = "MOONCHAIN", j[j.TRON = 728126428] = "TRON", j[j.TON = 239] = "TON", j[j.SOLANA = 6000001] = "SOLANA", j[j.SUI = -1e6] = "SUI", j))(As || {});
function no() {
  return (r3) => r3;
}
var yv = no(), wv = no(), xv = no();
function Mv(r3) {
  return Math.floor(r3);
}
var bv = no();
var an = ((g) => (g.DAPP_CONNECT_ACCOUNTS = "DAPP_CONNECT_ACCOUNTS", g.DAPP_SIGN_MESSAGE = "DAPP_SIGN_MESSAGE", g.DAPP_SIGN_TRANSACTION = "DAPP_SIGN_TRANSACTION", g.DAPP_SIGN_SEND_TRANSACTION = "DAPP_SIGN_SEND_TRANSACTION", g.DAPP_EXT_METHOD = "DAPP_EXT_METHOD", g))(an || {});
var oo = { evm: "ethereum#initialized", tron: "tronLink#initialized", ton: "tonready", sol: "solana#initialized" };
function fn(r3, t) {
  return function() {
    return r3.apply(t, arguments);
  };
}
var { toString: cp } = Object.prototype, { getPrototypeOf: Cs } = Object, ao = ((r3) => (t) => {
  let e = cp.call(t);
  return r3[e] || (r3[e] = e.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), cr = (r3) => (r3 = r3.toLowerCase(), (t) => ao(t) === r3), fo = (r3) => (t) => typeof t === r3, { isArray: Si } = Array, hn = fo("undefined");
function dp(r3) {
  return r3 !== null && !hn(r3) && r3.constructor !== null && !hn(r3.constructor) && fr(r3.constructor.isBuffer) && r3.constructor.isBuffer(r3);
}
var dh = cr("ArrayBuffer");
function pp(r3) {
  let t;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? t = ArrayBuffer.isView(r3) : t = r3 && r3.buffer && dh(r3.buffer), t;
}
var mp = fo("string"), fr = fo("function"), ph = fo("number"), ho = (r3) => r3 !== null && typeof r3 == "object", gp = (r3) => r3 === true || r3 === false, so = (r3) => {
  if (ao(r3) !== "object")
    return false;
  let t = Cs(r3);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in r3) && !(Symbol.iterator in r3);
}, vp = cr("Date"), yp = cr("File"), wp = cr("Blob"), xp = cr("FileList"), Mp = (r3) => ho(r3) && fr(r3.pipe), bp = (r3) => {
  let t;
  return r3 && (typeof FormData == "function" && r3 instanceof FormData || fr(r3.append) && ((t = ao(r3)) === "formdata" || t === "object" && fr(r3.toString) && r3.toString() === "[object FormData]"));
}, Ap = cr("URLSearchParams"), [_p, Ep, Cp, Bp] = ["ReadableStream", "Request", "Response", "Headers"].map(cr), Sp = (r3) => r3.trim ? r3.trim() : r3.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ln(r3, t, { allOwnKeys: e = false } = {}) {
  if (r3 === null || typeof r3 == "undefined")
    return;
  let f, n;
  if (typeof r3 != "object" && (r3 = [r3]), Si(r3))
    for (f = 0, n = r3.length; f < n; f++)
      t.call(null, r3[f], f, r3);
  else {
    let g = e ? Object.getOwnPropertyNames(r3) : Object.keys(r3), y = g.length, _;
    for (f = 0; f < y; f++)
      _ = g[f], t.call(null, r3[_], _, r3);
  }
}
function mh(r3, t) {
  t = t.toLowerCase();
  let e = Object.keys(r3), f = e.length, n;
  for (; f-- > 0; )
    if (n = e[f], t === n.toLowerCase())
      return n;
  return null;
}
var fi = (() => typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global)(), gh = (r3) => !hn(r3) && r3 !== fi;
function Es() {
  let { caseless: r3 } = gh(this) && this || {}, t = {}, e = (f, n) => {
    let g = r3 && mh(t, n) || n;
    so(t[g]) && so(f) ? t[g] = Es(t[g], f) : so(f) ? t[g] = Es({}, f) : Si(f) ? t[g] = f.slice() : t[g] = f;
  };
  for (let f = 0, n = arguments.length; f < n; f++)
    arguments[f] && ln(arguments[f], e);
  return t;
}
var Tp = (r3, t, e, { allOwnKeys: f } = {}) => (ln(t, (n, g) => {
  e && fr(n) ? r3[g] = fn(n, e) : r3[g] = n;
}, { allOwnKeys: f }), r3), Fp = (r3) => (r3.charCodeAt(0) === 65279 && (r3 = r3.slice(1)), r3), Ip = (r3, t, e, f) => {
  r3.prototype = Object.create(t.prototype, f), r3.prototype.constructor = r3, Object.defineProperty(r3, "super", { value: t.prototype }), e && Object.assign(r3.prototype, e);
}, Np = (r3, t, e, f) => {
  let n, g, y, _ = {};
  if (t = t || {}, r3 == null)
    return t;
  do {
    for (n = Object.getOwnPropertyNames(r3), g = n.length; g-- > 0; )
      y = n[g], (!f || f(y, r3, t)) && !_[y] && (t[y] = r3[y], _[y] = true);
    r3 = e !== false && Cs(r3);
  } while (r3 && (!e || e(r3, t)) && r3 !== Object.prototype);
  return t;
}, Up = (r3, t, e) => {
  r3 = String(r3), (e === void 0 || e > r3.length) && (e = r3.length), e -= t.length;
  let f = r3.indexOf(t, e);
  return f !== -1 && f === e;
}, Rp = (r3) => {
  if (!r3)
    return null;
  if (Si(r3))
    return r3;
  let t = r3.length;
  if (!ph(t))
    return null;
  let e = new Array(t);
  for (; t-- > 0; )
    e[t] = r3[t];
  return e;
}, Pp = ((r3) => (t) => r3 && t instanceof r3)(typeof Uint8Array != "undefined" && Cs(Uint8Array)), Dp = (r3, t) => {
  let f = (r3 && r3[Symbol.iterator]).call(r3), n;
  for (; (n = f.next()) && !n.done; ) {
    let g = n.value;
    t.call(r3, g[0], g[1]);
  }
}, Op = (r3, t) => {
  let e, f = [];
  for (; (e = r3.exec(t)) !== null; )
    f.push(e);
  return f;
}, kp = cr("HTMLFormElement"), Lp = (r3) => r3.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e, f, n) {
  return f.toUpperCase() + n;
}), uh = (({ hasOwnProperty: r3 }) => (t, e) => r3.call(t, e))(Object.prototype), qp = cr("RegExp"), vh = (r3, t) => {
  let e = Object.getOwnPropertyDescriptors(r3), f = {};
  ln(e, (n, g) => {
    let y;
    (y = t(n, g, r3)) !== false && (f[g] = y || n);
  }), Object.defineProperties(r3, f);
}, Wp = (r3) => {
  vh(r3, (t, e) => {
    if (fr(r3) && ["arguments", "caller", "callee"].indexOf(e) !== -1)
      return false;
    let f = r3[e];
    if (fr(f)) {
      if (t.enumerable = false, "writable" in t) {
        t.writable = false;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + e + "'");
      });
    }
  });
}, zp = (r3, t) => {
  let e = {}, f = (n) => {
    n.forEach((g) => {
      e[g] = true;
    });
  };
  return Si(r3) ? f(r3) : f(String(r3).split(t)), e;
}, jp = () => {
}, $p = (r3, t) => r3 != null && Number.isFinite(r3 = +r3) ? r3 : t, _s = "abcdefghijklmnopqrstuvwxyz", ch = "0123456789", yh = { DIGIT: ch, ALPHA: _s, ALPHA_DIGIT: _s + _s.toUpperCase() + ch }, Kp = (r3 = 16, t = yh.ALPHA_DIGIT) => {
  let e = "", { length: f } = t;
  for (; r3--; )
    e += t[Math.random() * f | 0];
  return e;
};
function Yp(r3) {
  return !!(r3 && fr(r3.append) && r3[Symbol.toStringTag] === "FormData" && r3[Symbol.iterator]);
}
var Hp = (r3) => {
  let t = new Array(10), e = (f, n) => {
    if (ho(f)) {
      if (t.indexOf(f) >= 0)
        return;
      if (!("toJSON" in f)) {
        t[n] = f;
        let g = Si(f) ? [] : {};
        return ln(f, (y, _) => {
          let E = e(y, n + 1);
          !hn(E) && (g[_] = E);
        }), t[n] = void 0, g;
      }
    }
    return f;
  };
  return e(r3, 0);
}, Zp = cr("AsyncFunction"), Vp = (r3) => r3 && (ho(r3) || fr(r3)) && fr(r3.then) && fr(r3.catch), wh = ((r3, t) => r3 ? setImmediate : t ? ((e, f) => (fi.addEventListener("message", ({ source: n, data: g }) => {
  n === fi && g === e && f.length && f.shift()();
}, false), (n) => {
  f.push(n), fi.postMessage(e, "*");
}))(`axios@${Math.random()}`, []) : (e) => setTimeout(e))(typeof setImmediate == "function", fr(fi.postMessage)), Gp = typeof queueMicrotask != "undefined" ? queueMicrotask.bind(fi) : typeof process != "undefined" && process.nextTick || wh, X = { isArray: Si, isArrayBuffer: dh, isBuffer: dp, isFormData: bp, isArrayBufferView: pp, isString: mp, isNumber: ph, isBoolean: gp, isObject: ho, isPlainObject: so, isReadableStream: _p, isRequest: Ep, isResponse: Cp, isHeaders: Bp, isUndefined: hn, isDate: vp, isFile: yp, isBlob: wp, isRegExp: qp, isFunction: fr, isStream: Mp, isURLSearchParams: Ap, isTypedArray: Pp, isFileList: xp, forEach: ln, merge: Es, extend: Tp, trim: Sp, stripBOM: Fp, inherits: Ip, toFlatObject: Np, kindOf: ao, kindOfTest: cr, endsWith: Up, toArray: Rp, forEachEntry: Dp, matchAll: Op, isHTMLForm: kp, hasOwnProperty: uh, hasOwnProp: uh, reduceDescriptors: vh, freezeMethods: Wp, toObjectSet: zp, toCamelCase: Lp, noop: jp, toFiniteNumber: $p, findKey: mh, global: fi, isContextDefined: gh, ALPHABET: yh, generateString: Kp, isSpecCompliantForm: Yp, toJSONObject: Hp, isAsyncFn: Zp, isThenable: Vp, setImmediate: wh, asap: Gp };
function Ti(r3, t, e, f, n) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = r3, this.name = "AxiosError", t && (this.code = t), e && (this.config = e), f && (this.request = f), n && (this.response = n);
}
X.inherits(Ti, Error, { toJSON: function() {
  return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: X.toJSONObject(this.config), code: this.code, status: this.response && this.response.status ? this.response.status : null };
} });
var xh = Ti.prototype, Mh = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((r3) => {
  Mh[r3] = { value: r3 };
});
Object.defineProperties(Ti, Mh);
Object.defineProperty(xh, "isAxiosError", { value: true });
Ti.from = (r3, t, e, f, n, g) => {
  let y = Object.create(xh);
  return X.toFlatObject(r3, y, function(E) {
    return E !== Error.prototype;
  }, (_) => _ !== "isAxiosError"), Ti.call(y, r3.message, t, e, f, n), y.cause = r3, y.name = r3.name, g && Object.assign(y, g), y;
};
var ue = Ti;
var lo = null;
function Bs(r3) {
  return X.isPlainObject(r3) || X.isArray(r3);
}
function Ah(r3) {
  return X.endsWith(r3, "[]") ? r3.slice(0, -2) : r3;
}
function bh(r3, t, e) {
  return r3 ? r3.concat(t).map(function(n, g) {
    return n = Ah(n), !e && g ? "[" + n + "]" : n;
  }).join(e ? "." : "") : t;
}
function Jp(r3) {
  return X.isArray(r3) && !r3.some(Bs);
}
var Xp = X.toFlatObject(X, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Qp(r3, t, e) {
  if (!X.isObject(r3))
    throw new TypeError("target must be an object");
  t = t || new FormData(), e = X.toFlatObject(e, { metaTokens: true, dots: false, indexes: false }, false, function(Z, k) {
    return !X.isUndefined(k[Z]);
  });
  let f = e.metaTokens, n = e.visitor || I, g = e.dots, y = e.indexes, E = (e.Blob || typeof Blob != "undefined" && Blob) && X.isSpecCompliantForm(t);
  if (!X.isFunction(n))
    throw new TypeError("visitor must be a function");
  function S(K) {
    if (K === null)
      return "";
    if (X.isDate(K))
      return K.toISOString();
    if (!E && X.isBlob(K))
      throw new ue("Blob is not supported. Use a Buffer instead.");
    return X.isArrayBuffer(K) || X.isTypedArray(K) ? E && typeof Blob == "function" ? new Blob([K]) : Buffer.from(K) : K;
  }
  function I(K, Z, k) {
    let Tt = K;
    if (K && !k && typeof K == "object") {
      if (X.endsWith(Z, "{}"))
        Z = f ? Z : Z.slice(0, -2), K = JSON.stringify(K);
      else if (X.isArray(K) && Jp(K) || (X.isFileList(K) || X.endsWith(Z, "[]")) && (Tt = X.toArray(K)))
        return Z = Ah(Z), Tt.forEach(function(q, j) {
          !(X.isUndefined(q) || q === null) && t.append(y === true ? bh([Z], j, g) : y === null ? Z : Z + "[]", S(q));
        }), false;
    }
    return Bs(K) ? true : (t.append(bh(k, Z, g), S(K)), false);
  }
  let F = [], P = Object.assign(Xp, { defaultVisitor: I, convertValue: S, isVisitable: Bs });
  function Y(K, Z) {
    if (!X.isUndefined(K)) {
      if (F.indexOf(K) !== -1)
        throw Error("Circular reference detected in " + Z.join("."));
      F.push(K), X.forEach(K, function(Tt, it) {
        (!(X.isUndefined(Tt) || Tt === null) && n.call(t, Tt, X.isString(it) ? it.trim() : it, Z, P)) === true && Y(Tt, Z ? Z.concat(it) : [it]);
      }), F.pop();
    }
  }
  if (!X.isObject(r3))
    throw new TypeError("data must be an object");
  return Y(r3), t;
}
var Yr = Qp;
function _h(r3) {
  let t = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
  return encodeURIComponent(r3).replace(/[!'()~]|%20|%00/g, function(f) {
    return t[f];
  });
}
function Eh(r3, t) {
  this._pairs = [], r3 && Yr(r3, this, t);
}
var Ch = Eh.prototype;
Ch.append = function(t, e) {
  this._pairs.push([t, e]);
};
Ch.toString = function(t) {
  let e = t ? function(f) {
    return t.call(this, f, _h);
  } : _h;
  return this._pairs.map(function(n) {
    return e(n[0]) + "=" + e(n[1]);
  }, "").join("&");
};
var uo = Eh;
function tm(r3) {
  return encodeURIComponent(r3).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function un(r3, t, e) {
  if (!t)
    return r3;
  let f = e && e.encode || tm, n = e && e.serialize, g;
  if (n ? g = n(t, e) : g = X.isURLSearchParams(t) ? t.toString() : new uo(t, e).toString(f), g) {
    let y = r3.indexOf("#");
    y !== -1 && (r3 = r3.slice(0, y)), r3 += (r3.indexOf("?") === -1 ? "?" : "&") + g;
  }
  return r3;
}
var Ss = class {
  constructor() {
    this.handlers = [];
  }
  use(t, e, f) {
    return this.handlers.push({ fulfilled: t, rejected: e, synchronous: f ? f.synchronous : false, runWhen: f ? f.runWhen : null }), this.handlers.length - 1;
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    X.forEach(this.handlers, function(f) {
      f !== null && t(f);
    });
  }
}, Ts = Ss;
var co = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false };
var Bh = typeof URLSearchParams != "undefined" ? URLSearchParams : uo;
var Sh = typeof FormData != "undefined" ? FormData : null;
var Th = typeof Blob != "undefined" ? Blob : null;
var Fh = { isBrowser: true, classes: { URLSearchParams: Bh, FormData: Sh, Blob: Th }, protocols: ["http", "https", "file", "blob", "url", "data"] };
var Is = {};
e0(Is, { hasBrowserEnv: () => Fs, hasStandardBrowserEnv: () => em, hasStandardBrowserWebWorkerEnv: () => rm, origin: () => im });
var Fs = typeof window != "undefined" && typeof document != "undefined", em = ((r3) => Fs && ["ReactNative", "NativeScript", "NS"].indexOf(r3) < 0)(typeof navigator != "undefined" && navigator.product), rm = (() => typeof WorkerGlobalScope != "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), im = Fs && window.location.href || "http://localhost";
var He = { ...Is, ...Fh };
function Ns(r3, t) {
  return Yr(r3, new He.classes.URLSearchParams(), Object.assign({ visitor: function(e, f, n, g) {
    return He.isNode && X.isBuffer(e) ? (this.append(f, e.toString("base64")), false) : g.defaultVisitor.apply(this, arguments);
  } }, t));
}
function nm(r3) {
  return X.matchAll(/\w+|\[(\w*)]/g, r3).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function om(r3) {
  let t = {}, e = Object.keys(r3), f, n = e.length, g;
  for (f = 0; f < n; f++)
    g = e[f], t[g] = r3[g];
  return t;
}
function sm(r3) {
  function t(e, f, n, g) {
    let y = e[g++];
    if (y === "__proto__")
      return true;
    let _ = Number.isFinite(+y), E = g >= e.length;
    return y = !y && X.isArray(n) ? n.length : y, E ? (X.hasOwnProp(n, y) ? n[y] = [n[y], f] : n[y] = f, !_) : ((!n[y] || !X.isObject(n[y])) && (n[y] = []), t(e, f, n[y], g) && X.isArray(n[y]) && (n[y] = om(n[y])), !_);
  }
  if (X.isFormData(r3) && X.isFunction(r3.entries)) {
    let e = {};
    return X.forEachEntry(r3, (f, n) => {
      t(nm(f), n, e, 0);
    }), e;
  }
  return null;
}
var po = sm;
function am(r3, t, e) {
  if (X.isString(r3))
    try {
      return (t || JSON.parse)(r3), X.trim(r3);
    } catch (f) {
      if (f.name !== "SyntaxError")
        throw f;
    }
  return (e || JSON.stringify)(r3);
}
var Us = { transitional: co, adapter: ["xhr", "http", "fetch"], transformRequest: [function(t, e) {
  let f = e.getContentType() || "", n = f.indexOf("application/json") > -1, g = X.isObject(t);
  if (g && X.isHTMLForm(t) && (t = new FormData(t)), X.isFormData(t))
    return n ? JSON.stringify(po(t)) : t;
  if (X.isArrayBuffer(t) || X.isBuffer(t) || X.isStream(t) || X.isFile(t) || X.isBlob(t) || X.isReadableStream(t))
    return t;
  if (X.isArrayBufferView(t))
    return t.buffer;
  if (X.isURLSearchParams(t))
    return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), t.toString();
  let _;
  if (g) {
    if (f.indexOf("application/x-www-form-urlencoded") > -1)
      return Ns(t, this.formSerializer).toString();
    if ((_ = X.isFileList(t)) || f.indexOf("multipart/form-data") > -1) {
      let E = this.env && this.env.FormData;
      return Yr(_ ? { "files[]": t } : t, E && new E(), this.formSerializer);
    }
  }
  return g || n ? (e.setContentType("application/json", false), am(t)) : t;
}], transformResponse: [function(t) {
  let e = this.transitional || Us.transitional, f = e && e.forcedJSONParsing, n = this.responseType === "json";
  if (X.isResponse(t) || X.isReadableStream(t))
    return t;
  if (t && X.isString(t) && (f && !this.responseType || n)) {
    let y = !(e && e.silentJSONParsing) && n;
    try {
      return JSON.parse(t);
    } catch (_) {
      if (y)
        throw _.name === "SyntaxError" ? ue.from(_, ue.ERR_BAD_RESPONSE, this, null, this.response) : _;
    }
  }
  return t;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: He.classes.FormData, Blob: He.classes.Blob }, validateStatus: function(t) {
  return t >= 200 && t < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
X.forEach(["delete", "get", "head", "post", "put", "patch"], (r3) => {
  Us.headers[r3] = {};
});
var Fi = Us;
var fm = X.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), Ih = (r3) => {
  let t = {}, e, f, n;
  return r3 && r3.split(`
`).forEach(function(y) {
    n = y.indexOf(":"), e = y.substring(0, n).trim().toLowerCase(), f = y.substring(n + 1).trim(), !(!e || t[e] && fm[e]) && (e === "set-cookie" ? t[e] ? t[e].push(f) : t[e] = [f] : t[e] = t[e] ? t[e] + ", " + f : f);
  }), t;
};
var Nh = Symbol("internals");
function cn(r3) {
  return r3 && String(r3).trim().toLowerCase();
}
function mo(r3) {
  return r3 === false || r3 == null ? r3 : X.isArray(r3) ? r3.map(mo) : String(r3);
}
function hm(r3) {
  let t = /* @__PURE__ */ Object.create(null), e = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g, f;
  for (; f = e.exec(r3); )
    t[f[1]] = f[2];
  return t;
}
var lm = (r3) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r3.trim());
function Rs(r3, t, e, f, n) {
  if (X.isFunction(f))
    return f.call(this, t, e);
  if (n && (t = e), !!X.isString(t)) {
    if (X.isString(f))
      return t.indexOf(f) !== -1;
    if (X.isRegExp(f))
      return f.test(t);
  }
}
function um(r3) {
  return r3.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, e, f) => e.toUpperCase() + f);
}
function cm(r3, t) {
  let e = X.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((f) => {
    Object.defineProperty(r3, f + e, { value: function(n, g, y) {
      return this[f].call(this, t, n, g, y);
    }, configurable: true });
  });
}
var Ii = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, e, f) {
    let n = this;
    function g(_, E, S) {
      let I = cn(E);
      if (!I)
        throw new Error("header name must be a non-empty string");
      let F = X.findKey(n, I);
      (!F || n[F] === void 0 || S === true || S === void 0 && n[F] !== false) && (n[F || E] = mo(_));
    }
    let y = (_, E) => X.forEach(_, (S, I) => g(S, I, E));
    if (X.isPlainObject(t) || t instanceof this.constructor)
      y(t, e);
    else if (X.isString(t) && (t = t.trim()) && !lm(t))
      y(Ih(t), e);
    else if (X.isHeaders(t))
      for (let [_, E] of t.entries())
        g(E, _, f);
    else
      t != null && g(e, t, f);
    return this;
  }
  get(t, e) {
    if (t = cn(t), t) {
      let f = X.findKey(this, t);
      if (f) {
        let n = this[f];
        if (!e)
          return n;
        if (e === true)
          return hm(n);
        if (X.isFunction(e))
          return e.call(this, n, f);
        if (X.isRegExp(e))
          return e.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, e) {
    if (t = cn(t), t) {
      let f = X.findKey(this, t);
      return !!(f && this[f] !== void 0 && (!e || Rs(this, this[f], f, e)));
    }
    return false;
  }
  delete(t, e) {
    let f = this, n = false;
    function g(y) {
      if (y = cn(y), y) {
        let _ = X.findKey(f, y);
        _ && (!e || Rs(f, f[_], _, e)) && (delete f[_], n = true);
      }
    }
    return X.isArray(t) ? t.forEach(g) : g(t), n;
  }
  clear(t) {
    let e = Object.keys(this), f = e.length, n = false;
    for (; f--; ) {
      let g = e[f];
      (!t || Rs(this, this[g], g, t, true)) && (delete this[g], n = true);
    }
    return n;
  }
  normalize(t) {
    let e = this, f = {};
    return X.forEach(this, (n, g) => {
      let y = X.findKey(f, g);
      if (y) {
        e[y] = mo(n), delete e[g];
        return;
      }
      let _ = t ? um(g) : String(g).trim();
      _ !== g && delete e[g], e[_] = mo(n), f[_] = true;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    let e = /* @__PURE__ */ Object.create(null);
    return X.forEach(this, (f, n) => {
      f != null && f !== false && (e[n] = t && X.isArray(f) ? f.join(", ") : f);
    }), e;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, e]) => t + ": " + e).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...e) {
    let f = new this(t);
    return e.forEach((n) => f.set(n)), f;
  }
  static accessor(t) {
    let f = (this[Nh] = this[Nh] = { accessors: {} }).accessors, n = this.prototype;
    function g(y) {
      let _ = cn(y);
      f[_] || (cm(n, y), f[_] = true);
    }
    return X.isArray(t) ? t.forEach(g) : g(t), this;
  }
};
Ii.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
X.reduceDescriptors(Ii.prototype, ({ value: r3 }, t) => {
  let e = t[0].toUpperCase() + t.slice(1);
  return { get: () => r3, set(f) {
    this[e] = f;
  } };
});
X.freezeMethods(Ii);
var $e = Ii;
function dn(r3, t) {
  let e = this || Fi, f = t || e, n = $e.from(f.headers), g = f.data;
  return X.forEach(r3, function(_) {
    g = _.call(e, g, n.normalize(), t ? t.status : void 0);
  }), n.normalize(), g;
}
function pn(r3) {
  return !!(r3 && r3.__CANCEL__);
}
function Uh(r3, t, e) {
  ue.call(this, r3 == null ? "canceled" : r3, ue.ERR_CANCELED, t, e), this.name = "CanceledError";
}
X.inherits(Uh, ue, { __CANCEL__: true });
var xr = Uh;
function mn(r3, t, e) {
  let f = e.config.validateStatus;
  !e.status || !f || f(e.status) ? r3(e) : t(new ue("Request failed with status code " + e.status, [ue.ERR_BAD_REQUEST, ue.ERR_BAD_RESPONSE][Math.floor(e.status / 100) - 4], e.config, e.request, e));
}
function Ps(r3) {
  let t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(r3);
  return t && t[1] || "";
}
function dm(r3, t) {
  r3 = r3 || 10;
  let e = new Array(r3), f = new Array(r3), n = 0, g = 0, y;
  return t = t !== void 0 ? t : 1e3, function(E) {
    let S = Date.now(), I = f[g];
    y || (y = S), e[n] = E, f[n] = S;
    let F = g, P = 0;
    for (; F !== n; )
      P += e[F++], F = F % r3;
    if (n = (n + 1) % r3, n === g && (g = (g + 1) % r3), S - y < t)
      return;
    let Y = I && S - I;
    return Y ? Math.round(P * 1e3 / Y) : void 0;
  };
}
var Rh = dm;
function pm(r3, t) {
  let e = 0, f = 1e3 / t, n, g, y = (S, I = Date.now()) => {
    e = I, n = null, g && (clearTimeout(g), g = null), r3.apply(null, S);
  };
  return [(...S) => {
    let I = Date.now(), F = I - e;
    F >= f ? y(S, I) : (n = S, g || (g = setTimeout(() => {
      g = null, y(n);
    }, f - F)));
  }, () => n && y(n)];
}
var Ph = pm;
var Ni = (r3, t, e = 3) => {
  let f = 0, n = Rh(50, 250);
  return Ph((g) => {
    let y = g.loaded, _ = g.lengthComputable ? g.total : void 0, E = y - f, S = n(E), I = y <= _;
    f = y;
    let F = { loaded: y, total: _, progress: _ ? y / _ : void 0, bytes: E, rate: S || void 0, estimated: S && _ && I ? (_ - y) / S : void 0, event: g, lengthComputable: _ != null, [t ? "download" : "upload"]: true };
    r3(F);
  }, e);
}, Ds = (r3, t) => {
  let e = r3 != null;
  return [(f) => t[0]({ lengthComputable: e, total: r3, loaded: f }), t[1]];
}, Os = (r3) => (...t) => X.asap(() => r3(...t));
var Dh = He.hasStandardBrowserEnv ? function() {
  let t = /(msie|trident)/i.test(navigator.userAgent), e = document.createElement("a"), f;
  function n(g) {
    let y = g;
    return t && (e.setAttribute("href", y), y = e.href), e.setAttribute("href", y), { href: e.href, protocol: e.protocol ? e.protocol.replace(/:$/, "") : "", host: e.host, search: e.search ? e.search.replace(/^\?/, "") : "", hash: e.hash ? e.hash.replace(/^#/, "") : "", hostname: e.hostname, port: e.port, pathname: e.pathname.charAt(0) === "/" ? e.pathname : "/" + e.pathname };
  }
  return f = n(window.location.href), function(y) {
    let _ = X.isString(y) ? n(y) : y;
    return _.protocol === f.protocol && _.host === f.host;
  };
}() : function() {
  return function() {
    return true;
  };
}();
var Oh = He.hasStandardBrowserEnv ? { write(r3, t, e, f, n, g) {
  let y = [r3 + "=" + encodeURIComponent(t)];
  X.isNumber(e) && y.push("expires=" + new Date(e).toGMTString()), X.isString(f) && y.push("path=" + f), X.isString(n) && y.push("domain=" + n), g === true && y.push("secure"), document.cookie = y.join("; ");
}, read(r3) {
  let t = document.cookie.match(new RegExp("(^|;\\s*)(" + r3 + ")=([^;]*)"));
  return t ? decodeURIComponent(t[3]) : null;
}, remove(r3) {
  this.write(r3, "", Date.now() - 864e5);
} } : { write() {
}, read() {
  return null;
}, remove() {
} };
function ks(r3) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r3);
}
function Ls(r3, t) {
  return t ? r3.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : r3;
}
function gn(r3, t) {
  return r3 && !ks(t) ? Ls(r3, t) : t;
}
var kh = (r3) => r3 instanceof $e ? { ...r3 } : r3;
function dr(r3, t) {
  t = t || {};
  let e = {};
  function f(S, I, F) {
    return X.isPlainObject(S) && X.isPlainObject(I) ? X.merge.call({ caseless: F }, S, I) : X.isPlainObject(I) ? X.merge({}, I) : X.isArray(I) ? I.slice() : I;
  }
  function n(S, I, F) {
    if (X.isUndefined(I)) {
      if (!X.isUndefined(S))
        return f(void 0, S, F);
    } else
      return f(S, I, F);
  }
  function g(S, I) {
    if (!X.isUndefined(I))
      return f(void 0, I);
  }
  function y(S, I) {
    if (X.isUndefined(I)) {
      if (!X.isUndefined(S))
        return f(void 0, S);
    } else
      return f(void 0, I);
  }
  function _(S, I, F) {
    if (F in t)
      return f(S, I);
    if (F in r3)
      return f(void 0, S);
  }
  let E = { url: g, method: g, data: g, baseURL: y, transformRequest: y, transformResponse: y, paramsSerializer: y, timeout: y, timeoutMessage: y, withCredentials: y, withXSRFToken: y, adapter: y, responseType: y, xsrfCookieName: y, xsrfHeaderName: y, onUploadProgress: y, onDownloadProgress: y, decompress: y, maxContentLength: y, maxBodyLength: y, beforeRedirect: y, transport: y, httpAgent: y, httpsAgent: y, cancelToken: y, socketPath: y, responseEncoding: y, validateStatus: _, headers: (S, I) => n(kh(S), kh(I), true) };
  return X.forEach(Object.keys(Object.assign({}, r3, t)), function(I) {
    let F = E[I] || n, P = F(r3[I], t[I], I);
    X.isUndefined(P) && F !== _ || (e[I] = P);
  }), e;
}
var go = (r3) => {
  let t = dr({}, r3), { data: e, withXSRFToken: f, xsrfHeaderName: n, xsrfCookieName: g, headers: y, auth: _ } = t;
  t.headers = y = $e.from(y), t.url = un(gn(t.baseURL, t.url), r3.params, r3.paramsSerializer), _ && y.set("Authorization", "Basic " + btoa((_.username || "") + ":" + (_.password ? unescape(encodeURIComponent(_.password)) : "")));
  let E;
  if (X.isFormData(e)) {
    if (He.hasStandardBrowserEnv || He.hasStandardBrowserWebWorkerEnv)
      y.setContentType(void 0);
    else if ((E = y.getContentType()) !== false) {
      let [S, ...I] = E ? E.split(";").map((F) => F.trim()).filter(Boolean) : [];
      y.setContentType([S || "multipart/form-data", ...I].join("; "));
    }
  }
  if (He.hasStandardBrowserEnv && (f && X.isFunction(f) && (f = f(t)), f || f !== false && Dh(t.url))) {
    let S = n && g && Oh.read(g);
    S && y.set(n, S);
  }
  return t;
};
var mm = typeof XMLHttpRequest != "undefined", Lh = mm && function(r3) {
  return new Promise(function(e, f) {
    let n = go(r3), g = n.data, y = $e.from(n.headers).normalize(), { responseType: _, onUploadProgress: E, onDownloadProgress: S } = n, I, F, P, Y, K;
    function Z() {
      Y && Y(), K && K(), n.cancelToken && n.cancelToken.unsubscribe(I), n.signal && n.signal.removeEventListener("abort", I);
    }
    let k = new XMLHttpRequest();
    k.open(n.method.toUpperCase(), n.url, true), k.timeout = n.timeout;
    function Tt() {
      if (!k)
        return;
      let q = $e.from("getAllResponseHeaders" in k && k.getAllResponseHeaders()), nt = { data: !_ || _ === "text" || _ === "json" ? k.responseText : k.response, status: k.status, statusText: k.statusText, headers: q, config: r3, request: k };
      mn(function(Q) {
        e(Q), Z();
      }, function(Q) {
        f(Q), Z();
      }, nt), k = null;
    }
    "onloadend" in k ? k.onloadend = Tt : k.onreadystatechange = function() {
      !k || k.readyState !== 4 || k.status === 0 && !(k.responseURL && k.responseURL.indexOf("file:") === 0) || setTimeout(Tt);
    }, k.onabort = function() {
      k && (f(new ue("Request aborted", ue.ECONNABORTED, r3, k)), k = null);
    }, k.onerror = function() {
      f(new ue("Network Error", ue.ERR_NETWORK, r3, k)), k = null;
    }, k.ontimeout = function() {
      let j = n.timeout ? "timeout of " + n.timeout + "ms exceeded" : "timeout exceeded", nt = n.transitional || co;
      n.timeoutErrorMessage && (j = n.timeoutErrorMessage), f(new ue(j, nt.clarifyTimeoutError ? ue.ETIMEDOUT : ue.ECONNABORTED, r3, k)), k = null;
    }, g === void 0 && y.setContentType(null), "setRequestHeader" in k && X.forEach(y.toJSON(), function(j, nt) {
      k.setRequestHeader(nt, j);
    }), X.isUndefined(n.withCredentials) || (k.withCredentials = !!n.withCredentials), _ && _ !== "json" && (k.responseType = n.responseType), S && ([P, K] = Ni(S, true), k.addEventListener("progress", P)), E && k.upload && ([F, Y] = Ni(E), k.upload.addEventListener("progress", F), k.upload.addEventListener("loadend", Y)), (n.cancelToken || n.signal) && (I = (q) => {
      k && (f(!q || q.type ? new xr(null, r3, k) : q), k.abort(), k = null);
    }, n.cancelToken && n.cancelToken.subscribe(I), n.signal && (n.signal.aborted ? I() : n.signal.addEventListener("abort", I)));
    let it = Ps(n.url);
    if (it && He.protocols.indexOf(it) === -1) {
      f(new ue("Unsupported protocol " + it + ":", ue.ERR_BAD_REQUEST, r3));
      return;
    }
    k.send(g || null);
  });
};
var gm = (r3, t) => {
  let e = new AbortController(), f, n = function(E) {
    if (!f) {
      f = true, y();
      let S = E instanceof Error ? E : this.reason;
      e.abort(S instanceof ue ? S : new xr(S instanceof Error ? S.message : S));
    }
  }, g = t && setTimeout(() => {
    n(new ue(`timeout ${t} of ms exceeded`, ue.ETIMEDOUT));
  }, t), y = () => {
    r3 && (g && clearTimeout(g), g = null, r3.forEach((E) => {
      E && (E.removeEventListener ? E.removeEventListener("abort", n) : E.unsubscribe(n));
    }), r3 = null);
  };
  r3.forEach((E) => E && E.addEventListener && E.addEventListener("abort", n));
  let { signal: _ } = e;
  return _.unsubscribe = y, [_, () => {
    g && clearTimeout(g), g = null;
  }];
}, qh = gm;
var vm = function* (r3, t) {
  let e = r3.byteLength;
  if (!t || e < t) {
    yield r3;
    return;
  }
  let f = 0, n;
  for (; f < e; )
    n = f + t, yield r3.slice(f, n), f = n;
}, ym = async function* (r3, t, e) {
  for await (let f of r3)
    yield* vm(ArrayBuffer.isView(f) ? f : await e(String(f)), t);
}, qs = (r3, t, e, f, n) => {
  let g = ym(r3, t, n), y = 0, _, E = (S) => {
    _ || (_ = true, f && f(S));
  };
  return new ReadableStream({ async pull(S) {
    try {
      let { done: I, value: F } = await g.next();
      if (I) {
        E(), S.close();
        return;
      }
      let P = F.byteLength;
      if (e) {
        let Y = y += P;
        e(Y);
      }
      S.enqueue(new Uint8Array(F));
    } catch (I) {
      throw E(I), I;
    }
  }, cancel(S) {
    return E(S), g.return();
  } }, { highWaterMark: 2 });
};
var yo = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", zh = yo && typeof ReadableStream == "function", Ws = yo && (typeof TextEncoder == "function" ? ((r3) => (t) => r3.encode(t))(new TextEncoder()) : async (r3) => new Uint8Array(await new Response(r3).arrayBuffer())), jh = (r3, ...t) => {
  try {
    return !!r3(...t);
  } catch (e) {
    return false;
  }
}, wm = zh && jh(() => {
  let r3 = false, t = new Request(He.origin, { body: new ReadableStream(), method: "POST", get duplex() {
    return r3 = true, "half";
  } }).headers.has("Content-Type");
  return r3 && !t;
}), Wh = 64 * 1024, zs = zh && jh(() => X.isReadableStream(new Response("").body)), vo = { stream: zs && ((r3) => r3.body) };
yo && ((r3) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !vo[t] && (vo[t] = X.isFunction(r3[t]) ? (e) => e[t]() : (e, f) => {
      throw new ue(`Response type '${t}' is not supported`, ue.ERR_NOT_SUPPORT, f);
    });
  });
})(new Response());
var xm = async (r3) => {
  if (r3 == null)
    return 0;
  if (X.isBlob(r3))
    return r3.size;
  if (X.isSpecCompliantForm(r3))
    return (await new Request(r3).arrayBuffer()).byteLength;
  if (X.isArrayBufferView(r3) || X.isArrayBuffer(r3))
    return r3.byteLength;
  if (X.isURLSearchParams(r3) && (r3 = r3 + ""), X.isString(r3))
    return (await Ws(r3)).byteLength;
}, Mm = async (r3, t) => {
  let e = X.toFiniteNumber(r3.getContentLength());
  return e == null ? xm(t) : e;
}, $h = yo && (async (r3) => {
  let { url: t, method: e, data: f, signal: n, cancelToken: g, timeout: y, onDownloadProgress: _, onUploadProgress: E, responseType: S, headers: I, withCredentials: F = "same-origin", fetchOptions: P } = go(r3);
  S = S ? (S + "").toLowerCase() : "text";
  let [Y, K] = n || g || y ? qh([n, g], y) : [], Z, k, Tt = () => {
    !Z && setTimeout(() => {
      Y && Y.unsubscribe();
    }), Z = true;
  }, it;
  try {
    if (E && wm && e !== "get" && e !== "head" && (it = await Mm(I, f)) !== 0) {
      let ft = new Request(t, { method: "POST", body: f, duplex: "half" }), Q;
      if (X.isFormData(f) && (Q = ft.headers.get("content-type")) && I.setContentType(Q), ft.body) {
        let [$t, x] = Ds(it, Ni(Os(E)));
        f = qs(ft.body, Wh, $t, x, Ws);
      }
    }
    X.isString(F) || (F = F ? "include" : "omit"), k = new Request(t, { ...P, signal: Y, method: e.toUpperCase(), headers: I.normalize().toJSON(), body: f, duplex: "half", credentials: F });
    let q = await fetch(k), j = zs && (S === "stream" || S === "response");
    if (zs && (_ || j)) {
      let ft = {};
      ["status", "statusText", "headers"].forEach((o) => {
        ft[o] = q[o];
      });
      let Q = X.toFiniteNumber(q.headers.get("content-length")), [$t, x] = _ && Ds(Q, Ni(Os(_), true)) || [];
      q = new Response(qs(q.body, Wh, $t, () => {
        x && x(), j && Tt();
      }, Ws), ft);
    }
    S = S || "text";
    let nt = await vo[X.findKey(vo, S) || "text"](q, r3);
    return !j && Tt(), K && K(), await new Promise((ft, Q) => {
      mn(ft, Q, { data: nt, headers: $e.from(q.headers), status: q.status, statusText: q.statusText, config: r3, request: k });
    });
  } catch (q) {
    throw Tt(), q && q.name === "TypeError" && /fetch/i.test(q.message) ? Object.assign(new ue("Network Error", ue.ERR_NETWORK, r3, k), { cause: q.cause || q }) : ue.from(q, q && q.code, r3, k);
  }
});
var js = { http: lo, xhr: Lh, fetch: $h };
X.forEach(js, (r3, t) => {
  if (r3) {
    try {
      Object.defineProperty(r3, "name", { value: t });
    } catch (e) {
    }
    Object.defineProperty(r3, "adapterName", { value: t });
  }
});
var Kh = (r3) => `- ${r3}`, bm = (r3) => X.isFunction(r3) || r3 === null || r3 === false, wo = { getAdapter: (r3) => {
  r3 = X.isArray(r3) ? r3 : [r3];
  let { length: t } = r3, e, f, n = {};
  for (let g = 0; g < t; g++) {
    e = r3[g];
    let y;
    if (f = e, !bm(e) && (f = js[(y = String(e)).toLowerCase()], f === void 0))
      throw new ue(`Unknown adapter '${y}'`);
    if (f)
      break;
    n[y || "#" + g] = f;
  }
  if (!f) {
    let g = Object.entries(n).map(([_, E]) => `adapter ${_} ` + (E === false ? "is not supported by the environment" : "is not available in the build")), y = t ? g.length > 1 ? `since :
` + g.map(Kh).join(`
`) : " " + Kh(g[0]) : "as no adapter specified";
    throw new ue("There is no suitable adapter to dispatch the request " + y, "ERR_NOT_SUPPORT");
  }
  return f;
}, adapters: js };
function $s(r3) {
  if (r3.cancelToken && r3.cancelToken.throwIfRequested(), r3.signal && r3.signal.aborted)
    throw new xr(null, r3);
}
function xo(r3) {
  return $s(r3), r3.headers = $e.from(r3.headers), r3.data = dn.call(r3, r3.transformRequest), ["post", "put", "patch"].indexOf(r3.method) !== -1 && r3.headers.setContentType("application/x-www-form-urlencoded", false), wo.getAdapter(r3.adapter || Fi.adapter)(r3).then(function(f) {
    return $s(r3), f.data = dn.call(r3, r3.transformResponse, f), f.headers = $e.from(f.headers), f;
  }, function(f) {
    return pn(f) || ($s(r3), f && f.response && (f.response.data = dn.call(r3, r3.transformResponse, f.response), f.response.headers = $e.from(f.response.headers))), Promise.reject(f);
  });
}
var Mo = "1.7.4";
var Ks = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((r3, t) => {
  Ks[r3] = function(f) {
    return typeof f === r3 || "a" + (t < 1 ? "n " : " ") + r3;
  };
});
var Yh = {};
Ks.transitional = function(t, e, f) {
  function n(g, y) {
    return "[Axios v" + Mo + "] Transitional option '" + g + "'" + y + (f ? ". " + f : "");
  }
  return (g, y, _) => {
    if (t === false)
      throw new ue(n(y, " has been removed" + (e ? " in " + e : "")), ue.ERR_DEPRECATED);
    return e && !Yh[y] && (Yh[y] = true, console.warn(n(y, " has been deprecated since v" + e + " and will be removed in the near future"))), t ? t(g, y, _) : true;
  };
};
function Am(r3, t, e) {
  if (typeof r3 != "object")
    throw new ue("options must be an object", ue.ERR_BAD_OPTION_VALUE);
  let f = Object.keys(r3), n = f.length;
  for (; n-- > 0; ) {
    let g = f[n], y = t[g];
    if (y) {
      let _ = r3[g], E = _ === void 0 || y(_, g, r3);
      if (E !== true)
        throw new ue("option " + g + " must be " + E, ue.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (e !== true)
      throw new ue("Unknown option " + g, ue.ERR_BAD_OPTION);
  }
}
var bo = { assertOptions: Am, validators: Ks };
var Hr = bo.validators, Ui = class {
  constructor(t) {
    this.defaults = t, this.interceptors = { request: new Ts(), response: new Ts() };
  }
  async request(t, e) {
    try {
      return await this._request(t, e);
    } catch (f) {
      if (f instanceof Error) {
        let n;
        Error.captureStackTrace ? Error.captureStackTrace(n = {}) : n = new Error();
        let g = n.stack ? n.stack.replace(/^.+\n/, "") : "";
        try {
          f.stack ? g && !String(f.stack).endsWith(g.replace(/^.+\n.+\n/, "")) && (f.stack += `
` + g) : f.stack = g;
        } catch (y) {
        }
      }
      throw f;
    }
  }
  _request(t, e) {
    typeof t == "string" ? (e = e || {}, e.url = t) : e = t || {}, e = dr(this.defaults, e);
    let { transitional: f, paramsSerializer: n, headers: g } = e;
    f !== void 0 && bo.assertOptions(f, { silentJSONParsing: Hr.transitional(Hr.boolean), forcedJSONParsing: Hr.transitional(Hr.boolean), clarifyTimeoutError: Hr.transitional(Hr.boolean) }, false), n != null && (X.isFunction(n) ? e.paramsSerializer = { serialize: n } : bo.assertOptions(n, { encode: Hr.function, serialize: Hr.function }, true)), e.method = (e.method || this.defaults.method || "get").toLowerCase();
    let y = g && X.merge(g.common, g[e.method]);
    g && X.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (K) => {
      delete g[K];
    }), e.headers = $e.concat(y, g);
    let _ = [], E = true;
    this.interceptors.request.forEach(function(Z) {
      typeof Z.runWhen == "function" && Z.runWhen(e) === false || (E = E && Z.synchronous, _.unshift(Z.fulfilled, Z.rejected));
    });
    let S = [];
    this.interceptors.response.forEach(function(Z) {
      S.push(Z.fulfilled, Z.rejected);
    });
    let I, F = 0, P;
    if (!E) {
      let K = [xo.bind(this), void 0];
      for (K.unshift.apply(K, _), K.push.apply(K, S), P = K.length, I = Promise.resolve(e); F < P; )
        I = I.then(K[F++], K[F++]);
      return I;
    }
    P = _.length;
    let Y = e;
    for (F = 0; F < P; ) {
      let K = _[F++], Z = _[F++];
      try {
        Y = K(Y);
      } catch (k) {
        Z.call(this, k);
        break;
      }
    }
    try {
      I = xo.call(this, Y);
    } catch (K) {
      return Promise.reject(K);
    }
    for (F = 0, P = S.length; F < P; )
      I = I.then(S[F++], S[F++]);
    return I;
  }
  getUri(t) {
    t = dr(this.defaults, t);
    let e = gn(t.baseURL, t.url);
    return un(e, t.params, t.paramsSerializer);
  }
};
X.forEach(["delete", "get", "head", "options"], function(t) {
  Ui.prototype[t] = function(e, f) {
    return this.request(dr(f || {}, { method: t, url: e, data: (f || {}).data }));
  };
});
X.forEach(["post", "put", "patch"], function(t) {
  function e(f) {
    return function(g, y, _) {
      return this.request(dr(_ || {}, { method: t, headers: f ? { "Content-Type": "multipart/form-data" } : {}, url: g, data: y }));
    };
  }
  Ui.prototype[t] = e(), Ui.prototype[t + "Form"] = e(true);
});
var vn = Ui;
var Ys = class r {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let e;
    this.promise = new Promise(function(g) {
      e = g;
    });
    let f = this;
    this.promise.then((n) => {
      if (!f._listeners)
        return;
      let g = f._listeners.length;
      for (; g-- > 0; )
        f._listeners[g](n);
      f._listeners = null;
    }), this.promise.then = (n) => {
      let g, y = new Promise((_) => {
        f.subscribe(_), g = _;
      }).then(n);
      return y.cancel = function() {
        f.unsubscribe(g);
      }, y;
    }, t(function(g, y, _) {
      f.reason || (f.reason = new xr(g, y, _), e(f.reason));
    });
  }
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  unsubscribe(t) {
    if (!this._listeners)
      return;
    let e = this._listeners.indexOf(t);
    e !== -1 && this._listeners.splice(e, 1);
  }
  static source() {
    let t;
    return { token: new r(function(n) {
      t = n;
    }), cancel: t };
  }
}, Hh = Ys;
function Hs(r3) {
  return function(e) {
    return r3.apply(null, e);
  };
}
function Zs(r3) {
  return X.isObject(r3) && r3.isAxiosError === true;
}
var Vs = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511 };
Object.entries(Vs).forEach(([r3, t]) => {
  Vs[t] = r3;
});
var Zh = Vs;
function Vh(r3) {
  let t = new vn(r3), e = fn(vn.prototype.request, t);
  return X.extend(e, vn.prototype, t, { allOwnKeys: true }), X.extend(e, t, null, { allOwnKeys: true }), e.create = function(n) {
    return Vh(dr(r3, n));
  }, e;
}
var We = Vh(Fi);
We.Axios = vn;
We.CanceledError = xr;
We.CancelToken = Hh;
We.isCancel = pn;
We.VERSION = Mo;
We.toFormData = Yr;
We.AxiosError = ue;
We.Cancel = We.CanceledError;
We.all = function(t) {
  return Promise.all(t);
};
We.spread = Hs;
We.isAxiosError = Zs;
We.mergeConfig = dr;
We.AxiosHeaders = $e;
We.formToJSON = (r3) => po(X.isHTMLForm(r3) ? new FormData(r3) : r3);
We.getAdapter = wo.getAdapter;
We.HttpStatusCode = Zh;
We.default = We;
var Ur = We;
var pr = { errors: { disconnected: () => "UXUYWallet: Disconnected from chain. Attempting to connect.", permanentlyDisconnected: () => "UXUYWallet: Disconnected from UXUYWallet background. Page reload required.", sendSiteMetadata: () => "UXUYWallet: Failed to send site metadata. This is an internal error, please report this bug.", unsupportedSync: (r3) => `UXUYWallet: The UXUYWallet Ethereum provider does not support synchronous methods like ${r3} without a callback parameter.`, invalidDuplexStream: () => "Must provide a Node.js-style duplex stream.", invalidNetworkParams: () => "UXUYWallet: Received invalid network parameters. Please report this bug.", invalidRequestArgs: () => "Expected a single, non-array, object argument.", invalidRequestMethod: () => "'args.method' must be a non-empty string.", invalidRequestParams: () => "'args.params' must be an object or array if provided.", invalidLoggerObject: () => "'args.logger' must be an object if provided.", invalidLoggerMethod: (r3) => `'args.logger' must include required method '${r3}'.`, invalidChains: (r3) => `'UXUYWallet: not supported chain with ID '${r3}'. try connect wallet to supported chain.`, timeOut: (r3) => `'UXUYWallet: Timed out while waiting for response from '${r3}'.`, unAuthorizedChain: (r3) => `UXUYWallet: not authorized chain with ID '${r3}'. try connect wallet to authorized chain.` }, info: { connected: (r3) => `UXUYWallet: Connected to chain with ID "${r3}".` }, warnings: { chainIdDeprecation: `UXUYWallet: 'ethereum.chainId' is deprecated and may be removed in the future. Please use the 'eth_chainId' RPC method instead.
For more information, see: https://github.com/UXUYWallet/UXUYWallet-improvement-proposals/discussions/23`, networkVersionDeprecation: `UXUYWallet: 'ethereum.networkVersion' is deprecated and may be removed in the future. Please use the 'net_version' RPC method instead.
For more information, see: https://github.com/UXUYWallet/UXUYWallet-improvement-proposals/discussions/23`, selectedAddressDeprecation: `UXUYWallet: 'ethereum.selectedAddress' is deprecated and may be removed in the future. Please use the 'eth_accounts' RPC method instead.
For more information, see: https://github.com/UXUYWallet/UXUYWallet-improvement-proposals/discussions/23`, enableDeprecation: `UXUYWallet: 'ethereum.enable()' is deprecated and may be removed in the future. Please use the 'eth_requestAccounts' RPC method instead.
For more information, see: https://eips.ethereum.org/EIPS/eip-1102`, sendDeprecation: `UXUYWallet: 'ethereum.send(...)' is deprecated and may be removed in the future. Please use 'ethereum.sendAsync(...)' or 'ethereum.request(...)' instead.
For more information, see: https://eips.ethereum.org/EIPS/eip-1193`, events: { close: `UXUYWallet: The event 'close' is deprecated and may be removed in the future. Please use 'disconnect' instead.
For more information, see: https://eips.ethereum.org/EIPS/eip-1193#disconnect`, data: `UXUYWallet: The event 'data' is deprecated and will be removed in the future. Use 'message' instead.
For more information, see: https://eips.ethereum.org/EIPS/eip-1193#message`, networkChanged: `UXUYWallet: The event 'networkChanged' is deprecated and may be removed in the future. Use 'chainChanged' instead.
For more information, see: https://eips.ethereum.org/EIPS/eip-1193#chainchanged`, notification: `UXUYWallet: The event 'notification' is deprecated and may be removed in the future. Use 'message' instead.
For more information, see: https://eips.ethereum.org/EIPS/eip-1193#message` }, rpc: { ethDecryptDeprecation: `UXUYWallet: The RPC method 'eth_decrypt' is deprecated and may be removed in the future.
For more information, see: https://medium.com/UXUYWallet/UXUYWallet-api-method-deprecation-2b0564a84686`, ethGetEncryptionPublicKeyDeprecation: `UXUYWallet: The RPC method 'eth_getEncryptionPublicKey' is deprecated and may be removed in the future.
For more information, see: https://medium.com/UXUYWallet/UXUYWallet-api-method-deprecation-2b0564a84686`, walletWatchAssetNFTExperimental: `UXUYWallet: The RPC method 'wallet_watchAsset' is experimental for ERC721/ERC1155 assets and may change in the future.
For more information, see: https://github.com/UXUYWallet/UXUYWallet-improvement-proposals/blob/main/MIPs/mip-1.md and https://github.com/UXUYWallet/UXUYWallet-improvement-proposals/blob/main/PROCESS-GUIDE.md#proposal-lifecycle` }, experimentalMethods: "UXUYWallet: 'ethereum._UXUYWallet' exposes non-standard, experimental methods. They may be removed or changed without warning." } }, Mr = { rpc: { timeoutRequest: -30008, invalidInput: -32e3, resourceNotFound: -32001, resourceUnavailable: -32002, transactionRejected: -32003, methodNotSupported: -32004, limitExceeded: -32005, parse: -32700, invalidRequest: -32600, methodNotFound: -32601, invalidParams: -32602, internal: -32603 }, provider: { unsupportedChain: 4002, userRejectedRequest: 4001, unauthorized: 4100, unsupportedMethod: 4200, disconnected: 4900, chainDisconnected: 4901, unAuthorizedChain: 4902 } }, _m = { "-32700": { standard: "JSON RPC 2.0", message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text." }, "-32600": { standard: "JSON RPC 2.0", message: "The JSON sent is not a valid Request object." }, "-32601": { standard: "JSON RPC 2.0", message: "The method does not exist / is not available." }, "-32602": { standard: "JSON RPC 2.0", message: "Invalid method parameter(s)." }, "-32603": { standard: "JSON RPC 2.0", message: "Internal JSON-RPC error." }, "-32000": { standard: "EIP-1474", message: "Invalid input." }, "-32001": { standard: "EIP-1474", message: "Resource not found." }, "-32002": { standard: "EIP-1474", message: "Resource unavailable." }, "-32003": { standard: "EIP-1474", message: "Transaction rejected." }, "-32004": { standard: "EIP-1474", message: "Method not supported." }, "-32005": { standard: "EIP-1474", message: "Request limit exceeded." }, 4001: { standard: "EIP-1193", message: "User rejected the request." }, 4100: { standard: "EIP-1193", message: "The requested account and/or method has not been authorized by the user." }, 4200: { standard: "EIP-1193", message: "The requested method is not supported by this Ethereum provider." }, 4900: { standard: "EIP-1193", message: "The provider is disconnected from all chains." }, 4901: { standard: "EIP-1193", message: "The provider is disconnected from the specified chain." } }, Gh = "Unspecified error message. This is a bug, please report it.", br = { invalidRequest: function({ code: r3, message: t, data: e }) {
  return r3 = (r3 || Mr.rpc.invalidRequest).toString(), { code: r3, message: t || _m[r3].message || Gh, data: e };
}, methodNotSupported: function({ code: r3, message: t, data: e }) {
  return { code: Mr.rpc.invalidRequest, message: Gh, data: e };
} };
function Ri(r3) {
  var e;
  let t = window.location.hostname;
  try {
    t = ((e = new URL((r3 == null ? void 0 : r3.url) || "")) == null ? void 0 : e.hostname) || t;
  } catch (f) {
    console.warn(`new URL(${r3 == null ? void 0 : r3.url}) error`);
  }
  return { url: (r3 == null ? void 0 : r3.url) || location.href, hostname: t, name: (r3 == null ? void 0 : r3.name) || Em(window), icon: (r3 == null ? void 0 : r3.icon) || Cm(window), direct_link: r3 == null ? void 0 : r3.direct_link, description: r3 == null ? void 0 : r3.description };
}
function Em(r3) {
  let { document: t } = r3, e = t.querySelector('head > meta[property="og:site_name"]');
  if (e)
    return e.content;
  let f = t.querySelector('head > meta[name="title"]');
  return f ? f.content : t.title && t.title.length > 0 ? t.title : window.location.hostname;
}
function Cm(r3) {
  let { document: t } = r3, e = t.querySelectorAll('head > link[rel~="icon"]');
  for (let f of Array.from(e))
    if (f)
      return f.href;
  return null;
}
function Bm(r3) {
  let t = { type: "object", properties: { types: { type: "object", additionalProperties: { type: "array", items: { type: "object", properties: { name: { type: "string" }, type: { type: "string" } }, required: ["name", "type"] } } }, primaryType: { type: "string" }, domain: { type: "object" }, message: { type: "object" } }, required: ["types", "primaryType", "domain", "message"] }, e = {};
  for (let f in t.properties)
    r3[f] && (e[f] = r3[f]);
  return "types" in e && (e.types = Object.assign({ EIP712Domain: [] }, e.types)), e;
}
function Jh(r3) {
  try {
    r3 = typeof r3 == "string" ? JSON.parse(r3) : r3;
  } catch (t) {
    console.log("EIP712Data is not a valid JSON string");
  }
  try {
    r3 = Bm(r3);
    let t = {};
    return r3.types[r3.primaryType].map(({ name: f }) => {
      t[f] = r3.message[f];
    }), r3.message = t, r3;
  } catch (t) {
    console.error("parseEIP712 error");
  }
  return r3;
}
function Gs(r3 = "") {
  return r3.length === 2 + 20 * 2;
}
var Rr = class extends Rn {
  constructor({ protocol: t }) {
    super(), this.protocol = t, this._initializeChannelMessage();
  }
  getAppInfo() {
    return { ...ar };
  }
  _initializeChannelMessage() {
  }
};
var Qs = Ue(Xn());
var Xh = (0, Qs.debug)("uxuy:EthereumProvider"), Sm = (0, Qs.debug)("uxuy:EthereumProvider:error");
function Ar(r3 = 0) {
  return r3 = isNaN(Number(r3)) ? 1 : Number(r3), "0x" + r3.toString(16);
}
var Pi = { address: "", chainId: "0x1", chainKey: "ethereum", alliance: "evm", chainName: "Ethereum netWork", chainSymbol: "ETH" }, Js = class {
  constructor(t) {
    this.options = t, this.rpcMap = /* @__PURE__ */ new Map(), this.peddingMap = /* @__PURE__ */ new Map(), t != null && t.chainId && this.setUrl(t.url, t.chainId);
  }
  setUrl(t, e) {
    this.rpcMap.set(parseInt(e), t);
  }
  getUrl(t) {
    return this.rpcMap.get(parseInt(t));
  }
  async send(t, e) {
    let { method: f, params: n, id: g } = t, y = e.rpcUrl || this.getUrl(e.chainId), _ = { jsonrpc: "2.0", method: f, params: n, id: g || (/* @__PURE__ */ new Date()).getTime() }, E = await Ur.post(y, _), { result: S, error: I } = E.data;
    if (I)
      throw new Error(I);
    return E.data.result;
  }
  async sendBatch(t, e = {}) {
    let f = [];
    for (let n of t) {
      let g = await this.send(n, e);
      f.push(g);
    }
    return f;
  }
};
function Qh(r3, t = "evm") {
  return r3 && Object.keys(r3).forEach((e) => {
    var f;
    ((f = r3[e]) == null ? void 0 : f.alliance) != t && delete r3[e];
  }), r3;
}
var Xs = class {
  constructor() {
    this.prefix = "tg-uxuy-wallet-";
  }
  get(t) {
    try {
      let e = localStorage.getItem(`${this.prefix}${t}`);
      return e ? JSON.parse(e) : null;
    } catch (e) {
      return console.error(e), null;
    }
  }
  set(t, e) {
    try {
      return localStorage.setItem(`${this.prefix}${t}`, JSON.stringify(e)), e;
    } catch (f) {
      return null;
    }
  }
};
function Tm(r3) {
  var y, _;
  Xh("ProxyResponse", r3);
  let { method: t, config: e, params: f, result: n } = r3 || {}, g = ((y = e == null ? void 0 : e.params) == null ? void 0 : y[0]) || {};
  if (e) {
    let E = Qh(e == null ? void 0 : e.accounts);
    switch (E && (this._accounts = E), t) {
      case "wallet_switchEthereumChain":
      case "wallet_addEthereumChain":
        let S = Object.values(this._accounts || {}).find((I) => Ar(I.chainId) === Ar(g.chainId));
        S ? this._account = { ...S } : r3.error = { code: -32602, message: `uxuy wallet does not support  ${g == null ? void 0 : g.chainId}` };
        break;
      case "eth_requestAccounts":
        this._account = this._accounts[(_ = this._account) == null ? void 0 : _.chainKey] || Object.values(this._accounts)[0];
        break;
    }
    return r3;
  }
}
var Ao = (() => {
  let r3 = /* @__PURE__ */ new Map(), t = (/* @__PURE__ */ new Date()).getTime();
  return async (e, f, n = 1e3) => {
    let g = (/* @__PURE__ */ new Date()).getTime();
    if (g - t < 500 && (t = g, await new Promise((_) => setTimeout(_, 500 - (g - t)))), r3.has(e))
      return r3.has(e);
    let y = f();
    return r3.set(e, y), setTimeout(() => {
      r3.delete(e);
    }, n), y.finally(() => {
      r3.delete(e);
    });
  };
})(), Fm = (() => {
  let r3 = 0;
  return function(t = 60 * 1e3) {
    return (/* @__PURE__ */ new Date()).getTime() - r3 > t ? () => {
      r3 = (/* @__PURE__ */ new Date()).getTime();
    } : false;
  };
})(), _o = class extends Rr {
  constructor(e) {
    super({ protocol: "evm" });
    this._isUnlocked = true;
    this._initialized = false;
    this.autoRefreshOnNetworkChange = true;
    this._isMetaMask = true;
    this.isMetaMask = true;
    this._isConnected = false;
    this.isUxuyWallet = true;
    this.isInUxuyApp = wr();
    this.version = this.getAppInfo().version, this.connectUrl = e.connect, this.bridgeUrl = e.bridge, this.connect_direct_link = e.connect_direct_link, this.request_timeout = (e == null ? void 0 : e.request_timeout) || 6e4 * 10, this.metaData = e == null ? void 0 : e.metaData, this.debug = (e == null ? void 0 : e.debug) || false, this.logger = Xh, this.error = Sm, this._metamask = { isUnlocked: function() {
      return new Promise((f, n) => f(true));
    } }, this.storage = new Xs(), this.httpProvider = new Js({ chainId: "0x1", url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" }), this.request = this.request.bind(this), this._initialize();
  }
  get _lastTime() {
    return isNaN(Number(this.storage.get("lastTime") || 0)) ? 0 : Number(this.storage.get("lastTime") || 0);
  }
  set _lastTime(e) {
    this.storage.set("lastTime", e);
  }
  get _account() {
    return this.storage.get("account") || Pi;
  }
  set _account(e) {
    let f = { ...this._account || Pi };
    e || (e = { ...f, address: "" }), this.storage.set("account", e), Ar(f == null ? void 0 : f.chainId) != Ar(e == null ? void 0 : e.chainId) && (this.emit("chainChanged", this == null ? void 0 : this.chainId, e == null ? void 0 : e.alliance, e), this.emit("networkChanged", parseInt(this == null ? void 0 : this.chainId), e == null ? void 0 : e.alliance)), (f == null ? void 0 : f.address) != (e == null ? void 0 : e.address) && this.emit("accountsChanged", e != null && e.address ? [e == null ? void 0 : e.address] : []);
  }
  get _accounts() {
    return this.storage.get("accounts") || { ethereum: Pi };
  }
  set _accounts(e) {
    this.storage.set("accounts", Qh(e));
  }
  get networkVersion() {
    return parseInt(this.chainId);
  }
  get chainId() {
    var e, f;
    return (e = this._account) != null && e.chainId ? Ar((f = this._account) == null ? void 0 : f.chainId) : null;
  }
  get chainKey() {
    var e;
    return ((e = this._account) == null ? void 0 : e.chainKey) || (Pi == null ? void 0 : Pi.chainKey);
  }
  get connected() {
    var e;
    return !!((e = this._account) != null && e.address);
  }
  get selectedAddress() {
    var e;
    return ((e = this._account) == null ? void 0 : e.address) || "";
  }
  _initialize() {
    this._isConnected = true, this._isUnlocked = true, this._initialized = true, this.emit("connect", { chainId: this == null ? void 0 : this.chainId }), this.emit("_initialized");
  }
  async _walletSwitchChain(e) {
    let { method: f, params: n } = e, g = n[0], y = Object.values(this._accounts || {}).find((_) => Ar(_.chainId) === Ar(g.chainId));
    if (!y)
      if (f == "wallet_addEthereumChain") {
        if (await this._request("DAPP_EXT_METHOD", [e]), y = Object.values(this._accounts || {}).find((_) => Ar(_.chainId) === Ar(g.chainId)), !y)
          throw br.invalidRequest({ code: Mr.provider.unsupportedChain, message: pr.errors.invalidChains(g == null ? void 0 : g.chainId), data: n });
      } else
        throw br.invalidRequest({ code: Mr.provider.unAuthorizedChain, message: pr.errors.unAuthorizedChain(g == null ? void 0 : g.chainId), data: n });
    return this._account = y, null;
  }
  getAppInfo() {
    return super.getAppInfo();
  }
  async enable() {
    return this.request({ method: "eth_requestAccounts" });
  }
  isConnected() {
    return this.connected;
  }
  async request(e) {
    var g, y, _, E, S, I;
    let { method: f, params: n = [] } = e || {};
    if (this.logger("request", ...arguments), !e || typeof e != "object" || Array.isArray(e))
      throw br.invalidRequest({ message: pr.errors.invalidRequestArgs(), data: n });
    if (typeof f != "string" || f.length === 0)
      throw br.invalidRequest({ message: pr.errors.invalidRequestMethod(), data: e });
    try {
      let F = `${f}-${JSON.stringify(n || [])}`;
      switch (f) {
        case "eth_requestAccounts":
          let P = Fm();
          if ((g = this == null ? void 0 : this._account) != null && g.address && !P)
            return [this._account.address];
          let Y = await Ao(F, () => this._request(f, n));
          return P && (P == null || P()), Y;
          break;
        case "eth_accounts":
          return [(y = this._account) == null ? void 0 : y.address];
        case "eth_chainId":
          return (_ = this._account) != null && _.chainId ? Ar((E = this._account) == null ? void 0 : E.chainId) : null;
        case "wallet_switchEthereumChain":
        case "wallet_addEthereumChain":
          return this.connected || await this.request({ method: "eth_requestAccounts" }), this._walletSwitchChain({ method: f, params: n });
          break;
        case "wallet_watchAsset":
        case "metamask_watchAsset":
          let K = { method: "wallet_watchAsset", params: n };
          return Ao(F, () => this._request("DAPP_EXT_METHOD", [K]));
        case "personal_sign":
        case "eth_signTypedData":
        case "eth_sendTransaction":
        case "eth_signTransaction":
          return this.connected || await this.request({ method: "eth_requestAccounts" }), Ao(F, () => this._request(f, n));
          break;
        case "eth_signTypedData_v3":
        case "eth_signTypedData_v4":
          this.connected || await this.request({ method: "eth_requestAccounts" });
          let Z = e.params[0];
          return Gs(e.params[0]) && !Gs(e.params[1]) && (Z = e.params[1]), n[0] = Jh(Z), Ao(F, () => this._request(f, n));
          break;
        default:
          return this.httpProvider.send(e, { chainId: this.chainId, chainKey: this.chainKey, rpcUrl: ((I = (S = this._account) == null ? void 0 : S.rpcs) == null ? void 0 : I[0]) || "" });
      }
    } catch (F) {
      return this.logger(F), F != null && F.code && (F.code = Number(F.code) || -32603), Promise.reject(typeof F == "object" ? F : { code: -32603, message: F });
    }
  }
  async _request(e, f, n) {
    var Tt;
    let g = this._account, y = (/* @__PURE__ */ new Date()).getTime();
    this._lastTime = y;
    let _ = e == "eth_requestAccounts" && ((Tt = g == null ? void 0 : g.chainKey) == null ? void 0 : Tt.startsWith("evm_"));
    n = { account: Object.assign(g || {}, { alliance: "evm", chainKey: _ ? "ethereum" : g == null ? void 0 : g.chainKey, chainId: _ ? "0x1" : g == null ? void 0 : g.chainId }), metaData: Ri(this.metaData), ...n, timeStamp: y };
    let E = (/* @__PURE__ */ new Date()).getTime() + Math.floor(Math.random() * 1e3).toString(), S = `salt-${Date.now()}-${E}`, I = { id: E, method: e, params: f, options: n }, F = { id: I.id, data: I, version: "1.0", salt: S }, P = await Ur.post(`${this.connectUrl}/transaction`, F, { headers: { "X-Salt": S } }), { hash: Y, signature: K } = P.data;
    this.logger({ hash: Y, signature: K, salt: S });
    let Z = { method: e, params: [S, Y, K] }, k = await new Promise((it, q) => {
      let j = new EventSource(`${this.bridgeUrl}/events/${Y}/${K}/${S}`);
      j.onopen = () => {
        j.onopen = null, it(j);
      }, j.onerror = (nt) => {
        var ft;
        j.onerror = null, (ft = j == null ? void 0 : j.close) == null || ft.call(j), q(nt);
      };
    });
    return new Promise((it, q) => {
      var Q, $t;
      let j = this.request_timeout > 0 ? setTimeout(() => {
        var x, o;
        q(br.invalidRequest({ code: (o = (x = Mr) == null ? void 0 : x.rpc) == null ? void 0 : o.timeoutRequest, message: pr.errors.timeOut(e), data: I })), k.close();
      }, this.request_timeout || 6e4) : null;
      k.addEventListener("message", (x) => {
        var o;
        this.logger("message.........", x == null ? void 0 : x.data, F);
        try {
          let u = JSON.parse(x == null ? void 0 : x.data);
          this.logger("message....parse", { data: u, publish_params: F }), (u == null ? void 0 : u.id) == E || S == (u == null ? void 0 : u.salt) ? ((o = k == null ? void 0 : k.close) == null || o.call(k), clearTimeout(j), (u.reConnect || !u.error) && Tm.call(this, u), u.error ? q(u.error) : it(u.result)) : this.logger("not match");
        } catch (u) {
          this.error(u);
        }
      });
      let nt = `${this.connect_direct_link}?startapp=uxuyconnect_${ke.encodeTelegramUrlParameters(Z)}`, ft = io();
      if (ft)
        nh() ? ke.openAndroidLink(nt) : ($t = (Q = Telegram == null ? void 0 : Telegram.WebApp) == null ? void 0 : Q.openTelegramLink) == null || $t.call(Q, nt);
      else {
        let x = this.connect_direct_link.match(/t\.me\/([^\/]+)\/([^\/]+)/);
        x[1] && x[2] ? !ft && ke.opendeepLink(`uxuyconnect_${ke.encodeTelegramUrlParameters(Z)}`, { domain: x[1], appname: x[2] }) : !ft && ke.opendeepLink(`uxuyconnect_${ke.encodeTelegramUrlParameters(Z)}`);
      }
    });
  }
  disconnect() {
    this._account = null, this.emit("accountsChanged", []), this.emit("disconnect", "");
  }
};
var yn = class extends Error {
  constructor(e, f, n) {
    super(f);
    this.code = e, this.description = n;
  }
};
var Zr = class extends Error {
  constructor(e, f) {
    super(e);
    this.code = f;
  }
};
Bn();
Ke();
Bn();
Ke();
Ba();
Sa();
Ke();
Sr();
hr();
Sr();
Ue(ir());
Ke();
hr();
Ue(ir());
Ue(qi());
Ke();
Sr();
Ue(ir());
Ke();
Ue(ir());
Ke();
hr();
Ke();
Ue(ir());
Ke();
Ue(ir());
hr();
Ke();
Ke();
Ue(da());
Ke();
Ke();
Ue(ir());
Sr();
Ke();
Ke();
Ke();
Sr();
hr();
var gu = Ue(ir());
var Ro = Ue(ir());
hr();
var { Cell: mu } = (Ke(), Hu(du)), Ua = class extends Error {
  constructor(e, f) {
    super(e);
    pe(this, "result");
    this.result = f;
  }
}, Po = class r2 {
  static parseObject(t) {
    let e = t["@type"];
    switch (e) {
      case "tvm.list":
      case "tvm.tuple":
        return t.elements.map(r2.parseObject);
      case "tvm.cell":
        return mu.oneFromBoc(ba(t.bytes));
      case "tvm.stackEntryCell":
        return r2.parseObject(t.cell);
      case "tvm.stackEntryTuple":
        return r2.parseObject(t.tuple);
      case "tvm.stackEntryNumber":
        return r2.parseObject(t.number);
      case "tvm.numberDecimal":
        return new Ro.default(t.number, 10);
      default:
        throw new Error("unknown type " + e);
    }
  }
  static parseResponseStack(t) {
    let e = t[0], f = t[1];
    switch (e) {
      case "num":
        return new Ro.default(f.replace(/0x/, ""), 16);
      case "list":
      case "tuple":
        return r2.parseObject(f);
      case "cell":
        let n = ba(f.bytes);
        return mu.oneFromBoc(n);
      default:
        throw new Error("unknown type " + e);
    }
  }
  static parseResponse(t) {
    if (t.exit_code !== 0)
      throw new Ua(`Http provider parse response error ${JSON.stringify(t)}`, t);
    let e = t.stack.map(r2.parseResponseStack);
    return e.length === 1 ? e[0] : e;
  }
  static makeArg(t) {
    if (t instanceof Ro.default || t instanceof Number)
      return ["num", t];
    throw new Error("unknown arg type " + t);
  }
  static makeArgs(t) {
    return t.map(this.makeArg);
  }
};
var Ra = "-9223372036854775808", Do = class {
  constructor(t, e) {
    pe(this, "SHARD_ID_ALL", Ra);
    pe(this, "host");
    pe(this, "options");
    pe(this, "isContractDeployed", async (t2) => (await this.getContractState(t2)).state === "active");
    pe(this, "getContractState", async (t2) => {
      let e2 = await this.getAddressInfo(t2), f = new gu.default(e2.balance), n = e2.state;
      return { balance: f, state: n, code: e2.code !== "" ? Buffer.from(e2.code, "base64") : null, data: e2.data !== "" ? Buffer.from(e2.data, "base64") : null, lastTransaction: e2.last_transaction_id.lt !== "0" ? { lt: e2.last_transaction_id.lt, hash: e2.last_transaction_id.hash } : null, blockId: { workchain: e2.block_id.workchain, shard: e2.block_id.shard, seqno: e2.block_id.seqno }, timestampt: e2.sync_utime };
    });
    this.host = t || "https://toncenter.com/api/v2/jsonRPC", this.options = e || {};
  }
  async sendImpl(t, e) {
    let f = { "Content-Type": "application/json" };
    this.options.apiKey && (f["X-API-Key"] = this.options.apiKey);
    let n = await fetch(t, { method: "POST", redirect: "follow", mode: "cors", headers: f, body: JSON.stringify(e) });
    if (n.status !== 200) {
      let _ = e.method === "runGetMethod" ? `runGetMethod: ${e.params.method}` : e.method;
      throw new Error(`${n.status}: ${_}: ${n.statusText}`);
    }
    let { result: g, error: y } = await n.json();
    return g || Promise.reject(y);
  }
  send(t, e) {
    return this.sendImpl(this.host, { id: 1, jsonrpc: "2.0", method: t, params: e });
  }
  async getAddressInfo(t) {
    return this.send("getAddressInformation", { address: t });
  }
  async getExtendedAddressInfo(t) {
    return this.send("getExtendedAddressInformation", { address: t });
  }
  async getWalletInfo(t) {
    return this.send("getWalletInformation", { address: t });
  }
  async getTransactions(t, e = 20, f = void 0, n = void 0, g = void 0, y = void 0) {
    return this.send("getTransactions", { address: t, limit: e, lt: f, hash: n, to_lt: g, archival: y });
  }
  async getBalance(t) {
    return this.send("getAddressBalance", { address: t });
  }
  async getSeqno(t) {
    try {
      return (await this.call2(t, "seqno")).toNumber();
    } catch (e) {
      return 0;
    }
  }
  async sendBoc(t) {
    return this.send("sendBoc", { boc: t });
  }
  async getEstimateFee(t) {
    return this.send("estimateFee", t);
  }
  async call(t, e, f = []) {
    return this.send("runGetMethod", { address: t, method: e, stack: f });
  }
  async call2(t, e, f = []) {
    let n = await this.send("runGetMethod", { address: t, method: e, stack: f });
    return Po.parseResponse(n);
  }
  async getMasterchainInfo() {
    return this.send("getMasterchainInfo", {});
  }
  async getBlockShards(t) {
    return this.send("shards", { seqno: t });
  }
  async getBlockTransactions(t, e, f) {
    return this.send("getBlockTransactions", { workchain: t, shard: e, seqno: f });
  }
  async getMasterchainBlockTransactions(t) {
    return this.getBlockTransactions(-1, Ra, t);
  }
  async getBlockHeader(t, e, f) {
    return this.send("getBlockHeader", { workchain: t, shard: e, seqno: f });
  }
  async getMasterchainBlockHeader(t) {
    return this.getBlockHeader(-1, Ra, t);
  }
};
Sr();
Sr();
hr();
Ue(ir());
Sr();
hr();
function Pa(r3 = 0) {
  return r3 = isNaN(Number(r3)) ? 1 : Number(r3), "0x" + r3.toString(16);
}
var Hi = { address: "", chainId: 239, chainKey: "ton", alliance: "ton", chainName: "Ton netWork", chainSymbol: "Ton" };
function vu(r3, t = "ton") {
  return r3 && Object.keys(r3).forEach((e) => {
    var f;
    ((f = r3[e]) == null ? void 0 : f.alliance) != t && delete r3[e];
  }), r3;
}
var Oa = class {
  constructor() {
    this.prefix = "tg-uxuy-wallet-ton";
  }
  get(t) {
    try {
      let e = localStorage.getItem(`${this.prefix}${t}`);
      return e ? JSON.parse(e) : null;
    } catch (e) {
      return console.log(e), null;
    }
  }
  set(t, e) {
    try {
      return localStorage.setItem(`${this.prefix}${t}`, JSON.stringify(e)), e;
    } catch (f) {
      return null;
    }
  }
};
function Q1(r3) {
  var y, _;
  console.log("ProxyResponse", r3);
  let { method: t, config: e, params: f, result: n } = r3 || {};
  ((y = e == null ? void 0 : e.params) == null ? void 0 : y[0]) || {};
  if (e) {
    let E = vu(e == null ? void 0 : e.accounts);
    switch (E && (this._accounts = E), t) {
      case "eth_requestAccounts":
      case "DAPP_CONNECT_ACCOUNTS":
        this._account = this._accounts[(_ = this._account) == null ? void 0 : _.chainKey] || Object.values(this._accounts)[0];
        break;
    }
    return r3;
  }
}
var Da = (() => {
  let r3 = /* @__PURE__ */ new Map();
  return (t, e, f = 1e3) => {
    if (r3.has(t))
      return r3.has(t);
    let n = e();
    return r3.set(t, n), setTimeout(() => {
      r3.delete(t);
    }, f), n.finally(() => {
      r3.delete(t);
    });
  };
})(), tg = (() => {
  let r3 = 0;
  return function(t = 60 * 1e3) {
    return (/* @__PURE__ */ new Date()).getTime() - r3 > t ? () => {
      r3 = (/* @__PURE__ */ new Date()).getTime();
    } : false;
  };
})(), Tn = class extends Rr {
  constructor(e = window.ton, f) {
    super({ protocol: "ton" });
    this.targetOrigin = "*";
    this.nextJsonRpcId = 0;
    this.isOpenMask = true;
    this.isTonWallet = true;
    this.isTonkeeper = true;
    this.isUxuyWallet = true;
    this.isInUxuyApp = wr();
    this._isUnlocked = true;
    this._initialized = false;
    this._isConnected = false;
    e && e.isUxuyWallet && (this.nextJsonRpcId = e.nextJsonRpcId, this.promises = e.promises, this.callbacks = e.callbacks), this.version = this.getAppInfo().version, this.connectUrl = f.connect, this.bridgeUrl = f.bridge, this.connect_direct_link = f.connect_direct_link, this.eventTimeout = (f == null ? void 0 : f.eventTimeout) || 6e4 * 10, this.metaData = f == null ? void 0 : f.metaData, this.storage = new Oa(), this.httpProvider = new Do("https://toncenter.com/api/v2/jsonRPC"), this._initialize();
  }
  get _lastTime() {
    return isNaN(Number(this.storage.get("lastTime") || 0)) ? 0 : Number(this.storage.get("lastTime") || 0);
  }
  set _lastTime(e) {
    this.storage.set("lastTime", e);
  }
  get _account() {
    return this.storage.get("account") || Hi;
  }
  set _account(e) {
    let f = { ...this._account || Hi };
    e || (e = { ...f, address: "" }, this._tonConnectReply = null), this.storage.set("account", e), Pa(f == null ? void 0 : f.chainId) != Pa(e == null ? void 0 : e.chainId) && (this.emit("chainChanged", this == null ? void 0 : this.chainId, e == null ? void 0 : e.alliance, e), this.emit("networkChanged", parseInt(this == null ? void 0 : this.chainId), e == null ? void 0 : e.alliance)), (f == null ? void 0 : f.address) != (e == null ? void 0 : e.address) && this.emit("accountsChanged", e != null && e.address ? [e == null ? void 0 : e.address] : []);
  }
  get _tonConnectReply() {
    var e, f;
    return (e = this._account) != null && e.address ? this.storage.get((f = this._account) == null ? void 0 : f.address) : null;
  }
  set _tonConnectReply(e) {
    var f, n;
    (f = this._account) != null && f.address && this.storage.set((n = this._account) == null ? void 0 : n.address, e);
  }
  get _accounts() {
    return this.storage.get("accounts") || { ton: Hi };
  }
  set _accounts(e) {
    this.storage.set("accounts", vu(e));
  }
  get networkVersion() {
    return parseInt(this.chainId);
  }
  get chainId() {
    var e, f;
    return (e = this._account) != null && e.chainId ? Pa((f = this._account) == null ? void 0 : f.chainId) : null;
  }
  get chainKey() {
    var e;
    return ((e = this._account) == null ? void 0 : e.chainKey) || (Hi == null ? void 0 : Hi.chainKey);
  }
  get connected() {
    var e;
    return !!((e = this._account) != null && e.address);
  }
  _initialize() {
    this._isConnected = true, this._isUnlocked = true, this._initialized = true, this.emit("connect", { chainId: this == null ? void 0 : this.chainId }), this.emit("_initialized");
  }
  getAppInfo() {
    return { ...ar };
  }
  async isConnected() {
    return this.connected;
  }
  isLocked() {
    return !this._isUnlocked;
  }
  async _requesetAccounts(e, f, n = {}, g = false) {
    var E;
    let y = tg();
    if ((E = this == null ? void 0 : this._account) != null && E.address && !y && !g)
      return [this._account.address];
    let _ = await Da(e, () => this._request("DAPP_CONNECT_ACCOUNTS", [f], n));
    return y && (y == null || y()), _;
  }
  async _signMessage(e, f) {
    return Da(e, () => this._request("DAPP_SIGN_MESSAGE", [f]));
  }
  async _signTransition(e, f) {
    return (f == null ? void 0 : f.method) == "tonConnect_sendTransaction" || (f == null ? void 0 : f.method) == "ton_sendTransaction", Da(e, () => this._request("DAPP_SIGN_SEND_TRANSACTION", [f]));
  }
  async send(e, ...f) {
    var n, g, y, _;
    if (!e || typeof e != "string")
      return Promise.reject("Method is not a valid string.");
    f.length === 1 && f[0] instanceof Array && (f = f[0]);
    try {
      let E = `${e}-${JSON.stringify(f || [])}`;
      switch (e) {
        case "ping":
          return "pong";
        case "wallet_requestAccounts":
        case "ton_requestAccounts":
          let S = await this._requesetAccounts(E, { method: e, params: f });
          return (n = this._account) != null && n.address ? [(g = this._account) == null ? void 0 : g.address] : [];
        case "ton_requestWallets":
          return await this._requesetAccounts(E, { method: e, params: f }), Object.values(this._accounts).map((P) => [{ address: P == null ? void 0 : P.address, publicKey: P == null ? void 0 : P.publicKey, version: P.version }]);
          break;
        case "tonConnect_reconnect":
          if (f = [{ items: f }], this._tonConnectReply)
            return this._tonConnectReply;
        case "tonConnect_connect":
          let I = await this._requesetAccounts(E, { method: e, params: f }, true);
          return this._tonConnectReply = I, I;
          break;
        case "tonConnect_sendTransaction":
        case "ton_sendTransaction":
        case "ton_deployContract":
          return this._signTransition(E, { method: e, params: f });
        case "ton_getAccounts":
          return [(y = this._account) == null ? void 0 : y.address];
        case "ton_getBalance":
          return this.httpProvider.getBalance((_ = this._account) == null ? void 0 : _.address);
        case "ton_confirmWalletSeqNo":
          async function F(P) {
            var K;
            let Y = await sh(this.httpProvider.getSeqno((K = this._account) == null ? void 0 : K.address));
            if (!(P > Y) && Y !== P)
              throw new yn(1004, "Unexpected SeqNo");
          }
          await F.call(this, f[0]), F = null;
          return;
        case "ton_rawSign":
        case "ton_personalSign":
          return this._signMessage(E, { method: e, params: f });
        case "ton_decryptMessage":
          break;
        case "ton_encryptMessage":
          break;
        case "wallet_getLocked":
          return this.isLocked();
        case "wallet_getChain":
          return "mainnet";
        case "tonConnect_disconnect":
          return this.disconnect();
        case "wallet_switchChain":
          return true;
        case "wallet_watchAsset":
        default:
          throw new yn(1004, `Method "${e}" not implemented`);
      }
    } catch (E) {
      return console.log(E), Promise.reject(typeof E == "object" ? E : { code: (E == null ? void 0 : E.code) || -32603, message: (E == null ? void 0 : E.message) || E });
    }
  }
  async _request(e, f, n) {
    let g = this._account, y = (/* @__PURE__ */ new Date()).getTime();
    this._lastTime = y, n = { account: Object.assign(g || {}, { alliance: "ton" }), metaData: Ri(this.metaData), ...n, originPayload: n == null ? void 0 : n.originPayload, timeStamp: y };
    let _ = this.nextJsonRpcId++, E = ((/* @__PURE__ */ new Date()).getTime() + _).toString(), S = `salt-${Date.now()}-${E}`, I = { id: E, method: e, params: f, options: n }, F = { id: I.id, data: I, version: "1.0", salt: S }, P = await Ur.post(`${this.connectUrl}/transaction`, F, { headers: { "X-Salt": S } }), { hash: Y, signature: K } = P.data;
    console.log({ hash: Y, signature: K, salt: S });
    let Z = { method: e, params: [S, Y, K] }, k = await new Promise((Tt, it) => {
      let q = new EventSource(`${this.bridgeUrl}/events/${Y}/${K}/${S}`);
      q.onopen = () => {
        q.onopen = null, Tt(q);
      }, q.onerror = (j) => {
        var nt;
        q.onerror = null, (nt = q == null ? void 0 : q.close) == null || nt.call(q), it(j);
      };
    });
    return new Promise((Tt, it) => {
      var nt, ft;
      let q = this.eventTimeout > 0 ? setTimeout(() => {
        var Q, $t;
        it(br.invalidRequest({ code: ($t = (Q = Mr) == null ? void 0 : Q.rpc) == null ? void 0 : $t.timeoutRequest, message: pr.errors.timeOut(e), data: I })), k.close();
      }, this.eventTimeout || 6e4) : null;
      k.onmessage = (Q) => {
        var $t;
        console.log("message.........", Q == null ? void 0 : Q.data, F);
        try {
          let x = JSON.parse(Q == null ? void 0 : Q.data);
          console.log("message....parse", { data: x, publish_params: F }), (x == null ? void 0 : x.id) == E || S == (x == null ? void 0 : x.salt) ? (k.onmessage = null, ($t = k == null ? void 0 : k.close) == null || $t.call(k), clearTimeout(q), (x.reConnect || !x.error) && Q1.call(this, x), x.error ? it(x.error) : Tt(x.result)) : console.log("not match");
        } catch (x) {
          console.log(x);
        }
      };
      let j = `${this.connect_direct_link}?startapp=uxuyconnect_${ke.encodeTelegramUrlParameters(Z)}`;
      if (Telegram.WebApp.initData && ((ft = (nt = Telegram == null ? void 0 : Telegram.WebApp) == null ? void 0 : nt.openTelegramLink) == null || ft.call(nt, j)), !Telegram.WebApp.initData) {
        let Q = this.connect_direct_link.match(/t\.me\/([^\/]+)\/([^\/]+)/);
        Q[1] && Q[2] ? !Telegram.WebApp.initData && ke.opendeepLink(`uxuyconnect_${ke.encodeTelegramUrlParameters(Z)}`, { domain: Q[1], appname: Q[2] }) : !Telegram.WebApp.initData && ke.opendeepLink(`uxuyconnect_${ke.encodeTelegramUrlParameters(Z)}`);
      }
    });
  }
  destroyOpenMask() {
    this.disconnect();
  }
  destroyTonkeeper() {
    this.disconnect();
  }
  disconnect() {
    this._account = null, this._accounts = null, this.emit("disconnect", "");
  }
};
var yu = 2;
function eg() {
  var _, E;
  let r3 = ((E = (_ = window.navigator) == null ? void 0 : _.userAgentData) == null ? void 0 : E.platform) || window.navigator.platform, t = window.navigator.userAgent, e = ["macOS", "Macintosh", "MacIntel", "MacPPC", "Mac68K"], f = ["Win32", "Win64", "Windows", "WinCE"], n = ["iPhone"], g = ["iPad", "iPod"], y = null;
  return e.indexOf(r3) !== -1 ? y = "mac" : n.indexOf(r3) !== -1 ? y = "iphone" : g.indexOf(r3) !== -1 ? y = "ipad" : f.indexOf(r3) !== -1 ? y = "windows" : (/Android/.test(t) || /Linux/.test(r3)) && (y = "linux"), y;
}
var ka = () => ({ platform: eg(), appName: ar.name, appVersion: ar.version, maxProtocolVersion: yu, features: ["SendTransaction", { name: "SendTransaction", maxMessages: 4 }] }), Fn = (r3) => {
  var t;
  return { event: "connect_error", payload: { code: (t = r3.code) != null ? t : 0, message: r3.message } };
}, rg = (r3) => {
  switch (r3) {
    case 1001:
      return 100;
    case 1002:
      return 300;
    default:
      return 0;
  }
}, In = class {
  constructor(t, e) {
    this.provider = t;
    this.callbacks = [];
    this.deviceInfo = ka();
    this.walletInfo = { name: "UxuyWallet", image: ar.logo, tondns: "", about_url: "https://www.uxuy.com" };
    this.protocolVersion = yu;
    this.isWalletBrowser = false;
    this.isUxuyWallet = true;
    this.isInUxuyApp = wr();
    this.listen = (t2) => (this.callbacks.push(t2), () => {
      this.callbacks = this.callbacks.filter((e2) => e2 != t2);
    });
    this.notify = (t2) => (this.callbacks.forEach((e2) => e2(t2)), t2);
    e ? this.callbacks = e.callbacks : (t.on("chainChanged", () => {
      this.notify({ event: "disconnect", id: Date.now(), payload: {} });
    }), t.on("tonConnect_event", (f) => {
      var n;
      this.notify({ event: f.event, id: (n = f.id) != null ? n : Date.now(), payload: f.payload });
    }));
  }
  async connect(t, e) {
    var f;
    if (t > this.protocolVersion)
      return this.notify(Fn(new Zr("Unsupported protocol version", 1)));
    try {
      let n = await this.provider.send("tonConnect_connect", e);
      return this.notify({ event: "connect", id: Date.now(), payload: { items: n, device: ka() } });
    } catch (n) {
      return n instanceof Zr ? this.notify(Fn(n)) : this.notify(Fn(new Zr((f = n.message) != null ? f : "Unknown error", rg(n.code))));
    }
  }
  async disconnect() {
    return await this.provider.send("tonConnect_disconnect"), this.notify({ event: "disconnect", id: Date.now(), payload: {} });
  }
  async restoreConnection() {
    var t;
    try {
      let e = await this.provider.send("tonConnect_reconnect", [{ name: "ton_addr" }]);
      return this.notify({ event: "connect", id: Date.now(), payload: { items: e, device: ka() } });
    } catch (e) {
      return e instanceof Zr ? this.notify(Fn(e)) : this.notify(Fn(new Zr((t = e.message) != null ? t : "Unknown error")));
    }
  }
  async send(t) {
    try {
      return { result: await this.provider.send(`tonConnect_${t.method}`, t.params), id: String(t.id) };
    } catch (e) {
      return { error: e, id: String(t.id) };
    }
  }
};
var Ho = Ue(Xn());
var Ga = Ue(xu());
function ig(r3) {
  if (r3.length >= 255)
    throw new TypeError("Alphabet too long");
  let t = new Uint8Array(256);
  for (let S = 0; S < t.length; S++)
    t[S] = 255;
  for (let S = 0; S < r3.length; S++) {
    let I = r3.charAt(S), F = I.charCodeAt(0);
    if (t[F] !== 255)
      throw new TypeError(I + " is ambiguous");
    t[F] = S;
  }
  let e = r3.length, f = r3.charAt(0), n = Math.log(e) / Math.log(256), g = Math.log(256) / Math.log(e);
  function y(S) {
    if (S instanceof Uint8Array || (ArrayBuffer.isView(S) ? S = new Uint8Array(S.buffer, S.byteOffset, S.byteLength) : Array.isArray(S) && (S = Uint8Array.from(S))), !(S instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (S.length === 0)
      return "";
    let I = 0, F = 0, P = 0, Y = S.length;
    for (; P !== Y && S[P] === 0; )
      P++, I++;
    let K = (Y - P) * g + 1 >>> 0, Z = new Uint8Array(K);
    for (; P !== Y; ) {
      let it = S[P], q = 0;
      for (let j = K - 1; (it !== 0 || q < F) && j !== -1; j--, q++)
        it += 256 * Z[j] >>> 0, Z[j] = it % e >>> 0, it = it / e >>> 0;
      if (it !== 0)
        throw new Error("Non-zero carry");
      F = q, P++;
    }
    let k = K - F;
    for (; k !== K && Z[k] === 0; )
      k++;
    let Tt = f.repeat(I);
    for (; k < K; ++k)
      Tt += r3.charAt(Z[k]);
    return Tt;
  }
  function _(S) {
    if (typeof S != "string")
      throw new TypeError("Expected String");
    if (S.length === 0)
      return new Uint8Array();
    let I = 0, F = 0, P = 0;
    for (; S[I] === f; )
      F++, I++;
    let Y = (S.length - I) * n + 1 >>> 0, K = new Uint8Array(Y);
    for (; S[I]; ) {
      let it = t[S.charCodeAt(I)];
      if (it === 255)
        return;
      let q = 0;
      for (let j = Y - 1; (it !== 0 || q < P) && j !== -1; j--, q++)
        it += e * K[j] >>> 0, K[j] = it % 256 >>> 0, it = it / 256 >>> 0;
      if (it !== 0)
        throw new Error("Non-zero carry");
      P = q, I++;
    }
    let Z = Y - P;
    for (; Z !== Y && K[Z] === 0; )
      Z++;
    let k = new Uint8Array(F + (Y - Z)), Tt = F;
    for (; Z !== Y; )
      k[Tt++] = K[Z++];
    return k;
  }
  function E(S) {
    let I = _(S);
    if (I)
      return I;
    throw new Error("Non-base" + e + " character");
  }
  return { encode: y, decodeUnsafe: _, decode: E };
}
var Mu = ig;
var ng = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", Wa = Mu(ng);
var Gi = Ue(Du()), Ko = /* @__PURE__ */ new Map(), Ja = class {
  constructor(t) {
    Object.assign(this, t);
  }
  encode() {
    return Buffer.from((0, Gi.serialize)(Ko, this));
  }
  static decode(t) {
    return (0, Gi.deserialize)(Ko, this, t);
  }
  static decodeUnchecked(t) {
    return (0, Gi.deserializeUnchecked)(Ko, this, t);
  }
};
var Va = 32;
function Ag(r3) {
  return r3._bn !== void 0;
}
var Ou = 1, Vi = class Vi2 extends Ja {
  constructor(e) {
    super({});
    if (Ag(e))
      this._bn = e._bn;
    else {
      if (typeof e == "string") {
        let f = Wa.decode(e);
        if (f.length != Va)
          throw new Error("Invalid public key input");
        this._bn = new Ga.default(f);
      } else
        this._bn = new Ga.default(e);
      if (this._bn.byteLength() > Va)
        throw new Error("Invalid public key input");
    }
  }
  static unique() {
    let e = new Vi2(Ou);
    return Ou += 1, new Vi2(e.toBuffer());
  }
  equals(e) {
    return this._bn.eq(e._bn);
  }
  toBase58() {
    return Wa.encode(this.toBytes());
  }
  toJSON() {
    return this.toBase58();
  }
  toBytes() {
    let e = this.toBuffer();
    return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
  }
  toBuffer() {
    let e = this._bn.toArrayLike(Buffer);
    if (e.length === Va)
      return e;
    let f = Buffer.alloc(32);
    return e.copy(f, 32 - e.length), f;
  }
  get [Symbol.toStringTag]() {
    return `PublicKey(${this.toString()})`;
  }
  toString() {
    return this.toBase58();
  }
};
Vi.default = new Vi("11111111111111111111111111111111");
var Nn = Vi;
Ko.set(Nn, { kind: "struct", fields: [["_bn", "u256"]] });
var pi = (0, Ho.debug)("uxuy:SolanaProvider"), _g = (0, Ho.debug)("uxuy:SolanaProvider:error");
(0, Ho.debug)("uxuy:SolanaProvider:warn");
var Ji = { address: "", chainId: 6000001, chainKey: "solana", alliance: "sol", chainName: "Solana netWork", chainSymbol: "SOL" };
function Lu(r3, t = "sol") {
  return r3 && Object.keys(r3).forEach((e) => {
    var f;
    ((f = r3[e]) == null ? void 0 : f.alliance) != t && delete r3[e];
  }), r3;
}
var Xa = class {
  constructor() {
    this.prefix = "tg-uxuy-wallet-sol";
  }
  get(t) {
    try {
      let e = localStorage.getItem(`${this.prefix}${t}`);
      return e ? JSON.parse(e) : null;
    } catch (e) {
      return _g(e), null;
    }
  }
  set(t, e) {
    try {
      return localStorage.setItem(`${this.prefix}${t}`, JSON.stringify(e)), e;
    } catch (f) {
      return null;
    }
  }
};
function Eg(r3) {
  var y, _;
  pi("ProxyResponse", r3);
  let { method: t, config: e, params: f, result: n } = r3 || {};
  ((y = e == null ? void 0 : e.params) == null ? void 0 : y[0]) || {};
  if (e) {
    let E = Lu(e == null ? void 0 : e.accounts);
    switch (E && (this._accounts = E), t) {
      case "eth_requestAccounts":
      case "DAPP_CONNECT_ACCOUNTS":
        this._account = this._accounts[(_ = this._account) == null ? void 0 : _.chainKey] || Object.values(this._accounts)[0];
        break;
    }
    return r3;
  }
}
var Cg = (() => {
  let r3 = /* @__PURE__ */ new Map();
  return (t, e, f = 1e3) => {
    if (r3.has(t))
      return r3.has(t);
    let n = e();
    return r3.set(t, n), setTimeout(() => {
      r3.delete(t);
    }, f), n.finally(() => {
      r3.delete(t);
    });
  };
})(), ku = (() => {
  let r3 = 0;
  return function(t = 60 * 1e3) {
    return (/* @__PURE__ */ new Date()).getTime() - r3 > t ? () => {
      r3 = (/* @__PURE__ */ new Date()).getTime();
    } : false;
  };
})(), Yo = class extends Rr {
  constructor(e) {
    super({ protocol: "sol" });
    this.nextJsonRpcId = 0;
    this.isUxuyWallet = true;
    this.isInUxuyApp = wr();
    this.log = pi;
    this._isUnlocked = true;
    this._initialized = false;
    this._isConnected = false;
    this.autoApproved = false;
    this.network = "mainnet-beta";
    this.isMathWallet = true;
    this.isPhantom = true;
    this._connetedCount = 0;
    this.version = this.getAppInfo().version, this.connectUrl = e.connect, this.bridgeUrl = e.bridge, this.connect_direct_link = e.connect_direct_link, this.eventTimeout = (e == null ? void 0 : e.eventTimeout) || 6e4 * 10, this.metaData = e == null ? void 0 : e.metaData, this.storage = new Xa(), this._initialize();
  }
  get _lastTime() {
    return isNaN(Number(this.storage.get("lastTime") || 0)) ? 0 : Number(this.storage.get("lastTime") || 0);
  }
  set _lastTime(e) {
    this.storage.set("lastTime", e);
  }
  get _account() {
    return this.storage.get("account") || Ji;
  }
  set _account(e) {
    let f = { ...this._account || Ji };
    e || (e = { ...f, address: "" }, this._tonConnectReply = null), this.storage.set("account", e), ro(f == null ? void 0 : f.chainId) != ro(e == null ? void 0 : e.chainId) && (this.emit("chainChanged", this == null ? void 0 : this.chainId, e == null ? void 0 : e.alliance, e), this.emit("networkChanged", parseInt(this == null ? void 0 : this.chainId), e == null ? void 0 : e.alliance)), (f == null ? void 0 : f.address) != (e == null ? void 0 : e.address) && this.emit("accountsChanged", e != null && e.address ? [e == null ? void 0 : e.address] : []);
  }
  get _accounts() {
    return this.storage.get("accounts") || { ton: Ji };
  }
  set _accounts(e) {
    this.storage.set("accounts", Lu(e));
  }
  get chainId() {
    var e, f;
    return (e = this._account) != null && e.chainId ? ro((f = this._account) == null ? void 0 : f.chainId) : null;
  }
  get chainKey() {
    var e;
    return ((e = this._account) == null ? void 0 : e.chainKey) || (Ji == null ? void 0 : Ji.chainKey);
  }
  get connected() {
    return this.publicKey != null;
  }
  get isConnected() {
    return this.publicKey != null;
  }
  get publicKey() {
    var e, f;
    return (e = this._account) != null && e.address ? new Nn((f = this._account) == null ? void 0 : f.address) : null;
  }
  _initialize() {
    this._isConnected = true, this._isUnlocked = true, this._initialized = true, this.publicKey && this.emit("connect", Object.assign(this.publicKey || {}, { publicKey: this.publicKey })), this.emit("_initialized");
  }
  getAppInfo() {
    return { ...ar };
  }
  connect(e, f) {
    if (this._connetedCount++, typeof e == "object" && e.onlyIfTrusted && this._connetedCount == 1)
      return Promise.reject({ code: 4001, message: "User rejected the request." });
    console.info("UXUY Wallet Solana Connected", this.connected);
    let n = ku();
    return this.connected && !n ? (this.emit("connect", Object.assign(this.publicKey || {}, { publicKey: this.publicKey })), Promise.resolve(Object.assign(this.publicKey || {}, { publicKey: this.publicKey }))) : this._requesetAccounts("DAPP_CONNECT_ACCOUNTS", { method: "DAPP_CONNECT_ACCOUNTS", params: [{ isPhantom: f }] }).then((g) => this.connected ? (n && (n == null || n()), this.emit("connect", Object.assign(this.publicKey || {}, { publicKey: this.publicKey })), Object.assign(this.publicKey || {}, { publicKey: this.publicKey })) : Promise.reject({ code: 4001, message: "User rejected the request." }));
  }
  async getAccount() {
    return console.info("UXUY Wallet Solana getAccounts", ...arguments), await this._requesetAccounts(an.DAPP_GET_ACCOUNTS, { method: "DAPP_CONNECT_ACCOUNTS", params: [] }), this.publicKey ? this.publicKey.toString() : Promise.reject("Please add SOL in wallet.");
  }
  async signMessage(e) {
    return Object.prototype.toString.call(e) == "[object Uint8Array]" && (e = ah(e)), await this._request("DAPP_SIGN_MESSAGE", [{ method: "signMessage", params: [e] }]).then((f) => ({ publicKey: this.publicKey, signature: fh(f) }));
  }
  async signTransaction(e) {
    console.info("UXUY Wallet Solana signTransaction", ...arguments);
    var f = {};
    f.hex = e.serializeMessage().toString("hex"), f.instructions = [];
    for (var n of e.instructions) {
      var g = [];
      for (var y of n.keys)
        g.push({ pubkey: y.pubkey.toString(), isSigner: y.isSigner, isWritable: y.isWritable });
      f.instructions.push({ data: Buffer.from(n.data).toString("hex"), keys: g, programId: n.programId.toString() });
    }
    console.info("signTransaction", f);
    let _ = { method: "signTransaction", params: [f] };
    return this._request("DAPP_SIGN_TRANSACTION", [_]).then((E) => {
      let S = Buffer.from(E, "hex");
      if (S.length !== 64)
        return reject("Invalid signature");
      let I = e.signatures.findIndex((F) => this.publicKey.toString() == F.publicKey.toString());
      return I < 0 ? reject(`unknown signer: ${this.publicKey.toString()}`) : (e.signatures[I].signature = S, e);
    });
  }
  async signAllTransactions(e) {
    return console.info("signAllTransactions", e), await Promise.all(e.map((f) => this.signTransaction(f)));
  }
  request(e) {
    switch (e.method) {
      case "signMessage":
        return this.signMessage(e.params.message);
      case "signTransaction":
        return this.signTransaction(e.params.message);
      default:
        return this[e.method]();
    }
  }
  async _requesetAccounts(e, f, n = {}, g = false) {
    var _;
    let y = ku();
    return (_ = this == null ? void 0 : this._account) != null && _.address && !y && !g ? [this._account.address] : Cg(e, () => this._request("DAPP_CONNECT_ACCOUNTS", [f], n));
  }
  async _request(e, f, n) {
    let g = this._account, y = (/* @__PURE__ */ new Date()).getTime();
    this._lastTime = y, n = { account: Object.assign(g || {}, { alliance: "sol" }), metaData: Ri(this.metaData), ...n, originPayload: n == null ? void 0 : n.originPayload, timeStamp: y };
    let _ = this.nextJsonRpcId++, E = ((/* @__PURE__ */ new Date()).getTime() + _).toString(), S = `salt-${Date.now()}-${E}`, I = { id: E, method: e, params: f, options: n }, F = { id: I.id, data: I, version: "1.0", salt: S }, P = await Ur.post(`${this.connectUrl}/transaction`, F, { headers: { "X-Salt": S } }), { hash: Y, signature: K } = P.data;
    pi({ hash: Y, signature: K, salt: S });
    let Z = { method: e, params: [S, Y, K] }, k = await new Promise((Tt, it) => {
      let q = new EventSource(`${this.bridgeUrl}/events/${Y}/${K}/${S}`);
      q.onopen = () => {
        q.onopen = null, Tt(q);
      }, q.onerror = (j) => {
        var nt;
        q.onerror = null, (nt = q == null ? void 0 : q.close) == null || nt.call(q), it(j);
      };
    });
    return new Promise((Tt, it) => {
      var ft, Q;
      let q = this.eventTimeout > 0 ? setTimeout(() => {
        var $t, x;
        it(br.invalidRequest({ code: (x = ($t = Mr) == null ? void 0 : $t.rpc) == null ? void 0 : x.timeoutRequest, message: pr.errors.timeOut(e), data: I })), k.close();
      }, this.eventTimeout || 6e4) : null;
      k.onmessage = ($t) => {
        var x;
        pi("message.........", $t == null ? void 0 : $t.data, F);
        try {
          let o = JSON.parse($t == null ? void 0 : $t.data);
          pi("message....parse", { data: o, publish_params: F }), (o == null ? void 0 : o.id) == E || S == (o == null ? void 0 : o.salt) ? (k.onmessage = null, (x = k == null ? void 0 : k.close) == null || x.call(k), clearTimeout(q), (o.reConnect || !o.error) && Eg.call(this, o), o.error ? it(o.error) : Tt(o.result)) : pi("not match");
        } catch (o) {
          pi(o);
        }
      };
      let j = io(), nt = `${this.connect_direct_link}?startapp=uxuyconnect_${ke.encodeTelegramUrlParameters(Z)}`;
      if (j && ((Q = (ft = Telegram == null ? void 0 : Telegram.WebApp) == null ? void 0 : ft.openTelegramLink) == null || Q.call(ft, nt)), !j) {
        let $t = this.connect_direct_link.match(/t\.me\/([^\/]+)\/([^\/]+)/);
        $t[1] && $t[2] ? ke.opendeepLink(`uxuyconnect_${ke.encodeTelegramUrlParameters(Z)}`, { domain: $t[1], appname: $t[2] }) : ke.opendeepLink(`uxuyconnect_${ke.encodeTelegramUrlParameters(Z)}`);
      }
    });
  }
  disconnect() {
    this.log("UXUY Wallet Solana disconnect"), this._account = null, this._accounts = null, this.emit("disconnect");
  }
};
var Bg = ((f) => (f.Invite = "A", f.ReceivePayment = "B", f.Internal = "D", f))(Bg || {}), qu = class {
  constructor() {
  }
  static getUniversalDappLink(t, e = {}, f) {
    return `${(f == null ? void 0 : f.connect_direct_link) || Kr.connect_direct_link}?startapp=D_${ke.encodeTelegramUrlParameters({ url: t, ...e })}`;
  }
  static getUniversalInviteLink({ inviteTgId: t, inviteTgChannel: e }, f) {
    return `${(f == null ? void 0 : f.connect_direct_link) || Kr.connect_direct_link}?startapp=A_${t}${e ? `_${e}` : ""}`;
  }
  static getUniversalReceivePaymentLink(t, { address: e, tokenAddr: f }, n) {
    let g = (n == null ? void 0 : n.connect_direct_link) || Kr.connect_direct_link;
    if (t == "lightning") {
      let [y, _] = e.split("@");
      return `${g}?startapp=B_${y}`;
    } else {
      if (!t)
        throw "no chain_key";
      return `${g}?startapp=B_${e}__${t}${f ? `__${f}` : ""}`;
    }
  }
};
var Qa = class extends Rn {
  constructor(e) {
    super();
    this.isInUxuyApp = wr();
    this.version = ar.version;
    this.getAppInfo = () => ({ ...ar });
    let f = e == null ? void 0 : e.metaData;
    this.connectUrl = (e == null ? void 0 : e.connect) || Kr.connect, this.bridgeUrl = (e == null ? void 0 : e.bridge) || Kr.bridge, this.connect_direct_link = (e == null ? void 0 : e.connect_direct_link) || Kr.connect_direct_link, this.debug = (e == null ? void 0 : e.debug) || false, this.request_timeout = (e == null ? void 0 : e.request_timeout) || 60 * 2e3, this.injected = (e == null ? void 0 : e.injected) || false, this.metaData = { icon: f == null ? void 0 : f.icon, name: f == null ? void 0 : f.name, url: f == null ? void 0 : f.url, direct_link: f == null ? void 0 : f.direct_link, description: f == null ? void 0 : f.description }, this._initialize();
  }
  _initialize() {
    var f, n, g;
    let e = { connect: this.connectUrl, bridge: this.bridgeUrl, connect_direct_link: this.connect_direct_link, metaData: this.metaData, debug: this.debug, request_timeout: this.request_timeout };
    if (this.debug ? (f = localStorage == null ? void 0 : localStorage.setItem) == null || f.call(localStorage, "debug", "uxuy:*") : ((n = localStorage == null ? void 0 : localStorage.getItem) == null ? void 0 : n.call(localStorage, "debug")) == "uxuy:*" && ((g = localStorage == null ? void 0 : localStorage.removeItem) == null || g.call(localStorage, "debug")), this.ethereum = new _o(e), this.ton = new Tn(null, e), this.tonconnect = new In(this.ton, null, e), this.tonProtocolVersion = 2, this.uxuyTonWallet = { provider: this.ton, tonconnect: this.tonconnect }, this.openmask = { provider: this.ton, tonconnect: this.tonconnect }, this.tonkeeper = { provider: this.ton, tonconnect: this.tonconnect }, window.uxuyTonWallet = this.uxuyTonWallet, this.phantom = new Yo(e), this.solana = this.phantom, this.injected) {
      window.ethereum || (window.ethereum = this.ethereum, dispatchEvent(new Event(oo.evm)));
      let y = false;
      window.openmask || (window.tonProtocolVersion = this.tonProtocolVersion, window.ton = this.ton, window.openmask = this.openmask, y = true), window.tonkeeper || (window.tonProtocolVersion = this.tonProtocolVersion, window.tonkeeper = this.tonkeeper, y = true), y && window.dispatchEvent(new Event(oo.ton)), window.solana || (window.solana = this.solana, dispatchEvent(new Event(oo.sol))), window.phantom || (window.phantom = this.phantom);
    }
    this.emit("_initialized");
  }
}, x4 = { WalletTgSdk: Qa };
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
export {
  wv as AddressString,
  xv as BigIntString,
  As as CHAIN_IDS,
  sn as ChainKey,
  lh as ChainKey_EXT,
  an as DAPP_METHODS,
  yv as HexString,
  Mv as IntNumber,
  no as OpaqueType,
  qu as OpenLink,
  Bi as PROVIDER_ALLIANCE,
  oo as PROVIDER_INITIALIZED_EVENT_NAME,
  bv as RegExpString,
  Qa as WalletTgSdk,
  x4 as default,
  Bg as tgLinkType
};
