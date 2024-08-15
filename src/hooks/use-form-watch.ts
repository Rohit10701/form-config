import { useWatch, UseFormReturn } from 'react-hook-form';
import { useContext } from 'react';
import { FormContext } from '@/context/form-context';

const useFormWatch = (id: string, fields?: string[] | string ) => {
  const { forms } = useContext(FormContext);
  const form = forms?.[id];
  if (!form) return;

  return useWatch({
    control: form.control,
    name: fields,
  });
};
export default useFormWatch
