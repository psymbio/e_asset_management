function logout() {
  var userData = JSON.parse(localStorage.getItem("userData"));
  var currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const index = userData.findIndex((u) => u.id === currentUser.id);

  if (index !== -1) {
    // Update the lastLogin property of the user to the current date
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    userData[index].lastLogin = formattedDate;

    // Save the updated user data back to localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    // Update the currently logged-in user object in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(userData[index]));

    console.log("Last login updated to: " + formattedDate);
  } else {
    console.log("User not found in userData.");
  }
  window.location.href = "login.html";
}