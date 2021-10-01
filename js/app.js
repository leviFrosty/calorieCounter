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

const CALORIECOUNTS_KEY = "calorieItems";

// Adds calorieCount array to local storage if  not present
if (localStorage.getItem(CALORIECOUNTS_KEY) === null) {
  localStorage.setItem(CALORIECOUNTS_KEY, "[]");
}

const calories = localStorage.getItem(CALORIECOUNTS_KEY);

function createCalorieObj(calories) {
  return {
    date: new Date().getDay(),
    calories: calories !== undefined ? `${calories}` : "",
  };
}

function setCalories(calories) {
  const savedCalorieItems = localStorage.getItem(CALORIECOUNTS_KEY);
  let destringedArray = JSON.parse(savedCalorieItems);
  const newCalorieItem = createCalorieObj(calories);
  destringedArray.push(newCalorieItem);
  const newStringifiedItems = JSON.stringify(destringedArray);
  localStorage.setItem(CALORIECOUNTS_KEY, newStringifiedItems);
}

function onSubmit(event) {
  event.preventDefault();
  const input = calorieInput.value;
  setCalories(input);
}

calorieForm.addEventListener("submit", onSubmit);
