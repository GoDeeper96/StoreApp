import React,{useState,useCallback,useEffect} from 'react'
import { Text, View,TouchableOpacity,StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../Constants/Colors'
// import Card from '../../Components/UI/Card'
// import Button from '../../Components/UI/Button'
import ProductCardView from '../../Components/AppInterface/ProductCardView';
import Test from '../../assets/images/img1.jpg'
import * as productActions from '../../Store/Actions/ProductActions'
import * as cartActions from '../../Store/Actions/CartActions'
import { ScrollView } from 'react-native-gesture-handler';
const ProductosDetalle = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.idProduct === productId)
    );
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
    const dispatch = useDispatch();
    console.log(selectedProduct.Img.localUri)
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
      const editProductHandler = id => {
        console.log("el id:"+id);
        props.navigation.navigate('CrearProductosScreen', { productId: id });
      };
    return (
        <ScrollView>
          <ProductCardView 

           title={selectedProduct.NameProduct}
           Descripcion={selectedProduct.DescriptionProduct}
           PrecioCompra = {selectedProduct.PrecioCompra}
           PrecioVenta = {selectedProduct.PrecioVenta}
           Image={selectedProduct.Img}
           TipoProducto={selectedProduct.TipoProducto}
           PrincipalView={styles.principal} 
           ImageStyles={styles.bgstyles}
           toStyles={styles.tost}
           tlt={styles.title}
           dsts={styles.desc}
           pcs={styles.pcompra}
           pcv={styles.pcventa}
           scb={styles.quepajo}
           addToCart={()=>{dispatch(cartActions.addToCart(selectedProduct))}}
           EditProduct={()=>{editProductHandler(selectedProduct.idProduct)}}
           DeleteProduct={deleteHandler.bind(this, selectedProduct.idProduct)}
                
          />
    </ScrollView>
      
        )
}
export const screenOptions = navData => {
    return {
      headerTitle: navData.route.params.productTitle
    };
  };
const styles = StyleSheet.create({
    quepajo:{
      
      marginTop:12
    },
    principal:{
      justifyContent: 'center', 
      alignItems: 'center' ,
      height:600,
      backgroundColor:Colors.StoreBK,
      borderWidth:1,
      
        
    },
    tost:{
      justifyContent: 'center', 
      alignItems: 'center' ,       
    },
    bgstyles:{
        width:300,
        height:300,
       
    },
    title:{
        fontSize:34,
        fontFamily:'lobster-regular'
    },
    desc:{
        fontSize:20,
        
    },
    pcompra:{
        fontSize:22,
        fontFamily:'lobster-regular'
        
    },
    pcventa:{
        fontSize:22,
        fontFamily:'lobster-regular'
    },

})
// export const screenOptions = navData => {
//     const routeParams = navData.route.params ? navData.route.params : {}
//     return {
//             headerShown:true,
//             headerTitle: 'Nombre del Producto',
//             drawerIcon: props =>
//             <Ionicons 
//             name={Platform.OS==='android '?'md-create':'ios-create'}
//             size={23}
//             color={props.color}/> 
//         }
    
// }
export default ProductosDetalle
