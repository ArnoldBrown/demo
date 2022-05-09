import {
  CUSTOMER_LIST_REQ,
  CUSTOMER_LIST_SUCCES,
  CUSTOMER_LIST_FAIL,
} from './Constant';
import {API_Links} from '../Screens/Api/Api';
import uuid from 'react-native-uuid';
import {Platform, Alert, Dimensions} from 'react-native';
import {global} from '../styles/global';
import  AuthId  from '../Screens/AuthId.style'


export const customerListaction = (shopname) => async dispatch => {
  dispatch({type: CUSTOMER_LIST_REQ});


    fetch( shopname === "" ?   API_Links.BASE_URL + API_Links.CUSTOMER_LIST  :API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.CUSTOMER_LIST,{
      method: 'POST',
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
       'consumer-ip':AuthId._currIp ,
        'Content-Type':'multipart/form-data',
      },
    })
      .then(response => response.json())

      .then(data => {
        dispatch({type: CUSTOMER_LIST_SUCCES, payload: data.data});
      })
      .catch((e)=>{
          console.log(e)
      })
      
  
};

