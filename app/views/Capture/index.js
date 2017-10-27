import React, { Component } from 'react';
import constants from 'app/config/constants';

import {
    Text,
    TextInput,
    View,
    Dimensions,
    TouchableOpacity,
    PixelRatio,

} from 'react-native';

import Camera from 'react-native-camera';
import color from 'color';

// import * as PageActions from './modules/actions';
// import { connect } from 'react-redux';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default class Capture extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flashMode: Camera.constants.FlashMode.auto,
            torchMode: Camera.constants.TorchMode.auto,
            data: {},

        }
        this.camera = null;
        this.takePicture = this.takePicture.bind(this);
        this.captureBarCode = this.captureBarCode.bind(this);
    }

    captureBarCode(barcode) {
        console.log('this is the even in the barcode =======>', barcode);

    }

    takePicture() {
        console.log('this is where i am right now');
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('this is position ====>', position)
        }, (error) => {
            console.log('this error occured =====>', error)
        })
        const metadata = {
        }; // include location and others
        console.log('I am taking a picture now...', metadata)
        if(this.camera) {
            this.camera.capture({ metadata }).then((data) => {
                console.log('this is the photographic data');
                console.log(data);
            }).catch((error) => {
                console.log('capture failed.. ')
                console.log(error);
            })
        }
    }

    render() {
        let props = this.props;
        console.log(' i am now returning from the render props', props);
        let iconSize = PixelRatio.getPixelSizeForLayoutSize(13);
        let basicColor = color(constants.greyColor).darken(0.3).hex();
        let selectedColor = constants.baseColor;

        return (
            <View style={styles.container}>
                <Camera aspect={Camera.constants.Aspect.fill} fixOrientation={true}
                    onBarCodeRead={this.captureBarCode}
                    style={styles.camera} ref={(cam) => { this.camera = cam; }}>
                    <View style={styles.captureSquare} />
                </Camera>
                <View style={styles.controlView}>
                    <Text style={styles.captureTitle}>{"TAP THE BUTTON BELOW TO TAKE A PICTURE"}</Text>
                    <View style={styles.cameraControls}>
                        <TouchableOpacity style={styles.buttonControl}>
                            <Entypo name="folder-images" size={iconSize} color={basicColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonControl} onPress={this.takePicture}>
                            <View style={styles.snapButton}></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonControl}>
                            <Entypo name="flash" size={iconSize} color={this.state.flashMode == Camera.constants.FlashMode.on ? selectedColor : basicColor } />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
