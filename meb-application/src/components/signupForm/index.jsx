import React, { useState } from 'react'
import Input from '../../components/Input/text';
import Button from '../../components/button';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../Input/checkbox';
import DropDown from '../Input/dropdown';
import { signupSchema } from '../../validation/auth/signup';
import {cities , districts} from '../../helper/locationData'
import { ToastContainer} from 'react-toastify';
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'

export default function SignupForm(){

  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");

  const handleSubmit=(values,setSubmitting)=>{
    console.log(values)
      // USER NESNESİ OLUŞTUR
      var user = {
        "email": values?.email,
        "password": values?.password,
        "name": values?.name,
        "surname": values?.surname,
        "rating":5,
        "userType": "Admin",
        "city": values?.city,
        "district": values.district,
      }

  }
    return (
      <div className='signupForm flex justify-center p-5 sm:p-2 mt-5 '>
      <div className='flex justify-center text-center border rounded-2xl bg-my_border_color/60 w-1/2 sm:w-3/4'>
        <div className='w-full xl:w-1/2 2xl:w-1/2 p-5'>
          <Formik
            validationSchema={signupSchema}
            initialValues={{
              email:"",
              password:"",
              password2: "",
              remember:"",
              terms:"",
              city:"",
              district:""

            }}
            onSubmit={(values,{ setSubmitting }) => {
              handleSubmit(values,setSubmitting)
            }}>
      {({ setFieldValue,isSubmitting}) => (
              <Form>
                <label className="font-bold text-2xl sm:text-md ">Üye Ol</label>
                
                <Input className="sm:text-xs" name="email" placeholder="Cep Telefonu veya E-posta"/>
                <Input className="sm:text-xs" name="name" placeholder="Adınız"/>
                <Input className="sm:text-xs" name="surname" placeholder="Soyadınız"/>
                <div className='grid grid-cols-2 gap-1'>
                    <DropDown
                      placeholder="Şehir"
                      name="city"
                      options={cities}
                      onChange={(selectedValue) => {
                        console.log("Seçilen değer:", selectedValue);
                        setFieldValue("city", selectedValue);
                        setSelectedCity(selectedValue);
                        
                    }}
                    />
                  {selectedCity && (
                    <DropDown
                      placeholder='İlçe'
                      name='district'
                      options={districts[selectedCity]}
                      onChange={(selectedValue) => {
                        console.log("Seçilen ilçe:", selectedValue);
                        setFieldValue("district", selectedValue);
                      }}
                    />
                  )}
                  
                    
                </div>
                <Input className="sm:text-xs relative" name="password" type="password" placeholder="Şifre" />
                <Input className="sm:text-xs relative" name="password2" type="password" placeholder="Şifreyi Tekrar Gir" />
                <CheckBox className="line-clamp-1" name="remember" value="remember" label="Beni Hatırla"/>
                <CheckBox className="" name="terms" value="terms" label="Kaydolarak, Koşullarımızı, Gizlilik İlkemizi ve Çerezler İlkemizi kabul etmiş olursun."/>
                <Button
                      className={`w-full rounded-2xl m-2 sm:text-xs ${{isSubmitting} ? '' : 'opacity-50'} `}
                      type="submit"
                      variant="Purple"
                      
                    >
                      {isSubmitting ? "Hesap Oluşturuluyor..." : "Hesap Oluştur"}
                    </Button>                <p className='text-black/50 mt-5'>--- or ---</p>
                <Button className="w-full rounded-2xl bg-white m-2 sm:text-xs" variant="TransparentButton" onClick={() =>console.log("Button clicked")}> Google ile kaydolun </Button>
                <Button className="w-full rounded-2xl bg-white m-2 sm:text-xs mb-10" variant="TransparentButton" onClick={() =>console.log("Button clicked")}> Apple ile kaydol</Button>
                <p className='mt-2'>Zaten bir hesabın var mı ? <a href='/login' className='font-bold text-blue-600' >Giriş yap</a></p>
        
              </Form>
      )}
            </Formik>
        </div>
      </div>
      <ToastContainer/>
</div>
    );

}