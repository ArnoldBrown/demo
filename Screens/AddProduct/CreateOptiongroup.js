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



export default function CreateOptiongroup({navigation ,onClosestep4  ,onShowstep5}) {
  const [checkbox, setCheckbox] = React.useState(false);
  const [text, onChangeText] = React.useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  const findDevicetype =DeviceType()




  return (
    <SafeAreaView style={[global.commonBg,{borderRadius:13}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

 
        <View style={global.commonMobileHeader}>
          <TouchableOpacity onPress={() =>findDevicetype.isTab==="Tablet"?  onClosestep4()  :      navigation.goBack()}>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}> Create Option group</Text>

          <TouchableOpacity>
            <Text style={global.appColor}>Save</Text>
          </TouchableOpacity>
        </View>

<View style={{paddingHorizontal:15 ,paddingVertical:20 ,flex:1}}> 
<View style={{flex:1}}>



<View  style={[global.commonWhitebg,global.commonborder]}>

<View style={[global.commonFlexrow_ct,global.bottomSpacing]}>

<View style={[ global.commonTwocol]}> 
<Text style={global.commonTextblack}>Option group name</Text>


</View>


<View style={[global.inputBox, global.commonTwocol]}>
              <TextInput
                style={[global.input]}
                onChangeText={text}
               
                placeholderTextColor="#D1D1D1"
                value={onChangeText}
              />
            </View>

</View>




<View style={[global.commonFlexrow_ct,global.bottomSpacing]}>

<View style={[ global.commonTwocol]}> 
<Text style={global.commonTextblack}>Required</Text>


</View>


<View style={[global.commonTwocol]}>
<Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />




            </View>

</View>





<View style={[global.commonFlexrow_ct,global.bottomSpacing]}>

<View style={[ global.commonTwocol]}> 
<Text style={global.commonTextblack}>Max QTY</Text>


</View>


<View style={[global.inputBox, global.commonTwocol]}>
              <TextInput
                style={[global.input]}
                onChangeText={text}
                placeholder="0"
                placeholderTextColor="#D1D1D1"
                value={onChangeText}
              />
            </View>

</View>






</View>


<Text></Text>
<Text style={global.commonTextblackH1}>Choices</Text>
<Text></Text>


<View style={global.commonborder}>  
<View style={[global.tableHead]}>

<View style={global.commonFlexrow_ct}>
<Text style={global.commonTextblack}>Option name</Text>
<Text style={global.commonTextblack}>Extra cost</Text>

</View>


</View>
<View style={global.commonWhitebg}>



</View>







</View>








     

          </View>


<View style={{justifyContent:"flex-end" ,flex:0.2} }>

<TouchableOpacity style={global.transparentButton} onPress={()=>   findDevicetype.isTab==="Tablet" ?  onShowstep5() :  navigation.navigate('Assignchoice')     }>



<Text style={global.btnText2}>Asssign to Choices</Text>


</TouchableOpacity>


</View>



          </View>


  
    </SafeAreaView>
  );
}
