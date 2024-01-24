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
//import { useAuth } from '../../context/authContext/authContext';

export default function LoginForm(){
  const navigate = useNavigate();
 // const {setUser}=useAuth();
 const classLevel = [
  { value: 1, label: "1. Sınıf "},
  { value: 2, label: "2. Sınıf" },
  { value: 3, label: "3. Sınıf" },
  { value: 4, label: "4. Sınıf" },
];
const userRole = [
  { value: "admin", label: "Admin"},
  { value: "student", label: "Öğrenci" },
  { value: "teacher", label: "Öğretim Görevlisi" },
];


const handleSubmit = (values, setSubmitting) => {
  console.log(values);

  // Create FormData object and append form values
  const formData = new FormData();
  formData.append("name", values?.name);
  formData.append("class", values?.class);
  formData.append("age", values?.age);
  formData.append("userRole", values?.userRole);

  // Convert FormData to object for easier storage
  const formDataObject = {};
  formData.forEach((value, key) => {
      formDataObject[key] = value;
  });

  // Save form data in localStorage
  localStorage.setItem("formData", JSON.stringify(formDataObject));
  navigate('/');

};
    return (
        <div className='flex justify-center p-5 sm:p-2 my-5' >
          <div className='flex justify-center text-center rounded-2xl bg-white w-1/2 sm:w-full h-auto self-center border-4 border-gray-300'>
            <div className='w-1/2 md:w-full sm:w-full p-5'>
              <Formik
              validationSchema={loginSchema}
                initialValues={{
                  name:"",
                  class:"",
                  age:"",
                  userRole:"",
                }}
                  onSubmit={(values,{ setSubmitting }) => {
                    handleSubmit(values,setSubmitting)
                  }}>
          {({ setFieldValue,isSubmitting}) => (
                  <Form>
                    <div className='my-10'>
                        <label className="font-bold text-2xl sm:text-md">Giriş Yap</label>
                        <Input className="sm:text-xs my-3" name="name" placeholder="İsim Soyisim"/>
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
                          <Input type="number" className="sm:text-xs my-3" name="age" placeholder="Yaşınız"/>
                        </div>
                        <DropDown
                            placeholder="Kullanıcı Rolü"
                            className="my-3"
                            name="userRole"
                            options={userRole}
                            onChange={(selectedValue) => {
                              console.log("Seçilen değer:", selectedValue);
                              setFieldValue("userRole", selectedValue);
                              
                          }}
                          />
                  
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