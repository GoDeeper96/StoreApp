import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer,useRoute,useNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import {Platform,SafeAreaView,Button,View} from 'react-native'
import Colors from '../Constants/Colors'
import {Ionicons} from '@expo/vector-icons'
import React,{useEffect} from 'react'
import { Feather } from '@expo/vector-icons'; 
//SCREENS
import Login, {screenOptions as LoginDetalleScreenOptions} from '../Screens/LoginAuth/LoginScreen'
//STACK SCREENS
import Orders from '../Screens/Actions/OrdersScreen'
import Carrito from '../Screens/Actions/CartScreen'
import ClientesScreen from '../Screens/Actions/ClientesScreen'
import ActionNavigator , {screenOptions as ActionsScreenOptions} from './ActionsNavigator'
//DRAWER SCREENS
    //NESTED
    import AdministrarCuentasScreen from '../Screens/DrawersNested/AdministrarCuentasScreen';
    import PerfilScreen from '../Screens/DrawersNested/PerfilScreen'
    import RegistroScreen from '../Screens/DrawersNested/RegistroScreen'
import { useDispatch } from 'react-redux';


const defaultNav = {
    headerStyle:{
        backgroundColor: Platform.OS ==='android' ? Colors.Yatta: Colors.Yatta,
    },
    headerTitleStyle:{
        fontFamily:'lato-bold'
    },
    headerBackTitleStyle:{
        fontFamily:'lato-bold' //IOS
    },
    headerTintColor: Platform.OS ==='android' ?Colors.Dark  : Colors.Yatta
}

const Actions = createStackNavigator();
const ShopDrawer = createDrawerNavigator();
const AuthStackNavigator = createStackNavigator();





export const ShopNavigator = (navigation) =>{
    
    
    // const st = useNavigationState(state=>state.routes[state.index].name)
    // const state =  usePreviousRouteName();
    
    const config = props =>{ return (<View style={{flex:1,paddingTop:40}}>
    <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
    <DrawerItemList {...props}/>
  
    <View style={{marginHorizontal:70,borderRadius:20,radius:20,marginTop:20}}>
        <Button title='Cerrar Sesión' color={Colors.upc}onPress={()=>
        {
        dispatch(authActions.logout());
        // props.navigation.navigate('Auth');
        }}/>
    </View>
    </SafeAreaView>
    </View>)}
    const dispatch = useDispatch();
    // console.log(state)  
    return (<ShopDrawer.Navigator 
        screenOptions={{activeTintColor:Colors.upc}}
        screenListeners={{
            state: (e) => {
              // Do something with the state
              
            //   if(array[0].name!==array[1].name)
            //   {

            //   }
            //   console.log('state changed wtf', e.data.state.routes[0].state.routes);
              
            },
          }}
        drawerContent={config}>
        
        <ShopDrawer.Screen 
        name='Acciones'
        component={ActionNavigator} 

        options={
            {
            headerShown:false,
            
            headerTitle: 'It depends on something',
            drawerIcon: props =>
            <Ionicons 
            name={Platform.OS==='android '?'md-create':'ios-create'}
            size={23}
            color={props.color}/>
            }
        }
        />
       <ShopDrawer.Screen 
        name="Administrar cuentas y permisos"
        component={AdministrarCuentasScreen} 
        options={
            {
                
                drawerIcon: props =>
                <Ionicons 
                name={Platform.OS==='android '?'md-create':'ios-create'}
                size={23}
                color={props.color}/> 
                              
            }
        }/>
        <ShopDrawer.Screen 
        name="Perfil de cuenta"
        component={PerfilScreen} 
        options={
            {drawerIcon: props =>
                <Ionicons 
                name={Platform.OS==='android '?'md-create':'ios-create'}
                size={23}
                color={props.color}/> 
                             
            }
        }/>
      

        <ShopDrawer.Screen 
        name="Ordenes"
        component={Orders} 
        options={
            {drawerIcon: props =>
                <Ionicons  
                name={Platform.OS==='android '?'cart':'ios-cart'}
                size={24}
                color={props.color}/> 
                             
            }
        }/>
         <ShopDrawer.Screen 
        name="Carrito"
        component={Carrito} 
        options={
            {drawerIcon: props =>
                <Ionicons  
                name={Platform.OS==='android '?'cart':'ios-cart'}
                size={24}
                color={props.color}/> 
                             
            }
        }/>
        <ShopDrawer.Screen 
        name="Mis Clientes"
        component={ClientesScreen} 
        options={
            {drawerIcon: props =>
                <Ionicons  
                name={Platform.OS==='android '?'cart':'ios-cart'}
                size={24}
                color={props.color}/> 
                             
            }
        }/>
    </ShopDrawer.Navigator>)
}



export const AuthNavigator = () =>{
    return (
        <AuthStackNavigator.Navigator
        screenOptions={defaultNav}>
            <AuthStackNavigator.Screen
            name="Auth"
            component={Login}
            options={LoginDetalleScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    )
}
// import Informes, {screenOptions as InformesScreenOptions} from '../Screens/Actions/InformeScreen'
//     import EscanearProductoScreen, {screenOptions as EscanearProductoScreenOptions} from '../Screens/Actions/EscanearProductoScreen'
//     import CrearProductosScreen, {screenOptions as CrearProductosScreenOptions} from '../Screens/Actions/CrearProductosScreen'
//     import TiendaProductosScreen, {screenOptions as TiendaProductosScreenOptions} from '../Screens/Actions/TiendaProductosScreen'
// function useCurrent() {
//     return useNavigationState((state) =>
//       state.routes[state.index]?.name
//         ? state.routes[state.index].name
//         : 'None'
//     );
//   }
// export const ActionsNavigator = (props) =>{
//     // console.log("Pressss")
//     // const firstState = useNavigationState((state) =>
//     // state.routes[state.index]?.name ? state.routes[state.index].name
//     //   : 'None'
//     // );
//     // useEffect(() => {
//     //     props.navigation.addListener('focus', () => alert(firstState))
//     // }, [])
//     return(
//         <Actions.Navigator screenOptions={defaultNav} >
//             <Actions.Screen
            
//             name ="InicioMain"
//             component={MainScreen}
//             options={MainScreenOptions}
//             />   
//             <Actions.Screen
//             name ="InformesEstadisticosScreen"
//             component={Informes}
//             options={InformesScreenOptions}
//             />   
//             <Actions.Screen
//             name ="EscanearProductoScreen"
//             component={EscanearProductoScreen}
//             options={EscanearProductoScreenOptions}
//             />   
//             <Actions.Screen
//             name ="CrearProductosScreen"
//             component={CrearProductosScreen}
//             options={CrearProductosScreenOptions}
//             />   
//             <Actions.Screen
//             name ="TiendaProductosScreen"
//             component={TiendaProductosScreen}
//             options={TiendaProductosScreenOptions}
//             />  

//         </Actions.Navigator>
//     )
// }
// export const screenOptionsActions = navData => {
//     return {
    
//     />
//     // headerLeft:()=>(<Button title="Hola" styles={styles.button}/>),
//     }
// }

// function usePreviousRouteName() {
//     return useNavigationState((state) =>
//       state.routes[state.index]?.name
//         ? state.routes[state.index].name
//         : 'None'
//     );
//   }

// function Interface() {
//     return(
//         <Actions.Navigator screenOptions={defaultNav}>
//             <Actions.Screen
//             name ="ScreenMain"
//             component={MainScreen}
//             options={MainScreenOptions}
//             />
//             <Actions.Screen
//             name ="InformesEstadisticosScreen"
//             component={Informes}
//             options={InformesScreenOptions}
//             />   
//             <Actions.Screen
//             name ="EscanearProductoScreen"
//             component={EscanearProductoScreen}
//             options={EscanearProductoScreenOptions}
//             />   
//             <Actions.Screen
//             name ="TiendaProductosScreen"
//             component={CrearProductosScreen}
//             options={CrearProductosScreenOptions}
//             />   
//             <Actions.Screen
//             name ="CrearProductosScreen"
//             component={TiendaProductosScreen}
//             options={TiendaProductosScreenOptions}
//             />  
//         </Actions.Navigator>
//     )
// }