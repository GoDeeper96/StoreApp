import React,{useReducer,useEffect} from 'react';
import { StyleSheet,View ,Text}from 'react-native'
import { TextInput } from 'react-native-paper'
const INPUT_CHANGE='INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'
const inputReducer = (state,action) =>{
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value:action.value,
                isValid:action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched:true
            }
        default:
            return state;
    }
}
const Input = (props) =>{
    const { onInputChange, id} = props;
    const [inputState,dispatch] = useReducer(inputReducer,{
        value:props.initialValue? props.initialValue:'',
        isValid: props.initiallyValid,
        touched:false,
    })

    useEffect(() => {
        if(inputState.touched){
            onInputChange(id,inputState.value,inputState.isValid);
        }
    },[inputState,onInputChange,id])
    const textChangeHandler=text=>{
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (props.min != null && +text < props.min) {
        isValid = false;
        }
        if (props.max != null && +text > props.max) {
        isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
        }
        dispatch({type:INPUT_CHANGE,value:text, isValid:isValid})
    }
    const LostFocusHandler = () =>
    {
        dispatch({
            type:INPUT_BLUR
        })
    }
    return(
        <View style={styles.inputContainer}>
            <TextInput
            {...props}
            label={props.label}
            value={props.value}
            onBlur={LostFocusHandler}
            mode="outlined"
            outlineColor="#1C1818"
            theme={{ colors: { primary:"#BE254C",underlineColor:"#BE254C" } }}
            style={{width:200,fontFamily:'poppins-bold',fontSize:16}}
            onChangeText={textChangeHandler}/>
            
            {!inputState.isValid&&inputState.touched &&(
                <View>
                    <Text style={styles.errortxt}>{props.onErrorText}</Text>
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer:{
        alignItems: 'center',
        justifyContent:'center',
        marginVertical:10,
        height:50,
    },
    errortxt:{
        fontFamily:'lato-regular',
        color:'red',
        fontSize:14,
    }

})
export default Input;