import React, { useEffect, useState } from 'react'
import { CiAlignTop } from "react-icons/ci";
import Table from '../../components/table';
import Button from '../../components/button/index'
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'
import { getAllReport,} from '../../api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
function Skor() {
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
                  <ToastContainer />

        <div className='w-full  flex flex-col justify-center '>
          <h1 className='text-xl my-3 font-bold flex sm:mx-5'><CiAlignTop  size="30px" color='black' style={{ transform: 'rotate(180deg)' }} />SKORLARIM</h1>
          <div>
              <Button variant="PrimaryOutline" className="my-5 text-black">Filtrele</Button>
          </div>
          <Table data={reports} columns={tableColumns} route={"rapor"}/>

        </div>

    </div>
  )
}

export default Skor
