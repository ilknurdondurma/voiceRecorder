import React, { useEffect, useState } from 'react'
import {BiSolidBookAdd } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { getAllText } from '../../api';
import errorMessage from '../../helper/toasts/errorMessage'
import succesMessage from '../../helper/toasts/successMessage'
import {studentSchema} from '../../validation/student/index'
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import Modal from '../../components/modal';
import Input from '../../components/Input/text/index';
import { Form, Formik } from 'formik';
import DropDown from '../../components/Input/dropdown';

function YeniOkuma() {

  const [texts,setTexts]=useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedTextId, setSelectedTextId] = useState(null); // State for selected text ID
  const navigate = useNavigate();
  const openModal = (textId) => {
    setShowModal(true);
    setSelectedTextId(textId); // Set the selected text ID when opening the modal
  };
  const closeModal = () => setShowModal(false);
  const classLevel = [
    { value: 1, label: "1. Sınıf "},
    { value: 2, label: "2. Sınıf" },
    { value: 3, label: "3. Sınıf" },
    { value: 4, label: "4. Sınıf" },]
  const colorPalette = ['#e0fbfc', '#d8e2dc', '#ffe5d9', '#c4e17f', '#f9ebae','#f6daf0','#ffc2b8','#b8f5ff']; // Soft renk paleti
  let colorIndex = 0;
  const getRandomColor = () => {
    const currentColor = colorPalette[colorIndex];
    colorIndex = (colorIndex + 1) % colorPalette.length;
    return currentColor;
  };



  useEffect(() => {
    if(token==null){
      navigate('/login', {replace:true})
    }
    getAllText()
      .then((result)=>{
        setTexts(result?.data.data)
        console.log(texts)
      })
      .catch((error)=>{
        console.log(error);
        errorMessage("Bir hata oluştu")

      })
  
    
  }, [token]);

  //const filteredTexts = texts.filter((text) => text.class === selectedClassLevel);

  const handleSubmit=(values)=>{
    console.log(values);
    navigate(`/voice-record/${selectedTextId}`, { state: values })
  }

  return (
  <div className='py-0.5 space-y-10'>
  <Helmet>
    <title>Yeni Okuma</title>
  </Helmet>
    <div className='w-full flex justify-center'>
      <ToastContainer />
      <div className='w-full  flex flex-col justify-center '>
        <h1 className='text-xl my-3 font-bold flex sm:mx-5'>
          <BiSolidBookAdd size="20px" color='black'/>YENİ OKUMA
        </h1>
        <h3 className='border-b-2'>{`SINIFLAR İÇİN ÖRNEK METİNLER`}</h3>

        {texts.length === 0 ? (
          <p className='my-5'>Örnek metin bulunamadı.</p>
        ) : (
          <div className='grid 2xl:grid-cols-5 grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-5 '>
            {texts.map((text) => (
              <div key={text.id}> {/* Her bir elemana unique bir key ekleyin */}
                <div 
                    className="flex flex-col justify-center w-52 h-40 md:w-40 md:h-36 sm:w-32 sm:h-28 text-center border-2 rounded-md mx-2 overflow-hidden hover:underline hover:border-black"
                    style={{backgroundColor: getRandomColor()}}
                    onClick={() => openModal(text.id)}  //Tıklanan metnin ID'sini openModal fonksiyonuna iletiliyor 
                >
                  <h3 className='tracking-[0.1em]'>{text.header}</h3>
                </div>

                <Modal show={showModal} handleClose={closeModal}>
                  <Formik
                    validationSchema={studentSchema}
                    initialValues={{
                      name: '', 
                      surname: '' ,
                      class:"" 
                    }}
                    onSubmit={(values) => {
                      handleSubmit(values); // handleSubmit fonksiyonuna sadece form değerlerini gönderiyoruz
                    }}
                  >
                    {({ setFieldValue }) => (
                      <Form>
                        <h2 className="text-2xl mb-4">Öğrenci Bilgilerini Girin</h2>
                        <div className='flex flex-col'>
                          Adı:   <Input name="name" className='border-2'/> 
                          Soyadı:<Input name="surname" className='border-2'/>
                          Sınıfı:
                          <div className='flex sm:grid sm:grid-cols-1 gap-4'>
                            <DropDown
                              placeholder="Sınıf"
                              className="my-3"
                              name="class"
                              options={classLevel}
                              onChange={(selectedValue) => {
                                console.log("Seçilen değer:", selectedValue);
                                setFieldValue("class", selectedValue);
                              }}
                            />
                          </div>     
                          <button
                            type="submit"
                            className="bg-primary text-white py-2 px-4 mt-4 rounded hover:bg-tertiary"
                          >
                            Başlat
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Modal>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>

    

    
</div>
  )
}

export default YeniOkuma

