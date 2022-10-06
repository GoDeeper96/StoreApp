import React from 'react'
import { StyleSheet,View,Text } from 'react-native'
import Colors from '../../Constants/Colors';
const HeaderB = (props) =>{
    return(
    <View style={{...styles.headerView,...props.headerViewStyles}}>
        <Text style={{...styles.headerStyle,...props.styles}} {...props}>{props.headerTitle}</Text>
    </View>)
}
export default HeaderB;
const styles = StyleSheet.create({
    headerView:{
        padding:4
    },
    headerStyle:{
        fontFamily:'lato-bold',
        fontSize:15, 
        textAlign: 'center',
        color:Colors.Pinkythree

    }
})