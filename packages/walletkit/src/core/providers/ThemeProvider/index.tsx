import { useEffect, useMemo, useState } from 'react';
import { base } from './themes/base';
import { deepMerge } from '@/core/base/utils/common';
import React from 'react';
import { ColorMode, ThemeContext } from './context';

type ThemeWithMode = typeof base;

export type Theme = DeepPartial<ThemeWithMode['light']> & DeepPartial<ThemeWithMode>;

type ThemeVariant = 'base';

export interface ThemeProviderProps {
  variant?: ThemeVariant;
  mode?: 'auto' | ColorMode;
  theme?: Theme;
  children: React.ReactNode;
}

const themeMap: Record<ThemeVariant, any> = {
  base,
};

export function ThemeProvider(props: ThemeProviderProps) {
  const { variant = 'base', mode = 'auto', theme, children } = props;

  const styleContent = useMemo(() => {
    const lightTheme = deepMerge(themeMap[variant].light ?? theme, theme?.light ?? theme);
    const darkTheme = deepMerge(themeMap[variant].dark ?? theme, theme?.dark ?? theme);

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
  }, [theme, mode, variant]);

  const [colorMode, setColorMode] = useState<ColorMode>('light');

  useEffect(() => {
    if (mode === 'auto') {
      const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

      const onChange = () => {
        const cm = matchMedia.matches ? 'dark' : 'light';
        setColorMode(cm);
      };
      onChange();

      matchMedia.addEventListener('change', onChange);
      return () => {
        matchMedia.removeEventListener('change', onChange);
      };
    } else {
      setColorMode(mode);
    }
  }, [mode]);

  const value = useMemo(() => {
    return {
      colorMode,
    };
  }, [colorMode]);

  return (
    <ThemeContext.Provider value={value}>
      <style>{styleContent}</style>
      {children}
    </ThemeContext.Provider>
  );
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
