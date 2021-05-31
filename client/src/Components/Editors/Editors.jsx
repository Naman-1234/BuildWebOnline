import React, { useState, useEffect } from 'react';
import useDocument from '../../Utilities/CustomHooks/Document';
import Editor from '../Editor/Editor';
import './Editors.scss';
function Editors() {
  //Making useState to handle Change in html and others
  const [html, handleHtml] = useState('');
  const [css, handleCss] = useState('');
  const [javascript, handleJs] = useState('');
  const { getsrc, saveSrc } = useDocument();

  //This useEffect is to handle Change in code, As soon as user stops for about 200 millisecond
  //It will render it
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveSrc(`<html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${javascript}</script>
          </html>`);
    }, 100);
    //This is a cleanUp Function so to not let any shaking effect while refreshing
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, javascript]);

  // useEffect(() => {
  //   const src = getsrc();
  //   if (src) {
  //     const srcdoc = getsrc();
  //     let index1 = srcdoc.indexOf('<body>');
  //     let index2 = srcdoc.indexOf('</body>');
  //     if (index1 !== -1)
  //       handleHtml(srcdoc.substr(index1 + 6, index2 - (index1 + 6)));
  //     index1 = srcdoc.indexOf('<style>');
  //     index2 = srcdoc.indexOf('</style>');
  //     if (index1 !== -1)
  //       handleCss(srcdoc.substr(index1 + 7, index2 - (index1 + 7)));
  //     index1 = srcdoc.indexOf('<script>');
  //     index2 = srcdoc.indexOf('</script>');
  //     if (index1 !== -1)
  //       handleJs(srcdoc.substr(index1 + 8, index2 - (index1 + 8)));
  //   }
  // }, []);
  return (
    <div className='editors'>
      <Editor language='html' value={html} onchange={handleHtml} name='html' />
      <Editor language='css' value={css} onchange={handleCss} name='css' />
      <Editor
        language='javascript'
        value={javascript}
        onchange={handleJs}
        name='js'
      />
    </div>
  );
}
export default Editors;
