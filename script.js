const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const prizes = [
  "10 Points",
  "20 Points",
  "50 Points",
  "100 Points",
  "Try Again",
  "Gift",
  "Bonus",
  "Jackpot"
];

const colors = [
  "#e53935",
  "#1e88e5",
  "#43a047",
  "#fb8c00",
  "#8e24aa",
  "#00897b",
  "#fdd835",
  "#6d4c41"
];

const total = prizes.length;
const arc = (2 * Math.PI) / total;

let rotation = 0;
let spinning = false;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < total; i++) {
    const angle = i * arc;

    ctx.beginPath();
    ctx.moveTo(350, 350);
    ctx.arc(350, 350, 340, angle, angle + arc);
    ctx.closePath();

    ctx.fillStyle = colors[i];
    ctx.fill();

    ctx.save();
    ctx.translate(350, 350);
    ctx.rotate(angle + arc / 2);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px Arial";
    ctx.textAlign = "right";
    ctx.fillText(prizes[i], 300, 8);

    ctx.restore();
  }
}

drawWheel();

spinBtn.addEventListener("click", () => {
  if (spinning) return;

  spinning = true;
  spinBtn.disabled = true;
  result.textContent = "Spinning...";

  const extra = Math.floor(Math.random() * 360);
  rotation += 3600 + extra;

  canvas.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    const finalAngle = rotation % 360;
    const index =
      Math.floor(((360 - finalAngle + 90) % 360) / (360 / total)) % total;

    result.textContent = "🎉 Result: " + prizes[index];

    spinning = false;
    spinBtn.disabled = false;
  }, 5000);
});
