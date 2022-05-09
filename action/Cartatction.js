import {
  CART_ADD,
  CART_CLEAR,
  CART_INC,
  CART_DEC,
  CART_DELETE,
  CART_ADD_REQSSS,
  CART_EXISTS,
  CART_VIEW,
  CUSTOMER_DATA,
  CART_CLEAR_REQ,
  COD_ADD,
  CART_VIEW_FAIL,
  COUPON_ADD_REQ,
  COUPON_ADD_SUCCESS,
  COUPON_RES_FAIL,
  GET_SESSION_TOKEN,
  GET_SESSION_CLEAR,
} from './Constant';
import {Alert} from 'react-native';
import uuid from 'react-native-uuid';
import {API_Links} from '../Screens/Api/Api';
import Toast from 'react-native-simple-toast';
import {global} from '../styles/global';
import AuthId from '../Screens/AuthId.style';

export const Cartaction =
  (attr, sessionResponse, key, shopname) => async dispatch => {
    dispatch({type: CART_ADD_REQSSS});

    if (key === 0) {
      var data = new FormData();

      data.append('products_id', attr.products_id);
      data.append('session_id', sessionResponse);
      data.append('quantity', 1);
      data.append('products_price', attr.products_price);
    } else {
      var data = new FormData();

      data.append('products_id', attr.products_id);
      data.append('session_id', sessionResponse);
      data.append('quantity', 1);
      data.append(`option_name[]`, attr.option_name);
      data.append(`option_id[]`, attr.option_id);
      data.append(`attributeid[]`, attr.attributeid);
      data.append(attr.option1, attr.option2);
      data.append('products_price', attr.products_price);
    }

    fetch(
      shopname === ''
        ? API_Links.BASE_URL + API_Links.ADD_POS_CART
        : API_Links.SHOP_URL +
            shopname +
            '/' +
            'api' +
            '/' +
            API_Links.ADD_POS_CART,
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
      .then(response => response.text())

      .then(data => {
        Toast.showWithGravity(
          'Product Added successfully.',
          Toast.LONG,
          Toast.TOP,
        );

        var data = new FormData();
        data.append('session_id', sessionResponse);
        fetch(
          shopname === ''
            ? API_Links.BASE_URL + API_Links.VIEW_POS_CART
            : API_Links.SHOP_URL +
                shopname +
                '/' +
                'api' +
                '/' +
                API_Links.VIEW_POS_CART,
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
            if (data.success === '0') {
              dispatch({type: CART_VIEW_FAIL, payload: data});
            } else {
              dispatch({type: CART_VIEW, payload: data.data});
            }
          })

          .catch(e => console.log("ERROR',", e));
      });
  };

export const CartviewAction = (sessionResponse, shopname) => async dispatch => {
  var data = new FormData();
  data.append('session_id', sessionResponse);
  fetch(
    shopname === ''
      ? API_Links.BASE_URL + API_Links.VIEW_POS_CART
      : API_Links.SHOP_URL +
          shopname +
          '/' +
          'api' +
          '/' +
          API_Links.VIEW_POS_CART,
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
      console.log('testting',data);
      
      
      if (data.success === '0') {
        dispatch({type: CART_VIEW_FAIL, payload: data});
      } else {
        dispatch({type: CART_VIEW, payload: data.data});
      }
    })

    .catch(e => console.log(e));
};

export const cartInc_action = item => async dispatch => {
  try {
    dispatch({type: CART_INC, payload: item});
  } catch (error) {
    console.log(error);
  }
};

export const cartDec_action = item => async dispatch => {
  try {
    dispatch({type: CART_DEC, payload: item});
  } catch (error) {
    console.log(error);
  }
};

export const cartdeleteSingleproduct = (item, shopName) => async dispatch => {
  try {
    var data = new FormData();
    data.append('id', item.customers_basket_id);
    fetch(
      shopName === ''
        ? API_Links.BASE_URL + API_Links.DELETE_POS_CART
        : API_Links.SHOP_URL +
            shopName +
            '/' +
            'api' +
            '/' +
            API_Links.DELETE_POS_CART,
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
        dispatch({type: CART_DELETE, payload: item});
      });
  } catch (error) {
    console.log(error);
  }
};

export const Cartclear = (session_id, shopName) => async dispatch => {
  dispatch({type: CART_CLEAR_REQ});
  try {
    var data = new FormData();
    data.append('session_id', session_id);
    fetch(
      shopName === ''
        ? API_Links.BASE_URL + API_Links.CLEAR_POS_CART
        : API_Links.SHOP_URL +
            shopName +
            '/' +
            'api' +
            '/' +
            API_Links.CLEAR_POS_CART,
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
        console.log(data, 'hmmmmfirst');

        dispatch({type: CART_CLEAR, payload: data});
      });
  } catch (error) {
    console.log(error, 'nayan');
  }
};

export const customerdataAction = (item, navigation) => async dispatch => {
  try {
    dispatch({type: CUSTOMER_DATA, payload: item});

    Alert.alert('Customer Added Successfully', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          global.Dimensionwidth > 468 ? null : navigation.goBack(),
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const cart_COD_action = item => async dispatch => {
  try {
    dispatch({type: COD_ADD, payload: item});
  } catch (error) {
    console.log(error);
  }
};

export const applycouponAction =
  (couponObj, userId, shopname) => async dispatch => {
    dispatch({type: COUPON_ADD_REQ});

    var data = new FormData();
    data.append('coupon_code', couponObj.couponCode);
    data.append('customers_id', userId);

    fetch(
      shopname === ''
        ? API_Links.BASE_URL + API_Links.APPLYCOUPON
        : API_Links.SHOP_URL +
            shopname +
            '/' +
            'api' +
            '/' +
            API_Links.APPLYCOUPON,
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

      .then(e => {
        Alert.alert(e.message, '', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

        if (e.success === '1') {
          dispatch({type: COUPON_ADD_SUCCESS, payload: couponObj});
        } else {
          dispatch({type: COUPON_RES_FAIL});
        }
      })

      .catch(e => dispatch({type: COUPON_RES_FAIL, payload: e}));
  };
