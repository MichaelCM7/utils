let overlayed = 0;

document.querySelector(".signup-btn").addEventListener("click",() => {
  if(overlayed === 0) {
    document.querySelector(".overlay").classList.add("overlay-hidden");
    overlayed = 1;
  } 
});

document.querySelector(".overlay").addEventListener("click",(e) => {
  if(e.target.classList.contains("overlay")) {
    document.querySelector(".overlay").classList.remove("overlay-hidden");
    overlayed = 0;
  }
});

document.querySelector("html").addEventListener("keyup",(e) => {
  if(e.key === "Escape") {
    document.querySelector(".overlay").classList.remove("overlay-hidden");
    overlayed = 0;
  }
});

document.getElementById("googleBtn").addEventListener("click", () => {
  google.accounts.id.initialize({
    client_id: "290808565646-fdltvdh0qa258ai8vrp2poej5cpam5g8.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.prompt();
});


function handleCredentialResponse(response) {
  const token = response.credential;

  // Decode the JWT token
  const payload = JSON.parse(atob(token.split('.')[1]));

  console.log("User Info:", payload);

  // Clear previous user info if it exists
  const existing = document.getElementById("google-user");
  if (existing) existing.remove();

  // Extract useful data
  const name = payload.name;
  const email = payload.email;
  const picture = payload.picture;

  // Create and show new user info
  const container = document.createElement("div");
  container.id = "google-user"; // Allows us to remove it later if needed
  container.innerHTML = `
    <h3>Welcome, ${name}</h3>
    <p>Email: ${email}</p>
    <img src="${picture}" alt="Profile Picture" style="width:80px; height:80px; border-radius:50%; margin-top:10px;">
  `;

  container.style.cssText = `
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  background: #fafafa;
  `;

  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Sign Out";
  logoutBtn.style.marginTop = "10px";
  logoutBtn.onclick = () => {
    container.remove();
  };

  container.appendChild(logoutBtn);


  document.querySelector(".main-content").appendChild(container);

  document.querySelector(".overlay").classList.remove("overlay-hidden");
  overlayed = 0;
}

