import {
    SafeAreaView, ScrollView,
    StyleSheet, Text, View,
    TouchableOpacity, StatusBar, FlatList, Alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { BLACK, LIGHT_GRAY_20, LIGHT_GRAY_60, MAIN_BLUE, scaleSize, TEXT_BLUE, WHITE } from '../../theme';
import { widthPercentageToDP } from 'react-native-responsive-screen';;
import { Appbar, Modal, Portal, Menu, Provider } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Input, Button as Btn } from '@rneui/base';
// import CustomDropDown from '../Dashboard/DropDown';
import moment from 'moment'
// import DatePicker from '../Dashboard/DatePicker';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';



const GR_Table = ({ navigation }) => {

    const [BodyWidth, setBodyWidth] = useState()
    const [Filtervisible, setFilterVisible] = useState(false);
    const [DropDownHeight, setDropDownHeight] = useState()
    const [Showlist, setShowlist] = useState(false)
    const [ShowItem, setShowItem] = useState(true)
    const [ShowMenu, setShowMenu] = useState(false)

    const [Typevalue, setTypeValue] = useState('');
    const [Typeitems, setTypeItems] = useState([
        { label: 'Azad Roadline', value: 'Azad Roadline' },
        { label: 'Azad Roadlink', value: 'Azad Roadlinl' },
    ])
    const [Status_Value, setStatus_Value] = useState('');
    const [Status_Items, setStatus_Items] = useState([
        { label: 'Open', value: 'Test name' },
        { label: 'Closed', value: 'Closed' },
        { label: 'Pending', value: 'Pending' },
    ]);

    const [Source_value, setSource_Value] = useState('');
    const [Source_items, setSource_Items] = useState([
        { label: 'Test Pvt Ltd', value: 'Test Pvt Ltd' },
        { label: 'Malt Pvt Ltd', value: 'Malt Pvt Ltd' },
        { label: 'Malt Pvt Ltd', value: 'Malt Pvt Ltd' },
        { label: 'Malt Pvt Ltd', value: 'Malt Pvt Ltd' },
    ]);

    const [Des_Value, setDes_Value] = useState('');
    const [Des_Items, setDes_Items] = useState([
        { label: 'Des Pvt Ltd', value: 'Des Pvt Ltd' },
        { label: 'Male Pvt Ltd', value: 'Male Pvt Ltd' },
        { label: 'Malr Pvt Ltd', value: 'Malr Pvt Ltd' },
        { label: 'Mals Pvt Ltd', value: 'Mals Pvt Ltd' },
        { label: 'Malt Pvt Ltd', value: 'Malt Pvt Ltd' },
    ]);

    const [Bill_Value, setBill_Value] = useState('');
    const [Bill_Items, setBill_Items] = useState([
        { label: 'Des Pvt Ltd', value: 'Des Pvt Ltd' },
        { label: 'Male Pvt Ltd', value: 'Male Pvt Ltd' },
        { label: 'Malr Pvt Ltd', value: 'Malr Pvt Ltd' },
        { label: 'Mals Pvt Ltd', value: 'Mals Pvt Ltd' },
        { label: 'Malt Pvt Ltd', value: 'Malt Pvt Ltd' },
    ]);

    const [Vehicle_value, setVehicle_Value] = useState('');
    const [Vehicle_items, setVehicle_Items] = useState([
        { label: 'CH22(T)-2126', value: 'CH22(T)-2126' },
        { label: 'CH23(T)-2233', value: 'CH23(T)-2233' },
    ]);

    const data = [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4, }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 },
        { id: 9 }, { id: 10, }, { id: 11 }, { id: 12, }, { id: 13, }, { id: 14, }, { id: 15 },
        { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }
    ]


    const _Menu = (index) => {
        setShowMenu(true)
    }

    const _Edit = () => {

    }

    // const renderItem = ({ item, index }) => {
    //     return (
    //         <>
    //             <View style={styles.List} key={item.id} >
    //                 <View style={styles.rightborder}>
    //                     <Text style={[styles.text, { paddingStart: 0 }]}>{'GR1016GJ12BW-9722'}</Text>
    //                 </View>
    //                 <View
    //                     style={styles.rightborder}>
    //                     <Text style={styles.text}>{'Mohali'}</Text>
    //                 </View>
    //                 <View
    //                     style={styles.rightborder}>
    //                     <Text style={styles.text} >{'LUDHIANA'}</Text>
    //                 </View>
    //                 <View style={styles.rightborder}>
    //                     <Text style={styles.text} >{'Abhishek pharma'}</Text>
    //                 </View>
    //                 <View style={styles.rightborder}>
    //                     <Text style={styles.text} >{'Abhishek pharma'}</Text>
    //                 </View>
    //                 <View style={styles.rightborder}>
    //                     <Text style={styles.text} >{'Abhishek pharma'}</Text>
    //                 </View>
    //                 <View style={styles.rightborder}>
    //                     <Text style={styles.text} >{'34000'}</Text>
    //                 </View>
    //                 <View style={styles.rightborder}>
    //                     <Text style={styles.text}>{'12-12-2022'}</Text>
    //                 </View>
    //                 <View style={styles.rightborder}>
    //                     <Text style={styles.text}>{'15-12-2022'}</Text>
    //                 </View>
    //                 <View style={styles.rightborder}>
    //                     <Text style={styles.text}>{'Open'}</Text>
    //                 </View>
    //                 <View style={{ alignSelf: 'center', flexDirection: 'row' }}
    //                     onLayout={(event) => {
    //                         let { width } = event.nativeEvent.layout;
    //                         setBodyWidth(width)
    //                     }} >
    //                     <TouchableOpacity style={[styles.drc, styles.edit]}
    //                         onPress={_Edit} >
    //                         <MaterialIcons
    //                             name='mode-edit'
    //                             size={16}
    //                             color={TEXT_BLUE}
    //                         />
    //                         <Text style={styles.edit_text}>Edit{' '}</Text>
    //                     </TouchableOpacity>
    //                     <TouchableOpacity style={styles.drc} >
    //                         <MaterialIcons
    //                             name='delete'
    //                             size={16}
    //                             color={TEXT_BLUE}
    //                         />
    //                         <Text style={styles.edit_text} >Delete</Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         </>
    //     )
    // }

    const renderList = ({ item, index }) => {
        return (
            <>
                <View style={[styles.List, { paddingHorizontal: 0, paddingVertical: 6 }]}>
                    <Text style={[styles.text, styles.label]}>{'Test Name'}</Text>
                    <View style={{ alignSelf: 'center', flexDirection: 'row' }} >
                        <TouchableOpacity style={styles.custombtn} >
                            <Text style={styles.btntext} >Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.custombtn} >
                            <Text style={styles.btntext} >Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.custombtn} >
                            <Text style={styles.btntext} >Approve</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }

    const showModal = () => setFilterVisible(true);
    const hideModal = () => setFilterVisible(false);

    const New_Date = moment().format('DD-MM-YYYY')

    const Init = [
        {
            id: 1,
            value: New_Date,
            visible: false,
        },
        {
            id: 2,
            value: New_Date,
            visible: false,
        },
        {
            id: 3,
            value: New_Date,
            visible: false,
        },
    ];
    const [Data, SetData] = useState(Init);

    // handles DateConfirmation
    const handleDateConfirm = (data, index) => {
        let temp = [...Data];
        temp[index].value = moment(data).format('DD-MM-YYYY');
        temp[index].visible = false;
        SetData(temp);
    };

    // Executed onCancel
    const onCancel = (index) => {
        let temp = [...Data];
        temp[index].visible = false;
        SetData(temp);
    };

    // Executed when user opens a modal
    const onOpen = (index) => {
        try {
            let temp = [...Data];
            temp[index].visible = true;
            SetData(temp);
        } catch (error) { }
    };

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
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: MAIN_BLUE }} />
            <SafeAreaView style={styles.safearea}>
                <StatusBar backgroundColor={MAIN_BLUE} barStyle={'light-content'} />
                <Appbar.Header mode="center-aligned" style={styles.header}>
                    <Appbar.Content title="GR List" color={WHITE} />
                    {/* {Showlist &&
                        <Appbar.Action icon="filter-menu"
                            color={WHITE}
                            onPress={() => showModal()} />} */}
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
                <View style={styles.container}>


                </View>
            </SafeAreaView >

            {/* <Portal>
                    <Modal visible={Filtervisible} onDismiss={hideModal}
                        contentContainerStyle={[styles.containerStyle, { maxHeight: hp('75') }]}>
                        <View style={styles.modal_header}>
                            <Text style={styles.model_text}>Filter</Text>
                            <MaterialIcons name='filter-list' size={29} color={BLACK} />
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Input
                                containerStyle={[styles.dropDown, { marginTop: scaleSize(23) }]}
                                inputContainerStyle={[styles.input]}
                                textStyle={{ fontSize: 17, }}
                                label={'GR Code'}
                                labelStyle={[styles.Input_label]}
                                placeholder={'GR Code'}
                            />
                            <View style={[styles.row, { zIndex: 0 }]}>
                                <TouchableOpacity style={[{ width: 150 }]}
                                    activeOpacity={0.6}
                                    onPress={() => onOpen(0)}
                                >
                                    <Input
                                        containerStyle={[styles.dropDown,]}
                                        inputContainerStyle={[styles.input]}
                                        textStyle={{ fontSize: 17, }}
                                        label={'Start Date'}
                                        labelStyle={[styles.Input_label]}
                                        value={Data[0]?.value}
                                        editable={false}
                                    />
                                </TouchableOpacity>
                                <DatePicker
                                    isDateVisible={Data[0]?.visible}
                                    mode={'date'}
                                    handleDateConfirm={(data) => handleDateConfirm(data, 0)}
                                    onCancel={() => onCancel(1)}
                                />
                                <TouchableOpacity
                                    style={{ width: 150 }}
                                    activeOpacity={0.6}
                                    onPress={() => onOpen(1)}
                                >
                                    <Input
                                        containerStyle={[styles.dropDown]}
                                        inputContainerStyle={[styles.input]}
                                        textStyle={{ fontSize: 17, }}
                                        label={'End Date'}
                                        labelStyle={[styles.Input_label]}
                                        value={Data[1]?.value}
                                        editable={false}
                                    />
                                </TouchableOpacity>
                                <DatePicker
                                    isDateVisible={Data[1]?.visible}
                                    mode={'date'}
                                    handleDateConfirm={(data) => handleDateConfirm(data, 1)}
                                    onCancel={() => onCancel(1)}
                                />
                            </View>
                            <Text style={[styles.DropDown_label]} >GR Bill Type</Text>
                            <CustomDropDown
                                value={Typevalue}
                                setValue={setTypeValue}
                                setItems={setTypeItems}
                                items={Typeitems}
                                placeholder={"Select GR Bill Type"}
                                onLayout={(event) => {
                                    let { height } = event.nativeEvent.layout;
                                    setDropDownHeight(height)
                                }}
                                zIndex={6000}
                                zIndexInverse={1000}
                            />
                            <Text style={[styles.DropDown_label, { marginTop: scaleSize(25) }]} >GR Status</Text>
                            <CustomDropDown
                                value={Status_Value}
                                items={Status_Items}
                                setValue={setStatus_Value}
                                setItems={setStatus_Items}
                                placeholder={"Select Status"}
                                zIndex={5000}
                                zIndexInverse={2000}
                            />
                            <Text style={[styles.DropDown_label, { marginTop: scaleSize(25) }]} >Source Station</Text>
                            <CustomDropDown
                                value={Source_value}
                                setValue={setSource_Value}
                                setItems={setSource_Items}
                                items={Source_items}
                                placeholder={"Select Source Station"}
                                zIndex={4000}
                                zIndexInverse={3000}
                            />

                            <Text style={[styles.DropDown_label, { marginTop: scaleSize(25) }]} >Destination Station</Text>
                            <CustomDropDown
                                value={Des_Value}
                                items={Des_Items}
                                setValue={setDes_Value}
                                setItems={setDes_Items}
                                placeholder={"Select Destination Station"}
                                zIndex={3000}
                                zIndexInverse={4000}
                            />
                            <Text style={[styles.DropDown_label, { marginTop: scaleSize(25) }]} >Select Bill Company</Text>
                            <CustomDropDown
                                value={Bill_Value}
                                items={Bill_Items}
                                setValue={setBill_Value}
                                setItems={setBill_Items}
                                placeholder={"Select Bill Company"}
                                zIndex={2000}
                                zIndexInverse={5000}
                                dropDownDirection={'TOP'}
                            />
                            <Text style={[styles.DropDown_label, { marginTop: scaleSize(25) }]} >Vehicle</Text>
                            <CustomDropDown
                                value={Vehicle_value}
                                setValue={setVehicle_Value}
                                setItems={setVehicle_Items}
                                items={Vehicle_items}
                                placeholder={"Select Vehicle"}
                                zIndex={1000}
                                zIndexInverse={6000}
                                dropDownDirection={'TOP'}
                            />
                            <View style={styles.row}>
                                <Button title={'Search'}
                                    style={styles.btn}
                                />
                                <Button title={'Reset'}
                                    style={styles.btn}
                                />
                            </View>

                        </ScrollView>
                    </Modal>
                </Portal> */}
            {/* <View style={styles.container}> */}
            {/* {ShowItem && <FlatList
                        data={[1, 2, 3, 4, 5]}
                        renderItem={(item, index) => renderList(item, index)}
                        keyExtractor={item => item?.id}
                        nestedScrollEnabled={true}
                        contentContainerStyle={{}}
                    />
                    } */}
            {/* {Showlist &&
                        <ScrollView horizontal={true} nestedScrollEnabled={true}>
                            <View>
                                <View style={styles.List}>
                                    <Text style={[styles.text, styles.label]} >{"GR Code"}</Text>
                                    <Text style={[styles.text, styles.label]} >{"Source St."}</Text>
                                    <Text style={[styles.text, styles.label]} >{"Destination St."}</Text>
                                    <Text style={[styles.text, styles.label]} >{"Source Company"}</Text>
                                    <Text style={[styles.text, styles.label]} >{"Destination Company"}</Text>
                                    <Text style={[styles.text, styles.label]} >{"Bill Company"}</Text>
                                    <Text style={[styles.text, styles.label]} >{"Qty (in Ltr.)"}</Text>
                                    <Text style={[styles.text, styles.label]} >{"Start Date"}</Text>
                                    <Text style={[styles.text, styles.label]} >{"End Date"}</Text>
                                    <Text style={[styles.text, styles.label]} >{"Status"}</Text>
                                    <Text style={[styles.text, { width: BodyWidth, borderRightWidth: 0 }, styles.label]} >{"Action"}</Text>
                                </View>
                                <FlatList
                                    data={data}
                                    renderItem={(item, index) => renderItem(item, index)}
                                    keyExtractor={item => item?.id}
                                    nestedScrollEnabled={true}
                                    contentContainerStyle={{}}
                                />
                            </View>
                        </ScrollView >
                    } */}
            {/* </View> */}

        </>
    )
}

export default GR_Table


const styles = StyleSheet.create({
    safearea: {
        backgroundColor: WHITE,
        flex: 1
    },
    container: {
        flex: 1,
        //padding: 12,
        backgroundColor: WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        backgroundColor: MAIN_BLUE,
    },
    border: {
        borderWidth: 1,
        borderColor: WHITE
    },
    text: {
        fontWeight: '500',
        paddingVertical: 15,
        paddingStart: 15,
        paddingEnd: 20,
        fontSize: 15,
        width: widthPercentageToDP("30%"),
        textAlign: 'center',
    },
    rightborder: {
        borderRightWidth: 0.7,
        borderRightColor: LIGHT_GRAY_60,
    }
    ,
    dataWrapper: {
        marginTop: -1
    },

    Filter: {
        fontSize: 20,
        color: BLACK,
        fontWeight: "600"
    },
    label: { color: BLACK, fontWeight: '600', borderRightWidth: 0 },
    DropDown_label: {
        color: BLACK,
        marginBottom: 10,
        fontWeight: '700',
        fontSize: 15,
        color: BLACK
    },
    Input_label: { color: BLACK, marginBottom: 10 },
    dropDown: {
        borderColor: LIGHT_GRAY_20,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    input: {
        borderWidth: 1,
        borderColor: LIGHT_GRAY_20,
        borderRadius: 6,
        paddingHorizontal: 10,
    },
    // DropDown_text: {

    // },
    List: {
        flexDirection: 'row',
        borderBottomWidth: 0.7,
        borderColor: LIGHT_GRAY_60,
        paddingHorizontal: 15,
    },
    drc: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 10
    },
    edit_text: {
        color: TEXT_BLUE,
        fontSize: 15,
    },
    edit: {
        borderRightWidth: 1,
        paddingRight: 7
    },
    containerStyle: {
        backgroundColor: WHITE,
        padding: 20,
        maxHeight: hp("50"),
        borderRadius: 10,
        marginHorizontal: 15,
    },
    modal_header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    model_text: {
        fontSize: 22,
        color: MAIN_BLUE,
        fontWeight: '500',
        marginRight: 7
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        width: wp('40%'),
        marginTop: 30
    },
    custombtn: {
        backgroundColor: MAIN_BLUE,
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 15
    },
    btntext: { color: WHITE, fontWeight: "500" }

});



