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


const ChartArray = ({actualData,height,width}) => {
    const renderItem = ({item})=>{
        // const ern = data.map(item=>item.earnings)
        return(
            <VictoryChart 
              width={width} 
              height={height} 
              theme={VictoryTheme.material} 
              domain={{y:[0,10000]}} 
              padding={50}
              domainPadding={{x:30}}>
                <HeaderA 
                styles={styles.headerA}
                headerTitle={item.Semestre+' ' +'-'+' '+item.Año}/>
              
                  <VictoryBar 
                  data={item.Data} 
                  x="quarter" 
                  y="earnings"  
                  alignment="middle"   
                  labels={ item.Data.map(item=>item.earnings) }/>
                  
                  
            </VictoryChart> 
        )
    }

    return (
        <Carousel
              layout='default'
              data={actualData}
              sliderWidth={width}
              itemWidth={width}
              itemHeight={height}
              renderItem={renderItem}
        />
    )
}
const styles = StyleSheet.create({
    headerA:{
        textDecorationLine:"underline",
        
      },
})
export default ChartArray
