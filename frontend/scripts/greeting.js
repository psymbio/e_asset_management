let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
const greetingDiv = document.getElementById("greeting");
greetingDiv.innerText = "Welcome back, " + currentUser.name;