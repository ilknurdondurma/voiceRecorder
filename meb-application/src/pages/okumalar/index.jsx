import React, { useEffect, useState } from 'react'
import Button from '../../components/button/index'
import { FaBookOpenReader } from "react-icons/fa6";
import Table from '../../components/table/index'
import { useNavigate } from 'react-router-dom';
import { getAllStandartReport } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';

function Okumalar() {
  const [reports , setReports]=useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const formDataObject = JSON.parse(localStorage.getItem('user'));
  const userId=formDataObject?.id;
  const navigate=useNavigate();
  useEffect(() => {
    if(token==null){
      navigate('/login', {replace:true})
    }

    getAllStandartReport()
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
    { key: "studentFullName", label: 'Uygulayan Öğrenci' },
    { key: "correctlyWordCount", label: 'Doğru Kelime Sayısı' },
    { key: "werScore", label: 'Doğru Okuma Yüzdesi' },
    { key: "repeatedWords", label: 'Tekrarlı Kelimeler' },


  ];
  const filteredOkuma = reports.filter((rep) => rep.studentId === userId);
  console.log("filtered"+filteredOkuma);

  return (
    <div className='py-0.5 space-y-10'>
      <Helmet>
        <title>Okumalar</title>
      </Helmet>
    <div className='w-full flex justify-center'>
      <ToastContainer />

    <div className='w-full  flex flex-col justify-center '>
      <h1 className='text-xl my-3 font-bold flex sm:mx-5'><FaBookOpenReader size="20px" color='black' />OKUMALAR</h1>
      <div>
          <Button variant="PrimaryOutline" className="my-5 text-black">Filtrele</Button>
      </div>
      <Table data={reports} columns={tableColumns}  route={"okuma"}/>

    </div>

    </div>
</div>
  )
}

export default Okumalar
