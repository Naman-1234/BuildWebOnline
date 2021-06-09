import axios from 'axios';
const fetchImage = async (token, cb) => {
  const avatar = await axios.get('/users/me/avatar', {
    headers: {
      Authorization: token,
    },
  });
  const bufferData = avatar.data;
  console.log(bufferData);
  console.log(avatar);
  return avatar.data;
};
export default fetchImage;
