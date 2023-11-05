import * as React from 'react';
import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Home';
import Gift from './Gift';
import History from './History';
import Setting from './Setting';



const Tab = createBottomTabNavigator();

function MainTap() {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'History') {
                        iconName = 'history';
                    }
                    else if (route.name === 'Gift') {
                        iconName = 'bell';
                    }
                    else if (route.name === 'Setting') {
                        iconName = 'user';
                    }
                   
                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#05610a',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false, }} />
            <Tab.Screen name="History" component={History} options={{ headerShown: false }} />
            <Tab.Screen name="Gift" component={Gift} options={{ 
                title: 'Thông báo',
                headerStyle: {
                  backgroundColor: '#024b04',
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',

            }} />
            <Tab.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default MainTap;