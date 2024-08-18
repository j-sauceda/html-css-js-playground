import { FC } from "react";
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
}

const Editor: FC<EditorProps> = ({ height, width, lang, code, onChange }) => {
  let langExtension;
  let title = "";

  switch (lang) {
    case languages.CSS:
      title = "CSS";
      langExtension = lang_css();
      break;
    case languages.HTML:
      title = "HTML";
      langExtension = lang_html({
        matchClosingTags: true,
        autoCloseTags: true,
      });
      break;
    case languages.JS:
      title = "Javascript";
      langExtension = lang_js({ typescript: true });
      break;
  }

  return (
    <div className="editor">
      <span>{title}</span>
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
