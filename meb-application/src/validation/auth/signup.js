import Yup from "..";

export const signupSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required("Şifrenizi doğru girdiğinizden emin olun."),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifreler uyuşmuyor")
    .required("Şifrenizi doğru girdiğinizden emin olun."),
  name:Yup.string().required(),
  surname:Yup.string().required(),
  city:Yup.string().required(),
  district:Yup.string().required()
})