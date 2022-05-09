import {SETTING_REQ, SETTING_FAIL, SETTING_SUCCESS} from './Constant';
import {Alert} from 'react-native';
import uuid from 'react-native-uuid';
import {API_Links} from '../Screens/Api/Api';
import Toast from 'react-native-simple-toast';
import {global} from '../styles/global'
import  AuthId  from '../Screens/AuthId.style'


const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();

export const settingsAction = (groceryName) => async dispatch => {
 
  
  dispatch({type: SETTING_REQ});

  fetch( groceryName=== ''||groceryName===undefined  ?   API_Links.BASE_URL + API_Links.SITE_SETTINGS : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.SITE_SETTINGS, {
    method: 'GET',
    headers: {
      'consumer-key': API_Links.CONSUMER_KEY,
      'consumer-secret':API_Links.SECRET_KEY,
      'consumer-nonce':
        AuthId._currDate.getMilliseconds().toString() +
        AuthId._currDate.getTime().toString() +
          '-' +
          Math.floor(Math.random() * 999) +
          1,
      'consumer-device-id':AuthId._currDeviceId,
     'consumer-ip': AuthId._currIp ,
      'Content-Type': 'multipart/form-data',
    },
    // body: data,
  })
    .then(res => res.json())

    .then(data => {
     
     
      if (data.success === '1') {
        dispatch({type: SETTING_SUCCESS, payload: data.data});
      }
    })
    .catch(e => console.log(e));
};
