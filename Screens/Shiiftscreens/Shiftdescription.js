import React, {useState ,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,

} from 'react-native';
import {global} from '../../styles/global';

export default function Shiftdescription({navigation ,route ,

  round ,shiftOpened,
  shiftOpenedname,
  shiftClosed,
  shiftclosedName,
  startcashDrawer,
  totalpaidIn,
  totalpaidOut,
  actualinDrawer,
  expectedDrawer,
  difference,
  totalSale,} ) {





console.log("shiftOpened",shiftOpened)












  return (
    <SafeAreaView style={global.commonBg}>
 

  {global.Dimensionwidth > 468 ? null :
      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={global.headBackarrow}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Descriptions</Text>

        <View></View>
      </View>}

<ScrollView contentContainerStyle={{flexGrow:1 , backgroundColor:"#eeeeee63" }}  showsVerticalScrollIndicator={false}>




      <View style={[{padding: 15, alignItems: 'center' }]}>
        <View
          style={{
            flex: 1,
            width: "100%"
             
            
            ,paddingHorizontal:11
          }}>
          <View style={[global.commonWhitebg,{borderRadius:11 ,marginVertical:18}]}>
            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Round</Text>
            <Text style={global.innersecTitle}>{ global.Dimensionwidth > 468 ? round :route.params.round}</Text>
            </View>
            <Text></Text>
            <Text></Text>

            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Start Cash in Drawer</Text>
  
              <Text style={global.innersecTitle}>{ global.Dimensionwidth > 468 ?startcashDrawer : route.params.start_cash_drawer    }</Text>
            </View>
            <Text></Text>
            <Text></Text>


            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Shilft opened</Text>
              <Text style={global.innersecTitle}>{  global.Dimensionwidth > 468 ? shiftOpened  : route.params.shift_opened}</Text>
            </View>

            <Text></Text>
            <Text></Text>

            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Shilft opened by</Text>
              <Text style={global.innersecTitle}>{  global.Dimensionwidth > 468 ? shiftOpenedname : route.params.shift_opened_name}</Text>
            </View>


            <Text></Text>
            <Text></Text>
<View style={global.commonFlexrow_bt}>
  <Text style={global.commonTextblue}>Shilft Closed </Text>
  <Text style={global.innersecTitle}>{   global.Dimensionwidth > 468  ?  shiftClosed  :  route.params.shift_closed}</Text>
</View>


<Text></Text>
            <Text></Text>

<View style={global.commonFlexrow_bt}>
  <Text style={global.commonTextblue}>Shilft closed by</Text>
  <Text style={global.innersecTitle}>{ global.Dimensionwidth > 468   ? shiftclosedName  : route.params.shift_opened_name}</Text>
</View>




          </View>






           <View style={[global.commonWhitebg, {marginVertical: 18 ,borderRadius:11}]}> 
          <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Total sale (Cash)</Text>
              <Text style={global.innersecTitle}>{
   global.Dimensionwidth > 468  ? totalSale :   route.params.total_sale}</Text>
            </View>
            <Text></Text>
            <Text></Text>

            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Total Paid in</Text>
              <Text style={global.innersecTitle}>{
  global.Dimensionwidth > 468  ? totalpaidIn  : route.params.total_paid_in}</Text>
            </View>
            <Text></Text>
            <Text></Text>

            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Total Paid Out</Text>
              <Text style={global.innersecTitle}>{
    global.Dimensionwidth > 468  ? totalpaidOut  :  route.params.total_paid_out}</Text>
            </View>

            <Text></Text>
            <Text></Text>

            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Actual in Drawer</Text>
              <Text style={global.innersecTitle}>{
    global.Dimensionwidth > 468  ?  actualinDrawer   : route.params.actual_in_drawer}</Text>
            </View>

            <Text></Text>
            <Text></Text>


            <View style={global.commonFlexrow_bt}>
              <Text style={global.commonTextblue}>Expected in Drawer</Text>
              <Text style={global.innersecTitle}>{ global.Dimensionwidth > 468  ?   expectedDrawer  : route.params.expected_in_drawer}</Text>
            </View>


            <Text></Text>
            <Text></Text>


<View style={global.commonFlexrow_bt}>
  <Text style={global.commonTextblue}>Difference</Text>
  <Text style={[global.innersecTitle,{color:"red"}]}>{ global.Dimensionwidth > 468  ?   difference  : route.params.difference}</Text>
</View>


          </View> 






          {/* <View style={global.commonFlexrow_bt}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Shiftpaid', {
                  Title: 'Paid In',
                  flag: '1',
                })
              }
              style={[
                global.commonTwocol,
                global.commonButton,
                {backgroundColor: '#fff'},
              ]}>
              <Text style={global.btnText2}>Paid In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Shiftpaid', {
                  Title: 'Paid Out ',
                  flag: '2',
                })
              }
              style={[
                global.commonTwocol,
                global.commonButton,
                {backgroundColor: '#fff'},
              ]}>
              <Text style={global.errorText}>Paid Out</Text>
            </TouchableOpacity>
          </View> */}

       
        </View>
      </View>



      </ScrollView>




      {/* <View style={[global.commonWhitebg,global.commonFlexrowa_ar]}>



<TouchableOpacity style={{justifyContent:"center"}}>
<Image  source={require('../../Images/customer.png')} style={global.settingIcon}/>
    <Text>Shift</Text>


</TouchableOpacity>



<TouchableOpacity style={{justifyContent:"center" ,alignItems:"center"}}>
<Image  source={require('../../Images/clock.png')} style={global.settingIcon}/>

    <Text>History</Text>
</TouchableOpacity>



</View> */}

      





    </SafeAreaView>
  );
}
