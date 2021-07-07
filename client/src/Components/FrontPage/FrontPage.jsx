import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Editors from '../Editors/Editors';
import './FrontPage.scss';
import useDocument from '../../Utilities/CustomHooks/Document';
function FrontPage() {
  const { getsrc } = useDocument();
  const [srcdoc, setSrcdoc] = useState('');
  // Page is being saved every 1 sec, into localStorage,
  
  useEffect(() => {
    const timeInterval = setInterval(() => {
      const src = getsrc();
      setSrcdoc(src);
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [srcdoc]);
 useEffect(()=>{
    const document = localStorage.getItem('srcdoc');
    if(document && document!=='')
    setSrcdoc(document)
  },[]);
  return (
    <div className='frontPage'>
      <Header />
      <div className='frontPage__middle'>
        <Editors srcdoc={srcdoc}/>
      </div>

      <div className='frontPage__iframe'>
        <iframe
          title='output'
          srcDoc={srcdoc}
          sandbox='allow-scripts'
          frameBorder='0'
          width='100%'
          height='100%'
          className='iframe resizable'
        ></iframe>
      </div>
    </div>
  );
}
export default FrontPage;
