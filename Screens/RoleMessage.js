import React from 'react'
import { View ,Text ,Alert ,SafeAreaView} from 'react-native'
import {global} from '../styles/global'



const RoleMessage = () => {	

    
	return (
        <View style={global.blockView}>
	<View  style={{justifyContent:"flex-end",flex:1 ,padding:10}}

	>

<View style={[global.appBgcolor,{padding:10 ,justifyContent:"center",alignItems:"center",borderRadius:4}]}>

<Text style={[global.commonTextwhite,{fontSize:18,marginBottom:4} ,global.commonBold]}>
    
     No Permission</Text>
   <Text style={[global.commonTextwhite,global.commonBold]}>You do not have permission to access </Text>



   </View>

</View>

</View>

	);
	};



    export default RoleMessage



