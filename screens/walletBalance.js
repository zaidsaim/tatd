import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, TextInput, Image, Linking } from 'react-native';
import OTTHeader from '../components/OTTHeader';
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, FontSizes, FontWeights,Paddings,Margins } from '../assets/colors';
import DropShadow from "react-native-drop-shadow";
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons'
import OTTReferHeader from '../components/OTTReferHeader';
const WalletBalance = ({ navigation }) => {

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleWork, setModalVisibleWork] = useState(false)
  const [email, setEmail] = useState()
  const openWhatsApp = () => {
    let phoneNumber = '';
    phoneNumber = phoneNumber.replace(/\D/g, '');
    let whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(whatsappUrl)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure WhatsApp is installed on your device');
      });
  };
  const openModal = () => {
    setModalVisible(!isModalVisible);
  };
  const openModalWorkWork = () => {
    setModalVisibleWork(!isModalVisibleWork);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const closeModalWork = () => {
    setModalVisibleWork(false);
  };
  return (
    <ScrollView style={{flex:1,backgroundColor:'white'}}>
      <OTTReferHeader navigation={navigation} title={'trusted & trained driver'} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh15, ...Margins.mt.mt10, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/wallet.png')}
            resizeMode={'cover'}
            style={styles.image}
          />
          <Text style={{ color: Colors.black, ...Margins.mh.mh15 }}>tat d wallet balance</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('LifetimeEarningScreen')} style={{ borderBottomWidth: 1, borderBottomColor: Colors.primary, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#4b1952' }}>₹510</Text>
        </TouchableOpacity>
      </View>
      <View style={{ ...Margins.mt.mt30, alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ color: Colors.primary, fontWeight: FontWeights.bold, fontSize: FontSizes.header, ...Paddings.p.p20 }}>
          5%
        </Text>
      </View>
      <View style={{ ...Margins.mh.mh15 }}>
        <Text style={{ color: Colors.black }}>Get 5% back each time your friend initiate an</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: Colors.black }}>booking with us</Text>
          <TouchableOpacity onPress={openModalWorkWork}>
            <Text style={{ color: Colors.lightblue, ...Margins.mh.mh5}}>How it works?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DropShadow style={{
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 1, elevation: 20,
      }}>
        <TouchableOpacity onPress={openModal} style={{
          backgroundColor: Colors.orange, alignItems: 'center',...Paddings.p.p12,
          ...Margins.mb.mb15, borderRadius: 5, width: '92%', ...Margins.mh.mh15, ...Margins.mv.mv30
        }} >
          <Text style={{ color: Colors.white, fontSize: FontSizes.small, ...Paddings.ph.ph10 }}>Refer & Earn</Text>
        </TouchableOpacity>
      </DropShadow>
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh15,
        alignItems: 'center', borderWidth: 1, borderColor: Colors.primary, ...Paddings.p.p5, ...Margins.mt.mt20
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: Colors.black, fontSize: FontSizes.small }}>
            9999999999
          </Text>
          <Text style={{ color: Colors.darkgrey, fontSize: FontSizes.small, ...Margins.mh.mh10 }}>
            22 Jun, 2024 14:20 PM
          </Text>
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={openWhatsApp} >
          <Text style={{ color: Colors.darkgrey, fontSize: FontSizes.small, ...Margins.mh.mh10 }}>
            0 Rs
          </Text>
          <Icon name="logo-whatsapp" color={Colors.lightGreen} size={20} />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Ionicons name="close" color={Colors.white} size={24} />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{ borderWidth: 1, borderColor: Colors.black, borderRadius: 5 }}>
              <View style={{ alignItems: 'center', justifyContent: 'center', ...Margins.mv.mv40 }}>
                <Text style={styles.title}>Refer Your Friend</Text>
              </View>
              <KeyboardAvoidingView behavior="padding">
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 20 }}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    placeholder="Your Friend's 10 Digit Number"
                    placeholderTextColor={Colors.black}
                    keyboardType='numeric'
                  />
                  <TouchableOpacity style={{
                    backgroundColor: Colors.orange, width: '45%',
                    ...Paddings.p.p10, alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 5
                  }}>
                    <Text style={{ color: Colors.white }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...Margins.mv.mv15 }}>
              <View style={{ ...Paddings.p.p10, borderRadius: 20, borderWidth: 1, borderColor: Colors.grey }}>
                <Text style={{ color: Colors.black }}>OR</Text>
              </View>
              <View style={{ ...Margins.mh.mh10, ...Margins.mt.mt5 }}>
                <Image
                  source={require('../assets/images/copy.png')}
                  resizeMode={'cover'}
                  style={styles.image}
                />
                <Text style={{ color: Colors.black }}>Copy</Text>
              </View>
            </View>
            <View style={{ borderWidth: 1, borderColor: Colors.black, borderRadius: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',...Margins.m.m10, ...Margins.mt.mt20 }}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../assets/images/whatsapp.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize: FontSizes.small, ...Margins.mt.mt10 }}>WhatsApp</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../assets/images/facebook.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize: FontSizes.small, ...Margins.mt.mt10 }}>Facebook</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../assets/images/linkedin.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize: FontSizes.small, ...Margins.mt.mt10 }}>Linkedin</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../assets/images/twitter.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize: FontSizes.small, ...Margins.mt.mt10 }}>Twitter</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',...Margins.m.m10, ...Margins.mt.mt20 }}>
                <View style={{ alignItems: 'center', ...Margins.ml.ml10, ...Margins.mb.mb20, }}>
                  <Image
                    source={require('../assets/images/new.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize: FontSizes.small, ...Margins.mt.mt10 }}>Gmail</Text>
                </View>
                <View style={{ alignItems: 'center', ...Margins.ml.ml20 }}>
                  <Image
                    source={require('../assets/images/telegram.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize: FontSizes.small, ...Margins.mt.mt10 }}>Telegram</Text>
                </View>
                <View style={{ alignItems: 'center', ...Margins.ml.ml10 }}>
                  <Image
                    source={require('../assets/images/social.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize: FontSizes.small, ...Margins.mt.mt10 }}>Pinterest</Text>
                </View>
                <View style={{ alignItems: 'center', ...Margins.ml.ml10 }}>
                  <Image
                    source={require('../assets/images/reddit.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize: FontSizes.small, ...Margins.mt.mt10 }}>Reddit</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* second */}
      <Modal
        isVisible={isModalVisibleWork}
        onBackdropPress={closeModalWork}
        style={styles.modalStyle}
      >
        <View style={styles.modalContentStyle}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh20, alignItems: 'center', ...Margins.mv.mv15 }}>
            <Text style={styles.titleStyle}>Unlock Rewards With Our Referral Program!</Text>
            <TouchableOpacity onPress={closeModalWork} >
              <Ionicons name="close" color={Colors.grey} size={22} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{ backgroundColor: Colors.white, ...Margins.mh.mh15 }}>
              <View style={{ borderRadius: 5, backgroundColor: Colors.secondary, flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                <View style={{ left: -20, position: 'absolute',...Margins.mr.mr20 }}>
                  <Image
                    source={require('../assets/images/first_icon.png')}
                    resizeMode={'cover'}
                    style={styles.imageStyle}
                  />
                </View>
                <View style={{ ...Margins.mh.mh25, ...Margins.mt.mt10, ...Margins.mb.mb10 }}>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xsmall, fontWeight: FontWeights.bold }}>Refer a Friend: Once Connected, Lifetime</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xsmall, fontWeight: FontWeights.bold }}>Rewarded!</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>Share the joy of seamless rides! invite your friends</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>to join by simply entering their 10-digit mobile</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>number in the app.</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: Colors.white, ...Margins.mh.mh15, ...Margins.mv.mv10 }}>
              <View style={{ borderRadius: 5, backgroundColor: Colors.secondary, flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                <View style={{ left: -20, position: 'absolute', ...Margins.mr.mr20 }}>
                  <Image
                    source={require('../assets/images/secound_icon.png')}
                    resizeMode={'cover'}
                    style={styles.imageStyle}
                  />
                </View>
                <View style={{ ...Margins.mh.mh25, ...Margins.mt.mt10, ...Margins.mb.mb10 }}>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xsmall, fontWeight: FontWeights.bold  }}>Receive a WhatsApp Notification</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>Your friend will instantly receive a WhatsApp</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>Notification. welcoming them to the incredible</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>journey with us.</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: Colors.white, ...Margins.mh.mh15 }}>
              <View style={{ borderRadius: 5, backgroundColor: Colors.secondary, flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                <View style={{ left: -20, position: 'absolute', ...Margins.ml.mr20 }}>
                  <Image
                    source={require('../assets/images/third_icon.png')}
                    resizeMode={'cover'}
                    style={styles.imageStyle}
                  />
                </View>
                <View style={{ ...Margins.mh.mh25, ...Margins.mt.mt10, ...Margins.mb.mb10 }}>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xsmall, fontWeight: FontWeights.bold  }}>Track Referrals in Real-Time</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>We keep it transparent Our database records who</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>referred whom, ensuring you stay in the loop</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: Colors.white, ...Margins.mh.mh15, ...Margins.mv.mv10 }}>
              <View style={{ borderRadius: 5, backgroundColor: Colors.secondary, flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                <View style={{ left: -20, position: 'absolute', ...Margins.ml.mr20 }}>
                  <Image
                    source={require('../assets/images/forth_icon.png')}
                    resizeMode={'cover'}
                    style={styles.imageStyle}
                  />
                </View>
                <View style={{ ...Margins.mh.mh25, ...Margins.mt.mt10, ...Margins.mb.mb10 }}>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xsmall, fontWeight: FontWeights.bold  }}>Earn 5% Cashback on Bookings</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>Everytime your friend makes their transaction &</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>their booking starts. you earn 5% of the booking</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>amount in your wallet.</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: Colors.white, ...Margins.mh.mh15 }}>
              <View style={{ borderRadius: 5, backgroundColor: Colors.secondary, flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                <View style={{ left: -20, position: 'absolute', ...Margins.ml.mr20 }}>
                  <Image
                    source={require('../assets/images/five_icon.png')}
                    resizeMode={'cover'}
                    style={styles.imageStyle}
                  />
                </View>
                <View style={{ ...Margins.mh.mh25, ...Margins.mt.mt10, ...Margins.mb.mb10 }}>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xsmall, fontWeight: FontWeights.bold  }}>Radeem Your Earnings</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>Your wallet grows with every successful referral!</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>Radeem your earnings at the time of your next</Text>
                  <Text style={{ color: Colors.primary, fontSize: FontSizes.xtiny }}>booking, making your ride evn more enjoyable.</Text>
                </View>
              </View>
            </View>
            <View style={{ ...Margins.mh.mh15, ...Margins.mt.mt10 }}>
              <View>
                <Text style={{ color: Colors.black, fontSize: FontSizes.tiny }}>Spread the word, share the rewards, and make every ride</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: Colors.black, fontSize: FontSizes.tiny }}>memorable with our refferal program!</Text>
                  <Text style={{ color: Colors.black, fontSize: FontSizes.tiny, marginHorizontal: 3 }}>dYs-a0e</Text>
                </View>
              </View>
              <View>
                <Text style={{ color: Colors.black, fontSize: FontSizes.tiny }}>No dublicate Referrals: We value fairness! You cannot add a</Text>
                <Text style={{ color: Colors.black, fontSize: FontSizes.tiny }}>referral if your friend is already a customer or has been</Text>
                <Text style={{ color: Colors.black, fontSize: FontSizes.tiny }}>referred by someone else. This ensure everyone gets a</Text>
                <Text style={{ color: Colors.black, fontSize: FontSizes.tiny }}>chance to enjoy the benefits.</Text>
              </View>
            </View>
            <DropShadow style={{ shadowColor: '#171717', shadowOffset: { width: 2, height: 6 }, shadowOpacity: 0.2, shadowRadius: 1, elevation: 20 }}>
              <TouchableOpacity style={{ backgroundColor: Colors.orange, alignItems: 'center',...Paddings.p.p12, ...Margins.mb.mb15, borderRadius: 5, width: '92%', ...Margins.mh.mh15, ...Margins.mv.mv30 }}>
                <Text style={{ color: Colors.white, fontSize: FontSizes.small, ...Paddings.ph.ph10 }}>Refer & Earn</Text>
              </TouchableOpacity>
            </DropShadow>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default WalletBalance;
const styles = StyleSheet.create({
  imageStyle: {
    width: 40,
    height: 35
  },
  closeButtonStyle: {
    alignSelf: 'flex-end',
    ...Margins.mt.mt10,
    ...Margins.mb.mb10,
    borderWidth: 2,
    borderColor: Colors.white,
    ...Paddings.p.p5
  },
  modalContentStyle: {
    backgroundColor: Colors.lightblue,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
  },
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContentStyle: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
  },
  inputStyle: {
    height: 50,
    borderColor: Colors.orange,
    borderWidth: 1,
      ...Margins.mv.mv8,
    ...Paddings.p.p10,
    backgroundColor: Colors.white,
    color: Colors.black,
    borderRadius: 5,
    width: '45%',
    fontSize: FontSizes.tinyxsmall
  },
  titleStyle: {
    color: Colors.primary,
    fontSize: FontSizes.tinymedium,
    fontWeight: FontWeights.bold,
  },
  image: {
    width: 30,
    height: 30
  },
  closeButton: {
    alignSelf: 'flex-end',
    ...Margins.mt.mt10,
    ...Margins.mb.mb10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.white,
    ...Paddings.p.p5,
    backgroundColor: Colors.orange
  },
  modalContent: {
    backgroundColor: Colors.lightblue,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
    ...Paddings.ph.ph20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
    ...Paddings.ph.ph20,
  },
  input: {
    height: 50,
    borderColor: Colors.orange,
    borderWidth: 1,
      ...Margins.mv.mv8,
    ...Paddings.p.p10,
    backgroundColor: Colors.white,
    color: Colors.black,
    borderRadius: 5,
    width: '45%',
    fontSize: FontSizes.tinyxsmall
  },
  title: {
    color: Colors.black,
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold ,
    ...Margins.mt.mt20,
  },
})
