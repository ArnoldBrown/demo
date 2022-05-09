import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {global} from '../../styles/global';

export default function Messsage() {

  const [checkDevicetype, setDevicetype] = React.useState('');


  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);

  }, []);

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
        global.appBgcolor,
      ]}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 11,
        }}>
        <Text style={styles.msg}>
          {checkDevicetype === "Handset"

            ? "Sorry we're  not available in Landscape mode  at this moment ,we suggest you to use Protrait Mode for  better user experience ."

            : "Sorry we're  not available in Protrait mode  at this moment ,we suggest you to use Landscape Mode for  better user experience ."}


        </Text>
      </View>
      <View style={{alignSelf: 'flex-end', padding: 11}}>
        <Text style={[global.commonTextwhiteH1, {marginBottom:3}]}>
          Team ,
        </Text>

        <Text style={global.commonTextwhiteH1}>POS</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  msg: {color: '#fff', fontSize: 18, textAlign: 'center'},

});
