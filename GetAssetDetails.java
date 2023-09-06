import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetAssetDetails {

    public static void main(String[] args) {
        // JDBC URL, username, and password of MySQL server
        String jdbcUrl = "jdbc:mysql://localhost:3306/your_database_name";
        String username = "your_username";
        String password = "your_password";

        // SQL query to retrieve asset details
        String sql = "SELECT a.id, a.name, a.categoryId, a.description, a.dateAdded, a.isAvailable, "
                + "b.borrowingDatetime, b.overdueStatus, b.dueDate, b.lateFees "
                + "FROM asset a "
                + "LEFT JOIN borrowedAsset b ON a.id = b.assetId "
                + "WHERE a.id = ?";

        int assetIdToRetrieve = 1; // Replace with the asset ID you want to retrieve

        try (Connection connection = DriverManager.getConnection(jdbcUrl, username, password);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setInt(1, assetIdToRetrieve);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    // Retrieve asset details
                    int assetId = resultSet.getInt("id");
                    String assetName = resultSet.getString("name");
                    int categoryId = resultSet.getInt("categoryId");
                    String description = resultSet.getString("description");
                    String dateAdded = resultSet.getString("dateAdded");
                    boolean isAvailable = resultSet.getBoolean("isAvailable");

                    // Retrieve borrowedAsset details
                    String borrowingDatetime = resultSet.getString("borrowingDatetime");
                    boolean overdueStatus = resultSet.getBoolean("overdueStatus");
                    String dueDate = resultSet.getString("dueDate");
                    double lateFees = resultSet.getDouble("lateFees");

                    // Print asset details
                    System.out.println("Asset ID: " + assetId);
                    System.out.println("Asset Name: " + assetName);
                    System.out.println("Category ID: " + categoryId);
                    System.out.println("Description: " + description);
                    System.out.println("Date Added: " + dateAdded);
                    System.out.println("Is Available: " + isAvailable);

                    // Print borrowedAsset details (if available)
                    if (borrowingDatetime != null) {
                        System.out.println("Borrowing Datetime: " + borrowingDatetime);
                        System.out.println("Overdue Status: " + overdueStatus);
                        System.out.println("Due Date: " + dueDate);
                        System.out.println("Late Fees: " + lateFees);
                    } else {
                        System.out.println("This asset is not currently borrowed.");
                    }
                } else {
                    System.out.println("Asset not found.");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
