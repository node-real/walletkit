import { Z as eventsExports, a4 as Wo, a5 as er, a6 as Ev, a3 as __vitePreload, a7 as Nr } from "./index-8b6bfd7a.js";
const R = "wc", T = "ethereum_provider", $ = `${R}@2:${T}:`, j = "https://rpc.walletconnect.org/v1/", u = ["eth_sendTransaction", "personal_sign"], y = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "eth_sendTransaction", "personal_sign", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode", "wallet_sendCalls", "wallet_getCapabilities", "wallet_getCallsStatus", "wallet_showCallsStatus"], g = ["chainChanged", "accountsChanged"], b = ["chainChanged", "accountsChanged", "message", "disconnect", "connect"];
var q = Object.defineProperty, N = Object.defineProperties, D = Object.getOwnPropertyDescriptors, M = Object.getOwnPropertySymbols, U = Object.prototype.hasOwnProperty, Q = Object.prototype.propertyIsEnumerable, O = (r, t, s) => t in r ? q(r, t, { enumerable: true, configurable: true, writable: true, value: s }) : r[t] = s, p = (r, t) => {
  for (var s in t || (t = {}))
    U.call(t, s) && O(r, s, t[s]);
  if (M)
    for (var s of M(t))
      Q.call(t, s) && O(r, s, t[s]);
  return r;
}, E = (r, t) => N(r, D(t));
function m(r) {
  return Number(r[0].split(":")[1]);
}
function v(r) {
  return `0x${r.toString(16)}`;
}
function L(r) {
  const { chains: t, optionalChains: s, methods: i, optionalMethods: e, events: n, optionalEvents: o, rpcMap: c } = r;
  if (!Nr(t))
    throw new Error("Invalid chains");
  const a = { chains: t, methods: i || u, events: n || g, rpcMap: p({}, t.length ? { [m(t)]: c[m(t)] } : {}) }, h = n == null ? void 0 : n.filter((l) => !g.includes(l)), d = i == null ? void 0 : i.filter((l) => !u.includes(l));
  if (!s && !o && !e && !(h != null && h.length) && !(d != null && d.length))
    return { required: t.length ? a : void 0 };
  const w = (h == null ? void 0 : h.length) && (d == null ? void 0 : d.length) || !s, I = { chains: [...new Set(w ? a.chains.concat(s || []) : s)], methods: [...new Set(a.methods.concat(e != null && e.length ? e : y))], events: [...new Set(a.events.concat(o != null && o.length ? o : b))], rpcMap: c };
  return { required: t.length ? a : void 0, optional: s.length ? I : void 0 };
}
class C {
  constructor() {
    this.events = new eventsExports.EventEmitter(), this.namespace = "eip155", this.accounts = [], this.chainId = 1, this.STORAGE_KEY = $, this.on = (t, s) => (this.events.on(t, s), this), this.once = (t, s) => (this.events.once(t, s), this), this.removeListener = (t, s) => (this.events.removeListener(t, s), this), this.off = (t, s) => (this.events.off(t, s), this), this.parseAccount = (t) => this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t, this.signer = {}, this.rpc = {};
  }
  static async init(t) {
    const s = new C();
    return await s.initialize(t), s;
  }
  async request(t, s) {
    return await this.signer.request(t, this.formatChainId(this.chainId), s);
  }
  sendAsync(t, s, i) {
    this.signer.sendAsync(t, s, this.formatChainId(this.chainId), i);
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
    const { required: s, optional: i } = L(this.rpc);
    try {
      const e = await new Promise(async (o, c) => {
        var a;
        this.rpc.showQrModal && ((a = this.modal) == null || a.subscribeModal((h) => {
          !h.open && !this.signer.session && (this.signer.abortPairingAttempt(), c(new Error("Connection request reset. Please try again.")));
        })), await this.signer.connect(E(p({ namespaces: p({}, s && { [this.namespace]: s }) }, i && { optionalNamespaces: { [this.namespace]: i } }), { pairingTopic: t == null ? void 0 : t.pairingTopic })).then((h) => {
          o(h);
        }).catch((h) => {
          c(new Error(h.message));
        });
      });
      if (!e)
        return;
      const n = Wo(e.namespaces, [this.namespace]);
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : n), this.setAccounts(n), this.events.emit("connect", { chainId: v(this.chainId) });
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
      const i = await new Promise(async (n, o) => {
        var c;
        this.rpc.showQrModal && ((c = this.modal) == null || c.subscribeModal((a) => {
          !a.open && !this.signer.session && (this.signer.abortPairingAttempt(), o(new Error("Connection request reset. Please try again.")));
        })), await this.signer.authenticate(E(p({}, t), { chains: this.rpc.chains }), s).then((a) => {
          n(a);
        }).catch((a) => {
          o(new Error(a.message));
        });
      }), e = i.session;
      if (e) {
        const n = Wo(e.namespaces, [this.namespace]);
        this.setChainIds(this.rpc.chains.length ? this.rpc.chains : n), this.setAccounts(n), this.events.emit("connect", { chainId: v(this.chainId) });
      }
      return i;
    } catch (i) {
      throw this.signer.logger.error(i), i;
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
      const { params: s } = t, { event: i } = s;
      i.name === "accountsChanged" ? (this.accounts = this.parseAccounts(i.data), this.events.emit("accountsChanged", this.accounts)) : i.name === "chainChanged" ? this.setChainId(this.formatChainId(i.data)) : this.events.emit(i.name, i.data), this.events.emit("session_event", t);
    }), this.signer.on("chainChanged", (t) => {
      const s = parseInt(t);
      this.chainId = s, this.events.emit("chainChanged", v(this.chainId)), this.persist();
    }), this.signer.on("session_update", (t) => {
      this.events.emit("session_update", t);
    }), this.signer.on("session_delete", (t) => {
      this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", E(p({}, er("USER_DISCONNECTED")), { data: t.topic, name: "USER_DISCONNECTED" }));
    }), this.signer.on("display_uri", (t) => {
      var s, i;
      this.rpc.showQrModal && ((s = this.modal) == null || s.closeModal(), (i = this.modal) == null || i.openModal({ uri: t })), this.events.emit("display_uri", t);
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
    const s = t.filter((i) => this.isCompatibleChainId(i)).map((i) => this.parseChainId(i));
    s.length && (this.chainId = s[0], this.events.emit("chainChanged", v(this.chainId)), this.persist());
  }
  setChainId(t) {
    if (this.isCompatibleChainId(t)) {
      const s = this.parseChainId(t);
      this.chainId = s, this.switchEthereumChain(s);
    }
  }
  parseAccountId(t) {
    const [s, i, e] = t.split(":");
    return { chainId: `${s}:${i}`, address: e };
  }
  setAccounts(t) {
    this.accounts = t.filter((s) => this.parseChainId(this.parseAccountId(s).chainId) === this.chainId).map((s) => this.parseAccountId(s).address), this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(t) {
    var s, i;
    const e = (s = t == null ? void 0 : t.chains) != null ? s : [], n = (i = t == null ? void 0 : t.optionalChains) != null ? i : [], o = e.concat(n);
    if (!o.length)
      throw new Error("No chains specified in either `chains` or `optionalChains`");
    const c = e.length ? (t == null ? void 0 : t.methods) || u : [], a = e.length ? (t == null ? void 0 : t.events) || g : [], h = (t == null ? void 0 : t.optionalMethods) || [], d = (t == null ? void 0 : t.optionalEvents) || [], w = (t == null ? void 0 : t.rpcMap) || this.buildRpcMap(o, t.projectId), I = (t == null ? void 0 : t.qrModalOptions) || void 0;
    return { chains: e == null ? void 0 : e.map((l) => this.formatChainId(l)), optionalChains: n.map((l) => this.formatChainId(l)), methods: c, events: a, optionalMethods: h, optionalEvents: d, rpcMap: w, showQrModal: !!(t != null && t.showQrModal), qrModalOptions: I, projectId: t.projectId, metadata: t.metadata };
  }
  buildRpcMap(t, s) {
    const i = {};
    return t.forEach((e) => {
      i[e] = this.getRpcUrl(e, s);
    }), i;
  }
  async initialize(t) {
    if (this.rpc = this.getRpcConfig(t), this.chainId = this.rpc.chains.length ? m(this.rpc.chains) : m(this.rpc.optionalChains), this.signer = await Ev.init({ projectId: this.rpc.projectId, metadata: this.rpc.metadata, disableProviderPing: t.disableProviderPing, relayUrl: t.relayUrl, storageOptions: t.storageOptions, customStoragePrefix: t.customStoragePrefix, telemetryEnabled: t.telemetryEnabled }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
      let s;
      try {
        const { WalletConnectModal: i } = await __vitePreload(() => import("./index-cdfebd9e.js").then((n) => n.i), true ? ["./index-cdfebd9e.js","./index-8b6bfd7a.js","./index-6434e334.css"] : void 0, import.meta.url);
        s = i;
      } catch {
        throw new Error("To use QR modal, please install @walletconnect/modal package");
      }
      if (s)
        try {
          this.modal = new s(p({ projectId: this.rpc.projectId }, this.rpc.qrModalOptions));
        } catch (i) {
          throw this.signer.logger.error(i), new Error("Could not generate WalletConnectModal Instance");
        }
    }
  }
  loadConnectOpts(t) {
    if (!t)
      return;
    const { chains: s, optionalChains: i, rpcMap: e } = t;
    s && Nr(s) && (this.rpc.chains = s.map((n) => this.formatChainId(n)), s.forEach((n) => {
      this.rpc.rpcMap[n] = (e == null ? void 0 : e[n]) || this.getRpcUrl(n);
    })), i && Nr(i) && (this.rpc.optionalChains = [], this.rpc.optionalChains = i == null ? void 0 : i.map((n) => this.formatChainId(n)), i.forEach((n) => {
      this.rpc.rpcMap[n] = (e == null ? void 0 : e[n]) || this.getRpcUrl(n);
    }));
  }
  getRpcUrl(t, s) {
    var i;
    return ((i = this.rpc.rpcMap) == null ? void 0 : i[t]) || `${j}?chainId=eip155:${t}&projectId=${s || this.rpc.projectId}`;
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
const x = C;
export {
  x as EthereumProvider,
  b as OPTIONAL_EVENTS,
  y as OPTIONAL_METHODS,
  g as REQUIRED_EVENTS,
  u as REQUIRED_METHODS,
  C as default
};
