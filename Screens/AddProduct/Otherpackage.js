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
import DeviceType from '../Orientation/DeviceType'
import  AuthId  from '../AuthId.style'




export default function Otherpackage({navigation ,onClosestep2 }) {


  const [checkprice, onCheckprice] = React.useState(false);

  const [productname, setProductname] = React.useState('');

  const [price, setPrice] = React.useState('');

  const [barcode, setBarcode] = React.useState('');



  const findDevicetype =DeviceType()


  return (
    <SafeAreaView style={[global.commonBg,{borderRadius:11}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={()=> findDevicetype.isTab==="Tablet" ?  onClosestep2()  :    navigation.goBack()          }>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Other PLU</Text>

        <View></View>
      </View>

      <ScrollView
        contentContainerStyle={[global.formSection, {flexGrow: 1}]}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={[global.inputBox,global.bottomSpacing]}>
            <TextInput
              style={global.input}
              onChangeText={setProductname}
              value={productname}
              placeholder="Product Name"
              placeholderTextColor="#D1D1D1"
            />
          </View>

          

          
          <View style={[global.formFlexwrap,global.bottomSpacing]}>
            <View style={[global.inputBox, global.commonTwocol]}>
              <TextInput
                style={[global.input]}
                onChangeText={setPrice}
                value={price}
                placeholder="Price"
                placeholderTextColor="#D1D1D1"
                keyboardType="decimal-pad"
              />
            </View>

            <View
              style={[
                global.inputBox,
                global.commonTwocol,
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <TextInput
                style={[global.input, {width: '90%', paddingRight: 10}]}
                onChangeText={setBarcode}
                placeholder="Barcode"
                placeholderTextColor="#D1D1D1"
                value={barcode}
              />

              <View>
                <Image
                  source={require('../../Images/barcode-scanner.png')}
                  style={global.inputLabelicon}
                />
              </View>
            </View>
          </View>

          <View style={[global.formFlexwrap,global.bottomSpacing]}>
            <View style={[global.inputBox, global.commonTwocol]}>
              <TextInput
                style={[global.input]}
                onChangeText={setBarcode}
                placeholder="Barcode"
                placeholderTextColor="#D1D1D1"
                value={barcode}
              />
            </View>
          </View>


          <View style={global.checkBoxflex}>
            <View style={global.checkBoxWrapper}>
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
                      style={[{width: 15, height: 15},{tintColor:"#fff"}]}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              </TouchableOpacity>

              <Text style={global.commonTextblack}>Use step price</Text>
            </View>
          </View>

          
        </View>
      </ScrollView>

      <View style={global.flexBottomwrapper}>
        <TouchableOpacity>
          <View style={global.transparentButton}>
            <Image
              source={require('../../Images/plus.png')}
              style={{width: 12, height: 12, marginRight: 6}}
            />
            <Text style={global.btnText2}>Add PLU</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
