import React from 'react'
import Button from '../../components/button/index'
import { FaBookOpenReader } from "react-icons/fa6";
import Table from '../../components/table/index'

function Okumalar() {
  const tableData=[];
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
      <h1 className='text-xl my-3 font-bold flex sm:mx-5'><FaBookOpenReader size="20px" color='black' />OKUMALAR</h1>
      <div>
          <Button variant="PrimaryOutline" className="my-5 text-black">Filtrele</Button>
      </div>
      <Table data={tableData} columns={tableColumns} initialSort={"appDate"} />

    </div>

</div>
  )
}

export default Okumalar
