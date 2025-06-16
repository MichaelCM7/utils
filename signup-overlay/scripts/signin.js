  let overlayed = 0;

document.querySelector(".signup-btn").addEventListener("click",() => {
  if(overlayed === 0) {
    document.querySelector(".overlay").classList.add("overlay-hidden");
    overlayed = 1;
  } 
});

document.querySelector(".overlay").addEventListener("click",(e) => {
  if(e.target.classList.contains("overlay")) {
    document.querySelector(".overlay").classList.remove("overlay-hidden");
    overlayed = 0;
  }
});

document.querySelector("html").addEventListener("keyup",(e) => {
  if(e.key === "Escape") {
    document.querySelector(".overlay").classList.remove("overlay-hidden");
    overlayed = 0;
  }
});