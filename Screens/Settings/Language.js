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
  Switch,
  ScrollViewBase,
  FlatList,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import RNRestart from 'react-native-restart'; // Import package from node modules

import uuid from 'react-native-uuid';
import {API_Links} from '../Api/Api';
import {useDispatch, useSelector} from 'react-redux';
import FlatlistEmpty from '../FlatlistEmpty';
import {
  languageAction,
  selectlanguageAction,
} from '../../action/languageAction';

export default function Language({navigation}) {
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const [text, onChangeText] = useState('');

  const findDevicetype = DeviceType();

  //const [locale, setLocale] = useState([ ]);

  const dispatch = useDispatch();

  const state = useSelector(state => state.languageReducer);
  const {locale, languageId} = state;

  const shopName = useSelector(state => state.shopnameReducer);
  const {groceryName} = shopName;





  const onChangelocale = async item => {
    await dispatch(selectlanguageAction(item ));

    setTimeout(() => {
      RNRestart.Restart();
    }, 1000);
  };

  const renderItem = ({item ,index}) => (
    <View style={{borderBottomWidth:1 ,padding:8 ,borderBottomWidth:index === locale.length - 1? 0 :1  ,height:40  ,  borderBottomColor: '#DADADA', backgroundColor:"#fff" }} >
      <TouchableOpacity
        style={[global.commonFlexrow_ct]}
        onPress={() => onChangelocale(item)}>
        <Text style={global.commonTextblue}>{item.name}</Text>

        {languageId === item.languages_id ? (
          <View>
            <Image
              source={require('../../Images/iconTick.png')}
              style={[global.iconColor,{width:30 ,height:30}]}
            />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {findDevicetype.isTab === 'Tablet' ? null : (
        <View style={global.commonMobileHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Language</Text>

          <View
            style={[
              global.flexRowsec,
              {justifyContent: 'space-between'},
            ]}></View>
        </View>
      )}


<View style={global.commonLightbg}> 
<View style={global.commonlineWrapper}>

<FlatList
       
        ListEmptyComponent={FlatlistEmpty}
        data={locale}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />


</View>

</View>

 


    </SafeAreaView>
  );
}
