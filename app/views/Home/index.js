
import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions
} from 'react-native';
import * as Auth from 'app/utils/auth';


export default class Page extends Component {
    render () {
        return (
            <View onClick={Auth.logoutUser()}>
                <Text>This is the home page view</Text>
            </View>
        )
    }
}
