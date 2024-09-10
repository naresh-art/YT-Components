public with sharing class ModalPopUpCls {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountRecords(string recordId) {
        List<Account> accountList =  [SELECT Id, Name, AccountNumber, Rating FROM Account WHERE Id=:recordId];
        System.debug('Account Data::' + accountList);
        return accountList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactDetails(String accountName) {
        List<Contact> contactList = [SELECT Account.Name, Languages__c, Department, Email, FirstName, LastName, MobilePhone FROM Contact
                WHERE AccountId = :accountName];
        
        System.debug('Contact Data::' + contactList);
        return contactList;
    }

}