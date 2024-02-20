import React, { useEffect } from 'react'
import VerticalBarChart from '../../../../components/charts/verticalBarChart'
import { FaAngleDoubleRight } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
function Sonuc() {
  const werScore1 = (parseFloat(localStorage.getItem('werScore1')) ||0);
  const werScore2 = (parseFloat(localStorage.getItem('werScore2')) ||0);
  const werScore3 = (parseFloat(localStorage.getItem('werScore3')) ||0);
  const avarage=((werScore1+werScore2+werScore3)/3)||0

  const handleCloseTest=()=>{
    
    console.log("sonlandırıldı")
    localStorage.removeItem('werScore1');
    localStorage.removeItem('werScore2');
    localStorage.removeItem('werScore3');
    localStorage.removeItem('quizId');
    localStorage.removeItem('cefrLevel');


  }
  const checkQuizId=localStorage.getItem('quizId');
  const navigate=useNavigate();

  useEffect(() => {
    if (checkQuizId===null) {
      navigate('/yeni-test')
    }
  }, [checkQuizId]);
  

  return (
    <div>
      <ToastContainer/>
        <div className='flex justify-end mx-10 '>
          <NavLink to={"/yeni-test"} className="rounded-xl bg-green w-1/6 border-2 text-center p-2" onClick={handleCloseTest}>
            <div 
              className=' flex justify-center gap-2 hover:underline' >
                Testi Sonlandır
              <FaAngleDoubleRight size="20px" />
            </div>
          </NavLink>
        </div>
        <h1 className="text-xl flex justify-center">TEST SONUCUNUZ : </h1>
        <div className="flex justify-center">
          <h1 className="my-5 border-2 rounded-full p-8 text-sm w-28  m-3 font-bold flex flex-col justify-center items-center">
            <span className='flex'>Ortalama</span>
            { parseFloat(avarage).toFixed(2)} </h1>
        </div>
        <h1 className="text-xl flex justify-center my-5"> BAŞARI SEVİYESİ : </h1>
        <div className="flex justify-center"><VerticalBarChart cefr={avarage}  /></div>
      </div>
  )
}

export default Sonuc
