import React from 'react';
import { 
    StyleSheet, 
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import { store } from './../../store';
import { bindActionCreators } from 'redux';
import { clearNotification } from './../../actions/notification';
import Typography from './../Typography';
import {  useToastBannerToggler } from 'react-native-toast-banner';

const RegularBanner = ({ text }) => (
    <View style={styles.wrapper}>
        <Typography
            style={{textAlign: 'center'}}
            color={'#fff'}
            fontSize={16}
        >
            {text}
        </Typography>
    </View>
);

const color = {
    success: '#00C87C',
    error: '#FF3539'
};

const Notification = ({ actions, t }) => {
    const { showBanner, hideBanner } = useToastBannerToggler();

    const select = state => state.notification;

    let currentValue;

    const handleChange = () => {
        let previousValue = currentValue
        currentValue = select(store.getState());

        if (JSON.stringify(previousValue) === JSON.stringify(currentValue)) return;

        const { type, text } = currentValue;
    
        if (!type || !text) return;

        const isCyrillic = /[а-яА-ЯЁё]/.test(text);

        showBanner({
            contentView: <RegularBanner text={isCyrillic ? text : t(text)}/>,
            backgroundColor: color[type],
            onPress: () => hideBanner()
        });
        actions.clearNotification();
    };

    store.subscribe(handleChange);

    return null;
};

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15
    },
    topHeight: {
        height: 30
    }
});

const mapDispatchToProps = dispatch => ({
    actions: {
        clearNotification: bindActionCreators(clearNotification, dispatch)
    }
});
const mapStateToProps = () => ({});
const translated = translate('Notification')(Notification);

export default connect(mapStateToProps, mapDispatchToProps)(translated);