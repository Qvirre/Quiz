/**
 * Create a class for the Facit object type.
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
*/

import Facit from "./Facit.js";

const quizFacit = new Facit(
    "Orange",
    "Markup",
    ["Firefox", "Chrome", "Safari", "Edge"],
    "Brendan Eich",
    "Paris"
);

function isTextCorrect(questionId, correctValue) {
    const answer = document.getElementById(questionId).value;
    return answer.toLowerCase() === correctValue.toLowerCase();
}

function isSelectCorrect(questionId, correctValue) {
    const answer = document.getElementById(questionId).value;
    return answer.toLowerCase() === correctValue.toLowerCase();
}

function isRadioCorrect(questionId, correctValue) {
    const answer = document.querySelector(`input[name="${questionId}"]:checked`);
    return answer ? answer.value.toLowerCase() === correctValue.toLowerCase() : false; 
}

function isCheckboxCorrect(questionId, correctValue) {
    const checkedCheckboxes = [];

    document.querySelectorAll(`input[name="${questionId}"]:checked`)
        .forEach(checkbox => {
            checkedCheckboxes.push(checkbox.value.toLowerCase());
        });
    /* map() creates a new array from calling a function for every array element. */
    return arraysEqual(checkedCheckboxes, correctValue.map(value => value.toLowerCase()));
}

function arraysEqual(arr1, arr2) {
    /* The every() method executes a function for each array element. */
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}


/* Event */
const submitButton = document.getElementById("submit");
const resetButton  = document.getElementById("reset");
const facitButton  = document.getElementById("facit");

submitButton.addEventListener("click", (event) => {
    let content = "";
    let firstName = document.getElementById("firstName").value + "\n";
    let lastName = document.getElementById("lastName").value + "\n";
    let email = document.getElementById("email").value;
    content += firstName + lastName + email;
    document.getElementById("divError").innerText = content;

    /* Rätta */
    let counter = 0;

    /* Question 1 */
    if (isTextCorrect("q1", "Orange")) {
        counter++;
    };

    /* Question 2 */
    if (isRadioCorrect("q2", "Markup")) {
        counter++;
    };

    /* Question 3 */
    const correctValueQ3 = ["Firefox", "Chrome", "Safari", "Edge"];
    if (isCheckboxCorrect("q3", correctValueQ3)) {
        counter++;
    };
   

    /* Question 4 */
    if (isSelectCorrect("q4", "Brendan Eich")) {
        counter++;
    };

    /* Question 5 */
    if (isTextCorrect("q5", "Paris")) {
        counter++;
    };

    /* Redovisa antal rätt */
    document.getElementById("divScore").innerText = "You scorde " + counter + " out of 5.";
  
});

resetButton.addEventListener("click", (event) => {
    document.getElementById("divError").innerText = ""; 
    document.getElementById("divScore").innerText = "";
    document.getElementById("divFacit").innerText = ""; 
});

facitButton.addEventListener("click", (event) => {

    /* Mix text and variables with template literals */
    const content = `
    <h3>Correct Answers</h3>
    <ol>
        <li>${quizFacit.answerOne}</li>
        <li>${quizFacit.answerTwo}</li>
        <li>${quizFacit.answerThree}</li>
        <li>${quizFacit.answerFoure}</li>
        <li>${quizFacit.answerFive}</li>
    </ol>  
    `;

    document.getElementById("divFacit").innerHTML = content; 
});

