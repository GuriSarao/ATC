import React from 'react'
import { View, ActivityIndicator, Image, Text } from 'react-native'
import { MAIN_BLUE } from '../../theme'
import styles from './styles'


const Loader = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <View style={{ ...styles.loader, zIndex: 100 }}>
        <ActivityIndicator size="large" color={MAIN_BLUE} />
      </View>
    )
  }
  return null
}

export default Loader
