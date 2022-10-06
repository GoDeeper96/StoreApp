import React from 'react'
import { StyleSheet,View,Text } from 'react-native'
const HeaderA = (props) =>{
    return(
    <View style={{...styles.headerView,...props.headerViewStyles}}>
        <Text style={{...styles.headerStyle,...props.styles}}>{props.headerTitle}</Text>
    </View>)
}
export default HeaderA;
const styles = StyleSheet.create({
    headerView:{
        padding:8
    },
    headerStyle:{
        fontFamily:'poppins-bold',
        fontSize:18, 
        textAlign: 'center',
    }
})