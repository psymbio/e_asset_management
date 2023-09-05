## Form Format
RULES: Everything must have a placeholder
1. name - text
2. categoryId (display categoryName Laptop/Mobile/Device/etc) : dropdown or add category
3. description -  textarea
4. dateAdded - default today's date
5. isAvailable - default true

## Javascript

1. All fields are mandatory
2. Only admins can add assets - check localStorage if "roleId" is 1 or "role" is "Admin"
3. If category doesn't exist create a add category section:
	1. id
	2. categoryName
	3. lendingPeriod
	4. lateFees
	5. banningPeriod
5. if asset creation fails at least create the category
6. Generate unique id

