import React from 'react'
import { View,TouchableOpacity, StyleSheet, Text,Image } from'react-native';
import Colors from '../../Constants/Colors';
const ActionCard = (props) => {
    return (
        <View style={styles.v}>
            <TouchableOpacity onPress={props.onPress} style={styles.to} activeOpacity={0.7}>
                <View style={styles.like}>
                    <Text style={styles.letter}>{props.title}</Text>
                </View>
                <View style={styles.MovingLetterContainer}>
                    <Text style={styles.MovingLetters}>{props.Short}</Text>
                </View>
                <View style={styles.bkContainer}>
                    <Image style={styles.img} source={props.Image}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    v:{
        opacity:10,
        margin:5,
        borderRadius:10,
        alignContent:'center',
        justifyContent: 'center',
        width:165,
        height:180,
        backgroundColor:Colors.Bluish,
        borderColor:Colors.Bluish,
        borderWidth:3,
        
    },
    to:{
        margin:5,
        height:'100%',
    },
    like:{
        padding:2,
        
    },
    letter:{
        fontFamily:'poppins-bold',
        textAlign:'center',
    },
    MovingLetterContainer:{
        padding:2,
        
    },
    MovingLetters:{
        fontFamily:'lato-regular',
        textAlign:'center',
    },
    bkContainer:{
        width:146,
        height:100,
        borderRadius:10,
        borderColor:Colors.HeaderNavigator,
        borderWidth:1,
        overflow:'hidden',
        elevation:5,
    },
    img:
    {
        
        width:'100%',
        height:'100%'
    }

})

export default ActionCard
