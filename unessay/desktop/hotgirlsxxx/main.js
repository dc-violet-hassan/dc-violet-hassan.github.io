const link = document.getElementById("link");

link.style.color = "#ffffff";
let isPink = false

function changeColor(){
    link.style.color = isPink ? "#ffffff" : "#ffc0cb";
    isPink = !isPink;
}

window.setInterval(changeColor, 500);