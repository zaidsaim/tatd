import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import OTTHeader from '../components/OTTHeader';
import { Divider } from '@rneui/themed';
import { Colors, FontSizes, FontWeights ,Margins} from '../assets/colors';
const AmountScreen = ({ navigation }) => {
  return (
    <View>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <View style={{ backgroundColor: Colors.secondary, ...Margins.mt.mt20 , ...Margins.mh.mh15  }}>
        <View style={{ ...Margins.mh.mh25 }}>
          <Text style={{ color: Colors.black, fontWeight: FontWeights.regular, fontSize: FontSizes.xxlarge, ...Margins.mv.mv15 }}>Amount</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ color: Colors.black, fontSize: FontSizes.xxxxlarge, fontWeight: FontWeights.bold}}>₹5</Text>
            <Image
              source={require('../assets/images/check_offer.png')}
              resizeMode={'cover'}
              style={styles.imageStyle}
            />
          </View>
          <View>
            <Text style={{ color: Colors.black, ...Margins.mt.mt15  }}> Automatic 1% Commision Earned</Text>
          </View>
          <Divider width={1} style={{ ...Margins.mv.mv20}} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: Colors.black, fontSize:FontSizes.tinymedium}}>Your Agent</Text>
            <Text style={{ color: Colors.black, fontSize:FontSizes.tinymedium}}>06 May,2024</Text>
          </View>
          <Text style={{ color: Colors.black, fontWeight: FontWeights.regular, fontSize: FontSizes.xxxlarge, ...Margins.mt.mt20  }}>Laukesh</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', ...Margins.mv.mv15, ...Margins.mb.mb45 }}>
            <Text style={{ color: Colors.black }}>Invoice Value </Text>
            <Text style={{ color: Colors.black }}>₹480</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
export default AmountScreen;
const styles = StyleSheet.create({
  imageStyle: {
    width: 40,
    height: 35,
   ...Margins.mh.mh10
  },
})