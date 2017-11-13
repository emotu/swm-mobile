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
    Modal,
    Picker,

} from 'react-native';


import * as PageActions from './modules/actions';
import { connect } from 'react-redux';
import styles from './styles';
import generalStyles from 'app/config/styles';
import _ from 'lodash';

import { formatNumber, formatDate } from 'app/utils/formatters';
import { fetchErrors, hasErrors } from 'app/utils/errors';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Capture from 'app/components/Capture';
import MenuList from 'app/components/MenuList';


class Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            images: [],

            imageModal: false,
            barcodeModal: false,
            propertyTypeModal: false,
            propertyStatusModal: false,
        }

        this.saveData = this.saveData.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeAllModal = this.closeAllModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleCapturedImage = this.handleCapturedImage.bind(this);
        this.handleCapturedBarcode = this.handleCapturedBarcode.bind(this);
        this.restartForm = this.restartForm.bind(this);
    }

    closeAllModal() {
        this.setState( { imageModal: false, barcodeModal: false, propertyTypeModal: false, propertyStatusModal: false});
    }

    closeModal(name) {
        this.setState({ [name]: false });
    }

    openModal(name) {
        this.setState({ [name]: true });
    }

    loadData(refreshing = false) {
        let navigation = this.props.navigation;
        let params = navigation.state.params || {};

        this.setState({ data: params }, () => {

            params.refreshing = refreshing;
            this.props.formAction(params);
        })
    }

    saveData() {
        let data = this.state.data || {};
        let propsData = this.props.data;
        this.props.saveAction(data);
    }

    handleErrors(errors, name){
        let errorValues = fetchErrors(errors, name);

        if(errorValues) {
            return (
                <Text style={generalStyles.errorText}>
                  {  errorValues.map((error) => (error)) }
              </Text>
            );
        }

    }

    handleInputChanged(key, value) {
        let data = Object.assign({}, this.state.data, {[key]: value });

        this.setState({ data });
    }

    componentDidMount() {
        this.loadData();
    }

    restartForm() {
        console.log('this is the point where we restart the form by navigating into it again..');

    }

    componentWillReceiveProps(nextProps) {

        if(nextProps && nextProps.dependencies && nextProps.dependencies.obj) {
            this.setState( { data: nextProps.dependencies.obj });
        }

        if(nextProps && nextProps.saveSuccessful && nextProps.data && !nextProps.uploadSuccessful) {
            console.log('saveSuccessful', nextProps, this.state);
            let data = nextProps.data;
            this.setState( { data }, () => {
                this.uploadImages({id: data.id}, this.state.images);
            })
        }
    }

    uploadImages(data = {}, images = []) {
        let props = this.props;
        console.log('i am now attempting to upload images', images);
        for( var image of images) {
            console.log('image is shown');
            let file = {};
            file.uri = image.mediaUri;
            file.type = "image/jpg";
            file.name = `IMAGE_DCIM_${data.id}`;

            console.log('this is now file', file);

            props.uploadAction(data, file)
        }

    }

    handleCapturedImage(data, location) {
        console.log('capturing data now ======> ', data, location)
        this.state.images.push(data);

        this.closeAllModal();

    }

    handleCapturedBarcode(barcode, location) {
        console.log('capturing data now ======> ', barcode, location)
        this.handleInputChanged('tag_code', barcode.data)
        this.closeAllModal();
    }

    handleItemSelected(key, item) {
        console.log('handling item selected for the following', key, item);
        this.closeAllModal();
        this.handleInputChanged(key, item.pk);
    }

    render() {

        let props = this.props;
        let successCheckboxSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize*10);

        if(!props.isLoaded || !props.dependencies || !props.dependencies.obj) {
            return (
                <View style={generalStyles.loadingContainer}>
                    <ActivityIndicator animating={true} size={'large'} color={constants.baseColor} />
                    <Text style={generalStyles.loadingText}>LOADING</Text>
                </View>
            )
        }

        if(props.saveSuccessful && !props.uploadSuccessful && this.state.images && this.state.images.length > 0) {
            return (
                <View style={generalStyles.loadingContainer}>
                    <ActivityIndicator animating={true} size={'large'} color={constants.baseColor} />
                    <Text style={generalStyles.loadingText}>UPLOADING IMAGES</Text>
                </View>
            )
        }

        if(props.saveSuccessful) {
            return (
                <View style={[generalStyles.loadingContainer, {paddingHorizontal: 10, paddingVertical: 10}]}>
                    <Feather name="check" size={successCheckboxSize} color={constants.baseColor} />
                    {/* <View style={{paddingHorizontal: 20}}>
                        <TouchableOpacity style={[styles.actionButtonArea, {marginTop: 4}]} onPress={this.restartForm}>
                            <Text style={styles.actionButton}>{"SUBMIT ANOTHER ENTRY"}</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            )

        }

        let refreshControl = <RefreshControl refreshing={!props.isReloaded} onRefresh={() => { this.loadData(true); } } />

        let data = this.state.data;

        let iconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize-4);
        let plusIconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize-1);
        let basicColor = constants.lightColor;
        let plusColor = constants.baseColor

        let obj = props.dependencies.obj;
        let street = obj.street || {name: ""};
        let city = obj.city || {name: ""};

        let cameraText = this.state.images.length > 0 ? `${this.state.images.length} Image(s)` : "Attach Image";
        let tagText = data.tag_code || "Add Tag";

        let property_status = null;
        let property_type = null;

        if(data.property_status_code) {
            property_status = _.find(props.dependencies.property_statuses, function(o) { return o.pk == data.property_status_code });
        }

        if(data.property_type_code) {
            property_type = _.find(props.dependencies.property_types, function(o) { return o.pk == data.property_type_code });
        }

        let property_status_text = property_status ? property_status.name : "Choose Property Status"
        let property_type_text = property_type ? property_type.name : "Choose Property Type"

        let selectedStyle = {color: constants.baseColor};

        let cutomSectionStyle = {
            paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10),
        }

        return (
            <View style={generalStyles.container}>
                <ScrollView style={styles.detailContainer}>
                    <View style={generalStyles.spacer}></View>
                    <Text style={generalStyles.dataFormSectionTitle}>{"CONTACT PERSON"}</Text>
                    <View style={generalStyles.dataFormSectionGroup}>
                        <View style={generalStyles.dataIconSection}>
                            <MaterialIcons name="perm-identity" size={plusIconSize} color={plusColor} />
                        </View>
                        <View style={generalStyles.dataInputSection}>
                            <View style={generalStyles.dataFormSection}>
                                {/* <Text style={generalStyles.dataFormLabel}>{"first name".toUpperCase()}</Text> */}
                                <TextInput autoFocus={false} autoCapitalize={'sentences'} autoCorrect={false} value={data.name}
                                     placeholderTextColor={constants.dataInputPlaceholderTextColor} selectionColor={constants.baseColor}
                                     style={[generalStyles.dataInputField, hasErrors(props.errors, 'name') && generalStyles.errorInput]}
                                     placeholder={'Full Name'} returnKeyType={'next'}
                                     keyboardType={'default'}
                                     underlineColorAndroid={'transparent'}
                                     onChangeText={(value) => this.handleInputChanged('name', value)}/>
                                    {this.handleErrors(props.errors, 'name')}
                            </View>

                            <View style={generalStyles.dataFormSection}>
                                {/* <Text style={generalStyles.dataFormLabel}>{"last name".toUpperCase()}</Text> */}
                                <TextInput autoFocus={false} autoCapitalize={'none'} autoCorrect={false} value={data.email}
                                     placeholderTextColor={constants.dataInputPlaceholderTextColor} selectionColor={constants.baseColor}
                                     style={[generalStyles.dataInputField, hasErrors(props.errors, 'email') && generalStyles.errorInput]}
                                     placeholder={'Email (Optional)'} returnKeyType={'next'}
                                     keyboardType={'email-address'}
                                     underlineColorAndroid={'transparent'}
                                     onChangeText={(value) => this.handleInputChanged('email', value)}/>
                                     {this.handleErrors(props.errors, 'email')}
                            </View>
                            <View style={generalStyles.dataFormSection}>
                                {/* <Text style={generalStyles.dataFormLabel}>{"last name".toUpperCase()}</Text> */}
                                <TextInput autoFocus={false} autoCapitalize={'none'} autoCorrect={false} value={data.phone}
                                     placeholderTextColor={constants.dataInputPlaceholderTextColor} selectionColor={constants.baseColor}
                                     style={[generalStyles.dataInputField, hasErrors(props.errors, 'phone') && generalStyles.errorInput]}
                                     placeholder={'Phone'} returnKeyType={'next'}
                                     keyboardType={'phone-pad'}
                                     underlineColorAndroid={'transparent'}
                                     onChangeText={(value) => this.handleInputChanged('phone', value)}/>
                                     {this.handleErrors(props.errors, 'phone')}
                            </View>
                        </View>
                    </View>

                    <Text style={generalStyles.dataFormSectionTitle}>{"LOCATION & DESCRIPTION"}</Text>
                    <View style={generalStyles.dataFormSectionGroup}>
                        <View style={generalStyles.dataIconSection}>
                            <MaterialIcons name="home" size={plusIconSize} color={plusColor} />
                        </View>
                        <View style={[generalStyles.dataInputSection]}>
                            <View style={generalStyles.dataFormSection}>
                                {/* <Text style={generalStyles.dataFormLabel}>{"first name".toUpperCase()}</Text> */}
                                <Text style={generalStyles.unEditableText}>
                                    {`${street.name.toUpperCase()}, ${city.name.toUpperCase()}`}
                                </Text>
                            </View>

                            <View style={generalStyles.dataFormSection}>
                                {/* <Text style={generalStyles.dataFormLabel}>{"middle name".toUpperCase()}</Text> */}
                                <View style={generalStyles.inlineInputBox}>
                                    <TextInput autoFocus={false} autoCapitalize={'words'} autoCorrect={false} value={data.house_number}
                                         placeholderTextColor={constants.dataInputPlaceholderTextColor} selectionColor={constants.baseColor}
                                         style={[generalStyles.dataInputField, hasErrors(props.errors, 'house_number') && generalStyles.errorInput]}
                                         placeholder={'House No.'} returnKeyType={'next'}
                                         keyboardType={'default'}
                                         underlineColorAndroid={'transparent'}
                                         onChangeText={(value) => this.handleInputChanged('house_number', value)}/>
                                    <TextInput autoFocus={false} autoCapitalize={'words'} autoCorrect={false} value={data.apt}
                                         placeholderTextColor={constants.dataInputPlaceholderTextColor} selectionColor={constants.baseColor}
                                         style={[generalStyles.dataInputField, hasErrors(props.errors, 'apt') && generalStyles.errorInput]}
                                         placeholder={'Apt. No'} returnKeyType={'next'}
                                         keyboardType={'default'}
                                         underlineColorAndroid={'transparent'}
                                         onChangeText={(value) => this.handleInputChanged('apt', value)}/>
                                     <TextInput autoFocus={false} autoCapitalize={'words'} autoCorrect={false} value={data.property_size ? data.property_size.toString() : ""}
                                          placeholderTextColor={constants.dataInputPlaceholderTextColor} selectionColor={constants.baseColor}
                                          style={[generalStyles.dataInputField, hasErrors(props.errors, 'property_size') && generalStyles.errorInput]}
                                          placeholder={'Size'} returnKeyType={'next'}
                                          keyboardType={'numeric'}
                                          underlineColorAndroid={'transparent'}
                                          onChangeText={(value) => this.handleInputChanged('property_size', value)}/>
                                </View>
                                {this.handleErrors(props.errors, 'apt')}
                                {this.handleErrors(props.errors, 'house_number')}
                                {this.handleErrors(props.errors, 'property_size')}
                            </View>
                            <View style={generalStyles.dataFormSection}>
                                <TouchableOpacity style={generalStyles.dropDownGroup} onPress={() => this.openModal('propertyTypeModal')}>
                                    <Text style={[generalStyles.dropDownLabel, property_type && selectedStyle]}>{property_type_text}</Text>
                                    <Entypo name="chevron-small-down" size={iconSize} color={basicColor} />
                                </TouchableOpacity>
                                {this.handleErrors(props.errors, 'property_type_code')}
                            </View>
                            <View style={generalStyles.dataFormSection}>
                                <TouchableOpacity style={generalStyles.dropDownGroup} onPress={() => this.openModal('propertyStatusModal')}>
                                    <Text style={[generalStyles.dropDownLabel,
                                        property_status && selectedStyle]}>{property_status_text}</Text>
                                    <Entypo name="chevron-small-down" size={iconSize} color={basicColor} />
                                </TouchableOpacity>
                                {this.handleErrors(props.errors, 'property_status_code')}
                            </View>
                        </View>
                    </View>

                    <Text style={generalStyles.dataFormSectionTitle}>{"IMAGES & TAG"}</Text>
                    <View style={generalStyles.dataFormSectionGroup}>
                        {/* <View style={generalStyles.dataIconSection}>
                            <Entypo name="home" size={plusIconSize} color={plusColor} />
                        </View> */}
                        <View style={[generalStyles.dataInputSection, cutomSectionStyle]}>
                            <View style={generalStyles.dataFormSection}>
                                <TouchableOpacity style={generalStyles.dropDownGroup} onPress={() => this.openModal('imageModal')}>
                                    <Text
                                        style={[generalStyles.dropDownLabel, this.state.images.length > 0 && selectedStyle]}>{cameraText}</Text>
                                    <MaterialIcons name="local-see" size={iconSize} color={basicColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={generalStyles.dataFormSection}>
                                <TouchableOpacity style={generalStyles.dropDownGroup} onPress={() => this.openModal('barcodeModal')}>
                                    <Text style={[generalStyles.dropDownLabel, data.tag_code && selectedStyle]}>{tagText}</Text>
                                    <MaterialIcons name="crop-free" size={iconSize} color={basicColor} />
                                </TouchableOpacity>
                                {this.handleErrors(props.errors, 'tag_code')}
                            </View>
                        </View>
                    </View>

                </ScrollView>
                <TouchableOpacity style={styles.actionButtonArea} onPress={this.saveData}>
                    <Text style={styles.actionButton}>{"SAVE"}</Text>
                    {/* <Feather name="arrow-right" size={plusIconSize} color={plusColor} /> */}
                </TouchableOpacity>

                <Modal transparent={true} animationType={"slide"} hardwareAccelerated={true} onRequestClose={() => {}}
                    visible={this.state.imageModal}>
                    <Capture type={"image"} title={"TAKE A PHOTO"} onCapture={this.handleCapturedImage}
                        onCancel={() => { this.closeModal('imageModal'); }} />
                </Modal>

                <Modal transparent={true} animationType={"slide"} hardwareAccelerated={true} onRequestClose={() => {}}
                    visible={this.state.barcodeModal}>
                    <Capture type={"barcode"} title={"SCAN BARCODE"} onCapture={this.handleCapturedBarcode}
                    onCancel={() => { this.closeModal('barcodeModal'); }} />
                </Modal>

                <Modal transparent={true} animationType={"slide"} hardwareAccelerated={true} onRequestClose={() => {}}
                    visible={this.state.propertyTypeModal}>
                    <MenuList value={data.property_type_code} title={"SELECT TYPE"} options={props.dependencies.property_types}
                        onItemSelected={(item) => { this.handleItemSelected('property_type_code', item); }}
                    onCancel={() => { this.closeModal('propertyTypeModal'); }} />
                </Modal>

                <Modal transparent={true} animationType={"slide"} hardwareAccelerated={true} onRequestClose={() => {}}
                    visible={this.state.propertyStatusModal}>
                    <MenuList value={data.property_status_code} title={"SELECT STATUS"} options={props.dependencies.property_statuses}
                        onItemSelected={(item) => { this.handleItemSelected('property_status_code', item); }}
                    onCancel={() => { this.closeModal('propertyStatusModal'); }} />
                </Modal>

            </View>
        )
    }
}


function mapStateToProps(state) {
    return state.submissions;
}

const mapDispatchToProps = {
    formAction: PageActions.form,
    saveAction: PageActions.save,
    uploadAction: PageActions.upload,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
