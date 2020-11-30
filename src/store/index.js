import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers'; 

const persistConfig = {
    key: 'app',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2 
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    pReducer,
    composeEnhancers(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
