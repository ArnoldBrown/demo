import {
  
  LOGIN_REQ, LOGIN_RESPONSE, LOG_OUT, LOG_IN_FAIL ,

  SHOP_NAME_EMPTY, SHOP_NAME_SUCCESS

} from './Constant';
import {Alert} from 'react-native';
import {API_Links} from '../Screens/Api/Api';
import {global} from '../styles/global'


import  AuthId  from '../Screens/AuthId.style'










export const loginAction =
  (email, pass, date, deviceIp, deviceId, shopName) => async dispatch => {
    dispatch({type: LOGIN_REQ});

    var data = new FormData();

    data.append('email', email);
    data.append('password', pass);

    fetch(
      shopName === ''
        ? API_Links.BASE_URL + API_Links.LOGIN_URL
        : API_Links.SHOP_URL +
            shopName +
            '/' +
            'api' +
            '/' +
            API_Links.LOGIN_URL,
      {
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
        body: data,
      },
    )
      .then(response => response.json())

      .then(data => {
        console.log(data);

        if (data.success === '0') {
          Alert.alert(data.message, '', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else {
          dispatch({type: LOGIN_RESPONSE, payload: data.data});
        }
      })
      .catch(e => {
        Alert.alert('Invalid Shop Name', '', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        dispatch({type: LOG_IN_FAIL, payload: e});
      });
  };

export const Ltout = () => async dispatch => {
  try {
    dispatch({type: LOG_OUT});

  } catch (error) {
    console.log(error);
  }
};









