import React,{useState,useCallback,useEffect} from 'react'
import { Text, View,TouchableOpacity,StyleSheet,ActivityIndicator,Platform,FlatList,Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as productActions from '../../Store/Actions/ProductActions'
import * as cartActions from '../../Store/Actions/CartActions'
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../Constants/Colors'
// import Card from '../../Components/UI/Card'
import Button from '../../Components/UI/Button'
import ProductCardView from '../../Components/AppInterface/ProductCardView';
import Test from '../../assets/images/img1.jpg'

const VistaProductosScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    console.log(products)
    // const state =  useNavigationState((state)=>state.routes[state.index]?.name ? state.routes[state.index].name:'none')
    // console.log(state)
    const deleteHandler = id => {
      Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            dispatch(productActions.deleteProduct(id));
          }
        }
      ]);
    };
    const loadProducts = useCallback(async () => {
        
        setError(null);
        setIsRefreshing(true);
        try {
          await dispatch(productActions.fetchProducts());
        } catch (err) {
          setError(err.message);
        }
        setIsRefreshing(false);
      }, [dispatch, setIsLoading, setError]);
    
      useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadProducts);
    
        return () => {
          unsubscribe();
        };
      }, [loadProducts]);
      
      useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
          setIsLoading(false);
        });
      }, [dispatch, loadProducts]);
      const editProductHandler = id => {
        console.log("el id:"+id);
        props.navigation.navigate('CrearProductosScreen', { productId: id });
      };
      const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductoDetalles', {
          productId: id,
          productName: title
        });
      };
      if (error) {
        return (
          <View style={styles.centered}>
            <Text>An error occurred!</Text>
            <Button
              title="Try again"
              onPress={()=>loadProducts}
              color={Colors.Bluish}
            />
          </View>
        );
      }
    
      if (isLoading) {
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.Bluish} />
          </View>
        );
      }
    
      if (!isLoading && products.length === 0) {
        return (
          <View style={styles.centered}>
            <Text>No products found. Maybe start adding some!</Text>
          </View>
        );
      }
    
    return (
    <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={item=>item.idProduct}
        renderItem={itemData =>
            (
            <View style={{flex:1,flexDirection:'column',margin:7,backgroundColor:Colors.StoreBK,borderRadius:10,elevation:5}}>
                <ProductCardView 
                onPress={()=>selectItemHandler(itemData.item.idProduct,itemData.item.NameProduct)}
                title={itemData.item.NameProduct}
                Descripcion={itemData.item.DescriptionProduct}
                PrecioCompra = {itemData.item.PrecioCompra}
                PrecioVenta = {itemData.item.PrecioVenta}
                TipoProducto = {itemData.item.TipoProducto}
                Image={itemData.item.Img}
                addToCart={()=>{dispatch(cartActions.addToCart(itemData.item))}}
                EditProduct={()=>{editProductHandler(itemData.item.idProduct)}}
                DeleteProduct={deleteHandler.bind(this, itemData.item.idProduct)}
                
                />
            </View>
            )
        }
    />
    
    )
}
const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
  });
  
export const screenOptions = navData => {
    return {
        headerShown: true,
        headerTitle:'Tienda',
        // headerTitle: 'Hola',
        // headerLeft:()=>(<Button title="Hola" styles={styles.button}/>),
            // headerRight:()=>(<Button title="Hola" />),
    }
}
export default VistaProductosScreen
