var btn = document.getElementById("submit");

btn.addEventListener("click", (event) => {
  var inputedPassword = document.getElementById("password").value;
  var emailAddress = document.getElementById("emailAddress").value;

  emailAddress = emailAddress.trim();

  if (inputedPassword.length === 0) {
    event.preventDefault();
    document.getElementById("password-error").style.display = "block";
    document.getElementById("password-error").innerText =
      "Enter your Password into this field";
  } else {
    if (inputedPassword.length < 8) {
      event.preventDefault();
      document.getElementById("password-error").style.display = "block";
      document.getElementById("password-error").innerText =
        "You password must be at least 8 character.";
    } else {
      document.getElementById("password-error").style.display = "none";
    }
  }

  if (emailAddress.length === 0) {
    event.preventDefault();
    document.getElementById("email-error").style.display = "block";
    document.getElementById("email-error").innerText =
      "Input you Gmail Address in the field";
  } else {
    if (emailAddress.indexOf("@") < 0) {
      event.preventDefault();
      document.getElementById("email-error").style.display = "block";
      document.getElementById(
        "email-error"
      ).innerText = `Input you Gmail Address with an @ sign, like ${emailAddress}@gmail.com `;
    } else {
      console.log(emailAddress.indexOf("@gmail.com") < 0);
      if (emailAddress.indexOf("@gmail.com") < 0) {
        event.preventDefault();
        document.getElementById("email-error").style.display = "block";
        document.getElementById(
          "email-error"
        ).innerText = `Input a correct Gmail Address, it should have @gmail.com`;
      } else {
        document.getElementById("email-error").style.display = "none";
      }
    }
  }
});

var eye = document.getElementById("eye");

eye.addEventListener("click", (event) => {
  var password = document.getElementById("password");
  console.log(password.getAttribute("type"));
  if (password.getAttribute("type") == "password") {
    password.setAttribute("type", "text");
    eye.setAttribute("src", "./images/eye-svgrepo-com.svg");
  } else {
    password.setAttribute("type", "password");
    eye.setAttribute("src", "./images/eye-closed-svgrepo-com.svg");
  }
});
