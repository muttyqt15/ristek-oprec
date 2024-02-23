import React, { useEffect, useRef } from "react";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { json } from "@codemirror/lang-json";
interface JsonEditorProps {
  value: string;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [basicSetup, json()],
      }),
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, [value]);

  return <div ref={editorRef} />;
};

export default JsonEditor;
