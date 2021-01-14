for (let i = 0; i < responses.length; i++) {
  // If we're dealing with the same question, but checkboxes is updated
  // We update the checkbox of the question
  if (
    selectedRadioButton.questionNumber === responses[i].questionNumber &&
    selectedRadioButton.selectedAnswers !== responses[i].selectedAnswers
  ) {
    // console.log("same qs, diff ans");

    newList[i].selectedAnswers = selectedCheckboxes;
    updateResponses(newList);
    break;
  }
  // If we're dealing with a different qs and no ans has been selected
  else if (!answeredQuestions.includes(selectedRadioButton.questionNumber)) {
    // console.log("diff qs, add new item");
    const newAnswer = {
      questionNumber: currQuestion.questionNumber,
      questionTopic: questionObj.questionTopic,
      selectionType: questionObj.selectionType,
      selectedAnswer: selectedCheckboxes,
    };
    newList.push(newAnswer);
    updateResponses(newList);
    break;
  }
}
