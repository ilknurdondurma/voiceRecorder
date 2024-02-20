import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal';
import { Form, Formik } from 'formik';
import { studentSchema } from '../../validation/student';
import Input from '../../components/Input/text';
import DropDown from '../../components/Input/dropdown';
import { createStartCEFRReport } from '../../api';
import succesMessage from '../../helper/toasts/successMessage';
import errorMessage from '../../helper/toasts/errorMessage';
import { ToastContainer } from 'react-toastify';

function YeniTest() {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const classLevel = [
    { value: 1, label: "1. Sınıf "},
    { value: 2, label: "2. Sınıf" },
    { value: 3, label: "3. Sınıf" },
    { value: 4, label: "4. Sınıf" },]

  const handleSubmit=async (values)=>{
    console.log(values);
    await localStorage.removeItem('werScore1');
    await localStorage.removeItem('werScore2');
    await localStorage.removeItem('werScore3');
    await localStorage.removeItem('cefrLevel');
    await localStorage.removeItem('quizId');

    var formData ={
      "studentFullName": values?.name+" "+values?.surname,
      "class": values?.class,
    }
    try {
          const response = await createStartCEFRReport(formData);
          console.log("API cevabı:", response.data);

          const quizİd=response.data.data.id;
          localStorage.setItem("quizId",JSON.stringify(quizİd))
          console.log(quizİd);

          succesMessage("başarılı işler söz konusu ");
          navigate(`/test`, { state: values })
          
        } catch (error) {
          console.error("API hatası:", error);
          errorMessage(`API hatası: ${error.message}`);
        }    


  
  }

  return (
    <div className="fixed">
        <ToastContainer/>
        <div className='bg-primary w-28 h-auto text-white p-3 rounded-xl hover:underline cursor-pointer' onClick={() => openModal()}>Yeni Test</div>
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
  );
}

export default YeniTest;
