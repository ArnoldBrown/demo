//import {boolean} from 'yup';
import {
  CUSTOMER_EDIT_REQ,
  CUSTOMER_EDIT_SUCCES,
  CUSTOMER_EDIT_FAIL,
} from '../action/Constant';

import { Alert} from 'react-native'

function edituserReducer(state = {loader: false}, action) {

  switch (action.type) {
    case CUSTOMER_EDIT_REQ:
      return {
        loader: true,
      };

    case CUSTOMER_EDIT_SUCCES:

        Alert.alert(
            action.payload,
            "",
            [
             
              { text: "OK", }
            ]
          );
      



      return {
        loader: false,
        
      };
    case CUSTOMER_EDIT_FAIL:

      return {
        loader: false,
      };

    default:
      return state;
  }
}

export {edituserReducer};
