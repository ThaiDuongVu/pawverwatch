import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import { getCookie, setCookie } from "@/cookieManager";
import { useState, useEffect, useRef } from "react";

const Settings = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const themeSet = useRef(false);
  useEffect(() => {
    if (!themeSet.current) {
      const theme = getCookie("theme");
      setDarkMode(theme === "dark");
    }
    return () => { themeSet.current = true; }
  }, [isDarkMode, themeSet]);

  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="settings" />
      <br />

      <div className="container text-center">
        <h4>Settings <i className="bi bi-gear-fill"></i></h4>
        <hr />
        <form className="mx-auto d-flex justify-content-center">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkCheck"
              checked={isDarkMode}
              onChange={(event) => {
                setCookie("theme", event.target.checked ? "dark" : "light");
                setDarkMode(event.target.checked);
              }}
            />
            <label className="form-check-label" htmlFor="darkCheck">
              Dark theme <i className="bi bi-moon-stars-fill"></i>
            </label>
          </div>
        </form>

        <hr />
        <p className="text-body-tertiary fst-italic">Changes applied on refresh</p>
      </div>

    </div>
  );
}

export default Settings;
