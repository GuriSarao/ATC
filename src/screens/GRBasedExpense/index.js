import { View, Text, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MAIN_BLUE, scaleSize, WHITE } from '../../theme'
import styles from './styles'
import { Appbar, } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomDropDown from '../Dashboard/DropDown';
import { Input } from '@rneui/themed';
import moment from 'moment';
import DatePicker from '../Dashboard/DatePicker';
import ListComponent from './ListComponent';
import Button from '../../components/Button';
import Snackbar from 'react-native-snackbar';
import { StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const GRBasedExpense = ({ navigation, route }) => {
  const { vehicles_detail } = useSelector(state => state?.users) || []

  const Selected_Veh = route?.params || {}

  console.log(Selected_Veh, 'route')

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
    setVehicle_Bpc_Value(Selected_Veh)
  }, [])


  const [Vehicle_Bpc_value, setVehicle_Bpc_Value] = useState('');
  const [Vehicle_Happay_value, setVehicle_Happay_Value] = useState('');
  const [Vehicle_items, setVehicle_Items] = useState([]);

  const New_Date = moment().format('DD-MM-YYYY')
  const [PaidOn_Visible, setPaidOn_Visible] = useState(false);
  const [PaidOnValue, setPaidOnValue] = useState(New_Date);

  // console.log(Vehicle_Bpc_value, 'vehicle value')

  const _Save = () => {
    if (!Vehicle_Bpc_value) {
      Snackbar.show({
        text: 'Please Select any item',
      });
      return
    }
    navigation.dispatch(StackActions.popToTop());
  }

  return (
    <>
      <StatusBar backgroundColor={MAIN_BLUE} barStyle={'light-content'} />
      <SafeAreaView style={{ flex: 0, backgroundColor: MAIN_BLUE }} />
      <SafeAreaView style={styles.safearea}   >
        <Appbar.Header mode="center-aligned" style={{ backgroundColor: MAIN_BLUE }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} color={WHITE} size={25} />
          <Appbar.Content title={'GR Based Expense'} color={WHITE} />
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
            <ListComponent header={'BPC'}>
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
              />
              <Input
                containerStyle={[styles.dropDown]}
                inputContainerStyle={[styles.input, { height: 50 }]}
                textStyle={{ fontSize: 17, }}
                label={'Card Number'}
                labelStyle={[styles.label]}
                placeholder={'Card Number'}
                keyboardType='number-pad'
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
              />
            </ListComponent>
            <ListComponent header={'HAPPAY'}>

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
              />
              <Input
                containerStyle={[styles.dropDown]}
                inputContainerStyle={[styles.input, { height: 50 }]}
                textStyle={{ fontSize: 17, }}
                label={'Card Number'}
                labelStyle={[styles.label]}
                placeholder={'Card Number'}
                keyboardType='number-pad'
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
              />
            </ListComponent>

            <ListComponent header={'FASTAG TOLL'}>

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
              />
              <Input
                containerStyle={[styles.dropDown]}
                inputContainerStyle={[styles.input, { height: 50 }]}
                textStyle={{ fontSize: 17, }}
                label={'Card Number'}
                labelStyle={[styles.label]}
                placeholder={'Card Number'}
                keyboardType='number-pad'
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
              />
            </ListComponent>
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

export default GRBasedExpense