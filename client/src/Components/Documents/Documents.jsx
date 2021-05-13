import React, { useState, useEffect } from "react";
import axios from "axios";
import DocumentCard from "./DocumentCard";
import Grid from "@material-ui/core/Grid";
import useToken from "../../Utilities/CustomHooks/Token";
const { REACT_APP_URL } = process.env;
function Documents() {
  const [documents, setdocuments] = useState([]);
  const [showDocuments, setShowDocuments] = useState(false);
  const { token, setToken } = useToken();
  useEffect(() => {
    axios
      .get(`/users/documents`, {
        headers: {
          Authorization: token,
        },
      })
      .then(async (result) => {
        setdocuments(result.data);
        setShowDocuments(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1
        style={{
          marginBottom: "50px",
          textAlign: "center",
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
