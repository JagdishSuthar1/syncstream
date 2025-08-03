import CryptoJS from "crypto-js"

const secret_key = "Jagdish_Suthar"

export type DecryptedDataType =  {
    id : number,
    creatorId : number
}

export function GetDecryptedData(encryptedData : string) {
    const shareUrlData = decodeURIComponent(encryptedData);
    const bytes =  (CryptoJS.AES.decrypt(shareUrlData, secret_key))
    const decryptedData  : DecryptedDataType = JSON.parse((bytes.toString(CryptoJS.enc.Utf8)))
    // //console.log(decryptedData)
    return decryptedData
}