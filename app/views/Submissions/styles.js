import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import constants from 'app/config/constants';
import color from 'color';

const styles = StyleSheet.create({

    container: {
        backgroundColor: constants.whiteColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainHeadline: {
        fontFamily: constants.headerFontFamily,
        fontWeight: "900",
        letterSpacing: -1
    }

})

export default styles;
