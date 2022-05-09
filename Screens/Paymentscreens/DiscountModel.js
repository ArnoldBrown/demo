import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { global } from '../../styles/global';
import { useDispatch, useSelector } from 'react-redux';

export default function DiscountModel({
  variation,

  setVariation,

  oncalculateDiscount,
  getClear,
  amount=0,
  setAmount,
}) {
  return (
    <View
      style={[
        global.commonModalbg,
        { justifyContent: 'center', alignItems: 'center', padding: 11 },
      ]}>
      <TouchableWithoutFeedback>
        <View
          style={[
            global.commonWhitebg,
            {
              padding: 0,
              borderRadius: 9,

              width:
                global.Dimensionwidth > 468
                  ? global.Dimensionwidth / 3.5
                  : global.Dimensionwidth / 1.2,
            },
          ]}>
          <View
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#E7E7E7',
            }}>
            <Text style={[global.commonTextblueH1, { textAlign: 'center' }]}>
              Discount
            </Text>
          </View>

          <View style={{ padding: 15 }}>
            <View style={global.commonFlexrow_ct}>
              {variation ? (
                <View></View>
              ) : (
                <Text style={[global.commonTextblueH1]}>Amount</Text>
              )}

              <View style={{ flexDirection: 'row', alignContent: 'flex-end' }}>
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



            <View style={[global.commonFlexrow_ct, { marginTop: 15 }]}>
              <TouchableOpacity
                onPress={() => setVariation(false)}
                style={{
                  backgroundColor: variation === true ? '#fff' : '#E7E7E7',
                  width: '50%',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 8,
                  borderColor: '#E7E7E7',
                }}>
                <Text>Amount</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setVariation(true)}
                style={{
                  backgroundColor: variation === true ? '#E7E7E7' : '#fff',
                  width: '50%',
                  borderWidth: 1,
                  paddingVertical: 8,
                  borderColor: '#E7E7E7',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>%</Text>
              </TouchableOpacity>
            </View>



            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20,
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                onPress={() => [setAmount('0'),setAmount(amount => amount.concat('5'))]}
                style={{
                  borderColor: 'blue',
                  borderWidth: 1,
                  borderRadius: 50,
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 14 }}>5%</Text>
              </TouchableOpacity>

              <TouchableOpacity
               onPress={() => [setAmount('0'),setAmount(amount => amount.concat('10'))]}
                style={{
                  borderColor: 'blue',
                  borderWidth: 1,
                  borderRadius: 50,
                  height: 48,
                  width: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 14 }}>10%</Text>
              </TouchableOpacity>

              <TouchableOpacity
               onPress={() => [setAmount('0'),setAmount(amount => amount.concat('15'))]}
                style={{
                  borderColor: 'blue',
                  borderWidth: 1,
                  borderRadius: 50,
                  height: 48,
                  width: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 14 }}>15%</Text>
              </TouchableOpacity>

              <TouchableOpacity
               onPress={() => [setAmount('0'),setAmount(amount => amount.concat('20'))]}
                style={{
                  borderColor: 'blue',
                  borderWidth: 1,
                  borderRadius: 50,
                  height: 48,
                  width: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 14 }}>20%</Text>
              </TouchableOpacity>
            </View>

            {/* <View
              style={[
                global.commonFlexrow_bt,
                {marginVertical: 10,
                flexWrap: 'wrap'},
              ]}> */}
            {/* {discountValues.map((e, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => getamount(e,'001')}
                      key={index}>
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginHorizontal: 5,
                          borderColor: '#144693',
                        }}>
                        <Text style={global.commonTextH1}>{e}%</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })} */}
            {/* </View> */}



            <View style={[global.commonFlexrow_ct]}>
              <TouchableOpacity
                onPress={() => setAmount(amount => amount.concat('1'))}>
                <View
                  style={{
                    width: 50,
                    height: 40,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.H1, global.COLOR_BLUE]}>1</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAmount(amount => amount.concat('2'))}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.H1, global.COLOR_BLUE]}>2</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAmount(amount => amount.concat('3'))}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.H1, global.COLOR_BLUE]}>3</Text>
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

            <View style={[global.commonFlexrow_ct]}>
              <TouchableOpacity
                onPress={() => setAmount(amount => amount.concat('4'))}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.H1, global.COLOR_BLUE]}>4</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAmount(amount => amount.concat('5'))}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.H1, global.COLOR_BLUE]}>5</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAmount(amount => amount.concat('6'))}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.H1, global.COLOR_BLUE]}>6</Text>
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

            <View style={[global.commonFlexrow_ct]}>
              <TouchableOpacity
                onPress={() => setAmount(amount => amount.concat('7'))}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.H1, global.COLOR_BLUE]}>7</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAmount(amount => amount.concat('8'))}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.H1, global.COLOR_BLUE]}>8</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAmount(amount => amount.concat('9'))}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.H1, global.COLOR_BLUE]}>9</Text>
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

            <View style={[global.commonFlexrow_ct]}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}></View>
              {/* <TouchableOpacity onPress={() => setAmount(amount => amount.concat('.'))} disabled={amount===''? true :false}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={[global.H1, global.COLOR_BLUE]}>.</Text>
                  </View>
                </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() => setAmount(amount => amount.concat('0'))}
                disabled={amount === '' ? true : false}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.H1, global.COLOR_BLUE]}>0</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => getClear(amount)}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../Images/icons8-left-arrow.png')}
                    style={global.commonIcon}
                  />
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



            <TouchableOpacity
              style={
                amount === '' ? global.commmonDiasbletn : global.commonButton
              }
              disabled={amount === '' ? true : false}
              onPress={() => oncalculateDiscount(amount)}>
              <Text style={global.btnText1}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
