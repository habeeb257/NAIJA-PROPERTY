const navLists = document.getElementById("nav-lists");
const faBars = document.getElementById("fa-bars");
const showAndHideNavbarItem = () => {
  // contain
  // add
  // toggle
  navLists.classList.toggle("show");
};

faBars.addEventListener("click", showAndHideNavbarItem);
