class Cliente {
    constructor(
        idCliente,
        NameClientes,
        DescriptionCliente,
        RazonSocial,
        ClientesImg,
        Telefono,
        Edad,
        Dni,
        Rubro,
    )
    {
        this.idCliente = idCliente;
        this.NameClientes= NameClientes;
        this.DescriptionCliente = DescriptionCliente;
        this.RazonSocial=RazonSocial;
        this.ClientesImg=ClientesImg;
        this.Telefono=Telefono
        this.Edad=Edad;
        this.Dni = Dni;
        this.Rubro = Rubro;
    }
}
export default Cliente;