import {POS_ADMIN_FAIL ,POS_ADMIN_REQ,POS_ADMIN_SUCCESS} from './Constant';
import { Alert } from "react-native";
import {API_Links} from '../Screens/Api/Api'

import uuid from 'react-native-uuid';

import {global} from '../styles/global'
import  AuthId  from '../Screens/AuthId.style'







export const manageAction = (id ,shopname ) => async dispatch => {
 //console.log("idiofhoewihfiowef",id)
  
    dispatch({type:POS_ADMIN_REQ});

    var data = new FormData()
    data.append('cashier_id', id);


    fetch( shopname === "" ? API_Links.BASE_URL+API_Links.POS_ADMIN_ROLE :  API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.POS_ADMIN_ROLE,
    {
        method: 'POST', 
        headers:{
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
        body: data
    })
    .then((response) => response.json())
  
    .then((data)=>{

      //console.log("whywcwviniodd",data)

       dispatch({type:POS_ADMIN_SUCCESS ,payload:data.data });
      
    

    })
    .catch((e)=>console.log("wdwdwd5555",e))
  

  



};




export const Ltout = () => async (dispatch) => {
  try {
    dispatch({type: LOG_OUT});
  } catch (error) {
    console.log(error);
  }
};