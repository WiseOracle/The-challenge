
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('mainScreen').style.display = 'flex';
  }, 3500);

  // Infinite looping 60-sec countdown
  function startCountdown() {
    let seconds = 59;
    const display = document.getElementById('countdown');
    setInterval(() => {
      display.textContent = '00:' + (seconds < 10 ? '0' : '') + seconds;
      seconds--;
      if (seconds < 0) seconds = 59;
    }, 1000);
  }

  startCountdown();

  // Handle tab highlight (basic example)
  document.querySelectorAll('.nav-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
});
