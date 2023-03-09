import React, { useEffect, useState } from "react";
import StepperComponent from "./components/stepper/Stepper";
import DynamicForm from "./components/dynamicForm/DynamicForm";

import step1Fields from "./form1.json";
import step2Fields from "./form2.json";
import step3Fields from "./form3.json";
import { Box, Button, Typography } from "@mui/material";

const forms = [step1Fields, step2Fields, step3Fields];

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allData, setAllData] = useState([]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    console.log(allData, "allData");
  }, [allData]);

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box style={{ width: "50%" }}>
        <StepperComponent activeStep={activeStep} />
        {isSubmitted ? (
          <>
            <Typography
              variant="h5"
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                border: "2px solid black",
                padding: 10,
                marginTop: 20,
              }}
            >
              Form submitted!
            </Typography>
            {allData.map((data, index) => (
              <Box
                style={{
                  border: "2px solid black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                }}
                key={index}
              >
                {Object.entries(data).map(([key, value]) => (
                  <Typography style={{ marginTop: 10 }} key={key}>
                    <strong>{key}:</strong> {value}
                  </Typography>
                ))}
              </Box>
            ))}
          </>
        ) : (
          <>
            <DynamicForm
              setAllData={setAllData}
              formFields={Object.values(forms[activeStep])[0]}
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              forms={forms}
              handleSubmit={handleSubmit}
            />
            {activeStep === 0 ? null : (
              <Button sx={{ m: 2 }} variant="contained" onClick={handleBack}>
                Back
              </Button>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
export default App;
