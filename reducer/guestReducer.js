//import {boolean} from 'yup';
import {
    GUEST_USER_REQ, GUEST_USER_SUCCESS, GUEST_USER_FAIL
  } from '../action/Constant';



  
  function guestReducer(
    state = {guestData:[]},
    action,
  ) {
    switch (action.type) {
      case GUEST_USER_REQ:
        return {
          // loader:false,
          guestData: [ ],
      
        };
  
      case GUEST_USER_SUCCESS:
        return {guestData :action.payload};
  
      default:
        return state;
    }
  }
  
  export {guestReducer};
  