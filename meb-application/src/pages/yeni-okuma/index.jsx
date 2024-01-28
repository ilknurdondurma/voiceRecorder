import React, { useEffect, useState } from 'react'
import {BiSolidBookAdd } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { getAllText } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'

function YeniOkuma({ selectedClassLevel}) {

  const formDataObject = JSON.parse(localStorage.getItem('user'));
  const userClass=formDataObject?.class;
  selectedClassLevel=1;

  const [texts,setTexts]=useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const navigate=useNavigate();


  useEffect(() => {
    if(token==null){
      navigate('/login', {replace:true})
    }
    getAllText()
      .then((result)=>{
        setTexts(result?.data.data)
        console.log(texts)
      })
      .catch((error)=>{
        console.log(error);
        errorMessage("Bir hata oluştu")

      })
  
    
  }, [token]);

  const filteredTexts = texts.filter((text) => text.class === selectedClassLevel);



  const colorPalette = ['#e0fbfc', '#d8e2dc', '#ffe5d9', '#c4e17f', '#f9ebae','#f6daf0','#ffc2b8','#b8f5ff']; // Soft renk paleti
  let colorIndex = 0;
  const getRandomColor = () => {
    const currentColor = colorPalette[colorIndex];
    colorIndex = (colorIndex + 1) % colorPalette.length;
    return currentColor;
  };
  return (
    <div className='w-full flex justify-center'>
  <div className='w-full  flex flex-col justify-center '>
    <h1 className='text-xl my-3 font-bold flex sm:mx-5'>
      <BiSolidBookAdd size="20px" color='black'/>YENİ OKUMA
    </h1>
    <h3 className='border-b-2'>{`${selectedClassLevel}. SINIF İÇİN METİNLER`}</h3>

    {filteredTexts.length === 0 ? (
      <p className='my-5'>{selectedClassLevel} sınıf için  metin bulunamadı.</p>
    ) : (
      <div className='grid 2xl:grid-cols-5 grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-5 '>
        {filteredTexts.map((text) => (
          <Link to={`/voice-record/${text.id}`} key={text.id}>
            <div className="flex flex-col justify-center w-52 h-40 md:w-40 md:h-36 sm:w-32 sm:h-28 text-center border-2 rounded-md mx-2 overflow-hidden hover:underline hover:border-black" style={{backgroundColor: getRandomColor()}}>
              <h3 className='tracking-[0.1em]'>{text.header}</h3>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
</div>
  )
}

export default YeniOkuma

