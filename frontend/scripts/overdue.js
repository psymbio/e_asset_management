import borrowedAssetData from "../fake_db/borrowedAsset.json" assert { type: "json" };
import assetData from "../fake_db/asset.json" assert { type: "json" };
import userData from "../fake_db/user.json" assert { type: "json" };
import categoryData from "../fake_db/category.json" assert { type: "json" };
import formatDate from "../scripts/utils.js";

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
      console.log(userName, username);
      const showRow = (
            userName.toLowerCase().includes(usernameFilter) &&
            assetName.toLowerCase().includes(assetFilter) &&
            assetCategory.toLowerCase().includes(categoryFilter) &&
            (dueDateFilter === "" || dueDate === dueDateFilter) &&
            (borrowingDateFilter === "" || borrowingDate === borrowingDateFilter) &&
            (categorySelectFilter === "" || assetCategory.toLowerCase() === categorySelectFilter)
          );
          row.style.display = showRow ? "" : "none";
    }
  });
}

const filterForm = document.createElement("form");

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
document.body.appendChild(filterForm);

// Create a function to get the username based on userId
function getUsername(userId) {
  const user = userData.find((user) => user.id === userId);
  return user ? user.username : "Unknown User";
}

function getUserName(userId) {
    const user = userData.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
}

function getAssetName(assetId) {
    const asset = assetData.find((asset) => asset.id === assetId);
    return asset ? asset.name : "Unknown Asset";
}

function getAssetCategory(assetId) {
    const asset = assetData.find((asset) => asset.id === assetId);
    if (asset) {
        const category = categoryData.find((category) => category.id === asset.categoryId);
        return category ? category.name : "Unknown Category";
    }
    return "Unknown Asset";
}

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
  ];

  cells.forEach((cellData) => {
    if (cells[5] == "Overdue") {
      const cell = document.createElement("td");
      cell.textContent = cellData;
      row.appendChild(cell);
    }
  });

  tableBody.appendChild(row);
});

// Add the table body to the table
table.appendChild(tableBody);

// Add the table to the HTML document
document.body.appendChild(table);

filterTable();