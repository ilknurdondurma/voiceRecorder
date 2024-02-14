import React, { useEffect } from 'react'
import LoginForm from '../../components/loginForm/index'
import SignUpForm from '../../components/signupForm';
import { Helmet } from 'react-helmet';

function SignUp() {
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
        <title>Kayıt Ol</title>
      </Helmet>
    <div className='w-full h-full'>
      <SignUpForm/>
    </div>
    </div>
  )
}

export default SignUp
