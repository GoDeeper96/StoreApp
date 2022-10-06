import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Colors from '../../Constants/Colors'
import { AntDesign } from '@expo/vector-icons'; 
const Button = (props) =>{
    
    return (
        <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={props.OnPress} 
        style={styles.pm}
        >                       
        <View style={{...styles.button,...props.sn}}>
                    <Text 
                    style={{...styles.ButtonText,...props.btnTextStyles}}>{props.title+'   '}
                     <AntDesign  name={props.antDesign} size={24} color="black" />
                    </Text>  
                   
        </View>                     
        </TouchableOpacity>
    );

}
const styles = StyleSheet.create(
    {
        pm:
        {

            alignItems:'center'
        },
    button:{
        paddingVertical:13,
        paddingHorizontal:12,
        width:'80%',
        margin:10,
        borderRadius:7,
        alignItems:'center',
        marginVertical:25,
        opacity:0.91,
        borderColor:Colors.primary,
        

        backgroundColor: '#DFDFDF'
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.36,
        // shadowRadius: 6.68,      
        // elevation: 5,
        
    },

    ButtonText:{
        fontSize:17,
        color:Colors.primary,
        paddingBottom:8,
        fontFamily:'lato-bold'    
    }
    }
)

export default Button;