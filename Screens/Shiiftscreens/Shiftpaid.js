import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Touchable,
  Dimensions,
  TextInput,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';

const windowWidth = Dimensions.get('window').width;

export default function Shiftpaid({navigation, route}) {
  const {Title, flag} = route.params;

  const [text, onChangeText] = useState('');
  const findDevicetype = DeviceType();

  return (
    <SafeAreaView style={global.commonBg}>
      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={global.headBackarrow}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>{Title}</Text>
        <View></View>
      </View>

      <View
        style={[
          global.commonBg,
          {       padding: 15, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <View
          style={{
            flex: 1,
            width:
              findDevicetype.isTab === 'Tablet'
                ? windowWidth / 1.9
                : windowWidth,
            paddingHorizontal: 15,
          }}>
          <View
            style={[
              global.commonWhitebg,
              {paddingVertical: 0, borderRadius: 10, marginBottom: 40},
            ]}>
            <View style={[global.commonFlexrow_ct, global.flexLine]}>
              <Text style={global.commonTextblue}>Amount</Text>

              <View style={[global.inputBox, {width: '65%'}]}>
                <TextInput
                  style={[global.input, {textAlign: 'right'}]}
                  onChangeText={onChangeText}
                  placeholderTextColor="#D1D1D1"
                  value={text}
                />
              </View>
            </View>

            <View
              style={[
                global.commonFlexrow_ct,
                global.flexLine,
                {borderBottomWidth: 0},
              ]}>
              <Text style={global.commonTextblue}>Category</Text>

              <TouchableOpacity
                style={[global.inputBox, {width: '65%', borderWidth: 0}]}>
                <Text style={[{textAlign: 'right'}, global.commonTextblack]}>
                  Choose Category
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[global.commonTextblack, {textAlign: 'center'}]}>
            Description
          </Text>
          <Text></Text>

          <View
            style={{
              height: 100,
              backgroundColor: '#fff',
              padding: 10,
              borderWidth: 1,
              borderColor: '#E7E7E7',
            }}></View>

          <View style={global.topSpacing}>
            <TouchableOpacity
              style={[
                global.commonButton,
                {backgroundColor: Title === 'Paid In' ? '#144692' : 'red'},
              ]}>
              <Text style={global.btnText1}> {Title}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
