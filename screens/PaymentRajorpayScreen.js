
import React, { useEffect ,useState} from 'react';
import { View, Button, Alert } from 'react-native';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import { refreshAccessToken, validateAccessToken } from '../utils/validation';
const PaymentRajorpayScreen = ({route,navigation}) => {
   const [decodedToken,setDecodedToken]=useState()
   const [mobileNumber,setMobileNumber]=useState()
   const[verifyData , setVerifyData] = useState()
   const [verifyid,setVerifyid]=useState('')
   const [bookingvalidation,setBookingvalidation]=useState({})
   const [error,setError]=useState()

  useEffect(()=>{
    decodeToken()
    bookingValidation()
  
  },[])
 
  const bookingValidation = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const bookingvalue = await AsyncStorage.getItem('bookingvalue');
      const bookingvaludata = bookingvalue ? JSON.parse(bookingvalue) : null;
      if (!token) {
        throw new Error("No token found");
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post('https://www.tatd.in/app-api/customer/ondemand/get-booking-validation-data.php', 
        {
          booking_validation_id: bookingvaludata
          }
        ,config);
      console.log('rajor pay validation Data:', response.data); 
      console.log('rajor2 pay validation Data:', response.data?.single_booking_validation_data?.payment_page_data)
      setBookingvalidation(response.data?.single_booking_validation_data?.payment_page_data)
      await AsyncStorage.setItem('valid', JSON.stringify(response.data?.single_booking_validation_data?.payment_page_data))
      if(response.data.success === 200){
        handlePayment(response.data?.single_booking_validation_data?.payment_page_data)
      }
        
    } catch (err) {
      setError(err.message);
      console.log('Error from payment validation API:', err.message);
    }
  };

    const decodeToken = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const parsedUserData = userData ? JSON.parse(userData) : null;
        const token = parsedUserData ? parsedUserData.jwt : null;
        if (token) {
          const decoded = jwtDecode(token);
          console.log('Decoded Token:', decoded);
          setDecodedToken(decoded);
          setMobileNumber(decoded?.data?.mobile_number || '');
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };
    
  const {priceamount}= route?.params
  const handlePayment = (data) => {
    console.log('handle=======booking1',data)
    console.log('handle=======booking2',data?.page_type)
    console.log('handle=======booking3',data?.description)
    var options = {
      page_type:data?.page_type,
      description:data?.description,
      image: 'https://www.tatd.in/img/logo/bluelogo.png',
      currency: 'INR',
      key: 'rzp_live_0wecjqTARWJWu3', 
      amount: priceamount * 100, 
      name: 'TAT D',
      prefill: {
        email: '',
        contact: mobileNumber,
        name: bookingvalidation?.name
      },
      theme: { color: '#F37254' }
    }

    RazorpayCheckout.open(options).then((data) => {
      Alert.alert(`Success: ${data}`);
      // const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;
      // console.log('Payment ID:', razorpay_payment_id);
      // console.log('Order ID:', razorpay_order_id);
      // console.log('Signature:', razorpay_signature);
      console.log(data, "data payment detailsssss");
      setVerifyid(data?.razorpay_payment_id)
     setTimeout(()=>{
      // verifyPaymentApi()
      sendPaymentPayloadToServer(data)
     },5000)
    }).catch((error) => {
      navigation.navigate('payment')
    });
  };

  const sendPaymentPayloadToServer = async (paymentData) => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const bookingvalue = await AsyncStorage.getItem('bookingvalue');
      const bookingvaludata = bookingvalue ? JSON.parse(bookingvalue) : null;
      if (!token) {
        throw new Error("No token found");
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post('https://www.tatd.in/webhooks-razorpay.php', paymentData);
      console.log('Sendpament  response:', response.data);
      verifyPaymentApi()
    } catch (error) {
      console.error('Error sending payment data to server:', error);
    }
  };

  const verifyPaymentApi = async () => {
    console.log('dar===============')
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const bookingvalue = await AsyncStorage.getItem('bookingvalue');
      const bookingvaludata = bookingvalue ? JSON.parse(bookingvalue) : null;
      const validdata = await AsyncStorage.getItem('valid');
      const validvalue = validdata ? JSON.parse(validdata) : null;
      console.log('vid========id123',validvalue)
      console.log('vid========id',validvalue.page_type)
      console.log('boooage================page',bookingvalidation?.page_type)
      if (!token) {
        throw new Error("No token found");
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post('https://www.tatd.in/app-api/customer/payment/verify-payment.php', 
        {
          "action": "verify_payment",
          "razorpay_payment_id": verifyid,
          "page_type": validvalue.page_type
      }
        ,config);
        console.log(response.data , "verify Responseeeee");
    } catch (err) {
      setError(err.message);
      console.log('Error from online Verify API:', err.message);
    }
  };
  return null;
};

export default PaymentRajorpayScreen