import {GUEST_USER_REQ, GUEST_USER_SUCCESS, GUEST_USER_FAIL} from './Constant';
import {API_Links} from '../Screens/Api/Api';

import AuthId from '../Screens/AuthId.style';

export const guestAction = shopName => async dispatch => {
  dispatch({type: GUEST_USER_REQ});

  fetch(
    shopName === ''
      ? API_Links.BASE_URL + API_Links.ADD_GUEST
      : API_Links.SHOP_URL + shopName + '/' + 'api' + '/' + API_Links.ADD_GUEST,
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
        'consumer-device-id': AuthId._currDeviceId,
        'consumer-ip': AuthId._currIp,
        'Content-Type': 'multipart/form-data',
      },
    
    },
  )
    .then(response => response.json())

    .then(data => {
        
      
      dispatch({type: GUEST_USER_SUCCESS, payload: data.data});
    })
    .catch(e => console.log(e));
};

