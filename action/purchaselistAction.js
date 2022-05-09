import {
    PURCHASE_LIST_REQ,
    PURCHASE_LIST_SUCCESS,
    PURCHASE_LIST_FAIL,
  } from './Constant';
  import {Alert} from 'react-native';
  import {API_Links} from '../Screens/Api/Api';
  import Toast from 'react-native-simple-toast';
  import {global} from '../styles/global'
  import  AuthId  from '../Screens/AuthId.style'

  import uuid from 'react-native-uuid';
  
  const date = new Date();
  const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
  const DeviceId = uuid.v4();
  
  
  
  
  export const purchaselistAction =
    (
      id,
      language,
      currency_code,shopname
  
      
  
    ) =>
  

  
    async dispatch => {
  
        dispatch({type: PURCHASE_LIST_REQ});

console.log("groceryName",shopname)

   
        var data = new FormData();

    data.append('customers_id',id);
    data.append('language_id', language);
    data.append('currency_code', currency_code);

        fetch(shopname === "" ? API_Links.BASE_URL + API_Links.GET_ORDERS :API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.GET_ORDERS , {
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
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        })
          .then(response => response.json())
  
          .then(data => {
         
              dispatch({type: PURCHASE_LIST_SUCCESS, payload: data.data});
  
               
  
           
          })
          .catch(e => console.log("mi",e));
    
    };
  
 