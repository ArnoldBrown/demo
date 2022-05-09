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
  StyleSheet,
} from 'react-native';
import {global} from '../../styles/global';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';
const windowWidth = Dimensions.get('window').width;
import uuid from 'react-native-uuid';
import {API_Links} from '../Api/Api';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSelector} from 'react-redux';
import AuthId from '../AuthId.style';
import DeviceType from '../Orientation/DeviceType';

export default function Salestaxreport({navigation}) {
  const findDevicetype = DeviceType();

  const [tablehead, setHead] = useState([
    'Date purchased',
    'Orders Id',
    'Total Price',
  ]);

  const [widthArr, setwidthArr] = useState([
    windowWidth > 468 ? windowWidth / 2.2 : windowWidth / 1.8,
    windowWidth > 468 ? windowWidth / 2.2 : windowWidth / 2.8,
    windowWidth > 468 ? windowWidth / 2.2 : windowWidth / 2.4,

    // windowWidth > 468  ?  windowWidth/4.2 :  windowWidth /2.2 ,
    // windowWidth > 468  ?  windowWidth/4.2 :  windowWidth /2.2 ,
    // windowWidth > 468  ?  windowWidth/4.2 :  windowWidth /2.2 ,
  ]);

  // const [reports, setReports] = useState([]);
  // console.log("reports",reports)

  const [tableData, setTableData] = useState([]);
  const [ctDate, setDate] = useState('');
  const [isDatePickerVisible, setPickervisible] = useState(false);

  let currentDate = moment(new Date()).format('YYYY/MM/DD');

  const shopName = useSelector(state => state.shopnameReducer);
  const {groceryName} = shopName;

  const getSalesreport = cdate => {
    var data = new FormData();

    data.append('date', cdate === undefined ? currentDate : cdate);

    fetch(
      groceryName === ''
        ? API_Links.BASE_URL + API_Links.SALES_REPORT
        : API_Links.SHOP_URL +
            groceryName +
            '/' +
            'api' +
            '/' +
            API_Links.SALES_REPORT,
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
        if (data.success === '1') {
          //setReports(data.data)

          let rows = [];
          data.data.forEach(e => {
            let row = [e.date_purchased, e.orders_id, e.order_price];
            rows.push(row);
          });

          setTableData(rows);
        } else {
          setTableData([]);
        }
      })
      .catch(e => console.log(e));
  };

  //   const arrangeData = () => {
  //     let rows = [];
  //      reports.forEach(e => {
  //       let row = [
  //         e.date_purchased,
  //         e.orders_id,
  //         e.total_orders,
  //         e.total_price,

  //       ];
  //       rows.push(row);
  //     });
  //     setTableData(rows);
  // console.log("e82782e")

  //   };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getSalesreport();
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const handleDate = pickeddate => {
    setPickervisible(false);

    let dob = pickeddate;
    let getDOB = moment(dob).format('YYYY-MM-DD');

    setDate(getDOB);

    getSalesreport(getDOB);
  };

  return (
    <SafeAreaView style={global.commonBg}>
      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={global.headBackarrow}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Sales Report</Text>

        <Image
          source={require('../../Images/upload.png')}
          style={global.headBackarrow}
        />
      </View>

      

    

      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>

        {findDevicetype.isTab === 'Tablet' ? (

        <View style={styles.stockinTotal}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#e8eaf6',
          }}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../../Images/left-chevron.png')}
          />

          <View style={styles.borderdate}>
            <Text style={styles.datecolor}>26 Mar 2022 - 30 Mar 2022</Text>
          </View>
          <Image
            style={{width: 25, height: 25}}
            source={require('../../Images/right-chevron.png')}
          />
        </View>

        <View style={[styles.stockEnd,{flexDirection:'row',alignItems:'baseline'}]}>
          <Text style={{fontSize: 18,paddingBottom:2}}>Total</Text>
          <Text style={{fontSize: 30, paddingLeft: 10}}>0.00</Text>
        </View>
        </View>
        ):(
        <View style={styles.ivHeaderTwo}>
          <TouchableOpacity>
            <Image
              style={styles.arrowImage}
              source={require('../../Images/left-chevron.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPickervisible(true)}
            style={styles.inventoryDate}>
            {/* <Text style={styles.inventoryText}>Today</Text> */}
            <Text style={styles.inventoryText}>
              Select Date : {ctDate === '' ? currentDate : ctDate}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              style={styles.arrowImage}
              source={require('../../Images/right-chevron.png')}
            />
          </TouchableOpacity>
        </View>
        )}
        {/* 
        <View style={[global.tableHead, global.flexRowsec]}>
          <Text style={global.commonTextblueH1}>Select Date : </Text>

          <TouchableOpacity onPress={() => setPickervisible(true)}>
            <Text>{ctDate === '' ? currentDate : ctDate}</Text>
          </TouchableOpacity>
        </View> */}
        <View
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 13,
            },
          ]}>
          <Text style={[global.commonTextblackH1, global.commonBold]}>
            Sales Report
          </Text>

          {/* <Text style={global.commonTextblue}>Between date</Text>

          <Text style={global.commonTextblueH1}>
            1 july 2021 To 31 july 2021
          </Text> */}
        </View>

        {/* <View  style={{overflow:"scroll" ,flexDirection:"row"}}>



<ScrollView  showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={true}  >
<View style={{flexDirection:"row" ,marginTop:11}}>
{tablehead.map(((e,index)=>{

return (
<View style={[global.reportTablehead,{backgroundColor:"#F1F6FA"}]}  key={e.index}>
<Text style={[global.commonTextblueH1,global.commonBold]}>{e.Title}</Text>
</View>

)



}))}



</View>


<View style={{flexDirection:"column" }}>
{reports.map((e,index)=>{

return (
<View style={{flexDirection:"row"}}>
<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.Date}</Text>
</View>


<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.firstbill}</Text>
</View>
<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.lasttbill}</Text>
</View>

<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.withouttax}</Text>
</View>


<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.ValuebeforeVat}</Text>
</View>



<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1]}>{e.Tax}</Text>
</View>

<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.Total}</Text>
</View>

  </View>






)




})}


</View>





</ScrollView>














</View> */}

        {tableData.length === 0 ? (
          <View style={{backgroundColor: '#eee', padding: 10}}>
            <Text style={{textAlign: 'center'}}>No Sales Found Today.. !!</Text>
          </View>
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View>
              <Table>
                <Row
                  data={tablehead}
                  widthArr={widthArr}
                  style={global.tableHead}
                  textStyle={[global.commonText, global.commonBold]}
                />
              </Table>

              <ScrollView style={global.dataWrapper}>
                <Table>
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
                </Table>
              </ScrollView>

              {/* {tableData.length >  0  ?  null :
                          
                          <View style={{backgroundColor:"#eee",padding:10 }}>
                          
                          <Text style={{textAlign:"center"}} >No Data Found</Text>

                      
                              
                              
                              
                              </View>   }  */}
            </View>
          </ScrollView>
        )}
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDate}
        onCancel={() => setPickervisible(false)}
        headerTextIOS="Pick a Date"
      />
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
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
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

  stockinTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
    backgroundColor: '#e8eaf6',
  },

  borderdate: {
    borderColor: '#DADADA',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  datecolor: {
    color: '#2827CC',
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 35,
  },
});
