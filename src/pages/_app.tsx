import "@/styles/globals.css";
import "@/styles/bootstrap-zephyr.css";
// import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);
  return (<Component {...pageProps} />)
}

export default App;
