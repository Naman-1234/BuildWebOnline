import { useState } from 'react';
// This custom Hook, Documents is being saved and retrieved. This is a
//efficient way rather than maintaing the same thing in a database.
//Since that will require an api call to backend.
function useDocument() {
  //For retrieving the document.
  const getsrc = () => {
    const src = localStorage.getItem('srcdoc');
    return src;
  };
  const [src, setsrc] = useState(getsrc());
  //For storing the document in localStorage.
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
