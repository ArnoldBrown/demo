import {
  DELETEOPTION_FAIL,
  DELETEOPTION_REQUEST,
  DELETEOPTION_SUCCESS,
} from './Constant';
import {API_Links} from '../Screens/Api/Api';
import uuid from 'react-native-uuid';
import {global} from '../styles/global'
import  AuthId  from '../Screens/AuthId.style'





export const deleteOptionaction =

  (products_id, products_attributes_id ,route ,shopname) => async dispatch => {

    dispatch({type: DELETEOPTION_REQUEST});

    try {
      var data = new FormData();

      data.append('products_id', products_id);

      data.append('products_attributes_id', products_attributes_id);

      fetch( route==="deleteOption"  &&   shopname ===""  ?   API_Links.BASE_URL + API_Links.DELETE_OPTION_VALUE  :API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.DELETE_OPTION_VALUE || route!=="deleteOption" && shopname ==="" ?  API_Links.BASE_URL + API_Links.DELETE_ADDITIONAL_OPTIONS :  API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.DELETE_ADDITIONAL_OPTIONS , {

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

          dispatch({type: DELETEOPTION_SUCCESS, payload: data.message});



        });
    } catch (error) {
      dispatch({type: DELETEOPTION_FAIL, payload: error});
    }
  };
