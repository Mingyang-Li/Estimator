import React, { Component } from "react";
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
import UserForm from "./UserForm";

export class MCQScale extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <>
          <OwnAppBar title="Enter Personal Details" />
          <Dialog open fullWidth maxWidth="md">
            <FormControl component="fieldset">
              <FormLabel component="legend">Scale</FormLabel>
              <RadioGroup aria-label="scale" name="scale">
                <FormControlLabel
                  value="1-5 users"
                  control={<Radio />}
                  label="1-5 users"
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
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default MCQScale;
