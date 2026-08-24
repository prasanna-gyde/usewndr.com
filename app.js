const trails = [
  {
    category: "Everyday",
    title: "Mirrors reverse depth",
    hook: "A mirror sends every point straight back toward you. It has no idea which side is left.",
    reveal: "A mirror reverses the axis pointing into its surface. The left side remains left, but front becomes back.",
    paths: [
      { label: "Why writing looks reversed", next: 1 },
      { label: "How periscopes bend sight", next: 2 },
      { label: "Something completely different", next: 3 }
    ]
  },
  {
    category: "Language",
    title: "Mirror writing keeps its shape",
    hook: "Letters look backward in a mirror because the page faces away from you while its reflection faces back.",
    reveal: "The mirror preserves every left and right position. Turning the page toward the mirror is the movement that reverses its front and back.",
    paths: [
      { label: "Return to mirror depth", next: 0 },
      { label: "How periscopes bend sight", next: 2 },
      { label: "Something completely different", next: 3 }
    ]
  },
  {
    category: "Physics",
    title: "A periscope turns sight twice",
    hook: "Two angled mirrors can carry a view over a wall without moving the observer.",
    reveal: "The first mirror redirects incoming light down the tube. The second redirects it toward your eyes, preserving a view that began above you.",
    paths: [
      { label: "Return to mirror depth", next: 0 },
      { label: "Why writing looks reversed", next: 1 },
      { label: "Something completely different", next: 3 }
    ]
  },
  {
    category: "Psychology",
    title: "Your brain hides every blink",
    hook: "You lose brief slices of vision whenever you blink, yet the world appears continuous.",
    reveal: "Your visual system reduces sensitivity during a blink and joins the scenes on either side. The missing moment rarely reaches awareness.",
    paths: [
      { label: "Return to mirror depth", next: 0 },
      { label: "Why writing looks reversed", next: 1 },
      { label: "How periscopes bend sight", next: 2 }
    ]
  }
];

const category = document.querySelector("#demo-category");
const title = document.querySelector("#demo-title");
const hook = document.querySelector("#demo-hook");
const revealCopy = document.querySelector("#demo-reveal-copy");
const paths = document.querySelector("#demo-paths");

let trailIndex = 0;

function renderTrail() {
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
      renderTrail();
    });
    paths.append(button);
  });
}

renderTrail();
