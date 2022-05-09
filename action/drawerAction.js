import {DR_VIEW_REQUEST, DR_VIEW_FAIL, DR_VIEW_SUCCESS,
    DR_OPEN__REQUEST,
    DR_OPEN_SUCCESS,
    DR_OPEN_FAIL


} from './Constant';
import {API_Links} from '../Screens/Api/Api';
import uuid from 'react-native-uuid';


import  AuthId  from '../Screens/AuthId.style'


export const drawerViewaction = (id ,shopName )=> async dispatch => {
  dispatch({type: DR_VIEW_REQUEST});

  try {
    var data = new FormData();


    data.append('cashier_id', id);


    fetch(shopName==='' ?  API_Links.BASE_URL + API_Links.VIEW_DRAWER  : API_Links.SHOP_URL+ shopName +"/"+"api"+"/"+ API_Links.VIEW_DRAWER , {


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
      

if(data.success==="0"){

  dispatch({type: DR_VIEW_FAIL, payload:data.success});

}
else {

 dispatch({type: DR_VIEW_SUCCESS, payload:data.data});

}






      });
  } catch (error) {
    console.log("heeeeee",error)
  }
};








export const draweOpenaction = (id, amount ,shopName) => async dispatch => {

  console.log("cashid",id)

    dispatch({type: DR_OPEN__REQUEST});
  
    try {
      var data = new FormData();
  
      data.append('cashier_id', id);
      data.append('amount', amount);
  
      fetch(    shopName===''?  API_Links.BASE_URL + API_Links.OPEN_DRAWER : API_Links.SHOP_URL+ shopName +"/"+"api"+"/"+API_Links.OPEN_DRAWER     , {

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
console.log("drawer11111")


            

          dispatch({type: DR_OPEN_SUCCESS, payload: data.success});




        });
    } catch (error) {
      dispatch({type: DR_OPEN_FAIL, payload: error});
    }
  };