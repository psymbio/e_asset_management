// import assetData from "../fake_db/asset.json" assert { type: "json" };
// import categoryData from "../fake_db/category.json" assert { type: "json" };
// import userData from "../fake_db/user.json" assert { type: "json" };

// Create a function to get the username based on userId
function getUsername(userId) {
  var userData = JSON.parse(localStorage.getItem("userData"));
  const user = userData.find((user) => user.id === userId);
  return user ? user.username : "Unknown User";
}

function getUserName(userId) {
  var userData = JSON.parse(localStorage.getItem("userData"));
  const user = userData.find((user) => user.id === userId);
  return user ? user.name : "Unknown User";
}

function getAssetName(assetId) {
  var assetData = JSON.parse(localStorage.getItem("assetData"));
  const asset = assetData.find((asset) => asset.id === assetId);
  return asset ? asset.name : "Unknown Asset";
}

function getAssetCategory(assetId) {
  var assetData = JSON.parse(localStorage.getItem("assetData"));
  var categoryData = JSON.parse(localStorage.getItem("categoryData"));
  const asset = assetData.find((asset) => asset.id === assetId);
  if (asset) {
    const category = categoryData.find(
      (category) => category.id === asset.categoryId
    );
    return category ? category.name : "Unknown Category";
  }
  return "Unknown Asset";
}

function getAssetIsAvailable(assetId) {
  var assetData = JSON.parse(localStorage.getItem("assetData"));
  const asset = assetData.find((asset) => asset.id === assetId);
  return asset ? asset.isAvailable : "Unknown Asset";
}
export { getUsername, getUserName, getAssetName, getAssetCategory, getAssetIsAvailable };