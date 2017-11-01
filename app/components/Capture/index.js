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
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import generalStyles from 'app/config/styles';

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
        this.submitBarCode = this.submitBarCode.bind(this);
    }

    async captureBarCode(barcode) {
        console.log('this is the even in the barcode =======>', barcode);
        console.log('this is where i am right now');
        const location = await navigator.geolocation.getCurrentPosition((position) => {
            console.log('this is position ====>', position)
            return position;
        }, (error) => {
            console.log('this error occured =====>', error)
        })

        this.setState( { barcode: barcode });

    }

    submitBarCode() {
        let barcode = this.state.barcode;
        if(barcode && barcode.type && barcode.data) {
            this.props.onCapture(barcode);
        }
    }

    async takePicture() {
        console.log('this is where i am right now');
        const location = await navigator.geolocation.getCurrentPosition((position) => {
            console.log('this is position ====>', position)
            return position;
        }, (error) => {
            console.log('this error occured =====>', error)
        })


        console.log('=====> in trapping location, this is what i have to do', location);
        const metadata = {
            location,
        }; // include location and others
        console.log('I am taking a picture now...', metadata)
        if(this.camera) {
            this.camera.capture({ metadata }).then((data) => {
                console.log('this is the photographic data');
                console.log(data);
                this.props.onCapture(data, location);
            }).catch((error) => {
                console.log('capture failed.. ')
                console.log(error);
            })
        }
    }

    render() {
        let props = this.props;

        let iconSize = PixelRatio.getPixelSizeForLayoutSize(13);
        let basicColor = constants.whiteColor;
        let selectedColor = constants.baseColor;

        let type = props.type || "image"
        let barcode_data = this.state.barcode ? this.state.barcode.data : null;

        let cameraComponent = (
            <Camera aspect={Camera.constants.Aspect.fill} fixOrientation={true}
                captureQuality={Camera.constants.CaptureQuality["1080p"]}
                style={styles.camera} ref={(cam) => { this.camera = cam; }}>
                <View style={styles.captureSquare} />
            </Camera>
        )

        let captureSegment = (
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
        )

        if(type === "barcode") {
            cameraComponent = (
                <Camera aspect={Camera.constants.Aspect.fill} fixOrientation={true}
                    onBarCodeRead={this.captureBarCode} captureQuality={Camera.constants.CaptureQuality["1080p"]}
                    style={styles.scanner} ref={(cam) => { this.camera = cam; }}>
                    <View style={styles.captureSquare} />
                </Camera>
            );

            captureSegment = (
                <View style={styles.controlView}>
                    <Text style={styles.captureTitle}>{"SCAN A BARCODE BY PLACING IT IN THE VIEW ABOVE"}</Text>
                    { barcode_data ? <Text style={styles.scanOutput}>{barcode_data || ""}</Text> : null}
                    { barcode_data ?
                        <TouchableOpacity style={styles.barcodeAcceptButton} onPress={this.submitBarCode}>
                            <Text style={styles.barcodeAcceptText}>{"ACCEPT"}</Text>
                        </TouchableOpacity>

                        : null
                     }
                </View>
            )
        }

        console.log('this is now what is in the modal ', props);

        return (
            <View style={styles.container}>
                <View style={generalStyles.headerView}>
                    <Text style={generalStyles.headerTitle}>{props.title || "IMAGE CAPTURE"}</Text>
                    <TouchableOpacity style={generalStyles.headerCancel} onPress={() => { props.onCancel(); }}>
                        <Feather name="x" size={iconSize} color={basicColor} />
                    </TouchableOpacity>
                </View>
                {cameraComponent}
                {captureSegment}
            </View>
        )
    }
}
