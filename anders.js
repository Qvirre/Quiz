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

/* Check if Emty */
function checkEmty(name) {
   let elem = document.getElementById(name);

   return (elem.value === "");
}

/* Only letters are allowed */
function checkPatternText(name) {
   let elem = document.getElementById(name);

   // Allow A-Z, a-z min 1 char.
   let re = /^[a-zA-Z]+$/;
   
   return re.test(elem.value);
}

/* Enter a valid email address */
function checkPatternEmail(name) {
   let elem = document.getElementById(name);

   // Allow
   let re = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
   
   return re.test(elem.value);
}

/* Event */
const submitButton = document.getElementById("submit");
const resetButton  = document.getElementById("reset");
const facitButton  = document.getElementById("facit");

let fNameValid = false;
let lNameValid = false;

submitButton.addEventListener("click", (event) => {

   /* Visitor Information */

   if (checkEmty("firstName")) {
      document.getElementById("divError").innerText = "Fill in your first name!";
   } else if (!checkPatternText("firstName")) {
      document.getElementById("divError").innerText = "Only letters are allowed!";  
   } else {
      fNameValid = true; 
      document.getElementById("divError").innerText = "";
   }

   if (fNameValid === true) {
      if (checkEmty("lastName")) {
         document.getElementById("divError").innerText = "Fill in your last name!";
      } else if (!checkPatternText("lastName")) {
         document.getElementById("divError").innerText = "Only letters are allowed!";  
      } else {
         lNameValid = true;
         document.getElementById("divError").innerText = "";
      }
   }

   if (lNameValid === true) {
      if (checkEmty("email")) {
         document.getElementById("divError").innerText = "Fill in your email address!";
      } else if (!checkPatternEmail("email")) {
         document.getElementById("divError").innerText = "Enter a valid email address!";  
      } else {
         document.getElementById("divError").innerText = "";
      }
   }

   /* Count */
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

   /* You scorde. */
   document.getElementById("divScore").innerText = "You scorde " + counter + " out of 5.";

   /* Opinion on results */
   switch(counter) {
      case 5:
         document.getElementById("divScore").innerText += "\n Congratulations, you answered all the questions correctly.";
         break;
      case 4:
         document.getElementById("divScore").innerText += "\n It was close, you answered wrong on one question.";
         break;
      case 3:
      case 2:
         document.getElementById("divScore").innerText += "\n Better luck next time.";
         break;  
      default:
         document.getElementById("divScore").innerText += "\n Quizzes are not for you.";
   } 
  
});

resetButton.addEventListener("click", (event) => {
   fNameValid = false;
   lNameValid = false;   
   document.getElementById("divError").innerText = ""; 
   document.getElementById("divScore").innerText = "";
   document.getElementById("divFacit").innerText = ""; 
});

facitButton.addEventListener("click", (event) => {

   /* Mix text and variables with template literals */
   const content = `
   <h2>Correct Answers</h2>
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

