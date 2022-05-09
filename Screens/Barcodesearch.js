import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  Modal,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import {global} from '../styles/global';

export default function Barcodesearch({oncloseQrmodel}) {
  const [modalVisible, setModalVisible] = useState(true);
  const [number, onChangeNumber] = React.useState('');

  const [calcnumber, setcalNumber] = useState([
    {id: '7', num: 7},
    {id: '8', num: 8},
    {id: '9', num: 9},
    {id: '4', num: 4},
    {id: '5', num: 5},
    {id: '6', num: 6},
    {id: '1', num: 1},
    {id: '2', num: 2},
    {id: '3', num: 3},
    {id: '100', num: 'Clear'},
    {id: '0', num: 0},
    {id: '101', num: ''},
  ]);

  const searchCode = id => {
    if (id === '100') {
      onChangeNumber(' ');
    } else if (id === '101') {
      var str1 = number;

      str1 = str1.substring(0, str1.length - 1);

      onChangeNumber(str1);
    } else {
      onChangeNumber(number => number + id);
    }
  };

  return (
    <Modal animationType="none" transparent={true} visible={modalVisible}>
      <TouchableOpacity onPressOut={() => oncloseQrmodel()}>
        <TouchableWithoutFeedback
          style={[
            global.commonModalbg,
            {backgroundColor: '#00000008', alignItems: 'center'},
          ]}>
          <View
            style={[
              {
                backgroundColor: '#fff',
                width: Dimensions.get('screen').width / 2.7,
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,

                elevation: 8,
                marginTop: Dimensions.get('screen').height / 7.5,
                marginLeft: Dimensions.get('screen').width / 2.4,
              },
            ]}>
            <View style={{paddingVertical: 20, borderBottomColor: '#C5C8CF'}}>
              <Text style={[global.H1, {textAlign: 'center'}]}>
                Search from barcode
              </Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                height: 63,
                borderRadius: 4,
                paddingHorizontal: 9,
                borderColor: '#C5C8CF',
                justifyContent: 'center',
              }}>
              <Text style={[global.bigOtext_2]} numberOfLines={1}>
                {number}
              </Text>
            </View>

            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {calcnumber.map((e, index) => {
                return (
                  <Pressable
                    key={index}
                    style={{
                      width: '33.33%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 30,
                      borderBottomWidth: 1,
                      borderRightWidth: 1,

                      borderRightColor: '#C5C8CF',
                      borderBottomColor: '#C5C8CF',
                      backgroundColor: '#f4f4f48c',
                    }}
                    activeOpacity={0}
                    onPress={() => searchCode(e.id)}>
                    {e.num === '' ? (
                      <Image
                        source={require('../Images/calcCloseicon.png')}
                        style={global.settingIcon}
                      />
                    ) : (
                      <Text style={[global.bigOtext_2]}>{e.num}</Text>
                    )}
                  </Pressable>
                );
              })}
            </View>

            <Pressable style={global.barcodeButton}>
              <Text style={[global.bigOtext_1, global.COLOR_BLUE]}>Search</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}
