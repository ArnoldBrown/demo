import React, {useState, useEffect, useRef} from 'react';
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
  Switch,
  Modal,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';

import {API_Links} from '../Api/Api';

import uuid from 'react-native-uuid';

import {deleteOptionaction} from '../../action/optionActions';

import {useDispatch, useSelector} from 'react-redux';

import Customloader from '../Customloader';

import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

import  AuthId  from '../AuthId.style'





export default function AddOption({navigation, onClosestep6, route}) {
  const dispatch = useDispatch();

  const state = useSelector(state => state.deleteOptionreducer);

  const {loader} = state;


  const shopName = useSelector(state => state.shopnameReducer);
  
  const {groceryName} = shopName;



  const [loading, setLoading] = useState(false);


  const [tableData, setTableData] = useState([]);

  const [defaultData, setDefaultdata] = useState([]);



  const idofZero = [0];
  const idofOne = [1];

  let filterOptionZero = tableData.filter(i => idofZero.includes(i.is_default));

  let filterOptionOne = tableData.filter(i => idofOne.includes(i.is_default));
  

console.log('products_id', route.params.prId)



  const arrangeData = () => {
    let rows = [];
    tableData.forEach(e => {
      let row = [e.options_name, e.options_values_name];
      rows.push(row);
    });
    setDefaultdata(rows);
  };

  useEffect(() => {
    arrangeData();
  }, []);

  const listAttributes = async () => {
    setLoading(true);

    var data = new FormData();

    data.append('products_id', route.params.prId);

    fetch(groceryName=== "" ? API_Links.BASE_URL + API_Links.VIEW_POST_ATTR : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.VIEW_POST_ATTR, {
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
        setLoading(false);

        if (data.success === '1') {
          setTableData(data.data);
        } else {
          setTableData([]);
        }
      })

      .catch(e => console.log(e));
  };

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {

      listAttributes();

    });
    return () => {
      unsubscribe;
    };
  }, []);

  function resolveListaction() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(listAttributes());
      }, 250);
    });
  }

  const ondeleteOPtion = async (products_id, products_attributes_id, route) => {

    dispatch(deleteOptionaction(products_id, products_attributes_id, route ,groceryName));

    await resolveListaction();
  };


  return (
    <SafeAreaView style={[global.commonBg, {borderRadius: 13}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}> Add Option</Text>

        <Text style={global.appColor}></Text>
      </View>

      <ScrollView
        contentContainerStyle={{padding: 11, flex: 1, overflow: 'scroll'}}>
        <View>
          <View style={[global.commonFlexrow_ct, global.commonWhitebg, {}]}>
            <Text style={global.commonTextblue}>Listing Default Options</Text>

            <TouchableOpacity
              style={global.flexRowsec}
              onPress={() =>
                navigation.navigate('AddoptionField', {
                  paramKey: 'Add Option',
                })
              }>
              <Image
                source={require('../../Images/Circleplusicon.png')}
                style={[global.settingIcon, {marginRight: 3}]}
              />

              <Text style={global.commonTextblue}>Add Options</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginBottom: 15,
              width: '100%',
              overflow: 'scroll',
            }}>
            <View
              style={[global.tableHead, {width: '100%', flexDirection: 'row'}]}>
              <View style={global.tableThreecol}>
                <Text>Option Name</Text>
              </View>

              <View style={global.tableThreecol}>
                <Text>Option Value</Text>
              </View>

              <View style={global.tableThreecol}>
                <Text>Action</Text>
              </View>
            </View>

            <View>
              {filterOptionOne.length === 0 ? (
                <View style={{backgroundColor: '#fff', padding: 11}}>
                  <Text style={{textAlign: 'center'}}>No Data Found</Text>
                </View>
              ) : (
                filterOptionOne.map(e => {
                  return (
                    <View style={[global.tableBody, {backgroundColor: '#fff'}]}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View style={global.tableThreecol}>
                          <Text> {e.options_name}</Text>
                        </View>
                        <View style={global.tableThreecol}>
                          <Text>{e.options_values_name}</Text>
                        </View>

                        <View
                          style={[
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            },
                            global.tableThreecol,
                          ]}>
                          {/* <TouchableOpacity onPress={()=>oneditOption(e.products_id ,e.options_id ,e.options_values_id)}  style={{marginRight:6}}> */}

                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('Editoption', {
                                prodctId: e.products_id,
                                optionId: e.options_id,
                                optionValueid: e.options_values_id,
                                optionName: e.options_name,
                                optionValuename: e.options_values_name,
                                attrId: e.products_attributes_id,
                                paramKey: 'Edit Option',
                                price: e.options_values_price,
                              })
                            }>
                            <Image
                              source={require('../../Images/editwhiteicon.png')}
                              style={{width: 17, height: 17, tintColor: '#000'}}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() =>
                              ondeleteOPtion(
                                e.products_id,
                                e.products_attributes_id,
                                'deleteOption',
                              )
                            }>
                            <Image
                              source={require('../../Images/trash.png')}
                              style={{width: 17, height: 17}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })
              )}
            </View>
          </ScrollView>

          <View style={[global.commonFlexrow_ct, global.commonWhitebg, {}]}>
            <Text style={global.commonTextblue}>
              Listing Additional Options
            </Text>

            <TouchableOpacity
              style={global.flexRowsec}
              onPress={() =>
                navigation.navigate('AddoptionField', {
                  paramKey: 'Add Additional Option',

                  paramKeyid: route.params.prId,
                })
              }>
              <Image
                source={require('../../Images/Circleplusicon.png')}
                style={[global.settingIcon, {marginRight: 3}]}
              />
              <Text style={global.commonTextblue}>Add Options</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[global.tableHead, {width: '100%', flexDirection: 'row'}]}>
            <View style={global.tableFourcol}>
              <Text>Option Name</Text>
            </View>

            <View style={global.tableFourcol}>
              <Text>Option Value</Text>
            </View>
            <View style={global.tableFourcol}>
              <Text>Price</Text>
            </View>

            <View style={global.tableFourcol}>
              <Text>Action</Text>
            </View>
          </View>
          {filterOptionZero.length === 0 ? (
            <View style={{backgroundColor: '#fff', padding: 11}}>
              <Text style={{textAlign: 'center'}}>No Data Found</Text>
            </View>
          ) : (
            filterOptionZero.map(e => {
              return (
                <View style={[global.tableBody, {backgroundColor: '#fff'}]}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={global.tableFourcol}>
                      <Text>{e.options_name}</Text>
                    </View>

                    <View style={global.tableFourcol}>
                      <Text>{e.options_values_name}</Text>
                    </View>

                    <View style={global.tableFourcol}>
                      <Text>{e.price_prefix + e.options_values_price} RM </Text>
                    </View>

                    <View
                      style={[
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        },
                        global.tableFourcol,
                      ]}>
                      {/* <TouchableOpacity onPress={()=>oneditOption(e.products_id ,e.options_id ,e.options_values_id)}  style={{marginRight:6}}> */}

                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Editoption', {
                            prodctId: e.products_id,
                            optionId: e.options_id,
                            optionValueid: e.options_values_id,
                            optionName: e.options_name,
                            optionValuename: e.options_values_name,
                            attrId: e.products_attributes_id,
                            paramKey: 'Edit Additional Option',
                            price: e.options_values_price,
                            prefix: e.price_prefix,
                          })
                        }>
                        <Image
                          source={require('../../Images/editwhiteicon.png')}
                          style={{width: 17, height: 17, tintColor: '#000'}}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          ondeleteOPtion(
                            e.products_id,
                            e.products_attributes_id,
                            'deleteAdditionaloption',
                          )
                        }>
                        <Image
                          source={require('../../Images/trash.png')}
                          style={{width: 17, height: 17}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {loader || loading ? <Customloader /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#808B97'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});
