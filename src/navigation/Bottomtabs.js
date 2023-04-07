import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GR_Table from '../screens/GRTable';
import Notifications from '../screens/Notification';
import { LIGHT_GRAY_80, MAIN_BLUE } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DashboardStack from './Dashboard';
import TopTabs from '../screens/TopTabs';
import HomeStack from './HomeStack';

const Bottomtabs = () => {
    const Tab = createBottomTabNavigator();

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarActiveTintColor: MAIN_BLUE,
                    tabBarInactiveTintColor: LIGHT_GRAY_80,
                    tabBarLabelStyle: { fontSize: 13, fontWeight: '500' },

                }}>
                <Tab.Screen name="Home"
                    component={HomeStack}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name='home' color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Expense"
                    component={DashboardStack}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name='add-circle' color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notifications"
                    component={Notifications}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons name='notifications' color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

export default Bottomtabs

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

