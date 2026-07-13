import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import Title from "@/components/title";
import Icon from "@/components/icon";

interface DevLogData {
  path: string
}

const DevLogs = () => {
  const [devLogData, setDevLogData] = useState<DevLogData[]>([]);
  const [devLogIndex, setDevLogIndex] = useState(0);
  const [content, setContent] = useState("");
  // Fetch data from json first
  useEffect(() => {
    const controller = new AbortController();
    const fetchDevLogData = async () => {
      const response = await fetch("/data/devlogs.json", { signal: controller.signal });
      const data = await response.json();
      setDevLogData(data);
    };
    fetchDevLogData();
    return () => { controller.abort(); }
  }, []);
  // Then fetch content
  useEffect(() => {
    if (devLogData.length == 0) return;
    const fetchDevLog = async (index: number) => {
      const response = await fetch(devLogData[index].path);
      const text = await response.text();
      setContent(text);
    };
    fetchDevLog(devLogIndex);
  }, [devLogData, devLogIndex]);

  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="devlogs" />
      <br />

      <div className="container">
        <h2><Title /><Icon size={40} /> development logs</h2>
        <hr />
        {/* https://www.markdownguide.org/ */}
        <Markdown remarkPlugins={[remarkGfm]}>
          {content}
        </Markdown>
      </div>
      <br />

      {/* Navigation button */}
      <div className="container text-center">
        <button
          type="button"
          className="btn btn-secondary m-1"
          disabled={devLogIndex >= devLogData.length - 1}
          onClick={() => setDevLogIndex(devLogIndex + 1)}>
          Earlier <i className="bi bi-arrow-left-circle-fill"></i>
        </button>
        <button
          type="button"
          className="btn btn-secondary m-1"
          disabled={devLogIndex <= 0}
          onClick={() => setDevLogIndex(devLogIndex - 1)}>
          Later <i className="bi bi-arrow-right-circle-fill"></i>
        </button>
      </div>
    </div>
  )
};

export default DevLogs;