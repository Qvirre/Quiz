


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
const reserButton  = document.getElementById("reset");

submitButton.addEventListener("click", (event) => {
    let content = "The form is commitid!\n";
    let firstName = document.getElementById("firstName").value + "\n";
    let lastName = document.getElementById("lastName").value + "\n";
    let email = document.getElementById("email").value;
    content += firstName + lastName + email;
    document.getElementById("resultat").innerText = content;

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
    document.getElementById("resultat").innerText = counter;
  
});

reserButton.addEventListener("click", (event) => {
    document.getElementById('resultat').innerText = ""; 
});

