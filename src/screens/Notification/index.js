import { StyleSheet, Text, View, StatusBar, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GRAY_LIGHT_TEXT, GRAY_MED_TEXT, LIGHT_GRAY_10, LIGHT_GRAY_100, LIGHT_GRAY_20, LIGHT_GRAY_40, LIGHT_GRAY_50, LIGHT_GRAY_60, LIGHT_GRAY_77, MAIN_BLUE, scaleSize, WHITE } from '../../theme'
import styles from './styles'
import { Appbar, } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { GET_User_Noti } from '../../redux/actions/users.actions';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = () => {
    const { isRequesting } = useSelector((state) => state?.users)
    const [Noti, SetNoti] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        Get_Noti()
    }, [])

    const Get_Noti = async () => {
        const res = await AsyncStorage.getItem('user_detail')
        const user_Detail = JSON.parse(res)
        await dispatch(GET_User_Noti(user_Detail[0]?.id)).then((res) => {
            SetNoti(res?.payload?.data?.data)
        })
    }

    console.log(Noti, 'noti')

    const renderItem = ({ item }) => {
        return (
            <View style={styles.list}>
                <View style={styles.mid}>
                    <MaterialIcons name='notifications' size={20} color={GRAY_MED_TEXT} />
                    <View style={{ marginLeft: 10 }}>
                        <View style={styles.row}>
                            <Text style={[styles.text, { fontSize: 18 }]}>{item.registrationNumber}</Text>
                            <Text style={styles.text}>{item.created_on}</Text>
                        </View>
                        <Text style={[styles.text, { color: LIGHT_GRAY_60 }]}>{item.notification_message}</Text>
                    </View>

                </View>
            </View>
        )
    }
    return (
        <>
            <StatusBar backgroundColor={MAIN_BLUE} barStyle={'light-content'} />
            <SafeAreaView style={styles.safearea}   >
                <Loader isLoading={isRequesting} />
                <Appbar.Header mode="center-aligned" style={{ backgroundColor: MAIN_BLUE }}>
                    <Appbar.Content title="Notifications" color={WHITE} />
                </Appbar.Header>
                <View style={[styles.container]}>
                    <FlatList
                        data={Noti}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                        contentContainerStyle={styles.flatlistContainer}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default Notifications

