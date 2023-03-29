import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Dashboard from './Dashboard'




const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()

    return (
        <>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
            </Stack.Navigator>
        </>
    )
}

export default AuthNavigator
