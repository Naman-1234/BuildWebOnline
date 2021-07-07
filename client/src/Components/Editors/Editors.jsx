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
    }, 1000);
    //This is a cleanUp Function so to not let any shaking effect while refreshing
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, javascript]);
  useEffect(()=>{
    const srcdoc =localStorage.getItem('srcdoc');
    console.log(srcdoc)
    let breakString = srcdoc.trim()
    let startIndex = breakString.indexOf('<body>');
    let endIndex = breakString.indexOf('</body>')
    let requiredPart = breakString.substr(startIndex,endIndex-startIndex)
    console.log('In useEffect',requiredPart)
    handleHtml(requiredPart)
    startIndex = breakString.indexOf('<style>');
    endIndex = breakString.indexOf('</style>')
    requiredPart = breakString.substr(startIndex+7,endIndex-startIndex-7)
    console.log('In useEffect',requiredPart)
    handleCss(requiredPart)
     startIndex = breakString.indexOf('<script>');
    endIndex = breakString.indexOf('</script>')
    requiredPart = breakString.substr(startIndex+8,endIndex-startIndex-8)
    console.log('In useEffect',requiredPart)
    handleJs(requiredPart)
  },[])
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
