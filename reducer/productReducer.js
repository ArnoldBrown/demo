//import {boolean} from 'yup';
import {
  PRODUCTLIST_ACTION,
  PRODUCT_SEARCH_QUERY,
  PRODUCT_SEARCH_EMPTY,
} from '../action/Constant';

function productReducer(state = {productarray: [], status: null}, action) {
  switch (action.type) {
    case PRODUCTLIST_ACTION:
      return {
        productarray: action.payload,
      };

    case PRODUCT_SEARCH_QUERY:
   

      return {
        productarray: action.payload,

        // status: action.pay
      };
      case PRODUCT_SEARCH_EMPTY:
   ///console.log(action.payload)

        return {
          productarray: [ ],

          status:action.payload
  
          // status: action.pay
        };
  




    default:
      return state;
  }
}

export {productReducer};
