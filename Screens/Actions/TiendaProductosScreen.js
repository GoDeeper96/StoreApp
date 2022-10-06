import {createStackNavigator} from '@react-navigation/stack'
// import { NavigationContainer,useRoute,useNavigationState } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import {Platform,SafeAreaView,Button,View} from 'react-native'
import Colors from '../../Constants/Colors'
import {Ionicons} from '@expo/vector-icons'
import React,{useEffect} from 'react'
import VistaProductos, {screenOptions as VistaProductosOptions} from '../TiendaProductos/VistaProductos' 
import ProductosDetalle, {screenOptions as ProductosDetalleOptions} from '../TiendaProductos/ProductosDetalle'


const TiendaProductos = createStackNavigator();

export const TiendaProductosScreen = (props) =>{

    return(
        <TiendaProductos.Navigator  >
            <TiendaProductos.Screen           
            name ="TiendaInicio"
            component={VistaProductos}
            options={VistaProductosOptions}
            />   
            <TiendaProductos.Screen
            name ="ProductoDetalles"
            component={ProductosDetalle}
            options={ProductosDetalleOptions}
            />   
        </TiendaProductos.Navigator>
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

export default TiendaProductosScreen;
