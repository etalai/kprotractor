Feature: As a senate user, I should be able to login to and logout of the senate platform
    @loginTest
    Scenario: As a senate user, I should be able to login to the senate platform
        Given I have  entered the 'valid-username' and 'valid-password'
        And I click login button
        Then I am redirected to the homepage

    Scenario: As a user who has no valid credentials, I should not be able to login to the senate platform
        Given I have entered the 'invalid-username' and 'invalid-password'
        And I click login button
        Then I see the 'Authentication Error!!' error message 
        And I see the 'The username/password combination is invalid.' error message
        And I am redirected to the loginPage


    Scenario: As a user who has valid user name and invalid password, I should not be able to login to the senate platform
        Given I have entered the 'valid-username' and 'invalid-password'
        When I click login button
        Then I see the 'Authentication Error!!' error message
        And I see the 'The username/password combination is invalid.' error message
        And I am redirected to the loginPage


    Scenario: As a user who has a invalid username and a valid password, I should not be able to login to the senate platform
        Given I have entered the 'invalid-username' and 'valid-password'
        When I click login button
        Then I see the 'Authentication Error!!' error message
        And I see the 'The username/password combination is invalid.' error message
        And I am redirected to the loginPage

    Scenario: As a logged in user, I should be able to logout of senate platform
        Given I have entered the 'valid-username' and 'valid-password'
        And I click login button
        Then I am redirected to the home page
        And I click the 'Logout' button
        And I am redirected to the loginPage


