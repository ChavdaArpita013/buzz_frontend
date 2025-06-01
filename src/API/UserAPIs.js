import { getPassKey, getUserData } from "@/utils/getUserData";
import { decrypt, encrypt } from "@/utils/PasswordEncryption";
import axios from "axios";
import Cookies from "js-cookie";

export const server_url = "http://localhost:8081";

const createUser = async (formdata, navigate) => {
    try {
        const response = await axios.post(`${server_url}/public/create-user`, {
            userName: formdata.userName,
            password: formdata.password,
            email: formdata.email,
            birthDate:formdata.birthDate
        });

        if (response.status === 200) {
            Cookies.set('user', JSON.stringify({ name: formdata.userName, loggedIn: true }), { expires: 7, path: '/', secure: true });
            Cookies.set('passKey', JSON.stringify({ name: encrypt(formdata.password), loggedIn: true }), { expires: 7, path: '/', secure: true });

            navigate('/all-buzz');
        }
    } catch (error) {
        console.error("Error creating user:", error);
    }
};
const loginUser = async (formData, navigate) => {
    try {
        const response = await axios.post(`${server_url}/public/login`, {
            userName: formData.userName,
            password: formData.password,
        }, { 
            withCredentials: true 
        });

        if (response.status == 200) {
            Cookies.set('user', JSON.stringify({ name: formData.userName, loggedIn: true }), { expires: 7, path: '/', secure: true });
            Cookies.set('passKey', JSON.stringify({ name: encrypt(formData.password), loggedIn: true }), { expires: 7, path: '/', secure: true });

            navigate('/all-buzz');
        }
    } catch (error) {
        console.error("Error Logging In User", error);
    }
};

const findUserByUserName = async() =>{
    try {
        const userName = getUserData();
        const passKey = getPassKey();
        const decrypted = passKey ? decrypt(passKey) : '';
        const response = await axios.get(`${server_url}/user/${userName}`,{
            auth:{
                username : userName,
                password:decrypted
            }
        })

        if(response.status === 200){
            return response.data;
        }
        
    } catch (error) {
        console.log(`error fetching user with name ${userName}`);
        
    }
}


const updateUserData = async() =>{
    try {
        const userName = getUserData();
        const passKey = getPassKey();
        const decrypted = passKey ? decrypt(passKey) : '';
        const response = await axios.put(`${server_url}/user`,{
            auth:{
                username : userName,
                password:decrypted
            }
        })

        if(response.status === 200){
            return response.data;
        }
        
    } catch (error) {
        console.log(`error updating user with name ${userName}`);
        
    }
}
export { createUser, loginUser ,findUserByUserName , updateUserData};
