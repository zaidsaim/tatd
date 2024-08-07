import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  Colors,
  FontSizes,
  FontWeights,
  Paddings,
  Margins,
} from '../../assets/colors';
import OTTHeader from '../../components/OTTHeader';
import {AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshAccessToken, validateAccessToken} from '../../utils/validation';
import axios from 'axios';

const RatingScreen = ({navigation, route}) => {
  const {bookingId} = route.params;
  const [rating, setRating] = useState(0);

  console.log(bookingId, 'Booking ID');

  const fetchRatingExperience = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      console.log(token, ' jwt token');
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
        'https://www.tatd.in/app-api/customer/rate-your-experience/rate-your-experience-api.php',
        {
          booking_number: bookingId,
          rate: rating,
          action: 'rate_your_experience',
          rating_source: 'MyRides',
        },
        config,
      );

      // console.log(rating, 'action ratinggggg');
      console.log(response.data, 'Rating API Response');
      if (response.data?.status_code == 200) {
        navigation.navigate('ratingDetail', {
          bookingId: response.data?.booking_id || bookingId,
          rate: response.data?.rate || rating,
        });
      }
    } catch (err) {
      console.log('Error from rating API:', err.message);
    }
  };

  const ratingCompleted = rating => {
    setRating(rating);
    console.log('Rating is: ' + rating);
  };

  return (
    <View style={{flex: 1}}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: Colors.primary,
            width: '90%',
            ...Margins.mh.mh15,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <View style={{...Paddings.p.p10, ...Margins.mb.mb10}}>
            <Text
              style={{
                color: Colors.white,
                fontSize: FontSizes.xxlarge,
                fontWeight: FontWeights.regular,
              }}>
              Rate Your Private Driver -
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: FontSizes.xxlarge,
                fontWeight: FontWeights.regular,
              }}>
              Partner
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
              borderColor: Colors.primary,
              borderWidth: 2,
              ...Margins.mh.mh20,
              ...Margins.mv.mv20,
            }}>
            <View style={{...Margins.mb.mb10}}>
              <AirbnbRating
                count={5}
                reviews={['VERY BAD', 'Bad', 'AVERAGE', 'GOOD', 'LOVED IT']}
                defaultRating={0}
                size={20}
                onFinishRating={ratingCompleted}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={fetchRatingExperience}
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              ...Margins.mh.mh20,
              marginBottom: 20,
            }}>
            <Text
              style={{color: Colors.darkgrey, fontSize: FontSizes.tinymedium}}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RatingScreen;
