import { Platform, PixelRatio } from 'react-native';


const data = {
    navigationHeight: 60,
    baseColor: '#0a9e01',
    whiteColor: '#ffffff',
    blackColor: '#0a0a0a',
    greyColor: '#e8e8e8',
    lightColor: '#d2d2d2',
    shadeColor: '#696969',
    darkColor: '#0a0a0a',
    gridTextColor: '#2d2f35',
    gridColor: '#f4f4f4',
    placeholderTextColor: '#e8e8e8',
    dataInputPlaceholderTextColor: '#c2c2c2',
    inputFontSize: 10,
    menuIconSize: 15,
    listTitleFontSize: Platform.OS == 'ios' ? 6 : 8,
    listDetailFontSize: Platform.OS == 'ios' ? 9 : 10,
    labelFontSize: 6,
    loadingTextFontSize: Platform.OS === 'ios' ? PixelRatio.getPixelSizeForLayoutSize(6) : PixelRatio.getPixelSizeForLayoutSize(8),
    tabBarFontSize: Platform.OS === 'ios' ? PixelRatio.getPixelSizeForLayoutSize(7) : PixelRatio.getPixelSizeForLayoutSize(9),

    // Fonts
    // fontFamily: Platform.OS === 'ios' ? 'System' : 'lato',
    // headerFontFamily: Platform.OS === 'ios' ? 'System' : 'lato',
    fontFamily: 'lato',
    headerFontFamily: 'lato',
    textFontFamily: 'lato',
};

export default data;
