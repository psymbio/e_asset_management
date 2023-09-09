import userData from "../fake_db/user.json" assert { type: "json" };
import assetData from "../fake_db/asset.json" assert { type: "json" };
import categoryData from "../fake_db/category.json" assert { type: "json" };
import borrowedAssetData from "../fake_db/borrowedAsset.json" assert { type: "json" };
import userInboxData from "../fake_db/userInbox.json" assert { type: "json" };

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
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("assetData", JSON.stringify(assetData));
            localStorage.setItem("categoryData", JSON.stringify(categoryData));
            localStorage.setItem("borrowedAssetData", JSON.stringify(borrowedAssetData));
            localStorage.setItem("userInboxData", JSON.stringify(userInboxData));
            
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
