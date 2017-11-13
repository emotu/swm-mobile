import React, { Component } from 'react';
import constants from 'app/config/constants';

import {
    Text,
    TextInput,
    View,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,

} from 'react-native';

import { NavigationActions } from 'react-navigation';


import * as PageActions from './modules/actions';
import { connect } from 'react-redux';
import styles from './styles';
import generalStyles from 'app/config/styles';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import store from 'app/config/store';


class TaskItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.obj);
    }

    render() {
        let props = this.props;
        let city = props.obj ? props.obj.city : {};
        let street = props.obj ? props.obj.street : {};

        let iconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize-4);
        let basicColor = constants.lightColor;

        return (
            <TouchableOpacity style={styles.taskList} onPress={this._onPress}>
                <View style={styles.taskEntryGroup}>
                    <Text style={styles.taskEntryTitle}>{city.name}</Text>
                    <Text style={styles.taskEntryContent} numberOfLines={1}>{street.name}</Text>
                </View>
                <Entypo name="chevron-small-right" size={iconSize} color={basicColor} />
            </TouchableOpacity>
        )
    }
}

const ItemSeparator = () => (
    <View style={generalStyles.listSeparator}></View>
)

class Page extends Component {
    constructor(props) {

        super(props);

        this.state = {
            refreshing: false,
            data: {}
        }

        this.renderItem = this.renderItem.bind(this);
        this.navigateToTask = this.navigateToTask.bind(this);
        this.loadData = this.loadData.bind(this);
    }
    /**
     * [navigationOptions description]
     * Standard react-navigation navigation options for this tab. It will be rendered as a tab.
     * @type {Object}
     */
    // static navigationOptions = (props) => {
    //     return {
    //         tabBarLabel: "Tasks",
    //         tabBarIcon: null,
    //         tabBarOnPress: (scene, jumpToIndex) => { jumpToIndex(scene.index); }
    //     }
    // }

    static navigationOptions = (props) => {

        let iconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize-2);
        let basicColor = constants.whiteColor;
        let navigation = props.navigation;

        return {
            title: (<Text style={generalStyles.mainHeadline}>{"ASSIGNED TASKS"}</Text>),
            headerLeft: (
                <TouchableOpacity style={generalStyles.navigationButton}
                    onPress={() => {navigation.navigate('DrawerOpen'); }}>
                    <Feather name="menu" size={iconSize} color={basicColor} />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity style={generalStyles.navigationButton} onPress={() => { store.dispatch(PageActions.list({})) }}>
                    <Feather name="refresh-cw" size={iconSize} color={basicColor} />
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
            }

        }
    }

    loadData(data = {}) {
        this.props.loadData(data);
    }

    componentDidMount() {
        this.props.listAction({})
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    navigateToTask(item) {
        console.log('this is item here', item);
        const navigation = this.props.navigation;
        const pageAction = NavigationActions.navigate({
            routeName: 'TaskDetail',
            params: {
                name: item.street.name,
                id: item.pk,
            },
        })

        navigation.dispatch(pageAction);

    }

    renderItem({ item }) {
        return (
            <TaskItem obj={item} onPressItem={this.navigateToTask} />
        )

    }

    render() {
        let props = this.props;

        if(!props.isLoaded) {
            return (
                <View style={generalStyles.loadingContainer}>
                    <ActivityIndicator animating={true} size={'large'} color={constants.baseColor} />
                    <Text style={generalStyles.loadingText}>LOADING</Text>
                </View>
            )
        }

        if(props.isLoaded && props.results.length == 0) {
            return (
                <View style={generalStyles.emptyPageContainer}>
                    <Text style={generalStyles.emptyPageHeader}>{"Assigned Tasks"}</Text>
                    <Text style={generalStyles.emptyPageBody}>{"You do not currently have any tasks assigned. All assigned tasks will be displayed here"}</Text>
                </View>
            )
        }

        return (
            <View style={generalStyles.container}>
                <FlatList style={generalStyles.listContainer} ItemSeparatorComponent={ItemSeparator}
                    refreshing={!props.isReloaded}
                    onRefresh={() => { props.listAction({reloading: true}) }}
                    data={props.results} renderItem={this.renderItem} keyExtractor={(item) => item.pk || item.id} />
            </View>
        )

    }
}

function mapStateToProps(state) {
    return state.tasks;
}

const mapDispatchToProps = {
    listAction: PageActions.list,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

import Detail from './detail';
import Form from './form';
import Verify from './verify';

export { Detail, Form, Verify }
