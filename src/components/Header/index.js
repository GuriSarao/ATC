import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { BLACK, MAIN_GRAY, MAIN_RED, WHITE } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons'


export const CustomHeader = ({ onBackPress, title, leftIcon, rightIcon, textStyle }) => {
  return (
    <>
      <View style={styles.header}>
        {leftIcon ? (
          leftIcon
        ) : (
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons name='chevron-back' color={BLACK} size={30} />
          </TouchableOpacity>
        )}
        <Text style={[styles.headerTitle, textStyle]}>{title}</Text>
        {rightIcon ? (
          <TouchableOpacity>{rightIcon}</TouchableOpacity>
        ) : (
          <View style={{ width: 20 }} />
        )}
      </View>
    </>
  );
};
