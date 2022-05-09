import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import { global } from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import { useSelector } from 'react-redux'

export default function save({
  onCloseRemark,
  onmobileCloseRemark,
  onsaveRemark,
  onChangenote,
  note,
}) {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalVisibleDum, setModalVisibleDum] = useState(false);
  const [number, onChangeNumber] = useState('');

  const findDevicetype = DeviceType();

  const ass = useSelector(state => state.cartReducer);

  const { onload } = ass;


  const _holdReducer = useSelector(state => state.holdReducer);
  const { cartHolderdata, cartHoldloader } = _holdReducer;







  return (
    <View>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback>
          <View
            style={[
              global.commonModalbg,
              { justifyContent: 'center', alignItems: 'center' },
            ]}>
            <View
              style={[
                global.commonWhitebg,
                { borderRadius: 11, backgroundColor: '#EFEFEF', padding: 10 },
                global.ModalBox80,
              ]}>
              <View style={[{ marginBottom: 5 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  >
                    <Image
                      source={require('../../Images/closeicon.png')}
                    />
                  </TouchableOpacity>

                  <Text style={[global.commonText, { textAlign: 'center', alignSelf: 'center' }]}>
                    Hold
                  </Text>

                  <View>
                    <Image
                    style={{opacity:0}}
                      source={require('../../Images/closeicon.png')}
                    />
                  </View>

                </View>

              </View>

              <View
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
                  style={[global.inputBox, { paddingRight: 10, height: 90, alignItems: "center" }]}
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



              <TouchableOpacity
                onPress={() =>
                  findDevicetype.isTab === 'Tablet'
                    ? onCloseRemark()
                    : onmobileCloseRemark()
                }
                style={global.closeIcon}>
                <Text style={{ color: '#fff' }}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
