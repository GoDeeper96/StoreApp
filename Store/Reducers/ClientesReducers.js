import Client from '../../Models/Clientes';
import { DELETE_CLIENT, CREATE_CLIENT, UPDATE_CLIENT, SET_CLIENT } from '../Actions/ClientesActions';

const initialState= {
    availableClients: [],
    // userLetras:[]
    // availableLetras: [],
    // userLetras:[]
};

export default (state = initialState,action) =>{
    switch (action.type) {
        case SET_CLIENT:
            return {
                availableClients: action.clientes,

            }
        case UPDATE_CLIENT:
            // const ProductsIndex = state.availableProducts.findIndex(client=>client.idProduct ===action.cid);
            const updatedClient = new Client(
                action.cid,
                action.ClientData.NameClientes,
                action.ClientData.DescriptionCliente,
                action.ClientData.RazonSocial,
                action.ClientData.ClientesImg,
                action.ClientData.Telefono,
                action.ClientData.Edad,
                action.ClientData.Dni,
                action.ClientData.Rubro,
            )
            
            const AvailableClientIndexes = state.availableClients.findIndex(
                pdr=>pdr.idCliente===action.cid
            );
            const updatedAvailableCli=[...state.availableClients];
            updatedAvailableCli[AvailableClientIndexes] = updatedClient;
            return {
                ...state,
                availableClients: updatedAvailableCli,
            }
        case CREATE_CLIENT:
            const newClient = new Client(
            action.ClientData.idCliente,
            action.ClientData.NameClientes,
            action.ClientData.DescriptionCliente,
            action.ClientData.RazonSocial,
            action.ClientData.ClientesImg,
            action.ClientData.Telefono,
            action.ClientData.Edad,
            action.ClientData.Dni,
            action.ClientData.Rubro,
            );
            return{
                ...state,
                availableClients: state.availableClients.concat(newClient),
            };
        case DELETE_CLIENT:
            return {
                ...state,
                availableClients:state.availableClients.filter(client=>client.idCliente!==action.cid),
                
            };
    }
    return state;
}