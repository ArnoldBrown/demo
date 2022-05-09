import {GALLERY_IMG_VIEW, GALLERY_UPLOAD} from './Constant';
import {API_Links} from '../Screens/Api/Api';
import uuid from 'react-native-uuid';
import {Platform} from 'react-native';
import {global} from '../styles/global';
import  AuthId  from '../Screens/AuthId.style'




export const galleryData = (key,shopname) => async dispatch => {
 


  fetch(
    shopname === ""
      ? API_Links.BASE_URL + API_Links.GALLERY
      : API_Links.SHOP_URL + shopname + '/' + 'api' + '/' + API_Links.GALLERY,
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
        'consumer-device-id':AuthId._currDeviceId,
       'consumer-ip':AuthId._currIp ,
        'Content-Type': 'multipart/form-data',
      },
      // body: data,
      //  body: data,
    },
  )
    .then(response => response.json())

    .then(responseJson => {
      if (key === 0) {


        dispatch({type: GALLERY_IMG_VIEW, payload: responseJson.data});
      } else {
       

        responseJson = responseJson.data.map(item => {
          
          item.isSelect = false;
          item.selectedClass = global.itemContainer;

          return item;
        });
        dispatch({type: GALLERY_IMG_VIEW, payload: responseJson});
      }
    })

    .catch(e => console.log(e ,"gallerError"));
};

export const galleryuploadData = images => async dispatch => {
  
    var random = ('' + Math.random()).substring(2, 8);

    var data = new FormData();

    images.forEach((item, i) => {
      data.append('file[]', {
        uri:
          Platform.OS === 'android'
            ? item.path
            : item.path.replace('file://', ''),
        type: 'image/jpeg',
        name: `POS_${random}.jpg`,
      });
    });

    fetch(API_Links.BASE_URL + API_Links.ADD_GALLERY, {
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

      .then(data => {})
      .catch(e => console.log('erroyoir' + e));
  
      
};
