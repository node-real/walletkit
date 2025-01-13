var yu = Object.create;
var Wi = Object.defineProperty;
var vu = Object.getOwnPropertyDescriptor;
var wu = Object.getOwnPropertyNames;
var bu = Object.getPrototypeOf, xu = Object.prototype.hasOwnProperty;
var ye = (r2, e) => () => (e || r2((e = { exports: {} }).exports, e), e.exports), Mu = (r2, e) => {
  for (var t in e)
    Wi(r2, t, { get: e[t], enumerable: true });
}, Au = (r2, e, t, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let i of wu(e))
      !xu.call(r2, i) && i !== t && Wi(r2, i, { get: () => e[i], enumerable: !(n = vu(e, i)) || n.enumerable });
  return r2;
};
var pr = (r2, e, t) => (t = r2 != null ? yu(bu(r2)) : {}, Au(e || !r2 || !r2.__esModule ? Wi(t, "default", { value: r2, enumerable: true }) : t, r2));
var Ss = ye((vd, qi) => {
  var _u = Object.prototype.hasOwnProperty, lt = "~";
  function on() {
  }
  Object.create && (on.prototype = /* @__PURE__ */ Object.create(null), new on().__proto__ || (lt = false));
  function Eu(r2, e, t) {
    this.fn = r2, this.context = e, this.once = t || false;
  }
  function Es(r2, e, t, n, i) {
    if (typeof t != "function")
      throw new TypeError("The listener must be a function");
    var l = new Eu(t, n || r2, i), h = lt ? lt + e : e;
    return r2._events[h] ? r2._events[h].fn ? r2._events[h] = [r2._events[h], l] : r2._events[h].push(l) : (r2._events[h] = l, r2._eventsCount++), r2;
  }
  function On(r2, e) {
    --r2._eventsCount === 0 ? r2._events = new on() : delete r2._events[e];
  }
  function at() {
    this._events = new on(), this._eventsCount = 0;
  }
  at.prototype.eventNames = function() {
    var e = [], t, n;
    if (this._eventsCount === 0)
      return e;
    for (n in t = this._events)
      _u.call(t, n) && e.push(lt ? n.slice(1) : n);
    return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
  };
  at.prototype.listeners = function(e) {
    var t = lt ? lt + e : e, n = this._events[t];
    if (!n)
      return [];
    if (n.fn)
      return [n.fn];
    for (var i = 0, l = n.length, h = new Array(l); i < l; i++)
      h[i] = n[i].fn;
    return h;
  };
  at.prototype.listenerCount = function(e) {
    var t = lt ? lt + e : e, n = this._events[t];
    return n ? n.fn ? 1 : n.length : 0;
  };
  at.prototype.emit = function(e, t, n, i, l, h) {
    var g = lt ? lt + e : e;
    if (!this._events[g])
      return false;
    var v = this._events[g], b = arguments.length, x, A;
    if (v.fn) {
      switch (v.once && this.removeListener(e, v.fn, void 0, true), b) {
        case 1:
          return v.fn.call(v.context), true;
        case 2:
          return v.fn.call(v.context, t), true;
        case 3:
          return v.fn.call(v.context, t, n), true;
        case 4:
          return v.fn.call(v.context, t, n, i), true;
        case 5:
          return v.fn.call(v.context, t, n, i, l), true;
        case 6:
          return v.fn.call(v.context, t, n, i, l, h), true;
      }
      for (A = 1, x = new Array(b - 1); A < b; A++)
        x[A - 1] = arguments[A];
      v.fn.apply(v.context, x);
    } else {
      var O = v.length, k;
      for (A = 0; A < O; A++)
        switch (v[A].once && this.removeListener(e, v[A].fn, void 0, true), b) {
          case 1:
            v[A].fn.call(v[A].context);
            break;
          case 2:
            v[A].fn.call(v[A].context, t);
            break;
          case 3:
            v[A].fn.call(v[A].context, t, n);
            break;
          case 4:
            v[A].fn.call(v[A].context, t, n, i);
            break;
          default:
            if (!x)
              for (k = 1, x = new Array(b - 1); k < b; k++)
                x[k - 1] = arguments[k];
            v[A].fn.apply(v[A].context, x);
        }
    }
    return true;
  };
  at.prototype.on = function(e, t, n) {
    return Es(this, e, t, n, false);
  };
  at.prototype.once = function(e, t, n) {
    return Es(this, e, t, n, true);
  };
  at.prototype.removeListener = function(e, t, n, i) {
    var l = lt ? lt + e : e;
    if (!this._events[l])
      return this;
    if (!t)
      return On(this, l), this;
    var h = this._events[l];
    if (h.fn)
      h.fn === t && (!i || h.once) && (!n || h.context === n) && On(this, l);
    else {
      for (var g = 0, v = [], b = h.length; g < b; g++)
        (h[g].fn !== t || i && !h[g].once || n && h[g].context !== n) && v.push(h[g]);
      v.length ? this._events[l] = v.length === 1 ? v[0] : v : On(this, l);
    }
    return this;
  };
  at.prototype.removeAllListeners = function(e) {
    var t;
    return e ? (t = lt ? lt + e : e, this._events[t] && On(this, t)) : (this._events = new on(), this._eventsCount = 0), this;
  };
  at.prototype.off = at.prototype.removeListener;
  at.prototype.addListener = at.prototype.on;
  at.prefixed = lt;
  at.EventEmitter = at;
  typeof qi != "undefined" && (qi.exports = at);
});
var Ps = ye((bd, Os) => {
  Os.exports = Error;
});
var Ns = ye((xd, Cs) => {
  Cs.exports = EvalError;
});
var Us = ye((Md, ks) => {
  ks.exports = RangeError;
});
var Rs = ye((Ad, Bs) => {
  Bs.exports = ReferenceError;
});
var zi = ye((_d, Fs) => {
  Fs.exports = SyntaxError;
});
var Or = ye((Ed, Ds) => {
  Ds.exports = TypeError;
});
var Ws = ye((Sd, Ls) => {
  Ls.exports = URIError;
});
var zs = ye((Td, qs) => {
  qs.exports = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return false;
    if (typeof Symbol.iterator == "symbol")
      return true;
    var e = {}, t = Symbol("test"), n = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
      return false;
    var i = 42;
    e[t] = i;
    for (t in e)
      return false;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return false;
    var l = Object.getOwnPropertySymbols(e);
    if (l.length !== 1 || l[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return false;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var h = Object.getOwnPropertyDescriptor(e, t);
      if (h.value !== i || h.enumerable !== true)
        return false;
    }
    return true;
  };
});
var Vs = ye((Id, $s) => {
  var js = typeof Symbol != "undefined" && Symbol, Su = zs();
  $s.exports = function() {
    return typeof js != "function" || typeof Symbol != "function" || typeof js("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? false : Su();
  };
});
var Ks = ye((Od, Ys) => {
  var ji = { __proto__: null, foo: {} }, Tu = Object;
  Ys.exports = function() {
    return { __proto__: ji }.foo === ji.foo && !(ji instanceof Tu);
  };
});
var Js = ye((Pd, Hs) => {
  var Iu = "Function.prototype.bind called on incompatible ", Ou = Object.prototype.toString, Pu = Math.max, Cu = "[object Function]", Gs = function(e, t) {
    for (var n = [], i = 0; i < e.length; i += 1)
      n[i] = e[i];
    for (var l = 0; l < t.length; l += 1)
      n[l + e.length] = t[l];
    return n;
  }, Nu = function(e, t) {
    for (var n = [], i = t || 0, l = 0; i < e.length; i += 1, l += 1)
      n[l] = e[i];
    return n;
  }, ku = function(r2, e) {
    for (var t = "", n = 0; n < r2.length; n += 1)
      t += r2[n], n + 1 < r2.length && (t += e);
    return t;
  };
  Hs.exports = function(e) {
    var t = this;
    if (typeof t != "function" || Ou.apply(t) !== Cu)
      throw new TypeError(Iu + t);
    for (var n = Nu(arguments, 1), i, l = function() {
      if (this instanceof i) {
        var x = t.apply(this, Gs(n, arguments));
        return Object(x) === x ? x : this;
      }
      return t.apply(e, Gs(n, arguments));
    }, h = Pu(0, t.length - n.length), g = [], v = 0; v < h; v++)
      g[v] = "$" + v;
    if (i = Function("binder", "return function (" + ku(g, ",") + "){ return binder.apply(this,arguments); }")(l), t.prototype) {
      var b = function() {
      };
      b.prototype = t.prototype, i.prototype = new b(), b.prototype = null;
    }
    return i;
  };
});
var Cn = ye((Cd, Zs) => {
  var Uu = Js();
  Zs.exports = Function.prototype.bind || Uu;
});
var Xs = ye((Nd, Qs) => {
  var Bu = Function.prototype.call, Ru = Object.prototype.hasOwnProperty, Fu = Cn();
  Qs.exports = Fu.call(Bu, Ru);
});
var gr = ye((kd, ia) => {
  var Se, Du = Ps(), Lu = Ns(), Wu = Us(), qu = Rs(), kr = zi(), Nr = Or(), zu = Ws(), na = Function, $i = function(r2) {
    try {
      return na('"use strict"; return (' + r2 + ").constructor;")();
    } catch (e) {
    }
  }, dr = Object.getOwnPropertyDescriptor;
  if (dr)
    try {
      dr({}, "");
    } catch (r2) {
      dr = null;
    }
  var Vi = function() {
    throw new Nr();
  }, ju = dr ? function() {
    try {
      return arguments.callee, Vi;
    } catch (r2) {
      try {
        return dr(arguments, "callee").get;
      } catch (e) {
        return Vi;
      }
    }
  }() : Vi, Pr = Vs()(), $u = Ks()(), nt = Object.getPrototypeOf || ($u ? function(r2) {
    return r2.__proto__;
  } : null), Cr = {}, Vu = typeof Uint8Array == "undefined" || !nt ? Se : nt(Uint8Array), mr = { __proto__: null, "%AggregateError%": typeof AggregateError == "undefined" ? Se : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer == "undefined" ? Se : ArrayBuffer, "%ArrayIteratorPrototype%": Pr && nt ? nt([][Symbol.iterator]()) : Se, "%AsyncFromSyncIteratorPrototype%": Se, "%AsyncFunction%": Cr, "%AsyncGenerator%": Cr, "%AsyncGeneratorFunction%": Cr, "%AsyncIteratorPrototype%": Cr, "%Atomics%": typeof Atomics == "undefined" ? Se : Atomics, "%BigInt%": typeof BigInt == "undefined" ? Se : BigInt, "%BigInt64Array%": typeof BigInt64Array == "undefined" ? Se : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array == "undefined" ? Se : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView == "undefined" ? Se : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Du, "%eval%": eval, "%EvalError%": Lu, "%Float32Array%": typeof Float32Array == "undefined" ? Se : Float32Array, "%Float64Array%": typeof Float64Array == "undefined" ? Se : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry == "undefined" ? Se : FinalizationRegistry, "%Function%": na, "%GeneratorFunction%": Cr, "%Int8Array%": typeof Int8Array == "undefined" ? Se : Int8Array, "%Int16Array%": typeof Int16Array == "undefined" ? Se : Int16Array, "%Int32Array%": typeof Int32Array == "undefined" ? Se : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": Pr && nt ? nt(nt([][Symbol.iterator]())) : Se, "%JSON%": typeof JSON == "object" ? JSON : Se, "%Map%": typeof Map == "undefined" ? Se : Map, "%MapIteratorPrototype%": typeof Map == "undefined" || !Pr || !nt ? Se : nt((/* @__PURE__ */ new Map())[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise == "undefined" ? Se : Promise, "%Proxy%": typeof Proxy == "undefined" ? Se : Proxy, "%RangeError%": Wu, "%ReferenceError%": qu, "%Reflect%": typeof Reflect == "undefined" ? Se : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set == "undefined" ? Se : Set, "%SetIteratorPrototype%": typeof Set == "undefined" || !Pr || !nt ? Se : nt((/* @__PURE__ */ new Set())[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer == "undefined" ? Se : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": Pr && nt ? nt(""[Symbol.iterator]()) : Se, "%Symbol%": Pr ? Symbol : Se, "%SyntaxError%": kr, "%ThrowTypeError%": ju, "%TypedArray%": Vu, "%TypeError%": Nr, "%Uint8Array%": typeof Uint8Array == "undefined" ? Se : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray == "undefined" ? Se : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array == "undefined" ? Se : Uint16Array, "%Uint32Array%": typeof Uint32Array == "undefined" ? Se : Uint32Array, "%URIError%": zu, "%WeakMap%": typeof WeakMap == "undefined" ? Se : WeakMap, "%WeakRef%": typeof WeakRef == "undefined" ? Se : WeakRef, "%WeakSet%": typeof WeakSet == "undefined" ? Se : WeakSet };
  if (nt)
    try {
      null.error;
    } catch (r2) {
      ea = nt(nt(r2)), mr["%Error.prototype%"] = ea;
    }
  var ea, Yu = function r2(e) {
    var t;
    if (e === "%AsyncFunction%")
      t = $i("async function () {}");
    else if (e === "%GeneratorFunction%")
      t = $i("function* () {}");
    else if (e === "%AsyncGeneratorFunction%")
      t = $i("async function* () {}");
    else if (e === "%AsyncGenerator%") {
      var n = r2("%AsyncGeneratorFunction%");
      n && (t = n.prototype);
    } else if (e === "%AsyncIteratorPrototype%") {
      var i = r2("%AsyncGenerator%");
      i && nt && (t = nt(i.prototype));
    }
    return mr[e] = t, t;
  }, ta = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, sn = Cn(), Nn = Xs(), Ku = sn.call(Function.call, Array.prototype.concat), Gu = sn.call(Function.apply, Array.prototype.splice), ra = sn.call(Function.call, String.prototype.replace), kn = sn.call(Function.call, String.prototype.slice), Hu = sn.call(Function.call, RegExp.prototype.exec), Ju = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Zu = /\\(\\)?/g, Qu = function(e) {
    var t = kn(e, 0, 1), n = kn(e, -1);
    if (t === "%" && n !== "%")
      throw new kr("invalid intrinsic syntax, expected closing `%`");
    if (n === "%" && t !== "%")
      throw new kr("invalid intrinsic syntax, expected opening `%`");
    var i = [];
    return ra(e, Ju, function(l, h, g, v) {
      i[i.length] = g ? ra(v, Zu, "$1") : h || l;
    }), i;
  }, Xu = function(e, t) {
    var n = e, i;
    if (Nn(ta, n) && (i = ta[n], n = "%" + i[0] + "%"), Nn(mr, n)) {
      var l = mr[n];
      if (l === Cr && (l = Yu(n)), typeof l == "undefined" && !t)
        throw new Nr("intrinsic " + e + " exists, but is not available. Please file an issue!");
      return { alias: i, name: n, value: l };
    }
    throw new kr("intrinsic " + e + " does not exist!");
  };
  ia.exports = function(e, t) {
    if (typeof e != "string" || e.length === 0)
      throw new Nr("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof t != "boolean")
      throw new Nr('"allowMissing" argument must be a boolean');
    if (Hu(/^%?[^%]*%?$/, e) === null)
      throw new kr("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var n = Qu(e), i = n.length > 0 ? n[0] : "", l = Xu("%" + i + "%", t), h = l.name, g = l.value, v = false, b = l.alias;
    b && (i = b[0], Gu(n, Ku([0, 1], b)));
    for (var x = 1, A = true; x < n.length; x += 1) {
      var O = n[x], k = kn(O, 0, 1), N = kn(O, -1);
      if ((k === '"' || k === "'" || k === "`" || N === '"' || N === "'" || N === "`") && k !== N)
        throw new kr("property names with quotes must have matching quotes");
      if ((O === "constructor" || !A) && (v = true), i += "." + O, h = "%" + i + "%", Nn(mr, h))
        g = mr[h];
      else if (g != null) {
        if (!(O in g)) {
          if (!t)
            throw new Nr("base intrinsic for " + e + " exists, but the property is not available.");
          return;
        }
        if (dr && x + 1 >= n.length) {
          var q = dr(g, O);
          A = !!q, A && "get" in q && !("originalValue" in q.get) ? g = q.get : g = g[O];
        } else
          A = Nn(g, O), g = g[O];
        A && !v && (mr[h] = g);
      }
    }
    return g;
  };
});
var Bn = ye((Ud, oa) => {
  var ec = gr(), Un = ec("%Object.defineProperty%", true) || false;
  if (Un)
    try {
      Un({}, "a", { value: 1 });
    } catch (r2) {
      Un = false;
    }
  oa.exports = Un;
});
var Yi = ye((Bd, sa) => {
  var tc = gr(), Rn = tc("%Object.getOwnPropertyDescriptor%", true);
  if (Rn)
    try {
      Rn([], "length");
    } catch (r2) {
      Rn = null;
    }
  sa.exports = Rn;
});
var ua = ye((Rd, la) => {
  var aa = Bn(), rc = zi(), Ur = Or(), fa = Yi();
  la.exports = function(e, t, n) {
    if (!e || typeof e != "object" && typeof e != "function")
      throw new Ur("`obj` must be an object or a function`");
    if (typeof t != "string" && typeof t != "symbol")
      throw new Ur("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new Ur("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new Ur("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new Ur("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new Ur("`loose`, if provided, must be a boolean");
    var i = arguments.length > 3 ? arguments[3] : null, l = arguments.length > 4 ? arguments[4] : null, h = arguments.length > 5 ? arguments[5] : null, g = arguments.length > 6 ? arguments[6] : false, v = !!fa && fa(e, t);
    if (aa)
      aa(e, t, { configurable: h === null && v ? v.configurable : !h, enumerable: i === null && v ? v.enumerable : !i, value: n, writable: l === null && v ? v.writable : !l });
    else if (g || !i && !l && !h)
      e[t] = n;
    else
      throw new rc("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var pa = ye((Fd, ha) => {
  var Ki = Bn(), ca = function() {
    return !!Ki;
  };
  ca.hasArrayLengthDefineBug = function() {
    if (!Ki)
      return null;
    try {
      return Ki([], "length", { value: 1 }).length !== 1;
    } catch (e) {
      return true;
    }
  };
  ha.exports = ca;
});
var va = ye((Dd, ya) => {
  var nc = gr(), da = ua(), ic = pa()(), ma = Yi(), ga = Or(), oc = nc("%Math.floor%");
  ya.exports = function(e, t) {
    if (typeof e != "function")
      throw new ga("`fn` is not a function");
    if (typeof t != "number" || t < 0 || t > 4294967295 || oc(t) !== t)
      throw new ga("`length` must be a positive 32-bit integer");
    var n = arguments.length > 2 && !!arguments[2], i = true, l = true;
    if ("length" in e && ma) {
      var h = ma(e, "length");
      h && !h.configurable && (i = false), h && !h.writable && (l = false);
    }
    return (i || l || !n) && (ic ? da(e, "length", t, true, true) : da(e, "length", t)), e;
  };
});
var _a = ye((Ld, Fn) => {
  var Gi = Cn(), Dn = gr(), sc = va(), ac = Or(), xa = Dn("%Function.prototype.apply%"), Ma = Dn("%Function.prototype.call%"), Aa = Dn("%Reflect.apply%", true) || Gi.call(Ma, xa), wa = Bn(), fc = Dn("%Math.max%");
  Fn.exports = function(e) {
    if (typeof e != "function")
      throw new ac("a function is required");
    var t = Aa(Gi, Ma, arguments);
    return sc(t, 1 + fc(0, e.length - (arguments.length - 1)), true);
  };
  var ba = function() {
    return Aa(Gi, xa, arguments);
  };
  wa ? wa(Fn.exports, "apply", { value: ba }) : Fn.exports.apply = ba;
});
var Ia = ye((Wd, Ta) => {
  var Ea = gr(), Sa = _a(), lc = Sa(Ea("String.prototype.indexOf"));
  Ta.exports = function(e, t) {
    var n = Ea(e, !!t);
    return typeof n == "function" && lc(e, ".prototype.") > -1 ? Sa(n) : n;
  };
});
var Oa = ye(() => {
});
var Ha = ye((jd, Ga) => {
  var io = typeof Map == "function" && Map.prototype, Hi = Object.getOwnPropertyDescriptor && io ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Wn = io && Hi && typeof Hi.get == "function" ? Hi.get : null, Pa = io && Map.prototype.forEach, oo = typeof Set == "function" && Set.prototype, Ji = Object.getOwnPropertyDescriptor && oo ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, qn = oo && Ji && typeof Ji.get == "function" ? Ji.get : null, Ca = oo && Set.prototype.forEach, uc = typeof WeakMap == "function" && WeakMap.prototype, fn = uc ? WeakMap.prototype.has : null, cc = typeof WeakSet == "function" && WeakSet.prototype, ln = cc ? WeakSet.prototype.has : null, hc = typeof WeakRef == "function" && WeakRef.prototype, Na = hc ? WeakRef.prototype.deref : null, pc = Boolean.prototype.valueOf, dc = Object.prototype.toString, mc = Function.prototype.toString, gc = String.prototype.match, so = String.prototype.slice, Lt = String.prototype.replace, yc = String.prototype.toUpperCase, ka = String.prototype.toLowerCase, za = RegExp.prototype.test, Ua = Array.prototype.concat, bt = Array.prototype.join, vc = Array.prototype.slice, Ba = Math.floor, Xi = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, Zi = Object.getOwnPropertySymbols, eo = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Br = typeof Symbol == "function" && typeof Symbol.iterator == "object", ft = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Br || "symbol") ? Symbol.toStringTag : null, ja = Object.prototype.propertyIsEnumerable, Ra = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(r2) {
    return r2.__proto__;
  } : null);
  function Fa(r2, e) {
    if (r2 === 1 / 0 || r2 === -1 / 0 || r2 !== r2 || r2 && r2 > -1e3 && r2 < 1e3 || za.call(/e/, e))
      return e;
    var t = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof r2 == "number") {
      var n = r2 < 0 ? -Ba(-r2) : Ba(r2);
      if (n !== r2) {
        var i = String(n), l = so.call(e, i.length + 1);
        return Lt.call(i, t, "$&_") + "." + Lt.call(Lt.call(l, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return Lt.call(e, t, "$&_");
  }
  var to = Oa(), Da = to.custom, La = Va(Da) ? Da : null;
  Ga.exports = function r2(e, t, n, i) {
    var l = t || {};
    if (Dt(l, "quoteStyle") && l.quoteStyle !== "single" && l.quoteStyle !== "double")
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (Dt(l, "maxStringLength") && (typeof l.maxStringLength == "number" ? l.maxStringLength < 0 && l.maxStringLength !== 1 / 0 : l.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var h = Dt(l, "customInspect") ? l.customInspect : true;
    if (typeof h != "boolean" && h !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (Dt(l, "indent") && l.indent !== null && l.indent !== "	" && !(parseInt(l.indent, 10) === l.indent && l.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (Dt(l, "numericSeparator") && typeof l.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var g = l.numericSeparator;
    if (typeof e == "undefined")
      return "undefined";
    if (e === null)
      return "null";
    if (typeof e == "boolean")
      return e ? "true" : "false";
    if (typeof e == "string")
      return Ka(e, l);
    if (typeof e == "number") {
      if (e === 0)
        return 1 / 0 / e > 0 ? "0" : "-0";
      var v = String(e);
      return g ? Fa(e, v) : v;
    }
    if (typeof e == "bigint") {
      var b = String(e) + "n";
      return g ? Fa(e, b) : b;
    }
    var x = typeof l.depth == "undefined" ? 5 : l.depth;
    if (typeof n == "undefined" && (n = 0), n >= x && x > 0 && typeof e == "object")
      return ro(e) ? "[Array]" : "[Object]";
    var A = Rc(l, n);
    if (typeof i == "undefined")
      i = [];
    else if (Ya(i, e) >= 0)
      return "[Circular]";
    function O(s, o, a) {
      if (o && (i = vc.call(i), i.push(o)), a) {
        var c = { depth: l.depth };
        return Dt(l, "quoteStyle") && (c.quoteStyle = l.quoteStyle), r2(s, c, n + 1, i);
      }
      return r2(s, l, n + 1, i);
    }
    if (typeof e == "function" && !Wa(e)) {
      var k = Tc(e), N = Ln(e, O);
      return "[Function" + (k ? ": " + k : " (anonymous)") + "]" + (N.length > 0 ? " { " + bt.call(N, ", ") + " }" : "");
    }
    if (Va(e)) {
      var q = Br ? Lt.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : eo.call(e);
      return typeof e == "object" && !Br ? an(q) : q;
    }
    if (kc(e)) {
      for (var C = "<" + ka.call(String(e.nodeName)), J = e.attributes || [], K = 0; K < J.length; K++)
        C += " " + J[K].name + "=" + $a(wc(J[K].value), "double", l);
      return C += ">", e.childNodes && e.childNodes.length && (C += "..."), C += "</" + ka.call(String(e.nodeName)) + ">", C;
    }
    if (ro(e)) {
      if (e.length === 0)
        return "[]";
      var T = Ln(e, O);
      return A && !Bc(T) ? "[" + no(T, A) + "]" : "[ " + bt.call(T, ", ") + " ]";
    }
    if (xc(e)) {
      var I = Ln(e, O);
      return !("cause" in Error.prototype) && "cause" in e && !ja.call(e, "cause") ? "{ [" + String(e) + "] " + bt.call(Ua.call("[cause]: " + O(e.cause), I), ", ") + " }" : I.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + bt.call(I, ", ") + " }";
    }
    if (typeof e == "object" && h) {
      if (La && typeof e[La] == "function" && to)
        return to(e, { depth: x - n });
      if (h !== "symbol" && typeof e.inspect == "function")
        return e.inspect();
    }
    if (Ic(e)) {
      var L = [];
      return Pa && Pa.call(e, function(s, o) {
        L.push(O(o, e, true) + " => " + O(s, e));
      }), qa("Map", Wn.call(e), L, A);
    }
    if (Cc(e)) {
      var W = [];
      return Ca && Ca.call(e, function(s) {
        W.push(O(s, e));
      }), qa("Set", qn.call(e), W, A);
    }
    if (Oc(e))
      return Qi("WeakMap");
    if (Nc(e))
      return Qi("WeakSet");
    if (Pc(e))
      return Qi("WeakRef");
    if (Ac(e))
      return an(O(Number(e)));
    if (Ec(e))
      return an(O(Xi.call(e)));
    if (_c(e))
      return an(pc.call(e));
    if (Mc(e))
      return an(O(String(e)));
    if (typeof window != "undefined" && e === window)
      return "{ [object Window] }";
    if (typeof globalThis != "undefined" && e === globalThis || typeof global != "undefined" && e === global)
      return "{ [object globalThis] }";
    if (!bc(e) && !Wa(e)) {
      var V = Ln(e, O), fe = Ra ? Ra(e) === Object.prototype : e instanceof Object || e.constructor === Object, ee = e instanceof Object ? "" : "null prototype", Z = !fe && ft && Object(e) === e && ft in e ? so.call(Wt(e), 8, -1) : ee ? "Object" : "", ie = fe || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", M = ie + (Z || ee ? "[" + bt.call(Ua.call([], Z || [], ee || []), ": ") + "] " : "");
      return V.length === 0 ? M + "{}" : A ? M + "{" + no(V, A) + "}" : M + "{ " + bt.call(V, ", ") + " }";
    }
    return String(e);
  };
  function $a(r2, e, t) {
    var n = (t.quoteStyle || e) === "double" ? '"' : "'";
    return n + r2 + n;
  }
  function wc(r2) {
    return Lt.call(String(r2), /"/g, "&quot;");
  }
  function ro(r2) {
    return Wt(r2) === "[object Array]" && (!ft || !(typeof r2 == "object" && ft in r2));
  }
  function bc(r2) {
    return Wt(r2) === "[object Date]" && (!ft || !(typeof r2 == "object" && ft in r2));
  }
  function Wa(r2) {
    return Wt(r2) === "[object RegExp]" && (!ft || !(typeof r2 == "object" && ft in r2));
  }
  function xc(r2) {
    return Wt(r2) === "[object Error]" && (!ft || !(typeof r2 == "object" && ft in r2));
  }
  function Mc(r2) {
    return Wt(r2) === "[object String]" && (!ft || !(typeof r2 == "object" && ft in r2));
  }
  function Ac(r2) {
    return Wt(r2) === "[object Number]" && (!ft || !(typeof r2 == "object" && ft in r2));
  }
  function _c(r2) {
    return Wt(r2) === "[object Boolean]" && (!ft || !(typeof r2 == "object" && ft in r2));
  }
  function Va(r2) {
    if (Br)
      return r2 && typeof r2 == "object" && r2 instanceof Symbol;
    if (typeof r2 == "symbol")
      return true;
    if (!r2 || typeof r2 != "object" || !eo)
      return false;
    try {
      return eo.call(r2), true;
    } catch (e) {
    }
    return false;
  }
  function Ec(r2) {
    if (!r2 || typeof r2 != "object" || !Xi)
      return false;
    try {
      return Xi.call(r2), true;
    } catch (e) {
    }
    return false;
  }
  var Sc = Object.prototype.hasOwnProperty || function(r2) {
    return r2 in this;
  };
  function Dt(r2, e) {
    return Sc.call(r2, e);
  }
  function Wt(r2) {
    return dc.call(r2);
  }
  function Tc(r2) {
    if (r2.name)
      return r2.name;
    var e = gc.call(mc.call(r2), /^function\s*([\w$]+)/);
    return e ? e[1] : null;
  }
  function Ya(r2, e) {
    if (r2.indexOf)
      return r2.indexOf(e);
    for (var t = 0, n = r2.length; t < n; t++)
      if (r2[t] === e)
        return t;
    return -1;
  }
  function Ic(r2) {
    if (!Wn || !r2 || typeof r2 != "object")
      return false;
    try {
      Wn.call(r2);
      try {
        qn.call(r2);
      } catch (e) {
        return true;
      }
      return r2 instanceof Map;
    } catch (e) {
    }
    return false;
  }
  function Oc(r2) {
    if (!fn || !r2 || typeof r2 != "object")
      return false;
    try {
      fn.call(r2, fn);
      try {
        ln.call(r2, ln);
      } catch (e) {
        return true;
      }
      return r2 instanceof WeakMap;
    } catch (e) {
    }
    return false;
  }
  function Pc(r2) {
    if (!Na || !r2 || typeof r2 != "object")
      return false;
    try {
      return Na.call(r2), true;
    } catch (e) {
    }
    return false;
  }
  function Cc(r2) {
    if (!qn || !r2 || typeof r2 != "object")
      return false;
    try {
      qn.call(r2);
      try {
        Wn.call(r2);
      } catch (e) {
        return true;
      }
      return r2 instanceof Set;
    } catch (e) {
    }
    return false;
  }
  function Nc(r2) {
    if (!ln || !r2 || typeof r2 != "object")
      return false;
    try {
      ln.call(r2, ln);
      try {
        fn.call(r2, fn);
      } catch (e) {
        return true;
      }
      return r2 instanceof WeakSet;
    } catch (e) {
    }
    return false;
  }
  function kc(r2) {
    return !r2 || typeof r2 != "object" ? false : typeof HTMLElement != "undefined" && r2 instanceof HTMLElement ? true : typeof r2.nodeName == "string" && typeof r2.getAttribute == "function";
  }
  function Ka(r2, e) {
    if (r2.length > e.maxStringLength) {
      var t = r2.length - e.maxStringLength, n = "... " + t + " more character" + (t > 1 ? "s" : "");
      return Ka(so.call(r2, 0, e.maxStringLength), e) + n;
    }
    var i = Lt.call(Lt.call(r2, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Uc);
    return $a(i, "single", e);
  }
  function Uc(r2) {
    var e = r2.charCodeAt(0), t = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[e];
    return t ? "\\" + t : "\\x" + (e < 16 ? "0" : "") + yc.call(e.toString(16));
  }
  function an(r2) {
    return "Object(" + r2 + ")";
  }
  function Qi(r2) {
    return r2 + " { ? }";
  }
  function qa(r2, e, t, n) {
    var i = n ? no(t, n) : bt.call(t, ", ");
    return r2 + " (" + e + ") {" + i + "}";
  }
  function Bc(r2) {
    for (var e = 0; e < r2.length; e++)
      if (Ya(r2[e], `
`) >= 0)
        return false;
    return true;
  }
  function Rc(r2, e) {
    var t;
    if (r2.indent === "	")
      t = "	";
    else if (typeof r2.indent == "number" && r2.indent > 0)
      t = bt.call(Array(r2.indent + 1), " ");
    else
      return null;
    return { base: t, prev: bt.call(Array(e + 1), t) };
  }
  function no(r2, e) {
    if (r2.length === 0)
      return "";
    var t = `
` + e.prev + e.base;
    return t + bt.call(r2, "," + t) + `
` + e.prev;
  }
  function Ln(r2, e) {
    var t = ro(r2), n = [];
    if (t) {
      n.length = r2.length;
      for (var i = 0; i < r2.length; i++)
        n[i] = Dt(r2, i) ? e(r2[i], r2) : "";
    }
    var l = typeof Zi == "function" ? Zi(r2) : [], h;
    if (Br) {
      h = {};
      for (var g = 0; g < l.length; g++)
        h["$" + l[g]] = l[g];
    }
    for (var v in r2)
      Dt(r2, v) && (t && String(Number(v)) === v && v < r2.length || Br && h["$" + v] instanceof Symbol || (za.call(/[^\w$]/, v) ? n.push(e(v, r2) + ": " + e(r2[v], r2)) : n.push(v + ": " + e(r2[v], r2))));
    if (typeof Zi == "function")
      for (var b = 0; b < l.length; b++)
        ja.call(r2, l[b]) && n.push("[" + e(l[b]) + "]: " + e(r2[l[b]], r2));
    return n;
  }
});
var Qa = ye(($d, Za) => {
  var Ja = gr(), Rr = Ia(), Fc = Ha(), Dc = Or(), zn = Ja("%WeakMap%", true), jn = Ja("%Map%", true), Lc = Rr("WeakMap.prototype.get", true), Wc = Rr("WeakMap.prototype.set", true), qc = Rr("WeakMap.prototype.has", true), zc = Rr("Map.prototype.get", true), jc = Rr("Map.prototype.set", true), $c = Rr("Map.prototype.has", true), ao = function(r2, e) {
    for (var t = r2, n; (n = t.next) !== null; t = n)
      if (n.key === e)
        return t.next = n.next, n.next = r2.next, r2.next = n, n;
  }, Vc = function(r2, e) {
    var t = ao(r2, e);
    return t && t.value;
  }, Yc = function(r2, e, t) {
    var n = ao(r2, e);
    n ? n.value = t : r2.next = { key: e, next: r2.next, value: t };
  }, Kc = function(r2, e) {
    return !!ao(r2, e);
  };
  Za.exports = function() {
    var e, t, n, i = { assert: function(l) {
      if (!i.has(l))
        throw new Dc("Side channel does not contain " + Fc(l));
    }, get: function(l) {
      if (zn && l && (typeof l == "object" || typeof l == "function")) {
        if (e)
          return Lc(e, l);
      } else if (jn) {
        if (t)
          return zc(t, l);
      } else if (n)
        return Vc(n, l);
    }, has: function(l) {
      if (zn && l && (typeof l == "object" || typeof l == "function")) {
        if (e)
          return qc(e, l);
      } else if (jn) {
        if (t)
          return $c(t, l);
      } else if (n)
        return Kc(n, l);
      return false;
    }, set: function(l, h) {
      zn && l && (typeof l == "object" || typeof l == "function") ? (e || (e = new zn()), Wc(e, l, h)) : jn ? (t || (t = new jn()), jc(t, l, h)) : (n || (n = { key: {}, next: null }), Yc(n, l, h));
    } };
    return i;
  };
});
var $n = ye((Vd, Xa) => {
  var Gc = String.prototype.replace, Hc = /%20/g, fo = { RFC1738: "RFC1738", RFC3986: "RFC3986" };
  Xa.exports = { default: fo.RFC3986, formatters: { RFC1738: function(r2) {
    return Gc.call(r2, Hc, "+");
  }, RFC3986: function(r2) {
    return String(r2);
  } }, RFC1738: fo.RFC1738, RFC3986: fo.RFC3986 };
});
var co = ye((Yd, tf) => {
  var Jc = $n(), lo = Object.prototype.hasOwnProperty, yr = Array.isArray, xt = function() {
    for (var r2 = [], e = 0; e < 256; ++e)
      r2.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
    return r2;
  }(), Zc = function(e) {
    for (; e.length > 1; ) {
      var t = e.pop(), n = t.obj[t.prop];
      if (yr(n)) {
        for (var i = [], l = 0; l < n.length; ++l)
          typeof n[l] != "undefined" && i.push(n[l]);
        t.obj[t.prop] = i;
      }
    }
  }, ef = function(e, t) {
    for (var n = t && t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i = 0; i < e.length; ++i)
      typeof e[i] != "undefined" && (n[i] = e[i]);
    return n;
  }, Qc = function r2(e, t, n) {
    if (!t)
      return e;
    if (typeof t != "object") {
      if (yr(e))
        e.push(t);
      else if (e && typeof e == "object")
        (n && (n.plainObjects || n.allowPrototypes) || !lo.call(Object.prototype, t)) && (e[t] = true);
      else
        return [e, t];
      return e;
    }
    if (!e || typeof e != "object")
      return [e].concat(t);
    var i = e;
    return yr(e) && !yr(t) && (i = ef(e, n)), yr(e) && yr(t) ? (t.forEach(function(l, h) {
      if (lo.call(e, h)) {
        var g = e[h];
        g && typeof g == "object" && l && typeof l == "object" ? e[h] = r2(g, l, n) : e.push(l);
      } else
        e[h] = l;
    }), e) : Object.keys(t).reduce(function(l, h) {
      var g = t[h];
      return lo.call(l, h) ? l[h] = r2(l[h], g, n) : l[h] = g, l;
    }, i);
  }, Xc = function(e, t) {
    return Object.keys(t).reduce(function(n, i) {
      return n[i] = t[i], n;
    }, e);
  }, eh = function(r2, e, t) {
    var n = r2.replace(/\+/g, " ");
    if (t === "iso-8859-1")
      return n.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(n);
    } catch (i) {
      return n;
    }
  }, uo = 1024, th = function(e, t, n, i, l) {
    if (e.length === 0)
      return e;
    var h = e;
    if (typeof e == "symbol" ? h = Symbol.prototype.toString.call(e) : typeof e != "string" && (h = String(e)), n === "iso-8859-1")
      return escape(h).replace(/%u[0-9a-f]{4}/gi, function(k) {
        return "%26%23" + parseInt(k.slice(2), 16) + "%3B";
      });
    for (var g = "", v = 0; v < h.length; v += uo) {
      for (var b = h.length >= uo ? h.slice(v, v + uo) : h, x = [], A = 0; A < b.length; ++A) {
        var O = b.charCodeAt(A);
        if (O === 45 || O === 46 || O === 95 || O === 126 || O >= 48 && O <= 57 || O >= 65 && O <= 90 || O >= 97 && O <= 122 || l === Jc.RFC1738 && (O === 40 || O === 41)) {
          x[x.length] = b.charAt(A);
          continue;
        }
        if (O < 128) {
          x[x.length] = xt[O];
          continue;
        }
        if (O < 2048) {
          x[x.length] = xt[192 | O >> 6] + xt[128 | O & 63];
          continue;
        }
        if (O < 55296 || O >= 57344) {
          x[x.length] = xt[224 | O >> 12] + xt[128 | O >> 6 & 63] + xt[128 | O & 63];
          continue;
        }
        A += 1, O = 65536 + ((O & 1023) << 10 | b.charCodeAt(A) & 1023), x[x.length] = xt[240 | O >> 18] + xt[128 | O >> 12 & 63] + xt[128 | O >> 6 & 63] + xt[128 | O & 63];
      }
      g += x.join("");
    }
    return g;
  }, rh = function(e) {
    for (var t = [{ obj: { o: e }, prop: "o" }], n = [], i = 0; i < t.length; ++i)
      for (var l = t[i], h = l.obj[l.prop], g = Object.keys(h), v = 0; v < g.length; ++v) {
        var b = g[v], x = h[b];
        typeof x == "object" && x !== null && n.indexOf(x) === -1 && (t.push({ obj: h, prop: b }), n.push(x));
      }
    return Zc(t), e;
  }, nh = function(e) {
    return Object.prototype.toString.call(e) === "[object RegExp]";
  }, ih = function(e) {
    return !e || typeof e != "object" ? false : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
  }, oh = function(e, t) {
    return [].concat(e, t);
  }, sh = function(e, t) {
    if (yr(e)) {
      for (var n = [], i = 0; i < e.length; i += 1)
        n.push(t(e[i]));
      return n;
    }
    return t(e);
  };
  tf.exports = { arrayToObject: ef, assign: Xc, combine: oh, compact: rh, decode: eh, encode: th, isBuffer: ih, isRegExp: nh, maybeMap: sh, merge: Qc };
});
var ff = ye((Kd, af) => {
  var nf = Qa(), Vn = co(), un = $n(), ah = Object.prototype.hasOwnProperty, of = { brackets: function(e) {
    return e + "[]";
  }, comma: "comma", indices: function(e, t) {
    return e + "[" + t + "]";
  }, repeat: function(e) {
    return e;
  } }, Mt = Array.isArray, fh = Array.prototype.push, sf = function(r2, e) {
    fh.apply(r2, Mt(e) ? e : [e]);
  }, lh = Date.prototype.toISOString, rf = un.default, tt = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: Vn.encode, encodeValuesOnly: false, format: rf, formatter: un.formatters[rf], indices: false, serializeDate: function(e) {
    return lh.call(e);
  }, skipNulls: false, strictNullHandling: false }, uh = function(e) {
    return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
  }, ho = {}, ch = function r2(e, t, n, i, l, h, g, v, b, x, A, O, k, N, q, C, J, K) {
    for (var T = e, I = K, L = 0, W = false; (I = I.get(ho)) !== void 0 && !W; ) {
      var V = I.get(e);
      if (L += 1, typeof V != "undefined") {
        if (V === L)
          throw new RangeError("Cyclic object value");
        W = true;
      }
      typeof I.get(ho) == "undefined" && (L = 0);
    }
    if (typeof x == "function" ? T = x(t, T) : T instanceof Date ? T = k(T) : n === "comma" && Mt(T) && (T = Vn.maybeMap(T, function(m) {
      return m instanceof Date ? k(m) : m;
    })), T === null) {
      if (h)
        return b && !C ? b(t, tt.encoder, J, "key", N) : t;
      T = "";
    }
    if (uh(T) || Vn.isBuffer(T)) {
      if (b) {
        var fe = C ? t : b(t, tt.encoder, J, "key", N);
        return [q(fe) + "=" + q(b(T, tt.encoder, J, "value", N))];
      }
      return [q(t) + "=" + q(String(T))];
    }
    var ee = [];
    if (typeof T == "undefined")
      return ee;
    var Z;
    if (n === "comma" && Mt(T))
      C && b && (T = Vn.maybeMap(T, b)), Z = [{ value: T.length > 0 ? T.join(",") || null : void 0 }];
    else if (Mt(x))
      Z = x;
    else {
      var ie = Object.keys(T);
      Z = A ? ie.sort(A) : ie;
    }
    var M = v ? t.replace(/\./g, "%2E") : t, s = i && Mt(T) && T.length === 1 ? M + "[]" : M;
    if (l && Mt(T) && T.length === 0)
      return s + "[]";
    for (var o = 0; o < Z.length; ++o) {
      var a = Z[o], c = typeof a == "object" && typeof a.value != "undefined" ? a.value : T[a];
      if (!(g && c === null)) {
        var p = O && v ? a.replace(/\./g, "%2E") : a, d = Mt(T) ? typeof n == "function" ? n(s, p) : s : s + (O ? "." + p : "[" + p + "]");
        K.set(e, L);
        var y = nf();
        y.set(ho, K), sf(ee, r2(c, d, n, i, l, h, g, v, n === "comma" && C && Mt(T) ? null : b, x, A, O, k, N, q, C, J, y));
      }
    }
    return ee;
  }, hh = function(e) {
    if (!e)
      return tt;
    if (typeof e.allowEmptyArrays != "undefined" && typeof e.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof e.encodeDotInKeys != "undefined" && typeof e.encodeDotInKeys != "boolean")
      throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
    if (e.encoder !== null && typeof e.encoder != "undefined" && typeof e.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var t = e.charset || tt.charset;
    if (typeof e.charset != "undefined" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var n = un.default;
    if (typeof e.format != "undefined") {
      if (!ah.call(un.formatters, e.format))
        throw new TypeError("Unknown format option provided.");
      n = e.format;
    }
    var i = un.formatters[n], l = tt.filter;
    (typeof e.filter == "function" || Mt(e.filter)) && (l = e.filter);
    var h;
    if (e.arrayFormat in of ? h = e.arrayFormat : "indices" in e ? h = e.indices ? "indices" : "repeat" : h = tt.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var g = typeof e.allowDots == "undefined" ? e.encodeDotInKeys === true ? true : tt.allowDots : !!e.allowDots;
    return { addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : tt.addQueryPrefix, allowDots: g, allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : tt.allowEmptyArrays, arrayFormat: h, charset: t, charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : tt.charsetSentinel, commaRoundTrip: e.commaRoundTrip, delimiter: typeof e.delimiter == "undefined" ? tt.delimiter : e.delimiter, encode: typeof e.encode == "boolean" ? e.encode : tt.encode, encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : tt.encodeDotInKeys, encoder: typeof e.encoder == "function" ? e.encoder : tt.encoder, encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : tt.encodeValuesOnly, filter: l, format: n, formatter: i, serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : tt.serializeDate, skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : tt.skipNulls, sort: typeof e.sort == "function" ? e.sort : null, strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : tt.strictNullHandling };
  };
  af.exports = function(r2, e) {
    var t = r2, n = hh(e), i, l;
    typeof n.filter == "function" ? (l = n.filter, t = l("", t)) : Mt(n.filter) && (l = n.filter, i = l);
    var h = [];
    if (typeof t != "object" || t === null)
      return "";
    var g = of[n.arrayFormat], v = g === "comma" && n.commaRoundTrip;
    i || (i = Object.keys(t)), n.sort && i.sort(n.sort);
    for (var b = nf(), x = 0; x < i.length; ++x) {
      var A = i[x];
      n.skipNulls && t[A] === null || sf(h, ch(t[A], A, g, v, n.allowEmptyArrays, n.strictNullHandling, n.skipNulls, n.encodeDotInKeys, n.encode ? n.encoder : null, n.filter, n.sort, n.allowDots, n.serializeDate, n.format, n.formatter, n.encodeValuesOnly, n.charset, b));
    }
    var O = h.join(n.delimiter), k = n.addQueryPrefix === true ? "?" : "";
    return n.charsetSentinel && (n.charset === "iso-8859-1" ? k += "utf8=%26%2310003%3B&" : k += "utf8=%E2%9C%93&"), O.length > 0 ? k + O : "";
  };
});
var cf = ye((Gd, uf) => {
  var Fr = co(), po = Object.prototype.hasOwnProperty, ph = Array.isArray, Qe = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: Fr.decode, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictDepth: false, strictNullHandling: false }, dh = function(r2) {
    return r2.replace(/&#(\d+);/g, function(e, t) {
      return String.fromCharCode(parseInt(t, 10));
    });
  }, lf = function(r2, e) {
    return r2 && typeof r2 == "string" && e.comma && r2.indexOf(",") > -1 ? r2.split(",") : r2;
  }, mh = "utf8=%26%2310003%3B", gh = "utf8=%E2%9C%93", yh = function(e, t) {
    var n = { __proto__: null }, i = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
    i = i.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    var l = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit, h = i.split(t.delimiter, l), g = -1, v, b = t.charset;
    if (t.charsetSentinel)
      for (v = 0; v < h.length; ++v)
        h[v].indexOf("utf8=") === 0 && (h[v] === gh ? b = "utf-8" : h[v] === mh && (b = "iso-8859-1"), g = v, v = h.length);
    for (v = 0; v < h.length; ++v)
      if (v !== g) {
        var x = h[v], A = x.indexOf("]="), O = A === -1 ? x.indexOf("=") : A + 1, k, N;
        O === -1 ? (k = t.decoder(x, Qe.decoder, b, "key"), N = t.strictNullHandling ? null : "") : (k = t.decoder(x.slice(0, O), Qe.decoder, b, "key"), N = Fr.maybeMap(lf(x.slice(O + 1), t), function(C) {
          return t.decoder(C, Qe.decoder, b, "value");
        })), N && t.interpretNumericEntities && b === "iso-8859-1" && (N = dh(N)), x.indexOf("[]=") > -1 && (N = ph(N) ? [N] : N);
        var q = po.call(n, k);
        q && t.duplicates === "combine" ? n[k] = Fr.combine(n[k], N) : (!q || t.duplicates === "last") && (n[k] = N);
      }
    return n;
  }, vh = function(r2, e, t, n) {
    for (var i = n ? e : lf(e, t), l = r2.length - 1; l >= 0; --l) {
      var h, g = r2[l];
      if (g === "[]" && t.parseArrays)
        h = t.allowEmptyArrays && (i === "" || t.strictNullHandling && i === null) ? [] : [].concat(i);
      else {
        h = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var v = g.charAt(0) === "[" && g.charAt(g.length - 1) === "]" ? g.slice(1, -1) : g, b = t.decodeDotInKeys ? v.replace(/%2E/g, ".") : v, x = parseInt(b, 10);
        !t.parseArrays && b === "" ? h = { 0: i } : !isNaN(x) && g !== b && String(x) === b && x >= 0 && t.parseArrays && x <= t.arrayLimit ? (h = [], h[x] = i) : b !== "__proto__" && (h[b] = i);
      }
      i = h;
    }
    return i;
  }, wh = function(e, t, n, i) {
    if (e) {
      var l = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, h = /(\[[^[\]]*])/, g = /(\[[^[\]]*])/g, v = n.depth > 0 && h.exec(l), b = v ? l.slice(0, v.index) : l, x = [];
      if (b) {
        if (!n.plainObjects && po.call(Object.prototype, b) && !n.allowPrototypes)
          return;
        x.push(b);
      }
      for (var A = 0; n.depth > 0 && (v = g.exec(l)) !== null && A < n.depth; ) {
        if (A += 1, !n.plainObjects && po.call(Object.prototype, v[1].slice(1, -1)) && !n.allowPrototypes)
          return;
        x.push(v[1]);
      }
      if (v) {
        if (n.strictDepth === true)
          throw new RangeError("Input depth exceeded depth option of " + n.depth + " and strictDepth is true");
        x.push("[" + l.slice(v.index) + "]");
      }
      return vh(x, t, n, i);
    }
  }, bh = function(e) {
    if (!e)
      return Qe;
    if (typeof e.allowEmptyArrays != "undefined" && typeof e.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof e.decodeDotInKeys != "undefined" && typeof e.decodeDotInKeys != "boolean")
      throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
    if (e.decoder !== null && typeof e.decoder != "undefined" && typeof e.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof e.charset != "undefined" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var t = typeof e.charset == "undefined" ? Qe.charset : e.charset, n = typeof e.duplicates == "undefined" ? Qe.duplicates : e.duplicates;
    if (n !== "combine" && n !== "first" && n !== "last")
      throw new TypeError("The duplicates option must be either combine, first, or last");
    var i = typeof e.allowDots == "undefined" ? e.decodeDotInKeys === true ? true : Qe.allowDots : !!e.allowDots;
    return { allowDots: i, allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : Qe.allowEmptyArrays, allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : Qe.allowPrototypes, allowSparse: typeof e.allowSparse == "boolean" ? e.allowSparse : Qe.allowSparse, arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : Qe.arrayLimit, charset: t, charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : Qe.charsetSentinel, comma: typeof e.comma == "boolean" ? e.comma : Qe.comma, decodeDotInKeys: typeof e.decodeDotInKeys == "boolean" ? e.decodeDotInKeys : Qe.decodeDotInKeys, decoder: typeof e.decoder == "function" ? e.decoder : Qe.decoder, delimiter: typeof e.delimiter == "string" || Fr.isRegExp(e.delimiter) ? e.delimiter : Qe.delimiter, depth: typeof e.depth == "number" || e.depth === false ? +e.depth : Qe.depth, duplicates: n, ignoreQueryPrefix: e.ignoreQueryPrefix === true, interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : Qe.interpretNumericEntities, parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : Qe.parameterLimit, parseArrays: e.parseArrays !== false, plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : Qe.plainObjects, strictDepth: typeof e.strictDepth == "boolean" ? !!e.strictDepth : Qe.strictDepth, strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : Qe.strictNullHandling };
  };
  uf.exports = function(r2, e) {
    var t = bh(e);
    if (r2 === "" || r2 === null || typeof r2 == "undefined")
      return t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (var n = typeof r2 == "string" ? yh(r2, t) : r2, i = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, l = Object.keys(n), h = 0; h < l.length; ++h) {
      var g = l[h], v = wh(g, n[g], t, typeof r2 == "string");
      i = Fr.merge(i, v, t);
    }
    return t.allowSparse === true ? i : Fr.compact(i);
  };
});
var pf = ye((Hd, hf) => {
  var xh = ff(), Mh = cf(), Ah = $n();
  hf.exports = { formats: Ah, parse: Mh, stringify: xh };
});
var mf = ye((Jd, df) => {
  var Dr = 1e3, Lr = Dr * 60, Wr = Lr * 60, vr = Wr * 24, _h = vr * 7, Eh = vr * 365.25;
  df.exports = function(r2, e) {
    e = e || {};
    var t = typeof r2;
    if (t === "string" && r2.length > 0)
      return Sh(r2);
    if (t === "number" && isFinite(r2))
      return e.long ? Ih(r2) : Th(r2);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(r2));
  };
  function Sh(r2) {
    if (r2 = String(r2), !(r2.length > 100)) {
      var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(r2);
      if (e) {
        var t = parseFloat(e[1]), n = (e[2] || "ms").toLowerCase();
        switch (n) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return t * Eh;
          case "weeks":
          case "week":
          case "w":
            return t * _h;
          case "days":
          case "day":
          case "d":
            return t * vr;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return t * Wr;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return t * Lr;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return t * Dr;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return t;
          default:
            return;
        }
      }
    }
  }
  function Th(r2) {
    var e = Math.abs(r2);
    return e >= vr ? Math.round(r2 / vr) + "d" : e >= Wr ? Math.round(r2 / Wr) + "h" : e >= Lr ? Math.round(r2 / Lr) + "m" : e >= Dr ? Math.round(r2 / Dr) + "s" : r2 + "ms";
  }
  function Ih(r2) {
    var e = Math.abs(r2);
    return e >= vr ? Yn(r2, e, vr, "day") : e >= Wr ? Yn(r2, e, Wr, "hour") : e >= Lr ? Yn(r2, e, Lr, "minute") : e >= Dr ? Yn(r2, e, Dr, "second") : r2 + " ms";
  }
  function Yn(r2, e, t, n) {
    var i = e >= t * 1.5;
    return Math.round(r2 / t) + " " + n + (i ? "s" : "");
  }
});
var yf = ye((Zd, gf) => {
  function Oh(r2) {
    t.debug = t, t.default = t, t.coerce = v, t.disable = l, t.enable = i, t.enabled = h, t.humanize = mf(), t.destroy = b, Object.keys(r2).forEach((x) => {
      t[x] = r2[x];
    }), t.names = [], t.skips = [], t.formatters = {};
    function e(x) {
      let A = 0;
      for (let O = 0; O < x.length; O++)
        A = (A << 5) - A + x.charCodeAt(O), A |= 0;
      return t.colors[Math.abs(A) % t.colors.length];
    }
    t.selectColor = e;
    function t(x) {
      let A, O = null, k, N;
      function q(...C) {
        if (!q.enabled)
          return;
        let J = q, K = Number(/* @__PURE__ */ new Date()), T = K - (A || K);
        J.diff = T, J.prev = A, J.curr = K, A = K, C[0] = t.coerce(C[0]), typeof C[0] != "string" && C.unshift("%O");
        let I = 0;
        C[0] = C[0].replace(/%([a-zA-Z%])/g, (W, V) => {
          if (W === "%%")
            return "%";
          I++;
          let fe = t.formatters[V];
          if (typeof fe == "function") {
            let ee = C[I];
            W = fe.call(J, ee), C.splice(I, 1), I--;
          }
          return W;
        }), t.formatArgs.call(J, C), (J.log || t.log).apply(J, C);
      }
      return q.namespace = x, q.useColors = t.useColors(), q.color = t.selectColor(x), q.extend = n, q.destroy = t.destroy, Object.defineProperty(q, "enabled", { enumerable: true, configurable: false, get: () => O !== null ? O : (k !== t.namespaces && (k = t.namespaces, N = t.enabled(x)), N), set: (C) => {
        O = C;
      } }), typeof t.init == "function" && t.init(q), q;
    }
    function n(x, A) {
      let O = t(this.namespace + (typeof A == "undefined" ? ":" : A) + x);
      return O.log = this.log, O;
    }
    function i(x) {
      t.save(x), t.namespaces = x, t.names = [], t.skips = [];
      let A, O = (typeof x == "string" ? x : "").split(/[\s,]+/), k = O.length;
      for (A = 0; A < k; A++)
        O[A] && (x = O[A].replace(/\*/g, ".*?"), x[0] === "-" ? t.skips.push(new RegExp("^" + x.slice(1) + "$")) : t.names.push(new RegExp("^" + x + "$")));
    }
    function l() {
      let x = [...t.names.map(g), ...t.skips.map(g).map((A) => "-" + A)].join(",");
      return t.enable(""), x;
    }
    function h(x) {
      if (x[x.length - 1] === "*")
        return true;
      let A, O;
      for (A = 0, O = t.skips.length; A < O; A++)
        if (t.skips[A].test(x))
          return false;
      for (A = 0, O = t.names.length; A < O; A++)
        if (t.names[A].test(x))
          return true;
      return false;
    }
    function g(x) {
      return x.toString().substring(2, x.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function v(x) {
      return x instanceof Error ? x.stack || x.message : x;
    }
    function b() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return t.enable(t.load()), t;
  }
  gf.exports = Oh;
});
var Gn = ye((pt, Kn) => {
  pt.formatArgs = Ch;
  pt.save = Nh;
  pt.load = kh;
  pt.useColors = Ph;
  pt.storage = Uh();
  pt.destroy = (() => {
    let r2 = false;
    return () => {
      r2 || (r2 = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })();
  pt.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];
  function Ph() {
    if (typeof window != "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
      return true;
    if (typeof navigator != "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
      return false;
    let r2;
    return typeof document != "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window != "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator != "undefined" && navigator.userAgent && (r2 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(r2[1], 10) >= 31 || typeof navigator != "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function Ch(r2) {
    if (r2[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + r2[0] + (this.useColors ? "%c " : " ") + "+" + Kn.exports.humanize(this.diff), !this.useColors)
      return;
    let e = "color: " + this.color;
    r2.splice(1, 0, e, "color: inherit");
    let t = 0, n = 0;
    r2[0].replace(/%[a-zA-Z%]/g, (i) => {
      i !== "%%" && (t++, i === "%c" && (n = t));
    }), r2.splice(n, 0, e);
  }
  pt.log = console.debug || console.log || (() => {
  });
  function Nh(r2) {
    try {
      r2 ? pt.storage.setItem("debug", r2) : pt.storage.removeItem("debug");
    } catch (e) {
    }
  }
  function kh() {
    let r2;
    try {
      r2 = pt.storage.getItem("debug");
    } catch (e) {
    }
    return !r2 && typeof process != "undefined" && "env" in process && (r2 = {}.DEBUG), r2;
  }
  function Uh() {
    try {
      return localStorage;
    } catch (r2) {
    }
  }
  Kn.exports = yf()(pt);
  var { formatters: Bh } = Kn.exports;
  Bh.j = function(r2) {
    try {
      return JSON.stringify(r2);
    } catch (e) {
      return "[UnexpectedJSONParseError]: " + e.message;
    }
  };
});
var Zo = ye(() => {
});
var El = ye((_l, Qo) => {
  (function(r2, e) {
    function t(M, s) {
      if (!M)
        throw new Error(s || "Assertion failed");
    }
    function n(M, s) {
      M.super_ = s;
      var o = function() {
      };
      o.prototype = s.prototype, M.prototype = new o(), M.prototype.constructor = M;
    }
    function i(M, s, o) {
      if (i.isBN(M))
        return M;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, M !== null && ((s === "le" || s === "be") && (o = s, s = 10), this._init(M || 0, s || 10, o || "be"));
    }
    typeof r2 == "object" ? r2.exports = i : e.BN = i, i.BN = i, i.wordSize = 26;
    var l;
    try {
      l = Zo().Buffer;
    } catch (M) {
    }
    i.isBN = function(s) {
      return s instanceof i ? true : s !== null && typeof s == "object" && s.constructor.wordSize === i.wordSize && Array.isArray(s.words);
    }, i.max = function(s, o) {
      return s.cmp(o) > 0 ? s : o;
    }, i.min = function(s, o) {
      return s.cmp(o) < 0 ? s : o;
    }, i.prototype._init = function(s, o, a) {
      if (typeof s == "number")
        return this._initNumber(s, o, a);
      if (typeof s == "object")
        return this._initArray(s, o, a);
      o === "hex" && (o = 16), t(o === (o | 0) && o >= 2 && o <= 36), s = s.toString().replace(/\s+/g, "");
      var c = 0;
      s[0] === "-" && c++, o === 16 ? this._parseHex(s, c) : this._parseBase(s, o, c), s[0] === "-" && (this.negative = 1), this._strip(), a === "le" && this._initArray(this.toArray(), o, a);
    }, i.prototype._initNumber = function(s, o, a) {
      s < 0 && (this.negative = 1, s = -s), s < 67108864 ? (this.words = [s & 67108863], this.length = 1) : s < 4503599627370496 ? (this.words = [s & 67108863, s / 67108864 & 67108863], this.length = 2) : (t(s < 9007199254740992), this.words = [s & 67108863, s / 67108864 & 67108863, 1], this.length = 3), a === "le" && this._initArray(this.toArray(), o, a);
    }, i.prototype._initArray = function(s, o, a) {
      if (t(typeof s.length == "number"), s.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(s.length / 3), this.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        this.words[c] = 0;
      var p, d, y = 0;
      if (a === "be")
        for (c = s.length - 1, p = 0; c >= 0; c -= 3)
          d = s[c] | s[c - 1] << 8 | s[c - 2] << 16, this.words[p] |= d << y & 67108863, this.words[p + 1] = d >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, p++);
      else if (a === "le")
        for (c = 0, p = 0; c < s.length; c += 3)
          d = s[c] | s[c + 1] << 8 | s[c + 2] << 16, this.words[p] |= d << y & 67108863, this.words[p + 1] = d >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, p++);
      return this._strip();
    };
    function h(M, s, o) {
      for (var a = 0, c = Math.min(M.length, o), p = 0, d = s; d < c; d++) {
        var y = M.charCodeAt(d) - 48;
        a <<= 4;
        var m;
        y >= 49 && y <= 54 ? m = y - 49 + 10 : y >= 17 && y <= 22 ? m = y - 17 + 10 : m = y, a |= m, p |= m;
      }
      return t(!(p & 240), "Invalid character in " + M), a;
    }
    i.prototype._parseHex = function(s, o) {
      this.length = Math.ceil((s.length - o) / 6), this.words = new Array(this.length);
      for (var a = 0; a < this.length; a++)
        this.words[a] = 0;
      var c, p, d = 0;
      for (a = s.length - 6, c = 0; a >= o; a -= 6)
        p = h(s, a, a + 6), this.words[c] |= p << d & 67108863, this.words[c + 1] |= p >>> 26 - d & 4194303, d += 24, d >= 26 && (d -= 26, c++);
      a + 6 !== o && (p = h(s, o, a + 6), this.words[c] |= p << d & 67108863, this.words[c + 1] |= p >>> 26 - d & 4194303), this._strip();
    };
    function g(M, s, o, a) {
      for (var c = 0, p = 0, d = Math.min(M.length, o), y = s; y < d; y++) {
        var m = M.charCodeAt(y) - 48;
        c *= a, m >= 49 ? p = m - 49 + 10 : m >= 17 ? p = m - 17 + 10 : p = m, t(m >= 0 && p < a, "Invalid character"), c += p;
      }
      return c;
    }
    i.prototype._parseBase = function(s, o, a) {
      this.words = [0], this.length = 1;
      for (var c = 0, p = 1; p <= 67108863; p *= o)
        c++;
      c--, p = p / o | 0;
      for (var d = s.length - a, y = d % c, m = Math.min(d, d - y) + a, f = 0, u = a; u < m; u += c)
        f = g(s, u, u + c, o), this.imuln(p), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
      if (y !== 0) {
        var w = 1;
        for (f = g(s, u, s.length, o), u = 0; u < y; u++)
          w *= o;
        this.imuln(w), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
      }
    }, i.prototype.copy = function(s) {
      s.words = new Array(this.length);
      for (var o = 0; o < this.length; o++)
        s.words[o] = this.words[o];
      s.length = this.length, s.negative = this.negative, s.red = this.red;
    };
    function v(M, s) {
      M.words = s.words, M.length = s.length, M.negative = s.negative, M.red = s.red;
    }
    i.prototype._move = function(s) {
      v(s, this);
    }, i.prototype.clone = function() {
      var s = new i(null);
      return this.copy(s), s;
    }, i.prototype._expand = function(s) {
      for (; this.length < s; )
        this.words[this.length++] = 0;
      return this;
    }, i.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, i.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol != "undefined" && typeof Symbol.for == "function" ? i.prototype[Symbol.for("nodejs.util.inspect.custom")] = b : i.prototype.inspect = b;
    function b() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var x = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], A = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], O = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    i.prototype.toString = function(s, o) {
      s = s || 10, o = o | 0 || 1;
      var a;
      if (s === 16 || s === "hex") {
        a = "";
        for (var c = 0, p = 0, d = 0; d < this.length; d++) {
          var y = this.words[d], m = ((y << c | p) & 16777215).toString(16);
          p = y >>> 24 - c & 16777215, p !== 0 || d !== this.length - 1 ? a = x[6 - m.length] + m + a : a = m + a, c += 2, c >= 26 && (c -= 26, d--);
        }
        for (p !== 0 && (a = p.toString(16) + a); a.length % o !== 0; )
          a = "0" + a;
        return this.negative !== 0 && (a = "-" + a), a;
      }
      if (s === (s | 0) && s >= 2 && s <= 36) {
        var f = A[s], u = O[s];
        a = "";
        var w = this.clone();
        for (w.negative = 0; !w.isZero(); ) {
          var R = w.modrn(u).toString(s);
          w = w.idivn(u), w.isZero() ? a = R + a : a = x[f - R.length] + R + a;
        }
        for (this.isZero() && (a = "0" + a); a.length % o !== 0; )
          a = "0" + a;
        return this.negative !== 0 && (a = "-" + a), a;
      }
      t(false, "Base should be between 2 and 36");
    }, i.prototype.toNumber = function() {
      var s = this.words[0];
      return this.length === 2 ? s += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? s += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && t(false, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -s : s;
    }, i.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, l && (i.prototype.toBuffer = function(s, o) {
      return this.toArrayLike(l, s, o);
    }), i.prototype.toArray = function(s, o) {
      return this.toArrayLike(Array, s, o);
    };
    var k = function(s, o) {
      return s.allocUnsafe ? s.allocUnsafe(o) : new s(o);
    };
    i.prototype.toArrayLike = function(s, o, a) {
      this._strip();
      var c = this.byteLength(), p = a || Math.max(1, c);
      t(c <= p, "byte array longer than desired length"), t(p > 0, "Requested array length <= 0");
      var d = k(s, p), y = o === "le" ? "LE" : "BE";
      return this["_toArrayLike" + y](d, c), d;
    }, i.prototype._toArrayLikeLE = function(s, o) {
      for (var a = 0, c = 0, p = 0, d = 0; p < this.length; p++) {
        var y = this.words[p] << d | c;
        s[a++] = y & 255, a < s.length && (s[a++] = y >> 8 & 255), a < s.length && (s[a++] = y >> 16 & 255), d === 6 ? (a < s.length && (s[a++] = y >> 24 & 255), c = 0, d = 0) : (c = y >>> 24, d += 2);
      }
      if (a < s.length)
        for (s[a++] = c; a < s.length; )
          s[a++] = 0;
    }, i.prototype._toArrayLikeBE = function(s, o) {
      for (var a = s.length - 1, c = 0, p = 0, d = 0; p < this.length; p++) {
        var y = this.words[p] << d | c;
        s[a--] = y & 255, a >= 0 && (s[a--] = y >> 8 & 255), a >= 0 && (s[a--] = y >> 16 & 255), d === 6 ? (a >= 0 && (s[a--] = y >> 24 & 255), c = 0, d = 0) : (c = y >>> 24, d += 2);
      }
      if (a >= 0)
        for (s[a--] = c; a >= 0; )
          s[a--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(s) {
      return 32 - Math.clz32(s);
    } : i.prototype._countBits = function(s) {
      var o = s, a = 0;
      return o >= 4096 && (a += 13, o >>>= 13), o >= 64 && (a += 7, o >>>= 7), o >= 8 && (a += 4, o >>>= 4), o >= 2 && (a += 2, o >>>= 2), a + o;
    }, i.prototype._zeroBits = function(s) {
      if (s === 0)
        return 26;
      var o = s, a = 0;
      return o & 8191 || (a += 13, o >>>= 13), o & 127 || (a += 7, o >>>= 7), o & 15 || (a += 4, o >>>= 4), o & 3 || (a += 2, o >>>= 2), o & 1 || a++, a;
    }, i.prototype.bitLength = function() {
      var s = this.words[this.length - 1], o = this._countBits(s);
      return (this.length - 1) * 26 + o;
    };
    function N(M) {
      for (var s = new Array(M.bitLength()), o = 0; o < s.length; o++) {
        var a = o / 26 | 0, c = o % 26;
        s[o] = M.words[a] >>> c & 1;
      }
      return s;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var s = 0, o = 0; o < this.length; o++) {
        var a = this._zeroBits(this.words[o]);
        if (s += a, a !== 26)
          break;
      }
      return s;
    }, i.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, i.prototype.toTwos = function(s) {
      return this.negative !== 0 ? this.abs().inotn(s).iaddn(1) : this.clone();
    }, i.prototype.fromTwos = function(s) {
      return this.testn(s - 1) ? this.notn(s).iaddn(1).ineg() : this.clone();
    }, i.prototype.isNeg = function() {
      return this.negative !== 0;
    }, i.prototype.neg = function() {
      return this.clone().ineg();
    }, i.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, i.prototype.iuor = function(s) {
      for (; this.length < s.length; )
        this.words[this.length++] = 0;
      for (var o = 0; o < s.length; o++)
        this.words[o] = this.words[o] | s.words[o];
      return this._strip();
    }, i.prototype.ior = function(s) {
      return t((this.negative | s.negative) === 0), this.iuor(s);
    }, i.prototype.or = function(s) {
      return this.length > s.length ? this.clone().ior(s) : s.clone().ior(this);
    }, i.prototype.uor = function(s) {
      return this.length > s.length ? this.clone().iuor(s) : s.clone().iuor(this);
    }, i.prototype.iuand = function(s) {
      var o;
      this.length > s.length ? o = s : o = this;
      for (var a = 0; a < o.length; a++)
        this.words[a] = this.words[a] & s.words[a];
      return this.length = o.length, this._strip();
    }, i.prototype.iand = function(s) {
      return t((this.negative | s.negative) === 0), this.iuand(s);
    }, i.prototype.and = function(s) {
      return this.length > s.length ? this.clone().iand(s) : s.clone().iand(this);
    }, i.prototype.uand = function(s) {
      return this.length > s.length ? this.clone().iuand(s) : s.clone().iuand(this);
    }, i.prototype.iuxor = function(s) {
      var o, a;
      this.length > s.length ? (o = this, a = s) : (o = s, a = this);
      for (var c = 0; c < a.length; c++)
        this.words[c] = o.words[c] ^ a.words[c];
      if (this !== o)
        for (; c < o.length; c++)
          this.words[c] = o.words[c];
      return this.length = o.length, this._strip();
    }, i.prototype.ixor = function(s) {
      return t((this.negative | s.negative) === 0), this.iuxor(s);
    }, i.prototype.xor = function(s) {
      return this.length > s.length ? this.clone().ixor(s) : s.clone().ixor(this);
    }, i.prototype.uxor = function(s) {
      return this.length > s.length ? this.clone().iuxor(s) : s.clone().iuxor(this);
    }, i.prototype.inotn = function(s) {
      t(typeof s == "number" && s >= 0);
      var o = Math.ceil(s / 26) | 0, a = s % 26;
      this._expand(o), a > 0 && o--;
      for (var c = 0; c < o; c++)
        this.words[c] = ~this.words[c] & 67108863;
      return a > 0 && (this.words[c] = ~this.words[c] & 67108863 >> 26 - a), this._strip();
    }, i.prototype.notn = function(s) {
      return this.clone().inotn(s);
    }, i.prototype.setn = function(s, o) {
      t(typeof s == "number" && s >= 0);
      var a = s / 26 | 0, c = s % 26;
      return this._expand(a + 1), o ? this.words[a] = this.words[a] | 1 << c : this.words[a] = this.words[a] & ~(1 << c), this._strip();
    }, i.prototype.iadd = function(s) {
      var o;
      if (this.negative !== 0 && s.negative === 0)
        return this.negative = 0, o = this.isub(s), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && s.negative !== 0)
        return s.negative = 0, o = this.isub(s), s.negative = 1, o._normSign();
      var a, c;
      this.length > s.length ? (a = this, c = s) : (a = s, c = this);
      for (var p = 0, d = 0; d < c.length; d++)
        o = (a.words[d] | 0) + (c.words[d] | 0) + p, this.words[d] = o & 67108863, p = o >>> 26;
      for (; p !== 0 && d < a.length; d++)
        o = (a.words[d] | 0) + p, this.words[d] = o & 67108863, p = o >>> 26;
      if (this.length = a.length, p !== 0)
        this.words[this.length] = p, this.length++;
      else if (a !== this)
        for (; d < a.length; d++)
          this.words[d] = a.words[d];
      return this;
    }, i.prototype.add = function(s) {
      var o;
      return s.negative !== 0 && this.negative === 0 ? (s.negative = 0, o = this.sub(s), s.negative ^= 1, o) : s.negative === 0 && this.negative !== 0 ? (this.negative = 0, o = s.sub(this), this.negative = 1, o) : this.length > s.length ? this.clone().iadd(s) : s.clone().iadd(this);
    }, i.prototype.isub = function(s) {
      if (s.negative !== 0) {
        s.negative = 0;
        var o = this.iadd(s);
        return s.negative = 1, o._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(s), this.negative = 1, this._normSign();
      var a = this.cmp(s);
      if (a === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var c, p;
      a > 0 ? (c = this, p = s) : (c = s, p = this);
      for (var d = 0, y = 0; y < p.length; y++)
        o = (c.words[y] | 0) - (p.words[y] | 0) + d, d = o >> 26, this.words[y] = o & 67108863;
      for (; d !== 0 && y < c.length; y++)
        o = (c.words[y] | 0) + d, d = o >> 26, this.words[y] = o & 67108863;
      if (d === 0 && y < c.length && c !== this)
        for (; y < c.length; y++)
          this.words[y] = c.words[y];
      return this.length = Math.max(this.length, y), c !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(s) {
      return this.clone().isub(s);
    };
    function q(M, s, o) {
      o.negative = s.negative ^ M.negative;
      var a = M.length + s.length | 0;
      o.length = a, a = a - 1 | 0;
      var c = M.words[0] | 0, p = s.words[0] | 0, d = c * p, y = d & 67108863, m = d / 67108864 | 0;
      o.words[0] = y;
      for (var f = 1; f < a; f++) {
        for (var u = m >>> 26, w = m & 67108863, R = Math.min(f, s.length - 1), F = Math.max(0, f - M.length + 1); F <= R; F++) {
          var j = f - F | 0;
          c = M.words[j] | 0, p = s.words[F] | 0, d = c * p + w, u += d / 67108864 | 0, w = d & 67108863;
        }
        o.words[f] = w | 0, m = u | 0;
      }
      return m !== 0 ? o.words[f] = m | 0 : o.length--, o._strip();
    }
    var C = function(s, o, a) {
      var c = s.words, p = o.words, d = a.words, y = 0, m, f, u, w = c[0] | 0, R = w & 8191, F = w >>> 13, j = c[1] | 0, H = j & 8191, ne = j >>> 13, Ee = c[2] | 0, _e = Ee & 8191, oe = Ee >>> 13, Oe = c[3] | 0, Fe = Oe & 8191, ve = Oe >>> 13, ae = c[4] | 0, De = ae & 8191, we = ae >>> 13, Te = c[5] | 0, Le = Te & 8191, ge = Te >>> 13, We = c[6] | 0, qe = We & 8191, be = We >>> 13, ke = c[7] | 0, je = ke & 8191, le = ke >>> 13, $e = c[8] | 0, Pe = $e & 8191, Me = $e >>> 13, Ve = c[9] | 0, Ye = Ve & 8191, ue = Ve >>> 13, Ke = p[0] | 0, ze = Ke & 8191, ce = Ke >>> 13, Ge = p[1] | 0, He = Ge & 8191, de = Ge >>> 13, _ = p[2] | 0, E = _ & 8191, S = _ >>> 13, U = p[3] | 0, z = U & 8191, Y = U >>> 13, $ = p[4] | 0, X = $ & 8191, G = $ >>> 13, Q = p[5] | 0, xe = Q & 8191, re = Q >>> 13, Ie = p[6] | 0, Re = Ie & 8191, he = Ie >>> 13, Ce = p[7] | 0, Ne = Ce & 8191, D = Ce >>> 13, se = p[8] | 0, me = se & 8191, te = se >>> 13, Ue = p[9] | 0, Ze = Ue & 8191, Ae = Ue >>> 13;
      a.negative = s.negative ^ o.negative, a.length = 19, m = Math.imul(R, ze), f = Math.imul(R, ce), f = f + Math.imul(F, ze) | 0, u = Math.imul(F, ce);
      var Je = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (Je >>> 26) | 0, Je &= 67108863, m = Math.imul(H, ze), f = Math.imul(H, ce), f = f + Math.imul(ne, ze) | 0, u = Math.imul(ne, ce), m = m + Math.imul(R, He) | 0, f = f + Math.imul(R, de) | 0, f = f + Math.imul(F, He) | 0, u = u + Math.imul(F, de) | 0;
      var Ht = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (Ht >>> 26) | 0, Ht &= 67108863, m = Math.imul(_e, ze), f = Math.imul(_e, ce), f = f + Math.imul(oe, ze) | 0, u = Math.imul(oe, ce), m = m + Math.imul(H, He) | 0, f = f + Math.imul(H, de) | 0, f = f + Math.imul(ne, He) | 0, u = u + Math.imul(ne, de) | 0, m = m + Math.imul(R, E) | 0, f = f + Math.imul(R, S) | 0, f = f + Math.imul(F, E) | 0, u = u + Math.imul(F, S) | 0;
      var Jt = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (Jt >>> 26) | 0, Jt &= 67108863, m = Math.imul(Fe, ze), f = Math.imul(Fe, ce), f = f + Math.imul(ve, ze) | 0, u = Math.imul(ve, ce), m = m + Math.imul(_e, He) | 0, f = f + Math.imul(_e, de) | 0, f = f + Math.imul(oe, He) | 0, u = u + Math.imul(oe, de) | 0, m = m + Math.imul(H, E) | 0, f = f + Math.imul(H, S) | 0, f = f + Math.imul(ne, E) | 0, u = u + Math.imul(ne, S) | 0, m = m + Math.imul(R, z) | 0, f = f + Math.imul(R, Y) | 0, f = f + Math.imul(F, z) | 0, u = u + Math.imul(F, Y) | 0;
      var Zt = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (Zt >>> 26) | 0, Zt &= 67108863, m = Math.imul(De, ze), f = Math.imul(De, ce), f = f + Math.imul(we, ze) | 0, u = Math.imul(we, ce), m = m + Math.imul(Fe, He) | 0, f = f + Math.imul(Fe, de) | 0, f = f + Math.imul(ve, He) | 0, u = u + Math.imul(ve, de) | 0, m = m + Math.imul(_e, E) | 0, f = f + Math.imul(_e, S) | 0, f = f + Math.imul(oe, E) | 0, u = u + Math.imul(oe, S) | 0, m = m + Math.imul(H, z) | 0, f = f + Math.imul(H, Y) | 0, f = f + Math.imul(ne, z) | 0, u = u + Math.imul(ne, Y) | 0, m = m + Math.imul(R, X) | 0, f = f + Math.imul(R, G) | 0, f = f + Math.imul(F, X) | 0, u = u + Math.imul(F, G) | 0;
      var Qt = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (Qt >>> 26) | 0, Qt &= 67108863, m = Math.imul(Le, ze), f = Math.imul(Le, ce), f = f + Math.imul(ge, ze) | 0, u = Math.imul(ge, ce), m = m + Math.imul(De, He) | 0, f = f + Math.imul(De, de) | 0, f = f + Math.imul(we, He) | 0, u = u + Math.imul(we, de) | 0, m = m + Math.imul(Fe, E) | 0, f = f + Math.imul(Fe, S) | 0, f = f + Math.imul(ve, E) | 0, u = u + Math.imul(ve, S) | 0, m = m + Math.imul(_e, z) | 0, f = f + Math.imul(_e, Y) | 0, f = f + Math.imul(oe, z) | 0, u = u + Math.imul(oe, Y) | 0, m = m + Math.imul(H, X) | 0, f = f + Math.imul(H, G) | 0, f = f + Math.imul(ne, X) | 0, u = u + Math.imul(ne, G) | 0, m = m + Math.imul(R, xe) | 0, f = f + Math.imul(R, re) | 0, f = f + Math.imul(F, xe) | 0, u = u + Math.imul(F, re) | 0;
      var Xt = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (Xt >>> 26) | 0, Xt &= 67108863, m = Math.imul(qe, ze), f = Math.imul(qe, ce), f = f + Math.imul(be, ze) | 0, u = Math.imul(be, ce), m = m + Math.imul(Le, He) | 0, f = f + Math.imul(Le, de) | 0, f = f + Math.imul(ge, He) | 0, u = u + Math.imul(ge, de) | 0, m = m + Math.imul(De, E) | 0, f = f + Math.imul(De, S) | 0, f = f + Math.imul(we, E) | 0, u = u + Math.imul(we, S) | 0, m = m + Math.imul(Fe, z) | 0, f = f + Math.imul(Fe, Y) | 0, f = f + Math.imul(ve, z) | 0, u = u + Math.imul(ve, Y) | 0, m = m + Math.imul(_e, X) | 0, f = f + Math.imul(_e, G) | 0, f = f + Math.imul(oe, X) | 0, u = u + Math.imul(oe, G) | 0, m = m + Math.imul(H, xe) | 0, f = f + Math.imul(H, re) | 0, f = f + Math.imul(ne, xe) | 0, u = u + Math.imul(ne, re) | 0, m = m + Math.imul(R, Re) | 0, f = f + Math.imul(R, he) | 0, f = f + Math.imul(F, Re) | 0, u = u + Math.imul(F, he) | 0;
      var er = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (er >>> 26) | 0, er &= 67108863, m = Math.imul(je, ze), f = Math.imul(je, ce), f = f + Math.imul(le, ze) | 0, u = Math.imul(le, ce), m = m + Math.imul(qe, He) | 0, f = f + Math.imul(qe, de) | 0, f = f + Math.imul(be, He) | 0, u = u + Math.imul(be, de) | 0, m = m + Math.imul(Le, E) | 0, f = f + Math.imul(Le, S) | 0, f = f + Math.imul(ge, E) | 0, u = u + Math.imul(ge, S) | 0, m = m + Math.imul(De, z) | 0, f = f + Math.imul(De, Y) | 0, f = f + Math.imul(we, z) | 0, u = u + Math.imul(we, Y) | 0, m = m + Math.imul(Fe, X) | 0, f = f + Math.imul(Fe, G) | 0, f = f + Math.imul(ve, X) | 0, u = u + Math.imul(ve, G) | 0, m = m + Math.imul(_e, xe) | 0, f = f + Math.imul(_e, re) | 0, f = f + Math.imul(oe, xe) | 0, u = u + Math.imul(oe, re) | 0, m = m + Math.imul(H, Re) | 0, f = f + Math.imul(H, he) | 0, f = f + Math.imul(ne, Re) | 0, u = u + Math.imul(ne, he) | 0, m = m + Math.imul(R, Ne) | 0, f = f + Math.imul(R, D) | 0, f = f + Math.imul(F, Ne) | 0, u = u + Math.imul(F, D) | 0;
      var tr = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (tr >>> 26) | 0, tr &= 67108863, m = Math.imul(Pe, ze), f = Math.imul(Pe, ce), f = f + Math.imul(Me, ze) | 0, u = Math.imul(Me, ce), m = m + Math.imul(je, He) | 0, f = f + Math.imul(je, de) | 0, f = f + Math.imul(le, He) | 0, u = u + Math.imul(le, de) | 0, m = m + Math.imul(qe, E) | 0, f = f + Math.imul(qe, S) | 0, f = f + Math.imul(be, E) | 0, u = u + Math.imul(be, S) | 0, m = m + Math.imul(Le, z) | 0, f = f + Math.imul(Le, Y) | 0, f = f + Math.imul(ge, z) | 0, u = u + Math.imul(ge, Y) | 0, m = m + Math.imul(De, X) | 0, f = f + Math.imul(De, G) | 0, f = f + Math.imul(we, X) | 0, u = u + Math.imul(we, G) | 0, m = m + Math.imul(Fe, xe) | 0, f = f + Math.imul(Fe, re) | 0, f = f + Math.imul(ve, xe) | 0, u = u + Math.imul(ve, re) | 0, m = m + Math.imul(_e, Re) | 0, f = f + Math.imul(_e, he) | 0, f = f + Math.imul(oe, Re) | 0, u = u + Math.imul(oe, he) | 0, m = m + Math.imul(H, Ne) | 0, f = f + Math.imul(H, D) | 0, f = f + Math.imul(ne, Ne) | 0, u = u + Math.imul(ne, D) | 0, m = m + Math.imul(R, me) | 0, f = f + Math.imul(R, te) | 0, f = f + Math.imul(F, me) | 0, u = u + Math.imul(F, te) | 0;
      var rr = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (rr >>> 26) | 0, rr &= 67108863, m = Math.imul(Ye, ze), f = Math.imul(Ye, ce), f = f + Math.imul(ue, ze) | 0, u = Math.imul(ue, ce), m = m + Math.imul(Pe, He) | 0, f = f + Math.imul(Pe, de) | 0, f = f + Math.imul(Me, He) | 0, u = u + Math.imul(Me, de) | 0, m = m + Math.imul(je, E) | 0, f = f + Math.imul(je, S) | 0, f = f + Math.imul(le, E) | 0, u = u + Math.imul(le, S) | 0, m = m + Math.imul(qe, z) | 0, f = f + Math.imul(qe, Y) | 0, f = f + Math.imul(be, z) | 0, u = u + Math.imul(be, Y) | 0, m = m + Math.imul(Le, X) | 0, f = f + Math.imul(Le, G) | 0, f = f + Math.imul(ge, X) | 0, u = u + Math.imul(ge, G) | 0, m = m + Math.imul(De, xe) | 0, f = f + Math.imul(De, re) | 0, f = f + Math.imul(we, xe) | 0, u = u + Math.imul(we, re) | 0, m = m + Math.imul(Fe, Re) | 0, f = f + Math.imul(Fe, he) | 0, f = f + Math.imul(ve, Re) | 0, u = u + Math.imul(ve, he) | 0, m = m + Math.imul(_e, Ne) | 0, f = f + Math.imul(_e, D) | 0, f = f + Math.imul(oe, Ne) | 0, u = u + Math.imul(oe, D) | 0, m = m + Math.imul(H, me) | 0, f = f + Math.imul(H, te) | 0, f = f + Math.imul(ne, me) | 0, u = u + Math.imul(ne, te) | 0, m = m + Math.imul(R, Ze) | 0, f = f + Math.imul(R, Ae) | 0, f = f + Math.imul(F, Ze) | 0, u = u + Math.imul(F, Ae) | 0;
      var nr = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (nr >>> 26) | 0, nr &= 67108863, m = Math.imul(Ye, He), f = Math.imul(Ye, de), f = f + Math.imul(ue, He) | 0, u = Math.imul(ue, de), m = m + Math.imul(Pe, E) | 0, f = f + Math.imul(Pe, S) | 0, f = f + Math.imul(Me, E) | 0, u = u + Math.imul(Me, S) | 0, m = m + Math.imul(je, z) | 0, f = f + Math.imul(je, Y) | 0, f = f + Math.imul(le, z) | 0, u = u + Math.imul(le, Y) | 0, m = m + Math.imul(qe, X) | 0, f = f + Math.imul(qe, G) | 0, f = f + Math.imul(be, X) | 0, u = u + Math.imul(be, G) | 0, m = m + Math.imul(Le, xe) | 0, f = f + Math.imul(Le, re) | 0, f = f + Math.imul(ge, xe) | 0, u = u + Math.imul(ge, re) | 0, m = m + Math.imul(De, Re) | 0, f = f + Math.imul(De, he) | 0, f = f + Math.imul(we, Re) | 0, u = u + Math.imul(we, he) | 0, m = m + Math.imul(Fe, Ne) | 0, f = f + Math.imul(Fe, D) | 0, f = f + Math.imul(ve, Ne) | 0, u = u + Math.imul(ve, D) | 0, m = m + Math.imul(_e, me) | 0, f = f + Math.imul(_e, te) | 0, f = f + Math.imul(oe, me) | 0, u = u + Math.imul(oe, te) | 0, m = m + Math.imul(H, Ze) | 0, f = f + Math.imul(H, Ae) | 0, f = f + Math.imul(ne, Ze) | 0, u = u + Math.imul(ne, Ae) | 0;
      var ir = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (ir >>> 26) | 0, ir &= 67108863, m = Math.imul(Ye, E), f = Math.imul(Ye, S), f = f + Math.imul(ue, E) | 0, u = Math.imul(ue, S), m = m + Math.imul(Pe, z) | 0, f = f + Math.imul(Pe, Y) | 0, f = f + Math.imul(Me, z) | 0, u = u + Math.imul(Me, Y) | 0, m = m + Math.imul(je, X) | 0, f = f + Math.imul(je, G) | 0, f = f + Math.imul(le, X) | 0, u = u + Math.imul(le, G) | 0, m = m + Math.imul(qe, xe) | 0, f = f + Math.imul(qe, re) | 0, f = f + Math.imul(be, xe) | 0, u = u + Math.imul(be, re) | 0, m = m + Math.imul(Le, Re) | 0, f = f + Math.imul(Le, he) | 0, f = f + Math.imul(ge, Re) | 0, u = u + Math.imul(ge, he) | 0, m = m + Math.imul(De, Ne) | 0, f = f + Math.imul(De, D) | 0, f = f + Math.imul(we, Ne) | 0, u = u + Math.imul(we, D) | 0, m = m + Math.imul(Fe, me) | 0, f = f + Math.imul(Fe, te) | 0, f = f + Math.imul(ve, me) | 0, u = u + Math.imul(ve, te) | 0, m = m + Math.imul(_e, Ze) | 0, f = f + Math.imul(_e, Ae) | 0, f = f + Math.imul(oe, Ze) | 0, u = u + Math.imul(oe, Ae) | 0;
      var or = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (or >>> 26) | 0, or &= 67108863, m = Math.imul(Ye, z), f = Math.imul(Ye, Y), f = f + Math.imul(ue, z) | 0, u = Math.imul(ue, Y), m = m + Math.imul(Pe, X) | 0, f = f + Math.imul(Pe, G) | 0, f = f + Math.imul(Me, X) | 0, u = u + Math.imul(Me, G) | 0, m = m + Math.imul(je, xe) | 0, f = f + Math.imul(je, re) | 0, f = f + Math.imul(le, xe) | 0, u = u + Math.imul(le, re) | 0, m = m + Math.imul(qe, Re) | 0, f = f + Math.imul(qe, he) | 0, f = f + Math.imul(be, Re) | 0, u = u + Math.imul(be, he) | 0, m = m + Math.imul(Le, Ne) | 0, f = f + Math.imul(Le, D) | 0, f = f + Math.imul(ge, Ne) | 0, u = u + Math.imul(ge, D) | 0, m = m + Math.imul(De, me) | 0, f = f + Math.imul(De, te) | 0, f = f + Math.imul(we, me) | 0, u = u + Math.imul(we, te) | 0, m = m + Math.imul(Fe, Ze) | 0, f = f + Math.imul(Fe, Ae) | 0, f = f + Math.imul(ve, Ze) | 0, u = u + Math.imul(ve, Ae) | 0;
      var sr = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (sr >>> 26) | 0, sr &= 67108863, m = Math.imul(Ye, X), f = Math.imul(Ye, G), f = f + Math.imul(ue, X) | 0, u = Math.imul(ue, G), m = m + Math.imul(Pe, xe) | 0, f = f + Math.imul(Pe, re) | 0, f = f + Math.imul(Me, xe) | 0, u = u + Math.imul(Me, re) | 0, m = m + Math.imul(je, Re) | 0, f = f + Math.imul(je, he) | 0, f = f + Math.imul(le, Re) | 0, u = u + Math.imul(le, he) | 0, m = m + Math.imul(qe, Ne) | 0, f = f + Math.imul(qe, D) | 0, f = f + Math.imul(be, Ne) | 0, u = u + Math.imul(be, D) | 0, m = m + Math.imul(Le, me) | 0, f = f + Math.imul(Le, te) | 0, f = f + Math.imul(ge, me) | 0, u = u + Math.imul(ge, te) | 0, m = m + Math.imul(De, Ze) | 0, f = f + Math.imul(De, Ae) | 0, f = f + Math.imul(we, Ze) | 0, u = u + Math.imul(we, Ae) | 0;
      var ar = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (ar >>> 26) | 0, ar &= 67108863, m = Math.imul(Ye, xe), f = Math.imul(Ye, re), f = f + Math.imul(ue, xe) | 0, u = Math.imul(ue, re), m = m + Math.imul(Pe, Re) | 0, f = f + Math.imul(Pe, he) | 0, f = f + Math.imul(Me, Re) | 0, u = u + Math.imul(Me, he) | 0, m = m + Math.imul(je, Ne) | 0, f = f + Math.imul(je, D) | 0, f = f + Math.imul(le, Ne) | 0, u = u + Math.imul(le, D) | 0, m = m + Math.imul(qe, me) | 0, f = f + Math.imul(qe, te) | 0, f = f + Math.imul(be, me) | 0, u = u + Math.imul(be, te) | 0, m = m + Math.imul(Le, Ze) | 0, f = f + Math.imul(Le, Ae) | 0, f = f + Math.imul(ge, Ze) | 0, u = u + Math.imul(ge, Ae) | 0;
      var fr = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (fr >>> 26) | 0, fr &= 67108863, m = Math.imul(Ye, Re), f = Math.imul(Ye, he), f = f + Math.imul(ue, Re) | 0, u = Math.imul(ue, he), m = m + Math.imul(Pe, Ne) | 0, f = f + Math.imul(Pe, D) | 0, f = f + Math.imul(Me, Ne) | 0, u = u + Math.imul(Me, D) | 0, m = m + Math.imul(je, me) | 0, f = f + Math.imul(je, te) | 0, f = f + Math.imul(le, me) | 0, u = u + Math.imul(le, te) | 0, m = m + Math.imul(qe, Ze) | 0, f = f + Math.imul(qe, Ae) | 0, f = f + Math.imul(be, Ze) | 0, u = u + Math.imul(be, Ae) | 0;
      var lr = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (lr >>> 26) | 0, lr &= 67108863, m = Math.imul(Ye, Ne), f = Math.imul(Ye, D), f = f + Math.imul(ue, Ne) | 0, u = Math.imul(ue, D), m = m + Math.imul(Pe, me) | 0, f = f + Math.imul(Pe, te) | 0, f = f + Math.imul(Me, me) | 0, u = u + Math.imul(Me, te) | 0, m = m + Math.imul(je, Ze) | 0, f = f + Math.imul(je, Ae) | 0, f = f + Math.imul(le, Ze) | 0, u = u + Math.imul(le, Ae) | 0;
      var ur = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (ur >>> 26) | 0, ur &= 67108863, m = Math.imul(Ye, me), f = Math.imul(Ye, te), f = f + Math.imul(ue, me) | 0, u = Math.imul(ue, te), m = m + Math.imul(Pe, Ze) | 0, f = f + Math.imul(Pe, Ae) | 0, f = f + Math.imul(Me, Ze) | 0, u = u + Math.imul(Me, Ae) | 0;
      var cr = (y + m | 0) + ((f & 8191) << 13) | 0;
      y = (u + (f >>> 13) | 0) + (cr >>> 26) | 0, cr &= 67108863, m = Math.imul(Ye, Ze), f = Math.imul(Ye, Ae), f = f + Math.imul(ue, Ze) | 0, u = Math.imul(ue, Ae);
      var hr = (y + m | 0) + ((f & 8191) << 13) | 0;
      return y = (u + (f >>> 13) | 0) + (hr >>> 26) | 0, hr &= 67108863, d[0] = Je, d[1] = Ht, d[2] = Jt, d[3] = Zt, d[4] = Qt, d[5] = Xt, d[6] = er, d[7] = tr, d[8] = rr, d[9] = nr, d[10] = ir, d[11] = or, d[12] = sr, d[13] = ar, d[14] = fr, d[15] = lr, d[16] = ur, d[17] = cr, d[18] = hr, y !== 0 && (d[19] = y, a.length++), a;
    };
    Math.imul || (C = q);
    function J(M, s, o) {
      o.negative = s.negative ^ M.negative, o.length = M.length + s.length;
      for (var a = 0, c = 0, p = 0; p < o.length - 1; p++) {
        var d = c;
        c = 0;
        for (var y = a & 67108863, m = Math.min(p, s.length - 1), f = Math.max(0, p - M.length + 1); f <= m; f++) {
          var u = p - f, w = M.words[u] | 0, R = s.words[f] | 0, F = w * R, j = F & 67108863;
          d = d + (F / 67108864 | 0) | 0, j = j + y | 0, y = j & 67108863, d = d + (j >>> 26) | 0, c += d >>> 26, d &= 67108863;
        }
        o.words[p] = y, a = d, d = c;
      }
      return a !== 0 ? o.words[p] = a : o.length--, o._strip();
    }
    function K(M, s, o) {
      return J(M, s, o);
    }
    i.prototype.mulTo = function(s, o) {
      var a, c = this.length + s.length;
      return this.length === 10 && s.length === 10 ? a = C(this, s, o) : c < 63 ? a = q(this, s, o) : c < 1024 ? a = J(this, s, o) : a = K(this, s, o), a;
    };
    i.prototype.mul = function(s) {
      var o = new i(null);
      return o.words = new Array(this.length + s.length), this.mulTo(s, o);
    }, i.prototype.mulf = function(s) {
      var o = new i(null);
      return o.words = new Array(this.length + s.length), K(this, s, o);
    }, i.prototype.imul = function(s) {
      return this.clone().mulTo(s, this);
    }, i.prototype.imuln = function(s) {
      var o = s < 0;
      o && (s = -s), t(typeof s == "number"), t(s < 67108864);
      for (var a = 0, c = 0; c < this.length; c++) {
        var p = (this.words[c] | 0) * s, d = (p & 67108863) + (a & 67108863);
        a >>= 26, a += p / 67108864 | 0, a += d >>> 26, this.words[c] = d & 67108863;
      }
      return a !== 0 && (this.words[c] = a, this.length++), o ? this.ineg() : this;
    }, i.prototype.muln = function(s) {
      return this.clone().imuln(s);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(s) {
      var o = N(s);
      if (o.length === 0)
        return new i(1);
      for (var a = this, c = 0; c < o.length && o[c] === 0; c++, a = a.sqr())
        ;
      if (++c < o.length)
        for (var p = a.sqr(); c < o.length; c++, p = p.sqr())
          o[c] !== 0 && (a = a.mul(p));
      return a;
    }, i.prototype.iushln = function(s) {
      t(typeof s == "number" && s >= 0);
      var o = s % 26, a = (s - o) / 26, c = 67108863 >>> 26 - o << 26 - o, p;
      if (o !== 0) {
        var d = 0;
        for (p = 0; p < this.length; p++) {
          var y = this.words[p] & c, m = (this.words[p] | 0) - y << o;
          this.words[p] = m | d, d = y >>> 26 - o;
        }
        d && (this.words[p] = d, this.length++);
      }
      if (a !== 0) {
        for (p = this.length - 1; p >= 0; p--)
          this.words[p + a] = this.words[p];
        for (p = 0; p < a; p++)
          this.words[p] = 0;
        this.length += a;
      }
      return this._strip();
    }, i.prototype.ishln = function(s) {
      return t(this.negative === 0), this.iushln(s);
    }, i.prototype.iushrn = function(s, o, a) {
      t(typeof s == "number" && s >= 0);
      var c;
      o ? c = (o - o % 26) / 26 : c = 0;
      var p = s % 26, d = Math.min((s - p) / 26, this.length), y = 67108863 ^ 67108863 >>> p << p, m = a;
      if (c -= d, c = Math.max(0, c), m) {
        for (var f = 0; f < d; f++)
          m.words[f] = this.words[f];
        m.length = d;
      }
      if (d !== 0)
        if (this.length > d)
          for (this.length -= d, f = 0; f < this.length; f++)
            this.words[f] = this.words[f + d];
        else
          this.words[0] = 0, this.length = 1;
      var u = 0;
      for (f = this.length - 1; f >= 0 && (u !== 0 || f >= c); f--) {
        var w = this.words[f] | 0;
        this.words[f] = u << 26 - p | w >>> p, u = w & y;
      }
      return m && u !== 0 && (m.words[m.length++] = u), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(s, o, a) {
      return t(this.negative === 0), this.iushrn(s, o, a);
    }, i.prototype.shln = function(s) {
      return this.clone().ishln(s);
    }, i.prototype.ushln = function(s) {
      return this.clone().iushln(s);
    }, i.prototype.shrn = function(s) {
      return this.clone().ishrn(s);
    }, i.prototype.ushrn = function(s) {
      return this.clone().iushrn(s);
    }, i.prototype.testn = function(s) {
      t(typeof s == "number" && s >= 0);
      var o = s % 26, a = (s - o) / 26, c = 1 << o;
      if (this.length <= a)
        return false;
      var p = this.words[a];
      return !!(p & c);
    }, i.prototype.imaskn = function(s) {
      t(typeof s == "number" && s >= 0);
      var o = s % 26, a = (s - o) / 26;
      if (t(this.negative === 0, "imaskn works only with positive numbers"), this.length <= a)
        return this;
      if (o !== 0 && a++, this.length = Math.min(a, this.length), o !== 0) {
        var c = 67108863 ^ 67108863 >>> o << o;
        this.words[this.length - 1] &= c;
      }
      return this._strip();
    }, i.prototype.maskn = function(s) {
      return this.clone().imaskn(s);
    }, i.prototype.iaddn = function(s) {
      return t(typeof s == "number"), t(s < 67108864), s < 0 ? this.isubn(-s) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= s ? (this.words[0] = s - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(s), this.negative = 1, this) : this._iaddn(s);
    }, i.prototype._iaddn = function(s) {
      this.words[0] += s;
      for (var o = 0; o < this.length && this.words[o] >= 67108864; o++)
        this.words[o] -= 67108864, o === this.length - 1 ? this.words[o + 1] = 1 : this.words[o + 1]++;
      return this.length = Math.max(this.length, o + 1), this;
    }, i.prototype.isubn = function(s) {
      if (t(typeof s == "number"), t(s < 67108864), s < 0)
        return this.iaddn(-s);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(s), this.negative = 1, this;
      if (this.words[0] -= s, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var o = 0; o < this.length && this.words[o] < 0; o++)
          this.words[o] += 67108864, this.words[o + 1] -= 1;
      return this._strip();
    }, i.prototype.addn = function(s) {
      return this.clone().iaddn(s);
    }, i.prototype.subn = function(s) {
      return this.clone().isubn(s);
    }, i.prototype.iabs = function() {
      return this.negative = 0, this;
    }, i.prototype.abs = function() {
      return this.clone().iabs();
    }, i.prototype._ishlnsubmul = function(s, o, a) {
      var c = s.length + a, p;
      this._expand(c);
      var d, y = 0;
      for (p = 0; p < s.length; p++) {
        d = (this.words[p + a] | 0) + y;
        var m = (s.words[p] | 0) * o;
        d -= m & 67108863, y = (d >> 26) - (m / 67108864 | 0), this.words[p + a] = d & 67108863;
      }
      for (; p < this.length - a; p++)
        d = (this.words[p + a] | 0) + y, y = d >> 26, this.words[p + a] = d & 67108863;
      if (y === 0)
        return this._strip();
      for (t(y === -1), y = 0, p = 0; p < this.length; p++)
        d = -(this.words[p] | 0) + y, y = d >> 26, this.words[p] = d & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(s, o) {
      var a = this.length - s.length, c = this.clone(), p = s, d = p.words[p.length - 1] | 0, y = this._countBits(d);
      a = 26 - y, a !== 0 && (p = p.ushln(a), c.iushln(a), d = p.words[p.length - 1] | 0);
      var m = c.length - p.length, f;
      if (o !== "mod") {
        f = new i(null), f.length = m + 1, f.words = new Array(f.length);
        for (var u = 0; u < f.length; u++)
          f.words[u] = 0;
      }
      var w = c.clone()._ishlnsubmul(p, 1, m);
      w.negative === 0 && (c = w, f && (f.words[m] = 1));
      for (var R = m - 1; R >= 0; R--) {
        var F = (c.words[p.length + R] | 0) * 67108864 + (c.words[p.length + R - 1] | 0);
        for (F = Math.min(F / d | 0, 67108863), c._ishlnsubmul(p, F, R); c.negative !== 0; )
          F--, c.negative = 0, c._ishlnsubmul(p, 1, R), c.isZero() || (c.negative ^= 1);
        f && (f.words[R] = F);
      }
      return f && f._strip(), c._strip(), o !== "div" && a !== 0 && c.iushrn(a), { div: f || null, mod: c };
    }, i.prototype.divmod = function(s, o, a) {
      if (t(!s.isZero()), this.isZero())
        return { div: new i(0), mod: new i(0) };
      var c, p, d;
      return this.negative !== 0 && s.negative === 0 ? (d = this.neg().divmod(s, o), o !== "mod" && (c = d.div.neg()), o !== "div" && (p = d.mod.neg(), a && p.negative !== 0 && p.iadd(s)), { div: c, mod: p }) : this.negative === 0 && s.negative !== 0 ? (d = this.divmod(s.neg(), o), o !== "mod" && (c = d.div.neg()), { div: c, mod: d.mod }) : this.negative & s.negative ? (d = this.neg().divmod(s.neg(), o), o !== "div" && (p = d.mod.neg(), a && p.negative !== 0 && p.isub(s)), { div: d.div, mod: p }) : s.length > this.length || this.cmp(s) < 0 ? { div: new i(0), mod: this } : s.length === 1 ? o === "div" ? { div: this.divn(s.words[0]), mod: null } : o === "mod" ? { div: null, mod: new i(this.modrn(s.words[0])) } : { div: this.divn(s.words[0]), mod: new i(this.modrn(s.words[0])) } : this._wordDiv(s, o);
    }, i.prototype.div = function(s) {
      return this.divmod(s, "div", false).div;
    }, i.prototype.mod = function(s) {
      return this.divmod(s, "mod", false).mod;
    }, i.prototype.umod = function(s) {
      return this.divmod(s, "mod", true).mod;
    }, i.prototype.divRound = function(s) {
      var o = this.divmod(s);
      if (o.mod.isZero())
        return o.div;
      var a = o.div.negative !== 0 ? o.mod.isub(s) : o.mod, c = s.ushrn(1), p = s.andln(1), d = a.cmp(c);
      return d < 0 || p === 1 && d === 0 ? o.div : o.div.negative !== 0 ? o.div.isubn(1) : o.div.iaddn(1);
    }, i.prototype.modrn = function(s) {
      var o = s < 0;
      o && (s = -s), t(s <= 67108863);
      for (var a = (1 << 26) % s, c = 0, p = this.length - 1; p >= 0; p--)
        c = (a * c + (this.words[p] | 0)) % s;
      return o ? -c : c;
    }, i.prototype.modn = function(s) {
      return this.modrn(s);
    }, i.prototype.idivn = function(s) {
      var o = s < 0;
      o && (s = -s), t(s <= 67108863);
      for (var a = 0, c = this.length - 1; c >= 0; c--) {
        var p = (this.words[c] | 0) + a * 67108864;
        this.words[c] = p / s | 0, a = p % s;
      }
      return this._strip(), o ? this.ineg() : this;
    }, i.prototype.divn = function(s) {
      return this.clone().idivn(s);
    }, i.prototype.egcd = function(s) {
      t(s.negative === 0), t(!s.isZero());
      var o = this, a = s.clone();
      o.negative !== 0 ? o = o.umod(s) : o = o.clone();
      for (var c = new i(1), p = new i(0), d = new i(0), y = new i(1), m = 0; o.isEven() && a.isEven(); )
        o.iushrn(1), a.iushrn(1), ++m;
      for (var f = a.clone(), u = o.clone(); !o.isZero(); ) {
        for (var w = 0, R = 1; !(o.words[0] & R) && w < 26; ++w, R <<= 1)
          ;
        if (w > 0)
          for (o.iushrn(w); w-- > 0; )
            (c.isOdd() || p.isOdd()) && (c.iadd(f), p.isub(u)), c.iushrn(1), p.iushrn(1);
        for (var F = 0, j = 1; !(a.words[0] & j) && F < 26; ++F, j <<= 1)
          ;
        if (F > 0)
          for (a.iushrn(F); F-- > 0; )
            (d.isOdd() || y.isOdd()) && (d.iadd(f), y.isub(u)), d.iushrn(1), y.iushrn(1);
        o.cmp(a) >= 0 ? (o.isub(a), c.isub(d), p.isub(y)) : (a.isub(o), d.isub(c), y.isub(p));
      }
      return { a: d, b: y, gcd: a.iushln(m) };
    }, i.prototype._invmp = function(s) {
      t(s.negative === 0), t(!s.isZero());
      var o = this, a = s.clone();
      o.negative !== 0 ? o = o.umod(s) : o = o.clone();
      for (var c = new i(1), p = new i(0), d = a.clone(); o.cmpn(1) > 0 && a.cmpn(1) > 0; ) {
        for (var y = 0, m = 1; !(o.words[0] & m) && y < 26; ++y, m <<= 1)
          ;
        if (y > 0)
          for (o.iushrn(y); y-- > 0; )
            c.isOdd() && c.iadd(d), c.iushrn(1);
        for (var f = 0, u = 1; !(a.words[0] & u) && f < 26; ++f, u <<= 1)
          ;
        if (f > 0)
          for (a.iushrn(f); f-- > 0; )
            p.isOdd() && p.iadd(d), p.iushrn(1);
        o.cmp(a) >= 0 ? (o.isub(a), c.isub(p)) : (a.isub(o), p.isub(c));
      }
      var w;
      return o.cmpn(1) === 0 ? w = c : w = p, w.cmpn(0) < 0 && w.iadd(s), w;
    }, i.prototype.gcd = function(s) {
      if (this.isZero())
        return s.abs();
      if (s.isZero())
        return this.abs();
      var o = this.clone(), a = s.clone();
      o.negative = 0, a.negative = 0;
      for (var c = 0; o.isEven() && a.isEven(); c++)
        o.iushrn(1), a.iushrn(1);
      do {
        for (; o.isEven(); )
          o.iushrn(1);
        for (; a.isEven(); )
          a.iushrn(1);
        var p = o.cmp(a);
        if (p < 0) {
          var d = o;
          o = a, a = d;
        } else if (p === 0 || a.cmpn(1) === 0)
          break;
        o.isub(a);
      } while (true);
      return a.iushln(c);
    }, i.prototype.invm = function(s) {
      return this.egcd(s).a.umod(s);
    }, i.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, i.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, i.prototype.andln = function(s) {
      return this.words[0] & s;
    }, i.prototype.bincn = function(s) {
      t(typeof s == "number");
      var o = s % 26, a = (s - o) / 26, c = 1 << o;
      if (this.length <= a)
        return this._expand(a + 1), this.words[a] |= c, this;
      for (var p = c, d = a; p !== 0 && d < this.length; d++) {
        var y = this.words[d] | 0;
        y += p, p = y >>> 26, y &= 67108863, this.words[d] = y;
      }
      return p !== 0 && (this.words[d] = p, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(s) {
      var o = s < 0;
      if (this.negative !== 0 && !o)
        return -1;
      if (this.negative === 0 && o)
        return 1;
      this._strip();
      var a;
      if (this.length > 1)
        a = 1;
      else {
        o && (s = -s), t(s <= 67108863, "Number is too big");
        var c = this.words[0] | 0;
        a = c === s ? 0 : c < s ? -1 : 1;
      }
      return this.negative !== 0 ? -a | 0 : a;
    }, i.prototype.cmp = function(s) {
      if (this.negative !== 0 && s.negative === 0)
        return -1;
      if (this.negative === 0 && s.negative !== 0)
        return 1;
      var o = this.ucmp(s);
      return this.negative !== 0 ? -o | 0 : o;
    }, i.prototype.ucmp = function(s) {
      if (this.length > s.length)
        return 1;
      if (this.length < s.length)
        return -1;
      for (var o = 0, a = this.length - 1; a >= 0; a--) {
        var c = this.words[a] | 0, p = s.words[a] | 0;
        if (c !== p) {
          c < p ? o = -1 : c > p && (o = 1);
          break;
        }
      }
      return o;
    }, i.prototype.gtn = function(s) {
      return this.cmpn(s) === 1;
    }, i.prototype.gt = function(s) {
      return this.cmp(s) === 1;
    }, i.prototype.gten = function(s) {
      return this.cmpn(s) >= 0;
    }, i.prototype.gte = function(s) {
      return this.cmp(s) >= 0;
    }, i.prototype.ltn = function(s) {
      return this.cmpn(s) === -1;
    }, i.prototype.lt = function(s) {
      return this.cmp(s) === -1;
    }, i.prototype.lten = function(s) {
      return this.cmpn(s) <= 0;
    }, i.prototype.lte = function(s) {
      return this.cmp(s) <= 0;
    }, i.prototype.eqn = function(s) {
      return this.cmpn(s) === 0;
    }, i.prototype.eq = function(s) {
      return this.cmp(s) === 0;
    }, i.red = function(s) {
      return new Z(s);
    }, i.prototype.toRed = function(s) {
      return t(!this.red, "Already a number in reduction context"), t(this.negative === 0, "red works only with positives"), s.convertTo(this)._forceRed(s);
    }, i.prototype.fromRed = function() {
      return t(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, i.prototype._forceRed = function(s) {
      return this.red = s, this;
    }, i.prototype.forceRed = function(s) {
      return t(!this.red, "Already a number in reduction context"), this._forceRed(s);
    }, i.prototype.redAdd = function(s) {
      return t(this.red, "redAdd works only with red numbers"), this.red.add(this, s);
    }, i.prototype.redIAdd = function(s) {
      return t(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, s);
    }, i.prototype.redSub = function(s) {
      return t(this.red, "redSub works only with red numbers"), this.red.sub(this, s);
    }, i.prototype.redISub = function(s) {
      return t(this.red, "redISub works only with red numbers"), this.red.isub(this, s);
    }, i.prototype.redShl = function(s) {
      return t(this.red, "redShl works only with red numbers"), this.red.shl(this, s);
    }, i.prototype.redMul = function(s) {
      return t(this.red, "redMul works only with red numbers"), this.red._verify2(this, s), this.red.mul(this, s);
    }, i.prototype.redIMul = function(s) {
      return t(this.red, "redMul works only with red numbers"), this.red._verify2(this, s), this.red.imul(this, s);
    }, i.prototype.redSqr = function() {
      return t(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, i.prototype.redISqr = function() {
      return t(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, i.prototype.redSqrt = function() {
      return t(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, i.prototype.redInvm = function() {
      return t(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, i.prototype.redNeg = function() {
      return t(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, i.prototype.redPow = function(s) {
      return t(this.red && !s.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, s);
    };
    var I = { k256: null, p224: null, p192: null, p25519: null };
    function L(M, s) {
      this.name = M, this.p = new i(s, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    L.prototype._tmp = function() {
      var s = new i(null);
      return s.words = new Array(Math.ceil(this.n / 13)), s;
    }, L.prototype.ireduce = function(s) {
      var o = s, a;
      do
        this.split(o, this.tmp), o = this.imulK(o), o = o.iadd(this.tmp), a = o.bitLength();
      while (a > this.n);
      var c = a < this.n ? -1 : o.ucmp(this.p);
      return c === 0 ? (o.words[0] = 0, o.length = 1) : c > 0 ? o.isub(this.p) : o._strip(), o;
    }, L.prototype.split = function(s, o) {
      s.iushrn(this.n, 0, o);
    }, L.prototype.imulK = function(s) {
      return s.imul(this.k);
    };
    function W() {
      L.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    n(W, L), W.prototype.split = function(s, o) {
      for (var a = 4194303, c = Math.min(s.length, 9), p = 0; p < c; p++)
        o.words[p] = s.words[p];
      if (o.length = c, s.length <= 9) {
        s.words[0] = 0, s.length = 1;
        return;
      }
      var d = s.words[9];
      for (o.words[o.length++] = d & a, p = 10; p < s.length; p++) {
        var y = s.words[p] | 0;
        s.words[p - 10] = (y & a) << 4 | d >>> 22, d = y;
      }
      d >>>= 22, s.words[p - 10] = d, d === 0 && s.length > 10 ? s.length -= 10 : s.length -= 9;
    }, W.prototype.imulK = function(s) {
      s.words[s.length] = 0, s.words[s.length + 1] = 0, s.length += 2;
      for (var o = 0, a = 0; a < s.length; a++) {
        var c = s.words[a] | 0;
        o += c * 977, s.words[a] = o & 67108863, o = c * 64 + (o / 67108864 | 0);
      }
      return s.words[s.length - 1] === 0 && (s.length--, s.words[s.length - 1] === 0 && s.length--), s;
    };
    function V() {
      L.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    n(V, L);
    function fe() {
      L.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    n(fe, L);
    function ee() {
      L.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    n(ee, L), ee.prototype.imulK = function(s) {
      for (var o = 0, a = 0; a < s.length; a++) {
        var c = (s.words[a] | 0) * 19 + o, p = c & 67108863;
        c >>>= 26, s.words[a] = p, o = c;
      }
      return o !== 0 && (s.words[s.length++] = o), s;
    }, i._prime = function(s) {
      if (I[s])
        return I[s];
      var o;
      if (s === "k256")
        o = new W();
      else if (s === "p224")
        o = new V();
      else if (s === "p192")
        o = new fe();
      else if (s === "p25519")
        o = new ee();
      else
        throw new Error("Unknown prime " + s);
      return I[s] = o, o;
    };
    function Z(M) {
      if (typeof M == "string") {
        var s = i._prime(M);
        this.m = s.p, this.prime = s;
      } else
        t(M.gtn(1), "modulus must be greater than 1"), this.m = M, this.prime = null;
    }
    Z.prototype._verify1 = function(s) {
      t(s.negative === 0, "red works only with positives"), t(s.red, "red works only with red numbers");
    }, Z.prototype._verify2 = function(s, o) {
      t((s.negative | o.negative) === 0, "red works only with positives"), t(s.red && s.red === o.red, "red works only with red numbers");
    }, Z.prototype.imod = function(s) {
      return this.prime ? this.prime.ireduce(s)._forceRed(this) : (v(s, s.umod(this.m)._forceRed(this)), s);
    }, Z.prototype.neg = function(s) {
      return s.isZero() ? s.clone() : this.m.sub(s)._forceRed(this);
    }, Z.prototype.add = function(s, o) {
      this._verify2(s, o);
      var a = s.add(o);
      return a.cmp(this.m) >= 0 && a.isub(this.m), a._forceRed(this);
    }, Z.prototype.iadd = function(s, o) {
      this._verify2(s, o);
      var a = s.iadd(o);
      return a.cmp(this.m) >= 0 && a.isub(this.m), a;
    }, Z.prototype.sub = function(s, o) {
      this._verify2(s, o);
      var a = s.sub(o);
      return a.cmpn(0) < 0 && a.iadd(this.m), a._forceRed(this);
    }, Z.prototype.isub = function(s, o) {
      this._verify2(s, o);
      var a = s.isub(o);
      return a.cmpn(0) < 0 && a.iadd(this.m), a;
    }, Z.prototype.shl = function(s, o) {
      return this._verify1(s), this.imod(s.ushln(o));
    }, Z.prototype.imul = function(s, o) {
      return this._verify2(s, o), this.imod(s.imul(o));
    }, Z.prototype.mul = function(s, o) {
      return this._verify2(s, o), this.imod(s.mul(o));
    }, Z.prototype.isqr = function(s) {
      return this.imul(s, s.clone());
    }, Z.prototype.sqr = function(s) {
      return this.mul(s, s);
    }, Z.prototype.sqrt = function(s) {
      if (s.isZero())
        return s.clone();
      var o = this.m.andln(3);
      if (t(o % 2 === 1), o === 3) {
        var a = this.m.add(new i(1)).iushrn(2);
        return this.pow(s, a);
      }
      for (var c = this.m.subn(1), p = 0; !c.isZero() && c.andln(1) === 0; )
        p++, c.iushrn(1);
      t(!c.isZero());
      var d = new i(1).toRed(this), y = d.redNeg(), m = this.m.subn(1).iushrn(1), f = this.m.bitLength();
      for (f = new i(2 * f * f).toRed(this); this.pow(f, m).cmp(y) !== 0; )
        f.redIAdd(y);
      for (var u = this.pow(f, c), w = this.pow(s, c.addn(1).iushrn(1)), R = this.pow(s, c), F = p; R.cmp(d) !== 0; ) {
        for (var j = R, H = 0; j.cmp(d) !== 0; H++)
          j = j.redSqr();
        t(H < F);
        var ne = this.pow(u, new i(1).iushln(F - H - 1));
        w = w.redMul(ne), u = ne.redSqr(), R = R.redMul(u), F = H;
      }
      return w;
    }, Z.prototype.invm = function(s) {
      var o = s._invmp(this.m);
      return o.negative !== 0 ? (o.negative = 0, this.imod(o).redNeg()) : this.imod(o);
    }, Z.prototype.pow = function(s, o) {
      if (o.isZero())
        return new i(1).toRed(this);
      if (o.cmpn(1) === 0)
        return s.clone();
      var a = 4, c = new Array(1 << a);
      c[0] = new i(1).toRed(this), c[1] = s;
      for (var p = 2; p < c.length; p++)
        c[p] = this.mul(c[p - 1], s);
      var d = c[0], y = 0, m = 0, f = o.bitLength() % 26;
      for (f === 0 && (f = 26), p = o.length - 1; p >= 0; p--) {
        for (var u = o.words[p], w = f - 1; w >= 0; w--) {
          var R = u >> w & 1;
          if (d !== c[0] && (d = this.sqr(d)), R === 0 && y === 0) {
            m = 0;
            continue;
          }
          y <<= 1, y |= R, m++, !(m !== a && (p !== 0 || w !== 0)) && (d = this.mul(d, c[y]), m = 0, y = 0);
        }
        f = 26;
      }
      return d;
    }, Z.prototype.convertTo = function(s) {
      var o = s.umod(this.m);
      return o === s ? o.clone() : o;
    }, Z.prototype.convertFrom = function(s) {
      var o = s.clone();
      return o.red = null, o;
    }, i.mont = function(s) {
      return new ie(s);
    };
    function ie(M) {
      Z.call(this, M), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    n(ie, Z), ie.prototype.convertTo = function(s) {
      return this.imod(s.ushln(this.shift));
    }, ie.prototype.convertFrom = function(s) {
      var o = this.imod(s.mul(this.rinv));
      return o.red = null, o;
    }, ie.prototype.imul = function(s, o) {
      if (s.isZero() || o.isZero())
        return s.words[0] = 0, s.length = 1, s;
      var a = s.imul(o), c = a.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), p = a.isub(c).iushrn(this.shift), d = p;
      return p.cmp(this.m) >= 0 ? d = p.isub(this.m) : p.cmpn(0) < 0 && (d = p.iadd(this.m)), d._forceRed(this);
    }, ie.prototype.mul = function(s, o) {
      if (s.isZero() || o.isZero())
        return new i(0)._forceRed(this);
      var a = s.mul(o), c = a.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), p = a.isub(c).iushrn(this.shift), d = p;
      return p.cmp(this.m) >= 0 ? d = p.isub(this.m) : p.cmpn(0) < 0 && (d = p.iadd(this.m)), d._forceRed(this);
    }, ie.prototype.invm = function(s) {
      var o = this.imod(s._invmp(this.m).mul(this.r2));
      return o._forceRed(this);
    };
  })(typeof Qo == "undefined" || Qo, _l);
});
var Il = ye((Tl, Xo) => {
  (function(r2, e) {
    function t(s, o) {
      if (!s)
        throw new Error(o || "Assertion failed");
    }
    function n(s, o) {
      s.super_ = o;
      var a = function() {
      };
      a.prototype = o.prototype, s.prototype = new a(), s.prototype.constructor = s;
    }
    function i(s, o, a) {
      if (i.isBN(s))
        return s;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, s !== null && ((o === "le" || o === "be") && (a = o, o = 10), this._init(s || 0, o || 10, a || "be"));
    }
    typeof r2 == "object" ? r2.exports = i : e.BN = i, i.BN = i, i.wordSize = 26;
    var l;
    try {
      typeof window != "undefined" && typeof window.Buffer != "undefined" ? l = window.Buffer : l = Zo().Buffer;
    } catch (s) {
    }
    i.isBN = function(o) {
      return o instanceof i ? true : o !== null && typeof o == "object" && o.constructor.wordSize === i.wordSize && Array.isArray(o.words);
    }, i.max = function(o, a) {
      return o.cmp(a) > 0 ? o : a;
    }, i.min = function(o, a) {
      return o.cmp(a) < 0 ? o : a;
    }, i.prototype._init = function(o, a, c) {
      if (typeof o == "number")
        return this._initNumber(o, a, c);
      if (typeof o == "object")
        return this._initArray(o, a, c);
      a === "hex" && (a = 16), t(a === (a | 0) && a >= 2 && a <= 36), o = o.toString().replace(/\s+/g, "");
      var p = 0;
      o[0] === "-" && (p++, this.negative = 1), p < o.length && (a === 16 ? this._parseHex(o, p, c) : (this._parseBase(o, a, p), c === "le" && this._initArray(this.toArray(), a, c)));
    }, i.prototype._initNumber = function(o, a, c) {
      o < 0 && (this.negative = 1, o = -o), o < 67108864 ? (this.words = [o & 67108863], this.length = 1) : o < 4503599627370496 ? (this.words = [o & 67108863, o / 67108864 & 67108863], this.length = 2) : (t(o < 9007199254740992), this.words = [o & 67108863, o / 67108864 & 67108863, 1], this.length = 3), c === "le" && this._initArray(this.toArray(), a, c);
    }, i.prototype._initArray = function(o, a, c) {
      if (t(typeof o.length == "number"), o.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(o.length / 3), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var d, y, m = 0;
      if (c === "be")
        for (p = o.length - 1, d = 0; p >= 0; p -= 3)
          y = o[p] | o[p - 1] << 8 | o[p - 2] << 16, this.words[d] |= y << m & 67108863, this.words[d + 1] = y >>> 26 - m & 67108863, m += 24, m >= 26 && (m -= 26, d++);
      else if (c === "le")
        for (p = 0, d = 0; p < o.length; p += 3)
          y = o[p] | o[p + 1] << 8 | o[p + 2] << 16, this.words[d] |= y << m & 67108863, this.words[d + 1] = y >>> 26 - m & 67108863, m += 24, m >= 26 && (m -= 26, d++);
      return this._strip();
    };
    function h(s, o) {
      var a = s.charCodeAt(o);
      if (a >= 48 && a <= 57)
        return a - 48;
      if (a >= 65 && a <= 70)
        return a - 55;
      if (a >= 97 && a <= 102)
        return a - 87;
      t(false, "Invalid character in " + s);
    }
    function g(s, o, a) {
      var c = h(s, a);
      return a - 1 >= o && (c |= h(s, a - 1) << 4), c;
    }
    i.prototype._parseHex = function(o, a, c) {
      this.length = Math.ceil((o.length - a) / 6), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var d = 0, y = 0, m;
      if (c === "be")
        for (p = o.length - 1; p >= a; p -= 2)
          m = g(o, a, p) << d, this.words[y] |= m & 67108863, d >= 18 ? (d -= 18, y += 1, this.words[y] |= m >>> 26) : d += 8;
      else {
        var f = o.length - a;
        for (p = f % 2 === 0 ? a + 1 : a; p < o.length; p += 2)
          m = g(o, a, p) << d, this.words[y] |= m & 67108863, d >= 18 ? (d -= 18, y += 1, this.words[y] |= m >>> 26) : d += 8;
      }
      this._strip();
    };
    function v(s, o, a, c) {
      for (var p = 0, d = 0, y = Math.min(s.length, a), m = o; m < y; m++) {
        var f = s.charCodeAt(m) - 48;
        p *= c, f >= 49 ? d = f - 49 + 10 : f >= 17 ? d = f - 17 + 10 : d = f, t(f >= 0 && d < c, "Invalid character"), p += d;
      }
      return p;
    }
    i.prototype._parseBase = function(o, a, c) {
      this.words = [0], this.length = 1;
      for (var p = 0, d = 1; d <= 67108863; d *= a)
        p++;
      p--, d = d / a | 0;
      for (var y = o.length - c, m = y % p, f = Math.min(y, y - m) + c, u = 0, w = c; w < f; w += p)
        u = v(o, w, w + p, a), this.imuln(d), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (m !== 0) {
        var R = 1;
        for (u = v(o, w, o.length, a), w = 0; w < m; w++)
          R *= a;
        this.imuln(R), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      }
      this._strip();
    }, i.prototype.copy = function(o) {
      o.words = new Array(this.length);
      for (var a = 0; a < this.length; a++)
        o.words[a] = this.words[a];
      o.length = this.length, o.negative = this.negative, o.red = this.red;
    };
    function b(s, o) {
      s.words = o.words, s.length = o.length, s.negative = o.negative, s.red = o.red;
    }
    if (i.prototype._move = function(o) {
      b(o, this);
    }, i.prototype.clone = function() {
      var o = new i(null);
      return this.copy(o), o;
    }, i.prototype._expand = function(o) {
      for (; this.length < o; )
        this.words[this.length++] = 0;
      return this;
    }, i.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, i.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol != "undefined" && typeof Symbol.for == "function")
      try {
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = x;
      } catch (s) {
        i.prototype.inspect = x;
      }
    else
      i.prototype.inspect = x;
    function x() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var A = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], O = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], k = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    i.prototype.toString = function(o, a) {
      o = o || 10, a = a | 0 || 1;
      var c;
      if (o === 16 || o === "hex") {
        c = "";
        for (var p = 0, d = 0, y = 0; y < this.length; y++) {
          var m = this.words[y], f = ((m << p | d) & 16777215).toString(16);
          d = m >>> 24 - p & 16777215, p += 2, p >= 26 && (p -= 26, y--), d !== 0 || y !== this.length - 1 ? c = A[6 - f.length] + f + c : c = f + c;
        }
        for (d !== 0 && (c = d.toString(16) + c); c.length % a !== 0; )
          c = "0" + c;
        return this.negative !== 0 && (c = "-" + c), c;
      }
      if (o === (o | 0) && o >= 2 && o <= 36) {
        var u = O[o], w = k[o];
        c = "";
        var R = this.clone();
        for (R.negative = 0; !R.isZero(); ) {
          var F = R.modrn(w).toString(o);
          R = R.idivn(w), R.isZero() ? c = F + c : c = A[u - F.length] + F + c;
        }
        for (this.isZero() && (c = "0" + c); c.length % a !== 0; )
          c = "0" + c;
        return this.negative !== 0 && (c = "-" + c), c;
      }
      t(false, "Base should be between 2 and 36");
    }, i.prototype.toNumber = function() {
      var o = this.words[0];
      return this.length === 2 ? o += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? o += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && t(false, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -o : o;
    }, i.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, l && (i.prototype.toBuffer = function(o, a) {
      return this.toArrayLike(l, o, a);
    }), i.prototype.toArray = function(o, a) {
      return this.toArrayLike(Array, o, a);
    };
    var N = function(o, a) {
      return o.allocUnsafe ? o.allocUnsafe(a) : new o(a);
    };
    i.prototype.toArrayLike = function(o, a, c) {
      this._strip();
      var p = this.byteLength(), d = c || Math.max(1, p);
      t(p <= d, "byte array longer than desired length"), t(d > 0, "Requested array length <= 0");
      var y = N(o, d), m = a === "le" ? "LE" : "BE";
      return this["_toArrayLike" + m](y, p), y;
    }, i.prototype._toArrayLikeLE = function(o, a) {
      for (var c = 0, p = 0, d = 0, y = 0; d < this.length; d++) {
        var m = this.words[d] << y | p;
        o[c++] = m & 255, c < o.length && (o[c++] = m >> 8 & 255), c < o.length && (o[c++] = m >> 16 & 255), y === 6 ? (c < o.length && (o[c++] = m >> 24 & 255), p = 0, y = 0) : (p = m >>> 24, y += 2);
      }
      if (c < o.length)
        for (o[c++] = p; c < o.length; )
          o[c++] = 0;
    }, i.prototype._toArrayLikeBE = function(o, a) {
      for (var c = o.length - 1, p = 0, d = 0, y = 0; d < this.length; d++) {
        var m = this.words[d] << y | p;
        o[c--] = m & 255, c >= 0 && (o[c--] = m >> 8 & 255), c >= 0 && (o[c--] = m >> 16 & 255), y === 6 ? (c >= 0 && (o[c--] = m >> 24 & 255), p = 0, y = 0) : (p = m >>> 24, y += 2);
      }
      if (c >= 0)
        for (o[c--] = p; c >= 0; )
          o[c--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(o) {
      return 32 - Math.clz32(o);
    } : i.prototype._countBits = function(o) {
      var a = o, c = 0;
      return a >= 4096 && (c += 13, a >>>= 13), a >= 64 && (c += 7, a >>>= 7), a >= 8 && (c += 4, a >>>= 4), a >= 2 && (c += 2, a >>>= 2), c + a;
    }, i.prototype._zeroBits = function(o) {
      if (o === 0)
        return 26;
      var a = o, c = 0;
      return a & 8191 || (c += 13, a >>>= 13), a & 127 || (c += 7, a >>>= 7), a & 15 || (c += 4, a >>>= 4), a & 3 || (c += 2, a >>>= 2), a & 1 || c++, c;
    }, i.prototype.bitLength = function() {
      var o = this.words[this.length - 1], a = this._countBits(o);
      return (this.length - 1) * 26 + a;
    };
    function q(s) {
      for (var o = new Array(s.bitLength()), a = 0; a < o.length; a++) {
        var c = a / 26 | 0, p = a % 26;
        o[a] = s.words[c] >>> p & 1;
      }
      return o;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var o = 0, a = 0; a < this.length; a++) {
        var c = this._zeroBits(this.words[a]);
        if (o += c, c !== 26)
          break;
      }
      return o;
    }, i.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, i.prototype.toTwos = function(o) {
      return this.negative !== 0 ? this.abs().inotn(o).iaddn(1) : this.clone();
    }, i.prototype.fromTwos = function(o) {
      return this.testn(o - 1) ? this.notn(o).iaddn(1).ineg() : this.clone();
    }, i.prototype.isNeg = function() {
      return this.negative !== 0;
    }, i.prototype.neg = function() {
      return this.clone().ineg();
    }, i.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, i.prototype.iuor = function(o) {
      for (; this.length < o.length; )
        this.words[this.length++] = 0;
      for (var a = 0; a < o.length; a++)
        this.words[a] = this.words[a] | o.words[a];
      return this._strip();
    }, i.prototype.ior = function(o) {
      return t((this.negative | o.negative) === 0), this.iuor(o);
    }, i.prototype.or = function(o) {
      return this.length > o.length ? this.clone().ior(o) : o.clone().ior(this);
    }, i.prototype.uor = function(o) {
      return this.length > o.length ? this.clone().iuor(o) : o.clone().iuor(this);
    }, i.prototype.iuand = function(o) {
      var a;
      this.length > o.length ? a = o : a = this;
      for (var c = 0; c < a.length; c++)
        this.words[c] = this.words[c] & o.words[c];
      return this.length = a.length, this._strip();
    }, i.prototype.iand = function(o) {
      return t((this.negative | o.negative) === 0), this.iuand(o);
    }, i.prototype.and = function(o) {
      return this.length > o.length ? this.clone().iand(o) : o.clone().iand(this);
    }, i.prototype.uand = function(o) {
      return this.length > o.length ? this.clone().iuand(o) : o.clone().iuand(this);
    }, i.prototype.iuxor = function(o) {
      var a, c;
      this.length > o.length ? (a = this, c = o) : (a = o, c = this);
      for (var p = 0; p < c.length; p++)
        this.words[p] = a.words[p] ^ c.words[p];
      if (this !== a)
        for (; p < a.length; p++)
          this.words[p] = a.words[p];
      return this.length = a.length, this._strip();
    }, i.prototype.ixor = function(o) {
      return t((this.negative | o.negative) === 0), this.iuxor(o);
    }, i.prototype.xor = function(o) {
      return this.length > o.length ? this.clone().ixor(o) : o.clone().ixor(this);
    }, i.prototype.uxor = function(o) {
      return this.length > o.length ? this.clone().iuxor(o) : o.clone().iuxor(this);
    }, i.prototype.inotn = function(o) {
      t(typeof o == "number" && o >= 0);
      var a = Math.ceil(o / 26) | 0, c = o % 26;
      this._expand(a), c > 0 && a--;
      for (var p = 0; p < a; p++)
        this.words[p] = ~this.words[p] & 67108863;
      return c > 0 && (this.words[p] = ~this.words[p] & 67108863 >> 26 - c), this._strip();
    }, i.prototype.notn = function(o) {
      return this.clone().inotn(o);
    }, i.prototype.setn = function(o, a) {
      t(typeof o == "number" && o >= 0);
      var c = o / 26 | 0, p = o % 26;
      return this._expand(c + 1), a ? this.words[c] = this.words[c] | 1 << p : this.words[c] = this.words[c] & ~(1 << p), this._strip();
    }, i.prototype.iadd = function(o) {
      var a;
      if (this.negative !== 0 && o.negative === 0)
        return this.negative = 0, a = this.isub(o), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && o.negative !== 0)
        return o.negative = 0, a = this.isub(o), o.negative = 1, a._normSign();
      var c, p;
      this.length > o.length ? (c = this, p = o) : (c = o, p = this);
      for (var d = 0, y = 0; y < p.length; y++)
        a = (c.words[y] | 0) + (p.words[y] | 0) + d, this.words[y] = a & 67108863, d = a >>> 26;
      for (; d !== 0 && y < c.length; y++)
        a = (c.words[y] | 0) + d, this.words[y] = a & 67108863, d = a >>> 26;
      if (this.length = c.length, d !== 0)
        this.words[this.length] = d, this.length++;
      else if (c !== this)
        for (; y < c.length; y++)
          this.words[y] = c.words[y];
      return this;
    }, i.prototype.add = function(o) {
      var a;
      return o.negative !== 0 && this.negative === 0 ? (o.negative = 0, a = this.sub(o), o.negative ^= 1, a) : o.negative === 0 && this.negative !== 0 ? (this.negative = 0, a = o.sub(this), this.negative = 1, a) : this.length > o.length ? this.clone().iadd(o) : o.clone().iadd(this);
    }, i.prototype.isub = function(o) {
      if (o.negative !== 0) {
        o.negative = 0;
        var a = this.iadd(o);
        return o.negative = 1, a._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(o), this.negative = 1, this._normSign();
      var c = this.cmp(o);
      if (c === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var p, d;
      c > 0 ? (p = this, d = o) : (p = o, d = this);
      for (var y = 0, m = 0; m < d.length; m++)
        a = (p.words[m] | 0) - (d.words[m] | 0) + y, y = a >> 26, this.words[m] = a & 67108863;
      for (; y !== 0 && m < p.length; m++)
        a = (p.words[m] | 0) + y, y = a >> 26, this.words[m] = a & 67108863;
      if (y === 0 && m < p.length && p !== this)
        for (; m < p.length; m++)
          this.words[m] = p.words[m];
      return this.length = Math.max(this.length, m), p !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(o) {
      return this.clone().isub(o);
    };
    function C(s, o, a) {
      a.negative = o.negative ^ s.negative;
      var c = s.length + o.length | 0;
      a.length = c, c = c - 1 | 0;
      var p = s.words[0] | 0, d = o.words[0] | 0, y = p * d, m = y & 67108863, f = y / 67108864 | 0;
      a.words[0] = m;
      for (var u = 1; u < c; u++) {
        for (var w = f >>> 26, R = f & 67108863, F = Math.min(u, o.length - 1), j = Math.max(0, u - s.length + 1); j <= F; j++) {
          var H = u - j | 0;
          p = s.words[H] | 0, d = o.words[j] | 0, y = p * d + R, w += y / 67108864 | 0, R = y & 67108863;
        }
        a.words[u] = R | 0, f = w | 0;
      }
      return f !== 0 ? a.words[u] = f | 0 : a.length--, a._strip();
    }
    var J = function(o, a, c) {
      var p = o.words, d = a.words, y = c.words, m = 0, f, u, w, R = p[0] | 0, F = R & 8191, j = R >>> 13, H = p[1] | 0, ne = H & 8191, Ee = H >>> 13, _e = p[2] | 0, oe = _e & 8191, Oe = _e >>> 13, Fe = p[3] | 0, ve = Fe & 8191, ae = Fe >>> 13, De = p[4] | 0, we = De & 8191, Te = De >>> 13, Le = p[5] | 0, ge = Le & 8191, We = Le >>> 13, qe = p[6] | 0, be = qe & 8191, ke = qe >>> 13, je = p[7] | 0, le = je & 8191, $e = je >>> 13, Pe = p[8] | 0, Me = Pe & 8191, Ve = Pe >>> 13, Ye = p[9] | 0, ue = Ye & 8191, Ke = Ye >>> 13, ze = d[0] | 0, ce = ze & 8191, Ge = ze >>> 13, He = d[1] | 0, de = He & 8191, _ = He >>> 13, E = d[2] | 0, S = E & 8191, U = E >>> 13, z = d[3] | 0, Y = z & 8191, $ = z >>> 13, X = d[4] | 0, G = X & 8191, Q = X >>> 13, xe = d[5] | 0, re = xe & 8191, Ie = xe >>> 13, Re = d[6] | 0, he = Re & 8191, Ce = Re >>> 13, Ne = d[7] | 0, D = Ne & 8191, se = Ne >>> 13, me = d[8] | 0, te = me & 8191, Ue = me >>> 13, Ze = d[9] | 0, Ae = Ze & 8191, Je = Ze >>> 13;
      c.negative = o.negative ^ a.negative, c.length = 19, f = Math.imul(F, ce), u = Math.imul(F, Ge), u = u + Math.imul(j, ce) | 0, w = Math.imul(j, Ge);
      var Ht = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (Ht >>> 26) | 0, Ht &= 67108863, f = Math.imul(ne, ce), u = Math.imul(ne, Ge), u = u + Math.imul(Ee, ce) | 0, w = Math.imul(Ee, Ge), f = f + Math.imul(F, de) | 0, u = u + Math.imul(F, _) | 0, u = u + Math.imul(j, de) | 0, w = w + Math.imul(j, _) | 0;
      var Jt = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (Jt >>> 26) | 0, Jt &= 67108863, f = Math.imul(oe, ce), u = Math.imul(oe, Ge), u = u + Math.imul(Oe, ce) | 0, w = Math.imul(Oe, Ge), f = f + Math.imul(ne, de) | 0, u = u + Math.imul(ne, _) | 0, u = u + Math.imul(Ee, de) | 0, w = w + Math.imul(Ee, _) | 0, f = f + Math.imul(F, S) | 0, u = u + Math.imul(F, U) | 0, u = u + Math.imul(j, S) | 0, w = w + Math.imul(j, U) | 0;
      var Zt = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (Zt >>> 26) | 0, Zt &= 67108863, f = Math.imul(ve, ce), u = Math.imul(ve, Ge), u = u + Math.imul(ae, ce) | 0, w = Math.imul(ae, Ge), f = f + Math.imul(oe, de) | 0, u = u + Math.imul(oe, _) | 0, u = u + Math.imul(Oe, de) | 0, w = w + Math.imul(Oe, _) | 0, f = f + Math.imul(ne, S) | 0, u = u + Math.imul(ne, U) | 0, u = u + Math.imul(Ee, S) | 0, w = w + Math.imul(Ee, U) | 0, f = f + Math.imul(F, Y) | 0, u = u + Math.imul(F, $) | 0, u = u + Math.imul(j, Y) | 0, w = w + Math.imul(j, $) | 0;
      var Qt = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (Qt >>> 26) | 0, Qt &= 67108863, f = Math.imul(we, ce), u = Math.imul(we, Ge), u = u + Math.imul(Te, ce) | 0, w = Math.imul(Te, Ge), f = f + Math.imul(ve, de) | 0, u = u + Math.imul(ve, _) | 0, u = u + Math.imul(ae, de) | 0, w = w + Math.imul(ae, _) | 0, f = f + Math.imul(oe, S) | 0, u = u + Math.imul(oe, U) | 0, u = u + Math.imul(Oe, S) | 0, w = w + Math.imul(Oe, U) | 0, f = f + Math.imul(ne, Y) | 0, u = u + Math.imul(ne, $) | 0, u = u + Math.imul(Ee, Y) | 0, w = w + Math.imul(Ee, $) | 0, f = f + Math.imul(F, G) | 0, u = u + Math.imul(F, Q) | 0, u = u + Math.imul(j, G) | 0, w = w + Math.imul(j, Q) | 0;
      var Xt = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (Xt >>> 26) | 0, Xt &= 67108863, f = Math.imul(ge, ce), u = Math.imul(ge, Ge), u = u + Math.imul(We, ce) | 0, w = Math.imul(We, Ge), f = f + Math.imul(we, de) | 0, u = u + Math.imul(we, _) | 0, u = u + Math.imul(Te, de) | 0, w = w + Math.imul(Te, _) | 0, f = f + Math.imul(ve, S) | 0, u = u + Math.imul(ve, U) | 0, u = u + Math.imul(ae, S) | 0, w = w + Math.imul(ae, U) | 0, f = f + Math.imul(oe, Y) | 0, u = u + Math.imul(oe, $) | 0, u = u + Math.imul(Oe, Y) | 0, w = w + Math.imul(Oe, $) | 0, f = f + Math.imul(ne, G) | 0, u = u + Math.imul(ne, Q) | 0, u = u + Math.imul(Ee, G) | 0, w = w + Math.imul(Ee, Q) | 0, f = f + Math.imul(F, re) | 0, u = u + Math.imul(F, Ie) | 0, u = u + Math.imul(j, re) | 0, w = w + Math.imul(j, Ie) | 0;
      var er = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (er >>> 26) | 0, er &= 67108863, f = Math.imul(be, ce), u = Math.imul(be, Ge), u = u + Math.imul(ke, ce) | 0, w = Math.imul(ke, Ge), f = f + Math.imul(ge, de) | 0, u = u + Math.imul(ge, _) | 0, u = u + Math.imul(We, de) | 0, w = w + Math.imul(We, _) | 0, f = f + Math.imul(we, S) | 0, u = u + Math.imul(we, U) | 0, u = u + Math.imul(Te, S) | 0, w = w + Math.imul(Te, U) | 0, f = f + Math.imul(ve, Y) | 0, u = u + Math.imul(ve, $) | 0, u = u + Math.imul(ae, Y) | 0, w = w + Math.imul(ae, $) | 0, f = f + Math.imul(oe, G) | 0, u = u + Math.imul(oe, Q) | 0, u = u + Math.imul(Oe, G) | 0, w = w + Math.imul(Oe, Q) | 0, f = f + Math.imul(ne, re) | 0, u = u + Math.imul(ne, Ie) | 0, u = u + Math.imul(Ee, re) | 0, w = w + Math.imul(Ee, Ie) | 0, f = f + Math.imul(F, he) | 0, u = u + Math.imul(F, Ce) | 0, u = u + Math.imul(j, he) | 0, w = w + Math.imul(j, Ce) | 0;
      var tr = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (tr >>> 26) | 0, tr &= 67108863, f = Math.imul(le, ce), u = Math.imul(le, Ge), u = u + Math.imul($e, ce) | 0, w = Math.imul($e, Ge), f = f + Math.imul(be, de) | 0, u = u + Math.imul(be, _) | 0, u = u + Math.imul(ke, de) | 0, w = w + Math.imul(ke, _) | 0, f = f + Math.imul(ge, S) | 0, u = u + Math.imul(ge, U) | 0, u = u + Math.imul(We, S) | 0, w = w + Math.imul(We, U) | 0, f = f + Math.imul(we, Y) | 0, u = u + Math.imul(we, $) | 0, u = u + Math.imul(Te, Y) | 0, w = w + Math.imul(Te, $) | 0, f = f + Math.imul(ve, G) | 0, u = u + Math.imul(ve, Q) | 0, u = u + Math.imul(ae, G) | 0, w = w + Math.imul(ae, Q) | 0, f = f + Math.imul(oe, re) | 0, u = u + Math.imul(oe, Ie) | 0, u = u + Math.imul(Oe, re) | 0, w = w + Math.imul(Oe, Ie) | 0, f = f + Math.imul(ne, he) | 0, u = u + Math.imul(ne, Ce) | 0, u = u + Math.imul(Ee, he) | 0, w = w + Math.imul(Ee, Ce) | 0, f = f + Math.imul(F, D) | 0, u = u + Math.imul(F, se) | 0, u = u + Math.imul(j, D) | 0, w = w + Math.imul(j, se) | 0;
      var rr = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (rr >>> 26) | 0, rr &= 67108863, f = Math.imul(Me, ce), u = Math.imul(Me, Ge), u = u + Math.imul(Ve, ce) | 0, w = Math.imul(Ve, Ge), f = f + Math.imul(le, de) | 0, u = u + Math.imul(le, _) | 0, u = u + Math.imul($e, de) | 0, w = w + Math.imul($e, _) | 0, f = f + Math.imul(be, S) | 0, u = u + Math.imul(be, U) | 0, u = u + Math.imul(ke, S) | 0, w = w + Math.imul(ke, U) | 0, f = f + Math.imul(ge, Y) | 0, u = u + Math.imul(ge, $) | 0, u = u + Math.imul(We, Y) | 0, w = w + Math.imul(We, $) | 0, f = f + Math.imul(we, G) | 0, u = u + Math.imul(we, Q) | 0, u = u + Math.imul(Te, G) | 0, w = w + Math.imul(Te, Q) | 0, f = f + Math.imul(ve, re) | 0, u = u + Math.imul(ve, Ie) | 0, u = u + Math.imul(ae, re) | 0, w = w + Math.imul(ae, Ie) | 0, f = f + Math.imul(oe, he) | 0, u = u + Math.imul(oe, Ce) | 0, u = u + Math.imul(Oe, he) | 0, w = w + Math.imul(Oe, Ce) | 0, f = f + Math.imul(ne, D) | 0, u = u + Math.imul(ne, se) | 0, u = u + Math.imul(Ee, D) | 0, w = w + Math.imul(Ee, se) | 0, f = f + Math.imul(F, te) | 0, u = u + Math.imul(F, Ue) | 0, u = u + Math.imul(j, te) | 0, w = w + Math.imul(j, Ue) | 0;
      var nr = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (nr >>> 26) | 0, nr &= 67108863, f = Math.imul(ue, ce), u = Math.imul(ue, Ge), u = u + Math.imul(Ke, ce) | 0, w = Math.imul(Ke, Ge), f = f + Math.imul(Me, de) | 0, u = u + Math.imul(Me, _) | 0, u = u + Math.imul(Ve, de) | 0, w = w + Math.imul(Ve, _) | 0, f = f + Math.imul(le, S) | 0, u = u + Math.imul(le, U) | 0, u = u + Math.imul($e, S) | 0, w = w + Math.imul($e, U) | 0, f = f + Math.imul(be, Y) | 0, u = u + Math.imul(be, $) | 0, u = u + Math.imul(ke, Y) | 0, w = w + Math.imul(ke, $) | 0, f = f + Math.imul(ge, G) | 0, u = u + Math.imul(ge, Q) | 0, u = u + Math.imul(We, G) | 0, w = w + Math.imul(We, Q) | 0, f = f + Math.imul(we, re) | 0, u = u + Math.imul(we, Ie) | 0, u = u + Math.imul(Te, re) | 0, w = w + Math.imul(Te, Ie) | 0, f = f + Math.imul(ve, he) | 0, u = u + Math.imul(ve, Ce) | 0, u = u + Math.imul(ae, he) | 0, w = w + Math.imul(ae, Ce) | 0, f = f + Math.imul(oe, D) | 0, u = u + Math.imul(oe, se) | 0, u = u + Math.imul(Oe, D) | 0, w = w + Math.imul(Oe, se) | 0, f = f + Math.imul(ne, te) | 0, u = u + Math.imul(ne, Ue) | 0, u = u + Math.imul(Ee, te) | 0, w = w + Math.imul(Ee, Ue) | 0, f = f + Math.imul(F, Ae) | 0, u = u + Math.imul(F, Je) | 0, u = u + Math.imul(j, Ae) | 0, w = w + Math.imul(j, Je) | 0;
      var ir = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (ir >>> 26) | 0, ir &= 67108863, f = Math.imul(ue, de), u = Math.imul(ue, _), u = u + Math.imul(Ke, de) | 0, w = Math.imul(Ke, _), f = f + Math.imul(Me, S) | 0, u = u + Math.imul(Me, U) | 0, u = u + Math.imul(Ve, S) | 0, w = w + Math.imul(Ve, U) | 0, f = f + Math.imul(le, Y) | 0, u = u + Math.imul(le, $) | 0, u = u + Math.imul($e, Y) | 0, w = w + Math.imul($e, $) | 0, f = f + Math.imul(be, G) | 0, u = u + Math.imul(be, Q) | 0, u = u + Math.imul(ke, G) | 0, w = w + Math.imul(ke, Q) | 0, f = f + Math.imul(ge, re) | 0, u = u + Math.imul(ge, Ie) | 0, u = u + Math.imul(We, re) | 0, w = w + Math.imul(We, Ie) | 0, f = f + Math.imul(we, he) | 0, u = u + Math.imul(we, Ce) | 0, u = u + Math.imul(Te, he) | 0, w = w + Math.imul(Te, Ce) | 0, f = f + Math.imul(ve, D) | 0, u = u + Math.imul(ve, se) | 0, u = u + Math.imul(ae, D) | 0, w = w + Math.imul(ae, se) | 0, f = f + Math.imul(oe, te) | 0, u = u + Math.imul(oe, Ue) | 0, u = u + Math.imul(Oe, te) | 0, w = w + Math.imul(Oe, Ue) | 0, f = f + Math.imul(ne, Ae) | 0, u = u + Math.imul(ne, Je) | 0, u = u + Math.imul(Ee, Ae) | 0, w = w + Math.imul(Ee, Je) | 0;
      var or = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (or >>> 26) | 0, or &= 67108863, f = Math.imul(ue, S), u = Math.imul(ue, U), u = u + Math.imul(Ke, S) | 0, w = Math.imul(Ke, U), f = f + Math.imul(Me, Y) | 0, u = u + Math.imul(Me, $) | 0, u = u + Math.imul(Ve, Y) | 0, w = w + Math.imul(Ve, $) | 0, f = f + Math.imul(le, G) | 0, u = u + Math.imul(le, Q) | 0, u = u + Math.imul($e, G) | 0, w = w + Math.imul($e, Q) | 0, f = f + Math.imul(be, re) | 0, u = u + Math.imul(be, Ie) | 0, u = u + Math.imul(ke, re) | 0, w = w + Math.imul(ke, Ie) | 0, f = f + Math.imul(ge, he) | 0, u = u + Math.imul(ge, Ce) | 0, u = u + Math.imul(We, he) | 0, w = w + Math.imul(We, Ce) | 0, f = f + Math.imul(we, D) | 0, u = u + Math.imul(we, se) | 0, u = u + Math.imul(Te, D) | 0, w = w + Math.imul(Te, se) | 0, f = f + Math.imul(ve, te) | 0, u = u + Math.imul(ve, Ue) | 0, u = u + Math.imul(ae, te) | 0, w = w + Math.imul(ae, Ue) | 0, f = f + Math.imul(oe, Ae) | 0, u = u + Math.imul(oe, Je) | 0, u = u + Math.imul(Oe, Ae) | 0, w = w + Math.imul(Oe, Je) | 0;
      var sr = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (sr >>> 26) | 0, sr &= 67108863, f = Math.imul(ue, Y), u = Math.imul(ue, $), u = u + Math.imul(Ke, Y) | 0, w = Math.imul(Ke, $), f = f + Math.imul(Me, G) | 0, u = u + Math.imul(Me, Q) | 0, u = u + Math.imul(Ve, G) | 0, w = w + Math.imul(Ve, Q) | 0, f = f + Math.imul(le, re) | 0, u = u + Math.imul(le, Ie) | 0, u = u + Math.imul($e, re) | 0, w = w + Math.imul($e, Ie) | 0, f = f + Math.imul(be, he) | 0, u = u + Math.imul(be, Ce) | 0, u = u + Math.imul(ke, he) | 0, w = w + Math.imul(ke, Ce) | 0, f = f + Math.imul(ge, D) | 0, u = u + Math.imul(ge, se) | 0, u = u + Math.imul(We, D) | 0, w = w + Math.imul(We, se) | 0, f = f + Math.imul(we, te) | 0, u = u + Math.imul(we, Ue) | 0, u = u + Math.imul(Te, te) | 0, w = w + Math.imul(Te, Ue) | 0, f = f + Math.imul(ve, Ae) | 0, u = u + Math.imul(ve, Je) | 0, u = u + Math.imul(ae, Ae) | 0, w = w + Math.imul(ae, Je) | 0;
      var ar = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (ar >>> 26) | 0, ar &= 67108863, f = Math.imul(ue, G), u = Math.imul(ue, Q), u = u + Math.imul(Ke, G) | 0, w = Math.imul(Ke, Q), f = f + Math.imul(Me, re) | 0, u = u + Math.imul(Me, Ie) | 0, u = u + Math.imul(Ve, re) | 0, w = w + Math.imul(Ve, Ie) | 0, f = f + Math.imul(le, he) | 0, u = u + Math.imul(le, Ce) | 0, u = u + Math.imul($e, he) | 0, w = w + Math.imul($e, Ce) | 0, f = f + Math.imul(be, D) | 0, u = u + Math.imul(be, se) | 0, u = u + Math.imul(ke, D) | 0, w = w + Math.imul(ke, se) | 0, f = f + Math.imul(ge, te) | 0, u = u + Math.imul(ge, Ue) | 0, u = u + Math.imul(We, te) | 0, w = w + Math.imul(We, Ue) | 0, f = f + Math.imul(we, Ae) | 0, u = u + Math.imul(we, Je) | 0, u = u + Math.imul(Te, Ae) | 0, w = w + Math.imul(Te, Je) | 0;
      var fr = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (fr >>> 26) | 0, fr &= 67108863, f = Math.imul(ue, re), u = Math.imul(ue, Ie), u = u + Math.imul(Ke, re) | 0, w = Math.imul(Ke, Ie), f = f + Math.imul(Me, he) | 0, u = u + Math.imul(Me, Ce) | 0, u = u + Math.imul(Ve, he) | 0, w = w + Math.imul(Ve, Ce) | 0, f = f + Math.imul(le, D) | 0, u = u + Math.imul(le, se) | 0, u = u + Math.imul($e, D) | 0, w = w + Math.imul($e, se) | 0, f = f + Math.imul(be, te) | 0, u = u + Math.imul(be, Ue) | 0, u = u + Math.imul(ke, te) | 0, w = w + Math.imul(ke, Ue) | 0, f = f + Math.imul(ge, Ae) | 0, u = u + Math.imul(ge, Je) | 0, u = u + Math.imul(We, Ae) | 0, w = w + Math.imul(We, Je) | 0;
      var lr = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (lr >>> 26) | 0, lr &= 67108863, f = Math.imul(ue, he), u = Math.imul(ue, Ce), u = u + Math.imul(Ke, he) | 0, w = Math.imul(Ke, Ce), f = f + Math.imul(Me, D) | 0, u = u + Math.imul(Me, se) | 0, u = u + Math.imul(Ve, D) | 0, w = w + Math.imul(Ve, se) | 0, f = f + Math.imul(le, te) | 0, u = u + Math.imul(le, Ue) | 0, u = u + Math.imul($e, te) | 0, w = w + Math.imul($e, Ue) | 0, f = f + Math.imul(be, Ae) | 0, u = u + Math.imul(be, Je) | 0, u = u + Math.imul(ke, Ae) | 0, w = w + Math.imul(ke, Je) | 0;
      var ur = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (ur >>> 26) | 0, ur &= 67108863, f = Math.imul(ue, D), u = Math.imul(ue, se), u = u + Math.imul(Ke, D) | 0, w = Math.imul(Ke, se), f = f + Math.imul(Me, te) | 0, u = u + Math.imul(Me, Ue) | 0, u = u + Math.imul(Ve, te) | 0, w = w + Math.imul(Ve, Ue) | 0, f = f + Math.imul(le, Ae) | 0, u = u + Math.imul(le, Je) | 0, u = u + Math.imul($e, Ae) | 0, w = w + Math.imul($e, Je) | 0;
      var cr = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (cr >>> 26) | 0, cr &= 67108863, f = Math.imul(ue, te), u = Math.imul(ue, Ue), u = u + Math.imul(Ke, te) | 0, w = Math.imul(Ke, Ue), f = f + Math.imul(Me, Ae) | 0, u = u + Math.imul(Me, Je) | 0, u = u + Math.imul(Ve, Ae) | 0, w = w + Math.imul(Ve, Je) | 0;
      var hr = (m + f | 0) + ((u & 8191) << 13) | 0;
      m = (w + (u >>> 13) | 0) + (hr >>> 26) | 0, hr &= 67108863, f = Math.imul(ue, Ae), u = Math.imul(ue, Je), u = u + Math.imul(Ke, Ae) | 0, w = Math.imul(Ke, Je);
      var Li = (m + f | 0) + ((u & 8191) << 13) | 0;
      return m = (w + (u >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, y[0] = Ht, y[1] = Jt, y[2] = Zt, y[3] = Qt, y[4] = Xt, y[5] = er, y[6] = tr, y[7] = rr, y[8] = nr, y[9] = ir, y[10] = or, y[11] = sr, y[12] = ar, y[13] = fr, y[14] = lr, y[15] = ur, y[16] = cr, y[17] = hr, y[18] = Li, m !== 0 && (y[19] = m, c.length++), c;
    };
    Math.imul || (J = C);
    function K(s, o, a) {
      a.negative = o.negative ^ s.negative, a.length = s.length + o.length;
      for (var c = 0, p = 0, d = 0; d < a.length - 1; d++) {
        var y = p;
        p = 0;
        for (var m = c & 67108863, f = Math.min(d, o.length - 1), u = Math.max(0, d - s.length + 1); u <= f; u++) {
          var w = d - u, R = s.words[w] | 0, F = o.words[u] | 0, j = R * F, H = j & 67108863;
          y = y + (j / 67108864 | 0) | 0, H = H + m | 0, m = H & 67108863, y = y + (H >>> 26) | 0, p += y >>> 26, y &= 67108863;
        }
        a.words[d] = m, c = y, y = p;
      }
      return c !== 0 ? a.words[d] = c : a.length--, a._strip();
    }
    function T(s, o, a) {
      return K(s, o, a);
    }
    i.prototype.mulTo = function(o, a) {
      var c, p = this.length + o.length;
      return this.length === 10 && o.length === 10 ? c = J(this, o, a) : p < 63 ? c = C(this, o, a) : p < 1024 ? c = K(this, o, a) : c = T(this, o, a), c;
    };
    i.prototype.mul = function(o) {
      var a = new i(null);
      return a.words = new Array(this.length + o.length), this.mulTo(o, a);
    }, i.prototype.mulf = function(o) {
      var a = new i(null);
      return a.words = new Array(this.length + o.length), T(this, o, a);
    }, i.prototype.imul = function(o) {
      return this.clone().mulTo(o, this);
    }, i.prototype.imuln = function(o) {
      var a = o < 0;
      a && (o = -o), t(typeof o == "number"), t(o < 67108864);
      for (var c = 0, p = 0; p < this.length; p++) {
        var d = (this.words[p] | 0) * o, y = (d & 67108863) + (c & 67108863);
        c >>= 26, c += d / 67108864 | 0, c += y >>> 26, this.words[p] = y & 67108863;
      }
      return c !== 0 && (this.words[p] = c, this.length++), a ? this.ineg() : this;
    }, i.prototype.muln = function(o) {
      return this.clone().imuln(o);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(o) {
      var a = q(o);
      if (a.length === 0)
        return new i(1);
      for (var c = this, p = 0; p < a.length && a[p] === 0; p++, c = c.sqr())
        ;
      if (++p < a.length)
        for (var d = c.sqr(); p < a.length; p++, d = d.sqr())
          a[p] !== 0 && (c = c.mul(d));
      return c;
    }, i.prototype.iushln = function(o) {
      t(typeof o == "number" && o >= 0);
      var a = o % 26, c = (o - a) / 26, p = 67108863 >>> 26 - a << 26 - a, d;
      if (a !== 0) {
        var y = 0;
        for (d = 0; d < this.length; d++) {
          var m = this.words[d] & p, f = (this.words[d] | 0) - m << a;
          this.words[d] = f | y, y = m >>> 26 - a;
        }
        y && (this.words[d] = y, this.length++);
      }
      if (c !== 0) {
        for (d = this.length - 1; d >= 0; d--)
          this.words[d + c] = this.words[d];
        for (d = 0; d < c; d++)
          this.words[d] = 0;
        this.length += c;
      }
      return this._strip();
    }, i.prototype.ishln = function(o) {
      return t(this.negative === 0), this.iushln(o);
    }, i.prototype.iushrn = function(o, a, c) {
      t(typeof o == "number" && o >= 0);
      var p;
      a ? p = (a - a % 26) / 26 : p = 0;
      var d = o % 26, y = Math.min((o - d) / 26, this.length), m = 67108863 ^ 67108863 >>> d << d, f = c;
      if (p -= y, p = Math.max(0, p), f) {
        for (var u = 0; u < y; u++)
          f.words[u] = this.words[u];
        f.length = y;
      }
      if (y !== 0)
        if (this.length > y)
          for (this.length -= y, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + y];
        else
          this.words[0] = 0, this.length = 1;
      var w = 0;
      for (u = this.length - 1; u >= 0 && (w !== 0 || u >= p); u--) {
        var R = this.words[u] | 0;
        this.words[u] = w << 26 - d | R >>> d, w = R & m;
      }
      return f && w !== 0 && (f.words[f.length++] = w), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(o, a, c) {
      return t(this.negative === 0), this.iushrn(o, a, c);
    }, i.prototype.shln = function(o) {
      return this.clone().ishln(o);
    }, i.prototype.ushln = function(o) {
      return this.clone().iushln(o);
    }, i.prototype.shrn = function(o) {
      return this.clone().ishrn(o);
    }, i.prototype.ushrn = function(o) {
      return this.clone().iushrn(o);
    }, i.prototype.testn = function(o) {
      t(typeof o == "number" && o >= 0);
      var a = o % 26, c = (o - a) / 26, p = 1 << a;
      if (this.length <= c)
        return false;
      var d = this.words[c];
      return !!(d & p);
    }, i.prototype.imaskn = function(o) {
      t(typeof o == "number" && o >= 0);
      var a = o % 26, c = (o - a) / 26;
      if (t(this.negative === 0, "imaskn works only with positive numbers"), this.length <= c)
        return this;
      if (a !== 0 && c++, this.length = Math.min(c, this.length), a !== 0) {
        var p = 67108863 ^ 67108863 >>> a << a;
        this.words[this.length - 1] &= p;
      }
      return this._strip();
    }, i.prototype.maskn = function(o) {
      return this.clone().imaskn(o);
    }, i.prototype.iaddn = function(o) {
      return t(typeof o == "number"), t(o < 67108864), o < 0 ? this.isubn(-o) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= o ? (this.words[0] = o - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(o), this.negative = 1, this) : this._iaddn(o);
    }, i.prototype._iaddn = function(o) {
      this.words[0] += o;
      for (var a = 0; a < this.length && this.words[a] >= 67108864; a++)
        this.words[a] -= 67108864, a === this.length - 1 ? this.words[a + 1] = 1 : this.words[a + 1]++;
      return this.length = Math.max(this.length, a + 1), this;
    }, i.prototype.isubn = function(o) {
      if (t(typeof o == "number"), t(o < 67108864), o < 0)
        return this.iaddn(-o);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(o), this.negative = 1, this;
      if (this.words[0] -= o, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var a = 0; a < this.length && this.words[a] < 0; a++)
          this.words[a] += 67108864, this.words[a + 1] -= 1;
      return this._strip();
    }, i.prototype.addn = function(o) {
      return this.clone().iaddn(o);
    }, i.prototype.subn = function(o) {
      return this.clone().isubn(o);
    }, i.prototype.iabs = function() {
      return this.negative = 0, this;
    }, i.prototype.abs = function() {
      return this.clone().iabs();
    }, i.prototype._ishlnsubmul = function(o, a, c) {
      var p = o.length + c, d;
      this._expand(p);
      var y, m = 0;
      for (d = 0; d < o.length; d++) {
        y = (this.words[d + c] | 0) + m;
        var f = (o.words[d] | 0) * a;
        y -= f & 67108863, m = (y >> 26) - (f / 67108864 | 0), this.words[d + c] = y & 67108863;
      }
      for (; d < this.length - c; d++)
        y = (this.words[d + c] | 0) + m, m = y >> 26, this.words[d + c] = y & 67108863;
      if (m === 0)
        return this._strip();
      for (t(m === -1), m = 0, d = 0; d < this.length; d++)
        y = -(this.words[d] | 0) + m, m = y >> 26, this.words[d] = y & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(o, a) {
      var c = this.length - o.length, p = this.clone(), d = o, y = d.words[d.length - 1] | 0, m = this._countBits(y);
      c = 26 - m, c !== 0 && (d = d.ushln(c), p.iushln(c), y = d.words[d.length - 1] | 0);
      var f = p.length - d.length, u;
      if (a !== "mod") {
        u = new i(null), u.length = f + 1, u.words = new Array(u.length);
        for (var w = 0; w < u.length; w++)
          u.words[w] = 0;
      }
      var R = p.clone()._ishlnsubmul(d, 1, f);
      R.negative === 0 && (p = R, u && (u.words[f] = 1));
      for (var F = f - 1; F >= 0; F--) {
        var j = (p.words[d.length + F] | 0) * 67108864 + (p.words[d.length + F - 1] | 0);
        for (j = Math.min(j / y | 0, 67108863), p._ishlnsubmul(d, j, F); p.negative !== 0; )
          j--, p.negative = 0, p._ishlnsubmul(d, 1, F), p.isZero() || (p.negative ^= 1);
        u && (u.words[F] = j);
      }
      return u && u._strip(), p._strip(), a !== "div" && c !== 0 && p.iushrn(c), { div: u || null, mod: p };
    }, i.prototype.divmod = function(o, a, c) {
      if (t(!o.isZero()), this.isZero())
        return { div: new i(0), mod: new i(0) };
      var p, d, y;
      return this.negative !== 0 && o.negative === 0 ? (y = this.neg().divmod(o, a), a !== "mod" && (p = y.div.neg()), a !== "div" && (d = y.mod.neg(), c && d.negative !== 0 && d.iadd(o)), { div: p, mod: d }) : this.negative === 0 && o.negative !== 0 ? (y = this.divmod(o.neg(), a), a !== "mod" && (p = y.div.neg()), { div: p, mod: y.mod }) : this.negative & o.negative ? (y = this.neg().divmod(o.neg(), a), a !== "div" && (d = y.mod.neg(), c && d.negative !== 0 && d.isub(o)), { div: y.div, mod: d }) : o.length > this.length || this.cmp(o) < 0 ? { div: new i(0), mod: this } : o.length === 1 ? a === "div" ? { div: this.divn(o.words[0]), mod: null } : a === "mod" ? { div: null, mod: new i(this.modrn(o.words[0])) } : { div: this.divn(o.words[0]), mod: new i(this.modrn(o.words[0])) } : this._wordDiv(o, a);
    }, i.prototype.div = function(o) {
      return this.divmod(o, "div", false).div;
    }, i.prototype.mod = function(o) {
      return this.divmod(o, "mod", false).mod;
    }, i.prototype.umod = function(o) {
      return this.divmod(o, "mod", true).mod;
    }, i.prototype.divRound = function(o) {
      var a = this.divmod(o);
      if (a.mod.isZero())
        return a.div;
      var c = a.div.negative !== 0 ? a.mod.isub(o) : a.mod, p = o.ushrn(1), d = o.andln(1), y = c.cmp(p);
      return y < 0 || d === 1 && y === 0 ? a.div : a.div.negative !== 0 ? a.div.isubn(1) : a.div.iaddn(1);
    }, i.prototype.modrn = function(o) {
      var a = o < 0;
      a && (o = -o), t(o <= 67108863);
      for (var c = (1 << 26) % o, p = 0, d = this.length - 1; d >= 0; d--)
        p = (c * p + (this.words[d] | 0)) % o;
      return a ? -p : p;
    }, i.prototype.modn = function(o) {
      return this.modrn(o);
    }, i.prototype.idivn = function(o) {
      var a = o < 0;
      a && (o = -o), t(o <= 67108863);
      for (var c = 0, p = this.length - 1; p >= 0; p--) {
        var d = (this.words[p] | 0) + c * 67108864;
        this.words[p] = d / o | 0, c = d % o;
      }
      return this._strip(), a ? this.ineg() : this;
    }, i.prototype.divn = function(o) {
      return this.clone().idivn(o);
    }, i.prototype.egcd = function(o) {
      t(o.negative === 0), t(!o.isZero());
      var a = this, c = o.clone();
      a.negative !== 0 ? a = a.umod(o) : a = a.clone();
      for (var p = new i(1), d = new i(0), y = new i(0), m = new i(1), f = 0; a.isEven() && c.isEven(); )
        a.iushrn(1), c.iushrn(1), ++f;
      for (var u = c.clone(), w = a.clone(); !a.isZero(); ) {
        for (var R = 0, F = 1; !(a.words[0] & F) && R < 26; ++R, F <<= 1)
          ;
        if (R > 0)
          for (a.iushrn(R); R-- > 0; )
            (p.isOdd() || d.isOdd()) && (p.iadd(u), d.isub(w)), p.iushrn(1), d.iushrn(1);
        for (var j = 0, H = 1; !(c.words[0] & H) && j < 26; ++j, H <<= 1)
          ;
        if (j > 0)
          for (c.iushrn(j); j-- > 0; )
            (y.isOdd() || m.isOdd()) && (y.iadd(u), m.isub(w)), y.iushrn(1), m.iushrn(1);
        a.cmp(c) >= 0 ? (a.isub(c), p.isub(y), d.isub(m)) : (c.isub(a), y.isub(p), m.isub(d));
      }
      return { a: y, b: m, gcd: c.iushln(f) };
    }, i.prototype._invmp = function(o) {
      t(o.negative === 0), t(!o.isZero());
      var a = this, c = o.clone();
      a.negative !== 0 ? a = a.umod(o) : a = a.clone();
      for (var p = new i(1), d = new i(0), y = c.clone(); a.cmpn(1) > 0 && c.cmpn(1) > 0; ) {
        for (var m = 0, f = 1; !(a.words[0] & f) && m < 26; ++m, f <<= 1)
          ;
        if (m > 0)
          for (a.iushrn(m); m-- > 0; )
            p.isOdd() && p.iadd(y), p.iushrn(1);
        for (var u = 0, w = 1; !(c.words[0] & w) && u < 26; ++u, w <<= 1)
          ;
        if (u > 0)
          for (c.iushrn(u); u-- > 0; )
            d.isOdd() && d.iadd(y), d.iushrn(1);
        a.cmp(c) >= 0 ? (a.isub(c), p.isub(d)) : (c.isub(a), d.isub(p));
      }
      var R;
      return a.cmpn(1) === 0 ? R = p : R = d, R.cmpn(0) < 0 && R.iadd(o), R;
    }, i.prototype.gcd = function(o) {
      if (this.isZero())
        return o.abs();
      if (o.isZero())
        return this.abs();
      var a = this.clone(), c = o.clone();
      a.negative = 0, c.negative = 0;
      for (var p = 0; a.isEven() && c.isEven(); p++)
        a.iushrn(1), c.iushrn(1);
      do {
        for (; a.isEven(); )
          a.iushrn(1);
        for (; c.isEven(); )
          c.iushrn(1);
        var d = a.cmp(c);
        if (d < 0) {
          var y = a;
          a = c, c = y;
        } else if (d === 0 || c.cmpn(1) === 0)
          break;
        a.isub(c);
      } while (true);
      return c.iushln(p);
    }, i.prototype.invm = function(o) {
      return this.egcd(o).a.umod(o);
    }, i.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, i.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, i.prototype.andln = function(o) {
      return this.words[0] & o;
    }, i.prototype.bincn = function(o) {
      t(typeof o == "number");
      var a = o % 26, c = (o - a) / 26, p = 1 << a;
      if (this.length <= c)
        return this._expand(c + 1), this.words[c] |= p, this;
      for (var d = p, y = c; d !== 0 && y < this.length; y++) {
        var m = this.words[y] | 0;
        m += d, d = m >>> 26, m &= 67108863, this.words[y] = m;
      }
      return d !== 0 && (this.words[y] = d, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(o) {
      var a = o < 0;
      if (this.negative !== 0 && !a)
        return -1;
      if (this.negative === 0 && a)
        return 1;
      this._strip();
      var c;
      if (this.length > 1)
        c = 1;
      else {
        a && (o = -o), t(o <= 67108863, "Number is too big");
        var p = this.words[0] | 0;
        c = p === o ? 0 : p < o ? -1 : 1;
      }
      return this.negative !== 0 ? -c | 0 : c;
    }, i.prototype.cmp = function(o) {
      if (this.negative !== 0 && o.negative === 0)
        return -1;
      if (this.negative === 0 && o.negative !== 0)
        return 1;
      var a = this.ucmp(o);
      return this.negative !== 0 ? -a | 0 : a;
    }, i.prototype.ucmp = function(o) {
      if (this.length > o.length)
        return 1;
      if (this.length < o.length)
        return -1;
      for (var a = 0, c = this.length - 1; c >= 0; c--) {
        var p = this.words[c] | 0, d = o.words[c] | 0;
        if (p !== d) {
          p < d ? a = -1 : p > d && (a = 1);
          break;
        }
      }
      return a;
    }, i.prototype.gtn = function(o) {
      return this.cmpn(o) === 1;
    }, i.prototype.gt = function(o) {
      return this.cmp(o) === 1;
    }, i.prototype.gten = function(o) {
      return this.cmpn(o) >= 0;
    }, i.prototype.gte = function(o) {
      return this.cmp(o) >= 0;
    }, i.prototype.ltn = function(o) {
      return this.cmpn(o) === -1;
    }, i.prototype.lt = function(o) {
      return this.cmp(o) === -1;
    }, i.prototype.lten = function(o) {
      return this.cmpn(o) <= 0;
    }, i.prototype.lte = function(o) {
      return this.cmp(o) <= 0;
    }, i.prototype.eqn = function(o) {
      return this.cmpn(o) === 0;
    }, i.prototype.eq = function(o) {
      return this.cmp(o) === 0;
    }, i.red = function(o) {
      return new ie(o);
    }, i.prototype.toRed = function(o) {
      return t(!this.red, "Already a number in reduction context"), t(this.negative === 0, "red works only with positives"), o.convertTo(this)._forceRed(o);
    }, i.prototype.fromRed = function() {
      return t(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, i.prototype._forceRed = function(o) {
      return this.red = o, this;
    }, i.prototype.forceRed = function(o) {
      return t(!this.red, "Already a number in reduction context"), this._forceRed(o);
    }, i.prototype.redAdd = function(o) {
      return t(this.red, "redAdd works only with red numbers"), this.red.add(this, o);
    }, i.prototype.redIAdd = function(o) {
      return t(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, o);
    }, i.prototype.redSub = function(o) {
      return t(this.red, "redSub works only with red numbers"), this.red.sub(this, o);
    }, i.prototype.redISub = function(o) {
      return t(this.red, "redISub works only with red numbers"), this.red.isub(this, o);
    }, i.prototype.redShl = function(o) {
      return t(this.red, "redShl works only with red numbers"), this.red.shl(this, o);
    }, i.prototype.redMul = function(o) {
      return t(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.mul(this, o);
    }, i.prototype.redIMul = function(o) {
      return t(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.imul(this, o);
    }, i.prototype.redSqr = function() {
      return t(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, i.prototype.redISqr = function() {
      return t(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, i.prototype.redSqrt = function() {
      return t(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, i.prototype.redInvm = function() {
      return t(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, i.prototype.redNeg = function() {
      return t(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, i.prototype.redPow = function(o) {
      return t(this.red && !o.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, o);
    };
    var L = { k256: null, p224: null, p192: null, p25519: null };
    function W(s, o) {
      this.name = s, this.p = new i(o, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    W.prototype._tmp = function() {
      var o = new i(null);
      return o.words = new Array(Math.ceil(this.n / 13)), o;
    }, W.prototype.ireduce = function(o) {
      var a = o, c;
      do
        this.split(a, this.tmp), a = this.imulK(a), a = a.iadd(this.tmp), c = a.bitLength();
      while (c > this.n);
      var p = c < this.n ? -1 : a.ucmp(this.p);
      return p === 0 ? (a.words[0] = 0, a.length = 1) : p > 0 ? a.isub(this.p) : a.strip !== void 0 ? a.strip() : a._strip(), a;
    }, W.prototype.split = function(o, a) {
      o.iushrn(this.n, 0, a);
    }, W.prototype.imulK = function(o) {
      return o.imul(this.k);
    };
    function V() {
      W.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    n(V, W), V.prototype.split = function(o, a) {
      for (var c = 4194303, p = Math.min(o.length, 9), d = 0; d < p; d++)
        a.words[d] = o.words[d];
      if (a.length = p, o.length <= 9) {
        o.words[0] = 0, o.length = 1;
        return;
      }
      var y = o.words[9];
      for (a.words[a.length++] = y & c, d = 10; d < o.length; d++) {
        var m = o.words[d] | 0;
        o.words[d - 10] = (m & c) << 4 | y >>> 22, y = m;
      }
      y >>>= 22, o.words[d - 10] = y, y === 0 && o.length > 10 ? o.length -= 10 : o.length -= 9;
    }, V.prototype.imulK = function(o) {
      o.words[o.length] = 0, o.words[o.length + 1] = 0, o.length += 2;
      for (var a = 0, c = 0; c < o.length; c++) {
        var p = o.words[c] | 0;
        a += p * 977, o.words[c] = a & 67108863, a = p * 64 + (a / 67108864 | 0);
      }
      return o.words[o.length - 1] === 0 && (o.length--, o.words[o.length - 1] === 0 && o.length--), o;
    };
    function fe() {
      W.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    n(fe, W);
    function ee() {
      W.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    n(ee, W);
    function Z() {
      W.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    n(Z, W), Z.prototype.imulK = function(o) {
      for (var a = 0, c = 0; c < o.length; c++) {
        var p = (o.words[c] | 0) * 19 + a, d = p & 67108863;
        p >>>= 26, o.words[c] = d, a = p;
      }
      return a !== 0 && (o.words[o.length++] = a), o;
    }, i._prime = function(o) {
      if (L[o])
        return L[o];
      var a;
      if (o === "k256")
        a = new V();
      else if (o === "p224")
        a = new fe();
      else if (o === "p192")
        a = new ee();
      else if (o === "p25519")
        a = new Z();
      else
        throw new Error("Unknown prime " + o);
      return L[o] = a, a;
    };
    function ie(s) {
      if (typeof s == "string") {
        var o = i._prime(s);
        this.m = o.p, this.prime = o;
      } else
        t(s.gtn(1), "modulus must be greater than 1"), this.m = s, this.prime = null;
    }
    ie.prototype._verify1 = function(o) {
      t(o.negative === 0, "red works only with positives"), t(o.red, "red works only with red numbers");
    }, ie.prototype._verify2 = function(o, a) {
      t((o.negative | a.negative) === 0, "red works only with positives"), t(o.red && o.red === a.red, "red works only with red numbers");
    }, ie.prototype.imod = function(o) {
      return this.prime ? this.prime.ireduce(o)._forceRed(this) : (b(o, o.umod(this.m)._forceRed(this)), o);
    }, ie.prototype.neg = function(o) {
      return o.isZero() ? o.clone() : this.m.sub(o)._forceRed(this);
    }, ie.prototype.add = function(o, a) {
      this._verify2(o, a);
      var c = o.add(a);
      return c.cmp(this.m) >= 0 && c.isub(this.m), c._forceRed(this);
    }, ie.prototype.iadd = function(o, a) {
      this._verify2(o, a);
      var c = o.iadd(a);
      return c.cmp(this.m) >= 0 && c.isub(this.m), c;
    }, ie.prototype.sub = function(o, a) {
      this._verify2(o, a);
      var c = o.sub(a);
      return c.cmpn(0) < 0 && c.iadd(this.m), c._forceRed(this);
    }, ie.prototype.isub = function(o, a) {
      this._verify2(o, a);
      var c = o.isub(a);
      return c.cmpn(0) < 0 && c.iadd(this.m), c;
    }, ie.prototype.shl = function(o, a) {
      return this._verify1(o), this.imod(o.ushln(a));
    }, ie.prototype.imul = function(o, a) {
      return this._verify2(o, a), this.imod(o.imul(a));
    }, ie.prototype.mul = function(o, a) {
      return this._verify2(o, a), this.imod(o.mul(a));
    }, ie.prototype.isqr = function(o) {
      return this.imul(o, o.clone());
    }, ie.prototype.sqr = function(o) {
      return this.mul(o, o);
    }, ie.prototype.sqrt = function(o) {
      if (o.isZero())
        return o.clone();
      var a = this.m.andln(3);
      if (t(a % 2 === 1), a === 3) {
        var c = this.m.add(new i(1)).iushrn(2);
        return this.pow(o, c);
      }
      for (var p = this.m.subn(1), d = 0; !p.isZero() && p.andln(1) === 0; )
        d++, p.iushrn(1);
      t(!p.isZero());
      var y = new i(1).toRed(this), m = y.redNeg(), f = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, f).cmp(m) !== 0; )
        u.redIAdd(m);
      for (var w = this.pow(u, p), R = this.pow(o, p.addn(1).iushrn(1)), F = this.pow(o, p), j = d; F.cmp(y) !== 0; ) {
        for (var H = F, ne = 0; H.cmp(y) !== 0; ne++)
          H = H.redSqr();
        t(ne < j);
        var Ee = this.pow(w, new i(1).iushln(j - ne - 1));
        R = R.redMul(Ee), w = Ee.redSqr(), F = F.redMul(w), j = ne;
      }
      return R;
    }, ie.prototype.invm = function(o) {
      var a = o._invmp(this.m);
      return a.negative !== 0 ? (a.negative = 0, this.imod(a).redNeg()) : this.imod(a);
    }, ie.prototype.pow = function(o, a) {
      if (a.isZero())
        return new i(1).toRed(this);
      if (a.cmpn(1) === 0)
        return o.clone();
      var c = 4, p = new Array(1 << c);
      p[0] = new i(1).toRed(this), p[1] = o;
      for (var d = 2; d < p.length; d++)
        p[d] = this.mul(p[d - 1], o);
      var y = p[0], m = 0, f = 0, u = a.bitLength() % 26;
      for (u === 0 && (u = 26), d = a.length - 1; d >= 0; d--) {
        for (var w = a.words[d], R = u - 1; R >= 0; R--) {
          var F = w >> R & 1;
          if (y !== p[0] && (y = this.sqr(y)), F === 0 && m === 0) {
            f = 0;
            continue;
          }
          m <<= 1, m |= F, f++, !(f !== c && (d !== 0 || R !== 0)) && (y = this.mul(y, p[m]), f = 0, m = 0);
        }
        u = 26;
      }
      return y;
    }, ie.prototype.convertTo = function(o) {
      var a = o.umod(this.m);
      return a === o ? a.clone() : a;
    }, ie.prototype.convertFrom = function(o) {
      var a = o.clone();
      return a.red = null, a;
    }, i.mont = function(o) {
      return new M(o);
    };
    function M(s) {
      ie.call(this, s), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    n(M, ie), M.prototype.convertTo = function(o) {
      return this.imod(o.ushln(this.shift));
    }, M.prototype.convertFrom = function(o) {
      var a = this.imod(o.mul(this.rinv));
      return a.red = null, a;
    }, M.prototype.imul = function(o, a) {
      if (o.isZero() || a.isZero())
        return o.words[0] = 0, o.length = 1, o;
      var c = o.imul(a), p = c.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), d = c.isub(p).iushrn(this.shift), y = d;
      return d.cmp(this.m) >= 0 ? y = d.isub(this.m) : d.cmpn(0) < 0 && (y = d.iadd(this.m)), y._forceRed(this);
    }, M.prototype.mul = function(o, a) {
      if (o.isZero() || a.isZero())
        return new i(0)._forceRed(this);
      var c = o.mul(a), p = c.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), d = c.isub(p).iushrn(this.shift), y = d;
      return d.cmp(this.m) >= 0 ? y = d.isub(this.m) : d.cmpn(0) < 0 && (y = d.iadd(this.m)), y._forceRed(this);
    }, M.prototype.invm = function(o) {
      var a = this.imod(o._invmp(this.m).mul(this.r2));
      return a._forceRed(this);
    };
  })(typeof Xo == "undefined" || Xo, Tl);
});
var Cl = ye((Ai) => {
  Ai.byteLength = pp;
  Ai.toByteArray = mp;
  Ai.fromByteArray = vp;
  var It = [], mt = [], hp = typeof Uint8Array != "undefined" ? Uint8Array : Array, es = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (Mr = 0, Ol = es.length; Mr < Ol; ++Mr)
    It[Mr] = es[Mr], mt[es.charCodeAt(Mr)] = Mr;
  var Mr, Ol;
  mt["-".charCodeAt(0)] = 62;
  mt["_".charCodeAt(0)] = 63;
  function Pl(r2) {
    var e = r2.length;
    if (e % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var t = r2.indexOf("=");
    t === -1 && (t = e);
    var n = t === e ? 0 : 4 - t % 4;
    return [t, n];
  }
  function pp(r2) {
    var e = Pl(r2), t = e[0], n = e[1];
    return (t + n) * 3 / 4 - n;
  }
  function dp(r2, e, t) {
    return (e + t) * 3 / 4 - t;
  }
  function mp(r2) {
    var e, t = Pl(r2), n = t[0], i = t[1], l = new hp(dp(r2, n, i)), h = 0, g = i > 0 ? n - 4 : n, v;
    for (v = 0; v < g; v += 4)
      e = mt[r2.charCodeAt(v)] << 18 | mt[r2.charCodeAt(v + 1)] << 12 | mt[r2.charCodeAt(v + 2)] << 6 | mt[r2.charCodeAt(v + 3)], l[h++] = e >> 16 & 255, l[h++] = e >> 8 & 255, l[h++] = e & 255;
    return i === 2 && (e = mt[r2.charCodeAt(v)] << 2 | mt[r2.charCodeAt(v + 1)] >> 4, l[h++] = e & 255), i === 1 && (e = mt[r2.charCodeAt(v)] << 10 | mt[r2.charCodeAt(v + 1)] << 4 | mt[r2.charCodeAt(v + 2)] >> 2, l[h++] = e >> 8 & 255, l[h++] = e & 255), l;
  }
  function gp(r2) {
    return It[r2 >> 18 & 63] + It[r2 >> 12 & 63] + It[r2 >> 6 & 63] + It[r2 & 63];
  }
  function yp(r2, e, t) {
    for (var n, i = [], l = e; l < t; l += 3)
      n = (r2[l] << 16 & 16711680) + (r2[l + 1] << 8 & 65280) + (r2[l + 2] & 255), i.push(gp(n));
    return i.join("");
  }
  function vp(r2) {
    for (var e, t = r2.length, n = t % 3, i = [], l = 16383, h = 0, g = t - n; h < g; h += l)
      i.push(yp(r2, h, h + l > g ? g : h + l));
    return n === 1 ? (e = r2[t - 1], i.push(It[e >> 2] + It[e << 4 & 63] + "==")) : n === 2 && (e = (r2[t - 2] << 8) + r2[t - 1], i.push(It[e >> 10] + It[e >> 4 & 63] + It[e << 2 & 63] + "=")), i.join("");
  }
});
var Nl = ye((ts) => {
  ts.read = function(r2, e, t, n, i) {
    var l, h, g = i * 8 - n - 1, v = (1 << g) - 1, b = v >> 1, x = -7, A = t ? i - 1 : 0, O = t ? -1 : 1, k = r2[e + A];
    for (A += O, l = k & (1 << -x) - 1, k >>= -x, x += g; x > 0; l = l * 256 + r2[e + A], A += O, x -= 8)
      ;
    for (h = l & (1 << -x) - 1, l >>= -x, x += n; x > 0; h = h * 256 + r2[e + A], A += O, x -= 8)
      ;
    if (l === 0)
      l = 1 - b;
    else {
      if (l === v)
        return h ? NaN : (k ? -1 : 1) * (1 / 0);
      h = h + Math.pow(2, n), l = l - b;
    }
    return (k ? -1 : 1) * h * Math.pow(2, l - n);
  };
  ts.write = function(r2, e, t, n, i, l) {
    var h, g, v, b = l * 8 - i - 1, x = (1 << b) - 1, A = x >> 1, O = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, k = n ? 0 : l - 1, N = n ? 1 : -1, q = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (g = isNaN(e) ? 1 : 0, h = x) : (h = Math.floor(Math.log(e) / Math.LN2), e * (v = Math.pow(2, -h)) < 1 && (h--, v *= 2), h + A >= 1 ? e += O / v : e += O * Math.pow(2, 1 - A), e * v >= 2 && (h++, v /= 2), h + A >= x ? (g = 0, h = x) : h + A >= 1 ? (g = (e * v - 1) * Math.pow(2, i), h = h + A) : (g = e * Math.pow(2, A - 1) * Math.pow(2, i), h = 0)); i >= 8; r2[t + k] = g & 255, k += N, g /= 256, i -= 8)
      ;
    for (h = h << i | g, b += i; b > 0; r2[t + k] = h & 255, k += N, h /= 256, b -= 8)
      ;
    r2[t + k - N] |= q * 128;
  };
});
var Hl = ye((Xr) => {
  var rs = Cl(), Zr = Nl(), kl = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  Xr.Buffer = B;
  Xr.SlowBuffer = _p;
  Xr.INSPECT_MAX_BYTES = 50;
  var _i = 2147483647;
  Xr.kMaxLength = _i;
  B.TYPED_ARRAY_SUPPORT = wp();
  !B.TYPED_ARRAY_SUPPORT && typeof console != "undefined" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function wp() {
    try {
      let r2 = new Uint8Array(1), e = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(r2, e), r2.foo() === 42;
    } catch (r2) {
      return false;
    }
  }
  Object.defineProperty(B.prototype, "parent", { enumerable: true, get: function() {
    if (B.isBuffer(this))
      return this.buffer;
  } });
  Object.defineProperty(B.prototype, "offset", { enumerable: true, get: function() {
    if (B.isBuffer(this))
      return this.byteOffset;
  } });
  function Rt(r2) {
    if (r2 > _i)
      throw new RangeError('The value "' + r2 + '" is invalid for option "size"');
    let e = new Uint8Array(r2);
    return Object.setPrototypeOf(e, B.prototype), e;
  }
  function B(r2, e, t) {
    if (typeof r2 == "number") {
      if (typeof e == "string")
        throw new TypeError('The "string" argument must be of type string. Received type number');
      return ss(r2);
    }
    return Fl(r2, e, t);
  }
  B.poolSize = 8192;
  function Fl(r2, e, t) {
    if (typeof r2 == "string")
      return xp(r2, e);
    if (ArrayBuffer.isView(r2))
      return Mp(r2);
    if (r2 == null)
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r2);
    if (Ot(r2, ArrayBuffer) || r2 && Ot(r2.buffer, ArrayBuffer) || typeof SharedArrayBuffer != "undefined" && (Ot(r2, SharedArrayBuffer) || r2 && Ot(r2.buffer, SharedArrayBuffer)))
      return is(r2, e, t);
    if (typeof r2 == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    let n = r2.valueOf && r2.valueOf();
    if (n != null && n !== r2)
      return B.from(n, e, t);
    let i = Ap(r2);
    if (i)
      return i;
    if (typeof Symbol != "undefined" && Symbol.toPrimitive != null && typeof r2[Symbol.toPrimitive] == "function")
      return B.from(r2[Symbol.toPrimitive]("string"), e, t);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r2);
  }
  B.from = function(r2, e, t) {
    return Fl(r2, e, t);
  };
  Object.setPrototypeOf(B.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(B, Uint8Array);
  function Dl(r2) {
    if (typeof r2 != "number")
      throw new TypeError('"size" argument must be of type number');
    if (r2 < 0)
      throw new RangeError('The value "' + r2 + '" is invalid for option "size"');
  }
  function bp(r2, e, t) {
    return Dl(r2), r2 <= 0 ? Rt(r2) : e !== void 0 ? typeof t == "string" ? Rt(r2).fill(e, t) : Rt(r2).fill(e) : Rt(r2);
  }
  B.alloc = function(r2, e, t) {
    return bp(r2, e, t);
  };
  function ss(r2) {
    return Dl(r2), Rt(r2 < 0 ? 0 : as(r2) | 0);
  }
  B.allocUnsafe = function(r2) {
    return ss(r2);
  };
  B.allocUnsafeSlow = function(r2) {
    return ss(r2);
  };
  function xp(r2, e) {
    if ((typeof e != "string" || e === "") && (e = "utf8"), !B.isEncoding(e))
      throw new TypeError("Unknown encoding: " + e);
    let t = Ll(r2, e) | 0, n = Rt(t), i = n.write(r2, e);
    return i !== t && (n = n.slice(0, i)), n;
  }
  function ns(r2) {
    let e = r2.length < 0 ? 0 : as(r2.length) | 0, t = Rt(e);
    for (let n = 0; n < e; n += 1)
      t[n] = r2[n] & 255;
    return t;
  }
  function Mp(r2) {
    if (Ot(r2, Uint8Array)) {
      let e = new Uint8Array(r2);
      return is(e.buffer, e.byteOffset, e.byteLength);
    }
    return ns(r2);
  }
  function is(r2, e, t) {
    if (e < 0 || r2.byteLength < e)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (r2.byteLength < e + (t || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let n;
    return e === void 0 && t === void 0 ? n = new Uint8Array(r2) : t === void 0 ? n = new Uint8Array(r2, e) : n = new Uint8Array(r2, e, t), Object.setPrototypeOf(n, B.prototype), n;
  }
  function Ap(r2) {
    if (B.isBuffer(r2)) {
      let e = as(r2.length) | 0, t = Rt(e);
      return t.length === 0 || r2.copy(t, 0, 0, e), t;
    }
    if (r2.length !== void 0)
      return typeof r2.length != "number" || ls(r2.length) ? Rt(0) : ns(r2);
    if (r2.type === "Buffer" && Array.isArray(r2.data))
      return ns(r2.data);
  }
  function as(r2) {
    if (r2 >= _i)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + _i.toString(16) + " bytes");
    return r2 | 0;
  }
  function _p(r2) {
    return +r2 != r2 && (r2 = 0), B.alloc(+r2);
  }
  B.isBuffer = function(e) {
    return e != null && e._isBuffer === true && e !== B.prototype;
  };
  B.compare = function(e, t) {
    if (Ot(e, Uint8Array) && (e = B.from(e, e.offset, e.byteLength)), Ot(t, Uint8Array) && (t = B.from(t, t.offset, t.byteLength)), !B.isBuffer(e) || !B.isBuffer(t))
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (e === t)
      return 0;
    let n = e.length, i = t.length;
    for (let l = 0, h = Math.min(n, i); l < h; ++l)
      if (e[l] !== t[l]) {
        n = e[l], i = t[l];
        break;
      }
    return n < i ? -1 : i < n ? 1 : 0;
  };
  B.isEncoding = function(e) {
    switch (String(e).toLowerCase()) {
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
  B.concat = function(e, t) {
    if (!Array.isArray(e))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (e.length === 0)
      return B.alloc(0);
    let n;
    if (t === void 0)
      for (t = 0, n = 0; n < e.length; ++n)
        t += e[n].length;
    let i = B.allocUnsafe(t), l = 0;
    for (n = 0; n < e.length; ++n) {
      let h = e[n];
      if (Ot(h, Uint8Array))
        l + h.length > i.length ? (B.isBuffer(h) || (h = B.from(h)), h.copy(i, l)) : Uint8Array.prototype.set.call(i, h, l);
      else if (B.isBuffer(h))
        h.copy(i, l);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      l += h.length;
    }
    return i;
  };
  function Ll(r2, e) {
    if (B.isBuffer(r2))
      return r2.length;
    if (ArrayBuffer.isView(r2) || Ot(r2, ArrayBuffer))
      return r2.byteLength;
    if (typeof r2 != "string")
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r2);
    let t = r2.length, n = arguments.length > 2 && arguments[2] === true;
    if (!n && t === 0)
      return 0;
    let i = false;
    for (; ; )
      switch (e) {
        case "ascii":
        case "latin1":
        case "binary":
          return t;
        case "utf8":
        case "utf-8":
          return os(r2).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return t * 2;
        case "hex":
          return t >>> 1;
        case "base64":
          return Gl(r2).length;
        default:
          if (i)
            return n ? -1 : os(r2).length;
          e = ("" + e).toLowerCase(), i = true;
      }
  }
  B.byteLength = Ll;
  function Ep(r2, e, t) {
    let n = false;
    if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, e >>>= 0, t <= e))
      return "";
    for (r2 || (r2 = "utf8"); ; )
      switch (r2) {
        case "hex":
          return Bp(this, e, t);
        case "utf8":
        case "utf-8":
          return ql(this, e, t);
        case "ascii":
          return kp(this, e, t);
        case "latin1":
        case "binary":
          return Up(this, e, t);
        case "base64":
          return Cp(this, e, t);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Rp(this, e, t);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + r2);
          r2 = (r2 + "").toLowerCase(), n = true;
      }
  }
  B.prototype._isBuffer = true;
  function Ar(r2, e, t) {
    let n = r2[e];
    r2[e] = r2[t], r2[t] = n;
  }
  B.prototype.swap16 = function() {
    let e = this.length;
    if (e % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let t = 0; t < e; t += 2)
      Ar(this, t, t + 1);
    return this;
  };
  B.prototype.swap32 = function() {
    let e = this.length;
    if (e % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t = 0; t < e; t += 4)
      Ar(this, t, t + 3), Ar(this, t + 1, t + 2);
    return this;
  };
  B.prototype.swap64 = function() {
    let e = this.length;
    if (e % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let t = 0; t < e; t += 8)
      Ar(this, t, t + 7), Ar(this, t + 1, t + 6), Ar(this, t + 2, t + 5), Ar(this, t + 3, t + 4);
    return this;
  };
  B.prototype.toString = function() {
    let e = this.length;
    return e === 0 ? "" : arguments.length === 0 ? ql(this, 0, e) : Ep.apply(this, arguments);
  };
  B.prototype.toLocaleString = B.prototype.toString;
  B.prototype.equals = function(e) {
    if (!B.isBuffer(e))
      throw new TypeError("Argument must be a Buffer");
    return this === e ? true : B.compare(this, e) === 0;
  };
  B.prototype.inspect = function() {
    let e = "", t = Xr.INSPECT_MAX_BYTES;
    return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">";
  };
  kl && (B.prototype[kl] = B.prototype.inspect);
  B.prototype.compare = function(e, t, n, i, l) {
    if (Ot(e, Uint8Array) && (e = B.from(e, e.offset, e.byteLength)), !B.isBuffer(e))
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
    if (t === void 0 && (t = 0), n === void 0 && (n = e ? e.length : 0), i === void 0 && (i = 0), l === void 0 && (l = this.length), t < 0 || n > e.length || i < 0 || l > this.length)
      throw new RangeError("out of range index");
    if (i >= l && t >= n)
      return 0;
    if (i >= l)
      return -1;
    if (t >= n)
      return 1;
    if (t >>>= 0, n >>>= 0, i >>>= 0, l >>>= 0, this === e)
      return 0;
    let h = l - i, g = n - t, v = Math.min(h, g), b = this.slice(i, l), x = e.slice(t, n);
    for (let A = 0; A < v; ++A)
      if (b[A] !== x[A]) {
        h = b[A], g = x[A];
        break;
      }
    return h < g ? -1 : g < h ? 1 : 0;
  };
  function Wl(r2, e, t, n, i) {
    if (r2.length === 0)
      return -1;
    if (typeof t == "string" ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, ls(t) && (t = i ? 0 : r2.length - 1), t < 0 && (t = r2.length + t), t >= r2.length) {
      if (i)
        return -1;
      t = r2.length - 1;
    } else if (t < 0)
      if (i)
        t = 0;
      else
        return -1;
    if (typeof e == "string" && (e = B.from(e, n)), B.isBuffer(e))
      return e.length === 0 ? -1 : Ul(r2, e, t, n, i);
    if (typeof e == "number")
      return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(r2, e, t) : Uint8Array.prototype.lastIndexOf.call(r2, e, t) : Ul(r2, [e], t, n, i);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Ul(r2, e, t, n, i) {
    let l = 1, h = r2.length, g = e.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (r2.length < 2 || e.length < 2)
        return -1;
      l = 2, h /= 2, g /= 2, t /= 2;
    }
    function v(x, A) {
      return l === 1 ? x[A] : x.readUInt16BE(A * l);
    }
    let b;
    if (i) {
      let x = -1;
      for (b = t; b < h; b++)
        if (v(r2, b) === v(e, x === -1 ? 0 : b - x)) {
          if (x === -1 && (x = b), b - x + 1 === g)
            return x * l;
        } else
          x !== -1 && (b -= b - x), x = -1;
    } else
      for (t + g > h && (t = h - g), b = t; b >= 0; b--) {
        let x = true;
        for (let A = 0; A < g; A++)
          if (v(r2, b + A) !== v(e, A)) {
            x = false;
            break;
          }
        if (x)
          return b;
      }
    return -1;
  }
  B.prototype.includes = function(e, t, n) {
    return this.indexOf(e, t, n) !== -1;
  };
  B.prototype.indexOf = function(e, t, n) {
    return Wl(this, e, t, n, true);
  };
  B.prototype.lastIndexOf = function(e, t, n) {
    return Wl(this, e, t, n, false);
  };
  function Sp(r2, e, t, n) {
    t = Number(t) || 0;
    let i = r2.length - t;
    n ? (n = Number(n), n > i && (n = i)) : n = i;
    let l = e.length;
    n > l / 2 && (n = l / 2);
    let h;
    for (h = 0; h < n; ++h) {
      let g = parseInt(e.substr(h * 2, 2), 16);
      if (ls(g))
        return h;
      r2[t + h] = g;
    }
    return h;
  }
  function Tp(r2, e, t, n) {
    return Ei(os(e, r2.length - t), r2, t, n);
  }
  function Ip(r2, e, t, n) {
    return Ei(Wp(e), r2, t, n);
  }
  function Op(r2, e, t, n) {
    return Ei(Gl(e), r2, t, n);
  }
  function Pp(r2, e, t, n) {
    return Ei(qp(e, r2.length - t), r2, t, n);
  }
  B.prototype.write = function(e, t, n, i) {
    if (t === void 0)
      i = "utf8", n = this.length, t = 0;
    else if (n === void 0 && typeof t == "string")
      i = t, n = this.length, t = 0;
    else if (isFinite(t))
      t = t >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
    else
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let l = this.length - t;
    if ((n === void 0 || n > l) && (n = l), e.length > 0 && (n < 0 || t < 0) || t > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    i || (i = "utf8");
    let h = false;
    for (; ; )
      switch (i) {
        case "hex":
          return Sp(this, e, t, n);
        case "utf8":
        case "utf-8":
          return Tp(this, e, t, n);
        case "ascii":
        case "latin1":
        case "binary":
          return Ip(this, e, t, n);
        case "base64":
          return Op(this, e, t, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Pp(this, e, t, n);
        default:
          if (h)
            throw new TypeError("Unknown encoding: " + i);
          i = ("" + i).toLowerCase(), h = true;
      }
  };
  B.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function Cp(r2, e, t) {
    return e === 0 && t === r2.length ? rs.fromByteArray(r2) : rs.fromByteArray(r2.slice(e, t));
  }
  function ql(r2, e, t) {
    t = Math.min(r2.length, t);
    let n = [], i = e;
    for (; i < t; ) {
      let l = r2[i], h = null, g = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
      if (i + g <= t) {
        let v, b, x, A;
        switch (g) {
          case 1:
            l < 128 && (h = l);
            break;
          case 2:
            v = r2[i + 1], (v & 192) === 128 && (A = (l & 31) << 6 | v & 63, A > 127 && (h = A));
            break;
          case 3:
            v = r2[i + 1], b = r2[i + 2], (v & 192) === 128 && (b & 192) === 128 && (A = (l & 15) << 12 | (v & 63) << 6 | b & 63, A > 2047 && (A < 55296 || A > 57343) && (h = A));
            break;
          case 4:
            v = r2[i + 1], b = r2[i + 2], x = r2[i + 3], (v & 192) === 128 && (b & 192) === 128 && (x & 192) === 128 && (A = (l & 15) << 18 | (v & 63) << 12 | (b & 63) << 6 | x & 63, A > 65535 && A < 1114112 && (h = A));
        }
      }
      h === null ? (h = 65533, g = 1) : h > 65535 && (h -= 65536, n.push(h >>> 10 & 1023 | 55296), h = 56320 | h & 1023), n.push(h), i += g;
    }
    return Np(n);
  }
  var Bl = 4096;
  function Np(r2) {
    let e = r2.length;
    if (e <= Bl)
      return String.fromCharCode.apply(String, r2);
    let t = "", n = 0;
    for (; n < e; )
      t += String.fromCharCode.apply(String, r2.slice(n, n += Bl));
    return t;
  }
  function kp(r2, e, t) {
    let n = "";
    t = Math.min(r2.length, t);
    for (let i = e; i < t; ++i)
      n += String.fromCharCode(r2[i] & 127);
    return n;
  }
  function Up(r2, e, t) {
    let n = "";
    t = Math.min(r2.length, t);
    for (let i = e; i < t; ++i)
      n += String.fromCharCode(r2[i]);
    return n;
  }
  function Bp(r2, e, t) {
    let n = r2.length;
    (!e || e < 0) && (e = 0), (!t || t < 0 || t > n) && (t = n);
    let i = "";
    for (let l = e; l < t; ++l)
      i += zp[r2[l]];
    return i;
  }
  function Rp(r2, e, t) {
    let n = r2.slice(e, t), i = "";
    for (let l = 0; l < n.length - 1; l += 2)
      i += String.fromCharCode(n[l] + n[l + 1] * 256);
    return i;
  }
  B.prototype.slice = function(e, t) {
    let n = this.length;
    e = ~~e, t = t === void 0 ? n : ~~t, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < e && (t = e);
    let i = this.subarray(e, t);
    return Object.setPrototypeOf(i, B.prototype), i;
  };
  function ot(r2, e, t) {
    if (r2 % 1 !== 0 || r2 < 0)
      throw new RangeError("offset is not uint");
    if (r2 + e > t)
      throw new RangeError("Trying to access beyond buffer length");
  }
  B.prototype.readUintLE = B.prototype.readUIntLE = function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || ot(e, t, this.length);
    let i = this[e], l = 1, h = 0;
    for (; ++h < t && (l *= 256); )
      i += this[e + h] * l;
    return i;
  };
  B.prototype.readUintBE = B.prototype.readUIntBE = function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || ot(e, t, this.length);
    let i = this[e + --t], l = 1;
    for (; t > 0 && (l *= 256); )
      i += this[e + --t] * l;
    return i;
  };
  B.prototype.readUint8 = B.prototype.readUInt8 = function(e, t) {
    return e = e >>> 0, t || ot(e, 1, this.length), this[e];
  };
  B.prototype.readUint16LE = B.prototype.readUInt16LE = function(e, t) {
    return e = e >>> 0, t || ot(e, 2, this.length), this[e] | this[e + 1] << 8;
  };
  B.prototype.readUint16BE = B.prototype.readUInt16BE = function(e, t) {
    return e = e >>> 0, t || ot(e, 2, this.length), this[e] << 8 | this[e + 1];
  };
  B.prototype.readUint32LE = B.prototype.readUInt32LE = function(e, t) {
    return e = e >>> 0, t || ot(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
  };
  B.prototype.readUint32BE = B.prototype.readUInt32BE = function(e, t) {
    return e = e >>> 0, t || ot(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
  };
  B.prototype.readBigUInt64LE = Vt(function(e) {
    e = e >>> 0, Qr(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && Tn(e, this.length - 8);
    let i = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, l = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
    return BigInt(i) + (BigInt(l) << BigInt(32));
  });
  B.prototype.readBigUInt64BE = Vt(function(e) {
    e = e >>> 0, Qr(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && Tn(e, this.length - 8);
    let i = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], l = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
    return (BigInt(i) << BigInt(32)) + BigInt(l);
  });
  B.prototype.readIntLE = function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || ot(e, t, this.length);
    let i = this[e], l = 1, h = 0;
    for (; ++h < t && (l *= 256); )
      i += this[e + h] * l;
    return l *= 128, i >= l && (i -= Math.pow(2, 8 * t)), i;
  };
  B.prototype.readIntBE = function(e, t, n) {
    e = e >>> 0, t = t >>> 0, n || ot(e, t, this.length);
    let i = t, l = 1, h = this[e + --i];
    for (; i > 0 && (l *= 256); )
      h += this[e + --i] * l;
    return l *= 128, h >= l && (h -= Math.pow(2, 8 * t)), h;
  };
  B.prototype.readInt8 = function(e, t) {
    return e = e >>> 0, t || ot(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
  };
  B.prototype.readInt16LE = function(e, t) {
    e = e >>> 0, t || ot(e, 2, this.length);
    let n = this[e] | this[e + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  };
  B.prototype.readInt16BE = function(e, t) {
    e = e >>> 0, t || ot(e, 2, this.length);
    let n = this[e + 1] | this[e] << 8;
    return n & 32768 ? n | 4294901760 : n;
  };
  B.prototype.readInt32LE = function(e, t) {
    return e = e >>> 0, t || ot(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
  };
  B.prototype.readInt32BE = function(e, t) {
    return e = e >>> 0, t || ot(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
  };
  B.prototype.readBigInt64LE = Vt(function(e) {
    e = e >>> 0, Qr(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && Tn(e, this.length - 8);
    let i = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
    return (BigInt(i) << BigInt(32)) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
  });
  B.prototype.readBigInt64BE = Vt(function(e) {
    e = e >>> 0, Qr(e, "offset");
    let t = this[e], n = this[e + 7];
    (t === void 0 || n === void 0) && Tn(e, this.length - 8);
    let i = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
    return (BigInt(i) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n);
  });
  B.prototype.readFloatLE = function(e, t) {
    return e = e >>> 0, t || ot(e, 4, this.length), Zr.read(this, e, true, 23, 4);
  };
  B.prototype.readFloatBE = function(e, t) {
    return e = e >>> 0, t || ot(e, 4, this.length), Zr.read(this, e, false, 23, 4);
  };
  B.prototype.readDoubleLE = function(e, t) {
    return e = e >>> 0, t || ot(e, 8, this.length), Zr.read(this, e, true, 52, 8);
  };
  B.prototype.readDoubleBE = function(e, t) {
    return e = e >>> 0, t || ot(e, 8, this.length), Zr.read(this, e, false, 52, 8);
  };
  function ht(r2, e, t, n, i, l) {
    if (!B.isBuffer(r2))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > i || e < l)
      throw new RangeError('"value" argument is out of bounds');
    if (t + n > r2.length)
      throw new RangeError("Index out of range");
  }
  B.prototype.writeUintLE = B.prototype.writeUIntLE = function(e, t, n, i) {
    if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
      let g = Math.pow(2, 8 * n) - 1;
      ht(this, e, t, n, g, 0);
    }
    let l = 1, h = 0;
    for (this[t] = e & 255; ++h < n && (l *= 256); )
      this[t + h] = e / l & 255;
    return t + n;
  };
  B.prototype.writeUintBE = B.prototype.writeUIntBE = function(e, t, n, i) {
    if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
      let g = Math.pow(2, 8 * n) - 1;
      ht(this, e, t, n, g, 0);
    }
    let l = n - 1, h = 1;
    for (this[t + l] = e & 255; --l >= 0 && (h *= 256); )
      this[t + l] = e / h & 255;
    return t + n;
  };
  B.prototype.writeUint8 = B.prototype.writeUInt8 = function(e, t, n) {
    return e = +e, t = t >>> 0, n || ht(this, e, t, 1, 255, 0), this[t] = e & 255, t + 1;
  };
  B.prototype.writeUint16LE = B.prototype.writeUInt16LE = function(e, t, n) {
    return e = +e, t = t >>> 0, n || ht(this, e, t, 2, 65535, 0), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
  };
  B.prototype.writeUint16BE = B.prototype.writeUInt16BE = function(e, t, n) {
    return e = +e, t = t >>> 0, n || ht(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
  };
  B.prototype.writeUint32LE = B.prototype.writeUInt32LE = function(e, t, n) {
    return e = +e, t = t >>> 0, n || ht(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e & 255, t + 4;
  };
  B.prototype.writeUint32BE = B.prototype.writeUInt32BE = function(e, t, n) {
    return e = +e, t = t >>> 0, n || ht(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
  };
  function zl(r2, e, t, n, i) {
    Kl(e, n, i, r2, t, 7);
    let l = Number(e & BigInt(4294967295));
    r2[t++] = l, l = l >> 8, r2[t++] = l, l = l >> 8, r2[t++] = l, l = l >> 8, r2[t++] = l;
    let h = Number(e >> BigInt(32) & BigInt(4294967295));
    return r2[t++] = h, h = h >> 8, r2[t++] = h, h = h >> 8, r2[t++] = h, h = h >> 8, r2[t++] = h, t;
  }
  function jl(r2, e, t, n, i) {
    Kl(e, n, i, r2, t, 7);
    let l = Number(e & BigInt(4294967295));
    r2[t + 7] = l, l = l >> 8, r2[t + 6] = l, l = l >> 8, r2[t + 5] = l, l = l >> 8, r2[t + 4] = l;
    let h = Number(e >> BigInt(32) & BigInt(4294967295));
    return r2[t + 3] = h, h = h >> 8, r2[t + 2] = h, h = h >> 8, r2[t + 1] = h, h = h >> 8, r2[t] = h, t + 8;
  }
  B.prototype.writeBigUInt64LE = Vt(function(e, t = 0) {
    return zl(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  B.prototype.writeBigUInt64BE = Vt(function(e, t = 0) {
    return jl(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  B.prototype.writeIntLE = function(e, t, n, i) {
    if (e = +e, t = t >>> 0, !i) {
      let v = Math.pow(2, 8 * n - 1);
      ht(this, e, t, n, v - 1, -v);
    }
    let l = 0, h = 1, g = 0;
    for (this[t] = e & 255; ++l < n && (h *= 256); )
      e < 0 && g === 0 && this[t + l - 1] !== 0 && (g = 1), this[t + l] = (e / h >> 0) - g & 255;
    return t + n;
  };
  B.prototype.writeIntBE = function(e, t, n, i) {
    if (e = +e, t = t >>> 0, !i) {
      let v = Math.pow(2, 8 * n - 1);
      ht(this, e, t, n, v - 1, -v);
    }
    let l = n - 1, h = 1, g = 0;
    for (this[t + l] = e & 255; --l >= 0 && (h *= 256); )
      e < 0 && g === 0 && this[t + l + 1] !== 0 && (g = 1), this[t + l] = (e / h >> 0) - g & 255;
    return t + n;
  };
  B.prototype.writeInt8 = function(e, t, n) {
    return e = +e, t = t >>> 0, n || ht(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = e & 255, t + 1;
  };
  B.prototype.writeInt16LE = function(e, t, n) {
    return e = +e, t = t >>> 0, n || ht(this, e, t, 2, 32767, -32768), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
  };
  B.prototype.writeInt16BE = function(e, t, n) {
    return e = +e, t = t >>> 0, n || ht(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
  };
  B.prototype.writeInt32LE = function(e, t, n) {
    return e = +e, t = t >>> 0, n || ht(this, e, t, 4, 2147483647, -2147483648), this[t] = e & 255, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
  };
  B.prototype.writeInt32BE = function(e, t, n) {
    return e = +e, t = t >>> 0, n || ht(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
  };
  B.prototype.writeBigInt64LE = Vt(function(e, t = 0) {
    return zl(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  B.prototype.writeBigInt64BE = Vt(function(e, t = 0) {
    return jl(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function $l(r2, e, t, n, i, l) {
    if (t + n > r2.length)
      throw new RangeError("Index out of range");
    if (t < 0)
      throw new RangeError("Index out of range");
  }
  function Vl(r2, e, t, n, i) {
    return e = +e, t = t >>> 0, i || $l(r2, e, t, 4), Zr.write(r2, e, t, n, 23, 4), t + 4;
  }
  B.prototype.writeFloatLE = function(e, t, n) {
    return Vl(this, e, t, true, n);
  };
  B.prototype.writeFloatBE = function(e, t, n) {
    return Vl(this, e, t, false, n);
  };
  function Yl(r2, e, t, n, i) {
    return e = +e, t = t >>> 0, i || $l(r2, e, t, 8), Zr.write(r2, e, t, n, 52, 8), t + 8;
  }
  B.prototype.writeDoubleLE = function(e, t, n) {
    return Yl(this, e, t, true, n);
  };
  B.prototype.writeDoubleBE = function(e, t, n) {
    return Yl(this, e, t, false, n);
  };
  B.prototype.copy = function(e, t, n, i) {
    if (!B.isBuffer(e))
      throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !i && i !== 0 && (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < n && (i = n), i === n || e.length === 0 || this.length === 0)
      return 0;
    if (t < 0)
      throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length)
      throw new RangeError("Index out of range");
    if (i < 0)
      throw new RangeError("sourceEnd out of bounds");
    i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
    let l = i - n;
    return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, i) : Uint8Array.prototype.set.call(e, this.subarray(n, i), t), l;
  };
  B.prototype.fill = function(e, t, n, i) {
    if (typeof e == "string") {
      if (typeof t == "string" ? (i = t, t = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string")
        throw new TypeError("encoding must be a string");
      if (typeof i == "string" && !B.isEncoding(i))
        throw new TypeError("Unknown encoding: " + i);
      if (e.length === 1) {
        let h = e.charCodeAt(0);
        (i === "utf8" && h < 128 || i === "latin1") && (e = h);
      }
    } else
      typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
    if (t < 0 || this.length < t || this.length < n)
      throw new RangeError("Out of range index");
    if (n <= t)
      return this;
    t = t >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
    let l;
    if (typeof e == "number")
      for (l = t; l < n; ++l)
        this[l] = e;
    else {
      let h = B.isBuffer(e) ? e : B.from(e, i), g = h.length;
      if (g === 0)
        throw new TypeError('The value "' + e + '" is invalid for argument "value"');
      for (l = 0; l < n - t; ++l)
        this[l + t] = h[l % g];
    }
    return this;
  };
  var Jr = {};
  function fs(r2, e, t) {
    Jr[r2] = class extends t {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: e.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${r2}]`, this.stack, delete this.name;
      }
      get code() {
        return r2;
      }
      set code(i) {
        Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: i, writable: true });
      }
      toString() {
        return `${this.name} [${r2}]: ${this.message}`;
      }
    };
  }
  fs("ERR_BUFFER_OUT_OF_BOUNDS", function(r2) {
    return r2 ? `${r2} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  fs("ERR_INVALID_ARG_TYPE", function(r2, e) {
    return `The "${r2}" argument must be of type number. Received type ${typeof e}`;
  }, TypeError);
  fs("ERR_OUT_OF_RANGE", function(r2, e, t) {
    let n = `The value of "${r2}" is out of range.`, i = t;
    return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? i = Rl(String(t)) : typeof t == "bigint" && (i = String(t), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (i = Rl(i)), i += "n"), n += ` It must be ${e}. Received ${i}`, n;
  }, RangeError);
  function Rl(r2) {
    let e = "", t = r2.length, n = r2[0] === "-" ? 1 : 0;
    for (; t >= n + 4; t -= 3)
      e = `_${r2.slice(t - 3, t)}${e}`;
    return `${r2.slice(0, t)}${e}`;
  }
  function Fp(r2, e, t) {
    Qr(e, "offset"), (r2[e] === void 0 || r2[e + t] === void 0) && Tn(e, r2.length - (t + 1));
  }
  function Kl(r2, e, t, n, i, l) {
    if (r2 > t || r2 < e) {
      let h = typeof e == "bigint" ? "n" : "", g;
      throw l > 3 ? e === 0 || e === BigInt(0) ? g = `>= 0${h} and < 2${h} ** ${(l + 1) * 8}${h}` : g = `>= -(2${h} ** ${(l + 1) * 8 - 1}${h}) and < 2 ** ${(l + 1) * 8 - 1}${h}` : g = `>= ${e}${h} and <= ${t}${h}`, new Jr.ERR_OUT_OF_RANGE("value", g, r2);
    }
    Fp(n, i, l);
  }
  function Qr(r2, e) {
    if (typeof r2 != "number")
      throw new Jr.ERR_INVALID_ARG_TYPE(e, "number", r2);
  }
  function Tn(r2, e, t) {
    throw Math.floor(r2) !== r2 ? (Qr(r2, t), new Jr.ERR_OUT_OF_RANGE(t || "offset", "an integer", r2)) : e < 0 ? new Jr.ERR_BUFFER_OUT_OF_BOUNDS() : new Jr.ERR_OUT_OF_RANGE(t || "offset", `>= ${t ? 1 : 0} and <= ${e}`, r2);
  }
  var Dp = /[^+/0-9A-Za-z-_]/g;
  function Lp(r2) {
    if (r2 = r2.split("=")[0], r2 = r2.trim().replace(Dp, ""), r2.length < 2)
      return "";
    for (; r2.length % 4 !== 0; )
      r2 = r2 + "=";
    return r2;
  }
  function os(r2, e) {
    e = e || 1 / 0;
    let t, n = r2.length, i = null, l = [];
    for (let h = 0; h < n; ++h) {
      if (t = r2.charCodeAt(h), t > 55295 && t < 57344) {
        if (!i) {
          if (t > 56319) {
            (e -= 3) > -1 && l.push(239, 191, 189);
            continue;
          } else if (h + 1 === n) {
            (e -= 3) > -1 && l.push(239, 191, 189);
            continue;
          }
          i = t;
          continue;
        }
        if (t < 56320) {
          (e -= 3) > -1 && l.push(239, 191, 189), i = t;
          continue;
        }
        t = (i - 55296 << 10 | t - 56320) + 65536;
      } else
        i && (e -= 3) > -1 && l.push(239, 191, 189);
      if (i = null, t < 128) {
        if ((e -= 1) < 0)
          break;
        l.push(t);
      } else if (t < 2048) {
        if ((e -= 2) < 0)
          break;
        l.push(t >> 6 | 192, t & 63 | 128);
      } else if (t < 65536) {
        if ((e -= 3) < 0)
          break;
        l.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
      } else if (t < 1114112) {
        if ((e -= 4) < 0)
          break;
        l.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
      } else
        throw new Error("Invalid code point");
    }
    return l;
  }
  function Wp(r2) {
    let e = [];
    for (let t = 0; t < r2.length; ++t)
      e.push(r2.charCodeAt(t) & 255);
    return e;
  }
  function qp(r2, e) {
    let t, n, i, l = [];
    for (let h = 0; h < r2.length && !((e -= 2) < 0); ++h)
      t = r2.charCodeAt(h), n = t >> 8, i = t % 256, l.push(i), l.push(n);
    return l;
  }
  function Gl(r2) {
    return rs.toByteArray(Lp(r2));
  }
  function Ei(r2, e, t, n) {
    let i;
    for (i = 0; i < n && !(i + t >= e.length || i >= r2.length); ++i)
      e[i + t] = r2[i];
    return i;
  }
  function Ot(r2, e) {
    return r2 instanceof e || r2 != null && r2.constructor != null && r2.constructor.name != null && r2.constructor.name === e.name;
  }
  function ls(r2) {
    return r2 !== r2;
  }
  var zp = function() {
    let r2 = "0123456789abcdef", e = new Array(256);
    for (let t = 0; t < 16; ++t) {
      let n = t * 16;
      for (let i = 0; i < 16; ++i)
        e[n + i] = r2[t] + r2[i];
    }
    return e;
  }();
  function Vt(r2) {
    return typeof BigInt == "undefined" ? jp : r2;
  }
  function jp() {
    throw new Error("BigInt not supported");
  }
});
var Ql = ye((us, Zl) => {
  var Si = Hl(), Pt = Si.Buffer;
  function Jl(r2, e) {
    for (var t in r2)
      e[t] = r2[t];
  }
  Pt.from && Pt.alloc && Pt.allocUnsafe && Pt.allocUnsafeSlow ? Zl.exports = Si : (Jl(Si, us), us.Buffer = _r);
  function _r(r2, e, t) {
    return Pt(r2, e, t);
  }
  _r.prototype = Object.create(Pt.prototype);
  Jl(Pt, _r);
  _r.from = function(r2, e, t) {
    if (typeof r2 == "number")
      throw new TypeError("Argument must not be a number");
    return Pt(r2, e, t);
  };
  _r.alloc = function(r2, e, t) {
    if (typeof r2 != "number")
      throw new TypeError("Argument must be a number");
    var n = Pt(r2);
    return e !== void 0 ? typeof t == "string" ? n.fill(e, t) : n.fill(e) : n.fill(0), n;
  };
  _r.allocUnsafe = function(r2) {
    if (typeof r2 != "number")
      throw new TypeError("Argument must be a number");
    return Pt(r2);
  };
  _r.allocUnsafeSlow = function(r2) {
    if (typeof r2 != "number")
      throw new TypeError("Argument must be a number");
    return Si.SlowBuffer(r2);
  };
});
var eu = ye((Yw, Xl) => {
  var Ti = Ql().Buffer;
  function $p(r2) {
    if (r2.length >= 255)
      throw new TypeError("Alphabet too long");
    for (var e = new Uint8Array(256), t = 0; t < e.length; t++)
      e[t] = 255;
    for (var n = 0; n < r2.length; n++) {
      var i = r2.charAt(n), l = i.charCodeAt(0);
      if (e[l] !== 255)
        throw new TypeError(i + " is ambiguous");
      e[l] = n;
    }
    var h = r2.length, g = r2.charAt(0), v = Math.log(h) / Math.log(256), b = Math.log(256) / Math.log(h);
    function x(k) {
      if ((Array.isArray(k) || k instanceof Uint8Array) && (k = Ti.from(k)), !Ti.isBuffer(k))
        throw new TypeError("Expected Buffer");
      if (k.length === 0)
        return "";
      for (var N = 0, q = 0, C = 0, J = k.length; C !== J && k[C] === 0; )
        C++, N++;
      for (var K = (J - C) * b + 1 >>> 0, T = new Uint8Array(K); C !== J; ) {
        for (var I = k[C], L = 0, W = K - 1; (I !== 0 || L < q) && W !== -1; W--, L++)
          I += 256 * T[W] >>> 0, T[W] = I % h >>> 0, I = I / h >>> 0;
        if (I !== 0)
          throw new Error("Non-zero carry");
        q = L, C++;
      }
      for (var V = K - q; V !== K && T[V] === 0; )
        V++;
      for (var fe = g.repeat(N); V < K; ++V)
        fe += r2.charAt(T[V]);
      return fe;
    }
    function A(k) {
      if (typeof k != "string")
        throw new TypeError("Expected String");
      if (k.length === 0)
        return Ti.alloc(0);
      for (var N = 0, q = 0, C = 0; k[N] === g; )
        q++, N++;
      for (var J = (k.length - N) * v + 1 >>> 0, K = new Uint8Array(J); N < k.length; ) {
        var T = e[k.charCodeAt(N)];
        if (T === 255)
          return;
        for (var I = 0, L = J - 1; (T !== 0 || I < C) && L !== -1; L--, I++)
          T += h * K[L] >>> 0, K[L] = T % 256 >>> 0, T = T / 256 >>> 0;
        if (T !== 0)
          throw new Error("Non-zero carry");
        C = I, N++;
      }
      for (var W = J - C; W !== J && K[W] === 0; )
        W++;
      var V = Ti.allocUnsafe(q + (J - W));
      V.fill(0, 0, q);
      for (var fe = q; W !== J; )
        V[fe++] = K[W++];
      return V;
    }
    function O(k) {
      var N = A(k);
      if (N)
        return N;
      throw new Error("Non-base" + h + " character");
    }
    return { encode: x, decodeUnsafe: A, decode: O };
  }
  Xl.exports = $p;
});
var ru = ye((Kw, tu) => {
  var Vp = eu(), Yp = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  tu.exports = Vp(Yp);
});
var nu = ye((ps) => {
  function Ft(r2, e, t) {
    return e <= r2 && r2 <= t;
  }
  function Ni(r2) {
    if (r2 === void 0)
      return {};
    if (r2 === Object(r2))
      return r2;
    throw TypeError("Could not convert argument to dictionary");
  }
  function Kp(r2) {
    for (var e = String(r2), t = e.length, n = 0, i = []; n < t; ) {
      var l = e.charCodeAt(n);
      if (l < 55296 || l > 57343)
        i.push(l);
      else if (56320 <= l && l <= 57343)
        i.push(65533);
      else if (55296 <= l && l <= 56319)
        if (n === t - 1)
          i.push(65533);
        else {
          var h = r2.charCodeAt(n + 1);
          if (56320 <= h && h <= 57343) {
            var g = l & 1023, v = h & 1023;
            i.push(65536 + (g << 10) + v), n += 1;
          } else
            i.push(65533);
        }
      n += 1;
    }
    return i;
  }
  function Gp(r2) {
    for (var e = "", t = 0; t < r2.length; ++t) {
      var n = r2[t];
      n <= 65535 ? e += String.fromCharCode(n) : (n -= 65536, e += String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320));
    }
    return e;
  }
  var Ii = -1;
  function hs(r2) {
    this.tokens = [].slice.call(r2);
  }
  hs.prototype = { endOfStream: function() {
    return !this.tokens.length;
  }, read: function() {
    return this.tokens.length ? this.tokens.shift() : Ii;
  }, prepend: function(r2) {
    if (Array.isArray(r2))
      for (var e = r2; e.length; )
        this.tokens.unshift(e.pop());
    else
      this.tokens.unshift(r2);
  }, push: function(r2) {
    if (Array.isArray(r2))
      for (var e = r2; e.length; )
        this.tokens.push(e.shift());
    else
      this.tokens.push(r2);
  } };
  var en = -1;
  function cs(r2, e) {
    if (r2)
      throw TypeError("Decoder error");
    return e || 65533;
  }
  var Oi = "utf-8";
  function Pi(r2, e) {
    if (!(this instanceof Pi))
      return new Pi(r2, e);
    if (r2 = r2 !== void 0 ? String(r2).toLowerCase() : Oi, r2 !== Oi)
      throw new Error("Encoding not supported. Only utf-8 is supported");
    e = Ni(e), this._streaming = false, this._BOMseen = false, this._decoder = null, this._fatal = !!e.fatal, this._ignoreBOM = !!e.ignoreBOM, Object.defineProperty(this, "encoding", { value: "utf-8" }), Object.defineProperty(this, "fatal", { value: this._fatal }), Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
  }
  Pi.prototype = { decode: function(e, t) {
    var n;
    typeof e == "object" && e instanceof ArrayBuffer ? n = new Uint8Array(e) : typeof e == "object" && "buffer" in e && e.buffer instanceof ArrayBuffer ? n = new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : n = new Uint8Array(0), t = Ni(t), this._streaming || (this._decoder = new Hp({ fatal: this._fatal }), this._BOMseen = false), this._streaming = !!t.stream;
    for (var i = new hs(n), l = [], h; !i.endOfStream() && (h = this._decoder.handler(i, i.read()), h !== en); )
      h !== null && (Array.isArray(h) ? l.push.apply(l, h) : l.push(h));
    if (!this._streaming) {
      do {
        if (h = this._decoder.handler(i, i.read()), h === en)
          break;
        h !== null && (Array.isArray(h) ? l.push.apply(l, h) : l.push(h));
      } while (!i.endOfStream());
      this._decoder = null;
    }
    return l.length && ["utf-8"].indexOf(this.encoding) !== -1 && !this._ignoreBOM && !this._BOMseen && (l[0] === 65279 ? (this._BOMseen = true, l.shift()) : this._BOMseen = true), Gp(l);
  } };
  function Ci(r2, e) {
    if (!(this instanceof Ci))
      return new Ci(r2, e);
    if (r2 = r2 !== void 0 ? String(r2).toLowerCase() : Oi, r2 !== Oi)
      throw new Error("Encoding not supported. Only utf-8 is supported");
    e = Ni(e), this._streaming = false, this._encoder = null, this._options = { fatal: !!e.fatal }, Object.defineProperty(this, "encoding", { value: "utf-8" });
  }
  Ci.prototype = { encode: function(e, t) {
    e = e ? String(e) : "", t = Ni(t), this._streaming || (this._encoder = new Jp(this._options)), this._streaming = !!t.stream;
    for (var n = [], i = new hs(Kp(e)), l; !i.endOfStream() && (l = this._encoder.handler(i, i.read()), l !== en); )
      Array.isArray(l) ? n.push.apply(n, l) : n.push(l);
    if (!this._streaming) {
      for (; l = this._encoder.handler(i, i.read()), l !== en; )
        Array.isArray(l) ? n.push.apply(n, l) : n.push(l);
      this._encoder = null;
    }
    return new Uint8Array(n);
  } };
  function Hp(r2) {
    var e = r2.fatal, t = 0, n = 0, i = 0, l = 128, h = 191;
    this.handler = function(g, v) {
      if (v === Ii && i !== 0)
        return i = 0, cs(e);
      if (v === Ii)
        return en;
      if (i === 0) {
        if (Ft(v, 0, 127))
          return v;
        if (Ft(v, 194, 223))
          i = 1, t = v - 192;
        else if (Ft(v, 224, 239))
          v === 224 && (l = 160), v === 237 && (h = 159), i = 2, t = v - 224;
        else if (Ft(v, 240, 244))
          v === 240 && (l = 144), v === 244 && (h = 143), i = 3, t = v - 240;
        else
          return cs(e);
        return t = t << 6 * i, null;
      }
      if (!Ft(v, l, h))
        return t = i = n = 0, l = 128, h = 191, g.prepend(v), cs(e);
      if (l = 128, h = 191, n += 1, t += v - 128 << 6 * (i - n), n !== i)
        return null;
      var b = t;
      return t = i = n = 0, b;
    };
  }
  function Jp(r2) {
    r2.fatal;
    this.handler = function(t, n) {
      if (n === Ii)
        return en;
      if (Ft(n, 0, 127))
        return n;
      var i, l;
      Ft(n, 128, 2047) ? (i = 1, l = 192) : Ft(n, 2048, 65535) ? (i = 2, l = 224) : Ft(n, 65536, 1114111) && (i = 3, l = 240);
      for (var h = [(n >> 6 * i) + l]; i > 0; ) {
        var g = n >> 6 * (i - 1);
        h.push(128 | g & 63), i -= 1;
      }
      return h;
    };
  }
  ps.TextEncoder = Ci;
  ps.TextDecoder = Pi;
});
var fu = ye((Be) => {
  var Zp = Be && Be.__createBinding || (Object.create ? function(r2, e, t, n) {
    n === void 0 && (n = t), Object.defineProperty(r2, n, { enumerable: true, get: function() {
      return e[t];
    } });
  } : function(r2, e, t, n) {
    n === void 0 && (n = t), r2[n] = e[t];
  }), Qp = Be && Be.__setModuleDefault || (Object.create ? function(r2, e) {
    Object.defineProperty(r2, "default", { enumerable: true, value: e });
  } : function(r2, e) {
    r2.default = e;
  }), Ct = Be && Be.__decorate || function(r2, e, t, n) {
    var i = arguments.length, l = i < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, h;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      l = Reflect.decorate(r2, e, t, n);
    else
      for (var g = r2.length - 1; g >= 0; g--)
        (h = r2[g]) && (l = (i < 3 ? h(l) : i > 3 ? h(e, t, l) : h(e, t)) || l);
    return i > 3 && l && Object.defineProperty(e, t, l), l;
  }, Xp = Be && Be.__importStar || function(r2) {
    if (r2 && r2.__esModule)
      return r2;
    var e = {};
    if (r2 != null)
      for (var t in r2)
        t !== "default" && Object.hasOwnProperty.call(r2, t) && Zp(e, r2, t);
    return Qp(e, r2), e;
  }, iu = Be && Be.__importDefault || function(r2) {
    return r2 && r2.__esModule ? r2 : { default: r2 };
  };
  Object.defineProperty(Be, "__esModule", { value: true });
  Be.deserializeUnchecked = Be.deserialize = Be.serialize = Be.BinaryReader = Be.BinaryWriter = Be.BorshError = Be.baseDecode = Be.baseEncode = void 0;
  var Yt = iu(Il()), ou = iu(ru()), ed = Xp(nu()), td = typeof TextDecoder != "function" ? ed.TextDecoder : TextDecoder, rd = new td("utf-8", { fatal: true });
  function nd(r2) {
    return typeof r2 == "string" && (r2 = Buffer.from(r2, "utf8")), ou.default.encode(Buffer.from(r2));
  }
  Be.baseEncode = nd;
  function id(r2) {
    return Buffer.from(ou.default.decode(r2));
  }
  Be.baseDecode = id;
  var ds = 1024, st = class extends Error {
    constructor(e) {
      super(e), this.fieldPath = [], this.originalMessage = e;
    }
    addToFieldPath(e) {
      this.fieldPath.splice(0, 0, e), this.message = this.originalMessage + ": " + this.fieldPath.join(".");
    }
  };
  Be.BorshError = st;
  var ki = class {
    constructor() {
      this.buf = Buffer.alloc(ds), this.length = 0;
    }
    maybeResize() {
      this.buf.length < 16 + this.length && (this.buf = Buffer.concat([this.buf, Buffer.alloc(ds)]));
    }
    writeU8(e) {
      this.maybeResize(), this.buf.writeUInt8(e, this.length), this.length += 1;
    }
    writeU16(e) {
      this.maybeResize(), this.buf.writeUInt16LE(e, this.length), this.length += 2;
    }
    writeU32(e) {
      this.maybeResize(), this.buf.writeUInt32LE(e, this.length), this.length += 4;
    }
    writeU64(e) {
      this.maybeResize(), this.writeBuffer(Buffer.from(new Yt.default(e).toArray("le", 8)));
    }
    writeU128(e) {
      this.maybeResize(), this.writeBuffer(Buffer.from(new Yt.default(e).toArray("le", 16)));
    }
    writeU256(e) {
      this.maybeResize(), this.writeBuffer(Buffer.from(new Yt.default(e).toArray("le", 32)));
    }
    writeU512(e) {
      this.maybeResize(), this.writeBuffer(Buffer.from(new Yt.default(e).toArray("le", 64)));
    }
    writeBuffer(e) {
      this.buf = Buffer.concat([Buffer.from(this.buf.subarray(0, this.length)), e, Buffer.alloc(ds)]), this.length += e.length;
    }
    writeString(e) {
      this.maybeResize();
      let t = Buffer.from(e, "utf8");
      this.writeU32(t.length), this.writeBuffer(t);
    }
    writeFixedArray(e) {
      this.writeBuffer(Buffer.from(e));
    }
    writeArray(e, t) {
      this.maybeResize(), this.writeU32(e.length);
      for (let n of e)
        this.maybeResize(), t(n);
    }
    toArray() {
      return this.buf.subarray(0, this.length);
    }
  };
  Be.BinaryWriter = ki;
  function Nt(r2, e, t) {
    let n = t.value;
    t.value = function(...i) {
      try {
        return n.apply(this, i);
      } catch (l) {
        if (l instanceof RangeError) {
          let h = l.code;
          if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(h) >= 0)
            throw new st("Reached the end of buffer when deserializing");
        }
        throw l;
      }
    };
  }
  var ut = class {
    constructor(e) {
      this.buf = e, this.offset = 0;
    }
    readU8() {
      let e = this.buf.readUInt8(this.offset);
      return this.offset += 1, e;
    }
    readU16() {
      let e = this.buf.readUInt16LE(this.offset);
      return this.offset += 2, e;
    }
    readU32() {
      let e = this.buf.readUInt32LE(this.offset);
      return this.offset += 4, e;
    }
    readU64() {
      let e = this.readBuffer(8);
      return new Yt.default(e, "le");
    }
    readU128() {
      let e = this.readBuffer(16);
      return new Yt.default(e, "le");
    }
    readU256() {
      let e = this.readBuffer(32);
      return new Yt.default(e, "le");
    }
    readU512() {
      let e = this.readBuffer(64);
      return new Yt.default(e, "le");
    }
    readBuffer(e) {
      if (this.offset + e > this.buf.length)
        throw new st(`Expected buffer length ${e} isn't within bounds`);
      let t = this.buf.slice(this.offset, this.offset + e);
      return this.offset += e, t;
    }
    readString() {
      let e = this.readU32(), t = this.readBuffer(e);
      try {
        return rd.decode(t);
      } catch (n) {
        throw new st(`Error decoding UTF-8 string: ${n}`);
      }
    }
    readFixedArray(e) {
      return new Uint8Array(this.readBuffer(e));
    }
    readArray(e) {
      let t = this.readU32(), n = Array();
      for (let i = 0; i < t; ++i)
        n.push(e());
      return n;
    }
  };
  Ct([Nt], ut.prototype, "readU8", null);
  Ct([Nt], ut.prototype, "readU16", null);
  Ct([Nt], ut.prototype, "readU32", null);
  Ct([Nt], ut.prototype, "readU64", null);
  Ct([Nt], ut.prototype, "readU128", null);
  Ct([Nt], ut.prototype, "readU256", null);
  Ct([Nt], ut.prototype, "readU512", null);
  Ct([Nt], ut.prototype, "readString", null);
  Ct([Nt], ut.prototype, "readFixedArray", null);
  Ct([Nt], ut.prototype, "readArray", null);
  Be.BinaryReader = ut;
  function su(r2) {
    return r2.charAt(0).toUpperCase() + r2.slice(1);
  }
  function Er(r2, e, t, n, i) {
    try {
      if (typeof n == "string")
        i[`write${su(n)}`](t);
      else if (n instanceof Array)
        if (typeof n[0] == "number") {
          if (t.length !== n[0])
            throw new st(`Expecting byte array of length ${n[0]}, but got ${t.length} bytes`);
          i.writeFixedArray(t);
        } else if (n.length === 2 && typeof n[1] == "number") {
          if (t.length !== n[1])
            throw new st(`Expecting byte array of length ${n[1]}, but got ${t.length} bytes`);
          for (let l = 0; l < n[1]; l++)
            Er(r2, null, t[l], n[0], i);
        } else
          i.writeArray(t, (l) => {
            Er(r2, e, l, n[0], i);
          });
      else if (n.kind !== void 0)
        switch (n.kind) {
          case "option": {
            t == null ? i.writeU8(0) : (i.writeU8(1), Er(r2, e, t, n.type, i));
            break;
          }
          case "map": {
            i.writeU32(t.size), t.forEach((l, h) => {
              Er(r2, e, h, n.key, i), Er(r2, e, l, n.value, i);
            });
            break;
          }
          default:
            throw new st(`FieldType ${n} unrecognized`);
        }
      else
        au(r2, t, i);
    } catch (l) {
      throw l instanceof st && l.addToFieldPath(e), l;
    }
  }
  function au(r2, e, t) {
    if (typeof e.borshSerialize == "function") {
      e.borshSerialize(t);
      return;
    }
    let n = r2.get(e.constructor);
    if (!n)
      throw new st(`Class ${e.constructor.name} is missing in schema`);
    if (n.kind === "struct")
      n.fields.map(([i, l]) => {
        Er(r2, i, e[i], l, t);
      });
    else if (n.kind === "enum") {
      let i = e[n.field];
      for (let l = 0; l < n.values.length; ++l) {
        let [h, g] = n.values[l];
        if (h === i) {
          t.writeU8(l), Er(r2, h, e[h], g, t);
          break;
        }
      }
    } else
      throw new st(`Unexpected schema kind: ${n.kind} for ${e.constructor.name}`);
  }
  function od(r2, e, t = ki) {
    let n = new t();
    return au(r2, e, n), n.toArray();
  }
  Be.serialize = od;
  function Sr(r2, e, t, n) {
    try {
      if (typeof t == "string")
        return n[`read${su(t)}`]();
      if (t instanceof Array) {
        if (typeof t[0] == "number")
          return n.readFixedArray(t[0]);
        if (typeof t[1] == "number") {
          let i = [];
          for (let l = 0; l < t[1]; l++)
            i.push(Sr(r2, null, t[0], n));
          return i;
        } else
          return n.readArray(() => Sr(r2, e, t[0], n));
      }
      if (t.kind === "option")
        return n.readU8() ? Sr(r2, e, t.type, n) : void 0;
      if (t.kind === "map") {
        let i = /* @__PURE__ */ new Map(), l = n.readU32();
        for (let h = 0; h < l; h++) {
          let g = Sr(r2, e, t.key, n), v = Sr(r2, e, t.value, n);
          i.set(g, v);
        }
        return i;
      }
      return ms(r2, t, n);
    } catch (i) {
      throw i instanceof st && i.addToFieldPath(e), i;
    }
  }
  function ms(r2, e, t) {
    if (typeof e.borshDeserialize == "function")
      return e.borshDeserialize(t);
    let n = r2.get(e);
    if (!n)
      throw new st(`Class ${e.name} is missing in schema`);
    if (n.kind === "struct") {
      let i = {};
      for (let [l, h] of r2.get(e).fields)
        i[l] = Sr(r2, l, h, t);
      return new e(i);
    }
    if (n.kind === "enum") {
      let i = t.readU8();
      if (i >= n.values.length)
        throw new st(`Enum index: ${i} is out of range`);
      let [l, h] = n.values[i], g = Sr(r2, l, h, t);
      return new e({ [l]: g });
    }
    throw new st(`Unexpected schema kind: ${n.kind} for ${e.constructor.name}`);
  }
  function sd(r2, e, t, n = ut) {
    let i = new n(t), l = ms(r2, e, i);
    if (i.offset < t.length)
      throw new st(`Unexpected ${t.length - i.offset} bytes after deserialized data`);
    return l;
  }
  Be.deserialize = sd;
  function ad(r2, e, t, n = ut) {
    let i = new n(t);
    return ms(r2, e, i);
  }
  Be.deserializeUnchecked = ad;
});
var Ts = pr(Ss(), 1);
var Pn = Ts.default;
var Is = typeof window != "undefined";
(function() {
  if (!Is || typeof window.Telegram != "undefined" && typeof window.Telegram.WebApp != "undefined")
    return;
  var r2 = {}, e = "";
  try {
    e = location.hash.toString();
  } catch (T) {
  }
  var t = v(e), n = K("initParams");
  if (n)
    for (var i in n)
      typeof t[i] == "undefined" && (t[i] = n[i]);
  J("initParams", t);
  var l = false, h;
  try {
    if (l = window.parent != null && window != window.parent, l) {
      window.addEventListener("message", function(T) {
        if (T.source === window.parent) {
          try {
            var I = JSON.parse(T.data);
          } catch (L) {
            return;
          }
          if (!(!I || !I.eventType))
            if (I.eventType == "set_custom_style")
              T.origin === "https://web.telegram.org" && (h.innerHTML = I.eventData);
            else if (I.eventType == "reload_iframe") {
              try {
                window.parent.postMessage(JSON.stringify({ eventType: "iframe_will_reload" }), "*");
              } catch (L) {
              }
              location.reload();
            } else
              O(I.eventType, I.eventData);
        }
      }), h = document.createElement("style"), document.head.appendChild(h);
      try {
        window.parent.postMessage(JSON.stringify({ eventType: "iframe_ready", eventData: { reload_supported: true } }), "*");
      } catch (T) {
      }
    }
  } catch (T) {
  }
  function g(T) {
    try {
      return T = T.replace(/\+/g, "%20"), decodeURIComponent(T);
    } catch (I) {
      return T;
    }
  }
  function v(T) {
    T = T.replace(/^#/, "");
    var I = {};
    if (!T.length)
      return I;
    if (T.indexOf("=") < 0 && T.indexOf("?") < 0)
      return I._path = g(T), I;
    var L = T.indexOf("?");
    if (L >= 0) {
      var W = T.substr(0, L);
      I._path = g(W), T = T.substr(L + 1);
    }
    var V = b(T);
    for (var fe in V)
      I[fe] = V[fe];
    return I;
  }
  function b(T) {
    var I = {};
    if (!T.length)
      return I;
    var L = T.split("&"), W, V, fe, ee;
    for (W = 0; W < L.length; W++)
      V = L[W].split("="), fe = g(V[0]), ee = V[1] == null ? null : g(V[1]), I[fe] = ee;
    return I;
  }
  function x(T, I) {
    var L = T.indexOf("#");
    if (L < 0)
      return T + "#" + I;
    var W = T.substr(L + 1);
    return W.indexOf("=") >= 0 || W.indexOf("?") >= 0 ? T + "&" + I : W.length > 0 ? T + "?" + I : T + I;
  }
  function A(T, I, L) {
    if (I || (I = function() {
    }), L === void 0 && (L = ""), console.log("[Telegram.WebView] > postEvent", T, L), window.TelegramWebviewProxy !== void 0)
      TelegramWebviewProxy.postEvent(T, JSON.stringify(L)), I();
    else if (window.external && "notify" in window.external)
      window.external.notify(JSON.stringify({ eventType: T, eventData: L })), I();
    else if (l)
      try {
        var W = "https://web.telegram.org";
        W = "*", console.log("[Telegram.WebView] > postEvent isIframe postMessage", T, L), window.parent.postMessage(JSON.stringify({ eventType: T, eventData: L }), W), I();
      } catch (V) {
        console.error("[Telegram.WebView] > postEvent isIframe postMessage failed", V), I(V);
      }
    else
      console.log("[Telegram.WebView] > postEvent default fallback", T, L), I({ notAvailable: true });
  }
  function O(T, I) {
    console.log("[Telegram.WebView] < receiveEvent", T, I), k(T, function(L) {
      L(T, I);
    });
  }
  function k(T, I) {
    var L = r2[T];
    if (!(L === void 0 || !L.length))
      for (var W = 0; W < L.length; W++)
        try {
          I(L[W]);
        } catch (V) {
        }
  }
  function N(T, I) {
    r2[T] === void 0 && (r2[T] = []);
    var L = r2[T].indexOf(I);
    L === -1 && r2[T].push(I);
  }
  function q(T, I) {
    if (r2[T] !== void 0) {
      var L = r2[T].indexOf(I);
      L !== -1 && r2[T].splice(L, 1);
    }
  }
  function J(T, I) {
    try {
      return window.sessionStorage.setItem("__telegram__" + T, JSON.stringify(I)), true;
    } catch (L) {
    }
    return false;
  }
  function K(T) {
    try {
      return JSON.parse(window.sessionStorage.getItem("__telegram__" + T));
    } catch (I) {
    }
    return null;
  }
  window.Telegram || (window.Telegram = {}), window.Telegram.WebView = { initParams: t, isIframe: l, onEvent: N, offEvent: q, postEvent: A, receiveEvent: O, callEventCallbacks: k }, window.Telegram.Utils = { urlSafeDecode: g, urlParseQueryString: b, urlParseHashParams: v, urlAppendHashParams: x, sessionStorageSet: J, sessionStorageGet: K }, window.TelegramGameProxy_receiveEvent = O, window.TelegramGameProxy = { receiveEvent: O };
})();
(function() {
  if (!Is || typeof Telegram != "undefined" && typeof Telegram.WebApp != "undefined" && typeof Telegram.WebApp.MainButton != "undefined")
    return;
  var r2 = window.Telegram.Utils, e = window.Telegram.WebView, t = e.initParams, n = e.isIframe, i = {}, l = "", h = {}, g = {}, v = "light", b = "6.2", x = "unknown";
  if (t.tgWebAppData && t.tgWebAppData.length) {
    l = t.tgWebAppData, h = r2.urlParseQueryString(l);
    for (var A in h) {
      var O = h[A];
      try {
        (O.substr(0, 1) == "{" && O.substr(-1) == "}" || O.substr(0, 1) == "[" && O.substr(-1) == "]") && (h[A] = JSON.parse(O));
      } catch (_) {
      }
    }
  }
  if (t.tgWebAppThemeParams && t.tgWebAppThemeParams.length) {
    var k = t.tgWebAppThemeParams;
    try {
      var N = JSON.parse(k);
      N && ee(N);
    } catch (_) {
    }
  }
  var N = r2.sessionStorageGet("themeParams");
  N && ee(N), t.tgWebAppVersion && (b = t.tgWebAppVersion), t.tgWebAppPlatform && (x = t.tgWebAppPlatform);
  var C = window.innerHeight;
  function K(_) {
    C != window.innerHeight && (C = window.innerHeight, L("viewportChanged", { isStateStable: true }));
  }
  function T(_) {
    if (!(_.metaKey || _.ctrlKey)) {
      for (var E = _.target; E.tagName != "A" && E.parentNode; )
        E = E.parentNode;
      E.tagName == "A" && E.target != "_blank" && (E.protocol == "http:" || E.protocol == "https:") && E.hostname == "t.me" && (i.openTgLink(E.href), _.preventDefault());
    }
  }
  function I(_) {
    return _.toString().replace(/^\s+|\s+$/g, "");
  }
  function L(_) {
    var E = Array.prototype.slice.call(arguments);
    _ = E.shift(), e.callEventCallbacks("webview:" + _, function(S) {
      S.apply(i, E);
    });
  }
  function W(_, E) {
    e.onEvent("webview:" + _, E);
  }
  function V(_, E) {
    e.offEvent("webview:" + _, E);
  }
  function fe(_, E) {
    var S = document.documentElement;
    S && S.style && S.style.setProperty && S.style.setProperty("--tg-" + _, E);
  }
  function ee(_) {
    _.bg_color == "#1c1c1d" && _.bg_color == _.secondary_bg_color && (_.secondary_bg_color = "#2c2c2e");
    var E;
    for (var S in _)
      (E = Oe(_[S])) && (g[S] = E, S == "bg_color" && (v = Fe(E) ? "dark" : "light", fe("color-scheme", v)), S = "theme-" + S.split("_").join("-"), fe(S, E));
    r2.sessionStorageSet("themeParams", g);
  }
  var Z = {};
  function ie(_) {
    for (var E = 100; --E; ) {
      for (var S = "", U = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", z = U.length, Y = 0; Y < _; Y++)
        S += U[Math.floor(Math.random() * z)];
      if (!Z[S])
        return Z[S] = {}, S;
    }
    throw Error("WebAppCallbackIdGenerateFailed");
  }
  var M = false, s = false, o = true;
  function a(_) {
    typeof _ != "undefined" && (o = !!_.is_expanded, M = _.height, _.is_state_stable && (s = _.height), L("viewportChanged", { isStateStable: !!_.is_state_stable }));
    var E, S;
    M !== false ? E = M - Te + "px" : E = Te ? "calc(100vh - " + Te + "px)" : "100vh", s !== false ? S = s - Te + "px" : S = Te ? "calc(100vh - " + Te + "px)" : "100vh", fe("viewport-height", E), fe("viewport-stable-height", S);
  }
  var c = false;
  function p(_) {
    if (!ae("6.2")) {
      console.warn("[Telegram.WebApp] Closing confirmation is not supported in version " + b);
      return;
    }
    c = !!_, e.postEvent("web_app_setup_closing_behavior", false, { need_confirmation: c });
  }
  var d = true;
  function y(_) {
    if (!ae("7.7")) {
      console.warn("[Telegram.WebApp] Changing swipes behavior is not supported in version " + b);
      return;
    }
    d = !!_, e.postEvent("web_app_setup_swipe_behavior", false, { allow_vertical_swipe: d });
  }
  var m = "bg_color", f = null;
  function u() {
    return m == "secondary_bg_color" ? g.secondary_bg_color : m == "bg_color" ? g.bg_color : f;
  }
  function w(_) {
    if (!ae("6.1")) {
      console.warn("[Telegram.WebApp] Header color is not supported in version " + b);
      return;
    }
    ae("6.9") || (g.bg_color && g.bg_color == _ ? _ = "bg_color" : g.secondary_bg_color && g.secondary_bg_color == _ && (_ = "secondary_bg_color"));
    var E = null, S = null;
    if (_ == "bg_color" || _ == "secondary_bg_color")
      S = _;
    else if (ae("6.9") && (E = Oe(_), !E))
      throw console.error("[Telegram.WebApp] Header color format is invalid", _), Error("WebAppHeaderColorInvalid");
    if (!ae("6.9") && S != "bg_color" && S != "secondary_bg_color")
      throw console.error("[Telegram.WebApp] Header color key should be one of Telegram.WebApp.themeParams.bg_color, Telegram.WebApp.themeParams.secondary_bg_color, 'bg_color', 'secondary_bg_color'", _), Error("WebAppHeaderColorKeyInvalid");
    m = S, f = E, j();
  }
  var R = null, F = null;
  function j() {
    (R != m || F != f) && (R = m, F = f, F ? e.postEvent("web_app_set_header_color", false, { color: f }) : e.postEvent("web_app_set_header_color", false, { color_key: m }));
  }
  var H = "bg_color";
  function ne() {
    return H == "secondary_bg_color" ? g.secondary_bg_color : H == "bg_color" ? g.bg_color : H;
  }
  function Ee(_) {
    if (!ae("6.1")) {
      console.warn("[Telegram.WebApp] Background color is not supported in version " + b);
      return;
    }
    var E;
    if (_ == "bg_color" || _ == "secondary_bg_color")
      E = _;
    else if (E = Oe(_), !E)
      throw console.error("[Telegram.WebApp] Background color format is invalid", _), Error("WebAppBackgroundColorInvalid");
    H = E, oe();
  }
  var _e = null;
  function oe() {
    var _ = ne();
    _e != _ && (_e = _, e.postEvent("web_app_set_background_color", false, { color: _ }));
  }
  function Oe(_) {
    _ += "";
    var E;
    if (E = /^\s*#([0-9a-f]{6})\s*$/i.exec(_))
      return "#" + E[1].toLowerCase();
    if (E = /^\s*#([0-9a-f])([0-9a-f])([0-9a-f])\s*$/i.exec(_))
      return ("#" + E[1] + E[1] + E[2] + E[2] + E[3] + E[3]).toLowerCase();
    if (E = /^\s*rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)\s*$/.exec(_)) {
      var S = parseInt(E[1]), U = parseInt(E[2]), z = parseInt(E[3]);
      return S = (S < 16 ? "0" : "") + S.toString(16), U = (U < 16 ? "0" : "") + U.toString(16), z = (z < 16 ? "0" : "") + z.toString(16), "#" + S + U + z;
    }
    return false;
  }
  function Fe(_) {
    _ = _.replace(/[\s#]/g, ""), _.length == 3 && (_ = _[0] + _[0] + _[1] + _[1] + _[2] + _[2]);
    var E = parseInt(_.substr(0, 2), 16), S = parseInt(_.substr(2, 2), 16), U = parseInt(_.substr(4, 2), 16), z = Math.sqrt(0.299 * (E * E) + 0.587 * (S * S) + 0.114 * (U * U));
    return z < 120;
  }
  function ve(_, E) {
    typeof _ != "string" && (_ = ""), typeof E != "string" && (E = ""), _ = _.replace(/^\s+|\s+$/g, "").split("."), E = E.replace(/^\s+|\s+$/g, "").split(".");
    var S = Math.max(_.length, E.length), U, z, Y;
    for (U = 0; U < S; U++)
      if (z = parseInt(_[U]) || 0, Y = parseInt(E[U]) || 0, z != Y)
        return z > Y ? 1 : -1;
    return 0;
  }
  function ae(_) {
    return ve(b, _) >= 0;
  }
  function De(_) {
    if (window.Blob)
      try {
        return new Blob([_]).size;
      } catch (z) {
      }
    for (var E = _.length, S = _.length - 1; S >= 0; S--) {
      var U = _.charCodeAt(S);
      U > 127 && U <= 2047 ? E++ : U > 2047 && U <= 65535 && (E += 2), U >= 56320 && U <= 57343 && S--;
    }
    return E;
  }
  var we = function() {
    var _ = false, E = {};
    Object.defineProperty(E, "isVisible", { set: function(Q) {
      G({ is_visible: Q });
    }, get: function() {
      return _;
    }, enumerable: true });
    var S = null;
    e.onEvent("back_button_pressed", U);
    function U() {
      L("backButtonClicked");
    }
    function z() {
      return { is_visible: _ };
    }
    function Y(Q) {
      return typeof Q == "undefined" && (Q = z()), JSON.stringify(Q);
    }
    function $() {
      return ae("6.1") ? true : (console.warn("[Telegram.WebApp] BackButton is not supported in version " + b), false);
    }
    function X() {
      var Q = z(), xe = Y(Q);
      S !== xe && (S = xe, e.postEvent("web_app_setup_back_button", false, Q));
    }
    function G(Q) {
      return $() && (typeof Q.is_visible != "undefined" && (_ = !!Q.is_visible), X()), E;
    }
    return E.onClick = function(Q) {
      return $() && W("backButtonClicked", Q), E;
    }, E.offClick = function(Q) {
      return $() && V("backButtonClicked", Q), E;
    }, E.show = function() {
      return G({ is_visible: true });
    }, E.hide = function() {
      return G({ is_visible: false });
    }, E;
  }(), Te = 0, Le = function() {
    var _ = false, E = true, S = false, U = "CONTINUE", z = false, Y = false, $ = {};
    Object.defineProperty($, "text", { set: function(D) {
      $.setParams({ text: D });
    }, get: function() {
      return U;
    }, enumerable: true }), Object.defineProperty($, "color", { set: function(D) {
      $.setParams({ color: D });
    }, get: function() {
      return z || g.button_color || "#2481cc";
    }, enumerable: true }), Object.defineProperty($, "textColor", { set: function(D) {
      $.setParams({ text_color: D });
    }, get: function() {
      return Y || g.button_text_color || "#ffffff";
    }, enumerable: true }), Object.defineProperty($, "isVisible", { set: function(D) {
      $.setParams({ is_visible: D });
    }, get: function() {
      return _;
    }, enumerable: true }), Object.defineProperty($, "isProgressVisible", { get: function() {
      return S;
    }, enumerable: true }), Object.defineProperty($, "isActive", { set: function(D) {
      $.setParams({ is_active: D });
    }, get: function() {
      return E;
    }, enumerable: true });
    var X = null;
    e.onEvent("main_button_pressed", re);
    var G = null, Q = {};
    if (t.tgWebAppDebug) {
      G = document.createElement("tg-main-button"), Q = { font: "600 14px/18px sans-serif", display: "none", width: "100%", height: "48px", borderRadius: "0", background: "no-repeat right center", position: "fixed", left: "0", right: "0", bottom: "0", margin: "0", padding: "15px 20px", textAlign: "center", boxSizing: "border-box", zIndex: "10000" };
      for (var xe in Q)
        G.style[xe] = Q[xe];
      document.addEventListener("DOMContentLoaded", function D(se) {
        document.removeEventListener("DOMContentLoaded", D), document.body.appendChild(G), G.addEventListener("click", re, false);
      });
    }
    function re() {
      E && L("mainButtonClicked");
    }
    function Ie() {
      var D = $.color, se = $.textColor;
      return _ ? { is_visible: true, is_active: E, is_progress_visible: S, text: U, color: D, text_color: se } : { is_visible: false };
    }
    function Re(D) {
      return typeof D == "undefined" && (D = Ie()), JSON.stringify(D);
    }
    function he() {
      var D = Ie(), se = Re(D);
      X !== se && (X = se, e.postEvent("web_app_setup_main_button", false, D), t.tgWebAppDebug && Ce(D));
    }
    function Ce(D) {
      D.is_visible ? (G.style.display = "block", Te = 48, G.style.opacity = D.is_active ? "1" : "0.8", G.style.cursor = D.is_active ? "pointer" : "auto", G.disabled = !D.is_active, G.innerText = D.text, G.style.backgroundImage = D.is_progress_visible ? "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewport%3D%220%200%2048%2048%22%20width%3D%2248px%22%20height%3D%2248px%22%3E%3Ccircle%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222.25%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%20stroke-dashoffset%3D%22106%22%20r%3D%229%22%20stroke-dasharray%3D%2256.52%22%20rotate%3D%22-90%22%3E%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20attributeType%3D%22XML%22%20dur%3D%22360s%22%20from%3D%220%22%20to%3D%2212500%22%20repeatCount%3D%22indefinite%22%3E%3C%2Fanimate%3E%3CanimateTransform%20attributeName%3D%22transform%22%20attributeType%3D%22XML%22%20type%3D%22rotate%22%20dur%3D%221s%22%20from%3D%22-90%2024%2024%22%20to%3D%22630%2024%2024%22%20repeatCount%3D%22indefinite%22%3E%3C%2FanimateTransform%3E%3C%2Fcircle%3E%3C%2Fsvg%3E')" : "none", G.style.backgroundColor = D.color, G.style.color = D.text_color) : (G.style.display = "none", Te = 0), document.documentElement && (document.documentElement.style.boxSizing = "border-box", document.documentElement.style.paddingBottom = Te + "px"), a();
    }
    function Ne(D) {
      if (typeof D.text != "undefined") {
        var se = I(D.text);
        if (!se.length)
          throw console.error("[Telegram.WebApp] Main button text is required", D.text), Error("WebAppMainButtonParamInvalid");
        if (se.length > 64)
          throw console.error("[Telegram.WebApp] Main button text is too long", se), Error("WebAppMainButtonParamInvalid");
        U = se;
      }
      if (typeof D.color != "undefined")
        if (D.color === false || D.color === null)
          z = false;
        else {
          var me = Oe(D.color);
          if (!me)
            throw console.error("[Telegram.WebApp] Main button color format is invalid", D.color), Error("WebAppMainButtonParamInvalid");
          z = me;
        }
      if (typeof D.text_color != "undefined")
        if (D.text_color === false || D.text_color === null)
          Y = false;
        else {
          var te = Oe(D.text_color);
          if (!te)
            throw console.error("[Telegram.WebApp] Main button text color format is invalid", D.text_color), Error("WebAppMainButtonParamInvalid");
          Y = te;
        }
      if (typeof D.is_visible != "undefined") {
        if (D.is_visible && !$.text.length)
          throw console.error("[Telegram.WebApp] Main button text is required"), Error("WebAppMainButtonParamInvalid");
        _ = !!D.is_visible;
      }
      return typeof D.is_active != "undefined" && (E = !!D.is_active), he(), $;
    }
    return $.setText = function(D) {
      return $.setParams({ text: D });
    }, $.onClick = function(D) {
      return W("mainButtonClicked", D), $;
    }, $.offClick = function(D) {
      return V("mainButtonClicked", D), $;
    }, $.show = function() {
      return $.setParams({ is_visible: true });
    }, $.hide = function() {
      return $.setParams({ is_visible: false });
    }, $.enable = function() {
      return $.setParams({ is_active: true });
    }, $.disable = function() {
      return $.setParams({ is_active: false });
    }, $.showProgress = function(D) {
      return E = !!D, S = true, he(), $;
    }, $.hideProgress = function() {
      return $.isActive || (E = true), S = false, he(), $;
    }, $.setParams = Ne, $;
  }(), ge = function() {
    var _ = false, E = {};
    Object.defineProperty(E, "isVisible", { set: function(Q) {
      G({ is_visible: Q });
    }, get: function() {
      return _;
    }, enumerable: true });
    var S = null;
    e.onEvent("settings_button_pressed", U);
    function U() {
      L("settingsButtonClicked");
    }
    function z() {
      return { is_visible: _ };
    }
    function Y(Q) {
      return typeof Q == "undefined" && (Q = z()), JSON.stringify(Q);
    }
    function $() {
      return ae("6.10") ? true : (console.warn("[Telegram.WebApp] SettingsButton is not supported in version " + b), false);
    }
    function X() {
      var Q = z(), xe = Y(Q);
      S !== xe && (S = xe, e.postEvent("web_app_setup_settings_button", false, Q));
    }
    function G(Q) {
      return $() && (typeof Q.is_visible != "undefined" && (_ = !!Q.is_visible), X()), E;
    }
    return E.onClick = function(Q) {
      return $() && W("settingsButtonClicked", Q), E;
    }, E.offClick = function(Q) {
      return $() && V("settingsButtonClicked", Q), E;
    }, E.show = function() {
      return G({ is_visible: true });
    }, E.hide = function() {
      return G({ is_visible: false });
    }, E;
  }(), We = function() {
    var _ = {};
    function E(S) {
      if (!ae("6.1"))
        return console.warn("[Telegram.WebApp] HapticFeedback is not supported in version " + b), _;
      if (S.type == "impact") {
        if (S.impact_style != "light" && S.impact_style != "medium" && S.impact_style != "heavy" && S.impact_style != "rigid" && S.impact_style != "soft")
          throw console.error("[Telegram.WebApp] Haptic impact style is invalid", S.impact_style), Error("WebAppHapticImpactStyleInvalid");
      } else if (S.type == "notification") {
        if (S.notification_type != "error" && S.notification_type != "success" && S.notification_type != "warning")
          throw console.error("[Telegram.WebApp] Haptic notification type is invalid", S.notification_type), Error("WebAppHapticNotificationTypeInvalid");
      } else if (S.type != "selection_change")
        throw console.error("[Telegram.WebApp] Haptic feedback type is invalid", S.type), Error("WebAppHapticFeedbackTypeInvalid");
      return e.postEvent("web_app_trigger_haptic_feedback", false, S), _;
    }
    return _.impactOccurred = function(S) {
      return E({ type: "impact", impact_style: S });
    }, _.notificationOccurred = function(S) {
      return E({ type: "notification", notification_type: S });
    }, _.selectionChanged = function() {
      return E({ type: "selection_change" });
    }, _;
  }(), qe = function() {
    var _ = {};
    function E(S, U, z) {
      if (!ae("6.9"))
        throw console.error("[Telegram.WebApp] CloudStorage is not supported in version " + b), Error("WebAppMethodUnsupported");
      return de(S, U, z), _;
    }
    return _.setItem = function(S, U, z) {
      return E("saveStorageValue", { key: S, value: U }, z);
    }, _.getItem = function(S, U) {
      return _.getItems([S], U ? function(z, Y) {
        z ? U(z) : U(null, Y[S]);
      } : null);
    }, _.getItems = function(S, U) {
      return E("getStorageValues", { keys: S }, U);
    }, _.removeItem = function(S, U) {
      return _.removeItems([S], U);
    }, _.removeItems = function(S, U) {
      return E("deleteStorageValues", { keys: S }, U);
    }, _.getKeys = function(S) {
      return E("getStorageKeys", {}, S);
    }, _;
  }(), be = function() {
    var _ = false, E = false, S = "unknown", U = false, z = false, Y = false, $ = "", X = {};
    Object.defineProperty(X, "isInited", { get: function() {
      return _;
    }, enumerable: true }), Object.defineProperty(X, "isBiometricAvailable", { get: function() {
      return _ && E;
    }, enumerable: true }), Object.defineProperty(X, "biometricType", { get: function() {
      return S || "unknown";
    }, enumerable: true }), Object.defineProperty(X, "isAccessRequested", { get: function() {
      return U;
    }, enumerable: true }), Object.defineProperty(X, "isAccessGranted", { get: function() {
      return U && z;
    }, enumerable: true }), Object.defineProperty(X, "isBiometricTokenSaved", { get: function() {
      return Y;
    }, enumerable: true }), Object.defineProperty(X, "deviceId", { get: function() {
      return $ || "";
    }, enumerable: true });
    var G = { callbacks: [] }, Q = false, xe = false, re = false;
    e.onEvent("biometry_info_received", Ie), e.onEvent("biometry_auth_requested", Re), e.onEvent("biometry_token_updated", he);
    function Ie(D, se) {
      if (_ = true, se.available ? (E = true, S = se.type || "unknown", se.access_requested ? (U = true, z = !!se.access_granted, Y = !!se.token_saved) : (U = false, z = false, Y = false)) : (E = false, S = "unknown", U = false, z = false, Y = false), $ = se.device_id || "", G.callbacks.length > 0)
        for (var me = 0; me < G.callbacks.length; me++) {
          var te = G.callbacks[me];
          te();
        }
      if (Q) {
        var Ue = Q;
        Q = false, Ue.callback && Ue.callback(z);
      }
      L("biometricManagerUpdated");
    }
    function Re(D, se) {
      var me = se.status == "authorized", te = se.token || "";
      if (xe) {
        var Ue = xe;
        xe = false, Ue.callback && Ue.callback(me, me ? te : null);
      }
      L("biometricAuthRequested", me ? { isAuthenticated: true, biometricToken: te } : { isAuthenticated: false });
    }
    function he(D, se) {
      var me = false;
      if (E && U && (se.status == "updated" ? (Y = true, me = true) : se.status == "removed" && (Y = false, me = true)), re) {
        var te = re;
        re = false, te.callback && te.callback(me);
      }
      L("biometricTokenUpdated", { isUpdated: me });
    }
    function Ce() {
      return ae("7.2") ? true : (console.warn("[Telegram.WebApp] BiometricManager is not supported in version " + b), false);
    }
    function Ne() {
      if (!_)
        throw console.error("[Telegram.WebApp] BiometricManager should be inited before using."), Error("WebAppBiometricManagerNotInited");
      return true;
    }
    return X.init = function(D) {
      return !Ce() || _ || (D && G.callbacks.push(D), e.postEvent("web_app_biometry_get_info", false)), X;
    }, X.requestAccess = function(D, se) {
      if (!Ce())
        return X;
      if (Ne(), !E)
        throw console.error("[Telegram.WebApp] Biometrics is not available on this device."), Error("WebAppBiometricManagerBiometricsNotAvailable");
      if (Q)
        throw console.error("[Telegram.WebApp] Access is already requested"), Error("WebAppBiometricManagerAccessRequested");
      var me = {};
      if (typeof D.reason != "undefined") {
        var te = I(D.reason);
        if (te.length > 128)
          throw console.error("[Telegram.WebApp] Biometric reason is too long", te), Error("WebAppBiometricRequestAccessParamInvalid");
        te.length > 0 && (me.reason = te);
      }
      return Q = { callback: se }, e.postEvent("web_app_biometry_request_access", false, me), X;
    }, X.authenticate = function(D, se) {
      if (!Ce())
        return X;
      if (Ne(), !E)
        throw console.error("[Telegram.WebApp] Biometrics is not available on this device."), Error("WebAppBiometricManagerBiometricsNotAvailable");
      if (!z)
        throw console.error("[Telegram.WebApp] Biometric access was not granted by the user."), Error("WebAppBiometricManagerBiometricAccessNotGranted");
      if (xe)
        throw console.error("[Telegram.WebApp] Authentication request is already in progress."), Error("WebAppBiometricManagerAuthenticationRequested");
      var me = {};
      if (typeof D.reason != "undefined") {
        var te = I(D.reason);
        if (te.length > 128)
          throw console.error("[Telegram.WebApp] Biometric reason is too long", te), Error("WebAppBiometricRequestAccessParamInvalid");
        te.length > 0 && (me.reason = te);
      }
      return xe = { callback: se }, e.postEvent("web_app_biometry_request_auth", false, me), X;
    }, X.updateBiometricToken = function(D, se) {
      if (!Ce())
        return X;
      if (D = D || "", D.length > 1024)
        throw console.error("[Telegram.WebApp] Token is too long", D), Error("WebAppBiometricManagerTokenInvalid");
      if (Ne(), !E)
        throw console.error("[Telegram.WebApp] Biometrics is not available on this device."), Error("WebAppBiometricManagerBiometricsNotAvailable");
      if (!z)
        throw console.error("[Telegram.WebApp] Biometric access was not granted by the user."), Error("WebAppBiometricManagerBiometricAccessNotGranted");
      if (re)
        throw console.error("[Telegram.WebApp] Token request is already in progress."), Error("WebAppBiometricManagerTokenUpdateRequested");
      return re = { callback: se }, e.postEvent("web_app_biometry_update_token", false, { token: D }), X;
    }, X.openSettings = function() {
      if (!Ce())
        return X;
      if (Ne(), !E)
        throw console.error("[Telegram.WebApp] Biometrics is not available on this device."), Error("WebAppBiometricManagerBiometricsNotAvailable");
      if (!U)
        throw console.error("[Telegram.WebApp] Biometric access was not requested yet."), Error("WebAppBiometricManagerBiometricsAccessNotRequested");
      return z ? (console.warn("[Telegram.WebApp] Biometric access was granted by the user, no need to go to settings."), X) : (e.postEvent("web_app_biometry_open_settings", false), X);
    }, X;
  }(), ke = {};
  var le = false;
  var Pe = false;
  var ue = false;
  var ce = false;
  function de(_, E, S) {
    if (!ae("6.9"))
      throw console.error("[Telegram.WebApp] Method invokeCustomMethod is not supported in version " + b), Error("WebAppMethodUnsupported");
    var U = ie(16), z = { req_id: U, method: _, params: E || {} };
    Z[U] = { callback: S }, e.postEvent("web_app_invoke_custom_method", false, z);
  }
  window.Telegram || (window.Telegram = {}), Object.defineProperty(i, "initData", { get: function() {
    return l;
  }, enumerable: true }), Object.defineProperty(i, "initDataUnsafe", { get: function() {
    return h;
  }, enumerable: true }), Object.defineProperty(i, "version", { get: function() {
    return b;
  }, enumerable: true }), Object.defineProperty(i, "platform", { get: function() {
    return x;
  }, enumerable: true }), Object.defineProperty(i, "colorScheme", { get: function() {
    return v;
  }, enumerable: true }), Object.defineProperty(i, "themeParams", { get: function() {
    return g;
  }, enumerable: true }), Object.defineProperty(i, "isExpanded", { get: function() {
    return o;
  }, enumerable: true }), Object.defineProperty(i, "viewportHeight", { get: function() {
    return (M === false ? window.innerHeight : M) - Te;
  }, enumerable: true }), Object.defineProperty(i, "viewportStableHeight", { get: function() {
    return (s === false ? window.innerHeight : s) - Te;
  }, enumerable: true }), Object.defineProperty(i, "isClosingConfirmationEnabled", { set: function(_) {
    p(_);
  }, get: function() {
    return c;
  }, enumerable: true }), Object.defineProperty(i, "isVerticalSwipesEnabled", { set: function(_) {
    y(_);
  }, get: function() {
    return d;
  }, enumerable: true }), Object.defineProperty(i, "headerColor", { set: function(_) {
    w(_);
  }, get: function() {
    return u();
  }, enumerable: true }), Object.defineProperty(i, "backgroundColor", { set: function(_) {
    Ee(_);
  }, get: function() {
    return ne();
  }, enumerable: true }), Object.defineProperty(i, "BackButton", { value: we, enumerable: true }), Object.defineProperty(i, "MainButton", { value: Le, enumerable: true }), Object.defineProperty(i, "SettingsButton", { value: ge, enumerable: true }), Object.defineProperty(i, "HapticFeedback", { value: We, enumerable: true }), Object.defineProperty(i, "CloudStorage", { value: qe, enumerable: true }), Object.defineProperty(i, "BiometricManager", { value: be, enumerable: true }), i.setHeaderColor = function(_) {
    i.headerColor = _;
  }, i.setBackgroundColor = function(_) {
    i.backgroundColor = _;
  }, i.enableClosingConfirmation = function() {
    i.isClosingConfirmationEnabled = true;
  }, i.disableClosingConfirmation = function() {
    i.isClosingConfirmationEnabled = false;
  }, i.enableVerticalSwipes = function() {
    i.isVerticalSwipesEnabled = true;
  }, i.disableVerticalSwipes = function() {
    i.isVerticalSwipesEnabled = false;
  }, i.isVersionAtLeast = function(_) {
    return ae(_);
  }, i.onEvent = function(_, E) {
    W(_, E);
  }, i.offEvent = function(_, E) {
    V(_, E);
  }, i.sendData = function(_) {
    if (!_ || !_.length)
      throw console.error("[Telegram.WebApp] Data is required", _), Error("WebAppDataInvalid");
    if (De(_) > 4096)
      throw console.error("[Telegram.WebApp] Data is too long", _), Error("WebAppDataInvalid");
    e.postEvent("web_app_data_send", false, { data: _ });
  }, i.switchInlineQuery = function(_, E) {
    if (!ae("6.6"))
      throw console.error("[Telegram.WebApp] Method switchInlineQuery is not supported in version " + b), Error("WebAppMethodUnsupported");
    if (!t.tgWebAppBotInline)
      throw console.error("[Telegram.WebApp] Inline mode is disabled for this bot. Read more about inline mode: https://core.telegram.org/bots/inline"), Error("WebAppInlineModeDisabled");
    if (_ = _ || "", _.length > 256)
      throw console.error("[Telegram.WebApp] Inline query is too long", _), Error("WebAppInlineQueryInvalid");
    var S = [];
    if (E) {
      if (!Array.isArray(E))
        throw console.error("[Telegram.WebApp] Choose chat types should be an array", E), Error("WebAppInlineChooseChatTypesInvalid");
      for (var U = { users: 1, bots: 1, groups: 1, channels: 1 }, z = 0; z < E.length; z++) {
        var Y = E[z];
        if (!U[Y])
          throw console.error("[Telegram.WebApp] Choose chat type is invalid", Y), Error("WebAppInlineChooseChatTypeInvalid");
        U[Y] != 2 && (U[Y] = 2, S.push(Y));
      }
    }
    e.postEvent("web_app_switch_inline_query", false, { query: _, chat_types: S });
  }, i.openLink = function(U, E) {
    var S = document.createElement("A");
    if (S.href = U, S.protocol != "http:" && S.protocol != "https:")
      throw console.error("[Telegram.WebApp] Url protocol is not supported", U), Error("WebAppTgUrlInvalid");
    var U = S.href;
    if (E = E || {}, ae("6.1")) {
      var z = { url: U };
      ae("6.4") && E.try_instant_view && (z.try_instant_view = true), ae("7.6") && E.try_browser && (z.try_browser = E.try_browser), e.postEvent("web_app_open_link", false, z);
    } else
      window.open(U, "_blank");
  }, i.openTelegramLink = function(_) {
    var E = document.createElement("A");
    if (E.href = _, E.protocol != "http:" && E.protocol != "https:")
      throw console.error("[Telegram.WebApp] Url protocol is not supported", _), Error("WebAppTgUrlInvalid");
    if (E.hostname != "t.me")
      throw console.error("[Telegram.WebApp] Url host is not supported", _), Error("WebAppTgUrlInvalid");
    var S = E.pathname + E.search;
    n || ae("6.1") ? e.postEvent("web_app_open_tg_link", false, { path_full: S }) : location.href = "https://t.me" + S;
  }, i.openInvoice = function(_, E) {
    var S = document.createElement("A"), U, z;
    if (S.href = _, S.protocol != "http:" && S.protocol != "https:" || S.hostname != "t.me" || !(U = S.pathname.match(/^\/(\$|invoice\/)([A-Za-z0-9\-_=]+)$/)) || !(z = U[2]))
      throw console.error("[Telegram.WebApp] Invoice url is invalid", _), Error("WebAppInvoiceUrlInvalid");
    if (!ae("6.1"))
      throw console.error("[Telegram.WebApp] Method openInvoice is not supported in version " + b), Error("WebAppMethodUnsupported");
    if (ke[z])
      throw console.error("[Telegram.WebApp] Invoice is already opened"), Error("WebAppInvoiceOpened");
    ke[z] = { url: _, callback: E }, e.postEvent("web_app_open_invoice", false, { slug: z });
  }, i.showPopup = function(_, E) {
    if (!ae("6.2"))
      throw console.error("[Telegram.WebApp] Method showPopup is not supported in version " + b), Error("WebAppMethodUnsupported");
    if (le)
      throw console.error("[Telegram.WebApp] Popup is already opened"), Error("WebAppPopupOpened");
    var S = "", U = "", z = [], $ = {};
    if (typeof _.title != "undefined") {
      if (S = I(_.title), S.length > 64)
        throw console.error("[Telegram.WebApp] Popup title is too long", S), Error("WebAppPopupParamInvalid");
      S.length > 0 && ($.title = S);
    }
    if (typeof _.message != "undefined" && (U = I(_.message)), !U.length)
      throw console.error("[Telegram.WebApp] Popup message is required", _.message), Error("WebAppPopupParamInvalid");
    if (U.length > 256)
      throw console.error("[Telegram.WebApp] Popup message is too long", U), Error("WebAppPopupParamInvalid");
    if ($.message = U, typeof _.buttons != "undefined") {
      if (!Array.isArray(_.buttons))
        throw console.error("[Telegram.WebApp] Popup buttons should be an array", _.buttons), Error("WebAppPopupParamInvalid");
      for (var X = 0; X < _.buttons.length; X++) {
        var G = _.buttons[X], Q = {}, xe = "";
        if (typeof G.id != "undefined" && (xe = G.id.toString(), xe.length > 64))
          throw console.error("[Telegram.WebApp] Popup button id is too long", xe), Error("WebAppPopupParamInvalid");
        Q.id = xe;
        var re = G.type;
        if (typeof re == "undefined" && (re = "default"), Q.type = re, !(re == "ok" || re == "close" || re == "cancel"))
          if (re == "default" || re == "destructive") {
            var Ie = "";
            if (typeof G.text != "undefined" && (Ie = I(G.text)), !Ie.length)
              throw console.error("[Telegram.WebApp] Popup button text is required for type " + re, G.text), Error("WebAppPopupParamInvalid");
            if (Ie.length > 64)
              throw console.error("[Telegram.WebApp] Popup button text is too long", Ie), Error("WebAppPopupParamInvalid");
            Q.text = Ie;
          } else
            throw console.error("[Telegram.WebApp] Popup button type is invalid", re), Error("WebAppPopupParamInvalid");
        z.push(Q);
      }
    } else
      z.push({ id: "", type: "close" });
    if (z.length < 1)
      throw console.error("[Telegram.WebApp] Popup should have at least one button"), Error("WebAppPopupParamInvalid");
    if (z.length > 3)
      throw console.error("[Telegram.WebApp] Popup should not have more than 3 buttons"), Error("WebAppPopupParamInvalid");
    $.buttons = z, le = { callback: E }, e.postEvent("web_app_open_popup", false, $);
  }, i.showAlert = function(_, E) {
    i.showPopup({ message: _ }, E ? function() {
      E();
    } : null);
  }, i.showConfirm = function(_, E) {
    i.showPopup({ message: _, buttons: [{ type: "ok", id: "ok" }, { type: "cancel" }] }, E ? function(S) {
      E(S == "ok");
    } : null);
  }, i.showScanQrPopup = function(_, E) {
    if (!ae("6.4"))
      throw console.error("[Telegram.WebApp] Method showScanQrPopup is not supported in version " + b), Error("WebAppMethodUnsupported");
    if (Pe)
      throw console.error("[Telegram.WebApp] Popup is already opened"), Error("WebAppScanQrPopupOpened");
    var S = "", U = {};
    if (typeof _.text != "undefined") {
      if (S = I(_.text), S.length > 64)
        throw console.error("[Telegram.WebApp] Scan QR popup text is too long", S), Error("WebAppScanQrPopupParamInvalid");
      S.length > 0 && (U.text = S);
    }
    Pe = { callback: E }, e.postEvent("web_app_open_scan_qr_popup", false, U);
  }, i.closeScanQrPopup = function() {
    if (!ae("6.4"))
      throw console.error("[Telegram.WebApp] Method closeScanQrPopup is not supported in version " + b), Error("WebAppMethodUnsupported");
    Pe = false, e.postEvent("web_app_close_scan_qr_popup", false);
  }, i.readTextFromClipboard = function(_) {
    if (!ae("6.4"))
      throw console.error("[Telegram.WebApp] Method readTextFromClipboard is not supported in version " + b), Error("WebAppMethodUnsupported");
    var E = ie(16), S = { req_id: E };
    Z[E] = { callback: _ }, e.postEvent("web_app_read_text_from_clipboard", false, S);
  }, i.requestWriteAccess = function(_) {
    if (!ae("6.9"))
      throw console.error("[Telegram.WebApp] Method requestWriteAccess is not supported in version " + b), Error("WebAppMethodUnsupported");
    if (ue)
      throw console.error("[Telegram.WebApp] Write access is already requested"), Error("WebAppWriteAccessRequested");
    ue = { callback: _ }, e.postEvent("web_app_request_write_access");
  }, i.requestContact = function(_) {
    if (!ae("6.9"))
      throw console.error("[Telegram.WebApp] Method requestContact is not supported in version " + b), Error("WebAppMethodUnsupported");
    if (ce)
      throw console.error("[Telegram.WebApp] Contact is already requested"), Error("WebAppContactRequested");
    ce = { callback: _ }, e.postEvent("web_app_request_phone");
  }, i.shareToStory = function(_, E) {
    if (E = E || {}, !ae("7.8"))
      throw console.error("[Telegram.WebApp] Method shareToStory is not supported in version " + b), Error("WebAppMethodUnsupported");
    var S = document.createElement("A");
    if (S.href = _, S.protocol != "http:" && S.protocol != "https:")
      throw console.error("[Telegram.WebApp] Media url protocol is not supported", url), Error("WebAppMediaUrlInvalid");
    var U = {};
    if (U.media_url = S.href, typeof E.text != "undefined") {
      var z = I(E.text);
      if (z.length > 2048)
        throw console.error("[Telegram.WebApp] Text is too long", z), Error("WebAppShareToStoryParamInvalid");
      z.length > 0 && (U.text = z);
    }
    if (typeof E.widget_link != "undefined") {
      if (E.widget_link = E.widget_link || {}, S.href = E.widget_link.url, S.protocol != "http:" && S.protocol != "https:")
        throw console.error("[Telegram.WebApp] Link protocol is not supported", url), Error("WebAppShareToStoryParamInvalid");
      var Y = { url: S.href };
      if (typeof E.widget_link.name != "undefined") {
        var $ = I(E.widget_link.name);
        if ($.length > 48)
          throw console.error("[Telegram.WebApp] Link name is too long", $), Error("WebAppShareToStoryParamInvalid");
        $.length > 0 && (Y.name = $);
      }
      U.widget_link = Y;
    }
    e.postEvent("web_app_share_to_story", false, U);
  }, i.invokeCustomMethod = function(_, E, S) {
    de(_, E, S);
  }, i.ready = function() {
    e.postEvent("web_app_ready");
  }, i.expand = function() {
    e.postEvent("web_app_expand");
  }, i.close = function(_) {
    _ = _ || {};
    var E = {};
    ae("7.6") && _.return_back && (E.return_back = true), e.postEvent("web_app_close", false, E);
  }, window.Telegram.WebApp = i, j(), oe(), a(), t.tgWebAppShowSettings && ge.show(), window.addEventListener("resize", K), n && document.addEventListener("click", T);
})();
var Tf = pr(pf());
var go = pr(Gn());
(0, go.debug)("uxuy:tmapi:debug");
(0, go.debug)("uxuy:tmapi:error");
function Zn() {
  if (typeof window != "undefined")
    return window;
}
var kt = {};
try {
  let r2 = location.hash.toString();
  kt = Rh(r2);
} catch (r2) {
}
var Hn = "unknown", vf;
kt != null && kt.tgWebAppPlatform && (Hn = (vf = kt.tgWebAppPlatform) != null ? vf : "unknown");
var wf, bf, xf;
if (Hn === "unknown") {
  let r2 = Zn();
  Hn = (xf = (bf = (wf = r2 == null ? void 0 : r2.Telegram) == null ? void 0 : wf.WebApp) == null ? void 0 : bf.platform) != null ? xf : "unknown";
}
var mo = "6.0";
kt != null && kt.tgWebAppVersion && (mo = kt.tgWebAppVersion);
var Mf, Af, _f;
if (!mo) {
  let r2 = Zn();
  mo = (_f = (Af = (Mf = r2 == null ? void 0 : r2.Telegram) == null ? void 0 : Mf.WebApp) == null ? void 0 : Af.version) != null ? _f : "6.0";
}
function Ef() {
  var r2;
  return Hn !== "unknown" || !!((r2 = Zn()) != null && r2.TelegramWebviewProxy);
}
function Rh(r2) {
  r2 = r2.replace(/^#/, "");
  let e = {};
  if (!r2.length)
    return e;
  if (r2.indexOf("=") < 0 && r2.indexOf("?") < 0)
    return e._path = Jn(r2), e;
  let t = r2.indexOf("?");
  if (t >= 0) {
    let i = r2.substr(0, t);
    e._path = Jn(i), r2 = r2.substr(t + 1);
  }
  let n = Fh(r2);
  for (let i in n)
    e[i] = n[i];
  return e;
}
function Jn(r2) {
  try {
    return r2 = r2.replace(/\+/g, "%20"), decodeURIComponent(r2);
  } catch (e) {
    return r2;
  }
}
function Fh(r2) {
  let e = {};
  if (!r2.length)
    return e;
  let t = r2.split("&"), n, i, l, h;
  for (n = 0; n < t.length; n++)
    i = t[n].split("="), l = Jn(i[0]), h = i[1] == null ? null : Jn(i[1]), e[l] = h;
  return e;
}
function Sf() {
  let r2 = Zn();
  if (!r2)
    return false;
  let e = r2.navigator.userAgent;
  return /Android/i.test(e) && /Mobile/i.test(e);
}
var Xe = { isTelegram: function() {
  var e, t;
  return !!window.TelegramWebviewProxy || !!((t = (e = window.Telegram) == null ? void 0 : e.WebApp) != null && t.initData);
}, decodeTelegramUrlParameters: function(e, t = true) {
  let n = e.replaceAll("--", "%").replaceAll("__", "=").replaceAll("-", "&").replaceAll("%5F", "_").replaceAll("%2D", "-").replaceAll("%2E", ".");
  return t ? Tf.default.parse(n) : n;
}, stringify: function(e) {
  let t = new URLSearchParams();
  function n(i, l) {
    if (Array.isArray(l))
      l.forEach((h, g) => {
        /\[\]$/.test(i) ? t.append(i, h) : n(`${i}[${typeof h == "object" ? g : ""}]`, h);
      });
    else if (typeof l == "object")
      for (let h in l)
        n(`${i}[${h}]`, l[h]);
    else
      t.append(i, l);
  }
  for (let i in e)
    n(i, e[i]);
  return t.toString();
}, encodeTelegramUrlParameters: function(e, t = true) {
  return t && (e = Xe.stringify(e)), e.replaceAll(".", "%2E").replaceAll("-", "%2D").replaceAll("_", "%5F").replaceAll("&", "-").replaceAll("=", "__").replaceAll("%", "--");
}, openAndroidLink: (() => {
  (/* @__PURE__ */ new Date()).getTime();
  return document.addEventListener("click", function() {
    (/* @__PURE__ */ new Date()).getTime();
  }, false), function(n) {
    location.href = n;
  };
})(), opendeepLink: function(e, { domain: t = "UXUYbot", appname: n = "app" }) {
  var i = `tg://resolve?domain=${t}&appname=${n}&startapp=${e}`, l = document.body, h = document.createElement("iframe");
  h.id = "uxuy_tg_iframe", h.style.visibility = "hidden", h.style.position = "fixed", h.style.bottom = "0", h.style.left = "0", h.style.width = "0px", h.style.height = "0px", h.style.border = "none", l.appendChild(h);
  var g = false;
  window.addEventListener("visibilitychange", function() {
    g = document.hidden || document.webkitHidden || document.mozHidden || document.msHidden;
  }, false), window.addEventListener("pagehide", function() {
    g = true;
  }, false), window.addEventListener("blur", function() {
    g = true;
  }, false), h !== null && (h.src = i), setTimeout(function() {
    var v;
    g || (window.location = i), (v = l == null ? void 0 : l.removeChild) == null || v.call(l, h);
  }, 2e3);
} };
function Qn(r2 = 0) {
  return r2 = isNaN(Number(r2)) ? 1 : Number(r2), "0x" + r2.toString(16);
}
var At = function() {
  var r2 = "__is_uxuy_app__", e = window == null ? void 0 : window.sessionStorage;
  try {
    if (!e)
      return false;
    if (e.getItem(r2))
      return true;
    var t = window.location.hash.toString(), n = new URLSearchParams(t);
    return !!n.get("isUxuy");
  } catch (i) {
    return false;
  }
};
function If(r2) {
  return r2 ? Array.prototype.map.call(r2, (e) => ("00" + e.toString(16)).slice(-2)).join("") : "";
}
var Of = (r2) => new Uint8Array(r2.match(/.{1,2}/g).map((e) => parseInt(e, 16)));
function Xn() {
  var r2, e;
  return Ef() || ((e = (r2 = window == null ? void 0 : window.Telegram) == null ? void 0 : r2.WebApp) == null ? void 0 : e.initData) || (window == null ? void 0 : window.TelegramWebviewProxy);
}
var Pf = "0.1.9";
var Lh = (r2 = "square") => "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkY3NDAwIi8+CjxwYXRoIGQ9Ik0zMDAuMDcgMzY2LjI0SDcyNC4zNjJDNzYzLjE5IDM2Ni4yNCA3OTQuNjY3IDM5Ny43MTcgNzk0LjY2NyA0MzYuNTQ1VjcxMS43NjhDNzk0LjY2NyA3NTAuNTk3IDc2My4xOSA3ODIuMDczIDcyNC4zNjIgNzgyLjA3M0gzMDAuMDcxQzI2MS4yNDMgNzgyLjA3MyAyMjkuNzY2IDc1MC41OTcgMjI5Ljc2NiA3MTEuNzY4VjQzNi41NDNDMjI5Ljc2NiAzOTcuNzE2IDI2MS4yNDIgMzY2LjI0IDMwMC4wNyAzNjYuMjRaIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI5LjUzMjg4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjQyLjk3MSAyNzcuNjA5TDMwOS41MDkgMzE3LjE3MUMyODIuMjc0IDMyMC40MDIgMjYxLjA1NiAzNDIuMzIyIDI1OC43MTMgMzY5LjY0OEwyNTguMzI3IDM3NC4xNTVWMzkwLjkzNkg2OTYuMDI5TDY3NC4zNzYgMjk5LjU2QzY3MS4wMDQgMjg1LjMyNyA2NTcuNDk1IDI3NS44ODYgNjQyLjk3MSAyNzcuNjA5Wk03MDYuNjU3IDI5MS45MUM2OTkuMzk4IDI2MS4yNzggNjcwLjMyNCAyNDAuOTU2IDYzOS4wNjMgMjQ0LjY2NUwzMDUuNjAxIDI4NC4yMjdDMjYyLjczOCAyODkuMzEyIDIyOS4zNDYgMzIzLjgxIDIyNS42NiAzNjYuODE1TDIyNS4xNTIgMzcyLjczNlY0NDYuMzY1TDI3MC4yNjYgNDIyLjU5SDczNy42MjNMNzA2LjY1NyAyOTEuOTFaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNTIzLjA5MiA3MjEuMzU0SDU4My4yNjNDNTk2LjA2NyA3MjEuMzU0IDYwMi45NzkgNzA2LjMzOSA1OTQuNjUyIDY5Ni42MTJMNTAyLjI3NCA1ODguNjk2QzUwMS41IDU4Ny43OTIgNTAxLjUwMyA1ODYuNDU3IDUwMi4yODIgNTg1LjU1N0w2MjUuNzI3IDQ0Mi43NEM2MzQuMTIzIDQzMy4wMjggNjI3LjIyMyA0MTcuOTQ0IDYxNC4zODUgNDE3Ljk0NEg1NTQuMzE0QzU0OS45NTUgNDE3Ljk0NCA1NDUuODEyIDQxOS44NDEgNTQyLjk2NCA0MjMuMTRMNDA5Ljc2OSA1NzcuNDYzQzQwNC45MjcgNTgzLjA3MyA0MDQuOTExIDU5MS4zOCA0MDkuNzMgNTk3LjAwOUw1MTEuNzA0IDcxNi4xMTJDNTE0LjU1MiA3MTkuNDM5IDUxOC43MTMgNzIxLjM1NCA1MjMuMDkyIDcyMS4zNTRaIiBmaWxsPSIjRkY3NDAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEyLjU4NSIvPgo8cGF0aCBkPSJNMzIyLjMzOSA3MjEuMzU2SDM4Mi40NjNDMzg2LjgzIDcyMS4zNTYgMzkwLjk4MSA3MTkuNDUxIDM5My44MjkgNzE2LjE0TDQ5Ni4zOTggNTk2Ljg5NUM1MDEuMjMzIDU5MS4yNzQgNTAxLjIzMyA1ODIuOTYzIDQ5Ni4zOTkgNTc3LjM0MkwzOTMuODI5IDQ1OC4wODRDMzkwLjk4MSA0NTQuNzcyIDM4Ni44MyA0NTIuODY4IDM4Mi40NjIgNDUyLjg2OEgzMjIuMzM4QzMwOS41MTggNDUyLjg2OCAzMDIuNjEyIDQ2Ny45MTYgMzEwLjk3MiA0NzcuNjM2TDQwMy43ODMgNTg1LjU0OEM0MDQuNTU5IDU4Ni40NTEgNDA0LjU1OSA1ODcuNzg1IDQwMy43ODMgNTg4LjY4OEwzMTAuOTczIDY5Ni41ODdDMzAyLjYxMyA3MDYuMzA3IDMwOS41MTggNzIxLjM1NiAzMjIuMzM5IDcyMS4zNTZaIiBmaWxsPSIjRkY3NDAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEyLjU4NSIvPgo8cGF0aCBkPSJNNzMxLjYyNyA0ODdDNjg2LjgzNSA0ODcgNjUwLjUyMyA1MjMuMzExIDY1MC41MjMgNTY4LjEwM0M2NTAuNTIzIDYxMi44OTUgNjg2LjgzNSA2NDkuMjA3IDczMS42MjcgNjQ5LjIwN0g4MDguMDAyQzgzNS4yMTcgNjQ5LjIwNyA4NTcuMjc5IDYyNy4xNDUgODU3LjI3OSA1OTkuOTNWNTM2LjI3N0M4NTcuMjc5IDUwOS4wNjIgODM1LjIxNyA0ODcgODA4LjAwMiA0ODdINzMxLjYyN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNODA4LjAwMiA1MTguMjc5SDczMS42MjdDNzA0LjExIDUxOC4yNzkgNjgxLjgwMiA1NDAuNTg2IDY4MS44MDIgNTY4LjEwM0M2ODEuODAyIDU5NS42MiA3MDQuMTEgNjE3LjkyOCA3MzEuNjI3IDYxNy45MjhIODA4LjAwMkM4MTcuOTQyIDYxNy45MjggODI2IDYwOS44NyA4MjYgNTk5LjkzVjUzNi4yNzdDODI2IDUyNi4zMzcgODE3Ljk0MiA1MTguMjc5IDgwOC4wMDIgNTE4LjI3OVpNNzMxLjYyNyA0ODdDNjg2LjgzNSA0ODcgNjUwLjUyMyA1MjMuMzExIDY1MC41MjMgNTY4LjEwM0M2NTAuNTIzIDYxMi44OTUgNjg2LjgzNSA2NDkuMjA3IDczMS42MjcgNjQ5LjIwN0g4MDguMDAyQzgzNS4yMTcgNjQ5LjIwNyA4NTcuMjc5IDYyNy4xNDUgODU3LjI3OSA1OTkuOTNWNTM2LjI3N0M4NTcuMjc5IDUwOS4wNjIgODM1LjIxNyA0ODcgODA4LjAwMiA0ODdINzMxLjYyN1oiIGZpbGw9IiNGRjc0MDAiLz4KPGNpcmNsZSBjeD0iNzM1LjEyNSIgY3k9IjU2OC45MDUiIHI9IjI1LjkwNDciIGZpbGw9IiNGRjc0MDAiLz4KPC9zdmc+Cg==", ct = { id: "uxuy", version: Pf, name: "UXUY Wallet", homepage: "https://uxuy.com", logo: Lh(), description: "The first Self-Custody Multi-Chain Wallet based on Telegram, crafted by the @uxuycom team 🧑‍🤝‍🧑", downloadLinks: { android: "https://download.uxuy.com/v0.1/uxuy-release.apk", googlePlay: "https://play.google.com/store/apps/details?id=com.uxuySdk.wallet", ios: "https://uxuy.com/download", appleStore: "https://uxuy.com/download", testflight: "https://uxuy.com/download", telegram: "https://t.me/UXUYbot/app", browserExtension: { chrome: "", edge: "" } }, deepLinks: { scheme: "uxuy://", universallink: "https://", direct_link: "https://t.me/UXUYbot/app" } }, qt = { bridge: "https://bridge.uxrelay.com", connect: "https://connector.uxrelay.com", connect_direct_link: "https://t.me/UXUYbot/app" };
var wr = ((g) => (g.LIGHTNING = "lightning", g.TRON = "tron", g.EVM = "evm", g.TON = "ton", g.SOL = "sol", g.COSMOS = "cosmos", g.SUI = "sui", g))(wr || {}), cn = ((W) => (W.ALL = "all", W.ETH = "eth", W.Ethereum = "ethereum", W.BNBCHAIN = "bnbchain", W.BASE = "base", W.ZKLINK = "zklink", W.POLYGON = "polygon", W.ZKSYNC = "zksync", W.FANTOM = "fantom", W.AVALANCHEC = "avalanchec", W.ARBITRUM = "arbitrumone", W.OPTIMISM = "optimism", W.LINEA = "linea", W.CORE = "core", W.OPBNB = "opbnb", W.PLATON = "platon", W.BITLAYER = "bitlayer", W.LIGHTNING = "lightning", W.TRON = "tron", W.TON = "ton", W.SOLANA = "solana", W.SUI = "sui", W))(cn || {}), Cf = ((t) => (t.DEFAULT = "default_", t.CUSTOM_EVM = "evm_", t))(Cf || {}), yo = ((I) => (I[I.ALL = -1] = "ALL", I[I.BNBCHAIN = 56] = "BNBCHAIN", I[I.LIGHTNING = 2652501241] = "LIGHTNING", I[I.BASE = 8453] = "BASE", I[I.ZKLINK = 810180] = "ZKLINK", I[I.POLYGON = 137] = "POLYGON", I[I.ARB = 42161] = "ARB", I[I.AVALANCHEC = 43114] = "AVALANCHEC", I[I.ETH = 1] = "ETH", I[I.FANTOM = 250] = "FANTOM", I[I.OPTIMISM = 10] = "OPTIMISM", I[I.LINEA = 59144] = "LINEA", I[I.ZKSYNC = 324] = "ZKSYNC", I[I.CORE = 1116] = "CORE", I[I.BITLAYER = 200901] = "BITLAYER", I[I.MOONCHAIN = 1868] = "MOONCHAIN", I[I.TRON = 728126428] = "TRON", I[I.TON = 239] = "TON", I[I.SOLANA = 6000001] = "SOLANA", I[I.SUI = -1e6] = "SUI", I))(yo || {});
function ei() {
  return (r2) => r2;
}
var am = ei(), fm = ei(), lm = ei();
function um(r2) {
  return Math.floor(r2);
}
var cm = ei();
var ti = ((l) => (l.DAPP_CONNECT_ACCOUNTS = "DAPP_CONNECT_ACCOUNTS", l.DAPP_SIGN_MESSAGE = "DAPP_SIGN_MESSAGE", l.DAPP_SIGN_TRANSACTION = "DAPP_SIGN_TRANSACTION", l.DAPP_SIGN_SEND_TRANSACTION = "DAPP_SIGN_SEND_TRANSACTION", l.DAPP_EXT_METHOD = "DAPP_EXT_METHOD", l))(ti || {});
var ri = { evm: "ethereum#initialized", tron: "tronLink#initialized", ton: "tonready", sol: "solana#initialized" };
function hn(r2, e) {
  return function() {
    return r2.apply(e, arguments);
  };
}
var { toString: Wh } = Object.prototype, { getPrototypeOf: bo } = Object, ii = ((r2) => (e) => {
  let t = Wh.call(e);
  return r2[t] || (r2[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), gt = (r2) => (r2 = r2.toLowerCase(), (e) => ii(e) === r2), oi = (r2) => (e) => typeof e === r2, { isArray: qr } = Array, pn = oi("undefined");
function qh(r2) {
  return r2 !== null && !pn(r2) && r2.constructor !== null && !pn(r2.constructor) && dt(r2.constructor.isBuffer) && r2.constructor.isBuffer(r2);
}
var Uf = gt("ArrayBuffer");
function zh(r2) {
  let e;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? e = ArrayBuffer.isView(r2) : e = r2 && r2.buffer && Uf(r2.buffer), e;
}
var jh = oi("string"), dt = oi("function"), Bf = oi("number"), si = (r2) => r2 !== null && typeof r2 == "object", $h = (r2) => r2 === true || r2 === false, ni = (r2) => {
  if (ii(r2) !== "object")
    return false;
  let e = bo(r2);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in r2) && !(Symbol.iterator in r2);
}, Vh = gt("Date"), Yh = gt("File"), Kh = gt("Blob"), Gh = gt("FileList"), Hh = (r2) => si(r2) && dt(r2.pipe), Jh = (r2) => {
  let e;
  return r2 && (typeof FormData == "function" && r2 instanceof FormData || dt(r2.append) && ((e = ii(r2)) === "formdata" || e === "object" && dt(r2.toString) && r2.toString() === "[object FormData]"));
}, Zh = gt("URLSearchParams"), [Qh, Xh, e0, t0] = ["ReadableStream", "Request", "Response", "Headers"].map(gt), r0 = (r2) => r2.trim ? r2.trim() : r2.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function dn(r2, e, { allOwnKeys: t = false } = {}) {
  if (r2 === null || typeof r2 == "undefined")
    return;
  let n, i;
  if (typeof r2 != "object" && (r2 = [r2]), qr(r2))
    for (n = 0, i = r2.length; n < i; n++)
      e.call(null, r2[n], n, r2);
  else {
    let l = t ? Object.getOwnPropertyNames(r2) : Object.keys(r2), h = l.length, g;
    for (n = 0; n < h; n++)
      g = l[n], e.call(null, r2[g], g, r2);
  }
}
function Rf(r2, e) {
  e = e.toLowerCase();
  let t = Object.keys(r2), n = t.length, i;
  for (; n-- > 0; )
    if (i = t[n], e === i.toLowerCase())
      return i;
  return null;
}
var br = (() => typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global)(), Ff = (r2) => !pn(r2) && r2 !== br;
function wo() {
  let { caseless: r2 } = Ff(this) && this || {}, e = {}, t = (n, i) => {
    let l = r2 && Rf(e, i) || i;
    ni(e[l]) && ni(n) ? e[l] = wo(e[l], n) : ni(n) ? e[l] = wo({}, n) : qr(n) ? e[l] = n.slice() : e[l] = n;
  };
  for (let n = 0, i = arguments.length; n < i; n++)
    arguments[n] && dn(arguments[n], t);
  return e;
}
var n0 = (r2, e, t, { allOwnKeys: n } = {}) => (dn(e, (i, l) => {
  t && dt(i) ? r2[l] = hn(i, t) : r2[l] = i;
}, { allOwnKeys: n }), r2), i0 = (r2) => (r2.charCodeAt(0) === 65279 && (r2 = r2.slice(1)), r2), o0 = (r2, e, t, n) => {
  r2.prototype = Object.create(e.prototype, n), r2.prototype.constructor = r2, Object.defineProperty(r2, "super", { value: e.prototype }), t && Object.assign(r2.prototype, t);
}, s0 = (r2, e, t, n) => {
  let i, l, h, g = {};
  if (e = e || {}, r2 == null)
    return e;
  do {
    for (i = Object.getOwnPropertyNames(r2), l = i.length; l-- > 0; )
      h = i[l], (!n || n(h, r2, e)) && !g[h] && (e[h] = r2[h], g[h] = true);
    r2 = t !== false && bo(r2);
  } while (r2 && (!t || t(r2, e)) && r2 !== Object.prototype);
  return e;
}, a0 = (r2, e, t) => {
  r2 = String(r2), (t === void 0 || t > r2.length) && (t = r2.length), t -= e.length;
  let n = r2.indexOf(e, t);
  return n !== -1 && n === t;
}, f0 = (r2) => {
  if (!r2)
    return null;
  if (qr(r2))
    return r2;
  let e = r2.length;
  if (!Bf(e))
    return null;
  let t = new Array(e);
  for (; e-- > 0; )
    t[e] = r2[e];
  return t;
}, l0 = ((r2) => (e) => r2 && e instanceof r2)(typeof Uint8Array != "undefined" && bo(Uint8Array)), u0 = (r2, e) => {
  let n = (r2 && r2[Symbol.iterator]).call(r2), i;
  for (; (i = n.next()) && !i.done; ) {
    let l = i.value;
    e.call(r2, l[0], l[1]);
  }
}, c0 = (r2, e) => {
  let t, n = [];
  for (; (t = r2.exec(e)) !== null; )
    n.push(t);
  return n;
}, h0 = gt("HTMLFormElement"), p0 = (r2) => r2.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(t, n, i) {
  return n.toUpperCase() + i;
}), Nf = (({ hasOwnProperty: r2 }) => (e, t) => r2.call(e, t))(Object.prototype), d0 = gt("RegExp"), Df = (r2, e) => {
  let t = Object.getOwnPropertyDescriptors(r2), n = {};
  dn(t, (i, l) => {
    let h;
    (h = e(i, l, r2)) !== false && (n[l] = h || i);
  }), Object.defineProperties(r2, n);
}, m0 = (r2) => {
  Df(r2, (e, t) => {
    if (dt(r2) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return false;
    let n = r2[t];
    if (dt(n)) {
      if (e.enumerable = false, "writable" in e) {
        e.writable = false;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, g0 = (r2, e) => {
  let t = {}, n = (i) => {
    i.forEach((l) => {
      t[l] = true;
    });
  };
  return qr(r2) ? n(r2) : n(String(r2).split(e)), t;
}, y0 = () => {
}, v0 = (r2, e) => r2 != null && Number.isFinite(r2 = +r2) ? r2 : e, vo = "abcdefghijklmnopqrstuvwxyz", kf = "0123456789", Lf = { DIGIT: kf, ALPHA: vo, ALPHA_DIGIT: vo + vo.toUpperCase() + kf }, w0 = (r2 = 16, e = Lf.ALPHA_DIGIT) => {
  let t = "", { length: n } = e;
  for (; r2--; )
    t += e[Math.random() * n | 0];
  return t;
};
function b0(r2) {
  return !!(r2 && dt(r2.append) && r2[Symbol.toStringTag] === "FormData" && r2[Symbol.iterator]);
}
var x0 = (r2) => {
  let e = new Array(10), t = (n, i) => {
    if (si(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[i] = n;
        let l = qr(n) ? [] : {};
        return dn(n, (h, g) => {
          let v = t(h, i + 1);
          !pn(v) && (l[g] = v);
        }), e[i] = void 0, l;
      }
    }
    return n;
  };
  return t(r2, 0);
}, M0 = gt("AsyncFunction"), A0 = (r2) => r2 && (si(r2) || dt(r2)) && dt(r2.then) && dt(r2.catch), Wf = ((r2, e) => r2 ? setImmediate : e ? ((t, n) => (br.addEventListener("message", ({ source: i, data: l }) => {
  i === br && l === t && n.length && n.shift()();
}, false), (i) => {
  n.push(i), br.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(typeof setImmediate == "function", dt(br.postMessage)), _0 = typeof queueMicrotask != "undefined" ? queueMicrotask.bind(br) : typeof process != "undefined" && process.nextTick || Wf, P = { isArray: qr, isArrayBuffer: Uf, isBuffer: qh, isFormData: Jh, isArrayBufferView: zh, isString: jh, isNumber: Bf, isBoolean: $h, isObject: si, isPlainObject: ni, isReadableStream: Qh, isRequest: Xh, isResponse: e0, isHeaders: t0, isUndefined: pn, isDate: Vh, isFile: Yh, isBlob: Kh, isRegExp: d0, isFunction: dt, isStream: Hh, isURLSearchParams: Zh, isTypedArray: l0, isFileList: Gh, forEach: dn, merge: wo, extend: n0, trim: r0, stripBOM: i0, inherits: o0, toFlatObject: s0, kindOf: ii, kindOfTest: gt, endsWith: a0, toArray: f0, forEachEntry: u0, matchAll: c0, isHTMLForm: h0, hasOwnProperty: Nf, hasOwnProp: Nf, reduceDescriptors: Df, freezeMethods: m0, toObjectSet: g0, toCamelCase: p0, noop: y0, toFiniteNumber: v0, findKey: Rf, global: br, isContextDefined: Ff, ALPHABET: Lf, generateString: w0, isSpecCompliantForm: b0, toJSONObject: x0, isAsyncFn: M0, isThenable: A0, setImmediate: Wf, asap: _0 };
function zr(r2, e, t, n, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = r2, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), n && (this.request = n), i && (this.response = i);
}
P.inherits(zr, Error, { toJSON: function() {
  return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: P.toJSONObject(this.config), code: this.code, status: this.response && this.response.status ? this.response.status : null };
} });
var qf = zr.prototype, zf = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((r2) => {
  zf[r2] = { value: r2 };
});
Object.defineProperties(zr, zf);
Object.defineProperty(qf, "isAxiosError", { value: true });
zr.from = (r2, e, t, n, i, l) => {
  let h = Object.create(qf);
  return P.toFlatObject(r2, h, function(v) {
    return v !== Error.prototype;
  }, (g) => g !== "isAxiosError"), zr.call(h, r2.message, e, t, n, i), h.cause = r2, h.name = r2.name, l && Object.assign(h, l), h;
};
var pe = zr;
var ai = null;
function xo(r2) {
  return P.isPlainObject(r2) || P.isArray(r2);
}
function $f(r2) {
  return P.endsWith(r2, "[]") ? r2.slice(0, -2) : r2;
}
function jf(r2, e, t) {
  return r2 ? r2.concat(e).map(function(i, l) {
    return i = $f(i), !t && l ? "[" + i + "]" : i;
  }).join(t ? "." : "") : e;
}
function E0(r2) {
  return P.isArray(r2) && !r2.some(xo);
}
var S0 = P.toFlatObject(P, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function T0(r2, e, t) {
  if (!P.isObject(r2))
    throw new TypeError("target must be an object");
  e = e || new FormData(), t = P.toFlatObject(t, { metaTokens: true, dots: false, indexes: false }, false, function(q, C) {
    return !P.isUndefined(C[q]);
  });
  let n = t.metaTokens, i = t.visitor || x, l = t.dots, h = t.indexes, v = (t.Blob || typeof Blob != "undefined" && Blob) && P.isSpecCompliantForm(e);
  if (!P.isFunction(i))
    throw new TypeError("visitor must be a function");
  function b(N) {
    if (N === null)
      return "";
    if (P.isDate(N))
      return N.toISOString();
    if (!v && P.isBlob(N))
      throw new pe("Blob is not supported. Use a Buffer instead.");
    return P.isArrayBuffer(N) || P.isTypedArray(N) ? v && typeof Blob == "function" ? new Blob([N]) : Buffer.from(N) : N;
  }
  function x(N, q, C) {
    let J = N;
    if (N && !C && typeof N == "object") {
      if (P.endsWith(q, "{}"))
        q = n ? q : q.slice(0, -2), N = JSON.stringify(N);
      else if (P.isArray(N) && E0(N) || (P.isFileList(N) || P.endsWith(q, "[]")) && (J = P.toArray(N)))
        return q = $f(q), J.forEach(function(T, I) {
          !(P.isUndefined(T) || T === null) && e.append(h === true ? jf([q], I, l) : h === null ? q : q + "[]", b(T));
        }), false;
    }
    return xo(N) ? true : (e.append(jf(C, q, l), b(N)), false);
  }
  let A = [], O = Object.assign(S0, { defaultVisitor: x, convertValue: b, isVisitable: xo });
  function k(N, q) {
    if (!P.isUndefined(N)) {
      if (A.indexOf(N) !== -1)
        throw Error("Circular reference detected in " + q.join("."));
      A.push(N), P.forEach(N, function(J, K) {
        (!(P.isUndefined(J) || J === null) && i.call(e, J, P.isString(K) ? K.trim() : K, q, O)) === true && k(J, q ? q.concat(K) : [K]);
      }), A.pop();
    }
  }
  if (!P.isObject(r2))
    throw new TypeError("data must be an object");
  return k(r2), e;
}
var zt = T0;
function Vf(r2) {
  let e = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
  return encodeURIComponent(r2).replace(/[!'()~]|%20|%00/g, function(n) {
    return e[n];
  });
}
function Yf(r2, e) {
  this._pairs = [], r2 && zt(r2, this, e);
}
var Kf = Yf.prototype;
Kf.append = function(e, t) {
  this._pairs.push([e, t]);
};
Kf.toString = function(e) {
  let t = e ? function(n) {
    return e.call(this, n, Vf);
  } : Vf;
  return this._pairs.map(function(i) {
    return t(i[0]) + "=" + t(i[1]);
  }, "").join("&");
};
var fi = Yf;
function I0(r2) {
  return encodeURIComponent(r2).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function mn(r2, e, t) {
  if (!e)
    return r2;
  let n = t && t.encode || I0, i = t && t.serialize, l;
  if (i ? l = i(e, t) : l = P.isURLSearchParams(e) ? e.toString() : new fi(e, t).toString(n), l) {
    let h = r2.indexOf("#");
    h !== -1 && (r2 = r2.slice(0, h)), r2 += (r2.indexOf("?") === -1 ? "?" : "&") + l;
  }
  return r2;
}
var Mo = class {
  constructor() {
    this.handlers = [];
  }
  use(e, t, n) {
    return this.handlers.push({ fulfilled: e, rejected: t, synchronous: n ? n.synchronous : false, runWhen: n ? n.runWhen : null }), this.handlers.length - 1;
  }
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(e) {
    P.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}, Ao = Mo;
var li = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false };
var Gf = typeof URLSearchParams != "undefined" ? URLSearchParams : fi;
var Hf = typeof FormData != "undefined" ? FormData : null;
var Jf = typeof Blob != "undefined" ? Blob : null;
var Zf = { isBrowser: true, classes: { URLSearchParams: Gf, FormData: Hf, Blob: Jf }, protocols: ["http", "https", "file", "blob", "url", "data"] };
var Eo = {};
Mu(Eo, { hasBrowserEnv: () => _o, hasStandardBrowserEnv: () => O0, hasStandardBrowserWebWorkerEnv: () => P0, origin: () => C0 });
var _o = typeof window != "undefined" && typeof document != "undefined", O0 = ((r2) => _o && ["ReactNative", "NativeScript", "NS"].indexOf(r2) < 0)(typeof navigator != "undefined" && navigator.product), P0 = (() => typeof WorkerGlobalScope != "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), C0 = _o && window.location.href || "http://localhost";
var it = { ...Eo, ...Zf };
function So(r2, e) {
  return zt(r2, new it.classes.URLSearchParams(), Object.assign({ visitor: function(t, n, i, l) {
    return it.isNode && P.isBuffer(t) ? (this.append(n, t.toString("base64")), false) : l.defaultVisitor.apply(this, arguments);
  } }, e));
}
function N0(r2) {
  return P.matchAll(/\w+|\[(\w*)]/g, r2).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function k0(r2) {
  let e = {}, t = Object.keys(r2), n, i = t.length, l;
  for (n = 0; n < i; n++)
    l = t[n], e[l] = r2[l];
  return e;
}
function U0(r2) {
  function e(t, n, i, l) {
    let h = t[l++];
    if (h === "__proto__")
      return true;
    let g = Number.isFinite(+h), v = l >= t.length;
    return h = !h && P.isArray(i) ? i.length : h, v ? (P.hasOwnProp(i, h) ? i[h] = [i[h], n] : i[h] = n, !g) : ((!i[h] || !P.isObject(i[h])) && (i[h] = []), e(t, n, i[h], l) && P.isArray(i[h]) && (i[h] = k0(i[h])), !g);
  }
  if (P.isFormData(r2) && P.isFunction(r2.entries)) {
    let t = {};
    return P.forEachEntry(r2, (n, i) => {
      e(N0(n), i, t, 0);
    }), t;
  }
  return null;
}
var ui = U0;
function B0(r2, e, t) {
  if (P.isString(r2))
    try {
      return (e || JSON.parse)(r2), P.trim(r2);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (t || JSON.stringify)(r2);
}
var To = { transitional: li, adapter: ["xhr", "http", "fetch"], transformRequest: [function(e, t) {
  let n = t.getContentType() || "", i = n.indexOf("application/json") > -1, l = P.isObject(e);
  if (l && P.isHTMLForm(e) && (e = new FormData(e)), P.isFormData(e))
    return i ? JSON.stringify(ui(e)) : e;
  if (P.isArrayBuffer(e) || P.isBuffer(e) || P.isStream(e) || P.isFile(e) || P.isBlob(e) || P.isReadableStream(e))
    return e;
  if (P.isArrayBufferView(e))
    return e.buffer;
  if (P.isURLSearchParams(e))
    return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), e.toString();
  let g;
  if (l) {
    if (n.indexOf("application/x-www-form-urlencoded") > -1)
      return So(e, this.formSerializer).toString();
    if ((g = P.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
      let v = this.env && this.env.FormData;
      return zt(g ? { "files[]": e } : e, v && new v(), this.formSerializer);
    }
  }
  return l || i ? (t.setContentType("application/json", false), B0(e)) : e;
}], transformResponse: [function(e) {
  let t = this.transitional || To.transitional, n = t && t.forcedJSONParsing, i = this.responseType === "json";
  if (P.isResponse(e) || P.isReadableStream(e))
    return e;
  if (e && P.isString(e) && (n && !this.responseType || i)) {
    let h = !(t && t.silentJSONParsing) && i;
    try {
      return JSON.parse(e);
    } catch (g) {
      if (h)
        throw g.name === "SyntaxError" ? pe.from(g, pe.ERR_BAD_RESPONSE, this, null, this.response) : g;
    }
  }
  return e;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: it.classes.FormData, Blob: it.classes.Blob }, validateStatus: function(e) {
  return e >= 200 && e < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
P.forEach(["delete", "get", "head", "post", "put", "patch"], (r2) => {
  To.headers[r2] = {};
});
var jr = To;
var R0 = P.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), Qf = (r2) => {
  let e = {}, t, n, i;
  return r2 && r2.split(`
`).forEach(function(h) {
    i = h.indexOf(":"), t = h.substring(0, i).trim().toLowerCase(), n = h.substring(i + 1).trim(), !(!t || e[t] && R0[t]) && (t === "set-cookie" ? e[t] ? e[t].push(n) : e[t] = [n] : e[t] = e[t] ? e[t] + ", " + n : n);
  }), e;
};
var Xf = Symbol("internals");
function gn(r2) {
  return r2 && String(r2).trim().toLowerCase();
}
function ci(r2) {
  return r2 === false || r2 == null ? r2 : P.isArray(r2) ? r2.map(ci) : String(r2);
}
function F0(r2) {
  let e = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g, n;
  for (; n = t.exec(r2); )
    e[n[1]] = n[2];
  return e;
}
var D0 = (r2) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r2.trim());
function Io(r2, e, t, n, i) {
  if (P.isFunction(n))
    return n.call(this, e, t);
  if (i && (e = t), !!P.isString(e)) {
    if (P.isString(n))
      return e.indexOf(n) !== -1;
    if (P.isRegExp(n))
      return n.test(e);
  }
}
function L0(r2) {
  return r2.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function W0(r2, e) {
  let t = P.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(r2, n + t, { value: function(i, l, h) {
      return this[n].call(this, e, i, l, h);
    }, configurable: true });
  });
}
var $r = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, n) {
    let i = this;
    function l(g, v, b) {
      let x = gn(v);
      if (!x)
        throw new Error("header name must be a non-empty string");
      let A = P.findKey(i, x);
      (!A || i[A] === void 0 || b === true || b === void 0 && i[A] !== false) && (i[A || v] = ci(g));
    }
    let h = (g, v) => P.forEach(g, (b, x) => l(b, x, v));
    if (P.isPlainObject(e) || e instanceof this.constructor)
      h(e, t);
    else if (P.isString(e) && (e = e.trim()) && !D0(e))
      h(Qf(e), t);
    else if (P.isHeaders(e))
      for (let [g, v] of e.entries())
        l(v, g, n);
    else
      e != null && l(t, e, n);
    return this;
  }
  get(e, t) {
    if (e = gn(e), e) {
      let n = P.findKey(this, e);
      if (n) {
        let i = this[n];
        if (!t)
          return i;
        if (t === true)
          return F0(i);
        if (P.isFunction(t))
          return t.call(this, i, n);
        if (P.isRegExp(t))
          return t.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = gn(e), e) {
      let n = P.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!t || Io(this, this[n], n, t)));
    }
    return false;
  }
  delete(e, t) {
    let n = this, i = false;
    function l(h) {
      if (h = gn(h), h) {
        let g = P.findKey(n, h);
        g && (!t || Io(n, n[g], g, t)) && (delete n[g], i = true);
      }
    }
    return P.isArray(e) ? e.forEach(l) : l(e), i;
  }
  clear(e) {
    let t = Object.keys(this), n = t.length, i = false;
    for (; n--; ) {
      let l = t[n];
      (!e || Io(this, this[l], l, e, true)) && (delete this[l], i = true);
    }
    return i;
  }
  normalize(e) {
    let t = this, n = {};
    return P.forEach(this, (i, l) => {
      let h = P.findKey(n, l);
      if (h) {
        t[h] = ci(i), delete t[l];
        return;
      }
      let g = e ? L0(l) : String(l).trim();
      g !== l && delete t[l], t[g] = ci(i), n[g] = true;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    let t = /* @__PURE__ */ Object.create(null);
    return P.forEach(this, (n, i) => {
      n != null && n !== false && (t[i] = e && P.isArray(n) ? n.join(", ") : n);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...t) {
    let n = new this(e);
    return t.forEach((i) => n.set(i)), n;
  }
  static accessor(e) {
    let n = (this[Xf] = this[Xf] = { accessors: {} }).accessors, i = this.prototype;
    function l(h) {
      let g = gn(h);
      n[g] || (W0(i, h), n[g] = true);
    }
    return P.isArray(e) ? e.forEach(l) : l(e), this;
  }
};
$r.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
P.reduceDescriptors($r.prototype, ({ value: r2 }, e) => {
  let t = e[0].toUpperCase() + e.slice(1);
  return { get: () => r2, set(n) {
    this[t] = n;
  } };
});
P.freezeMethods($r);
var rt = $r;
function yn(r2, e) {
  let t = this || jr, n = e || t, i = rt.from(n.headers), l = n.data;
  return P.forEach(r2, function(g) {
    l = g.call(t, l, i.normalize(), e ? e.status : void 0);
  }), i.normalize(), l;
}
function vn(r2) {
  return !!(r2 && r2.__CANCEL__);
}
function el(r2, e, t) {
  pe.call(this, r2 == null ? "canceled" : r2, pe.ERR_CANCELED, e, t), this.name = "CanceledError";
}
P.inherits(el, pe, { __CANCEL__: true });
var _t = el;
function wn(r2, e, t) {
  let n = t.config.validateStatus;
  !t.status || !n || n(t.status) ? r2(t) : e(new pe("Request failed with status code " + t.status, [pe.ERR_BAD_REQUEST, pe.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4], t.config, t.request, t));
}
function Oo(r2) {
  let e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(r2);
  return e && e[1] || "";
}
function q0(r2, e) {
  r2 = r2 || 10;
  let t = new Array(r2), n = new Array(r2), i = 0, l = 0, h;
  return e = e !== void 0 ? e : 1e3, function(v) {
    let b = Date.now(), x = n[l];
    h || (h = b), t[i] = v, n[i] = b;
    let A = l, O = 0;
    for (; A !== i; )
      O += t[A++], A = A % r2;
    if (i = (i + 1) % r2, i === l && (l = (l + 1) % r2), b - h < e)
      return;
    let k = x && b - x;
    return k ? Math.round(O * 1e3 / k) : void 0;
  };
}
var tl = q0;
function z0(r2, e) {
  let t = 0, n = 1e3 / e, i, l, h = (b, x = Date.now()) => {
    t = x, i = null, l && (clearTimeout(l), l = null), r2.apply(null, b);
  };
  return [(...b) => {
    let x = Date.now(), A = x - t;
    A >= n ? h(b, x) : (i = b, l || (l = setTimeout(() => {
      l = null, h(i);
    }, n - A)));
  }, () => i && h(i)];
}
var rl = z0;
var Vr = (r2, e, t = 3) => {
  let n = 0, i = tl(50, 250);
  return rl((l) => {
    let h = l.loaded, g = l.lengthComputable ? l.total : void 0, v = h - n, b = i(v), x = h <= g;
    n = h;
    let A = { loaded: h, total: g, progress: g ? h / g : void 0, bytes: v, rate: b || void 0, estimated: b && g && x ? (g - h) / b : void 0, event: l, lengthComputable: g != null, [e ? "download" : "upload"]: true };
    r2(A);
  }, t);
}, Po = (r2, e) => {
  let t = r2 != null;
  return [(n) => e[0]({ lengthComputable: t, total: r2, loaded: n }), e[1]];
}, Co = (r2) => (...e) => P.asap(() => r2(...e));
var nl = it.hasStandardBrowserEnv ? function() {
  let e = /(msie|trident)/i.test(navigator.userAgent), t = document.createElement("a"), n;
  function i(l) {
    let h = l;
    return e && (t.setAttribute("href", h), h = t.href), t.setAttribute("href", h), { href: t.href, protocol: t.protocol ? t.protocol.replace(/:$/, "") : "", host: t.host, search: t.search ? t.search.replace(/^\?/, "") : "", hash: t.hash ? t.hash.replace(/^#/, "") : "", hostname: t.hostname, port: t.port, pathname: t.pathname.charAt(0) === "/" ? t.pathname : "/" + t.pathname };
  }
  return n = i(window.location.href), function(h) {
    let g = P.isString(h) ? i(h) : h;
    return g.protocol === n.protocol && g.host === n.host;
  };
}() : function() {
  return function() {
    return true;
  };
}();
var il = it.hasStandardBrowserEnv ? { write(r2, e, t, n, i, l) {
  let h = [r2 + "=" + encodeURIComponent(e)];
  P.isNumber(t) && h.push("expires=" + new Date(t).toGMTString()), P.isString(n) && h.push("path=" + n), P.isString(i) && h.push("domain=" + i), l === true && h.push("secure"), document.cookie = h.join("; ");
}, read(r2) {
  let e = document.cookie.match(new RegExp("(^|;\\s*)(" + r2 + ")=([^;]*)"));
  return e ? decodeURIComponent(e[3]) : null;
}, remove(r2) {
  this.write(r2, "", Date.now() - 864e5);
} } : { write() {
}, read() {
  return null;
}, remove() {
} };
function No(r2) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r2);
}
function ko(r2, e) {
  return e ? r2.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : r2;
}
function bn(r2, e) {
  return r2 && !No(e) ? ko(r2, e) : e;
}
var ol = (r2) => r2 instanceof rt ? { ...r2 } : r2;
function yt(r2, e) {
  e = e || {};
  let t = {};
  function n(b, x, A) {
    return P.isPlainObject(b) && P.isPlainObject(x) ? P.merge.call({ caseless: A }, b, x) : P.isPlainObject(x) ? P.merge({}, x) : P.isArray(x) ? x.slice() : x;
  }
  function i(b, x, A) {
    if (P.isUndefined(x)) {
      if (!P.isUndefined(b))
        return n(void 0, b, A);
    } else
      return n(b, x, A);
  }
  function l(b, x) {
    if (!P.isUndefined(x))
      return n(void 0, x);
  }
  function h(b, x) {
    if (P.isUndefined(x)) {
      if (!P.isUndefined(b))
        return n(void 0, b);
    } else
      return n(void 0, x);
  }
  function g(b, x, A) {
    if (A in e)
      return n(b, x);
    if (A in r2)
      return n(void 0, b);
  }
  let v = { url: l, method: l, data: l, baseURL: h, transformRequest: h, transformResponse: h, paramsSerializer: h, timeout: h, timeoutMessage: h, withCredentials: h, withXSRFToken: h, adapter: h, responseType: h, xsrfCookieName: h, xsrfHeaderName: h, onUploadProgress: h, onDownloadProgress: h, decompress: h, maxContentLength: h, maxBodyLength: h, beforeRedirect: h, transport: h, httpAgent: h, httpsAgent: h, cancelToken: h, socketPath: h, responseEncoding: h, validateStatus: g, headers: (b, x) => i(ol(b), ol(x), true) };
  return P.forEach(Object.keys(Object.assign({}, r2, e)), function(x) {
    let A = v[x] || i, O = A(r2[x], e[x], x);
    P.isUndefined(O) && A !== g || (t[x] = O);
  }), t;
}
var hi = (r2) => {
  let e = yt({}, r2), { data: t, withXSRFToken: n, xsrfHeaderName: i, xsrfCookieName: l, headers: h, auth: g } = e;
  e.headers = h = rt.from(h), e.url = mn(bn(e.baseURL, e.url), r2.params, r2.paramsSerializer), g && h.set("Authorization", "Basic " + btoa((g.username || "") + ":" + (g.password ? unescape(encodeURIComponent(g.password)) : "")));
  let v;
  if (P.isFormData(t)) {
    if (it.hasStandardBrowserEnv || it.hasStandardBrowserWebWorkerEnv)
      h.setContentType(void 0);
    else if ((v = h.getContentType()) !== false) {
      let [b, ...x] = v ? v.split(";").map((A) => A.trim()).filter(Boolean) : [];
      h.setContentType([b || "multipart/form-data", ...x].join("; "));
    }
  }
  if (it.hasStandardBrowserEnv && (n && P.isFunction(n) && (n = n(e)), n || n !== false && nl(e.url))) {
    let b = i && l && il.read(l);
    b && h.set(i, b);
  }
  return e;
};
var j0 = typeof XMLHttpRequest != "undefined", sl = j0 && function(r2) {
  return new Promise(function(t, n) {
    let i = hi(r2), l = i.data, h = rt.from(i.headers).normalize(), { responseType: g, onUploadProgress: v, onDownloadProgress: b } = i, x, A, O, k, N;
    function q() {
      k && k(), N && N(), i.cancelToken && i.cancelToken.unsubscribe(x), i.signal && i.signal.removeEventListener("abort", x);
    }
    let C = new XMLHttpRequest();
    C.open(i.method.toUpperCase(), i.url, true), C.timeout = i.timeout;
    function J() {
      if (!C)
        return;
      let T = rt.from("getAllResponseHeaders" in C && C.getAllResponseHeaders()), L = { data: !g || g === "text" || g === "json" ? C.responseText : C.response, status: C.status, statusText: C.statusText, headers: T, config: r2, request: C };
      wn(function(V) {
        t(V), q();
      }, function(V) {
        n(V), q();
      }, L), C = null;
    }
    "onloadend" in C ? C.onloadend = J : C.onreadystatechange = function() {
      !C || C.readyState !== 4 || C.status === 0 && !(C.responseURL && C.responseURL.indexOf("file:") === 0) || setTimeout(J);
    }, C.onabort = function() {
      C && (n(new pe("Request aborted", pe.ECONNABORTED, r2, C)), C = null);
    }, C.onerror = function() {
      n(new pe("Network Error", pe.ERR_NETWORK, r2, C)), C = null;
    }, C.ontimeout = function() {
      let I = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded", L = i.transitional || li;
      i.timeoutErrorMessage && (I = i.timeoutErrorMessage), n(new pe(I, L.clarifyTimeoutError ? pe.ETIMEDOUT : pe.ECONNABORTED, r2, C)), C = null;
    }, l === void 0 && h.setContentType(null), "setRequestHeader" in C && P.forEach(h.toJSON(), function(I, L) {
      C.setRequestHeader(L, I);
    }), P.isUndefined(i.withCredentials) || (C.withCredentials = !!i.withCredentials), g && g !== "json" && (C.responseType = i.responseType), b && ([O, N] = Vr(b, true), C.addEventListener("progress", O)), v && C.upload && ([A, k] = Vr(v), C.upload.addEventListener("progress", A), C.upload.addEventListener("loadend", k)), (i.cancelToken || i.signal) && (x = (T) => {
      C && (n(!T || T.type ? new _t(null, r2, C) : T), C.abort(), C = null);
    }, i.cancelToken && i.cancelToken.subscribe(x), i.signal && (i.signal.aborted ? x() : i.signal.addEventListener("abort", x)));
    let K = Oo(i.url);
    if (K && it.protocols.indexOf(K) === -1) {
      n(new pe("Unsupported protocol " + K + ":", pe.ERR_BAD_REQUEST, r2));
      return;
    }
    C.send(l || null);
  });
};
var $0 = (r2, e) => {
  let t = new AbortController(), n, i = function(v) {
    if (!n) {
      n = true, h();
      let b = v instanceof Error ? v : this.reason;
      t.abort(b instanceof pe ? b : new _t(b instanceof Error ? b.message : b));
    }
  }, l = e && setTimeout(() => {
    i(new pe(`timeout ${e} of ms exceeded`, pe.ETIMEDOUT));
  }, e), h = () => {
    r2 && (l && clearTimeout(l), l = null, r2.forEach((v) => {
      v && (v.removeEventListener ? v.removeEventListener("abort", i) : v.unsubscribe(i));
    }), r2 = null);
  };
  r2.forEach((v) => v && v.addEventListener && v.addEventListener("abort", i));
  let { signal: g } = t;
  return g.unsubscribe = h, [g, () => {
    l && clearTimeout(l), l = null;
  }];
}, al = $0;
var V0 = function* (r2, e) {
  let t = r2.byteLength;
  if (!e || t < e) {
    yield r2;
    return;
  }
  let n = 0, i;
  for (; n < t; )
    i = n + e, yield r2.slice(n, i), n = i;
}, Y0 = async function* (r2, e, t) {
  for await (let n of r2)
    yield* V0(ArrayBuffer.isView(n) ? n : await t(String(n)), e);
}, Uo = (r2, e, t, n, i) => {
  let l = Y0(r2, e, i), h = 0, g, v = (b) => {
    g || (g = true, n && n(b));
  };
  return new ReadableStream({ async pull(b) {
    try {
      let { done: x, value: A } = await l.next();
      if (x) {
        v(), b.close();
        return;
      }
      let O = A.byteLength;
      if (t) {
        let k = h += O;
        t(k);
      }
      b.enqueue(new Uint8Array(A));
    } catch (x) {
      throw v(x), x;
    }
  }, cancel(b) {
    return v(b), l.return();
  } }, { highWaterMark: 2 });
};
var di = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", ll = di && typeof ReadableStream == "function", Bo = di && (typeof TextEncoder == "function" ? ((r2) => (e) => r2.encode(e))(new TextEncoder()) : async (r2) => new Uint8Array(await new Response(r2).arrayBuffer())), ul = (r2, ...e) => {
  try {
    return !!r2(...e);
  } catch (t) {
    return false;
  }
}, K0 = ll && ul(() => {
  let r2 = false, e = new Request(it.origin, { body: new ReadableStream(), method: "POST", get duplex() {
    return r2 = true, "half";
  } }).headers.has("Content-Type");
  return r2 && !e;
}), fl = 64 * 1024, Ro = ll && ul(() => P.isReadableStream(new Response("").body)), pi = { stream: Ro && ((r2) => r2.body) };
di && ((r2) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !pi[e] && (pi[e] = P.isFunction(r2[e]) ? (t) => t[e]() : (t, n) => {
      throw new pe(`Response type '${e}' is not supported`, pe.ERR_NOT_SUPPORT, n);
    });
  });
})(new Response());
var G0 = async (r2) => {
  if (r2 == null)
    return 0;
  if (P.isBlob(r2))
    return r2.size;
  if (P.isSpecCompliantForm(r2))
    return (await new Request(r2).arrayBuffer()).byteLength;
  if (P.isArrayBufferView(r2) || P.isArrayBuffer(r2))
    return r2.byteLength;
  if (P.isURLSearchParams(r2) && (r2 = r2 + ""), P.isString(r2))
    return (await Bo(r2)).byteLength;
}, H0 = async (r2, e) => {
  let t = P.toFiniteNumber(r2.getContentLength());
  return t == null ? G0(e) : t;
}, cl = di && (async (r2) => {
  let { url: e, method: t, data: n, signal: i, cancelToken: l, timeout: h, onDownloadProgress: g, onUploadProgress: v, responseType: b, headers: x, withCredentials: A = "same-origin", fetchOptions: O } = hi(r2);
  b = b ? (b + "").toLowerCase() : "text";
  let [k, N] = i || l || h ? al([i, l], h) : [], q, C, J = () => {
    !q && setTimeout(() => {
      k && k.unsubscribe();
    }), q = true;
  }, K;
  try {
    if (v && K0 && t !== "get" && t !== "head" && (K = await H0(x, n)) !== 0) {
      let W = new Request(e, { method: "POST", body: n, duplex: "half" }), V;
      if (P.isFormData(n) && (V = W.headers.get("content-type")) && x.setContentType(V), W.body) {
        let [fe, ee] = Po(K, Vr(Co(v)));
        n = Uo(W.body, fl, fe, ee, Bo);
      }
    }
    P.isString(A) || (A = A ? "include" : "omit"), C = new Request(e, { ...O, signal: k, method: t.toUpperCase(), headers: x.normalize().toJSON(), body: n, duplex: "half", credentials: A });
    let T = await fetch(C), I = Ro && (b === "stream" || b === "response");
    if (Ro && (g || I)) {
      let W = {};
      ["status", "statusText", "headers"].forEach((Z) => {
        W[Z] = T[Z];
      });
      let V = P.toFiniteNumber(T.headers.get("content-length")), [fe, ee] = g && Po(V, Vr(Co(g), true)) || [];
      T = new Response(Uo(T.body, fl, fe, () => {
        ee && ee(), I && J();
      }, Bo), W);
    }
    b = b || "text";
    let L = await pi[P.findKey(pi, b) || "text"](T, r2);
    return !I && J(), N && N(), await new Promise((W, V) => {
      wn(W, V, { data: L, headers: rt.from(T.headers), status: T.status, statusText: T.statusText, config: r2, request: C });
    });
  } catch (T) {
    throw J(), T && T.name === "TypeError" && /fetch/i.test(T.message) ? Object.assign(new pe("Network Error", pe.ERR_NETWORK, r2, C), { cause: T.cause || T }) : pe.from(T, T && T.code, r2, C);
  }
});
var Fo = { http: ai, xhr: sl, fetch: cl };
P.forEach(Fo, (r2, e) => {
  if (r2) {
    try {
      Object.defineProperty(r2, "name", { value: e });
    } catch (t) {
    }
    Object.defineProperty(r2, "adapterName", { value: e });
  }
});
var hl = (r2) => `- ${r2}`, J0 = (r2) => P.isFunction(r2) || r2 === null || r2 === false, mi = { getAdapter: (r2) => {
  r2 = P.isArray(r2) ? r2 : [r2];
  let { length: e } = r2, t, n, i = {};
  for (let l = 0; l < e; l++) {
    t = r2[l];
    let h;
    if (n = t, !J0(t) && (n = Fo[(h = String(t)).toLowerCase()], n === void 0))
      throw new pe(`Unknown adapter '${h}'`);
    if (n)
      break;
    i[h || "#" + l] = n;
  }
  if (!n) {
    let l = Object.entries(i).map(([g, v]) => `adapter ${g} ` + (v === false ? "is not supported by the environment" : "is not available in the build")), h = e ? l.length > 1 ? `since :
` + l.map(hl).join(`
`) : " " + hl(l[0]) : "as no adapter specified";
    throw new pe("There is no suitable adapter to dispatch the request " + h, "ERR_NOT_SUPPORT");
  }
  return n;
}, adapters: Fo };
function Do(r2) {
  if (r2.cancelToken && r2.cancelToken.throwIfRequested(), r2.signal && r2.signal.aborted)
    throw new _t(null, r2);
}
function gi(r2) {
  return Do(r2), r2.headers = rt.from(r2.headers), r2.data = yn.call(r2, r2.transformRequest), ["post", "put", "patch"].indexOf(r2.method) !== -1 && r2.headers.setContentType("application/x-www-form-urlencoded", false), mi.getAdapter(r2.adapter || jr.adapter)(r2).then(function(n) {
    return Do(r2), n.data = yn.call(r2, r2.transformResponse, n), n.headers = rt.from(n.headers), n;
  }, function(n) {
    return vn(n) || (Do(r2), n && n.response && (n.response.data = yn.call(r2, r2.transformResponse, n.response), n.response.headers = rt.from(n.response.headers))), Promise.reject(n);
  });
}
var yi = "1.7.4";
var Lo = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((r2, e) => {
  Lo[r2] = function(n) {
    return typeof n === r2 || "a" + (e < 1 ? "n " : " ") + r2;
  };
});
var pl = {};
Lo.transitional = function(e, t, n) {
  function i(l, h) {
    return "[Axios v" + yi + "] Transitional option '" + l + "'" + h + (n ? ". " + n : "");
  }
  return (l, h, g) => {
    if (e === false)
      throw new pe(i(h, " has been removed" + (t ? " in " + t : "")), pe.ERR_DEPRECATED);
    return t && !pl[h] && (pl[h] = true, console.warn(i(h, " has been deprecated since v" + t + " and will be removed in the near future"))), e ? e(l, h, g) : true;
  };
};
function Z0(r2, e, t) {
  if (typeof r2 != "object")
    throw new pe("options must be an object", pe.ERR_BAD_OPTION_VALUE);
  let n = Object.keys(r2), i = n.length;
  for (; i-- > 0; ) {
    let l = n[i], h = e[l];
    if (h) {
      let g = r2[l], v = g === void 0 || h(g, l, r2);
      if (v !== true)
        throw new pe("option " + l + " must be " + v, pe.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== true)
      throw new pe("Unknown option " + l, pe.ERR_BAD_OPTION);
  }
}
var vi = { assertOptions: Z0, validators: Lo };
var jt = vi.validators, Yr = class {
  constructor(e) {
    this.defaults = e, this.interceptors = { request: new Ao(), response: new Ao() };
  }
  async request(e, t) {
    try {
      return await this._request(e, t);
    } catch (n) {
      if (n instanceof Error) {
        let i;
        Error.captureStackTrace ? Error.captureStackTrace(i = {}) : i = new Error();
        let l = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? l && !String(n.stack).endsWith(l.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + l) : n.stack = l;
        } catch (h) {
        }
      }
      throw n;
    }
  }
  _request(e, t) {
    typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = yt(this.defaults, t);
    let { transitional: n, paramsSerializer: i, headers: l } = t;
    n !== void 0 && vi.assertOptions(n, { silentJSONParsing: jt.transitional(jt.boolean), forcedJSONParsing: jt.transitional(jt.boolean), clarifyTimeoutError: jt.transitional(jt.boolean) }, false), i != null && (P.isFunction(i) ? t.paramsSerializer = { serialize: i } : vi.assertOptions(i, { encode: jt.function, serialize: jt.function }, true)), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let h = l && P.merge(l.common, l[t.method]);
    l && P.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (N) => {
      delete l[N];
    }), t.headers = rt.concat(h, l);
    let g = [], v = true;
    this.interceptors.request.forEach(function(q) {
      typeof q.runWhen == "function" && q.runWhen(t) === false || (v = v && q.synchronous, g.unshift(q.fulfilled, q.rejected));
    });
    let b = [];
    this.interceptors.response.forEach(function(q) {
      b.push(q.fulfilled, q.rejected);
    });
    let x, A = 0, O;
    if (!v) {
      let N = [gi.bind(this), void 0];
      for (N.unshift.apply(N, g), N.push.apply(N, b), O = N.length, x = Promise.resolve(t); A < O; )
        x = x.then(N[A++], N[A++]);
      return x;
    }
    O = g.length;
    let k = t;
    for (A = 0; A < O; ) {
      let N = g[A++], q = g[A++];
      try {
        k = N(k);
      } catch (C) {
        q.call(this, C);
        break;
      }
    }
    try {
      x = gi.call(this, k);
    } catch (N) {
      return Promise.reject(N);
    }
    for (A = 0, O = b.length; A < O; )
      x = x.then(b[A++], b[A++]);
    return x;
  }
  getUri(e) {
    e = yt(this.defaults, e);
    let t = bn(e.baseURL, e.url);
    return mn(t, e.params, e.paramsSerializer);
  }
};
P.forEach(["delete", "get", "head", "options"], function(e) {
  Yr.prototype[e] = function(t, n) {
    return this.request(yt(n || {}, { method: e, url: t, data: (n || {}).data }));
  };
});
P.forEach(["post", "put", "patch"], function(e) {
  function t(n) {
    return function(l, h, g) {
      return this.request(yt(g || {}, { method: e, headers: n ? { "Content-Type": "multipart/form-data" } : {}, url: l, data: h }));
    };
  }
  Yr.prototype[e] = t(), Yr.prototype[e + "Form"] = t(true);
});
var xn = Yr;
var Wo = class r {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(l) {
      t = l;
    });
    let n = this;
    this.promise.then((i) => {
      if (!n._listeners)
        return;
      let l = n._listeners.length;
      for (; l-- > 0; )
        n._listeners[l](i);
      n._listeners = null;
    }), this.promise.then = (i) => {
      let l, h = new Promise((g) => {
        n.subscribe(g), l = g;
      }).then(i);
      return h.cancel = function() {
        n.unsubscribe(l);
      }, h;
    }, e(function(l, h, g) {
      n.reason || (n.reason = new _t(l, h, g), t(n.reason));
    });
  }
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  unsubscribe(e) {
    if (!this._listeners)
      return;
    let t = this._listeners.indexOf(e);
    t !== -1 && this._listeners.splice(t, 1);
  }
  static source() {
    let e;
    return { token: new r(function(i) {
      e = i;
    }), cancel: e };
  }
}, dl = Wo;
function qo(r2) {
  return function(t) {
    return r2.apply(null, t);
  };
}
function zo(r2) {
  return P.isObject(r2) && r2.isAxiosError === true;
}
var jo = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511 };
Object.entries(jo).forEach(([r2, e]) => {
  jo[e] = r2;
});
var ml = jo;
function gl(r2) {
  let e = new xn(r2), t = hn(xn.prototype.request, e);
  return P.extend(t, xn.prototype, e, { allOwnKeys: true }), P.extend(t, e, null, { allOwnKeys: true }), t.create = function(i) {
    return gl(yt(r2, i));
  }, t;
}
var et = gl(jr);
et.Axios = xn;
et.CanceledError = _t;
et.CancelToken = dl;
et.isCancel = vn;
et.VERSION = yi;
et.toFormData = zt;
et.AxiosError = pe;
et.Cancel = et.CanceledError;
et.all = function(e) {
  return Promise.all(e);
};
et.spread = qo;
et.isAxiosError = zo;
et.mergeConfig = yt;
et.AxiosHeaders = rt;
et.formToJSON = (r2) => ui(P.isHTMLForm(r2) ? new FormData(r2) : r2);
et.getAdapter = mi.getAdapter;
et.HttpStatusCode = ml;
et.default = et;
var Ut = et;
var vt = { errors: { disconnected: () => "UXUYWallet: Disconnected from chain. Attempting to connect.", permanentlyDisconnected: () => "UXUYWallet: Disconnected from UXUYWallet background. Page reload required.", sendSiteMetadata: () => "UXUYWallet: Failed to send site metadata. This is an internal error, please report this bug.", unsupportedSync: (r2) => `UXUYWallet: The UXUYWallet Ethereum provider does not support synchronous methods like ${r2} without a callback parameter.`, invalidDuplexStream: () => "Must provide a Node.js-style duplex stream.", invalidNetworkParams: () => "UXUYWallet: Received invalid network parameters. Please report this bug.", invalidRequestArgs: () => "Expected a single, non-array, object argument.", invalidRequestMethod: () => "'args.method' must be a non-empty string.", invalidRequestParams: () => "'args.params' must be an object or array if provided.", invalidLoggerObject: () => "'args.logger' must be an object if provided.", invalidLoggerMethod: (r2) => `'args.logger' must include required method '${r2}'.`, invalidChains: (r2) => `'UXUYWallet: not supported chain with ID '${r2}'. try connect wallet to supported chain.`, timeOut: (r2) => `'UXUYWallet: Timed out while waiting for response from '${r2}'.`, unAuthorizedChain: (r2) => `UXUYWallet: not authorized chain with ID '${r2}'. try connect wallet to authorized chain.` }, info: { connected: (r2) => `UXUYWallet: Connected to chain with ID "${r2}".` }, warnings: { chainIdDeprecation: `UXUYWallet: 'ethereum.chainId' is deprecated and may be removed in the future. Please use the 'eth_chainId' RPC method instead.
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
For more information, see: https://github.com/UXUYWallet/UXUYWallet-improvement-proposals/blob/main/MIPs/mip-1.md and https://github.com/UXUYWallet/UXUYWallet-improvement-proposals/blob/main/PROCESS-GUIDE.md#proposal-lifecycle` }, experimentalMethods: "UXUYWallet: 'ethereum._UXUYWallet' exposes non-standard, experimental methods. They may be removed or changed without warning." } }, Et = { rpc: { timeoutRequest: -30008, invalidInput: -32e3, resourceNotFound: -32001, resourceUnavailable: -32002, transactionRejected: -32003, methodNotSupported: -32004, limitExceeded: -32005, parse: -32700, invalidRequest: -32600, methodNotFound: -32601, invalidParams: -32602, internal: -32603 }, provider: { unsupportedChain: 4002, userRejectedRequest: 4001, unauthorized: 4100, unsupportedMethod: 4200, disconnected: 4900, chainDisconnected: 4901, unAuthorizedChain: 4902 } }, Q0 = { "-32700": { standard: "JSON RPC 2.0", message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text." }, "-32600": { standard: "JSON RPC 2.0", message: "The JSON sent is not a valid Request object." }, "-32601": { standard: "JSON RPC 2.0", message: "The method does not exist / is not available." }, "-32602": { standard: "JSON RPC 2.0", message: "Invalid method parameter(s)." }, "-32603": { standard: "JSON RPC 2.0", message: "Internal JSON-RPC error." }, "-32000": { standard: "EIP-1474", message: "Invalid input." }, "-32001": { standard: "EIP-1474", message: "Resource not found." }, "-32002": { standard: "EIP-1474", message: "Resource unavailable." }, "-32003": { standard: "EIP-1474", message: "Transaction rejected." }, "-32004": { standard: "EIP-1474", message: "Method not supported." }, "-32005": { standard: "EIP-1474", message: "Request limit exceeded." }, 4001: { standard: "EIP-1193", message: "User rejected the request." }, 4100: { standard: "EIP-1193", message: "The requested account and/or method has not been authorized by the user." }, 4200: { standard: "EIP-1193", message: "The requested method is not supported by this Ethereum provider." }, 4900: { standard: "EIP-1193", message: "The provider is disconnected from all chains." }, 4901: { standard: "EIP-1193", message: "The provider is disconnected from the specified chain." } }, yl = "Unspecified error message. This is a bug, please report it.", St = { invalidRequest: function({ code: r2, message: e, data: t }) {
  return r2 = (r2 || Et.rpc.invalidRequest).toString(), { code: r2, message: e || Q0[r2].message || yl, data: t };
}, methodNotSupported: function({ code: r2, message: e, data: t }) {
  return { code: Et.rpc.invalidRequest, message: yl, data: t };
} };
function Kr(r2) {
  var t;
  let e = window.location.hostname;
  try {
    e = ((t = new URL((r2 == null ? void 0 : r2.url) || "")) == null ? void 0 : t.hostname) || e;
  } catch (n) {
    console.warn(`new URL(${r2 == null ? void 0 : r2.url}) error`);
  }
  return { url: (r2 == null ? void 0 : r2.url) || location.href, hostname: e, name: (r2 == null ? void 0 : r2.name) || X0(window), icon: (r2 == null ? void 0 : r2.icon) || ep(window), direct_link: r2 == null ? void 0 : r2.direct_link, description: r2 == null ? void 0 : r2.description };
}
function X0(r2) {
  let { document: e } = r2, t = e.querySelector('head > meta[property="og:site_name"]');
  if (t)
    return t.content;
  let n = e.querySelector('head > meta[name="title"]');
  return n ? n.content : e.title && e.title.length > 0 ? e.title : window.location.hostname;
}
function ep(r2) {
  let { document: e } = r2, t = e.querySelectorAll('head > link[rel~="icon"]');
  for (let n of Array.from(t))
    if (n)
      return n.href;
  return null;
}
function tp(r2) {
  let e = { type: "object", properties: { types: { type: "object", additionalProperties: { type: "array", items: { type: "object", properties: { name: { type: "string" }, type: { type: "string" } }, required: ["name", "type"] } } }, primaryType: { type: "string" }, domain: { type: "object" }, message: { type: "object" } }, required: ["types", "primaryType", "domain", "message"] }, t = {};
  for (let n in e.properties)
    r2[n] && (t[n] = r2[n]);
  return "types" in t && (t.types = Object.assign({ EIP712Domain: [] }, t.types)), t;
}
function vl(r2) {
  try {
    r2 = typeof r2 == "string" ? JSON.parse(r2) : r2;
  } catch (e) {
    console.log("EIP712Data is not a valid JSON string");
  }
  try {
    r2 = tp(r2);
    let e = {};
    return r2.types[r2.primaryType].map(({ name: n }) => {
      e[n] = r2.message[n];
    }), r2.message = e, r2;
  } catch (e) {
    console.error("parseEIP712 error");
  }
  return r2;
}
function $o(r2 = "") {
  return r2.length === 2 + 20 * 2;
}
var Mn = class {
  constructor(e) {
    this.protocol = e;
    this.prefix = `tg-uxuy-wallet-${e}`;
  }
  get(e) {
    try {
      let t = localStorage.getItem(`${this.prefix}${e}`);
      return t ? JSON.parse(t) : null;
    } catch (t) {
      return console.error(t), null;
    }
  }
  set(e, t) {
    try {
      return localStorage.setItem(`${this.prefix}${e}`, JSON.stringify(t)), t;
    } catch (n) {
      return null;
    }
  }
}, wi = ["evm", "sol"];
function wl(r2, e) {
  let t = {};
  return r2 && Object.keys(r2).forEach((n) => {
    var i;
    e.includes((i = r2[n]) == null ? void 0 : i.alliance) && (t[n] = r2[n]);
  }), t;
}
var Bt = class extends Pn {
  constructor({ protocol: t }) {
    super();
    this.protocol = t, this.storage = new Mn(t);
  }
  getAppInfo() {
    return { ...ct };
  }
  storeAllAccounts(t) {
    let n = wl(t, wi);
    return wi.map((l) => new Mn(l)).forEach((l, h) => {
      l.set("accounts", wl(t, [wi[h]]));
    }), n;
  }
  storeAccount(t) {
    wi.filter((l) => l !== this.protocol).map((l) => new Mn(l)).forEach((l) => {
      let h = l.get("account"), g = l.get("accounts");
      if (h) {
        let v = h.chainKey, b = g[v];
        b && l.set("account", b);
      } else {
        let v = Object.values(g)[0];
        v && l.set("account", v);
      }
    });
  }
};
var Yo = pr(Gn());
var bl = 0, rp = (() => function(r2 = 60 * 1e3) {
  return (/* @__PURE__ */ new Date()).getTime() - bl > r2 ? () => {
    bl = (/* @__PURE__ */ new Date()).getTime();
  } : false;
})(), An = rp;
var xl = (0, Yo.debug)("uxuy:EthereumProvider"), np = (0, Yo.debug)("uxuy:EthereumProvider:error");
function Tt(r2 = 0) {
  return r2 = isNaN(Number(r2)) ? 1 : Number(r2), "0x" + r2.toString(16);
}
var Gr = { address: "", chainId: "0x1", chainKey: "ethereum", alliance: "evm", chainName: "Ethereum netWork", chainSymbol: "ETH" }, Vo = class {
  constructor(e) {
    this.options = e, this.rpcMap = /* @__PURE__ */ new Map(), this.peddingMap = /* @__PURE__ */ new Map(), e != null && e.chainId && this.setUrl(e.url, e.chainId);
  }
  setUrl(e, t) {
    this.rpcMap.set(parseInt(t), e);
  }
  getUrl(e) {
    return this.rpcMap.get(parseInt(e));
  }
  async send(e, t) {
    let { method: n, params: i, id: l } = e, h = t.rpcUrl || this.getUrl(t.chainId), g = { jsonrpc: "2.0", method: n, params: i, id: l || (/* @__PURE__ */ new Date()).getTime() }, v = await Ut.post(h, g), { result: b, error: x } = v.data;
    if (x)
      throw new Error(x);
    return v.data.result;
  }
  async sendBatch(e, t = {}) {
    let n = [];
    for (let i of e) {
      let l = await this.send(i, t);
      n.push(l);
    }
    return n;
  }
};
function ip(r2, e = "evm") {
  return r2 && Object.keys(r2).forEach((t) => {
    var n;
    ((n = r2[t]) == null ? void 0 : n.alliance) != e && delete r2[t];
  }), r2;
}
function op(r2) {
  var h, g;
  xl("ProxyResponse", r2);
  let { method: e, config: t, params: n, result: i } = r2 || {}, l = ((h = t == null ? void 0 : t.params) == null ? void 0 : h[0]) || {};
  if (t) {
    let v = this.storeAllAccounts(t == null ? void 0 : t.accounts);
    switch (e) {
      case "wallet_switchEthereumChain":
      case "wallet_addEthereumChain":
        let b = Object.values(this._accounts || {}).find((x) => Tt(x.chainId) === Tt(l.chainId));
        b ? this._account = { ...b } : r2.error = { code: -32602, message: `uxuy wallet does not support  ${l == null ? void 0 : l.chainId}` };
        break;
      case "eth_requestAccounts":
        this.storeAccount(v), this._account = this._accounts[(g = this._account) == null ? void 0 : g.chainKey] || Object.values(this._accounts)[0];
        break;
    }
    return r2;
  }
}
var bi = (() => {
  let r2 = /* @__PURE__ */ new Map(), e = (/* @__PURE__ */ new Date()).getTime();
  return async (t, n, i = 1e3) => {
    let l = (/* @__PURE__ */ new Date()).getTime();
    if (l - e < 500 && (e = l, await new Promise((g) => setTimeout(g, 500 - (l - e)))), r2.has(t))
      return r2.has(t);
    let h = n();
    return r2.set(t, h), setTimeout(() => {
      r2.delete(t);
    }, i), h.finally(() => {
      r2.delete(t);
    });
  };
})(), xi = class extends Bt {
  constructor(t) {
    super({ protocol: "evm" });
    this._isUnlocked = true;
    this._initialized = false;
    this.autoRefreshOnNetworkChange = true;
    this._isMetaMask = true;
    this.isMetaMask = true;
    this._isConnected = false;
    this.isUxuyWallet = true;
    this.isInUxuyApp = At();
    this.version = this.getAppInfo().version, this.connectUrl = t.connect, this.bridgeUrl = t.bridge, this.connect_direct_link = t.connect_direct_link, this.request_timeout = (t == null ? void 0 : t.request_timeout) || 6e4 * 10, this.metaData = t == null ? void 0 : t.metaData, this.debug = (t == null ? void 0 : t.debug) || false, this.logger = xl, this.error = np, this._metamask = { isUnlocked: function() {
      return new Promise((n, i) => n(true));
    } }, this.httpProvider = new Vo({ chainId: "0x1", url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" }), this.request = this.request.bind(this), this._initialize();
  }
  get _lastTime() {
    return isNaN(Number(this.storage.get("lastTime") || 0)) ? 0 : Number(this.storage.get("lastTime") || 0);
  }
  set _lastTime(t) {
    this.storage.set("lastTime", t);
  }
  get _account() {
    return this.storage.get("account") || Gr;
  }
  set _account(t) {
    let n = { ...this._account || Gr };
    t || (t = { ...n, address: "" }), this.storage.set("account", t), Tt(n == null ? void 0 : n.chainId) != Tt(t == null ? void 0 : t.chainId) && (this.emit("chainChanged", this == null ? void 0 : this.chainId, t == null ? void 0 : t.alliance, t), this.emit("networkChanged", parseInt(this == null ? void 0 : this.chainId), t == null ? void 0 : t.alliance)), (n == null ? void 0 : n.address) != (t == null ? void 0 : t.address) && this.emit("accountsChanged", t != null && t.address ? [t == null ? void 0 : t.address] : []);
  }
  get _accounts() {
    return this.storage.get("accounts") || { ethereum: Gr };
  }
  set _accounts(t) {
    this.storage.set("accounts", ip(t));
  }
  get networkVersion() {
    return parseInt(this.chainId);
  }
  get chainId() {
    var t, n;
    return (t = this._account) != null && t.chainId ? Tt((n = this._account) == null ? void 0 : n.chainId) : null;
  }
  get chainKey() {
    var t;
    return ((t = this._account) == null ? void 0 : t.chainKey) || (Gr == null ? void 0 : Gr.chainKey);
  }
  get connected() {
    var t;
    return !!((t = this._account) != null && t.address);
  }
  get selectedAddress() {
    var t;
    return ((t = this._account) == null ? void 0 : t.address) || "";
  }
  _initialize() {
    this._isConnected = true, this._isUnlocked = true, this._initialized = true, this.emit("connect", { chainId: this == null ? void 0 : this.chainId }), this.emit("_initialized");
  }
  async _walletSwitchChain(t) {
    let { method: n, params: i } = t, l = i[0], h = Object.values(this._accounts || {}).find((g) => Tt(g.chainId) === Tt(l.chainId));
    if (!h)
      if (n == "wallet_addEthereumChain") {
        if (await this._request("DAPP_EXT_METHOD", [t]), h = Object.values(this._accounts || {}).find((g) => Tt(g.chainId) === Tt(l.chainId)), !h)
          throw St.invalidRequest({ code: Et.provider.unsupportedChain, message: vt.errors.invalidChains(l == null ? void 0 : l.chainId), data: i });
      } else
        throw St.invalidRequest({ code: Et.provider.unAuthorizedChain, message: vt.errors.unAuthorizedChain(l == null ? void 0 : l.chainId), data: i });
    return this._account = h, null;
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
  async request(t) {
    var h, g, v, b, x, A;
    let { method: n, params: i = [] } = t || {}, l = (t == null ? void 0 : t.options) || {};
    if (this.logger("request", ...arguments), !t || typeof t != "object" || Array.isArray(t))
      throw St.invalidRequest({ message: vt.errors.invalidRequestArgs(), data: i });
    if (typeof n != "string" || n.length === 0)
      throw St.invalidRequest({ message: vt.errors.invalidRequestMethod(), data: t });
    try {
      let O = `${n}-${JSON.stringify(i || [])}`;
      switch (n) {
        case "eth_requestAccounts":
          let k = An();
          if ((h = this == null ? void 0 : this._account) != null && h.address && !k)
            return [this._account.address];
          let N = await bi(O, () => this._request(n, i));
          return k && (k == null || k()), N;
          break;
        case "eth_accounts":
          return [(g = this._account) == null ? void 0 : g.address];
        case "eth_chainId":
          return (v = this._account) != null && v.chainId ? Tt((b = this._account) == null ? void 0 : b.chainId) : null;
        case "wallet_switchEthereumChain":
        case "wallet_addEthereumChain":
          return this.connected || await this.request({ method: "eth_requestAccounts" }), this._walletSwitchChain({ method: n, params: i });
          break;
        case "wallet_watchAsset":
        case "metamask_watchAsset":
          let q = { method: "wallet_watchAsset", params: i };
          return bi(O, () => this._request("DAPP_EXT_METHOD", [q]));
        case "personal_sign":
        case "eth_signTypedData":
        case "eth_sendTransaction":
        case "eth_signTransaction":
          return this.connected || await this.request({ method: "eth_requestAccounts" }), bi(O, () => this._request(n, i, l));
          break;
        case "eth_signTypedData_v3":
        case "eth_signTypedData_v4":
          this.connected || await this.request({ method: "eth_requestAccounts" });
          let C = t.params[0];
          return $o(t.params[0]) && !$o(t.params[1]) && (C = t.params[1]), i[0] = vl(C), bi(O, () => this._request(n, i));
          break;
        default:
          return this.httpProvider.send(t, { chainId: this.chainId, chainKey: this.chainKey, rpcUrl: ((A = (x = this._account) == null ? void 0 : x.rpcs) == null ? void 0 : A[0]) || "" });
      }
    } catch (O) {
      return this.logger(O), O != null && O.code && (O.code = Number(O.code) || -32603), Promise.reject(typeof O == "object" ? O : { code: -32603, message: O });
    }
  }
  async _request(t, n, i) {
    var J;
    let l = this._account, h = (/* @__PURE__ */ new Date()).getTime();
    this._lastTime = h;
    let g = t == "eth_requestAccounts" && ((J = l == null ? void 0 : l.chainKey) == null ? void 0 : J.startsWith("evm_"));
    i = { account: Object.assign(l || {}, { alliance: "evm", chainKey: g ? "ethereum" : l == null ? void 0 : l.chainKey, chainId: g ? "0x1" : l == null ? void 0 : l.chainId }), metaData: Kr(this.metaData), ...i, timeStamp: h };
    let v = (/* @__PURE__ */ new Date()).getTime() + Math.floor(Math.random() * 1e3).toString(), b = `salt-${Date.now()}-${v}`, x = { id: v, method: t, params: n, options: i }, A = { id: x.id, data: x, version: "1.0", salt: b }, O = await Ut.post(`${this.connectUrl}/transaction`, A, { headers: { "X-Salt": b } }), { hash: k, signature: N } = O.data;
    this.logger({ hash: k, signature: N, salt: b });
    let q = { method: t, params: [b, k, N] }, C = await new Promise((K, T) => {
      let I = new EventSource(`${this.bridgeUrl}/events/${k}/${N}/${b}`);
      I.onopen = () => {
        I.onopen = null, K(I);
      }, I.onerror = (L) => {
        var W;
        console.error("EventSource error", L), I.onerror = null, (W = I == null ? void 0 : I.close) == null || W.call(I), T(L);
      };
    });
    return C.onerror = (K) => {
      console.error("EventSource error", K);
    }, new Promise((K, T) => {
      var V, fe;
      let I = this.request_timeout > 0 ? setTimeout(() => {
        var ee, Z;
        T(St.invalidRequest({ code: (Z = (ee = Et) == null ? void 0 : ee.rpc) == null ? void 0 : Z.timeoutRequest, message: vt.errors.timeOut(t), data: x })), C.close();
      }, this.request_timeout || 6e4) : null;
      C.addEventListener("message", (ee) => {
        var Z;
        this.logger("message.........", ee == null ? void 0 : ee.data, A);
        try {
          let ie = JSON.parse(ee == null ? void 0 : ee.data);
          this.logger("message....parse", { data: ie, publish_params: A }), (ie == null ? void 0 : ie.id) == v || b == (ie == null ? void 0 : ie.salt) ? ((Z = C == null ? void 0 : C.close) == null || Z.call(C), clearTimeout(I), (ie.reConnect || !ie.error) && op.call(this, ie), ie.error ? T(ie.error) : K(ie.result)) : this.logger("not match");
        } catch (ie) {
          this.error(ie);
        }
      });
      let L = `${this.connect_direct_link}?startapp=uxuyconnect_${Xe.encodeTelegramUrlParameters(q)}`, W = Xn();
      if (W)
        Sf() ? Xe.openAndroidLink(L) : (fe = (V = Telegram == null ? void 0 : Telegram.WebApp) == null ? void 0 : V.openTelegramLink) == null || fe.call(V, L);
      else {
        let ee = this.connect_direct_link.match(/t\.me\/([^\/]+)\/([^\/]+)/);
        ee[1] && ee[2] ? !W && Xe.opendeepLink(`uxuyconnect_${Xe.encodeTelegramUrlParameters(q)}`, { domain: ee[1], appname: ee[2] }) : !W && Xe.opendeepLink(`uxuyconnect_${Xe.encodeTelegramUrlParameters(q)}`);
      }
    });
  }
  disconnect() {
    this._account = null, this.emit("accountsChanged", []), this.emit("disconnect", "");
  }
};
var Mi = class extends Error {
  constructor(t, n, i) {
    super(n);
    this.code = t, this.description = i;
  }
};
var $t = class extends Error {
  constructor(t, n) {
    super(t);
    this.code = n;
  }
};
function Ko(r2 = 0) {
  return r2 = isNaN(Number(r2)) ? 1 : Number(r2), "0x" + r2.toString(16);
}
var Hr = { address: "", chainId: 239, chainKey: "ton", alliance: "ton", chainName: "Ton netWork", chainSymbol: "Ton" };
function Ml(r2, e = "ton") {
  return r2 && Object.keys(r2).forEach((t) => {
    var n;
    ((n = r2[t]) == null ? void 0 : n.alliance) != e && delete r2[t];
  }), r2;
}
var Ho = class {
  constructor() {
    this.prefix = "tg-uxuy-wallet-ton";
  }
  get(e) {
    try {
      let t = localStorage.getItem(`${this.prefix}${e}`);
      return t ? JSON.parse(t) : null;
    } catch (t) {
      return console.log(t), null;
    }
  }
  set(e, t) {
    try {
      return localStorage.setItem(`${this.prefix}${e}`, JSON.stringify(t)), t;
    } catch (n) {
      return null;
    }
  }
};
function sp(r2) {
  var h, g;
  console.log("ProxyResponse", r2);
  let { method: e, config: t, params: n, result: i } = r2 || {};
  ((h = t == null ? void 0 : t.params) == null ? void 0 : h[0]) || {};
  if (t) {
    let v = Ml(t == null ? void 0 : t.accounts);
    switch (v && (this._accounts = v), e) {
      case "eth_requestAccounts":
      case "DAPP_CONNECT_ACCOUNTS":
        this._account = this._accounts[(g = this._account) == null ? void 0 : g.chainKey] || Object.values(this._accounts)[0];
        break;
    }
    return r2;
  }
}
var Go = (() => {
  let r2 = /* @__PURE__ */ new Map();
  return (e, t, n = 1e3) => {
    if (r2.has(e))
      return r2.has(e);
    let i = t();
    return r2.set(e, i), setTimeout(() => {
      r2.delete(e);
    }, n), i.finally(() => {
      r2.delete(e);
    });
  };
})(), ap = (() => {
  let r2 = 0;
  return function(e = 60 * 1e3) {
    return (/* @__PURE__ */ new Date()).getTime() - r2 > e ? () => {
      r2 = (/* @__PURE__ */ new Date()).getTime();
    } : false;
  };
})(), _n = class extends Bt {
  constructor(t = window.ton, n) {
    super({ protocol: "ton" });
    this.targetOrigin = "*";
    this.nextJsonRpcId = 0;
    this.isOpenMask = true;
    this.isTonWallet = true;
    this.isTonkeeper = true;
    this.isUxuyWallet = true;
    this.isInUxuyApp = At();
    this._isUnlocked = true;
    this._initialized = false;
    this._isConnected = false;
    t && t.isUxuyWallet && (this.nextJsonRpcId = t.nextJsonRpcId, this.promises = t.promises, this.callbacks = t.callbacks), this.version = this.getAppInfo().version, this.connectUrl = n.connect, this.bridgeUrl = n.bridge, this.connect_direct_link = n.connect_direct_link, this.eventTimeout = (n == null ? void 0 : n.eventTimeout) || 6e4 * 10, this.metaData = n == null ? void 0 : n.metaData, this.storage = new Ho(), this._initialize();
  }
  get _lastTime() {
    return isNaN(Number(this.storage.get("lastTime") || 0)) ? 0 : Number(this.storage.get("lastTime") || 0);
  }
  set _lastTime(t) {
    this.storage.set("lastTime", t);
  }
  get _account() {
    return this.storage.get("account") || Hr;
  }
  set _account(t) {
    let n = { ...this._account || Hr };
    t || (t = { ...n, address: "" }, this._tonConnectReply = null), this.storage.set("account", t), Ko(n == null ? void 0 : n.chainId) != Ko(t == null ? void 0 : t.chainId) && (this.emit("chainChanged", this == null ? void 0 : this.chainId, t == null ? void 0 : t.alliance, t), this.emit("networkChanged", parseInt(this == null ? void 0 : this.chainId), t == null ? void 0 : t.alliance)), (n == null ? void 0 : n.address) != (t == null ? void 0 : t.address) && this.emit("accountsChanged", t != null && t.address ? [t == null ? void 0 : t.address] : []);
  }
  get _tonConnectReply() {
    var t, n;
    return (t = this._account) != null && t.address ? this.storage.get((n = this._account) == null ? void 0 : n.address) : null;
  }
  set _tonConnectReply(t) {
    var n, i;
    (n = this._account) != null && n.address && this.storage.set((i = this._account) == null ? void 0 : i.address, t);
  }
  get _accounts() {
    return this.storage.get("accounts") || { ton: Hr };
  }
  set _accounts(t) {
    this.storage.set("accounts", Ml(t));
  }
  get networkVersion() {
    return parseInt(this.chainId);
  }
  get chainId() {
    var t, n;
    return (t = this._account) != null && t.chainId ? Ko((n = this._account) == null ? void 0 : n.chainId) : null;
  }
  get chainKey() {
    var t;
    return ((t = this._account) == null ? void 0 : t.chainKey) || (Hr == null ? void 0 : Hr.chainKey);
  }
  get connected() {
    var t;
    return !!((t = this._account) != null && t.address);
  }
  _initialize() {
    this._isConnected = true, this._isUnlocked = true, this._initialized = true, this.emit("connect", { chainId: this == null ? void 0 : this.chainId }), this.emit("_initialized");
  }
  getAppInfo() {
    return { ...ct };
  }
  async isConnected() {
    return this.connected;
  }
  isLocked() {
    return !this._isUnlocked;
  }
  async _requesetAccounts(t, n, i = {}, l = false) {
    var v;
    let h = ap();
    if ((v = this == null ? void 0 : this._account) != null && v.address && !h && !l)
      return [this._account.address];
    let g = await Go(t, () => this._request("DAPP_CONNECT_ACCOUNTS", [n], i));
    return h && (h == null || h()), g;
  }
  async _signMessage(t, n) {
    return Go(t, () => this._request("DAPP_SIGN_MESSAGE", [n]));
  }
  async _signTransition(t, n) {
    return (n == null ? void 0 : n.method) == "tonConnect_sendTransaction" || (n == null ? void 0 : n.method) == "ton_sendTransaction", Go(t, () => this._request("DAPP_SIGN_SEND_TRANSACTION", [n]));
  }
  async send(t, ...n) {
    var i, l, h;
    if (!t || typeof t != "string")
      return Promise.reject("Method is not a valid string.");
    n.length === 1 && n[0] instanceof Array && (n = n[0]);
    try {
      let g = `${t}-${JSON.stringify(n || [])}`;
      switch (t) {
        case "ping":
          return "pong";
        case "wallet_requestAccounts":
        case "ton_requestAccounts":
          let v = await this._requesetAccounts(g, { method: t, params: n });
          return (i = this._account) != null && i.address ? [(l = this._account) == null ? void 0 : l.address] : [];
        case "ton_requestWallets":
          return await this._requesetAccounts(g, { method: t, params: n }), Object.values(this._accounts).map((x) => [{ address: x == null ? void 0 : x.address, publicKey: x == null ? void 0 : x.publicKey, version: x.version }]);
          break;
        case "tonConnect_reconnect":
          if (n = [{ items: n }], this._tonConnectReply)
            return this._tonConnectReply;
        case "tonConnect_connect":
          let b = await this._requesetAccounts(g, { method: t, params: n }, true);
          return this._tonConnectReply = b, b;
          break;
        case "tonConnect_sendTransaction":
        case "ton_sendTransaction":
        case "ton_deployContract":
          return this._signTransition(g, { method: t, params: n });
        case "ton_getAccounts":
          return [(h = this._account) == null ? void 0 : h.address];
        case "ton_rawSign":
        case "ton_personalSign":
          return this._signMessage(g, { method: t, params: n });
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
          throw new Mi(1004, `Method "${t}" not implemented`);
      }
    } catch (g) {
      return console.log(g), Promise.reject(typeof g == "object" ? g : { code: (g == null ? void 0 : g.code) || -32603, message: (g == null ? void 0 : g.message) || g });
    }
  }
  async _request(t, n, i) {
    let l = this._account, h = (/* @__PURE__ */ new Date()).getTime();
    this._lastTime = h, i = { account: Object.assign(l || {}, { alliance: "ton" }), metaData: Kr(this.metaData), ...i, originPayload: i == null ? void 0 : i.originPayload, timeStamp: h };
    let g = this.nextJsonRpcId++, v = ((/* @__PURE__ */ new Date()).getTime() + g).toString(), b = `salt-${Date.now()}-${v}`, x = { id: v, method: t, params: n, options: i }, A = { id: x.id, data: x, version: "1.0", salt: b }, O = await Ut.post(`${this.connectUrl}/transaction`, A, { headers: { "X-Salt": b } }), { hash: k, signature: N } = O.data;
    console.log({ hash: k, signature: N, salt: b });
    let q = { method: t, params: [b, k, N] }, C = await new Promise((J, K) => {
      let T = new EventSource(`${this.bridgeUrl}/events/${k}/${N}/${b}`);
      T.onopen = () => {
        T.onopen = null, J(T);
      }, T.onerror = (I) => {
        var L;
        T.onerror = null, (L = T == null ? void 0 : T.close) == null || L.call(T), K(I);
      };
    });
    return new Promise((J, K) => {
      var L, W;
      let T = this.eventTimeout > 0 ? setTimeout(() => {
        var V, fe;
        K(St.invalidRequest({ code: (fe = (V = Et) == null ? void 0 : V.rpc) == null ? void 0 : fe.timeoutRequest, message: vt.errors.timeOut(t), data: x })), C.close();
      }, this.eventTimeout || 6e4) : null;
      C.onmessage = (V) => {
        var fe;
        console.log("message.........", V == null ? void 0 : V.data, A);
        try {
          let ee = JSON.parse(V == null ? void 0 : V.data);
          console.log("message....parse", { data: ee, publish_params: A }), (ee == null ? void 0 : ee.id) == v || b == (ee == null ? void 0 : ee.salt) ? (C.onmessage = null, (fe = C == null ? void 0 : C.close) == null || fe.call(C), clearTimeout(T), (ee.reConnect || !ee.error) && sp.call(this, ee), ee.error ? K(ee.error) : J(ee.result)) : console.log("not match");
        } catch (ee) {
          console.log(ee);
        }
      };
      let I = `${this.connect_direct_link}?startapp=uxuyconnect_${Xe.encodeTelegramUrlParameters(q)}`;
      if (Telegram.WebApp.initData && ((W = (L = Telegram == null ? void 0 : Telegram.WebApp) == null ? void 0 : L.openTelegramLink) == null || W.call(L, I)), !Telegram.WebApp.initData) {
        let V = this.connect_direct_link.match(/t\.me\/([^\/]+)\/([^\/]+)/);
        V[1] && V[2] ? !Telegram.WebApp.initData && Xe.opendeepLink(`uxuyconnect_${Xe.encodeTelegramUrlParameters(q)}`, { domain: V[1], appname: V[2] }) : !Telegram.WebApp.initData && Xe.opendeepLink(`uxuyconnect_${Xe.encodeTelegramUrlParameters(q)}`);
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
var Al = 2;
function fp() {
  var g, v;
  let r2 = ((v = (g = window.navigator) == null ? void 0 : g.userAgentData) == null ? void 0 : v.platform) || window.navigator.platform, e = window.navigator.userAgent, t = ["macOS", "Macintosh", "MacIntel", "MacPPC", "Mac68K"], n = ["Win32", "Win64", "Windows", "WinCE"], i = ["iPhone"], l = ["iPad", "iPod"], h = null;
  return t.indexOf(r2) !== -1 ? h = "mac" : i.indexOf(r2) !== -1 ? h = "iphone" : l.indexOf(r2) !== -1 ? h = "ipad" : n.indexOf(r2) !== -1 ? h = "windows" : (/Android/.test(e) || /Linux/.test(r2)) && (h = "linux"), h;
}
var Jo = () => ({ platform: fp(), appName: ct.name, appVersion: ct.version, maxProtocolVersion: Al, features: ["SendTransaction", { name: "SendTransaction", maxMessages: 4 }] }), En = (r2) => {
  var e;
  return { event: "connect_error", payload: { code: (e = r2.code) != null ? e : 0, message: r2.message } };
}, lp = (r2) => {
  switch (r2) {
    case 1001:
      return 100;
    case 1002:
      return 300;
    default:
      return 0;
  }
}, Sn = class {
  constructor(e, t) {
    this.provider = e;
    this.callbacks = [];
    this.deviceInfo = Jo();
    this.walletInfo = { name: "UxuyWallet", image: ct.logo, tondns: "", about_url: "https://www.uxuy.com" };
    this.protocolVersion = Al;
    this.isWalletBrowser = false;
    this.isUxuyWallet = true;
    this.isInUxuyApp = At();
    this.listen = (e2) => (this.callbacks.push(e2), () => {
      this.callbacks = this.callbacks.filter((t2) => t2 != e2);
    });
    this.notify = (e2) => (this.callbacks.forEach((t2) => t2(e2)), e2);
    t ? this.callbacks = t.callbacks : (e.on("chainChanged", () => {
      this.notify({ event: "disconnect", id: Date.now(), payload: {} });
    }), e.on("tonConnect_event", (n) => {
      var i;
      this.notify({ event: n.event, id: (i = n.id) != null ? i : Date.now(), payload: n.payload });
    }));
  }
  async connect(e, t) {
    var n;
    if (e > this.protocolVersion)
      return this.notify(En(new $t("Unsupported protocol version", 1)));
    try {
      let i = await this.provider.send("tonConnect_connect", t);
      return this.notify({ event: "connect", id: Date.now(), payload: { items: i, device: Jo() } });
    } catch (i) {
      return i instanceof $t ? this.notify(En(i)) : this.notify(En(new $t((n = i.message) != null ? n : "Unknown error", lp(i.code))));
    }
  }
  async disconnect() {
    return await this.provider.send("tonConnect_disconnect"), this.notify({ event: "disconnect", id: Date.now(), payload: {} });
  }
  async restoreConnection() {
    var e;
    try {
      let t = await this.provider.send("tonConnect_reconnect", [{ name: "ton_addr" }]);
      return this.notify({ event: "connect", id: Date.now(), payload: { items: t, device: Jo() } });
    } catch (t) {
      return t instanceof $t ? this.notify(En(t)) : this.notify(En(new $t((e = t.message) != null ? e : "Unknown error")));
    }
  }
  async send(e) {
    try {
      return { result: await this.provider.send(`tonConnect_${e.method}`, e.params), id: String(e.id) };
    } catch (t) {
      return { error: t, id: String(e.id) };
    }
  }
};
var mu = pr(Gn());
var ys = pr(El());
function up(r2) {
  if (r2.length >= 255)
    throw new TypeError("Alphabet too long");
  let e = new Uint8Array(256);
  for (let b = 0; b < e.length; b++)
    e[b] = 255;
  for (let b = 0; b < r2.length; b++) {
    let x = r2.charAt(b), A = x.charCodeAt(0);
    if (e[A] !== 255)
      throw new TypeError(x + " is ambiguous");
    e[A] = b;
  }
  let t = r2.length, n = r2.charAt(0), i = Math.log(t) / Math.log(256), l = Math.log(256) / Math.log(t);
  function h(b) {
    if (b instanceof Uint8Array || (ArrayBuffer.isView(b) ? b = new Uint8Array(b.buffer, b.byteOffset, b.byteLength) : Array.isArray(b) && (b = Uint8Array.from(b))), !(b instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (b.length === 0)
      return "";
    let x = 0, A = 0, O = 0, k = b.length;
    for (; O !== k && b[O] === 0; )
      O++, x++;
    let N = (k - O) * l + 1 >>> 0, q = new Uint8Array(N);
    for (; O !== k; ) {
      let K = b[O], T = 0;
      for (let I = N - 1; (K !== 0 || T < A) && I !== -1; I--, T++)
        K += 256 * q[I] >>> 0, q[I] = K % t >>> 0, K = K / t >>> 0;
      if (K !== 0)
        throw new Error("Non-zero carry");
      A = T, O++;
    }
    let C = N - A;
    for (; C !== N && q[C] === 0; )
      C++;
    let J = n.repeat(x);
    for (; C < N; ++C)
      J += r2.charAt(q[C]);
    return J;
  }
  function g(b) {
    if (typeof b != "string")
      throw new TypeError("Expected String");
    if (b.length === 0)
      return new Uint8Array();
    let x = 0, A = 0, O = 0;
    for (; b[x] === n; )
      A++, x++;
    let k = (b.length - x) * i + 1 >>> 0, N = new Uint8Array(k);
    for (; b[x]; ) {
      let K = e[b.charCodeAt(x)];
      if (K === 255)
        return;
      let T = 0;
      for (let I = k - 1; (K !== 0 || T < O) && I !== -1; I--, T++)
        K += t * N[I] >>> 0, N[I] = K % 256 >>> 0, K = K / 256 >>> 0;
      if (K !== 0)
        throw new Error("Non-zero carry");
      O = T, x++;
    }
    let q = k - O;
    for (; q !== k && N[q] === 0; )
      q++;
    let C = new Uint8Array(A + (k - q)), J = A;
    for (; q !== k; )
      C[J++] = N[q++];
    return C;
  }
  function v(b) {
    let x = g(b);
    if (x)
      return x;
    throw new Error("Non-base" + t + " character");
  }
  return { encode: h, decodeUnsafe: g, decode: v };
}
var Sl = up;
var cp = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", xr = Sl(cp);
var rn = pr(fu()), Ui = /* @__PURE__ */ new Map(), vs = class {
  constructor(e) {
    Object.assign(this, e);
  }
  encode() {
    return Buffer.from((0, rn.serialize)(Ui, this));
  }
  static decode(e) {
    return (0, rn.deserialize)(Ui, this, e);
  }
  static decodeUnchecked(e) {
    return (0, rn.deserializeUnchecked)(Ui, this, e);
  }
};
var gs = 32;
function fd(r2) {
  return r2._bn !== void 0;
}
var lu = 1, tn = class tn2 extends vs {
  constructor(t) {
    super({});
    if (fd(t))
      this._bn = t._bn;
    else {
      if (typeof t == "string") {
        let n = xr.decode(t);
        if (n.length != gs)
          throw new Error("Invalid public key input");
        this._bn = new ys.default(n);
      } else
        this._bn = new ys.default(t);
      if (this._bn.byteLength() > gs)
        throw new Error("Invalid public key input");
    }
  }
  static unique() {
    let t = new tn2(lu);
    return lu += 1, new tn2(t.toBuffer());
  }
  equals(t) {
    return this._bn.eq(t._bn);
  }
  toBase58() {
    return xr.encode(this.toBytes());
  }
  toJSON() {
    return this.toBase58();
  }
  toBytes() {
    let t = this.toBuffer();
    return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  }
  toBuffer() {
    let t = this._bn.toArrayLike(Buffer);
    if (t.length === gs)
      return t;
    let n = Buffer.alloc(32);
    return t.copy(n, 32 - t.length), n;
  }
  get [Symbol.toStringTag]() {
    return `PublicKey(${this.toString()})`;
  }
  toString() {
    return this.toBase58();
  }
};
tn.default = new tn("11111111111111111111111111111111");
var Tr = tn;
Ui.set(Tr, { kind: "struct", fields: [["_bn", "u256"]] });
function ld(r2) {
  return r2 instanceof Uint8Array || r2 != null && typeof r2 == "object" && r2.constructor.name === "Uint8Array";
}
function ws(r2, ...e) {
  if (!ld(r2))
    throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(r2.length))
    throw new Error(`Uint8Array expected of length ${e}, not of length=${r2.length}`);
}
function bs(r2, e = true) {
  if (r2.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && r2.finished)
    throw new Error("Hash#digest() has already been called");
}
function uu(r2, e) {
  ws(r2);
  let t = e.outputLen;
  if (r2.length < t)
    throw new Error(`digestInto() expects output buffer of length at least ${t}`);
}
var Ri = (r2) => new DataView(r2.buffer, r2.byteOffset, r2.byteLength), wt = (r2, e) => r2 << 32 - e | r2 >>> e;
new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function ud(r2) {
  if (typeof r2 != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof r2}`);
  return new Uint8Array(new TextEncoder().encode(r2));
}
function xs(r2) {
  return typeof r2 == "string" && (r2 = ud(r2)), ws(r2), r2;
}
var Bi = class {
  clone() {
    return this._cloneInto();
  }
};
function cu(r2) {
  let e = (n) => r2().update(xs(n)).digest(), t = r2();
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = () => r2(), e;
}
function cd(r2, e, t, n) {
  if (typeof r2.setBigUint64 == "function")
    return r2.setBigUint64(e, t, n);
  let i = BigInt(32), l = BigInt(4294967295), h = Number(t >> i & l), g = Number(t & l), v = n ? 4 : 0, b = n ? 0 : 4;
  r2.setUint32(e + v, h, n), r2.setUint32(e + b, g, n);
}
var hu = (r2, e, t) => r2 & e ^ ~r2 & t, pu = (r2, e, t) => r2 & e ^ r2 & t ^ e & t, Fi = class extends Bi {
  constructor(e, t, n, i) {
    super(), this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = i, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e), this.view = Ri(this.buffer);
  }
  update(e) {
    bs(this);
    let { view: t, buffer: n, blockLen: i } = this;
    e = xs(e);
    let l = e.length;
    for (let h = 0; h < l; ) {
      let g = Math.min(i - this.pos, l - h);
      if (g === i) {
        let v = Ri(e);
        for (; i <= l - h; h += i)
          this.process(v, h);
        continue;
      }
      n.set(e.subarray(h, h + g), this.pos), this.pos += g, h += g, this.pos === i && (this.process(t, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    bs(this), uu(e, this), this.finished = true;
    let { buffer: t, view: n, blockLen: i, isLE: l } = this, { pos: h } = this;
    t[h++] = 128, this.buffer.subarray(h).fill(0), this.padOffset > i - h && (this.process(n, 0), h = 0);
    for (let A = h; A < i; A++)
      t[A] = 0;
    cd(n, i - 8, BigInt(this.length * 8), l), this.process(n, 0);
    let g = Ri(e), v = this.outputLen;
    if (v % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    let b = v / 4, x = this.get();
    if (b > x.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let A = 0; A < b; A++)
      g.setUint32(4 * A, x[A], l);
  }
  digest() {
    let { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    let n = e.slice(0, t);
    return this.destroy(), n;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    let { blockLen: t, buffer: n, length: i, finished: l, destroyed: h, pos: g } = this;
    return e.length = i, e.pos = g, e.finished = l, e.destroyed = h, i % t && e.buffer.set(n), e;
  }
};
var hd = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), Kt = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), Gt = new Uint32Array(64), Ms = class extends Fi {
  constructor() {
    super(64, 32, 8, false), this.A = Kt[0] | 0, this.B = Kt[1] | 0, this.C = Kt[2] | 0, this.D = Kt[3] | 0, this.E = Kt[4] | 0, this.F = Kt[5] | 0, this.G = Kt[6] | 0, this.H = Kt[7] | 0;
  }
  get() {
    let { A: e, B: t, C: n, D: i, E: l, F: h, G: g, H: v } = this;
    return [e, t, n, i, l, h, g, v];
  }
  set(e, t, n, i, l, h, g, v) {
    this.A = e | 0, this.B = t | 0, this.C = n | 0, this.D = i | 0, this.E = l | 0, this.F = h | 0, this.G = g | 0, this.H = v | 0;
  }
  process(e, t) {
    for (let A = 0; A < 16; A++, t += 4)
      Gt[A] = e.getUint32(t, false);
    for (let A = 16; A < 64; A++) {
      let O = Gt[A - 15], k = Gt[A - 2], N = wt(O, 7) ^ wt(O, 18) ^ O >>> 3, q = wt(k, 17) ^ wt(k, 19) ^ k >>> 10;
      Gt[A] = q + Gt[A - 7] + N + Gt[A - 16] | 0;
    }
    let { A: n, B: i, C: l, D: h, E: g, F: v, G: b, H: x } = this;
    for (let A = 0; A < 64; A++) {
      let O = wt(g, 6) ^ wt(g, 11) ^ wt(g, 25), k = x + O + hu(g, v, b) + hd[A] + Gt[A] | 0, q = (wt(n, 2) ^ wt(n, 13) ^ wt(n, 22)) + pu(n, i, l) | 0;
      x = b, b = v, v = g, g = h + k | 0, h = l, l = i, i = n, n = k + q | 0;
    }
    n = n + this.A | 0, i = i + this.B | 0, l = l + this.C | 0, h = h + this.D | 0, g = g + this.E | 0, v = v + this.F | 0, b = b + this.G | 0, x = x + this.H | 0, this.set(n, i, l, h, g, v, b, x);
  }
  roundClean() {
    Gt.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
var As = cu(() => new Ms());
function du(r2) {
  function e(l) {
    var h = Uint8Array.from(l), g = r2(h), v = h.length + 4, b = new Uint8Array(v);
    return b.set(h, 0), b.set(g.subarray(0, 4), h.length), xr.encode(b);
  }
  function t(l) {
    var h = l.slice(0, -4), g = l.slice(-4), v = r2(h);
    if (!(g[0] ^ v[0] | g[1] ^ v[1] | g[2] ^ v[2] | g[3] ^ v[3]))
      return h;
  }
  function n(l) {
    var h = xr.decodeUnsafe(l);
    if (h != null)
      return t(h);
  }
  function i(l) {
    var h = xr.decode(l), g = t(h);
    if (g == null)
      throw new Error("Invalid checksum");
    return g;
  }
  return { encode: e, decode: i, decodeUnsafe: n };
}
function pd(r2) {
  return As(As(r2));
}
var In = du(pd);
var Ir = (0, mu.debug)("uxuy:SolanaProvider"), nn = { address: "", chainId: 6000001 .toString(), chainKey: "solana", alliance: "sol", chainName: "Solana netWork", chainSymbol: "SOL", version: "", rpcs: [] };
function dd(r2, e = "sol") {
  return r2 && Object.keys(r2).forEach((t) => {
    var n;
    ((n = r2[t]) == null ? void 0 : n.alliance) != e && delete r2[t];
  }), r2;
}
var md = (() => {
  let r2 = /* @__PURE__ */ new Map();
  return (e, t, n = 1e3) => {
    if (r2.has(e))
      return r2.has(e);
    let i = t();
    return r2.set(e, i), setTimeout(() => {
      r2.delete(e);
    }, n), i.finally(() => {
      r2.delete(e);
    });
  };
})(), Di = class extends Bt {
  constructor(t) {
    super({ protocol: "sol" });
    this.nextJsonRpcId = 0;
    this.isUxuyWallet = true;
    this.isInUxuyApp = At();
    this.version = ct.version;
    this.log = Ir;
    this._isConnected = false;
    this._isUnlocked = false;
    this._initialized = false;
    this.eventTimeout = 6e4 * 10;
    this.autoApproved = false;
    this.network = "mainnet-beta";
    this.isMathWallet = true;
    this.isPhantom = true;
    this._connetedCount = 0;
    this.version = this.getAppInfo().version, this.connectUrl = t.connect, this.bridgeUrl = t.bridge, this.connect_direct_link = t.connect_direct_link, this.eventTimeout = (t == null ? void 0 : t.eventTimeout) || 6e4 * 10, this.metaData = t == null ? void 0 : t.metaData, this._initialize();
  }
  get _lastTime() {
    return isNaN(Number(this.storage.get("lastTime") || 0)) ? 0 : Number(this.storage.get("lastTime") || 0);
  }
  set _lastTime(t) {
    this.storage.set("lastTime", t);
  }
  get _account() {
    return this.storage.get("account") || nn;
  }
  set _account(t) {
    let n = { ...this._account || nn };
    t || (t = { ...n, address: "" }), this.storage.set("account", t), Qn(n == null ? void 0 : n.chainId) != Qn(t == null ? void 0 : t.chainId) && (this.emit("chainChanged", this == null ? void 0 : this.chainId, t == null ? void 0 : t.alliance, t), this.emit("networkChanged", this != null && this.chainId ? parseInt(this == null ? void 0 : this.chainId) : null, t == null ? void 0 : t.alliance)), (n == null ? void 0 : n.address) != (t == null ? void 0 : t.address) && this.emit("accountsChanged", t != null && t.address ? [t == null ? void 0 : t.address] : []);
  }
  get _accounts() {
    return this.storage.get("accounts") || { ton: nn };
  }
  set _accounts(t) {
    this.storage.set("accounts", t && dd(t));
  }
  get chainId() {
    var t, n;
    return (t = this._account) != null && t.chainId ? Qn((n = this._account) == null ? void 0 : n.chainId) : null;
  }
  get chainKey() {
    var t;
    return ((t = this._account) == null ? void 0 : t.chainKey) || (nn == null ? void 0 : nn.chainKey);
  }
  get connected() {
    return this.publicKey != null;
  }
  get isConnected() {
    return this.publicKey != null;
  }
  get publicKey() {
    var t, n;
    return (t = this._account) != null && t.address ? new Tr((n = this._account) == null ? void 0 : n.address) : void 0;
  }
  _initialize() {
    this._isConnected = true, this._isUnlocked = true, this._initialized = true, this.publicKey && this.emit("connect", Object.assign(this.publicKey || {}, { publicKey: this.publicKey })), this.emit("_initialized");
  }
  getAppInfo() {
    return { ...ct };
  }
  connect(t, n) {
    if (this._connetedCount++, typeof t == "object" && t.onlyIfTrusted && this._connetedCount == 1)
      return Promise.reject({ code: 4001, message: "User rejected the request." });
    console.info("UXUY Wallet Solana Connected", this.connected);
    let i = An();
    return this.connected && !i ? (this.emit("connect", { publicKey: this.publicKey }), Promise.resolve({ publicKey: this.publicKey })) : this._requesetAccounts("DAPP_CONNECT_ACCOUNTS", { method: "DAPP_CONNECT_ACCOUNTS", params: [{ isPhantom: n }] }).then((l) => this.connected ? (i && (i == null || i()), this.emit("connect", { publicKey: this.publicKey }), { publicKey: this.publicKey }) : Promise.reject({ code: 4001, message: "User rejected the request." }));
  }
  async getAccount() {
    return console.info("UXUY Wallet Solana getAccounts", ...arguments), await this._requesetAccounts("DAPP_CONNECT_ACCOUNTS", { method: "DAPP_CONNECT_ACCOUNTS", params: [] }), this.publicKey ? [this.publicKey.toString()] : Promise.reject("Please add SOL in wallet.");
  }
  async signMessage(t, n) {
    return Object.prototype.toString.call(t) == "[object Uint8Array]" && (t = If(t)), await this._request("DAPP_SIGN_MESSAGE", [{ method: "signMessage", params: [t] }]).then((i) => ({ publicKey: this.publicKey, signature: Of(i) }));
  }
  async signTransaction(t, n) {
    var g, v;
    console.info("UXUY Wallet Solana signTransaction", ...arguments);
    let i;
    "version" in t ? i = In.encode(t.serialize()) : i = In.encode(t.serializeMessage());
    let l = { method: "signTransaction", params: [i] }, h = await this._request("DAPP_SIGN_TRANSACTION", [l], n);
    if (!h.signature || ((g = h.signature) == null ? void 0 : g.length) !== 128)
      throw new Error("Invalid signature");
    if (!h.publicKey || h.publicKey !== ((v = this.publicKey) == null ? void 0 : v.toString()))
      throw new Error("Invalid publicKey");
    return t.addSignature(new Tr(h.publicKey), Buffer.from(h.signature, "hex")), t;
  }
  async signAllTransactions(t) {
    return console.info("signAllTransactions", t), await Promise.all(t.map((n) => this.signTransaction(n)));
  }
  async request(t) {
    let n;
    switch (t.method) {
      case "signMessage":
        return n = t.params, await this.signMessage(n.message, n.display);
      case "signTransaction":
        let i = await this._request("DAPP_SIGN_TRANSACTION", [{ method: t.method, params: [t.params.message] }], t == null ? void 0 : t.options);
        return { signature: i.signature, publicKey: new Tr(i.publicKey), serialize: () => In.encode(Buffer.from(i.signedHex, "hex")) };
      case "uxuy_signTransaction":
      case "uxuy_sendTransaction":
        return await this._request("DAPP_SIGN_TRANSACTION", [t]).then((l) => In.encode(Buffer.from(l == null ? void 0 : l.signedHex, "hex")));
      default:
        return this[t.method]();
    }
  }
  async _requesetAccounts(t, n, i = {}, l = false) {
    var g;
    let h = An();
    return (g = this == null ? void 0 : this._account) != null && g.address && !h && !l ? [this._account.address] : md(t, () => this._request("DAPP_CONNECT_ACCOUNTS", [n], i));
  }
  proxyResponse(t) {
    var l, h, g, v;
    Ir("ProxyResponse", t);
    let { method: n, config: i } = t || {};
    if (i) {
      let b = this.storeAllAccounts(i == null ? void 0 : i.accounts);
      switch (n) {
        case "eth_requestAccounts":
        case "DAPP_CONNECT_ACCOUNTS":
          this.storeAccount(b), this._account = (l = this._account) != null && l.chainKey && this._accounts && ((h = this._account) == null ? void 0 : h.chainKey) in this._accounts ? (v = this._accounts) == null ? void 0 : v[(g = this._account) == null ? void 0 : g.chainKey] : Object.values(this._accounts || {})[0];
          break;
      }
      return t;
    }
  }
  async _request(t, n, i) {
    let l = (/* @__PURE__ */ new Date()).getTime();
    this._lastTime = l;
    let h = { ...i, account: { ...this._account, alliance: "sol" }, metaData: Kr(this.metaData), timeStamp: l }, g = this.nextJsonRpcId++, v = ((/* @__PURE__ */ new Date()).getTime() + g).toString(), b = `salt-${Date.now()}-${v}`, x = { id: v, method: t, params: n, options: h }, A = { id: x.id, data: x, version: "1.0", salt: b }, O = await Ut.post(`${this.connectUrl}/transaction`, A, { headers: { "X-Salt": b } }), { hash: k, signature: N } = O.data;
    Ir({ hash: k, signature: N, salt: b });
    let q = { method: t, params: [b, k, N] }, C = await new Promise((J, K) => {
      let T = new EventSource(`${this.bridgeUrl}/events/${k}/${N}/${b}`);
      T.onopen = () => {
        T.onopen = null, J(T);
      }, T.onerror = (I) => {
        var L;
        console.error("EventSource error", I), T.onerror = null, (L = T == null ? void 0 : T.close) == null || L.call(T), K(I);
      };
    });
    return C.onerror = (J) => {
      console.error("EventSource error", J);
    }, new Promise((J, K) => {
      var W, V, fe, ee;
      let T = this.eventTimeout > 0 ? setTimeout(() => {
        var Z, ie;
        K(St.invalidRequest({ code: (ie = (Z = Et) == null ? void 0 : Z.rpc) == null ? void 0 : ie.timeoutRequest, message: vt.errors.timeOut(t), data: x })), C.close();
      }, this.eventTimeout || 6e4) : null;
      C.onmessage = (Z) => {
        var ie;
        Ir("message.........", Z == null ? void 0 : Z.data, A);
        try {
          let M = JSON.parse(Z == null ? void 0 : Z.data);
          Ir("message....parse", { data: M, publish_params: A }), (M == null ? void 0 : M.id) == v || b == (M == null ? void 0 : M.salt) ? (C.onmessage = null, C.onerror = null, (ie = C == null ? void 0 : C.close) == null || ie.call(C), T && clearTimeout(T), (M.reConnect || !M.error) && this.proxyResponse(M), M.error ? K(M.error) : J(M.result)) : Ir("not match");
        } catch (M) {
          Ir(M);
        }
      };
      let I = Xn(), L = `${this.connect_direct_link}?startapp=uxuyconnect_${Xe.encodeTelegramUrlParameters(q)}`;
      if (I && ((fe = (V = (W = window == null ? void 0 : window.Telegram) == null ? void 0 : W.WebApp) == null ? void 0 : V.openTelegramLink) == null || fe.call(V, L)), !I) {
        let Z = (ee = this.connect_direct_link) == null ? void 0 : ee.match(/t\.me\/([^\/]+)\/([^\/]+)/);
        Z && Z[1] && Z[2] ? Xe.opendeepLink(`uxuyconnect_${Xe.encodeTelegramUrlParameters(q)}`, { domain: Z[1], appname: Z[2] }) : Xe.opendeepLink(`uxuyconnect_${Xe.encodeTelegramUrlParameters(q)}`, {});
      }
    });
  }
  disconnect() {
    this.log("UXUY Wallet Solana disconnect"), this._account = null, this._accounts = null, this.emit("disconnect");
  }
};
var gd = ((n) => (n.Invite = "A", n.ReceivePayment = "B", n.Internal = "D", n))(gd || {}), gu = class {
  constructor() {
  }
  static getUniversalDappLink(e, t = {}, n) {
    return `${(n == null ? void 0 : n.connect_direct_link) || qt.connect_direct_link}?startapp=D_${Xe.encodeTelegramUrlParameters({ url: e, ...t })}`;
  }
  static getUniversalInviteLink({ inviteTgId: e, inviteTgChannel: t }, n) {
    return `${(n == null ? void 0 : n.connect_direct_link) || qt.connect_direct_link}?startapp=A_${e}${t ? `_${t}` : ""}`;
  }
  static getUniversalReceivePaymentLink(e, { address: t, tokenAddr: n }, i) {
    let l = (i == null ? void 0 : i.connect_direct_link) || qt.connect_direct_link;
    if (e == "lightning") {
      let [h, g] = t.split("@");
      return `${l}?startapp=B_${h}`;
    } else {
      if (!e)
        throw "no chain_key";
      return `${l}?startapp=B_${t}__${e}${n ? `__${n}` : ""}`;
    }
  }
};
var _s = class extends Pn {
  constructor(t) {
    super();
    this.isInUxuyApp = At();
    this.version = ct.version;
    this.getAppInfo = () => ({ ...ct });
    let n = t == null ? void 0 : t.metaData;
    this.connectUrl = (t == null ? void 0 : t.connect) || qt.connect, this.bridgeUrl = (t == null ? void 0 : t.bridge) || qt.bridge, this.connect_direct_link = (t == null ? void 0 : t.connect_direct_link) || qt.connect_direct_link, this.debug = (t == null ? void 0 : t.debug) || false, this.request_timeout = (t == null ? void 0 : t.request_timeout) || 60 * 2e3, this.injected = (t == null ? void 0 : t.injected) || false, this.metaData = { icon: n == null ? void 0 : n.icon, name: n == null ? void 0 : n.name, url: n == null ? void 0 : n.url, direct_link: n == null ? void 0 : n.direct_link, description: n == null ? void 0 : n.description }, this._initialize();
  }
  _initialize() {
    var n, i, l;
    let t = { connect: this.connectUrl, bridge: this.bridgeUrl, connect_direct_link: this.connect_direct_link, metaData: this.metaData, debug: this.debug, request_timeout: this.request_timeout };
    if (this.debug ? (n = localStorage == null ? void 0 : localStorage.setItem) == null || n.call(localStorage, "debug", "uxuy:*") : ((i = localStorage == null ? void 0 : localStorage.getItem) == null ? void 0 : i.call(localStorage, "debug")) == "uxuy:*" && ((l = localStorage == null ? void 0 : localStorage.removeItem) == null || l.call(localStorage, "debug")), this.ethereum = new xi(t), this.ton = new _n(null, t), this.tonconnect = new Sn(this.ton, null, t), this.tonProtocolVersion = 2, this.uxuyTonWallet = { provider: this.ton, tonconnect: this.tonconnect }, this.openmask = { provider: this.ton, tonconnect: this.tonconnect }, this.tonkeeper = { provider: this.ton, tonconnect: this.tonconnect }, window.uxuyTonWallet = this.uxuyTonWallet, this.phantom = new Di(t), this.solana = this.phantom, this.injected) {
      window.ethereum || (window.ethereum = this.ethereum, dispatchEvent(new Event(ri.evm)));
      let h = false;
      window.openmask || (window.tonProtocolVersion = this.tonProtocolVersion, window.ton = this.ton, window.openmask = this.openmask, h = true), window.tonkeeper || (window.tonProtocolVersion = this.tonProtocolVersion, window.tonkeeper = this.tonkeeper, h = true), h && window.dispatchEvent(new Event(ri.ton)), window.solana || (window.solana = this.solana, dispatchEvent(new Event(ri.sol))), window.phantom || (window.phantom = this.phantom);
    }
    this.emit("_initialized");
  }
}, $b = { WalletTgSdk: _s };
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

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
export {
  fm as AddressString,
  lm as BigIntString,
  yo as CHAIN_IDS,
  cn as ChainKey,
  Cf as ChainKey_EXT,
  ti as DAPP_METHODS,
  am as HexString,
  um as IntNumber,
  ei as OpaqueType,
  gu as OpenLink,
  wr as PROVIDER_ALLIANCE,
  ri as PROVIDER_INITIALIZED_EVENT_NAME,
  cm as RegExpString,
  _s as WalletTgSdk,
  $b as default,
  gd as tgLinkType
};
