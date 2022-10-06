import React,{useEffect,useState,useRef,useCallback} from 'react'
import { 
  View,
  StyleSheet,
  TouchableOpacity,
  Text, 
  Animated,
  ActivityIndicator,
  Platform
} from 'react-native'
// import { useNavigationState } from '@react-navigation/native';
// import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../Constants/Colors'
import Card from '../../Components/UI/Card'
import HeaderA from "../../Components/UI/Header"
// import Button from '../../Components/UI/Button'
import CarouselList from '../../Components/AppInterface/ChartArray'
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
// import { LogBox } from 'react-native';
// import  SkeletonComponent  from '../../Components/SkeletonComponent'
// import FadeInOut from '../../Components/FadeinOut'
// import { useHover, useFocus, useActive } from 'react-native-web-hooks';
// import AnimatedBar from "react-native-animated-bar";
import HeaderB from '../../Components/UI/HeaderB';
// import Link from '../../Components/UI/Linking'
// import GananciasDetails from '../../Components/AppInterface/PortalToDetalles'
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
const dataResume = [
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

const Progress = ({step,steps,height,wh})=>{
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = useState(0)
  useEffect(() => {
    Animated.timing(animatedValue,{
      toValue:reactive,
      duration:300,
      useNativeDriver:true
    }).start()
  }, [])
  useEffect(() => {
    reactive.setValue(-width+(width*step)/steps);
  },[step,width])
  return(

    <>
    <Text style={{fontFamily:'lato-regular',fontSize:12,marginBottom:5}}>
      {step}/{steps}
    </Text>
    <View style={{
      height,
      backgroundColor:Colors.Bluish,
      borderRadius:height,
      overflow:'hidden',
      width:wh,
    }}>
      <Animated.View
      onLayout={e=>{
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
      }}
      style={{
        height,
        width:'100%',
        borderRadius:height,
        backgroundColor:Colors.Pinkytwo,
        position:'absolute',
        left:0,
        top:0,
        transform:[
          {
            translateX:animatedValue ,
          }
        ]
      }}
      />
    </View>
    </>
  )
}

const InformeScreen = (navigation) => {
    const ern = data.map(item=>item.earnings)
    const [isReady, setReady] = useState(true)
    const [index, SetIndex] = useState(0)
    const fadeAnim = useRef(new Animated.Value(0)).current
    const [HayResultados,SetHayResultados]= useState(false)
    const [visibleForGananciaDetalles, setGananciaDetalles] = useState(false);
    const fadeIn = () =>{
        Animated.timing(fadeAnim,{
            toValue:1,
            duration:4500,
            useNativeDriver: true
        }).start()
    }
    const toggleAlertDetalles = useCallback(() => {
      setGananciaDetalles(false);    
      
  }, [visibleForGananciaDetalles]);
    useEffect(() => {
      setTimeout(() => {
        setReady(false);
        fadeIn()
      }, 3000)
    },[isReady])
    useEffect(() => {
      const interval = setInterval(() =>{
        SetIndex((index+10)%(1000+1))
      },1000)
      return () =>{
        clearInterval(interval);
      
      }
    }, [index])

    
  //   useEffect(() => {
  //     if(!isReady)
  //     {
  //     fadeIn()
  //     }
  // },[isReady])
  
  //   const [loading, SetLoading] = useState(true);
 
    return (
    <View style={{flex:1,flexDirection:'column',margin:7,backgroundColor:Colors.Bluish,borderRadius:10,elevation:5,justifyContent: "center",
    alignItems:'center',}}>
      
        <Card style={styles.chartCard}>
             
              <Card style={styles.wth}>
                {/* {isReady?( <CarouselList
                  actualData={dataCurrent}
                  height={300}
                  width={350}
                />):(<SkeletonComponent />)} */}
                 {isReady?(<View style={{height:300,width:350,justifyContent: "center",alignItems:'center'}}><ActivityIndicator
                 color={'#a0a0a0'}
                 size="large"
               visible={isReady}
               //Text with the Spinner
               textContent={'Loading...'}
               //Text style of the Spinner Text
               textStyle={styles.spinnerTextStyle}
              /></View>):(
                <Animated.View style={{opacity:fadeAnim}}>
              <CarouselList
                actualData={dataCurrent}
                height={300}
                width={350}
              />
              </Animated.View>)}
                            
              </Card>  
        
              <Card style={styles.chz}>
                
                <TouchableOpacity style={styles.sgt} activeOpacity={0.3}>
                
                <HeaderA
                styles={styles.headerA}
                headerTitle={'Un solo mes'}/>
               
                 
                <Foundation
                    name={Platform.OS==='android '?'calendar':'calendar'}
                    size={35}
                    color={Colors.Dark}
                    
                  />
                  
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sgt} activeOpacity={0.3}>
                  
                  <HeaderA
                styles={styles.headerA}
                headerTitle={'Por dia'}/>
                
                
                <Ionicons
                    name={Platform.OS==='android '?'today':'today'}
                    size={35}
                    color={Colors.Dark}
                    
                  />
                 
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sgt} activeOpacity={0.3}>
                 
                  <HeaderA
                styles={styles.headerA}
                headerTitle={'Ganancia'}/>
               
                <FontAwesome
                    name={Platform.OS==='android '?'line-chart':'line-chart'}
                    size={35}
                    color={Colors.Dark}
                    
                  />
                
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sgt} activeOpacity={0.3}>
                  <HeaderA
                styles={styles.headerA}
                headerTitle={'Por Fecha'}/>
               
                <Ionicons
                    name={Platform.OS==='android '?'calendar':'calendar'}
                    size={35}
                    color={Colors.Dark}
                    
                  />
                  
                  </TouchableOpacity>
              </Card>
           
        </Card>
        
        <Card style={styles.CardButtons}>
 
        <HeaderA 
           headerViewStyles={{padding:2}}
           styles={{}}
           headerTitle={'Datos Estadisticos'}
          />

          <View style={{backgroundColor:'#fff',borderColor:Colors.Pinky,borderWidth:1,padding:4,borderRadius:5}}
          >
          <TouchableOpacity onPress={()=>{setGananciaDetalles(true)}} activeOpacity={0.8}>
            <HeaderB 
           styles={{}}
           headerTitle={'Ganancias'}
          />
          </TouchableOpacity>
            <Progress
                step={index} steps={1000} height={8} wh={250}
              />
          </View>




          <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
            <View style={{backgroundColor:'#fff',borderColor:'#7A9E9C',borderWidth:1,padding:4,borderRadius:5,margin:17}}
            >
            <TouchableOpacity onPress={()=>{setGananciaDetalles(true)}} activeOpacity={0.8}>
              <HeaderB 
            styles={{}}
            headerTitle={'Ingresos'}
            />
            </TouchableOpacity>
              <Progress
                  step={index} steps={1000} height={8} wh={103}
                />
            </View>
            <View style={{backgroundColor:'#fff',borderColor:Colors.Bluish,borderWidth:1,padding:4,borderRadius:5,margin:17}}
              >
              <TouchableOpacity onPress={()=>{setGananciaDetalles(true)}} activeOpacity={0.8}>
                <HeaderB 
              styles={{}}
              headerTitle={'Egresos'}
              />
              </TouchableOpacity>
                <Progress
                    step={index} steps={1000} height={8} wh={103}
                  />
              </View>
          </View>
        {/* <View style={{ width: 100, height: 100, borderRadius: 60, backgroundColor: '#ECEFF1', overflow: 'hidden', marginRight: 16 }}>
            <Animated.View style={{ width: '30%', opacity: 0.5, height: '100%', backgroundColor: 'white', transform: [{ translateX: translateX }] }}></Animated.View>
          </View> */}
           
        {/* <Button styles={styles.buttonIngreso} title="Agregar Ingreso" btnTextStyles={styles.btnTextIngreso}/>
        <Button styles={styles.buttonEgreso} title="Agregar Egreso" btnTextStyles={styles.btnTextEgreso}/>
        <Button styles={styles.buttonGo} title="Agregar Ingreso" btnTextStyles={styles.btntext}/> */}
       
        </Card>   
         
    </View>
    )
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
    sgt:{
      alignItems: 'center',

    },
    wth:{
      width:'100%',
      justifyContent: 'center'
    },
    so:{
      width:'100%',
      backgroundColor:'#D5D8DC',
      
    },
    chz:{ 
      flexDirection:'row',
      width:'95%',
      justifyContent:'space-between',
      paddingHorizontal:2,
      margin:8,
      
      paddingVertical:9,
      backgroundColor:'#DDDFDF',
    
    },

    CardButtons:{
        height:200,
        padding:5,
        margin:10,
        width:325,
       alignItems: 'center',
       backgroundColor:'#DDDFDF'
       
    },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding:15,
    backgroundColor:'#FDFEFE',
  },
  btntext:{
    color:Colors.White,
    fontFamily:'lato-bold',
    fontSize:15.2,
  },
  headerA:{
    fontSize:10.5,
    textDecorationLine:"none",
    
  },
  headerParagraph:{
      textDecorationLine:"none",
    fontFamily:'lato-regular',
    fontSize:15
  },
  headerParagraphView:{
      padding:1,
  },
  buttonGo :{
    backgroundColor:Colors.Dark,
    marginVertical:8,
  },
  buttonIngreso:{
    marginVertical:8,
    backgroundColor:Colors.Ingreso,
  },
  buttonEgreso:{

    marginVertical:8,
    backgroundColor:Colors.Egreso,
  },
  btnTextEgreso:{
    color:Colors.White,
    fontFamily:'lato-bold',
    fontSize:15.2,
  },
  btnTextIngreso:{
    color:Colors.White,
    fontFamily:'lato-bold',
    fontSize:15.2,
},
  chartCard: {
    height:'62%',
    margin:10,
    borderRadius:10,
    justifyContent: "center",
    alignItems:'center',
    // backgroundColor: '#D5D8DC',
    elevation:10 ,
    flexDirection:'column',
    width:325,
   
  },
})
export const screenOptions = navData => {
    return {
        headerShown: true,

        headerTitle:'Informes',
        headerTitleStyle:{
            fontFamily:'lato-regular',
        },
        
    // headerTitle: 'Hola',
    // headerLeft:()=>(<Button title="Hola" styles={styles.button}/>),
    
    }
}
export default InformeScreen
