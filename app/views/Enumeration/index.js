
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    PixelRatio,

} from 'react-native';

import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation';

import Home from 'app/views/Home';
import Tasks, { Detail as TaskDetail, Form as TaskForm, } from 'app/views/Tasks';
import Submissions from 'app/views/Submissions';

import styles from './styles';
import settings from 'app/config/settings';
import constants from 'app/config/constants';
import generalStyles from 'app/config/styles';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';


const BaseNavigator = TabNavigator({
    Tasks: {
        screen: Tasks,
    },
    Submissions: {
        screen: Submissions,
    },
}, {
    tabBarPosition: 'top',
    tabBarComponent: TabBarTop,
    animationEnabled: true,
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
        // scrollEnabled: true,
        activeTintColor: constants.baseColor,
        inactiveTintColor: constants.shadeColor,
        backgroundColor: constants.baseColor,
        activeTintColor: constants.baseColor,
        elevation: 0,
        indicatorStyle: {
            backgroundColor: constants.baseColor,
        },
        style: {
            backgroundColor: constants.whiteColor,
            elevation: 0,
            borderBottomColor: constants.greyColor,
            borderBottomWidth: 0.5,
            flexWrap: 'nowrap',
        },
        tabStyle: {
            flexWrap: 'nowrap',
            padding: 5,
        },
        labelStyle: {
            fontFamily: constants.headerFontFamily,
            fontWeight: 'bold',
            fontSize: constants.tabBarFontSize,
        }
    }
})

const RootNavigator = StackNavigator({

    Index: {
        screen: BaseNavigator,
        navigationOptions: ({ navigation }) => {

            let iconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize);
            let basicColor = constants.whiteColor;


            return {
                title: (<Text style={generalStyles.mainHeadline}>{settings.appName}</Text>),
                headerLeft: (
                    <TouchableOpacity style={generalStyles.navigationButton}
                        onPress={() => {navigation.navigate('DrawerOpen'); }}>
                        <Entypo name="menu" size={iconSize} color={basicColor} />
                    </TouchableOpacity>
                ),
                // headerRight: (
                //     <TouchableOpacity style={generalStyles.navigationButton}>
                //         <Entypo name="plus" size={iconSize} color={basicColor} />
                //     </TouchableOpacity>
                // ),
                headerStyle: {
                    backgroundColor: constants.baseColor,
                    borderBottomColor: constants.baseColor,
                    elevation: 2,
                    borderBottomWidth: 0.5,
                },
                titleStyle: {
                    textAlign: 'center',
                    alignSelf: 'center',
                }

            }
        }
    },
    TaskDetail: {
        screen: TaskDetail,
        navigationOptions: ({ navigation }) => {
            const iconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize);
            const basicColor = constants.whiteColor;
            const params = navigation.state.params || {};
            const name = params.name || "..."

            return {
                title: (<Text style={generalStyles.mainHeadline}>{name.toUpperCase()}</Text>),
                headerLeft: (
                    <TouchableOpacity style={generalStyles.navigationButton}
                        onPress={() => { navigation.goBack(); }}>
                        <Feather name="arrow-left" size={iconSize} color={basicColor} />
                    </TouchableOpacity>
                ),
                headerStyle: {
                    backgroundColor: constants.baseColor,
                    borderBottomColor: constants.baseColor,
                    elevation: 2,
                    borderBottomWidth: 0.5,
                },
                titleStyle: {
                    textAlign: 'center',
                    alignSelf: 'center',
                    color: constants.whiteColor,
                }
            }
        }
    },
    TaskForm: {
        screen: TaskForm,
        navigationOptions: ({ navigation }) => {
            const iconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize);
            const basicColor = constants.whiteColor;
            const params = navigation.state.params || {};
            const name = params.name || "..."

            return {
                title: (<Text style={generalStyles.mainHeadline}>{"NEW PROPERTY"}</Text>),
                headerLeft: (
                    <TouchableOpacity style={generalStyles.navigationButton}
                        onPress={() => { navigation.goBack(); }}>
                        <Feather name="arrow-left" size={iconSize} color={basicColor} />
                    </TouchableOpacity>
                ),
                // headerRight: (
                //     <TouchableOpacity style={generalStyles.navigationButton}
                //         onPress={() => { navigation.goBack(); }}>
                //         <Feather name="x" size={iconSize} color={basicColor} />
                //     </TouchableOpacity>
                // ),
                headerStyle: {
                    backgroundColor: constants.baseColor,
                    borderBottomColor: constants.baseColor,
                    elevation: 2,
                    borderBottomWidth: 0.5,
                },
                titleStyle: {
                    textAlign: 'center',
                    alignSelf: 'center',
                    color: constants.whiteColor,
                }
            }
        }
    }
});


export default RootNavigator