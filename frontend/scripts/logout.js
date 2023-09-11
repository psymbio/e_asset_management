function downloadJsonData(data, filename) {
  const jsonData = JSON.stringify(data);

  // Create a blob with the JSON data
  const blob = new Blob([jsonData], { type: "application/json" });

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a download link and trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  // Clean up the URL object
  URL.revokeObjectURL(url);
}

function logout() {
  const userInboxData = localStorage.getItem("userInboxData");
  downloadJsonData(userInboxData, "userInbox.json");

  const assetData = localStorage.getItem("assetData");
  downloadJsonData(assetData, "asset.json");

  const borrowedAsset = localStorage.getItem("borrowedAsset");
  downloadJsonData(borrowedAsset, "borrowedAsset.json");
}
