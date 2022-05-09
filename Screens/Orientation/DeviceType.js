import React ,{useState,useEffect}from 'react'
import {View } from 'react-native'
import DeviceInfo from 'react-native-device-info';

export default  DeviceType  = () => {

    const [checkDevicetype, setDevicetype] = React.useState('');
    
    useEffect(() => {
      setDevicetype(DeviceInfo.getDeviceType);
    }, []);

    return {
       
        isTab: checkDevicetype

      };

      
}
