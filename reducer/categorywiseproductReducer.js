//import {boolean} from 'yup';
import {
    CATEGORY_WISE_PR_REQ,
    CATEGORY_WISE_PR_SUCCESS,
    CATEGORY_WISE_PR_FAIL,
  } from '../action/Constant';
  
  import {Alert} from 'react-native';
  
  function categorywiseproductReducer(state = {productArraylist: [ ],loader: false}, action) {
    switch (action.type) {
      case CATEGORY_WISE_PR_REQ:
        return {

          productArraylist:[ ],
          loader: true,
        };
  
      case CATEGORY_WISE_PR_SUCCESS:
      
  
        return {
          productArraylist: action.payload,

          loader: false,



        };
      case CATEGORY_WISE_PR_FAIL:
        //console.log(action.payload,"hetuqyduwydqydoqyvino")
  
        return {
          productArraylist:[ ],

          loader: false,
        };
  
      default:
        return state;
    }
  }
  
  export {categorywiseproductReducer};
  