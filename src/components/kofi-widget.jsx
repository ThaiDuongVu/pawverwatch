import { useEffect } from "react";

const KofiWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
    script.async = true;

    script.onload = () => {
      window.kofiWidgetOverlay.draw("wingnight", {
        "type": "floating-chat",
        "floating-chat.donateButton.text": "Support me",
        "floating-chat.donateButton.background-color": "#00b9fe",
        "floating-chat.donateButton.text-color": "#fff"
      });
    };

    document.body.appendChild(script);

    // Cleanup script on unmount
    return () => { document.body.removeChild(script) };
  }, []);

  return null;
}

export default KofiWidget;
