import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import OwnAppBar from "./OwnAppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import theme from "../theme";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { quizData } from "./quizData";

import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { ContactSupport } from "@material-ui/icons";

const MCQ = (props) => {
  const [value, setValue] = React.useState();
  const changedOption = (event) => {
    setValue(event.target.value);
  };

  // initial value of question indes = 0 because we'll start displaying questions from the beginning of the array of question objects (quizData)
  const [questionIndex, setQuestionIndex] = useState(5);

  // currQuestion is a question object, it gets updated every time questionIndex changes, which changes the questions
  const currQuestion = quizData[questionIndex];

  // An array of objects that updates whenever the user clicks on an option, be it radio button or checkboxes
  // Each response object of the array will contain the necessary data needed for cost calculation as well as options confirmation
  const [responses, updateResponses] = useState([]);

  // We need to capture an object which contains an answer and price for every change in options for single-select questions
  const [selectedRadioButton, updateSelectedRadioButton] = useState({
    selectedAnswer: "",
    price: 0,
  });

  // Capturing and upadting custom option specifications
  const [specifications, updateSpecifications] = useState("");

  // We also need to capture answers and prices for multi-select questions
  // It's a good idea to store them as an array of objects
  // This state gets cleared to an empty array whenever we select an answer from a different question
  const [selectedCheckboxes, updateSelectedCheckboxes] = useState([]);

  // Define a state to keep track of 'check' status of radio buttons and checkboxes
  // This returns a boolean, and will be updates to true when people manuallu uncheck or clear their options during the quiz
  const [checkStatus, setCheckStatus] = useState(false);

  // totalPrice gets updated every time an option is clicked on
  const [totalPrice, setTotalPrice] = useState(0);

  const questionNumber = questionIndex + 1;

  function handleUpdateResponses(questionObj) {
    // Keep the original array using spread operator
    const newList = [...responses];

    // If the option with specification is selected,
    // we need to include the specs text within the object we're going to push into the overall responses
    // If no custom option is selected, we create the object without adding the specifications key

    // First, we deal with single-select questions
    if (currQuestion.selectionType === "single-select") {
      // If the user selected a custom option, we need to have specification input passed into the object
      if (selectedRadioButton.selectedAnswer != "Custom") {
        console.log("NO custom option");
        const newAnswer = {
          questionNumber: questionNumber,
          questionTopic: questionObj.questionTopic,
          selectionType: questionObj.selectionType,
          selectedAnswer: selectedRadioButton.selectedAnswer,
          estimatedCost: selectedRadioButton.price,
        };
        updateResponses([newAnswer]);
      }
      // If no custom option is selected, we don't need to add specs text in the object
      else if (selectedRadioButton.selectedAnswer == "Custom") {
        console.log("Yes, custom option");
        const newAnswer = {
          questionNumber: questionNumber,
          questionTopic: questionObj.questionTopic,
          selectionType: questionObj.selectionType,
          selectedAnswer: selectedRadioButton.selectedAnswer,
          estimatedCost: selectedRadioButton.price,
          specifications: specifications,
        };

        updateResponses([newAnswer]);
      }
    } else if (currQuestion.selectionType == "multi-select") {
      // We need to access the last object of the selectedCheckboxes array to proceed
      // This is because whenever a checkbox is checked, the data (obj) is added to the end of the array of objects
      // We only want to capture the latest piece of obj to access its attributes.
      const latestAddedCheckbox =
        selectedCheckboxes[selectedCheckboxes.length - 1];

      // Again, we check if specifications are made
      // Same logic as handling responses for singleSelect questions
      if (currQuestion.selectedAnswer === "Custom") {
        const newAnswer = {
          questionNumber: questionNumber,
          questionTopic: questionObj.questionTopic,
          selectionType: questionObj.selectionType,
          selectedAnswer: latestAddedCheckbox.selectedCheckboxes,
          specifications: specifications,
          estimatedCost: latestAddedCheckbox.price,
        };
      }
      // If no custom option is selected, we don't need to add specs text in the object
      else {
        const newAnswer = {
          questionNumber: questionNumber,
          questionTopic: questionObj.questionTopic,
          selectionType: questionObj.selectionType,
          selectedAnswer: latestAddedCheckbox.selectedCheckboxes,
          specifications: specifications,
          estimatedCost: latestAddedCheckbox.price,
        };
      }
    }
  }

  /*
  function handleCheckboxes(answerText, price) {
    if (selectedCheckboxes.length == 0) {
      updateSelectedCheckboxes([
        {
          selectedAnswer: answerText,
          price: price,
        },
      ]);
    } else {
      const selectedOptions = selectedCheckboxes.map(
        (selectedCheckboxes) => selectedCheckboxes.selectedAnswer
      );
      updateSelectedCheckboxes(selectedOptions);
      console.log("selectedOptions: " + selectedOptions);
      for (let i = 0; i < selectedCheckboxes.length; i++) {
        console.log("new item, so added into array");
      }
    }
  }
*/

  // singleSelectQuestions is contains a function that returns jsx, which displays the suitable components based on the question attributes.
  // In this case, all questions should be wrapped around by radio button components because they're all single select
  // The only exception being that, if the answerText is 'Custom', we'd want to user to also specify exactly what they want if their desired options aren't listed here.
  // This is when we want to conditionally render jsx so that an extra textfield is also present alongside the radiobutton that has a label of 'Custom'
  // All the mapped components from this const will be wrapped in RadioGroup component further down the final return block
  const singleSelectQuestions = currQuestion.answerOptions.map(
    // By looping through the answerText and the price of each question object, we use a ternary operator that returns jsx for radiobuttons without an extra textfield and the jsx that has one if answerText is 'Custom'
    ({ answerText, price }) =>
      answerText !== "Custom" ? (
        <FormControlLabel
          value={answerText}
          control={<Radio />} // normal radio button
          label={answerText}
          price={price}
          // We need to capture the selected answer option and the price into a state for each option
          // The we will pass this state (object) into the hook that handles updating the entire response object

          onClick={() =>
            updateSelectedRadioButton({
              selectedAnswer: answerText,
              price: price,
            })
          }
        />
      ) : (
        <div className="customOption">
          <FormControlLabel
            control={<Radio />}
            value={answerText}
            price={price}
            floatingLabelFixed={true}
            label={
              <TextField
                required
                label="Please Specify"
                onKeyDown={(e) => updateSpecifications(e.target.value)}
              />
            }
            onClick={() =>
              updateSelectedRadioButton({
                selectedAnswer: answerText,
                specifications: specifications,
                price: 0,
              })
            }
          />
        </div>
      )
  );

  // multiSelectQuestions uses roughly the same mapping logic as the one used by singleSelectQuestions
  // The only exception is that the control attribute of each FormControlLabel is Checkbox instead of Radio
  // This is essentially because multi-select questions require us to enable users to select more than just 1 option
  const multiSelectQuestions = currQuestion.answerOptions.map(
    ({ answerText, price }) =>
      answerText !== "Custom" ? (
        <FormControlLabel
          className="currentCheckbox"
          value={answerText}
          control={<Checkbox />}
          label={answerText}
          price={price}
          onClick={() =>
            updateSelectedCheckboxes([
              ...selectedCheckboxes,
              {
                selectedAnswer: answerText,
                price: price,
              },
            ])
          }
        />
      ) : (
        <div className="customOption">
          <FormControlLabel
            value={answerText}
            control={<Checkbox />}
            label={answerText}
            price={price}
            label={
              <TextField
                required
                label="Please Specify"
                // onchange={(e) => updateSpecifications(e.target.value)}
              />
            }
          />
        </div>
      )
  );

  // This function is responsible for updating the questions displayed.
  // It does so by setting the question index each time a <Button> using it is clicked, also it makes sure we don't use indeces that are out of range.
  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      updateSelectedRadioButton({});
      updateSelectedCheckboxes([]);
      updateSpecifications("");
    }
  };

  // Basically it does the same thing as prevQuestion.
  // The only difference it that we need to make sure to fire the function that calculates total cost when we reach the end of the questions.
  const nextQuestion = () => {
    if (questionIndex < quizData.length - 1) {
      setQuestionIndex(questionIndex + 1);
      updateSelectedRadioButton({});
      updateSelectedCheckboxes([]);
      updateSpecifications("");
    }
  };

  const clearAll = () => {
    updateResponses([]);
    currQuestion.selectionType === "single-select"
      ? updateSelectedRadioButton({})
      : updateSelectedCheckboxes([]);

    setCheckStatus(false);
    updateSpecifications("");
  };

  return (
    <MuiThemeProvider theme={theme}>
      <>
        <OwnAppBar title />

        <Dialog open fullWidth maxwidth="md">
          <FormControl component="fieldset">
            <Grid container spacing={3}>
              <Grid item xs>
                <h2 component="legend">
                  {questionIndex + 1 + ". "}
                  {currQuestion.questionTopic}
                  {currQuestion.isCompulstory === true ? "*" : ""}
                </h2>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs>
                <Card variant="outlined">
                  <CardContent>
                    <Typography gutterBottom>
                      Question {questionIndex + 1} out of {quizData.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <h3 component="legend">{currQuestion.questionText}</h3>

            <RadioGroup
              value={value}
              onChange={() => handleUpdateResponses(currQuestion)}
            >
              {currQuestion.selectionType === "single-select"
                ? singleSelectQuestions
                : multiSelectQuestions}
            </RadioGroup>
          </FormControl>
          <br></br>

          <Button color="secondary" variant="contained" onClick={prevQuestion}>
            Previous
          </Button>
          <Button color="primary" variant="contained" onClick={nextQuestion}>
            {questionIndex + 1 === quizData.length
              ? "Calculate Cost"
              : "Continue"}
          </Button>
          <br></br>

          <Grid container spacing={2} justify="center">
            <Grid item xs={4}>
              <Button color="primary" onClick={() => setQuestionIndex(0)}>
                <ArrowBackIcon />
                Back to Start
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                color="primary"
                startIcon={<DeleteIcon />}
                onClick={
                  currQuestion.selectionType === "single-select"
                    ? () => updateSelectedRadioButton({})
                    : () => updateSelectedCheckboxes([])
                }
              >
                {currQuestion.selectionType === "single-select"
                  ? "Clear current option"
                  : "Clear current options"}
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                color="primary"
                startIcon={<DeleteIcon />}
                onClick={clearAll}
              >
                Clear All
              </Button>
            </Grid>
          </Grid>

          <br></br>

          <Card open fullWidth maxwidth="sm" boxshadow={3}>
            <CardContent>
              <p>
                <strong>Current question type: </strong>
                {currQuestion.selectionType}
              </p>

              <p>
                <strong>
                  Current{" "}
                  {currQuestion.selectionType === "single-select"
                    ? "radio button"
                    : "checkboxes "}
                  :{" "}
                </strong>
                {currQuestion.selectionType === "single-select"
                  ? JSON.stringify(selectedRadioButton)
                  : JSON.stringify(selectedCheckboxes)}
              </p>
              <p>
                <strong>All Responses: </strong>
                {JSON.stringify(responses)}
              </p>
            </CardContent>
          </Card>
        </Dialog>
      </>
    </MuiThemeProvider>
  );
};
export default MCQ;
