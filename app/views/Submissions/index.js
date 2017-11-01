import React, { Component } from 'react';
import constants from 'app/config/constants';

import {
    Text,
    TextInput,
    View,
    Dimensions,
    TouchableHighlight,
    ActivityIndicator,

} from 'react-native';


import * as PageActions from './modules/actions';
import { connect } from 'react-redux';
import styles from './styles';
import generalStyles from 'app/config/styles';


class Page extends Component {
    constructor(props) {

        super(props);

        this.state = {
            data: {}
        }
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
            tabBarOnPress: (scene, jumpToIndex) => { console.log('tab pressed ====', scene, jumpToIndex); jumpToIndex(scene.index); }
        }
    }

    componentDidMount() {
        this.props.listAction({})
    }

    componentWillReceiveProps(nextProps) {
        console.log('this is inside submissions ')
        console.log(nextProps);
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

        return (
            <View style={generalStyles.container}>
                <Text>Total of {`${props.results.length}`} tasks loaded</Text>
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
