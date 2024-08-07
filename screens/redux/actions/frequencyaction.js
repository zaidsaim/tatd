import { frequncyApi } from '../../../api/services/apiService';
import {
  FAQ_REQUEST,
  FAQ_SUCCESS,
  FAQ_FAILURE,
} from '../constants/frequncyconstant';

// export const getFAQ = () => async (dispatch) => {
//   try {
//     dispatch({ type: FAQ_REQUEST });
//     const data = await fetchFAQ();
//     dispatch({ type: FAQ_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: FAQ_FAILURE, payload: error.message });
//   }
// };


export const fetchFrequency= async () => {
    try {
      const response = await frequncyApi()
      console.log('response=========faq',response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
      throw error;
    }
  };