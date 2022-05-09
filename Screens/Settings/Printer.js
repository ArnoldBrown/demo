import React ,{useState}from 'react'
import { View ,Text ,TouchableOpacity ,SafeAreaView ,StatusBar ,Image,Switch} from 'react-native'
import {global} from '../../styles/global'
import DeviceType from '../Orientation/DeviceType'



export default function Printer({navigation}) {


    const findDevicetype =DeviceType()

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    return (    
        <SafeAreaView  style={global.commonBg}>


{findDevicetype.isTab==="Tablet" ?  null  :
<View style={global.commonMobileHeader}>

<TouchableOpacity onPress={()=>navigation.goBack()}>
<Image
            source={require('../../Images/left-arrow.png')}
            style={global.headBackarrow}
          />

</TouchableOpacity>





<Text style={global.headTitle}>Printer</Text>


<TouchableOpacity>

<Text style={global.headSvbtn}>Add Printer</Text>

</TouchableOpacity>



</View>
}
<View style={global.commonLightbg}> 


<View style={[global.commonWhitebg ,global.bottomSpacing ,global.commonFlexrow_ct ,global.commonlineWrapper]}>


<Text style={global.commonTextblackH1}>Use bluetooth scanner</Text>

<Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

</View>

<Text></Text>

<View style={[global.commonWhitebg ,{alignItems:"center" ,height:40 ,justifyContent:"center"} ,global.commonlineWrapper ]}>


<TouchableOpacity style={global.flexRowsec}>

<Image
            source={require('../../Images/plus.png')}
            style={{width:15 ,height:15 ,marginRight:8}}
          />


<Text  style={global.commonTextblueH1}>Add Printer</Text>





</TouchableOpacity>


</View>






</View>






        </SafeAreaView>
    )
}
