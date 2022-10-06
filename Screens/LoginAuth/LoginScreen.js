import React,{useState, useCallback,useReducer,useEffect} from 'react'
import ButtonLoggin from '../../Components/UI/Button'
import { StyleSheet, Text, View,Dimensions,KeyboardAvoidingView, Alert, Button } from 'react-native';
import Input from '../../Components/UI/Input'
import WavyHeader from '../../Constants/WavyBackground';
import { useDispatch } from 'react-redux';
import * as authActions from '../../Store/Actions/auth'
import Colors from '../../Constants/Colors';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) =>{
  if(action.type ===FORM_INPUT_UPDATE){
     const UpdatedValues = {
           ...state.inputValues,
           [action.input]:action.value
     };
     const UpdatedValidities = {
          ...state.inputValidities,
          [action.input]:action.valid
     }
     let updatedFormValidation = true;
     for(const key in updatedFormValidation){
       updatedFormValidation= updatedFormValidation&& UpdatedValidities[key];
     }
     return {
       formIsValid: updatedFormValidation,
       inputValidities:UpdatedValidities,
       inputValues:UpdatedValues,
     }
  }
  return state;
}

const Login = props => {
    const [isLoading,setIsLoading] = useState(false);
    const [error,SetError] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
          if(error){
            Alert.alert('an error occurred',error,[
              {text:'okay'}
            ])
          }
    },[error])
    const authHandler = async() =>{
      console.log("asdasdas")
      let action = authActions.login(formState.inputValues.email,formState.inputValues.password)
        SetError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            // dispatch(authActions.isLoading());
            // props.navigation.navigate('Shop')
        } catch (err) {
            SetError(err.message)
            setIsLoading(false);
        }
    }
    const InputChangeHandler = useCallback((inputIdentifier,inputValue,inputValidity)=>{
        dispatchFormState({
          type:FORM_INPUT_UPDATE,
          value:inputValue,
          isValid:inputValidity,
          input:inputIdentifier
        })
    },[dispatchFormState]);
    const [formState, dispatchFormState] = useReducer(formReducer,{
      inputValues:{
        email:'',
        password:''
      },
      inputValidities:{
        email:false,
        password:false,
      },
      formIsValid:false
    });
    return(
        <View style={styles.All} >
           <WavyHeader customStyles={styles.svgCurve}/>
            <Text style={styles.header}>Tienda's LILI</Text>
            <KeyboardAvoidingView 
            style={styles.LoginContainer}
            behavior="height"
            keyboardVerticalOffset={-100}
            >
                <Input 
                id='email'
                label="E-Mail"
                keyboardType='email-address'
                required
                email
                autoCapitalize='none'
                max = {20}
                onErrorText='email desconocido'
                onInputChange = {InputChangeHandler}
                initialValue =""
                />
                <Input 
                id='password' 
                label='Password' 
                keyboardType='default'
                secureTextEntry
                required 
                minLength={5} 
                autoCapitalize='none' 
                errorText='please enter a valid password'
                onInputChange={InputChangeHandler}
                initialValue =""
                />
            <ButtonLoggin  title="Iniciar Sesión" OnPress={authHandler}/>
            </KeyboardAvoidingView>
        </View>
    )
}
export const screenOptions = {
  headerTitle:'',
  
}
const styles = StyleSheet.create({
    All:{
        flex:1,
    },
    header:{
      fontSize: 40,
      fontFamily:'lobster-regular',
      // change the color property for better output
      color: '#fff',
      textAlign: 'center',
      marginTop: 20
    },
    LoginContainer:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:40,
      
    },
    svgCurve: {
      position: 'absolute',
      width: Dimensions.get('window').width
    },
  });
  
export default Login;