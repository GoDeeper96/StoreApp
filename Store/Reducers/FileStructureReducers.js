import { ADD_FOLDER, SET_FOLDER, DELETE_FOLDER } from '../Actions/FileStructureActions';
import FileStructure from '../../Models/FileStructure';
const initialState = {
  folders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLDER:
      return {
        folders: action.folders
      };
    case ADD_FOLDER:
      const newFolder = new FileStructure(
        action.folderData.id,
        action.folderData.clientId,
        action.folderData.FolderName,
        action.folderData.clientName,
        action.folderData.folder,
        action.folderData.date,
      );
      return {
        ...state,
        folders: state.folders.concat(newFolder)
      };
      case DELETE_FOLDER:
        let updatedFolders;
        updatedFolders = { ...state.items };
        delete updatedFolders[action.folderId];
        return {
            ...state,
            folders: updatedFolders,
          };
  }

  return state;
};