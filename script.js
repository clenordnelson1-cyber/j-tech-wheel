const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const buttons = document.querySelectorAll(".price-btn");

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
let selectedPrize = null;

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    selectedPrize = btn.dataset.prize;

    result.innerHTML = "✅ Ou chwazi : <b>" + selectedPrize + "</b>";

  });
});

function drawWheel() {

  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let i=0;i<total;i++){

    const angle=i*arc;

    ctx.beginPath();
    ctx.moveTo(350,350);
    ctx.arc(350,350,340,angle,angle+arc);
    ctx.closePath();

    ctx.fillStyle=colors[i];
    ctx.fill();

    ctx.strokeStyle="#ffffff";
    ctx.lineWidth=4;
    ctx.stroke();

    ctx.save();

    ctx.translate(350,350);

    ctx.rotate(angle+arc/2);

    ctx.fillStyle="#fff";
    ctx.font="bold 22px Arial";
    ctx.textAlign="right";

    ctx.fillText(prizes[i].label,300,8);

    ctx.restore();

  }

}

drawWheel();

spinBtn.addEventListener("click", () => {

  if (spinning) return;

  if (!selectedPrize) {
    alert("Tanpri chwazi yon pri avan ou peze SPIN.");
    return;
  }

  spinning = true;
  spinBtn.disabled = true;
  result.innerHTML = "🎡 Woulet la ap vire...";

  const winner = Math.floor(Math.random() * prizes.length);

  const slice = 360 / prizes.length;

  // Sant seksyon gayan an anba flèch la
  const target = winner * slice + slice / 2;

  // Flèch la anlè (270°)
  const stopAngle = 270 - target;

  rotation += 3600 + stopAngle;

  canvas.style.transition = "transform 5s ease-out";
  canvas.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {

    const landed = prizes[winner].label;

    const win = selectedPrize === landed;

    if (win) {

      result.innerHTML = `
      <h2 style="color:#00ff00;">🎉 OU GENYEN!</h2>
      <h3>${landed}</h3>
      <p>Felisitasyon!</p>
      `;

    } else {

      result.innerHTML = `
      <h2 style="color:#ff0000;">❌ OU PÈDI</h2>
      <h3>Woulet la tonbe sou : ${landed}</h3>
      `;

    }

    spinning = false;
    spinBtn.disabled = false;

  }, 5000);

});
