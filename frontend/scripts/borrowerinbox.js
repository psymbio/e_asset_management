import { getUserInbox } from "./getdatautils.js";

let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(currentUser.id);
// let currentUserInbox = getUserInbox(currentUser.id);
// console.log(currentUserInbox);

const userInfoDiv = document.getElementById("userInfo");

if (currentUser) {
  // Create a template for rendering user info
  const userInfoTemplate = `
                <div>
                    <p class="text-gray-600">Telephone: ${currentUser.telephone}</p>
                    <p class="text-gray-600">Email: ${currentUser.email}</p>
                    <p class="text-gray-600">Username: ${currentUser.username}</p>
                    <p class="text-gray-600">Last Login: ${currentUser.lastLogin}</p>
                </div>
            `;

  // Set the innerHTML of userInfoDiv to the template
  userInfoDiv.innerHTML = userInfoTemplate;
} else {
  // Handle the case where currentUser is not found in localStorage
  userInfoDiv.innerHTML = "<p>User not found.</p>";
}

// Render the inbox
function renderInbox(inboxData) {
    const userInbox = document.getElementById("userInbox");
  
    if (!userInbox) {
      return;
    }
  
    userInbox.innerHTML = "";
  
    inboxData.forEach((message, index) => {
      if (message.userId == currentUser.id) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(
          "mb-4",
          "p-4",
          "border",
          "rounded",
          "border-gray-300"
        );
  
        if (message.statusRead) {
          messageDiv.classList.add("bg-gray-100"); // Apply styling for read messages
        } else {
          messageDiv.classList.add("bg-white"); // Apply styling for unread messages
        }
  
        const button = document.createElement("button");
        button.classList.add("button"); // Add your button class here
        button.textContent = message.statusRead ? "Mark as Unread" : "Mark as Read";
        button.addEventListener("click", () => {
          message.statusRead = !message.statusRead;
  
          // Update button text based on the new status
          button.textContent = message.statusRead ? "Mark as Unread" : "Mark as Read";
  
          // Update localStorage with the modified data
          localStorage.setItem("userInboxData", JSON.stringify(inboxData));
        });
  
        const messageText = document.createElement("span");
        messageText.textContent = message.message;
        messageDiv.appendChild(messageText);
        messageDiv.appendChild(document.createElement("br"));
        messageDiv.appendChild(document.createElement("br"));
        messageDiv.appendChild(button);
  
        userInbox.appendChild(messageDiv);
      }
    });
  }

function autoRefreshInbox() {
    setInterval(() => {
        // Retrieve the inbox data from localStorage
        const storedInboxData = JSON.parse(localStorage.getItem("userInboxData"));

        if (storedInboxData) {
            inboxData = storedInboxData; // Update the inbox data
            renderInbox(inboxData); // Render the updated inbox
        }
    }, 2000); // Refresh every 5 seconds (adjust as needed)
}

// Call the renderInbox function with the initial data
let inboxData = JSON.parse(localStorage.getItem("userInboxData"));
console.log(inboxData);
renderInbox(inboxData);
autoRefreshInbox();

