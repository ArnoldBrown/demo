import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native'
import {Cartclear} from '../../action/Cartatction';
import {useSelector, useDispatch} from 'react-redux';
import  AuthId  from '../AuthId.style'








  const   Clearcart = () => {

  const dispatch = useDispatch();

  const sessionData = useSelector(state => state.sessionReducer);
  const {sessionResponse} = sessionData;
    
return {

  jjj :  (Alert.alert(
        "Are you sure",
        "You want to delete the cart ?",
        [
          {
            text: "No",
           
            style: "cancel"
          },
          { text: "Yes",  }
        ]
      )
  )
     
      }







}

export default Clearcart