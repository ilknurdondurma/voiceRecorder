import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const formDataObject = JSON.parse(localStorage.getItem('formData'));
  const user=formDataObject?.name;
  const navigate=useNavigate();
  useEffect(() => {
    if(user==null){
      navigate('/login', {replace:true})
    }
  }, [user])
  
  return (
    <div className='w-full flex justify-center'>
        <div className='w-full  flex flex-col justify-center '>
          <h1 className='font-bold my-5'>Anasayfa</h1>
       <p>
       Ölçme: Herhangi bir niteliği gözlemlemek, gözlem sonuçlarını sayı yada sembollerle ifade etme işidir.
Ölçme işleminin aşamaları: Beş aşamadan oluşur;
1.Ölçülecek niteliklerin belirlenmesi
2.Ölçme aracının hazırlanması
3.Ölçme kuralı
4.Ölçme işlemini uygulama
5.Eşleştirme yapılması<br></br><br></br>
Ölçme kuralı: Ölçme işlemini yaparken niteliğin hangi miktarına ne değer verileceğinin belirlenmesidir. Ör: Yazılı yapan bir öğretmenin 1-2-3. sorulara; 5 puan, 4-5. sorulara 10 puan vereceğini belirlemesi.
Ölçme Türleri
1.Doğrudan Ölçme: Ölçülmek istenen özellik ile ölçme aracının nitelikleri aynı olduğunda doğrudan ölçme oluşur. Perde boyunun metre ile ölçülmesi, bir miktar incirin eşit kollu terazide ölçülmesi…
2.Dolaylı Ölçme<br></br><br></br>
*Göstergeyle Ölçme: Ölçülen özellik ile ölçme aracının niteliği birbirinden farklı ise bu tür ölçmelere göstergeyle ölçme denir. Ör: Termometre ile odanın sıcaklığını ölçme, bir öğrencinin zeka düzeyinin belirlenmesi…
*Türetilmiş Ölçme: Ölçülmek istenen özellik en az iki değişken arasındaki bağıntıdan yola çıkılarak elde ediliyorsa bu tür ölçmelere denir.Ör: Bir derste geçer notun belirlenmesi(vize*%40)(final*%60), bir öğrencinin IQ sunun ölçülmesi..
<br></br><br></br>IQ=<br></br><br></br>
Ölçmede Birim: Ör: Bir avuç fındık dendiğinde zihinde farklı miktarlarda fındık canlanmaktadır.Oysa ki 1 kg fındık dendiğinde herkes için aynı miktarda fındık zihinde oluşmaktadır, işte bu nedenle ölçmede birim kullanılmaktadır.
*Doğal Birim: Ör: Sınıftaki öğrenci sayısının belirlenmesinde her bir öğrencinin 1 birim olması
       </p>
        </div>

    </div>
  )
}

export default Home
