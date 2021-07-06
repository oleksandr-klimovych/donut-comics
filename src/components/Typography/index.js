
import React from 'react';
import { 
    StyleSheet,
    Text
} from 'react-native';

const fontFamilies = {
    regular: 'Montserrat_400Regular',
    medium: 'Montserrat_500Medium',
    bold: 'Montserrat_700Bold'
};

export default ({
    type = 'default',
    style = {},
    children
}) => (
    <Text 
        style={[
            styles[type],
            { ...style }
        ]}
        allowFontScaling={false}
    >
        {children}
    </Text>
);

const styles = StyleSheet.create({
    default: {
        fontSize: 17,
        lineHeight: 21,
        fontFamily: 'Montserrat_400Regular'
    },
    headline1: {
        fontSize: 20,
        lineHeight: 21,
        fontFamily: 'Montserrat_700Bold'
    }
});
