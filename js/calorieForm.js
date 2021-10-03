// add calorie entry
// save calorie entries
// add excerise loss from excersize
// set total daily calories
// save total daily calories
// + - total calorie count display with color coding
// Previous week's calories display at top of screen with green/red indicator
// Add happy animation for previous day's calorie defecit
//  dark mode?

const CALORIECOUNTS_KEY = "calorieItems";
const CALORIEITEM_BUTTON_CLASS = "calorie-item_btn";
const CALORIEITEM_CLASS = "calorie-item";
const calorieForm = document.querySelector(".calorie-form");
const calorieInput = calorieForm.querySelector("input");

// Adds calorieCount array to local storage if  not present
if (localStorage.getItem(CALORIECOUNTS_KEY) === null) {
  localStorage.setItem(CALORIECOUNTS_KEY, "[]");
}

function createCalorieObj(calories) {
  const id = Math.random().toString(16).slice(2);
  return {
    date: new Date().getDay(),
    calories: calories !== undefined ? `${calories}` : "",
    id: id,
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

function printAllCalories() {
  const calorieItemsList = JSON.parse(localStorage.getItem(CALORIECOUNTS_KEY));
  const ul = document.querySelector(".calorie-entries");
  ul.replaceChildren();
  calorieItemsList.map((item) => {
    // creates lis
    const li = document.createElement("li");
    let nodeText = document.createTextNode(`${item.calories}`);
    li.appendChild(nodeText);
    li.id = item.id;
    li.classList.add(CALORIEITEM_CLASS);
    ul.appendChild(li);
    // creates del buttons
    const btn = document.createElement("button");
    btn.id = item.id;
    btn.classList.add(CALORIEITEM_BUTTON_CLASS);
    let btnText = document.createTextNode("X");
    btn.appendChild(btnText);
    li.appendChild(btn);
  });
}

function onSubmit(event) {
  event.preventDefault();
  const input = calorieInput.value;
  setCalories(input);
  printAllCalories();
}

printAllCalories();
calorieForm.addEventListener("submit", onSubmit);
