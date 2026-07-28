const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const prizes = [
  { label: "100 💎", price: "75 GDS" },
  { label: "310 💎", price: "300 GDS" },
  { label: "520 💎", price: "650 GDS" },
  { label: "Lose", price: "" },
  { label: "Try Again", price: "" },
  { label: "Apple Card $5", price: "700 GDS" },
  { label: "Lose", price: "" },
  { label: "1060 💎", price: "1300 GDS" }
];

const colors = [
  "#c00000",
  "#990000",
  "#c00000",
  "#990000",
  "#c00000",
  "#990000",
  "#c00000",
  "#990000"
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

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.save();

    ctx.translate(350, 350);
    ctx.rotate(angle + arc / 2);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px Arial";
    ctx.textAlign = "right";

    ctx.fillText(prizes[i].label, 300, 8);

    ctx.restore();
  }
}

drawWheel();

spinBtn.addEventListener("click", () => {
  if (spinning) return;

  spinning = true;
  spinBtn.disabled = true;
  result.textContent = "Spinning...";

  // Chwazi gayan an avan
  const winner = Math.floor(Math.random() * total);

  // Chak seksyon = 45°
  const slice = 360 / total;

  // Flèch la anlè (270°)
  const stopAngle = 360 - (winner * slice + slice / 2);

  // Fè anpil tou avan li kanpe
  rotation += 360 * 10 + stopAngle;

  canvas.style.transition = "transform 5s ease-out";
  canvas.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {

    const prize = prizes[winner];

    if (prize.price !== "") {
      result.innerHTML =
        `🎉 <b>${prize.label}</b><br>💰 Prix : <b>${prize.price}</b>`;
    } else {
      result.innerHTML =
        `🎉 <b>${prize.label}</b>`;
    }

    spinning = false;
    spinBtn.disabled = false;

  }, 5000);
});
