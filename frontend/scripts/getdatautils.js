import assetData from "../fake_db/asset.json" assert { type: "json" };
import categoryData from "../fake_db/category.json" assert { type: "json" };
import userData from "../fake_db/user.json" assert { type: "json" };

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
    const category = categoryData.find(
      (category) => category.id === asset.categoryId
    );
    return category ? category.name : "Unknown Category";
  }
  return "Unknown Asset";
}

export { getUsername, getUserName, getAssetName, getAssetCategory };
