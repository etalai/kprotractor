Feature: As a senate user , I should be able to add and delete folders , add and delete files ,create databases, create tables, load data
#Author: Manoujitha
    Scenario: Create a folder
        Given ‘normaluser’ is logged in
        When I navigate to ‘Manage Data’ page
        And I click ‘Add Folder’ button
        And I add a name for the folder ‘Test-Folder’
        Then new folder ‘Test-Folder’ is created
        And pop up message ‘The folder has been successfully created’ is displayed

    Scenario:Upload a file
        Given 'normaluser' is logged in
        When I navigate to 'Manage Data' page
        And I add a new file '/../testdata/test_data.csv'
        Then new file should be uploaded

    Scenario: Create a database
        Given 'normaluser' is logged in
        When I navigate to 'Manage Data' page
        And I add a new database
        Then new database should be created

    Scenario: Create a table and upload file
        Given 'normaluser' is logged in
        When I navigate to 'Manage Data' page
        And I create a new table
        Then table should be created
        When I loaded data from 'test_data.csv' file
        Then Number of records loaded should be '65'

    Scenario: Create a package
        Given 'packageuser' is logged in
        When I navigate to 'Manage Data' page
        And I create a new package
        Then package should be created


    Scenario: Delete a file
        Given ‘normaluser’ is logged in
        When I navigate to ‘Manage Data’ page
        And I click on ‘test_data.csv’
        And I click ‘Delete’ Button
        And I click ‘Confirm Delete’ Button
        Then I see ‘test_data.csv’ is not available
        And pop up message ‘The path has been successfully deleted’ is displayed


    Scenario: Delete a folder
        Given ‘normaluser’ is logged in
        When I navigate to ‘Manage Data’ page
        And I click on ‘Test-Folder’
        And I click ‘Delete’ Button
        And I click ‘Confirm Delete’ Button
        Then I see ‘Test-Folder’ is not available
        And pop up message ‘The path has been successfully deleted’ is displayed

    Scenario: Edit table
        Given ‘normaluser’ is logged in
        When I navigate to ‘Manage Data’ page
        And I click on ‘Databases’ tab
        And I click on ‘View or Edit Database’ Button

    Scenario: Delete a table
        Given ‘normaluser’ is logged in
        When I navigate to ‘Manage Data’ page
        And I click ‘Databases’ tab
        And I click ‘View or Edit Database’ Button
        And I click overflow menu
        And I click ‘Delete table’ Button
        Then I see the table is not available

    Scenario: Empty a table
        Given ‘normaluser’ is logged in
        When I navigate to ‘Manage Data’ page
        And I click the ‘Databases’ tab
        And I click ‘View or Edit Database’ Button
        And I click overflow menu
        And I click ‘Empty table’ Button
        Then I verify the table is available
        And I see the Row count is zero


