async function updateAllResponsesSingleSelect(questionObj) {
  console.log("update responses with single-select");
  // If the user selected a custom option, we need to have specification input passed into the object
  if (selectedRadioButton.selectedAnswer == "Custom") {
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
  } else if (selectedRadioButton.selectedAnswer != "Custom") {
    // console.log("No custom option");
    // If no custom option is selected, we don't need to add specs text in the object
    // If the latest selected answer is different to the one existed for that same qs, we update it in-place.
    // If the question is different, and we haven't select an answer yet, we add new item into allResponses

    // If we haven't select anything, just add the response to it!
    if (responses.length === 0) {
      // console.log("adding item into empty arr");
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
      // console.log("arr is not empty");
      // Collect question numbers that are being answered already
      var answeredQuestions = [];
      for (let i = 0; i < responses.length; i++) {
        answeredQuestions.push(responses[i].questionNumber);
      }
      // If we our allResponses is NOT empty, we want to check a few things...

      // If we're dealing with the same question, regardless if a different answer is selected
      // We replace the answer for that question with the latest selected option details
      if (selectedRadioButton.questionNumber === currQuestion.questionNumber) {
        // console.log("same qs, diff ans");
        const newAnswer = {
          questionNumber: currQuestion.questionNumber,
          questionTopic: questionObj.questionTopic,
          selectionType: questionObj.selectionType,
          selectedAnswer: selectedRadioButton.selectedAnswer,
          estimatedCost: selectedRadioButton.price,
        };

        newList[i] = newAnswer;
        updateResponses(newList);
        break;
      } else if (
        !answeredQuestions.includes(selectedRadioButton.questionNumber)
      ) {
        // If we're dealing with a new single-select qs (no ans has been selected)
        // console.log("diff qs, add new item");
        const newAnswer = {
          questionNumber: currQuestion.questionNumber,
          questionTopic: questionObj.questionTopic,
          selectionType: questionObj.selectionType,
          selectedAnswer: selectedRadioButton.selectedAnswer,
          estimatedCost: selectedRadioButton.price,
        };
        newList.push(newAnswer);
        updateResponses(newList);
        break;
      }
    }
  }
}

async function updateAllResponsesMultiSelect(questionObj) {
  console.log("update responses with multi-select");
  // We need to access the last object of the selectedCheckboxes array to proceed
  // This is because whenever a checkbox is checked, the data (obj) is added to the end of the array of objects
  // We only want to capture the latest piece of obj to access its attributes.
  const latestAddedCheckbox = selectedCheckboxes[selectedCheckboxes.length - 1];
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
    newList.push(newAnswer);
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

      newList[i].selectedAnswers = selectedCheckboxes;
      updateResponses(newList);
      break;
    }
    // If we're dealing with a different qs and no ans has been selected
    else if (!answeredQuestions.includes(selectedRadioButton.questionNumber)) {
      console.log("diff qs, add new item");
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
}

async function handleUpdateResponses(questionObj) {
  currQuestion.selectionType === "single-select"
    ? updateAllResponsesSingleSelect(questionObj)
    : updateAllResponsesMultiSelect(questionObj);
  calculateTotalPrice();
}
