import React,{useState} from 'react'
import{View,Text,TouchableOpacity,TextInput ,Image } from 'react-native'
import {global} from '../../styles/global';


export default function Delivery() {
    const [checkservice, onCheckservicecharge] = React.useState(false);
    const [checkSelling, oncheckSelling] = React.useState(false);

    return (




        
<View>

<View style={[global.inputBox, {marginBottom: 8} ,global.flexRowsec]}>
<View style={{flex:0.4,}}>
<Text style={[global.H1,global.commonText]}>Order No</Text>
</View>
<View style={{flex:0.6}}>

<TextInput style={[global.input,{textAlign:"right"}]} maxLength={4}  keyboardType="number-pad"  placeholder="Optional"/>

</View>
</View>


<View style={[global.commonWhitebg]}>


 <View >
            <View style={[global.checkBoxWrapper, {width: '50%'},global.bottomSpacing]}>
              <TouchableOpacity
                onPress={() => onCheckservicecharge(!checkservice)}>
                <View
                  style={
                    checkservice
                      ? global.customCheckbox
                      : global.customCheckboxdisable
                  }>
                  {checkservice ? (
                    <Image
                      source={require('../../Images/tick.png')}
                      style={[{width: 15, height: 15},{tintColor:"#fff"}]}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              </TouchableOpacity>

              <Text style={global.commonTextblue}>Pay with Provider</Text>
            </View>

            <View style={[global.checkBoxWrapper,]}>
              <TouchableOpacity onPress={() => oncheckSelling(!checkSelling)}>
                <View
                  style={
                    checkSelling
                      ? global.customCheckbox
                      : global.customCheckboxdisable
                  }>
                  {checkSelling ? (
                    <Image
                      source={require('../../Images/tick.png')}
                      style={[{width: 15, height: 15},{tintColor:"#fff"}]}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              </TouchableOpacity>

              <Text style={global.commonTextblue}>Pay with cash</Text>
            </View>
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
                  flexDirection: 'row',alignItems:"center"
                }}>
         <View  style={global.deliveryIcon}>
<Image
                  source={require('../../Images/paypal.png')}
                 style={{width:"100%",height:"100%"}}  resizeMode="contain"
                  />

</View>
                <View style={{marginLeft: 6}}>
                 
                  <Text style={global.commonTextblue}>Grab Food</Text>
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
                <TouchableOpacity style={{flexDirection: 'row',alignItems:"center"}}>
<View  style={global.deliveryIcon}>
<Image
                  source={require('../../Images/paypal.png')}
                 style={{width:"100%",height:"100%"}}  resizeMode="contain"
                  />

</View>
                

                  <View style={{marginLeft: 6}}>
                    <Text style={global.commonTextblue}>Grab Food</Text>
                    
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View> 
          </View>
    )
}
