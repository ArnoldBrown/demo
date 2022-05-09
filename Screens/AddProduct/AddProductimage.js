import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Touchable,
  Image,
  StatusBar,
  Modal,
  Dimensions,
  TouchableHighlight,
  Alert,
  FlatList,
} from 'react-native';
import {API_Links} from '../Api/Api';
import {global} from '../../styles/global';
import uuid from 'react-native-uuid';
import {FlatGrid} from 'react-native-super-grid';
import Customloader from '../Customloader';
import FlatlistEmpty from '../FlatlistEmpty';
import {galleryData, galleryuploadData} from '../../action/galleryAction';
import  AuthId  from '../AuthId.style'

import {useSelector, useDispatch} from 'react-redux';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();

export default function AddProductimage({navigation, route}) {
  const [viewPrimage, setPrimage] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modalVisible, setmodaVisible] = useState(false);
  const [isEdit, setIsedit] = useState(false);

  const [getoldImgid, setoldImgid] = useState('');
  const [listImageid, setlistImageid] = useState(' ');



  const viewGalleryarray = useSelector(state => state.gallerydataReducer);
  const dispatch = useDispatch();

  const shopName = useSelector(state => state.shopnameReducer);
  const {groceryName} = shopName;

 



  const {galleryArray, firstIndex} = viewGalleryarray;

  const [galleryboxwrap, setGalleryboxwrap] = useState([]);

  const [isSelected, setisSelected] = useState(firstIndex);

  let onConcat = galleryboxwrap.concat(galleryArray);

  let onFilterpr = onConcat.filter(e => e.isSelect === true);









  const viewGalleryimg = () => {
    dispatch(galleryData(groceryName));
  };

  const onMultiselect = item => {
    item.isSelect = !item.isSelect;

    setGalleryboxwrap([...galleryboxwrap]);

    item.selectedClass = item.isSelect
      ? global.itemContainer1
      : global.itemContainer1;
  };

  const viewProductimages = () => {
    setLoader(true);

    var data = new FormData();

    data.append('products_id', route.params.prId);
    fetch( groceryName === "" ? API_Links.BASE_URL + API_Links.VIEW_PR_IMAGE : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.VIEW_PR_IMAGE, {
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
        'consumer-device-id':AuthId._currDeviceId,
       'consumer-ip':AuthId._currIp ,
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(response => response.json())

      .then(e => {
        setLoader(false);

        setPrimage(e.data);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewGalleryimg();

      viewProductimages();
    });
    return () => {
      unsubscribe;
    };
  }, []);

  const onDeleteimg = id => {
    var data = new FormData();
    data.append('products_id', route.params.prId);
    data.append('id', id);
    fetch(  groceryName ==="" ? API_Links.BASE_URL + API_Links.DELE_PR_IMAGES  :  API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.DELE_PR_IMAGES , {
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
        'consumer-device-id':AuthId._currDeviceId,
       'consumer-ip':AuthId._currIp ,
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(response => response.json())

      .then(data => {
        if (data.success == '1') {
          viewProductimages();
        }
      })

      .catch(e => console.log(e));
  };

  const onEditimg = async (id, oldimageId) => {
    setlistImageid(id);
    setoldImgid(oldimageId);

    setIsedit(true);

    await dispatch(galleryData(0 ,groceryName));

    setmodaVisible(true);
  };

  const onChangeimg = async () => {
    setmodaVisible(false);

    var data = new FormData();

    data.append('products_id', route.params.prId);
    data.append('oldImage', getoldImgid);
    data.append('id', listImageid);
    data.append('image_id', isSelected);

    fetch(groceryName===""?  API_Links.BASE_URL + API_Links.EDIT_PR_IMG : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.EDIT_PR_IMG,{
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
        'consumer-device-id':AuthId._currDeviceId,
       'consumer-ip':AuthId._currIp ,
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(response => response.json())

      .then(e => {
        viewProductimages();
      })
      .catch(e => console.log(e));
  };

  const renderItem = ({item}) => (
    <View style={{position: 'relative'}}>
      <View
        style={{
          width: '100%',
          height: 200,
          padding: 0,
          borderRadius: 15,
          overflow: 'hidden',
        }}>
        <Image
          source={{uri:  groceryName === "" ?  API_Links.URL + item.path  : API_Links.SHOP_URL+groceryName+"/"+item.path  }}
          style={{width: '100%', height: '100%', overflow: 'hidden'}}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          opacity: 0.8,
          overflow: 'hidden',
          borderRadius: 15,
        }}></View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}>
        <TouchableOpacity
          style={[
            global.appBgcolor,
            {
              width: 40,
              height: 40,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            },
          ]}
          onPress={() => onEditimg(item.id, item.image)}>
          <Image
            source={require('../../Images/editwhiteicon.png')}
            style={global.settingIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            global.appBgcolor,
            {
              width: 40,
              height: 40,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            },
          ]}
          onPress={() => onDeleteimg(item.id)}>
          <Image
            source={require('../../Images/trash.png')}
            style={[global.settingIcon, {tintColor: '#fff'}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const onUploadimg = () => {
    setmodaVisible(false);
    var data = new FormData();
    data.append('products_id', route.params.prId);
    data.append('image_id', onFilterpr.map(e => e.id).toString());

    fetch( groceryName === "" ? API_Links.BASE_URL + API_Links.INSERT_PR_IMAGE : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.INSERT_PR_IMAGE, {
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
        'consumer-device-id':AuthId._currDeviceId,
       'consumer-ip':AuthId._currIp ,
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(response => response.json())

      .then(e => {
        if (e.success === '1') {
          viewProductimages();
        } else {
          Alert.alert('Please Choose product image', '', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
      })

      .catch(e => console.log(e));
  };

  return (
    <SafeAreaView style={global.commonBg}>
      <View style={[global.commonHeader, {padding: 15}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/menu.png')}
            style={global.headBackarrow}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Add Images</Text>

        <View>
          <TouchableOpacity
            style={global.flexRowsec}
            onPress={() => [
              dispatch(galleryData( 1,groceryName )),
              setmodaVisible(true),
              setIsedit(false),
            ]}>
            <Text style={[global.headSvbtn, {textAlign: 'center'}]}>
              Upload
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatGrid
        data={viewPrimage}
        itemDimension={
          global.Dimensionwidth < 468
            ? global.Dimensionwidth / 2.5
            : global.Dimensionwidth / 6.5
        }
        style={{flex: 1}}
        spacing={10}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={FlatlistEmpty()}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent={true} visible={modalVisible} animationType={'slide'}>
        <View
          style={[
            global.commonModalbg,
            {justifyContent: 'flex-end', padding: 12},
          ]}>
          <View style={[global.commonWhitebg, {padding: 0, borderRadius: 11}]}>
            <View style={{padding: 15}}>
              <Text style={global.commonTextblueH1}>Choose Image</Text>
            </View>

            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                height: 350,
                borderColor: '#DADADA',
              }}>
              <FlatGrid
                showsVerticalScrollIndicator={false}
                itemDimension={140}
                data={onConcat}
                //// ListEmptyComponent={renderEmptyContainer()}
                spacing={6}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => [
                      onMultiselect(item),
                      setisSelected(item.id),
                    ]}>
                    <View
                      style={[
                        isEdit === false
                          ? item.isSelect === false
                            ? item.selectedClass
                            : [{height: 150, borderWidth: 2, padding: 5}]
                          : [
                              isSelected === item.id
                                ? {height: 150, padding: 3, borderWidth: 2}
                                : {height: 150, padding: 5},
                            ],
                      ]}>
                      <Image
                        source={{
                          uri:  groceryName=== '' ? API_Links.URL + item.path :
                         // API_Links.SHOP_URL+groceryName+"/"+item.products_imag
                          
                          API_Links.SHOP_URL+groceryName+"/"+item.path,
                        }}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="cover"
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View
              style={[
                global.commonFlexrow_ct,
                {padding: 15, justifyContent: 'flex-end'},
              ]}>
              <TouchableOpacity
                onPress={() => setmodaVisible(false)}
                style={[global.commonButton, {marginHorizontal: 11}]}>
                <Text style={global.btnText1}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => [isEdit ? onChangeimg() : onUploadimg()]}
                style={global.commonButton}>
                <Text style={global.btnText1}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
