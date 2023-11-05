import {
  View, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, Image,
  Text, TouchableOpacity, SafeAreaView, FlatList, Button, Pressable,
} from 'react-native';

import Modal from "react-native-modal";
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from "react-redux";
import { signInApi } from '../store/AuthSlice'
import Images from '../assets';
import * as Animatable from 'react-native-animatable';


const Login = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [userName, setUsername] = useState("");
  const [passWord, setPassWord] = useState("");
  const [checkEye, setCheckEye] = useState(true);
  const [checkUser, setCheckUser] = useState(false)
  const [checkPass, setCheckPass] = useState(false)

  const onLogin = () => {
    if (userName === "") {
      setCheckUser(true)
    } else {
      if (passWord === "") {
        setCheckPass(true)
      } else {
        const param = {
          username: userName,
          password: passWord,
        }
        dispatch(signInApi(param))
      }
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <Modal
          isVisible={isModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', }}>
                <Image style={{ width: 50, height: 50, marginRight: 15, borderRadius: 10 }} source={Images.logo} />
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, }}>Thông Báo!</Text>
              </View>
              <View style={{ alignItems: 'center', }}>
                <Text style={{ color: '#000', paddingTop: 8, fontSize: 15, }}>Để lấy lại mật khẩu liên hệ tới Hotline:</Text>
                <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                  <Icon name="phone" color="#024b04" size={25} />
                  <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 23, marginLeft: 15, }}>19003536</Text>
                </View>
              </View>


              <View style={{ width: '100%', alignItems: 'flex-end', }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={toggleModal}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>


        <View style={styles.box1}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.headerLogo} source={Images.logo} />
          </View>

        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.box2}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                marginLeft: 15,
                marginRight: 15,
                borderColor: 'white',
                borderBottomColor: '#024b04',
              }}>

              <Icon name="account" color="#024b04" size={40} />
              <TextInput
                style={styles.input}
                placeholder="Tài Khoản Đăng Nhập"
                placeholderTextColor={'#948d8d'}
                keyboardType="default"
                inlineImageLeft="username"
                onChangeText={setUsername}
                value={userName}
              />
            </View>
            {checkUser ?
              <Animatable.View animation='fadeInLeft' duration={1000}>
                <Text style={{ color: 'red', fontSize: 12, marginLeft: 20 }}>Tài khoản không đúng</Text>

              </Animatable.View>
              :
              null
            }

            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                marginTop: 10,
                marginLeft: 15,
                marginRight: 15,
                borderColor: 'white',
                borderBottomColor: '#024b04',
                justifyContent: 'space-between',
              }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <Icon name="lock" color="#024b04" size={40} />

                <TextInput
                  secureTextEntry={checkEye}
                  style={styles.inputmk}
                  placeholder="Mật Khẩu Đăng Nhập"
                  placeholderTextColor={'#948d8d'}
                  keyboardType="default"
                  onChangeText={setPassWord}
                  value={passWord}
                />
              </View>
              <TouchableOpacity
                onPress={() => setCheckEye(!checkEye)}
              >
                {
                  checkEye ?
                    <Icon name="eye-off" color="#024b04" size={30} />
                    :
                    <Icon name="eye" color="#024b04" size={30} />

                }
              </TouchableOpacity>
            </View>
            {checkPass ?
              <Animatable.View animation='fadeInLeft' duration={1000}>
                <Text style={{ color: 'red', fontSize: 12, marginLeft: 20 }}>Mật khẩu không đúng</Text>

              </Animatable.View>
              :
              null
            }
            <View style={styles.logins}>
              <TouchableOpacity
                onPress={onLogin}
                style={styles.btnlogins}>
                <Text style={{ padding: 10, color: 'white', fontSize: 20 }}>
                  Đăng Nhập
                </Text>
              </TouchableOpacity>

            </View>
            <View style={styles.fixToText}>

              <TouchableOpacity onPress={toggleModal}  >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'white',
                    borderBottomColor: '#024b04',
                    marginRight: 2,
                  }}>
                  <Text style={{ marginTop: 25, color: '#024b04', fontSize: 16 }}>
                    Quên Mật Khẩu
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <View style={styles.laymas}>
                {/* <Icon name="shield-lock-outline" color="white" size={35} />
                <Text style={{ padding: 14, color: 'white', fontSize: 14 }}>
                  Lấy mã OTP
                </Text> */}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.box3}>

        </View>

      </View>

    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // marginTop: '10%',
    display: 'flex',
    // alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '92%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
  },

  headerLogo: {
    height: 200,
    width: 200,
    marginTop: '10%',
    borderRadius: 20
  },

  input: {
    height: 40,
    margin: 2,
    padding: 10,
  },
  inputmk: {
    height: 40,
    margin: 2,
    padding: 10,
  },
  tinyLogo: {
    width: 40,
    margin: 2,
    marginLeft: 2,
    height: 40,
  },
  logins: {
    backgroundColor: '#024b04',
    marginTop: 20,
    borderRadius: 50,
    marginLeft: 15,
    marginRight: 15,
  },
  btnlogins: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  laymas: {
    backgroundColor: '#024b04',
    marginTop: 30,
    borderRadius: 50,
    marginLeft: '30%',
    marginRight: '30%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  laymaLogo: {
    width: 30,
    margin: 8,
    marginLeft: 8,
    marginRight: 2,
    height: 30,
    borderRadius: 30 / 2,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  itemLogo: {
    borderColor: '#024b04',
    borderWidth: 1,

    borderRadius: 200 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },

  title: {
    paddingTop: 10,
    textAlign: 'center',
    color: '#024b04',
    width: 65,
    fontSize: 12,
  },
  box3: {
    marginTop: 60,
  }
});
export default Login