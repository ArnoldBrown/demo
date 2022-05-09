import {GET_SESSION_TOKEN, GET_SESSION_CLEAR} from './Constant';



export const sessionAction = session => async dispatch => {

  try {
    dispatch({type: GET_SESSION_TOKEN, payload: session});
  } catch (error) {
    console.log(error);
  }
};

export const sessionClearaction = key => async dispatch => {
  try {
    dispatch({type: GET_SESSION_CLEAR});
  } catch (error) {
    console.log(error);
  }
};
