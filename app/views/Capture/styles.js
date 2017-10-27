import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import constants from 'app/config/constants';
import color from 'color';

let { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({

    container: {
        backgroundColor: color(constants.baseColor).darken(0.1).hex(),
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    camera: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: width,
        maxHeight: width,
        width: width,
        padding: PixelRatio.getPixelSizeForLayoutSize(5),
    },
    scanner: {
        flex: 1,
        justifyContent: 'space-around',
        // marginTop: PixelRatio.getPixelSizeForLayoutSize(20),
        alignItems: 'stretch',
        height: width/2,
        maxHeight: width/2,
        width: '100%',
        padding: PixelRatio.getPixelSizeForLayoutSize(5),
    },
    captureSquare: {
        flex: 1,
        width: '100%',
        // height: '100%',
        borderColor: constants.whiteColor,
        borderWidth: PixelRatio.getPixelSizeForLayoutSize(1),
    },
    controlView: {
        flex: 0.5,
        flexDirection: 'column',
        maxHeight: (height - width),
        backgroundColor: color(constants.whiteColor).darken(0.01).hex(),
        width: '100%',
        padding: PixelRatio.getPixelSizeForLayoutSize(5),
    },
    captureTitle: {
        width: '100%',
        flex: 0.1,
        textAlign: 'center',
        fontWeight: 'bold',
        // paddingTop: PixelRatio.getPixelSizeForLayoutSize(4),
        paddingBottom: PixelRatio.getPixelSizeForLayoutSize(4),
        color: constants.baseColor,
        fontFamily: constants.fontFamily,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
    },
    cameraControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.9,
    },
    buttonControl: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    snapButton: {
        borderColor: color(constants.baseColor).darken(0.01).hex(),
        borderWidth: 1,
        backgroundColor: constants.baseColor,
        width: PixelRatio.getPixelSizeForLayoutSize(32),
        height: PixelRatio.getPixelSizeForLayoutSize(32),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(16),
    },

})

export default styles;
