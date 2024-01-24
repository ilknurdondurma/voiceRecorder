import Yup from '..';

export const loginSchema = Yup.object().shape({
  name: Yup.string().required(),
  class: Yup.string().required("Sınıfınızı doğru girdiğinizden emin olun."),
  age: Yup.number().required("Yaşınızı giriniz")
  .min(5, 'Yaş  5\'den küçük olamaz')
  .max(18, 'Yaş 18\'den büyük olamaz'),
  userRole:Yup.string().required("Kullanıcı Belirtin")

})