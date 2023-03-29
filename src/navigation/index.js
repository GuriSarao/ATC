import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import AuthNavigator from './Auth'
import { Provider as PaperProvider } from 'react-native-paper'
import Bottomtabs from './Bottomtabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef, isReadyRef } from './RootNavigation'


const AppContainer = () => {
    const Stack = createNativeStackNavigator();
    const [defaultRoute, setDefaultRoute] = useState('')
    const [isChecked, setIsChecked] = useState(false)

    const processInitialAction = async () => {
        const token = await AsyncStorage.getItem('user_detail')
        const final = JSON.parse(token)
        if (!final) {
            setDefaultRoute('Auth')
        } else {
            setDefaultRoute('Bottomtabs')
        }
        setIsChecked(true)
    }

    useEffect(() => {
        processInitialAction()
        return () => {
            isReadyRef.current = false
        }
    }, [])

    if (!isChecked) return null


    return (
        <>
            <PaperProvider>
                <NavigationContainer
                    ref={navigationRef}
                    onReady={() => {
                        isReadyRef.current = true
                    }}
                >
                    <Stack.Navigator
                        screenOptions={{ headerShown: false }}
                        initialRouteName={defaultRoute}>
                        <Stack.Screen
                            name="Auth"
                            component={AuthNavigator}
                        />
                        <Stack.Screen
                            name="Bottomtabs"
                            component={Bottomtabs}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </>
    )
}

export default AppContainer
