import { TextInput,List,IconButton,Caption } from 'react-native-paper'
import React,{useReducer,useEffect,useState} from 'react'
import {View , Text,StyleSheet} from 'react-native'
// import DatePicker from '@react-native-community/datetimepicker';
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
const SuperDuperInput = props =>{
    const [ShowDatePicker, setShowDatePicker] = useState(false);
    const [ inputState,dispatch] = useReducer(inputReducer,{
        value:props.initialValue? props.initialValue:'',
        isValid: props.initiallyValid,
        touched:false,
    })
    const { onInputChange, id} = props
    useEffect(() => {
        if(inputState.touched){
            onInputChange(id,inputState.value,inputState.isValid);
        }
    },[inputState,onInputChange,id])
    const getType = (text) =>{
        let isValid = true;
        
        if(props.type==='Texto'){
            var regex = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/  
            if((regex.test(text)))
            {
                console.log("VALIDO")      
                isValid = true; 
            }   
            else
            {
                console.log("INVALIDO") 
                isValid = false; 
            }
        }
        if(props.type==='Precio'){
            var regex =/^\d*\.?\d*$/; //NO COMAS NI ;
            var valorString = text.toString() //CONVIERTE VALOR NUMERICO A STRING
            var regExp = /^0[0-9].*$/ // NO ACEPTA 000.0005 
            console.log("herllo")
            if((regex.test(text)&&!regExp.test(valorString)))
            {
                console.log("VALIDO") 
                isValid = true;    
            }
            else{
                console.log("INVALIDO") 
                isValid = false;
            }
        }
        if(props.type==='NumeroTelefono'){
            var regex =/^\d*\.?\d*$/; //NO COMAS NI ;
            var valorString = text.toString() //CONVIERTE VALOR NUMERICO A STRING
            var regExp = /^0[0-9].*$/ // NO ACEPTA 000.0005 
            console.log("herllo")
            // &&props.maxLength==9
            if((regex.test(text)&&!regExp.test(valorString)))
            {
                console.log("VALIDO") 
                isValid = true;    
            }
            else{
                console.log("INVALIDO") 
                isValid = false;
            }
        }
        if(props.type==='Dni'){
            var regex =/^\d*\.?\d*$/; //NO COMAS NI ;
            var valorString = text.toString() //CONVIERTE VALOR NUMERICO A STRING
            var regExp = /^0[0-9].*$/ // NO ACEPTA 000.0005 
            console.log(text.length)
            console.log(text.length>=7||text.length<=9)
            // &&(props.maxLength>=7||props.maxLength<=9)
            if((regex.test(text)&&!regExp.test(valorString)&&(text.length>=7&&text.length<=9)))
            {
                console.log("VALIDO") 
                isValid = true;    
            }
            else{
                console.log("INVALIDO") 
                isValid = false;
            }
        }
   
        dispatch({type:INPUT_CHANGE,value:text, isValid:isValid})
    }
   
    const LostFocusHandler = () =>
    {
        dispatch({
            type:INPUT_BLUR
        })
    }
    // const cp = null;
    // if(ShowDatePicker)
    // {
    //     cp = ( <DateTimePicker
    //     testID="dateTimePicker"
    //     value={date}
    //     mode={'date'}
    //     is24Hour={true}
    //     display="default"
    //     onChange={onChange}
    //     />)
    // }
    return(
        <View style={styles.inputContainer}>
      {props.type==='Fecha' ?
        
        <View style={styles.ccn}>
        <Caption style={styles.text}>{props.RealDate?props.RealDate.getDate()+'/'+(+props.RealDate.getMonth()+1)+'/'+props.RealDate.getFullYear():'Edad:'}</Caption>
        <IconButton style={styles.icn} onPress={props.ShowDateOptions} icon="calendar" size={20}/>

      </View>:
        <TextInput
      {...props}
       
      type={props.type}
      label={props.label}
      value={inputState.value}
      onBlur={LostFocusHandler}
      left={props.type==='Precio' ?<TextInput.Affix text="S/." />:null}      
    //   right={props.type==='Fecha' ?<TextInput.Icon onPress={props.ShowDateOptions} icon="calendar" />:null}
      
      mode="flat"
      // outlineColor="#E15B5B"
      // theme={{ colors: { primary:"#BE254C",underlineColor:"#BE254C" } }}
      theme={{ colors: { primary:"#000000",underlineColor:"#000000" } }}
      onChangeText={getType}
      style={{... { backgroundColor:!inputState.isValid&&inputState.touched?'#CA7878':null},...props.style}}
      />}
         
       
      
        {/* {!inputState.isValid&&inputState.touched &&(
            <View>
                <Text style={styles.errorText}>{props.errorText}</Text>
            </View>
        )} */}
    </View>)
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#888",
       
        
      },
      ccn:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor : "gray",
        alignItems: 'center',
        justifyContent: 'space-between',
        width:140,
        height:55,
      },
      icn:{
        

      },
      title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
      },
      datePickerStyle: {
        width: 140,
      },
      text: {
        textAlign: 'left',
        marginLeft:12,
        fontSize: 16,
        color :"#888888"
      }
   
})
export default SuperDuperInput;