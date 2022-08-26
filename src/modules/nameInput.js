import { playerName } from "./storeData";
import { nameEntered } from "./gameFlow";

const inputCont = document.querySelector(".playerNameCont");
const nameBtn = document.querySelector(".nameConfirmBtn");
const inputName = document.getElementById("nameInputForm");

nameBtn.addEventListener("click", confirmName);

function enableName() {
  inputCont.style.display = "flex";
}

function hideName() {
  inputCont.style.display = "none";
}

function confirmName() {
  let inputVal = inputName.value;

  if (inputVal !== "" && inputVal) {
    playerName = inputVal;

    nameEntered();
  }
}

// if name valid then initgame

export { enableName, hideName };
