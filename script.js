const loader = document.getElementById("loader");
const ageCounter = document.getElementById("ageCounter");
const progressFill = document.getElementById("progressFill");
const loaderNote = document.getElementById("loaderNote");
const revealItems = document.querySelectorAll(".reveal");

const notes = [
  { at: 7, text: "Lighting the candles..." },
  { at: 14, text: "Wrapping the birthday surprise..." },
  { at: 21, text: "Adding Chengdu magic..." },
  { at: 28, text: "Ready, my love." }
];

let currentAge = 0;
let noteIndex = 0;

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
    }, 650);
  }
}, 130);

document.body.style.overflowY = "hidden";

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealItems.forEach((item) => {
  if (item.classList.contains("hero")) {
    item.classList.add("is-visible");
    return;
  }

  revealObserver.observe(item);
});
