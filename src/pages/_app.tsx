import "@/styles/globals.css";
import "@/styles/bootstrap-zephyr.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { getCookie } from "@/cookieManager";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Bootstrap JavaScript for functionalities
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("bootstrap/dist/js/bootstrap.bundle.js");

    // Set dark/light theme
    const theme = getCookie("theme") ?? "light";
    document?.getElementById("html")?.setAttribute("data-bs-theme", theme);
  }, []);
  return (<Component {...pageProps} />)
}

export default App;
