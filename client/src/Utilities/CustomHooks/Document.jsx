import { useState } from 'react';
function useDocument() {
  const getsrc = () => {
    const src = localStorage.getItem('srcdoc');
    console.group();
    console.log(src);
    console.log(typeof src);
    console.groupEnd();
    return src;
  };
  const [src, setsrc] = useState(getsrc());
  const saveSrc = (srcFromEditor) => {
    localStorage.setItem('srcdoc', srcFromEditor);
    setsrc(src);
  };
  return {
    src,
    saveSrc,
    getsrc,
  };
}

export default useDocument;
