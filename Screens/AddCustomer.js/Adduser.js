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
import DeviceInfo from 'react-native-device-info';
import  AuthId  from '../AuthId.style'



export default function Addproduct() {
  const [checkDevicetype, setDevicetype] = React.useState(' ');
  const [checkprice, onCheckprice] = React.useState(false);

  const [text, onChangeText] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);



  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);




  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={global.commonHeader}>
        <TouchableOpacity>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Add User</Text>

        <TouchableOpacity>
          <Text style={global.headSvbtn}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={[global.innerSecwhitebg,{backgroundColor:"#fff"}]}>

  <View style={{borderBottomColor:"#E7E7E7",borderBottomWidth:1 ,paddingVertical:11}}>
    
<View style={[global.commonFlexrow_bt,{}]}>
<Text>Name</Text>
<View style={[global.inputBox,{width:"70%"}]}>
              <TextInput
style={[global.input]}
              
              />
            </View>



</View>



</View>      

<View style={{borderBottomColor:"#E7E7E7",borderBottomWidth:1 ,paddingVertical:11}}>
    
    <View style={[global.commonFlexrow_bt,{}]}>
    <Text>Password</Text>
    <View style={[global.inputBox,{width:"70%"}]}>
                  <TextInput
    style={[global.input]}
                  
                  />
                </View>
    
    
    
    </View>
    
    
    
    </View> 

    

    <View style={{borderBottomColor:"#E7E7E7",borderBottomWidth:1 ,paddingVertical:11}}>
    
    <View style={[global.commonFlexrow_bt,{paddingVertical:6}]}>
    <Text>ROLES</Text>
   
    
    
    </View>
    
    
    
    </View> 

    
    
    <View style={{borderBottomColor:"#E7E7E7",borderBottomWidth:1 ,paddingVertical:11}}>
    
    <View style={[global.commonFlexrow_ct,{}]}>
    <Text>Product Management Access</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

    
    </View>
    
    
    
    </View> 



  
    <View style={{borderBottomColor:"#E7E7E7",borderBottomWidth:1 ,paddingVertical:11}}>
    
    <View style={[global.commonFlexrow_ct,{}]}>
    <Text>Bill Management Access</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

    
    </View>
    
    
    
    </View> 




  
    <View style={{borderBottomColor:"#E7E7E7",borderBottomWidth:1 ,paddingVertical:11}}>
    
    <View style={[global.commonFlexrow_ct,{}]}>
    <Text>Cancel Bill Access</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

    
    </View>
    
    
    
    </View> 


  
    <View style={{borderBottomColor:"#E7E7E7",borderBottomWidth:1 ,paddingVertical:11}}>
    
    <View style={[global.commonFlexrow_ct,{}]}>
    <Text>Inventory Management Access</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

    
    </View>
    
    
    
    </View> 

    





      </View>
    </SafeAreaView>
  );
}
