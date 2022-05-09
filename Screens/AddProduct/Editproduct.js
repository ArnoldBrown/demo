import React, {useState, useEffect, Fragment, useRef} from 'react';
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
  TouchableHighlight,
  TouchableWithoutFeedback,
  Switch,
  Platform,
  Dimensions,
  Modal,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import {Formik, useField, useFormikContext} from 'formik';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import Customloader from '../Customloader';
import {API_Links} from '../Api/Api';
import RBSheet from 'react-native-raw-bottom-sheet';
import uuid from 'react-native-uuid';
import moment from 'moment';

import RNPickerSelect from 'react-native-picker-select';
import {useSelector, useDispatch} from 'react-redux';
import {viewAllcategoryAction} from '../../action/categorylistAction';
import {manufacturelistAction} from '../../action/manufacturelistAction';
import {taxlistAction} from '../../action/taxlistAction';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button, Snackbar} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';
import Toast from 'react-native-simple-toast';
import {galleryData, galleryuploadData} from '../../action/galleryAction';
import  AuthId  from '../AuthId.style'


const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();
const windowwidth = Dimensions.get('screen').width;

export default function Editproduct({
  navigation,

  onClosemodel,
  onShowstep2,
  closeEditproductmodel,

  route,
  getProductid,

  getoldimgId,
  getFeature,
  getSlug,
}) {
  //// ----Redux-Hook --- //

  const dispatch = useDispatch();

  const viewallCatitems_array = useSelector(
    state => state.viewcategorylistReducer,
  );

  const {viewallCatitems} = viewallCatitems_array;

  const viewManufacturelistarray = useSelector(
    state => state.manufacturelistReducer,
  );

  const {manufactureListarray} = viewManufacturelistarray;

  const viewTaxlistarray = useSelector(state => state.taxlistReducer);

  const {taxListarray} = viewTaxlistarray;

  const viewGalleryarray = useSelector(state => state.gallerydataReducer);

  const {galleryArray, firstIndex} = viewGalleryarray;

  const [galleryboxwrap, setGalleryboxwrap] = useState(galleryArray);

  let yuu = galleryboxwrap.concat(galleryArray);

  let ui = yuu.filter(e => e.isSelect === true);

  const getLanguageids = useSelector(state => state.languageReducer);
  const {languageId} = getLanguageids;

  const shopName = useSelector(state => state.shopnameReducer);
  const {groceryName} = shopName;

  //// ----Redux-Hook --- //

  const [checkFeature, onCheckfeature] = React.useState(
    global.Dimensionwidth > 468
      ? getFeature === 1
        ? true
        : false
      : route.params.is_feature === 1
      ? true
      : false,
  );

  const [isLoader, setLoader] = useState(false);

  const rbSheet = useRef();

  const [toggleFlash, setToggleFlash] = useState(
    toggleFlash !== '' ? true : false,
  );

  const [toggleSpecial, setTogglespecial] = useState(
    toggleSpecial !== '' ? false : true,
  );

  const [snackVisible, setSnackvisible] = useState(false);

  // var timestamp = new Date().toISOString().replace(/[-:.]/g," ");

  const [images, setImages] = useState([]);

  const [isDatePickerVisible, setPickervisible] = useState(false);

  const [mode, setMode] = useState('date');

  const [pickStatus, setPickstatus] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [selectmultiCatids, onselectMulticatids] = useState([]);

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);

    setModalVisible(true);
  };

  const findDevicetype = DeviceType();

  const [isSelected, setisSelected] = useState(firstIndex !== {} ? ' ' : ' ');

  /// ---- Input  Fields  Starts -------- //

  const [productName, onChangeProductname] = React.useState('');
  const [productdiscrip, onChangediscrip] = React.useState('');
  const [productType, onChangeProducttype] = React.useState('');

  const [selectCtgy, onselectCtgy] = React.useState('');
  const [productPrice, onChangePrice] = React.useState('');
  const [productStatus, onChangeStatus] = React.useState('');
  const [minorderLimit, onChangeMinorderlimit] = React.useState('');
  const [maxorderLimit, onChangeMaxorderlimit] = React.useState('');
  const [productModel, onChangeModel] = React.useState('');
  const [manufacure, onChangeManufacture] = React.useState('');
  const [weight, onChangeWeight] = React.useState('');
  const [unit, onChangeUnit] = React.useState('');
  const [PrImage, onChangeImage] = React.useState('');

  const [tax, onChangetax] = React.useState('');
  const [videoCode, setVideocode] = React.useState('');
  const [FlashStartDate, SetFlashStartDate] =
    React.useState('Flash Start Date *');

  

  const [FlashStartTime, SetFlashStartTime] =
    React.useState('Flash Start Time *');
  const [FlashendDate, SetFlashendDate] = React.useState('Flash End Date *');
  const [FlashendTime, SetFlashendTime] = React.useState('Flash End Time *');
  const [Flashstatus, setFlashstatus] = React.useState('');
  const [Flashprice, setFlashprice] = React.useState('');
  const [specialExpdate, setspecialExpdate] = React.useState('Expire Date *');
  const [specialProductprice, setspecialPrice] = React.useState('');
  const [specialStatus, setspecialStatus] = React.useState('');


//console.log("selectmultiCatids.map(e => e).toString()",selectmultiCatids.map(e => e).toString())


  /// ----  Input Fields End's -------- //

  const onselectPicker = async (type, status) => {
    setPickervisible(true);

    setPickstatus(status);

    if (type === 'pick_date') {
      setMode('date');
    } else {
      setMode('time');
    }
  };

  const viewAllcategory = async () => {
    await dispatch(
      viewAllcategoryAction( languageId ,groceryName),
    );
  };

  const viewListmanufacture = async () => {
    dispatch(manufacturelistAction(languageId, groceryName));

    dispatch(taxlistAction(groceryName));
  };

  const viewGalleryimg = () => {
    dispatch(galleryData(0, groceryName));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewAllcategory(1, date, DeviceId, DeviceIp);

      viewListmanufacture();

      viewGalleryimg();
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const handleConfirmpick = (date, selectedDate) => {
    let currentDate = selectedDate || date;

    if (pickStatus === 'stDate') {
      let setCurrentdate = moment(currentDate).format('DD/MM/YYYY');
      SetFlashStartDate(setCurrentdate);
    } else if (pickStatus === 'stTime') {
      let setCurrentTime = moment(currentDate).format('hh:mm a');
      SetFlashStartTime(setCurrentTime);
    } else if (pickStatus === 'expDate') {
      let setExpdate = moment(currentDate).format('DD/MM/YYYY');
      SetFlashendDate(setExpdate);
    } else if (pickStatus === 'expTime') {
      let setExptime = moment(currentDate).format('hh:mm a');
      SetFlashendTime(setExptime);
    } else if (pickStatus === 'spExpdate') {
      let setspecialdate = moment(currentDate).format('DD/MM/YYYY');
      setspecialExpdate(setspecialdate);
    }

    setPickervisible(false);
  };

  const onOpencatlistsheet = async rr => {
    await rbSheet.current.open();

  };

  const ongetCatid = (id, name) => {
    

    if (selectmultiCatids.includes(id)) {
      const newListitems = selectmultiCatids.filter(catId => catId !== id);

      onselectMulticatids(newListitems);
    } else {
      onselectMulticatids([...selectmultiCatids, id]);
    }
  };

  useEffect(() => {
    var data = new FormData();

    data.append('language_id', languageId);
    data.append(
      'products_id',
      global.Dimensionwidth > 468 ? getProductid : route.params.products_id,
    );
    fetch( groceryName ==="" ?    API_Links.BASE_URL + API_Links.EDIT_PR  : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.EDIT_PR , {
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

      .then(e => {
        onChangeProductname(e.data.description.products_name);
        onChangediscrip(e.data.description.products_description);
        onChangeProducttype(
          parseInt(e.data.product.map(e => e.products_type).toLocaleString()),
        );
        //onselectMulticatids()
        onChangePrice(
          e.data.product.map(e => e.products_price).toLocaleString(),
        );

        onChangeStatus(
          parseInt(e.data.product.map(e => e.products_status).toLocaleString()),
        );
        //
        onChangeMinorderlimit(
          e.data.product.map(e => e.products_min_order).toLocaleString(),
        );

        onChangeMaxorderlimit(
          e.data.product.map(e => e.products_max_stock).toLocaleString(),
        );

        onChangeManufacture(
          parseInt(
            e.data.product.map(e => e.manufacturers_id).toLocaleString(),
          ),
        );

        onChangeWeight(
          e.data.product.map(e => e.products_weight).toLocaleString(),
        );

        onChangeUnit(
          e.data.product.map(e => e.products_weight_unit).toLocaleString(),
        );

        ///
        onChangetax(
          parseInt(
            e.data.product.map(e => e.products_tax_class_id).toLocaleString(),
          ),
        );

        onChangeModel(
          e.data.product.map(e => e.products_model).toLocaleString(),
        );

        onCheckfeature(
          e.data.product.map(e => (e.is_feature === 1 ? true : false)),
        );

        onChangeImage(e.data.product.map(e => e.path));

        let flashProduct = e.data.flashProduct
          .map(e => e.products_id)
          .toLocaleString();

        setToggleFlash(flashProduct !== '' ? true : false);

        SetFlashStartDate(
          moment
            .unix(parseInt(e.data.flashProduct.map(e => e.flash_start_date)))
            .format('MM/DD/YYYY'),
        );

        // SetFlashStartTime(moment(  parseInt( e.data.flashProduct.map((e)=>e.flash_start_date).toLocaleString())).format("HH-MM-SS"))

        SetFlashStartTime(
          moment
            .unix(parseInt(e.data.flashProduct.map(e => e.flash_start_date)))
            .format('HH:mm,a'),
        );

        SetFlashendDate(
          moment
            .unix(parseInt(e.data.flashProduct.map(e => e.flash_expires_date)))
            .format('MM/DD/YYYY'),
        );

        SetFlashendTime(
          moment
            .unix(parseInt(e.data.flashProduct.map(e => e.flash_expires_date)))
            .format('HH:mm,a'),
        );

        setFlashprice(
          e.data.flashProduct
            .map(e => e.flash_sale_products_price)
            .toLocaleString(),
        );

        setFlashstatus(
          parseInt(
            e.data.flashProduct.map(e => e.flash_status).toLocaleString(),
          ),
        );

        onselectMulticatids(selectmultiCatids.concat(e.data.categories_array));

        setspecialPrice(
          e.data.specialProduct
            .map(e => e.specials_new_products_price)
            .toLocaleString(),
        );

        setspecialStatus(
          parseInt(e.data.specialProduct.map(e => e.status).toLocaleString()),
        );

        setspecialExpdate(
          moment
            .unix(parseInt(e.data.specialProduct.map(e => e.expires_date)))
            .format('MM/DD/YYYY'),
        );

        let specialProduct = e.data.specialProduct
          .map(e => e.products_id)
          .toLocaleString();

        setTogglespecial(specialProduct !== '' ? true : false);
      })
      .catch(e => {
        console.log(e);
      });

    return () => {};
  }, []);

  const getSelected = id => selectmultiCatids.includes(id);

  function Loopcategory({comment}) {
    const nestedComments = (comment.childs || []).map(comment => {
      return (
        <View>
          <Loopcategory key={comment.id} comment={comment} />
        </View>
      );
    });

    return (
      <View style={{marginTop: 12}}>
        <TouchableOpacity
          onPress={() => [
            ongetCatid(comment.categories_id, comment.categories_name),
          ]}>
          <View style={{flexDirection: 'row'}}>
            <View style={global.Checkboxdisable}></View>

            {getSelected(comment.categories_id) && (
              <View style={[global.Checkbox, {position: 'absolute', top: 0}]}>
                <Image
                  source={require('../../Images/tick.png')}
                  style={[{width: 12, height: 12, tintColor: '#fff'}]}
                  resizeMode="contain"
                />
              </View>
            )}

            <View>
              <Text style={global.commonTextblue}>
                {comment.categories_name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View>{nestedComments}</View>
      </View>
    );
  }

  const renderEmptyContainer = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: global.Dimensionheight / 2.5,
        }}>
        <View>
          <Text>No Uploads Found</Text>
        </View>
      </View>
    );
  };

  const Df = item => {
    /// console.log( item.isSelect = !item.isSelect)

    item.isSelect = !item.isSelect;

    setGalleryboxwrap([...galleryboxwrap]);

    item.selectedClass = item.isSelect
      ? global.itemContainer1
      : global.itemContainer1;
  };

  const addproduct = () => {
    setLoader(true);

    var data = new FormData();

    data.append(
      'id',
      global.Dimensionwidth > 468 ? getProductid : route.params.products_id,
    );

    data.append('products_type', productType);
    data.append('categories', selectmultiCatids.map(e => e).toString());
    data.append('products_price', productPrice);
    data.append('products_min_order', minorderLimit);
    data.append('products_max_stock', maxorderLimit);

    data.append('image', isSelected);
    data.append(
      'oldImage',
      global.Dimensionwidth > 468 ? getoldimgId : route.params.old_image_id,
    );

    data.append('products_name', productName);
    data.append('products_descriptions', productdiscrip);
    data.append('products_status', productStatus);
    data.append(
      'old_slug',
      global.Dimensionwidth > 468 ? getSlug : route.params.products_slug,
    );
    data.append('slug', productModel);
    data.append('manufacturers_id', manufacure === ' ' ? '' : manufacure);
    data.append('products_model', productModel);
    data.append('products_weight', weight);
    data.append('tax_class_id', tax === '' ? 0 : tax);
    data.append('products_weight_unit', unit);
    data.append('is_feature', checkFeature ? 1 : 0);
    data.append('products_video_link', videoCode);
    data.append('isFlash', toggleFlash ? 'yes' : 'no');

    data.append('flash_start_date', toggleFlash ? FlashStartDate : '');
    data.append('flash_start_time', toggleFlash ? FlashStartTime : '');
    data.append('flash_expires_date', toggleFlash ? FlashendDate : '');
    data.append('flash_end_time', toggleFlash ? FlashendTime : ' ');
    data.append('flash_sale_products_price', Flashprice);
    data.append('flash_status', Flashstatus);

    data.append('isSpecial', toggleSpecial ? 'yes' : 'no');

    data.append('expires_date', toggleSpecial ? specialExpdate : '');
    data.append('specials_new_products_price', specialProductprice);
    data.append('status', specialStatus);

    fetch( groceryName===""  ?   API_Links.BASE_URL + API_Links.EDIT_PRODUCT  :  API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.EDIT_PRODUCT  , {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'multipart/form-data',
      }),
      body: data,
    })
      .then(response => response.json())

      .then(data => {
        setLoader(false);

        if (data.success === '1') {
          setSnackvisible(true);
          closeEditproductmodel();

          if (productType === 1) {
            navigation.navigate('AddOption', {
              prId: data.data,
            });
          }
        }
      })
      .catch(e => {
        setLoader(false);
        console.log(e);
      });
  };

  const onsubmit = () => {
    if (productName.length > 0) {
      if (productdiscrip.length > 0) {
        if (productType !== '') {
          if (selectmultiCatids.length !== 0) {
            if (productPrice !== '') {
              if (productStatus !== '') {
                if (minorderLimit !== '') {
                  if (maxorderLimit !== '') {
                    if (toggleFlash === true) {
                      if (FlashStartDate !== 'Flash Start Date *') {
                        if (FlashStartTime !== 'Flash Start Time *') {
                          if (FlashendDate !== 'Flash End Date *') {
                            if (FlashendTime !== 'Flash End Time *') {
                              if (Flashprice !== '') {
                                if (Flashstatus !== '') {
                                  addproduct();
                                } else {
                                  Toast.showWithGravity(
                                    'Select flash status',
                                    Toast.SHORT,
                                    Toast.TOP,
                                  );
                                }
                              } else {
                                Toast.showWithGravity(
                                  'Enter Flash Price',
                                  Toast.SHORT,
                                  Toast.TOP,
                                );
                              }
                            } else {
                              Toast.showWithGravity(
                                'Enter Flash End Time',
                                Toast.SHORT,
                                Toast.TOP,
                              );
                            }
                          } else {
                            Toast.showWithGravity(
                              'Enter Flash End Date',
                              Toast.SHORT,
                              Toast.TOP,
                            );
                          }
                        } else {
                          Toast.showWithGravity(
                            'Enter Flash Start Time',
                            Toast.SHORT,
                            Toast.TOP,
                          );
                        }
                      } else {
                        Toast.showWithGravity(
                          'Enter FlashStartDate',
                          Toast.SHORT,
                          Toast.TOP,
                        );
                      }
                    } else if (toggleSpecial === true) {
                      if (specialExpdate !== 'Expire Date *') {
                        if (specialProductprice !== '') {
                          if (specialStatus !== '') {
                            addproduct();
                          } else {
                            Toast.showWithGravity(
                              'Select status ',
                              Toast.SHORT,
                              Toast.TOP,
                            );
                          }
                        } else {
                          Toast.showWithGravity(
                            'Enter Price ',
                            Toast.SHORT,
                            Toast.TOP,
                          );
                        }
                      } else {
                        Toast.showWithGravity(
                          'Select expiry date ',
                          Toast.SHORT,
                          Toast.TOP,
                        );
                      }
                    } else {
                      addproduct();
                    }
                  } else {
                    Toast.showWithGravity(
                      'Enter maxorder',
                      Toast.SHORT,
                      Toast.TOP,
                    );
                  }
                } else {
                  Toast.showWithGravity(
                    'Enter minorder',
                    Toast.SHORT,
                    Toast.TOP,
                  );
                }
              } else {
                Toast.showWithGravity('Select status', Toast.SHORT, Toast.TOP);
              }
            } else {
              Toast.showWithGravity('Enter amount', Toast.SHORT, Toast.TOP);
            }
          } else {
            Toast.showWithGravity('select Category', Toast.SHORT, Toast.TOP);
          }
        } else {
          Toast.showWithGravity('select type', Toast.SHORT, Toast.TOP);
        }
      } else {
        Toast.showWithGravity(
          'Enter product description',
          Toast.SHORT,
          Toast.TOP,
        );
      }
    } else {
      Toast.showWithGravity('Enter product name', Toast.SHORT, Toast.TOP);
    }

    // else {
    //   Toast.showWithGravity('Upload product images', Toast.SHORT, Toast.TOP);
    // }
  };

  const onClosegalllerysec = () => {
    setModalVisible(false);

    if (ui.length > 0) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  };

  return (
    <SafeAreaView style={[global.commonBg, {borderRadius: 11}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={[global.commonMobileHeader]}>
        <TouchableOpacity
          onPress={() =>
            global.Dimensionwidth > 468
              ? closeEditproductmodel()
              : navigation.goBack()
          }>
          <Image
            source={require('../../Images/closeicon.png')}
            style={global.settingIcon}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Edit Product</Text>

        <TouchableOpacity onPress={() => onsubmit()}>
          {/* <Image
                  source={require('../../Images/plus.png')}
                  style={{width: 12, height: 12, marginRight: 6}}
                /> */}
          <Text style={global.headSvbtn}>Save</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          {
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            paddingHorizontal: 13,
          },
        ]}>
        <ScrollView
          contentContainerStyle={[global.formSection, {maxWidth: '100%'}]}
          showsVerticalScrollIndicator={false}>
          <View>
            {/* <View style={[global.commonFlexrow_ct, {marginBottom: 11}]}>
              <TouchableOpacity>
                <Text style={global.commonTextblueH1}>Upload Images</Text>
              </TouchableOpacity>

              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View> */}

            <View
              style={{
                flexDirection: global.Dimensionwidth > 468 ? 'row' : 'column',
              }}>
              <View
                style={{
                  width: 110,
                  height: 80,
                  borderTopRightRadius: 5,
                  marginBottom: global.Dimensionwidth > 468 ? 14 : 0,
                  borderWidth: 1,
                  borderTopLeftRadius: 5,
                  borderColor: '#eee',
                }}>
                <Image
                  source={{uri:  groceryName==="" ? API_Links.URL+PrImage :    API_Links.SHOP_URL+groceryName+"/" + PrImage}}




                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                />

                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{
                    position: 'absolute',

                    left: 0,
                    bottom: 0,
                    width: '100%',
                    height: 25,
                    backgroundColor: '#000',
                    opacity: 0.7,

                    overflow: 'hidden',
                    borderRadius: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.commonTextwhite, {textAlign: 'center'}]}>
                    Tap to edit
                  </Text>
                </TouchableOpacity>

                {/* <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={[
                      global.appBgcolor,
                      {
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 10,
                      },
                    ]}>
                    <Image
                      source={require('../../Images/plus-math.png')}
                      style={global.settingIcon}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>

              <Text></Text>

              <View
                style={{
                  flex: 1,
                  paddingLeft: global.Dimensionwidth > 468 ? 11 : 0,
                }}>
                <View style={[global.bottomSpacing]}>
                  <TextInput
                    style={global.inputBox}
                    onChangeText={onChangeProductname}
                    value={productName}
                    placeholder="Product Name *"
                    placeholderTextColor="#b6b9bd"
                  />
                </View>

                <View style={[global.bottomSpacing]}>
                  <TextInput
                    style={[global.inputBox, {height: 100}]}
                    multiline={true}
                    onChangeText={onChangediscrip}
                    value={productdiscrip}
                    placeholder="Products Descriptions *"
                    placeholderTextColor="#b6b9bd"
                  />
                </View>
              </View>
            </View>

            <View style={[global.formFlexwrap, global.bottomSpacing]}>
              <View style={[global.commonTwocol]}>
                <View style={global.inputBox}>
                  <RNPickerSelect
                    onValueChange={value => [onChangeProducttype(value)]}
                    value={productType}
                    style={{
                      placeholder: {color: '#b6b9bd'},
                      inputIOS: {color: '#000'},
                      inputAndroid: {color: '#000'},
                    }}
                    placeholder={{
                      label: 'Product Type *',
                      value: '',
                    }}
                    items={[
                      {label: 'Simple', value: 0},
                      {label: 'Variable', value: 1},
                      {label: 'External', value: 2},
                    ]}
                  />
                </View>
              </View>

              <View style={[global.commonTwocol]}>
                <TouchableOpacity
                  style={global.inputBox}
                  onPress={() => [onOpencatlistsheet(route.params.categories)]}>
                  {selectmultiCatids.length === 0 ? (
                    <Text style={{color: '#b6b9bd'}}>Select Category *</Text>
                  ) : (
                    <Text>Selected</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={[global.formFlexwrap, global.bottomSpacing]}>
              <View style={[global.commonTwocol]}>
                <TextInput
                  style={[global.inputBox]}
                  placeholder="Product Price *"
                  placeholderTextColor="#b6b9bd"
                  keyboardType="decimal-pad"
                  onChangeText={onChangePrice}
                  value={productPrice}
                />
              </View>

              <View style={[global.commonTwocol]}>
                <View style={global.inputBox}>
                  <RNPickerSelect
                    style={{
                      placeholder: {color: '#b6b9bd'},
                      inputIOS: {color: '#000'},
                      inputAndroid: {color: '#000'},
                    }}
                    placeholder={{
                      label: 'Status *',
                      value: '',
                    }}
                    onValueChange={value => [
                      //setGh(value),
                      onChangeStatus(value),
                    ]}
                    value={productStatus}
                    items={[
                      {label: 'Active', value: 1},
                      {label: 'Inactive', value: 0},
                    ]}
                  />
                </View>
              </View>
            </View>

            <View style={[global.formFlexwrap, global.bottomSpacing]}>
              <View style={[global.commonTwocol]}>
                <TextInput
                  style={[global.inputBox]}
                  placeholder="Min Order Limit *"
                  placeholderTextColor="#b6b9bd"
                  keyboardType="number-pad"
                  onChangeText={onChangeMinorderlimit}
                  value={minorderLimit}
                />
              </View>

              <View style={[global.commonTwocol]}>
                <TextInput
                  style={[global.inputBox, {paddingRight: 10}]}
                  placeholder="Max Order Limit *"
                  placeholderTextColor="#b6b9bd"
                  keyboardType="number-pad"
                  onChangeText={onChangeMaxorderlimit}
                  value={maxorderLimit}
                />
              </View>
            </View>

            <View style={[global.formFlexwrap, global.bottomSpacing]}>
              <View style={[global.commonTwocol]}>
                <TextInput
                  style={[global.inputBox]}
                  placeholder="Product Model"
                  placeholderTextColor="#b6b9bd"
                  onChangeText={onChangeModel}
                  value={productModel}
                />
              </View>

              <View style={[global.commonTwocol]}>
                <View style={global.inputBox}>
                  <RNPickerSelect
                    onValueChange={value => onChangeManufacture(value)}
                    value={manufacure}
                    placeholder={{
                      label: 'Select Manufacture',
                    }}
                    style={{
                      placeholder: {color: '#b6b9bd'},
                      inputIOS: {color: '#000'},
                      inputAndroid: {color: '#000'},
                    }}
                    items={manufactureListarray.map(e => {
                      return {label: e.name, value: e.id};
                    })}
                  />
                </View>
              </View>
            </View>

            <View style={[global.formFlexwrap, global.bottomSpacing]}>
              <View style={[global.commonTwocol, {flexDirection: 'row'}]}>
                <TextInput
                  style={[
                    global.inputBox,
                    {
                      width: '65%',
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                  ]}
                  placeholder="Weight"
                  placeholderTextColor="#b6b9bd"
                  keyboardType="decimal-pad"
                  onChangeText={onChangeWeight}
                  value={weight}
                />

                <TextInput
                  style={[
                    global.inputBox,
                    {
                      width: '35%',
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderLeftWidth: 0,
                    },
                  ]}
                  placeholder="Unit"
                  placeholderTextColor="#b6b9bd"
                  keyboardType="decimal-pad"
                  onChangeText={onChangeUnit}
                  value={unit}
                />
              </View>

              <View style={[global.commonTwocol]}>
                <View style={global.inputBox}>
                  <RNPickerSelect
                    onValueChange={value => onChangetax(value)}
                    value={tax}
                    placeholder={{
                      label: 'Select Tax',
                    }}
                    style={{
                      placeholder: {color: '#b6b9bd'},
                      inputIOS: {color: '#000'},
                      inputAndroid: {color: '#000'},
                    }}
                    items={taxListarray.map(e => {
                      return {
                        label: e.tax_class_title,
                        value: e.tax_class_id,
                      };
                    })}
                  />
                </View>
              </View>
            </View>
            <View style={[global.formFlexwrap, global.bottomSpacing]}>
              <TextInput
                style={[global.inputBox, {height: 100}]}
                placeholder="Video EmbedCode Link"
                placeholderTextColor="#b6b9bd"
                multiline={true}
                onChangeText={setVideocode}
                value={videoCode}
              />
            </View>
            <View></View>

            <View
              style={[
                global.checkBoxflex,
                global.bottomSpacing,
                global.topSpacing,
              ]}>
              <View style={[global.checkBoxWrapper, {width: '33.33%'}]}>
                <TouchableOpacity
                  onPress={() => onCheckfeature(!checkFeature)}
                  style={global.flexRowsec}>
                  <View
                    style={
                      checkFeature
                        ? global.customCheckbox
                        : global.customCheckboxdisable
                    }>
                    {checkFeature ? (
                      <Image
                        source={require('../../Images/tick.png')}
                        style={[{width: 15, height: 15}, {tintColor: '#fff'}]}
                        resizeMode="contain"
                      />
                    ) : null}
                  </View>

                  <Text style={global.commonTextblue}>Is-Feature </Text>
                </TouchableOpacity>
              </View>

              <View style={[global.checkBoxWrapper, {width: '33.33%'}]}>
                <TouchableOpacity
                  onPress={() => [
                    setToggleFlash(!toggleFlash),
                    setTogglespecial(false),
                  ]}
                  style={global.flexRowsec}>
                  <View
                    style={
                      toggleFlash
                        ? global.customCheckbox
                        : global.customCheckboxdisable
                    }>
                    {toggleFlash ? (
                      <Image
                        source={require('../../Images/tick.png')}
                        style={[{width: 15, height: 15}, {tintColor: '#fff'}]}
                        resizeMode="contain"
                      />
                    ) : null}
                  </View>

                  <Text style={global.commonTextblue}>Is-Flash </Text>
                </TouchableOpacity>
              </View>

              <View style={[global.checkBoxWrapper, {width: '33.33%'}]}>
                <TouchableOpacity
                  onPress={() => [
                    setTogglespecial(!toggleSpecial),
                    setToggleFlash(false),
                  ]}
                  style={global.flexRowsec}>
                  <View
                    style={
                      toggleSpecial
                        ? global.customCheckbox
                        : global.customCheckboxdisable
                    }>
                    {toggleSpecial ? (
                      <Image
                        source={require('../../Images/tick.png')}
                        style={[{width: 15, height: 15}, {tintColor: '#fff'}]}
                        resizeMode="contain"
                      />
                    ) : null}
                  </View>

                  <Text style={global.commonTextblue}>Is-Special </Text>
                </TouchableOpacity>
              </View>
            </View>

            {toggleFlash ? (
              <View>
                <View style={[global.formFlexwrap, global.bottomSpacing]}>
                  <View style={[global.commonTwocol]}>
                    <TouchableOpacity
                      style={global.inputBox}
                      onPress={() => [
                        onselectPicker('pick_date', 'stDate'),
                        // .then(() => {
                        //   props.setFieldValue(
                        //     'flash_start_date',
                        //     FlashStartDate,
                        //   ),
                        //     //props.setTouched('flash_start_date',FlashStartDate),
                        //     props.setFieldTouched('flash_start_date', true);
                        // })
                        // .catch(e => console.log(e)),
                      ]}>
                      <Text
                        style={
                          FlashStartDate === 'Flash Start Date *'
                            ? {color: '#b6b9bd'}
                            : {color: '#000'}
                        }>
                        {FlashStartDate}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[global.commonTwocol]}>
                    <TouchableOpacity
                      style={global.inputBox}
                      onPress={() => [
                        onselectPicker('pick_time ', 'stTime'),
                        // .then(() => {
                        //   props.setFieldValue(
                        //     'flash_start_time',
                        //     FlashStartTime,
                        //   );
                        // })
                        // .catch(e => console.log(e)),
                      ]}>
                      <Text
                        style={
                          FlashStartTime === 'Flash Start Time *'
                            ? {color: '#b6b9bd'}
                            : {color: '#000'}
                        }>
                        {FlashStartTime}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[global.formFlexwrap, global.bottomSpacing]}>
                  <View style={[global.commonTwocol]}>
                    <Pressable
                      style={global.inputBox}
                      onPress={() => [
                        onselectPicker('pick_date', 'expDate'),
                        // .then(() => {
                        //   props.setFieldValue(
                        //     'flash_expires_date',
                        //     FlashendDate,
                        //   ),
                        //     //props.setTouched('flash_start_date',FlashStartDate),
                        //     props.setFieldTouched('flash_expires_date', true);
                        // })
                        // .catch(e => console.log(e)),
                      ]}>
                      <Text
                        style={
                          FlashendDate === 'Flash End Date *'
                            ? {color: '#b6b9bd'}
                            : {color: '#000'}
                        }>
                        {' '}
                        {FlashendDate}
                      </Text>
                    </Pressable>
                  </View>

                  <View style={[global.commonTwocol]}>
                    <TouchableOpacity
                      style={global.inputBox}
                      onPress={() => [
                        onselectPicker('pick_time', 'expTime'),
                        // .then(() => {
                        //   props.setFieldValue('flash_end_time', FlashendTime),
                        //     //props.setTouched('flash_start_date',FlashStartDate),
                        //     props.setFieldTouched('flash_end_time', true);
                        // })
                        // .catch(e => console.log(e)),
                      ]}>
                      <Text
                        style={
                          FlashendTime === 'Flash End Time *'
                            ? {color: '#b6b9bd'}
                            : {color: '#000'}
                        }>
                        {' '}
                        {FlashendTime}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[global.formFlexwrap, global.bottomSpacing]}>
                  <View style={[global.commonTwocol]}>
                    <TextInput
                      style={[global.inputBox]}
                      placeholder="flash sale Price *"
                      placeholderTextColor="#b6b9bd"
                      keyboardType="decimal-pad"
                      onChangeText={setFlashprice}
                      value={Flashprice}
                    />
                  </View>

                  <View style={[global.commonTwocol]}>
                    <View style={global.inputBox}>
                      <RNPickerSelect
                        //onValueChange={(value) => console.log(value)}

                        onValueChange={value => setFlashstatus(value)}
                        value={Flashstatus}
                        style={{
                          placeholder: {color: '#b6b9bd'},
                          inputIOS: {color: '#000'},
                          inputAndroid: {color: '#000'},
                        }}
                        placeholder={{
                          label: 'Select Status *',
                          value: '',
                        }}
                        items={[
                          {label: 'Active', value: 1},
                          {label: 'InActive', value: 0},
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : null}

            {toggleSpecial ? (
              <View>
                <View style={[global.formFlexwrap, global.bottomSpacing]}>
                  <View style={[global.commonTwocol]}>
                    <TouchableOpacity
                      style={global.inputBox}
                      onPress={() => [
                        onselectPicker('pick_date', 'spExpdate'),
                        // .then(() => {
                        //   props.setFieldValue('expires_date', specialExpdate),
                        //     //props.setTouched('flash_start_date',FlashStartDate),
                        //     props.setFieldTouched('expires_date', true);
                        // })
                        // .catch(e => console.log(e)),
                      ]}>
                      <Text
                        style={
                          specialExpdate === 'Expire Date *'
                            ? {color: '#b6b9bd'}
                            : {color: '#000'}
                        }>
                        {specialExpdate}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[global.commonTwocol]}>
                    <TextInput
                      style={[global.inputBox]}
                      placeholder="Special product price *"
                      placeholderTextColor="#b6b9bd"
                      keyboardType="decimal-pad"
                      onChangeText={setspecialPrice}
                      value={specialProductprice}
                    />
                  </View>
                </View>

                <View style={[global.formFlexwrap, global.bottomSpacing]}>
                  <View style={[global.commonTwocol]}>
                    <View style={global.inputBox}>
                      <RNPickerSelect
                        //onValueChange={(value) => console.log(value)}

                        onValueChange={value => setspecialStatus(value)}
                        value={specialStatus}
                        style={{
                          placeholder: {color: '#b6b9bd'},
                          inputIOS: {color: '#000'},
                          inputAndroid: {color: '#000'},
                        }}
                        placeholder={{
                          label: 'Select Status',
                          value: '',
                        }}
                        items={[
                          {label: 'Active', value: 1},
                          {label: 'InActive', value: 0},
                        ]}
                      />
                    </View>
                  </View>

                  <View style={[global.commonTwocol]}></View>
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>

      {isLoader ? <Customloader /> : null}

      <RBSheet
        ref={rbSheet}
        //height={300}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            padding: 21,
          },
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {viewallCatitems.map(e => {
            return (
              <View>
                <Loopcategory key={e.id} comment={e} />
              </View>
            );
          })}
        </ScrollView>
      </RBSheet>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirmpick}
        onCancel={() => setPickervisible(false)}
        //onDateChange={}
      />

      <Snackbar
        visible={snackVisible}
        // duration="3000"
        onDismiss={() => setSnackvisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        }}>
        Product Added Successfully.
      </Snackbar>

      <Modal transparent={true} visible={modalVisible} animationType={'slide'}>
        <View
          style={[
            global.commonModalbg,
            {justifyContent: 'flex-end', padding: 12},
          ]}>
          <View style={[global.commonWhitebg, {padding: 0, borderRadius: 11}]}>
            <View style={{padding: 15}}>
              <Text style={global.commonTextblueH1}>Choose Image</Text>
            </View>

            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                height: 350,
                borderColor: '#DADADA',
              }}>
              <FlatGrid
                showsVerticalScrollIndicator={false}
                itemDimension={140}
                data={yuu}
                ListEmptyComponent={renderEmptyContainer()}
                spacing={6}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => [Df(item), setisSelected(item.id)]}>
                    <View
                      style={[
                        [
                          isSelected === item.id
                            ? {height: 150, padding: 3, borderWidth: 2}
                            : {height: 150, padding: 5},
                        ],
                      ]}>
                      <Image
                        source={{
                          uri: groceryName=== ""  ? API_Links.URL +item.path :API_Links.SHOP_URL+ groceryName +"/"+item.path,
                        }}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="cover"
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={[global.commonFlexrow_bt, {padding: 15}]}>
              <TouchableOpacity
                style={global.commonButton}
                onPress={() => {
                  ImagePicker.openPicker({
                    multiple: true,
                    includeBase64: true,

                    cropping: true,
                    avoidEmptySpaceAroundImage: true,
                    sortOrder: 'asc',
                    maxFiles: 53,
                  })
                    .then(res => {
                      if (res) {
                        setLoader(true);

                        var random = ('' + Math.random()).substring(2, 8);
                        var data = new FormData();

                        res.forEach((item, i) => {
                          data.append('file[]', {
                            uri:
                              Platform.OS === 'android'
                                ? item.path
                                : item.path.replace('file://', ''),
                            type: 'image/jpeg',
                            name: `POS_${random}.jpg`,
                          });
                        });

                        fetch(groceryName=== "" ?   API_Links.BASE_URL + API_Links.ADD_GALLERY  : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.ADD_GALLERY , {
                          method: 'POST',

                          headers: {
                            'consumer-key': API_Links.CONSUMER_KEY,
                            'consumer-secret':
                              API_Links.SECRET_KEY,
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
                          //  body: data,
                        })
                          .then(response => response.json())

                          .then(data => {
                            setLoader(false);

                            if (data.success === '1') {
                              Alert.alert(data.message, '', [{text: 'OK'}]);

                              viewGalleryimg();
                            }
                          });
                      }
                    })

                    .catch(e => {
                      console.log(e);
                    });
                }}>
                <Text style={global.btnText1}>Upload Image</Text>
              </TouchableOpacity>

              {isLoader ? (
                <ActivityIndicator size="small" color="#000" />
              ) : null}

              <TouchableOpacity
                style={global.commonButton}
                onPress={() => [onClosegalllerysec()]}>
                <Text style={global.btnText1}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    padding: 5,
    height: 150,
  },

  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
