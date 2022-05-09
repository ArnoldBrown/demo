import {
  LANGUAGE_REQ,
  LANGUAGE_SUCCESS,
  LANGUAGE_FAIL,
  SELECT_LANGUAGE,
} from './Constant';
import uuid from 'react-native-uuid';
import {API_Links} from '../Screens/Api/Api';
import {global} from '../styles/global'

import  AuthId  from '../Screens/AuthId.style'





export const languageAction = (shopname) => async dispatch => {
  dispatch({type: LANGUAGE_REQ});

  fetch( shopname === "" ?    API_Links.BASE_URL + API_Links.LANGUAGE  :API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.LANGUAGE  , {
    method: 'POST',
    headers: {
      'consumer-key': API_Links.CONSUMER_KEY,
      'consumer-secret': API_Links.SECRET_KEY,
      'consumer-nonce':
        AuthId._currDate.getMilliseconds().toString() +
        AuthId._currDate.getTime().toString() +
          '-' +
          Math.floor(Math.random() * 999) +
          1,
      'consumer-device-id':AuthId._currDeviceId,
     'consumer-ip':AuthId._currIp ,
      'Content-Type': 'multipart/form-data',
    },
    //body: data,
  })
    .then(res => res.json())

    .then(data => {
      dispatch({type: LANGUAGE_SUCCESS, payload: data.data});
    })
    .catch(e => console.log(e));
};

export const selectlanguageAction = (item ,)=> async dispatch => {
  try {
    dispatch(
        
        {type: SELECT_LANGUAGE, payload:item }
        
        
        
        
        
        );
  } catch {
    console.log('error');
  }
};
