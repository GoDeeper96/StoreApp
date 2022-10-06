import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../Constants/Colors';
import CartItem from '../../Components/AppInterface/CartItem';
import Card from '../../Components/UI/Card';
import * as cartActions from '../../Store/Actions/CartActions';
import * as ordersActions from '../../Store/Actions/OrderActions';
import { Title } from 'react-native-paper';
const CartScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const sum = useSelector(state => state.cart.sum);
  console.log("qwdqw: ",sum);

  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

    return (
        <View style={styles.screen}>
        <Card style={styles.summary}>
          <Title style={styles.summaryText}>
            Total:{' '}
            <Text style={styles.amount}>
            ${(Math.round(cartTotalAmount.toFixed(2) * 100) / 100).toFixed(2)}
            </Text>
          </Title>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.Bluish} />
          ) : (
            <Button
              color={Colors.Bluish}
              title="Order Now"
              disabled={cartItems.length === 0}
              onPress={sendOrderHandler}
            />
          )}
        </Card>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      </View>
    )
}
export const screenOptions = navData => {
    return {
        headerShown: true,

        headerTitle:'Carrito de Compras',
        headerTitleStyle:{
            fontFamily:'lato-regular',
        },
        
    // headerTitle: 'Hola',
    // headerLeft:()=>(<Button title="Hola" styles={styles.button}/>),
    
    }
}
const styles = StyleSheet.create({
    screen: {
      margin: 20
    },
    summary: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      padding: 10
    },
    summaryText: {
      // fontFamily: 'lato-regular',
      fontSize: 18
    },
    amount: {
      color: Colors.Bluish
    }
  });
export default CartScreen
