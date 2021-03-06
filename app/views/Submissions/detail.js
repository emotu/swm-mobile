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
    ScrollView,
    RefreshControl,

} from 'react-native';

import { NavigationActions } from 'react-navigation';

import * as PageActions from './modules/actions';
import { connect } from 'react-redux';
import styles from './styles';
import generalStyles from 'app/config/styles';

import { formatNumber, formatDate } from 'app/utils/formatters';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';


class Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            refreshing: false,
        };

        this.loadData = this.loadData.bind(this);
        this.submitProperty = this.submitProperty.bind(this);
    }

    loadData(reloading = false) {

        let navigation = this.props.navigation;
        let params = navigation.state.params || {};

        params.reloading = reloading;
        this.props.detailAction(params);
    }

    componentDidMount() {
        this.loadData();
    }

    submitProperty() {
        const navigation = this.props.navigation;
        let props = this.props;
        if(props.obj && props.obj.pk) {

            const pageAction = NavigationActions.navigate({
                routeName: 'PropertyForm',
                params: {
                    id: props.obj.pk,
                },
            })

            navigation.dispatch(pageAction);
        }
    }

    render() {
        let props = this.props;

        if(!props.isLoaded || !props.obj) {
            return (
                <View style={generalStyles.loadingContainer}>
                    <ActivityIndicator animating={true} size={'large'} color={constants.baseColor} />
                    <Text style={generalStyles.loadingText}>LOADING</Text>
                </View>
            )
        }

        let refreshControl = <RefreshControl refreshing={!props.isReloaded} onRefresh={() => { this.loadData(true); } } />

        let iconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize-4);
        let plusIconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize-1);
        let basicColor = constants.lightColor;
        let plusColor = constants.whiteColor

        let obj = props.obj;

        return (
            <View style={generalStyles.container}>
                <ScrollView style={styles.detailContainer} refreshControl={refreshControl}>
                    <View style={styles.summaryContainer}>
                    </View>
                    <View style={styles.detailDataContainer}>
                        <View style={styles.detailData}>
                            {/* Show key, value, and icon to drill in */}
                            <Text style={styles.propKey}>CODE</Text>
                            <Text style={styles.propValue}>{obj.code}</Text>
                            <View style={styles.iconSpace}></View>
                        </View>
                        <View style={styles.detailData}>
                            {/* Show key, value, and icon to drill in */}
                            <Text style={styles.propKey}>STATUS</Text>
                            <Text style={styles.propValue}>{obj.verification_status.name.toUpperCase()}</Text>
                            <View style={styles.iconSpace}></View>
                        </View>
                        <View style={styles.detailData}>
                            {/* Show key, value, and icon to drill in */}
                            <Text style={styles.propKey}>NAME</Text>
                            <Text style={styles.propValue}>{obj.name}</Text>
                            <View style={styles.iconSpace}></View>
                        </View>
                        <View style={styles.detailData}>
                            {/* Show key, value, and icon to drill in */}
                            <Text style={styles.propKey}>ASSIGNED ON</Text>
                            <Text style={styles.propValue}>{formatDate(obj.date_created).toUpperCase()}</Text>
                            <View style={styles.iconSpace}></View>
                        </View>
                        {/* <TouchableOpacity style={styles.detailData}>
                            <Text style={styles.propKey}>SUBMISSIONS</Text>
                            <Text style={styles.propValue}>{formatNumber(obj.submission_count).toUpperCase()}</Text>
                            <View style={styles.iconSpace}><Entypo name="chevron-small-right" size={iconSize} color={basicColor} /></View>
                        </TouchableOpacity> */}
                    </View>
                    <Text style={styles.commentaryBox}>To update this information, click on the action button below</Text>
                    <Text style={styles.commentaryBox}><Feather name="arrow-down" size={plusIconSize} color={basicColor} /></Text>
                </ScrollView>
                <TouchableOpacity style={styles.actionButtonArea} onPress={this.submitProperty}>
                    <Text style={styles.actionButton}>{"UPDATE PROPERTY"}</Text>
                    <Feather name="arrow-right" size={plusIconSize} color={plusColor} />
                </TouchableOpacity>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return state.submissions;
}

const mapDispatchToProps = {
    detailAction: PageActions.detail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
