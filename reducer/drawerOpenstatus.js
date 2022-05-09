//import {boolean} from 'yup';
import {DR_OPEN__REQUEST, DR_OPEN_SUCCESS} from '../action/Constant';

function drawerOpenstatus(
  state = {openStatus: ''},

  action,
) {
  switch (action.type) {
    case DR_OPEN__REQUEST:
      return {
        openStatus: '',
      };

    case DR_OPEN_SUCCESS:
      return {
        openStatus: action.payload,
      };

    default:
      return state;
  }
}

export {drawerOpenstatus};
