import Yup from '..';

export const studentSchema = Yup.object().shape({
  name: Yup.string().required("Ad girilmeli"),
  surname: Yup.string().required("Soyad girilmeli"),
  class:Yup.string().required("Sınıf seçilmeli"),


})