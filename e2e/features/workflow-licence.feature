@NeedToUpdateTest
Feature: Add Licence to Projects
  The licence is an important document which is required for data transactions

  Scenario: Add a new project
    Given 'licenceuser' is logged in
    And I navigate to 'Projects' page
    When I create a new Project
    Then Project should be created

  Scenario: Add user to project
    Given 'licenceuser' is logged in
    And I navigate to 'Projects' page
    When I add 'normaluser' to project
    Then 'normaluser' should be added to project
    Given  'normaluser' is logged in
    And I navigate to 'Projects' page
    Then project should be displayed

  Scenario: Add packages to project
    Given 'normaluser' is logged in
    And I navigate to 'Projects' page
    When I add a package to project
    Then package should be added to project

  Scenario: Add permitted use to project
    Given 'normaluser' is logged in
    And I navigate to 'Projects' page
    When I create a permitted use to project
    Then Permitted use should be added to project

  Scenario: Create a new licence
    Given 'licenceuser' is logged in
    And I navigate to 'Projects' page
    When I create a new licence
    Then Licence should be created

  Scenario: Submit licence
    Given 'licenceuser' is logged in
    And I navigate to 'Projects' page
    When I submit licence
    Then Licence should be submitted

  Scenario: Approve license
    Given 'drapprover' is logged in
    And I navigate to 'Projects' page
    When I approve licence
    Then Licence should be approved
