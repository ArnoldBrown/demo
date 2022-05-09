import {TAX_LIST ,TAX_LIST_REQ} from './Constant';
import {API_Links} from '../Screens/Api/Api'
import  AuthId  from '../Screens/AuthId.style'






export const taxlistAction = (shopname) => async  dispatch => {


  dispatch({type: TAX_LIST_REQ});

 
  try {
    var data = new FormData();
 
    data.append('language_id', 1);

    fetch(shopname === "" ? API_Links.BASE_URL + API_Links.VIEW_TAX_LIST : API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.VIEW_TAX_LIST, {
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

       


        dispatch({type: TAX_LIST, payload: data.data });

     
        
      })
      .catch(e => console.log(e));


   

  } 
  
  catch (error) {
    console.log(error);

  }


};