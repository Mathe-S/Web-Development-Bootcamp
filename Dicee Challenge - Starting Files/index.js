let randomnumber1 = Math.floor(Math.random() * 6)+1; 
console.log("dice"+randomnumber1+".png");
document.getElementsByClassName("img1")[0].setAttribute("src", "dice"+randomnumber1+".png");

let randomnumber2 = Math.floor(Math.random() * 6)+1; 
console.log("dice"+randomnumber2+".png");
document.getElementsByClassName("img2")[0].setAttribute("src", "dice"+randomnumber2+".png");

if(randomnumber1>randomnumber2) document.querySelector("h1").innerHTML="🚩 Player 1 Wins";
else if(randomnumber1<randomnumber2) document.querySelector("h1").innerHTML="Player 2 Wins 🚩";
else document.querySelector("h1").innerHTML="Draw";