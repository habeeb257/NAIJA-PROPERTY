const email  = document.getElementById("email")
const password = document.getElementById("password");
const formSubmit = document.getElementById("formSubmit");
let eye = document.getElementById("fa-eye");
let eyeSlash = document.getElementById("fa-eye-slash");


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


// form submission
const handleSubmit = (e) => {
  e.preventDefault();
  // getting the value of the input
  const emailValue = email.value;
  const passwordValue = password.value;

  // saving the data to local storage
  localStorage.getItem("email");
  localStorage.getItem("password");

  // validating the data
  if (
    emailValue === "" ||
    passwordValue === ""
  ) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please fill in all fields",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (passwordValue.length < 8 || passwordValue.length > 20) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Password must be between 8 and 20 characters",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Form submitted successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    // redirecting programatically to the login page
    setTimeout(() => {
      window.location.href = "home-page.html";
    }, 3000);
  }
};






// Adding event
eye.addEventListener("click", togglePasswordIcon);
eyeSlash.addEventListener("click", togglePasswordIcon);
formSubmit.addEventListener("submit", handleSubmit);




