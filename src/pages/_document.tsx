import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head />
      <body>
        {/* TODO: Dark mode */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
