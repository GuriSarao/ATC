import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BLACK, GRAY_LIGHT_TEXT, GRAY_MED_TEXT, GREEN, LIGHT_GRAY_10, MAIN_BLUE, MAIN_RED, MANROPE_FONT, scaleSize, TEXT_BLUE, WHITE } from '../../theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Modal, Portal, } from 'react-native-paper'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button } from 'react-native-paper';

const Component = ({ data }) => {
    const [visible, setVisible] = useState(false)


    const renderItem = ({ item }) => {

        // console.log(item, 'item ---=-')
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
                                    <Text style={styles.sub_text}>{item.type_of_expence}</Text>
                                </View>
                                <View style={styles.view}>
                                    <Text style={[styles.text, styles.title]} >GR</Text>
                                    <Text style={styles.sub_text}>{item.GRCode || "-"}</Text>
                                </View>
                                <View style={styles.view}>
                                    <Text style={[styles.text, styles.title]}>Payment Mode</Text>
                                    <Text style={styles.sub_text}>{item.payment_mode_title}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.text, styles.title]}>Card Number</Text>
                                    <Text style={styles.sub_text}>{item.card_number}</Text>
                                </View>
                            </View>
                            <View>
                                <View style={styles.view}>
                                    <Text style={[styles.text, styles.title]}>Vehicle</Text>
                                    <Text style={styles.sub_text}>{item?.registrationNumber}</Text>
                                </View>
                                <View style={styles.view}>
                                    <Text style={[styles.text, styles.title]}>Status</Text>
                                    <Text style={styles.sub_text}>{'Pending'}</Text>
                                </View>
                                <View style={styles.view}>
                                    <Text style={[styles.text, styles.title]}>Amount</Text>
                                    <Text style={styles.sub_text}>{Number(item?.amountPaid).toFixed(2)}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.text, styles.title]}>Paid On</Text>
                                    <Text style={styles.sub_text}>{item.paidOn}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.row, { marginTop: scaleSize(25) }]}>
                            <Button mode='contained' buttonColor={MAIN_BLUE}>
                                Edit
                            </Button>
                            <Button mode='contained' buttonColor={MAIN_RED} >
                                Delete
                            </Button>
                            <Button mode='contained' buttonColor={GREEN} >
                                Approve
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                <TouchableOpacity style={[styles.list]} activeOpacity={0.7}
                    onPress={showModal}  >
                    <Text style={styles.text}>{item?.registrationNumber}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name='edit' size={20} color={BLACK} style={styles.icon} />
                        <MaterialIcons name='delete' size={20} color={BLACK} style={styles.icon} />
                        <MaterialIcons name='check-box' size={20} color={BLACK} />
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <View style={styles.container}>
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