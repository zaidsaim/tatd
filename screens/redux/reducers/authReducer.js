// import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants/authConstant';

// const initialState = {
//   loading: false,
//   error: null,
//   user: null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       return { ...state, loading: true, error: null };
//     case LOGIN_SUCCESS:
     
//       return { ...state, loading: false, user: action.payload };
//       console.log('statecheck=======',state)
//     case LOGIN_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export default authReducer;
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants/authConstant';

const initialState = {
  loading: false,
  error: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
      
    case LOGIN_SUCCESS:
      console.log('state before LOGIN_SUCCESS:', state);
      console.log('action payload:', action.payload);
      return { ...state, loading: false, user: action.payload };

    case LOGIN_FAIL:
      console.log('state before LOGIN_FAIL:', state);
      console.log('action payload:', action.payload);
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
