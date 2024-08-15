type CallBack = (params: any) => void;

class CustomEventEmitter {
  listenersMap: Record<string, CallBack[]>;
  constructor() {
    this.listenersMap = {};
  }

  on(event: string, cb: CallBack) {
    if (!this.listenersMap[event]) this.listenersMap[event] = [];
    this.listenersMap[event].push(cb);
  }

  emit(event: string, data: any) {
    const listener = this.listenersMap[event];
    if (listener) {
      listener.forEach((cb) => cb(data));
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

  SolanaWalletError = 'SolanaWalletError';
}

export const EventEmitter = new CustomEventEmitter();
