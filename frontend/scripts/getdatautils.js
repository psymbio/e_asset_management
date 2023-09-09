// import assetData from "../fake_db/asset.json" assert { type: "json" };
// import categoryData from "../fake_db/category.json" assert { type: "json" };
// import userData from "../fake_db/user.json" assert { type: "json" };
let userData;
let categoryData;
let assetData;
// Create a function to get the username based on userId
function getUsername(userId) {
  if (localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData'));
  } else {
    // Fetch the JSON file using a fetch request
    fetch('../fake_db/user.json')
      .then(response => response.json())
      .then(data => {
        userData = data;
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  const user = userData.find((user) => user.id === userId);
  return user ? user.username : "Unknown User";
}

function getUserName(userId) {
  if (localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData'));
  } else {
    // Fetch the JSON file using a fetch request
    fetch('../fake_db/user.json')
      .then(response => response.json())
      .then(data => {
        userData = data;
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  const user = userData.find((user) => user.id === userId);
  return user ? user.name : "Unknown User";
}

function getAssetName(assetId) {
  if (localStorage.getItem('assetData')) {
    assetData = JSON.parse(localStorage.getItem('assetData'));
  } else {
    // Fetch the JSON file using a fetch request
    fetch('../fake_db/user.json')
      .then(response => response.json())
      .then(data => {
        assetData = data;
        localStorage.setItem('assetData', JSON.stringify(assetData));
        console.log(assetData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  const asset = assetData.find((asset) => asset.id === assetId);
  return asset ? asset.name : "Unknown Asset";
}

function getAssetCategory(assetId) {
  if (localStorage.getItem('assetData')) {
    assetData = JSON.parse(localStorage.getItem('assetData'));
  } else {
    // Fetch the JSON file using a fetch request
    fetch('../fake_db/user.json')
      .then(response => response.json())
      .then(data => {
        assetData = data;
        localStorage.setItem('assetData', JSON.stringify(assetData));
        console.log(assetData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  if (localStorage.getItem('categoryData')) {
    categoryData = JSON.parse(localStorage.getItem('categoryData'));
  } else {
    // Fetch the JSON file using a fetch request
    fetch('../fake_db/category.json')
      .then(response => response.json())
      .then(data => {
        categoryData = data;
        localStorage.setItem('categoryData', JSON.stringify(categoryData));
        console.log(categoryData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
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
  if (localStorage.getItem('assetData')) {
    assetData = JSON.parse(localStorage.getItem('assetData'));
  } else {
    // Fetch the JSON file using a fetch request
    fetch('../fake_db/user.json')
      .then(response => response.json())
      .then(data => {
        assetData = data;
        localStorage.setItem('assetData', JSON.stringify(assetData));
        console.log(assetData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  const asset = assetData.find((asset) => asset.id === assetId);
  return asset ? asset.isAvailable : "Unknown Asset";
}
export { getUsername, getUserName, getAssetName, getAssetCategory, getAssetIsAvailable };