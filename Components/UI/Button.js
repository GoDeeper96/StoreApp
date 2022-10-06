import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Colors from '../../Constants/Colors'
const Button = (props) =>{
    
    return (
        <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={props.OnPress} 
        
        >                       
        <View style={{...styles.button,...props.styles}}>
                    <Text 
                    style={{...styles.ButtonText,...props.btnTextStyles}}>{props.title}
                    </Text>  
        </View>                     
        </TouchableOpacity>
    );

}
const styles = StyleSheet.create(
    {
    button:{
        paddingVertical:13,
        paddingHorizontal:12,
        width:160,
        borderRadius:7,
        alignItems:'center',
        marginVertical:25,
        opacity:0.91,
        backgroundColor: Colors.GrayRare
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
        fontSize:16,
        color:Colors.primary,
        fontFamily:'poppins-bold'    
    }
    }
)

export default Button;