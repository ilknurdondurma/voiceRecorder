import React, { useEffect } from 'react'
import SoundRecorder from '../../components/voiceRecorder'
import { Text, TextHeader } from '../../helper/text/index';
import { useNavigate } from 'react-router-dom';
function VoiceRecord() {
  const token = JSON.parse(localStorage.getItem('token'));
  const navigate=useNavigate();
  useEffect(() => {
    if(token==null){
      navigate('/login', {replace:true})
    }
  }, [token])
  
  const id=1
  const text=Text;
  const textHeader=TextHeader;

   return (
    <div className='w-full flex flex-col justify-center'>
        <h1 className='text-2xl my-3 font-bold flex justify-center'> {textHeader}</h1>
        <textarea
        className='border-2 p-5 text-xl my-5 mx-10 mb-10 rounded-xl '
        
        value={text}
        rows={15} // İstersen satır sayısını belirleyebilirsin
        cols={100} // İstersen sütun sayısını belirleyebilirsin
        readOnly
      />
      <SoundRecorder/>
    </div>
  )
}

export default VoiceRecord
