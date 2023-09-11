let borrowedAssetData = JSON.parse(localStorage.getItem("borrowedAssetData"));
import { getAssetCategory } from "./getdatautils.js";
const categories = {};
borrowedAssetData.forEach(item => {
    var category = getAssetCategory(item.assetId);
    // console.log(category);
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
const ctx = document.getElementById('barChartCategory').getContext('2d');
const barChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: 'Category Counts',
            data: counts,
            backgroundColor: ['#e9d5ff', '#a5f3fc', '#fbcfe8', '#fef08a'],
        }],
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Assets Category',
            },
        },
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