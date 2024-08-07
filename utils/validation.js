
import AsyncStorage from '@react-native-async-storage/async-storage';
export const validateAccessToken = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const token = parsedUserData ? parsedUserData.jwt : null;
    if (!token) {
      throw new Error('Access token not found');
    }
    const response = await fetch('https://www.tatd.in/app-api/customer/validate-jwt.php?check_authentication=1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
      const data = await response.json();
      if (data.valid) { 
        return true;
      } else {
        return false;
      }
    
  } catch (error) {
    console.error('Error validating access token:', error);
    return false;
  }
};


export const refreshAccessToken = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const refreshToken = parsedUserData ? parsedUserData.refresh_token : null;
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    const response = await fetch('https://www.tatd.in/app-api/customer/login/refresh_token.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });
      const data = await response.json();
      const updatedUserData = {
        ...parsedUserData,
        jwt: data.jwt,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      return true;
   
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return false;
  }
};
