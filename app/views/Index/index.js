
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    PixelRatio,

} from 'react-native';

import { DrawerNavigator } from 'react-navigation';
import Enumeration from 'app/views/Enumeration';
import constants from 'app/config/constants';

const RootNavigator = DrawerNavigator({
    Enumeration: {
        screen: Enumeration
    },
    Verification: {
        screen: Enumeration
    }
}, {
    contentOptions: {
        activeItemKey: 'currentRoute',
        activeTintColor: constants.baseColor,
        activeBackgroundColor: constants.gridColor,
        itemsContainerStyle: {
            marginVertical: 0,
            paddingTop: PixelRatio.getPixelSizeForLayoutSize(20),
        },
        labelStyle: {
            fontFamily: constants.fontFamily,
        }
    }
})

export default RootNavigator
