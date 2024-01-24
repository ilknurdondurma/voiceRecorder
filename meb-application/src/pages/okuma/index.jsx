import React from 'react'
function Okuma() {
    const textHeader="Kırmızı Başlıklı Kız"

    const orijinalVoiceUrl=""
    const oijinalText="Kırmızı Başlıklı Kız'a annesi kırmızı, güzel bir başlık örmüş. Bu yüzden herkes ona Kırmızı Başlıklı Kız dermiş. Bir gün annesi Kırmızı Başlıklı Kız'a bir sepet atıştırmalık hazırlayıp vermiş ve ondan bunları ormanın öbür ucunda yaşayan büyükannesine götürmesini istemiş. Özellikle kızını ormanın yanındaki uzun yoldan dolaşması, ormanın içindeki kestirme yolu kullanmaması konusunda sıkı sıkı tembihlemiş. Fakat büyükannesinin evine doğru yola çıkan Kırmızı Başlıklı Kız ormanın etrafındaki uzun yolu kullanmak yerine ormandan geçen kestirmeyi kullanmaya karar vermiş. Ormanda karşısına kurt çıkmış. Saf kız da kurda nereye gittiğini söylemiş. Bunun üzerine kurt hemencecik büyükannenin evine koşmuş, kadını kandırıp kapıyı açtırtmış. Sonra büyükanneyi yutmuş ve kıyafetlerini üzerine geçirerek torununu beklemiş. Kırmızı Başlıklı Kız bir süre sonra gelmiş, kurt ona kapıyı açtırtmış. Kız da gelmiş ve ilk başta yatakta yatanın büyükannesi olmadığını tanıyamamış. En sonunda kurt çıkmış ve onu da yutmuş. Tam o sırada etrafta dolaşan bir avcı sesleri duymuş ve içeri gelmiş. Kurdun karnını açıp kızı ve büyükannesini serbest bırakmış, kurdun karnını da ağır taşlar ile doldurmuşlar. Kırmızı Başlıklı Kız'a annesi kırmızı, güzel bir başlık örmüş. Bu yüzden herkes ona Kırmızı Başlıklı Kız dermiş. Bir gün annesi Kırmızı Başlıklı Kız'a bir sepet atıştırmalık hazırlayıp vermiş ve ondan bunları ormanın öbür ucunda yaşayan büyükannesine götürmesini istemiş. Özellikle kızını ormanın yanındaki uzun yoldan dolaşması, ormanın içindeki kestirme yolu kullanmaması konusunda sıkı sıkı tembihlemiş. Fakat büyükannesinin evine doğru yola çıkan Kırmızı Başlıklı Kız ormanın etrafındaki uzun yolu kullanmak yerine ormandan geçen kestirmeyi kullanmaya karar vermiş. Ormanda karşısına kurt çıkmış. Saf kız da kurda nereye gittiğini söylemiş. Bunun üzerine kurt hemencecik büyükannenin evine koşmuş, kadını kandırıp kapıyı açtırtmış. Sonra büyükanneyi yutmuş ve kıyafetlerini üzerine geçirerek torununu beklemiş. Kırmızı Başlıklı Kız bir süre sonra gelmiş, kurt ona kapıyı açtırtmış. Kız da gelmiş ve ilk başta yatakta yatanın büyükannesi olmadığını tanıyamamış. En sonunda kurt çıkmış ve onu da yutmuş. Tam o sırada etrafta dolaşan bir avcı sesleri duymuş ve içeri gelmiş. Kurdun karnını açıp kızı ve büyükannesini serbest bırakmış, kurdun karnını da ağır taşlar ile doldurmuşlar."
   
    const studentVoiceUrl=""
    const studentText="Kırmızı Başlıklı Kız'a annesi kırmızı, güzel bir başlık örmüş. Bu yüzden herkes ona Kırmızı Başlıklı Kız dermiş. Bir gün annesi Kırmızı Başlıklı "
   
    const different=["Kırmızı","örmüş","herkes","tembihlemiş"]

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
                        <div  className='self-center bg-white p-5 m-3 text-primary w-full rounded-2xl text-xl font-thin border-gray-300 border-2'>{index} {diff}</div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Okuma
