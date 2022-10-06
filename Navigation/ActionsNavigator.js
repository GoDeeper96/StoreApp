import {createStackNavigator} from '@react-navigation/stack'
// import { NavigationContainer,useRoute,useNavigationState } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import {Platform,SafeAreaView,Button,View} from 'react-native'
import Colors from '../Constants/Colors'
import {Ionicons} from '@expo/vector-icons'
import React,{useEffect} from 'react'
import MainScreen, {screenOptions as MainScreenOptions} from '../Screens/MainScreen'
// import Interface,{screenOptions as InterfaceScreenOptions} from '../Screens/Interface/InitScreen'
    //NESTED
    import Informes, {screenOptions as InformesScreenOptions} from '../Screens/Actions/InformeScreen'
    import EscanearProductoScreen, {screenOptions as EscanearProductoScreenOptions} from '../Screens/Actions/EscanearProductoScreen'
    import CrearProductosScreen, {screenOptions as CrearProductosScreenOptions} from '../Screens/Actions/CrearProductosScreen'
    import TiendaProductosScreen, {screenOptions as TiendaProductosScreenOptions} from '../Screens/Actions/TiendaProductosScreen'
    import Ordenes, {screenOptions as OrdenesScreenOptions} from '../Screens/Actions/OrdersScreen'
    import Carrito, { screenOptions as CarritoScreenOptions} from '../Screens/Actions/CartScreen'
    import Clientes,{ screenOptions as ClientesScreenOptions} from '../Screens/Actions/ClientesScreen'
    import CrearClientesScreen, {screenOptions as CrearClientesScreenOptions} from '../Screens/Actions/CrearClientesScreen'
const Actions = createStackNavigator();

export const ActionsNavigator = (props) =>{
    // console.log("Pressss")
    // const firstState = useNavigationState((state) =>
    // state.routes[state.index]?.name ? state.routes[state.index].name
    //   : 'None'
    // );
    // useEffect(() => {
    //     props.navigation.addListener('focus', () => alert(firstState))
    // }, [])
    return(
        <Actions.Navigator  >
            <Actions.Screen
            
            name ="InicioMain"
            component={MainScreen}
            options={MainScreenOptions}
            />   
            <Actions.Screen
            name ="InformesEstadisticosScreen"
            component={Informes}
            options={InformesScreenOptions}
            />   
            <Actions.Screen
            name ="EscanearProductoScreen"
            component={EscanearProductoScreen}
            options={EscanearProductoScreenOptions}
            />   
            <Actions.Screen
            name ="CrearProductosScreen"
            component={CrearProductosScreen}
            options={CrearProductosScreenOptions}
            />   
            <Actions.Screen
            name ="TiendaProductosScreen"
            component={TiendaProductosScreen}
            options={TiendaProductosScreenOptions}
            />  
            <Actions.Screen
            name ="Carrito"
            component={Carrito}
            options={CarritoScreenOptions}
            />  
            <Actions.Screen
            name ="Ordenes"
            component={Ordenes}
            options={OrdenesScreenOptions}
            />  
            <Actions.Screen
            name ="Clientes"
            component={Clientes}
            options={ClientesScreenOptions}
            />  
            <Actions.Screen
            name ="CrearClientesScreen"
            component={CrearClientesScreen}
            options={CrearClientesScreenOptions}
            />   
        </Actions.Navigator>
    )
}

export const screenOptions = navData => {
    return {
            headerShown:false,
            headerTitle: 'It depends on something',
            drawerIcon: props =>
            <Ionicons 
            name={Platform.OS==='android '?'md-create':'ios-create'}
            size={23}
            color={props.color}/> 
        }
    
}

export default ActionsNavigator;