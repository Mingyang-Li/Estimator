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
  questions = [
    {
      questionTopic: "Scale",
      questionText: "How many users will use your application?",
      answerOptions: [
        { answerText: "1-5 users", price: 9000 },
        { answerText: "6-20 users", price: 15000 },
        { answerText: "21-40 users", price: 35000 },
        { answerText: "Custom", price: 0 },
      ],
      isCompulstory: true,
      selectionType: "single-select",
    },
    {
      questionTopic: "Purpose",
      questionText: "What will you use it for?",
      answerOptions: [
        { answerText: "Dashboard", price: 5000 },
        { answerText: "E-Commerce", price: 5000 },
        { answerText: "Bidding Website", price: 5000 },
        { answerText: "Property Listings", price: 5000 },
        { answerText: "Rental Management", price: 5000 },
        { answerText: "Attendance Tracking", price: 5000 },
        { answerText: "Online Courses", price: 5000 },
        { answerText: "Custom", price: 0 },
      ],
      isCompulstory: true,
      selectionType: "single-select",
    },
    {
      questionTopic: "Management",
      questionText:
        "Would you like to have admin access to this application? (CMS)",
      answerOptions: [
        { answerText: "Yes", price: 5000 },
        { answerText: "No", price: 0 },
      ],
      isCompulstory: true,
      selectionType: "single-select",
    },
    {
      questionTopic: "Appearance",
      questionText:
        "How pretty would you like your application to appear towards users?",
      answerOptions: [
        { answerText: "Basic", price: 1500 },
        { answerText: "Slick", price: 2500 },
        { answerText: "Polished", price: 2900 },
      ],
      isCompulstory: true,
      selectionType: "single-select",
    },
    {
      questionTopic: "Users",
      questionText: "How will people use your application?",
      answerOptions: [
        { answerText: "FB sign up", price: 500 },
        { answerText: "Google sign up", price: 500 },
        { answerText: "Twitter sign up", price: 500 },
        { answerText: "Emails sign up", price: 500 },
        { answerText: "2-factor authentication", price: 500 },
        { answerText: "Custom", price: 0 },
      ],
      isCompulstory: false,
      selectionType: "multi-select",
    },
    {
      questionTopic: "Content Generation",
      questionText: "How will you generate content to your application?",
      answerOptions: [
        { answerText: "Activity Feeds", price: 1000 },
        { answerText: "File Uploading", price: 1200 },
        { answerText: "User Profiles", price: 1200 },
        { answerText: "In-app Messaging", price: 1400 },
        { answerText: "Audio/Video Streaming", price: 1600 },
        { answerText: "Global Search", price: 2000 },
        { answerText: "Advanced Filters & Search", price: 2500 },
        { answerText: "Custom", price: 0 },
      ],
      isCompulstory: false,
      selectionType: "multi-select",
    },
    {
      questionTopic: "Payment Integration",
      questionText: "How would you like the web app to process payments?",
      answerOptions: [
        { answerText: "Stripe (Credit Card)", price: 1700 },
        { answerText: "PayPal", price: 1500 },
        { answerText: "Paymark", price: 1400 },
        { answerText: "Bank Transfer", price: 1200 },
        { answerText: "Paystation", price: 1400 },
        { answerText: "Custom", price: 0 },
      ],
      isCompulstory: false,
      selectionType: "multi-select",
    },
  ];

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

  render() {
    const { step } = this.state;

    // semi-original state, can ignore this
    const {
      firstName,
      lastName,
      email,
      occupation,
      industry,
      city,
      scale,
      purpose,
      management,
      appearance,
      users,
      contentGeneration,
      paymentIntegration,
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
      purpose,
      management,
      appearance,
      users,
      contentGeneration,
      paymentIntegration,
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
