let menu = document.getElementById("menu");
let navbar = document.getElementById("nav-menu");

window.addEventListener("resize", function() {
  if (window.innerWidth > 900) {
    navbar.style.visibility = "visible";
  } else {
    navbar.style.visibility = "hidden";
  }
});

menu.addEventListener("click", function() {
  if (menu.classList.contains("showing")) {
    navbar.style.visibility = "hidden";
    menu.classList.add("hidden");
    menu.classList.remove("showing");
  } else if (menu.classList.contains("hidden")) {
    navbar.style.visibility = "visible";
    menu.classList.add("showing");
    menu.classList.remove("hidden");
  }
});