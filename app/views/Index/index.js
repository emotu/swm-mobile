
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    PixelRatio,

} from 'react-native';

import styles from './styles';

import { DrawerNavigator, DrawerItems } from 'react-navigation';
import Enumeration from 'app/views/Enumeration';
import constants from 'app/config/constants';

import ReactNativeRestart from 'react-native-restart';
import * as Auth from 'app/utils/auth';
import { Profile } from 'app/services/models';


class CustomDrawerComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                approx_name: '',
                full_name: ''
            },
        }
    }

    componentDidMount() {
        console.log('this is where we started this');

        Profile.list({}).then((response) => {
            this.setState({ data: response.data })
        }).catch((error) => {
            console.log(error);

        });
    }

    render() {

        let props = this.props;
        let data = this.state.data || {};

        return (<View style={styles.container}>
            <View style={styles.headlineSection}>
                <Text style={styles.appName}>PUMAU</Text>
                <Text style={styles.username}>Welcome, {data.approx_name.toUpperCase()}</Text>
            </View>
            <DrawerItems {...props} />
            <TouchableOpacity style={styles.actionButton} onPress={() => {
                Auth.logoutUser().then((res) => {
                    console.log('i got logged out now', res);
                    ReactNativeRestart.Restart();
                })
            }}>
                <Text style={styles.actionButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>);
    }
}

const RootNavigator = DrawerNavigator({
    Enumeration: {
        screen: Enumeration
    },
}, {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
        activeItemKey: 'currentRoute',
        activeTintColor: constants.baseColor,
        activeBackgroundColor: constants.gridColor,
        itemsContainerStyle: {
            marginVertical: 0,
            flex: 1,
            width: '100%',
            paddingTop: PixelRatio.getPixelSizeForLayoutSize(20),
        },
        labelStyle: {
            fontFamily: constants.fontFamily,
        },
    }
})

export default RootNavigator
