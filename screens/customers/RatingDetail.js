import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import {
  Colors,
  FontSizes,
  FontWeights,
  Paddings,
  Margins,
} from '../../assets/colors';
import OTTHeader from '../../components/OTTHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshAccessToken, validateAccessToken } from '../../utils/validation';
import axios from 'axios';

const RatingDetail = ({ navigation, route }) => {
  const { bookingId, rate } = route.params;
  const [message, setMessage] = useState('');

  console.log(bookingId, 'Booking ID');
  console.log(rate, 'Rating');

//   console.log(message,"enter value");

  const fetchRatingDetails = async () => {
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
        'https://www.tatd.in/app-api/customer/rate-your-experience/rating-details-api.php',
        {
          booking_number: bookingId,
          rate: rate,
          action: 'rating_detail',
          message: message,
        },
        config,
      );

      console.log(response.data, 'Rating Details Response');
      if (response.data?.status_code == 200) {
        navigation.navigate('RatingThanks', {bookingId, rate});
      }
    } catch (err) {
      console.log('Error from rating Details API:', err.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: Colors.primary,
            width: '90%',
            ...Margins.mh.mh15,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <View style={{ ...Paddings.p.p10, ...Margins.mb.mb10 }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: FontSizes.xxlarge,
                fontWeight: FontWeights.regular,
              }}>
              What did the TAT D impress you with
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: FontSizes.xxlarge,
                fontWeight: FontWeights.regular,
              }}>
              ?
            </Text>
          </View>
        </View>
        <View
          style={{
            borderLeftWidth: 3,
            borderRightWidth: 3,
            borderBottomWidth: 3,
            borderLeftColor: Colors.primary,
            borderRightColor: Colors.primary,
            borderBottomColor: Colors.primary,
            width: '90%',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <View
            style={{
              ...Margins.m.m15,
              ...Margins.mt.mt50,
              borderBottomWidth: 2,
              borderColor: Colors.primary,
            }}>
            <TextInput
              placeholder="Tell us more"
              placeholderTextColor={'black'}
              style={{ color: 'black' }}
              value={message}
              onChangeText={text => setMessage(text)}
            />
          </View>
          <TouchableOpacity
            onPress={fetchRatingDetails}
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              ...Margins.mh.mh20,
              marginBottom: 20,
            }}>
            <Text style={{ color: Colors.darkgrey, fontSize: FontSizes.tinymedium }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RatingDetail;



















