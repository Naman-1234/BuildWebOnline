import axios from 'axios';
import useToken from '../Utilities/CustomHooks/Token';
function useDocument() {
  const { token } = useToken();

  //This function is used to delete a document. and does not return anything.
  const deleteDocument = (id) => {
    axios
      .delete(`/users/documents/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(async (result) => {
        console.log('Successfully deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //To fetch all documents associated with logged-in user.
  const getDocuments = async () => {
    try {
      const result = await axios.get(`/users/documents`, {
        headers: {
          Authorization: token,
        },
      });
      return {
        result: result.data,
        msg: 'success',
      };
    } catch (err) {
      return {
        result: err,
        msg: 'err',
      };
    }
  };

  // To add a document, Authorization header is passed to verify authentication middleware.
  const addDocument = async (name, src) => {
    const result = axios.post(
      `/users/documents/add`,
      {
        name: name,
        content: src,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (result) {
      console.log('success in adding document');
      return result;
    }
    return new Error('Got an error in adding document');
  };

  const updateDocument = async (name, src) => {
    const result = axios.patch(
      `/users/documents/add`,
      {
        name: name,
        content: src,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (result) {
      console.log('success in adding document');
      return result;
    }
    return new Error('Got an error in adding document');
  };

  return {
    deleteDocument,
    getDocuments,
    addDocument,
    updateDocument
  };
}
export default useDocument;
