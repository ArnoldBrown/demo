import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';

export default function StockIn({navigation}) {
  const findDevicetype = DeviceType();

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#eceff1" barStyle="dark-content"></StatusBar>
      {findDevicetype.isTab === 'Tablet' ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#DADADA',
              padding: 15,
            }}>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{flex: 1}}>
              <Image
                source={require('../../Images/menu.png')}
                style={global.hamBurgermenu}
              />
            </TouchableOpacity>

            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={global.headTitle}> Stock-In Documents</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Image
                source={require('../../Images/Plusicon.png')}
                style={{width: 13, height: 14, marginRight: 5, marginTop: 1}}
                resizeMode="contain"
              />
              <Text style={[global.headTitle, {fontSize: 18}]}>
                Create Document
              </Text>
            </View>
          </View>

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
                <Text style={styles.datecolor}>23 Mar 2022 - 30 Mar 2022</Text>
              </View>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../Images/right-chevron.png')}
              />
            </View>

            <View style={styles.stockEnd}>
              <Text style={{fontSize: 14}}>Total</Text>
              <Text style={{fontSize: 30, paddingLeft: 10}}>209.00</Text>
            </View>
          </View>

          <View style={styles.stockDateSection}>
            <Text style={styles.stockDate}>Date</Text>
            <Text style={styles.stockDate}>Document No.</Text>
            <Text style={styles.stockDate}>Purchasing order Ref.</Text>
            <Text style={styles.stockDate}>Total</Text>
            <Text style={styles.stockDate}>Created by</Text>
          </View>
          <View style={{backgroundColor: '#e8eaf6'}}></View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.inventoryMobileHaeder}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={require('../../Images/menu.png')}
                style={styles.menuImage}
              />
            </TouchableOpacity>

            <Text style={styles.headerName}>Stock-In Documnet</Text>

            <Image
              source={require('../../Images/plus.png')}
              style={styles.plusImage}
            />
          </View>

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

          <View style={styles.documentSection}>
            <Text style={styles.documnetText}>Document No.</Text>
            <Text
              style={styles.documentTotal}>
              Total
            </Text>
          </View>
          <View style={styles.totalSection}>
            <View style={styles.totalInside}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.no}>0.00</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stockDateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
  },
  stockDate: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
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
  stockEnd: {
    flexDirection: 'row',
    alignItems: 'center',
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
  inventoryMobileHaeder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eceff1',
    paddingHorizontal: 12,
  },
  menuImage: {
    width: 20,
    height: 20,
    tintColor: '#144693',
  },
  headerName: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: 'black',
  },
  plusImage: {
    width: 15,
    height: 15,
    marginRight: 3,
  },
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
  documentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fafafa',
    paddingHorizontal: 10,
    elevation: 1,
  },
  documnetText: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  documentTotal:{
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  totalSection: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fafafa',
    elevation:0.5
  },
  totalInside: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 0.1,
    backgroundColor:'white'
  },
  total: {
    color: 'black',
  },
  no: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 7,
  },
});
