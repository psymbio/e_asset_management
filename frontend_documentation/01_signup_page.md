(Employee Registration Page)

## Form Format
RULES: Everything must have a placeholder
1. name
2. roleId - (1 for admin, 2 for user) - probably a dropdown
3. telephone 
4. email
5. username
6. password
7. confirm password

## Javascript
1. All fields are mandatory - we should make the html say required in these fields
2. confirm password matches with password
3. Validate phone number format - regex
4. Validate email format - regex
5. Email should be unique for each user
6. User can have the same username as email or have a separate username
7. generate a unique id (how will this be done - uuid or simple increasing id)

Create a JSON with dummy data to validate/add data using javascript
Our dummy database is a JSON file

fake_db: user

