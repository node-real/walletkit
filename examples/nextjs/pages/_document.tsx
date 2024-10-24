import { Html, Head, Main, NextScript } from 'next/document';
import { EthereumScript } from '@node-real/walletkit/evm';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <EthereumScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
