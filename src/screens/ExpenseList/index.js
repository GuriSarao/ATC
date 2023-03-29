import { StyleSheet, Text, View, StatusBar, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { GRAY_MED_TEXT, LIGHT_GRAY_10, MAIN_BLUE, scaleSize, WHITE } from '../../theme'
import styles from './styles'
import { Appbar, } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { get_all_Companies, get_all_Drivers, get_all_Material, get_all_Stations, get_all_vehicles, get_Gr } from '../../redux/actions/users.actions';
import Loader from '../../components/Loader';



const ExpenseList = ({ navigation }) => {
    const isLoading = useSelector(state => state.users.isRequesting)
    const dispatch = useDispatch()

    useEffect(() => {
        Get_All_Details()
    }, [])

    const Get_All_Details = async () => {
        await Promise.all([
            dispatch(get_all_vehicles()),
            dispatch(get_all_Material()),
            dispatch(get_all_Companies()),
            dispatch(get_all_Drivers()),
            dispatch(get_all_Stations()),
            dispatch(get_Gr())
        ])
    }

    const ListData = [
        {
            id: 1, title: 'GR'
        },
        {
            id: 2, title: 'Empty Expense'
        },
        {
            id: 3, title: 'GR Based Expense'
        },
        {
            id: 4, title: 'Prize For Routes'
        },
        {
            id: 5, title: 'Petty Expense'
        },
        {
            id: 6, title: 'Vehicle Extra Expense'
        }
    ]

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.list} onPress={() => _SelectType(item)}>
                <Text style={styles.text}>{item.title}</Text>
                <MaterialIcons name='chevron-right' size={30} color={GRAY_MED_TEXT} />
            </TouchableOpacity>
        )
    }
    const _SelectType = (item) => {
        switch (item?.id) {
            case 1:
                navigation.navigate('Dashboard', item)
                break;
            case 2:
                navigation.navigate('ExpenseTypes', item)
                break;
            case 3:
                navigation.navigate('ExpenseTypes', item)
                break;
            case 4:
                navigation.navigate('ExpenseTypes', item)
                break;
            case 5:
                navigation.navigate('ExpenseTypes', item)
                break;
            case 6:
                navigation.navigate('ExpenseTypes', item)
                break;
            default:
                return
        }
    }

    return (
        <>
            <StatusBar backgroundColor={MAIN_BLUE} barStyle={'light-content'} />
            <SafeAreaView style={styles.safearea}   >
                <Loader isLoading={isLoading} />
                <Appbar.Header mode="center-aligned" style={{ backgroundColor: MAIN_BLUE }}>
                    <Appbar.Content title="Expense" color={WHITE} />
                </Appbar.Header>
                <View style={[styles.container]}>
                    <FlatList
                        data={ListData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
                        contentContainerStyle={styles.flatlistContainer}
                        ListHeaderComponent={() => <Text style={styles.header}>Select Expense Type</Text>}
                        ListHeaderComponentStyle={{ paddingBottom: scaleSize(30) }}
                    />
                </View>
            </SafeAreaView>
        </>

    )
}

export default ExpenseList

