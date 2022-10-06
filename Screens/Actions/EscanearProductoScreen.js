import React,{useEffect} from 'react'
import { Text, View ,Button} from 'react-native'
import { useNavigationState } from '@react-navigation/native';
const EscanearProductoScreen = (props) => {
    const state =  useNavigationState((state)=>state.routes[state.index]?.name ? state.routes[state.index].name:'none')
    console.log(state)
    return (
        <View>
            <Text>EscanearProductos</Text>
        </View>
    )
}
export const screenOptions = navData => {
    return {
    headerShown: true,
    headerTitle: 'Escanear Productos',
    // headerLeft:()=>(<Button title="Hola" styles={styles.button}/>),
    
    }
}
export default EscanearProductoScreen
