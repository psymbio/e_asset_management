import userData from "../fake_db/user.json" assert { type: "json" };
console.log(userData);
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", function (e) {
        e.preventDefault();        
        const usernameOrEmail = document.getElementById("usernameOrEmail").value;
        const password = document.getElementById("password").value;
        const user = userData.find(
            (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
        );

        if (user && user.password === password) {
            // Store user data in localStorage after successful login
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            if (user.role == "Admin") {
                window.location.href = "homeadmin.html"; // Redirect to the dashboard page
            } else {
                window.location.href = "homeborrower.html"; // Redirect to the dashboard page
            }
        } else {
            alert("Invalid username/email or password. Please try again.");
        }
    });
});
