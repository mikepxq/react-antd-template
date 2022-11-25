import { jsonParseNoThrow, linkJs } from '@/utils';
import CodeMirror from 'codemirror';
import React, { useEffect, useState } from 'react';

//css
import 'codemirror/addon/lint/lint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/rubyblue.css';
//js 检查
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
//折叠
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import JsonEditorPreview from './preview/template-0';
import { PatternMap } from '@/config';
import { appNotification } from '@/plugins/antd';
import ToolNav from './tool-nav';
import styled, { createGlobalStyle } from 'styled-components';

interface Props {
  initValue?: ArticleModuleItem[];
  /** value别名 可以类型检查 */

  textareaRef: React.RefObject<HTMLTextAreaElement>;
  JsonEditorCode: React.MutableRefObject<CodeMirror.EditorFromTextArea | undefined>;
  onSave?: () => void;
  isFormatOnSave?: boolean;
}
let keyDownString = '';
/** 默认去除前后空格 */
const JsonEditor: React.FC<ViewProps<Props>> = (props) => {
  const { className = '', textareaRef, JsonEditorCode, initValue = [], isFormatOnSave } = props;
  const [jsonString, setJsonString] = useState(JSON.stringify(initValue, null, 2));
  const init = async () => {
    await linkJs('https://unpkg.com/jsonlint@1.6.3/web/jsonlint.js');
    await import('codemirror/addon/lint/json-lint');
    if (!textareaRef.current) return;
    JsonEditorCode.current = CodeMirror.fromTextArea(textareaRef.current, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      lint: true,
      theme: 'rubyblue',
      // lineWrapping: true, //代码折叠
      foldGutter: true,
    });

    JsonEditorCode.current.setValue(jsonString);
    //挂载验证函数
    JsonEditorCode.current.verify = () => {
      if (!textareaRef.current) return false;
      const errorList = document.querySelectorAll('.json-editor .CodeMirror-lint-marker-error');
      return errorList.length < 1;
    };
    JsonEditorCode.current.on('change', (cm) => {
      // 提前验证
      const _result = jsonParseNoThrow(cm.getValue(), false);
      if (!_result) return;

      setJsonString(cm.getValue());
    });
  };

  //init
  useEffect(() => {
    init();
  }, []);

  //render
  return (
    <Wrap
      id="json-editor"
      className={`json-editor flex-column ${className}`}
      onKeyDown={(e) => {
        keyDownString = `${keyDownString ? keyDownString + '-' : ''}${e.key.toLocaleLowerCase()}`;
        //1.meta-s 保存时
        if (!PatternMap.saveKeydown.test(keyDownString)) return;
        e.preventDefault();
        //1.1 这个基本有
        if (!JsonEditorCode.current) return;
        //2.验证
        const isOk = JsonEditorCode.current.verify();
        if (!isOk) return appNotification.warn({ message: '验证失败!' });
        //3.格式化
        const _jsonData = jsonParseNoThrow(jsonString);
        const _position = JsonEditorCode.current.getCursor();
        if (isFormatOnSave && _jsonData)
          JsonEditorCode.current.setValue(JSON.stringify(jsonParseNoThrow(jsonString), null, 2));
        JsonEditorCode.current.setCursor(_position);
        props.onSave && props.onSave();
      }}
      onKeyUp={() => {
        keyDownString = '';
      }}>
      <ToolNav></ToolNav>
      <div className="container">
        <section className="edit-wrap b">
          <textarea ref={props.textareaRef} />
        </section>

        <JsonEditorPreview className="pre-wrap" list={jsonParseNoThrow(jsonString) || []}></JsonEditorPreview>
      </div>
      <GlobalStyle></GlobalStyle>
    </Wrap>
  );
};
//style
const Wrap = styled.div`
  display: flex;
  flex-grow: 2;
  overflow: hidden;
  border: 1px solid #d9d9d9;
  border-top: none;
  > .container {
    display: flex;
    flex-grow: 2;
    overflow: hidden;
    > * {
      width: 50%;
    }
  }

  .CodeMirror {
    height: 100%;
    .CodeMirror-scroll {
      max-width: 100%;
      height: 100%;
      padding-bottom: 16px;
      * {
        word-break: break-all;
      }
    }
  }
  // tool-nav
  .tool-nav {
    background-color: #fff;
    padding: 5px 10px;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    > * {
      display: inline-block;
      min-width: 25px;
      height: 25px;
      padding: 2px;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      & + * {
        margin-left: 5px;
      }
    }
    .full-screen {
      > * {
        background-color: rgba(255, 255, 255, 0.909);
        font-size: 20px;
      }
    }
  }

  // preview
`;
const GlobalStyle: any = createGlobalStyle`
   .json-editor-preview {
    overflow-y: auto;
    padding: 10px;
    position: relative;

    .intro {
      .text-item {
        margin-bottom: 0;
      }
    }
  }
`;

export default JsonEditor;
