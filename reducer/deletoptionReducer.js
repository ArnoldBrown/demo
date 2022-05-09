//import {boolean} from 'yup';
import {
  DELETEOPTION_SUCCESS,
  DELETEOPTION_REQUEST,
  DELETEOPTION_FAIL,
} from '../action/Constant';

import {Alert} from 'react-native';

function deleteOptionreducer(state = {loader: false, response: ''}, action) {
  switch (action.type) {
    case DELETEOPTION_REQUEST:
      return {
        loader: true,
      };

    case DELETEOPTION_SUCCESS:
      Alert.alert(action.payload, '', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

      return {
        loader: false,
      };
    case DELETEOPTION_FAIL:
      //console.log(action.payload,"hetuqyduwydqydoqyvino")

      return {
        loader: false,
      };

    default:
      return state;
  }
}

export {deleteOptionreducer};
