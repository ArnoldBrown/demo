import {CATEGORY_LIST_ACTION, ALL_CATEGORY ,SINGLE_CAT_ID ,CATEGORY_LIST_REQ  ,CATEGORY_LIST_ID} from './Constant';
import {Alert} from 'react-native';
import {API_Links} from '../Screens/Api/Api';
import uuid from 'react-native-uuid';
import {global} from '../styles/global'
import  AuthId  from '../Screens/AuthId.style'





export const categorylistAction = (language ,shopname) => async dispatch => {


  dispatch({type: CATEGORY_LIST_REQ});

 
    var data = new FormData();

    data.append('language_id', language);

    fetch(shopname==="" ?API_Links.BASE_URL + API_Links.VIEW_CATEGORY : API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.VIEW_CATEGORY, {
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

        console.log("CATEGORY_LIST_ACTION1");

        dispatch({type: CATEGORY_LIST_ACTION, payload: data.data});
      })

      .catch(e => console.log(e));
  
};


export const categorylistIdAction = (id) => async dispatch => {
console.log("fbqkjfqkbqkbfqk",id)

  dispatch({type: CATEGORY_LIST_ID ,payload:id});




};








export const viewAllcategoryAction =
  (language  ,shopname) => async dispatch => {

      var data = new FormData();
      data.append('language_id', language);
      fetch(  shopname === ""  ?   API_Links.BASE_URL + API_Links.VIEW_CATEGORY  : API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.VIEW_CATEGORY , {
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
         

          dispatch({type: ALL_CATEGORY, payload: data.data});
        })

        .catch(e => console.log(e ,"edewfwfewfw"));
   
  };

export const deleteCategory =
  (catId, date, DeviceId, DeviceIp ,shopname) => async dispatch => {
    
      var data = new FormData();
      data.append('categories_id', catId);
      fetch(shopname ==="" ? API_Links.BASE_URL + API_Links.DELETE_CATEGORY : API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.DELETE_CATEGORY , {
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
          


        })
        .catch(e => console.log(e));
    
  };








  