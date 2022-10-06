import React,{useEffect, useState} from 'react'
import { Button, Text, View,TouchableOpacity,StyleSheet,ScrollView } from 'react-native'
import { useNavigationState,useFocusEffect } from '@react-navigation/native';
import ActionCard from '../Components/UI/ActionCard';
import Escanear from '../assets/images/Escanear.jpg'
import Informes from '../assets/images/informes.jpg'
import Tienda from '../assets/images/t2.jpg'
import Crear from '../assets/images/cr2.jpg'
import Colors from '../Constants/Colors';
const MainScreen = (props) => {
    const CurrentState =  useNavigationState((state)=>state.routes[state.index]?.name ? state.routes[state.index].name:'none')
    // const [mainState,SetState] = useState('');
   
    // useFocusEffect(
    //     React.useCallback(() => {
    //       alert('Screen was focused');
          
    //       // Do something when the screen is focused
    //       return () => {
    //         alert('Screen was unfocused');
    //         SetState(CurrentState);
            
    //         // Do something when the screen is unfocused
    //         // Useful for cleanup functions
    //       };
    //     }, [mainState]));
    //     console.log(CurrentState + " " + mainState)
    // if(CurrentState!==mainState)
    // {
    //     console.log("qwdqwdqw")
    //     props.navigation.navigate('InicioMain')
    // }
    return (
        <ScrollView style={{flex:1,flexDirection:'column',margin:7,backgroundColor:Colors.Pinkythree,borderRadius:10,elevation:5}}>
            <View style={styles.hey}>   
                <ActionCard 
                onPress={()=>props.navigation.navigate('InformesEstadisticosScreen')}
                title={'Informes'}
                Short={'Informes Estadisticos de ultimos meses.'}
                Image={Informes}
                />
                <ActionCard 
                onPress={()=>props.navigation.navigate('EscanearProductoScreen')}
                title={'Escanear Producto'}
                Short={'Escanea el producto a comprar.'}
                Image={Escanear}
                />
            </View>
           <View style={styles.hey}>
                <ActionCard 
                onPress={()=>props.navigation.navigate('CrearProductosScreen')}
                title={'Crear Productos'}
                Short={'Crea un nuevo producto.'}
                Image={Crear}
                />
                <ActionCard 
                onPress={()=>props.navigation.navigate('TiendaProductosScreen')}
                title={'Tienda'}
                Short={'Mira los productos disponibles.'}
                Image={Tienda}
                />
            </View>
            <View style={styles.hey}>
                <ActionCard 
                onPress={()=>props.navigation.navigate('Carrito')}
                title={'Carrito de Compas'}
                Short={'Paga los productos de tu carrito'}
                Image={Crear}
                />
                <ActionCard 
                onPress={()=>props.navigation.navigate('Ordenes')}
                title={'Ordenes'}
                Short={'Visualiza tus ordenes hechas.'}
                Image={Tienda}
                />
            </View>
            <View style={styles.hey}>
                <ActionCard 
                onPress={()=>props.navigation.navigate('Clientes')}
                title={'Clientes'}
                Short={'Visualiza estados de clientes'}
                Image={Crear}
                />
                <ActionCard 
                onPress={()=>props.navigation.navigate('CrearClientesScreen')}
                title={'Crear Clientes'}
                Short={'Crea a tus clientes aquí.'}
                Image={Crear}
                />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    hey:{
        
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',

    }
})
export const screenOptions = navData => {
    return {
    headerShown:true,
    headerTitle: 'Inicio',
    headerStyle:{
       
    },
    headerTitleStyle:{
        fontFamily:'lato-regular',
    },

   
    // headerLeft:()=>(<Button title="Hola" styles={styles.button}/>),
    }
}
export default MainScreen
