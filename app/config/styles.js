import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import constants from 'app/config/constants';
import color from 'color';

const { width, } = Dimensions.get("window");

const styles = StyleSheet.create({

    container: {
        backgroundColor: constants.gridColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainHeadline: {
        fontFamily: constants.headerFontFamily,
        fontWeight: "900",
        letterSpacing: -1,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(9),
        color: color(constants.whiteColor).darken(0.03).hex(),
    },
    headerView: {
        width: width,
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(10),
        backgroundColor: constants.baseColor,
        elevation: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        flex: 3,
        color: constants.whiteColor,
        textAlign: 'left',
        justifyContent: 'flex-start',
        letterSpacing: -1,
        alignItems: 'flex-start',
        fontWeight: 'bold',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(9),
    },
    headerCancel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    headerCancelText: {
        textAlign: 'right',
        color: constants.whiteColor,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontFamily: constants.fontFamily,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(constants.labelFontSize),
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: constants.whiteColor,
    },
    loadingText: {
        fontFamily: constants.fontFamily,
        fontWeight: "600",
        color: constants.greyColor,
        fontSize: constants.loadingTextFontSize,
        marginTop: PixelRatio.getPixelSizeForLayoutSize(1),
    },
    navigationButton: {
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(8),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(8),
    },
    emptyPageContainer: {
        backgroundColor: constants.gridColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: PixelRatio.getPixelSizeForLayoutSize(10),
    },
    emptyPageHeader: {
        fontWeight: "600",
        letterSpacing: -1,
        fontFamily: constants.headerFontFamily,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(12),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(5),
        color: constants.darkColor,
        textAlign: 'center',
    },
    emptyPageBody: {
        color: constants.shadeColor,
        fontFamily: constants.fontFamily,
        textAlign: 'center',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
    },
    listContainer: {
        width: '100%',
        // backgroundColor: constants.whiteColor,
    },
    listSeparator: {
        width: '100%',
        height: 1,
        borderBottomColor: constants.gridColor,
    },

    dataFormSectionGroup: {
        backgroundColor: constants.whiteColor,
        borderTopColor: constants.gridColor,
        borderBottomColor: constants.gridColor,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(6),
        flexDirection: 'row',
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(10),
    },
    dataFormSectionTitle: {
        color: constants.darkColor,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(constants.labelFontSize),
        fontWeight: '500',
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(4),
    },

    spacer: {
        width: '100%',
        marginTop: PixelRatio.getPixelSizeForLayoutSize(10),
    },

    dataFormLabel: {
        fontWeight: 'bold',
        color: constants.lightColor,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(constants.labelFontSize),
    },
    dataFormSection: {
        flex: 1,
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(5),
    },
    dataInputSection: {
        flex: 1,
        paddingRight: PixelRatio.getPixelSizeForLayoutSize(10),
    },
    dataIconSection: {
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5),
    },
    dataInputField: {
        width: '100%',
        flex: 1,
        padding: PixelRatio.getPixelSizeForLayoutSize(0),
        color: constants.baseColor,
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(1),
        fontSize: PixelRatio.getPixelSizeForLayoutSize(constants.inputFontSize),
        fontFamily: constants.fontFamily,
        fontWeight: '200',
    },
    unEditableText: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(constants.inputFontSize),
        fontFamily: constants.fontFamily,
        color: constants.baseColor,
        fontWeight: '200',
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(1),
    },
    inlineInputBox: {
        flexDirection: 'row',
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5),
    },
    inputSeparator: {
        color: constants.gridColor,
    },
    dropDownGroup: {
        // borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(2),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(6),
        alignItems: 'center',
    },
    dropDownLabel: {
        flex: 1,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(constants.inputFontSize),
        color: constants.dataInputPlaceholderTextColor,
        fontFamily: constants.fontFamily,
        fontWeight: '200',
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(1),
    },

})

export default styles;
