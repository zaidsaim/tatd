import React, {useState,useEffect,useCallback} from 'react';
import { View, Text, Image, StyleSheet,RefreshControl,ActivityIndicator } from 'react-native';
import { Colors, FontSizes, FontWeights,Margins,Paddings } from '../assets/colors';
import OTTDarkBackHeader from '../components/OTTDarkBackHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateAccessToken,refreshAccessToken } from '../utils/validation';
import moment from 'moment';
const ThankyouPayment = ({ navigation ,route}) => {
   
   const [bookinginfo,setBookinginfo]=useState()
   const [error,setError]=useState()
   const [bookingvalidationdata,setBookingvalidationdata]=useState()
   const [smsdata,setSmsdata]=useState()
   const [refreshing, setRefreshing] = useState(false);
   const [loading, setLoading] = useState(true);
   const [thankuvalidationdata,setThankuvalidationdata]=useState()
   const [sendingSms, setSendingSms] = useState(false)
   const [formattedDate, setFormattedDate] = useState('');
   useEffect(() => {
    getBookinginfo()
  }, []);
 

  useEffect(() => {
    const bookingDate = bookinginfo?.ondemand_booking_thanks_data?.booking_date;
    console.log('Booking Date:', bookingDate); // Log the date

    if (bookingDate) {
      // Try parsing with multiple formats
      const parsedDate = moment(bookingDate, [moment.ISO_8601, 'YYYY-MM-DD', 'MM/DD/YYYY', 'DD-MM-YYYY'], true);
      if (parsedDate.isValid()) {
        setFormattedDate(parsedDate.format('D MMM'));
      } else {
        console.log('Invalid date format:', bookingDate);
        setFormattedDate('Invalid date');
      }
    }
  }, [bookinginfo]);

  // const sendsmsDriver = async () => {

  //   const isValid = await validateAccessToken();
  //   if (!isValid) {
  //     await refreshAccessToken();
  //   }
  //   try {
  //     const userData = await AsyncStorage.getItem('userData');
  //     const parsedUserData = userData ? JSON.parse(userData) : null;
  //     const token = parsedUserData ? parsedUserData.jwt : null;
  //     const bookingidvalue = await AsyncStorage.getItem('bookingidvalue');
  //     const bookingnum = bookingidvalue ? JSON.parse(bookingidvalue) : null;
  //     if (!token) {
  //       throw new Error("No token found");
  //     }
  //     const config = {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     const response = await axios.post('https://www.tatd.in/app-api/customer/ondemand/send-booking-sms-notification-to-driver.php', 
  //       {
  //           booking_number:bookingnum
  //         }
  //       ,config);
  //     console.log('sms Data:', response.data); 
  //       setSmsdata(response.data)
  //       if(response.data.status_id === 200){
  //        navigation.navigate('Track')
  //       }
  //   } catch (err) {
  //     setError(err.message);
  //     console.log('Error from sms API:', err.message);
  //   }
  // };

  const sendsmsDriver = async () => {
    setSendingSms(true); // Set sending state before the API call
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const bookingIdValue = await AsyncStorage.getItem('bookingidvalue');
      const bookingNum = bookingIdValue ? JSON.parse(bookingIdValue) : null;
      if (!token) {
        throw new Error("No token found");
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post('https://www.tatd.in/app-api/customer/ondemand/send-booking-sms-notification-to-driver.php', 
        { booking_number: bookingNum },
        config
      );
      console.log('SMS Data:', response.data); 
      setSmsdata(response.data);

      if (response.data.status_id === 200) {
        await AsyncStorage.removeItem('bookingvalue');
        navigation.navigate('Track');
      }
    } catch (err) {
      setError(err.message);
      console.log('Error from SMS API:', err.message);
    } finally {
      setSendingSms(false); 
    }
  };


  console.log('bbbbbbbbbbbbbbbbbbbb',bookinginfo)
const getBookinginfo = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
    const bookingidvalue = await AsyncStorage.getItem('bookingidvalue');
    const bookingnum = bookingidvalue ? JSON.parse(bookingidvalue) : null;
    console.log('bookingnum========',bookingnum)
      if (!token) {
        throw new Error("No token found");
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(`https://www.tatd.in/app-api/customer/ondemand/thank-you-payment-api.php?booking_number=${bookingnum}`,
        config);
      console.log('BOOKING INFO  Data:', response.data);
      setBookinginfo(response.data)
      if (response.data.status_code === 200) {
        setSendingSms(true); 
        setTimeout(() => {
          sendsmsDriver();

          setTimeout(() => {
            navigation.navigate('Track');
          }, 4000); // 10 seconds after sending SMS to make a total of 15 seconds
        }, 2000); // 5 seconds before sending SMS
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.log('Error from booking info API:', err.message);
      setLoading(false);
    }
  };
    return (
      
        <View>
        <OTTDarkBackHeader navigation={navigation} />
        <View style={styles.confirmationBox}>
          <Text style={styles.confirmationText}>Your Booking Confirmed</Text>
          <Image
            source={require('../assets/images/arrow_yellow.png')}
            style={styles.arrowImage}
          />
        </View>
        {
          loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <View style={styles.bookingDetailsContainer}>
              <View style={styles.bookingDetailsHeader}>
                <Text style={styles.whiteText}>Booking Id {bookinginfo?.ondemand_booking_thanks_data?.booking_number}</Text>
                <Text style={styles.whiteText}>{bookinginfo?.ondemand_booking_thanks_data?.vehicle_type}</Text>
              </View>
              <View style={styles.bookingInfo}>
                <View style={styles.bookingInfoRow}>
                  <Text style={styles.priceText}>₹{bookinginfo?.ondemand_booking_thanks_data?.pending_amount}</Text>
                  <Text style={styles.hoursText}>{bookinginfo?.ondemand_booking_thanks_data?.package_detail}</Text>
                  <View style={styles.paidBox}>
                    <Text style={styles.paidText}>Paid </Text>
                    <Text style={styles.paidText}>₹{bookinginfo?.ondemand_booking_thanks_data?.payment_amount}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.locationText}>{bookinginfo?.ondemand_booking_thanks_data?.pickup_address}</Text>
              <View style={styles.scheduleContainer}>
                <Text style={styles.scheduleText}>Schedule For {bookinginfo?.ondemand_booking_thanks_data?.booking_date} {bookinginfo.ondemand_booking_thanks_data?.booking_time} </Text>
                <View style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </View>
              </View>
              <View style={styles.driverDetailsContainer}>
                <View style={styles.driverDetailsTextContainer}>
                  <Text style={styles.driverDetailsText}>
                    Driver details will be shared with you shortly or at
                  </Text>
                  <Text style={styles.driverDetailsText}>
                    least 60 minutes before the scheduled time
                  </Text>
                </View>
                <Text style={styles.customerCareText}>
                  Customer care available between 06:00 AM TO 10:00 PM <Ionicons name="call" color={Colors.white} size={8} style={styles.callIcon} /> 9999160322
                </Text>
                <Text style={styles.customerCareTexttwo}>
                  PM
                </Text>
              </View>
            
            </View>
          )
        }
          {sendingSms && (
                <View style={styles.sendingSmsContainer}>
                  <Text style={styles.sendingSmsText}>Sending message, please wait...</Text>
                </View>
              )}
      </View>
    );
}

const styles = StyleSheet.create({
  
 
  confirmationBox: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Margins.mv.mv30,
    ...Paddings.p.p12,
    marginHorizontal: '15%',
    borderRadius: 5,
  },
  confirmationText: {
    color: Colors.white,
    marginLeft: '20%',
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  bookingDetailsContainer: {
    backgroundColor: Colors.primary,
    ...Margins.mh.mh15,
    borderRadius: 10,
  },
  bookingDetailsHeader: {
    justifyContent: 'space-between',
    ...Margins.mh.mh15,
    ...Paddings.pt.pt15,
    flexDirection: 'row',
  },
  whiteText: {
    color: Colors.white,
  },
  bookingInfo: {
    alignItems: 'center',
    ...Margins.mv.mv10,
    justifyContent: 'space-evenly',
  },
  bookingInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    color: Colors.white,
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.semiBold,
  },
  hoursText: {
    color: Colors.white,
    ...Margins.mh.mh10,
  },
  paidBox: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    ...Paddings.p.p3,
    ...Paddings.ph.ph15,
    marginRight: '20%',
    borderRadius: 5,
    alignItems: 'center',
  },
  paidText: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
  locationText: {
    color: Colors.white,
    ...Margins.mh.mh35,
  },
  scheduleContainer: {
    flexDirection: 'row',
    ...Margins.mt.mt40,
    justifyContent: 'space-between',
    ...Margins.mh.mh15,
    alignItems: 'center',
  },
  scheduleText: {
    color: Colors.white,
    fontSize:FontSizes.small
  },
  cancelButton: {
    backgroundColor: Colors.white,
    ...Paddings.p.p7,
    ...Paddings.ph.ph20,
    borderRadius: 3,
    ...Margins.mb.mb10,
  },
  cancelButtonText: {
    color: Colors.primary,
    fontWeight: FontWeights.medium,
  },
  driverDetailsContainer: {
    borderWidth: 2,
    borderColor: Colors.white,
    ...Margins.mv.mv30,
    borderRadius: 10,
    ...Margins.mh.mh15,
  },
  driverDetailsTextContainer: {
    ...Margins.m.m10,
  },
  driverDetailsText: {
    color: Colors.white,
    fontSize: FontSizes.small,
  },
  customerCareText: {
    color: Colors.white,
    fontSize: FontSizes.tinyxsmall,
    ...Margins.mh.mh10,
    ...Margins.mt.mt10,
  },
  customerCareTexttwo: {
    color: Colors.white,
    fontSize: FontSizes.tinyxsmall,
    ...Margins.mh.mh10,
    ...Margins.mt.mt10,
    ...Margins.mb.mb19
  },
  sendingSmsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Margins.mt.mt20,
  },
  sendingSmsText: {
    color: Colors.primary,
    fontSize: FontSizes.medium,
    marginLeft: 10,
    fontSize:FontSizes.medium,
    fontWeight:FontWeights.bold
  }
});

export default ThankyouPayment;
