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
  Modal,
  Dimensions,
  TouchableHighlight,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import {global} from '../../styles/global';
import Managecategory from '../Settings/Managecategory';
import DeviceType from '../Orientation/DeviceType';
import Addcategory from '../Settings/Addcategory';
import Editcategory from '../Settings/Editcategory';
import {useSelector, useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import {API_Links} from '../Api/Api';
import {SwipeListView} from 'react-native-swipe-list-view';
import Shifthistory from '../Shiiftscreens/Shifthistory';
import Shiftdetail from '../Shiiftscreens/Shiftdetail';

import {
  deleteCategory,
  singlecatidAction,
} from '../../action/categorylistAction';
import Customloader from '../Customloader';
import {
  categorywiseProductaction,
  deleteSingleproductaction,
} from '../../action/categorywiseProductaction';
import FlatlistEmpty from '../FlatlistEmpty';
import {manageAction} from '../../action/manageAction';
import Toast from 'react-native-simple-toast';
import {Swipeable} from 'react-native-gesture-handler';
import Editproduct from '../AddProduct/Editproduct';
import AuthId from '../AuthId.style';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();

//const windowwidth = Dimensions.get('screen').width;

export default function InventoryMain({navigation, route}) {
  // =======  Redux states & functions  ========///
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();

  const state = useSelector(state => state.categorywiseproductReducer);

  const {productArraylist, loader} = state;

  const getToken = useSelector(state => state.loginReducer);
  const {casherId} = getToken;

  const getAdminroles = useSelector(state => state.manageReducer);
  const {roleList} = getAdminroles;

  const getLanguageids = useSelector(state => state.languageReducer);
  const {languageId} = getLanguageids;

  const getCurrencycodes = useSelector(state => state.currencyReducer);
  const {currencyCode} = getCurrencycodes;

  const shopName = useSelector(state => state.shopnameReducer);
  const {groceryName} = shopName;

  // =======  Redux states & functions  ========///

  const [viewCat, setviewCat] = useState([]);
  const [viewCatid, setviewCatid] = useState('');
  const [catName, setcatName] = useState('');

  const [isLoader, setLoader] = useState(false);

  const [text, onChangeText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editModel, seteditModel] = useState(false);
  const [editProductmodel, seteditProductmodel] = useState(false);

  const [propsCategoryname, setpropsCategoryname] = useState('');
  const [propsImagepath, setpropsImagepath] = useState('');
  const [propsParentid, setpropsParentid] = useState('');
  const [propsSlugname, setpropsSlugname] = useState('');
  const [propsId, setpropsId] = useState('');
  const [propsStatus, setpropsStatus] = useState('');

  const [getProductid, setProductid] = useState('');
  const [getoldimgId, setoldimgId] = useState('');
  const [getFeature, setFeature] = useState('');

  const [getSlug, setSlug] = useState('');

  //  comment.categories_id,

  const findDevicetype = DeviceType();

  const onclose = text => {
    setModalVisible(false);

    viewAllcategoryAction(languageId);
  };

  function MyTabs() {
    return (
      <Tab.Navigator screenOptions={{}}>
        <Tab.Screen name="Shifthistory" component={Shifthistory} />
        <Tab.Screen name="Shiftdetail" component={Shiftdetail} />
      </Tab.Navigator>
    );
  }

  const viewAllcategoryAction = id => {
    setLoader(true);
    var data = new FormData();
    data.append('language_id', id);
    fetch(
      groceryName === ''
        ? API_Links.BASE_URL + API_Links.VIEW_CATEGORY
        : API_Links.SHOP_URL +
            groceryName +
            '/' +
            'api' +
            '/' +
            API_Links.VIEW_CATEGORY,
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

      .then(data => {
        setLoader(false);
        if (data.success === '1') {
          setviewCat(data.data);
          setviewCatid(data.data[0].categories_id);
          setcatName(data.data[0].categories_name);

          global.Dimensionwidth > 468
            ? dispatch(
                categorywiseProductaction(
                  languageId,
                  data.data[0].categories_id,
                  currencyCode,
                  groceryName,
                ),
              )
            : null;
        } else {
          setviewCat([]);
        }
      })

      .catch(e => console.log(e));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ///
      viewAllcategoryAction(languageId);
      ///   dispatch(manageAction(casherId ,groceryName));
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const onDeleteProduct = async id => {
    if (roleList.products_delete !== 0) {
      await dispatch(deleteSingleproductaction(id, navigation, groceryName));
      viewAllcategoryAction(languageId);
    } else {
      Toast.showWithGravity(
        `You don't have permission to delete.`,
        Toast.SHORT,
        Toast.TOP,
      );
    }
  };

  const onDeletecategory = async id => {
    await dispatch(deleteCategory(id, date, DeviceId, DeviceIp, groceryName));

    viewAllcategoryAction(languageId);
  };

  const onsubmitCatid = (id, name) => {
    setviewCatid(id);
    setcatName(name);

    dispatch(
      categorywiseProductaction(languageId, id, currencyCode, groceryName),
    );
  };

  const onshowEditmodel = (
    categories_name,
    image_path,
    parent_id,
    slug,
    categories_id,
    categories_status,
  ) => {
    setpropsCategoryname(categories_name);
    setpropsImagepath(image_path);
    setpropsParentid(parent_id);
    setpropsSlugname(slug);
    setpropsId(categories_id);
    setpropsStatus(categories_status);

    seteditModel(true);
  };

  const onCloseEditmodel = () => {
    seteditModel(false);
  };

  const openEditproductmodel = (prId, oldimgId, is_feature, slug) => {
    seteditProductmodel(true);

    setProductid(prId);
    setoldimgId(oldimgId), setFeature(is_feature);

    setSlug(slug);
  };
  const closeEditproductmodel = () => {
    seteditProductmodel(false);
  };

  const renderProduct = ({item}) => {
    return (
      <View>
        <View
          style={[
            global.commonWhitdebg,
            {
              paddingVertical: 0,
              backgroundColor: '#fff',
              paddingHorizontal: 15,
            },
          ]}>
          <View
            style={[
              global.commonFlexrow_ct,
              global.flexLine,
              {paddingVertical: 14},
            ]}>
            <View
              style={{
                width: 80,
                height: 57,
                borderRadius: 4,
                overflow: 'hidden',
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

            <View style={{paddingHorizontal: 11, flex: 0.8}}>
              <Text
                numberOfLines={2}
                style={[global.commonTextblueH1, {marginBottom: 7}]}>
                {item.products_name}
              </Text>
              <Text style={[global.commonText, {marginVertical: 8}]}>
                <Text style={global.commonTextblack}>
                  {' '}
                  RM {item.products_price}
                </Text>{' '}
                Cost -
              </Text>
              {/* <TouchableOpacity style={global.smButton}>
    <Text style={global.btnText1}>Show on selling screen</Text>
    </TouchableOpacity> */}
            </View>

            <View
              style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() =>
                  roleList.products_update !== 0
                    ? openEditproductmodel(
                        item.products_id,
                        item.old_image_id,
                        item.is_feature,
                        item.products_slug,
                      )
                    : `${Toast.showWithGravity(
                        `You don't have permission to edit `,
                        Toast.LONG,
                        Toast.TOP,
                      )}`
                }>
                <Image
                  source={require('../../Images/angleRight.png')}
                  style={{width: 21, height: 21}}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* <View
                style={[
                  global.flexRowsec,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 13,
                  },
                ]}>
                <Image
                  source={require('../../Images/HeartIcon.png')}
                  style={[
                    {width: 21, height: 21, marginRight: 11},
                    global.iconColor,
                  ]}
                  resizeMode="contain"
                />

                <Text style={[global.commonText, {}]}>TAX :V Type:SV</Text>
              </View> */}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem1 = (data, rowMap) => (
    <View style={global.rowBack}>
      <TouchableOpacity
        style={[global.actionButtonq2, {backgroundColor: 'red'}]}
        onPress={() => onDeleteProduct(data.item.products_id)}>
        <Image
          source={require('../../Images/trash.png')}
          style={[global.settingIcon, {tintColor: '#fff'}]}
        />
        <Text style={{color: 'white', marginTop: 5}}>Delete</Text>
      </TouchableOpacity>
      {/* 
      <TouchableOpacity
        
        style={[global.actionButton, global.appBgcolor]}>
        <Image
          source={require('../../Images/editwhiteicon.png')}
          style={[global.settingIcon, {tintColor: '#fff'}]}
        />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={[global.actionButtonq, {backgroundColor: '#000'}]}
        onPress={() =>
          navigation.navigate('AddProductimage', {
            prId: data.item.products_id,
          })
        }>
        <Image
          source={require('../../Images/editwhiteicon.png')}
          style={[global.settingIcon, {tintColor: '#fff'}]}
          
        />
        <Text style={{color: 'white', marginTop: 5}}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  function Loopcategory({comment}) {
    const nestedComments = (comment.childs || []).map(comment => {
      return (
        <View>
          <Loopcategory key={comment.id} comment={comment} />
        </View>
      );
    });

    return (
      <View>
        <Swipeable
          renderRightActions={() => {
            return (
              <View style={{width: 150, right: 0, flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() =>
                    global.Dimensionwidth > 468
                      ? onshowEditmodel(
                          comment.categories_name,
                          comment.image_path,
                          comment.parent_id,
                          comment.slug,
                          comment.categories_id,
                          comment.categories_status,
                        )
                      : navigation.navigate('Editcategory', {
                          categories_name: comment.categories_name,
                          catIconimage: comment.image_path,
                          parent_id: comment.parent_id,
                          slug: comment.slug,
                          edit_id: comment.categories_id,
                          categories_status: comment.categories_status,
                          categories_id: comment.categories_id,
                        })
                  }
                  style={[global.swipeAction, global.swipeEdit]}>
                  <Image
                    source={require('../../Images/editwhiteicon.png')}
                    style={[
                      global.settingIcon,
                      {tintColor: '#fff'},
                      {width: 18, height: 18},
                    ]}
                  />
                  <Text style={{color: 'white', marginTop: 5}}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onDeletecategory(comment.categories_id)}
                  style={[global.swipeAction, global.swipeDelete]}>
                  <Image
                    source={require('../../Images/trash.png')}
                    style={{tintColor: '#fff',width:18,height:18}}
                  />
                  <Text style={{color: 'white', marginTop: 5}}>Delete</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          containerStyle={{backgroundColor: '#fff'}}>
          <TouchableOpacity
            style={{backgroundColor: '#fff'}}
            onPress={() =>
              findDevicetype.isTab !== 'Tablet'
                ? navigation.navigate('Managecategory', {
                    categories_id: comment.categories_id,

                    categoriesName: comment.categories_name,

                    language_id: languageId,

                    currency_code: currencyCode,
                  })
                : onsubmitCatid(comment.categories_id, comment.categories_name)
            }>
            <View
              style={[
                global.commonFlexrow_ct,
                {
                  borderBottomColor: '#6a686842',
                  borderBottomWidth: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 6,
                  marginHorizontal: 11,
                },
              ]}>
              <View>
                <Text style={global.commonTextblue}>
                  {/* <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: 'red',
                      borderRadius: 50,
                    }}></View>{' '} */}
                  {comment.categories_name}
                </Text>

                {/* <View style={[global.flexRowsec, {marginTop: 13}]}>
                  {comment.categories_status === 1 ? (
                    <Image
                      source={require('../../Images/icons8-check.png')}
                      style={{
                        width: 25,
                        height: 25,
                        marginRight: 6,
                        tintColor: '#144693',
                      }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={require('../../Images/checkdisabled.png')}
                      style={{width: 25, height: 25, marginRight: 6}}
                      resizeMode="contain"
                    />
                  )}
                  <Text>
                    {comment.categories_status === 1 ? 'Enable' : 'Disable'}
                  </Text>
                </View> */}
              </View>

              <Image
                source={require('../../Images/angleRight.png')}
                style={global.settingIcon}
              />
            </View>
          </TouchableOpacity>
        </Swipeable>

        {nestedComments}
      </View>
    );
  }

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {findDevicetype.isTab !== 'Tablet' ? (
        <View style={[global.commonHeader, {padding: 15}]}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              source={require('../../Images/menu.png')}
              style={global.headBackarrow}
            />
          </TouchableOpacity>

          <Text style={[global.headTitle]}>Stock Movement</Text>

          <View style={global.flexRowsec}>
            <TouchableOpacity>
              <Image
                source={require('../../Images/barcode-scanner.png')}
                style={[
                  global.settingIcon,
                  {marginRight: 11, tintColor: '#144693'},
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={global.tabHeader}>
          <View style={global.tabHeadcol1}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={require('../../Images/menu.png')}
                style={global.settingIcon}
              />
            </TouchableOpacity>

            <Text style={global.headTitle}>Stock Movement</Text>
            <View style={global.flexRowsec}>
              <TouchableOpacity>
                <Image
                  source={require('../../Images/barcode-scanner.png')}
                  style={[
                    global.settingIcon,
                    {marginRight: 11, tintColor: '#144693'},
                  ]}
                />
              </TouchableOpacity>
            </View>

            <View style={global.statusBarline}></View>
          </View>

          <View style={global.tabHeadcol2}>
            <View style={global.commonFlexrow_bt}>
              <View></View>

              <Text style={[global.headTitle]}>{catName}</Text>

              <View style={global.flexRowsec}>
                <Text style={[global.headSvbtn, {marginHorizontal: 11}]}></Text>

                <Text style={global.headSvbtn}></Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <View style={{flex: 1}}>
        <View style={[{flex: 1, flexDirection: 'row'}]}>
          <View
            style={{
              width: global.Dimensionwidth > 468 ? '30%' : '100%',
              flex: 1,
              borderRightWidth: 1,
              borderRightColor: '#DADADA',
            }}>
            <View style={{padding: 15, backgroundColor: '#fff'}}>
              <View style={[global.headerSerach, {width: '100%', height: 45}]}>
                <Image
                  source={require('../../Images/search.png')}
                  style={[{tintColor: '#6E7172'}, {width: 20, height: 20}]}
                  resizeMode="contain"
                />
                <TextInput
                  style={[global.input, {paddingHorizontal: 4}]}
                  onChangeText={onChangeText}
                  value={text}
                  placeholder="Search"
                  placeholderTextColor={'#6E7172'}
                />
              </View>
            </View>

            {/* <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 14,
                backgroundColor: '#eee',
                borderBottomWidth: 1,
                borderBottomColor: '#DADADA',
              }}>
              <Text style={global.commonTextblack}>All Categories</Text>
            </View> */}

            <ScrollView showsVerticalScrollIndicator={false}>
              {viewCat.map(e => {
                return (
                  <View>
                    <Loopcategory key={e.id} comment={e} />
                  </View>
                );
              })}
            </ScrollView>

            {/* <View style={global.flexBottomwrapper}>
              <TouchableOpacity
                onPress={() =>
                  findDevicetype.isTab === 'Tablet'
                    ? setModalVisible(true)
                    : navigation.navigate('Addcategory')
                }>
                <View style={global.commonButton}>
                  <Image
                    source={require('../../Images/plus.png')}
                    style={{width: 12, height: 12, marginRight: 6}}
                  />
                  <Text style={global.btnText1}>Add Category</Text>
                </View>
              </TouchableOpacity>
            </View> */}
          </View>

          {global.Dimensionwidth > 468 ? (
            <View style={{width: '70%'}}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={[global.commonModalbg, {alignItems: 'center'}]}>
                  <View style={global.mediumModalcreeen}>
                    <Addcategory
                      oncloseModel={onclose}
                      navigation={navigation}
                    />
                  </View>
                </View>
              </Modal>

              {/* <FlatList
                data={productArraylist}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                ListEmptyComponent={renderEmptyContainer()}
                showsVerticalScrollIndicator={false}
              /> */}

              {productArraylist.length === 0 ? null : (
                <View style={{flex: 1}}>
                  <View
                    style={[
                      global.commonlineWrapper,
                      {borderTopWidth: 0, paddingVertical: 10},
                    ]}>
                    <View style={[global.flexRowsec, {padding: 5}]}>
                      <Text style={global.commonTextH1}>Sort</Text>

                      <TouchableOpacity
                        style={{
                          width: 164,
                          height: 35,
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginHorizontal: 11,
                          borderColor: '#0652A2',
                        }}>
                        <Text style={global.commonTextblue}>Custom</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          width: 164,
                          height: 35,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#eee',
                        }}>
                        <Text style={global.commonTextblack}>Name</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          width: 164,
                          height: 35,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginHorizontal: 11,
                          backgroundColor: '#eee',
                        }}>
                        <Text style={global.commonTextblack}>Inventory</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <SwipeListView
                    ListEmptyComponent={FlatlistEmpty()}
                    showsVerticalScrollIndicator={false}
                    // useNativeDriver={false}
                    keyExtractor={(item, index) => item.id}
                    data={productArraylist}
                    renderItem={renderProduct}
                    renderHiddenItem={renderHiddenItem1}
                    // leftOpenValue={73}
                    rightOpenValue={-345}
                    previewRowKey={productArraylist[0].id}
                    previewOpenValue={-400}
                    previewOpenDelay={1000}
                    // onRowDidOpen={onItemOpen}
                  />
                </View>
              )}

              <Modal
                animationType="slide"
                transparent={true}
                visible={editModel}>
                <View style={[global.commonModalbg, {alignItems: 'center'}]}>
                  <View style={global.mediumModalcreeen}>
                    <Editcategory
                      oncloseModel={onclose}
                      navigation={navigation}
                      route={route}
                      propsCategoryname={propsCategoryname}
                      propsImagepath={propsImagepath}
                      propsParentid={propsParentid}
                      propsSlugname={propsSlugname}
                      propsId={propsId}
                      propsStatus={propsStatus}
                      onCloseEditmodel={onCloseEditmodel}
                    />
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                visible={editProductmodel}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  seteditProductmodel(!editProductmodel);
                }}>
                <View style={[global.commonModalbg, {alignItems: 'center'}]}>
                  <View style={global.modalBoxscreeen}>
                    <Editproduct
                      navigation={navigation}
                      route={route}
                      getProductid={getProductid}
                      getoldimgId={getoldimgId}
                      getFeature={getFeature}
                      closeEditproductmodel={closeEditproductmodel}
                      getSlug={getSlug}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          ) : null}
        </View>
      </View>

      {isLoader ? <Customloader /> : null}

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
