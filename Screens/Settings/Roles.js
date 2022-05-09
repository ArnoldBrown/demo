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
  StatusBar,Switch ,FlatList
} from 'react-native'; 
import {global} from '../../styles/global';
import DeviceInfo from 'react-native-device-info';
import FlatlistEmpty from '../FlatlistEmpty'
import {useDispatch ,useSelector} from 'react-redux';

import {manageAction} from '../../action/manageAction'





export default function Roles({navigation ,onCloseroles}) {


    const dispatch = useDispatch()
    const getToken = useSelector(state => state.loginReducer);
    const { casherId} = getToken;

    const getAdminroles = useSelector(state => state.manageReducer);
    const {adminRole} = getAdminroles;

    const shopName = useSelector(state => state.shopnameReducer);
    const {groceryName} = shopName;





  const [checkDevicetype, setDevicetype] = React.useState(' ');
  const [checkprice, onCheckprice] = React.useState(false);

  const [text, onChangeText] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);



  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


 


useEffect(() => {
    

    dispatch(manageAction(casherId , groceryName))



    return () => {
        
    }
}, [  ])



const renderItem = ({ item }) => (
    

 <View >
    
    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Dashboard View</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.dashboard_view  ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.dashboard_view ===1 ?  true :false}
      />

    
    </View>

    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Categories View</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.categories_view ===1  ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.categories_view ===1 ?  true :false}
      />

    
    </View>

  

    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Categories Update</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.categories_update ===1  ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.categories_update ===1 ?  true :false}
      />

    
    </View>

    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Categories Delete</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.categories_delete ==1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.categories_delete ===1 ?  true :false}
      />

    
    </View>

    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Categories create</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.categories_create ==1   ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.categories_create ===1 ?  true :false}
      />

    
    </View>


    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Products View</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.products_view ===1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.products_view ===1 ?  true :false}
      />

    
    </View>


    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Products Create</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.products_create ===1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.products_create ===1 ?  true :false}
      />

    
    </View>


    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Product Update</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.products_update ===1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.products_update ===1 ?  true :false}
      />

    
    </View>

    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Product Delete</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.products_delete ===1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.products_delete ===1 ?  true :false}
      />

    
    </View>


    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Customers View</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.customers_view ===1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.customers_view ===1 ?  true :false}
      />

    
    </View>



    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Customers Create</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.customers_create ===1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.customers_create ===1 ?  true :false}
      />

    
    </View>



    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Customers Update</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.customers_update ===1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.customers_update ===1 ?  true :false}
      />

    
    </View>


    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Customers Delete</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.customers_delete ===1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.customers_delete ===1 ?  true :false}
      />

    
    </View>
      
      


    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Orders View</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.orders_view ===1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.orders_view ===1 ?  true :false}
      />

    
    </View>
        
    <View style={[global.commonFlexrow_ct, global.flexLine]}>
    <Text>Orders Confirm</Text>
   
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.orders_confirm ===1 ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={item.orders_confirm ===1 ?  true :false}
      />

    
    </View>
        

  
  
        
        
   


    
    
    
    </View>  




  );


  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={()=>  global.Dimensionwidth > 468 ? onCloseroles():   navigation.goBack()}     >
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}> Cashier Roles</Text>

       <View></View>
      </View>


      <View style={[global.innerSecwhitebg,{backgroundColor:"#fff"}]}>

    
      <FlatList
        data={adminRole}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />

    

    
    
   


  
    
    
    
    
    




  
    
  
    
    
    
    


    





      </View>
    </SafeAreaView>
  );
}
