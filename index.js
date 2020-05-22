const input = document.getElementById("d20");
input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    rollType();
  }
});

const roll = (die) => {
  let outcome = Math.floor(Math.random() * die + 1);
  return outcome;
};
const tallyDice = (numberOfDice, die) => {
  let dieArray = {};
  for (let i = 1; i <= numberOfDice; i++) {
    dieArray[i] = roll(die);
  }
  return dieArray;
};

const addModifiers = (numberOfDice, die, modifiers) => {
  let dice = tallyDice(numberOfDice, die);
  let total = 0;
  for (let i = 1; i <= numberOfDice; i++) {
    total += dice[i];
  }
  total += modifiers;
  return `${numberOfDice}d${die}+${modifiers} = (${Object.values(
    dice
  )}) + ${modifiers}=>${total}`;
};

const displayRoll = (numberOfDice, die, modifiers) => {
  let p = document.createElement("p");
  p.innerHTML = addModifiers(numberOfDice, die, modifiers);
  document.getElementById("outcome").appendChild(p);
};

const rollType = () => {
  const dieType = ["d4", "d6", "d8", "d10", "d12", "d20"];
  const d20 = document.getElementById("d20").value;
  if (d20.toLowerCase().indexOf("d") === -1) {
    errorMessage(0);
  }
  for (let i = 0; i <= dieType.length; i++) {
    if (d20.includes(dieType[i])) {
      let mod = d20.lastIndexOf("+");
      if (d20.indexOf(dieType[i]) > 0 && d20.includes("+")) {
        displayRoll(
          d20.charAt(0),
          dieType[i].slice(1),
          Number(d20.substring(mod + 1, d20.length))
        );
        errorMessage(2);
      } else if (d20.indexOf(dieType[i]) > 0) {
        displayRoll(d20.charAt(0), dieType[i].slice(1), 0);
        errorMessage(2);
      } else if (d20.includes("+") && d20.indexOf(dieType[i]) == 0) {
        displayRoll(
          1,
          dieType[i].slice(1),
          Number(d20.substring(mod + 1, d20.length))
        );
        errorMessage(2);
      } else {
        displayRoll(1, dieType[i].slice(1), 0);
        errorMessage(2);
      }
    }
  }
};

const errorMessage = (errorType) => {
  const dangerText = document.getElementById("text-danger");
  const errorMsg = [
    "Please prefix your die with a 'd'",
    "Please enter a value",
    "",
    "Please ensure you add the modifier last",
  ];
  dangerText.innerHTML = errorMsg[errorType];
};
/*
  Validations:
    - Confirm there is a d in the string
    - Check if the field is blank
    - check if modifiers are applied
    - check for the number of dice rolled
  User Stories:
    - Add check for number of dieType
    - Add check for modifiers
    - clear history
*/
