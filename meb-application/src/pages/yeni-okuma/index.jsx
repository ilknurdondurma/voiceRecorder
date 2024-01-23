import React from 'react'
import {BiSolidBookAdd } from "react-icons/bi";

function YeniOkuma({ selectedClassLevel=3}) {
  const texts = [
    {
      "textId": 1,
      "header": "Kırmızı Başlıklı Kız",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 3,
      "textLevel": 1
    },
    {
      "textId": 2,
      "header": "Mavi Ayakkabılı Kız",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 3,
      "textLevel": 2
    },
    {
      "textId": 3,
      "header": "Altın Saçlı Kız",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 2,
      "textLevel": 3
    },
    {
      "textId": 4,
      "header": "Kayıp Kıta",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 4,
      "textLevel": 4
    },
    {
      "textId": 5,
      "header": "Uzaylı Ziyaretçi",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 5,
      "textLevel": 1
    },
    {
      "textId": 6,
      "header": "Deniz Altında",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 3,
      "textLevel": 2
    },
    {
      "textId": 7,
      "header": "Yıldızlar Arası Yolculuk",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 4,
      "textLevel": 3
    },
    {
      "textId": 8,
      "header": "Şeker Ormanı",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 2,
      "textLevel": 4
    },
    {
      "textId": 9,
      "header": "Gizemli Dağ",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 3,
      "textLevel": 1
    },
    {
      "textId": 10,
      "header": "Rengarenk Balıklar",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 3,
      "textLevel": 2
    },
    {
      "textId": 11,
      "header": "Ejderha Diyarı",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 4,
      "textLevel": 3
    },
    {
      "textId": 12,
      "header": "Güneşin Altında",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 3,
      "textLevel": 4
    },
    {
      "textId": 13,
      "header": "Çiçek Bahçesi",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 5,
      "textLevel": 1
    },
    {
      "textId": 14,
      "header": "Uçan Kuşlar",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 3,
      "textLevel": 3
    },
    {
      "textId": 15,
      "header": "Ay Işığında",
      "text": "Hikaye içeriği buraya gelecek...",
      "classLevel": 4,
      "textLevel": 3
    }
   
  ];
  const filteredTexts = texts.filter((text) => text.classLevel === selectedClassLevel);



  const colorPalette = ['#e0fbfc', '#d8e2dc', '#ffe5d9', '#c4e17f', '#f9ebae']; // Soft renk paleti
  let colorIndex = 0;
  const getRandomColor = () => {
    const currentColor = colorPalette[colorIndex];
    colorIndex = (colorIndex + 1) % colorPalette.length;
    return currentColor;
  };
  return (
    <div className='w-full flex justify-center'>
    <div className='w-full  flex flex-col justify-center '>
      <h1 className='text-xl my-3 font-bold flex sm:mx-5'><BiSolidBookAdd size="20px" color='black'/>YENİ OKUMA</h1>
      <h3 className='border-b-2'>{`${selectedClassLevel}. SINIF İÇİN METİNLER`}</h3>
      <div className='grid 2xl:grid-cols-5 grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-5 '>
        {filteredTexts.map((text) => (
          <div key={text.textId} className="flex flex-col justify-center w-40 h-40 md:w-36 md:h-36 sm:w-28 sm:h-28 text-center border-2 rounded-md mx-2 "style={{backgroundColor: getRandomColor(),}}>
            <h3>{text.header}</h3>
          </div>
        ))}
      </div>

      

    </div>

</div>
  )
}

export default YeniOkuma

