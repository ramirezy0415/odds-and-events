// === STATE ===
// The numbers in the bank, odd category, and even category are stored as state variables.
const bank = [];
const odds = [];
const evens = [];

// When the user clicks the "Add number" button, the number they entered into the input field should be added to the number bank.
// The number bank should display all of the numbers that the user has entered.
function addNumber(number) {
  // Add the number to the numbers list
  bank.push(number);

  // Ensure to render in order to get the most up to date list
  render();
}

function sortNumber(number) {
  // If the provided input's modulo 2 is 0 then it is even
  if (number % 2 === 0) {
    evens.push(number);
  }
  // If the input's modulo 2 is not 0 then it is odd
  else if (number % 2 !== 0) {
    odds.push(number);
  }

  // Update the screen with the most up to date list of numbers
  render();
}

// When the "Sort 1" button is clicked, the first number in the number bank is removed and placed into either the odd or even category.
function sort1() {
  if (bank.length === 0) {
    return;
  } else {
    // Take the first element from the numbers list and sort it
    sortNumber(bank.shift());
  }
}

// When the "Sort All" button is clicked, all numbers in the number bank are moved into either the odd or even category.
// Numbers are moved into the correct category based on whether they are odd or even.
function sortAll() {
  if (bank.length === 0) {
    return;
  } else {
    // Take the first element from the numbers list and sort it
    while (bank.length > 0) {
      sortNumber(bank.shift());
    }
  }

  // Update the UI with the latest list of elements
  render();
}

// Functions are used to organize logic involving state changes.
// UI elements are organized into component functions.
// Event listeners modify state. They do not directly modify the document.

// The application contains a form that allows users to input a number.
function inputForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
        <label for="number">Add a number to the bank</label>
        <input
          type="text"
          name="number"
          id="number"
          placeholder="Add number here"
        />
        <button type="submit" data-action="add">Add number</button>
        <button type="submit" data-action="sort1">Sort 1</button>
        <button type="submit" data-action="sortAll">Sort All</button>`;

  $form.addEventListener("submit", function (event) {
    event.preventDefault();
    const event_type = event.submitter.dataset.action;
    const form_data = new FormData($form);
    const number_input = Number(form_data.get("number"));

    if (event_type === "add") {
      addNumber(number_input);
    } else if (event_type === "sort1") {
      sort1();
    } else if (event_type === "sortAll") {
      sortAll();
    }
  });
  return $form;
}

function group(groupName, list) {
  const $section = document.createElement("section");
  $section.innerHTML = `
        <h2>${groupName}</h2>
        <p></p>
  `;
  const $p = $section.querySelector("p");
  list.forEach((element) => {
    const element_string = element + " ";
    $p.textContent += element_string;
  });

  return $section;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1> Odds and Events </h1>
    <INPUTFORM></INPUTFORM>
    <GROUP id="bank"> </GROUP>
    <GROUP id="odds"> </GROUP>
    <GROUP id="evens"> </GROUP>
  `;
  $app.querySelector("INPUTFORM").replaceWith(inputForm());
  $app.querySelector("GROUP#bank").replaceWith(group("Bank", bank));
  $app.querySelector("GROUP#odds").replaceWith(group("Odds", odds));
  $app.querySelector("GROUP#evens").replaceWith(group("Evens", evens));
  return $app;
}

render();
