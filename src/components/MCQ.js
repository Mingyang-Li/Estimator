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

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function MCQ(props) {
  const [value, setValue] = React.useState();
  const changedOption = (event) => {
    setValue(event.target.value);
  };

  const [questionType, setQuestionType] = useState("single-select");
  const [totalPrice, setTotalPrice] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);

  const currQuestion = quizData[questionIndex];
  const questionNumber = questionIndex + 1;

  // An array of objects
  const [responses, updateResponses] = useState([]);

  function handleUpdateResponses(questionObj) {
    console.log("handleUpdateResponses triggered");
    const newList = responses.map((response) => {
      const updatedResponses = [
        ...response,
        {
          questionNumber: questionIndex + 1,
          questionTopic: questionObj.questionTopic,
          selectedAnswer: questionObj.answerText,
          estimatedCost: questionObj.price,
        },
      ];

      return updatedResponses;
    });
    updateResponses(newList);
  }

  const singleSelectQuestions = currQuestion.answerOptions.map(
    ({ answerText, price }) =>
      answerText !== "Custom" ? (
        <FormControlLabel
          value={answerText}
          control={<Radio />}
          label={answerText}
          price={price}
          onClick={() => handleUpdateResponses(currQuestion)}
        />
      ) : (
        <div className="customOption">
          <FormControlLabel
            value={answerText}
            control={<Radio />}
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

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setQuestionType(() => currQuestion.selectionType);
    }
  };

  const nextQuestion = () => {
    if (questionIndex < quizData.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setQuestionType(() => currQuestion.selectionType);
    }
  };
  return (
    <MuiThemeProvider theme={theme}>
      <>
        <OwnAppBar title />

        <Dialog open fullWidth maxWidth="md">
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
            <RadioGroup value={value} onChange={changedOption}>
              {currQuestion.selectionType === "single-select"
                ? singleSelectQuestions
                : multiSelectQuestions}
            </RadioGroup>
          </FormControl>
          <br></br>

          <Button
            color="secondary"
            variant="contained"
            onClick={() => setQuestionIndex(0)}
          >
            Back to Start
          </Button>
          <Button color="secondary" variant="contained" onClick={prevQuestion}>
            Previous
          </Button>
          <Button color="primary" variant="contained" onClick={nextQuestion}>
            {questionIndex + 1 === quizData.length
              ? "Calculate Cost"
              : "Continue"}
          </Button>

          <br></br>

          <Card open fullWidth maxWidth="sm" boxShadow={3}>
            <CardContent>
              <p>
                <strong>All Responses: </strong>
                {responses}
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
