import {
    OPTION_LIST_REQ,
    OPTION_LIST_SUCCESS,
    OPTION_LIST_FAIL,
  } from './Constant';
  import {API_Links} from '../Screens/Api/Api';
  import uuid from 'react-native-uuid';
  import {global} from '../styles/global'
  import  AuthId  from '../Screens/AuthId.style'




  
  
  export const optionlistAction =
  
    () => async dispatch => {
  
      dispatch({type: OPTION_LIST_REQ});
  
      try {
      
      
        fetch(API_Links.BASE_URL + API_Links.GET_OPT_NAME, {
  
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
        
        })
          .then(response => response.json())
  
          .then(data => {
  
          
            dispatch({type: OPTION_LIST_SUCCESS, payload: data.data});
  
  






            
  
          });
      } catch (error) {
        dispatch({type: OPTION_LIST_FAIL, payload: error});
      }
    };
  