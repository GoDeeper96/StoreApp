import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Colors from '../../Constants/Colors'
import { List,Menu } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
const FileItem = props =>{
    return(
        <View >
         <List.Item 
         style={styles.soloItem}
         right={props=><View style={{flexDirection: 'row',marginTop:5,}}> 
                            <TouchableOpacity style={{marginHorizontal:5}} onPress={props.DeleteFile}>
                            <AntDesign {...props} name="delete" size={24} color="red" />
                            </TouchableOpacity> 
                            <TouchableOpacity style={{marginHorizontal:5}} onPress={props.UploadFile}> 
                            <AntDesign name="upload" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity  style={{marginHorizontal:5}} onPress={props.EditFile}> 
                            <AntDesign name="edit" size={24} color="black" />
                            </TouchableOpacity>                         
                        </View>} 
         title={!props.FileNameOrDescription?'File 1':null} onPress={props.onPress}  />
        </View>)
}
const styles = StyleSheet.create({
    soloItem:{
        backgroundColor:Colors.HeaderNavigator,
        borderRadius:6,
        marginHorizontal:10,
    }
})
export default FileItem;