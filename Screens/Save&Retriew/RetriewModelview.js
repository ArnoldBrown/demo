import React from 'react'
import Retriewproductlist from '../Save&Retriew/Retriewproductlist'
import RetriewList from '../Save&Retriew/RetriewList'
import {View ,Text ,SafeAreaView ,TouchableOpacity, ScrollView ,Image} from 'react-native'

import {global} from '../../styles/global';


export default function RetriewModelview({navigation ,onCloseretrievmodel ,route ,casherId }) {
    return (
       <View style={[global.commonBg ,{borderRadius:11 ,backgroundColor:"#EDEDED" ,overflow:"hidden"},global.commonBoxshadow]}>

<View style={[global.commonMobileHeader,{paddingVertical:18}]}>

<TouchableOpacity onPress={()=>onCloseretrievmodel()} >
<Image  source={require('../../Images/closeicon.png')} style={{width:35 ,height:35}}/>

</TouchableOpacity>
    <Text style={global.headTitle}>Retrieve</Text>

<Text></Text>
</View>

<View style={[global.flexRowsec,{flex:1}]}>
<View style={{width:"55%" ,borderRightWidth:2 ,borderRightColor:"#C2C2C2"}}>
<RetriewList navigation ={navigation} route={route} />

</View>
<View style={{width:"45%"}}>


    
  <Retriewproductlist navigation ={navigation} route={route}

  casherId={casherId} 
  
  
  /> 




</View>

</View>








       </View>
        
    )
}
