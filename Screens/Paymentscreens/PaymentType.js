import React, {useState, useEffect} from 'react';
import { Image} from 'react-native'
import {global} from '../../styles/global'
import {API_Links} from '../Api/Api';
import uuid from 'react-native-uuid';
import {useSelector} from 'react-redux'

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();

import  AuthId  from '../AuthId.style'


export default PaymentType = (num) => {

  const shopName = useSelector(state => state.shopnameReducer);
  
  const {groceryName} = shopName;

  const [list, setList] = React.useState([ ]);

  



  useEffect(() => {

    var data = new FormData();
    data.append('language_id',1);
    fetch( groceryName === "" ? API_Links.BASE_URL + API_Links.GET_PAYMENT_LISTS : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.GET_PAYMENT_LISTS

    , {
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

      .then((data)=>{

     
        setList(data.data)


      })

      .catch((e)=>{
        console.log(e)
      })


  
    return () => {
      
    }
  }, [   ])
  
  return {

    PaymentTypes: list,

  };




};
