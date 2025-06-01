import CryptoJs from "crypto-js";

const SECRETE_KEY = "98K8A67657S64";


//encrypts the value pasword = passKey
export const encrypt = (passKey) => {
    return CryptoJs.AES.encrypt(passKey, SECRETE_KEY).toString();
}

//decrypts the value
export const decrypt = (passKey) => {
    const bytes = CryptoJs.AES.decrypt(passKey, SECRETE_KEY);
    return bytes.toString(CryptoJs.enc.Utf8);
}
