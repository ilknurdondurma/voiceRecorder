import React from 'react'
import SoundRecorder from '../../components/voiceRecorder'

function VoiceRecord() {
  const id=1
  const text="Kırmızı Başlıklı Kız'a annesi kırmızı, güzel bir başlık örmüş. Bu yüzden herkes ona Kırmızı Başlıklı Kız dermiş. Bir gün annesi Kırmızı Başlıklı Kız'a bir sepet atıştırmalık hazırlayıp vermiş ve ondan bunları ormanın öbür ucunda yaşayan büyükannesine götürmesini istemiş. Özellikle kızını ormanın yanındaki uzun yoldan dolaşması, ormanın içindeki kestirme yolu kullanmaması konusunda sıkı sıkı tembihlemiş. Fakat büyükannesinin evine doğru yola çıkan Kırmızı Başlıklı Kız ormanın etrafındaki uzun yolu kullanmak yerine ormandan geçen kestirmeyi kullanmaya karar vermiş. Ormanda karşısına kurt çıkmış. Saf kız da kurda nereye gittiğini söylemiş. Bunun üzerine kurt hemencecik büyükannenin evine koşmuş, kadını kandırıp kapıyı açtırtmış. Sonra büyükanneyi yutmuş ve kıyafetlerini üzerine geçirerek torununu beklemiş. Kırmızı Başlıklı Kız bir süre sonra gelmiş, kurt ona kapıyı açtırtmış. Kız da gelmiş ve ilk başta yatakta yatanın büyükannesi olmadığını tanıyamamış. En sonunda kurt çıkmış ve onu da yutmuş. Tam o sırada etrafta dolaşan bir avcı sesleri duymuş ve içeri gelmiş. Kurdun karnını açıp kızı ve büyükannesini serbest bırakmış, kurdun karnını da ağır taşlar ile doldurmuşlar. Kırmızı Başlıklı Kız'a annesi kırmızı, güzel bir başlık örmüş. Bu yüzden herkes ona Kırmızı Başlıklı Kız dermiş. Bir gün annesi Kırmızı Başlıklı Kız'a bir sepet atıştırmalık hazırlayıp vermiş ve ondan bunları ormanın öbür ucunda yaşayan büyükannesine götürmesini istemiş. Özellikle kızını ormanın yanındaki uzun yoldan dolaşması, ormanın içindeki kestirme yolu kullanmaması konusunda sıkı sıkı tembihlemiş. Fakat büyükannesinin evine doğru yola çıkan Kırmızı Başlıklı Kız ormanın etrafındaki uzun yolu kullanmak yerine ormandan geçen kestirmeyi kullanmaya karar vermiş. Ormanda karşısına kurt çıkmış. Saf kız da kurda nereye gittiğini söylemiş. Bunun üzerine kurt hemencecik büyükannenin evine koşmuş, kadını kandırıp kapıyı açtırtmış. Sonra büyükanneyi yutmuş ve kıyafetlerini üzerine geçirerek torununu beklemiş. Kırmızı Başlıklı Kız bir süre sonra gelmiş, kurt ona kapıyı açtırtmış. Kız da gelmiş ve ilk başta yatakta yatanın büyükannesi olmadığını tanıyamamış. En sonunda kurt çıkmış ve onu da yutmuş. Tam o sırada etrafta dolaşan bir avcı sesleri duymuş ve içeri gelmiş. Kurdun karnını açıp kızı ve büyükannesini serbest bırakmış, kurdun karnını da ağır taşlar ile doldurmuşlar."
  const textHeader="Kırmızı Başlıklı Kız"

   return (
    <div className='w-full flex flex-col justify-center'>
        <h1 className='text-2xl my-3 font-bold flex justify-center'> {textHeader}</h1>
        <textarea
        className='border-2 p-5 text-xl my-5 mx-10 mb-10 rounded-xl '
        
        value={text}
        rows={15} // İstersen satır sayısını belirleyebilirsin
        cols={100} // İstersen sütun sayısını belirleyebilirsin
        readOnly
      />
      <SoundRecorder/>
    </div>
  )
}

export default VoiceRecord
