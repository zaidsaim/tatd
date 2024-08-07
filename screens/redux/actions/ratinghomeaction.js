import {
  RATING_HOME_REQUEST,
  RATING_HOME_SUCCESS,
  RATING_HOME_FAIL,
} from '../constants/ratinghomeconstant';
import { ratingHomeApi } from '../../../api/services/apiService';

export const fetchRating = () => async (dispatch) => {
  try {
    dispatch({ type: RATING_HOME_REQUEST });
    const ratingData = await ratingHomeApi();
    console.log('res==========', ratingData);

    dispatch({ type: RATING_HOME_SUCCESS, payload: ratingData });
  } catch (err) {
    console.error('Error fetching rating data:', err);
    dispatch({ type: RATING_HOME_FAIL, payload: err.message });
  }
};

