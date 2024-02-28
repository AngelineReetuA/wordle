const dataset = [
  "APPLE",
  "ALERT",
  "ARGUE",
  "AUDIO",
  "ABOVE",
  "BEACH",
  "BRICK",
  "BLAST",
  "BRACE",
  "BROWN",
  "CHAOS",
  "CLOUD",
  "CATCH",
  "CHART",
  "CAMEL",
  "DANCE",
  "DREAM",
  "DOZEN",
  "DELTA",
  "DWELL",
  "EAGLE",
  "EMAIL",
  "EXACT",
  "ELBOW",
  "ENEMY",
  "FABLE",
  "FORUM",
  "FROST",
  "FAITH",
  "FLAME",
  "GLASS",
  "GREAT",
  "GREEN",
  "GLOVE",
  "GRAPE",
  "HUMOR",
  "HOTEL",
  "HEART",
  "HUMID",
  "HASTE",
  "IVORY",
  "IMAGE",
  "INPUT",
  "IGLOO",
  "INDIE",
  "JUMPS",
  "JOKER",
  "JUMBO",
  "JELLY",
  "JOYCE",
  "KOALA",
  "KNEEL",
  "KNIFE",
  "KICKS",
  "KNACK",
  "LEMON",
  "LYRIC",
  "LUNCH",
  "LILAC",
  "LEAVE",
  "MANGO",
  "MUSIC",
  "MAGIC",
  "METAL",
  "MOWER",
  "NOBLE",
  "NIGHT",
  "NINJA",
  "NAILS",
  "NURSE",
  "OCEAN",
  "OASIS",
  "ONION",
  "OVALS",
  "ORBIT",
  "PANDA",
  "PIZZA",
  "POWER",
  "PEACH",
  "PAINT",
  "QUEST",
  "QUICK",
  "QUOTE",
  "QUEEN",
  "QUOTA",
  "RADIO",
  "RIVAL",
  "RIVER",
  "ROBOT",
  "RAISE",
  "SUNNY",
  "SHIRT",
  "SMILE",
  "STORM",
  "SALTY",
  "TIGER",
  "TOWER",
  "TRUTH",
  "THUMB",
  "TASTE",
  "UMBRA",
  "USUAL",
  "UNITY",
  "UNDER",
  "VOLVO",
  "VOCAL",
  "VOWEL",
  "VAPOR",
  "VISTA",
  "WATER",
  "WHALE",
  "WAVES",
  "WOMAN",
  "WOVEN",
  "XYLOP",
  "XENON",
  "XERIC",
  "XENIA",
  "YACHT",
  "YIELD",
  "YOUTH",
  "YUMMY",
  "YOGIC",
  "ZEBRA",
  "ZONAL",
  "ZILCH",

  "ZESTY",
];

const randomElement = dataset[Math.floor(Math.random() * dataset.length)];
console.log(randomElement);

const solution = randomElement;

const totalTries = 6;
let currentTry = 1;

const totalDappa = 5;
let currentDappa = 1;

function reset() {
  location.reload();
}
document.addEventListener("keydown", typingListener);

function typingListener(event) {
  if (currentTry > 6) {
    return;
  }
  if (currentTry == 6 && currentDappa == 5) {
    document.getElementById("playAgain").style.color = "#F8333C";
    document.getElementById("playAgain").style.display = "flex";
    const ansElem = document.getElementById("answer");
    ansElem.style.display = "flex";
    ansElem.textContent = "The answer is " + solution;
  }
  var charCode = event.keyCode;
  if (charCode == 8 && currentDappa > 1) {
    let temp = document
      .querySelector(`#row${currentTry}`)
      .querySelectorAll(".dappa");
    var curr = temp[currentDappa - 2];
    console.log(curr);
    curr.textContent = "";
    currentDappa--;
  }
  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
    var character = String.fromCharCode(charCode);
    let temp = document
      .querySelector(`#row${currentTry}`)
      .querySelectorAll(".dappa");
    var curr = temp[currentDappa - 1];
    curr.textContent = character;

    currentDappa++;
    if (currentDappa > 5) {
      checkSolution(currentTry);
      currentTry++;
      currentDappa = 1;
    }
  } else return false;
}
function checkSolution(currentTry) {
  var sol = solution.split("");
  let userIP = document
    .querySelector(`#row${currentTry}`)
    .textContent.trim()
    .split("\n");
  userIP = userIP.map((x) => x.trim());
  if (JSON.stringify(userIP) == JSON.stringify(sol)) {
    document.removeEventListener("keydown", typingListener);
    document.getElementById("playAgain").style.color = "#44AF69";
    document.getElementById("playAgain").style.display = "flex";
  }

  // for (i = 0; i < 5; i++) {
  //   let elem = document
  //     .querySelector(`#row${currentTry}`)
  //     .getElementsByClassName("dappa")[i];

  //   if (userIP[i] === sol[i]) {
  //     elem.style.backgroundColor = "#44AF69";
  //     sol.splice(i, 1, "0");
  //     console.log("correct alpha and pos" + userIP[i]);
  //   }
  // }
  let correctLetters = [];
  let wrongPositions = [];
  for (c = 0; c < 5; c++) {
    if (userIP[c] === sol[c]) {
      correctLetters.push(userIP[c]);
    } else if (sol.includes(userIP[c])) {
      wrongPositions.push(userIP[c]);
    }
  }
  for (i = 0; i < 5; i++) {
    let elem = document
      .querySelector(`#row${currentTry}`)
      .getElementsByClassName("dappa")[i];
    const index = sol.indexOf(userIP[i]);
    if (userIP[i] === sol[i]) {
      console.log("correct alpha and pos" + userIP[i]);
      elem.style.backgroundColor = "#44AF69";
    } else if (
      solution.includes(userIP[i]) &&
      !correctLetters.includes(userIP[i]) &&
      wrongPositions.includes(userIP[i])
    ) {
      elem.style.backgroundColor = "#FCAB10";
      console.log(
        "correct letter but wrong pos" + userIP[i] + " indexed at" + index
      );
    } else {
      elem.style.backgroundColor = "#F8333C";
      console.log("wrong" + userIP[i]);
    }
  }
}

//color ref
//elem.style.backgroundColor = "#44AF69"; -- correct
//elem.style.backgroundColor = "#FCAB10"; -- wrong pos
//elem.style.backgroundColor = "#F8333C"; -- complete wrong
