const flatToSection = (AllFiles,ClientId)=>{
  
  return AllFiles.filter(files => files.idCliente === ClientId);

  }
  
  
  
  export default flatToSection