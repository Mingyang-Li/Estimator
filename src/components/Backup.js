import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Dialog from "@material-ui/core/Dialog";
import OwnAppBar from "./OwnAppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import theme from "../theme";

export default function MCQScale(props) {
  const [value, setValue] = React.useState();
  const [price, setPrice] = React.useState();

  const changedOption = (event) => {
    setValue(event.target.value);
  };

  const calculatePrice = (price) => {
    const { totalPrice } = props.state;
    setPrice({ totalPrice: totalPrice + price });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <>
        <OwnAppBar title="Enter Personal Details" />
        <Dialog open fullWidth maxWidth="md">
          <FormControl component="fieldset">
            <FormLabel component="legend">Scale</FormLabel>
            <RadioGroup
              aria-label="scale"
              name="scale"
              value={value}
              onChange={changedOption}
            >
              <FormControlLabel
                value="1-5 users"
                control={<Radio />}
                label="1-5 users"
                onClick={calculatePrice}
              />
              <FormControlLabel
                value="6-20 users"
                control={<Radio />}
                label="6-20 users"
              />
              <FormControlLabel
                value="21-40 users"
                control={<Radio />}
                label="21-40 users"
              />
              <FormControlLabel
                value="Custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
          <Button color="secondary" variant="contained">
            Back
          </Button>
          <Button color="primary" variant="contained">
            Continue
          </Button>
          <div></div>
        </Dialog>
      </>
    </MuiThemeProvider>
  );
}
