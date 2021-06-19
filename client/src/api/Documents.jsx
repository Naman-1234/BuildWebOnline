import axios from 'axios';
import useToken from '../Utilities/CustomHooks/Token';
function Document(){
    const {token} = useToken();
    const deleteDocument = (id)=>{
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
    }
    
    

return {
    deleteDocument
}
}
export default Document;