import { StyleSheet, Text, View, SafeAreaView, Alert, StatusBar } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BLACK, GRAY_LIGHT_TEXT, MAIN_BLUE, WHITE } from '../../theme';
import Component from './Component';
import { Appbar, Menu } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from 'react-redux';
import { GET_EXPENSE_DETAIL } from '../../redux/actions/users.actions';
import Loader from '../../components/Loader';
import { useIsFocused } from '@react-navigation/native';


const TopTabs = ({ navigation }) => {
    const dispatch = useDispatch()
    const { isRequesting } = useSelector((state) => state?.users)
    const Tab = createMaterialTopTabNavigator();
    const isFocused = useIsFocused();
    const [ShowMenu, setShowMenu] = useState(false)
    const [Happay, setHappay] = useState()
    const [Bpc, setBpc] = useState()
    const [Fastag, setFastag] = useState()
    // const [Main_data, setMain_data] = useState([])


    useEffect(() => {
        Get_Expense()
    }, [])

    // useEffect(()=>{
    //     console.log(Main_data, 'main data')
    // },[Main_data])

    // useEffect(() => {
    //     // console.log(Happay, Bpc, Fastag, 'state data')
    // }, [Happay, Bpc, Fastag])



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            Get_Expense()
        });
        return unsubscribe;
    }, [navigation]);


    const Get_Expense = async () => {
        const res = await AsyncStorage.getItem('user_detail')
        const user_Detail = JSON.parse(res)
        await dispatch(GET_EXPENSE_DETAIL(user_Detail[0]?.id)).then(async i => {
            //  setMain_data(i.payload.data.data)
            const happay = await i.payload.data.data.filter(i => {
                return i.payment_mode_title === 'Happay'
            })
            setHappay(happay)
            const Bpc = await i.payload.data.data.filter(i => {
                return i.payment_mode_title === 'BPC'
            })
            setBpc(Bpc)

            const Fastag = await i.payload.data.data.filter(i => {
                return i.payment_mode_title === 'FASTAG TOLL'
            })
            setFastag(Fastag)
        })
    }

    const _Menu = (index) => {
        setShowMenu(true)
    }

    const doLogout = () => {

        Alert.alert(
            'Alert!',
            'Are you sure, You want to logout?',
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        AsyncStorage.clear(),
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Auth' }],
                            })
                    }
                }
            ]
        )
    }

    return (
        < >
            <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }} >
                <StatusBar backgroundColor={MAIN_BLUE} barStyle={'light-content'} />
                <Loader isLoading={isRequesting} />
                <Appbar.Header mode="center-aligned" style={styles.header}>
                    <Appbar.Content title="GR List" color={WHITE} />
                    <Appbar.Action icon={"dots-vertical"}
                        onPress={_Menu}
                        color={WHITE} />
                    <Menu
                        visible={ShowMenu}
                        onDismiss={() => setShowMenu(false)}
                        anchor={{ x: wp(100), y: 50 }}
                        contentStyle={{ backgroundColor: WHITE }}
                    >
                        <Menu.Item onPress={() => { doLogout(), setShowMenu(false) }} title="Logout" />
                    </Menu>
                </Appbar.Header>
                <View style={styles.container} >
                    {
                        <Tab.Navigator
                            screenOptions={{
                                tabBarLabelStyle: { fontSize: 18, fontWeight: '500' },
                                tabBarStyle: { backgroundColor: MAIN_BLUE },
                                tabBarIndicatorStyle: { backgroundColor: WHITE },
                                tabBarPressOpacity: 2.0,
                                tabBarActiveTintColor: WHITE,
                                tabBarInactiveTintColor: WHITE,
                            }}
                        >
                            <Tab.Screen
                                name="HAPPAY"
                                options={{
                                    tabBarLabel: 'HAPPAY',
                                }}
                            >
                                {props => <Component {...props} data={Happay} Get_Expense={Get_Expense} />}
                            </Tab.Screen>
                            <Tab.Screen
                                name="BPC"
                                options={{
                                    tabBarLabel: 'BPC',

                                }}
                            >
                                {props => <Component {...props} data={Bpc} Get_Expense={Get_Expense} />}
                            </Tab.Screen>
                            <Tab.Screen
                                name="FASTAG TOLL"
                                options={{
                                    tabBarLabel: 'FASTAG TOLL',
                                }}
                            >
                                {props => <Component {...props} data={Fastag} Get_Expense={Get_Expense} />}
                            </Tab.Screen>
                        </Tab.Navigator>
                    }
                </View>
            </SafeAreaView>
        </>
    )
}

export default TopTabs

const styles = StyleSheet.create({
    header: {
        backgroundColor: MAIN_BLUE,
    },
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },

})