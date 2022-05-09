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
  StatusBar,Switch
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType'
import  AuthId  from '../AuthId.style'




export default function AssignChoice({navigation ,onClosestep5 ,onShowstep6}) {
 
  const [checkbox, setCheckbox] = React.useState(false);
  const [text, onChangeText] = React.useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const findDevicetype =DeviceType()




  return (
    <SafeAreaView style={[global.commonBg,{borderRadius:13}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

 
        <View style={global.commonMobileHeader}>
          <TouchableOpacity onPress={() =>findDevicetype.isTab==="Tablet"? onClosestep5():   navigation.goBack()}>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}> Assign Choices</Text>

        <View>

        </View>
        </View>

<View style={{paddingHorizontal:15 ,paddingVertical:20 ,flex:1}}> 
<View style={{flex:1}}>



<View style={[global.headerSerach,global.bottomSpacing]}>
            <Image
              source={require('../../Images/search.png')}
              style={[ global.settingIcon  , {tintColor: '#6D6E72'}]}
              resizeMode="contain"
            />

            <TextInput
              style={[global.input, {paddingHorizontal: 11}]}
              onChangeText={onChangeText}
              value={text}
              placeholder="Search"
            />
          </View>
















<View style={global.commonborder}>  
<View style={[global.tableHead]}>

<View style={global.commonFlexrow_ct}>
<Text  style={global.commonTextblack}>Option name</Text>
<Text  style={global.commonTextblack}>Extra cost</Text>

</View>


</View>
<View style={global.commonWhitebg}>



</View>







</View>








     

          </View>


<View style={{justifyContent:"flex-end" ,flex:0.2} }>

<TouchableOpacity style={global.transparentButton} onPress={()=> findDevicetype.isTab==="Tablet" ? onShowstep6():   navigation.navigate('AddOption')}>



<Text style={global.btnText2}>CREATE NEW CHOICE</Text>


</TouchableOpacity>


</View>



          </View>


  
    </SafeAreaView>
  );
}
