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
} from 'react-native';
import {global} from '../../styles/global';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import  AuthId  from '../AuthId.style'

const windowWidth = Dimensions.get('window').width;

export default function Paymentreport({navigation}) {
  const [data, setData] = useState([
    {id: 1, amount: 1220.0, title: 'Cash'},
    {id: 2, amount: 30.0, title: 'Credit card'},
    {id: 3, amount: 30.0, title: 'Coupon'},
    {id: 4, amount: 30.0, title: 'Kungsri Quick Pay'},
    {id: 5, amount: 30.0, title: 'Promptpay'},
    {id: 6, amount: 33.0, title: 'Alipay'},
    {id: 7, amount: 30.0, title: 'Delivery'},
    {id: 8, amount: 33.0, title: 'Online order'},
    {id: 9, amount: 30.0, title: 'Line Pay'},
    {id: 10, amount: 30.0, title: 'Custom'},
  ]);

  const [tablehead, setHead] = useState([
    'Date',
    'Total Payment',
    'Cash',
    'Credit card',
    'Coupon',
    'Kungsri Quick Pay',
    'Promptpay',
    'Alipay',
  ]);

  const [reports, setReports] = useState([
    {
      id: 1,
      Date: '23 july ',
      TotalPayment: 'PSD00001',
      Cash: 'PSD00001',
      Creditcard: '122',
      Coupon: '0.00',
      Kungsri: '0.00',
      Promptpay: '0.00',
      Alipay: '0.00',
    },

    {
      id: 2,
      Date: '23 july ',
      TotalPayment: 'PSD00001',
      Cash: 'PSD00001',
      Creditcard: '122',
      Coupon: '0.00',
      Kungsri: '0.00',
      Promptpay: '0.00',
      Alipay: '0.00',
    },
  ]);

  const [tableData, setTableData] = useState([]);

  const arrangeData = () => {
    let rows = [];
    reports.forEach(e => {
      let row = [
        e.Date,
        e.TotalPayment,
        e.Cash,
        e.Creditcard,
        e.Coupon,
        e.Kungsri,
        e.Promptpay,
        e.Alipay,
      ];
      rows.push(row);
    });
    setTableData(rows);
  };

  useEffect(() => {
    arrangeData();
  }, []);

  const [widthArr, setwidthArr] = useState([
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
  ]);

  return (
    <SafeAreaView style={global.commonBg}>
      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={global.headBackarrow}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Payment Report</Text>

        <View></View>
      </View>

      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <View
          style={[
            global.commonWhitebg,
            {
              paddingVertical: 3,
              borderBottomWidth: 1,
              borderBottomColor: '#EFEFEF',
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                global.reportDt,
                {
                  borderRightWidth: 1,
                  borderWidth: 0,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                },
              ]}>
              <Text style={[global.commonTextblack]}>Total Payment</Text>
              <Text style={[global.bigOtext_2, global.COLOR_BLUE]}>0.00</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data.map((e, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      global.reportDt,
                      {
                        borderWidth: 0,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      },
                    ]}>
                    <Text style={global.commonTextblack}>{e.title}</Text>
                    <Text style={[global.bigOtext_2, global.COLOR_BLUE]}>
                      {e.amount}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          {/* <ScrollView style={{overflow:"scroll" ,flexDirection:"row"}} showsHorizontalScrollIndicator={false}>
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
<View style={{flexDirection:"row"}} key={index}>
<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.Date}</Text>
</View>


<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.TotalPayment}</Text>
</View>
<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.Cash}</Text>
</View>

<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.Creditcard}</Text>
</View>


<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.Coupon}</Text>
</View>



<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1]}>{e.Kungsri}</Text>
</View>

<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.Promptpay}</Text>
</View>

<View style={[global.reportTablebody]}  key={e.id}>
<Text style={[global.commonTextblueH1,]}>{e.Alipay}</Text>
</View>

  </View>






)




})}


</View>





</ScrollView>




 */}

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={[global.topSpacing]}>
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
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
