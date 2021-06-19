import axios from 'axios';

//To fetch Image(Basically an avatar of User,if user have not uploaded any user,then It passes sample data)
const fetchImage = async (token, cb) => {
  try {
    const avatar = await axios.get('/users/me/avatar', {
      headers: {
        Authorization: token,
      },
    });
    return avatar.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export default fetchImage;
