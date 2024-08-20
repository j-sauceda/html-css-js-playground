import { FC, ChangeEvent } from "react";
import CodeMirror from "@uiw/react-codemirror";

// utils
import { languages } from "../utils/enums";

// CodeMirror extensions
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";

// CodeMirror languages' support
import { css as lang_css } from "@codemirror/lang-css";
import { html as lang_html } from "@codemirror/lang-html";
import { javascript as lang_js } from "@codemirror/lang-javascript";

// CodeMirror themes
import { materialLight } from "@uiw/codemirror-theme-material";

interface EditorProps {
  height: string;
  width: string;
  lang: languages;
  code: string;
  onChange: (code: string) => void;
  onSelectCSS?: (option: string) => void;
  onSelectJS?: (option: string) => void;
}

const Editor: FC<EditorProps> = ({
  height,
  width,
  lang,
  code,
  onChange,
  onSelectCSS,
  onSelectJS,
}) => {
  let langExtension;
  let title = "";

  switch (lang) {
    case languages.CSS:
      title = "CSS3";
      langExtension = lang_css();
      break;
    case languages.HTML:
      title = "HTML5";
      langExtension = lang_html({
        matchClosingTags: true,
        autoCloseTags: true,
      });
      break;
    case languages.JS:
      title = "Javascript (check the browser console)";
      langExtension = lang_js({ typescript: true });
      break;
  }

  const handleCssSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value || "-";
    if (!!onSelectCSS) onSelectCSS(option);
  };

  const handleJsSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value || "-";
    if (!!onSelectJS) onSelectJS(option);
  };

  return (
    <div className="editor">
      <span className="subtitle">
        {title}
        {lang === languages.CSS && (
          <select name="css-options" onChange={handleCssSelect}>
            <option value="-">CSS framework</option>
            <option value="bootstrap">Bootstrap CSS 5.3</option>
            <option value="bulma">Bulma CSS 1.0</option>
            <option value="materialize">Materialize 2.1</option>
            <option value="tailwind">Tailwind CSS (CDN)</option>
          </select>
        )}
        {lang === languages.JS && (
          <select name="js-options" onChange={handleJsSelect}>
            <option value="-">JS framework</option>
            <option value="alpine">Alpine JS 3.14</option>
            <option value="htmx">HTMX 2.0</option>
            <option value="jquery">jQuery 3.7</option>
          </select>
        )}
      </span>
      <CodeMirror
        theme={materialLight}
        height={height}
        width={width}
        minHeight="200px"
        maxHeight="40vh"
        value={code}
        extensions={[
          basicSetup({
            allowMultipleSelections: true,
            autocompletion: true,
            indentOnInput: true,
            tabSize: 2,
          }),
          langExtension,
        ]}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};

export default Editor;
