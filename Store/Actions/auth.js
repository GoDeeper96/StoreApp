import AsyncStorage from '@react-native-async-storage/async-storage';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const IS_LOADING = 'IS LOADING';

export const isLoading = () =>{
    return { type: 'IS_LOADING'}

}
export const setDidTryAl = () =>{
    return { type: 'SET_DID_TRY_AL'}
}
let timer;
export const authenticate = (userId,token,expirydate) =>{
    console.log("asdsadas")
    return dispatch =>{
        dispatch(SetLogoutTimer(expirydate));
        dispatch({ 
            type:AUTHENTICATE,
            userId:userId,
            token:token,
        })
    }
}
export const login = (email,password) =>
{
    return async dispatch =>{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpmX_Ke7VSU_tEFVhXouHWXgCEer_gVFE',
        {
            method:'POST',
            headers: { 'Content-Type': 'application/'},
            body: JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })

        })
        if((!response.ok))
        {
            const errorData = await response.json();
            const errorId = errorData.error.message;
            let msg = 'Something went wrong';
            if(errorId==='EMAIL_NOT_FOUND')
            {
                msg = 'Este email no existe'
            }else if(errorId==='INVALID_PASSWORD')
            {
                msg = 'Esta contraseña no es valida';
            }
            throw new Error(msg);
        }
        console.log(resData);
        const resData = await response.json();
        dispatch(
            authenticate(
                resData.localId,
                resData.idToken,
                parseInt(resData.expiresIn)*1000
            )
        )
        const expirationDate = new Date(new Date().getTime()+parseInt(resData.expiresIn)*1000);
        saveEmail(email);
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
    }
}
export const logout = () =>{
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return {
        type:LOGOUT
    }
}

const clearLogoutTimer = () =>{
    if(timer){
        clearTimeout(timer);
    }
}

const SetLogoutTimer = expirationTime =>{
    return dispatch =>{
        timer = setTimeout(()=>{
            dispatch(logout());
        },expirationTime/2);
    }
}
const saveEmail = (email) =>{
    AsyncStorage.setItem('userEmail',email);
}
const saveDataToStorage = (token,userId,expirationDate) =>{
    AsyncStorage.setItem('userData',JSON.stringify({
        token:token,
        userId:userId,
        expiryDate:expirationDate.toISOString()
    }))
}