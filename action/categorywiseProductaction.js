import {
  CATEGORY_WISE_PR_REQ,
  CATEGORY_WISE_PR_SUCCESS,
  CATEGORY_WISE_PR_FAIL,


  SINGLE_PR_DELETE_REQ,
   SINGLE_PR_DELETE_SUCCESS,
   SINGLE_PR_DELETE_FAIL



  } from './Constant';
  import {API_Links} from '../Screens/Api/Api';
  import uuid from 'react-native-uuid';
import { Alert ,Platform ,Dimensions} from 'react-native'
import {global} from '../styles/global'
import  AuthId  from '../Screens/AuthId.style'




  
  export const categorywiseProductaction =

  
    (languageId, id  ,currencyCode ,shopname) => async dispatch => {

      // console.log('language_id',languageId);
      // console.log('categories_id',id);
      // console.log('currency_code', currencyCode);



  
      dispatch({type: CATEGORY_WISE_PR_REQ});
  
      
       
        var data = new FormData();
  
        data.append('language_id',languageId);
        data.append('categories_id',id);
        data.append('currency_code', currencyCode);





        fetch(shopname==="" ? API_Links.BASE_URL +API_Links.PRODUCT_URL : API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.PRODUCT_URL , {
  
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
            
             
            
            dispatch({type: CATEGORY_WISE_PR_SUCCESS, payload: data.product_data});
  
          })
          .catch((e)=>console.log(e))



    };
  




    export const deleteSingleproductaction =

  
    (id ,navigation ,shopname) => async dispatch => {
  
      dispatch({type: SINGLE_PR_DELETE_REQ});
  
        var data = new FormData();
  
        data.append('products_id',id);

        fetch(shopname===""? API_Links.BASE_URL + API_Links.DELETE_PRODUCT  :API_Links.SHOP_URL+ shopname +"/"+"api"+"/"+API_Links.DELETE_PRODUCT  , {
  
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

            Alert.alert(
              data.message,
              "",
              [
               
                { text: "OK", onPress: () => global.Dimensionwidth < 468 ?  navigation.goBack() : null  }
              ]
            );




            
            dispatch({type: SINGLE_PR_DELETE_SUCCESS, payload: data});
  
          })
          .catch((e)=>console.log(e))



    };
  
