
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");

const formSubmit = document.getElementById("formSubmit");
let eye = document.getElementById("fa-eye");
let eyeSlash = document.getElementById("fa-eye-slash");


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

const handleSubmit = (e) => {
  e.preventDefault();
  
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const emailValue = email.value;
  const passwordValue = password.value;

  
  localStorage.getItem("firstName", firstNameValue);
  localStorage.getItem("lastName", lastNameValue);
  localStorage.getItem("email", emailValue);
  localStorage.getItem("password", passwordValue);


  if (
    firstNameValue === "" ||
    lastNameValue === "" ||
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
    
    setTimeout(() => {
      window.location.href = "login.html";
    }, 3000);
  }
};

// Adding event
eye.addEventListener("click", togglePasswordIcon);
eyeSlash.addEventListener("click", togglePasswordIcon);
formSubmit.addEventListener("submit", handleSubmit);
