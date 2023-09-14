let successfulImports = 0;
let nonSuccessfulImports = 0;

function importusers() {
  const importFileInput = document.getElementById("importFile");

  // Check if a file is selected
  if (importFileInput.files.length === 0) {
    alert("Please select a file to import.");
    return;
  }

  // Get the selected file
  const selectedFile = importFileInput.files[0];

  // Check the file type
  if (
    selectedFile.type !== "application/json" &&
    selectedFile.type !== "text/xml"
  ) {
    alert("Unsupported file type. Please select a JSON or XML file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const importedData = event.target.result;

    if (selectedFile.type === "application/json") {
      importJsonData(importedData);
    } else if (selectedFile.type === "text/xml") {
      importXmlData(importedData);
    }
  };

  reader.readAsText(selectedFile);
}

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

function importJsonData(jsonData) {
  try {
    const importedUsers = JSON.parse(jsonData);

    // Validate the imported data and add users to localStorage
    if (Array.isArray(importedUsers)) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      console.log(userData);
      const userId = generateUniqueId();
      for (const user of importedUsers) {
        if (isValidUser(user)) {
          user.id = userId + 1;
          const currentDate = new Date();
          const formattedDate = `${currentDate
            .getDate()
            .toString()
            .padStart(2, "0")}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${currentDate.getFullYear()}`;
          user.lastLogin = formattedDate;
          user.role = "Borrower";
          userData.push(user);
          successfulImports++;
        } else {
          nonSuccessfulImports++;
        }
      }
      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Users imported successfully.");
      updateImportCounts();
    } else {
      alert("Invalid JSON data format.");
    }
  } catch (error) {
    alert("Error parsing JSON data.");
  }
}

function importXmlData(xmlData) {
  try {
    // Create a new DOMParser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");

    // Get the list of user elements from the XML document
    const userElements = xmlDoc.querySelectorAll("user");

    if (userElements.length > 0) {
      const userData = JSON.parse(localStorage.getItem("userData")) || [];

      userElements.forEach((userElement) => {
        const name = userElement.querySelector("name").textContent;
        const email = userElement.querySelector("email").textContent;
        const password = userElement.querySelector("password").textContent;
        const username = userElement.querySelector("username").textContent;
        const telephone = userElement.querySelector("telephone").textContent;
        const userId = generateUniqueId();
        const user = {
          id: userId + 1,
          name: name,
          role: "Borrower",
          email: email,
          username: username,
          password: password,
          telephone: telephone,
        };

        if (isValidUser(user)) {
          const currentDate = new Date();
          const formattedDate = `${currentDate
            .getDate()
            .toString()
            .padStart(2, "0")}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${currentDate.getFullYear()}`;
          user.lastLogin = formattedDate;
          userData.push(user);
          successfulImports++;
        } else {
          nonSuccessfulImports++;
        }
      });

      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Users imported successfully.");
      updateImportCounts();
    } else {
      alert("No user data found in the XML.");
    }
  } catch (error) {
    alert("Error parsing XML data.");
  }
}

// Function to validate user data
function isValidUser(user) {
  // Check if all required fields are present
  if (
    !user.name ||
    !user.email ||
    !user.password ||
    !user.username ||
    !user.telephone
  ) {
    alert("Please fill out all the required fields.");
    return false;
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(user.email)) {
    return false;
  }

  // Validate password length
  if (user.password.length < 8 || user.password.length > 12) {
    return false;
  }

  const userData = JSON.parse(localStorage.getItem("userData")) || [];
  for (const existingUser of userData) {
    if (existingUser.email === user.email) {
      return false;
    }
    if (existingUser.username === user.username) {
      return false;
    }
  }

  return true;
}

function updateImportCounts() {
  const successCountElement = document.getElementById("successCount");
  const failureCountElement = document.getElementById("failureCount");

  successCountElement.textContent =
    "Successfully Imported: " + successfulImports;
  failureCountElement.textContent = "Not Imported: " + nonSuccessfulImports;
}
