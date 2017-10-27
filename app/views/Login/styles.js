import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import constants from 'app/config/constants';
import color from 'color';

const styles = StyleSheet.create({

    container: {
        backgroundColor: color(constants.baseColor).darken(0.1).hex(),
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: PixelRatio.getPixelSizeForLayoutSize(25),
        alignItems: 'center',
        padding: PixelRatio.getPixelSizeForLayoutSize(10),
    },
    headline: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(14),
        fontWeight: 'bold',
        fontFamily: constants.headerFontFamily,
        color: constants.whiteColor,
        width: '100%',
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(9),
    },
    loginForm: {
        backgroundColor: constants.whiteColor,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(1),
        width: '100%',
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(8),
    },
    formLabel: {
        fontWeight: 'bold',
        color: constants.blackColor,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(constants.labelFontSize),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(0.5),
    },
    separator: {
        borderTopWidth: 1,
        borderTopColor: constants.greyColor,
        padding: 0,
    },
    inputField: {
        padding: PixelRatio.getPixelSizeForLayoutSize(0),
        color: constants.baseColor,
        paddingTop: PixelRatio.getPixelSizeForLayoutSize(4),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(2),
        fontSize: PixelRatio.getPixelSizeForLayoutSize(constants.inputFontSize),
        fontFamily: constants.fontFamily,
        fontWeight: 'bold',
    },
    formSection: {
        padding: PixelRatio.getPixelSizeForLayoutSize(5),
    },
    buttonContainer: {
        width: '100%',
        borderWidth: 0,
    },
    submitButton: {
        borderColor: color(constants.baseColor).darken(0.1).hex(),
        backgroundColor: color(constants.baseColor).lighten(0.1).hex(),
        borderWidth: 1,
        display: 'flex',
        color: constants.greyColor,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: PixelRatio.getPixelSizeForLayoutSize(7),
        fontSize: PixelRatio.getPixelSizeForLayoutSize(9),
        fontWeight: 'bold',
        letterSpacing: -1,
        fontFamily: constants.fontFamily,
    },

})

export default styles;
