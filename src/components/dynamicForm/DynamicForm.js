import { Button, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DynamicForm = ({
  formFields,
  setActiveStep,
  setAllData,
  activeStep,
  forms,
  handleSubmit,
}) => {
  const initialValues = {};
  const validationSchema = {};

  // Construct initial values and validation schema from form fields
  formFields.forEach((field) => {
    initialValues[field.name] = "";
    if (field.validation) {
      validationSchema[field.name] = Yup.string().required(
        field.validation.errorMessage
      );
      if (field.validation.pattern) {
        validationSchema[field.name] = validationSchema[field.name].matches(
          field.validation.pattern,
          field.validation.patternErrorMessage
        );
      }
    }
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        setAllData((prev) => [...prev, values]);
        resetForm();
        handleNext();
        if (activeStep === forms.length - 1) {
          handleSubmit();
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {formFields?.map((field, index) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <Field
                name={field.name}
                type={field.type}
                required={field.validation?.required}
                pattern={field.validation?.pattern}
                label={field.label}
                as={TextField}
                fullWidth
              />
              <ErrorMessage name={field.name}>
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </div>
          ))}
          {activeStep === forms.length - 1 ? (
            <Button
              sx={{ m: 2 }}
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          ) : (
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Next
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
