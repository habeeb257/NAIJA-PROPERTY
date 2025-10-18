const password = document.getElementById("password");
const extras = document.getElementById
("extras")
let eye = document.getElementById("fa-eye");
let eyeSlash = document.getElementById("fa-eye-slash");
let toggleoff = document.getElementById("fa-toggle-off");

let toggleon = document.getElementById("fa-toggle-on");

// creating a function to execute
const togglePasswordIcon = () => {
  if (password.type === "password") {
    password.type = "text";
    eye.style.display = "block";
    eyeSlash.style.display = "none";
  } else {
    password.type = "password";
    eye.style.display = "none";
    eyeSlash.style.display = "block";
  }
};

// creating a function to execute
const toggleIcon = () => {
  if (extras.type === "extras") {
    extras.type = "click";
    toggleoff.style.display = "block";
    toggleon.style.display = "none";
  } else {
    extras.type = "extras";
    toggleoff.style.display = "none";
    toggleon.style.display = "block";
  }
};







// Adding event
eye.addEventListener("click", togglePasswordIcon);
eyeSlash.addEventListener("click", togglePasswordIcon);

// Adding event
toggleoff.addEventListener("click", toggleIcon);
toggleon.addEventListener("click", togglePasswordIcon);
// formSubmit.addEventListener("submit", handleSubmit);


