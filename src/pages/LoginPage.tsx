import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import LoginInput from "../components/input"
import LoginButton from "../components/button"
import { UserStore } from '../stores/UserStore';
import { getUIConstantFromFirebaseError } from '../components/error/auth';
import { RNFirebase } from 'react-native-firebase';
import { styleConstants } from '../config/constants';

interface Props {
    userStore: UserStore;
}

interface State {
    email?: string;
    password?: string;
}
export class Login extends React.Component<Props, State> {
    private onPressLoginButton = (): void => {
        if (false === this.validateInputs()) {
            return;
        }

        const { email, password } = this.state;
        //TODO: Hack this just to make progress on automation
        const userStore: UserStore = new UserStore()
        userStore.login(email!, password!).catch(error => {
            const alertString = getUIConstantFromFirebaseError(error);
            Alert.alert(alertString);
        })
            .then((user: RNFirebase.UserCredential) => {
                Alert.alert('User logged in successfully')
            });
    };

    private validateInputs(): boolean {
        if (this.state == null) {
            Alert.alert(loginUIStrings.ALERT_ENTER_EMAIL_AND_PASS);
            return false;
        }

        const { email, password } = this.state;

        if (email === '' || null == email) {
            Alert.alert(loginUIStrings.ALERT_ENTER_EMAIL);
            return false;
        }

        if (password === '' || null == email) {
            Alert.alert(loginUIStrings.ALERT_ENTER_PASS);
            return false;
        }

        return true;
    }

    private requiredFieldsEmpty(): boolean {
        if (this.state == null) {
            return true;
        }
        const { email, password } = this.state;
        if (!email || !password) {
            return true;
        } else if (email === '' || password === '') {
            return true;
        }
        return false;
    }

    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{loginUIStrings.LOGIN_TITLE}</Text>
                <LoginInput
                    title='Email*'
                    placeholder='Enter Your Email'
                    onChangeText={(email: string) => {
                        this.setState({ email: email })
                    }}
                    keyboardType="email-address"
                />
                <LoginInput
                    title='Password*'
                    secureTextEntry={true}
                    placeholder='Enter Your Password'
                    onChangeText={(password: string) => {
                        this.setState({ password: password })
                    }}
                />
                <LoginButton disabled={this.requiredFieldsEmpty()} onPress={this.onPressLoginButton}>
                    <Text >Login</Text>
                </LoginButton>
            </View>
        )
    }
}

const loginUIStrings = {
    APP_NAME: 'myapp',
    EMAIL_INPUT_PLACEHOLDER: 'Email',
    PASSWORD_INPUT_PLACEHOLDER: 'Password',
    ALERT_ENTER_EMAIL_AND_PASS: 'You must enter an email and a password',
    ALERT_ENTER_EMAIL: 'You must enter an email and a password',
    ALERT_ENTER_PASS: 'You must enter an email and a password',
    LOGIN_TITLE: 'Sign In To Your Account',
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.colors.APP_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
        paddingHorizontal: '7.5%',
    },
    title: {
        fontSize: styleConstants.fontSize.XX_LARGE,
        color: styleConstants.colors.TITLE_PRIMARY,
        fontWeight: styleConstants.fontWeight.BOLD,
        width: '100%',
    },
});

