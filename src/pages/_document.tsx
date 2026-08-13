import Footer from "@/components/footer";
import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en" id="html" data-scroll-behavior="smooth">
      <Head />
      <body className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Main />
          <NextScript />
        </main>
        <br />
        <Footer />
      </body>
    </Html>
  );
}

export default Document;
