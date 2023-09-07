# ENTITY

## USER.JAVA (DONE)
- Int id
- String name
- String role (can be Admin or Borrower)
- String telephone [CHANGE: extensions for other countries have ‘+’ symbols]
- String email
- String username
- String password

## ASSET.JAVA (DONE)
- Int id
- String name
- Int categoryId (fkey to category)
- String description
- Date dateAdded
- Boolean isAvailable

## BORROWEDASSET.JAVA (DONE)
- Int assetId (fkey to asset)
- Int userId (fkey to user)
- LocalDate borrowingDate

## CATEGORY.JAVA (DONE)
- Int id
- String name
- Int lendingPeriod
- Float lateFeesPerDay
- Int banningPeriod

## DB SEEDING (DONE)

# STORAGE

## USERSTORAGE.JAVA (INTERFACE)
- Boolean addUser(User u)
- User getUserDetails(int empId)
- List<User> getAllUsers()

## USERSTORAGEIMPL.JAVA

## ASSETSTORAGE.JAVA (INTERFACE)
- boolean addNewAsset(Asset a)
- Asset findAssetDetails(int assetId)
- Asset updateAsset(int assetId) [CHANGE: to change an asset from available to not and vice-versa]
- List<Asset> getAllAssets()

## ASSETSTORAGEIMPL.JAVA

## BORROWEDASSETSTORAGE.JAVA (IMPL)
- Boolean addNewBorrowedAsset(int userId, int assetId)
- Boolean removeBorrowedAsset(int id) [here we pass in the id of the entry on the borrowedAsset table that is needed to be removed]
- List<BorrowedAsset> getBorrowedAsset() - [I was thinking of adding a lambda function filter here for getting it for all users (ADMIN) and for one user (BORROWER)]
<!-- - Asset getBorrowedAssetDetails(int assetId) -->

## BORROWEDASSETIMPL.JAVA

## CATEGORYSTORAGE.JAVA (INTERFACE)
- boolean addNewCategory(Category c)
- List<Category> getAllCategories()
- Category findCategory(int catId)

## CATEGORYSTORAGEIMPL.JAVA

# SERVICE

## USERSERVICE.JAVA (INTERFACE)
- boolean addUser(User u) throws UserAlreadyExistsException
- User getUserDetails(int empId) throws UserNotFoundException
- List<User> getAllUsers() [CHANGE: if there are no users in db it's not an exception, rather if length is 0 we just give a message saying no users registered.]
- int bannedTill(int userId) throws UserNotFoundException [calculates the bannedTill date and then calculate the number of days the user is banned till]
- Boolean borrowAsset(int userId, int assetId) throws AssetNotFoundException, UserBannedTill
[this only happens after successful login, therefore userId exists]
[TODO: should we handle AssetNotAvailableException in the cases where an asset exists but is acquired by someone else]
[if any of these exceptions occur the borrowAsset fails]

[if borrowAsset passes we need to call the updateAsset function to update the Asset's isAvailable to false].

- Boolean returnAsset(int userId, int assetId) throws 
[The user enters the assetId, and we know after login what his userId is. Then in the borrowedAsset table we remove the entry where the assetId and userId match from the borrowedAssetTable after the late fees is paid]

## USERSERVICEIMPL.JAVA

## ASSETSERVICE.JAVA (INTERFACE)
- Boolean addNewAsset(Asset a) throws AssetAlreadyExistsException
- Asset findAssetDetails(int assetId) throws AssetNotFoundException
- List<Asset> getAllAssets() throws AssetNotFoundException
<!-- - Boolean isAvailable(int assetId) --> [CHANGE: doesn't need to exist as it is assetId locate asset and then asset.getId()]
- Float calculateLateFees(int userId)
[CHANGE: we don't find the aggregate instead the user separately pays the lateFees of each acquired asset]

## ASSETSERVICEIMPL.JAVA

## BORROWEDASSETSERVICE.JAVA (INTERFACE)
- Boolean addNewBorrowedAsset(Asset a)
- Boolean removeAsset(Asset a)
- Asset getAssetDetails(int id)
- Float calculateLateFees(Asset a)
- Boolean isOverdue(Asset a)

# CATEGORYSERVICE.JAVA (INTERFACE)
- Int addNewCategory(Category c) throws CategoryAlreadyExistsException
- List<Category> getAllCategories() [CHANGE: if there are no categories in db it's not an exception, rather if length is 0 we just give a message saying no categories registered.]
- Category findCategory(int categoryId) throws CategoryNotFoundException

## CATEGORYSERVICEIMPL.JAVA

# EXCEPTIONS
- UserAlreadyExistsException
- UserNotFoundException
- AssetNotFoundException (should call addNewCategory() function with category of said asset as input param)
- AssetAlreadyExistsException
- CategoryAlreadyExistsException
- CategoryNotFoundException

- UserBannedTill (the user cannot acquire any assets if they are banned)

# FDP
- Object getInstance(int choice)
  - USERSERVICE obj
  - ASSETSERVICE obj
  - CATEGORYSERVICE obj

# VIEW

## MAIN.JAVA (use switch case with exit option)
