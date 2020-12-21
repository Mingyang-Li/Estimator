import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import theme from "../theme";

export class FormClientRequirements extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <>
          <Dialog open fullWidth maxWidth="sm">
            <AppBar title="Enter Custom Requirements" />
            <TextField
              variant="outlined"
              placeholder="small, medium or large?"
              label="How big is your app?"
              onChange={handleChange("scale")}
              defaultValue={values.scale}
              margin="normal"
              fullWidth
              multiline
            />
            <br />
            <TextField
              variant="outlined"
              placeholder="Dashboard, e-commerce or property listing?"
              label="What will you use it for?"
              onChange={handleChange("usage")}
              defaultValue={values.usage}
              margin="normal"
              fullWidth
              multiline
            />
            <br />
            <TextField
              variant="outlined"
              placeholder="Average, slick or polished UI?"
              label="How pretty do you want it to look?"
              onChange={handleChange("ui")}
              defaultValue={values.ui}
              margin="normal"
              fullWidth
            />
            <br />

            <Button color="secondary" variant="contained" onClick={this.back}>
              Back
            </Button>

            <Button color="primary" variant="contained" onClick={this.continue}>
              Continue
            </Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormClientRequirements;
