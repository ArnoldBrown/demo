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
  StatusBar,Switch
} from 'react-native';
import {global} from '../../styles/global';

export default function Expensecategories() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);  
const[text,onChangeText]=useState('')
 



  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
{global.Dimensionwidth > 468 ? null :
      <View style={global.commonHeader}>
        <TouchableOpacity>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Expensecategories</Text>






       

    

<View>

</View>
        

      </View>

}




<View style={global.commonLightbg}> 
<View style={[global.commonWhitebg,{paddingVertical:0}]}>


<View style={[global.commonFlexrow_ct,global.flexLinetext]}>

<Text style={global.commonTextblue}>显示顺序
</Text>






</View>



<View style={[global.commonFlexrow_ct,global.flexLinetext]}>

<Text style={global.commonTextblue}>测试</Text>






</View>

<View style={[global.commonFlexrow_ct,global.flexLinetext]}>

<Text style={global.commonTextblue}>测试</Text>






</View>



<View style={[global.commonFlexrow_ct,global.flexLinetext]}>

<Text style={global.commonTextblue}>测试数据</Text>






</View>





</View>
















</View>




      

    </SafeAreaView>
  );
}
