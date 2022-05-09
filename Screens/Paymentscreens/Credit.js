import React from 'react'
import {View,Text,TouchableOpacity ,Image ,TextInput} from 'react-native'
import {global} from '../../styles/global';
import  AuthId  from '../AuthId.style'



export default function Credit() {
    return (
       <View>


       
<View style={[global.inputBox, {marginBottom: 8} ,global.flexRowsec]}>
<View style={{flex:0.1}}>
<Text style={[global.H1,global.commonText]}>KHR</Text>
</View>
<View style={{flex:0.9}}>

<TextInput style={[global.input,{textAlign:"right"}]}  keyboardType="decimal-pad" />

</View>
</View>

<View style={[global.inputBox, {marginBottom: 8} ,global.flexRowsec]}>
<View style={{flex:0.6,}}>
<Text style={[global.H1,global.commonText]}>Card Number (Last 4 digits)</Text>
</View>
<View style={{flex:0.4}}>

<TextInput style={[global.input,{textAlign:"right"}]} maxLength={4}  keyboardType="number-pad"  placeholder="XXXX-XXXX-XXXX"/>

</View>
</View>



          <View style={global.payCardsec1}>
            <View style={global.commonFlexrow_bt}>
              <View
                style={{
                  width: '48%',
                  marginHorizontal: 4,
                  borderColor: '#E7E7E7',
                  borderWidth: 1,
                  padding: 6,
                  flexDirection: 'row',
                }}>
                <View  style={global.deliveryIcon}>
<Image
                  source={require('../../Images/paypal.png')}
                 style={{width:"100%",height:"100%"}}  resizeMode="contain"
                  />

</View>
                <View style={{marginLeft: 6}}>
                  <Text style={global.commonTextblue}>SBI</Text>
                  <Text style={global.commonText}>WELFARE</Text>
                </View>
              </View>
              <View
                style={{
                  width: '48%',
                  marginHorizontal: 4,
                  borderColor: '#E7E7E7',
                  borderWidth: 1,
                  padding: 6,
                }}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                <View  style={global.deliveryIcon}>
<Image
                  source={require('../../Images/paypal.png')}
                 style={{width:"100%",height:"100%"}}  resizeMode="contain"
                  />

</View>
                  <View style={{marginLeft: 6}}>
                    <Text style={global.commonTextblue}>SBI</Text>
                    <Text style={global.commonText}>WELFARE</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>


          </View>
    )
}
