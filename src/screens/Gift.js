import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Images from '../assets';
// pham hung dung
const DATA = [
  {
    id: '1',
    image: Images.logo,
    title: 'Cần hỗ trợ quý khách vui lòng liên hệ: 096780280. Xin cảm ơn!',
    tenquy: 'Quỹ tín dụng',
    time: '19/05/2022 21:00',
  },
  // {
  //     id: '2',
  //     image:Images.logo,
  //     title: '[COVID200K] Ủng hộ Quỹ Vacxin Covid 2.000.000 VND',
  //     tenquy: 'Quỹ Bắc Ninh',
  //     time: '19/05/2022 21:00',
  // },
  // {
  //     id: '3',
  //     image:Images.logo,
  //     title: '[CHATS1500TV] Voucher mua hàng tại của hàng thời trang CHÂTS',
  //     tenquy: 'Quỹ Bắc Giang',
  //     time: '19/05/2022 21:00',
  // },
  // {
  //     id: '4',
  //     image: Images.logo,
  //     title: '[DDAA0010] 5.000.000 VND vào tài khoản thanh toán',
  //     tenquy: 'Quỹ Hà Nội',
  //     time: '19/05/2022 21:00',
  // },
  // {
  //     id: '5',
  //     image: Images.logo,
  //     title: '[COVID200K] Ủng hộ Quỹ Vacxin Covid 2.000.000 VND',
  //     tenquy: 'Quỹ Vĩnh Phúc',
  //     time: '19/05/2022 21:00',
  // },
  // {
  //     id: '6',
  //     image: Images.logo,
  //     title: '[CHATS1500TV] Voucher mua hàng tại của hàng thời trang CHÂTS',
  //     tenquy: 'Quỹ Hà Nội',
  //     time: '19/05/2022 21:00',
  // },
  // {
  //     id: '7',
  //     image: Images.logo,
  //     title: '[DDAA0010] 5.000.000 VND vào tài khoản thanh toán',
  //     tenquy: 'Quỹ Hà Nội',
  //     time: '19/05/2022 21:00',
  // },
  // {
  //     id: '8',
  //     image: Images.logo,
  //     title: '[COVID200K] Ủng hộ Quỹ Vacxin Covid 2.000.000 VND',
  //     tenquy: 'Quỹ Hà Nội',
  //     time: '19/05/2022 21:00',
  // },
  // {
  //     id: '9',
  //     image: Images.logo,
  //     title: '[CHATS1500TV] Voucher mua hàng tại của hàng thời trang CHÂTS',
  //     tenquy: 'Quỹ Bắc Giang',
  //     time: '19/05/2022 21:00',
  // },
];

const Item = ({image, title, tenquy, time}) => (
  <View
    style={{
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: 5,
    }}>
    <View style={styles.item}>
      <View style={styles.itemLogo}>
        <Image style={styles.userLogo} source={image} />
      </View>
      <View style={styles.text}>
        <Text style={styles.tenquy}>{tenquy}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  </View>
);

const Stack = createNativeStackNavigator();

export default function Gift() {
  const renderItem = ({item}) => (
    <Item
      title={item.title}
      image={item.image}
      tenquy={item.tenquy}
      time={item.time}
    />
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderBottomColor: '#c7c3c3',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
  itemLogo: {
    width: '20%',
  },
  userLogo: {
    width: 65,
    height: 65,
    borderRadius: 20 / 2,
  },
  text: {
    flexDirection: 'column',
    width: '80%',
    paddingLeft: '2%',
  },
  title: {
    fontSize: 14,
    // color: '#575454',
    color: '#000',
    paddingTop: 5,
  },
  tenquy: {
    color: '#024b04',
    fontWeight: 'bold',
    fontSize: 15,
  },
  time: {
    fontSize: 13,
    paddingTop: 5,
  },
});
