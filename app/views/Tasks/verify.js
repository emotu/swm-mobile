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
    FlatList,

} from 'react-native';

import { NavigationActions } from 'react-navigation';
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
import PropertyList from './properties';



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
                    <Text style={[styles.taskEntryTitle]}>{obj.verification_status.name}</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    <Feather name="info" size={iconSize} color={basicColor} />
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
            data: {},
            images: [],

            imageModal: false,
            barcodeModal: false,
            propertyTypeModal: false,
            propertyStatusModal: false,
            searchModal: false,
        }

        this.saveData = this.saveData.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeAllModal = this.closeAllModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleCapturedImage = this.handleCapturedImage.bind(this);
        this.handleCapturedBarcode = this.handleCapturedBarcode.bind(this);
        this.submitProperty = this.submitProperty.bind(this);
        this.updateProperty = this.updateProperty.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    closeAllModal() {
        this.setState( { imageModal: false, barcodeModal: false, propertyTypeModal: false,
            propertyStatusModal: false, searchModal: false});
    }

    renderItem({ item }) {
        return (
            <TaskItem obj={item} onPressItem={this.updateProperty} />
        )

    }

    closeModal(name) {
        this.setState({ [name]: false });
    }

    openModal(name) {
        console.log('opening modal for...', name);
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


    submitProperty() {
        const navigation = this.props.navigation;
        let props = this.props;
        if(props.obj && props.obj.pk) {

            const pageAction = NavigationActions.navigate({
                routeName: 'TaskForm',
                params: {
                    task_id: props.obj.pk,
                    street_id: props.obj.street_id,
                },
            })

            navigation.dispatch(pageAction);
        }
    }

    updateProperty(obj) {
        const navigation = this.props.navigation;
        let props = this.props;
        let params = navigation.state.params || {};
        params.id = obj.pk;
        params.name = obj.code;
        params.task_id = props.obj.id
        params.street_id = props.obj.street_id

        console.log('this is the params now', params);

        const pageAction = NavigationActions.navigate({
            routeName: 'PropertyForm',
            params: params,
        })

        navigation.dispatch(pageAction);
        this.closeAllModal();
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
        // Loading position now.
        navigator.geolocation.getCurrentPosition((position) => {
            let { coords = {} } = position;
            let data = Object.assign({}, this.state.data, coords);
            console.log("When i got the coordinates, this is what the data is", coords);
            this.setState( { data })


        }, (error) => {
            console.log('this error occured =====>', error)
        })
    }

    showSearchModal() {
        console.log("I am now ready to show person you and others");

    }

    componentWillReceiveProps(nextProps) {
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
        this.state.images.push(data);

        this.closeAllModal();

    }

    handleCapturedBarcode(barcode, location) {
        this.handleInputChanged('tag_code', barcode.data)
        this.closeAllModal();
    }

    handleItemSelected(key, item) {
        this.closeAllModal();
        this.handleInputChanged(key, item.pk);
    }

    render() {

        let props = this.props;
        let successCheckboxSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize*8);
        let navigation = props.navigation;

        if(!props.isLoaded || !props.dependencies || !props.dependencies.task) {
            return (
                <View style={generalStyles.loadingContainer}>
                    <ActivityIndicator animating={true} size={'large'} color={constants.baseColor} />
                    <Text style={generalStyles.loadingText}>LOADING</Text>
                </View>
            )
        }

        if(props.saveSuccessful && props.data && props.data.total == 0) {
            let data = props.data;
            return (
                <View style={[generalStyles.loadingContainer, {paddingHorizontal: 10, paddingVertical: 10}]}>
                    <Text style={styles.notFound}>{"PROPERTY NOT FOUND"}</Text>
                    <Feather name="info" size={successCheckboxSize} color={constants.baseColor} />
                    <View style={{paddingHorizontal: 20}}>
                        <TouchableOpacity style={[styles.actionButtonArea, {marginTop: 25}]} onPress={this.submitProperty}>
                            <Text style={styles.actionButton}>{"PROCEED WITH REGISTRATION"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }


        if(props.saveSuccessful && props.data && props.data.total > 0) {
            let data = props.data;
            return (
                <View style={[generalStyles.container, {paddingHorizontal: 10, paddingVertical: 30}]}>
                    <Text style={styles.notFound}>{`${data.total} RESULT(S) FOUND`}</Text>
                    {/* <Feather name="info" size={successCheckboxSize} color={constants.baseColor} /> */}
                    <View style={styles.searchResults}>
                        <FlatList style={generalStyles.listContainer} ItemSeparatorComponent={ItemSeparator}
                            data={data.results || []} renderItem={this.renderItem} keyExtractor={(item) => item.pk || item.id} />
                    </View>
                </View>
            )
        }




        // if(props.saveSuccessful && props.uploadSuccessful) {
        //     return (
        //         <View style={[generalStyles.loadingContainer, {paddingHorizontal: 10, paddingVertical: 10}]}>
        //             <Feather name="check" size={successCheckboxSize} color={constants.baseColor} />
        //             <View style={{paddingHorizontal: 20}}>
        //                 <TouchableOpacity style={[styles.actionButtonArea, {marginTop: 4}]} onPress={() => { navigation.goBack(); }}>
        //                     <Text style={styles.actionButton}>{"SUBMIT ANOTHER ENTRY"}</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //     )
        //
        // }

        let refreshControl = <RefreshControl refreshing={!props.isReloaded} onRefresh={() => { this.loadData(true); } } />

        let data = this.state.data;

        let iconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize-4);
        let plusIconSize = PixelRatio.getPixelSizeForLayoutSize(constants.menuIconSize-1);
        let basicColor = constants.lightColor;
        let plusColor = constants.baseColor

        let task = props.dependencies.task;
        let street = props.dependencies.street;

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
                    {/* <Text style={generalStyles.dataFormSectionTitle}>{"CONTACT PERSON"}</Text>
                    <View style={generalStyles.dataFormSectionGroup}>
                        <View style={generalStyles.dataIconSection}>
                            <MaterialIcons name="perm-identity" size={plusIconSize} color={plusColor} />
                        </View>
                        <View style={generalStyles.dataInputSection}>
                            <View style={generalStyles.dataFormSection}>
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
                    </View> */}

                    <Text style={generalStyles.dataFormSectionTitle}>{"SEARCH AND VERIFY PROPERTY"}</Text>
                    <View style={generalStyles.dataFormSectionGroup}>
                        <View style={generalStyles.dataIconSection}>
                            {/* <MaterialIcons name="home" size={plusIconSize} color={plusColor} /> */}
                        </View>
                        <View style={[generalStyles.dataInputSection]}>
                            <View style={generalStyles.dataFormSection}>
                                {/* <Text style={generalStyles.dataFormLabel}>{"first name".toUpperCase()}</Text> */}
                                <Text style={generalStyles.unEditableText}>
                                    {`${street.name.toUpperCase()}, ${street.city.name.toUpperCase()}`}
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
                                     {/* <TextInput autoFocus={false} autoCapitalize={'words'} autoCorrect={false} value={data.property_size}
                                          placeholderTextColor={constants.dataInputPlaceholderTextColor} selectionColor={constants.baseColor}
                                          style={[generalStyles.dataInputField, {textAlign: 'right'}, hasErrors(props.errors, 'property_size') && generalStyles.errorInput]}
                                          placeholder={'Size'} returnKeyType={'next'}
                                          keyboardType={'numeric'}
                                          underlineColorAndroid={'transparent'}
                                          onChangeText={(value) => this.handleInputChanged('property_size', value)}/> */}
                                </View>
                                {this.handleErrors(props.errors, 'apt')}
                                {this.handleErrors(props.errors, 'house_number')}
                                {this.handleErrors(props.errors, 'property_size')}
                            </View>
                            {/* <View style={generalStyles.dataFormSection}>
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
                            </View> */}
                        </View>
                    </View>

                    {/* <Text style={generalStyles.dataFormSectionTitle}>{"IMAGES & TAG"}</Text>
                    <View style={generalStyles.dataFormSectionGroup}>
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
                    </View> */}

                </ScrollView>
                <TouchableOpacity style={styles.actionButtonArea} onPress={this.saveData}>
                    <Text style={styles.actionButton}>{"SEARCH AND VERIFY"}</Text>
                    {/* <Feather name="arrow-right" size={plusIconSize} color={plusColor} /> */}
                </TouchableOpacity>

                {/* <Modal transparent={true} animationType={"slide"} hardwareAccelerated={true} onRequestClose={() => {}}
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
                </Modal> */}

                <Modal transparent={true} animationType={"slide"} hardwareAccelerated={true} onRequestClose={() => {}}
                    visible={this.state.searchModal}>
                    <PropertyList title={"SELECT PROPERTY TO UPDATE"} options={props.data.results || []}
                        onItemSelected={this.submitProperty} onCancel={() => { this.closeModal('searchModal'); }} />
                </Modal>

            </View>
        )
    }
}


function mapStateToProps(state) {
    return state.tasks;
}

const mapDispatchToProps = {
    formAction: PageActions.form,
    saveAction: PageActions.verify,
    uploadAction: PageActions.upload,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
