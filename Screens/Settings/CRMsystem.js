import React, {useState} from 'react';
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
  ScrollViewBase,
  Pressable,
} from 'react-native';
import {global} from '../../styles/global';

const CRMsystem = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [text, onChangeText] = useState('');

  const data = [
    {
      id: 1,
      text: 'Shop registration',
      img: require('../../Images/posicon.png'),
    },
    {
      id: 2,
      text: 'Loyalty Point',
      img: require('../../Images/loyalPoints.png'),
    },
    {id: 3, text: 'Reward Card', img: require('../../Images/rewardCard.png')},
    {
      id: 4,
      text: 'Notification',

      img: require('../../Images/notification.png'),
    },
  ];

  const [getid, setId] = useState(1);

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {global.Dimensionwidth > 468 ? null : (
        <View style={global.commonMobileHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>CRM Settings</Text>

          <View
            style={[
              global.flexRowsec,
              {justifyContent: 'space-between'},
            ]}></View>
        </View>
      )}
      <View style={[global.commonBg, {padding: 25, flex: 1}]}>
        {getid === 1 ? (
          <View>
            <Text style={[global.bigOtext_2, global.COLOR_BLUE]}>
              Shop registration
            </Text>

            <Text></Text>
            <Text style={[global.commonText, {fontSize: 13}]}>
              <Text style={{color: 'red'}}>*</Text> In case,shop doesn't have
              LIne QA,you can apply at
              <Text style={{color: 'green'}}>
                {' '}
                Messaging API | LINE Developers{' '}
              </Text>
            </Text>

            <Text></Text>
            <Text></Text>

            <Text></Text>

            <View
              style={[
                global.commonFlexrow_ct,
                {
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: '#DADADA',
                },
              ]}>
              <Text style={[global.bigOtext_2, global.COLOR_BLUE]}>
                {' '}
                Status
              </Text>

              <View style={global.flexRowsec}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />

                <Text
                  style={[
                    {marginLeft: 11},
                    global.commonText,
                    global.COLOR_NORMAL,
                  ]}>
                  Disable
                </Text>
              </View>
            </View>
            <Text></Text>

            <View>
              <View>
                <View style={global.commonFlexrow_ct}>
                  <View style={{width: '30%'}}>
                    <Text style={global.commonTextH1}>Channel ID</Text>
                  </View>

                  <View style={[global.inputBox, {width: '70%', height: 32}]}>
                    <TextInput
                      style={[global.input]}
                      onChangeText={onChangeText}
                      placeholderTextColor="#D1D1D1"
                      placeholder="channel ID"
                      value={text}
                    />
                  </View>
                </View>

                <Text></Text>

                <View style={global.commonFlexrow_ct}>
                  <View style={{width: '30%'}}>
                    <Text style={global.commonTextH1}>Channel Secret</Text>
                  </View>

                  <View style={[global.inputBox, {width: '70%', height: 32}]}>
                    <TextInput
                      style={[global.input]}
                      onChangeText={onChangeText}
                      placeholder="channel Secret"
                      placeholderTextColor="#D1D1D1"
                      value={text}
                    />
                  </View>
                </View>
              </View>
            </View>

            <Text></Text>

            <Text></Text>

            <TouchableOpacity style={[global.commonButton, {height: 35}]}>
              <Text style={global.btnText1}>Save</Text>
            </TouchableOpacity>

            <ScrollView horizontal>
              <View></View>
            </ScrollView>
          </View>
        ) : getid === 4 ? (
          <View>
            <Text style={[global.bigOtext_2, global.COLOR_BLUE]}>
              Notification Settings
            </Text>

            <Text></Text>
            <Text style={[global.commonText, {fontSize: 13}]}>
              Automatic notification service via Line Notify
            </Text>

            <Text></Text>
            <Text></Text>

            <View
              style={[
                global.commonFlexrow_ct,
                {
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: '#DADADA',
                },
              ]}>
              <Text style={[global.bigOtext_2, global.COLOR_BLUE]}>
                {' '}
                Status
              </Text>

              <View style={global.flexRowsec}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />

                <Text
                  style={[
                    {marginLeft: 11},
                    global.commonText,
                    global.COLOR_NORMAL,
                  ]}>
                  Disable
                </Text>
              </View>
            </View>
            <Text></Text>

            <View>
              <View>
                <View style={global.commonFlexrow_ct}>
                  <View style={{width: '32%'}}>
                    <Text style={global.commonTextH1}>Access Token</Text>
                  </View>

                  <View style={[global.inputBox, {width: '68%', height: 32}]}>
                    <TextInput
                      style={[global.input]}
                      onChangeText={onChangeText}
                      placeholderTextColor="#D1D1D1"
                      placeholder="Please enter the Access Token"
                      value={text}
                    />
                  </View>
                </View>

                <Text></Text>
              </View>
            </View>

            <TouchableOpacity style={[global.commonButton, {height: 35}]}>
              <Text style={global.btnText1}>Save</Text>
            </TouchableOpacity>

            <ScrollView horizontal>
              <View></View>
            </ScrollView>
          </View>
        ) : 
        
        
        
        getid === 3 ? (
            <View>
              <Text style={[global.bigOtext_2, global.COLOR_BLUE]}>
                Reward Card Settings
              </Text>
  
              <Text></Text>
              <Text style={[global.commonText, {fontSize: 13}]}>
               Prescribed conditions
              </Text>
  
              <Text></Text>
              <Text></Text>
  
              <View
                style={[
                  global.commonFlexrow_ct,
                  {
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderColor: '#DADADA',
                  },
                ]}>
                <Text style={[global.bigOtext_2, global.COLOR_BLUE]}>
                  {' '}
                  Status
                </Text>
  
                {/* <View style={global.flexRowsec}>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
  
                  <Text
                    style={[
                      {marginLeft: 11},
                      global.commonText,
                      global.COLOR_NORMAL,
                    ]}>
                    Disable
                  </Text>
                </View> */}
              </View>
             <Text></Text>

<View style={[global.commonborder,{padding:15}]}>
    <View style={{paddingBottom:15 ,borderBottomWidth:1 ,borderBottomColor:"#DADADA" ,marginBottom:16}}>

    <Text  style={[global.bigOtext_2, global.COLOR_BLUE,{}]}>Reward Card Settings</Text>


        </View>
 


<Text style={global.commonTextH1}>Go to Reward card settings and configure each item at  <Text style={{fontWeight:"800"}}> https://grocery.com.net </Text>    </Text>


</View>



  
          
  
           
            </View>
          )  : null
        
        
        
        
        
        
        
        
        
        }
      </View>

      <View
        style={{
          backgroundColor: '#eee',
          borderTopWidth: 1,
          borderTopColor: '#DADADA',
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map(e => {
            return (
              <Pressable
                style={{
                  width: global.Dimensionwidth  > 468 ? global.Dimensionwidth / 5.5 :null,
                  backgroundColor: '#eee',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 47, paddingHorizontal:8
                }}
                onPress={() => setId(e.id)}>
                <Image
                  source={e.img}
                  style={
                    e.id === getid
                      ? [global.iconColor, global.smallIcon, {marginRight: 10}]
                      : [global.smallIcon, {marginRight: 10}]
                  }
                />

                <Text
                  style={[
                    e.id === getid ? global.COLOR_BLUE : global.COLOR_BLACK,
                  ]}>
                  {e.text}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* <ChatModel/> */}
    </SafeAreaView>
  );
};

export default CRMsystem;
