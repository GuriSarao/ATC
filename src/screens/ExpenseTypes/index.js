import React, { useRef, useState, useEffect } from 'react'
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MAIN_BLUE, scaleSize, WHITE } from '../../theme';
import styles from './styles'
import { Appbar } from 'react-native-paper';
import CustomDropDown from '../Dashboard/DropDown';
import { Input } from '@rneui/themed';
import DatePicker from '../Dashboard/DatePicker';
import moment from 'moment'
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Save_Empty_Expense, Save_GR_Based, Save_Petty_Expense, Save_Prize_for_routes, Save_Vehicle_Expense } from '../../redux/actions/users.actions';
import { showMessage } from 'react-native-flash-message';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';


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
    }]

const ExpenseTypes = ({ navigation, route }) => {
    const item = route?.params
    const dispatch = useDispatch()
    const { vehicles_detail, Companies, isRequesting, Stations } = useSelector(state => state?.users) || []
    const [Details, setDeatils] = useState({ Amount: '', CardNum: '', Notes: '', GR: '' })

    const [Vehicle_value, setVehicle_Value] = useState('');
    const [Vehicle_items, setVehicle_Items] = useState([]);

    const [Source_value, setSource_Value] = useState('');
    const [Source_items, setSource_Items] = useState([]);

    const [Des_value, setDes_Value] = useState('');
    const [Des_items, setDes_Items] = useState([]);

    const [Payment_value, setPayment_Value] = useState('');
    const [Payment_items, setPayment_Items] = useState([
        { label: 'BPC', value: '3' },
        { label: 'FASTAG TOLL', value: '5' },
        { label: 'HAPPAY', value: '2' },
    ]);
    const New_Date = moment().format('DD-MM-YYYY')
    const [PaidOn_Visible, setPaidOn_Visible] = useState(false);
    const [PaidOnValue, setPaidOnValue] = useState(New_Date);
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

    useEffect(() => {
        All_Details()
    }, [vehicles_detail, Stations])


    const All_Details = async () => {
        const Vehicle_List = await vehicles_detail?.map(item => ({
            value: item?.id,
            label: item?.registrationNumber
        }));
        setVehicle_Items(Vehicle_List)
        const Bill_List = await Stations?.map(item => ({
            value: item?.id,
            label: item?.title
        }));
        setSource_Items(Bill_List),
            setDes_Items(Bill_List)
    }

    // console.log(Vehicle_value, Source_value,
    //     Des_value, Details.Amount, Details.CardNum, Payment_value, PaidOnValue.toString(), Details.Notes)

    const showFlashMessage = (message, type) => {
        showMessage({
            message: message || "Something went wrong",
            type: 'default',
            // icon: type || "warning",

        });
    }

    const _Save = async () => {
        const res = await AsyncStorage.getItem('user_detail')
        const user_Detail = JSON.parse(res)
        const data = {
            user_id: user_Detail[0]?.id,
            vehicle_id: Vehicle_value,
            source_station_id: Source_value,
            destination_station_id: Des_value,
            amountPaid: Details.Amount,
            payment_mode_id: Payment_value,
            card_number: Details.CardNum,
            paidOn: PaidOnValue.toString(),
            notes: Details.Notes,
        }
        const GR_Based_data = {
            user_id: user_Detail[0]?.id,
            vehicle_id: Vehicle_value,
            grid: Details.GR,
            amountPaid: Details.Amount,
            payment_mode_id: Payment_value,
            card_number: Details.CardNum,
            paidOn: PaidOnValue.toString(),
            notes: Details.Notes,
        }
        const Petty_Data = {
            ...data,
            expence_from_date: Data[0]?.value,
            expence_to_date: Data[1]?.value
        }
        const Vehicle_Data = {
            user_id: user_Detail[0]?.id,
            vehicle_id: Vehicle_value,
            amountPaid: Details.Amount,
            payment_mode_id: Payment_value,
            card_number: Details.CardNum,
            paidOn: PaidOnValue.toString(),
            notes: Details.Notes,
        }

        if (!Vehicle_value) {
            showFlashMessage('Please Select Vehicle')
            return
        }
        if (item.title === 'Empty Expense') {
            return (Empty_Expense(data))
        }
        if (item.title === 'GR Based Expense')
            return (GR_Based(GR_Based_data))

        if (item.title === 'Prize For Routes')
            return (Price_Based(GR_Based_data))

        if (item.title === 'Petty Expense')
            return (Petty_Expense(Petty_Data))

        if (item.title === 'Vehicle Extra Expense')
            return (Vehicle_Expense(Vehicle_Data))
    }

    const Empty_Expense = (data) => {
        dispatch(Save_Empty_Expense(data)).then((res) => {
            console.log(res, 'res empty expense')
            showFlashMessage(res.message)
            navigation.dispatch(StackActions.popToTop());
        })
    }

    const GR_Based = (data) => {
        return (
            dispatch(Save_GR_Based(data)).then((res) => {
                console.log(res, 'res gr based')
                showFlashMessage(res.message)
                navigation.dispatch(StackActions.popToTop());
            })
        )
    }

    const Price_Based = (data) => {
        return (
            dispatch(Save_Prize_for_routes(data)).then((res) => {
                console.log(res, 'res price based')
                showFlashMessage(res.message)
                navigation.dispatch(StackActions.popToTop());
            })
        )
    }

    const Petty_Expense = (data) => {
        return (
            dispatch(Save_Petty_Expense(data)).then((res) => {
                console.log(res, 'res petty based')
                showFlashMessage(res.message)
                navigation.dispatch(StackActions.popToTop());
            })
        )
    }

    const Vehicle_Expense = (data) => {
        return (
            dispatch(Save_Vehicle_Expense(data)).then((res) => {
                console.log(res, 'res Vehicle based')
                showFlashMessage(res.message)
                navigation.dispatch(StackActions.popToTop());
            })
        )
    }

    return (
        <>
            <StatusBar backgroundColor={MAIN_BLUE} barStyle={'light-content'} />
            <SafeAreaView style={{ flex: 0, backgroundColor: MAIN_BLUE }} />
            <SafeAreaView style={styles.safearea}   >
                <Loader isLoading={isRequesting} />
                <Appbar.Header mode="center-aligned" style={{ backgroundColor: MAIN_BLUE }}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} color={WHITE} size={25} />
                    <Appbar.Content title={item?.title} color={WHITE} />
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
                        <Text style={[styles.label, styles.text]} >Vehicle</Text>
                        <CustomDropDown
                            value={Vehicle_value}
                            setValue={setVehicle_Value}
                            setItems={setVehicle_Items}
                            items={Vehicle_items}
                            placeholder={"Select Vehicle"}
                            zIndex={4000}
                            zIndexInverse={1000}
                        />
                        {item.title === 'Petty Expense' &&
                            <View style={[styles.row, { marginTop: scaleSize(23) }]}>
                                <TouchableOpacity style={[{ width: 150 }]}
                                    activeOpacity={0.6}
                                    onPress={() => onOpen(0)}
                                >
                                    <Input
                                        containerStyle={[styles.dropDown,]}
                                        inputContainerStyle={[styles.input, { height: 50 }]}
                                        textStyle={{ fontSize: 17, }}
                                        label={'From Date'}
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
                                        inputContainerStyle={[styles.input, { height: 50 }]}
                                        textStyle={{ fontSize: 17, }}
                                        label={'To Date'}
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
                        }
                        {item.title === 'Vehicle Extra Expense' ? null :
                            item.title === 'GR Based Expense' || item.title === 'Prize For Routes' ?
                                <Input
                                    containerStyle={[styles.dropDown, { marginTop: scaleSize(23) }]}
                                    inputContainerStyle={[styles.input, { height: 50 }]}
                                    textStyle={{ fontSize: 17, }}
                                    label={'GR'}
                                    labelStyle={[styles.label]}
                                    placeholder={'Enter GR'}
                                    onChangeText={(t) => setDeatils({ ...Details, GR: t })}
                                />
                                :
                                <>
                                    <Text style={[styles.label, styles.text, { marginTop: item.title === 'Petty Expense' ? 0 : scaleSize(23) }]} >Source Station</Text>
                                    <CustomDropDown
                                        value={Source_value}
                                        setValue={setSource_Value}
                                        setItems={setSource_Items}
                                        items={Source_items}
                                        placeholder={"Select Source Station"}
                                        zIndex={3000}
                                        zIndexInverse={2000}
                                    />
                                    <Text style={[styles.label, styles.text, { marginTop: scaleSize(25) }]} >Destination Station</Text>
                                    <CustomDropDown
                                        value={Des_value}
                                        setValue={setDes_Value}
                                        setItems={setDes_Items}
                                        items={Des_items}
                                        placeholder={"Select Destination Station"}
                                        zIndex={2000}
                                        zIndexInverse={3000}
                                    />
                                </>
                        }
                        <Input
                            containerStyle={[styles.dropDown, { marginTop: item.title === 'GR Based Expense' || item.title === 'Prize For Routes' ? 0 : scaleSize(25) }]}
                            inputContainerStyle={[styles.input, { height: 50 }]}
                            textStyle={{ fontSize: 17, }}
                            label={'Amount Paid (In Rs.)'}
                            labelStyle={[styles.label]}
                            placeholder={'0'}
                            keyboardType='number-pad'
                            onChangeText={(t) => setDeatils({ ...Details, Amount: t })}
                        />
                        <Input
                            containerStyle={[styles.dropDown]}
                            inputContainerStyle={[styles.input, { height: 50 }]}
                            textStyle={{ fontSize: 17, }}
                            label={'Card Number'}
                            labelStyle={[styles.label]}
                            placeholder={'Card Number'}
                            keyboardType='number-pad'
                            onChangeText={(t) => setDeatils({ ...Details, CardNum: t })}
                        />
                        <Text style={[styles.label, styles.text, {}]} >Payment Mode</Text>
                        <CustomDropDown
                            value={Payment_value}
                            setValue={setPayment_Value}
                            setItems={setPayment_Items}
                            items={Payment_items}
                            placeholder={"Select Payment Mode"}
                            zIndex={1000}
                            zIndexInverse={4000}
                        />
                        <TouchableOpacity style={[{ marginTop: scaleSize(25) }]}
                            activeOpacity={0.6}
                            onPress={() => setPaidOn_Visible(!PaidOn_Visible)}
                        >
                            <Input
                                containerStyle={[styles.dropDown,]}
                                inputContainerStyle={[styles.input]}
                                textStyle={{ fontSize: 17, }}
                                label={'Paid On'}
                                labelStyle={styles.label}
                                value={PaidOnValue.toString()}
                                editable={false}
                                rightIcon={{ type: 'MaterialIcons', name: 'chevron-right', size: 30 }}
                            />
                        </TouchableOpacity>
                        <DatePicker
                            isDateVisible={PaidOn_Visible}
                            mode={'date'}
                            handleDateConfirm={(data) => setPaidOnValue(moment(data).format('DD-MM-YYYY'))}
                            onCancel={() => setPaidOn_Visible(false)}
                        />
                        <Input
                            containerStyle={[styles.dropDown]}
                            inputContainerStyle={[styles.input, { height: 110, flex: 1 }]}
                            textStyle={{ fontSize: 17, }}
                            label={'Notes'}
                            labelStyle={styles.label}
                            multiline={true}
                            textAlignVertical='top'
                            placeholder='Write notes here..'
                            numberOfLines={10}
                            onChangeText={(t) => setDeatils({ ...Details, Notes: t })}
                        />
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

export default ExpenseTypes

