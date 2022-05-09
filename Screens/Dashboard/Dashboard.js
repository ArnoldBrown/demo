import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from 'victory-native';
import moment from 'moment';
import { global } from '../../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import DeviceType from '../Orientation/DeviceType';
import { manageAction } from '../../action/manageAction';
import RoleMessage from '.././RoleMessage';
import { useDispatch, useSelector } from 'react-redux';

import AuthId from '../AuthId.style';

export default function Dashboard({ navigation }) {
  const getToken = useSelector(state => state.loginReducer);
  const { casherId } = getToken;

  const getAdminroles = useSelector(state => state.manageReducer);
  const { roleList } = getAdminroles;

  const shopName = useSelector(state => state.shopnameReducer);

  const { groceryName } = shopName;

  const dispatch = useDispatch();

  const [timeInterval, setTimerinteval] = useState([
    { id: 1, timeZone: '00.00 - 00.59' },
    { id: 2, timeZone: '01.00 - 01.59' },

    { id: 3, timeZone: '02.00 - 02.59' },

    { id: 4, timeZone: '03.00 - 03.59' },
    { id: 5, timeZone: '04.00 - 04.59' },
    { id: 6, timeZone: '06.00 - 06.59' },
    { id: 7, timeZone: '07.00 - 07.59' },
    { id: 8, timeZone: '08.00 - 08.59' },
    { id: 9, timeZone: '09.00 - 09.59' },
    { id: 10, timeZone: '10.00 - 10.59' },
    { id: 11, timeZone: '11.00 - 11.59' },
    { id: 11, timeZone: '11.00 - 11.59' },
    { id: 12, timeZone: '12.00 - 12.59' },
    { id: 13, timeZone: '13.00 - 13.59' },
    { id: 14, timeZone: '14.00 - 14.59' },
    { id: 15, timeZone: '15.00 - 15.59' },
    { id: 16, timeZone: '16.00 - 16.59' },
    { id: 17, timeZone: '17.00 - 17.59' },
    { id: 18, timeZone: '18.00 - 18.59' },

    { id: 19, timeZone: '19.00 - 19.59' },

    { id: 20, timeZone: '20.00 - 20.59' },
    { id: 21, timeZone: '21.00 - 21.59' },
    { id: 22, timeZone: '22.00 - 22.59' },
    { id: 23, timeZone: '23.00 - 23.59' },
  ]);

  // useEffect(() => {

  //   const unsubscribe = navigation.addListener('focus', () => {

  //   //dispatch(manageAction(casherId  ,groceryName))

  //   })
  //   return () => {
  //     unsubscribe;
  //   }
  // }, [  ])



  const [bartype, setBartype] = useState([
    { id: 1, Name: ' Today ' },
    { id: 2, Name: 'Weekly' },
    { id: 3, Name: 'Month' },
    { id: 4, Name: 'Year' },
    { id: 5, Name: 'Custom' },
  ]);

  const [tabIndex, setTabindex] = useState(1);

  const [tabOne, setTabone] = useState(true);
  const [tabTwo, setTabtwo] = useState(false);
  const [tabThree, setTabthree] = useState(false);
  const [tabFour, setTabfour] = useState(false);
  const [tabFive, setTabfive] = useState(false);
  const [selectTab, setTab] = useState('Today');
  const [currentDate, setCurrentDate] = useState('');
  const [currentMonth, setCurrentmonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [startWeek, setStartWeek] = useState('');
  const [endWeek, setEndWeek] = useState('');

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const _getDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  var d = new Date();
  var monthName = months[d.getMonth()];

  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toUTCString();
  var lastday = new Date(curr.setDate(last)).toUTCString();

  useEffect(() => {
    var date = moment()
      .utcOffset('+05:30')
      .format('DD MMM YYYY');
    setCurrentDate(date);
    var month = moment()
      .utcOffset('+05:30')
      .format('MMM YYYY');
    setCurrentmonth(month);
    var year = moment()
      .utcOffset('+05:30')
      .format('YYYY');
    setCurrentYear(year);

    var start = moment().startOf('week');
    var end = moment().endOf('week');
    setStartWeek(moment(start).format('DD MMM YYYY'));
    setEndWeek(moment(end).format('DD MMM YYYY'));
  }, []);

  function getDaysArrayByMonth() {
    var daysInMonth = moment().daysInMonth();

    var arrDays = [];

    while (daysInMonth) {
      var current = moment().date(daysInMonth);
      let formatDate = moment(current).format('MMM D');

      arrDays.push(formatDate);
      daysInMonth--;
    }

    return arrDays.reverse();
  }

  const onFocustab = id => {
    setTabindex(id);

    if (id === 1) {
      setTabone(true);
      setTabtwo(false);
      setTabthree(false);
      setTabfour(false);
    }

    if (id === 2) {
      setTabtwo(true);
      setTabthree(false);
      setTabfour(false);
    }

    if (id === 3) {
      setTabthree(true);
      setTabfour(false);
      setTabtwo(false);
    }
    if (id === 4) {
      setTabfour(true);
      setTabthree(false);
    }
  };

  const refRBSheet = useRef();

  const report = num => {
    refRBSheet.current.close();
    if (num === 1) {
      navigation.navigate('Productsalesreport');
    }

    if (num === 2) {
      navigation.navigate('Salestaxreport');
    }

    if (num === 3) {
      navigation.navigate('Paymentreport');
    }

    if (num === 4) {
      navigation.navigate('Summarydaysales');
    }
  };

  const findDevice = DeviceType();

  const _menu = React.useRef(null);

  return (
    <SafeAreaView style={global.commonBg}>
      <View style={[global.commonHeader, { padding: 15 }]}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require('../../Images/menu.png')}
            style={global.hamBurgermenu}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}> Sales Dashboard</Text>

        <Menu
          style={{ width: 300 }}
          ref={_menu}
          button={
            <Text onPress={() => _menu.current.show()} style={global.headSvbtn}>
              Reports
            </Text>
          }>
          <MenuItem
            onPress={() => [
              navigation.navigate('Productsalesreport'),
              _menu.current.hide(),
            ]}>
            Product Wise Sales Report
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onPress={() => [
              navigation.navigate('Salestaxreport'),
              _menu.current.hide(),
            ]}>
            Sales Report
          </MenuItem>

          {/* <MenuDivider />
          <MenuItem  onPress={()=>[navigation.navigate('Paymentreport'),_menu.current.hide()]}>Payment Report</MenuItem>
          <MenuDivider />
          <MenuItem   onPress={()=>[navigation.navigate('Summarydaysales'),_menu.current.hide()]}>Print Summary of daily  sales</MenuItem> */}
        </Menu>
      </View>

      <View style={{ flex: 1, backgroundColor: '#fff', padding: 15 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={
                findDevice.isTab === 'Tablet'
                  ? { flexDirection: 'row', justifyContent: 'space-between' }
                  : { flexDirection: 'column' }
              }>
              <View style={{ height: 44, width: '100%' }}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={global.chartTabhead}
                  contentContainerStyle={
                    {
                      // justifyContent: 'space-between',
                      // alignItems: 'center',
                    }
                  }>
                  {bartype.map((e, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => [onFocustab(e.id), setTab(e.Name)]}
                        key={index}
                        style={{ justifyContent: 'space-evenly', width: 70 }}>
                        <View
                          style={
                            e.id === tabIndex
                              ? global.tabActive
                              : global.tabInactive
                          }>

                          <Text style={global.tabTextblack}>{e.Name}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>






              {/* <ScrollView>
                {bartype.map((e, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => onFocustab(e.id)}
                      key={index}
                      style={{justifyContent: 'space-evenly'}}>
                      <View
                        style={
                          e.id === tabIndex
                            ? global.tabActive
                            : global.tabInactive
                        }>
                        <Text style={global.commonTextblue}>{e.Name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView> */}

              <View
                style={[
                  global.topSpacing,
                  global.bottomSpacing,
                  { justifyContent: 'flex-end', alignItems: 'flex-end' },
                ]}>

                {selectTab === 'Today' ? (
                  <Text style={global.commonTextblueH1}>{currentDate}</Text>
                ) : selectTab === 'Weekly' ? (
                  <Text style={global.commonTextblueH1}>{startWeek} - {endWeek}</Text>
                ) : selectTab === 'Month' ? (
                  <Text style={global.commonTextblueH1}>{currentMonth}</Text>
                ) : selectTab === 'Year' ? (
                  <Text style={global.commonTextblueH1}>{currentYear}</Text>
                ) : selectTab === 'Custom' ? (
                  <View
                    style={{
                      borderColor: '#DADADA',
                      borderBottomWidth: 1,
                      height: 40,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.ivHeaderTwo}>
                      <TouchableOpacity>
                        <Image
                          style={styles.arrowImage}
                          source={require('../../Images/left-chevron.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.inventoryDate}>
                        <Text style={styles.inventoryText}>Today</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image
                          style={styles.arrowImage}
                          source={require('../../Images/right-chevron.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                ) : <Text style={global.commonTextblueH1}>{currentDate}</Text>}

                {/* <Text style={[{textAlign: 'right'}, global.commonTextH1]}>
                2 Mar 2022
              </Text> */}
              </View>
            </View>
            {tabThree === true ? (
              <View style={global.barChartbox}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {getDaysArrayByMonth().map((e, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          marginHorizontal:
                            global.Dimensionwidth > 468 ? 20 : 11,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: global.Dimensionwidth > 468 ? 50 : 30,
                            height:
                              findDevice.isTab === 'Tablet'
                                ? global.Dimensionheight / 2.4
                                : global.Dimensionheight / 3.8,
                            backgroundColor: '#DADADA',
                            marginBottom: 6,
                          }}>
                          <View style={{ backgroundColor: 'red' }}></View>
                        </View>
                        <Text style={[global.commonTextblack]}>{e}</Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            ) : tabFour === true ? (
              <View style={global.barChartbox}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {months.map((e, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          marginHorizontal:
                            global.Dimensionwidth > 468 ? 20 : 11,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: global.Dimensionwidth > 468 ? 60 : 40,
                            height:
                              findDevice.isTab === 'Tablet'
                                ? global.Dimensionheight / 2.4
                                : global.Dimensionheight / 3.8,
                            backgroundColor: '#DADADA',
                            marginBottom: 6,
                          }}>
                          <View style={{ backgroundColor: 'red' }}></View>
                        </View>
                        <Text style={[global.commonTextblack]}>{e}</Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            ) : tabTwo === true ? (
              <View style={global.barChartbox}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {_getDays.map((e, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          marginHorizontal:
                            findDevice.isTab === 'Tablet' ? 20 : 11,

                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: findDevice.isTab === 'Tablet' ? 55 : 40,
                            height:
                              findDevice.isTab === 'Tablet'
                                ? global.Dimensionheight / 2.4
                                : global.Dimensionheight / 3.8,
                            backgroundColor: '#DADADA',
                            marginBottom: 6,
                          }}>
                          <View style={{ backgroundColor: 'red' }}></View>
                        </View>
                        <Text style={[global.commonTextblack]}>{e}</Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            ) : tabOne === true ? (
              <View style={global.barChartbox}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {timeInterval.map((e, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          marginHorizontal:
                            findDevice.isTab === 'Tablet' ? 15 : 11,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: findDevice.isTab === 'Tablet' ? 55 : 40,
                            height:
                              findDevice.isTab === 'Tablet'
                                ? global.Dimensionheight / 2.4
                                : global.Dimensionheight / 3.8,
                            backgroundColor: '#DADADA',
                            marginBottom: 6,
                          }}>
                          <View style={{ backgroundColor: 'red' }}></View>
                        </View>
                        <Text style={[global.commonTextblack]}>
                          {e.timeZone}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            ) : null}

            <View
              style={
                findDevice.isTab === 'Tablet'
                  ? { flexDirection: 'row' }
                  : { flexDirection: 'column' }
              }>
              <View
                style={
                  findDevice.isTab === 'Tablet'
                    ? { width: '20%' }
                    : { width: '100%' }
                }>
                <View
                  style={[
                    global.commonWhitebg,
                    findDevice.isTab !== 'Tablet' ? global.commonborder : null,
                    global.topSpacing,
                  ]}>
                  <View
                    style={[
                      findDevice.isTab === 'Tablet'
                        ? { flexDirection: 'column' }
                        : global.commonFlexrow_ct,
                      global.bottomSpacing,
                    ]}>
                    <Text style={global.commonTextH1}>Today Sales</Text>
                    <Text
                      style={[
                        findDevice.isTab === 'Tablet'
                          ? [{ marginTop: 12, fontSize: 30 }]
                          : global.bigOtext_2,
                        global.COLOR_BLUE,
                      ]}>
                      545.00 RM
                    </Text>
                  </View>

                  <View
                    style={[
                      findDevice.isTab === 'Tablet'
                        ? { flexDirection: 'column' }
                        : global.commonFlexrow_ct,
                      global.bottomSpacing,
                    ]}>
                    <Text style={global.commonTextH1}>Transactions</Text>

                    <Text
                      style={[
                        findDevice.isTab === 'Tablet'
                          ? [{ marginTop: 12, fontSize: 30 }]
                          : global.bigOtext_2,
                        global.COLOR_BLUE,
                      ]}>
                      2
                    </Text>
                  </View>

                  <View
                    style={[
                      findDevice.isTab === 'Tablet'
                        ? { flexDirection: 'column' }
                        : global.commonFlexrow_ct,
                      global.bottomSpacing,
                    ]}>
                    <Text style={global.commonTextH1}>Avg/Bill</Text>

                    <Text
                      style={[
                        findDevice.isTab === 'Tablet'
                          ? [{ marginTop: 12, fontSize: 30 }]
                          : global.bigOtext_2,
                        global.COLOR_BLUE,
                      ]}>
                      112.00 RM
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={
                  findDevice.isTab === 'Tablet'
                    ? { width: '40%', flex: 1 }
                    : { width: '100%' }
                }>
                <View
                  style={[
                    global.commonWhitebg,
                    findDevice.isTab !== 'Tablet' ? global.commonborder : null,
                    global.topSpacing,
                    { justifyContent: 'center', alignItems: 'center' },
                  ]}>
                  <Text
                    style={[{ textAlign: 'center' }, global.commonTextblueH1]}>
                    Top 5 Products
                  </Text>

                  <View
                    style={{
                      flexDirection:
                        findDevice.isTab === 'Tablet' ? 'row' : 'column',
                      justifyContent: 'center',
                    }}>
                    <View style={{ width: 300, position: 'relative', top: -40 }}>
                      <VictoryPie
                        data={[
                          { x: '31%', y: 31 },
                          { x: '31%', y: 31 },
                          { x: '19%', y: 19 },
                          { x: '11%', y: 11 },
                          { x: '8%', y: 8 },
                        ]}
                        labelRadius={({ innerRadius }) => innerRadius + 34}
                        innerRadius={40}
                        width={360}
                        height={360}
                        colorScale={[
                          '#E12727',
                          '#379AF0',
                          '#57BB68',
                          '#EBBB63',
                          '#63584D',
                        ]}
                        style={{ labels: { fill: 'white', fontSize: 18 } }}
                      />
                    </View>

                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 11,
                        }}>
                        <View
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: 100,
                            backgroundColor: 'red',
                            marginRight: 6,
                          }}></View>
                        <Text style={global.commonTextblack}>Hot </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 11,
                        }}>
                        <View
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: 100,
                            backgroundColor: 'blue',
                            marginRight: 6,
                          }}></View>
                        <Text style={global.commonTextblack}>Silver</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={
                  findDevice.isTab === 'Tablet'
                    ? { width: '40%' }
                    : { width: '100%' }
                }>
                <View
                  style={[
                    global.commonWhitebg,
                    findDevice.isTab !== 'Tablet' ? global.commonborder : null,
                    global.topSpacing,
                    { justifyContent: 'center', alignItems: 'center' },
                  ]}>
                  <Text
                    style={[{ textAlign: 'center' }, global.commonTextblueH1]}>
                    Top 5 Categories
                  </Text>
                  <View
                    style={{
                      flexDirection:
                        findDevice.isTab === 'Tablet' ? 'row' : 'column',
                      justifyContent: 'center',
                    }}>
                    <View style={{ width: 300, position: 'relative', top: -40 }}>
                      <VictoryPie
                        width={360}
                        height={360}
                        data={[
                          { x: '31%', y: 31 },
                          { x: '31%', y: 31 },
                          { x: '19%', y: 19 },
                          { x: '11%', y: 11 },
                          { x: '8%', y: 8 },
                        ]}
                        labelRadius={({ innerRadius }) => innerRadius + 34}
                        innerRadius={40}
                        colorScale={[
                          '#E12727',
                          '#379AF0',
                          '#57BB68',
                          '#EBBB63',
                          '#63584D',
                        ]}
                        style={{ labels: { fill: 'white', fontSize: 18 } }}
                      />
                    </View>

                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 11,
                        }}>
                        <View
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: 100,
                            backgroundColor: 'red',
                            marginRight: 6,
                          }}></View>
                        <Text style={global.commonTextblack}>Hot</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 11,
                        }}>
                        <View
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: 100,
                            backgroundColor: 'blue',
                            marginRight: 6,
                          }}></View>
                        <Text style={global.commonTextblack}>Silver</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {roleList === undefined ? null : roleList.dashboard_view === 0 ? (
          <RoleMessage />
        ) : null}
      </View>

      <RBSheet
        ref={refRBSheet}
        height={global.Dimensionheight / 2.5 - global.Dimensionheight}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000075',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{ paddingHorizontal: 11 }}>
          <View style={{ padding: 5 }}>
            <TouchableOpacity
              style={[global.transparentButton]}
              onPress={() => report(1)}>
              <Text style={[global.commonTextblue]}>
                Product sales report by daily
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 5 }}>
            <TouchableOpacity
              style={[global.transparentButton]}
              onPress={() => report(2)}>
              <Text style={[global.commonTextblue]}>Sales Tax Report</Text>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 5 }}>
            <TouchableOpacity
              style={[global.transparentButton]}
              onPress={() => report(3)}>
              <Text style={[global.commonTextblue]}>Payment Report</Text>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 5 }}>
            <TouchableOpacity
              style={[global.transparentButton]}
              onPress={() => report(4)}>
              <Text style={[global.commonTextblue]}>
                Print Summary of daily sales
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  ivHeaderTwo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    elevation: 0.1,
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  inventoryDate: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    height: 25,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  inventoryText: {
    fontSize: 16,
    color: '#144693',
    fontFamily: 'Helvetica',
  },
})
