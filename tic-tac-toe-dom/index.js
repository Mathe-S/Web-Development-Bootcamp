blocks = document.getElementsByClassName("block");
ressetButton = document.querySelector("button");

let sign = "X";

for (let index = 0; index < blocks.length; index++) {
  const element = blocks[index];
  element.addEventListener("click", () => {
    if (element.innerHTML) return;
    element.innerHTML = sign;
    sign === "X" ? (sign = "O") : (sign = "X");
  });
}

ressetButton.addEventListener("click", () => {
  Array.prototype.map.call(blocks, (block) => {
    block.innerHTML = "";
  });
});
