import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import constants from 'app/config/constants';
import color from 'color';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    detailContainer: {
        flex: 1,
        width: width,
        height: '100%',
        backgroundColor: constants.gridColor,
        paddingBottom: PixelRatio.getPixelSizeForLayoutSize(12),
    },
    scrollContainer: {
        flex: 1,
        width: width,
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    separator: {
        width: width,
        height: 1,
        borderBottomColor: constants.gridColor,
        borderBottomWidth: 1,
    },

    detailDataContainer: {
        width: '100%',
        backgroundColor: constants.whiteColor,
        flexDirection: 'column',
        marginTop: PixelRatio.getPixelSizeForLayoutSize(13),
    },

    detailData: {
        flexDirection: 'row',
        position: 'relative',
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(8),
        borderBottomColor: constants.gridColor,
    },
    propKey: {
        flex: 1,
        textAlign: 'left',
        paddingLeft: PixelRatio.getPixelSizeForLayoutSize(6),
        fontFamily: constants.fontFamily,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
        color: constants.lightColor,
    },
    propValue: {
        flex: 1,
        textAlign: 'right',
        fontWeight: '600',
        fontFamily: constants.fontFamily,
        color: constants.blackColor,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
    },
    iconSpace: {
        flex: 0.2,
        width: PixelRatio.getPixelSizeForLayoutSize(6),
        justifyContent: 'center',
        alignItems: 'center',
    },

    commentaryBox: {
        padding: PixelRatio.getPixelSizeForLayoutSize(10),
        fontFamily: constants.fontFamily,
        textAlign: 'center',
        color: constants.lightColor,
    },

    actionButton: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(9),
        fontWeight: 'bold',
        color: constants.whiteColor,
        textAlign: 'center',
        flex: 1,
    },

    notFound: {
        color: "#020202",
        fontWeight: "bold",
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(10),
    },

    searchResults: {
        width: '100%',
        flex: 1,
        height: '100%',
    },

    actionButtonArea: {
        width: '100%',
        flexDirection: 'row',
        padding: PixelRatio.getPixelSizeForLayoutSize(9),
        backgroundColor: constants.baseColor,
        justifyContent: 'center',
        alignItems: 'center',
    },

    taskList: {
        backgroundColor: constants.whiteColor,
        width: '100%',
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(8),
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    taskEntryGroup: {
        flex: 1,
    },
    taskEntryTitle: {
        fontWeight: "400",
        fontSize: PixelRatio.getPixelSizeForLayoutSize(constants.listTitleFontSize),
        fontFamily: constants.fontFamily,
        color: constants.lightColor,
        // letterSpacing: -1,
    },
    taskEntryContent: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(constants.listDetailFontSize),
        color: constants.blackColor,
        fontFamily: constants.fontFamily,
    },
    taskEntryBadge: {
        borderWidth: 1,
        textAlign: 'center',
        width: PixelRatio.getPixelSizeForLayoutSize(18),
        height: PixelRatio.getPixelSizeForLayoutSize(18),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(9),
        backgroundColor: constants.shadeColor,
    },

})

export default styles;
