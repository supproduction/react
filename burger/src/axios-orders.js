import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-52efc.firebaseio.com/'
});

export default instance;