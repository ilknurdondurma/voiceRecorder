import React, { useEffect, useState } from 'react';
import { SiSpeedtest } from "react-icons/si";
import { TbSum } from "react-icons/tb";
import { LuBadgePercent } from "react-icons/lu";
import { LuRepeat2 } from "react-icons/lu";
import { GoMirror } from "react-icons/go";
import { GiEchoRipples } from "react-icons/gi";
import { GiChoice } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import RoundProgressBar from '../../components/progressBar';
function Rapor() {
  const [bugununTarihi, setBugununTarihi] = useState(null);
  const [report, setReport] = useState({});
  const formDataObject = JSON.parse(localStorage.getItem('formData'));
  const user = formDataObject?.name;

  useEffect(() => {
    const bugun = new Date();
    const gun = bugun.getDate();
    const ay = bugun.getMonth() + 1; // Aylar 0'dan başlar, bu yüzden +1 ekliyoruz.
    const yil = bugun.getFullYear();

    const formattedTarih = `${gun}/${ay}/${yil}`;

    setBugununTarihi(formattedTarih);

    const rapor = {
      user: "",
      material: 'Kırmızı Başlıklı Kız',
      date:"25/01/2024",
      readSpeed: 150, // okuma hızı
      totalCountWord: 500, // toplam kelime sayısı
      countOfWordsReadCorrect: 450, // doğru okunan kelime sayısı
      wordRecognitionPercentage: 90, // kelime tanıma yüzdesi
      repeatedRead: 150, // tekrarlı okuma
      pairedRead: 500, // eşli okuma
      reverberantRead: 150, // yankılayıcı okuma
      choirRead: 90, // koro okuma
    };

    setReport(rapor);
  }, []); 

  const reportBilgileri = [
    { label: 'Okuma Hızı', key: 'readSpeed', unit: 'Kelime/Dakika',icon:<SiSpeedtest size="25px" />},
    { label: 'Toplam Kelime Sayısı', key: 'totalCountWord', unit: 'Kelime' ,icon:<TbSum  size="25px"   /> },
    { label: 'Doğru Okunan Kelime Sayısı', key: 'countOfWordsReadCorrect', unit: 'Kelime',icon:<TiTick  size="25px"  /> },
    { label: 'Kelime Tanıma Yüzdesi', key: 'wordRecognitionPercentage', unit: '%' ,icon:<LuBadgePercent  size="25px"   /> },
    { label: 'Tekrarlı Okuma', key: 'repeatedRead', unit: 'Kelime' ,icon:<LuRepeat2  size="25px"  /> },
    { label: 'Eşli Okuma', key: 'pairedRead', unit: 'Kelime' ,icon:<GoMirror  size="25px"  /> },
    { label: 'Yankılayıcı Okuma', key: 'reverberantRead', unit: 'Kelime',icon:<GiEchoRipples  size="25px"  /> },
    { label: 'Koro Okuma', key: 'choirRead', unit: 'Kelime',icon:<GiChoice  size="25px"  /> },
  ];

  return (
    <div className='w-full flex justify-center'>
      <div className='w-4/5 sm:w-full md:w-full bg-white p-6 rounded-lg shadow-md'>
        <h1 className='font-bold text-3xl mb-5 text-center text-quaternary'>
          Değerlendirme Sonucu
        </h1>
        <h3 className='text-l mb-5 text-center text-gray-600 border-b-2'>
          {user} - {bugununTarihi}
        </h3>
        <h1 className='text-gray-600 text-lg  text-center flex justify-between pb-2 px-2'>
          Değerlendirilen Materyal : <span className='text-md'>{report?.material}</span>
        </h1>
        

        <div className='grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-4'>
          {reportBilgileri.map((bilgi, index) => (
            <div key={index} className=' border border-black/30 h-36  m-3 rounded-md hover:border-2'>
              <div className=''>
                  <div className='w-full flex self-center border-b-2 font-bold  bg-secondary p-5'>{bilgi.label} : </div>
                  <div className='grid grid-cols-5 mt-3 p-2'>
                      <div className=' flex flex-col justify-center col-span-1 border-r-2 m-2'>{bilgi.icon}</div>
                      <div className='flex'>
                          <div className='flex  self-center text-2xl font-bold text-primary/80'>
                              {report?.[bilgi.key]} <span className='text-sm mx-2 pt-3'>{bilgi.unit}</span>
                          </div>
                        
                      </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rapor;
