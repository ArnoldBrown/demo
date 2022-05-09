//import {boolean} from 'yup';

import {SHOP_NAME_EMPTY, SHOP_NAME_SUCCESS ,SHOP_NAME_CLEAR} from '../action/Constant';

function shopnameReducer(state = {groceryName: ''}, action) {
  switch (action.type) {
    case SHOP_NAME_SUCCESS:
      return {
        groceryName: action.payload,
      };


      case SHOP_NAME_CLEAR:
        return {
          groceryName: '',
        };
  


    default:
      return state;
  }
}

export {shopnameReducer};
