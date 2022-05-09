
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
  Switch,Modal
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType'



export default function DeliveryProvider({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [text, onChangeText] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

const findDevicetype =DeviceType()




  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

  {findDevicetype.isTab ==="Tablet" ? null :    <View style={global.commonMobileHeader}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>DeliveryProvider</Text>

        <TouchableOpacity>
          <Text style={global.headSvbtn}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setModalVisible(true)}>
          <Text style={global.headSvbtn}>Add</Text>
        </TouchableOpacity>
      </View>}

      <View style={global.commonLightbg}>
        <View style={{flex: 1, }}>
          <View style={[global.commonWhitebg, {flex: 1, paddingVertical: 0}]}>
            <View style={[global.flexRowsec, global.flexLine]}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 11,
                  overflow: 'hidden',
                }}>
                <Image
                  source={require('../../Images/paypal.png')}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: 7,
                  }}
                  resizeMode="contain"
                />
              </View>

              <Text style={global.commonTextblueH1}>Paypal</Text>
            </View>

            <View style={[global.flexRowsec, global.flexLine]}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 11,
                  overflow: 'hidden',
                }}>
                <Image
                  source={require('../../Images/paypal.png')}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: 7,
                  }}
                  resizeMode="contain"
                />
              </View>

              <Text style={global.commonTextblueH1}>Paypal</Text>
            </View>
          </View>
        </View>
      </View>



      <Modal
        animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[global.commonModalbg,{justifyContent:"center"}]}>
          

<View style={{backgroundColor:"#fff",borderRadius:10,width:global.Dimensionwidth/1.2 }}>
<View style={[global.commonMobileHeader,{}]}>


<TouchableOpacity onPress={()=>setModalVisible(false)}>
  <Image source={require('../../Images/closeicon.png')} style={global.settingIcon}/>
</TouchableOpacity>


<Text style={global.commonTextblueH1}>
  Add Provider Delivery
</Text>

<Text>
  Save
</Text>







</View>


<View style={{padding:15}}>

<TouchableOpacity style={{justifyContent:"center",alignItems:"center"}}>
<View style={{width:80 ,height:80 ,borderWidth:1 ,borderRadius:5 ,borderColor:"#DADADA" ,justifyContent:"center",alignItems:"center"}}>



<Image source={require('../../Images/placeholder.png')} style={{width:"100%",height:"100%"}}  />


</View>
</TouchableOpacity>


  

<View style={[global.flexRowsec,global.commonborder,{paddingVertical:11 ,borderLeftWidth:0 ,borderRightWidth:0},global.topSpacing]}>
<View style={{width:"40%"}}>


<Text style={global.commonTextblue}>Provider Name</Text>

</View>





<View style={[global.inputBox,{width:"60%"}]}>
<TextInput
        style={global.input}
        onChangeText={onChangeText}
        value={text}
      />


</View>



</View>




</View>


</View>





        </View>
      </Modal>





    </SafeAreaView>
  );
}

