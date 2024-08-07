import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import { Divider, Image } from '@rneui/base';
import { Colors, FontSizes } from '../../assets/colors';
import DropShadow from "react-native-drop-shadow";
import { data } from '../../utils/data';
const { width } = Dimensions.get('window');
const containerWidth = width * 0.4;
const MonthlyZoneScreen = ({ navigation }) => {
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
                <TouchableOpacity key={item.id} style={styles.item} onPress={() => navigation.navigate('monthlybooking')}>
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
export default MonthlyZoneScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flex: 1,
    margin: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
    marginVertical: 50
  },
  headerContainer: {
    padding: 10,
    borderColor: Colors.primary,
    marginVertical: 40
  },
  headerText: {
    color: Colors.primary,
    marginBottom: 10,
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  text: {
    fontSize: FontSizes.tinymedium,
    color: Colors.white,
    fontWeight: '600'
  },
  textDividerContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10
  },
  headerText: {
    fontSize: FontSizes.body,
    color: Colors.primary,
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold'
  },
  divider: {
    marginTop: 10,
    width: '100%',
  },
});
