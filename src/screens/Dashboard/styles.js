import { StyleSheet } from 'react-native'
import {
    BLACK,
    GRAY_LIGHT_TEXT,
    GRAY_MED_TEXT,
    GRAY_TEXT,
    LIGHT_GRAY_10,
    LIGHT_GRAY_100,
    LIGHT_GRAY_15,
    LIGHT_GRAY_20,
    LIGHT_GRAY_40,
    LIGHT_GRAY_5,
    LIGHT_GRAY_50,
    LIGHT_GRAY_6,
    LIGHT_GRAY_60,
    LIGHT_GRAY_71,
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
        flex: 1,
        backgroundColor: WHITE,
        paddingHorizontal: scaleSize(18),
        marginTop: scaleSize(20),
    },
    heading: {
        fontSize: 25,
        color: WHITE
    },
    pickerIcon: {
        backgroundColor: MAIN_BLUE,
        flex: 1, paddingHorizontal: 10,
        justifyContent: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    dropDownBox: {
        backgroundColor: LIGHT_GRAY_10,
        borderColor: LIGHT_GRAY_20,
        overflow: 'hidden',

    },
    dropDown: {
        borderColor: LIGHT_GRAY_20,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    input: {
        borderWidth: 1,
        borderColor: LIGHT_GRAY_20,
        borderRadius: 6,
        paddingHorizontal: 10,
    },
    zindex: { zIndex: 8000 },
    label: { color: BLACK, marginBottom: 10 },
    
    text: {
        fontWeight: '700',
        fontSize: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        zIndex: 9000,
        // backgroundColor: WHITE

    },
    modelProps: {
        animationType: 'slide',
        transparent: true,
        presentationStyle: 'overFullScreen',
    },
    modelCon: {
        backgroundColor: LIGHT_GRAY_10,
        marginHorizontal: 15,
        elevation: 2,
        borderRadius: 20,
        marginTop: 75,
        marginBottom: 20,
    },
    searchInput: {
        borderColor: GRAY_TEXT,
        paddingVertical: 2,
        backgroundColor: WHITE
    },
    list: {
        borderBottomWidth: 1,
        borderColor: LIGHT_GRAY_20,
    },
    btnView: { flexDirection: 'row', alignItems: 'center' },
    btn: {
        marginVertical: scaleSize(15),
    },


})
export default styles