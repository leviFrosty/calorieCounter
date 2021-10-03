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
const calorieItemBtns = document.querySelectorAll("button");

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

function deleteCalorie(obj) {
  const calorieItemsList = JSON.parse(localStorage.getItem(CALORIECOUNTS_KEY));
  const buttonId = obj.target.id;
  console.dir(buttonId);
  const newList = calorieItemsList.filter((item) => item.id !== buttonId);
  const newListStringified = JSON.stringify(newList);
  localStorage.setItem(CALORIECOUNTS_KEY, newListStringified);
  paintAllCalories();
}

function paintAllCalories() {
  const calorieItemsList = JSON.parse(localStorage.getItem(CALORIECOUNTS_KEY));
  const ul = document.querySelector(".calorie-entries");
  ul.replaceChildren();
  calorieItemsList.map((item) => {
    const li = document.createElement("li");
    li.id = item.id;
    const span = document.createElement("span");
    span.innerText = `${item.calories}`;
    span.id = item.id;
    span.classList.add(CALORIEITEM_CLASS);
    const btn = document.createElement("button");
    btn.innerText = "x";
    btn.id = item.id;
    btn.classList.add(CALORIEITEM_BUTTON_CLASS);
    btn.addEventListener("click", deleteCalorie);
    li.appendChild(span);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function onSubmit(event) {
  event.preventDefault();
  const input = calorieInput.value;
  setCalories(input);
  paintAllCalories();
}

paintAllCalories();
calorieForm.addEventListener("submit", onSubmit);

function getButtons() {
  console.log(calorieItemBtns);
  console.log(calorieItemBtns.forEach((btn) => console.log(btn)));
}
