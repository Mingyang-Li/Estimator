import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MCQ from "./MCQ";
import Confirm from "./Confirm";
import Success from "./Success";

export class UserForm extends Component {
  state = {
    step: 1,
    currentPrice: 0,
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

  render() {
    const { step, currentPrice, totalPrice } = this.state;
    const values = {
      step,
      currentPrice,
      totalPrice,
    };

    switch (step) {
      case 1:
        return (
          <MCQ
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 3:
        return <Success />;
      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

export default UserForm;
