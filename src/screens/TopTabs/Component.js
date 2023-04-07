import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BLACK, GRAY_LIGHT_TEXT, GRAY_MED_TEXT, GREEN, LIGHT_GRAY_10, MAIN_BLUE, MAIN_RED, MANROPE_FONT, scaleSize, TEXT_BLUE, WHITE } from '../../theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Modal, Portal, } from 'react-native-paper'
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { Approve_Expense, Delete_Expense, get_all_Stations, get_all_vehicles, GET_EXPENSE_DETAIL_BY_EXPENSE_ID, } from '../../redux/actions/users.actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../components/Loader'
import Snackbar from 'react-native-snackbar';

const Component = ({ data, navigation, Get_Expense }) => {
    const { isRequesting } = useSelector((state) => state?.users)
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [Selected, SetSelected] = useState()

    // console.log(data, 'array')


    const do_delete = (item) => {
        Alert.alert(
            'Alert!',
            'Are you sure, You want to Delete Expense?',
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        _Delete_Expense(item)
                    }
                }
            ]
        )
    }

    const _Delete_Expense = async (item) => {
        const res = await AsyncStorage.getItem('user_detail')
        const user_Detail = JSON.parse(res)
        const data = { user_id: user_Detail[0]?.id, expense_id: item?.id }
        await dispatch(Delete_Expense(data)).then((res) => {
            Snackbar.show({
                text: res.message,
            });
            hideModal(),
                Get_Expense()
        })
    }

    const do_approve = (item) => {
        Alert.alert(
            'Alert!',
            'Are you sure, You want to Approve Expense?',
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        _approve_Expense(item)
                    }
                }
            ]
        )

    }

    const _approve_Expense = async (item) => {
        const res = await AsyncStorage.getItem('user_detail')
        const user_Detail = JSON.parse(res)
        const data = { user_id: user_Detail[0]?.id, expense_id: item?.id, expense_status: '2' }
        await dispatch(Approve_Expense(data)).then(async (res) => {
            Snackbar.show({
                text: res.message,
            });
            hideModal(),
                Get_Expense()
        })
    }

    const do_edit = async (item) => {
        hideModal(),
            dispatch(get_all_vehicles()),
            dispatch(get_all_Stations()),
            navigation.navigate('Edit_Expense', item);
    }

    const renderItem = ({ item }) => {
        return (
            <>
                <TouchableOpacity style={[styles.list]} activeOpacity={0.7}
                    onPress={() => showModal(item)}  >
                    <Text style={styles.text}>{item?.registrationNumber}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name='edit' size={20} color={BLACK} style={styles.icon}
                            onPress={() => do_edit(item)} />
                        <MaterialIcons name='delete' size={20} color={BLACK} style={styles.icon}
                            onPress={() => do_delete(item)} />
                        <MaterialIcons name='check-box' size={20} color={BLACK}
                            onPress={() => do_approve(item)} />
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    const showModal = (item) => {
        setVisible(true),
            SetSelected(item)
    }
    const hideModal = () => setVisible(false);

    const CustomModal = () => {
        // console.log(Selected?.status, 'selected')

        function Type_of_expense() {
            return Selected?.type_of_expence === '1' ? "GR Based"
                : Selected?.type_of_expence === '2' ? 'Petty Expence'
                    : Selected?.type_of_expence === '3' ? 'Empty Expence'
                        : Selected?.type_of_expence === '4' ? 'Prize For Routes'
                            : Selected?.type_of_expence === '5' ? 'Vehicle Extra Expense'
                                : null;
        }

        function _Status() {
            return !Selected?.status ? "Incomplete"
                : Selected?.status === '0' ? 'Incomplete'
                    : Selected?.status === '1' ? 'Open'
                        : Selected?.status === '2' ? 'Closed'
                            : null
        }

        return (
            <>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal}
                        contentContainerStyle={[styles.containerStyle]}>
                        <TouchableOpacity style={styles.close} onPress={hideModal}>
                            <MaterialIcons name='close' size={20} />
                        </TouchableOpacity>

                        <View style={styles.row}>
                            <View>
                                <View style={styles.view}>
                                    <Text style={[styles.text, styles.title]} >Type</Text>
                                    <Text style={styles.sub_text}>{Type_of_expense()}</Text>
                                </View>
                                <View style={styles.view}>
                                    <Text style={[styles.text, styles.title]} >GR</Text>
                                    <Text style={styles.sub_text}>{Selected?.GRCode || "-"}</Text>
                                </View>
                                <View style={styles.view}>
                                    <Text style={[styles.text, styles.title]}>Payment Mode</Text>
                                    <Text style={styles.sub_text}>{Selected?.payment_mode_title}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.text, styles.title]}>Card Number</Text>
                                    <Text style={styles.sub_text}>{Selected?.card_number}</Text>
                                </View>
                            </View>
                            <View>
                                <View style={styles.view}>
                                    <Text style={[styles.text, styles.title]}>Vehicle</Text>
                                    <Text style={styles.sub_text}>{Selected?.registrationNumber}</Text>
                                </View>
                                <View style={styles.view}>
                                    <Text style={[styles.text, styles.title]}>Status</Text>
                                    <Text style={styles.sub_text}>{_Status()}</Text>
                                </View>
                                <View style={styles.view}>
                                    <Text style={[styles.text, styles.title]}>Amount</Text>
                                    <Text style={styles.sub_text}>{Number(Selected?.amountPaid).toFixed(2)}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.text, styles.title]}>Paid On</Text>
                                    <Text style={styles.sub_text}>{Selected?.paidOn}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.row, { marginTop: scaleSize(25) }]}>
                            <Button mode='contained' buttonColor={MAIN_BLUE}
                                onPress={() => do_edit(Selected)}>
                                Edit
                            </Button>
                            <Button mode='contained' buttonColor={MAIN_RED}
                                onPress={() => do_delete(Selected)}  >
                                Delete
                            </Button>
                            <Button mode='contained' buttonColor={GREEN}
                                onPress={() => do_approve(Selected)}>
                                Approve
                            </Button>
                        </View>
                    </Modal>
                </Portal>
            </>
        )
    }

    return (
        <View style={styles.container}>
            {/* <Loader isLoading={isRequesting} /> */}
            <CustomModal />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                contentContainerStyle={styles.content_container}
            />

        </View>
    )
}

export default Component

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    list: {
        backgroundColor: LIGHT_GRAY_10,
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: BLACK,
        fontSize: 18,
        fontWeight: '600',
    },
    content_container: {
        paddingVertical: 20,
        paddingHorizontal: 25
    },
    icon: {
        marginRight: 20
    },
    containerStyle: {
        backgroundColor: WHITE,
        borderRadius: 8,
        marginHorizontal: 20,
        alignItems: 'center',
        paddingVertical: 30
    },
    view: {
        paddingBottom: 10
    },
    title: {
        fontWeight: '500'
    },
    sub_text: {
        color: GRAY_MED_TEXT,
        fontSize: 16,
        paddingTop: 8

    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '80%'
    },
    close: {
        position: 'absolute', top: 10, right: 10
    }

})