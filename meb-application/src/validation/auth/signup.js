import Yup from "..";

export const signupSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required("Şifrenizi doğru girdiğinizden emin olun."),
  name:Yup.string().required(),
  surname:Yup.string().required(),
  class: Yup.string().required("Sınıfınızı doğru girdiğinizden emin olun."),

})