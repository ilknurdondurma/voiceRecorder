import React, { useEffect } from 'react'
import LoginForm from '../../components/loginForm/index'

import { Helmet } from 'react-helmet';
function Login() {
  const formDataObject = JSON.parse(localStorage.getItem('formData'));
  const user=formDataObject?.name;
  useEffect(() => {
    if(user){
      localStorage.removeItem('formData');
    }

  }, [user])
  
  return (
    <div className='py-0.5 space-y-10'>
      <Helmet>
        <title>Giriş Yap</title>
      </Helmet>
    <div className='w-full h-full'>
      <LoginForm/>
    </div>
    </div>
  )
}

export default Login
