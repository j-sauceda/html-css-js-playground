import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import Editor from "./components/Editor";
import { languages } from "./utils/enums";

import "./App.css";

const App = () => {
  const delay = 750;
  // language variables
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [source, setSource] = useState("");

  // CSS frameworks' state
  const [isBootstrapLoaded, setIsBootstrapLoaded] = useLocalStorage(
    "bootstrap",
    false
  );
  const [isBulmaLoaded, setIsBulmaLoaded] = useLocalStorage("bulma", false);
  const [isMaterializeLoaded, setIsMaterializeLoaded] = useLocalStorage(
    "materialize",
    false
  );
  const [isTailwindLoaded, setIsTailwindLoaded] = useLocalStorage(
    "tailwind",
    false
  );

  // HTML & JS libraries' state
  const [isAlpineLoaded, setIsAlpineLoaded] = useLocalStorage("alpine", false);
  const [isHtmxLoaded, setIsHtmxLoaded] = useLocalStorage("htmx", false);
  const [isJQueryLoaded, setIsJQueryLoaded] = useLocalStorage("jquery", false);

  // libraries variables
  const alpineJS = '<script defer src="/js/alpine-3.14.1.min.js"></script>';
  const bootstrapCSS = '<link href="/css/bootstrap.min.css" rel="stylesheet">';
  const bootstrapJS = '<script src="/js/bootstrap.bundle.min.js"></script>';
  const bulmaCSS = '<link rel="stylesheet" href="/css/bulma.min.css">';
  const htmxJS = '<script src="/js/htmx-2.0.2.min.js"></script>';
  const jQuery = '<script src="/js/jquery-3.7.1.min.js"></script>';
  const materializeCSS =
    '<link rel="stylesheet" href="/css/materialize.min.css">';
  const materializeJS = '<script src="/js/materialize.min.js"></script>';
  const tailwindCDN = '<script src="https://cdn.tailwindcss.com"></script>';

  useEffect(() => {
    setTimeout(() => {
      setSource(`
        <head>
          ${isBootstrapLoaded ? bootstrapCSS : ""}
          ${isBulmaLoaded ? bulmaCSS : ""}
          ${isMaterializeLoaded ? materializeCSS : ""}
          ${isTailwindLoaded ? tailwindCDN : ""}
        </head>
        <body>${html}</body>
        <style>${css}</style>
          ${isJQueryLoaded ? jQuery : ""}
        <script>${js}</script>
          ${isAlpineLoaded ? alpineJS : ""}
          ${isBootstrapLoaded ? bootstrapJS : ""}
          ${isHtmxLoaded ? htmxJS : ""}
          ${isMaterializeLoaded ? materializeJS : ""}
        `);
    }, delay);
  }, [
    html,
    css,
    js,
    isAlpineLoaded,
    isBootstrapLoaded,
    isBulmaLoaded,
    isHtmxLoaded,
    isJQueryLoaded,
    isMaterializeLoaded,
    isTailwindLoaded,
  ]);

  const handleHtmlChange = (code: string) => {
    setHtml(code);
  };

  const handleCssChange = (code: string) => {
    setCss(code);
  };

  const handleJsChange = (code: string) => {
    setJs(code);
  };

  const handleCssSelect = (option: string) => {
    option === "bootstrap"
      ? setIsBootstrapLoaded(true)
      : setIsBootstrapLoaded(false);
    option === "bulma" ? setIsBulmaLoaded(true) : setIsBulmaLoaded(false);
    option === "materialize"
      ? setIsMaterializeLoaded(true)
      : setIsMaterializeLoaded(false);
    option === "tailwind"
      ? setIsTailwindLoaded(true)
      : setIsTailwindLoaded(false);
  };

  const handleJsSelect = (option: string) => {
    option === "alpine" ? setIsAlpineLoaded(true) : setIsAlpineLoaded(false);
    option === "htmx" ? setIsHtmxLoaded(true) : setIsHtmxLoaded(false);
    option === "jquery" ? setIsJQueryLoaded(true) : setIsJQueryLoaded(false);
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
          onSelectCSS={handleCssSelect}
        />
        <Editor
          code={js}
          height="100%"
          width="100%"
          lang={languages.JS}
          onChange={handleJsChange}
          onSelectJS={handleJsSelect}
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
            title="source output"
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
