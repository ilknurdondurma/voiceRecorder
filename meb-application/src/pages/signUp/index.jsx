import React, { useEffect } from 'react'
import LoginForm from '../../components/loginForm/index'
import SignUpForm from '../../components/signupForm';

function SignUp() {
  const formDataObject = JSON.parse(localStorage.getItem('formData'));
  const user=formDataObject?.name;
  useEffect(() => {
    if(user){
      localStorage.removeItem('formData');
    }

  }, [user])
  
  return (
    <div className='w-full h-full'>
      <SignUpForm/>
    </div>
  )
}

export default SignUp
