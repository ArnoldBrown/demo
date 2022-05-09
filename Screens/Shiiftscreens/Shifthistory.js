import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StatusBarAnimation,
  SafeAreaView,
  Image,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import {global} from '../../styles/global';
import {API_Links} from '../Api/Api';
import uuid from 'react-native-uuid';
import {useSelector, useDispatch} from 'react-redux';
import Customloader from '../Customloader';
import DeviceInfo from 'react-native-device-info';
import Shiftdescription from './Shiftdescription';
import DeviceType from '../Orientation/DeviceType';
import  AuthId  from '../AuthId.style'

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();
const windowWidth = Dimensions.get('window').width;

export default function Shifthistory({navigation}) {
  const findDevicetype = DeviceType();

  const getToken = useSelector(state => state.loginReducer);

  const {casherId} = getToken;


  const shopName = useSelector(state => state.shopnameReducer);
  
  const {groceryName} = shopName;




  const [history, setHistory] = useState([]);

  const [loader, setLoader] = useState(false);

  const [checkDevicetype, setDevicetype] = React.useState(' ');

  const [selectedId, setSelectedId] = React.useState('');

  const [round, setRound] = React.useState('');
  const [shiftOpened, setshiftOpened] = React.useState(' ');
  
  const [shiftOpenedname, setshiftOpenedname] = React.useState(' ');
  const [shiftClosed, setshiftClosed] = React.useState(' ');
  const [shiftclosedName, setshiftClosedname] = React.useState(' ');
  const [startcashDrawer, setstartCashdrawer] = React.useState(' ');

  const [totalpaidIn, settotalPaidin] = React.useState(' ');
  const [totalpaidOut, settotalPaidout] = React.useState(' ');
  const [actualinDrawer, setactualinDrawer] = React.useState(' ');

  const [expectedDrawer, setexpectedDrawer] = React.useState(' ');

  const [difference, setDifference] = React.useState(' ');

  const [totalSale, setTotalSale] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoader(true);
      var data = new FormData();

      data.append('cashier_id', casherId);
      fetch( groceryName==="" ? API_Links.BASE_URL + API_Links.DRAWER_HISTORY :API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.DRAWER_HISTORY , {
        method: 'POST',
        headers: {
          'consumer-key': API_Links.CONSUMER_KEY,
          'consumer-secret': API_Links.SECRET_KEY,
          'consumer-nonce':
        AuthId._currDate.getMilliseconds().toString() +
        AuthId._currDate.getTime().toString() +
          '-' +
          Math.floor(Math.random() * 999) +
          1,
          'consumer-device-id':AuthId._currDeviceId,
         'consumer-ip':AuthId._currIp ,
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
        .then(response => response.json())
        .then(data => {
          setLoader(false);

          if (data.success === '0') {
            setHistory([]);
          } else {
            setHistory(data.data);

            let resultArray = data.data.map(e => e.result[0]);



            setSelectedId(resultArray[0].id);

            setRound(resultArray[0].round);

            setshiftOpened(resultArray[0].shift_opened);

            setshiftOpenedname(resultArray[0].shift_opened_name);

            setshiftClosed(resultArray[0].shift_closed);
            setshiftClosedname(resultArray[0].shift_closed_name);
            setstartCashdrawer(resultArray[0].start_cash_drawer);

            settotalPaidin(resultArray[0].total_paid_in);
            settotalPaidout(resultArray[0].total_paid_out);
            setactualinDrawer(resultArray[0].actual_in_drawer);

            setexpectedDrawer(resultArray[0].expected_in_drawer);

            setDifference(resultArray[0].difference);

            setTotalSale(resultArray[0].total_sale);
          }
        })

        .catch(e => {
          console.log(e);
        });
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const onSelectshift = (
    round,
    shift_openened,
    shift_opened_name,
    shift_closed,
    shift_closed_name,
    start_cash_drawer,
    total_paid_in,
    total_paid_out,

    actual_in_drawer,
    expected_in_drawer,
    difference,
    total_sale,
    id,
  ) => {
    setRound(round);

    setshiftOpened(shift_openened);

    setshiftOpenedname(shift_opened_name);

    setshiftClosed(shift_closed);

    setshiftClosedname(shift_closed_name);
    setstartCashdrawer(start_cash_drawer);

    settotalPaidin(total_paid_in);
    settotalPaidout(total_paid_out);
    setactualinDrawer(actual_in_drawer);

    setexpectedDrawer(expected_in_drawer);

    setDifference(difference);

    setTotalSale(total_sale);

    setSelectedId(id);
  };

  return (
    <SafeAreaView style={global.commonBg}>
      {global.Dimensionwidth > 468 ? (
        <View style={[global.tabHeader]}>
          <View style={global.tabHeadcol1}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={require('../../Images/menu.png')}
                style={[global.settingIcon]}
              />
            </TouchableOpacity>

            <Text style={global.headTitle}>History</Text>
            <View>
              <Text style={[global.headTitle, global.COLOR_BLUE]}></Text>
            </View>

            <TouchableOpacity >
          <Image
              source={require('../../Images/calendarIcon.png')}
              style={global.headBackarrow}
            />
            
            
            </TouchableOpacity>




            <View style={global.statusBarline}></View>
          </View>

          <View style={global.tabHeadcol2}>
            <View style={global.commonFlexrow_bt}>
              <View></View>

              <Text style={global.headTitle}>Description</Text>

              <View>
                <View style={global.flexRowsec}>
                  <TouchableOpacity>
                    <Text style={[global.appColor, {marginHorizontal: 20}]}>
                      Re Print
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={global.commonMobileHeader}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              source={require('../../Images/menu.png')}
              style={global.headBackarrow}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {history.length === 0 ? null : (
            <Text style={global.headTitle}>History</Text>
          )}


      <TouchableOpacity >
          <Image
              source={require('../../Images/calendarIcon.png')}
              style={global.headBackarrow}
            />
            
            
            </TouchableOpacity>




        </View>
      )}

      <View
        style={{flex: 1, flexDirection: 'row', backgroundColor: '#eeeeee63'}}>
        <View
          style={{
            width: global.Dimensionwidth > 468 ? '30%' : '100%',
            borderRightWidth: 1,
            borderRightColor: '#DADADA',
          }}>
          <View
            style={{
              borderColor: '#DADADA',
              borderBottomWidth: 1,
              height: 40,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          

            <View>
              <Text style={global.commonTextblue}>Today</Text>
            </View>

           
          </View>

          <ScrollView
            contentContainerStyle={{
              paddingVertical: 0,

              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}>
            {history.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={global.commonTextblueH1}>No Data Found</Text>
              </View>
            ) : (
              history.map(e => {
                return (
                  <View style={{flex: 1}}>
                    <View>
                      <View
                        style={{
                          padding: 13,
                          backgroundColor:
                            global.Dimensionwidth < 468 ? '#6a686842' : null,
                        }}>
                        <Text style={global.commonTextblueH1}>{e.date}</Text>
                      </View>

                      {e.result.map(e => {
                        return (
                          <TouchableOpacity
                            key={e.id}
                            style={[
                              global.flexLine,
                              {
                                paddingHorizontal: 11,
                                backgroundColor:
                                  global.Dimensionwidth > 468
                                    ? selectedId === e.id
                                      ? '#6a686859'
                                      : '#fff'
                                    : null,
                              },
                              global.commonFlexrow_ct,
                              {backgroundColor: '#fff'},
                            ]}
                            onPress={() => {
                              global.Dimensionwidth > 468
                                ? onSelectshift(
                                    e.round,
                                    e.shift_opened,
                                    e.shift_opened_name,
                                    e.shift_closed,
                                    e.shift_closed_name,
                                    e.start_cash_drawer,
                                    e.total_paid_in,
                                    e.total_paid_out,
                                    e.actual_in_drawer,
                                    e.expected_in_drawer,
                                    e.difference,
                                    e.total_sale,
                                    e.id,
                                  )
                                : navigation.navigate('Shiftdescription', {
                                    round: e.round,
                                    shift_opened: e.shift_opened,
                                    shift_opened_name: e.shift_opened_name,
                                    shift_closed: e.shift_closed,

                                    shift_closed_name: e.shift_closed_name,

                                    start_cash_drawer: e.start_cash_drawer,

                                    total_paid_in: e.total_paid_in,

                                    total_paid_out: e.total_paid_out,

                                    actual_in_drawer: e.actual_in_drawer,

                                    expected_in_drawer: e.expected_in_drawer,

                                    difference: e.difference,

                                    total_sale: e.total_sale,
                                  });
                            }}>
                            <View>
                              <Text
                                style={[
                                  global.commonTextblueH1,
                                  global.commonBold,
                                  {marginBottom: 4},
                                ]}>
                                {' '}
                                Round:{e.round}
                              </Text>

                              <Text>
                                {' '}
                                <Text style={global.commonTextblue}>
                                  {' '}
                                  Shift Closed :{' '}
                                </Text>{' '}
                                {e.shift_closed}
                              </Text>
                            </View>

                            <View>
                              <Image
                                source={require('../../Images/angleRight.png')}
                                style={global.settingIcon}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>

        {global.Dimensionwidth > 468 ? (
          <View style={{width: '70%', backgroundColor: '#eeeeee63'}}>
            {history.length === 0 ? null : (
              <Shiftdescription
                round={round}
                shiftOpened={shiftOpened}
                shiftOpenedname={shiftOpenedname}
                shiftClosed={shiftClosed}
                shiftclosedName={shiftclosedName}
                startcashDrawer={startcashDrawer}
                totalpaidIn={totalpaidIn}
                totalpaidOut={totalpaidOut}
                actualinDrawer={actualinDrawer}
                expectedDrawer={expectedDrawer}
                difference={difference}
                totalSale={totalSale}
              />
            )}
          </View>
        ) : null}
      </View>

      <View
        style={{
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: '#DADADA',
        }}>
        <View
          style={[
            {
              width: windowWidth > 468 ? windowWidth / 1.2 : windowWidth,
              padding: 7,
            },
          ]}>
          <View style={global.commonFlexrowa_ar}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => navigation.navigate('Shiftdetail')}>
              <Image
                source={require('../../Images/posicon.png')}
                style={[global.settingIcon]}
              />

              <Text style={[global.commonTextblack, {marginTop: 6}]}>
                Shift
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../Images/iconclocks.png')}
                style={[global.settingIcon, {tintColor: '#144693'}]}
              />

              <Text style={[global.commonTextblue, {marginTop: 6}]}>
                History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
