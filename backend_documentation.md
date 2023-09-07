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
- Boolean addBorrowedAsset(int userId, int assetId)
- Boolean removeBorrowedAsset(int userId, int assetId) [here we pass in the id of the entry on the borrowedAsset table that is needed to be removed]
- List<BorrowedAsset> getAllBorrowedAssets() - [I was thinking of adding a lambda function filter here for getting it for all users (ADMIN) and for one user (BORROWER)]
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
- User getUser(int userId) throws UserNotFoundException
- List<User> getAllUsers() [CHANGE: if there are no users in db it's not an exception, rather if length is 0 we just give a message saying no users registered.]
- int bannedTill(int userId) throws UserNotFoundException [calculates the bannedTill date and then calculate the number of days the user is banned till]

[THESE TWO FUNCTIONALITIES ARE MOVED TO BORROWEDASSET]
<!-- - Boolean borrowAsset(int userId, int assetId) throws AssetNotFoundException, UserBannedException
[this only happens after successful login, therefore userId exists]
[TODO: should we handle AssetNotAvailableException in the cases where an asset exists but is acquired by someone else]
[if any of these exceptions occur the borrowAsset fails]

[if borrowAsset passes we need to call the updateAsset function to update the Asset's isAvailable to false].

- Boolean returnAsset(int userId, int assetId);
[The user enters the assetId, and we know after login what his userId is. Then in the borrowedAsset table we remove the entry where the assetId and userId match from the borrowedAssetTable after the late fees is paid] -->

## USERSERVICEIMPL.JAVA

## ASSETSERVICE.JAVA (INTERFACE)
- Boolean addAsset(Asset a) throws AssetAlreadyExistsException
- Asset getAsset(int assetId) throws AssetNotFoundException
- List<Asset> getAllAssets();
<!-- - Boolean isAvailable(int assetId) --> [CHANGE: doesn't need to exist as assetFinder is implemented to filter, or if you have id you can always find the object getAsset and check]
- List<Asset> filterAssets(AssetFinder af);
- Float calculateLateFees(int userId, int assetId)
[CHANGE: we don't find the aggregate instead the user separately pays the lateFees of each acquired asset]

## ASSETSERVICEIMPL.JAVA

## BORROWEDASSETSERVICE.JAVA (INTERFACE)
- Boolean borrowAsset(int userId, int assetId) throws AssetNotFoundException, UserBannedException
[this only happens after successful login, therefore userId exists]
[TODO: should we handle AssetNotAvailableException in the cases where an asset exists but is acquired by someone else]
[if any of these exceptions occur the borrowAsset fails]
[if borrowAsset passes we need to call the updateAsset function to update the Asset's isAvailable to false].
- Boolean removeBorrowedAsset(int userId, int assetId);
[The user enters the assetId, and we know after login what his userId is. Then in the borrowedAsset table we remove the entry where the assetId and userId match from the borrowedAssetTable after the late fees is paid]
- List<BorrowedAssets> getAllBorrowedAssets();
- List<BorrowedAssets> filterBorrowedAssets(BorrowedAssetsFinder baf);
- Float calculateLateFees(int assetId)
- Boolean isOverdue(int assetId)

# CATEGORYSERVICE.JAVA (INTERFACE)
public boolean addCategory(Category c) throws CategoryAlreadyExistsException;
public Category getCategory(int assetId) throws CategoryNotFoundException;
public List<Category> getAllCategories();

## CATEGORYSERVICEIMPL.JAVA

# EXCEPTIONS
- UserAlreadyExistsException
- UserNotFoundException
- AssetNotFoundException (should call addNewCategory() function with category of said asset as input param)
- AssetAlreadyExistsException
- CategoryAlreadyExistsException
- CategoryNotFoundException

- UserBannedException (the user cannot acquire any assets if they are banned)
[the reason AssetNotAvailable does not exist is because we never show the user any already taken assets]

# FDP
- Object getInstance(int choice)
  - USERSERVICE obj
  - ASSETSERVICE obj
  - CATEGORYSERVICE obj

# VIEW

## MAIN.JAVA (use switch case with exit option)
