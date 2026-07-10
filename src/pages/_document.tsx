import Footer from "@/components/footer";
import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head />
      <body data-bs-theme="light">
        {/* TODO: Dark mode */}
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}

export default Document;
