import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const formDataObject = JSON.parse(localStorage.getItem('formData'));
  const user=formDataObject?.name;
  const navigate=useNavigate();
  useEffect(() => {
    if(user==null){
      navigate('/login', {replace:true})
    }
  }, [user])
  
  return (
    <div className='w-full flex justify-center'>
        <div className='w-full  flex flex-col justify-center '>
          <h1 className='font-bold my-5'>Anasayfa</h1>
               Hoşgeldiniz! {user}
        </div>

    </div>
  )
}

export default Home
