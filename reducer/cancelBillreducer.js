//import {boolean} from 'yup';
import  {CANCEL_BILL_REQ ,CANCEL_BILL_FAIL ,CANCEL_BILL_SUCCESS} from '../action/Constant';

function cancelBillreducer(

  state = {loader: false },
  action,
) {
  switch (action.type) {




    case CANCEL_BILL_REQ:

    return {
        loader: true,
       
      };



    case CANCEL_BILL_SUCCESS:

    return {
        loader: false,

       
      };

      case CANCEL_BILL_FAIL:

        return {
            loader: false,
    
           
          };





    default:
      return state; 
  }
}






export {cancelBillreducer};
