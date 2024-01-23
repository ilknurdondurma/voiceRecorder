import React from 'react'
import { CiAlignTop } from "react-icons/ci";
import Table from '../../components/table';
import Button from '../../components/button/index'

function Skor() {
  const tableData = [
    {id:1, appName: 'Uygulama 1', appDate: '01.01.2023', correctWords: 150, totalWords: 200, wordRecognition: 75 },
    {id:2, appName: 'Uygulama 2', appDate: '05.15.2023', correctWords: 120, totalWords: 150, wordRecognition: 80 },
    {id:3, appName: 'Uygulama 3', appDate: '01.01.2023', correctWords: 150, totalWords: 200, wordRecognition: 75 },
    {id:4, appName: 'Uygulama 4', appDate: '05.15.2023', correctWords: 120, totalWords: 150, wordRecognition: 80 },
    {id:5, appName: 'Uygulama 5', appDate: '01.01.2023', correctWords: 150, totalWords: 200, wordRecognition: 75 },
    {id:6, appName: 'Uygulama 6', appDate: '05.15.2023', correctWords: 120, totalWords: 150, wordRecognition: 80 },
    {id:7, appName: 'Uygulama 7', appDate: '01.01.2023', correctWords: 150, totalWords: 200, wordRecognition: 75 },
    {id:8, appName: 'Uygulama 8', appDate: '05.15.2023', correctWords: 120, totalWords: 150, wordRecognition: 80 },
    {id:9, appName: 'Uygulama 9', appDate: '01.01.2023', correctWords: 150, totalWords: 200, wordRecognition: 75 },
    {id:10, appName: 'Uygulama 10', appDate: '05.15.2023', correctWords: 120, totalWords: 150, wordRecognition: 80 },
    {id:11, appName: 'Uygulama 11', appDate: '01.01.2023', correctWords: 150, totalWords: 200, wordRecognition: 75 },
    {id:12, appName: 'Uygulama 12', appDate: '05.15.2023', correctWords: 120, totalWords: 150, wordRecognition: 80 },
    {id:13, appName: 'Uygulama 13', appDate: '01.01.2023', correctWords: 150, totalWords: 200, wordRecognition: 75 },
    {id:14, appName: 'Uygulama 14', appDate: '05.15.2023', correctWords: 120, totalWords: 150, wordRecognition: 80 },
   
  ];

  const tableColumns = [
    { key: 'appName', label: 'Materyal Adı' },
    { key: 'appDate', label: 'Materyal Tarihi' },
    { key: 'correctWords', label: 'Doğru Kelime Sayısı' },
    { key: 'totalWords', label: 'Toplam Kelime Sayısı' },
    { key: 'wordRecognition', label: 'Kelime Tanıma Yüzdesi' },

  ];
  return (
    <div className='w-full flex justify-center'>
        <div className='w-full  flex flex-col justify-center '>
          <h1 className='text-xl my-3 font-bold flex sm:mx-5'><CiAlignTop  size="30px" color='black' style={{ transform: 'rotate(180deg)' }} />SKORLARIM</h1>
          <div>
              <Button variant="PrimaryOutline" className="my-5 text-black">Filtrele</Button>
          </div>
          <Table data={tableData} columns={tableColumns} initialSort={"appDate"} route={"rapor"}/>

        </div>

    </div>
  )
}

export default Skor
