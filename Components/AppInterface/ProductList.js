import React from 'react';
import { View, FlatList,StyleSheet} from 'react-native'
import ProductCardView from './ProductCardView'
const ProductList = (props) =>{
    const renderProductItem = itemData =>{
        return(
            <ProductCardView 
       onPress={()=>props.navigation.navigate('ProductoDetalles')}
       title={'Chocolate Rein'}
       Descripcion={'65 gramos de Chocolate puro'}
       PrecioCompra = {'S/.56.50'}
       PrecioVenta = {'S/.60.50'}
       Image={Test}
      />
        )
    }
    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderProductItem}
                style={{ width: '100%' }}
            />
        </View>
    )
}

export default ProductList;