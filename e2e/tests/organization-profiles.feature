Feature: As a administrator of the organisation I should be able to create users and assign roles accordingly

    Scenario: As a super admin user I should be able to create organization
        Given ‘super admin’ is logged in
        When I navigate to ‘Organisations’ page
        And I click ‘Create New Organisation’  Button
        And I fill data of the Organisation details
        And I click ‘Create Organisation’ Button
        Then I verify that the Organisation is created successfully

    Scenario: As the super admin user I should be able to edit the organization I have created
        Given ‘super admin’ is logged in
        When I navigate to ‘organizations’ page
        And I click ‘organization details’  Button
        And I edit the organization details
        And I click “Update organization” Button
        Then I verify that the organization is updated successfully

    Scenario: As a super admin user I should be able to create an organization admin to the organization I created
        Given ‘super-admin’ is logged in
        When I navigate to ‘organizations’ page
        And I click ‘organization details’  Button
        And I click ‘Users’ tab
        And I click “Create User” Button
        And I fill in the user details
        And I select the permissions
        And I click “Create User” Button

    Scenario: As a organization admin user I should be able to add users to the organization
        Given ‘organization-admin’ is logged in
        When I navigate to ‘organizations’ page
        And I click ‘organization details’  Button
        And I click ‘Users’ tab
        And I click “Create User” Button
        And I fill in the user details
        And I select the permissions
        And I click “Create User” Button



