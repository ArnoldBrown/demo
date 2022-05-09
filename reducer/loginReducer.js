//import {boolean} from 'yup';
import {
  LOGIN_RESPONSE,
  LOGIN_REQ,
  LOG_OUT,
  LOG_IN_FAIL,
  SHOP_NAME_EMPTY,
  SHOP_NAME_SUCCESS,
} from '../action/Constant';

function loginReducer(
  state = {status: null, casherId: ' ', loginData: {}},
  action,
) {
  switch (action.type) {
    case LOGIN_RESPONSE:
      return {
        // loader:false,
        status: action.payload.status,
        casherId: action.payload.id,
        loginData: action.payload,
      };

    case LOG_OUT:
      return {status: null, groceryName: ''};

    default:
      return state;
  }
}

export {loginReducer};
