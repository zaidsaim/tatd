import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, Image } from 'react-native';
import Modal from "react-native-modal";
import { Colors, FontSizes ,Paddings,Margins} from '../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
const CustomerAgentPanel = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState()
  const openModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Button title='open' onPress={openModal} />
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
              <View style={{ alignItems: 'center', justifyContent: 'center', ...Margins.mv.mv40  }}>
                <Text style={styles.title}>Refer Your Friend</Text>
              </View>
              <KeyboardAvoidingView behavior="padding">
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', ...Margins.mb.mb20  }}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    placeholder="Your Friend's 10 Digit Number"
                    placeholderTextColor={Colors.black}
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
              <View style={{ ...Margins.mh.mh1, ...Margins.mt.mt5}}>
                <Image
                  source={require('../assets/images/copy.png')}
                  resizeMode={'cover'}
                  style={styles.image}
                />
                <Text style={{ color: Colors.black }}>Copy</Text>
              </View>
            </View>
            <View style={{ borderWidth: 1, borderColor: Colors.black, borderRadius: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.m.m10, ...Margins.mt.mt20 }}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../assets/images/whatsapp.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize:FontSizes.small, ...Margins.mt.mt10}}>WhatsApp</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../assets/images/facebook.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize:FontSizes.small, ...Margins.mt.mt10}}>Facebook</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../assets/images/linkedin.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize:FontSizes.small, ...Margins.mt.mt10}}>Linkedin</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../assets/images/twitter.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize:FontSizes.small, ...Margins.mt.mt10}}>Twitter</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.m.m10, ...Margins.mt.mt20 }}>
                <View style={{ alignItems: 'center',...Margins.ml.ml10, ...Margins.mb.mb20, }}>
                  <Image
                    source={require('../assets/images/new.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize:FontSizes.small, ...Margins.mt.mt10}}>Gmail</Text>
                </View>
                <View style={{ alignItems: 'center', ...Margins.ml.ml20 }}>
                  <Image
                    source={require('../assets/images/telegram.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize:FontSizes.small, ...Margins.mt.mt10}}>Telegram</Text>
                </View>
                <View style={{ alignItems: 'center',...Margins.ml.ml10 }}>
                  <Image
                    source={require('../assets/images/social.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize:FontSizes.small, ...Margins.mt.mt10}}>Pinterest</Text>
                </View>
                <View style={{ alignItems: 'center',...Margins.ml.ml10 }}>
                  <Image
                    source={require('../assets/images/reddit.png')}
                    resizeMode={'cover'}
                    style={styles.image}
                  />
                  <Text style={{ color: Colors.black, fontSize:FontSizes.small, ...Margins.mt.mt10}}>Reddit</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

export default CustomerAgentPanel;
const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30
  },
  closeButton: {
    alignSelf: 'flex-end',
    ...Margins.mt.mt10,
    ...Margins.mb.mtb10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.white,
   ...Paddings.p.p5,
    backgroundColor: Colors.orange
  },
  modalContent: {
    backgroundColor: '#0981bd',
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
    marginVertical: 8,
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
    fontWeight: FontWeights.bold,
    ...Margins.mt.mt20,
  },
})