import React,{useState} from 'react'
import {View,Text,ScrollView,SafeAreaView,StatusBar,Image,TouchableOpacity,Dimensions, Touchable, StyleSheet} from 'react-native'
import {global} from '../../styles/global';

const windowWidth = Dimensions.get('window').width;

export default function Stafflist({navigation}) {

const[Pin1 ,setPin1]=useState('')
const[Pin2 ,setPin2]=useState('')

const[Pin3 ,setPin3]=useState('')
const[Pin4 ,setPin4]=useState('')

const fg =(num1 )=>{

if(Pin1===''){
    setPin1(num1)

}
if(Pin1!=='' && Pin2 ==='' ){
    setPin2(num1)

}
if(Pin1!=='' && Pin2 !=='' && Pin3==='' ){
    setPin3(num1)

}

if(Pin1!=='' && Pin2 !=='' && Pin3!==''&& Pin4==='' ){
    setPin4(num1)

}


}


const oncancel =()=>{

    if(Pin1!=='' || Pin2 !=='' || Pin3!==''){
        setPin1('')
        setPin2('')
        setPin3('')
        setPin4('')
    }


}


  


    return (
       <SafeAreaView style={{flex:1,backgroundColor:"#424647"}}>

<StatusBar barStyle="light-content" backgroundColor="#424647"/>







   
        <View style={{paddingHorizontal:15 ,marginTop:30  ,alignItems:"center" ,justifyContent:"center"}}> 



<TouchableOpacity  >
<Text style={[global.commonTextwhiteH1,{color:"#fff"}]}>Enter PIN</Text>


</TouchableOpacity>









<Text style={[global.commonTextwhiteH1,{color:"#fff"},global.bottomSpacing ,global.topSpacing]}> Admin </Text>



<View style={[global.commonFlexrow_ct,global.bottomSpacing]}> 

<View style={[styles.pinBox, Pin1===''? '': global.activePin ]}>
<Text style={{color:"#fff" ,fontSize:30}} >{Pin1}</Text>
</View>
<View style={[styles.pinBox, Pin2===''? '': global.activePin ]}>
<Text style={{color:"#fff",fontSize:30}}>{Pin2}</Text>
</View>
<View style={[styles.pinBox, Pin3===''? '': global.activePin ]}>
<Text style={{color:"#fff",fontSize:30}}>{Pin3}</Text>
</View>
<View style={[styles.pinBox, Pin4===''? '': global.activePin ]}>
<Text style={{color:"#fff",fontSize:30}}>{Pin4}</Text>
</View>



</View>



<View style={global.touchPad}>

<View style={global.commonFlexrow_bt}>

<TouchableOpacity style={global.touchPadbtn}  onPress={()=>fg("1")}>

<Text style={[global.H1,{color:"#fff"}]}>1</Text>

</TouchableOpacity>

<TouchableOpacity style={[global.touchPadbtn,{marginHorizontal:15}]}  onPress={()=>fg("2")}>

<Text style={[global.H1,{color:"#fff"}]}>2</Text>

</TouchableOpacity>
<TouchableOpacity style={global.touchPadbtn }   onPress={()=>fg("3")}>

<Text style={[global.H1,{color:"#fff"}]}>3</Text>

</TouchableOpacity>




</View>


<View style={[global.commonFlexrow_bt,{marginVertical:11}]}>

<TouchableOpacity style={global.touchPadbtn}   onPress={()=>fg("4")}>

<Text style={[global.H1,{color:"#fff"}]}>4</Text>

</TouchableOpacity>

<TouchableOpacity style={[global.touchPadbtn,{marginHorizontal:15}]}>

<Text style={[global.H1,{color:"#fff"}]}>5</Text>

</TouchableOpacity>
<TouchableOpacity style={global.touchPadbtn}>

<Text style={[global.H1,{color:"#fff"}]}>6</Text>

</TouchableOpacity>




</View>


<View style={[global.commonFlexrow_bt,{marginBottom:11}]}>

<TouchableOpacity style={global.touchPadbtn}>

<Text style={[global.H1,{color:"#fff"}]}>7</Text>

</TouchableOpacity>

<TouchableOpacity style={[global.touchPadbtn,{marginHorizontal:15}]}>

<Text style={[global.H1,{color:"#fff"}]}>8</Text>

</TouchableOpacity>
<TouchableOpacity style={global.touchPadbtn}>

<Text style={[global.H1,{color:"#fff"}]}>9</Text>

</TouchableOpacity>




</View>


<View style={global.commonFlexrow_bt}>

<View style={[global.touchPadbtn,{backgroundColor:"transparent"}]}></View>

<TouchableOpacity style={[global.touchPadbtn,{marginHorizontal:15}]}>

<Text style={[global.H1,{color:"#fff"}]}>0</Text>

</TouchableOpacity>
<TouchableOpacity style={global.touchPadbtn} onPress={()=>oncancel()}>

<Text style={[global.H1,{color:"#fff"}]}>C</Text>

</TouchableOpacity>




</View>



</View>








        </View>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    pinBox:{width:30 ,height:30 ,borderWidth:1 ,borderColor:"#fff" ,borderRadius:50 ,marginHorizontal:11}






})