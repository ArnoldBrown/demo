//import {boolean} from 'yup';
import {
  DR_VIEW_FAIL,
  DR_VIEW_REQUEST,
  DR_VIEW_SUCCESS,
} from '../action/Constant';

function drawerViewreducer(
  state = {drawerResponse: '', onload:false, drawerData:{ } },
  action,
) {
  switch (action.type) {
    case DR_VIEW_REQUEST:
      return {
        onload: true,
      };

    case DR_VIEW_FAIL:
      return {
        onload: false,
        drawerResponse: action.payload,
      };

    case DR_VIEW_SUCCESS:
      return {
          
        onload: false,

        drawerData: action.payload,

      };

    default:
      return state;
  }
}

export {drawerViewreducer};
