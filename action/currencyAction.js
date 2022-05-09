import {
    CURRENCY_REQ,
    CURRENCY_SUCCESS,
    CURRENCY_FAIL,
    SELECT_CURRENCY,
  } from './Constant';
  import uuid from 'react-native-uuid';
  import {API_Links} from '../Screens/Api/Api';
  import {global} from '../styles/global'
  import  AuthId  from '../Screens/AuthId.style'




  
  export const currencyAction = (shopname) => async dispatch => {
    
    dispatch({type: CURRENCY_REQ});
  
    fetch( shopname === "" ?    API_Links.BASE_URL + API_Links.CURRENCY :API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.CURRENCY , {
      method: 'GET',
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

        //console.log(data.data)
        
         

        dispatch({type: CURRENCY_SUCCESS, payload: data.data});
      })
      .catch(e => console.log(e));
  };
  
  export const selectcurrencyAction = (item)=> async dispatch => {
    try {
      dispatch(
          
          {type: SELECT_CURRENCY, payload:item }
          
          
          
          
          
          );
    } catch {
      console.log('error');
    }
  };
  