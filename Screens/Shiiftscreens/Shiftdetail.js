import React, {useState ,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Touchable,
  Modal,
  TextInput,
  Dimensions,
  Button,Alert,ActivityIndicator
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import Shiftpaid from '../Shiiftscreens/Shiftpaid';
import {useSelector,useDispatch} from 'react-redux'
import Customloader from '../Customloader';
import {API_Links} from '../Api/Api';
import  AuthId  from '../AuthId.style'

import uuid from 'react-native-uuid';

import {drawerViewaction, draweOpenaction} from '../../action/drawerAction';


const windowWidth = Dimensions.get('window').width;

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();


export default function Shiftdetail({navigation  ,round}) {




  const findDevicetype = DeviceType();
  const [modalVisible, setmodalVisible] = useState(false);


  const [shiftpaidModel, setShiftpaidModel] = useState(false);

  const [number, onChangeNumber] = React.useState('');


const [loader,setLoader]=useState(false)

 const dispatch = useDispatch()


  const getToken = useSelector(state => state.loginReducer);

  const {casherId} = getToken;

  const drawerStatus = useSelector(state => state.drawerViewreducer);

  const{ drawerData }= drawerStatus



  const shopName = useSelector(state => state.shopnameReducer);
  
  const {groceryName} = shopName;






// useEffect(() => {

  

//     dispatch(drawerViewaction(casherId))







//   return () => {

//     unsubscribe;
    
//   }
// }, [ ])


const onCloseDrawer = async ()=>{
  setLoader(true)

  var data = new FormData();


  data.append('cashier_id',casherId);
  data.append('amount',number);
  data.append('drawer_id',drawerData.id);


  fetch(  groceryName===''? API_Links.BASE_URL + API_Links.CLOSE_DRAWER    :  API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.CLOSE_DRAWER
  ,{



    method: 'POST',
    headers: {
      'consumer-key': API_Links.CONSUMER_KEY,
      'consumer-secret': API_Links.SECRET_KEY,
      'consumer-nonce':
        AuthId._currDate.getMilliseconds().toString() +
        AuthId._currDate.getTime().toString() +
          '-' +
          Math.floor(Math.random() * 999) +
          1,
      'consumer-device-id':AuthId._currDeviceId,
     'consumer-ip':AuthId._currIp ,
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  })
    .then(response => response.json())

    .then((data)=>{

      setLoader(false)

      onChangeNumber('')
     
      Alert.alert(
        data.message,
        "",
        [
         
          { text: "OK", onPress: () =>[ setmodalVisible(false) , navigation.navigate('Home') ,dispatch(drawerViewaction(casherId  ,groceryName))  , 
          ] }
        ]
      );




    })








}







  return (
    <SafeAreaView style={global.commonBg}>
 {drawerData !== undefined ? 
<View style={{flex:1}}>
      <View style={global.commonMobileHeader}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
             source={require('../../Images/menu.png')}
            style={global.hamBurgermenu}
         
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Shift</Text>

        <View></View>
      </View>

    

    

<ScrollView showsVerticalScrollIndicator={false} bounces={false}  contentContainerStyle={{}}>
<View style={[ {padding: 15, alignItems: 'center' ,backgroundColor:"#eeeeee63" ,flex:1} ]}>
        <View
          style={{
            flex: 1,
            width:
              findDevicetype.isTab === 'Tablet'
                ? windowWidth /1.7
                : windowWidth,
              paddingHorizontal: 15, 
          }}>
          <View style={[global.commonWhitebg,{borderRadius:11}]}>
            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Round</Text>
            <Text style={global.innersecTitle}>{drawerData.round}</Text>
            </View>
            <Text></Text>
            <Text></Text>

            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Start Cash in Drawer</Text>
              <Text style={global.innersecTitle}>{drawerData.start_cash_drawer}</Text>
            </View>
            <Text></Text>
            <Text></Text>

            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Shilft opened</Text>
              <Text style={global.innersecTitle}>{drawerData.shift_opened}</Text>
            </View>

            <Text></Text>
            <Text></Text>

            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Shilft opened by</Text>
              <Text style={global.innersecTitle}>Admin</Text>
            </View>



            
          </View>

          <View style={[global.commonWhitebg, {marginVertical: 35 ,borderRadius:11}]}>
            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Total sale (Cash)</Text>
              <Text style={global.innersecTitle}>{
drawerData.total_sale}</Text>
            </View>
            <Text></Text>
            <Text></Text>
            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Total Paid in</Text>
              <Text style={global.innersecTitle}>{
drawerData.total_paid_in}</Text>
            </View>
            <Text></Text>
            <Text></Text>
            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Total Paid Out</Text>
              <Text style={[global.innersecTitle,]}>{
drawerData.total_paid_out}</Text>
            </View>
            <Text></Text>
            <Text></Text>

            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Expected in Drawer</Text>
              <Text style={global.innersecTitle}>{drawerData.expected_in_drawer}</Text>
            </View>
          </View>

          <View style={global.commonFlexrow_bt}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Shiftpaid', {
                  Title: 'Paid In',
                  flag: '1',
                })
              }
              style={[
                global.commonTwocol,
                global.commonButton,
                {backgroundColor: '#fff',borderRadius:11 ,height:50},
              ]}>
              <Text style={global.btnText2}>Paid In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Shiftpaid', {
                  Title: 'Paid Out ',
                  flag: '2',
                })
              }
              style={[
                global.commonTwocol,
                global.commonButton,
                {backgroundColor: '#fff',borderRadius:11 ,height:50},
              ]}>
              <Text style={global.errorText}>Paid Out</Text>
            </TouchableOpacity>
          </View> 

          <View style={{marginTop: 35}}>
            <TouchableOpacity
              style={[global.commonButton,{height:55 ,borderRadius:11}]}
              onPress={() => setmodalVisible(true)}>
              <Text style={[global.btnText1,{letterSpacing:1}]}>CLOSE SHIFT</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        </ScrollView>

    

<View  style={{backgroundColor:"#fff" ,justifyContent:"center",alignItems:"center",borderTopWidth:1 ,borderTopColor:"#DADADA"}} >

<View style={[{  width:
              findDevicetype.isTab === 'Tablet'
                ? windowWidth /1.2
                : windowWidth  ,padding:7 }]}>

<View style={global.commonFlexrowa_ar}>
<TouchableOpacity style={{justifyContent:"center",alignItems:"center"}}>

<Image source={require('../../Images/posicon.png')} style={[global.settingIcon,{tintColor:"#144693"}]}/>

<Text style={[global.commonTextblue,{marginTop:6}]}>Shift</Text>

</TouchableOpacity>


<TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} onPress={()=>navigation.navigate('Shifthistory')}>

<Image source={require('../../Images/iconclocks.png')} style={global.settingIcon}/>

<Text style={[global.commonTextblack,{marginTop:6}]}>History</Text>

</TouchableOpacity>


</View>
</View>
</View>









      {/* <View style={[global.commonWhitebg,global.commonFlexrowa_ar]}>



<TouchableOpacity style={{justifyContent:"center"}}>
<Image  source={require('../../Images/customer.png')} style={global.settingIcon}/>
    <Text>Shift</Text>


</TouchableOpacity>



<TouchableOpacity style={{justifyContent:"center" ,alignItems:"center"}}>
<Image  source={require('../../Images/clock.png')} style={global.settingIcon}/>

    <Text>History</Text>
</TouchableOpacity>



</View> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={[
            global.commonModalbg,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <View
            style={[global.commonWhitebg, {borderRadius: 9}, global.ModalBox]}>
            <Text
              style={[
                global.commonTextblueH1,
                {textAlign: 'center'},
                global.bottomSpacing,
              ]}>
              Start Cash in Drawer
            </Text>

            <Text
              style={[
                global.commonTextblack,
                {textAlign: 'center'},
                global.bottomSpacing,
              ]}>
              Enter amount of cash in drawer
            </Text>

            <View
              style={[
                global.inputBox,

                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#144692',
                  borderWidth: 2,
                },
              ]}>
              <TextInput
                style={[global.input, {paddingRight: 10}]}
                onChangeText={onChangeNumber}
                placeholder="0.00"
                placeholderTextColor="#D1D1D1"
                value={number}
                keyboardType="decimal-pad"
              />
            </View>

            <Text></Text>

            <TouchableOpacity style={  number===''?global.commmonDiasbletn :global.commonButton  }   onPress={()=>onCloseDrawer()} 
            
            disabled={number==='' ? true :false}>



              <Text style={[global.btnText1,{marginRight:11}]}>Save</Text>


              {loader ? <ActivityIndicator color="#fff"/> : null}




            </TouchableOpacity>

            <View style={{position: 'absolute', left: 0, top: 0}}>
              <TouchableOpacity onPress={() => setmodalVisible(false)}>
                <Image
                  source={require('../../Images/closeicon.png')}
                  style={{width: 40, height: 40}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal></View> : null}




    </SafeAreaView>
  );
}
