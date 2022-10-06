import React,{useEffect} from 'react'
import { View, Text,StyleSheet,Dimensions,Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Easing } from 'react-native-reanimated';
const { width } = Dimensions.get("window");
const AnimatedLG = Animated.createAnimatedComponent(LinearGradient)
const SkeletonComponent = (props) => {
    const animatedValue = new Animated.Value(0);
    useEffect(() => {
        Animated.loop(
        Animated.timing(animatedValue,{
            toValue:1,
            duration:5000,
            easing:Easing.inOut(Easing.linear),
            useNativeDriver:true

        })
        ).start();
    })
    const translateX = animatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[-40,180]
    })
    return (
        <View style={{
            backgroundColor:"#a0a0a0",
            borderColor:"#b0b0b0",
            height:50,
            width:180
        }}>
         <AnimatedLG 
         colors={["#a0a0a0","#b0b0b0","#b0b0b0","#a0a0a0"]}
         start={{x:0,y:0}}
         end={{x:1,y:0}}
         style={{...StyleSheet.absoluteFill,
        transform:[{translateX: translateX}]}}
         />       
        </View>
    )
}
const styles = StyleSheet.create({

})
export default SkeletonComponent
