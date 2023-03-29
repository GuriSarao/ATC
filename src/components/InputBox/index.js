import React from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import styles from './styles'
import { LIGHT_GRAY_77, MAIN_RED } from '../../theme'

// create a component
export const InputBox = ({
  placeholder = 'InputBox',
  value,
  onChange,
  onChangeText,
  style = {},
  numberOfLines,
  multiline,
  inputBoxStyle = {},
  leftIcon,
  onRightIconPress,
  rightIcon,
  rightComponentText,
  secureTextEntry,
  editable = true,
  isDescriptionBox = false,
  keyboardType,
  onRightPress,
  onLeftress,
  maxLength,
  ...rest
}) => {
  return (
    <View
      style={[
        styles.inputContainer,
        style,
      ]}
    >
    {leftIcon && (
      <TouchableOpacity
        onPress={onLeftress}
        style={{marginRight:8}}
      >
        {leftIcon}
      </TouchableOpacity>
    )
    }
      <TextInput
        editable={editable}
        style={[
          styles.inputBox,
          inputBoxStyle,
        ]}
        value={value}
        onChange={onChange}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={LIGHT_GRAY_77}
        color={LIGHT_GRAY_77}
        autoCorrect={false}
        keyboardType={keyboardType}
        maxLength={maxLength}
        {...rest}
      />
      {rightIcon && (
        <TouchableOpacity
          onPress={onRightPress}
        >
          {rightIcon}
        </TouchableOpacity>
      )
      }
      {rightComponentText && (
        <TouchableOpacity
           onPress={onRightIconPress}
        >
          <Text style={{ textDecorationLine: 'underline', color: MAIN_RED }}>{rightComponentText}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
