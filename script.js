const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");

const segments = 12;
const radius = canvas.width / 2;
let rotation = 0;
let spinning = false;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(radius, radius);
  ctx.rotate(rotation);

  for (let i = 0; i < segments; i++) {
    const angle = (2 * Math.PI) / segments;

    // Kaz wouj
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius - 5, i * angle, (i + 1) * angle);
    ctx.closePath();
    ctx.fillStyle = "#c00000";
    ctx.fill();

    // Liy blan ki separe kaz yo
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  ctx.restore();
}

drawWheel();

spinBtn.addEventListener("click", () => {
  if (spinning) return;

  spinning = true;

  const extraRotation =
    Math.PI * 12 + Math.random() * Math.PI * 6;

  const start = rotation;
  const end = rotation + extraRotation;
  const duration = 5000;
  const startTime = performance.now();

  function animate(time) {
    const progress = Math.min((time - startTime) / duration, 1);

    const ease =
      1 - Math.pow(1 - progress, 4);

    rotation = start + (end - start) * ease;

    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
    }
  }

  requestAnimationFrame(animate);
});
