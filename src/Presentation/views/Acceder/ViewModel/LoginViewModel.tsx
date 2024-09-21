import { useState } from 'react'

const LoginViewModel = () => {

  const [ values, setValues ] = useState({
      phone: "",
  });

  const onChange = (property: string, value: any) => {
     setValues({...values, [property]: value})
  }


  return {...values, onChange}
}

export default LoginViewModel;
