import React,{useState,useCallback,useEffect,useRef,useReducer} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as ordersActions from '../../Store/Actions/OrderActions'
import {View,Text,StyleSheet,ScrollView,Alert,KeyboardAvoidingView,ActivityIndicator,TouchableOpacity,FlatList} from 'react-native'
import Colors from '../../Constants/Colors'
import OrderItem from '../../Components/AppInterface/OrderItem'
// import CartItem from '../../Components/AppInterface/CartItem'
const OrdersScreen = () => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();
  
    useEffect(() => {
      setIsLoading(true);
      dispatch(ordersActions.fetchOrders()).then(() => {
        setIsLoading(false);
      });
    }, [dispatch]);
    if (isLoading) {
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        );
      }
    
      if (orders.length === 0) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No order found, maybe start ordering some products?</Text>
          </View>
        );
      }
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
                />
      )}
    />
    )
}
const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
export const screenOptions = navData => {
    return {
        headerShown: true,

        headerTitle:'Ordenes',
        headerTitleStyle:{
            fontFamily:'lato-regular',
        },
        
    // headerTitle: 'Hola',
    // headerLeft:()=>(<Button title="Hola" styles={styles.button}/>),
    
    }
}
export default OrdersScreen
