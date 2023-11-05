import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import Images from '../assets';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSelector, useDispatch } from "react-redux";
import { getInfoUserList } from '../store/HomeSlice'
import { clearState, insFCMYtokenAPI } from '../store/AuthSlice';
import messaging from '@react-native-firebase/messaging';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../screens/Toast';
import ListMoney from './ListMoney'
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-tracking-transparency';

const width = Dimensions.get('window').width;

const StackHome = createNativeStackNavigator();
const Home = ({ route, navigation }) => {
  const data = useSelector(store => store.product.dataInfoUser)
  const dispatch = useDispatch()
  const [mess, setMess] = useState({ tk: '', sd: '' });

  useEffect(() => {
    setTimeout(async () => {
      if (Platform.OS === 'ios') {
        const trackingStatus = await getTrackingStatus();
        if (trackingStatus == 'not-determined') {
          try {
            await requestTrackingPermission();
          } catch (e) {
            Alert.alert('Error', e?.toString?.() ?? e);
          }
        }
      }
    }, 1000);
  }, []);

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
      // console.log('Authorization status:', authStatus);
    }
  }

  const onListMoney = () => {
    navigation.navigate('ListMoney');
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setMess({ tk: remoteMessage?.notification?.body, sd: remoteMessage?.notification?.title })
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(getInfoUserList())
  }, [mess])

  useEffect(() => {
    requestUserPermission();
  }, [])

  const onLogout = async () => {
    dispatch(clearState())
  }

  const nameKH = `${data?.name}`.split(/[-]/);

  return (
    <StackHome.Navigator>
      <StackHome.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} />
      <StackHome.Screen name="ListMoney" component={ListMoney} options={{ headerShown: false }} />
    </StackHome.Navigator>
  )

  function HomeMain() {

    return (

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}>

        <View style={styles.box}>
          <View style={styles.box1}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 250,
              marginTop: -20,
              backgroundColor: '#024b04',
            }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 16,
                }}>
                {`${data?.creditFundName}`}
              </Text>
              <Image style={styles.tinyLogo} source={Images.logo} />
            </View>

            <TouchableOpacity onPress={onListMoney} style={styles.infoView}>
              <View style={{ marginRight: 5, }}>
                <Text
                  style={styles.text18}
                  keyboardType='numeric'
                  numberOfLines={1}>
                  Tên khách hàng: {nameKH[0]}
                </Text>
                <Text style={styles.text18}>
                  {`Mã KH: ${data?.code}`}
                </Text>
                <Text style={styles.text18}>
                  {`Số điện thoại: ${data?.phone === null ? 'Chưa có thông tin' : data?.phone}`}
                </Text>
                <Text style={styles.text18}>
                  {`Số sổ gửi: ${data?.depositsLength}`}
                </Text>
                <Text style={styles.text18}>
                  {`Số sổ vay: ${data?.loanLength}`}

                </Text>
              </View>
              <Icon name="chevron-right" size={25} color="#024b04" />
            </TouchableOpacity>

          </View>

          <View style={styles.box2}>
            <View style={styles.support}>

              <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={Images.logo} />
              <View style={{ marginLeft: 10, }}>
                <Text style={styles.text18}>{nameKH[0]}</Text>
                <Text style={{ color: '#000', fontSize: 14, }}>Tài chính cá nhân</Text>
              </View>
            </View>
          </View>
        </View>


        <View style={styles.containerr}>
          <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={2} showPagination>
            <View style={[styles.child]}>
              <Image style={styles.slidechild} source={require('../assets/anhbanner/13-11-20-BannerEventWeb.jpg')} />
            </View>
            <View style={[styles.child,]}>
              <Image style={styles.slidechild} source={require('../assets/anhbanner/qua-tang-tet-600x337.png')} />

            </View>
            <View style={[styles.child,]}>
              <Image style={styles.slidechild} source={require('../assets/anhbanner/qua-tang-suc-khoe-dip-tet-nguyen-dan-tan-suu-2021.jpg')} />

            </View>
            <View style={[styles.child,]}>
              <Image style={styles.slidechild} source={require('../assets/anhbanner/qua-tang-tet-600x337.png')} />

            </View>
          </SwiperFlatList>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#cbe3c1'
  },
  containerr: { height: 150, marginTop: 20, },
  child: { width, justifyContent: 'center' },
  slidechild: { width: '100%', height: null, aspectRatio: 1192 / 434 },
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
    justifyContent: 'space-evenly',
  },
  infoView: {
    borderWidth: 1,
    padding: 20,
    margin: 15,
    borderRadius: 15,
    borderColor: '#024b04',
    zIndex: 5, marginTop: -60,
    backgroundColor: '#fff',
    elevation: 20,
    shadowColor: '#024b04',
    shadowOffset: {
      width: 3,
      height: 5
    },
    shadowRadius: 5,
    shadowOpacity: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text18: {
    color: '#024b04',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text16: {
    color: '#024b04',
    fontWeight: 'bold',
    fontSize: 14,
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
    margin: 20,
  },
  support: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listac: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fff',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default Home
