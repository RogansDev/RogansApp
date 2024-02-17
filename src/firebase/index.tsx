import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

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

        const storageRef = ref(storage, `${folderName}/${nameFile}`)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        return url;
    } catch (error) {
        console.error('Error al cargar el archivo:', error);
        throw error;
    }

}

export async function SendEmailResetPassword(email: string) {
    try {
        const auth = getAuth();
        
        // Envia el correo electrónico de restablecimiento de contraseña
        await sendPasswordResetEmail(auth, email);
        
        console.log('Correo electrónico de restablecimiento de contraseña enviado correctamente.');
    } catch (error) {
        console.error('Error al enviar el correo electrónico de restablecimiento de contraseña:', error);
        throw error;
    }
}

export { app, db, dbRealtime, firebaseConfig }