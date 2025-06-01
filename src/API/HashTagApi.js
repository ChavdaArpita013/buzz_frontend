import axios from "axios";
import { server_url } from "./UserAPIs";
import { getPassKey, getUserData } from "@/utils/getUserData";
import { decrypt } from "@/utils/PasswordEncryption";


const getTrendingHashTags = async() =>{
    try {
        const userName = getUserData();
        const password = getPassKey();
        const decryptedPass = decrypt(password);
        
        const response =await axios.get(`${server_url}/hashtag/trending`,{
            auth:{
                username:userName,
                password:decryptedPass
            }
        })
        
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        console.log("Error getting trending hashtags" , error);
        
    }
}
export {getTrendingHashTags}