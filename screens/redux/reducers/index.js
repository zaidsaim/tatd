
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ratingHomeReducer from './ratinghomereducer';
import versionReducer from './versionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  version: versionReducer,
  rating: ratingHomeReducer,
});

export default rootReducer;

































// useEffect(() => {
//   const getFAQData = async () => {
//     try {
//       const data = await fetchFAQ();
//       setFaqData(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   getFAQData();
// }, []);