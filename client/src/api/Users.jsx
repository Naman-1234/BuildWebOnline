import axios from 'axios';
import useToken from '../Utilities/CustomHooks/Token';
function useUsers() {
  const { token } = useToken();

  //To patch profile,For this it accepts id and new Values
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
      //Two things are returned,one is result and another is msg if it was a success or an error.
      return { result: result.data, msg: 'success' };
    } catch (err) {
      console.log(err);
      return { result: [], msg: 'err' };
    }
  };

  //To delete profile
  const deleteProfile = async (id) => {
    try {
      const result = await axios.delete(`/users/me/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      //Two things are returned,one is result and another is msg if it was a success or an error.
      return { result: result.data, msg: 'success' };
    } catch (err) {
      console.log(err);
      return { result: [], msg: 'err' };
    }
  };

  //To login an user
  const addUser = async (email, password) => {
    try {
      const result = await axios.post(`/users/login`, {
        email: email,
        password: password,
      });
      //Two things are returned,one is result and another is msg if it was a success or an error.
      return { result, msg: 'success' };
    } catch (err) {
      return { result: err, msg: 'err' };
    }
  };

  //For signup of an user,It accepts all the parameters of an user.
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
      //Two things are returned,one is result and another is msg if it was a success or an error.
      return { result, msg: 'success' };
    } catch (err) {
      console.log(err);
      return { result: [], msg: 'err' };
    }
  };

  //For logging out of user
  const logOut = async () => {
    try {
      const result = await axios.get(`/users/logout`, {
        headers: {
          Authorization: token,
        },
      });
      //Two things are returned,one is result and another is msg if it was a success or an error.
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
