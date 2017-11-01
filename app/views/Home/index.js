
import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    Modal,
    TouchableOpacity,
} from 'react-native';
import * as Auth from 'app/utils/auth';

import Capture from 'app/views/Capture';


export default class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPhotoModal: false,
            showScannerModal: false,
        };

        this.showPhotoModal = this.showPhotoModal.bind(this);
        this.showScannerModal = this.showScannerModal.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    showPhotoModal() {
        this.setState( { showPhotoModal: true });
    }

    showScannerModal() {
        this.setState( { showScannerModal: true });
    }

    closeModal(name) {
        console.log('closing modal -->', name);
        this.setState({ [name]: false });
    }

    saveData(data, location = {}) {
        console.log(' i am now saving data here ', data, location);
    }

    render () {
        return (
            <View>
                <TouchableOpacity onPress={this.showPhotoModal}>
                    <Text>Click here to load capture component </Text>
                </TouchableOpacity>
                <Modal transparent={false} animationType={"slide"} hardwareAccelerated={true}
                    visible={this.state.showPhotoModal} onRequestClose={() => { this.closeModal('showPhotoModal')}}>
                    <Capture onCapture={this.saveData} />
                </Modal>
            </View>
        )
    }
}
