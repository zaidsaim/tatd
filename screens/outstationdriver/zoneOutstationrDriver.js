import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import { Divider, Image } from '@rneui/base';
import { Colors, FontSizes, FontWeights,Paddings,Margins,BorderRadius,BorderWidths } from '../../assets/colors';
import DropShadow from "react-native-drop-shadow";
import { data } from '../../utils/data';
const { width } = Dimensions.get('window');
const containerWidth = width * 0.4;
const ZoneOutstationScreen = ({ navigation }) => {
  const handlePress = (item) => {
    alert(`Button pressed: ${item.title}`);
  };
  return (
    <View style={styles.container}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <ScrollView>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <View style={[styles.textDividerContainer, { width: containerWidth }]}>
              <Text style={styles.headerText}>Select Your Zone</Text>
              <Divider width={2} color={Colors.primary} style={styles.divider} />
            </View>
            {data.map(item => (
              <DropShadow style={{
                shadowColor: '#171717',
                shadowOffset: { width: 2, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 3, elevation: 20,
              }}>
                <TouchableOpacity key={item.id} style={styles.item} onPress={() => navigation.navigate('outstationbooking')}>
                  <Text style={styles.text}>{item.title}</Text>
                  <Image source={require('../../assets/images/arrow-right-tatd.png')} style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
              </DropShadow>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default ZoneOutstationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flex: 1,
   ...Margins.m.m20,
    ...BorderWidths.bw.bw2,
    borderColor: Colors.primary,
...BorderRadius.br10,
    ...Margins.mv.mv50
  },
  headerContainer: {
    ...Paddings.p.p10,
    borderColor: Colors.primary,
    ...Margins.mv.mv40
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Paddings.p.p15,
    ...Margins.mv.mv8,
  ...BorderWidths.bw.bw1,
    borderColor: '#ccc',
   ...BorderRadius.br8,
    ...Margins.mh.mh20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  text: {
    fontSize: FontSizes.tinymedium,
    color: Colors.white,
    fontWeight: FontWeights.semiBold
  },
  textDividerContainer: {
    alignItems: 'center',
    ...Margins.mh.mh20,
    ...Margins.mb.mb10,
  },
  headerText: {
    fontSize: FontSizes.body,
    color: Colors.primary,
    textAlign: 'center',
    width: '100%',
    fontWeight: FontWeights.bold
  },
  divider: {
    ...Margins.mt.mt10,
    width: '100%',
  },
});
