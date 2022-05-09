import React,{useState,useEffect} from 'react'
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
    ScrollViewBase,Pressable,Modal ,
  } from 'react-native';
  import {global} from '../../styles/global';



export default function ChatModel({navigation}) {


const[modalVisible ,setmodalVisible]=useState(true)



  return (



    <SafeAreaView style={global.commonBg}>
    <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
    {global.Dimensionwidth  > 468 ? null  :
    <View style={global.commonMobileHeader}>
    <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image
          source={require('../../Images/left-arrow.png')}
          style={{width: 20, height: 20}}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={global.headTitle}>Connect with One Chat Food</Text>

      <View
        style={[global.flexRowsec, {justifyContent: 'space-between'}]}></View>
    </View>
}
    <View
      style={{flex: 1, flexDirection: 'column', backgroundColor: '#F1F6FA'  ,padding:15  }}>
      <View style={{justifyContent:"center",alignItems:"center"}}>

 


      <Image  source={require('../../Images/chatBox.png')} style={[{width:50 ,height:50},global.iconColor]}/>

      </View>

      <Text></Text>



<View style={[global.flexRowsec,{borderBottomWidth:1,marginBottom:22}]}>

<View style={{width:"50%" ,justifyContent:"center",alignItems:"center"  ,padding:11}}>
<Text>Username</Text>

</View>
<View style={{width:"50%" ,justifyContent:"center",alignItems:"center",padding:11}}>
<Text>SMS</Text>

</View>



</View>




      <TextInput
                style={global.inputBox}
                
              
                placeholder="User Name"
                placeholderTextColor="#b6b9bd"
              />

<Text></Text>

<TextInput
                style={global.inputBox}
                
              
                placeholder="Password"
                placeholderTextColor="#b6b9bd"
              />

<Text></Text>


<TouchableOpacity style={[global.commonButton,{height:40}]}>

    <Text style={global.btnText1}>Connect</Text>

</TouchableOpacity>



</View>





  </SafeAreaView>




    
    
  )
}

