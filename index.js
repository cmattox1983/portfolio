let isModalOpen = false;
let contrastToggle = false;
let flapStopTimer;
const scaleFactor = 1 / 20;

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



// HAMBURGER MENU
function openMenu() {
  if (isModalOpen) toggleModal();
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}
