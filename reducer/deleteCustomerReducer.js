//import {boolean} from 'yup';
import {
    CUSTOMER_DELETE_REQ,
    CUSTOMER_DELETE_SUCCES,
    CUSTOMER_DELETE_FAIL,
  } from '../action/Constant';
  
  import {Alert} from 'react-native';
  
  function deleteCustomerReducer(state = {loader: false, response: ''}, action) {
    switch (action.type) {
      case CUSTOMER_DELETE_REQ:
        return {
          loader: true,
        };
  
      case CUSTOMER_DELETE_SUCCES:
     
  
        return {
          loader: false,
        };
      case CUSTOMER_DELETE_FAIL:
        //console.log(action.payload,"hetuqyduwydqydoqyvino")
  
        return {
          loader: false,
        };
  
      default:
        return state;
    }
  }
  
  export {deleteCustomerReducer};
  