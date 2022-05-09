import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Touchable,
  Image,
  StatusBar,
  Switch,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType'

import  AuthId  from '../AuthId.style'



export default function Addproduct() {
  const [checkDevicetype, setDevicetype] = React.useState(' ');
  const [checkprice, onCheckprice] = React.useState(false);

  const [text, onChangeText] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);


const deviceType =DeviceType()



  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={[global.commonBg, {backgroundColor: '#F1F6FA'}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

{deviceType.isTab!=="Tablet" ?  
      <View style={[global.commonHeader, {backgroundColor: '#F1F6FA'}]}>
        <TouchableOpacity>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Search...</Text>

        <TouchableOpacity>
          <Image
            source={require('../../Images/icons8-edit.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>

 :   null}


      <View
        style={[
          global.innerSecwhitebg,
          {backgroundColor: '#fff', paddingVertical: 11},
        ]}>
        <View
          style={[
            global.headerSerach,
            {height: checkDevicetype === 'Handset' ? 40 : 55},
          ]}>
          <Image
            source={require('../../Images/search.png')}
            style={{width: 17, height: 17, tintColor: '#6D6E72'}}
            resizeMode="contain"
          />

          <TextInput
            style={[global.input, {paddingHorizontal: 4}]}
            onChangeText={onChangeText}
            value={text}
            placeholder="Search by name or phone number"
          />
        </View>

        <Text></Text>
        <View
          style={[
            global.commonFlexrow_ct,
            {paddingBottom: 10, borderBottomWidth: 1 ,borderBottomColor: '#E7E7E7',},
          ]}>
          <View style={{width: '60%'}}>
            <Text numberOfLines={1} style={global.innersecTitle}>
              Slim texthquidiwhiwhdwgduqgduigdq
            </Text>
            <Text></Text>
            <Text style={global.commonText}>0652927-xxxx-xxxx</Text>
          </View>

          <View style={{width: '30%'}}>
            <TouchableOpacity
              style={[global.transparentButton, {borderColor: 'red'}]}>
              <Text style={global.errorText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
