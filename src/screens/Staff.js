import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard, KeyboardAvoidingView,
  SafeAreaView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../assets';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSelector, useDispatch } from "react-redux";
import { getInfoUserList } from '../store/HomeSlice'
import { clearState, insFCMYtokenAPI } from '../store/AuthSlice';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { toastConfig } from './Toast';

import { findInfoUserList } from '../store/HomeSlice'
// import NumberFormat from 'react-number-format';
const width = Dimensions.get('window').width;
const DATA = [
  {
    id: '1',
    name: 'Kiều Duy Lưu',
    TK: '19035107782019',
    soDu: ' 3,063,668',
    DC: 'Hà Nội'
  },
  {
    id: '2',
    name: 'Kiều Duy Lưu',
    TK: '19035107782019',
    soDu: ' 3,063,668',
    DC: 'Hà Nội'
  },
  {
    id: '3',
    name: 'Kiều Duy Lưu',
    TK: '19035107782019',
    soDu: ' 3,063,668',
    DC: 'Hà Nội'
  },
  {
    id: '4',
    name: 'Kiều Duy Lưu',
    TK: '19035107782019',
    soDu: ' 3,063,668',
    DC: 'Hà Nội'
  },

];

const Item = ({ TK, soDu, name, dc }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        marginTop: 15,
        marginHorizontal: 5
      }}>
      <View style={styles.item}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderTopColor: '#ccc',
          borderTopWidth: 1,
          marginBottom: 10,
          width: '100%',
          justifyContent: 'space-between'
        }}>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>
            Tên khách hàng:
          </Text>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
            {name}
          </Text>

        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.Title}>Tài khoản: </Text>

          <Text style={{ color: '#000', fontWeight: 'bold' }}> {TK}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.Title}>Số dư: </Text>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
            {soDu}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.Title}>Địa chỉ: </Text>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
            {dc}
          </Text>
        </View>
      </View>
    </TouchableOpacity >
  )
};

const Staff = ({ route, navigation }) => {
  const dispatch = useDispatch()

  const onLogout = async () => {
    dispatch(clearState())
  }
  const data = useSelector(store => store.product.dataInfoUser)
  console.log('data', data)
  const [mess, setMess] = useState(true);
  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log("fcmToken", fcmToken)
    const param = {
      fcm_token: fcmToken,
    }
    dispatch(insFCMYtokenAPI(param))
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getToken();
      console.log('Authorization status:', authStatus);
    }
  }


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('Thông báo!', JSON.stringify(remoteMessage?.data));
      setMess(!mess)
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(getInfoUserList())
  }, [mess])

  useEffect(() => {
    requestUserPermission();
  }, [])
  const renderItem = ({ item }) => (
    <Item
      TK={item.TK}

      soDu={item.soDu}

      name={item.name}
      dc={item.DC}
    />
  );
  const creditFundId = useSelector(store => store.auth.creditFundId)
  const onSearch = async (e) => {
    console.log("newww", e)
    dispatch(findInfoUserList(creditFundId, e))
  }

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View>
          <ImageBackground source={Images.backgroundhome} resizeMode="cover" style={{ height: 200, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 15,
            }}>
              Quỹ tín dụng Bắc Ninh
            </Text>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/icondangnhap/ducminh.jpg')}
            />

          </ImageBackground>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            padding: 20,
            borderRadius: 15,
            borderColor: '#024b04',
            zIndex: 2,
            top: -40,
            marginHorizontal: 15,
            backgroundColor: '#fff',
            elevation: 20,
            shadowColor: '#024b04',
            shadowOffset: {
              width: 6,
              height: 10
            },
            shadowRadius: 5,
            shadowOpacity: 1.0
          }}>
            <View>
              <Text
                style={{ color: '#024b04', fontWeight: 'bold', fontSize: 16 }}
                numberOfLines={1}>
                NV: {data.name}
              </Text>
              <Text style={{ color: '#024b04', fontWeight: 'bold', fontSize: 14 }}>
                ID: {data.accountNumber}
              </Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', padding: 10 }}
                onPress={onLogout} >
                <Icon name="sign-out" size={24} color="red" />
                <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'red', fontSize: 15 }}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: -20, backgroundColor: '#fff' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Danh sách khách hàng</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, borderColor: '#ccc', borderBottomWidth: 2 }}>
              <Icon name='search' size={24} color='#024b04' />
              <TextInput
                onChangeText={(e) => onSearch(e)}
                placeholder='Tìm kiếm khách hàng' />
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>


      <View style={{ marginHorizontal: 15, flex: 1, marginTop: 10, backgroundColor: '#fff' }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  child: { width, justifyContent: 'center' },
  text: { fontSize: width * 0.5, textAlign: 'center' },
  bottomItem: {
    width: width / 4.5,
    height: '100%',
  },
  titleBottom: {
    fontSize: 9,
    color: '#05610a',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerLogo: {
    width: 30,
    margin: 7,
    height: 30,
  },

  box: {
    flex: 1,
  },
  box1: {
    flex: 0.5,
    height: '25%',
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    justifyContent: 'space-evenly',
  },
  tinyLogo: {
    width: 70,
    margin: 10,
    height: 70,
    borderWidth: 1,
    borderColor: '#d6d6c9',
    backgroundColor: '#d6d6c9',
    borderRadius: 20 / 2,
  },
  box2: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '7%',
  },
  midlLogo: {
    width: 40,
    margin: 10,
    height: 40,
  },
  footer: {
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#c9c7c1',
    backgroundColor: '#FBFBF9',
  },
  end: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  footerLogo: {
    width: 30,
    margin: 10,
    height: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#05610a",
    paddingHorizontal: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center"
  }
});

export default Staff