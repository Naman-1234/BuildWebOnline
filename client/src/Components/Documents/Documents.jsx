import React, { useState, useEffect } from 'react';
import DocumentCard from './DocumentCard';
import Grid from '@material-ui/core/Grid';
import useToken from '../../Utilities/CustomHooks/Token';
import useDocument from '../../api/Documents';
function Documents() {
  const [documents, setdocuments] = useState([]);
  const [showDocuments, setShowDocuments] = useState(false);
  const { token } = useToken();
  const { getDocuments } = useDocument();

  // This is to make an api call to fetch documents from the backend. After that all the
  //  documents will be mapped to show.
  useEffect(() => {
    console.log('Inside useEffect and token is ', token);
    const getDocument = async () => {
      const { result, msg } = await getDocuments();
      if (msg === 'err') console.log(result);
      else {
        await setdocuments(result);
        await setShowDocuments(true);
      }
    };
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div>
      <h1
        style={{
          marginBottom: '50px',
          textAlign: 'center',
        }}
      >
        Your documents are
      </h1>
      <Grid container spacing={3}>
        {showDocuments &&
          documents.map((document, index) => {
            return <DocumentCard document={document} key={index} />;
          })}
      </Grid>
    </div>
  );
}

export default Documents;
