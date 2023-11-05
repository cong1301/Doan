import { StyleSheet, Text, Pressable, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Images from '../assets';
import { clearState } from '../store/AuthSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ModalScreen(props) {

  const dispatch = useDispatch()
  const onLogoutmodal = async () => {
    dispatch(clearState())
  }

  return (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', }}>
                  <Image style={{ width: 50, height: 50, marginRight: 15 }} source={Images.logo} />
                  <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, }}>Thông Báo!</Text>
              </View>
              <View style={{ alignItems: 'center', }}>
                  <View style={{ flexDirection: 'row', paddingTop: 15, paddingRight: 15, paddingBottom: 15, alignItems: 'center' }}>
                      <MaterialCommunityIcons name="check-circle-outline" color="#63ba37" size={45}  />
                      <Text style={{ color: '#63ba37', fontWeight: 'bold', fontSize: 20, marginLeft: 10,}}>Đổi mật khẩu thành công</Text>
                  </View>
              </View>

              <View style={{ width: '100%', alignItems: 'flex-end', }}>
              <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={onLogoutmodal}
              >
                  <Text  style={styles.textStyle}>Đăng nhập lại</Text>
              </Pressable>
              </View>
          </View>
        </View>
        
  )
}

const styles = StyleSheet.create({
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
})