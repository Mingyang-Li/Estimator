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

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function MCQ(props) {
  const [value, setValue] = React.useState();
  const changedOption = (event) => {
    setValue(event.target.value);
  };

  // we have more single-select question so set it as default
  const [questionType, setQuestionType] = useState("single-select");

  // totalPrice gets updated every time an option is clicked on
  const [totalPrice, setTotalPrice] = useState(0);

  // initial value of question indes = 0 because we'll start displaying questions from the beginning of the array of question objects (quizData)
  const [questionIndex, setQuestionIndex] = useState(0);

  // currQuestion is a question object, it gets updated every time questionIndex changes, which changes the questions
  const currQuestion = quizData[questionIndex];
  const questionNumber = questionIndex + 1;

  // An array of objects that updates whenever the user clicks on an option, be it radio button or checkboxes
  // each response object of the array will contain the necessary data needed for cost calculation as well as options confirmation
  const [responses, updateResponses] = useState([]);

  function handleUpdateResponses(questionObj) {
    const newList = [...responses];

    const newAnswer = {
      questionNumber: questionNumber,
      questionTopic: questionObj.questionTopic,
      selectionType: questionObj.selectionType,
      selectedAnswer: questionObj.answerText,
      estimatedCost: questionObj.price,
    };
    newList.push(newAnswer);
    updateResponses(newList);
  }

  const captureSelectedOptions = () => {};

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
        />
      ) : (
        <div className="customOption">
          <FormControlLabel
            value={answerText}
            control={<Radio />} // normal radio button
            label={answerText}
            price={price}
          />
          <TextField // additional TextField
            label="Please Specify"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
            /* error */
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
          value={answerText}
          control={<Checkbox />}
          label={answerText}
          price={price}
        />
      ) : (
        <div className="customOption">
          <FormControlLabel
            value={answerText}
            control={<Checkbox />}
            label={answerText}
            price={price}
          />
          <TextField
            label="Please Specify"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
            /* error */
          />
        </div>
      )
  );

  const prevQuestion = (e) => {
    e.preventDefault();
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setQuestionType(() => currQuestion.selectionType);
    }
  };

  const nextQuestion = (e) => {
    e.preventDefault();
    if (questionIndex < quizData.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setQuestionType(() => currQuestion.selectionType);
    }
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
            <Grid item xs={5}>
              <Button color="primary" onClick={() => setQuestionIndex(0)}>
                Back to Start
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs>
              <Button
                color="primary"
                startIcon={<DeleteIcon />}
                onClick={() => updateResponses([])}
              >
                Clear All
              </Button>
            </Grid>
          </Grid>

          <br></br>

          <Card open fullWidth maxwidth="sm" boxshadow={3}>
            <CardContent>
              <p>
                <strong>All Responses: </strong>
                {JSON.stringify(responses)}
              </p>
              <p>
                <strong>Selection Type (current): </strong>
                {currQuestion.selectionType}
              </p>
              <p>
                <strong>Is it compulstory? </strong>
                {currQuestion.isCompulstory === true ? "Yes" : "No"}
              </p>
              <p>
                <strong>questionIndex: </strong>
                {questionIndex}
              </p>
              <p>
                <strong>totalPrice: </strong>${totalPrice}
              </p>
            </CardContent>
          </Card>
        </Dialog>
      </>
    </MuiThemeProvider>
  );
}
