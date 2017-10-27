
import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    ActivityIndicator,

} from 'react-native';

import * as PageActions from './modules/actions';
import { connect } from 'react-redux';
import styles from './styles';

import Login from 'app/views/Login';
import Index from 'app/views/Index';
import Loading from 'app/components/Loading';


class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                isLoggedIn: false
            }
        }
    }

    componentDidMount() {
        this.props.formAction({});
    }

    componentWillReceiveProps(nextProps) {
        this.setState( { data: nextProps.data })
    }

    render() {
        let props = this.props;

        if(!props.isLoaded) {
            return (
                <Loading />
            )
        }

        let data = this.state.data || {};
        let PageComponent = data.isLoggedIn ? Index : Login

        return (
            <PageComponent onLoginSuccessful={props.formAction} />
        )
    }
}


function mapStateToProps(state) {
    return state.launch;
}

const mapDispatchToProps = {
    formAction: PageActions.form,

};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
