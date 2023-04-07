import { View, Text, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BLACK, MAIN_BLUE, scaleSize, WHITE } from '../../theme'
import styles from './styles'
import { Appbar, } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomDropDown from '../Dashboard/DropDown';
import { Input } from '@rneui/themed';
import moment from 'moment';
import DatePicker from '../Dashboard/DatePicker';
import Button from '../../components/Button';
import Snackbar from 'react-native-snackbar';
import { StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Save_GR_Based } from '../../redux/actions/users.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import { List } from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons'


const GRBasedExpense = ({ navigation, route }) => {
  const { vehicles_detail, isRequesting, } = useSelector(state => state?.users) || []
  const dispatch = useDispatch()
  const { Gr, Vehicle } = route?.params || {}

  useEffect(() => {
    All_Details()
  }, [vehicles_detail])

  const All_Details = async () => {
    const Vehicle_List = await vehicles_detail?.map(item => ({
      value: item?.id,
      label: item?.registrationNumber
    }));
    setVehicle_Items(Vehicle_List)
  }

  useEffect(() => {
    setVehicle_Bpc_Value(Vehicle),
      setVehicle_Happay_Value(Vehicle),
      setVehicle_Fastag_Value(Vehicle)
  }, [])


  const [Vehicle_Bpc_value, setVehicle_Bpc_Value] = useState('');
  const [Vehicle_Happay_value, setVehicle_Happay_Value] = useState('');
  const [Vehicle_Fastag_value, setVehicle_Fastag_Value] = useState('');
  const [Vehicle_items, setVehicle_Items] = useState([]);

  const New_Date = moment().format('DD-MM-YYYY')
  const [PaidOn_Visible, setPaidOn_Visible] = useState(false);
  const [PaidOnValue, setPaidOnValue] = useState({
    Bpc_Paid: New_Date,
    Happay_paid: New_Date,
    Fastag_paid: New_Date
  });
  const [Detail, SetDetail] = useState({
    Bpc_Amount: '',
    Happay_Amount: '',
    Fastag_Amount: '',
    Bpc_Card_Num: '',
    Happay_Card_Num: '',
    Fastag_Card_Num: '',
    Bpc_Notes: '',
    Happay_Notes: '',
    Fastag_Notes: ''
  })
  const [Payment_mode, setPayment_mode] = useState('');


  const _Save_Bpc = async () => {
    const res = await AsyncStorage.getItem('user_detail')
    const user_Detail = JSON.parse(res)
    const GR_Based_data = {
      user_id: user_Detail[0]?.id,
      vehicle_id: Vehicle_Bpc_value,
      grid: Gr,
      amountPaid: Detail.Bpc_Amount,
      payment_mode_id: Payment_mode,
      card_number: Detail.Bpc_Card_Num,
      paidOn: PaidOnValue.Bpc_Paid.toString(),
      notes: Detail.Bpc_Notes,
    }
    await dispatch(Save_GR_Based(GR_Based_data)).then((res) => {
      Snackbar.show({
        text: res.message,
      });
    })
  }


  const _Save_Happay = async () => {
    const res = await AsyncStorage.getItem('user_detail')
    const user_Detail = JSON.parse(res)
    const GR_Based_data = {
      user_id: user_Detail[0]?.id,
      vehicle_id: Vehicle_Happay_value,
      grid: Gr,
      amountPaid: Detail.Happay_Amount,
      payment_mode_id: Payment_mode,
      card_number: Detail.Happay_Card_Num,
      paidOn: PaidOnValue.Happay_paid.toString(),
      notes: Detail.Happay_Notes,
    }
    if (Payment_mode === "2" && !Detail.Happay_Card_Num) {
      Snackbar.show({
        text: 'Please Select Card Number',
      });
      return
    }
    await dispatch(Save_GR_Based(GR_Based_data)).then((res) => {
      Snackbar.show({
        text: res.message,
      });
    })
  }

  const _Save_Fastag = async () => {
    const res = await AsyncStorage.getItem('user_detail')
    const user_Detail = JSON.parse(res)
    const GR_Based_data = {
      user_id: user_Detail[0]?.id,
      vehicle_id: Vehicle_Fastag_value,
      grid: Gr,
      amountPaid: Detail.Fastag_Amount,
      payment_mode_id: Payment_mode,
      card_number: Detail.Fastag_Card_Num,
      paidOn: PaidOnValue.Fastag_paid.toString(),
      notes: Detail.Fastag_Notes,
    }
    await dispatch(Save_GR_Based(GR_Based_data)).then((res) => {
      Snackbar.show({
        text: res.message,
      });
    })
  }

  return (
    <>
      <StatusBar backgroundColor={MAIN_BLUE} barStyle={'light-content'} />
      <Loader isLoading={isRequesting} />
      <SafeAreaView style={{ flex: 0, backgroundColor: MAIN_BLUE }} />
      <SafeAreaView style={styles.safearea}   >
        <Appbar.Header mode="center-aligned" style={{ backgroundColor: MAIN_BLUE }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} color={WHITE} size={25} />
          <Appbar.Content title={'GR Based Expense'} color={WHITE} />
          <Appbar.Action icon={() => <Octicons name='check-circle' color={WHITE} size={23} />}
            onPress={() => navigation.dispatch(StackActions.popToTop())} />
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
            <List.Section >
              <List.Accordion
                title="BPC" style={styles.list}
                onPress={() => setPayment_mode('3')} >
                <Text style={[styles.label, styles.text, { marginTop: scaleSize(20) }]} >Vehicle</Text>
                <CustomDropDown
                  value={Vehicle_Bpc_value}
                  setValue={setVehicle_Bpc_Value}
                  setItems={setVehicle_Items}
                  items={Vehicle_items}
                  placeholder={"Select Vehicle"}
                  zIndex={4000}
                  zIndexInverse={1000}
                />
                <Input
                  containerStyle={[styles.dropDown, { marginTop: scaleSize(25) }]}
                  inputContainerStyle={[styles.input, { height: 50 }]}
                  textStyle={{ fontSize: 17, }}
                  label={'Amount Paid (In Rs.)'}
                  labelStyle={[styles.label]}
                  placeholder={'0'}
                  keyboardType='number-pad'
                  onChangeText={(t) => SetDetail({ ...Detail, Bpc_Amount: t })}
                />
                <Input
                  containerStyle={[styles.dropDown]}
                  inputContainerStyle={[styles.input, { height: 50 }]}
                  textStyle={{ fontSize: 17, }}
                  label={'Card Number'}
                  labelStyle={[styles.label]}
                  placeholder={'Card Number'}
                  keyboardType='number-pad'
                  onChangeText={(t) => SetDetail({ ...Detail, Bpc_Card_Num: t })}
                />
                <TouchableOpacity style={{}}
                  activeOpacity={0.6}
                  onPress={() => setPaidOn_Visible(!PaidOn_Visible)}
                >
                  <Input
                    containerStyle={[styles.dropDown,]}
                    inputContainerStyle={[styles.input]}
                    textStyle={{ fontSize: 17, }}
                    label={'Paid On'}
                    labelStyle={styles.label}
                    value={PaidOnValue.Happay_paid.toString()}
                    editable={false}
                    rightIcon={{ type: 'MaterialIcons', name: 'chevron-right', size: 30 }}
                  />
                </TouchableOpacity>
                <DatePicker
                  isDateVisible={PaidOn_Visible}
                  mode={'date'}
                  handleDateConfirm={(data) => setPaidOnValue({ ...PaidOnValue, Bpc_Paid: moment(data).format('DD-MM-YYYY') })}
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
                  onChangeText={(t) => SetDetail({ ...Detail, Bpc_Notes: t })}
                />
                <Button
                  title={'Save'}
                  style={styles.btn_save}
                  onPress={_Save_Bpc}
                />
              </List.Accordion>

              <List.Accordion
                title="HAPPAY" style={styles.list}
                onPress={() => setPayment_mode('2')} >
                <Text style={[styles.label, styles.text, { marginTop: scaleSize(20) }]} >Vehicle</Text>
                <CustomDropDown
                  value={Vehicle_Happay_value}
                  setValue={setVehicle_Happay_Value}
                  setItems={setVehicle_Items}
                  items={Vehicle_items}
                  placeholder={"Select Vehicle"}
                  zIndex={4000}
                  zIndexInverse={1000}
                />
                <Input
                  containerStyle={[styles.dropDown, { marginTop: scaleSize(25) }]}
                  inputContainerStyle={[styles.input, { height: 50 }]}
                  textStyle={{ fontSize: 17, }}
                  label={'Amount Paid (In Rs.)'}
                  labelStyle={[styles.label]}
                  placeholder={'0'}
                  keyboardType='number-pad'
                  onChangeText={(t) => SetDetail({ ...Detail, Happay_Amount: t })}
                />
                <Input
                  containerStyle={[styles.dropDown]}
                  inputContainerStyle={[styles.input, { height: 50 }]}
                  textStyle={{ fontSize: 17, }}
                  label={'Card Number'}
                  labelStyle={[styles.label]}
                  placeholder={'Card Number'}
                  keyboardType='number-pad'
                  onChangeText={(t) => SetDetail({ ...Detail, Happay_Card_Num: t })}
                />
                <TouchableOpacity style={{}}
                  activeOpacity={0.6}
                  onPress={() => setPaidOn_Visible(!PaidOn_Visible)}
                >
                  <Input
                    containerStyle={[styles.dropDown,]}
                    inputContainerStyle={[styles.input]}
                    textStyle={{ fontSize: 17, }}
                    label={'Paid On'}
                    labelStyle={styles.label}
                    value={PaidOnValue.Happay_paid.toString()}
                    editable={false}
                    rightIcon={{ type: 'MaterialIcons', name: 'chevron-right', size: 30 }}
                  />
                </TouchableOpacity>
                <DatePicker
                  isDateVisible={PaidOn_Visible}
                  mode={'date'}
                  handleDateConfirm={(data) => setPaidOnValue({ ...PaidOnValue, Happay_paid: moment(data).format('DD-MM-YYYY') })}
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
                  onChangeText={(t) => SetDetail({ ...Detail, Happay_Notes: t })}
                />

                <Button
                  title={'Save'}
                  style={styles.btn_save}
                  onPress={_Save_Happay}
                />
              </List.Accordion>

              <List.Accordion
                title="FASTAG" style={styles.list}
                onPress={() => setPayment_mode('5')}>
                <Text style={[styles.label, styles.text, { marginTop: scaleSize(20) }]} >Vehicle</Text>
                <CustomDropDown
                  value={Vehicle_Fastag_value}
                  setValue={setVehicle_Fastag_Value}
                  setItems={setVehicle_Items}
                  items={Vehicle_items}
                  placeholder={"Select Vehicle"}
                  zIndex={4000}
                  zIndexInverse={1000}
                />
                <Input
                  containerStyle={[styles.dropDown, { marginTop: scaleSize(25) }]}
                  inputContainerStyle={[styles.input, { height: 50 }]}
                  textStyle={{ fontSize: 17, }}
                  label={'Amount Paid (In Rs.)'}
                  labelStyle={[styles.label]}
                  placeholder={'0'}
                  keyboardType='number-pad'
                  onChangeText={(t) => SetDetail({ ...Detail, Fastag_Amount: t })}
                />
                <Input
                  containerStyle={[styles.dropDown]}
                  inputContainerStyle={[styles.input, { height: 50 }]}
                  textStyle={{ fontSize: 17, }}
                  label={'Card Number'}
                  labelStyle={[styles.label]}
                  placeholder={'Card Number'}
                  keyboardType='number-pad'
                  onChangeText={(t) => SetDetail({ ...Detail, Fastag_Card_Num: t })}
                />
                <TouchableOpacity style={{}}
                  activeOpacity={0.6}
                  onPress={() => setPaidOn_Visible(!PaidOn_Visible)}
                >
                  <Input
                    containerStyle={[styles.dropDown,]}
                    inputContainerStyle={[styles.input]}
                    textStyle={{ fontSize: 17, }}
                    label={'Paid On'}
                    labelStyle={styles.label}
                    value={PaidOnValue.Fastag_paid.toString()}
                    editable={false}
                    rightIcon={{ type: 'MaterialIcons', name: 'chevron-right', size: 30 }}
                  />
                </TouchableOpacity>
                <DatePicker
                  isDateVisible={PaidOn_Visible}
                  mode={'date'}
                  handleDateConfirm={(data) => setPaidOnValue({ ...PaidOnValue, Fastag_paid: moment(data).format('DD-MM-YYYY') })}
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
                  onChangeText={(t) => SetDetail({ ...Detail, Fastag_Notes: t })}
                />
                <Button
                  title={'Save'}
                  style={styles.btn_save}
                  onPress={_Save_Fastag}
                />

              </List.Accordion>

            </List.Section>

            {/* <Button
              title={'Save'}
              style={styles.btn_save}
              onPress={_Save}
            /> */}

            {/* <Text style={[styles.label, styles.text, { marginTop: scaleSize(20) }]} >Select Payment Mode</Text>
            <View style={styles.view}>
              <TouchableOpacity style={[styles.btn,
              { backgroundColor: Payment_mode === "3" ? MAIN_BLUE : WHITE }]}
                onPress={() => setPayment_mode('3')}>
                <Text style={[styles.text, { color: Payment_mode === "3" ? WHITE : BLACK }]}>BPC </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, {
                backgroundColor: Payment_mode === "2" ? MAIN_BLUE : WHITE
              }]}
                onPress={() => setPayment_mode('2')}
              >
                <Text style={[styles.text, { color: Payment_mode === "2" ? WHITE : BLACK }]} >HAPPAY</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, {
                backgroundColor: Payment_mode === "5" ? MAIN_BLUE : WHITE
              }]}
                onPress={() => setPayment_mode('5')}
              >
                <Text style={[styles.text, { color: Payment_mode === "5" ? WHITE : BLACK }]}>FASTAG </Text>
              </TouchableOpacity>
            </View> */}



          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  )
}

export default GRBasedExpense