import React from 'react';
import { StyleSheet, TextInput, TextInputProperties, TextStyle, View } from 'react-native';
import { styleConstants } from '../../config/constants';

function getPlaceholderStyle(props: TextInputProperties): TextStyle {
    return props.value ? {} : styles.placeholderFont;
}

const Input: React.SFC<TextInputProperties> = ({ style, ...props }) => {
    return (
        <View style={styles.maxWidth}>
            <TextInput
                {...props}
                style={[styles.input, style, getPlaceholderStyle(props)]}
                placeholder={props.placeholder}
                placeholderTextColor={styleConstants.colors.TOS_BODY_COPY}
                autoCorrect={false}
                spellCheck={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        color: styleConstants.colors.TOS_BODY_COPY,
        backgroundColor: styleConstants.colors.INPUT_BACKGROUND,
        width: '85%',
        marginLeft: '7.5%',
        marginRight: '7.5%',
        height: 50,
        marginTop: 20,
        paddingBottom: 0,
        borderColor: styleConstants.colors.INPUT_BACKGROUND_BORDER,
        borderRadius: 5,
        borderWidth: 1,
    } as TextStyle,
    maxWidth: {
        width: '100%'
    },
    placeholderFont: {
        color: styleConstants.colors.TOS_BODY_COPY,
        fontSize: 16,
        opacity: 1.0
    }
});

export default Input;
