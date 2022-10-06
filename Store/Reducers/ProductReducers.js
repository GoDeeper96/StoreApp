import Product from '../../Models/Product';
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCT, UPDATE_PRODUCT } from '../Actions/ProductActions';

const initialState= {
    availableProducts: [],
    // userLetras:[]
    // availableLetras: [],
    // userLetras:[]
};

export default (state = initialState,action) =>{
    switch (action.type) {
        case SET_PRODUCT:
            return {
                availableProducts: action.productos,

            }
        case UPDATE_PRODUCT:
            const ProductsIndex = state.availableProducts.findIndex(product=>product.idProduct ===action.pid);
            const updatedProduct = new Product(
                action.pid,
                action.ProductData.NameProduct,
                action.ProductData.DescriptionProduct,
                action.ProductData.PrecioVenta,
                action.ProductData.PrecioCompra,
                action.ProductData.Img,
                action.ProductData.TipoProducto
            )
            const AvailableProductIndexes = state.availableProducts.findIndex(
                pdr=>pdr.idProduct===action.pid
            );
            const updatedAvailablePrd=[...state.availableProducts];
            updatedAvailablePrd[AvailableProductIndexes] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailablePrd,
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
            action.ProductData.idProduct,
            action.ProductData.NameProduct,
            action.ProductData.DescriptionProduct,
            action.ProductData.PrecioVenta,
            action.ProductData.PrecioCompra,
            action.ProductData.Img,
            action.ProductData.TipoProducto
            );
            return{
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts:state.availableProducts.filter(product=>product.idProduct!==action.pid),
                
            };
    }
    return state;
}