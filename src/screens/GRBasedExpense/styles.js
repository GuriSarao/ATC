import { StyleSheet } from 'react-native'
import {
    BLACK,
    LIGHT_GRAY_20,
    MAIN_BLUE,
    scaleSize,
    WHITE,
} from '../../theme'


const styles = StyleSheet.create({
    safearea: {
        backgroundColor: WHITE,
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: WHITE,
        paddingHorizontal: scaleSize(15),
    },
    label: { color: BLACK, marginBottom: 10 },

    text: {
        fontWeight: '700',
        fontSize: 15
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
    btn: {
        marginVertical: scaleSize(30),
    },
    list: {
        backgroundColor: LIGHT_GRAY_20,
        marginTop: scaleSize(30),
        borderRadius: 6
    },
    view: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 5
    },
    btn: {
        backgroundColor: MAIN_BLUE,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1
    },
    btn_save: {
        marginVertical: scaleSize(10)
    }
})
export default styles