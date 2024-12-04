/**
 * Creating classes:
 *
 * Class declaration: class Name {}
 * Class expression:  const Name = class {}
 */

class Facit {
   constructor(
      // Defines parameters:
      answerOne,
      answerTwo,
      answerThree,
      answerFoure,
      answerFive
   ) {
      // Define properties:
      this.answerOne = answerOne;
      this.answerTwo = answerTwo;
      this.answerThree = answerThree;
      this.answerFoure = answerFoure;
      this.answerFive = answerFive;
   }
   // Add methods like normal functions:  
}

// Create a new object from the class Facit
const quizFacit = new Facit(
   "Orange",
   "Markup",
   ["Firefox", " Chrome", " Safari", " Edge"],
   "Brendan Eich",
   "Paris"
);

function isTextCorrect(questionId, correctValue) {
   const answer = document.querySelector(questionId).value;
   return answer.toLowerCase() === correctValue.toLowerCase();
}

function isSelectCorrect(questionId, correctValue) {
   const answer = document.querySelector(questionId).value;
   return answer.toLowerCase() === correctValue.toLowerCase();
}

function isSelected(questionId) {
   const answer = document.querySelector(questionId).value;
   return answer.toLowerCase() !== "";
}

function isRadioCorrect(questionId, correctValue) {
   const answer = document.querySelector(`input[name="${questionId}"]:checked`);
   return answer ? answer.value.toLowerCase() === correctValue.toLowerCase() : false; 
}

function isCheckt(questionId) {
   const answer = document.querySelector(`input[name="${questionId}"]:checked`);
   return answer ? answer.value.toLowerCase() !== "" : false;
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
   let elem = document.querySelector(name);

   return (elem.value === "");
}

/* Only letters are allowed */
function checkPatternText(name) {
   let elem = document.querySelector(name);

   // Allow A-Z, a-z min 1 char.
   let re = /^[a-zA-Z]+$/;
   
   return re.test(elem.value);
}

/* Enter a valid email address */
function checkPatternEmail(name) {
   let elem = document.querySelector(name);

   // Allow
   let re = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
   
   return re.test(elem.value);
}


/* Event */
const submitButton = document.querySelector("#submit");
const resetButton  = document.querySelector("#reset");
const facitButton  = document.querySelector("#facit");

let fNameValid = false;
let lNameValid = false;
let emailValid = false;
let q1Valid    = false;
let q2Valid    = false;
let q3Valid    = false;
let q4Valid    = false;

function setFlagsToFalse () {
   fNameValid = false;
   lNameValid = false;
   emailValid = false;
   q1Valid    = false;
   q2Valid    = false;
   q3Valid    = false;
   q4Valid    = false;
   document.querySelector("#divError").style.color = "red";
}

/* submitButton addEventListener */
submitButton.addEventListener("click", (event) => {

   setFlagsToFalse();

   /* Visitor Information */

   if (checkEmty("#firstName")) {
      document.querySelector("#divError").innerText = "Fill in your first name!";
   } else if (!checkPatternText("#firstName")) {
      document.querySelector("#divError").innerText = "Only letters are allowed!";  
   } else {
      fNameValid = true; 
      document.querySelector("#divError").innerText = "";
   }

   if (fNameValid === true) {
      if (checkEmty("#lastName")) {
         document.querySelector("#divError").innerText = "Fill in your last name!";
      } else if (!checkPatternText("#lastName")) {
         document.querySelector("#divError").innerText = "Only letters are allowed!";  
      } else {
         lNameValid = true;
         document.querySelector("#divError").innerText = "";
      }
   }

   if (lNameValid === true) {
      if (checkEmty("#email")) {
         document.querySelector("#divError").innerText = "Fill in your email address!";
      } else if (!checkPatternEmail("#email")) {
         document.querySelector("#divError").innerText = "Enter a valid email address!";  
      } else {
         emailValid = true;
         document.querySelector("#divError").innerText = "";
      }
   }

   /* Count */
   let counter = 0;

   /* Question 1 */
   if (isTextCorrect("#q1", "Orange")) {
      counter++;
   };

   if (emailValid === true) {
      if (checkEmty("#q1")) {
         document.querySelector("#divError").innerText = "Question 1 is required!";
      } else if (!checkPatternText("#q1")) {
         document.querySelector("#divError").innerText = "Only letters are allowed!";  
      } else {
         q1Valid = true;
         document.querySelector("#divError").innerText = "";
      }
   }

   /* Question 2 */
   if (isRadioCorrect("q2", "Markup")) {
      counter++;
   };

   if (q1Valid === true) {
      if (!isCheckt("q2")) {
         document.querySelector("#divError").innerText = "Question 2 is required!";
      } else {
         q2Valid = true;
         document.querySelector("#divError").innerText = "";
      }
   }

   /* Question 3 */
   const correctValueQ3 = ["Firefox", "Chrome", "Safari", "Edge"];
   if (isCheckboxCorrect("q3", correctValueQ3)) {
      counter++;
   };

   if (q2Valid === true) {
      if (!isCheckt("q3")) {
         document.querySelector("#divError").innerText = "Question 3 is required!";
      } else {
         q3Valid = true;
         document.querySelector("#divError").innerText = "";
      }
   }
   
   /* Question 4 */
   if (isSelectCorrect("#q4", "Brendan Eich")) {
      counter++;
   };

   if (q3Valid === true) {
      if (!isSelected("#q4")) {
         document.querySelector("#divError").innerText = "Question 4 is required!";
      } else {
         q4Valid = true;
         document.querySelector("#divError").innerText = "";
      }
   }

   /* Question 5 */
   if (isTextCorrect("#q5", "Paris")) {
      counter++;
   };

   if (q4Valid === true) {
      if (checkEmty("#q5")) {
         document.querySelector("#divError").innerText = "Question 5 is required!";
      } else if (!checkPatternText("#q5")) {
         document.querySelector("#divError").innerText = "Only letters are allowed!";  
      } else {
         document.querySelector("#divError").style.color = "blue";
         document.querySelector("#divError").innerText = "Quiz submitted successfully!";
      }
   }
   
   /* You scorde. */
   document.querySelector("#divScore").innerText = "You scorde " + counter + " out of 5.";

   /* Opinion on results */
   switch(counter) {
      case 5:
         document.querySelector("#divScore").innerText += "\n Congratulations, you answered all the questions correctly.";
         break;
      case 4:
         document.querySelector("#divScore").innerText += "\n It was close, you answered wrong on one question.";
         break;
      case 3:
      case 2:
         document.querySelector("#divScore").innerText += "\n Better luck next time.";
         break;  
      default:
         document.querySelector("#divScore").innerText += "\n Quizzes are not for you.";
   } 
  
});

/* resetButton addEventListener */
resetButton.addEventListener("click", (event) => {
   setFlagsToFalse();
   document.querySelector("#divError").innerText = ""; 
   document.querySelector("#divScore").innerText = "";
   document.querySelector("#divFacit").innerText = "";
});

/* facitButton addEventListener */
facitButton.addEventListener("click", (event) => {

   if (document.querySelector("#divFacit").innerHTML == "") {

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
      // document.getElementById("divFacit").innerHTML = content;
      document.querySelector("#divFacit").innerHTML = content;
      document.querySelector("#facit").setAttribute("value", "Hide Answers");  
   } else {
      document.querySelector("#divFacit").innerHTML = "";
      document.querySelector("#facit").setAttribute("value", "Show Correct Answers");
   }
   
});

