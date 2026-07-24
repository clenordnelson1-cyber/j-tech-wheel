const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");

let value = Math.ceil(Math.random() * 3600);

spinBtn.onclick = function () {
  wheel.style.transform = "rotate(" + value + "deg)";
  wheel.style.transition = "transform 4s ease-out";
  value += Math.ceil(Math.random() * 3600);
};
