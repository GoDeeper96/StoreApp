import React,{useEffect,useState,useCallback, useReducer} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Text, View,Image,StyleSheet,TouchableOpacity, Alert,KeyboardAvoidingView,ActivityIndicator,ScrollView} from 'react-native'
import Colors from '../../Constants/Colors'
import Card from '../../Components/UI/Card'
import { AntDesign } from '@expo/vector-icons'; 
import { Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import SuperDuperInput from '../../Components/UI/SuperDuperInput'
import * as productsActions from '../../Store/Actions/ProductActions'
import MyCustomPicker from '../../Components/UI/CustomPicker'
import MyButton from '../../Components/UI/ButtonApart'
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const motivos = [
  'Productos',
  'Servicios',
  'Otros',


]
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };
   
const CrearProductosScreen = (props) => {
    let [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpenMotivo,setModalOpenMotivo] = useState(false);
    const [MotivoGastoInicial,setMotivoInicial] = useState('Productos');
    const prodId = props.route.params ? props.route.params.productId : null;
    const editedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.idProduct === prodId)
    );
    // console.log(editedProduct);
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          NameProduct: editedProduct ? editedProduct.NameProduct : '',
          DescriptionProduct: editedProduct ? editedProduct.DescriptionProduct : '',
          PrecioVenta: editedProduct ? editedProduct.PrecioVenta : '',
          PrecioCompra: editedProduct ? editedProduct.PrecioCompra : '',
          
        },
        inputValidities: {
          NameProduct: editedProduct ? true : false,
          DescriptionProduct: editedProduct ? true : false,
          PrecioVenta: editedProduct ? true : false,
          PrecioCompra: editedProduct ? true : false,

        },
        formIsValid: editedProduct ? true : false
      });
    
    let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
  
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }
  
      setSelectedImage({ localUri: pickerResult.uri });
    };
    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );
      useEffect(() => {
        if (error) {
          Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
        }
      }, [error]);
      const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            console.log(formState.formIsValid,formState.inputValues,formState.inputValidities);
          Alert.alert('Wrong input!', 'Please check the errors in the form.', [
            { text: 'Okay' }
          ]);
          return;
        }
        // console.log(formState.formIsValid,formState.inputValues)
        setError(null);
        setIsLoading(true);
        try {
          if (editedProduct) {
            await dispatch(
              productsActions.updateProduct(
                prodId,
                formState.inputValues.NameProduct,
                formState.inputValues.DescriptionProduct,
                formState.inputValues.PrecioVenta,
                formState.inputValues.PrecioCompra,
                selectedImage.localUri,
                MotivoGastoInicial
              )
            );
          } else {
            await dispatch(
              productsActions.createProduct(
                formState.inputValues.NameProduct,
                formState.inputValues.DescriptionProduct,
                formState.inputValues.PrecioVenta,
                formState.inputValues.PrecioCompra,
                selectedImage.localUri,
                MotivoGastoInicial
              )
            );
          }
          props.navigation.goBack();
        } catch (err) {
          setError(err.message);
        }
    
        setIsLoading(false);
      }, [dispatch, prodId, formState]);

    if (isLoading) {
        return (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={{flex:1,
            flexDirection:'column',
            margin:7,
            backgroundColor:Colors.HeaderNavigator,
            borderRadius:10,
            elevation:5,
            alignItems:'center'}}>
            <ActivityIndicator size="large" color={Colors.Bluish} />
          </KeyboardAvoidingView>
        );
      }
    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-100} style={{
            flex:1,
            margin:7,
            backgroundColor:Colors.HeaderNavigator,
            borderRadius:10,
            elevation:5,
            alignItems:'center'}}>
                <ScrollView>
                {selectedImage!==null?
                (<Card style={styles.BackgroundImageContainer}>
                    <Image source={{uri:selectedImage.localUri}} style={styles.image}/>
                </Card>):(
                <TouchableOpacity  activeOpacity={0.8} onPress={openImagePickerAsync}>
                    <Card style={styles.NoImageBK}>
                        <AntDesign name="upload" size={35} color="black" />
                        <Text style={{textAlign:'center',fontFamily:'lato-regular',fontSize:16}}>Subir Imagen</Text>
                    </Card>
                </TouchableOpacity>)
                }
         <View>
         <View style={{flexDirection:'row',justifyContent: 'center'}}>
             <SuperDuperInput
                style={{height:60,width:320,margin:5,marginTop:10}}
                id = "NameProduct"
                type='Texto'
                label ={"Nombre del producto"}
                onInputChange={inputChangeHandler}     
                initialValue={editedProduct ? editedProduct.NameProduct : ''}
                initiallyValid={!!editedProduct}
                required        
             />
            </View>     
            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
             <SuperDuperInput
                style={{height:60,width:160,margin:5,marginTop:10}}
                id = "PrecioCompra"
                type='Precio'
                label ={"Precio de Compra"}
                keyboardType="decimal-pad"
                onInputChange={inputChangeHandler}     
                initialValue={editedProduct ? editedProduct.PrecioCompra : ''}
                initiallyValid={!!editedProduct}
                required        
             />
            <SuperDuperInput
                style={{height:60,width:150,margin:5,marginTop:10}}
                id = "PrecioVenta"
                type='Precio'
                label ={"Precio de Venta"}
                keyboardType="decimal-pad"
                onInputChange={inputChangeHandler}     
                initialValue={editedProduct ? editedProduct.PrecioVenta : ''}
                initiallyValid={!!editedProduct}
                required        
             />
            </View> 
            <View style={{flexDirection:'row',justifyContent: 'center'}}>
             <SuperDuperInput
                style={{height:60,width:320,margin:5,marginTop:10}}
                id="DescriptionProduct"
                type='Texto'
                label ={"Descripcion"}
                onInputChange={inputChangeHandler}     
                initialValue={editedProduct ? editedProduct.DescriptionProduct : ''}
                initiallyValid={!!editedProduct}
                required        
             />
             
            </View> 
            <View style={{flexDirection:'row',justifyContent: 'center'}}>
            <MyButton value={MotivoGastoInicial} HandlerOnPress={()=>setModalOpenMotivo(!modalOpenMotivo)}>Seleccione Tipo de Producto
                </MyButton>
            <MyCustomPicker
                  setModalOpen={setModalOpenMotivo}
                  modalOpen={modalOpenMotivo} 
                  value={MotivoGastoInicial} 
                  setValue={setMotivoInicial}
                  items = {motivos}
                  />
              </View>

           <Button style={{marginTop:5,borderRadius:10}} loading={isLoading} mode='outlined' onPress={submitHandler} color={Colors.PinkyBorder}>
               Crear Producto
           </Button>

        
            
        </View>               
                                    
        </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    BackgroundImageContainer:{
        width:320,
        height:280,
        elevation:5,
        margin:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    NoImageBK:{
        
        elevation:4,
        margin:10,
        justifyContent: 'center',
        width:320,
        height:280,
        alignItems: 'center',
    },
    image:{
        height:'100%',
        width:'100%',
        borderRadius:10,
    }
})
export const screenOptions = navData => {
    return {
        headerShown:true,
    headerTitle: 'Crear Productos',
    
    // headerLeft:()=>(<Button title="Hola" styles={styles.button}/>),
    }
}
export default CrearProductosScreen
