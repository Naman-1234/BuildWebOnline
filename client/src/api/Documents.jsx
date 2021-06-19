import axios from 'axios';
import useToken from '../Utilities/CustomHooks/Token';
function useDocument() {
  const { token } = useToken();
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
  const getDocuments = async () => {
    const result = await axios.get(`/users/documents`, {
      headers: {
        Authorization: token,
      },
    });
    if (result) return result.data;
    else return new Error('Got an error');
  };

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
  return {
    deleteDocument,
    getDocuments,
    addDocument,
  };
}
export default useDocument;
