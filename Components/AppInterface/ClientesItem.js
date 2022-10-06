import { View,TouchableOpacity, StyleSheet, Text,Image,Alert } from'react-native';
import Colors from '../../Constants/Colors';
import { List,Menu } from 'react-native-paper';
import * as Firebase from '../../Constants/Firebase'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SpecialButton from '../../Components/UI/SpecialButtonIcon'
import FileItem from '../AppInterface/File-Item'
import React,{useState,useCallback,useEffect,useRef,useReducer} from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import * as FileCartActions from '../../Store/Actions/FileCartActions'
// import * as FileActions from '../../Store/Actions/FileActions'
import * as DocumentPicker from 'expo-document-picker';

const initialStateFiles  = []
const ClientesItem = props => {
    const [uploading,SetUploading] = useState(false);
    const [downloadUrl, SetDownloadUrl] = useState();
    const [array,SetArray] = useState([]);
    const [file, SetFile] = useState("");
    const [fileItem,SetFileItem] = useState(
        {
            NameFile:'',
            DownloadUrl:'',
            Type:'',
            DateCreated:'',
            Size:''
        }
    )
    const [BigBlob, SetBigBlob] = useState([])
    const [index, SetIndex] = useState(0);
      const cartFiles = useSelector(state => {
        const transformedCartFiles = [];
        for(const key in state.cartred.items)
        {
          transformedCartFiles.push({
            idFile:key,
            NameFile:state.carted.items[key].NameFile,
            DownloadUrl:state.carted.items[key].DownloadUrl,
            DateCreated:state.carted.items[key].DateCreated,
            Size:state.carted.items[key].Size
          })
        }
      }
      )
    const uploadFile = async () =>{

      let result = await DocumentPicker.getDocumentAsync({});
      SetFile(result);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', file , true);
        xhr.send(null);
      });
      const ref = Firebase.storage().ref().child(props.NameInput+'-'+props.nombre+'-'+props.dateCommon)
      const snapshot = ref.put(blob);
      snapshot.on(Firebase.storage.TaskEvent.STATE_CHANGED,()=>{
          SetUploading(true);
      },
      (error)=>{
          console.log('error');
      },
      ()=>{
          snapshot.snapshot.ref.getDownloadURL().then((url)=>{
            console.log('DOWNLOAD URL: ',url)
            blob.close();
            SetDownloadUrl(url);
          })
      }
      )

      // FileActions.createFile(props.idCliente,props.NameInput,props.NameClientes,downloadUrl,props.dateCommon,props.Type);
      // FileCartActions.addToCartFolder(
      //     fileItem
      //     )
    }
    const deleteHandler = id => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
          { text: 'No', style: 'default' },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () => {
              dispatch(productsActions.deleteProduct(id));
            }
          }
        ]);
      };
    
    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
          ...DefaultTheme.colors,
          primary: '#3498db',
          accent: '#f1c40f',
        },
      };
    const AgregarFolder = () =>{
        let component = <List.Accordion
        theme={theme}
        titleStyle={{fontFamily:'lato-bold'}}
        style={{backgroundColor:Colors.StoreBK}}
        title={!props.DescripcionFolder?'Descripcion del Folder':null}
        left={props =><List.Icon {...props} icon="folder" />}
        
        id = {index}
      
        >
        
         <FileItem onPress={()=>{}} delete={()=>{}}/>
        {/* <List.Item title={!props.FileNameOrDescription?'File 1':null} onPress={()=>{openFile}}  />
        <List.Item title={!props.FileNameOrDescription?'File 2':null}onPress={()=>{openFile}}  /> */}
        <SpecialButton styles={styles.btm} sn={{backgroundColor:Colors.HeaderNavigator,width:'50%'}} antDesign={'addfile'} title={"Subir Archivo"} OnPress={uploadFile}/>
       
        {/* <SpecialButton styles={styles.btm} title={"Agregar Folder"} OnPress={()=>{AgregarFolder()}}/> */}
        </List.Accordion>
        SetIndex(index+1)
        SetArray(array.concat(component));
    }
    const AgregarArchivo = props =>{

    }
    const openFile = props =>{

    }
    if(uploading)
    {
        <View>
            <ActivityIndicator size="large" color="green"/>
        </View>
    }
    return(
        
        <View style={{...styles.v,...props.PrincipalView}}>
                 <List.Section style={styles.container} title={props.nombre} titleStyle={{fontSize:20}}>
                     {array}
                <SpecialButton styles={styles.btm} antDesign={'addfolder'} title={"Agregar Folder"} OnPress={()=>{AgregarFolder()}}/>              
                    </List.Section>
            </View>
                 
    )

}
export default ClientesItem;

const styles = StyleSheet.create({
    btm:{
        
    },
    someacc:{
        backgroundColor: Colors.StoreBK,
    },
    v:{
        flex: 1,
        opacity:10,
        margin:5,
        borderRadius:10,
        alignItems: 'center',

        backgroundColor:Colors.StoreBK,
        borderColor:Colors.StoreBK,
        borderWidth:3,
        elevation:3,
    },
    container: {
        width:"100%",
        flex:1,
    },
   
  });



   {/* <List.Accordion
                        theme={theme}
                        titleStyle={{fontFamily:'lato-bold'}}
                        style={{backgroundColor:Colors.StoreBK}}
                        title={!props.DescripcionFolder?'Descripcion del Folder':null}
                        left={props => <List.Icon {...props} icon="folder" />}>

                        <List.Item title={!props.FileNameOrDescription?'File 1':null} onPress={()=>{openFile}} />
                        <List.Item title={!props.FileNameOrDescription?'File 2':null}onPress={()=>{openFile}}  />
                        <SpecialButton styles={styles.btm} sn={{backgroundColor:'#F4EDED',width:'50%'}} antDesign={'addfile'} title={"Subir Archivo"} OnPress={()=>{AgregarArchivo()}}/>
                   
                  
                </List.Accordion> */}