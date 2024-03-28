import { ChangeEvent, useState } from "react";

interface IFormValues {
  [key: string]: any;
}

interface IUseFormResult {
  values: IFormValues;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
}

export const useForm = (initialValues: IFormValues): IUseFormResult => {
  const [values, setValues] = useState<IFormValues>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetForm,
  };
};
