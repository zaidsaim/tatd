// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = 'https://www.tatd.in/app-api/customer/';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
// });

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const userData = await AsyncStorage.getItem('userData');
//     const parsedUserData = userData ? JSON.parse(userData) : null;
//     const token = parsedUserData ? parsedUserData.jwt : null;
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const userData = await AsyncStorage.getItem('userData');
//         const parsedUserData = userData ? JSON.parse(userData) : null;
//         const refreshToken = parsedUserData ? parsedUserData.refresh_token : null;
//         if (!refreshToken) {
//           throw new Error("No refresh token found");
//         }

//         const refreshResponse = await axios.post(`${API_BASE_URL}refresh_token.php`, {}, {
//           headers: {
//             'Authorization': `Bearer ${refreshToken}`,
//           },
//         });

//         const newAccessToken = refreshResponse.data.jwt;
//         parsedUserData.jwt = newAccessToken;
//         await AsyncStorage.setItem('userData', JSON.stringify(parsedUserData));

//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {API_BASE_URL} from '../constant/path';
const API_BASE_URL = 'https://www.tatd.in/app-api/customer/'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // console.log('Request headers:', config.headers);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    console.log('Error response:', error.response);

    if (
      error.response.status === 401 ||
      error.response.status === 400 ||
      (error.response.data.message === 'Token has expired' &&
        !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      console.log('Refresh token:', refreshToken);

      if (refreshToken) {
        try {
          const res = await axios.post(
            'https://www.tatd.in/app-api/driver/login/refresh_token.php',
            {refresh_token: refreshToken},
          );

          if (res.data.jwt) {
            console.log('New JWT:', res.data.jwt);
            await AsyncStorage.setItem('jwt', res.data.jwt);
            axiosClient.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.jwt}`;
            originalRequest.headers['Authorization'] = `Bearer ${res.data.jwt}`;

            return axiosClient(originalRequest);
          } else {
            console.error('Failed to refresh token:', res.data);
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);

const _Fetch = (method, path, body, headers = {}) => {
  return new Promise((resolve, reject) => {
    axiosClient({
      method,
      url: path,
      data: method !== 'GET' ? body : undefined,
      params: method === 'GET' ? body : undefined,
      headers: {...axiosClient.defaults.headers.common, ...headers},
    })
      .then(response => {
        if (response.data.status_code == 200) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      })
      .catch(err => {
        console.error('Request error:', err);
        reject(err.response ? err.response.data : err.message);
      });
  });
};

export default _Fetch;