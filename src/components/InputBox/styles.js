import { StyleSheet } from 'react-native'
import {
  DARK_GRAY_10,
  DARK_GRAY_20,
  DARK_GRAY_30,
  DARK_GRAY_70,
  LIGHT_GRAY_20,
  LIGHT_GRAY_40
} from '../../theme'

const styles = StyleSheet.create({
  inputContainer:{
    borderWidth:1,
    borderRadius:30,
    height:45,
    paddingHorizontal:20,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    borderColor:DARK_GRAY_70,
    width:'100%'
  },
  inputBox:{
    flex:1,
  }
 
})

export default styles
