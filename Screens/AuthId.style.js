import uuid from 'react-native-uuid';

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();

export default {
  _currDate: date,
  _currIp: DeviceIp,
  _currDeviceId: DeviceId,
};
