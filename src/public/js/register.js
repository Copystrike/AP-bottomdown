async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-register").value.trim();
  const password = document.querySelector("#password-register").value.trim();
  const passwordConfirmed = document.querySelector("#password-confirm-register").value.trim();

  if (password !== passwordConfirmed) {
    alert("Passwords do not match");
    return;
  }

  if (username && password) {
    const response = await fetch("/api/register", {
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
      alert(response.statusText);
    }
  }
}

document.querySelector(".register-form").addEventListener("submit", loginFormHandler);
