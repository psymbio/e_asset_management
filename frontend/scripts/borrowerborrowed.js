let borrowedAssetData = JSON.parse(localStorage.getItem("borrowedAssetData"));
let categoryData = JSON.parse(localStorage.getItem("categoryData"));
let userInboxData = JSON.parse(localStorage.getItem("userInboxData"));

import { formatDate, formatDate2 } from "./utils.js";
import {
  getUsername,
  getUserName,
  getAssetName,
  getAssetCategory,
} from "./getdatautils.js";

const table = document.createElement("table");
const tableBody = document.createElement("tbody");

// Create table headers
const headers = [
  "Asset Name",
  "Asset Category",
  "Borrowing Date",
  "Overdue Status",
  "Due Date",
  "Late Fees"
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
  let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (currentUser.id == borrowedAsset.userId) {
    const assetName = getAssetName(borrowedAsset.assetId);
    const assetCategory = getAssetCategory(borrowedAsset.assetId);
    // Create table cells for each data point
    const cells = [
      assetName,
      assetCategory,
      formatDate(borrowedAsset.borrowingDatetime),
      borrowedAsset.overdueStatus ? "Overdue" : "Not Overdue",
      formatDate(borrowedAsset.dueDate),
      borrowedAsset.lateFees,
    ];

    cells.forEach((cellData, index) => {
      const cell = document.createElement(index < 8 ? "td" : "div");
      if (index < 8) {
        cell.textContent = cellData;
      } else if (index === 8) {
        // Create a text input for the "Send Message" column
        const textInput = document.createElement("input");
        textInput.setAttribute("class", "adminMessageInput");
        textInput.type = "text";
        cell.appendChild(textInput);
        const sendButton = document.createElement("button");
        sendButton.textContent = "Send";
        sendButton.setAttribute("class", "button buttonToLeft");
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
          window.localStorage.setItem(
            "userInboxData",
            JSON.stringify(userInboxData)
          );
          alert("Message sent to " + getUserName(borrowedAsset.userId));
          // Clear the input field
          textInput.value = "";
        });
        cell.appendChild(sendButton);
      }
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  }
});

// Add the table body to the table
table.appendChild(tableBody);

// Add the table to the HTML document
const overdueTableDiv = document.getElementById("borrowerBorrowed");
overdueTableDiv.appendChild(table);
