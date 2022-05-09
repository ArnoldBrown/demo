import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Touchable,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import {useSelector, useDispatch} from 'react-redux';
import Customloader from '../Customloader';
import {deleteSingleproductaction} from '../../action/categorywiseProductaction';
import FlatlistEmpty from '../FlatlistEmpty';
import {SwipeListView} from 'react-native-swipe-list-view';
import ImagePicker from 'react-native-image-crop-picker';

import {productlistAction, seacrchAction} from '../../action/productlistAction';
import { API_Links } from '../Api/Api';

export default function Managecategory({navigation, productId, route}) {
  const findDevicetype = DeviceType();

  const dispatch = useDispatch();

  const product_array = useSelector(state => state.productReducer);

  const {productarray, status} = product_array;

  const getAdminroles = useSelector(state => state.manageReducer);
  const {roleList} = getAdminroles;

  const shopName = useSelector(state => state.shopnameReducer);

  const {groceryName} = shopName;



  let getIndex = productarray.length === 0 ? null : productarray[0].id;

  useEffect(() => {
    dispatch(
      productlistAction(
        route.params.categories_id,
        route.params.language_id,
        route.params.currency_code,
        groceryName,
      ),
    );

    return () => {};
  }, []);

  const renderProduct = ({item}) => {
    return (
      <View>
        <View style={[global.commonWhitebg, {paddingVertical: 0}]}>
          <View style={[global.flexRowsec, global.flexLine, {}]}>
            <View style={{width: 100, height: 70}}>
              <Image
                source={{
                  uri: groceryName ===""? API_Links.URL +item.products_image : API_Links.SHOP_URL+groceryName+"/"+item.products_image,
                }}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            </View>

            <View style={{paddingHorizontal: 11, flex: 0.8}}>
              <Text numberOfLines={2} style={[global.commonTextblue, {}]}>
                {item.products_name}
              </Text>
              <Text style={[global.commonText, {marginVertical: 8}]}>
                RM {item.products_price}
              </Text>
              {/* <TouchableOpacity style={global.smButton}>
    <Text style={global.btnText1}>Show on selling screen</Text>
</TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem1 = (data, rowMap) => (
    <View style={global.rowBack}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Editproduct', {
                //  products_name: data.item.products_name,
                //  products_description:data.item.products_description,
                //  products_type:data.item.products_type,
                //  categories:data.item.categories.map((e)=>e.categories_id),
                //  products_price:data.item.products_price,
                //  products_min_order:data.item.products_min_order,
                //  products_max_stock:data.item.products_max_stock,
                //  products_status:data.item.products_status,
                //  products_model:data.item.products_model,
                //  manufacturers_id:data.item.manufacturers_id,
                //  products_weight:data.item.products_weight,
                //  products_weight_unit:data.item.products_weight_unit,
                is_feature: data.item.is_feature,
                //  products_image:data.item.products_image,
                //  products_video_link:data.item.products_video_link,
                products_slug: data.item.products_slug,
                products_id: data.item.products_id,
                //  products_type:data.item.products_type,
                //  manufacturers_id:data.item.manufacturers_id,
                //  products_tax_class_id:data.item.products_tax_class_id,
                old_image_id: data.item.old_image_id,
              })
          
        }
        style={[global.actionButton, global.appBgcolor]}>
        <Image
          source={require('../../Images/editwhiteicon.png')}
          style={[global.settingIcon, {tintColor: '#fff'}]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[global.actionButtonq, {backgroundColor: '#000'}]}
        onPress={() =>
          navigation.navigate('AddProductimage', {
            prId: data.item.products_id,
          })
        }>
        <Image
          source={require('../../Images/edit-image.png')}
          style={[global.settingIcon, {tintColor: '#fff'}]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[global.actionButtonq2, {backgroundColor: 'red'}]}
        onPress={() => onDeleteProduct(data.item.products_id)}>
        <Image
          source={require('../../Images/trash.png')}
          style={[global.settingIcon, {tintColor: '#fff'}]}
        />
      </TouchableOpacity>
    </View>
  );

  const onDeleteProduct = id => {
    
      dispatch(deleteSingleproductaction(id, navigation ,groceryName));
      //viewAllcategoryAction(languageId);
   
    
  };

  return (
    <SafeAreaView style={global.commonBg}>
      {findDevicetype.isTab === 'Tablet' ? null : (
        <View style={[global.commonHeader, {padding: 15}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={global.headBackarrow}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>{route.params.categoriesName}</Text>

          <View>
            {/* <View style={global.flexRowsec}>
              <TouchableOpacity>
                <Text
                  style={[
                    global.headSvbtn,
                    {textAlign: 'center', marginRight: 15},
                  ]}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={[global.headSvbtn, {textAlign: 'center'}]}>
                  Add Product
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      )}

      <SwipeListView
        ListEmptyComponent={FlatlistEmpty()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        // useNativeDriver={false}
        keyExtractor={(item, index) => item.id}
        data={productarray}
        renderItem={renderProduct}
        renderHiddenItem={renderHiddenItem1}
        // leftOpenValue={73}
        rightOpenValue={-255}
        previewRowKey={getIndex}
        previewOpenValue={-473}
        previewOpenDelay={1000}
        // onRowDidOpen={onItemOpen}
      />
    </SafeAreaView>
  );
}
