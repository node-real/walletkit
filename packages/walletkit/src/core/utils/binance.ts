/**
 * Detect if running inside the Binance App in-app browser.
 * The Binance App sets window.isBinance = true.
 */
export function isInBinanceApp(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(window.isBinance);
}

/**
 * Detect if the Binance Web3 Wallet browser extension is installed.
 * The extension injects window.binancew3w.
 */
export function isBinanceExtensionInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(window.binancew3w);
}

/**
 * Returns true if any Binance wallet source is available.
 */
export function isBinanceInstalled(): boolean {
  return isInBinanceApp() || isBinanceExtensionInstalled();
}

/**
 * Generate Binance App deep link for the current page.
 */
export function getBinanceAppLink(): string {
  const url = window.location.href;
  const base = 'bnc://app.binance.com/mp/app';
  const appId = 'yFK5FCqYprrXDiVFbhyRx7';
  const startPagePath = window.btoa('/pages/browser/index');
  const startPageQuery = window.btoa(`url=${url}`);
  const deeplink = `${base}?appId=${appId}&startPagePath=${startPagePath}&startPageQuery=${startPageQuery}`;
  const dp = window.btoa(deeplink);
  return `https://app.binance.com/en/download?_dp=${dp}`;
}
