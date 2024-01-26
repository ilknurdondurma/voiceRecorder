import React, { useEffect } from 'react'
import LoginForm from '../../components/loginForm/index'

function Login() {
  const formDataObject = JSON.parse(localStorage.getItem('formData'));
  const user=formDataObject?.name;
  useEffect(() => {
    if(user){
      localStorage.removeItem('formData');
    }

  }, [user])
  
  return (
    <div className='w-full h-full'>
      <LoginForm/>
    </div>
  )
}

export default Login
