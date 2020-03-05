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
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}
export class SignUp extends React.Component<Props, State> {
    private onPressSignUpButton = (): void => {
        if (false === this.validateInputs()) {
            return;
        }

        const { email, password, firstName, lastName, phoneNumber } = this.state;
        const displayName: string = `${firstName} ${lastName}`;
        const userStore: UserStore = new UserStore()
        userStore.signUp(email!, password!, displayName, phoneNumber).catch(error => {
            const alertString = getUIConstantFromFirebaseError(error);
            Alert.alert(alertString);
        })
            .then((user: RNFirebase.UserCredential) => {
                Alert.alert('User signed up successfully')
            });
    };

    private validateInputs(): boolean {
        if (this.state == null) {
            Alert.alert(signUpUIStrings.ALERT_ENTER_EMAIL_AND_PASS);
            return false;
        }

        const { email, password, firstName, lastName } = this.state;

        if (email === '' || null == email) {
            Alert.alert(signUpUIStrings.ALERT_ENTER_EMAIL);
            return false;
        }

        if (password === '' || null == email) {
            Alert.alert(signUpUIStrings.ALERT_ENTER_PASS);
            return false;
        }

        if (!firstName || firstName === '' || !lastName || lastName === '') {
            Alert.alert(signUpUIStrings.ALERT_ENTER_FIRST_AND_LAST);
            return false;
        }

        return true;
    }

    private requiredFieldsEmpty(): boolean {
        if (this.state == null) {
            return true;
        }
        const { email, password, firstName, lastName } = this.state;
        if (!email || !password || !firstName || !lastName) {
            return true;
        } else if (email === '' || password === '' || firstName === '' || lastName === '') {
            return true;
        }
        return false;
    }

    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{signUpUIStrings.SIGN_UP_TITLE}</Text>
                <LoginInput
                    title='First Name*'
                    placeholder='Enter Your First Name'
                    onChangeText={(firstName: string) => {
                        this.setState({ firstName: firstName })
                    }}
                />
                <LoginInput
                    title='Last Name*'
                    placeholder='Enter Your Last Name'
                    onChangeText={(lastName: string) => {
                        this.setState({ lastName: lastName })
                    }}
                />
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
                <LoginInput
                    title='Phone Number'
                    placeholder='Enter Your Phone Number'
                    onChangeText={(phoneNumber: string) => {
                        this.setState({ phoneNumber: phoneNumber })
                    }}
                    keyboardType="phone-pad"
                />
                <LoginButton disabled={this.requiredFieldsEmpty()} onPress={this.onPressSignUpButton}>
                    <Text>{signUpUIStrings.SIGN_UP}</Text>
                </LoginButton>
            </View>
        )
    }
}

const signUpUIStrings = {
    APP_NAME: 'myapp',
    EMAIL_INPUT_PLACEHOLDER: 'Email',
    PASSWORD_INPUT_PLACEHOLDER: 'Password',
    ALERT_ENTER_EMAIL_AND_PASS: 'You must enter an email and a password',
    ALERT_ENTER_EMAIL: 'You must enter an email and a password',
    ALERT_ENTER_PASS: 'You must enter an email and a password',
    ALERT_ENTER_FIRST_AND_LAST: 'You must enter an first and last name',
    SIGN_UP_TITLE: 'Sign Up For An Account',
    SIGN_UP: 'Sign Up',
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.colors.APP_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: '7.5%',
    },
    title: {
        fontSize: styleConstants.fontSize.XX_LARGE,
        color: styleConstants.colors.TITLE_PRIMARY,
        fontWeight: styleConstants.fontWeight.BOLD,
        width: '100%',
    },
});

