import { versionCheckApi } from "../../../api/services/apiService";


export const checkVersion = (app_type, user_type) => async (dispatch) => {
    try {
      dispatch({ type: VERSION_CHECK_REQUEST });
  
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
  
      if (!token) {
        throw new Error("No token found");
      }
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
  
      const response = await versionCheckApi(app_type, user_type, config);
      const serverVersion = response.app_details[0].version;
  
      dispatch({ type: VERSION_CHECK_SUCCESS, payload: serverVersion });
    } catch (error) {
      dispatch({ type: VERSION_CHECK_FAILURE, payload: error.message });
    }
  };
