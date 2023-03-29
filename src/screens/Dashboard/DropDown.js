import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { WHITE } from '../../theme';
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from './styles';


const CustomDropDown = ({ items, setItems, value, setValue, onLayout, placeholder, zIndex, zIndexInverse, dropDownDirection, onSelectItem }) => {

  const [Open, setOpen] = useState(false);

  const Arrow = ({ type }) => {
    return (
      <View style={styles.pickerIcon}>
        <AntDesign name={type == 'up' ? 'caretup' : 'caretdown'} color={WHITE} size={12} />
      </View>
    )
  }

  return (
    <>
      <DropDownPicker
        open={Open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        textStyle={{ fontSize: 17, textAlign: 'center' }}
        style={styles.dropDown}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        dropDownContainerStyle={styles.dropDownBox}
        ArrowDownIconComponent={() => <Arrow type={'down'} />}
        ArrowUpIconComponent={() => <Arrow type={'up'} />}
        placeholder={placeholder}
        showTickIcon={false}
        searchable={true}
        searchTextInputProps={styles.searchInput}
        searchContainerStyle={{
          borderBottomWidth: 0,
        }}
        listItemContainerStyle={styles.list}
        searchPlaceholder={'Search'}
        onLayout={onLayout}
        listMode='SCROLLVIEW'
        dropDownDirection={dropDownDirection}
        scrollViewProps={{
          nestedScrollEnabled: true
        }}
        onSelectItem={onSelectItem}
      />
    </>
  )
}

export default CustomDropDown
