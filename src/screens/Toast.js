import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import Images from '../assets';

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'pink' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400'
            }}
        />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 17
            }}
            text2Style={{
                fontSize: 15
            }}
        />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, text2 }) => (
        <View style={{ width: '95%', backgroundColor: '#fff', borderRadius: 10, padding: 5, borderWidth: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 24, height: 24, marginRight: 15 }} source={Images.logo} />
                <Text style={{ fontSize: 14 }}>VFUN iPay</Text>
            </View>
            <View style={{ marginLeft: 10, marginTop: 8, paddingBottom: 10 }}>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{text1}</Text>
                <Text style={{ color: '#000', fontSize: 14 }}>{text2}</Text>
            </View>
        </View>
    )
};