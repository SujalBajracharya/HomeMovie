import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./components/Layout";
import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react";
import itemReducer from "./redux/ItemReducer";
import cartReducer from "./redux/CartReducer";
import { Provider } from "react-redux";
import MyRoutes from "./MyRoutes";
import userReducer from "./redux/UserReducer";



function App() {
  const rootReducer = combineReducers({
    itemStore: itemReducer,
    cartStore: cartReducer,
    userStore: userReducer,
  });

  const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = createStore(persistedReducer);
  let persistor = persistStore(store);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MyRoutes />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
