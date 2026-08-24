const questions = [
  {
    category: "Everyday",
    title: "Mirrors reverse depth",
    hook: "A mirror sends every point straight back toward you. It has no idea which side is left.",
    question: "What direction does a mirror actually reverse?",
    choices: ["Front and back", "Left and right", "Up and down"],
    reveal: "A mirror reverses the front-back axis perpendicular to its surface. Left-right reversal appears because you imagine turning around to face your reflection, and that imagined rotation swaps your sides. The mirror itself performs no horizontal flip."
  },
  {
    category: "Physics",
    title: "Water dancing on a hot pan",
    hook: "A drop can survive longer on the hottest skillet than on one that is merely warm.",
    question: "What keeps the droplet away from the metal?",
    choices: ["A cushion of vapor", "Repelled electric charge", "A film of oil"],
    reveal: "The droplet's underside flashes into vapor before the liquid can wet the pan. That vapor layer supports and insulates the drop, slowing further heat transfer. With little contact or friction, the drop glides across the surface on its own vapor."
  },
  {
    category: "Psychology",
    title: "A random number changes your guess",
    hook: "People shown a high random number give higher estimates for an unrelated question minutes later.",
    question: "Why does an irrelevant number pull the answer toward it?",
    choices: ["Insufficient adjustment", "A desire to agree", "Stronger visual memory"],
    reveal: "People tend to adjust away from the first number they encounter, even when they know it is irrelevant. The adjustment is usually too small, leaving the estimate biased toward its starting point. Psychologists call this the anchoring effect."
  },
  {
    category: "Space",
    title: "Io never stops erupting",
    hook: "Jupiter's small moon Io has more active volcanoes than any other known world.",
    question: "What keeps its interior hot enough to melt rock?",
    choices: ["Tidal flexing", "Sunlight from Jupiter", "A radioactive ocean"],
    reveal: "Jupiter and neighboring moons pull Io through a slightly elliptical orbit. Their changing gravity repeatedly stretches and compresses its interior. Friction from that flexing produces enough heat to melt rock and feed hundreds of volcanoes."
  }
];

const category = document.querySelector("#demo-category");
const title = document.querySelector("#demo-title");
const hook = document.querySelector("#demo-hook");
const question = document.querySelector("#demo-question");
const choices = document.querySelector("#demo-choices");
const reveal = document.querySelector("#demo-reveal");
const recap = document.querySelector("#choice-recap");
const revealCopy = document.querySelector("#reveal-copy");
const next = document.querySelector("#next-question");

let questionIndex = 0;

function renderQuestion() {
  const item = questions[questionIndex];
  category.textContent = item.category;
  title.textContent = item.title;
  hook.textContent = item.hook;
  question.textContent = item.question;
  choices.replaceChildren();
  reveal.hidden = true;
  question.hidden = false;
  choices.hidden = false;

  item.choices.forEach((label, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.innerHTML = `<span>${label}</span><span>${index + 1}</span>`;
    button.addEventListener("click", () => showReveal(label));
    choices.append(button);
  });
}

function showReveal(label) {
  const item = questions[questionIndex];
  recap.textContent = `You chose “${label}”.`;
  revealCopy.textContent = item.reveal;
  question.hidden = true;
  choices.hidden = true;
  reveal.hidden = false;
  next.focus({ preventScroll: true });
}

next.addEventListener("click", () => {
  questionIndex = (questionIndex + 1) % questions.length;
  renderQuestion();
  title.focus?.({ preventScroll: true });
});

document.addEventListener("keydown", (event) => {
  if (event.key >= "1" && event.key <= "3" && !choices.hidden) {
    const button = choices.children[Number(event.key) - 1];
    button?.click();
  }
});

renderQuestion();
