import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

const DevLogs = () => {
  // Fetch content
  const [content, setContent] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const fetchDevLogs = async () => {
      try {
        const response = await fetch("/devlogs/devlogs.md", {
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
        {/* https://www.markdownguide.org/ */}
        <Markdown remarkPlugins={[remarkGfm]}>
          {content}
        </Markdown>
      </div>
    </div>
  )
};

export default DevLogs;