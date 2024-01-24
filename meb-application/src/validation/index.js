import * as Yup from "yup"
Yup.setLocale({
    mixed: {
        required: 'Bu alanı doldurmanız gerekiyor.'
      },
      string: {
        email: 'Geçerli bir e-posta adresi girin.',
        url: 'Geçerli bir URL girmelisiniz.',
      },
      number:{
        integer: 'lütfen sayı giriniz.',
      },
      boolean: {
        oneOf: 'Bu alanı işaretlemeniz gerekiyor.'
      },
})
export default Yup