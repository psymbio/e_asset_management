document.addEventListener("DOMContentLoaded", () => {
    // Check if the user is an admin (role = 1)
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== 1) {
        alert("Only admins can add assets.");
        return;
    }

    const categoryIdInput = document.getElementById("categoryId");
    const addAssetButton = document.getElementById("addAssetButton");

    // Sample categories data (you can load this from your database)
    const categories = [
        {
            id: 1,
            categoryName: "Laptop",
            lendingPeriod: 7,
            lateFees: 10,
            banningPeriod: 14,
        },
        {
            id: 2,
            categoryName: "Mobile",
            lendingPeriod: 5,
            lateFees: 12,
            banningPeriod: 10,
        },
        // Add more categories as needed
    ];

    // Populate category dropdown options
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.categoryName;
        categoryIdInput.appendChild(option);
    });

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

        // Create a unique ID (you can use a library like uuid for this)
        const uniqueId = generateUniqueId();

        // Create the asset object
        const asset = {
            id: uniqueId,
            name: name,
            categoryId: categoryId,
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
        document.getElementById("dateAdded").value = "<?php echo date('Y-m-d'); ?>";
        document.getElementById("isAvailable").checked = true;
    }

    // Function to generate a unique ID (you can use a library like uuid for this)
    function generateUniqueId() {
        // This is a simple example using an increasing ID
        const fakeDb = JSON.parse(localStorage.getItem("fake_db"));
        const maxId = fakeDb.reduce((max, asset) => (asset.id > max ? asset.id : max), 0);
        return maxId + 1;
    }
});
