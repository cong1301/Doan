import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import Images from '../assets';
import { useSelector, useDispatch } from "react-redux";
import { clearState, insFCMYtokenAPI } from '../store/AuthSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile'
import UserNameChange from './UserNameChange';
import { List, Switch } from 'antd-mobile'
import {
  UnorderedListOutline,
  PayCircleOutline,
  SetOutline,
} from 'antd-mobile-icons'


const StackSetting = createNativeStackNavigator();
export default function Setting({ route, navigation }) {
  const dispatch = useDispatch()
  const data = useSelector(store => store.product.dataInfoUser)
  const onLogout = async () => {
    dispatch(clearState())
  }

  const onProfile = () => {
    navigation.navigate('Profile');
  }


  const nameKH = `${data?.name}`.split(/[-]/);


  return (
    <StackSetting.Navigator>
      <StackSetting.Screen name="SettingMain" component={SettingMain} options={{ headerShown: false }} />
      <StackSetting.Screen name="Profile" component={Profile} options={{
        title: 'Thông tin cá nhân',
        headerStyle: {
          backgroundColor: '#024b04',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }} />
      <StackSetting.Screen name="UserNameChange" component={UserNameChange} options={{
        title: 'Đổi tài khoản đăng nhập',
        headerStyle: {
          backgroundColor: '#024b04',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }} />
    </StackSetting.Navigator>
  )

  function SettingMain() {
    return (
      <View>
        <View style={{ backgroundColor: '#024b04' }}>
          <View style={styles.containerr}>
            <View style={styles.header}>
              <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>VFUND</Text>
            </View>


            <View style={styles.infoUser}>
              {/* <View style={styles.itemIcon}> */}
              <Image style={styles.tinyLogo} source={Images.logo} />


              {/* </View> */}
              <View style={{ display: 'flex', justifyContent: 'flex-start', flex: 1 }}>
                {/* <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>{user.name}</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {nameKH[0]}
                  </Text>
                </View>
              </View>
            </View>

          </View>
        </View>

        <View style={{ display: 'flex', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', padding: 10 }}
            onPress={onLogout} >
            <Icon name="sign-out" size={24} color="red" />
            <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'red', fontSize: 15 }}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ color: '#858f99', fontWeight: 'bold' }}>
              TÀI KHOẢN
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('UserNameChange')} style={{
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#fff',
            borderRadius: 10
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="edit" size={24} color="#000" />
              <Text style={{ marginLeft: 10, fontWeight: '500', fontSize: 16, color: '#05610a' }}>
                Đổi tài khoản đăng nhập
              </Text>
            </View>
            <Icon name="angle-right" size={24} color="#05610a" />
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ color: '#858f99', fontWeight: 'bold' }}>
              HỖ TRỢ
            </Text>
          </View>
          <TouchableOpacity onPress={onProfile} style={{
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#fff',
            borderRadius: 10
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="user" size={24} color="#000" />
              <Text style={{ marginLeft: 10, fontWeight: '500', fontSize: 16, color: '#05610a' }}>
                Thông tin cá nhân
              </Text>
            </View>
            <Icon name="angle-right" size={24} color="#05610a" />
          </TouchableOpacity>

        </View>

        <View style={{ marginHorizontal: 20 }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ color: '#858f99', fontWeight: 'bold' }}>
              Cài đặt
            </Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openSettings()} style={{
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#fff',
            borderRadius: 10
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="gear" size={24} color="#000" />
              <Text
                style={{ width: 250, marginLeft: 10, fontWeight: '500', fontSize: 16, color: '#05610a' }}
                numberOfLines={2}
              >
                Cung cấp dữ liệu theo dõi cải thiện app
              </Text>
            </View>
            <Icon name="angle-right" size={24} color="#05610a" />
          </TouchableOpacity>
        </View>
      </View>
    )

  }

}

const styles = StyleSheet.create({
  containerr: {
    marginTop: '10%',
    height: 160,
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 10
  },
  infoUser: {
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  itemFeature: {
    flex: 1,
    marginHorizontal: 5,
  },
  iconFeature: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 2
  },
  textItemFeature: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#115d8e'
  },
  pageSlider: {
    width: '100%',
  },
  page: {
    alignItems: 'center',
    height: 128,
    justifyContent: 'center',
    padding: 16,
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
})
