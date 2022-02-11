import React from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";

const AddressForm = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address COMING SOON
        {/* <FormProvider>
          <form onSubmit="">
            <Grid container={3}>
              <FormInput required name="firstName" label="First name" />
            </Grid>
          </form> */}
        {/* </FormProvider> */}
      </Typography>
    </>
  );
};

export default AddressForm;
