const calMaxForm = document.getElementById("desiredCalories-form");
const calMaxInput = document.querySelector("input");
const maxCalDiv = document.querySelector(".maxCalCalculator");

// Precreates storage items if undefined
if (localStorage.getItem(MAXCALORIE_KEY) === null) {
  localStorage.setItem(MAXCALORIE_KEY, "");
}
if (localStorage.getItem(CURRENTCALTOTAL_KEY) === null) {
  localStorage.setItem(CURRENTCALTOTAL_KEY, "");
}

function handleCaloriePrompt() {
  const savedMaxCal = localStorage.getItem(MAXCALORIE_KEY);
  const caloriePromptContainer = document.getElementById(
    "desiredCalories-container"
  );
  caloriePromptContainer.className = "hidden";
  if (savedMaxCal === "" || null) {
    caloriePromptContainer.className = "";
  }
}

function onLimitSubmit(event) {
  event.preventDefault();
  const limit = calMaxInput.value;
  localStorage.setItem(MAXCALORIE_KEY, limit);
  paintsCalorieLimitBox();
  handleCaloriePrompt();
  handleInputContainer();
}

function setSavedTotalCals() {
  const savedItems = JSON.parse(localStorage.getItem(CALORIECOUNTS_KEY));
  let totalCals = 0;
  for (i in savedItems) {
    const calEntry = parseInt(savedItems[i].calories);
    totalCals += calEntry;
  }
  localStorage.setItem(CURRENTCALTOTAL_KEY, totalCals);
}

function paintCurrentTotalCal() {
  const currentTotalElement = maxCalDiv.querySelector("div:first-child");
  const savedCurrCal = localStorage.getItem(CURRENTCALTOTAL_KEY);
  currentTotalElement.innerText = savedCurrCal;
}

function paintCalLimit() {
  const maxCalElement = maxCalDiv.querySelector("div:last-child");
  const savedMaxCal = localStorage.getItem(MAXCALORIE_KEY);
  maxCalElement.innerText = savedMaxCal;
  if (savedMaxCal !== "") {
    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset";
    resetButton.addEventListener("click", resetCalLimit);
    maxCalElement.appendChild(resetButton);
  }
}

function resetCalLimit() {
  localStorage.setItem(MAXCALORIE_KEY, "");
  paintsCalorieLimitBox();
  handleCaloriePrompt();
  handleInputContainer();
}

function paintsCalorieLimitBox() {
  setSavedTotalCals();
  const savedCurrCal = parseInt(localStorage.getItem(CURRENTCALTOTAL_KEY));
  const savedMaxCal = parseInt(localStorage.getItem(MAXCALORIE_KEY));
  const currentTotalElement = maxCalDiv.querySelector("div:first-child");
  if (savedCurrCal <= savedMaxCal) {
    currentTotalElement.className = "under";
  }
  if (savedCurrCal > savedMaxCal - 300 && savedCurrCal <= savedMaxCal) {
    currentTotalElement.className = "warning";
  }
  if (savedCurrCal > savedMaxCal) {
    currentTotalElement.className = "over";
  }
  paintCalLimit();
  paintCurrentTotalCal();
}

paintsCalorieLimitBox();
handleInputContainer();
calMaxForm.addEventListener("submit", onLimitSubmit);
