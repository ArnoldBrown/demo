import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Touchable,
  Image,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceInfo from 'react-native-device-info';
import Addadmin from './Addadmin';

import Addcategory from './Addcategory';
import DeliveryProvider from './DeliveryProvider';
import IncomeCategories from './IncomeCategories';
import Managecategory from './Managecategory';
import Manageproducts from './Manageproducts';
import Myaccount from './Myaccount';
import Paymentsetting from './Paymentsetting';
import Receiptsettings from './Receiptsettings';
import Datasync from './Datasync';
import Othersettings from './Othersettings';
import Language from './Language';
import Printer from './Printer';
import CashManagement from './CashManagement';
import CRMsystem from './CRMsystem';
import Customerdisplay from './Customerdisplay';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

import DeviceType from '../Orientation/DeviceType';

import Shop from './Shop';
import RNRestart from 'react-native-restart'; // Import package from node modules

import {settingsAction} from '../../action/settingsAction';

import {useSelector, useDispatch} from 'react-redux';

import Customloader from '../Customloader';
import Currency from './Currency';

import Roles from './Roles';

import AsyncStorage from '@react-native-community/async-storage';

import FoodDelivery from './FoodDelivery';

import Backup from './Backup';

export default function Settings({navigation, route}) {
  const dispatch = useDispatch();

  const getsettingReducer = useSelector(state => state.settingReducer);
  const {appSettings, settingsloader} = getsettingReducer;

  const shopName = useSelector(state => state.shopnameReducer);
  
  const {groceryName} = shopName;


  const [incomeModel, setincomeModel] = useState(false);
  const [expenseModel, setexpenseModel] = useState(false);

  const [previewModel, setpreviewModel] = useState(false);

  const [modalVisible, setVisible] = useState(false);

  const [settings, arraySettings] = useState([
    {
      id: 1,
      setting: 'Shop',
      Title: 'Shop',
      img: (
        <Image
          source={require('../../Images/shop.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: '',
      Text2: '',
    },

    {
      id: 2,
      setting: 'Language',
      Title: 'Language',
      img: (
        <Image
          source={require('../../Images/Language.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: '',
      Text2: '',
    },
    {
      id: 3,
      setting: 'Receipt',
      Title: 'Receipt',
      img: (
        <Image
          source={require('../../Images/Receipt.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: '',
      Text2: '',
    },
    {
      id: 4,
      setting: 'Payment',
      Title: 'Payment',
      img: (
        <Image
          source={require('../../Images/credit-card.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: '',
      Text2: '',
    },

    {
      id: 5,
      setting: 'Drawer',
      Title: 'Cash Management',
      img: (
        <Image
          source={require('../../Images/icons8-drawer.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: '',
      Text2: '',
    },

    // {
    //   id: 6,
    //   img: (
    //     <Image
    //       source={require('../../Images/icons8-motorcycle-delivery-multiple-boxes.png')}
    //       style={[global.settingIcon, {marginRight: 11}]}
    //     />
    //   ),

    //   setting: 'Delivery Providers',
    //   Title: 'Delivery Providers',

    //   Text1: '',
    //   Text2: '',
    // },

    {
      id: 113,
      setting: '',
    },

    {
      id: 7,
      setting: 'Printers & Scanner',
      Title: 'Printers & Scanner',

      img: (
        <Image
          source={require('../../Images/icprinter-maintenance.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: 'Pair & Connect Bluetooth',
      Text2: '',
    },
    {
      id: 8,
      img: (
        <Image
          source={require('../../Images/Display.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      setting: 'Customer display',
      Title: 'Customer display',

      Text1: '',
      Text2: '',
    },

    {
      id: 9,
      setting: 'User',
      Title: 'All Users',
      img: (
        <Image
          source={require('../../Images/userIcon.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: 'Edit',
      Text2: 'Add User',
    },

    {
      id: 114,
      setting: '',
    },

    {
      id: 15,
      setting: 'Backup & Restore',
      Title: 'Backup & Restore',
      img: (
        <Image
          source={require('../../Images/backup.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: '',
      Text2: (
        <Image
          source={require('../../Images/dotIcon.png')}
          resizeMode="contain"
          style={[global.settingIcon, {}]}
        />
      ),
    },

    {
      id: 10,
      setting: 'Data Synchronization',
      Title: 'Data Synchronization',
      img: (
        <Image
          source={require('../../Images/database.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: '',
      Text2: (
        <Image
          source={require('../../Images/dotIcon.png')}
          resizeMode="contain"
          style={[global.settingIcon, {}]}
        />
      ),
    },

    {
      id: 1114,
      setting: '',
    },

    {
      id: 11,
      setting: 'Food Delivery',
      Title: 'Connect Food Delivery Service',
      img: (
        <Image
          source={require('../../Images/starRating.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: '',
      Text2: '',
    },

    {
      id: 14,
      setting: 'CRM System',
      Title: 'CRM Settings',
      img: (
        <Image
          source={require('../../Images/CRM.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: '',
      Text2: '',
    },

    {
      id: 16,
      setting: 'Rate US',
      Title: 'Rate Us',
      img: (
        <Image
          source={require('../../Images/rating.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: '',
      Text2: '',
    },

    {
      id: 116,
      setting: '',
    },

    // {
    //   id: 12,
    //   setting: 'Currency',
    //   Title: 'Currency',
    //   img: (
    //     <Image
    //       source={require('../../Images/currency.png')}
    //       style={[global.settingIcon, {marginRight: 11}]}
    //     />
    //   ),

    //   Text1: '',
    //   Text2: '',
    // },

    {
      id: 13,
      setting: 'My Account',
      Title: 'My Account',
      img: (
        <Image
          source={require('../../Images/account.png')}
          style={[global.settingIcon, {marginRight: 11}]}
        />
      ),

      Text1: '',
      Text2: 'Help ?',
    },
  ]);

  const [title, setHeadtitle] = React.useState('Shop');
  const [btnText1, setBtnText1] = React.useState(' ');
  const [btnText2, setBtnText2] = React.useState(' ');

  const [settingId, setSettingid] = React.useState(1);

  const [checkDevicetype, setDevicetype] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);

  const showdetail = (id, Title, Text1, Text2) => {
    setSettingid(id);
    setHeadtitle(Title);

    setBtnText1(Text1);

    setBtnText2(Text2);
  };

  const onMobilenavigate = id => {
    if (id === 1) {
      navigation.navigate('Shop');
    }
    if (id === 2) {
      navigation.navigate('Language');
    }

    if (id === 3) {
      navigation.navigate('Receiptsettings');
    }

    if (id === 4) {
      navigation.navigate('Paymentsetting');
    }

    if (id === 5) {
      navigation.navigate('CashManagement', {
        posDrawer: appSettings.pos_drawer,
      });
    }

    if (id === 6) {
      navigation.navigate('DeliveryProvider');
    }
    if (id === 7) {
      navigation.navigate('Printer', {});
    }

    if (id === 8) {
      navigation.navigate('Customerdisplay', {});
    }

    if (id === 9) {
      navigation.navigate('Addadmin');
    }

    if (id === 10) {
      navigation.navigate('Datasync');
    }

    if (id === 11) {
      navigation.navigate('FoodDelivery');
    }

    if (id === 12) {
      navigation.navigate('Currency');
    }

    if (id === 13) {
      navigation.navigate('Myaccount');
    }

    if (id === 14) {
      navigation.navigate('CRMsystem');
    }

    if (id === 15) {
      navigation.navigate('Backup');
    }
  };

  // useEffect(() => {

  //   const unsubscribe = navigation.addListener('focus', () => {

  //   dispatch(settingsAction(groceryName));


  //   })


  //   // RNRestart.Restart();

  //   return () => {
  //     unsubscribe;
  //   };
  // }, []);


  const onOpenroles = () => {
    setVisible(true);
  };
  const onCloseroles = () => {
    setVisible(false);
  };

  const OpenIncomeCategoreis = () => {
    setincomeModel(true);
  };

  const OpenExpenseCategoreis = () => {
    setexpenseModel(true);
  };

  const _menu = React.useRef(null);

  const openPeview = () => {
    setpreviewModel(true);
  };

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {global.Dimensionwidth < 468 ? (
        <View style={[global.commonHeader, {padding: 15}]}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              source={require('../../Images/menu.png')}
              style={global.hamBurgermenu}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Setting</Text>

          <View></View>
        </View>
      ) : (
        <View style={global.tabHeader}>
          <View style={global.tabHeadcol1}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={require('../../Images/menu.png')}
                style={global.hamBurgermenu}
              />
            </TouchableOpacity>

            <Text style={global.headTitle}>Settings</Text>
            <View></View>

            <View style={global.statusBarline}></View>
          </View>

          <View style={global.tabHeadcol2}>
            <View style={global.commonFlexrow_bt}>
              <View>
                {incomeModel ? (
                  <TouchableOpacity
                    onPress={() => setincomeModel(false)}
                    style={global.flexRowsec}>
                    <Image
                      source={require('../../Images/angleLeft.png')}
                      style={[global.settingIcon]}
                    />
                    <Text style={[global.commonBold, global.commonTextblueH1]}>
                      Back
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {expenseModel ? (
                  <TouchableOpacity
                    onPress={() => setexpenseModel(false)}
                    style={global.flexRowsec}>
                    <Image
                      source={require('../../Images/angleLeft.png')}
                      style={[global.settingIcon]}
                    />
                    <Text style={[global.commonBold, global.commonTextblueH1]}>
                      Back
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {previewModel ? (
                  <TouchableOpacity
                    onPress={() => setpreviewModel(false)}
                    style={global.flexRowsec}>
                    <Image
                      source={require('../../Images/angleLeft.png')}
                      style={[global.settingIcon]}
                    />
                    <Text style={[global.commonBold, global.commonTextblueH1]}>
                      Back
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              <Text style={global.headTitle}>
                {' '}
                {incomeModel ? (
                  <Text>Income Categories</Text>
                ) : expenseModel ? (
                  <Text>Expense Categories</Text>
                ) : previewModel ? (
                  <Text>Preview</Text>
                ) : (
                  title
                )}
              </Text>
              <View style={global.flexRowsec}>
                <Text style={[global.commonTextblueH1, {marginHorizontal: 20}]}>
                  {btnText1}
                </Text>

                {settingId === 10 ? (
                  <Menu
                    style={{width: 300}}
                    ref={_menu}
                    button={
                      <Text
                        onPress={() => _menu.current.show()}
                        style={global.headSvbtn}>
                        {btnText2}
                      </Text>
                    }>
                    <MenuItem
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      {' '}
                      Option
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      {' '}
                      <Text
                        style={[
                          {fontSize: 20, fontWeight: '400'},
                          global.appColor,
                        ]}>
                        Setup new POS
                      </Text>{' '}
                    </MenuItem>

                    {/* <MenuDivider />
          <MenuItem  onPress={()=>[navigation.navigate('Paymentreport'),_menu.current.hide()]}>Payment Report</MenuItem>
          <MenuDivider />
          <MenuItem   onPress={()=>[navigation.navigate('Summarydaysales'),_menu.current.hide()]}>Print Summary of daily  sales</MenuItem> */}
                  </Menu>
                ) : (
                  <Text style={global.commonTextblueH1}>{btnText2}</Text>
                )}

                {previewModel ? (
                  <Text style={global.commonTextblueH1}>Print</Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      )}

      <View style={{flexGrow: 1, backgroundColor: '#f1f6fa6b'}}>
        <View style={[{flex: 1, flexDirection: 'row', marginTop: 25}]}>
          <View style={{width: checkDevicetype === 'Tablet' ? '30%' : '100%'}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}>
              <View
                style={[
                  global.commonWhitebg,
                  {
                    paddingVertical: 0,
                    flexGrow: 1,
                    borderRightWidth: 1,
                    borderRightColor: '#EFEFEF',
                    paddingHorizontal: 0,
                  },
                ]}>
                {settings.map((e, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => [
                        checkDevicetype === 'Tablet'
                          ? [
                              showdetail(e.id, e.Title, e.Text1, e.Text2),
                              setpreviewModel(false),
                            ]
                          : onMobilenavigate(e.id),
                      ]}>
                      {e.setting === '' ? (
                        <View
                          style={{
                            backgroundColor: '#f1f6fa6b',
                            padding: 11,
                          }}></View>
                      ) : (
                        <View
                          style={{
                            backgroundColor:
                              e.id === settingId ? '#C6C7CC' : null,
                          }}>
                          <View
                            style={[
                              global.flexRowsec,
                              {
                                paddingVertical: 11,
                                borderBottomWidth: 1,
                                borderBottomColor: '#DADADA',
                              },
                              {paddingHorizontal: 11},
                            ]}>
                            {e.img}

                            <Text
                              style={[
                                global.commonTextblueH1,
                                {
                                  color:
                                    e.id === settingId ? '#fff' : '#144693',
                                },
                              ]}>
                              {e.setting}
                            </Text>
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {global.Dimensionwidth > 468 ? (
            <View style={{width: '70%', flex: 1}}>
              {settingId === 11 ? (
                <FoodDelivery />
              ) : settingId === 9 ? (
                <Addadmin navigation={navigation} onOpenroles={onOpenroles} />
              ) : settingId === 6 ? (
                <DeliveryProvider />
              ) : settingId === 3 ? (
                <Receiptsettings
                  navigation={navigation}
                  openPeview={openPeview}
                  previewModel={previewModel}
                />
              ) : settingId === 4 ? (
                <Paymentsetting navigation={navigation} />
              ) : settingId === 13 ? (
                <Myaccount />
              ) : settingId === 1 ? (
                <Shop />
              ) : settingId === 10 ? (
                <Datasync />
              ) : settingId === 12 ? (
                <Currency />
              ) : settingId === 2 ? (
                <Language />
              ) : settingId === 7 ? (
                <Printer />
              ) : settingId === 5 ? (
                <CashManagement
                  navigation={navigation}
                  OpenIncomeCategoreis={OpenIncomeCategoreis}
                  icomemodel={incomeModel}
                  OpenExpenseCategoreis={OpenExpenseCategoreis}
                  expenseModel={expenseModel}
                  route={route}
                  checkDevicetype={checkDevicetype}

                  ///posDrawer={dr}
                />
              ) : settingId === 8 ? (
                <Customerdisplay navigation={navigation} route={route} />
              ) : settingId === 14 ? (
                <CRMsystem />
              ) : null}
            </View>
          ) : settingId === 14 ? (
            <CRMsystem />
          ) : settingId === 15 ? (
            <Backup />
          ) : null}
        </View>
      </View>

      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View
          style={[
            global.commonModalbg,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <View style={[global.modalBoxscreeen, global.commonBoxshadow]}>
            <Roles navigation={navigation} onCloseroles={onCloseroles} />
          </View>
        </View>
      </Modal>

      {settingsloader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
