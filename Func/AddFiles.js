const AddFiles = ()=>{

    const filesFromClient = AllFiles.filter(files => files.id === ClientId)
    return filesFromClient
    
    }
 export default AddFiles