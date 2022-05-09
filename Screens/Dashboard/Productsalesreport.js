import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import {global} from '../../styles/global';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';
import uuid from 'react-native-uuid';
import {API_Links} from '../Api/Api';
import Customloader from '../Customloader';
import {useSelector, useDispatch} from 'react-redux';
import AuthId from '../AuthId.style';

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();

const windowWidth = Dimensions.get('window').width;

export default function Productsalesreport({navigation}) {
  //-----   Redux-Hook ----- //

  const getLanguageids = useSelector(state => state.languageReducer);
  const {languageId} = getLanguageids;

  const getCurrencycodes = useSelector(state => state.currencyReducer);
  const {currencyCode} = getCurrencycodes;

  const shopName = useSelector(state => state.shopnameReducer);

  const {groceryName} = shopName;

  //-----   Redux-Hook ----- //

  const [widthArr, setwidthArr] = useState([
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
  ]);

  const [tablehead, setHead] = useState([
    'Date',
    'OrderId',
    'Product Name',
    'Product Price',
    'Product Quantity',
  ]);

  const [products, setProucts] = useState([]);
  const [productsId, setProuctsid] = useState('');
  const [tableData, setTabledata] = useState([]);
  const [loader, setLoader] = useState(false);

  const onsalesReport = id => {
    setLoader(true);
    var data = new FormData();

    data.append('product_id', id);

    fetch(
      groceryName === ''
        ? API_Links.BASE_URL + API_Links.PR_WISE_SALES_REPORT
        : API_Links.SHOP_URL +
            groceryName +
            '/' +
            'api' +
            '/' +
            API_Links.PR_WISE_SALES_REPORT,
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
      .then(res => res.json())

      .then(data => {
        setLoader(false);

        if (data.success === '1') {
          let rows = [];
          data.data.forEach(e => {
            let row = [
              e.date_purchased,
              e.orders_id,
              e.products_name,
              e.order_price,

              e.products_quantity,
            ];
            rows.push(row);
          });

          setTabledata(rows);
        } else {
          Alert.alert(data.message, '', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          setTabledata([]);
        }
      })
      .catch(e => console.log(e));
  };

  const getallProducts = () => {
    setLoader(true);

    var data = new FormData();

    data.append('language_id', languageId);

    fetch(
      groceryName === ''
        ? API_Links.BASE_URL + API_Links.GET_REPORT
        : API_Links.SHOP_URL +
            groceryName +
            '/' +
            'api' +
            '/' +
            API_Links.GET_REPORT,
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
      .then(res => res.json())

      .then(data => {
        setLoader(false);

        if (data.success === '1') {
          setProucts(data.data);
          setProuctsid(data.data[0].products_id);
          onsalesReport(data.data[0].products_id);
        } else {
          setProucts([]);
        }
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getallProducts();
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => [
        setProuctsid(item.products_id),
        onsalesReport(item.products_id),
      ]}>
      <View
        style={[
          productsId === item.products_id
            ? global.reportActive
            : global.reportDt,
        ]}>
        <Text
          style={[global.commonTextblue, global.commonm, {textAlign: 'center'}]}
          numberOfLines={2}>
          {item.products_name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={global.commonBg}>
      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={global.headBackarrow}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Product Wise Sales Report</Text>

        <View></View>
      </View>

      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <View style={[global.commonWhitebg, {paddingHorizontal: 0}]}>
          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}>
            {data.map(e => {
              return (
                <View key={e.id} style={global.reportDt}>
                  <Text style={[global.commonTextblue, global.commonBold]}>
                    {e.amount}
                  </Text>

                  <Text style={[global.commonTextblack, {marginTop: 11}]}>
                    {e.title}
                  </Text>
                </View>
              );
            })}
          </ScrollView> */}

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />

          {/* <View style={{flexDirection: 'column'}}>
            <ScrollView
              style={{overflow: 'scroll', flexDirection: 'row'}}
              showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row', marginTop: 11}}>
                {tablehead.map((e, index) => {
                  return (
                    <View style={[global.reportTablehead]} key={e.index}>
                      <Text
                        style={[global.commonTextblueH1, global.commonBold]}>
                        {e.Title}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <View style={{flexDirection: 'column'}}>
                {reports.map((e, index) => {
                  return (
                    <View style={{flexDirection: 'row'}}>
                      <View style={[global.reportTablebody]} key={e.id}>
                        <Text
                          style={[global.commonTextblueH1, global.commonBold]}>
                          {e.Date}
                        </Text>
                      </View>

                      <View style={[global.reportTablebody]} key={e.id}>
                        <Text
                          style={[global.commonTextblueH1, global.commonBold]}>
                          {e.Rece}
                        </Text>
                      </View>
                      <View style={[global.reportTablebody]} key={e.id}>
                        <Text
                          style={[global.commonTextblueH1, global.commonBold]}>
                          {e.Totalamount}
                        </Text>
                      </View>

                      <View style={[global.reportTablebody]} key={e.id}>
                        <Text
                          style={[global.commonTextblueH1, global.commonBold]}>
                          {e.Discount}
                        </Text>
                      </View>

                      <View style={[global.reportTablebody]} key={e.id}>
                        <Text
                          style={[global.commonTextblueH1, global.commonBold]}>
                          {e.VAT}
                        </Text>
                      </View>

                      <View style={[global.reportTablebody]} key={e.id}>
                        <Text
                          style={[global.commonTextblueH1, global.commonBold]}>
                          {e.NetValue}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View> */}

          {tableData.length === 0 ? (
            <View style={[global.tableHead, {marginTop: 11}]}>
              <Text style={{textAlign: 'center'}}>No Sales Found....</Text>
            </View>
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              <View style={[global.topSpacing]}>
                <Table>
                  <Row
                    data={tablehead}
                    widthArr={widthArr}
                    style={global.tableHead}
                    textStyle={[global.commonText, global.commonBold]}
                    // textStyle={[global.commonText, global.commonBold]}
                  />
                </Table>
                <Table>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}>
                    {tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        //  style={[global.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                        textStyle={[global.commonText, global.commonBold]}
                        style={global.tableBody}
                      />
                    ))}
                  </ScrollView>
                </Table>
              </View>
            </ScrollView>
          )}
        </View>
      </View>

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
