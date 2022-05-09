import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Alert,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector, useDispatch} from 'react-redux';
import FlatlistEmpty from '../FlatlistEmpty';

import {
  cartholdlistAction,
  cartholdretrievAction,
  CartviewAction,
  cartholdDetailaction,
  carthold_deleteAction,
} from '../../action/holdAction';

import Retriewproductlist from './Retriewproductlist';
import Customloader from '../Customloader';

export default function RetriewList({navigation, onCloseretrievmodel, route}) {
  const dispatch = useDispatch();

  const getToken = useSelector(state => state.loginReducer);
  const {casherId} = getToken;

  const _holdReducer = useSelector(state => state.holdReducer);

  const {cartHolderdata, getfirstIndex, cartholderDetail, onload  ,retrievSuccess } =
    _holdReducer;

    const shopName = useSelector(state => state.shopnameReducer);
  
    const {groceryName} = shopName;

   
    

  const findDevicetype = DeviceType();

  const [selected, isSelected] = useState(getfirstIndex);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(cartholdlistAction(casherId ,groceryName));
    });

    return () => {
      unsubscribe;
    };
  }, []);

  
  // async function resolveAfter1econds() {
  //   return new Promise(resolve => {
  //    setTimeout(() => {
  //     resolve(dispatch(cartholdlistAction(casherId)));
  //    }, 200);
  //       //resolve(dispatch(cartholdlistAction(casherId)));
       
    
  //   });
  // }

  const deleteItem = async id => {


    let promise = new Promise((resolve ,reject)=>{
 


      
        resolve( dispatch(carthold_deleteAction(casherId, id ,groceryName)))
    
      
    
      

    
    
    })
if(retrievSuccess!==''){
 

  promise.then(()=>{

    dispatch(cartholdlistAction(casherId ,groceryName))

  }).catch((e)=>console.log(e))


}

  


//await resolveAfter1econds()



  };

  const ongetDetails = id => {
    dispatch(cartholdDetailaction(casherId, id ,groceryName));

    isSelected(id);
  };

  const renderItem = data => (
    <TouchableHighlight
      onPress={() =>
        findDevicetype.isTab === 'Tablet'
          ? ongetDetails(data.item.id)
          : navigation.navigate('Retriewproductlist', {
              cashier_id: casherId,
              hold_id: data.item.id,
            })
      }
      underlayColor={'#fff'}
      style={
        selected === data.item.id
          ? {backgroundColor: '#eee'}
          : {backgroundColor: '#fff'}
      }>
      <View
        style={[global.flexRowsec, global.flexLine, {paddingHorizontal: 11}]}>
        <View style={{flex: 0.6}}>
          <Text style={[global.commonTextblueH1, {marginBottom: 2}]}>
            {data.item.note}
          </Text>
          <Text
            style={[global.commonText, {marginVertical: 11}]}
            numberOfLines={1}>
            {data.item.created_at}
          </Text>
          <Text style={global.commonText} numberOfLines={1}>
            Created By : {data.item.first_name}
          </Text>
        </View>

        <View
          style={{
            flex: 0.4,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <Text style={[global.bigOtext_2, {textAlign: 'right'}]}>
            {' '}
            RM {data.item.total_amount}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => deleteItem(data.item.id, data.item.session_id)}>
        <Image
          source={require('../../Images/trash.png')}
          style={[global.settingIcon, {tintColor: '#fff'}]}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[global.commonBg, {borderRadius: 10, overflow: 'hidden'}]}>
      <View style={global.commonMobileHeader}>
        <TouchableOpacity
          onPress={() =>
            findDevicetype.isTab === 'Tablet'
              ? onCloseretrievmodel()
              : navigation.goBack()
          }>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={global.settingIcon}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Save & Retrieve</Text>

        <Text></Text>
      </View>

      <View style={[global.commonFlexrow_ct, {flex: 1}]}>
        <SwipeListView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: '#fff',
            borderRightWidth: 1,
            borderRightColor: '#DADADA',
          }}
          showsVerticalScrollIndicator={false}
          // useNativeDriver={false}
          keyExtractor={(item, index) => item.id}
          data={cartHolderdata}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-73}
          previewRowKey={getfirstIndex}
          previewOpenValue={-73}
          previewOpenDelay={1000}
          ListEmptyComponent={FlatlistEmpty}
        />

        {global.Dimensionwidth < 468 ? null : (
          <View style={{flex: 0.9}}>
            <Retriewproductlist
              route={route}
              navigation={navigation}
              cashierIds={casherId}
              selected={selected}
              // cartHolderdata={cartHolderdata}
              // cartholderDetail={cartholderDetail}
              //  onRetrievs={onRetriev}
            />
          </View>
        )}
      </View>

      {onload ? <Customloader /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  list: {
    color: '#FFF',
  },
  btnText: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: 'lightcoral',

    borderBottomWidth: 0.5,

    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  closeBtn: {
    backgroundColor: 'blue',
    right: 75,
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 0,
  },
});
