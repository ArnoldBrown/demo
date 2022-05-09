
   
import React from 'react';
import {Cartclear} from '../action/Cartatction';
import {sessionAction} from '../action/sessionAction';


export default function customClearCart(
  dbToken,
  sessionResponse,
  dispatch,
  session, shopName
) {
  return (
    dispatch(Cartclear(dbToken !== '' ? dbToken : sessionResponse  , shopName )),
    setTimeout(() => {

      dispatch(sessionAction(session + Math.random()* 999));


      
    }, 1000)
  );
}