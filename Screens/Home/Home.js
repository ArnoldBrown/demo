//--------   Common Screen  Applicable for Mobile and Tab ------- //
import React, {useState, useEffect, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Touchable,
  Dimensions,
  FlatList,
  StyleSheet,
  StatusBar,
  Modal,
  Linking,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {global} from '../../styles/global';
import {FlatGrid} from 'react-native-super-grid';
import DeviceInfo from 'react-native-device-info';
import Orientation from '../Orientation/Orientation';
import {SwipeListView} from 'react-native-swipe-list-view';
import uuid from 'react-native-uuid';
import customClearCart from '../clearCart';
import {useSelector, useDispatch} from 'react-redux';
import AuthId from '../AuthId.style';
import Toast from 'react-native-simple-toast';

import {API_Links} from '../Api/Api';

import AsyncStorage from '@react-native-community/async-storage';

//import  Clearcart from '../Commonfunction/Clearcart';

import Customloader from '../Customloader';

import {Order} from '../Paymentscreens/Order';

//--------   Common Imports  Applicable for Mobile and Tab ------- //

//--------    Importing Tab screens ------- //
import ScanBarcode from '../ScanBarcode';
import Addcustomer from '../AddCustomer.js/Addcustomer';
import Addproduct from '../AddProduct/Addproduct';
import Otherpackage from '../AddProduct/Otherpackage';
import Selectedoption from '../AddProduct/Selectedoption';
import CreateOptiongroup from '../AddProduct/CreateOptiongroup';
import Assignchoice from '../AddProduct/Assignchoice';
import PaymentType from '../Paymentscreens/PaymentType';
import Coupon from '../Paymentscreens/Coupon';
import Delivery from '../Paymentscreens/Delivery';
import Credit from '../Paymentscreens/Credit';
import Cash from '../Paymentscreens/Cash';
import Save from '../Save&Retriew/Save';
import Barcodesearch from '../Barcodesearch';
import Balance from '../Balance';
import AddOption from '../AddProduct/AddOption';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import RetriewList from '../Save&Retriew/RetriewList';
import Retriewproductlist from '../Save&Retriew/Retriewproductlist';
import Cartproductdiscount from '../Save&Retriew/Cartproductdiscount';
import DiscountModel from '../Paymentscreens/DiscountModel';

//--------    Importing Tab screens ------- //

//--------    Redux Actions  ------- //

import {
  Cartaction,
  CartviewAction,
  Cartclear,
  cartdeleteSingleproduct,
  cartInc_action,
  cartDec_action,
} from '../../action/Cartatction';
import {cartholdAction, cartholdlistAction} from '../../action/holdAction';
//import {categorylistAction} from '../../action/categorylistAction';
import {productlistAction, seacrchAction} from '../../action/productlistAction';

import {settingsAction} from '../../action/settingsAction';
import {galleryData, galleryuploadData} from '../../action/galleryAction';

import {viewAllcategoryAction} from '../../action/categorylistAction';
import {manufacturelistAction} from '../../action/manufacturelistAction';
import {taxlistAction} from '../../action/taxlistAction';
import Customerlistview from '../Paymentscreens/Customerlistview';
import {manageAction} from '../../action/manageAction';
import {sessionAction, sessionClearaction} from '../../action/sessionAction';
import {drawerViewaction, draweOpenaction} from '../../action/drawerAction';
import {customerListaction} from '../../action/customerListaction';

import onPromisetoken from '../customPromisetoken';
import onCreatesession from '../onCreatesession';
import {
  categorylistAction,
  categorylistIdAction,
} from '../../action/categorylistAction';
//--------    Redux Actions  ------- //

//--------************* Model pop-up   screen Names  &  --------*************

// # Attribute Model,
// # DiscountModel,
// #Customerlistview,
// #Cartproductdiscount
// #QRCodeScanner
// #RetriewList
// #Barcodesearch
// #Save remark
// # /* /* Payment Mode l */
// #Add product Models sceen

// -------********** Model pop-up    screen Names --------*************

const DeviceId = uuid.v4();
const windowwidth = Dimensions.get('screen').width;

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function Home({navigation, route}) {
  /// ---------  Redux-Hook----------///

  const dispatch = useDispatch();

  /// ---------  Redux-Hook----------///

  const PaymentTypes = PaymentType(selectType); // -----get payment types

  /*******    States-I    ************ */
  const [checkboxState, setCheckboxState] = React.useState(0);

  const refRBSheet = useRef();

  const [number, onChangeNumber] = React.useState('');

  const [session, setSession] = useState(DeviceId);

  const [displayChildren, setDisplayChildren] = useState({});

  const [getprId, setprId] = useState('');
  const [getprName, setprName] = useState('');
  const [getprPrice, setprPrice] = useState('');

  const [dbToken, setDbToken] = useState('');
  const [amount, setAmount] = useState('');

  const [variation, setVariation] = useState(false);

  const [retriew1, setRetriew1] = useState('');
  const [searchProducts, setsearchProducts] = useState('');

  /*******    States-I    ************ */

  /************  All  Reducers for Home screen   *************/

  const sessionData = useSelector(state => state.sessionReducer);
  const {sessionResponse} = sessionData;

  const getToken = useSelector(state => state.loginReducer);
  const {casherId} = getToken;

  const getAdminroles = useSelector(state => state.manageReducer);
  const {roleList} = getAdminroles;

  const product_array = useSelector(state => state.productReducer);

  const {productarray, status} = product_array;

  const ass = useSelector(state => state.cartReducer);

  const {
    cartItems,
    onCheck,
    cartPreviousLength,
    cartLength,
    weSet,
    singlecustomerData,
    couponCode,
    couponAmount,
    couponId,
    _cartStatus,
  } = ass;

  const _holdReducer = useSelector(state => state.holdReducer);

  const {cartHolderdata} = _holdReducer;

  const drawerStatus = useSelector(state => state.drawerViewreducer);
  const {drawerResponse, onload} = drawerStatus;

  const getLanguageids = useSelector(state => state.languageReducer);
  const {languageId} = getLanguageids;

  const getCurrencycodes = useSelector(state => state.currencyReducer);
  const {currencyCode, symbol} = getCurrencycodes;

  const getOpenstatusDrawer = useSelector(state => state.drawerOpenstatus);

  const {openStatus} = getOpenstatusDrawer;

  const shopName = useSelector(state => state.shopnameReducer);

  const {groceryName} = shopName;

  const listCat = useSelector(state => state.categorylistReducer);

  const {categoryarray, setcatId} = listCat;

  /************   All  Reducers for Home screen   *************/

  /********  State-II  ********/

  var radio_props = [
    {label: 'Guest', value: 0},
    {label: 'Customer', value: 1},
  ];

  let Total = Math.round(
    (cartItems.reduce(
      (a, c) => a + c.final_price * c.customers_basket_quantity,
      0,
    ) *
      100) /
      100,
  ).toFixed(2);

  let getDiscountvalue = Total - retriew1;

  let splitString = (Math.round(getDiscountvalue * 100) / 100).toFixed(2);

  let str = splitString.toString();

  const myArrayText = str.split('.');

  const [dummyArray, setdummyArray] = useState([
    {
      id: '001',
      title: 'test',
    },
  ]);

  let getPreviewindex =
    cartItems.length === 0 ? null : cartItems[0].products_id;

  //const concatProducts = productarray.push(dummyArray);

  const [categoryId, setCategoryId] = useState(setcatId);

  //   const [category, setCategory] = useState([]);

  //   const [xxxxx1, setxxxxx1] = useState([]);

  // console.log("categorycategory",xxxxx1)

  const [catToggle, setcatToggle] = useState(false);

  const [catProducts, setcatProducts] = useState([]);

  const [cartProducts, setcartProducts] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [payModel, setpayModel] = useState(false);
  const [remarkModel, setRemarkModel] = useState(false);
  const [retriewModel, setretriewModel] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const [drawerModel, setDrawermodel] = useState(false);

  const [we, setwe] = useState('11');

  const [qrkModel, setQrmodel] = useState(false);
  const [blModel, setBlmodel] = useState(false);
  const [scanProduct, setScanner] = useState(false);
  const [discountCalcmodel, setdiscountCalcmodel] = useState(false);
  const [customerListmodel, setcustomerListmodel] = useState(false);

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);
  const [step6, setStep6] = useState(false);

  const [customertogglescreen1, setCustomertogglescreen1] = useState(true);

  const [customertogglescreen2, setCustomertogglescreen2] = useState(false);

  const [customertogglescreen3, setCustomertogglescreen3] = useState(false);

  const [DF, setDf] = useState(false);

  const [attributemodel, setAttributemodel] = useState(false);
  const [attributeList, setAttributList] = useState([]);

  const [getAttributeimage, setAttributeimage] = useState(null);

  const [selectType, setType] = useState(1);

  const [text, onChangeText] = React.useState('');

  const [isTorch, setTorch] = useState(false);

  const [payAmount, onChangepayAmount] = React.useState('');

  let setpayAmount = Total - payAmount;

  const updateSearch = productarray.filter(e =>
    e.products_name.toLowerCase().includes(searchProducts.toLowerCase()),
  );

  ///console.log("updateSearch",updateSearch)

  /********  State-II  ********/

  //******** Function started  includes Flatlist renders  -*************//

  const databaseToken = async () => {
    try {
      const _dbToken = await AsyncStorage.getItem('retrievToken');

      if (_dbToken !== null) {
        setDbToken(_dbToken);

        //RNRestart.Restart();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onsaveRemark = async () => {
    dispatch(
      cartholdAction(
        casherId,
        dbToken !== '' ? dbToken : sessionResponse,
        note,
        groceryName,
      ),
    );

    await onPromisetoken(
      setRemarkModel,
      dispatch,
      CartviewAction,
      dbToken,
      sessionResponse,
      groceryName,
    );

    await onCreatesession(
      dispatch,
      sessionAction,
      session,
      AsyncStorage,
      setDbToken,
      onChangenote,
    ).then(() => {
      dispatch(cartholdlistAction(casherId, groceryName));
    });
  };

  const [checkDevicetype, setDevicetype] = React.useState(' ');
  const [note, onChangenote] = useState('');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);

  /*******   Model  Hide & show function applicable for Tab */

  const onAddcustomer = () => {
    setCustomertogglescreen1(false);

    setCustomertogglescreen2(true);
    setCustomertogglescreen3(false);
  };

  const onClosecustomeradd = () => {
    dispatch(customerListaction(groceryName));
    setCustomertogglescreen1(true);
    setCustomertogglescreen2(false);
  };

  const onAddcustomerScan = () => {
    setCustomertogglescreen1(false);
    setCustomertogglescreen2(false);
    setCustomertogglescreen3(true);
  };

  const onShowstep2 = () => {
    setStep1(false);
    setStep2(true);
  };

  const onClosestep2 = () => {
    setStep1(true);
    setStep2(false);
  };

  const onShowstep3 = () => {
    setStep1(false);
    setStep3(true);
  };
  const onClosestep3 = () => {
    setStep1(true);
    setStep3(false);
  };

  const onShowstep4 = () => {
    setStep3(false);
    setStep4(true);
  };
  const onClosestep4 = () => {
    setStep3(true);
    setStep4(false);
  };

  const onShowstep5 = () => {
    setStep4(false);
    setStep5(true);
  };

  const onClosestep5 = () => {
    setStep4(true);
    setStep5(false);
  };

  const onBalanceclose = () => {
    setBlmodel(false);
  };

  const onselect = id => {
    setType(id);
  };
  const onCloseRemark = () => {
    setRemarkModel(false);
  };
  const oncloseQrmodel = () => {
    setQrmodel(false);
  };

  const onShowstep6 = () => {
    setStep5(false);
    setStep6(true);
  };

  const onClosestep6 = () => {
    setStep5(true);
    setStep6(false);
  };

  const onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };

  const onCloseretrievmodel = () => {
    setretriewModel(false);
    databaseToken();
  };

  const oncloseCartproductdiscount = () => {
    setModalVisible1(false);
  };
  const onOpendicountcalc = () => {
    setModalVisible1(false);

    setModalVisible2(true);
  };

  const oncloseCustomermodel = () => {
    setcustomerListmodel(false);
  };

  /*******   Model  Hide & show function applicable for Tab */

  const sortBycatgy = async id => {
    /// **** sort  products by  id
    await dispatch(
      productlistAction(id, languageId, currencyCode, groceryName),
    );
  };

  function onPromiseProduct() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          dispatch(
            productlistAction(setcatId, languageId, currencyCode, groceryName),
          ),
        );
      }, 1000);
    });
  }

  const getCategorylist = async () => {
    console.log('qwerry');
    await dispatch(categorylistAction(languageId, groceryName));

    await onPromiseProduct();
  };

  const onClosemodel = () => {
    setModalVisible(false);

    getCategorylist();
  };

  // useEffect(() => {
  //   console.log('UseEffect');
  //   global.Dimensionwidth < 468 ? databaseToken() : null;

  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getCategorylist();
  //   });

  //   return () => {
  //     unsubscribe;
  //   };
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getCategorylist();
      });

      return () => unsubscribe();
    }, []),
  );

  useEffect(() => {
    dispatch(sessionAction(session));

    return () => {};
  }, []);

  const openAttribute = async (attribute, name, item, price) => {
    //**** Add products to cart if attrbute is Zero or jump to else block ********/

    if (attribute.length === 0) {
      await dispatch(Cartaction(item, sessionResponse, 0, groceryName)).then(
        () => {
          dispatch(cartholdlistAction(casherId, groceryName));
        },
      );
    } else {
      setprId(item.products_id);

      setprName(item.products_name);

      setprPrice(item.products_price);

      setAttributemodel(true);

      setAttributeimage(item.products_image);

      setAttributList(attribute);
    }
  };

  const ongetAttributelist = async (item, io) => {
    //*****   Add attributes products to cart if  eg:(kg ,color ,gm  etc.....)*******/
    var data = new FormData();

    data.append('products_id', getprId);
    data.append('attributes[]', item.products_attributes_id);

    fetch(
      groceryName === ''
        ? API_Links.BASE_URL + API_Links.GET_QUANTITY
        : API_Links.SHOP_URL +
            groceryName +
            '/' +
            'api' +
            '/' +
            API_Links.GET_QUANTITY,
      {
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
          'consumer-device-id': AuthId._currDeviceId,
          'consumer-ip': AuthId._currIp,
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      },
    )
      .then(response => response.json())

      .then(e => {
        if (e.stock === 0) {
          Alert.alert('No Stock', '', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else {
          let attrObj = {
            products_id: getprId,
            option_name: io.option.name,
            option_id: io.option.id,
            attributeid: item.products_attributes_id,
            option1: io.option.id,
            option2: item.id,
            products_price: getprPrice + item.price,
          };

          dispatch(Cartaction(attrObj, sessionResponse, 1, groceryName));
        }
      })
      .then(() => {
        dispatch(cartholdlistAction(casherId, groceryName));
      });

    // dispatch(CartviewAction(sessionResponse))
  };

  const renderItem = (
    data, ///******  Render cart products to UI  */
  ) => (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
        paddingVertical: 11,
        backgroundColor: '#fff',
        paddingHorizontal: 11,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          width: 60,
          height: 60,

          borderRadius: 6,
        }}>
        <Image
          source={{
            uri:
              groceryName === ''
                ? API_Links.URL + data.item.image
                : API_Links.SHOP_URL + groceryName + '/' + data.item.image,
          }}
          style={{width: '100%', height: '100%'}}
        />
      </View>

      <View style={{paddingHorizontal: 11, flex: 0.7}}>
        <Text
          style={[global.commonTextblueH1, {marginBottom: 7, marginTop: 6}]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {data.item.products_name}
        </Text>
        <Text style={global.commonTextH1}>
          {symbol} {data.item.final_price}
        </Text>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center', flex: 0.3}}>
        <TouchableOpacity onPress={() => dispatch(cartDec_action(data.item))}>
          <Image
            source={require('../../Images/minusCircle.png')}
            style={[{width: 25, height: 25}, global.iconColor]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text>{data.item.customers_basket_quantity}</Text>
        <TouchableOpacity onPress={() => dispatch(cartInc_action(data.item))}>
          <Image
            source={require('../../Images/plusCircle.png')}
            style={[{width: 25, height: 25}, global.iconColor]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHiddenItem = (
    data, ///******   Delete products
  ) => (
    <View style={global.rowBack}>
      <TouchableOpacity
        style={[global.actionButton, global.deleteBtn]}
        onPress={() =>
          dispatch(cartdeleteSingleproduct(data.item, groceryName))
        }>
        <Image
          source={require('../../Images/trash.png')}
          style={[global.settingIcon, {tintColor: '#fff'}]}
        />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(viewAllcategoryAction(languageId, groceryName));

      dispatch(galleryData(4, groceryName));

      dispatch(manufacturelistAction(languageId, groceryName));

      dispatch(taxlistAction(groceryName));

      dispatch(customerListaction(groceryName));

      dispatch(drawerViewaction(casherId, groceryName));
    });

    return () => {
      unsubscribe;
    };
  }, []);

  function onpromiseDraweropen() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dispatch(drawerViewaction(casherId, groceryName)));
      }, 200);
    });
  }

  const onSubmitdrawer = async () => {
    dispatch(draweOpenaction(casherId, number, groceryName));
    await onpromiseDraweropen();
  };

  const clearCart = async () => {
    //***clear all products  from cart//
    Alert.alert('Are you sure', 'You want to clear the cart ? ', [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => [
          ///onClearcart (),
          customClearCart(dbToken, sessionResponse, dispatch, session),

          //customClearCart(dispatch ,dbToken, sessionResponse, session ,groceryName),

          setAmount(''),
          setRetriew1(''),
        ],
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cartholdlistAction(casherId, groceryName));

      dispatch(drawerViewaction(casherId, groceryName));
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const onSubmitorder = () => {
    if (checkboxState === 1 && singlecustomerData === undefined) {
      Alert.alert('Add Customer', 'To continue payment', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      setpayModel(true);
    }
  };

  const oncalculateDiscount = amount => {
    //*** calculate Discount//
    if (
      cartItems.reduce(
        (a, c) => a + c.final_price * c.customers_basket_quantity,
        0,
      ) < amount
    ) {
      Alert.alert("Can't discounting", 'Discount more than pricing.', [
        {
          text: 'OK',
          onPress: () => [setAmount(''), setRetriew1('')],
        },
      ]);
    } else {
      if (variation === true) {
        let variationAmount = amount / 100;

        let totalCart = cartItems.reduce(
          (a, c) => a + c.final_price * c.customers_basket_quantity,
          0,
        );

        let ty = variationAmount * totalCart;

        let discountDiff = totalCart - ty;

        let finalDiscount = totalCart - discountDiff;

        setRetriew1(finalDiscount);

        setdiscountCalcmodel(false);
      } else {
        setRetriew1(amount);

        setdiscountCalcmodel(false);
      }
    }
  };

  const getClear = () => {
    var str1 = amount;

    str1 = str1.substring(0, str1.length - 1);

    setAmount(str1);

    setRetriew1(str1);
  };

  const onPayment = () => {
    if (selectType === 1) {
      if (payAmount < getDiscountvalue) {
        Alert.alert('Payment Failed', 'Amount not valid', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }

      setpayModel(false);

      Order(
        singlecustomerData,
        cartItems,
        navigation,
        API_Links.BASE_URL,
        API_Links.ADD_TO_ORDER,
        currencyCode,
        languageId,
        getDiscountvalue,
        casherId,
        setpayAmount,

        selectType === 5 ? couponAmount : 0,
        selectType === 5 ? couponId : 0,
        couponCode,
        retriew1,
        groceryName,
        checkboxState,
      );
    }

    if (selectType === 5) {
      if (couponAmount === undefined || couponAmount < getDiscountvalue) {
        Alert.alert('Payment Failed', 'Coupon amount is low', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else {
        setpayModel(false);

        Order(
          singlecustomerData,
          cartItems,
          navigation,
          API_Links.BASE_URL,
          API_Links.ADD_TO_ORDER,
          currencyCode,
          languageId,
          getDiscountvalue,
          casherId,
          setpayAmount,
          couponAmount,
          couponId,
          couponCode,
          retriew1,
          groceryName,
          checkboxState,
        );
      }
    }

    // else {

    //   }
  };

  const onRefresh = () => {
    setRefreshing(true);
    wait(1000)
      .then(() => {
        getCategorylist();
      })
      .then(() => {
        setRefreshing(false);
      });
  };

  function Loopcategory({comment}) {
    //***Looping child elements//

    const nestedComments = (comment.childs || []).map(comment => {
      return <Loopcategory comment={comment} key={comment.categories_id} />;
    });

    return (
      <View>
        <TouchableOpacity
          key={comment.categories_id}
          style={[
            global.Dimensionwidth < 468
              ? setcatId === comment.categories_id
                ? global.catboxActive
                : global.catbox
              : setcatId === comment.categories_id
              ? global.catbox_TabActive
              : global.catbox_Tab,
          ]}
          onPress={() => [
            sortBycatgy(comment.categories_id),

            setDisplayChildren({
              ...displayChildren,
              [comment.categories_name]:
                !displayChildren[comment.categories_name],
            }),

            dispatch(categorylistIdAction(comment.categories_id)),

            //onTogglesubcat(comment.categories_id),
          ]}>
          <Text
            numberOfLines={1}
            style={[
              global.Dimensionwidth < 468
                ? {textAlign: 'center', color: '#5C6677'}
                : setcatId === comment.categories_id
                ? {textAlign: 'center', fontSize: 15}
                : global.catText_Tab,
              ,
              {marginTop: comment.childs.length !== 0 ? 11 : 0},
            ]}>
            {comment.categories_name}
          </Text>

          {comment.childs.length !== 0 ? (
            <Image
              source={require('../../Images/icons8-expand-arrow-down.png')}
              style={
                setcatId === comment.categories_id
                  ? {
                      width: 14,
                      height: 14,
                      tintColor: '#000',
                    }
                  : {
                      tintColor: global.Dimensionwidth > 468 ? '#fff' : '#000',
                      width: 14,
                      height: 14,
                    }
              }
            />
          ) : null}
        </TouchableOpacity>

        {displayChildren[comment.categories_name] &&
          comment.childs &&
          nestedComments}
      </View>
    );
  }

  //******** Function started  includes Flatlist renders  -*************//

  //******** Main UI started   -*************//

  return (
    <SafeAreaView style={[global.commonBg, {backgroundColor: '#f1f1f13d'}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>

      {drawerResponse === '0' ? (
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require('../../Images/menu.png')}
              style={global.settingIcon}
            />
          </TouchableOpacity>

          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={global.commonTextblueH1}>Open shift to continue</Text>

            <TouchableOpacity
              style={[global.commonButton, global.topSpacing]}
              onPress={() => setDrawermodel(true)}>
              <Text style={global.btnText1}>OPEN SHIFT</Text>
            </TouchableOpacity>
          </View>

          <Modal animationType="slide" transparent={true} visible={drawerModel}>
            <View
              style={[
                global.commonModalbg,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <View
                style={[
                  global.commonWhitebg,
                  {borderRadius: 9},
                  global.ModalBox,
                ]}>
                <Text
                  style={[
                    global.commonTextblueH1,
                    {textAlign: 'center'},
                    global.bottomSpacing,
                  ]}>
                  Start Cash in Drawer
                </Text>

                <Text
                  style={[
                    global.commonTextblack,
                    {textAlign: 'center'},
                    global.bottomSpacing,
                  ]}>
                  Enter amount of cash in drawer
                </Text>

                <View
                  style={[
                    global.inputBox,

                    {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#144692',
                      borderWidth: 2,
                    },
                  ]}>
                  <TextInput
                    style={[global.input, {paddingRight: 10}]}
                    onChangeText={onChangeNumber}
                    placeholder="0.00"
                    placeholderTextColor="#D1D1D1"
                    value={number}
                    keyboardType="decimal-pad"
                  />
                </View>

                <Text></Text>

                <TouchableOpacity
                  style={
                    number === ''
                      ? global.commmonDiasbletn
                      : global.commonButton
                  }
                  onPress={() => onSubmitdrawer()}
                  disabled={number === '' ? true : false}>
                  <Text style={[global.btnText1, {marginRight: 11}]}>Save</Text>
                </TouchableOpacity>

                <View style={{position: 'absolute', left: 0, top: 0}}>
                  <TouchableOpacity onPress={() => setDrawermodel(false)}>
                    <Image
                      source={require('../../Images/closeicon.png')}
                      style={{width: 40, height: 40}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#f1f1f13d',
            }}>
            {checkDevicetype === 'Handset' ? (
              // <View style={[global.homeHead]}>
              //   <View
              //     style={{
              //       flexDirection: 'row',
              //       // width: '80%',
              //       alignItems: 'center',
              //       justifyContent: 'space-between',
              //       flex:1
              //     }}>
              //     <View style={{width: '10%'}}>
              //       <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              //         <Image
              //           source={require('../../Images/menu.png')}
              //           style={global.commomMediumicon}
              //           resizeMode="contain"
              //         />
              //       </TouchableOpacity>
              //     </View>

              //     <View
              //       style={[
              //         global.headerSerach,
              //         {
              //           width: '90%',
              //         },
              //       ]}>
              //       <Image
              //         source={require('../../Images/search.png')}
              //         style={{width: 16, height: 16, tintColor: '#6D6E72'}}
              //         resizeMode="contain"
              //       />

              //       <TextInput
              //         style={[global.input, {paddingHorizontal: 8}]}
              //         onChangeText={text => setsearchProducts(text)}
              //         /// value={text}
              //         placeholder="Search Products"
              //         placeholderTextColor={'#6E7172'}
              //       />

              //     </View>
              //   </View>

              //   <View
              //     style={{
              //       flexDirection: 'row',
              //       marginLeft: 11,
              //       width: '20%',
              //       justifyContent: 'space-between',
              //     }}>
              //     <TouchableOpacity>
              //       <Image
              //         source={require('../../Images/icprinter-maintenance.png')}
              //         style={[global.commonIcon, {marginRight: 5}]}
              //         resizeMode="contain"
              //       />
              //     </TouchableOpacity>

              //     <TouchableOpacity
              //       style={{position: 'relative'}}
              //       onPress={() => {
              //         [
              //           navigation.navigate('Cart', {
              //             cartProducts: cartProducts,
              //           }),
              //         ];
              //       }}>
              //       <Text
              //         style={{
              //           color: 'red',
              //           position: 'absolute',
              //           top: -10,
              //           right: 0,
              //         }}>
              //         {cartItems === undefined ? cartLength : cartItems.length}
              //       </Text>

              //       <Image
              //         source={require('../../Images/shopping-cart.png')}
              //         style={global.commonIcon}
              //         resizeMode="contain"
              //       />
              //     </TouchableOpacity>
              //   </View>
              // </View>
              <View style={{paddingHorizontal:10, flexDirection: 'row',alignItems:'center',justifyContent:'center',paddingTop:5}}>
                <TouchableOpacity
                  onPress={() => navigation.toggleDrawer()}
                  style={{
                    width: '10%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    // backgroundColor:'red'
                  }}>
                  <Image
                    source={require('../../Images/list.png')}
                    style={{tintColor: '#144693', width: 25, height: 25}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    backgroundColor: '#DEDFE1',
                    flexDirection: 'row',
                    width: '74%',
                    alignItems: 'center',
                    borderColor: '#bdbdbd',
                    borderWidth: 1,
                    borderRadius: 5,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '90%',
                      height: 40,
                    }}>
                    <Image
                      source={require('../../Images/search.png')}
                      style={{
                        width: 16,
                        height: 16,
                        marginLeft: 5,
                        tintColor: '#757575',
                      }}
                    />
                    <TextInput
                      placeholder="Search Product"
                      style={{fontSize: 16, paddingLeft: 8, width: '90%'}}
                      onChangeText={text => setsearchProducts(text)}
                    />
                  </View>

                  <TouchableOpacity style={{width: '10%'}}>
                    <Image
                      source={require('../../Images/barcode-scanner.png')}
                      style={{width: 20, height: 20, tintColor: '#144693'}}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '18%',
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../Images/printer.png')}
                      style={{width: 19, height: 19, tintColor: '#144693'}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{position: 'relative'}}
                    onPress={() => {
                      [
                        navigation.navigate('Cart', {
                          cartProducts: cartProducts,
                        }),
                      ];
                    }}>
                    <Text
                      style={{
                        color: 'red',
                        position: 'absolute',
                        top: -11,
                        right: 0,
                      }}>
                      {cartItems.length === 0 ? cartLength : cartItems.length}
                    </Text>
                    <Image
                      source={require('../../Images/shopping-cart.png')}
                      style={{width: 22, height: 22, tintColor: '#144693'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingHorizontal: 1,
                  }}>
                  <View
                    style={{
                      flex: 0.9,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 11,
                    }}>
                    <View>
                      <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}>
                        <Image
                          source={require('../../Images/menu.png')}
                          style={global.commonIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={[global.headerSerach, {width: '92%'}]}>
                      <Image
                        source={require('../../Images/search.png')}
                        style={[
                          {tintColor: '#6E7172'},
                          {width: 20, height: 20},
                        ]}
                        resizeMode="contain"
                      />

                      <TextInput
                        style={[global.input, {paddingHorizontal: 5}]}
                        onChangeText={text => setsearchProducts(text)}
                        //value={text}
                        placeholder="Search Products"
                        placeholderTextColor={'#6E7172'}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 0.7,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => setQrmodel(true)}>
                      <View style={global.tabHeadiconsec}>
                        <Image
                          source={require('../../Images/search.png')}
                          style={global.commonIcon}
                          resizeMode="contain"
                        />

                        <Text style={[global.appColor, {marginTop: 7}]}>
                          {' '}
                          Barcode
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <View style={global.tabHeadiconsec}>
                      <Image
                        source={require('../../Images/icprinter-maintenance.png')}
                        style={global.commonIcon}
                        resizeMode="contain"
                      />

                      <Text style={[global.appColor, {marginTop: 7}]}>
                        Drawer
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setdiscountCalcmodel(!discountCalcmodel)}
                      disabled={cartItems.length === 0 ? true : false}>
                      <View style={global.tabHeadiconsec}>
                        <Image
                          source={require('../../Images/price-tag.png')}
                          style={global.commonIcon}
                          resizeMode="contain"
                        />

                        <Text style={[global.appColor, {marginTop: 7}]}>
                          {' '}
                          Discount
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View>
                      <TouchableOpacity
                        style={[global.tabHeadiconsec, {position: 'relative'}]}
                        onPress={() =>
                          cartItems.length === 0
                            ? setretriewModel(true)
                            : setRemarkModel(true)
                        }>
                        <View
                          style={{
                            width: 2,
                            height: 25,
                            backgroundColor: '#E2E2E2',
                            top: 0,
                            position: 'absolute',
                            left: 0,
                          }}></View>

                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={require('../../Images/download.png')}
                            style={global.commonIcon}
                            resizeMode="contain"
                          />

                          <View
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 50,
                              backgroundColor: 'red',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft: 6,
                            }}>
                            <Text style={global.COLOR_WHITE}>
                              {cartHolderdata === undefined
                                ? '0'
                                : cartHolderdata.length === 0
                                ? '0'
                                : cartHolderdata.length}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: 2,
                            height: 25,
                            backgroundColor: '#E2E2E2',
                            top: 0,
                            position: 'absolute',
                            right: 0,
                          }}></View>

                        <Text style={[global.appColor, {marginTop: 7}]}>
                          {' '}
                          Save & Retrieve
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={global.tabHeadiconsec}
                      onPress={() => setcustomerListmodel(true)}>
                      <Image
                        source={require('../../Images/customer.png')}
                        style={[global.commonIcon, {width: 24, height: 24}]}
                        resizeMode="contain"
                      />

                      <Text style={[global.appColor, {marginTop: 7}]}>
                        {' '}
                        Customer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            {/* <PTRView onRefresh={() => onRefresh()} style={{flex:1}}> */}

            <View style={[global.home_section, {flexGrow: 1}]}>
              <View
                style={[
                  global.home_catsec,
                  {width: windowwidth > 480 ? windowwidth / 8.9 : 85},
                ]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {categoryarray.map(e => {
                    return <Loopcategory key={e.categories_id} comment={e} />;
                  })}
                </ScrollView>
              </View>
              {/* 
              {updateSearch.length === 0
                ? Toast.showWithGravity(
                    'No Products Found',
                    Toast.SHORT,
                    Toast.BOTTOM,
                  )
                : null} */}

              <View
                style={{
                  width: windowwidth / 1.5,
                  flex: 1,
                  paddingBottom: 10,
                  marginTop: 8,
                }}>
                <FlatGrid
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  // refreshControl
                  showsVerticalScrollIndicator={false}
                  itemDimension={checkDevicetype === 'Handset' ? 110 : 118}
                  // staticDimension={110}
                  data={updateSearch.concat(dummyArray)}
                  style={{flex: 1}}
                  spacing={8}
                  ListEmptyComponent={() => (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: global.Dimensionheight / 2.5,
                      }}>
                      <Image
                        source={require('../../Images/sademoji.png')}
                        style={{width: 40, height: 40}}
                      />
                      <Text
                        style={[
                          global.commonTextblue,
                          {textAlign: 'center', marginTop: 7},
                        ]}>
                        {' '}
                        No Product's Found
                      </Text>
                    </View>
                  )}
                  renderItem={({item}) => (
                    <View>
                      {item.id === '001' ? (
                        <TouchableOpacity
                          activeOpacity={0}
                          onPress={() =>
                            checkDevicetype === 'Handset'
                              ? navigation.navigate('Addproduct')
                              : setModalVisible(true)
                          }>
                          <View
                            style={[
                              global.productBox,
                              {
                                justifyContent: 'center',
                                alignItems: 'center',
                              },
                              global.themeBordercolor,
                            ]}>
                            <Image source={require('../../Images/plus.png')} />
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          disabled={
                            item.products_type !== 1 && item.defaultStock === 0
                              ? true
                              : false
                          }
                          style={[global.productBox]}
                          onPress={() => [
                            openAttribute(
                              item.attributes,
                              item.products_name,
                              item,
                              item.products_price,
                            ),
                          ]}>
                          <View
                            style={{
                              flex: 1,
                              borderTopRightRadius: 4,
                              borderTopLeftRadius: 4,
                              overflow: 'hidden',
                              height: 100,
                            }}>
                            <Image
                              source={{
                                uri:
                                  groceryName === ''
                                    ? API_Links.URL + item.products_image
                                    : API_Links.SHOP_URL +
                                      groceryName +
                                      '/' +
                                      item.products_image,
                              }}
                              style={{width: '100%', height: '100%'}}
                              resizeMode="cover"
                            />
                          </View>

                          <View
                            style={{
                              flex: 0.6,
                              justifyContent: 'space-between',
                              padding: 11,
                            }}>
                            <Text style={global.commonText} numberOfLines={2}>
                              {item.products_name}
                            </Text>

                            <Text style={[global.commonTextblack, {}]}>
                              {symbol}
                              {item.discount_price === null
                                ? (
                                    Math.round(item.products_price * 100) / 100
                                  ).toFixed(2)
                                : (
                                    Math.round(item.discount_price * 100) / 100
                                  ).toFixed(2)}
                            </Text>
                          </View>

                          {item.products_type !== 1 &&
                          item.defaultStock === 0 ? (
                            <View
                              style={{
                                position: 'absolute',
                                top: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#000',
                                opacity: 0.8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                left: 0,
                                right: 0,
                              }}>
                              <View>
                                <Text
                                  style={[
                                    global.commonTextwhite,
                                    global.commonBold,
                                  ]}>
                                  No Stock
                                </Text>
                              </View>
                            </View>
                          ) : null}
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                />

                {checkDevicetype === 'Tablet' ? (
                  <View style={{paddingHorizontal: 20}}>
                    <TouchableOpacity
                      style={[global.transparentButton, {}]}
                      onPress={() => setScanner(true)}>
                      <Image
                        source={require('../../Images/barcode-scanner.png')}
                        style={[global.commonIcon, {marginRight: 11}]}
                      />

                      <Text style={global.btnText2}>Scan</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>

              {checkDevicetype === 'Tablet' ? (
                <View style={global.cartsection}>
                  <View
                    style={{
                      flex: 1,
                      borderTopColor: '#E2E2E2',
                      borderTopWidth: 1,
                    }}>
                    <View style={global.carsec1}>
                      {singlecustomerData === undefined ? null : (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginBottom: 11,
                          }}>
                          <Text style={global.commonTextblack}>
                            {singlecustomerData.entry_firstname}
                          </Text>
                        </View>
                      )}

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={global.commonText}>Sub Total</Text>

                        <Text style={global.commonText}>
                          {symbol}{' '}
                          {(Math.round(getDiscountvalue * 100) / 100).toFixed(
                            2,
                          )}
                        </Text>
                      </View>

                      {retriew1 === '' ? (
                        <Text></Text>
                      ) : (
                        <View
                          style={[
                            global.commonFlexrow_bt,
                            {marginTop: 7, marginBottom: 15},
                          ]}>
                          <Text
                            style={[global.innersecTitle, global.errorText]}>
                            Bill Discount
                          </Text>

                          <Text
                            style={([global.innersecTitle], global.errorText)}>
                            {' '}
                            {(Math.round(retriew1 * 100) / 100).toFixed(2)}
                          </Text>
                        </View>
                      )}

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // backgroundColor:'grey',
                          alignItems: 'flex-end',
                        }}>
                        <Text
                          style={[
                            global.commonText,
                            {fontSize: 22, fontWeight: '400'},
                          ]}>
                          Total
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                          }}>
                          <Text
                            style={[
                              global.commonText,
                              {fontSize: 22, fontWeight: '100'},
                            ]}>
                            {symbol} {''}
                          </Text>

                          <Text
                            style={[
                              global.commonText,
                              {
                                fontSize: 45,
                                position: 'relative',
                                top: 5,
                                fontWeight: '200',
                              },
                            ]}>
                            {myArrayText[0]}
                          </Text>
                          <Text
                            style={[
                              global.commonText,
                              {fontSize: 34, fontWeight: '200', top: 3},
                            ]}>
                            .{myArrayText[1]}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[global.commonFlexrowwe_ct, global.topSpacing]}>
                        <RadioForm
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                          radio_props={radio_props}
                          initial={0}
                          onPress={value => {
                            setCheckboxState(value);
                          }}
                          buttonColor={'#144692'}
                          /// buttonInnerColor={'#144692'}
                          //butt={'#2196f3'}
                          selectedButtonColor={'#144692'}
                        />
                      </View>

                      <Text></Text>

                      <TouchableOpacity
                        disabled={cartItems.length === 0 ? true : false}
                        style={global.commonButton}
                        onPress={() => onSubmitorder()}>
                        <Text style={global.btnText1}>Pay</Text>
                      </TouchableOpacity>
                    </View>

                    {cartItems.length === 0 ? (
                      <Text
                        style={[
                          {textAlign: 'center'},
                          global.commonTextblackH1,
                        ]}>
                        No Items
                      </Text>
                    ) : null}

                    {_cartStatus === '0' ? null : (
                      <SwipeListView
                        // useNativeDriver={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => item.products_id}
                        data={cartItems}
                        //renderItem={renderItem}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-73}
                        previewRowKey={getPreviewindex}
                        previewOpenValue={-75}
                        previewOpenDelay={1000}
                        ///onRowDidOpen={onItemOpen}
                      />
                    )}
                  </View>

                  <View style={{justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                      disabled={cartItems.length === 0 ? true : false}
                      activeOpacity={0}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',

                        paddingVertical: 15,
                        backgroundColor: '#fff',
                      }}
                      onPress={() => clearCart()}>
                      <Image
                        source={require('../../Images/trash.png')}
                        style={{marginRight: 6}}
                      />

                      <Text style={global.errorText}>Clear All</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
              {/* </PTRView> */}
            </View>
          </View>

          {/* /* Add product Models sceen */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View
              style={[
                global.commonModalbg,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <View style={[global.modalBoxscreeen, global.commonBoxshadow]}>
                {step1 ? (
                  <Addproduct
                    navigation={navigation}
                    onClosemodel={onClosemodel}
                    onShowstep2={onShowstep2}
                    onShowstep3={onShowstep3}
                  />
                ) : step2 ? (
                  <View style={global.tabModel_typecoverhalf}>
                    <Otherpackage onClosestep2={onClosestep2} />
                  </View>
                ) : step3 ? (
                  <View style={global.tabModel_typecoverhalf}>
                    <Selectedoption
                      onShowstep4={onShowstep4}
                      onClosestep3={onClosestep3}
                    />
                  </View>
                ) : step4 ? (
                  <View style={global.tabModel_typecoverhalf}>
                    <CreateOptiongroup
                      onClosestep4={onClosestep4}
                      onShowstep5={onShowstep5}
                    />
                  </View>
                ) : step5 ? (
                  <View style={global.tabModel_typecoverhalf}>
                    <Assignchoice
                      onClosestep5={onClosestep5}
                      onShowstep6={onShowstep6}
                    />
                  </View>
                ) : step6 ? (
                  <View style={global.tabModel_typecoverhalf}>
                    <AddOption onClosestep6={onClosestep6} />
                  </View>
                ) : null}
              </View>
            </View>
          </Modal>
          {/* /* Add product Models sceen */}

          {/* /* Payment Mode l */}

          <Modal animationType="slide" transparent={true} visible={payModel}>
            <View
              style={[
                global.commonModalbg,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <View style={{width: global.Dimensionwidth / 1.3, flex: 1}}>
                <View style={[global.commonBg, {borderRadius: 13}]}>
                  <View style={global.commonMobileHeader}>
                    <TouchableOpacity onPress={() => setpayModel(false)}>
                      <Image
                        source={require('../../Images/closeicon.png')}
                        style={{width: 30, height: 30}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    <Text style={global.headTitle}>Payment</Text>

                    <Text></Text>
                  </View>

                  <View style={{backgroundColor: '#F1F6FA', flex: 1}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <View style={{width: '13%'}}>
                        {PaymentTypes.PaymentTypes.map((e, index) => {
                          return (
                            <TouchableOpacity
                              style={
                                e.payment_methods_id === selectType
                                  ? global.payIconslistsfocus
                                  : global.payIconslists
                              }
                              key={index}
                              onPress={() => onselect(e.payment_methods_id)}>
                              <Image
                                source={{
                                  uri:
                                    groceryName === ''
                                      ? API_Links.URL + e.image
                                      : API_Links.SHOP_URL +
                                        groceryName +
                                        '/' +
                                        e.image,
                                }}
                                style={[
                                  global.cashCalcicon,
                                  {marginRight: 11, tintColor: '#144692'},
                                ]}
                              />

                              <Text
                                style={
                                  e.payment_methods_id === selectType
                                    ? global.payTabmenuactive
                                    : global.payTabmenu
                                }>
                                {e.name}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      <View style={{width: '52%', padding: 11}}>
                        {selectType === 5 ? (
                          <Coupon />
                        ) : selectType === 4 ? (
                          <Delivery />
                        ) : selectType === 2 ? (
                          <Credit />
                        ) : selectType === 1 ? (
                          <Cash
                            payAmount={payAmount}
                            onChangepayAmount={onChangepayAmount}
                            checkboxState={checkboxState}
                          />
                        ) : null}
                      </View>

                      <View
                        style={{
                          width: '35%',
                          flex: 1,
                          borderLeftWidth: 2,
                          borderLeftColor: '#EFEFEF',
                        }}>
                        <View style={{flex: 1}}>
                          <View
                            style={[{backgroundColor: '#fff', padding: 12}]}>
                            <View style={{flexDirection: 'column'}}>
                              <Text
                                style={[
                                  global.commonText,
                                  {textAlign: 'right'},
                                ]}>
                                23 Jun 2021
                              </Text>
                            </View>

                            <View
                              style={[
                                global.commonFlexrow_bt,
                                global.topSpacing,
                              ]}>
                              <View style={{justifyContent: 'space-between'}}>
                                <Text style={global.commonTextblue}>
                                  Net Value
                                </Text>

                                <Text style={{color: '#144693', fontSize: 18}}>
                                  {currencyCode}
                                </Text>
                              </View>

                              <View>
                                <Text
                                  style={[
                                    global.bigOtext_2,
                                    {textAlign: 'right'},
                                    global.bottomSpacing,
                                    global.COLOR_BLUE,
                                  ]}>
                                  {/* {cartItems.reduce((a, c) => a + c.products_price * c.qty, 0)} */}
                                  {(
                                    Math.round(getDiscountvalue * 100) / 100
                                  ).toFixed(2)}
                                </Text>

                                <Text
                                  style={[
                                    global.bigOtext_1,
                                    {textAlign: 'right'},
                                    global.COLOR_RED,
                                  ]}>
                                  {setpayAmount}

                                  {/* - {cartItems.reduce((a, c) => a + c.products_price * c.qty, 0)} */}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={{padding: 20}}>
                            <TouchableOpacity
                              style={[
                                selectType === 1 && payAmount === ''
                                  ? global.commmonDiasbletn
                                  : global.commonButton,
                              ]}
                              onPress={() => [
                                onPayment(),

                                // setBlmodel(true),

                                // setpayModel(false),
                              ]}
                              disabled={
                                selectType === 1 && payAmount === ''
                                  ? true
                                  : false
                              }>
                              <Text style={[global.btnText1, {}]}>
                                Payment Confirm
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                      <View></View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          {/* /* Payment Mode l */}

          {qrkModel ? <Barcodesearch oncloseQrmodel={oncloseQrmodel} /> : null}

          {remarkModel ? (
            <Save
              onCloseRemark={onCloseRemark}
              onsaveRemark={onsaveRemark}
              onChangenote={onChangenote}
            />
          ) : null}

          <Modal animationType="slide" transparent={true} visible={blModel}>
            <View
              style={[
                global.commonModalbg,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <View
                style={[
                  {width: Dimensions.get('screen').width / 2.3},
                  {flex: 1},
                ]}>
                <Balance onBalanceclose={onBalanceclose} />
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={retriewModel}>
            <View
              style={[
                global.commonModalbg,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <View
                style={[
                  {width: Dimensions.get('screen').width / 1.5},
                  {flex: 1, flexDirection: 'row'},
                ]}>
                <RetriewList
                  onCloseretrievmodel={onCloseretrievmodel}
                  navigation={navigation}
                  route={route}
                  casherIds={casherId}
                />
              </View>
            </View>
          </Modal>

          <Modal animationType="slide" transparent={true} visible={scanProduct}>
            <View
              style={[
                global.commonModalbg,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <View
                style={{
                  width: global.Dimensionwidth / 1.3,
                  position: 'absolute',
                  zIndex: 9,
                  top: 37,
                  paddingHorizontal: 11,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    alignItems: 'center',
                    paddingHorizontal: 15,
                  }}>
                  <TouchableOpacity onPress={() => setScanner(false)}>
                    <Image source={require('../../Images/closeicon.png')} />
                  </TouchableOpacity>
                </View>
              </View>

              <QRCodeScanner
                //  topContent={
                //   <Text  style={{position:"absolute",bottom:110 ,zIndex:9999999 ,color:"red"}}>
                //    Please place in the scanning area and tap on barcode/QR code to focus
                //   </Text>
                // }
                onRead={onSuccess}
                flashMode={
                  isTorch
                    ? RNCamera.Constants.FlashMode.on
                    : RNCamera.Constants.FlashMode.off
                }
                showMarker={true}
                cameraStyle={{
                  height: global.Dimensionheight / 1.1,
                  width: global.Dimensionwidth / 1.3,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                customMarker={
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 17,
                      }}>
                      Please place in the scanning area and tap on barcode / QR
                      code to focus
                    </Text>

                    <View
                      style={{
                        borderColor: '#fff',
                        borderWidth: 1,
                        width: global.Dimensionwidth / 1.4,
                        height: global.Dimensionheight / 3.4,
                        marginVertical: 20,
                        borderRadius: 6,
                        position: 'relative',
                      }}>
                      <View
                        style={{
                          position: 'absolute',
                          bottom: -2,
                          right: 0,
                          left: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: 88,
                            height: 3,
                            backgroundColor: '#fff',
                          }}></View>
                      </View>
                    </View>

                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 17,
                      }}>
                      Scanning Barcode / QR code{' '}
                    </Text>
                  </View>
                }
              />
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}>
            <View
              style={[
                global.commonModalbg,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <View
                style={[
                  {width: Dimensions.get('screen').width / 2.2},
                  {flex: 1, overflow: 'hidden'},
                  global.commonBoxshadow,
                ]}>
                <Cartproductdiscount
                  oncloseCartproductdiscount={oncloseCartproductdiscount}
                  onOpendicountcalc={onOpendicountcalc}
                />
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={customerListmodel}>
            <View
              style={[
                global.commonModalbg,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <View
                style={[
                  {
                    width: Dimensions.get('screen').width / 1.8,
                    borderRadius: 15,
                  },
                  {flex: 1, overflow: 'hidden'},
                  global.commonBoxshadow,
                ]}>
                {customertogglescreen1 ? (
                  <Customerlistview
                    navigation={navigation}
                    oncloseCustomermodel={oncloseCustomermodel}
                    onAddcustomer={onAddcustomer}
                  />
                ) : customertogglescreen2 ? (
                  <Addcustomer
                    navigation={navigation}
                    route={route}
                    onClosecustomeradd={onClosecustomeradd}
                  />
                ) : (
                  <ScanBarcode
                    navigation={navigation}
                    route={route}
                    onAddcustomerScan={onAddcustomerScan}
                  />
                )}

                {/* {customertogglescreen1 ? (
                  <Customerlistview
                    navigation={navigation}
                    oncloseCustomermodel={oncloseCustomermodel}
                    onAddcustomer={onAddcustomer}
                  />
                ) : (
                  <Addcustomer
                    navigation={navigation}
                    route={route}
                    onClosecustomeradd={onClosecustomeradd}
                  />
                )} */}
              </View>
            </View>
          </Modal>

          <Modal
            animationType="none"
            transparent={true}
            visible={discountCalcmodel}
            onRequestClose={() => setModalVisible(false)}>
            <TouchableOpacity
              style={{flex: 1}}
              activeOpacity={1}
              onPressOut={() => setdiscountCalcmodel(false)}>
              <DiscountModel
                variation={variation}
                setVariation={setVariation}
                oncalculateDiscount={oncalculateDiscount}
                getClear={getClear}
                amount={amount}
                setAmount={setAmount}
              />
            </TouchableOpacity>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={attributemodel}>
            <TouchableOpacity
              style={[
                global.commonModalbg,
                {alignItems: 'center', justifyContent: 'center'},
              ]}
              onPress={() => setAttributemodel(false)}>
              <View
                style={[
                  global.commonWhitebg,
                  {
                    borderRadius: 11,
                    width:
                      checkDevicetype === 'Tablet'
                        ? global.Dimensionwidth / 2.6
                        : global.Dimensionwidth / 1.1,
                  },
                ]}>
                {/* <TouchableOpacity onPress={()=>setAttributemodel(false)} style={{padding:20 ,backgroundColor:"red"}}>
  <Text>w</Text>
</TouchableOpacity> */}

                <Text style={[global.headTitle, {textAlign: 'center'}]}>
                  {getprName}
                </Text>

                {attributeList.map(e => {
                  let getListattr = e;

                  let getOptionname = e.option.name;

                  return e.values.map(e => {
                    return (
                      <TouchableOpacity
                        onPress={() => ongetAttributelist(e, getListattr)}
                        style={[
                          {paddingVertical: 11},
                          global.flexLine,
                          global.topSpacing,
                        ]}>
                        <Text style={global.commonTextblue}>{getprName}</Text>

                        <View style={{marginVertical: 11}}>
                          <Text>
                            {e.value +
                              getOptionname +
                              ':' +
                              e.price_prefix +
                              e.price}{' '}
                            RM
                          </Text>
                        </View>

                        <Text style={{marginBottom: 11}}>
                          Price : {getprPrice}
                        </Text>

                        {e.price_prefix === '+' ? (
                          <Text>Sub Total : {getprPrice + e.price}</Text>
                        ) : (
                          <Text>Sub Total : {getprPrice - e.price}</Text>
                        )}
                      </TouchableOpacity>
                    );
                  });
                })}
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      )}

      {onload ? <Customloader /> : null}
    </SafeAreaView>
  );
}
//******** Main UI started   -*************//
