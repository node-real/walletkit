import { theme } from '../themes';
import { deepMerge } from '../utils/common';

export function getDefaultTheme(customTheme?: Record<string, any>) {
  const finalTheme = deepMerge({ ...theme }, customTheme);
  return finalTheme;
}
