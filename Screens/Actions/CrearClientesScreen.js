import React,{useState,useCallback,useEffect,useRef,useReducer} from 'react'
import {View,Text,StyleSheet,ScrollView,Alert,KeyboardAvoidingView,ActivityIndicator,TouchableOpacity,Platform,Image} from 'react-native'
// import Button from '../../Components/UI/Card'
import { useSelector, useDispatch } from 'react-redux';
import * as clientActions from '../../Store/Actions/ClientesActions'
import Colors from '../../Constants/Colors'
import Card from '../../Components/UI/Card'
import { Button, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import SuperDuperInput from '../../Components/UI/SuperDuperInput'
import DateTimePicker from '@react-native-community/datetimepicker';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
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
const CrearClientesScreen = (props) => {
  let [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
 
  const [ShowDatePicker, setShowDatePicker] = useState(false);
  // const [HideDatePicker, setHideDatePicker] = useState(false);
  const cliId = props.route.params ? props.route.params.clientId : null;
  const editedClient = useSelector(state => state.clients.availableClients.find(cli => cli.idCliente === cliId));
  const [date, setDate] = useState(new Date(Date.UTC(2012, 11, 20, 3, 0, 0)));
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };
  
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      NameClientes: editedClient ? editedClient.NameProduct : '',
      DescriptionCliente: editedClient ? editedClient.DescriptionProduct : '',
      RazonSocial: editedClient ? editedClient.RazonSocial : '',
      Telefono: editedClient ? editedClient.Telefono : '',
      Dni: editedClient ? editedClient.Dni : '',
      Rubro: editedClient ? editedClient.Rubro : '',
    },
    inputValidities: {
      NameClientes: editedClient ? true : false,
      DescriptionCliente: editedClient ? true : false,
      RazonSocial: editedClient ? true : false,
      Telefono: editedClient ? true : false,
      Dni: editedClient ? true : false,
      Rubro: editedClient ? true : false,

    },
    formIsValid: editedClient ? true : false
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
      if (editedClient) {
        await dispatch(
          clientActions.updateClient(
            cliId,
            formState.inputValues.NameClientes,
            formState.inputValues.DescriptionCliente,
            formState.inputValues.RazonSocial,
            selectedImage,
            formState.inputValues.Telefono,
            date,
            formState.inputValues.Dni,
            formState.inputValues.Rubro,
          )
        );
      } else {
        await dispatch(
          clientActions.createClient(
            formState.inputValues.NameClientes,
            formState.inputValues.DescriptionCliente,
            formState.inputValues.RazonSocial,
            selectedImage,
            formState.inputValues.Telefono,
            date,
            formState.inputValues.Dni,
            formState.inputValues.Rubro,
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, cliId, formState]);

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
        flexDirection:'column',
        margin:7,
        backgroundColor:Colors.HeaderNavigator,
        borderRadius:10,
        elevation:5,
        alignItems:'center'}}>        
     <View>
      <View style={{flexDirection:'row',justifyContent: 'center'}}>
            <SuperDuperInput
                style={{height:60,width:320,margin:5,marginTop:10}}
                id = "NameClientes"
                type='Texto'
                label ={"Nombre del Cliente"}
                onInputChange={inputChangeHandler}     
                initialValue={editedClient ? editedClient.NameClientes : ''}
                initiallyValid={!!editedClient}
                required        
            />
          </View>   
          <View style={{flexDirection:'row',justifyContent: 'center'}}>
          <View style={{flexDirection:'column',justifyContent: 'center'}}>
            {ShowDatePicker?<DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                dateFormat ="day month year"
                display="default"
                onChange={onChange}
                />:null}
              <SuperDuperInput
                style={{height:60,width:140,marginTop:2,marginRight:8}}
                type='Fecha'
                ShowDateOptions={()=>{setShowDatePicker(true)}}
                
                RealDate={date}
                label ={"Edad"}
                required        
            />
            <SuperDuperInput
                style={{height:60,width:140,marginTop:2,marginRight:8}}
                id = "Telefono"
                type='NumeroTelefono'
                keyboardType='decimal-pad'
                maxLength ={9}
                label ={"Telefono"}
                onInputChange={inputChangeHandler}     
                initialValue={editedClient ? editedClient.Telefono : ''}
                initiallyValid={!!editedClient}
                required        
            />
            <SuperDuperInput
                style={{height:60,width:140,marginTop:2,marginRight:8}}
                id = "Dni"
                type='Dni'
                keyboardType='decimal-pad'
                label ={"Dni"}
                maxLength ={9}
                onInputChange={inputChangeHandler}     
                initialValue={editedClient ? editedClient.Dni : ''}
                initiallyValid={!!editedClient}
                required        
            />
            </View>
            {selectedImage!==null?
                (<Card style={styles.BackgroundImageContainer}>
                    <Image source={{uri:selectedImage.localUri}} style={styles.image}/>
                </Card>):(
                <TouchableOpacity activeOpacity={0.8} onPress={openImagePickerAsync}>
                    <Card style={styles.NoImageBK}>
                        <AntDesign name="upload" size={35} color="black" />
                        <Text style={{textAlign:'center',fontFamily:'lato-regular',fontSize:16}}>Subir Imagen</Text>
                    </Card>
                </TouchableOpacity>)
                }
          </View>   
          <View style={{flexDirection:'row',justifyContent: 'center'}}>
            <SuperDuperInput
                style={{height:60,width:320,margin:5,marginTop:10}}
                id = "RazonSocial"
                type='Texto'
                label ={"Razon social"}
                onInputChange={inputChangeHandler}     
                initialValue={editedClient ? editedClient.RazonSocial : ''}
                initiallyValid={!!editedClient}
                required        
            />
          </View> 
          
          <View style={{flexDirection:'row',justifyContent: 'center'}}>
            <SuperDuperInput
                style={{height:60,width:320,margin:5,marginTop:10}}
                id = "Rubro"
                type='Texto'
                label ={"Rubro"}
                onInputChange={inputChangeHandler}     
                initialValue={editedClient ? editedClient.Rubro : ''}
                initiallyValid={!!editedClient}
                required        
            />
          </View>
          <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
            
            
          </View>
          
          <View style={{flexDirection:'row',justifyContent: 'center'}}>
          <SuperDuperInput
              style={{height:60,width:320,margin:5,marginTop:10}}
              id="DescriptionCliente"
              type='Texto'
              label ={"Descripcion"}
              onInputChange={inputChangeHandler}     
              initialValue={editedClient ? editedClient.DescriptionCliente : ''}
              initiallyValid={!!editedClient}
              required        
          />    
          </View> 
        <Button style={{marginTop:60,borderRadius:10}} loading={isLoading} mode='outlined' onPress={submitHandler} color={Colors.PinkyBorder}>
          Crear Cliente
        </Button>           
    </View>                                               
    </KeyboardAvoidingView>
    
  )
}
const styles = StyleSheet.create({
    BackgroundImageContainer:{
        width:170,
        height:200,
        elevation:5,
        marginTop:5,
    },
    NoImageBK:{
        width:170,
        height:200,
        elevation:4,
        marginTop:5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        height:'100%',
        width:'100%',
        borderRadius:10,
    }
});
export const screenOptions = navData => {
  return {
  headerShown: true,
  headerTitle: 'Crear Clientes',
  // headerLeft:()=>(<Button title="Hola" styles={styles.button}/>),
  
  }
}
export default CrearClientesScreen