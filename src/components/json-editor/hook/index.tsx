import React, { useRef } from 'react';
import JsonEditor from './editor';
import type CodeMirror from 'codemirror';

/** hook dom props */
interface JsonEditorHookProps {
  initValue?: ArticleModuleItem[];
  onSave?: () => void;
  isFormatOnSave?: boolean;
}
/** hook 输出 */
interface JsonEditorHookResult {
  Editor: React.FC<ViewProps<JsonEditorHookProps>>;
  verify: () => boolean;
  getValue: () => string;
  setValue: (content: string) => void;
}

const useJsonEditor = (): JsonEditorHookResult => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const JsonEditorCode = useRef<CodeMirror.EditorFromTextArea>();
  /** 默认通过 */
  const verify = useRef(() => (JsonEditorCode.current ? JsonEditorCode.current.verify() : true));
  /** useRef 保证 this*/
  const getValue = useRef(() => (JsonEditorCode.current ? JsonEditorCode.current.getValue() : ''));

  const setValue = useRef((v: string) => JsonEditorCode.current && JsonEditorCode.current.setValue(v));
  /** */
  const Editor = useRef<React.FC<ViewProps<JsonEditorHookProps>>>((props) => (
    <JsonEditor {...props} textareaRef={textareaRef} JsonEditorCode={JsonEditorCode}></JsonEditor>
  ));
  //return
  return {
    verify: verify.current,
    Editor: Editor.current,
    getValue: getValue.current,
    setValue: setValue.current,
  };
};
export default useJsonEditor;
