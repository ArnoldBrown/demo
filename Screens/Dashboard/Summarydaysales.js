import React,{useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import moment from 'moment';
import {global} from '../../styles/global';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import  AuthId  from '../AuthId.style'





export default function Summarydaysales({navigation}) {

const[ isDatePickerVisible ,setPickervisible]=useState(false)




  return (
    <SafeAreaView style={global.commonBg}>
      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={global.headBackarrow}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Summary of daily sales</Text>

        <TouchableOpacity>
          <Text style={global.headSvbtn}>Print</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[global.flexRowsec, {backgroundColor: '#F1F6FA', padding: 15}]}>
        <Text style={[global.commonTextblack, {marginRight: 11}]}>
          Select date{' '}
        </Text>
        <TouchableOpacity onPress={()=>setPickervisible(true)}>
          <Text style={[global.commonTextblue]}>24 july 2021 </Text>
        </TouchableOpacity>
      </View>

      <View style={[global.commonWhitebg, {flex: 1}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[global.H1, {textAlign: 'center'}]}>Shooer</Text>

          <Text
            style={[global.H1, {textAlign: 'center'}, global.bottomSpacing]}>
            Summary of daily sales
          </Text>

          <View
            style={{
              height: 1,
              borderRadius: 1,
              width: '100%',
              borderStyle: 'dotted',
              borderWidth: 1,
              borderColor: '#000',
            }}></View>

          <View
            style={[
              global.commonFlexrow_bt,
              {marginBottom: 11},
              global.topSpacing,
            ]}>
            <Text style={[global.H1, {}]}>Date:24/03/2021</Text>

            <Text style={[global.H1, {}]}>Headquarters</Text>
          </View>
          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>POS#:001</Text>
            <Text style={[global.H1, {}]}>Cashier:Admin</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Invoice No:-</Text>
            <Text style={[global.H1, {}]}></Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Bill count :0</Text>
            <Text style={[global.H1, {}]}></Text>
          </View>

          <View
            style={{
              height: 1,
              borderRadius: 1,
              width: '100%',
              borderStyle: 'dotted',
              borderWidth: 1,
              borderColor: '#000',
            }}></View>

          <View
            style={[
              global.commonFlexrow_bt,
              {marginBottom: 11},
              global.topSpacing,
            ]}>
            <Text style={[global.H1, {}]}>Total(incl-Tax)</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Total(incl-Tax)</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Value before VAT</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Service charge</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Total Tax 7%</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Total</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View
            style={{
              height: 1,
              borderRadius: 1,
              width: '100%',
              borderStyle: 'dotted',
              borderWidth: 1,
              borderColor: '#000',
            }}></View>

          <View
            style={[
              global.commonFlexrow_bt,
              {marginBottom: 11},
              global.topSpacing,
            ]}>
            <Text style={[global.H1, {}]}>Payment</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Cash</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Credit card</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Coupon</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Krungsri Quick Pay</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Promptpay</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>

          <View style={[global.commonFlexrow_bt, {marginBottom: 11}]}>
            <Text style={[global.H1, {}]}>Delivery</Text>
            <Text style={[global.H1, {}]}>0.00</Text>
          </View>
        </ScrollView>
      </View>


      <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onCancel={()=>setPickervisible(false)}
            headerTextIOS="Pick a Date"
          />
    </SafeAreaView>
  );
}
