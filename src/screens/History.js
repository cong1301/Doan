import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    FlatList,
    ImageBackground,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Images from '../assets';
const DATA = [
    {
        id: '1',
        soTK: '19035107782019',
        soTienGD: -148300,
        soDu: ' 3,063,668',
        ND: 'GD THE QUA POS SO THE 422149...5057 NGAY 30/01/2022 TAI 4129_VINMART HA NOI VN',
        TG: '30/01 12:40',
    },
    {
        id: '2',
        soTK: '19035107782019',
        soTienGD: +203,
        soDu: '3,211,968',
        ND: 'Tra lai tien gui',
        TG: '30/01 11:35',
    },
    {
        id: '3',
        soTK: '19035107782019',
        soTienGD: +203,
        soDu: ' 3,211,968',
        ND: 'Tra lai tien gui',
        TG: '29/01 22:20',
    },
    {
        id: '4',
        soTK: '19035107782019',
        soTienGD: +203,
        soDu: ' 3,211,968',
        ND: 'Tra lai tien gui',
        TG: '30/01 12:40',
    },
    {
        id: '5',
        soTK: '19035107782019',
        soTienGD: +203,
        soDu: ' 3,211,968',
        ND: 'Tra lai tien gui',
        TG: '30/01 12:40',
    },
    {
        id: '6',
        soTK: '19035107782019',
        soTienGD: +203,
        soDu: ' 3,211,968',
        ND: 'Tra lai tien gui',
        TG: '30/01 12:40',
    },
    {
        id: '7',
        soTK: '19035107782019',
        soTienGD: +203,
        soDu: ' 3,211,968',
        ND: 'Tra lai tien gui',
        TG: '30/01 12:40',
    },
    {
        id: '8',
        soTK: '19035107782019',
        soTienGD: +203,
        soDu: ' 3,211,968',
        ND: 'Tra lai tien gui',
        TG: '30/01 12:40',
    },
    {
        id: '9',
        soTK: '19035107782019',
        soTienGD: +203,
        soDu: ' 3,211,968',
        ND: 'Tra lai tien gui',
        TG: '30/01 12:40',
    },
];

const Item = ({ soTK, soTienGD, soDu, ND, TG }) => {
    const clGD = soTienGD > 0 ? 'green' : 'red'
    return (
        <View
            style={{
                flex: 1,

            }}>
            <View style={styles.item}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    marginBottom: 10,
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        <Image source={Images.logo} style={{ width: 30, height: 30, borderRadius: 5 }} />
                        <Text style={styles.TG}>{TG}</Text>
                    </View>
                    <IconM name='dots-vertical' color='#05610a' size={22} />
                </View>
                <Text style={styles.Title}>TK: {soTK}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.Title}>So tien GD: </Text>
                    {soTienGD > 0 ?
                        <Text style={{ color: clGD, fontWeight: 'bold' }}>
                            +{soTienGD}
                        </Text>
                        :
                        <Text style={{ color: clGD, fontWeight: 'bold' }}>
                            {soTienGD}
                        </Text>
                    }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.Title}>So du: </Text>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>
                        {soDu}
                    </Text>
                </View>
                {/* <Text style={styles.Title}>So du: {soDu}</Text> */}
                <Text style={styles.Title}>ND: {ND}</Text>
            </View>
        </View >
    )
};

const Stack = createNativeStackNavigator();

export default function History() {


    const renderItem = ({ item }) => (
        <Item
            soTK={item.soTK}
            soTienGD={item.soTienGD}
            soDu={item.soDu}
            ND={item.ND}
            TG={item.TG}
        />
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={styles.timkiem}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        alignItems: 'center',
                        justifyContent: 'space-between',

                    }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e4c1c' }}>
                            Biến động số dư
                        </Text>
                        <IconM name="chart-areaspline" color="#024b04" size={25} />
                    </View>
                </View>
                <ImageBackground
                    source={Images.backgroundhtr} resizeMode="cover" style={styles.image}
                >
                    <FlatList
                        data={DATA}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    timkiem: {
        borderWidth: 1,
        borderBottomColor: '#969695',
        borderColor: 'white',
        backgroundColor: '#fff',
    },
    flatlistcontainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: '15%',
    },
    item: {
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fff',
        borderRadius: 25 / 2,
        margin: 10,
        paddingHorizontal: 15,
        paddingVertical: 10
    },

    TG: {
        marginLeft: 10,
        color: '#000',
        fontSize: 12,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    Title: {
        fontSize: 15,
        color: '#000'
    }
});