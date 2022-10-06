import React  from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { useSelector } from 'react-redux'

// import ShopNavigator from './ShopNavigator'
// import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import { InterfaceNavigator,AuthNavigator,ShopNavigator} from './InterfaceNavigator'
import Didtrytologin from '../Screens/init/didtrytologin'
const AppNavigator = props => {
    const isAuth = useSelector(state=>!!state.auth.token);
    const didTryAutoLogin = useSelector(state => !!state.auth.didTryAutoLogin);

    return (
    <NavigationContainer>
        {isAuth  &&<ShopNavigator/>}
        {!isAuth && didTryAutoLogin  && <AuthNavigator/>}
        {!isAuth && !didTryAutoLogin &&  <Didtrytologin/>}
    </NavigationContainer>);
}
export default AppNavigator;

