import { message } from "../components/messages.js";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////// CONTACT PAGE ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
///////////////// CONTACT PAGE FORM ERROR VALIDATION SETUP ///////////////////
//////////////////////////////////////////////////////////////////////////////

const fullName = document.querySelector("#fullName");
const fullNameError = document.querySelector("#fullNameError");

const contactEmail = document.querySelector("#contactEmail");
const emailError = document.querySelector("#emailError");

const contactMessage = document.querySelector("#contactMessage");
const msgError = document.querySelector("#msgError");

const button = document.querySelector("#contactButton");

const form = document.querySelector("#contactForm");

const success = document.querySelector(".msg-container");

button.addEventListener("click", checkForm);

function checkForm() {
  event.preventDefault();

  if (!fullName.validity.valid) {
    fullNameError.style.visibility = "visible";
    // fullNameError.innerText = fullName.validationMessage;
    fullNameError.innerHTML = message("error", "Please type your full name ");
    fullName.style.border = "1px solid red";
  } else {
    fullNameError.style.visibility = "hidden";
    fullName.style.border = "1px solid green";
  }

  if (!contactEmail.validity.valid) {
    emailError.style.visibility = "visible";
    // emailError.innerText = contactEmail.validationMessage;
    emailError.innerHTML = message("error", "Please type in a valid email address ");
    contactEmail.style.border = "1px solid red";
  } else {
    emailError.style.visibility = "hidden";
    contactEmail.style.border = "1px solid green";
  }

  if (!contactMessage.validity.valid) {
    msgError.style.visibility = "visible";
    msgError.innerHTML = message("error", "Please write minimum 20 words ");
    // msgError.innerText = contactMessage.validationMessage;
    contactMessage.style.border = "1px solid red";
  } else {
    msgError.style.visibility = "hidden";
    contactMessage.style.border = "1px solid green";
  }

  if (fullName.validity.valid && contactEmail.validity.valid && contactMessage.validity.valid) {
    console.log("submitted");
    let isError = false;

    if (isError === false) {
      form.style.visibility = "hidden";
      success.style.visibility = "visible";
      success.innerHTML = message("success", "Thank you, the form was successfully submitted.");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.forms[0].addEventListener("submit", function (e) {
    e.preventDefault();
    e.currentTarget.classList.add("submitted");
  });
});
