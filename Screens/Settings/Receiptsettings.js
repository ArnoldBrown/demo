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
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import Preview from './Preview';

export default function Receiptsettings({
  navigation,
  openPeview,

  previewModel,
}) {
  const [isEnabledLogo, setIsEnabledLogo] = useState(false);
  const toggleSwitchLogo = () => setIsEnabledLogo(previousState => !previousState);

  const [isEnabledQueue, setIsEnabledQueue] = useState(false);
  const toggleSwitchQueue = () => setIsEnabledQueue(previousState => !previousState);

  const [isEnabledBarcode, setIsEnabledBarcode] = useState(false);
  const toggleSwitchBarcode = () => setIsEnabledBarcode(previousState => !previousState);

  const [isEnabledPaf, setIsEnabledPaf] = useState(false);
  const toggleSwitchPaf = () => setIsEnabledPaf(previousState => !previousState);

  const [isEnabledPoaf, setIsEnabledPoaf] = useState(false);
  const toggleSwitchPoaf = () => setIsEnabledPoaf(previousState => !previousState);


  const [text, onChangeText] = useState('');
  const [textFooter2, onChangeTextFooter2] = useState('');

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
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Receipt</Text>

          <View
            style={[
              global.flexRowsec,
              {justifyContent: 'space-between'},
            ]}></View>
        </View>
      )}

      {previewModel ? null : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: '#F1F6FA'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#F1F6FA',
              paddingBottom: 30,
            }}>
            <View style={global.boxlineWrapper}>
              <View style={{paddingHorizontal: 11}}>
                <View style={[global.boxLists]}>
                  <Text style={global.commonTextblue}>Print shop logo </Text>

                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabledLogo ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchLogo}
                    value={isEnabledLogo}
                  />
                </View>

                <View style={[global.boxLists]}>
                  <Text style={global.commonTextblue}>Show queue </Text>

                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabledQueue ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchQueue}
                    value={isEnabledQueue}
                  />
                </View>

                {/* <View style={[global.commonFlexrow_ct, global.flexLine]}>
          <View >
<View></View>
</View>

<View  style={[global.commonTwocol,{width:"65%"}]}>

<View style={[global.inputBox]}>
              <TextInput
                style={[global.input,{textAlign:"right"}]}
                onChangeText={onChangeText}
                placeholder="(mobile no./id card/tax id)"
                placeholderTextColor="#D1D1D1"
                value={text}
              />
            </View>


<View style={[global.inputBox,{marginTop:11}]}>
              <TextInput
                style={[global.input,{textAlign:"right"}]}
                onChangeText={onChangeText}
                placeholder="Account name"
                placeholderTextColor="#D1D1D1"
                value={text}
              />
            </View>


</View>
            




       
          </View>
 */}

                <View style={[global.boxLists]}>
                  <Text style={global.commonTextblue}>Show barcode </Text>

                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabledBarcode ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchBarcode}
                    value={isEnabledBarcode}
                  />
                </View>

                <View style={[global.boxLists]}>
                  <Text style={global.commonTextblue}>Print after finish </Text>

                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabledPaf ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchPaf}
                    value={isEnabledPaf}
                  />
                </View>

                <View style={[global.boxLists, {borderBottomWidth: 0}]}>
                  <Text style={global.commonTextblue}>
                    Print order after finish{' '}
                  </Text>

                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabledPoaf ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchPoaf}
                    value={isEnabledPoaf}
                  />
                </View>
              </View>
            </View>

            <View
              style={[
                global.boxlineWrapper,
                {paddingVertical: 0, marginTop: 30},
              ]}>
              <View style={{paddingHorizontal: 11}}>
                <View style={global.boxLists}>
                  <View style={{width: '30%'}}>
                    <Text style={global.commonTextblue}>Footer 1</Text>
                  </View>

                  <View style={[global.inputBox, {width: '70%', height: 44}]}>
                    <TextInput
                      style={[global.input, {textAlign: 'right'}]}
                      onChangeText={onChangeText}
                      placeholderTextColor="#D1D1D1"
                      value={text}
                    />
                  </View>
                </View>

                <View style={[global.boxLists, {borderBottomWidth: 0}]}>
                  <View style={{width: '30%'}}>
                    <Text style={global.commonTextblue}>Footer 2</Text>
                  </View>

                  <View style={[global.inputBox, {width: '70%', height: 44}]}>
                    <TextInput
                      style={[global.input, {textAlign: 'right'}]}
                      onChangeText={onChangeTextFooter2}
                      placeholderTextColor="#D1D1D1"
                      value={textFooter2}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={[
                global.commonWhitebg,
                {paddingVertical: 0, marginTop: 30},
              ]}>
              <View style={[global.commonFlexrow_ct, global.flexLine]}>
                <View style={{width: '30%'}}>
                  <Text style={global.commonTextblue}>Footer image1</Text>
                </View>

                <TouchableOpacity
                  style={[
                    global.commonTwocol,
                    {
                      height: 90,
                      width: '40%',
                      borderWidth: 1,
                      borderColor: '#E7E7E7',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <View
                    style={{
                      width: 90,
                      height: 90,
                      backgroundColor: '#eee',
                      padding: 1,
                    }}>
                    <Image
                      source={require('../../Images/_placeholder.jpeg')}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={[global.commonFlexrow_ct, global.flexLine]}>
                <View style={{width: '30%'}}>
                  <Text style={global.commonTextblue}>Footer image2</Text>
                </View>

                <TouchableOpacity
                  style={[
                    global.commonTwocol,
                    {
                      height: 90,
                      width: '40%',
                      borderWidth: 1,
                      borderColor: '#E7E7E7',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <View
                    style={{
                      width: 90,
                      height: 90,
                      backgroundColor: '#eee',
                      padding: 1,
                    }}>
                    <Image
                      source={require('../../Images/_placeholder.jpeg')}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              global.boxlineWrapper,
              {height: 42, justifyContent: 'center', alignItems: 'center'},
            ]}
            onPress={() =>
              global.Dimensionwidth > 468
                ? openPeview()
                : navigation.navigate('Preview')
            }>
            <View style={global.transpardentButton}>
              <Text style={global.btnText2}>Preview</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}

      {previewModel ? <Preview /> : null}
    </SafeAreaView>
  );
}
