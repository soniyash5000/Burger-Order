import axios from 'axios';

const instance =  axios.create({
    baseURL: 'https://my-burger-e3730-default-rtdb.firebaseio.com/'
});

export default instance;