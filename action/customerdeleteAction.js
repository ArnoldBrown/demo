import {
    CUSTOMER_DELETE_REQ,
    CUSTOMER_DELETE_SUCCES,
    CUSTOMER_DELETE_FAIL,
  } from './Constant';
  import {API_Links} from '../Screens/Api/Api';
  import uuid from 'react-native-uuid';

  import {Alert } from 'react-native'
import {global} from '../styles/global'
import  AuthId  from '../Screens/AuthId.style'


 
  
  export const customerdeleteAction =
  
    (id ,navigation ,shopname) => async dispatch => {
    
  
      dispatch({type: CUSTOMER_DELETE_REQ});
  
      try {
        var data = new FormData();
  
        data.append('customers_id', id);

        fetch( shopname === "" ? API_Links.BASE_URL + API_Links.DELETE_CUSTOMER : API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.DELETE_CUSTOMER, {
  
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

            Alert.alert(data.message, '', [
              {text: 'OK', onPress: () => global.Dimensionwidth < 468 ? navigation.goBack() : null},
            ]);



            dispatch({type: CUSTOMER_DELETE_SUCCES, payload: data.message});
  
  
  
          });
      } catch (error) {
        dispatch({type: CUSTOMER_DELETE_FAIL, payload: error});
      }
    };
  