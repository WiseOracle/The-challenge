
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];

function initStars() {
  stars = [];
  for (let i = 0; i < 400; i++) {
    stars.push({
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * canvas.width
    });
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
  console.log("Canvas resized:", canvas.width, canvas.height);
}

function draw() {
  console.log("Drawing frame... Canvas:", canvas.width, canvas.height);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red'; // red box in center
  ctx.fillRect(canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50);

  for (let star of stars) {
    star.z -= 2;
    if (star.z <= 0) {
      star.z = canvas.width;
    }

    const k = 128.0 / star.z;
    const px = star.x * k + canvas.width / 2;
    const py = star.y * k + canvas.height / 2;

    if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
      const size = (1 - star.z / canvas.width) * 2.5;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = '#FF00FF';
      ctx.fill();
    }
  }

  setTimeout(() => requestAnimationFrame(draw), 16);
}

window.addEventListener('load', () => {
  resizeCanvas();
  draw();
  console.log("Starfield running.");
});
window.addEventListener('resize', resizeCanvas);
