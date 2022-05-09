import {CANCEL_BILL_REQ ,CANCEL_BILL_FAIL ,CANCEL_BILL_SUCCESS} from './Constant';
import {API_Links} from '../Screens/Api/Api'
import uuid from 'react-native-uuid';
import {Platform ,Alert ,Dimensions} from 'react-native'
import {global} from '../styles/global';
import  AuthId  from '../Screens/AuthId.style'








export const cancelBillaction = (id ,orderId ,navigation ,shopName) => async  dispatch => {

    dispatch({type: CANCEL_BILL_REQ, });

  try {

    var data = new FormData();

    data.append('cashier_id', id);
    data.append('order_id', orderId);

    fetch(shopName === '' ?  API_Links.BASE_URL + API_Links.CANCEL_BILL : API_Links.SHOP_URL+ shopName +"/"+"api"+"/"+API_Links.CANCEL_BILL, {
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
    //  body: data,
    })
       .then(response => response.json())

       .then(data => {
         console.log("fir55555")

        Alert.alert(
            data.message,
            "",
            [
              
              { text: "OK", onPress: () =>global.Dimensionwidth < 468 ? navigation.goBack():null }
            ]
          );
      


         
        dispatch({type: CANCEL_BILL_SUCCESS, payload:data });




      })
   
  } 
  
  catch (error) {
    dispatch({type: CANCEL_BILL_FAIL, payload:e })

  }


};








// export const galleryuploadData = (images) => async  dispatch => {
 

//     try {
//         var random = ('' + Math.random()).substring(2, 8);

//         var data = new FormData();
 
//            images.forEach((item, i) => {
//             data.append('file[]', {
//               uri:
//                 Platform.OS === 'android'
//                   ? item.path
//                   : item.path.replace('file://', ''),
//               type: 'image/jpeg',
//               name: `POS_${random}.jpg`,
//             });
//           });
       
   
//       fetch(API_Links.BASE_URL + API_Links.ADD_GALLERY, {
//         method: 'POST',
    
//         headers: {
//           'consumer-key': API_Links.CONSUMER_KEY,
//           'consumer-secret': API_Links.SECRET_KEY,
//           'consumer-nonce':
//           date.getMilliseconds().toString() +
//           date.getTime().toString() +
//             '-' +
//             Math.floor(Math.random() * 999) +
//             1,
//           'consumer-device-id':AuthId._currDeviceId,
//          'consumer-ip':AuthId._currIp ,
//           'Content-Type': 'multipart/form-data',
//         },
//         body: data,
//       //  body: data,
//       })



//          .then(response => response.json())
  
//         .then(data => {

       
          
//         })
//         .catch(e => console.log("erroyoir"+e));
  
  
     
  
//     } 
    
//     catch (error) {
//       console.log(error);
  
//     }
  
  
//   };
  



