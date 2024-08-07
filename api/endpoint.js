// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { refreshAccessToken,validateAccessToken } from '../utils/validation';
// const endpoint = axios.create({
//   baseURL: 'https://www.tatd.in/app-api/customer/',
// });
// endpoint.interceptors.request.use(
//   async (config) => {
//     const userData = await AsyncStorage.getItem('userData');
//     const parsedUserData = userData ? JSON.parse(userData) : null;
//     const token = parsedUserData ? parsedUserData.jwt : null;
//  console.log('token====',token)
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );




// export default endpoint;

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshAccessToken, validateAccessToken } from '../utils/validation';

const endpoint = axios.create({
  baseURL: 'https://www.tatd.in/app-api/customer/',
});

endpoint.interceptors.request.use(
  async (config) => {
    let userData = await AsyncStorage.getItem('userData');
    let parsedUserData = userData ? JSON.parse(userData) : null;
    let token = parsedUserData ? parsedUserData.jwt : null;
    if (token) {
      const isValid = await validateAccessToken();
      if (!isValid) {
        await refreshAccessToken();
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default endpoint;
