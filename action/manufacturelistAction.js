import {MANUFACTURE_LIST ,MANUFACTURE_LIST_REQ} from './Constant';
import {API_Links} from '../Screens/Api/Api'
import uuid from 'react-native-uuid';

import {global} from '../styles/global'

import  AuthId  from '../Screens/AuthId.style'



const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();



export const manufacturelistAction = ( language ,shopname ) => async  dispatch => {
 

  dispatch({type: MANUFACTURE_LIST_REQ });

  try {
    var data = new FormData();
 
    data.append('language_id', language);
    
    fetch(shopname === '' ? API_Links.BASE_URL + API_Links.VIEW_MANUFACTURE_LIST : API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.VIEW_MANUFACTURE_LIST, {
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
    })
       .then(response => response.json())

      .then(data => {


        

        dispatch({type: MANUFACTURE_LIST, payload: data.data });

     
        
      })
      .catch(e => console.log(e));


   

  } 
  
  catch (error) {
    console.log(error);

  }


};