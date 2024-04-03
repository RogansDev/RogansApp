import { useEffect, useState } from 'react'
import useRegisterFirebase from '../../../../hooks/useRegisterFirebase';
import { useSelector } from 'react-redux';


const GoogleRegisterViewModel = () => {

    const { handleGoogleRegister, loading } = useRegisterFirebase();
    const { google } = useSelector((state: any) => state);
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        name: google.name ?? '',
        phone: '',
        email: google.email ?? '',
        document: '',
        birthdate: '',
        photo:google.photo ?? '',
        google_id:google.google_id ?? '',
        idToken:google.idToken ?? '',        
        termsAccepted: false,
    });

    useEffect(() => {
     console.log('data...', JSON.stringify(google, null, 5))     
    }, [google])
    

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const register = () => {
        if (isValidForm()) {
            handleGoogleRegister(values);
        }
    };

    const calcularMayorDeEdad = (fechaNacimiento: any) => {
        const partesFecha = fechaNacimiento.split('/');
        const fechaNacimientoDate = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);

        const fechaActual = new Date();

        let edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
        const mes = fechaActual.getMonth() - fechaNacimientoDate.getMonth();

        if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimientoDate.getDate())) {
            edad--;
        }

        return edad >= 18;
    };

    const esEmailValido = (email : any) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    };

    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage('Ingresa tu nombre')
            return false;
        }
    
        if (values.phone === '') {
            setErrorMessage('Ingresa tu teléfono')
            return false;
        }
        if (values.email === '') {
            setErrorMessage('Ingresa tu correo')
            return false;
        }
        if (!esEmailValido(values.email)) {
            setErrorMessage('Ingresa un correo válido');
            return false;
        }
        if (values.document === '') {
            setErrorMessage('Ingresa tu cédula')
            return false;
        }
        // Se comenta o elimina la validación de la fecha de nacimiento siendo obligatoria.
        /*
        if (values.birthdate === '') {
            setErrorMessage('Ingresa tu fecha de nacimiento')
            return false;
        }
        */
    
        // Se modifica la condición para calcular si es mayor de edad solo si se ha proporcionado la fecha de nacimiento.
        if (values.birthdate && !calcularMayorDeEdad(values.birthdate)) {
            setErrorMessage('Debes ser mayor de edad para registrarte');
            return false;
        }
        if (!values.termsAccepted) {
            setErrorMessage('Debes aceptar los términos y condiciones');
            return false;
        }
    
        return true;
    }    

    return { ...values, onChange, register, errorMessage, loading }
}

export default GoogleRegisterViewModel;
