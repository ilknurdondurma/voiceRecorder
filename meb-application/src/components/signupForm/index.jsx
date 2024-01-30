import React, { useEffect, useState } from 'react'
import Input from '../../components/Input/text';
import Button from '../../components/button';
import DropDown from '../Input/dropdown/index'
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckBox from '../Input/checkbox';
import { signupSchema } from '../../validation/auth/signup';
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'
import { signUp } from '../../api';

//import { useAuth } from '../../context/authContext/authContext';

export default function SignUpForm(){
  const navigate = useNavigate();
 // const {setUser}=useAuth();
 const classLevel = [
  { value: 1, label: "1. Sınıf "},
  { value: 2, label: "2. Sınıf" },
  { value: 3, label: "3. Sınıf" },
  { value: 4, label: "4. Sınıf" },
];
useEffect(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
}, [])



const handleSubmit = (values, setSubmitting) => {
      console.log(values);

      var user ={
        "name": values?.name,
        "surname":values?.surname,
        "class": values?.class,
        "username": values?.username,
        "password": values?.password,
      }
            // API e GÖNDER 
            signUp(user)
            .then(data => {
              console.log(data);
          
              // Check if data is defined and has a status property
              if (data && data.status === 200) {
                succesMessage("Kayıt başarılı girişe yönlendiriliyorsunuz...")
                setTimeout(() => {
                  navigate("/login",{replace:true});
                }, 2000);
              }
            })
            .catch(error => {
              console.error("Sign-up error:", error);
              errorMessage(error.response?.data?.error || "An error occurred");
              setSubmitting(false);
            });
};
    return (
        <div className='flex justify-center p-5 sm:p-2 my-5' >
          <div className='flex justify-center text-center rounded-2xl bg-white w-1/2 sm:w-full h-auto self-center border-4 border-gray-300'>
            <div className='w-1/2 md:w-full sm:w-full p-5'>
              <Formik
              validationSchema={signupSchema}
                initialValues={{
                  name:"",
                  surname:"",
                  class:"",
                  username:"",
                  password:"",
                }}
                  onSubmit={(values,{ setSubmitting }) => {
                    handleSubmit(values,setSubmitting)
                  }}>
          {({ setFieldValue,isSubmitting}) => (
                  <Form>
                    <div className='my-10'>
                        <label className="font-bold text-2xl sm:text-md">Kayıt Ol</label>
                        <div className='grid grid-cols-2 gap-4 sm:grid-cols-1'>
                          <Input className="sm:text-xs my-3" name="name" placeholder="İsim"/>
                          <Input className="sm:text-xs my-3" name="surname" placeholder="Soyisim"/>

                        </div>
                        <div className='flex sm:grid sm:grid-cols-1 gap-4'>
                          <DropDown
                            placeholder="Sınıf"
                            className="my-3"
                            name="class"
                            options={classLevel}
                            onChange={(selectedValue) => {
                              console.log("Seçilen değer:", selectedValue);
                              setFieldValue("class", selectedValue);
                              
                          }}
                          />
                        </div>
                        <Input className="sm:text-xs my-3" name="username" placeholder="Kullanıcı Adı"/>
                        <Input className="sm:text-xs my-3" type="password" name="password" placeholder="Şifre"/>
                        <div onClick={()=>navigate('/login')} className='cursor-pointer' > Hesabın  var mı? Giriş yap!</div>

                  
                        <Button
                          className="w-full rounded-xl m-2 sm:text-xs my-5 hover:bg-black hover:text-white"
                          type="submit"
                          variant="Primary"
                          size="large"
                          
                        >
                          Kayıt OL
                        </Button>
                    </div>
               </Form>
          )}
                </Formik>
            </div>
          </div>
          <ToastContainer/>
    </div>
    );

}