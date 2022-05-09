import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Button,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import {useSelector} from 'react-redux';

export default function save({
  onCloseRemark,
  onmobileCloseRemark,
  onsaveRemark,
  onChangenote,
  note,
}) {
  const [modalVisible, setModalVisible] = useState(true);
  const [number, onChangeNumber] = useState('');
  const findDevicetype = DeviceType();
  const ass = useSelector(state => state.cartReducer);
  const {onload} = ass;
  const _holdReducer = useSelector(state => state.holdReducer);
  const {cartHolderdata, cartHoldloader} = _holdReducer;

  return (
    <View>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback>
          <View
            style={[
              global.commonModalbg,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <View
              style={[
                // global.commonWhitebg,
                global.ModalBox,
                {borderRadius: 10, backgroundColor: '#EFEFEF', padding: 15},
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#144692', fontSize: 17}}>Hold</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  findDevicetype.isTab === 'Tablet'
                    ? onCloseRemark()
                    : onmobileCloseRemark()
                }
                style={{position: 'absolute', top: 12, left: 10}}>
                <Image
                  style={{width: 30, height: 30}}
                  resizeMode="contain"
                  source={require('../../Images/closeicon.png')}
                />
              </TouchableOpacity>

              <View style={{marginVertical: 15}}>
                <TextInput
                  style={[
                    global.inputBox,
                    {
                      paddingRight: 10,
                      height: 90,
                      alignItems: 'center',
                      fontSize: 16,
                    },
                  ]}
                  onChangeText={onChangenote}
                  placeholder="Remark"
                  placeholderTextColor="#979697"
                  value={note}
                  multiline={true}
                />
              </View>

              <TouchableOpacity
                style={
                  note === '' ? global.commmonDiasbletn : global.commonButton
                }
                onPress={() => onsaveRemark()}
                disabled={note === '' ? true : false}>
                <Text style={global.btnText1}>Save</Text>

                {onload ? <ActivityIndicator size="small" /> : null}
              </TouchableOpacity>

              {/* <View style={[{marginBottom: 11}]}>
                <Text style={[global.commonText, {textAlign: 'center',fontSize:16,color:'#144692'}]}>
                  Hold
                </Text>
              </View> */}

              {/* <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#EFEFEF',
                    borderWidth: 2,
                  },
                  global.bottomSpacing,
                ]}>
                <TextInput
                  style={[
                    global.inputBox,
                    {paddingRight: 10, height: 90, alignItems: 'center',fontSize:16},
                  ]}
                  onChangeText={onChangenote}
                  placeholder="Remark"
                  placeholderTextColor="#979697"
                  value={note}
                  multiline={true}
                />
              </View>

              <TouchableOpacity
                style={
                  note === '' ? global.commmonDiasbletn : global.commonButton
                }
                onPress={() => onsaveRemark()}
                disabled={note === '' ? true : false}>
                <Text style={global.btnText1}>Save</Text>

                {onload ? <ActivityIndicator size="small" /> : null}
              </TouchableOpacity> */}

              {/* <TouchableOpacity
                onPress={() =>
                  findDevicetype.isTab === 'Tablet'
                    ? onCloseRemark()
                    : onmobileCloseRemark()
                }
                style={global.closeIcon}>
                <Image source={require('../../Images/closeicon.png')}
                style={{width:32,height:32,tintColor:'#144692'}}
                resizeMode='contain'
                />
              </TouchableOpacity> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
