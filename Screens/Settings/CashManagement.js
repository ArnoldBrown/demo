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
  Switch,Alert ,Pressable
} from 'react-native'; 
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import {API_Links} from '../Api/Api';
import uuid from 'react-native-uuid';
import Customloader from '../Customloader';
import {settingsAction} from '../../action/settingsAction'
import { useSelector ,useDispatch} from 'react-redux'
import IncomeCategories from './IncomeCategories'
import Expensecategories from './Expensecategories'
import  AuthId  from '../AuthId.style'





export default function Addcategory({navigation ,route ,checkDevicetype ,posDrawer  ,

  OpenIncomeCategoreis,
              
  icomemodel,

  OpenExpenseCategoreis,

  expenseModel



}) {



  const getsettingReducer = useSelector(state => state.settingReducer);
const {appSettings ,settingsloader } = getsettingReducer;

console.log("appSettingsappSettings",appSettings)


const shopName = useSelector(state => state.shopnameReducer);
  
const {groceryName} = shopName;



const[loader,setLoader]=useState(false)

const [isEnabled, setIsEnabled] =useState(appSettings.pos_drawer==="1" ? true : false )


const dispatch = useDispatch()


  


  const updateDrawer =()=>{


 let promise = new Promise((resolve ,reject)=>{
 
  setLoader(true)
  
  resolve(setIsEnabled(previousState => !previousState));

})

promise.then(()=>{
  

  var data = new FormData();
  data.append('name','pos_drawer'); 
  data.append('status',appSettings.pos_drawer==="1" ? 2 : 1); 

  fetch( groceryName === "" ? API_Links.BASE_URL + API_Links.UPDATE_DRAWER_STATUS : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.UPDATE_DRAWER_STATUS
  , {

    method: 'POST',
    headers: {
      'consumer-key': API_Links.CONSUMER_KEY,
      'consumer-secret':API_Links.SECRET_KEY,
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
      dispatch(settingsAction())

setLoader(false)

      Alert.alert(
        data.message,
        "",
        [
          
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );



    })

    .catch((e)=>console.log(e))








})
  
   


  




  



    
  
  }










  const [text, onChangeText] = useState('');

  const findDevicetype = DeviceType();

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {findDevicetype.isTab === 'Tablet' ? null : (
        <View style={global.commonMobileHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}> Cash Management</Text>
<View></View>
         
        </View>
      )}

      <View style={global.commonLightbg}>


{icomemodel  ||expenseModel ?   null :

<View style={{flex:1}}>
        <View
          style={[
          
            global.commonlineWrapper,
            
          ]}>
          {/* <View style={[global.commonFlexrow_ct, global.flexLine]}>
            <Text style={global.commonTextblue}>Show icon cash drawer</Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View> */}

          <View style={[global.commonFlexrow_ct]}>
            <Text style={global.commonTextblueH1}>Enable</Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={updateDrawer}
              value={isEnabled}
            />
          </View>
        </View>

        <View
          style={[
           
            global.boxlineWrapper,
            global.topSpacing,
          ]}>
          <Pressable style={[global.commonFlexrow_ct ,global.boxLists]} onPress={()=>global.Dimensionwidth < 468 ? navigation.navigate('IncomeCategories'): OpenIncomeCategoreis()}>
            <Text style={global.commonTextblueH1}>Income Categories</Text>

            <Image
              source={require('../../Images/angleRight.png')}
              style={global.settingIcon}
            />
          </Pressable>

          <Pressable style={[global.commonFlexrow_ct, global.boxLists ,{borderBottomWidth:0}]}
          
          onPress={()=>global.Dimensionwidth < 468 ? navigation.navigate('Expensecategories'): OpenExpenseCategoreis()}
          
          
          
          >
            <Text style={global.commonTextblueH1}>Expense Categories</Text>

            <Image
              source={require('../../Images/angleRight.png')}
              style={global.settingIcon}
            />
          </Pressable>



        </View>
        </View>
  }
        




{icomemodel  ?  


<IncomeCategories/>


  : null}





{expenseModel  ? <Expensecategories/>  : null}



        
      </View>

{loader ? <Customloader/>: null}




    </SafeAreaView>
  );
}
