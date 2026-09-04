const loader = document.getElementById("loader");
const ageCounter = document.getElementById("ageCounter");
const progressFill = document.getElementById("progressFill");
const loaderNote = document.getElementById("loaderNote");
const revealItems = document.querySelectorAll(".reveal");
const soundtrack = document.querySelector(".soundtrack");

const notes = [
  { at: 7, text: "Powering up the love meter..." },
  { at: 14, text: "Unlocking your birthday gift..." },
  { at: 21, text: "Loading Chengdu coordinates..." },
  { at: 28, text: "Mission ready, my love." }
];

let currentAge = 0;
let noteIndex = 0;
let soundtrackRetried = false;

const trySoundtrack = () => {
  if (!soundtrack || soundtrackRetried) {
    return;
  }

  soundtrackRetried = true;
  const src = soundtrack.getAttribute("src");

  // Retrying on first interaction gives autoplay a better chance on mobile browsers.
  soundtrack.setAttribute("src", src);
};

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

window.addEventListener("pointerdown", trySoundtrack, { once: true });
window.addEventListener("keydown", trySoundtrack, { once: true });
