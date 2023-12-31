import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { v4 } from 'uuid';

const firebaseConfig = {
    apiKey: "AIzaSyCeBPAFWtk1ZDSbIo-lPmUqHFWqthqSaiE",
    authDomain: "rogans-app-408201.firebaseapp.com",
    projectId: "rogans-app-408201",
    storageBucket: "rogans-app-408201.appspot.com",
    messagingSenderId: "488356227805",
    appId: "1:488356227805:web:71fcf96180d4b1099b8934",
    measurementId: "G-D8DJLJF7N8",
    databaseURL: "https://rogans-app-408201-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dbRealtime = getDatabase(app);
const storage = getStorage(app);

/**
 * Function to upolad file to fierbase
 * @param {File} file the file to uplad
 * @returns  {Promise<string>} url of the upladed file
 */

export async function uploadFile(file : any, nameFile : string , folderName : string ){

    try {

        const storageRef = ref(storage, `${folderName}/${v4()}${nameFile}`)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        console.log('aqui deberia estar la url', url)
        return url;
    } catch (error) {
        console.error('Error al cargar el archivo:', error);
        throw error;
    }

}


export { app, db, dbRealtime, firebaseConfig }