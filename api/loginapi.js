import axios from 'axios';
import { LOGIN_API_URL ,OTP_VERIFY_URL,VALIDATE_URL} from './url/baseUrl';
export const loginApi = async (mobile) => {
  const response = await axios.post(LOGIN_API_URL, { mobile });
  return response.data;
};

export const OtpApi = async (mobile,otp) => {
  const response = await axios.post(OTP_VERIFY_URL, { mobile,otp });
  console.log('otpdata=====',response.data)
  return response.data;
};

export const ValidateApi = async () => {
  const response = await axios.get(VALIDATE_URL);
  console.log('validate=====',response.data)
  return response.data;
};