import React,{useEffect,useRef} from 'react'
import { View, Text,StyleSheet,Dimensions,Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Easing } from 'react-native-reanimated';
import CarouselList from '../Components/AppInterface/ChartArray'
const dataCurrent = [
    {
      Semestre:"PrimerCuatrimestre",
      Año:"2020",
        Data:[{ quarter: "Enero", earnings: 2332 },
             { quarter: "Febrero", earnings: 4423 },
             { quarter: "Marzo", earnings: 5551 },
             { quarter: "Abril", earnings: 3585 }]
      },
      {
        Semestre:"SegundoCuatrimestre",
        Año:"2020",
          Data:[{ quarter: "Mayo", earnings: 2366 },
                { quarter: "Junio", earnings: 10000 },
                { quarter: "Julio", earnings: 6222 },
                { quarter: "Agosto", earnings: 2344 }]
      },
      {
        Semestre:"TercerCuatrimestre",
        Año:"2020",
          Data:[{ quarter: "Septiembre", earnings: 8012 },
               { quarter: "Octubre", earnings: 6000 },
               { quarter: "Noviembre", earnings: 4000 },
               { quarter: "Diciembre", earnings: 5000 }]
      },
      
    {
    Semestre:"PrimerCuatrimestre",
    Año:"2021",
      Data:[{ quarter: "Enero", earnings: 8000 },
           { quarter: "Febrero", earnings: 5000 },
           { quarter: "Marzo", earnings: 2000 },
           { quarter: "Abril", earnings: 3000 }]
    },
    {
      Semestre:"SegundoCuatrimestre",
      Año:"2021",
        Data:[{ quarter: "Mayo", earnings: 10000 },
              { quarter: "Junio", earnings: 12000 },
              { quarter: "Julio", earnings: 6000 },
              { quarter: "Agosto", earnings: 9000 }]
    },
    {
      Semestre:"TercerCuatrimestre",
      Año:"2021",
        Data:[{ quarter: "Septiembre", earnings: 8000 },
             { quarter: "Octubre", earnings: 5000 },
             { quarter: "Noviembre", earnings: 2000 },
             { quarter: "Diciembre", earnings: 3000 }]
    },
    
  ]
  const data = [
    { quarter: "Enero", earnings: 8000 },
    { quarter: "Febrero", earnings: 5000 },
    { quarter: "Marzo", earnings: 2000 },
    { quarter: "Mayo", earnings: 3000 }
  ];
const { width } = Dimensions.get("window");
const AnimatedLG = Animated.createAnimatedComponent(LinearGradient)
const FadeInOut = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const fadeIn = () =>{
        Animated.timing(fadeAnim,{
            toValue:1,
            duration:5000,
            useNativeDriver: true
        }).start()
    }
    useEffect(() => {
        fadeIn()
    })
    return (
        <Animated.View style={{opacity:fadeAnim,height:'100%',width:'100%'}}>
           {/* <CarouselList
                    actualData={dataCurrent}
                    height={300}
                    width={350}
                  /> */}
                  {props.children}
        </Animated.View>
    )
}

export default FadeInOut
