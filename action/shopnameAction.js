import {SHOP_NAME_EMPTY, SHOP_NAME_SUCCESS ,SHOP_NAME_CLEAR} from './Constant';

export const shopnameAction = name => async dispatch => {
  try {
    dispatch({type: SHOP_NAME_SUCCESS, payload: name});
  } catch (error) {
    console.log(error);
  }
};


export const shopnameClear = () => async dispatch => {
  try {
    dispatch({type: SHOP_NAME_CLEAR});

  } catch (error) {
    
    console.log(error);
  }
};
