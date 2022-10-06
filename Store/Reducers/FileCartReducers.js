import { ADD_TO_CARTFOLDER, REMOVE_FROM_CARTFOLDER } from '../Actions/FileCartActions';
import { ADD_FOLDER } from '../Actions/FileStructureActions';
import CartFile from '../../Models/File';

const initialState = {
  items: {},
//   totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CARTFOLDER:
        const NewFile = new CartFile(
            action.NameFile,
            action.DownloadUrl,
            action.Type,
            action.DateCreated,
            action.Size,
          );
    //   const addedFile = action.fil;
    //   const idCliente = action.idCliente;
    //   const ClientsName =  action.NameClientes;
    //   const DonwloadUrl= action.DownloadUrl;
    //   const CreationDate =  action.CreationDate;
    //   //   const prodPrice = addedFile.PrecioVenta;
    //   //   const prodTitle = addedFile.NameProduct;

    //   let updatedOrNewFile;
      
    //   if (state.items[addedFile.idFile]) {
    //     // already have the item in the cart
        

        
    //     updatedOrNewFile = new File(
    //       state.items[addedFile.idFile],
    //       idCliente,
    //       ClientsName,
    //       DonwloadUrl,
    //       CreationDate
    //     );
    //   } else {
    //     updatedOrNewFile = new File(1, idCliente, ClientsName, DonwloadUrl,CreationDate);
    //   }
      return {
        ...state,
        items: state.items.concat(NewFile),
      };
    case REMOVE_FROM_CARTFOLDER:
    //   const selectedFolderItem = state.items[action.pid];
    //   const fileIndex = state.items.findIndex(
    //     file => file.idFile === action.fid
    //   );
    //   const currentQty = selectedFolderItem.quantity;
    //   let updatedCartFiles;
    //   if (currentQty > 1) {
    //     // need to reduce it, not erase it
    //     const updatedCartFile = new File(
    //       selectedFolderItem.quantity - 1,
    //       selectedFolderItem.productPrice,
    //       selectedFolderItem.productTitle,
    //       selectedFolderItem.sum - selectedFolderItem.productPrice
    //     );
    //     updatedCartFiles = { ...state.items, [action.pid]: updatedCartFile };
    //   } else {
    //     updatedCartFiles = { ...state.items };
    //     delete updatedCartFiles[action.pid];
    //   }
      
    //   const updatedCartFile = new CartFile(
    //     action.fid,
    //     state.userProducts[productIndex].ownerId,
    //     action.productData.title,
    //     action.productData.imageUrl,
    //     action.productData.description,
    //     state.userProducts[productIndex].price
    //   );
      let updatedCartFiles;
      updatedCartFiles = { ...state.items };
      delete updatedCartFiles[action.fid];
      return {
        ...state,
        items: updatedCartFiles,
      };
    case ADD_FOLDER:
      return initialState;
  }

  return state;
};
