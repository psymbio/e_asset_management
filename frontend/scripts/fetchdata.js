function loadDataFromLocalStorageOrFetch(key, filePath, variable) {
  // Check if the data is in localStorage
  if (localStorage.getItem(key)) {
    variable = JSON.parse(localStorage.getItem(key));
    return variable;
  } else {
    // Fetch the JSON file using a fetch request
    return fetch(filePath)
      .then((response) => response.json())
      .then((data) => {
        // Assign the fetched data to the variable
        variable = data;
        localStorage.setItem(key, JSON.stringify(variable));
        return variable;
      })
      .catch((error) => {
        console.error(`Error fetching ${key} data:`, error);
        return null;
      });
  }
}

export { loadDataFromLocalStorageOrFetch };