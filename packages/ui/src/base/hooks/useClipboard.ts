import { useCallback, useEffect, useState } from 'react';

export function useClipboard(initialValue: string, timeout = 1500) {
  const [hasCopied, setHasCopied] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onCopy = useCallback(() => {
    const didCopy = copy(value);
    setHasCopied(didCopy);
  }, [value]);

  useEffect(() => {
    let timer: any;

    if (hasCopied) {
      timer = setTimeout(() => {
        setHasCopied(false);
      }, timeout);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [timeout, hasCopied]);

  return { value, setValue, onCopy, hasCopied };
}

function copy(value: string) {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = value;

    textarea.style.position = 'absolute';
    textarea.style.zIndex = '-1';

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);
  } catch (err) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value);
    } else {
      return false;
    }
  }

  return true;
}
