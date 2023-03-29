import { StyleSheet } from 'react-native'
import {
    BLACK,
    GRAY_MED_TEXT,
    GRAY_TEXT,
    MAIN_BLUE,
    scaleSize,
    TEXT_BLUE,
    WHITE,
} from '../../theme'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";


const styles = StyleSheet.create({
    safearea: {
        backgroundColor: WHITE,
        flex: 1
    },
    list: {

        flexDirection: 'row',
        justifyContent: "space-between",
        // paddingHorizontal: scaleSize(15),
        alignItems: "center",
        paddingVertical: scaleSize(10),
        borderRadius: 10,
        borderColor: GRAY_TEXT,
        borderBottomWidth: 0.5,
        paddingBottom: 16
    },
    text: {
        fontSize: 16,
        color: GRAY_MED_TEXT,
    },
    flatlistContainer: {
        paddingVertical: scaleSize(10),
        paddingHorizontal: scaleSize(12),
        paddingBottom: 50
        // borderWidth: 1
    },
    mid: { flexDirection: 'row', alignItems: "center" },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default styles