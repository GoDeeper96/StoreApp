import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
 
import AwesomeAlert from 'react-native-awesome-alerts';

const NiceAlert = (props) =>{

    return(
<View style={styles.container}>

 <AwesomeAlert
   show={props.popAlert}
   showProgress={true}
   title="Subiendo imagen"
   titleStyle={{fontSize:22,marginBottom:10}}
   messageStyle={{fontSize:18,marginBottom:10}}
   message="Sabías que los patos pueden volar?"
   closeOnTouchOutside={true}
   closeOnHardwareBackPress={false}
   showCancelButton={false}
   showConfirmButton={false}
   cancelText="No"
   confirmText="Yes"
   cancelButtonStyle={{width:100,alignItems:'center',marginTop:10}}
   confirmButtonStyle={{width:100,alignItems:'center'}}
   confirmButtonColor="#AEDEF4"
   cancelButtonColor="#DD6B55"
   onCancelPressed={props.onCancelPressed}
   onConfirmPressed={props.onConfirmPressed}
   
 />
</View>
    )
}
export default NiceAlert;

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
});