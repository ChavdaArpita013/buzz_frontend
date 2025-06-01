import Cookies from "js-cookie";

export const getUserData = () => {
    const userCookie = Cookies.get("user");
    if(!userCookie)return null;
    const parsevalue = JSON.parse(userCookie);
    return parsevalue.name;
    
    
}

export const getPassKey = () => {
    const passKeyCookie = Cookies.get("passKey");
    if(!passKeyCookie)return null;
    const parsedvalue = JSON.parse(passKeyCookie);
    return parsedvalue.name
}