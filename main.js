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

const solution = randomElement;
console.log(solution)
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
    document.getElementById("showK").style.display = "none"
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
    document.getElementById("box").style.display = "none"
    document.getElementById("del").style.display = "none"
    document.getElementById("showK").style.display = "none"
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

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
      elem.style.backgroundColor = "#44AF69";
    } else if (
      solution.includes(userIP[i]) &&
      !correctLetters.includes(userIP[i]) &&
      wrongPositions.includes(userIP[i])
    ) {
      elem.style.backgroundColor = "#FCAB10";
    } else {
      elem.style.backgroundColor = "#F8333C";
    }
  }
}

function showKeyboard() {
  document.getElementById("showK").style.display = "none";
  document.getElementById("del").style.display = "block";
  del.addEventListener("click", () => {});
  var html = "";
  for (var i = 65; 90 >= i; i++) {
    // A-65, Z-90
    c = String.fromCharCode(i);
    html += `<button class="keypad">${c}</button>`;
  }
  window.onload = document.getElementById("box").innerHTML = html;
  var keys = document.querySelectorAll(".keypad");

  keys.forEach(function (key) {
    key.addEventListener("click", function () {
      var letter = this.textContent;
      var currentRow = document.querySelector(`#row${currentTry}`);
      var dappaBoxes = currentRow.querySelectorAll(".dappa");

      for (var i = 0; i < dappaBoxes.length; i++) {
        if (dappaBoxes[i].textContent === "") {
          dappaBoxes[i].textContent = letter;
          currentDappa++;
          if (currentDappa > 5) {
            checkSolution(currentTry);
            currentTry++;
            currentDappa = 1;
          }

          if (currentTry === 7 && currentDappa === 1) {
            document.getElementById("playAgain").style.color = "#F8333C";
            document.getElementById("playAgain").style.display = "flex";
           
            const ansElem = document.getElementById("answer");
            ansElem.style.display = "flex";
            ansElem.textContent = "The answer is " + solution;
            console.log("hi")
            document.getElementById("del").style.display = "none"
            document.getElementById("box").style.display = "none"
          }
        
          break;
        }
      }
    });
  });
}

const del = document.getElementById("del");
del.addEventListener("click", () => {
  let temp = document
    .querySelector(`#row${currentTry}`)
    .querySelectorAll(".dappa");
  var curr = temp[currentDappa - 2];
  if(curr){
    curr.textContent = "";
    currentDappa--;
  }else{
    alert("Please type something and then delete")
  }
});

function closePopup() {
  document.querySelector(".popup").style.display = "none";
}

window.addEventListener("load", function() {
  document.querySelector(".popup").style.display = "block";
});

//color ref
//"#44AF69"; -- correct
//"#FCAB10"; -- wrong pos
//"#F8333C"; -- complete wrong
