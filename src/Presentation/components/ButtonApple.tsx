import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import React, { useState } from 'react'
import Icons from '../theme/Icons';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../utils/RootParamList';
import { setGoogleInfo } from '../../state/GoogleDataSlice';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { saveCredentials } from '../../services/credentials';
import { setUserInfo } from '../../state/ProfileSlice';

const ButtonApple = (props: any) => {

    const { Apple } = Icons;
    const { title = 'Continuar con Apple' } = props;
    const [error, setError] = useState();
    const [loading, setloading] = useState(false);
    const distpach = useDispatch();
    const navigation = useNavigation<StackNavigationProp<RootParamList>>();

    const handleOnPress = async () => {
        try {
            const credential: any = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            const desiredLength = 48; 
            let userId = credential?.identityToken;
            if (userId.length > desiredLength) {
            userId = userId.substring(0, desiredLength);
            }

            const apple = {
                google_id: userId,
                email: credential?.email,
                urlphoto: '',
                idToken: userId,
                name: credential?.fullName?.familyName 
            }
            distpach(setGoogleInfo(apple));

            try {
                const userQuery = query(
                    collection(db, "users"),
                    where("user_id", "==", userId)
                );
                
                const querySnapshot = await getDocs(userQuery);                
                let selectedEmail: any;

                querySnapshot.forEach((doc) => {
                    selectedEmail = doc.data();
                });
                
                if (selectedEmail) {
                    const user: any = {
                        user_id: selectedEmail?.user_id,
                        email: selectedEmail?.email,
                        role: selectedEmail?.role,
                        urlphoto: selectedEmail?.urlphoto == "" ? apple.urlphoto : selectedEmail?.urlphoto,
                        document: selectedEmail?.document,
                        name: selectedEmail?.name,
                        lastname: selectedEmail?.lastname,
                        phone: selectedEmail?.phone,
                        birthdate: selectedEmail?.birthdate,
                        logged: true
                    }
                    await saveCredentials('email', selectedEmail.email);
                    await saveCredentials('googleToken', selectedEmail.user_id);
                    distpach(setUserInfo(user));
                    setloading(false);
                } else {
                    setloading(false);
                    navigation.navigate("GoogleRegister");
                }
            } catch (error: any) {
                console.log('error........................', error);
                setError(error);
                setloading(false);
                Alert.alert(`No se pudo ingresar error ${error}`);
            }
        } catch (e: any) {
            if (e.code === 'ERR_CANCELED') {
                console.log('Inicio de sesión con Apple cancelado por el usuario');
                Alert.alert('Atencion', 'Inicio de sesión con Apple cancelado por el usuario');
            } else {
                console.error(e);
                Alert.alert('Error', 'Ocurrió un error durante el inicio de sesión con Apple.');
            }
        }
    }
    return (
        <Pressable style={styles.button} onPress={handleOnPress}>
            <View style={styles.view}>
                <Apple width={30} height={24} color={'white'} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </Pressable>
    )
}

export default ButtonApple

const styles = StyleSheet.create({
    button: {
        width:230,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        elevation: 3,
        backgroundColor: 'black',
        borderRadius: 15,
        marginVertical: 10,
    },
    view: {
        flexDirection: "row"
    },
    text: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        marginLeft: 10
    },
});