

// //  <Icon name={isTextVisible ? 'expand-less' : 'expand-more'} size={30} color="#000s
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  Linking,
} from 'react-native';
import {Divider} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from 'react-native-animated-progress';
import DropShadow from 'react-native-drop-shadow';
import {useDispatch} from 'react-redux';
import OTDarkHeader from '../components/OTDarkHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Colors,
  FontSizes,
  FontWeights,
  Margins,
  Paddings,
  BorderRadius,
  BorderWidths,
} from '../assets/colors';
import {Modal} from 'react-native';
import {validateAccessToken, refreshAccessToken} from '../utils/validation';
import moment from 'moment';
import {frequncyApi, homeratingApi} from '../api/services/apiService';

const {width} = Dimensions.get('window');
const baseFontSize = width * 0.038;

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [ratinghome, setRatinghome] = useState();
  const [selectedIcon, setSelectedIcon] = useState('safe');
  // const [isTextVisible, setIsTextVisible] = useState(false);
  // const [isTextVisibleSecond, setIsTextVisibleSecond] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [isTextVisibleTwo, setIsTextVisibleTwo] = useState(false);
  // const [visibleIndexSecond, setVisibleIndexSecond] = useState(null);
  const [latestVersion, setLatestVersion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [imei, setImei] = useState(null);
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [paymentVisibleIndex, setPaymentVisibleIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const dateStr = ratinghome?.home_page_single_rating[0]?.add_date;

  const formatted = moment(dateStr)?.format('DD MMM, YYYY');
  const toggleTextVisibilityTwo = () => {
    setIsTextVisibleTwo(!isTextVisibleTwo);
  };
  const toggleTextVisibility = index => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };
  const togglePaymentVisibility = () => {
    setIsPaymentVisible(!isPaymentVisible);
  };
  const togglePaymentFaqVisibility = index => {
    setPaymentVisibleIndex(paymentVisibleIndex === index ? null : index);
  };
  const bookingFaqs = faqData?.faq_data?.filter(
    faq => faq.faq_header === 'Booking Modifications Support',
  );
  const paymentFaqs = faqData?.faq_data?.filter(
    faq => faq.faq_header === 'Payment Related Support',
  );

  console.log(validateAccessToken, 'validateAccessTokenvalidateAccessToken');

  // const getUserData = async () => {
  //   try {
  //     const userData = await AsyncStorage.getItem('userData');
  //     if (userData !== null) {
  //       return JSON.parse(userData);
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error('Failed to load user data:', error);
  //     return null;
  //   }
  // };

  // naviagtion code set mohitttt

  const handlePress = async type => {
    try {
      let value;
      switch (type) {
        case 'A':
          value = 'Incity';
          break;
        case 'B':
          value = 'Outstation';
          break;
        case 'C':
          value = 'Permanent';
          break;
        case 'D':
          value = 'flexible_subscription';
          break;
        default:
          value = '';
      }
      await AsyncStorage.setItem('product_type', value);
      navigation.navigate('selecthourlycity', {navcheck: type});
    } catch (error) {
      console.error('Error saving data to AsyncStorage', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      await Promise.all([fetchFaq(), fetchhomerating(), getDeviceInfo()]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([fetchFaq(), fetchhomerating(), getDeviceInfo()]).then(() =>
      setRefreshing(false),
    );
  }, []);

  const fetchFaq = async () => {
    try {
      const data = await frequncyApi();
      setFaqData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchhomerating = async () => {
    try {
      const data = await homeratingApi();
      setRatinghome(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // get Device Info Function

  const getDeviceInfo = async () => {
    const info = {
      uniqueId: DeviceInfo.getUniqueId(),
      manufacturer: await DeviceInfo.getManufacturer(),
      model: DeviceInfo.getModel(),
      deviceName: await DeviceInfo.getDeviceName(),
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
      appVersion: DeviceInfo.getVersion(),
      buildNumber: DeviceInfo.getBuildNumber(),
      isTablet: DeviceInfo.isTablet(),
    };
    try {
      await AsyncStorage.setItem('deviceInfo', JSON.stringify(info));
      const getdevice = await AsyncStorage.getItem('deviceInfo');
    } catch (error) {
      console.error('Failed to store device info:', error);
    }
    setDeviceInfo(info);
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          {
            title: 'Phone State Permission',
            message:
              'This app needs access to your phone state to get the IMEI number.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const imeis = await DeviceInfo.getUniqueId();
          setImei(imeis);
        } else {
          console.log('Phone state permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // const handleUpdate = () => {
  //   setModalVisible(false);
  // };
  // const toggleTextVisibilitySecondText = index => {
  //   setVisibleIndexSecond(visibleIndexSecond === index ? null : index);
  // };
  // const toggleTextVisibilitySecond = () => {
  //   setIsTextVisibleSecond(!isTextVisibleSecond);
  // };
  // const toggleTextVisibilitytwo = () => {
  //   setIsTextVisible(!isTextVisible);
  // };

  // render Selected Icon Text

  const renderText = selectedIcon => {
    switch (selectedIcon) {
      case 'safe':
        return (
          <View style={{}}>
            <View style={{}}>
              <Text
                style={{color: Colors.black, fontSize: FontSizes.tinymedium}}>
                Our drivers are verified at least three
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: FontSizes.tinymedium,
                  ...Margins.mt.mt3,
                }}>
                trusted reference, including Aadhar and
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: FontSizes.tinymedium,
                  ...Margins.mt.mt3,
                }}>
                license verification, and have a minimum of 5
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: FontSizes.tinymedium,
                  ...Margins.mt.mt3,
                }}>
                years of experience, ensuring utmost safety.
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                marginTop: 75,
                ...Margins.mb.mb10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: FontSizes.tinymedium,
                    fontWeight: FontWeights.medium,
                  }}>
                  Your Safety Matters
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Image
                    source={require('../assets/images/openblueicon.png')}
                    style={{width: 12, height: 12, justifyContent: 'flex-end'}}
                  />
                  <Text
                    style={{
                      color: Colors.primary,
                      fontWeight: FontWeights.medium,
                    }}>
                    9112345678
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      case 'trained':
        return (
          <View>
            <Text style={{color: Colors.black, fontSize: FontSizes.tinymedium}}>
              We ensure briefing of driver before onboarding.
            </Text>
          </View>
        );
      case 'experienced':
        return (
          <View>
            <Text style={{color: Colors.black, fontSize: FontSizes.tinymedium}}>
              Our drivers are 5+ years of experience driving
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              Manual & automatic cars in Local, Highway &
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              Hills stations. We assign a driver who is having
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              relevant driving experience as per the customer
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              vehicle.
            </Text>
          </View>
        );
      case 'punctual':
        return (
          <View>
            <View>
              <Text
                style={{color: Colors.black, fontSize: FontSizes.tinymedium}}>
                Our drivers are briefed about the importance of
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: FontSizes.tinymedium,
                  ...Margins.mt.mt3,
                }}>
                time, also we track their performance & provide
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: FontSizes.tinymedium,
                  ...Margins.mt.mt3,
                }}>
                them feedback as & when required.
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                marginTop: 95,
                ...Margins.mb.mb10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: FontSizes.tinymedium,
                    fontWeight: FontWeights.medium,
                  }}>
                  Your Safety Matters
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Image
                    source={require('../assets/images/openblueicon.png')}
                    style={{width: 12, height: 12, justifyContent: 'flex-end'}}
                  />
                  <Text
                    style={{
                      color: Colors.primary,
                      fontWeight: FontWeights.medium,
                    }}>
                    9112345678
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      case 'services':
        return (
          <View>
            <Text style={{color: Colors.black, fontSize: FontSizes.tinymedium}}>
              Services available 24*7, Book your drive for any
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              time. our customer care numbers is
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                ...Margins.mt.mt3,
              }}>
              <Image
                source={require('../assets/images/openblueicon.png')}
                style={{width: 12, height: 12}}
              />
              <Text style={{color: Colors.primary}}>9112345678</Text>
            </View>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              available in between 06:00 AM to 06:00 PM{' '}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              (Monday To Saturday) Support@tatd.in{' '}
            </Text>
          </View>
        );
      case 'presence':
        return (
          <View>
            <Text style={{color: Colors.black, fontSize: FontSizes.tinymedium}}>
              We are presently available in Delhi, Uttar
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              Pradesh, Haryana, Punjab, Karnataka,
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }} 
              >
              Tamil Nadu, West Bengal. Our Head office is at
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              Maharashtra, Gujrat, Rajasthan, Telangana,
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              office No G-39, Vardhman Grand Market, Sector
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              3, Dwarka, New Delhi- 110078
            </Text>
          </View>
        );
      case 'convenient':
        return (
          <View>
            <Text style={{color: Colors.black, fontSize: FontSizes.tinymedium}}>
              Cancellation, Reschedule, Instant Refunds
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              Download Invoice, Multiple Payment Mode's
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              Customer Support
            </Text>
          </View>
        );
      case 'works':
        return (
          <View>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              Book {'>'} Confirmation {'>'} Driver Assignment {'>'}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              Driver Accept {'>'} Driver On the Way {'>'} Driver
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              Reach {'>'} Trip Start through OTP {'>'} Trip End {'>'}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              Billing {'>'} Payment {'>'} Rate Your Experience {'>'}
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                ...Margins.mt.mt3,
              }}>
              Download Invoice
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  //  icon cick

  const renderExpertDrivingExperienceText = selectedIcon => {
    switch (selectedIcon) {
      case 'trained':
        return (
          <View>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                fontWeight: FontWeights.medium,
              }}>
              Stay safe with tat d
            </Text>
          </View>
        );
      case 'experienced':
        return (
          <View>
            <Text
              style={{
                color: Colors.black,
                fontSize: FontSizes.tinymedium,
                fontWeight: FontWeights.medium,
              }}>
              Experienced driving experience
            </Text>
          </View>
        );
      case 'services':
        return (
          <Text
            style={{
              color: Colors.black,
              fontSize: FontSizes.tinymedium,
              fontWeight: FontWeights.medium,
            }}>
            Go anywhere at anytime
          </Text>
        );
      case 'presence':
        return (
          <Text
            style={{
              color: Colors.black,
              fontSize: FontSizes.tinymedium,
              fontWeight: FontWeights.medium,
            }}>
            Driver in 90 Minutes at your doorstep
          </Text>
        );
      case 'convenient':
        return (
          <Text
            style={{
              color: Colors.black,
              fontSize: FontSizes.tinymedium,
              fontWeight: FontWeights.medium,
            }}>
            Convenient driving experience
          </Text>
        );
      case 'works':
        return (
          <Text
            style={{
              color: Colors.black,
              fontSize: FontSizes.tinymedium,
              fontWeight: FontWeights.medium,
            }}>
            Everything Covered
          </Text>
        );
      default:
    }
  };

  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com/trustedandtraineddriver');
  };

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/tatd.in/');
  };

  const openLinkedin = () => {
    Linking.openURL(
      'https://www.linkedin.com/company/92804439/admin/feed/posts/',
    );
  };

  return (
    <View style={{backgroundColor: Colors.primary, flex: 1}}>
      <OTDarkHeader navigation={navigation} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            A new version ({latestVersion}) is available!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.buttonText}>Update Now</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: Colors.white,
              fontSize: FontSizes.medium,
              ...Margins.mt.mt40,
              ...Margins.mb.mb10,
              fontWeight: FontWeights.light,
            }}>
            I require driver for?
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '92%',
            height: 115,
            ...Margins.mh.mh15,
            ...Margins.mb.mb5,
          }}>
          <View style={styles.btn}>
            <TouchableOpacity
              style={{width: '100%', ...Paddings.pt.pt50}}
              onPress={() =>
                // navigation.navigate('selecthourlycity', {navcheck: 'A'})
                handlePress('A')
              }>
              <View style={{alignItems: 'center'}}>
                <DropShadow
                  style={{
                    shadowColor: '#171717',
                    shadowOffset: {width: 2, height: 6},
                    shadowOpacity: 0.2,
                    shadowRadius: 1,
                    elevation: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      alignItems: 'center',
                      ...Paddings.p.p7,
                      ...Margins.mb.mb15,
                      ...BorderRadius.br5,
                      width: '80%',
                      paddingHorizontal: 15,
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: FontSizes.small,
                        ...Paddings.ph.ph10,
                      }}>
                      Hourly Driver
                    </Text>
                  </View>
                </DropShadow>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              style={{width: '100%', ...Paddings.pt.pt50}}
              onPress={() =>
                // navigation.navigate('selecthourlycity', {navcheck: 'B'})
                handlePress('B')
              }>
              <View style={{alignItems: 'center'}}>
                <DropShadow
                  style={{
                    shadowColor: '#171717',
                    shadowOffset: {width: 2, height: 6},
                    shadowOpacity: 0.2,
                    shadowRadius: 1,
                    elevation: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      alignItems: 'center',
                      ...Paddings.p.p7,
                      ...Margins.mb.mb15,
                      ...BorderRadius.br5,
                      width: '80%',
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: FontSizes.small,
                        ...Paddings.ph.ph10,
                      }}>
                      Outstation Driver
                    </Text>
                  </View>
                </DropShadow>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{justifyContent: 'space-between', ...Margins.mh.mh10}}>
          <View
            style={{
              backgroundColor: Colors.white,
              height: 115,
              alignItems: 'center',
              justifyContent: 'flex-end',
              ...Margins.mh.mh5,
              ...Margins.mt.mt5,
            }}>
            <TouchableOpacity
              style={{width: '100%', ...Paddings.pt.pt50}}
              onPress={() =>
                // navigation.navigate('selecthourlycity', {navcheck: 'C'})
                handlePress('C')
              }>
              <View style={{alignItems: 'center'}}>
                <DropShadow
                  style={{
                    shadowColor: '#171717',
                    shadowOffset: {width: 2, height: 6},
                    shadowOpacity: 0.2,
                    shadowRadius: 1,
                    elevation: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      alignItems: 'center',
                      ...Paddings.p.p7,
                      ...Margins.mb.mb15,
                      ...BorderRadius.br5,
                      width: '80%',
                      paddingHorizontal: 15,
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: FontSizes.small,
                        ...Paddings.ph.ph10,
                      }}>
                      Monthly Driver
                    </Text>
                  </View>
                </DropShadow>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              height: 115,
              alignItems: 'center',
              justifyContent: 'flex-end',
              ...Margins.mh.mh5,
              ...Margins.mt.mt5,
            }}>
            <TouchableOpacity
              style={{width: '100%', ...Paddings.pt.pt50}}
              onPress={() =>
                // navigation.navigate('selecthourlycity', {navcheck: 'D'})
                handlePress('D')
              }>
              <View style={{alignItems: 'center'}}>
                <DropShadow
                  style={{
                    shadowColor: '#171717',
                    shadowOffset: {width: 2, height: 6},
                    shadowOpacity: 0.2,
                    shadowRadius: 1,
                    elevation: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      alignItems: 'center',
                      ...Paddings.p.p7,
                      ...Margins.mb.mb15,
                      ...BorderRadius.br5,
                      width: '85%',
                      ...Paddings.ph.ph15,
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: FontSizes.small,
                        ...Paddings.ph.ph20,
                      }}>
                      Weekly Driver
                    </Text>
                  </View>
                </DropShadow>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* driversbrified */}
        <View
          style={{
            backgroundColor: Colors.primary,
            ...BorderWidths.br.br1,
            ...BorderWidths.bb.bb1,
            borderTopRightRadius: 4,
            ...BorderWidths.bl.bl1,
            borderTopLeftRadius: 4,
            borderColor: Colors.white,
            ...Margins.m.m15,
            marginTop: 70,
            marginBottom: 75,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          }}>
          <View
            style={{
              backgroundColor: Colors.white,
              ...BorderRadius.br3,
              height: 200,
            }}>
            <View style={{...Paddings.p.p10}}>{renderText(selectedIcon)}</View>
            <View
              style={{
                ...Margins.m.m10,
                alignItems: 'center',
                justifyContent: 'flex-end',
                position: 'absolute',
                top: 0,
                bottom: 0,
              }}>
              {renderExpertDrivingExperienceText(selectedIcon)}
            </View>
          </View>
          <Divider style={{marginHorizontal: '20%'}} />
          <View style={{...Margins.mv.mv25}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setSelectedIcon('safe')}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../assets/images/maskblueicon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <Text style={styles.iconText}>Safe</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setSelectedIcon('trained')}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../assets/images/verifiedblueicon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <Text style={styles.iconText}>Trained</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setSelectedIcon('experienced')}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../assets/images/driverblueicon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <Text style={styles.iconText}>Experienced</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setSelectedIcon('punctual')}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../assets/images/punctualblueicon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <Text style={styles.iconText}>Punctual</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                ...Margins.mt.mt15,
              }}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setSelectedIcon('services')}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../assets/images/openblueicon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <Text style={styles.iconText}>24*7 Services</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setSelectedIcon('presence')}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../assets/images/presenceblueicon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <Text style={styles.iconText}>Presence</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setSelectedIcon('convenient')}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../assets/images/convenientblueicon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <Text style={styles.iconText}>Convenient</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setSelectedIcon('works')}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../assets/images/howitblueicon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <Text style={styles.iconText}>How it Works</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* //Rating and reviews  start*/}
        <View style={{backgroundColor: Colors.white}}>
          <View
            style={{
              backgroundColor: '#d9d9d9',
              ...Margins.mv.mv20,
              ...Margins.mh.mh15,
              ...BorderRadius.br10,
            }}>
            <View style={{...Margins.mh.mh8}}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: FontSizes.body,
                  fontWeight: FontWeights.semiBold,
                  ...Paddings.p.p10,
                }}>
                Rating and Review
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{...Margins.mh.mh10}}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 42,
                      fontWeight: FontWeights.medium,
                    }}>
                    4.8
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialIcons
                      name="star"
                      size={16}
                      color={Colors.primary}
                    />
                    <MaterialIcons
                      name="star"
                      size={16}
                      color={Colors.primary}
                    />
                    <MaterialIcons
                      name="star"
                      size={16}
                      color={Colors.primary}
                    />
                    <MaterialIcons
                      name="star"
                      size={16}
                      color={Colors.primary}
                    />
                    <MaterialIcons
                      name="star-half"
                      size={16}
                      color={Colors.primary}
                    />
                  </View>
                  <Text style={{color: Colors.black, ...Margins.mt.mt5}}>
                    {ratinghome?.home_page_single_rating[0]?.booking_id}
                  </Text>
                </View>
                <View style={{flex: 1, ...Margins.ml.ml50}}>
                  <View style={{...Paddings.p.p5, flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: Colors.black}}>5</Text>

                      <View style={{...Paddings.p.p5, flex: 1}}>
                        <ProgressBar
                          progress={30}
                          height={7}
                          backgroundColor={Colors.primary}
                          animated={false}
                        />
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: Colors.black}}>4</Text>
                      <View style={{...Paddings.p.p5, flex: 1}}>
                        <ProgressBar
                          progress={25}
                          height={7}
                          backgroundColor={Colors.primary}
                          animated={false}
                        />
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: Colors.black}}>3</Text>
                      <View style={{...Paddings.p.p5, flex: 1}}>
                        <ProgressBar
                          progress={20}
                          height={7}
                          backgroundColor={Colors.primary}
                          animated={false}
                        />
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: Colors.black}}>2</Text>
                      <View style={{...Paddings.p.p5, flex: 1}}>
                        <ProgressBar
                          progress={15}
                          height={7}
                          backgroundColor={Colors.primary}
                          animated={false}
                        />
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: Colors.black}}>1</Text>
                      <View style={{...Paddings.p.p5, flex: 1}}>
                        <ProgressBar
                          progress={10}
                          height={7}
                          backgroundColor={Colors.primary}
                          animated={false}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  ...Paddings.p.p10,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...Margins.mt.mt20,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      ...BorderRadius.br20,
                      width: 35,
                      height: 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: Colors.white}}>G</Text>
                  </View>
                  <Text
                    style={{
                      color: Colors.black,
                      ...Margins.mh.mh20,
                      fontSize: FontSizes.tinymedium,
                      fontWeight: FontWeights.medium,
                    }}>
                    {ratinghome?.home_page_single_rating[0]?.customer_name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: FontSizes.tinymedium,
                      fontWeight: FontWeights.medium,
                    }}>
                    {ratinghome?.home_page_single_rating[0]?.zone}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...Margins.mh.mh10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name="star" size={16} color={Colors.primary} />
                  <MaterialIcons name="star" size={16} color={Colors.primary} />
                  <MaterialIcons name="star" size={16} color={Colors.primary} />
                  <MaterialIcons name="star" size={16} color={Colors.primary} />
                  <MaterialIcons name="star" size={16} color={Colors.primary} />
                  <Text
                    style={{
                      color: Colors.black,
                      ...Margins.mh.mh10,
                      fontSize: FontSizes.tinymedium,
                    }}>
                    {formatted}
                  </Text>
                </View>
              </View>
              <View style={{...Paddings.p.p10}}>
                <Text style={{color: Colors.black}}>
                  {ratinghome?.home_page_single_rating[0]?.message}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Middle')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  ...Margins.mh.mh10,
                  ...Margins.mt.mt50,
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontWeight: FontWeights.semiBold,
                    fontSize: FontSizes.tinymedium,
                  }}>
                  See more review
                </Text>
                <Image
                  source={require('../assets/images/arrow-right-tatd.png')}
                  style={{width: 16, height: 16, ...Margins.ml.ml2}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{backgroundColor: Colors.white}}>
          <Text
            style={{
              color: Colors.primary,
              fontWeight: FontWeights.semiBold,
              ...Margins.mh.mh25,
              ...FontSizes.medium,
            }}>
            Frequntly Asked Questions
          </Text>
        </View>

        {faqData && (
          <View style={{backgroundColor: 'white'}}>
            <View style={{backgroundColor: Colors.white, marginVertical: 10}}>
              <View style={styles.containerHiddenText}>
                <TouchableOpacity onPress={toggleTextVisibilityTwo}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      ...Margins.mh.mh10,
                      ...Paddings.pt.pt20,
                      ...Margins.mb.mb10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: FontSizes.tinymedium,
                        fontWeight: FontWeights.regular,
                      }}>
                      {bookingFaqs[0]?.faq_header}
                    </Text>
                    <Icon
                      name={isTextVisibleTwo ? 'remove' : 'add'}
                      size={14}
                      color={Colors.darkblue}
                    />
                  </View>
                </TouchableOpacity>
                {isTextVisibleTwo &&
                  bookingFaqs.map((faq, index) => (
                    <View key={index} style={styles.questionContainer}>
                      <TouchableOpacity
                        onPress={() => toggleTextVisibility(index)}
                        style={styles.iconContainer}>
                        <Text style={styles.questionText}>
                          {faq?.faq_question}
                        </Text>
                        <Icon
                          name={visibleIndex === index ? 'remove' : 'add'}
                          size={14}
                          color={Colors.darkblue}
                          style={{...Margins.mh.mh10}}
                        />
                      </TouchableOpacity>
                      {visibleIndex === index && (
                        <Text style={styles.answerText}>{faq?.faq_answer}</Text>
                      )}
                    </View>
                  ))}
              </View>
            </View>

            <View style={{backgroundColor: Colors.white}}>
              <View style={styles.containerHiddenText}>
                <TouchableOpacity onPress={togglePaymentVisibility}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      ...Margins.mh.mh10,
                      ...Paddings.pt.pt20,
                      ...Margins.mb.mb10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: FontSizes.tinymedium,
                        fontWeight: FontWeights.regular,
                      }}>
                      {paymentFaqs[0]?.faq_header}
                    </Text>
                    <Icon
                      name={isPaymentVisible ? 'remove' : 'add'}
                      size={14}
                      color={Colors.darkblue}
                    />
                  </View>
                </TouchableOpacity>
                {isPaymentVisible &&
                  paymentFaqs.map((faq, index) => (
                    <View key={index} style={styles.questionContainer}>
                      <TouchableOpacity
                        onPress={() => togglePaymentFaqVisibility(index)}
                        style={styles.iconContainer}>
                        <Text style={styles.questionText}>
                          {faq?.faq_question}
                        </Text>
                        <Icon
                          name={
                            paymentVisibleIndex === index ? 'remove' : 'add'
                          }
                          size={14}
                          color={Colors.darkblue}
                          style={{...Margins.mh.mh10}}
                        />
                      </TouchableOpacity>
                      {paymentVisibleIndex === index && (
                        <Text style={styles.answerText}>{faq?.faq_answer}</Text>
                      )}
                    </View>
                  ))}
              </View>
            </View>
          </View>
        )}

        <DropShadow style={{backgroundColor: Colors.white}}>
          <TouchableOpacity style={styles.card}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                " I just want to share my first experience of driver
              </Text>
              <Text style={styles.text}>
                on demand, it was unexpectedly very good. Team
              </Text>
              <Text style={styles.text}>
                was punchual, sensible, understanding the
              </Text>
              <Text style={styles.text}>
                requirment and very cooperative. Driver sent to me
              </Text>
              <Text style={styles.text}>
                was also very nice, and classy, following all COVID
              </Text>
              <Text style={[styles.text, {letterSpacing: 0.7}]}>
                norms. I will definitely like to recommend your
              </Text>
              <Text style={styles.text}>
                service for those who require traned and trusted
              </Text>
              <Text style={styles.text}>
                driver on occassional and hourly basis. Good job
              </Text>
              <Text style={styles.text}>and keep on doing good work. "</Text>
              <View style={styles.footer}>
                <Image
                  source={require('../assets/images/doctor.png')}
                  style={styles.image}
                />
                <View style={styles.footerTextContainer}>
                  <Text style={styles.text}>- Dr. Saurabh Vashishtha</Text>
                  <Text style={styles.text}> Manipals Hospitals</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </DropShadow>
        <View style={{backgroundColor: Colors.primary, ...Margins.mt.mt20}}>
          <View
            style={{
              backgroundColor: Colors.primary,
              flexDirection: 'row',
              justifyContent: 'space-between',
              ...Margins.mh.mh15,
            }}>
            <View style={{...Margins.mt.mt20}}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: FontSizes.tinymedium,
                  fontWeight: FontWeights.medium,
                }}>
                Contact Us
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...Margins.mv.mv10,
                }}>
                <MaterialIcons name="mail" size={16} color={Colors.white} />
                <Text
                  style={{
                    color: Colors.white,
                    ...Margins.mh.mh5,
                    fontSize: FontSizes.small,
                  }}>
                  Support@tald.in
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/images/openicon.png')}
                  style={{width: 10, height: 10}}
                />
                <Text
                  style={{
                    color: Colors.white,
                    ...Margins.mh.mh5,
                    fontSize: FontSizes.small,
                  }}>
                  +91 9999160322
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...Margins.mt.mt10,
                }}>
                <Image
                  source={require('../assets/images/punctualicon.png')}
                  style={{width: 10, height: 10}}
                />
                <Text
                  style={{
                    color: Colors.white,
                    ...Margins.mh.mh5,
                    fontSize: FontSizes.small,
                  }}>
                  Office No G-39
                </Text>
              </View>
              <View style={{...Margins.mv.mv2}}>
                <Text style={{color: Colors.white, fontSize: FontSizes.small}}>
                  Vardhman Grand Market,
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: FontSizes.small,
                    ...Margins.mv.mv3,
                  }}>
                  Sector 3, Dwarka, New
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: FontSizes.small,
                    ...Margins.mv.mv3,
                  }}>
                  Delhi- 110078
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: FontSizes.small,
                    ...Margins.mv.mv3,
                  }}>
                  Execution Force Private
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: FontSizes.small,
                    ...Margins.mv.mv3,
                  }}>
                  Limited
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    ...Margins.mt.mt20,
                    fontWeight: FontWeights.medium,
                    fontSize: FontSizes.tinymedium,
                  }}>
                  Follow Us
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={openFacebook}>
                  <MaterialIcons
                    name="facebook"
                    size={40}
                    color={Colors.white}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={openInstagram}>
                  <Image
                    source={require('../assets/images/instagram.png')}
                    style={{width: 40, height: 40, ...Margins.mh.mh5}}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={openLinkedin}>
                  <Image
                    source={require('../assets/images/linkedin.png')}
                    style={{width: 38, height: 38}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{...Margins.mt.mt30}}>
              <TouchableOpacity onPress={()=>navigation.navigate('enquiry')}
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.white,
                  ...Paddings.p.p8,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...BorderRadius.br5,
                }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: FontSizes.tiny,
                    ...Margins.mr.mr20,
                  }}>
                  Make an Enquiry
                </Text>
                <View>
                  <Image
                    source={require('../assets/images/arrow-right-tatd.png')}
                    style={{width: 15, height: 15}}
                  />
                </View>
            </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.white,
                  ...Paddings.p.p8,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...BorderRadius.br5,
                  ...Margins.mt.mt10,
                }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: FontSizes.tiny,
                    ...Margins.mr.mr20,
                  }}>
                  Cancel My Booking
                </Text>
                <View>
                  <Image
                    source={require('../assets/images/arrow-right-tatd.png')}
                    style={{width: 15, height: 15}}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.white,
                  ...Paddings.p.p8,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...BorderRadius.br5,
                  ...Margins.mt.mt10,
                }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: FontSizes.tiny,
                    ...Margins.mr.mr20,
                  }}>
                  My Weekly Schedule
                </Text>
                <View>
                  <Image
                    source={require('../assets/images/arrow-right-tatd.png')}
                    style={{width: 15, height: 15}}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.white,
                  ...Paddings.p.p8,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...BorderRadius.br5,
                  ...Margins.mt.mt10,
                }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: FontSizes.tiny,
                    ...Margins.mr.mr20,
                  }}>
                  Download Invoice
                </Text>
                <View>
                  <Image
                    source={require('../assets/images/arrow-right-tatd.png')}
                    style={{width: 15, height: 15}}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.white,
                  ...Paddings.p.p8,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...BorderRadius.br5,
                  ...Margins.mt.mt10,
                }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: FontSizes.tiny,
                    ...Margins.mr.mr20,
                  }}>
                  My Feedback
                </Text>
                <View>
                  <Image
                    source={require('../assets/images/arrow-right-tatd.png')}
                    style={{width: 15, height: 15}}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.white,
                  ...Paddings.p.p8,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...BorderRadius.br5,
                  ...Margins.mt.mt10,
                }}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: FontSizes.tiny,
                    ...Margins.mr.mr20,
                  }}>
                  About Us
                </Text>
                <View>
                  <Image
                    source={require('../assets/images/arrow-right-tatd.png')}
                    style={{width: 15, height: 15}}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...Margins.ml5,
                  ...Margins.mt.mt10,
                }}>
                <Text
                  style={{fontSize: FontSizes.tinysmall, color: Colors.white}}>
                  Terms & Conditions
                </Text>
                <Text
                  style={{
                    fontSize: FontSizes.tinymedium,
                    color: Colors.white,
                    ...Margins.mh.mh5,
                  }}>
                  |
                </Text>
                <Text
                  style={{fontSize: FontSizes.tinysmall, color: Colors.white}}>
                  Privacy Policy
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#ff8b00',
            ...BorderRadius.br5,
            justifyContent: 'center',
            alignItems: 'center',
            ...Paddings.p.p10,
            marginHorizontal: '28%',
            borderRadius: 10,
            marginTop: 60,
            marginBottom: 40,
          }}>
          <Text
            style={{
              color: Colors.white,
              fontSize: 14,
              fontFamily: 'Roboto-Medium',
            }}>
            Apply For Driver Job
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.black,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    ...BorderRadius.br8,
    ...Paddings.p.p5,
    ...Margins.mv.mv40,
    ...Margins.mh.mh15,
    ...BorderWidths.bw.bw1,
    borderColor: Colors.darkgrey,
    shadowColor: '#141414',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 20,
    shadowRadius: 9,
    elevation: 20,
    backgroundColor: Colors.white,
  },
  textContainer: {
    ...Margins.mh.mh5,
    flex: 1,
  },
  text: {
    color: Colors.black,
    fontFamily: 'Roboto-LightItalic',
    fontSize: baseFontSize,
    ...Margins.mt.mt3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Paddings.pt.pt10,
  },
  image: {},
  footerTextContainer: {
    ...Margins.mh.mh10,
    ...Margins.mt.mt10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  btn: {
    backgroundColor: Colors.white,
    height: 120,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },
  content: {
    FontSizes: FontSizes.medium,
  },
  iconButton: {
    alignItems: 'center',
    width: '25%',
  },
  iconWrapper: {
    backgroundColor: Colors.white,
    ...BorderRadius.br30,
    ...Paddings.p.p12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 22,
    height: 22,
  },
  iconText: {
    color: Colors.white,
    fontSize: FontSizes.tiny,
    ...Margins.mt.mt5,
    textAlign: 'center',
  },
  containerHiddenText: {
    backgroundColor: '#f7f7f7',
    ...Margins.mh.mh15,
    ...BorderRadius.br5,
    borderColor: '#e0e0e0',
    ...BorderWidths.bw.bw1,
  },
  containerHiddenTextTwo: {
    backgroundColor: '#f7f7f7',
    ...Margins.mh.mh15,
    ...BorderRadius.br5,
    ...Margins.mt.mt10,
    borderColor: '#e0e0e0',
    ...BorderWidths.bw.bw1,
  },
  textHidden: {
    ...Margins.mt.mt20,
    fontSize: FontSizes.body,
    color: '#000',
  },
  containerText: {
    backgroundColor: '#f7f7f7',
    ...BorderRadius.br10,
  },
  questionContainer: {
    ...Margins.mb.mb10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionText: {
    ...Margins.ml.ml10,
    fontSize: FontSizes.tinymedium,
    fontWeight: FontWeights.bold,
    color: Colors.black,
  },
  answerText: {
    ...Margins.mt.mt10,
    fontSize: FontSizes.small,
    color: '#666',
    ...Margins.mh.mh10,
    letterSpacing: 0.2,
    ...Paddings.pv.p5,
  },
});
