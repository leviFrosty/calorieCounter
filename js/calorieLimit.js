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

handleCaloriePrompt();
function handleCaloriePrompt() {
  const savedMaxCal = localStorage.getItem(MAXCALORIE_KEY);
  calMaxForm.className = "hidden";
  if (savedMaxCal === "") {
    calMaxForm.className = "";
  }
}

function onLimitSubmit(event) {
  event.preventDefault();
  const limit = calMaxInput.value;
  localStorage.setItem(MAXCALORIE_KEY, limit);
  paintsCalorieLimitBox();
  handleCaloriePrompt();
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
calMaxForm.addEventListener("submit", onLimitSubmit);
