import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import Title from "@/components/title";
import Icon from "@/components/icon";

const DevLogs = () => {
  // Fetch content
  const [content, setContent] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const fetchDevLogs = async () => {
      try {
        const response = await fetch("/devlogs/devlog1.md", {
          signal: controller.signal
        });
        const text = await response.text();
        setContent(text);
      } catch (error) {
        if (error instanceof Error)
          console.error(error.message);
      }
    };
    fetchDevLogs();
    return () => { controller.abort(); }
  }, []);

  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="devlogs" />
      <br />

      <div className="container">
        <h2><Title /><Icon size={40} /> dev logs</h2>
        <hr />
        {/* https://www.markdownguide.org/ */}
        <Markdown remarkPlugins={[remarkGfm]}>
          {content}
        </Markdown>
      </div>
    </div>
  )
};

export default DevLogs;