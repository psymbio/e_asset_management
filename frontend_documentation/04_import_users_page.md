handle JSON/XML data which holds an array of users to persist to the database
1. name
2. roleId - (1 for admin, 2 for user) - probably a dropdown
3. telephone 
4. email
5. username
6. password

Loop through all the imported users and only choose to add them if:
1. They are valid (This will be created by the person working on signup)
	1. All fields are mandatory - we should make the html say required in these fields
	2. Validate phone number format - regex
	3. Validate email format - regex
	4. Email should be unique for each user
	5. User can have the same username as email or have a separate username
	6. generate a unique id (how will this be done - uuid or simple increasing id)
2. The username should be unique
3. Generate a unique id for them

Display the number of successful imports and non-successful imports

Question: should this be for the frontend or backend?

fake_db: user