

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
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';

export default function Preview({navigation  }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [text, onChangeText] = useState('');

  const findDevicetype = DeviceType();

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      

{global.Dimensionwidth > 468 ? null :

        <View style={[global.commonHeader,{padding:15}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Preview</Text>

          <TouchableOpacity>
          <Text style={global.headSvbtn}>Print</Text>
          </TouchableOpacity>
        </View>
}

      <View style={[global.commonBg ,{backgroundColor:"#fff"}]}>
        <View style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
<View style={{paddingHorizontal:10,paddingTop:7}}>
<View style={{justifyContent:"center",alignItems:"center"}}>

<Text style={global.H1}>Grocery 24</Text>
<Text style={[global.H1,{marginVertical:8}]}>Tax ID :23</Text>
<Text style={global.H1}>Receipt/Tax Invoice(ABB)</Text>
</View>
<Text></Text>
<Text style={global.H1}>Branch: Headquarters</Text>
</View>



          
          <View style={[global.commonWhitebg, {}]}>
     <View style={global.dashedLine}></View>




<View  style={{paddingVertical:11}}>
<Text style={[global.H1,{}]}>Date : 21/09/20201</Text>
<Text style={[global.H1,{marginVertical:8}]}>Invoice #: 001</Text>

<View style={global.commonFlexrow_ct}>
<Text style={global.H1}>POS #: 001</Text>
<Text style={global.H1}>Cashier: Admin</Text>

</View>


</View>
<View style={global.dashedLine}></View>

<View style={{paddingVertical:11}}> 

<View style={global.commonFlexrow_ct}>

<Text style={[global.H1,{width:"15%"}]}>QTY</Text>

<Text style={[global.H1,{width:"55%"}]}>Descriptions</Text>


<Text style={[global.H1,{width:"30%",textAlign:"right"}]}>Total</Text>


</View>

<View style={[global.commonFlexrow_bt,{marginTop:7}]}>

<Text style={[global.H1,{width:"15%"}]}>2</Text>

<Text style={[global.H1,{width:"55%",paddingRight:11}]}>Brown Fish with  sauceage</Text>


<Text style={[global.H1,{width:"30%",textAlign:"right"}]}>23.00</Text>


</View>

</View>




<View style={global.dashedLine}></View>



            <View style={{paddingBottom:11}}>
              <View style={[global.commonFlexrow_bt, {marginVertical: 8}]}>
                <View></View>

                <View style={[global.commonFlexrow_bt, {width: '70%'}]}>
                  <Text
                    style={[
                      global.H1,
                      global.commonTwocol,
                      {textAlign: 'right'},
                    ]}>
                    Total(inc-Tax)
                  </Text>
                  <Text style={[global.H1]}>89.00</Text>
                </View>
              </View>

              <View style={[global.commonFlexrow_bt, {marginVertical: 8}]}>
                <View></View>

                <View style={[global.commonFlexrow_bt, {width: '70%'}]}>
                  <Text
                    style={[
                      global.H1,
                      global.commonTwocol,
                      {textAlign: 'right'},
                    ]}>
                    Total(non-Tax)
                  </Text>
                  <Text style={[global.H1]}>89.00</Text>
                </View>
              </View>

              <View style={[global.commonFlexrow_bt, {marginVertical:8}]}>
                <View></View>

                <View style={[global.commonFlexrow_bt, {width: '70%'}]}>
                  <Text
                    style={[
                      global.H1,
                      global.commonTwocol,
                      {textAlign: 'right'},
                    ]}>
                    Value before VAT
                  </Text>
                  <Text style={[global.H1,]}>89.00</Text>
                </View>
              </View>
              <View style={[global.commonFlexrow_bt, {marginVertical: 8}]}>
                <View></View>

                <View style={[global.commonFlexrow_bt, {width: '70%'}]}>
                  <Text
                    style={[
                      global.H1,
                      global.commonTwocol,
                      {textAlign: 'right'},
                    ]}>
                    Total Tax 7 %{' '}
                  </Text>
                  <Text style={[global.H1]}>89.00</Text>
                </View>
              </View>

              
<View style={global.commonFlexrow_ct}>
    <Text style={global.H1}>Counts 2 pcs</Text>
    <Text  style={global.H1}>Total 122.00</Text>

</View>
             


   
            </View>
            <View style={global.dashedLine}>

</View>


<View style={{paddingVertical:11}}>
<View style={global.commonFlexrow_ct}>
    <Text style={global.H1}>
        Payment
    </Text>

    <Text></Text>
</View>

<View style={[global.commonFlexrow_ct,{marginVertical:11}]}>
    <Text style={global.H1}>
        Cash
    </Text>

    <Text style={global.H1}>111.00</Text>
</View>
<View style={global.commonFlexrow_ct}>
    <Text style={global.H1}>
        Change
    </Text>

    <Text style={global.H1}>111.00</Text>
</View>



</View>


<View style={global.dashedLine}>

</View>




<View style={{justifyContent:"center",alignItems:"center",paddingVertical:11}}>
<Text style={global.H1}>Tax Included</Text>

<Text style={[global.H1,{marginVertical:11}]}>Testedfhihfiwhfiw</Text>


<Text style={global.H1}>Tel: 09393839-xxx-xxx</Text>

</View>



          </View>
          </ScrollView>
        </View>

  
        <View style={[global.commonWhitebg, {justifyContent: 'flex-end' ,alignItems:"center"}]}>
          <View style={global.commonFlexrow_bt}>
     

          <Text style={global.commonBold}>Powered by Grocery POS</Text>


          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

