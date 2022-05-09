//import {boolean} from 'yup';
import {GET_SESSION_TOKEN, GET_SESSION_CLEAR} from '../action/Constant';

function sessionReducer(state = {sessionResponse: ''}, action) {
  switch (action.type) {
    case GET_SESSION_TOKEN:
      return {
        sessionResponse: action.payload,
      };

    case GET_SESSION_CLEAR:
      return {
        sessionResponse: '',
      };

    default:
      return state;
  }
}

export {sessionReducer};
