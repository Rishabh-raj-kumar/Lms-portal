import { useForm } from 'react-hook-form';

function useMyForm() {
  const { register, handleSubmit } = useForm();
  return { register, handleSubmit };
}

export default useMyForm;