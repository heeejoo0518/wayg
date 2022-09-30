import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
// import reportWebVitals from './reportWebVitals';
// import styles from "./styles.css"
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { combineReducers, legacy_createStore as createStore } from "redux";
import { persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { counter } from '@fortawesome/fontawesome-svg-core';

const SAVE = "SAVE";
export const save = (token, userNo, results) => {
    return { type: SAVE, token, userNo, results }
};

const init = () => ({
    counter: {token: "", userNo: 268, results: [] }
  });

const counterReducer = (state = init(), action) => {
    switch (action.type) {
        case SAVE: {
            console.log(action)
            return {
                ...state,
                counter: {
                    token: action.token,
                    userNo: action.userNo,
                    results: action.results,
                }
            };
        }

        default: {
            return state;
        }
    }
};

const counterPersistConfig = {
    key: "counter",
    storage: storage
};

const rootReducer = combineReducers({
    counterReducer: persistReducer(counterPersistConfig, counterReducer)
  });

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={"Loading"} persistor={persistor}>
            <App />
        </PersistGate>
        
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
