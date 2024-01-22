import { toast } from 'react-toastify';

const succesMessage = (e) => toast.success(`${e}`, {
  position: "bottom-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
});

export default succesMessage;