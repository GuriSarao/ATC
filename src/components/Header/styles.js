import { StyleSheet } from 'react-native'
import {
  FONT_WEIGHT_LIGHT,
  FONT_SIZE_LARGE,
  WHITE,
  FONT_WEIGHT_EXTRA_SEMI_BOLD,
  FONT_WEIGHT_REGULAR,
  BLACK,
} from '../../theme'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,

  },

  headerTitle: {
    letterSpacing: 0.1,
    color: BLACK,
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 30
  },
})

export default styles
