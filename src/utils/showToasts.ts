import { toast, TypeOptions } from 'react-toastify';

export const showToasts = (message: string | string[], type: TypeOptions, ms: number = 3000) => {
  if (Array.isArray(message)) {
    message.forEach((msg) => {
      toast(msg, { type: type, autoClose: ms });
    });
    return;
  }
  toast(message, { type: type, autoClose: ms });
};