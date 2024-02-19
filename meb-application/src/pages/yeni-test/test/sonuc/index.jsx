import React from 'react'
import VerticalBarChart from '../../../../components/charts/verticalBarChart'

function Sonuc() {
  return (
    <div>
        <h1 className="text-xl flex justify-center">TEST SONUCUNUZ : </h1>
        <div className="flex justify-center">
          <h1 className="my-5 border-2 rounded-full p-8 text-md w-28  m-3 font-bold">B2 seviye </h1>
        </div>
        <h1 className="text-xl flex justify-center my-5"> SEVİYESİ : </h1>
        <div className="flex justify-center"><VerticalBarChart cefr={"B2"}  /></div>
      </div>
  )
}

export default Sonuc
