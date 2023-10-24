import { ToastOptions } from '.';

type SubscribeFuncType = (toastList: ToastOptions[]) => void;

export const ToastManager = {
  listeners: [] as SubscribeFuncType[],

  toastList: [] as ToastOptions[],
  autoIncreaseId: 0,

  add(options: ToastOptions) {
    const toastId = this.autoIncreaseId++;

    this.toastList.push({
      toastId,
      ...options,
    });

    this.notify();

    return toastId;
  },

  remove(toastId?: number) {
    const index = this.toastList.findIndex((item) => item.toastId === toastId);
    if (index > -1) {
      this.toastList.splice(index, 1);
      this.notify();
    }
  },

  notify() {
    this.listeners.forEach((fn) => {
      fn([...this.toastList]);
    });
  },

  subscribe(fn: SubscribeFuncType) {
    this.listeners.push(fn);
  },

  unsubscribe(fn: SubscribeFuncType) {
    const index = this.listeners.findIndex((item) => item === fn);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  },
};
