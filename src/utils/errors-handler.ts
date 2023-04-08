import { toast } from 'vue-sonner';

export const toastCustomError = (message: string) => {
  toast.error(message);
};
