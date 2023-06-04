async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      const errorMessage = await response.json();
      showErrorMessage(errorMessage.error);
    }
  }
}

document.querySelector(".login-form").addEventListener("submit", loginFormHandler);

function showErrorMessage(message) {
  const errorMessage = document.querySelector("#error-message");
  errorMessage.innerHTML = message;
  errorMessage.style.display = "block";
}