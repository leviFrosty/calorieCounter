// add calorie entry
// save calorie entries
// add excerise loss from excersize
// set total daily calories
// save total daily calories
// + - total calorie count display with color coding
// Previous week's calories display at top of screen with green/red indicator
// Add happy animation for previous day's calorie defecit
//  dark mode?

const calorieForm = document.querySelector(".calorie-form");
const calorieInput = calorieForm.querySelector("input");

const CALORIECOUNTS_KEY = "calorieCounts";

// Adds calorieCount array to local storage if  not present
if (localStorage.getItem(CALORIECOUNTS_KEY) === null) {
  const calorieItems = JSON.stringify([
    {
      date: new Date().getDay(),
      calories: "",
    },
  ]);
  localStorage.setItem(CALORIECOUNTS_KEY, calorieItems);
}

function onSubmit(event) {
  event.preventDefault();
  console.log(calorieInput.value);
}

calorieForm.addEventListener("submit", onSubmit);
