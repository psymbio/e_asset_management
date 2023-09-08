function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatDate2(inputDate) {
    const dateParts = inputDate.split("-");
    if (dateParts.length === 3) {
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];
      return `${day}/${month}/${year}`;
    } else {
      // Handle invalid input
      return "Invalid Date";
    }
  }

  export { formatDate, formatDate2 };