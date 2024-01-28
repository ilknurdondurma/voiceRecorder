import React, { useState } from 'react'
import Input from '../../components/Input/text';
import Button from '../../components/button';
import DropDown from '../Input/dropdown/index'
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckBox from '../Input/checkbox';
import { loginSchema } from '../../validation/auth/login';
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'
import { login } from '../../api';

//import { useAuth } from '../../context/authContext/authContext';

export default function LoginForm(){
  const navigate = useNavigate();
 // const {setUser}=useAuth();

const handleSubmit = (values, setSubmitting) => {

      console.log(values);
      var user ={
        "username": values?.username,
        "password": values?.password,
      }
            // API e GÖNDER 
            login(user)
            .then(data => {
              console.log(data);
          
              // Check if data is defined and has a status property
              if (data && data.status === 200) {
                succesMessage("Giriş başarılı anasayfaya yönlendiriliyorsunuz...")
                localStorage.setItem("token", JSON.stringify(data.data.data.token));
                localStorage.setItem("user", JSON.stringify(data.data.data));

                setTimeout(() => {
                  navigate("/",{replace:true});
                }, 2000);
              }
            })
            .catch(error => {
              console.error("login error:", error);
              errorMessage(error.data?.error || "An error occurred");
              setSubmitting(false);
            });
};
    return (
        <div className='flex justify-center p-5 sm:p-2 my-5' >
          <div className='flex justify-center text-center rounded-2xl bg-white w-1/2 sm:w-full h-auto self-center border-4 border-gray-300'>
            <div className='w-1/2 md:w-full sm:w-full p-5'>
              <Formik
              validationSchema={loginSchema}
                initialValues={{
                  username:"",
                  password:"",
                 
                }}
                  onSubmit={(values,{ setSubmitting }) => {
                    handleSubmit(values,setSubmitting)
                  }}>
          {({ setFieldValue,isSubmitting}) => (
                  <Form>
                    <div className='my-10 '>
                        <label className="font-bold text-2xl sm:text-md">Giriş Yap</label>
                        <Input className="sm:text-xs my-5" name="username" placeholder="Kullanıcı Adı"/>
                        <Input className="sm:text-xs my-5" name="password" type="password" placeholder="Şifre"/>

                        <Button
                          className="w-full rounded-xl m-2 sm:text-xs my-5 hover:bg-black hover:text-white"
                          type="submit"
                          variant="Primary"
                          size="large"
                          
                        >
                          Giriş Yap
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