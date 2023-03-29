import { StyleSheet } from 'react-native'
import {
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
    container: {
        backgroundColor: WHITE,
        paddingHorizontal: scaleSize(20),
        paddingVertical: scaleSize(30),
        elevation: 2,
        backgroundColor: WHITE,
        marginHorizontal: scaleSize(20),
        shadowOpacity: 0.2,
        bottom: 50,
        borderRadius: 30
    },
    logintext: {
        color: MAIN_BLUE,
        fontSize: 38,
        fontWeight: "600",
        paddingBottom: scaleSize(30),
        alignSelf: 'center'
    },
    img: {
        width: 180,
        height: 61
    },
    top: {
        backgroundColor: MAIN_BLUE,
        width: '100%',
        height: hp("33%"),
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'

    },
    forgot: {
        color: MAIN_BLUE,
        fontSize: 16, fontWeight: "400"
    },
    text: {
        color: GRAY_TEXT,
        fontSize: 16,
        lineHeight: 30
    },
    btn: {
        marginTop: scaleSize(15),
    },
    inputStyle: {
        //  borderWidth: 1,
        paddingHorizontal: 10,
        //  borderRadius: 6,
        borderColor: GRAY_TEXT,
    }


})
export default styles