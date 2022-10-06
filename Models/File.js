class File {
    constructor(
        idFile,
        idCliente,
        NameFile,
        NameClientes,
        DownloadUrl,
        CreationDate,
        Type,
        Size
    )
    {
        this.idFile = idFile; //1
        this.idCliente = idCliente; //2
        this.NameFile= NameFile; //3
        this.NameClientes= NameClientes; //4
        this.DownloadUrl = DownloadUrl; //5
        this.CreationDate = CreationDate; //6
        this.Type = Type; //7
        this.Size= Size; //8
    }
}
export default File;