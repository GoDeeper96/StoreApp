import React from 'react';
import { ScrollView,StyleSheet,View } from 'react-native'

const Carousel = (props)=>{
    return (
            <ScrollView horizontal pagingEnabled >
                    {props.children}
            </ScrollView>                
    )
}

export default Carousel;
