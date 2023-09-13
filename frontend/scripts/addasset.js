import categories from "../fake_db/category.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", () => {
    console.log(categories);
  // Check if the user is an admin (role = 'Admin' instead of '1')
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || user.role !== 'Admin') {
    alert("Only admins can add assets.");
    return;
  }

  const categoryIdInput = document.getElementById("categoryId");
  const addAssetButton = document.getElementById("addAssetButton");
  const addCategorySection = document.getElementById("addCategorySection");

  // Function to populate category dropdown options
  function populateCategoryOptions() {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categoryIdInput.appendChild(option);
    });
  }

  // Populate category dropdown options initially
  populateCategoryOptions();

  addAssetButton.addEventListener("click", () => {
    // Get user input values
    const name = document.getElementById("name").value;
    const categoryId = parseInt(categoryIdInput.value); // Parse the selected value as an integer
    const description = document.getElementById("description").value;
    const dateAdded = document.getElementById("dateAdded").value;
    const isAvailable = document.getElementById("isAvailable").checked;

    // Check if all fields are filled
    if (!name || categoryId === 0 || !description || !dateAdded) {
      alert("All fields are mandatory.");
      return;
    }

    // Check if the selected category exists
    
    const selectedCategory = categories.find(category => category.id == categoryId);
    console.log("selectedCategory: "+selectedCategory )

    if ((typeof categoryId !== 'string' && categoryId == 4  ) || !selectedCategory) {
      // Category doesn't exist, show "Add Category" section
      addCategorySection.classList.remove("hidden");
      return;
    }

    // Generate unique ID for the asset
    const uniqueAssetId = generateUniqueId();

    // Create the asset object
    const asset = {
      id: uniqueAssetId,
      name: name,
      categoryId: uniqueAssetId,
      description: description,
      dateAdded: dateAdded,
      isAvailable: isAvailable,
    };

    // You can now do something with the created asset, such as adding it to a database
    // or performing further processing.

    // Optionally, clear the form fields after successful submission
    clearFormFields();

    // Alert to indicate successful submission (you can replace this with your logic)
    alert("Asset added successfully.");
  });

  // Function to clear form fields
  function clearFormFields() {
    document.getElementById("name").value = "";
    categoryIdInput.selectedIndex = 0;
    document.getElementById("description").value = "";
    document.getElementById("dateAdded").value = getCurrentDate();
    document.getElementById("isAvailable").checked = true;
  }

  // Function to generate a unique ID
  function generateUniqueId() {
    // Replace this with your unique ID generation logic
    // You can use a library like uuid for this
    const existingIDs = new Set(categories.map(item => item.id));
    let uniqueID = 1;
    
    while (existingIDs.has(uniqueID)) {
        uniqueID++;
    }
    
    return uniqueID;
  }

  // Function to get the current date in 'YYYY-MM-DD' format
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Add Category button event listener
  const addCategoryButton = document.getElementById("addCategoryButton");
  addCategoryButton.addEventListener("click", () => {
    const name = document.getElementById("categoryName").value;
    const lendingPeriod = parseInt(document.getElementById("lendingPeriod").value);
    const lateFees = parseInt(document.getElementById("lateFees").value);
    const banningPeriod = parseInt(document.getElementById("banningPeriod").value);

    if (!name || lendingPeriod <= 0 || lateFees <= 0 || banningPeriod <= 0) {
      alert("All fields in the Add Category section are mandatory.");
      return;
    }

    // Generate a unique ID for the category
    const uniqueCategoryId = generateUniqueId();

    // Create the category object
    const newCategory = {
      id: uniqueCategoryId,
      name: name,
      lendingPeriod: lendingPeriod,
      lateFees: lateFees,
      banningPeriod: banningPeriod,
    };

    console.log(newCategory)
    // Add the new category to the list of categories
    categories.push(newCategory);

    console.log(categories)

    // Clear the Add Category section form fields
    document.getElementById("categoryName").value = "";
    document.getElementById("lendingPeriod").value = "";
    document.getElementById("lateFees").value = "";
    document.getElementById("banningPeriod").value = "";

    // Populate the updated category dropdown options
    categoryIdInput.innerHTML = ""; // Clear existing options
    populateCategoryOptions();

    // Hide the Add Category section
    addCategorySection.classList.add("hidden");

    // Alert to indicate successful category creation (you can replace this with your logic)
    alert("Category added successfully.");
  });
});



