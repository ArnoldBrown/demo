import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import React from 'react';
import {global} from '../../styles/global';
import RNPickerSelect from 'react-native-picker-select';

export default function Inventory({navigation}) {
  return (
    <SafeAreaView style={[global.commonBg, {borderRadius: 11}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/angleLeft.png')}
            style={global.settingIcon}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Inventory</Text>

        {/* <TouchableOpacity>
        <Text style={global.headSvbtn}>Save</Text>
      </TouchableOpacity> */}

        <View></View>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView
          contentContainerStyle={[
            global.formSection,
            {width: 450, maxWidth: '100%'},
          ]}
          showsVerticalScrollIndicator={false}>
          <View>
            <View style={[global.bottomSpacing]}>
              <View>
                <View style={global.inputBox}>
                  <RNPickerSelect
                    onValueChange={value => [console.log(value)]}
                    style={{
                      placeholder: {color: '#b6b9bd'},
                      inputIOS: {color: '#000'},
                      inputAndroid: {color: '#000'},
                    }}
                    placeholder={{
                      label: 'Products*',
                      value: '',
                    }}
                    items={[
                      {label: 'Test3', value: 0},
                      {label: 'Test4', value: 1},
                      {label: 'Test44', value: 2},
                    ]}
                  />
                </View>
              </View>
            </View>

            <View style={global.flexLine}>
              <Text style={global.commonTextblueH1}>Add Stock</Text>
            </View>

            <View style={[global.formFlexwrap, global.bottomSpacing]}>
              <View style={[global.commonTwocol]}>
                <TextInput
                  style={[global.inputBox]}
                  placeholder="Current Stock"
                  placeholderTextColor="#b6b9bd"
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={[global.commonTwocol]}>
                <View style={global.inputBox}>
                  <RNPickerSelect
                    style={{
                      placeholder: {color: '#b6b9bd'},
                      inputIOS: {color: '#000'},
                      inputAndroid: {color: '#000'},
                    }}
                    placeholder={{
                      label: 'Stock Type',
                      value: '',
                    }}
                    onValueChange={value => [console.log(value)]}
                    items={[
                      {label: 'Active', value: 1},
                      {label: 'Inactive', value: 0},
                    ]}
                  />
                </View>
              </View>
            </View>

            <View style={[global.formFlexwrap, global.bottomSpacing]}>
              <View style={[global.commonTwocol]}>
                <TextInput
                  style={[global.inputBox]}
                  placeholder="Enter stock"
                  placeholderTextColor="#b6b9bd"
                  keyboardType="number-pad"
                />
              </View>

              <View style={[global.commonTwocol]}>
                <TextInput
                  style={[global.inputBox, {paddingRight: 10}]}
                  placeholder="Reference"
                  placeholderTextColor="#b6b9bd"
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={global.flexLine}>
              <Text style={global.commonTextblueH1}>Manage Min/Max Level</Text>
            </View>

            <View style={[global.formFlexwrap, global.bottomSpacing]}>
              <View style={[global.commonTwocol]}>
                <TextInput
                  style={[global.inputBox]}
                  placeholder="Min Level*"
                  placeholderTextColor="#b6b9bd"
                  keyboardType="number-pad"
                />
              </View>

              <View style={[global.commonTwocol]}>
                <TextInput
                  style={[global.inputBox, {paddingRight: 10}]}
                  placeholder="Max Level*"
                  placeholderTextColor="#b6b9bd"
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <TouchableOpacity>
              <View style={global.commonButton}>
                {/* <Image
                source={require('../../Images/plus.png')}
                style={{width: 12, height: 12, marginRight: 6}}
              /> */}
                <Text style={global.btnText1}>Add Stock</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
