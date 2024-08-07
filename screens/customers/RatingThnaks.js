import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {
  Colors,
  FontSizes,
  FontWeights,
  Paddings,
  Margins,
} from '../../assets/colors';
import OTTHeader from '../../components/OTTHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshAccessToken, validateAccessToken} from '../../utils/validation';
import axios from 'axios';

const RatingThanks = ({navigation, route}) => {
  const {bookingId, rate} = route.params;

  console.log(bookingId, 'Booking ID');
  console.log(rate, 'Rating');

  const [thanksData, setThanksData] = useState({});
  const [imagePath, setImagePath] = useState('');

  console.log(thanksData, ' dataaaaa');
  // const imagePath = 'https://www.tatd.in/icons_files/oh-no.png'
  console.log(imagePath, 'mmmmmmmmmm');

  useEffect(() => {
    fetchRatingThanks();
  }, []);

  const fetchRatingThanks = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      console.log(token, 'JWT Token');
      if (!token) {
        throw new Error('No token found');
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        'https://www.tatd.in/app-api/customer/rate-your-experience/rating-thanks-api.php',
        {
          booking_number: bookingId,
          rate: rate,
          action: 'rating_thanks',
        },
        config,
      );

      console.log(response.data, 'Rating Details Response');
      setThanksData(response.data.response);
      setImagePath(response.data?.response?.image);
      if(response.data?.response?.status == "success"){
        setTimeout(() => {
            navigation.navigate('track')
        }, 2000);
      }
    } catch (err) {
      console.log('Error from rating Details API:', err.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={{uri: imagePath}} style={{width: 200, height: 200}} />
        {console.log(thanksData?.image)}

        <Text style={{color: 'black'}}> {thanksData?.message}</Text>
        <Text style={{color: 'black'}}> {thanksData?.description}</Text>
      </View>
    </View>
  );
};

export default RatingThanks;
