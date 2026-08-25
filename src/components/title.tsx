import { getCookie } from "@/cookieManager";
import { useEffect, useRef, useState } from "react";

const Title = () => {
  const [theme, setTheme] = useState("light");
  const themeSet = useRef(false);
  useEffect(() => {
    if (!themeSet.current)
      setTheme(getCookie("theme") ?? "light");
    return () => { themeSet.current = true; }
  }, [])
  return <strong>
    <span className={theme === "light" ? "title-grey" : "title-white"}>Pawver</span>
    <span className="title-orange">watch</span>
  </strong>
};

export default Title;
