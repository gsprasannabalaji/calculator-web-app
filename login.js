$(document).ready(function () {
  $("#loginButton").prop("disabled", true);

  let isEmailValid = false;
  let isUsernameValid = false;
  let isPasswordValid = false;
  let isConfirmPasswordValid = false;

  $("#email").val('');
  $("#username").val('');

  $(".form__error").hide();

  const northeasternEmailRegex = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;

  // Function to check if the email is valid northeastern email
  const isValidNortheasternEmail = (email) => {
    return northeasternEmailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
      password
    );
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if(hasSpecialCharacter && hasCapitalLetter && hasNumber && (!(password.length < 8) && !(password.length > 20))) {
      return true;
    } else {
      let errorText = "Password must contain at least <br>";
      if(!hasSpecialCharacter) {
        errorText += " one special character <br>";
      } 
      if(!hasCapitalLetter) {
        errorText += " one capital letter <br>";
      }
      if(!hasNumber) {
        errorText += " one number <br>";
      }
      if(password.length < 8 || password.length > 20) {
        errorText += " characters length must be between 8 and 20.";
      }
      $("#passwordError").html(
        errorText
      );
      return false;
    }

  };

  const confirmPasswordValidation = () => {
    const confirmPassword = $("#confirmPassword").val();
    const password = $("#password").val();
    isConfirmPasswordValid = false;
    if(confirmPassword && password === confirmPassword) {
        isConfirmPasswordValid = true;
        $("#confirmPasswordError").hide();
    }
    return !confirmPassword
      ? "Confirm Password is required."
      : password !== confirmPassword
      ? "Password do not match."
      : "";
  };

  $("#email").on("input", function () {
    const email = $(this).val();
    isEmailValid = false;
    if (!email) {
      $("#emailError").text("Email is required.");
      $("#emailError").show();
    } else {
      if (!isValidNortheasternEmail(email)) {
        $("#emailError").text(
          "Please enter a valid northeastern email address."
        );
        $("#emailError").show();
      } else {
        $("#emailError").text("");
        $("#emailError").hide();
        isEmailValid = true;
      }
    }
    updateLoginButtonState();
  });

  $("#username").on("input", function () {
    const username = $(this).val();
    isUsernameValid = false;
    if (!username) {
      $("#usernameError").text("Username is required.");
      $("#usernameError").show();
    } else {
      $("#usernameError").text("");
      $("#usernameError").hide();
      isUsernameValid = true;
    }
    updateLoginButtonState();
  });

  $("#password").on("input", function () {
    const password = $(this).val();
    isPasswordValid = false;
    if (!password) {
      $("#passwordError").text("Password is required.");
    } else {
      if (!isValidPassword(password)) {
        $("#passwordError").show();;
      } else {
        $("#passwordError").text("");
        $("#passwordError").hide();
        isPasswordValid = true;
      }
    }
    if($('#confirmPassword').val()!== "") {
        const confirmPassError = confirmPasswordValidation();
        $("#confirmPasswordError").text(confirmPassError);
        $("#confirmPasswordError").show();
    }
    updateLoginButtonState();
  });

  $("#confirmPassword").on("input", function () {
    const confirmPassError = confirmPasswordValidation();
    $("#confirmPasswordError").text(confirmPassError);
    if(confirmPassError !== "") {
      $("#confirmPasswordError").show();
    }
    updateLoginButtonState();
  });

  $("#loginButton").on("click", function (event) {
    event.preventDefault();
    sessionStorage.setItem("username", $("#username").val());
    window.location.href = "calculator.html";
  });

  const updateLoginButtonState = () => {
    $("#loginButton").prop(
      "disabled",
      !(
        isEmailValid &&
        isUsernameValid &&
        isPasswordValid &&
        isConfirmPasswordValid
      )
    );
  };
});
