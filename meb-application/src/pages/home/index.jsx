import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


function Home() {
  const formDataObject = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(false)
  const user=formDataObject?.username;
  const token = JSON.parse(localStorage.getItem('token'));
  const navigate=useNavigate();
  useEffect(() => {
    if(token==null){
      navigate('/login', {replace:true})
    }
  }, [token])
  
  const spinn=async ()=>{
    setLoading(true)
   await  setInterval(() => {
      setLoading(false)
  }, 5000);
 
  }
  return (
    <div className='py-0.5 space-y-10'>
      <Helmet>
        <title>Ana Sayfa</title>
      </Helmet>
    <div className='w-full flex justify-center'>
        <div className='w-full  flex flex-col justify-center '>
          <h1 className='font-bold my-5'>Anasayfa</h1>
               Hoşgeldiniz! {user}
               
        </div>

    </div>
    </div>
  )
}

export default Home
