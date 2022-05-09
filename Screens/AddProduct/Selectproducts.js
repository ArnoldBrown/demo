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
} from 'react-native';
import {global} from '../../styles/global';
import DeviceInfo from 'react-native-device-info';
import  AuthId  from '../AuthId.style'


export default function Selectproducts({navigation}) {
  const [checkDevicetype, setDevicetype] = React.useState(' ');
  const [checkprice, onCheckprice] = React.useState(false);

  const [text, onChangeText] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Select Product</Text>

        <TouchableOpacity>
          <Text style={global.headSvbtn}>Done</Text>
        </TouchableOpacity>
      </View>



      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{paddingVertical: 11}}>
          <View style={{paddingHorizontal: 15 ,flexDirection:"row" ,justifyContent:"space-between"  ,alignItems:"center"}}>

          <View
                style={[
                  global.headerSerach,
                  {
                    width: '90%',
                    height:40 
                  },
                ]}>
                <Image
                  source={require('../../Images/search.png')}
                  style={{width: 17, height: 17, tintColor: '#6D6E72'}}
                  resizeMode="contain"
                />

                <TextInput
                  style={[global.input, {paddingHorizontal: 4}]}
                  onChangeText={onChangeText}
                  value={text}
                  placeholder="Search"
                />
              </View>





<View>
<TouchableOpacity>
<Image source={require('../../Images/barcode-scanner.png')} style={global.settingIcon}/>


</TouchableOpacity>


</View>


          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 11,
                borderBottomWidth: 9,
                borderBottomColor: '#DADADA',
              }}>
              <View style={{paddingLeft: 15}}>
                <Text>Sort</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingRight: 15,
                }}>
                <TouchableOpacity
                  style={[
                    global.transparentButton,
                    {width: '44%', marginRight: 7},
                  ]}>
                  <Text style={global.btnText2}>Custom</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[global.commonButton, {width: '44%'}]}>
                  <Text style={global.btnText1}>Product Name</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={global.productListwrapper}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15, 
            }}>
            <View style={[global.commonTwocol, {width: '70%'}]}>
              <Text numberOfLines={1} style={global.headTitle}>
                Nescafeeit1e8te81e918`ye981ye98`1ye98`y1e98`9`et`9te{' '}
              </Text>
            </View>
            <View style={[global.commonTwocol, {width: '30%'}]}>
              <Text style={[{textAlign: 'right'}, global.commonText]}>
                Bottle{' '}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 11,
              paddingHorizontal: 15,
            }}>
            <View style={[global.checkBoxflex, {width: '10%'}]}>
              <TouchableOpacity onPress={() => onCheckprice(!checkprice)}>
                <View
                  style={
                    checkprice
                      ? global.customCheckbox
                      : global.customCheckboxdisable
                  }>
                  {checkprice ? (
                    <Image
                      source={require('../../Images/tick.png')}
                      style={[{width: 15, height:15},{tintColor:"#fff"}]}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',

                width: '75%',
              }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'red',
                  borderRadius: 6,
                }}></View>

              <View style={{paddingLeft: 11, width: '75%'}}>
                <Text
                  numberOfLines={2}
                  style={global.commonTextblue}
                  ellipsizeMode="tail">
                  Nescaafe premium band malaysia kumlpui
                </Text>
                <Text
                  numberOfLines={1}
                  style={[global.commonText, {marginTop: 5}]}
                  ellipsizeMode="tail">
                  y84742742747e2e2dwgdwhdwhdiwhdhwdiohwdwdio
                </Text>
              </View>
            </View>

            <View style={{width: '15%'}}>
              <Text style={{textAlign: 'right'}}>Bottle/1</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
