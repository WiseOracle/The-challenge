document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  const mainScreen = document.getElementById("mainScreen");

  setTimeout(() => {
    loadingScreen.style.display = "none";
    mainScreen.classList.remove("hidden");
  }, 2000);

  let countdown = 59;
  const countdownElement = document.getElementById("countdown");
  setInterval(() => {
    countdown--;
    if (countdown < 0) countdown = 59;
    countdownElement.textContent = `00:${countdown < 10 ? '0' : ''}${countdown}`;
  }, 1000);
});