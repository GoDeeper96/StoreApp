import React,{useState} from 'react'
import { View,TouchableOpacity, StyleSheet, Text,Image } from'react-native';
import Colors from '../../Constants/Colors';
// import { useSelector, useDispatch } from 'react-redux';
// import Card from '../../Components/UI/Card'
// import * as cartActions from '../../Store/Actions/CartActions'
// import { Button, TextInput } from 'react-native-paper';
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import HeaderA from '../../Components/UI/Header'
const ProductCardView = (props) => {
    
    return (
        <View style={{...styles.v,...props.PrincipalView}}>
            <TouchableOpacity onPress={props.onPress} style={{...styles.to,...props.toStyles}} activeOpacity={0.7}>
                <View style={{...styles.bkContainer,...props.ImageStyles}}>
                    <Image style={styles.img} source={{uri:props.Image}}/>                              
                </View>
            
                <View style={styles.like}>
                    <Text style={{...styles.letter,...props.tlt}}>{props.title}</Text>
                </View>
                <View style={styles.DescripcionContainer}>
                    <Text style={{...styles.DescripcionText,...props.dsts}}>{props.Descripcion}</Text>
                </View>
                <View style={styles.PrecioCompraContainer}>
                    <Text style={{...styles.PrecioCompra,...props.pcs}}>Precio de Compra: S/.{props.PrecioCompra}</Text>
                </View>
                <View style={styles.PrecioVentaContainer}>
                    <Text style={{...styles.PrecioVenta,...props.pcv}}>Precio de Venta: S/.{props.PrecioVenta}</Text>
                </View>
                <View style={styles.Tipo}>
                    <Text style={{...styles.TipoServicio,...props.tsv}}>Tipo: {props.TipoProducto}</Text>
                </View>
                <View style={{...styles.buttonsContainer,...props.scb}}>
                    <TouchableOpacity style={styles.sgt} onPress={props.EditProduct}>
                        <HeaderA headerTitle={'Editar'} styles={styles.textBtc}/>
                        <Feather name="edit" size={27} color={Colors.bestRed} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sgt} onPress={props.DeleteProduct} >
                        <HeaderA headerTitle={'Eliminar'}  styles={styles.textBtc} />
                        <AntDesign name="delete" size={27} color={Colors.bestRed} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sgt} onPress={props.addToCart}>
                        <HeaderA headerTitle={'Comprar'} styles={styles.textBtc} />
                        <Entypo name="shopping-cart" size={27} color={Colors.bestRed} />
                    </TouchableOpacity>
                    {/* <Button style={{marginHorizontal:1,marginTop:5,borderRadius:10,width:100}} loading={props.loadingActivity} mode='outlined' onPress={props.EditProduct} color={Colors.PinkyBorder}>
                        Editar
                    </Button>
                    <Button style={{marginHorizontal:2,marginTop:5,borderRadius:10,width:120}} loading={props.loadingActivity} mode='outlined' onPress={props.DeleteProduct} color={Colors.PinkyBorder}>
                        Eliminar
                    </Button>
                    <Button style={{marginHorizontal:2,marginTop:5,borderRadius:10,width:120}} loading={props.loadingActivity} mode='outlined' onPress={props.addToCart} color={Colors.PinkyBorder}>
                        Agregar
                    </Button> */}
                </View>
                </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    Tipo:{
        padding:2,
    },
    TipoServicio:{
        fontFamily:'lato-bold',
        textAlign:'center',
        fontSize:18
    },
    textBtc:{
        fontFamily:'lato-bold',
        fontSize:16,
        color:Colors.bestRed,
    },
    sgt:{
        alignItems: 'center',
        marginHorizontal:5,
        width:99,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:Colors.HeaderNavigator,
        borderColor:Colors.Pinkytwo
      },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        
    },
    v:{
        
        flex: 1,
        opacity:10,
        margin:5,
        borderRadius:10,
        alignItems: 'center',
        height:440,
        backgroundColor:Colors.StoreBK,
        borderColor:Colors.StoreBK,
        borderWidth:3,
     
    },
    PrecioCompraContainer:{
        padding:2,
    },
    PrecioVentaContainer:{
        padding:2,
    },
    PrecioCompra:{
        fontFamily:'lato-bold',
        textAlign:'center',
        fontSize:18
    },
    PrecioVenta:{
        fontFamily:'lato-bold',
        textAlign:'center',
        fontSize:18
    },
    to:{
        margin:5,
        height:'100%',
        justifyContent: 'center',
    },
    like:{
        padding:2,
        
    },
    letter:{
        fontFamily:'poppins-bold',
        textAlign:'center',
        fontSize:25
    },
    DescripcionContainer:{
        padding:2,
        
    },
    DescripcionText:{
        fontFamily:'lato-regular',
        textAlign:'center',
        fontSize:18 
    },

    
    bkContainer:{
       
        width:335,
        
        height:200,
        overflow:'hidden',
        backgroundColor:'white',
        elevation:5,
        borderRadius:10,
    },
    img:
    {
        
       
        width:'100%',
        height:'100%'
    }

})
export default ProductCardView
