import Product from "../../Models/Product"
import AsyncStorage from '@react-native-async-storage/async-storage';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProducts = () =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json
    return async (dispatch,getState) =>{
        try {
        const userId = getState().auth.userId;
        const response = await fetch('https://lili-9fb6d-default-rtdb.firebaseio.com/productos.json');
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        const loadedProducts = [];
        for(const producto in resData){
            loadedProducts.push(
                new Product(
                    producto,
                    resData[producto].NameProduct,
                    resData[producto].DescriptionProduct,
                    resData[producto].PrecioVenta,
                    resData[producto].PrecioCompra,
                    resData[producto].Img,     
                    resData[producto].TipoProducto,    
                )
            );
        }
        dispatch({
            type:SET_PRODUCT,
            productos:loadedProducts,
            
        })
        } catch (error) {
            throw error;
        }    
    }
}
export const createProduct = 
    (
    // id,
    // idUsuario,
    NameProduct,
    DescriptionProduct,
    PrecioVenta,
    PrecioCompra,
    Img,
    TipoProducto
    ) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json?auth=${token}
    return async (dispatch,getState)=>{
     //ANY ASYNC CODE YOU WANT
     const token = getState().auth.token;
     const userId = getState().auth.userId;
     const response = await fetch(`https://lili-9fb6d-default-rtdb.firebaseio.com/productos.json?auth=${token}`
     ,{
         method:'POST',
         headers:{
             'Content-Type':'application/json'
         },
         body:JSON.stringify({
            NameProduct,
            DescriptionProduct,
            PrecioVenta,
            PrecioCompra,
            Img,
            TipoProducto
         })
     });
     const resData = await response.json();

    //  console.log(resData);
      dispatch({
        type:CREATE_PRODUCT,
        ProductData:{
        idProducto:resData.name,
        NameProduct,
        DescriptionProduct,
        PrecioVenta,
        PrecioCompra,
        Img,
        TipoProducto
      }
    }
    ); 
    
    }
    
}
export const deleteProduct = productoId =>{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}
    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const res = await fetch(`https://lili-9fb6d-default-rtdb.firebaseio.com/productos/${productoId}.json?auth=${token}`,{
        method:'DELETE'
        });
        
        if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
            type:DELETE_PRODUCT,pid:productoId
        })
    }
}
export const updateProduct = (
    idProduct,
    NameProduct,
    DescriptionProduct,
    PrecioVenta,
    PrecioCompra,
    Img,
    TipoProducto
    ) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}
    return async (dispatch,getState)=>{
        // console.log(getState);
        const token = getState().auth.token;
        const res = await fetch(
            `https://lili-9fb6d-default-rtdb.firebaseio.com/productos/${idProduct}.json?auth=${token}`
            ,{
             method:'PATCH', //PUT VA A SOBREESCRIBAR SOBRE LA NUEVA DATA, PATCH VA A ACTUALIZAD DONDE DGIAS QUE ACTUALICE
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                NameProduct,
                DescriptionProduct,
                PrecioVenta,
                PrecioCompra,
                Img,
                TipoProducto
             })
         });
         if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
        type:UPDATE_PRODUCT,
        pid:idProduct,
        ProductData:{
            NameProduct,
            DescriptionProduct,
            PrecioVenta,
            PrecioCompra,
            Img,
            TipoProducto
        }
    });
        
    }

}

