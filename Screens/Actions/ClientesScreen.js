import React,{useState,useCallback,useEffect,useRef,useReducer} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {View,Text,StyleSheet,ScrollView,ActivityIndicator,StatusBar,TouchableOpacity,Alert,FlatList,Button, Animated} from 'react-native'
import Colors from '../../Constants/Colors'
import firebase from "firebase";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// import Button from '../../Components/UI/Card'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { List } from 'react-native-paper';
import SpecialButton from '../../Components/UI/SpecialButtonIcon'
import * as FileStructureActions from '../../Store/Actions/FileStructureActions'
import * as ClientesActions from '../../Store/Actions/ClientesActions'
import * as Files from '../../Store/Actions/FileActions'
import * as DocumentPicker from 'expo-document-picker';
import GetFilesFromId from '../../Func/FilterFilesFromAvailableFiles'
import IconType from '../../Func/IconType'
import ConvertBytes from '../../Func/SizeConverter'
import manageFileUpload from '../../Components/AppInterface/ManageFileUpload';
import getBlobFromUri from '../../Components/AppInterface/getBlobFromUri'
import AwesomeAlert from '../../Components/UI/AwesomeAlerts'
import * as FileActions from'../../Store/Actions/FileActions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem } from "@react-native-material/core";
import { FontAwesome5 } from '@expo/vector-icons'; 
import PortalToModify from '../../Components/AppInterface/PortalToModify'
import GetName from '../../Components/AppInterface/GetName'
import { downloadToFolder } from 'expo-file-dl';
import gettingType from '../../Func/gettingType'
import * as Notifications from "expo-notifications";
import * as FileSystem from 'expo-file-system';
const { StorageAccessFramework } = FileSystem;
import * as Location from 'expo-location';
import {
  AndroidImportance,
  AndroidNotificationVisibility,
  NotificationChannel,
  NotificationChannelInput,
  NotificationContentInput,
} from "expo-notifications";
import {
  Provider,
} from "@react-native-material/core";
// import * as Firebase from 'firebase/storage'
// import { getStorage,ref,uploadBytesResumable,getDownloadURL, uploadBytes } from 'firebase/storage';
// import { Button } from 'react-native-paper';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
const Item = ({itemData,success,upload,PickDocument}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <Text>{itemData.item.NameFile}</Text>
      
    </View>
  )
}

const ClientesScreen = (props) => {
  

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isItTrueYet, setClient] = useState(false);
  const [fileUri,SetFileUri] = useState();
  // const [downloadUrl, SetDownloadUrl] = useState();
  const [size, SetSize] = useState('notdefined');
  const [type, SetType] = useState('notdefined');
  const [visible, setVisible] = useState(false);

  // const [uploading, setUploading] = useState(false);
  const [success,SetSuccess] = useState(false);
  const [popUpAlert, SetAwesomeAlert] = useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [remoteURL, setRemoteURL] = useState('notdefined');
  const [Completed,SetCompleted] = useState(false);
  const [RequestedName,setRequestName] = useState(false);
  const [index, SetIndex] = useState(0)
  const [clientName, SetClientName] = useState('notdefined');
  const [ClientId, SetClientId] = useState('notdefined');
  const [fileName,SetFileName] = useState('notdefined');
  const [filenameChose,SetFilenameChosen] = useState('notdefined');
  const [UrlToDownload, SetUrlToDownload] = useState('notdefined');
  const [NameOfDownloadingFile, SetNameOfDownloadingFile] = useState('notdefined');
 
  // const [ClientName, SetClientName] = useState('');
  // const [givenName,SetGivenName] = useState('')
  // const clients = useSelector(state => state.clients.availableClients.find(cl => cl.id === itemData))
  // const folders = useSelector(state => state.arrayFolders.folders)
  const clients = useSelector(state => state.clients.availableClients)
  const Allfiles = useSelector(state => state.files.availableFiles)
  const dispatch = useDispatch();
  const [error, setError] = useState();

  // async function getMediaLibraryPermissions() {
  //   await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  // }
  // async function getNotificationPermissions() {
  //   await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // }


 const [downloadProgress, setDownloadProgress] = React.useState();
 const downloadPath = FileSystem.documentDirectory + (Platform.OS == 'android' ? '' : '');
 const ensureDirAsync = async (dir, intermediates = true) => {
    const props = await FileSystem.getInfoAsync(dir)
    if (props.exist && props.isDirectory) {
        return props;
    }
    let _ = await FileSystem.makeDirectoryAsync(dir, { intermediates })
    return await ensureDirAsync(dir, intermediates)
}
const downloadCallback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
};
const saveAndroidFile = async (fileUri, fileName = 'File') => {
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
      
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      try {
        await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, { encoding: FileSystem.EncodingType.Base64 });
            alert('Report Downloaded Successfully')
          })
          .catch((e) => {
          });
      } catch (e) {
        throw new Error(e);
      }

    } catch (err) {
    }
  }
  const saveIosFile = (fileUri) => {
    // your ios code
    // i use expo share module to save ios file
}
const downloadFile = async (fileUrl) => {
    if (Platform.OS == 'android') {
      const dir = ensureDirAsync(downloadPath);
    }

    let fileName = fileUrl.split('Reports/')[1];
    //alert(fileName)
    const downloadResumable = FileSystem.createDownloadResumable(
      fileUrl,
      downloadPath + NameOfDownloadingFile + type,
      {},
      downloadCallback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      if (Platform.OS == 'android')
        saveAndroidFile(uri, NameOfDownloadingFile + type)
      else
        saveIosFile(uri);
    } catch (e) {
      console.error('download error:', e);
    }
}
  const onStart = () => {
    SetCompleted(false);
    setIsUploading(true);
    SetAwesomeAlert(true);
  };
  const onProgress = (progress) => {
    setProgress(progress);
  };
  const onComplete = (ClientName,ClientId, FileNameGiven,fileUrl,size) => {
    SetClientId(ClientId);
    SetClientName(ClientName);
    SetFileName(FileNameGiven)
    SetSize(size);
    // SetType(type);
    setRemoteURL(fileUrl);
    
    setIsUploading(false);
    SetSuccess(false);
    SetFileUri(null);
    SetAwesomeAlert(false);
    SetCompleted(true);
  };

  const onFail = (error) => {
    setError(error);
    setRemoteURL('');
    setIsUploading(false);
    SetSuccess(false);
    SetFileUri(null);
    
  };
  
  const PickDocument= async () => {
    let result = await DocumentPicker.getDocumentAsync({type:'*/*',copyToCacheDirectory:false,multiple:true});
    // console.log('gogoduck:'+result.mimeType);
    if(result.type==='success'){
      console.log(result.uri)
      SetFileUri(result.uri);  
      SetType(gettingType(result.mimeType))
      SetSuccess(true);
    }
    if(result.type==='cancel'){
      Alert.alert('Error', 'Ocurrió un error, porfavor vuelva a intentar', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  }
  
  const uploadDocument = async (NombreCliente,ClientId,FileNameChoosen) =>{
    if (!fileUri) return;
    
    
    
    const blob = await getBlobFromUri(fileUri);
    
    // SetClientName(NombreCliente)
    // SetGivenName(FileNameGiven)
    await manageFileUpload(blob,NombreCliente,ClientId, FileNameChoosen,type,{ onStart, onProgress, onComplete, onFail })
    
  }
 
  const downloadDocument =  (FilenameURL) =>{
    if (!FilenameURL) return;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      var blob = xhr.response;
    };
    xhr.open('GET', FilenameURL);
    xhr.send();
  }
  // const getPermissionAsync = async () => {
  //   const { status } = await DocumentPicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3]
  // })
  //   if (status !== "granted") {
  //     alert("...");
  //   }
  // };
  // useEffect(() => { 
  //   getPermissionAsync()
  // },[])

  useEffect(() => {
    if(remoteURL!=='notdefined'){
    submitDocumentInfo().then(() => {
      SetClientId('notdefined');
      SetClientName('notdefined');
      SetFileName('notdefined')
      SetSize('notdefined');
      SetType('notdefined');
      setRemoteURL('notdefined');
      SetFilenameChosen('notdefined')
    })
  }
  }, [remoteURL])
  const savingURLWhenSelected = (FilenameURL) => {
    setVisible(true)
    SetUrlToDownload(FilenameURL)
  }
  const submitDocumentInfo = useCallback(async()=>{
    
    var today = new Date();

    var dd = String(today.getDate()-1).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + "/"+ yyyy;
    try {
      await dispatch(FileActions.createFile(ClientId,fileName,clientName,remoteURL,today,type,size))
    } catch (error) {
      console.log(error)
    }
  },[remoteURL])
  const loadFiles = useCallback(async () =>{
    
    setError(null);
    setIsRefreshing(true);
    try {
      // await dispatch(FileStructureActions.fetchFolders())
      await dispatch(Files.fetchFiles())
      await dispatch(ClientesActions.fetchClients())
    } catch (error) {
      setError(err.message);
    }
    setIsRefreshing(false);
  },[dispatch,setIsLoading,setError])
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadFiles);

    return () => {
      unsubscribe();
    };
  }, [loadFiles]);
  useEffect(() => {
    setIsLoading(true);
    loadFiles().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadFiles]);
  useEffect(() => {
    const interval = setInterval(() =>{
      SetIndex((index+10)%(1000+1))
    },1000)
    return () =>{
      clearInterval(interval);
    
    }
  }, [index])
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured! error: {error}</Text>
        <Button
          mode='text'

          onPress={()=>loadFiles}
          // color={Colors.Bluish}
        >Try Again</Button>
      </View>
    );
  }
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.Bluish} />
      </View>
    );
  }
  // if(isUploading){
  //   return(
  //     <Progress step={index} steps={1000} height={8} wh={150}/>
  //   )
  // }
 
  return (
    <Provider>
    <GetName
    onChangeText={SetFilenameChosen}
    value = {filenameChose}
    visibility ={RequestedName}
    visible ={() =>{setRequestName(false)}}
    SaveChanges={()=>{setRequestName(false)}}
    />
    <PortalToModify
    onChangeText={SetNameOfDownloadingFile}
    value = {NameOfDownloadingFile}
    visibility ={visible}
    visible ={() =>{setVisible(false)}}
    SaveChanges={async()=>{ await downloadFile(UrlToDownload,type).then(() => SetUrlToDownload('notdefined')); SetNameOfDownloadingFile('notdefined'); setVisible(false);}}
    />
    <FlatList
       
        onRefresh={loadFiles}
        refreshing={isRefreshing}
        data={clients}
        keyExtractor={item => item.idCliente}
        renderItem={itemData =>
          <List.AccordionGroup>
            <List.Accordion
            theme={theme}
            titleStyle={{fontFamily:'lato-bold'}}
            style={{backgroundColor:Colors.StoreBK}}
          
            title={itemData.item.NameClientes}
             
            id = {itemData.item.idCliente}    
            >   
            <FlatList
            // onRefresh={AddFiles}
            // refreshing={AddIsRefreshing}
            data={GetFilesFromId(Allfiles,itemData.item.idCliente)}
            keyExtractor={item => item.idFile}
            renderItem={itemData =>
              <ListItem title={itemData.item.NameFile}
              leading={IconType(itemData.item.Type)}
              secondaryText={itemData.item.CreationDate + " " + ConvertBytes(itemData.item.Size)}
              onPress={()=>{savingURLWhenSelected(itemData.item.DownloadUrl)}}
               />
             
              
              
            }
            
            />
            
            {success?
            <SpecialButton 
            styles={styles.btm} 
            sn={{backgroundColor:Colors.HeaderNavigator,width:'50%'}}
            antDesign={'save'} title={"Subir Archivo"} 
            OnPress={()=>{uploadDocument(itemData.item.NameClientes,itemData.item.idCliente,filenameChose)}}
            />:<SpecialButton 
            styles={styles.btm} 
            sn={{backgroundColor:Colors.HeaderNavigator,width:'50%'}}
            antDesign={'addfile'} title={""} 
            OnPress={()=>{PickDocument().then(()=>{setRequestName(true)})}}/>}
            
            <AwesomeAlert 
            popAlert={popUpAlert}
            onCancelPressed={() => {SetAwesomeAlert(false)}}
            onConfirmPressed={() => {SetAwesomeAlert(false)}}
            />
        </List.Accordion>
                {/* <SpecialButton styles={styles.btm} antDesign={'addfolder'} title={"Agregar Folder"} OnPress={()=>{console.log("asdas")}}/>               */}
          </List.AccordionGroup>
        }
      />
      </Provider>
  )
  
  
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  gogetfuckoff:{
    width: 300
    
  },
  btm:{
    marginVertical:10,
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

});
export const screenOptions = navData => {
  return {
  headerShown: true,
  headerTitle: 'Mis Clientes',
  // headerLeft:()=>(<Button title="Hola" styles={styles.button}/>),
  
  }
}
export default ClientesScreen
/* <View style={{...styles.v,...props.PrincipalView}}>
                 <List.Section style={styles.container} title={props.nombre} titleStyle={{fontSize:20}}>
                     {array}
                <SpecialButton styles={styles.btm} antDesign={'addfolder'} title={"Agregar Folder"} OnPress={()=>{AgregarFolder()}}/>              
                    </List.Section>
            </View> */
// const AddSomeFiles = useCallback(async () =>{

    //   setError(null);
    //   setIsRefreshing(true);
    //   try {
    //     await dispatch(FileStructureActions.addFolder("f1","example1","Ejemplo","Bartolomeo Mamani",[],new Date().toJSON().slice(0,10).replace(/-/g,'/'),))
    //   } catch (error) {
    //     setError(err.message);
    //   }
    //   setIsRefreshing(false);
    // },[dispatch,setIsLoading,setError])
    // useEffect(() => {
    //   AddSomeFiles();
    // }, [dispatch, AddSomeFiles]);

    // return (
    //   <View style={styles.centered}>
    //     <Text> No hay folders, porfavor cree algunos!</Text>       
    //   </View>
    
    // );
 // const [expanded, setExpanded] = React.useState(true);
  
  {/* <FlatList
        onRefresh={loadFiles}
        refreshing={isRefreshing}
        data={folders}
        keyExtractor={item => item.id}
        renderItem={itemData =>
          <List.Section style={styles.container} titleStyle={{fontSize:20}}>
            <List.Accordion
            theme={theme}
            titleStyle={{fontFamily:'lato-bold'}}
            style={{backgroundColor:Colors.StoreBK}}
            title={"ch"}
            left={props =><List.Icon {...props} icon="folder" />}   
            id = {itemData.item.idCliente}    
            > */}
            {/* <FlatList
              onRefresh={loadFiles}
              refreshing={isRefreshing}
              data={itemData.item.FolderItems}
              keyExtractor={item => item.id}
              renderItem={itemData =>
                <FileItem
                FileNameOrDescription={itemData.item.NameFile}
                onPress={()=>{}}
                DeleteFile={()=>{}}
                UploadFile={()=>{}}
                EditFile={()=>{}}
                />
              }
            />        */}
        {/* <FlatList
          onRefresh={loadFiles(itemData.item.idCliente)}
          refreshing={isRefreshing}
          data={folders}
          keyExtractor={item => item.id}
          renderItem={itemData =>
            <FileItem
            FileNameOrDescription={itemData.item.idCliente}
            onPress={()=>{}}
            DeleteFile={()=>{}}
            UploadFile={()=>{}}
            EditFile={()=>{}}
            />
          }
        /> */}
  // const getFolders = (IdProposed) =>{
  //   const foldersFromId = useSelector(state => state.arrayFolders.folders.find(f => f.id === IdProposed));
  //   return foldersFromId;
  // }
  // const loadClients = useCallback(async () =>{
  //   setError(null);
  //   setIsRefreshing(true);
  //   try {
  //     await dispatch(ClientesActions.fetchClients());
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setIsRefreshing(false);
  // },[dispatch,setIsLoading,setError]);
// useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', loadClients);

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [loadClients]);
  
  // useEffect(() => {
  //   setIsLoading(true);
  //   loadClients().then(() => {
  //     setIsLoading(false);
  //   });
  // }, [dispatch, loadClients]);
// const deleteHandler = id => {
  //   Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
  //     { text: 'No', style: 'default' },
  //     {
  //       text: 'Yes',
  //       style: 'destructive',
  //       onPress: () => {
  //         dispatch(productActions.deleteProduct(id));
  //       }
  //     }
  //   ]);
  // };
  // const loadFolders = useCallback(async () => {
        
  //   setError(null);
  //   setIsRefreshing(true);
  //   try {
  //     await dispatch(FileStructureActions.fetchFolders());
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setIsRefreshing(false);
    
  // }, [dispatch, setIsLoading, setError])
// return (

  //         <FlatList
  //           onRefresh={loadFolders}
  //           refreshing={isRefreshing}
  //           data={folders}
  //           keyExtractor={item=>item.idCliente}
  //           renderItem={itemData =>
  //             (
  //               <FlatList
  //               onRefresh={loadFolders}
  //               refreshing={isRefreshing}
  //               data={itemData.item}
  //               keyExtractor={item=>item.idStructure}
  //               renderItem={itemData =>(
  //                 <FlatList
  //                 onRefresh={loadFolders}
  //                 refreshing={isRefreshing}
  //                 data={itemData.item.FolderItems}
  //                 keyExtractor={item=>item.idFile}
  //                 renderItem={itemData =>(
  //                   <ClientesItem
  //                   nombre={itemData.item.NameClientes}
  //                   Indx={itemData.index}
  //                 />    
  
  //                 )}
  //                 />

  //               )}
  //               />
                  
           
  //              )
  //             }/>
            
    

  // )
{/* <ClientesItem
                    nombre={itemData.item.NameClientes}
                    Indx={itemData.index}
                  />
          */}








 {/* <FileItem onPress={()=>{}} delete={()=>{}}/> */}
        {/* <List.Item title={!props.FileNameOrDescription?'File 1':null} onPress={()=>{openFile}}  />
        <List.Item title={!props.FileNameOrDescription?'File 2':null}onPress={()=>{openFile}}  /> */}


     //   <Transitioning.View
            //     ref={ref}
            //     transition={transition}
            //     style={styles.container}
            //   >
            //  <TouchableOpacity
            //     key={itemData.index}
            //     onPress={() => {
            //     ref.current.animateNextTransition()}}
            //     style={styles.cardContainer}
            //     activeOpacity={0.9}
            //   >
                
            //     <View style={styles.card}>
            //       <Text style={styles.heading}>{itemData.item.NameClientes}</Text>              
            //           {/* <List.Section title={itemData.item.NameClientes}>
            //             <List.Accordion
            //               title="Controlled Accordion"
            //               left={props => <List.Icon {...props} icon="folder" />}
            //               expanded={expanded}
            //               onPress={handlePress}>
            //               <List.Item title="First item" />
            //               <List.Item title="Second item" />
            //             </List.Accordion>
            //           </List.Section>             */}
            //     </View>
            //   </TouchableOpacity></Transitioning.View>
// container: {
//   flex: 1,
//   backgroundColor: '#fff',
//   justifyContent: 'center',
// },
// cardContainer: {
//   flexGrow: 1,
// },
// card: {
//   flexGrow: 1,
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// heading: {
//   fontSize: 38,
//   fontWeight: '900',
//   textTransform: 'uppercase',
//   letterSpacing: -2,
// },
// body: {
//   fontSize: 20,
//   lineHeight: 20 * 1.5,
//   textAlign: 'center',
// },
// subCategoriesList: {
//   marginTop: 20,
// },