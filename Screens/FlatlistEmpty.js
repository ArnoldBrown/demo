import React from 'react'
import { View ,Text} from 'react-native'
import {global} from '../styles/global'



const FlatlistEmpty = () => {	
	return (
	<View style={{flex:1 ,justifyContent:"center" ,alignItems:"center"}}

	>

<Text  style={global.commonTextblueH1}>No Data Found...</Text>





</View>



	);
	};



    export default FlatlistEmpty



