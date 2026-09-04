const loader = document.getElementById("loader");
const ageCounter = document.getElementById("ageCounter");
const progressFill = document.getElementById("progressFill");
const loaderNote = document.getElementById("loaderNote");
const soundtrack = document.querySelector(".soundtrack");
const revealButton = document.getElementById("revealButton");
const giftSequence = document.getElementById("giftSequence");
const ticketStage = document.getElementById("ticketStage");
const boardingPass = document.getElementById("boardingPass");
const journeyStage = document.getElementById("journeyStage");
const pandaPop = document.getElementById("pandaPop");

const notes = [
  { at: 7, text: "Powering up the love meter..." },
  { at: 14, text: "Saving your birthday message..." },
  { at: 21, text: "Preparing your gift..." },
  { at: 28, text: "Ready to reveal." }
];

let currentAge = 0;
let noteIndex = 0;
let soundtrackRetried = false;
let revealStarted = false;

const trySoundtrack = () => {
  if (!soundtrack || soundtrackRetried) {
    return;
  }

  soundtrackRetried = true;
  const src = soundtrack.getAttribute("src");
  soundtrack.setAttribute("src", src);
};

document.body.style.overflowY = "hidden";

const loaderInterval = window.setInterval(() => {
  currentAge += 1;
  ageCounter.textContent = String(currentAge);
  progressFill.style.width = `${(currentAge / 28) * 100}%`;

  if (noteIndex < notes.length && currentAge >= notes[noteIndex].at) {
    loaderNote.textContent = notes[noteIndex].text;
    noteIndex += 1;
  }

  if (currentAge >= 28) {
    window.clearInterval(loaderInterval);
    window.setTimeout(() => {
      loader.classList.add("is-hidden");
      document.body.style.overflowY = "auto";
    }, 750);
  }
}, 130);

const startGiftReveal = () => {
  if (revealStarted) {
    return;
  }

  revealStarted = true;
  trySoundtrack();

  giftSequence.classList.add("is-active");
  ticketStage.classList.add("is-visible");
  ticketStage.scrollIntoView({ behavior: "smooth", block: "start" });

  window.setTimeout(() => {
    boardingPass.classList.add("is-fading");
  }, 2400);

  window.setTimeout(() => {
    ticketStage.classList.remove("is-visible");
    journeyStage.classList.add("is-visible", "is-playing");
    pandaPop.classList.add("is-entering");
    journeyStage.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 3000);
};

revealButton.addEventListener("click", startGiftReveal);
window.addEventListener("pointerdown", trySoundtrack, { once: true });
window.addEventListener("keydown", trySoundtrack, { once: true });
