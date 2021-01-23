import React, { useState, useEffect } from "react";
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
  const [questionIndex, setQuestionIndex] = useState(0);

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
  const [otherInfo, setOtherInfo] = useState("");

  // totalPrice gets updated every time an option is clicked on
  const [totalPrice, setTotalPrice] = useState(0);

  const questionNumber = questionIndex + 1;

  async function calculateTotalPrice() {
    //console.log("calculateTotalPrice is fired");
    let newTotal = 0;
    responses.forEach((question) => {
      if (question.selectionType === "single-select") {
        //console.log("question.estimatedCost: " + question.estimatedCost);
        newTotal += question.estimatedCost;
      } else if (question.selectionType === "multi-select") {
        question.selectedAnswers.forEach((checkbox) => {
          //console.log("checkbox.estimatedCost: " + checkbox.estimatedCost);
          newTotal += checkbox.estimatedCost;
        });
      }
    });
    setTotalPrice(newTotal);
  }

  async function updateAllResponsesSingleSelect(questionObj) {
    console.log("update responses with single-select");

    const newList = [...responses];
    // If the user selected a custom option, we need to have specification input passed into the object
    if (selectedRadioButton.selectedAnswer === "Custom") {
      // console.log("Yes, custom option");
      const newAnswer = {
        questionNumber: currQuestion.questionNumber,
        questionTopic: questionObj.questionTopic,
        selectionType: questionObj.selectionType,
        selectedAnswer: selectedRadioButton.selectedAnswer,
        estimatedCost: selectedRadioButton.price,
      };
      newList.push(newAnswer);
      updateResponses(newList);
    } else if (selectedRadioButton.selectedAnswer !== "Custom") {
      console.log("No custom option");
      // If no custom option is selected, we don't need to add specs text in the object
      // If the latest selected answer is different to the one existed for that same qs, we update it in-place.
      // If the question is different, and we haven't select an answer yet, we add new item into allResponses

      // If we haven't select anything, just add the response to it!
      if (responses.length === 0) {
        console.log("adding item into empty arr");
        updateResponses([
          {
            questionNumber: currQuestion.questionNumber,
            questionTopic: questionObj.questionTopic,
            selectionType: questionObj.selectionType,
            selectedAnswer: selectedRadioButton.selectedAnswer,
            estimatedCost: selectedRadioButton.price,
          },
        ]);
      } else {
        console.log("arr is not empty");
        // Collect question numbers that are being answered already
        var answeredQuestions = [];
        for (let i = 0; i < responses.length; i++) {
          answeredQuestions.push(responses[i].questionNumber);
        }
        // If we our allResponses is NOT empty, we want to check a few things...

        if (!answeredQuestions.includes(selectedRadioButton.questionNumber)) {
          // If we're dealing with a new single-select qs (no ans has been selected)
          console.log("diff qs, add new item");

          const newAnswer = {
            questionNumber: currQuestion.questionNumber,
            questionTopic: questionObj.questionTopic,
            selectionType: questionObj.selectionType,
            selectedAnswer: selectedRadioButton.selectedAnswer,
            estimatedCost: selectedRadioButton.price,
          };
          newList.push(newAnswer);
          updateResponses(newList);
        }
        // If we're dealing with the same question, regardless if a different answer is selected
        // We replace the answer for that question with the latest selected option details
        else if (
          selectedRadioButton.questionNumber === currQuestion.questionNumber
        ) {
          console.log("same qs, diff ans");
          const newAnswer = {
            questionNumber: currQuestion.questionNumber,
            questionTopic: questionObj.questionTopic,
            selectionType: questionObj.selectionType,
            selectedAnswer: selectedRadioButton.selectedAnswer,
            estimatedCost: selectedRadioButton.price,
          };

          for (let i = 0; i < answeredQuestions.length; i++) {
            if (answeredQuestions[i] === selectedRadioButton.questionNumber) {
              newList[i] = newAnswer;
              break;
            }
          }
          updateResponses(newList);
        }
      }
    }
    console.dirxml(responses);
  }

  async function updateAllResponsesMultiSelect(questionObj) {
    console.log("update responses with multi-select");
    var answeredQuestions = [];
    for (let i = 0; i < responses.length; i++) {
      answeredQuestions.push(responses[i].questionNumber);
    }
    // We need to access the last object of the selectedCheckboxes array to proceed
    // This is because whenever a checkbox is checked, the data (obj) is added to the end of the array of objects
    // We only want to capture the latest piece of obj to access its attributes.
    const latestAddedCheckbox =
      selectedCheckboxes[selectedCheckboxes.length - 1];
    // Keep the original array using spread operator
    const newList = [...responses];

    // Again, we check if specifications are made
    // Same logic as handling responses for singleSelect questions
    if (currQuestion.selectedAnswer === "Custom") {
      const newAnswer = {
        questionNumber: currQuestion.questionNumber,
        questionTopic: questionObj.questionTopic,
        selectionType: questionObj.selectionType,
        selectedAnswer: latestAddedCheckbox.selectedCheckboxes,
        specifications: specifications,
        estimatedCost: latestAddedCheckbox.price,
      };
      // newList.push(newAnswer);
      updateSelectedCheckboxes(newList);
    }
    // If no custom option is selected, we don't need to add specs text in the object
    else {
      console.log("No custom option!");

      // If we're dealing with the same question, but checkboxes is updated
      // We update the checkbox of the question
      if (
        selectedRadioButton.questionNumber === currQuestion.questionNumber &&
        selectedRadioButton.selectedAnswers !== currQuestion.selectedAnswers
      ) {
        console.log("same qs, diff ans");

        // newList[i].selectedAnswers = selectedCheckboxes;
        updateResponses(newList);
      }
      // If we're dealing with a different qs and no ans has been selected
      else if (
        !answeredQuestions.includes(selectedRadioButton.questionNumber)
      ) {
        console.log("diff qs, add new item");
        const newAnswer = {
          questionNumber: currQuestion.questionNumber,
          questionTopic: questionObj.questionTopic,
          selectionType: questionObj.selectionType,
          selectedAnswer: selectedCheckboxes,
        };
        newList.push(newAnswer);
        updateResponses(newList);
      }
    }
  }

  async function handleUpdateResponses(questionObj) {
    if (currQuestion.selectionType === "single-select") {
      setCheckStatus(!checkStatus);
      updateAllResponsesSingleSelect(questionObj);
    } else {
      updateAllResponsesMultiSelect(questionObj);
    }
    calculateTotalPrice();
  }

  function handleCustomRadioButton(answerText, price) {
    setCheckStatus(!checkStatus);
    updateSelectedRadioButton({
      questionNumber: currQuestion.questionNumber,
      selectedAnswer: answerText,
      price: price,
      specifications: specifications,
    });
  }

  var dynamicIndex = 0;
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
          index={dynamicIndex++}
          value={answerText}
          control={<Radio />} // normal radio button
          label={answerText}
          price={price}
          // We need to capture the selected answer option and the price into a state for each option
          // The we will pass this state (object) into the hook that handles updating the entire response object

          onClick={() =>
            updateSelectedRadioButton({
              questionNumber: currQuestion.questionNumber,
              selectedAnswer: answerText,
              price: price,
            })
          }
        />
      ) : (
        <div className="customOption">
          <FormControlLabel
            index={dynamicIndex++}
            control={
              <Radio
                // checked={checkStatus}
                onClick={() => handleCustomRadioButton(answerText, price)}
                value={answerText}
                price={price}
                floatingLabelFixed={true}
                label="other"
              />
            }
            label={
              checkStatus ? (
                <TextField
                  // disabled={!checkStatus}
                  label="Please Specify"
                  onKeyDown={(e) => updateSpecifications(e.target.value)}
                />
              ) : (
                answerText
              )
            }
          />
        </div>
      )
  );

  // We initialise an array of 'false' for myArr
  // It depends on the length of the options for each question.
  // I.e, if there're 8 options, there'll be 8 'false' created in myArr
  const initialiseBooleanArr = () => {
    const myArr = [];
    for (let i = 0; i < currQuestion.answerOptions.length; i++) {
      myArr.push(false);
    }
    return myArr;
  };

  // Set a state for check status array and its updater method
  const [arrCheckedStatus, updateArrCheckStatus] = useState(
    initialiseBooleanArr
  );

  function handleCheckboxes(answerText, price) {
    const currAnswers = Object.values(selectedCheckboxes);
    const availableOptions = currQuestion.answerOptions.map(
      (answerOptions) => answerOptions.answerText
    );
    const index = availableOptions.indexOf(answerText);

    // Updating the boolean value of check status of the equivalent checkbox state.
    arrCheckedStatus[index] = !arrCheckedStatus[index];

    // If the checkbox status is checked, and if the selected answer does not exist in selectedCheckboxes,
    // We simply add it as a new object into selectedCheckboxes
    if (arrCheckedStatus[index]) {
      if (!currAnswers.includes(answerText)) {
        updateSelectedCheckboxes([
          ...selectedCheckboxes,
          {
            selectedAnswer: answerText,
            estimatedCost: price,
          },
        ]);
      }
    } else if (!arrCheckedStatus[index]) {
      // If an option is being UNCHECKED,
      // We need to remove the equivalent object from selectedCheckboxes

      console.log("checkbox is UNCHECKED");
      console.log("before: " + JSON.stringify(selectedCheckboxes));

      const newCheckboxes = selectedCheckboxes;
      for (let i = 0; i < selectedCheckboxes.length; i++) {
        if (selectedCheckboxes[i].selectedAnswer === answerText) {
          newCheckboxes.splice(i, 1);
          updateSelectedCheckboxes(newCheckboxes);
          console.log("now: " + JSON.stringify(selectedCheckboxes));
          break;
        }
      }
    }
  }

  // handleCustomCheckbox is roughly a replicate of handleCheckboxes
  // The only exception is that it handles specifications
  function handleCustomCheckbox(answerText, specifications) {
    const currAnswers = Object.values(selectedCheckboxes);
    const availableOptions = currQuestion.answerOptions.map(
      (answerOptions) => answerOptions.answerText
    );
    const index = availableOptions.indexOf(answerText);
    arrCheckedStatus[index] = !arrCheckedStatus[index];
    if (arrCheckedStatus[index]) {
      if (!currAnswers.includes(answerText)) {
        updateSelectedCheckboxes([
          ...selectedCheckboxes,
          {
            selectedAnswer: answerText,
            specifications: specifications,
            estimatedCost: 0,
          },
        ]);
      }
    } else if (!arrCheckedStatus[index]) {
      console.log("checkbox is UNCHECKED");
      console.log("before: " + JSON.stringify(selectedCheckboxes));
      const newCheckboxes = selectedCheckboxes;
      for (let i = 0; i < selectedCheckboxes.length; i++) {
        if (selectedCheckboxes[i].selectedAnswer === answerText) {
          newCheckboxes.splice(i, 1);
          updateSelectedCheckboxes(newCheckboxes);
          console.log("now: " + JSON.stringify(selectedCheckboxes));
          break;
        }
      }
    }
  }

  // multiSelectQuestions uses roughly the same mapping logic as the one used by singleSelectQuestions
  // The only exception is that the control attribute of each FormControlLabel is Checkbox instead of Radio
  // This is essentially because multi-select questions require us to enable users to select more than just 1 option

  const multiSelectQuestions = currQuestion.answerOptions.map(
    ({ answerText, price }) =>
      answerText !== "Custom" ? (
        <FormControlLabel
          index={dynamicIndex++}
          control={
            <Checkbox
              checked={arrCheckedStatus[dynamicIndex++]}
              onClick={() => handleCheckboxes(answerText, price)}
              value={answerText}
              floatingLabelFixed={true}
            />
          }
          label={answerText}
          price={price}
        />
      ) : (
        <div className="customOption">
          <FormControlLabel
            index={dynamicIndex++}
            value={answerText}
            control={<Checkbox />}
            label={answerText}
            price={price}
            onClick={() => handleCustomCheckbox(answerText, specifications)}
            label={
              <TextField
                required
                label="Please Specify"
                onchange={(e) => updateSpecifications(e.target.value)}
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
      // updateArrCheckStatus();
    }
  };

  const clearAll = () => {
    updateResponses([]);
    currQuestion.selectionType === "single-select"
      ? updateSelectedRadioButton({})
      : updateSelectedCheckboxes([]);

    setCheckStatus(false);
    updateSpecifications("");
    setTotalPrice(0);
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

          <FormControl open fullWidth maxwidth="md">
            <p>
              <strong>All Responses: </strong>
              {JSON.stringify(responses)}
            </p>
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
                <strong>Total Price:</strong> ${JSON.stringify(totalPrice)}
              </p>
              <p>
                <strong>Checked status:</strong>{" "}
                {JSON.stringify(arrCheckedStatus)}
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
                <strong>Current question type: </strong>
                {currQuestion.selectionType}
              </p>
            </CardContent>
          </Card>
        </Dialog>
      </>
    </MuiThemeProvider>
  );
};
export default MCQ;
