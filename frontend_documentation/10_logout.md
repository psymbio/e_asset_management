On logout we store the last login datetime of the current user
We also need to take a backup of all the localStorage items like userData/borrowedAssetsData/etc. in our own file storage therefore, we ask the user to download it to the fake_db directory so that website continuity is maintained.

```javascript
const data = { name: 'John', age: 30 };
const jsonData = JSON.stringify(data);

// Create a blob with the JSON data
const blob = new Blob([jsonData], { type: 'application/json' });

// Create a URL for the blob
const url = URL.createObjectURL(blob);

// Create a download link and trigger the download
const a = document.createElement('a');
a.href = url;
a.download = 'data.json';
a.click();

// Clean up the URL object
URL.revokeObjectURL(url);
```