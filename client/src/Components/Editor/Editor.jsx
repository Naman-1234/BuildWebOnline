import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/mode/javascript/javascript';
import { Controlled } from 'react-codemirror2';
//Using controlled one means ,onChange will be defined by us,In more technical aspect it will demand
//State management from the user and prevent any changes unless specified by the user.
import './Editor.scss';
function Editor(props) {
  const { language, value, onchange } = props;
  const handleChange = (editor, data, value) => {
    onchange(value);
  };
  return (
    <div className='editor'>
      <Controlled
        value={value}
        options={{
          lineNumbers: true,
          line: true,
          lineWrapping: true,
          mode: language,
          theme: 'monokai',
          smartIndent: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          autoCloseTags: true,
          keyMap: 'sublime',
          matchBrackets: true,
          autoCloseBrackets: true,
          extraKeys: {
            'Ctrl-Space': 'autocomplete',
          },
          viewportMargin: 99,
        }}
        className='codeMirror-editor'
        onBeforeChange={handleChange}
      />
    </div>
  );
}

export default Editor;
