import {
  PRODUCTLIST_ACTION,
  PRODUCT_SEARCH_QUERY,
  PRODUCT_SEARCH_EMPTY,
} from './Constant';
import {Alert} from 'react-native';
import {API_Links} from '../Screens/Api/Api';
import Toast from 'react-native-simple-toast';
import {global} from '../styles/global';
import AuthId from '../Screens/AuthId.style';

import uuid from 'react-native-uuid';

export const productlistAction =
  (
    id,
    language,
    currency_code,
    shopname,
  ) =>
  async dispatch => {
    var data = new FormData();
    // data.append('customers_id', userId);
    // data.append('page_number', page_number);
    console.log('id',id);
    console.log('curreny',currency_code);
    console.log('language',language);

    data.append('language_id', language);
    data.append('currency_code', currency_code);
    data.append('categories_id', id);

    fetch(
      shopname === ''
        ? API_Links.BASE_URL + API_Links.PRODUCT_URL
        : API_Links.SHOP_URL +
            shopname +
            '/' +
            'api' +
            '/' +
            API_Links.PRODUCT_URL,
      {
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
          'consumer-device-id': AuthId._currDeviceId,
          'consumer-ip': AuthId._currIp,
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      },
    )
      .then(response => response.json())

      .then(data => {
        console.log('222222');

        if (data.success === '1') {
          dispatch({type: PRODUCTLIST_ACTION, payload: data.product_data});

          console.log('Sucess');

          //setcatProducts(data.product_data);
        } else {
          dispatch({type: PRODUCTLIST_ACTION, payload: data.product_data});

          //setcatProducts([]);
        }
      })
      .catch(e => console.log('mi', e));
  };

// export const seacrchAction =
//   (key, language, currency_code, shopName) =>
//   async dispatch => {

//     console.log('searchValue', key);
//     console.log('language_id', language);
//     console.log('currency_code', shopName);

//       var data = new FormData();
//       data.append('searchValue', key);
//       data.append('language_id', language);
//       data.append('currency_code', currency_code);

//       fetch( shopName=== "" ?  API_Links.BASE_URL + API_Links.SEARCH_PRODUCTS  :  API_Links.SHOP_URL + shopName +"/"+"api"+"/"+ API_Links.SEARCH_PRODUCTS  , {
//         method: 'POST',
//         headers: {
//           'consumer-key': API_Links.CONSUMER_KEY,
//           'consumer-secret':API_Links.SECRET_KEY,
//           'consumer-nonce':
//         AuthId._currDate.getMilliseconds().toString() +
//         AuthId._currDate.getTime().toString() +
//           '-' +
//           Math.floor(Math.random() * 999) +
//           1,
//           'consumer-device-id':AuthId._currDeviceId,
//          'consumer-ip':AuthId._currIp ,
//           'Content-Type': 'multipart/form-data',
//         },
//         body: data,
//       })
//         .then(response => response.json())
//         .then(data => {
//           if (data.success === '1') {

//             dispatch({
//               type: PRODUCT_SEARCH_QUERY,
//               payload: data.product_data.products,
//             });
//           } else {
//             dispatch({type: PRODUCT_SEARCH_EMPTY  , payload: data.success,  });

//             Toast.showWithGravity(data.message, Toast.SHORT, Toast.BOTTOM);
//           }
//         })
//         .catch(e => console.log("grgr",e));

//   };
