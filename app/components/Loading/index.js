
import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    ActivityIndicator,

} from 'react-native';
import constants from 'app/config/constants';
import styles from './styles';


const C = () => {
    return (
        <View style={styles.container} >
            <ActivityIndicator animating={true} size={'large'} color={constants.whiteColor} />
        </View>
    )
}

export default C
