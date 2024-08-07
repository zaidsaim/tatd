import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import OTTHeader from '../components/OTTHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, FontSizes, FontWeights,Paddings,Margins } from '../assets/colors';
const LifetimeEarningScreen = ({ navigation }) => {
  const [textWidth, setTextWidth] = useState(0);
  const [earningsWidth, setEarningsWidth] = useState(0);
  const totalWidth = textWidth + earningsWidth;
  return (
    <View>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={{ position: 'relative' }}>
            <Text
              style={styles.text}
              onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)}
            >
              My Lifetime Earning
            </Text>
            <View style={[styles.line, { width: textWidth }]} />
          </View>
          <View style={styles.currencyRow}>
            <Text style={styles.currencyText}>₹8263</Text>
            <View style={[styles.line, { width: earningsWidth }]} />
          </View>
          <View style={[styles.line, { width: totalWidth }]} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh15, ...Margins.mt.mt10, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/wallet_icon.png')}
            resizeMode={'cover'}
            style={styles.imageStyle}
          />
          <Text style={{ color: Colors.black, ...Margins.mh.mh5}}>tat d balance</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: Colors.black }}>₹0</Text>
        </View>
      </View>
      <TouchableOpacity style={{ flexDirection: 'row', ...Margins.mt.mt30, justifyContent: 'space-around' }} onPress={() => navigation.navigate('AmountScreen')}>
        <MaterialCommunityIcons name="plus-thick" color={Colors.primary} size={16} />
        <View style={{ ...Margins.mh.mh5}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View>
              <Text style={{ color: Colors.black, fontWeight: FontWeights.regular, fontSize:FontSizes.tinymedium, }}>Referral Amount Added to ta d wallet</Text>
              <View style={{ flexDirection: 'row', ...Margins.mv.mv5}}>
                <Text style={{ color: Colors.grey, fontSize:FontSizes.xsmall, fontWeight: FontWeights.regular }}>06 May, 2024 -</Text>
                <Text style={{ color:Colors.darkgrey, fontSize:FontSizes.small, ...Margins.mh.mh3 }}>Paid By Tatd</Text>
                <Text style={{ color: Colors.grey, fontSize:FontSizes.xsmall, fontWeight: FontWeights.regular }}>15 May,2024</Text>
              </View>
            </View>
            <View style={{ alignItems: 'center', ...Margins.mb.mb25, ...Margins.ml.ml25}}>
              <Text style={{ color:Colors.darkgrey }}>₹5</Text>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: Colors.black, ...Margins.mt.mt5 }} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default LifetimeEarningScreen;
const styles = StyleSheet.create({
  imageStyle: {
    width: 40,
    height: 35
  },
  container: {
  ...Margins.m.m20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    color: Colors.black,
    fontWeight: FontWeights.medium,
  },
  line: {
    height: 1,
    backgroundColor: Colors.black,
    position: 'absolute',
    bottom: -7,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  ...Margins.ml.ml5,
  },
  currencyText: {
    color: Colors.black,
    fontWeight: FontWeights.medium,
  },
})

