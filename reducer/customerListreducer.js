//import {boolean} from 'yup';
import {
  CUSTOMER_LIST_REQ,
  CUSTOMER_LIST_SUCCES,
  CUSTOMER_LIST_FAIL,
} from '../action/Constant';

function customerListreducer(
  state = {loader: false, customerAarray: []},
  action,
) {
  switch (action.type) {
    case CUSTOMER_LIST_REQ:
      return {
        loader: true,
        customerAarray: [],
      };

    case CUSTOMER_LIST_SUCCES:
      return {
        loader: false,
        customerAarray: action.payload,
      };

    case CUSTOMER_LIST_FAIL:
      return {
        loader: false,
        customerAarray: [],
      };

    default:
      return state;
  }
}

export {customerListreducer};
