window.history.scrollRestoration = "manual";

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }
});
window.addEventListener("load", () => {
  history.replaceState(null, null, " ");
});
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1}
);

reveals.forEach((section) => observer.observe(section));
const toTopBtn = document.getElementById("toTopBtn");

window.addEventListener("scroll", () => {
  // Check if the user is at the very bottom of the document
  const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;

  if (isAtBottom) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
});

// toTopBtn.addEventListener("click", () => {
//   window.scrollTo({ top: 0, behavior: "auto" });
// });
// const toTopBtn = document.getElementById("toTopBtn");
// window.addEventListener("scroll", () => {
//   if (window.scrollY > 350) {
//     toTopBtn.classList.add("show");
//   } else {
//     toTopBtn.classList.remove("show");
//   }
// });

// toTopBtn.addEventListener("click", () => {
//   window.scrollTo({ top: 0, behavior: "auto" });
// });

window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (!hash) return;

  const targetSection = document.querySelector(hash);
  if (!targetSection) return;

  const nav = document.querySelector(".nav-wrap");
  const navHeight = nav ? nav.offsetHeight : 0;
  const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - 8;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth",
  });
});

// const pageOrder = ["/home", "/about", "/education", "/skills", "/projects", "/contact"];
// let pageSwitchLock = false;
// let wheelDeltaBuffer = 0;
// let wheelBufferResetTimer = null;

// window.addEventListener(
//   "wheel",
//   (event) => {
//     if (pageSwitchLock) return;

//     const activeElement = document.activeElement;
//     const isTypingInField =
//       activeElement &&
//       (activeElement.tagName === "INPUT" ||
//         activeElement.tagName === "TEXTAREA" ||
//         activeElement.isContentEditable);
//     if (isTypingInField) return;

//     const currentPath = window.location.pathname === "/" ? "/home" : window.location.pathname;
//     const currentIndex = pageOrder.indexOf(currentPath);
//     if (currentIndex === -1) return;

//     wheelDeltaBuffer += event.deltaY;
//     if (wheelBufferResetTimer) clearTimeout(wheelBufferResetTimer);
//     wheelBufferResetTimer = setTimeout(() => {
//       wheelDeltaBuffer = 0;
//     }, 120);

//     const triggerThreshold = 75;

//     if (wheelDeltaBuffer > triggerThreshold && currentIndex < pageOrder.length - 1) {
//       pageSwitchLock = true;
//       window.location.href = `${pageOrder[currentIndex + 1]}#${pageOrder[currentIndex + 1].replace("/", "")}`;
//     } else if (wheelDeltaBuffer < -triggerThreshold && currentIndex > 0) {
//       pageSwitchLock = true;
//       window.location.href = `${pageOrder[currentIndex - 1]}#${pageOrder[currentIndex - 1].replace("/", "")}`;
//     }
//   },
//   { passive: true }
// );
(function initPetalRain() {
  const PETAL_COUNT = 80;          // dreamy density — bump to 60 for snowfall feel
  const VARIANTS = ["lilac", "pink", "white", "lilac", "pink"]; // weighted toward lilac/pink

  const container = document.createElement("div");
  container.className = "petal-rain";
  container.setAttribute("aria-hidden", "true");
  document.body.appendChild(container);

  const rand = (min, max) => Math.random() * (max - min) + min;

  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElement("div");
    const inner = document.createElement("div");
    inner.className = "petal-inner";

    // Alternate spawn between left source and right source
    const side = i % 2;                         // 0 = left, 1 = right
    const startVW = side === 0
      ? rand(-5, 30)                            // left band: -5vw → 30vw
      : rand(65, 105);                          // right band: 65vw → 105vw
    const driftVW = rand(8, 28) * (side === 0 ? 1 : -1); // drift inward toward center

    const size = rand(19, 32);                  // px
    const fallDur = rand(14, 20);                // s
    const delay = -rand(0, 25);                 // negative = stagger immediately
    const swayDur = rand(2.5, 6);               // s
    const swayAmp = rand(20, 80);               // px
    const spinDur = rand(4, 10);                // s
    const opacity = rand(0.55, 1);

    petal.className = `petal ${VARIANTS[Math.floor(Math.random() * VARIANTS.length)]}`;
    petal.style.left = `${startVW}vw`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.opacity = opacity;
    petal.style.animationDuration = `${fallDur}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.setProperty("--drift", `${driftVW}vw`);

    inner.style.animationDuration = `${swayDur}s, ${spinDur}s`;
    inner.style.animationDelay = `${delay}s, 0s`;
    inner.style.animationDirection =
      `${Math.random() > 0.5 ? "alternate" : "alternate-reverse"}, ` +
      `${Math.random() > 0.5 ? "normal" : "reverse"}`;
    inner.style.setProperty("--sway", `${swayAmp}px`);

    petal.appendChild(inner);
    container.appendChild(petal);
  }
})();
document.addEventListener("click", (e) => {
  // Skip clicks on links/buttons/inputs to not interfere
  if (e.target.closest("a, button, input, textarea")) return;
  for (let i = 0; i < 10; i++) {
    const p = document.createElement("div");
    p.className = "burst-petal";
    p.style.left = `${e.clientX}px`;
    p.style.top = `${e.clientY}px`;
    const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.4;
    const dist = 60 + Math.random() * 80;
    p.style.setProperty("--bx", `${Math.cos(angle) * dist}px`);
    p.style.setProperty("--by", `${Math.sin(angle) * dist}px`);
    p.style.setProperty("--br", `${Math.random() * 720 - 360}deg`);
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
});
const tiltCards = document.querySelectorAll(
  ".skill-card, .project-card, .edu-item, .about-card"
);
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform =
      `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_2k4p3od",
        "template_w425kon",
        this
    )
    .then(() => {
        alert("Message sent successfully");
        form.reset();
    })
    .catch((error) => {
        alert("Failed to send message");
        console.log(error);
    });
});