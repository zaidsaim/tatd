import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
};

export const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('Your Firebase Cloud Messaging token is:', fcmToken);
  } else {
    console.log('Failed to get FCM token');
  }
};

export const initializeFirebase = () => {
  requestUserPermission();
  const unsubscribe = messaging().onTokenRefresh((token) => {
    console.log('New FCM token:', token);
  });

  return unsubscribe;
};
