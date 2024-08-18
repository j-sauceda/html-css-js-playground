import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import Editor from "./components/Editor";
import { languages } from "./utils/enums";

import "./App.css";

const App = () => {
  const delay = 750;
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [source, setSource] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setSource(`
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
        `);
    }, delay);
  }, [html, css, js]);

  const handleHtmlChange = (code: string) => {
    setHtml(code);
  };

  const handleCssChange = (code: string) => {
    setCss(code);
  };

  const handleJsChange = (code: string) => {
    setJs(code);
  };

  return (
    <div className="content container">
      <h1>HTML, CSS & JS playground</h1>
      <div className="code-sandbox">
        <Editor
          code={html}
          height="100%"
          width="100%"
          lang={languages.HTML}
          onChange={handleHtmlChange}
        />
        <Editor
          code={css}
          height="100%"
          width="100%"
          lang={languages.CSS}
          onChange={handleCssChange}
        />
        <Editor
          code={js}
          height="100%"
          width="100%"
          lang={languages.JS}
          onChange={handleJsChange}
        />
        <div
          style={{
            marginBottom: "17px",
            minHeight: "200px",
            maxHeight: "40vh",
          }}
        >
          <span>Output</span>
          <iframe
            className="output"
            srcDoc={source}
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
