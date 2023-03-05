import { getCookie } from "./cookieHelper"

export const authorization = () => {
    return {
        headers: { 
            Authorization: `Bearer ` + getCookie('token'),
            'Access-Control-Allow-Origin' : '*'
        }
    }
}

export const isAuthenticated = () => {
    if(!getCookie('token')) return false;
    return true;
}