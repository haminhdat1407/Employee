import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure();

export const showToast = (message, type, theme) => {
  return toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    draggable: true,
    theme: theme,
    type: type,
  });
};
