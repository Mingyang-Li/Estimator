const multiSelectQuestions = currQuestion.answerOptions.map(
  ({ answerText, price }) =>
    answerText !== "Custom" ? (
      <FormControlLabel
        className="currentCheckbox"
        value={answerText}
        control={<Checkbox />}
        label={answerText}
        price={price}
        onChange={() =>
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
