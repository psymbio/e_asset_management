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
