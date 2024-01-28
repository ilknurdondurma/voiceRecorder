import Yup from '..';

export const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required("Şifrenizi veya Kullanıcı adınızı doğru girdiğinizden emin olun."),


})