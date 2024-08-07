
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
  OTP_FAIL,OTP_REQUEST,OTP_SUCCESS,RESENT_OTP_FAIL,RESENT_OTP_REQUEST,RESENT_OTP_SUCCESS
 } from '../constants/authConstant';
import { loginApi ,OtpApi,ValidateApi} from '../../../api/loginapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const API_BASE_URL = 'https://www.tatd.in/app-api/customer/';
export const loginWitNumber = (mobile,navigation) => async (dispatch) => {
    console.log('mobile:', mobile);
    if (mobile.length !== 10 || isNaN(mobile)) {
        return;
      }
    try {
      dispatch({ type: LOGIN_REQUEST });
      const data = await loginApi(mobile);
      if (data.status_code === "200") {
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        navigation.navigate('otp', { mobile }); 
      } else {
        dispatch({ type: LOGIN_FAIL, payload: data.message });
      }
      console.log('data:', data);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
      console.error('error:', error);
      dispatch({ type: LOGIN_FAIL, payload: error.message });
    }
  };

  export const loginWithOtp = (mobile,otp,navigation) => async (dispatch) => {
    console.log('mobile:', mobile,otp);
    try {
      dispatch({ type: OTP_REQUEST });
      const data = await OtpApi(mobile,otp);
      console.log('data:', data);
      if (data.status_code === 200) {
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        notificationApi(token)
        const storedUserData = await AsyncStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log('Stored User Data:', userData);
    }
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        navigation.navigate('home', { mobile }); 
      } else {
        dispatch({ type: LOGIN_FAIL, payload: data.message });
      }
      dispatch({ type:  OTP_SUCCESS, payload: data });
    } catch (error) {
      console.error('error:', error);
      dispatch({ type:  OTP_FAIL, payload: error.message });
    }
  };



  export const resentOtp = (mobile,navigation) => async (dispatch) => {
    console.log('mobile:', mobile);
    try {
      dispatch({ type: RESENT_OTP_REQUEST });
      const data = await loginApi(mobile);
      if (data.status_code === "200") {
        dispatch({ type: RESENT_OTP_SUCCESS, payload: data });
        navigation.navigate('otp', { mobile }); 
      } else {
        dispatch({ type: RESENT_OTP_FAIL, payload: data.message });
      }
      console.log('data:', data);
      dispatch({ type: RESENT_OTP_SUCCESS, payload: data });
    } catch (error) {
      console.error('error:', error);
      dispatch({ type: RESENT_OTP_FAIL, payload: error.message });
    }
  };

  export const notificationApi = async (token) => {
    try {
      const response = axios.post('https://www.tatd.in/app-api/customer/login/save-fcm-token-api.php',{
        
          fcm_token:token,
          action:"save_fcm"
      ,
      });
      return response.data;
    } catch (error) {
      console.error('Error from notification api:', error);
      throw error;
    }
  };