import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from "react-redux";
import LoginScreen from '../screens/Login'
import MainTap from '../screens/MainTap';
import Staff from '../screens/Staff'
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../screens/Toast';
import { clearState, insFCMYtokenAPI } from '../store/AuthSlice';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      console.log('data', remoteMessage)
      Toast.show({
        type: 'tomatoToast',
        text1: remoteMessage?.notification?.title,
        text2: remoteMessage?.notification?.body,
        visibilityTime: 5000,
      })
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      Toast.show({
        type: 'tomatoToast',
        text1: remoteMessage?.notification?.title,
        text2: remoteMessage?.notification?.body,
        visibilityTime: 5000,
      })
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          Toast.show({
            type: 'tomatoToast',
            text1: remoteMessage?.notification?.title,
            text2: remoteMessage?.notification?.body,
            visibilityTime: 5000,
          })
        }
      });
  }, []);


  const isSignedIn = useSelector(store => store.auth.token)
  const isUser = useSelector(store => store.auth.tokenEmploy)
  console.log('isUser', isUser)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTab">
        {isSignedIn ? (
          (isUser === 'FUND' || isUser === 'FUND_EMPLOYEE') ? (
            <Stack.Screen name="Staff" component={Staff} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="Main" component={MainTap} options={{ headerShown: false }} />
          )
        )
          : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              {/* <Stack.Screen name="Register" component={SettingScreen} options={{ headerShown: false }} /> */}
            </>
          )
        }
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;
