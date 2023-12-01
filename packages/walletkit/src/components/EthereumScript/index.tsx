export function EthereumScript() {
  const scriptHtml = `
    (function() {
      try {
        const isMobile =
          /android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        if (!isMobile && window.ethereum && window.ethereum.isMetaMask && window.trustwallet) {
          const originalEthereum = window.ethereum;

          Object.defineProperty(window, 'ethereum', {
            enumerable: true,
            configurable: true,
            set(v) {
              if (v.isTrust || v.isTrustWallet) return;
              this.value = v;
            },
            get() {
              return this.value ?? originalEthereum;
            },
          });
        }
      } catch (err) {
        console.error('[ethereum script]', err);
      }
    })()
  `;
  return <script dangerouslySetInnerHTML={{ __html: scriptHtml }} />;
}
