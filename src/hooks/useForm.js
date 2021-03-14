import React, { useState } from 'react'

const useForm = (getFreshModelObject) => {
    const [values, setValues] = useState(getFreshModelObject());
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
      const { name, value } = e.target; 
      setValues({
        ...values,
        [name]: value
      });
      console.log(values);
    }

    const resetFormControls = () => {
        setValues(getFreshModelObject());
        setErrors({});
      }
    

  return{
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
      resetFormControls
  }

 }

export default useForm;