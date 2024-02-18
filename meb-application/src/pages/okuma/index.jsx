import React, { useEffect, useState } from 'react'
import { Text } from '../../helper/text/index';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getStandartReportById, getTextById } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'
import { Helmet } from 'react-helmet';
function Okuma() {
    const [report, setReport] = useState([]);
    const [text,setText]=useState([]);
    const {id}  = useParams();

    const token = JSON.parse(localStorage.getItem('token'));
    const navigate=useNavigate();
    useEffect(() => {
        if (token == null) {
          navigate('/login', { replace: true });
        }
    
        getStandartReportById(id)
          .then((result) => {
            setReport(result?.data.data);
            console.log(report);
          })
          .catch((error) => {
            console.log(error);
            errorMessage('Bir hata oluştu1');
          });
      }, [token, id]);
    
      useEffect(() => {
        if (report && report.textId) {
          getTextById(report.textId)
            .then((result) => {
              setText(result?.data.data);
              console.log(result?.data);
              console.log(result?.data.data);
              console.log(text);
            })
            .catch((error) => {
              console.log(error);
              errorMessage('Bir hata oluştu2');
            });
        }
      }, [report]);
    
   
    
    
    const textHeader=""

    const orijinalVoiceUrl=""
    const oijinalText=text.textValue
    const studentVoiceUrl=""
    const studentText="Öğrencinin okuduğu metin ..."
   
    const different = report?.repeatedWords || [];
    return (
      <div className='py-0.5 space-y-10'>
      <Helmet>
        <title>Okuma</title>
      </Helmet>
    <div className='flex flex-col justify-center'>
        <ToastContainer />

        <h1 className='text-2xl my-3 font-bold flex justify-center'> {textHeader}</h1>
        <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-xl my-3  flex justify-center'>Orijinal Metin</h1>
                <textarea
                className='border-2 p-8 text-xl my-5 mb-10 rounded-xl'
                
                value={oijinalText}
                rows={10} // İstersen satır sayısını belirleyebilirsin
                cols={50} // İstersen sütun sayısını belirleyebilirsin
                readOnly
                />
                <audio src={orijinalVoiceUrl} controls className="w-full" />
            </div>
            <div  className='flex flex-col justify-center'>
                <h1 className='text-xl my-3  flex justify-center'>Okunan Metin</h1>
                <textarea
                className='border-2 p-8 text-xl my-5 mb-10 rounded-xl'
                
                value={studentText}
                rows={10} // İstersen satır sayısını belirleyebilirsin
                cols={50} // İstersen sütun sayısını belirleyebilirsin
                readOnly
                />
                <audio src={studentVoiceUrl} controls className="w-full" />
            </div>
        </div>
        <div className='flex justify-center'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-xl my-5 self-center'>Tekrar Edilen Kelimeler</h1>
                <div className='grid grid-cols-4 sm:grid-cols-2 gap-4'>
                    {different.map((diff,index=0)=>(
                        <div  className='self-center bg-white p-5 m-3 text-primary w-full rounded-2xl text-xl font-thin border-gray-300 border-2'>{index} - {diff}</div>
                    ))}
                </div>
            </div>
        </div>
    </div>
        </div>
    )
}

export default Okuma
