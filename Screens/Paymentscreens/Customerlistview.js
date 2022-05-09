import React, {useState, useEffect, PureComponent} from 'react';
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
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';
import {global} from '../../styles/global';

import AuthId from '../AuthId.style';

import {useSelector, useDispatch} from 'react-redux';
import Customloader from '../Customloader';
import ScanBarcode from '../ScanBarcode';

import {customerdataAction} from '../../action/Cartatction';

export default function Customerlistview({
  navigation,
  route,
  oncloseCustomermodel,
  onAddcustomer,
  onAddcustomerScan,
}) {
  const [text, onChangeText] = React.useState('');
  const [type, setType] = React.useState('Description');
  const [qrkModel, setQrmodel] = useState(false);
  const [loader, setLoader] = useState(false);

  const getCustomerlist = useSelector(state => state.customerListreducer);

  const {customerAarray} = getCustomerlist;
  const [checkDevicetype, setDevicetype] = React.useState(' ');

  //console.log("customerAarray",customerAarray)
  const oncloseQrmodel = () => {
    setQrmodel(false);
  };

  const dispatch = useDispatch();

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  // const getRandomColor = () => {
  //   let letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => dispatch(customerdataAction(item, navigation))}>
      <View
        style={[
          global.flexLine,
          global.flexRowsec,
          {backgroundColor: '#fff'},
          {padding: 14},
        ]}>
        <View
          style={[
            {
              width: 50,
              height: 50,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: generateColor(),
            },

            // global.appBgcolor,
          ]}>
          <Text style={[global.bigOtext_2, {color: '#fff'}]}>
            {item.first_name.charAt(0)}
          </Text>
        </View>
        <View style={{marginHorizontal: 11}}>
          <Text style={[global.commonTextblueH1, {marginBottom: 8}]}>
            {item.first_name}
          </Text>
          <Text style={global.commonText}>
            {item.country_code + item.phone}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const listEmptyComponent = () => {
    return (
      <View
        style={[
          {flex: 1, justifyContent: 'center', alignItems: 'center'},
          global.commonLightbg,
        ]}>
        <Text style={global.commonTextblueH1}>No Customers found</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        global.commonBg,
        global.Dimensionwidth > 468
          ? { borderRadius: 20,marginVertical:20,overflow:'hidden'}
          : {marginTop: 0, marginBottom: 0, borderRadius: 0},
      ]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={[global.commonMobileHeader, {padding: 15}]}>
        <TouchableOpacity
          onPress={() =>
            global.Dimensionwidth > 468
              ? oncloseCustomermodel()
              : navigation.goBack()
          }>
          {global.Dimensionwidth > 468 ? (
            // <Image
            //   source={require('../../Images/left-arrow.png')}
            //   style={{width: 20, height: 20}}
            // />
            <Text style={[global.headSvbtn, {color: '#FF0000'}]}>Cancel</Text>
          ) : (
            <Image
              source={require('../../Images/menu.png')}
              style={{width: 20, height: 20}}
            />
          )}
        </TouchableOpacity>

        <Text style={global.headTitle}>Select Customer...</Text>

        <TouchableOpacity
          onPress={() =>
            global.Dimensionwidth > 468
              ? onAddcustomer()
              : navigation.navigate('Addcustomer')
          }>
          <Image
            source={require('../../Images/edit.png')}
            style={{width: 16, height: 16, tintColor: '#144693'}}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          {
            flexDirection: 'column',
            flex: 1,
          },
          global.commonLightbg,
        ]}>
        <View
          style={[
            {
              width: '100%',
              borderRightWidth: 1,
              flex: 1,
            },
            global.borderR_width,
          ]}>
          <View style={{paddingHorizontal: 15, paddingVertical: 9}}>
            <View
              style={[
                global.headerSerach,
                // {position: 'relative', padding: 10},
              ]}>
              <Image
                source={require('../../Images/search.png')}
                style={[{tintColor: '#6D6E72'}, global.settingIcon]}
                resizeMode="contain"
              />

              <TextInput
                style={[global.input, {paddingHorizontal: 4}]}
                onChangeText={onChangeText}
                value={text}
                placeholder="Search by name or phone number"
              />

              <View style={{position: 'absolute', right: 0, marginRight: 5}}>
                <TouchableOpacity
                  onPress={() =>
                    global.Dimensionwidth > 468
                      ? onAddcustomerScan()
                      : navigation.navigate('ScanBarcode')
                   // setQrmodel(true)
                    //navigation.navigate('Barcodesearch')
                    

                  }>
                  <Image
                    source={require('../../Images/barcode-scanner.png')}
                    style={[
                      {
                        tintColor: '#144693',
                      },
                      global.settingIcon,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <FlatList
            data={customerAarray}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={listEmptyComponent()}
            contentContainerStyle={{flexGrow: 1, backgroundColor: '#f1f6fa6b'}}
          />
        </View>
      </View>

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
