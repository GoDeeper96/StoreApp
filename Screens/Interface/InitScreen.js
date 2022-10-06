import React, {useRef} from "react";
import { StyleSheet, View,SafeAreaView,ScrollView,Animated,useWindowDimensions,FlatList } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import Button from "../../Components/UI/Button";
import Card from "../../Components/UI/Card";
import Colors from "../../Constants/Colors";
import HeaderA from "../../Components/UI/Header"
// import ScrollChart from '../../Components/UI/ScrollCard'
const data = [
    { quarter: "Enero", earnings: 8000 },
    { quarter: "Febrero", earnings: 5000 },
    { quarter: "Marzo", earnings: 2000 },
    { quarter: "Mayo", earnings: 3000 }
  ];

const InitialScreen = (props) =>{
  const scrollX = useRef(new Animated.Value(0)).current;

  // const { width: windowWidth } = useWindowDimensions();
    const arrayOfComponents = new Array();
    
    arrayOfComponents[0]=
    <Card style={styles.chartCard} >
    <HeaderA 
    styles={styles.headerA}
    headerTitle="Ventas por mes"/>
    <HeaderA
    headerViewStyles={styles.headerParagraphView}
    styles={styles.headerParagraph}
    headerTitle="Representación gráfica de ventas por mes de los últimos 4 meses."
    />            
    <VictoryChart 
      width={300} 
      height={280} 
      theme={VictoryTheme.material} 
      domain={{y:[0,10000]}} 
      padding={50}
      domainPadding={{x:50}}>

        <VictoryBar 
        data={data} 
        x="quarter" 
        y="earnings"  
        alignment="middle"   
        labels={ ern }/>
      </VictoryChart>                 
    </Card>;
    arrayOfComponents[1]=
    <Card style={styles.chartCard} >
    <HeaderA 
    styles={styles.headerA}
    headerTitle="Ventas por mes"/>
    <HeaderA
    headerViewStyles={styles.headerParagraphView}
    styles={styles.headerParagraph}
    headerTitle="Representación gráfica de ventas por mes de los últimos 4 meses."
    />            
    <VictoryChart 
      width={300} 
      height={280} 
      theme={VictoryTheme.material} 
      domain={{y:[0,10000]}} 
      padding={50}
      domainPadding={{x:50}}>

        <VictoryBar 
        data={data} 
        x="quarter" 
        y="earnings"  
        alignment="middle"   
        labels={ ern }/>
      </VictoryChart>                 
    </Card>;
    const ern = data.map(item=>item.earnings)
    
    return (
      <View style={styles.container}>
        <Card style={styles.CardButtons}>
        <Button styles={styles.buttonIngreso} title="Agregar Ingreso" btnTextStyles={styles.btnTextIngreso}/>
        <Button styles={styles.buttonEgreso} title="Agregar Egreso" btnTextStyles={styles.btnTextEgreso}/>
        <Button styles={styles.buttonGo} title="Agregar Ingreso" btnTextStyles={styles.btntext}/>
        </Card>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ])}
          scrollEventThrottle={1}
        >
        
        </ScrollView>
        {arrayOfComponents}
      </View>
    );
  
}
export const screenOptions = navData => {
    return {
    headerShown: false,
    // headerTitle: 'Hola',
    // headerLeft:()=>(<Button title="Hola" styles={styles.button}/>),
    }
}
export default InitialScreen;
const styles = StyleSheet.create({
    CardButtons:{
        height:300,
        padding:20,
        marginVertical:10,
       alignItems: 'center',
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
    textDecorationLine:"underline",
  },
  headerParagraph:{
      textDecorationLine:"none",
    fontFamily:'lato-regular',
    fontSize:15
  },
  headerParagraphView:{
      padding:1  
  },
  buttonGo :{
    backgroundColor:Colors.Dark,
    marginVertical:8,
  },
  buttonIngreso:{
    //   width:130,
    // //   padding:20,
    //   paddingVertical:10,
    //   paddingHorizontal:10,
    //   backgroundColor:Colors.HeaderNavigator,
    //   marginHorizontal:5,
    marginVertical:8,
    backgroundColor:Colors.Ingreso,
  },
  buttonEgreso:{
    //   width:130,
    // //   padding:20,
    //   paddingVertical:10,
    //   paddingHorizontal:10,
    //   backgroundColor:Colors.HeaderNavigator,
    //   marginHorizontal:5,
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
    borderRadius:10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: '#D5D8DC',
    elevation:10 //#f5fcff
  },

});