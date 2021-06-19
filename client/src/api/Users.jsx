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

  const deleteProfile = async (id) => {
    try {
      const result = await axios.delete(`/users/me/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return { result: result.data, msg: 'success' };
    } catch (err) {
      console.log(err);
      return { result: [], msg: 'err' };
    }
  };

  const addUser = async (email, password) => {
    try {
      const result = await axios.post(`/users/login`, {
        email: email,
        password: password,
      });
      return { result, msg: 'success' };
    } catch (err) {
      return { result: err, msg: 'err' };
    }
  };

  const signUpUser = async (name, phoneNo, gender, email, password, avatar) => {
    try {
      const result = await axios.post(`/users/signup`, {
        name: name,
        phoneNo: phoneNo,
        gender: gender,
        email: email,
        password: password,
        avatar: avatar,
      });
      return { result, msg: 'success' };
    } catch (err) {
      console.log(err);
      return { result: [], msg: 'err' };
    }
  };
  const logOut = async () => {
    try {
      const result = await axios.get(`/users/logout`, {
        headers: {
          Authorization: token,
        },
      });
      return { result, msg: 'success' };
    } catch (err) {
      return { result: err, msg: 'err' };
    }
  };
  return {
    updateProfile,
    deleteProfile,
    addUser,
    signUpUser,
    logOut,
  };
}
export default useUsers;
