import { View, Text } from "react-native";
import React from "react";
//Redux
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import HomeSlice from "./src/store/HomeSlice";
import AuthSlice from "./src/store/AuthSlice";

import Navigation from "./src/navigation";

// import { store } from './src/store/store'

export const allReducers = combineReducers({
  product: HomeSlice,
  auth: AuthSlice
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, allReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      serializableCheck: false,
    }),
});

export default function App() {
  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
