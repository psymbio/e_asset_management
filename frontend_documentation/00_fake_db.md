Fake Databases aka JSON files to store the data displayed on the website
Populate these dbs using ChatGPT

user:
1. id
2. name
3. roleId - (1 for admin, 2 for user) - probably a dropdown
4. telephone 
5. email
6. username
7. password
8. bannedTill - calculation for the user banningStatus

userLoginInformation:
1. userId
2. lastLoginDatetime (Last Logged in date times)

asset:
1. name
2. categoryId
3. description
4. dateAdded
5. isAvailable - if taken by a user this is false

category:
1. id
2. categoryName
3. lendingPeriod
4. lateFees
5. banningPeriod

borrowedAsset:
1. id
2. assetId
3. borrowingDatetime
4. overdueStatus - calculation of whether the time has elapsed for the specific category so that the product is overdue or not - in the backend this shall be a CallableFunction
5. dueDate - calculation of when is the date the asset needs to be returned (borrowingDatetime + assetId.categoryId.lendingPeriod)
6. userId
7. lateFees - calculation of the amount needed to be paid

userInbox:
1. userId
2. message
3. statusRead (whether the message is read or not)

basically all assets when taken end up here, but have a status for overdue or not
we need to decide the properties of this.