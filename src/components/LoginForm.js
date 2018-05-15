import React, { Component } from 'react';
import { View, Text , StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
    EmailChanged,
    PasswordChanged,
    LoginUser
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

    onChangeEmail(text) {
        this.props.EmailChanged(text);
    }

    onChangePassword(text) {
        this.props.PasswordChanged(text);
    }
    onButtonPress() {
        const { email, password } = this.props;
        this.props.LoginUser({ email, password });
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );

        }
    }

    renderButton(){
        if(this.props.loading){
            return (
                <Spinner size="large"/>
            );
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="user@gmail.com"
                        onChangeText={this.onChangeEmail.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>



                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onChangePassword.bind(this)}
                    />
                </CardSection>

                {this.renderError()}

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: 'white'
    },
    textStyle: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 20
    }
});

const mapStateToProps = (state, ownProps) => {
    const { email, password, error, loading } = state.auth;
    return { email, password, error, loading }
}

export default connect(mapStateToProps, {
    EmailChanged,
    PasswordChanged,
    LoginUser
})(LoginForm);