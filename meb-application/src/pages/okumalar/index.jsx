import React, { useEffect, useState } from 'react'
import Button from '../../components/button/index'
import { FaBookOpenReader } from "react-icons/fa6";
import Table from '../../components/table/index'
import { useNavigate } from 'react-router-dom';
import { getAllReport } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'

function Okumalar() {
  const [reports , setReports]=useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const navigate=useNavigate();
  useEffect(() => {
    if(token==null){
      navigate('/login', {replace:true})
    }

    getAllReport()
    .then((result)=>{
      setReports(result?.data.data)
      console.log(reports)
    })
    .catch((error)=>{
      console.log(error);
      errorMessage("Bir hata oluştu")

    })
  }, [token])
  

  const tableColumns = [
    { key: "textHeader", label: 'Materyal Adı' },
    { key: "date", label: 'Materyal Tarihi' },
    { key: "correctlyWordCount", label: 'Doğru Kelime Sayısı' },
    { key: "totalWordCount", label: 'Toplam Kelime Sayısı' },
    { key: "werScore", label: 'Kelime Tanıma Yüzdesi' },

  ];


  return (
    <div className='w-full flex justify-center'>
    <div className='w-full  flex flex-col justify-center '>
      <h1 className='text-xl my-3 font-bold flex sm:mx-5'><FaBookOpenReader size="20px" color='black' />OKUMALAR</h1>
      <div>
          <Button variant="PrimaryOutline" className="my-5 text-black">Filtrele</Button>
      </div>
      <Table data={reports} columns={tableColumns}  route={"okuma"}/>

    </div>

</div>
  )
}

export default Okumalar
