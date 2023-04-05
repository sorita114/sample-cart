import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en">
      <Head>
        <link
            href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css"
            rel="stylesheet"
            type="text/css"
          />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
);

export default Document;