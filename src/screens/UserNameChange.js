
import React, { useEffect, useState } from 'react'

import {
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Text,
    View,
    Image,
    Pressable,
    SafeAreaView
} from 'react-native'
import Images from '../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { updateListUser } from '../store/HomeSlice'
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-native-modal";
import ModalScreen from "./ModalScreen"


export default function PassWordChange({ route, navigation }) {

    const [userName, setUserName] = useState('');
    const [checkEye1, setCheckEye1] = useState(true);
    const [checkEye2, setCheckEye2] = useState(true);
    const [passWordNew, setPassWordNew] = useState('');
    const [checkPass, setCheckPass] = useState(false);
    const [checkUser, setCheckUser] = useState(false);
    const [rePassWordNew, setRePassWordNew] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    // const check = useSelector(store => store.product.check)
    // console.log("check", check)

    const handleSave = () => {
        if (userName === '') {
            setCheckUser(true)
        } else if (passWordNew != rePassWordNew) {
            setCheckPass(true)
        } else {
            setCheckPass(false)
            const param = {
                username: userName,
                password: passWordNew,
            }
            dispatch(updateListUser(param))
        }
    }

    // useEffect(() => {
    //     if (check !== false) {
    //         setModalVisible(true)
    //     } else {
    //         setModalVisible(false)
    //     }
    // }, [check]);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            {/* <Modal
                isVisible={updateModalVisible}
                nRequestClose={() => changeModalVisible(false)}
            >
                <ModalScreen
                    changeModalVisible={changeModalVisible}
                />
            </Modal> */}

            <Modal
                isVisible={isModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', }}>
                            <Image style={{ width: 50, height: 50, marginRight: 15 }} source={Images.logo} />
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, }}>Thông Báo!</Text>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 15, alignItems: 'center' }}>
                                <Icon name="alert" color="#f26f04" size={42} />
                                <Text style={{ color: '#f26f04', fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}>Bạn đã đổi tài khoản</Text>
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

            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.info}>
                        <Image source={Images.logo} style={{ height: 130, width: 130, borderRadius: 20 }} />
                        <View
                            style={styles.scrollView} >
                            <View style={styles.inputchange}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập tài khoản đăng nhập mới"
                                    placeholderTextColor={'#948d8d'}
                                    onChangeText={setUserName}
                                    value={userName}

                                />
                            </View>
                            {checkUser ?
                                <Animatable.View animation='fadeInLeft' duration={1000}>
                                    <Text style={{ color: 'red', fontSize: 12, marginLeft: 20 }}>Bạn cần nhập tài khoản</Text>
                                </Animatable.View>
                                :
                                null
                            }
                            <View style={styles.inputmk}>
                                <TextInput
                                    secureTextEntry={checkEye1}
                                    style={styles.input}
                                    placeholder="Nhập mật khẩu mới"
                                    placeholderTextColor={'#948d8d'}
                                    onChangeText={(e) => setPassWordNew(e)}
                                    value={passWordNew}
                                />
                                <TouchableOpacity
                                    onPress={() => setCheckEye1(!checkEye1)}
                                >
                                    {
                                        checkEye1 ?
                                            <Icon name="eye-off" color="#024b04" size={30} />
                                            :
                                            <Icon name="eye" color="#024b04" size={30} />

                                    }
                                </TouchableOpacity>
                            </View>
                            {checkUser ?
                                <Animatable.View animation='fadeInLeft' duration={1000}>
                                    <Text style={{ color: 'red', fontSize: 12, marginLeft: 20 }}>Bạn cần nhập mật khẩu</Text>
                                </Animatable.View>
                                :
                                null
                            }
                            <View style={styles.inputmk}>
                                <TextInput
                                    secureTextEntry={checkEye2}
                                    style={styles.input}
                                    placeholder="Nhập lại mật khẩu mới"
                                    placeholderTextColor={'#948d8d'}
                                    onChangeText={(e) => setRePassWordNew(e)}
                                    value={rePassWordNew}
                                />
                                <TouchableOpacity
                                    onPress={() => setCheckEye2(!checkEye2)}
                                >
                                    {
                                        checkEye2 ?
                                            <Icon name="eye-off" color="#024b04" size={30} />
                                            :
                                            <Icon name="eye" color="#024b04" size={30} />

                                    }
                                </TouchableOpacity>
                            </View>
                            {checkPass ?
                                <Animatable.View animation='fadeInLeft' duration={1000}>
                                    <Text style={{ color: 'red', fontSize: 12, marginLeft: 20 }}>Mật khẩu không trùng khớp</Text>
                                </Animatable.View>
                                :
                                null
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity style={styles.buttons}
                    onPress={handleSave}
                >
                    <Text style={{ fontSize: 20, color: '#fff' }} >Lưu lại</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',

    },
    avatars: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    info: {
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    scrollView: {
        width: '100%'
    },
    inputchange: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: '#ccc', 
        borderWidth: 1,
        borderColor: '#024b04',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    inputmk: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#024b04',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        flex: 1,
        padding: 15,
    },
    buttons: {
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        padding: 15,
        backgroundColor: '#024b04',
        borderRadius: 50,
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
})