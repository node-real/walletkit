import { useEffect, useMemo } from 'react';
import { CustomTheme, base } from '../../themes/base';
import { deepMerge } from '../../utils/common';

export type ThemeMode = 'auto' | 'dark' | 'light';

export type ThemeVariant = 'base';

export interface ThemeProviderProps {
  variant: ThemeVariant;
  mode: ThemeMode;
  children: React.ReactNode;
  customTheme?: CustomTheme;
}

const themeMap: Record<ThemeVariant, any> = {
  base,
};

export function ThemeProvider(props: ThemeProviderProps) {
  const { variant, mode, customTheme, children } = props;

  const styleContent = useMemo(() => {
    const theme = themeMap[variant];

    const lightTheme = deepMerge(theme.light ?? theme, customTheme?.light ?? customTheme);
    const darkTheme = deepMerge(theme.dark ?? theme, customTheme?.dark ?? customTheme);

    const lightCssVars = createCssVars(lightTheme, '--wk-light');
    const darkCssVars = createCssVars(darkTheme, '--wk-dark');
    const lightPointer = createPointer(lightCssVars);
    const darkPointer = createPointer(darkCssVars);

    const lightCssVarsContent = createStyleContent(lightCssVars);
    const darkCssVarsContent = createStyleContent(darkCssVars);
    const lightPointerContent = createStyleContent(lightPointer);
    const darkPointerContent = createStyleContent(darkPointer);

    if (mode === 'light') {
      return `body {
        ${lightPointerContent};
        ${lightCssVarsContent};
      }`;
    }
    if (mode === 'dark') {
      return `body {
        ${darkPointerContent};
        ${darkCssVarsContent};
      }`;
    }
    if (mode === 'auto') {
      return `body {
        ${lightCssVarsContent};
        ${darkCssVarsContent};
        @media (prefers-color-scheme: light) {
          ${lightPointerContent};
        }
        @media (prefers-color-scheme: dark) {
          ${darkPointerContent};
        }
      }`;
    }

    return '';
  }, [customTheme, mode, variant]);

  useEffect(() => {
    const id = 'wk-cssvars';

    let styleElement = document.getElementById(id);
    if (!styleElement) {
      styleElement = document.createElement('style');

      styleElement.id = id;
      document.documentElement.appendChild(styleElement);
    }

    styleElement.textContent = styleContent;
  }, [styleContent]);

  return <>{children}</>;
}

function createCssVars(theme: Record<string, string>, prefix = '') {
  const cssVars: Record<string, string> = {};

  const walk = (input: Record<string, string>, prefix = '') => {
    Object.entries(input).forEach(([key, value]) => {
      const varName = `${prefix}-${key}`;
      if (typeof value !== 'object') {
        cssVars[varName] = value;
      } else {
        walk(value, varName);
      }
    });
  };

  walk(theme as any, prefix);

  return cssVars;
}

function createStyleContent(cssVars: Record<string, string>) {
  return Object.entries(cssVars)
    .map(([key, value]) => {
      return `${key}: ${value}`;
    })
    .join(';');
}

function createPointer(cssVars: Record<string, string>) {
  const pointers: Record<string, string> = {};

  Object.keys(cssVars).forEach((item) => {
    // eslint-disable-next-line no-useless-escape
    const key = item.replace(/\-light|\-dark/g, '');
    const value = `var(${item})`;
    pointers[key] = value;
  });

  return pointers;
}
