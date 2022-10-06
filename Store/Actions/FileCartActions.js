export const ADD_TO_CARTFOLDER = 'ADD_TO_CARTFOLDER';
export const REMOVE_FROM_CARTFOLDER = 'REMOVE_FROM_CARTFOLDER';

export const addToCartFolder = file => {
  return { type: ADD_TO_CARTFOLDER, file: file };
};

export const removeFromCartFolder= fileId => {
  return { type: REMOVE_FROM_CARTFOLDER, fid: fileId };
};
