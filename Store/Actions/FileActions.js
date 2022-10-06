import File from "../../Models/File"
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CREATE_FILE = 'CREATE_FILE';
export const DELETE_FILE = 'DELETE_FILE';
export const UPDATE_FILE = 'UPDATE_FILE';
export const SET_FILE = 'SET_FILE';

export const fetchFiles= () =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json
    return async (dispatch,getState) =>{
        try {
        const userId = getState().auth.userId;
        const response = await fetch('https://lili-9fb6d-default-rtdb.firebaseio.com/files.json');
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        const loadedFiles = [];
        for(const file in resData){
            loadedFiles.push(
                new File(
                    file,
                    resData[file].idCliente,
                    resData[file].NameFile,
                    resData[file].NameClientes,
                    resData[file].DownloadUrl,
                    resData[file].CreationDate,
                    resData[file].Type,
                    resData[file].Size
                )
            );
        }
        dispatch({
            type:SET_FILE,
            files:loadedFiles,
            
        })
        } catch (error) {
            throw error;
        }    
    }
}
export const createFile = 
    (
    // id,
    // idUsuario,
    idCliente,
    NameFile,
    NameClientes,   
    DownloadUrl,
    CreationDate,
    Type,
    Size,
    ) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json?auth=${token}
    return async (dispatch,getState)=>{
     //ANY ASYNC CODE YOU WANT
     const token = getState().auth.token;
     const userId = getState().auth.userId;
     const response = await fetch(`https://lili-9fb6d-default-rtdb.firebaseio.com/files.json?auth=${token}`
     ,{
         method:'POST',
         headers:{
             'Content-Type':'application/json'
         },
         body:JSON.stringify({
            idCliente,
            NameFile,
            NameClientes,
            DownloadUrl,
            CreationDate,
            Type,
            Size,
         })
     });
     const resData = await response.json();

    //  console.log(resData);
      dispatch({
        type:CREATE_FILE,
        FileData:{
        idFile:resData.name,       
        idCliente,
        NameFile,
        NameClientes,
        DownloadUrl,
        CreationDate,
        Type,
        Size,
      }
    }
    ); 
    
    }
    
}
export const deleteFile = fileId =>{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}
    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const res = await fetch(`https://lili-9fb6d-default-rtdb.firebaseio.com/files/${fileId}.json?auth=${token}`,{
        method:'DELETE'
        });
        
        if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
            type:DELETE_FILE,fid:fileId
        })
    }
}
export const updateFile= (
    idFile,
    idCliente,
    NameFile,
    NameClientes,
    DownloadUrl,
    CreationDate,
    Type,
    Size,
    ) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}
    return async (dispatch,getState)=>{
        // console.log(getState);
        const token = getState().auth.token;
        const res = await fetch(
            `https://lili-9fb6d-default-rtdb.firebaseio.com/files/${idFile}.json?auth=${token}`
            ,{
             method:'PATCH', //PUT VA A SOBREESCRIBAR SOBRE LA NUEVA DATA, PATCH VA A ACTUALIZAD DONDE DGIAS QUE ACTUALICE
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                idCliente,
                NameFile,
                NameClientes,
                DownloadUrl,
                CreationDate,
                Type,
                Size,
             })
         });
         if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
        type:UPDATE_FILE,
        fid:idFile,
        FileData:{
            idCliente,
            NameFile,
            NameClientes,
            DownloadUrl,
            CreationDate,
            Type,
            Size,
        }
    });
        
    }

}

