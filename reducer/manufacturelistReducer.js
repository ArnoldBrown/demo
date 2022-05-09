//import {boolean} from 'yup';
import {MANUFACTURE_LIST ,MANUFACTURE_LIST_REQ} from '../action/Constant';

function manufacturelistReducer(
  state = {manufactureListarray: []  },
  action,
) {
  switch (action.type) {


    case MANUFACTURE_LIST_REQ:
      // console.log(action.payload)
    

      return {
        manufactureListarray:[ ]
       // setcatId: getcatId,
      };

    case MANUFACTURE_LIST:
      // console.log(action.payload)
    

      return {
        manufactureListarray: action.payload,
       // setcatId: getcatId,
      };

    default:
      return state;
  }
}




export {manufacturelistReducer};
