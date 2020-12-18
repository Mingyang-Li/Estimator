import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormUserDetails from "./FormUserDetails";
import FormPersonalDetails from "./FormPersonalDetails";
import FormClientRequirements from "./FormClientRequirements";
import MCQScale from "./MCQScale";
import Confirm from "./Confirm";
import Success from "./Success";
import OwnAppBar from "./OwnAppBar";
import MenuItems from "./MenuItems";

export class UserForm extends Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    city: "",
    bio: "",
    scale: "",
    usage: "",
    ui: "",
    totalPrice: 0,
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  // add prices for mcq requirements
  calculatePrice = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      email,
      occupation,
      industry,
      city,
      scale,
      usage,
      ui,
      totalPrice,
    } = this.state;

    const values = {
      firstName,
      lastName,
      email,
      occupation,
      industry,
      city,
      scale,
      usage,
      ui,
      totalPrice,
    };

    switch (step) {
      case 1:
        return (
          <MCQScale
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <FormClientRequirements
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <MCQScale
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 5:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 6:
        return <Success />;
      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

export default UserForm;
