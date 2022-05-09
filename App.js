import React, {useState, useEffect} from 'react';
import {View, Text, Modal, Dimensions} from 'react-native';
import Home from './Screens/Home/Home';
import Addproduct from './Screens/AddProduct/Addproduct';
import Otherpackage from './Screens/AddProduct/Otherpackage';
import Assignchoice from './Screens/AddProduct/Assignchoice';
import {Drawercontent} from './Screens/Customsidedrawer/Customdrawer';
import Selectedoption from './Screens/AddProduct/Selectedoption';
import CreateOptiongroup from './Screens/AddProduct/CreateOptiongroup';
import Selectproducts from './Screens/AddProduct/Selectproducts';
import Addcustomer from './Screens/AddCustomer.js/Addcustomer';
import Adduser from './Screens/AddCustomer.js/Adduser';
import Searchcustomer from './Screens/AddCustomer.js/Searchcustomer';
import Customerdescription from './Screens/AddCustomer.js/Customerdescription';
import Pay from './Screens/Paymentscreens/Pay';
import Cart from './Screens/Cart/Cart';

import Settings from './Screens/Settings/Settings';

import Addcategory from './Screens/Settings/Addcategory';

import Customerlist from './Screens/Settings/Customerlist';

import Addadmin from './Screens/Settings/Addadmin';

import Paymentsetting from './Screens/Settings/Paymentsetting';

import Othersettings from './Screens/Settings/Othersettings';

import Receiptsettings from './Screens/Settings/Receiptsettings';

import Managecategory from './Screens/Settings/Managecategory';

import Shiftdetail from './Screens/Shiiftscreens/Shiftdetail';

import Myaccount from './Screens/Settings/Myaccount';

import Shiftpaid from './Screens/Shiiftscreens/Shiftpaid';

import Stafflist from './Screens/Shiiftscreens/Stafflist';
import Staffpingenerate from './Screens/Shiiftscreens/Staffpingenerate';

import CashManagement from './Screens/Settings/CashManagement';

import Language from './Screens/Settings/Language';

import Datasync from './Screens/Settings/Datasync';

import IncomeCategories from './Screens/Settings/IncomeCategories';

import Expensecategories from './Screens/Settings/Expensecategories';

import DeliveryProvider from './Screens/Settings/DeliveryProvider';

import Manageproducts from './Screens/Settings/Manageproducts';

import Shop from './Screens/Settings/Shop';

import Billdescriptions from './Screens/Descriptions/Billdescriptions';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import Orientation from './Screens/Orientation/Orientation';

import Messsage from './Screens/Orientation/Messsage';
import DeviceInfo from 'react-native-device-info';
import DeviceType from './Screens/Orientation/DeviceType';
import Transactionlist from './Screens/TransactionList/Transactionlist';

import Barcodesearch from './Screens/Barcodesearch';

import Balance from './Screens/Balance';

import Productsalesreport from './Screens/Dashboard/Productsalesreport';

import Salestaxreport from './Screens/Dashboard/Salestaxreport';

import Paymentreport from './Screens/Dashboard/Paymentreport';

import Dashboard from './Screens/Dashboard/Dashboard';

import Summarydaysales from './Screens/Dashboard/Summarydaysales';

import Shiftpage from './Screens/Shiiftscreens/Shiftpage';

import Printer from './Screens/Settings/Printer';

import Table from './Screens/Dashboard/dwdw';

import Auth from './Screens/Authentication/Auth';
import Shifthistory from './Screens/Shiiftscreens/Shifthistory';

import AddOption from './Screens/AddProduct/AddOption';

import Purchasehistory from './Screens/AddCustomer.js/Purchasehistory';

import RetriewList from './Screens/Save&Retriew/RetriewList';

import Retriewproductlist from './Screens/Save&Retriew/Retriewproductlist';

import Discountcalc from './Screens/Save&Retriew/Discountcalc';

import Cartproductdiscount from './Screens/Save&Retriew/Cartproductdiscount';

import Preview from './Screens/Settings/Preview';

import Editcategory from './Screens/Settings/Editcategory';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {useSelector} from 'react-redux';

import Test from './Screens/Test';
import AddoptionField from './Screens/AddProduct/Addoptionfield';
import Editoption from './Screens/AddProduct/Editoption';

import Editcustomer from './Screens/AddCustomer.js/Editcustomer';

import Shiftdescription from './Screens/Shiiftscreens/Shiftdescription';

import Customerlistview from './Screens/Paymentscreens/Customerlistview';

import Unseenorder from './Screens/Unseenorder/Unseenorder';

import AddProductimage from './Screens/AddProduct/AddProductimage';

import Roles from './Screens/Settings/Roles';

import Editproduct from './Screens/AddProduct/Editproduct';

import Currency from './Screens/Settings/Currency';

import Purchasedescriptions from './Screens/AddCustomer.js/Purchasedescriptions';

import {global} from './styles/global';

import Mock from './Screens/Home/Mock';

import Customerdisplay from './Screens/Settings/Customerdisplay';

import FoodDelivery from './Screens/Settings/FoodDelivery';

import ChatModel from './Screens/Settings/ChatModel';

import CRMsystem from './Screens/Settings/CRMsystem';

import Inventory from './Screens/Settings/Inventory';

import Backup from './Screens/Settings/Backup';

import ScanBarcode from './Screens/ScanBarcode';

import InventoryMain from './Screens/Inventory/InventoryMain';

import InventoryTab from './Screens/Inventory/InventoryTab';
import StockIn from './Screens/Inventory/StockIn';
import StockOut from './Screens/Inventory/StockOut';
import AdjustStock from './Screens/Inventory/AdjustStock';
import CheckStock from './Screens/Inventory/CheckStock';




const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

export default function App() {
  const getToken = useSelector(state => state.loginReducer);

  const {status, casherId} = getToken;

  const DrawerLists = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{width: 150}}
        drawerType="slide"
        drawerContent={props => <Drawercontent {...props} />}>
        {/* <Drawer.Screen name="Mock" component={Mock} /> */}

        <Drawer.Screen name="Home" component={Home} />

        <Drawer.Screen name="Settings" component={Settings} />

        <Drawer.Screen name="Manageproducts" component={Manageproducts} />

        <Drawer.Screen name="Customerlist" component={Customerlist} />

        <Drawer.Screen name="Shiftdetail" component={Shiftdetail} />

        <Drawer.Screen name="Transactionlist" component={Transactionlist} />

        <Drawer.Screen name="Dashboard" component={Dashboard} />

        <Drawer.Screen name="Shifthistory" component={Shifthistory} />

        <Drawer.Screen
          name="Unseenorder"
          component={Unseenorder}></Drawer.Screen>
        <Drawer.Screen
          name="InventoryMain"
          component={InventoryMain}></Drawer.Screen>
      </Drawer.Navigator>
    );
  };

  const _deviceOrientation = Orientation();
  const [checkDevicetype, setDevicetype] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {(global.Dimensionwidth < 468 &&
        _deviceOrientation.isPortrait === true) ||
      (global.Dimensionwidth > 468 &&
        _deviceOrientation.isPortrait === false) ? (
        <NavigationContainer>
          {status === null ? (
            <Auth />
          ) : (
            <Stack.Navigator headerMode="none">
              <Stack.Screen
                name="DrawerLists"
                component={DrawerLists}></Stack.Screen>

              <Stack.Screen name="Cart" component={Cart}></Stack.Screen>
              <Stack.Screen
                name="Addproduct"
                component={Addproduct}></Stack.Screen>
              <Stack.Screen
                name="Otherpackage"
                component={Otherpackage}></Stack.Screen>
              <Stack.Screen
                name="Selectedoption"
                component={Selectedoption}></Stack.Screen>
              <Stack.Screen
                name="CreateOptiongroup"
                component={CreateOptiongroup}></Stack.Screen>
              <Stack.Screen
                name="Assignchoice"
                component={Assignchoice}></Stack.Screen>
              <Stack.Screen name="Pay" component={Pay}></Stack.Screen>
              <Stack.Screen
                name="Addcategory"
                component={Addcategory}></Stack.Screen>

              <Stack.Screen
                name="Manageproducts"
                component={Manageproducts}></Stack.Screen>

              <Stack.Screen
                name="Shiftdetail"
                component={Shiftdetail}></Stack.Screen>

              <Stack.Screen
                name="Stafflist"
                component={Stafflist}></Stack.Screen>

              <Stack.Screen
                name="Staffpingenerate"
                component={Staffpingenerate}></Stack.Screen>

              <Stack.Screen
                name="Searchcustomer"
                component={Searchcustomer}></Stack.Screen>

              <Stack.Screen
                name="Addcustomer"
                component={Addcustomer}></Stack.Screen>
              <Stack.Screen
                name="Customerdescription"
                component={Customerdescription}></Stack.Screen>

              <Stack.Screen name="Shop" component={Shop}></Stack.Screen>

              <Stack.Screen
                name="Receiptsettings"
                component={Receiptsettings}></Stack.Screen>

              <Stack.Screen
                name="Paymentsetting"
                component={Paymentsetting}></Stack.Screen>

              <Stack.Screen
                name="Myaccount"
                component={Myaccount}></Stack.Screen>

              <Stack.Screen name="Addadmin" component={Addadmin}></Stack.Screen>

              <Stack.Screen
                name="Billdescriptions"
                component={Billdescriptions}></Stack.Screen>

              <Stack.Screen
                name="DeliveryProvider"
                component={DeliveryProvider}></Stack.Screen>

              <Stack.Screen name="Language" component={Language}></Stack.Screen>
              <Stack.Screen name="Datasync" component={Datasync}></Stack.Screen>
              <Stack.Screen
                name="Othersettings"
                component={Othersettings}></Stack.Screen>

              <Stack.Screen
                name="Managecategory"
                component={Managecategory}></Stack.Screen>

              <Stack.Screen name="Balance" component={Balance}></Stack.Screen>

              <Stack.Screen
                name="Productsalesreport"
                component={Productsalesreport}></Stack.Screen>

              <Stack.Screen
                name="Summarydaysales"
                component={Summarydaysales}></Stack.Screen>

              <Stack.Screen
                name="Salestaxreport"
                component={Salestaxreport}></Stack.Screen>

              <Stack.Screen
                name="Paymentreport"
                component={Paymentreport}></Stack.Screen>

              <Stack.Screen name="Printer" component={Printer}></Stack.Screen>

              <Stack.Screen
                name="CashManagement"
                component={CashManagement}></Stack.Screen>

              <Stack.Screen
                name="Shiftpaid"
                component={Shiftpaid}></Stack.Screen>
              <Stack.Screen
                name="Shiftpage"
                component={Shiftpage}></Stack.Screen>

              <Stack.Screen
                name="AddOption"
                component={AddOption}></Stack.Screen>

              <Stack.Screen
                name="Selectproducts"
                component={Selectproducts}></Stack.Screen>

              <Stack.Screen
                name="Purchasehistory"
                component={Purchasehistory}></Stack.Screen>
              <Stack.Screen
                name="RetriewList"
                component={RetriewList}></Stack.Screen>
              <Stack.Screen
                name="Retriewproductlist"
                component={Retriewproductlist}></Stack.Screen>
              <Stack.Screen
                name="Discountcalc"
                component={Discountcalc}></Stack.Screen>
              <Stack.Screen
                name="Cartproductdiscount"
                component={Cartproductdiscount}></Stack.Screen>
              <Stack.Screen name="Preview" component={Preview}></Stack.Screen>
              <Stack.Screen
                name="Editcategory"
                component={Editcategory}></Stack.Screen>
              <Stack.Screen
                name="AddoptionField"
                component={AddoptionField}></Stack.Screen>
              <Stack.Screen
                name="Editoption"
                component={Editoption}></Stack.Screen>
              <Stack.Screen
                name="Editcustomer"
                component={Editcustomer}></Stack.Screen>
              <Stack.Screen
                name="Shiftdescription"
                component={Shiftdescription}></Stack.Screen>
              <Stack.Screen
                name="Customerlistview"
                component={Customerlistview}></Stack.Screen>
              <Stack.Screen
                name="AddProductimage"
                component={AddProductimage}></Stack.Screen>
              <Stack.Screen name="Roles" component={Roles}></Stack.Screen>
              <Stack.Screen
                name="Editproduct"
                component={Editproduct}></Stack.Screen>
              <Stack.Screen name="Currency" component={Currency}></Stack.Screen>
              <Stack.Screen
                name="Purchasedescriptions"
                component={Purchasedescriptions}></Stack.Screen>

              <Stack.Screen
                name="Customerdisplay"
                component={Customerdisplay}></Stack.Screen>

              <Stack.Screen
                name="IncomeCategories"
                component={IncomeCategories}></Stack.Screen>

              <Stack.Screen
                name="Expensecategories"
                component={Expensecategories}></Stack.Screen>

              <Stack.Screen
                name="FoodDelivery"
                component={FoodDelivery}></Stack.Screen>

              <Stack.Screen
                name="ChatModel"
                component={ChatModel}></Stack.Screen>

              <Stack.Screen
                name="CRMsystem"
                component={CRMsystem}></Stack.Screen>

              <Stack.Screen name="Backup" component={Backup}></Stack.Screen>

              <Stack.Screen
                name="ScanBarcode"
                component={ScanBarcode}></Stack.Screen>

              <Stack.Screen
                name="InventoryMain"
                component={InventoryMain}></Stack.Screen>

              <Stack.Screen
                name="InventoryTab"
                component={InventoryTab}></Stack.Screen>

              <Stack.Screen
                name="StockIn"
                component={StockIn}></Stack.Screen>

              <Stack.Screen
                name="StockOut"
                component={StockOut}></Stack.Screen>

              <Stack.Screen
                name="AdjustStock"
                component={AdjustStock}></Stack.Screen>

              <Stack.Screen
                name="CheckStock"
                component={CheckStock}></Stack.Screen>




            </Stack.Navigator>
          )}
        </NavigationContainer>
      ) : (
        <Messsage />
      )}
    </View>
  );
}

// import React from "react";
// import{StyleSheet,View,ActivityIndicator,FlatList,Text,TouchableOpacity,Image} from "react-native";
// //import { Icon } from "react-native-elements";
// //i//mport { enText } from "../lang/en";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       loading: false,
//       dataSource: [ ],
//      };
//   }
//   componentDidMount() {this.fetchData();}

//   fetchData = () => {

//     this.setState({loading: true});

//   fetch("https://jsonplaceholder.typicode.com/photos")
//     .then(response => response.json())
//     .then(responseJson => {

//         sq = responseJson.map(item => {
//         item.isSelect = false;
//         item.selectedClass = styles.list;

//         return item;
//       });

//       this.setState({
//         loading: false,
//         dataSource: sq,
//       });

//     }).catch(error => {this.setState({loading: false});
//    });
//   };

// FlatListItemSeparator = () => <View style={styles.line} />;

// selectItem = data => {
//   data.item.isSelect = !data.item.isSelect;
//   data.item.selectedClass = data.item.isSelect ? styles.selected : styles.list;

//   const index = this.state.dataSource.findIndex(
//     item => data.item.id === item.id
//   );

//   this.state.dataSource[index] = data.item;

//   this.setState({

//     dataSource: this.state.dataSource,
//   });

// };

// goToStore = () =>this.props.navigation.navigate("Expenses", {selected: this.state.selected,});

// renderItem = data =>
//   <TouchableOpacity
//     style={[styles.list, data.item.selectedClass]}
//     onPress={() => this.selectItem(data)}
//   >
//   <Image
//     source={{ uri: data.item.thumbnailUrl }}
//     style={{ width: 40, height: 40, margin: 6 }}
//   />
//   <Text style={styles.lightText}>  {data.item.title.charAt(0).toUpperCase() + data.item.title.slice(1)}  </Text>
// </TouchableOpacity>

// render() {

//   const itemNumber = this.state.dataSource.filter(item => item.isSelect).length;

// let ui = this.state.dataSource.filter(item => item.isSelect==true);

// console.log(ui,"whidiwdiwhdwvino")

//   if (this.state.loading) {return (
//     <View style={styles.loader}>
//      <ActivityIndicator size="large" color="purple" />
//     </View>
//   );
// }

//  return (
//    <View style={styles.container}>
//   {/* // <Text style={styles.title}>{enText.productsAvailable}</Text> */}
//    <FlatList
//      data={this.state.dataSource}
//     ItemSeparatorComponent={this.FlatListItemSeparator}
//     renderItem={item => this.renderItem(item)}
//     keyExtractor={item => item.id.toString()}
//     extraData={this.state}
//    />

//   <View style={styles.numberBox}>
//     <Text style={styles.number}>{itemNumber}</Text>
//   </View>

//   <TouchableOpacity style={styles.icon}>
//     <View>
//       {/* <Icon
//         raised
//         name="shopping-cart"
//         type="font-awesome"
//         color="#e3e3e3"
//         size={30}
//         onPress={() => this.goToStore()}
//         containerStyle={{ backgroundColor: "#FA7B5F" }}
//       /> */}
//     </View>
//  </TouchableOpacity>
// </View>
// );}}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#192338",
//     paddingVertical: 50,
//     position: "relative"
//    },
//   title: {
//     fontSize: 20,
//     color: "#fff",
//     textAlign: "center",
//     marginBottom: 10
//   },
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff"
//   },
//   list: {
//     paddingVertical: 5,
//     margin: 3,
//     flexDirection: "row",
//     backgroundColor: "brown",
//     justifyContent: "flex-start",
//     alignItems: "center",

//   },
//   lightText: {
//     color: "#f7f7f7",
//     width: 200,
//     paddingLeft: 15,
//     fontSize: 12
//    },
//   line: {
//     height: 0.5,
//     width: "100%",
//     backgroundColor:"rgba(255,255,255,0.5)"
//   },
//   icon: {
//     position: "absolute",
//     bottom: 20,
//     width: "100%",
//     left: 290,
//     zIndex: 1
//   },
//   numberBox: {
//     position: "absolute",
//     bottom: 75,
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     left: 330,
//     zIndex: 3,
//     backgroundColor: "#e3e3e3",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   number: {fontSize: 14,color: "#000"},
//   selected: {backgroundColor: "yellow"},
//   });
