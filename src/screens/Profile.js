import { StyleSheet, Image, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text, View } from 'react-native'
import Images from '../assets';
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-native-modal";
import ModalScreen from "./ModalScreen"


export default function Profile({ route, navigation }) {

    const data = useSelector(store => store.product.dataInfoUser)
    const [updateModalVisible, setupdateModalVisible] = useState(false);

    const handleSave = () => {
        changeModalVisible(true)
    }


    const changeModalVisible = (e) => {
        setupdateModalVisible(e)
    }

    let nameKH = `${data?.name}`.split(/[-]/);


    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={styles.container}>
                <Modal
                    isVisible={updateModalVisible}
                    nRequestClose={() => changeModalVisible(false)}
                >
                    <ModalScreen
                        changeModalVisible={changeModalVisible}
                    />
                </Modal>

                <View style={styles.avatars} >
                    <Image
                        style={{
                            borderWidth: 1,
                            borderColor: '#024b04',
                            padding: 10,
                            borderRadius: 100,
                            backgroundColor: '#fff',
                            width: 90,
                            height: 90,
                            alignItems: 'center',
                        }}
                        source={Images.logo}
                    />
                </View>


                <View style={styles.info}>
                    <View
                        style={styles.infoView} >
                        <View style={styles.input}>
                            <Text style={{ color: '#5e6163', paddingBottom: 5, }}>Họ và tên</Text>
                            <TextInput
                                placeholder="Họ và tên"
                                placeholderTextColor={'#948d8d'}
                            >
                                <Text>{nameKH[0]}</Text>
                            </TextInput>
                        </View>


                        <View style={styles.input}>
                            <Text style={{ color: '#5e6163', paddingBottom: 5, }}>Số điện thoại</Text>
                            <TextInput
                                placeholder="Số điện thoại"
                                placeholderTextColor={'#948d8d'}
                            >
                                <Text>{`${data?.phone}`}</Text>
                            </TextInput>
                        </View>

                        <View style={styles.input}>
                            <Text style={{ color: '#5e6163', paddingBottom: 5, }}>Mã khách hàng</Text>
                            <TextInput
                                placeholder="Nhập địa mã khách hàng"
                                placeholderTextColor={'#948d8d'}
                            >
                                <Text>{`${data?.code}`}</Text>
                            </TextInput>
                        </View>

                        <View style={styles.input}>
                            <Text style={{ color: '#5e6163', paddingBottom: 5, }}>Địa chỉ</Text>
                            <TextInput
                                placeholder="Nhập địa địa chỉ"
                                placeholderTextColor={'#948d8d'}
                            >
                                <Text>{`${data?.address}`}</Text>
                            </TextInput>
                        </View>

                    </View>
                </View>

            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    avatars: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    info: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderColor: '#024b04',
    },
    infoView: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 15,

    },
    input: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#fff',
        borderBottomColor: '#024b04',
        marginBottom: 15,
        paddingBottom: 5,
    },
    buttons: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#024b04',
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#024b04',
        borderRadius: 50,
    },
})