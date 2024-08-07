import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ScrollView, Image, TouchableOpacity,ActivityIndicator ,TextInput} from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import { Colors, FontSizes,BorderWidths,Margins,Paddings } from '../../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RadioButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropShadow from "react-native-drop-shadow";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { getEnquiryApi ,getPrivacyApi} from '../../api/services/apiService';
import moment from 'moment';
import { validateAccessToken,refreshAccessToken } from '../../utils/validation';
const EnquiryScreen = ({ navigation }) => {
    const [enquiry, setEnquiry] = useState(null);
    const [loading, setLoading] = useState(true); // Initially set loading to true
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [name, setName] = useState();
    const [mobileNumber,setMobileNumber]=useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [privacydata,setPrivacydata]=useState()
    const [selecteditem,setSelecteditem]=useState()
    const [displayDate, setDisplayDate] = useState('');
    const [modalVisibleDate, setModalVisibleDate] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [insertdata,setInsertdata]=useState()
    const generateDates = () => {
        const dates = [];
        const today = new Date();
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2); // Start from the day after tomorrow
        const oneMonthLater = new Date(today);
        oneMonthLater.setMonth(today.getMonth() + 1);
    
        for (
          let date = new Date(dayAfterTomorrow);
          date <= oneMonthLater;
          date.setDate(date.getDate() + 1)
        ) {
          dates.push(moment(date).format('ddd, DD MMM'));
        }
    
        return dates;
      };
    
      const dates = generateDates();
    useEffect(() => {
      fetchEnquiry();
     // fetchPrivacy()
    }, []);
  
    const fetchEnquiry = async () => {
      const isValid = await validateAccessToken();
      if (!isValid) {
        await refreshAccessToken();
      }
      try {
        const data = await getEnquiryApi();
        console.log('enquirydata==============', data);
        setEnquiry(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after the API call is complete
      }
    };

    const insetData = async () => {
      
        const isValid = await validateAccessToken();
        if (!isValid) {
          await refreshAccessToken();
        }
    
        setLoading(true);
    
        try {
          const userData = await AsyncStorage.getItem('userData');
          const parsedUserData = userData ? JSON.parse(userData) : null;
          const token = parsedUserData ? parsedUserData.jwt : null;
        let date =getDateForApi(selectedDate)
    console.log('dddddddddddddd-------------------',date)
    console.log('==================',selecteditem)
    
          if (!token) {
            throw new Error('No token found');
          }
    
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          };
    
          const body = {
            
                action: "make_an_enquiry",
                date: date,
                name: name,
                mobile_number:mobileNumber,
                required_for: selecteditem

          };
    
          const response = await axios.post(
            'https://www.tatd.in/app-api/customer/pages/make-an-enquiry-api.php',
            body,
            config,
          );
          console.log('Response from insert API check:', response.data);
          setInsertdata(response.data);
    
        
        } catch (error) {
          console.log(
            'Error from insert API:',
            error.response ? error.response.data : error.message,
          );
          throw error;
        } finally {
          setLoading(false);
        }
      };
      console.log('sssssssssellellll',selectedDate)
      console.log('dispppppppppppppp========date',displayDate)
    const handleValueChange = (newValue) => {
        setSelecteditem(newValue);
        setModalVisible(false);
      };
    // const fetchPrivacy = async () => {
    //     const isValid = await validateAccessToken();
    //     if (!isValid) {
    //       await refreshAccessToken();
    //     }
    //     try {
    //       const data = await getPrivacyApi();
    //       console.log('privacyapi==============privacy', data);
    //       setPrivacydata(data);
    //     } catch (error) {
    //       setError(error.message);
    //     } finally {
    //       setLoading(false); // Set loading to false after the API call is complete
    //     }
    //   };
    
    const getDateForApi = selectedDate => {
        if (selectedDate === 'Today') {
          return 'Today';
        } else if (selectedDate === 'Tomorrow') {
          return 'Tomorrow';
        } else {
          return moment(selectedDate, 'ddd, DD MMM').format('YYYY-MM-DD');
        }
      };
    const handleValueChangesDate = newValue => {
        if (newValue === 'Today') {
          setSelectedDate('Today');
          setDisplayDate('Today');
        } else if (newValue === 'Tomorrow') {
          setSelectedDate('Tomorrow');
          setDisplayDate('Tomorrow');
        } else {
          setSelectedDate(newValue);
          setDisplayDate(newValue);
        }
      };
    return (
      <ScrollView style={{ backgroundColor: Colors.white }}>
        <OTTHeader navigation={navigation} title={'Trusted & Trained Driver'} />
        <View style={styles.loginContainer}>
          <View style={styles.header}>
            <View style={styles.roudtripcontainer}>
              <Text style={styles.roudtripText}>Trusted & Trained Driver</Text>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../../assets/images/rt_icon.png')}
                  resizeMode={'cover'}
                  style={styles.icon}
                />
              </View>
            </View>
            <View style={styles.loginTextContainer}>
              <Text style={styles.loginText}>Make An Enquiry</Text>
            </View>
          </View>
        </View>
  
        <View style={{ flex:1,backgroundColor:'white' }}>
          {loading ? (
            <ActivityIndicator size="large" color="#16588e" style={{ marginVertical: 20 }} />
          ) : error ? (
            <View style={{ marginVertical: 15 }}>
              <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            </View>
          ) : (
            <View style={{ marginVertical: 15, paddingHorizontal: 15 }}>
              <Text style={styles.descriptionText}>{enquiry?.page_data?.description}</Text>
            </View>
          )}
  
  <View
          style={{
            flexDirection: 'row',
            ...BorderWidths.bw.bw1,
            borderColor: Colors.grey,
            ...Margins.mh.mh15,
            ...Margins.mt.mt10
          }}>
          <View
            style={{
              justifyContent: 'center',
              ...Paddings.ph.ph10,
              alignItems: 'center',
              ...BorderWidths.br.br1,
              borderRightColor: Colors.grey,
            }}>
            <Ionicons
              name="person"
              color={Colors.icon}
              size={16}
              style={{alignItems: 'center'}}
            />
          </View>
          <TextInput
            style={[
              styles.input,
              validationErrors.pickupAddress && styles.errorInput,
            ]}
            onChangeText={name => setName(name)}
            value={name}
            placeholder="Name"
            keyboardType="text"
            placeholderTextColor={Colors.black}
          />
        </View>
      
        <View style={{}}>
      <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: Colors.grey,
          width: '92%',
          marginHorizontal: 15,
          height: 40,
          marginTop: 10,
         
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            paddingHorizontal: 10,
            alignItems: 'center',
            borderRightWidth: 1,
            borderRightColor: Colors.grey,
          }}
        >
          <MaterialCommunityIcons name="car" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            marginHorizontal: 10,
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: 0,
            top: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
           
          }}
        >
          <Text
            style={{
              color: Colors.black,
              marginLeft: 30,
              fontSize: FontSizes.small,
              backgroundColor:'white'
            }}
          >
            {selecteditem ? selecteditem : 'Select'}
          </Text>
          <Ionicons name="caret-down" color={Colors.black} size={14} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <RadioButton.Group
              onValueChange={handleValueChange}
              value={selecteditem}
            >
              {enquiry?.required_for_option &&
                Object.keys(enquiry.required_for_option).map((key, index) => (
                  <RadioButton.Item
                    key={index}
                    label={enquiry.required_for_option[key]}
                    value={enquiry.required_for_option[key]}
                    labelStyle={{
                      color: Colors.black,
                      fontSize: FontSizes.body,
                    }}
                    style={{ backgroundColor: 'white' }}
                  />
                ))}
            </RadioButton.Group>
         
          </View>
        </View>
      </Modal>
    </View>
    </View>
          <View
          style={{
            flexDirection: 'row',
            ...Margins.mv.mv15,
            ...Margins.mh.mh15,
            width: '100%',
            alignItems:'center'
          }}>
          <View
            style={{
              flexDirection: 'row',
              ...BorderWidths.bw.bw1,
              borderColor: Colors.grey,
              width: '44%',
              height:40
            }}>
            <View
              style={{
                justifyContent: 'center',
                ...Paddings.ph.ph10,
                alignItems: 'center',
                ...BorderWidths.br.br1,
                borderRightColor: Colors.grey,
              }}>
              <Ionicons
                name="call"
                color={Colors.icon}
                size={16}
                style={{alignItems: 'center'}}
              />
            </View>
            <TextInput
              style={styles.input}
              value={mobileNumber}
              placeholder="Mobile Number"
              keyboardType="numeric"
              placeholderTextColor={Colors.black}
              onChangeText={number => setMobileNumber(number)}
            />
          </View>
          <View
            style={{
              ...BorderWidths.bw.bw1,
              borderColor: Colors.grey,
              width: '45%',
              height: 40,
              ...Margins.mh.mh10
            }}>
            <View style={{flexDirection: 'row', width: '100%', height: '100%'}}>
              <View
                style={{
                  justifyContent: 'center',
                  ...Paddings.ph.ph10,
                  alignItems: 'center',
                  ...BorderWidths.br.br1,
                  borderRightColor: Colors.grey,
                }}>
                <MaterialIcons
                  name="calendar-month"
                  color={Colors.icon}
                  size={16}
                  style={{alignItems: 'center'}}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisibleDate(true)}
                  style={[
                    styles.pickerDate,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    },
                  ]}>
                  <Text
                    style={{color: Colors.black, fontSize: FontSizes.small,marginLeft:5}}>
                    {displayDate || 'Date'}
                  </Text>
                  <Icon name="arrow-drop-down" size={25} color={Colors.black} />
                </TouchableOpacity>

                <Modal
                  transparent={true}
                  visible={modalVisibleDate}
                  onRequestClose={() => setModalVisibleDate(false)}>
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                      <ScrollView>
                        <RadioButton.Group
                          onValueChange={newValue => {
                            handleValueChangesDate(newValue);
                            setModalVisibleDate(false);
                          }}
                          value={displayDate}>
                          <RadioButton.Item
                            label="Today"
                            value="Today"
                            labelStyle={{
                              color: Colors.black,
                              fontSize: FontSizes.body,
                            }}
                            style={{backgroundColor: 'white'}}
                          />
                          <RadioButton.Item
                            label="Tomorrow"
                            value="Tomorrow"
                            labelStyle={{
                              color: Colors.black,
                              fontSize: FontSizes.body,
                            }}
                            style={{backgroundColor: 'white'}}
                          />
                          {Array.isArray(dates) &&
                            dates.map((date, index) => (
                              <RadioButton.Item
                                key={index}
                                label={date}
                                value={date}
                                labelStyle={{
                                  color: Colors.black,
                                  fontSize: FontSizes.body,
                                }}
                                style={{backgroundColor: 'white'}}
                              />
                            ))}
                        </RadioButton.Group>
                      </ScrollView>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
            {validationErrors.selectedDate && (
              <Text style={[styles.errorText, {fontSize: 9}]}>
                {validationErrors.selectedDate}
              </Text>
            )}
            </View>
        
        </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, marginVertical: 30, marginTop: 50 }}>
            <DropShadow style={styles.dropShadow}>
              <TouchableOpacity
                onPress={insetData}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Submit</Text>
              </TouchableOpacity>
            </DropShadow>
          </View>
        </View>
      </ScrollView>
    );
  };
  
  export default EnquiryScreen;
  
  const styles = StyleSheet.create({
    container: {
       flex:1,
        backgroundColor: Colors.white,
      },
      modalOverlay: {
       
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Semi-transparent background
      },
      mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Margins.mh.mh30,
        width: '84%'
      },
      modalOverlay: {
        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
     
      },
      modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        
        padding: 20,
        elevation: 2,
      },
      closeButton: {
        marginTop: 10,
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      closeButtonText: {
        color: Colors.white,
        fontSize: FontSizes.body,
      },
   //
    pickerDate: {
        width: '100%',
       marginHorizontal:20,
        color: Colors.black,
      },
    input: {
        ...Paddings.p.p4,
        fontSize: FontSizes.xsmall,
        color: Colors.black,
        width:'100%'
      },
    loginContainer: {
      marginTop: 15,
      marginHorizontal: 15,
      borderRadius: 2,
    },
    header: {
      backgroundColor: Colors.primary,
      height: 100,
      justifyContent: 'space-between',
      borderRadius: 7,
      borderColor: Colors.primary,
    },
    roudtripcontainer: {
      marginVertical: 7,
      height: 20,
      width: '78%',
      backgroundColor: Colors.white,
    },
    roudtripText: {
      position: 'absolute',
      color: Colors.primary,
      marginLeft: 5,
    },
    iconContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      left: 20,
    },
    icon: {
      width: 20,
      height: 20,
      borderLeftWidth: 1,
      borderLeftColor: Colors.white,
    },
    loginTextContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    loginText: {
      color: Colors.white,
      fontWeight: '400',
      fontSize: FontSizes.xlarge,
    },
    textterms: {
      fontSize: FontSizes.small,
      color: Colors.black,
      marginHorizontal: 15,
    },
    descriptionText: {
      fontSize: 12,
      color: '#333',
    },
    dropShadow: {
      shadowColor: '#171717',
      shadowOffset: { width: 2, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 20,
    },
    closeButton: {
      justifyContent: 'center',
      backgroundColor: '#16588e',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      paddingHorizontal: 20,
      width: '80%',
    },
    closeButtonText: {
      color: Colors.white,
      fontSize: FontSizes.tinymedium,
      fontWeight: '700',
    },
  });
  


//   <View style={{}}>
//   <View style={styles.container}>
//   <View
//     style={{
//       flexDirection: 'row',
//       borderWidth: 1,
//       borderColor: Colors.grey,
//       width: '92%',
//       marginHorizontal: 15,
//       height: 40,
//       marginTop: 10,
     
//     }}
//   >
//     <View
//       style={{
//         justifyContent: 'center',
//         paddingHorizontal: 10,
//         alignItems: 'center',
//         borderRightWidth: 1,
//         borderRightColor: Colors.grey,
//       }}
//     >
//       <MaterialCommunityIcons name="car" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//     </View>
//     <TouchableOpacity
//       onPress={() => setModalVisible(true)}
//       style={{
//         marginHorizontal: 10,
//         position: 'absolute',
//         right: 0,
//         left: 0,
//         bottom: 0,
//         top: 0,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
       
//       }}
//     >
//       <Text
//         style={{
//           color: Colors.black,
//           marginLeft: 30,
//           fontSize: FontSizes.small,
//           backgroundColor:'white'
//         }}
//       >
//         {selecteditem ? selecteditem : 'Select'}
//       </Text>
//       <Ionicons name="caret-down" color={Colors.black} size={14} />
//     </TouchableOpacity>
//   </View>

//   <Modal
//     animationType="slide"
//     transparent={false}
//     visible={modalVisible}
//     onRequestClose={() => setModalVisible(false)}
//   >
//     <View style={styles.modalOverlay}>
//       <View style={styles.modalContainer}>
//         <RadioButton.Group
//           onValueChange={handleValueChange}
//           value={selecteditem}
//         >
//           {enquiry?.required_for_option &&
//             Object.keys(enquiry.required_for_option).map((key, index) => (
//               <RadioButton.Item
//                 key={index}
//                 label={enquiry.required_for_option[key]}
//                 value={enquiry.required_for_option[key]}
//                 labelStyle={{
//                   color: Colors.black,
//                   fontSize: FontSizes.body,
//                 }}
//                 style={{ backgroundColor: 'white' }}
//               />
//             ))}
//         </RadioButton.Group>
     
//       </View>
//     </View>
//   </Modal>
// </View>
// </View>