Feature: As the senate user who belongs to the organisation I want to create a licence to share my data to another organisation
#Author : Manoujitha
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
        Given 'normaluser' is logged in
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

    Scenario:  licensee Approve licence
        Given ‘licenseeuser’ is logged in
        And I navigate to ‘Projects’ page
        And I navigate to the project
        And I navigate to the licence
        Then I click “Approve’ Button
        And I verify that tick is displayed

    Scenario:  licensee Approve licence
        Given ‘licenseeuser’ is logged in
        And I navigate to ‘Projects’ page
        And I navigate to the project
        And I navigate to the licence
        Then I click “Approve’ Button
        And I verify that tick is displayed


    Scenario:  licensee Approve licence
        Given ‘licenseeuser’ is logged in
        And I navigate to ‘Projects’ page
        And I navigate to the project
        And I navigate to the licence
        Then I click “Approve’ Button
        And I verify that tick  is displayed

