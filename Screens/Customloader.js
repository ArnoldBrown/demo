import React, {useState} from 'react';
import {View, Text, Modal, ActivityIndicator} from 'react-native';

import {global} from '../styles/global';

export default function Customloader() {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal animationType="none" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff80',
        }}>
        <View
          style={[
            {
              padding: 10,
              borderRadius: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <ActivityIndicator size="large" color="#144693" />
        </View>
      </View>
    </Modal>
  );
}
