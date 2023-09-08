import borrowedAssetData from "../fake_db/borrowedAsset.json" assert { type: "json" };
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
const ctx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Category Counts',
            data: counts,
            backgroundColor: ['blue'], // You can customize the colors
        }],
    },
    options: {
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