const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const prizes = [
  "100 💎",
  "310 💎",
  "520 💎",
  "Lose",
  "Try Again",
  "GiftCard Apple,
  "Lose",
  "1060 💎"
];
cconstt colors = [
  "#c00000",
  "#c00000",
  "#c00000",
  "#c00000",
  "#c00000",
  "#c00000",
  "#c00000",
  "#c00000"
];

const total = prizes.length;
const arc = (2 * Math.PI) / total;

let rotation = 0;
let spinning = false;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.heig

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
    const finalAngle = ((rotation % 360) + 360) % 360;
const slice = 360 / total;

let index = Math.round((360 - finalAngle) / slice) % total;

if (index < 0) {
  index += total;
}

result.textContent = "🎉 Result: " + prizes[index];

    spinning = false;
    spinBtn.disabled = false;
  }, 5000);
});
