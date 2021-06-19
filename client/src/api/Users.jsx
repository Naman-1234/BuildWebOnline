import axios from 'axios';
import useToken from '../Utilities/CustomHooks/Token';
function useUsers() {
  const { token } = useToken();
  const updateProfile = async (id, name, phoneNo, gender, email, imageSrc) => {
    try {
      const result = await axios.patch(
        `/users/me/${id}`,
        {
          name: name,
          phoneNo: phoneNo,
          gender: gender,
          email: email,
          avatar: imageSrc,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return { result: result.data, msg: 'success' };
    } catch (err) {
      console.log(err);
      return { result: [], msg: 'err' };
    }
  };
  return {
    updateProfile,
  };
}
export default useUsers;
