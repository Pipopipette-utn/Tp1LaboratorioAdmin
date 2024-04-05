import { ChangeEvent, useState } from "react";

interface IFormValues {
  denominacion: string;
  telefono: string;
  horaApertura?: string;
  horaCierre?: string;
  horarioAtencion: string;
  quienesSomos: string;
  latitud?: number;
  longitud?: number;
  domicilio: string;
  email: string;
  baja: boolean;
}

interface IUseFormResult {
  values: IFormValues;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  resetForm: () => void;
  setValues: (values: IFormValues) => void;
}

export const useForm = (initialValues: IFormValues): IUseFormResult => {
  const [values, setValues] = useState<IFormValues>(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    setValues,
  };
};
