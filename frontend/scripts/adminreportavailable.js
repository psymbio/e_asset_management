let borrowedAssetData;

if (localStorage.getItem('borrowedAssetData')) {
  borrowedAssetData = JSON.parse(localStorage.getItem('borrowedAssetData'));
} else {
  // Fetch the JSON file using a fetch request
  fetch('../fake_db/borrowedAsset.json')
    .then(response => response.json())
    .then(data => {
      borrowedAssetData = data;
      localStorage.setItem('borrowedAssetData', JSON.stringify(borrowedAssetData));
      console.log(borrowedAssetData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

import { getAssetIsAvailable } from "./getdatautils.js";


const categories = {};
borrowedAssetData.forEach(item => {
    var category = getAssetIsAvailable(item.assetId);
    if (category in categories) {
        categories[category]++;
    } else {
        categories[category] = 1;
    }
});

const labels = Object.keys(categories);
const counts = Object.values(categories);
console.log(labels, counts);
// Create a bar chart
const ctx = document.getElementById('barChartIsAvailable').getContext('2d');
const barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Category Counts',
            data: counts,
            backgroundColor: ['#fca5a5', '#bef264'],
        }],
    },
    options: {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Count',
                },
            },
        },
    },
});