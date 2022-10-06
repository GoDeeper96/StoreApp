import React,{useEffect,useState} from 'react'
import { 
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { useNavigationState } from '@react-navigation/native';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../Constants/Colors'
import Card from '../../Components/UI/Card'
import HeaderA from "../../Components/UI/Header"
import Button from '../../Components/UI/Button'
import Carousel from 'react-native-snap-carousel';

const ActionIconsChart = () => {
    const renderItem = ({item}) =>{
        return (
            <View>
                <TexT>Aca podrian ir los demas icons pero no se me ocurren cuales podrian ser por ahora lo dejo asi.</TexT>
            </View>
        )
    }
    return (
        <View>

        </View>
    )
}

export default ActionIconsChart
