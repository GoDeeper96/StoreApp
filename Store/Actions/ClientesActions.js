import Client from "../../Models/Clientes"
import AsyncStorage from '@react-native-async-storage/async-storage';
export const DELETE_CLIENT = 'DELETE_CLIENT';
export const CREATE_CLIENT = 'CREATE_CLIENT';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export const SET_CLIENT = 'SET_CLIENT';

export const fetchClients= () =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json
    return async (dispatch,getState) =>{
        try {
        const userId = getState().auth.userId;
        const response = await fetch('https://lili-9fb6d-default-rtdb.firebaseio.com/clientes.json');
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        const loadedClients = [];
        for(const cliente in resData){
            loadedClients.push(
                new Client(
                    cliente,
                    resData[cliente].NameClientes,
                    resData[cliente].DescriptionCliente,
                    resData[cliente].RazonSocial,
                    resData[cliente].ClientesImg,
                    resData[cliente].Telefono,     
                    resData[cliente].Edad,    
                    resData[cliente].Dni,  
                    resData[cliente].Rubro,  
                )
            );
        }
        dispatch({
            type:SET_CLIENT,
            clientes:loadedClients,
            
        })
        } catch (error) {
            throw error;
        }    
    }
}
export const createClient = 
    (
    // id,
    // idUsuario,
    NameClientes,
    DescriptionCliente,
    RazonSocial,
    ClientesImg,
    Telefono,
    Edad,
    Dni,
    Rubro,
    ) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json?auth=${token}
    return async (dispatch,getState)=>{
     //ANY ASYNC CODE YOU WANT
     const token = getState().auth.token;
     const userId = getState().auth.userId;
     const response = await fetch(`https://lili-9fb6d-default-rtdb.firebaseio.com/clientes.json?auth=${token}`
     ,{
         method:'POST',
         headers:{
             'Content-Type':'application/json'
         },
         body:JSON.stringify({
            NameClientes,
            DescriptionCliente,
            RazonSocial,
            ClientesImg,
            Telefono,
            Edad,
            Dni,
            Rubro,
         })
     });
     const resData = await response.json();

    //  console.log(resData);
      dispatch({
        type:CREATE_CLIENT,
        ClientData:{
        idCliente:resData.name,
        NameClientes,
        DescriptionCliente,
        RazonSocial,
        ClientesImg,
        Telefono,
        Edad,
        Dni,
        Rubro,
      }
    }
    ); 
    
    }
    
}
export const deleteClient = clienteId =>{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}
    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const res = await fetch(`https://lili-9fb6d-default-rtdb.firebaseio.com/clientes/${clienteId}.json?auth=${token}`,{
        method:'DELETE'
        });
        
        if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
            type:DELETE_CLIENT,cid:clienteId
        })
    }
}
export const updateClient = (
    idCliente,
    NameClientes,
    DescriptionCliente,
    RazonSocial,
    ClientesImg,
    Telefono,
    Edad,
    Dni,
    Rubro,
    ) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}
    return async (dispatch,getState)=>{
        // console.log(getState);
        const token = getState().auth.token;
        const res = await fetch(
            `https://lili-9fb6d-default-rtdb.firebaseio.com/clientes/${idCliente}.json?auth=${token}`
            ,{
             method:'PATCH', //PUT VA A SOBREESCRIBAR SOBRE LA NUEVA DATA, PATCH VA A ACTUALIZAD DONDE DGIAS QUE ACTUALICE
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                NameClientes,
                DescriptionCliente,
                RazonSocial,
                ClientesImg,
                Telefono,
                Edad,
                Dni,
                Rubro,
             })
         });
         if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
        type:UPDATE_CLIENT,
        cid:idCliente,
        ClientData:{
            NameClientes,
            DescriptionCliente,
            RazonSocial,
            ClientesImg,
            Telefono,
            Edad,
            Dni,
            Rubro,
        }
    });
        
    }

}

