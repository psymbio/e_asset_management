
## Modularity in HTML
Create some separate components and try to simply include them
```
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <!-- Include necessary CSS and JavaScript files -->
</head>
<body>
    <!-- Include header -->
    <include src="html/header.html"></include>
    
    <!-- Content of the page -->
    
    <!-- Include footer -->
    <include src="html/footer.html"></include>
</body>
</html>
```


## CSS
Refrain from adding CSS classes
CSS means merge conflicts and merge conflicts - BAD

Instead use bootstrap for everything
Don't write components on your own, just plug and play from the component library

## ICONS
Google material icons
Please for the love of lord only use this.

## JS DBs rendering
People working on this should have good knowledge on how to loop, and perform a join on the different fake databases to get the information that needs to be rendered on the screen
