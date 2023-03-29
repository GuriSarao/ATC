
import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BLACK, MAIN_BLUE, scaleSize, TEXT_BLUE, WHITE } from '../../theme';
import styles from './styles';
import { Input, CheckBox, Icon } from '@rneui/themed';
import moment from 'moment'
import DatePicker from './DatePicker';
import { Appbar } from 'react-native-paper';
import Button from '../../components/Button';
import CustomDropDown from './DropDown';
import Snackbar from 'react-native-snackbar'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { GET_DES_STATION_BY_BILL, GET_SOURCE_STATION_BY_BILL, get_vehicle_detail, Save_GR } from '../../redux/actions/users.actions';
import { showMessage } from 'react-native-flash-message';



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

const Dashboard = ({ navigation, route }) => {
    const { vehicles_detail, Material_detail, Companies, Drivers, isRequesting, Stations, GR_Code } = useSelector(state => state?.users) || []
    const [Details, setDeatils] = useState({ Grcode: '', Qty: '', Distance: '', Notes: '', Qty_for_handling: '', total: '' })
    const dispatch = useDispatch()
    const [Typevalue, setTypeValue] = useState('');
    const [Typeitems, setTypeItems] = useState([
        { label: 'Azad Tankers', value: 'Azad Tankers' },
        { label: 'Azad Roadline', value: 'Azad Roadline' },
    ])

    const [Vehicle_value, setVehicle_Value] = useState('');
    const [Vehicle_items, setVehicle_Items] = useState([]);

    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    const [Bill_value, setBill_Value] = useState('');
    const [Bill_items, setBill_Items] = useState([]);

    const [Source_value, setSource_Value] = useState('');
    const [Source_items, setSource_Items] = useState([]);

    const [Des_value, setDes_Value] = useState('');
    const [Des_items, setDes_Items] = useState([]);

    const [Source_Station_value, setSource_Station_Value] = useState('');
    const [Source_Station_items, setSource_Station_Items] = useState([]);

    const [Des_Station_value, setDes_Station_Value] = useState('');
    const [Des_Station_items, setDes_Station_Items] = useState([]);

    const [Driver_Value, setDriver_Value] = useState('');
    const [Driver_Items, setDriver_Items] = useState([]);

    const [Status_Value, setStatus_Value] = useState('');
    const [Status_Items, setStatus_Items] = useState([
        { label: 'Open', value: '1' },
        { label: 'Closed', value: '3' },
    ]);

    useEffect(() => {
        All_Details()
    }, [vehicles_detail, Material_detail, Companies, Drivers, GR_Code])

    const All_Details = async () => {
        const Vehicle_List = await vehicles_detail?.map(item => ({
            value: item?.id,
            label: item?.registrationNumber
        }));
        setVehicle_Items(Vehicle_List)

        const Material_List = await Material_detail?.map(item => ({
            value: item?.id,
            label: item?.title
        }));
        setItems(Material_List)
        const Bill_List = await Companies?.map(item => ({
            value: item?.id,
            label: item?.title
        }));
        setSource_Items(Bill_List),
            setDes_Items(Bill_List)
        const Drivers_List = await Drivers?.map(item => ({
            value: item?.id,
            label: item?.name
        }));
        setDriver_Items(Drivers_List)
        setDeatils({ ...Details, Grcode: GR_Code?.grcode })
    }

    const [Buttonvalue, setButtonValue] = React.useState('0');
    const [checked, setChecked] = React.useState(false);
    const [BodyHeight, setBodyHeight] = useState()
    const [DropDownHeight, setDropDownHeight] = useState()
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

    const showFlashMessage = (message, type) => {
        showMessage({
            message: message || "Something went wrong",
            type: 'default',
            // icon: type || "warning",

        });
    }

    const on_select_vehicle = (item) => {
        dispatch(get_vehicle_detail(item?.value)).then(
            (res) => {
                setDeatils({
                    ...Details, Qty: res?.payload?.data?.data?.capacity,
                    Qty_for_handling: res?.payload?.data?.data?.capacity
                })
            }
        )
    }

    const on_select_Source_Com = (item) => {
        setBill_Items([item])
    }

    const on_select_Des_Com = (item) => {
        const matched_value = Bill_items?.find((i) => i.value === item?.value)
        if (matched_value) return (showFlashMessage('you have already select same company. please select different company'))
        setBill_Items([...Bill_items, item])
    }

    const on_select_Bill_Com = async (item) => {
        dispatch(GET_SOURCE_STATION_BY_BILL(item?.value)).then(
            async (res) => {
                const Stations_List = await res?.payload?.data?.data?.map(item => ({
                    value: item?.id,
                    label: item?.title
                }));
                setSource_Station_Items(Stations_List)
            })
        dispatch(GET_DES_STATION_BY_BILL(item?.value)).then(
            async (res) => {
                const Stations_List = await res?.payload?.data?.data?.map(item => ({
                    value: item?.id,
                    label: item?.title
                }));
                setDes_Station_Items(Stations_List)
            })
    }

    const _Save = () => {
        const data = {
            // Typevalue,
            GRCode: Details?.Grcode?.toString() || "1",
            startDate: Data[0]?.value,
            endDate: Data[1]?.value,
            expectedEndDate: Data[2]?.value,
            quantity: Details.Qty || "1",
            vehicleId: Vehicle_value,
            materialTypeId: value,
            billCompanyId: Bill_value,
            sourceCompanyId: Source_value,
            destinationCompanyId: Des_value,
            sourceStationID: Source_Station_value,
            destinationStationId: Des_Station_value,
            quantityforhandling: Details.Qty_for_handling || "1",
            total: '1',
            is_special_rate: '0',
            distance: Details.Distance || "0",
            employeeId: Driver_Value,
            status: Status_Value || "1",
            notes: Details.Notes,
        }
        if (!Vehicle_value) {
            Snackbar.show({
                text: 'Please Select Vehicle',
            });
            return
        }
        if (!value) {
            Snackbar.show({
                text: 'Please Select Material Type',
            });
            return
        }
        if (!Source_value) {
            Snackbar.show({
                text: 'Please Select Source Company',
            });
            return
        }
        if (!Des_value) {
            Snackbar.show({
                text: 'Please Select Destination Company',
            });
            return
        }
        if (!Bill_value) {
            Snackbar.show({
                text: 'Please Select Bill Company',
            });
            return
        }
        if (!Source_Station_value) {
            Snackbar.show({
                text: 'Please Select Source Staion',
            });
            return
        }
        if (!Des_Station_value) {
            Snackbar.show({
                text: 'Please Select Destination Staion',
            });
            return
        }
        // if (!Details.Distance) {
        //     Snackbar.show({
        //         text: 'Please Enter Distance',
        //     });
        //     return
        // }
        if (!Driver_Value) {
            Snackbar.show({
                text: 'Please Select Driver',
            });
            return
        }
        // if (!Status_Value) {
        //     Snackbar.show({
        //         text: 'Please Select Status',
        //     });
        //     return
        // }
        // if (!Details.total) {
        //     Snackbar.show({
        //         text: 'Please Enter Total',
        //     });
        //     return
        // }

        dispatch(Save_GR(data)).then((res) => {
            showFlashMessage(res.message),
                navigation.navigate('GRBasedExpense', Vehicle_value)
            // console.log(res, 'res')
        })

    }


    return (
        <>
            <StatusBar backgroundColor={MAIN_BLUE} barStyle={'light-content'} />
            <SafeAreaView style={{ flex: 0, backgroundColor: MAIN_BLUE }} />
            <SafeAreaView style={styles.safearea}   >
                <Loader isLoading={isRequesting} />
                <Appbar.Header mode="center-aligned" style={{ backgroundColor: MAIN_BLUE }}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} color={WHITE} size={25} />
                    <Appbar.Content title="Add GR" color={WHITE} />
                </Appbar.Header>
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    enableOnAndroid={true}
                    extraScrollHeight={30}
                    extraHeight={30}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                >
                    <View style={[styles.container]}>
                        <Text style={[styles.label, styles.text]} >GR Bill Type</Text>
                        <CustomDropDown
                            value={Typevalue}
                            setValue={setTypeValue}
                            setItems={setTypeItems}
                            items={Typeitems}
                            placeholder={"Select Bill Type"}
                            onLayout={(event) => {
                                let { height } = event.nativeEvent.layout;
                                setDropDownHeight(height)
                            }}
                            zIndex={8000}
                        />
                        <Input
                            containerStyle={[styles.dropDown, { marginTop: scaleSize(23) }]}
                            inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                            textStyle={{ fontSize: 17, }}
                            label={'GR Code'}
                            labelStyle={[styles.label]}
                            placeholder={'Enter GR Code'}
                            defaultValue={Details.Grcode?.toString()}
                            onChangeText={(t) => setDeatils({ ...Details, Grcode: t })}
                        />
                        <View style={[styles.row, { zIndex: 0 }]}>
                            <TouchableOpacity style={[{ width: 150 }]}
                                activeOpacity={0.6}
                                onPress={() => onOpen(0)}
                            >
                                <Input
                                    containerStyle={[styles.dropDown,]}
                                    inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                                    textStyle={{ fontSize: 17, }}
                                    label={'Start Date'}
                                    labelStyle={styles.label}
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
                                    inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                                    textStyle={{ fontSize: 17, }}
                                    label={'End Date'}
                                    labelStyle={styles.label}
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
                        <View style={styles.row} >
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => onOpen(2)}
                                style={{ flex: 1 }}
                            >
                                <Input
                                    containerStyle={[styles.dropDown]}
                                    inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                                    textStyle={{ fontSize: 17, }}
                                    label={'Expected Date'}
                                    labelStyle={styles.label}
                                    value={Data[2]?.value}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            <DatePicker
                                isDateVisible={Data[2]?.visible}
                                mode={'date'}
                                handleDateConfirm={(data) => handleDateConfirm(data, 2)}
                                onCancel={() => onCancel(1)}
                            />
                        </View>
                        <Text style={[styles.label, styles.text]} >Material Type </Text>
                        <CustomDropDown
                            value={value}
                            setValue={setValue}
                            setItems={setItems}
                            items={items}
                            placeholder={"Select Type"}
                            zIndex={9000}
                            zIndexInverse={1000}
                        />

                        <Text style={[styles.label, styles.text, { marginTop: scaleSize(25) }]} >Vehicle</Text>
                        <CustomDropDown
                            value={Vehicle_value}
                            setValue={setVehicle_Value}
                            setItems={setVehicle_Items}
                            items={Vehicle_items}
                            placeholder={"Select Vehicle"}
                            zIndex={8000}
                            zIndexInverse={2000}
                            onSelectItem={on_select_vehicle}
                        />
                        <Input
                            containerStyle={[styles.dropDown, { marginTop: scaleSize(25) }]}
                            inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                            textStyle={{ fontSize: 17, }}
                            label={'Quantity (in liters)'}
                            labelStyle={styles.label}
                            placeholder={"0"}
                            defaultValue={Details.Qty}
                            onChangeText={(t) => setDeatils({ ...Details, Qty: t })}
                        />
                        <Input
                            containerStyle={[styles.dropDown]}
                            inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                            textStyle={{ fontSize: 17, }}
                            label={'Quantity for handling (in liters)'}
                            labelStyle={[styles.label]}
                            placeholder={'0'}
                            defaultValue={Details.Qty_for_handling}
                            onChangeText={(t) => setDeatils({ ...Details, quantityforhandling: t })}
                        />

                        <Text style={[styles.label, styles.text,]} >Source Company</Text>
                        <CustomDropDown
                            value={Source_value}
                            setValue={setSource_Value}
                            setItems={setSource_Items}
                            items={Source_items}
                            placeholder={"Select Source Company"}
                            zIndex={7000}
                            zIndexInverse={3000}
                            onSelectItem={on_select_Source_Com}
                        />

                        <Text style={[styles.label, styles.text, { marginTop: scaleSize(25) }]} >Destination Company</Text>
                        <CustomDropDown
                            value={Des_value}
                            setValue={setDes_Value}
                            setItems={setDes_Items}
                            items={Des_items}
                            placeholder={"Select Destination Company"}
                            zIndex={6000}
                            zIndexInverse={4000}
                            onSelectItem={on_select_Des_Com}
                        />

                        <Text style={[styles.label, styles.text, { marginTop: scaleSize(25) }]} >Bill Company</Text>
                        <CustomDropDown
                            value={Bill_value}
                            setValue={setBill_Value}
                            setItems={setBill_Items}
                            items={Bill_items}
                            placeholder={"Select Bill Company"}
                            zIndex={5000}
                            zIndexInverse={5000}
                            onSelectItem={on_select_Bill_Com}
                        />

                        <Text style={[styles.label, styles.text, { marginTop: scaleSize(25) }]} >Source Station</Text>
                        <CustomDropDown
                            value={Source_Station_value}
                            setValue={setSource_Station_Value}
                            setItems={setSource_Station_Items}
                            items={Source_Station_items}
                            placeholder={"Select Source Station"}
                            zIndex={4000}
                            zIndexInverse={6000}
                        />
                        <Text style={[styles.label, styles.text, { marginTop: scaleSize(25) }]} >Destination Station</Text>
                        <CustomDropDown
                            value={Des_Station_value}
                            setValue={setDes_Station_Value}
                            setItems={setDes_Station_Items}
                            items={Des_Station_items}
                            placeholder={"Select Destination Station"}
                            zIndex={3000}
                            zIndexInverse={7000}
                        />

                        <Input
                            containerStyle={[styles.dropDown, { marginTop: scaleSize(25) }]}
                            inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                            textStyle={{ fontSize: 17, }}
                            label={'Distance (in KM)'}
                            labelStyle={styles.label}
                            keyboardType='numeric'
                            placeholder='0'
                            defaultValue='0'
                            onChangeText={(t) => setDeatils({ ...Details, Distance: t })}
                        />

                        <Text style={[styles.label, styles.text]} >Driver</Text>
                        <CustomDropDown
                            value={Driver_Value}
                            items={Driver_Items}
                            setValue={setDriver_Value}
                            setItems={setDriver_Items}
                            placeholder={"Select Driver"}
                            zIndex={2000}
                            zIndexInverse={8000}
                        />

                        <Text style={[styles.label, styles.text, { marginTop: scaleSize(25) }]} >GR Status</Text>
                        <CustomDropDown
                            value={Status_Value}
                            items={Status_Items}
                            setValue={setStatus_Value}
                            setItems={setStatus_Items}
                            placeholder={"Select Status"}
                            zIndex={1000}
                            zIndexInverse={9000}
                        />

                        <View style={{ marginTop: scaleSize(25) }}>
                            <Input
                                containerStyle={[styles.dropDown]}
                                inputContainerStyle={[styles.input, { height: 100, flex: 1 }]}
                                textStyle={{ fontSize: 17, }}
                                label={'Notes'}
                                labelStyle={styles.label}
                                multiline={true}
                                textAlignVertical='top'
                                placeholder='Write notes here..'
                                numberOfLines={10}
                                onChangeText={(t) => setDeatils({ ...Details, Notes: t })}
                            />
                        </View>
                        {/* <View>
                            <Text style={[styles.text, { color: BLACK }]}>Is Special Rates</Text>
                            <View style={styles.btnView}>
                                <CheckBox
                                    title="Yes"
                                    checkedIcon={Buttonvalue == '1' ? "dot-circle-o" : "circle-o"}
                                    checked={Buttonvalue}
                                    onPress={() => setButtonValue('1')}
                                    checkedColor={MAIN_BLUE}
                                    textStyle={{ color: BLACK }}
                                />
                                <CheckBox
                                    title="No"
                                    checkedIcon={Buttonvalue == '0' ? "dot-circle-o" : "circle-o"}
                                    checked={Buttonvalue}
                                    onPress={() => setButtonValue('0')}
                                    checkedColor={MAIN_BLUE}
                                    textStyle={{ color: BLACK }}
                                />
                            </View>
                        </View> */}
                        {/* <View style={{ marginTop: 5 }}>
                            <View style={styles.btnView}>
                                <CheckBox
                                    center
                                    checked={checked}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                    checkedColor={MAIN_BLUE}
                                    title="Goa TP (in Rs.)"
                                    textStyle={{ color: BLACK }}
                                />
                            </View>
                            <Input
                                containerStyle={[styles.dropDown, { height: BodyHeight, marginTop: 6 }]}
                                inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                                textStyle={{ fontSize: 17, }}
                                placeholder={'0.00'}

                            />
                        </View> */}
                        {/* <View>
                            <Input
                                containerStyle={[styles.dropDownm, { marginTop: scaleSize(10) }]}
                                inputContainerStyle={[styles.input, { height: 50 }]}
                                textStyle={{ fontSize: 17, }}
                                label={'Total (in Rs.)'}
                                labelStyle={styles.label}
                                keyboardType='numeric'
                                placeholder='0'
                                onChangeText={(t) => setDeatils({ ...Details, total: t })}
                            />
                        </View> */}
                        {/* <View style={[styles.row]}>
                            <Input
                                containerStyle={[styles.dropDown, { width: 150, }]}
                                inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                                textStyle={{ fontSize: 17, }}
                                label={'Driver Owner Share (in Rs.)'}
                                labelStyle={styles.label}
                                keyboardType={'numeric'}
                                placeholder={'0.00'}
                            />
                            <Input
                                containerStyle={[styles.dropDown, { width: 150 }]}
                                inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                                textStyle={{ fontSize: 17, }}
                                label={'Vehicle Owner Share (in Rs.)'}
                                labelStyle={styles.label}
                                keyboardType={'numeric'}
                                placeholder={'0.00'}
                            />
                        </View> */}
                        {/* <View style={[styles.row]}>
                            <Input
                                containerStyle={[styles.dropDown, { width: 150, }]}
                                inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                                textStyle={{ fontSize: 17, }}
                                label={'Azad Com Share (in Rs.)'}
                                labelStyle={styles.label}
                                keyboardType={'numeric'}
                                placeholder={'0.00'}
                            />
                            <Input
                                containerStyle={[styles.dropDown, { width: 150 }]}
                                inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                                textStyle={{ fontSize: 17, }}
                                label={'Extra Loading Charges (in Rs.)'}
                                labelStyle={styles.label}
                                keyboardType={'numeric'}
                                placeholder={'0.00'}
                            />
                        </View> */}
                        {/* <View>
                            <Input
                                containerStyle={[styles.dropDown]}
                                inputContainerStyle={[styles.input, { height: DropDownHeight }]}
                                textStyle={{ fontSize: 17, }}
                                label={'Less (in Rs.)'}
                                labelStyle={styles.label}
                                keyboardType='numeric'
                                placeholder='0'
                            />
                        </View>  */}
                        <Button
                            title={'Save'}
                            style={styles.btn}
                            onPress={_Save}
                        />
                    </View>
                </KeyboardAwareScrollView>

            </SafeAreaView>
        </>
    )
}

export default Dashboard