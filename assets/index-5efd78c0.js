import { c as commonjsGlobal, g as getDefaultExportFromCjs, B as BN$1, O, e as ea$2, Q as Q$2, z as z$1, a as ep, r as rm, b as ed$1, m, W as W$1, d as reactExports, f as eh$1, h as createRoot, i as rP, j as rT, k as rj, l as rC, n as rh, o as rl, p as rd, q as eD, s as ej, t as q$1, u as rp, v as r_, w as rA, x as rS, y as rs, A as W$2, C as rN, D as rc, E as rf, G as G$1, F as eM, H as ef$1, I as rx, J as decode, K as et$1, L as rD, M as ey, N as ev, P as ee$1, R as eC } from "./index-8b6bfd7a.js";
var sha3$1 = { exports: {} };
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
(function(module) {
  (function() {
    var INPUT_ERROR = "input is invalid type";
    var FINALIZE_ERROR = "finalize already called";
    var WINDOW = typeof window === "object";
    var root = WINDOW ? window : {};
    if (root.JS_SHA3_NO_WINDOW) {
      WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === "object";
    var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
    if (NODE_JS) {
      root = commonjsGlobal;
    } else if (WEB_WORKER) {
      root = self;
    }
    var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && true && module.exports;
    var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
    var HEX_CHARS = "0123456789abcdef".split("");
    var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
    var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
    var KECCAK_PADDING = [1, 256, 65536, 16777216];
    var PADDING = [6, 1536, 393216, 100663296];
    var SHIFT = [0, 8, 16, 24];
    var RC = [
      1,
      0,
      32898,
      0,
      32906,
      2147483648,
      2147516416,
      2147483648,
      32907,
      0,
      2147483649,
      0,
      2147516545,
      2147483648,
      32777,
      2147483648,
      138,
      0,
      136,
      0,
      2147516425,
      0,
      2147483658,
      0,
      2147516555,
      0,
      139,
      2147483648,
      32905,
      2147483648,
      32771,
      2147483648,
      32770,
      2147483648,
      128,
      2147483648,
      32778,
      0,
      2147483658,
      2147483648,
      2147516545,
      2147483648,
      32896,
      2147483648,
      2147483649,
      0,
      2147516424,
      2147483648
    ];
    var BITS = [224, 256, 384, 512];
    var SHAKE_BITS = [128, 256];
    var OUTPUT_TYPES = ["hex", "buffer", "arrayBuffer", "array", "digest"];
    var CSHAKE_BYTEPAD = {
      "128": 168,
      "256": 136
    };
    if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
      Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
    }
    if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
      ArrayBuffer.isView = function(obj) {
        return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
      };
    }
    var createOutputMethod = function(bits2, padding, outputType) {
      return function(message) {
        return new Keccak(bits2, padding, bits2).update(message)[outputType]();
      };
    };
    var createShakeOutputMethod = function(bits2, padding, outputType) {
      return function(message, outputBits) {
        return new Keccak(bits2, padding, outputBits).update(message)[outputType]();
      };
    };
    var createCshakeOutputMethod = function(bits2, padding, outputType) {
      return function(message, outputBits, n11, s2) {
        return methods["cshake" + bits2].update(message, outputBits, n11, s2)[outputType]();
      };
    };
    var createKmacOutputMethod = function(bits2, padding, outputType) {
      return function(key, message, outputBits, s2) {
        return methods["kmac" + bits2].update(key, message, outputBits, s2)[outputType]();
      };
    };
    var createOutputMethods = function(method, createMethod2, bits2, padding) {
      for (var i3 = 0; i3 < OUTPUT_TYPES.length; ++i3) {
        var type = OUTPUT_TYPES[i3];
        method[type] = createMethod2(bits2, padding, type);
      }
      return method;
    };
    var createMethod = function(bits2, padding) {
      var method = createOutputMethod(bits2, padding, "hex");
      method.create = function() {
        return new Keccak(bits2, padding, bits2);
      };
      method.update = function(message) {
        return method.create().update(message);
      };
      return createOutputMethods(method, createOutputMethod, bits2, padding);
    };
    var createShakeMethod = function(bits2, padding) {
      var method = createShakeOutputMethod(bits2, padding, "hex");
      method.create = function(outputBits) {
        return new Keccak(bits2, padding, outputBits);
      };
      method.update = function(message, outputBits) {
        return method.create(outputBits).update(message);
      };
      return createOutputMethods(method, createShakeOutputMethod, bits2, padding);
    };
    var createCshakeMethod = function(bits2, padding) {
      var w = CSHAKE_BYTEPAD[bits2];
      var method = createCshakeOutputMethod(bits2, padding, "hex");
      method.create = function(outputBits, n11, s2) {
        if (!n11 && !s2) {
          return methods["shake" + bits2].create(outputBits);
        } else {
          return new Keccak(bits2, padding, outputBits).bytepad([n11, s2], w);
        }
      };
      method.update = function(message, outputBits, n11, s2) {
        return method.create(outputBits, n11, s2).update(message);
      };
      return createOutputMethods(method, createCshakeOutputMethod, bits2, padding);
    };
    var createKmacMethod = function(bits2, padding) {
      var w = CSHAKE_BYTEPAD[bits2];
      var method = createKmacOutputMethod(bits2, padding, "hex");
      method.create = function(key, outputBits, s2) {
        return new Kmac(bits2, padding, outputBits).bytepad(["KMAC", s2], w).bytepad([key], w);
      };
      method.update = function(key, message, outputBits, s2) {
        return method.create(key, outputBits, s2).update(message);
      };
      return createOutputMethods(method, createKmacOutputMethod, bits2, padding);
    };
    var algorithms = [
      { name: "keccak", padding: KECCAK_PADDING, bits: BITS, createMethod },
      { name: "sha3", padding: PADDING, bits: BITS, createMethod },
      { name: "shake", padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
      { name: "cshake", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
      { name: "kmac", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
    ];
    var methods = {}, methodNames = [];
    for (var i2 = 0; i2 < algorithms.length; ++i2) {
      var algorithm = algorithms[i2];
      var bits = algorithm.bits;
      for (var j2 = 0; j2 < bits.length; ++j2) {
        var methodName = algorithm.name + "_" + bits[j2];
        methodNames.push(methodName);
        methods[methodName] = algorithm.createMethod(bits[j2], algorithm.padding);
        if (algorithm.name !== "sha3") {
          var newMethodName = algorithm.name + bits[j2];
          methodNames.push(newMethodName);
          methods[newMethodName] = methods[methodName];
        }
      }
    }
    function Keccak(bits2, padding, outputBits) {
      this.blocks = [];
      this.s = [];
      this.padding = padding;
      this.outputBits = outputBits;
      this.reset = true;
      this.finalized = false;
      this.block = 0;
      this.start = 0;
      this.blockCount = 1600 - (bits2 << 1) >> 5;
      this.byteCount = this.blockCount << 2;
      this.outputBlocks = outputBits >> 5;
      this.extraBytes = (outputBits & 31) >> 3;
      for (var i3 = 0; i3 < 50; ++i3) {
        this.s[i3] = 0;
      }
    }
    Keccak.prototype.update = function(message) {
      if (this.finalized) {
        throw new Error(FINALIZE_ERROR);
      }
      var notString, type = typeof message;
      if (type !== "string") {
        if (type === "object") {
          if (message === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          } else if (!Array.isArray(message)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var blocks = this.blocks, byteCount = this.byteCount, length = message.length, blockCount = this.blockCount, index = 0, s2 = this.s, i3, code;
      while (index < length) {
        if (this.reset) {
          this.reset = false;
          blocks[0] = this.block;
          for (i3 = 1; i3 < blockCount + 1; ++i3) {
            blocks[i3] = 0;
          }
        }
        if (notString) {
          for (i3 = this.start; index < length && i3 < byteCount; ++index) {
            blocks[i3 >> 2] |= message[index] << SHIFT[i3++ & 3];
          }
        } else {
          for (i3 = this.start; index < length && i3 < byteCount; ++index) {
            code = message.charCodeAt(index);
            if (code < 128) {
              blocks[i3 >> 2] |= code << SHIFT[i3++ & 3];
            } else if (code < 2048) {
              blocks[i3 >> 2] |= (192 | code >> 6) << SHIFT[i3++ & 3];
              blocks[i3 >> 2] |= (128 | code & 63) << SHIFT[i3++ & 3];
            } else if (code < 55296 || code >= 57344) {
              blocks[i3 >> 2] |= (224 | code >> 12) << SHIFT[i3++ & 3];
              blocks[i3 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i3++ & 3];
              blocks[i3 >> 2] |= (128 | code & 63) << SHIFT[i3++ & 3];
            } else {
              code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
              blocks[i3 >> 2] |= (240 | code >> 18) << SHIFT[i3++ & 3];
              blocks[i3 >> 2] |= (128 | code >> 12 & 63) << SHIFT[i3++ & 3];
              blocks[i3 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i3++ & 3];
              blocks[i3 >> 2] |= (128 | code & 63) << SHIFT[i3++ & 3];
            }
          }
        }
        this.lastByteIndex = i3;
        if (i3 >= byteCount) {
          this.start = i3 - byteCount;
          this.block = blocks[blockCount];
          for (i3 = 0; i3 < blockCount; ++i3) {
            s2[i3] ^= blocks[i3];
          }
          f2(s2);
          this.reset = true;
        } else {
          this.start = i3;
        }
      }
      return this;
    };
    Keccak.prototype.encode = function(x, right) {
      var o2 = x & 255, n11 = 1;
      var bytes = [o2];
      x = x >> 8;
      o2 = x & 255;
      while (o2 > 0) {
        bytes.unshift(o2);
        x = x >> 8;
        o2 = x & 255;
        ++n11;
      }
      if (right) {
        bytes.push(n11);
      } else {
        bytes.unshift(n11);
      }
      this.update(bytes);
      return bytes.length;
    };
    Keccak.prototype.encodeString = function(str) {
      var notString, type = typeof str;
      if (type !== "string") {
        if (type === "object") {
          if (str === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
            str = new Uint8Array(str);
          } else if (!Array.isArray(str)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var bytes = 0, length = str.length;
      if (notString) {
        bytes = length;
      } else {
        for (var i3 = 0; i3 < str.length; ++i3) {
          var code = str.charCodeAt(i3);
          if (code < 128) {
            bytes += 1;
          } else if (code < 2048) {
            bytes += 2;
          } else if (code < 55296 || code >= 57344) {
            bytes += 3;
          } else {
            code = 65536 + ((code & 1023) << 10 | str.charCodeAt(++i3) & 1023);
            bytes += 4;
          }
        }
      }
      bytes += this.encode(bytes * 8);
      this.update(str);
      return bytes;
    };
    Keccak.prototype.bytepad = function(strs, w) {
      var bytes = this.encode(w);
      for (var i3 = 0; i3 < strs.length; ++i3) {
        bytes += this.encodeString(strs[i3]);
      }
      var paddingBytes = w - bytes % w;
      var zeros = [];
      zeros.length = paddingBytes;
      this.update(zeros);
      return this;
    };
    Keccak.prototype.finalize = function() {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      var blocks = this.blocks, i3 = this.lastByteIndex, blockCount = this.blockCount, s2 = this.s;
      blocks[i3 >> 2] |= this.padding[i3 & 3];
      if (this.lastByteIndex === this.byteCount) {
        blocks[0] = blocks[blockCount];
        for (i3 = 1; i3 < blockCount + 1; ++i3) {
          blocks[i3] = 0;
        }
      }
      blocks[blockCount - 1] |= 2147483648;
      for (i3 = 0; i3 < blockCount; ++i3) {
        s2[i3] ^= blocks[i3];
      }
      f2(s2);
    };
    Keccak.prototype.toString = Keccak.prototype.hex = function() {
      this.finalize();
      var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i3 = 0, j3 = 0;
      var hex = "", block;
      while (j3 < outputBlocks) {
        for (i3 = 0; i3 < blockCount && j3 < outputBlocks; ++i3, ++j3) {
          block = s2[i3];
          hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15] + HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15] + HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15] + HEX_CHARS[block >> 28 & 15] + HEX_CHARS[block >> 24 & 15];
        }
        if (j3 % blockCount === 0) {
          f2(s2);
          i3 = 0;
        }
      }
      if (extraBytes) {
        block = s2[i3];
        hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15];
        if (extraBytes > 1) {
          hex += HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15];
        }
        if (extraBytes > 2) {
          hex += HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15];
        }
      }
      return hex;
    };
    Keccak.prototype.arrayBuffer = function() {
      this.finalize();
      var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i3 = 0, j3 = 0;
      var bytes = this.outputBits >> 3;
      var buffer;
      if (extraBytes) {
        buffer = new ArrayBuffer(outputBlocks + 1 << 2);
      } else {
        buffer = new ArrayBuffer(bytes);
      }
      var array = new Uint32Array(buffer);
      while (j3 < outputBlocks) {
        for (i3 = 0; i3 < blockCount && j3 < outputBlocks; ++i3, ++j3) {
          array[j3] = s2[i3];
        }
        if (j3 % blockCount === 0) {
          f2(s2);
        }
      }
      if (extraBytes) {
        array[i3] = s2[i3];
        buffer = buffer.slice(0, bytes);
      }
      return buffer;
    };
    Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;
    Keccak.prototype.digest = Keccak.prototype.array = function() {
      this.finalize();
      var blockCount = this.blockCount, s2 = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i3 = 0, j3 = 0;
      var array = [], offset, block;
      while (j3 < outputBlocks) {
        for (i3 = 0; i3 < blockCount && j3 < outputBlocks; ++i3, ++j3) {
          offset = j3 << 2;
          block = s2[i3];
          array[offset] = block & 255;
          array[offset + 1] = block >> 8 & 255;
          array[offset + 2] = block >> 16 & 255;
          array[offset + 3] = block >> 24 & 255;
        }
        if (j3 % blockCount === 0) {
          f2(s2);
        }
      }
      if (extraBytes) {
        offset = j3 << 2;
        block = s2[i3];
        array[offset] = block & 255;
        if (extraBytes > 1) {
          array[offset + 1] = block >> 8 & 255;
        }
        if (extraBytes > 2) {
          array[offset + 2] = block >> 16 & 255;
        }
      }
      return array;
    };
    function Kmac(bits2, padding, outputBits) {
      Keccak.call(this, bits2, padding, outputBits);
    }
    Kmac.prototype = new Keccak();
    Kmac.prototype.finalize = function() {
      this.encode(this.outputBits, true);
      return Keccak.prototype.finalize.call(this);
    };
    var f2 = function(s2) {
      var h2, l2, n11, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
      for (n11 = 0; n11 < 48; n11 += 2) {
        c0 = s2[0] ^ s2[10] ^ s2[20] ^ s2[30] ^ s2[40];
        c1 = s2[1] ^ s2[11] ^ s2[21] ^ s2[31] ^ s2[41];
        c2 = s2[2] ^ s2[12] ^ s2[22] ^ s2[32] ^ s2[42];
        c3 = s2[3] ^ s2[13] ^ s2[23] ^ s2[33] ^ s2[43];
        c4 = s2[4] ^ s2[14] ^ s2[24] ^ s2[34] ^ s2[44];
        c5 = s2[5] ^ s2[15] ^ s2[25] ^ s2[35] ^ s2[45];
        c6 = s2[6] ^ s2[16] ^ s2[26] ^ s2[36] ^ s2[46];
        c7 = s2[7] ^ s2[17] ^ s2[27] ^ s2[37] ^ s2[47];
        c8 = s2[8] ^ s2[18] ^ s2[28] ^ s2[38] ^ s2[48];
        c9 = s2[9] ^ s2[19] ^ s2[29] ^ s2[39] ^ s2[49];
        h2 = c8 ^ (c2 << 1 | c3 >>> 31);
        l2 = c9 ^ (c3 << 1 | c2 >>> 31);
        s2[0] ^= h2;
        s2[1] ^= l2;
        s2[10] ^= h2;
        s2[11] ^= l2;
        s2[20] ^= h2;
        s2[21] ^= l2;
        s2[30] ^= h2;
        s2[31] ^= l2;
        s2[40] ^= h2;
        s2[41] ^= l2;
        h2 = c0 ^ (c4 << 1 | c5 >>> 31);
        l2 = c1 ^ (c5 << 1 | c4 >>> 31);
        s2[2] ^= h2;
        s2[3] ^= l2;
        s2[12] ^= h2;
        s2[13] ^= l2;
        s2[22] ^= h2;
        s2[23] ^= l2;
        s2[32] ^= h2;
        s2[33] ^= l2;
        s2[42] ^= h2;
        s2[43] ^= l2;
        h2 = c2 ^ (c6 << 1 | c7 >>> 31);
        l2 = c3 ^ (c7 << 1 | c6 >>> 31);
        s2[4] ^= h2;
        s2[5] ^= l2;
        s2[14] ^= h2;
        s2[15] ^= l2;
        s2[24] ^= h2;
        s2[25] ^= l2;
        s2[34] ^= h2;
        s2[35] ^= l2;
        s2[44] ^= h2;
        s2[45] ^= l2;
        h2 = c4 ^ (c8 << 1 | c9 >>> 31);
        l2 = c5 ^ (c9 << 1 | c8 >>> 31);
        s2[6] ^= h2;
        s2[7] ^= l2;
        s2[16] ^= h2;
        s2[17] ^= l2;
        s2[26] ^= h2;
        s2[27] ^= l2;
        s2[36] ^= h2;
        s2[37] ^= l2;
        s2[46] ^= h2;
        s2[47] ^= l2;
        h2 = c6 ^ (c0 << 1 | c1 >>> 31);
        l2 = c7 ^ (c1 << 1 | c0 >>> 31);
        s2[8] ^= h2;
        s2[9] ^= l2;
        s2[18] ^= h2;
        s2[19] ^= l2;
        s2[28] ^= h2;
        s2[29] ^= l2;
        s2[38] ^= h2;
        s2[39] ^= l2;
        s2[48] ^= h2;
        s2[49] ^= l2;
        b0 = s2[0];
        b1 = s2[1];
        b32 = s2[11] << 4 | s2[10] >>> 28;
        b33 = s2[10] << 4 | s2[11] >>> 28;
        b14 = s2[20] << 3 | s2[21] >>> 29;
        b15 = s2[21] << 3 | s2[20] >>> 29;
        b46 = s2[31] << 9 | s2[30] >>> 23;
        b47 = s2[30] << 9 | s2[31] >>> 23;
        b28 = s2[40] << 18 | s2[41] >>> 14;
        b29 = s2[41] << 18 | s2[40] >>> 14;
        b20 = s2[2] << 1 | s2[3] >>> 31;
        b21 = s2[3] << 1 | s2[2] >>> 31;
        b2 = s2[13] << 12 | s2[12] >>> 20;
        b3 = s2[12] << 12 | s2[13] >>> 20;
        b34 = s2[22] << 10 | s2[23] >>> 22;
        b35 = s2[23] << 10 | s2[22] >>> 22;
        b16 = s2[33] << 13 | s2[32] >>> 19;
        b17 = s2[32] << 13 | s2[33] >>> 19;
        b48 = s2[42] << 2 | s2[43] >>> 30;
        b49 = s2[43] << 2 | s2[42] >>> 30;
        b40 = s2[5] << 30 | s2[4] >>> 2;
        b41 = s2[4] << 30 | s2[5] >>> 2;
        b22 = s2[14] << 6 | s2[15] >>> 26;
        b23 = s2[15] << 6 | s2[14] >>> 26;
        b4 = s2[25] << 11 | s2[24] >>> 21;
        b5 = s2[24] << 11 | s2[25] >>> 21;
        b36 = s2[34] << 15 | s2[35] >>> 17;
        b37 = s2[35] << 15 | s2[34] >>> 17;
        b18 = s2[45] << 29 | s2[44] >>> 3;
        b19 = s2[44] << 29 | s2[45] >>> 3;
        b10 = s2[6] << 28 | s2[7] >>> 4;
        b11 = s2[7] << 28 | s2[6] >>> 4;
        b42 = s2[17] << 23 | s2[16] >>> 9;
        b43 = s2[16] << 23 | s2[17] >>> 9;
        b24 = s2[26] << 25 | s2[27] >>> 7;
        b25 = s2[27] << 25 | s2[26] >>> 7;
        b6 = s2[36] << 21 | s2[37] >>> 11;
        b7 = s2[37] << 21 | s2[36] >>> 11;
        b38 = s2[47] << 24 | s2[46] >>> 8;
        b39 = s2[46] << 24 | s2[47] >>> 8;
        b30 = s2[8] << 27 | s2[9] >>> 5;
        b31 = s2[9] << 27 | s2[8] >>> 5;
        b12 = s2[18] << 20 | s2[19] >>> 12;
        b13 = s2[19] << 20 | s2[18] >>> 12;
        b44 = s2[29] << 7 | s2[28] >>> 25;
        b45 = s2[28] << 7 | s2[29] >>> 25;
        b26 = s2[38] << 8 | s2[39] >>> 24;
        b27 = s2[39] << 8 | s2[38] >>> 24;
        b8 = s2[48] << 14 | s2[49] >>> 18;
        b9 = s2[49] << 14 | s2[48] >>> 18;
        s2[0] = b0 ^ ~b2 & b4;
        s2[1] = b1 ^ ~b3 & b5;
        s2[10] = b10 ^ ~b12 & b14;
        s2[11] = b11 ^ ~b13 & b15;
        s2[20] = b20 ^ ~b22 & b24;
        s2[21] = b21 ^ ~b23 & b25;
        s2[30] = b30 ^ ~b32 & b34;
        s2[31] = b31 ^ ~b33 & b35;
        s2[40] = b40 ^ ~b42 & b44;
        s2[41] = b41 ^ ~b43 & b45;
        s2[2] = b2 ^ ~b4 & b6;
        s2[3] = b3 ^ ~b5 & b7;
        s2[12] = b12 ^ ~b14 & b16;
        s2[13] = b13 ^ ~b15 & b17;
        s2[22] = b22 ^ ~b24 & b26;
        s2[23] = b23 ^ ~b25 & b27;
        s2[32] = b32 ^ ~b34 & b36;
        s2[33] = b33 ^ ~b35 & b37;
        s2[42] = b42 ^ ~b44 & b46;
        s2[43] = b43 ^ ~b45 & b47;
        s2[4] = b4 ^ ~b6 & b8;
        s2[5] = b5 ^ ~b7 & b9;
        s2[14] = b14 ^ ~b16 & b18;
        s2[15] = b15 ^ ~b17 & b19;
        s2[24] = b24 ^ ~b26 & b28;
        s2[25] = b25 ^ ~b27 & b29;
        s2[34] = b34 ^ ~b36 & b38;
        s2[35] = b35 ^ ~b37 & b39;
        s2[44] = b44 ^ ~b46 & b48;
        s2[45] = b45 ^ ~b47 & b49;
        s2[6] = b6 ^ ~b8 & b0;
        s2[7] = b7 ^ ~b9 & b1;
        s2[16] = b16 ^ ~b18 & b10;
        s2[17] = b17 ^ ~b19 & b11;
        s2[26] = b26 ^ ~b28 & b20;
        s2[27] = b27 ^ ~b29 & b21;
        s2[36] = b36 ^ ~b38 & b30;
        s2[37] = b37 ^ ~b39 & b31;
        s2[46] = b46 ^ ~b48 & b40;
        s2[47] = b47 ^ ~b49 & b41;
        s2[8] = b8 ^ ~b0 & b2;
        s2[9] = b9 ^ ~b1 & b3;
        s2[18] = b18 ^ ~b10 & b12;
        s2[19] = b19 ^ ~b11 & b13;
        s2[28] = b28 ^ ~b20 & b22;
        s2[29] = b29 ^ ~b21 & b23;
        s2[38] = b38 ^ ~b30 & b32;
        s2[39] = b39 ^ ~b31 & b33;
        s2[48] = b48 ^ ~b40 & b42;
        s2[49] = b49 ^ ~b41 & b43;
        s2[0] ^= RC[n11];
        s2[1] ^= RC[n11 + 1];
      }
    };
    if (COMMON_JS) {
      module.exports = methods;
    } else {
      for (i2 = 0; i2 < methodNames.length; ++i2) {
        root[methodNames[i2]] = methods[methodNames[i2]];
      }
    }
  })();
})(sha3$1);
var sha3Exports = sha3$1.exports;
const sha3 = /* @__PURE__ */ getDefaultExportFromCjs(sha3Exports);
const version$6 = "logger/5.7.0";
let _permanentCensorErrors = false;
let _censorErrors = false;
const LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 };
let _logLevel = LogLevels["default"];
let _globalLogger = null;
function _checkNormalize() {
  try {
    const missing = [];
    ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
      try {
        if ("test".normalize(form) !== "test") {
          throw new Error("bad normalize");
        }
        ;
      } catch (error) {
        missing.push(form);
      }
    });
    if (missing.length) {
      throw new Error("missing " + missing.join(", "));
    }
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769)) {
      throw new Error("broken implementation");
    }
  } catch (error) {
    return error.message;
  }
  return null;
}
const _normalizeError = _checkNormalize();
var LogLevel;
(function(LogLevel2) {
  LogLevel2["DEBUG"] = "DEBUG";
  LogLevel2["INFO"] = "INFO";
  LogLevel2["WARNING"] = "WARNING";
  LogLevel2["ERROR"] = "ERROR";
  LogLevel2["OFF"] = "OFF";
})(LogLevel || (LogLevel = {}));
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
  ErrorCode2["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
  ErrorCode2["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
  ErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
  ErrorCode2["SERVER_ERROR"] = "SERVER_ERROR";
  ErrorCode2["TIMEOUT"] = "TIMEOUT";
  ErrorCode2["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
  ErrorCode2["NUMERIC_FAULT"] = "NUMERIC_FAULT";
  ErrorCode2["MISSING_NEW"] = "MISSING_NEW";
  ErrorCode2["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
  ErrorCode2["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
  ErrorCode2["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
  ErrorCode2["CALL_EXCEPTION"] = "CALL_EXCEPTION";
  ErrorCode2["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
  ErrorCode2["NONCE_EXPIRED"] = "NONCE_EXPIRED";
  ErrorCode2["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
  ErrorCode2["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
  ErrorCode2["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
  ErrorCode2["ACTION_REJECTED"] = "ACTION_REJECTED";
})(ErrorCode || (ErrorCode = {}));
const HEX = "0123456789abcdef";
class Logger {
  constructor(version2) {
    Object.defineProperty(this, "version", {
      enumerable: true,
      value: version2,
      writable: false
    });
  }
  _log(logLevel, args) {
    const level = logLevel.toLowerCase();
    if (LogLevels[level] == null) {
      this.throwArgumentError("invalid log level name", "logLevel", logLevel);
    }
    if (_logLevel > LogLevels[level]) {
      return;
    }
    console.log.apply(console, args);
  }
  debug(...args) {
    this._log(Logger.levels.DEBUG, args);
  }
  info(...args) {
    this._log(Logger.levels.INFO, args);
  }
  warn(...args) {
    this._log(Logger.levels.WARNING, args);
  }
  makeError(message, code, params) {
    if (_censorErrors) {
      return this.makeError("censored error", code, {});
    }
    if (!code) {
      code = Logger.errors.UNKNOWN_ERROR;
    }
    if (!params) {
      params = {};
    }
    const messageDetails = [];
    Object.keys(params).forEach((key) => {
      const value = params[key];
      try {
        if (value instanceof Uint8Array) {
          let hex = "";
          for (let i2 = 0; i2 < value.length; i2++) {
            hex += HEX[value[i2] >> 4];
            hex += HEX[value[i2] & 15];
          }
          messageDetails.push(key + "=Uint8Array(0x" + hex + ")");
        } else {
          messageDetails.push(key + "=" + JSON.stringify(value));
        }
      } catch (error2) {
        messageDetails.push(key + "=" + JSON.stringify(params[key].toString()));
      }
    });
    messageDetails.push(`code=${code}`);
    messageDetails.push(`version=${this.version}`);
    const reason = message;
    let url = "";
    switch (code) {
      case ErrorCode.NUMERIC_FAULT: {
        url = "NUMERIC_FAULT";
        const fault = message;
        switch (fault) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            url += "-" + fault;
            break;
          case "negative-power":
          case "negative-width":
            url += "-unsupported";
            break;
          case "unbound-bitwise-result":
            url += "-unbound-result";
            break;
        }
        break;
      }
      case ErrorCode.CALL_EXCEPTION:
      case ErrorCode.INSUFFICIENT_FUNDS:
      case ErrorCode.MISSING_NEW:
      case ErrorCode.NONCE_EXPIRED:
      case ErrorCode.REPLACEMENT_UNDERPRICED:
      case ErrorCode.TRANSACTION_REPLACED:
      case ErrorCode.UNPREDICTABLE_GAS_LIMIT:
        url = code;
        break;
    }
    if (url) {
      message += " [ See: https://links.ethers.org/v5-errors-" + url + " ]";
    }
    if (messageDetails.length) {
      message += " (" + messageDetails.join(", ") + ")";
    }
    const error = new Error(message);
    error.reason = reason;
    error.code = code;
    Object.keys(params).forEach(function(key) {
      error[key] = params[key];
    });
    return error;
  }
  throwError(message, code, params) {
    throw this.makeError(message, code, params);
  }
  throwArgumentError(message, name, value) {
    return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
      argument: name,
      value
    });
  }
  assert(condition, message, code, params) {
    if (!!condition) {
      return;
    }
    this.throwError(message, code, params);
  }
  assertArgument(condition, message, name, value) {
    if (!!condition) {
      return;
    }
    this.throwArgumentError(message, name, value);
  }
  checkNormalize(message) {
    if (_normalizeError) {
      this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "String.prototype.normalize",
        form: _normalizeError
      });
    }
  }
  checkSafeUint53(value, message) {
    if (typeof value !== "number") {
      return;
    }
    if (message == null) {
      message = "value not safe";
    }
    if (value < 0 || value >= 9007199254740991) {
      this.throwError(message, Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "out-of-safe-range",
        value
      });
    }
    if (value % 1) {
      this.throwError(message, Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "non-integer",
        value
      });
    }
  }
  checkArgumentCount(count, expectedCount, message) {
    if (message) {
      message = ": " + message;
    } else {
      message = "";
    }
    if (count < expectedCount) {
      this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
        count,
        expectedCount
      });
    }
    if (count > expectedCount) {
      this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
        count,
        expectedCount
      });
    }
  }
  checkNew(target, kind) {
    if (target === Object || target == null) {
      this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
    }
  }
  checkAbstract(target, kind) {
    if (target === kind) {
      this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" });
    } else if (target === Object || target == null) {
      this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
    }
  }
  static globalLogger() {
    if (!_globalLogger) {
      _globalLogger = new Logger(version$6);
    }
    return _globalLogger;
  }
  static setCensorship(censorship, permanent) {
    if (!censorship && permanent) {
      this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    if (_permanentCensorErrors) {
      if (!censorship) {
        return;
      }
      this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    _censorErrors = !!censorship;
    _permanentCensorErrors = !!permanent;
  }
  static setLogLevel(logLevel) {
    const level = LogLevels[logLevel.toLowerCase()];
    if (level == null) {
      Logger.globalLogger().warn("invalid log level - " + logLevel);
      return;
    }
    _logLevel = level;
  }
  static from(version2) {
    return new Logger(version2);
  }
}
Logger.errors = ErrorCode;
Logger.levels = LogLevel;
const version$5 = "bytes/5.7.0";
const logger$9 = new Logger(version$5);
function isHexable(value) {
  return !!value.toHexString;
}
function addSlice(array) {
  if (array.slice) {
    return array;
  }
  array.slice = function() {
    const args = Array.prototype.slice.call(arguments);
    return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
  };
  return array;
}
function isInteger(value) {
  return typeof value === "number" && value == value && value % 1 === 0;
}
function isBytes(value) {
  if (value == null) {
    return false;
  }
  if (value.constructor === Uint8Array) {
    return true;
  }
  if (typeof value === "string") {
    return false;
  }
  if (!isInteger(value.length) || value.length < 0) {
    return false;
  }
  for (let i2 = 0; i2 < value.length; i2++) {
    const v2 = value[i2];
    if (!isInteger(v2) || v2 < 0 || v2 >= 256) {
      return false;
    }
  }
  return true;
}
function arrayify(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    logger$9.checkSafeUint53(value, "invalid arrayify value");
    const result = [];
    while (value) {
      result.unshift(value & 255);
      value = parseInt(String(value / 256));
    }
    if (result.length === 0) {
      result.push(0);
    }
    return addSlice(new Uint8Array(result));
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexable(value)) {
    value = value.toHexString();
  }
  if (isHexString(value)) {
    let hex = value.substring(2);
    if (hex.length % 2) {
      if (options.hexPad === "left") {
        hex = "0" + hex;
      } else if (options.hexPad === "right") {
        hex += "0";
      } else {
        logger$9.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    const result = [];
    for (let i2 = 0; i2 < hex.length; i2 += 2) {
      result.push(parseInt(hex.substring(i2, i2 + 2), 16));
    }
    return addSlice(new Uint8Array(result));
  }
  if (isBytes(value)) {
    return addSlice(new Uint8Array(value));
  }
  return logger$9.throwArgumentError("invalid arrayify value", "value", value);
}
function concat(items) {
  const objects = items.map((item) => arrayify(item));
  const length = objects.reduce((accum, item) => accum + item.length, 0);
  const result = new Uint8Array(length);
  objects.reduce((offset, object) => {
    result.set(object, offset);
    return offset + object.length;
  }, 0);
  return addSlice(result);
}
function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}
const HexCharacters = "0123456789abcdef";
function hexlify(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    logger$9.checkSafeUint53(value, "invalid hexlify value");
    let hex = "";
    while (value) {
      hex = HexCharacters[value & 15] + hex;
      value = Math.floor(value / 16);
    }
    if (hex.length) {
      if (hex.length % 2) {
        hex = "0" + hex;
      }
      return "0x" + hex;
    }
    return "0x00";
  }
  if (typeof value === "bigint") {
    value = value.toString(16);
    if (value.length % 2) {
      return "0x0" + value;
    }
    return "0x" + value;
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexable(value)) {
    return value.toHexString();
  }
  if (isHexString(value)) {
    if (value.length % 2) {
      if (options.hexPad === "left") {
        value = "0x0" + value.substring(2);
      } else if (options.hexPad === "right") {
        value += "0";
      } else {
        logger$9.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    return value.toLowerCase();
  }
  if (isBytes(value)) {
    let result = "0x";
    for (let i2 = 0; i2 < value.length; i2++) {
      let v2 = value[i2];
      result += HexCharacters[(v2 & 240) >> 4] + HexCharacters[v2 & 15];
    }
    return result;
  }
  return logger$9.throwArgumentError("invalid hexlify value", "value", value);
}
function hexDataSlice(data, offset, endOffset) {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    logger$9.throwArgumentError("invalid hexData", "value", data);
  }
  offset = 2 + 2 * offset;
  if (endOffset != null) {
    return "0x" + data.substring(offset, 2 + 2 * endOffset);
  }
  return "0x" + data.substring(offset);
}
function hexConcat(items) {
  let result = "0x";
  items.forEach((item) => {
    result += hexlify(item).substring(2);
  });
  return result;
}
function hexZeroPad(value, length) {
  if (typeof value !== "string") {
    value = hexlify(value);
  } else if (!isHexString(value)) {
    logger$9.throwArgumentError("invalid hex string", "value", value);
  }
  if (value.length > 2 * length + 2) {
    logger$9.throwArgumentError("value out of range", "value", arguments[1]);
  }
  while (value.length < 2 * length + 2) {
    value = "0x0" + value.substring(2);
  }
  return value;
}
function keccak256(data) {
  return "0x" + sha3.keccak_256(arrayify(data));
}
const version$4 = "bignumber/5.7.0";
var BN = BN$1.BN;
const logger$8 = new Logger(version$4);
const _constructorGuard$1 = {};
const MAX_SAFE = 9007199254740991;
let _warnedToStringRadix = false;
class BigNumber {
  constructor(constructorGuard, hex) {
    if (constructorGuard !== _constructorGuard$1) {
      logger$8.throwError("cannot call constructor directly; use BigNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new (BigNumber)"
      });
    }
    this._hex = hex;
    this._isBigNumber = true;
    Object.freeze(this);
  }
  fromTwos(value) {
    return toBigNumber(toBN(this).fromTwos(value));
  }
  toTwos(value) {
    return toBigNumber(toBN(this).toTwos(value));
  }
  abs() {
    if (this._hex[0] === "-") {
      return BigNumber.from(this._hex.substring(1));
    }
    return this;
  }
  add(other) {
    return toBigNumber(toBN(this).add(toBN(other)));
  }
  sub(other) {
    return toBigNumber(toBN(this).sub(toBN(other)));
  }
  div(other) {
    const o2 = BigNumber.from(other);
    if (o2.isZero()) {
      throwFault("division-by-zero", "div");
    }
    return toBigNumber(toBN(this).div(toBN(other)));
  }
  mul(other) {
    return toBigNumber(toBN(this).mul(toBN(other)));
  }
  mod(other) {
    const value = toBN(other);
    if (value.isNeg()) {
      throwFault("division-by-zero", "mod");
    }
    return toBigNumber(toBN(this).umod(value));
  }
  pow(other) {
    const value = toBN(other);
    if (value.isNeg()) {
      throwFault("negative-power", "pow");
    }
    return toBigNumber(toBN(this).pow(value));
  }
  and(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault("unbound-bitwise-result", "and");
    }
    return toBigNumber(toBN(this).and(value));
  }
  or(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault("unbound-bitwise-result", "or");
    }
    return toBigNumber(toBN(this).or(value));
  }
  xor(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault("unbound-bitwise-result", "xor");
    }
    return toBigNumber(toBN(this).xor(value));
  }
  mask(value) {
    if (this.isNegative() || value < 0) {
      throwFault("negative-width", "mask");
    }
    return toBigNumber(toBN(this).maskn(value));
  }
  shl(value) {
    if (this.isNegative() || value < 0) {
      throwFault("negative-width", "shl");
    }
    return toBigNumber(toBN(this).shln(value));
  }
  shr(value) {
    if (this.isNegative() || value < 0) {
      throwFault("negative-width", "shr");
    }
    return toBigNumber(toBN(this).shrn(value));
  }
  eq(other) {
    return toBN(this).eq(toBN(other));
  }
  lt(other) {
    return toBN(this).lt(toBN(other));
  }
  lte(other) {
    return toBN(this).lte(toBN(other));
  }
  gt(other) {
    return toBN(this).gt(toBN(other));
  }
  gte(other) {
    return toBN(this).gte(toBN(other));
  }
  isNegative() {
    return this._hex[0] === "-";
  }
  isZero() {
    return toBN(this).isZero();
  }
  toNumber() {
    try {
      return toBN(this).toNumber();
    } catch (error) {
      throwFault("overflow", "toNumber", this.toString());
    }
    return null;
  }
  toBigInt() {
    try {
      return BigInt(this.toString());
    } catch (e2) {
    }
    return logger$8.throwError("this platform does not support BigInt", Logger.errors.UNSUPPORTED_OPERATION, {
      value: this.toString()
    });
  }
  toString() {
    if (arguments.length > 0) {
      if (arguments[0] === 10) {
        if (!_warnedToStringRadix) {
          _warnedToStringRadix = true;
          logger$8.warn("BigNumber.toString does not accept any parameters; base-10 is assumed");
        }
      } else if (arguments[0] === 16) {
        logger$8.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", Logger.errors.UNEXPECTED_ARGUMENT, {});
      } else {
        logger$8.throwError("BigNumber.toString does not accept parameters", Logger.errors.UNEXPECTED_ARGUMENT, {});
      }
    }
    return toBN(this).toString(10);
  }
  toHexString() {
    return this._hex;
  }
  toJSON(key) {
    return { type: "BigNumber", hex: this.toHexString() };
  }
  static from(value) {
    if (value instanceof BigNumber) {
      return value;
    }
    if (typeof value === "string") {
      if (value.match(/^-?0x[0-9a-f]+$/i)) {
        return new BigNumber(_constructorGuard$1, toHex(value));
      }
      if (value.match(/^-?[0-9]+$/)) {
        return new BigNumber(_constructorGuard$1, toHex(new BN(value)));
      }
      return logger$8.throwArgumentError("invalid BigNumber string", "value", value);
    }
    if (typeof value === "number") {
      if (value % 1) {
        throwFault("underflow", "BigNumber.from", value);
      }
      if (value >= MAX_SAFE || value <= -MAX_SAFE) {
        throwFault("overflow", "BigNumber.from", value);
      }
      return BigNumber.from(String(value));
    }
    const anyValue = value;
    if (typeof anyValue === "bigint") {
      return BigNumber.from(anyValue.toString());
    }
    if (isBytes(anyValue)) {
      return BigNumber.from(hexlify(anyValue));
    }
    if (anyValue) {
      if (anyValue.toHexString) {
        const hex = anyValue.toHexString();
        if (typeof hex === "string") {
          return BigNumber.from(hex);
        }
      } else {
        let hex = anyValue._hex;
        if (hex == null && anyValue.type === "BigNumber") {
          hex = anyValue.hex;
        }
        if (typeof hex === "string") {
          if (isHexString(hex) || hex[0] === "-" && isHexString(hex.substring(1))) {
            return BigNumber.from(hex);
          }
        }
      }
    }
    return logger$8.throwArgumentError("invalid BigNumber value", "value", value);
  }
  static isBigNumber(value) {
    return !!(value && value._isBigNumber);
  }
}
function toHex(value) {
  if (typeof value !== "string") {
    return toHex(value.toString(16));
  }
  if (value[0] === "-") {
    value = value.substring(1);
    if (value[0] === "-") {
      logger$8.throwArgumentError("invalid hex", "value", value);
    }
    value = toHex(value);
    if (value === "0x00") {
      return value;
    }
    return "-" + value;
  }
  if (value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (value === "0x") {
    return "0x00";
  }
  if (value.length % 2) {
    value = "0x0" + value.substring(2);
  }
  while (value.length > 4 && value.substring(0, 4) === "0x00") {
    value = "0x" + value.substring(4);
  }
  return value;
}
function toBigNumber(value) {
  return BigNumber.from(toHex(value));
}
function toBN(value) {
  const hex = BigNumber.from(value).toHexString();
  if (hex[0] === "-") {
    return new BN("-" + hex.substring(3), 16);
  }
  return new BN(hex.substring(2), 16);
}
function throwFault(fault, operation, value) {
  const params = { fault, operation };
  if (value != null) {
    params.value = value;
  }
  return logger$8.throwError(fault, Logger.errors.NUMERIC_FAULT, params);
}
function _base36To16(value) {
  return new BN(value, 36).toString(16);
}
const NegativeOne = /* @__PURE__ */ BigNumber.from(-1);
const Zero = /* @__PURE__ */ BigNumber.from(0);
const One = /* @__PURE__ */ BigNumber.from(1);
const MaxUint256 = /* @__PURE__ */ BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
const version$3 = "strings/5.7.0";
const logger$7 = new Logger(version$3);
var UnicodeNormalizationForm;
(function(UnicodeNormalizationForm2) {
  UnicodeNormalizationForm2["current"] = "";
  UnicodeNormalizationForm2["NFC"] = "NFC";
  UnicodeNormalizationForm2["NFD"] = "NFD";
  UnicodeNormalizationForm2["NFKC"] = "NFKC";
  UnicodeNormalizationForm2["NFKD"] = "NFKD";
})(UnicodeNormalizationForm || (UnicodeNormalizationForm = {}));
var Utf8ErrorReason;
(function(Utf8ErrorReason2) {
  Utf8ErrorReason2["UNEXPECTED_CONTINUE"] = "unexpected continuation byte";
  Utf8ErrorReason2["BAD_PREFIX"] = "bad codepoint prefix";
  Utf8ErrorReason2["OVERRUN"] = "string overrun";
  Utf8ErrorReason2["MISSING_CONTINUE"] = "missing continuation byte";
  Utf8ErrorReason2["OUT_OF_RANGE"] = "out of UTF-8 range";
  Utf8ErrorReason2["UTF16_SURROGATE"] = "UTF-16 surrogate";
  Utf8ErrorReason2["OVERLONG"] = "overlong representation";
})(Utf8ErrorReason || (Utf8ErrorReason = {}));
function errorFunc(reason, offset, bytes, output, badCodepoint) {
  return logger$7.throwArgumentError(`invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes);
}
function ignoreFunc(reason, offset, bytes, output, badCodepoint) {
  if (reason === Utf8ErrorReason.BAD_PREFIX || reason === Utf8ErrorReason.UNEXPECTED_CONTINUE) {
    let i2 = 0;
    for (let o2 = offset + 1; o2 < bytes.length; o2++) {
      if (bytes[o2] >> 6 !== 2) {
        break;
      }
      i2++;
    }
    return i2;
  }
  if (reason === Utf8ErrorReason.OVERRUN) {
    return bytes.length - offset - 1;
  }
  return 0;
}
function replaceFunc(reason, offset, bytes, output, badCodepoint) {
  if (reason === Utf8ErrorReason.OVERLONG) {
    output.push(badCodepoint);
    return 0;
  }
  output.push(65533);
  return ignoreFunc(reason, offset, bytes);
}
const Utf8ErrorFuncs = Object.freeze({
  error: errorFunc,
  ignore: ignoreFunc,
  replace: replaceFunc
});
function getUtf8CodePoints(bytes, onError) {
  if (onError == null) {
    onError = Utf8ErrorFuncs.error;
  }
  bytes = arrayify(bytes);
  const result = [];
  let i2 = 0;
  while (i2 < bytes.length) {
    const c2 = bytes[i2++];
    if (c2 >> 7 === 0) {
      result.push(c2);
      continue;
    }
    let extraLength = null;
    let overlongMask = null;
    if ((c2 & 224) === 192) {
      extraLength = 1;
      overlongMask = 127;
    } else if ((c2 & 240) === 224) {
      extraLength = 2;
      overlongMask = 2047;
    } else if ((c2 & 248) === 240) {
      extraLength = 3;
      overlongMask = 65535;
    } else {
      if ((c2 & 192) === 128) {
        i2 += onError(Utf8ErrorReason.UNEXPECTED_CONTINUE, i2 - 1, bytes, result);
      } else {
        i2 += onError(Utf8ErrorReason.BAD_PREFIX, i2 - 1, bytes, result);
      }
      continue;
    }
    if (i2 - 1 + extraLength >= bytes.length) {
      i2 += onError(Utf8ErrorReason.OVERRUN, i2 - 1, bytes, result);
      continue;
    }
    let res = c2 & (1 << 8 - extraLength - 1) - 1;
    for (let j2 = 0; j2 < extraLength; j2++) {
      let nextChar = bytes[i2];
      if ((nextChar & 192) != 128) {
        i2 += onError(Utf8ErrorReason.MISSING_CONTINUE, i2, bytes, result);
        res = null;
        break;
      }
      res = res << 6 | nextChar & 63;
      i2++;
    }
    if (res === null) {
      continue;
    }
    if (res > 1114111) {
      i2 += onError(Utf8ErrorReason.OUT_OF_RANGE, i2 - 1 - extraLength, bytes, result, res);
      continue;
    }
    if (res >= 55296 && res <= 57343) {
      i2 += onError(Utf8ErrorReason.UTF16_SURROGATE, i2 - 1 - extraLength, bytes, result, res);
      continue;
    }
    if (res <= overlongMask) {
      i2 += onError(Utf8ErrorReason.OVERLONG, i2 - 1 - extraLength, bytes, result, res);
      continue;
    }
    result.push(res);
  }
  return result;
}
function toUtf8Bytes(str, form = UnicodeNormalizationForm.current) {
  if (form != UnicodeNormalizationForm.current) {
    logger$7.checkNormalize();
    str = str.normalize(form);
  }
  let result = [];
  for (let i2 = 0; i2 < str.length; i2++) {
    const c2 = str.charCodeAt(i2);
    if (c2 < 128) {
      result.push(c2);
    } else if (c2 < 2048) {
      result.push(c2 >> 6 | 192);
      result.push(c2 & 63 | 128);
    } else if ((c2 & 64512) == 55296) {
      i2++;
      const c22 = str.charCodeAt(i2);
      if (i2 >= str.length || (c22 & 64512) !== 56320) {
        throw new Error("invalid utf-8 string");
      }
      const pair = 65536 + ((c2 & 1023) << 10) + (c22 & 1023);
      result.push(pair >> 18 | 240);
      result.push(pair >> 12 & 63 | 128);
      result.push(pair >> 6 & 63 | 128);
      result.push(pair & 63 | 128);
    } else {
      result.push(c2 >> 12 | 224);
      result.push(c2 >> 6 & 63 | 128);
      result.push(c2 & 63 | 128);
    }
  }
  return arrayify(result);
}
function _toUtf8String(codePoints) {
  return codePoints.map((codePoint) => {
    if (codePoint <= 65535) {
      return String.fromCharCode(codePoint);
    }
    codePoint -= 65536;
    return String.fromCharCode((codePoint >> 10 & 1023) + 55296, (codePoint & 1023) + 56320);
  }).join("");
}
function toUtf8String(bytes, onError) {
  return _toUtf8String(getUtf8CodePoints(bytes, onError));
}
function id(text) {
  return keccak256(toUtf8Bytes(text));
}
const version$2 = "address/5.7.0";
const logger$6 = new Logger(version$2);
function getChecksumAddress(address) {
  if (!isHexString(address, 20)) {
    logger$6.throwArgumentError("invalid address", "address", address);
  }
  address = address.toLowerCase();
  const chars = address.substring(2).split("");
  const expanded = new Uint8Array(40);
  for (let i2 = 0; i2 < 40; i2++) {
    expanded[i2] = chars[i2].charCodeAt(0);
  }
  const hashed = arrayify(keccak256(expanded));
  for (let i2 = 0; i2 < 40; i2 += 2) {
    if (hashed[i2 >> 1] >> 4 >= 8) {
      chars[i2] = chars[i2].toUpperCase();
    }
    if ((hashed[i2 >> 1] & 15) >= 8) {
      chars[i2 + 1] = chars[i2 + 1].toUpperCase();
    }
  }
  return "0x" + chars.join("");
}
const MAX_SAFE_INTEGER = 9007199254740991;
function log10(x) {
  if (Math.log10) {
    return Math.log10(x);
  }
  return Math.log(x) / Math.LN10;
}
const ibanLookup = {};
for (let i2 = 0; i2 < 10; i2++) {
  ibanLookup[String(i2)] = String(i2);
}
for (let i2 = 0; i2 < 26; i2++) {
  ibanLookup[String.fromCharCode(65 + i2)] = String(10 + i2);
}
const safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));
function ibanChecksum(address) {
  address = address.toUpperCase();
  address = address.substring(4) + address.substring(0, 2) + "00";
  let expanded = address.split("").map((c2) => {
    return ibanLookup[c2];
  }).join("");
  while (expanded.length >= safeDigits) {
    let block = expanded.substring(0, safeDigits);
    expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
  }
  let checksum = String(98 - parseInt(expanded, 10) % 97);
  while (checksum.length < 2) {
    checksum = "0" + checksum;
  }
  return checksum;
}
function getAddress(address) {
  let result = null;
  if (typeof address !== "string") {
    logger$6.throwArgumentError("invalid address", "address", address);
  }
  if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    if (address.substring(0, 2) !== "0x") {
      address = "0x" + address;
    }
    result = getChecksumAddress(address);
    if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
      logger$6.throwArgumentError("bad address checksum", "address", address);
    }
  } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    if (address.substring(2, 4) !== ibanChecksum(address)) {
      logger$6.throwArgumentError("bad icap checksum", "address", address);
    }
    result = _base36To16(address.substring(4));
    while (result.length < 40) {
      result = "0" + result;
    }
    result = getChecksumAddress("0x" + result);
  } else {
    logger$6.throwArgumentError("invalid address", "address", address);
  }
  return result;
}
const version$1 = "properties/5.7.0";
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const logger$5 = new Logger(version$1);
function defineReadOnly(object, name, value) {
  Object.defineProperty(object, name, {
    enumerable: true,
    value,
    writable: false
  });
}
function getStatic(ctor, key) {
  for (let i2 = 0; i2 < 32; i2++) {
    if (ctor[key]) {
      return ctor[key];
    }
    if (!ctor.prototype || typeof ctor.prototype !== "object") {
      break;
    }
    ctor = Object.getPrototypeOf(ctor.prototype).constructor;
  }
  return null;
}
const opaque = { bigint: true, boolean: true, "function": true, number: true, string: true };
function _isFrozen(object) {
  if (object === void 0 || object === null || opaque[typeof object]) {
    return true;
  }
  if (Array.isArray(object) || typeof object === "object") {
    if (!Object.isFrozen(object)) {
      return false;
    }
    const keys = Object.keys(object);
    for (let i2 = 0; i2 < keys.length; i2++) {
      let value = null;
      try {
        value = object[keys[i2]];
      } catch (error) {
        continue;
      }
      if (!_isFrozen(value)) {
        return false;
      }
    }
    return true;
  }
  return logger$5.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
}
function _deepCopy(object) {
  if (_isFrozen(object)) {
    return object;
  }
  if (Array.isArray(object)) {
    return Object.freeze(object.map((item) => deepCopy(item)));
  }
  if (typeof object === "object") {
    const result = {};
    for (const key in object) {
      const value = object[key];
      if (value === void 0) {
        continue;
      }
      defineReadOnly(result, key, deepCopy(value));
    }
    return result;
  }
  return logger$5.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
}
function deepCopy(object) {
  return _deepCopy(object);
}
class Description {
  constructor(info) {
    for (const key in info) {
      this[key] = deepCopy(info[key]);
    }
  }
}
function e$6(e2, t3, r2, n11, i2, o2, s2) {
  try {
    var u2 = e2[o2](s2);
    var a2 = u2.value;
  } catch (e3) {
    r2(e3);
    return;
  }
  if (u2.done) {
    t3(a2);
  } else {
    Promise.resolve(a2).then(n11, i2);
  }
}
function t$6(t3) {
  return function() {
    var r2 = this, n11 = arguments;
    return new Promise(function(i2, o2) {
      var s2 = t3.apply(r2, n11);
      function u2(t4) {
        e$6(s2, i2, o2, u2, a2, "next", t4);
      }
      function a2(t4) {
        e$6(s2, i2, o2, u2, a2, "throw", t4);
      }
      u2(void 0);
    });
  };
}
function r$6(e2, t3) {
  if (!(e2 instanceof t3)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function n$6(e2, t3) {
  for (var r2 = 0; r2 < t3.length; r2++) {
    var n11 = t3[r2];
    n11.enumerable = n11.enumerable || false;
    n11.configurable = true;
    if ("value" in n11)
      n11.writable = true;
    Object.defineProperty(e2, n11.key, n11);
  }
}
function i$6(e2, t3, r2) {
  if (t3)
    n$6(e2.prototype, t3);
  if (r2)
    n$6(e2, r2);
  return e2;
}
function o$6(e2, t3, r2) {
  if (t3 in e2) {
    Object.defineProperty(e2, t3, { value: r2, enumerable: true, configurable: true, writable: true });
  } else {
    e2[t3] = r2;
  }
  return e2;
}
function s$6(e2) {
  for (var t3 = 1; t3 < arguments.length; t3++) {
    var r2 = arguments[t3] != null ? arguments[t3] : {};
    var n11 = Object.keys(r2);
    if (typeof Object.getOwnPropertySymbols === "function") {
      n11 = n11.concat(Object.getOwnPropertySymbols(r2).filter(function(e3) {
        return Object.getOwnPropertyDescriptor(r2, e3).enumerable;
      }));
    }
    n11.forEach(function(t4) {
      o$6(e2, t4, r2[t4]);
    });
  }
  return e2;
}
function u$6(e2, t3) {
  var r2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n11 = Object.getOwnPropertySymbols(e2);
    if (t3) {
      n11 = n11.filter(function(t4) {
        return Object.getOwnPropertyDescriptor(e2, t4).enumerable;
      });
    }
    r2.push.apply(r2, n11);
  }
  return r2;
}
function a$6(e2, t3) {
  t3 = t3 != null ? t3 : {};
  if (Object.getOwnPropertyDescriptors) {
    Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t3));
  } else {
    u$6(Object(t3)).forEach(function(r2) {
      Object.defineProperty(e2, r2, Object.getOwnPropertyDescriptor(t3, r2));
    });
  }
  return e2;
}
function c$6(e2) {
  "@swc/helpers - typeof";
  return e2 && typeof Symbol !== "undefined" && e2.constructor === Symbol ? "symbol" : typeof e2;
}
function l$5(e2, t3) {
  var r2, n11, i2, o2, s2 = { label: 0, sent: function() {
    if (i2[0] & 1)
      throw i2[1];
    return i2[1];
  }, trys: [], ops: [] };
  return o2 = { next: u2(0), "throw": u2(1), "return": u2(2) }, typeof Symbol === "function" && (o2[Symbol.iterator] = function() {
    return this;
  }), o2;
  function u2(e3) {
    return function(t4) {
      return a2([e3, t4]);
    };
  }
  function a2(o3) {
    if (r2)
      throw new TypeError("Generator is already executing.");
    while (s2)
      try {
        if (r2 = 1, n11 && (i2 = o3[0] & 2 ? n11["return"] : o3[0] ? n11["throw"] || ((i2 = n11["return"]) && i2.call(n11), 0) : n11.next) && !(i2 = i2.call(n11, o3[1])).done)
          return i2;
        if (n11 = 0, i2)
          o3 = [o3[0] & 2, i2.value];
        switch (o3[0]) {
          case 0:
          case 1:
            i2 = o3;
            break;
          case 4:
            s2.label++;
            return { value: o3[1], done: false };
          case 5:
            s2.label++;
            n11 = o3[1];
            o3 = [0];
            continue;
          case 7:
            o3 = s2.ops.pop();
            s2.trys.pop();
            continue;
          default:
            if (!(i2 = s2.trys, i2 = i2.length > 0 && i2[i2.length - 1]) && (o3[0] === 6 || o3[0] === 2)) {
              s2 = 0;
              continue;
            }
            if (o3[0] === 3 && (!i2 || o3[1] > i2[0] && o3[1] < i2[3])) {
              s2.label = o3[1];
              break;
            }
            if (o3[0] === 6 && s2.label < i2[1]) {
              s2.label = i2[1];
              i2 = o3;
              break;
            }
            if (i2 && s2.label < i2[2]) {
              s2.label = i2[2];
              s2.ops.push(o3);
              break;
            }
            if (i2[2])
              s2.ops.pop();
            s2.trys.pop();
            continue;
        }
        o3 = t3.call(e2, s2);
      } catch (e3) {
        o3 = [6, e3];
        n11 = 0;
      } finally {
        r2 = i2 = 0;
      }
    if (o3[0] & 5)
      throw o3[1];
    return { value: o3[0] ? o3[1] : void 0, done: true };
  }
}
var f$5 = Object.defineProperty;
var p$4 = function(e2, t3, r2) {
  return t3 in e2 ? f$5(e2, t3, { enumerable: true, configurable: true, writable: true, value: r2 }) : e2[t3] = r2;
};
var b$4 = function(e2, t3, r2) {
  return p$4(e2, (typeof t3 === "undefined" ? "undefined" : c$6(t3)) != "symbol" ? t3 + "" : t3, r2), r2;
};
var P$1 = { Accept: "application/json", "Content-Type": "application/json" }, j = "POST", k$2 = { headers: P$1, method: j }, E = function() {
  function e2(t3) {
    r$6(this, e2);
    this.url = t3;
    b$4(this, "events", new O());
    b$4(this, "isAvailable", false);
    b$4(this, "registering", false);
    if (!ea$2(t3))
      throw new Error("Provided URL is not compatible with HTTP connection: ".concat(t3));
    this.url = t3;
  }
  i$6(e2, [{ key: "connected", get: function e3() {
    return this.isAvailable;
  } }, { key: "connecting", get: function e3() {
    return this.registering;
  } }, { key: "open", value: function e3() {
    var e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.url;
    var r2 = this;
    return t$6(function() {
      return l$5(this, function(t3) {
        switch (t3.label) {
          case 0:
            return [4, r2.register(e4)];
          case 1:
            t3.sent();
            return [2];
        }
      });
    })();
  } }, { key: "close", value: function e3() {
    var e4 = this;
    return t$6(function() {
      return l$5(this, function(t3) {
        if (!e4.isAvailable)
          throw new Error("Connection already closed");
        e4.onClose();
        return [2];
      });
    })();
  } }, { key: "request", value: function e3(e3) {
    var r2 = this;
    return t$6(function() {
      var t3, n11, i2, o2, u2;
      return l$5(this, function(c2) {
        switch (c2.label) {
          case 0:
            rm.debug("HttpClient ~ request ~ payload:", e3);
            t3 = r2.isAvailable;
            if (t3)
              return [3, 2];
            return [4, r2.register()];
          case 1:
            t3 = c2.sent();
            c2.label = 2;
          case 2:
            c2.label = 3;
          case 3:
            c2.trys.push([3, 6, , 7]);
            n11 = ed$1(e3);
            return [4, m(r2.url, a$6(s$6({}, k$2), { body: n11 }))];
          case 4:
            return [4, c2.sent().json()];
          case 5:
            i2 = c2.sent(), o2 = typeof i2 == "string" ? ep(i2) : i2;
            return [2, (rm.debug("HttpClient ~ request ~ result:", o2), o2)];
          case 6:
            u2 = c2.sent();
            return [2, r2.formatError(e3.id, u2)];
          case 7:
            return [2];
        }
      });
    })();
  } }, { key: "formatError", value: function e3(e3, t3) {
    var r2 = this.parseError(t3), n11 = r2.message || r2.toString();
    return Q$2(e3, n11);
  } }, { key: "register", value: function e3() {
    var e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.url;
    var r2 = this;
    return t$6(function() {
      var t3, n11, i2;
      return l$5(this, function(o2) {
        switch (o2.label) {
          case 0:
            if (!ea$2(e4))
              throw new Error("Provided URL is not compatible with HTTP connection: ".concat(e4));
            if (r2.registering)
              return [2, new Promise(function(e5, t4) {
                r2.events.once("register_error", function(e6) {
                  t4(e6);
                }), r2.events.once("open", function() {
                  if (c$6(r2.isAvailable) > "u")
                    return t4(new Error("HTTP connection is missing or invalid"));
                  e5();
                });
              })];
            r2.url = e4, r2.registering = true;
            o2.label = 1;
          case 1:
            o2.trys.push([1, 3, , 4]);
            t3 = ed$1({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
            return [4, m(e4, a$6(s$6({}, k$2), { body: t3 }))];
          case 2:
            o2.sent(), r2.onOpen();
            return [3, 4];
          case 3:
            n11 = o2.sent();
            i2 = r2.parseError(n11);
            throw r2.events.emit("register_error", i2), r2.onClose(), i2;
          case 4:
            return [2];
        }
      });
    })();
  } }, { key: "onOpen", value: function e3() {
    this.isAvailable = true, this.registering = false, this.events.emit("open");
  } }, { key: "onClose", value: function e3() {
    this.isAvailable = false, this.registering = false, this.events.emit("open");
  } }, { key: "parseError", value: function e3(e3) {
    var t3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.url;
    return z$1(e3, t3, "HTTP");
  } }]);
  return e2;
}();
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */
var qrcodegen;
((qrcodegen2) => {
  const _QrCode = class {
    constructor(version2, errorCorrectionLevel, dataCodewords, msk) {
      this.version = version2;
      this.errorCorrectionLevel = errorCorrectionLevel;
      this.modules = [];
      this.isFunction = [];
      if (version2 < _QrCode.MIN_VERSION || version2 > _QrCode.MAX_VERSION)
        throw new RangeError("Version value out of range");
      if (msk < -1 || msk > 7)
        throw new RangeError("Mask value out of range");
      this.size = version2 * 4 + 17;
      let row = [];
      for (let i2 = 0; i2 < this.size; i2++)
        row.push(false);
      for (let i2 = 0; i2 < this.size; i2++) {
        this.modules.push(row.slice());
        this.isFunction.push(row.slice());
      }
      this.drawFunctionPatterns();
      const allCodewords = this.addEccAndInterleave(dataCodewords);
      this.drawCodewords(allCodewords);
      if (msk == -1) {
        let minPenalty = 1e9;
        for (let i2 = 0; i2 < 8; i2++) {
          this.applyMask(i2);
          this.drawFormatBits(i2);
          const penalty = this.getPenaltyScore();
          if (penalty < minPenalty) {
            msk = i2;
            minPenalty = penalty;
          }
          this.applyMask(i2);
        }
      }
      assert(0 <= msk && msk <= 7);
      this.mask = msk;
      this.applyMask(msk);
      this.drawFormatBits(msk);
      this.isFunction = [];
    }
    static encodeText(text, ecl) {
      const segs = qrcodegen2.QrSegment.makeSegments(text);
      return _QrCode.encodeSegments(segs, ecl);
    }
    static encodeBinary(data, ecl) {
      const seg = qrcodegen2.QrSegment.makeBytes(data);
      return _QrCode.encodeSegments([seg], ecl);
    }
    static encodeSegments(segs, ecl, minVersion = 1, maxVersion = 40, mask = -1, boostEcl = true) {
      if (!(_QrCode.MIN_VERSION <= minVersion && minVersion <= maxVersion && maxVersion <= _QrCode.MAX_VERSION) || mask < -1 || mask > 7)
        throw new RangeError("Invalid value");
      let version2;
      let dataUsedBits;
      for (version2 = minVersion; ; version2++) {
        const dataCapacityBits2 = _QrCode.getNumDataCodewords(version2, ecl) * 8;
        const usedBits = QrSegment.getTotalBits(segs, version2);
        if (usedBits <= dataCapacityBits2) {
          dataUsedBits = usedBits;
          break;
        }
        if (version2 >= maxVersion)
          throw new RangeError("Data too long");
      }
      for (const newEcl of [_QrCode.Ecc.MEDIUM, _QrCode.Ecc.QUARTILE, _QrCode.Ecc.HIGH]) {
        if (boostEcl && dataUsedBits <= _QrCode.getNumDataCodewords(version2, newEcl) * 8)
          ecl = newEcl;
      }
      let bb = [];
      for (const seg of segs) {
        appendBits(seg.mode.modeBits, 4, bb);
        appendBits(seg.numChars, seg.mode.numCharCountBits(version2), bb);
        for (const b2 of seg.getData())
          bb.push(b2);
      }
      assert(bb.length == dataUsedBits);
      const dataCapacityBits = _QrCode.getNumDataCodewords(version2, ecl) * 8;
      assert(bb.length <= dataCapacityBits);
      appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
      appendBits(0, (8 - bb.length % 8) % 8, bb);
      assert(bb.length % 8 == 0);
      for (let padByte = 236; bb.length < dataCapacityBits; padByte ^= 236 ^ 17)
        appendBits(padByte, 8, bb);
      let dataCodewords = [];
      while (dataCodewords.length * 8 < bb.length)
        dataCodewords.push(0);
      bb.forEach((b2, i2) => dataCodewords[i2 >>> 3] |= b2 << 7 - (i2 & 7));
      return new _QrCode(version2, ecl, dataCodewords, mask);
    }
    getModule(x, y2) {
      return 0 <= x && x < this.size && 0 <= y2 && y2 < this.size && this.modules[y2][x];
    }
    getModules() {
      return this.modules;
    }
    drawFunctionPatterns() {
      for (let i2 = 0; i2 < this.size; i2++) {
        this.setFunctionModule(6, i2, i2 % 2 == 0);
        this.setFunctionModule(i2, 6, i2 % 2 == 0);
      }
      this.drawFinderPattern(3, 3);
      this.drawFinderPattern(this.size - 4, 3);
      this.drawFinderPattern(3, this.size - 4);
      const alignPatPos = this.getAlignmentPatternPositions();
      const numAlign = alignPatPos.length;
      for (let i2 = 0; i2 < numAlign; i2++) {
        for (let j2 = 0; j2 < numAlign; j2++) {
          if (!(i2 == 0 && j2 == 0 || i2 == 0 && j2 == numAlign - 1 || i2 == numAlign - 1 && j2 == 0))
            this.drawAlignmentPattern(alignPatPos[i2], alignPatPos[j2]);
        }
      }
      this.drawFormatBits(0);
      this.drawVersion();
    }
    drawFormatBits(mask) {
      const data = this.errorCorrectionLevel.formatBits << 3 | mask;
      let rem = data;
      for (let i2 = 0; i2 < 10; i2++)
        rem = rem << 1 ^ (rem >>> 9) * 1335;
      const bits = (data << 10 | rem) ^ 21522;
      assert(bits >>> 15 == 0);
      for (let i2 = 0; i2 <= 5; i2++)
        this.setFunctionModule(8, i2, getBit(bits, i2));
      this.setFunctionModule(8, 7, getBit(bits, 6));
      this.setFunctionModule(8, 8, getBit(bits, 7));
      this.setFunctionModule(7, 8, getBit(bits, 8));
      for (let i2 = 9; i2 < 15; i2++)
        this.setFunctionModule(14 - i2, 8, getBit(bits, i2));
      for (let i2 = 0; i2 < 8; i2++)
        this.setFunctionModule(this.size - 1 - i2, 8, getBit(bits, i2));
      for (let i2 = 8; i2 < 15; i2++)
        this.setFunctionModule(8, this.size - 15 + i2, getBit(bits, i2));
      this.setFunctionModule(8, this.size - 8, true);
    }
    drawVersion() {
      if (this.version < 7)
        return;
      let rem = this.version;
      for (let i2 = 0; i2 < 12; i2++)
        rem = rem << 1 ^ (rem >>> 11) * 7973;
      const bits = this.version << 12 | rem;
      assert(bits >>> 18 == 0);
      for (let i2 = 0; i2 < 18; i2++) {
        const color = getBit(bits, i2);
        const a2 = this.size - 11 + i2 % 3;
        const b2 = Math.floor(i2 / 3);
        this.setFunctionModule(a2, b2, color);
        this.setFunctionModule(b2, a2, color);
      }
    }
    drawFinderPattern(x, y2) {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const dist = Math.max(Math.abs(dx), Math.abs(dy));
          const xx = x + dx;
          const yy = y2 + dy;
          if (0 <= xx && xx < this.size && 0 <= yy && yy < this.size)
            this.setFunctionModule(xx, yy, dist != 2 && dist != 4);
        }
      }
    }
    drawAlignmentPattern(x, y2) {
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++)
          this.setFunctionModule(x + dx, y2 + dy, Math.max(Math.abs(dx), Math.abs(dy)) != 1);
      }
    }
    setFunctionModule(x, y2, isDark) {
      this.modules[y2][x] = isDark;
      this.isFunction[y2][x] = true;
    }
    addEccAndInterleave(data) {
      const ver = this.version;
      const ecl = this.errorCorrectionLevel;
      if (data.length != _QrCode.getNumDataCodewords(ver, ecl))
        throw new RangeError("Invalid argument");
      const numBlocks = _QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
      const blockEccLen = _QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver];
      const rawCodewords = Math.floor(_QrCode.getNumRawDataModules(ver) / 8);
      const numShortBlocks = numBlocks - rawCodewords % numBlocks;
      const shortBlockLen = Math.floor(rawCodewords / numBlocks);
      let blocks = [];
      const rsDiv = _QrCode.reedSolomonComputeDivisor(blockEccLen);
      for (let i2 = 0, k2 = 0; i2 < numBlocks; i2++) {
        let dat = data.slice(k2, k2 + shortBlockLen - blockEccLen + (i2 < numShortBlocks ? 0 : 1));
        k2 += dat.length;
        const ecc = _QrCode.reedSolomonComputeRemainder(dat, rsDiv);
        if (i2 < numShortBlocks)
          dat.push(0);
        blocks.push(dat.concat(ecc));
      }
      let result = [];
      for (let i2 = 0; i2 < blocks[0].length; i2++) {
        blocks.forEach((block, j2) => {
          if (i2 != shortBlockLen - blockEccLen || j2 >= numShortBlocks)
            result.push(block[i2]);
        });
      }
      assert(result.length == rawCodewords);
      return result;
    }
    drawCodewords(data) {
      if (data.length != Math.floor(_QrCode.getNumRawDataModules(this.version) / 8))
        throw new RangeError("Invalid argument");
      let i2 = 0;
      for (let right = this.size - 1; right >= 1; right -= 2) {
        if (right == 6)
          right = 5;
        for (let vert = 0; vert < this.size; vert++) {
          for (let j2 = 0; j2 < 2; j2++) {
            const x = right - j2;
            const upward = (right + 1 & 2) == 0;
            const y2 = upward ? this.size - 1 - vert : vert;
            if (!this.isFunction[y2][x] && i2 < data.length * 8) {
              this.modules[y2][x] = getBit(data[i2 >>> 3], 7 - (i2 & 7));
              i2++;
            }
          }
        }
      }
      assert(i2 == data.length * 8);
    }
    applyMask(mask) {
      if (mask < 0 || mask > 7)
        throw new RangeError("Mask value out of range");
      for (let y2 = 0; y2 < this.size; y2++) {
        for (let x = 0; x < this.size; x++) {
          let invert;
          switch (mask) {
            case 0:
              invert = (x + y2) % 2 == 0;
              break;
            case 1:
              invert = y2 % 2 == 0;
              break;
            case 2:
              invert = x % 3 == 0;
              break;
            case 3:
              invert = (x + y2) % 3 == 0;
              break;
            case 4:
              invert = (Math.floor(x / 3) + Math.floor(y2 / 2)) % 2 == 0;
              break;
            case 5:
              invert = x * y2 % 2 + x * y2 % 3 == 0;
              break;
            case 6:
              invert = (x * y2 % 2 + x * y2 % 3) % 2 == 0;
              break;
            case 7:
              invert = ((x + y2) % 2 + x * y2 % 3) % 2 == 0;
              break;
            default:
              throw new Error("Unreachable");
          }
          if (!this.isFunction[y2][x] && invert)
            this.modules[y2][x] = !this.modules[y2][x];
        }
      }
    }
    getPenaltyScore() {
      let result = 0;
      for (let y2 = 0; y2 < this.size; y2++) {
        let runColor = false;
        let runX = 0;
        let runHistory = [0, 0, 0, 0, 0, 0, 0];
        for (let x = 0; x < this.size; x++) {
          if (this.modules[y2][x] == runColor) {
            runX++;
            if (runX == 5)
              result += _QrCode.PENALTY_N1;
            else if (runX > 5)
              result++;
          } else {
            this.finderPenaltyAddHistory(runX, runHistory);
            if (!runColor)
              result += this.finderPenaltyCountPatterns(runHistory) * _QrCode.PENALTY_N3;
            runColor = this.modules[y2][x];
            runX = 1;
          }
        }
        result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * _QrCode.PENALTY_N3;
      }
      for (let x = 0; x < this.size; x++) {
        let runColor = false;
        let runY = 0;
        let runHistory = [0, 0, 0, 0, 0, 0, 0];
        for (let y2 = 0; y2 < this.size; y2++) {
          if (this.modules[y2][x] == runColor) {
            runY++;
            if (runY == 5)
              result += _QrCode.PENALTY_N1;
            else if (runY > 5)
              result++;
          } else {
            this.finderPenaltyAddHistory(runY, runHistory);
            if (!runColor)
              result += this.finderPenaltyCountPatterns(runHistory) * _QrCode.PENALTY_N3;
            runColor = this.modules[y2][x];
            runY = 1;
          }
        }
        result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * _QrCode.PENALTY_N3;
      }
      for (let y2 = 0; y2 < this.size - 1; y2++) {
        for (let x = 0; x < this.size - 1; x++) {
          const color = this.modules[y2][x];
          if (color == this.modules[y2][x + 1] && color == this.modules[y2 + 1][x] && color == this.modules[y2 + 1][x + 1])
            result += _QrCode.PENALTY_N2;
        }
      }
      let dark = 0;
      for (const row of this.modules)
        dark = row.reduce((sum, color) => sum + (color ? 1 : 0), dark);
      const total = this.size * this.size;
      const k2 = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
      assert(0 <= k2 && k2 <= 9);
      result += k2 * _QrCode.PENALTY_N4;
      assert(0 <= result && result <= 2568888);
      return result;
    }
    getAlignmentPatternPositions() {
      if (this.version == 1)
        return [];
      else {
        const numAlign = Math.floor(this.version / 7) + 2;
        const step = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (numAlign * 2 - 2)) * 2;
        let result = [6];
        for (let pos = this.size - 7; result.length < numAlign; pos -= step)
          result.splice(1, 0, pos);
        return result;
      }
    }
    static getNumRawDataModules(ver) {
      if (ver < _QrCode.MIN_VERSION || ver > _QrCode.MAX_VERSION)
        throw new RangeError("Version number out of range");
      let result = (16 * ver + 128) * ver + 64;
      if (ver >= 2) {
        const numAlign = Math.floor(ver / 7) + 2;
        result -= (25 * numAlign - 10) * numAlign - 55;
        if (ver >= 7)
          result -= 36;
      }
      assert(208 <= result && result <= 29648);
      return result;
    }
    static getNumDataCodewords(ver, ecl) {
      return Math.floor(_QrCode.getNumRawDataModules(ver) / 8) - _QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver] * _QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
    }
    static reedSolomonComputeDivisor(degree) {
      if (degree < 1 || degree > 255)
        throw new RangeError("Degree out of range");
      let result = [];
      for (let i2 = 0; i2 < degree - 1; i2++)
        result.push(0);
      result.push(1);
      let root = 1;
      for (let i2 = 0; i2 < degree; i2++) {
        for (let j2 = 0; j2 < result.length; j2++) {
          result[j2] = _QrCode.reedSolomonMultiply(result[j2], root);
          if (j2 + 1 < result.length)
            result[j2] ^= result[j2 + 1];
        }
        root = _QrCode.reedSolomonMultiply(root, 2);
      }
      return result;
    }
    static reedSolomonComputeRemainder(data, divisor) {
      let result = divisor.map((_2) => 0);
      for (const b2 of data) {
        const factor = b2 ^ result.shift();
        result.push(0);
        divisor.forEach((coef, i2) => result[i2] ^= _QrCode.reedSolomonMultiply(coef, factor));
      }
      return result;
    }
    static reedSolomonMultiply(x, y2) {
      if (x >>> 8 != 0 || y2 >>> 8 != 0)
        throw new RangeError("Byte out of range");
      let z2 = 0;
      for (let i2 = 7; i2 >= 0; i2--) {
        z2 = z2 << 1 ^ (z2 >>> 7) * 285;
        z2 ^= (y2 >>> i2 & 1) * x;
      }
      assert(z2 >>> 8 == 0);
      return z2;
    }
    finderPenaltyCountPatterns(runHistory) {
      const n11 = runHistory[1];
      assert(n11 <= this.size * 3);
      const core = n11 > 0 && runHistory[2] == n11 && runHistory[3] == n11 * 3 && runHistory[4] == n11 && runHistory[5] == n11;
      return (core && runHistory[0] >= n11 * 4 && runHistory[6] >= n11 ? 1 : 0) + (core && runHistory[6] >= n11 * 4 && runHistory[0] >= n11 ? 1 : 0);
    }
    finderPenaltyTerminateAndCount(currentRunColor, currentRunLength, runHistory) {
      if (currentRunColor) {
        this.finderPenaltyAddHistory(currentRunLength, runHistory);
        currentRunLength = 0;
      }
      currentRunLength += this.size;
      this.finderPenaltyAddHistory(currentRunLength, runHistory);
      return this.finderPenaltyCountPatterns(runHistory);
    }
    finderPenaltyAddHistory(currentRunLength, runHistory) {
      if (runHistory[0] == 0)
        currentRunLength += this.size;
      runHistory.pop();
      runHistory.unshift(currentRunLength);
    }
  };
  let QrCode = _QrCode;
  QrCode.MIN_VERSION = 1;
  QrCode.MAX_VERSION = 40;
  QrCode.PENALTY_N1 = 3;
  QrCode.PENALTY_N2 = 3;
  QrCode.PENALTY_N3 = 40;
  QrCode.PENALTY_N4 = 10;
  QrCode.ECC_CODEWORDS_PER_BLOCK = [
    [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
  ];
  QrCode.NUM_ERROR_CORRECTION_BLOCKS = [
    [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
    [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
    [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
  ];
  qrcodegen2.QrCode = QrCode;
  function appendBits(val, len, bb) {
    if (len < 0 || len > 31 || val >>> len != 0)
      throw new RangeError("Value out of range");
    for (let i2 = len - 1; i2 >= 0; i2--)
      bb.push(val >>> i2 & 1);
  }
  function getBit(x, i2) {
    return (x >>> i2 & 1) != 0;
  }
  function assert(cond) {
    if (!cond)
      throw new Error("Assertion error");
  }
  const _QrSegment = class {
    constructor(mode, numChars, bitData) {
      this.mode = mode;
      this.numChars = numChars;
      this.bitData = bitData;
      if (numChars < 0)
        throw new RangeError("Invalid argument");
      this.bitData = bitData.slice();
    }
    static makeBytes(data) {
      let bb = [];
      for (const b2 of data)
        appendBits(b2, 8, bb);
      return new _QrSegment(_QrSegment.Mode.BYTE, data.length, bb);
    }
    static makeNumeric(digits) {
      if (!_QrSegment.isNumeric(digits))
        throw new RangeError("String contains non-numeric characters");
      let bb = [];
      for (let i2 = 0; i2 < digits.length; ) {
        const n11 = Math.min(digits.length - i2, 3);
        appendBits(parseInt(digits.substr(i2, n11), 10), n11 * 3 + 1, bb);
        i2 += n11;
      }
      return new _QrSegment(_QrSegment.Mode.NUMERIC, digits.length, bb);
    }
    static makeAlphanumeric(text) {
      if (!_QrSegment.isAlphanumeric(text))
        throw new RangeError("String contains unencodable characters in alphanumeric mode");
      let bb = [];
      let i2;
      for (i2 = 0; i2 + 2 <= text.length; i2 += 2) {
        let temp = _QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i2)) * 45;
        temp += _QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i2 + 1));
        appendBits(temp, 11, bb);
      }
      if (i2 < text.length)
        appendBits(_QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i2)), 6, bb);
      return new _QrSegment(_QrSegment.Mode.ALPHANUMERIC, text.length, bb);
    }
    static makeSegments(text) {
      if (text == "")
        return [];
      else if (_QrSegment.isNumeric(text))
        return [_QrSegment.makeNumeric(text)];
      else if (_QrSegment.isAlphanumeric(text))
        return [_QrSegment.makeAlphanumeric(text)];
      else
        return [_QrSegment.makeBytes(_QrSegment.toUtf8ByteArray(text))];
    }
    static makeEci(assignVal) {
      let bb = [];
      if (assignVal < 0)
        throw new RangeError("ECI assignment value out of range");
      else if (assignVal < 1 << 7)
        appendBits(assignVal, 8, bb);
      else if (assignVal < 1 << 14) {
        appendBits(2, 2, bb);
        appendBits(assignVal, 14, bb);
      } else if (assignVal < 1e6) {
        appendBits(6, 3, bb);
        appendBits(assignVal, 21, bb);
      } else
        throw new RangeError("ECI assignment value out of range");
      return new _QrSegment(_QrSegment.Mode.ECI, 0, bb);
    }
    static isNumeric(text) {
      return _QrSegment.NUMERIC_REGEX.test(text);
    }
    static isAlphanumeric(text) {
      return _QrSegment.ALPHANUMERIC_REGEX.test(text);
    }
    getData() {
      return this.bitData.slice();
    }
    static getTotalBits(segs, version2) {
      let result = 0;
      for (const seg of segs) {
        const ccbits = seg.mode.numCharCountBits(version2);
        if (seg.numChars >= 1 << ccbits)
          return Infinity;
        result += 4 + ccbits + seg.bitData.length;
      }
      return result;
    }
    static toUtf8ByteArray(str) {
      str = encodeURI(str);
      let result = [];
      for (let i2 = 0; i2 < str.length; i2++) {
        if (str.charAt(i2) != "%")
          result.push(str.charCodeAt(i2));
        else {
          result.push(parseInt(str.substr(i2 + 1, 2), 16));
          i2 += 2;
        }
      }
      return result;
    }
  };
  let QrSegment = _QrSegment;
  QrSegment.NUMERIC_REGEX = /^[0-9]*$/;
  QrSegment.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/;
  QrSegment.ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
  qrcodegen2.QrSegment = QrSegment;
})(qrcodegen || (qrcodegen = {}));
((qrcodegen2) => {
  ((QrCode2) => {
    const _Ecc = class {
      constructor(ordinal, formatBits) {
        this.ordinal = ordinal;
        this.formatBits = formatBits;
      }
    };
    let Ecc = _Ecc;
    Ecc.LOW = new _Ecc(0, 1);
    Ecc.MEDIUM = new _Ecc(1, 0);
    Ecc.QUARTILE = new _Ecc(2, 3);
    Ecc.HIGH = new _Ecc(3, 2);
    QrCode2.Ecc = Ecc;
  })(qrcodegen2.QrCode || (qrcodegen2.QrCode = {}));
})(qrcodegen || (qrcodegen = {}));
((qrcodegen2) => {
  ((QrSegment2) => {
    const _Mode = class {
      constructor(modeBits, numBitsCharCount) {
        this.modeBits = modeBits;
        this.numBitsCharCount = numBitsCharCount;
      }
      numCharCountBits(ver) {
        return this.numBitsCharCount[Math.floor((ver + 7) / 17)];
      }
    };
    let Mode = _Mode;
    Mode.NUMERIC = new _Mode(1, [10, 12, 14]);
    Mode.ALPHANUMERIC = new _Mode(2, [9, 11, 13]);
    Mode.BYTE = new _Mode(4, [8, 16, 16]);
    Mode.KANJI = new _Mode(8, [8, 10, 12]);
    Mode.ECI = new _Mode(7, [0, 0, 0]);
    QrSegment2.Mode = Mode;
  })(qrcodegen2.QrSegment || (qrcodegen2.QrSegment = {}));
})(qrcodegen || (qrcodegen = {}));
var qrcodegen_default = qrcodegen;
/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */
var ERROR_LEVEL_MAP = {
  L: qrcodegen_default.QrCode.Ecc.LOW,
  M: qrcodegen_default.QrCode.Ecc.MEDIUM,
  Q: qrcodegen_default.QrCode.Ecc.QUARTILE,
  H: qrcodegen_default.QrCode.Ecc.HIGH
};
var DEFAULT_SIZE = 128;
var DEFAULT_LEVEL = "L";
var DEFAULT_BGCOLOR = "#FFFFFF";
var DEFAULT_FGCOLOR = "#000000";
var DEFAULT_INCLUDEMARGIN = false;
var MARGIN_SIZE = 4;
var DEFAULT_IMG_SCALE = 0.1;
function generatePath(modules, margin = 0) {
  const ops = [];
  modules.forEach(function(row, y2) {
    let start = null;
    row.forEach(function(cell, x) {
      if (!cell && start !== null) {
        ops.push(`M${start + margin} ${y2 + margin}h${x - start}v1H${start + margin}z`);
        start = null;
        return;
      }
      if (x === row.length - 1) {
        if (!cell) {
          return;
        }
        if (start === null) {
          ops.push(`M${x + margin},${y2 + margin} h1v1H${x + margin}z`);
        } else {
          ops.push(`M${start + margin},${y2 + margin} h${x + 1 - start}v1H${start + margin}z`);
        }
        return;
      }
      if (cell && start === null) {
        start = x;
      }
    });
  });
  return ops.join("");
}
function excavateModules(modules, excavation) {
  return modules.slice().map((row, y2) => {
    if (y2 < excavation.y || y2 >= excavation.y + excavation.h) {
      return row;
    }
    return row.map((cell, x) => {
      if (x < excavation.x || x >= excavation.x + excavation.w) {
        return cell;
      }
      return false;
    });
  });
}
function getImageSettings(cells, size, includeMargin, imageSettings) {
  if (imageSettings == null) {
    return null;
  }
  const margin = includeMargin ? MARGIN_SIZE : 0;
  const numCells = cells.length + margin * 2;
  const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE);
  const scale = numCells / size;
  const w = (imageSettings.width || defaultSize) * scale;
  const h2 = (imageSettings.height || defaultSize) * scale;
  const x = imageSettings.x == null ? cells.length / 2 - w / 2 : imageSettings.x * scale;
  const y2 = imageSettings.y == null ? cells.length / 2 - h2 / 2 : imageSettings.y * scale;
  let excavation = null;
  if (imageSettings.excavate) {
    let floorX = Math.floor(x);
    let floorY = Math.floor(y2);
    let ceilW = Math.ceil(w + x - floorX);
    let ceilH = Math.ceil(h2 + y2 - floorY);
    excavation = { x: floorX, y: floorY, w: ceilW, h: ceilH };
  }
  return { x, y: y2, h: h2, w, excavation };
}
(function() {
  try {
    new Path2D().addPath(new Path2D());
  } catch (e2) {
    return false;
  }
  return true;
})();
function QRCodeSVG(props) {
  const _a = props, {
    value,
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    bgColor = DEFAULT_BGCOLOR,
    fgColor = DEFAULT_FGCOLOR,
    includeMargin = DEFAULT_INCLUDEMARGIN,
    imageSettings
  } = _a, otherProps = __objRest(_a, [
    "value",
    "size",
    "level",
    "bgColor",
    "fgColor",
    "includeMargin",
    "imageSettings"
  ]);
  let cells = qrcodegen_default.QrCode.encodeText(value, ERROR_LEVEL_MAP[level]).getModules();
  const margin = includeMargin ? MARGIN_SIZE : 0;
  const numCells = cells.length + margin * 2;
  const calculatedImageSettings = getImageSettings(cells, size, includeMargin, imageSettings);
  let image = null;
  if (imageSettings != null && calculatedImageSettings != null) {
    if (calculatedImageSettings.excavation != null) {
      cells = excavateModules(cells, calculatedImageSettings.excavation);
    }
    image = /* @__PURE__ */ W$1.createElement("image", {
      xlinkHref: imageSettings.src,
      height: calculatedImageSettings.h,
      width: calculatedImageSettings.w,
      x: calculatedImageSettings.x + margin,
      y: calculatedImageSettings.y + margin,
      preserveAspectRatio: "none"
    });
  }
  const fgPath = generatePath(cells, margin);
  return /* @__PURE__ */ W$1.createElement("svg", __spreadValues({
    height: size,
    width: size,
    viewBox: `0 0 ${numCells} ${numCells}`
  }, otherProps), /* @__PURE__ */ W$1.createElement("path", {
    fill: bgColor,
    d: `M0,0 h${numCells}v${numCells}H0z`,
    shapeRendering: "crispEdges"
  }), /* @__PURE__ */ W$1.createElement("path", {
    fill: fgColor,
    d: fgPath,
    shapeRendering: "crispEdges"
  }), image);
}
function n$5(n11, e2) {
  if (e2 == null || e2 > n11.length)
    e2 = n11.length;
  for (var a2 = 0, t3 = new Array(e2); a2 < e2; a2++)
    t3[a2] = n11[a2];
  return t3;
}
function e$5(n11) {
  if (Array.isArray(n11))
    return n11;
}
function a$5(n11, e2, a2, t3, i2, r2, o2) {
  try {
    var d2 = n11[r2](o2);
    var l2 = d2.value;
  } catch (n12) {
    a2(n12);
    return;
  }
  if (d2.done) {
    e2(l2);
  } else {
    Promise.resolve(l2).then(t3, i2);
  }
}
function t$5(n11) {
  return function() {
    var e2 = this, t3 = arguments;
    return new Promise(function(i2, r2) {
      var o2 = n11.apply(e2, t3);
      function d2(n12) {
        a$5(o2, i2, r2, d2, l2, "next", n12);
      }
      function l2(n12) {
        a$5(o2, i2, r2, d2, l2, "throw", n12);
      }
      d2(void 0);
    });
  };
}
function i$5(n11, e2, a2) {
  if (e2 in n11) {
    Object.defineProperty(n11, e2, { value: a2, enumerable: true, configurable: true, writable: true });
  } else {
    n11[e2] = a2;
  }
  return n11;
}
function r$5(n11, e2) {
  var a2 = n11 == null ? null : typeof Symbol !== "undefined" && n11[Symbol.iterator] || n11["@@iterator"];
  if (a2 == null)
    return;
  var t3 = [];
  var i2 = true;
  var r2 = false;
  var o2, d2;
  try {
    for (a2 = a2.call(n11); !(i2 = (o2 = a2.next()).done); i2 = true) {
      t3.push(o2.value);
      if (e2 && t3.length === e2)
        break;
    }
  } catch (n12) {
    r2 = true;
    d2 = n12;
  } finally {
    try {
      if (!i2 && a2["return"] != null)
        a2["return"]();
    } finally {
      if (r2)
        throw d2;
    }
  }
  return t3;
}
function o$5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function d$2(n11) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var a2 = arguments[e2] != null ? arguments[e2] : {};
    var t3 = Object.keys(a2);
    if (typeof Object.getOwnPropertySymbols === "function") {
      t3 = t3.concat(Object.getOwnPropertySymbols(a2).filter(function(n12) {
        return Object.getOwnPropertyDescriptor(a2, n12).enumerable;
      }));
    }
    t3.forEach(function(e3) {
      i$5(n11, e3, a2[e3]);
    });
  }
  return n11;
}
function l$4(n11, e2) {
  if (n11 == null)
    return {};
  var a2 = c$5(n11, e2);
  var t3, i2;
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(n11);
    for (i2 = 0; i2 < r2.length; i2++) {
      t3 = r2[i2];
      if (e2.indexOf(t3) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(n11, t3))
        continue;
      a2[t3] = n11[t3];
    }
  }
  return a2;
}
function c$5(n11, e2) {
  if (n11 == null)
    return {};
  var a2 = {};
  var t3 = Object.keys(n11);
  var i2, r2;
  for (r2 = 0; r2 < t3.length; r2++) {
    i2 = t3[r2];
    if (e2.indexOf(i2) >= 0)
      continue;
    a2[i2] = n11[i2];
  }
  return a2;
}
function s$5(n11, a2) {
  return e$5(n11) || r$5(n11, a2) || p$3(n11, a2) || o$5();
}
function p$3(e2, a2) {
  if (!e2)
    return;
  if (typeof e2 === "string")
    return n$5(e2, a2);
  var t3 = Object.prototype.toString.call(e2).slice(8, -1);
  if (t3 === "Object" && e2.constructor)
    t3 = e2.constructor.name;
  if (t3 === "Map" || t3 === "Set")
    return Array.from(t3);
  if (t3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t3))
    return n$5(e2, a2);
}
function u$5(n11, e2) {
  var a2, t3, i2, r2, o2 = { label: 0, sent: function() {
    if (i2[0] & 1)
      throw i2[1];
    return i2[1];
  }, trys: [], ops: [] };
  return r2 = { next: d2(0), "throw": d2(1), "return": d2(2) }, typeof Symbol === "function" && (r2[Symbol.iterator] = function() {
    return this;
  }), r2;
  function d2(n12) {
    return function(e3) {
      return l2([n12, e3]);
    };
  }
  function l2(r3) {
    if (a2)
      throw new TypeError("Generator is already executing.");
    while (o2)
      try {
        if (a2 = 1, t3 && (i2 = r3[0] & 2 ? t3["return"] : r3[0] ? t3["throw"] || ((i2 = t3["return"]) && i2.call(t3), 0) : t3.next) && !(i2 = i2.call(t3, r3[1])).done)
          return i2;
        if (t3 = 0, i2)
          r3 = [r3[0] & 2, i2.value];
        switch (r3[0]) {
          case 0:
          case 1:
            i2 = r3;
            break;
          case 4:
            o2.label++;
            return { value: r3[1], done: false };
          case 5:
            o2.label++;
            t3 = r3[1];
            r3 = [0];
            continue;
          case 7:
            r3 = o2.ops.pop();
            o2.trys.pop();
            continue;
          default:
            if (!(i2 = o2.trys, i2 = i2.length > 0 && i2[i2.length - 1]) && (r3[0] === 6 || r3[0] === 2)) {
              o2 = 0;
              continue;
            }
            if (r3[0] === 3 && (!i2 || r3[1] > i2[0] && r3[1] < i2[3])) {
              o2.label = r3[1];
              break;
            }
            if (r3[0] === 6 && o2.label < i2[1]) {
              o2.label = i2[1];
              i2 = r3;
              break;
            }
            if (i2 && o2.label < i2[2]) {
              o2.label = i2[2];
              o2.ops.push(r3);
              break;
            }
            if (i2[2])
              o2.ops.pop();
            o2.trys.pop();
            continue;
        }
        r3 = e2.call(n11, o2);
      } catch (n12) {
        r3 = [6, n12];
        t3 = 0;
      } finally {
        a2 = i2 = 0;
      }
    if (r3[0] & 5)
      throw r3[1];
    return { value: r3[0] ? r3[1] : void 0, done: true };
  }
}
var f$4 = "#binanceW3W-wrapper :is(.pointer-events-auto) {\n  pointer-events: auto;\n}\n\n#binanceW3W-wrapper :is(.fixed) {\n  position: fixed;\n}\n\n#binanceW3W-wrapper :is(.absolute) {\n  position: absolute;\n}\n\n#binanceW3W-wrapper :is(.relative) {\n  position: relative;\n}\n\n#binanceW3W-wrapper :is(.bottom-0) {\n  bottom: 0px;\n}\n\n#binanceW3W-wrapper :is(.left-0) {\n  left: 0px;\n}\n\n#binanceW3W-wrapper :is(.top-0) {\n  top: 0px;\n}\n\n#binanceW3W-wrapper :is(.m-auto) {\n  margin: auto;\n}\n\n#binanceW3W-wrapper :is(.mx-\\[4px\\]) {\n  margin-left: 4px;\n  margin-right: 4px;\n}\n\n#binanceW3W-wrapper :is(.mb-4) {\n  margin-bottom: 1rem;\n}\n\n#binanceW3W-wrapper :is(.mb-6) {\n  margin-bottom: 1.5rem;\n}\n\n#binanceW3W-wrapper :is(.ml-1) {\n  margin-left: 0.25rem;\n}\n\n#binanceW3W-wrapper :is(.mt-6) {\n  margin-top: 1.5rem;\n}\n\n#binanceW3W-wrapper :is(.mt-\\[35px\\]) {\n  margin-top: 35px;\n}\n\n#binanceW3W-wrapper :is(.flex) {\n  display: flex;\n}\n\n#binanceW3W-wrapper :is(.grid) {\n  display: grid;\n}\n\n#binanceW3W-wrapper :is(.h-\\[200px\\]) {\n  height: 200px;\n}\n\n#binanceW3W-wrapper :is(.h-\\[24px\\]) {\n  height: 24px;\n}\n\n#binanceW3W-wrapper :is(.h-\\[40px\\]) {\n  height: 40px;\n}\n\n#binanceW3W-wrapper :is(.h-\\[52px\\]) {\n  height: 52px;\n}\n\n#binanceW3W-wrapper :is(.h-full) {\n  height: 100%;\n}\n\n#binanceW3W-wrapper :is(.w-\\[150px\\]) {\n  width: 150px;\n}\n\n#binanceW3W-wrapper :is(.w-\\[200px\\]) {\n  width: 200px;\n}\n\n#binanceW3W-wrapper :is(.w-\\[20px\\]) {\n  width: 20px;\n}\n\n#binanceW3W-wrapper :is(.w-\\[24px\\]) {\n  width: 24px;\n}\n\n#binanceW3W-wrapper :is(.w-\\[343px\\]) {\n  width: 343px;\n}\n\n#binanceW3W-wrapper :is(.w-\\[60px\\]) {\n  width: 60px;\n}\n\n#binanceW3W-wrapper :is(.w-\\[75px\\]) {\n  width: 75px;\n}\n\n#binanceW3W-wrapper :is(.w-full) {\n  width: 100%;\n}\n\n#binanceW3W-wrapper :is(.transform) {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n#binanceW3W-wrapper :is(.cursor-pointer) {\n  cursor: pointer;\n}\n\n#binanceW3W-wrapper :is(.grid-flow-col) {\n  grid-auto-flow: column;\n}\n\n#binanceW3W-wrapper :is(.grid-cols-2) {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n#binanceW3W-wrapper :is(.items-center) {\n  align-items: center;\n}\n\n#binanceW3W-wrapper :is(.justify-end) {\n  justify-content: flex-end;\n}\n\n#binanceW3W-wrapper :is(.justify-center) {\n  justify-content: center;\n}\n\n#binanceW3W-wrapper :is(.justify-between) {\n  justify-content: space-between;\n}\n\n#binanceW3W-wrapper :is(.gap-x-4) {\n  -moz-column-gap: 1rem;\n       column-gap: 1rem;\n}\n\n#binanceW3W-wrapper :is(.gap-y-2) {\n  row-gap: 0.5rem;\n}\n\n#binanceW3W-wrapper :is(.rounded) {\n  border-radius: 0.25rem;\n}\n\n#binanceW3W-wrapper :is(.rounded-2xl) {\n  border-radius: 1rem;\n}\n\n#binanceW3W-wrapper :is(.rounded-lg) {\n  border-radius: 0.5rem;\n}\n\n#binanceW3W-wrapper :is(.rounded-t-2xl) {\n  border-top-left-radius: 1rem;\n  border-top-right-radius: 1rem;\n}\n\n#binanceW3W-wrapper :is(.border) {\n  border-width: 1px;\n}\n\n#binanceW3W-wrapper :is(.border-b) {\n  border-bottom-width: 1px;\n}\n\n#binanceW3W-wrapper :is(.border-gray-300) {\n  --tw-border-opacity: 1;\n  border-color: rgb(209 213 219 / var(--tw-border-opacity));\n}\n\n#binanceW3W-wrapper :is(.bg-black\\/\\[\\.80\\]) {\n  background-color: rgb(0 0 0 / .80);\n}\n\n#binanceW3W-wrapper :is(.bg-white) {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n}\n\n#binanceW3W-wrapper :is(.p-\\[12px\\]) {\n  padding: 12px;\n}\n\n#binanceW3W-wrapper :is(.px-4) {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n#binanceW3W-wrapper :is(.px-6) {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n\n#binanceW3W-wrapper :is(.py-3) {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n\n#binanceW3W-wrapper :is(.py-4) {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n\n#binanceW3W-wrapper :is(.pb-6) {\n  padding-bottom: 1.5rem;\n}\n\n#binanceW3W-wrapper :is(.pt-\\[20px\\]) {\n  padding-top: 20px;\n}\n\n#binanceW3W-wrapper :is(.text-center) {\n  text-align: center;\n}\n\n#binanceW3W-wrapper :is(.text-base) {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n\n#binanceW3W-wrapper :is(.font-medium) {\n  font-weight: 500;\n}\n\n#binanceW3W-wrapper :is(.text-\\[\\#1E2329\\]) {\n  --tw-text-opacity: 1;\n  color: rgb(30 35 41 / var(--tw-text-opacity));\n}\n\n#binanceW3W-wrapper :is(.text-\\[\\#929AA5\\]) {\n  --tw-text-opacity: 1;\n  color: rgb(146 154 165 / var(--tw-text-opacity));\n}\n\n#binanceW3W-wrapper :is(.shadow-inner) {\n  --tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n#binanceW3W-wrapper :is(.duration-300) {\n  transition-duration: 300ms;\n}\n\n#binanceW3W-wrapper :is(.ease-in-out) {\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n#binanceW3W-wrapper :is(.will-change-auto) {\n  will-change: auto;\n}\n\n#binanceW3W-wrapper :is(.will-change-transform) {\n  will-change: transform;\n}\n\n.w3w-body3 {\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 20px;\n}\n\n.w3w-subtitle1 {\n  font-size: 20px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 28px;\n}\n\n.w3w-subtitle3 {\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 24px;\n  /* 150% */\n}\n\n.w3w-caption2 {\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 16px;\n}\n\n.w3w-t-black {\n  color: #0b0e11;\n}\n\n.w3w-t-brand {\n  color: #c99400;\n}\n\n.w3w-t-primary {\n  color: #202630;\n}\n\n.w3w-t-secondary {\n  color: #474d57;\n}\n\n.w3w-bg-primary {\n  background: #fcd535;\n}\n\n@media (min-width: 768px) {\n  .md\\:w3w-subtitle1 {\n    font-size: 20px;\n    font-style: normal;\n    font-weight: 600;\n    line-height: 28px;\n  }\n\n  #binanceW3W-wrapper :is(.md\\:w-\\[400px\\]) {\n    width: 400px;\n  }\n\n  #binanceW3W-wrapper :is(.md\\:font-semibold) {\n    font-weight: 600;\n  }\n}\n\n@media (min-width: 1024px) {\n  #binanceW3W-wrapper :is(.lg\\:p-8) {\n    padding: 2rem;\n  }\n\n  #binanceW3W-wrapper :is(.lg\\:pt-6) {\n    padding-top: 1.5rem;\n  }\n\n  #binanceW3W-wrapper :is(.lg\\:text-xl) {\n    font-size: 1.25rem;\n    line-height: 1.75rem;\n  }\n}\n";
var b$3 = "\n".concat(f$4, "\n\n:root {\n  --animation-duration: 300ms;\n}\n\n@keyframes w3w-fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes w3w-fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.w3w-animated {\n  animation-duration: var(--animation-duration);\n  animation-fill-mode: both;\n}\n\n.w3w-fadeIn {\n  animation-name: w3w-fadeIn;\n}\n\n.w3w-fadeOut {\n  animation-name: w3w-fadeOut;\n}\n\n#binanceW3W-wrapper {\n  -webkit-user-select: none;\n  align-items: center;\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  left: 0;\n  pointer-events: none;\n  position: fixed;\n  top: 0;\n  user-select: none;\n  width: 100%;\n  z-index: 99999999999999;\n}\n");
var h$4 = reactExports.createContext({}), y$4 = function() {
  return reactExports.useContext(h$4);
};
var C = "binanceW3W-wrapper", A = "binanceW3W-qrcode-modal", M = { googlePlay: "https://app.appsflyer.com/com.binance.dev?pid=https%3A%2F%2Fwww.binance.com%2Fen&c=https%3A%2F%2Fwww.binance.com%2Fen", appleStore: "https://app.appsflyer.com/id1436799971?pid=https%3A%2F%2Fwww.binance.com%2Fen&c=https%3A%2F%2Fwww.binance.com%2Fen" }, S = "PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMiIgeT0iMiIgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iMTAiIGZpbGw9IiMxNDE1MUEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNCIvPgo8cGF0aCBkPSJNMTIgMjhMMTUuNjEyOSAyNC4zODcxTDE5LjIyNTggMjhMMTUuNjEyOSAzMS42MTI5TDEyIDI4WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNMTguMTkzNSAyMS44MDY1TDI4IDEyTDM3LjgwNjUgMjEuODA2NUwzNC4xOTM2IDI1LjQxOTRMMjggMTkuMjI1OEwyMS44MDY1IDI1LjQxOTRMMTguMTkzNSAyMS44MDY1WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNMjQuMzg3MSAyOEwyOCAyNC4zODcxTDMxLjYxMjkgMjhMMjggMzEuNjEyOUwyNC4zODcxIDI4WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNMjEuODA2NSAzMC41ODA2TDE4LjE5MzUgMzQuMTkzNUwyOCA0NEwzNy44MDY1IDM0LjE5MzVMMzQuMTkzNiAzMC41ODA2TDI4IDM2Ljc3NDJMMjEuODA2NSAzMC41ODA2WiIgZmlsbD0iI0YwQjkwQiIvPgo8cGF0aCBkPSJNMzYuNzc0MiAyOEw0MC4zODcxIDI0LjM4NzFMNDQgMjhMNDAuMzg3MSAzMS42MTI5TDM2Ljc3NDIgMjhaIiBmaWxsPSIjRjBCOTBCIi8+Cjwvc3ZnPgo=", I$1 = "data:image/svg+xml;base64,".concat(S);
var z = function() {
  var n11 = s$5(reactExports.useState(), 2), e2 = n11[0], a2 = n11[1], t3 = s$5(reactExports.useState(false), 2), i2 = t3[0], r2 = t3[1];
  return reactExports.useEffect(function() {
    var n12 = rP(), e3 = rT();
    a2(n12), r2(e3);
  }, []), { isMobile: e2, isAndroid: i2 };
};
var P = ["en", "ar", "bg-BG", "zh-CN", "zh-TW", "cs-CZ", "fr-FR", "de-DE", "el-GR", "id-ID", "it-IT", "kk-KZ", "lv-LV", "pl-PL", "pt-BR", "pt-PT", "ro-RO", "ru-RU", "sk-SK", "sl-SI", "es-LA", "es-ES", "sv-SE", "tr-TR", "uk-UA", "vi-VN", "da-DK", "my-MM", "lo-LA", "si-LK"];
var H = { "sdk-download-android": "تنزيل لنظام Android", "sdk-connect": "اتصال", "sdk-download-ios": "تنزيل لنظام iOS", "sdk-install": "تثبيت", "sdk-modal-instruct-1": "1. افتح تطبيق Binance", "sdk-modal-instruct-2": "2. اضغط {{icon}} على الشاشة الرئيسية", "sdk-modal-title": "الربط مع Binance (بينانس)", "sdk-no-app": "ليس لديك تطبيق Binance حتّى الآن؟" };
var F$1 = { "sdk-download-android": "Изтегляне за Android", "sdk-connect": "Свържи", "sdk-download-ios": "Изтегляне за iOS", "sdk-install": "Инсталиране", "sdk-modal-instruct-1": "1. Отворете приложението Binance", "sdk-modal-instruct-2": "2. Докоснете {{icon}} на началния екран", "sdk-modal-title": "Свържете се с Binance", "sdk-no-app": "Все още нямате приложението Binance?" };
var Z = { "sdk-download-android": "Stáhnout pro Android", "sdk-connect": "Připojit", "sdk-download-ios": "Stáhnout pro iOS", "sdk-install": "Instalovat", "sdk-modal-instruct-1": "1. Otevřete aplikaci Binance", "sdk-modal-instruct-2": "2. Klepněte na {{icon}} na domovské obrazovce", "sdk-modal-title": "Připojit platformu Binance", "sdk-no-app": "Ještě nemáte aplikaci Binance?" };
var V$1 = { "sdk-download-android": "Download til Android", "sdk-connect": "Forbind", "sdk-download-ios": "Download til iOS", "sdk-install": "Installer", "sdk-modal-instruct-1": "1. Åbn Binance-appen", "sdk-modal-instruct-2": "2. Tryk på {{icon}} på startskærmen", "sdk-modal-title": "Forbind til Binance", "sdk-no-app": "Har du ikke Binance-appen endnu?" };
var R = { "sdk-download-android": "Für Android herunterladen", "sdk-connect": "Verbinden", "sdk-download-ios": "Für iOS herunterladen", "sdk-install": "Installieren", "sdk-modal-instruct-1": "1. Binance-App öffnen", "sdk-modal-instruct-2": "2. Tippe auf dem Startbildschirm auf {{icon}}", "sdk-modal-title": "Mit Binance verknüpfen", "sdk-no-app": "Du hast die Binance-App noch nicht?" };
var U$1 = { "sdk-download-android": "Λήψη για Android", "sdk-connect": "Συνδεθείτε", "sdk-download-ios": "Λήψη για iOS", "sdk-install": "Εγκατάσταση", "sdk-modal-instruct-1": "1. Ανοίξτε την εφαρμογή Binance", "sdk-modal-instruct-2": "2. Πατήστε {{icon}} στην αρχική οθόνη", "sdk-modal-title": "Συνδεθείτε με την Binance", "sdk-no-app": "Δεν έχετε ακόμα την εφαρμογή Binance;" };
var Q$1 = { "sdk-download-android": "Download for Android", "sdk-connect": "Connect", "sdk-download-ios": "Download for iOS", "sdk-install": "Install", "sdk-modal-instruct-1": "1. Open Binance app", "sdk-modal-instruct-2": "2. Tap {{icon}} on Home Screen", "sdk-modal-title": "Connect With Binance", "sdk-no-app": "Don’t have the Binance app yet?" };
var G = { "sdk-download-android": "Descargar para Android", "sdk-connect": "Conectar", "sdk-download-ios": "Descargar para iOS", "sdk-install": "Instalar", "sdk-modal-instruct-1": "1. Open Binance app", "sdk-modal-instruct-2": "2. Pulsa en {{icon}} en la página principal", "sdk-modal-title": "Connect With Binance", "sdk-no-app": "¿Aún no tienes la aplicación de Binance?" };
var Y$1 = { "sdk-download-android": "Descargar para Android", "sdk-connect": "Conecta", "sdk-download-ios": "Descargar para iOS", "sdk-install": "Instala", "sdk-modal-instruct-1": "1. Abre la aplicación de Binance", "sdk-modal-instruct-2": "2. Toca {{icon}} en la pantalla de inicio", "sdk-modal-title": "Conectar con Binance", "sdk-no-app": "¿Aún no tienes la aplicación de Binance?" };
var K = { "sdk-download-android": "Télécharger pour Android", "sdk-connect": "Se connecter", "sdk-download-ios": "Télécharger pour iOS", "sdk-install": "Installer", "sdk-modal-instruct-1": "1. Ouvrez l’application de Binance", "sdk-modal-instruct-2": "2. Appuyez sur {{icon}} sur l’écran d’accueil", "sdk-modal-title": "Se connecter à Binance", "sdk-no-app": "Vous n’avez pas encore l’application de Binance ?" };
var J = { "sdk-download-android": "Unduh untuk Android", "sdk-connect": "Terhubung", "sdk-download-ios": "Unduh untuk iOS", "sdk-install": "Instal", "sdk-modal-instruct-1": "1. Buka aplikasi Binance", "sdk-modal-instruct-2": "2. Ketuk {{icon}} di Layar Beranda", "sdk-modal-title": "Hubungkan dengan Binance", "sdk-no-app": "Belum punya aplikasi Binance?" };
var q = { "sdk-download-android": "Scarica per Android", "sdk-connect": "Collega", "sdk-download-ios": "Scarica per iOS", "sdk-install": "Installa", "sdk-modal-instruct-1": "1. Apri l'app Binance", "sdk-modal-instruct-2": "2. Tocca {{icon}} nella homepage", "sdk-modal-title": "Collega con Binance", "sdk-no-app": "Non hai ancora l'app Binance?" };
var _$1 = { "sdk-download-android": "Android үшін жүктеп алу", "sdk-connect": "Қосылу", "sdk-download-ios": "iOS үшін жүктеп алу", "sdk-install": "Орнату", "sdk-modal-instruct-1": "1. Binance қолданбасын ашыңыз", "sdk-modal-instruct-2": "2. Басты экрандағы {{icon}} белгішесін түртіңіз", "sdk-modal-title": "Binance платформасымен байланыстыру", "sdk-no-app": "Сізде әлі Binance қолданбасы жоқ па?" };
var X = { "sdk-download-android": "ດາວໂຫຼດສໍາລັບ Android", "sdk-connect": "ເຊື່ອມຕໍ່", "sdk-download-ios": "ດາວໂຫຼດສໍາລັບ iOS", "sdk-install": "ຕິດຕັ້ງ", "sdk-modal-instruct-1": "1. ເປີດແອັບ Binance", "sdk-modal-instruct-2": "2. ແຕະ {{icon}} ໃນໜ້າຈໍຫຼັກ", "sdk-modal-title": "ເຊື່ອມຕໍ່ກັບ Binance", "sdk-no-app": "ຍັງບໍ່ມີແອັບ Binance ເທື່ອບໍ?" };
var $ = { "sdk-download-android": "Lejupielādēt Android ierīcei", "sdk-connect": "Savienot", "sdk-download-ios": "Lejupielādēt iOS ierīcei", "sdk-install": "Instalēt", "sdk-modal-instruct-1": "1. Atver Binance lietotni", "sdk-modal-instruct-2": "2. Pieskaries pie {{icon}} sākuma ekrānā", "sdk-modal-title": "Savieno ar Binance", "sdk-no-app": "Vai tev vēl nav Binance lietotnes?" };
var nn = { "sdk-download-android": "အန်းဒရွိုက်အတွက် ဒေါင်းလုဒ်လုပ်မည်", "sdk-connect": "ချိတ်ဆက်မည်", "sdk-download-ios": "iOS အတွက် ဒေါင်းလုဒ်လုပ်မည်", "sdk-install": "ထည့်သွင်းမည်", "sdk-modal-instruct-1": "1. Open Binance app", "sdk-modal-instruct-2": "ပင်မမျက်နှာပြင်မှ {{icon}} ကိုနှိပ်ပါ။", "sdk-modal-title": "Connect With Binance", "sdk-no-app": "Binance App မရှိသေးဘူးလား။" };
var ne = { "sdk-download-android": "Pobierz na Androida", "sdk-connect": "Połącz", "sdk-download-ios": "Pobierz na iOS", "sdk-install": "Zainstaluj", "sdk-modal-instruct-1": "1. Otwórz Aplikację Binance", "sdk-modal-instruct-2": "2. Kliknij {{icon}} na ekranie głównym", "sdk-modal-title": "Połącz z Binance", "sdk-no-app": "Nie masz jeszcze aplikacji Binance?" };
var na = { "sdk-download-android": "Baixar para Android", "sdk-connect": "Conecte", "sdk-download-ios": "Baixar para iOS", "sdk-install": "Instalar", "sdk-modal-instruct-1": "1. Abra o Aplicativo da Binance", "sdk-modal-instruct-2": "2. Toque em {{icon}} na Tela Inicial", "sdk-modal-title": "Conectar com a Binance", "sdk-no-app": "Ainda não tem o aplicativo da Binance?" };
var nt = { "sdk-download-android": "Transferir para Android", "sdk-connect": "Associar", "sdk-download-ios": "Transferir para iOS", "sdk-install": "Instalar", "sdk-modal-instruct-1": "1. Abre a aplicação Binance", "sdk-modal-instruct-2": "2. Toca em {{icon}} no Ecrã Inicial", "sdk-modal-title": "Associa com a Binance", "sdk-no-app": "Ainda não tens a aplicação Binance?" };
var ni = { "sdk-download-android": "Descărcați pentru Android", "sdk-connect": "Conectare", "sdk-download-ios": "Descărcați pentru iOS", "sdk-install": "Instalați", "sdk-modal-instruct-1": "1. Deschideți aplicația Binance", "sdk-modal-instruct-2": "2. Atingeți {{icon}} pe ecranul de pornire", "sdk-modal-title": "Conectați-vă cu Binance", "sdk-no-app": "Nu aveți încă aplicația Binance?" };
var nr = { "sdk-download-android": "Скачать для Android", "sdk-connect": "Подключить", "sdk-download-ios": "Скачать для iOS", "sdk-install": "Установить", "sdk-modal-instruct-1": "1. Откройте приложение Binance", "sdk-modal-instruct-2": "2. Нажмите {{icon}} на главном экране", "sdk-modal-title": "Подключить кошелек Binance", "sdk-no-app": "У вас еще нет приложения Binance?" };
var no = { "sdk-download-android": "Android සඳහා බාගත කරන්න", "sdk-connect": "සම්බන්ධ කරන්න", "sdk-download-ios": "iOS සඳහා බාගත කරන්න", "sdk-install": "ස්ථාපනය කරන්න", "sdk-modal-instruct-1": "1. Binance යෙදුම විවෘත කරන්න", "sdk-modal-instruct-2": "2. මුල් තිරයේ {{icon}} මත තට්ටු කරන්න", "sdk-modal-title": "Binance සමග සම්බන්ධ වන්න", "sdk-no-app": "තවමත් Binance යෙදුම නැති ද?" };
var nd = { "sdk-download-android": "Stiahnuť pre Android", "sdk-connect": "Pripojiť", "sdk-download-ios": "Stiahnuť pre iOS", "sdk-install": "Nainštalovať", "sdk-modal-instruct-1": "1. Otvorte aplikáciu Binance", "sdk-modal-instruct-2": "2. Klepnite na ikonu {{icon}} na domovskej obrazovke", "sdk-modal-title": "Spojte sa s Binance", "sdk-no-app": "Ešte nemáte aplikáciu Binance?" };
var nl = { "sdk-download-android": "Prenos za Android", "sdk-connect": "Poveži", "sdk-download-ios": "Prenos za iOS", "sdk-install": "Namesti", "sdk-modal-instruct-1": "1. Odprite aplikacijo Binance", "sdk-modal-instruct-2": "2. Tapnite {{icon}} na začetnem zaslonu", "sdk-modal-title": "Povežite se s platformo Binance", "sdk-no-app": "Še nimate aplikacije Binance?" };
var nc = { "sdk-download-android": "Ladda ned för Android", "sdk-connect": "Anslut", "sdk-download-ios": "Ladda ned för iOS", "sdk-install": "Installera", "sdk-modal-instruct-1": "1. Öppna Binance-appen", "sdk-modal-instruct-2": "2. Tryck på {{icon}} på startskärmen", "sdk-modal-title": "Anslut med Binance", "sdk-no-app": "Har du inte Binance-appen ännu?" };
var ns = { "sdk-download-android": "Android için indir", "sdk-connect": "Bağlan", "sdk-download-ios": "iOS için indir", "sdk-install": "Yükle", "sdk-modal-instruct-1": "1. Binance Uygulamasını Açın", "sdk-modal-instruct-2": "2. Ana Ekranda {{icon}} simgesine dokunun", "sdk-modal-title": "Binance ile Bağlanın", "sdk-no-app": "Henüz Binance uygulamanız yok mu?" };
var np = { "sdk-download-android": "Завантажити для Android", "sdk-connect": "Підключитись", "sdk-download-ios": "Завантажити для iOS", "sdk-install": "Встановити", "sdk-modal-instruct-1": "1. Відкрийте застосунок Binance", "sdk-modal-instruct-2": "2. Торкніться {{icon}} на головному екрані", "sdk-modal-title": "Підключіться до Binance", "sdk-no-app": "Ще не маєте застосунку Binance?" };
var nu = { "sdk-download-android": "Tải xuống cho Android", "sdk-connect": "Kết nối", "sdk-download-ios": "Tải xuống cho iOS", "sdk-install": "Cài đặt", "sdk-modal-instruct-1": "1. Mở ứng dụng Binance", "sdk-modal-instruct-2": "2. Nhấn vào {{icon}} trên Màn hình chính", "sdk-modal-title": "Kết nối với Binance", "sdk-no-app": "Bạn chưa có ứng dụng Binance?" };
var nm = { "sdk-download-android": "下载安卓版", "sdk-connect": "关联", "sdk-download-ios": "下载iOS版", "sdk-install": "安装", "sdk-modal-instruct-1": "1.打开币安App", "sdk-modal-instruct-2": "2.点击主屏幕的{{icon}}", "sdk-modal-title": "关联币安", "sdk-no-app": "尚未安装币安App？" };
var nw = { "sdk-download-android": "Android 下載", "sdk-connect": "連接", "sdk-download-ios": "iOS 下載", "sdk-install": "安裝", "sdk-modal-instruct-1": "1. 開啟幣安 App", "sdk-modal-instruct-2": "2. 在首頁畫面上點擊 {{icon}}", "sdk-modal-title": "與幣安連接", "sdk-no-app": "還沒有幣安 App 嗎？" };
var nk = { en: Q$1, ar: H, "bg-BG": F$1, "zh-CN": nm, "zh-TW": nw, "cs-CZ": Z, "fr-FR": K, "de-DE": R, "el-GR": U$1, "id-ID": J, "it-IT": q, "kk-KZ": _$1, "lv-LV": $, "pl-PL": ne, "pt-BR": na, "pt-PT": nt, "ro-RO": ni, "ru-RU": nr, "sk-SK": nd, "sl-SI": nl, "es-LA": Y$1, "es-ES": G, "sv-SE": nc, "tr-TR": ns, "uk-UA": np, "vi-VN": nu, "da-DK": V$1, "my-MM": nn, "lo-LA": X, "si-LK": no };
var nf = P.reduce(function(n11, e2) {
  return n11[e2] = nk[e2], n11;
}, {}), nb = nf;
var nv = function() {
  var n11 = y$4(), e2 = n11.lng;
  return reactExports.useCallback(function(n12, a2) {
    var t3, i2;
    return (nb === null || nb === void 0 ? void 0 : (t3 = nb[e2]) === null || t3 === void 0 ? void 0 : t3[n12]) || (nb === null || nb === void 0 ? void 0 : (i2 = nb.en) === null || i2 === void 0 ? void 0 : i2[n12]) || (a2 === null || a2 === void 0 ? void 0 : a2.default) || n12;
  }, [e2]);
}, ng = nv;
var nx = function(n11) {
  var e2 = n11.size, a2 = e2 === void 0 ? 24 : e2, t3 = n11.color, i2 = t3 === void 0 ? "currentColor" : t3, r2 = n11.className, o2 = n11.children, c2 = l$4(n11, ["size", "color", "className", "children"]);
  return W$1.createElement("svg", d$2({ width: a2, height: a2, fill: i2, className: r2, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, c2), o2);
}, nW = nx;
var nB = function(n11) {
  return W$1.createElement(nW, d$2({ size: 24 }, n11), W$1.createElement("path", { d: "M21.7725 18.7033C21.4062 19.5418 20.9727 20.3136 20.4704 21.0232C19.7857 21.9906 19.2251 22.6602 18.7931 23.032C18.1233 23.6424 17.4058 23.955 16.6374 23.9728C16.0857 23.9728 15.4205 23.8172 14.6461 23.5017C13.8692 23.1876 13.1552 23.032 12.5024 23.032C11.8177 23.032 11.0834 23.1876 10.2979 23.5017C9.51127 23.8172 8.87756 23.9816 8.39305 23.9979C7.65619 24.0291 6.92173 23.7076 6.1886 23.032C5.72069 22.6276 5.13542 21.9343 4.43429 20.9521C3.68203 19.9033 3.06358 18.687 2.57906 17.3004C2.06017 15.8026 1.80005 14.3523 1.80005 12.9482C1.80005 11.3398 2.15076 9.95259 2.85324 8.79011C3.40532 7.85636 4.13979 7.11979 5.05903 6.57906C5.97827 6.03834 6.97151 5.76279 8.04114 5.74516C8.62641 5.74516 9.39391 5.92456 10.3477 6.27715C11.2988 6.63091 11.9095 6.81032 12.1772 6.81032C12.3774 6.81032 13.0558 6.60054 14.2058 6.18233C15.2934 5.79449 16.2113 5.63391 16.9633 5.69716C19.0009 5.86012 20.5317 6.6561 21.5497 8.09013C19.7274 9.18432 18.826 10.7169 18.8439 12.6829C18.8603 14.2142 19.4209 15.4886 20.5227 16.5004C21.022 16.97 21.5796 17.333 22.2001 17.5907C22.0655 17.9774 21.9235 18.3477 21.7725 18.7033ZM17.0993 0.480137C17.0993 1.68041 16.6568 2.8011 15.7748 3.8384C14.7104 5.07155 13.4229 5.78412 12.0268 5.67168C12.009 5.52769 11.9987 5.37614 11.9987 5.21688C11.9987 4.06462 12.5049 2.83147 13.4038 1.82321C13.8526 1.3127 14.4234 0.888228 15.1155 0.549615C15.8062 0.216055 16.4595 0.031589 17.0739 0C17.0918 0.160458 17.0993 0.320926 17.0993 0.480121V0.480137Z", fill: "#1E2329" }));
};
var nC = function(n11) {
  return W$1.createElement(nW, d$2({ size: 24 }, n11), W$1.createElement("path", { d: "M13.5589 11.0874L4.08203 1.59644H4.17441C4.98558 1.59644 5.68614 1.89129 6.81073 2.4993L16.7488 7.88083L13.5589 11.0874Z", fill: "#202630" }), W$1.createElement("path", { d: "M12.6373 12.008L2.90218 21.7203C2.66236 21.3329 2.49658 20.7063 2.49658 19.8034V4.19354C2.49658 3.29078 2.66236 2.66403 2.90218 2.2771L12.6373 12.008Z", fill: "#202630" }), W$1.createElement("path", { d: "M13.5589 12.9124L16.7488 16.1187L6.81073 21.5001C5.68614 22.1083 4.98548 22.4036 4.17441 22.4036H4.08203L13.5589 12.9124Z", fill: "#202630" }), W$1.createElement("path", { d: "M17.9437 8.52563L14.4775 12.0091L17.9437 15.4738L20.0456 14.3309C20.8199 13.9069 22 13.1329 22 12.0091C22 10.8662 20.8199 10.0922 20.0456 9.66821L17.9437 8.52563Z", fill: "#202630" }));
};
var nM = function(n11) {
  return W$1.createElement(nW, d$2({ size: 24 }, n11), W$1.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.5 4H10.5V7H7.5V10H4.5V7V4H7.5ZM14.5 4H17.5H20.5V7V10H17.5V7H14.5V4ZM10.5 20V17H7.5V14H4.5V17V20H7.5H10.5ZM17.5 20H14.5V17H17.5V14H20.5V17V20H17.5ZM16.5 10.5H8.5V13.5H16.5V10.5Z", fill: "#202630" }));
};
var nI = function(n11) {
  var e2 = n11.value, a2 = l$4(n11, ["value"]);
  var t3 = nO(e2).map(function(n12) {
    return typeof n12 == "string" ? n12 : W$1.cloneElement(a2[n12.key], { key: n12.key });
  });
  return W$1.createElement(W$1.Fragment, null, t3);
}, nO = function(n11) {
  var e2 = /{{(.*?)}}/g, a2, t3 = 0, i2 = [];
  for (; (a2 = e2.exec(n11)) !== null; )
    a2.index !== t3 && i2.push(n11.substring(t3, a2.index)), i2.push({ key: a2[1] }), t3 = e2.lastIndex;
  return t3 !== n11.length && i2.push(n11.substring(t3)), i2;
};
var nN = function() {
  var n11 = ng();
  return W$1.createElement(W$1.Fragment, null, W$1.createElement(nj, { t: n11 }), W$1.createElement(nD, { t: n11 }), W$1.createElement(nz, null));
}, nj = function(n11) {
  var e2 = n11.t;
  return W$1.createElement("div", { style: { borderBottom: "1px solid #EAECEF" }, className: "grid justify-center gap-y-2 pb-6 w3w-body3 w3w-t-black border-b border-gray-300" }, W$1.createElement("div", null, e2("sdk-modal-instruct-1", { default: "1. Open Binance app" })), W$1.createElement("div", { className: "flex items-center" }, W$1.createElement(nI, { value: e2("sdk-modal-instruct-2", { default: "2. Tap {{icon}} on Home" }), icon: W$1.createElement(nM, { className: "w-[24px] h-[24px] mx-[4px]" }) })));
}, nD = function(n11) {
  var e2 = n11.t;
  return W$1.createElement("div", { className: "py-4 w3w-body3 w3w-t-secondary text-center" }, e2("sdk-no-app", { default: "Don't have Binance app yet?" }));
}, nz = function() {
  return W$1.createElement("div", { className: "grid grid-cols-2 gap-x-4" }, W$1.createElement(nT, { type: "iOS" }), W$1.createElement(nT, { type: "Android" }));
}, nT = function(n11) {
  var e2 = n11.type;
  var a2 = ng();
  return W$1.createElement("div", { style: { border: "1px solid #EAECEF" }, className: "p-[12px] rounded-lg grid cursor-pointer w3w-t-secondary grid-flow-col items-center gap-x-4 w-[150px]", onClick: function() {
    window.open(e2 === "Android" ? M.googlePlay : M.appleStore, "_blank");
  } }, e2 === "Android" ? W$1.createElement(nC, { className: "w-[24px] h-[24px] m-auto" }) : W$1.createElement(nB, { className: "w-[24px] h-[24px] m-auto" }), W$1.createElement("div", { className: "w-[75px] w3w-caption2 w3w-t-secondary" }, a2("sdk-download-".concat(e2.toLowerCase()), { default: "Download for ".concat(e2) })));
};
var nH = function(n11) {
  return W$1.createElement(nW, d$2({}, n11), W$1.createElement("path", { d: "M6.69708 4.57538L4.57576 6.6967L9.87906 12L4.57576 17.3033L6.69708 19.4246L12.0004 14.1213L17.3037 19.4246L19.425 17.3033L14.1217 12L19.425 6.6967L17.3037 4.57538L12.0004 9.87868L6.69708 4.57538Z", fill: "currentColor" }));
};
var nF = function(n11) {
  var e2 = n11.onClose;
  var a2 = ng();
  return W$1.createElement("div", { className: "flex items-center justify-between" }, W$1.createElement("p", { className: "text-base font-medium text-[#1E2329] lg:text-xl md:font-semibold md:w3w-subtitle1" }, a2("sdk-modal-title", { default: "Connect with Binance" })), W$1.createElement("div", { className: "cursor-pointer text-[#929AA5]", onClick: e2 }, W$1.createElement(nH, null)));
}, nZ = nF;
var nR = function(n11) {
  var e2 = n11.id, a2 = n11.onClose, t3 = n11.onConnect;
  var i2 = ng();
  return W$1.createElement("div", { id: e2, className: "w3w-animated w3w-fadeIn pointer-events-auto fixed top-0 left-0 h-full w-full bg-black/[.80] duration-300 ease-in-out will-change-auto" }, W$1.createElement("div", { className: "absolute bottom-0 m-auto w-full rounded-t-2xl bg-white px-4 pb-6 shadow-inner duration-300 ease-in-out will-change-transform md:w-[400px]" }, W$1.createElement(nU, { onClose: a2 }), W$1.createElement("div", { className: "mt-6 mb-4 flex justify-center" }, W$1.createElement("img", { className: "w-[60px]", src: I$1 })), W$1.createElement("div", { className: "w3w-subtitle1 text-center mb-6 w3w-t-primary" }, i2("sdk-modal-title", { default: "Connect with Binance" })), W$1.createElement("button", { onClick: t3, style: { borderColor: "transparent" }, className: "w-full rounded h-[40px] flex justify-center items-center w3w-bg-primary w3w-t-primary w3w-subtitle3 mb-4" }, i2("sdk-connect", { default: "Connect" })), W$1.createElement("div", { className: "text-center py-3 w3w-t-secondary" }, W$1.createElement("span", null, i2("sdk-no-app", { default: "Don’t have Binance app yet?" })), W$1.createElement("a", { target: "_blank", href: "https://www.binance.com/en/download", className: "w3w-t-brand ml-1" }, i2("sdk-install", { default: "Install" })))));
}, nU = function(n11) {
  var e2 = n11.onClose;
  return W$1.createElement("div", { className: "flex items-center justify-end h-[52px]" }, W$1.createElement("div", { className: "cursor-pointer text-[#929AA5]", onClick: e2 }, W$1.createElement(nH, { className: "w-[20px]" })));
};
var nK = function(n11, e2) {
  var a2 = "visibilitychange", t3 = setTimeout(function() {
    document.hidden || n11();
  }, e2), i2 = function() {
    document.hidden && (clearTimeout(t3), document.removeEventListener(a2, i2));
  };
  document.addEventListener(a2, i2, false);
}, nJ = function(n11) {
  var e2 = document.createElement("a");
  e2.href = n11, document.body.appendChild(e2), nK(function() {
    window.location.href = "https://www.binance.com/en/download";
  }, 1e3), e2.click(), document.body.removeChild(e2);
}, nq = function(n11) {
  var e2 = z(), a2 = e2.isAndroid, t3 = e2.isMobile;
  return { toBinance: function() {
    var e3 = rC(a2, n11);
    if (t3) {
      if (!a2) {
        var i2 = document.createElement("a");
        i2.href = e3, document.body.appendChild(i2), i2.click(), document.body.removeChild(i2);
      }
      a2 && nJ(e3);
    }
  } };
};
function n_(n11) {
  var e2 = nq(n11.url), a2 = e2.toBinance;
  return W$1.createElement("div", null, W$1.createElement("div", { className: "mt-[35px] flex justify-center" }, W$1.createElement("div", { className: "w-[200px] h-[200px] mb-4", onClick: a2 }, n11.url && W$1.createElement(QRCodeSVG, { value: n11.url, width: "100%", height: "100%", level: "M", imageSettings: { src: I$1, height: 32, width: 32, excavate: false } }))));
}
var nX = n_;
var n$ = function(n11) {
  var e2 = n11.onClose, a2 = n11.isReady;
  var t3 = z(), i2 = t3.isMobile, r2 = s$5(reactExports.useState(""), 2), o2 = r2[0], l2 = r2[1], c2 = s$5(reactExports.useState(false), 2), p2 = c2[0], u2 = c2[1];
  reactExports.useEffect(function() {
    a2.then(l2).catch(function() {
      return u2(true);
    });
  }, [a2]);
  var m2 = function() {
    console.log(o2);
    rj(o2);
  }, w = { url: o2, error: p2 };
  if (i2 === false)
    return W$1.createElement("div", { id: A, className: "w3w-animated w3w-fadeIn pointer-events-auto fixed top-0 left-0 h-full w-full bg-black/[.80] duration-300 ease-in-out will-change-auto" }, W$1.createElement("div", { style: { transform: "translateY(-50%)", top: "50%" }, className: "relative m-auto w-[343px] rounded-2xl bg-white px-6 pt-[20px] pb-6 shadow-inner duration-300 ease-in-out will-change-transform md:w-[400px] lg:p-8 lg:pt-6" }, W$1.createElement(nZ, { onClose: e2 }), W$1.createElement(nX, d$2({}, w)), W$1.createElement(nN, null)));
  if (i2)
    return W$1.createElement(nR, { onConnect: m2, onClose: e2, id: A });
}, n1 = n$;
var n0 = { order: ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag", "path", "subdomain"], lookupQuerystring: function n() {
  var n11 = window.location.search.match(/lng=([^&]*)/);
  return n11 && n11[1];
}, lookupCookie: function n2() {
  var n11 = document.cookie.match(/i18next=([^;]*)/);
  return n11 && n11[1];
}, lookupLocalStorage: function n3() {
  return localStorage.getItem("i18nextLng");
}, lookupSessionStorage: function n4() {
  return sessionStorage.getItem("i18nextLng");
}, lookupFromNavigator: function n5() {
  return navigator.language;
}, lookupFromHtmlTag: function n6() {
  return document.documentElement.lang;
}, lookupFromPath: function n7() {
  var n11 = window.location.pathname.match(/\/([^/]*)/);
  return n11 && n11[1];
}, lookupFromSubdomain: function n8() {
  var n11 = window.location.hostname.match(/^(.+)\./);
  return n11 && n11[1];
} }, n22 = function() {
  var n11 = true, e2 = false, a2 = void 0;
  try {
    for (var t3 = n0.order[Symbol.iterator](), i2; !(n11 = (i2 = t3.next()).done); n11 = true) {
      var r2 = i2.value;
      try {
        var o2 = n0["lookup" + r2.charAt(0).toUpperCase() + r2.slice(1)]();
        if (o2)
          return o2;
      } catch (n12) {
        console.error("Error detecting language with method: ".concat(r2), n12);
        continue;
      }
    }
  } catch (n12) {
    e2 = true;
    a2 = n12;
  } finally {
    try {
      if (!n11 && t3.return != null) {
        t3.return();
      }
    } finally {
      if (e2) {
        throw a2;
      }
    }
  }
  return "en";
};
function n32() {
  var n11 = window.document, e2 = n11.createElement("div");
  return e2.setAttribute("id", C), n11.body.appendChild(e2), e2;
}
function n42() {
  var n11 = window.document, e2 = n11.getElementById(A);
  e2 && (e2.className = e2.className.replace("w3w-fadeIn", "w3w-fadeOut"), setTimeout(function() {
    var e3 = n11.getElementById(C);
    e3 && n11.body.removeChild(e3);
  }, 300));
}
function n52(n11) {
  return function() {
    n42(), n11 && n11();
  };
}
function n9(n11) {
  return n62.apply(this, arguments);
}
function n62() {
  n62 = t$5(function(n11) {
    var e2, a2, t3, i2, r2, o2;
    return u$5(this, function(d2) {
      switch (d2.label) {
        case 0:
          e2 = n11.isReady, a2 = n11.cb, t3 = n11.lng;
          i2 = n32(), r2 = createRoot(i2);
          return [4, e2];
        case 1:
          d2.sent();
          o2 = t3 !== null && t3 !== void 0 ? t3 : n22();
          r2.render(reactExports.createElement(h$4.Provider, { value: { lng: o2 } }, reactExports.createElement("style", { dangerouslySetInnerHTML: { __html: b$3 } }), reactExports.createElement(n1, { isReady: e2, onClose: n52(a2) })));
          return [2];
      }
    });
  });
  return n62.apply(this, arguments);
}
function n72() {
  n42();
}
var n82 = function(n11) {
}, en = function() {
};
function ee(n11) {
  var e2 = n11.cb, a2 = n11.lng;
  var t3 = new Promise(function(n12, e3) {
    n82 = n12, en = e3;
  });
  eh$1() || n9({ isReady: t3, cb: e2, lng: a2 });
}
function ea$1() {
  eh$1() || n72();
}
function et(n11) {
  n82(n11);
}
function ei$1() {
  console.log("relay failed...."), en();
}
var er$1 = { open: ee, close: ea$1, ready: et, fail: ei$1 }, eo$1 = er$1;
var browser = function() {
  throw new Error(
    "ws does not work in the browser. Browser clients must use the native WebSocket object"
  );
};
const k$1 = /* @__PURE__ */ getDefaultExportFromCjs(browser);
function t$4(t3) {
  if (t3 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return t3;
}
function e$4(t3, e2) {
  if (!(t3 instanceof e2)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function n$4(t3, e2) {
  for (var n11 = 0; n11 < e2.length; n11++) {
    var r2 = e2[n11];
    r2.enumerable = r2.enumerable || false;
    r2.configurable = true;
    if ("value" in r2)
      r2.writable = true;
    Object.defineProperty(t3, r2.key, r2);
  }
}
function r$4(t3, e2, r2) {
  if (e2)
    n$4(t3.prototype, e2);
  if (r2)
    n$4(t3, r2);
  return t3;
}
function o$4(t3) {
  o$4 = Object.setPrototypeOf ? Object.getPrototypeOf : function t4(t4) {
    return t4.__proto__ || Object.getPrototypeOf(t4);
  };
  return o$4(t3);
}
function i$4(t3, e2) {
  if (typeof e2 !== "function" && e2 !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  t3.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t3, writable: true, configurable: true } });
  if (e2)
    u$4(t3, e2);
}
function s$4(e2, n11) {
  if (n11 && (c$4(n11) === "object" || typeof n11 === "function")) {
    return n11;
  }
  return t$4(e2);
}
function u$4(t3, e2) {
  u$4 = Object.setPrototypeOf || function t4(t4, e3) {
    t4.__proto__ = e3;
    return t4;
  };
  return u$4(t3, e2);
}
function c$4(t3) {
  "@swc/helpers - typeof";
  return t3 && typeof Symbol !== "undefined" && t3.constructor === Symbol ? "symbol" : typeof t3;
}
function a$4() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (t3) {
    return false;
  }
}
function f$3(t3) {
  var e2 = a$4();
  return function n11() {
    var n12 = o$4(t3), r2;
    if (e2) {
      var i2 = o$4(this).constructor;
      r2 = Reflect.construct(n12, arguments, i2);
    } else {
      r2 = n12.apply(this, arguments);
    }
    return s$4(this, r2);
  };
}
var l$3 = Object.defineProperty;
var h$3 = function(t3, e2, n11) {
  return e2 in t3 ? l$3(t3, e2, { enumerable: true, configurable: true, writable: true, value: n11 }) : t3[e2] = n11;
};
var y$3 = function(t3, e2, n11) {
  return h$3(t3, (typeof e2 === "undefined" ? "undefined" : c$4(e2)) != "symbol" ? e2 + "" : e2, n11), n11;
};
var d$1 = (typeof window === "undefined" ? "undefined" : c$4(window)) < "u" ? window.WebSocket : k$1, v$2 = function(n11) {
  i$4(s2, n11);
  var o2 = f$3(s2);
  function s2(n12) {
    e$4(this, s2);
    var r2;
    r2 = o2.call(this);
    r2.opts = n12;
    y$3(t$4(r2), "qs");
    y$3(t$4(r2), "urls", []);
    y$3(t$4(r2), "url");
    y$3(t$4(r2), "socket");
    y$3(t$4(r2), "nextSocket");
    y$3(t$4(r2), "queue", []);
    y$3(t$4(r2), "subscriptions", []);
    y$3(t$4(r2), "retryIndex", 0);
    r2.socket = null, r2.nextSocket = null, r2.subscriptions = n12.subscriptions || [], r2.qs = "env=browser&protocol=wc&version=".concat(n12.version);
    return r2;
  }
  r$4(s2, [{ key: "readyState", get: function t3() {
    return this.socket ? this.socket.readyState : -1;
  }, set: function t3(t3) {
  } }, { key: "connecting", get: function t3() {
    return this.readyState === 0;
  }, set: function t3(t3) {
  } }, { key: "connected", get: function t3() {
    return this.readyState === 1;
  }, set: function t3(t3) {
  } }, { key: "retryFailed", get: function t3() {
    return this.retryIndex > 0 && this.retryIndex > this.urls.length;
  }, set: function t3(t3) {
  } }, { key: "open", value: function t3(t3) {
    if (!Array.isArray(t3) || t3.length === 0)
      throw new Error("Missing or invalid WebSocket url");
    this.urls = t3, this.retryIndex = 0, this.socketCreate();
  } }, { key: "close", value: function t3() {
    this._socketClose();
  } }, { key: "send", value: function t3(t3, e2, n12) {
    if (!e2 || typeof e2 != "string")
      throw new Error("Missing or invalid topic field");
    this.socketSend({ topic: e2, type: "pub", payload: t3, silent: !!n12 });
  } }, { key: "subscribe", value: function t3(t3) {
    this.socketSend({ topic: t3, type: "sub", payload: "", silent: true });
  } }, { key: "socketCreate", value: function t3() {
    var t4 = this;
    if (this.nextSocket)
      return;
    var e2 = this.url || this.getWsUrl();
    if (!e2)
      return this.events.emit("error", new Error("Retry limit reached. Can't connect to any url."), e2);
    if (this.url = e2, this.nextSocket = new d$1(e2), !this.nextSocket)
      throw new Error("Failed to create socket");
    this.nextSocket.onmessage = function(e3) {
      return t4.socketReceive(e3);
    }, this.nextSocket.onopen = function() {
      return t4.socketOpen();
    }, this.nextSocket.onerror = function(n12) {
      return t4.socketError(n12, e2);
    }, this.nextSocket.onclose = function(e3) {
      t4.nextSocket = null, t4.socketCreate();
    };
  } }, { key: "getWsUrl", value: function t3() {
    return this.retryIndex >= this.urls.length ? "" : "".concat(this.urls[this.retryIndex++], "?").concat(this.qs);
  } }, { key: "socketOpen", value: function t3() {
    this._socketClose(), this.socket = this.nextSocket, this.nextSocket = null, this.queueSubscriptions(), this.pushQueue(), this.events.emit("open", this.urls[this.retryIndex - 1]);
  } }, { key: "_socketClose", value: function t3() {
    this.socket && (this.socket.onclose = function() {
    }, this.socket.close(), this.events.emit("close"));
  } }, { key: "socketSend", value: function t3(t3) {
    var e2 = JSON.stringify(t3);
    this.socket && this.socket.readyState === 1 ? this.socket.send(e2) : this.setToQueue(t3);
  } }, { key: "socketReceive", value: function t3(t3) {
    var e2;
    try {
      e2 = JSON.parse(t3.data);
    } catch (t4) {
      return;
    }
    this.socketSend({ topic: e2.topic, type: "ack", payload: "", silent: true }), this.socket && this.socket.readyState === 1 && this.events.emit("message", e2);
  } }, { key: "socketError", value: function t3(t3, e2) {
    this.events.emit("error", t3, e2);
  } }, { key: "queueSubscriptions", value: function t3() {
    var t4 = this;
    this.subscriptions.forEach(function(e2) {
      return t4.queue.push({ topic: e2, type: "sub", payload: "", silent: true });
    }), this.subscriptions = this.opts.subscriptions || [];
  } }, { key: "setToQueue", value: function t3(t3) {
    this.queue.push(t3);
  } }, { key: "pushQueue", value: function t3() {
    var t4 = this;
    this.queue.forEach(function(e2) {
      return t4.socketSend(e2);
    }), this.queue = [];
  } }]);
  return s2;
}(rh);
function b$2(t3) {
  var e2 = Date.now();
  return new Promise(function(n11) {
    try {
      setTimeout(function() {
        n11({ ttl: 0, url: t3 });
      }, 5e3);
      var r2 = new d$1(t3);
      r2.onopen = function() {
        r2.close(), n11({ ttl: Date.now() - e2, url: t3 });
      }, r2.onerror = function() {
        n11({ ttl: 0, url: t3 });
      };
    } catch (e3) {
      n11({ ttl: 0, url: t3 });
    }
  });
}
function t$3(t3) {
  if (t3 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return t3;
}
function e$3(t3, e2) {
  if (!(t3 instanceof e2)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function n$3(t3) {
  n$3 = Object.setPrototypeOf ? Object.getPrototypeOf : function t4(t4) {
    return t4.__proto__ || Object.getPrototypeOf(t4);
  };
  return n$3(t3);
}
function r$3(t3, e2) {
  if (typeof e2 !== "function" && e2 !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  t3.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t3, writable: true, configurable: true } });
  if (e2)
    c$3(t3, e2);
}
function o$3(e2, n11) {
  if (n11 && (i$3(n11) === "object" || typeof n11 === "function")) {
    return n11;
  }
  return t$3(e2);
}
function c$3(t3, e2) {
  c$3 = Object.setPrototypeOf || function t4(t4, e3) {
    t4.__proto__ = e3;
    return t4;
  };
  return c$3(t3, e2);
}
function i$3(t3) {
  "@swc/helpers - typeof";
  return t3 && typeof Symbol !== "undefined" && t3.constructor === Symbol ? "symbol" : typeof t3;
}
function u$3() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (t3) {
    return false;
  }
}
function f$2(t3) {
  var e2 = u$3();
  return function r2() {
    var r3 = n$3(t3), c2;
    if (e2) {
      var i2 = n$3(this).constructor;
      c2 = Reflect.construct(r3, arguments, i2);
    } else {
      c2 = r3.apply(this, arguments);
    }
    return o$3(this, c2);
  };
}
var s$3 = Object.defineProperty;
var a$3 = function(t3, e2, n11) {
  return e2 in t3 ? s$3(t3, e2, { enumerable: true, configurable: true, writable: true, value: n11 }) : t3[e2] = n11;
};
var l$2 = function(t3, e2, n11) {
  return a$3(t3, (typeof e2 === "undefined" ? "undefined" : i$3(e2)) != "symbol" ? e2 + "" : e2, n11), n11;
};
var p$2 = function t() {
  e$3(this, t);
  l$2(this, "events");
}, y$2 = function(t3) {
  r$3(o2, t3);
  var n11 = f$2(o2);
  function o2() {
    e$3(this, o2);
    return n11.apply(this, arguments);
  }
  return o2;
}(p$2);
(function(n11) {
  r$3(c2, n11);
  var o2 = f$2(c2);
  function c2() {
    e$3(this, c2);
    var n12;
    n12 = o2.call.apply(o2, [this].concat(Array.prototype.slice.call(arguments)));
    l$2(t$3(n12), "connection");
    return n12;
  }
  return c2;
})(y$2);
var h$2 = function(t3) {
  return t3[t3.DisconnectAtWallet = 0] = "DisconnectAtWallet", t3[t3.DisconnectAtClient = 1] = "DisconnectAtClient", t3[t3.NetworkError = 2] = "NetworkError", t3;
}(h$2 || {});
const version = "abi/5.7.0";
const logger$4 = new Logger(version);
const _constructorGuard = {};
let ModifiersBytes = { calldata: true, memory: true, storage: true };
let ModifiersNest = { calldata: true, memory: true };
function checkModifier(type, name) {
  if (type === "bytes" || type === "string") {
    if (ModifiersBytes[name]) {
      return true;
    }
  } else if (type === "address") {
    if (name === "payable") {
      return true;
    }
  } else if (type.indexOf("[") >= 0 || type === "tuple") {
    if (ModifiersNest[name]) {
      return true;
    }
  }
  if (ModifiersBytes[name] || name === "payable") {
    logger$4.throwArgumentError("invalid modifier", "name", name);
  }
  return false;
}
function parseParamType(param, allowIndexed) {
  let originalParam = param;
  function throwError(i2) {
    logger$4.throwArgumentError(`unexpected character at position ${i2}`, "param", param);
  }
  param = param.replace(/\s/g, " ");
  function newNode(parent2) {
    let node2 = { type: "", name: "", parent: parent2, state: { allowType: true } };
    if (allowIndexed) {
      node2.indexed = false;
    }
    return node2;
  }
  let parent = { type: "", name: "", state: { allowType: true } };
  let node = parent;
  for (let i2 = 0; i2 < param.length; i2++) {
    let c2 = param[i2];
    switch (c2) {
      case "(":
        if (node.state.allowType && node.type === "") {
          node.type = "tuple";
        } else if (!node.state.allowParams) {
          throwError(i2);
        }
        node.state.allowType = false;
        node.type = verifyType(node.type);
        node.components = [newNode(node)];
        node = node.components[0];
        break;
      case ")":
        delete node.state;
        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i2);
          }
          node.indexed = true;
          node.name = "";
        }
        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }
        node.type = verifyType(node.type);
        let child = node;
        node = node.parent;
        if (!node) {
          throwError(i2);
        }
        delete child.parent;
        node.state.allowParams = false;
        node.state.allowName = true;
        node.state.allowArray = true;
        break;
      case ",":
        delete node.state;
        if (node.name === "indexed") {
          if (!allowIndexed) {
            throwError(i2);
          }
          node.indexed = true;
          node.name = "";
        }
        if (checkModifier(node.type, node.name)) {
          node.name = "";
        }
        node.type = verifyType(node.type);
        let sibling = newNode(node.parent);
        node.parent.components.push(sibling);
        delete node.parent;
        node = sibling;
        break;
      case " ":
        if (node.state.allowType) {
          if (node.type !== "") {
            node.type = verifyType(node.type);
            delete node.state.allowType;
            node.state.allowName = true;
            node.state.allowParams = true;
          }
        }
        if (node.state.allowName) {
          if (node.name !== "") {
            if (node.name === "indexed") {
              if (!allowIndexed) {
                throwError(i2);
              }
              if (node.indexed) {
                throwError(i2);
              }
              node.indexed = true;
              node.name = "";
            } else if (checkModifier(node.type, node.name)) {
              node.name = "";
            } else {
              node.state.allowName = false;
            }
          }
        }
        break;
      case "[":
        if (!node.state.allowArray) {
          throwError(i2);
        }
        node.type += c2;
        node.state.allowArray = false;
        node.state.allowName = false;
        node.state.readArray = true;
        break;
      case "]":
        if (!node.state.readArray) {
          throwError(i2);
        }
        node.type += c2;
        node.state.readArray = false;
        node.state.allowArray = true;
        node.state.allowName = true;
        break;
      default:
        if (node.state.allowType) {
          node.type += c2;
          node.state.allowParams = true;
          node.state.allowArray = true;
        } else if (node.state.allowName) {
          node.name += c2;
          delete node.state.allowArray;
        } else if (node.state.readArray) {
          node.type += c2;
        } else {
          throwError(i2);
        }
    }
  }
  if (node.parent) {
    logger$4.throwArgumentError("unexpected eof", "param", param);
  }
  delete parent.state;
  if (node.name === "indexed") {
    if (!allowIndexed) {
      throwError(originalParam.length - 7);
    }
    if (node.indexed) {
      throwError(originalParam.length - 7);
    }
    node.indexed = true;
    node.name = "";
  } else if (checkModifier(node.type, node.name)) {
    node.name = "";
  }
  parent.type = verifyType(parent.type);
  return parent;
}
function populate(object, params) {
  for (let key in params) {
    defineReadOnly(object, key, params[key]);
  }
}
const FormatTypes = Object.freeze({
  // Bare formatting, as is needed for computing a sighash of an event or function
  sighash: "sighash",
  // Human-Readable with Minimal spacing and without names (compact human-readable)
  minimal: "minimal",
  // Human-Readable with nice spacing, including all names
  full: "full",
  // JSON-format a la Solidity
  json: "json"
});
const paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);
class ParamType {
  constructor(constructorGuard, params) {
    if (constructorGuard !== _constructorGuard) {
      logger$4.throwError("use fromString", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new ParamType()"
      });
    }
    populate(this, params);
    let match = this.type.match(paramTypeArray);
    if (match) {
      populate(this, {
        arrayLength: parseInt(match[2] || "-1"),
        arrayChildren: ParamType.fromObject({
          type: match[1],
          components: this.components
        }),
        baseType: "array"
      });
    } else {
      populate(this, {
        arrayLength: null,
        arrayChildren: null,
        baseType: this.components != null ? "tuple" : this.type
      });
    }
    this._isParamType = true;
    Object.freeze(this);
  }
  // Format the parameter fragment
  //   - sighash: "(uint256,address)"
  //   - minimal: "tuple(uint256,address) indexed"
  //   - full:    "tuple(uint256 foo, address bar) indexed baz"
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }
    if (!FormatTypes[format]) {
      logger$4.throwArgumentError("invalid format type", "format", format);
    }
    if (format === FormatTypes.json) {
      let result2 = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name: this.name || void 0
      };
      if (typeof this.indexed === "boolean") {
        result2.indexed = this.indexed;
      }
      if (this.components) {
        result2.components = this.components.map((comp) => JSON.parse(comp.format(format)));
      }
      return JSON.stringify(result2);
    }
    let result = "";
    if (this.baseType === "array") {
      result += this.arrayChildren.format(format);
      result += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]";
    } else {
      if (this.baseType === "tuple") {
        if (format !== FormatTypes.sighash) {
          result += this.type;
        }
        result += "(" + this.components.map((comp) => comp.format(format)).join(format === FormatTypes.full ? ", " : ",") + ")";
      } else {
        result += this.type;
      }
    }
    if (format !== FormatTypes.sighash) {
      if (this.indexed === true) {
        result += " indexed";
      }
      if (format === FormatTypes.full && this.name) {
        result += " " + this.name;
      }
    }
    return result;
  }
  static from(value, allowIndexed) {
    if (typeof value === "string") {
      return ParamType.fromString(value, allowIndexed);
    }
    return ParamType.fromObject(value);
  }
  static fromObject(value) {
    if (ParamType.isParamType(value)) {
      return value;
    }
    return new ParamType(_constructorGuard, {
      name: value.name || null,
      type: verifyType(value.type),
      indexed: value.indexed == null ? null : !!value.indexed,
      components: value.components ? value.components.map(ParamType.fromObject) : null
    });
  }
  static fromString(value, allowIndexed) {
    function ParamTypify(node) {
      return ParamType.fromObject({
        name: node.name,
        type: node.type,
        indexed: node.indexed,
        components: node.components
      });
    }
    return ParamTypify(parseParamType(value, !!allowIndexed));
  }
  static isParamType(value) {
    return !!(value != null && value._isParamType);
  }
}
function parseParams(value, allowIndex) {
  return splitNesting(value).map((param) => ParamType.fromString(param, allowIndex));
}
class Fragment {
  constructor(constructorGuard, params) {
    if (constructorGuard !== _constructorGuard) {
      logger$4.throwError("use a static from method", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new Fragment()"
      });
    }
    populate(this, params);
    this._isFragment = true;
    Object.freeze(this);
  }
  static from(value) {
    if (Fragment.isFragment(value)) {
      return value;
    }
    if (typeof value === "string") {
      return Fragment.fromString(value);
    }
    return Fragment.fromObject(value);
  }
  static fromObject(value) {
    if (Fragment.isFragment(value)) {
      return value;
    }
    switch (value.type) {
      case "function":
        return FunctionFragment.fromObject(value);
      case "event":
        return EventFragment.fromObject(value);
      case "constructor":
        return ConstructorFragment.fromObject(value);
      case "error":
        return ErrorFragment.fromObject(value);
      case "fallback":
      case "receive":
        return null;
    }
    return logger$4.throwArgumentError("invalid fragment object", "value", value);
  }
  static fromString(value) {
    value = value.replace(/\s/g, " ");
    value = value.replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ");
    value = value.trim();
    if (value.split(" ")[0] === "event") {
      return EventFragment.fromString(value.substring(5).trim());
    } else if (value.split(" ")[0] === "function") {
      return FunctionFragment.fromString(value.substring(8).trim());
    } else if (value.split("(")[0].trim() === "constructor") {
      return ConstructorFragment.fromString(value.trim());
    } else if (value.split(" ")[0] === "error") {
      return ErrorFragment.fromString(value.substring(5).trim());
    }
    return logger$4.throwArgumentError("unsupported fragment", "value", value);
  }
  static isFragment(value) {
    return !!(value && value._isFragment);
  }
}
class EventFragment extends Fragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }
    if (!FormatTypes[format]) {
      logger$4.throwArgumentError("invalid format type", "format", format);
    }
    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
      });
    }
    let result = "";
    if (format !== FormatTypes.sighash) {
      result += "event ";
    }
    result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
    if (format !== FormatTypes.sighash) {
      if (this.anonymous) {
        result += "anonymous ";
      }
    }
    return result.trim();
  }
  static from(value) {
    if (typeof value === "string") {
      return EventFragment.fromString(value);
    }
    return EventFragment.fromObject(value);
  }
  static fromObject(value) {
    if (EventFragment.isEventFragment(value)) {
      return value;
    }
    if (value.type !== "event") {
      logger$4.throwArgumentError("invalid event object", "value", value);
    }
    const params = {
      name: verifyIdentifier(value.name),
      anonymous: value.anonymous,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      type: "event"
    };
    return new EventFragment(_constructorGuard, params);
  }
  static fromString(value) {
    let match = value.match(regexParen);
    if (!match) {
      logger$4.throwArgumentError("invalid event string", "value", value);
    }
    let anonymous = false;
    match[3].split(" ").forEach((modifier) => {
      switch (modifier.trim()) {
        case "anonymous":
          anonymous = true;
          break;
        case "":
          break;
        default:
          logger$4.warn("unknown modifier: " + modifier);
      }
    });
    return EventFragment.fromObject({
      name: match[1].trim(),
      anonymous,
      inputs: parseParams(match[2], true),
      type: "event"
    });
  }
  static isEventFragment(value) {
    return value && value._isFragment && value.type === "event";
  }
}
function parseGas(value, params) {
  params.gas = null;
  let comps = value.split("@");
  if (comps.length !== 1) {
    if (comps.length > 2) {
      logger$4.throwArgumentError("invalid human-readable ABI signature", "value", value);
    }
    if (!comps[1].match(/^[0-9]+$/)) {
      logger$4.throwArgumentError("invalid human-readable ABI signature gas", "value", value);
    }
    params.gas = BigNumber.from(comps[1]);
    return comps[0];
  }
  return value;
}
function parseModifiers(value, params) {
  params.constant = false;
  params.payable = false;
  params.stateMutability = "nonpayable";
  value.split(" ").forEach((modifier) => {
    switch (modifier.trim()) {
      case "constant":
        params.constant = true;
        break;
      case "payable":
        params.payable = true;
        params.stateMutability = "payable";
        break;
      case "nonpayable":
        params.payable = false;
        params.stateMutability = "nonpayable";
        break;
      case "pure":
        params.constant = true;
        params.stateMutability = "pure";
        break;
      case "view":
        params.constant = true;
        params.stateMutability = "view";
        break;
      case "external":
      case "public":
      case "":
        break;
      default:
        console.log("unknown modifier: " + modifier);
    }
  });
}
function verifyState(value) {
  let result = {
    constant: false,
    payable: true,
    stateMutability: "payable"
  };
  if (value.stateMutability != null) {
    result.stateMutability = value.stateMutability;
    result.constant = result.stateMutability === "view" || result.stateMutability === "pure";
    if (value.constant != null) {
      if (!!value.constant !== result.constant) {
        logger$4.throwArgumentError("cannot have constant function with mutability " + result.stateMutability, "value", value);
      }
    }
    result.payable = result.stateMutability === "payable";
    if (value.payable != null) {
      if (!!value.payable !== result.payable) {
        logger$4.throwArgumentError("cannot have payable function with mutability " + result.stateMutability, "value", value);
      }
    }
  } else if (value.payable != null) {
    result.payable = !!value.payable;
    if (value.constant == null && !result.payable && value.type !== "constructor") {
      logger$4.throwArgumentError("unable to determine stateMutability", "value", value);
    }
    result.constant = !!value.constant;
    if (result.constant) {
      result.stateMutability = "view";
    } else {
      result.stateMutability = result.payable ? "payable" : "nonpayable";
    }
    if (result.payable && result.constant) {
      logger$4.throwArgumentError("cannot have constant payable function", "value", value);
    }
  } else if (value.constant != null) {
    result.constant = !!value.constant;
    result.payable = !result.constant;
    result.stateMutability = result.constant ? "view" : "payable";
  } else if (value.type !== "constructor") {
    logger$4.throwArgumentError("unable to determine stateMutability", "value", value);
  }
  return result;
}
class ConstructorFragment extends Fragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }
    if (!FormatTypes[format]) {
      logger$4.throwArgumentError("invalid format type", "format", format);
    }
    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas ? this.gas.toNumber() : void 0,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
      });
    }
    if (format === FormatTypes.sighash) {
      logger$4.throwError("cannot format a constructor for sighash", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "format(sighash)"
      });
    }
    let result = "constructor(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
    if (this.stateMutability && this.stateMutability !== "nonpayable") {
      result += this.stateMutability + " ";
    }
    return result.trim();
  }
  static from(value) {
    if (typeof value === "string") {
      return ConstructorFragment.fromString(value);
    }
    return ConstructorFragment.fromObject(value);
  }
  static fromObject(value) {
    if (ConstructorFragment.isConstructorFragment(value)) {
      return value;
    }
    if (value.type !== "constructor") {
      logger$4.throwArgumentError("invalid constructor object", "value", value);
    }
    let state = verifyState(value);
    if (state.constant) {
      logger$4.throwArgumentError("constructor cannot be constant", "value", value);
    }
    const params = {
      name: null,
      type: value.type,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      payable: state.payable,
      stateMutability: state.stateMutability,
      gas: value.gas ? BigNumber.from(value.gas) : null
    };
    return new ConstructorFragment(_constructorGuard, params);
  }
  static fromString(value) {
    let params = { type: "constructor" };
    value = parseGas(value, params);
    let parens = value.match(regexParen);
    if (!parens || parens[1].trim() !== "constructor") {
      logger$4.throwArgumentError("invalid constructor string", "value", value);
    }
    params.inputs = parseParams(parens[2].trim(), false);
    parseModifiers(parens[3].trim(), params);
    return ConstructorFragment.fromObject(params);
  }
  static isConstructorFragment(value) {
    return value && value._isFragment && value.type === "constructor";
  }
}
class FunctionFragment extends ConstructorFragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }
    if (!FormatTypes[format]) {
      logger$4.throwArgumentError("invalid format type", "format", format);
    }
    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas ? this.gas.toNumber() : void 0,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format))),
        outputs: this.outputs.map((output) => JSON.parse(output.format(format)))
      });
    }
    let result = "";
    if (format !== FormatTypes.sighash) {
      result += "function ";
    }
    result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
    if (format !== FormatTypes.sighash) {
      if (this.stateMutability) {
        if (this.stateMutability !== "nonpayable") {
          result += this.stateMutability + " ";
        }
      } else if (this.constant) {
        result += "view ";
      }
      if (this.outputs && this.outputs.length) {
        result += "returns (" + this.outputs.map((output) => output.format(format)).join(", ") + ") ";
      }
      if (this.gas != null) {
        result += "@" + this.gas.toString() + " ";
      }
    }
    return result.trim();
  }
  static from(value) {
    if (typeof value === "string") {
      return FunctionFragment.fromString(value);
    }
    return FunctionFragment.fromObject(value);
  }
  static fromObject(value) {
    if (FunctionFragment.isFunctionFragment(value)) {
      return value;
    }
    if (value.type !== "function") {
      logger$4.throwArgumentError("invalid function object", "value", value);
    }
    let state = verifyState(value);
    const params = {
      type: value.type,
      name: verifyIdentifier(value.name),
      constant: state.constant,
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
      outputs: value.outputs ? value.outputs.map(ParamType.fromObject) : [],
      payable: state.payable,
      stateMutability: state.stateMutability,
      gas: value.gas ? BigNumber.from(value.gas) : null
    };
    return new FunctionFragment(_constructorGuard, params);
  }
  static fromString(value) {
    let params = { type: "function" };
    value = parseGas(value, params);
    let comps = value.split(" returns ");
    if (comps.length > 2) {
      logger$4.throwArgumentError("invalid function string", "value", value);
    }
    let parens = comps[0].match(regexParen);
    if (!parens) {
      logger$4.throwArgumentError("invalid function signature", "value", value);
    }
    params.name = parens[1].trim();
    if (params.name) {
      verifyIdentifier(params.name);
    }
    params.inputs = parseParams(parens[2], false);
    parseModifiers(parens[3].trim(), params);
    if (comps.length > 1) {
      let returns = comps[1].match(regexParen);
      if (returns[1].trim() != "" || returns[3].trim() != "") {
        logger$4.throwArgumentError("unexpected tokens", "value", value);
      }
      params.outputs = parseParams(returns[2], false);
    } else {
      params.outputs = [];
    }
    return FunctionFragment.fromObject(params);
  }
  static isFunctionFragment(value) {
    return value && value._isFragment && value.type === "function";
  }
}
function checkForbidden(fragment) {
  const sig = fragment.format();
  if (sig === "Error(string)" || sig === "Panic(uint256)") {
    logger$4.throwArgumentError(`cannot specify user defined ${sig} error`, "fragment", fragment);
  }
  return fragment;
}
class ErrorFragment extends Fragment {
  format(format) {
    if (!format) {
      format = FormatTypes.sighash;
    }
    if (!FormatTypes[format]) {
      logger$4.throwArgumentError("invalid format type", "format", format);
    }
    if (format === FormatTypes.json) {
      return JSON.stringify({
        type: "error",
        name: this.name,
        inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
      });
    }
    let result = "";
    if (format !== FormatTypes.sighash) {
      result += "error ";
    }
    result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
    return result.trim();
  }
  static from(value) {
    if (typeof value === "string") {
      return ErrorFragment.fromString(value);
    }
    return ErrorFragment.fromObject(value);
  }
  static fromObject(value) {
    if (ErrorFragment.isErrorFragment(value)) {
      return value;
    }
    if (value.type !== "error") {
      logger$4.throwArgumentError("invalid error object", "value", value);
    }
    const params = {
      type: value.type,
      name: verifyIdentifier(value.name),
      inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : []
    };
    return checkForbidden(new ErrorFragment(_constructorGuard, params));
  }
  static fromString(value) {
    let params = { type: "error" };
    let parens = value.match(regexParen);
    if (!parens) {
      logger$4.throwArgumentError("invalid error signature", "value", value);
    }
    params.name = parens[1].trim();
    if (params.name) {
      verifyIdentifier(params.name);
    }
    params.inputs = parseParams(parens[2], false);
    return checkForbidden(ErrorFragment.fromObject(params));
  }
  static isErrorFragment(value) {
    return value && value._isFragment && value.type === "error";
  }
}
function verifyType(type) {
  if (type.match(/^uint($|[^1-9])/)) {
    type = "uint256" + type.substring(4);
  } else if (type.match(/^int($|[^1-9])/)) {
    type = "int256" + type.substring(3);
  }
  return type;
}
const regexIdentifier = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
function verifyIdentifier(value) {
  if (!value || !value.match(regexIdentifier)) {
    logger$4.throwArgumentError(`invalid identifier "${value}"`, "value", value);
  }
  return value;
}
const regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
function splitNesting(value) {
  value = value.trim();
  let result = [];
  let accum = "";
  let depth = 0;
  for (let offset = 0; offset < value.length; offset++) {
    let c2 = value[offset];
    if (c2 === "," && depth === 0) {
      result.push(accum);
      accum = "";
    } else {
      accum += c2;
      if (c2 === "(") {
        depth++;
      } else if (c2 === ")") {
        depth--;
        if (depth === -1) {
          logger$4.throwArgumentError("unbalanced parenthesis", "value", value);
        }
      }
    }
  }
  if (accum) {
    result.push(accum);
  }
  return result;
}
const logger$3 = new Logger(version);
class Coder {
  constructor(name, type, localName, dynamic) {
    this.name = name;
    this.type = type;
    this.localName = localName;
    this.dynamic = dynamic;
  }
  _throwError(message, value) {
    logger$3.throwArgumentError(message, this.localName, value);
  }
}
class Writer {
  constructor(wordSize) {
    defineReadOnly(this, "wordSize", wordSize || 32);
    this._data = [];
    this._dataLength = 0;
    this._padding = new Uint8Array(wordSize);
  }
  get data() {
    return hexConcat(this._data);
  }
  get length() {
    return this._dataLength;
  }
  _writeData(data) {
    this._data.push(data);
    this._dataLength += data.length;
    return data.length;
  }
  appendWriter(writer) {
    return this._writeData(concat(writer._data));
  }
  // Arrayish items; padded on the right to wordSize
  writeBytes(value) {
    let bytes = arrayify(value);
    const paddingOffset = bytes.length % this.wordSize;
    if (paddingOffset) {
      bytes = concat([bytes, this._padding.slice(paddingOffset)]);
    }
    return this._writeData(bytes);
  }
  _getValue(value) {
    let bytes = arrayify(BigNumber.from(value));
    if (bytes.length > this.wordSize) {
      logger$3.throwError("value out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
        length: this.wordSize,
        offset: bytes.length
      });
    }
    if (bytes.length % this.wordSize) {
      bytes = concat([this._padding.slice(bytes.length % this.wordSize), bytes]);
    }
    return bytes;
  }
  // BigNumberish items; padded on the left to wordSize
  writeValue(value) {
    return this._writeData(this._getValue(value));
  }
  writeUpdatableValue() {
    const offset = this._data.length;
    this._data.push(this._padding);
    this._dataLength += this.wordSize;
    return (value) => {
      this._data[offset] = this._getValue(value);
    };
  }
}
class Reader {
  constructor(data, wordSize, coerceFunc, allowLoose) {
    defineReadOnly(this, "_data", arrayify(data));
    defineReadOnly(this, "wordSize", wordSize || 32);
    defineReadOnly(this, "_coerceFunc", coerceFunc);
    defineReadOnly(this, "allowLoose", allowLoose);
    this._offset = 0;
  }
  get data() {
    return hexlify(this._data);
  }
  get consumed() {
    return this._offset;
  }
  // The default Coerce function
  static coerce(name, value) {
    let match = name.match("^u?int([0-9]+)$");
    if (match && parseInt(match[1]) <= 48) {
      value = value.toNumber();
    }
    return value;
  }
  coerce(name, value) {
    if (this._coerceFunc) {
      return this._coerceFunc(name, value);
    }
    return Reader.coerce(name, value);
  }
  _peekBytes(offset, length, loose) {
    let alignedLength = Math.ceil(length / this.wordSize) * this.wordSize;
    if (this._offset + alignedLength > this._data.length) {
      if (this.allowLoose && loose && this._offset + length <= this._data.length) {
        alignedLength = length;
      } else {
        logger$3.throwError("data out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
          length: this._data.length,
          offset: this._offset + alignedLength
        });
      }
    }
    return this._data.slice(this._offset, this._offset + alignedLength);
  }
  subReader(offset) {
    return new Reader(this._data.slice(this._offset + offset), this.wordSize, this._coerceFunc, this.allowLoose);
  }
  readBytes(length, loose) {
    let bytes = this._peekBytes(0, length, !!loose);
    this._offset += bytes.length;
    return bytes.slice(0, length);
  }
  readValue() {
    return BigNumber.from(this.readBytes(this.wordSize));
  }
}
class AddressCoder extends Coder {
  constructor(localName) {
    super("address", "address", localName, false);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(writer, value) {
    try {
      value = getAddress(value);
    } catch (error) {
      this._throwError(error.message, value);
    }
    return writer.writeValue(value);
  }
  decode(reader) {
    return getAddress(hexZeroPad(reader.readValue().toHexString(), 20));
  }
}
class AnonymousCoder extends Coder {
  constructor(coder) {
    super(coder.name, coder.type, void 0, coder.dynamic);
    this.coder = coder;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(writer, value) {
    return this.coder.encode(writer, value);
  }
  decode(reader) {
    return this.coder.decode(reader);
  }
}
const logger$2 = new Logger(version);
function pack(writer, coders, values) {
  let arrayValues = null;
  if (Array.isArray(values)) {
    arrayValues = values;
  } else if (values && typeof values === "object") {
    let unique = {};
    arrayValues = coders.map((coder) => {
      const name = coder.localName;
      if (!name) {
        logger$2.throwError("cannot encode object for signature with missing names", Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder,
          value: values
        });
      }
      if (unique[name]) {
        logger$2.throwError("cannot encode object for signature with duplicate names", Logger.errors.INVALID_ARGUMENT, {
          argument: "values",
          coder,
          value: values
        });
      }
      unique[name] = true;
      return values[name];
    });
  } else {
    logger$2.throwArgumentError("invalid tuple value", "tuple", values);
  }
  if (coders.length !== arrayValues.length) {
    logger$2.throwArgumentError("types/value length mismatch", "tuple", values);
  }
  let staticWriter = new Writer(writer.wordSize);
  let dynamicWriter = new Writer(writer.wordSize);
  let updateFuncs = [];
  coders.forEach((coder, index) => {
    let value = arrayValues[index];
    if (coder.dynamic) {
      let dynamicOffset = dynamicWriter.length;
      coder.encode(dynamicWriter, value);
      let updateFunc = staticWriter.writeUpdatableValue();
      updateFuncs.push((baseOffset) => {
        updateFunc(baseOffset + dynamicOffset);
      });
    } else {
      coder.encode(staticWriter, value);
    }
  });
  updateFuncs.forEach((func) => {
    func(staticWriter.length);
  });
  let length = writer.appendWriter(staticWriter);
  length += writer.appendWriter(dynamicWriter);
  return length;
}
function unpack(reader, coders) {
  let values = [];
  let baseReader = reader.subReader(0);
  coders.forEach((coder) => {
    let value = null;
    if (coder.dynamic) {
      let offset = reader.readValue();
      let offsetReader = baseReader.subReader(offset.toNumber());
      try {
        value = coder.decode(offsetReader);
      } catch (error) {
        if (error.code === Logger.errors.BUFFER_OVERRUN) {
          throw error;
        }
        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    } else {
      try {
        value = coder.decode(reader);
      } catch (error) {
        if (error.code === Logger.errors.BUFFER_OVERRUN) {
          throw error;
        }
        value = error;
        value.baseType = coder.name;
        value.name = coder.localName;
        value.type = coder.type;
      }
    }
    if (value != void 0) {
      values.push(value);
    }
  });
  const uniqueNames = coders.reduce((accum, coder) => {
    const name = coder.localName;
    if (name) {
      if (!accum[name]) {
        accum[name] = 0;
      }
      accum[name]++;
    }
    return accum;
  }, {});
  coders.forEach((coder, index) => {
    let name = coder.localName;
    if (!name || uniqueNames[name] !== 1) {
      return;
    }
    if (name === "length") {
      name = "_length";
    }
    if (values[name] != null) {
      return;
    }
    const value = values[index];
    if (value instanceof Error) {
      Object.defineProperty(values, name, {
        enumerable: true,
        get: () => {
          throw value;
        }
      });
    } else {
      values[name] = value;
    }
  });
  for (let i2 = 0; i2 < values.length; i2++) {
    const value = values[i2];
    if (value instanceof Error) {
      Object.defineProperty(values, i2, {
        enumerable: true,
        get: () => {
          throw value;
        }
      });
    }
  }
  return Object.freeze(values);
}
class ArrayCoder extends Coder {
  constructor(coder, length, localName) {
    const type = coder.type + "[" + (length >= 0 ? length : "") + "]";
    const dynamic = length === -1 || coder.dynamic;
    super("array", type, localName, dynamic);
    this.coder = coder;
    this.length = length;
  }
  defaultValue() {
    const defaultChild = this.coder.defaultValue();
    const result = [];
    for (let i2 = 0; i2 < this.length; i2++) {
      result.push(defaultChild);
    }
    return result;
  }
  encode(writer, value) {
    if (!Array.isArray(value)) {
      this._throwError("expected array value", value);
    }
    let count = this.length;
    if (count === -1) {
      count = value.length;
      writer.writeValue(value.length);
    }
    logger$2.checkArgumentCount(value.length, count, "coder array" + (this.localName ? " " + this.localName : ""));
    let coders = [];
    for (let i2 = 0; i2 < value.length; i2++) {
      coders.push(this.coder);
    }
    return pack(writer, coders, value);
  }
  decode(reader) {
    let count = this.length;
    if (count === -1) {
      count = reader.readValue().toNumber();
      if (count * 32 > reader._data.length) {
        logger$2.throwError("insufficient data length", Logger.errors.BUFFER_OVERRUN, {
          length: reader._data.length,
          count
        });
      }
    }
    let coders = [];
    for (let i2 = 0; i2 < count; i2++) {
      coders.push(new AnonymousCoder(this.coder));
    }
    return reader.coerce(this.name, unpack(reader, coders));
  }
}
class BooleanCoder extends Coder {
  constructor(localName) {
    super("bool", "bool", localName, false);
  }
  defaultValue() {
    return false;
  }
  encode(writer, value) {
    return writer.writeValue(value ? 1 : 0);
  }
  decode(reader) {
    return reader.coerce(this.type, !reader.readValue().isZero());
  }
}
class DynamicBytesCoder extends Coder {
  constructor(type, localName) {
    super(type, type, localName, true);
  }
  defaultValue() {
    return "0x";
  }
  encode(writer, value) {
    value = arrayify(value);
    let length = writer.writeValue(value.length);
    length += writer.writeBytes(value);
    return length;
  }
  decode(reader) {
    return reader.readBytes(reader.readValue().toNumber(), true);
  }
}
class BytesCoder extends DynamicBytesCoder {
  constructor(localName) {
    super("bytes", localName);
  }
  decode(reader) {
    return reader.coerce(this.name, hexlify(super.decode(reader)));
  }
}
class FixedBytesCoder extends Coder {
  constructor(size, localName) {
    let name = "bytes" + String(size);
    super(name, name, localName, false);
    this.size = size;
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(writer, value) {
    let data = arrayify(value);
    if (data.length !== this.size) {
      this._throwError("incorrect data length", value);
    }
    return writer.writeBytes(data);
  }
  decode(reader) {
    return reader.coerce(this.name, hexlify(reader.readBytes(this.size)));
  }
}
class NullCoder extends Coder {
  constructor(localName) {
    super("null", "", localName, false);
  }
  defaultValue() {
    return null;
  }
  encode(writer, value) {
    if (value != null) {
      this._throwError("not null", value);
    }
    return writer.writeBytes([]);
  }
  decode(reader) {
    reader.readBytes(0);
    return reader.coerce(this.name, null);
  }
}
class NumberCoder extends Coder {
  constructor(size, signed, localName) {
    const name = (signed ? "int" : "uint") + size * 8;
    super(name, name, localName, false);
    this.size = size;
    this.signed = signed;
  }
  defaultValue() {
    return 0;
  }
  encode(writer, value) {
    let v2 = BigNumber.from(value);
    let maxUintValue = MaxUint256.mask(writer.wordSize * 8);
    if (this.signed) {
      let bounds = maxUintValue.mask(this.size * 8 - 1);
      if (v2.gt(bounds) || v2.lt(bounds.add(One).mul(NegativeOne))) {
        this._throwError("value out-of-bounds", value);
      }
    } else if (v2.lt(Zero) || v2.gt(maxUintValue.mask(this.size * 8))) {
      this._throwError("value out-of-bounds", value);
    }
    v2 = v2.toTwos(this.size * 8).mask(this.size * 8);
    if (this.signed) {
      v2 = v2.fromTwos(this.size * 8).toTwos(8 * writer.wordSize);
    }
    return writer.writeValue(v2);
  }
  decode(reader) {
    let value = reader.readValue().mask(this.size * 8);
    if (this.signed) {
      value = value.fromTwos(this.size * 8);
    }
    return reader.coerce(this.name, value);
  }
}
class StringCoder extends DynamicBytesCoder {
  constructor(localName) {
    super("string", localName);
  }
  defaultValue() {
    return "";
  }
  encode(writer, value) {
    return super.encode(writer, toUtf8Bytes(value));
  }
  decode(reader) {
    return toUtf8String(super.decode(reader));
  }
}
class TupleCoder extends Coder {
  constructor(coders, localName) {
    let dynamic = false;
    const types = [];
    coders.forEach((coder) => {
      if (coder.dynamic) {
        dynamic = true;
      }
      types.push(coder.type);
    });
    const type = "tuple(" + types.join(",") + ")";
    super("tuple", type, localName, dynamic);
    this.coders = coders;
  }
  defaultValue() {
    const values = [];
    this.coders.forEach((coder) => {
      values.push(coder.defaultValue());
    });
    const uniqueNames = this.coders.reduce((accum, coder) => {
      const name = coder.localName;
      if (name) {
        if (!accum[name]) {
          accum[name] = 0;
        }
        accum[name]++;
      }
      return accum;
    }, {});
    this.coders.forEach((coder, index) => {
      let name = coder.localName;
      if (!name || uniqueNames[name] !== 1) {
        return;
      }
      if (name === "length") {
        name = "_length";
      }
      if (values[name] != null) {
        return;
      }
      values[name] = values[index];
    });
    return Object.freeze(values);
  }
  encode(writer, value) {
    return pack(writer, this.coders, value);
  }
  decode(reader) {
    return reader.coerce(this.name, unpack(reader, this.coders));
  }
}
const logger$1 = new Logger(version);
const paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
const paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
class AbiCoder {
  constructor(coerceFunc) {
    defineReadOnly(this, "coerceFunc", coerceFunc || null);
  }
  _getCoder(param) {
    switch (param.baseType) {
      case "address":
        return new AddressCoder(param.name);
      case "bool":
        return new BooleanCoder(param.name);
      case "string":
        return new StringCoder(param.name);
      case "bytes":
        return new BytesCoder(param.name);
      case "array":
        return new ArrayCoder(this._getCoder(param.arrayChildren), param.arrayLength, param.name);
      case "tuple":
        return new TupleCoder((param.components || []).map((component) => {
          return this._getCoder(component);
        }), param.name);
      case "":
        return new NullCoder(param.name);
    }
    let match = param.type.match(paramTypeNumber);
    if (match) {
      let size = parseInt(match[2] || "256");
      if (size === 0 || size > 256 || size % 8 !== 0) {
        logger$1.throwArgumentError("invalid " + match[1] + " bit length", "param", param);
      }
      return new NumberCoder(size / 8, match[1] === "int", param.name);
    }
    match = param.type.match(paramTypeBytes);
    if (match) {
      let size = parseInt(match[1]);
      if (size === 0 || size > 32) {
        logger$1.throwArgumentError("invalid bytes length", "param", param);
      }
      return new FixedBytesCoder(size, param.name);
    }
    return logger$1.throwArgumentError("invalid type", "type", param.type);
  }
  _getWordSize() {
    return 32;
  }
  _getReader(data, allowLoose) {
    return new Reader(data, this._getWordSize(), this.coerceFunc, allowLoose);
  }
  _getWriter() {
    return new Writer(this._getWordSize());
  }
  getDefaultValue(types) {
    const coders = types.map((type) => this._getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    return coder.defaultValue();
  }
  encode(types, values) {
    if (types.length !== values.length) {
      logger$1.throwError("types/values length mismatch", Logger.errors.INVALID_ARGUMENT, {
        count: { types: types.length, values: values.length },
        value: { types, values }
      });
    }
    const coders = types.map((type) => this._getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    const writer = this._getWriter();
    coder.encode(writer, values);
    return writer.data;
  }
  decode(types, data, loose) {
    const coders = types.map((type) => this._getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, "_");
    return coder.decode(this._getReader(arrayify(data), loose));
  }
}
const defaultAbiCoder = new AbiCoder();
const logger = new Logger(version);
class LogDescription extends Description {
}
class TransactionDescription extends Description {
}
class ErrorDescription extends Description {
}
class Indexed extends Description {
  static isIndexed(value) {
    return !!(value && value._isIndexed);
  }
}
const BuiltinErrors = {
  "0x08c379a0": { signature: "Error(string)", name: "Error", inputs: ["string"], reason: true },
  "0x4e487b71": { signature: "Panic(uint256)", name: "Panic", inputs: ["uint256"] }
};
function wrapAccessError(property, error) {
  const wrap = new Error(`deferred error during ABI decoding triggered accessing ${property}`);
  wrap.error = error;
  return wrap;
}
class Interface {
  constructor(fragments) {
    let abi = [];
    if (typeof fragments === "string") {
      abi = JSON.parse(fragments);
    } else {
      abi = fragments;
    }
    defineReadOnly(this, "fragments", abi.map((fragment) => {
      return Fragment.from(fragment);
    }).filter((fragment) => fragment != null));
    defineReadOnly(this, "_abiCoder", getStatic(new.target, "getAbiCoder")());
    defineReadOnly(this, "functions", {});
    defineReadOnly(this, "errors", {});
    defineReadOnly(this, "events", {});
    defineReadOnly(this, "structs", {});
    this.fragments.forEach((fragment) => {
      let bucket = null;
      switch (fragment.type) {
        case "constructor":
          if (this.deploy) {
            logger.warn("duplicate definition - constructor");
            return;
          }
          defineReadOnly(this, "deploy", fragment);
          return;
        case "function":
          bucket = this.functions;
          break;
        case "event":
          bucket = this.events;
          break;
        case "error":
          bucket = this.errors;
          break;
        default:
          return;
      }
      let signature = fragment.format();
      if (bucket[signature]) {
        logger.warn("duplicate definition - " + signature);
        return;
      }
      bucket[signature] = fragment;
    });
    if (!this.deploy) {
      defineReadOnly(this, "deploy", ConstructorFragment.from({
        payable: false,
        type: "constructor"
      }));
    }
    defineReadOnly(this, "_isInterface", true);
  }
  format(format) {
    if (!format) {
      format = FormatTypes.full;
    }
    if (format === FormatTypes.sighash) {
      logger.throwArgumentError("interface does not support formatting sighash", "format", format);
    }
    const abi = this.fragments.map((fragment) => fragment.format(format));
    if (format === FormatTypes.json) {
      return JSON.stringify(abi.map((j2) => JSON.parse(j2)));
    }
    return abi;
  }
  // Sub-classes can override these to handle other blockchains
  static getAbiCoder() {
    return defaultAbiCoder;
  }
  static getAddress(address) {
    return getAddress(address);
  }
  static getSighash(fragment) {
    return hexDataSlice(id(fragment.format()), 0, 4);
  }
  static getEventTopic(eventFragment) {
    return id(eventFragment.format());
  }
  // Find a function definition by any means necessary (unless it is ambiguous)
  getFunction(nameOrSignatureOrSighash) {
    if (isHexString(nameOrSignatureOrSighash)) {
      for (const name in this.functions) {
        if (nameOrSignatureOrSighash === this.getSighash(name)) {
          return this.functions[name];
        }
      }
      logger.throwArgumentError("no matching function", "sighash", nameOrSignatureOrSighash);
    }
    if (nameOrSignatureOrSighash.indexOf("(") === -1) {
      const name = nameOrSignatureOrSighash.trim();
      const matching = Object.keys(this.functions).filter((f2) => f2.split(
        "("
        /* fix:) */
      )[0] === name);
      if (matching.length === 0) {
        logger.throwArgumentError("no matching function", "name", name);
      } else if (matching.length > 1) {
        logger.throwArgumentError("multiple matching functions", "name", name);
      }
      return this.functions[matching[0]];
    }
    const result = this.functions[FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
    if (!result) {
      logger.throwArgumentError("no matching function", "signature", nameOrSignatureOrSighash);
    }
    return result;
  }
  // Find an event definition by any means necessary (unless it is ambiguous)
  getEvent(nameOrSignatureOrTopic) {
    if (isHexString(nameOrSignatureOrTopic)) {
      const topichash = nameOrSignatureOrTopic.toLowerCase();
      for (const name in this.events) {
        if (topichash === this.getEventTopic(name)) {
          return this.events[name];
        }
      }
      logger.throwArgumentError("no matching event", "topichash", topichash);
    }
    if (nameOrSignatureOrTopic.indexOf("(") === -1) {
      const name = nameOrSignatureOrTopic.trim();
      const matching = Object.keys(this.events).filter((f2) => f2.split(
        "("
        /* fix:) */
      )[0] === name);
      if (matching.length === 0) {
        logger.throwArgumentError("no matching event", "name", name);
      } else if (matching.length > 1) {
        logger.throwArgumentError("multiple matching events", "name", name);
      }
      return this.events[matching[0]];
    }
    const result = this.events[EventFragment.fromString(nameOrSignatureOrTopic).format()];
    if (!result) {
      logger.throwArgumentError("no matching event", "signature", nameOrSignatureOrTopic);
    }
    return result;
  }
  // Find a function definition by any means necessary (unless it is ambiguous)
  getError(nameOrSignatureOrSighash) {
    if (isHexString(nameOrSignatureOrSighash)) {
      const getSighash = getStatic(this.constructor, "getSighash");
      for (const name in this.errors) {
        const error = this.errors[name];
        if (nameOrSignatureOrSighash === getSighash(error)) {
          return this.errors[name];
        }
      }
      logger.throwArgumentError("no matching error", "sighash", nameOrSignatureOrSighash);
    }
    if (nameOrSignatureOrSighash.indexOf("(") === -1) {
      const name = nameOrSignatureOrSighash.trim();
      const matching = Object.keys(this.errors).filter((f2) => f2.split(
        "("
        /* fix:) */
      )[0] === name);
      if (matching.length === 0) {
        logger.throwArgumentError("no matching error", "name", name);
      } else if (matching.length > 1) {
        logger.throwArgumentError("multiple matching errors", "name", name);
      }
      return this.errors[matching[0]];
    }
    const result = this.errors[FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
    if (!result) {
      logger.throwArgumentError("no matching error", "signature", nameOrSignatureOrSighash);
    }
    return result;
  }
  // Get the sighash (the bytes4 selector) used by Solidity to identify a function
  getSighash(fragment) {
    if (typeof fragment === "string") {
      try {
        fragment = this.getFunction(fragment);
      } catch (error) {
        try {
          fragment = this.getError(fragment);
        } catch (_2) {
          throw error;
        }
      }
    }
    return getStatic(this.constructor, "getSighash")(fragment);
  }
  // Get the topic (the bytes32 hash) used by Solidity to identify an event
  getEventTopic(eventFragment) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    return getStatic(this.constructor, "getEventTopic")(eventFragment);
  }
  _decodeParams(params, data) {
    return this._abiCoder.decode(params, data);
  }
  _encodeParams(params, values) {
    return this._abiCoder.encode(params, values);
  }
  encodeDeploy(values) {
    return this._encodeParams(this.deploy.inputs, values || []);
  }
  decodeErrorResult(fragment, data) {
    if (typeof fragment === "string") {
      fragment = this.getError(fragment);
    }
    const bytes = arrayify(data);
    if (hexlify(bytes.slice(0, 4)) !== this.getSighash(fragment)) {
      logger.throwArgumentError(`data signature does not match error ${fragment.name}.`, "data", hexlify(bytes));
    }
    return this._decodeParams(fragment.inputs, bytes.slice(4));
  }
  encodeErrorResult(fragment, values) {
    if (typeof fragment === "string") {
      fragment = this.getError(fragment);
    }
    return hexlify(concat([
      this.getSighash(fragment),
      this._encodeParams(fragment.inputs, values || [])
    ]));
  }
  // Decode the data for a function call (e.g. tx.data)
  decodeFunctionData(functionFragment, data) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    const bytes = arrayify(data);
    if (hexlify(bytes.slice(0, 4)) !== this.getSighash(functionFragment)) {
      logger.throwArgumentError(`data signature does not match function ${functionFragment.name}.`, "data", hexlify(bytes));
    }
    return this._decodeParams(functionFragment.inputs, bytes.slice(4));
  }
  // Encode the data for a function call (e.g. tx.data)
  encodeFunctionData(functionFragment, values) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    return hexlify(concat([
      this.getSighash(functionFragment),
      this._encodeParams(functionFragment.inputs, values || [])
    ]));
  }
  // Decode the result from a function call (e.g. from eth_call)
  decodeFunctionResult(functionFragment, data) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    let bytes = arrayify(data);
    let reason = null;
    let message = "";
    let errorArgs = null;
    let errorName = null;
    let errorSignature = null;
    switch (bytes.length % this._abiCoder._getWordSize()) {
      case 0:
        try {
          return this._abiCoder.decode(functionFragment.outputs, bytes);
        } catch (error) {
        }
        break;
      case 4: {
        const selector = hexlify(bytes.slice(0, 4));
        const builtin = BuiltinErrors[selector];
        if (builtin) {
          errorArgs = this._abiCoder.decode(builtin.inputs, bytes.slice(4));
          errorName = builtin.name;
          errorSignature = builtin.signature;
          if (builtin.reason) {
            reason = errorArgs[0];
          }
          if (errorName === "Error") {
            message = `; VM Exception while processing transaction: reverted with reason string ${JSON.stringify(errorArgs[0])}`;
          } else if (errorName === "Panic") {
            message = `; VM Exception while processing transaction: reverted with panic code ${errorArgs[0]}`;
          }
        } else {
          try {
            const error = this.getError(selector);
            errorArgs = this._abiCoder.decode(error.inputs, bytes.slice(4));
            errorName = error.name;
            errorSignature = error.format();
          } catch (error) {
          }
        }
        break;
      }
    }
    return logger.throwError("call revert exception" + message, Logger.errors.CALL_EXCEPTION, {
      method: functionFragment.format(),
      data: hexlify(data),
      errorArgs,
      errorName,
      errorSignature,
      reason
    });
  }
  // Encode the result for a function call (e.g. for eth_call)
  encodeFunctionResult(functionFragment, values) {
    if (typeof functionFragment === "string") {
      functionFragment = this.getFunction(functionFragment);
    }
    return hexlify(this._abiCoder.encode(functionFragment.outputs, values || []));
  }
  // Create the filter for the event with search criteria (e.g. for eth_filterLog)
  encodeFilterTopics(eventFragment, values) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    if (values.length > eventFragment.inputs.length) {
      logger.throwError("too many arguments for " + eventFragment.format(), Logger.errors.UNEXPECTED_ARGUMENT, {
        argument: "values",
        value: values
      });
    }
    let topics = [];
    if (!eventFragment.anonymous) {
      topics.push(this.getEventTopic(eventFragment));
    }
    const encodeTopic = (param, value) => {
      if (param.type === "string") {
        return id(value);
      } else if (param.type === "bytes") {
        return keccak256(hexlify(value));
      }
      if (param.type === "bool" && typeof value === "boolean") {
        value = value ? "0x01" : "0x00";
      }
      if (param.type.match(/^u?int/)) {
        value = BigNumber.from(value).toHexString();
      }
      if (param.type === "address") {
        this._abiCoder.encode(["address"], [value]);
      }
      return hexZeroPad(hexlify(value), 32);
    };
    values.forEach((value, index) => {
      let param = eventFragment.inputs[index];
      if (!param.indexed) {
        if (value != null) {
          logger.throwArgumentError("cannot filter non-indexed parameters; must be null", "contract." + param.name, value);
        }
        return;
      }
      if (value == null) {
        topics.push(null);
      } else if (param.baseType === "array" || param.baseType === "tuple") {
        logger.throwArgumentError("filtering with tuples or arrays not supported", "contract." + param.name, value);
      } else if (Array.isArray(value)) {
        topics.push(value.map((value2) => encodeTopic(param, value2)));
      } else {
        topics.push(encodeTopic(param, value));
      }
    });
    while (topics.length && topics[topics.length - 1] === null) {
      topics.pop();
    }
    return topics;
  }
  encodeEventLog(eventFragment, values) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    const topics = [];
    const dataTypes = [];
    const dataValues = [];
    if (!eventFragment.anonymous) {
      topics.push(this.getEventTopic(eventFragment));
    }
    if (values.length !== eventFragment.inputs.length) {
      logger.throwArgumentError("event arguments/values mismatch", "values", values);
    }
    eventFragment.inputs.forEach((param, index) => {
      const value = values[index];
      if (param.indexed) {
        if (param.type === "string") {
          topics.push(id(value));
        } else if (param.type === "bytes") {
          topics.push(keccak256(value));
        } else if (param.baseType === "tuple" || param.baseType === "array") {
          throw new Error("not implemented");
        } else {
          topics.push(this._abiCoder.encode([param.type], [value]));
        }
      } else {
        dataTypes.push(param);
        dataValues.push(value);
      }
    });
    return {
      data: this._abiCoder.encode(dataTypes, dataValues),
      topics
    };
  }
  // Decode a filter for the event and the search criteria
  decodeEventLog(eventFragment, data, topics) {
    if (typeof eventFragment === "string") {
      eventFragment = this.getEvent(eventFragment);
    }
    if (topics != null && !eventFragment.anonymous) {
      let topicHash = this.getEventTopic(eventFragment);
      if (!isHexString(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
        logger.throwError("fragment/topic mismatch", Logger.errors.INVALID_ARGUMENT, { argument: "topics[0]", expected: topicHash, value: topics[0] });
      }
      topics = topics.slice(1);
    }
    let indexed = [];
    let nonIndexed = [];
    let dynamic = [];
    eventFragment.inputs.forEach((param, index) => {
      if (param.indexed) {
        if (param.type === "string" || param.type === "bytes" || param.baseType === "tuple" || param.baseType === "array") {
          indexed.push(ParamType.fromObject({ type: "bytes32", name: param.name }));
          dynamic.push(true);
        } else {
          indexed.push(param);
          dynamic.push(false);
        }
      } else {
        nonIndexed.push(param);
        dynamic.push(false);
      }
    });
    let resultIndexed = topics != null ? this._abiCoder.decode(indexed, concat(topics)) : null;
    let resultNonIndexed = this._abiCoder.decode(nonIndexed, data, true);
    let result = [];
    let nonIndexedIndex = 0, indexedIndex = 0;
    eventFragment.inputs.forEach((param, index) => {
      if (param.indexed) {
        if (resultIndexed == null) {
          result[index] = new Indexed({ _isIndexed: true, hash: null });
        } else if (dynamic[index]) {
          result[index] = new Indexed({ _isIndexed: true, hash: resultIndexed[indexedIndex++] });
        } else {
          try {
            result[index] = resultIndexed[indexedIndex++];
          } catch (error) {
            result[index] = error;
          }
        }
      } else {
        try {
          result[index] = resultNonIndexed[nonIndexedIndex++];
        } catch (error) {
          result[index] = error;
        }
      }
      if (param.name && result[param.name] == null) {
        const value = result[index];
        if (value instanceof Error) {
          Object.defineProperty(result, param.name, {
            enumerable: true,
            get: () => {
              throw wrapAccessError(`property ${JSON.stringify(param.name)}`, value);
            }
          });
        } else {
          result[param.name] = value;
        }
      }
    });
    for (let i2 = 0; i2 < result.length; i2++) {
      const value = result[i2];
      if (value instanceof Error) {
        Object.defineProperty(result, i2, {
          enumerable: true,
          get: () => {
            throw wrapAccessError(`index ${i2}`, value);
          }
        });
      }
    }
    return Object.freeze(result);
  }
  // Given a transaction, find the matching function fragment (if any) and
  // determine all its properties and call parameters
  parseTransaction(tx) {
    let fragment = this.getFunction(tx.data.substring(0, 10).toLowerCase());
    if (!fragment) {
      return null;
    }
    return new TransactionDescription({
      args: this._abiCoder.decode(fragment.inputs, "0x" + tx.data.substring(10)),
      functionFragment: fragment,
      name: fragment.name,
      signature: fragment.format(),
      sighash: this.getSighash(fragment),
      value: BigNumber.from(tx.value || "0")
    });
  }
  // @TODO
  //parseCallResult(data: BytesLike): ??
  // Given an event log, find the matching event fragment (if any) and
  // determine all its properties and values
  parseLog(log) {
    let fragment = this.getEvent(log.topics[0]);
    if (!fragment || fragment.anonymous) {
      return null;
    }
    return new LogDescription({
      eventFragment: fragment,
      name: fragment.name,
      signature: fragment.format(),
      topic: this.getEventTopic(fragment),
      args: this.decodeEventLog(fragment, log.data, log.topics)
    });
  }
  parseError(data) {
    const hexData = hexlify(data);
    let fragment = this.getError(hexData.substring(0, 10).toLowerCase());
    if (!fragment) {
      return null;
    }
    return new ErrorDescription({
      args: this._abiCoder.decode(fragment.inputs, "0x" + hexData.substring(10)),
      errorFragment: fragment,
      name: fragment.name,
      signature: fragment.format(),
      sighash: this.getSighash(fragment)
    });
  }
  /*
  static from(value: Array<Fragment | string | JsonAbi> | string | Interface) {
      if (Interface.isInterface(value)) {
          return value;
      }
      if (typeof(value) === "string") {
          return new Interface(JSON.parse(value));
      }
      return new Interface(value);
  }
  */
  static isInterface(value) {
    return !!(value && value._isInterface);
  }
}
function e$2(e2) {
  if (e2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e2;
}
function t$2(e2, t3, n11, s2, r2, i2, o2) {
  try {
    var a2 = e2[i2](o2);
    var c2 = a2.value;
  } catch (e3) {
    n11(e3);
    return;
  }
  if (a2.done) {
    t3(c2);
  } else {
    Promise.resolve(c2).then(s2, r2);
  }
}
function n$2(e2) {
  return function() {
    var n11 = this, s2 = arguments;
    return new Promise(function(r2, i2) {
      var o2 = e2.apply(n11, s2);
      function a2(e3) {
        t$2(o2, r2, i2, a2, c2, "next", e3);
      }
      function c2(e3) {
        t$2(o2, r2, i2, a2, c2, "throw", e3);
      }
      a2(void 0);
    });
  };
}
function s$2(e2, t3) {
  if (!(e2 instanceof t3)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function r$2(e2, t3) {
  for (var n11 = 0; n11 < t3.length; n11++) {
    var s2 = t3[n11];
    s2.enumerable = s2.enumerable || false;
    s2.configurable = true;
    if ("value" in s2)
      s2.writable = true;
    Object.defineProperty(e2, s2.key, s2);
  }
}
function i$2(e2, t3, n11) {
  if (t3)
    r$2(e2.prototype, t3);
  if (n11)
    r$2(e2, n11);
  return e2;
}
function o$2(e2) {
  o$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function e3(e3) {
    return e3.__proto__ || Object.getPrototypeOf(e3);
  };
  return o$2(e2);
}
function a$2(e2, t3) {
  if (typeof t3 !== "function" && t3 !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  e2.prototype = Object.create(t3 && t3.prototype, { constructor: { value: e2, writable: true, configurable: true } });
  if (t3)
    h$1(e2, t3);
}
function c$2(e2, t3) {
  if (t3 != null && typeof Symbol !== "undefined" && t3[Symbol.hasInstance]) {
    return !!t3[Symbol.hasInstance](e2);
  } else {
    return e2 instanceof t3;
  }
}
function u$2(t3, n11) {
  if (n11 && (l$1(n11) === "object" || typeof n11 === "function")) {
    return n11;
  }
  return e$2(t3);
}
function h$1(e2, t3) {
  h$1 = Object.setPrototypeOf || function e3(e3, t4) {
    e3.__proto__ = t4;
    return e3;
  };
  return h$1(e2, t3);
}
function l$1(e2) {
  "@swc/helpers - typeof";
  return e2 && typeof Symbol !== "undefined" && e2.constructor === Symbol ? "symbol" : typeof e2;
}
function d() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function f$1(e2) {
  var t3 = d();
  return function n11() {
    var n12 = o$2(e2), s2;
    if (t3) {
      var r2 = o$2(this).constructor;
      s2 = Reflect.construct(n12, arguments, r2);
    } else {
      s2 = n12.apply(this, arguments);
    }
    return u$2(this, s2);
  };
}
function p$1(e2, t3) {
  var n11, s2, r2, i2, o2 = { label: 0, sent: function() {
    if (r2[0] & 1)
      throw r2[1];
    return r2[1];
  }, trys: [], ops: [] };
  return i2 = { next: a2(0), "throw": a2(1), "return": a2(2) }, typeof Symbol === "function" && (i2[Symbol.iterator] = function() {
    return this;
  }), i2;
  function a2(e3) {
    return function(t4) {
      return c2([e3, t4]);
    };
  }
  function c2(i3) {
    if (n11)
      throw new TypeError("Generator is already executing.");
    while (o2)
      try {
        if (n11 = 1, s2 && (r2 = i3[0] & 2 ? s2["return"] : i3[0] ? s2["throw"] || ((r2 = s2["return"]) && r2.call(s2), 0) : s2.next) && !(r2 = r2.call(s2, i3[1])).done)
          return r2;
        if (s2 = 0, r2)
          i3 = [i3[0] & 2, r2.value];
        switch (i3[0]) {
          case 0:
          case 1:
            r2 = i3;
            break;
          case 4:
            o2.label++;
            return { value: i3[1], done: false };
          case 5:
            o2.label++;
            s2 = i3[1];
            i3 = [0];
            continue;
          case 7:
            i3 = o2.ops.pop();
            o2.trys.pop();
            continue;
          default:
            if (!(r2 = o2.trys, r2 = r2.length > 0 && r2[r2.length - 1]) && (i3[0] === 6 || i3[0] === 2)) {
              o2 = 0;
              continue;
            }
            if (i3[0] === 3 && (!r2 || i3[1] > r2[0] && i3[1] < r2[3])) {
              o2.label = i3[1];
              break;
            }
            if (i3[0] === 6 && o2.label < r2[1]) {
              o2.label = r2[1];
              r2 = i3;
              break;
            }
            if (r2 && o2.label < r2[2]) {
              o2.label = r2[2];
              o2.ops.push(i3);
              break;
            }
            if (r2[2])
              o2.ops.pop();
            o2.trys.pop();
            continue;
        }
        i3 = t3.call(e2, o2);
      } catch (e3) {
        i3 = [6, e3];
        s2 = 0;
      } finally {
        n11 = r2 = 0;
      }
    if (i3[0] & 5)
      throw i3[1];
    return { value: i3[0] ? i3[1] : void 0, done: true };
  }
}
var y$1 = Object.defineProperty;
var v$1 = function(e2, t3, n11) {
  return t3 in e2 ? y$1(e2, t3, { enumerable: true, configurable: true, writable: true, value: n11 }) : e2[t3] = n11;
};
var _ = function(e2, t3, n11) {
  return v$1(e2, (typeof t3 === "undefined" ? "undefined" : l$1(t3)) != "symbol" ? t3 + "" : t3, n11), n11;
};
var Q = "connect-session", U = "connect-domains", V = "wss://nbstream.binance.com/wallet-connector", F = ["https://rpc.ankr.com/bsc", "https://binance.nodereal.io", "https://bscrpc.com", "https://bsc-dataseed2.ninicoin.io"];
var W = function(t3) {
  a$2(r2, t3);
  var n11 = f$1(r2);
  function r2() {
    s$2(this, r2);
    var t4;
    t4 = n11.call.apply(n11, [this].concat(Array.prototype.slice.call(arguments)));
    _(e$2(t4), "pending", false);
    _(e$2(t4), "callbacks", /* @__PURE__ */ new Map());
    _(e$2(t4), "clientMeta");
    _(e$2(t4), "relay");
    _(e$2(t4), "_key", null);
    _(e$2(t4), "_clientId", "");
    _(e$2(t4), "_peerId", "");
    _(e$2(t4), "_peerMeta", null);
    _(e$2(t4), "_handshakeId", 0);
    _(e$2(t4), "_handshakeTopic", "");
    _(e$2(t4), "_connected", false);
    _(e$2(t4), "_accounts", []);
    _(e$2(t4), "_chainId", "0x0");
    return t4;
  }
  i$2(r2, [{ key: "key", get: function e2() {
    return this._key ? eD(this._key, true) : "";
  }, set: function e2(e2) {
    if (!e2)
      return;
    var t4 = ej(e2);
    this._key = t4;
  } }, { key: "clientId", get: function e2() {
    var e3 = this._clientId;
    return e3 || (e3 = this._clientId = q$1()), this._clientId;
  }, set: function e2(e2) {
    e2 && (this._clientId = e2);
  } }, { key: "peerId", get: function e2() {
    return this._peerId;
  }, set: function e2(e2) {
    e2 && (this._peerId = e2);
  } }, { key: "peerMeta", get: function e2() {
    return this._peerMeta;
  }, set: function e2(e2) {
    this._peerMeta = e2;
  } }, { key: "handshakeTopic", get: function e2() {
    return this._handshakeTopic;
  }, set: function e2(e2) {
    e2 && (this._handshakeTopic = e2);
  } }, { key: "handshakeId", get: function e2() {
    return this._handshakeId;
  }, set: function e2(e2) {
    e2 && (this._handshakeId = e2);
  } }, { key: "uri", get: function e2() {
    console.log("[===]", this.handshakeTopic);
    return "wc:".concat(this.handshakeTopic, "@1?bridge=").concat(this.relay, "&key=").concat(this.key, "&scene=bid");
  } }, { key: "chainId", get: function e2() {
    return this._chainId;
  }, set: function e2(e2) {
    this._chainId = e2;
  } }, { key: "accounts", get: function e2() {
    return this._accounts;
  }, set: function e2(e2) {
    this._accounts = e2;
  } }, { key: "connected", get: function e2() {
    return this._connected;
  }, set: function e2(e2) {
  } }, { key: "session", get: function e2() {
    return { connected: this.connected, accounts: this.accounts, chainId: this.chainId, relay: this.relay, key: this.key, clientId: this.clientId, clientMeta: this.clientMeta, peerId: this.peerId, peerMeta: this.peerMeta, handshakeId: this.handshakeId, handshakeTopic: this.handshakeTopic };
  }, set: function e2(e2) {
    e2 && (this._connected = e2.connected, this.accounts = e2.accounts, this.chainId = e2.chainId, this.relay = e2.relay, this.key = e2.key, this.clientId = e2.clientId, this.clientMeta = e2.clientMeta, this.peerId = e2.peerId, this.peerMeta = e2.peerMeta, this.handshakeId = e2.handshakeId, this.handshakeTopic = e2.handshakeTopic);
  } }]);
  return r2;
}(rh), Y = function(e2) {
  a$2(n11, e2);
  var t3 = f$1(n11);
  function n11() {
    s$2(this, n11);
    return t3.apply(this, arguments);
  }
  i$2(n11, [{ key: "getStorageSession", value: function e3() {
    try {
      return rl(Q);
    } catch (e4) {
    }
    return null;
  } }, { key: "setStorageSession", value: function e3() {
    rd(Q, this.session);
  } }, { key: "removeStorageSession", value: function e3() {
    rp(Q);
  } }, { key: "manageStorageSession", value: function e3() {
    this._connected ? this.setStorageSession() : this.removeStorageSession();
  } }]);
  return n11;
}(W);
function es() {
  return er.apply(this, arguments);
}
function er() {
  er = n$2(function() {
    var e2, t3;
    return p$1(this, function(n11) {
      switch (n11.label) {
        case 0:
          return [4, Promise.any(F.map(function(e3) {
            return et$1.request({ url: e3, method: "POST", data: { jsonrpc: "2.0", id: Date.now(), method: "eth_call", params: [{ to: "0x76054B318785b588A3164B2A6eA5476F7cBA51e0", data: "0x97b5f450" }, "latest"] } });
          }))];
        case 1:
          e2 = n11.sent(), t3 = new Interface(["function apiDomains() view returns (string)"]);
          return [2, decode(t3.decodeFunctionResult("apiDomains", e2.data.result)[0]).split(",")];
      }
    });
  });
  return er.apply(this, arguments);
}
function ei(e2) {
  return e2.filter(function(e3) {
    return e3.ttl > 0;
  }).sort(function(e3, t3) {
    return e3.ttl - t3.ttl;
  }).map(function(e3) {
    return e3.url;
  });
}
function eo() {
  return ea.apply(this, arguments);
}
function ea() {
  ea = n$2(function() {
    var e2, t3;
    return p$1(this, function(n11) {
      switch (n11.label) {
        case 0:
          return [4, es()];
        case 1:
          e2 = n11.sent();
          return [4, Promise.all(e2.map(function(e3) {
            var t4 = e3.split(".").slice(1).join(".");
            return b$2("wss://nbstream.".concat(t4, "/wallet-connector"));
          }))];
        case 2:
          t3 = n11.sent();
          return [2, ei(t3)];
      }
    });
  });
  return ea.apply(this, arguments);
}
var ec = Promise.resolve([]);
if (!eh$1()) {
  var eu = rl(U);
  ec = Promise.resolve(eu), (!eu || eu.length === 0) && (ec = eo().then(function(e2) {
    return console.log("🚀 ~ file: relay.ts:63 ~ .then ~ domains:", e2), rd(U, e2), e2;
  }).catch(function() {
    return [];
  }));
}
function eh() {
  return el.apply(this, arguments);
}
function el() {
  el = n$2(function() {
    var e2;
    return p$1(this, function(t3) {
      switch (t3.label) {
        case 0:
          return [4, ec];
        case 1:
          e2 = t3.sent();
          return [2, (e2.length === 0 && e2.push(V), e2)];
      }
    });
  });
  return el.apply(this, arguments);
}
function ed(e2) {
  var t3 = rl(U);
  if (!t3)
    return;
  var n11 = t3.filter(function(t4) {
    return t4 !== e2;
  });
  rd(U, n11);
}
function ef() {
  rp(U);
}
function e_(e2) {
  return e2.code === -32050 || e2.code === -32e3 || e2.code === 1e3 ? new rA(rx.REJECT_ERR.code, rx.REJECT_ERR.message) : e2.code === -32603 ? new rA(rN.INTERNAL_ERR.code, rN.INTERNAL_ERR.message) : e2.code === -32600 || e2.code === -32602 ? new rA(rx.INVALID_PARAM.code, rx.INVALID_PARAM.message) : e2;
}
function em(e2) {
  var t3 = e2.indexOf("?");
  return t3 > -1 ? e2.slice(0, t3) : e2;
}
var eI = function(t3) {
  a$2(o2, t3);
  var r2 = f$1(o2);
  function o2() {
    s$2(this, o2);
    var t4;
    t4 = r2.call(this);
    _(e$2(t4), "transport");
    _(e$2(t4), "lng");
    t4.clientMeta = r_();
    var n11 = t4.getStorageSession();
    n11 && (t4.session = n11), t4.handshakeId && t4.subscribeToSessionResponse(t4.handshakeId), t4.initTransport(), t4.subscribeInternalEvent();
    return t4;
  }
  i$2(o2, [{ key: "request", value: function e2(e2) {
    var t4 = this;
    return n$2(function() {
      return p$1(this, function(n11) {
        if (!t4.connected)
          throw new rA(rS.PROVIDER_NOT_READY.code, rS.PROVIDER_NOT_READY.message);
        if (ef$1.indexOf(e2.method) < 0)
          throw new rA(rx.METHOD_NOT_SUPPORT.code, rx.METHOD_NOT_SUPPORT.message);
        switch (e2.method) {
          case "eth_requestAccounts":
            return [2, t4.accounts];
          case "eth_accounts":
            return [2, t4.accounts];
          case "eth_chainId":
            return [2, eM(t4.chainId)];
          case "eth_signTransaction":
          case "eth_sendTransaction":
          case "eth_sign":
          case "personal_sign":
          case "eth_signTypedData":
          case "eth_signTypedData_v1":
          case "eth_signTypedData_v2":
          case "eth_signTypedData_v3":
          case "eth_signTypedData_v4":
          case "wallet_switchEthereumChain":
          case "wallet_watchAsset":
            return [2, new Promise(function(n12, s2) {
              e2.id || (e2.id = W$2()), t4.callbacks.set("response-".concat(e2.id), function(e3, t5) {
                e3 ? s2(e_(e3)) : t5 ? n12(t5.result) : s2(new rA(rx.MISSING_RESPONSE.code, rx.MISSING_RESPONSE.message));
              }), t4.sendRequest(e2), t4.events.emit("call_request_sent");
            })];
        }
        return [2];
      });
    })();
  } }, { key: "killSession", value: function e2() {
    if (!this.connected)
      return;
    var e3 = { approved: false, chainId: null, networkId: null, accounts: null }, t4 = { id: W$2(), method: "wc_sessionUpdate", params: [e3] };
    this.sendRequest(t4), this.handleSessionDisconnect(h$2.DisconnectAtClient);
  } }, { key: "connect", value: function e2() {
    var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t4 = e3.chainId, s2 = e3.lng, r3 = e3.showQrCodeModal;
    var i2 = this;
    return n$2(function() {
      return p$1(this, function(e4) {
        return [2, (i2.lng = s2, i2.connected ? { chainId: i2.chainId, accounts: i2.accounts } : new Promise(function(e5, n11) {
          i2.on("modal_closed", function(e6) {
            n11(e6);
          }), i2.on("session_error", function(e6) {
            n11(e6);
          }), i2.on("connect", function(t5) {
            e5(t5);
          }), i2.createSession({ chainId: t4, showQrCodeModal: r3 });
        }))];
      });
    })();
  } }, { key: "createSession", value: function e2(e2) {
    var t4 = e2.chainId, n11 = e2.showQrCodeModal;
    try {
      if (this.connected)
        throw new rA(rS.CONNECTED.code, rS.CONNECTED.message);
      if (this.pending || this._handshakeTopic)
        throw new rA(rS.CONNECTING.code, rS.CONNECTING.message);
      this.pending = true, this._key = rs(), this.handshakeId = W$2(), this.handshakeTopic = q$1();
      var s2 = { id: this.handshakeId, method: "wc_sessionRequest", params: [{ peerId: this.clientId, peerMeta: this.clientMeta, chainId: t4 ? Number(t4) : null }] };
      this.sendRequest(s2, this.handshakeTopic), this.subscribeToSessionResponse(this.handshakeId), this.events.emit("display_uri", { showQrCodeModal: n11 });
    } catch (e3) {
      this.pending = false;
      var r3 = "response-".concat(this.handshakeId);
      this.callbacks.get(r3) && this.callbacks.delete(r3);
      var i2 = e3.message, o3 = c$2(e3, rA) ? e3 : new rA(rN.INTERNAL_ERR.code, "".concat(rN.INTERNAL_ERR.message, ": ").concat(i2));
      throw this.handleRejectSessionConnection(o3), rm.error("[binance-w3w] create connection failed: ".concat(i2)), o3;
    }
  } }, { key: "initTransport", value: function e2() {
    var e3 = this;
    return n$2(function() {
      var t4, n11, s2, r3;
      return p$1(this, function(i2) {
        switch (i2.label) {
          case 0:
            e3.transport = new v$2({ version: 1, subscriptions: [e3.clientId] }), e3.transport.on("message", function(t5) {
              return e3.setIncomingMessages(t5);
            }), e3.transport.on("open", function(t5) {
              e3.events.emit("transport_open", t5);
            }), e3.transport.on("close", function() {
              e3.events.emit("transport_close");
            }), e3.transport.on("error", function(t5, n12) {
              e3.events.emit("transport_error", t5, n12);
            });
            i2.label = 1;
          case 1:
            i2.trys.push([1, 5, , 6]);
            if (!e3.session.relay)
              return [3, 2];
            e3.transport.open([e3.session.relay]);
            return [3, 4];
          case 2:
            return [4, eh()];
          case 3:
            t4 = i2.sent();
            e3.transport.open(t4);
            i2.label = 4;
          case 4:
            return [3, 6];
          case 5:
            n11 = i2.sent();
            ef();
            s2 = n11.message, r3 = new rA(rN.INTERNAL_ERR.code, "".concat(rN.INTERNAL_ERR.message, ": ").concat(s2));
            throw e3.handleRejectSessionConnection(r3), r3;
          case 6:
            return [2];
        }
      });
    })();
  } }, { key: "setIncomingMessages", value: function e2(e2) {
    if (![this.clientId, this.handshakeTopic].includes(e2.topic))
      return;
    var t4;
    try {
      t4 = JSON.parse(e2.payload);
    } catch (e3) {
      return;
    }
    var n11 = this.decrypt(t4);
    if (!n11)
      return;
    if ("method" in n11 && n11.method) {
      this.events.emit(n11.method, null, n11);
      return;
    }
    var s2 = n11.id, r3 = "response-".concat(s2), i2 = this.callbacks.get(r3);
    if (i2) {
      if ("error" in n11 && n11.error) {
        var o3 = new rA(n11.error.code, n11.error.message);
        i2(o3, null);
      } else
        "result" in n11 && n11.result && i2(null, n11);
      this.callbacks.delete(r3);
    } else
      rm.error("[binance-w3w] callback id: ".concat(s2, " not found"));
  } }, { key: "encrypt", value: function e2(e2) {
    var t4 = this._key;
    return t4 ? rc(e2, t4) : null;
  } }, { key: "decrypt", value: function e2(e2) {
    var t4 = this._key;
    return t4 ? rf(e2, t4) : null;
  } }, { key: "sendRequest", value: function e2(e2, t4) {
    var n11 = G$1(e2.method, e2.params, e2.id), s2 = this.encrypt(n11), r3 = t4 || this.peerId, i2 = JSON.stringify(s2);
    this.transport.send(i2, r3, true);
  } }, { key: "subscribeInternalEvent", value: function e2() {
    var e3 = this;
    this.on("display_uri", function(t4) {
      var n11 = t4.showQrCodeModal;
      n11 !== false && (eo$1.open({ cb: function() {
        e3.events.emit("modal_closed", new rA(rS.CLOSE_MODAL.code, rS.CLOSE_MODAL.message));
      }, lng: e3.lng }), e3.transport.connected ? (e3.events.emit("uri_ready", e3.uri), e3.key && eo$1.ready(e3.uri)) : e3.transport.retryFailed && eo$1.fail());
    }), this.on("transport_open", function(t4) {
      e3.relay = t4, e3.events.emit("uri_ready", e3.uri), e3.key && eo$1.ready(e3.uri);
    }), this.on("transport_error", function(e4, t4) {
      t4 ? ed(em(t4)) : (ef(), eo$1.fail());
    }), this.on("modal_closed", function() {
      var t4 = "response-".concat(e3.handshakeId);
      e3.callbacks.get(t4) && e3.callbacks.delete(t4), e3.clearConnectionStatus();
    }), this.on("connect", function() {
      e3.pending = false, eo$1.close();
    }), this.on("call_request_sent", function() {
      rj();
    }), this.on("wc_sessionUpdate", function(t4, n11) {
      if (t4) {
        e3.handleSessionResponse();
        return;
      }
      n11.params && Array.isArray(n11.params) ? e3.handleSessionResponse(n11.params[0]) : n11.error && e3.handleSessionResponse();
    });
  } }, { key: "subscribeToSessionResponse", value: function e2(e2) {
    var t4 = this;
    this.callbacks.set("response-".concat(e2), function(e3, n11) {
      if (e3) {
        t4.handleSessionResponse();
        return;
      }
      n11 && (n11.result ? t4.handleSessionResponse(n11.result) : n11.error && n11.error.message ? t4.handleSessionResponse() : t4.handleSessionResponse());
    });
  } }, { key: "handleSessionResponse", value: function e2(e2) {
    e2 ? e2.approved ? (this._connected ? (e2.chainId && this.setChainId(e2.chainId), e2.accounts && this.setAddress(e2.accounts)) : (this._connected = true, e2.chainId && this.setChainId(e2.chainId), e2.accounts && this.setAddress(e2.accounts), e2.peerId && !this.peerId && (this.peerId = e2.peerId), e2.peerMeta && !this.peerMeta && (this.peerMeta = e2.peerMeta), this.events.emit("connect", { chainId: this.chainId, accounts: this.accounts })), this.manageStorageSession()) : this.connected ? this.handleSessionDisconnect(h$2.DisconnectAtWallet) : this.handleRejectSessionConnection(new rA(rS.REJECT_SESSION.code, rS.REJECT_SESSION.message)) : this.handleRejectSessionConnection(new rA(rS.REJECT_SESSION.code, rS.REJECT_SESSION.message));
  } }, { key: "handleRejectSessionConnection", value: function e2(e2) {
    eo$1.close(), this.clearConnectionStatus(), this.events.emit("session_error", e2);
  } }, { key: "handleSessionDisconnect", value: function e2(e2) {
    this._connected || eo$1.close(), this.events.emit("disconnect", e2), this.clearConnectionStatus();
  } }, { key: "clearConnectionStatus", value: function e2() {
    this._connected && (this._connected = false), this._handshakeId && (this._handshakeId = 0), this._handshakeTopic && (this._handshakeTopic = ""), this._peerId && (this._peerId = ""), this._clientId && (this._clientId = ""), this.pending && (this.pending = false), this.callbacks.clear(), this._peerMeta = null, this._accounts = [], this._chainId = "0x0", this.offConnectEvents(), this.removeStorageSession(), this.transport.close();
  } }, { key: "offConnectEvents", value: function e2() {
    this.removeListener("connect");
  } }, { key: "setChainId", value: function e2(e2) {
    var t4 = eM(e2);
    if (t4 === "0x0") {
      this.chainId = t4;
      return;
    }
    l$1(this.chainId) < "u" && this.chainId !== t4 && this.events.emit("chainChanged", t4), this.chainId = t4;
  } }, { key: "setAddress", value: function e2() {
    var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    var t4 = e3.filter(function(e4) {
      return typeof e4 == "string";
    }).map(function(e4) {
      return e4.toLowerCase();
    }).filter(Boolean);
    JSON.stringify(this.accounts) !== JSON.stringify(t4) && this.events.emit("accountsChanged", t4), this.accounts = t4;
  } }]);
  return o2;
}(Y);
function n$1(n11) {
  if (n11 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return n11;
}
function e$1(n11, e2, t3, o2, r2, c2, i2) {
  try {
    var u2 = n11[c2](i2);
    var s2 = u2.value;
  } catch (n12) {
    t3(n12);
    return;
  }
  if (u2.done) {
    e2(s2);
  } else {
    Promise.resolve(s2).then(o2, r2);
  }
}
function t$1(n11) {
  return function() {
    var t3 = this, o2 = arguments;
    return new Promise(function(r2, c2) {
      var i2 = n11.apply(t3, o2);
      function u2(n12) {
        e$1(i2, r2, c2, u2, s2, "next", n12);
      }
      function s2(n12) {
        e$1(i2, r2, c2, u2, s2, "throw", n12);
      }
      u2(void 0);
    });
  };
}
function o$1(n11, e2) {
  if (!(n11 instanceof e2)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function r$1(n11, e2) {
  for (var t3 = 0; t3 < e2.length; t3++) {
    var o2 = e2[t3];
    o2.enumerable = o2.enumerable || false;
    o2.configurable = true;
    if ("value" in o2)
      o2.writable = true;
    Object.defineProperty(n11, o2.key, o2);
  }
}
function c$1(n11, e2, t3) {
  if (e2)
    r$1(n11.prototype, e2);
  if (t3)
    r$1(n11, t3);
  return n11;
}
function i$1(n11) {
  i$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function n12(n12) {
    return n12.__proto__ || Object.getPrototypeOf(n12);
  };
  return i$1(n11);
}
function u$1(n11, e2) {
  if (typeof e2 !== "function" && e2 !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  n11.prototype = Object.create(e2 && e2.prototype, { constructor: { value: n11, writable: true, configurable: true } });
  if (e2)
    a$1(n11, e2);
}
function s$1(e2, t3) {
  if (t3 && (f(t3) === "object" || typeof t3 === "function")) {
    return t3;
  }
  return n$1(e2);
}
function a$1(n11, e2) {
  a$1 = Object.setPrototypeOf || function n12(n12, e3) {
    n12.__proto__ = e3;
    return n12;
  };
  return a$1(n11, e2);
}
function f(n11) {
  "@swc/helpers - typeof";
  return n11 && typeof Symbol !== "undefined" && n11.constructor === Symbol ? "symbol" : typeof n11;
}
function l() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (n11) {
    return false;
  }
}
function h(n11) {
  var e2 = l();
  return function t3() {
    var t4 = i$1(n11), o2;
    if (e2) {
      var r2 = i$1(this).constructor;
      o2 = Reflect.construct(t4, arguments, r2);
    } else {
      o2 = t4.apply(this, arguments);
    }
    return s$1(this, o2);
  };
}
function p(n11, e2) {
  var t3, o2, r2, c2, i2 = { label: 0, sent: function() {
    if (r2[0] & 1)
      throw r2[1];
    return r2[1];
  }, trys: [], ops: [] };
  return c2 = { next: u2(0), "throw": u2(1), "return": u2(2) }, typeof Symbol === "function" && (c2[Symbol.iterator] = function() {
    return this;
  }), c2;
  function u2(n12) {
    return function(e3) {
      return s2([n12, e3]);
    };
  }
  function s2(c3) {
    if (t3)
      throw new TypeError("Generator is already executing.");
    while (i2)
      try {
        if (t3 = 1, o2 && (r2 = c3[0] & 2 ? o2["return"] : c3[0] ? o2["throw"] || ((r2 = o2["return"]) && r2.call(o2), 0) : o2.next) && !(r2 = r2.call(o2, c3[1])).done)
          return r2;
        if (o2 = 0, r2)
          c3 = [c3[0] & 2, r2.value];
        switch (c3[0]) {
          case 0:
          case 1:
            r2 = c3;
            break;
          case 4:
            i2.label++;
            return { value: c3[1], done: false };
          case 5:
            i2.label++;
            o2 = c3[1];
            c3 = [0];
            continue;
          case 7:
            c3 = i2.ops.pop();
            i2.trys.pop();
            continue;
          default:
            if (!(r2 = i2.trys, r2 = r2.length > 0 && r2[r2.length - 1]) && (c3[0] === 6 || c3[0] === 2)) {
              i2 = 0;
              continue;
            }
            if (c3[0] === 3 && (!r2 || c3[1] > r2[0] && c3[1] < r2[3])) {
              i2.label = c3[1];
              break;
            }
            if (c3[0] === 6 && i2.label < r2[1]) {
              i2.label = r2[1];
              r2 = c3;
              break;
            }
            if (r2 && i2.label < r2[2]) {
              i2.label = r2[2];
              i2.ops.push(c3);
              break;
            }
            if (r2[2])
              i2.ops.pop();
            i2.trys.pop();
            continue;
        }
        c3 = e2.call(n11, i2);
      } catch (n12) {
        c3 = [6, n12];
        o2 = 0;
      } finally {
        t3 = r2 = 0;
      }
    if (c3[0] & 5)
      throw c3[1];
    return { value: c3[0] ? c3[1] : void 0, done: true };
  }
}
var y = Object.defineProperty;
var b$1 = function(n11, e2, t3) {
  return e2 in n11 ? y(n11, e2, { enumerable: true, configurable: true, writable: true, value: t3 }) : n11[e2] = t3;
};
var v = function(n11, e2, t3) {
  return b$1(n11, (typeof e2 === "undefined" ? "undefined" : f(e2)) != "symbol" ? e2 + "" : e2, t3), t3;
};
var g = function(e2) {
  u$1(i2, e2);
  var r2 = h(i2);
  function i2() {
    o$1(this, i2);
    var e3;
    e3 = r2.call(this);
    v(n$1(e3), "accounts", []);
    v(n$1(e3), "coreConnection");
    e3.register();
    return e3;
  }
  c$1(i2, [{ key: "chainId", get: function n11() {
    return this.coreConnection ? this.coreConnection.chainId : "0x0";
  } }, { key: "connected", get: function n11() {
    return this.coreConnection ? this.coreConnection.connected : false;
  } }, { key: "connecting", get: function n11() {
    return this.coreConnection ? this.coreConnection.pending : false;
  } }, { key: "open", value: function n11(n11) {
    var e3 = n11.requestChainId, o2 = n11.lng, r3 = n11.showQrCodeModal;
    var c2 = this;
    return t$1(function() {
      var n12, t3;
      return p(this, function(i3) {
        switch (i3.label) {
          case 0:
            if (c2.register(), c2.coreConnection.connected)
              return [2];
            return [4, c2.coreConnection.connect({ chainId: e3, lng: o2, showQrCodeModal: r3 })];
          case 1:
            n12 = i3.sent(), t3 = n12.accounts;
            c2.accounts = t3;
            return [2];
        }
      });
    })();
  } }, { key: "request", value: function n11(n11) {
    var e3 = this;
    return t$1(function() {
      var t3;
      return p(this, function(o2) {
        switch (o2.label) {
          case 0:
            t3 = e3.connected;
            if (t3)
              return [3, 2];
            return [4, e3.open({})];
          case 1:
            t3 = o2.sent();
            o2.label = 2;
          case 2:
            return [2, e3.coreConnection.request(n11)];
        }
      });
    })();
  } }, { key: "disconnect", value: function n11() {
    this.connected && (this.coreConnection.killSession(), this.onClose(h$2.DisconnectAtClient));
  } }, { key: "register", value: function n11() {
    if (this.coreConnection)
      return this.coreConnection;
    this.coreConnection = new eI(), this.accounts = this.coreConnection.accounts, this.subscribeEvents();
  } }, { key: "subscribeEvents", value: function n11() {
    var n12 = this;
    this.coreConnection.on("chainChanged", function(e3) {
      n12.events.emit("chainChanged", e3);
    }), this.coreConnection.on("accountsChanged", function(e3) {
      n12.accounts = e3, n12.events.emit("accountsChanged", e3);
    }), this.coreConnection.on("uri_ready", function(e3) {
      console.log("[xxx]", e3);
      n12.events.emit("uri_ready", e3);
    }), this.coreConnection.on("disconnect", function(e3) {
      n12.onClose(e3);
    });
  } }, { key: "onClose", value: function n11(n11) {
    this.coreConnection = null, this.events.emit("disconnect", n11);
  } }]);
  return i2;
}(rh);
function e(e2, n11, t3, i2, r2, o2, s2) {
  try {
    var u2 = e2[o2](s2);
    var c2 = u2.value;
  } catch (e3) {
    t3(e3);
    return;
  }
  if (u2.done) {
    n11(c2);
  } else {
    Promise.resolve(c2).then(i2, r2);
  }
}
function n10(n11) {
  return function() {
    var t3 = this, i2 = arguments;
    return new Promise(function(r2, o2) {
      var s2 = n11.apply(t3, i2);
      function u2(n12) {
        e(s2, r2, o2, u2, c2, "next", n12);
      }
      function c2(n12) {
        e(s2, r2, o2, u2, c2, "throw", n12);
      }
      u2(void 0);
    });
  };
}
function t2(e2, n11) {
  if (!(e2 instanceof n11)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function i(e2, n11) {
  for (var t3 = 0; t3 < n11.length; t3++) {
    var i2 = n11[t3];
    i2.enumerable = i2.enumerable || false;
    i2.configurable = true;
    if ("value" in i2)
      i2.writable = true;
    Object.defineProperty(e2, i2.key, i2);
  }
}
function r(e2, n11, t3) {
  if (n11)
    i(e2.prototype, n11);
  if (t3)
    i(e2, t3);
  return e2;
}
function o(e2) {
  "@swc/helpers - typeof";
  return e2 && typeof Symbol !== "undefined" && e2.constructor === Symbol ? "symbol" : typeof e2;
}
function s(e2, n11) {
  var t3, i2, r2, o2, s2 = { label: 0, sent: function() {
    if (r2[0] & 1)
      throw r2[1];
    return r2[1];
  }, trys: [], ops: [] };
  return o2 = { next: u2(0), "throw": u2(1), "return": u2(2) }, typeof Symbol === "function" && (o2[Symbol.iterator] = function() {
    return this;
  }), o2;
  function u2(e3) {
    return function(n12) {
      return c2([e3, n12]);
    };
  }
  function c2(o3) {
    if (t3)
      throw new TypeError("Generator is already executing.");
    while (s2)
      try {
        if (t3 = 1, i2 && (r2 = o3[0] & 2 ? i2["return"] : o3[0] ? i2["throw"] || ((r2 = i2["return"]) && r2.call(i2), 0) : i2.next) && !(r2 = r2.call(i2, o3[1])).done)
          return r2;
        if (i2 = 0, r2)
          o3 = [o3[0] & 2, r2.value];
        switch (o3[0]) {
          case 0:
          case 1:
            r2 = o3;
            break;
          case 4:
            s2.label++;
            return { value: o3[1], done: false };
          case 5:
            s2.label++;
            i2 = o3[1];
            o3 = [0];
            continue;
          case 7:
            o3 = s2.ops.pop();
            s2.trys.pop();
            continue;
          default:
            if (!(r2 = s2.trys, r2 = r2.length > 0 && r2[r2.length - 1]) && (o3[0] === 6 || o3[0] === 2)) {
              s2 = 0;
              continue;
            }
            if (o3[0] === 3 && (!r2 || o3[1] > r2[0] && o3[1] < r2[3])) {
              s2.label = o3[1];
              break;
            }
            if (o3[0] === 6 && s2.label < r2[1]) {
              s2.label = r2[1];
              r2 = o3;
              break;
            }
            if (r2 && s2.label < r2[2]) {
              s2.label = r2[2];
              s2.ops.push(o3);
              break;
            }
            if (r2[2])
              s2.ops.pop();
            s2.trys.pop();
            continue;
        }
        o3 = n11.call(e2, s2);
      } catch (e3) {
        o3 = [6, e3];
        i2 = 0;
      } finally {
        t3 = r2 = 0;
      }
    if (o3[0] & 5)
      throw o3[1];
    return { value: o3[0] ? o3[1] : void 0, done: true };
  }
}
var u = Object.defineProperty;
var c = function(e2, n11, t3) {
  return n11 in e2 ? u(e2, n11, { enumerable: true, configurable: true, writable: true, value: t3 }) : e2[n11] = t3;
};
var a = function(e2, n11, t3) {
  return c(e2, (typeof n11 === "undefined" ? "undefined" : o(n11)) != "symbol" ? n11 + "" : n11, t3), t3;
};
var b = function() {
  function e2(n11) {
    t2(this, e2);
    a(this, "events", new O());
    a(this, "signClient");
    a(this, "rpc");
    a(this, "httpClient");
    a(this, "optsChainId");
    a(this, "lng");
    a(this, "showQrCodeModal");
    this.rpc = { infuraId: n11 === null || n11 === void 0 ? void 0 : n11.infuraId, custom: n11 === null || n11 === void 0 ? void 0 : n11.rpc }, this.lng = (n11 === null || n11 === void 0 ? void 0 : n11.lng) || "en", this.showQrCodeModal = n11 === null || n11 === void 0 ? void 0 : n11.showQrCodeModal, this.signClient = new g(), this.optsChainId = Number(this.signClient.coreConnection.chainId) || (n11 === null || n11 === void 0 ? void 0 : n11.chainId) || 56, this.registerEventListeners(), this.httpClient = this.setHttpProvider(this.optsChainId);
  }
  r(e2, [{ key: "connected", get: function e3() {
    return this.signClient.connected;
  } }, { key: "connector", get: function e3() {
    return this.signClient;
  } }, { key: "accounts", get: function e3() {
    return this.signClient.accounts;
  } }, { key: "chainId", get: function e3() {
    return rm.debug("provider get chainId", this.signClient.chainId), this.signClient.chainId;
  } }, { key: "rpcUrl", get: function e3() {
    return this.httpClient.url || "";
  } }, { key: "request", value: function e3(e3) {
    var t3 = this;
    return n10(function() {
      var n11, i2, r2;
      return s(this, function(s2) {
        switch (s2.label) {
          case 0:
            n11 = (rm.debug("ethereum-provider request", e3), e3.method);
            switch (n11) {
              case "eth_requestAccounts":
                return [3, 1];
              case "eth_chainId":
                return [3, 3];
              case "eth_accounts":
                return [3, 4];
              case "wallet_switchEthereumChain":
                return [3, 5];
            }
            return [3, 6];
          case 1:
            return [4, t3.connect()];
          case 2:
            return [2, (s2.sent(), t3.accounts)];
          case 3:
            return [2, t3.chainId];
          case 4:
            return [2, t3.accounts];
          case 5:
            return [2, t3.switchChain(e3)];
          case 6:
            return [3, 7];
          case 7:
            i2 = G$1(e3.method, e3.params || []);
            if (ef$1.includes(e3.method))
              return [2, t3.signClient.request(i2)];
            if (o(t3.httpClient) > "u")
              throw new Error("Cannot request JSON-RPC method (".concat(e3.method, ") without provided rpc url"));
            return [4, t3.httpClient.request(i2)];
          case 8:
            r2 = s2.sent();
            if (ee$1(r2))
              return [2, r2.result];
            throw new Error(r2.error.message);
        }
      });
    })();
  } }, { key: "signMessage", value: function e3(e3) {
    var t3 = this;
    return n10(function() {
      var n11;
      return s(this, function(i2) {
        switch (i2.label) {
          case 0:
            rm.debug("signMessage", e3);
            n11 = t3.accounts.length;
            if (n11)
              return [3, 2];
            return [4, t3.enable()];
          case 1:
            n11 = i2.sent();
            i2.label = 2;
          case 2:
            return [4, t3.request({ method: "personal_sign", params: [eC(e3), t3.accounts[0]] })];
          case 3:
            return [2, i2.sent()];
        }
      });
    })();
  } }, { key: "sendAsync", value: function e3(e3, n11) {
    this.request(e3).then(function(e4) {
      return n11(null, e4);
    }).catch(function(e4) {
      return n11(e4, void 0);
    });
  } }, { key: "setLng", value: function e3(e3) {
    this.lng = e3;
  } }, { key: "enable", value: function e3(e3) {
    var t3 = this;
    return n10(function() {
      return s(this, function(n11) {
        switch (n11.label) {
          case 0:
            return [4, t3.connect(e3)];
          case 1:
            return [2, (n11.sent(), t3.accounts)];
        }
      });
    })();
  } }, { key: "switchChain", value: function e3(e3) {
    var t3 = this;
    return n10(function() {
      var n11;
      return s(this, function(i2) {
        switch (i2.label) {
          case 0:
            n11 = G$1(e3.method, e3.params || []);
            return [4, Promise.race([t3.signClient.request(n11), new Promise(function(n12) {
              return t3.on("chainChanged", function(t4) {
                t4 === e3.params[0].chainId && n12(t4);
              });
            })])];
          case 1:
            return [2, i2.sent()];
        }
      });
    })();
  } }, { key: "connect", value: function e3(e3) {
    var t3 = this;
    return n10(function() {
      var n11;
      return s(this, function(r2) {
        switch (r2.label) {
          case 0:
            if (!t3.connected)
              return [3, 1];
            rm.info("already connected");
            return [3, 3];
          case 1:
            return [4, t3.signClient.open({ requestChainId: (n11 = e3 === null || e3 === void 0 ? void 0 : e3.toString()) !== null && n11 !== void 0 ? n11 : t3.optsChainId.toString(), lng: t3.lng, showQrCodeModal: t3.showQrCodeModal })];
          case 2:
            r2.sent();
            r2.label = 3;
          case 3:
            return [2];
        }
      });
    })();
  } }, { key: "disconnect", value: function e3() {
    this.connected && this.signClient.disconnect();
  } }, { key: "on", value: function e3(e3, n11) {
    this.events.on(e3, n11);
  } }, { key: "once", value: function e3(e3, n11) {
    this.events.once(e3, n11);
  } }, { key: "removeListener", value: function e3(e3, n11) {
    this.events.removeListener(e3, n11);
  } }, { key: "off", value: function e3(e3, n11) {
    this.events.off(e3, n11);
  } }, { key: "isWalletConnect", get: function e3() {
    return true;
  } }, { key: "registerEventListeners", value: function e3() {
    var e4 = this;
    this.signClient.on("accountsChanged", function(n11) {
      e4.events.emit("accountsChanged", n11);
    }), this.signClient.on("chainChanged", function(n11) {
      e4.httpClient = e4.setHttpProvider(ey(n11)), e4.events.emit("chainChanged", n11);
    }), this.signClient.on("disconnect", function() {
      e4.events.emit("disconnect");
    }), this.signClient.on("uri_ready", function(n11) {
      e4.events.emit("uri_ready", n11);
    });
  } }, { key: "setHttpProvider", value: function e3(e3) {
    var n11 = ev(e3, this.rpc);
    if (!((typeof n11 === "undefined" ? "undefined" : o(n11)) > "u"))
      return new E(n11);
  } }]);
  return e2;
}(), k = function(e2) {
  if (rD()) {
    var n11 = (typeof window === "undefined" ? "undefined" : o(window)) < "u" ? window.ethereum : void 0;
    if (n11)
      return n11.setLng = function() {
      }, n11.disconnect = function() {
      }, n11;
  }
  return new b(e2);
}, I = b;
export {
  I as default,
  k as getProvider
};
