import { ToastManager } from './ToastManager';

export type ToastVariantType = 'info' | 'error';

export interface ToastOptions {
  description: React.ReactNode;
  variant?: ToastVariantType;
  duration?: number;
  toastId?: number;
}

export const toast = (props: ToastOptions) => {
  const { variant = 'info', duration = 3000, ...restProps } = props;

  return ToastManager.add({
    variant,
    duration,
    ...restProps,
  });
};

toast.info = (props: ToastOptions) => {
  return toast({ variant: 'info', ...props });
};

toast.error = (props: ToastOptions) => {
  return toast({ variant: 'error', ...props });
};
