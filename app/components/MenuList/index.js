import React, { Component } from 'react';
import constants from 'app/config/constants';

import {
    Text,
    TextInput,
    View,
    Dimensions,
    TouchableOpacity,
    PixelRatio,
    FlatList,

} from 'react-native';

import Camera from 'react-native-camera';
import color from 'color';

// import * as PageActions from './modules/actions';
// import { connect } from 'react-redux';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import generalStyles from 'app/config/styles';


class TaskItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.obj);
    }

    render() {
        let props = this.props;
        let obj = props.obj ? props.obj : {};
        let currentValue = props.currentValue;

        let iconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize-4);
        let basicColor = constants.lightColor;
        let checkComponent = currentValue == obj.pk ? <Feather name="check" size={iconSize} color={basicColor} /> : null;

        return (
            <TouchableOpacity style={styles.taskList} onPress={this._onPress}>
                <View style={styles.taskEntryGroup}>
                    <Text style={styles.taskEntryContent} numberOfLines={1}>{obj.name}</Text>
                </View>
                {checkComponent}
            </TouchableOpacity>
        )
    }
}

const ItemSeparator = () => (
    <View style={generalStyles.listSeparator}></View>
)


export default class Page extends Component {

    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }

    renderItem({ item }) {
        let props = this.props;
        return (
            <TaskItem currentValue={props.value} obj={item} onPressItem={this.selectItem} />
        )

    }

    selectItem(item) {
        console.log('item selected is now', item);
        if(this.props.onItemSelected) {
            this.props.onItemSelected(item);
        }
    }

    render() {

        let props = this.props;

        let iconSize = PixelRatio.getPixelSizeForLayoutSize(13);
        let basicColor = constants.whiteColor;
        let selectedColor = constants.baseColor;

        return (
            <View style={generalStyles.container}>
                <View style={generalStyles.headerView}>
                    <Text style={generalStyles.headerTitle}>{props.title || "SELECT AN OPTION"}</Text>
                    <TouchableOpacity style={generalStyles.headerCancel} onPress={() => { props.onCancel(); }}>
                        <Feather name="x" size={iconSize} color={basicColor} />
                    </TouchableOpacity>
                </View>
                <FlatList style={generalStyles.listContainer} ItemSeparatorComponent={ItemSeparator}
                    data={props.options || []} renderItem={this.renderItem} keyExtractor={(item) => item.pk || item.id} />
            </View>
        );
    }
}
