import {
  CUSTOMER_EDIT_REQ,
  CUSTOMER_EDIT_SUCCES,
  CUSTOMER_EDIT_FAIL,
} from './Constant';
import {API_Links} from '../Screens/Api/Api';
import uuid from 'react-native-uuid';
import {global} from '../styles/global'
import  AuthId  from '../Screens/AuthId.style'



export const customereditAction =
  (
    firstName,
    lastName,
    email,
    phoneNumber,
    phoneCode,
    gender,
    DOB,
    customerId,
    addrId,
    country,
    state,
    city,
    postalCode,
    address, groceryName
  ) =>

  async dispatch => {
    dispatch({type: CUSTOMER_EDIT_REQ});

    

    try {

      var data = new FormData();

      data.append('customers_firstname', firstName);
      data.append('customers_lastname', lastName);
      data.append('email', email);
      data.append('customers_telephone', phoneNumber);
      data.append('country_code', phoneCode);
      data.append('customers_gender', gender);
      data.append('customers_dob', DOB);
      data.append('customers_id', customerId);
      data.append('address_book_id', addrId);
      data.append('customers_address', address);
      data.append('country', country);
      data.append('state', state);
      data.append('city', city);
      data.append('postal_code', postalCode);

      fetch( groceryName === "" ? API_Links.BASE_URL + API_Links.EDIT_CUSTOMER :  API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.EDIT_CUSTOMER, {
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
         

          dispatch({type: CUSTOMER_EDIT_SUCCES, payload: data.message});
        });
    } catch (error) {
      dispatch({type: CUSTOMER_EDIT_FAIL, payload: error});
    }
  };
