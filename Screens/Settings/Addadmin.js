import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Touchable,Pressable,
  Image,
  StatusBar,
  Switch,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType'
import { useSelector ,useDispatch} from 'react-redux'






export default function Addadmin({navigation ,onOpenroles ,onCloseroles}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [text, onChangeText] = useState('');

const isDevicetype =DeviceType()



const getToken = useSelector(state => state.loginReducer);
//  const getMerchantdetails = useSelector(state => state.merchantloginDetails);

const { loginData} = getToken;








  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

{isDevicetype.isTab!=="Tablet"  ?

      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}  resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>User</Text>

        <View style={[global.flexRowsec, {justifyContent: 'space-between'}]}>
          {/* <TouchableOpacity>
            <Text
              style={[
                global.headSvbtn,
                {textAlign: 'center', marginRight: 20},
              ]}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[global.headSvbtn, {textAlign: 'center'}]}>Add</Text>
          </TouchableOpacity> */}
        </View>
      </View>

:null}


      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#F1F6FA'}}>
       <View
          style={[
            global.commonlineWrapper,
            {marginBottom: 30},
          ]}>

            
          <View style={[global.commonFlexrow_ct]}>

            <Text style={global.commonTextblueH1}>Enable </Text>

            <View style={[global.commonTwocol, {flexDirection: 'row-reverse'}]}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>


          </View>
        </View>

        <View style={[global.commonWhitebg, {padding: 17 ,borderTopWidth:2 ,borderBottomWidth:2 ,borderBottomColor:"#eee" ,borderTopColor:"#eee" }]}>
          <Pressable style={[global.commonFlexrow_ct]} onPress={()=> global.Dimensionwidth > 468 ? onOpenroles() :navigation.navigate('Roles')}       >
<View  style={global.flexRowsec}>

<Image  source={require('../../Images/customer.png')} style={global.commonIcon}/>

<Text style={[global.commonTextblueH1,{marginLeft:11}]}>{loginData.first_name +loginData.last_name } </Text>
</View>

        




<Image  source={require('../../Images/angleRight.png')} style={global.settingIcon}/>



          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
