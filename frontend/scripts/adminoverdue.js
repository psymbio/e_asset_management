let borrowedAssetData = JSON.parse(localStorage.getItem("borrowedAssetData"));
let categoryData = JSON.parse(localStorage.getItem("categoryData"));
let userInboxData = JSON.parse(localStorage.getItem("userInboxData"));

import { formatDate, formatDate2 } from "./utils.js";
import { getUsername, getUserName, getAssetName, getAssetCategory } from "./getdatautils.js";

function filterTable() {
  const categoryFilter = categoryInput.value.toLowerCase();
  const assetFilter = assetInput.value.toLowerCase();
  const usernameFilter = usernameInput.value.toLowerCase();
  const dueDateFilter = dueDateInput.value;
  const borrowingDateFilter = borrowingDateInput.value;
  const categorySelectFilter = categorySelect.value.toLowerCase();

  const rows = tableBody.querySelectorAll("tr");

  rows.forEach((row) => {
    if (row.querySelectorAll("td").length > 0) {
      const cells = row.querySelectorAll("td");
      const username = cells[0].textContent;
      const userName = cells[1].textContent;
      const assetName = cells[2].textContent;
      const assetCategory = cells[3].textContent;
      const borrowingDate = cells[4].textContent;
      const overdueStatus = cells[5].textContent;
      const dueDate = cells[6].textContent;
      const lateFees = cells[7].textContent;
      // console.log(dueDateFilter, dueDate);

      const dueDateFilterFormatted = formatDate2(dueDateFilter);
      const borrowingDateFilterFormatted = formatDate2(borrowingDateFilter);
      console.log(dueDateFilter, dueDateFilterFormatted);

      const showRow = (
        userName.toLowerCase().includes(usernameFilter) &&
        assetName.toLowerCase().includes(assetFilter) &&
        assetCategory.toLowerCase().includes(categoryFilter) &&
        (dueDateFilter === "" || dueDate === dueDateFilterFormatted) &&
        (borrowingDateFilter === "" || borrowingDate === borrowingDateFilterFormatted) &&
        (categorySelectFilter === "" || assetCategory.toLowerCase() === categorySelectFilter)
      );
      row.style.display = showRow ? "" : "none";
    }
  });
}

const filterForm = document.createElement("form");
filterForm.setAttribute("id", "filterForm");

// Filter by category name
const categoryInput = document.createElement("input");
categoryInput.type = "text";
categoryInput.placeholder = "Filter by Category";
categoryInput.addEventListener("input", filterTable);
filterForm.appendChild(categoryInput);

// Filter by asset name
const assetInput = document.createElement("input");
assetInput.type = "text";
assetInput.placeholder = "Filter by Asset";
assetInput.addEventListener("input", filterTable);
filterForm.appendChild(assetInput);

// Filter by username
const usernameInput = document.createElement("input");
usernameInput.type = "text";
usernameInput.placeholder = "Filter by Username";
usernameInput.addEventListener("input", filterTable);
filterForm.appendChild(usernameInput);

// Filter by due date
const dueDateInput = document.createElement("input");
dueDateInput.type = "date";
dueDateInput.addEventListener("input", filterTable);
filterForm.appendChild(dueDateInput);

// Filter by borrowing date
const borrowingDateInput = document.createElement("input");
borrowingDateInput.type = "date";
borrowingDateInput.addEventListener("input", filterTable);
filterForm.appendChild(borrowingDateInput);

const categorySelect = document.createElement("select");
const allOption = document.createElement("option");
allOption.value = "";
allOption.text = "All Categories";
categorySelect.appendChild(allOption);
categoryData.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.name;
  option.text = category.name;
  categorySelect.appendChild(option);
});
categorySelect.addEventListener("change", filterTable);
filterForm.appendChild(categorySelect);

// Add filter form to the HTML document
// document.body.appendChild(filterForm);

// Create a table for borrowed assets and populate it with data
const table = document.createElement("table");
const tableBody = document.createElement("tbody");

// Create table headers
const headers = [
  "User Username",
  "User Name",
  "Asset Name",
  "Asset Category",
  "Borrowing Date",
  "Overdue Status",
  "Due Date",
  "Late Fees",
  "Send Message",
];
const headerRow = document.createElement("tr");

headers.forEach((headerText) => {
  const headerCell = document.createElement("th");
  headerCell.textContent = headerText;
  headerRow.appendChild(headerCell);
});

tableBody.appendChild(headerRow);

// Populate the table with borrowed asset data
borrowedAssetData.forEach((borrowedAsset) => {
  const row = document.createElement("tr");

  // Get the username based on userId
  const username = getUsername(borrowedAsset.userId);
  const userName = getUserName(borrowedAsset.userId);
  const assetName = getAssetName(borrowedAsset.assetId);
  const assetCategory = getAssetCategory(borrowedAsset.assetId);
  // Create table cells for each data point
  const cells = [
    username,
    userName,
    assetName,
    assetCategory,
    formatDate(borrowedAsset.borrowingDatetime),
    borrowedAsset.overdueStatus ? "Overdue" : "Not Overdue",
    formatDate(borrowedAsset.dueDate),
    borrowedAsset.lateFees,
    "", // Empty cell for the text input
  ];

  cells.forEach((cellData, index) => {
    const cell = document.createElement(index < 8 ? "td" : "div");
    if (index < 8) {
      cell.textContent = cellData;
    } else if (index === 8) {
      // Create a text input for the "Send Message" column
      const textInput = document.createElement("input");
      textInput.setAttribute("class", "adminMessageInput");
      textInput.setAttribute("placeholder", "Enter Message");
      textInput.setAttribute("id", "messageInput");
      textInput.type = "text";
      cell.appendChild(textInput);
      const sendButton = document.createElement("button");
      sendButton.textContent = "Send";
      sendButton.setAttribute("class", "button buttonToLeft")
      sendButton.addEventListener("click", () => {
        // Find the text input in the same row as the clicked button
        const textInput = row.querySelector(".adminMessageInput");
        const message = textInput.value;
        // console.log(message);
        // Update userInboxData
        userInboxData.push({
          userId: borrowedAsset.userId,
          message,
          statusRead: false,
        });
        window.localStorage.setItem("userInboxData", JSON.stringify(userInboxData));
        alert("Message sent to " + getUserName(borrowedAsset.userId));
        // Clear the input field
        textInput.value = "";
      });
      cell.appendChild(sendButton);
    }
    row.appendChild(cell);
  });

  tableBody.appendChild(row);
});

// Add the table body to the table
table.appendChild(tableBody);

// Add the table to the HTML document
const filterFormDiv = document.getElementById("filterForm");
filterFormDiv.appendChild(filterForm);
const overdueTableDiv = document.getElementById("overdueTable");
overdueTableDiv.appendChild(table);
filterTable();