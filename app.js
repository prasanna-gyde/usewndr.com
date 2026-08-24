const trails = [
  {
    category: "Everyday",
    title: "Mirrors reverse depth",
    hook: "A mirror sends every point straight back toward you. It has no idea which side is left.",
    reveal: "A mirror reverses the axis pointing into its surface. The left side remains left, but front becomes back.",
    paths: [
      { label: "Why writing looks reversed", next: 1 },
      { label: "Why waitlists can mislead", next: 2 },
      { label: "How purple became expensive", next: 6 }
    ]
  },
  {
    category: "Everyday",
    title: "Mirror writing keeps its shape",
    hook: "Letters look backward in a mirror because the page faces away from you while its reflection faces back.",
    reveal: "The mirror preserves every left and right position. Turning the page toward the mirror is the movement that reverses its front and back.",
    paths: [
      { label: "Return to mirror depth", next: 0 },
      { label: "Why organs keep their own time", next: 4 },
      { label: "How purple became expensive", next: 6 }
    ]
  },
  {
    category: "Startups",
    title: "A waitlist can measure the wrong thing",
    hook: "Joining a waitlist costs almost nothing, so a long list can coexist with weak demand.",
    reveal: "A waitlist records curiosity. A deposit, scheduled onboarding call, or concrete workflow gives a stronger signal because the user must give up something.",
    paths: [
      { label: "Why deposits change the signal", next: 3 },
      { label: "How mirrors reverse depth", next: 0 },
      { label: "Why organs keep their own time", next: 4 }
    ]
  },
  {
    category: "Startups",
    title: "A deposit changes the signal",
    hook: "A person who pays a small refundable deposit has made a different decision from someone who leaves an email address.",
    reveal: "The amount matters less than the commitment. Payment introduces friction and reveals whether the problem feels urgent enough to act on now.",
    paths: [
      { label: "Why signups overstate demand", next: 2 },
      { label: "How scarcity shaped purple", next: 6 },
      { label: "Something completely different", next: 4 }
    ]
  },
  {
    category: "Biology",
    title: "Your organs keep their own time",
    hook: "The liver, lungs, heart, and other tissues run molecular clocks that follow a cycle close to twenty-four hours.",
    reveal: "A master clock in the brain responds strongly to light. Clocks elsewhere in the body also respond to meals, activity, and temperature, so they can drift apart.",
    paths: [
      { label: "Why jet lag takes days", next: 5 },
      { label: "How purple came from snails", next: 6 },
      { label: "Why waitlists can mislead", next: 2 }
    ]
  },
  {
    category: "Biology",
    title: "Jet lag is a clock disagreement",
    hook: "Your brain can notice a new sunrise before the rest of your body has adjusted its schedule.",
    reveal: "Light shifts the brain's clock, while meals and activity help reset clocks in other tissues. Those clocks move at different speeds, producing the temporary mismatch called jet lag.",
    paths: [
      { label: "Return to the body's clocks", next: 4 },
      { label: "How mirrors reverse depth", next: 0 },
      { label: "How purple became expensive", next: 6 }
    ]
  },
  {
    category: "History",
    title: "Purple once began with sea snails",
    hook: "Tyrian purple came from glands inside Mediterranean murex snails, with many animals yielding very little dye.",
    reveal: "The extraction was laborious and famously smelly. The resulting color was vivid, durable, and scarce, which helped make purple a marker of wealth and authority.",
    paths: [
      { label: "Why rulers restricted the color", next: 7 },
      { label: "Why waitlists can mislead", next: 2 },
      { label: "Why organs keep their own time", next: 4 }
    ]
  },
  {
    category: "History",
    title: "Rulers turned purple into a privilege",
    hook: "In Rome and Byzantium, clothing rules and court customs reserved some purple garments for the highest ranks.",
    reveal: "Controlling who could wear a scarce color made status visible at a glance. The dye carried political meaning because access to it was regulated as well as expensive.",
    paths: [
      { label: "How the dye came from snails", next: 6 },
      { label: "Why deposits reveal intent", next: 3 },
      { label: "Something completely different", next: 0 }
    ]
  }
];

const featuredTrailIndices = [0, 2, 4, 6];

const category = document.querySelector("#demo-category");
const title = document.querySelector("#demo-title");
const hook = document.querySelector("#demo-hook");
const revealCopy = document.querySelector("#demo-reveal-copy");
const paths = document.querySelector("#demo-paths");
const demo = document.querySelector("#demo");
const demoCard = demo.querySelector(".wander-card");
const demoTrigger = document.querySelector("#demo-trigger");
const demoNext = document.querySelector("#demo-next");
const demoProgress = document.querySelector("#demo-progress");
const demoNextCategory = document.querySelector("#demo-next-category");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let trailIndex = 0;
let featuredPosition = 0;

function updateDemoSwitcher() {
  const currentCategory = trails[trailIndex].category;
  const categoryPosition = featuredTrailIndices.findIndex(
    (index) => trails[index].category === currentCategory
  );

  if (categoryPosition >= 0) {
    featuredPosition = categoryPosition;
  }

  const nextPosition = (featuredPosition + 1) % featuredTrailIndices.length;
  demoProgress.textContent = `${currentCategory} · ${featuredPosition + 1} of ${featuredTrailIndices.length}`;
  demoNextCategory.textContent = trails[featuredTrailIndices[nextPosition]].category;
  demoNext.setAttribute(
    "aria-label",
    `Try another trail: ${trails[featuredTrailIndices[nextPosition]].category}`
  );
}

function renderTrail(animate = false) {
  const trail = trails[trailIndex];
  category.textContent = trail.category;
  title.textContent = trail.title;
  hook.textContent = trail.hook;
  revealCopy.textContent = trail.reveal;
  paths.replaceChildren();

  trail.paths.forEach((path) => {
    const button = document.createElement("button");
    const arrow = document.createElement("span");
    const label = document.createElement("span");

    button.className = "trail-path";
    button.type = "button";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    label.textContent = path.label;
    button.append(arrow, label);
    button.addEventListener("click", () => {
      trailIndex = path.next;
      renderTrail(true);
    });
    paths.append(button);
  });

  if (animate) {
    demoCard.classList.remove("is-starting");
    requestAnimationFrame(() => demoCard.classList.add("is-starting"));
  }

  updateDemoSwitcher();
}

renderTrail();

demoCard.addEventListener("animationend", () => {
  demoCard.classList.remove("is-starting");
});

function showNextFeaturedTrail() {
  featuredPosition = (featuredPosition + 1) % featuredTrailIndices.length;
  trailIndex = featuredTrailIndices[featuredPosition];
  renderTrail(true);
}

demoNext.addEventListener("click", showNextFeaturedTrail);

demoTrigger.addEventListener("click", (event) => {
  event.preventDefault();
  showNextFeaturedTrail();
  demo.scrollIntoView({
    behavior: reduceMotion.matches ? "auto" : "smooth",
    block: "center"
  });

  window.setTimeout(() => {
    paths.querySelector("button")?.focus({ preventScroll: true });
  }, reduceMotion.matches ? 0 : 450);
});
