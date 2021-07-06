import React from 'react';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { TranslatorProvider } from 'react-translate';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ToastBannerProvider,
  ToastBannerPresenter
} from 'react-native-toast-banner';
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import { persistor, store } from './src/store';
import RootScreen from './src/screens';
import translation from './src/translation';

export default () => {
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold
    });

    if (!fontsLoaded) return <AppLoading />; 

    return (
        <Provider store={store}>
            <TranslatorProvider translations={translation}>
                <PersistGate loading={null} persistor={persistor}>
                    <SafeAreaProvider>
                        <ToastBannerProvider>
                            <RootScreen />
                            <ToastBannerPresenter />
                        </ToastBannerProvider>
                    </SafeAreaProvider>
                </PersistGate>
            </TranslatorProvider>
        </Provider>
    );
};
