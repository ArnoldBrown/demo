import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {cart_COD_action} from '../../action/Cartatction';

import AuthId from '../AuthId.style';

import {global} from '../../styles/global';

export default function Cash({payAmount, onChangepayAmount, checkboxState}) {
  return (
    <View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={global.bigOtext_2}>Enter your Amount</Text>

        <Text style={[global.commonTextblueH1, {marginVertical: 10}]}>
          To Continue Payment.
        </Text>
      </View>

      <View style={[{marginBottom: 8}, global.flexRowsec]}>
        <View
          style={[
            {
              flex: 0.1,
              backgroundColor: '#fff',
              padding: 10,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
            },
            global.colleftBorder,
          ]}>
          <Text style={[global.H1, global.commonText]}>RM</Text>
        </View>
        <View style={[{flex: 0.9}, global.inputBox, global.colrightBorder]}>
          <TextInput
            onChangeText={onChangepayAmount}
            value={payAmount}
            placeholder="Amount"
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      {/* <View   style={[{backgroundColor:"#fff" },global.commonborder]}>

<View style={[global.commonFlexrow_ct,{backgroundColor:"#ECECEC",borderBottomWidth:1 ,borderColor:"#DBDBDB"}]}>

  
  <TouchableOpacity style={[global.cashbutton_head1]}  onPress={()=>onclear()}>

  <Text style={[global.commonText,global.bigOtext_2,]}>Clear</Text>


  </TouchableOpacity>
  
  
  


  <TouchableOpacity  style={[global.cashbutton_head2]} onPress={()=>onSlice()}>
  <Text style={[global.commonText,global.bigOtext_2,]}>x</Text>


  </TouchableOpacity>

  <TouchableOpacity  style={[global.cashbutton_head3,{}]} onPress={()=>onSubmitvalue(1000) }>
  <Text style={[global.commonText,global.bigOtext_2,]}>1000</Text>


  </TouchableOpacity>



</View>


<View style={[global.commonFlexrow_ct ,{}]} onPress={()=>onSubmitvalue(7)}>

<TouchableOpacity  style={global.cashCalcbody}>
<Text style={[global.commonText,global.bigOtext_2,]}>7</Text>
</TouchableOpacity>

<TouchableOpacity style={global.cashCalcbody} onPress={()=>onSubmitvalue(8)}>
<Text style={[global.commonText,global.bigOtext_2,]}>8</Text>
</TouchableOpacity>

<TouchableOpacity style={global.cashCalcbody} onPress={()=>onSubmitvalue(9)}>
<Text style={[global.commonText,global.bigOtext_2,]}>9</Text>
</TouchableOpacity>

<TouchableOpacity style={[global.cashCalcbody,{backgroundColor:"#ECECEC"}]} onPress={()=>onSubmitvalue(500)}>
<Text style={[global.commonText,global.bigOtext_2,{}]}>500</Text>
</TouchableOpacity>



</View>



<View style={[global.commonFlexrow_ct]} onPress={()=>onSubmitvalue(4)}>

<TouchableOpacity style={global.cashCalcbody}>
<Text style={[global.commonText,global.bigOtext_2,]}>4</Text>
</TouchableOpacity>
<TouchableOpacity style={global.cashCalcbody} onPress={()=>onSubmitvalue(5)}>
<Text style={[global.commonText,global.bigOtext_2,]}>5</Text>
</TouchableOpacity>

<TouchableOpacity style={global.cashCalcbody} onPress={()=>onSubmitvalue(6)}>
<Text style={[global.commonText,global.bigOtext_2,]}>6</Text>
</TouchableOpacity>
<TouchableOpacity style={[global.cashCalcbody,{backgroundColor:"#ECECEC"}]} onPress={()=>onSubmitvalue(100)}>
<Text style={[global.commonText,global.bigOtext_2,]}>100</Text>
</TouchableOpacity>



</View>


<View style={[global.commonFlexrow_ct]} onPress={()=>onSubmitvalue(1)}>
<TouchableOpacity style={global.cashCalcbody}>
<Text style={[global.commonText,global.bigOtext_2,]}>1</Text>
</TouchableOpacity>
<TouchableOpacity style={global.cashCalcbody} onPress={()=>onSubmitvalue(2)}>
<Text style={[global.commonText,global.bigOtext_2,]}>2</Text>
</TouchableOpacity>

<TouchableOpacity style={global.cashCalcbody} onPress={()=>onSubmitvalue(3)}>
<Text style={[global.commonText,global.bigOtext_2,]}>3</Text>
</TouchableOpacity>
<TouchableOpacity style={[global.cashCalcbody,{backgroundColor:"#ECECEC"}]} onPress={()=>onSubmitvalue(50)}>
<Text style={[global.commonText,global.bigOtext_2,]}>50</Text>
</TouchableOpacity>



</View>

<View style={[global.commonFlexrow_ct ,{borderBottomWidth:1,borderColor:"#E7E7E7"}]} onPress={()=>onSubmitvalue(0)}>
<TouchableOpacity style={[global.cashbutton_head1]}>

  <Text style={[global.commonText,global.bigOtext_2,]}>0</Text>


  </TouchableOpacity>
  
  
  


  <TouchableOpacity  style={[global.cashbutton_head2]}>
  <Text style={[global.commonText,global.bigOtext_2,]}>.</Text>


  </TouchableOpacity>

  <TouchableOpacity  style={[global.cashbutton_head3,{backgroundColor:"#ECECEC"}]} onPress={()=>onSubmitvalue(20)}>
  <Text style={[global.commonText,global.bigOtext_2,]}>20</Text>


  </TouchableOpacity>






</View>


</View>
 */}
    </View>
  );
}
