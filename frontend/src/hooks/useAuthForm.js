import { useState } from 'react';

export function useAuthForm(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);
    
    // If no validation errors, proceed with submission
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await callback(values);
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors({
          ...errors,
          form: error.message || 'An error occurred. Please try again.',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setErrors,
    setValues,
  };
}
