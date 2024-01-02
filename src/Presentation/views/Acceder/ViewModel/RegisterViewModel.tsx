import React, { useEffect, useState } from 'react'
import { ApiRogans } from '../../../../Data/source/remote/api/ApiRogans';
import { RegisterAuthUseCases } from '../../../../Domain/useCases/auth/RegisterAuth';
import { err } from 'react-native-svg/lib/typescript/xml';
const RegisterViewModel = () => {

 const [ errorMessage, setErrorMessage ] = useState('');

 const [ values, setValues ] = useState({
    name: '',
    lastname: '',
    email: '',
    document: '',
    phone: '',
    password: '',
    ConfirmPassword: '',
    birthdate: '',
 });

 const onChange = (property: string, value: any) => {
    setValues({...values, [property]: value })
 }

 const register = async () => {
   if(isValidForm()){
      const response = await RegisterAuthUseCases(values)
      console.log('RESULT', + JSON.stringify(response));   
   }
 }

//  valida si los campos estan vacios // y si las contraseñas no son iguales
 const isValidForm = (): boolean => {
      if(values.name === '') {
         setErrorMessage('Ingresa ru nombre')
         return false;
      }
       if(values.lastname === '') {
         setErrorMessage('Ingresa tu apellido')
         return false;
      }
       if(values.email === '') {
         setErrorMessage('Ingresa tu correo')
         return false;
      }
       if(values.document === '') {
         setErrorMessage('Ingresa tu cedula')
         return false;
      }
       if(values.phone === '') {
         setErrorMessage('Ingresa tu numero')
         return false;
      }
       if(values.password === '') {
         setErrorMessage('Ingresa tu contraseña')
         return false;
      }
       if(values.ConfirmPassword === '') {
         setErrorMessage('Ingresa tu confirmacion de la contraseña')
         return false;
      }
       if(values.name === '') {
         setErrorMessage('Ingresa tu fecha de nacimiento')
         return false;
      }
      if(values.password !== values.ConfirmPassword) {
         setErrorMessage('Las contraseñas no coiciden')
          return false;
      }

      return true;
 }

  return {...values, onChange, register, errorMessage}
}

export default RegisterViewModel;
