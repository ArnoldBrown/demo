import React,{useState} from 'react'
import {View ,Text ,SafeAreaView ,StatusBar,TouchableOpacity ,Modal,Image} from 'react-native'
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';


export default function Discountcalc({navigation ,onClosediscountcalc}) {


  const findDevice= DeviceType()


    const [variation, setVariation] = useState(false);

    const [amount, setAmount] = useState('');

    const [discountValues, setDiscountvalues] = useState(['5', '10', '15', '20']);


    const getamount = (d, key) => {
        if (key === '001') {
          setAmount(d);
        } else {
          setAmount(amount => amount.concat(d));
        }
      };
    
      const getClear = () => {
    
          var str1 = amount;
    
          str1 = str1.substring(0, str1.length - 1);
    
          setAmount(str1);
        
      };


    return (

       <SafeAreaView  style={[global.commonWhitebg,{padding:0,flex:1 ,borderRadius:11 ,overflow:"hidden"}]} >
<StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>




          <View style={[global.commonWhitebg, {padding: 0, borderRadius: 9}]}>

            <View style={global.commonMobileHeader}>


            <TouchableOpacity onPress={() => findDevice.isTab!=='Tablet'?    navigation.goBack()  : onClosediscountcalc()   }>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={global.settingIcon}
            />
          </TouchableOpacity>




              <Text style={[global.commonTextblueH1, {textAlign: 'center'}]}>
                Discount
              </Text>
              <Text></Text>

            </View>




            <View style={{padding: 15}}>
              <View style={global.commonFlexrow_ct}>
                {variation ? (
                  <View></View>
                ) : (
                  <Text style={[global.commonTextblueH1]}>Amount</Text>
                )}

                <View style={{flexDirection: 'row', alignContent: 'flex-end'}}>
                  {variation ? (
                    <Text style={global.H1}>
                      {amount.length < 1 ? 0 : amount} %
                    </Text>
                  ) : (
                    <Text style={global.H1}>
                      {amount.length < 1 ? 0 : amount}
                    </Text>
                  )}
                </View>
              </View>
              <Text></Text>

              <View style={[global.commonFlexrow_ct,{}]}>

                <TouchableOpacity onPress={() => setVariation(false)} style={{backgroundColor: variation  === true ? '#fff' :'#E7E7E7'        ,width:"50%",borderWidth:1,justifyContent:"center",alignItems:"center" ,paddingVertical:8 ,borderColor:"#E7E7E7"}}>
                  <Text>Amount</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => setVariation(true)} style={{backgroundColor: variation  === true ? '#E7E7E7' :'#fff' ,width:"50%",borderWidth:1,paddingVertical:8 ,borderColor:"#E7E7E7",justifyContent:"center",alignItems:"center"}}>
                  <Text>%</Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  global.commonFlexrow_bt,
                  {marginVertical: 11, flexWrap: 'wrap'},
                ]}>
                {discountValues.map((e, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => getamount(e, '001')}
                      key={index}>
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginHorizontal: 5, borderColor:'#144693'
                        }}>
                        <Text style={global.commonTextH1}>{e}%</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={[global.commonFlexrow_bt,]}>
                <TouchableOpacity onPress={() => getamount('1')}>
                  <View
                    style={{
                      width: 50,
                      height: 40,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                     <Text style={[global.H1,global.COLOR_BLUE]}>1</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => getamount('2')}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Text style={[global.H1,global.COLOR_BLUE]}>2</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => getamount('3')}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Text style={[global.H1,global.COLOR_BLUE]}>3</Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>
              </View>

              <View style={[global.commonFlexrow_bt,]}>
                <TouchableOpacity onPress={() => getamount('4')}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                     <Text style={[global.H1,global.COLOR_BLUE]}>4</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => getamount('5')}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={[global.H1,global.COLOR_BLUE]}>5</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => getamount('6')}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Text style={[global.H1,global.COLOR_BLUE]}>6</Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>
              </View>

              <View style={[global.commonFlexrow_bt,]}>
                <TouchableOpacity onPress={() => getamount('7')}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Text style={[global.H1,global.COLOR_BLUE]}>7</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => getamount('8')}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                     <Text style={[global.H1,global.COLOR_BLUE]}>8</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => getamount('9')}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Text style={[global.H1,global.COLOR_BLUE]}>9</Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>
              </View>

              <View style={[global.commonFlexrow_bt,]}>
                <TouchableOpacity onPress={() => getamount('.')}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Text style={[global.H1,global.COLOR_BLUE]}>.</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => getamount('0')}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                     <Text style={[global.H1,global.COLOR_BLUE]}>0</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => getClear()}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    

<Image source={require('../../Images/icons8-left-arrow.png')} style={global.commonIcon}/>


                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>
              </View>


<TouchableOpacity style={global.commonButton}> 

<Text style={global.btnText1}>Done</Text>

  
</TouchableOpacity>



            </View>
          </View>
        
     








       </SafeAreaView>






    )
}
