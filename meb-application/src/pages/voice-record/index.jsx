import React, { useEffect, useState } from 'react'
import SoundRecorder from '../../components/voiceRecorder'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTextById } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';

function VoiceRecord({studentName,studentSurname,studentClass}) {
  const token = JSON.parse(localStorage.getItem('token'));
  const navigate=useNavigate();
  const { id } = useParams();
  const [text,setText]=useState([]);
  const location = useLocation();
  const formValues = location.state;

  useEffect(() => {
    if(token==null){
      navigate('/login', {replace:true})
    }

    getTextById(id)
      .then((result) => {
        setText(result?.data.data);
        console.log("text: ")
        console.log(text);
      })
      .catch((error) => {
        console.log(error);
        errorMessage("Bilinmeyen bir hata oluştu.")
      });

  }, [token])


  const textContent=text.textValue;
  const textHeader=text.header;

   return (
   <div className='py-0.5 space-y-10'>
   <Helmet>
     <title>Yeni Okuma</title>
    
   </Helmet>
    <div className='w-full flex flex-col justify-center'>
        <ToastContainer />

        <h1 className='text-2xl my-3 font-bold flex justify-center'> {textHeader}</h1>
        <div className='flex mx-10 gap-2 sm:mx-0'>
          Öğrenci :
          <p>{formValues.name}</p>
          <p>{formValues.surname}</p>
          <p>Sınıf: {formValues.class}</p>
        </div>
        <textarea
        className='border-2 p-5 text-xl my-5 mx-10 mb-10 rounded-xl sm:w-full sm:mx-0 '
        
        value={textContent}
        rows={15} // İstersen satır sayısını belirleyebilirsin
        cols={100} // İstersen sütun sayısını belirleyebilirsin
        readOnly
      />
      <SoundRecorder textId={text.id}/>
    </div>
    </div>
  )
}

export default VoiceRecord
