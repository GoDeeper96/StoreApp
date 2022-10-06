import FileStructure from '../../Models/FileStructure';

export const ADD_FOLDER = 'ADD_FOLDER';
export const SET_FOLDER = 'SET_FOLDER';
export const DELETE_FOLDER = 'DELETE_FOLDER';

export const fetchFolders = () => {
  return async (dispatch, getState) => {
    // const userId = getState().auth.userId; PARA EL FUTURO
    try {
      const response = await fetch(
        `https://lili-9fb6d-default-rtdb.firebaseio.com/folders.json`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedFolder = [];
      
      for (const key in resData) {
        loadedFolder.push(
          new FileStructure(
            key,
            resData[key].idCliente,
            resData[key].NameFolder,
            resData[key].NameClientes,       
            resData[key].FolderItems,
            new Date(resData[key].DateData)
          )
        );
      }
      for (const key in resData) {
        console.log(key,resData[key].idCliente,resData[key].NameFolder)
        
      }
      dispatch({ type: SET_FOLDER, folders: loadedFolder });
    } catch (err) {
      throw err;
    }
  };
};

export const addFolder = (idCliente,NameFolder,NameClientes,FolderItems) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const date = new Date();
    const response = await fetch(
      `https://lili-9fb6d-default-rtdb.firebaseio.com/folders/${idCliente}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idCliente,  
          NameFolder,
          NameClientes,
          FolderItems,
          CreationDate: date.toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_FOLDER,
      folderData: {
        id: resData.name,
        clientId:idCliente,
        FolderName:NameFolder,
        clientName:NameClientes,
        folder: FolderItems,
        date: date
      }
    });
  };
};
export const deleteFolder = folderId =>{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}
    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const res = await fetch(`https://lili-9fb6d-default-rtdb.firebaseio.com/folders/${userId}/${folderId}.json?auth=${token}`,{
        method:'DELETE'
        });
        
        if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
            type:DELETE_FOLDER,fid:folderId
        })
    }
}
// export const updateFolder= (
//     idCliente,
//     NameClientes,
//     DescriptionCliente,
//     RazonSocial,
//     ClientesImg,
//     Telefono,
//     Edad,
//     Dni,
//     Rubro,
//     ) =>
// {
//     //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}
//     return async (dispatch,getState)=>{
//         // console.log(getState);
//         const token = getState().auth.token;
//         const res = await fetch(
//             `https://lili-9fb6d-default-rtdb.firebaseio.com/files/${idCliente}.json?auth=${token}`
//             ,{
//              method:'PATCH', //PUT VA A SOBREESCRIBAR SOBRE LA NUEVA DATA, PATCH VA A ACTUALIZAD DONDE DGIAS QUE ACTUALICE
//              headers:{
//                  'Content-Type':'application/json'
//              },
//              body:JSON.stringify({
//                 NameClientes,
//                 DescriptionCliente,
//                 RazonSocial,
//                 ClientesImg,
//                 Telefono,
//                 Edad,
//                 Dni,
//                 Rubro,
//              })
//          });
//          if(!res.ok){
//             throw new Error('Something went wrong!')
//         }
//         dispatch({
//         type:UPDATE_CLIENT,
//         cid:idCliente,
//         ClientData:{
//             NameClientes,
//             DescriptionCliente,
//             RazonSocial,
//             ClientesImg,
//             Telefono,
//             Edad,
//             Dni,
//             Rubro,
//         }
//     });
        
//     }

// }

