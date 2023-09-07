To import we need to mention that the script of of the module type.
```html
<script type="module" src="../scripts/overdue.js"></script>
```

While importing also assert the type of the data you are importing
```javascript
import borrowedAssetData from "../fake_db/borrowedAsset.json" assert { type: "json" };
console.log(borrowedAssetData);
```