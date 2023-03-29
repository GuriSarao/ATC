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
        paddingHorizontal: scaleSize(15),
        alignItems: "center",
        paddingVertical: scaleSize(10),
        borderRadius: 10,
        borderColor: GRAY_TEXT,
        elevation: 8,
        backgroundColor: WHITE,
        shadowOpacity: 1
    },
    text: {
        fontSize: 18.5,
        color: GRAY_MED_TEXT,
        fontWeight: "500",
        letterSpacing: 0.2
    },
    flatlistContainer: {
        paddingVertical: scaleSize(40),
        paddingHorizontal: scaleSize(12),
        // borderWidth: 1
    },
    header: {
        fontSize: 20,
        color: BLACK,
        fontWeight: '500'

    }

})

export default styles