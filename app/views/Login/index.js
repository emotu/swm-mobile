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

import { fetchErrors, hasErrors } from 'app/utils/errors';

class Page extends Component {
    constructor(props) {

        super(props);

        this.state = {
            data: {
                username: '',
                password: '',
            }
        }

        this.saveData = this.saveData.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleInputChanged = this.handleInputChanged.bind(this);
    }

    saveData() {
        console.log('editing submitted. I am now saving data')

        let data = this.state.data || {};

        console.log(data);

        this.props.saveAction(data);
    }

    handleErrors(errors, name){
        let errorValues = fetchErrors(errors, name);

        if(errorValues) {
            return (
                <div>
                  {  errorValues.map((error) => (error))}
                </div>
            );
        }

    }

    handleInputChanged(key, value) {
        let data = Object.assign({}, this.state.data, {[key]: value })

        this.setState({ data })
    }

    componentDidMount() {
        this.props.formAction({})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.saveSuccessful) {
            if(this.props.onLoginSuccessful) {
                // Trigger the parent window to attempt the reload again
                this.props.onLoginSuccessful()
            }
        }
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


        let data = this.state.data || {};

        return (
            <View style={styles.container}>
                <Text style={styles.headline}>Log in</Text>
                <View style={styles.loginForm}>
                    <View style={styles.formSection}>
                        <Text style={styles.formLabel}>{"username".toUpperCase()}</Text>
                        <TextInput autoFocus={false} autoCapitalize={'none'} autoCorrect={false} value={data.username}
                             placeholderTextColor={constants.placeholderTextColor} selectionColor={constants.baseColor}
                             style={styles.inputField} placeholder={'you@domain.com'} returnKeyType={'next'} keyboardType={'email-address'}
                             underlineColorAndroid={'transparent'} onChangeText={(value) => this.handleInputChanged('username', value)}/>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.formSection}>
                        <Text style={styles.formLabel}>{"password".toUpperCase()}</Text>
                        <TextInput placeholderTextColor={constants.placeholderTextColor} value={data.password}
                            style={styles.inputField} placeholder={'Enter password'} secureTextEntry={true}
                            selectionColor={constants.baseColor} underlineColorAndroid={'transparent'} onChangeText={(value) => this.handleInputChanged('password', value)} onSubmitEditing={this.saveData} />
                    </View>
                </View>
                <TouchableHighlight style={styles.buttonContainer} activeOpacity={0.7} onPress={this.saveData}>
                    <Text style={styles.submitButton}>LOG IN</Text>
                </TouchableHighlight>
            </View>
        )

    }
}

function mapStateToProps(state) {
    return state.login;
}

const mapDispatchToProps = {
    saveAction: PageActions.save,
    formAction: PageActions.form,

};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
