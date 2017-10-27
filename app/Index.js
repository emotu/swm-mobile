
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
    Text,
    View,
    Dimensions
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import store from 'app/config/store';
import Launch from 'app/views/Launch';

const App = () => {
    return (
        <Provider store={store}>
            <Launch />
        </Provider>
    )
}

export default App;
