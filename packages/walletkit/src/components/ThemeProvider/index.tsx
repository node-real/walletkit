import { useEffect, useMemo } from 'react';
import { useWalletKitContext } from '../WalletKitProvider/context';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  const { customTheme } = useWalletKitContext();

  const styles = useMemo(() => {
    if (!customTheme) {
      return {};
    }

    const cssVars: Record<string, string> = {};

    const genCssVar = (input: Record<string, string>, prefix = '') => {
      Object.entries(input).forEach(([key, value]) => {
        const varName = `${prefix}-${key}`;
        if (typeof value !== 'object') {
          cssVars[varName] = value || 'red';
        } else {
          genCssVar(value, varName);
        }
      });
    };
    genCssVar(customTheme as any, `--wk`);

    return cssVars;
  }, [customTheme]);

  useEffect(() => {
    const id = 'wk-cssvars';
    let styleElement = document.getElementById(id);
    if (!styleElement) {
      styleElement = document.createElement('style');

      styleElement.id = id;
      document.documentElement.appendChild(styleElement);
    }

    const str = Object.entries(styles).map(([key, value]) => {
      return `${key}: ${value}`;
    });

    styleElement.textContent = `body {${str.join(';')}}`;
  }, [styles]);

  return <>{children}</>;
}
