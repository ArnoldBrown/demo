// import React, { Component } from 'react'
// import 'react-native-gesture-handler'
// import { Root } from 'native-base'
// import { Platform, View, Text, TouchableOpacity, Alert,StatusBar,Linking} from 'react-native'
// import NetInfo from '@react-native-community/netinfo'
// import RNRestart from 'react-native-restart'
// import ImageLoad from './src/common/RnImagePlaceH'
// import store from './src/redux/store'
// import { Provider } from 'react-redux'
// import  Appp from './App'
// import { NetworkProvider, NetworkConsumer } from 'react-native-offline'
// import ThemeStyle from './src/common/Theme.style'
// import LottieView from 'lottie-react-native';
// import { checkVersion } from "react-native-check-version";
// import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";
// import DeviceInfo,{ getUniqueId, getManufacturer }  from 'react-native-device-info'
// import AlertModel from './src/screens/AlertModel'
// import { EventRegister } from 'react-native-event-listeners'
// import { ThemeColors } from 'react-navigation'
// import SyncStorage from 'sync-storage'
// import { getUrl, getHttp, postHttp } from './src/common/WooComFetch'
// import ActivityIndicatorModel from './src/screens/ActivityIndicatorModel'


// // const unsubscribe = store.subscribe(() => {
 
// //   console.log('store update, current state:');
// //   console.log('gettetetetetet',store.getState());
   
// // });



// export default class AppIndex extends Component {
  
//   CheckConnectivity = () => {
//     if (Platform.OS === 'android') {
//       NetInfo.fetch().then(state => {
//         if (state.isConnected) {
//         } else {
//           Alert.alert('Please connect to the internet')
//         }
//       })
//     } else {
//       // For iOS devices
//       NetInfo.addEventListener(
//         'connectionChange',
//         this.handleFirstConnectivityChange
//       )
//     }
//   };

//   handleFirstConnectivityChange = state => {
//     NetInfo.removeEventListener(
//       'connectionChange',
//       this.handleFirstConnectivityChange
//     )

//     if (state.isConnected === false) {
//       Alert.alert('Please connect to the internet')
//     } else {
//     }
//   };

//   constructor (props) {
//     super(props)
//      this.state = {
//       currentColor : ThemeStyle.primary,
//       isVersionCheck: false,
//       storeVersion: '',
//       environment: '',
//       isEnvironment: false
//     }
//   }
 
//   checkSiteSetting = async () => {
//   const settings = await getHttp(getUrl() + '/api/' + 'sitesetting', {})
  
  
//   console.log('settingssettingssettings',settings)
//   if (settings.data.success == 1) {
 
//     this.setState({
//       environment : settings.data.data.environmentt
//     })
    

//   this.setState({
//     isEnvironment : false
//   })

//   }else{

//     this.setState({
//       isEnvironment : false
//     })

//    }


 
 
// }
//  async componentDidMount () {

//   this.checkSiteSetting()
 
 
//   const version1 = DeviceInfo.getVersion();

//   const data = await SyncStorage.init()
 
//   const result = SyncStorage.get('currentColor');

//   if (result !== undefined) {
//     console.log('result inside app index',result)
//     this.setState({
//       currentColor: result
//     })
//   }
   

//    if (Platform.OS === 'android'){
//    //On Android u can do
// getAppstoreAppMetadata("com.platinumcode.foodheart") //put any apps packageId here
// .then(metadata => {
//   console.log(
//     "clashofclans android app version on playstore",
//     metadata.version);

//     this.setState({
//       storeVersion : metadata.version
//     })

//     if (version1 < metadata.version){

//       this.setState({
//         isVersionCheck: true
//       })
//       console.log('Need to Update Mathan')
     
//     }

//     console.log("published on",
//     metadata.currentVersionReleaseDate)
// })
// .catch(err => {
//   console.log("error occurred", err);
// });

//    }else{

//     console.log('iosios')
//      //https://apps.apple.com/us/app/coasapp-chats-calls-more/id1522145421
//     getAppstoreAppMetadata("1522145421") //put any apps id here
//     .then(appVersion => {
//       this.setState({
//         storeVersion : appVersion.version
//       })
//       console.log('appVersionappVersionappVersion',appVersion)
//       if (version1 < appVersion.version){

//         this.setState({
//           isVersionCheck: true
//         })
      
    
//         console.log('Need to Update Mathan')
       
//       }
//     })
//     .catch(err => {
//       console.log("error occurred", err);
//     });
//    }
//     this.CheckConnectivity()
//   }

//   render () {
//     return (
//       <Provider store={store}>
//         <NetworkProvider children={React.Node}>
//           {this.state.isVersionCheck === true ?

//            <AlertModel
//             title="NewVersion"
//             subTitle={this.state.storeVersion}
//             isVersion={this.state.isVersionCheck}
//            />
//           :

//           null

//           }
//           <NetworkConsumer>
//             {({ isConnected }) =>
//               isConnected ? (
//               this.state.environment === "Maintenance" ?

//               <View style={{ flex: 1, backgroundColor: ThemeStyle.backgroundColor }}>


//                 {this.state.isEnvironment === true ?
//                 <ActivityIndicatorModel/>
//                   :
//                   null
//                 }
//               {Platform.OS === 'ios' ? (
//                 <View style={{ height: 36, backgroundColor: this.state.currentColor }} />
//               ) : null}

//               <View
//                 style={{
//                   flex: 1,
//                   backgroundColor: ThemeStyle.backgroundColor,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   paddingBottom: 170
//                 }}
//               >

//             <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = {this.state.currentColor !== '' ? this.state.currentColor : ThemeStyle.primary} translucent = {true}/>

//                 {/* <ImageLoad
//                   key={'key'}
//                   style={{ width: 200, height: 200 }}
//                   loadingStyle={{ size: 'large', color: ThemeStyle.primary }}
//                   placeholderSource={require('./src/images/wifi.png')}
//                   placeholderStyle={{ width: 200, height: 300 }}
//                   source={require('./src/images/wifi.png')}
//                 /> */}

//               <View style={{width: 200,height:200 ,justifyContent:'center',alignItems:'center'}}>

//               <LottieView  source={require('./src/screens/maintenance.json')} autoPlay loop /> 
//               </View>
             

//                 <Text style={{ fontSize: 22,alignItems:'center',textAlign:'center' }}>
//                     Stop{'\n'}
//                     Site In Maintenance Mood{'\n'}
//                    Please Come Back Later!
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => {
//                     this.setState({
//                       isEnvironment : true
//                     })

//                     this.checkSiteSetting()
//                   }
//                 }
//                 >
//                   <View
//                     style={{
//                       marginTop: 18,
//                       borderColor:  this.state.currentColor !== '' ? this.state.currentColor : ThemeStyle.primary ,
//                       alignItems: 'center',
//                       height: 38,
//                       width: 90,
//                       backgroundColor:  this.state.currentColor !== '' ? this.state.currentColor : ThemeStyle.primary ,
//                       justifyContent: 'center'
//                     }}
//                   >
//                     <Text
//                       style={{
//                         textAlign: 'center',
//                         color: '#fff',
//                         fontSize: 15
//                       }}
//                     >
//                         Try Again
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>
//                :

//                <Root>
//                   <Appp />
//                 </Root>
              

//               ) : (
//                 <View style={{ flex: 1, backgroundColor: ThemeStyle.backgroundColor }}>
//                   {Platform.OS === 'ios' ? (
//                     <View style={{ height: 36, backgroundColor: this.state.currentColor }} />
//                   ) : null}

//                   <View
//                     style={{
//                       flex: 1,
//                       backgroundColor: ThemeStyle.backgroundColor,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       paddingBottom: 170
//                     }}
//                   >

//                 <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = {this.state.currentColor !== '' ? this.state.currentColor : ThemeStyle.primary} translucent = {true}/>

//                     {/* <ImageLoad
//                       key={'key'}
//                       style={{ width: 200, height: 200 }}
//                       loadingStyle={{ size: 'large', color: ThemeStyle.primary }}
//                       placeholderSource={require('./src/images/wifi.png')}
//                       placeholderStyle={{ width: 200, height: 300 }}
//                       source={require('./src/images/wifi.png')}
//                     /> */}

//                   <View style={{width: 200,height:200 ,justifyContent:'center',alignItems:'center'}}>

//                   <LottieView  source={require('./src/screens/no-internet.json')} autoPlay loop /> 
//                   </View>
                 

//                     <Text style={{ fontSize: 22 }}>
//                         No internet{'\n'}
//                         Try:{'\n'}
//                         Reconnecting to Wi-Fi
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() =>
//                         RNRestart.Restart()
//                       }
//                     >
//                       <View
//                         style={{
//                           marginTop: 18,
//                           borderColor:  this.state.currentColor !== '' ? this.state.currentColor : ThemeStyle.primary ,
//                           alignItems: 'center',
//                           height: 38,
//                           width: 90,
//                           backgroundColor:  this.state.currentColor !== '' ? this.state.currentColor : ThemeStyle.primary ,
//                           justifyContent: 'center'
//                         }}
//                       >
//                         <Text
//                           style={{
//                             textAlign: 'center',
//                             color: '#fff',
//                             fontSize: 15
//                           }}
//                         >
//                             Try Again
//                         </Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               )
//             }
//           </NetworkConsumer>
//         </NetworkProvider>
//       </Provider>
//     )
//   }
// }