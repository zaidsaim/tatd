// cityUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';
export const getCityAndZone = (selectcitydata, selectedzone) => {
  let city, zone;

  switch (selectcitydata) {
    case 'Mumbai':
      city = 'Maharashtra';
      zone = selectcitydata;
      break;
    case 'Delhi/NCR':
      city = 'Delhi';
      zone = selectedzone;
      break;
    case 'Bangalore':
      city = 'Karnataka';
      zone = 'Bangalore';
      break;
    case 'Hyderabad':
      city = 'Telangana';
      zone = 'Hyderabad';
      break;
    case 'Pune':
      city = 'Maharashtra';
      zone = 'Pune';
      break;
    case 'Delhi':
    case 'Haryana':
    case 'Karnataka':
    case 'Maharashtra':
    case 'Telangana':
    case 'Uttar Pradesh':
      city = selectcitydata;
      zone = selectedzone;
      break;
    default:
      return null;
  }

  return {city, zone};
};

// navigationHandler.js

export const handleNavigation = (navigation, condition, item) => {
  switch (condition) {
    case 'A':
      navigation.navigate('booking', {selectedzone: item});
      break;
    case 'B':
      navigation.navigate('outstationbooking', {selectedzone: item});
      break;
    case 'C':
      navigation.navigate('monthlybooking', {selectedzone: item});
      break;
    case 'D':
      navigation.navigate('weeklybooking', {selectedzone: item});
      break;
    default:
      console.error('Unknown condition:', condition);
  }
};

export const handlePress = async (item, navcheck, navigation) => {
  try {
    await AsyncStorage.setItem('selectcityitem', item);

    if (
      navcheck === 'A' &&
      (item === 'Bangalore' || item === 'Pune' || item === 'Hyderabad')
    ) {
      navigation.navigate('booking', {selectedItem: item, navcheck: navcheck});
    } else if (
      navcheck === 'B' &&
      (item === 'Bangalore' || item === 'Pune' || item === 'Hyderabad')
    ) {
      navigation.navigate('outstationbooking', {
        selectedItem: item,
        navcheck: navcheck,
      });
    } else if (
      navcheck === 'C' &&
      (item === 'Bangalore' || item === 'Pune' || item === 'Hyderabad')
    ) {
      navigation.navigate('monthlybooking', {
        selectedItem: item,
        navcheck: navcheck,
      });
    } else if (
      navcheck === 'D' &&
      (item === 'Bangalore' || item === 'Pune' || item === 'Hyderabad')
    ) {
      navigation.navigate('weeklybooking', {
        selectedItem: item,
        navcheck: navcheck,
      });
    } else {
      navigation.navigate('hourlyzone', {
        selectedItem: item,
        navcheck: navcheck,
      });
    }
  } catch (error) {
    console.error('Error storing selected item:', error);
  }
};
