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


class TaskItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.obj);
    }

    render() {
        let props = this.props;
        let obj = props.obj;

        let iconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize-4);
        let basicColor = constants.lightColor;

        return (
            <TouchableOpacity style={styles.taskList} onPress={this._onPress}>
                <View style={styles.taskEntryGroup}>
                    <Text style={styles.taskEntryTitle}>{obj.code}</Text>
                    <Text style={styles.taskEntryContent} numberOfLines={1}>{obj.name.toLowerCase()}</Text>
                    <Text style={[styles.taskEntryTitle, {fontSize: PixelRatio.getPixelSizeForLayoutSize(10)}]} numberOfLines={2}>
                        {obj.full_street || ""}
                    </Text>
                </View>
                <View>
                    <Text style={[styles.taskEntryTitle, {textAlign: 'right'}]}>{obj.verification_status.name}</Text>
                    {/* <Entypo name="chevron-small-right" size={iconSize} color={basicColor} /> */}
                </View>
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
    }
    /**
     * [navigationOptions description]
     * Standard react-navigation navigation options for this tab. It will be rendered as a tab.
     * @type {Object}
     */
    static navigationOptions = (props) => {
        return {
            tabBarLabel: "Submissions",
            tabBarIcon: null,
            tabBarOnPress: (scene, jumpToIndex) => { jumpToIndex(scene.index); }
        }
    }

    componentDidMount() {
        this.props.listAction({})
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    navigateToTask(item) {
        const navigation = this.props.navigation;
        const pageAction = NavigationActions.navigate({
            routeName: 'PropertyDetail',
            params: {
                name: item.code,
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
                    <Text style={generalStyles.emptyPageHeader}>{"Listed Properties"}</Text>
                    <Text style={generalStyles.emptyPageBody}>{"You do not currently have any submissions. All assigned tasks will be displayed here"}</Text>
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
    return state.submissions;
}

const mapDispatchToProps = {
    listAction: PageActions.list,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

import Detail from './detail';
import Form from './form';

export { Detail, Form }
