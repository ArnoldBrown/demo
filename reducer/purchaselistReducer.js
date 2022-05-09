//import {boolean} from 'yup';
import {
    PURCHASE_LIST_REQ,
    PURCHASE_LIST_SUCCESS,
    PURCHASE_LIST_FAIL,
  } from '../action/Constant';
  
  
  function purchaselistReducer(state = {purchaseHistory: [ ] ,getName:"" ,loader:false}, action) {
    switch (action.type) {


      case PURCHASE_LIST_REQ:

        return {

            purchaseHistory:[],
            loader:true

        };

        case PURCHASE_LIST_SUCCESS:

       
        
            return {
    
                purchaseHistory:action.payload,
                getName:action.payload[0].customers_name,
                loader:false
    
            };

            case PURCHASE_LIST_FAIL:
                return {
        
                    purchaseHistory:[ ]
        
                };
    




  
      
      default:
        return state;
    }
  }
  
  export {purchaselistReducer};
  