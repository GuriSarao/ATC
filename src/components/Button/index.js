import React, { memo } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'

// create a component
const Button = ({ title, onPress, style = {}, textStyle = {} }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={[styles.button, style]}
  >
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
)

//make this component available to the app
export default memo(Button)
