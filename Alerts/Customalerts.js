import React from 'react'
import {View ,Text ,Alert} from 'react-native'




const Customalerts = (param1 ,param2 ,navigation) => {
//console.log("navigation",navigation)
    
      Alert.alert(
        param1,
        param2,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => navigation.goBack() }
        ]
      );


    }




    export default Customalerts;