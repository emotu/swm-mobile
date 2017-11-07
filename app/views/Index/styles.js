import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import constants from 'app/config/constants';
import color from 'color';

const styles = StyleSheet.create({

    container: {
        backgroundColor: constants.whiteColor,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    appName: {
        fontWeight: 'bold',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(24),
        elevation: 1,
        color: 'white',
    },
    username: {
        color: 'white',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
        fontWeight: 'bold',
    },
    headlineSection: {
        backgroundColor: constants.baseColor,
        padding: PixelRatio.getPixelSizeForLayoutSize(10),
    },
    actionButton: {
        padding: PixelRatio.getPixelSizeForLayoutSize(10),
        marginVertical: 0,
    }

})

export default styles;
