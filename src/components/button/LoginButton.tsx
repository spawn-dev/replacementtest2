import React from 'react';
import { View, TouchableOpacity, TouchableOpacityProperties, StyleSheet, ViewStyle } from 'react-native';

export interface ButtonProps extends TouchableOpacityProperties {
    contentContainerStyle?: ViewStyle;
}

const LoginButton: React.SFC<ButtonProps> = ({ style, contentContainerStyle, children, ...props }) => {
    return (
        <TouchableOpacity {...props} style={[styles.button, style]}>
            <View style={contentContainerStyle}>{children}</View>
        </TouchableOpacity>
    );
};

export default LoginButton;

const styles = StyleSheet.create({
    button: {
        width: '85%',
        marginLeft: '7.5%',
        marginRight: '7.5%',
        height: 50,
        backgroundColor: "#A8A7A7",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        borderRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.14
    }
});
