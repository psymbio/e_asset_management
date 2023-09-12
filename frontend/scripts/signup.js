import userData from "../fake_db/user.json" assert { type: "json" };

function generateUniqueId() {
    if (!localStorage.getItem("userData")) {
        localStorage.setItem("userData", JSON.stringify(userData));
    }
    let users = JSON.parse(localStorage.getItem("userData")) || [];
    let maxId = 0;
    for (const user of users) {
        if (user.id > maxId) {
            maxId = user.id;
        }
    }
    return maxId + 1;
}

// Function to handle the form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Get form inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    const confirmPassword = document.getElementById("confirm_pass").value;
    const username = document.getElementById("Username").value;
    const telephone = document.getElementById("phone").value;

    //Checking if any field is empty
    // if (!name || !email || !password || !confirmPassword || !username || !telephone) {
    //     alert("Please fill out all the required fields.");
    //     return;
    // }

    // Validate password and confirm password
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }


    //checking if the email entered is valid
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (emailPattern != email) {
    //     alert("Please provide a valid email format!");
    //     return;
    // }

    // //checking for a valid password
    // if (password.length <= 8) {
    //     alert("The password should be minimum 8 characters.");
    //     return;
    // }
    // Generate a unique ID for the new user
    const userId = generateUniqueId();

    // Create a new user object
    const newUser = {
        id: userId,
        name: name,
        role: "Borrower",
        email: email,
        username: username,
        password: password,
        telephone: telephone,
    };
    let userData = JSON.parse(localStorage.getItem("userData"));
    userData.push(newUser);
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Account created successfully! You can now log in.");
    window.location.href = "login.html";
}

// Attach the form submission handler to the form element
const signUpForm = document.querySelector("form");
signUpForm.addEventListener("submit", handleFormSubmit);
