document.addEventListener("DOMContentLoaded", function () {
  const password = "michael";
  const mainContent = document.querySelector(".mainDiv");
  const mainLogo = document.querySelector(".logo");
  mainContent.style.display = "none";
  mainLogo.style.display = "none";

  const loginDiv = document.createElement("div");
  loginDiv.innerHTML = `
        <div class="login-screen">
          <img src="logo.png" alt="Logo" class="login-logo" />
          <h2>Enter Password</h2>
          <input type="password" id="passwordInput" placeholder="Password" />
          <button id="loginButton">Login</button>
          <p id="errorMessage" style="color: red; display: none;">Incorrect password!</p>
        </div>
      `;
  document.body.appendChild(loginDiv);

  document.getElementById("loginButton").addEventListener("click", function () {
    const inputPassword = document.getElementById("passwordInput").value;
    if (inputPassword === password) {
      loginDiv.style.display = "none";
      mainContent.style.display = "block";
      mainLogo.style.display = "block";
    } else {
      document.getElementById("errorMessage").style.display = "block";
    }
  });
});
