import {
    RATING_HOME_REQUEST,
    RATING_HOME_SUCCESS,
    RATING_HOME_FAIL,
  } from '../actions/ratinghomeaction';
 
  const initialState = {
    loading: false,
    ratingData: null,
    error: null,
  };
  
  export const ratingHomeReducer = (state = initialState, action) => {
    switch (action.type) {
      case RATING_HOME_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case RATING_HOME_SUCCESS:
        console.log('RATING_HOME_SUCCESS payload:', action.payload);
        console.log('RATING_HOME_SUCCESS payload===========:', ratingData);
        return {
          ...state,
          loading: false,
          ratingData: action.payload,
          
        };
      case  RATING_HOME_FAIL:
        console.log('RATING_HOME_FAIL error:', action.payload); 
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default ratingHomeReducer;
  