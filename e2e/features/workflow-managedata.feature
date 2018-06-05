@WorkflowTests
Feature: Manage Data Work flow
As senate data user
I should be able to access manage data
So that I can upload file, create data base to share the data
  @refactor
  Scenario:Upload a file
    Given 'normaluser' is logged in
    When I navigate to 'Manage Data' page
    And I add a new file '../../testdata/test_data.csv'
    Then new file should be uploaded
  @refactor
  Scenario: Create a database
    Given 'normaluser' is logged in
    When I navigate to 'Manage Data' page
    And I add a new database
    Then new database should be created
  @refactor
  Scenario: Create a table and upload file
    Given 'normaluser' is logged in
    When I navigate to 'Manage Data' page
    And I create a new table
    Then table should be created
    When I loaded data from 'test_data.csv' file
    Then Number of records loaded should be '65'
  @refactor
  Scenario: Create a package
    Given 'packageuser' is logged in
    When I navigate to 'Manage Data' page
# And I create a new package
#Then package should be created
