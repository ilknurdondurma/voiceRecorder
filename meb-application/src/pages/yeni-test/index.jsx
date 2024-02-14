import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal';
import { Form, Formik } from 'formik';
import { studentSchema } from '../../validation/student';
import Input from '../../components/Input/text';
import DropDown from '../../components/Input/dropdown';

function YeniTest() {
  const [showModal, setShowModal] = useState(true); // State for modal visibility
  const navigate = useNavigate();
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const classLevel = [
    { value: 1, label: "1. Sınıf "},
    { value: 2, label: "2. Sınıf" },
    { value: 3, label: "3. Sınıf" },
    { value: 4, label: "4. Sınıf" },]

  const handleSubmit=(values)=>{
    console.log(values);
    navigate(`/test`, { state: values })


  
  }

  return (
    <div className="fixed">
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
