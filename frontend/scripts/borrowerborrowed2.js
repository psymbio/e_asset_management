let borrowedAssetData = JSON.parse(localStorage.getItem("borrowedAssetData"));
let categoryData = JSON.parse(localStorage.getItem("categoryData"));
let userInboxData = JSON.parse(localStorage.getItem("userInboxData"));
let assetData = JSON.parse(localStorage.getItem("assetData"));

import { formatDate, formatDate2 } from "./utils.js";
import {
  getUsername,
  getUserName,
  getAssetName,
  getAssetCategory,
} from "./getdatautils.js";

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting

    const selectedAssetIds = [];

    // Iterate through the checkboxes and collect selected asset IDs
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var message = "Returning: ";
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedAssetIds.push(checkbox.dataset.assetId);
            var assetId = parseInt(checkbox.dataset.assetId);
            message += getAssetName(assetId) + ", ";

            assetData.forEach((asset) => {
                if (asset.id === assetId) {
                    asset.isAvailable = true;
                }
            });

            // // Create a new entry in borrowedAssetData
            // const borrowedAssetEntry = {
            //     id: generateUniqueId(JSON.parse(localStorage.getItem("borrowedAssetData"))),
            //     assetId: assetId,
            //     userId: JSON.parse(localStorage.getItem("loggedInUser")).id,
            //     borrowingDatetime: formattedDate,
            //     overdueStatus: false,
            //     dueDate: "2023-10-12",
            //     lateFees: 0,
            // };

            // // Add the entry to borrowedAssetData
            // const borrowedAssetData = JSON.parse(localStorage.getItem("borrowedAssetData")) || [];
            // borrowedAssetData.push(borrowedAssetEntry);
            const updatedBorrowedAssetData = borrowedAssetData.filter((borrowedAsset) => {
                return borrowedAsset.assetId !== assetId || borrowedAsset.userId !== JSON.parse(localStorage.getItem("loggedInUser")).id;
            });
            localStorage.setItem("borrowedAssetData", JSON.stringify(updatedBorrowedAssetData));
            localStorage.setItem("assetData", JSON.stringify(assetData));
        }
    });

    window.location.reload();
    alert(message);
}

function createCheckbox(assetId) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.assetId = assetId; // Store the asset ID as a data attribute
    return checkbox;
}

const table = document.createElement("table");
const tableBody = document.createElement("tbody");

// Create table headers
const headers = [
  "Asset Name",
  "Asset Category",
  "Borrowing Date",
  "Overdue Status",
  "Due Date",
  "Late Fees",
  "Checkbox"
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
      if (index < 6) {
        cell.textContent = cellData;
      } else if (index === 6) {
        // Create a text input for the "Send Message" column
      }
      row.appendChild(cell);
    });
    const checkboxCell = document.createElement("td"); // Create a cell for the checkbox
    checkboxCell.appendChild(createCheckbox(borrowedAsset.assetId)); // Add a checkbox to the cell
    row.appendChild(checkboxCell);
    tableBody.appendChild(row);
  }
});


const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Submit";
submitButton.classList = ["btn"];

const assetSelectionForm = document.createElement("form");
assetSelectionForm.id = "assetSelectionForm";
assetSelectionForm.addEventListener("submit", handleFormSubmit);

// Add the table body to the table
table.appendChild(tableBody);

const overdueTableDiv = document.getElementById("borrowerBorrowed");
overdueTableDiv.appendChild(tableBody);
assetSelectionForm.appendChild(submitButton);
// overdueTableDiv.appendChild(backButton);
overdueTableDiv.appendChild(assetSelectionForm);