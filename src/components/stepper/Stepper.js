import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const StepperComponent = ({ activeStep }) => {
  const steps = ["Step 1", "Step 2", "Step 3"];

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperComponent;
