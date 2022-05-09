import React, {useState, useEffect ,useRef}  from 'react';
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
  Platform,Alert,Dimensions,Modal ,ActivityIndicator
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-picker';
import {API_Links} from '../Api/Api';
import Customloader from '../Customloader';
import {Button, Snackbar} from 'react-native-paper';
import Customalerts from '../../Alerts/Customalerts'
import RBSheet from "react-native-raw-bottom-sheet";
import {categorylistAction} from '../../action/categorylistAction';
import {useSelector, useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import ImagePicker from 'react-native-image-crop-picker';
import {FlatGrid} from 'react-native-super-grid';
import FlatlistEmpty from '../FlatlistEmpty'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

import  AuthId  from '../AuthId.style'

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();
const windowwidth = Dimensions.get('screen').width;



export default function Addcategory({navigation, oncloseModel}) {

// =======  Redux states & functions  ========///
  const getToken = useSelector(state => state.loginReducer);
  const {userId} = getToken;

  const shopName = useSelector(state => state.shopnameReducer);
  const {groceryName} = shopName;


  const category_array = useSelector(state => state.categorylistReducer);

  const {categoryarray} = category_array;

  const viewallCatitems_array = useSelector(
    state => state.viewcategorylistReducer,
  );

  const {viewallCatitems} = viewallCatitems_array;

  const dispatch = useDispatch();

  const getLanguageids = useSelector(state => state.languageReducer);
  const {languageId} = getLanguageids;


  const viewGalleryarray = useSelector(state => state.gallerydataReducer);

  const {galleryArray ,firstIndex }  = viewGalleryarray;

  const [galleryboxwrap, setGalleryboxwrap] = useState(galleryArray);

  let yuu = galleryboxwrap.concat(galleryArray);

  let ui = yuu.filter(e => e.isSelect === true);


  console.log(yuu,"fesewefw0ewf=0wf=w")






// =======  Redux states  ========///




//=======  Initaial  States ======== //

  const refRBSheet = useRef();

  const [catList ,setCatlist ]=useState(' Leave as Parent')
const [catListid,setCatlistid]=useState(0)


  const [parentcatType,setparentcatType]=useState([

{categories_id:0 ,categories_name:"Laeve as parent"} 

  ])

   let concatListproducts = parentcatType.concat(categoryarray)





  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoader, setLoader] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [text, onChangeText] = useState('');

  const [text1, onChangeText1] = useState('');

  const [visible, setVisible] = React.useState(false);

  // const [image, setimage] = useState('');
  // const [imgName, setImagename] = useState(' ');
  // const [imgType, setImagetype] = useState(' ');
  // const [imgURL, setImageurl] = useState(' ');

  // const [icon, setIcon] = useState('');
  // const [iconName, setIconname] = useState(' ');
  // const [iconType, seticonType] = useState(' ');
  // const [iconURL, seticonURL] = useState(' ');


  const [modalVisible, setModalVisible] = useState(false);
  const [iconmodal, seticonModal] = useState(false);

  const [isSelected, setisSelected] = useState(firstIndex!=={ } ? ' ' :' ');
  const [iconSelected, seticonSelected] = useState(firstIndex!=={ } ? ' ' :' ');

  
  const [imagePath, setimagePath] = useState('');
  const [iconPath, seticonPath] = useState('');


//=======  Initaial  States ======== //

const listCatgeory =()=>{


  dispatch((categorylistAction(languageId ,groceryName )))


}



const onChooseImg = item => {


  setimagePath(item.path)
 
  item.isSelect = !item.isSelect;

  setGalleryboxwrap([...galleryboxwrap]);

  item.selectedClass = item.isSelect
    ? global.itemContainer1
    : global.itemContainer1;





};


const onChooseiconImg =(item)=>{

  seticonPath(item.path)
 
  item.isSelect = !item.isSelect;

  setGalleryboxwrap([...galleryboxwrap]);

  item.selectedClass = item.isSelect
    ? global.itemContainer1
    : global.itemContainer1;



}



  const findDevicetype = DeviceType();


  




  const onSavecategory = () => {

  




if(text===''||  text1===''||  isSelected==={} || isSelected==={} ){

 // Customalerts("All Fields Required")
 Alert.alert(
  "All Fields Required",
  "",
  [
   
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]
);

}


else {




    setLoader(true);
    var form = new FormData();
     form.append('category_name', text);
     form.append('category_descriptions', text1);
    //  form.append('image', {
    //   name: imgName,
    //   type: imgType,
    //   uri: Platform.OS === 'android' ? imgURL : imgURL.replace('file://', ''),
    // });
    form.append('image',isSelected);
    form.append('icon',iconSelected);
    form.append('categories_status', isEnabled ? 1 : 0);
    form.append('parent_id', catListid);



    fetch(groceryName==="" ?   API_Links.BASE_URL + API_Links.ADD_CATEGORY : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.ADD_CATEGORY  , {
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
      });}
  };



 



useEffect(()=>{
  const unsubscribe = navigation.addListener('focus', () => { 

    
    listCatgeory()



  })


  return ()=>{
    
    unsubscribe;

  }

},[])



function Loopcategory({comment}) {
  const nestedComments = (comment.childs || []).map(comment => {
    return (
      <View>
        <Loopcategory key={comment.id} comment={comment} />
      </View>
    );
  });

  return (
    <View style={{marginTop: 12}}>
      <TouchableOpacity
       onPress={()=>[setCatlist(comment.categories_name),refRBSheet.current.close(),setCatlistid(comment.categories_id)]}>
        <View style={{paddingHorizontal:11}}>
          

       

          <View>
            <Text style={global.commonTextblue}>
              {comment.categories_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View>{nestedComments}</View>
    </View>
  );
}



  return (
    <SafeAreaView style={[global.commonBg, {borderRadius: 11}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={global.commonHeader}>
        <TouchableOpacity
          onPress={() =>
            findDevicetype.isTab === 'Tablet'
              ? oncloseModel(text)
              : navigation.goBack()
          }>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={global.settingIcon}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Add Category</Text>

<View></View>
        {/* <View style={global.flexRowsec}>
          <TouchableOpacity onPress={() => onSavecategory()}>
            <Text style={[global.headSvbtn, {textAlign: 'center'}]}>Save</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={[global.commonWhitebg,{flex:1}]}>

        <View style={{flex:1}}>



      <View style={global.commonFlexrow_ct}>
          <Text style={global.commonTextblue}>Category </Text>

          <TouchableOpacity style={[global.inputBox, global.commonTwocol]} onPress={()=>refRBSheet.current.open()}>
          <Text>{catList}</Text>
          </TouchableOpacity>


        </View>
        <Text></Text>
     





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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={global.imageBox}>
                {imagePath === '' ? (
                  <Image
                    source={require('../../Images/placeholder.png')}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                  source={{
                    uri: API_Links.URL+imagePath,
                  }}
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
            <TouchableOpacity onPress={() => seticonModal(true)}>
              <View style={global.imageBox}>
                {iconPath === '' ? (
                  <Image
                    source={require('../../Images/placeholder.png')}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                  source={{
                    uri: API_Links.URL+iconPath,
                  }}
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

        </View>

         <View >
          <TouchableOpacity onPress={() => onSavecategory()} style={global.commonButton}>
            <Text style={[global.btnText1]}>Save</Text>
          </TouchableOpacity>
        </View>




        {/* <View style={global.commonFlexrow_bt}>

<Text style={global.commonTextblue}>Printer </Text>





</View> */}
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
        Category Added Successfully.
      </Snackbar>



     

        


        <RBSheet
        ref={refRBSheet}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              padding:11
             
            }
          }}
        >
          <View>


<ScrollView showsVerticalScrollIndicator={false}>

          
   {concatListproducts.map(e => {
            return (
              <View>
                <Loopcategory key={e.id} comment={e} />
              </View>
            );
          })}


</ScrollView>



          </View>





        </RBSheet>
      





        <Modal transparent={true} visible={modalVisible} animationType={'none'}>
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
                data={yuu}
                ListEmptyComponent={FlatlistEmpty}
                spacing={6}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => [onChooseImg(item) ,  setisSelected(item.id)   ]}>
                    <View
                      style={[
                        [isSelected === item.id  ?{height:150 ,padding:3 ,borderWidth:2}:{height: 150,  padding: 5}] 
                      ]}>
                      <Image
                        source={{
                          uri: groceryName==="" ?  API_Links.URL+item.path : API_Links.SHOP_URL+groceryName+"/"+item.path,
                        }}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="cover"
                      />
                    </View>




                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={[global.commonFlexrow_bt, {padding: 15}]}>
              <TouchableOpacity
                style={global.commonButton}
                onPress={() => {
                  ImagePicker.openPicker({
                    multiple: true,
                    includeBase64: true,

                    cropping: true,
                    avoidEmptySpaceAroundImage: true,
                    sortOrder: 'asc',
                    maxFiles: 53,
                  })
                    .then(res => {
                      if (res) {
                        setLoader(true);

                        var random = ('' + Math.random()).substring(2, 8);
                        var data = new FormData();

                        res.forEach((item, i) => {
                          data.append('file[]', {
                            uri:
                              Platform.OS === 'android'
                                ? item.path
                                : item.path.replace('file://', ''),
                            type: 'image/jpeg',
                            name: `POS_${random}.jpg`,
                          });
                        });
 
                        fetch(  groceryName==="" ? API_Links.BASE_URL + API_Links.ADD_GALLERY : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.ADD_GALLERY  , {
                          method: 'POST',

                          headers: {
                            'consumer-key': API_Links.CONSUMER_KEY,
                            'consumer-secret':
                              API_Links.SECRET_KEY,
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
                          //  body: data,
                        })
                          .then(response => response.json())

                          .then(data => {
                            setLoader(false);

                            if (data.success === '1') {
                              Alert.alert(data.message, '', [{text: 'OK'}]);

                              viewGalleryimg();
                            }
                          });
                      }
                    })

                    .catch(e => {
                      console.log(e);
                    });
                }}>
                <Text style={global.btnText1}>Upload Image</Text>
              </TouchableOpacity>

              {isLoader ? (
                <ActivityIndicator size="small" color="#000" />
              ) : null}

              <TouchableOpacity
                style={global.commonButton}
                onPress={() => [setModalVisible(false)]}>
                <Text style={global.btnText1}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> 










      <Modal transparent={true} visible={iconmodal} animationType={'none'}>
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
                data={yuu}
                ListEmptyComponent={FlatlistEmpty}
                spacing={6}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => [onChooseiconImg(item) ,  seticonSelected(item.id)]}>
                    <View
                      style={[
                        [iconSelected === item.id  ?{height:150 ,padding:3 ,borderWidth:2}:{height: 150,  padding: 5}] 
                      ]}>
                      <Image
                        source={{
                          uri: groceryName=== "" ? API_Links.URL +item.path :API_Links.SHOP_URL+groceryName+"/"+item.path ,
                        }}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="cover"
                      />
                    </View>




                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={[global.commonFlexrow_bt, {padding: 15}]}>
              <TouchableOpacity
                style={global.commonButton}
                onPress={() => {
                  ImagePicker.openPicker({

                    multiple: true,
                    includeBase64: true,
                    cropping: true,
                    avoidEmptySpaceAroundImage: true,
                    sortOrder: 'asc',
                    maxFiles: 53,

                  })
                    .then(res => {
                      if (res) {
                        setLoader(true);

                        var random = ('' + Math.random()).substring(2, 8);
                        var data = new FormData();

                        res.forEach((item, i) => {
                          data.append('file[]', {
                            uri:
                              Platform.OS === 'android'
                                ? item.path
                                : item.path.replace('file://', ''),
                            type: 'image/jpeg',
                            name: `POS_${random}.jpg`,
                          });
                        });

                        fetch(API_Links.BASE_URL + API_Links.ADD_GALLERY, {
                          method: 'POST',

                          headers: {
                            'consumer-key': API_Links.CONSUMER_KEY,
                            'consumer-secret':
                              API_Links.SECRET_KEY,
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
                          //  body: data,
                        })
                          .then(response => response.json())

                          .then(data => {
                            setLoader(false);

                            if (data.success === '1') {
                              Alert.alert(data.message, '', [{text: 'OK'}]);

                              viewGalleryimg();
                            }
                          });
                      }
                    })

                    .catch(e => {
                      console.log(e);
                    });
                }}>
                <Text style={global.btnText1}>Upload Image</Text>
              </TouchableOpacity>

              {isLoader ? (
                <ActivityIndicator size="small" color="#000" />
              ) : null}

              <TouchableOpacity
                style={global.commonButton}
                onPress={() => [seticonModal(false)]}>
                <Text style={global.btnText1}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> 






    </SafeAreaView>
  );
}
