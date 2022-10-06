import React,{useState} from 'react';
import { StyleSheet, View,} from 'react-native';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';
import LoginScreen from './Screens/LoginAuth/LoginScreen'
import { Provider } from 'react-redux'
import  ReduxThunk  from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import AppNavigator from './Navigation/AppNavigator'
import AuthReducer from './Store/Reducers/auth'
import Cart from './Store/Reducers/CartReducers'
import Orders from './Store/Reducers/OrderReducers'
import CardRed from './Store/Reducers/CartReducers'
import Products from './Store/Reducers/ProductReducers'
import Clients from './Store/Reducers/ClientesReducers'
import FileStructure from './Store/Reducers/FileStructureReducers'
import Files from './Store/Reducers/FileReducers'
import firebase from './Constants/Firebase'
// import { firebaseConfig } from './Constants/Firebase'
// import * as Firebase from 'firebase/app'
// import { configureStore } from '@reduxjs/toolkit';
const fetchFonts =()=>
{
  return Font.loadAsync(
    {
      'lato-regular':require('./assets/fonts/Lato-Regular.ttf'),
      'lato-light':require('./assets/fonts/Lato-Light.ttf'),
      'lato-bold':require('./assets/fonts/Lato-Bold.ttf'),
      'poppins-bold':require('./assets/fonts/Poppins-Bold.ttf'),
      'lobster-regular':require('./assets/fonts/Lobster-Regular.ttf'),
    });
};

const rootReducer = combineReducers({
  products: Products,
  auth:AuthReducer,
  cart: Cart,
  orders: Orders,
  files:Files,
  clients:Clients,
  cartred:CardRed,
  arrayFolders:FileStructure,

})
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
export default function App() {

  const [fontLoaded,SetFontLoaded] = useState(false);
  // if(!Firebase.getApps.length){
  //   Firebase.initializeApp(firebaseConfig)
  // }
  if(!fontLoaded){
    return(
        <AppLoading 
        startAsync={fetchFonts} 
        onFinish={()=>SetFontLoaded(true)} 
        onError={(err)=>console.log(err)}
    />
    )}
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// <View style={styles.container}>
    //   <LoginScreen/>
    // </View>