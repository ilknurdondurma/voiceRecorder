import React, { useEffect } from 'react'
import { Text } from '../../helper/text/index';
import { useNavigate } from 'react-router-dom';

function Okuma() {
    const token = JSON.parse(localStorage.getItem('token'));
    const navigate=useNavigate();
    useEffect(() => {
      if(token==null){
        navigate('/login', {replace:true})
      }
    }, [token])
    
    const textHeader="Kırmızı Başlıklı Kız"

    const orijinalVoiceUrl=""
    const oijinalText=Text
    const studentVoiceUrl=""
    const studentText="Üçüncü sınıfı pekiyi ile geçmiştim. Babam, karnemi görünce çok sevindi.\n— Bu yaz, tatili hak ettin Erdinç, dedi.\nBeni dayımın köyüne gönderdi."
   
    const different=["pekiyi","Erdinç","karnemi","telâşlanmışlardı"]

    return (
    <div className='flex flex-col justify-center'>
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
                <h1 className='text-xl my-3 self-center'>Farklılıklar Listesi</h1>
                <div className='grid grid-cols-4 sm:grid-cols-2 gap-4'>
                    {different.map((diff,index=0)=>(
                        <div  className='self-center bg-white p-5 m-3 text-primary w-full rounded-2xl text-xl font-thin border-gray-300 border-2'>{index} - {diff}</div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Okuma
