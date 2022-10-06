import React from 'react';
import { Text, TouchableOpacity,StyleSheet, View} from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Ionicons } from '@expo/vector-icons';

const GananciasDetails = (props) =>{

    return(
        <View>
      {/* <TouchableOpacity onPress={props.toggleAlert}>
        <Text>Tap me</Text>
      </TouchableOpacity> */}
      <FancyAlert
        style={styles.alert}
        icon={
          <View style={[ styles.icon, { borderRadius: 32 } ]}>
            <TouchableOpacity onPress={props.toggle}>
                <Ionicons
                name={Platform.select({ ios: 'ios-close', android: 'md-close' })}
                size={36}
                color="white"
            />
            </TouchableOpacity>
          </View>

        }
        visible={props.visible}
      >
         <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Meta:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.meta}</Text>
        </View>
        
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Actual:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.actual}</Text>
        </View>
        <View style={{ flexDirection:'row'}}>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>Egresos:</Text>
          <Text style={{ marginTop: -16, marginBottom: 32,fontSize:20 }}>{props.egreso}</Text>
        </View>
      </FancyAlert>
      
    </View>
    )

}
export default GananciasDetails;
const styles = StyleSheet.create({
    alert: {
      backgroundColor: '#EEEEEE',
    },
    icon: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',
    }
})