import React from 'react';
import { View, Text, Image, StyleSheet,Pressable } from 'react-native';
import { Colors, FontSizes } from '../assets/colors';
const OTDarkHeader = ({navigation}) => {
  return (
    <View style={styles.headerContainer}>
      <Pressable style={{ margin: 10, flexDirection: 'row' }} onPress={()=>navigation.navigate('home')}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../assets/images/logo-white.png')} style={{ width: 37, height: 37, color: Colors.white }} />
            <Text style={{ color: Colors.white, fontSize: FontSizes.title, marginTop: 8, marginLeft: 7, fontFamily: 'AbhayaLibre-Bold' }}>tat d</Text>
          </View>
          <Text style={{ color: Colors.white, fontSize: FontSizes.tinysmall, justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 25, fontFamily: 'AbhayaLibre-Bold' }}>family ke liye driver</Text>
        </View>
      </Pressable>
      <View style={{ marginHorizontal: 30, flexDirection: 'row', backgroundColor: Colors.white, marginTop: 25, borderRadius: 30, padding: 3, alignItems: 'center', width: '50%', justifyContent: 'space-between' }}>
        <View style={{ backgroundColor: Colors.primary, borderRadius: 30, padding: 5, alignItems: 'center', paddingHorizontal: 10 }}>
          <Text style={{ color: Colors.white,fontSize: FontSizes.small }}>CUSTOMER</Text>
        </View>
        <Text style={{ color: Colors.darkgrey, marginHorizontal: 5, fontSize: FontSizes.small, marginHorizontal: 10 }}>PARTNER</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'transparent', 
  },
});
export default OTDarkHeader;
