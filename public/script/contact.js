var btn = document.getElementById("submit");

btn.addEventListener("click", (event) => {
  var inputedName = document.getElementById("name").value;
  var inputedMessage = document.getElementById("message").value;
  var emailAddress = document.getElementById("emailAddress").value;

  inputedName = inputedName.trim();
  inputedMessage = inputedMessage.trim();
  emailAddress = emailAddress.trim();

  if (inputedName.length === 0) {
    event.preventDefault();
    document.getElementById("name-error").style.display = "block";
    document.getElementById("name-error").innerText =
      "Enter your name into this field";
  } else {
    if (inputedName.indexOf(" ") < 0) {
      event.preventDefault();
      document.getElementById("name-error").style.display = "block";
      document.getElementById("name-error").innerText =
        "You only Inputed your Surname or Lastname";
    } else {
      document.getElementById("name-error").style.display = "none";
    }
  }

  if (inputedMessage.length === 0) {
    event.preventDefault();
    document.getElementById("message-error").style.display = "block";
    document.getElementById("message-error").innerText =
      "Input your message into the field.";
  } else {
    if (inputedMessage.length < 20) {
      event.preventDefault();
      console.log(inputedMessage.length);
      document.getElementById("message-error").style.display = "block";
      document.getElementById(
        "message-error"
      ).innerText = `You need at least 20 letter word, it remains ${
        20 - inputedMessage.length
      }.`;
    } else {
      document.getElementById("message-error").style.display = "none";
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
