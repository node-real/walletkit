import { Html, Head, Main, NextScript } from 'next/document';
import { EthereumScript } from '@totejs/walletkit';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>WalletKit Next.js Example</title>
        <EthereumScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
