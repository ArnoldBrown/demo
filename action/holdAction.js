import {
  CART_HOLD_REQ,
  CART_HOLD_FAIL,
  CART_HOLD_SUCCESS,
  HOLD_LIST_REQ,
  HOLD_LIST_FAIL,
  HOLD_LIST_SUCCESS,
  CART_HOLD_DTREQ,
  CART_HOLD_DTFAIL,
  CART_HOLD_DTSUCCESS,
  CART_HOLD_RETRIEV_REQ,
  CART_HOLD_RETRIEV_SUCCESS,
  CART_HOLD_RETRIEV_FAIL,
  RETRIEV_DEL_REQ,
  RETRIEV_DEL_SUCCESS,
} from './Constant';
import uuid from 'react-native-uuid';

import {global} from '../styles/global';

import {API_Links} from '../Screens/Api/Api';

import {Alert} from 'react-native';
import {connectAdvanced} from 'react-redux';
import AuthId from '../Screens/AuthId.style';

export const cartholdAction =
  (cashier_id, session_id, note, shopname,navigation) => async dispatch => {
    dispatch({type: CART_HOLD_REQ});
    var data = new FormData();

    data.append('cashier_id', cashier_id);
    data.append('session_id', session_id);
    data.append('note', note);

    fetch(
      shopname === ''
        ? API_Links.BASE_URL + API_Links.CART_HOLDER
        : API_Links.SHOP_URL +
            shopname +
            '/' +
            'api' +
            '/' +
            API_Links.CART_HOLDER,
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

        console.log("testing.....")
        dispatch({type: CART_HOLD_SUCCESS});
        console.log('first',e);

        dispatch(
          cartholdlistAction(
            cashier_id,
            shopname)
            );

        Alert.alert(e.message, ' ', [{text: 'OK'
      }]);
      })
      .catch(e => console.log(e));
  };

export const cartholdlistAction = (cashier_id, shopnames) => async dispatch => {
  dispatch({type: HOLD_LIST_REQ});

  var data = new FormData();

  data.append('cashier_id', cashier_id);
  fetch(
    shopnames === ''
      ? API_Links.BASE_URL + API_Links.VIEW_HOLDER
      : API_Links.SHOP_URL +
          shopnames +
          '/' +
          'api' +
          '/' +
          API_Links.VIEW_HOLDER,
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
      if (data.success === '1') {
        // console.log('holdtesting',data.data)
        dispatch({type: HOLD_LIST_SUCCESS, payload: data.data});
      } else {
        dispatch({type: HOLD_LIST_FAIL});
      }
    })
    .catch(e => console.log('rytyutuyuyuu', e));
};

export const cartholdDetailaction =
  (cashier_id, hold_id, shopname) => async dispatch => {
    dispatch({type: CART_HOLD_DTREQ});

    try {
      var data = new FormData();
      data.append('cashier_id', cashier_id);
      data.append('hold_id', hold_id);

      fetch(
        shopname == ''
          ? API_Links.BASE_URL + API_Links.HOLD_DETAILS
          : API_Links.SHOP_URL +
              shopname +
              '/' +
              'api' +
              '/' +
              API_Links.HOLD_DETAILS,
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
            dispatch({type: CART_HOLD_DTFAIL});
          } else {
            dispatch({type: CART_HOLD_DTSUCCESS, payload: data.data});
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

export const cartholdretrievAction =
  (cashier_id, hold_id, navigation, shopname) => async dispatch => {
    dispatch({type: CART_HOLD_RETRIEV_REQ});

    var data = new FormData();

    data.append('cashier_id', cashier_id);

    data.append('hold_id', hold_id);

    fetch(
      shopname === ''
        ? API_Links.BASE_URL + API_Links.HOLD_RETRIEV
        : API_Links.SHOP_URL +
            shopname +
            '/' +
            'api' +
            '/' +
            API_Links.HOLD_RETRIEV,
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
        if (data.success === '1') {
          dispatch({type: CART_HOLD_RETRIEV_SUCCESS, payload: hold_id});

          Alert.alert(data.message, '', [
            {
              text: 'OK',
              onPress: () =>
                global.Dimensionwidth > 468 ? null : navigation.goBack(),
            },
          ]);
        }
      })
      .catch(e => console.log('error', e));
  };

export const carthold_deleteAction =
  (cashier_id, hold_id, shopname) => async dispatch => {
    dispatch({type: RETRIEV_DEL_REQ, payload3: ''});

    var data = new FormData();

    data.append('cashier_id', cashier_id);

    data.append('hold_id', hold_id);

    fetch(
      shopname === ''
        ? API_Links.BASE_URL + API_Links.HOLD_DELETE
        : API_Links.SHOP_URL +
            shopname +
            '/' +
            'api' +
            '/' +
            API_Links.HOLD_DELETE,
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

        dispatch({
          type: RETRIEV_DEL_SUCCESS,
          payload: hold_id,
          payload3: 'succe',
        });
      })

      .catch(e => console.log('error', e));
  };
