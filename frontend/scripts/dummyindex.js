// this executes on successful login when the user details are correct
localStorage.setItem("name", "John");
localStorage.setItem("email", "johndoe@gmail.com");
localStorage.setItem("userId", 1);

// then homeemployee
const nameUser = localStorage.getItem("name");
const emailUser = localStorage.getItem("email");
const idUser = localStorage.getItem("userId");
console.log(nameUser);

// show the user details
var paragraph = document.createElement("p");
paragraph.textContent = nameUser + " " + emailUser;
document.body.appendChild(paragraph);

// show the user inbox
var userInboxData = JSON.parse(localStorage.getItem("userInboxData"));
console.log(userInboxData);

for (const message of userInboxData) {
    if (message.userId == idUser) {
        // console.log(message);
        var paragraph = document.createElement("p");
        paragraph.textContent = message.message;
        document.body.appendChild(paragraph);
    }
}


// 
const userInboxData1 = localStorage.getItem("userInboxData");
const jsonData = JSON.stringify(userInboxData1);

// Create a blob with the JSON data
const blob = new Blob([jsonData], { type: 'application/json' });

// Create a URL for the blob
const url = URL.createObjectURL(blob);

// Create a download link and trigger the download
const a = document.createElement('a');
a.href = url;
a.download = 'userInbox.json';
a.click();

// Clean up the URL object
URL.revokeObjectURL(url);