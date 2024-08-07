import React, { useEffect } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import api from './api'; // Your Axios configuration

const sendPlatformInfo = async () => {
  const devicePlatform = Platform.OS; // 'ios' or 'android'

  try {
    const response = await api.post('/platform-info', {
      platform: devicePlatform,
    });
    console.log('Platform info sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending platform info:', error);
  }
};

const App = () => {
  useEffect(() => {
    sendPlatformInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to the App!</Text>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

export default App;


import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';

const UpdatePopup = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [latestVersion, setLatestVersion] = useState(null);

  useEffect(() => {
    // Function to check the app version
    const checkForUpdate = async () => {
      try {
        const currentVersion = DeviceInfo.getVersion();
        const response = await axios.get('https://your-api-endpoint.com/check-version');
        const serverVersion = response.data.version;

        if (serverVersion !== currentVersion) {
          setLatestVersion(serverVersion);
          setModalVisible(true);
        }
      } catch (error) {
        console.error("Failed to check for update", error);
      }
    };

    checkForUpdate();
  }, []);

  const handleUpdate = () => {
    // Logic to update the app, e.g., redirect to the app store
    setModalVisible(false);
    // Add your update logic here
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Update Available</Text>
          <Text style={styles.message}>
            A new version ({latestVersion}) of the app is available. Please update to the latest version.
          </Text>
          <Button title="Update Now" onPress={handleUpdate} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const DeviceInfoComponent = () => {
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    const getDeviceInfo = async () => {
      const info = {
        uniqueId: DeviceInfo.getUniqueId(),
        manufacturer: await DeviceInfo.getManufacturer(),
        model: DeviceInfo.getModel(),
        deviceName: await DeviceInfo.getDeviceName(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        appVersion: DeviceInfo.getVersion(),
        buildNumber: DeviceInfo.getBuildNumber(),
        isTablet: DeviceInfo.isTablet(),
      };
      setDeviceInfo(info);
      sendDeviceInfo(info);
    };

    getDeviceInfo();
  }, []);

  const sendDeviceInfo = async (info) => {
    try {
      const response = await axios.post('https://your-api-endpoint.com/device-info', info);
      console.log('Device info sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending device info:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Information</Text>
      <Text>Unique ID: {deviceInfo.uniqueId}</Text>
      <Text>Manufacturer: {deviceInfo.manufacturer}</Text>
      <Text>Model: {deviceInfo.model}</Text>
      <Text>Device Name: {deviceInfo.deviceName}</Text>
      <Text>System Name: {deviceInfo.systemName}</Text>
      <Text>System Version: {deviceInfo.systemVersion}</Text>
      <Text>App Version: {deviceInfo.appVersion}</Text>
      <Text>Build Number: {deviceInfo.buildNumber}</Text>
      <Text>Is Tablet: {deviceInfo.isTablet ? 'Yes' : 'No'}</Text>
    </View>
  );

};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });


// imei

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const IMEIComponent = () => {
  const [imei, setImei] = useState(null);

  useEffect(() => {
    const getIMEINumber = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
            {
              title: 'Permission to Access Phone State',
              message: 'We need your permission to access the phone state',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const imeiNumber = await DeviceInfo.getImei();
            setImei(imeiNumber);
          } else {
            console.log('Phone state permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    getIMEINumber();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IMEI Number</Text>
      {imei ? <Text>{imei}</Text> : <Text>Fetching IMEI...</Text>}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });


