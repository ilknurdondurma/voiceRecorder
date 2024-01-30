import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { CiAlignTop } from "react-icons/ci";
import { FaBookOpenReader } from "react-icons/fa6";
import {BiSolidBookAdd } from "react-icons/bi";
import { MdChevronRight } from "react-icons/md";
import RoundProgressBar from '../progressBar';
import { getAllReport } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'
function Sidebar() {
  const sidebarElements = [
    {
      id: 1,
      title: 'Skorlarım',
      icon: <CiAlignTop  size="20px" color='black' style={{ transform: 'rotate(180deg)' }} />,
      route:'skorlarim'
    },
    {
      id: 2,
      title: 'Okumalarım',
      icon: <FaBookOpenReader size="20px" color='black' />,
      route:'okumalarim'
    },
    {
      id: 3,
      title: 'Yeni Okuma',
      icon: <BiSolidBookAdd size="20px" color='black'/>,
      route:'yeni-okuma'
    },
  ];
  const [reports, setReports] = useState([])
  const navigate=useNavigate();
  const formDataObject = JSON.parse(localStorage.getItem('user'));
  const userId=formDataObject?.id;
  useEffect(() => {
    getAllReport()
    .then((result)=>{
      setReports(result?.data.data)
      console.log(reports)
    })
    .catch((error)=>{
      console.log(error);
      errorMessage("Bir hata oluştu")

    })
  }, [])

  // kullanıcıya ait son raporu göstermek için
  const filteredReports = reports.filter((rep) => rep.studentId === userId);
  const lastReport = filteredReports[filteredReports.length - 1];
  const progressValue = lastReport ? parseFloat(lastReport.werScore).toFixed(2) : '0.00';

    const goReportHandle = () => {
      if (filteredReports.length === 0) {
        navigate("/404");
      } 
     else{
      navigate(`/rapor/${lastReport.id}`);
     }
    };
  return (
    <div className=' fixed w-1/6 md:w-1/4 border-gray-400 bg-white border-2 rounded-xl p-1 m-4 h-4/5  '>
      <div className='h-full text-black text-md pt-5  flex flex-col justify-between'>
        <div className='self-start w-full pl-4 lg:pl-2'>
          {sidebarElements.map((menu) => (
            <NavLink key={menu.id} to={`/${menu.route}`}>
              <div key={menu.id} className='flex justify-between  m-2 p-2 cursor-pointer hover:bg-primary hover:text-white  rounded-md border-b-2'>
                <div className='flex'>
                  <div className='mr-2'>{menu.icon}</div>
                  <div>{menu.title}</div>
                </div>
                <MdChevronRight color='black' />
              </div>
            </NavLink>
          ))}
        </div>
        <div className=' w-3/4 h-1/3 self-center my-10 bg-primary text-white p-10 rounded-3xl text-center flex flex-col justify-center border-black border-2'>
          <span className='text-sm font-bold p-1 self-center'>Son<br></br>Okuma <br></br>Performansım</span>
          <span className='self-center p-1' onClick={goReportHandle}><RoundProgressBar progress={progressValue} star={true} /></span>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;


