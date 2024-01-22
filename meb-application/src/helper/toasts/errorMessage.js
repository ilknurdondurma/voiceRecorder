import { toast } from 'react-toastify';

const errorMessage = (e) => toast.error(`${e}`, {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
});

export default errorMessage;