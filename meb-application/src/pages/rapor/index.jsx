import React, { useEffect, useState } from 'react';
import { SiSpeedtest } from "react-icons/si";
import { TbSum } from "react-icons/tb";
import { LuBadgePercent } from "react-icons/lu";
import { LuRepeat2 } from "react-icons/lu";
import { GoMirror } from "react-icons/go";
import { GiEchoRipples } from "react-icons/gi";
import { GiChoice } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import PieChart from '../../components/charts/index'
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Rapor() {
  const [bugununTarihi, setBugununTarihi] = useState(null);
  const [report, setReport] = useState({});
  const token = JSON.parse(localStorage.getItem('token'));
  const formDataObject = JSON.parse(localStorage.getItem('user'));
  const user=formDataObject?.username;
  const navigate=useNavigate();


  useEffect(() => {
    if(token==null){
      navigate('/login', {replace:true})
    }

    const bugun = new Date();
    const gun = bugun.getDate();
    const ay = bugun.getMonth() + 1; // Aylar 0'dan başlar, bu yüzden +1 ekliyoruz.
    const yil = bugun.getFullYear();

    const formattedTarih = `${gun}/${ay}/${yil}`;

    setBugununTarihi(formattedTarih);

    const rapor = {
      user: "",
      material: 'Bir Tatil Anısı',
      date:"25/01/2024",
      speechSpeed: 150, // okuma hızı
      totalWordCount: 500, // toplam kelime sayısı
      correctlyWordCount: 450,
      countOfWordsReadWrong:50, // doğru okunan kelime sayısı
      werScore: 90, // kelime tanıma yüzdesi
      repeatedWordCount: 150, // tekrarlı okuma
     // pairedRead: 500, // eşli okuma
     // reverberantRead: 150, // yankılayıcı okuma
     // choirRead: 90, // koro okuma
    };

    setReport(rapor);
  }, [token]); 

  const reportBilgileri = [
    { label: 'Okuma Hızı', key: 'speechSpeed', unit: 'Kelime/Dakika',color:'',  icon:<SiSpeedtest size="25px" />},
    { label: 'Toplam Kelime Sayısı', key: 'totalWordCount', unit: 'Kelime',color:'', icon:<TbSum  size="25px"   /> },
    { label: 'Doğru Okunan Kelime Sayısı', key: 'correctlyWordCount', unit: 'Kelime',color:'#c4e17f', icon:<TiTick  size="25px"  /> },
    //{ label: 'Yanlış Okunan Kelime Sayısı', key: 'countOfWordsReadWrong', unit: 'Kelime',color:'#ffc2b8', icon:<IoClose   size="25px"  /> },
    { label: 'Kelime Tanıma Yüzdesi', key: 'werScore', unit: '%' ,color:'', icon:<LuBadgePercent  size="25px"   /> },
    { label: 'Tekrarlı Okuma', key: 'repeatedWordCount', unit: 'Kelime' ,color:'', icon:<LuRepeat2  size="25px"  /> },
   // { label: 'Eşli Okuma', key: 'pairedRead', unit: 'Kelime' ,color:'', icon:<GoMirror  size="25px"  /> },
   // { label: 'Yankılayıcı Okuma', key: 'reverberantRead', unit: 'Kelime',color:'', icon:<GiEchoRipples  size="25px"  /> },
    //{ label: 'Koro Okuma', key: 'choirRead', unit: 'Kelime' ,color:'',icon:<GiChoice  size="25px"  /> },
  ];
  const correct =(report?.correctlyWordCount * 100) / report?.totalWordCount;
  const failed =100-correct;

  const chartData = [
    {
      value: correct,
      name: 'Doğru Okunan Kelime Sayısı',
    },
    { value: failed, name: 'Yanlış Okunan Kelime Sayısı' },
  ];
  return (
    <div className='w-full flex justify-center'>
      <div className='w-full sm:w-full md:w-full bg-white p-6 rounded-lg shadow-md'>
        <h1 className='font-bold text-3xl mb-5 text-center text-quaternary'>
          Değerlendirme Sonucu
        </h1>
        <h3 className='text-l mb-5 text-center text-gray-600 border-b-2'>
          {user} - {bugununTarihi}
        </h3>
        <h1 className='text-gray-600 text-lg  text-center flex justify-center pb-2 p-1'>
          Değerlendirilen Materyal : <span className='text-md'>{report?.material}</span>
        </h1>
        

        <div className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-1 gap-4'>
            <div className='flex flex-col justify-center col-span-1 sm:hidden md:hidden'>
                  <PieChart data={chartData}/>
            </div>
          
            <div className='col-span-3 md:col-span-1 border border-black/30 h-auto  m-3 rounded-md '>
              <div className=''>
                  <div className='w-full flex self-center border-b-2 font-bold  bg-secondary p-5'>
                    DEĞERLENDİRME AYRINTISI
                  </div>
                  {reportBilgileri.map((bilgi, index) => (
                    <div key={index} className={`flex px-5 py-5 border-b-2 overflow-hidden `} style={{ backgroundColor: bilgi.color }}>
                      <div className='p-1'>{bilgi.icon}</div>
                          <div className='p-1 font-bold'>{bilgi.label} :  </div>
                          <div className='p-1 text-primary'>{report?.[bilgi.key]}</div>
                          <div className='p-1'>{bilgi.unit}</div>
                     </div>
                      
                    ))}
              </div>
            </div>
        
        </div>
      </div>
    </div>
  );
}

export default Rapor;
