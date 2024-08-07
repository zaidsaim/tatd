import {
    FAQ_REQUEST,
    FAQ_SUCCESS,
    FAQ_FAILURE,
  } from '../constants/frequncyconstant';
  
  const initialState = {
    loading: false,
    faqData: null,
    error: null,
  };
  
  const faqReducer = (state = initialState, action) => {
    switch (action.type) {
      case FAQ_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FAQ_SUCCESS:
        return {
          ...state,
          loading: false,
          faqData: action.payload,
        };
      case FAQ_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default faqReducer;
  