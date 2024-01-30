import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PieChart from '../../components/charts';
import Button from '../../components/button';
import Spin from '../../components/spin';

function NotFounded() {
  const navigate=useNavigate();

  const goToHome = () => {
    navigate('/')
  };

  return (
    <div className='w-full flex justify-center'>
        <div className='w-full  flex flex-col justify-center '>
          <h1 className='font-bold my-5'>Aradığınız Sayfa Bulunamadı ! </h1>
               <div onClick={goToHome} className='underline'>Ansayfaya git</div>
               
        </div>

    </div>
  )
}

export default NotFounded
