import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFormContext } from '../context/form-context'; 
import { FormConfig } from '../types/form';

const useDynamicForm = <T extends Record<string, unknown>>(id: string, config: FormConfig<T>,) => {
  const { addForm } = useFormContext<T>();
  const methods = useForm<T>();

  useEffect(() => {
    addForm(id, methods)
  }, [id, methods]);


  return { ...methods, config };
};

export default useDynamicForm;
