import { StyleSheet } from 'react-native'
import { PRIMARY, WHITE, scaleSize, FONT_WEIGHT_SEMI_BOLD, FONT_WEIGHT_REGULAR, MAIN_BLUE } from '../../theme'
import { MAIN_RED } from '../../theme'
// define your styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: MAIN_BLUE,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: scaleSize(10),
  },
  text: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '500'
  },
})

export default styles
