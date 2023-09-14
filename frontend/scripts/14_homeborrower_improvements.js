let assetData = JSON.parse(localStorage.getItem("assetData"));
let categoryData = JSON.parse(localStorage.getItem("categoryData"));

// Set the isAvailable property to false in assetData
assetData.forEach((asset) => {
  asset.isAvailable = false;
});

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
  "Select",
  "Asset Name",
  "Asset Description",
  "Category",
  // "Lending Period"
];
const headerRow = document.createElement("tr");

headers.forEach((headerText) => {
  const headerCell = document.createElement("th");
  headerCell.textContent = headerText;
  headerRow.appendChild(headerCell);
});

tableBody.appendChild(headerRow);

// Populate the table with borrowed asset data
assetData.forEach((asset) => {
  const row = document.createElement("tr");

  // Create a checkbox cell
  const selectCell = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  selectCell.appendChild(checkbox);
  row.appendChild(selectCell);

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

    tableBody.appendChild(row);
  }
});

table.appendChild(tableBody);
const overdueTableDiv = document.getElementById("borrowerAvailable");
overdueTableDiv.appendChild(table);

// Create a submit button
const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.addEventListener("click", handleSubmission); // Add an event listener if you want to handle the button click event

// Append the submit button to the container div
overdueTableDiv.appendChild(submitButton);

// Function to handle the submission when the button is clicked
function handleSubmission() {
  // Add your submission logic here
  // For example, you can iterate over the rows and check which checkboxes are selected
  // and perform some action based on the selected checkboxes.
  // You can also access the data in the table rows to gather information for submission.
}
