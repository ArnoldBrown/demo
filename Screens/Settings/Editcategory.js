import React, {useState, useEffect, useRef} from 'react';
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
  Switch,
  Platform,
  Alert,
  Dimensions, 
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-picker';
import {API_Links} from '../Api/Api';
import Customloader from '../Customloader';
import {Button, Snackbar} from 'react-native-paper';
import Customalerts from '../../Alerts/Customalerts';
import RBSheet from 'react-native-raw-bottom-sheet';
import {categorylistAction} from '../../action/categorylistAction';
import {useSelector, useDispatch} from 'react-redux';

import  AuthId  from '../AuthId.style'




export default function Editcategory({navigation, oncloseModel, route   ,
  propsCategoryname ,
  propsImagepath,
  propsParentid ,
  propsSlugname ,
  propsId ,
  propsStatus ,onCloseEditmodel}) {
  

  // =======  Redux states & functions  ========///


  const category_array = useSelector(state => state.categorylistReducer);

  const {categoryarray} = category_array;

  const shopName = useSelector(state => state.shopnameReducer);
  const {groceryName} = shopName;



  // =======  Redux states  ========///

  //=======  Initaial  States ======== //

  const refRBSheet = useRef();

  const [catList, setCatlist] = useState(' Leave as Parent');
  const [catListid, setCatlistid] = useState(0);

  const [parentcatType, setparentcatType] = useState([
    {categories_id: 0, categories_name: 'Laeve as parent'},
  ]);

  let concatListproducts = parentcatType.concat(categoryarray);

  const [isEnabled, setIsEnabled] = useState(
  global.Dimensionwidth> 468 ?  propsStatus=== 1 ? true : false :

      route.params.categories_status === 1 ? true : false,
  );




  const [isLoader, setLoader] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [text, onChangeText] = useState( global.Dimensionwidth > 468? propsCategoryname  : route.params.categories_name);

  const [text1, onChangeText1] = useState('');

  const [visible, setVisible] = React.useState(false);

  const [image, setimage] =  useState({uri:global.Dimensionwidth > 468 ? API_Links.URL+ propsImagepath :  API_Links.URL+route.params.catIconimage});



  const [imgURL, setImageurl] = useState( global.Dimensionwidth > 468? propsImagepath : route.params.catIconimage);

  const [icon, setIcon] = useState({uri:global.Dimensionwidth >468 ? API_Links.URL+propsImagepath  :API_Links.URL+propsImagepath +route.params.catIconimage});



  const [iconURL, seticonURL] =  useState(   global.Dimensionwidth > 468?  propsImagepath :  route.params.catIconimage);



  //=======  Initaial  States ======== //


  // const onSelectimage = type => {
  //   const options = {
  //     storageOptions: {
  //       path: 'images',
  //       mediaType: 'photo',
  //     },
  //     includeBase64: true,
  //     saveToPhotos: true,
  //   };
  //   //console.log("vb")

  //   launchCamera(options, response => {
  //     if (response.didCancel) {
  //       console.log('user cnacelled');
  //     } else if (response.errorCode) {
  //       console.log(response.errorCode);
  //     } else if (type === 1) {
  //       const source = {
  //         uri:
  //           `data:image/jpeg;base64,` +
  //           response.assets.map(e => e.base64).toString(),
  //       };

  //       setimage(source);
  //       setImagename(response.assets.map(e => e.fileName).toString());
  //       setImagetype(response.assets.map(e => e.type).toString());
  //       setImageurl(response.assets.map(e => e.uri).toString());
  //     } else {
  //       const source = {
  //         uri:
  //           `data:image/jpeg;base64,` +
  //           response.assets.map(e => e.base64).toString(),
  //       };

  //       setIcon(source);
  //       setIconname(response.assets.map(e => e.fileName).toString());
  //       seticonType(response.assets.map(e => e.type).toString());
  //       seticonURL(response.assets.map(e => e.uri).toString());
  //     }
  //   });
  // };

  const onSavecategory = () => {
    if (text === '' || text1 === '' || image === '' || icon === '') {
      // Customalerts("All Fields Required")
      Alert.alert('All Fields Required', '', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
setLoader(true)
    


      var form = new FormData();
      form.append('category_name', text);
      form.append('category_descriptions', text1);
      form.append('image',imgURL)   ,
       form.append('icon', iconURL) ,
      form.append('categories_status', isEnabled ? 1 :0 );
      form.append('parent_id', global.Dimensionwidth > 468  ? propsParentid  :route.params.parent_id);
      form.append('slug', global.Dimensionwidth > 468 ? propsSlugname : route.params.slug);
      form.append('edit_id',global.Dimensionwidth > 468 ? propsId : route.params.categories_id); 


      

      fetch( groceryName ==="" ? API_Links.BASE_URL + API_Links.EDIT_CATEGORY :API_Links.SHOP_URL+groceryName+"/"+"api/"+API_Links.SHOP_URL , {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'multipart/form-data',
        }),
        body: form,
      })
        .then(response => response.json())
        .then(data => {

         
          setLoader(false);
         setVisible(true);



        })

        .catch(function (error) {
       
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView style={[global.commonBg, {borderRadius: 11}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={global.commonMobileHeader} >
        <TouchableOpacity
          onPress={() =>
            global.Dimensionwidth > 468 ?onCloseEditmodel():
              navigation.goBack()
          }>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={global.settingIcon}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Edit Category</Text>

        <View style={global.flexRowsec}>
          {/* <TouchableOpacity onPress={() => onSavecategory()}>
            <Text style={[global.headSvbtn, {textAlign: 'center'}]}>Save</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      <View style={[global.commonWhitebg,{flexGrow:1}]}>
    
    <View style={{flex:1}}>

  

        <View style={global.commonFlexrow_ct}>
          <Text style={global.commonTextblue}>Category Name</Text>

          <View style={[global.inputBox, global.commonTwocol]}>
            <TextInput
              style={[global.input]}
              onChangeText={onChangeText}
              value={text}
              placeholderTextColor="#D1D1D1"
            />
          </View>
        </View>
        <Text></Text>

        <View style={global.commonFlexrow_ct}>
          <Text style={global.commonTextblue}>Category Descriptions</Text>

         
          <View style={[ global.commonTwocol,{maxHeight:90 ,borderWidth:1 ,padding:10 , borderColor: '#b6b9bd',}]}>
            <TextInput
              style={{height:"100%"}}
              onChangeText={onChangeText1}
              value={text1}
              placeholderTextColor="#D1D1D1"
              
              multiline
            />
          </View>
        </View>
        <Text></Text>

        <View style={global.commonFlexrow_ct}>
          <Text style={global.commonTextblue}>Image</Text>

          <View style={[global.commonTwocol, {flexDirection: 'row-reverse'}]}>
            <TouchableOpacity >
              <View style={global.imageBox}>
                {image === '' ? (
                  <Image
                    source={require('../../Images/placeholder.png')}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={image}
                    style={{width: '100%', height: '100%'}}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text></Text>

        <View style={global.commonFlexrow_ct}>
          <Text style={global.commonTextblue}>Icon</Text>

          <View style={[global.commonTwocol, {flexDirection: 'row-reverse'}]}>
            <TouchableOpacity>
              <View style={global.imageBox}>
                {icon === '' ? (
                  <Image
                    source={require('../../Images/placeholder.png')}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={icon}
                    style={{width: '100%', height: '100%'}}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text></Text>

        <View style={global.commonFlexrow_bt}>
          <Text style={global.commonTextblue}>Enable </Text>

          <View style={[global.commonTwocol, {flexDirection: 'row-reverse'}]}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        {/* <View style={global.commonFlexrow_bt}>

<Text style={global.commonTextblue}>Printer </Text>





</View> */}
  </View>
<View>
   <TouchableOpacity onPress={() => onSavecategory()} style={global.commonButton}>
            <Text style={[global.btnText1]}>Save</Text>
          </TouchableOpacity>


</View>

      </View>







      {isLoader ? <Customloader /> : null}
      <Snackbar
        visible={visible}
        // duration="3000"
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        }}>
        Category Updated Successfully.
      </Snackbar>

      <RBSheet
        ref={refRBSheet}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            padding: 11,
          },
        }}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {concatListproducts.map((e, index) => {
              return (
                <TouchableOpacity
                  onPress={() => [
                    setCatlist(e.categories_name),
                    refRBSheet.current.close(),
                    setCatlistid(e.categories_id),
                  ]}
                  key={index}>
                  <View style={{padding: 11}}>
                    <Text>{e.categories_name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

