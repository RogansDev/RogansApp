import React, { useEffect, useState } from 'react'
import useRegisterFirebase from '../../../../hooks/useRegisterFirebase';
const RegisterViewModel = () => {

   const { handleRegister, loading } = useRegisterFirebase();

   const [errorMessage, setErrorMessage] = useState('');

   const [values, setValues] = useState({
      name: '',
      lastname: '',
      phone: '',
      email: '',
      document: '',
      birthdate: '',
      password: '',
      ConfirmPassword: '',
      termsAccepted: false,
   });

   const onChange = (property: string, value: any) => {
      setValues({ ...values, [property]: value })
   }

   const register = () => {
      if (isValidForm()) {
         handleRegister(values);
      }
   };

   const calcularMayorDeEdad = (fechaNacimiento) => {
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

    const esEmailValido = (email) => {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regexEmail.test(email);
    };

   //  valida si los campos estan vacios // y si las contraseñas no son iguales
   const isValidForm = (): boolean => {
      if (values.name === '') {
         setErrorMessage('Ingresa tu nombre')
         return false;
      }
      if (values.lastname === '') {
         setErrorMessage('Ingresa tu apellido')
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
      if (values.birthdate === '') {
         setErrorMessage('Ingresa tu fecha de nacimiento')
         return false;
      }
      if (values.password === '') {
         setErrorMessage('Ingresa tu contraseña')
         return false;
      }
      if (values.password.length < 6) {
         setErrorMessage('La contraseña debe tener al menos 6 caracteres');
         return false;
      }
      if (values.ConfirmPassword === '') {
         setErrorMessage('Ingresa tu confirmación de la contraseña')
         return false;
      }
      if (values.password !== values.ConfirmPassword) {
         setErrorMessage('Las contraseñas no coiciden')
         return false;
      }
      if (!calcularMayorDeEdad(values.birthdate)) {
         setErrorMessage('Debes ser mayor de edad para registrarte');
         return false;
      }
      if (!values.termsAccepted) {
         setErrorMessage('Debes aceptar los términos y condiciones');
         return false;
      }

      return true;
   }

   return { ...values, onChange, register, errorMessage }
}

export default RegisterViewModel;
