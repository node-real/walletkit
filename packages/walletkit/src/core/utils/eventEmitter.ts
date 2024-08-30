type CallBack = (...params: any[]) => void;

class CustomEventEmitter {
  listenersMap: Record<string, CallBack[]>;
  constructor() {
    this.listenersMap = {};
  }

  on(event: string, cb: CallBack) {
    if (!this.listenersMap[event]) this.listenersMap[event] = [];
    this.listenersMap[event].push(cb);
  }

  emit(event: string, ...params: any[]) {
    const listener = this.listenersMap[event];
    if (listener) {
      listener.forEach((cb) => cb(params));
    }
  }

  off(event: string, cb: CallBack) {
    const listeners = this.listenersMap[event];
    if (listeners) {
      const index = listeners.findIndex((item) => item === cb);
      if (index > -1) {
        listeners.splice(index);
      }
    }
  }

  SOLANA_WALLET_ERROR = 'SOLANA_WALLET_ERROR';
  EVM_CONNECT_ERROR = 'EVM_CONNECT_ERROR';
  EVM_CONNECT_SETTLE = 'EVM_CONNECT_SETTLE';
}

export const EventEmitter = new CustomEventEmitter();
