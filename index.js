let isModalOpen = false;
let contrastToggle = false;
let flapStopTimer;
const scaleFactor = 1 / 20;
const gallery = document.querySelector("#gallery");

// CONTACT MODAL
document.addEventListener("DOMContentLoaded", () => {
  contrastToggle = document.body.classList.contains("dark-theme");
  isModalOpen = document.body.classList.contains("modal--open");

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      if (isModalOpen) toggleModal();
    }
  });

  document.addEventListener("mousedown", (e) => {
    if (!isModalOpen) return;

    const modal = document.querySelector(".modal");
    if (!modal) return;

    if (modal.contains(e.target)) return;

    const closeBtn = e.target.closest(".modal__exit");
    if (closeBtn) return;

    toggleModal();
  });
});

// EMAIL
function contact(event) {
  event.preventDefault();

  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");

  loading.classList.add("modal__overlay--visible");

  emailjs
    .sendForm(
      "service_beri1n4",
      "template_jdw0n4x",
      event.target,
      "6zqW3py9NiJOQwCN6",
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList.add("modal__overlay--visible");
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable, please contact me at chris@mattoxsfg.com",
      );
    });
}

function toggleModal() {
  closeMenu();
  isModalOpen = !isModalOpen;
  document.body.classList.toggle("modal--open", isModalOpen);
}

// DARK THEME
function toggleContrast() {
  contrastToggle = !contrastToggle;
  document.body.classList.toggle("dark-theme", contrastToggle);
}

// BUTTERFLY
const butterflyTile = document.querySelector("#gallery");
const butterfly = document.querySelector(".butterfly");

document.addEventListener("DOMContentLoaded", () => {
  if (butterfly) {
    butterfly.style.transform = "translate(-50%, -50%)";
  }
});

// BUTTERFLY
function moveButterfly(event) {
  const butterfly = document.querySelector(".butterfly");
  const tile = document.querySelector(".gallery__item--butterfly");
  if (!butterfly || !tile) return;

  const rect = tile.getBoundingClientRect();

  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const dx = event.clientX - cx;
  const dy = event.clientY - cy;

  const strength = 0.15;
  let x = dx * strength;
  let y = dy * strength;

  const bW = butterfly.offsetWidth;
  const bH = butterfly.offsetHeight;

  let maxX = rect.width / 2 - bW / 2;
  let maxY = rect.height / 2 - bH / 2;

  if (maxX < 0) maxX = 0;
  if (maxY < 0) maxY = 0;

  if (x > maxX) x = maxX;
  if (x < -maxX) x = -maxX;

  if (y > maxY) y = maxY;
  if (y < -maxY) y = -maxY;

  butterfly.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

  butterfly.classList.add("flap");

  clearTimeout(flapStopTimer);

  flapStopTimer = setTimeout(() => {
    butterfly.classList.remove("flap");
  }, 120);
}

function handleMove(event) {
  const point = event.touches ? event.touches[0] : event;
  moveButterfly(point);
}

if (butterflyTile) {
  butterflyTile.addEventListener("pointermove", handleMove, { passive: true });
  butterflyTile.addEventListener("touchmove", handleMove, { passive: true });
}

// HAMBURGER MENU
function openMenu() {
  if (isModalOpen) toggleModal();
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

// WATCH
const minuteHandle = document.querySelector(".handle__minute");
const secondHandle = document.querySelector(".handle__second");
const hourHandle = document.querySelector(".handle__hour");

setHandles();
setInterval(setHandles, 1000);

function setHandles() {
  const date = new Date();
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const extraHoursAngle = minutes * 0.5;
  const hoursAngle = hours * 30 + extraHoursAngle;
  const extraMinutesAngle = seconds * 0.1;
  const minutesAngle = minutes * 6 + extraMinutesAngle;
  const secondsAngle = seconds * 6;

  minuteHandle.style.transform = `translateX(-50%) rotate(${minutesAngle}deg)`;
  secondHandle.style.transform = `translateX(-50%) rotate(${secondsAngle}deg)`;
  hourHandle.style.transform = `translateX(-50%) rotate(${hoursAngle}deg)`;
}

// STARS
const auroraTileElement = document.querySelector(".gallery__item--aurora");

const starsCanvasElement = auroraTileElement.querySelector(".stars");

const drawingContext = starsCanvasElement.getContext("2d");

let canvasWidth = 0;
let canvasHeight = 0;

let devicePixelRatio = 1;

let starsArray = [];

function resizeCanvasToTile() {
  const tileRectangle = auroraTileElement.getBoundingClientRect();

  devicePixelRatio = window.devicePixelRatio || 1;

  canvasWidth = tileRectangle.width;
  canvasHeight = tileRectangle.height;

  starsCanvasElement.width = Math.floor(canvasWidth * devicePixelRatio);
  starsCanvasElement.height = Math.floor(canvasHeight * devicePixelRatio);

  starsCanvasElement.style.width = canvasWidth + "px";
  starsCanvasElement.style.height = canvasHeight + "px";

  drawingContext.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function createStar() {
  const baseOpacity = Math.random() * 0.6 + 0.2;
  return {
    xPosition: Math.random() * canvasWidth,
    yPosition: Math.random() * canvasHeight,
    radiusSize: Math.random() * 2 + 0.5,
    baseOpacityAlpha: baseOpacity,
    twinkleAmplitude: Math.random() * 0.35 + 0.05,
    twinkleSpeed: Math.random() * 0.03 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2,
    opacityAlpha: baseOpacity,
  };
}

function initializeStars(numberOfStars) {
  starsArray = [];

  for (let i = 0; i < numberOfStars; i++) {
    starsArray.push(createStar());
  }
}

let animationTime = 0;

function updateStarsPositions() {
  animationTime += 1;

  for (let i = 0; i < starsArray.length; i++) {
    const currentStar = starsArray[i];

    const twinkleValue = Math.sin(
      animationTime * currentStar.twinkleSpeed + currentStar.twinkleOffset,
    );

    currentStar.opacityAlpha =
      currentStar.baseOpacityAlpha +
      twinkleValue * currentStar.twinkleAmplitude;

    if (currentStar.opacityAlpha < 0) currentStar.opacityAlpha = 0;
    if (currentStar.opacityAlpha > 1) currentStar.opacityAlpha = 1;
  }
}

function drawStarsOnCanvas() {
  drawingContext.clearRect(0, 0, canvasWidth, canvasHeight);

  drawingContext.fillStyle = "#ffffff";

  for (let i = 0; i < starsArray.length; i++) {
    const currentStar = starsArray[i];

    drawingContext.globalAlpha = currentStar.opacityAlpha;

    drawingContext.beginPath();
    drawingContext.arc(
      currentStar.xPosition,
      currentStar.yPosition,
      currentStar.radiusSize,
      0,
      Math.PI * 2,
    );
    drawingContext.fill();
  }

  drawingContext.globalAlpha = 1;
}

function animationLoop() {
  updateStarsPositions();
  drawStarsOnCanvas();

  requestAnimationFrame(animationLoop);
}

resizeCanvasToTile();

initializeStars(250);

animationLoop();

window.addEventListener("resize", function () {
  resizeCanvasToTile();
  initializeStars(250);
});
