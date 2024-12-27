import { a4 as getWindowMetadata_1, a5 as getDocument_1, a6 as getNavigator_1, a7 as cjs, a8 as sha256, a9 as fromString, aa as toString, ab as x25519, ac as random, ad as HKDF_1, ae as chacha20poly1305, af as concat, ag as decodeJWT, ah as queryString, ai as detect, aj as getLocation_1, ak as elliptic, al as IEvents, am as bs$1, an as E$1, ao as y$3, Z as eventsExports, ap as k, aq as A$1, ar as i, as as h$1, at as generateKeyPair, au as encodeIss, av as signJWT, aw as safeJsonStringify, ax as safeJsonParse, ay as getBigIntRpcId, az as Mg, aA as o, aB as f, aC as isJsonRpcRequest, aD as isJsonRpcResponse, aE as formatJsonRpcResult, aF as Jg, aG as formatJsonRpcError, aH as isJsonRpcResult, aI as isJsonRpcError, aJ as formatJsonRpcRequest, aK as r, aL as payloadId, aM as f$1, a3 as __vitePreload } from "./index-d3ff4a45.js";
const C$2 = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } };
const Rr$1 = ":";
function An(e) {
  const [t, r2] = e.split(Rr$1);
  return { namespace: t, reference: r2 };
}
function Wo(e, t = []) {
  const r2 = [];
  return Object.keys(e).forEach((i2) => {
    if (t.length && !t.includes(i2))
      return;
    const n2 = e[i2];
    r2.push(...n2.accounts);
  }), r2;
}
function Or$1(e, t) {
  return e.includes(":") ? [e] : t.chains || [];
}
var Zo = Object.defineProperty, En$1 = Object.getOwnPropertySymbols, ts = Object.prototype.hasOwnProperty, es = Object.prototype.propertyIsEnumerable, Sn$1 = (e, t, r2) => t in e ? Zo(e, t, { enumerable: true, configurable: true, writable: true, value: r2 }) : e[t] = r2, In$1 = (e, t) => {
  for (var r2 in t || (t = {}))
    ts.call(t, r2) && Sn$1(e, r2, t[r2]);
  if (En$1)
    for (var r2 of En$1(t))
      es.call(t, r2) && Sn$1(e, r2, t[r2]);
  return e;
};
const Nn = "ReactNative", qt$1 = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, Bn = "js";
function bi$1() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function rr$1() {
  return !getDocument_1() && !!getNavigator_1() && navigator.product === Nn;
}
function gr$1() {
  return !bi$1() && !!getNavigator_1() && !!getDocument_1();
}
function We() {
  return rr$1() ? qt$1.reactNative : bi$1() ? qt$1.node : gr$1() ? qt$1.browser : qt$1.unknown;
}
function ns() {
  var e;
  try {
    return rr$1() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (e = global.Application) == null ? void 0 : e.applicationId : void 0;
  } catch {
    return;
  }
}
function Cn$1(e, t) {
  let r2 = queryString.parse(e);
  return r2 = In$1(In$1({}, r2), t), e = queryString.stringify(r2), e;
}
function fs$1() {
  return getWindowMetadata_1() || { name: "", description: "", url: "", icons: [""] };
}
function Rn$1() {
  if (We() === qt$1.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: r2, Version: i2 } = global.Platform;
    return [r2, i2].join("-");
  }
  const e = detect();
  if (e === null)
    return "unknown";
  const t = e.os ? e.os.replace(" ", "").toLowerCase() : "unknown";
  return e.type === "browser" ? [t, e.name, e.version].join("-") : [t, e.version].join("-");
}
function On$1() {
  var e;
  const t = We();
  return t === qt$1.browser ? [t, ((e = getLocation_1()) == null ? void 0 : e.host) || "unknown"].join(":") : t;
}
function Pn$1(e, t, r2) {
  const i2 = Rn$1(), n2 = On$1();
  return [[e, t].join("-"), [Bn, r2].join("-"), i2, n2].join("/");
}
function ss({ protocol: e, version: t, relayUrl: r2, sdkVersion: i2, auth: n2, projectId: o2, useOnCloseEvent: h2, bundleId: p3 }) {
  const A2 = r2.split("?"), v3 = Pn$1(e, t, i2), w2 = { auth: n2, ua: v3, projectId: o2, useOnCloseEvent: h2 || void 0, origin: p3 || void 0 }, y3 = Cn$1(A2[1] || "", w2);
  return A2[0] + "?" + y3;
}
function _e$2(e, t) {
  return e.filter((r2) => t.includes(r2)).length === e.length;
}
function cs(e) {
  return Object.fromEntries(e.entries());
}
function ls(e) {
  return new Map(Object.entries(e));
}
function gs(e = cjs.FIVE_MINUTES, t) {
  const r2 = cjs.toMiliseconds(e || cjs.FIVE_MINUTES);
  let i2, n2, o2;
  return { resolve: (h2) => {
    o2 && i2 && (clearTimeout(o2), i2(h2));
  }, reject: (h2) => {
    o2 && n2 && (clearTimeout(o2), n2(h2));
  }, done: () => new Promise((h2, p3) => {
    o2 = setTimeout(() => {
      p3(new Error(t));
    }, r2), i2 = h2, n2 = p3;
  }) };
}
function ms$1(e, t, r2) {
  return new Promise(async (i2, n2) => {
    const o2 = setTimeout(() => n2(new Error(r2)), t);
    try {
      const h2 = await e;
      i2(h2);
    } catch (h2) {
      n2(h2);
    }
    clearTimeout(o2);
  });
}
function yi$1(e, t) {
  if (typeof t == "string" && t.startsWith(`${e}:`))
    return t;
  if (e.toLowerCase() === "topic") {
    if (typeof t != "string")
      throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${t}`;
  } else if (e.toLowerCase() === "id") {
    if (typeof t != "number")
      throw new Error('Value must be "number" for expirer target type: id');
    return `id:${t}`;
  }
  throw new Error(`Unknown expirer target type: ${e}`);
}
function As$1(e) {
  return yi$1("topic", e);
}
function bs(e) {
  return yi$1("id", e);
}
function ys$1(e) {
  const [t, r2] = e.split(":"), i2 = { id: void 0, topic: void 0 };
  if (t === "topic" && typeof r2 == "string")
    i2.topic = r2;
  else if (t === "id" && Number.isInteger(Number(r2)))
    i2.id = Number(r2);
  else
    throw new Error(`Invalid target, expected id:number or topic:string, got ${t}:${r2}`);
  return i2;
}
function ws$1(e, t) {
  return cjs.fromMiliseconds((t || Date.now()) + cjs.toMiliseconds(e));
}
function xs$1(e) {
  return Date.now() >= cjs.toMiliseconds(e);
}
function Ms$1(e, t) {
  return `${e}${t ? `:${t}` : ""}`;
}
function me$1(e = [], t = []) {
  return [.../* @__PURE__ */ new Set([...e, ...t])];
}
async function Es$1({ id: e, topic: t, wcDeepLink: r2 }) {
  var i2;
  try {
    if (!r2)
      return;
    const n2 = typeof r2 == "string" ? JSON.parse(r2) : r2, o2 = n2 == null ? void 0 : n2.href;
    if (typeof o2 != "string")
      return;
    const h2 = Un(o2, e, t), p3 = We();
    if (p3 === qt$1.browser) {
      if (!((i2 = getDocument_1()) != null && i2.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      h2.startsWith("https://") || h2.startsWith("http://") ? window.open(h2, "_blank", "noreferrer noopener") : window.open(h2, kn() ? "_blank" : "_self", "noreferrer noopener");
    } else
      p3 === qt$1.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(h2);
  } catch (n2) {
    console.error(n2);
  }
}
function Un(e, t, r2) {
  const i2 = `requestId=${t}&sessionTopic=${r2}`;
  e.endsWith("/") && (e = e.slice(0, -1));
  let n2 = `${e}`;
  if (e.startsWith("https://t.me")) {
    const o2 = e.includes("?") ? "&startapp=" : "?startapp=";
    n2 = `${n2}${o2}${qn(i2, true)}`;
  } else
    n2 = `${n2}/wc?${i2}`;
  return n2;
}
async function Ss$2(e, t) {
  let r2 = "";
  try {
    if (gr$1() && (r2 = localStorage.getItem(t), r2))
      return r2;
    r2 = await e.getItem(t);
  } catch (i2) {
    console.error(i2);
  }
  return r2;
}
function Is$2(e, t) {
  if (!e.includes(t))
    return null;
  const r2 = e.split(/([&,?,=])/), i2 = r2.indexOf(t);
  return r2[i2 + 2];
}
function Ns$1() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e) => {
    const t = Math.random() * 16 | 0;
    return (e === "x" ? t : t & 3 | 8).toString(16);
  });
}
function _s$1() {
  return typeof process < "u" && {}.IS_VITEST === "true";
}
function kn() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function qn(e, t = false) {
  const r2 = Buffer.from(e).toString("base64");
  return t ? r2.replace(/[=]/g, "") : r2;
}
function xi(e) {
  return Buffer.from(e, "base64").toString("utf-8");
}
var Kn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Bs$1(e) {
  var t = e.default;
  if (typeof t == "function") {
    var r2 = function() {
      return t.apply(this, arguments);
    };
    r2.prototype = t.prototype;
  } else
    r2 = {};
  return Object.defineProperty(r2, "__esModule", { value: true }), Object.keys(e).forEach(function(i2) {
    var n2 = Object.getOwnPropertyDescriptor(e, i2);
    Object.defineProperty(r2, i2, n2.get ? n2 : { enumerable: true, get: function() {
      return e[i2];
    } });
  }), r2;
}
var Hn = { exports: {} };
/**
* [js-sha3]{@link https://github.com/emn178/js-sha3}
*
* @version 0.8.0
* @author Chen, Yi-Cyuan [emn178@gmail.com]
* @copyright Chen, Yi-Cyuan 2015-2018
* @license MIT
*/
(function(e) {
  (function() {
    var t = "input is invalid type", r2 = "finalize already called", i2 = typeof window == "object", n2 = i2 ? window : {};
    n2.JS_SHA3_NO_WINDOW && (i2 = false);
    var o2 = !i2 && typeof self == "object", h2 = !n2.JS_SHA3_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
    h2 ? n2 = Kn : o2 && (n2 = self);
    var p3 = !n2.JS_SHA3_NO_COMMON_JS && true && e.exports, A2 = !n2.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", v3 = "0123456789abcdef".split(""), w2 = [31, 7936, 2031616, 520093696], y3 = [4, 1024, 262144, 67108864], S2 = [1, 256, 65536, 16777216], N2 = [6, 1536, 393216, 100663296], I2 = [0, 8, 16, 24], C3 = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648], D2 = [224, 256, 384, 512], U2 = [128, 256], J = ["hex", "buffer", "arrayBuffer", "array", "digest"], Bt2 = { 128: 168, 256: 136 };
    (n2.JS_SHA3_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(u3) {
      return Object.prototype.toString.call(u3) === "[object Array]";
    }), A2 && (n2.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(u3) {
      return typeof u3 == "object" && u3.buffer && u3.buffer.constructor === ArrayBuffer;
    });
    for (var G2 = function(u3, E2, _2) {
      return function(B) {
        return new s(u3, E2, u3).update(B)[_2]();
      };
    }, H = function(u3, E2, _2) {
      return function(B, R2) {
        return new s(u3, E2, R2).update(B)[_2]();
      };
    }, L2 = function(u3, E2, _2) {
      return function(B, R2, F2, P2) {
        return f2["cshake" + u3].update(B, R2, F2, P2)[_2]();
      };
    }, Pt2 = function(u3, E2, _2) {
      return function(B, R2, F2, P2) {
        return f2["kmac" + u3].update(B, R2, F2, P2)[_2]();
      };
    }, W = function(u3, E2, _2, B) {
      for (var R2 = 0; R2 < J.length; ++R2) {
        var F2 = J[R2];
        u3[F2] = E2(_2, B, F2);
      }
      return u3;
    }, Rt2 = function(u3, E2) {
      var _2 = G2(u3, E2, "hex");
      return _2.create = function() {
        return new s(u3, E2, u3);
      }, _2.update = function(B) {
        return _2.create().update(B);
      }, W(_2, G2, u3, E2);
    }, Vt2 = function(u3, E2) {
      var _2 = H(u3, E2, "hex");
      return _2.create = function(B) {
        return new s(u3, E2, B);
      }, _2.update = function(B, R2) {
        return _2.create(R2).update(B);
      }, W(_2, H, u3, E2);
    }, Y = function(u3, E2) {
      var _2 = Bt2[u3], B = L2(u3, E2, "hex");
      return B.create = function(R2, F2, P2) {
        return !F2 && !P2 ? f2["shake" + u3].create(R2) : new s(u3, E2, R2).bytepad([F2, P2], _2);
      }, B.update = function(R2, F2, P2, O2) {
        return B.create(F2, P2, O2).update(R2);
      }, W(B, L2, u3, E2);
    }, Wt2 = function(u3, E2) {
      var _2 = Bt2[u3], B = Pt2(u3, E2, "hex");
      return B.create = function(R2, F2, P2) {
        return new g3(u3, E2, F2).bytepad(["KMAC", P2], _2).bytepad([R2], _2);
      }, B.update = function(R2, F2, P2, O2) {
        return B.create(R2, P2, O2).update(F2);
      }, W(B, Pt2, u3, E2);
    }, b2 = [{ name: "keccak", padding: S2, bits: D2, createMethod: Rt2 }, { name: "sha3", padding: N2, bits: D2, createMethod: Rt2 }, { name: "shake", padding: w2, bits: U2, createMethod: Vt2 }, { name: "cshake", padding: y3, bits: U2, createMethod: Y }, { name: "kmac", padding: y3, bits: U2, createMethod: Wt2 }], f2 = {}, a2 = [], c = 0; c < b2.length; ++c)
      for (var d2 = b2[c], m2 = d2.bits, x3 = 0; x3 < m2.length; ++x3) {
        var M3 = d2.name + "_" + m2[x3];
        if (a2.push(M3), f2[M3] = d2.createMethod(m2[x3], d2.padding), d2.name !== "sha3") {
          var l = d2.name + m2[x3];
          a2.push(l), f2[l] = f2[M3];
        }
      }
    function s(u3, E2, _2) {
      this.blocks = [], this.s = [], this.padding = E2, this.outputBits = _2, this.reset = true, this.finalized = false, this.block = 0, this.start = 0, this.blockCount = 1600 - (u3 << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = _2 >> 5, this.extraBytes = (_2 & 31) >> 3;
      for (var B = 0; B < 50; ++B)
        this.s[B] = 0;
    }
    s.prototype.update = function(u3) {
      if (this.finalized)
        throw new Error(r2);
      var E2, _2 = typeof u3;
      if (_2 !== "string") {
        if (_2 === "object") {
          if (u3 === null)
            throw new Error(t);
          if (A2 && u3.constructor === ArrayBuffer)
            u3 = new Uint8Array(u3);
          else if (!Array.isArray(u3) && (!A2 || !ArrayBuffer.isView(u3)))
            throw new Error(t);
        } else
          throw new Error(t);
        E2 = true;
      }
      for (var B = this.blocks, R2 = this.byteCount, F2 = u3.length, P2 = this.blockCount, O2 = 0, Ct2 = this.s, T2, q2; O2 < F2; ) {
        if (this.reset)
          for (this.reset = false, B[0] = this.block, T2 = 1; T2 < P2 + 1; ++T2)
            B[T2] = 0;
        if (E2)
          for (T2 = this.start; O2 < F2 && T2 < R2; ++O2)
            B[T2 >> 2] |= u3[O2] << I2[T2++ & 3];
        else
          for (T2 = this.start; O2 < F2 && T2 < R2; ++O2)
            q2 = u3.charCodeAt(O2), q2 < 128 ? B[T2 >> 2] |= q2 << I2[T2++ & 3] : q2 < 2048 ? (B[T2 >> 2] |= (192 | q2 >> 6) << I2[T2++ & 3], B[T2 >> 2] |= (128 | q2 & 63) << I2[T2++ & 3]) : q2 < 55296 || q2 >= 57344 ? (B[T2 >> 2] |= (224 | q2 >> 12) << I2[T2++ & 3], B[T2 >> 2] |= (128 | q2 >> 6 & 63) << I2[T2++ & 3], B[T2 >> 2] |= (128 | q2 & 63) << I2[T2++ & 3]) : (q2 = 65536 + ((q2 & 1023) << 10 | u3.charCodeAt(++O2) & 1023), B[T2 >> 2] |= (240 | q2 >> 18) << I2[T2++ & 3], B[T2 >> 2] |= (128 | q2 >> 12 & 63) << I2[T2++ & 3], B[T2 >> 2] |= (128 | q2 >> 6 & 63) << I2[T2++ & 3], B[T2 >> 2] |= (128 | q2 & 63) << I2[T2++ & 3]);
        if (this.lastByteIndex = T2, T2 >= R2) {
          for (this.start = T2 - R2, this.block = B[P2], T2 = 0; T2 < P2; ++T2)
            Ct2[T2] ^= B[T2];
          k2(Ct2), this.reset = true;
        } else
          this.start = T2;
      }
      return this;
    }, s.prototype.encode = function(u3, E2) {
      var _2 = u3 & 255, B = 1, R2 = [_2];
      for (u3 = u3 >> 8, _2 = u3 & 255; _2 > 0; )
        R2.unshift(_2), u3 = u3 >> 8, _2 = u3 & 255, ++B;
      return E2 ? R2.push(B) : R2.unshift(B), this.update(R2), R2.length;
    }, s.prototype.encodeString = function(u3) {
      var E2, _2 = typeof u3;
      if (_2 !== "string") {
        if (_2 === "object") {
          if (u3 === null)
            throw new Error(t);
          if (A2 && u3.constructor === ArrayBuffer)
            u3 = new Uint8Array(u3);
          else if (!Array.isArray(u3) && (!A2 || !ArrayBuffer.isView(u3)))
            throw new Error(t);
        } else
          throw new Error(t);
        E2 = true;
      }
      var B = 0, R2 = u3.length;
      if (E2)
        B = R2;
      else
        for (var F2 = 0; F2 < u3.length; ++F2) {
          var P2 = u3.charCodeAt(F2);
          P2 < 128 ? B += 1 : P2 < 2048 ? B += 2 : P2 < 55296 || P2 >= 57344 ? B += 3 : (P2 = 65536 + ((P2 & 1023) << 10 | u3.charCodeAt(++F2) & 1023), B += 4);
        }
      return B += this.encode(B * 8), this.update(u3), B;
    }, s.prototype.bytepad = function(u3, E2) {
      for (var _2 = this.encode(E2), B = 0; B < u3.length; ++B)
        _2 += this.encodeString(u3[B]);
      var R2 = E2 - _2 % E2, F2 = [];
      return F2.length = R2, this.update(F2), this;
    }, s.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = true;
        var u3 = this.blocks, E2 = this.lastByteIndex, _2 = this.blockCount, B = this.s;
        if (u3[E2 >> 2] |= this.padding[E2 & 3], this.lastByteIndex === this.byteCount)
          for (u3[0] = u3[_2], E2 = 1; E2 < _2 + 1; ++E2)
            u3[E2] = 0;
        for (u3[_2 - 1] |= 2147483648, E2 = 0; E2 < _2; ++E2)
          B[E2] ^= u3[E2];
        k2(B);
      }
    }, s.prototype.toString = s.prototype.hex = function() {
      this.finalize();
      for (var u3 = this.blockCount, E2 = this.s, _2 = this.outputBlocks, B = this.extraBytes, R2 = 0, F2 = 0, P2 = "", O2; F2 < _2; ) {
        for (R2 = 0; R2 < u3 && F2 < _2; ++R2, ++F2)
          O2 = E2[R2], P2 += v3[O2 >> 4 & 15] + v3[O2 & 15] + v3[O2 >> 12 & 15] + v3[O2 >> 8 & 15] + v3[O2 >> 20 & 15] + v3[O2 >> 16 & 15] + v3[O2 >> 28 & 15] + v3[O2 >> 24 & 15];
        F2 % u3 === 0 && (k2(E2), R2 = 0);
      }
      return B && (O2 = E2[R2], P2 += v3[O2 >> 4 & 15] + v3[O2 & 15], B > 1 && (P2 += v3[O2 >> 12 & 15] + v3[O2 >> 8 & 15]), B > 2 && (P2 += v3[O2 >> 20 & 15] + v3[O2 >> 16 & 15])), P2;
    }, s.prototype.arrayBuffer = function() {
      this.finalize();
      var u3 = this.blockCount, E2 = this.s, _2 = this.outputBlocks, B = this.extraBytes, R2 = 0, F2 = 0, P2 = this.outputBits >> 3, O2;
      B ? O2 = new ArrayBuffer(_2 + 1 << 2) : O2 = new ArrayBuffer(P2);
      for (var Ct2 = new Uint32Array(O2); F2 < _2; ) {
        for (R2 = 0; R2 < u3 && F2 < _2; ++R2, ++F2)
          Ct2[F2] = E2[R2];
        F2 % u3 === 0 && k2(E2);
      }
      return B && (Ct2[R2] = E2[R2], O2 = O2.slice(0, P2)), O2;
    }, s.prototype.buffer = s.prototype.arrayBuffer, s.prototype.digest = s.prototype.array = function() {
      this.finalize();
      for (var u3 = this.blockCount, E2 = this.s, _2 = this.outputBlocks, B = this.extraBytes, R2 = 0, F2 = 0, P2 = [], O2, Ct2; F2 < _2; ) {
        for (R2 = 0; R2 < u3 && F2 < _2; ++R2, ++F2)
          O2 = F2 << 2, Ct2 = E2[R2], P2[O2] = Ct2 & 255, P2[O2 + 1] = Ct2 >> 8 & 255, P2[O2 + 2] = Ct2 >> 16 & 255, P2[O2 + 3] = Ct2 >> 24 & 255;
        F2 % u3 === 0 && k2(E2);
      }
      return B && (O2 = F2 << 2, Ct2 = E2[R2], P2[O2] = Ct2 & 255, B > 1 && (P2[O2 + 1] = Ct2 >> 8 & 255), B > 2 && (P2[O2 + 2] = Ct2 >> 16 & 255)), P2;
    };
    function g3(u3, E2, _2) {
      s.call(this, u3, E2, _2);
    }
    g3.prototype = new s(), g3.prototype.finalize = function() {
      return this.encode(this.outputBits, true), s.prototype.finalize.call(this);
    };
    var k2 = function(u3) {
      var E2, _2, B, R2, F2, P2, O2, Ct2, T2, q2, Te2, X, $2, De, Z2, tt2, Fe, et2, rt2, Ue, it2, nt2, ke, ft2, ot2, qe, st2, at2, Ke, ut2, ht2, He, ct2, lt2, Le2, dt2, pt2, ze2, vt2, gt2, je, mt2, At2, Qe2, bt2, yt2, Je, wt2, xt2, Ge, Mt2, Et2, Ye, St2, It2, Ve, Nt2, _t2, Me, Ee2, Se, Ie2, Ne;
      for (B = 0; B < 48; B += 2)
        R2 = u3[0] ^ u3[10] ^ u3[20] ^ u3[30] ^ u3[40], F2 = u3[1] ^ u3[11] ^ u3[21] ^ u3[31] ^ u3[41], P2 = u3[2] ^ u3[12] ^ u3[22] ^ u3[32] ^ u3[42], O2 = u3[3] ^ u3[13] ^ u3[23] ^ u3[33] ^ u3[43], Ct2 = u3[4] ^ u3[14] ^ u3[24] ^ u3[34] ^ u3[44], T2 = u3[5] ^ u3[15] ^ u3[25] ^ u3[35] ^ u3[45], q2 = u3[6] ^ u3[16] ^ u3[26] ^ u3[36] ^ u3[46], Te2 = u3[7] ^ u3[17] ^ u3[27] ^ u3[37] ^ u3[47], X = u3[8] ^ u3[18] ^ u3[28] ^ u3[38] ^ u3[48], $2 = u3[9] ^ u3[19] ^ u3[29] ^ u3[39] ^ u3[49], E2 = X ^ (P2 << 1 | O2 >>> 31), _2 = $2 ^ (O2 << 1 | P2 >>> 31), u3[0] ^= E2, u3[1] ^= _2, u3[10] ^= E2, u3[11] ^= _2, u3[20] ^= E2, u3[21] ^= _2, u3[30] ^= E2, u3[31] ^= _2, u3[40] ^= E2, u3[41] ^= _2, E2 = R2 ^ (Ct2 << 1 | T2 >>> 31), _2 = F2 ^ (T2 << 1 | Ct2 >>> 31), u3[2] ^= E2, u3[3] ^= _2, u3[12] ^= E2, u3[13] ^= _2, u3[22] ^= E2, u3[23] ^= _2, u3[32] ^= E2, u3[33] ^= _2, u3[42] ^= E2, u3[43] ^= _2, E2 = P2 ^ (q2 << 1 | Te2 >>> 31), _2 = O2 ^ (Te2 << 1 | q2 >>> 31), u3[4] ^= E2, u3[5] ^= _2, u3[14] ^= E2, u3[15] ^= _2, u3[24] ^= E2, u3[25] ^= _2, u3[34] ^= E2, u3[35] ^= _2, u3[44] ^= E2, u3[45] ^= _2, E2 = Ct2 ^ (X << 1 | $2 >>> 31), _2 = T2 ^ ($2 << 1 | X >>> 31), u3[6] ^= E2, u3[7] ^= _2, u3[16] ^= E2, u3[17] ^= _2, u3[26] ^= E2, u3[27] ^= _2, u3[36] ^= E2, u3[37] ^= _2, u3[46] ^= E2, u3[47] ^= _2, E2 = q2 ^ (R2 << 1 | F2 >>> 31), _2 = Te2 ^ (F2 << 1 | R2 >>> 31), u3[8] ^= E2, u3[9] ^= _2, u3[18] ^= E2, u3[19] ^= _2, u3[28] ^= E2, u3[29] ^= _2, u3[38] ^= E2, u3[39] ^= _2, u3[48] ^= E2, u3[49] ^= _2, De = u3[0], Z2 = u3[1], yt2 = u3[11] << 4 | u3[10] >>> 28, Je = u3[10] << 4 | u3[11] >>> 28, at2 = u3[20] << 3 | u3[21] >>> 29, Ke = u3[21] << 3 | u3[20] >>> 29, Ee2 = u3[31] << 9 | u3[30] >>> 23, Se = u3[30] << 9 | u3[31] >>> 23, mt2 = u3[40] << 18 | u3[41] >>> 14, At2 = u3[41] << 18 | u3[40] >>> 14, lt2 = u3[2] << 1 | u3[3] >>> 31, Le2 = u3[3] << 1 | u3[2] >>> 31, tt2 = u3[13] << 12 | u3[12] >>> 20, Fe = u3[12] << 12 | u3[13] >>> 20, wt2 = u3[22] << 10 | u3[23] >>> 22, xt2 = u3[23] << 10 | u3[22] >>> 22, ut2 = u3[33] << 13 | u3[32] >>> 19, ht2 = u3[32] << 13 | u3[33] >>> 19, Ie2 = u3[42] << 2 | u3[43] >>> 30, Ne = u3[43] << 2 | u3[42] >>> 30, St2 = u3[5] << 30 | u3[4] >>> 2, It2 = u3[4] << 30 | u3[5] >>> 2, dt2 = u3[14] << 6 | u3[15] >>> 26, pt2 = u3[15] << 6 | u3[14] >>> 26, et2 = u3[25] << 11 | u3[24] >>> 21, rt2 = u3[24] << 11 | u3[25] >>> 21, Ge = u3[34] << 15 | u3[35] >>> 17, Mt2 = u3[35] << 15 | u3[34] >>> 17, He = u3[45] << 29 | u3[44] >>> 3, ct2 = u3[44] << 29 | u3[45] >>> 3, ft2 = u3[6] << 28 | u3[7] >>> 4, ot2 = u3[7] << 28 | u3[6] >>> 4, Ve = u3[17] << 23 | u3[16] >>> 9, Nt2 = u3[16] << 23 | u3[17] >>> 9, ze2 = u3[26] << 25 | u3[27] >>> 7, vt2 = u3[27] << 25 | u3[26] >>> 7, Ue = u3[36] << 21 | u3[37] >>> 11, it2 = u3[37] << 21 | u3[36] >>> 11, Et2 = u3[47] << 24 | u3[46] >>> 8, Ye = u3[46] << 24 | u3[47] >>> 8, Qe2 = u3[8] << 27 | u3[9] >>> 5, bt2 = u3[9] << 27 | u3[8] >>> 5, qe = u3[18] << 20 | u3[19] >>> 12, st2 = u3[19] << 20 | u3[18] >>> 12, _t2 = u3[29] << 7 | u3[28] >>> 25, Me = u3[28] << 7 | u3[29] >>> 25, gt2 = u3[38] << 8 | u3[39] >>> 24, je = u3[39] << 8 | u3[38] >>> 24, nt2 = u3[48] << 14 | u3[49] >>> 18, ke = u3[49] << 14 | u3[48] >>> 18, u3[0] = De ^ ~tt2 & et2, u3[1] = Z2 ^ ~Fe & rt2, u3[10] = ft2 ^ ~qe & at2, u3[11] = ot2 ^ ~st2 & Ke, u3[20] = lt2 ^ ~dt2 & ze2, u3[21] = Le2 ^ ~pt2 & vt2, u3[30] = Qe2 ^ ~yt2 & wt2, u3[31] = bt2 ^ ~Je & xt2, u3[40] = St2 ^ ~Ve & _t2, u3[41] = It2 ^ ~Nt2 & Me, u3[2] = tt2 ^ ~et2 & Ue, u3[3] = Fe ^ ~rt2 & it2, u3[12] = qe ^ ~at2 & ut2, u3[13] = st2 ^ ~Ke & ht2, u3[22] = dt2 ^ ~ze2 & gt2, u3[23] = pt2 ^ ~vt2 & je, u3[32] = yt2 ^ ~wt2 & Ge, u3[33] = Je ^ ~xt2 & Mt2, u3[42] = Ve ^ ~_t2 & Ee2, u3[43] = Nt2 ^ ~Me & Se, u3[4] = et2 ^ ~Ue & nt2, u3[5] = rt2 ^ ~it2 & ke, u3[14] = at2 ^ ~ut2 & He, u3[15] = Ke ^ ~ht2 & ct2, u3[24] = ze2 ^ ~gt2 & mt2, u3[25] = vt2 ^ ~je & At2, u3[34] = wt2 ^ ~Ge & Et2, u3[35] = xt2 ^ ~Mt2 & Ye, u3[44] = _t2 ^ ~Ee2 & Ie2, u3[45] = Me ^ ~Se & Ne, u3[6] = Ue ^ ~nt2 & De, u3[7] = it2 ^ ~ke & Z2, u3[16] = ut2 ^ ~He & ft2, u3[17] = ht2 ^ ~ct2 & ot2, u3[26] = gt2 ^ ~mt2 & lt2, u3[27] = je ^ ~At2 & Le2, u3[36] = Ge ^ ~Et2 & Qe2, u3[37] = Mt2 ^ ~Ye & bt2, u3[46] = Ee2 ^ ~Ie2 & St2, u3[47] = Se ^ ~Ne & It2, u3[8] = nt2 ^ ~De & tt2, u3[9] = ke ^ ~Z2 & Fe, u3[18] = He ^ ~ft2 & qe, u3[19] = ct2 ^ ~ot2 & st2, u3[28] = mt2 ^ ~lt2 & dt2, u3[29] = At2 ^ ~Le2 & pt2, u3[38] = Et2 ^ ~Qe2 & yt2, u3[39] = Ye ^ ~bt2 & Je, u3[48] = Ie2 ^ ~St2 & Ve, u3[49] = Ne ^ ~It2 & Nt2, u3[0] ^= C3[B], u3[1] ^= C3[B + 1];
    };
    if (p3)
      e.exports = f2;
    else
      for (c = 0; c < a2.length; ++c)
        n2[a2[c]] = f2[a2[c]];
  })();
})(Hn);
var Cs$1 = Hn.exports;
const Rs$2 = "logger/5.7.0";
let Ln = false, zn = false;
const Tr$1 = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
let jn = Tr$1.default, Mi$1 = null;
function Os$1() {
  try {
    const e = [];
    if (["NFD", "NFC", "NFKD", "NFKC"].forEach((t) => {
      try {
        if ("test".normalize(t) !== "test")
          throw new Error("bad normalize");
      } catch {
        e.push(t);
      }
    }), e.length)
      throw new Error("missing " + e.join(", "));
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769))
      throw new Error("broken implementation");
  } catch (e) {
    return e.message;
  }
  return null;
}
const Qn = Os$1();
var Ei;
(function(e) {
  e.DEBUG = "DEBUG", e.INFO = "INFO", e.WARNING = "WARNING", e.ERROR = "ERROR", e.OFF = "OFF";
})(Ei || (Ei = {}));
var re;
(function(e) {
  e.UNKNOWN_ERROR = "UNKNOWN_ERROR", e.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", e.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", e.NETWORK_ERROR = "NETWORK_ERROR", e.SERVER_ERROR = "SERVER_ERROR", e.TIMEOUT = "TIMEOUT", e.BUFFER_OVERRUN = "BUFFER_OVERRUN", e.NUMERIC_FAULT = "NUMERIC_FAULT", e.MISSING_NEW = "MISSING_NEW", e.INVALID_ARGUMENT = "INVALID_ARGUMENT", e.MISSING_ARGUMENT = "MISSING_ARGUMENT", e.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", e.CALL_EXCEPTION = "CALL_EXCEPTION", e.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", e.NONCE_EXPIRED = "NONCE_EXPIRED", e.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", e.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", e.TRANSACTION_REPLACED = "TRANSACTION_REPLACED", e.ACTION_REJECTED = "ACTION_REJECTED";
})(re || (re = {}));
const Jn = "0123456789abcdef";
let z$2 = class z {
  constructor(t) {
    Object.defineProperty(this, "version", { enumerable: true, value: t, writable: false });
  }
  _log(t, r2) {
    const i2 = t.toLowerCase();
    Tr$1[i2] == null && this.throwArgumentError("invalid log level name", "logLevel", t), !(jn > Tr$1[i2]) && console.log.apply(console, r2);
  }
  debug(...t) {
    this._log(z.levels.DEBUG, t);
  }
  info(...t) {
    this._log(z.levels.INFO, t);
  }
  warn(...t) {
    this._log(z.levels.WARNING, t);
  }
  makeError(t, r2, i2) {
    if (zn)
      return this.makeError("censored error", r2, {});
    r2 || (r2 = z.errors.UNKNOWN_ERROR), i2 || (i2 = {});
    const n2 = [];
    Object.keys(i2).forEach((A2) => {
      const v3 = i2[A2];
      try {
        if (v3 instanceof Uint8Array) {
          let w2 = "";
          for (let y3 = 0; y3 < v3.length; y3++)
            w2 += Jn[v3[y3] >> 4], w2 += Jn[v3[y3] & 15];
          n2.push(A2 + "=Uint8Array(0x" + w2 + ")");
        } else
          n2.push(A2 + "=" + JSON.stringify(v3));
      } catch {
        n2.push(A2 + "=" + JSON.stringify(i2[A2].toString()));
      }
    }), n2.push(`code=${r2}`), n2.push(`version=${this.version}`);
    const o2 = t;
    let h2 = "";
    switch (r2) {
      case re.NUMERIC_FAULT: {
        h2 = "NUMERIC_FAULT";
        const A2 = t;
        switch (A2) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            h2 += "-" + A2;
            break;
          case "negative-power":
          case "negative-width":
            h2 += "-unsupported";
            break;
          case "unbound-bitwise-result":
            h2 += "-unbound-result";
            break;
        }
        break;
      }
      case re.CALL_EXCEPTION:
      case re.INSUFFICIENT_FUNDS:
      case re.MISSING_NEW:
      case re.NONCE_EXPIRED:
      case re.REPLACEMENT_UNDERPRICED:
      case re.TRANSACTION_REPLACED:
      case re.UNPREDICTABLE_GAS_LIMIT:
        h2 = r2;
        break;
    }
    h2 && (t += " [ See: https://links.ethers.org/v5-errors-" + h2 + " ]"), n2.length && (t += " (" + n2.join(", ") + ")");
    const p3 = new Error(t);
    return p3.reason = o2, p3.code = r2, Object.keys(i2).forEach(function(A2) {
      p3[A2] = i2[A2];
    }), p3;
  }
  throwError(t, r2, i2) {
    throw this.makeError(t, r2, i2);
  }
  throwArgumentError(t, r2, i2) {
    return this.throwError(t, z.errors.INVALID_ARGUMENT, { argument: r2, value: i2 });
  }
  assert(t, r2, i2, n2) {
    t || this.throwError(r2, i2, n2);
  }
  assertArgument(t, r2, i2, n2) {
    t || this.throwArgumentError(r2, i2, n2);
  }
  checkNormalize(t) {
    Qn && this.throwError("platform missing String.prototype.normalize", z.errors.UNSUPPORTED_OPERATION, { operation: "String.prototype.normalize", form: Qn });
  }
  checkSafeUint53(t, r2) {
    typeof t == "number" && (r2 == null && (r2 = "value not safe"), (t < 0 || t >= 9007199254740991) && this.throwError(r2, z.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "out-of-safe-range", value: t }), t % 1 && this.throwError(r2, z.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "non-integer", value: t }));
  }
  checkArgumentCount(t, r2, i2) {
    i2 ? i2 = ": " + i2 : i2 = "", t < r2 && this.throwError("missing argument" + i2, z.errors.MISSING_ARGUMENT, { count: t, expectedCount: r2 }), t > r2 && this.throwError("too many arguments" + i2, z.errors.UNEXPECTED_ARGUMENT, { count: t, expectedCount: r2 });
  }
  checkNew(t, r2) {
    (t === Object || t == null) && this.throwError("missing new", z.errors.MISSING_NEW, { name: r2.name });
  }
  checkAbstract(t, r2) {
    t === r2 ? this.throwError("cannot instantiate abstract class " + JSON.stringify(r2.name) + " directly; use a sub-class", z.errors.UNSUPPORTED_OPERATION, { name: t.name, operation: "new" }) : (t === Object || t == null) && this.throwError("missing new", z.errors.MISSING_NEW, { name: r2.name });
  }
  static globalLogger() {
    return Mi$1 || (Mi$1 = new z(Rs$2)), Mi$1;
  }
  static setCensorship(t, r2) {
    if (!t && r2 && this.globalLogger().throwError("cannot permanently disable censorship", z.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" }), Ln) {
      if (!t)
        return;
      this.globalLogger().throwError("error censorship permanent", z.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" });
    }
    zn = !!t, Ln = !!r2;
  }
  static setLogLevel(t) {
    const r2 = Tr$1[t.toLowerCase()];
    if (r2 == null) {
      z.globalLogger().warn("invalid log level - " + t);
      return;
    }
    jn = r2;
  }
  static from(t) {
    return new z(t);
  }
};
z$2.errors = re, z$2.levels = Ei;
const Ps$1 = "bytes/5.7.0", Tt$2 = new z$2(Ps$1);
function Gn(e) {
  return !!e.toHexString;
}
function ir$1(e) {
  return e.slice || (e.slice = function() {
    const t = Array.prototype.slice.call(arguments);
    return ir$1(new Uint8Array(Array.prototype.slice.apply(e, t)));
  }), e;
}
function Ts$1(e) {
  return Jt$1(e) && !(e.length % 2) || nr$1(e);
}
function Yn(e) {
  return typeof e == "number" && e == e && e % 1 === 0;
}
function nr$1(e) {
  if (e == null)
    return false;
  if (e.constructor === Uint8Array)
    return true;
  if (typeof e == "string" || !Yn(e.length) || e.length < 0)
    return false;
  for (let t = 0; t < e.length; t++) {
    const r2 = e[t];
    if (!Yn(r2) || r2 < 0 || r2 >= 256)
      return false;
  }
  return true;
}
function Ot$1(e, t) {
  if (t || (t = {}), typeof e == "number") {
    Tt$2.checkSafeUint53(e, "invalid arrayify value");
    const r2 = [];
    for (; e; )
      r2.unshift(e & 255), e = parseInt(String(e / 256));
    return r2.length === 0 && r2.push(0), ir$1(new Uint8Array(r2));
  }
  if (t.allowMissingPrefix && typeof e == "string" && e.substring(0, 2) !== "0x" && (e = "0x" + e), Gn(e) && (e = e.toHexString()), Jt$1(e)) {
    let r2 = e.substring(2);
    r2.length % 2 && (t.hexPad === "left" ? r2 = "0" + r2 : t.hexPad === "right" ? r2 += "0" : Tt$2.throwArgumentError("hex data is odd-length", "value", e));
    const i2 = [];
    for (let n2 = 0; n2 < r2.length; n2 += 2)
      i2.push(parseInt(r2.substring(n2, n2 + 2), 16));
    return ir$1(new Uint8Array(i2));
  }
  return nr$1(e) ? ir$1(new Uint8Array(e)) : Tt$2.throwArgumentError("invalid arrayify value", "value", e);
}
function Ds(e) {
  const t = e.map((n2) => Ot$1(n2)), r2 = t.reduce((n2, o2) => n2 + o2.length, 0), i2 = new Uint8Array(r2);
  return t.reduce((n2, o2) => (i2.set(o2, n2), n2 + o2.length), 0), ir$1(i2);
}
function Fs$1(e, t) {
  e = Ot$1(e), e.length > t && Tt$2.throwArgumentError("value out of range", "value", arguments[0]);
  const r2 = new Uint8Array(t);
  return r2.set(e, t - e.length), ir$1(r2);
}
function Jt$1(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || t && e.length !== 2 + 2 * t);
}
const Si = "0123456789abcdef";
function Kt$1(e, t) {
  if (t || (t = {}), typeof e == "number") {
    Tt$2.checkSafeUint53(e, "invalid hexlify value");
    let r2 = "";
    for (; e; )
      r2 = Si[e & 15] + r2, e = Math.floor(e / 16);
    return r2.length ? (r2.length % 2 && (r2 = "0" + r2), "0x" + r2) : "0x00";
  }
  if (typeof e == "bigint")
    return e = e.toString(16), e.length % 2 ? "0x0" + e : "0x" + e;
  if (t.allowMissingPrefix && typeof e == "string" && e.substring(0, 2) !== "0x" && (e = "0x" + e), Gn(e))
    return e.toHexString();
  if (Jt$1(e))
    return e.length % 2 && (t.hexPad === "left" ? e = "0x0" + e.substring(2) : t.hexPad === "right" ? e += "0" : Tt$2.throwArgumentError("hex data is odd-length", "value", e)), e.toLowerCase();
  if (nr$1(e)) {
    let r2 = "0x";
    for (let i2 = 0; i2 < e.length; i2++) {
      let n2 = e[i2];
      r2 += Si[(n2 & 240) >> 4] + Si[n2 & 15];
    }
    return r2;
  }
  return Tt$2.throwArgumentError("invalid hexlify value", "value", e);
}
function Us$1(e) {
  if (typeof e != "string")
    e = Kt$1(e);
  else if (!Jt$1(e) || e.length % 2)
    return null;
  return (e.length - 2) / 2;
}
function Vn(e, t, r2) {
  return typeof e != "string" ? e = Kt$1(e) : (!Jt$1(e) || e.length % 2) && Tt$2.throwArgumentError("invalid hexData", "value", e), t = 2 + 2 * t, r2 != null ? "0x" + e.substring(t, 2 + 2 * r2) : "0x" + e.substring(t);
}
function oe$2(e, t) {
  for (typeof e != "string" ? e = Kt$1(e) : Jt$1(e) || Tt$2.throwArgumentError("invalid hex string", "value", e), e.length > 2 * t + 2 && Tt$2.throwArgumentError("value out of range", "value", arguments[1]); e.length < 2 * t + 2; )
    e = "0x0" + e.substring(2);
  return e;
}
function Wn(e) {
  const t = { r: "0x", s: "0x", _vs: "0x", recoveryParam: 0, v: 0, yParityAndS: "0x", compact: "0x" };
  if (Ts$1(e)) {
    let r2 = Ot$1(e);
    r2.length === 64 ? (t.v = 27 + (r2[32] >> 7), r2[32] &= 127, t.r = Kt$1(r2.slice(0, 32)), t.s = Kt$1(r2.slice(32, 64))) : r2.length === 65 ? (t.r = Kt$1(r2.slice(0, 32)), t.s = Kt$1(r2.slice(32, 64)), t.v = r2[64]) : Tt$2.throwArgumentError("invalid signature string", "signature", e), t.v < 27 && (t.v === 0 || t.v === 1 ? t.v += 27 : Tt$2.throwArgumentError("signature invalid v byte", "signature", e)), t.recoveryParam = 1 - t.v % 2, t.recoveryParam && (r2[32] |= 128), t._vs = Kt$1(r2.slice(32, 64));
  } else {
    if (t.r = e.r, t.s = e.s, t.v = e.v, t.recoveryParam = e.recoveryParam, t._vs = e._vs, t._vs != null) {
      const n2 = Fs$1(Ot$1(t._vs), 32);
      t._vs = Kt$1(n2);
      const o2 = n2[0] >= 128 ? 1 : 0;
      t.recoveryParam == null ? t.recoveryParam = o2 : t.recoveryParam !== o2 && Tt$2.throwArgumentError("signature recoveryParam mismatch _vs", "signature", e), n2[0] &= 127;
      const h2 = Kt$1(n2);
      t.s == null ? t.s = h2 : t.s !== h2 && Tt$2.throwArgumentError("signature v mismatch _vs", "signature", e);
    }
    if (t.recoveryParam == null)
      t.v == null ? Tt$2.throwArgumentError("signature missing v and recoveryParam", "signature", e) : t.v === 0 || t.v === 1 ? t.recoveryParam = t.v : t.recoveryParam = 1 - t.v % 2;
    else if (t.v == null)
      t.v = 27 + t.recoveryParam;
    else {
      const n2 = t.v === 0 || t.v === 1 ? t.v : 1 - t.v % 2;
      t.recoveryParam !== n2 && Tt$2.throwArgumentError("signature recoveryParam mismatch v", "signature", e);
    }
    t.r == null || !Jt$1(t.r) ? Tt$2.throwArgumentError("signature missing or invalid r", "signature", e) : t.r = oe$2(t.r, 32), t.s == null || !Jt$1(t.s) ? Tt$2.throwArgumentError("signature missing or invalid s", "signature", e) : t.s = oe$2(t.s, 32);
    const r2 = Ot$1(t.s);
    r2[0] >= 128 && Tt$2.throwArgumentError("signature s out of range", "signature", e), t.recoveryParam && (r2[0] |= 128);
    const i2 = Kt$1(r2);
    t._vs && (Jt$1(t._vs) || Tt$2.throwArgumentError("signature invalid _vs", "signature", e), t._vs = oe$2(t._vs, 32)), t._vs == null ? t._vs = i2 : t._vs !== i2 && Tt$2.throwArgumentError("signature _vs mismatch v and s", "signature", e);
  }
  return t.yParityAndS = t._vs, t.compact = t.r + t.yParityAndS.substring(2), t;
}
function Ii(e) {
  return "0x" + Cs$1.keccak_256(Ot$1(e));
}
var Xn = { exports: {} }, ks$1 = {}, qs$2 = Object.freeze({ __proto__: null, default: ks$1 }), Ks$1 = Bs$1(qs$2);
(function(e) {
  (function(t, r2) {
    function i2(b2, f2) {
      if (!b2)
        throw new Error(f2 || "Assertion failed");
    }
    function n2(b2, f2) {
      b2.super_ = f2;
      var a2 = function() {
      };
      a2.prototype = f2.prototype, b2.prototype = new a2(), b2.prototype.constructor = b2;
    }
    function o2(b2, f2, a2) {
      if (o2.isBN(b2))
        return b2;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, b2 !== null && ((f2 === "le" || f2 === "be") && (a2 = f2, f2 = 10), this._init(b2 || 0, f2 || 10, a2 || "be"));
    }
    typeof t == "object" ? t.exports = o2 : r2.BN = o2, o2.BN = o2, o2.wordSize = 26;
    var h2;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? h2 = window.Buffer : h2 = Ks$1.Buffer;
    } catch {
    }
    o2.isBN = function(f2) {
      return f2 instanceof o2 ? true : f2 !== null && typeof f2 == "object" && f2.constructor.wordSize === o2.wordSize && Array.isArray(f2.words);
    }, o2.max = function(f2, a2) {
      return f2.cmp(a2) > 0 ? f2 : a2;
    }, o2.min = function(f2, a2) {
      return f2.cmp(a2) < 0 ? f2 : a2;
    }, o2.prototype._init = function(f2, a2, c) {
      if (typeof f2 == "number")
        return this._initNumber(f2, a2, c);
      if (typeof f2 == "object")
        return this._initArray(f2, a2, c);
      a2 === "hex" && (a2 = 16), i2(a2 === (a2 | 0) && a2 >= 2 && a2 <= 36), f2 = f2.toString().replace(/\s+/g, "");
      var d2 = 0;
      f2[0] === "-" && (d2++, this.negative = 1), d2 < f2.length && (a2 === 16 ? this._parseHex(f2, d2, c) : (this._parseBase(f2, a2, d2), c === "le" && this._initArray(this.toArray(), a2, c)));
    }, o2.prototype._initNumber = function(f2, a2, c) {
      f2 < 0 && (this.negative = 1, f2 = -f2), f2 < 67108864 ? (this.words = [f2 & 67108863], this.length = 1) : f2 < 4503599627370496 ? (this.words = [f2 & 67108863, f2 / 67108864 & 67108863], this.length = 2) : (i2(f2 < 9007199254740992), this.words = [f2 & 67108863, f2 / 67108864 & 67108863, 1], this.length = 3), c === "le" && this._initArray(this.toArray(), a2, c);
    }, o2.prototype._initArray = function(f2, a2, c) {
      if (i2(typeof f2.length == "number"), f2.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(f2.length / 3), this.words = new Array(this.length);
      for (var d2 = 0; d2 < this.length; d2++)
        this.words[d2] = 0;
      var m2, x3, M3 = 0;
      if (c === "be")
        for (d2 = f2.length - 1, m2 = 0; d2 >= 0; d2 -= 3)
          x3 = f2[d2] | f2[d2 - 1] << 8 | f2[d2 - 2] << 16, this.words[m2] |= x3 << M3 & 67108863, this.words[m2 + 1] = x3 >>> 26 - M3 & 67108863, M3 += 24, M3 >= 26 && (M3 -= 26, m2++);
      else if (c === "le")
        for (d2 = 0, m2 = 0; d2 < f2.length; d2 += 3)
          x3 = f2[d2] | f2[d2 + 1] << 8 | f2[d2 + 2] << 16, this.words[m2] |= x3 << M3 & 67108863, this.words[m2 + 1] = x3 >>> 26 - M3 & 67108863, M3 += 24, M3 >= 26 && (M3 -= 26, m2++);
      return this._strip();
    };
    function p3(b2, f2) {
      var a2 = b2.charCodeAt(f2);
      if (a2 >= 48 && a2 <= 57)
        return a2 - 48;
      if (a2 >= 65 && a2 <= 70)
        return a2 - 55;
      if (a2 >= 97 && a2 <= 102)
        return a2 - 87;
      i2(false, "Invalid character in " + b2);
    }
    function A2(b2, f2, a2) {
      var c = p3(b2, a2);
      return a2 - 1 >= f2 && (c |= p3(b2, a2 - 1) << 4), c;
    }
    o2.prototype._parseHex = function(f2, a2, c) {
      this.length = Math.ceil((f2.length - a2) / 6), this.words = new Array(this.length);
      for (var d2 = 0; d2 < this.length; d2++)
        this.words[d2] = 0;
      var m2 = 0, x3 = 0, M3;
      if (c === "be")
        for (d2 = f2.length - 1; d2 >= a2; d2 -= 2)
          M3 = A2(f2, a2, d2) << m2, this.words[x3] |= M3 & 67108863, m2 >= 18 ? (m2 -= 18, x3 += 1, this.words[x3] |= M3 >>> 26) : m2 += 8;
      else {
        var l = f2.length - a2;
        for (d2 = l % 2 === 0 ? a2 + 1 : a2; d2 < f2.length; d2 += 2)
          M3 = A2(f2, a2, d2) << m2, this.words[x3] |= M3 & 67108863, m2 >= 18 ? (m2 -= 18, x3 += 1, this.words[x3] |= M3 >>> 26) : m2 += 8;
      }
      this._strip();
    };
    function v3(b2, f2, a2, c) {
      for (var d2 = 0, m2 = 0, x3 = Math.min(b2.length, a2), M3 = f2; M3 < x3; M3++) {
        var l = b2.charCodeAt(M3) - 48;
        d2 *= c, l >= 49 ? m2 = l - 49 + 10 : l >= 17 ? m2 = l - 17 + 10 : m2 = l, i2(l >= 0 && m2 < c, "Invalid character"), d2 += m2;
      }
      return d2;
    }
    o2.prototype._parseBase = function(f2, a2, c) {
      this.words = [0], this.length = 1;
      for (var d2 = 0, m2 = 1; m2 <= 67108863; m2 *= a2)
        d2++;
      d2--, m2 = m2 / a2 | 0;
      for (var x3 = f2.length - c, M3 = x3 % d2, l = Math.min(x3, x3 - M3) + c, s = 0, g3 = c; g3 < l; g3 += d2)
        s = v3(f2, g3, g3 + d2, a2), this.imuln(m2), this.words[0] + s < 67108864 ? this.words[0] += s : this._iaddn(s);
      if (M3 !== 0) {
        var k2 = 1;
        for (s = v3(f2, g3, f2.length, a2), g3 = 0; g3 < M3; g3++)
          k2 *= a2;
        this.imuln(k2), this.words[0] + s < 67108864 ? this.words[0] += s : this._iaddn(s);
      }
      this._strip();
    }, o2.prototype.copy = function(f2) {
      f2.words = new Array(this.length);
      for (var a2 = 0; a2 < this.length; a2++)
        f2.words[a2] = this.words[a2];
      f2.length = this.length, f2.negative = this.negative, f2.red = this.red;
    };
    function w2(b2, f2) {
      b2.words = f2.words, b2.length = f2.length, b2.negative = f2.negative, b2.red = f2.red;
    }
    if (o2.prototype._move = function(f2) {
      w2(f2, this);
    }, o2.prototype.clone = function() {
      var f2 = new o2(null);
      return this.copy(f2), f2;
    }, o2.prototype._expand = function(f2) {
      for (; this.length < f2; )
        this.words[this.length++] = 0;
      return this;
    }, o2.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, o2.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol < "u" && typeof Symbol.for == "function")
      try {
        o2.prototype[Symbol.for("nodejs.util.inspect.custom")] = y3;
      } catch {
        o2.prototype.inspect = y3;
      }
    else
      o2.prototype.inspect = y3;
    function y3() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var S2 = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], N2 = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], I2 = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    o2.prototype.toString = function(f2, a2) {
      f2 = f2 || 10, a2 = a2 | 0 || 1;
      var c;
      if (f2 === 16 || f2 === "hex") {
        c = "";
        for (var d2 = 0, m2 = 0, x3 = 0; x3 < this.length; x3++) {
          var M3 = this.words[x3], l = ((M3 << d2 | m2) & 16777215).toString(16);
          m2 = M3 >>> 24 - d2 & 16777215, d2 += 2, d2 >= 26 && (d2 -= 26, x3--), m2 !== 0 || x3 !== this.length - 1 ? c = S2[6 - l.length] + l + c : c = l + c;
        }
        for (m2 !== 0 && (c = m2.toString(16) + c); c.length % a2 !== 0; )
          c = "0" + c;
        return this.negative !== 0 && (c = "-" + c), c;
      }
      if (f2 === (f2 | 0) && f2 >= 2 && f2 <= 36) {
        var s = N2[f2], g3 = I2[f2];
        c = "";
        var k2 = this.clone();
        for (k2.negative = 0; !k2.isZero(); ) {
          var u3 = k2.modrn(g3).toString(f2);
          k2 = k2.idivn(g3), k2.isZero() ? c = u3 + c : c = S2[s - u3.length] + u3 + c;
        }
        for (this.isZero() && (c = "0" + c); c.length % a2 !== 0; )
          c = "0" + c;
        return this.negative !== 0 && (c = "-" + c), c;
      }
      i2(false, "Base should be between 2 and 36");
    }, o2.prototype.toNumber = function() {
      var f2 = this.words[0];
      return this.length === 2 ? f2 += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? f2 += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && i2(false, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -f2 : f2;
    }, o2.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, h2 && (o2.prototype.toBuffer = function(f2, a2) {
      return this.toArrayLike(h2, f2, a2);
    }), o2.prototype.toArray = function(f2, a2) {
      return this.toArrayLike(Array, f2, a2);
    };
    var C3 = function(f2, a2) {
      return f2.allocUnsafe ? f2.allocUnsafe(a2) : new f2(a2);
    };
    o2.prototype.toArrayLike = function(f2, a2, c) {
      this._strip();
      var d2 = this.byteLength(), m2 = c || Math.max(1, d2);
      i2(d2 <= m2, "byte array longer than desired length"), i2(m2 > 0, "Requested array length <= 0");
      var x3 = C3(f2, m2), M3 = a2 === "le" ? "LE" : "BE";
      return this["_toArrayLike" + M3](x3, d2), x3;
    }, o2.prototype._toArrayLikeLE = function(f2, a2) {
      for (var c = 0, d2 = 0, m2 = 0, x3 = 0; m2 < this.length; m2++) {
        var M3 = this.words[m2] << x3 | d2;
        f2[c++] = M3 & 255, c < f2.length && (f2[c++] = M3 >> 8 & 255), c < f2.length && (f2[c++] = M3 >> 16 & 255), x3 === 6 ? (c < f2.length && (f2[c++] = M3 >> 24 & 255), d2 = 0, x3 = 0) : (d2 = M3 >>> 24, x3 += 2);
      }
      if (c < f2.length)
        for (f2[c++] = d2; c < f2.length; )
          f2[c++] = 0;
    }, o2.prototype._toArrayLikeBE = function(f2, a2) {
      for (var c = f2.length - 1, d2 = 0, m2 = 0, x3 = 0; m2 < this.length; m2++) {
        var M3 = this.words[m2] << x3 | d2;
        f2[c--] = M3 & 255, c >= 0 && (f2[c--] = M3 >> 8 & 255), c >= 0 && (f2[c--] = M3 >> 16 & 255), x3 === 6 ? (c >= 0 && (f2[c--] = M3 >> 24 & 255), d2 = 0, x3 = 0) : (d2 = M3 >>> 24, x3 += 2);
      }
      if (c >= 0)
        for (f2[c--] = d2; c >= 0; )
          f2[c--] = 0;
    }, Math.clz32 ? o2.prototype._countBits = function(f2) {
      return 32 - Math.clz32(f2);
    } : o2.prototype._countBits = function(f2) {
      var a2 = f2, c = 0;
      return a2 >= 4096 && (c += 13, a2 >>>= 13), a2 >= 64 && (c += 7, a2 >>>= 7), a2 >= 8 && (c += 4, a2 >>>= 4), a2 >= 2 && (c += 2, a2 >>>= 2), c + a2;
    }, o2.prototype._zeroBits = function(f2) {
      if (f2 === 0)
        return 26;
      var a2 = f2, c = 0;
      return a2 & 8191 || (c += 13, a2 >>>= 13), a2 & 127 || (c += 7, a2 >>>= 7), a2 & 15 || (c += 4, a2 >>>= 4), a2 & 3 || (c += 2, a2 >>>= 2), a2 & 1 || c++, c;
    }, o2.prototype.bitLength = function() {
      var f2 = this.words[this.length - 1], a2 = this._countBits(f2);
      return (this.length - 1) * 26 + a2;
    };
    function D2(b2) {
      for (var f2 = new Array(b2.bitLength()), a2 = 0; a2 < f2.length; a2++) {
        var c = a2 / 26 | 0, d2 = a2 % 26;
        f2[a2] = b2.words[c] >>> d2 & 1;
      }
      return f2;
    }
    o2.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var f2 = 0, a2 = 0; a2 < this.length; a2++) {
        var c = this._zeroBits(this.words[a2]);
        if (f2 += c, c !== 26)
          break;
      }
      return f2;
    }, o2.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, o2.prototype.toTwos = function(f2) {
      return this.negative !== 0 ? this.abs().inotn(f2).iaddn(1) : this.clone();
    }, o2.prototype.fromTwos = function(f2) {
      return this.testn(f2 - 1) ? this.notn(f2).iaddn(1).ineg() : this.clone();
    }, o2.prototype.isNeg = function() {
      return this.negative !== 0;
    }, o2.prototype.neg = function() {
      return this.clone().ineg();
    }, o2.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, o2.prototype.iuor = function(f2) {
      for (; this.length < f2.length; )
        this.words[this.length++] = 0;
      for (var a2 = 0; a2 < f2.length; a2++)
        this.words[a2] = this.words[a2] | f2.words[a2];
      return this._strip();
    }, o2.prototype.ior = function(f2) {
      return i2((this.negative | f2.negative) === 0), this.iuor(f2);
    }, o2.prototype.or = function(f2) {
      return this.length > f2.length ? this.clone().ior(f2) : f2.clone().ior(this);
    }, o2.prototype.uor = function(f2) {
      return this.length > f2.length ? this.clone().iuor(f2) : f2.clone().iuor(this);
    }, o2.prototype.iuand = function(f2) {
      var a2;
      this.length > f2.length ? a2 = f2 : a2 = this;
      for (var c = 0; c < a2.length; c++)
        this.words[c] = this.words[c] & f2.words[c];
      return this.length = a2.length, this._strip();
    }, o2.prototype.iand = function(f2) {
      return i2((this.negative | f2.negative) === 0), this.iuand(f2);
    }, o2.prototype.and = function(f2) {
      return this.length > f2.length ? this.clone().iand(f2) : f2.clone().iand(this);
    }, o2.prototype.uand = function(f2) {
      return this.length > f2.length ? this.clone().iuand(f2) : f2.clone().iuand(this);
    }, o2.prototype.iuxor = function(f2) {
      var a2, c;
      this.length > f2.length ? (a2 = this, c = f2) : (a2 = f2, c = this);
      for (var d2 = 0; d2 < c.length; d2++)
        this.words[d2] = a2.words[d2] ^ c.words[d2];
      if (this !== a2)
        for (; d2 < a2.length; d2++)
          this.words[d2] = a2.words[d2];
      return this.length = a2.length, this._strip();
    }, o2.prototype.ixor = function(f2) {
      return i2((this.negative | f2.negative) === 0), this.iuxor(f2);
    }, o2.prototype.xor = function(f2) {
      return this.length > f2.length ? this.clone().ixor(f2) : f2.clone().ixor(this);
    }, o2.prototype.uxor = function(f2) {
      return this.length > f2.length ? this.clone().iuxor(f2) : f2.clone().iuxor(this);
    }, o2.prototype.inotn = function(f2) {
      i2(typeof f2 == "number" && f2 >= 0);
      var a2 = Math.ceil(f2 / 26) | 0, c = f2 % 26;
      this._expand(a2), c > 0 && a2--;
      for (var d2 = 0; d2 < a2; d2++)
        this.words[d2] = ~this.words[d2] & 67108863;
      return c > 0 && (this.words[d2] = ~this.words[d2] & 67108863 >> 26 - c), this._strip();
    }, o2.prototype.notn = function(f2) {
      return this.clone().inotn(f2);
    }, o2.prototype.setn = function(f2, a2) {
      i2(typeof f2 == "number" && f2 >= 0);
      var c = f2 / 26 | 0, d2 = f2 % 26;
      return this._expand(c + 1), a2 ? this.words[c] = this.words[c] | 1 << d2 : this.words[c] = this.words[c] & ~(1 << d2), this._strip();
    }, o2.prototype.iadd = function(f2) {
      var a2;
      if (this.negative !== 0 && f2.negative === 0)
        return this.negative = 0, a2 = this.isub(f2), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && f2.negative !== 0)
        return f2.negative = 0, a2 = this.isub(f2), f2.negative = 1, a2._normSign();
      var c, d2;
      this.length > f2.length ? (c = this, d2 = f2) : (c = f2, d2 = this);
      for (var m2 = 0, x3 = 0; x3 < d2.length; x3++)
        a2 = (c.words[x3] | 0) + (d2.words[x3] | 0) + m2, this.words[x3] = a2 & 67108863, m2 = a2 >>> 26;
      for (; m2 !== 0 && x3 < c.length; x3++)
        a2 = (c.words[x3] | 0) + m2, this.words[x3] = a2 & 67108863, m2 = a2 >>> 26;
      if (this.length = c.length, m2 !== 0)
        this.words[this.length] = m2, this.length++;
      else if (c !== this)
        for (; x3 < c.length; x3++)
          this.words[x3] = c.words[x3];
      return this;
    }, o2.prototype.add = function(f2) {
      var a2;
      return f2.negative !== 0 && this.negative === 0 ? (f2.negative = 0, a2 = this.sub(f2), f2.negative ^= 1, a2) : f2.negative === 0 && this.negative !== 0 ? (this.negative = 0, a2 = f2.sub(this), this.negative = 1, a2) : this.length > f2.length ? this.clone().iadd(f2) : f2.clone().iadd(this);
    }, o2.prototype.isub = function(f2) {
      if (f2.negative !== 0) {
        f2.negative = 0;
        var a2 = this.iadd(f2);
        return f2.negative = 1, a2._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(f2), this.negative = 1, this._normSign();
      var c = this.cmp(f2);
      if (c === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var d2, m2;
      c > 0 ? (d2 = this, m2 = f2) : (d2 = f2, m2 = this);
      for (var x3 = 0, M3 = 0; M3 < m2.length; M3++)
        a2 = (d2.words[M3] | 0) - (m2.words[M3] | 0) + x3, x3 = a2 >> 26, this.words[M3] = a2 & 67108863;
      for (; x3 !== 0 && M3 < d2.length; M3++)
        a2 = (d2.words[M3] | 0) + x3, x3 = a2 >> 26, this.words[M3] = a2 & 67108863;
      if (x3 === 0 && M3 < d2.length && d2 !== this)
        for (; M3 < d2.length; M3++)
          this.words[M3] = d2.words[M3];
      return this.length = Math.max(this.length, M3), d2 !== this && (this.negative = 1), this._strip();
    }, o2.prototype.sub = function(f2) {
      return this.clone().isub(f2);
    };
    function U2(b2, f2, a2) {
      a2.negative = f2.negative ^ b2.negative;
      var c = b2.length + f2.length | 0;
      a2.length = c, c = c - 1 | 0;
      var d2 = b2.words[0] | 0, m2 = f2.words[0] | 0, x3 = d2 * m2, M3 = x3 & 67108863, l = x3 / 67108864 | 0;
      a2.words[0] = M3;
      for (var s = 1; s < c; s++) {
        for (var g3 = l >>> 26, k2 = l & 67108863, u3 = Math.min(s, f2.length - 1), E2 = Math.max(0, s - b2.length + 1); E2 <= u3; E2++) {
          var _2 = s - E2 | 0;
          d2 = b2.words[_2] | 0, m2 = f2.words[E2] | 0, x3 = d2 * m2 + k2, g3 += x3 / 67108864 | 0, k2 = x3 & 67108863;
        }
        a2.words[s] = k2 | 0, l = g3 | 0;
      }
      return l !== 0 ? a2.words[s] = l | 0 : a2.length--, a2._strip();
    }
    var J = function(f2, a2, c) {
      var d2 = f2.words, m2 = a2.words, x3 = c.words, M3 = 0, l, s, g3, k2 = d2[0] | 0, u3 = k2 & 8191, E2 = k2 >>> 13, _2 = d2[1] | 0, B = _2 & 8191, R2 = _2 >>> 13, F2 = d2[2] | 0, P2 = F2 & 8191, O2 = F2 >>> 13, Ct2 = d2[3] | 0, T2 = Ct2 & 8191, q2 = Ct2 >>> 13, Te2 = d2[4] | 0, X = Te2 & 8191, $2 = Te2 >>> 13, De = d2[5] | 0, Z2 = De & 8191, tt2 = De >>> 13, Fe = d2[6] | 0, et2 = Fe & 8191, rt2 = Fe >>> 13, Ue = d2[7] | 0, it2 = Ue & 8191, nt2 = Ue >>> 13, ke = d2[8] | 0, ft2 = ke & 8191, ot2 = ke >>> 13, qe = d2[9] | 0, st2 = qe & 8191, at2 = qe >>> 13, Ke = m2[0] | 0, ut2 = Ke & 8191, ht2 = Ke >>> 13, He = m2[1] | 0, ct2 = He & 8191, lt2 = He >>> 13, Le2 = m2[2] | 0, dt2 = Le2 & 8191, pt2 = Le2 >>> 13, ze2 = m2[3] | 0, vt2 = ze2 & 8191, gt2 = ze2 >>> 13, je = m2[4] | 0, mt2 = je & 8191, At2 = je >>> 13, Qe2 = m2[5] | 0, bt2 = Qe2 & 8191, yt2 = Qe2 >>> 13, Je = m2[6] | 0, wt2 = Je & 8191, xt2 = Je >>> 13, Ge = m2[7] | 0, Mt2 = Ge & 8191, Et2 = Ge >>> 13, Ye = m2[8] | 0, St2 = Ye & 8191, It2 = Ye >>> 13, Ve = m2[9] | 0, Nt2 = Ve & 8191, _t2 = Ve >>> 13;
      c.negative = f2.negative ^ a2.negative, c.length = 19, l = Math.imul(u3, ut2), s = Math.imul(u3, ht2), s = s + Math.imul(E2, ut2) | 0, g3 = Math.imul(E2, ht2);
      var Me = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (Me >>> 26) | 0, Me &= 67108863, l = Math.imul(B, ut2), s = Math.imul(B, ht2), s = s + Math.imul(R2, ut2) | 0, g3 = Math.imul(R2, ht2), l = l + Math.imul(u3, ct2) | 0, s = s + Math.imul(u3, lt2) | 0, s = s + Math.imul(E2, ct2) | 0, g3 = g3 + Math.imul(E2, lt2) | 0;
      var Ee2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (Ee2 >>> 26) | 0, Ee2 &= 67108863, l = Math.imul(P2, ut2), s = Math.imul(P2, ht2), s = s + Math.imul(O2, ut2) | 0, g3 = Math.imul(O2, ht2), l = l + Math.imul(B, ct2) | 0, s = s + Math.imul(B, lt2) | 0, s = s + Math.imul(R2, ct2) | 0, g3 = g3 + Math.imul(R2, lt2) | 0, l = l + Math.imul(u3, dt2) | 0, s = s + Math.imul(u3, pt2) | 0, s = s + Math.imul(E2, dt2) | 0, g3 = g3 + Math.imul(E2, pt2) | 0;
      var Se = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (Se >>> 26) | 0, Se &= 67108863, l = Math.imul(T2, ut2), s = Math.imul(T2, ht2), s = s + Math.imul(q2, ut2) | 0, g3 = Math.imul(q2, ht2), l = l + Math.imul(P2, ct2) | 0, s = s + Math.imul(P2, lt2) | 0, s = s + Math.imul(O2, ct2) | 0, g3 = g3 + Math.imul(O2, lt2) | 0, l = l + Math.imul(B, dt2) | 0, s = s + Math.imul(B, pt2) | 0, s = s + Math.imul(R2, dt2) | 0, g3 = g3 + Math.imul(R2, pt2) | 0, l = l + Math.imul(u3, vt2) | 0, s = s + Math.imul(u3, gt2) | 0, s = s + Math.imul(E2, vt2) | 0, g3 = g3 + Math.imul(E2, gt2) | 0;
      var Ie2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (Ie2 >>> 26) | 0, Ie2 &= 67108863, l = Math.imul(X, ut2), s = Math.imul(X, ht2), s = s + Math.imul($2, ut2) | 0, g3 = Math.imul($2, ht2), l = l + Math.imul(T2, ct2) | 0, s = s + Math.imul(T2, lt2) | 0, s = s + Math.imul(q2, ct2) | 0, g3 = g3 + Math.imul(q2, lt2) | 0, l = l + Math.imul(P2, dt2) | 0, s = s + Math.imul(P2, pt2) | 0, s = s + Math.imul(O2, dt2) | 0, g3 = g3 + Math.imul(O2, pt2) | 0, l = l + Math.imul(B, vt2) | 0, s = s + Math.imul(B, gt2) | 0, s = s + Math.imul(R2, vt2) | 0, g3 = g3 + Math.imul(R2, gt2) | 0, l = l + Math.imul(u3, mt2) | 0, s = s + Math.imul(u3, At2) | 0, s = s + Math.imul(E2, mt2) | 0, g3 = g3 + Math.imul(E2, At2) | 0;
      var Ne = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (Ne >>> 26) | 0, Ne &= 67108863, l = Math.imul(Z2, ut2), s = Math.imul(Z2, ht2), s = s + Math.imul(tt2, ut2) | 0, g3 = Math.imul(tt2, ht2), l = l + Math.imul(X, ct2) | 0, s = s + Math.imul(X, lt2) | 0, s = s + Math.imul($2, ct2) | 0, g3 = g3 + Math.imul($2, lt2) | 0, l = l + Math.imul(T2, dt2) | 0, s = s + Math.imul(T2, pt2) | 0, s = s + Math.imul(q2, dt2) | 0, g3 = g3 + Math.imul(q2, pt2) | 0, l = l + Math.imul(P2, vt2) | 0, s = s + Math.imul(P2, gt2) | 0, s = s + Math.imul(O2, vt2) | 0, g3 = g3 + Math.imul(O2, gt2) | 0, l = l + Math.imul(B, mt2) | 0, s = s + Math.imul(B, At2) | 0, s = s + Math.imul(R2, mt2) | 0, g3 = g3 + Math.imul(R2, At2) | 0, l = l + Math.imul(u3, bt2) | 0, s = s + Math.imul(u3, yt2) | 0, s = s + Math.imul(E2, bt2) | 0, g3 = g3 + Math.imul(E2, yt2) | 0;
      var Zr2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (Zr2 >>> 26) | 0, Zr2 &= 67108863, l = Math.imul(et2, ut2), s = Math.imul(et2, ht2), s = s + Math.imul(rt2, ut2) | 0, g3 = Math.imul(rt2, ht2), l = l + Math.imul(Z2, ct2) | 0, s = s + Math.imul(Z2, lt2) | 0, s = s + Math.imul(tt2, ct2) | 0, g3 = g3 + Math.imul(tt2, lt2) | 0, l = l + Math.imul(X, dt2) | 0, s = s + Math.imul(X, pt2) | 0, s = s + Math.imul($2, dt2) | 0, g3 = g3 + Math.imul($2, pt2) | 0, l = l + Math.imul(T2, vt2) | 0, s = s + Math.imul(T2, gt2) | 0, s = s + Math.imul(q2, vt2) | 0, g3 = g3 + Math.imul(q2, gt2) | 0, l = l + Math.imul(P2, mt2) | 0, s = s + Math.imul(P2, At2) | 0, s = s + Math.imul(O2, mt2) | 0, g3 = g3 + Math.imul(O2, At2) | 0, l = l + Math.imul(B, bt2) | 0, s = s + Math.imul(B, yt2) | 0, s = s + Math.imul(R2, bt2) | 0, g3 = g3 + Math.imul(R2, yt2) | 0, l = l + Math.imul(u3, wt2) | 0, s = s + Math.imul(u3, xt2) | 0, s = s + Math.imul(E2, wt2) | 0, g3 = g3 + Math.imul(E2, xt2) | 0;
      var ti2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (ti2 >>> 26) | 0, ti2 &= 67108863, l = Math.imul(it2, ut2), s = Math.imul(it2, ht2), s = s + Math.imul(nt2, ut2) | 0, g3 = Math.imul(nt2, ht2), l = l + Math.imul(et2, ct2) | 0, s = s + Math.imul(et2, lt2) | 0, s = s + Math.imul(rt2, ct2) | 0, g3 = g3 + Math.imul(rt2, lt2) | 0, l = l + Math.imul(Z2, dt2) | 0, s = s + Math.imul(Z2, pt2) | 0, s = s + Math.imul(tt2, dt2) | 0, g3 = g3 + Math.imul(tt2, pt2) | 0, l = l + Math.imul(X, vt2) | 0, s = s + Math.imul(X, gt2) | 0, s = s + Math.imul($2, vt2) | 0, g3 = g3 + Math.imul($2, gt2) | 0, l = l + Math.imul(T2, mt2) | 0, s = s + Math.imul(T2, At2) | 0, s = s + Math.imul(q2, mt2) | 0, g3 = g3 + Math.imul(q2, At2) | 0, l = l + Math.imul(P2, bt2) | 0, s = s + Math.imul(P2, yt2) | 0, s = s + Math.imul(O2, bt2) | 0, g3 = g3 + Math.imul(O2, yt2) | 0, l = l + Math.imul(B, wt2) | 0, s = s + Math.imul(B, xt2) | 0, s = s + Math.imul(R2, wt2) | 0, g3 = g3 + Math.imul(R2, xt2) | 0, l = l + Math.imul(u3, Mt2) | 0, s = s + Math.imul(u3, Et2) | 0, s = s + Math.imul(E2, Mt2) | 0, g3 = g3 + Math.imul(E2, Et2) | 0;
      var ei2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (ei2 >>> 26) | 0, ei2 &= 67108863, l = Math.imul(ft2, ut2), s = Math.imul(ft2, ht2), s = s + Math.imul(ot2, ut2) | 0, g3 = Math.imul(ot2, ht2), l = l + Math.imul(it2, ct2) | 0, s = s + Math.imul(it2, lt2) | 0, s = s + Math.imul(nt2, ct2) | 0, g3 = g3 + Math.imul(nt2, lt2) | 0, l = l + Math.imul(et2, dt2) | 0, s = s + Math.imul(et2, pt2) | 0, s = s + Math.imul(rt2, dt2) | 0, g3 = g3 + Math.imul(rt2, pt2) | 0, l = l + Math.imul(Z2, vt2) | 0, s = s + Math.imul(Z2, gt2) | 0, s = s + Math.imul(tt2, vt2) | 0, g3 = g3 + Math.imul(tt2, gt2) | 0, l = l + Math.imul(X, mt2) | 0, s = s + Math.imul(X, At2) | 0, s = s + Math.imul($2, mt2) | 0, g3 = g3 + Math.imul($2, At2) | 0, l = l + Math.imul(T2, bt2) | 0, s = s + Math.imul(T2, yt2) | 0, s = s + Math.imul(q2, bt2) | 0, g3 = g3 + Math.imul(q2, yt2) | 0, l = l + Math.imul(P2, wt2) | 0, s = s + Math.imul(P2, xt2) | 0, s = s + Math.imul(O2, wt2) | 0, g3 = g3 + Math.imul(O2, xt2) | 0, l = l + Math.imul(B, Mt2) | 0, s = s + Math.imul(B, Et2) | 0, s = s + Math.imul(R2, Mt2) | 0, g3 = g3 + Math.imul(R2, Et2) | 0, l = l + Math.imul(u3, St2) | 0, s = s + Math.imul(u3, It2) | 0, s = s + Math.imul(E2, St2) | 0, g3 = g3 + Math.imul(E2, It2) | 0;
      var ri2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (ri2 >>> 26) | 0, ri2 &= 67108863, l = Math.imul(st2, ut2), s = Math.imul(st2, ht2), s = s + Math.imul(at2, ut2) | 0, g3 = Math.imul(at2, ht2), l = l + Math.imul(ft2, ct2) | 0, s = s + Math.imul(ft2, lt2) | 0, s = s + Math.imul(ot2, ct2) | 0, g3 = g3 + Math.imul(ot2, lt2) | 0, l = l + Math.imul(it2, dt2) | 0, s = s + Math.imul(it2, pt2) | 0, s = s + Math.imul(nt2, dt2) | 0, g3 = g3 + Math.imul(nt2, pt2) | 0, l = l + Math.imul(et2, vt2) | 0, s = s + Math.imul(et2, gt2) | 0, s = s + Math.imul(rt2, vt2) | 0, g3 = g3 + Math.imul(rt2, gt2) | 0, l = l + Math.imul(Z2, mt2) | 0, s = s + Math.imul(Z2, At2) | 0, s = s + Math.imul(tt2, mt2) | 0, g3 = g3 + Math.imul(tt2, At2) | 0, l = l + Math.imul(X, bt2) | 0, s = s + Math.imul(X, yt2) | 0, s = s + Math.imul($2, bt2) | 0, g3 = g3 + Math.imul($2, yt2) | 0, l = l + Math.imul(T2, wt2) | 0, s = s + Math.imul(T2, xt2) | 0, s = s + Math.imul(q2, wt2) | 0, g3 = g3 + Math.imul(q2, xt2) | 0, l = l + Math.imul(P2, Mt2) | 0, s = s + Math.imul(P2, Et2) | 0, s = s + Math.imul(O2, Mt2) | 0, g3 = g3 + Math.imul(O2, Et2) | 0, l = l + Math.imul(B, St2) | 0, s = s + Math.imul(B, It2) | 0, s = s + Math.imul(R2, St2) | 0, g3 = g3 + Math.imul(R2, It2) | 0, l = l + Math.imul(u3, Nt2) | 0, s = s + Math.imul(u3, _t2) | 0, s = s + Math.imul(E2, Nt2) | 0, g3 = g3 + Math.imul(E2, _t2) | 0;
      var ii2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (ii2 >>> 26) | 0, ii2 &= 67108863, l = Math.imul(st2, ct2), s = Math.imul(st2, lt2), s = s + Math.imul(at2, ct2) | 0, g3 = Math.imul(at2, lt2), l = l + Math.imul(ft2, dt2) | 0, s = s + Math.imul(ft2, pt2) | 0, s = s + Math.imul(ot2, dt2) | 0, g3 = g3 + Math.imul(ot2, pt2) | 0, l = l + Math.imul(it2, vt2) | 0, s = s + Math.imul(it2, gt2) | 0, s = s + Math.imul(nt2, vt2) | 0, g3 = g3 + Math.imul(nt2, gt2) | 0, l = l + Math.imul(et2, mt2) | 0, s = s + Math.imul(et2, At2) | 0, s = s + Math.imul(rt2, mt2) | 0, g3 = g3 + Math.imul(rt2, At2) | 0, l = l + Math.imul(Z2, bt2) | 0, s = s + Math.imul(Z2, yt2) | 0, s = s + Math.imul(tt2, bt2) | 0, g3 = g3 + Math.imul(tt2, yt2) | 0, l = l + Math.imul(X, wt2) | 0, s = s + Math.imul(X, xt2) | 0, s = s + Math.imul($2, wt2) | 0, g3 = g3 + Math.imul($2, xt2) | 0, l = l + Math.imul(T2, Mt2) | 0, s = s + Math.imul(T2, Et2) | 0, s = s + Math.imul(q2, Mt2) | 0, g3 = g3 + Math.imul(q2, Et2) | 0, l = l + Math.imul(P2, St2) | 0, s = s + Math.imul(P2, It2) | 0, s = s + Math.imul(O2, St2) | 0, g3 = g3 + Math.imul(O2, It2) | 0, l = l + Math.imul(B, Nt2) | 0, s = s + Math.imul(B, _t2) | 0, s = s + Math.imul(R2, Nt2) | 0, g3 = g3 + Math.imul(R2, _t2) | 0;
      var ni2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (ni2 >>> 26) | 0, ni2 &= 67108863, l = Math.imul(st2, dt2), s = Math.imul(st2, pt2), s = s + Math.imul(at2, dt2) | 0, g3 = Math.imul(at2, pt2), l = l + Math.imul(ft2, vt2) | 0, s = s + Math.imul(ft2, gt2) | 0, s = s + Math.imul(ot2, vt2) | 0, g3 = g3 + Math.imul(ot2, gt2) | 0, l = l + Math.imul(it2, mt2) | 0, s = s + Math.imul(it2, At2) | 0, s = s + Math.imul(nt2, mt2) | 0, g3 = g3 + Math.imul(nt2, At2) | 0, l = l + Math.imul(et2, bt2) | 0, s = s + Math.imul(et2, yt2) | 0, s = s + Math.imul(rt2, bt2) | 0, g3 = g3 + Math.imul(rt2, yt2) | 0, l = l + Math.imul(Z2, wt2) | 0, s = s + Math.imul(Z2, xt2) | 0, s = s + Math.imul(tt2, wt2) | 0, g3 = g3 + Math.imul(tt2, xt2) | 0, l = l + Math.imul(X, Mt2) | 0, s = s + Math.imul(X, Et2) | 0, s = s + Math.imul($2, Mt2) | 0, g3 = g3 + Math.imul($2, Et2) | 0, l = l + Math.imul(T2, St2) | 0, s = s + Math.imul(T2, It2) | 0, s = s + Math.imul(q2, St2) | 0, g3 = g3 + Math.imul(q2, It2) | 0, l = l + Math.imul(P2, Nt2) | 0, s = s + Math.imul(P2, _t2) | 0, s = s + Math.imul(O2, Nt2) | 0, g3 = g3 + Math.imul(O2, _t2) | 0;
      var fi2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (fi2 >>> 26) | 0, fi2 &= 67108863, l = Math.imul(st2, vt2), s = Math.imul(st2, gt2), s = s + Math.imul(at2, vt2) | 0, g3 = Math.imul(at2, gt2), l = l + Math.imul(ft2, mt2) | 0, s = s + Math.imul(ft2, At2) | 0, s = s + Math.imul(ot2, mt2) | 0, g3 = g3 + Math.imul(ot2, At2) | 0, l = l + Math.imul(it2, bt2) | 0, s = s + Math.imul(it2, yt2) | 0, s = s + Math.imul(nt2, bt2) | 0, g3 = g3 + Math.imul(nt2, yt2) | 0, l = l + Math.imul(et2, wt2) | 0, s = s + Math.imul(et2, xt2) | 0, s = s + Math.imul(rt2, wt2) | 0, g3 = g3 + Math.imul(rt2, xt2) | 0, l = l + Math.imul(Z2, Mt2) | 0, s = s + Math.imul(Z2, Et2) | 0, s = s + Math.imul(tt2, Mt2) | 0, g3 = g3 + Math.imul(tt2, Et2) | 0, l = l + Math.imul(X, St2) | 0, s = s + Math.imul(X, It2) | 0, s = s + Math.imul($2, St2) | 0, g3 = g3 + Math.imul($2, It2) | 0, l = l + Math.imul(T2, Nt2) | 0, s = s + Math.imul(T2, _t2) | 0, s = s + Math.imul(q2, Nt2) | 0, g3 = g3 + Math.imul(q2, _t2) | 0;
      var oi2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (oi2 >>> 26) | 0, oi2 &= 67108863, l = Math.imul(st2, mt2), s = Math.imul(st2, At2), s = s + Math.imul(at2, mt2) | 0, g3 = Math.imul(at2, At2), l = l + Math.imul(ft2, bt2) | 0, s = s + Math.imul(ft2, yt2) | 0, s = s + Math.imul(ot2, bt2) | 0, g3 = g3 + Math.imul(ot2, yt2) | 0, l = l + Math.imul(it2, wt2) | 0, s = s + Math.imul(it2, xt2) | 0, s = s + Math.imul(nt2, wt2) | 0, g3 = g3 + Math.imul(nt2, xt2) | 0, l = l + Math.imul(et2, Mt2) | 0, s = s + Math.imul(et2, Et2) | 0, s = s + Math.imul(rt2, Mt2) | 0, g3 = g3 + Math.imul(rt2, Et2) | 0, l = l + Math.imul(Z2, St2) | 0, s = s + Math.imul(Z2, It2) | 0, s = s + Math.imul(tt2, St2) | 0, g3 = g3 + Math.imul(tt2, It2) | 0, l = l + Math.imul(X, Nt2) | 0, s = s + Math.imul(X, _t2) | 0, s = s + Math.imul($2, Nt2) | 0, g3 = g3 + Math.imul($2, _t2) | 0;
      var si2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (si2 >>> 26) | 0, si2 &= 67108863, l = Math.imul(st2, bt2), s = Math.imul(st2, yt2), s = s + Math.imul(at2, bt2) | 0, g3 = Math.imul(at2, yt2), l = l + Math.imul(ft2, wt2) | 0, s = s + Math.imul(ft2, xt2) | 0, s = s + Math.imul(ot2, wt2) | 0, g3 = g3 + Math.imul(ot2, xt2) | 0, l = l + Math.imul(it2, Mt2) | 0, s = s + Math.imul(it2, Et2) | 0, s = s + Math.imul(nt2, Mt2) | 0, g3 = g3 + Math.imul(nt2, Et2) | 0, l = l + Math.imul(et2, St2) | 0, s = s + Math.imul(et2, It2) | 0, s = s + Math.imul(rt2, St2) | 0, g3 = g3 + Math.imul(rt2, It2) | 0, l = l + Math.imul(Z2, Nt2) | 0, s = s + Math.imul(Z2, _t2) | 0, s = s + Math.imul(tt2, Nt2) | 0, g3 = g3 + Math.imul(tt2, _t2) | 0;
      var ai2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (ai2 >>> 26) | 0, ai2 &= 67108863, l = Math.imul(st2, wt2), s = Math.imul(st2, xt2), s = s + Math.imul(at2, wt2) | 0, g3 = Math.imul(at2, xt2), l = l + Math.imul(ft2, Mt2) | 0, s = s + Math.imul(ft2, Et2) | 0, s = s + Math.imul(ot2, Mt2) | 0, g3 = g3 + Math.imul(ot2, Et2) | 0, l = l + Math.imul(it2, St2) | 0, s = s + Math.imul(it2, It2) | 0, s = s + Math.imul(nt2, St2) | 0, g3 = g3 + Math.imul(nt2, It2) | 0, l = l + Math.imul(et2, Nt2) | 0, s = s + Math.imul(et2, _t2) | 0, s = s + Math.imul(rt2, Nt2) | 0, g3 = g3 + Math.imul(rt2, _t2) | 0;
      var ui2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (ui2 >>> 26) | 0, ui2 &= 67108863, l = Math.imul(st2, Mt2), s = Math.imul(st2, Et2), s = s + Math.imul(at2, Mt2) | 0, g3 = Math.imul(at2, Et2), l = l + Math.imul(ft2, St2) | 0, s = s + Math.imul(ft2, It2) | 0, s = s + Math.imul(ot2, St2) | 0, g3 = g3 + Math.imul(ot2, It2) | 0, l = l + Math.imul(it2, Nt2) | 0, s = s + Math.imul(it2, _t2) | 0, s = s + Math.imul(nt2, Nt2) | 0, g3 = g3 + Math.imul(nt2, _t2) | 0;
      var hi2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (hi2 >>> 26) | 0, hi2 &= 67108863, l = Math.imul(st2, St2), s = Math.imul(st2, It2), s = s + Math.imul(at2, St2) | 0, g3 = Math.imul(at2, It2), l = l + Math.imul(ft2, Nt2) | 0, s = s + Math.imul(ft2, _t2) | 0, s = s + Math.imul(ot2, Nt2) | 0, g3 = g3 + Math.imul(ot2, _t2) | 0;
      var ci2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      M3 = (g3 + (s >>> 13) | 0) + (ci2 >>> 26) | 0, ci2 &= 67108863, l = Math.imul(st2, Nt2), s = Math.imul(st2, _t2), s = s + Math.imul(at2, Nt2) | 0, g3 = Math.imul(at2, _t2);
      var li2 = (M3 + l | 0) + ((s & 8191) << 13) | 0;
      return M3 = (g3 + (s >>> 13) | 0) + (li2 >>> 26) | 0, li2 &= 67108863, x3[0] = Me, x3[1] = Ee2, x3[2] = Se, x3[3] = Ie2, x3[4] = Ne, x3[5] = Zr2, x3[6] = ti2, x3[7] = ei2, x3[8] = ri2, x3[9] = ii2, x3[10] = ni2, x3[11] = fi2, x3[12] = oi2, x3[13] = si2, x3[14] = ai2, x3[15] = ui2, x3[16] = hi2, x3[17] = ci2, x3[18] = li2, M3 !== 0 && (x3[19] = M3, c.length++), c;
    };
    Math.imul || (J = U2);
    function Bt2(b2, f2, a2) {
      a2.negative = f2.negative ^ b2.negative, a2.length = b2.length + f2.length;
      for (var c = 0, d2 = 0, m2 = 0; m2 < a2.length - 1; m2++) {
        var x3 = d2;
        d2 = 0;
        for (var M3 = c & 67108863, l = Math.min(m2, f2.length - 1), s = Math.max(0, m2 - b2.length + 1); s <= l; s++) {
          var g3 = m2 - s, k2 = b2.words[g3] | 0, u3 = f2.words[s] | 0, E2 = k2 * u3, _2 = E2 & 67108863;
          x3 = x3 + (E2 / 67108864 | 0) | 0, _2 = _2 + M3 | 0, M3 = _2 & 67108863, x3 = x3 + (_2 >>> 26) | 0, d2 += x3 >>> 26, x3 &= 67108863;
        }
        a2.words[m2] = M3, c = x3, x3 = d2;
      }
      return c !== 0 ? a2.words[m2] = c : a2.length--, a2._strip();
    }
    function G2(b2, f2, a2) {
      return Bt2(b2, f2, a2);
    }
    o2.prototype.mulTo = function(f2, a2) {
      var c, d2 = this.length + f2.length;
      return this.length === 10 && f2.length === 10 ? c = J(this, f2, a2) : d2 < 63 ? c = U2(this, f2, a2) : d2 < 1024 ? c = Bt2(this, f2, a2) : c = G2(this, f2, a2), c;
    }, o2.prototype.mul = function(f2) {
      var a2 = new o2(null);
      return a2.words = new Array(this.length + f2.length), this.mulTo(f2, a2);
    }, o2.prototype.mulf = function(f2) {
      var a2 = new o2(null);
      return a2.words = new Array(this.length + f2.length), G2(this, f2, a2);
    }, o2.prototype.imul = function(f2) {
      return this.clone().mulTo(f2, this);
    }, o2.prototype.imuln = function(f2) {
      var a2 = f2 < 0;
      a2 && (f2 = -f2), i2(typeof f2 == "number"), i2(f2 < 67108864);
      for (var c = 0, d2 = 0; d2 < this.length; d2++) {
        var m2 = (this.words[d2] | 0) * f2, x3 = (m2 & 67108863) + (c & 67108863);
        c >>= 26, c += m2 / 67108864 | 0, c += x3 >>> 26, this.words[d2] = x3 & 67108863;
      }
      return c !== 0 && (this.words[d2] = c, this.length++), a2 ? this.ineg() : this;
    }, o2.prototype.muln = function(f2) {
      return this.clone().imuln(f2);
    }, o2.prototype.sqr = function() {
      return this.mul(this);
    }, o2.prototype.isqr = function() {
      return this.imul(this.clone());
    }, o2.prototype.pow = function(f2) {
      var a2 = D2(f2);
      if (a2.length === 0)
        return new o2(1);
      for (var c = this, d2 = 0; d2 < a2.length && a2[d2] === 0; d2++, c = c.sqr())
        ;
      if (++d2 < a2.length)
        for (var m2 = c.sqr(); d2 < a2.length; d2++, m2 = m2.sqr())
          a2[d2] !== 0 && (c = c.mul(m2));
      return c;
    }, o2.prototype.iushln = function(f2) {
      i2(typeof f2 == "number" && f2 >= 0);
      var a2 = f2 % 26, c = (f2 - a2) / 26, d2 = 67108863 >>> 26 - a2 << 26 - a2, m2;
      if (a2 !== 0) {
        var x3 = 0;
        for (m2 = 0; m2 < this.length; m2++) {
          var M3 = this.words[m2] & d2, l = (this.words[m2] | 0) - M3 << a2;
          this.words[m2] = l | x3, x3 = M3 >>> 26 - a2;
        }
        x3 && (this.words[m2] = x3, this.length++);
      }
      if (c !== 0) {
        for (m2 = this.length - 1; m2 >= 0; m2--)
          this.words[m2 + c] = this.words[m2];
        for (m2 = 0; m2 < c; m2++)
          this.words[m2] = 0;
        this.length += c;
      }
      return this._strip();
    }, o2.prototype.ishln = function(f2) {
      return i2(this.negative === 0), this.iushln(f2);
    }, o2.prototype.iushrn = function(f2, a2, c) {
      i2(typeof f2 == "number" && f2 >= 0);
      var d2;
      a2 ? d2 = (a2 - a2 % 26) / 26 : d2 = 0;
      var m2 = f2 % 26, x3 = Math.min((f2 - m2) / 26, this.length), M3 = 67108863 ^ 67108863 >>> m2 << m2, l = c;
      if (d2 -= x3, d2 = Math.max(0, d2), l) {
        for (var s = 0; s < x3; s++)
          l.words[s] = this.words[s];
        l.length = x3;
      }
      if (x3 !== 0)
        if (this.length > x3)
          for (this.length -= x3, s = 0; s < this.length; s++)
            this.words[s] = this.words[s + x3];
        else
          this.words[0] = 0, this.length = 1;
      var g3 = 0;
      for (s = this.length - 1; s >= 0 && (g3 !== 0 || s >= d2); s--) {
        var k2 = this.words[s] | 0;
        this.words[s] = g3 << 26 - m2 | k2 >>> m2, g3 = k2 & M3;
      }
      return l && g3 !== 0 && (l.words[l.length++] = g3), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, o2.prototype.ishrn = function(f2, a2, c) {
      return i2(this.negative === 0), this.iushrn(f2, a2, c);
    }, o2.prototype.shln = function(f2) {
      return this.clone().ishln(f2);
    }, o2.prototype.ushln = function(f2) {
      return this.clone().iushln(f2);
    }, o2.prototype.shrn = function(f2) {
      return this.clone().ishrn(f2);
    }, o2.prototype.ushrn = function(f2) {
      return this.clone().iushrn(f2);
    }, o2.prototype.testn = function(f2) {
      i2(typeof f2 == "number" && f2 >= 0);
      var a2 = f2 % 26, c = (f2 - a2) / 26, d2 = 1 << a2;
      if (this.length <= c)
        return false;
      var m2 = this.words[c];
      return !!(m2 & d2);
    }, o2.prototype.imaskn = function(f2) {
      i2(typeof f2 == "number" && f2 >= 0);
      var a2 = f2 % 26, c = (f2 - a2) / 26;
      if (i2(this.negative === 0, "imaskn works only with positive numbers"), this.length <= c)
        return this;
      if (a2 !== 0 && c++, this.length = Math.min(c, this.length), a2 !== 0) {
        var d2 = 67108863 ^ 67108863 >>> a2 << a2;
        this.words[this.length - 1] &= d2;
      }
      return this._strip();
    }, o2.prototype.maskn = function(f2) {
      return this.clone().imaskn(f2);
    }, o2.prototype.iaddn = function(f2) {
      return i2(typeof f2 == "number"), i2(f2 < 67108864), f2 < 0 ? this.isubn(-f2) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= f2 ? (this.words[0] = f2 - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(f2), this.negative = 1, this) : this._iaddn(f2);
    }, o2.prototype._iaddn = function(f2) {
      this.words[0] += f2;
      for (var a2 = 0; a2 < this.length && this.words[a2] >= 67108864; a2++)
        this.words[a2] -= 67108864, a2 === this.length - 1 ? this.words[a2 + 1] = 1 : this.words[a2 + 1]++;
      return this.length = Math.max(this.length, a2 + 1), this;
    }, o2.prototype.isubn = function(f2) {
      if (i2(typeof f2 == "number"), i2(f2 < 67108864), f2 < 0)
        return this.iaddn(-f2);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(f2), this.negative = 1, this;
      if (this.words[0] -= f2, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var a2 = 0; a2 < this.length && this.words[a2] < 0; a2++)
          this.words[a2] += 67108864, this.words[a2 + 1] -= 1;
      return this._strip();
    }, o2.prototype.addn = function(f2) {
      return this.clone().iaddn(f2);
    }, o2.prototype.subn = function(f2) {
      return this.clone().isubn(f2);
    }, o2.prototype.iabs = function() {
      return this.negative = 0, this;
    }, o2.prototype.abs = function() {
      return this.clone().iabs();
    }, o2.prototype._ishlnsubmul = function(f2, a2, c) {
      var d2 = f2.length + c, m2;
      this._expand(d2);
      var x3, M3 = 0;
      for (m2 = 0; m2 < f2.length; m2++) {
        x3 = (this.words[m2 + c] | 0) + M3;
        var l = (f2.words[m2] | 0) * a2;
        x3 -= l & 67108863, M3 = (x3 >> 26) - (l / 67108864 | 0), this.words[m2 + c] = x3 & 67108863;
      }
      for (; m2 < this.length - c; m2++)
        x3 = (this.words[m2 + c] | 0) + M3, M3 = x3 >> 26, this.words[m2 + c] = x3 & 67108863;
      if (M3 === 0)
        return this._strip();
      for (i2(M3 === -1), M3 = 0, m2 = 0; m2 < this.length; m2++)
        x3 = -(this.words[m2] | 0) + M3, M3 = x3 >> 26, this.words[m2] = x3 & 67108863;
      return this.negative = 1, this._strip();
    }, o2.prototype._wordDiv = function(f2, a2) {
      var c = this.length - f2.length, d2 = this.clone(), m2 = f2, x3 = m2.words[m2.length - 1] | 0, M3 = this._countBits(x3);
      c = 26 - M3, c !== 0 && (m2 = m2.ushln(c), d2.iushln(c), x3 = m2.words[m2.length - 1] | 0);
      var l = d2.length - m2.length, s;
      if (a2 !== "mod") {
        s = new o2(null), s.length = l + 1, s.words = new Array(s.length);
        for (var g3 = 0; g3 < s.length; g3++)
          s.words[g3] = 0;
      }
      var k2 = d2.clone()._ishlnsubmul(m2, 1, l);
      k2.negative === 0 && (d2 = k2, s && (s.words[l] = 1));
      for (var u3 = l - 1; u3 >= 0; u3--) {
        var E2 = (d2.words[m2.length + u3] | 0) * 67108864 + (d2.words[m2.length + u3 - 1] | 0);
        for (E2 = Math.min(E2 / x3 | 0, 67108863), d2._ishlnsubmul(m2, E2, u3); d2.negative !== 0; )
          E2--, d2.negative = 0, d2._ishlnsubmul(m2, 1, u3), d2.isZero() || (d2.negative ^= 1);
        s && (s.words[u3] = E2);
      }
      return s && s._strip(), d2._strip(), a2 !== "div" && c !== 0 && d2.iushrn(c), { div: s || null, mod: d2 };
    }, o2.prototype.divmod = function(f2, a2, c) {
      if (i2(!f2.isZero()), this.isZero())
        return { div: new o2(0), mod: new o2(0) };
      var d2, m2, x3;
      return this.negative !== 0 && f2.negative === 0 ? (x3 = this.neg().divmod(f2, a2), a2 !== "mod" && (d2 = x3.div.neg()), a2 !== "div" && (m2 = x3.mod.neg(), c && m2.negative !== 0 && m2.iadd(f2)), { div: d2, mod: m2 }) : this.negative === 0 && f2.negative !== 0 ? (x3 = this.divmod(f2.neg(), a2), a2 !== "mod" && (d2 = x3.div.neg()), { div: d2, mod: x3.mod }) : this.negative & f2.negative ? (x3 = this.neg().divmod(f2.neg(), a2), a2 !== "div" && (m2 = x3.mod.neg(), c && m2.negative !== 0 && m2.isub(f2)), { div: x3.div, mod: m2 }) : f2.length > this.length || this.cmp(f2) < 0 ? { div: new o2(0), mod: this } : f2.length === 1 ? a2 === "div" ? { div: this.divn(f2.words[0]), mod: null } : a2 === "mod" ? { div: null, mod: new o2(this.modrn(f2.words[0])) } : { div: this.divn(f2.words[0]), mod: new o2(this.modrn(f2.words[0])) } : this._wordDiv(f2, a2);
    }, o2.prototype.div = function(f2) {
      return this.divmod(f2, "div", false).div;
    }, o2.prototype.mod = function(f2) {
      return this.divmod(f2, "mod", false).mod;
    }, o2.prototype.umod = function(f2) {
      return this.divmod(f2, "mod", true).mod;
    }, o2.prototype.divRound = function(f2) {
      var a2 = this.divmod(f2);
      if (a2.mod.isZero())
        return a2.div;
      var c = a2.div.negative !== 0 ? a2.mod.isub(f2) : a2.mod, d2 = f2.ushrn(1), m2 = f2.andln(1), x3 = c.cmp(d2);
      return x3 < 0 || m2 === 1 && x3 === 0 ? a2.div : a2.div.negative !== 0 ? a2.div.isubn(1) : a2.div.iaddn(1);
    }, o2.prototype.modrn = function(f2) {
      var a2 = f2 < 0;
      a2 && (f2 = -f2), i2(f2 <= 67108863);
      for (var c = (1 << 26) % f2, d2 = 0, m2 = this.length - 1; m2 >= 0; m2--)
        d2 = (c * d2 + (this.words[m2] | 0)) % f2;
      return a2 ? -d2 : d2;
    }, o2.prototype.modn = function(f2) {
      return this.modrn(f2);
    }, o2.prototype.idivn = function(f2) {
      var a2 = f2 < 0;
      a2 && (f2 = -f2), i2(f2 <= 67108863);
      for (var c = 0, d2 = this.length - 1; d2 >= 0; d2--) {
        var m2 = (this.words[d2] | 0) + c * 67108864;
        this.words[d2] = m2 / f2 | 0, c = m2 % f2;
      }
      return this._strip(), a2 ? this.ineg() : this;
    }, o2.prototype.divn = function(f2) {
      return this.clone().idivn(f2);
    }, o2.prototype.egcd = function(f2) {
      i2(f2.negative === 0), i2(!f2.isZero());
      var a2 = this, c = f2.clone();
      a2.negative !== 0 ? a2 = a2.umod(f2) : a2 = a2.clone();
      for (var d2 = new o2(1), m2 = new o2(0), x3 = new o2(0), M3 = new o2(1), l = 0; a2.isEven() && c.isEven(); )
        a2.iushrn(1), c.iushrn(1), ++l;
      for (var s = c.clone(), g3 = a2.clone(); !a2.isZero(); ) {
        for (var k2 = 0, u3 = 1; !(a2.words[0] & u3) && k2 < 26; ++k2, u3 <<= 1)
          ;
        if (k2 > 0)
          for (a2.iushrn(k2); k2-- > 0; )
            (d2.isOdd() || m2.isOdd()) && (d2.iadd(s), m2.isub(g3)), d2.iushrn(1), m2.iushrn(1);
        for (var E2 = 0, _2 = 1; !(c.words[0] & _2) && E2 < 26; ++E2, _2 <<= 1)
          ;
        if (E2 > 0)
          for (c.iushrn(E2); E2-- > 0; )
            (x3.isOdd() || M3.isOdd()) && (x3.iadd(s), M3.isub(g3)), x3.iushrn(1), M3.iushrn(1);
        a2.cmp(c) >= 0 ? (a2.isub(c), d2.isub(x3), m2.isub(M3)) : (c.isub(a2), x3.isub(d2), M3.isub(m2));
      }
      return { a: x3, b: M3, gcd: c.iushln(l) };
    }, o2.prototype._invmp = function(f2) {
      i2(f2.negative === 0), i2(!f2.isZero());
      var a2 = this, c = f2.clone();
      a2.negative !== 0 ? a2 = a2.umod(f2) : a2 = a2.clone();
      for (var d2 = new o2(1), m2 = new o2(0), x3 = c.clone(); a2.cmpn(1) > 0 && c.cmpn(1) > 0; ) {
        for (var M3 = 0, l = 1; !(a2.words[0] & l) && M3 < 26; ++M3, l <<= 1)
          ;
        if (M3 > 0)
          for (a2.iushrn(M3); M3-- > 0; )
            d2.isOdd() && d2.iadd(x3), d2.iushrn(1);
        for (var s = 0, g3 = 1; !(c.words[0] & g3) && s < 26; ++s, g3 <<= 1)
          ;
        if (s > 0)
          for (c.iushrn(s); s-- > 0; )
            m2.isOdd() && m2.iadd(x3), m2.iushrn(1);
        a2.cmp(c) >= 0 ? (a2.isub(c), d2.isub(m2)) : (c.isub(a2), m2.isub(d2));
      }
      var k2;
      return a2.cmpn(1) === 0 ? k2 = d2 : k2 = m2, k2.cmpn(0) < 0 && k2.iadd(f2), k2;
    }, o2.prototype.gcd = function(f2) {
      if (this.isZero())
        return f2.abs();
      if (f2.isZero())
        return this.abs();
      var a2 = this.clone(), c = f2.clone();
      a2.negative = 0, c.negative = 0;
      for (var d2 = 0; a2.isEven() && c.isEven(); d2++)
        a2.iushrn(1), c.iushrn(1);
      do {
        for (; a2.isEven(); )
          a2.iushrn(1);
        for (; c.isEven(); )
          c.iushrn(1);
        var m2 = a2.cmp(c);
        if (m2 < 0) {
          var x3 = a2;
          a2 = c, c = x3;
        } else if (m2 === 0 || c.cmpn(1) === 0)
          break;
        a2.isub(c);
      } while (true);
      return c.iushln(d2);
    }, o2.prototype.invm = function(f2) {
      return this.egcd(f2).a.umod(f2);
    }, o2.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, o2.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, o2.prototype.andln = function(f2) {
      return this.words[0] & f2;
    }, o2.prototype.bincn = function(f2) {
      i2(typeof f2 == "number");
      var a2 = f2 % 26, c = (f2 - a2) / 26, d2 = 1 << a2;
      if (this.length <= c)
        return this._expand(c + 1), this.words[c] |= d2, this;
      for (var m2 = d2, x3 = c; m2 !== 0 && x3 < this.length; x3++) {
        var M3 = this.words[x3] | 0;
        M3 += m2, m2 = M3 >>> 26, M3 &= 67108863, this.words[x3] = M3;
      }
      return m2 !== 0 && (this.words[x3] = m2, this.length++), this;
    }, o2.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, o2.prototype.cmpn = function(f2) {
      var a2 = f2 < 0;
      if (this.negative !== 0 && !a2)
        return -1;
      if (this.negative === 0 && a2)
        return 1;
      this._strip();
      var c;
      if (this.length > 1)
        c = 1;
      else {
        a2 && (f2 = -f2), i2(f2 <= 67108863, "Number is too big");
        var d2 = this.words[0] | 0;
        c = d2 === f2 ? 0 : d2 < f2 ? -1 : 1;
      }
      return this.negative !== 0 ? -c | 0 : c;
    }, o2.prototype.cmp = function(f2) {
      if (this.negative !== 0 && f2.negative === 0)
        return -1;
      if (this.negative === 0 && f2.negative !== 0)
        return 1;
      var a2 = this.ucmp(f2);
      return this.negative !== 0 ? -a2 | 0 : a2;
    }, o2.prototype.ucmp = function(f2) {
      if (this.length > f2.length)
        return 1;
      if (this.length < f2.length)
        return -1;
      for (var a2 = 0, c = this.length - 1; c >= 0; c--) {
        var d2 = this.words[c] | 0, m2 = f2.words[c] | 0;
        if (d2 !== m2) {
          d2 < m2 ? a2 = -1 : d2 > m2 && (a2 = 1);
          break;
        }
      }
      return a2;
    }, o2.prototype.gtn = function(f2) {
      return this.cmpn(f2) === 1;
    }, o2.prototype.gt = function(f2) {
      return this.cmp(f2) === 1;
    }, o2.prototype.gten = function(f2) {
      return this.cmpn(f2) >= 0;
    }, o2.prototype.gte = function(f2) {
      return this.cmp(f2) >= 0;
    }, o2.prototype.ltn = function(f2) {
      return this.cmpn(f2) === -1;
    }, o2.prototype.lt = function(f2) {
      return this.cmp(f2) === -1;
    }, o2.prototype.lten = function(f2) {
      return this.cmpn(f2) <= 0;
    }, o2.prototype.lte = function(f2) {
      return this.cmp(f2) <= 0;
    }, o2.prototype.eqn = function(f2) {
      return this.cmpn(f2) === 0;
    }, o2.prototype.eq = function(f2) {
      return this.cmp(f2) === 0;
    }, o2.red = function(f2) {
      return new Y(f2);
    }, o2.prototype.toRed = function(f2) {
      return i2(!this.red, "Already a number in reduction context"), i2(this.negative === 0, "red works only with positives"), f2.convertTo(this)._forceRed(f2);
    }, o2.prototype.fromRed = function() {
      return i2(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, o2.prototype._forceRed = function(f2) {
      return this.red = f2, this;
    }, o2.prototype.forceRed = function(f2) {
      return i2(!this.red, "Already a number in reduction context"), this._forceRed(f2);
    }, o2.prototype.redAdd = function(f2) {
      return i2(this.red, "redAdd works only with red numbers"), this.red.add(this, f2);
    }, o2.prototype.redIAdd = function(f2) {
      return i2(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, f2);
    }, o2.prototype.redSub = function(f2) {
      return i2(this.red, "redSub works only with red numbers"), this.red.sub(this, f2);
    }, o2.prototype.redISub = function(f2) {
      return i2(this.red, "redISub works only with red numbers"), this.red.isub(this, f2);
    }, o2.prototype.redShl = function(f2) {
      return i2(this.red, "redShl works only with red numbers"), this.red.shl(this, f2);
    }, o2.prototype.redMul = function(f2) {
      return i2(this.red, "redMul works only with red numbers"), this.red._verify2(this, f2), this.red.mul(this, f2);
    }, o2.prototype.redIMul = function(f2) {
      return i2(this.red, "redMul works only with red numbers"), this.red._verify2(this, f2), this.red.imul(this, f2);
    }, o2.prototype.redSqr = function() {
      return i2(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, o2.prototype.redISqr = function() {
      return i2(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, o2.prototype.redSqrt = function() {
      return i2(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, o2.prototype.redInvm = function() {
      return i2(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, o2.prototype.redNeg = function() {
      return i2(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, o2.prototype.redPow = function(f2) {
      return i2(this.red && !f2.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, f2);
    };
    var H = { k256: null, p224: null, p192: null, p25519: null };
    function L2(b2, f2) {
      this.name = b2, this.p = new o2(f2, 16), this.n = this.p.bitLength(), this.k = new o2(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    L2.prototype._tmp = function() {
      var f2 = new o2(null);
      return f2.words = new Array(Math.ceil(this.n / 13)), f2;
    }, L2.prototype.ireduce = function(f2) {
      var a2 = f2, c;
      do
        this.split(a2, this.tmp), a2 = this.imulK(a2), a2 = a2.iadd(this.tmp), c = a2.bitLength();
      while (c > this.n);
      var d2 = c < this.n ? -1 : a2.ucmp(this.p);
      return d2 === 0 ? (a2.words[0] = 0, a2.length = 1) : d2 > 0 ? a2.isub(this.p) : a2.strip !== void 0 ? a2.strip() : a2._strip(), a2;
    }, L2.prototype.split = function(f2, a2) {
      f2.iushrn(this.n, 0, a2);
    }, L2.prototype.imulK = function(f2) {
      return f2.imul(this.k);
    };
    function Pt2() {
      L2.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    n2(Pt2, L2), Pt2.prototype.split = function(f2, a2) {
      for (var c = 4194303, d2 = Math.min(f2.length, 9), m2 = 0; m2 < d2; m2++)
        a2.words[m2] = f2.words[m2];
      if (a2.length = d2, f2.length <= 9) {
        f2.words[0] = 0, f2.length = 1;
        return;
      }
      var x3 = f2.words[9];
      for (a2.words[a2.length++] = x3 & c, m2 = 10; m2 < f2.length; m2++) {
        var M3 = f2.words[m2] | 0;
        f2.words[m2 - 10] = (M3 & c) << 4 | x3 >>> 22, x3 = M3;
      }
      x3 >>>= 22, f2.words[m2 - 10] = x3, x3 === 0 && f2.length > 10 ? f2.length -= 10 : f2.length -= 9;
    }, Pt2.prototype.imulK = function(f2) {
      f2.words[f2.length] = 0, f2.words[f2.length + 1] = 0, f2.length += 2;
      for (var a2 = 0, c = 0; c < f2.length; c++) {
        var d2 = f2.words[c] | 0;
        a2 += d2 * 977, f2.words[c] = a2 & 67108863, a2 = d2 * 64 + (a2 / 67108864 | 0);
      }
      return f2.words[f2.length - 1] === 0 && (f2.length--, f2.words[f2.length - 1] === 0 && f2.length--), f2;
    };
    function W() {
      L2.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    n2(W, L2);
    function Rt2() {
      L2.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    n2(Rt2, L2);
    function Vt2() {
      L2.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    n2(Vt2, L2), Vt2.prototype.imulK = function(f2) {
      for (var a2 = 0, c = 0; c < f2.length; c++) {
        var d2 = (f2.words[c] | 0) * 19 + a2, m2 = d2 & 67108863;
        d2 >>>= 26, f2.words[c] = m2, a2 = d2;
      }
      return a2 !== 0 && (f2.words[f2.length++] = a2), f2;
    }, o2._prime = function(f2) {
      if (H[f2])
        return H[f2];
      var a2;
      if (f2 === "k256")
        a2 = new Pt2();
      else if (f2 === "p224")
        a2 = new W();
      else if (f2 === "p192")
        a2 = new Rt2();
      else if (f2 === "p25519")
        a2 = new Vt2();
      else
        throw new Error("Unknown prime " + f2);
      return H[f2] = a2, a2;
    };
    function Y(b2) {
      if (typeof b2 == "string") {
        var f2 = o2._prime(b2);
        this.m = f2.p, this.prime = f2;
      } else
        i2(b2.gtn(1), "modulus must be greater than 1"), this.m = b2, this.prime = null;
    }
    Y.prototype._verify1 = function(f2) {
      i2(f2.negative === 0, "red works only with positives"), i2(f2.red, "red works only with red numbers");
    }, Y.prototype._verify2 = function(f2, a2) {
      i2((f2.negative | a2.negative) === 0, "red works only with positives"), i2(f2.red && f2.red === a2.red, "red works only with red numbers");
    }, Y.prototype.imod = function(f2) {
      return this.prime ? this.prime.ireduce(f2)._forceRed(this) : (w2(f2, f2.umod(this.m)._forceRed(this)), f2);
    }, Y.prototype.neg = function(f2) {
      return f2.isZero() ? f2.clone() : this.m.sub(f2)._forceRed(this);
    }, Y.prototype.add = function(f2, a2) {
      this._verify2(f2, a2);
      var c = f2.add(a2);
      return c.cmp(this.m) >= 0 && c.isub(this.m), c._forceRed(this);
    }, Y.prototype.iadd = function(f2, a2) {
      this._verify2(f2, a2);
      var c = f2.iadd(a2);
      return c.cmp(this.m) >= 0 && c.isub(this.m), c;
    }, Y.prototype.sub = function(f2, a2) {
      this._verify2(f2, a2);
      var c = f2.sub(a2);
      return c.cmpn(0) < 0 && c.iadd(this.m), c._forceRed(this);
    }, Y.prototype.isub = function(f2, a2) {
      this._verify2(f2, a2);
      var c = f2.isub(a2);
      return c.cmpn(0) < 0 && c.iadd(this.m), c;
    }, Y.prototype.shl = function(f2, a2) {
      return this._verify1(f2), this.imod(f2.ushln(a2));
    }, Y.prototype.imul = function(f2, a2) {
      return this._verify2(f2, a2), this.imod(f2.imul(a2));
    }, Y.prototype.mul = function(f2, a2) {
      return this._verify2(f2, a2), this.imod(f2.mul(a2));
    }, Y.prototype.isqr = function(f2) {
      return this.imul(f2, f2.clone());
    }, Y.prototype.sqr = function(f2) {
      return this.mul(f2, f2);
    }, Y.prototype.sqrt = function(f2) {
      if (f2.isZero())
        return f2.clone();
      var a2 = this.m.andln(3);
      if (i2(a2 % 2 === 1), a2 === 3) {
        var c = this.m.add(new o2(1)).iushrn(2);
        return this.pow(f2, c);
      }
      for (var d2 = this.m.subn(1), m2 = 0; !d2.isZero() && d2.andln(1) === 0; )
        m2++, d2.iushrn(1);
      i2(!d2.isZero());
      var x3 = new o2(1).toRed(this), M3 = x3.redNeg(), l = this.m.subn(1).iushrn(1), s = this.m.bitLength();
      for (s = new o2(2 * s * s).toRed(this); this.pow(s, l).cmp(M3) !== 0; )
        s.redIAdd(M3);
      for (var g3 = this.pow(s, d2), k2 = this.pow(f2, d2.addn(1).iushrn(1)), u3 = this.pow(f2, d2), E2 = m2; u3.cmp(x3) !== 0; ) {
        for (var _2 = u3, B = 0; _2.cmp(x3) !== 0; B++)
          _2 = _2.redSqr();
        i2(B < E2);
        var R2 = this.pow(g3, new o2(1).iushln(E2 - B - 1));
        k2 = k2.redMul(R2), g3 = R2.redSqr(), u3 = u3.redMul(g3), E2 = B;
      }
      return k2;
    }, Y.prototype.invm = function(f2) {
      var a2 = f2._invmp(this.m);
      return a2.negative !== 0 ? (a2.negative = 0, this.imod(a2).redNeg()) : this.imod(a2);
    }, Y.prototype.pow = function(f2, a2) {
      if (a2.isZero())
        return new o2(1).toRed(this);
      if (a2.cmpn(1) === 0)
        return f2.clone();
      var c = 4, d2 = new Array(1 << c);
      d2[0] = new o2(1).toRed(this), d2[1] = f2;
      for (var m2 = 2; m2 < d2.length; m2++)
        d2[m2] = this.mul(d2[m2 - 1], f2);
      var x3 = d2[0], M3 = 0, l = 0, s = a2.bitLength() % 26;
      for (s === 0 && (s = 26), m2 = a2.length - 1; m2 >= 0; m2--) {
        for (var g3 = a2.words[m2], k2 = s - 1; k2 >= 0; k2--) {
          var u3 = g3 >> k2 & 1;
          if (x3 !== d2[0] && (x3 = this.sqr(x3)), u3 === 0 && M3 === 0) {
            l = 0;
            continue;
          }
          M3 <<= 1, M3 |= u3, l++, !(l !== c && (m2 !== 0 || k2 !== 0)) && (x3 = this.mul(x3, d2[M3]), l = 0, M3 = 0);
        }
        s = 26;
      }
      return x3;
    }, Y.prototype.convertTo = function(f2) {
      var a2 = f2.umod(this.m);
      return a2 === f2 ? a2.clone() : a2;
    }, Y.prototype.convertFrom = function(f2) {
      var a2 = f2.clone();
      return a2.red = null, a2;
    }, o2.mont = function(f2) {
      return new Wt2(f2);
    };
    function Wt2(b2) {
      Y.call(this, b2), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new o2(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    n2(Wt2, Y), Wt2.prototype.convertTo = function(f2) {
      return this.imod(f2.ushln(this.shift));
    }, Wt2.prototype.convertFrom = function(f2) {
      var a2 = this.imod(f2.mul(this.rinv));
      return a2.red = null, a2;
    }, Wt2.prototype.imul = function(f2, a2) {
      if (f2.isZero() || a2.isZero())
        return f2.words[0] = 0, f2.length = 1, f2;
      var c = f2.imul(a2), d2 = c.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), m2 = c.isub(d2).iushrn(this.shift), x3 = m2;
      return m2.cmp(this.m) >= 0 ? x3 = m2.isub(this.m) : m2.cmpn(0) < 0 && (x3 = m2.iadd(this.m)), x3._forceRed(this);
    }, Wt2.prototype.mul = function(f2, a2) {
      if (f2.isZero() || a2.isZero())
        return new o2(0)._forceRed(this);
      var c = f2.mul(a2), d2 = c.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), m2 = c.isub(d2).iushrn(this.shift), x3 = m2;
      return m2.cmp(this.m) >= 0 ? x3 = m2.isub(this.m) : m2.cmpn(0) < 0 && (x3 = m2.iadd(this.m)), x3._forceRed(this);
    }, Wt2.prototype.invm = function(f2) {
      var a2 = this.imod(f2._invmp(this.m).mul(this.r2));
      return a2._forceRed(this);
    };
  })(e, Kn);
})(Xn);
var K = Xn.exports;
const $n = "bignumber/5.7.0";
var Dr$1 = K.BN;
const Ae$1 = new z$2($n), Ni = {}, Zn = 9007199254740991;
function Hs$1(e) {
  return e != null && (V.isBigNumber(e) || typeof e == "number" && e % 1 === 0 || typeof e == "string" && !!e.match(/^-?[0-9]+$/) || Jt$1(e) || typeof e == "bigint" || nr$1(e));
}
let tf = false;
class V {
  constructor(t, r2) {
    t !== Ni && Ae$1.throwError("cannot call constructor directly; use BigNumber.from", z$2.errors.UNSUPPORTED_OPERATION, { operation: "new (BigNumber)" }), this._hex = r2, this._isBigNumber = true, Object.freeze(this);
  }
  fromTwos(t) {
    return zt$1(j$2(this).fromTwos(t));
  }
  toTwos(t) {
    return zt$1(j$2(this).toTwos(t));
  }
  abs() {
    return this._hex[0] === "-" ? V.from(this._hex.substring(1)) : this;
  }
  add(t) {
    return zt$1(j$2(this).add(j$2(t)));
  }
  sub(t) {
    return zt$1(j$2(this).sub(j$2(t)));
  }
  div(t) {
    return V.from(t).isZero() && $t$1("division-by-zero", "div"), zt$1(j$2(this).div(j$2(t)));
  }
  mul(t) {
    return zt$1(j$2(this).mul(j$2(t)));
  }
  mod(t) {
    const r2 = j$2(t);
    return r2.isNeg() && $t$1("division-by-zero", "mod"), zt$1(j$2(this).umod(r2));
  }
  pow(t) {
    const r2 = j$2(t);
    return r2.isNeg() && $t$1("negative-power", "pow"), zt$1(j$2(this).pow(r2));
  }
  and(t) {
    const r2 = j$2(t);
    return (this.isNegative() || r2.isNeg()) && $t$1("unbound-bitwise-result", "and"), zt$1(j$2(this).and(r2));
  }
  or(t) {
    const r2 = j$2(t);
    return (this.isNegative() || r2.isNeg()) && $t$1("unbound-bitwise-result", "or"), zt$1(j$2(this).or(r2));
  }
  xor(t) {
    const r2 = j$2(t);
    return (this.isNegative() || r2.isNeg()) && $t$1("unbound-bitwise-result", "xor"), zt$1(j$2(this).xor(r2));
  }
  mask(t) {
    return (this.isNegative() || t < 0) && $t$1("negative-width", "mask"), zt$1(j$2(this).maskn(t));
  }
  shl(t) {
    return (this.isNegative() || t < 0) && $t$1("negative-width", "shl"), zt$1(j$2(this).shln(t));
  }
  shr(t) {
    return (this.isNegative() || t < 0) && $t$1("negative-width", "shr"), zt$1(j$2(this).shrn(t));
  }
  eq(t) {
    return j$2(this).eq(j$2(t));
  }
  lt(t) {
    return j$2(this).lt(j$2(t));
  }
  lte(t) {
    return j$2(this).lte(j$2(t));
  }
  gt(t) {
    return j$2(this).gt(j$2(t));
  }
  gte(t) {
    return j$2(this).gte(j$2(t));
  }
  isNegative() {
    return this._hex[0] === "-";
  }
  isZero() {
    return j$2(this).isZero();
  }
  toNumber() {
    try {
      return j$2(this).toNumber();
    } catch {
      $t$1("overflow", "toNumber", this.toString());
    }
    return null;
  }
  toBigInt() {
    try {
      return BigInt(this.toString());
    } catch {
    }
    return Ae$1.throwError("this platform does not support BigInt", z$2.errors.UNSUPPORTED_OPERATION, { value: this.toString() });
  }
  toString() {
    return arguments.length > 0 && (arguments[0] === 10 ? tf || (tf = true, Ae$1.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")) : arguments[0] === 16 ? Ae$1.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", z$2.errors.UNEXPECTED_ARGUMENT, {}) : Ae$1.throwError("BigNumber.toString does not accept parameters", z$2.errors.UNEXPECTED_ARGUMENT, {})), j$2(this).toString(10);
  }
  toHexString() {
    return this._hex;
  }
  toJSON(t) {
    return { type: "BigNumber", hex: this.toHexString() };
  }
  static from(t) {
    if (t instanceof V)
      return t;
    if (typeof t == "string")
      return t.match(/^-?0x[0-9a-f]+$/i) ? new V(Ni, mr$1(t)) : t.match(/^-?[0-9]+$/) ? new V(Ni, mr$1(new Dr$1(t))) : Ae$1.throwArgumentError("invalid BigNumber string", "value", t);
    if (typeof t == "number")
      return t % 1 && $t$1("underflow", "BigNumber.from", t), (t >= Zn || t <= -Zn) && $t$1("overflow", "BigNumber.from", t), V.from(String(t));
    const r2 = t;
    if (typeof r2 == "bigint")
      return V.from(r2.toString());
    if (nr$1(r2))
      return V.from(Kt$1(r2));
    if (r2)
      if (r2.toHexString) {
        const i2 = r2.toHexString();
        if (typeof i2 == "string")
          return V.from(i2);
      } else {
        let i2 = r2._hex;
        if (i2 == null && r2.type === "BigNumber" && (i2 = r2.hex), typeof i2 == "string" && (Jt$1(i2) || i2[0] === "-" && Jt$1(i2.substring(1))))
          return V.from(i2);
      }
    return Ae$1.throwArgumentError("invalid BigNumber value", "value", t);
  }
  static isBigNumber(t) {
    return !!(t && t._isBigNumber);
  }
}
function mr$1(e) {
  if (typeof e != "string")
    return mr$1(e.toString(16));
  if (e[0] === "-")
    return e = e.substring(1), e[0] === "-" && Ae$1.throwArgumentError("invalid hex", "value", e), e = mr$1(e), e === "0x00" ? e : "-" + e;
  if (e.substring(0, 2) !== "0x" && (e = "0x" + e), e === "0x")
    return "0x00";
  for (e.length % 2 && (e = "0x0" + e.substring(2)); e.length > 4 && e.substring(0, 4) === "0x00"; )
    e = "0x" + e.substring(4);
  return e;
}
function zt$1(e) {
  return V.from(mr$1(e));
}
function j$2(e) {
  const t = V.from(e).toHexString();
  return t[0] === "-" ? new Dr$1("-" + t.substring(3), 16) : new Dr$1(t.substring(2), 16);
}
function $t$1(e, t, r2) {
  const i2 = { fault: e, operation: t };
  return r2 != null && (i2.value = r2), Ae$1.throwError(e, z$2.errors.NUMERIC_FAULT, i2);
}
function Ls$1(e) {
  return new Dr$1(e, 36).toString(16);
}
const Ht$1 = new z$2($n), Ar$1 = {}, ef = V.from(0), rf = V.from(-1);
function nf(e, t, r2, i2) {
  const n2 = { fault: t, operation: r2 };
  return i2 !== void 0 && (n2.value = i2), Ht$1.throwError(e, z$2.errors.NUMERIC_FAULT, n2);
}
let br$1 = "0";
for (; br$1.length < 256; )
  br$1 += br$1;
function _i(e) {
  if (typeof e != "number")
    try {
      e = V.from(e).toNumber();
    } catch {
    }
  return typeof e == "number" && e >= 0 && e <= 256 && !(e % 1) ? "1" + br$1.substring(0, e) : Ht$1.throwArgumentError("invalid decimal size", "decimals", e);
}
function Bi$1(e, t) {
  t == null && (t = 0);
  const r2 = _i(t);
  e = V.from(e);
  const i2 = e.lt(ef);
  i2 && (e = e.mul(rf));
  let n2 = e.mod(r2).toString();
  for (; n2.length < r2.length - 1; )
    n2 = "0" + n2;
  n2 = n2.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  const o2 = e.div(r2).toString();
  return r2.length === 1 ? e = o2 : e = o2 + "." + n2, i2 && (e = "-" + e), e;
}
function be$2(e, t) {
  t == null && (t = 0);
  const r2 = _i(t);
  (typeof e != "string" || !e.match(/^-?[0-9.]+$/)) && Ht$1.throwArgumentError("invalid decimal value", "value", e);
  const i2 = e.substring(0, 1) === "-";
  i2 && (e = e.substring(1)), e === "." && Ht$1.throwArgumentError("missing value", "value", e);
  const n2 = e.split(".");
  n2.length > 2 && Ht$1.throwArgumentError("too many decimal points", "value", e);
  let o2 = n2[0], h2 = n2[1];
  for (o2 || (o2 = "0"), h2 || (h2 = "0"); h2[h2.length - 1] === "0"; )
    h2 = h2.substring(0, h2.length - 1);
  for (h2.length > r2.length - 1 && nf("fractional component exceeds decimals", "underflow", "parseFixed"), h2 === "" && (h2 = "0"); h2.length < r2.length - 1; )
    h2 += "0";
  const p3 = V.from(o2), A2 = V.from(h2);
  let v3 = p3.mul(r2).add(A2);
  return i2 && (v3 = v3.mul(rf)), v3;
}
let vr$1 = class vr {
  constructor(t, r2, i2, n2) {
    t !== Ar$1 && Ht$1.throwError("cannot use FixedFormat constructor; use FixedFormat.from", z$2.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.signed = r2, this.width = i2, this.decimals = n2, this.name = (r2 ? "" : "u") + "fixed" + String(i2) + "x" + String(n2), this._multiplier = _i(n2), Object.freeze(this);
  }
  static from(t) {
    if (t instanceof vr)
      return t;
    typeof t == "number" && (t = `fixed128x${t}`);
    let r2 = true, i2 = 128, n2 = 18;
    if (typeof t == "string") {
      if (t !== "fixed")
        if (t === "ufixed")
          r2 = false;
        else {
          const o2 = t.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
          o2 || Ht$1.throwArgumentError("invalid fixed format", "format", t), r2 = o2[1] !== "u", i2 = parseInt(o2[2]), n2 = parseInt(o2[3]);
        }
    } else if (t) {
      const o2 = (h2, p3, A2) => t[h2] == null ? A2 : (typeof t[h2] !== p3 && Ht$1.throwArgumentError("invalid fixed format (" + h2 + " not " + p3 + ")", "format." + h2, t[h2]), t[h2]);
      r2 = o2("signed", "boolean", r2), i2 = o2("width", "number", i2), n2 = o2("decimals", "number", n2);
    }
    return i2 % 8 && Ht$1.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", i2), n2 > 80 && Ht$1.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", n2), new vr(Ar$1, r2, i2, n2);
  }
};
let Ut$1 = class Ut {
  constructor(t, r2, i2, n2) {
    t !== Ar$1 && Ht$1.throwError("cannot use FixedNumber constructor; use FixedNumber.from", z$2.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.format = n2, this._hex = r2, this._value = i2, this._isFixedNumber = true, Object.freeze(this);
  }
  _checkFormat(t) {
    this.format.name !== t.format.name && Ht$1.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", t);
  }
  addUnsafe(t) {
    this._checkFormat(t);
    const r2 = be$2(this._value, this.format.decimals), i2 = be$2(t._value, t.format.decimals);
    return Ut.fromValue(r2.add(i2), this.format.decimals, this.format);
  }
  subUnsafe(t) {
    this._checkFormat(t);
    const r2 = be$2(this._value, this.format.decimals), i2 = be$2(t._value, t.format.decimals);
    return Ut.fromValue(r2.sub(i2), this.format.decimals, this.format);
  }
  mulUnsafe(t) {
    this._checkFormat(t);
    const r2 = be$2(this._value, this.format.decimals), i2 = be$2(t._value, t.format.decimals);
    return Ut.fromValue(r2.mul(i2).div(this.format._multiplier), this.format.decimals, this.format);
  }
  divUnsafe(t) {
    this._checkFormat(t);
    const r2 = be$2(this._value, this.format.decimals), i2 = be$2(t._value, t.format.decimals);
    return Ut.fromValue(r2.mul(this.format._multiplier).div(i2), this.format.decimals, this.format);
  }
  floor() {
    const t = this.toString().split(".");
    t.length === 1 && t.push("0");
    let r2 = Ut.from(t[0], this.format);
    const i2 = !t[1].match(/^(0*)$/);
    return this.isNegative() && i2 && (r2 = r2.subUnsafe(ff.toFormat(r2.format))), r2;
  }
  ceiling() {
    const t = this.toString().split(".");
    t.length === 1 && t.push("0");
    let r2 = Ut.from(t[0], this.format);
    const i2 = !t[1].match(/^(0*)$/);
    return !this.isNegative() && i2 && (r2 = r2.addUnsafe(ff.toFormat(r2.format))), r2;
  }
  round(t) {
    t == null && (t = 0);
    const r2 = this.toString().split(".");
    if (r2.length === 1 && r2.push("0"), (t < 0 || t > 80 || t % 1) && Ht$1.throwArgumentError("invalid decimal count", "decimals", t), r2[1].length <= t)
      return this;
    const i2 = Ut.from("1" + br$1.substring(0, t), this.format), n2 = zs$1.toFormat(this.format);
    return this.mulUnsafe(i2).addUnsafe(n2).floor().divUnsafe(i2);
  }
  isZero() {
    return this._value === "0.0" || this._value === "0";
  }
  isNegative() {
    return this._value[0] === "-";
  }
  toString() {
    return this._value;
  }
  toHexString(t) {
    if (t == null)
      return this._hex;
    t % 8 && Ht$1.throwArgumentError("invalid byte width", "width", t);
    const r2 = V.from(this._hex).fromTwos(this.format.width).toTwos(t).toHexString();
    return oe$2(r2, t / 8);
  }
  toUnsafeFloat() {
    return parseFloat(this.toString());
  }
  toFormat(t) {
    return Ut.fromString(this._value, t);
  }
  static fromValue(t, r2, i2) {
    return i2 == null && r2 != null && !Hs$1(r2) && (i2 = r2, r2 = null), r2 == null && (r2 = 0), i2 == null && (i2 = "fixed"), Ut.fromString(Bi$1(t, r2), vr$1.from(i2));
  }
  static fromString(t, r2) {
    r2 == null && (r2 = "fixed");
    const i2 = vr$1.from(r2), n2 = be$2(t, i2.decimals);
    !i2.signed && n2.lt(ef) && nf("unsigned value cannot be negative", "overflow", "value", t);
    let o2 = null;
    i2.signed ? o2 = n2.toTwos(i2.width).toHexString() : (o2 = n2.toHexString(), o2 = oe$2(o2, i2.width / 8));
    const h2 = Bi$1(n2, i2.decimals);
    return new Ut(Ar$1, o2, h2, i2);
  }
  static fromBytes(t, r2) {
    r2 == null && (r2 = "fixed");
    const i2 = vr$1.from(r2);
    if (Ot$1(t).length > i2.width / 8)
      throw new Error("overflow");
    let n2 = V.from(t);
    i2.signed && (n2 = n2.fromTwos(i2.width));
    const o2 = n2.toTwos((i2.signed ? 0 : 1) + i2.width).toHexString(), h2 = Bi$1(n2, i2.decimals);
    return new Ut(Ar$1, o2, h2, i2);
  }
  static from(t, r2) {
    if (typeof t == "string")
      return Ut.fromString(t, r2);
    if (nr$1(t))
      return Ut.fromBytes(t, r2);
    try {
      return Ut.fromValue(t, 0, r2);
    } catch (i2) {
      if (i2.code !== z$2.errors.INVALID_ARGUMENT)
        throw i2;
    }
    return Ht$1.throwArgumentError("invalid FixedNumber value", "value", t);
  }
  static isFixedNumber(t) {
    return !!(t && t._isFixedNumber);
  }
};
const ff = Ut$1.from(1), zs$1 = Ut$1.from("0.5"), js$1 = "strings/5.7.0", of = new z$2(js$1);
var Fr$1;
(function(e) {
  e.current = "", e.NFC = "NFC", e.NFD = "NFD", e.NFKC = "NFKC", e.NFKD = "NFKD";
})(Fr$1 || (Fr$1 = {}));
var fr$1;
(function(e) {
  e.UNEXPECTED_CONTINUE = "unexpected continuation byte", e.BAD_PREFIX = "bad codepoint prefix", e.OVERRUN = "string overrun", e.MISSING_CONTINUE = "missing continuation byte", e.OUT_OF_RANGE = "out of UTF-8 range", e.UTF16_SURROGATE = "UTF-16 surrogate", e.OVERLONG = "overlong representation";
})(fr$1 || (fr$1 = {}));
function Ci(e, t = Fr$1.current) {
  t != Fr$1.current && (of.checkNormalize(), e = e.normalize(t));
  let r2 = [];
  for (let i2 = 0; i2 < e.length; i2++) {
    const n2 = e.charCodeAt(i2);
    if (n2 < 128)
      r2.push(n2);
    else if (n2 < 2048)
      r2.push(n2 >> 6 | 192), r2.push(n2 & 63 | 128);
    else if ((n2 & 64512) == 55296) {
      i2++;
      const o2 = e.charCodeAt(i2);
      if (i2 >= e.length || (o2 & 64512) !== 56320)
        throw new Error("invalid utf-8 string");
      const h2 = 65536 + ((n2 & 1023) << 10) + (o2 & 1023);
      r2.push(h2 >> 18 | 240), r2.push(h2 >> 12 & 63 | 128), r2.push(h2 >> 6 & 63 | 128), r2.push(h2 & 63 | 128);
    } else
      r2.push(n2 >> 12 | 224), r2.push(n2 >> 6 & 63 | 128), r2.push(n2 & 63 | 128);
  }
  return Ot$1(r2);
}
function Gs$1(e) {
  if (e.length % 4 !== 0)
    throw new Error("bad data");
  let t = [];
  for (let r2 = 0; r2 < e.length; r2 += 4)
    t.push(parseInt(e.substring(r2, r2 + 4), 16));
  return t;
}
function Ri(e, t) {
  t || (t = function(n2) {
    return [parseInt(n2, 16)];
  });
  let r2 = 0, i2 = {};
  return e.split(",").forEach((n2) => {
    let o2 = n2.split(":");
    r2 += parseInt(o2[0], 16), i2[r2] = t(o2[1]);
  }), i2;
}
function af(e) {
  let t = 0;
  return e.split(",").map((r2) => {
    let i2 = r2.split("-");
    i2.length === 1 ? i2[1] = "0" : i2[1] === "" && (i2[1] = "1");
    let n2 = t + parseInt(i2[0], 16);
    return t = parseInt(i2[1], 16), { l: n2, h: t };
  });
}
af("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d"), "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((e) => parseInt(e, 16)), Ri("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3"), Ri("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7"), Ri("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", Gs$1), af("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
function Ys$1(e) {
  e = atob(e);
  const t = [];
  for (let r2 = 0; r2 < e.length; r2++)
    t.push(e.charCodeAt(r2));
  return Ot$1(t);
}
function hf(e, t) {
  t == null && (t = 1);
  const r2 = [], i2 = r2.forEach, n2 = function(o2, h2) {
    i2.call(o2, function(p3) {
      h2 > 0 && Array.isArray(p3) ? n2(p3, h2 - 1) : r2.push(p3);
    });
  };
  return n2(e, t), r2;
}
function Vs$1(e) {
  const t = {};
  for (let r2 = 0; r2 < e.length; r2++) {
    const i2 = e[r2];
    t[i2[0]] = i2[1];
  }
  return t;
}
function Ws$1(e) {
  let t = 0;
  function r2() {
    return e[t++] << 8 | e[t++];
  }
  let i2 = r2(), n2 = 1, o2 = [0, 1];
  for (let H = 1; H < i2; H++)
    o2.push(n2 += r2());
  let h2 = r2(), p3 = t;
  t += h2;
  let A2 = 0, v3 = 0;
  function w2() {
    return A2 == 0 && (v3 = v3 << 8 | e[t++], A2 = 8), v3 >> --A2 & 1;
  }
  const y3 = 31, S2 = Math.pow(2, y3), N2 = S2 >>> 1, I2 = N2 >> 1, C3 = S2 - 1;
  let D2 = 0;
  for (let H = 0; H < y3; H++)
    D2 = D2 << 1 | w2();
  let U2 = [], J = 0, Bt2 = S2;
  for (; ; ) {
    let H = Math.floor(((D2 - J + 1) * n2 - 1) / Bt2), L2 = 0, Pt2 = i2;
    for (; Pt2 - L2 > 1; ) {
      let Vt2 = L2 + Pt2 >>> 1;
      H < o2[Vt2] ? Pt2 = Vt2 : L2 = Vt2;
    }
    if (L2 == 0)
      break;
    U2.push(L2);
    let W = J + Math.floor(Bt2 * o2[L2] / n2), Rt2 = J + Math.floor(Bt2 * o2[L2 + 1] / n2) - 1;
    for (; !((W ^ Rt2) & N2); )
      D2 = D2 << 1 & C3 | w2(), W = W << 1 & C3, Rt2 = Rt2 << 1 & C3 | 1;
    for (; W & ~Rt2 & I2; )
      D2 = D2 & N2 | D2 << 1 & C3 >>> 1 | w2(), W = W << 1 ^ N2, Rt2 = (Rt2 ^ N2) << 1 | N2 | 1;
    J = W, Bt2 = 1 + Rt2 - W;
  }
  let G2 = i2 - 4;
  return U2.map((H) => {
    switch (H - G2) {
      case 3:
        return G2 + 65792 + (e[p3++] << 16 | e[p3++] << 8 | e[p3++]);
      case 2:
        return G2 + 256 + (e[p3++] << 8 | e[p3++]);
      case 1:
        return G2 + e[p3++];
      default:
        return H - 1;
    }
  });
}
function Xs$1(e) {
  let t = 0;
  return () => e[t++];
}
function $s$1(e) {
  return Xs$1(Ws$1(e));
}
function Zs$1(e) {
  return e & 1 ? ~e >> 1 : e >> 1;
}
function t0(e, t) {
  let r2 = Array(e);
  for (let i2 = 0; i2 < e; i2++)
    r2[i2] = 1 + t();
  return r2;
}
function cf(e, t) {
  let r2 = Array(e);
  for (let i2 = 0, n2 = -1; i2 < e; i2++)
    r2[i2] = n2 += 1 + t();
  return r2;
}
function e0(e, t) {
  let r2 = Array(e);
  for (let i2 = 0, n2 = 0; i2 < e; i2++)
    r2[i2] = n2 += Zs$1(t());
  return r2;
}
function Ur$1(e, t) {
  let r2 = cf(e(), e), i2 = e(), n2 = cf(i2, e), o2 = t0(i2, e);
  for (let h2 = 0; h2 < i2; h2++)
    for (let p3 = 0; p3 < o2[h2]; p3++)
      r2.push(n2[h2] + p3);
  return t ? r2.map((h2) => t[h2]) : r2;
}
function r0(e) {
  let t = [];
  for (; ; ) {
    let r2 = e();
    if (r2 == 0)
      break;
    t.push(n0(r2, e));
  }
  for (; ; ) {
    let r2 = e() - 1;
    if (r2 < 0)
      break;
    t.push(f0(r2, e));
  }
  return Vs$1(hf(t));
}
function i0(e) {
  let t = [];
  for (; ; ) {
    let r2 = e();
    if (r2 == 0)
      break;
    t.push(r2);
  }
  return t;
}
function lf(e, t, r2) {
  let i2 = Array(e).fill(void 0).map(() => []);
  for (let n2 = 0; n2 < t; n2++)
    e0(e, r2).forEach((o2, h2) => i2[h2].push(o2));
  return i2;
}
function n0(e, t) {
  let r2 = 1 + t(), i2 = t(), n2 = i0(t), o2 = lf(n2.length, 1 + e, t);
  return hf(o2.map((h2, p3) => {
    const A2 = h2[0], v3 = h2.slice(1);
    return Array(n2[p3]).fill(void 0).map((w2, y3) => {
      let S2 = y3 * i2;
      return [A2 + y3 * r2, v3.map((N2) => N2 + S2)];
    });
  }));
}
function f0(e, t) {
  let r2 = 1 + t();
  return lf(r2, 1 + e, t).map((n2) => [n2[0], n2.slice(1)]);
}
function o0(e) {
  let t = Ur$1(e).sort((i2, n2) => i2 - n2);
  return r2();
  function r2() {
    let i2 = [];
    for (; ; ) {
      let v3 = Ur$1(e, t);
      if (v3.length == 0)
        break;
      i2.push({ set: new Set(v3), node: r2() });
    }
    i2.sort((v3, w2) => w2.set.size - v3.set.size);
    let n2 = e(), o2 = n2 % 3;
    n2 = n2 / 3 | 0;
    let h2 = !!(n2 & 1);
    n2 >>= 1;
    let p3 = n2 == 1, A2 = n2 == 2;
    return { branches: i2, valid: o2, fe0f: h2, save: p3, check: A2 };
  }
}
function s0() {
  return $s$1(Ys$1("AEQF2AO2DEsA2wIrAGsBRABxAN8AZwCcAEwAqgA0AGwAUgByADcATAAVAFYAIQAyACEAKAAYAFgAGwAjABQAMAAmADIAFAAfABQAKwATACoADgAbAA8AHQAYABoAGQAxADgALAAoADwAEwA9ABMAGgARAA4ADwAWABMAFgAIAA8AHgQXBYMA5BHJAS8JtAYoAe4AExozi0UAH21tAaMnBT8CrnIyhrMDhRgDygIBUAEHcoFHUPe8AXBjAewCjgDQR8IICIcEcQLwATXCDgzvHwBmBoHNAqsBdBcUAykgDhAMShskMgo8AY8jqAQfAUAfHw8BDw87MioGlCIPBwZCa4ELatMAAMspJVgsDl8AIhckSg8XAHdvTwBcIQEiDT4OPhUqbyECAEoAS34Aej8Ybx83JgT/Xw8gHxZ/7w8RICxPHA9vBw+Pfw8PHwAPFv+fAsAvCc8vEr8ivwD/EQ8Bol8OEBa/A78hrwAPCU8vESNvvwWfHwNfAVoDHr+ZAAED34YaAdJPAK7PLwSEgDLHAGo1Pz8Pvx9fUwMrpb8O/58VTzAPIBoXIyQJNF8hpwIVAT8YGAUADDNBaX3RAMomJCg9EhUeA29MABsZBTMNJipjOhc19gcIDR8bBwQHEggCWi6DIgLuAQYA+BAFCha3A5XiAEsqM7UFFgFLhAMjFTMYE1Klnw74nRVBG/ASCm0BYRN/BrsU3VoWy+S0vV8LQx+vN8gF2AC2AK5EAWwApgYDKmAAroQ0NDQ0AT+OCg7wAAIHRAbpNgVcBV0APTA5BfbPFgMLzcYL/QqqA82eBALKCjQCjqYCht0/k2+OAsXQAoP3ASTKDgDw6ACKAUYCMpIKJpRaAE4A5womABzZvs0REEKiACIQAd5QdAECAj4Ywg/wGqY2AVgAYADYvAoCGAEubA0gvAY2ALAAbpbvqpyEAGAEpgQAJgAG7gAgAEACmghUFwCqAMpAINQIwC4DthRAAPcycKgApoIdABwBfCisABoATwBqASIAvhnSBP8aH/ECeAKXAq40NjgDBTwFYQU6AXs3oABgAD4XNgmcCY1eCl5tIFZeUqGgyoNHABgAEQAaABNwWQAmABMATPMa3T34ADldyprmM1M2XociUQgLzvwAXT3xABgAEQAaABNwIGFAnADD8AAgAD4BBJWzaCcIAIEBFMAWwKoAAdq9BWAF5wLQpALEtQAKUSGkahR4GnJM+gsAwCgeFAiUAECQ0BQuL8AAIAAAADKeIheclvFqQAAETr4iAMxIARMgAMIoHhQIAn0E0pDQFC4HhznoAAAAIAI2C0/4lvFqQAAETgBJJwYCAy4ABgYAFAA8MBKYEH4eRhTkAjYeFcgACAYAeABsOqyQ5gRwDayqugEgaIIAtgoACgDmEABmBAWGme5OBJJA2m4cDeoAmITWAXwrMgOgAGwBCh6CBXYF1Tzg1wKAAFdiuABRAFwAXQBsAG8AdgBrAHYAbwCEAHEwfxQBVE5TEQADVFhTBwBDANILAqcCzgLTApQCrQL6vAAMAL8APLhNBKkE6glGKTAU4Dr4N2EYEwBCkABKk8rHAbYBmwIoAiU4Ajf/Aq4CowCAANIChzgaNBsCsTgeODcFXrgClQKdAqQBiQGYAqsCsjTsNHsfNPA0ixsAWTWiOAMFPDQSNCk2BDZHNow2TTZUNhk28Jk9VzI3QkEoAoICoQKwAqcAQAAxBV4FXbS9BW47YkIXP1ciUqs05DS/FwABUwJW11e6nHuYZmSh/RAYA8oMKvZ8KASoUAJYWAJ6ILAsAZSoqjpgA0ocBIhmDgDWAAawRDQoAAcuAj5iAHABZiR2AIgiHgCaAU68ACxuHAG0ygM8MiZIAlgBdF4GagJqAPZOHAMuBgoATkYAsABiAHgAMLoGDPj0HpKEBAAOJgAuALggTAHWAeAMEDbd20Uege0ADwAWADkAQgA9OHd+2MUQZBBhBgNNDkxxPxUQArEPqwvqERoM1irQ090ANK4H8ANYB/ADWANYB/AH8ANYB/ADWANYA1gDWBwP8B/YxRBkD00EcgWTBZAE2wiIJk4RhgctCNdUEnQjHEwDSgEBIypJITuYMxAlR0wRTQgIATZHbKx9PQNMMbBU+pCnA9AyVDlxBgMedhKlAC8PeCE1uk6DekxxpQpQT7NX9wBFBgASqwAS5gBJDSgAUCwGPQBI4zTYABNGAE2bAE3KAExdGABKaAbgAFBXAFCOAFBJABI2SWdObALDOq0//QomCZhvwHdTBkIQHCemEPgMNAG2ATwN7kvZBPIGPATKH34ZGg/OlZ0Ipi3eDO4m5C6igFsj9iqEBe5L9TzeC05RaQ9aC2YJ5DpkgU8DIgEOIowK3g06CG4Q9ArKbA3mEUYHOgPWSZsApgcCCxIdNhW2JhFirQsKOXgG/Br3C5AmsBMqev0F1BoiBk4BKhsAANAu6IWxWjJcHU9gBgQLJiPIFKlQIQ0mQLh4SRocBxYlqgKSQ3FKiFE3HpQh9zw+DWcuFFF9B/Y8BhlQC4I8n0asRQ8R0z6OPUkiSkwtBDaALDAnjAnQD4YMunxzAVoJIgmyDHITMhEYN8YIOgcaLpclJxYIIkaWYJsE+KAD9BPSAwwFQAlCBxQDthwuEy8VKgUOgSXYAvQ21i60ApBWgQEYBcwPJh/gEFFH4Q7qCJwCZgOEJewALhUiABginAhEZABgj9lTBi7MCMhqbSN1A2gU6GIRdAeSDlgHqBw0FcAc4nDJXgyGCSiksAlcAXYJmgFgBOQICjVcjKEgQmdUi1kYnCBiQUBd/QIyDGYVoES+h3kCjA9sEhwBNgF0BzoNAgJ4Ee4RbBCWCOyGBTW2M/k6JgRQIYQgEgooA1BszwsoJvoM+WoBpBJjAw00PnfvZ6xgtyUX/gcaMsZBYSHyC5NPzgydGsIYQ1QvGeUHwAP0GvQn60FYBgADpAQUOk4z7wS+C2oIjAlAAEoOpBgH2BhrCnKM0QEyjAG4mgNYkoQCcJAGOAcMAGgMiAV65gAeAqgIpAAGANADWAA6Aq4HngAaAIZCAT4DKDABIuYCkAOUCDLMAZYwAfQqBBzEDBYA+DhuSwLDsgKAa2ajBd5ZAo8CSjYBTiYEBk9IUgOwcuIA3ABMBhTgSAEWrEvMG+REAeBwLADIAPwABjYHBkIBzgH0bgC4AWALMgmjtLYBTuoqAIQAFmwB2AKKAN4ANgCA8gFUAE4FWvoF1AJQSgESMhksWGIBvAMgATQBDgB6BsyOpsoIIARuB9QCEBwV4gLvLwe2AgMi4BPOQsYCvd9WADIXUu5eZwqoCqdeaAC0YTQHMnM9UQAPH6k+yAdy/BZIiQImSwBQ5gBQQzSaNTFWSTYBpwGqKQK38AFtqwBI/wK37gK3rQK3sAK6280C0gK33AK3zxAAUEIAUD9SklKDArekArw5AEQAzAHCO147WTteO1k7XjtZO147WTteO1kDmChYI03AVU0oJqkKbV9GYewMpw3VRMk6ShPcYFJgMxPJLbgUwhXPJVcZPhq9JwYl5VUKDwUt1GYxCC00dhe9AEApaYNCY4ceMQpMHOhTklT5LRwAskujM7ANrRsWREEFSHXuYisWDwojAmSCAmJDXE6wXDchAqH4AmiZAmYKAp+FOBwMAmY8AmYnBG8EgAN/FAN+kzkHOXgYOYM6JCQCbB4CMjc4CwJtyAJtr/CLADRoRiwBaADfAOIASwYHmQyOAP8MwwAOtgJ3MAJ2o0ACeUxEAni7Hl3cRa9G9AJ8QAJ6yQJ9CgJ88UgBSH5kJQAsFklZSlwWGErNAtECAtDNSygDiFADh+dExpEzAvKiXQQDA69Lz0wuJgTQTU1NsAKLQAKK2cIcCB5EaAa4Ao44Ao5dQZiCAo7aAo5deVG1UzYLUtVUhgKT/AKTDQDqAB1VH1WwVdEHLBwplocy4nhnRTw6ApegAu+zWCKpAFomApaQApZ9nQCqWa1aCoJOADwClrYClk9cRVzSApnMApllXMtdCBoCnJw5wzqeApwXAp+cAp65iwAeEDIrEAKd8gKekwC2PmE1YfACntQCoG8BqgKeoCACnk+mY8lkKCYsAiewAiZ/AqD8AqBN2AKmMAKlzwKoAAB+AqfzaH1osgAESmodatICrOQCrK8CrWgCrQMCVx4CVd0CseLYAx9PbJgCsr4OArLpGGzhbWRtSWADJc4Ctl08QG6RAylGArhfArlIFgK5K3hwN3DiAr0aAy2zAzISAr6JcgMDM3ICvhtzI3NQAsPMAsMFc4N0TDZGdOEDPKgDPJsDPcACxX0CxkgCxhGKAshqUgLIRQLJUALJLwJkngLd03h6YniveSZL0QMYpGcDAmH1GfSVJXsMXpNevBICz2wCz20wTFTT9BSgAMeuAs90ASrrA04TfkwGAtwoAtuLAtJQA1JdA1NgAQIDVY2AikABzBfuYUZ2AILPg44C2sgC2d+EEYRKpz0DhqYAMANkD4ZyWvoAVgLfZgLeuXR4AuIw7RUB8zEoAfScAfLTiALr9ALpcXoAAur6AurlAPpIAboC7ooC652Wq5cEAu5AA4XhmHpw4XGiAvMEAGoDjheZlAL3FAORbwOSiAL3mQL52gL4Z5odmqy8OJsfA52EAv77ARwAOp8dn7QDBY4DpmsDptoA0sYDBmuhiaIGCgMMSgFgASACtgNGAJwEgLpoBgC8BGzAEowcggCEDC6kdjoAJAM0C5IKRoABZCgiAIzw3AYBLACkfng9ogigkgNmWAN6AEQCvrkEVqTGAwCsBRbAA+4iQkMCHR072jI2PTbUNsk2RjY5NvA23TZKNiU3EDcZN5I+RTxDRTBCJkK5VBYKFhZfwQCWygU3AJBRHpu+OytgNxa61A40GMsYjsn7BVwFXQVcBV0FaAVdBVwFXQVcBV0FXAVdBVwFXUsaCNyKAK4AAQUHBwKU7oICoW1e7jAEzgPxA+YDwgCkBFDAwADABKzAAOxFLhitA1UFTDeyPkM+bj51QkRCuwTQWWQ8X+0AWBYzsACNA8xwzAGm7EZ/QisoCTAbLDs6fnLfb8H2GccsbgFw13M1HAVkBW/Jxsm9CNRO8E8FDD0FBQw9FkcClOYCoMFegpDfADgcMiA2AJQACB8AsigKAIzIEAJKeBIApY5yPZQIAKQiHb4fvj5BKSRPQrZCOz0oXyxgOywfKAnGbgMClQaCAkILXgdeCD9IIGUgQj5fPoY+dT52Ao5CM0dAX9BTVG9SDzFwWTQAbxBzJF/lOEIQQglCCkKJIAls5AcClQICoKPMODEFxhi6KSAbiyfIRrMjtCgdWCAkPlFBIitCsEJRzAbMAV/OEyQzDg0OAQQEJ36i328/Mk9AybDJsQlq3tDRApUKAkFzXf1d/j9uALYP6hCoFgCTGD8kPsFKQiobrm0+zj0KSD8kPnVCRBwMDyJRTHFgMTJa5rwXQiQ2YfI/JD7BMEJEHGINTw4TOFlIRzwJO0icMQpyPyQ+wzJCRBv6DVgnKB01NgUKj2bwYzMqCoBkznBgEF+zYDIocwRIX+NgHj4HICNfh2C4CwdwFWpTG/lgUhYGAwRfv2Ts8mAaXzVgml/XYIJfuWC4HI1gUF9pYJZgMR6ilQHMAOwLAlDRefC0in4AXAEJA6PjCwc0IamOANMMCAECRQDFNRTZBgd+CwQlRA+r6+gLBDEFBnwUBXgKATIArwAGRAAHA3cDdAN2A3kDdwN9A3oDdQN7A30DfAN4A3oDfQAYEAAlAtYASwMAUAFsAHcKAHcAmgB3AHUAdQB2AHVu8UgAygDAAHcAdQB1AHYAdQALCgB3AAsAmgB3AAsCOwB3AAtu8UgAygDAAHgKAJoAdwB3AHUAdQB2AHUAeAB1AHUAdgB1bvFIAMoAwAALCgCaAHcACwB3AAsCOwB3AAtu8UgAygDAAH4ACwGgALcBpwC6AahdAu0COwLtbvFIAMoAwAALCgCaAu0ACwLtAAsCOwLtAAtu8UgAygDAA24ACwNvAAu0VsQAAzsAABCkjUIpAAsAUIusOggWcgMeBxVsGwL67U/2HlzmWOEeOgALASvuAAseAfpKUpnpGgYJDCIZM6YyARUE9ThqAD5iXQgnAJYJPnOzw0ZAEZxEKsIAkA4DhAHnTAIDxxUDK0lxCQlPYgIvIQVYJQBVqE1GakUAKGYiDToSBA1EtAYAXQJYAIF8GgMHRyAAIAjOe9YncekRAA0KACUrjwE7Ayc6AAYWAqaiKG4McEcqANoN3+Mg9TwCBhIkuCny+JwUQ29L008JluRxu3K+oAdqiHOqFH0AG5SUIfUJ5SxCGfxdipRzqTmT4V5Zb+r1Uo4Vm+NqSSEl2mNvR2JhIa8SpYO6ntdwFXHCWTCK8f2+Hxo7uiG3drDycAuKIMP5bhi06ACnqArH1rz4Rqg//lm6SgJGEVbF9xJHISaR6HxqxSnkw6shDnelHKNEfGUXSJRJ1GcsmtJw25xrZMDK9gXSm1/YMkdX4/6NKYOdtk/NQ3/NnDASjTc3fPjIjW/5sVfVObX2oTDWkr1dF9f3kxBsD3/3aQO8hPfRz+e0uEiJqt1161griu7gz8hDDwtpy+F+BWtefnKHZPAxcZoWbnznhJpy0e842j36bcNzGnIEusgGX0a8ZxsnjcSsPDZ09yZ36fCQbriHeQ72JRMILNl6ePPf2HWoVwgWAm1fb3V2sAY0+B6rAXqSwPBgseVmoqsBTSrm91+XasMYYySI8eeRxH3ZvHkMz3BQ5aJ3iUVbYPNM3/7emRtjlsMgv/9VyTsyt/mK+8fgWeT6SoFaclXqn42dAIsvAarF5vNNWHzKSkKQ/8Hfk5ZWK7r9yliOsooyBjRhfkHP4Q2DkWXQi6FG/9r/IwbmkV5T7JSopHKn1pJwm9tb5Ot0oyN1Z2mPpKXHTxx2nlK08fKk1hEYA8WgVVWL5lgx0iTv+KdojJeU23ZDjmiubXOxVXJKKi2Wjuh2HLZOFLiSC7Tls5SMh4f+Pj6xUSrNjFqLGehRNB8lC0QSLNmkJJx/wSG3MnjE9T1CkPwJI0wH2lfzwETIiVqUxg0dfu5q39Gt+hwdcxkhhNvQ4TyrBceof3Mhs/IxFci1HmHr4FMZgXEEczPiGCx0HRwzAqDq2j9AVm1kwN0mRVLWLylgtoPNapF5cY4Y1wJh/e0BBwZj44YgZrDNqvD/9Hv7GFYdUQeDJuQ3EWI4HaKqavU1XjC/n41kT4L79kqGq0kLhdTZvgP3TA3fS0ozVz+5piZsoOtIvBUFoMKbNcmBL6YxxaUAusHB38XrS8dQMnQwJfUUkpRoGr5AUeWicvBTzyK9g77+yCkf5PAysL7r/JjcZgrbvRpMW9iyaxZvKO6ceZN2EwIxKwVFPuvFuiEPGCoagbMo+SpydLrXqBzNCDGFCrO/rkcwa2xhokQZ5CdZ0AsU3JfSqJ6n5I14YA+P/uAgfhPU84Tlw7cEFfp7AEE8ey4sP12PTt4Cods1GRgDOB5xvyiR5m+Bx8O5nBCNctU8BevfV5A08x6RHd5jcwPTMDSZJOedIZ1cGQ704lxbAzqZOP05ZxaOghzSdvFBHYqomATARyAADK4elP8Ly3IrUZKfWh23Xy20uBUmLS4Pfagu9+oyVa2iPgqRP3F2CTUsvJ7+RYnN8fFZbU/HVvxvcFFDKkiTqV5UBZ3Gz54JAKByi9hkKMZJvuGgcSYXFmw08UyoQyVdfTD1/dMkCHXcTGAKeROgArsvmRrQTLUOXioOHGK2QkjHuoYFgXciZoTJd6Fs5q1QX1G+p/e26hYsEf7QZD1nnIyl/SFkNtYYmmBhpBrxl9WbY0YpHWRuw2Ll/tj9mD8P4snVzJl4F9J+1arVeTb9E5r2ILH04qStjxQNwn3m4YNqxmaNbLAqW2TN6LidwuJRqS+NXbtqxoeDXpxeGWmxzSkWxjkyCkX4NQRme6q5SAcC+M7+9ETfA/EwrzQajKakCwYyeunP6ZFlxU2oMEn1Pz31zeStW74G406ZJFCl1wAXIoUKkWotYEpOuXB1uVNxJ63dpJEqfxBeptwIHNrPz8BllZoIcBoXwgfJ+8VAUnVPvRvexnw0Ma/WiGYuJO5y8QTvEYBigFmhUxY5RqzE8OcywN/8m4UYrlaniJO75XQ6KSo9+tWHlu+hMi0UVdiKQp7NelnoZUzNaIyBPVeOwK6GNp+FfHuPOoyhaWuNvTYFkvxscMQWDh+zeFCFkgwbXftiV23ywJ4+uwRqmg9k3KzwIQpzppt8DBBOMbrqwQM5Gb05sEwdKzMiAqOloaA/lr0KA+1pr0/+HiWoiIjHA/wir2nIuS3PeU/ji3O6ZwoxcR1SZ9FhtLC5S0FIzFhbBWcGVP/KpxOPSiUoAdWUpqKH++6Scz507iCcxYI6rdMBICPJZea7OcmeFw5mObJSiqpjg2UoWNIs+cFhyDSt6geV5qgi3FunmwwDoGSMgerFOZGX1m0dMCYo5XOruxO063dwENK9DbnVM9wYFREzh4vyU1WYYJ/LRRp6oxgjqP/X5a8/4Af6p6NWkQferzBmXme0zY/4nwMJm/wd1tIqSwGz+E3xPEAOoZlJit3XddD7/BT1pllzOx+8bmQtANQ/S6fZexc6qi3W+Q2xcmXTUhuS5mpHQRvcxZUN0S5+PL9lXWUAaRZhEH8hTdAcuNMMCuVNKTEGtSUKNi3O6KhSaTzck8csZ2vWRZ+d7mW8c4IKwXIYd25S/zIftPkwPzufjEvOHWVD1m+FjpDVUTV0DGDuHj6QnaEwLu/dEgdLQOg9E1Sro9XHJ8ykLAwtPu+pxqKDuFexqON1sKQm7rwbE1E68UCfA/erovrTCG+DBSNg0l4goDQvZN6uNlbyLpcZAwj2UclycvLpIZMgv4yRlpb3YuMftozorbcGVHt/VeDV3+Fdf1TP0iuaCsPi2G4XeGhsyF1ubVDxkoJhmniQ0/jSg/eYML9KLfnCFgISWkp91eauR3IQvED0nAPXK+6hPCYs+n3+hCZbiskmVMG2da+0EsZPonUeIY8EbfusQXjsK/eFDaosbPjEfQS0RKG7yj5GG69M7MeO1HmiUYocgygJHL6M1qzUDDwUSmr99V7Sdr2F3JjQAJY+F0yH33Iv3+C9M38eML7gTgmNu/r2bUMiPvpYbZ6v1/IaESirBHNa7mPKn4dEmYg7v/+HQgPN1G79jBQ1+soydfDC2r+h2Bl/KIc5KjMK7OH6nb1jLsNf0EHVe2KBiE51ox636uyG6Lho0t3J34L5QY/ilE3mikaF4HKXG1mG1rCevT1Vv6GavltxoQe/bMrpZvRggnBxSEPEeEzkEdOxTnPXHVjUYdw8JYvjB/o7Eegc3Ma+NUxLLnsK0kJlinPmUHzHGtrk5+CAbVzFOBqpyy3QVUnzTDfC/0XD94/okH+OB+i7g9lolhWIjSnfIb+Eq43ZXOWmwvjyV/qqD+t0e+7mTEM74qP/Ozt8nmC7mRpyu63OB4KnUzFc074SqoyPUAgM+/TJGFo6T44EHnQU4X4z6qannVqgw/U7zCpwcmXV1AubIrvOmkKHazJAR55ePjp5tLBsN8vAqs3NAHdcEHOR2xQ0lsNAFzSUuxFQCFYvXLZJdOj9p4fNq6p0HBGUik2YzaI4xySy91KzhQ0+q1hjxvImRwPRf76tChlRkhRCi74NXZ9qUNeIwP+s5p+3m5nwPdNOHgSLD79n7O9m1n1uDHiMntq4nkYwV5OZ1ENbXxFd4PgrlvavZsyUO4MqYlqqn1O8W/I1dEZq5dXhrbETLaZIbC2Kj/Aa/QM+fqUOHdf0tXAQ1huZ3cmWECWSXy/43j35+Mvq9xws7JKseriZ1pEWKc8qlzNrGPUGcVgOa9cPJYIJsGnJTAUsEcDOEVULO5x0rXBijc1lgXEzQQKhROf8zIV82w8eswc78YX11KYLWQRcgHNJElBxfXr72lS2RBSl07qTKorO2uUDZr3sFhYsvnhLZn0A94KRzJ/7DEGIAhW5ZWFpL8gEwu1aLA9MuWZzNwl8Oze9Y+bX+v9gywRVnoB5I/8kXTXU3141yRLYrIOOz6SOnyHNy4SieqzkBXharjfjqq1q6tklaEbA8Qfm2DaIPs7OTq/nvJBjKfO2H9bH2cCMh1+5gspfycu8f/cuuRmtDjyqZ7uCIMyjdV3a+p3fqmXsRx4C8lujezIFHnQiVTXLXuI1XrwN3+siYYj2HHTvESUx8DlOTXpak9qFRK+L3mgJ1WsD7F4cu1aJoFoYQnu+wGDMOjJM3kiBQWHCcvhJ/HRdxodOQp45YZaOTA22Nb4XKCVxqkbwMYFhzYQYIAnCW8FW14uf98jhUG2zrKhQQ0q0CEq0t5nXyvUyvR8DvD69LU+g3i+HFWQMQ8PqZuHD+sNKAV0+M6EJC0szq7rEr7B5bQ8BcNHzvDMc9eqB5ZCQdTf80Obn4uzjwpYU7SISdtV0QGa9D3Wrh2BDQtpBKxaNFV+/Cy2P/Sv+8s7Ud0Fd74X4+o/TNztWgETUapy+majNQ68Lq3ee0ZO48VEbTZYiH1Co4OlfWef82RWeyUXo7woM03PyapGfikTnQinoNq5z5veLpeMV3HCAMTaZmA1oGLAn7XS3XYsz+XK7VMQsc4XKrmDXOLU/pSXVNUq8dIqTba///3x6LiLS6xs1xuCAYSfcQ3+rQgmu7uvf3THKt5Ooo97TqcbRqxx7EASizaQCBQllG/rYxVapMLgtLbZS64w1MDBMXX+PQpBKNwqUKOf2DDRDUXQf9EhOS0Qj4nTmlA8dzSLz/G1d+Ud8MTy/6ghhdiLpeerGY/UlDOfiuqFsMUU5/UYlP+BAmgRLuNpvrUaLlVkrqDievNVEAwF+4CoM1MZTmjxjJMsKJq+u8Zd7tNCUFy6LiyYXRJQ4VyvEQFFaCGKsxIwQkk7EzZ6LTJq2hUuPhvAW+gQnSG6J+MszC+7QCRHcnqDdyNRJ6T9xyS87A6MDutbzKGvGktpbXqtzWtXb9HsfK2cBMomjN9a4y+TaJLnXxAeX/HWzmf4cR4vALt/P4w4qgKY04ml4ZdLOinFYS6cup3G/1ie4+t1eOnpBNlqGqs75ilzkT4+DsZQxNvaSKJ//6zIbbk/M7LOhFmRc/1R+kBtz7JFGdZm/COotIdvQoXpTqP/1uqEUmCb/QWoGLMwO5ANcHzxdY48IGP5+J+zKOTBFZ4Pid+GTM+Wq12MV/H86xEJptBa6T+p3kgpwLedManBHC2GgNrFpoN2xnrMz9WFWX/8/ygSBkavq2Uv7FdCsLEYLu9LLIvAU0bNRDtzYl+/vXmjpIvuJFYjmI0im6QEYqnIeMsNjXG4vIutIGHijeAG/9EDBozKV5cldkHbLxHh25vT+ZEzbhXlqvpzKJwcEgfNwLAKFeo0/pvEE10XDB+EXRTXtSzJozQKFFAJhMxYkVaCW+E9AL7tMeU8acxidHqzb6lX4691UsDpy/LLRmT+epgW56+5Cw8tB4kMUv6s9lh3eRKbyGs+H/4mQMaYzPTf2OOdokEn+zzgvoD3FqNKk8QqGAXVsqcGdXrT62fSPkR2vROFi68A6se86UxRUk4cajfPyCC4G5wDhD+zNq4jodQ4u4n/m37Lr36n4LIAAsVr02dFi9AiwA81MYs2rm4eDlDNmdMRvEKRHfBwW5DdMNp0jPFZMeARqF/wL4XBfd+EMLBfMzpH5GH6NaW+1vrvMdg+VxDzatk3MXgO3ro3P/DpcC6+Mo4MySJhKJhSR01SGGGp5hPWmrrUgrv3lDnP+HhcI3nt3YqBoVAVTBAQT5iuhTg8nvPtd8ZeYj6w1x6RqGUBrSku7+N1+BaasZvjTk64RoIDlL8brpEcJx3OmY7jLoZsswdtmhfC/G21llXhITOwmvRDDeTTPbyASOa16cF5/A1fZAidJpqju3wYAy9avPR1ya6eNp9K8XYrrtuxlqi+bDKwlfrYdR0RRiKRVTLOH85+ZY7XSmzRpfZBJjaTa81VDcJHpZnZnSQLASGYW9l51ZV/h7eVzTi3Hv6hUsgc/51AqJRTkpbFVLXXszoBL8nBX0u/0jBLT8nH+fJePbrwURT58OY+UieRjd1vs04w0VG5VN2U6MoGZkQzKN/ptz0Q366dxoTGmj7i1NQGHi9GgnquXFYdrCfZBmeb7s0T6yrdlZH5cZuwHFyIJ/kAtGsTg0xH5taAAq44BAk1CPk9KVVbqQzrCUiFdF/6gtlPQ8bHHc1G1W92MXGZ5HEHftyLYs8mbD/9xYRUWkHmlM0zC2ilJlnNgV4bfALpQghxOUoZL7VTqtCHIaQSXm+YUMnpkXybnV+A6xlm2CVy8fn0Xlm2XRa0+zzOa21JWWmixfiPMSCZ7qA4rS93VN3pkpF1s5TonQjisHf7iU9ZGvUPOAKZcR1pbeVf/Ul7OhepGCaId9wOtqo7pJ7yLcBZ0pFkOF28y4zEI/kcUNmutBHaQpBdNM8vjCS6HZRokkeo88TBAjGyG7SR+6vUgTcyK9Imalj0kuxz0wmK+byQU11AiJFk/ya5dNduRClcnU64yGu/ieWSeOos1t3ep+RPIWQ2pyTYVbZltTbsb7NiwSi3AV+8KLWk7LxCnfZUetEM8ThnsSoGH38/nyAwFguJp8FjvlHtcWZuU4hPva0rHfr0UhOOJ/F6vS62FW7KzkmRll2HEc7oUq4fyi5T70Vl7YVIfsPHUCdHesf9Lk7WNVWO75JDkYbMI8TOW8JKVtLY9d6UJRITO8oKo0xS+o99Yy04iniGHAaGj88kEWgwv0OrHdY/nr76DOGNS59hXCGXzTKUvDl9iKpLSWYN1lxIeyywdNpTkhay74w2jFT6NS8qkjo5CxA1yfSYwp6AJIZNKIeEK5PJAW7ORgWgwp0VgzYpqovMrWxbu+DGZ6Lhie1RAqpzm8VUzKJOH3mCzWuTOLsN3VT/dv2eeYe9UjbR8YTBsLz7q60VN1sU51k+um1f8JxD5pPhbhSC8rRaB454tmh6YUWrJI3+GWY0qeWioj/tbkYITOkJaeuGt4JrJvHA+l0Gu7kY7XOaa05alMnRWVCXqFgLIwSY4uF59Ue5SU4QKuc/HamDxbr0x6csCetXGoP7Qn1Bk/J9DsynO/UD6iZ1Hyrz+jit0hDCwi/E9OjgKTbB3ZQKQ/0ZOvevfNHG0NK4Aj3Cp7NpRk07RT1i/S0EL93Ag8GRgKI9CfpajKyK6+Jj/PI1KO5/85VAwz2AwzP8FTBb075IxCXv6T9RVvWT2tUaqxDS92zrGUbWzUYk9mSs82pECH+fkqsDt93VW++4YsR/dHCYcQSYTO/KaBMDj9LSD/J/+z20Kq8XvZUAIHtm9hRPP3ItbuAu2Hm5lkPs92pd7kCxgRs0xOVBnZ13ccdA0aunrwv9SdqElJRC3g+oCu+nXyCgmXUs9yMjTMAIHfxZV+aPKcZeUBWt057Xo85Ks1Ir5gzEHCWqZEhrLZMuF11ziGtFQUds/EESajhagzcKsxamcSZxGth4UII+adPhQkUnx2WyN+4YWR+r3f8MnkyGFuR4zjzxJS8WsQYR5PTyRaD9ixa6Mh741nBHbzfjXHskGDq179xaRNrCIB1z1xRfWfjqw2pHc1zk9xlPpL8sQWAIuETZZhbnmL54rceXVNRvUiKrrqIkeogsl0XXb17ylNb0f4GA9Wd44vffEG8FSZGHEL2fbaTGRcSiCeA8PmA/f6Hz8HCS76fXUHwgwkzSwlI71ekZ7Fapmlk/KC+Hs8hUcw3N2LN5LhkVYyizYFl/uPeVP5lsoJHhhfWvvSWruCUW1ZcJOeuTbrDgywJ/qG07gZJplnTvLcYdNaH0KMYOYMGX+rB4NGPFmQsNaIwlWrfCezxre8zXBrsMT+edVLbLqN1BqB76JH4BvZTqUIMfGwPGEn+EnmTV86fPBaYbFL3DFEhjB45CewkXEAtJxk4/Ms2pPXnaRqdky0HOYdcUcE2zcXq4vaIvW2/v0nHFJH2XXe22ueDmq/18XGtELSq85j9X8q0tcNSSKJIX8FTuJF/Pf8j5PhqG2u+osvsLxYrvvfeVJL+4tkcXcr9JV7v0ERmj/X6fM3NC4j6dS1+9Umr2oPavqiAydTZPLMNRGY23LO9zAVDly7jD+70G5TPPLdhRIl4WxcYjLnM+SNcJ26FOrkrISUtPObIz5Zb3AG612krnpy15RMW+1cQjlnWFI6538qky9axd2oJmHIHP08KyP0ubGO+TQNOYuv2uh17yCIvR8VcStw7o1g0NM60sk+8Tq7YfIBJrtp53GkvzXH7OA0p8/n/u1satf/VJhtR1l8Wa6Gmaug7haSpaCaYQax6ta0mkutlb+eAOSG1aobM81D9A4iS1RRlzBBoVX6tU1S6WE2N9ORY6DfeLRC4l9Rvr5h95XDWB2mR1d4WFudpsgVYwiTwT31ljskD8ZyDOlm5DkGh9N/UB/0AI5Xvb8ZBmai2hQ4BWMqFwYnzxwB26YHSOv9WgY3JXnvoN+2R4rqGVh/LLDMtpFP+SpMGJNWvbIl5SOodbCczW2RKleksPoUeGEzrjtKHVdtZA+kfqO+rVx/iclCqwoopepvJpSTDjT+b9GWylGRF8EDbGlw6eUzmJM95Ovoz+kwLX3c2fTjFeYEsE7vUZm3mqdGJuKh2w9/QGSaqRHs99aScGOdDqkFcACoqdbBoQqqjamhH6Q9ng39JCg3lrGJwd50Qk9ovnqBTr8MME7Ps2wiVfygUmPoUBJJfJWX5Nda0nuncbFkA=="));
}
const kr$1 = s0();
new Set(Ur$1(kr$1)), new Set(Ur$1(kr$1)), r0(kr$1), o0(kr$1);
const a0 = new Uint8Array(32);
a0.fill(0);
const u0 = `Ethereum Signed Message:
`;
function df(e) {
  return typeof e == "string" && (e = Ci(e)), Ii(Ds([Ci(u0), Ci(String(e.length)), e]));
}
const c0 = "address/5.7.0", yr$1 = new z$2(c0);
function pf(e) {
  Jt$1(e, 20) || yr$1.throwArgumentError("invalid address", "address", e), e = e.toLowerCase();
  const t = e.substring(2).split(""), r2 = new Uint8Array(40);
  for (let n2 = 0; n2 < 40; n2++)
    r2[n2] = t[n2].charCodeAt(0);
  const i2 = Ot$1(Ii(r2));
  for (let n2 = 0; n2 < 40; n2 += 2)
    i2[n2 >> 1] >> 4 >= 8 && (t[n2] = t[n2].toUpperCase()), (i2[n2 >> 1] & 15) >= 8 && (t[n2 + 1] = t[n2 + 1].toUpperCase());
  return "0x" + t.join("");
}
const l0 = 9007199254740991;
function d0(e) {
  return Math.log10 ? Math.log10(e) : Math.log(e) / Math.LN10;
}
const Oi = {};
for (let e = 0; e < 10; e++)
  Oi[String(e)] = String(e);
for (let e = 0; e < 26; e++)
  Oi[String.fromCharCode(65 + e)] = String(10 + e);
const vf = Math.floor(d0(l0));
function p0(e) {
  e = e.toUpperCase(), e = e.substring(4) + e.substring(0, 2) + "00";
  let t = e.split("").map((i2) => Oi[i2]).join("");
  for (; t.length >= vf; ) {
    let i2 = t.substring(0, vf);
    t = parseInt(i2, 10) % 97 + t.substring(i2.length);
  }
  let r2 = String(98 - parseInt(t, 10) % 97);
  for (; r2.length < 2; )
    r2 = "0" + r2;
  return r2;
}
function v0(e) {
  let t = null;
  if (typeof e != "string" && yr$1.throwArgumentError("invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/))
    e.substring(0, 2) !== "0x" && (e = "0x" + e), t = pf(e), e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && t !== e && yr$1.throwArgumentError("bad address checksum", "address", e);
  else if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    for (e.substring(2, 4) !== p0(e) && yr$1.throwArgumentError("bad icap checksum", "address", e), t = Ls$1(e.substring(4)); t.length < 40; )
      t = "0" + t;
    t = pf("0x" + t);
  } else
    yr$1.throwArgumentError("invalid address", "address", e);
  return t;
}
function wr$1(e, t, r2) {
  Object.defineProperty(e, t, { enumerable: true, value: r2, writable: false });
}
const m0 = new Uint8Array(32);
m0.fill(0), V.from(-1);
const A0 = V.from(0), b0 = V.from(1);
V.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), oe$2(b0.toHexString(), 32), oe$2(A0.toHexString(), 32);
var se = {}, Q$2 = {}, xr$1 = gf;
function gf(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
gf.equal = function(t, r2, i2) {
  if (t != r2)
    throw new Error(i2 || "Assertion failed: " + t + " != " + r2);
};
var Pi = { exports: {} };
typeof Object.create == "function" ? Pi.exports = function(t, r2) {
  r2 && (t.super_ = r2, t.prototype = Object.create(r2.prototype, { constructor: { value: t, enumerable: false, writable: true, configurable: true } }));
} : Pi.exports = function(t, r2) {
  if (r2) {
    t.super_ = r2;
    var i2 = function() {
    };
    i2.prototype = r2.prototype, t.prototype = new i2(), t.prototype.constructor = t;
  }
};
var y0 = xr$1, w0 = Pi.exports;
Q$2.inherits = w0;
function x0(e, t) {
  return (e.charCodeAt(t) & 64512) !== 55296 || t < 0 || t + 1 >= e.length ? false : (e.charCodeAt(t + 1) & 64512) === 56320;
}
function M0(e, t) {
  if (Array.isArray(e))
    return e.slice();
  if (!e)
    return [];
  var r2 = [];
  if (typeof e == "string")
    if (t) {
      if (t === "hex")
        for (e = e.replace(/[^a-z0-9]+/ig, ""), e.length % 2 !== 0 && (e = "0" + e), n2 = 0; n2 < e.length; n2 += 2)
          r2.push(parseInt(e[n2] + e[n2 + 1], 16));
    } else
      for (var i2 = 0, n2 = 0; n2 < e.length; n2++) {
        var o2 = e.charCodeAt(n2);
        o2 < 128 ? r2[i2++] = o2 : o2 < 2048 ? (r2[i2++] = o2 >> 6 | 192, r2[i2++] = o2 & 63 | 128) : x0(e, n2) ? (o2 = 65536 + ((o2 & 1023) << 10) + (e.charCodeAt(++n2) & 1023), r2[i2++] = o2 >> 18 | 240, r2[i2++] = o2 >> 12 & 63 | 128, r2[i2++] = o2 >> 6 & 63 | 128, r2[i2++] = o2 & 63 | 128) : (r2[i2++] = o2 >> 12 | 224, r2[i2++] = o2 >> 6 & 63 | 128, r2[i2++] = o2 & 63 | 128);
      }
  else
    for (n2 = 0; n2 < e.length; n2++)
      r2[n2] = e[n2] | 0;
  return r2;
}
Q$2.toArray = M0;
function E0(e) {
  for (var t = "", r2 = 0; r2 < e.length; r2++)
    t += Af(e[r2].toString(16));
  return t;
}
Q$2.toHex = E0;
function mf(e) {
  var t = e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (e & 255) << 24;
  return t >>> 0;
}
Q$2.htonl = mf;
function S0(e, t) {
  for (var r2 = "", i2 = 0; i2 < e.length; i2++) {
    var n2 = e[i2];
    t === "little" && (n2 = mf(n2)), r2 += bf(n2.toString(16));
  }
  return r2;
}
Q$2.toHex32 = S0;
function Af(e) {
  return e.length === 1 ? "0" + e : e;
}
Q$2.zero2 = Af;
function bf(e) {
  return e.length === 7 ? "0" + e : e.length === 6 ? "00" + e : e.length === 5 ? "000" + e : e.length === 4 ? "0000" + e : e.length === 3 ? "00000" + e : e.length === 2 ? "000000" + e : e.length === 1 ? "0000000" + e : e;
}
Q$2.zero8 = bf;
function I0(e, t, r2, i2) {
  var n2 = r2 - t;
  y0(n2 % 4 === 0);
  for (var o2 = new Array(n2 / 4), h2 = 0, p3 = t; h2 < o2.length; h2++, p3 += 4) {
    var A2;
    i2 === "big" ? A2 = e[p3] << 24 | e[p3 + 1] << 16 | e[p3 + 2] << 8 | e[p3 + 3] : A2 = e[p3 + 3] << 24 | e[p3 + 2] << 16 | e[p3 + 1] << 8 | e[p3], o2[h2] = A2 >>> 0;
  }
  return o2;
}
Q$2.join32 = I0;
function N0(e, t) {
  for (var r2 = new Array(e.length * 4), i2 = 0, n2 = 0; i2 < e.length; i2++, n2 += 4) {
    var o2 = e[i2];
    t === "big" ? (r2[n2] = o2 >>> 24, r2[n2 + 1] = o2 >>> 16 & 255, r2[n2 + 2] = o2 >>> 8 & 255, r2[n2 + 3] = o2 & 255) : (r2[n2 + 3] = o2 >>> 24, r2[n2 + 2] = o2 >>> 16 & 255, r2[n2 + 1] = o2 >>> 8 & 255, r2[n2] = o2 & 255);
  }
  return r2;
}
Q$2.split32 = N0;
function _0(e, t) {
  return e >>> t | e << 32 - t;
}
Q$2.rotr32 = _0;
function B0(e, t) {
  return e << t | e >>> 32 - t;
}
Q$2.rotl32 = B0;
function C0(e, t) {
  return e + t >>> 0;
}
Q$2.sum32 = C0;
function R0(e, t, r2) {
  return e + t + r2 >>> 0;
}
Q$2.sum32_3 = R0;
function O0(e, t, r2, i2) {
  return e + t + r2 + i2 >>> 0;
}
Q$2.sum32_4 = O0;
function P0(e, t, r2, i2, n2) {
  return e + t + r2 + i2 + n2 >>> 0;
}
Q$2.sum32_5 = P0;
function T0(e, t, r2, i2) {
  var n2 = e[t], o2 = e[t + 1], h2 = i2 + o2 >>> 0, p3 = (h2 < i2 ? 1 : 0) + r2 + n2;
  e[t] = p3 >>> 0, e[t + 1] = h2;
}
Q$2.sum64 = T0;
function D0(e, t, r2, i2) {
  var n2 = t + i2 >>> 0, o2 = (n2 < t ? 1 : 0) + e + r2;
  return o2 >>> 0;
}
Q$2.sum64_hi = D0;
function F0(e, t, r2, i2) {
  var n2 = t + i2;
  return n2 >>> 0;
}
Q$2.sum64_lo = F0;
function U0(e, t, r2, i2, n2, o2, h2, p3) {
  var A2 = 0, v3 = t;
  v3 = v3 + i2 >>> 0, A2 += v3 < t ? 1 : 0, v3 = v3 + o2 >>> 0, A2 += v3 < o2 ? 1 : 0, v3 = v3 + p3 >>> 0, A2 += v3 < p3 ? 1 : 0;
  var w2 = e + r2 + n2 + h2 + A2;
  return w2 >>> 0;
}
Q$2.sum64_4_hi = U0;
function k0(e, t, r2, i2, n2, o2, h2, p3) {
  var A2 = t + i2 + o2 + p3;
  return A2 >>> 0;
}
Q$2.sum64_4_lo = k0;
function q0(e, t, r2, i2, n2, o2, h2, p3, A2, v3) {
  var w2 = 0, y3 = t;
  y3 = y3 + i2 >>> 0, w2 += y3 < t ? 1 : 0, y3 = y3 + o2 >>> 0, w2 += y3 < o2 ? 1 : 0, y3 = y3 + p3 >>> 0, w2 += y3 < p3 ? 1 : 0, y3 = y3 + v3 >>> 0, w2 += y3 < v3 ? 1 : 0;
  var S2 = e + r2 + n2 + h2 + A2 + w2;
  return S2 >>> 0;
}
Q$2.sum64_5_hi = q0;
function K0(e, t, r2, i2, n2, o2, h2, p3, A2, v3) {
  var w2 = t + i2 + o2 + p3 + v3;
  return w2 >>> 0;
}
Q$2.sum64_5_lo = K0;
function H0(e, t, r2) {
  var i2 = t << 32 - r2 | e >>> r2;
  return i2 >>> 0;
}
Q$2.rotr64_hi = H0;
function L0(e, t, r2) {
  var i2 = e << 32 - r2 | t >>> r2;
  return i2 >>> 0;
}
Q$2.rotr64_lo = L0;
function z0(e, t, r2) {
  return e >>> r2;
}
Q$2.shr64_hi = z0;
function j0(e, t, r2) {
  var i2 = e << 32 - r2 | t >>> r2;
  return i2 >>> 0;
}
Q$2.shr64_lo = j0;
var or$1 = {}, yf = Q$2, Q0 = xr$1;
function qr$1() {
  this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
}
or$1.BlockHash = qr$1, qr$1.prototype.update = function(t, r2) {
  if (t = yf.toArray(t, r2), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, this.pending.length >= this._delta8) {
    t = this.pending;
    var i2 = t.length % this._delta8;
    this.pending = t.slice(t.length - i2, t.length), this.pending.length === 0 && (this.pending = null), t = yf.join32(t, 0, t.length - i2, this.endian);
    for (var n2 = 0; n2 < t.length; n2 += this._delta32)
      this._update(t, n2, n2 + this._delta32);
  }
  return this;
}, qr$1.prototype.digest = function(t) {
  return this.update(this._pad()), Q0(this.pending === null), this._digest(t);
}, qr$1.prototype._pad = function() {
  var t = this.pendingTotal, r2 = this._delta8, i2 = r2 - (t + this.padLength) % r2, n2 = new Array(i2 + this.padLength);
  n2[0] = 128;
  for (var o2 = 1; o2 < i2; o2++)
    n2[o2] = 0;
  if (t <<= 3, this.endian === "big") {
    for (var h2 = 8; h2 < this.padLength; h2++)
      n2[o2++] = 0;
    n2[o2++] = 0, n2[o2++] = 0, n2[o2++] = 0, n2[o2++] = 0, n2[o2++] = t >>> 24 & 255, n2[o2++] = t >>> 16 & 255, n2[o2++] = t >>> 8 & 255, n2[o2++] = t & 255;
  } else
    for (n2[o2++] = t & 255, n2[o2++] = t >>> 8 & 255, n2[o2++] = t >>> 16 & 255, n2[o2++] = t >>> 24 & 255, n2[o2++] = 0, n2[o2++] = 0, n2[o2++] = 0, n2[o2++] = 0, h2 = 8; h2 < this.padLength; h2++)
      n2[o2++] = 0;
  return n2;
};
var sr$1 = {}, ae$2 = {}, J0 = Q$2, ue = J0.rotr32;
function G0(e, t, r2, i2) {
  if (e === 0)
    return wf(t, r2, i2);
  if (e === 1 || e === 3)
    return Mf(t, r2, i2);
  if (e === 2)
    return xf(t, r2, i2);
}
ae$2.ft_1 = G0;
function wf(e, t, r2) {
  return e & t ^ ~e & r2;
}
ae$2.ch32 = wf;
function xf(e, t, r2) {
  return e & t ^ e & r2 ^ t & r2;
}
ae$2.maj32 = xf;
function Mf(e, t, r2) {
  return e ^ t ^ r2;
}
ae$2.p32 = Mf;
function Y0(e) {
  return ue(e, 2) ^ ue(e, 13) ^ ue(e, 22);
}
ae$2.s0_256 = Y0;
function V0(e) {
  return ue(e, 6) ^ ue(e, 11) ^ ue(e, 25);
}
ae$2.s1_256 = V0;
function W0(e) {
  return ue(e, 7) ^ ue(e, 18) ^ e >>> 3;
}
ae$2.g0_256 = W0;
function X0(e) {
  return ue(e, 17) ^ ue(e, 19) ^ e >>> 10;
}
ae$2.g1_256 = X0;
var ar$1 = Q$2, $0 = or$1, Z0 = ae$2, Ti = ar$1.rotl32, Mr$1 = ar$1.sum32, ta = ar$1.sum32_5, ea = Z0.ft_1, Ef = $0.BlockHash, ra = [1518500249, 1859775393, 2400959708, 3395469782];
function he() {
  if (!(this instanceof he))
    return new he();
  Ef.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80);
}
ar$1.inherits(he, Ef);
var ia = he;
he.blockSize = 512, he.outSize = 160, he.hmacStrength = 80, he.padLength = 64, he.prototype._update = function(t, r2) {
  for (var i2 = this.W, n2 = 0; n2 < 16; n2++)
    i2[n2] = t[r2 + n2];
  for (; n2 < i2.length; n2++)
    i2[n2] = Ti(i2[n2 - 3] ^ i2[n2 - 8] ^ i2[n2 - 14] ^ i2[n2 - 16], 1);
  var o2 = this.h[0], h2 = this.h[1], p3 = this.h[2], A2 = this.h[3], v3 = this.h[4];
  for (n2 = 0; n2 < i2.length; n2++) {
    var w2 = ~~(n2 / 20), y3 = ta(Ti(o2, 5), ea(w2, h2, p3, A2), v3, i2[n2], ra[w2]);
    v3 = A2, A2 = p3, p3 = Ti(h2, 30), h2 = o2, o2 = y3;
  }
  this.h[0] = Mr$1(this.h[0], o2), this.h[1] = Mr$1(this.h[1], h2), this.h[2] = Mr$1(this.h[2], p3), this.h[3] = Mr$1(this.h[3], A2), this.h[4] = Mr$1(this.h[4], v3);
}, he.prototype._digest = function(t) {
  return t === "hex" ? ar$1.toHex32(this.h, "big") : ar$1.split32(this.h, "big");
};
var ur$1 = Q$2, na = or$1, hr$1 = ae$2, fa = xr$1, ie = ur$1.sum32, oa = ur$1.sum32_4, sa = ur$1.sum32_5, aa = hr$1.ch32, ua = hr$1.maj32, ha = hr$1.s0_256, ca = hr$1.s1_256, la = hr$1.g0_256, da = hr$1.g1_256, Sf = na.BlockHash, pa = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
function ce$1() {
  if (!(this instanceof ce$1))
    return new ce$1();
  Sf.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = pa, this.W = new Array(64);
}
ur$1.inherits(ce$1, Sf);
var If = ce$1;
ce$1.blockSize = 512, ce$1.outSize = 256, ce$1.hmacStrength = 192, ce$1.padLength = 64, ce$1.prototype._update = function(t, r2) {
  for (var i2 = this.W, n2 = 0; n2 < 16; n2++)
    i2[n2] = t[r2 + n2];
  for (; n2 < i2.length; n2++)
    i2[n2] = oa(da(i2[n2 - 2]), i2[n2 - 7], la(i2[n2 - 15]), i2[n2 - 16]);
  var o2 = this.h[0], h2 = this.h[1], p3 = this.h[2], A2 = this.h[3], v3 = this.h[4], w2 = this.h[5], y3 = this.h[6], S2 = this.h[7];
  for (fa(this.k.length === i2.length), n2 = 0; n2 < i2.length; n2++) {
    var N2 = sa(S2, ca(v3), aa(v3, w2, y3), this.k[n2], i2[n2]), I2 = ie(ha(o2), ua(o2, h2, p3));
    S2 = y3, y3 = w2, w2 = v3, v3 = ie(A2, N2), A2 = p3, p3 = h2, h2 = o2, o2 = ie(N2, I2);
  }
  this.h[0] = ie(this.h[0], o2), this.h[1] = ie(this.h[1], h2), this.h[2] = ie(this.h[2], p3), this.h[3] = ie(this.h[3], A2), this.h[4] = ie(this.h[4], v3), this.h[5] = ie(this.h[5], w2), this.h[6] = ie(this.h[6], y3), this.h[7] = ie(this.h[7], S2);
}, ce$1.prototype._digest = function(t) {
  return t === "hex" ? ur$1.toHex32(this.h, "big") : ur$1.split32(this.h, "big");
};
var Di$1 = Q$2, Nf = If;
function ye$1() {
  if (!(this instanceof ye$1))
    return new ye$1();
  Nf.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
}
Di$1.inherits(ye$1, Nf);
var va = ye$1;
ye$1.blockSize = 512, ye$1.outSize = 224, ye$1.hmacStrength = 192, ye$1.padLength = 64, ye$1.prototype._digest = function(t) {
  return t === "hex" ? Di$1.toHex32(this.h.slice(0, 7), "big") : Di$1.split32(this.h.slice(0, 7), "big");
};
var jt$1 = Q$2, ga = or$1, ma = xr$1, le = jt$1.rotr64_hi, de = jt$1.rotr64_lo, _f = jt$1.shr64_hi, Bf = jt$1.shr64_lo, Be = jt$1.sum64, Fi$1 = jt$1.sum64_hi, Ui = jt$1.sum64_lo, Aa = jt$1.sum64_4_hi, ba$1 = jt$1.sum64_4_lo, ya$1 = jt$1.sum64_5_hi, wa = jt$1.sum64_5_lo, Cf = ga.BlockHash, xa = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
function ne$1() {
  if (!(this instanceof ne$1))
    return new ne$1();
  Cf.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = xa, this.W = new Array(160);
}
jt$1.inherits(ne$1, Cf);
var Rf = ne$1;
ne$1.blockSize = 1024, ne$1.outSize = 512, ne$1.hmacStrength = 192, ne$1.padLength = 128, ne$1.prototype._prepareBlock = function(t, r2) {
  for (var i2 = this.W, n2 = 0; n2 < 32; n2++)
    i2[n2] = t[r2 + n2];
  for (; n2 < i2.length; n2 += 2) {
    var o2 = Pa(i2[n2 - 4], i2[n2 - 3]), h2 = Ta$1(i2[n2 - 4], i2[n2 - 3]), p3 = i2[n2 - 14], A2 = i2[n2 - 13], v3 = Ra$1(i2[n2 - 30], i2[n2 - 29]), w2 = Oa$1(i2[n2 - 30], i2[n2 - 29]), y3 = i2[n2 - 32], S2 = i2[n2 - 31];
    i2[n2] = Aa(o2, h2, p3, A2, v3, w2, y3, S2), i2[n2 + 1] = ba$1(o2, h2, p3, A2, v3, w2, y3, S2);
  }
}, ne$1.prototype._update = function(t, r2) {
  this._prepareBlock(t, r2);
  var i2 = this.W, n2 = this.h[0], o2 = this.h[1], h2 = this.h[2], p3 = this.h[3], A2 = this.h[4], v3 = this.h[5], w2 = this.h[6], y3 = this.h[7], S2 = this.h[8], N2 = this.h[9], I2 = this.h[10], C3 = this.h[11], D2 = this.h[12], U2 = this.h[13], J = this.h[14], Bt2 = this.h[15];
  ma(this.k.length === i2.length);
  for (var G2 = 0; G2 < i2.length; G2 += 2) {
    var H = J, L2 = Bt2, Pt2 = Ba(S2, N2), W = Ca(S2, N2), Rt2 = Ma(S2, N2, I2, C3, D2), Vt2 = Ea(S2, N2, I2, C3, D2, U2), Y = this.k[G2], Wt2 = this.k[G2 + 1], b2 = i2[G2], f2 = i2[G2 + 1], a2 = ya$1(H, L2, Pt2, W, Rt2, Vt2, Y, Wt2, b2, f2), c = wa(H, L2, Pt2, W, Rt2, Vt2, Y, Wt2, b2, f2);
    H = Na$1(n2, o2), L2 = _a(n2, o2), Pt2 = Sa$1(n2, o2, h2, p3, A2), W = Ia(n2, o2, h2, p3, A2, v3);
    var d2 = Fi$1(H, L2, Pt2, W), m2 = Ui(H, L2, Pt2, W);
    J = D2, Bt2 = U2, D2 = I2, U2 = C3, I2 = S2, C3 = N2, S2 = Fi$1(w2, y3, a2, c), N2 = Ui(y3, y3, a2, c), w2 = A2, y3 = v3, A2 = h2, v3 = p3, h2 = n2, p3 = o2, n2 = Fi$1(a2, c, d2, m2), o2 = Ui(a2, c, d2, m2);
  }
  Be(this.h, 0, n2, o2), Be(this.h, 2, h2, p3), Be(this.h, 4, A2, v3), Be(this.h, 6, w2, y3), Be(this.h, 8, S2, N2), Be(this.h, 10, I2, C3), Be(this.h, 12, D2, U2), Be(this.h, 14, J, Bt2);
}, ne$1.prototype._digest = function(t) {
  return t === "hex" ? jt$1.toHex32(this.h, "big") : jt$1.split32(this.h, "big");
};
function Ma(e, t, r2, i2, n2) {
  var o2 = e & r2 ^ ~e & n2;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function Ea(e, t, r2, i2, n2, o2) {
  var h2 = t & i2 ^ ~t & o2;
  return h2 < 0 && (h2 += 4294967296), h2;
}
function Sa$1(e, t, r2, i2, n2) {
  var o2 = e & r2 ^ e & n2 ^ r2 & n2;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function Ia(e, t, r2, i2, n2, o2) {
  var h2 = t & i2 ^ t & o2 ^ i2 & o2;
  return h2 < 0 && (h2 += 4294967296), h2;
}
function Na$1(e, t) {
  var r2 = le(e, t, 28), i2 = le(t, e, 2), n2 = le(t, e, 7), o2 = r2 ^ i2 ^ n2;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function _a(e, t) {
  var r2 = de(e, t, 28), i2 = de(t, e, 2), n2 = de(t, e, 7), o2 = r2 ^ i2 ^ n2;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function Ba(e, t) {
  var r2 = le(e, t, 14), i2 = le(e, t, 18), n2 = le(t, e, 9), o2 = r2 ^ i2 ^ n2;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function Ca(e, t) {
  var r2 = de(e, t, 14), i2 = de(e, t, 18), n2 = de(t, e, 9), o2 = r2 ^ i2 ^ n2;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function Ra$1(e, t) {
  var r2 = le(e, t, 1), i2 = le(e, t, 8), n2 = _f(e, t, 7), o2 = r2 ^ i2 ^ n2;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function Oa$1(e, t) {
  var r2 = de(e, t, 1), i2 = de(e, t, 8), n2 = Bf(e, t, 7), o2 = r2 ^ i2 ^ n2;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function Pa(e, t) {
  var r2 = le(e, t, 19), i2 = le(t, e, 29), n2 = _f(e, t, 6), o2 = r2 ^ i2 ^ n2;
  return o2 < 0 && (o2 += 4294967296), o2;
}
function Ta$1(e, t) {
  var r2 = de(e, t, 19), i2 = de(t, e, 29), n2 = Bf(e, t, 6), o2 = r2 ^ i2 ^ n2;
  return o2 < 0 && (o2 += 4294967296), o2;
}
var ki = Q$2, Of = Rf;
function we$2() {
  if (!(this instanceof we$2))
    return new we$2();
  Of.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428];
}
ki.inherits(we$2, Of);
var Da$1 = we$2;
we$2.blockSize = 1024, we$2.outSize = 384, we$2.hmacStrength = 192, we$2.padLength = 128, we$2.prototype._digest = function(t) {
  return t === "hex" ? ki.toHex32(this.h.slice(0, 12), "big") : ki.split32(this.h.slice(0, 12), "big");
}, sr$1.sha1 = ia, sr$1.sha224 = va, sr$1.sha256 = If, sr$1.sha384 = Da$1, sr$1.sha512 = Rf;
var Pf = {}, Xe$1 = Q$2, Fa$1 = or$1, Kr$1 = Xe$1.rotl32, Tf = Xe$1.sum32, Er$1 = Xe$1.sum32_3, Df = Xe$1.sum32_4, Ff = Fa$1.BlockHash;
function pe() {
  if (!(this instanceof pe))
    return new pe();
  Ff.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
}
Xe$1.inherits(pe, Ff), Pf.ripemd160 = pe, pe.blockSize = 512, pe.outSize = 160, pe.hmacStrength = 192, pe.padLength = 64, pe.prototype._update = function(t, r2) {
  for (var i2 = this.h[0], n2 = this.h[1], o2 = this.h[2], h2 = this.h[3], p3 = this.h[4], A2 = i2, v3 = n2, w2 = o2, y3 = h2, S2 = p3, N2 = 0; N2 < 80; N2++) {
    var I2 = Tf(Kr$1(Df(i2, Uf(N2, n2, o2, h2), t[qa$1[N2] + r2], Ua$1(N2)), Ha$1[N2]), p3);
    i2 = p3, p3 = h2, h2 = Kr$1(o2, 10), o2 = n2, n2 = I2, I2 = Tf(Kr$1(Df(A2, Uf(79 - N2, v3, w2, y3), t[Ka[N2] + r2], ka(N2)), La$1[N2]), S2), A2 = S2, S2 = y3, y3 = Kr$1(w2, 10), w2 = v3, v3 = I2;
  }
  I2 = Er$1(this.h[1], o2, y3), this.h[1] = Er$1(this.h[2], h2, S2), this.h[2] = Er$1(this.h[3], p3, A2), this.h[3] = Er$1(this.h[4], i2, v3), this.h[4] = Er$1(this.h[0], n2, w2), this.h[0] = I2;
}, pe.prototype._digest = function(t) {
  return t === "hex" ? Xe$1.toHex32(this.h, "little") : Xe$1.split32(this.h, "little");
};
function Uf(e, t, r2, i2) {
  return e <= 15 ? t ^ r2 ^ i2 : e <= 31 ? t & r2 | ~t & i2 : e <= 47 ? (t | ~r2) ^ i2 : e <= 63 ? t & i2 | r2 & ~i2 : t ^ (r2 | ~i2);
}
function Ua$1(e) {
  return e <= 15 ? 0 : e <= 31 ? 1518500249 : e <= 47 ? 1859775393 : e <= 63 ? 2400959708 : 2840853838;
}
function ka(e) {
  return e <= 15 ? 1352829926 : e <= 31 ? 1548603684 : e <= 47 ? 1836072691 : e <= 63 ? 2053994217 : 0;
}
var qa$1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], Ka = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], Ha$1 = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], La$1 = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11], za = Q$2, ja = xr$1;
function cr$1(e, t, r2) {
  if (!(this instanceof cr$1))
    return new cr$1(e, t, r2);
  this.Hash = e, this.blockSize = e.blockSize / 8, this.outSize = e.outSize / 8, this.inner = null, this.outer = null, this._init(za.toArray(t, r2));
}
var Qa = cr$1;
cr$1.prototype._init = function(t) {
  t.length > this.blockSize && (t = new this.Hash().update(t).digest()), ja(t.length <= this.blockSize);
  for (var r2 = t.length; r2 < this.blockSize; r2++)
    t.push(0);
  for (r2 = 0; r2 < t.length; r2++)
    t[r2] ^= 54;
  for (this.inner = new this.Hash().update(t), r2 = 0; r2 < t.length; r2++)
    t[r2] ^= 106;
  this.outer = new this.Hash().update(t);
}, cr$1.prototype.update = function(t, r2) {
  return this.inner.update(t, r2), this;
}, cr$1.prototype.digest = function(t) {
  return this.outer.update(this.inner.digest()), this.outer.digest(t);
}, function(e) {
  var t = e;
  t.utils = Q$2, t.common = or$1, t.sha = sr$1, t.ripemd = Pf, t.hmac = Qa, t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
}(se);
function lr$2(e, t, r2) {
  return r2 = { path: t, exports: {}, require: function(i2, n2) {
    return Ja(i2, n2 ?? r2.path);
  } }, e(r2, r2.exports), r2.exports;
}
function Ja() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var qi$1 = kf;
function kf(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
kf.equal = function(t, r2, i2) {
  if (t != r2)
    throw new Error(i2 || "Assertion failed: " + t + " != " + r2);
};
var fe$1 = lr$2(function(e, t) {
  var r2 = t;
  function i2(h2, p3) {
    if (Array.isArray(h2))
      return h2.slice();
    if (!h2)
      return [];
    var A2 = [];
    if (typeof h2 != "string") {
      for (var v3 = 0; v3 < h2.length; v3++)
        A2[v3] = h2[v3] | 0;
      return A2;
    }
    if (p3 === "hex") {
      h2 = h2.replace(/[^a-z0-9]+/ig, ""), h2.length % 2 !== 0 && (h2 = "0" + h2);
      for (var v3 = 0; v3 < h2.length; v3 += 2)
        A2.push(parseInt(h2[v3] + h2[v3 + 1], 16));
    } else
      for (var v3 = 0; v3 < h2.length; v3++) {
        var w2 = h2.charCodeAt(v3), y3 = w2 >> 8, S2 = w2 & 255;
        y3 ? A2.push(y3, S2) : A2.push(S2);
      }
    return A2;
  }
  r2.toArray = i2;
  function n2(h2) {
    return h2.length === 1 ? "0" + h2 : h2;
  }
  r2.zero2 = n2;
  function o2(h2) {
    for (var p3 = "", A2 = 0; A2 < h2.length; A2++)
      p3 += n2(h2[A2].toString(16));
    return p3;
  }
  r2.toHex = o2, r2.encode = function(p3, A2) {
    return A2 === "hex" ? o2(p3) : p3;
  };
}), Gt$1 = lr$2(function(e, t) {
  var r2 = t;
  r2.assert = qi$1, r2.toArray = fe$1.toArray, r2.zero2 = fe$1.zero2, r2.toHex = fe$1.toHex, r2.encode = fe$1.encode;
  function i2(A2, v3, w2) {
    var y3 = new Array(Math.max(A2.bitLength(), w2) + 1);
    y3.fill(0);
    for (var S2 = 1 << v3 + 1, N2 = A2.clone(), I2 = 0; I2 < y3.length; I2++) {
      var C3, D2 = N2.andln(S2 - 1);
      N2.isOdd() ? (D2 > (S2 >> 1) - 1 ? C3 = (S2 >> 1) - D2 : C3 = D2, N2.isubn(C3)) : C3 = 0, y3[I2] = C3, N2.iushrn(1);
    }
    return y3;
  }
  r2.getNAF = i2;
  function n2(A2, v3) {
    var w2 = [[], []];
    A2 = A2.clone(), v3 = v3.clone();
    for (var y3 = 0, S2 = 0, N2; A2.cmpn(-y3) > 0 || v3.cmpn(-S2) > 0; ) {
      var I2 = A2.andln(3) + y3 & 3, C3 = v3.andln(3) + S2 & 3;
      I2 === 3 && (I2 = -1), C3 === 3 && (C3 = -1);
      var D2;
      I2 & 1 ? (N2 = A2.andln(7) + y3 & 7, (N2 === 3 || N2 === 5) && C3 === 2 ? D2 = -I2 : D2 = I2) : D2 = 0, w2[0].push(D2);
      var U2;
      C3 & 1 ? (N2 = v3.andln(7) + S2 & 7, (N2 === 3 || N2 === 5) && I2 === 2 ? U2 = -C3 : U2 = C3) : U2 = 0, w2[1].push(U2), 2 * y3 === D2 + 1 && (y3 = 1 - y3), 2 * S2 === U2 + 1 && (S2 = 1 - S2), A2.iushrn(1), v3.iushrn(1);
    }
    return w2;
  }
  r2.getJSF = n2;
  function o2(A2, v3, w2) {
    var y3 = "_" + v3;
    A2.prototype[v3] = function() {
      return this[y3] !== void 0 ? this[y3] : this[y3] = w2.call(this);
    };
  }
  r2.cachedProperty = o2;
  function h2(A2) {
    return typeof A2 == "string" ? r2.toArray(A2, "hex") : A2;
  }
  r2.parseBytes = h2;
  function p3(A2) {
    return new K(A2, "hex", "le");
  }
  r2.intFromLE = p3;
}), Hr$1 = Gt$1.getNAF, Ga = Gt$1.getJSF, Lr$1 = Gt$1.assert;
function Ce$2(e, t) {
  this.type = e, this.p = new K(t.p, 16), this.red = t.prime ? K.red(t.prime) : K.mont(this.p), this.zero = new K(0).toRed(this.red), this.one = new K(1).toRed(this.red), this.two = new K(2).toRed(this.red), this.n = t.n && new K(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
  var r2 = this.n && this.p.div(this.n);
  !r2 || r2.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = true, this.redN = this.n.toRed(this.red));
}
var $e = Ce$2;
Ce$2.prototype.point = function() {
  throw new Error("Not implemented");
}, Ce$2.prototype.validate = function() {
  throw new Error("Not implemented");
}, Ce$2.prototype._fixedNafMul = function(t, r2) {
  Lr$1(t.precomputed);
  var i2 = t._getDoubles(), n2 = Hr$1(r2, 1, this._bitLength), o2 = (1 << i2.step + 1) - (i2.step % 2 === 0 ? 2 : 1);
  o2 /= 3;
  var h2 = [], p3, A2;
  for (p3 = 0; p3 < n2.length; p3 += i2.step) {
    A2 = 0;
    for (var v3 = p3 + i2.step - 1; v3 >= p3; v3--)
      A2 = (A2 << 1) + n2[v3];
    h2.push(A2);
  }
  for (var w2 = this.jpoint(null, null, null), y3 = this.jpoint(null, null, null), S2 = o2; S2 > 0; S2--) {
    for (p3 = 0; p3 < h2.length; p3++)
      A2 = h2[p3], A2 === S2 ? y3 = y3.mixedAdd(i2.points[p3]) : A2 === -S2 && (y3 = y3.mixedAdd(i2.points[p3].neg()));
    w2 = w2.add(y3);
  }
  return w2.toP();
}, Ce$2.prototype._wnafMul = function(t, r2) {
  var i2 = 4, n2 = t._getNAFPoints(i2);
  i2 = n2.wnd;
  for (var o2 = n2.points, h2 = Hr$1(r2, i2, this._bitLength), p3 = this.jpoint(null, null, null), A2 = h2.length - 1; A2 >= 0; A2--) {
    for (var v3 = 0; A2 >= 0 && h2[A2] === 0; A2--)
      v3++;
    if (A2 >= 0 && v3++, p3 = p3.dblp(v3), A2 < 0)
      break;
    var w2 = h2[A2];
    Lr$1(w2 !== 0), t.type === "affine" ? w2 > 0 ? p3 = p3.mixedAdd(o2[w2 - 1 >> 1]) : p3 = p3.mixedAdd(o2[-w2 - 1 >> 1].neg()) : w2 > 0 ? p3 = p3.add(o2[w2 - 1 >> 1]) : p3 = p3.add(o2[-w2 - 1 >> 1].neg());
  }
  return t.type === "affine" ? p3.toP() : p3;
}, Ce$2.prototype._wnafMulAdd = function(t, r2, i2, n2, o2) {
  var h2 = this._wnafT1, p3 = this._wnafT2, A2 = this._wnafT3, v3 = 0, w2, y3, S2;
  for (w2 = 0; w2 < n2; w2++) {
    S2 = r2[w2];
    var N2 = S2._getNAFPoints(t);
    h2[w2] = N2.wnd, p3[w2] = N2.points;
  }
  for (w2 = n2 - 1; w2 >= 1; w2 -= 2) {
    var I2 = w2 - 1, C3 = w2;
    if (h2[I2] !== 1 || h2[C3] !== 1) {
      A2[I2] = Hr$1(i2[I2], h2[I2], this._bitLength), A2[C3] = Hr$1(i2[C3], h2[C3], this._bitLength), v3 = Math.max(A2[I2].length, v3), v3 = Math.max(A2[C3].length, v3);
      continue;
    }
    var D2 = [r2[I2], null, null, r2[C3]];
    r2[I2].y.cmp(r2[C3].y) === 0 ? (D2[1] = r2[I2].add(r2[C3]), D2[2] = r2[I2].toJ().mixedAdd(r2[C3].neg())) : r2[I2].y.cmp(r2[C3].y.redNeg()) === 0 ? (D2[1] = r2[I2].toJ().mixedAdd(r2[C3]), D2[2] = r2[I2].add(r2[C3].neg())) : (D2[1] = r2[I2].toJ().mixedAdd(r2[C3]), D2[2] = r2[I2].toJ().mixedAdd(r2[C3].neg()));
    var U2 = [-3, -1, -5, -7, 0, 7, 5, 1, 3], J = Ga(i2[I2], i2[C3]);
    for (v3 = Math.max(J[0].length, v3), A2[I2] = new Array(v3), A2[C3] = new Array(v3), y3 = 0; y3 < v3; y3++) {
      var Bt2 = J[0][y3] | 0, G2 = J[1][y3] | 0;
      A2[I2][y3] = U2[(Bt2 + 1) * 3 + (G2 + 1)], A2[C3][y3] = 0, p3[I2] = D2;
    }
  }
  var H = this.jpoint(null, null, null), L2 = this._wnafT4;
  for (w2 = v3; w2 >= 0; w2--) {
    for (var Pt2 = 0; w2 >= 0; ) {
      var W = true;
      for (y3 = 0; y3 < n2; y3++)
        L2[y3] = A2[y3][w2] | 0, L2[y3] !== 0 && (W = false);
      if (!W)
        break;
      Pt2++, w2--;
    }
    if (w2 >= 0 && Pt2++, H = H.dblp(Pt2), w2 < 0)
      break;
    for (y3 = 0; y3 < n2; y3++) {
      var Rt2 = L2[y3];
      Rt2 !== 0 && (Rt2 > 0 ? S2 = p3[y3][Rt2 - 1 >> 1] : Rt2 < 0 && (S2 = p3[y3][-Rt2 - 1 >> 1].neg()), S2.type === "affine" ? H = H.mixedAdd(S2) : H = H.add(S2));
    }
  }
  for (w2 = 0; w2 < n2; w2++)
    p3[w2] = null;
  return o2 ? H : H.toP();
};
function Zt$1(e, t) {
  this.curve = e, this.type = t, this.precomputed = null;
}
Ce$2.BasePoint = Zt$1, Zt$1.prototype.eq = function() {
  throw new Error("Not implemented");
}, Zt$1.prototype.validate = function() {
  return this.curve.validate(this);
}, Ce$2.prototype.decodePoint = function(t, r2) {
  t = Gt$1.toArray(t, r2);
  var i2 = this.p.byteLength();
  if ((t[0] === 4 || t[0] === 6 || t[0] === 7) && t.length - 1 === 2 * i2) {
    t[0] === 6 ? Lr$1(t[t.length - 1] % 2 === 0) : t[0] === 7 && Lr$1(t[t.length - 1] % 2 === 1);
    var n2 = this.point(t.slice(1, 1 + i2), t.slice(1 + i2, 1 + 2 * i2));
    return n2;
  } else if ((t[0] === 2 || t[0] === 3) && t.length - 1 === i2)
    return this.pointFromX(t.slice(1, 1 + i2), t[0] === 3);
  throw new Error("Unknown point format");
}, Zt$1.prototype.encodeCompressed = function(t) {
  return this.encode(t, true);
}, Zt$1.prototype._encode = function(t) {
  var r2 = this.curve.p.byteLength(), i2 = this.getX().toArray("be", r2);
  return t ? [this.getY().isEven() ? 2 : 3].concat(i2) : [4].concat(i2, this.getY().toArray("be", r2));
}, Zt$1.prototype.encode = function(t, r2) {
  return Gt$1.encode(this._encode(r2), t);
}, Zt$1.prototype.precompute = function(t) {
  if (this.precomputed)
    return this;
  var r2 = { doubles: null, naf: null, beta: null };
  return r2.naf = this._getNAFPoints(8), r2.doubles = this._getDoubles(4, t), r2.beta = this._getBeta(), this.precomputed = r2, this;
}, Zt$1.prototype._hasDoubles = function(t) {
  if (!this.precomputed)
    return false;
  var r2 = this.precomputed.doubles;
  return r2 ? r2.points.length >= Math.ceil((t.bitLength() + 1) / r2.step) : false;
}, Zt$1.prototype._getDoubles = function(t, r2) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var i2 = [this], n2 = this, o2 = 0; o2 < r2; o2 += t) {
    for (var h2 = 0; h2 < t; h2++)
      n2 = n2.dbl();
    i2.push(n2);
  }
  return { step: t, points: i2 };
}, Zt$1.prototype._getNAFPoints = function(t) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  for (var r2 = [this], i2 = (1 << t) - 1, n2 = i2 === 1 ? null : this.dbl(), o2 = 1; o2 < i2; o2++)
    r2[o2] = r2[o2 - 1].add(n2);
  return { wnd: t, points: r2 };
}, Zt$1.prototype._getBeta = function() {
  return null;
}, Zt$1.prototype.dblp = function(t) {
  for (var r2 = this, i2 = 0; i2 < t; i2++)
    r2 = r2.dbl();
  return r2;
};
var Ki = lr$2(function(e) {
  typeof Object.create == "function" ? e.exports = function(r2, i2) {
    i2 && (r2.super_ = i2, r2.prototype = Object.create(i2.prototype, { constructor: { value: r2, enumerable: false, writable: true, configurable: true } }));
  } : e.exports = function(r2, i2) {
    if (i2) {
      r2.super_ = i2;
      var n2 = function() {
      };
      n2.prototype = i2.prototype, r2.prototype = new n2(), r2.prototype.constructor = r2;
    }
  };
}), Ya = Gt$1.assert;
function te$1(e) {
  $e.call(this, "short", e), this.a = new K(e.a, 16).toRed(this.red), this.b = new K(e.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(e), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
}
Ki(te$1, $e);
var Va = te$1;
te$1.prototype._getEndomorphism = function(t) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var r2, i2;
    if (t.beta)
      r2 = new K(t.beta, 16).toRed(this.red);
    else {
      var n2 = this._getEndoRoots(this.p);
      r2 = n2[0].cmp(n2[1]) < 0 ? n2[0] : n2[1], r2 = r2.toRed(this.red);
    }
    if (t.lambda)
      i2 = new K(t.lambda, 16);
    else {
      var o2 = this._getEndoRoots(this.n);
      this.g.mul(o2[0]).x.cmp(this.g.x.redMul(r2)) === 0 ? i2 = o2[0] : (i2 = o2[1], Ya(this.g.mul(i2).x.cmp(this.g.x.redMul(r2)) === 0));
    }
    var h2;
    return t.basis ? h2 = t.basis.map(function(p3) {
      return { a: new K(p3.a, 16), b: new K(p3.b, 16) };
    }) : h2 = this._getEndoBasis(i2), { beta: r2, lambda: i2, basis: h2 };
  }
}, te$1.prototype._getEndoRoots = function(t) {
  var r2 = t === this.p ? this.red : K.mont(t), i2 = new K(2).toRed(r2).redInvm(), n2 = i2.redNeg(), o2 = new K(3).toRed(r2).redNeg().redSqrt().redMul(i2), h2 = n2.redAdd(o2).fromRed(), p3 = n2.redSub(o2).fromRed();
  return [h2, p3];
}, te$1.prototype._getEndoBasis = function(t) {
  for (var r2 = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), i2 = t, n2 = this.n.clone(), o2 = new K(1), h2 = new K(0), p3 = new K(0), A2 = new K(1), v3, w2, y3, S2, N2, I2, C3, D2 = 0, U2, J; i2.cmpn(0) !== 0; ) {
    var Bt2 = n2.div(i2);
    U2 = n2.sub(Bt2.mul(i2)), J = p3.sub(Bt2.mul(o2));
    var G2 = A2.sub(Bt2.mul(h2));
    if (!y3 && U2.cmp(r2) < 0)
      v3 = C3.neg(), w2 = o2, y3 = U2.neg(), S2 = J;
    else if (y3 && ++D2 === 2)
      break;
    C3 = U2, n2 = i2, i2 = U2, p3 = o2, o2 = J, A2 = h2, h2 = G2;
  }
  N2 = U2.neg(), I2 = J;
  var H = y3.sqr().add(S2.sqr()), L2 = N2.sqr().add(I2.sqr());
  return L2.cmp(H) >= 0 && (N2 = v3, I2 = w2), y3.negative && (y3 = y3.neg(), S2 = S2.neg()), N2.negative && (N2 = N2.neg(), I2 = I2.neg()), [{ a: y3, b: S2 }, { a: N2, b: I2 }];
}, te$1.prototype._endoSplit = function(t) {
  var r2 = this.endo.basis, i2 = r2[0], n2 = r2[1], o2 = n2.b.mul(t).divRound(this.n), h2 = i2.b.neg().mul(t).divRound(this.n), p3 = o2.mul(i2.a), A2 = h2.mul(n2.a), v3 = o2.mul(i2.b), w2 = h2.mul(n2.b), y3 = t.sub(p3).sub(A2), S2 = v3.add(w2).neg();
  return { k1: y3, k2: S2 };
}, te$1.prototype.pointFromX = function(t, r2) {
  t = new K(t, 16), t.red || (t = t.toRed(this.red));
  var i2 = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b), n2 = i2.redSqrt();
  if (n2.redSqr().redSub(i2).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var o2 = n2.fromRed().isOdd();
  return (r2 && !o2 || !r2 && o2) && (n2 = n2.redNeg()), this.point(t, n2);
}, te$1.prototype.validate = function(t) {
  if (t.inf)
    return true;
  var r2 = t.x, i2 = t.y, n2 = this.a.redMul(r2), o2 = r2.redSqr().redMul(r2).redIAdd(n2).redIAdd(this.b);
  return i2.redSqr().redISub(o2).cmpn(0) === 0;
}, te$1.prototype._endoWnafMulAdd = function(t, r2, i2) {
  for (var n2 = this._endoWnafT1, o2 = this._endoWnafT2, h2 = 0; h2 < t.length; h2++) {
    var p3 = this._endoSplit(r2[h2]), A2 = t[h2], v3 = A2._getBeta();
    p3.k1.negative && (p3.k1.ineg(), A2 = A2.neg(true)), p3.k2.negative && (p3.k2.ineg(), v3 = v3.neg(true)), n2[h2 * 2] = A2, n2[h2 * 2 + 1] = v3, o2[h2 * 2] = p3.k1, o2[h2 * 2 + 1] = p3.k2;
  }
  for (var w2 = this._wnafMulAdd(1, n2, o2, h2 * 2, i2), y3 = 0; y3 < h2 * 2; y3++)
    n2[y3] = null, o2[y3] = null;
  return w2;
};
function Dt$1(e, t, r2, i2) {
  $e.BasePoint.call(this, e, "affine"), t === null && r2 === null ? (this.x = null, this.y = null, this.inf = true) : (this.x = new K(t, 16), this.y = new K(r2, 16), i2 && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = false);
}
Ki(Dt$1, $e.BasePoint), te$1.prototype.point = function(t, r2, i2) {
  return new Dt$1(this, t, r2, i2);
}, te$1.prototype.pointFromJSON = function(t, r2) {
  return Dt$1.fromJSON(this, t, r2);
}, Dt$1.prototype._getBeta = function() {
  if (this.curve.endo) {
    var t = this.precomputed;
    if (t && t.beta)
      return t.beta;
    var r2 = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (t) {
      var i2 = this.curve, n2 = function(o2) {
        return i2.point(o2.x.redMul(i2.endo.beta), o2.y);
      };
      t.beta = r2, r2.precomputed = { beta: null, naf: t.naf && { wnd: t.naf.wnd, points: t.naf.points.map(n2) }, doubles: t.doubles && { step: t.doubles.step, points: t.doubles.points.map(n2) } };
    }
    return r2;
  }
}, Dt$1.prototype.toJSON = function() {
  return this.precomputed ? [this.x, this.y, this.precomputed && { doubles: this.precomputed.doubles && { step: this.precomputed.doubles.step, points: this.precomputed.doubles.points.slice(1) }, naf: this.precomputed.naf && { wnd: this.precomputed.naf.wnd, points: this.precomputed.naf.points.slice(1) } }] : [this.x, this.y];
}, Dt$1.fromJSON = function(t, r2, i2) {
  typeof r2 == "string" && (r2 = JSON.parse(r2));
  var n2 = t.point(r2[0], r2[1], i2);
  if (!r2[2])
    return n2;
  function o2(p3) {
    return t.point(p3[0], p3[1], i2);
  }
  var h2 = r2[2];
  return n2.precomputed = { beta: null, doubles: h2.doubles && { step: h2.doubles.step, points: [n2].concat(h2.doubles.points.map(o2)) }, naf: h2.naf && { wnd: h2.naf.wnd, points: [n2].concat(h2.naf.points.map(o2)) } }, n2;
}, Dt$1.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
}, Dt$1.prototype.isInfinity = function() {
  return this.inf;
}, Dt$1.prototype.add = function(t) {
  if (this.inf)
    return t;
  if (t.inf)
    return this;
  if (this.eq(t))
    return this.dbl();
  if (this.neg().eq(t))
    return this.curve.point(null, null);
  if (this.x.cmp(t.x) === 0)
    return this.curve.point(null, null);
  var r2 = this.y.redSub(t.y);
  r2.cmpn(0) !== 0 && (r2 = r2.redMul(this.x.redSub(t.x).redInvm()));
  var i2 = r2.redSqr().redISub(this.x).redISub(t.x), n2 = r2.redMul(this.x.redSub(i2)).redISub(this.y);
  return this.curve.point(i2, n2);
}, Dt$1.prototype.dbl = function() {
  if (this.inf)
    return this;
  var t = this.y.redAdd(this.y);
  if (t.cmpn(0) === 0)
    return this.curve.point(null, null);
  var r2 = this.curve.a, i2 = this.x.redSqr(), n2 = t.redInvm(), o2 = i2.redAdd(i2).redIAdd(i2).redIAdd(r2).redMul(n2), h2 = o2.redSqr().redISub(this.x.redAdd(this.x)), p3 = o2.redMul(this.x.redSub(h2)).redISub(this.y);
  return this.curve.point(h2, p3);
}, Dt$1.prototype.getX = function() {
  return this.x.fromRed();
}, Dt$1.prototype.getY = function() {
  return this.y.fromRed();
}, Dt$1.prototype.mul = function(t) {
  return t = new K(t, 16), this.isInfinity() ? this : this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t);
}, Dt$1.prototype.mulAdd = function(t, r2, i2) {
  var n2 = [this, r2], o2 = [t, i2];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n2, o2) : this.curve._wnafMulAdd(1, n2, o2, 2);
}, Dt$1.prototype.jmulAdd = function(t, r2, i2) {
  var n2 = [this, r2], o2 = [t, i2];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n2, o2, true) : this.curve._wnafMulAdd(1, n2, o2, 2, true);
}, Dt$1.prototype.eq = function(t) {
  return this === t || this.inf === t.inf && (this.inf || this.x.cmp(t.x) === 0 && this.y.cmp(t.y) === 0);
}, Dt$1.prototype.neg = function(t) {
  if (this.inf)
    return this;
  var r2 = this.curve.point(this.x, this.y.redNeg());
  if (t && this.precomputed) {
    var i2 = this.precomputed, n2 = function(o2) {
      return o2.neg();
    };
    r2.precomputed = { naf: i2.naf && { wnd: i2.naf.wnd, points: i2.naf.points.map(n2) }, doubles: i2.doubles && { step: i2.doubles.step, points: i2.doubles.points.map(n2) } };
  }
  return r2;
}, Dt$1.prototype.toJ = function() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var t = this.curve.jpoint(this.x, this.y, this.curve.one);
  return t;
};
function Ft$1(e, t, r2, i2) {
  $e.BasePoint.call(this, e, "jacobian"), t === null && r2 === null && i2 === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new K(0)) : (this.x = new K(t, 16), this.y = new K(r2, 16), this.z = new K(i2, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
}
Ki(Ft$1, $e.BasePoint), te$1.prototype.jpoint = function(t, r2, i2) {
  return new Ft$1(this, t, r2, i2);
}, Ft$1.prototype.toP = function() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var t = this.z.redInvm(), r2 = t.redSqr(), i2 = this.x.redMul(r2), n2 = this.y.redMul(r2).redMul(t);
  return this.curve.point(i2, n2);
}, Ft$1.prototype.neg = function() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
}, Ft$1.prototype.add = function(t) {
  if (this.isInfinity())
    return t;
  if (t.isInfinity())
    return this;
  var r2 = t.z.redSqr(), i2 = this.z.redSqr(), n2 = this.x.redMul(r2), o2 = t.x.redMul(i2), h2 = this.y.redMul(r2.redMul(t.z)), p3 = t.y.redMul(i2.redMul(this.z)), A2 = n2.redSub(o2), v3 = h2.redSub(p3);
  if (A2.cmpn(0) === 0)
    return v3.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var w2 = A2.redSqr(), y3 = w2.redMul(A2), S2 = n2.redMul(w2), N2 = v3.redSqr().redIAdd(y3).redISub(S2).redISub(S2), I2 = v3.redMul(S2.redISub(N2)).redISub(h2.redMul(y3)), C3 = this.z.redMul(t.z).redMul(A2);
  return this.curve.jpoint(N2, I2, C3);
}, Ft$1.prototype.mixedAdd = function(t) {
  if (this.isInfinity())
    return t.toJ();
  if (t.isInfinity())
    return this;
  var r2 = this.z.redSqr(), i2 = this.x, n2 = t.x.redMul(r2), o2 = this.y, h2 = t.y.redMul(r2).redMul(this.z), p3 = i2.redSub(n2), A2 = o2.redSub(h2);
  if (p3.cmpn(0) === 0)
    return A2.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var v3 = p3.redSqr(), w2 = v3.redMul(p3), y3 = i2.redMul(v3), S2 = A2.redSqr().redIAdd(w2).redISub(y3).redISub(y3), N2 = A2.redMul(y3.redISub(S2)).redISub(o2.redMul(w2)), I2 = this.z.redMul(p3);
  return this.curve.jpoint(S2, N2, I2);
}, Ft$1.prototype.dblp = function(t) {
  if (t === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!t)
    return this.dbl();
  var r2;
  if (this.curve.zeroA || this.curve.threeA) {
    var i2 = this;
    for (r2 = 0; r2 < t; r2++)
      i2 = i2.dbl();
    return i2;
  }
  var n2 = this.curve.a, o2 = this.curve.tinv, h2 = this.x, p3 = this.y, A2 = this.z, v3 = A2.redSqr().redSqr(), w2 = p3.redAdd(p3);
  for (r2 = 0; r2 < t; r2++) {
    var y3 = h2.redSqr(), S2 = w2.redSqr(), N2 = S2.redSqr(), I2 = y3.redAdd(y3).redIAdd(y3).redIAdd(n2.redMul(v3)), C3 = h2.redMul(S2), D2 = I2.redSqr().redISub(C3.redAdd(C3)), U2 = C3.redISub(D2), J = I2.redMul(U2);
    J = J.redIAdd(J).redISub(N2);
    var Bt2 = w2.redMul(A2);
    r2 + 1 < t && (v3 = v3.redMul(N2)), h2 = D2, A2 = Bt2, w2 = J;
  }
  return this.curve.jpoint(h2, w2.redMul(o2), A2);
}, Ft$1.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
}, Ft$1.prototype._zeroDbl = function() {
  var t, r2, i2;
  if (this.zOne) {
    var n2 = this.x.redSqr(), o2 = this.y.redSqr(), h2 = o2.redSqr(), p3 = this.x.redAdd(o2).redSqr().redISub(n2).redISub(h2);
    p3 = p3.redIAdd(p3);
    var A2 = n2.redAdd(n2).redIAdd(n2), v3 = A2.redSqr().redISub(p3).redISub(p3), w2 = h2.redIAdd(h2);
    w2 = w2.redIAdd(w2), w2 = w2.redIAdd(w2), t = v3, r2 = A2.redMul(p3.redISub(v3)).redISub(w2), i2 = this.y.redAdd(this.y);
  } else {
    var y3 = this.x.redSqr(), S2 = this.y.redSqr(), N2 = S2.redSqr(), I2 = this.x.redAdd(S2).redSqr().redISub(y3).redISub(N2);
    I2 = I2.redIAdd(I2);
    var C3 = y3.redAdd(y3).redIAdd(y3), D2 = C3.redSqr(), U2 = N2.redIAdd(N2);
    U2 = U2.redIAdd(U2), U2 = U2.redIAdd(U2), t = D2.redISub(I2).redISub(I2), r2 = C3.redMul(I2.redISub(t)).redISub(U2), i2 = this.y.redMul(this.z), i2 = i2.redIAdd(i2);
  }
  return this.curve.jpoint(t, r2, i2);
}, Ft$1.prototype._threeDbl = function() {
  var t, r2, i2;
  if (this.zOne) {
    var n2 = this.x.redSqr(), o2 = this.y.redSqr(), h2 = o2.redSqr(), p3 = this.x.redAdd(o2).redSqr().redISub(n2).redISub(h2);
    p3 = p3.redIAdd(p3);
    var A2 = n2.redAdd(n2).redIAdd(n2).redIAdd(this.curve.a), v3 = A2.redSqr().redISub(p3).redISub(p3);
    t = v3;
    var w2 = h2.redIAdd(h2);
    w2 = w2.redIAdd(w2), w2 = w2.redIAdd(w2), r2 = A2.redMul(p3.redISub(v3)).redISub(w2), i2 = this.y.redAdd(this.y);
  } else {
    var y3 = this.z.redSqr(), S2 = this.y.redSqr(), N2 = this.x.redMul(S2), I2 = this.x.redSub(y3).redMul(this.x.redAdd(y3));
    I2 = I2.redAdd(I2).redIAdd(I2);
    var C3 = N2.redIAdd(N2);
    C3 = C3.redIAdd(C3);
    var D2 = C3.redAdd(C3);
    t = I2.redSqr().redISub(D2), i2 = this.y.redAdd(this.z).redSqr().redISub(S2).redISub(y3);
    var U2 = S2.redSqr();
    U2 = U2.redIAdd(U2), U2 = U2.redIAdd(U2), U2 = U2.redIAdd(U2), r2 = I2.redMul(C3.redISub(t)).redISub(U2);
  }
  return this.curve.jpoint(t, r2, i2);
}, Ft$1.prototype._dbl = function() {
  var t = this.curve.a, r2 = this.x, i2 = this.y, n2 = this.z, o2 = n2.redSqr().redSqr(), h2 = r2.redSqr(), p3 = i2.redSqr(), A2 = h2.redAdd(h2).redIAdd(h2).redIAdd(t.redMul(o2)), v3 = r2.redAdd(r2);
  v3 = v3.redIAdd(v3);
  var w2 = v3.redMul(p3), y3 = A2.redSqr().redISub(w2.redAdd(w2)), S2 = w2.redISub(y3), N2 = p3.redSqr();
  N2 = N2.redIAdd(N2), N2 = N2.redIAdd(N2), N2 = N2.redIAdd(N2);
  var I2 = A2.redMul(S2).redISub(N2), C3 = i2.redAdd(i2).redMul(n2);
  return this.curve.jpoint(y3, I2, C3);
}, Ft$1.prototype.trpl = function() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var t = this.x.redSqr(), r2 = this.y.redSqr(), i2 = this.z.redSqr(), n2 = r2.redSqr(), o2 = t.redAdd(t).redIAdd(t), h2 = o2.redSqr(), p3 = this.x.redAdd(r2).redSqr().redISub(t).redISub(n2);
  p3 = p3.redIAdd(p3), p3 = p3.redAdd(p3).redIAdd(p3), p3 = p3.redISub(h2);
  var A2 = p3.redSqr(), v3 = n2.redIAdd(n2);
  v3 = v3.redIAdd(v3), v3 = v3.redIAdd(v3), v3 = v3.redIAdd(v3);
  var w2 = o2.redIAdd(p3).redSqr().redISub(h2).redISub(A2).redISub(v3), y3 = r2.redMul(w2);
  y3 = y3.redIAdd(y3), y3 = y3.redIAdd(y3);
  var S2 = this.x.redMul(A2).redISub(y3);
  S2 = S2.redIAdd(S2), S2 = S2.redIAdd(S2);
  var N2 = this.y.redMul(w2.redMul(v3.redISub(w2)).redISub(p3.redMul(A2)));
  N2 = N2.redIAdd(N2), N2 = N2.redIAdd(N2), N2 = N2.redIAdd(N2);
  var I2 = this.z.redAdd(p3).redSqr().redISub(i2).redISub(A2);
  return this.curve.jpoint(S2, N2, I2);
}, Ft$1.prototype.mul = function(t, r2) {
  return t = new K(t, r2), this.curve._wnafMul(this, t);
}, Ft$1.prototype.eq = function(t) {
  if (t.type === "affine")
    return this.eq(t.toJ());
  if (this === t)
    return true;
  var r2 = this.z.redSqr(), i2 = t.z.redSqr();
  if (this.x.redMul(i2).redISub(t.x.redMul(r2)).cmpn(0) !== 0)
    return false;
  var n2 = r2.redMul(this.z), o2 = i2.redMul(t.z);
  return this.y.redMul(o2).redISub(t.y.redMul(n2)).cmpn(0) === 0;
}, Ft$1.prototype.eqXToP = function(t) {
  var r2 = this.z.redSqr(), i2 = t.toRed(this.curve.red).redMul(r2);
  if (this.x.cmp(i2) === 0)
    return true;
  for (var n2 = t.clone(), o2 = this.curve.redN.redMul(r2); ; ) {
    if (n2.iadd(this.curve.n), n2.cmp(this.curve.p) >= 0)
      return false;
    if (i2.redIAdd(o2), this.x.cmp(i2) === 0)
      return true;
  }
}, Ft$1.prototype.inspect = function() {
  return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
}, Ft$1.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
var zr$1 = lr$2(function(e, t) {
  var r2 = t;
  r2.base = $e, r2.short = Va, r2.mont = null, r2.edwards = null;
}), jr$1 = lr$2(function(e, t) {
  var r2 = t, i2 = Gt$1.assert;
  function n2(p3) {
    p3.type === "short" ? this.curve = new zr$1.short(p3) : p3.type === "edwards" ? this.curve = new zr$1.edwards(p3) : this.curve = new zr$1.mont(p3), this.g = this.curve.g, this.n = this.curve.n, this.hash = p3.hash, i2(this.g.validate(), "Invalid curve"), i2(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  r2.PresetCurve = n2;
  function o2(p3, A2) {
    Object.defineProperty(r2, p3, { configurable: true, enumerable: true, get: function() {
      var v3 = new n2(A2);
      return Object.defineProperty(r2, p3, { configurable: true, enumerable: true, value: v3 }), v3;
    } });
  }
  o2("p192", { type: "short", prime: "p192", p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff", a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc", b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1", n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831", hash: se.sha256, gRed: false, g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"] }), o2("p224", { type: "short", prime: "p224", p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001", a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe", b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4", n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d", hash: se.sha256, gRed: false, g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"] }), o2("p256", { type: "short", prime: null, p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff", a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc", b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b", n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551", hash: se.sha256, gRed: false, g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"] }), o2("p384", { type: "short", prime: null, p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff", a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc", b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef", n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973", hash: se.sha384, gRed: false, g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"] }), o2("p521", { type: "short", prime: null, p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff", a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc", b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00", n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409", hash: se.sha512, gRed: false, g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"] }), o2("curve25519", { type: "mont", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "76d06", b: "1", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: se.sha256, gRed: false, g: ["9"] }), o2("ed25519", { type: "edwards", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "-1", c: "1", d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: se.sha256, gRed: false, g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"] });
  var h2;
  try {
    h2 = null.crash();
  } catch {
    h2 = void 0;
  }
  o2("secp256k1", { type: "short", prime: "k256", p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f", a: "0", b: "7", n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141", h: "1", hash: se.sha256, beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee", lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72", basis: [{ a: "3086d221a7d46bcde86c90e49284eb15", b: "-e4437ed6010e88286f547fa90abfe4c3" }, { a: "114ca50f7a8e2f3f657c1108d9d44cfd8", b: "3086d221a7d46bcde86c90e49284eb15" }], gRed: false, g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", h2] });
});
function Re(e) {
  if (!(this instanceof Re))
    return new Re(e);
  this.hash = e.hash, this.predResist = !!e.predResist, this.outLen = this.hash.outSize, this.minEntropy = e.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
  var t = fe$1.toArray(e.entropy, e.entropyEnc || "hex"), r2 = fe$1.toArray(e.nonce, e.nonceEnc || "hex"), i2 = fe$1.toArray(e.pers, e.persEnc || "hex");
  qi$1(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(t, r2, i2);
}
var qf = Re;
Re.prototype._init = function(t, r2, i2) {
  var n2 = t.concat(r2).concat(i2);
  this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
  for (var o2 = 0; o2 < this.V.length; o2++)
    this.K[o2] = 0, this.V[o2] = 1;
  this._update(n2), this._reseed = 1, this.reseedInterval = 281474976710656;
}, Re.prototype._hmac = function() {
  return new se.hmac(this.hash, this.K);
}, Re.prototype._update = function(t) {
  var r2 = this._hmac().update(this.V).update([0]);
  t && (r2 = r2.update(t)), this.K = r2.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest());
}, Re.prototype.reseed = function(t, r2, i2, n2) {
  typeof r2 != "string" && (n2 = i2, i2 = r2, r2 = null), t = fe$1.toArray(t, r2), i2 = fe$1.toArray(i2, n2), qi$1(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(t.concat(i2 || [])), this._reseed = 1;
}, Re.prototype.generate = function(t, r2, i2, n2) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  typeof r2 != "string" && (n2 = i2, i2 = r2, r2 = null), i2 && (i2 = fe$1.toArray(i2, n2 || "hex"), this._update(i2));
  for (var o2 = []; o2.length < t; )
    this.V = this._hmac().update(this.V).digest(), o2 = o2.concat(this.V);
  var h2 = o2.slice(0, t);
  return this._update(i2), this._reseed++, fe$1.encode(h2, r2);
};
var Hi = Gt$1.assert;
function kt$1(e, t) {
  this.ec = e, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc);
}
var Li = kt$1;
kt$1.fromPublic = function(t, r2, i2) {
  return r2 instanceof kt$1 ? r2 : new kt$1(t, { pub: r2, pubEnc: i2 });
}, kt$1.fromPrivate = function(t, r2, i2) {
  return r2 instanceof kt$1 ? r2 : new kt$1(t, { priv: r2, privEnc: i2 });
}, kt$1.prototype.validate = function() {
  var t = this.getPublic();
  return t.isInfinity() ? { result: false, reason: "Invalid public key" } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? { result: true, reason: null } : { result: false, reason: "Public key * N != O" } : { result: false, reason: "Public key is not a point" };
}, kt$1.prototype.getPublic = function(t, r2) {
  return typeof t == "string" && (r2 = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), r2 ? this.pub.encode(r2, t) : this.pub;
}, kt$1.prototype.getPrivate = function(t) {
  return t === "hex" ? this.priv.toString(16, 2) : this.priv;
}, kt$1.prototype._importPrivate = function(t, r2) {
  this.priv = new K(t, r2 || 16), this.priv = this.priv.umod(this.ec.curve.n);
}, kt$1.prototype._importPublic = function(t, r2) {
  if (t.x || t.y) {
    this.ec.curve.type === "mont" ? Hi(t.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && Hi(t.x && t.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(t.x, t.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(t, r2);
}, kt$1.prototype.derive = function(t) {
  return t.validate() || Hi(t.validate(), "public point not validated"), t.mul(this.priv).getX();
}, kt$1.prototype.sign = function(t, r2, i2) {
  return this.ec.sign(t, this, r2, i2);
}, kt$1.prototype.verify = function(t, r2) {
  return this.ec.verify(t, r2, this);
}, kt$1.prototype.inspect = function() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var Wa$1 = Gt$1.assert;
function Qr$1(e, t) {
  if (e instanceof Qr$1)
    return e;
  this._importDER(e, t) || (Wa$1(e.r && e.s, "Signature without r or s"), this.r = new K(e.r, 16), this.s = new K(e.s, 16), e.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam);
}
var Jr$1 = Qr$1;
function Xa() {
  this.place = 0;
}
function zi(e, t) {
  var r2 = e[t.place++];
  if (!(r2 & 128))
    return r2;
  var i2 = r2 & 15;
  if (i2 === 0 || i2 > 4)
    return false;
  for (var n2 = 0, o2 = 0, h2 = t.place; o2 < i2; o2++, h2++)
    n2 <<= 8, n2 |= e[h2], n2 >>>= 0;
  return n2 <= 127 ? false : (t.place = h2, n2);
}
function Kf(e) {
  for (var t = 0, r2 = e.length - 1; !e[t] && !(e[t + 1] & 128) && t < r2; )
    t++;
  return t === 0 ? e : e.slice(t);
}
Qr$1.prototype._importDER = function(t, r2) {
  t = Gt$1.toArray(t, r2);
  var i2 = new Xa();
  if (t[i2.place++] !== 48)
    return false;
  var n2 = zi(t, i2);
  if (n2 === false || n2 + i2.place !== t.length || t[i2.place++] !== 2)
    return false;
  var o2 = zi(t, i2);
  if (o2 === false)
    return false;
  var h2 = t.slice(i2.place, o2 + i2.place);
  if (i2.place += o2, t[i2.place++] !== 2)
    return false;
  var p3 = zi(t, i2);
  if (p3 === false || t.length !== p3 + i2.place)
    return false;
  var A2 = t.slice(i2.place, p3 + i2.place);
  if (h2[0] === 0)
    if (h2[1] & 128)
      h2 = h2.slice(1);
    else
      return false;
  if (A2[0] === 0)
    if (A2[1] & 128)
      A2 = A2.slice(1);
    else
      return false;
  return this.r = new K(h2), this.s = new K(A2), this.recoveryParam = null, true;
};
function ji(e, t) {
  if (t < 128) {
    e.push(t);
    return;
  }
  var r2 = 1 + (Math.log(t) / Math.LN2 >>> 3);
  for (e.push(r2 | 128); --r2; )
    e.push(t >>> (r2 << 3) & 255);
  e.push(t);
}
Qr$1.prototype.toDER = function(t) {
  var r2 = this.r.toArray(), i2 = this.s.toArray();
  for (r2[0] & 128 && (r2 = [0].concat(r2)), i2[0] & 128 && (i2 = [0].concat(i2)), r2 = Kf(r2), i2 = Kf(i2); !i2[0] && !(i2[1] & 128); )
    i2 = i2.slice(1);
  var n2 = [2];
  ji(n2, r2.length), n2 = n2.concat(r2), n2.push(2), ji(n2, i2.length);
  var o2 = n2.concat(i2), h2 = [48];
  return ji(h2, o2.length), h2 = h2.concat(o2), Gt$1.encode(h2, t);
};
var $a$1 = function() {
  throw new Error("unsupported");
}, Hf = Gt$1.assert;
function ee$1(e) {
  if (!(this instanceof ee$1))
    return new ee$1(e);
  typeof e == "string" && (Hf(Object.prototype.hasOwnProperty.call(jr$1, e), "Unknown curve " + e), e = jr$1[e]), e instanceof jr$1.PresetCurve && (e = { curve: e }), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash;
}
var Za = ee$1;
ee$1.prototype.keyPair = function(t) {
  return new Li(this, t);
}, ee$1.prototype.keyFromPrivate = function(t, r2) {
  return Li.fromPrivate(this, t, r2);
}, ee$1.prototype.keyFromPublic = function(t, r2) {
  return Li.fromPublic(this, t, r2);
}, ee$1.prototype.genKeyPair = function(t) {
  t || (t = {});
  for (var r2 = new qf({ hash: this.hash, pers: t.pers, persEnc: t.persEnc || "utf8", entropy: t.entropy || $a$1(this.hash.hmacStrength), entropyEnc: t.entropy && t.entropyEnc || "utf8", nonce: this.n.toArray() }), i2 = this.n.byteLength(), n2 = this.n.sub(new K(2)); ; ) {
    var o2 = new K(r2.generate(i2));
    if (!(o2.cmp(n2) > 0))
      return o2.iaddn(1), this.keyFromPrivate(o2);
  }
}, ee$1.prototype._truncateToN = function(t, r2) {
  var i2 = t.byteLength() * 8 - this.n.bitLength();
  return i2 > 0 && (t = t.ushrn(i2)), !r2 && t.cmp(this.n) >= 0 ? t.sub(this.n) : t;
}, ee$1.prototype.sign = function(t, r2, i2, n2) {
  typeof i2 == "object" && (n2 = i2, i2 = null), n2 || (n2 = {}), r2 = this.keyFromPrivate(r2, i2), t = this._truncateToN(new K(t, 16));
  for (var o2 = this.n.byteLength(), h2 = r2.getPrivate().toArray("be", o2), p3 = t.toArray("be", o2), A2 = new qf({ hash: this.hash, entropy: h2, nonce: p3, pers: n2.pers, persEnc: n2.persEnc || "utf8" }), v3 = this.n.sub(new K(1)), w2 = 0; ; w2++) {
    var y3 = n2.k ? n2.k(w2) : new K(A2.generate(this.n.byteLength()));
    if (y3 = this._truncateToN(y3, true), !(y3.cmpn(1) <= 0 || y3.cmp(v3) >= 0)) {
      var S2 = this.g.mul(y3);
      if (!S2.isInfinity()) {
        var N2 = S2.getX(), I2 = N2.umod(this.n);
        if (I2.cmpn(0) !== 0) {
          var C3 = y3.invm(this.n).mul(I2.mul(r2.getPrivate()).iadd(t));
          if (C3 = C3.umod(this.n), C3.cmpn(0) !== 0) {
            var D2 = (S2.getY().isOdd() ? 1 : 0) | (N2.cmp(I2) !== 0 ? 2 : 0);
            return n2.canonical && C3.cmp(this.nh) > 0 && (C3 = this.n.sub(C3), D2 ^= 1), new Jr$1({ r: I2, s: C3, recoveryParam: D2 });
          }
        }
      }
    }
  }
}, ee$1.prototype.verify = function(t, r2, i2, n2) {
  t = this._truncateToN(new K(t, 16)), i2 = this.keyFromPublic(i2, n2), r2 = new Jr$1(r2, "hex");
  var o2 = r2.r, h2 = r2.s;
  if (o2.cmpn(1) < 0 || o2.cmp(this.n) >= 0 || h2.cmpn(1) < 0 || h2.cmp(this.n) >= 0)
    return false;
  var p3 = h2.invm(this.n), A2 = p3.mul(t).umod(this.n), v3 = p3.mul(o2).umod(this.n), w2;
  return this.curve._maxwellTrick ? (w2 = this.g.jmulAdd(A2, i2.getPublic(), v3), w2.isInfinity() ? false : w2.eqXToP(o2)) : (w2 = this.g.mulAdd(A2, i2.getPublic(), v3), w2.isInfinity() ? false : w2.getX().umod(this.n).cmp(o2) === 0);
}, ee$1.prototype.recoverPubKey = function(e, t, r2, i2) {
  Hf((3 & r2) === r2, "The recovery param is more than two bits"), t = new Jr$1(t, i2);
  var n2 = this.n, o2 = new K(e), h2 = t.r, p3 = t.s, A2 = r2 & 1, v3 = r2 >> 1;
  if (h2.cmp(this.curve.p.umod(this.curve.n)) >= 0 && v3)
    throw new Error("Unable to find sencond key candinate");
  v3 ? h2 = this.curve.pointFromX(h2.add(this.curve.n), A2) : h2 = this.curve.pointFromX(h2, A2);
  var w2 = t.r.invm(n2), y3 = n2.sub(o2).mul(w2).umod(n2), S2 = p3.mul(w2).umod(n2);
  return this.g.mulAdd(y3, h2, S2);
}, ee$1.prototype.getKeyRecoveryParam = function(e, t, r2, i2) {
  if (t = new Jr$1(t, i2), t.recoveryParam !== null)
    return t.recoveryParam;
  for (var n2 = 0; n2 < 4; n2++) {
    var o2;
    try {
      o2 = this.recoverPubKey(e, t, n2);
    } catch {
      continue;
    }
    if (o2.eq(r2))
      return n2;
  }
  throw new Error("Unable to find valid recovery factor");
};
var tu = lr$2(function(e, t) {
  var r2 = t;
  r2.version = "6.5.4", r2.utils = Gt$1, r2.rand = function() {
    throw new Error("unsupported");
  }, r2.curve = zr$1, r2.curves = jr$1, r2.ec = Za, r2.eddsa = null;
}), eu = tu.ec;
const ru = "signing-key/5.7.0", Qi = new z$2(ru);
let Ji = null;
function ve$1() {
  return Ji || (Ji = new eu("secp256k1")), Ji;
}
class iu {
  constructor(t) {
    wr$1(this, "curve", "secp256k1"), wr$1(this, "privateKey", Kt$1(t)), Us$1(this.privateKey) !== 32 && Qi.throwArgumentError("invalid private key", "privateKey", "[[ REDACTED ]]");
    const r2 = ve$1().keyFromPrivate(Ot$1(this.privateKey));
    wr$1(this, "publicKey", "0x" + r2.getPublic(false, "hex")), wr$1(this, "compressedPublicKey", "0x" + r2.getPublic(true, "hex")), wr$1(this, "_isSigningKey", true);
  }
  _addPoint(t) {
    const r2 = ve$1().keyFromPublic(Ot$1(this.publicKey)), i2 = ve$1().keyFromPublic(Ot$1(t));
    return "0x" + r2.pub.add(i2.pub).encodeCompressed("hex");
  }
  signDigest(t) {
    const r2 = ve$1().keyFromPrivate(Ot$1(this.privateKey)), i2 = Ot$1(t);
    i2.length !== 32 && Qi.throwArgumentError("bad digest length", "digest", t);
    const n2 = r2.sign(i2, { canonical: true });
    return Wn({ recoveryParam: n2.recoveryParam, r: oe$2("0x" + n2.r.toString(16), 32), s: oe$2("0x" + n2.s.toString(16), 32) });
  }
  computeSharedSecret(t) {
    const r2 = ve$1().keyFromPrivate(Ot$1(this.privateKey)), i2 = ve$1().keyFromPublic(Ot$1(Lf(t)));
    return oe$2("0x" + r2.derive(i2.getPublic()).toString(16), 32);
  }
  static isSigningKey(t) {
    return !!(t && t._isSigningKey);
  }
}
function nu(e, t) {
  const r2 = Wn(t), i2 = { r: Ot$1(r2.r), s: Ot$1(r2.s) };
  return "0x" + ve$1().recoverPubKey(Ot$1(e), i2, r2.recoveryParam).encode("hex", false);
}
function Lf(e, t) {
  const r2 = Ot$1(e);
  if (r2.length === 32) {
    const i2 = new iu(r2);
    return t ? "0x" + ve$1().keyFromPrivate(r2).getPublic(true, "hex") : i2.publicKey;
  } else {
    if (r2.length === 33)
      return t ? Kt$1(r2) : "0x" + ve$1().keyFromPublic(r2).getPublic(false, "hex");
    if (r2.length === 65)
      return t ? "0x" + ve$1().keyFromPublic(r2).getPublic(true, "hex") : Kt$1(r2);
  }
  return Qi.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}
var zf;
(function(e) {
  e[e.legacy = 0] = "legacy", e[e.eip2930 = 1] = "eip2930", e[e.eip1559 = 2] = "eip1559";
})(zf || (zf = {}));
function ou(e) {
  const t = Lf(e);
  return v0(Vn(Ii(Vn(t, 1)), 12));
}
function su(e, t) {
  return ou(nu(Ot$1(e), t));
}
const au = "https://rpc.walletconnect.org/v1";
async function jf(e, t, r2, i2, n2, o2) {
  switch (r2.t) {
    case "eip191":
      return Qf(e, t, r2.s);
    case "eip1271":
      return await Jf(e, t, r2.s, i2, n2, o2);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${r2.t}`);
  }
}
function Qf(e, t, r2) {
  return su(df(t), r2).toLowerCase() === e.toLowerCase();
}
async function Jf(e, t, r2, i2, n2, o2) {
  try {
    const h2 = "0x1626ba7e", p3 = "0000000000000000000000000000000000000000000000000000000000000040", A2 = "0000000000000000000000000000000000000000000000000000000000000041", v3 = r2.substring(2), w2 = df(t).substring(2), y3 = h2 + w2 + p3 + A2 + v3, S2 = await fetch(`${o2 || au}/?chainId=${i2}&projectId=${n2}`, { method: "POST", body: JSON.stringify({ id: uu(), jsonrpc: "2.0", method: "eth_call", params: [{ to: e, data: y3 }, "latest"] }) }), { result: N2 } = await S2.json();
    return N2 ? N2.slice(0, h2.length).toLowerCase() === h2.toLowerCase() : false;
  } catch (h2) {
    return console.error("isValidEip1271Signature: ", h2), false;
  }
}
function uu() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
var hu = Object.defineProperty, cu = Object.defineProperties, lu = Object.getOwnPropertyDescriptors, Gf = Object.getOwnPropertySymbols, du = Object.prototype.hasOwnProperty, pu = Object.prototype.propertyIsEnumerable, Yf = (e, t, r2) => t in e ? hu(e, t, { enumerable: true, configurable: true, writable: true, value: r2 }) : e[t] = r2, Gi = (e, t) => {
  for (var r2 in t || (t = {}))
    du.call(t, r2) && Yf(e, r2, t[r2]);
  if (Gf)
    for (var r2 of Gf(t))
      pu.call(t, r2) && Yf(e, r2, t[r2]);
  return e;
}, Vf = (e, t) => cu(e, lu(t));
const vu = "did:pkh:", Gr$1 = (e) => e == null ? void 0 : e.split(":"), Yi = (e) => {
  const t = e && Gr$1(e);
  if (t)
    return e.includes(vu) ? t[3] : t[1];
}, gu = (e) => {
  const t = e && Gr$1(e);
  if (t)
    return t[2] + ":" + t[3];
}, Vi = (e) => {
  const t = e && Gr$1(e);
  if (t)
    return t.pop();
};
async function mu(e) {
  const { cacao: t, projectId: r2 } = e, { s: i2, p: n2 } = t, o2 = Wf(n2, n2.iss), h2 = Vi(n2.iss);
  return await jf(h2, o2, i2, Yi(n2.iss), r2);
}
const Wf = (e, t) => {
  const r2 = `${e.domain} wants you to sign in with your Ethereum account:`, i2 = Vi(t);
  if (!e.aud && !e.uri)
    throw new Error("Either `aud` or `uri` is required to construct the message");
  let n2 = e.statement || void 0;
  const o2 = `URI: ${e.aud || e.uri}`, h2 = `Version: ${e.version}`, p3 = `Chain ID: ${Yi(t)}`, A2 = `Nonce: ${e.nonce}`, v3 = `Issued At: ${e.iat}`, w2 = e.exp ? `Expiration Time: ${e.exp}` : void 0, y3 = e.nbf ? `Not Before: ${e.nbf}` : void 0, S2 = e.requestId ? `Request ID: ${e.requestId}` : void 0, N2 = e.resources ? `Resources:${e.resources.map((C3) => `
- ${C3}`).join("")}` : void 0, I2 = Vr$1(e.resources);
  if (I2) {
    const C3 = Oe(I2);
    n2 = $i(n2, C3);
  }
  return [r2, i2, "", n2, "", o2, h2, p3, A2, v3, w2, y3, S2, N2].filter((C3) => C3 != null).join(`
`);
};
function to(e) {
  return Buffer.from(JSON.stringify(e)).toString("base64");
}
function eo(e) {
  return JSON.parse(Buffer.from(e, "base64").toString("utf-8"));
}
function ge(e) {
  if (!e)
    throw new Error("No recap provided, value is undefined");
  if (!e.att)
    throw new Error("No `att` property found");
  const t = Object.keys(e.att);
  if (!(t != null && t.length))
    throw new Error("No resources found in `att` property");
  t.forEach((r2) => {
    const i2 = e.att[r2];
    if (Array.isArray(i2))
      throw new Error(`Resource must be an object: ${r2}`);
    if (typeof i2 != "object")
      throw new Error(`Resource must be an object: ${r2}`);
    if (!Object.keys(i2).length)
      throw new Error(`Resource object is empty: ${r2}`);
    Object.keys(i2).forEach((n2) => {
      const o2 = i2[n2];
      if (!Array.isArray(o2))
        throw new Error(`Ability limits ${n2} must be an array of objects, found: ${o2}`);
      if (!o2.length)
        throw new Error(`Value of ${n2} is empty array, must be an array with objects`);
      o2.forEach((h2) => {
        if (typeof h2 != "object")
          throw new Error(`Ability limits (${n2}) must be an array of objects, found: ${h2}`);
      });
    });
  });
}
function ro(e, t, r2, i2 = {}) {
  return r2 == null ? void 0 : r2.sort((n2, o2) => n2.localeCompare(o2)), { att: { [e]: Wi$1(t, r2, i2) } };
}
function Wi$1(e, t, r2 = {}) {
  t = t == null ? void 0 : t.sort((n2, o2) => n2.localeCompare(o2));
  const i2 = t.map((n2) => ({ [`${e}/${n2}`]: [r2] }));
  return Object.assign({}, ...i2);
}
function Yr$1(e) {
  return ge(e), `urn:recap:${to(e).replace(/=/g, "")}`;
}
function Oe(e) {
  const t = eo(e.replace("urn:recap:", ""));
  return ge(t), t;
}
function xu(e, t, r2) {
  const i2 = ro(e, t, r2);
  return Yr$1(i2);
}
function Xi(e) {
  return e && e.includes("urn:recap:");
}
function Mu(e, t) {
  const r2 = Oe(e), i2 = Oe(t), n2 = no(r2, i2);
  return Yr$1(n2);
}
function no(e, t) {
  ge(e), ge(t);
  const r2 = Object.keys(e.att).concat(Object.keys(t.att)).sort((n2, o2) => n2.localeCompare(o2)), i2 = { att: {} };
  return r2.forEach((n2) => {
    var o2, h2;
    Object.keys(((o2 = e.att) == null ? void 0 : o2[n2]) || {}).concat(Object.keys(((h2 = t.att) == null ? void 0 : h2[n2]) || {})).sort((p3, A2) => p3.localeCompare(A2)).forEach((p3) => {
      var A2, v3;
      i2.att[n2] = Vf(Gi({}, i2.att[n2]), { [p3]: ((A2 = e.att[n2]) == null ? void 0 : A2[p3]) || ((v3 = t.att[n2]) == null ? void 0 : v3[p3]) });
    });
  }), i2;
}
function $i(e = "", t) {
  ge(t);
  const r2 = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (e.includes(r2))
    return e;
  const i2 = [];
  let n2 = 0;
  Object.keys(t.att).forEach((p3) => {
    const A2 = Object.keys(t.att[p3]).map((y3) => ({ ability: y3.split("/")[0], action: y3.split("/")[1] }));
    A2.sort((y3, S2) => y3.action.localeCompare(S2.action));
    const v3 = {};
    A2.forEach((y3) => {
      v3[y3.ability] || (v3[y3.ability] = []), v3[y3.ability].push(y3.action);
    });
    const w2 = Object.keys(v3).map((y3) => (n2++, `(${n2}) '${y3}': '${v3[y3].join("', '")}' for '${p3}'.`));
    i2.push(w2.join(", ").replace(".,", "."));
  });
  const o2 = i2.join(" "), h2 = `${r2}${o2}`;
  return `${e ? e + " " : ""}${h2}`;
}
function Eu(e) {
  var t;
  const r2 = Oe(e);
  ge(r2);
  const i2 = (t = r2.att) == null ? void 0 : t.eip155;
  return i2 ? Object.keys(i2).map((n2) => n2.split("/")[1]) : [];
}
function Su(e) {
  const t = Oe(e);
  ge(t);
  const r2 = [];
  return Object.values(t.att).forEach((i2) => {
    Object.values(i2).forEach((n2) => {
      var o2;
      (o2 = n2 == null ? void 0 : n2[0]) != null && o2.chains && r2.push(n2[0].chains);
    });
  }), [...new Set(r2.flat())];
}
function Vr$1(e) {
  if (!e)
    return;
  const t = e == null ? void 0 : e[e.length - 1];
  return Xi(t) ? t : void 0;
}
const Zi = "base10", Lt$2 = "base16", tn$1 = "base64pad", Iu = "base64url", dr$2 = "utf8", en$1 = 0, pr$2 = 1, Sr$1 = 2, Nu = 0, oo = 1, Ir$1 = 12, rn$1 = 32;
function _u() {
  const e = x25519.generateKeyPair();
  return { privateKey: toString(e.secretKey, Lt$2), publicKey: toString(e.publicKey, Lt$2) };
}
function Bu() {
  const e = random.randomBytes(rn$1);
  return toString(e, Lt$2);
}
function Cu(e, t) {
  const r2 = x25519.sharedKey(fromString(e, Lt$2), fromString(t, Lt$2), true), i2 = new HKDF_1(sha256.SHA256, r2).expand(rn$1);
  return toString(i2, Lt$2);
}
function Ru(e) {
  const t = sha256.hash(fromString(e, Lt$2));
  return toString(t, Lt$2);
}
function Ou(e) {
  const t = sha256.hash(fromString(e, dr$2));
  return toString(t, Lt$2);
}
function nn$1(e) {
  return fromString(`${e}`, Zi);
}
function Ze$1(e) {
  return Number(toString(e, Zi));
}
function Pu(e) {
  const t = nn$1(typeof e.type < "u" ? e.type : en$1);
  if (Ze$1(t) === pr$2 && typeof e.senderPublicKey > "u")
    throw new Error("Missing sender public key for type 1 envelope");
  const r2 = typeof e.senderPublicKey < "u" ? fromString(e.senderPublicKey, Lt$2) : void 0, i2 = typeof e.iv < "u" ? fromString(e.iv, Lt$2) : random.randomBytes(Ir$1), n2 = new chacha20poly1305.ChaCha20Poly1305(fromString(e.symKey, Lt$2)).seal(i2, fromString(e.message, dr$2));
  return fn$1({ type: t, sealed: n2, iv: i2, senderPublicKey: r2, encoding: e.encoding });
}
function Tu(e, t) {
  const r2 = nn$1(Sr$1), i2 = random.randomBytes(Ir$1), n2 = fromString(e, dr$2);
  return fn$1({ type: r2, sealed: n2, iv: i2, encoding: t });
}
function Du(e) {
  const t = new chacha20poly1305.ChaCha20Poly1305(fromString(e.symKey, Lt$2)), { sealed: r2, iv: i2 } = Wr$1({ encoded: e.encoded, encoding: e == null ? void 0 : e.encoding }), n2 = t.open(i2, r2);
  if (n2 === null)
    throw new Error("Failed to decrypt");
  return toString(n2, dr$2);
}
function Fu(e, t) {
  const { sealed: r2 } = Wr$1({ encoded: e, encoding: t });
  return toString(r2, dr$2);
}
function fn$1(e) {
  const { encoding: t = tn$1 } = e;
  if (Ze$1(e.type) === Sr$1)
    return toString(concat([e.type, e.sealed]), t);
  if (Ze$1(e.type) === pr$2) {
    if (typeof e.senderPublicKey > "u")
      throw new Error("Missing sender public key for type 1 envelope");
    return toString(concat([e.type, e.senderPublicKey, e.iv, e.sealed]), t);
  }
  return toString(concat([e.type, e.iv, e.sealed]), t);
}
function Wr$1(e) {
  const { encoded: t, encoding: r2 = tn$1 } = e, i2 = fromString(t, r2), n2 = i2.slice(Nu, oo), o2 = oo;
  if (Ze$1(n2) === pr$2) {
    const v3 = o2 + rn$1, w2 = v3 + Ir$1, y3 = i2.slice(o2, v3), S2 = i2.slice(v3, w2), N2 = i2.slice(w2);
    return { type: n2, sealed: N2, iv: S2, senderPublicKey: y3 };
  }
  if (Ze$1(n2) === Sr$1) {
    const v3 = i2.slice(o2), w2 = random.randomBytes(Ir$1);
    return { type: n2, sealed: v3, iv: w2 };
  }
  const h2 = o2 + Ir$1, p3 = i2.slice(o2, h2), A2 = i2.slice(h2);
  return { type: n2, sealed: A2, iv: p3 };
}
function Uu(e, t) {
  const r2 = Wr$1({ encoded: e, encoding: t == null ? void 0 : t.encoding });
  return so({ type: Ze$1(r2.type), senderPublicKey: typeof r2.senderPublicKey < "u" ? toString(r2.senderPublicKey, Lt$2) : void 0, receiverPublicKey: t == null ? void 0 : t.receiverPublicKey });
}
function so(e) {
  const t = (e == null ? void 0 : e.type) || en$1;
  if (t === pr$2) {
    if (typeof (e == null ? void 0 : e.senderPublicKey) > "u")
      throw new Error("missing sender public key");
    if (typeof (e == null ? void 0 : e.receiverPublicKey) > "u")
      throw new Error("missing receiver public key");
  }
  return { type: t, senderPublicKey: e == null ? void 0 : e.senderPublicKey, receiverPublicKey: e == null ? void 0 : e.receiverPublicKey };
}
function ku(e) {
  return e.type === pr$2 && typeof e.senderPublicKey == "string" && typeof e.receiverPublicKey == "string";
}
function qu(e) {
  return e.type === Sr$1;
}
function ao(e) {
  return new elliptic.ec("p256").keyFromPublic({ x: Buffer.from(e.x, "base64").toString("hex"), y: Buffer.from(e.y, "base64").toString("hex") }, "hex");
}
function Ku(e) {
  let t = e.replace(/-/g, "+").replace(/_/g, "/");
  const r2 = t.length % 4;
  return r2 > 0 && (t += "=".repeat(4 - r2)), t;
}
function Hu(e) {
  return Buffer.from(Ku(e), "base64");
}
function Lu(e, t) {
  const [r2, i2, n2] = e.split("."), o2 = Hu(n2);
  if (o2.length !== 64)
    throw new Error("Invalid signature length");
  const h2 = o2.slice(0, 32).toString("hex"), p3 = o2.slice(32, 64).toString("hex"), A2 = `${r2}.${i2}`, v3 = new sha256.SHA256().update(Buffer.from(A2)).digest(), w2 = ao(t), y3 = Buffer.from(v3).toString("hex");
  if (!w2.verify(y3, { r: h2, s: p3 }))
    throw new Error("Invalid signature");
  return decodeJWT(e).payload;
}
const uo = "irn";
function zu(e) {
  return (e == null ? void 0 : e.relay) || { protocol: uo };
}
function ju(e) {
  const t = C$2[e];
  if (typeof t > "u")
    throw new Error(`Relay Protocol not supported: ${e}`);
  return t;
}
var Qu = Object.defineProperty, Ju = Object.defineProperties, Gu = Object.getOwnPropertyDescriptors, ho = Object.getOwnPropertySymbols, Yu = Object.prototype.hasOwnProperty, Vu = Object.prototype.propertyIsEnumerable, co = (e, t, r2) => t in e ? Qu(e, t, { enumerable: true, configurable: true, writable: true, value: r2 }) : e[t] = r2, lo = (e, t) => {
  for (var r2 in t || (t = {}))
    Yu.call(t, r2) && co(e, r2, t[r2]);
  if (ho)
    for (var r2 of ho(t))
      Vu.call(t, r2) && co(e, r2, t[r2]);
  return e;
}, Wu = (e, t) => Ju(e, Gu(t));
function po(e, t = "-") {
  const r2 = {}, i2 = "relay" + t;
  return Object.keys(e).forEach((n2) => {
    if (n2.startsWith(i2)) {
      const o2 = n2.replace(i2, ""), h2 = e[n2];
      r2[o2] = h2;
    }
  }), r2;
}
function Xu(e) {
  if (!e.includes("wc:")) {
    const A2 = xi(e);
    A2 != null && A2.includes("wc:") && (e = A2);
  }
  e = e.includes("wc://") ? e.replace("wc://", "") : e, e = e.includes("wc:") ? e.replace("wc:", "") : e;
  const t = e.indexOf(":"), r2 = e.indexOf("?") !== -1 ? e.indexOf("?") : void 0, i2 = e.substring(0, t), n2 = e.substring(t + 1, r2).split("@"), o2 = typeof r2 < "u" ? e.substring(r2) : "", h2 = queryString.parse(o2), p3 = typeof h2.methods == "string" ? h2.methods.split(",") : void 0;
  return { protocol: i2, topic: vo(n2[0]), version: parseInt(n2[1], 10), symKey: h2.symKey, relay: po(h2), methods: p3, expiryTimestamp: h2.expiryTimestamp ? parseInt(h2.expiryTimestamp, 10) : void 0 };
}
function vo(e) {
  return e.startsWith("//") ? e.substring(2) : e;
}
function go(e, t = "-") {
  const r2 = "relay", i2 = {};
  return Object.keys(e).forEach((n2) => {
    const o2 = r2 + t + n2;
    e[n2] && (i2[o2] = e[n2]);
  }), i2;
}
function $u(e) {
  return `${e.protocol}:${e.topic}@${e.version}?` + queryString.stringify(lo(Wu(lo({ symKey: e.symKey }, go(e.relay)), { expiryTimestamp: e.expiryTimestamp }), e.methods ? { methods: e.methods.join(",") } : {}));
}
function Zu(e, t, r2) {
  return `${e}?wc_ev=${r2}&topic=${t}`;
}
function tr$1(e) {
  const t = [];
  return e.forEach((r2) => {
    const [i2, n2] = r2.split(":");
    t.push(`${i2}:${n2}`);
  }), t;
}
function bo(e) {
  const t = [];
  return Object.values(e).forEach((r2) => {
    t.push(...tr$1(r2.accounts));
  }), t;
}
function yo(e, t) {
  const r2 = [];
  return Object.values(e).forEach((i2) => {
    tr$1(i2.accounts).includes(t) && r2.push(...i2.methods);
  }), r2;
}
function wo(e, t) {
  const r2 = [];
  return Object.values(e).forEach((i2) => {
    tr$1(i2.accounts).includes(t) && r2.push(...i2.events);
  }), r2;
}
function on$1(e) {
  return e.includes(":");
}
function xo(e) {
  return on$1(e) ? e.split(":")[0] : e;
}
function Mo(e) {
  const t = {};
  return e == null ? void 0 : e.forEach((r2) => {
    const [i2, n2] = r2.split(":");
    t[i2] || (t[i2] = { accounts: [], chains: [], events: [] }), t[i2].accounts.push(r2), t[i2].chains.push(`${i2}:${n2}`);
  }), t;
}
function uh(e, t) {
  t = t.map((i2) => i2.replace("did:pkh:", ""));
  const r2 = Mo(t);
  for (const [i2, n2] of Object.entries(r2))
    n2.methods ? n2.methods = me$1(n2.methods, e) : n2.methods = e, n2.events = ["chainChanged", "accountsChanged"];
  return r2;
}
const Eo = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, So = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function xe$1(e, t) {
  const { message: r2, code: i2 } = So[e];
  return { message: t ? `${r2} ${t}` : r2, code: i2 };
}
function er$1(e, t) {
  const { message: r2, code: i2 } = Eo[e];
  return { message: t ? `${r2} ${t}` : r2, code: i2 };
}
function Nr$1(e, t) {
  return Array.isArray(e) ? typeof t < "u" && e.length ? e.every(t) : true : false;
}
function Xr$1(e) {
  return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
}
function Pe(e) {
  return typeof e > "u";
}
function Yt$1(e, t) {
  return t && Pe(e) ? true : typeof e == "string" && !!e.trim().length;
}
function $r$1(e, t) {
  return t && Pe(e) ? true : typeof e == "number" && !isNaN(e);
}
function hh(e, t) {
  const { requiredNamespaces: r2 } = t, i2 = Object.keys(e.namespaces), n2 = Object.keys(r2);
  let o2 = true;
  return _e$2(n2, i2) ? (i2.forEach((h2) => {
    const { accounts: p3, methods: A2, events: v3 } = e.namespaces[h2], w2 = tr$1(p3), y3 = r2[h2];
    (!_e$2(Or$1(h2, y3), w2) || !_e$2(y3.methods, A2) || !_e$2(y3.events, v3)) && (o2 = false);
  }), o2) : false;
}
function _r$1(e) {
  return Yt$1(e, false) && e.includes(":") ? e.split(":").length === 2 : false;
}
function Io(e) {
  if (Yt$1(e, false) && e.includes(":")) {
    const t = e.split(":");
    if (t.length === 3) {
      const r2 = t[0] + ":" + t[1];
      return !!t[2] && _r$1(r2);
    }
  }
  return false;
}
function ch(e) {
  function t(r2) {
    try {
      return typeof new URL(r2) < "u";
    } catch {
      return false;
    }
  }
  try {
    if (Yt$1(e, false)) {
      if (t(e))
        return true;
      const r2 = xi(e);
      return t(r2);
    }
  } catch {
  }
  return false;
}
function lh(e) {
  var t;
  return (t = e == null ? void 0 : e.proposer) == null ? void 0 : t.publicKey;
}
function dh(e) {
  return e == null ? void 0 : e.topic;
}
function ph(e, t) {
  let r2 = null;
  return Yt$1(e == null ? void 0 : e.publicKey, false) || (r2 = xe$1("MISSING_OR_INVALID", `${t} controller public key should be a string`)), r2;
}
function an$1(e) {
  let t = true;
  return Nr$1(e) ? e.length && (t = e.every((r2) => Yt$1(r2, false))) : t = false, t;
}
function No(e, t, r2) {
  let i2 = null;
  return Nr$1(t) && t.length ? t.forEach((n2) => {
    i2 || _r$1(n2) || (i2 = er$1("UNSUPPORTED_CHAINS", `${r2}, chain ${n2} should be a string and conform to "namespace:chainId" format`));
  }) : _r$1(e) || (i2 = er$1("UNSUPPORTED_CHAINS", `${r2}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), i2;
}
function _o(e, t, r2) {
  let i2 = null;
  return Object.entries(e).forEach(([n2, o2]) => {
    if (i2)
      return;
    const h2 = No(n2, Or$1(n2, o2), `${t} ${r2}`);
    h2 && (i2 = h2);
  }), i2;
}
function Bo(e, t) {
  let r2 = null;
  return Nr$1(e) ? e.forEach((i2) => {
    r2 || Io(i2) || (r2 = er$1("UNSUPPORTED_ACCOUNTS", `${t}, account ${i2} should be a string and conform to "namespace:chainId:address" format`));
  }) : r2 = er$1("UNSUPPORTED_ACCOUNTS", `${t}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), r2;
}
function Co(e, t) {
  let r2 = null;
  return Object.values(e).forEach((i2) => {
    if (r2)
      return;
    const n2 = Bo(i2 == null ? void 0 : i2.accounts, `${t} namespace`);
    n2 && (r2 = n2);
  }), r2;
}
function Ro(e, t) {
  let r2 = null;
  return an$1(e == null ? void 0 : e.methods) ? an$1(e == null ? void 0 : e.events) || (r2 = er$1("UNSUPPORTED_EVENTS", `${t}, events should be an array of strings or empty array for no events`)) : r2 = er$1("UNSUPPORTED_METHODS", `${t}, methods should be an array of strings or empty array for no methods`), r2;
}
function un$1(e, t) {
  let r2 = null;
  return Object.values(e).forEach((i2) => {
    if (r2)
      return;
    const n2 = Ro(i2, `${t}, namespace`);
    n2 && (r2 = n2);
  }), r2;
}
function vh(e, t, r2) {
  let i2 = null;
  if (e && Xr$1(e)) {
    const n2 = un$1(e, t);
    n2 && (i2 = n2);
    const o2 = _o(e, t, r2);
    o2 && (i2 = o2);
  } else
    i2 = xe$1("MISSING_OR_INVALID", `${t}, ${r2} should be an object with data`);
  return i2;
}
function Oo(e, t) {
  let r2 = null;
  if (e && Xr$1(e)) {
    const i2 = un$1(e, t);
    i2 && (r2 = i2);
    const n2 = Co(e, t);
    n2 && (r2 = n2);
  } else
    r2 = xe$1("MISSING_OR_INVALID", `${t}, namespaces should be an object with data`);
  return r2;
}
function Po(e) {
  return Yt$1(e.protocol, true);
}
function gh(e, t) {
  let r2 = false;
  return t && !e ? r2 = true : e && Nr$1(e) && e.length && e.forEach((i2) => {
    r2 = Po(i2);
  }), r2;
}
function mh(e) {
  return typeof e == "number";
}
function Ah(e) {
  return typeof e < "u" && typeof e !== null;
}
function bh(e) {
  return !(!e || typeof e != "object" || !e.code || !$r$1(e.code, false) || !e.message || !Yt$1(e.message, false));
}
function yh(e) {
  return !(Pe(e) || !Yt$1(e.method, false));
}
function wh(e) {
  return !(Pe(e) || Pe(e.result) && Pe(e.error) || !$r$1(e.id, false) || !Yt$1(e.jsonrpc, false));
}
function xh(e) {
  return !(Pe(e) || !Yt$1(e.name, false));
}
function Mh(e, t) {
  return !(!_r$1(t) || !bo(e).includes(t));
}
function Eh(e, t, r2) {
  return Yt$1(r2, false) ? yo(e, t).includes(r2) : false;
}
function Sh(e, t, r2) {
  return Yt$1(r2, false) ? wo(e, t).includes(r2) : false;
}
function To(e, t, r2) {
  let i2 = null;
  const n2 = Ih(e), o2 = Nh(t), h2 = Object.keys(n2), p3 = Object.keys(o2), A2 = Do(Object.keys(e)), v3 = Do(Object.keys(t)), w2 = A2.filter((y3) => !v3.includes(y3));
  return w2.length && (i2 = xe$1("NON_CONFORMING_NAMESPACES", `${r2} namespaces keys don't satisfy requiredNamespaces.
      Required: ${w2.toString()}
      Received: ${Object.keys(t).toString()}`)), _e$2(h2, p3) || (i2 = xe$1("NON_CONFORMING_NAMESPACES", `${r2} namespaces chains don't satisfy required namespaces.
      Required: ${h2.toString()}
      Approved: ${p3.toString()}`)), Object.keys(t).forEach((y3) => {
    if (!y3.includes(":") || i2)
      return;
    const S2 = tr$1(t[y3].accounts);
    S2.includes(y3) || (i2 = xe$1("NON_CONFORMING_NAMESPACES", `${r2} namespaces accounts don't satisfy namespace accounts for ${y3}
        Required: ${y3}
        Approved: ${S2.toString()}`));
  }), h2.forEach((y3) => {
    i2 || (_e$2(n2[y3].methods, o2[y3].methods) ? _e$2(n2[y3].events, o2[y3].events) || (i2 = xe$1("NON_CONFORMING_NAMESPACES", `${r2} namespaces events don't satisfy namespace events for ${y3}`)) : i2 = xe$1("NON_CONFORMING_NAMESPACES", `${r2} namespaces methods don't satisfy namespace methods for ${y3}`));
  }), i2;
}
function Ih(e) {
  const t = {};
  return Object.keys(e).forEach((r2) => {
    var i2;
    r2.includes(":") ? t[r2] = e[r2] : (i2 = e[r2].chains) == null || i2.forEach((n2) => {
      t[n2] = { methods: e[r2].methods, events: e[r2].events };
    });
  }), t;
}
function Do(e) {
  return [...new Set(e.map((t) => t.includes(":") ? t.split(":")[0] : t))];
}
function Nh(e) {
  const t = {};
  return Object.keys(e).forEach((r2) => {
    if (r2.includes(":"))
      t[r2] = e[r2];
    else {
      const i2 = tr$1(e[r2].accounts);
      i2 == null ? void 0 : i2.forEach((n2) => {
        t[n2] = { accounts: e[r2].accounts.filter((o2) => o2.includes(`${n2}:`)), methods: e[r2].methods, events: e[r2].events };
      });
    }
  }), t;
}
function _h(e, t) {
  return $r$1(e, false) && e <= t.max && e >= t.min;
}
function Bh() {
  const e = We();
  return new Promise((t) => {
    switch (e) {
      case qt$1.browser:
        t(Fo());
        break;
      case qt$1.reactNative:
        t(Uo());
        break;
      case qt$1.node:
        t(ko());
        break;
      default:
        t(true);
    }
  });
}
function Fo() {
  return gr$1() && (navigator == null ? void 0 : navigator.onLine);
}
async function Uo() {
  if (rr$1() && typeof global < "u" && global != null && global.NetInfo) {
    const e = await (global == null ? void 0 : global.NetInfo.fetch());
    return e == null ? void 0 : e.isConnected;
  }
  return true;
}
function ko() {
  return true;
}
function Ch(e) {
  switch (We()) {
    case qt$1.browser:
      qo(e);
      break;
    case qt$1.reactNative:
      Ko(e);
      break;
  }
}
function qo(e) {
  !rr$1() && gr$1() && (window.addEventListener("online", () => e(true)), window.addEventListener("offline", () => e(false)));
}
function Ko(e) {
  rr$1() && typeof global < "u" && global != null && global.NetInfo && (global == null ? void 0 : global.NetInfo.addEventListener((t) => e(t == null ? void 0 : t.isConnected)));
}
const hn$1 = {};
class Rh {
  static get(t) {
    return hn$1[t];
  }
  static set(t, r2) {
    hn$1[t] = r2;
  }
  static delete(t) {
    delete hn$1[t];
  }
}
class n extends IEvents {
  constructor(s) {
    super(), this.opts = s, this.protocol = "wc", this.version = 2;
  }
}
class h extends IEvents {
  constructor(s, t) {
    super(), this.core = s, this.logger = t, this.records = /* @__PURE__ */ new Map();
  }
}
class a {
  constructor(s, t) {
    this.logger = s, this.core = t;
  }
}
let g$1 = class g extends IEvents {
  constructor(s, t) {
    super(), this.relayer = s, this.logger = t;
  }
};
let u$1 = class u extends IEvents {
  constructor(s) {
    super();
  }
};
let p$1 = class p {
  constructor(s, t, e, f2) {
    this.core = s, this.logger = t, this.name = e;
  }
};
class d extends IEvents {
  constructor(s, t) {
    super(), this.relayer = s, this.logger = t;
  }
}
let x$2 = class x extends IEvents {
  constructor(s, t) {
    super(), this.core = s, this.logger = t;
  }
};
let y$2 = class y {
  constructor(s, t, e) {
    this.core = s, this.logger = t, this.store = e;
  }
};
let v$2 = class v {
  constructor(s, t) {
    this.projectId = s, this.logger = t;
  }
};
let C$1 = class C {
  constructor(s, t, e) {
    this.core = s, this.logger = t, this.telemetryEnabled = e;
  }
};
class S {
  constructor(s) {
    this.opts = s, this.protocol = "wc", this.version = 2;
  }
}
let M$2 = class M {
  constructor(s) {
    this.client = s;
  }
};
const be$1 = "wc", fe = 2, ne = "core", O$1 = `${be$1}@2:${ne}:`, Xe = { name: ne, logger: "error" }, Ze = { database: ":memory:" }, Qe = "crypto", _e$1 = "client_ed25519_seed", et = cjs.ONE_DAY, tt = "keychain", it$1 = "0.3", st$1 = "messages", rt$1 = "0.3", nt$1 = cjs.SIX_HOURS, ot$1 = "publisher", at$1 = "irn", ct$1 = "error", Ee = "wss://relay.walletconnect.org", ht$1 = "relayer", w = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, lt$1 = "_subscription", T$1 = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, ut$1 = 0.1, oe$1 = "2.17.0", F$1 = { link_mode: "link_mode", relay: "relay" }, dt$1 = "0.3", gt$1 = "WALLETCONNECT_CLIENT_ID", ve = "WALLETCONNECT_LINK_MODE_APPS", A = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, pt$1 = "subscription", yt$1 = "0.3", Dt = cjs.FIVE_SECONDS * 1e3, mt = "pairing", bt = "0.3", j$1 = { wc_pairingDelete: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: cjs.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: cjs.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 0 } } }, q$1 = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, P = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, ft = "history", _t = "0.3", Et = "expirer", R$1 = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, vt = "0.3", wt = "verify-api", Is$1 = "https://verify.walletconnect.com", It = "https://verify.walletconnect.org", Z = It, Tt$1 = `${Z}/v3`, Ct = [Is$1, It], St = "echo", Pt = "https://echo.walletconnect.com", z$1 = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" }, M$1 = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" }, Cs = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" }, Ss$1 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" }, Ps = { authenticated_session_approve_started: "authenticated_session_approve_started", authenticated_session_not_expired: "authenticated_session_not_expired", chains_caip2_compliant: "chains_caip2_compliant", chains_evm_compliant: "chains_evm_compliant", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve", authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success" }, Rs$1 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", missing_session_authenticate_request: "missing_session_authenticate_request", session_authenticate_request_expired: "session_authenticate_request_expired", chains_caip2_compliant_failure: "chains_caip2_compliant_failure", chains_evm_compliant_failure: "chains_evm_compliant_failure", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" }, Rt = 0.1, xt = "event-client", Ot = 86400, At = "https://pulse.walletconnect.org/batch";
function xs(o2, e) {
  if (o2.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), s = 0; s < t.length; s++)
    t[s] = 255;
  for (var i2 = 0; i2 < o2.length; i2++) {
    var r2 = o2.charAt(i2), n2 = r2.charCodeAt(0);
    if (t[n2] !== 255)
      throw new TypeError(r2 + " is ambiguous");
    t[n2] = i2;
  }
  var a2 = o2.length, c = o2.charAt(0), h2 = Math.log(a2) / Math.log(256), d2 = Math.log(256) / Math.log(a2);
  function g3(l) {
    if (l instanceof Uint8Array || (ArrayBuffer.isView(l) ? l = new Uint8Array(l.buffer, l.byteOffset, l.byteLength) : Array.isArray(l) && (l = Uint8Array.from(l))), !(l instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (l.length === 0)
      return "";
    for (var p3 = 0, E2 = 0, D2 = 0, f2 = l.length; D2 !== f2 && l[D2] === 0; )
      D2++, p3++;
    for (var N2 = (f2 - D2) * d2 + 1 >>> 0, C3 = new Uint8Array(N2); D2 !== f2; ) {
      for (var L2 = l[D2], $2 = 0, x3 = N2 - 1; (L2 !== 0 || $2 < E2) && x3 !== -1; x3--, $2++)
        L2 += 256 * C3[x3] >>> 0, C3[x3] = L2 % a2 >>> 0, L2 = L2 / a2 >>> 0;
      if (L2 !== 0)
        throw new Error("Non-zero carry");
      E2 = $2, D2++;
    }
    for (var k2 = N2 - E2; k2 !== N2 && C3[k2] === 0; )
      k2++;
    for (var ie2 = c.repeat(p3); k2 < N2; ++k2)
      ie2 += o2.charAt(C3[k2]);
    return ie2;
  }
  function m2(l) {
    if (typeof l != "string")
      throw new TypeError("Expected String");
    if (l.length === 0)
      return new Uint8Array();
    var p3 = 0;
    if (l[p3] !== " ") {
      for (var E2 = 0, D2 = 0; l[p3] === c; )
        E2++, p3++;
      for (var f2 = (l.length - p3) * h2 + 1 >>> 0, N2 = new Uint8Array(f2); l[p3]; ) {
        var C3 = t[l.charCodeAt(p3)];
        if (C3 === 255)
          return;
        for (var L2 = 0, $2 = f2 - 1; (C3 !== 0 || L2 < D2) && $2 !== -1; $2--, L2++)
          C3 += a2 * N2[$2] >>> 0, N2[$2] = C3 % 256 >>> 0, C3 = C3 / 256 >>> 0;
        if (C3 !== 0)
          throw new Error("Non-zero carry");
        D2 = L2, p3++;
      }
      if (l[p3] !== " ") {
        for (var x3 = f2 - D2; x3 !== f2 && N2[x3] === 0; )
          x3++;
        for (var k2 = new Uint8Array(E2 + (f2 - x3)), ie2 = E2; x3 !== f2; )
          k2[ie2++] = N2[x3++];
        return k2;
      }
    }
  }
  function b2(l) {
    var p3 = m2(l);
    if (p3)
      return p3;
    throw new Error(`Non-${e} character`);
  }
  return { encode: g3, decodeUnsafe: m2, decode: b2 };
}
var Os = xs, As = Os;
const Nt = (o2) => {
  if (o2 instanceof Uint8Array && o2.constructor.name === "Uint8Array")
    return o2;
  if (o2 instanceof ArrayBuffer)
    return new Uint8Array(o2);
  if (ArrayBuffer.isView(o2))
    return new Uint8Array(o2.buffer, o2.byteOffset, o2.byteLength);
  throw new Error("Unknown type, must be binary type");
}, Ns = (o2) => new TextEncoder().encode(o2), Ls = (o2) => new TextDecoder().decode(o2);
class zs {
  constructor(e, t, s) {
    this.name = e, this.prefix = t, this.baseEncode = s;
  }
  encode(e) {
    if (e instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class ks {
  constructor(e, t, s) {
    if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = s;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e) {
    return Lt$1(this, e);
  }
}
class Ms {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return Lt$1(this, e);
  }
  decode(e) {
    const t = e[0], s = this.decoders[t];
    if (s)
      return s.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const Lt$1 = (o2, e) => new Ms({ ...o2.decoders || { [o2.prefix]: o2 }, ...e.decoders || { [e.prefix]: e } });
class $s {
  constructor(e, t, s, i2) {
    this.name = e, this.prefix = t, this.baseEncode = s, this.baseDecode = i2, this.encoder = new zs(e, t, s), this.decoder = new ks(e, t, i2);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const ae$1 = ({ name: o2, prefix: e, encode: t, decode: s }) => new $s(o2, e, t, s), Q$1 = ({ prefix: o2, name: e, alphabet: t }) => {
  const { encode: s, decode: i2 } = As(t, e);
  return ae$1({ prefix: o2, name: e, encode: s, decode: (r2) => Nt(i2(r2)) });
}, Fs = (o2, e, t, s) => {
  const i2 = {};
  for (let d2 = 0; d2 < e.length; ++d2)
    i2[e[d2]] = d2;
  let r2 = o2.length;
  for (; o2[r2 - 1] === "="; )
    --r2;
  const n2 = new Uint8Array(r2 * t / 8 | 0);
  let a2 = 0, c = 0, h2 = 0;
  for (let d2 = 0; d2 < r2; ++d2) {
    const g3 = i2[o2[d2]];
    if (g3 === void 0)
      throw new SyntaxError(`Non-${s} character`);
    c = c << t | g3, a2 += t, a2 >= 8 && (a2 -= 8, n2[h2++] = 255 & c >> a2);
  }
  if (a2 >= t || 255 & c << 8 - a2)
    throw new SyntaxError("Unexpected end of data");
  return n2;
}, Us = (o2, e, t) => {
  const s = e[e.length - 1] === "=", i2 = (1 << t) - 1;
  let r2 = "", n2 = 0, a2 = 0;
  for (let c = 0; c < o2.length; ++c)
    for (a2 = a2 << 8 | o2[c], n2 += 8; n2 > t; )
      n2 -= t, r2 += e[i2 & a2 >> n2];
  if (n2 && (r2 += e[i2 & a2 << t - n2]), s)
    for (; r2.length * t & 7; )
      r2 += "=";
  return r2;
}, _ = ({ name: o2, prefix: e, bitsPerChar: t, alphabet: s }) => ae$1({ prefix: e, name: o2, encode(i2) {
  return Us(i2, s, t);
}, decode(i2) {
  return Fs(i2, s, t, o2);
} }), Ks = ae$1({ prefix: "\0", name: "identity", encode: (o2) => Ls(o2), decode: (o2) => Ns(o2) });
var Bs = Object.freeze({ __proto__: null, identity: Ks });
const Vs = _({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var js = Object.freeze({ __proto__: null, base2: Vs });
const qs$1 = _({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Gs = Object.freeze({ __proto__: null, base8: qs$1 });
const Hs = Q$1({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Ys = Object.freeze({ __proto__: null, base10: Hs });
const Js = _({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), Ws = _({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Xs = Object.freeze({ __proto__: null, base16: Js, base16upper: Ws });
const Zs = _({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Qs = _({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), er = _({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), tr = _({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), ir = _({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), sr = _({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), rr = _({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), nr = _({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), or = _({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var ar = Object.freeze({ __proto__: null, base32: Zs, base32upper: Qs, base32pad: er, base32padupper: tr, base32hex: ir, base32hexupper: sr, base32hexpad: rr, base32hexpadupper: nr, base32z: or });
const cr = Q$1({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), hr = Q$1({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var lr$1 = Object.freeze({ __proto__: null, base36: cr, base36upper: hr });
const ur = Q$1({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), dr$1 = Q$1({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var gr = Object.freeze({ __proto__: null, base58btc: ur, base58flickr: dr$1 });
const pr$1 = _({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), yr = _({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), Dr = _({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), mr = _({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var br = Object.freeze({ __proto__: null, base64: pr$1, base64pad: yr, base64url: Dr, base64urlpad: mr });
const zt = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), fr = zt.reduce((o2, e, t) => (o2[t] = e, o2), []), _r = zt.reduce((o2, e, t) => (o2[e.codePointAt(0)] = t, o2), []);
function Er(o2) {
  return o2.reduce((e, t) => (e += fr[t], e), "");
}
function vr2(o2) {
  const e = [];
  for (const t of o2) {
    const s = _r[t.codePointAt(0)];
    if (s === void 0)
      throw new Error(`Non-base256emoji character: ${t}`);
    e.push(s);
  }
  return new Uint8Array(e);
}
const wr = ae$1({ prefix: "🚀", name: "base256emoji", encode: Er, decode: vr2 });
var Ir = Object.freeze({ __proto__: null, base256emoji: wr }), Tr = Mt, kt = 128, Cr = 127, Sr = ~Cr, Pr = Math.pow(2, 31);
function Mt(o2, e, t) {
  e = e || [], t = t || 0;
  for (var s = t; o2 >= Pr; )
    e[t++] = o2 & 255 | kt, o2 /= 128;
  for (; o2 & Sr; )
    e[t++] = o2 & 255 | kt, o2 >>>= 7;
  return e[t] = o2 | 0, Mt.bytes = t - s + 1, e;
}
var Rr = we$1, xr = 128, $t = 127;
function we$1(o2, s) {
  var t = 0, s = s || 0, i2 = 0, r2 = s, n2, a2 = o2.length;
  do {
    if (r2 >= a2)
      throw we$1.bytes = 0, new RangeError("Could not decode varint");
    n2 = o2[r2++], t += i2 < 28 ? (n2 & $t) << i2 : (n2 & $t) * Math.pow(2, i2), i2 += 7;
  } while (n2 >= xr);
  return we$1.bytes = r2 - s, t;
}
var Or = Math.pow(2, 7), Ar = Math.pow(2, 14), Nr = Math.pow(2, 21), Lr = Math.pow(2, 28), zr = Math.pow(2, 35), kr = Math.pow(2, 42), Mr = Math.pow(2, 49), $r = Math.pow(2, 56), Fr = Math.pow(2, 63), Ur = function(o2) {
  return o2 < Or ? 1 : o2 < Ar ? 2 : o2 < Nr ? 3 : o2 < Lr ? 4 : o2 < zr ? 5 : o2 < kr ? 6 : o2 < Mr ? 7 : o2 < $r ? 8 : o2 < Fr ? 9 : 10;
}, Kr = { encode: Tr, decode: Rr, encodingLength: Ur }, Ft = Kr;
const Ut2 = (o2, e, t = 0) => (Ft.encode(o2, e, t), e), Kt = (o2) => Ft.encodingLength(o2), Ie = (o2, e) => {
  const t = e.byteLength, s = Kt(o2), i2 = s + Kt(t), r2 = new Uint8Array(i2 + t);
  return Ut2(o2, r2, 0), Ut2(t, r2, s), r2.set(e, i2), new Br(o2, t, e, r2);
};
class Br {
  constructor(e, t, s, i2) {
    this.code = e, this.size = t, this.digest = s, this.bytes = i2;
  }
}
const Bt = ({ name: o2, code: e, encode: t }) => new Vr(o2, e, t);
class Vr {
  constructor(e, t, s) {
    this.name = e, this.code = t, this.encode = s;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const t = this.encode(e);
      return t instanceof Uint8Array ? Ie(this.code, t) : t.then((s) => Ie(this.code, s));
    } else
      throw Error("Unknown type, must be binary type");
  }
}
const Vt = (o2) => async (e) => new Uint8Array(await crypto.subtle.digest(o2, e)), jr = Bt({ name: "sha2-256", code: 18, encode: Vt("SHA-256") }), qr = Bt({ name: "sha2-512", code: 19, encode: Vt("SHA-512") });
var Gr = Object.freeze({ __proto__: null, sha256: jr, sha512: qr });
const jt = 0, Hr = "identity", qt = Nt, Yr = (o2) => Ie(jt, qt(o2)), Jr = { code: jt, name: Hr, encode: qt, digest: Yr };
var Wr = Object.freeze({ __proto__: null, identity: Jr });
new TextEncoder(), new TextDecoder();
const Gt = { ...Bs, ...js, ...Gs, ...Ys, ...Xs, ...ar, ...lr$1, ...gr, ...br, ...Ir };
({ ...Gr, ...Wr });
function Xr(o2 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(o2) : new Uint8Array(o2);
}
function Ht(o2, e, t, s) {
  return { name: o2, prefix: e, encoder: { name: o2, prefix: e, encode: t }, decoder: { decode: s } };
}
const Yt = Ht("utf8", "u", (o2) => "u" + new TextDecoder("utf8").decode(o2), (o2) => new TextEncoder().encode(o2.substring(1))), Te = Ht("ascii", "a", (o2) => {
  let e = "a";
  for (let t = 0; t < o2.length; t++)
    e += String.fromCharCode(o2[t]);
  return e;
}, (o2) => {
  o2 = o2.substring(1);
  const e = Xr(o2.length);
  for (let t = 0; t < o2.length; t++)
    e[t] = o2.charCodeAt(t);
  return e;
}), Zr = { utf8: Yt, "utf-8": Yt, hex: Gt.base16, latin1: Te, ascii: Te, binary: Te, ...Gt };
function Qr(o2, e = "utf8") {
  const t = Zr[e];
  if (!t)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(o2, "utf8") : t.decoder.decode(`${t.prefix}${o2}`);
}
class Jt {
  constructor(e, t) {
    this.core = e, this.logger = t, this.keychain = /* @__PURE__ */ new Map(), this.name = tt, this.version = it$1, this.initialized = false, this.storagePrefix = O$1, this.init = async () => {
      if (!this.initialized) {
        const s = await this.getKeyChain();
        typeof s < "u" && (this.keychain = s), this.initialized = true;
      }
    }, this.has = (s) => (this.isInitialized(), this.keychain.has(s)), this.set = async (s, i2) => {
      this.isInitialized(), this.keychain.set(s, i2), await this.persist();
    }, this.get = (s) => {
      this.isInitialized();
      const i2 = this.keychain.get(s);
      if (typeof i2 > "u") {
        const { message: r2 } = xe$1("NO_MATCHING_KEY", `${this.name}: ${s}`);
        throw new Error(r2);
      }
      return i2;
    }, this.del = async (s) => {
      this.isInitialized(), this.keychain.delete(s), await this.persist();
    }, this.core = e, this.logger = E$1(t, this.name);
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, cs(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? ls(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = xe$1("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class Wt {
  constructor(e, t, s) {
    this.core = e, this.logger = t, this.name = Qe, this.randomSessionIdentifier = Bu(), this.initialized = false, this.init = async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }, this.hasKeys = (i2) => (this.isInitialized(), this.keychain.has(i2)), this.getClientId = async () => {
      this.isInitialized();
      const i2 = await this.getClientSeed(), r2 = generateKeyPair(i2);
      return encodeIss(r2.publicKey);
    }, this.generateKeyPair = () => {
      this.isInitialized();
      const i2 = _u();
      return this.setPrivateKey(i2.publicKey, i2.privateKey);
    }, this.signJWT = async (i2) => {
      this.isInitialized();
      const r2 = await this.getClientSeed(), n2 = generateKeyPair(r2), a2 = this.randomSessionIdentifier, c = et;
      return await signJWT(a2, i2, c, n2);
    }, this.generateSharedKey = (i2, r2, n2) => {
      this.isInitialized();
      const a2 = this.getPrivateKey(i2), c = Cu(a2, r2);
      return this.setSymKey(c, n2);
    }, this.setSymKey = async (i2, r2) => {
      this.isInitialized();
      const n2 = r2 || Ru(i2);
      return await this.keychain.set(n2, i2), n2;
    }, this.deleteKeyPair = async (i2) => {
      this.isInitialized(), await this.keychain.del(i2);
    }, this.deleteSymKey = async (i2) => {
      this.isInitialized(), await this.keychain.del(i2);
    }, this.encode = async (i2, r2, n2) => {
      this.isInitialized();
      const a2 = so(n2), c = safeJsonStringify(r2);
      if (qu(a2))
        return Tu(c, n2 == null ? void 0 : n2.encoding);
      if (ku(a2)) {
        const m2 = a2.senderPublicKey, b2 = a2.receiverPublicKey;
        i2 = await this.generateSharedKey(m2, b2);
      }
      const h2 = this.getSymKey(i2), { type: d2, senderPublicKey: g3 } = a2;
      return Pu({ type: d2, symKey: h2, message: c, senderPublicKey: g3, encoding: n2 == null ? void 0 : n2.encoding });
    }, this.decode = async (i2, r2, n2) => {
      this.isInitialized();
      const a2 = Uu(r2, n2);
      if (qu(a2)) {
        const c = Fu(r2, n2 == null ? void 0 : n2.encoding);
        return safeJsonParse(c);
      }
      if (ku(a2)) {
        const c = a2.receiverPublicKey, h2 = a2.senderPublicKey;
        i2 = await this.generateSharedKey(c, h2);
      }
      try {
        const c = this.getSymKey(i2), h2 = Du({ symKey: c, encoded: r2, encoding: n2 == null ? void 0 : n2.encoding });
        return safeJsonParse(h2);
      } catch (c) {
        this.logger.error(`Failed to decode message from topic: '${i2}', clientId: '${await this.getClientId()}'`), this.logger.error(c);
      }
    }, this.getPayloadType = (i2, r2 = tn$1) => {
      const n2 = Wr$1({ encoded: i2, encoding: r2 });
      return Ze$1(n2.type);
    }, this.getPayloadSenderPublicKey = (i2, r2 = tn$1) => {
      const n2 = Wr$1({ encoded: i2, encoding: r2 });
      return n2.senderPublicKey ? toString(n2.senderPublicKey, Lt$2) : void 0;
    }, this.core = e, this.logger = E$1(t, this.name), this.keychain = s || new Jt(this.core, this.logger);
  }
  get context() {
    return y$3(this.logger);
  }
  async setPrivateKey(e, t) {
    return await this.keychain.set(e, t), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(_e$1);
    } catch {
      e = Bu(), await this.keychain.set(_e$1, e);
    }
    return Qr(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = xe$1("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class Xt extends a {
  constructor(e, t) {
    super(e, t), this.logger = e, this.core = t, this.messages = /* @__PURE__ */ new Map(), this.name = st$1, this.version = rt$1, this.initialized = false, this.storagePrefix = O$1, this.init = async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const s = await this.getRelayerMessages();
          typeof s < "u" && (this.messages = s), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (s) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(s);
        } finally {
          this.initialized = true;
        }
      }
    }, this.set = async (s, i2) => {
      this.isInitialized();
      const r2 = Ou(i2);
      let n2 = this.messages.get(s);
      return typeof n2 > "u" && (n2 = {}), typeof n2[r2] < "u" || (n2[r2] = i2, this.messages.set(s, n2), await this.persist()), r2;
    }, this.get = (s) => {
      this.isInitialized();
      let i2 = this.messages.get(s);
      return typeof i2 > "u" && (i2 = {}), i2;
    }, this.has = (s, i2) => {
      this.isInitialized();
      const r2 = this.get(s), n2 = Ou(i2);
      return typeof r2[n2] < "u";
    }, this.del = async (s) => {
      this.isInitialized(), this.messages.delete(s), await this.persist();
    }, this.logger = E$1(e, this.name), this.core = t;
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, cs(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? ls(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = xe$1("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class en extends g$1 {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, this.events = new eventsExports.EventEmitter(), this.name = ot$1, this.queue = /* @__PURE__ */ new Map(), this.publishTimeout = cjs.toMiliseconds(cjs.ONE_MINUTE), this.failedPublishTimeout = cjs.toMiliseconds(cjs.ONE_SECOND), this.needsTransportRestart = false, this.publish = async (s, i2, r2) => {
      var n2;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: s, message: i2, opts: r2 } });
      const a2 = (r2 == null ? void 0 : r2.ttl) || nt$1, c = zu(r2), h2 = (r2 == null ? void 0 : r2.prompt) || false, d2 = (r2 == null ? void 0 : r2.tag) || 0, g3 = (r2 == null ? void 0 : r2.id) || getBigIntRpcId().toString(), m2 = { topic: s, message: i2, opts: { ttl: a2, relay: c, prompt: h2, tag: d2, id: g3, attestation: r2 == null ? void 0 : r2.attestation } }, b2 = `Failed to publish payload, please try again. id:${g3} tag:${d2}`, l = Date.now();
      let p3, E2 = 1;
      try {
        for (; p3 === void 0; ) {
          if (Date.now() - l > this.publishTimeout)
            throw new Error(b2);
          this.logger.trace({ id: g3, attempts: E2 }, `publisher.publish - attempt ${E2}`), p3 = await await ms$1(this.rpcPublish(s, i2, a2, c, h2, d2, g3, r2 == null ? void 0 : r2.attestation).catch((D2) => this.logger.warn(D2)), this.publishTimeout, b2), E2++, p3 || await new Promise((D2) => setTimeout(D2, this.failedPublishTimeout));
        }
        this.relayer.events.emit(w.publish, m2), this.logger.debug("Successfully Published Payload"), this.logger.trace({ type: "method", method: "publish", params: { id: g3, topic: s, message: i2, opts: r2 } });
      } catch (D2) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(D2), (n2 = r2 == null ? void 0 : r2.internal) != null && n2.throwOnFailedPublish)
          throw D2;
        this.queue.set(g3, m2);
      }
    }, this.on = (s, i2) => {
      this.events.on(s, i2);
    }, this.once = (s, i2) => {
      this.events.once(s, i2);
    }, this.off = (s, i2) => {
      this.events.off(s, i2);
    }, this.removeListener = (s, i2) => {
      this.events.removeListener(s, i2);
    }, this.relayer = e, this.logger = E$1(t, this.name), this.registerEventListeners();
  }
  get context() {
    return y$3(this.logger);
  }
  rpcPublish(e, t, s, i2, r2, n2, a2, c) {
    var h2, d2, g3, m2;
    const b2 = { method: ju(i2.protocol).publish, params: { topic: e, message: t, ttl: s, prompt: r2, tag: n2, attestation: c }, id: a2 };
    return Pe((h2 = b2.params) == null ? void 0 : h2.prompt) && ((d2 = b2.params) == null || delete d2.prompt), Pe((g3 = b2.params) == null ? void 0 : g3.tag) && ((m2 = b2.params) == null || delete m2.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: b2 }), this.relayer.request(b2);
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e) => {
      const { topic: t, message: s, opts: i2 } = e;
      await this.publish(t, s, i2);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = false, this.relayer.events.emit(w.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(w.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
}
class tn {
  constructor() {
    this.map = /* @__PURE__ */ new Map(), this.set = (e, t) => {
      const s = this.get(e);
      this.exists(e, t) || this.map.set(e, [...s, t]);
    }, this.get = (e) => this.map.get(e) || [], this.exists = (e, t) => this.get(e).includes(t), this.delete = (e, t) => {
      if (typeof t > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e))
        return;
      const s = this.get(e);
      if (!this.exists(e, t))
        return;
      const i2 = s.filter((r2) => r2 !== t);
      if (!i2.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, i2);
    }, this.clear = () => {
      this.map.clear();
    };
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var sn = Object.defineProperty, rn = Object.defineProperties, nn = Object.getOwnPropertyDescriptors, Zt = Object.getOwnPropertySymbols, on = Object.prototype.hasOwnProperty, an = Object.prototype.propertyIsEnumerable, Qt = (o2, e, t) => e in o2 ? sn(o2, e, { enumerable: true, configurable: true, writable: true, value: t }) : o2[e] = t, ee = (o2, e) => {
  for (var t in e || (e = {}))
    on.call(e, t) && Qt(o2, t, e[t]);
  if (Zt)
    for (var t of Zt(e))
      an.call(e, t) && Qt(o2, t, e[t]);
  return o2;
}, Ce$1 = (o2, e) => rn(o2, nn(e));
class ei extends d {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, this.subscriptions = /* @__PURE__ */ new Map(), this.topicMap = new tn(), this.events = new eventsExports.EventEmitter(), this.name = pt$1, this.version = yt$1, this.pending = /* @__PURE__ */ new Map(), this.cached = [], this.initialized = false, this.pendingSubscriptionWatchLabel = "pending_sub_watch_label", this.pollingInterval = 20, this.storagePrefix = O$1, this.subscribeTimeout = cjs.toMiliseconds(cjs.ONE_MINUTE), this.restartInProgress = false, this.batchSubscribeTopicsLimit = 500, this.pendingBatchMessages = [], this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), this.clientId = await this.relayer.core.crypto.getClientId(), await this.restore()), this.initialized = true;
    }, this.subscribe = async (s, i2) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s, opts: i2 } });
      try {
        const r2 = zu(i2), n2 = { topic: s, relay: r2, transportType: i2 == null ? void 0 : i2.transportType };
        this.pending.set(s, n2);
        const a2 = await this.rpcSubscribe(s, r2, i2 == null ? void 0 : i2.transportType);
        return typeof a2 == "string" && (this.onSubscribe(a2, n2), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s, opts: i2 } })), a2;
      } catch (r2) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(r2), r2;
      }
    }, this.unsubscribe = async (s, i2) => {
      await this.restartToComplete(), this.isInitialized(), typeof (i2 == null ? void 0 : i2.id) < "u" ? await this.unsubscribeById(s, i2.id, i2) : await this.unsubscribeByTopic(s, i2);
    }, this.isSubscribed = async (s) => {
      if (this.topics.includes(s))
        return true;
      const i2 = `${this.pendingSubscriptionWatchLabel}_${s}`;
      return await new Promise((r2, n2) => {
        const a2 = new cjs.Watch();
        a2.start(i2);
        const c = setInterval(() => {
          !this.pending.has(s) && this.topics.includes(s) && (clearInterval(c), a2.stop(i2), r2(true)), a2.elapsed(i2) >= Dt && (clearInterval(c), a2.stop(i2), n2(new Error("Subscription resolution timeout")));
        }, this.pollingInterval);
      }).catch(() => false);
    }, this.on = (s, i2) => {
      this.events.on(s, i2);
    }, this.once = (s, i2) => {
      this.events.once(s, i2);
    }, this.off = (s, i2) => {
      this.events.off(s, i2);
    }, this.removeListener = (s, i2) => {
      this.events.removeListener(s, i2);
    }, this.start = async () => {
      await this.onConnect();
    }, this.stop = async () => {
      await this.onDisconnect();
    }, this.restart = async () => {
      this.restartInProgress = true, await this.restore(), await this.reset(), this.restartInProgress = false;
    }, this.relayer = e, this.logger = E$1(t, this.name), this.clientId = "";
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  hasSubscription(e, t) {
    let s = false;
    try {
      s = this.getSubscription(e).topic === t;
    } catch {
    }
    return s;
  }
  onEnable() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e, t) {
    const s = this.topicMap.get(e);
    await Promise.all(s.map(async (i2) => await this.unsubscribeById(e, i2, t)));
  }
  async unsubscribeById(e, t, s) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: s } });
    try {
      const i2 = zu(s);
      await this.rpcUnsubscribe(e, t, i2);
      const r2 = er$1("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, t, r2), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: s } });
    } catch (i2) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(i2), i2;
    }
  }
  async rpcSubscribe(e, t, s = F$1.relay) {
    s === F$1.relay && await this.restartToComplete();
    const i2 = { method: ju(t.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i2 });
    try {
      const r2 = Ou(e + this.clientId);
      return s === F$1.link_mode ? (setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(i2).catch((n2) => this.logger.warn(n2));
      }, cjs.toMiliseconds(cjs.ONE_SECOND)), r2) : await await ms$1(this.relayer.request(i2).catch((n2) => this.logger.warn(n2)), this.subscribeTimeout) ? r2 : null;
    } catch {
      this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(w.connection_stalled);
    }
    return null;
  }
  async rpcBatchSubscribe(e) {
    if (!e.length)
      return;
    const t = e[0].relay, s = { method: ju(t.protocol).batchSubscribe, params: { topics: e.map((i2) => i2.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s });
    try {
      return await await ms$1(this.relayer.request(s).catch((i2) => this.logger.warn(i2)), this.subscribeTimeout);
    } catch {
      this.relayer.events.emit(w.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e) {
    if (!e.length)
      return;
    const t = e[0].relay, s = { method: ju(t.protocol).batchFetchMessages, params: { topics: e.map((r2) => r2.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s });
    let i2;
    try {
      i2 = await await ms$1(this.relayer.request(s).catch((r2) => this.logger.warn(r2)), this.subscribeTimeout);
    } catch {
      this.relayer.events.emit(w.connection_stalled);
    }
    return i2;
  }
  rpcUnsubscribe(e, t, s) {
    const i2 = { method: ju(s.protocol).unsubscribe, params: { topic: e, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i2 }), this.relayer.request(i2);
  }
  onSubscribe(e, t) {
    this.setSubscription(e, Ce$1(ee({}, t), { id: e })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((t) => {
      this.setSubscription(t.id, ee({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e, t, s) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, s), await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, t) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: t }), this.addSubscription(e, t);
  }
  addSubscription(e, t) {
    this.subscriptions.set(e, ee({}, t)), this.topicMap.set(t.topic, e), this.events.emit(A.created, t);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const t = this.subscriptions.get(e);
    if (!t) {
      const { message: s } = xe$1("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s);
    }
    return t;
  }
  deleteSubscription(e, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: t });
    const s = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(s.topic, e), this.events.emit(A.deleted, Ce$1(ee({}, s), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(A.sync);
  }
  async reset() {
    if (this.cached.length) {
      const e = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let t = 0; t < e; t++) {
        const s = this.cached.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchFetchMessages(s), await this.batchSubscribe(s);
      }
    }
    this.events.emit(A.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length)
        return;
      if (this.subscriptions.size) {
        const { message: t } = xe$1("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    if (!e.length)
      return;
    const t = await this.rpcBatchSubscribe(e);
    Nr$1(t) && this.onBatchSubscribe(t.map((s, i2) => Ce$1(ee({}, e[i2]), { id: s })));
  }
  async batchFetchMessages(e) {
    if (!e.length)
      return;
    this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
    const t = await this.rpcBatchFetchMessages(e);
    t && t.messages && (this.pendingBatchMessages = this.pendingBatchMessages.concat(t.messages));
  }
  async onConnect() {
    await this.restart(), this.onEnable();
  }
  onDisconnect() {
    this.onDisable();
  }
  async checkPending() {
    if (!this.initialized || !this.relayer.connected)
      return;
    const e = [];
    this.pending.forEach((t) => {
      e.push(t);
    }), await this.batchSubscribe(e), this.pendingBatchMessages.length && (await this.relayer.handleBatchMessageEvents(this.pendingBatchMessages), this.pendingBatchMessages = []);
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r.pulse, async () => {
      await this.checkPending();
    }), this.events.on(A.created, async (e) => {
      const t = A.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), await this.persist();
    }), this.events.on(A.deleted, async (e) => {
      const t = A.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), await this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = xe$1("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete() {
    !this.relayer.connected && !this.relayer.connecting && await this.relayer.transportOpen(), this.restartInProgress && await new Promise((e) => {
      const t = setInterval(() => {
        this.restartInProgress || (clearInterval(t), e());
      }, this.pollingInterval);
    });
  }
}
var cn = Object.defineProperty, ti = Object.getOwnPropertySymbols, hn = Object.prototype.hasOwnProperty, ln = Object.prototype.propertyIsEnumerable, ii = (o2, e, t) => e in o2 ? cn(o2, e, { enumerable: true, configurable: true, writable: true, value: t }) : o2[e] = t, un = (o2, e) => {
  for (var t in e || (e = {}))
    hn.call(e, t) && ii(o2, t, e[t]);
  if (ti)
    for (var t of ti(e))
      ln.call(e, t) && ii(o2, t, e[t]);
  return o2;
};
class si extends u$1 {
  constructor(e) {
    super(e), this.protocol = "wc", this.version = 2, this.events = new eventsExports.EventEmitter(), this.name = ht$1, this.transportExplicitlyClosed = false, this.initialized = false, this.connectionAttemptInProgress = false, this.connectionStatusPollingInterval = 20, this.staleConnectionErrors = ["socket hang up", "stalled", "interrupted"], this.hasExperiencedNetworkDisruption = false, this.requestsInFlight = /* @__PURE__ */ new Map(), this.heartBeatTimeout = cjs.toMiliseconds(cjs.THIRTY_SECONDS + cjs.ONE_SECOND), this.request = async (t) => {
      var s, i2;
      this.logger.debug("Publishing Request Payload");
      const r2 = t.id || getBigIntRpcId().toString();
      await this.toEstablishConnection();
      try {
        const n2 = this.provider.request(t);
        this.requestsInFlight.set(r2, { promise: n2, request: t }), this.logger.trace({ id: r2, method: t.method, topic: (s = t.params) == null ? void 0 : s.topic }, "relayer.request - attempt to publish...");
        const a2 = await new Promise(async (c, h2) => {
          const d2 = () => {
            h2(new Error(`relayer.request - publish interrupted, id: ${r2}`));
          };
          this.provider.on(T$1.disconnect, d2);
          const g3 = await n2;
          this.provider.off(T$1.disconnect, d2), c(g3);
        });
        return this.logger.trace({ id: r2, method: t.method, topic: (i2 = t.params) == null ? void 0 : i2.topic }, "relayer.request - published"), a2;
      } catch (n2) {
        throw this.logger.debug(`Failed to Publish Request: ${r2}`), n2;
      } finally {
        this.requestsInFlight.delete(r2);
      }
    }, this.resetPingTimeout = () => {
      if (bi$1())
        try {
          clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
            var t, s, i2;
            (i2 = (s = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : s.socket) == null || i2.terminate();
          }, this.heartBeatTimeout);
        } catch (t) {
          this.logger.warn(t);
        }
    }, this.onPayloadHandler = (t) => {
      this.onProviderPayload(t), this.resetPingTimeout();
    }, this.onConnectHandler = () => {
      this.logger.trace("relayer connected"), this.startPingTimeout(), this.events.emit(w.connect);
    }, this.onDisconnectHandler = () => {
      this.logger.trace("relayer disconnected"), this.onProviderDisconnect();
    }, this.onProviderErrorHandler = (t) => {
      this.logger.error(t), this.events.emit(w.error, t), this.logger.info("Fatal socket error received, closing transport"), this.transportClose();
    }, this.registerProviderListeners = () => {
      this.provider.on(T$1.payload, this.onPayloadHandler), this.provider.on(T$1.connect, this.onConnectHandler), this.provider.on(T$1.disconnect, this.onDisconnectHandler), this.provider.on(T$1.error, this.onProviderErrorHandler);
    }, this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? E$1(e.logger, this.name) : Mg(k({ level: e.logger || ct$1 })), this.messages = new Xt(this.logger, e.core), this.subscriber = new ei(this, this.logger), this.publisher = new en(this, this.logger), this.relayUrl = (e == null ? void 0 : e.relayUrl) || Ee, this.projectId = e.projectId, this.bundleId = ns(), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = true, this.subscriber.cached.length > 0)
      try {
        await this.transportOpen();
      } catch (e) {
        this.logger.warn(e);
      }
  }
  get context() {
    return y$3(this.logger);
  }
  get connected() {
    var e, t, s;
    return ((s = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : s.readyState) === 1;
  }
  get connecting() {
    var e, t, s;
    return ((s = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : s.readyState) === 0;
  }
  async publish(e, t, s) {
    this.isInitialized(), await this.publisher.publish(e, t, s), await this.recordMessageEvent({ topic: e, message: t, publishedAt: Date.now(), transportType: F$1.relay });
  }
  async subscribe(e, t) {
    var s;
    this.isInitialized(), (t == null ? void 0 : t.transportType) === "relay" && await this.toEstablishConnection();
    let i2 = ((s = this.subscriber.topicMap.get(e)) == null ? void 0 : s[0]) || "", r2;
    const n2 = (a2) => {
      a2.topic === e && (this.subscriber.off(A.created, n2), r2());
    };
    return await Promise.all([new Promise((a2) => {
      r2 = a2, this.subscriber.on(A.created, n2);
    }), new Promise(async (a2) => {
      i2 = await this.subscriber.subscribe(e, t) || i2, a2();
    })]), i2;
  }
  async unsubscribe(e, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, t);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async transportDisconnect() {
    if (!this.hasExperiencedNetworkDisruption && this.connected && this.requestsInFlight.size > 0)
      try {
        await Promise.all(Array.from(this.requestsInFlight.values()).map((e) => e.promise));
      } catch (e) {
        this.logger.warn(e);
      }
    this.hasExperiencedNetworkDisruption || this.connected ? await ms$1(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, await this.transportDisconnect();
  }
  async transportOpen(e) {
    await this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, await this.transportDisconnect()), await this.createProvider(), this.connectionAttemptInProgress = true, this.transportExplicitlyClosed = false;
    try {
      await new Promise(async (t, s) => {
        const i2 = () => {
          this.provider.off(T$1.disconnect, i2), s(new Error("Connection interrupted while trying to subscribe"));
        };
        this.provider.on(T$1.disconnect, i2), await ms$1(this.provider.connect(), cjs.toMiliseconds(cjs.ONE_MINUTE), `Socket stalled when trying to connect to ${this.relayUrl}`).catch((r2) => {
          s(r2);
        }).finally(() => {
          clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0;
        }), this.subscriber.start().catch((r2) => {
          this.logger.error(r2), this.onDisconnectHandler();
        }), this.hasExperiencedNetworkDisruption = false, t();
      });
    } catch (t) {
      this.logger.error(t);
      const s = t;
      if (this.hasExperiencedNetworkDisruption = true, !this.isConnectionStalled(s.message))
        throw t;
    } finally {
      this.connectionAttemptInProgress = false;
    }
  }
  async restartTransport(e) {
    this.connectionAttemptInProgress || (this.relayUrl = e || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Bh())
      throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e) {
    if ((e == null ? void 0 : e.length) === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t = e.sort((s, i2) => s.publishedAt - i2.publishedAt);
    this.logger.trace(`Batch of ${t.length} message events sorted`);
    for (const s of t)
      try {
        await this.onMessageEvent(s);
      } catch (i2) {
        this.logger.warn(i2);
      }
    this.logger.trace(`Batch of ${t.length} message events processed`);
  }
  async onLinkMessageEvent(e, t) {
    const { topic: s } = e;
    if (!t.sessionExists) {
      const i2 = ws$1(cjs.FIVE_MINUTES), r2 = { topic: s, expiry: i2, relay: { protocol: "irn" }, active: false };
      await this.core.pairing.pairings.set(s, r2);
    }
    this.events.emit(w.message, e), await this.recordMessageEvent(e);
  }
  startPingTimeout() {
    var e, t, s, i2, r2;
    if (bi$1())
      try {
        (t = (e = this.provider) == null ? void 0 : e.connection) != null && t.socket && ((r2 = (i2 = (s = this.provider) == null ? void 0 : s.connection) == null ? void 0 : i2.socket) == null || r2.once("ping", () => {
          this.resetPingTimeout();
        })), this.resetPingTimeout();
      } catch (n2) {
        this.logger.warn(n2);
      }
  }
  isConnectionStalled(e) {
    return this.staleConnectionErrors.some((t) => e.includes(t));
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new o(new f(ss({ sdkVersion: oe$1, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: true, bundleId: this.bundleId }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e) {
    const { topic: t, message: s } = e;
    await this.messages.set(t, s);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: t, message: s } = e;
    if (!s || s.length === 0)
      return this.logger.debug(`Ignoring invalid/empty message: ${s}`), true;
    if (!await this.subscriber.isSubscribed(t))
      return this.logger.debug(`Ignoring message for non-subscribed topic ${t}`), true;
    const i2 = this.messages.has(t, s);
    return i2 && this.logger.debug(`Ignoring duplicate message: ${s}`), i2;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), isJsonRpcRequest(e)) {
      if (!e.method.endsWith(lt$1))
        return;
      const t = e.params, { topic: s, message: i2, publishedAt: r2, attestation: n2 } = t.data, a2 = { topic: s, message: i2, publishedAt: r2, transportType: F$1.relay, attestation: n2 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(un({ type: "event", event: t.id }, a2)), this.events.emit(t.id, a2), await this.acknowledgePayload(e), await this.onMessageEvent(a2);
    } else
      isJsonRpcResponse(e) && this.events.emit(w.message_ack, e);
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (this.events.emit(w.message, e), await this.recordMessageEvent(e));
  }
  async acknowledgePayload(e) {
    const t = formatJsonRpcResult(e.id, true);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(T$1.payload, this.onPayloadHandler), this.provider.off(T$1.connect, this.onConnectHandler), this.provider.off(T$1.disconnect, this.onDisconnectHandler), this.provider.off(T$1.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e = await Bh();
    Ch(async (t) => {
      e !== t && (e = t, t ? await this.restartTransport().catch((s) => this.logger.error(s)) : (this.hasExperiencedNetworkDisruption = true, await this.transportDisconnect(), this.transportExplicitlyClosed = false));
    });
  }
  async onProviderDisconnect() {
    await this.subscriber.stop(), this.requestsInFlight.clear(), clearTimeout(this.pingTimeout), this.events.emit(w.disconnect), this.connectionAttemptInProgress = false, !this.transportExplicitlyClosed && (this.reconnectTimeout || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e) => this.logger.error(e));
    }, cjs.toMiliseconds(ut$1))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = xe$1("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    await this.confirmOnlineStateOrThrow(), !this.connected && (this.connectionAttemptInProgress && await new Promise((e) => {
      const t = setInterval(() => {
        this.connected && (clearInterval(t), e());
      }, this.connectionStatusPollingInterval);
    }), await this.transportOpen());
  }
}
var dn = Object.defineProperty, ri = Object.getOwnPropertySymbols, gn = Object.prototype.hasOwnProperty, pn = Object.prototype.propertyIsEnumerable, ni = (o2, e, t) => e in o2 ? dn(o2, e, { enumerable: true, configurable: true, writable: true, value: t }) : o2[e] = t, oi = (o2, e) => {
  for (var t in e || (e = {}))
    gn.call(e, t) && ni(o2, t, e[t]);
  if (ri)
    for (var t of ri(e))
      pn.call(e, t) && ni(o2, t, e[t]);
  return o2;
};
class ai extends p$1 {
  constructor(e, t, s, i2 = O$1, r2 = void 0) {
    super(e, t, s, i2), this.core = e, this.logger = t, this.name = s, this.map = /* @__PURE__ */ new Map(), this.version = dt$1, this.cached = [], this.initialized = false, this.storagePrefix = O$1, this.recentlyDeleted = [], this.recentlyDeletedLimit = 200, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((n2) => {
        this.getKey && n2 !== null && !Pe(n2) ? this.map.set(this.getKey(n2), n2) : lh(n2) ? this.map.set(n2.id, n2) : dh(n2) && this.map.set(n2.topic, n2);
      }), this.cached = [], this.initialized = true);
    }, this.set = async (n2, a2) => {
      this.isInitialized(), this.map.has(n2) ? await this.update(n2, a2) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: n2, value: a2 }), this.map.set(n2, a2), await this.persist());
    }, this.get = (n2) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: n2 }), this.getData(n2)), this.getAll = (n2) => (this.isInitialized(), n2 ? this.values.filter((a2) => Object.keys(n2).every((c) => bs$1(a2[c], n2[c]))) : this.values), this.update = async (n2, a2) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: n2, update: a2 });
      const c = oi(oi({}, this.getData(n2)), a2);
      this.map.set(n2, c), await this.persist();
    }, this.delete = async (n2, a2) => {
      this.isInitialized(), this.map.has(n2) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: n2, reason: a2 }), this.map.delete(n2), this.addToRecentlyDeleted(n2), await this.persist());
    }, this.logger = E$1(t, this.name), this.storagePrefix = i2, this.getKey = r2;
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e) {
    this.recentlyDeleted.push(e), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const t = this.map.get(e);
    if (!t) {
      if (this.recentlyDeleted.includes(e)) {
        const { message: i2 } = xe$1("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
        throw this.logger.error(i2), new Error(i2);
      }
      const { message: s } = xe$1("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(s), new Error(s);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length)
        return;
      if (this.map.size) {
        const { message: t } = xe$1("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = xe$1("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class ci {
  constructor(e, t) {
    this.core = e, this.logger = t, this.name = mt, this.version = bt, this.events = new Jg(), this.initialized = false, this.storagePrefix = O$1, this.ignoredPayloadTypes = [pr$2], this.registeredMethods = [], this.init = async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }, this.register = ({ methods: s }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...s])];
    }, this.create = async (s) => {
      this.isInitialized();
      const i2 = Bu(), r2 = await this.core.crypto.setSymKey(i2), n2 = ws$1(cjs.FIVE_MINUTES), a2 = { protocol: at$1 }, c = { topic: r2, expiry: n2, relay: a2, active: false, methods: s == null ? void 0 : s.methods }, h2 = $u({ protocol: this.core.protocol, version: this.core.version, topic: r2, symKey: i2, relay: a2, expiryTimestamp: n2, methods: s == null ? void 0 : s.methods });
      return this.events.emit(q$1.create, c), this.core.expirer.set(r2, n2), await this.pairings.set(r2, c), await this.core.relayer.subscribe(r2, { transportType: s == null ? void 0 : s.transportType }), { topic: r2, uri: h2 };
    }, this.pair = async (s) => {
      this.isInitialized();
      const i2 = this.core.eventClient.createEvent({ properties: { topic: s == null ? void 0 : s.uri, trace: [z$1.pairing_started] } });
      this.isValidPair(s, i2);
      const { topic: r2, symKey: n2, relay: a2, expiryTimestamp: c, methods: h2 } = Xu(s.uri);
      i2.props.properties.topic = r2, i2.addTrace(z$1.pairing_uri_validation_success), i2.addTrace(z$1.pairing_uri_not_expired);
      let d2;
      if (this.pairings.keys.includes(r2)) {
        if (d2 = this.pairings.get(r2), i2.addTrace(z$1.existing_pairing), d2.active)
          throw i2.setError(M$1.active_pairing_already_exists), new Error(`Pairing already exists: ${r2}. Please try again with a new connection URI.`);
        i2.addTrace(z$1.pairing_not_expired);
      }
      const g3 = c || ws$1(cjs.FIVE_MINUTES), m2 = { topic: r2, relay: a2, expiry: g3, active: false, methods: h2 };
      this.core.expirer.set(r2, g3), await this.pairings.set(r2, m2), i2.addTrace(z$1.store_new_pairing), s.activatePairing && await this.activate({ topic: r2 }), this.events.emit(q$1.create, m2), i2.addTrace(z$1.emit_inactive_pairing), this.core.crypto.keychain.has(r2) || await this.core.crypto.setSymKey(n2, r2), i2.addTrace(z$1.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        i2.setError(M$1.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(r2, { relay: a2 });
      } catch (b2) {
        throw i2.setError(M$1.subscribe_pairing_topic_failure), b2;
      }
      return i2.addTrace(z$1.subscribe_pairing_topic_success), m2;
    }, this.activate = async ({ topic: s }) => {
      this.isInitialized();
      const i2 = ws$1(cjs.THIRTY_DAYS);
      this.core.expirer.set(s, i2), await this.pairings.update(s, { active: true, expiry: i2 });
    }, this.ping = async (s) => {
      this.isInitialized(), await this.isValidPing(s);
      const { topic: i2 } = s;
      if (this.pairings.keys.includes(i2)) {
        const r2 = await this.sendRequest(i2, "wc_pairingPing", {}), { done: n2, resolve: a2, reject: c } = gs();
        this.events.once(Ms$1("pairing_ping", r2), ({ error: h2 }) => {
          h2 ? c(h2) : a2();
        }), await n2();
      }
    }, this.updateExpiry = async ({ topic: s, expiry: i2 }) => {
      this.isInitialized(), await this.pairings.update(s, { expiry: i2 });
    }, this.updateMetadata = async ({ topic: s, metadata: i2 }) => {
      this.isInitialized(), await this.pairings.update(s, { peerMetadata: i2 });
    }, this.getPairings = () => (this.isInitialized(), this.pairings.values), this.disconnect = async (s) => {
      this.isInitialized(), await this.isValidDisconnect(s);
      const { topic: i2 } = s;
      this.pairings.keys.includes(i2) && (await this.sendRequest(i2, "wc_pairingDelete", er$1("USER_DISCONNECTED")), await this.deletePairing(i2));
    }, this.formatUriFromPairing = (s) => {
      this.isInitialized();
      const { topic: i2, relay: r2, expiry: n2, methods: a2 } = s, c = this.core.crypto.keychain.get(i2);
      return $u({ protocol: this.core.protocol, version: this.core.version, topic: i2, symKey: c, relay: r2, expiryTimestamp: n2, methods: a2 });
    }, this.sendRequest = async (s, i2, r2) => {
      const n2 = formatJsonRpcRequest(i2, r2), a2 = await this.core.crypto.encode(s, n2), c = j$1[i2].req;
      return this.core.history.set(s, n2), this.core.relayer.publish(s, a2, c), n2.id;
    }, this.sendResult = async (s, i2, r2) => {
      const n2 = formatJsonRpcResult(s, r2), a2 = await this.core.crypto.encode(i2, n2), c = await this.core.history.get(i2, s), h2 = j$1[c.request.method].res;
      await this.core.relayer.publish(i2, a2, h2), await this.core.history.resolve(n2);
    }, this.sendError = async (s, i2, r2) => {
      const n2 = formatJsonRpcError(s, r2), a2 = await this.core.crypto.encode(i2, n2), c = await this.core.history.get(i2, s), h2 = j$1[c.request.method] ? j$1[c.request.method].res : j$1.unregistered_method.res;
      await this.core.relayer.publish(i2, a2, h2), await this.core.history.resolve(n2);
    }, this.deletePairing = async (s, i2) => {
      await this.core.relayer.unsubscribe(s), await Promise.all([this.pairings.delete(s, er$1("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(s), i2 ? Promise.resolve() : this.core.expirer.del(s)]);
    }, this.cleanup = async () => {
      const s = this.pairings.getAll().filter((i2) => xs$1(i2.expiry));
      await Promise.all(s.map((i2) => this.deletePairing(i2.topic)));
    }, this.onRelayEventRequest = (s) => {
      const { topic: i2, payload: r2 } = s;
      switch (r2.method) {
        case "wc_pairingPing":
          return this.onPairingPingRequest(i2, r2);
        case "wc_pairingDelete":
          return this.onPairingDeleteRequest(i2, r2);
        default:
          return this.onUnknownRpcMethodRequest(i2, r2);
      }
    }, this.onRelayEventResponse = async (s) => {
      const { topic: i2, payload: r2 } = s, n2 = (await this.core.history.get(i2, r2.id)).request.method;
      switch (n2) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(i2, r2);
        default:
          return this.onUnknownRpcMethodResponse(n2);
      }
    }, this.onPairingPingRequest = async (s, i2) => {
      const { id: r2 } = i2;
      try {
        this.isValidPing({ topic: s }), await this.sendResult(r2, s, true), this.events.emit(q$1.ping, { id: r2, topic: s });
      } catch (n2) {
        await this.sendError(r2, s, n2), this.logger.error(n2);
      }
    }, this.onPairingPingResponse = (s, i2) => {
      const { id: r2 } = i2;
      setTimeout(() => {
        isJsonRpcResult(i2) ? this.events.emit(Ms$1("pairing_ping", r2), {}) : isJsonRpcError(i2) && this.events.emit(Ms$1("pairing_ping", r2), { error: i2.error });
      }, 500);
    }, this.onPairingDeleteRequest = async (s, i2) => {
      const { id: r2 } = i2;
      try {
        this.isValidDisconnect({ topic: s }), await this.deletePairing(s), this.events.emit(q$1.delete, { id: r2, topic: s });
      } catch (n2) {
        await this.sendError(r2, s, n2), this.logger.error(n2);
      }
    }, this.onUnknownRpcMethodRequest = async (s, i2) => {
      const { id: r2, method: n2 } = i2;
      try {
        if (this.registeredMethods.includes(n2))
          return;
        const a2 = er$1("WC_METHOD_UNSUPPORTED", n2);
        await this.sendError(r2, s, a2), this.logger.error(a2);
      } catch (a2) {
        await this.sendError(r2, s, a2), this.logger.error(a2);
      }
    }, this.onUnknownRpcMethodResponse = (s) => {
      this.registeredMethods.includes(s) || this.logger.error(er$1("WC_METHOD_UNSUPPORTED", s));
    }, this.isValidPair = (s, i2) => {
      var r2;
      if (!Ah(s)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", `pair() params: ${s}`);
        throw i2.setError(M$1.malformed_pairing_uri), new Error(a2);
      }
      if (!ch(s.uri)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", `pair() uri: ${s.uri}`);
        throw i2.setError(M$1.malformed_pairing_uri), new Error(a2);
      }
      const n2 = Xu(s == null ? void 0 : s.uri);
      if (!((r2 = n2 == null ? void 0 : n2.relay) != null && r2.protocol)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw i2.setError(M$1.malformed_pairing_uri), new Error(a2);
      }
      if (!(n2 != null && n2.symKey)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", "pair() uri#symKey");
        throw i2.setError(M$1.malformed_pairing_uri), new Error(a2);
      }
      if (n2 != null && n2.expiryTimestamp && cjs.toMiliseconds(n2 == null ? void 0 : n2.expiryTimestamp) < Date.now()) {
        i2.setError(M$1.pairing_expired);
        const { message: a2 } = xe$1("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a2);
      }
    }, this.isValidPing = async (s) => {
      if (!Ah(s)) {
        const { message: r2 } = xe$1("MISSING_OR_INVALID", `ping() params: ${s}`);
        throw new Error(r2);
      }
      const { topic: i2 } = s;
      await this.isValidPairingTopic(i2);
    }, this.isValidDisconnect = async (s) => {
      if (!Ah(s)) {
        const { message: r2 } = xe$1("MISSING_OR_INVALID", `disconnect() params: ${s}`);
        throw new Error(r2);
      }
      const { topic: i2 } = s;
      await this.isValidPairingTopic(i2);
    }, this.isValidPairingTopic = async (s) => {
      if (!Yt$1(s, false)) {
        const { message: i2 } = xe$1("MISSING_OR_INVALID", `pairing topic should be a string: ${s}`);
        throw new Error(i2);
      }
      if (!this.pairings.keys.includes(s)) {
        const { message: i2 } = xe$1("NO_MATCHING_KEY", `pairing topic doesn't exist: ${s}`);
        throw new Error(i2);
      }
      if (xs$1(this.pairings.get(s).expiry)) {
        await this.deletePairing(s);
        const { message: i2 } = xe$1("EXPIRED", `pairing topic: ${s}`);
        throw new Error(i2);
      }
    }, this.core = e, this.logger = E$1(t, this.name), this.pairings = new ai(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return y$3(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = xe$1("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(w.message, async (e) => {
      const { topic: t, message: s, transportType: i2 } = e;
      if (!this.pairings.keys.includes(t) || i2 === F$1.link_mode || this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(s)))
        return;
      const r2 = await this.core.crypto.decode(t, s);
      try {
        isJsonRpcRequest(r2) ? (this.core.history.set(t, r2), this.onRelayEventRequest({ topic: t, payload: r2 })) : isJsonRpcResponse(r2) && (await this.core.history.resolve(r2), await this.onRelayEventResponse({ topic: t, payload: r2 }), this.core.history.delete(t, r2.id));
      } catch (n2) {
        this.logger.error(n2);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(R$1.expired, async (e) => {
      const { topic: t } = ys$1(e.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, true), this.events.emit(q$1.expire, { topic: t }));
    });
  }
}
class hi extends h {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, this.records = /* @__PURE__ */ new Map(), this.events = new eventsExports.EventEmitter(), this.name = ft, this.version = _t, this.cached = [], this.initialized = false, this.storagePrefix = O$1, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s) => this.records.set(s.id, s)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }, this.set = (s, i2, r2) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: s, request: i2, chainId: r2 }), this.records.has(i2.id))
        return;
      const n2 = { id: i2.id, topic: s, request: { method: i2.method, params: i2.params || null }, chainId: r2, expiry: ws$1(cjs.THIRTY_DAYS) };
      this.records.set(n2.id, n2), this.persist(), this.events.emit(P.created, n2);
    }, this.resolve = async (s) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: s }), !this.records.has(s.id))
        return;
      const i2 = await this.getRecord(s.id);
      typeof i2.response > "u" && (i2.response = isJsonRpcError(s) ? { error: s.error } : { result: s.result }, this.records.set(i2.id, i2), this.persist(), this.events.emit(P.updated, i2));
    }, this.get = async (s, i2) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: s, id: i2 }), await this.getRecord(i2)), this.delete = (s, i2) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: i2 }), this.values.forEach((r2) => {
        if (r2.topic === s) {
          if (typeof i2 < "u" && r2.id !== i2)
            return;
          this.records.delete(r2.id), this.events.emit(P.deleted, r2);
        }
      }), this.persist();
    }, this.exists = async (s, i2) => (this.isInitialized(), this.records.has(i2) ? (await this.getRecord(i2)).topic === s : false), this.on = (s, i2) => {
      this.events.on(s, i2);
    }, this.once = (s, i2) => {
      this.events.once(s, i2);
    }, this.off = (s, i2) => {
      this.events.off(s, i2);
    }, this.removeListener = (s, i2) => {
      this.events.removeListener(s, i2);
    }, this.logger = E$1(t, this.name);
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u")
        return;
      const s = { topic: t.topic, request: formatJsonRpcRequest(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e.push(s);
    }), e;
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const t = this.records.get(e);
    if (!t) {
      const { message: s } = xe$1("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(P.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length)
        return;
      if (this.records.size) {
        const { message: t } = xe$1("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(P.created, (e) => {
      const t = P.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(P.updated, (e) => {
      const t = P.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(P.deleted, (e) => {
      const t = P.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.core.heartbeat.on(r.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e = false;
      this.records.forEach((t) => {
        cjs.toMiliseconds(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(P.deleted, t, false), e = true);
      }), e && this.persist();
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = xe$1("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class li extends x$2 {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, this.expirations = /* @__PURE__ */ new Map(), this.events = new eventsExports.EventEmitter(), this.name = Et, this.version = vt, this.cached = [], this.initialized = false, this.storagePrefix = O$1, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s) => this.expirations.set(s.target, s)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }, this.has = (s) => {
      try {
        const i2 = this.formatTarget(s);
        return typeof this.getExpiration(i2) < "u";
      } catch {
        return false;
      }
    }, this.set = (s, i2) => {
      this.isInitialized();
      const r2 = this.formatTarget(s), n2 = { target: r2, expiry: i2 };
      this.expirations.set(r2, n2), this.checkExpiry(r2, n2), this.events.emit(R$1.created, { target: r2, expiration: n2 });
    }, this.get = (s) => {
      this.isInitialized();
      const i2 = this.formatTarget(s);
      return this.getExpiration(i2);
    }, this.del = (s) => {
      if (this.isInitialized(), this.has(s)) {
        const i2 = this.formatTarget(s), r2 = this.getExpiration(i2);
        this.expirations.delete(i2), this.events.emit(R$1.deleted, { target: i2, expiration: r2 });
      }
    }, this.on = (s, i2) => {
      this.events.on(s, i2);
    }, this.once = (s, i2) => {
      this.events.once(s, i2);
    }, this.off = (s, i2) => {
      this.events.off(s, i2);
    }, this.removeListener = (s, i2) => {
      this.events.removeListener(s, i2);
    }, this.logger = E$1(t, this.name);
  }
  get context() {
    return y$3(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string")
      return As$1(e);
    if (typeof e == "number")
      return bs(e);
    const { message: t } = xe$1("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(t);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(R$1.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length)
        return;
      if (this.expirations.size) {
        const { message: t } = xe$1("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
    }
  }
  getExpiration(e) {
    const t = this.expirations.get(e);
    if (!t) {
      const { message: s } = xe$1("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.warn(s), new Error(s);
    }
    return t;
  }
  checkExpiry(e, t) {
    const { expiry: s } = t;
    cjs.toMiliseconds(s) - Date.now() <= 0 && this.expire(e, t);
  }
  expire(e, t) {
    this.expirations.delete(e), this.events.emit(R$1.expired, { target: e, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, t) => this.checkExpiry(t, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(r.pulse, () => this.checkExpirations()), this.events.on(R$1.created, (e) => {
      const t = R$1.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(R$1.expired, (e) => {
      const t = R$1.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(R$1.deleted, (e) => {
      const t = R$1.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = xe$1("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var y$1 = {};
Object.defineProperty(y$1, "__esModule", { value: true }), y$1.getLocalStorage = y$1.getLocalStorageOrThrow = y$1.getCrypto = y$1.getCryptoOrThrow = y$1.getLocation = y$1.getLocationOrThrow = y$1.getNavigator = y$1.getNavigatorOrThrow = ui = y$1.getDocument = y$1.getDocumentOrThrow = y$1.getFromWindowOrThrow = y$1.getFromWindow = void 0;
function U$1(o2) {
  let e;
  return typeof window < "u" && typeof window[o2] < "u" && (e = window[o2]), e;
}
y$1.getFromWindow = U$1;
function G(o2) {
  const e = U$1(o2);
  if (!e)
    throw new Error(`${o2} is not defined in Window`);
  return e;
}
y$1.getFromWindowOrThrow = G;
function yn() {
  return G("document");
}
y$1.getDocumentOrThrow = yn;
function Dn() {
  return U$1("document");
}
var ui = y$1.getDocument = Dn;
function mn() {
  return G("navigator");
}
y$1.getNavigatorOrThrow = mn;
function bn() {
  return U$1("navigator");
}
y$1.getNavigator = bn;
function fn() {
  return G("location");
}
y$1.getLocationOrThrow = fn;
function _n$1() {
  return U$1("location");
}
y$1.getLocation = _n$1;
function En() {
  return G("crypto");
}
y$1.getCryptoOrThrow = En;
function vn() {
  return U$1("crypto");
}
y$1.getCrypto = vn;
function wn() {
  return G("localStorage");
}
y$1.getLocalStorageOrThrow = wn;
function In() {
  return U$1("localStorage");
}
y$1.getLocalStorage = In;
class di extends y$2 {
  constructor(e, t, s) {
    super(e, t, s), this.core = e, this.logger = t, this.store = s, this.name = wt, this.verifyUrlV3 = Tt$1, this.storagePrefix = O$1, this.version = fe, this.init = async () => {
      var i2;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && cjs.toMiliseconds((i2 = this.publicKey) == null ? void 0 : i2.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }, this.register = async (i2) => {
      if (!gr$1() || this.isDevEnv)
        return;
      const r2 = window.location.origin, { id: n2, decryptedId: a2 } = i2, c = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${r2}&id=${n2}&decryptedId=${a2}`;
      try {
        const h2 = ui(), d2 = this.startAbortTimer(cjs.ONE_SECOND * 5), g3 = await new Promise((m2, b2) => {
          const l = () => {
            window.removeEventListener("message", E2), h2.body.removeChild(p3), b2("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", l);
          const p3 = h2.createElement("iframe");
          p3.src = c, p3.style.display = "none", p3.addEventListener("error", l, { signal: this.abortController.signal });
          const E2 = (D2) => {
            if (D2.data && typeof D2.data == "string")
              try {
                const f2 = JSON.parse(D2.data);
                if (f2.type === "verify_attestation") {
                  if (decodeJWT(f2.attestation).payload.id !== n2)
                    return;
                  clearInterval(d2), h2.body.removeChild(p3), this.abortController.signal.removeEventListener("abort", l), window.removeEventListener("message", E2), m2(f2.attestation === null ? "" : f2.attestation);
                }
              } catch (f2) {
                this.logger.warn(f2);
              }
          };
          h2.body.appendChild(p3), window.addEventListener("message", E2, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", g3), g3;
      } catch (h2) {
        this.logger.warn(h2);
      }
      return "";
    }, this.resolve = async (i2) => {
      if (this.isDevEnv)
        return "";
      const { attestationId: r2, hash: n2, encryptedId: a2 } = i2;
      if (r2 === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (r2) {
        if (decodeJWT(r2).payload.id !== a2)
          return;
        const h2 = await this.isValidJwtAttestation(r2);
        if (h2) {
          if (!h2.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return h2;
        }
      }
      if (!n2)
        return;
      const c = this.getVerifyUrl(i2 == null ? void 0 : i2.verifyUrl);
      return this.fetchAttestation(n2, c);
    }, this.fetchAttestation = async (i2, r2) => {
      this.logger.debug(`resolving attestation: ${i2} from url: ${r2}`);
      const n2 = this.startAbortTimer(cjs.ONE_SECOND * 5), a2 = await fetch(`${r2}/attestation/${i2}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(n2), a2.status === 200 ? await a2.json() : void 0;
    }, this.getVerifyUrl = (i2) => {
      let r2 = i2 || Z;
      return Ct.includes(r2) || (this.logger.info(`verify url: ${r2}, not included in trusted list, assigning default: ${Z}`), r2 = Z), r2;
    }, this.fetchPublicKey = async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const i2 = this.startAbortTimer(cjs.FIVE_SECONDS), r2 = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(i2), await r2.json();
      } catch (i2) {
        this.logger.warn(i2);
      }
    }, this.persistPublicKey = async (i2) => {
      this.logger.debug("persisting public key to local storage", i2), await this.store.setItem(this.storeKey, i2), this.publicKey = i2;
    }, this.removePublicKey = async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }, this.isValidJwtAttestation = async (i2) => {
      const r2 = await this.getPublicKey();
      try {
        if (r2)
          return this.validateAttestation(i2, r2);
      } catch (a2) {
        this.logger.error(a2), this.logger.warn("error validating attestation");
      }
      const n2 = await this.fetchAndPersistPublicKey();
      try {
        if (n2)
          return this.validateAttestation(i2, n2);
      } catch (a2) {
        this.logger.error(a2), this.logger.warn("error validating attestation");
      }
    }, this.getPublicKey = async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey(), this.fetchAndPersistPublicKey = async () => {
      if (this.fetchPromise)
        return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (r2) => {
        const n2 = await this.fetchPublicKey();
        n2 && (await this.persistPublicKey(n2), r2(n2));
      });
      const i2 = await this.fetchPromise;
      return this.fetchPromise = void 0, i2;
    }, this.validateAttestation = (i2, r2) => {
      const n2 = Lu(i2, r2.publicKey), a2 = { hasExpired: cjs.toMiliseconds(n2.exp) < Date.now(), payload: n2 };
      if (a2.hasExpired)
        throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a2.payload.origin, isScam: a2.payload.isScam, isVerified: a2.payload.isVerified };
    }, this.logger = E$1(t, this.name), this.abortController = new AbortController(), this.isDevEnv = _s$1(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return y$3(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), cjs.toMiliseconds(e));
  }
}
class gi extends v$2 {
  constructor(e, t) {
    super(e, t), this.projectId = e, this.logger = t, this.context = St, this.registerDeviceToken = async (s) => {
      const { clientId: i2, token: r2, notificationType: n2, enableEncrypted: a2 = false } = s, c = `${Pt}/${this.projectId}/clients`;
      await fetch(c, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: i2, type: n2, token: r2, always_raw: a2 }) });
    }, this.logger = E$1(t, this.context);
  }
}
var Tn = Object.defineProperty, pi = Object.getOwnPropertySymbols, Cn = Object.prototype.hasOwnProperty, Sn = Object.prototype.propertyIsEnumerable, yi = (o2, e, t) => e in o2 ? Tn(o2, e, { enumerable: true, configurable: true, writable: true, value: t }) : o2[e] = t, te = (o2, e) => {
  for (var t in e || (e = {}))
    Cn.call(e, t) && yi(o2, t, e[t]);
  if (pi)
    for (var t of pi(e))
      Sn.call(e, t) && yi(o2, t, e[t]);
  return o2;
};
class Di extends C$1 {
  constructor(e, t, s = true) {
    super(e, t, s), this.core = e, this.logger = t, this.context = xt, this.storagePrefix = O$1, this.storageVersion = Rt, this.events = /* @__PURE__ */ new Map(), this.shouldPersist = false, this.init = async () => {
      if (!_s$1())
        try {
          const i2 = { eventId: Ns$1(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: Pn$1(this.core.relayer.protocol, this.core.relayer.version, oe$1) } } };
          await this.sendEvent([i2]);
        } catch (i2) {
          this.logger.warn(i2);
        }
    }, this.createEvent = (i2) => {
      const { event: r2 = "ERROR", type: n2 = "", properties: { topic: a2, trace: c } } = i2, h2 = Ns$1(), d2 = this.core.projectId || "", g3 = Date.now(), m2 = te({ eventId: h2, timestamp: g3, props: { event: r2, type: n2, properties: { topic: a2, trace: c } }, bundleId: d2, domain: this.getAppDomain() }, this.setMethods(h2));
      return this.telemetryEnabled && (this.events.set(h2, m2), this.shouldPersist = true), m2;
    }, this.getEvent = (i2) => {
      const { eventId: r2, topic: n2 } = i2;
      if (r2)
        return this.events.get(r2);
      const a2 = Array.from(this.events.values()).find((c) => c.props.properties.topic === n2);
      if (a2)
        return te(te({}, a2), this.setMethods(a2.eventId));
    }, this.deleteEvent = (i2) => {
      const { eventId: r2 } = i2;
      this.events.delete(r2), this.shouldPersist = true;
    }, this.setEventListeners = () => {
      this.core.heartbeat.on(r.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((i2) => {
          cjs.fromMiliseconds(Date.now()) - cjs.fromMiliseconds(i2.timestamp) > Ot && (this.events.delete(i2.eventId), this.shouldPersist = true);
        });
      });
    }, this.setMethods = (i2) => ({ addTrace: (r2) => this.addTrace(i2, r2), setError: (r2) => this.setError(i2, r2) }), this.addTrace = (i2, r2) => {
      const n2 = this.events.get(i2);
      n2 && (n2.props.properties.trace.push(r2), this.events.set(i2, n2), this.shouldPersist = true);
    }, this.setError = (i2, r2) => {
      const n2 = this.events.get(i2);
      n2 && (n2.props.type = r2, n2.timestamp = Date.now(), this.events.set(i2, n2), this.shouldPersist = true);
    }, this.persist = async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = false;
    }, this.restore = async () => {
      try {
        const i2 = await this.core.storage.getItem(this.storageKey) || [];
        if (!i2.length)
          return;
        i2.forEach((r2) => {
          this.events.set(r2.eventId, te(te({}, r2), this.setMethods(r2.eventId)));
        });
      } catch (i2) {
        this.logger.warn(i2);
      }
    }, this.submit = async () => {
      if (!this.telemetryEnabled || this.events.size === 0)
        return;
      const i2 = [];
      for (const [r2, n2] of this.events)
        n2.props.type && i2.push(n2);
      if (i2.length !== 0)
        try {
          if ((await this.sendEvent(i2)).ok)
            for (const r2 of i2)
              this.events.delete(r2.eventId), this.shouldPersist = true;
        } catch (r2) {
          this.logger.warn(r2);
        }
    }, this.sendEvent = async (i2) => {
      const r2 = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${At}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${oe$1}${r2}`, { method: "POST", body: JSON.stringify(i2) });
    }, this.getAppDomain = () => fs$1().url, this.logger = E$1(t, this.context), this.telemetryEnabled = s, s ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
}
var Pn = Object.defineProperty, mi = Object.getOwnPropertySymbols, Rn = Object.prototype.hasOwnProperty, xn = Object.prototype.propertyIsEnumerable, bi = (o2, e, t) => e in o2 ? Pn(o2, e, { enumerable: true, configurable: true, writable: true, value: t }) : o2[e] = t, fi = (o2, e) => {
  for (var t in e || (e = {}))
    Rn.call(e, t) && bi(o2, t, e[t]);
  if (mi)
    for (var t of mi(e))
      xn.call(e, t) && bi(o2, t, e[t]);
  return o2;
};
class ce extends n {
  constructor(e) {
    var t;
    super(e), this.protocol = be$1, this.version = fe, this.name = ne, this.events = new eventsExports.EventEmitter(), this.initialized = false, this.on = (n2, a2) => this.events.on(n2, a2), this.once = (n2, a2) => this.events.once(n2, a2), this.off = (n2, a2) => this.events.off(n2, a2), this.removeListener = (n2, a2) => this.events.removeListener(n2, a2), this.dispatchEnvelope = ({ topic: n2, message: a2, sessionExists: c }) => {
      if (!n2 || !a2)
        return;
      const h2 = { topic: n2, message: a2, publishedAt: Date.now(), transportType: F$1.link_mode };
      this.relayer.onLinkMessageEvent(h2, { sessionExists: c });
    }, this.projectId = e == null ? void 0 : e.projectId, this.relayUrl = (e == null ? void 0 : e.relayUrl) || Ee, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const s = k({ level: typeof (e == null ? void 0 : e.logger) == "string" && e.logger ? e.logger : Xe.logger }), { logger: i$1, chunkLoggerController: r2 } = A$1({ opts: s, maxSizeInBytes: e == null ? void 0 : e.maxLogBlobSizeInBytes, loggerOverride: e == null ? void 0 : e.logger });
    this.logChunkController = r2, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var n2, a2;
      (n2 = this.logChunkController) != null && n2.downloadLogsBlobInBrowser && ((a2 = this.logChunkController) == null || a2.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = E$1(i$1, this.name), this.heartbeat = new i(), this.crypto = new Wt(this, this.logger, e == null ? void 0 : e.keychain), this.history = new hi(this, this.logger), this.expirer = new li(this, this.logger), this.storage = e != null && e.storage ? e.storage : new h$1(fi(fi({}, Ze), e == null ? void 0 : e.storageOptions)), this.relayer = new si({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new ci(this, this.logger), this.verify = new di(this, this.logger, this.storage), this.echoClient = new gi(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new Di(this, this.logger, e == null ? void 0 : e.telemetryEnabled);
  }
  static async init(e) {
    const t = new ce(e);
    await t.initialize();
    const s = await t.crypto.getClientId();
    return await t.storage.setItem(gt$1, s), t;
  }
  get context() {
    return y$3(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e;
    return (e = this.logChunkController) == null ? void 0 : e.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e) {
    this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), await this.storage.setItem(ve, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.eventClient.init(), this.linkModeSupportedApps = await this.storage.getItem(ve) || [], this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
    }
  }
}
const On = ce;
const be = "wc", Ce = 2, Le = "client", ye = `${be}@${Ce}:${Le}:`, we = { name: Le, logger: "error", controller: false, relayUrl: "wss://relay.walletconnect.org" }, xe = "WALLETCONNECT_DEEPLINK_CHOICE", st = "proposal", it = "Proposal expired", rt = "session", z2 = cjs.SEVEN_DAYS, nt = "engine", v$1 = { wc_sessionPropose: { req: { ttl: cjs.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1101 }, reject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1120 }, autoReject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1121 } }, wc_sessionSettle: { req: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: cjs.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: cjs.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: cjs.ONE_DAY, prompt: false, tag: 1114 }, res: { ttl: cjs.ONE_DAY, prompt: false, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: cjs.ONE_HOUR, prompt: true, tag: 1116 }, res: { ttl: cjs.ONE_HOUR, prompt: false, tag: 1117 }, reject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1118 }, autoReject: { ttl: cjs.FIVE_MINUTES, prompt: false, tag: 1119 } } }, me = { min: cjs.FIVE_MINUTES, max: cjs.SEVEN_DAYS }, x$1 = { idle: "IDLE", active: "ACTIVE" }, ot = "request", at = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"], ct = "wc", lt = "auth", pt = "authKeys", ht = "pairingTopics", dt = "requests", oe = `${ct}@${1.5}:${lt}:`, ae = `${oe}:PUB_KEY`;
var ys = Object.defineProperty, ws = Object.defineProperties, ms = Object.getOwnPropertyDescriptors, ut = Object.getOwnPropertySymbols, _s = Object.prototype.hasOwnProperty, Es = Object.prototype.propertyIsEnumerable, gt = (q2, o2, e) => o2 in q2 ? ys(q2, o2, { enumerable: true, configurable: true, writable: true, value: e }) : q2[o2] = e, I = (q2, o2) => {
  for (var e in o2 || (o2 = {}))
    _s.call(o2, e) && gt(q2, e, o2[e]);
  if (ut)
    for (var e of ut(o2))
      Es.call(o2, e) && gt(q2, e, o2[e]);
  return q2;
}, D$1 = (q2, o2) => ws(q2, ms(o2));
class Rs extends M$2 {
  constructor(o2) {
    super(o2), this.name = nt, this.events = new Jg(), this.initialized = false, this.requestQueue = { state: x$1.idle, queue: [] }, this.sessionRequestQueue = { state: x$1.idle, queue: [] }, this.requestQueueDelay = cjs.ONE_SECOND, this.expectedPairingMethodMap = /* @__PURE__ */ new Map(), this.recentlyDeletedMap = /* @__PURE__ */ new Map(), this.recentlyDeletedLimit = 200, this.relayMessageCache = [], this.init = async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(v$1) }), this.initialized = true, setTimeout(() => {
        this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, cjs.toMiliseconds(this.requestQueueDelay)));
    }, this.connect = async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const t = D$1(I({}, e), { requiredNamespaces: e.requiredNamespaces || {}, optionalNamespaces: e.optionalNamespaces || {} });
      await this.isValidConnect(t);
      const { pairingTopic: s, requiredNamespaces: i2, optionalNamespaces: r2, sessionProperties: n2, relays: a2 } = t;
      let c = s, h2, p3 = false;
      try {
        c && (p3 = this.client.core.pairing.pairings.get(c).active);
      } catch (E2) {
        throw this.client.logger.error(`connect() -> pairing.get(${c}) failed`), E2;
      }
      if (!c || !p3) {
        const { topic: E2, uri: S2 } = await this.client.core.pairing.create();
        c = E2, h2 = S2;
      }
      if (!c) {
        const { message: E2 } = xe$1("NO_MATCHING_KEY", `connect() pairing topic: ${c}`);
        throw new Error(E2);
      }
      const d2 = await this.client.core.crypto.generateKeyPair(), l = v$1.wc_sessionPropose.req.ttl || cjs.FIVE_MINUTES, w2 = ws$1(l), m2 = I({ requiredNamespaces: i2, optionalNamespaces: r2, relays: a2 ?? [{ protocol: at$1 }], proposer: { publicKey: d2, metadata: this.client.metadata }, expiryTimestamp: w2, pairingTopic: c }, n2 && { sessionProperties: n2 }), { reject: y3, resolve: _2, done: R2 } = gs(l, it);
      this.events.once(Ms$1("session_connect"), async ({ error: E2, session: S2 }) => {
        if (E2)
          y3(E2);
        else if (S2) {
          S2.self.publicKey = d2;
          const M3 = D$1(I({}, S2), { pairingTopic: m2.pairingTopic, requiredNamespaces: m2.requiredNamespaces, optionalNamespaces: m2.optionalNamespaces, transportType: F$1.relay });
          await this.client.session.set(S2.topic, M3), await this.setExpiry(S2.topic, S2.expiry), c && await this.client.core.pairing.updateMetadata({ topic: c, metadata: S2.peer.metadata }), this.cleanupDuplicatePairings(M3), _2(M3);
        }
      });
      const V2 = await this.sendRequest({ topic: c, method: "wc_sessionPropose", params: m2, throwOnFailedPublish: true });
      return await this.setProposal(V2, I({ id: V2 }, m2)), { uri: h2, approval: R2 };
    }, this.pair = async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(e);
      } catch (t) {
        throw this.client.logger.error("pair() failed"), t;
      }
    }, this.approve = async (e) => {
      var t, s, i2;
      const r2 = this.client.core.eventClient.createEvent({ properties: { topic: (t = e == null ? void 0 : e.id) == null ? void 0 : t.toString(), trace: [Cs.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (N2) {
        throw r2.setError(Ss$1.no_internet_connection), N2;
      }
      try {
        await this.isValidProposalId(e == null ? void 0 : e.id);
      } catch (N2) {
        throw this.client.logger.error(`approve() -> proposal.get(${e == null ? void 0 : e.id}) failed`), r2.setError(Ss$1.proposal_not_found), N2;
      }
      try {
        await this.isValidApprove(e);
      } catch (N2) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), r2.setError(Ss$1.session_approve_namespace_validation_failure), N2;
      }
      const { id: n2, relayProtocol: a2, namespaces: c, sessionProperties: h2, sessionConfig: p3 } = e, d2 = this.client.proposal.get(n2);
      this.client.core.eventClient.deleteEvent({ eventId: r2.eventId });
      const { pairingTopic: l, proposer: w2, requiredNamespaces: m2, optionalNamespaces: y3 } = d2;
      let _2 = (s = this.client.core.eventClient) == null ? void 0 : s.getEvent({ topic: l });
      _2 || (_2 = (i2 = this.client.core.eventClient) == null ? void 0 : i2.createEvent({ type: Cs.session_approve_started, properties: { topic: l, trace: [Cs.session_approve_started, Cs.session_namespaces_validation_success] } }));
      const R2 = await this.client.core.crypto.generateKeyPair(), V2 = w2.publicKey, E2 = await this.client.core.crypto.generateSharedKey(R2, V2), S2 = I(I({ relay: { protocol: a2 ?? "irn" }, namespaces: c, controller: { publicKey: R2, metadata: this.client.metadata }, expiry: ws$1(z2) }, h2 && { sessionProperties: h2 }), p3 && { sessionConfig: p3 }), M3 = F$1.relay;
      _2.addTrace(Cs.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(E2, { transportType: M3 });
      } catch (N2) {
        throw _2.setError(Ss$1.subscribe_session_topic_failure), N2;
      }
      _2.addTrace(Cs.subscribe_session_topic_success);
      const W = D$1(I({}, S2), { topic: E2, requiredNamespaces: m2, optionalNamespaces: y3, pairingTopic: l, acknowledged: false, self: S2.controller, peer: { publicKey: w2.publicKey, metadata: w2.metadata }, controller: R2, transportType: F$1.relay });
      await this.client.session.set(E2, W), _2.addTrace(Cs.store_session);
      try {
        _2.addTrace(Cs.publishing_session_settle), await this.sendRequest({ topic: E2, method: "wc_sessionSettle", params: S2, throwOnFailedPublish: true }).catch((N2) => {
          throw _2 == null ? void 0 : _2.setError(Ss$1.session_settle_publish_failure), N2;
        }), _2.addTrace(Cs.session_settle_publish_success), _2.addTrace(Cs.publishing_session_approve), await this.sendResult({ id: n2, topic: l, result: { relay: { protocol: a2 ?? "irn" }, responderPublicKey: R2 }, throwOnFailedPublish: true }).catch((N2) => {
          throw _2 == null ? void 0 : _2.setError(Ss$1.session_approve_publish_failure), N2;
        }), _2.addTrace(Cs.session_approve_publish_success);
      } catch (N2) {
        throw this.client.logger.error(N2), this.client.session.delete(E2, er$1("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(E2), N2;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: _2.eventId }), await this.client.core.pairing.updateMetadata({ topic: l, metadata: w2.metadata }), await this.client.proposal.delete(n2, er$1("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: l }), await this.setExpiry(E2, ws$1(z2)), { topic: E2, acknowledged: () => Promise.resolve(this.client.session.get(E2)) };
    }, this.reject = async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(e);
      } catch (r2) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), r2;
      }
      const { id: t, reason: s } = e;
      let i2;
      try {
        i2 = this.client.proposal.get(t).pairingTopic;
      } catch (r2) {
        throw this.client.logger.error(`reject() -> proposal.get(${t}) failed`), r2;
      }
      i2 && (await this.sendError({ id: t, topic: i2, error: s, rpcOpts: v$1.wc_sessionPropose.reject }), await this.client.proposal.delete(t, er$1("USER_DISCONNECTED")));
    }, this.update = async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(e);
      } catch (p3) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), p3;
      }
      const { topic: t, namespaces: s } = e, { done: i2, resolve: r2, reject: n2 } = gs(), a2 = payloadId(), c = getBigIntRpcId().toString(), h2 = this.client.session.get(t).namespaces;
      return this.events.once(Ms$1("session_update", a2), ({ error: p3 }) => {
        p3 ? n2(p3) : r2();
      }), await this.client.session.update(t, { namespaces: s }), await this.sendRequest({ topic: t, method: "wc_sessionUpdate", params: { namespaces: s }, throwOnFailedPublish: true, clientRpcId: a2, relayRpcId: c }).catch((p3) => {
        this.client.logger.error(p3), this.client.session.update(t, { namespaces: h2 }), n2(p3);
      }), { acknowledged: i2 };
    }, this.extend = async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(e);
      } catch (a2) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), a2;
      }
      const { topic: t } = e, s = payloadId(), { done: i2, resolve: r2, reject: n2 } = gs();
      return this.events.once(Ms$1("session_extend", s), ({ error: a2 }) => {
        a2 ? n2(a2) : r2();
      }), await this.setExpiry(t, ws$1(z2)), this.sendRequest({ topic: t, method: "wc_sessionExtend", params: {}, clientRpcId: s, throwOnFailedPublish: true }).catch((a2) => {
        n2(a2);
      }), { acknowledged: i2 };
    }, this.request = async (e) => {
      this.isInitialized();
      try {
        await this.isValidRequest(e);
      } catch (w2) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), w2;
      }
      const { chainId: t, request: s, topic: i2, expiry: r2 = v$1.wc_sessionRequest.req.ttl } = e, n2 = this.client.session.get(i2);
      (n2 == null ? void 0 : n2.transportType) === F$1.relay && await this.confirmOnlineStateOrThrow();
      const a2 = payloadId(), c = getBigIntRpcId().toString(), { done: h2, resolve: p3, reject: d2 } = gs(r2, "Request expired. Please try again.");
      this.events.once(Ms$1("session_request", a2), ({ error: w2, result: m2 }) => {
        w2 ? d2(w2) : p3(m2);
      });
      const l = this.getAppLinkIfEnabled(n2.peer.metadata, n2.transportType);
      return l ? (await this.sendRequest({ clientRpcId: a2, relayRpcId: c, topic: i2, method: "wc_sessionRequest", params: { request: D$1(I({}, s), { expiryTimestamp: ws$1(r2) }), chainId: t }, expiry: r2, throwOnFailedPublish: true, appLink: l }).catch((w2) => d2(w2)), this.client.events.emit("session_request_sent", { topic: i2, request: s, chainId: t, id: a2 }), await h2()) : await Promise.all([new Promise(async (w2) => {
        await this.sendRequest({ clientRpcId: a2, relayRpcId: c, topic: i2, method: "wc_sessionRequest", params: { request: D$1(I({}, s), { expiryTimestamp: ws$1(r2) }), chainId: t }, expiry: r2, throwOnFailedPublish: true }).catch((m2) => d2(m2)), this.client.events.emit("session_request_sent", { topic: i2, request: s, chainId: t, id: a2 }), w2();
      }), new Promise(async (w2) => {
        var m2;
        if (!((m2 = n2.sessionConfig) != null && m2.disableDeepLink)) {
          const y3 = await Ss$2(this.client.core.storage, xe);
          await Es$1({ id: a2, topic: i2, wcDeepLink: y3 });
        }
        w2();
      }), h2()]).then((w2) => w2[2]);
    }, this.respond = async (e) => {
      this.isInitialized(), await this.isValidRespond(e);
      const { topic: t, response: s } = e, { id: i2 } = s, r2 = this.client.session.get(t);
      r2.transportType === F$1.relay && await this.confirmOnlineStateOrThrow();
      const n2 = this.getAppLinkIfEnabled(r2.peer.metadata, r2.transportType);
      isJsonRpcResult(s) ? await this.sendResult({ id: i2, topic: t, result: s.result, throwOnFailedPublish: true, appLink: n2 }) : isJsonRpcError(s) && await this.sendError({ id: i2, topic: t, error: s.error, appLink: n2 }), this.cleanupAfterResponse(e);
    }, this.ping = async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(e);
      } catch (s) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), s;
      }
      const { topic: t } = e;
      if (this.client.session.keys.includes(t)) {
        const s = payloadId(), i2 = getBigIntRpcId().toString(), { done: r2, resolve: n2, reject: a2 } = gs();
        this.events.once(Ms$1("session_ping", s), ({ error: c }) => {
          c ? a2(c) : n2();
        }), await Promise.all([this.sendRequest({ topic: t, method: "wc_sessionPing", params: {}, throwOnFailedPublish: true, clientRpcId: s, relayRpcId: i2 }), r2()]);
      } else
        this.client.core.pairing.pairings.keys.includes(t) && await this.client.core.pairing.ping({ topic: t });
    }, this.emit = async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(e);
      const { topic: t, event: s, chainId: i2 } = e, r2 = getBigIntRpcId().toString();
      await this.sendRequest({ topic: t, method: "wc_sessionEvent", params: { event: s, chainId: i2 }, throwOnFailedPublish: true, relayRpcId: r2 });
    }, this.disconnect = async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(e);
      const { topic: t } = e;
      if (this.client.session.keys.includes(t))
        await this.sendRequest({ topic: t, method: "wc_sessionDelete", params: er$1("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession({ topic: t, emitEvent: false });
      else if (this.client.core.pairing.pairings.keys.includes(t))
        await this.client.core.pairing.disconnect({ topic: t });
      else {
        const { message: s } = xe$1("MISMATCHED_TOPIC", `Session or pairing topic not found: ${t}`);
        throw new Error(s);
      }
    }, this.find = (e) => (this.isInitialized(), this.client.session.getAll().filter((t) => hh(t, e))), this.getPendingSessionRequests = () => this.client.pendingRequest.getAll(), this.authenticate = async (e, t) => {
      var s;
      this.isInitialized(), this.isValidAuthenticate(e);
      const i2 = t && this.client.core.linkModeSupportedApps.includes(t) && ((s = this.client.metadata.redirect) == null ? void 0 : s.linkMode), r2 = i2 ? F$1.link_mode : F$1.relay;
      r2 === F$1.relay && await this.confirmOnlineStateOrThrow();
      const { chains: n2, statement: a2 = "", uri: c, domain: h2, nonce: p3, type: d2, exp: l, nbf: w2, methods: m2 = [], expiry: y3 } = e, _2 = [...e.resources || []], { topic: R2, uri: V2 } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: r2 });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: R2, uri: V2 } });
      const E2 = await this.client.core.crypto.generateKeyPair(), S2 = Ru(E2);
      if (await Promise.all([this.client.auth.authKeys.set(ae, { responseTopic: S2, publicKey: E2 }), this.client.auth.pairingTopics.set(S2, { topic: S2, pairingTopic: R2 })]), await this.client.core.relayer.subscribe(S2, { transportType: r2 }), this.client.logger.info(`sending request to new pairing topic: ${R2}`), m2.length > 0) {
        const { namespace: O2 } = An(n2[0]);
        let T2 = xu(O2, "request", m2);
        Vr$1(_2) && (T2 = Mu(T2, _2.pop())), _2.push(T2);
      }
      const M3 = y3 && y3 > v$1.wc_sessionAuthenticate.req.ttl ? y3 : v$1.wc_sessionAuthenticate.req.ttl, W = { authPayload: { type: d2 ?? "caip122", chains: n2, statement: a2, aud: c, domain: h2, version: "1", nonce: p3, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: l, nbf: w2, resources: _2 }, requester: { publicKey: E2, metadata: this.client.metadata }, expiryTimestamp: ws$1(M3) }, N2 = { eip155: { chains: n2, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...m2])], events: ["chainChanged", "accountsChanged"] } }, De = { requiredNamespaces: {}, optionalNamespaces: N2, relays: [{ protocol: "irn" }], pairingTopic: R2, proposer: { publicKey: E2, metadata: this.client.metadata }, expiryTimestamp: ws$1(v$1.wc_sessionPropose.req.ttl) }, { done: wt2, resolve: Ve, reject: Ee2 } = gs(M3, "Request expired"), ce2 = async ({ error: O2, session: T2 }) => {
        if (this.events.off(Ms$1("session_request", G2), Re2), O2)
          Ee2(O2);
        else if (T2) {
          T2.self.publicKey = E2, await this.client.session.set(T2.topic, T2), await this.setExpiry(T2.topic, T2.expiry), R2 && await this.client.core.pairing.updateMetadata({ topic: R2, metadata: T2.peer.metadata });
          const le2 = this.client.session.get(T2.topic);
          await this.deleteProposal(Z2), Ve({ session: le2 });
        }
      }, Re2 = async (O2) => {
        var T2, le2, Me;
        if (await this.deletePendingAuthRequest(G2, { message: "fulfilled", code: 0 }), O2.error) {
          const te2 = er$1("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return O2.error.code === te2.code ? void 0 : (this.events.off(Ms$1("session_connect"), ce2), Ee2(O2.error.message));
        }
        await this.deleteProposal(Z2), this.events.off(Ms$1("session_connect"), ce2);
        const { cacaos: ke, responder: j2 } = O2.result, Ie2 = [], $e2 = [];
        for (const te2 of ke) {
          await mu({ cacao: te2, projectId: this.client.core.projectId }) || (this.client.logger.error(te2, "Signature verification failed"), Ee2(er$1("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: fe2 } = te2, ve2 = Vr$1(fe2.resources), Ke = [gu(fe2.iss)], mt2 = Vi(fe2.iss);
          if (ve2) {
            const qe = Eu(ve2), _t2 = Su(ve2);
            Ie2.push(...qe), Ke.push(..._t2);
          }
          for (const qe of Ke)
            $e2.push(`${qe}:${mt2}`);
        }
        const ee2 = await this.client.core.crypto.generateSharedKey(E2, j2.publicKey);
        let pe2;
        Ie2.length > 0 && (pe2 = { topic: ee2, acknowledged: true, self: { publicKey: E2, metadata: this.client.metadata }, peer: j2, controller: j2.publicKey, expiry: ws$1(z2), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: R2, namespaces: uh([...new Set(Ie2)], [...new Set($e2)]), transportType: r2 }, await this.client.core.relayer.subscribe(ee2, { transportType: r2 }), await this.client.session.set(ee2, pe2), R2 && await this.client.core.pairing.updateMetadata({ topic: R2, metadata: j2.metadata }), pe2 = this.client.session.get(ee2)), (T2 = this.client.metadata.redirect) != null && T2.linkMode && (le2 = j2.metadata.redirect) != null && le2.linkMode && (Me = j2.metadata.redirect) != null && Me.universal && t && (this.client.core.addLinkModeSupportedApp(j2.metadata.redirect.universal), this.client.session.update(ee2, { transportType: F$1.link_mode })), Ve({ auths: ke, session: pe2 });
      }, G2 = payloadId(), Z2 = payloadId();
      this.events.once(Ms$1("session_connect"), ce2), this.events.once(Ms$1("session_request", G2), Re2);
      let Se;
      try {
        if (i2) {
          const O2 = formatJsonRpcRequest("wc_sessionAuthenticate", W, G2);
          this.client.core.history.set(R2, O2);
          const T2 = await this.client.core.crypto.encode("", O2, { type: Sr$1, encoding: Iu });
          Se = Zu(t, R2, T2);
        } else
          await Promise.all([this.sendRequest({ topic: R2, method: "wc_sessionAuthenticate", params: W, expiry: e.expiry, throwOnFailedPublish: true, clientRpcId: G2 }), this.sendRequest({ topic: R2, method: "wc_sessionPropose", params: De, expiry: v$1.wc_sessionPropose.req.ttl, throwOnFailedPublish: true, clientRpcId: Z2 })]);
      } catch (O2) {
        throw this.events.off(Ms$1("session_connect"), ce2), this.events.off(Ms$1("session_request", G2), Re2), O2;
      }
      return await this.setProposal(Z2, I({ id: Z2 }, De)), await this.setAuthRequest(G2, { request: D$1(I({}, W), { verifyContext: {} }), pairingTopic: R2, transportType: r2 }), { uri: Se ?? V2, response: wt2 };
    }, this.approveSessionAuthenticate = async (e) => {
      const { id: t, auths: s } = e, i2 = this.client.core.eventClient.createEvent({ properties: { topic: t.toString(), trace: [Ps.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (y3) {
        throw i2.setError(Rs$1.no_internet_connection), y3;
      }
      const r2 = this.getPendingAuthRequest(t);
      if (!r2)
        throw i2.setError(Rs$1.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${t}`);
      const n2 = r2.transportType || F$1.relay;
      n2 === F$1.relay && await this.confirmOnlineStateOrThrow();
      const a2 = r2.requester.publicKey, c = await this.client.core.crypto.generateKeyPair(), h2 = Ru(a2), p3 = { type: pr$2, receiverPublicKey: a2, senderPublicKey: c }, d2 = [], l = [];
      for (const y3 of s) {
        if (!await mu({ cacao: y3, projectId: this.client.core.projectId })) {
          i2.setError(Rs$1.invalid_cacao);
          const S2 = er$1("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: t, topic: h2, error: S2, encodeOpts: p3 }), new Error(S2.message);
        }
        i2.addTrace(Ps.cacaos_verified);
        const { p: _2 } = y3, R2 = Vr$1(_2.resources), V2 = [gu(_2.iss)], E2 = Vi(_2.iss);
        if (R2) {
          const S2 = Eu(R2), M3 = Su(R2);
          d2.push(...S2), V2.push(...M3);
        }
        for (const S2 of V2)
          l.push(`${S2}:${E2}`);
      }
      const w2 = await this.client.core.crypto.generateSharedKey(c, a2);
      i2.addTrace(Ps.create_authenticated_session_topic);
      let m2;
      if ((d2 == null ? void 0 : d2.length) > 0) {
        m2 = { topic: w2, acknowledged: true, self: { publicKey: c, metadata: this.client.metadata }, peer: { publicKey: a2, metadata: r2.requester.metadata }, controller: a2, expiry: ws$1(z2), authentication: s, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: r2.pairingTopic, namespaces: uh([...new Set(d2)], [...new Set(l)]), transportType: n2 }, i2.addTrace(Ps.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(w2, { transportType: n2 });
        } catch (y3) {
          throw i2.setError(Rs$1.subscribe_authenticated_session_topic_failure), y3;
        }
        i2.addTrace(Ps.subscribe_authenticated_session_topic_success), await this.client.session.set(w2, m2), i2.addTrace(Ps.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: r2.pairingTopic, metadata: r2.requester.metadata });
      }
      i2.addTrace(Ps.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: h2, id: t, result: { cacaos: s, responder: { publicKey: c, metadata: this.client.metadata } }, encodeOpts: p3, throwOnFailedPublish: true, appLink: this.getAppLinkIfEnabled(r2.requester.metadata, n2) });
      } catch (y3) {
        throw i2.setError(Rs$1.authenticated_session_approve_publish_failure), y3;
      }
      return await this.client.auth.requests.delete(t, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: r2.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i2.eventId }), { session: m2 };
    }, this.rejectSessionAuthenticate = async (e) => {
      this.isInitialized();
      const { id: t, reason: s } = e, i2 = this.getPendingAuthRequest(t);
      if (!i2)
        throw new Error(`Could not find pending auth request with id ${t}`);
      i2.transportType === F$1.relay && await this.confirmOnlineStateOrThrow();
      const r2 = i2.requester.publicKey, n2 = await this.client.core.crypto.generateKeyPair(), a2 = Ru(r2), c = { type: pr$2, receiverPublicKey: r2, senderPublicKey: n2 };
      await this.sendError({ id: t, topic: a2, error: s, encodeOpts: c, rpcOpts: v$1.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i2.requester.metadata, i2.transportType) }), await this.client.auth.requests.delete(t, { message: "rejected", code: 0 }), await this.client.proposal.delete(t, er$1("USER_DISCONNECTED"));
    }, this.formatAuthMessage = (e) => {
      this.isInitialized();
      const { request: t, iss: s } = e;
      return Wf(t, s);
    }, this.processRelayMessageCache = () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0)
          for (; this.relayMessageCache.length > 0; )
            try {
              const e = this.relayMessageCache.shift();
              e && await this.onRelayMessage(e);
            } catch (e) {
              this.client.logger.error(e);
            }
      }, 50);
    }, this.cleanupDuplicatePairings = async (e) => {
      if (e.pairingTopic)
        try {
          const t = this.client.core.pairing.pairings.get(e.pairingTopic), s = this.client.core.pairing.pairings.getAll().filter((i2) => {
            var r2, n2;
            return ((r2 = i2.peerMetadata) == null ? void 0 : r2.url) && ((n2 = i2.peerMetadata) == null ? void 0 : n2.url) === e.peer.metadata.url && i2.topic && i2.topic !== t.topic;
          });
          if (s.length === 0)
            return;
          this.client.logger.info(`Cleaning up ${s.length} duplicate pairing(s)`), await Promise.all(s.map((i2) => this.client.core.pairing.disconnect({ topic: i2.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
        } catch (t) {
          this.client.logger.error(t);
        }
    }, this.deleteSession = async (e) => {
      var t;
      const { topic: s, expirerHasDeleted: i2 = false, emitEvent: r2 = true, id: n2 = 0 } = e, { self: a2 } = this.client.session.get(s);
      await this.client.core.relayer.unsubscribe(s), await this.client.session.delete(s, er$1("USER_DISCONNECTED")), this.addToRecentlyDeleted(s, "session"), this.client.core.crypto.keychain.has(a2.publicKey) && await this.client.core.crypto.deleteKeyPair(a2.publicKey), this.client.core.crypto.keychain.has(s) && await this.client.core.crypto.deleteSymKey(s), i2 || this.client.core.expirer.del(s), this.client.core.storage.removeItem(xe).catch((c) => this.client.logger.warn(c)), this.getPendingSessionRequests().forEach((c) => {
        c.topic === s && this.deletePendingSessionRequest(c.id, er$1("USER_DISCONNECTED"));
      }), s === ((t = this.sessionRequestQueue.queue[0]) == null ? void 0 : t.topic) && (this.sessionRequestQueue.state = x$1.idle), r2 && this.client.events.emit("session_delete", { id: n2, topic: s });
    }, this.deleteProposal = async (e, t) => {
      if (t)
        try {
          const s = this.client.proposal.get(e), i2 = this.client.core.eventClient.getEvent({ topic: s.pairingTopic });
          i2 == null ? void 0 : i2.setError(Ss$1.proposal_expired);
        } catch {
        }
      await Promise.all([this.client.proposal.delete(e, er$1("USER_DISCONNECTED")), t ? Promise.resolve() : this.client.core.expirer.del(e)]), this.addToRecentlyDeleted(e, "proposal");
    }, this.deletePendingSessionRequest = async (e, t, s = false) => {
      await Promise.all([this.client.pendingRequest.delete(e, t), s ? Promise.resolve() : this.client.core.expirer.del(e)]), this.addToRecentlyDeleted(e, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i2) => i2.id !== e), s && (this.sessionRequestQueue.state = x$1.idle, this.client.events.emit("session_request_expire", { id: e }));
    }, this.deletePendingAuthRequest = async (e, t, s = false) => {
      await Promise.all([this.client.auth.requests.delete(e, t), s ? Promise.resolve() : this.client.core.expirer.del(e)]);
    }, this.setExpiry = async (e, t) => {
      this.client.session.keys.includes(e) && (this.client.core.expirer.set(e, t), await this.client.session.update(e, { expiry: t }));
    }, this.setProposal = async (e, t) => {
      this.client.core.expirer.set(e, ws$1(v$1.wc_sessionPropose.req.ttl)), await this.client.proposal.set(e, t);
    }, this.setAuthRequest = async (e, t) => {
      const { request: s, pairingTopic: i2, transportType: r2 = F$1.relay } = t;
      this.client.core.expirer.set(e, s.expiryTimestamp), await this.client.auth.requests.set(e, { authPayload: s.authPayload, requester: s.requester, expiryTimestamp: s.expiryTimestamp, id: e, pairingTopic: i2, verifyContext: s.verifyContext, transportType: r2 });
    }, this.setPendingSessionRequest = async (e) => {
      const { id: t, topic: s, params: i2, verifyContext: r2 } = e, n2 = i2.request.expiryTimestamp || ws$1(v$1.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(t, n2), await this.client.pendingRequest.set(t, { id: t, topic: s, params: i2, verifyContext: r2 });
    }, this.sendRequest = async (e) => {
      const { topic: t, method: s, params: i2, expiry: r2, relayRpcId: n2, clientRpcId: a2, throwOnFailedPublish: c, appLink: h2 } = e, p3 = formatJsonRpcRequest(s, i2, a2);
      let d2;
      const l = !!h2;
      try {
        const y3 = l ? Iu : tn$1;
        d2 = await this.client.core.crypto.encode(t, p3, { encoding: y3 });
      } catch (y3) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${t} failed`), y3;
      }
      let w2;
      if (at.includes(s)) {
        const y3 = Ou(JSON.stringify(p3)), _2 = Ou(d2);
        w2 = await this.client.core.verify.register({ id: _2, decryptedId: y3 });
      }
      const m2 = v$1[s].req;
      if (m2.attestation = w2, r2 && (m2.ttl = r2), n2 && (m2.id = n2), this.client.core.history.set(t, p3), l) {
        const y3 = Zu(h2, t, d2);
        await global.Linking.openURL(y3, this.client.name);
      } else {
        const y3 = v$1[s].req;
        r2 && (y3.ttl = r2), n2 && (y3.id = n2), c ? (y3.internal = D$1(I({}, y3.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(t, d2, y3)) : this.client.core.relayer.publish(t, d2, y3).catch((_2) => this.client.logger.error(_2));
      }
      return p3.id;
    }, this.sendResult = async (e) => {
      const { id: t, topic: s, result: i2, throwOnFailedPublish: r2, encodeOpts: n2, appLink: a2 } = e, c = formatJsonRpcResult(t, i2);
      let h2;
      const p3 = a2 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const l = p3 ? Iu : tn$1;
        h2 = await this.client.core.crypto.encode(s, c, D$1(I({}, n2 || {}), { encoding: l }));
      } catch (l) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s} failed`), l;
      }
      let d2;
      try {
        d2 = await this.client.core.history.get(s, t);
      } catch (l) {
        throw this.client.logger.error(`sendResult() -> history.get(${s}, ${t}) failed`), l;
      }
      if (p3) {
        const l = Zu(a2, s, h2);
        await global.Linking.openURL(l, this.client.name);
      } else {
        const l = v$1[d2.request.method].res;
        r2 ? (l.internal = D$1(I({}, l.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(s, h2, l)) : this.client.core.relayer.publish(s, h2, l).catch((w2) => this.client.logger.error(w2));
      }
      await this.client.core.history.resolve(c);
    }, this.sendError = async (e) => {
      const { id: t, topic: s, error: i2, encodeOpts: r2, rpcOpts: n2, appLink: a2 } = e, c = formatJsonRpcError(t, i2);
      let h2;
      const p3 = a2 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const l = p3 ? Iu : tn$1;
        h2 = await this.client.core.crypto.encode(s, c, D$1(I({}, r2 || {}), { encoding: l }));
      } catch (l) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s} failed`), l;
      }
      let d2;
      try {
        d2 = await this.client.core.history.get(s, t);
      } catch (l) {
        throw this.client.logger.error(`sendError() -> history.get(${s}, ${t}) failed`), l;
      }
      if (p3) {
        const l = Zu(a2, s, h2);
        await global.Linking.openURL(l, this.client.name);
      } else {
        const l = n2 || v$1[d2.request.method].res;
        this.client.core.relayer.publish(s, h2, l);
      }
      await this.client.core.history.resolve(c);
    }, this.cleanup = async () => {
      const e = [], t = [];
      this.client.session.getAll().forEach((s) => {
        let i2 = false;
        xs$1(s.expiry) && (i2 = true), this.client.core.crypto.keychain.has(s.topic) || (i2 = true), i2 && e.push(s.topic);
      }), this.client.proposal.getAll().forEach((s) => {
        xs$1(s.expiryTimestamp) && t.push(s.id);
      }), await Promise.all([...e.map((s) => this.deleteSession({ topic: s })), ...t.map((s) => this.deleteProposal(s))]);
    }, this.onRelayEventRequest = async (e) => {
      this.requestQueue.queue.push(e), await this.processRequestsQueue();
    }, this.processRequestsQueue = async () => {
      if (this.requestQueue.state === x$1.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = x$1.active;
        const e = this.requestQueue.queue.shift();
        if (e)
          try {
            await this.processRequest(e);
          } catch (t) {
            this.client.logger.warn(t);
          }
      }
      this.requestQueue.state = x$1.idle;
    }, this.processRequest = async (e) => {
      const { topic: t, payload: s, attestation: i2, transportType: r2, encryptedId: n2 } = e, a2 = s.method;
      if (!this.shouldIgnorePairingRequest({ topic: t, requestMethod: a2 }))
        switch (a2) {
          case "wc_sessionPropose":
            return await this.onSessionProposeRequest({ topic: t, payload: s, attestation: i2, encryptedId: n2 });
          case "wc_sessionSettle":
            return await this.onSessionSettleRequest(t, s);
          case "wc_sessionUpdate":
            return await this.onSessionUpdateRequest(t, s);
          case "wc_sessionExtend":
            return await this.onSessionExtendRequest(t, s);
          case "wc_sessionPing":
            return await this.onSessionPingRequest(t, s);
          case "wc_sessionDelete":
            return await this.onSessionDeleteRequest(t, s);
          case "wc_sessionRequest":
            return await this.onSessionRequest({ topic: t, payload: s, attestation: i2, encryptedId: n2, transportType: r2 });
          case "wc_sessionEvent":
            return await this.onSessionEventRequest(t, s);
          case "wc_sessionAuthenticate":
            return await this.onSessionAuthenticateRequest({ topic: t, payload: s, attestation: i2, encryptedId: n2, transportType: r2 });
          default:
            return this.client.logger.info(`Unsupported request method ${a2}`);
        }
    }, this.onRelayEventResponse = async (e) => {
      const { topic: t, payload: s, transportType: i2 } = e, r2 = (await this.client.core.history.get(t, s.id)).request.method;
      switch (r2) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(t, s, i2);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(t, s);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(t, s);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(t, s);
        case "wc_sessionPing":
          return this.onSessionPingResponse(t, s);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(t, s);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(t, s);
        default:
          return this.client.logger.info(`Unsupported response method ${r2}`);
      }
    }, this.onRelayEventUnknownPayload = (e) => {
      const { topic: t } = e, { message: s } = xe$1("MISSING_OR_INVALID", `Decoded payload on topic ${t} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(s);
    }, this.shouldIgnorePairingRequest = (e) => {
      const { topic: t, requestMethod: s } = e, i2 = this.expectedPairingMethodMap.get(t);
      return !i2 || i2.includes(s) ? false : !!(i2.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }, this.onSessionProposeRequest = async (e) => {
      const { topic: t, payload: s, attestation: i2, encryptedId: r2 } = e, { params: n2, id: a2 } = s;
      try {
        const c = this.client.core.eventClient.getEvent({ topic: t });
        this.isValidConnect(I({}, s.params));
        const h2 = n2.expiryTimestamp || ws$1(v$1.wc_sessionPropose.req.ttl), p3 = I({ id: a2, pairingTopic: t, expiryTimestamp: h2 }, n2);
        await this.setProposal(a2, p3);
        const d2 = await this.getVerifyContext({ attestationId: i2, hash: Ou(JSON.stringify(s)), encryptedId: r2, metadata: p3.proposer.metadata });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), c == null ? void 0 : c.setError(M$1.proposal_listener_not_found)), c == null ? void 0 : c.addTrace(z$1.emit_session_proposal), this.client.events.emit("session_proposal", { id: a2, params: p3, verifyContext: d2 });
      } catch (c) {
        await this.sendError({ id: a2, topic: t, error: c, rpcOpts: v$1.wc_sessionPropose.autoReject }), this.client.logger.error(c);
      }
    }, this.onSessionProposeResponse = async (e, t, s) => {
      const { id: i2 } = t;
      if (isJsonRpcResult(t)) {
        const { result: r2 } = t;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: r2 });
        const n2 = this.client.proposal.get(i2);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: n2 });
        const a2 = n2.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: a2 });
        const c = r2.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: c });
        const h2 = await this.client.core.crypto.generateSharedKey(a2, c);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", sessionTopic: h2 });
        const p3 = await this.client.core.relayer.subscribe(h2, { transportType: s });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: p3 }), await this.client.core.pairing.activate({ topic: e });
      } else if (isJsonRpcError(t)) {
        await this.client.proposal.delete(i2, er$1("USER_DISCONNECTED"));
        const r2 = Ms$1("session_connect");
        if (this.events.listenerCount(r2) === 0)
          throw new Error(`emitting ${r2} without any listeners, 954`);
        this.events.emit(Ms$1("session_connect"), { error: t.error });
      }
    }, this.onSessionSettleRequest = async (e, t) => {
      const { id: s, params: i2 } = t;
      try {
        this.isValidSessionSettleRequest(i2);
        const { relay: r2, controller: n2, expiry: a2, namespaces: c, sessionProperties: h2, sessionConfig: p3 } = t.params, d2 = D$1(I(I({ topic: e, relay: r2, expiry: a2, namespaces: c, acknowledged: true, pairingTopic: "", requiredNamespaces: {}, optionalNamespaces: {}, controller: n2.publicKey, self: { publicKey: "", metadata: this.client.metadata }, peer: { publicKey: n2.publicKey, metadata: n2.metadata } }, h2 && { sessionProperties: h2 }), p3 && { sessionConfig: p3 }), { transportType: F$1.relay }), l = Ms$1("session_connect");
        if (this.events.listenerCount(l) === 0)
          throw new Error(`emitting ${l} without any listeners 997`);
        this.events.emit(Ms$1("session_connect"), { session: d2 }), await this.sendResult({ id: t.id, topic: e, result: true, throwOnFailedPublish: true });
      } catch (r2) {
        await this.sendError({ id: s, topic: e, error: r2 }), this.client.logger.error(r2);
      }
    }, this.onSessionSettleResponse = async (e, t) => {
      const { id: s } = t;
      isJsonRpcResult(t) ? (await this.client.session.update(e, { acknowledged: true }), this.events.emit(Ms$1("session_approve", s), {})) : isJsonRpcError(t) && (await this.client.session.delete(e, er$1("USER_DISCONNECTED")), this.events.emit(Ms$1("session_approve", s), { error: t.error }));
    }, this.onSessionUpdateRequest = async (e, t) => {
      const { params: s, id: i2 } = t;
      try {
        const r2 = `${e}_session_update`, n2 = Rh.get(r2);
        if (n2 && this.isRequestOutOfSync(n2, i2)) {
          this.client.logger.info(`Discarding out of sync request - ${i2}`), this.sendError({ id: i2, topic: e, error: er$1("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(I({ topic: e }, s));
        try {
          Rh.set(r2, i2), await this.client.session.update(e, { namespaces: s.namespaces }), await this.sendResult({ id: i2, topic: e, result: true, throwOnFailedPublish: true });
        } catch (a2) {
          throw Rh.delete(r2), a2;
        }
        this.client.events.emit("session_update", { id: i2, topic: e, params: s });
      } catch (r2) {
        await this.sendError({ id: i2, topic: e, error: r2 }), this.client.logger.error(r2);
      }
    }, this.isRequestOutOfSync = (e, t) => parseInt(t.toString().slice(0, -3)) <= parseInt(e.toString().slice(0, -3)), this.onSessionUpdateResponse = (e, t) => {
      const { id: s } = t, i2 = Ms$1("session_update", s);
      if (this.events.listenerCount(i2) === 0)
        throw new Error(`emitting ${i2} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(Ms$1("session_update", s), {}) : isJsonRpcError(t) && this.events.emit(Ms$1("session_update", s), { error: t.error });
    }, this.onSessionExtendRequest = async (e, t) => {
      const { id: s } = t;
      try {
        this.isValidExtend({ topic: e }), await this.setExpiry(e, ws$1(z2)), await this.sendResult({ id: s, topic: e, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_extend", { id: s, topic: e });
      } catch (i2) {
        await this.sendError({ id: s, topic: e, error: i2 }), this.client.logger.error(i2);
      }
    }, this.onSessionExtendResponse = (e, t) => {
      const { id: s } = t, i2 = Ms$1("session_extend", s);
      if (this.events.listenerCount(i2) === 0)
        throw new Error(`emitting ${i2} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(Ms$1("session_extend", s), {}) : isJsonRpcError(t) && this.events.emit(Ms$1("session_extend", s), { error: t.error });
    }, this.onSessionPingRequest = async (e, t) => {
      const { id: s } = t;
      try {
        this.isValidPing({ topic: e }), await this.sendResult({ id: s, topic: e, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_ping", { id: s, topic: e });
      } catch (i2) {
        await this.sendError({ id: s, topic: e, error: i2 }), this.client.logger.error(i2);
      }
    }, this.onSessionPingResponse = (e, t) => {
      const { id: s } = t, i2 = Ms$1("session_ping", s);
      if (this.events.listenerCount(i2) === 0)
        throw new Error(`emitting ${i2} without any listeners`);
      setTimeout(() => {
        isJsonRpcResult(t) ? this.events.emit(Ms$1("session_ping", s), {}) : isJsonRpcError(t) && this.events.emit(Ms$1("session_ping", s), { error: t.error });
      }, 500);
    }, this.onSessionDeleteRequest = async (e, t) => {
      const { id: s } = t;
      try {
        this.isValidDisconnect({ topic: e, reason: t.params }), Promise.all([new Promise((i2) => {
          this.client.core.relayer.once(w.publish, async () => {
            i2(await this.deleteSession({ topic: e, id: s }));
          });
        }), this.sendResult({ id: s, topic: e, result: true, throwOnFailedPublish: true }), this.cleanupPendingSentRequestsForTopic({ topic: e, error: er$1("USER_DISCONNECTED") })]).catch((i2) => this.client.logger.error(i2));
      } catch (i2) {
        this.client.logger.error(i2);
      }
    }, this.onSessionRequest = async (e) => {
      var t, s, i2;
      const { topic: r2, payload: n2, attestation: a2, encryptedId: c, transportType: h2 } = e, { id: p3, params: d2 } = n2;
      try {
        await this.isValidRequest(I({ topic: r2 }, d2));
        const l = this.client.session.get(r2), w2 = await this.getVerifyContext({ attestationId: a2, hash: Ou(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", d2, p3))), encryptedId: c, metadata: l.peer.metadata, transportType: h2 }), m2 = { id: p3, topic: r2, params: d2, verifyContext: w2 };
        await this.setPendingSessionRequest(m2), h2 === F$1.link_mode && (t = l.peer.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp((s = l.peer.metadata.redirect) == null ? void 0 : s.universal), (i2 = this.client.signConfig) != null && i2.disableRequestQueue ? this.emitSessionRequest(m2) : (this.addSessionRequestToSessionRequestQueue(m2), this.processSessionRequestQueue());
      } catch (l) {
        await this.sendError({ id: p3, topic: r2, error: l }), this.client.logger.error(l);
      }
    }, this.onSessionRequestResponse = (e, t) => {
      const { id: s } = t, i2 = Ms$1("session_request", s);
      if (this.events.listenerCount(i2) === 0)
        throw new Error(`emitting ${i2} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(Ms$1("session_request", s), { result: t.result }) : isJsonRpcError(t) && this.events.emit(Ms$1("session_request", s), { error: t.error });
    }, this.onSessionEventRequest = async (e, t) => {
      const { id: s, params: i2 } = t;
      try {
        const r2 = `${e}_session_event_${i2.event.name}`, n2 = Rh.get(r2);
        if (n2 && this.isRequestOutOfSync(n2, s)) {
          this.client.logger.info(`Discarding out of sync request - ${s}`);
          return;
        }
        this.isValidEmit(I({ topic: e }, i2)), this.client.events.emit("session_event", { id: s, topic: e, params: i2 }), Rh.set(r2, s);
      } catch (r2) {
        await this.sendError({ id: s, topic: e, error: r2 }), this.client.logger.error(r2);
      }
    }, this.onSessionAuthenticateResponse = (e, t) => {
      const { id: s } = t;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: e, payload: t }), isJsonRpcResult(t) ? this.events.emit(Ms$1("session_request", s), { result: t.result }) : isJsonRpcError(t) && this.events.emit(Ms$1("session_request", s), { error: t.error });
    }, this.onSessionAuthenticateRequest = async (e) => {
      var t;
      const { topic: s, payload: i2, attestation: r2, encryptedId: n2, transportType: a2 } = e;
      try {
        const { requester: c, authPayload: h2, expiryTimestamp: p3 } = i2.params, d2 = await this.getVerifyContext({ attestationId: r2, hash: Ou(JSON.stringify(i2)), encryptedId: n2, metadata: c.metadata, transportType: a2 }), l = { requester: c, pairingTopic: s, id: i2.id, authPayload: h2, verifyContext: d2, expiryTimestamp: p3 };
        await this.setAuthRequest(i2.id, { request: l, pairingTopic: s, transportType: a2 }), a2 === F$1.link_mode && (t = c.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp(c.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: s, params: i2.params, id: i2.id, verifyContext: d2 });
      } catch (c) {
        this.client.logger.error(c);
        const h2 = i2.params.requester.publicKey, p3 = await this.client.core.crypto.generateKeyPair(), d2 = this.getAppLinkIfEnabled(i2.params.requester.metadata, a2), l = { type: pr$2, receiverPublicKey: h2, senderPublicKey: p3 };
        await this.sendError({ id: i2.id, topic: s, error: c, encodeOpts: l, rpcOpts: v$1.wc_sessionAuthenticate.autoReject, appLink: d2 });
      }
    }, this.addSessionRequestToSessionRequestQueue = (e) => {
      this.sessionRequestQueue.queue.push(e);
    }, this.cleanupAfterResponse = (e) => {
      this.deletePendingSessionRequest(e.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = x$1.idle, this.processSessionRequestQueue();
      }, cjs.toMiliseconds(this.requestQueueDelay));
    }, this.cleanupPendingSentRequestsForTopic = ({ topic: e, error: t }) => {
      const s = this.client.core.history.pending;
      s.length > 0 && s.filter((i2) => i2.topic === e && i2.request.method === "wc_sessionRequest").forEach((i2) => {
        const r2 = i2.request.id, n2 = Ms$1("session_request", r2);
        if (this.events.listenerCount(n2) === 0)
          throw new Error(`emitting ${n2} without any listeners`);
        this.events.emit(Ms$1("session_request", i2.request.id), { error: t });
      });
    }, this.processSessionRequestQueue = () => {
      if (this.sessionRequestQueue.state === x$1.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const e = this.sessionRequestQueue.queue[0];
      if (!e) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = x$1.active, this.emitSessionRequest(e);
      } catch (t) {
        this.client.logger.error(t);
      }
    }, this.emitSessionRequest = (e) => {
      this.client.events.emit("session_request", e);
    }, this.onPairingCreated = (e) => {
      if (e.methods && this.expectedPairingMethodMap.set(e.topic, e.methods), e.active)
        return;
      const t = this.client.proposal.getAll().find((s) => s.pairingTopic === e.topic);
      t && this.onSessionProposeRequest({ topic: e.topic, payload: formatJsonRpcRequest("wc_sessionPropose", { requiredNamespaces: t.requiredNamespaces, optionalNamespaces: t.optionalNamespaces, relays: t.relays, proposer: t.proposer, sessionProperties: t.sessionProperties }, t.id) });
    }, this.isValidConnect = async (e) => {
      if (!Ah(e)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e)}`);
        throw new Error(a2);
      }
      const { pairingTopic: t, requiredNamespaces: s, optionalNamespaces: i2, sessionProperties: r2, relays: n2 } = e;
      if (Pe(t) || await this.isValidPairingTopic(t), !gh(n2, true)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", `connect() relays: ${n2}`);
        throw new Error(a2);
      }
      !Pe(s) && Xr$1(s) !== 0 && this.validateNamespaces(s, "requiredNamespaces"), !Pe(i2) && Xr$1(i2) !== 0 && this.validateNamespaces(i2, "optionalNamespaces"), Pe(r2) || this.validateSessionProps(r2, "sessionProperties");
    }, this.validateNamespaces = (e, t) => {
      const s = vh(e, "connect()", t);
      if (s)
        throw new Error(s.message);
    }, this.isValidApprove = async (e) => {
      if (!Ah(e))
        throw new Error(xe$1("MISSING_OR_INVALID", `approve() params: ${e}`).message);
      const { id: t, namespaces: s, relayProtocol: i2, sessionProperties: r2 } = e;
      this.checkRecentlyDeleted(t), await this.isValidProposalId(t);
      const n2 = this.client.proposal.get(t), a2 = Oo(s, "approve()");
      if (a2)
        throw new Error(a2.message);
      const c = To(n2.requiredNamespaces, s, "approve()");
      if (c)
        throw new Error(c.message);
      if (!Yt$1(i2, true)) {
        const { message: h2 } = xe$1("MISSING_OR_INVALID", `approve() relayProtocol: ${i2}`);
        throw new Error(h2);
      }
      Pe(r2) || this.validateSessionProps(r2, "sessionProperties");
    }, this.isValidReject = async (e) => {
      if (!Ah(e)) {
        const { message: i2 } = xe$1("MISSING_OR_INVALID", `reject() params: ${e}`);
        throw new Error(i2);
      }
      const { id: t, reason: s } = e;
      if (this.checkRecentlyDeleted(t), await this.isValidProposalId(t), !bh(s)) {
        const { message: i2 } = xe$1("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(s)}`);
        throw new Error(i2);
      }
    }, this.isValidSessionSettleRequest = (e) => {
      if (!Ah(e)) {
        const { message: c } = xe$1("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e}`);
        throw new Error(c);
      }
      const { relay: t, controller: s, namespaces: i2, expiry: r2 } = e;
      if (!Po(t)) {
        const { message: c } = xe$1("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(c);
      }
      const n2 = ph(s, "onSessionSettleRequest()");
      if (n2)
        throw new Error(n2.message);
      const a2 = Oo(i2, "onSessionSettleRequest()");
      if (a2)
        throw new Error(a2.message);
      if (xs$1(r2)) {
        const { message: c } = xe$1("EXPIRED", "onSessionSettleRequest()");
        throw new Error(c);
      }
    }, this.isValidUpdate = async (e) => {
      if (!Ah(e)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", `update() params: ${e}`);
        throw new Error(a2);
      }
      const { topic: t, namespaces: s } = e;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const i2 = this.client.session.get(t), r2 = Oo(s, "update()");
      if (r2)
        throw new Error(r2.message);
      const n2 = To(i2.requiredNamespaces, s, "update()");
      if (n2)
        throw new Error(n2.message);
    }, this.isValidExtend = async (e) => {
      if (!Ah(e)) {
        const { message: s } = xe$1("MISSING_OR_INVALID", `extend() params: ${e}`);
        throw new Error(s);
      }
      const { topic: t } = e;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
    }, this.isValidRequest = async (e) => {
      if (!Ah(e)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", `request() params: ${e}`);
        throw new Error(a2);
      }
      const { topic: t, request: s, chainId: i2, expiry: r2 } = e;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const { namespaces: n2 } = this.client.session.get(t);
      if (!Mh(n2, i2)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", `request() chainId: ${i2}`);
        throw new Error(a2);
      }
      if (!yh(s)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", `request() ${JSON.stringify(s)}`);
        throw new Error(a2);
      }
      if (!Eh(n2, i2, s.method)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", `request() method: ${s.method}`);
        throw new Error(a2);
      }
      if (r2 && !_h(r2, me)) {
        const { message: a2 } = xe$1("MISSING_OR_INVALID", `request() expiry: ${r2}. Expiry must be a number (in seconds) between ${me.min} and ${me.max}`);
        throw new Error(a2);
      }
    }, this.isValidRespond = async (e) => {
      var t;
      if (!Ah(e)) {
        const { message: r2 } = xe$1("MISSING_OR_INVALID", `respond() params: ${e}`);
        throw new Error(r2);
      }
      const { topic: s, response: i2 } = e;
      try {
        await this.isValidSessionTopic(s);
      } catch (r2) {
        throw (t = e == null ? void 0 : e.response) != null && t.id && this.cleanupAfterResponse(e), r2;
      }
      if (!wh(i2)) {
        const { message: r2 } = xe$1("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i2)}`);
        throw new Error(r2);
      }
    }, this.isValidPing = async (e) => {
      if (!Ah(e)) {
        const { message: s } = xe$1("MISSING_OR_INVALID", `ping() params: ${e}`);
        throw new Error(s);
      }
      const { topic: t } = e;
      await this.isValidSessionOrPairingTopic(t);
    }, this.isValidEmit = async (e) => {
      if (!Ah(e)) {
        const { message: n2 } = xe$1("MISSING_OR_INVALID", `emit() params: ${e}`);
        throw new Error(n2);
      }
      const { topic: t, event: s, chainId: i2 } = e;
      await this.isValidSessionTopic(t);
      const { namespaces: r2 } = this.client.session.get(t);
      if (!Mh(r2, i2)) {
        const { message: n2 } = xe$1("MISSING_OR_INVALID", `emit() chainId: ${i2}`);
        throw new Error(n2);
      }
      if (!xh(s)) {
        const { message: n2 } = xe$1("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s)}`);
        throw new Error(n2);
      }
      if (!Sh(r2, i2, s.name)) {
        const { message: n2 } = xe$1("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s)}`);
        throw new Error(n2);
      }
    }, this.isValidDisconnect = async (e) => {
      if (!Ah(e)) {
        const { message: s } = xe$1("MISSING_OR_INVALID", `disconnect() params: ${e}`);
        throw new Error(s);
      }
      const { topic: t } = e;
      await this.isValidSessionOrPairingTopic(t);
    }, this.isValidAuthenticate = (e) => {
      const { chains: t, uri: s, domain: i2, nonce: r2 } = e;
      if (!Array.isArray(t) || t.length === 0)
        throw new Error("chains is required and must be a non-empty array");
      if (!Yt$1(s, false))
        throw new Error("uri is required parameter");
      if (!Yt$1(i2, false))
        throw new Error("domain is required parameter");
      if (!Yt$1(r2, false))
        throw new Error("nonce is required parameter");
      if ([...new Set(t.map((a2) => An(a2).namespace))].length > 1)
        throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: n2 } = An(t[0]);
      if (n2 !== "eip155")
        throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }, this.getVerifyContext = async (e) => {
      const { attestationId: t, hash: s, encryptedId: i2, metadata: r2, transportType: n2 } = e, a2 = { verified: { verifyUrl: r2.verifyUrl || Z, validation: "UNKNOWN", origin: r2.url || "" } };
      try {
        if (n2 === F$1.link_mode) {
          const h2 = this.getAppLinkIfEnabled(r2, n2);
          return a2.verified.validation = h2 && new URL(h2).origin === new URL(r2.url).origin ? "VALID" : "INVALID", a2;
        }
        const c = await this.client.core.verify.resolve({ attestationId: t, hash: s, encryptedId: i2, verifyUrl: r2.verifyUrl });
        c && (a2.verified.origin = c.origin, a2.verified.isScam = c.isScam, a2.verified.validation = c.origin === new URL(r2.url).origin ? "VALID" : "INVALID");
      } catch (c) {
        this.client.logger.warn(c);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(a2)}`), a2;
    }, this.validateSessionProps = (e, t) => {
      Object.values(e).forEach((s) => {
        if (!Yt$1(s, false)) {
          const { message: i2 } = xe$1("MISSING_OR_INVALID", `${t} must be in Record<string, string> format. Received: ${JSON.stringify(s)}`);
          throw new Error(i2);
        }
      });
    }, this.getPendingAuthRequest = (e) => {
      const t = this.client.auth.requests.get(e);
      return typeof t == "object" ? t : void 0;
    }, this.addToRecentlyDeleted = (e, t) => {
      if (this.recentlyDeletedMap.set(e, t), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let s = 0;
        const i2 = this.recentlyDeletedLimit / 2;
        for (const r2 of this.recentlyDeletedMap.keys()) {
          if (s++ >= i2)
            break;
          this.recentlyDeletedMap.delete(r2);
        }
      }
    }, this.checkRecentlyDeleted = (e) => {
      const t = this.recentlyDeletedMap.get(e);
      if (t) {
        const { message: s } = xe$1("MISSING_OR_INVALID", `Record was recently deleted - ${t}: ${e}`);
        throw new Error(s);
      }
    }, this.isLinkModeEnabled = (e, t) => {
      var s, i2, r2, n2, a2, c, h2, p3, d2;
      return !e || t !== F$1.link_mode ? false : ((i2 = (s = this.client.metadata) == null ? void 0 : s.redirect) == null ? void 0 : i2.linkMode) === true && ((n2 = (r2 = this.client.metadata) == null ? void 0 : r2.redirect) == null ? void 0 : n2.universal) !== void 0 && ((c = (a2 = this.client.metadata) == null ? void 0 : a2.redirect) == null ? void 0 : c.universal) !== "" && ((h2 = e == null ? void 0 : e.redirect) == null ? void 0 : h2.universal) !== void 0 && ((p3 = e == null ? void 0 : e.redirect) == null ? void 0 : p3.universal) !== "" && ((d2 = e == null ? void 0 : e.redirect) == null ? void 0 : d2.linkMode) === true && this.client.core.linkModeSupportedApps.includes(e.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }, this.getAppLinkIfEnabled = (e, t) => {
      var s;
      return this.isLinkModeEnabled(e, t) ? (s = e == null ? void 0 : e.redirect) == null ? void 0 : s.universal : void 0;
    }, this.handleLinkModeMessage = ({ url: e }) => {
      if (!e || !e.includes("wc_ev") || !e.includes("topic"))
        return;
      const t = Is$2(e, "topic") || "", s = decodeURIComponent(Is$2(e, "wc_ev") || ""), i2 = this.client.session.keys.includes(t);
      i2 && this.client.session.update(t, { transportType: F$1.link_mode }), this.client.core.dispatchEnvelope({ topic: t, message: s, sessionExists: i2 });
    }, this.registerLinkModeListeners = async () => {
      var e;
      if (_s$1() || rr$1() && (e = this.client.metadata.redirect) != null && e.linkMode) {
        const t = global == null ? void 0 : global.Linking;
        if (typeof t < "u") {
          t.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const s = await t.getInitialURL();
          s && setTimeout(() => {
            this.handleLinkModeMessage({ url: s });
          }, 50);
        }
      }
    };
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: o2 } = xe$1("NOT_INITIALIZED", this.name);
      throw new Error(o2);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(w.message, (o2) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(o2) : this.onRelayMessage(o2);
    });
  }
  async onRelayMessage(o2) {
    const { topic: e, message: t, attestation: s, transportType: i2 } = o2, { publicKey: r2 } = this.client.auth.authKeys.keys.includes(ae) ? this.client.auth.authKeys.get(ae) : { responseTopic: void 0, publicKey: void 0 }, n2 = await this.client.core.crypto.decode(e, t, { receiverPublicKey: r2, encoding: i2 === F$1.link_mode ? Iu : tn$1 });
    try {
      isJsonRpcRequest(n2) ? (this.client.core.history.set(e, n2), this.onRelayEventRequest({ topic: e, payload: n2, attestation: s, transportType: i2, encryptedId: Ou(t) })) : isJsonRpcResponse(n2) ? (await this.client.core.history.resolve(n2), await this.onRelayEventResponse({ topic: e, payload: n2, transportType: i2 }), this.client.core.history.delete(e, n2.id)) : this.onRelayEventUnknownPayload({ topic: e, payload: n2, transportType: i2 });
    } catch (a2) {
      this.client.logger.error(a2);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(R$1.expired, async (o2) => {
      const { topic: e, id: t } = ys$1(o2.target);
      if (t && this.client.pendingRequest.keys.includes(t))
        return await this.deletePendingSessionRequest(t, xe$1("EXPIRED"), true);
      if (t && this.client.auth.requests.keys.includes(t))
        return await this.deletePendingAuthRequest(t, xe$1("EXPIRED"), true);
      e ? this.client.session.keys.includes(e) && (await this.deleteSession({ topic: e, expirerHasDeleted: true }), this.client.events.emit("session_expire", { topic: e })) : t && (await this.deleteProposal(t, true), this.client.events.emit("proposal_expire", { id: t }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(q$1.create, (o2) => this.onPairingCreated(o2)), this.client.core.pairing.events.on(q$1.delete, (o2) => {
      this.addToRecentlyDeleted(o2.topic, "pairing");
    });
  }
  isValidPairingTopic(o2) {
    if (!Yt$1(o2, false)) {
      const { message: e } = xe$1("MISSING_OR_INVALID", `pairing topic should be a string: ${o2}`);
      throw new Error(e);
    }
    if (!this.client.core.pairing.pairings.keys.includes(o2)) {
      const { message: e } = xe$1("NO_MATCHING_KEY", `pairing topic doesn't exist: ${o2}`);
      throw new Error(e);
    }
    if (xs$1(this.client.core.pairing.pairings.get(o2).expiry)) {
      const { message: e } = xe$1("EXPIRED", `pairing topic: ${o2}`);
      throw new Error(e);
    }
  }
  async isValidSessionTopic(o2) {
    if (!Yt$1(o2, false)) {
      const { message: e } = xe$1("MISSING_OR_INVALID", `session topic should be a string: ${o2}`);
      throw new Error(e);
    }
    if (this.checkRecentlyDeleted(o2), !this.client.session.keys.includes(o2)) {
      const { message: e } = xe$1("NO_MATCHING_KEY", `session topic doesn't exist: ${o2}`);
      throw new Error(e);
    }
    if (xs$1(this.client.session.get(o2).expiry)) {
      await this.deleteSession({ topic: o2 });
      const { message: e } = xe$1("EXPIRED", `session topic: ${o2}`);
      throw new Error(e);
    }
    if (!this.client.core.crypto.keychain.has(o2)) {
      const { message: e } = xe$1("MISSING_OR_INVALID", `session topic does not exist in keychain: ${o2}`);
      throw await this.deleteSession({ topic: o2 }), new Error(e);
    }
  }
  async isValidSessionOrPairingTopic(o2) {
    if (this.checkRecentlyDeleted(o2), this.client.session.keys.includes(o2))
      await this.isValidSessionTopic(o2);
    else if (this.client.core.pairing.pairings.keys.includes(o2))
      this.isValidPairingTopic(o2);
    else if (Yt$1(o2, false)) {
      const { message: e } = xe$1("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${o2}`);
      throw new Error(e);
    } else {
      const { message: e } = xe$1("MISSING_OR_INVALID", `session or pairing topic should be a string: ${o2}`);
      throw new Error(e);
    }
  }
  async isValidProposalId(o2) {
    if (!mh(o2)) {
      const { message: e } = xe$1("MISSING_OR_INVALID", `proposal id should be a number: ${o2}`);
      throw new Error(e);
    }
    if (!this.client.proposal.keys.includes(o2)) {
      const { message: e } = xe$1("NO_MATCHING_KEY", `proposal id doesn't exist: ${o2}`);
      throw new Error(e);
    }
    if (xs$1(this.client.proposal.get(o2).expiryTimestamp)) {
      await this.deleteProposal(o2);
      const { message: e } = xe$1("EXPIRED", `proposal id: ${o2}`);
      throw new Error(e);
    }
  }
}
class Ss extends ai {
  constructor(o2, e) {
    super(o2, e, st, ye), this.core = o2, this.logger = e;
  }
}
class yt extends ai {
  constructor(o2, e) {
    super(o2, e, rt, ye), this.core = o2, this.logger = e;
  }
}
class Is extends ai {
  constructor(o2, e) {
    super(o2, e, ot, ye, (t) => t.id), this.core = o2, this.logger = e;
  }
}
class fs extends ai {
  constructor(o2, e) {
    super(o2, e, pt, oe, () => ae), this.core = o2, this.logger = e;
  }
}
class vs extends ai {
  constructor(o2, e) {
    super(o2, e, ht, oe), this.core = o2, this.logger = e;
  }
}
class qs extends ai {
  constructor(o2, e) {
    super(o2, e, dt, oe, (t) => t.id), this.core = o2, this.logger = e;
  }
}
class Ts {
  constructor(o2, e) {
    this.core = o2, this.logger = e, this.authKeys = new fs(this.core, this.logger), this.pairingTopics = new vs(this.core, this.logger), this.requests = new qs(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
}
class _e extends S {
  constructor(o2) {
    super(o2), this.protocol = be, this.version = Ce, this.name = we.name, this.events = new eventsExports.EventEmitter(), this.on = (t, s) => this.events.on(t, s), this.once = (t, s) => this.events.once(t, s), this.off = (t, s) => this.events.off(t, s), this.removeListener = (t, s) => this.events.removeListener(t, s), this.removeAllListeners = (t) => this.events.removeAllListeners(t), this.connect = async (t) => {
      try {
        return await this.engine.connect(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.pair = async (t) => {
      try {
        return await this.engine.pair(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.approve = async (t) => {
      try {
        return await this.engine.approve(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.reject = async (t) => {
      try {
        return await this.engine.reject(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.update = async (t) => {
      try {
        return await this.engine.update(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.extend = async (t) => {
      try {
        return await this.engine.extend(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.request = async (t) => {
      try {
        return await this.engine.request(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.respond = async (t) => {
      try {
        return await this.engine.respond(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.ping = async (t) => {
      try {
        return await this.engine.ping(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.emit = async (t) => {
      try {
        return await this.engine.emit(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.disconnect = async (t) => {
      try {
        return await this.engine.disconnect(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.find = (t) => {
      try {
        return this.engine.find(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.getPendingSessionRequests = () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.authenticate = async (t, s) => {
      try {
        return await this.engine.authenticate(t, s);
      } catch (i2) {
        throw this.logger.error(i2.message), i2;
      }
    }, this.formatAuthMessage = (t) => {
      try {
        return this.engine.formatAuthMessage(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.approveSessionAuthenticate = async (t) => {
      try {
        return await this.engine.approveSessionAuthenticate(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.rejectSessionAuthenticate = async (t) => {
      try {
        return await this.engine.rejectSessionAuthenticate(t);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.name = (o2 == null ? void 0 : o2.name) || we.name, this.metadata = (o2 == null ? void 0 : o2.metadata) || fs$1(), this.signConfig = o2 == null ? void 0 : o2.signConfig;
    const e = typeof (o2 == null ? void 0 : o2.logger) < "u" && typeof (o2 == null ? void 0 : o2.logger) != "string" ? o2.logger : Mg(k({ level: (o2 == null ? void 0 : o2.logger) || we.logger }));
    this.core = (o2 == null ? void 0 : o2.core) || new On(o2), this.logger = E$1(e, this.name), this.session = new yt(this.core, this.logger), this.proposal = new Ss(this.core, this.logger), this.pendingRequest = new Is(this.core, this.logger), this.engine = new Rs(this), this.auth = new Ts(this.core, this.logger);
  }
  static async init(o2) {
    const e = new _e(o2);
    return await e.initialize(), e;
  }
  get context() {
    return y$3(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), this.engine.processRelayMessageCache();
    } catch (o2) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(o2.message), o2;
    }
  }
}
const ya = "error", Yg = "wss://relay.walletconnect.org", Zg = "wc", Xg = "universal_provider", Sa = `${Zg}@2:${Xg}:`, Oa = "https://rpc.walletconnect.org/v1/", ze = "generic", Qg = `${Oa}bundler`, Tt = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
var _n = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, qi = { exports: {} };
/**
* @license
* Lodash <https://lodash.com/>
* Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
* Released under MIT license <https://lodash.com/license>
* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*/
(function(P2, s) {
  (function() {
    var i2, p3 = "4.17.21", w2 = 200, I2 = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", y3 = "Expected a function", J = "Invalid `variable` option passed into `_.template`", Ht2 = "__lodash_hash_undefined__", Ke = 500, Ie2 = "__lodash_placeholder__", Dt2 = 1, Bt2 = 2, xe2 = 4, Ee2 = 1, mn2 = 2, vt2 = 1, he2 = 2, Gi2 = 4, Nt2 = 8, ye2 = 16, $t2 = 32, Se = 64, Gt2 = 128, Je = 256, gr2 = 512, Ma2 = 30, Ba2 = "...", Ga2 = 800, za2 = 16, zi2 = 1, Ka2 = 2, Ja2 = 3, le2 = 1 / 0, ee2 = 9007199254740991, Ya2 = 17976931348623157e292, wn2 = 0 / 0, Ut3 = 4294967295, Za2 = Ut3 - 1, Xa2 = Ut3 >>> 1, Qa2 = [["ary", Gt2], ["bind", vt2], ["bindKey", he2], ["curry", Nt2], ["curryRight", ye2], ["flip", gr2], ["partial", $t2], ["partialRight", Se], ["rearg", Je]], Oe2 = "[object Arguments]", Pn2 = "[object Array]", Va2 = "[object AsyncFunction]", Ye = "[object Boolean]", Ze2 = "[object Date]", ka2 = "[object DOMException]", Cn2 = "[object Error]", An2 = "[object Function]", Ki2 = "[object GeneratorFunction]", Et2 = "[object Map]", Xe2 = "[object Number]", ja2 = "[object Null]", zt2 = "[object Object]", Ji2 = "[object Promise]", to2 = "[object Proxy]", Qe2 = "[object RegExp]", yt2 = "[object Set]", Ve = "[object String]", In2 = "[object Symbol]", eo2 = "[object Undefined]", ke = "[object WeakMap]", no2 = "[object WeakSet]", je = "[object ArrayBuffer]", Re2 = "[object DataView]", vr3 = "[object Float32Array]", _r2 = "[object Float64Array]", mr2 = "[object Int8Array]", wr2 = "[object Int16Array]", Pr2 = "[object Int32Array]", Cr2 = "[object Uint8Array]", Ar2 = "[object Uint8ClampedArray]", Ir2 = "[object Uint16Array]", xr2 = "[object Uint32Array]", ro2 = /\b__p \+= '';/g, io = /\b(__p \+=) '' \+/g, so2 = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Yi2 = /&(?:amp|lt|gt|quot|#39);/g, Zi2 = /[&<>"']/g, uo2 = RegExp(Yi2.source), ao2 = RegExp(Zi2.source), oo2 = /<%-([\s\S]+?)%>/g, co2 = /<%([\s\S]+?)%>/g, Xi2 = /<%=([\s\S]+?)%>/g, fo = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ho2 = /^\w*$/, lo2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Er2 = /[\\^$.*+?()[\]{}|]/g, po2 = RegExp(Er2.source), yr2 = /^\s+/, go2 = /\s/, vo2 = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, _o2 = /\{\n\/\* \[wrapped with (.+)\] \*/, mo = /,? & /, wo2 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Po2 = /[()=,{}\[\]\/\s]/, Co2 = /\\(\\)?/g, Ao = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Qi2 = /\w*$/, Io2 = /^[-+]0x[0-9a-f]+$/i, xo2 = /^0b[01]+$/i, Eo2 = /^\[object .+?Constructor\]$/, yo2 = /^0o[0-7]+$/i, So2 = /^(?:0|[1-9]\d*)$/, Oo2 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, xn2 = /($^)/, Ro2 = /['\n\r\u2028\u2029\\]/g, En2 = "\\ud800-\\udfff", bo2 = "\\u0300-\\u036f", To2 = "\\ufe20-\\ufe2f", Lo = "\\u20d0-\\u20ff", Vi2 = bo2 + To2 + Lo, ki2 = "\\u2700-\\u27bf", ji2 = "a-z\\xdf-\\xf6\\xf8-\\xff", Ho = "\\xac\\xb1\\xd7\\xf7", Do2 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", No2 = "\\u2000-\\u206f", $o = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", ts2 = "A-Z\\xc0-\\xd6\\xd8-\\xde", es2 = "\\ufe0e\\ufe0f", ns2 = Ho + Do2 + No2 + $o, Sr2 = "['’]", Uo2 = "[" + En2 + "]", rs = "[" + ns2 + "]", yn2 = "[" + Vi2 + "]", is = "\\d+", qo2 = "[" + ki2 + "]", ss2 = "[" + ji2 + "]", us = "[^" + En2 + ns2 + is + ki2 + ji2 + ts2 + "]", Or2 = "\\ud83c[\\udffb-\\udfff]", Fo2 = "(?:" + yn2 + "|" + Or2 + ")", as = "[^" + En2 + "]", Rr2 = "(?:\\ud83c[\\udde6-\\uddff]){2}", br2 = "[\\ud800-\\udbff][\\udc00-\\udfff]", be2 = "[" + ts2 + "]", os = "\\u200d", cs2 = "(?:" + ss2 + "|" + us + ")", Wo2 = "(?:" + be2 + "|" + us + ")", fs2 = "(?:" + Sr2 + "(?:d|ll|m|re|s|t|ve))?", hs = "(?:" + Sr2 + "(?:D|LL|M|RE|S|T|VE))?", ls2 = Fo2 + "?", ps = "[" + es2 + "]?", Mo2 = "(?:" + os + "(?:" + [as, Rr2, br2].join("|") + ")" + ps + ls2 + ")*", Bo2 = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Go = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ds = ps + ls2 + Mo2, zo = "(?:" + [qo2, Rr2, br2].join("|") + ")" + ds, Ko2 = "(?:" + [as + yn2 + "?", yn2, Rr2, br2, Uo2].join("|") + ")", Jo = RegExp(Sr2, "g"), Yo = RegExp(yn2, "g"), Tr2 = RegExp(Or2 + "(?=" + Or2 + ")|" + Ko2 + ds, "g"), Zo2 = RegExp([be2 + "?" + ss2 + "+" + fs2 + "(?=" + [rs, be2, "$"].join("|") + ")", Wo2 + "+" + hs + "(?=" + [rs, be2 + cs2, "$"].join("|") + ")", be2 + "?" + cs2 + "+" + fs2, be2 + "+" + hs, Go, Bo2, is, zo].join("|"), "g"), Xo = RegExp("[" + os + En2 + Vi2 + es2 + "]"), Qo = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Vo = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], ko2 = -1, G2 = {};
    G2[vr3] = G2[_r2] = G2[mr2] = G2[wr2] = G2[Pr2] = G2[Cr2] = G2[Ar2] = G2[Ir2] = G2[xr2] = true, G2[Oe2] = G2[Pn2] = G2[je] = G2[Ye] = G2[Re2] = G2[Ze2] = G2[Cn2] = G2[An2] = G2[Et2] = G2[Xe2] = G2[zt2] = G2[Qe2] = G2[yt2] = G2[Ve] = G2[ke] = false;
    var B = {};
    B[Oe2] = B[Pn2] = B[je] = B[Re2] = B[Ye] = B[Ze2] = B[vr3] = B[_r2] = B[mr2] = B[wr2] = B[Pr2] = B[Et2] = B[Xe2] = B[zt2] = B[Qe2] = B[yt2] = B[Ve] = B[In2] = B[Cr2] = B[Ar2] = B[Ir2] = B[xr2] = true, B[Cn2] = B[An2] = B[ke] = false;
    var jo = { À: "A", Á: "A", Â: "A", Ã: "A", Ä: "A", Å: "A", à: "a", á: "a", â: "a", ã: "a", ä: "a", å: "a", Ç: "C", ç: "c", Ð: "D", ð: "d", È: "E", É: "E", Ê: "E", Ë: "E", è: "e", é: "e", ê: "e", ë: "e", Ì: "I", Í: "I", Î: "I", Ï: "I", ì: "i", í: "i", î: "i", ï: "i", Ñ: "N", ñ: "n", Ò: "O", Ó: "O", Ô: "O", Õ: "O", Ö: "O", Ø: "O", ò: "o", ó: "o", ô: "o", õ: "o", ö: "o", ø: "o", Ù: "U", Ú: "U", Û: "U", Ü: "U", ù: "u", ú: "u", û: "u", ü: "u", Ý: "Y", ý: "y", ÿ: "y", Æ: "Ae", æ: "ae", Þ: "Th", þ: "th", ß: "ss", Ā: "A", Ă: "A", Ą: "A", ā: "a", ă: "a", ą: "a", Ć: "C", Ĉ: "C", Ċ: "C", Č: "C", ć: "c", ĉ: "c", ċ: "c", č: "c", Ď: "D", Đ: "D", ď: "d", đ: "d", Ē: "E", Ĕ: "E", Ė: "E", Ę: "E", Ě: "E", ē: "e", ĕ: "e", ė: "e", ę: "e", ě: "e", Ĝ: "G", Ğ: "G", Ġ: "G", Ģ: "G", ĝ: "g", ğ: "g", ġ: "g", ģ: "g", Ĥ: "H", Ħ: "H", ĥ: "h", ħ: "h", Ĩ: "I", Ī: "I", Ĭ: "I", Į: "I", İ: "I", ĩ: "i", ī: "i", ĭ: "i", į: "i", ı: "i", Ĵ: "J", ĵ: "j", Ķ: "K", ķ: "k", ĸ: "k", Ĺ: "L", Ļ: "L", Ľ: "L", Ŀ: "L", Ł: "L", ĺ: "l", ļ: "l", ľ: "l", ŀ: "l", ł: "l", Ń: "N", Ņ: "N", Ň: "N", Ŋ: "N", ń: "n", ņ: "n", ň: "n", ŋ: "n", Ō: "O", Ŏ: "O", Ő: "O", ō: "o", ŏ: "o", ő: "o", Ŕ: "R", Ŗ: "R", Ř: "R", ŕ: "r", ŗ: "r", ř: "r", Ś: "S", Ŝ: "S", Ş: "S", Š: "S", ś: "s", ŝ: "s", ş: "s", š: "s", Ţ: "T", Ť: "T", Ŧ: "T", ţ: "t", ť: "t", ŧ: "t", Ũ: "U", Ū: "U", Ŭ: "U", Ů: "U", Ű: "U", Ų: "U", ũ: "u", ū: "u", ŭ: "u", ů: "u", ű: "u", ų: "u", Ŵ: "W", ŵ: "w", Ŷ: "Y", ŷ: "y", Ÿ: "Y", Ź: "Z", Ż: "Z", Ž: "Z", ź: "z", ż: "z", ž: "z", Ĳ: "IJ", ĳ: "ij", Œ: "Oe", œ: "oe", ŉ: "'n", ſ: "s" }, tc = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, ec = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, nc = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, rc = parseFloat, ic = parseInt, gs2 = typeof _n == "object" && _n && _n.Object === Object && _n, sc = typeof self == "object" && self && self.Object === Object && self, j2 = gs2 || sc || Function("return this")(), Lr2 = s && !s.nodeType && s, pe2 = Lr2 && true && P2 && !P2.nodeType && P2, vs2 = pe2 && pe2.exports === Lr2, Hr2 = vs2 && gs2.process, _t2 = function() {
      try {
        var h2 = pe2 && pe2.require && pe2.require("util").types;
        return h2 || Hr2 && Hr2.binding && Hr2.binding("util");
      } catch {
      }
    }(), _s2 = _t2 && _t2.isArrayBuffer, ms2 = _t2 && _t2.isDate, ws2 = _t2 && _t2.isMap, Ps2 = _t2 && _t2.isRegExp, Cs2 = _t2 && _t2.isSet, As2 = _t2 && _t2.isTypedArray;
    function ft2(h2, g3, d2) {
      switch (d2.length) {
        case 0:
          return h2.call(g3);
        case 1:
          return h2.call(g3, d2[0]);
        case 2:
          return h2.call(g3, d2[0], d2[1]);
        case 3:
          return h2.call(g3, d2[0], d2[1], d2[2]);
      }
      return h2.apply(g3, d2);
    }
    function uc(h2, g3, d2, A2) {
      for (var R2 = -1, U2 = h2 == null ? 0 : h2.length; ++R2 < U2; ) {
        var Q2 = h2[R2];
        g3(A2, Q2, d2(Q2), h2);
      }
      return A2;
    }
    function mt2(h2, g3) {
      for (var d2 = -1, A2 = h2 == null ? 0 : h2.length; ++d2 < A2 && g3(h2[d2], d2, h2) !== false; )
        ;
      return h2;
    }
    function ac(h2, g3) {
      for (var d2 = h2 == null ? 0 : h2.length; d2-- && g3(h2[d2], d2, h2) !== false; )
        ;
      return h2;
    }
    function Is2(h2, g3) {
      for (var d2 = -1, A2 = h2 == null ? 0 : h2.length; ++d2 < A2; )
        if (!g3(h2[d2], d2, h2))
          return false;
      return true;
    }
    function ne2(h2, g3) {
      for (var d2 = -1, A2 = h2 == null ? 0 : h2.length, R2 = 0, U2 = []; ++d2 < A2; ) {
        var Q2 = h2[d2];
        g3(Q2, d2, h2) && (U2[R2++] = Q2);
      }
      return U2;
    }
    function Sn2(h2, g3) {
      var d2 = h2 == null ? 0 : h2.length;
      return !!d2 && Te2(h2, g3, 0) > -1;
    }
    function Dr2(h2, g3, d2) {
      for (var A2 = -1, R2 = h2 == null ? 0 : h2.length; ++A2 < R2; )
        if (d2(g3, h2[A2]))
          return true;
      return false;
    }
    function z3(h2, g3) {
      for (var d2 = -1, A2 = h2 == null ? 0 : h2.length, R2 = Array(A2); ++d2 < A2; )
        R2[d2] = g3(h2[d2], d2, h2);
      return R2;
    }
    function re2(h2, g3) {
      for (var d2 = -1, A2 = g3.length, R2 = h2.length; ++d2 < A2; )
        h2[R2 + d2] = g3[d2];
      return h2;
    }
    function Nr2(h2, g3, d2, A2) {
      var R2 = -1, U2 = h2 == null ? 0 : h2.length;
      for (A2 && U2 && (d2 = h2[++R2]); ++R2 < U2; )
        d2 = g3(d2, h2[R2], R2, h2);
      return d2;
    }
    function oc(h2, g3, d2, A2) {
      var R2 = h2 == null ? 0 : h2.length;
      for (A2 && R2 && (d2 = h2[--R2]); R2--; )
        d2 = g3(d2, h2[R2], R2, h2);
      return d2;
    }
    function $r2(h2, g3) {
      for (var d2 = -1, A2 = h2 == null ? 0 : h2.length; ++d2 < A2; )
        if (g3(h2[d2], d2, h2))
          return true;
      return false;
    }
    var cc = Ur2("length");
    function fc(h2) {
      return h2.split("");
    }
    function hc(h2) {
      return h2.match(wo2) || [];
    }
    function xs2(h2, g3, d2) {
      var A2;
      return d2(h2, function(R2, U2, Q2) {
        if (g3(R2, U2, Q2))
          return A2 = U2, false;
      }), A2;
    }
    function On2(h2, g3, d2, A2) {
      for (var R2 = h2.length, U2 = d2 + (A2 ? 1 : -1); A2 ? U2-- : ++U2 < R2; )
        if (g3(h2[U2], U2, h2))
          return U2;
      return -1;
    }
    function Te2(h2, g3, d2) {
      return g3 === g3 ? Ic(h2, g3, d2) : On2(h2, Es2, d2);
    }
    function lc(h2, g3, d2, A2) {
      for (var R2 = d2 - 1, U2 = h2.length; ++R2 < U2; )
        if (A2(h2[R2], g3))
          return R2;
      return -1;
    }
    function Es2(h2) {
      return h2 !== h2;
    }
    function ys2(h2, g3) {
      var d2 = h2 == null ? 0 : h2.length;
      return d2 ? Fr2(h2, g3) / d2 : wn2;
    }
    function Ur2(h2) {
      return function(g3) {
        return g3 == null ? i2 : g3[h2];
      };
    }
    function qr2(h2) {
      return function(g3) {
        return h2 == null ? i2 : h2[g3];
      };
    }
    function Ss2(h2, g3, d2, A2, R2) {
      return R2(h2, function(U2, Q2, M3) {
        d2 = A2 ? (A2 = false, U2) : g3(d2, U2, Q2, M3);
      }), d2;
    }
    function pc(h2, g3) {
      var d2 = h2.length;
      for (h2.sort(g3); d2--; )
        h2[d2] = h2[d2].value;
      return h2;
    }
    function Fr2(h2, g3) {
      for (var d2, A2 = -1, R2 = h2.length; ++A2 < R2; ) {
        var U2 = g3(h2[A2]);
        U2 !== i2 && (d2 = d2 === i2 ? U2 : d2 + U2);
      }
      return d2;
    }
    function Wr2(h2, g3) {
      for (var d2 = -1, A2 = Array(h2); ++d2 < h2; )
        A2[d2] = g3(d2);
      return A2;
    }
    function dc(h2, g3) {
      return z3(g3, function(d2) {
        return [d2, h2[d2]];
      });
    }
    function Os2(h2) {
      return h2 && h2.slice(0, Ls2(h2) + 1).replace(yr2, "");
    }
    function ht2(h2) {
      return function(g3) {
        return h2(g3);
      };
    }
    function Mr2(h2, g3) {
      return z3(g3, function(d2) {
        return h2[d2];
      });
    }
    function tn2(h2, g3) {
      return h2.has(g3);
    }
    function Rs2(h2, g3) {
      for (var d2 = -1, A2 = h2.length; ++d2 < A2 && Te2(g3, h2[d2], 0) > -1; )
        ;
      return d2;
    }
    function bs2(h2, g3) {
      for (var d2 = h2.length; d2-- && Te2(g3, h2[d2], 0) > -1; )
        ;
      return d2;
    }
    function gc(h2, g3) {
      for (var d2 = h2.length, A2 = 0; d2--; )
        h2[d2] === g3 && ++A2;
      return A2;
    }
    var vc = qr2(jo), _c = qr2(tc);
    function mc(h2) {
      return "\\" + nc[h2];
    }
    function wc(h2, g3) {
      return h2 == null ? i2 : h2[g3];
    }
    function Le2(h2) {
      return Xo.test(h2);
    }
    function Pc(h2) {
      return Qo.test(h2);
    }
    function Cc(h2) {
      for (var g3, d2 = []; !(g3 = h2.next()).done; )
        d2.push(g3.value);
      return d2;
    }
    function Br2(h2) {
      var g3 = -1, d2 = Array(h2.size);
      return h2.forEach(function(A2, R2) {
        d2[++g3] = [R2, A2];
      }), d2;
    }
    function Ts2(h2, g3) {
      return function(d2) {
        return h2(g3(d2));
      };
    }
    function ie2(h2, g3) {
      for (var d2 = -1, A2 = h2.length, R2 = 0, U2 = []; ++d2 < A2; ) {
        var Q2 = h2[d2];
        (Q2 === g3 || Q2 === Ie2) && (h2[d2] = Ie2, U2[R2++] = d2);
      }
      return U2;
    }
    function Rn2(h2) {
      var g3 = -1, d2 = Array(h2.size);
      return h2.forEach(function(A2) {
        d2[++g3] = A2;
      }), d2;
    }
    function Ac(h2) {
      var g3 = -1, d2 = Array(h2.size);
      return h2.forEach(function(A2) {
        d2[++g3] = [A2, A2];
      }), d2;
    }
    function Ic(h2, g3, d2) {
      for (var A2 = d2 - 1, R2 = h2.length; ++A2 < R2; )
        if (h2[A2] === g3)
          return A2;
      return -1;
    }
    function xc(h2, g3, d2) {
      for (var A2 = d2 + 1; A2--; )
        if (h2[A2] === g3)
          return A2;
      return A2;
    }
    function He(h2) {
      return Le2(h2) ? yc(h2) : cc(h2);
    }
    function St2(h2) {
      return Le2(h2) ? Sc(h2) : fc(h2);
    }
    function Ls2(h2) {
      for (var g3 = h2.length; g3-- && go2.test(h2.charAt(g3)); )
        ;
      return g3;
    }
    var Ec = qr2(ec);
    function yc(h2) {
      for (var g3 = Tr2.lastIndex = 0; Tr2.test(h2); )
        ++g3;
      return g3;
    }
    function Sc(h2) {
      return h2.match(Tr2) || [];
    }
    function Oc(h2) {
      return h2.match(Zo2) || [];
    }
    var Rc = function h2(g3) {
      g3 = g3 == null ? j2 : De.defaults(j2.Object(), g3, De.pick(j2, Vo));
      var d2 = g3.Array, A2 = g3.Date, R2 = g3.Error, U2 = g3.Function, Q2 = g3.Math, M3 = g3.Object, Gr2 = g3.RegExp, bc = g3.String, wt2 = g3.TypeError, bn2 = d2.prototype, Tc = U2.prototype, Ne = M3.prototype, Tn2 = g3["__core-js_shared__"], Ln2 = Tc.toString, W = Ne.hasOwnProperty, Lc = 0, Hs2 = function() {
        var t = /[^.]+$/.exec(Tn2 && Tn2.keys && Tn2.keys.IE_PROTO || "");
        return t ? "Symbol(src)_1." + t : "";
      }(), Hn2 = Ne.toString, Hc = Ln2.call(M3), Dc = j2._, Nc = Gr2("^" + Ln2.call(W).replace(Er2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Dn2 = vs2 ? g3.Buffer : i2, se2 = g3.Symbol, Nn2 = g3.Uint8Array, Ds2 = Dn2 ? Dn2.allocUnsafe : i2, $n2 = Ts2(M3.getPrototypeOf, M3), Ns2 = M3.create, $s2 = Ne.propertyIsEnumerable, Un2 = bn2.splice, Us2 = se2 ? se2.isConcatSpreadable : i2, en2 = se2 ? se2.iterator : i2, de2 = se2 ? se2.toStringTag : i2, qn2 = function() {
        try {
          var t = we2(M3, "defineProperty");
          return t({}, "", {}), t;
        } catch {
        }
      }(), $c = g3.clearTimeout !== j2.clearTimeout && g3.clearTimeout, Uc = A2 && A2.now !== j2.Date.now && A2.now, qc = g3.setTimeout !== j2.setTimeout && g3.setTimeout, Fn = Q2.ceil, Wn2 = Q2.floor, zr2 = M3.getOwnPropertySymbols, Fc = Dn2 ? Dn2.isBuffer : i2, qs2 = g3.isFinite, Wc = bn2.join, Mc = Ts2(M3.keys, M3), V2 = Q2.max, et2 = Q2.min, Bc = A2.now, Gc = g3.parseInt, Fs2 = Q2.random, zc = bn2.reverse, Kr2 = we2(g3, "DataView"), nn2 = we2(g3, "Map"), Jr2 = we2(g3, "Promise"), $e2 = we2(g3, "Set"), rn2 = we2(g3, "WeakMap"), sn2 = we2(M3, "create"), Mn = rn2 && new rn2(), Ue = {}, Kc = Pe2(Kr2), Jc = Pe2(nn2), Yc = Pe2(Jr2), Zc = Pe2($e2), Xc = Pe2(rn2), Bn2 = se2 ? se2.prototype : i2, un2 = Bn2 ? Bn2.valueOf : i2, Ws2 = Bn2 ? Bn2.toString : i2;
      function a2(t) {
        if (Y(t) && !b2(t) && !(t instanceof N2)) {
          if (t instanceof Pt2)
            return t;
          if (W.call(t, "__wrapped__"))
            return Mu2(t);
        }
        return new Pt2(t);
      }
      var qe = function() {
        function t() {
        }
        return function(e) {
          if (!K2(e))
            return {};
          if (Ns2)
            return Ns2(e);
          t.prototype = e;
          var n2 = new t();
          return t.prototype = i2, n2;
        };
      }();
      function Gn2() {
      }
      function Pt2(t, e) {
        this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = i2;
      }
      a2.templateSettings = { escape: oo2, evaluate: co2, interpolate: Xi2, variable: "", imports: { _: a2 } }, a2.prototype = Gn2.prototype, a2.prototype.constructor = a2, Pt2.prototype = qe(Gn2.prototype), Pt2.prototype.constructor = Pt2;
      function N2(t) {
        this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = Ut3, this.__views__ = [];
      }
      function Qc() {
        var t = new N2(this.__wrapped__);
        return t.__actions__ = ut2(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = ut2(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = ut2(this.__views__), t;
      }
      function Vc() {
        if (this.__filtered__) {
          var t = new N2(this);
          t.__dir__ = -1, t.__filtered__ = true;
        } else
          t = this.clone(), t.__dir__ *= -1;
        return t;
      }
      function kc() {
        var t = this.__wrapped__.value(), e = this.__dir__, n2 = b2(t), r2 = e < 0, u3 = n2 ? t.length : 0, o2 = hh2(0, u3, this.__views__), c = o2.start, f2 = o2.end, l = f2 - c, v3 = r2 ? f2 : c - 1, _2 = this.__iteratees__, m2 = _2.length, C3 = 0, x3 = et2(l, this.__takeCount__);
        if (!n2 || !r2 && u3 == l && x3 == l)
          return fu(t, this.__actions__);
        var S2 = [];
        t:
          for (; l-- && C3 < x3; ) {
            v3 += e;
            for (var L2 = -1, O2 = t[v3]; ++L2 < m2; ) {
              var D2 = _2[L2], $2 = D2.iteratee, dt2 = D2.type, st2 = $2(O2);
              if (dt2 == Ka2)
                O2 = st2;
              else if (!st2) {
                if (dt2 == zi2)
                  continue t;
                break t;
              }
            }
            S2[C3++] = O2;
          }
        return S2;
      }
      N2.prototype = qe(Gn2.prototype), N2.prototype.constructor = N2;
      function ge2(t) {
        var e = -1, n2 = t == null ? 0 : t.length;
        for (this.clear(); ++e < n2; ) {
          var r2 = t[e];
          this.set(r2[0], r2[1]);
        }
      }
      function jc() {
        this.__data__ = sn2 ? sn2(null) : {}, this.size = 0;
      }
      function tf2(t) {
        var e = this.has(t) && delete this.__data__[t];
        return this.size -= e ? 1 : 0, e;
      }
      function ef2(t) {
        var e = this.__data__;
        if (sn2) {
          var n2 = e[t];
          return n2 === Ht2 ? i2 : n2;
        }
        return W.call(e, t) ? e[t] : i2;
      }
      function nf2(t) {
        var e = this.__data__;
        return sn2 ? e[t] !== i2 : W.call(e, t);
      }
      function rf2(t, e) {
        var n2 = this.__data__;
        return this.size += this.has(t) ? 0 : 1, n2[t] = sn2 && e === i2 ? Ht2 : e, this;
      }
      ge2.prototype.clear = jc, ge2.prototype.delete = tf2, ge2.prototype.get = ef2, ge2.prototype.has = nf2, ge2.prototype.set = rf2;
      function Kt2(t) {
        var e = -1, n2 = t == null ? 0 : t.length;
        for (this.clear(); ++e < n2; ) {
          var r2 = t[e];
          this.set(r2[0], r2[1]);
        }
      }
      function sf() {
        this.__data__ = [], this.size = 0;
      }
      function uf(t) {
        var e = this.__data__, n2 = zn2(e, t);
        if (n2 < 0)
          return false;
        var r2 = e.length - 1;
        return n2 == r2 ? e.pop() : Un2.call(e, n2, 1), --this.size, true;
      }
      function af2(t) {
        var e = this.__data__, n2 = zn2(e, t);
        return n2 < 0 ? i2 : e[n2][1];
      }
      function of2(t) {
        return zn2(this.__data__, t) > -1;
      }
      function cf2(t, e) {
        var n2 = this.__data__, r2 = zn2(n2, t);
        return r2 < 0 ? (++this.size, n2.push([t, e])) : n2[r2][1] = e, this;
      }
      Kt2.prototype.clear = sf, Kt2.prototype.delete = uf, Kt2.prototype.get = af2, Kt2.prototype.has = of2, Kt2.prototype.set = cf2;
      function Jt2(t) {
        var e = -1, n2 = t == null ? 0 : t.length;
        for (this.clear(); ++e < n2; ) {
          var r2 = t[e];
          this.set(r2[0], r2[1]);
        }
      }
      function ff2() {
        this.size = 0, this.__data__ = { hash: new ge2(), map: new (nn2 || Kt2)(), string: new ge2() };
      }
      function hf2(t) {
        var e = nr2(this, t).delete(t);
        return this.size -= e ? 1 : 0, e;
      }
      function lf2(t) {
        return nr2(this, t).get(t);
      }
      function pf2(t) {
        return nr2(this, t).has(t);
      }
      function df2(t, e) {
        var n2 = nr2(this, t), r2 = n2.size;
        return n2.set(t, e), this.size += n2.size == r2 ? 0 : 1, this;
      }
      Jt2.prototype.clear = ff2, Jt2.prototype.delete = hf2, Jt2.prototype.get = lf2, Jt2.prototype.has = pf2, Jt2.prototype.set = df2;
      function ve2(t) {
        var e = -1, n2 = t == null ? 0 : t.length;
        for (this.__data__ = new Jt2(); ++e < n2; )
          this.add(t[e]);
      }
      function gf2(t) {
        return this.__data__.set(t, Ht2), this;
      }
      function vf2(t) {
        return this.__data__.has(t);
      }
      ve2.prototype.add = ve2.prototype.push = gf2, ve2.prototype.has = vf2;
      function Ot2(t) {
        var e = this.__data__ = new Kt2(t);
        this.size = e.size;
      }
      function _f2() {
        this.__data__ = new Kt2(), this.size = 0;
      }
      function mf2(t) {
        var e = this.__data__, n2 = e.delete(t);
        return this.size = e.size, n2;
      }
      function wf2(t) {
        return this.__data__.get(t);
      }
      function Pf2(t) {
        return this.__data__.has(t);
      }
      function Cf2(t, e) {
        var n2 = this.__data__;
        if (n2 instanceof Kt2) {
          var r2 = n2.__data__;
          if (!nn2 || r2.length < w2 - 1)
            return r2.push([t, e]), this.size = ++n2.size, this;
          n2 = this.__data__ = new Jt2(r2);
        }
        return n2.set(t, e), this.size = n2.size, this;
      }
      Ot2.prototype.clear = _f2, Ot2.prototype.delete = mf2, Ot2.prototype.get = wf2, Ot2.prototype.has = Pf2, Ot2.prototype.set = Cf2;
      function Ms2(t, e) {
        var n2 = b2(t), r2 = !n2 && Ce2(t), u3 = !n2 && !r2 && fe2(t), o2 = !n2 && !r2 && !u3 && Be2(t), c = n2 || r2 || u3 || o2, f2 = c ? Wr2(t.length, bc) : [], l = f2.length;
        for (var v3 in t)
          (e || W.call(t, v3)) && !(c && (v3 == "length" || u3 && (v3 == "offset" || v3 == "parent") || o2 && (v3 == "buffer" || v3 == "byteLength" || v3 == "byteOffset") || Qt2(v3, l))) && f2.push(v3);
        return f2;
      }
      function Bs2(t) {
        var e = t.length;
        return e ? t[ri2(0, e - 1)] : i2;
      }
      function Af2(t, e) {
        return rr2(ut2(t), _e2(e, 0, t.length));
      }
      function If2(t) {
        return rr2(ut2(t));
      }
      function Yr2(t, e, n2) {
        (n2 !== i2 && !Rt2(t[e], n2) || n2 === i2 && !(e in t)) && Yt2(t, e, n2);
      }
      function an2(t, e, n2) {
        var r2 = t[e];
        (!(W.call(t, e) && Rt2(r2, n2)) || n2 === i2 && !(e in t)) && Yt2(t, e, n2);
      }
      function zn2(t, e) {
        for (var n2 = t.length; n2--; )
          if (Rt2(t[n2][0], e))
            return n2;
        return -1;
      }
      function xf2(t, e, n2, r2) {
        return ue2(t, function(u3, o2, c) {
          e(r2, u3, n2(u3), c);
        }), r2;
      }
      function Gs2(t, e) {
        return t && Ft2(e, k2(e), t);
      }
      function Ef2(t, e) {
        return t && Ft2(e, ot2(e), t);
      }
      function Yt2(t, e, n2) {
        e == "__proto__" && qn2 ? qn2(t, e, { configurable: true, enumerable: true, value: n2, writable: true }) : t[e] = n2;
      }
      function Zr2(t, e) {
        for (var n2 = -1, r2 = e.length, u3 = d2(r2), o2 = t == null; ++n2 < r2; )
          u3[n2] = o2 ? i2 : Oi2(t, e[n2]);
        return u3;
      }
      function _e2(t, e, n2) {
        return t === t && (n2 !== i2 && (t = t <= n2 ? t : n2), e !== i2 && (t = t >= e ? t : e)), t;
      }
      function Ct2(t, e, n2, r2, u3, o2) {
        var c, f2 = e & Dt2, l = e & Bt2, v3 = e & xe2;
        if (n2 && (c = u3 ? n2(t, r2, u3, o2) : n2(t)), c !== i2)
          return c;
        if (!K2(t))
          return t;
        var _2 = b2(t);
        if (_2) {
          if (c = ph2(t), !f2)
            return ut2(t, c);
        } else {
          var m2 = nt2(t), C3 = m2 == An2 || m2 == Ki2;
          if (fe2(t))
            return pu2(t, f2);
          if (m2 == zt2 || m2 == Oe2 || C3 && !u3) {
            if (c = l || C3 ? {} : Lu2(t), !f2)
              return l ? nh(t, Ef2(c, t)) : eh(t, Gs2(c, t));
          } else {
            if (!B[m2])
              return u3 ? t : {};
            c = dh2(t, m2, f2);
          }
        }
        o2 || (o2 = new Ot2());
        var x3 = o2.get(t);
        if (x3)
          return x3;
        o2.set(t, c), aa2(t) ? t.forEach(function(O2) {
          c.add(Ct2(O2, e, n2, O2, t, o2));
        }) : sa2(t) && t.forEach(function(O2, D2) {
          c.set(D2, Ct2(O2, e, n2, D2, t, o2));
        });
        var S2 = v3 ? l ? di2 : pi2 : l ? ot2 : k2, L2 = _2 ? i2 : S2(t);
        return mt2(L2 || t, function(O2, D2) {
          L2 && (D2 = O2, O2 = t[D2]), an2(c, D2, Ct2(O2, e, n2, D2, t, o2));
        }), c;
      }
      function yf2(t) {
        var e = k2(t);
        return function(n2) {
          return zs2(n2, t, e);
        };
      }
      function zs2(t, e, n2) {
        var r2 = n2.length;
        if (t == null)
          return !r2;
        for (t = M3(t); r2--; ) {
          var u3 = n2[r2], o2 = e[u3], c = t[u3];
          if (c === i2 && !(u3 in t) || !o2(c))
            return false;
        }
        return true;
      }
      function Ks2(t, e, n2) {
        if (typeof t != "function")
          throw new wt2(y3);
        return dn2(function() {
          t.apply(i2, n2);
        }, e);
      }
      function on2(t, e, n2, r2) {
        var u3 = -1, o2 = Sn2, c = true, f2 = t.length, l = [], v3 = e.length;
        if (!f2)
          return l;
        n2 && (e = z3(e, ht2(n2))), r2 ? (o2 = Dr2, c = false) : e.length >= w2 && (o2 = tn2, c = false, e = new ve2(e));
        t:
          for (; ++u3 < f2; ) {
            var _2 = t[u3], m2 = n2 == null ? _2 : n2(_2);
            if (_2 = r2 || _2 !== 0 ? _2 : 0, c && m2 === m2) {
              for (var C3 = v3; C3--; )
                if (e[C3] === m2)
                  continue t;
              l.push(_2);
            } else
              o2(e, m2, r2) || l.push(_2);
          }
        return l;
      }
      var ue2 = mu2(qt2), Js2 = mu2(Qr2, true);
      function Sf2(t, e) {
        var n2 = true;
        return ue2(t, function(r2, u3, o2) {
          return n2 = !!e(r2, u3, o2), n2;
        }), n2;
      }
      function Kn2(t, e, n2) {
        for (var r2 = -1, u3 = t.length; ++r2 < u3; ) {
          var o2 = t[r2], c = e(o2);
          if (c != null && (f2 === i2 ? c === c && !pt2(c) : n2(c, f2)))
            var f2 = c, l = o2;
        }
        return l;
      }
      function Of2(t, e, n2, r2) {
        var u3 = t.length;
        for (n2 = T2(n2), n2 < 0 && (n2 = -n2 > u3 ? 0 : u3 + n2), r2 = r2 === i2 || r2 > u3 ? u3 : T2(r2), r2 < 0 && (r2 += u3), r2 = n2 > r2 ? 0 : ca2(r2); n2 < r2; )
          t[n2++] = e;
        return t;
      }
      function Ys2(t, e) {
        var n2 = [];
        return ue2(t, function(r2, u3, o2) {
          e(r2, u3, o2) && n2.push(r2);
        }), n2;
      }
      function tt2(t, e, n2, r2, u3) {
        var o2 = -1, c = t.length;
        for (n2 || (n2 = vh2), u3 || (u3 = []); ++o2 < c; ) {
          var f2 = t[o2];
          e > 0 && n2(f2) ? e > 1 ? tt2(f2, e - 1, n2, r2, u3) : re2(u3, f2) : r2 || (u3[u3.length] = f2);
        }
        return u3;
      }
      var Xr2 = wu(), Zs2 = wu(true);
      function qt2(t, e) {
        return t && Xr2(t, e, k2);
      }
      function Qr2(t, e) {
        return t && Zs2(t, e, k2);
      }
      function Jn2(t, e) {
        return ne2(e, function(n2) {
          return Vt2(t[n2]);
        });
      }
      function me2(t, e) {
        e = oe2(e, t);
        for (var n2 = 0, r2 = e.length; t != null && n2 < r2; )
          t = t[Wt2(e[n2++])];
        return n2 && n2 == r2 ? t : i2;
      }
      function Xs2(t, e, n2) {
        var r2 = e(t);
        return b2(t) ? r2 : re2(r2, n2(t));
      }
      function rt2(t) {
        return t == null ? t === i2 ? eo2 : ja2 : de2 && de2 in M3(t) ? fh(t) : Ih2(t);
      }
      function Vr2(t, e) {
        return t > e;
      }
      function Rf2(t, e) {
        return t != null && W.call(t, e);
      }
      function bf2(t, e) {
        return t != null && e in M3(t);
      }
      function Tf2(t, e, n2) {
        return t >= et2(e, n2) && t < V2(e, n2);
      }
      function kr2(t, e, n2) {
        for (var r2 = n2 ? Dr2 : Sn2, u3 = t[0].length, o2 = t.length, c = o2, f2 = d2(o2), l = 1 / 0, v3 = []; c--; ) {
          var _2 = t[c];
          c && e && (_2 = z3(_2, ht2(e))), l = et2(_2.length, l), f2[c] = !n2 && (e || u3 >= 120 && _2.length >= 120) ? new ve2(c && _2) : i2;
        }
        _2 = t[0];
        var m2 = -1, C3 = f2[0];
        t:
          for (; ++m2 < u3 && v3.length < l; ) {
            var x3 = _2[m2], S2 = e ? e(x3) : x3;
            if (x3 = n2 || x3 !== 0 ? x3 : 0, !(C3 ? tn2(C3, S2) : r2(v3, S2, n2))) {
              for (c = o2; --c; ) {
                var L2 = f2[c];
                if (!(L2 ? tn2(L2, S2) : r2(t[c], S2, n2)))
                  continue t;
              }
              C3 && C3.push(S2), v3.push(x3);
            }
          }
        return v3;
      }
      function Lf2(t, e, n2, r2) {
        return qt2(t, function(u3, o2, c) {
          e(r2, n2(u3), o2, c);
        }), r2;
      }
      function cn2(t, e, n2) {
        e = oe2(e, t), t = $u2(t, e);
        var r2 = t == null ? t : t[Wt2(It2(e))];
        return r2 == null ? i2 : ft2(r2, t, n2);
      }
      function Qs2(t) {
        return Y(t) && rt2(t) == Oe2;
      }
      function Hf2(t) {
        return Y(t) && rt2(t) == je;
      }
      function Df2(t) {
        return Y(t) && rt2(t) == Ze2;
      }
      function fn2(t, e, n2, r2, u3) {
        return t === e ? true : t == null || e == null || !Y(t) && !Y(e) ? t !== t && e !== e : Nf2(t, e, n2, r2, fn2, u3);
      }
      function Nf2(t, e, n2, r2, u3, o2) {
        var c = b2(t), f2 = b2(e), l = c ? Pn2 : nt2(t), v3 = f2 ? Pn2 : nt2(e);
        l = l == Oe2 ? zt2 : l, v3 = v3 == Oe2 ? zt2 : v3;
        var _2 = l == zt2, m2 = v3 == zt2, C3 = l == v3;
        if (C3 && fe2(t)) {
          if (!fe2(e))
            return false;
          c = true, _2 = false;
        }
        if (C3 && !_2)
          return o2 || (o2 = new Ot2()), c || Be2(t) ? Ru2(t, e, n2, r2, u3, o2) : oh(t, e, l, n2, r2, u3, o2);
        if (!(n2 & Ee2)) {
          var x3 = _2 && W.call(t, "__wrapped__"), S2 = m2 && W.call(e, "__wrapped__");
          if (x3 || S2) {
            var L2 = x3 ? t.value() : t, O2 = S2 ? e.value() : e;
            return o2 || (o2 = new Ot2()), u3(L2, O2, n2, r2, o2);
          }
        }
        return C3 ? (o2 || (o2 = new Ot2()), ch2(t, e, n2, r2, u3, o2)) : false;
      }
      function $f(t) {
        return Y(t) && nt2(t) == Et2;
      }
      function jr2(t, e, n2, r2) {
        var u3 = n2.length, o2 = u3, c = !r2;
        if (t == null)
          return !o2;
        for (t = M3(t); u3--; ) {
          var f2 = n2[u3];
          if (c && f2[2] ? f2[1] !== t[f2[0]] : !(f2[0] in t))
            return false;
        }
        for (; ++u3 < o2; ) {
          f2 = n2[u3];
          var l = f2[0], v3 = t[l], _2 = f2[1];
          if (c && f2[2]) {
            if (v3 === i2 && !(l in t))
              return false;
          } else {
            var m2 = new Ot2();
            if (r2)
              var C3 = r2(v3, _2, l, t, e, m2);
            if (!(C3 === i2 ? fn2(_2, v3, Ee2 | mn2, r2, m2) : C3))
              return false;
          }
        }
        return true;
      }
      function Vs2(t) {
        if (!K2(t) || mh2(t))
          return false;
        var e = Vt2(t) ? Nc : Eo2;
        return e.test(Pe2(t));
      }
      function Uf2(t) {
        return Y(t) && rt2(t) == Qe2;
      }
      function qf2(t) {
        return Y(t) && nt2(t) == yt2;
      }
      function Ff2(t) {
        return Y(t) && cr2(t.length) && !!G2[rt2(t)];
      }
      function ks2(t) {
        return typeof t == "function" ? t : t == null ? ct2 : typeof t == "object" ? b2(t) ? eu2(t[0], t[1]) : tu2(t) : Pa2(t);
      }
      function ti2(t) {
        if (!pn2(t))
          return Mc(t);
        var e = [];
        for (var n2 in M3(t))
          W.call(t, n2) && n2 != "constructor" && e.push(n2);
        return e;
      }
      function Wf2(t) {
        if (!K2(t))
          return Ah2(t);
        var e = pn2(t), n2 = [];
        for (var r2 in t)
          r2 == "constructor" && (e || !W.call(t, r2)) || n2.push(r2);
        return n2;
      }
      function ei2(t, e) {
        return t < e;
      }
      function js2(t, e) {
        var n2 = -1, r2 = at2(t) ? d2(t.length) : [];
        return ue2(t, function(u3, o2, c) {
          r2[++n2] = e(u3, o2, c);
        }), r2;
      }
      function tu2(t) {
        var e = vi(t);
        return e.length == 1 && e[0][2] ? Du2(e[0][0], e[0][1]) : function(n2) {
          return n2 === t || jr2(n2, t, e);
        };
      }
      function eu2(t, e) {
        return mi2(t) && Hu2(e) ? Du2(Wt2(t), e) : function(n2) {
          var r2 = Oi2(n2, t);
          return r2 === i2 && r2 === e ? Ri2(n2, t) : fn2(e, r2, Ee2 | mn2);
        };
      }
      function Yn2(t, e, n2, r2, u3) {
        t !== e && Xr2(e, function(o2, c) {
          if (u3 || (u3 = new Ot2()), K2(o2))
            Mf2(t, e, c, n2, Yn2, r2, u3);
          else {
            var f2 = r2 ? r2(Pi2(t, c), o2, c + "", t, e, u3) : i2;
            f2 === i2 && (f2 = o2), Yr2(t, c, f2);
          }
        }, ot2);
      }
      function Mf2(t, e, n2, r2, u3, o2, c) {
        var f2 = Pi2(t, n2), l = Pi2(e, n2), v3 = c.get(l);
        if (v3) {
          Yr2(t, n2, v3);
          return;
        }
        var _2 = o2 ? o2(f2, l, n2 + "", t, e, c) : i2, m2 = _2 === i2;
        if (m2) {
          var C3 = b2(l), x3 = !C3 && fe2(l), S2 = !C3 && !x3 && Be2(l);
          _2 = l, C3 || x3 || S2 ? b2(f2) ? _2 = f2 : Z2(f2) ? _2 = ut2(f2) : x3 ? (m2 = false, _2 = pu2(l, true)) : S2 ? (m2 = false, _2 = du2(l, true)) : _2 = [] : gn2(l) || Ce2(l) ? (_2 = f2, Ce2(f2) ? _2 = fa2(f2) : (!K2(f2) || Vt2(f2)) && (_2 = Lu2(l))) : m2 = false;
        }
        m2 && (c.set(l, _2), u3(_2, l, r2, o2, c), c.delete(l)), Yr2(t, n2, _2);
      }
      function nu2(t, e) {
        var n2 = t.length;
        if (n2)
          return e += e < 0 ? n2 : 0, Qt2(e, n2) ? t[e] : i2;
      }
      function ru2(t, e, n2) {
        e.length ? e = z3(e, function(o2) {
          return b2(o2) ? function(c) {
            return me2(c, o2.length === 1 ? o2[0] : o2);
          } : o2;
        }) : e = [ct2];
        var r2 = -1;
        e = z3(e, ht2(E2()));
        var u3 = js2(t, function(o2, c, f2) {
          var l = z3(e, function(v3) {
            return v3(o2);
          });
          return { criteria: l, index: ++r2, value: o2 };
        });
        return pc(u3, function(o2, c) {
          return th(o2, c, n2);
        });
      }
      function Bf2(t, e) {
        return iu2(t, e, function(n2, r2) {
          return Ri2(t, r2);
        });
      }
      function iu2(t, e, n2) {
        for (var r2 = -1, u3 = e.length, o2 = {}; ++r2 < u3; ) {
          var c = e[r2], f2 = me2(t, c);
          n2(f2, c) && hn2(o2, oe2(c, t), f2);
        }
        return o2;
      }
      function Gf2(t) {
        return function(e) {
          return me2(e, t);
        };
      }
      function ni2(t, e, n2, r2) {
        var u3 = r2 ? lc : Te2, o2 = -1, c = e.length, f2 = t;
        for (t === e && (e = ut2(e)), n2 && (f2 = z3(t, ht2(n2))); ++o2 < c; )
          for (var l = 0, v3 = e[o2], _2 = n2 ? n2(v3) : v3; (l = u3(f2, _2, l, r2)) > -1; )
            f2 !== t && Un2.call(f2, l, 1), Un2.call(t, l, 1);
        return t;
      }
      function su2(t, e) {
        for (var n2 = t ? e.length : 0, r2 = n2 - 1; n2--; ) {
          var u3 = e[n2];
          if (n2 == r2 || u3 !== o2) {
            var o2 = u3;
            Qt2(u3) ? Un2.call(t, u3, 1) : ui2(t, u3);
          }
        }
        return t;
      }
      function ri2(t, e) {
        return t + Wn2(Fs2() * (e - t + 1));
      }
      function zf2(t, e, n2, r2) {
        for (var u3 = -1, o2 = V2(Fn((e - t) / (n2 || 1)), 0), c = d2(o2); o2--; )
          c[r2 ? o2 : ++u3] = t, t += n2;
        return c;
      }
      function ii2(t, e) {
        var n2 = "";
        if (!t || e < 1 || e > ee2)
          return n2;
        do
          e % 2 && (n2 += t), e = Wn2(e / 2), e && (t += t);
        while (e);
        return n2;
      }
      function H(t, e) {
        return Ci2(Nu2(t, e, ct2), t + "");
      }
      function Kf2(t) {
        return Bs2(Ge(t));
      }
      function Jf2(t, e) {
        var n2 = Ge(t);
        return rr2(n2, _e2(e, 0, n2.length));
      }
      function hn2(t, e, n2, r2) {
        if (!K2(t))
          return t;
        e = oe2(e, t);
        for (var u3 = -1, o2 = e.length, c = o2 - 1, f2 = t; f2 != null && ++u3 < o2; ) {
          var l = Wt2(e[u3]), v3 = n2;
          if (l === "__proto__" || l === "constructor" || l === "prototype")
            return t;
          if (u3 != c) {
            var _2 = f2[l];
            v3 = r2 ? r2(_2, l, f2) : i2, v3 === i2 && (v3 = K2(_2) ? _2 : Qt2(e[u3 + 1]) ? [] : {});
          }
          an2(f2, l, v3), f2 = f2[l];
        }
        return t;
      }
      var uu2 = Mn ? function(t, e) {
        return Mn.set(t, e), t;
      } : ct2, Yf2 = qn2 ? function(t, e) {
        return qn2(t, "toString", { configurable: true, enumerable: false, value: Ti2(e), writable: true });
      } : ct2;
      function Zf(t) {
        return rr2(Ge(t));
      }
      function At2(t, e, n2) {
        var r2 = -1, u3 = t.length;
        e < 0 && (e = -e > u3 ? 0 : u3 + e), n2 = n2 > u3 ? u3 : n2, n2 < 0 && (n2 += u3), u3 = e > n2 ? 0 : n2 - e >>> 0, e >>>= 0;
        for (var o2 = d2(u3); ++r2 < u3; )
          o2[r2] = t[r2 + e];
        return o2;
      }
      function Xf(t, e) {
        var n2;
        return ue2(t, function(r2, u3, o2) {
          return n2 = e(r2, u3, o2), !n2;
        }), !!n2;
      }
      function Zn2(t, e, n2) {
        var r2 = 0, u3 = t == null ? r2 : t.length;
        if (typeof e == "number" && e === e && u3 <= Xa2) {
          for (; r2 < u3; ) {
            var o2 = r2 + u3 >>> 1, c = t[o2];
            c !== null && !pt2(c) && (n2 ? c <= e : c < e) ? r2 = o2 + 1 : u3 = o2;
          }
          return u3;
        }
        return si2(t, e, ct2, n2);
      }
      function si2(t, e, n2, r2) {
        var u3 = 0, o2 = t == null ? 0 : t.length;
        if (o2 === 0)
          return 0;
        e = n2(e);
        for (var c = e !== e, f2 = e === null, l = pt2(e), v3 = e === i2; u3 < o2; ) {
          var _2 = Wn2((u3 + o2) / 2), m2 = n2(t[_2]), C3 = m2 !== i2, x3 = m2 === null, S2 = m2 === m2, L2 = pt2(m2);
          if (c)
            var O2 = r2 || S2;
          else
            v3 ? O2 = S2 && (r2 || C3) : f2 ? O2 = S2 && C3 && (r2 || !x3) : l ? O2 = S2 && C3 && !x3 && (r2 || !L2) : x3 || L2 ? O2 = false : O2 = r2 ? m2 <= e : m2 < e;
          O2 ? u3 = _2 + 1 : o2 = _2;
        }
        return et2(o2, Za2);
      }
      function au2(t, e) {
        for (var n2 = -1, r2 = t.length, u3 = 0, o2 = []; ++n2 < r2; ) {
          var c = t[n2], f2 = e ? e(c) : c;
          if (!n2 || !Rt2(f2, l)) {
            var l = f2;
            o2[u3++] = c === 0 ? 0 : c;
          }
        }
        return o2;
      }
      function ou2(t) {
        return typeof t == "number" ? t : pt2(t) ? wn2 : +t;
      }
      function lt2(t) {
        if (typeof t == "string")
          return t;
        if (b2(t))
          return z3(t, lt2) + "";
        if (pt2(t))
          return Ws2 ? Ws2.call(t) : "";
        var e = t + "";
        return e == "0" && 1 / t == -le2 ? "-0" : e;
      }
      function ae2(t, e, n2) {
        var r2 = -1, u3 = Sn2, o2 = t.length, c = true, f2 = [], l = f2;
        if (n2)
          c = false, u3 = Dr2;
        else if (o2 >= w2) {
          var v3 = e ? null : uh2(t);
          if (v3)
            return Rn2(v3);
          c = false, u3 = tn2, l = new ve2();
        } else
          l = e ? [] : f2;
        t:
          for (; ++r2 < o2; ) {
            var _2 = t[r2], m2 = e ? e(_2) : _2;
            if (_2 = n2 || _2 !== 0 ? _2 : 0, c && m2 === m2) {
              for (var C3 = l.length; C3--; )
                if (l[C3] === m2)
                  continue t;
              e && l.push(m2), f2.push(_2);
            } else
              u3(l, m2, n2) || (l !== f2 && l.push(m2), f2.push(_2));
          }
        return f2;
      }
      function ui2(t, e) {
        return e = oe2(e, t), t = $u2(t, e), t == null || delete t[Wt2(It2(e))];
      }
      function cu2(t, e, n2, r2) {
        return hn2(t, e, n2(me2(t, e)), r2);
      }
      function Xn2(t, e, n2, r2) {
        for (var u3 = t.length, o2 = r2 ? u3 : -1; (r2 ? o2-- : ++o2 < u3) && e(t[o2], o2, t); )
          ;
        return n2 ? At2(t, r2 ? 0 : o2, r2 ? o2 + 1 : u3) : At2(t, r2 ? o2 + 1 : 0, r2 ? u3 : o2);
      }
      function fu(t, e) {
        var n2 = t;
        return n2 instanceof N2 && (n2 = n2.value()), Nr2(e, function(r2, u3) {
          return u3.func.apply(u3.thisArg, re2([r2], u3.args));
        }, n2);
      }
      function ai2(t, e, n2) {
        var r2 = t.length;
        if (r2 < 2)
          return r2 ? ae2(t[0]) : [];
        for (var u3 = -1, o2 = d2(r2); ++u3 < r2; )
          for (var c = t[u3], f2 = -1; ++f2 < r2; )
            f2 != u3 && (o2[u3] = on2(o2[u3] || c, t[f2], e, n2));
        return ae2(tt2(o2, 1), e, n2);
      }
      function hu2(t, e, n2) {
        for (var r2 = -1, u3 = t.length, o2 = e.length, c = {}; ++r2 < u3; ) {
          var f2 = r2 < o2 ? e[r2] : i2;
          n2(c, t[r2], f2);
        }
        return c;
      }
      function oi2(t) {
        return Z2(t) ? t : [];
      }
      function ci2(t) {
        return typeof t == "function" ? t : ct2;
      }
      function oe2(t, e) {
        return b2(t) ? t : mi2(t, e) ? [t] : Wu2(q2(t));
      }
      var Qf2 = H;
      function ce2(t, e, n2) {
        var r2 = t.length;
        return n2 = n2 === i2 ? r2 : n2, !e && n2 >= r2 ? t : At2(t, e, n2);
      }
      var lu2 = $c || function(t) {
        return j2.clearTimeout(t);
      };
      function pu2(t, e) {
        if (e)
          return t.slice();
        var n2 = t.length, r2 = Ds2 ? Ds2(n2) : new t.constructor(n2);
        return t.copy(r2), r2;
      }
      function fi2(t) {
        var e = new t.constructor(t.byteLength);
        return new Nn2(e).set(new Nn2(t)), e;
      }
      function Vf2(t, e) {
        var n2 = e ? fi2(t.buffer) : t.buffer;
        return new t.constructor(n2, t.byteOffset, t.byteLength);
      }
      function kf2(t) {
        var e = new t.constructor(t.source, Qi2.exec(t));
        return e.lastIndex = t.lastIndex, e;
      }
      function jf2(t) {
        return un2 ? M3(un2.call(t)) : {};
      }
      function du2(t, e) {
        var n2 = e ? fi2(t.buffer) : t.buffer;
        return new t.constructor(n2, t.byteOffset, t.length);
      }
      function gu2(t, e) {
        if (t !== e) {
          var n2 = t !== i2, r2 = t === null, u3 = t === t, o2 = pt2(t), c = e !== i2, f2 = e === null, l = e === e, v3 = pt2(e);
          if (!f2 && !v3 && !o2 && t > e || o2 && c && l && !f2 && !v3 || r2 && c && l || !n2 && l || !u3)
            return 1;
          if (!r2 && !o2 && !v3 && t < e || v3 && n2 && u3 && !r2 && !o2 || f2 && n2 && u3 || !c && u3 || !l)
            return -1;
        }
        return 0;
      }
      function th(t, e, n2) {
        for (var r2 = -1, u3 = t.criteria, o2 = e.criteria, c = u3.length, f2 = n2.length; ++r2 < c; ) {
          var l = gu2(u3[r2], o2[r2]);
          if (l) {
            if (r2 >= f2)
              return l;
            var v3 = n2[r2];
            return l * (v3 == "desc" ? -1 : 1);
          }
        }
        return t.index - e.index;
      }
      function vu2(t, e, n2, r2) {
        for (var u3 = -1, o2 = t.length, c = n2.length, f2 = -1, l = e.length, v3 = V2(o2 - c, 0), _2 = d2(l + v3), m2 = !r2; ++f2 < l; )
          _2[f2] = e[f2];
        for (; ++u3 < c; )
          (m2 || u3 < o2) && (_2[n2[u3]] = t[u3]);
        for (; v3--; )
          _2[f2++] = t[u3++];
        return _2;
      }
      function _u2(t, e, n2, r2) {
        for (var u3 = -1, o2 = t.length, c = -1, f2 = n2.length, l = -1, v3 = e.length, _2 = V2(o2 - f2, 0), m2 = d2(_2 + v3), C3 = !r2; ++u3 < _2; )
          m2[u3] = t[u3];
        for (var x3 = u3; ++l < v3; )
          m2[x3 + l] = e[l];
        for (; ++c < f2; )
          (C3 || u3 < o2) && (m2[x3 + n2[c]] = t[u3++]);
        return m2;
      }
      function ut2(t, e) {
        var n2 = -1, r2 = t.length;
        for (e || (e = d2(r2)); ++n2 < r2; )
          e[n2] = t[n2];
        return e;
      }
      function Ft2(t, e, n2, r2) {
        var u3 = !n2;
        n2 || (n2 = {});
        for (var o2 = -1, c = e.length; ++o2 < c; ) {
          var f2 = e[o2], l = r2 ? r2(n2[f2], t[f2], f2, n2, t) : i2;
          l === i2 && (l = t[f2]), u3 ? Yt2(n2, f2, l) : an2(n2, f2, l);
        }
        return n2;
      }
      function eh(t, e) {
        return Ft2(t, _i2(t), e);
      }
      function nh(t, e) {
        return Ft2(t, bu(t), e);
      }
      function Qn2(t, e) {
        return function(n2, r2) {
          var u3 = b2(n2) ? uc : xf2, o2 = e ? e() : {};
          return u3(n2, t, E2(r2, 2), o2);
        };
      }
      function Fe(t) {
        return H(function(e, n2) {
          var r2 = -1, u3 = n2.length, o2 = u3 > 1 ? n2[u3 - 1] : i2, c = u3 > 2 ? n2[2] : i2;
          for (o2 = t.length > 3 && typeof o2 == "function" ? (u3--, o2) : i2, c && it2(n2[0], n2[1], c) && (o2 = u3 < 3 ? i2 : o2, u3 = 1), e = M3(e); ++r2 < u3; ) {
            var f2 = n2[r2];
            f2 && t(e, f2, r2, o2);
          }
          return e;
        });
      }
      function mu2(t, e) {
        return function(n2, r2) {
          if (n2 == null)
            return n2;
          if (!at2(n2))
            return t(n2, r2);
          for (var u3 = n2.length, o2 = e ? u3 : -1, c = M3(n2); (e ? o2-- : ++o2 < u3) && r2(c[o2], o2, c) !== false; )
            ;
          return n2;
        };
      }
      function wu(t) {
        return function(e, n2, r2) {
          for (var u3 = -1, o2 = M3(e), c = r2(e), f2 = c.length; f2--; ) {
            var l = c[t ? f2 : ++u3];
            if (n2(o2[l], l, o2) === false)
              break;
          }
          return e;
        };
      }
      function rh(t, e, n2) {
        var r2 = e & vt2, u3 = ln2(t);
        function o2() {
          var c = this && this !== j2 && this instanceof o2 ? u3 : t;
          return c.apply(r2 ? n2 : this, arguments);
        }
        return o2;
      }
      function Pu2(t) {
        return function(e) {
          e = q2(e);
          var n2 = Le2(e) ? St2(e) : i2, r2 = n2 ? n2[0] : e.charAt(0), u3 = n2 ? ce2(n2, 1).join("") : e.slice(1);
          return r2[t]() + u3;
        };
      }
      function We2(t) {
        return function(e) {
          return Nr2(ma2(_a2(e).replace(Jo, "")), t, "");
        };
      }
      function ln2(t) {
        return function() {
          var e = arguments;
          switch (e.length) {
            case 0:
              return new t();
            case 1:
              return new t(e[0]);
            case 2:
              return new t(e[0], e[1]);
            case 3:
              return new t(e[0], e[1], e[2]);
            case 4:
              return new t(e[0], e[1], e[2], e[3]);
            case 5:
              return new t(e[0], e[1], e[2], e[3], e[4]);
            case 6:
              return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
            case 7:
              return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
          }
          var n2 = qe(t.prototype), r2 = t.apply(n2, e);
          return K2(r2) ? r2 : n2;
        };
      }
      function ih(t, e, n2) {
        var r2 = ln2(t);
        function u3() {
          for (var o2 = arguments.length, c = d2(o2), f2 = o2, l = Me(u3); f2--; )
            c[f2] = arguments[f2];
          var v3 = o2 < 3 && c[0] !== l && c[o2 - 1] !== l ? [] : ie2(c, l);
          if (o2 -= v3.length, o2 < n2)
            return Eu2(t, e, Vn2, u3.placeholder, i2, c, v3, i2, i2, n2 - o2);
          var _2 = this && this !== j2 && this instanceof u3 ? r2 : t;
          return ft2(_2, this, c);
        }
        return u3;
      }
      function Cu2(t) {
        return function(e, n2, r2) {
          var u3 = M3(e);
          if (!at2(e)) {
            var o2 = E2(n2, 3);
            e = k2(e), n2 = function(f2) {
              return o2(u3[f2], f2, u3);
            };
          }
          var c = t(e, n2, r2);
          return c > -1 ? u3[o2 ? e[c] : c] : i2;
        };
      }
      function Au(t) {
        return Xt2(function(e) {
          var n2 = e.length, r2 = n2, u3 = Pt2.prototype.thru;
          for (t && e.reverse(); r2--; ) {
            var o2 = e[r2];
            if (typeof o2 != "function")
              throw new wt2(y3);
            if (u3 && !c && er2(o2) == "wrapper")
              var c = new Pt2([], true);
          }
          for (r2 = c ? r2 : n2; ++r2 < n2; ) {
            o2 = e[r2];
            var f2 = er2(o2), l = f2 == "wrapper" ? gi2(o2) : i2;
            l && wi(l[0]) && l[1] == (Gt2 | Nt2 | $t2 | Je) && !l[4].length && l[9] == 1 ? c = c[er2(l[0])].apply(c, l[3]) : c = o2.length == 1 && wi(o2) ? c[f2]() : c.thru(o2);
          }
          return function() {
            var v3 = arguments, _2 = v3[0];
            if (c && v3.length == 1 && b2(_2))
              return c.plant(_2).value();
            for (var m2 = 0, C3 = n2 ? e[m2].apply(this, v3) : _2; ++m2 < n2; )
              C3 = e[m2].call(this, C3);
            return C3;
          };
        });
      }
      function Vn2(t, e, n2, r2, u3, o2, c, f2, l, v3) {
        var _2 = e & Gt2, m2 = e & vt2, C3 = e & he2, x3 = e & (Nt2 | ye2), S2 = e & gr2, L2 = C3 ? i2 : ln2(t);
        function O2() {
          for (var D2 = arguments.length, $2 = d2(D2), dt2 = D2; dt2--; )
            $2[dt2] = arguments[dt2];
          if (x3)
            var st2 = Me(O2), gt2 = gc($2, st2);
          if (r2 && ($2 = vu2($2, r2, u3, x3)), o2 && ($2 = _u2($2, o2, c, x3)), D2 -= gt2, x3 && D2 < v3) {
            var X = ie2($2, st2);
            return Eu2(t, e, Vn2, O2.placeholder, n2, $2, X, f2, l, v3 - D2);
          }
          var bt2 = m2 ? n2 : this, jt2 = C3 ? bt2[t] : t;
          return D2 = $2.length, f2 ? $2 = xh2($2, f2) : S2 && D2 > 1 && $2.reverse(), _2 && l < D2 && ($2.length = l), this && this !== j2 && this instanceof O2 && (jt2 = L2 || ln2(jt2)), jt2.apply(bt2, $2);
        }
        return O2;
      }
      function Iu2(t, e) {
        return function(n2, r2) {
          return Lf2(n2, t, e(r2), {});
        };
      }
      function kn2(t, e) {
        return function(n2, r2) {
          var u3;
          if (n2 === i2 && r2 === i2)
            return e;
          if (n2 !== i2 && (u3 = n2), r2 !== i2) {
            if (u3 === i2)
              return r2;
            typeof n2 == "string" || typeof r2 == "string" ? (n2 = lt2(n2), r2 = lt2(r2)) : (n2 = ou2(n2), r2 = ou2(r2)), u3 = t(n2, r2);
          }
          return u3;
        };
      }
      function hi2(t) {
        return Xt2(function(e) {
          return e = z3(e, ht2(E2())), H(function(n2) {
            var r2 = this;
            return t(e, function(u3) {
              return ft2(u3, r2, n2);
            });
          });
        });
      }
      function jn2(t, e) {
        e = e === i2 ? " " : lt2(e);
        var n2 = e.length;
        if (n2 < 2)
          return n2 ? ii2(e, t) : e;
        var r2 = ii2(e, Fn(t / He(e)));
        return Le2(e) ? ce2(St2(r2), 0, t).join("") : r2.slice(0, t);
      }
      function sh(t, e, n2, r2) {
        var u3 = e & vt2, o2 = ln2(t);
        function c() {
          for (var f2 = -1, l = arguments.length, v3 = -1, _2 = r2.length, m2 = d2(_2 + l), C3 = this && this !== j2 && this instanceof c ? o2 : t; ++v3 < _2; )
            m2[v3] = r2[v3];
          for (; l--; )
            m2[v3++] = arguments[++f2];
          return ft2(C3, u3 ? n2 : this, m2);
        }
        return c;
      }
      function xu2(t) {
        return function(e, n2, r2) {
          return r2 && typeof r2 != "number" && it2(e, n2, r2) && (n2 = r2 = i2), e = kt2(e), n2 === i2 ? (n2 = e, e = 0) : n2 = kt2(n2), r2 = r2 === i2 ? e < n2 ? 1 : -1 : kt2(r2), zf2(e, n2, r2, t);
        };
      }
      function tr2(t) {
        return function(e, n2) {
          return typeof e == "string" && typeof n2 == "string" || (e = xt2(e), n2 = xt2(n2)), t(e, n2);
        };
      }
      function Eu2(t, e, n2, r2, u3, o2, c, f2, l, v3) {
        var _2 = e & Nt2, m2 = _2 ? c : i2, C3 = _2 ? i2 : c, x3 = _2 ? o2 : i2, S2 = _2 ? i2 : o2;
        e |= _2 ? $t2 : Se, e &= ~(_2 ? Se : $t2), e & Gi2 || (e &= ~(vt2 | he2));
        var L2 = [t, e, u3, x3, m2, S2, C3, f2, l, v3], O2 = n2.apply(i2, L2);
        return wi(t) && Uu2(O2, L2), O2.placeholder = r2, qu2(O2, t, e);
      }
      function li2(t) {
        var e = Q2[t];
        return function(n2, r2) {
          if (n2 = xt2(n2), r2 = r2 == null ? 0 : et2(T2(r2), 292), r2 && qs2(n2)) {
            var u3 = (q2(n2) + "e").split("e"), o2 = e(u3[0] + "e" + (+u3[1] + r2));
            return u3 = (q2(o2) + "e").split("e"), +(u3[0] + "e" + (+u3[1] - r2));
          }
          return e(n2);
        };
      }
      var uh2 = $e2 && 1 / Rn2(new $e2([, -0]))[1] == le2 ? function(t) {
        return new $e2(t);
      } : Di2;
      function yu(t) {
        return function(e) {
          var n2 = nt2(e);
          return n2 == Et2 ? Br2(e) : n2 == yt2 ? Ac(e) : dc(e, t(e));
        };
      }
      function Zt2(t, e, n2, r2, u3, o2, c, f2) {
        var l = e & he2;
        if (!l && typeof t != "function")
          throw new wt2(y3);
        var v3 = r2 ? r2.length : 0;
        if (v3 || (e &= ~($t2 | Se), r2 = u3 = i2), c = c === i2 ? c : V2(T2(c), 0), f2 = f2 === i2 ? f2 : T2(f2), v3 -= u3 ? u3.length : 0, e & Se) {
          var _2 = r2, m2 = u3;
          r2 = u3 = i2;
        }
        var C3 = l ? i2 : gi2(t), x3 = [t, e, n2, r2, u3, _2, m2, o2, c, f2];
        if (C3 && Ch2(x3, C3), t = x3[0], e = x3[1], n2 = x3[2], r2 = x3[3], u3 = x3[4], f2 = x3[9] = x3[9] === i2 ? l ? 0 : t.length : V2(x3[9] - v3, 0), !f2 && e & (Nt2 | ye2) && (e &= ~(Nt2 | ye2)), !e || e == vt2)
          var S2 = rh(t, e, n2);
        else
          e == Nt2 || e == ye2 ? S2 = ih(t, e, f2) : (e == $t2 || e == (vt2 | $t2)) && !u3.length ? S2 = sh(t, e, n2, r2) : S2 = Vn2.apply(i2, x3);
        var L2 = C3 ? uu2 : Uu2;
        return qu2(L2(S2, x3), t, e);
      }
      function Su2(t, e, n2, r2) {
        return t === i2 || Rt2(t, Ne[n2]) && !W.call(r2, n2) ? e : t;
      }
      function Ou2(t, e, n2, r2, u3, o2) {
        return K2(t) && K2(e) && (o2.set(e, t), Yn2(t, e, i2, Ou2, o2), o2.delete(e)), t;
      }
      function ah(t) {
        return gn2(t) ? i2 : t;
      }
      function Ru2(t, e, n2, r2, u3, o2) {
        var c = n2 & Ee2, f2 = t.length, l = e.length;
        if (f2 != l && !(c && l > f2))
          return false;
        var v3 = o2.get(t), _2 = o2.get(e);
        if (v3 && _2)
          return v3 == e && _2 == t;
        var m2 = -1, C3 = true, x3 = n2 & mn2 ? new ve2() : i2;
        for (o2.set(t, e), o2.set(e, t); ++m2 < f2; ) {
          var S2 = t[m2], L2 = e[m2];
          if (r2)
            var O2 = c ? r2(L2, S2, m2, e, t, o2) : r2(S2, L2, m2, t, e, o2);
          if (O2 !== i2) {
            if (O2)
              continue;
            C3 = false;
            break;
          }
          if (x3) {
            if (!$r2(e, function(D2, $2) {
              if (!tn2(x3, $2) && (S2 === D2 || u3(S2, D2, n2, r2, o2)))
                return x3.push($2);
            })) {
              C3 = false;
              break;
            }
          } else if (!(S2 === L2 || u3(S2, L2, n2, r2, o2))) {
            C3 = false;
            break;
          }
        }
        return o2.delete(t), o2.delete(e), C3;
      }
      function oh(t, e, n2, r2, u3, o2, c) {
        switch (n2) {
          case Re2:
            if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
              return false;
            t = t.buffer, e = e.buffer;
          case je:
            return !(t.byteLength != e.byteLength || !o2(new Nn2(t), new Nn2(e)));
          case Ye:
          case Ze2:
          case Xe2:
            return Rt2(+t, +e);
          case Cn2:
            return t.name == e.name && t.message == e.message;
          case Qe2:
          case Ve:
            return t == e + "";
          case Et2:
            var f2 = Br2;
          case yt2:
            var l = r2 & Ee2;
            if (f2 || (f2 = Rn2), t.size != e.size && !l)
              return false;
            var v3 = c.get(t);
            if (v3)
              return v3 == e;
            r2 |= mn2, c.set(t, e);
            var _2 = Ru2(f2(t), f2(e), r2, u3, o2, c);
            return c.delete(t), _2;
          case In2:
            if (un2)
              return un2.call(t) == un2.call(e);
        }
        return false;
      }
      function ch2(t, e, n2, r2, u3, o2) {
        var c = n2 & Ee2, f2 = pi2(t), l = f2.length, v3 = pi2(e), _2 = v3.length;
        if (l != _2 && !c)
          return false;
        for (var m2 = l; m2--; ) {
          var C3 = f2[m2];
          if (!(c ? C3 in e : W.call(e, C3)))
            return false;
        }
        var x3 = o2.get(t), S2 = o2.get(e);
        if (x3 && S2)
          return x3 == e && S2 == t;
        var L2 = true;
        o2.set(t, e), o2.set(e, t);
        for (var O2 = c; ++m2 < l; ) {
          C3 = f2[m2];
          var D2 = t[C3], $2 = e[C3];
          if (r2)
            var dt2 = c ? r2($2, D2, C3, e, t, o2) : r2(D2, $2, C3, t, e, o2);
          if (!(dt2 === i2 ? D2 === $2 || u3(D2, $2, n2, r2, o2) : dt2)) {
            L2 = false;
            break;
          }
          O2 || (O2 = C3 == "constructor");
        }
        if (L2 && !O2) {
          var st2 = t.constructor, gt2 = e.constructor;
          st2 != gt2 && "constructor" in t && "constructor" in e && !(typeof st2 == "function" && st2 instanceof st2 && typeof gt2 == "function" && gt2 instanceof gt2) && (L2 = false);
        }
        return o2.delete(t), o2.delete(e), L2;
      }
      function Xt2(t) {
        return Ci2(Nu2(t, i2, zu2), t + "");
      }
      function pi2(t) {
        return Xs2(t, k2, _i2);
      }
      function di2(t) {
        return Xs2(t, ot2, bu);
      }
      var gi2 = Mn ? function(t) {
        return Mn.get(t);
      } : Di2;
      function er2(t) {
        for (var e = t.name + "", n2 = Ue[e], r2 = W.call(Ue, e) ? n2.length : 0; r2--; ) {
          var u3 = n2[r2], o2 = u3.func;
          if (o2 == null || o2 == t)
            return u3.name;
        }
        return e;
      }
      function Me(t) {
        var e = W.call(a2, "placeholder") ? a2 : t;
        return e.placeholder;
      }
      function E2() {
        var t = a2.iteratee || Li2;
        return t = t === Li2 ? ks2 : t, arguments.length ? t(arguments[0], arguments[1]) : t;
      }
      function nr2(t, e) {
        var n2 = t.__data__;
        return _h2(e) ? n2[typeof e == "string" ? "string" : "hash"] : n2.map;
      }
      function vi(t) {
        for (var e = k2(t), n2 = e.length; n2--; ) {
          var r2 = e[n2], u3 = t[r2];
          e[n2] = [r2, u3, Hu2(u3)];
        }
        return e;
      }
      function we2(t, e) {
        var n2 = wc(t, e);
        return Vs2(n2) ? n2 : i2;
      }
      function fh(t) {
        var e = W.call(t, de2), n2 = t[de2];
        try {
          t[de2] = i2;
          var r2 = true;
        } catch {
        }
        var u3 = Hn2.call(t);
        return r2 && (e ? t[de2] = n2 : delete t[de2]), u3;
      }
      var _i2 = zr2 ? function(t) {
        return t == null ? [] : (t = M3(t), ne2(zr2(t), function(e) {
          return $s2.call(t, e);
        }));
      } : Ni2, bu = zr2 ? function(t) {
        for (var e = []; t; )
          re2(e, _i2(t)), t = $n2(t);
        return e;
      } : Ni2, nt2 = rt2;
      (Kr2 && nt2(new Kr2(new ArrayBuffer(1))) != Re2 || nn2 && nt2(new nn2()) != Et2 || Jr2 && nt2(Jr2.resolve()) != Ji2 || $e2 && nt2(new $e2()) != yt2 || rn2 && nt2(new rn2()) != ke) && (nt2 = function(t) {
        var e = rt2(t), n2 = e == zt2 ? t.constructor : i2, r2 = n2 ? Pe2(n2) : "";
        if (r2)
          switch (r2) {
            case Kc:
              return Re2;
            case Jc:
              return Et2;
            case Yc:
              return Ji2;
            case Zc:
              return yt2;
            case Xc:
              return ke;
          }
        return e;
      });
      function hh2(t, e, n2) {
        for (var r2 = -1, u3 = n2.length; ++r2 < u3; ) {
          var o2 = n2[r2], c = o2.size;
          switch (o2.type) {
            case "drop":
              t += c;
              break;
            case "dropRight":
              e -= c;
              break;
            case "take":
              e = et2(e, t + c);
              break;
            case "takeRight":
              t = V2(t, e - c);
              break;
          }
        }
        return { start: t, end: e };
      }
      function lh2(t) {
        var e = t.match(_o2);
        return e ? e[1].split(mo) : [];
      }
      function Tu2(t, e, n2) {
        e = oe2(e, t);
        for (var r2 = -1, u3 = e.length, o2 = false; ++r2 < u3; ) {
          var c = Wt2(e[r2]);
          if (!(o2 = t != null && n2(t, c)))
            break;
          t = t[c];
        }
        return o2 || ++r2 != u3 ? o2 : (u3 = t == null ? 0 : t.length, !!u3 && cr2(u3) && Qt2(c, u3) && (b2(t) || Ce2(t)));
      }
      function ph2(t) {
        var e = t.length, n2 = new t.constructor(e);
        return e && typeof t[0] == "string" && W.call(t, "index") && (n2.index = t.index, n2.input = t.input), n2;
      }
      function Lu2(t) {
        return typeof t.constructor == "function" && !pn2(t) ? qe($n2(t)) : {};
      }
      function dh2(t, e, n2) {
        var r2 = t.constructor;
        switch (e) {
          case je:
            return fi2(t);
          case Ye:
          case Ze2:
            return new r2(+t);
          case Re2:
            return Vf2(t, n2);
          case vr3:
          case _r2:
          case mr2:
          case wr2:
          case Pr2:
          case Cr2:
          case Ar2:
          case Ir2:
          case xr2:
            return du2(t, n2);
          case Et2:
            return new r2();
          case Xe2:
          case Ve:
            return new r2(t);
          case Qe2:
            return kf2(t);
          case yt2:
            return new r2();
          case In2:
            return jf2(t);
        }
      }
      function gh2(t, e) {
        var n2 = e.length;
        if (!n2)
          return t;
        var r2 = n2 - 1;
        return e[r2] = (n2 > 1 ? "& " : "") + e[r2], e = e.join(n2 > 2 ? ", " : " "), t.replace(vo2, `{
/* [wrapped with ` + e + `] */
`);
      }
      function vh2(t) {
        return b2(t) || Ce2(t) || !!(Us2 && t && t[Us2]);
      }
      function Qt2(t, e) {
        var n2 = typeof t;
        return e = e ?? ee2, !!e && (n2 == "number" || n2 != "symbol" && So2.test(t)) && t > -1 && t % 1 == 0 && t < e;
      }
      function it2(t, e, n2) {
        if (!K2(n2))
          return false;
        var r2 = typeof e;
        return (r2 == "number" ? at2(n2) && Qt2(e, n2.length) : r2 == "string" && e in n2) ? Rt2(n2[e], t) : false;
      }
      function mi2(t, e) {
        if (b2(t))
          return false;
        var n2 = typeof t;
        return n2 == "number" || n2 == "symbol" || n2 == "boolean" || t == null || pt2(t) ? true : ho2.test(t) || !fo.test(t) || e != null && t in M3(e);
      }
      function _h2(t) {
        var e = typeof t;
        return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
      }
      function wi(t) {
        var e = er2(t), n2 = a2[e];
        if (typeof n2 != "function" || !(e in N2.prototype))
          return false;
        if (t === n2)
          return true;
        var r2 = gi2(n2);
        return !!r2 && t === r2[0];
      }
      function mh2(t) {
        return !!Hs2 && Hs2 in t;
      }
      var wh2 = Tn2 ? Vt2 : $i2;
      function pn2(t) {
        var e = t && t.constructor, n2 = typeof e == "function" && e.prototype || Ne;
        return t === n2;
      }
      function Hu2(t) {
        return t === t && !K2(t);
      }
      function Du2(t, e) {
        return function(n2) {
          return n2 == null ? false : n2[t] === e && (e !== i2 || t in M3(n2));
        };
      }
      function Ph(t) {
        var e = ar2(t, function(r2) {
          return n2.size === Ke && n2.clear(), r2;
        }), n2 = e.cache;
        return e;
      }
      function Ch2(t, e) {
        var n2 = t[1], r2 = e[1], u3 = n2 | r2, o2 = u3 < (vt2 | he2 | Gt2), c = r2 == Gt2 && n2 == Nt2 || r2 == Gt2 && n2 == Je && t[7].length <= e[8] || r2 == (Gt2 | Je) && e[7].length <= e[8] && n2 == Nt2;
        if (!(o2 || c))
          return t;
        r2 & vt2 && (t[2] = e[2], u3 |= n2 & vt2 ? 0 : Gi2);
        var f2 = e[3];
        if (f2) {
          var l = t[3];
          t[3] = l ? vu2(l, f2, e[4]) : f2, t[4] = l ? ie2(t[3], Ie2) : e[4];
        }
        return f2 = e[5], f2 && (l = t[5], t[5] = l ? _u2(l, f2, e[6]) : f2, t[6] = l ? ie2(t[5], Ie2) : e[6]), f2 = e[7], f2 && (t[7] = f2), r2 & Gt2 && (t[8] = t[8] == null ? e[8] : et2(t[8], e[8])), t[9] == null && (t[9] = e[9]), t[0] = e[0], t[1] = u3, t;
      }
      function Ah2(t) {
        var e = [];
        if (t != null)
          for (var n2 in M3(t))
            e.push(n2);
        return e;
      }
      function Ih2(t) {
        return Hn2.call(t);
      }
      function Nu2(t, e, n2) {
        return e = V2(e === i2 ? t.length - 1 : e, 0), function() {
          for (var r2 = arguments, u3 = -1, o2 = V2(r2.length - e, 0), c = d2(o2); ++u3 < o2; )
            c[u3] = r2[e + u3];
          u3 = -1;
          for (var f2 = d2(e + 1); ++u3 < e; )
            f2[u3] = r2[u3];
          return f2[e] = n2(c), ft2(t, this, f2);
        };
      }
      function $u2(t, e) {
        return e.length < 2 ? t : me2(t, At2(e, 0, -1));
      }
      function xh2(t, e) {
        for (var n2 = t.length, r2 = et2(e.length, n2), u3 = ut2(t); r2--; ) {
          var o2 = e[r2];
          t[r2] = Qt2(o2, n2) ? u3[o2] : i2;
        }
        return t;
      }
      function Pi2(t, e) {
        if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
          return t[e];
      }
      var Uu2 = Fu2(uu2), dn2 = qc || function(t, e) {
        return j2.setTimeout(t, e);
      }, Ci2 = Fu2(Yf2);
      function qu2(t, e, n2) {
        var r2 = e + "";
        return Ci2(t, gh2(r2, Eh2(lh2(r2), n2)));
      }
      function Fu2(t) {
        var e = 0, n2 = 0;
        return function() {
          var r2 = Bc(), u3 = za2 - (r2 - n2);
          if (n2 = r2, u3 > 0) {
            if (++e >= Ga2)
              return arguments[0];
          } else
            e = 0;
          return t.apply(i2, arguments);
        };
      }
      function rr2(t, e) {
        var n2 = -1, r2 = t.length, u3 = r2 - 1;
        for (e = e === i2 ? r2 : e; ++n2 < e; ) {
          var o2 = ri2(n2, u3), c = t[o2];
          t[o2] = t[n2], t[n2] = c;
        }
        return t.length = e, t;
      }
      var Wu2 = Ph(function(t) {
        var e = [];
        return t.charCodeAt(0) === 46 && e.push(""), t.replace(lo2, function(n2, r2, u3, o2) {
          e.push(u3 ? o2.replace(Co2, "$1") : r2 || n2);
        }), e;
      });
      function Wt2(t) {
        if (typeof t == "string" || pt2(t))
          return t;
        var e = t + "";
        return e == "0" && 1 / t == -le2 ? "-0" : e;
      }
      function Pe2(t) {
        if (t != null) {
          try {
            return Ln2.call(t);
          } catch {
          }
          try {
            return t + "";
          } catch {
          }
        }
        return "";
      }
      function Eh2(t, e) {
        return mt2(Qa2, function(n2) {
          var r2 = "_." + n2[0];
          e & n2[1] && !Sn2(t, r2) && t.push(r2);
        }), t.sort();
      }
      function Mu2(t) {
        if (t instanceof N2)
          return t.clone();
        var e = new Pt2(t.__wrapped__, t.__chain__);
        return e.__actions__ = ut2(t.__actions__), e.__index__ = t.__index__, e.__values__ = t.__values__, e;
      }
      function yh2(t, e, n2) {
        (n2 ? it2(t, e, n2) : e === i2) ? e = 1 : e = V2(T2(e), 0);
        var r2 = t == null ? 0 : t.length;
        if (!r2 || e < 1)
          return [];
        for (var u3 = 0, o2 = 0, c = d2(Fn(r2 / e)); u3 < r2; )
          c[o2++] = At2(t, u3, u3 += e);
        return c;
      }
      function Sh2(t) {
        for (var e = -1, n2 = t == null ? 0 : t.length, r2 = 0, u3 = []; ++e < n2; ) {
          var o2 = t[e];
          o2 && (u3[r2++] = o2);
        }
        return u3;
      }
      function Oh() {
        var t = arguments.length;
        if (!t)
          return [];
        for (var e = d2(t - 1), n2 = arguments[0], r2 = t; r2--; )
          e[r2 - 1] = arguments[r2];
        return re2(b2(n2) ? ut2(n2) : [n2], tt2(e, 1));
      }
      var Rh2 = H(function(t, e) {
        return Z2(t) ? on2(t, tt2(e, 1, Z2, true)) : [];
      }), bh2 = H(function(t, e) {
        var n2 = It2(e);
        return Z2(n2) && (n2 = i2), Z2(t) ? on2(t, tt2(e, 1, Z2, true), E2(n2, 2)) : [];
      }), Th = H(function(t, e) {
        var n2 = It2(e);
        return Z2(n2) && (n2 = i2), Z2(t) ? on2(t, tt2(e, 1, Z2, true), i2, n2) : [];
      });
      function Lh(t, e, n2) {
        var r2 = t == null ? 0 : t.length;
        return r2 ? (e = n2 || e === i2 ? 1 : T2(e), At2(t, e < 0 ? 0 : e, r2)) : [];
      }
      function Hh(t, e, n2) {
        var r2 = t == null ? 0 : t.length;
        return r2 ? (e = n2 || e === i2 ? 1 : T2(e), e = r2 - e, At2(t, 0, e < 0 ? 0 : e)) : [];
      }
      function Dh(t, e) {
        return t && t.length ? Xn2(t, E2(e, 3), true, true) : [];
      }
      function Nh2(t, e) {
        return t && t.length ? Xn2(t, E2(e, 3), true) : [];
      }
      function $h(t, e, n2, r2) {
        var u3 = t == null ? 0 : t.length;
        return u3 ? (n2 && typeof n2 != "number" && it2(t, e, n2) && (n2 = 0, r2 = u3), Of2(t, e, n2, r2)) : [];
      }
      function Bu2(t, e, n2) {
        var r2 = t == null ? 0 : t.length;
        if (!r2)
          return -1;
        var u3 = n2 == null ? 0 : T2(n2);
        return u3 < 0 && (u3 = V2(r2 + u3, 0)), On2(t, E2(e, 3), u3);
      }
      function Gu2(t, e, n2) {
        var r2 = t == null ? 0 : t.length;
        if (!r2)
          return -1;
        var u3 = r2 - 1;
        return n2 !== i2 && (u3 = T2(n2), u3 = n2 < 0 ? V2(r2 + u3, 0) : et2(u3, r2 - 1)), On2(t, E2(e, 3), u3, true);
      }
      function zu2(t) {
        var e = t == null ? 0 : t.length;
        return e ? tt2(t, 1) : [];
      }
      function Uh(t) {
        var e = t == null ? 0 : t.length;
        return e ? tt2(t, le2) : [];
      }
      function qh(t, e) {
        var n2 = t == null ? 0 : t.length;
        return n2 ? (e = e === i2 ? 1 : T2(e), tt2(t, e)) : [];
      }
      function Fh(t) {
        for (var e = -1, n2 = t == null ? 0 : t.length, r2 = {}; ++e < n2; ) {
          var u3 = t[e];
          r2[u3[0]] = u3[1];
        }
        return r2;
      }
      function Ku2(t) {
        return t && t.length ? t[0] : i2;
      }
      function Wh(t, e, n2) {
        var r2 = t == null ? 0 : t.length;
        if (!r2)
          return -1;
        var u3 = n2 == null ? 0 : T2(n2);
        return u3 < 0 && (u3 = V2(r2 + u3, 0)), Te2(t, e, u3);
      }
      function Mh2(t) {
        var e = t == null ? 0 : t.length;
        return e ? At2(t, 0, -1) : [];
      }
      var Bh2 = H(function(t) {
        var e = z3(t, oi2);
        return e.length && e[0] === t[0] ? kr2(e) : [];
      }), Gh = H(function(t) {
        var e = It2(t), n2 = z3(t, oi2);
        return e === It2(n2) ? e = i2 : n2.pop(), n2.length && n2[0] === t[0] ? kr2(n2, E2(e, 2)) : [];
      }), zh = H(function(t) {
        var e = It2(t), n2 = z3(t, oi2);
        return e = typeof e == "function" ? e : i2, e && n2.pop(), n2.length && n2[0] === t[0] ? kr2(n2, i2, e) : [];
      });
      function Kh(t, e) {
        return t == null ? "" : Wc.call(t, e);
      }
      function It2(t) {
        var e = t == null ? 0 : t.length;
        return e ? t[e - 1] : i2;
      }
      function Jh(t, e, n2) {
        var r2 = t == null ? 0 : t.length;
        if (!r2)
          return -1;
        var u3 = r2;
        return n2 !== i2 && (u3 = T2(n2), u3 = u3 < 0 ? V2(r2 + u3, 0) : et2(u3, r2 - 1)), e === e ? xc(t, e, u3) : On2(t, Es2, u3, true);
      }
      function Yh(t, e) {
        return t && t.length ? nu2(t, T2(e)) : i2;
      }
      var Zh = H(Ju2);
      function Ju2(t, e) {
        return t && t.length && e && e.length ? ni2(t, e) : t;
      }
      function Xh(t, e, n2) {
        return t && t.length && e && e.length ? ni2(t, e, E2(n2, 2)) : t;
      }
      function Qh(t, e, n2) {
        return t && t.length && e && e.length ? ni2(t, e, i2, n2) : t;
      }
      var Vh = Xt2(function(t, e) {
        var n2 = t == null ? 0 : t.length, r2 = Zr2(t, e);
        return su2(t, z3(e, function(u3) {
          return Qt2(u3, n2) ? +u3 : u3;
        }).sort(gu2)), r2;
      });
      function kh(t, e) {
        var n2 = [];
        if (!(t && t.length))
          return n2;
        var r2 = -1, u3 = [], o2 = t.length;
        for (e = E2(e, 3); ++r2 < o2; ) {
          var c = t[r2];
          e(c, r2, t) && (n2.push(c), u3.push(r2));
        }
        return su2(t, u3), n2;
      }
      function Ai(t) {
        return t == null ? t : zc.call(t);
      }
      function jh(t, e, n2) {
        var r2 = t == null ? 0 : t.length;
        return r2 ? (n2 && typeof n2 != "number" && it2(t, e, n2) ? (e = 0, n2 = r2) : (e = e == null ? 0 : T2(e), n2 = n2 === i2 ? r2 : T2(n2)), At2(t, e, n2)) : [];
      }
      function tl(t, e) {
        return Zn2(t, e);
      }
      function el(t, e, n2) {
        return si2(t, e, E2(n2, 2));
      }
      function nl(t, e) {
        var n2 = t == null ? 0 : t.length;
        if (n2) {
          var r2 = Zn2(t, e);
          if (r2 < n2 && Rt2(t[r2], e))
            return r2;
        }
        return -1;
      }
      function rl(t, e) {
        return Zn2(t, e, true);
      }
      function il(t, e, n2) {
        return si2(t, e, E2(n2, 2), true);
      }
      function sl(t, e) {
        var n2 = t == null ? 0 : t.length;
        if (n2) {
          var r2 = Zn2(t, e, true) - 1;
          if (Rt2(t[r2], e))
            return r2;
        }
        return -1;
      }
      function ul(t) {
        return t && t.length ? au2(t) : [];
      }
      function al(t, e) {
        return t && t.length ? au2(t, E2(e, 2)) : [];
      }
      function ol(t) {
        var e = t == null ? 0 : t.length;
        return e ? At2(t, 1, e) : [];
      }
      function cl(t, e, n2) {
        return t && t.length ? (e = n2 || e === i2 ? 1 : T2(e), At2(t, 0, e < 0 ? 0 : e)) : [];
      }
      function fl(t, e, n2) {
        var r2 = t == null ? 0 : t.length;
        return r2 ? (e = n2 || e === i2 ? 1 : T2(e), e = r2 - e, At2(t, e < 0 ? 0 : e, r2)) : [];
      }
      function hl(t, e) {
        return t && t.length ? Xn2(t, E2(e, 3), false, true) : [];
      }
      function ll(t, e) {
        return t && t.length ? Xn2(t, E2(e, 3)) : [];
      }
      var pl = H(function(t) {
        return ae2(tt2(t, 1, Z2, true));
      }), dl = H(function(t) {
        var e = It2(t);
        return Z2(e) && (e = i2), ae2(tt2(t, 1, Z2, true), E2(e, 2));
      }), gl = H(function(t) {
        var e = It2(t);
        return e = typeof e == "function" ? e : i2, ae2(tt2(t, 1, Z2, true), i2, e);
      });
      function vl(t) {
        return t && t.length ? ae2(t) : [];
      }
      function _l(t, e) {
        return t && t.length ? ae2(t, E2(e, 2)) : [];
      }
      function ml(t, e) {
        return e = typeof e == "function" ? e : i2, t && t.length ? ae2(t, i2, e) : [];
      }
      function Ii2(t) {
        if (!(t && t.length))
          return [];
        var e = 0;
        return t = ne2(t, function(n2) {
          if (Z2(n2))
            return e = V2(n2.length, e), true;
        }), Wr2(e, function(n2) {
          return z3(t, Ur2(n2));
        });
      }
      function Yu2(t, e) {
        if (!(t && t.length))
          return [];
        var n2 = Ii2(t);
        return e == null ? n2 : z3(n2, function(r2) {
          return ft2(e, i2, r2);
        });
      }
      var wl = H(function(t, e) {
        return Z2(t) ? on2(t, e) : [];
      }), Pl = H(function(t) {
        return ai2(ne2(t, Z2));
      }), Cl = H(function(t) {
        var e = It2(t);
        return Z2(e) && (e = i2), ai2(ne2(t, Z2), E2(e, 2));
      }), Al = H(function(t) {
        var e = It2(t);
        return e = typeof e == "function" ? e : i2, ai2(ne2(t, Z2), i2, e);
      }), Il = H(Ii2);
      function xl(t, e) {
        return hu2(t || [], e || [], an2);
      }
      function El(t, e) {
        return hu2(t || [], e || [], hn2);
      }
      var yl = H(function(t) {
        var e = t.length, n2 = e > 1 ? t[e - 1] : i2;
        return n2 = typeof n2 == "function" ? (t.pop(), n2) : i2, Yu2(t, n2);
      });
      function Zu2(t) {
        var e = a2(t);
        return e.__chain__ = true, e;
      }
      function Sl(t, e) {
        return e(t), t;
      }
      function ir2(t, e) {
        return e(t);
      }
      var Ol = Xt2(function(t) {
        var e = t.length, n2 = e ? t[0] : 0, r2 = this.__wrapped__, u3 = function(o2) {
          return Zr2(o2, t);
        };
        return e > 1 || this.__actions__.length || !(r2 instanceof N2) || !Qt2(n2) ? this.thru(u3) : (r2 = r2.slice(n2, +n2 + (e ? 1 : 0)), r2.__actions__.push({ func: ir2, args: [u3], thisArg: i2 }), new Pt2(r2, this.__chain__).thru(function(o2) {
          return e && !o2.length && o2.push(i2), o2;
        }));
      });
      function Rl() {
        return Zu2(this);
      }
      function bl() {
        return new Pt2(this.value(), this.__chain__);
      }
      function Tl() {
        this.__values__ === i2 && (this.__values__ = oa2(this.value()));
        var t = this.__index__ >= this.__values__.length, e = t ? i2 : this.__values__[this.__index__++];
        return { done: t, value: e };
      }
      function Ll() {
        return this;
      }
      function Hl(t) {
        for (var e, n2 = this; n2 instanceof Gn2; ) {
          var r2 = Mu2(n2);
          r2.__index__ = 0, r2.__values__ = i2, e ? u3.__wrapped__ = r2 : e = r2;
          var u3 = r2;
          n2 = n2.__wrapped__;
        }
        return u3.__wrapped__ = t, e;
      }
      function Dl() {
        var t = this.__wrapped__;
        if (t instanceof N2) {
          var e = t;
          return this.__actions__.length && (e = new N2(this)), e = e.reverse(), e.__actions__.push({ func: ir2, args: [Ai], thisArg: i2 }), new Pt2(e, this.__chain__);
        }
        return this.thru(Ai);
      }
      function Nl() {
        return fu(this.__wrapped__, this.__actions__);
      }
      var $l = Qn2(function(t, e, n2) {
        W.call(t, n2) ? ++t[n2] : Yt2(t, n2, 1);
      });
      function Ul(t, e, n2) {
        var r2 = b2(t) ? Is2 : Sf2;
        return n2 && it2(t, e, n2) && (e = i2), r2(t, E2(e, 3));
      }
      function ql(t, e) {
        var n2 = b2(t) ? ne2 : Ys2;
        return n2(t, E2(e, 3));
      }
      var Fl = Cu2(Bu2), Wl = Cu2(Gu2);
      function Ml(t, e) {
        return tt2(sr2(t, e), 1);
      }
      function Bl(t, e) {
        return tt2(sr2(t, e), le2);
      }
      function Gl(t, e, n2) {
        return n2 = n2 === i2 ? 1 : T2(n2), tt2(sr2(t, e), n2);
      }
      function Xu2(t, e) {
        var n2 = b2(t) ? mt2 : ue2;
        return n2(t, E2(e, 3));
      }
      function Qu2(t, e) {
        var n2 = b2(t) ? ac : Js2;
        return n2(t, E2(e, 3));
      }
      var zl = Qn2(function(t, e, n2) {
        W.call(t, n2) ? t[n2].push(e) : Yt2(t, n2, [e]);
      });
      function Kl(t, e, n2, r2) {
        t = at2(t) ? t : Ge(t), n2 = n2 && !r2 ? T2(n2) : 0;
        var u3 = t.length;
        return n2 < 0 && (n2 = V2(u3 + n2, 0)), fr2(t) ? n2 <= u3 && t.indexOf(e, n2) > -1 : !!u3 && Te2(t, e, n2) > -1;
      }
      var Jl = H(function(t, e, n2) {
        var r2 = -1, u3 = typeof e == "function", o2 = at2(t) ? d2(t.length) : [];
        return ue2(t, function(c) {
          o2[++r2] = u3 ? ft2(e, c, n2) : cn2(c, e, n2);
        }), o2;
      }), Yl = Qn2(function(t, e, n2) {
        Yt2(t, n2, e);
      });
      function sr2(t, e) {
        var n2 = b2(t) ? z3 : js2;
        return n2(t, E2(e, 3));
      }
      function Zl(t, e, n2, r2) {
        return t == null ? [] : (b2(e) || (e = e == null ? [] : [e]), n2 = r2 ? i2 : n2, b2(n2) || (n2 = n2 == null ? [] : [n2]), ru2(t, e, n2));
      }
      var Xl = Qn2(function(t, e, n2) {
        t[n2 ? 0 : 1].push(e);
      }, function() {
        return [[], []];
      });
      function Ql(t, e, n2) {
        var r2 = b2(t) ? Nr2 : Ss2, u3 = arguments.length < 3;
        return r2(t, E2(e, 4), n2, u3, ue2);
      }
      function Vl(t, e, n2) {
        var r2 = b2(t) ? oc : Ss2, u3 = arguments.length < 3;
        return r2(t, E2(e, 4), n2, u3, Js2);
      }
      function kl(t, e) {
        var n2 = b2(t) ? ne2 : Ys2;
        return n2(t, or2(E2(e, 3)));
      }
      function jl(t) {
        var e = b2(t) ? Bs2 : Kf2;
        return e(t);
      }
      function tp(t, e, n2) {
        (n2 ? it2(t, e, n2) : e === i2) ? e = 1 : e = T2(e);
        var r2 = b2(t) ? Af2 : Jf2;
        return r2(t, e);
      }
      function ep(t) {
        var e = b2(t) ? If2 : Zf;
        return e(t);
      }
      function np(t) {
        if (t == null)
          return 0;
        if (at2(t))
          return fr2(t) ? He(t) : t.length;
        var e = nt2(t);
        return e == Et2 || e == yt2 ? t.size : ti2(t).length;
      }
      function rp(t, e, n2) {
        var r2 = b2(t) ? $r2 : Xf;
        return n2 && it2(t, e, n2) && (e = i2), r2(t, E2(e, 3));
      }
      var ip = H(function(t, e) {
        if (t == null)
          return [];
        var n2 = e.length;
        return n2 > 1 && it2(t, e[0], e[1]) ? e = [] : n2 > 2 && it2(e[0], e[1], e[2]) && (e = [e[0]]), ru2(t, tt2(e, 1), []);
      }), ur2 = Uc || function() {
        return j2.Date.now();
      };
      function sp(t, e) {
        if (typeof e != "function")
          throw new wt2(y3);
        return t = T2(t), function() {
          if (--t < 1)
            return e.apply(this, arguments);
        };
      }
      function Vu2(t, e, n2) {
        return e = n2 ? i2 : e, e = t && e == null ? t.length : e, Zt2(t, Gt2, i2, i2, i2, i2, e);
      }
      function ku2(t, e) {
        var n2;
        if (typeof e != "function")
          throw new wt2(y3);
        return t = T2(t), function() {
          return --t > 0 && (n2 = e.apply(this, arguments)), t <= 1 && (e = i2), n2;
        };
      }
      var xi2 = H(function(t, e, n2) {
        var r2 = vt2;
        if (n2.length) {
          var u3 = ie2(n2, Me(xi2));
          r2 |= $t2;
        }
        return Zt2(t, r2, e, n2, u3);
      }), ju2 = H(function(t, e, n2) {
        var r2 = vt2 | he2;
        if (n2.length) {
          var u3 = ie2(n2, Me(ju2));
          r2 |= $t2;
        }
        return Zt2(e, r2, t, n2, u3);
      });
      function ta2(t, e, n2) {
        e = n2 ? i2 : e;
        var r2 = Zt2(t, Nt2, i2, i2, i2, i2, i2, e);
        return r2.placeholder = ta2.placeholder, r2;
      }
      function ea2(t, e, n2) {
        e = n2 ? i2 : e;
        var r2 = Zt2(t, ye2, i2, i2, i2, i2, i2, e);
        return r2.placeholder = ea2.placeholder, r2;
      }
      function na2(t, e, n2) {
        var r2, u3, o2, c, f2, l, v3 = 0, _2 = false, m2 = false, C3 = true;
        if (typeof t != "function")
          throw new wt2(y3);
        e = xt2(e) || 0, K2(n2) && (_2 = !!n2.leading, m2 = "maxWait" in n2, o2 = m2 ? V2(xt2(n2.maxWait) || 0, e) : o2, C3 = "trailing" in n2 ? !!n2.trailing : C3);
        function x3(X) {
          var bt2 = r2, jt2 = u3;
          return r2 = u3 = i2, v3 = X, c = t.apply(jt2, bt2), c;
        }
        function S2(X) {
          return v3 = X, f2 = dn2(D2, e), _2 ? x3(X) : c;
        }
        function L2(X) {
          var bt2 = X - l, jt2 = X - v3, Ca2 = e - bt2;
          return m2 ? et2(Ca2, o2 - jt2) : Ca2;
        }
        function O2(X) {
          var bt2 = X - l, jt2 = X - v3;
          return l === i2 || bt2 >= e || bt2 < 0 || m2 && jt2 >= o2;
        }
        function D2() {
          var X = ur2();
          if (O2(X))
            return $2(X);
          f2 = dn2(D2, L2(X));
        }
        function $2(X) {
          return f2 = i2, C3 && r2 ? x3(X) : (r2 = u3 = i2, c);
        }
        function dt2() {
          f2 !== i2 && lu2(f2), v3 = 0, r2 = l = u3 = f2 = i2;
        }
        function st2() {
          return f2 === i2 ? c : $2(ur2());
        }
        function gt2() {
          var X = ur2(), bt2 = O2(X);
          if (r2 = arguments, u3 = this, l = X, bt2) {
            if (f2 === i2)
              return S2(l);
            if (m2)
              return lu2(f2), f2 = dn2(D2, e), x3(l);
          }
          return f2 === i2 && (f2 = dn2(D2, e)), c;
        }
        return gt2.cancel = dt2, gt2.flush = st2, gt2;
      }
      var up = H(function(t, e) {
        return Ks2(t, 1, e);
      }), ap = H(function(t, e, n2) {
        return Ks2(t, xt2(e) || 0, n2);
      });
      function op(t) {
        return Zt2(t, gr2);
      }
      function ar2(t, e) {
        if (typeof t != "function" || e != null && typeof e != "function")
          throw new wt2(y3);
        var n2 = function() {
          var r2 = arguments, u3 = e ? e.apply(this, r2) : r2[0], o2 = n2.cache;
          if (o2.has(u3))
            return o2.get(u3);
          var c = t.apply(this, r2);
          return n2.cache = o2.set(u3, c) || o2, c;
        };
        return n2.cache = new (ar2.Cache || Jt2)(), n2;
      }
      ar2.Cache = Jt2;
      function or2(t) {
        if (typeof t != "function")
          throw new wt2(y3);
        return function() {
          var e = arguments;
          switch (e.length) {
            case 0:
              return !t.call(this);
            case 1:
              return !t.call(this, e[0]);
            case 2:
              return !t.call(this, e[0], e[1]);
            case 3:
              return !t.call(this, e[0], e[1], e[2]);
          }
          return !t.apply(this, e);
        };
      }
      function cp(t) {
        return ku2(2, t);
      }
      var fp = Qf2(function(t, e) {
        e = e.length == 1 && b2(e[0]) ? z3(e[0], ht2(E2())) : z3(tt2(e, 1), ht2(E2()));
        var n2 = e.length;
        return H(function(r2) {
          for (var u3 = -1, o2 = et2(r2.length, n2); ++u3 < o2; )
            r2[u3] = e[u3].call(this, r2[u3]);
          return ft2(t, this, r2);
        });
      }), Ei2 = H(function(t, e) {
        var n2 = ie2(e, Me(Ei2));
        return Zt2(t, $t2, i2, e, n2);
      }), ra2 = H(function(t, e) {
        var n2 = ie2(e, Me(ra2));
        return Zt2(t, Se, i2, e, n2);
      }), hp = Xt2(function(t, e) {
        return Zt2(t, Je, i2, i2, i2, e);
      });
      function lp(t, e) {
        if (typeof t != "function")
          throw new wt2(y3);
        return e = e === i2 ? e : T2(e), H(t, e);
      }
      function pp(t, e) {
        if (typeof t != "function")
          throw new wt2(y3);
        return e = e == null ? 0 : V2(T2(e), 0), H(function(n2) {
          var r2 = n2[e], u3 = ce2(n2, 0, e);
          return r2 && re2(u3, r2), ft2(t, this, u3);
        });
      }
      function dp(t, e, n2) {
        var r2 = true, u3 = true;
        if (typeof t != "function")
          throw new wt2(y3);
        return K2(n2) && (r2 = "leading" in n2 ? !!n2.leading : r2, u3 = "trailing" in n2 ? !!n2.trailing : u3), na2(t, e, { leading: r2, maxWait: e, trailing: u3 });
      }
      function gp(t) {
        return Vu2(t, 1);
      }
      function vp(t, e) {
        return Ei2(ci2(e), t);
      }
      function _p() {
        if (!arguments.length)
          return [];
        var t = arguments[0];
        return b2(t) ? t : [t];
      }
      function mp(t) {
        return Ct2(t, xe2);
      }
      function wp(t, e) {
        return e = typeof e == "function" ? e : i2, Ct2(t, xe2, e);
      }
      function Pp(t) {
        return Ct2(t, Dt2 | xe2);
      }
      function Cp(t, e) {
        return e = typeof e == "function" ? e : i2, Ct2(t, Dt2 | xe2, e);
      }
      function Ap(t, e) {
        return e == null || zs2(t, e, k2(e));
      }
      function Rt2(t, e) {
        return t === e || t !== t && e !== e;
      }
      var Ip = tr2(Vr2), xp = tr2(function(t, e) {
        return t >= e;
      }), Ce2 = Qs2(function() {
        return arguments;
      }()) ? Qs2 : function(t) {
        return Y(t) && W.call(t, "callee") && !$s2.call(t, "callee");
      }, b2 = d2.isArray, Ep = _s2 ? ht2(_s2) : Hf2;
      function at2(t) {
        return t != null && cr2(t.length) && !Vt2(t);
      }
      function Z2(t) {
        return Y(t) && at2(t);
      }
      function yp(t) {
        return t === true || t === false || Y(t) && rt2(t) == Ye;
      }
      var fe2 = Fc || $i2, Sp = ms2 ? ht2(ms2) : Df2;
      function Op(t) {
        return Y(t) && t.nodeType === 1 && !gn2(t);
      }
      function Rp(t) {
        if (t == null)
          return true;
        if (at2(t) && (b2(t) || typeof t == "string" || typeof t.splice == "function" || fe2(t) || Be2(t) || Ce2(t)))
          return !t.length;
        var e = nt2(t);
        if (e == Et2 || e == yt2)
          return !t.size;
        if (pn2(t))
          return !ti2(t).length;
        for (var n2 in t)
          if (W.call(t, n2))
            return false;
        return true;
      }
      function bp(t, e) {
        return fn2(t, e);
      }
      function Tp(t, e, n2) {
        n2 = typeof n2 == "function" ? n2 : i2;
        var r2 = n2 ? n2(t, e) : i2;
        return r2 === i2 ? fn2(t, e, i2, n2) : !!r2;
      }
      function yi2(t) {
        if (!Y(t))
          return false;
        var e = rt2(t);
        return e == Cn2 || e == ka2 || typeof t.message == "string" && typeof t.name == "string" && !gn2(t);
      }
      function Lp(t) {
        return typeof t == "number" && qs2(t);
      }
      function Vt2(t) {
        if (!K2(t))
          return false;
        var e = rt2(t);
        return e == An2 || e == Ki2 || e == Va2 || e == to2;
      }
      function ia2(t) {
        return typeof t == "number" && t == T2(t);
      }
      function cr2(t) {
        return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ee2;
      }
      function K2(t) {
        var e = typeof t;
        return t != null && (e == "object" || e == "function");
      }
      function Y(t) {
        return t != null && typeof t == "object";
      }
      var sa2 = ws2 ? ht2(ws2) : $f;
      function Hp(t, e) {
        return t === e || jr2(t, e, vi(e));
      }
      function Dp(t, e, n2) {
        return n2 = typeof n2 == "function" ? n2 : i2, jr2(t, e, vi(e), n2);
      }
      function Np(t) {
        return ua2(t) && t != +t;
      }
      function $p(t) {
        if (wh2(t))
          throw new R2(I2);
        return Vs2(t);
      }
      function Up(t) {
        return t === null;
      }
      function qp(t) {
        return t == null;
      }
      function ua2(t) {
        return typeof t == "number" || Y(t) && rt2(t) == Xe2;
      }
      function gn2(t) {
        if (!Y(t) || rt2(t) != zt2)
          return false;
        var e = $n2(t);
        if (e === null)
          return true;
        var n2 = W.call(e, "constructor") && e.constructor;
        return typeof n2 == "function" && n2 instanceof n2 && Ln2.call(n2) == Hc;
      }
      var Si2 = Ps2 ? ht2(Ps2) : Uf2;
      function Fp(t) {
        return ia2(t) && t >= -ee2 && t <= ee2;
      }
      var aa2 = Cs2 ? ht2(Cs2) : qf2;
      function fr2(t) {
        return typeof t == "string" || !b2(t) && Y(t) && rt2(t) == Ve;
      }
      function pt2(t) {
        return typeof t == "symbol" || Y(t) && rt2(t) == In2;
      }
      var Be2 = As2 ? ht2(As2) : Ff2;
      function Wp(t) {
        return t === i2;
      }
      function Mp(t) {
        return Y(t) && nt2(t) == ke;
      }
      function Bp(t) {
        return Y(t) && rt2(t) == no2;
      }
      var Gp = tr2(ei2), zp = tr2(function(t, e) {
        return t <= e;
      });
      function oa2(t) {
        if (!t)
          return [];
        if (at2(t))
          return fr2(t) ? St2(t) : ut2(t);
        if (en2 && t[en2])
          return Cc(t[en2]());
        var e = nt2(t), n2 = e == Et2 ? Br2 : e == yt2 ? Rn2 : Ge;
        return n2(t);
      }
      function kt2(t) {
        if (!t)
          return t === 0 ? t : 0;
        if (t = xt2(t), t === le2 || t === -le2) {
          var e = t < 0 ? -1 : 1;
          return e * Ya2;
        }
        return t === t ? t : 0;
      }
      function T2(t) {
        var e = kt2(t), n2 = e % 1;
        return e === e ? n2 ? e - n2 : e : 0;
      }
      function ca2(t) {
        return t ? _e2(T2(t), 0, Ut3) : 0;
      }
      function xt2(t) {
        if (typeof t == "number")
          return t;
        if (pt2(t))
          return wn2;
        if (K2(t)) {
          var e = typeof t.valueOf == "function" ? t.valueOf() : t;
          t = K2(e) ? e + "" : e;
        }
        if (typeof t != "string")
          return t === 0 ? t : +t;
        t = Os2(t);
        var n2 = xo2.test(t);
        return n2 || yo2.test(t) ? ic(t.slice(2), n2 ? 2 : 8) : Io2.test(t) ? wn2 : +t;
      }
      function fa2(t) {
        return Ft2(t, ot2(t));
      }
      function Kp(t) {
        return t ? _e2(T2(t), -ee2, ee2) : t === 0 ? t : 0;
      }
      function q2(t) {
        return t == null ? "" : lt2(t);
      }
      var Jp = Fe(function(t, e) {
        if (pn2(e) || at2(e)) {
          Ft2(e, k2(e), t);
          return;
        }
        for (var n2 in e)
          W.call(e, n2) && an2(t, n2, e[n2]);
      }), ha2 = Fe(function(t, e) {
        Ft2(e, ot2(e), t);
      }), hr2 = Fe(function(t, e, n2, r2) {
        Ft2(e, ot2(e), t, r2);
      }), Yp = Fe(function(t, e, n2, r2) {
        Ft2(e, k2(e), t, r2);
      }), Zp = Xt2(Zr2);
      function Xp(t, e) {
        var n2 = qe(t);
        return e == null ? n2 : Gs2(n2, e);
      }
      var Qp = H(function(t, e) {
        t = M3(t);
        var n2 = -1, r2 = e.length, u3 = r2 > 2 ? e[2] : i2;
        for (u3 && it2(e[0], e[1], u3) && (r2 = 1); ++n2 < r2; )
          for (var o2 = e[n2], c = ot2(o2), f2 = -1, l = c.length; ++f2 < l; ) {
            var v3 = c[f2], _2 = t[v3];
            (_2 === i2 || Rt2(_2, Ne[v3]) && !W.call(t, v3)) && (t[v3] = o2[v3]);
          }
        return t;
      }), Vp = H(function(t) {
        return t.push(i2, Ou2), ft2(la2, i2, t);
      });
      function kp(t, e) {
        return xs2(t, E2(e, 3), qt2);
      }
      function jp(t, e) {
        return xs2(t, E2(e, 3), Qr2);
      }
      function td(t, e) {
        return t == null ? t : Xr2(t, E2(e, 3), ot2);
      }
      function ed(t, e) {
        return t == null ? t : Zs2(t, E2(e, 3), ot2);
      }
      function nd(t, e) {
        return t && qt2(t, E2(e, 3));
      }
      function rd(t, e) {
        return t && Qr2(t, E2(e, 3));
      }
      function id(t) {
        return t == null ? [] : Jn2(t, k2(t));
      }
      function sd(t) {
        return t == null ? [] : Jn2(t, ot2(t));
      }
      function Oi2(t, e, n2) {
        var r2 = t == null ? i2 : me2(t, e);
        return r2 === i2 ? n2 : r2;
      }
      function ud(t, e) {
        return t != null && Tu2(t, e, Rf2);
      }
      function Ri2(t, e) {
        return t != null && Tu2(t, e, bf2);
      }
      var ad = Iu2(function(t, e, n2) {
        e != null && typeof e.toString != "function" && (e = Hn2.call(e)), t[e] = n2;
      }, Ti2(ct2)), od = Iu2(function(t, e, n2) {
        e != null && typeof e.toString != "function" && (e = Hn2.call(e)), W.call(t, e) ? t[e].push(n2) : t[e] = [n2];
      }, E2), cd = H(cn2);
      function k2(t) {
        return at2(t) ? Ms2(t) : ti2(t);
      }
      function ot2(t) {
        return at2(t) ? Ms2(t, true) : Wf2(t);
      }
      function fd(t, e) {
        var n2 = {};
        return e = E2(e, 3), qt2(t, function(r2, u3, o2) {
          Yt2(n2, e(r2, u3, o2), r2);
        }), n2;
      }
      function hd(t, e) {
        var n2 = {};
        return e = E2(e, 3), qt2(t, function(r2, u3, o2) {
          Yt2(n2, u3, e(r2, u3, o2));
        }), n2;
      }
      var ld = Fe(function(t, e, n2) {
        Yn2(t, e, n2);
      }), la2 = Fe(function(t, e, n2, r2) {
        Yn2(t, e, n2, r2);
      }), pd = Xt2(function(t, e) {
        var n2 = {};
        if (t == null)
          return n2;
        var r2 = false;
        e = z3(e, function(o2) {
          return o2 = oe2(o2, t), r2 || (r2 = o2.length > 1), o2;
        }), Ft2(t, di2(t), n2), r2 && (n2 = Ct2(n2, Dt2 | Bt2 | xe2, ah));
        for (var u3 = e.length; u3--; )
          ui2(n2, e[u3]);
        return n2;
      });
      function dd(t, e) {
        return pa2(t, or2(E2(e)));
      }
      var gd = Xt2(function(t, e) {
        return t == null ? {} : Bf2(t, e);
      });
      function pa2(t, e) {
        if (t == null)
          return {};
        var n2 = z3(di2(t), function(r2) {
          return [r2];
        });
        return e = E2(e), iu2(t, n2, function(r2, u3) {
          return e(r2, u3[0]);
        });
      }
      function vd(t, e, n2) {
        e = oe2(e, t);
        var r2 = -1, u3 = e.length;
        for (u3 || (u3 = 1, t = i2); ++r2 < u3; ) {
          var o2 = t == null ? i2 : t[Wt2(e[r2])];
          o2 === i2 && (r2 = u3, o2 = n2), t = Vt2(o2) ? o2.call(t) : o2;
        }
        return t;
      }
      function _d(t, e, n2) {
        return t == null ? t : hn2(t, e, n2);
      }
      function md(t, e, n2, r2) {
        return r2 = typeof r2 == "function" ? r2 : i2, t == null ? t : hn2(t, e, n2, r2);
      }
      var da2 = yu(k2), ga2 = yu(ot2);
      function wd(t, e, n2) {
        var r2 = b2(t), u3 = r2 || fe2(t) || Be2(t);
        if (e = E2(e, 4), n2 == null) {
          var o2 = t && t.constructor;
          u3 ? n2 = r2 ? new o2() : [] : K2(t) ? n2 = Vt2(o2) ? qe($n2(t)) : {} : n2 = {};
        }
        return (u3 ? mt2 : qt2)(t, function(c, f2, l) {
          return e(n2, c, f2, l);
        }), n2;
      }
      function Pd(t, e) {
        return t == null ? true : ui2(t, e);
      }
      function Cd(t, e, n2) {
        return t == null ? t : cu2(t, e, ci2(n2));
      }
      function Ad(t, e, n2, r2) {
        return r2 = typeof r2 == "function" ? r2 : i2, t == null ? t : cu2(t, e, ci2(n2), r2);
      }
      function Ge(t) {
        return t == null ? [] : Mr2(t, k2(t));
      }
      function Id(t) {
        return t == null ? [] : Mr2(t, ot2(t));
      }
      function xd(t, e, n2) {
        return n2 === i2 && (n2 = e, e = i2), n2 !== i2 && (n2 = xt2(n2), n2 = n2 === n2 ? n2 : 0), e !== i2 && (e = xt2(e), e = e === e ? e : 0), _e2(xt2(t), e, n2);
      }
      function Ed(t, e, n2) {
        return e = kt2(e), n2 === i2 ? (n2 = e, e = 0) : n2 = kt2(n2), t = xt2(t), Tf2(t, e, n2);
      }
      function yd(t, e, n2) {
        if (n2 && typeof n2 != "boolean" && it2(t, e, n2) && (e = n2 = i2), n2 === i2 && (typeof e == "boolean" ? (n2 = e, e = i2) : typeof t == "boolean" && (n2 = t, t = i2)), t === i2 && e === i2 ? (t = 0, e = 1) : (t = kt2(t), e === i2 ? (e = t, t = 0) : e = kt2(e)), t > e) {
          var r2 = t;
          t = e, e = r2;
        }
        if (n2 || t % 1 || e % 1) {
          var u3 = Fs2();
          return et2(t + u3 * (e - t + rc("1e-" + ((u3 + "").length - 1))), e);
        }
        return ri2(t, e);
      }
      var Sd = We2(function(t, e, n2) {
        return e = e.toLowerCase(), t + (n2 ? va2(e) : e);
      });
      function va2(t) {
        return bi2(q2(t).toLowerCase());
      }
      function _a2(t) {
        return t = q2(t), t && t.replace(Oo2, vc).replace(Yo, "");
      }
      function Od(t, e, n2) {
        t = q2(t), e = lt2(e);
        var r2 = t.length;
        n2 = n2 === i2 ? r2 : _e2(T2(n2), 0, r2);
        var u3 = n2;
        return n2 -= e.length, n2 >= 0 && t.slice(n2, u3) == e;
      }
      function Rd(t) {
        return t = q2(t), t && ao2.test(t) ? t.replace(Zi2, _c) : t;
      }
      function bd(t) {
        return t = q2(t), t && po2.test(t) ? t.replace(Er2, "\\$&") : t;
      }
      var Td = We2(function(t, e, n2) {
        return t + (n2 ? "-" : "") + e.toLowerCase();
      }), Ld = We2(function(t, e, n2) {
        return t + (n2 ? " " : "") + e.toLowerCase();
      }), Hd = Pu2("toLowerCase");
      function Dd(t, e, n2) {
        t = q2(t), e = T2(e);
        var r2 = e ? He(t) : 0;
        if (!e || r2 >= e)
          return t;
        var u3 = (e - r2) / 2;
        return jn2(Wn2(u3), n2) + t + jn2(Fn(u3), n2);
      }
      function Nd(t, e, n2) {
        t = q2(t), e = T2(e);
        var r2 = e ? He(t) : 0;
        return e && r2 < e ? t + jn2(e - r2, n2) : t;
      }
      function $d(t, e, n2) {
        t = q2(t), e = T2(e);
        var r2 = e ? He(t) : 0;
        return e && r2 < e ? jn2(e - r2, n2) + t : t;
      }
      function Ud(t, e, n2) {
        return n2 || e == null ? e = 0 : e && (e = +e), Gc(q2(t).replace(yr2, ""), e || 0);
      }
      function qd(t, e, n2) {
        return (n2 ? it2(t, e, n2) : e === i2) ? e = 1 : e = T2(e), ii2(q2(t), e);
      }
      function Fd() {
        var t = arguments, e = q2(t[0]);
        return t.length < 3 ? e : e.replace(t[1], t[2]);
      }
      var Wd = We2(function(t, e, n2) {
        return t + (n2 ? "_" : "") + e.toLowerCase();
      });
      function Md(t, e, n2) {
        return n2 && typeof n2 != "number" && it2(t, e, n2) && (e = n2 = i2), n2 = n2 === i2 ? Ut3 : n2 >>> 0, n2 ? (t = q2(t), t && (typeof e == "string" || e != null && !Si2(e)) && (e = lt2(e), !e && Le2(t)) ? ce2(St2(t), 0, n2) : t.split(e, n2)) : [];
      }
      var Bd = We2(function(t, e, n2) {
        return t + (n2 ? " " : "") + bi2(e);
      });
      function Gd(t, e, n2) {
        return t = q2(t), n2 = n2 == null ? 0 : _e2(T2(n2), 0, t.length), e = lt2(e), t.slice(n2, n2 + e.length) == e;
      }
      function zd(t, e, n2) {
        var r2 = a2.templateSettings;
        n2 && it2(t, e, n2) && (e = i2), t = q2(t), e = hr2({}, e, r2, Su2);
        var u3 = hr2({}, e.imports, r2.imports, Su2), o2 = k2(u3), c = Mr2(u3, o2), f2, l, v3 = 0, _2 = e.interpolate || xn2, m2 = "__p += '", C3 = Gr2((e.escape || xn2).source + "|" + _2.source + "|" + (_2 === Xi2 ? Ao : xn2).source + "|" + (e.evaluate || xn2).source + "|$", "g"), x3 = "//# sourceURL=" + (W.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++ko2 + "]") + `
`;
        t.replace(C3, function(O2, D2, $2, dt2, st2, gt2) {
          return $2 || ($2 = dt2), m2 += t.slice(v3, gt2).replace(Ro2, mc), D2 && (f2 = true, m2 += `' +
__e(` + D2 + `) +
'`), st2 && (l = true, m2 += `';
` + st2 + `;
__p += '`), $2 && (m2 += `' +
((__t = (` + $2 + `)) == null ? '' : __t) +
'`), v3 = gt2 + O2.length, O2;
        }), m2 += `';
`;
        var S2 = W.call(e, "variable") && e.variable;
        if (!S2)
          m2 = `with (obj) {
` + m2 + `
}
`;
        else if (Po2.test(S2))
          throw new R2(J);
        m2 = (l ? m2.replace(ro2, "") : m2).replace(io, "$1").replace(so2, "$1;"), m2 = "function(" + (S2 || "obj") + `) {
` + (S2 ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (f2 ? ", __e = _.escape" : "") + (l ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + m2 + `return __p
}`;
        var L2 = wa2(function() {
          return U2(o2, x3 + "return " + m2).apply(i2, c);
        });
        if (L2.source = m2, yi2(L2))
          throw L2;
        return L2;
      }
      function Kd(t) {
        return q2(t).toLowerCase();
      }
      function Jd(t) {
        return q2(t).toUpperCase();
      }
      function Yd(t, e, n2) {
        if (t = q2(t), t && (n2 || e === i2))
          return Os2(t);
        if (!t || !(e = lt2(e)))
          return t;
        var r2 = St2(t), u3 = St2(e), o2 = Rs2(r2, u3), c = bs2(r2, u3) + 1;
        return ce2(r2, o2, c).join("");
      }
      function Zd(t, e, n2) {
        if (t = q2(t), t && (n2 || e === i2))
          return t.slice(0, Ls2(t) + 1);
        if (!t || !(e = lt2(e)))
          return t;
        var r2 = St2(t), u3 = bs2(r2, St2(e)) + 1;
        return ce2(r2, 0, u3).join("");
      }
      function Xd(t, e, n2) {
        if (t = q2(t), t && (n2 || e === i2))
          return t.replace(yr2, "");
        if (!t || !(e = lt2(e)))
          return t;
        var r2 = St2(t), u3 = Rs2(r2, St2(e));
        return ce2(r2, u3).join("");
      }
      function Qd(t, e) {
        var n2 = Ma2, r2 = Ba2;
        if (K2(e)) {
          var u3 = "separator" in e ? e.separator : u3;
          n2 = "length" in e ? T2(e.length) : n2, r2 = "omission" in e ? lt2(e.omission) : r2;
        }
        t = q2(t);
        var o2 = t.length;
        if (Le2(t)) {
          var c = St2(t);
          o2 = c.length;
        }
        if (n2 >= o2)
          return t;
        var f2 = n2 - He(r2);
        if (f2 < 1)
          return r2;
        var l = c ? ce2(c, 0, f2).join("") : t.slice(0, f2);
        if (u3 === i2)
          return l + r2;
        if (c && (f2 += l.length - f2), Si2(u3)) {
          if (t.slice(f2).search(u3)) {
            var v3, _2 = l;
            for (u3.global || (u3 = Gr2(u3.source, q2(Qi2.exec(u3)) + "g")), u3.lastIndex = 0; v3 = u3.exec(_2); )
              var m2 = v3.index;
            l = l.slice(0, m2 === i2 ? f2 : m2);
          }
        } else if (t.indexOf(lt2(u3), f2) != f2) {
          var C3 = l.lastIndexOf(u3);
          C3 > -1 && (l = l.slice(0, C3));
        }
        return l + r2;
      }
      function Vd(t) {
        return t = q2(t), t && uo2.test(t) ? t.replace(Yi2, Ec) : t;
      }
      var kd = We2(function(t, e, n2) {
        return t + (n2 ? " " : "") + e.toUpperCase();
      }), bi2 = Pu2("toUpperCase");
      function ma2(t, e, n2) {
        return t = q2(t), e = n2 ? i2 : e, e === i2 ? Pc(t) ? Oc(t) : hc(t) : t.match(e) || [];
      }
      var wa2 = H(function(t, e) {
        try {
          return ft2(t, i2, e);
        } catch (n2) {
          return yi2(n2) ? n2 : new R2(n2);
        }
      }), jd = Xt2(function(t, e) {
        return mt2(e, function(n2) {
          n2 = Wt2(n2), Yt2(t, n2, xi2(t[n2], t));
        }), t;
      });
      function tg(t) {
        var e = t == null ? 0 : t.length, n2 = E2();
        return t = e ? z3(t, function(r2) {
          if (typeof r2[1] != "function")
            throw new wt2(y3);
          return [n2(r2[0]), r2[1]];
        }) : [], H(function(r2) {
          for (var u3 = -1; ++u3 < e; ) {
            var o2 = t[u3];
            if (ft2(o2[0], this, r2))
              return ft2(o2[1], this, r2);
          }
        });
      }
      function eg(t) {
        return yf2(Ct2(t, Dt2));
      }
      function Ti2(t) {
        return function() {
          return t;
        };
      }
      function ng(t, e) {
        return t == null || t !== t ? e : t;
      }
      var rg = Au(), ig = Au(true);
      function ct2(t) {
        return t;
      }
      function Li2(t) {
        return ks2(typeof t == "function" ? t : Ct2(t, Dt2));
      }
      function sg(t) {
        return tu2(Ct2(t, Dt2));
      }
      function ug(t, e) {
        return eu2(t, Ct2(e, Dt2));
      }
      var ag = H(function(t, e) {
        return function(n2) {
          return cn2(n2, t, e);
        };
      }), og = H(function(t, e) {
        return function(n2) {
          return cn2(t, n2, e);
        };
      });
      function Hi2(t, e, n2) {
        var r2 = k2(e), u3 = Jn2(e, r2);
        n2 == null && !(K2(e) && (u3.length || !r2.length)) && (n2 = e, e = t, t = this, u3 = Jn2(e, k2(e)));
        var o2 = !(K2(n2) && "chain" in n2) || !!n2.chain, c = Vt2(t);
        return mt2(u3, function(f2) {
          var l = e[f2];
          t[f2] = l, c && (t.prototype[f2] = function() {
            var v3 = this.__chain__;
            if (o2 || v3) {
              var _2 = t(this.__wrapped__), m2 = _2.__actions__ = ut2(this.__actions__);
              return m2.push({ func: l, args: arguments, thisArg: t }), _2.__chain__ = v3, _2;
            }
            return l.apply(t, re2([this.value()], arguments));
          });
        }), t;
      }
      function cg() {
        return j2._ === this && (j2._ = Dc), this;
      }
      function Di2() {
      }
      function fg(t) {
        return t = T2(t), H(function(e) {
          return nu2(e, t);
        });
      }
      var hg = hi2(z3), lg = hi2(Is2), pg = hi2($r2);
      function Pa2(t) {
        return mi2(t) ? Ur2(Wt2(t)) : Gf2(t);
      }
      function dg(t) {
        return function(e) {
          return t == null ? i2 : me2(t, e);
        };
      }
      var gg = xu2(), vg = xu2(true);
      function Ni2() {
        return [];
      }
      function $i2() {
        return false;
      }
      function _g() {
        return {};
      }
      function mg() {
        return "";
      }
      function wg() {
        return true;
      }
      function Pg(t, e) {
        if (t = T2(t), t < 1 || t > ee2)
          return [];
        var n2 = Ut3, r2 = et2(t, Ut3);
        e = E2(e), t -= Ut3;
        for (var u3 = Wr2(r2, e); ++n2 < t; )
          e(n2);
        return u3;
      }
      function Cg(t) {
        return b2(t) ? z3(t, Wt2) : pt2(t) ? [t] : ut2(Wu2(q2(t)));
      }
      function Ag(t) {
        var e = ++Lc;
        return q2(t) + e;
      }
      var Ig = kn2(function(t, e) {
        return t + e;
      }, 0), xg = li2("ceil"), Eg = kn2(function(t, e) {
        return t / e;
      }, 1), yg = li2("floor");
      function Sg(t) {
        return t && t.length ? Kn2(t, ct2, Vr2) : i2;
      }
      function Og(t, e) {
        return t && t.length ? Kn2(t, E2(e, 2), Vr2) : i2;
      }
      function Rg(t) {
        return ys2(t, ct2);
      }
      function bg(t, e) {
        return ys2(t, E2(e, 2));
      }
      function Tg(t) {
        return t && t.length ? Kn2(t, ct2, ei2) : i2;
      }
      function Lg(t, e) {
        return t && t.length ? Kn2(t, E2(e, 2), ei2) : i2;
      }
      var Hg = kn2(function(t, e) {
        return t * e;
      }, 1), Dg = li2("round"), Ng = kn2(function(t, e) {
        return t - e;
      }, 0);
      function $g(t) {
        return t && t.length ? Fr2(t, ct2) : 0;
      }
      function Ug(t, e) {
        return t && t.length ? Fr2(t, E2(e, 2)) : 0;
      }
      return a2.after = sp, a2.ary = Vu2, a2.assign = Jp, a2.assignIn = ha2, a2.assignInWith = hr2, a2.assignWith = Yp, a2.at = Zp, a2.before = ku2, a2.bind = xi2, a2.bindAll = jd, a2.bindKey = ju2, a2.castArray = _p, a2.chain = Zu2, a2.chunk = yh2, a2.compact = Sh2, a2.concat = Oh, a2.cond = tg, a2.conforms = eg, a2.constant = Ti2, a2.countBy = $l, a2.create = Xp, a2.curry = ta2, a2.curryRight = ea2, a2.debounce = na2, a2.defaults = Qp, a2.defaultsDeep = Vp, a2.defer = up, a2.delay = ap, a2.difference = Rh2, a2.differenceBy = bh2, a2.differenceWith = Th, a2.drop = Lh, a2.dropRight = Hh, a2.dropRightWhile = Dh, a2.dropWhile = Nh2, a2.fill = $h, a2.filter = ql, a2.flatMap = Ml, a2.flatMapDeep = Bl, a2.flatMapDepth = Gl, a2.flatten = zu2, a2.flattenDeep = Uh, a2.flattenDepth = qh, a2.flip = op, a2.flow = rg, a2.flowRight = ig, a2.fromPairs = Fh, a2.functions = id, a2.functionsIn = sd, a2.groupBy = zl, a2.initial = Mh2, a2.intersection = Bh2, a2.intersectionBy = Gh, a2.intersectionWith = zh, a2.invert = ad, a2.invertBy = od, a2.invokeMap = Jl, a2.iteratee = Li2, a2.keyBy = Yl, a2.keys = k2, a2.keysIn = ot2, a2.map = sr2, a2.mapKeys = fd, a2.mapValues = hd, a2.matches = sg, a2.matchesProperty = ug, a2.memoize = ar2, a2.merge = ld, a2.mergeWith = la2, a2.method = ag, a2.methodOf = og, a2.mixin = Hi2, a2.negate = or2, a2.nthArg = fg, a2.omit = pd, a2.omitBy = dd, a2.once = cp, a2.orderBy = Zl, a2.over = hg, a2.overArgs = fp, a2.overEvery = lg, a2.overSome = pg, a2.partial = Ei2, a2.partialRight = ra2, a2.partition = Xl, a2.pick = gd, a2.pickBy = pa2, a2.property = Pa2, a2.propertyOf = dg, a2.pull = Zh, a2.pullAll = Ju2, a2.pullAllBy = Xh, a2.pullAllWith = Qh, a2.pullAt = Vh, a2.range = gg, a2.rangeRight = vg, a2.rearg = hp, a2.reject = kl, a2.remove = kh, a2.rest = lp, a2.reverse = Ai, a2.sampleSize = tp, a2.set = _d, a2.setWith = md, a2.shuffle = ep, a2.slice = jh, a2.sortBy = ip, a2.sortedUniq = ul, a2.sortedUniqBy = al, a2.split = Md, a2.spread = pp, a2.tail = ol, a2.take = cl, a2.takeRight = fl, a2.takeRightWhile = hl, a2.takeWhile = ll, a2.tap = Sl, a2.throttle = dp, a2.thru = ir2, a2.toArray = oa2, a2.toPairs = da2, a2.toPairsIn = ga2, a2.toPath = Cg, a2.toPlainObject = fa2, a2.transform = wd, a2.unary = gp, a2.union = pl, a2.unionBy = dl, a2.unionWith = gl, a2.uniq = vl, a2.uniqBy = _l, a2.uniqWith = ml, a2.unset = Pd, a2.unzip = Ii2, a2.unzipWith = Yu2, a2.update = Cd, a2.updateWith = Ad, a2.values = Ge, a2.valuesIn = Id, a2.without = wl, a2.words = ma2, a2.wrap = vp, a2.xor = Pl, a2.xorBy = Cl, a2.xorWith = Al, a2.zip = Il, a2.zipObject = xl, a2.zipObjectDeep = El, a2.zipWith = yl, a2.entries = da2, a2.entriesIn = ga2, a2.extend = ha2, a2.extendWith = hr2, Hi2(a2, a2), a2.add = Ig, a2.attempt = wa2, a2.camelCase = Sd, a2.capitalize = va2, a2.ceil = xg, a2.clamp = xd, a2.clone = mp, a2.cloneDeep = Pp, a2.cloneDeepWith = Cp, a2.cloneWith = wp, a2.conformsTo = Ap, a2.deburr = _a2, a2.defaultTo = ng, a2.divide = Eg, a2.endsWith = Od, a2.eq = Rt2, a2.escape = Rd, a2.escapeRegExp = bd, a2.every = Ul, a2.find = Fl, a2.findIndex = Bu2, a2.findKey = kp, a2.findLast = Wl, a2.findLastIndex = Gu2, a2.findLastKey = jp, a2.floor = yg, a2.forEach = Xu2, a2.forEachRight = Qu2, a2.forIn = td, a2.forInRight = ed, a2.forOwn = nd, a2.forOwnRight = rd, a2.get = Oi2, a2.gt = Ip, a2.gte = xp, a2.has = ud, a2.hasIn = Ri2, a2.head = Ku2, a2.identity = ct2, a2.includes = Kl, a2.indexOf = Wh, a2.inRange = Ed, a2.invoke = cd, a2.isArguments = Ce2, a2.isArray = b2, a2.isArrayBuffer = Ep, a2.isArrayLike = at2, a2.isArrayLikeObject = Z2, a2.isBoolean = yp, a2.isBuffer = fe2, a2.isDate = Sp, a2.isElement = Op, a2.isEmpty = Rp, a2.isEqual = bp, a2.isEqualWith = Tp, a2.isError = yi2, a2.isFinite = Lp, a2.isFunction = Vt2, a2.isInteger = ia2, a2.isLength = cr2, a2.isMap = sa2, a2.isMatch = Hp, a2.isMatchWith = Dp, a2.isNaN = Np, a2.isNative = $p, a2.isNil = qp, a2.isNull = Up, a2.isNumber = ua2, a2.isObject = K2, a2.isObjectLike = Y, a2.isPlainObject = gn2, a2.isRegExp = Si2, a2.isSafeInteger = Fp, a2.isSet = aa2, a2.isString = fr2, a2.isSymbol = pt2, a2.isTypedArray = Be2, a2.isUndefined = Wp, a2.isWeakMap = Mp, a2.isWeakSet = Bp, a2.join = Kh, a2.kebabCase = Td, a2.last = It2, a2.lastIndexOf = Jh, a2.lowerCase = Ld, a2.lowerFirst = Hd, a2.lt = Gp, a2.lte = zp, a2.max = Sg, a2.maxBy = Og, a2.mean = Rg, a2.meanBy = bg, a2.min = Tg, a2.minBy = Lg, a2.stubArray = Ni2, a2.stubFalse = $i2, a2.stubObject = _g, a2.stubString = mg, a2.stubTrue = wg, a2.multiply = Hg, a2.nth = Yh, a2.noConflict = cg, a2.noop = Di2, a2.now = ur2, a2.pad = Dd, a2.padEnd = Nd, a2.padStart = $d, a2.parseInt = Ud, a2.random = yd, a2.reduce = Ql, a2.reduceRight = Vl, a2.repeat = qd, a2.replace = Fd, a2.result = vd, a2.round = Dg, a2.runInContext = h2, a2.sample = jl, a2.size = np, a2.snakeCase = Wd, a2.some = rp, a2.sortedIndex = tl, a2.sortedIndexBy = el, a2.sortedIndexOf = nl, a2.sortedLastIndex = rl, a2.sortedLastIndexBy = il, a2.sortedLastIndexOf = sl, a2.startCase = Bd, a2.startsWith = Gd, a2.subtract = Ng, a2.sum = $g, a2.sumBy = Ug, a2.template = zd, a2.times = Pg, a2.toFinite = kt2, a2.toInteger = T2, a2.toLength = ca2, a2.toLower = Kd, a2.toNumber = xt2, a2.toSafeInteger = Kp, a2.toString = q2, a2.toUpper = Jd, a2.trim = Yd, a2.trimEnd = Zd, a2.trimStart = Xd, a2.truncate = Qd, a2.unescape = Vd, a2.uniqueId = Ag, a2.upperCase = kd, a2.upperFirst = bi2, a2.each = Xu2, a2.eachRight = Qu2, a2.first = Ku2, Hi2(a2, function() {
        var t = {};
        return qt2(a2, function(e, n2) {
          W.call(a2.prototype, n2) || (t[n2] = e);
        }), t;
      }(), { chain: false }), a2.VERSION = p3, mt2(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
        a2[t].placeholder = a2;
      }), mt2(["drop", "take"], function(t, e) {
        N2.prototype[t] = function(n2) {
          n2 = n2 === i2 ? 1 : V2(T2(n2), 0);
          var r2 = this.__filtered__ && !e ? new N2(this) : this.clone();
          return r2.__filtered__ ? r2.__takeCount__ = et2(n2, r2.__takeCount__) : r2.__views__.push({ size: et2(n2, Ut3), type: t + (r2.__dir__ < 0 ? "Right" : "") }), r2;
        }, N2.prototype[t + "Right"] = function(n2) {
          return this.reverse()[t](n2).reverse();
        };
      }), mt2(["filter", "map", "takeWhile"], function(t, e) {
        var n2 = e + 1, r2 = n2 == zi2 || n2 == Ja2;
        N2.prototype[t] = function(u3) {
          var o2 = this.clone();
          return o2.__iteratees__.push({ iteratee: E2(u3, 3), type: n2 }), o2.__filtered__ = o2.__filtered__ || r2, o2;
        };
      }), mt2(["head", "last"], function(t, e) {
        var n2 = "take" + (e ? "Right" : "");
        N2.prototype[t] = function() {
          return this[n2](1).value()[0];
        };
      }), mt2(["initial", "tail"], function(t, e) {
        var n2 = "drop" + (e ? "" : "Right");
        N2.prototype[t] = function() {
          return this.__filtered__ ? new N2(this) : this[n2](1);
        };
      }), N2.prototype.compact = function() {
        return this.filter(ct2);
      }, N2.prototype.find = function(t) {
        return this.filter(t).head();
      }, N2.prototype.findLast = function(t) {
        return this.reverse().find(t);
      }, N2.prototype.invokeMap = H(function(t, e) {
        return typeof t == "function" ? new N2(this) : this.map(function(n2) {
          return cn2(n2, t, e);
        });
      }), N2.prototype.reject = function(t) {
        return this.filter(or2(E2(t)));
      }, N2.prototype.slice = function(t, e) {
        t = T2(t);
        var n2 = this;
        return n2.__filtered__ && (t > 0 || e < 0) ? new N2(n2) : (t < 0 ? n2 = n2.takeRight(-t) : t && (n2 = n2.drop(t)), e !== i2 && (e = T2(e), n2 = e < 0 ? n2.dropRight(-e) : n2.take(e - t)), n2);
      }, N2.prototype.takeRightWhile = function(t) {
        return this.reverse().takeWhile(t).reverse();
      }, N2.prototype.toArray = function() {
        return this.take(Ut3);
      }, qt2(N2.prototype, function(t, e) {
        var n2 = /^(?:filter|find|map|reject)|While$/.test(e), r2 = /^(?:head|last)$/.test(e), u3 = a2[r2 ? "take" + (e == "last" ? "Right" : "") : e], o2 = r2 || /^find/.test(e);
        u3 && (a2.prototype[e] = function() {
          var c = this.__wrapped__, f2 = r2 ? [1] : arguments, l = c instanceof N2, v3 = f2[0], _2 = l || b2(c), m2 = function(D2) {
            var $2 = u3.apply(a2, re2([D2], f2));
            return r2 && C3 ? $2[0] : $2;
          };
          _2 && n2 && typeof v3 == "function" && v3.length != 1 && (l = _2 = false);
          var C3 = this.__chain__, x3 = !!this.__actions__.length, S2 = o2 && !C3, L2 = l && !x3;
          if (!o2 && _2) {
            c = L2 ? c : new N2(this);
            var O2 = t.apply(c, f2);
            return O2.__actions__.push({ func: ir2, args: [m2], thisArg: i2 }), new Pt2(O2, C3);
          }
          return S2 && L2 ? t.apply(this, f2) : (O2 = this.thru(m2), S2 ? r2 ? O2.value()[0] : O2.value() : O2);
        });
      }), mt2(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
        var e = bn2[t], n2 = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", r2 = /^(?:pop|shift)$/.test(t);
        a2.prototype[t] = function() {
          var u3 = arguments;
          if (r2 && !this.__chain__) {
            var o2 = this.value();
            return e.apply(b2(o2) ? o2 : [], u3);
          }
          return this[n2](function(c) {
            return e.apply(b2(c) ? c : [], u3);
          });
        };
      }), qt2(N2.prototype, function(t, e) {
        var n2 = a2[e];
        if (n2) {
          var r2 = n2.name + "";
          W.call(Ue, r2) || (Ue[r2] = []), Ue[r2].push({ name: e, func: n2 });
        }
      }), Ue[Vn2(i2, he2).name] = [{ name: "wrapper", func: i2 }], N2.prototype.clone = Qc, N2.prototype.reverse = Vc, N2.prototype.value = kc, a2.prototype.at = Ol, a2.prototype.chain = Rl, a2.prototype.commit = bl, a2.prototype.next = Tl, a2.prototype.plant = Hl, a2.prototype.reverse = Dl, a2.prototype.toJSON = a2.prototype.valueOf = a2.prototype.value = Nl, a2.prototype.first = a2.prototype.head, en2 && (a2.prototype[en2] = Ll), a2;
    }, De = Rc();
    pe2 ? ((pe2.exports = De)._ = De, Lr2._ = De) : j2._ = De;
  }).call(_n);
})(qi, qi.exports);
var Vg = Object.defineProperty, kg = Object.defineProperties, jg = Object.getOwnPropertyDescriptors, Ra = Object.getOwnPropertySymbols, tv = Object.prototype.hasOwnProperty, ev = Object.prototype.propertyIsEnumerable, ba = (P2, s, i2) => s in P2 ? Vg(P2, s, { enumerable: true, configurable: true, writable: true, value: i2 }) : P2[s] = i2, lr = (P2, s) => {
  for (var i2 in s || (s = {}))
    tv.call(s, i2) && ba(P2, i2, s[i2]);
  if (Ra)
    for (var i2 of Ra(s))
      ev.call(s, i2) && ba(P2, i2, s[i2]);
  return P2;
}, nv = (P2, s) => kg(P2, jg(s));
function Lt(P2, s, i2) {
  var p3;
  const w2 = An(P2);
  return ((p3 = s.rpcMap) == null ? void 0 : p3[w2.reference]) || `${Oa}?chainId=${w2.namespace}:${w2.reference}&projectId=${i2}`;
}
function Ae(P2) {
  return P2.includes(":") ? P2.split(":")[1] : P2;
}
function Ta(P2) {
  return P2.map((s) => `${s.split(":")[0]}:${s.split(":")[1]}`);
}
function rv(P2, s) {
  const i2 = Object.keys(s.namespaces).filter((w2) => w2.includes(P2));
  if (!i2.length)
    return [];
  const p3 = [];
  return i2.forEach((w2) => {
    const I2 = s.namespaces[w2].accounts;
    p3.push(...I2);
  }), p3;
}
function Fi(P2 = {}, s = {}) {
  const i2 = La(P2), p3 = La(s);
  return qi.exports.merge(i2, p3);
}
function La(P2) {
  var s, i2, p3, w2;
  const I2 = {};
  if (!Xr$1(P2))
    return I2;
  for (const [y3, J] of Object.entries(P2)) {
    const Ht2 = on$1(y3) ? [y3] : J.chains, Ke = J.methods || [], Ie2 = J.events || [], Dt2 = J.rpcMap || {}, Bt2 = xo(y3);
    I2[Bt2] = nv(lr(lr({}, I2[Bt2]), J), { chains: me$1(Ht2, (s = I2[Bt2]) == null ? void 0 : s.chains), methods: me$1(Ke, (i2 = I2[Bt2]) == null ? void 0 : i2.methods), events: me$1(Ie2, (p3 = I2[Bt2]) == null ? void 0 : p3.events), rpcMap: lr(lr({}, Dt2), (w2 = I2[Bt2]) == null ? void 0 : w2.rpcMap) });
  }
  return I2;
}
function iv(P2) {
  return P2.includes(":") ? P2.split(":")[2] : P2;
}
function Ha(P2) {
  const s = {};
  for (const [i2, p3] of Object.entries(P2)) {
    const w2 = p3.methods || [], I2 = p3.events || [], y3 = p3.accounts || [], J = on$1(i2) ? [i2] : p3.chains ? p3.chains : Ta(p3.accounts);
    s[i2] = { chains: J, methods: w2, events: I2, accounts: y3 };
  }
  return s;
}
function Wi(P2) {
  return typeof P2 == "number" ? P2 : P2.includes("0x") ? parseInt(P2, 16) : (P2 = P2.includes(":") ? P2.split(":")[1] : P2, isNaN(Number(P2)) ? P2 : Number(P2));
}
const Da = {}, F = (P2) => Da[P2], Mi = (P2, s) => {
  Da[P2] = s;
};
class sv {
  constructor(s) {
    this.name = "polkadot", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i2) {
    this.httpProviders[s] || this.setHttpProvider(s, i2), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? s.filter((i2) => i2.split(":")[1] === this.chainId.toString()).map((i2) => i2.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i2) => {
      var p3;
      const w2 = Ae(i2);
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i2]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i2 = this.httpProviders[s];
    if (typeof i2 > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i2;
  }
  setHttpProvider(s, i2) {
    const p3 = this.createHttpProvider(s, i2);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i2) {
    const p3 = i2 || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f$1(p3, F("disableProviderPing")));
  }
}
var uv = Object.defineProperty, av = Object.defineProperties, ov = Object.getOwnPropertyDescriptors, Na = Object.getOwnPropertySymbols, cv = Object.prototype.hasOwnProperty, fv = Object.prototype.propertyIsEnumerable, $a = (P2, s, i2) => s in P2 ? uv(P2, s, { enumerable: true, configurable: true, writable: true, value: i2 }) : P2[s] = i2, Ua = (P2, s) => {
  for (var i2 in s || (s = {}))
    cv.call(s, i2) && $a(P2, i2, s[i2]);
  if (Na)
    for (var i2 of Na(s))
      fv.call(s, i2) && $a(P2, i2, s[i2]);
  return P2;
}, qa = (P2, s) => av(P2, ov(s));
class hv {
  constructor(s) {
    this.name = "eip155", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
  }
  async request(s) {
    switch (s.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(s);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
      case "wallet_getCapabilities":
        return await this.getCapabilities(s);
      case "wallet_getCallsStatus":
        return await this.getCallStatus(s);
    }
    return this.namespace.methods.includes(s.request.method) ? await this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  setDefaultChain(s, i2) {
    this.httpProviders[s] || this.setHttpProvider(parseInt(s), i2), this.chainId = parseInt(s), this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId.toString();
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  createHttpProvider(s, i2) {
    const p3 = i2 || Lt(`${this.name}:${s}`, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f$1(p3, F("disableProviderPing")));
  }
  setHttpProvider(s, i2) {
    const p3 = this.createHttpProvider(s, i2);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i2) => {
      var p3;
      const w2 = parseInt(Ae(i2));
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i2]);
    }), s;
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i2) => i2.split(":")[1] === this.chainId.toString()).map((i2) => i2.split(":")[2]))] : [];
  }
  getHttpProvider() {
    const s = this.chainId, i2 = this.httpProviders[s];
    if (typeof i2 > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i2;
  }
  async handleSwitchChain(s) {
    var i2, p3;
    let w2 = s.request.params ? (i2 = s.request.params[0]) == null ? void 0 : i2.chainId : "0x0";
    w2 = w2.startsWith("0x") ? w2 : `0x${w2}`;
    const I2 = parseInt(w2, 16);
    if (this.isChainApproved(I2))
      this.setDefaultChain(`${I2}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain"))
      await this.client.request({ topic: s.topic, request: { method: s.request.method, params: [{ chainId: w2 }] }, chainId: (p3 = this.namespace.chains) == null ? void 0 : p3[0] }), this.setDefaultChain(`${I2}`);
    else
      throw new Error(`Failed to switch to chain 'eip155:${I2}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(s) {
    return this.namespace.chains.includes(`${this.name}:${s}`);
  }
  async getCapabilities(s) {
    var i2, p3, w2;
    const I2 = (p3 = (i2 = s.request) == null ? void 0 : i2.params) == null ? void 0 : p3[0];
    if (!I2)
      throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const y3 = this.client.session.get(s.topic), J = ((w2 = y3 == null ? void 0 : y3.sessionProperties) == null ? void 0 : w2.capabilities) || {};
    if (J != null && J[I2])
      return J == null ? void 0 : J[I2];
    const Ht2 = await this.client.request(s);
    try {
      await this.client.session.update(s.topic, { sessionProperties: qa(Ua({}, y3.sessionProperties || {}), { capabilities: qa(Ua({}, J || {}), { [I2]: Ht2 }) }) });
    } catch (Ke) {
      console.warn("Failed to update session with capabilities", Ke);
    }
    return Ht2;
  }
  async getCallStatus(s) {
    var i2, p3;
    const w2 = this.client.session.get(s.topic), I2 = (i2 = w2.sessionProperties) == null ? void 0 : i2.bundler_name;
    if (I2) {
      const J = this.getBundlerUrl(s.chainId, I2);
      try {
        return await this.getUserOperationReceipt(J, s);
      } catch (Ht2) {
        console.warn("Failed to fetch call status from bundler", Ht2, J);
      }
    }
    const y3 = (p3 = w2.sessionProperties) == null ? void 0 : p3.bundler_url;
    if (y3)
      try {
        return await this.getUserOperationReceipt(y3, s);
      } catch (J) {
        console.warn("Failed to fetch call status from custom bundler", J, y3);
      }
    if (this.namespace.methods.includes(s.request.method))
      return await this.client.request(s);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(s, i2) {
    var p3;
    const w2 = new URL(s), I2 = await fetch(w2, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formatJsonRpcRequest("eth_getUserOperationReceipt", [(p3 = i2.request.params) == null ? void 0 : p3[0]])) });
    if (!I2.ok)
      throw new Error(`Failed to fetch user operation receipt - ${I2.status}`);
    return await I2.json();
  }
  getBundlerUrl(s, i2) {
    return `${Qg}?projectId=${this.client.core.projectId}&chainId=${s}&bundler=${i2}`;
  }
}
class lv {
  constructor(s) {
    this.name = "solana", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i2) {
    this.httpProviders[s] || this.setHttpProvider(s, i2), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i2) => i2.split(":")[1] === this.chainId.toString()).map((i2) => i2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i2) => {
      var p3;
      const w2 = Ae(i2);
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i2]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i2 = this.httpProviders[s];
    if (typeof i2 > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i2;
  }
  setHttpProvider(s, i2) {
    const p3 = this.createHttpProvider(s, i2);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i2) {
    const p3 = i2 || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f$1(p3, F("disableProviderPing")));
  }
}
class pv {
  constructor(s) {
    this.name = "cosmos", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i2) {
    this.httpProviders[s] || this.setHttpProvider(s, i2), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i2) => i2.split(":")[1] === this.chainId.toString()).map((i2) => i2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i2) => {
      var p3;
      const w2 = Ae(i2);
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i2]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i2 = this.httpProviders[s];
    if (typeof i2 > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i2;
  }
  setHttpProvider(s, i2) {
    const p3 = this.createHttpProvider(s, i2);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i2) {
    const p3 = i2 || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f$1(p3, F("disableProviderPing")));
  }
}
class dv {
  constructor(s) {
    this.name = "algorand", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i2) {
    if (!this.httpProviders[s]) {
      const p3 = i2 || Lt(`${this.name}:${s}`, this.namespace, this.client.core.projectId);
      if (!p3)
        throw new Error(`No RPC url provided for chainId: ${s}`);
      this.setHttpProvider(s, p3);
    }
    this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i2) => i2.split(":")[1] === this.chainId.toString()).map((i2) => i2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i2) => {
      var p3;
      s[i2] = this.createHttpProvider(i2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i2]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i2 = this.httpProviders[s];
    if (typeof i2 > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i2;
  }
  setHttpProvider(s, i2) {
    const p3 = this.createHttpProvider(s, i2);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i2) {
    const p3 = i2 || Lt(s, this.namespace, this.client.core.projectId);
    return typeof p3 > "u" ? void 0 : new o(new f$1(p3, F("disableProviderPing")));
  }
}
class gv {
  constructor(s) {
    this.name = "cip34", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i2) {
    this.httpProviders[s] || this.setHttpProvider(s, i2), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i2) => i2.split(":")[1] === this.chainId.toString()).map((i2) => i2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i2) => {
      const p3 = this.getCardanoRPCUrl(i2), w2 = Ae(i2);
      s[w2] = this.createHttpProvider(w2, p3);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i2 = this.httpProviders[s];
    if (typeof i2 > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i2;
  }
  getCardanoRPCUrl(s) {
    const i2 = this.namespace.rpcMap;
    if (i2)
      return i2[s];
  }
  setHttpProvider(s, i2) {
    const p3 = this.createHttpProvider(s, i2);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i2) {
    const p3 = i2 || this.getCardanoRPCUrl(s);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f$1(p3, F("disableProviderPing")));
  }
}
class vv {
  constructor(s) {
    this.name = "elrond", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i2) {
    this.httpProviders[s] || this.setHttpProvider(s, i2), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i2) => i2.split(":")[1] === this.chainId.toString()).map((i2) => i2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i2) => {
      var p3;
      const w2 = Ae(i2);
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i2]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i2 = this.httpProviders[s];
    if (typeof i2 > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i2;
  }
  setHttpProvider(s, i2) {
    const p3 = this.createHttpProvider(s, i2);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i2) {
    const p3 = i2 || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f$1(p3, F("disableProviderPing")));
  }
}
class _v {
  constructor(s) {
    this.name = "multiversx", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i2) {
    this.httpProviders[s] || this.setHttpProvider(s, i2), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i2) => i2.split(":")[1] === this.chainId.toString()).map((i2) => i2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i2) => {
      var p3;
      const w2 = Ae(i2);
      s[w2] = this.createHttpProvider(w2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i2]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i2 = this.httpProviders[s];
    if (typeof i2 > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i2;
  }
  setHttpProvider(s, i2) {
    const p3 = this.createHttpProvider(s, i2);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i2) {
    const p3 = i2 || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f$1(p3, F("disableProviderPing")));
  }
}
class mv {
  constructor(s) {
    this.name = "near", this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace = Object.assign(this.namespace, s);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider().request(s.request);
  }
  setDefaultChain(s, i2) {
    if (this.chainId = s, !this.httpProviders[s]) {
      const p3 = i2 || Lt(`${this.name}:${s}`, this.namespace);
      if (!p3)
        throw new Error(`No RPC url provided for chainId: ${s}`);
      this.setHttpProvider(s, p3);
    }
    this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? s.filter((i2) => i2.split(":")[1] === this.chainId.toString()).map((i2) => i2.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const s = {};
    return this.namespace.chains.forEach((i2) => {
      var p3;
      s[i2] = this.createHttpProvider(i2, (p3 = this.namespace.rpcMap) == null ? void 0 : p3[i2]);
    }), s;
  }
  getHttpProvider() {
    const s = `${this.name}:${this.chainId}`, i2 = this.httpProviders[s];
    if (typeof i2 > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i2;
  }
  setHttpProvider(s, i2) {
    const p3 = this.createHttpProvider(s, i2);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i2) {
    const p3 = i2 || Lt(s, this.namespace);
    return typeof p3 > "u" ? void 0 : new o(new f$1(p3, F("disableProviderPing")));
  }
}
class wv {
  constructor(s) {
    this.name = ze, this.namespace = s.namespace, this.events = F("events"), this.client = F("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(s) {
    this.namespace.chains = [...new Set((this.namespace.chains || []).concat(s.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(s.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(s.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(s.events || []))], this.httpProviders = this.createHttpProviders();
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(s) {
    return this.namespace.methods.includes(s.request.method) ? this.client.request(s) : this.getHttpProvider(s.chainId).request(s.request);
  }
  setDefaultChain(s, i2) {
    this.httpProviders[s] || this.setHttpProvider(s, i2), this.chainId = s, this.events.emit(Tt.DEFAULT_CHAIN_CHANGED, `${this.name}:${s}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const s = this.namespace.chains[0];
    if (!s)
      throw new Error("ChainId not found");
    return s.split(":")[1];
  }
  getAccounts() {
    const s = this.namespace.accounts;
    return s ? [...new Set(s.filter((i2) => i2.split(":")[1] === this.chainId.toString()).map((i2) => i2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    var s, i2;
    const p3 = {};
    return (i2 = (s = this.namespace) == null ? void 0 : s.accounts) == null || i2.forEach((w2) => {
      const I2 = An(w2);
      p3[`${I2.namespace}:${I2.reference}`] = this.createHttpProvider(w2);
    }), p3;
  }
  getHttpProvider(s) {
    const i2 = this.httpProviders[s];
    if (typeof i2 > "u")
      throw new Error(`JSON-RPC provider for ${s} not found`);
    return i2;
  }
  setHttpProvider(s, i2) {
    const p3 = this.createHttpProvider(s, i2);
    p3 && (this.httpProviders[s] = p3);
  }
  createHttpProvider(s, i2) {
    const p3 = i2 || Lt(s, this.namespace, this.client.core.projectId);
    if (!p3)
      throw new Error(`No RPC url provided for chainId: ${s}`);
    return new o(new f$1(p3, F("disableProviderPing")));
  }
}
var Pv = Object.defineProperty, Cv = Object.defineProperties, Av = Object.getOwnPropertyDescriptors, Fa = Object.getOwnPropertySymbols, Iv = Object.prototype.hasOwnProperty, xv = Object.prototype.propertyIsEnumerable, Wa = (P2, s, i2) => s in P2 ? Pv(P2, s, { enumerable: true, configurable: true, writable: true, value: i2 }) : P2[s] = i2, pr = (P2, s) => {
  for (var i2 in s || (s = {}))
    Iv.call(s, i2) && Wa(P2, i2, s[i2]);
  if (Fa)
    for (var i2 of Fa(s))
      xv.call(s, i2) && Wa(P2, i2, s[i2]);
  return P2;
}, Bi = (P2, s) => Cv(P2, Av(s));
class dr {
  constructor(s) {
    this.events = new Jg(), this.rpcProviders = {}, this.shouldAbortPairingAttempt = false, this.maxPairingAttempts = 10, this.disableProviderPing = false, this.providerOpts = s, this.logger = typeof (s == null ? void 0 : s.logger) < "u" && typeof (s == null ? void 0 : s.logger) != "string" ? s.logger : Mg(k({ level: (s == null ? void 0 : s.logger) || ya })), this.disableProviderPing = (s == null ? void 0 : s.disableProviderPing) || false;
  }
  static async init(s) {
    const i2 = new dr(s);
    return await i2.initialize(), i2;
  }
  async request(s, i2, p3) {
    const [w2, I2] = this.validateChain(i2);
    if (!this.session)
      throw new Error("Please call connect() before request()");
    return await this.getProvider(w2).request({ request: pr({}, s), chainId: `${w2}:${I2}`, topic: this.session.topic, expiry: p3 });
  }
  sendAsync(s, i2, p3, w2) {
    const I2 = (/* @__PURE__ */ new Date()).getTime();
    this.request(s, p3, w2).then((y3) => i2(null, formatJsonRpcResult(I2, y3))).catch((y3) => i2(y3, void 0));
  }
  async enable() {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties }), await this.requestAccounts();
  }
  async disconnect() {
    var s;
    if (!this.session)
      throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: (s = this.session) == null ? void 0 : s.topic, reason: er$1("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(s) {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    if (this.setNamespaces(s), await this.cleanupPendingPairings(), !s.skipPairing)
      return await this.pair(s.pairingTopic);
  }
  async authenticate(s, i2) {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    this.setNamespaces(s), await this.cleanupPendingPairings();
    const { uri: p3, response: w2 } = await this.client.authenticate(s, i2);
    p3 && (this.uri = p3, this.events.emit("display_uri", p3));
    const I2 = await w2();
    if (this.session = I2.session, this.session) {
      const y3 = Ha(this.session.namespaces);
      this.namespaces = Fi(this.namespaces, y3), this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return I2;
  }
  on(s, i2) {
    this.events.on(s, i2);
  }
  once(s, i2) {
    this.events.once(s, i2);
  }
  removeListener(s, i2) {
    this.events.removeListener(s, i2);
  }
  off(s, i2) {
    this.events.off(s, i2);
  }
  get isWalletConnect() {
    return true;
  }
  async pair(s) {
    this.shouldAbortPairingAttempt = false;
    let i2 = 0;
    do {
      if (this.shouldAbortPairingAttempt)
        throw new Error("Pairing aborted");
      if (i2 >= this.maxPairingAttempts)
        throw new Error("Max auto pairing attempts reached");
      const { uri: p3, approval: w2 } = await this.client.connect({ pairingTopic: s, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties });
      p3 && (this.uri = p3, this.events.emit("display_uri", p3)), await w2().then((I2) => {
        this.session = I2;
        const y3 = Ha(I2.namespaces);
        this.namespaces = Fi(this.namespaces, y3), this.persist("namespaces", this.namespaces);
      }).catch((I2) => {
        if (I2.message !== it)
          throw I2;
        i2++;
      });
    } while (!this.session);
    return this.onConnect(), this.session;
  }
  setDefaultChain(s, i2) {
    try {
      if (!this.session)
        return;
      const [p3, w2] = this.validateChain(s), I2 = this.getProvider(p3);
      I2.name === ze ? I2.setDefaultChain(`${p3}:${w2}`, i2) : I2.setDefaultChain(w2, i2);
    } catch (p3) {
      if (!/Please call connect/.test(p3.message))
        throw p3;
    }
  }
  async cleanupPendingPairings(s = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const i2 = this.client.pairing.getAll();
    if (Nr$1(i2)) {
      for (const p3 of i2)
        s.deletePairings ? this.client.core.expirer.set(p3.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(p3.topic);
      this.logger.info(`Inactive pairings cleared: ${i2.length}`);
    }
  }
  abortPairingAttempt() {
    this.shouldAbortPairingAttempt = true;
  }
  async checkStorage() {
    if (this.namespaces = await this.getFromStore("namespaces"), this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.client.session.length) {
      const s = this.client.session.keys.length - 1;
      this.session = this.client.session.get(this.client.session.keys[s]), this.createProviders();
    }
  }
  async initialize() {
    this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
  }
  async createClient() {
    this.client = this.providerOpts.client || await _e.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || ya, relayUrl: this.providerOpts.relayUrl || Yg, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    if (!this.session)
      throw new Error("Session not initialized. Please call connect() before enable()");
    const s = [...new Set(Object.keys(this.session.namespaces).map((i2) => xo(i2)))];
    Mi("client", this.client), Mi("events", this.events), Mi("disableProviderPing", this.disableProviderPing), s.forEach((i2) => {
      if (!this.session)
        return;
      const p3 = rv(i2, this.session), w2 = Ta(p3), I2 = Fi(this.namespaces, this.optionalNamespaces), y3 = Bi(pr({}, I2[i2]), { accounts: p3, chains: w2 });
      switch (i2) {
        case "eip155":
          this.rpcProviders[i2] = new hv({ namespace: y3 });
          break;
        case "algorand":
          this.rpcProviders[i2] = new dv({ namespace: y3 });
          break;
        case "solana":
          this.rpcProviders[i2] = new lv({ namespace: y3 });
          break;
        case "cosmos":
          this.rpcProviders[i2] = new pv({ namespace: y3 });
          break;
        case "polkadot":
          this.rpcProviders[i2] = new sv({ namespace: y3 });
          break;
        case "cip34":
          this.rpcProviders[i2] = new gv({ namespace: y3 });
          break;
        case "elrond":
          this.rpcProviders[i2] = new vv({ namespace: y3 });
          break;
        case "multiversx":
          this.rpcProviders[i2] = new _v({ namespace: y3 });
          break;
        case "near":
          this.rpcProviders[i2] = new mv({ namespace: y3 });
          break;
        default:
          this.rpcProviders[ze] ? this.rpcProviders[ze].updateNamespace(y3) : this.rpcProviders[ze] = new wv({ namespace: y3 });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u")
      throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (s) => {
      this.events.emit("session_ping", s);
    }), this.client.on("session_event", (s) => {
      const { params: i2 } = s, { event: p3 } = i2;
      if (p3.name === "accountsChanged") {
        const w2 = p3.data;
        w2 && Nr$1(w2) && this.events.emit("accountsChanged", w2.map(iv));
      } else if (p3.name === "chainChanged") {
        const w2 = i2.chainId, I2 = i2.event.data, y3 = xo(w2), J = Wi(w2) !== Wi(I2) ? `${y3}:${Wi(I2)}` : w2;
        this.onChainChanged(J);
      } else
        this.events.emit(p3.name, p3.data);
      this.events.emit("session_event", s);
    }), this.client.on("session_update", ({ topic: s, params: i2 }) => {
      var p3;
      const { namespaces: w2 } = i2, I2 = (p3 = this.client) == null ? void 0 : p3.session.get(s);
      this.session = Bi(pr({}, I2), { namespaces: w2 }), this.onSessionUpdate(), this.events.emit("session_update", { topic: s, params: i2 });
    }), this.client.on("session_delete", async (s) => {
      await this.cleanup(), this.events.emit("session_delete", s), this.events.emit("disconnect", Bi(pr({}, er$1("USER_DISCONNECTED")), { data: s.topic }));
    }), this.on(Tt.DEFAULT_CHAIN_CHANGED, (s) => {
      this.onChainChanged(s, true);
    });
  }
  getProvider(s) {
    return this.rpcProviders[s] || this.rpcProviders[ze];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((s) => {
      var i2;
      this.getProvider(s).updateNamespace((i2 = this.session) == null ? void 0 : i2.namespaces[s]);
    });
  }
  setNamespaces(s) {
    const { namespaces: i2, optionalNamespaces: p3, sessionProperties: w2 } = s;
    i2 && Object.keys(i2).length && (this.namespaces = i2), p3 && Object.keys(p3).length && (this.optionalNamespaces = p3), this.sessionProperties = w2, this.persist("namespaces", i2), this.persist("optionalNamespaces", p3);
  }
  validateChain(s) {
    const [i2, p3] = (s == null ? void 0 : s.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length)
      return [i2, p3];
    if (i2 && !Object.keys(this.namespaces || {}).map((y3) => xo(y3)).includes(i2))
      throw new Error(`Namespace '${i2}' is not configured. Please call connect() first with namespace config.`);
    if (i2 && p3)
      return [i2, p3];
    const w2 = xo(Object.keys(this.namespaces)[0]), I2 = this.rpcProviders[w2].getDefaultChain();
    return [w2, I2];
  }
  async requestAccounts() {
    const [s] = this.validateChain();
    return await this.getProvider(s).requestAccounts();
  }
  onChainChanged(s, i2 = false) {
    if (!this.namespaces)
      return;
    const [p3, w2] = this.validateChain(s);
    w2 && (i2 || this.getProvider(p3).setDefaultChain(w2), this.namespaces[p3] ? this.namespaces[p3].defaultChain = w2 : this.namespaces[`${p3}:${w2}`] ? this.namespaces[`${p3}:${w2}`].defaultChain = w2 : this.namespaces[`${p3}:${w2}`] = { defaultChain: w2 }, this.persist("namespaces", this.namespaces), this.events.emit("chainChanged", w2));
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.session = void 0, this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, this.persist("namespaces", void 0), this.persist("optionalNamespaces", void 0), this.persist("sessionProperties", void 0), await this.cleanupPendingPairings({ deletePairings: true });
  }
  persist(s, i2) {
    this.client.core.storage.setItem(`${Sa}/${s}`, i2);
  }
  async getFromStore(s) {
    return await this.client.core.storage.getItem(`${Sa}/${s}`);
  }
}
const Ev = dr;
const R = "wc", T = "ethereum_provider", $ = `${R}@2:${T}:`, j = "https://rpc.walletconnect.org/v1/", u2 = ["eth_sendTransaction", "personal_sign"], y2 = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "eth_sendTransaction", "personal_sign", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode", "wallet_sendCalls", "wallet_getCapabilities", "wallet_getCallsStatus", "wallet_showCallsStatus"], g2 = ["chainChanged", "accountsChanged"], b = ["chainChanged", "accountsChanged", "message", "disconnect", "connect"];
var q = Object.defineProperty, N = Object.defineProperties, D = Object.getOwnPropertyDescriptors, M2 = Object.getOwnPropertySymbols, U = Object.prototype.hasOwnProperty, Q = Object.prototype.propertyIsEnumerable, O = (r2, t, s) => t in r2 ? q(r2, t, { enumerable: true, configurable: true, writable: true, value: s }) : r2[t] = s, p2 = (r2, t) => {
  for (var s in t || (t = {}))
    U.call(t, s) && O(r2, s, t[s]);
  if (M2)
    for (var s of M2(t))
      Q.call(t, s) && O(r2, s, t[s]);
  return r2;
}, E = (r2, t) => N(r2, D(t));
function m(r2) {
  return Number(r2[0].split(":")[1]);
}
function v2(r2) {
  return `0x${r2.toString(16)}`;
}
function L(r2) {
  const { chains: t, optionalChains: s, methods: i2, optionalMethods: e, events: n2, optionalEvents: o2, rpcMap: c } = r2;
  if (!Nr$1(t))
    throw new Error("Invalid chains");
  const a2 = { chains: t, methods: i2 || u2, events: n2 || g2, rpcMap: p2({}, t.length ? { [m(t)]: c[m(t)] } : {}) }, h2 = n2 == null ? void 0 : n2.filter((l) => !g2.includes(l)), d2 = i2 == null ? void 0 : i2.filter((l) => !u2.includes(l));
  if (!s && !o2 && !e && !(h2 != null && h2.length) && !(d2 != null && d2.length))
    return { required: t.length ? a2 : void 0 };
  const w2 = (h2 == null ? void 0 : h2.length) && (d2 == null ? void 0 : d2.length) || !s, I2 = { chains: [...new Set(w2 ? a2.chains.concat(s || []) : s)], methods: [...new Set(a2.methods.concat(e != null && e.length ? e : y2))], events: [...new Set(a2.events.concat(o2 != null && o2.length ? o2 : b))], rpcMap: c };
  return { required: t.length ? a2 : void 0, optional: s.length ? I2 : void 0 };
}
class C2 {
  constructor() {
    this.events = new eventsExports.EventEmitter(), this.namespace = "eip155", this.accounts = [], this.chainId = 1, this.STORAGE_KEY = $, this.on = (t, s) => (this.events.on(t, s), this), this.once = (t, s) => (this.events.once(t, s), this), this.removeListener = (t, s) => (this.events.removeListener(t, s), this), this.off = (t, s) => (this.events.off(t, s), this), this.parseAccount = (t) => this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t, this.signer = {}, this.rpc = {};
  }
  static async init(t) {
    const s = new C2();
    return await s.initialize(t), s;
  }
  async request(t, s) {
    return await this.signer.request(t, this.formatChainId(this.chainId), s);
  }
  sendAsync(t, s, i2) {
    this.signer.sendAsync(t, s, this.formatChainId(this.chainId), i2);
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : false;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : false;
  }
  async enable() {
    return this.session || await this.connect(), await this.request({ method: "eth_requestAccounts" });
  }
  async connect(t) {
    if (!this.signer.client)
      throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts(t);
    const { required: s, optional: i2 } = L(this.rpc);
    try {
      const e = await new Promise(async (o2, c) => {
        var a2;
        this.rpc.showQrModal && ((a2 = this.modal) == null || a2.subscribeModal((h2) => {
          !h2.open && !this.signer.session && (this.signer.abortPairingAttempt(), c(new Error("Connection request reset. Please try again.")));
        })), await this.signer.connect(E(p2({ namespaces: p2({}, s && { [this.namespace]: s }) }, i2 && { optionalNamespaces: { [this.namespace]: i2 } }), { pairingTopic: t == null ? void 0 : t.pairingTopic })).then((h2) => {
          o2(h2);
        }).catch((h2) => {
          c(new Error(h2.message));
        });
      });
      if (!e)
        return;
      const n2 = Wo(e.namespaces, [this.namespace]);
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : n2), this.setAccounts(n2), this.events.emit("connect", { chainId: v2(this.chainId) });
    } catch (e) {
      throw this.signer.logger.error(e), e;
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async authenticate(t, s) {
    if (!this.signer.client)
      throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts({ chains: t == null ? void 0 : t.chains });
    try {
      const i2 = await new Promise(async (n2, o2) => {
        var c;
        this.rpc.showQrModal && ((c = this.modal) == null || c.subscribeModal((a2) => {
          !a2.open && !this.signer.session && (this.signer.abortPairingAttempt(), o2(new Error("Connection request reset. Please try again.")));
        })), await this.signer.authenticate(E(p2({}, t), { chains: this.rpc.chains }), s).then((a2) => {
          n2(a2);
        }).catch((a2) => {
          o2(new Error(a2.message));
        });
      }), e = i2.session;
      if (e) {
        const n2 = Wo(e.namespaces, [this.namespace]);
        this.setChainIds(this.rpc.chains.length ? this.rpc.chains : n2), this.setAccounts(n2), this.events.emit("connect", { chainId: v2(this.chainId) });
      }
      return i2;
    } catch (i2) {
      throw this.signer.logger.error(i2), i2;
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async disconnect() {
    this.session && await this.signer.disconnect(), this.reset();
  }
  get isWalletConnect() {
    return true;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on("session_event", (t) => {
      const { params: s } = t, { event: i2 } = s;
      i2.name === "accountsChanged" ? (this.accounts = this.parseAccounts(i2.data), this.events.emit("accountsChanged", this.accounts)) : i2.name === "chainChanged" ? this.setChainId(this.formatChainId(i2.data)) : this.events.emit(i2.name, i2.data), this.events.emit("session_event", t);
    }), this.signer.on("chainChanged", (t) => {
      const s = parseInt(t);
      this.chainId = s, this.events.emit("chainChanged", v2(this.chainId)), this.persist();
    }), this.signer.on("session_update", (t) => {
      this.events.emit("session_update", t);
    }), this.signer.on("session_delete", (t) => {
      this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", E(p2({}, er$1("USER_DISCONNECTED")), { data: t.topic, name: "USER_DISCONNECTED" }));
    }), this.signer.on("display_uri", (t) => {
      var s, i2;
      this.rpc.showQrModal && ((s = this.modal) == null || s.closeModal(), (i2 = this.modal) == null || i2.openModal({ uri: t })), this.events.emit("display_uri", t);
    });
  }
  switchEthereumChain(t) {
    this.request({ method: "wallet_switchEthereumChain", params: [{ chainId: t.toString(16) }] });
  }
  isCompatibleChainId(t) {
    return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : false;
  }
  formatChainId(t) {
    return `${this.namespace}:${t}`;
  }
  parseChainId(t) {
    return Number(t.split(":")[1]);
  }
  setChainIds(t) {
    const s = t.filter((i2) => this.isCompatibleChainId(i2)).map((i2) => this.parseChainId(i2));
    s.length && (this.chainId = s[0], this.events.emit("chainChanged", v2(this.chainId)), this.persist());
  }
  setChainId(t) {
    if (this.isCompatibleChainId(t)) {
      const s = this.parseChainId(t);
      this.chainId = s, this.switchEthereumChain(s);
    }
  }
  parseAccountId(t) {
    const [s, i2, e] = t.split(":");
    return { chainId: `${s}:${i2}`, address: e };
  }
  setAccounts(t) {
    this.accounts = t.filter((s) => this.parseChainId(this.parseAccountId(s).chainId) === this.chainId).map((s) => this.parseAccountId(s).address), this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(t) {
    var s, i2;
    const e = (s = t == null ? void 0 : t.chains) != null ? s : [], n2 = (i2 = t == null ? void 0 : t.optionalChains) != null ? i2 : [], o2 = e.concat(n2);
    if (!o2.length)
      throw new Error("No chains specified in either `chains` or `optionalChains`");
    const c = e.length ? (t == null ? void 0 : t.methods) || u2 : [], a2 = e.length ? (t == null ? void 0 : t.events) || g2 : [], h2 = (t == null ? void 0 : t.optionalMethods) || [], d2 = (t == null ? void 0 : t.optionalEvents) || [], w2 = (t == null ? void 0 : t.rpcMap) || this.buildRpcMap(o2, t.projectId), I2 = (t == null ? void 0 : t.qrModalOptions) || void 0;
    return { chains: e == null ? void 0 : e.map((l) => this.formatChainId(l)), optionalChains: n2.map((l) => this.formatChainId(l)), methods: c, events: a2, optionalMethods: h2, optionalEvents: d2, rpcMap: w2, showQrModal: !!(t != null && t.showQrModal), qrModalOptions: I2, projectId: t.projectId, metadata: t.metadata };
  }
  buildRpcMap(t, s) {
    const i2 = {};
    return t.forEach((e) => {
      i2[e] = this.getRpcUrl(e, s);
    }), i2;
  }
  async initialize(t) {
    if (this.rpc = this.getRpcConfig(t), this.chainId = this.rpc.chains.length ? m(this.rpc.chains) : m(this.rpc.optionalChains), this.signer = await Ev.init({ projectId: this.rpc.projectId, metadata: this.rpc.metadata, disableProviderPing: t.disableProviderPing, relayUrl: t.relayUrl, storageOptions: t.storageOptions, customStoragePrefix: t.customStoragePrefix, telemetryEnabled: t.telemetryEnabled }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
      let s;
      try {
        const { WalletConnectModal: i2 } = await __vitePreload(() => import("./index-8082fb93.js").then((n2) => n2.i), true ? ["./index-8082fb93.js","./index-d3ff4a45.js","./index-78e37d95.css"] : void 0, import.meta.url);
        s = i2;
      } catch {
        throw new Error("To use QR modal, please install @walletconnect/modal package");
      }
      if (s)
        try {
          this.modal = new s(p2({ projectId: this.rpc.projectId }, this.rpc.qrModalOptions));
        } catch (i2) {
          throw this.signer.logger.error(i2), new Error("Could not generate WalletConnectModal Instance");
        }
    }
  }
  loadConnectOpts(t) {
    if (!t)
      return;
    const { chains: s, optionalChains: i2, rpcMap: e } = t;
    s && Nr$1(s) && (this.rpc.chains = s.map((n2) => this.formatChainId(n2)), s.forEach((n2) => {
      this.rpc.rpcMap[n2] = (e == null ? void 0 : e[n2]) || this.getRpcUrl(n2);
    })), i2 && Nr$1(i2) && (this.rpc.optionalChains = [], this.rpc.optionalChains = i2 == null ? void 0 : i2.map((n2) => this.formatChainId(n2)), i2.forEach((n2) => {
      this.rpc.rpcMap[n2] = (e == null ? void 0 : e[n2]) || this.getRpcUrl(n2);
    }));
  }
  getRpcUrl(t, s) {
    var i2;
    return ((i2 = this.rpc.rpcMap) == null ? void 0 : i2[t]) || `${j}?chainId=eip155:${t}&projectId=${s || this.rpc.projectId}`;
  }
  async loadPersistedSession() {
    if (this.session)
      try {
        const t = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), s = this.session.namespaces[`${this.namespace}:${t}`] ? this.session.namespaces[`${this.namespace}:${t}`] : this.session.namespaces[this.namespace];
        this.setChainIds(t ? [this.formatChainId(t)] : s == null ? void 0 : s.accounts), this.setAccounts(s == null ? void 0 : s.accounts);
      } catch (t) {
        this.signer.logger.error("Failed to load persisted session, clearing state..."), this.signer.logger.error(t), await this.disconnect().catch((s) => this.signer.logger.warn(s));
      }
  }
  reset() {
    this.chainId = 1, this.accounts = [];
  }
  persist() {
    this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
  }
  parseAccounts(t) {
    return typeof t == "string" || t instanceof String ? [this.parseAccount(t)] : t.map((s) => this.parseAccount(s));
  }
}
const x2 = C2;
export {
  x2 as EthereumProvider,
  b as OPTIONAL_EVENTS,
  y2 as OPTIONAL_METHODS,
  g2 as REQUIRED_EVENTS,
  u2 as REQUIRED_METHODS,
  C2 as default
};
