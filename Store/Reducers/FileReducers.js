import File from '../../Models/File';
import { CREATE_FILE, DELETE_FILE, SET_FILE, UPDATE_FILE } from '../Actions/FileActions';

const initialState= {
    availableFiles: [],
    // userLetras:[]
    // availableLetras: [],
    // userLetras:[]
};

export default (state = initialState,action) =>{
    switch (action.type) {
        case SET_FILE:
            return {
                availableFiles: action.files,

            }
        case UPDATE_FILE:
            // const ProductsIndex = state.availableFiles.findIndex(product=>product.idProduct ===action.pid);
            const updatedFile = new File(
                action.fid,
                action.FileData.idCliente,
                action.FileData.NameClientes,
                action.FileData.DownloadUrl,
                action.FileData.CreationDate,
                action.FileData.Type,
            )
            const AvailableFileIndexes = state.availableFiles.findIndex(
                file=>file.idFile===action.fid
            );
            const updatedAvailableFile=[...state.availableFiles];
            updatedAvailableFile[AvailableFileIndexes] = updatedFile;
            return {
                ...state,
                availableFiles: updatedAvailableFile,
            }
        case CREATE_FILE:
            const newFile = new File(
            action.FileData.idFile,           
            action.FileData.idCliente,
            action.FileData.NameFile,
            action.FileData.NameClientes,
            action.FileData.DownloadUrl,
            action.FileData.CreationDate,
            action.FileData.Type,
            action.FileData.Size,
            );
            return{
                ...state,
                availableFiles: state.availableFiles.concat(newFile),
            };
        case DELETE_FILE:
            return {
                ...state,
                availableFiles:state.availableFiles.filter(file=>file.idFile!==action.fid),
                
            };
    }
    return state;
}