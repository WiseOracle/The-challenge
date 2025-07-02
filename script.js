document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const mainScreen = document.getElementById('mainScreen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
  }, 3000);
});