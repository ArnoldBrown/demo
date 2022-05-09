//import {boolean} from 'yup';
import {TAX_LIST ,TAX_LIST_REQ} from '../action/Constant';

function taxlistReducer(
    
  state = {taxListarray: []  },
  action,
) {
  switch (action.type) {


    case TAX_LIST_REQ:
      // console.log(action.payload)
    

      return {
        taxListarray: [ ],
       // setcatId: getcatId,
      };

    case TAX_LIST:
      // console.log(action.payload)
    

      return {
        taxListarray: action.payload,
       // setcatId: getcatId,
      };

    default:
      return state;
  }
}




export {taxlistReducer};
