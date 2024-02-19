import { FacebookAuthProvider, getAuth, signInWithCredential } from 'firebase/auth';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { app } from '../../firebase';

const ButtonFacebook = () => {

    const signInWithFB = async () => {

        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        console.log('result', result)
        if (result.isCancelled) {
            throw new Error('permiso denegado');
        }
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
            throw new Error('algo salio mal');
        }
        const auth = getAuth(app)
        const credential = FacebookAuthProvider.credential(data.accessToken);
        const user = await signInWithCredential(auth, credential);

        console.log('user', user)


    }
    return (
        <TouchableOpacity style={styles.button} onPress={() => { signInWithFB() }}>
            <Text style={styles.text}>Ingresar con Facebook</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1877F2', 
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 16
    }
});
export default ButtonFacebook;