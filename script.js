const wheel = document.querySelector(".wheel");
const spinBtn = document.querySelector(".spin-btn");

let value = Math.ceil(Math.random() * 3600);

spinBtn.onclick = function () {
  wheel.style.transform = "rotate(" + value + "deg)";
  value += Math.ceil(Math.random() * 3600);
};
