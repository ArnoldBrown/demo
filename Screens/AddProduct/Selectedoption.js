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
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType'
import  AuthId  from '../AuthId.style'




export default function Selectedoption({navigation  ,onClosestep3  ,onShowstep4}) {


  const [checkbox, setCheckbox] = React.useState(false);

  const [text, onChangeText] = React.useState('');
  const findDevicetype =DeviceType()

  return (
    <SafeAreaView style={[global.commonBg,{borderRadius:15}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={()=> findDevicetype.isTab==="Tablet" ? onClosestep3():   navigation.goBack()       }>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Selected</Text>

        <View></View>
      </View>

      <ScrollView
        contentContainerStyle={[global.formSection, {flexGrow: 1 ,backgroundColor:"#F9F9F9"  ,paddingHorizontal:0 ,paddingTop:10}]}
        showsVerticalScrollIndicator={false}>

<View style={{paddingHorizontal:11 ,marginBottom:11}}>
<View style={global.headerSerach}>
            <Image
              source={require('../../Images/search.png')}
              style={[global.settingIcon,  {tintColor: '#6D6E72'}]}
              resizeMode="contain"
            />

            <TextInput
              style={[global.input, {paddingHorizontal: 11}]}
              onChangeText={onChangeText}
              value={text}
              placeholder="Search"
            />
          </View>


</View>
      






        <View style={{backgroundColor:"#fff",paddingHorizontal:11}}>






     
<View style={global.listItems}>

<View  style={{flexDirection:"row" ,alignItems:"center"}}>



<View>
<TouchableOpacity onPress={() => setCheckbox(!checkbox)}>
                <View
                  style={
                    checkbox
                      ? [global.customCheckbox,{}]
                      : [global.customCheckboxdisable,{}]
                  }>
                  {checkbox ? (
                    <Image
                      source={require('../../Images/tick.png')}
                      style={global.checkBoxtick}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
</View>


<View>
<Text style={[global.commonTextblack,{marginBottom:11}]}>Vino</Text>

<Text style={global.commonText}>Required(Choice 2)</Text>

</View>

</View>



<Image source={require('../../Images/icons8-edit.png')} style={global.settingIcon}/>




</View>
          

          

          


          

          
        </View>
      </ScrollView>

      <View style={[global.flexBottomwrapper,{backgroundColor:"#F9F9F9"}]}>

        <TouchableOpacity onPress={()=> findDevicetype.isTab==="Tablet" ? onShowstep4():  navigation.navigate('CreateOptiongroup')      }>


          <View style={global.commonButton}>
     
            <Text style={global.btnText1}>Create New</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
