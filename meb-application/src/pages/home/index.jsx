import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import PieChart from '../../components/charts';

function Home() {
  const formDataObject = JSON.parse(localStorage.getItem('user'));
  const user=formDataObject?.username;
  const token = JSON.parse(localStorage.getItem('token'));
  const navigate=useNavigate();
  useEffect(() => {
    if(token==null){
      navigate('/login', {replace:true})
    }
  }, [token])
  
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
