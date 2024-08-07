import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import OTTHeader from '../components/OTTHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, FontSizes, FontWeights,Margins,Paddings } from '../assets/colors';
import { Divider, Input, } from '@rneui/base';
import DropShadow from 'react-native-drop-shadow';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
const AcceptRideScreen = ({ navigation }) => {
  const [feedback, setFeedback] = useState()
  const [activePage, setActivePage] = useState('Current');
  const [selectedOption, setSelectedOption] = useState('changeplan');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleBooking, setModalVisibleBooking] = useState(false);
  const [isModalVisibleFeedback, setModalVisibleFeedback] = useState(false);

  const openModalBooking = () => {
    setModalVisibleBooking(!isModalVisibleBooking);
  };
  const closeModalBooking = () => {
    setModalVisibleBooking(false);
  };
  const openModalFeedback = () => {
    setModalVisibleFeedback(!isModalVisibleFeedback);
  };
  const closeModalFeedback = () => {
    setModalVisibleFeedback(false);
  };
  const openModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const renderContent = () => {
    if (activePage === 'Current') {
      return (
        <View style={styles.pageContainer}>
          <Modal
            isVisible={isModalVisibleFeedback}
            onBackdropPress={closeModalFeedback}
            style={styles.modal}
          >
            <View style={styles.modalContentBooking}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity onPress={closeModalFeedback} style={styles.closeButton}>
                  <Ionicons name="close" color={Colors.white} size={24} />
                </TouchableOpacity>
                <View style={{ backgroundColor: Colors.secondary, borderRadius: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', ...Margins.m.m20 }}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(feedback) => setFeedback(feedback)}
                      value={feedback}
                      placeholder="Type your feedback here..."
                      keyboardType="text"
                      placeholderTextColor={Colors.black}
                      numberOfLines={3}
                      multiline={true}
                    />
                    <View style={{ backgroundColor: Colors.white, borderRadius: 30, ...Paddings.p.p10, ...Margins.mt.mt20, ...Margins.mh.mh5 }}>
                      <Feather name="send" size={20} color={Colors.primary} />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>
          <Modal
            isVisible={isModalVisibleBooking}
            onBackdropPress={closeModalBooking}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={{ backgroundColor: Colors.secondary }}>
                  <View style={{
                    backgroundColor: Colors.primary, ...Paddings.p.p10, flexDirection: 'row', justifyContent: 'space-between',
                    ...Margins.mt.mt20, alignItems: 'center', borderRadius: 5
                  }}>
                    <Text style={{ color: Colors.white, fontSize: FontSizes.body }}>BOOKING STATUS</Text>
                    <TouchableOpacity onPress={closeModalBooking} style={{ backgroundColor: Colors.white, borderRadius: 20 }}>
                      <Ionicons name="close" color={Colors.black} size={28} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ borderWidth: 1, borderColor: Colors.black, borderRadius: 5, ...Margins.mt.mt10 }}>
                    <View style={{ ...Margins.mh.mh10, ...Margins.mv.mv10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mv.mv10, alignItems: 'center' }}>
                        <Text style={{ color: Colors.black, fontSize: FontSizes.tinymedium, fontWeight:FontWeights.semiBold }}>Booking Confirmed</Text>
                        <Text style={{ color: Colors.black, fontSize: FontSizes.tinymedium, fontWeight:FontWeights.semiBold }}>02:42 PM</Text>
                      </View>
                      <Text style={{ color: Colors.black, fontSize: FontSizes.tinymedium, fontWeight:FontWeights.semiBold }}>Driver Assigned</Text>
                      <Text style={{ color: Colors.black, fontSize: FontSizes.tinymedium, fontWeight:FontWeights.semiBold, ...Margins.mv.mv15 }}>Driver on the Way</Text>
                      <Text style={{ color: Colors.black, fontSize: FontSizes.tinymedium, fontWeight:FontWeights.semiBold }}>Driver Reached</Text>
                      <Text style={{ color: Colors.black, fontSize: FontSizes.tinymedium, fontWeight:FontWeights.semiBold, ...Margins.mv.mv15 }}>Trip Started</Text>
                      <Text style={{ color: Colors.black, fontSize: FontSizes.tinymedium, fontWeight:FontWeights.semiBold, marginBottom: 10 }}>Trip Ended</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal>
          <View style={[styles.card,]}>
            <Text style={{ color: Colors.black }}>Booking ID: #428377</Text>
            <View style={{ borderColor: Colors.darkgrey, borderWidth: 1, ...Margins.mt.mt10, borderRadius: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.m.m10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../assets/images/man_tatd.png')}
                    style={{ width: 45, height: 45, borderRadius: 45 }}
                  />
                  <View style={{ ...Margins.mh.mh10}}>
                    <Text style={{ color: Colors.black, fontSize: FontSizes.medium, fontWeight: FontWeights.bold }}>Drivername</Text>
                    <Text style={{ color: Colors.darkgrey, fontSize: FontSizes.medium }}>Your Driver Partner</Text>
                  </View>
                </View>
                <View style={{ ...Paddings.p.p10, borderRadius: 60, borderWidth: 1, borderColor: Colors.black }}>
                  <Image
                    source={require('../assets/images/openblueicon.png')}
                    style={{ ...Paddings.p.p5 }}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={openModalFeedback} style={{ justifyContent: 'flex-end', alignItems: 'flex-end', ...Margins.mv.mv5, flexDirection: 'row' }}>
              <View>
                <Text style={{ color: Colors.primary, fontSize: FontSizes.medium }}>Need Help ?</Text>
                <View style={{ borderWidth: 1.2, borderColor: Colors.primary, color: 'solid' }} />
              </View>
              <MaterialCommunityIcons name="arrow-right-thick" color={Colors.primary} size={18} />
            </TouchableOpacity>
            <View style={{
              borderStyle: 'dotted',
              borderWidth: 1,
              borderRadius: 1,
              ...Margins.mv.mv5
            }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.black, fontSize: FontSizes.medium }}>
                Sheduled Time:
              </Text>
              <Text style={{ color: Colors.black, fontSize: FontSizes.medium }}>
                05:15 PM,29 Jun 2024
              </Text>
            </View>
            <View style={{
              borderStyle: 'dotted',
              borderWidth: 1,
              borderRadius: 1,
              ...Margins.mv.mv5
            }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.black, fontSize: FontSizes.medium }}>
                Incity:
              </Text>
              <Text style={{ color: Colors.black, fontSize: FontSizes.medium }}>
                5 Hours
              </Text>
            </View>
            <View style={{
              borderStyle: 'dotted',
              borderWidth: 1,
              borderRadius: 1,
              ...Margins.mv.mv5
            }}>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.black, fontSize: FontSizes.medium }}>
                Package & Price:
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: Colors.black, fontSize: FontSizes.medium }}>
                  ₹510
                </Text>
              </View>
            </View>
            <View style={{
              borderStyle: 'dotted',
              borderWidth: 1,
              borderRadius: 1,
              ...Margins.mv.mv5
            }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.black, fontSize: FontSizes.medium }}>
                Grand Total:
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: Colors.black, fontWeight: FontWeights.semiBold, fontSize: FontSizes.medium }}>
                  ₹510
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mv.mv10, ...Margins.mt.mt20 }}>
              <TouchableOpacity style={[styles.cardButton,]} onPress={openModal}>
                <Text style={{ color: Colors.black, fontWeight: FontWeights.semiBold }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cardButton,]} onPress={() => navigation.navigate('demo')}>
                <Text style={{ color: Colors.black, fontWeight: FontWeights.semiBold }}>Reschedule</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={[styles.cardButton,]} onPress={() => navigation.navigate('rating')}>
                <Text style={{ color: Colors.black, fontWeight: FontWeights.semiBold }}>Rate Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cardButton,]} onPress={openModalBooking}>
                <Text style={{ color: Colors.black, fontWeight: FontWeights.semiBold }}>Track</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else if (activePage === 'History') {
      return (
        <ScrollView>
          <View style={{ backgroundColor: '#b7cbdc', ...Margins.mh.mh15, ...Margins.mv.mv15, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
            <View style={{ backgroundColor: '#e8eaeb', flexDirection: 'row', justifyContent: 'space-between', ...Paddings.p.p5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, alignItems: 'center' }}>
              <View>
                <Text style={{ color: Colors.black, fontWeight:FontWeights.semiBold, fontSize: FontSizes.tinymedium, ...Margins.mb.mb3}}>20 Jun, 2024 <Text style={{ color: Colors.darkgrey, fontWeight: '900', fontSize: 20 }}>|</Text> 15:15 PM</Text>
              </View>
              <View style={{ backgroundColor: '#75c519', borderRadius: 30, ...Paddings.p.p4 }}>
                <MaterialCommunityIcons name='check-bold' color={Colors.white} style={{ fontWeight: FontWeights.bold }} size={12} />
              </View>
            </View>
            <View style={{ ...Margins.mh.mh10, ...Margins.mt.mt10 }}>
              <Text style={{ color: Colors.black }}>Booking ID 414259</Text>
            </View>
            <View style={{ flexDirection: 'row', ...Margins.mt.mt20, ...Margins.mh.mh5, alignItems: 'center' }}>
              <Text style={{ color: Colors.black, fontSize: FontSizes.xlarge, fontWeight: FontWeights.semiBold }}>₹510</Text>
            </View>
            <View>
              <Text style={{ color: Colors.black, ...Margins.mt.mt5, ...Margins.mh.mh10}}>Package - 5 Hours</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh10}}>
              <View style={styles.verifyButtonContainer}>
                <DropShadow style={styles.shadowStyle}>
                  <Pressable onPress={() => navigation.navigate('home')} style={styles.verifyButton}>
                    <Text style={{ color: Colors.orange, fontWeight: FontWeights.medium }}>Book Again</Text>
                  </Pressable>
                </DropShadow>
              </View>
              <View style={styles.verifyButtonContainer}>
                <DropShadow style={styles.shadowStyle}>
                  <Pressable onPress={() => navigation.navigate('home')} style={styles.verifyButtons}>
                    <MaterialIcons name="star" size={16} color={Colors.primary} />
                    <Text style={{ color: Colors.primary, ...Margins.ml.ml4, fontWeight: FontWeights.medium }}>4 | GOOD</Text>
                  </Pressable>
                </DropShadow>
              </View>
            </View>
          </View>
          <View>
            <View style={{ backgroundColor: '#b7cbdc', ...Margins.mh.mh15, ...Margins.mb.mb15, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
              <View style={{ backgroundColor: '#e8eaeb', flexDirection: 'row', justifyContent: 'space-between', ...Paddings.p.p5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, alignItems: 'center' }}>
                <View>
                  <Text style={{ color: Colors.black, fontWeight:FontWeights.semiBold, fontSize: FontSizes.tinymedium, ...Margins.mb.mb3}}>20 Jun, 2024 <Text style={{ color: Colors.darkgrey, fontWeight: '900', fontSize: 20 }}>|</Text> 15:15 PM</Text>
                </View>
                <View style={{ backgroundColor: '#75c519', borderRadius: 30, ...Paddings.p.p4 }}>
                  <MaterialCommunityIcons name='check-bold' color={Colors.white} style={{ fontWeight: FontWeights.bold }} size={12} />
                </View>
              </View>
              <View style={{ ...Margins.mh.mh10, ...Margins.mt.mt10 }}>
                <Text style={{ color: Colors.black }}>Booking ID 414259</Text>
              </View>
              <View style={{ flexDirection: 'row', ...Margins.mt.mt20, ...Margins.mh.mh5, alignItems: 'center' }}>
                <Text style={{ color: Colors.black, fontSize: FontSizes.xlarge, fontWeight: FontWeights.semiBold }}>₹510</Text>
              </View>
              <View>
                <Text style={{ color: Colors.black, ...Margins.mt.mt5, ...Margins.mh.mh10}}>Package - 5 Hours</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh10}}>
                <View style={styles.verifyButtonContainer}>
                  <DropShadow style={styles.shadowStyle}>
                    <Pressable onPress={() => navigation.navigate('home')} style={styles.verifyButton}>
                      <Text style={{ color: Colors.orange, fontWeight: FontWeights.medium }}>Book Again</Text>
                    </Pressable>
                  </DropShadow>
                </View>
                <View style={styles.verifyButtonContainer}>
                  <DropShadow style={styles.shadowStyle}>
                    <Pressable onPress={() => navigation.navigate('rating')} style={styles.ratingButton}>
                      <Text style={{ color: Colors.black, ...Margins.ml.ml4, fontWeight: FontWeights.medium }}>Rate Experience</Text>
                    </Pressable>
                  </DropShadow>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{ alignItems: 'center', }}>
              <Text style={styles.title}>Cancel Booking?</Text>
            </View>
            <View style={styles.radioContainer}>
              <View style={styles.firstRadioContainer}>
                <Text style={styles.radioText}>Change in plan</Text>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setSelectedOption('changeplan')}>
                  <View style={styles.radioCircle}>
                    {selectedOption === 'changeplan' && <View style={styles.selectedRb} />}
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.firstRadioContainer}>
                <Text style={styles.radioText}>Driver rewusted to cancel</Text>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setSelectedOption('driverrequstedcancel')}
                >
                  <View style={styles.radioCircle}>
                    {selectedOption === 'driverrequstedcancel' && <View style={styles.selectedRb} />}
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.firstRadioContainer}>
                <Text style={styles.radioText}>Driver is unreachable</Text>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setSelectedOption('driverunrechable')}
                >
                  <View style={styles.radioCircle}>
                    {selectedOption === 'driverunrechable' && <View style={styles.selectedRb} />}
                  </View>
                </TouchableOpacity>
              </View>
              <Divider width={1} color={Colors.white} style={{ ...Margins.mt.mt10 }} />
              <Input
                placeholder='Tell us your suggestion...'
                style={{ ...Margins.mt.mt30, fontSize: FontSizes.tinymedium }}
              />
              <View style={{ ...Margins.mh.mh30 }}>
                <Text style={{ color: Colors.black }}>Your words makes tat d a better</Text>
                <Text style={{ color: Colors.black }}>place. You are the influence</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',...Margins.mt.mt15}}>
              <TouchableOpacity style={styles.noButton}>
                <Text style={styles.noTextButton}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.anotherDriverButton}>
              <Text style={styles.cancelButtonText}>Find Another Driver</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activePage === 'Current' && styles.activeButton
          ]}
          onPress={() => setActivePage('Current')}
        >
          <Text style={styles.buttonText}>Current</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activePage === 'History' && styles.activeButton
          ]}
          onPress={() => setActivePage('History')}
        >
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>

  );
}

export default AcceptRideScreen;
const styles = StyleSheet.create({
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.lightblue,
  },
  title: {
    color: Colors.black,
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    ...Margins.mt.mt20,
  },
  noTextButton: {
    color: Colors.black,
    fontSize: FontSizes.tinymedium,
  },
  cancelButtonText: {
    color: Colors.white,
    fontSize: FontSizes.tinymedium,
  },
  anotherDriverButton: {
    backgroundColor: 'green',
   ...Paddings.p.p13,
    borderRadius: 5,
    width: '68%',
    alignItems: 'center',
    ...Margins.mh.mh50,
   ...Margins.mv.mv30
  },
  cancelButton: {
    backgroundColor: Colors.primary,
    ...Paddings.p.p10,
    width: '25%',
    borderRadius: 5,
    alignItems: 'center'
  },
  noButton: {
    backgroundColor: Colors.white,
    ...Paddings.p.p10,
    width: '25%',
    borderRadius: 5,
    alignItems: 'center'
  },
  radioContainer: {
    justifyContent: 'space-between',
    ...Margins.mh.mh15,
    ...Margins.mt.mt25
  },
  firstRadioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Margins.mv.mv12,
    alignItems: 'center'
  },
  secondRadioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
    ...Margins.mr.mr10,
  },
  radioText: {
    fontSize: FontSizes.tinymedium,
    color: '#000',
    fontWeight: FontWeights.medium
  },
  radioTextCash: {
    fontSize: FontSizes.small,
    color: Colors.darkgrey,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContentBooking: {
    backgroundColor: Colors.lightblue,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
    ...Paddings.ph.ph20,
  },
  modalContent: {
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
    ...Paddings.ph.ph20,
  },
  verifyButtonContainer: {
    justifyContent: 'space-between',
   ...Margins.mv.mv30,
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    ...Margins.mv.mv15,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.white,
    ...Paddings.p.p5,
    backgroundColor: Colors.lightblue
  },
  verifyButton: {
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    alignItems: 'center',
   ...Paddings.p.p11,
    borderRadius: 5,
    ...Paddings.ph.ph30,
    borderColor: Colors.orange,
    borderWidth: 1
  },
  verifyButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
   ...Paddings.p.p11,
    borderRadius: 5,
    ...Paddings.ph.ph30,
    borderColor: Colors.primary,
    borderWidth: 1
  },
  ratingButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
   ...Paddings.p.p11,
    borderRadius: 5,
    ...Paddings.ph.ph15,
    borderColor: Colors.black,
    borderWidth: 1
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  buttonContainer: {
    ...Margins.mh.mh15,
    ...Paddings.p.p10,
    backgroundColor: '#edecf1',
    flexDirection: 'row',
    borderRadius: 3,
    ...Margins.mt.mt15
  },
  button: {
    ...Paddings.ph.ph60,
    borderRadius: 3,
    ...Paddings.p.p7
  },
  activeButton: {
    backgroundColor: Colors.white,
    ...Paddings.ph.ph50,
  },
  buttonText: {
    color: Colors.black
  },
  pageContainer: {
    backgroundColor: Colors.white,
    flex: 1
  },
  pageText: {
    fontSize: FontSizes.xxlarge,
    color: Colors.black
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  image: {
    width: '50%',
    height: 200,
    resizeMode: 'contain'
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...Paddings.p.p15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 15,
  },
  cardButton: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: '46%',
    ...Paddings.p.p15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 12,
    borderColor: Colors.darkgrey,
    borderWidth: 1
  },
  input: {
    borderRadius: 5,
   ...Margins.mv.mv30,
    color: Colors.black,
    ...Paddings.p.p10,
    backgroundColor: Colors.white,
    width: '85%'
  },
  inputNumber: {
    height: 40,
   ...Margins.m.m12,
    ...Paddings.p.p10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    width: '75%'
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
