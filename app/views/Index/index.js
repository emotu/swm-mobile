
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    Text,
    View,
    Dimensions
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Home from 'app/views/Home';
import Capture from 'app/views/Capture';

const RootNavigator = StackNavigator({
    Capture: {
        screen: Capture,
        navigationOptions: {
            headerTitle: "Image Capture"
        }
    }
});


export default RootNavigator
