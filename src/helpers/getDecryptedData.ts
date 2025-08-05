import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

const secret_key = "Jagdish_Suthar"

export type DecryptedDataType =  {
    id : number,
    creatorId : number
}

export function GetDecryptedData(encryptedData : string) {
    const shareUrlData = decodeURIComponent(encryptedData);
    const bytes =  (AES.decrypt(shareUrlData, secret_key))
    console.log((bytes.toString(Utf8)))
    const decryptedData  : DecryptedDataType = JSON.parse((bytes.toString(Utf8)))
    return decryptedData
}
