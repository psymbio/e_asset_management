let assetData = JSON.parse(localStorage.getItem("assetData"));
let categoryData = JSON.parse(localStorage.getItem("categoryData"));

import { formatDate, formatDate2 } from "./utils.js";
import {
  getUsername,
  getUserName,
  getAssetName,
  getAssetCategory,
  getAssetDesc,
} from "./getdatautils.js";

const table = document.createElement("table");
const tableBody = document.createElement("tbody");

// Create table headers
const headers = [
  "Asset Name",
  "Asset Description",
  "Category",
  "Checkbox"
  // "Lending Period"
];
const headerRow = document.createElement("tr");

headers.forEach((headerText) => {
  const headerCell = document.createElement("th");
  headerCell.textContent = headerText;
  headerRow.appendChild(headerCell);
});

tableBody.appendChild(headerRow);

function createCheckbox(assetId) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.assetId = assetId; // Store the asset ID as a data attribute
    return checkbox;
}

function generateUniqueId(data) {
    let maxId = 0;
    for (const dataPoint of data) {
        if (data.id > maxId) {
            maxId = data.id;
        }
    }
    return maxId + 1;
}

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting

    const selectedAssetIds = [];

    // Iterate through the checkboxes and collect selected asset IDs
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var message = "Borrowing: ";
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedAssetIds.push(checkbox.dataset.assetId);
            var assetId = parseInt(checkbox.dataset.assetId);
            message += getAssetName(assetId) + ", ";

            assetData.forEach((asset) => {
                if (asset.id === assetId) {
                    asset.isAvailable = false;
                }
            });

            // Create a new entry in borrowedAssetData
            const borrowedAssetEntry = {
                id: generateUniqueId(JSON.parse(localStorage.getItem("borrowedAssetData"))),
                assetId: assetId,
                userId: JSON.parse(localStorage.getItem("loggedInUser")).id,
                borrowingDatetime: formattedDate,
                overdueStatus: false,
                dueDate: "2023-10-12",
                lateFees: 0,
            };

            // Add the entry to borrowedAssetData
            const borrowedAssetData = JSON.parse(localStorage.getItem("borrowedAssetData")) || [];
            borrowedAssetData.push(borrowedAssetEntry);
            localStorage.setItem("borrowedAssetData", JSON.stringify(borrowedAssetData));
            localStorage.setItem("assetData", JSON.stringify(assetData));
        }
    });

    window.location.reload();
    alert(message);
}

assetData.forEach((asset) => {
  const row = document.createElement("tr");

  // Get the username based on userId
  if (asset.isAvailable == true) {
    const assetName = getAssetName(asset.id);
    const assetDesc = getAssetDesc(asset.id);
    const assetCategory = getAssetCategory(asset.id);
    // Create table cells for each data point
    const cells = [
      assetName,
      assetDesc,
      assetCategory,
    ];

    cells.forEach((cellData, index) => {
      const cell = document.createElement(index < 8 ? "td" : "div");
      if (index < 4) {
        cell.textContent = cellData;
      }
      row.appendChild(cell);
    });
    const checkboxCell = document.createElement("td"); // Create a cell for the checkbox
    checkboxCell.appendChild(createCheckbox(asset.id)); // Add a checkbox to the cell
    row.appendChild(checkboxCell);
    tableBody.appendChild(row);
  }
});
// Create the submit button
const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Submit";

// Add an event listener to the form for handling form submission
const assetSelectionForm = document.createElement("form");
assetSelectionForm.id = "assetSelectionForm";
assetSelectionForm.addEventListener("submit", handleFormSubmit);

// Append the table, submit button, and form to the container div
const overdueTableDiv = document.getElementById("borrowerAvailable");
overdueTableDiv.appendChild(tableBody);
assetSelectionForm.appendChild(submitButton);
overdueTableDiv.appendChild(assetSelectionForm);
