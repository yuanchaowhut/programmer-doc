var menu = document.querySelector(".menu");
var menuWidth = menu.offsetWidth;
var menuHeight = menu.offsetHeight;

var menuBg = document.querySelector(".menu-bg");
function extendBg() {
  menuBg.style.width = "100%";
  menuBg.style.height = "100%";
}
function init() {
  menuBg.style.width = menuWidth + "px";
  menuBg.style.height = menuHeight + "px";
  menu.addEventListener("click", extendBg);
}
init();
