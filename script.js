const surpriseButton = document.querySelector("#surprise-button");
const musicButton = document.querySelector("#music-button");
const musicLabel = musicButton.querySelector(".music-label");
const backgroundMusic = document.querySelector("#background-music");
const wishText = document.querySelector("#wish-text");
const toast = document.querySelector("#toast");
const confettiLayer = document.querySelector("#confetti-layer");

const wishes = [
  "Semoga makin bahagia, makin sukses, dan tidak ceroboh lagi!",
  "Semoga semua wishlist terkabul!",
  "Panjang umur, sehat selalu, dan semoga jangan cepat mati! 🎂",
  "Semoga tahun ini penuh rezeki, tawa, dan jangan makin ngeselin!",
];

let wishIndex = 0;
let toastTimeout;

musicButton.addEventListener("click", toggleMusic);

backgroundMusic.addEventListener("play", () => {
  backgroundMusic.volume = 0.35;
  musicButton.classList.add("is-playing");
  musicButton.setAttribute("aria-pressed", "true");
  musicLabel.textContent = "Matikan musik";
  musicButton.querySelector("span[aria-hidden='true']").textContent = "Ⅱ";
});

backgroundMusic.addEventListener("pause", () => {
  musicButton.classList.remove("is-playing");
  musicButton.setAttribute("aria-pressed", "false");
  musicLabel.textContent = "Putar musik";
  musicButton.querySelector("span[aria-hidden='true']").textContent = "▶";
});

backgroundMusic.addEventListener("error", () => {
  showToast("Musik tidak dapat dimuat. Pastikan file MP3 tersedia.");
});

surpriseButton.addEventListener("click", () => {
  wishIndex = (wishIndex + 1) % wishes.length;
  wishText.textContent = wishes[wishIndex];
  launchConfetti();
  showToast("Kejutan: kamu resmi makin tua, tapi tetap gemas! 🎉");
});

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch(() => {
      showToast("Klik tombol lagi agar musik dapat diputar.");
    });
  } else {
    backgroundMusic.pause();
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

function launchConfetti() {
  const colors = ["#f078a7", "#f4b74f", "#9bd7bd", "#ad9af2", "#ff8b73"];

  for (let index = 0; index < 70; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[index % colors.length];
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    piece.style.animationDelay = `${Math.random() * 500}ms`;
    confettiLayer.append(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}
