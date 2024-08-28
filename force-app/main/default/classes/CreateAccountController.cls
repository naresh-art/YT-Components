
public with sharing class CreateAccountController {
    @AuraEnabled
    public static Account createAccount(Account accountObj) {
        try {
            insert accountObj;
            return accountObj; // Return the ID of the newly created record
        } catch (Exception e) {
            throw new AuraHandledException('Error creating Account: ' + e.getMessage());
        }
    } 

    @AuraEnabled
    public static Contact createContact(Contact contactObj) {
        try {
            insert contactObj;
            return contactObj; // Return the ID of the newly created record
        } catch (Exception e) {
            throw new AuraHandledException('Error creating Contact: ' + e.getMessage());
        }
    } 

    @AuraEnabled
    public static Id createContactWithParams(String firstName, String lastName, String email, Id accountId) {

        Contact newContact = new Contact(
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            AccountId = accountId
        );

        try {
            insert newContact;
            return newContact.Id;
        } catch (Exception e) {
            throw new AuraHandledException('An error occurred while creating the Contact: ' + e.getMessage());
        }
    }
    
}