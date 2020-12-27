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
import { quizData } from "./quizData";
import { DevicesOtherSharp } from "@material-ui/icons";

export default function MCQ(props) {
  const [value, setValue] = React.useState();
  const changedOption = (event) => {
    setValue(event.target.value);
  };

  const [questionType, setQuestionType] = useState("single-select");
  const [totalPrice, setTotalPrice] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);

  const currQuestion = quizData[questionIndex];

  // An array of objects
  const [allResponses, setAllResponses] = useState([]);

  const singleSelectQuestions = currQuestion.answerOptions.map(
    ({ answerText, price }) =>
      answerText != "Custom" ? (
        <FormControlLabel
          value={answerText}
          control={<Radio />}
          label={answerText}
          price={price}
          onClick={setAllResponses}
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
      answerText != "Custom" ? (
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
      setQuestionType(currQuestion.selectionType);
    }
  };

  const nextQuestion = () => {
    if (questionIndex < quizData.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setQuestionType(currQuestion.selectionType);
    }
  };
  return (
    <MuiThemeProvider theme={theme}>
      <>
        <OwnAppBar title />
        <Dialog open fullWidth maxWidth="md">
          <FormControl component="fieldset">
            <h2 component="legend">
              {questionIndex + 1 + ". "}
              {currQuestion.questionTopic}
            </h2>
            <h3 component="legend">{currQuestion.questionText}</h3>
            <RadioGroup value={value} onChange={changedOption}>
              {currQuestion.selectionType === "single-select"
                ? singleSelectQuestions
                : multiSelectQuestions}
            </RadioGroup>
          </FormControl>

          <Button color="secondary" variant="contained" onClick={prevQuestion}>
            Back
          </Button>
          <Button color="primary" variant="contained" onClick={nextQuestion}>
            Continue
          </Button>
          <p>How many questions: {quizData.length}</p>
          <p>questionIndex: {questionIndex}</p>
          <p>totalPrice: ${totalPrice}</p>
        </Dialog>
      </>
    </MuiThemeProvider>
  );
}

/*
 <p>selectionType: {currQuestion.selectionType}</p>
<p>
  I am a <strong>{currQuestion.selectionType}</strong> question
</p>
<p>
  The JSX I'm using:{" "}
  <strong>
    {currQuestion.selectionType === "single-select"
      ? "singleSelectQuestions"
      : "multiSelectQuestions"}
  </strong>
</p>
 */
