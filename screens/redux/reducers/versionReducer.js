import {
    VERSION_CHECK_REQUEST,
    VERSION_CHECK_SUCCESS,
    VERSION_CHECK_FAILURE,
    RESENT_OTP_REQUEST,
    RESENT_OTP_SUCCESS,
    RESENT_OTP_FAIL,
  } from '../actions/versionAction';
  
  const initialState = {
    loading: false,
    latestVersion: null,
    error: null,
    otpData: null,
  };
  
  const versionReducer = (state = initialState, action) => {
    switch (action.type) {
      case VERSION_CHECK_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case VERSION_CHECK_SUCCESS:
        return {
          ...state,
          loading: false,
          latestVersion: action.payload,
        };
      case VERSION_CHECK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case RESENT_OTP_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case RESENT_OTP_SUCCESS:
        return {
          ...state,
          loading: false,
          otpData: action.payload,
        };
      case RESENT_OTP_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default versionReducer;
  